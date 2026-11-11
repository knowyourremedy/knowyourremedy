// DRAFT / not verified / batch 393 KYR6-e (t207u).
// The nine Touchstone Essentials holds. Brand site is the panel.
// No UPC was printed. No honest notes.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const BRAND = 'Touchstone Essentials';
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const LOCK =
  'Methodology §5 Cleared (founder lock t207u). Does not count toward the t137u stack.';
const HPMC =
  'Methodology §5 Cleared (Vegetable capsule (hypromellose)). Does not count toward the t137u stack.';
const HULL =
  'Methodology §5 Cleared (rice hull concentrate — founder lock t119u). Does not count toward the t137u stack.';
const DISTILLED =
  'Methodology §5 Cleared (Distilled Water — founder lock t99u). Does not count toward the t137u stack.';

function flag(panel: string, name: string, source: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: `${panel}; ${source}`,
  };
}

export const BATCH393_KYR6E_T207U: RatingRecord[] = [
  {
    id: 'touchstone-b393-boost-focus-fuel-90',
    productName: 'Boost Focus Fuel (90 capsules)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b393-boost-focus-fuel-90',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Proprietary Boost Focus Fuel Blend', strength: '1,500 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Boost Focus Fuel brand supplement-facts image. 90 capsules. Serving size 3 capsules, 30 servings.',
        'Cellulose Vegetarian Capsule',
        LOCK,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/boost-focus-fuel/ is for sale. 30-day supply, 90 capsules. SKU BFF1014. Other Ingredients: Cellulose Vegetarian Capsule. The blend is the active and is not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-essentials-120',
    productName: 'Essentials (120 capsules)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b393-essentials-120',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Organic Essentials Blend', strength: '2,227 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Essentials brand supplement-facts image. Serving size 4 capsules, 30 servings.',
        'Organic Pullulan Capsule',
        LOCK,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/essentials/ is for sale. SKU TE90. Serving size 4 capsules, 30 servings, so the bottle is 120 capsules. Other Ingredients: Organic Pullulan Capsule. The vitamin rows and the organic blend are actives and are not graded. Zinc in that blend is parked. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-para-shield-21',
    productName: 'Para-Shield (21 mL)',
    brand: BRAND,
    category: 'Digestive',
    formulaId: 'touchstone-b393-para-shield-21',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Proprietary Herbal Cleanse Blend', strength: '110 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Para-Shield brand supplement-facts image. 21 mL. Serving size 10 drops (0.5 mL), 42 servings.',
        'Organic Vegetable Glycerin',
        LOCK,
      ),
      flag(
        'Touchstone Essentials Para-Shield brand supplement-facts image. 21 mL. Serving size 10 drops (0.5 mL), 42 servings.',
        'Distilled Water',
        DISTILLED,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/para-shield/ is for sale. 21-day supply, 21 mL. SKU PS0125. Other Ingredients: Organic Vegetable Glycerin, Distilled Water. Contains: Tree Nuts (walnuts) is a disclosure. The herbal blend is the active and is not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-pure-body-extra-60',
    productName: 'Pure Body Extra (60 mL)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b393-pure-body-extra-60',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [
      { name: 'Proprietary Processed Hydrated Clinoptilolite Zeolite', strength: '0.64 mL' },
    ],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Pure Body Extra brand supplement-facts image. 60 mL. Serving size 4 sprays, 93 servings.',
        'Pure water',
        LOCK,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/pure-body-extra-strength/ is for sale. 30-day supply, 60 mL. SKU EX60. The supplement-facts image prints Other Ingredients: Pure water. The zeolite row is the active and is not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-pure-body-20',
    productName: 'Pure Body (20 mL)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b393-pure-body-20',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Proprietary Processed Clinoptilolite Zeolite', strength: '30 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Pure Body brand product page ingredients section. 20 mL. Serving size 4 drops, 100 servings.',
        'Pure Water',
        LOCK,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/pure-body/ is for sale. 30-day supply, 20 mL. SKU PB20. The supplement-facts image prints the zeolite row and does not print an other-ingredients line. The ingredients section on the same page prints Other Ingredients: Pure Water. The zeolite row is the active and is not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-super-green-juice-30',
    productName: 'Super Green Juice (30 servings)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b393-super-green-juice-30',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Super Greens Alkalizing Blend', strength: '4,046 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Super Green Juice brand supplement-facts image. Serving size 1 scoop (10 g), 30 servings.',
        'Organic Raspberry Flavor',
        LOCK,
      ),
      flag(
        'Touchstone Essentials Super Green Juice brand supplement-facts image. Serving size 1 scoop (10 g), 30 servings.',
        'Organic Apple Flavor',
        LOCK,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/super-green-juice/ is for sale. 30 servings. SKU SGJ01. Other Ingredients: Organic Raspberry Flavor, Organic Apple Flavor. The blends in the facts table are actives and are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-supergreens-d-90',
    productName: 'Supergreens +D (90 capsules)',
    brand: BRAND,
    category: 'Immune Support',
    formulaId: 'touchstone-b393-supergreens-d-90',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Immune Boost SuperGreen Blend', strength: '1299 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Supergreens +D brand supplement-facts image. 90 capsules. Serving size 3 capsules, 30 servings.',
        'Plantcaps™ (pullulan) Capsules',
        LOCK,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/supergreens-d/ is for sale. 30-day supply, 90 capsules. SKU SG90. The supplement-facts image prints Other Ingredients: Plantcaps™ (pullulan) Capsules. The page ingredients section prints Organic Pullulan Capsule. The facts image is the panel. The vitamin D row and the blend are actives and are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-telo-vital-30',
    productName: 'Telo-Vital (30 capsules)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b393-telo-vital-30',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Telomerase Activator Blend', strength: '257 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Telo-Vital brand supplement-facts image. 30 capsules. Serving size 1 capsule, 30 servings.',
        'Organic Vegetable Capsules (pullulan)',
        LOCK,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/telo-vital/ is for sale. 30 capsules. SKU TV0425. The supplement-facts image prints Other Ingredients: Organic Vegetable Capsules (pullulan). The final period is not part of the token. The blends are actives and are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'touchstone-b393-wellspring-60',
    productName: 'Wellspring (60 capsules)',
    brand: BRAND,
    category: 'Vitamins',
    formulaId: 'touchstone-b393-wellspring-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Proprietary Omega Antioxidant Blend', strength: '1,000 mg' }],
    inactiveIngredients: [
      flag(
        'Touchstone Essentials Wellspring brand supplement-facts image. 60 capsules. Serving size 2 capsules, 30 servings.',
        'Vegetable Capsule (hypromellose)',
        HPMC,
      ),
      flag(
        'Touchstone Essentials Wellspring brand supplement-facts image. 60 capsules. Serving size 2 capsules, 30 servings.',
        'Organic Gum Acacia',
        LOCK,
      ),
      flag(
        'Touchstone Essentials Wellspring brand supplement-facts image. 60 capsules. Serving size 2 capsules, 30 servings.',
        'Rice Hull Concentrate',
        HULL,
      ),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't207u. https://thegoodinside.com/shop/product/wellspring/ is for sale. 30-day supply, 60 capsules. SKU WS60. Other Ingredients: Vegetable Capsule (hypromellose), Organic Gum Acacia, Rice Hull Concentrate. The omega blend is the active and is not graded. No UPC was printed. Missing UPC.',
    ],
  },
];
