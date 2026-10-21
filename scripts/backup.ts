import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
const source=resolve(process.env.HMB_DATABASE_PATH||'data/hmb.sqlite');
const destination=process.argv[2];
if(!destination||!existsSync(source)){console.error('Usage: HMB_DATABASE_PATH=/path/hmb.sqlite node --experimental-strip-types scripts/backup.ts /absolute/new-backup.sqlite');process.exit(1)}
const output=resolve(destination);
if(existsSync(output)){console.error('Backup destination must not already exist.');process.exit(1)}
mkdirSync(dirname(output),{recursive:true,mode:0o700});
const database=new DatabaseSync(source);
database.prepare('VACUUM INTO ?').run(output);
const backup=new DatabaseSync(output,{readOnly:true});
const result=backup.prepare('PRAGMA integrity_check').get() as Record<string,string>;
if(result.integrity_check!=='ok')throw new Error('Backup integrity verification failed');
backup.close();database.close();console.log('Backup created and integrity verified.');
