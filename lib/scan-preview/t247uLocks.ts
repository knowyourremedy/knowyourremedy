import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uLock, t240uNorm } from './t240uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const SUGAR_BEET = 'Sugar from beet. It is used as a sweetener in the gummies.';
const SUGAR_BEETS = 'Sugar from beets. It is used as a sweetener in the gummies.';
const PECTIN = 'Pectin from apple and citrus. It is a plant fiber used as a gelling agent in the gummies.';
const CARROT = 'Carrot. It is added for color and plant compounds.';
const BLUEBERRY = 'Blueberry. It is added for color and plant compounds.';
const BLACK_CURRANT = 'Black currant. It is added for color and plant compounds.';
const SALT = 'Himalayan pink sea salt. It is added for mineral content and flavor.';
const OIL_FULL =
  'Vegetable oil made from canola oil and coconut oil. It is used as a surface coating on the gummies. Vegetable oil used as a coating is graded Limited as a processed oil (EFSA and FDA treat refined seed and coconut oils as distinct from whole-food oils).';
const OIL_SHORT =
  'Vegetable oil made from canola and coconut. It is used as a surface coating on the gummies. Vegetable oil used as a coating is graded Limited as a processed oil (EFSA and FDA treat refined seed and coconut oils as distinct from whole-food oils).';

const LOCKS = new Map<string, Lock>([
  ['sugar beet', { grade: 'cleared', counts: false, why: SUGAR_BEET }],
  ['sugar beets', { grade: 'cleared', counts: false, why: SUGAR_BEETS }],
  ['pectin apple citrus', { grade: 'cleared', counts: false, why: PECTIN }],
  ['carrot', { grade: 'cleared', counts: false, why: CARROT }],
  ['blueberry', { grade: 'cleared', counts: false, why: BLUEBERRY }],
  ['black currant', { grade: 'cleared', counts: false, why: BLACK_CURRANT }],
  ['himalayan pink sea salt', { grade: 'cleared', counts: false, why: SALT }],
  ['vegetable oil canola oil coconut oil', { grade: 'limited', counts: true, why: OIL_FULL }],
  ['vegetable oil canola coconut', { grade: 'limited', counts: true, why: OIL_SHORT }],
]);

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t247u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t247u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t247u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t247u).',
};

/** Exact founder strings for Vital Proteins batch409. Other brands are not changed. */
export function t247uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

/** Vital Proteins batch409 only. Other brands keep their stored grades. */
export function applyT247uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('vitalproteins-b409-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t247uLock(ingredient.name);
    const prior = own ? undefined : t240uLock(ingredient.name, record.form);
    const lock = own ?? prior;
    if (!lock) return ingredient;
    const exempt = !lock.counts;
    const stamp = own
      ? SOURCE[lock.grade]
      : lock.grade === 'limited'
        ? 'Methodology §5 Limited (founder lock t240u). Counts toward the 3+ Limited stack.'
        : lock.grade === 'high'
          ? 'Methodology §5 Avoid (founder lock t240u).'
          : lock.grade === 'moderate'
            ? 'Methodology §5 Caution (founder lock t240u). Does not count toward the t137u stack.'
            : 'Methodology §5 Cleared (founder lock t240u). Does not count toward the t137u stack.';
    const mark = own ? 'founder lock t247u' : 'founder lock t240u';
    const source = (ingredient.source ?? '').includes(mark)
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${stamp}`;
    if (
      ingredient.riskLevel === lock.grade
      && ingredient.stackCountExempt === exempt
      && ingredient.why === lock.why
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, riskLevel: lock.grade, stackCountExempt: exempt, why: lock.why, source };
  });
  if (!changed) return record;
  return {
    ...record,
    inactiveIngredients,
    verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
  };
}

if (t247uLock('Sugar (Beet)')?.why !== SUGAR_BEET) throw new Error('t247u sugar beet');
if (t247uLock('Sugar (Beets)')?.grade !== 'cleared') throw new Error('t247u sugar beets');
if (t247uLock('Pectin (Apple, Citrus)')?.counts !== false) throw new Error('t247u pectin');
if (t247uLock('Carrot')?.why !== CARROT) throw new Error('t247u carrot');
if (t247uLock('Blueberry')?.why !== BLUEBERRY) throw new Error('t247u blueberry');
if (t247uLock('Black Currant')?.why !== BLACK_CURRANT) throw new Error('t247u currant');
if (t247uLock('Himalayan Pink Sea Salt')?.grade !== 'cleared') throw new Error('t247u salt');
if (t247uLock('Vegetable Oil (Canola Oil, Coconut Oil)')?.grade !== 'limited') throw new Error('t247u oil full');
if (t247uLock('Vegetable Oil (Canola Oil, Coconut Oil)')?.counts !== true) throw new Error('t247u oil full count');
if (t247uLock('Vegetable Oil (Canola, Coconut)')?.why !== OIL_SHORT) throw new Error('t247u oil short');
if (t247uLock('Vegetable Oil')) throw new Error('t247u bare vegetable oil');
if (t247uLock('Canola Oil')) throw new Error('t247u bare canola');
