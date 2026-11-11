import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  ingredientCountsTowardLimitedStack,
  isT164uCautionName,
  isT164uClearedName,
  isT164uLimitedName,
} from './limitedStackEligibility';
import { T128U_MALTODEXTRIN_WHY, T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const ALGINATE = 'Sodium alginate is a thickener from seaweed. It is Cleared.';
const BKC =
  'Benzalkonium chloride is a preservative used in eye and nasal products. It is graded Limited and counts toward a 3+ Limited stack.';
const CETEARYL = 'Cetearyl alcohol is a fatty alcohol used as an emulsifier in cream bases.';
const ALOE_JUICE = 'Aloe barbadensis leaf juice is the juice from the aloe plant used as a plant ingredient.';
const CELLULOSE_GUM = 'Cellulose gum is a plant-fiber thickener or coating.';
const STEVIA =
  'Stevia leaf extract is a sweetener from the stevia plant. It is graded Limited and counts toward a 3+ Limited stack unless it is the high-purity Rebaudioside A form.';
const ALCOHOL =
  'Alcohol is the solvent that carries the other ingredients. It is graded Limited and counts toward a 3+ Limited stack.';
const ISOPROPYL =
  'Isopropyl alcohol is a solvent. It is graded Limited and counts toward a 3+ Limited stack.';
const RICE_WAX =
  'Rice bran wax is a wax from rice bran. It is graded Limited and counts toward a 3+ Limited stack.';
const IRON =
  'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';
const SPIRULINA =
  'Blue spirulina is an algae color. It is graded Limited and counts toward a 3+ Limited stack.';
const ALOE_GEL =
  'Aloe vera gel is a plant juice or gel. It is graded Limited and counts toward a 3+ Limited stack.';
const MODIFIED =
  'This is a modified starch. Plain corn starch and potato starch are a different line. It is graded Limited and counts toward a 3+ Limited stack.';
const POLYACRYLATE = 'Sodium polyacrylate is a gel-forming polymer used as a thickener.';
const PHENOXY = 'Phenoxyethanol is a preservative used on the skin.';
const ACRYLATES = 'This is a synthetic polymer used as a thickener in creams.';
const TEA = 'Triethanolamine is a pH adjuster used in creams.';
const EUCALYPTUS = 'Eucalyptus oil is a plant essential oil used as a scent or inactive.';
const STEARETH = 'Steareth is a fatty-alcohol ether used as an emulsifier in cream bases.';

const WHY_AT_LOCK: Record<string, string> = {
  'cetearyl alcohol': CETEARYL,
  'aloe barbadensis leaf juice': ALOE_JUICE,
  'hydroxyethyl cellulose': CELLULOSE_GUM,
  stevia: STEVIA,
  'alcohol denat.': ALCOHOL,
  'isopropyl alcohol': ISOPROPYL,
  'rice bran wax': RICE_WAX,
  'iron oxide red': IRON,
  'iron oxide black': IRON,
  'iron oxide yellow': IRON,
  'blue spirulina (for color)': SPIRULINA,
  'aloe vera gel': ALOE_GEL,
  'modified corn starch': MODIFIED,
  'organic maltodextrin': T128U_MALTODEXTRIN_WHY,
  'sodium polyacrylate': POLYACRYLATE,
  phenoxyethanol: PHENOXY,
  'acrylates/c10-30 alkyl acrylate crosspolymer': ACRYLATES,
  triethanolamine: TEA,
  'eucalyptus oil': EUCALYPTUS,
  'steareth-21': STEARETH,
  'polyacrylic acid': POLYACRYLATE,
};

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t164u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  moderate: 'Methodology §5 Caution (founder lock t164u). Does not count toward the t137u stack. Prior locks are not binding for this exact token.',
  limited: 'Methodology §5 Limited (founder lock t164u). Counts toward the 3+ Limited stack. Prior locks are not binding for this exact token.',
  high: 'Methodology §5 Avoid (founder lock t164u).',
};

function token(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function t164uGrade(name: string): RiskLevel | undefined {
  if (isT164uClearedName(name)) return 'cleared';
  if (isT164uCautionName(name)) return 'moderate';
  if (isT164uLimitedName(name)) return 'limited';
  return undefined;
}

/** Part A. Exact tokens only, and only when the row is already at the locked grade. */
export function t164uPartAWhy(name: string, riskLevel: string | undefined): string | undefined {
  const key = token(name);
  if (key === 'sodium alginate' && riskLevel === 'cleared') return ALGINATE;
  if (key === 'benzalkonium chloride' && riskLevel === 'limited') return BKC;
  return undefined;
}

function withLockSource(existing: string | undefined, grade: RiskLevel): string {
  const next = SOURCE[grade];
  if (!existing) return next;
  const idx = existing.search(/Methodology §5/i);
  if (idx === -1) return `${existing}; ${next}`;
  const prefix = existing.slice(0, idx).replace(/[;\s]+$/, '');
  return prefix ? `${prefix}; ${next}` : next;
}

function stripStackNote(note: string | undefined): string {
  if (!note) return '';
  if (note.trim() === T128U_STACK_NOTE) return '';
  return note.replace(T128U_STACK_NOTE, '').replace(/\s{2,}/g, ' ').trim();
}

/** Part B grades. Part A why text only. Prior locks are not binding for Part B. */
export function applyT164uRow(record: RatingRecord): RatingRecord {
  const touches = record.inactiveIngredients.some(
    (ingredient) => t164uGrade(ingredient.name) || token(ingredient.name) === 'sodium alginate' || token(ingredient.name) === 'benzalkonium chloride',
  );
  if (!touches) return record;
  const before = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const grade = t164uGrade(ingredient.name);
    if (grade) {
      const why = WHY_AT_LOCK[token(ingredient.name)];
      const nextWhy = why ?? ingredient.why;
      const exempt = grade !== 'limited';
      if (
        ingredient.riskLevel === grade
        && ingredient.stackCountExempt === exempt
        && (ingredient.source ?? '').includes('founder lock t164u')
        && ingredient.why === nextWhy
      ) {
        return ingredient;
      }
      changed = true;
      return {
        ...ingredient,
        riskLevel: grade,
        stackCountExempt: exempt,
        source: withLockSource(ingredient.source, grade),
        ...(why ? { why } : {}),
      };
    }
    const partA = t164uPartAWhy(ingredient.name, ingredient.riskLevel);
    if (!partA || ingredient.why === partA) return ingredient;
    changed = true;
    return { ...ingredient, why: partA };
  });
  const after = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  const hadStack = before.cause === 'limited_stack';
  const hasStack = after.cause === 'limited_stack';
  let honestNote = record.honestNote;
  let founderHonestNote = record.founderHonestNote;
  let founderChanged = false;
  if (!hadStack && hasStack && before.verdict !== 'avoid') {
    honestNote = T128U_STACK_NOTE;
    founderHonestNote = T128U_STACK_NOTE;
    founderChanged = founderHonestNote !== record.founderHonestNote;
  } else if (hadStack && !hasStack) {
    const nextHonest = stripStackNote(record.honestNote);
    if (nextHonest !== (record.honestNote ?? '')) honestNote = nextHonest;
    if (record.founderHonestNote === T128U_STACK_NOTE) {
      founderHonestNote = undefined;
      founderChanged = true;
    }
  }
  if (
    !changed
    && after.verdict === record.verdict
    && honestNote === record.honestNote
    && !founderChanged
  ) {
    return record;
  }
  const next: RatingRecord = {
    ...record,
    inactiveIngredients: changed ? inactiveIngredients : record.inactiveIngredients,
    verdict: after.verdict,
    honestNote,
  };
  if (founderChanged && founderHonestNote === undefined) {
    delete next.founderHonestNote;
  } else if (founderHonestNote !== undefined) {
    next.founderHonestNote = founderHonestNote;
  }
  return next;
}

const STACK_CHECK: Array<[string, RiskLevel, boolean]> = [
  ['stevia', 'limited', true],
  ['alcohol denat.', 'limited', true],
  ['modified corn starch', 'limited', true],
  ['cetearyl alcohol', 'cleared', false],
  ['tapioca dextrin', 'cleared', false],
  ['sodium polyacrylate', 'moderate', false],
  ['eucalyptus oil', 'moderate', false],
];

for (const [name, grade, counts] of STACK_CHECK) {
  if (t164uGrade(name) !== grade) throw new Error(`t164u grade ${name}`);
  const ingredient: IngredientFlag = {
    name,
    riskLevel: grade,
    stackCountExempt: grade !== 'limited',
    source: SOURCE[grade],
  };
  if (ingredientCountsTowardLimitedStack(ingredient) !== counts) throw new Error(`t164u stack ${name}`);
}

if (
  t164uGrade('sorbitan monostearate')
  || t164uGrade('sorbitol sorbitan')
  || t164uGrade('stevia leaf extract')
  || t164uGrade('stevia extract')
  || t164uGrade('annatto extract')
  || t164uGrade('alcohol')
  || t164uGrade('iron oxide')
  || t164uGrade('red iron oxide')
  || t164uGrade('beta carotene')
  || t164uGrade('blue spirulina')
  || t164uGrade('corn starch')
  || t164uGrade('maltodextrin')
  || t164uGrade('modified starch')
  || t164uGrade('aloe vera gel (powder)')
) {
  throw new Error('t164u over-matched');
}

if (t164uPartAWhy('sodium alginate', 'cleared') !== ALGINATE) throw new Error('t164u alginate');
if (t164uPartAWhy('sodium alginate', 'limited') !== undefined) throw new Error('t164u alginate grade');
if (t164uPartAWhy('benzalkonium chloride', 'limited') !== BKC) throw new Error('t164u bkc');
if (t164uPartAWhy('benzalkonium chloride', 'moderate') !== undefined) throw new Error('t164u bkc grade');
if (t164uPartAWhy('sodium alginate solution', 'cleared') !== undefined) throw new Error('t164u alginate boundary');
