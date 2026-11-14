// DRAFT / not verified / batch 433 KYR6-e (t285u).
// Lion's Mane Plus is the only current brand panel with every other ingredient already locked.
// No honest note. Silicon dioxide is Caution and does not count. Rice flour is the one counting Limited.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t240uLock } from '../scan-preview/t240uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

const RICE = t240uLock('rice flour');
const FLAVOR = t240uLock('natural flavors', 'liquid');
if (!RICE || RICE.grade !== 'limited' || !RICE.counts) throw new Error('t285u rice flour');
if (!FLAVOR || FLAVOR.grade !== 'limited' || !FLAVOR.counts) throw new Error('t285u flavors');
const CAPSULE = t134uWhyForName('hypromellose');
const PHOSPHATE = t134uWhyForName('dicalcium phosphate');
const STEARATE = t134uWhyForName('vegetable magnesium stearate');
const MALIC = t134uWhyForName('malic acid');
const CITRIC = t134uWhyForName('citric acid');
const WATER = cleanTokenWhyForName('Filtered Water');
const SUCRALOSE = t135uWhyForName('Sucralose', 'liquid');
const SORBATE = t135uWhyForName('Potassium Sorbate (preservative)', 'liquid');
const BENZOATE = t135uWhyForName('Sodium Benzoate (preservative)', 'liquid');
if (!CAPSULE || !PHOSPHATE || !STEARATE || !MALIC || !CITRIC || !WATER || !SUCRALOSE || !SORBATE || !BENZOATE) {
  throw new Error('t285u why');
}
const MIXED = 'This is a natural and artificial flavor mixture. The label does not list every part of the mixture. It is graded Limited and counts toward a 3+ Limited stack.';

const LION: IngredientFlag[] = [
  flag('Vegetable capsule (hypromellose)', 'cleared', false, CAPSULE, 't134u'),
  flag('dicalcium phosphate', 'cleared', false, PHOSPHATE, 't134u'),
  flag('rice flour', 'limited', true, RICE.why, 't160u'),
  flag('vegetable magnesium stearate', 'cleared', false, STEARATE, 't134u'),
  flag('silicon dioxide', 'moderate', false, T128U_SILICA_WHY, 't160u'),
];

function shot(natural: boolean): IngredientFlag[] {
  return [
    flag('Filtered Water', 'cleared', false, WATER!, 't108u'),
    flag(natural ? 'Natural Flavors' : 'Natural and Artificial Flavors', 'limited', true, natural ? FLAVOR!.why : MIXED, natural ? 't240u' : 't162u'),
    flag('Malic Acid', 'cleared', false, MALIC!, 't134u'),
    flag('Citric Acid', 'cleared', false, CITRIC!, 't134u'),
    flag('Sucralose', 'limited', true, SUCRALOSE!, 't135u'),
    flag('Potassium Sorbate (preservative)', 'moderate', false, SORBATE!, 't135u'),
    flag('Sodium Benzoate (preservative)', 'moderate', false, BENZOATE!, 't135u'),
  ];
}

function row(id: string, name: string, ingredients: IngredientFlag[], source: string): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'Focus Factor',
    category: 'Vitamins',
    formulaId: id,
    form: id.includes('shot') ? 'liquid' : 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Focus Factor'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients,
    verdict: 'caution',
    sourcesGeneral: [source],
  };
}

export const BATCH433_KYR6E_T285U: RatingRecord[] = [
  row(
    'focus-factor-b433-lions-mane-plus-60',
    "Lion's Mane Plus 60 Capsules",
    LION,
    't285u. https://www.focusfactor.com/products/lions-mane-plus is the ingredient panel. 60 capsules. Other ingredients: Vegetable capsule (hypromellose), dicalcium phosphate, rice flour, vegetable magnesium stearate, silicon dioxide. Counted Limited: rice flour. Silicon dioxide is Caution and does not count. No honest note. No UPC on the brand page. DSLD has no Lion\'s Mane Plus label. Missing UPC.',
  ),
  row(
    'focus-factor-b433-shot-extra-pineapple-59ml',
    'Focus + Energy Shot Extra Strength Pineapple Paradise',
    shot(true),
    't285u. https://www.focusfactor.com/products/focus-energy-shot-extra-strength-pineapple-paradise is the ingredient panel. Serving size 1 bottle (59 ml). Counted Limited: natural flavors; sucralose. Potassium sorbate and sodium benzoate are Caution and do not count. No honest note. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b433-shot-extra-peach-mango-59ml',
    'Focus + Energy Shot Extra Strength Peach Mango',
    shot(false),
    't285u. https://www.focusfactor.com/products/focus-energy-shot-extra-strength-peach-mango is the ingredient panel. Serving size 1 bottle (59 ml). Counted Limited: natural and artificial flavors; sucralose. No honest note. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b433-shot-berry-twang-59ml',
    'Focus + Energy Shot Regular Strength Berry Twang',
    shot(true),
    't285u. https://www.focusfactor.com/products/focus-energy-shot-regular-strength-berry-twang is the ingredient panel. Serving size 1 bottle (59 ml). Same other ingredients as Extra Strength Pineapple Paradise. No honest note. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b433-shot-tropical-punch-59ml',
    'Focus + Energy Shot Regular Strength Tropical Punch',
    shot(false),
    't285u. https://www.focusfactor.com/products/focus-energy-shot-regular-strength-tropical-punch is the ingredient panel. Serving size 1 bottle (59 ml). Same other ingredients as Extra Strength Peach Mango. No honest note. No UPC on the brand page. Missing UPC.',
  ),
];
