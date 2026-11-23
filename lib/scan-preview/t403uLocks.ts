import type { T320uHit } from './t320uLocks';
import { t402uResolve } from './t402uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const CREATINE = 'Creatine monohydrate is a form of creatine. It is included for its muscle compounds.';
const TRYPTOPHAN = 'L-tryptophan is an amino acid. It is included for its amino acid content.';
const MAGNESIUM = 'Elemental magnesium is magnesium. It is included as a source of magnesium.';
const LIQUID_OIL = '[Named oil]. It is included as an ingredient in the liquid. [Name] is graded Caution when it is not the base of the product (EFSA and FDA treat refined oils as distinct from whole-food oils).';

const CLEARED: Array<[string, string]> = [
  ['Creatine Monohydrate', CREATINE],
  ['L-Tryptophan', TRYPTOPHAN],
  ['Elemental Magnesium', MAGNESIUM],
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t403u duplicate ${name}`);
  const prior = t402uResolve(name, 'liquid') || t402uResolve(name, 'softgel') || t402uResolve(name, 'tablet');
  if (prior) throw new Error(`t403u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}

function isMct(name: string): boolean {
  const key = keyOf(name);
  return key === 'mct oil' || key === 'organic mct oil' || key === 'mct oil organic';
}

function isSeaBuckthorn(name: string): boolean {
  const key = keyOf(name).replace(/seabuckthorn/g, 'sea buckthorn').replace(/\borganic\b/g, ' ').replace(/\s+/g, ' ').trim();
  return key === 'sea buckthorn oil';
}

/** Cleared locks, plus Caution for these oils in a liquid when they are not the base. Softgel and base stay t402u. */
export function t403uResolve(name: string, form?: string): T320uHit | undefined {
  const exact = BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't403u' };
  if (isMct(name) || isSeaBuckthorn(name)) {
    const text = (form ?? '').toLowerCase();
    if (/\bsoftgel\b/.test(text) || /\bbase\b/.test(text)) return t402uResolve(name, form);
    if (/\bliquid\b/.test(text)) {
      return { lock: { grade: 'moderate', counts: false, why: LIQUID_OIL }, mark: 't403u' };
    }
    return undefined;
  }
  return t402uResolve(name, form);
}

if (LIQUID_OIL !== '[Named oil]. It is included as an ingredient in the liquid. [Name] is graded Caution when it is not the base of the product (EFSA and FDA treat refined oils as distinct from whole-food oils).') {
  throw new Error('t403u oil why');
}
for (const [name, why] of CLEARED) {
  const hit = t403uResolve(name, 'liquid');
  if (hit?.mark !== 't403u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t403u ${name}`);
  }
}
const mctLiquid = t403uResolve('Organic MCT Oil', 'liquid');
if (mctLiquid?.lock.grade !== 'moderate' || mctLiquid.lock.counts || mctLiquid.lock.why !== LIQUID_OIL || mctLiquid.mark !== 't403u') {
  throw new Error('t403u mct liquid');
}
const seaLiquid = t403uResolve('Organic Seabuckthorn Oil', 'liquid');
if (seaLiquid?.lock.why !== LIQUID_OIL || seaLiquid.lock.grade !== 'moderate' || seaLiquid.mark !== 't403u') {
  throw new Error('t403u sea liquid');
}
if (t403uResolve('Sea Buckthorn Oil', 'liquid')?.lock.why !== LIQUID_OIL) throw new Error('t403u sea space');
const mctFill = t403uResolve('Organic MCT Oil', 'softgel');
if (mctFill?.mark !== 't402u' || mctFill.lock.grade !== 'moderate' || mctFill.lock.why === LIQUID_OIL) throw new Error('t403u mct fill');
const mctBase = t403uResolve('Organic MCT Oil', 'base');
if (mctBase?.mark !== 't402u' || mctBase.lock.grade !== 'limited' || !mctBase.lock.counts) throw new Error('t403u mct base');
if (t403uResolve('Medium Chain Triglycerides (MCT) Oil', 'liquid')?.mark === 't403u') throw new Error('t403u long mct');
if (t403uResolve('5-Hydroxytryptophan', 'capsule')?.mark === 't403u') throw new Error('t403u 5htp');
if (t403uResolve('Adipic Acid', 'tablet')?.mark === 't403u') throw new Error('t403u adipic');
