// DRAFT / not verified / batch 506 KYR6-e (t411u).
// Fungies gummies whose brand-site tokens are already locked.
// Vegetable Oil on a gummy is the stored Avoid lock.
// Lion's Mane and Lion's Mane + Ashwagandha are Avoid from 3 counting Limiteds.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t410uResolve } from '../scan-preview/t410uLocks';
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

function resolveName(name: string) {
  const hit = t410uResolve(name, 'gummy');
  if (!hit) throw new Error(`t411u unlocked ${name}`);
  return hit;
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
    const hit = resolveName(name);
    if (!hit) throw new Error(`t411u unlocked ${name}`);
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

const lionsNames = [
  'Lion\'s Mane Mushroom Extract (Hericium erinaceus) (Fruiting Body) (2:1)',
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
];

const ashwNames = [
  'Ashwagandha (Withania somnifera) Root Extract (KMS-66®)',
  'Lion\'s Mane Mushroom Extract (Hericium erinaceus) (Fruiting Body) (10:1)',
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
];

const multiNames = [
  'Lion\'s Mane Mushroom Extract (Hericium erinaceus) (Fruiting Body) (5:1)',
  'Cordyceps Mushroom Extract (Cordyceps militaris) (Fruiting Body) (10:1)',
  'Chaga Mushroom Extract (Inonotus obliquus) (Fruiting Body) (10:1)',
  'Turkey Tail Mushroom Extract (Trametes versicolor) (Fruiting Body) (10:1)',
  'Maitake Mushroom Extract (Grifola frondosa) (Fruiting Body) (10:1)',
  'Shiitake Mushroom Extract (Lentinula edodes) (Fruiting Body) (10:1)',
  'Reishi Mushroom Extract (Ganoderma lucidum) (Fruiting Body) (20:1)',
  'Tapioca Syrup',
  'Cane Sugar',
  'Water',
  'Pectin',
  'Citric Acid',
  'Sodium Citrate',
  'Natural Flavors',
  'Fruit and Vegetable Juice (for color)',
  'Vitamin E Acetate',
  'Carnauba Wax',
  'Vegetable Oil',
];

const cordNames = [
  'Cordyceps Mushroom Extract (Cordyceps militaris) (Whole Plant) (10:1)',
  'Glucose Syrup',
  'Cane Sugar',
  'Water',
  'Pectin',
  'Citric Acid',
  'Natural Flavors',
  'Sodium Citrate',
  'Annatto Extract (for color)',
  'Vitamin E Acetate',
  'Carnauba Wax',
  'Vegetable Oil',
  'Turmeric (for color)',
];

export const BATCH506_KYR6E_T411U: RatingRecord[] = [
  makeRow({
    id: 'fungies-b506-lions-mane-60',
    productName: 'Lion\'s Mane Mushroom Gummies, 60 Pectin Gummies',
    barcode: '',
    panel: 'Fungies Lion\'s Mane Mushroom Gummies, 60. Brand site https://eatfungies.com/products/lions-mane-mushroom-gummies-60-pectin-gummies-fn100.',
    names: lionsNames,
    stack: true,
    source: 't411u. Brand site https://eatfungies.com/products/lions-mane-mushroom-gummies-60-pectin-gummies-fn100 is the panel. SKU FN100. Serving size 1 gummy (4 g). 60 servings. No barcode was in products.json. DSLD 270221 and DSLD 313329 share UPC 860006794507 and their other-ingredient lines differ from this panel and from each other, so that UPC is not attached. Counted Limited tokens: Tapioca Syrup, Cane Sugar, and Natural Flavors. That is three, and there is no Avoid ingredient, so the 3+ note is stored.',
  }),
  makeRow({
    id: 'fungies-b506-lions-mane-ashwagandha-45',
    productName: 'Lion\'s Mane + Ashwaghanda Gummies, 45 Pectin Gummies',
    barcode: '',
    panel: 'Fungies Lion\'s Mane + Ashwaghanda Gummies, 45. Brand site https://eatfungies.com/products/lions-mane-ashwaghanda-gummies-45-pectin-gummies-fn1010.',
    names: ashwNames,
    stack: true,
    source: 't411u. Brand site https://eatfungies.com/products/lions-mane-ashwaghanda-gummies-45-pectin-gummies-fn1010 is the panel. SKU FN1010. The shop title spells Ashwaghanda. The facts line spells Ashwagandha (Withania somnifera) Root Extract (KMS-66®). Serving size 1 gummy (4.5 g). 45 servings. No barcode was in products.json. No verified UPC is on record, so none is attached. The shop tag future_delete is set and the variant is still available. Counted Limited tokens: Tapioca Syrup, Cane Sugar, and Natural Flavors. That is three, and there is no Avoid ingredient, so the 3+ note is stored.',
  }),
  makeRow({
    id: 'fungies-b506-multi-60',
    productName: 'Best Multi Mushroom Gummies, 60 Pectin Gummies',
    barcode: '',
    panel: 'Fungies Best Multi Mushroom Gummies, 60. Brand site https://eatfungies.com/products/best-multi-mushroom-gummies-60-pectin-gummies-fn108.',
    names: multiNames,
    stack: false,
    source: 't411u. Brand site https://eatfungies.com/products/best-multi-mushroom-gummies-60-pectin-gummies-fn108 is the panel. SKU FN108. Serving size 1 gummy (4 g). 60 servings. The footnote also says per 2 gummies. No barcode was in products.json. Kroger lists barcode 850051627196. That page\'s ingredient panel did not load, so the UPC is not attached. Vegetable Oil is Avoid on this gummy. No 3+ note is stored.',
  }),
  makeRow({
    id: 'fungies-b506-cordyceps-60',
    productName: 'Cordyceps Mushroom Gummies, 60 Pectin Gummies',
    barcode: '',
    panel: 'Fungies Cordyceps Mushroom Gummies, 60. Brand site https://eatfungies.com/products/cordyceps-mushroom-gummies-60-pectin-gummies-fn103.',
    names: cordNames,
    stack: false,
    source: 't411u. Brand site https://eatfungies.com/products/cordyceps-mushroom-gummies-60-pectin-gummies-fn103 is the panel. SKU FN103. Serving size 1 gummy (4 g). 60 servings. No barcode was in products.json. Amazon and Pillser list UPC 860006794538. The other-ingredient line for that code was not loaded, so it is not attached. The shop tag future_delete is set and the variant is still available. Vegetable Oil is Avoid on this gummy. No 3+ note is stored.',
  }),
  makeRow({
    id: 'fungies-b506-cordyceps-30',
    productName: 'Cordyceps Mushroom Gummies, 30 Pectin Gummies',
    barcode: '850051627028',
    panel: 'Fungies Cordyceps Mushroom Daily Gummies, 30. Vitacost https://www.vitacost.com/products/fungies-cordyceps-mushroom-daily-gummies-mango-and-pineapple-30-pectin-gummies-50-mg-per-gummy-153463.',
    names: cordNames,
    stack: false,
    source: 't411u. Vitacost panel matches the brand-site 60-count other ingredients and the Cordyceps 10:1 whole-plant active. 30 pectin gummies. UPC 850051627028. The check digit passes. The brand shop does not list a 30-count. Vegetable Oil is Avoid on this gummy. No 3+ note is stored.',
  }),
];

function gtin12(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i += 1) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (BATCH506_KYR6E_T411U.length !== 5) throw new Error('t411u count');
const expect: Record<string, { verdict: RatingRecord['verdict']; note: boolean; high: boolean; barcode: string }> = {
  'fungies-b506-lions-mane-60': { verdict: 'avoid', note: true, high: false, barcode: '' },
  'fungies-b506-lions-mane-ashwagandha-45': { verdict: 'avoid', note: true, high: false, barcode: '' },
  'fungies-b506-multi-60': { verdict: 'avoid', note: false, high: true, barcode: '' },
  'fungies-b506-cordyceps-60': { verdict: 'avoid', note: false, high: true, barcode: '' },
  'fungies-b506-cordyceps-30': { verdict: 'avoid', note: false, high: true, barcode: '850051627028' },
};
for (const item of BATCH506_KYR6E_T411U) {
  const spec = expect[item.id];
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (!spec || item.verdict !== spec.verdict || rollup.verdict !== spec.verdict) throw new Error(`t411u verdict ${item.id} ${item.verdict}`);
  if (Boolean(item.honestNote) !== spec.note) throw new Error(`t411u note ${item.id}`);
  if (spec.note && item.honestNote !== STACK_NOTE) throw new Error(`t411u note text ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high') !== spec.high) throw new Error(`t411u high ${item.id}`);
  if (item.barcode !== spec.barcode) throw new Error(`t411u upc ${item.id}`);
  if (item.barcode && !gtin12(item.barcode)) throw new Error(`t411u gtin ${item.id}`);
}
