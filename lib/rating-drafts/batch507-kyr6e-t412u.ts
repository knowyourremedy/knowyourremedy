// DRAFT / not verified / batch 507 KYR6-e (t412u).
// The four Fungies products that were held on unlocked tokens.
// Vegetable Oil on a gummy is the stored Avoid lock.
// Fruits & Veggies is Avoid from three counting Limited ingredients.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t412uResolve } from '../scan-preview/t412uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const STACK_NOTE = 'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

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

function makeRow(args: {
  id: string;
  productName: string;
  barcode: string;
  panel: string;
  names: string[];
  source: string;
  stack: boolean;
}): RatingRecord {
  const inactiveIngredients = args.names.map((name) => {
    const hit = t412uResolve(name, 'gummy');
    if (!hit) throw new Error(`t412u unlocked ${name}`);
    return flag(args.panel, name, hit.lock.grade, hit.lock.counts, hit.lock.why || undefined);
  });
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const honestNote = args.stack && rollup.cause === 'limited_stack' && !high ? STACK_NOTE : undefined;
  return {
    id: args.id,
    productName: args.productName,
    brand: 'Fungies',
    category: 'Vitamins',
    formulaId: args.id,
    form: 'gummy',
    audience: 'adult',
    minAge: 4,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Fungies'],
    barcode: args.barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    ...(honestNote ? { honestNote } : {}),
    sourcesGeneral: [args.source],
  };
}

export const BATCH507_KYR6E_T412U: RatingRecord[] = [
  makeRow({
    id: 'fungies-b507-tremella-60',
    productName: 'Tremella Mushroom Gummies, 60 Pectin Gummies',
    barcode: '',
    panel: 'Fungies Tremella Mushroom Gummies, 60. Brand site https://eatfungies.com/products/tremella-mushroom-gummies-60-pectin-gummies-fn104.',
    names: [
      'Tremella Mushroom Extract (Tremella fuciformis) (Fruiting Body) (200:1)',
      'Tapioca Syrup',
      'Cane Sugar',
      'Water',
      'Pectin',
      'Citric Acid',
      'Sodium Citrate',
      'Vitamin E Acetate',
      'Natural Flavors',
      'Carnauba Wax',
      'Vegetable Oil',
      'Black Carrot Juice (for color)',
      'Turmeric (for color)',
    ],
    stack: false,
    source: 't412u. Brand site https://eatfungies.com/products/tremella-mushroom-gummies-60-pectin-gummies-fn104 is the panel. SKU FN104. Serving size 1 gummy (4 g). 60 servings. No barcode was in products.json, so none is attached. Vegetable Oil is Avoid on this gummy. No 3+ note is stored.',
  }),
  makeRow({
    id: 'fungies-b507-reishi-60',
    productName: 'Reishi Mushroom Gummies, 60 Pectin Gummies',
    barcode: '860006794545',
    panel: 'Fungies Reishi Mushroom Gummies, 60. iHerb panel and brand site https://eatfungies.com/products/reishi-mushroom-gummies-60-pectin-gummies-fn102.',
    names: [
      'Reishi Mushroom Extract (Ganoderma lucidum) (Fruiting Body) (20:1)',
      'Glucose Syrup',
      'Cane Sugar',
      'Water',
      'Pectin',
      'Citric Acid',
      'Sodium Citrate',
      'Natural Apple Flavor',
      'Vitamin E Acetate',
      'Carnauba Wax',
      'Vegetable Oil',
      'Red Radish (for color)',
    ],
    stack: false,
    source: 't412u. iHerb panel matches the brand-site other ingredients. Serving size 1 gummy (4 g). 60 servings. UPC 860006794545. The check digit passes. The brand-site active line spells Ganoderma lucidium. iHerb spells Ganoderma lucidum. Vegetable Oil is Avoid on this gummy. No 3+ note is stored.',
  }),
  makeRow({
    id: 'fungies-b507-lions-mane-30',
    productName: 'Lion\'s Mane Mushroom Gummies, 30 Pectin Gummies',
    barcode: '',
    panel: 'Fungies Lion\'s Mane Mushroom Gummies, 30. Walmart https://www.walmart.com/ip/5410505654.',
    names: [
      'Lion\'s Mane Mushroom Extract (Hericium erinaceus) (Fruiting Body) (2:1)',
      'Glucose Syrup',
      'Cane Sugar',
      'Water',
      'Pectin',
      'Citric Acid',
      'Fruit and Vegetable Juice (for color)',
      'Sodium Citrate',
      'Natural Flavors',
      'Red Radish (for color)',
      'Vitamin E Acetate',
      'Carnauba Wax',
      'Vegetable Oil',
    ],
    stack: false,
    source: 't412u. Walmart https://www.walmart.com/ip/5410505654 is the panel. Serving size 1 gummy (4 g). 30 servings. No barcode was on the label image, so none is attached. 850051627004 is not on that label. Vegetable Oil is Avoid on this gummy. No 3+ note is stored.',
  }),
  makeRow({
    id: 'fungies-b507-fruits-veggies-45',
    productName: 'Lion\'s Mane, Fruits & Veggies Gummies, 45 Pectin Gummies',
    barcode: '850051627431',
    panel: 'Fungies Lion\'s Mane, Fruits & Veggies Gummies, 45. Brand site https://eatfungies.com/products/lions-mane-fruits-veggies-gummies-45-pectin-gummies-fn109.',
    names: [
      'Grape Seed Extract',
      'Wild Blueberry Extract',
      'Raspberry',
      'Cranberry',
      'Prune',
      'Tart Cherry',
      'Wild Bilberry Extract',
      'Strawberry',
      'Broccoli Sprout',
      'Onion Extract',
      'Tomato',
      'Broccoli',
      'Carrot',
      'Spinach',
      'Kale',
      'Brussels Sprout',
      'Lion\'s Mane Mushroom Extract (Hericium erinaceus) (Fruiting Body) (10:1)',
      'Reishi Mushroom Extract (Ganoderma lucidum) (Fruiting Body) (10:1)',
      'Chaga Mushroom Extract (Inonotus obliquus) (Fruiting Body) (10:1)',
      'Turkey Tail Mushroom Extract (Trametes versicolor) (Fruiting Body) (10:1)',
      'Tapioca Syrup',
      'Cane Sugar',
      'Water',
      'Pectin',
      'Natural Flavors',
      'Citric Acid',
      'Sodium Citrate',
      'Fruit and Vegetable Juice (for color)',
      'Sunflower Oil',
      'Carnauba Wax',
    ],
    stack: true,
    source: 't412u. Brand site https://eatfungies.com/products/lions-mane-fruits-veggies-gummies-45-pectin-gummies-fn109 is the panel. SKU FN109. Walmart https://www.walmart.com/ip/20616005085 prints the same blends and other ingredients. Bottle barcode 850051627431. The check digit passes. Serving size 1 gummy (4 g). 45 servings. Counted Limited tokens: Tapioca Syrup, Cane Sugar, and Natural Flavors. That is three, and there is no Avoid ingredient, so the 3+ note is stored.',
  }),
];

if (BATCH507_KYR6E_T412U.length !== 4) throw new Error('t412u count');
const expect: Record<string, { verdict: RatingRecord['verdict']; note: boolean; high: boolean; barcode: string }> = {
  'fungies-b507-tremella-60': { verdict: 'avoid', note: false, high: true, barcode: '' },
  'fungies-b507-reishi-60': { verdict: 'avoid', note: false, high: true, barcode: '860006794545' },
  'fungies-b507-lions-mane-30': { verdict: 'avoid', note: false, high: true, barcode: '' },
  'fungies-b507-fruits-veggies-45': { verdict: 'avoid', note: true, high: false, barcode: '850051627431' },
};
for (const item of BATCH507_KYR6E_T412U) {
  const spec = expect[item.id];
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (!spec || item.verdict !== spec.verdict || rollup.verdict !== spec.verdict) throw new Error(`t412u verdict ${item.id} ${item.verdict} ${rollup.verdict}`);
  if (Boolean(item.honestNote) !== spec.note) throw new Error(`t412u note ${item.id}`);
  if (spec.note && item.honestNote !== STACK_NOTE) throw new Error(`t412u note text ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high') !== spec.high) throw new Error(`t412u high ${item.id}`);
  if (item.barcode !== spec.barcode) throw new Error(`t412u upc ${item.id}`);
  if (item.barcode && !gtin12(item.barcode)) throw new Error(`t412u gtin ${item.id}`);
}
