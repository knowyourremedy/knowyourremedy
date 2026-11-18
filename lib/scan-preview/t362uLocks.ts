import { isVitaminAFromBetaCarotene } from './limitedStackEligibility';
import { t240uNorm } from './t240uLocks';
import { t314uAlias } from './t314uLocks';
import type { T320uHit } from './t320uLocks';
import { t361uResolve } from './t361uLocks';

const WHY = 'Beta-carotene is a plant pigment. It is included for its plant compounds. Beta-carotene is graded Limited when it is used as a carotenoid part rather than as the vitamin A source (EFSA and FDA distinguish refined carotenoid fractions from whole-food sources).';

function isCarotenoidBetaCarotene(name: string): boolean {
  if (isVitaminAFromBetaCarotene(name)) return false;
  if (t240uNorm(name) === 'beta carotene') return true;
  const alias = t314uAlias(name);
  return Boolean(alias && t240uNorm(alias) === 'beta carotene');
}

/** The existing Limited, counting Beta-Carotene lock. The why applies only as a carotenoid part. */
export function t362uResolve(name: string, form?: string): T320uHit | undefined {
  const hit = t361uResolve(name, form);
  if (!hit || !isCarotenoidBetaCarotene(name)) return hit;
  if (hit.lock.grade !== 'limited' || !hit.lock.counts) return hit;
  return { lock: { grade: 'limited', counts: true, why: WHY }, mark: 't362u' };
}

const part = t362uResolve('Beta-Carotene', 'capsule');
if (part?.mark !== 't362u' || part.lock.grade !== 'limited' || !part.lock.counts || part.lock.why !== WHY) {
  throw new Error('t362u beta carotene');
}
if (t362uResolve('Beta-Carotene (color)', 'capsule')?.lock.why !== WHY) throw new Error('t362u color');
if (t362uResolve('Beta Carotene (for color)', 'capsule')?.lock.why !== WHY) throw new Error('t362u for color');
const source = t362uResolve('Vitamin A (as Beta-Carotene)', 'capsule');
if (source?.mark === 't362u' || source?.lock.grade !== 'cleared' || source.lock.why === WHY) throw new Error('t362u vitamin a');
if (t361uResolve('Beta-Carotene', 'capsule')?.lock.why) throw new Error('t362u overwrote t361');
if (t362uResolve('Rebaudioside A', 'tablet')?.mark === 't362u') throw new Error('t362u other limited');
