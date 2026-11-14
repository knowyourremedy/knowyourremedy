// DRAFT / not verified / batch 434 KYR6-e (t287u).
// Seven founder-named Focus Factor products. Avoid only from a 3+ Limited stack.
// The exact note is stored. No Avoid ingredient. No new lock.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t141uWhyForName } from '../scan-preview/t141uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t240uLock } from '../scan-preview/t240uLocks';
import { t251uLock } from '../scan-preview/t251uLocks';
import { t286uLock } from '../scan-preview/t286uLocks';
import { T287U_STACK_NOTE } from '../scan-preview/t287uRows';

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

function need(name: string, lock: { grade: string; counts: boolean; why: string } | undefined): { grade: IngredientFlag['riskLevel']; counts: boolean; why: string } {
  if (!lock?.why) throw new Error(`t287u missing ${name}`);
  return { grade: lock.grade as IngredientFlag['riskLevel'], counts: lock.counts, why: lock.why };
}

const COMPRESSIBLE = need('compressible', t286uLock('Compressible Sugar'));
const PURE = need('pure cane', t286uLock('Pure Cane Sugar'));
const FLAVOR = need('flavors', t240uLock('natural flavors', 'chewable'));
const FRUCTOSE = need('fructose', { grade: 'limited', counts: true, why: t141uWhyForName('Fructose') ?? '' });
const CANE = need('organic cane', { grade: 'cleared', counts: false, why: t141uWhyForName('Organic Cane Sugar') ?? '' });
const MCC = need('mcc', { grade: 'cleared', counts: false, why: t134uWhyForName('microcrystalline cellulose') ?? '' });
const MALIC = need('malic', { grade: 'cleared', counts: false, why: t134uWhyForName('malic acid') ?? '' });
const CITRIC = need('citric', { grade: 'cleared', counts: false, why: t134uWhyForName('citric acid') ?? '' });
const SILICA = need('silica', { grade: 'moderate', counts: false, why: T128U_SILICA_WHY });
const MAG = need('mag', { grade: 'cleared', counts: false, why: t134uWhyForName('magnesium stearate') ?? '' });
const VEG_MAG = need('veg mag', { grade: 'cleared', counts: false, why: t134uWhyForName('vegetable magnesium stearate') ?? '' });
const CARBONATED = need('carbonated', t286uLock('Carbonated Water'));
const TAURINE = need('taurine', t286uLock('Taurine'));
const CAFFEINE = need('caffeine', t286uLock('Caffeine Anhydrous'));
const GLUCU = need('glucuronolactone', t286uLock('D-Glucuronolactone'));
const GINSENG = need('ginseng', t286uLock('Ginseng Root Extract'));
const GUARANA = need('guarana', t286uLock('Guarana Seed Extract'));
const INOSITOL = need('inositol', t286uLock('Inositol'));
const CARNITINE = need('carnitine', t286uLock('L-Carnitine L-Tartrate'));
const CITRATE = need('citrate', { grade: 'cleared', counts: false, why: t134uWhyForName('sodium citrate') ?? '' });
const SUCRALOSE = need('sucralose', { grade: 'limited', counts: true, why: t135uWhyForName('Sucralose', 'liquid') ?? '' });
const ACESULFAME = need('ace', { grade: 'limited', counts: true, why: t135uWhyForName('Acesulfame Potassium', 'liquid') ?? '' });
const SORBATE = need('sorbate', { grade: 'moderate', counts: false, why: t135uWhyForName('Potassium Sorbate (preservative)', 'liquid') ?? '' });
const BENZOATE = need('benzoate', { grade: 'moderate', counts: false, why: t135uWhyForName('Sodium Benzoate (preservative)', 'liquid') ?? '' });
const CARAMEL = need('caramel', t251uLock('caramel color'));
const MIXED = 'This is a natural and artificial flavor mixture. The label does not list every part of the mixture. It is graded Limited and counts toward a 3+ Limited stack.';

function f(name: string, lock: { grade: IngredientFlag['riskLevel']; counts: boolean; why: string }, mark: string): IngredientFlag {
  return flag(name, lock.grade, lock.counts, lock.why, mark);
}

const KIDS: IngredientFlag[] = [
  f('Compressible Sugar', COMPRESSIBLE, 't286u'),
  f('Organic Cane Sugar', CANE, 't141u'),
  f('Natural Flavors', FLAVOR, 't240u'),
  f('Microcrystalline Cellulose', MCC, 't134u'),
  f('Fructose', FRUCTOSE, 't141u'),
  f('Malic Acid', MALIC, 't134u'),
  f('Silicon Dioxide', SILICA, 't160u'),
  f('Pure Cane Sugar', PURE, 't286u'),
  f('Vegetable Magnesium Stearate', VEG_MAG, 't134u'),
];

const KIDS_EXTRA: IngredientFlag[] = [
  f('Compressible Sugar', COMPRESSIBLE, 't286u'),
  f('Organic Cane Sugar', CANE, 't141u'),
  f('Natural Flavors', FLAVOR, 't240u'),
  f('Fructose', FRUCTOSE, 't141u'),
  f('Microcrystalline Cellulose', MCC, 't134u'),
  f('Malic Acid', MALIC, 't134u'),
  f('Silicon Dioxide', SILICA, 't160u'),
  f('Citric Acid', CITRIC, 't134u'),
  f('Pure Cane Sugar', PURE, 't286u'),
  f('Magnesium Stearate', MAG, 't134u'),
];

function drinkBase(flavorName: string, flavorWhy: string, flavorMark: string, extra: IngredientFlag[] = []): IngredientFlag[] {
  return [
    f('Carbonated Water', CARBONATED, 't286u'),
    f('Taurine', TAURINE, 't286u'),
    f('Citric Acid', CITRIC, 't134u'),
    f('Sodium Citrate', CITRATE, 't134u'),
    f('Caffeine Anhydrous', CAFFEINE, 't286u'),
    f('D-Glucuronolactone', GLUCU, 't286u'),
    flag(flavorName, 'limited', true, flavorWhy, flavorMark),
    f('Sodium Benzoate (preservative)', BENZOATE, 't135u'),
    f('Potassium Sorbate (preservative)', SORBATE, 't135u'),
    f('Ginseng Root Extract', GINSENG, 't286u'),
    f('Guarana Seed Extract', GUARANA, 't286u'),
    f('Acesulfame Potassium', ACESULFAME, 't135u'),
    f('Sucralose', SUCRALOSE, 't135u'),
    f('Inositol', INOSITOL, 't286u'),
    f('L-Carnitine L-Tartrate', CARNITINE, 't286u'),
    ...extra,
  ];
}

const BERRY = drinkBase('Natural Flavors', FLAVOR.why, 't240u');
const PINE = [
  f('Carbonated Water', CARBONATED, 't286u'),
  f('Taurine', TAURINE, 't286u'),
  f('Citric Acid', CITRIC, 't134u'),
  f('Sodium Citrate', CITRATE, 't134u'),
  f('Caffeine Anhydrous', CAFFEINE, 't286u'),
  f('D-Glucuronolactone', GLUCU, 't286u'),
  f('Potassium Sorbate (preservative)', SORBATE, 't135u'),
  f('Sodium Benzoate (preservative)', BENZOATE, 't135u'),
  f('Guarana Seed Extract', GUARANA, 't286u'),
  f('Natural Flavors', FLAVOR, 't240u'),
  f('Sucralose', SUCRALOSE, 't135u'),
  f('Ginseng Root Extract', GINSENG, 't286u'),
  f('Acesulfame Potassium', ACESULFAME, 't135u'),
  f('Inositol', INOSITOL, 't286u'),
  f('L-Carnitine L-Tartrate', CARNITINE, 't286u'),
];
const ORIGINAL = drinkBase('Natural and Artificial Flavors', MIXED, 't162u', [f('Caramel Color', CARAMEL, 't251u')]);

function row(id: string, name: string, formulaId: string, form: string, audience: RatingRecord['audience'], minAge: number, ingredients: IngredientFlag[], source: string): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'Focus Factor',
    category: 'Vitamins',
    formulaId,
    form,
    audience,
    minAge,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Focus Factor'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients,
    verdict: 'avoid',
    honestNote: T287U_STACK_NOTE,
    founderHonestNote: T287U_STACK_NOTE,
    sourcesGeneral: [source],
  };
}

export const BATCH434_KYR6E_T287U: RatingRecord[] = [
  row(
    'focus-factor-b434-kids-formula-60',
    'Focus Factor Kids Formula 60 Chewables',
    'focus-factor-b434-kids-formula',
    'chewable',
    'kids',
    4,
    KIDS,
    't287u. https://www.focusfactor.com/products/kids-chewables is the ingredient panel. 60 chewables. Ages 4+. Counted Limited: compressible sugar; natural flavors; fructose; pure cane sugar. No Avoid ingredient. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b434-kids-formula-150',
    'Focus Factor Kids Formula 150 Chewables',
    'focus-factor-b434-kids-formula',
    'chewable',
    'kids',
    4,
    KIDS,
    't287u. https://www.focusfactor.com/products/kids-chewables is the ingredient panel. 150 chewables. Same other ingredients as the 60 count. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b434-kids-extra-strength-120',
    'Focus Factor Kids Extra Strength 120 Chewables',
    'focus-factor-b434-kids-extra-strength-120',
    'chewable',
    'kids',
    4,
    KIDS_EXTRA,
    't287u. https://www.focusfactor.com/products/kids-extra-strength is the ingredient panel. 120 chewables. Counted Limited: compressible sugar; natural flavors; fructose; pure cane sugar. No Avoid ingredient. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b434-energy-berry-12',
    'Focus + Energy Berry 12 x 355 ml',
    'focus-factor-b434-energy-berry-12',
    'liquid',
    'adult',
    18,
    BERRY,
    't287u. https://www.focusfactor.com/products/focus-energy-drink-berry is the ingredient panel. 12 x 355 ml. Counted Limited: natural flavors; sucralose; acesulfame potassium. No Avoid ingredient. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b434-energy-pineapple-12',
    'Focus + Energy Pineapple Paradise 12 x 355 ml',
    'focus-factor-b434-energy-pineapple-rainbow',
    'liquid',
    'adult',
    18,
    PINE,
    't287u. https://www.focusfactor.com/products/focus-energy-drink-pineapple-paradise is the ingredient panel. 12 x 355 ml. Counted Limited: natural flavors; sucralose; acesulfame potassium. No Avoid ingredient. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b434-energy-rainbow-12',
    'Focus + Energy Rainbow Shaved Ice 12 x 355 ml',
    'focus-factor-b434-energy-pineapple-rainbow',
    'liquid',
    'adult',
    18,
    PINE,
    't287u. https://www.focusfactor.com/products/focus-energy-drink-rainbow-shaved-ice is the ingredient panel. 12 x 355 ml. Same other ingredients as Pineapple Paradise. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'focus-factor-b434-energy-original-12',
    'Focus + Energy Original 12 x 355 ml',
    'focus-factor-b434-energy-original-12',
    'liquid',
    'adult',
    18,
    ORIGINAL,
    't287u. https://www.focusfactor.com/products/focus-energy-drink-original is the ingredient panel. 12 x 355 ml. Counted Limited: natural and artificial flavors; sucralose; acesulfame potassium; caramel color. No Avoid ingredient. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
  ),
];
