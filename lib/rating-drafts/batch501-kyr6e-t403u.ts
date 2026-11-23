// DRAFT / not verified / batch 501 KYR6-e (t403u).
// Creatine, Sleep, and Molecular Hydrogen are fully locked.
// Glutathione, The Omega, and Golden Mind stay held.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t403uResolve } from '../scan-preview/t403uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const WATER = 'This is plain water used as the liquid base. Spring or artesian water is groundwater that rises naturally.';
const MALIC = 'Malic acid is a natural acid used to set the acidity of the product.';
const ALGINATE = 'Sodium alginate is a thickener from seaweed. It is Cleared.';
const DEXTROSE = 'Dextrose is a simple sugar used as a sweetener or filler.';
const REB = 'Rebaudioside M is a high-purity stevia sweetener.';
const ADIPIC = 'This is an organic acid, in the same family as citric acid, used to set acidity. That is why it is Cleared.';
const B6 = 'Vitamin B6 as pyridoxal 5-phosphate is a form of vitamin B6. It is included as a source of vitamin B6.';
const PANTO = 'D-calcium pantothenate is a form of pantothenic acid. It is included as a source of vitamin B5.';

const KNOWN: Record<string, { grade: RiskLevel; counts: boolean; why: string }> = {
  'Rebaudioside M': { grade: 'cleared', counts: false, why: REB },
  'Adipic Acid': { grade: 'cleared', counts: false, why: ADIPIC },
  'Vitamin B6 (Pyridoxal 5-Phosphate)': { grade: 'cleared', counts: false, why: B6 },
  'Pantothenic Acid (D-Calcium Pantothenate)': { grade: 'cleared', counts: false, why: PANTO },
};

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
  const known = KNOWN[name];
  if (known) return flag(panel, name, known.grade, known.counts, known.why);
  const hit = t403uResolve(name, form);
  if (!hit) throw new Error(`t403u unlocked ${name}`);
  return flag(panel, name, hit.lock.grade, hit.lock.counts, hit.lock.why || fallback);
}

function row(args: {
  id: string;
  productName: string;
  form: 'liquid' | 'tablet';
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

const creatineNames: Array<[string, string?]> = [
  ['Creatine Monohydrate'],
  ['Phosphatidylcholine (from Sunflower Lecithin)'],
  ['Water', WATER],
  ['Glycerin', GLYCERIN],
  ['Organic Cassava Syrup'],
  ['Pectin'],
  ['Organic Vanilla Powder'],
  ['Organic Vanilla Extract'],
  ['Malic Acid', MALIC],
  ['Tangerine Oil'],
  ['Sodium Alginate', ALGINATE],
  ['Rowanberry Extract'],
  ['Rebaudioside M'],
  ['D-Alpha-Tocopherol'],
  ['Beta Carotene (color)'],
  ['Calcium Lactate'],
];

function creatine(count: string, barcode: string): RatingRecord {
  return row({
    id: `cymbiotika-b501-creatine-${count.split(' ')[0]}`,
    productName: `Liposomal Advanced Creatine, ${count}`,
    form: 'liquid',
    barcode,
    verdict: 'caution',
    panel: `Cymbiotika Liposomal Advanced Creatine, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: creatineNames,
    source: `t403u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Liposomal Advanced Creatine. Serving size 30 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Graded ingredients: Creatine Monohydrate, Phosphatidylcholine (from Sunflower Lecithin), Water, Glycerin, Organic Cassava Syrup, Pectin, Organic Vanilla Powder, Organic Vanilla Extract, Malic Acid, Tangerine Oil, Sodium Alginate, Rowanberry Extract, Rebaudioside M, D-Alpha-Tocopherol, Beta Carotene (color), Calcium Lactate. Rebaudioside M stays the existing Cleared lock. Counted Limited tokens: Organic Cassava Syrup; Beta Carotene (color). That is two, so no 3+ note is stored.`,
  });
}

export const BATCH501_KYR6E_T403U: RatingRecord[] = [
  creatine('24 Count', '850025187848'),
  creatine('12 Count', '850025187374'),
  row({
    id: 'cymbiotika-b501-sleep-52',
    productName: 'Sleep, 52 mL',
    form: 'liquid',
    barcode: '850033146387',
    verdict: 'clean',
    panel: 'Cymbiotika Sleep, 52 mL, REV1. Brand site https://cymbiotika.com/en-us.',
    names: [
      ['Vitamin D3 (from Lichen)'],
      ['Vitamin B6 (Pyridoxal 5-Phosphate)'],
      ['Pantothenic Acid (D-Calcium Pantothenate)'],
      ['L-Theanine'],
      ['GABA'],
      ['Melatonin'],
      ['Magnesium Bisglycinate'],
      ['Chamomile Extract (Matricaria chamomilla) (flower)'],
      ['L-Tryptophan'],
      ['L-Alpha Glycerylphosphorylcholine'],
      ['L-Glycine'],
      ['Passionflower Extract (Passiflora incarnata) (Flower)'],
      ['Organic Glycerin', GLYCERIN],
      ['Purified Water', WATER],
      ['Organic Cacao Powder'],
      ['Organic Vanilla Extract'],
      ['Phosphatidylcholine'],
      ['Organic Citrus Extract'],
    ],
    source: 't403u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Sleep, REV1. 26 servings of 2 mL, 52 mL. iHerb barcode 850033146387. The check digit passes. Graded ingredients: Vitamin D3 (from Lichen), Vitamin B6 (Pyridoxal 5-Phosphate), Pantothenic Acid (D-Calcium Pantothenate), L-Theanine, GABA, Melatonin, Magnesium Bisglycinate, Chamomile Extract (Matricaria chamomilla) (flower), L-Tryptophan, L-Alpha Glycerylphosphorylcholine, L-Glycine, Passionflower Extract (Passiflora incarnata) (Flower), Organic Glycerin, Purified Water, Organic Cacao Powder, Organic Vanilla Extract, Phosphatidylcholine, Organic Citrus Extract. Vitamin B6 (Pyridoxal 5-Phosphate) takes Vitamin B6 (as Pyridoxal 5\'-Phosphate). Pantothenic Acid (D-Calcium Pantothenate) takes Pantothenic Acid (as D-Calcium Pantothenate). The word as is not an ingredient word. Organic Cacao Powder takes Cacao Powder. Counted Limited tokens: none. No 3+ note is stored.',
  }),
  row({
    id: 'cymbiotika-b501-hydrogen-30',
    productName: 'Molecular Hydrogen, 30 Tablets',
    form: 'tablet',
    barcode: '850033146318',
    verdict: 'clean',
    panel: 'Cymbiotika Molecular Hydrogen, 30 Tablets. Brand site https://cymbiotika.com/en-us.',
    names: [
      ['Elemental Magnesium'],
      ['Malic Acid', MALIC],
      ['Dextrose', DEXTROSE],
      ['Tartaric Acid'],
      ['Adipic Acid'],
    ],
    source: 't403u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Molecular Hydrogen. 1 tablet, 30 tablets. iHerb barcode 850033146318. The check digit passes. Graded ingredients: Elemental Magnesium, Malic Acid, Dextrose, Tartaric Acid, Adipic Acid. Adipic Acid stays the Sept 16, 2026 Cleared lock. Counted Limited tokens: none. No 3+ note is stored.',
  }),
];

if (BATCH501_KYR6E_T403U.length !== 4) throw new Error('t403u count');
const expect: Record<string, { verdict: RatingRecord['verdict']; barcode: string; limited: number }> = {
  'cymbiotika-b501-creatine-24': { verdict: 'caution', barcode: '850025187848', limited: 2 },
  'cymbiotika-b501-creatine-12': { verdict: 'caution', barcode: '850025187374', limited: 2 },
  'cymbiotika-b501-sleep-52': { verdict: 'clean', barcode: '850033146387', limited: 0 },
  'cymbiotika-b501-hydrogen-30': { verdict: 'clean', barcode: '850033146318', limited: 0 },
};
for (const item of BATCH501_KYR6E_T403U) {
  const spec = expect[item.id];
  if (!spec || item.verdict !== spec.verdict || item.honestNote || item.barcode !== spec.barcode) {
    throw new Error(`t403u row ${item.id}`);
  }
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high' || ingredient.riskLevel === 'moderate')) {
    throw new Error(`t403u caution ingredient ${item.id}`);
  }
  const limited = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt);
  if (limited.length !== spec.limited) throw new Error(`t403u limited ${item.id}`);
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (rollup.verdict !== spec.verdict) throw new Error(`t403u rollup ${item.id} ${rollup.verdict}`);
}
