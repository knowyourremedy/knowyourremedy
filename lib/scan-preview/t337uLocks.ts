import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t335uResolve } from './t335uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'high'; counts: boolean; why: string };

function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function limited(why: string): Lock {
  return { grade: 'limited', counts: true, why };
}
function named(name: string): string {
  return `${name}. It is included for its nutrient or plant compounds.`;
}
function nutrient(name: string): string {
  return `${name}. It is included as a source of that nutrient.`;
}

const LOCKS: Array<[string, Lock]> = [
  ['Acacia', cleared('Acacia is a plant gum. It is used as a binder and thickener.')],
  ['Folic Acid', cleared('Folic acid is a form of folate. It is included as a source of folate.')],
  ['Eggshell', cleared(named('Eggshell'))],
  ['Keratin', cleared(named('Keratin'))],
  ['L-Arginine Hydrochloride', cleared(named('L-Arginine Hydrochloride'))],
  ['Lemon Bioflavonoids', cleared(named('Lemon Bioflavonoids'))],
  ['Maca', cleared(named('Maca'))],
  ['Magnesium Gluconate', cleared(named('Magnesium Gluconate'))],
  ['Niacinamide (as Vitamin B3)', cleared(nutrient('Niacinamide (as Vitamin B3)'))],
  ['Pantothenic Acid (as Calcium Pantothenate)', cleared(nutrient('Pantothenic Acid (as Calcium Pantothenate)'))],
  ['Selenium (as Sodium Selenate)', cleared(nutrient('Selenium (as Sodium Selenate)'))],
  ['Vanadium (as Sodium Metavanadate)', cleared(nutrient('Vanadium (as Sodium Metavanadate)'))],
  ['Vitamin A (as Beta-Carotene, Vitamin A Acetate)', cleared(nutrient('Vitamin A (as Beta-Carotene, Vitamin A Acetate)'))],
  ['Vitamin B1 (as Thiamine Mononitrate)', cleared(nutrient('Vitamin B1 (as Thiamine Mononitrate)'))],
  ['Vitamin K (as Phytonadione)', cleared(nutrient('Vitamin K (as Phytonadione)'))],
  ['Rose Hips', cleared('Rose hips are the fruit of the rose plant. It is included for its plant compounds.')],
  ['yellow Beeswax', cleared('Yellow beeswax is wax from bees. It is used as a coating or base in the softgel.')],
  ['Pharmaceutical Glaze', limited('Pharmaceutical glaze is a refined shellac. It coats the tablet. Pharmaceutical glaze is graded Limited as a processed glaze (FDA 21 CFR 172.615).')],
  ['Polyvinylpyrrolidone', limited('Polyvinylpyrrolidone is a synthetic polymer. It is used as a binder. Polyvinylpyrrolidone is graded Limited as a synthetic polymer (FDA 21 CFR 173.55).')],
  ['Stearate', limited('Stearate is a fatty acid salt. It is used as a lubricant. Stearate is graded Limited as a processed lubricant (FDA 21 CFR 172.860).')],
  ['Triglycerides', limited('Triglycerides are fats. They are used as a fill or carrier. Triglycerides are graded Limited as a processed fat (EFSA and FDA treat refined triglycerides as distinct from whole-food oils).')],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  if (BY_KEY.has(key)) throw new Error(`t337u duplicate ${name}`);
  BY_KEY.set(key, lock);
}

export function t337uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

export function t337uResolve(name: string, form?: string): T320uHit | undefined {
  const own = t337uLock(name);
  if (own) return { lock: own, mark: 't337u' };
  return t335uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t337uResolve(name, 'tablet');
  if (hit?.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.lock.counts !== lock.counts || hit.mark !== 't337u') {
    throw new Error(`t337u ${name}`);
  }
}
if (t337uResolve('magnesium stearate', 'tablet')?.mark === 't337u') throw new Error('t337u mag stearate');
if (t337uResolve('stearic acid', 'tablet')?.mark === 't337u') throw new Error('t337u stearic');
if (t337uResolve('beeswax', 'softgel')?.mark === 't337u') throw new Error('t337u beeswax');
if (t337uResolve('Maca 4:1 extract', 'capsule')?.mark === 't337u') throw new Error('t337u maca extract');
if (t337uLock('Magnesium Silicate')) throw new Error('t337u silicate');
if (t337uLock('BHT')) throw new Error('t337u bht');
if (t337uLock('Talc')) throw new Error('t337u talc');
if (t337uLock('Phosphorus (as Dicalcium Phosphate)')) throw new Error('t337u phosphorus');
