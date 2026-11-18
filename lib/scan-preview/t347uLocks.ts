import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t346uResolve } from './t346uLocks';

type Lock = { grade: 'limited'; counts: true; why: string };

const MCT: Lock = {
  grade: 'limited',
  counts: true,
  why: 'Medium chain triglyceride is a processed oil. It is used as a fill or carrier. Medium chain triglyceride is graded Limited as a processed oil (EFSA and FDA treat refined MCT oils as distinct from whole-food oils).',
};
const PHOSPHOLIPIDS: Lock = {
  grade: 'limited',
  counts: true,
  why: 'Phospholipids are lipid compounds. They are used as an emulsifier. Phospholipids are graded Limited as a processed lipid (FDA 21 CFR 184.1400).',
};

function isSingularMct(name: string): boolean {
  return t240uNorm(name) === 'medium chain triglyceride';
}

export function t347uResolve(name: string, form?: string): T320uHit | undefined {
  if (isSingularMct(name)) return { lock: MCT, mark: 't347u' };
  if (t240uNorm(name) === 'phospholipids') return { lock: PHOSPHOLIPIDS, mark: 't347u' };
  return t346uResolve(name, form);
}

const singular = t347uResolve('Medium Chain Triglyceride', 'tablet');
if (singular?.mark !== 't347u' || singular.lock.why !== MCT.why || singular.lock.grade !== 'limited' || !singular.lock.counts) {
  throw new Error('t347u mct');
}
const plural = t347uResolve('Medium Chain Triglycerides', 'tablet');
if (plural?.mark === 't347u' || plural?.lock.grade !== 'limited' || !plural?.lock.counts || plural.lock.why === MCT.why) {
  throw new Error('t347u mct plural');
}
const phospholipids = t347uResolve('Phospholipids', 'softgel');
if (phospholipids?.mark !== 't347u' || phospholipids.lock.why !== PHOSPHOLIPIDS.why || !phospholipids.lock.counts) {
  throw new Error('t347u phospholipids');
}
if (t347uResolve('Lecithin', 'softgel')?.mark === 't347u') throw new Error('t347u lecithin');
if (t347uResolve('Phospholipid complex from Pea, Sunflower, Grape Seed', 'capsule')?.mark === 't347u') {
  throw new Error('t347u phospholipid blend');
}
if (t347uResolve('Krill Oil', 'softgel')?.mark === 't347u') throw new Error('t347u krill');
