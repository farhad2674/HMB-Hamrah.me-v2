import { randomBytes, createHash, scryptSync, timingSafeEqual, randomUUID } from 'node:crypto';
import { db, now, transaction, userFromRow, audit, DomainError, type User, type Role } from './db.ts';
export const SESSION_COOKIE='hmb_session';
const hash=(value:string)=>createHash('sha256').update(value).digest('hex');
export function hashPassword(password:string){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');}
export function verifyPassword(password:string,stored:string){const [salt,expected]=stored.split(':');if(!salt||!expected)return false;const actual=scryptSync(password,salt,64);const wanted=Buffer.from(expected,'hex');return actual.length===wanted.length&&timingSafeEqual(actual,wanted);}
export function provisionUser(input:{name:string;email:string;password:string;role:Role;coachId?:string}){if(input.password.length<12)throw new Error('Password must be at least 12 characters');const id=randomUUID();db().prepare('INSERT INTO users(id,name,email,password_hash,role,active,coach_id,created_at) VALUES(?,?,?,?,?,1,?,?)').run(id,input.name,input.email.toLowerCase().trim(),hashPassword(input.password),input.role,input.coachId||null,now());return id;}
export function login(email: string, password: string) {
  const row = db().prepare('SELECT * FROM users WHERE email=?').get(email.toLowerCase());
  const valid = verifyPassword(password, String(row?.password_hash ?? '0'.repeat(32) + ':' + '0'.repeat(128)));
  if (!row || !valid) throw new DomainError('ایمیل یا گذرواژه درست نیست.', 401);
  const token = randomBytes(32).toString('base64url');
  const created = Date.now();
  return transaction(() => {
    db().prepare('DELETE FROM sessions WHERE expires_at <= ?').run(created);
    db().prepare('INSERT INTO sessions(token_hash,user_id,expires_at,public_id,created_at) VALUES(?,?,?,?,?)')
      .run(hash(token), row.id, created + 8 * 60 * 60 * 1000, randomBytes(16).toString('hex'), created);
    audit(String(row.id), 'auth.login', String(row.id));
    return { token, user: userFromRow(row) };
  });
}

export function listSessions(request: Request) {
  const user = requireUser(request);
  const rows = db().prepare(`
    SELECT public_id, created_at, expires_at, token_hash = ? AS current
    FROM sessions WHERE user_id = ? AND expires_at > ?
    ORDER BY current DESC, created_at DESC, public_id
  `).all(hash(readSessionCookie(request)!), user.id, Date.now());
  return rows.map(row => ({
    id: String(row.public_id),
    current: Boolean(row.current),
    createdAt: new Date(Number(row.created_at)).toISOString(),
    expiresAt: new Date(Number(row.expires_at)).toISOString(),
  }));
}

export function revokeSession(request: Request, publicId: string) {
  return transaction(() => {
    const user = requireUser(request);
    const session = db().prepare(`
      SELECT token_hash FROM sessions WHERE public_id = ? AND user_id = ? AND expires_at > ?
    `).get(publicId, user.id, Date.now());
    if (!session) throw new DomainError('نشست یافت نشد.', 404);
    if (session.token_hash === hash(readSessionCookie(request)!)) {
      throw new DomainError('برای پایان این نشست از حساب خارج شوید.', 409);
    }
    db().prepare('DELETE FROM sessions WHERE public_id = ? AND user_id = ?').run(publicId, user.id);
    audit(user.id, 'auth.session_revoked', publicId);
    return { ok: true };
  });
}
export function sessionUser(token:string|undefined):User|null{if(!token||token.length>100)return null;const row=db().prepare('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>?').get(hash(token),Date.now());return row?userFromRow(row):null;}
export function logout(token:string|undefined){if(token)db().prepare('DELETE FROM sessions WHERE token_hash=?').run(hash(token));}
export function readSessionCookie(request:Request){return request.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(SESSION_COOKIE+'='))?.slice(SESSION_COOKIE.length+1);}
export function requireUser(request:Request,allowInactive=false){const user=sessionUser(readSessionCookie(request));if(!user)throw new DomainError('برای ادامه وارد حساب خود شوید.',401);if(!allowInactive&&!user.active)throw new DomainError('دسترسی این حساب غیرفعال است.',403);return user;}
export function sessionCookie(token:string,clear=false){const secure=process.env.HMB_SECURE_COOKIES==='1'||process.env.HMB_ORIGIN?.startsWith('https://');return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${clear?0:28800}${secure?'; Secure':''}`;}
