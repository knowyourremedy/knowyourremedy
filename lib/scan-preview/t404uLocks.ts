import type { T320uHit } from './t320uLocks';
import { t403uResolve } from './t403uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const TOCOPHEROL = 'Tocopherol is a form of vitamin E. It is included as a source of vitamin E.';
const GLUTATHIONE = 'Glutathione is a tripeptide. It is included for its antioxidant compounds.';
const FATTY = '[Named fatty acid]. It is included for its fatty acid compounds.';
const EPO = 'Organic evening primrose oil is oil from evening primrose seeds. It is included for its plant compounds. Evening primrose oil is graded Caution as a fill and Limited when it is the base of the product (EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const CINNAMON = 'Cinnamon oil is oil from cinnamon bark. It is included for its plant compounds.';
const BACOPA = 'Bacopa monniera extract is an extract of bacopa. It is included for its plant compounds.';
const MANE = 'Lion\'s mane mushroom fruiting body extract is an extract of the lion\'s mane mushroom. It is included for its plant compounds.';

const CLEARED: Array<[string, string]> = [
  ['Tocopherol Extract', TOCOPHEROL],
  ['Natural tocopherol', TOCOPHEROL],
  ['Glutathione', GLUTATHIONE],
  ['Omega-3 DHA (Schizochytrium Algae Oil, water extracted)', FATTY],
  ['EPA', FATTY],
  ['Cinnamon Oil', CINNAMON],
  ['Bacopa monniera extract', BACOPA],
  ['Lion\'s Mane Mushroom Fruiting Body Extract', MANE],
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t404u duplicate ${name}`);
  const prior = t403uResolve(name, 'liquid') || t403uResolve(name, 'softgel');
  if (prior) throw new Error(`t404u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}

function isOrganicEveningPrimrose(name: string): boolean {
  return keyOf(name) === 'organic evening primrose oil';
}

/** Cleared locks. Organic evening primrose oil stays the existing softgel Caution lock. */
export function t404uResolve(name: string, form?: string): T320uHit | undefined {
  if (isOrganicEveningPrimrose(name)) {
    const prior = t403uResolve(name, form);
    if (prior) return prior;
    return { lock: { grade: 'cleared', counts: false, why: EPO }, mark: 't404u' };
  }
  const exact = BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't404u' };
  return t403uResolve(name, form);
}

if (FATTY !== '[Named fatty acid]. It is included for its fatty acid compounds.') throw new Error('t404u fatty why');
for (const [name, why] of CLEARED) {
  const hit = t404uResolve(name, 'liquid');
  if (hit?.mark !== 't404u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t404u ${name}`);
  }
}
const epoLiquid = t404uResolve('Organic Evening Primrose Oil', 'liquid');
if (epoLiquid?.mark !== 't404u' || epoLiquid.lock.grade !== 'cleared' || epoLiquid.lock.counts || epoLiquid.lock.why !== EPO) {
  throw new Error('t404u epo liquid');
}
const epoFill = t404uResolve('Organic Evening Primrose Oil', 'softgel');
if (epoFill?.mark === 't404u' || epoFill?.lock.grade !== 'moderate') throw new Error('t404u epo fill');
if (t404uResolve('Bacopa monnieri Extract (whole plant)', 'liquid')?.mark === 't404u') throw new Error('t404u monnieri');
if (t404uResolve('Lion\'s Mane', 'liquid')?.mark === 't404u') throw new Error('t404u bare mane');
if (t404uResolve('D-Alpha-Tocopherol', 'liquid')?.mark === 't404u') throw new Error('t404u d alpha');
if (t404uResolve('Natural tocopherol', 'liquid')?.lock.why !== TOCOPHEROL) throw new Error('t404u natural tocopherol');
