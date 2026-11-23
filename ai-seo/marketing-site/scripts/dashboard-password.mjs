#!/usr/bin/env node
/**
 * Generates the two dashboard secrets for Vercel, without storing anything:
 *
 *   node scripts/dashboard-password.mjs
 *
 * It asks for the owner password (typed input is hidden), then prints:
 *   DASHBOARD_PASSWORD_HASH  scrypt hash of that password
 *   DASHBOARD_SESSION_SECRET random 48-byte secret that signs login sessions
 *
 * Paste both into Vercel → Project → Settings → Environment Variables
 * (Production and Preview), then redeploy. To change the password, run it
 * again and replace DASHBOARD_PASSWORD_HASH. Replacing the session secret logs
 * everyone out.
 */
import { randomBytes, scrypt } from 'node:crypto';
import { createInterface } from 'node:readline';

function ask(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (text) => {
      if (text.includes(question)) process.stdout.write(text);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer);
    });
  });
}

const password = await ask('Dashboard password (min 12 characters): ');
if (password.length < 12) {
  console.error('Too short: use at least 12 characters.');
  process.exit(1);
}
const confirm = await ask('Type it again: ');
if (confirm !== password) {
  console.error('The two entries do not match.');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = await new Promise((resolve, reject) =>
  scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (err, key) => (err ? reject(err) : resolve(key))),
);

console.log('\nDASHBOARD_PASSWORD_HASH=' + `scrypt:${salt.toString('base64')}:${hash.toString('base64')}`);
console.log('DASHBOARD_SESSION_SECRET=' + randomBytes(48).toString('base64url'));
