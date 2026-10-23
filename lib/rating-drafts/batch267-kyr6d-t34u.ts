// DRAFT / not verified / batch 267 KYR6-d (t34u).
// Two Goli 30-count gummies. The brand page showing the pack for sale is the single source.
// Women's PMS and Lactaid Original 80 are closed not for sale and are not rows.
// Beano To Go 12 and Meltaways 15 stay held on a formula conflict and are not rows.
// Os-Cal and Spring Valley are not in this file.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  betaCarotene:
    'Methodology §5 Caution (Beta Carotene (For Color) — beta-carotene as a color, not the vitamin; locked Sept 16, 2026). Does not count toward the t137u stack.',
  caneSugar: 'Methodology §5 Cleared (cane sugar — food sweetener; not bare sugar).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  malic: 'Methodology §5 Cleared (malic acid — lactic acid / malic acid row).',
  namedFlavor:
    'Methodology §5 Cleared (Natural Strawberry watermelon raspberry flavor — named multi-fruit flavor; founder lock t119u Oct 17, 2026). Not the Limited Strawberry watermelon raspberry flavor row. Does not count toward the t137u stack.',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — flavor family row; locked Sept 24, 2026). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  pectin: 'Methodology §5 Cleared (pectin — food-gum family).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  sodiumCitrateDi:
    'Methodology §5 Cleared (sodium citrate dihydrate — citrate-salt buffer; locked Sept 25, 2026).',
  sunflowerLecithin:
    'Methodology §5 Cleared (sunflower lecithin — lecithin family; EFSA 2017 no safety concern).',
  tapiocaSyrup: 'Methodology §5 Cleared (tapioca syrup — food syrup; not tapioca maltodextrin).',
  tocopheryl:
    'Methodology §5 Cleared (d-alpha Tocopheryl Acetate — DL-alpha tocopheryl acetate row). Founder override Oct 17, 2026 t118u. Not bare tocopheryl acetate.',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function withNotes(flags: IngredientFlag[], form: string): string | undefined {
  const stack = limitedStackHonestNoteIfAny(flags);
  const formNote =
    contradictionHonestNote({
      id: 'note',
      productName: 'note',
      brand: 'note',
      category: 'Vitamins',
      form,
      activeIngredients: [],
      inactiveIngredients: flags,
      verdict: 'clean',
      retailers: [],
    }) ?? undefined;
  if (stack && formNote) return `${formNote} ${stack}`;
  return stack ?? formNote;
}

const P_SF =
  'Brand page https://goli.com/products/1-bottle-of-superfruits-gummies-30-count (t34u). $11.99 one-time, Add to cart. The brand page showing the pack for sale is the single source. UPC not shown.';
const P_SG =
  'Brand page https://goli.com/products/1-bottle-of-supergreens-gummies-30-count (t34u). $11.99 one-time, Add to cart. The brand page showing the pack for sale is the single source. UPC not shown.';

const SF_FLAGS: IngredientFlag[] = [
  flag(P_SF, 'Cane Sugar', 'cleared', 'caneSugar'),
  flag(P_SF, 'Tapioca syrup', 'cleared', 'tapiocaSyrup'),
  flag(P_SF, 'Water', 'cleared', 'water'),
  flag(P_SF, 'Pectin', 'cleared', 'pectin'),
  flag(P_SF, 'Natural Strawberry Watermelon Raspberry Flavor', 'cleared', 'namedFlavor'),
  flag(P_SF, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
  flag(P_SF, 'Malic Acid', 'cleared', 'malic'),
  flag(P_SF, 'Beta Carotene (for color)', 'moderate', 'betaCarotene'),
];

const SG_FLAGS: IngredientFlag[] = [
  flag(P_SG, 'Cane Sugar', 'cleared', 'caneSugar'),
  flag(P_SG, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
  flag(P_SG, 'Water', 'cleared', 'water'),
  flag(P_SG, 'Pectin', 'cleared', 'pectin'),
  flag(P_SG, 'Natural Flavor', 'moderate', 'natFlavor'),
  flag(P_SG, 'Malic Acid', 'cleared', 'malic'),
  flag(P_SG, 'Citric Acid', 'cleared', 'citric'),
  flag(P_SG, 'Sodium Citrate Dihydrate', 'cleared', 'sodiumCitrateDi'),
  flag(P_SG, 'Sunflower Lecithin', 'cleared', 'sunflowerLecithin'),
  flag(P_SG, 'd-alpha Tocopheryl Acetate', 'cleared', 'tocopheryl'),
];

function pack(
  id: string,
  productName: string,
  formulaId: string,
  flags: IngredientFlag[],
  actives: RatingRecord['activeIngredients'],
  sources: string,
): RatingRecord {
  const rollup = computeVerdictFromInactiveIngredients(flags);
  return {
    id,
    productName,
    brand: 'Goli',
    category: 'Vitamins',
    formulaId,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '',
    activeIngredients: actives,
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    honestNote: withNotes(flags, 'gummy'),
    retailers: ['goli.com'],
    sourcesGeneral: [sources],
  };
}

export const BATCH267_KYR6D_T34U: RatingRecord[] = [
  pack(
    'goli-b267-superfruits-30',
    'Goli SuperFruits Gummies (30 gummies)',
    'goli-b267-superfruits-30',
    SF_FLAGS,
    [
      { name: 'Vitamin A (as retinyl palmitate)', strength: '250 mcg' },
      { name: 'Vitamin C (as ascorbic acid)', strength: '90 mg' },
      { name: 'Vitamin E (as d-alpha tocopheryl acetate)', strength: '5 mg' },
      { name: 'Zinc (as zinc citrate)', strength: 'listed, not on the facts table' },
      {
        name: 'Super Fruits Blend (Acai Berry, Acerola Berry, Amla Berry, Pomegranate, Goji Berry, Banana, Apple, Strawberry)',
        strength: '100 mg',
      },
      { name: 'Bamboo Shoot Extract (70% silica)', strength: '11 mg' },
    ],
    'Caution. Beta Carotene (for color) is the one Caution token and does not stack. Counted Limited tokens: none. Cane Sugar, Tapioca syrup, Water, Pectin, Natural Strawberry Watermelon Raspberry Flavor, Sodium Citrate, and Malic Acid are Cleared. Bamboo Shoot Extract (70% silica) is on the Supplement Facts at 11 mg and is not graded. The vitamins and the Super Fruits Blend are actives and are not graded. Zinc (as zinc citrate) is on the ingredient list and not on the facts table; zinc as a nutrient is not an inactive grade. Not a 3+ stack. No honest note. No SuperFruits 60 row exists. This 30 is not goli-b223-supergreens-60. Missing UPC. No code was invented. Brand page https://goli.com/products/1-bottle-of-superfruits-gummies-30-count $11.99 Add to cart.',
  ),
  pack(
    'goli-b267-supergreens-30',
    'Goli Supergreens Gummies (30 gummies)',
    'goli-b267-supergreens-30',
    SG_FLAGS,
    [
      { name: 'Vitamin A', strength: '113 mcg' },
      { name: 'Thiamin', strength: '0.3 mg' },
      { name: 'Niacin', strength: '0.805 mg' },
      { name: 'Vitamin B6', strength: '0.085 mg' },
      { name: 'Folate', strength: '20 mcg DFE' },
      { name: 'Vitamin B12', strength: '18 mcg' },
      { name: 'Pantothenic Acid', strength: '0.25 mg' },
      { name: 'Iron', strength: '1.41 mg' },
      { name: 'Magnesium', strength: '3.15 mg' },
      { name: 'Zinc', strength: '0.55 mg' },
      {
        name: 'Supergreens & Probiotics Blend (artichoke leaf extract 4:1, spirulina, Bacillus subtilis, aloe vera, kale, moringa leaf, broccoli, barley grass, chlorella, parsley, spinach, celery)',
        strength: '127.5 mg',
      },
    ],
    'Caution. Natural Flavor (singular) is the one Caution token and does not stack. Counted Limited tokens: none. Cane Sugar, Tapioca Syrup, Water, Pectin, Malic Acid, Citric Acid, Sodium Citrate Dihydrate, Sunflower Lecithin, and d-alpha Tocopheryl Acetate are Cleared. The facts-panel vitamins, minerals, and blend are actives and are not graded. Not a 3+ stack. No honest note. Not goli-b223-supergreens-60: that row has no d-alpha Tocopheryl Acetate. Missing UPC. No code was invented. Brand page https://goli.com/products/1-bottle-of-supergreens-gummies-30-count $11.99 Add to cart.',
  ),
];

const ROWS = BATCH267_KYR6D_T34U;

const expect: Record<string, { verdict: 'caution'; cause: 'moderate'; note: false; driver: string }> = {
  'goli-b267-superfruits-30': {
    verdict: 'caution',
    cause: 'moderate',
    note: false,
    driver: 'Beta Carotene (for color)',
  },
  'goli-b267-supergreens-30': {
    verdict: 'caution',
    cause: 'moderate',
    note: false,
    driver: 'Natural Flavor',
  },
};

if (ROWS.length !== 2) throw new Error(`batch267 row count ${ROWS.length}`);

for (const record of ROWS) {
  if (record.barcode) throw new Error(`batch267 upc must stay empty ${record.id}`);
  if (record.category !== 'Vitamins') throw new Error(`batch267 tab ${record.id}`);
  if (record.brand !== 'Goli') throw new Error(`batch267 brand ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch267 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const wanted = expect[record.id];
  if (!wanted || rollup.verdict !== wanted.verdict || rollup.cause !== wanted.cause || rollup.driver !== wanted.driver) {
    throw new Error(`batch267 shape ${record.id} ${rollup.verdict} ${rollup.cause} ${rollup.driver}`);
  }
  const limited = record.inactiveIngredients.filter((item) => item.riskLevel === 'limited');
  if (limited.length !== 0) throw new Error(`batch267 limited ${record.id} ${limited.map((item) => item.name).join(',')}`);
  const expectedNote = withNotes(record.inactiveIngredients, record.form ?? '');
  if ((record.honestNote ?? '') !== (expectedNote ?? '')) {
    throw new Error(`batch267 note ${record.id}: ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(expectedNote)}`);
  }
  if (record.honestNote) throw new Error(`batch267 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch267 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch267 pending ${ingredient.name}`);
    }
  }
}
