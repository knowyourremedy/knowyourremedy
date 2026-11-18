import { t240uNorm } from './t240uLocks';
import { t181uWhyForName } from './t181uTokenWhy';
import type { T320uHit } from './t320uLocks';
import { t347uResolve } from './t347uLocks';

type Lock = { grade: 'cleared' | 'limited'; counts: boolean; why: string };

function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function limited(why: string): Lock {
  return { grade: 'limited', counts: true, why };
}
function vitaminA(name: string): string {
  return `${name} is a form of vitamin A. It is included as a source of vitamin A.`;
}

const CELLULOSE_GEL = 'Cellulose gel is a cellulose derivative. It is used as a filler and binder.';
const COLORS = 'Colors added are colorants. They are used to color the product. Colors added are graded Limited because the specific colorants are not named (FDA 21 CFR 73 and 74; EFSA guidance on unspecified colors).';
const SAM = 'SAM-e is S-adenosylmethionine. It is included for its metabolic compounds. SAM-e is graded Limited as a purified compound (FDA GRAS notice).';

const LOCKS: Array<[string, Lock]> = [
  ['Cellulose Gel', cleared(CELLULOSE_GEL)],
  ['Sodium Starch Glycolate', cleared('Sodium starch glycolate is a starch derivative. It is used as a disintegrant.')],
  ['Vitamin A (as Retinyl Acetate)', cleared(vitaminA('Vitamin A (as Retinyl Acetate)'))],
  ['Vitamin A (as Beta-Carotene, Retinyl Acetate)', cleared(vitaminA('Vitamin A (as Beta-Carotene, Retinyl Acetate)'))],
  ['Calcium Lactate', cleared('Calcium lactate is a salt of calcium. It is included as a source of calcium.')],
  ['Glyceryl Monostearate', cleared('Glyceryl monostearate is a monoester of glycerol and stearic acid. It is used as an emulsifier.')],
  ['Lactose', cleared('Lactose is a milk sugar. It is used as a filler.')],
  ['Methylcellulose', cleared('Methylcellulose is a cellulose derivative. It is used as a coating and binder.')],
  ['Sensoril (as Ashwagandha Leaf Extract, Ashwagandha Root Extract)', cleared('Sensoril is a standardized extract of ashwagandha. It is included for its plant compounds.')],
  ['Colors added', limited(COLORS)],
  ['Color added', limited(COLORS)],
  ['Rapeseed Lecithin', limited('Rapeseed lecithin is a phospholipid from rapeseed. It is used as an emulsifier. Rapeseed lecithin is graded Limited as a processed phospholipid (FDA 21 CFR 184.1400).')],
  ['S-Adenosylmethionine Tosylate Disulfate', limited(SAM)],
  ['SAM-e', limited(SAM)],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  const prior = BY_KEY.get(key);
  if (prior && prior.why !== lock.why) throw new Error(`t350u duplicate ${name}`);
  BY_KEY.set(key, lock);
}

export function t350uResolve(name: string, form?: string): T320uHit | undefined {
  const key = t240uNorm(name);
  if (key === 'methacrylic acid copolymer') {
    const hit = t347uResolve(name, form);
    if (!hit) return undefined;
    if (hit.lock.why) return hit;
    const why = t181uWhyForName(name);
    return why ? { ...hit, lock: { ...hit.lock, why } } : hit;
  }
  const own = BY_KEY.get(key);
  if (own) return { lock: own, mark: 't350u' };
  return t347uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t350uResolve(name, 'tablet');
  if (hit?.mark !== 't350u' || hit.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.lock.counts !== lock.counts) {
    throw new Error(`t350u ${name}`);
  }
}
const tartaric = t350uResolve('Tartaric Acid', 'tablet');
if (tartaric?.mark === 't350u' || tartaric?.lock.grade !== 'cleared') throw new Error('t350u tartaric');
const meth = t350uResolve('Methacrylic Acid Copolymer', 'tablet');
if (meth?.mark === 't350u' || meth?.lock.grade !== 'limited' || !meth?.lock.counts || !meth.lock.why.startsWith('Methacrylic acid copolymer is a synthetic polymer used as an enteric coating.')) {
  throw new Error('t350u methacrylic');
}
if (t350uResolve('cellulose gel', 'tablet')?.lock.why !== CELLULOSE_GEL) throw new Error('t350u cellulose gel');
if (t350uResolve('Artificial Colors', 'tablet')?.mark === 't350u') throw new Error('t350u artificial colors');
if (t350uResolve('Lecithin', 'tablet')?.mark === 't350u') throw new Error('t350u lecithin');
if (t350uResolve('Sunflower Lecithin', 'tablet')?.mark === 't350u') throw new Error('t350u sunflower');
if (t350uResolve('Cellulose', 'tablet')?.mark === 't350u') throw new Error('t350u cellulose');
if (t350uResolve('Microcrystalline Cellulose', 'tablet')?.mark === 't350u') throw new Error('t350u mcc');
if (t350uResolve('Hydroxypropyl Methylcellulose', 'tablet')?.mark === 't350u') throw new Error('t350u hpmc');
if (t350uResolve('Vitamin A (as Beta-Carotene)', 'tablet')?.mark === 't350u') throw new Error('t350u beta carotene');
if (t350uResolve('Beta Carotene (for color)', 'tablet')?.mark === 't350u') throw new Error('t350u color carotene');
if (t350uResolve('Ashwagandha', 'tablet')?.mark === 't350u') throw new Error('t350u ashwagandha');
