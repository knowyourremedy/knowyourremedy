import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t350uResolve } from './t350uLocks';

const WHY = 'Tartaric acid is an organic acid. It is used as a stabilizer.';

export function t352uResolve(name: string, form?: string): T320uHit | undefined {
  if (t240uNorm(name) === 'tartaric acid') {
    return { lock: { grade: 'cleared', counts: false, why: WHY }, mark: 't352u' };
  }
  return t350uResolve(name, form);
}

const hit = t352uResolve('Tartaric Acid', 'gummy');
if (hit?.mark !== 't352u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== WHY) {
  throw new Error('t352u tartaric');
}
if (t352uResolve('DL-tartaric acid', 'gummy')?.mark === 't352u') throw new Error('t352u dl tartaric');
if (t352uResolve('Citric Acid', 'gummy')?.mark === 't352u') throw new Error('t352u citric');
