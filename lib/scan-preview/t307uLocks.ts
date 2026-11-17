import { t240uNorm } from './t240uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

const PINE =
  'Hypromellose from non-GMO pine bark. It forms the vegan capsule shell that holds the ingredients.';

const PINE_KEY = t240uNorm('hypromellose (from non-GMO pine bark)');

/** Exact string. Bare hypromellose stays the stored Cleared lock. */
export function t307uLock(name: string): Lock | undefined {
  if (t240uNorm(name) !== PINE_KEY) return undefined;
  return { grade: 'cleared', counts: false, why: PINE };
}

if (t307uLock('hypromellose (from non-GMO pine bark)')?.why !== PINE) throw new Error('t307u why');
if (t307uLock('hypromellose (from non-GMO pine bark)')?.grade !== 'cleared') throw new Error('t307u grade');
if (t307uLock('hypromellose (from non-GMO pine bark)')?.counts !== false) throw new Error('t307u count');
if (t307uLock('Hypromellose (from non-GMO pine bark)')?.why !== PINE) throw new Error('t307u case');
if (t307uLock('hypromellose')) throw new Error('t307u bare');
if (t307uLock('hypromellose (from pine bark)')) throw new Error('t307u short');
