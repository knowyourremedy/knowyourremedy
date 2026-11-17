import { t240uNorm } from './t240uLocks';

type Lock = { grade: 'moderate'; counts: false; why: string };

const WHY = 'Delta and gamma tocotrienols are forms of vitamin E. They are included as a source of vitamin E. Tocotrienols are graded Caution as an oil-derived vitamin E fraction under the oil form rule.';

const LOCKS: Array<[string, Lock]> = [
  ['Delta, Gamma Tocotrienols', { grade: 'moderate', counts: false, why: WHY }],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));

/** Caution. Does not stack. */
export function t317uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t317u duplicate');
const hit = t317uLock('Delta, Gamma Tocotrienols');
if (hit?.why !== WHY || hit.grade !== 'moderate' || hit.counts !== false) throw new Error('t317u tocotrienol');
