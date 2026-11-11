import type { RatingRecord } from '../ratingRecord';
import { isT125uBareShellName } from './t125uBareShell';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

const MIDDLE_CHAIN =
  'Middle-chain triglycerides are a processed fat used as a softgel or liquid fill. They are graded Limited and count toward a 3+ Limited stack.';
const MALTODEXTRIN =
  'Maltodextrin is a starch-based bulk sweetener. It is graded Limited and counts toward a 3+ Limited stack.';
const NATURAL_FLAVOR =
  'Natural flavors is an unnamed flavor blend. It is graded Limited and counts toward a 3+ Limited stack.';
const SILICA =
  'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const MODIFIED_CELLULOSE =
  'Modified cellulose gum is a processed form of cellulose used as a binder or thickener. It is not the simple fiber form.';
const SORBITOL =
  'Sorbitol is a sugar alcohol used as a sweetener or moisture keeper. Large amounts can cause bloating or loose stools. EFSA and FDA allow it in limited quantities.';
const POTASSIUM_BENZOATE =
  'Potassium benzoate is a synthetic preservative. It is the potassium salt of benzoic acid and is graded Caution.';

export const T128U_STACK_NOTE =
  'This product is Not Clean because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is downgraded to Not Clean.';

export const T128U_SILICA_CELLULOSE_NOTE =
  'This product is Caution because it uses a processed cellulose derivative or silica as an anti-caking powder. Both are common, but the cellulose is modified and some forms of silica raise questions about tiny particles.';

/** Exact printed names only. Case and surrounding space are ignored. */
const TOKEN_WHY: Record<string, string> = {
  'middle chain triglycerides': MIDDLE_CHAIN,
  'medium chain triglycerides': MIDDLE_CHAIN,
  mct: MIDDLE_CHAIN,
  maltodextrin: MALTODEXTRIN,
  'organic maltodextrin': MALTODEXTRIN,
  'natural flavors': NATURAL_FLAVOR,
  'natural flavor': NATURAL_FLAVOR,
  silica: SILICA,
  'silicon dioxide': SILICA,
  sio2: SILICA,
  'modified cellulose gum': MODIFIED_CELLULOSE,
  'modified cellulose': MODIFIED_CELLULOSE,
  sorbitol: SORBITOL,
  'potassium benzoate': POTASSIUM_BENZOATE,
};

const SILICA_OR_CELLULOSE = new Set([
  'silica',
  'silicon dioxide',
  'sio2',
  'modified cellulose gum',
  'modified cellulose',
]);

export function t128uTokenKey(name: string): string | undefined {
  if (isT125uBareShellName(name)) return undefined;
  const key = name.trim().toLowerCase().replace(/\s+/g, ' ');
  return Object.prototype.hasOwnProperty.call(TOKEN_WHY, key) ? key : undefined;
}

export function t128uWhyForName(name: string): string | undefined {
  const key = t128uTokenKey(name);
  return key ? TOKEN_WHY[key] : undefined;
}

/** Stored why, and the two founder notes, on non-Clean rows only. Grades stay as they are. */
export function applyT128uTokenWhy(record: RatingRecord): RatingRecord {
  if (record.verdict === 'clean') return record;

  let whyChanged = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const why = t128uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    whyChanged = true;
    return { ...ingredient, why };
  });
  const ingredients = whyChanged ? inactiveIngredients : record.inactiveIngredients;
  const matched = ingredients.some((ingredient) => t128uTokenKey(ingredient.name));
  const rollup = computeVerdictFromInactiveIngredients(ingredients, record.activeSafetyFlag);
  let honestNote = record.honestNote;
  let founderHonestNote = record.founderHonestNote;
  if (matched && record.verdict === 'avoid' && rollup.cause === 'limited_stack') {
    honestNote = T128U_STACK_NOTE;
    founderHonestNote = T128U_STACK_NOTE;
  } else if (
    record.verdict === 'caution'
    && ingredients.some((ingredient) => {
      const key = t128uTokenKey(ingredient.name);
      return key !== undefined && SILICA_OR_CELLULOSE.has(key);
    })
  ) {
    honestNote = T128U_SILICA_CELLULOSE_NOTE;
    founderHonestNote = T128U_SILICA_CELLULOSE_NOTE;
  }
  if (
    !whyChanged
    && honestNote === record.honestNote
    && founderHonestNote === record.founderHonestNote
  ) {
    return record;
  }
  return { ...record, inactiveIngredients: ingredients, honestNote, founderHonestNote };
}

for (const name of [
  'Silica',
  'silicon dioxide',
  'SiO2',
  'MCT',
  'organic maltodextrin',
  'Natural flavors',
  'natural flavor',
  'modified cellulose gum',
  'Modified cellulose',
  'Sorbitol',
  'Potassium benzoate',
  'middle chain triglycerides',
  'Medium Chain Triglycerides',
]) {
  if (!t128uWhyForName(name)) throw new Error(`t128u missed ${name}`);
}
for (const name of [
  'Silica (anti-caking)',
  'MCT oil',
  'Natural flavor (lemon)',
  'Colloidal silicon dioxide',
  'Calcium Silicate',
  'Vegetable Capsule',
  'Vegetarian Capsule',
  'Vegan Capsule',
  'Veggie Softgel',
  'Medium-chain triglycerides',
  'Maltodextrin (from Non-GMO Corn)',
]) {
  if (t128uWhyForName(name)) throw new Error(`t128u over-matched ${name}`);
}
