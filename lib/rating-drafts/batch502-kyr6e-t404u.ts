// DRAFT / not verified / batch 502 KYR6-e (t404u).
// Glutathione, The Omega, and Golden Mind.
// Organic Evening Primrose Oil is stored Cleared. Its why describes a form split.
// The Omega is a liquid, so that split is flagged and the grade is not changed.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t404uResolve } from '../scan-preview/t404uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const WATER = 'This is plain water used as the liquid base. Spring or artesian water is groundwater that rises naturally.';
const MONK = 'Monk fruit extract is a high-purity sweetener from the monk fruit.';

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

function stored(panel: string, name: string, fallback?: string): IngredientFlag {
  if (name === 'Organic Monk Fruit Extract') return flag(panel, name, 'cleared', false, MONK);
  const hit = t404uResolve(name, 'liquid');
  if (!hit) throw new Error(`t404u unlocked ${name}`);
  return flag(panel, name, hit.lock.grade, hit.lock.counts, hit.lock.why || fallback);
}

function row(args: {
  id: string;
  productName: string;
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
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Cymbiotika'],
    barcode: args.barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: args.names.map(([name, fallback]) => stored(args.panel, name, fallback)),
    verdict: args.verdict,
    sourcesGeneral: [args.source],
  };
}

const glutathioneNames: Array<[string, string?]> = [
  ['Riboflavin'],
  ['Glutathione'],
  ['Phosphatidylcholine (from Sunflower Lecithin)'],
  ['CoQ10 (Ubiquinol)'],
  ['PQQ (Pyrroloquinoline Quinone)'],
  ['Glycerin', GLYCERIN],
  ['Organic Cassava Syrup'],
  ['Organic MCT Oil'],
  ['Organic Orange Oil'],
  ['Tocopherol Extract'],
  ['Rosemary Extract'],
  ['Organic Tangerine Oil'],
  ['Organic Vanilla Extract'],
];

function glutathione(count: string, barcode: string): RatingRecord {
  return row({
    id: `cymbiotika-b502-glutathione-${count.split(' ')[0]}`,
    productName: `Glutathione, ${count}`,
    barcode,
    verdict: 'caution',
    panel: `Cymbiotika Glutathione, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: glutathioneNames,
    source: `t404u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Glutathione. Serving size 5 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Organic MCT Oil is Caution in this liquid and is not the base. Tocopherol Extract and Glutathione are Cleared. Counted Limited tokens: Organic Cassava Syrup. That is one, so no 3+ note is stored.`,
  });
}

export const BATCH502_KYR6E_T404U: RatingRecord[] = [
  glutathione('26 Count', '850025187466'),
  glutathione('12 Count', '850025187343'),
  row({
    id: 'cymbiotika-b502-omega',
    productName: 'The Omega',
    barcode: '',
    verdict: 'caution',
    panel: 'Cymbiotika The Omega, REV1. Brand site https://cymbiotika.com/en-us.',
    names: [
      ['Omega-3 DHA (Schizochytrium Algae Oil, water extracted)'],
      ['EPA'],
      ['Organic Evening Primrose Oil'],
      ['Organic Seabuckthorn Oil'],
      ['Astaxanthin (Haematococcus pluvialis, CO2 extracted)'],
      ['Phosphatidylcholine (from Non-GMO Sunflower Lecithin)'],
      ['Organic MCT Oil'],
      ['Natural tocopherol'],
      ['Organic Lemon Oil'],
      ['Organic Monk Fruit Extract'],
    ],
    source: 't404u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. The Omega, REV1. Serving size 2 mL. 30 servings. No verified UPC is on record, so none is attached. Organic MCT Oil and Organic Seabuckthorn Oil are Caution in this liquid and are not the base. Organic Evening Primrose Oil is stored Cleared. Its why says Caution as a fill and Limited as a base. This liquid is neither a softgel fill nor shown as the base. The grade was not changed. Organic Monk Fruit Extract takes the Cleared Monk Fruit Extract lock. The Renew Life t299 Limited lock was not applied. Counted Limited tokens: none. No 3+ note is stored.',
  }),
  row({
    id: 'cymbiotika-b502-golden-mind-30',
    productName: 'Golden Mind Vanilla Chai, 30 Pouches',
    barcode: '850033146233',
    verdict: 'caution',
    panel: 'Cymbiotika Golden Mind Vanilla Chai. NIH DSLD label 288084.',
    names: [
      ['Phosphatidylcholine'],
      ['L-Theanine'],
      ['Rhodiola rosea extract'],
      ['Sea Buckthorn Oil'],
      ['Gotu Kola Extract'],
      ['Bacopa monniera extract'],
      ['Green Tea extract'],
      ['Lion\'s Mane Mushroom Fruiting Body Extract'],
      ['Glycerin', GLYCERIN],
      ['Water, Purified', WATER],
      ['Vanilla extract'],
      ['Konjac'],
      ['Citrus Pectin'],
      ['D-Alpha-Tocopherol'],
      ['Citrus extract'],
      ['Citrus Bioflavonoids'],
      ['Cinnamon Oil'],
    ],
    source: 't404u. NIH DSLD label 288084 is the on-market panel. Golden Mind Vanilla Chai, 5 mL. 30 pouches. iHerb barcode 850033146233. The check digit passes. Off-market DSLD 253117 was not used. Sea Buckthorn Oil is Caution in this liquid and is not the base. Cinnamon Oil, Bacopa monniera extract, and Lion\'s Mane Mushroom Fruiting Body Extract are Cleared. Bacopa monnieri Extract (whole plant) stays a separate string. Counted Limited tokens: none. No 3+ note is stored.',
  }),
];

if (BATCH502_KYR6E_T404U.length !== 4) throw new Error('t404u count');
const expect: Record<string, { verdict: RatingRecord['verdict']; barcode: string; limited: number; moderate: number }> = {
  'cymbiotika-b502-glutathione-26': { verdict: 'caution', barcode: '850025187466', limited: 1, moderate: 1 },
  'cymbiotika-b502-glutathione-12': { verdict: 'caution', barcode: '850025187343', limited: 1, moderate: 1 },
  'cymbiotika-b502-omega': { verdict: 'caution', barcode: '', limited: 0, moderate: 2 },
  'cymbiotika-b502-golden-mind-30': { verdict: 'caution', barcode: '850033146233', limited: 0, moderate: 1 },
};
for (const item of BATCH502_KYR6E_T404U) {
  const spec = expect[item.id];
  if (!spec || item.verdict !== spec.verdict || item.honestNote || item.barcode !== spec.barcode) throw new Error(`t404u row ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) throw new Error(`t404u avoid ${item.id}`);
  const limited = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt);
  const moderate = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'moderate');
  if (limited.length !== spec.limited || moderate.length !== spec.moderate) throw new Error(`t404u counts ${item.id}`);
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (rollup.verdict !== spec.verdict) throw new Error(`t404u rollup ${item.id} ${rollup.verdict}`);
}
const omega = BATCH502_KYR6E_T404U.find((item) => item.id === 'cymbiotika-b502-omega');
const epo = omega?.inactiveIngredients.find((ingredient) => ingredient.name === 'Organic Evening Primrose Oil');
if (epo?.riskLevel !== 'cleared' || !epo.why?.includes('Caution as a fill')) throw new Error('t404u epo flag');
