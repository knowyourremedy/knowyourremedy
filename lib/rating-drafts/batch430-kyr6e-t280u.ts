// DRAFT / not verified / batch 430 KYR6-e (t280u).
// These products are Avoid from an existing Avoid ingredient. No 3+ note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

const CANE = 'Cane sugar. It is used as a sweetener. Cane sugar is graded Limited as a refined sugar (FDA and EFSA treat refined cane sugar as a processed sweetener).';
const TAPIOCA = 'Tapioca Syrup. It is used as a sweetener and binder. Processed sugars are graded Limited (FDA and EFSA treat refined syrups and invert sugar as processed sweeteners).';
const WATER = 'Purified water is plain water with the minerals removed. It is the liquid base of the product.';
const PECTIN = 'Pectin, a plant fiber from fruit. It is used as a gelling agent in gummies.';
const FLAVOR = 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).';
const CITRIC = 'Citric acid is a natural acid used to set the acidity of the product.';
const MALIC = 'Malic acid is a natural acid used to set the acidity of the product.';
const VEGETABLE = 'Vegetable oil. It is used as a carrier or fill. Vegetable oil is graded Avoid when it is the base of a chewable and Caution as a fill (highly processed oil; form-dependent grade under current methodology).';
const CARNAUBA = 'Carnauba wax. It is used as a filler, coating, or added for its plant or nutrient compounds.';
const GELATIN = 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const MCC = 'Microcrystalline cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart in the gut.';
const PHOSPHATE = 'Dibasic calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const CROS = 'Croscarmellose sodium is a cellulose derivative that helps a tablet break apart in the gut.';
const STEARIC = 'Stearic acid is a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const MAG = 'Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const TITANIUM = 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).';
const HPMC = 'Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating.';
const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const MCT = 'Middle-chain triglycerides are a processed fat used as a softgel or liquid fill. They are graded Limited and count toward a 3+ Limited stack.';
const RIBO = 'Riboflavin. It is added to help keep the product stable or for its vitamin activity.';
const INULIN = 'Inulin is a plant fiber from chicory or other roots. It is used as a prebiotic filler.';
const JUICE = 'This is fruit or vegetable juice, puree, concentrate, or powder. It is not a sugar, and it is not high fructose corn syrup.';

const GUMMIES: IngredientFlag[] = [
  flag('Cane Sugar', 'limited', true, CANE, 't271u'),
  flag('Tapioca Syrup', 'limited', true, TAPIOCA, 't240u'),
  flag('Purified Water', 'cleared', false, WATER, 't160u'),
  flag('Citrus Pectin', 'cleared', false, PECTIN, 't240u'),
  flag('Natural Flavor', 'limited', true, FLAVOR, 't240u'),
  flag('Citric Acid', 'cleared', false, CITRIC, 't160u'),
  flag('Malic Acid', 'cleared', false, MALIC, 't160u'),
  flag('Vegetable Oil', 'high', false, VEGETABLE, 't240u'),
  flag('Carnauba Wax', 'cleared', false, CARNAUBA, 't251u'),
  flag('Black Carrot Extract', 'cleared', false, 'Black carrot extract. It is added for color and plant compounds.', 't280u'),
];

const WEIGHT: IngredientFlag[] = [
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('dicalcium phosphate', 'cleared', false, PHOSPHATE, 't162u'),
  flag('croscarmellose sodium', 'cleared', false, CROS, 't160u'),
  flag('stearic acid', 'cleared', false, STEARIC, 't160u'),
  flag('natural vanilla powder', 'cleared', false, 'Natural vanilla powder. It adds vanilla flavor to the product.', 't280u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't160u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
];

const ASH: IngredientFlag[] = [
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('hydroxypropyl methylcellulose', 'cleared', false, HPMC, 't160u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('sodium alginate', 'cleared', false, '', 't256u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('medium chain triglycerides', 'limited', true, MCT, 't162u'),
  flag('riboflavin', 'cleared', false, RIBO, 't256u'),
  flag('stearic acid', 'cleared', false, STEARIC, 't160u'),
  flag('croscarmellose sodium', 'cleared', false, CROS, 't160u'),
  flag('hydroxypropyl cellulose', 'limited', true, 'Hydroxypropyl cellulose. It is used as a coating and binder. Hydroxypropyl cellulose is graded Limited as a processed cellulose derivative (FDA 21 CFR 172.870).', 't280u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't160u'),
];

const MOOD: IngredientFlag[] = [
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('stearic acid', 'cleared', false, STEARIC, 't160u'),
  flag('hydroxypropyl methylcellulose', 'cleared', false, HPMC, 't160u'),
  flag('medium chain triglycerides (safflower oil)', 'limited', true, 'Medium chain triglycerides from safflower oil. It is used as a fill or coating. Medium chain triglycerides are graded Limited as a processed oil (EFSA and FDA treat refined MCT oils as distinct from whole-food oils).', 't280u'),
  flag('inulin', 'cleared', false, INULIN, 'clean alias'),
  flag('vegetable juice', 'cleared', false, JUICE, 'juice'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('croscarmellose sodium', 'cleared', false, CROS, 't160u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't160u'),
];

function base(id: string, name: string, formulaId: string, form: RatingRecord['form'], ingredients: IngredientFlag[], source: string, barcode?: string): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'Estroven',
    category: 'Vitamins',
    formulaId,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Estroven'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients,
    verdict: 'avoid',
    sourcesGeneral: [source],
  };
}

export const BATCH430_KYR6E_T280U: RatingRecord[] = [
  base(
    'estroven-b430-complete-gummies-30',
    'Complete Menopause Relief Gummies 30 Count',
    'estroven-b430-complete-gummies-30',
    'gummy',
    GUMMIES,
    't280u. Brand supplement-facts image https://estroven.com/cdn/shop/files/est-gummies-supp-facts.webp is the other-ingredient panel. Estroven Complete Menopause Relief Gummies. 30 count. The coating is graded as Vegetable Oil and Carnauba Wax. Avoid ingredient: Vegetable Oil. No 3+ note. No UPC on the brand variant. Missing UPC.',
  ),
  base(
    'estroven-b430-weight-management-30-capsules',
    'Weight Management 30 Capsules',
    'estroven-b430-weight-management',
    'capsule',
    WEIGHT,
    't280u. Brand supplement-facts image https://estroven.com/cdn/shop/files/estroven-weight-management-supplement-facts.jpg is the other-ingredient panel. DSLD 273837 is the 30-count label. UPC 092961040225. The check digit passes. Avoid ingredient: titanium dioxide. No 3+ note.',
    '092961040225',
  ),
  base(
    'estroven-b430-weight-management-60-capsules',
    'Weight Management 60 Capsules',
    'estroven-b430-weight-management',
    'capsule',
    WEIGHT,
    't280u. The brand weight-management supplement-facts image is the other-ingredient panel. DSLD 273840 is the 60-count label. UPC 092961040324. The check digit passes. Avoid ingredient: titanium dioxide. No 3+ note.',
    '092961040324',
  ),
  base(
    'estroven-b430-complete-ashwagandha-60-caplets',
    'Complete + Ashwagandha 60 Caplets',
    'estroven-b430-complete-ashwagandha-60-caplets',
    'caplet',
    ASH,
    't280u. Brand supplement-facts image https://estroven.com/cdn/shop/files/estroven-complete_ashwagandha-supp-facts.jpg is the other-ingredient panel. Estroven Complete + Ashwagandha. 60 caplets. Avoid ingredient: titanium dioxide. No 3+ note. No barcode on the brand variant. Missing UPC.',
  ),
  base(
    'estroven-b430-mood-boost-30-caplets',
    'Mood Boost 30 Caplets',
    'estroven-b430-mood-boost-30-caplets',
    'caplet',
    MOOD,
    't280u. Brand supplement-facts image https://estroven.com/cdn/shop/files/Estroven-Mood-Web-SF_1.jpg is the other-ingredient panel. DSLD 267562 is the 30-count label. UPC 092961013335. The check digit passes. The coating is graded as its listed ingredients. Avoid ingredient: titanium dioxide. No 3+ note.',
    '092961013335',
  ),
];
