import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t334uResolve } from './t334uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

const PEAT: Lock = {
  grade: 'cleared',
  counts: false,
  why: 'Ancient peat is a mineral-rich peat extract. It is included for its mineral compounds.',
};
const APPLE: Lock = {
  grade: 'cleared',
  counts: false,
  why: 'Apple extract is an extract of the apple fruit. It is included for its plant compounds.',
};

function stripParens(name: string): string {
  let current = name.replace(/[®™]/g, ' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\([^()]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function stripBrand(text: string): string {
  let tokens = text.split(/\s+/).filter(Boolean);
  const brand = (token: string) => /[®™]/.test(token) || /[a-z][A-Z]/.test(token) || /^elevatp$/i.test(token);
  while (tokens.length > 1 && brand(tokens[0])) tokens = tokens.slice(1);
  return tokens.join(' ');
}

function blend(name: string): boolean {
  return /\bpeat\b/i.test(name) && /\bapple\b/i.test(name);
}

export function t335uLock(name: string): Lock | undefined {
  if (blend(name)) return undefined;
  const key = t240uNorm(stripBrand(stripParens(name)));
  if (key === 'ancient peat') return PEAT;
  if (key === 'apple extract') return APPLE;
  return undefined;
}

export function t335uResolve(name: string, form?: string): T320uHit | undefined {
  if (blend(name)) return undefined;
  const own = t335uLock(name);
  if (own) return { lock: own, mark: 't335u' };
  return t334uResolve(name, form);
}

if (t335uResolve('Ancient Peat', 'softgel')?.lock.why !== PEAT.why) throw new Error('t335u peat');
if (t335uResolve('Apple extract', 'softgel')?.lock.why !== APPLE.why) throw new Error('t335u apple');
if (t335uResolve('ancient peat', 'softgel')?.mark !== 't335u') throw new Error('t335u peat case');
if (t335uResolve('Apple extract (fruit)', 'softgel')?.lock.why !== APPLE.why) throw new Error('t335u apple fruit');
if (t335uResolve('elevATP® Ancient Peat', 'softgel')?.lock.why !== PEAT.why) throw new Error('t335u peat brand');
if (t335uResolve('elevATP® Ancient Peat and Apple extract', 'softgel')) throw new Error('t335u blend');
if (t335uResolve('Apple Cider Vinegar', 'softgel')?.mark === 't335u') throw new Error('t335u cider');
if (t335uLock('Ancient Peat')?.counts !== false || t335uLock('Apple extract')?.grade !== 'cleared') throw new Error('t335u grade');
