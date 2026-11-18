import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t358uResolve } from './t358uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate'; counts: boolean; why: string };

const ACEROLA = 'Acerola complex is an extract of the acerola fruit. It is included for its plant compounds.';
const CAROTENOID = 'Carotenoid mix is a blend of carotenoids. It is included for its plant compounds.';
const PHENYLALANINE = 'DL-phenylalanine is a form of the amino acid phenylalanine. It is included for its amino acid content.';
const EYEBRIGHT = 'Eyebright extract is an extract of the eyebright plant. It is included for its plant compounds.';
const CUMIN = 'Cumin powder is dried cumin seed. It is included for its plant compounds.';
const CHAMOMILE = 'Chamomile is a plant. It is included for its plant compounds.';
const FLAX = 'Cold pressed organic flaxseed oil is oil from flaxseeds. It is used as a fill in the softgel. Flaxseed oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

const LOCKS: Array<[string, Lock]> = [
  ['Acerola Complex', { grade: 'cleared', counts: false, why: ACEROLA }],
  ['Carotenoid Mix', { grade: 'cleared', counts: false, why: CAROTENOID }],
  ['DL-Phenylalanine', { grade: 'cleared', counts: false, why: PHENYLALANINE }],
  ['Eyebright extract', { grade: 'cleared', counts: false, why: EYEBRIGHT }],
  ['Cumin powder', { grade: 'cleared', counts: false, why: CUMIN }],
  ['Chamomile', { grade: 'cleared', counts: false, why: CHAMOMILE }],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));

export function t359uResolve(name: string, form?: string): T320uHit | undefined {
  if (t240uNorm(name) === 'cold pressed organic flaxseed oil') {
    const text = (form ?? '').toLowerCase();
    if (/\bbase\b/.test(text) || !/\bsoftgel\b/.test(text)) return undefined;
    return { lock: { grade: 'cleared', counts: false, why: FLAX }, mark: 't359u' };
  }
  const own = BY_KEY.get(t240uNorm(name));
  if (own) return { lock: own, mark: 't359u' };
  return t358uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t359uResolve(name, 'capsule');
  if (hit?.mark !== 't359u' || hit.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.lock.counts !== lock.counts) {
    throw new Error(`t359u ${name}`);
  }
}
const fill = t359uResolve('cold pressed organic Flaxseed Oil', 'softgel');
if (fill?.mark !== 't359u' || fill.lock.grade !== 'cleared' || fill.lock.counts || fill.lock.why !== FLAX) {
  throw new Error('t359u flax fill');
}
if (t359uResolve('cold pressed organic Flaxseed Oil', 'softgel base')) throw new Error('t359u flax base');
if (t359uResolve('cold pressed organic Flaxseed Oil', 'liquid')) throw new Error('t359u flax liquid');
if (t359uResolve('organic Flaxseed Oil', 'softgel')?.mark === 't359u') throw new Error('t359u organic flax');
if (t359uResolve('Flaxseed Oil', 'softgel')?.mark === 't359u') throw new Error('t359u flaxseed oil');
if (t359uResolve('Acerola extract complex', 'tablet')?.mark === 't359u') throw new Error('t359u acerola extract');
if (t359uResolve('Chamomile extract', 'capsule')?.mark === 't359u') throw new Error('t359u chamomile extract');
if (t359uResolve('Ginkgo biloba extract', 'capsule')?.mark === 't359u') throw new Error('t359u ginkgo');
