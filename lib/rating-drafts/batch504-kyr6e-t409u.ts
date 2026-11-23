// DRAFT / not verified / batch 504 KYR6-e (t409u).
// B12 + B6, Irish Sea Moss, and Red Yeast Rice.
// The blanket why keeps its brackets. Black Seed Oil stays the stored Cleared lock.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t409uResolve } from '../scan-preview/t409uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const REB = 'Rebaudioside M is a high-purity stevia sweetener.';

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

function gtin12(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i += 1) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function resolveName(name: string) {
  if (name === 'Rebaudioside M') return { lock: { grade: 'cleared' as const, counts: false, why: REB }, mark: 't146' };
  if (name === 'Vitamin B12 (as Methylcobalamin and Adenosylcobalamin)') {
    const methyl = t409uResolve('Vitamin B12 (as Methylcobalamin)', 'liquid');
    const adenosyl = t409uResolve('Adenosylcobalamin', 'liquid');
    if (!methyl || !adenosyl || methyl.lock.grade !== 'cleared' || adenosyl.lock.grade !== 'cleared') {
      throw new Error('t409u b12 forms');
    }
    return methyl;
  }
  const direct = t409uResolve(name, 'liquid');
  if (direct) return direct;
  const stripped = name.replace(/\b(?:certified\s+)?organic\b/ig, ' ').replace(/\s+/g, ' ').trim();
  if (stripped && stripped.toLowerCase() !== name.trim().toLowerCase()) {
    const hit = t409uResolve(stripped, 'liquid');
    if (hit) return hit;
  }
  throw new Error(`t409u unlocked ${name}`);
}

function stored(panel: string, name: string): IngredientFlag {
  const hit = resolveName(name);
  return flag(panel, name, hit.lock.grade, hit.lock.counts, hit.lock.why || undefined);
}

function row(args: {
  id: string;
  productName: string;
  barcode: string;
  panel: string;
  names: string[];
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
    inactiveIngredients: args.names.map((name) => stored(args.panel, name)),
    verdict: 'caution',
    sourcesGeneral: [args.source],
  };
}

const b12Names = [
  'Vitamin B6 (as Pyridoxal 5\'-Phosphate)',
  'Folate (as Calcium L-5-Methyltetrahydrofolate)',
  'Vitamin B12 (as Methylcobalamin and Adenosylcobalamin)',
  'Phosphatidylcholine (from Sunflower Lecithin)',
  'Fulvic Acid',
  'Glycerin',
  'Water',
  'Organic Cassava Syrup',
  'Pectin',
  'Organic Blackberry Extract',
  'Organic Raspberry Extract',
  'Malic Acid',
  'Rowanberry Fruit Extract',
  'Organic Vanilla Extract',
  'Organic Vanilla Powder',
  'Sodium Alginate',
  'Calcium Lactate',
];

function b12(count: string, barcode: string): RatingRecord {
  return row({
    id: `cymbiotika-b504-b12-${count.split(' ')[0]}`,
    productName: `B12 + B6, ${count}`,
    barcode,
    panel: `Cymbiotika B12 + B6, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: b12Names,
    source: `t409u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. B12 + B6. Serving size 5 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Vitamin B12 (as Methylcobalamin and Adenosylcobalamin) takes the two existing Cleared form locks. Fulvic Acid, Organic Blackberry Extract, and Organic Raspberry Extract use the bracketed Cleared why. Counted Limited tokens: Organic Cassava Syrup. That is one, so no 3+ note is stored.`,
  });
}

const irishNames = [
  'Organic Irish Sea Moss Powder',
  'Organic Inner Leaf Aloe Vera Gel Powder',
  'Triacetin (as TriBiome)',
  'Fulvic trace mineral complex (as Rejen)',
  'Water',
  'Glycerin',
  'Organic Cassava Syrup',
  'Pectin',
  'Organic Vanilla Powder',
  'Organic Vanilla Extract',
  'Organic Lemon Extract',
  'Rowanberry Extract',
  'Malic Acid',
  'Organic Tangerine Oil',
  'Rebaudioside M',
];

function irish(count: string, barcode: string): RatingRecord {
  return row({
    id: `cymbiotika-b504-irish-sea-moss-${count.split(' ')[0]}`,
    productName: `Irish Sea Moss, ${count}`,
    barcode,
    panel: `Cymbiotika Irish Sea Moss, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: irishNames,
    source: `t409u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Irish Sea Moss. Serving size 15 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. The four remaining strings use the bracketed Cleared why. Counted Limited tokens: Organic Cassava Syrup. That is one, so no 3+ note is stored.`,
  });
}

export const BATCH504_KYR6E_T409U: RatingRecord[] = [
  b12('28 Count', '850025187541'),
  b12('12 Count', '850025187558'),
  irish('26 Count', '850025187244'),
  irish('12 Count', '850025187404'),
  row({
    id: 'cymbiotika-b504-red-yeast-rice',
    productName: 'Red Yeast Rice Plus CLA Plus Black Seed Oil Organic Caramel',
    barcode: '',
    panel: 'Cymbiotika Red Yeast Rice Plus CLA Plus Black Seed Oil Organic Caramel. NIH DSLD label 253136.',
    names: [
      'Conjugated Linoleic Acid',
      'Red Yeast Rice',
      'Black Seed Oil',
      'Asteraceae Thistle extracts',
      'organic Sunflower Lecithin',
      'organic Sunflower Oil',
      'organic cold pressed Black Seed Oil',
      'organic Coconut Glycerin',
      'organic sprouted Almond Butter',
      'purified Water',
      'organic Red Yeast Rice extract',
      'D-Alpha-Tocopherol',
      'organic Vanilla extract',
      'organic Maple extract',
      'Sea Salt',
    ],
    source: 't409u. NIH DSLD label 253136 is the on-market panel. Red Yeast Rice Plus CLA Plus Black Seed Oil Organic Caramel. No verified UPC is on record, so none is attached. Black Seed Oil stays the stored Cleared lock. Its why describes Caution as a fill and Limited as a base. The grade was not changed. organic cold pressed Black Seed Oil does not take that lock. It uses the bracketed Cleared why. Counted Limited tokens: Red Yeast Rice and organic Coconut Glycerin. That is two, so no 3+ note is stored.',
  }),
];

if (BATCH504_KYR6E_T409U.length !== 5) throw new Error('t409u count');
const expect: Record<string, { barcode: string; limited: number; moderate: number }> = {
  'cymbiotika-b504-b12-28': { barcode: '850025187541', limited: 1, moderate: 0 },
  'cymbiotika-b504-b12-12': { barcode: '850025187558', limited: 1, moderate: 0 },
  'cymbiotika-b504-irish-sea-moss-26': { barcode: '850025187244', limited: 1, moderate: 0 },
  'cymbiotika-b504-irish-sea-moss-12': { barcode: '850025187404', limited: 1, moderate: 0 },
  'cymbiotika-b504-red-yeast-rice': { barcode: '', limited: 2, moderate: 0 },
};
for (const item of BATCH504_KYR6E_T409U) {
  const spec = expect[item.id];
  if (!spec || item.verdict !== 'caution' || item.honestNote || item.barcode !== spec.barcode) throw new Error(`t409u row ${item.id}`);
  if (item.barcode && !gtin12(item.barcode)) throw new Error(`t409u gtin ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) throw new Error(`t409u avoid ${item.id}`);
  const limited = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt);
  const moderate = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'moderate');
  if (limited.length !== spec.limited || moderate.length !== spec.moderate) {
    throw new Error(`t409u counts ${item.id} L${limited.length} M${moderate.length} ${limited.map((ingredient) => ingredient.name).join(',')}`);
  }
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (rollup.verdict !== 'caution') throw new Error(`t409u rollup ${item.id} ${rollup.verdict}`);
}
const rice = BATCH504_KYR6E_T409U.find((item) => item.id === 'cymbiotika-b504-red-yeast-rice');
const blackSeed = rice?.inactiveIngredients.find((ingredient) => ingredient.name === 'Black Seed Oil');
if (blackSeed?.riskLevel !== 'cleared' || !blackSeed.why?.includes('Caution as a fill')) throw new Error('t409u black seed flag');
const pressed = rice?.inactiveIngredients.find((ingredient) => ingredient.name === 'organic cold pressed Black Seed Oil');
if (pressed?.riskLevel !== 'cleared' || !pressed.why?.startsWith('[Named')) throw new Error('t409u pressed');
