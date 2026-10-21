import { provisionUser } from '../src/lib/auth.ts';
import type { Role } from '../src/lib/db.ts';
const email=process.env.HMB_SEED_EMAIL,password=process.env.HMB_SEED_PASSWORD,name=process.env.HMB_SEED_NAME||'مدیر HMB',role=(process.env.HMB_SEED_ROLE||'admin') as Role;
if(!email||!password||!['admin','member','coach','editor','reviewer'].includes(role)){console.error('Set HMB_SEED_EMAIL, HMB_SEED_PASSWORD (12+ characters), optional HMB_SEED_NAME and HMB_SEED_ROLE.');process.exit(1);}
try{const id=provisionUser({email,password,name,role,coachId:process.env.HMB_SEED_COACH_ID});console.log('Account created:',id,'role:',role);}catch(error){console.error(error instanceof Error?error.message:'Seed failed');process.exitCode=1;}
