// DRAFT / not verified / batch 500 KYR6-e (t400u).
// Cymbiotika products that the t400u locks finish.
// No 3+ note. Pure Hydration has no per-flavor UPC. Mineral Shilajit has no UPC.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t400uResolve } from '../scan-preview/t400uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

const FLAVOR = '[Named flavor]. It adds [named] taste to the product.';
const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const WATER = 'This is plain water used as the liquid base. Spring or artesian water is groundwater that rises naturally.';
const MALIC = 'Malic acid is a natural acid used to set the acidity of the product.';
const HONEY = 'Honey is a natural sweetener made by bees. It is used in small amounts in liquids and gummies.';
const SILICA = 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const CITRATE = 'Sodium citrate is a salt of citric acid used to set acidity.';

function flag(panel: string, name: string, grade: RiskLevel, counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'high'
    ? 'Methodology §5 Avoid.'
    : grade === 'limited' && counts
      ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
      : grade === 'limited'
        ? 'Methodology §5 Limited. Does not count toward the t137u stack.'
        : grade === 'moderate'
          ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
          : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}`, ...(why ? { why } : {}) };
}

function stored(panel: string, name: string, form: string, fallback?: string): IngredientFlag {
  const hit = t400uResolve(name, form);
  if (!hit) throw new Error(`t400u unlocked ${name}`);
  const why = hit.lock.why || fallback;
  return flag(panel, name, hit.lock.grade, hit.lock.counts, why);
}

function row(args: {
  id: string;
  productName: string;
  form: 'liquid' | 'powder';
  barcode: string;
  verdict: RatingRecord['verdict'];
  panel: string;
  names: Array<[string, string?]>;
  source: string;
}): RatingRecord {
  return {
    id: args.id,
    productName: args.productName,
    brand: 'Cymbiotika',
    category: 'Vitamins',
    formulaId: args.id,
    form: args.form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Cymbiotika'],
    barcode: args.barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: args.names.map(([name, fallback]) => stored(args.panel, name, args.form, fallback)),
    verdict: args.verdict,
    sourcesGeneral: [args.source],
  };
}

const colostrum = (count: string, barcode: string): RatingRecord => row({
  id: `cymbiotika-b500-liquid-colostrum-${count.split(' ')[0]}`,
  productName: `Liquid Colostrum, ${count}`,
  form: 'liquid',
  barcode,
  verdict: 'caution',
  panel: `Cymbiotika Liquid Colostrum, ${count}. Brand site https://cymbiotika.com/en-us.`,
  names: [
    ['Whole Bovine Colostrum'],
    ['Organic Cassava Syrup'],
    ['Glycerin', GLYCERIN],
    ['Organic Almond Butter'],
    ['Water', WATER],
    ['Organic Vanilla Powder'],
    ['Organic Vanilla Extract'],
    ['Sea Salt'],
  ],
  source: `t400u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Liquid Colostrum. Serving size 10 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Graded ingredients: Whole Bovine Colostrum, Organic Cassava Syrup, Glycerin, Organic Almond Butter, Water, Organic Vanilla Powder, Organic Vanilla Extract, Sea Salt. Sodium and Protein are nutrition-facts lines and are not graded. Counted Limited tokens: Organic Cassava Syrup. That is one, so no 3+ note is stored.`,
});

const hydrationNames = (flavor: string): Array<[string, string?]> => [
  [flavor],
  ['Cane Sugar'],
  ['Malic Acid', MALIC],
  ['Stevia Leaf Extract'],
  ['Vitamin C'],
  ['Riboflavin'],
  ['Niacin'],
  ['Niacinamide'],
  ['Vitamin B12 (as Methylcobalamin)'],
  ['Calcium'],
  ['Calcium Bisglycinate'],
  ['Phosphorus'],
  ['Potassium Phosphate'],
  ['Magnesium'],
  ['Magnesium Glycinate'],
  ['Sea Salt'],
  ['Sodium Citrate', CITRATE],
  ['Potassium'],
  ['Potassium Chloride'],
  ['L-Tyrosine'],
  ['L-Leucine'],
  ['Taurine'],
  ['Alpha-Ketoglutarate'],
  ['Arginine Alpha Ketoglutarate'],
  ['Citrulline Malate'],
  ['L-Glutamine'],
  ['L-Isoleucine'],
  ['L-Valine'],
  ['Grape Seed Extract'],
  ['Bamboo leaf extract'],
  ['Silica', SILICA],
];

function hydration(id: string, flavor: string, dsld: string): RatingRecord {
  return row({
    id,
    productName: `Pure Hydration, ${flavor.replace(' Flavor', '')}`,
    form: 'powder',
    barcode: '',
    verdict: 'caution',
    panel: `Cymbiotika Pure Hydration, ${flavor}. NIH DSLD label ${dsld}.`,
    names: hydrationNames(flavor),
    source: `t400u. NIH DSLD label ${dsld} is the panel. Cymbiotika Pure Hydration, ${flavor}. No brand-site panel. The printed barcode 850033146271 is also printed on the other Pure Hydration flavors, so it is not attached. Graded ingredients include ${flavor}, Cane Sugar, Malic Acid, Stevia Leaf Extract, the labeled vitamin and mineral forms, and Silica. Sodium, Calories, and the sugar lines are nutrition-facts lines and are not graded. Counted Limited tokens: Cane Sugar; Stevia Leaf Extract. That is two, so no 3+ note is stored. Silica is Caution and does not stack.`,
  });
}

export const BATCH500_KYR6E_T400U: RatingRecord[] = [
  colostrum('26 Count', '850033146950'),
  colostrum('12 Count', '850025187428'),
  row({
    id: 'cymbiotika-b500-shilajit-liquid-26',
    productName: 'Shilajit Liquid Complex, 26 Count',
    form: 'liquid',
    barcode: '850025187398',
    verdict: 'caution',
    panel: 'Cymbiotika Shilajit Liquid Complex, 26 Count. Brand site https://cymbiotika.com/en-us.',
    names: [
      ['Shilajit Extract'],
      ['Glycerin', GLYCERIN],
      ['Organic Hazelnut Butter'],
      ['Organic Honey', HONEY],
      ['Water', WATER],
      ['Organic Cacao Powder'],
      ['Organic Cocoa Extract'],
      ['Sea Salt'],
      ['Organic Vanilla Extract'],
      ['Organic Vanilla Powder'],
    ],
    source: 't400u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Shilajit Liquid Complex. Serving size 10 mL. 26 Count. iHerb barcode 850025187398. The check digit passes. Graded ingredients: Shilajit Extract, Glycerin, Organic Hazelnut Butter, Organic Honey, Water, Organic Cacao Powder, Organic Cocoa Extract, Sea Salt, Organic Vanilla Extract, Organic Vanilla Powder. Sodium is a nutrition-facts line and is not graded. Organic Cacao Powder takes Cacao Powder. Organic Cocoa Extract is Caution and does not stack. Counted Limited tokens: none. No 3+ note is stored.',
  }),
  row({
    id: 'cymbiotika-b500-mineral-shilajit',
    productName: 'Mineral Shilajit',
    form: 'powder',
    barcode: '',
    verdict: 'clean',
    panel: 'Cymbiotika Mineral Shilajit. Brand site https://cymbiotika.com/en-us.',
    names: [['Purified mineral pitch resin']],
    source: 't400u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Mineral Shilajit. Serving size 0.5 g. No verified UPC. The iHerb 15 g code was not confirmed as this jar and is not attached. Graded ingredient: Purified mineral pitch resin. The parenthetical 333 ppm Elemental Gold and 100 ppm Elemental Silver is the resin content, not a separate ingredient. Counted Limited tokens: none. No 3+ note is stored.',
  }),
  row({
    id: 'cymbiotika-b500-elderberry-26',
    productName: 'Liposomal Elderberry, 26 Count',
    form: 'liquid',
    barcode: '850033146257',
    verdict: 'clean',
    panel: 'Cymbiotika Liposomal Elderberry, 26 Count, REV0. Brand site https://cymbiotika.com/en-us.',
    names: [
      ['Vitamin E (as D-Alpha Tocopherol)'],
      ['Organic Blueberry Juice Concentrate'],
      ['Organic Elderberry Extract 16:1 (Sambucus nigra (Fruit))'],
      ['Ascorbic Acid'],
      ['Phosphatidylcholine'],
      ['Echinacea Extract (Echinacea purpurea L. (Root))'],
      ['Organic Citrus Extract'],
      ['Citrus Pectin'],
      ['Purified Water', WATER],
      ['Glycerin', GLYCERIN],
      ['Malic Acid', MALIC],
    ],
    source: 't400u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Liposomal Elderberry, REV0. Serving size 10 mL. 26 servings. iHerb barcode 850033146257. The check digit passes. DSLD 253116 is a different panel and was not used. Graded ingredients: Vitamin E (as D-Alpha Tocopherol), Organic Blueberry Juice Concentrate, Organic Elderberry Extract 16:1 (Sambucus nigra (Fruit)), Ascorbic Acid, Phosphatidylcholine, Echinacea Extract (Echinacea purpurea L. (Root)), Organic Citrus Extract, Citrus Pectin, Purified Water, Glycerin, Malic Acid. The Sambucus nigra (Fruit) parenthetical takes Organic Elderberry Extract 16:1. Organic Blueberry Juice Concentrate takes Blueberry Juice Concentrate. Organic Citrus Extract takes Citrus Extract. Counted Limited tokens: none. No 3+ note is stored.',
  }),
  hydration('cymbiotika-b500-pure-hydration-lychee', 'Lychee Flavor', '304739'),
  hydration('cymbiotika-b500-pure-hydration-watermelon', 'Watermelon Flavor', '304293'),
  hydration('cymbiotika-b500-pure-hydration-lemon-citrus', 'Lemon Citrus Flavor', '304740'),
];

if (BATCH500_KYR6E_T400U.length !== 8) throw new Error('t400u count');
const expect: Record<string, { verdict: RatingRecord['verdict']; barcode: string; limited: number }> = {
  'cymbiotika-b500-liquid-colostrum-26': { verdict: 'caution', barcode: '850033146950', limited: 1 },
  'cymbiotika-b500-liquid-colostrum-12': { verdict: 'caution', barcode: '850025187428', limited: 1 },
  'cymbiotika-b500-shilajit-liquid-26': { verdict: 'caution', barcode: '850025187398', limited: 0 },
  'cymbiotika-b500-mineral-shilajit': { verdict: 'clean', barcode: '', limited: 0 },
  'cymbiotika-b500-elderberry-26': { verdict: 'clean', barcode: '850033146257', limited: 0 },
  'cymbiotika-b500-pure-hydration-lychee': { verdict: 'caution', barcode: '', limited: 2 },
  'cymbiotika-b500-pure-hydration-watermelon': { verdict: 'caution', barcode: '', limited: 2 },
  'cymbiotika-b500-pure-hydration-lemon-citrus': { verdict: 'caution', barcode: '', limited: 2 },
};
for (const item of BATCH500_KYR6E_T400U) {
  const spec = expect[item.id];
  if (!spec) throw new Error(`t400u id ${item.id}`);
  if (item.verdict !== spec.verdict || item.honestNote || item.barcode !== spec.barcode) throw new Error(`t400u row ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) throw new Error(`t400u avoid ${item.id}`);
  const limited = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt);
  if (limited.length !== spec.limited) throw new Error(`t400u limited ${item.id}`);
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (rollup.verdict !== spec.verdict) throw new Error(`t400u rollup ${item.id} ${rollup.verdict}`);
}
if (t400uResolve('Lychee Flavor', 'powder')?.lock.why !== FLAVOR) throw new Error('t400u flavor why');
