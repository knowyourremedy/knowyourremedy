// DRAFT / not verified / batch 392 KYR6-e (t206u).
// Touchstone Essentials singles whose other ingredients are already locked.
// Brand site https://thegoodinside.com is the panel. No UPC was printed.
// Packs, protein powders, and rows with an unlocked token are not in this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const BRAND = 'Touchstone Essentials';
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, source: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: `${panel}; ${source}`,
  };
}

const HPMC =
  'Methodology §5 Cleared (Vegetable capsule (hypromellose)). Does not count toward the t137u stack.';
const RICE =
  'Methodology §5 Cleared (Organic Rice Concentrate — founder lock t106u). Does not count toward the t137u stack.';
const VANILLA =
  'Methodology §5 Cleared (organic vanilla flavor — founder lock t169u). Does not count toward the t137u stack.';
const WATER =
  'Methodology §5 Cleared (purified water). Does not count toward the t137u stack.';

export const BATCH392_KYR6E_T206U: RatingRecord[] = [
  {
    id: 'touchstone-b392-gluco-control-60',
    productName: 'Gluco-Control (60 capsules)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b392-gluco-control-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [
      { name: 'Proprietary Glucose Control Blend', strength: '450 mg' },
    ],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Gluco-Control brand supplement-facts image. 60 capsules. Serving size 1 capsule, 60 servings.',
        'Vegetable capsule (hypromellose)',
        HPMC,
      ),
      flag(
        'Touchstone Essentials Gluco-Control brand supplement-facts image. 60 capsules. Serving size 1 capsule, 60 servings.',
        'organic rice concentrate',
        RICE,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't206u. https://thegoodinside.com/shop/product/gluco-control/ is for sale. 30-day supply, 60 capsules. SKU GC60. The supplement-facts image prints Other ingredients: Vegetable capsule (hypromellose), organic rice concentrate. The proprietary blend is the active and is not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b392-natto-clear-60',
    productName: 'Natto-Clear (60 capsules)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b392-natto-clear-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Green Tea Extract', strength: '240 mg' },
      { name: 'Bromelain (Ananas comosus)', strength: '2,500,000 PU' },
      { name: 'Nattokinase Blend', strength: '10,000 FU' },
    ],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Natto-Clear brand supplement-facts image. Serving size 2 capsules, 30 servings.',
        'Vegetable Capsule (hypromellose)',
        HPMC,
      ),
      flag(
        'Touchstone Essentials Natto-Clear brand supplement-facts image. Serving size 2 capsules, 30 servings.',
        'organic rice concentrate',
        RICE,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't206u. https://thegoodinside.com/shop/product/natto-clear/ is for sale. SKU GE90. The supplement-facts image prints Other Ingredients: Vegetable Capsule (hypromellose), organic rice concentrate. Serving size 2 capsules, 30 servings, so the bottle is 60 capsules. The ingredients section on the same page also lists organic rice flour. The facts image does not, so rice flour is not graded. The named extracts and enzymes are actives and are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b392-super-fiber-30',
    productName: 'Organic Super Fiber (30 servings)',
    brand: BRAND,
    category: 'Digestive',
    formulaId: 'touchstone-b392-super-fiber-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [
      { name: 'Superfood Fiber-Protein Blend', strength: '13,917 mg' },
    ],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Organic Super Fiber brand supplement-facts image. Serving size 2 scoops (18 g), 30 servings.',
        'Organic Vanilla Flavor',
        VANILLA,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't206u. https://thegoodinside.com/shop/product/organic-super-fiber/ is for sale. 30-day supply, 30 servings. SKU OSF0921. The supplement-facts image prints Other Ingredients: Organic Vanilla Flavor. The blends in the facts table are actives and are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b392-fulvic-minerals-60',
    productName: 'Fulvic Minerals+ (60 mL)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b392-fulvic-minerals-60',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [
      { name: 'Trace Mineral Complex', strength: '100 mg' },
      { name: 'Fulvic Acid', strength: '50 mg' },
      { name: 'Proprietary Processed Clinoptilolite Zeolite', strength: '15 mg' },
    ],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Fulvic Minerals+ brand product page ingredients section. 60 mL. Serving size 2 mL, 30 servings.',
        'Purified Water',
        WATER,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't206u. https://thegoodinside.com/shop/product/fulvic-minerals-plus/ is for sale. 30-day supply, 60 mL. SKU FTMZ60. The supplement-facts image prints the mineral, fulvic acid, and zeolite rows and does not print an other-ingredients line. The ingredients section on the same page prints Other Ingredients: Purified Water. Those facts rows are actives and are not graded. No UPC was printed. Missing UPC.',
    ],
  },
];
