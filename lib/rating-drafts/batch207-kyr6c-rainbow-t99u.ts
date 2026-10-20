// DRAFT / not verified / batch 207 KYR6-c (t99u WRITE).
// Rainbow Light twenty packs (rows 5–6 and 16 skipped — unlocked OI tokens). Brand Supplement Facts OI only; actives ungraded.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMINS = 'Vitamins';
const IMMUNE = 'Immune Support';
const SLEEP = 'Sleep';
const PRENATAL = 'Prenatal';
const SUPPLEMENT = 'Supplement' as const;

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies and soft chews. In this capsule / softgel / drop fill they are not that High rule. Named single oil as the base or fill is Cleared.';
const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies and soft chews. Sunflower / palm / safflower / vegetable oil used as a gummy or chew coating or fill is that High rule. Capsule / softgel / drop fill of the same oil is not.';

const METH = {
  annatto:
    'Methodology §5 Caution (annatto / Annatto extract (for color) / Annatto Extract Color — Sept 22, 2026 map).',
  beetColor:
    'Methodology §5 Cleared (beet root / beetroot powder (for color) / named plant-color row).',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  celluloseCoating:
    'Methodology §5 Cleared (cellulose-family / Cellulose Coating — t83u Oct 17, 2026).',
  celluloseGum: 'Methodology §5 Cleared (cellulose gum / sodium carboxymethyl cellulose family).',
  cellulosePlant:
    'Methodology §5 Cleared (cellulose-family / Cellulose (Plant Origin) — t83u Oct 17, 2026).',
  citric: 'Methodology §5 Cleared (citric acid).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate).',
  dextrose:
    'Methodology §5 Caution (glucose / bare dextrose sweetener — t87u Oct 17, 2026; not tapioca dextrose or organic cultured dextrose).',
  demineralizedWater:
    'Methodology §5 Cleared (Demineralized Water — purified water / deionized water; t90u Oct 17, 2026).',
  distilledWater:
    'Methodology §5 Cleared (Distilled Water — purified water / bare water / deionized water / demineralized water; t99u Oct 17, 2026).',
  flavors: 'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  fructose: 'Methodology §5 Limited (fructose as sweetener).',
  gelatin: 'Methodology §5 Cleared (gelatin / Fish Gelatin / Gelatin Capsule).',
  gelatinCap: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic vegetable glycerin).',
  gslWater:
    'Methodology §5 Cleared (Concentrated Water from Great Salt Lake — Trace Minerals (From Seawater) family; t91u Oct 17, 2026).',
  ironColor:
    'Methodology §5 Caution (iron oxide as color — yellow iron oxide / red iron oxide; Sept 24, 2026).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — sweetener or color).',
  lecithin: 'Methodology §5 Cleared (lecithin / sunflower lecithin / soy lecithin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  monkFruit:
    'Methodology §5 Cleared (monk fruit / mogrosides, high-purity extract — Organic Monk Fruit Extract sibling row).',
  namedPeppermintFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  pectin: 'Methodology §5 Cleared (pectin).',
  potassiumSorbate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate).',
  purifiedWater: 'Methodology §5 Cleared (purified water / deionized water / demineralized water).',
  ricePowder:
    'Methodology §5 Cleared (Rice Powder — founder lock t132u Oct 20, 2026; §4 re-eval before prior locks).',
  riceBranFill: `Methodology §5 Cleared (rice bran oil as softgel / capsule fill — NOT gummy High). ${OIL_FILL_TAP}`,
  safflowerFill: `Methodology §5 Cleared (safflower oil as softgel fill — NOT gummy High). ${OIL_FILL_TAP}`,
  salt: 'Methodology §5 Cleared (sodium chloride / sea salt).',
  seedOilGummy: `Methodology §5 High-tier (seed/industrial oils in gummies / soft chews). ${GUMMY_OIL_TAP}`,
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  steviaRebA:
    'Methodology §5 Cleared (stevia / steviol glycosides — Stevia Extract (Rebaudioside A) / Reb A).',
  stearic: 'Methodology §5 Cleared (stearic acid / vegetable stearic acid — stearate-family lubricant).',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  sugar: 'Methodology §5 Cleared (sugar / cane sugar).',
  sunflowerFill: `Methodology §5 Cleared (sunflower oil / sunflower seed oil as softgel fill — NOT gummy High). ${OIL_FILL_TAP}`,
  tapiocaSyrup: 'Methodology §5 Cleared (tapioca syrup / organic tapioca syrup).',
  veganCapsule:
    'Methodology §5 Caution (Vegan Capsule — unnamed vegetable / vegetarian capsule shell; t90u Oct 17, 2026).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function rl(handle: string): string {
  return `https://www.rainbowlight.com/products/${handle}`;
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

const LIQUID_HERB_OI: FlagSpec[] = [
  ['Vegetable Glycerin', 'cleared', 'glycerin'],
  ['Purified Water', 'cleared', 'purifiedWater'],
  ['Potassium Sorbate (For Freshness)', 'limited', 'potassiumSorbate'],
];

type RowSpec = {
  id: string;
  handle: string;
  productName: string;
  category: string;
  form: RatingRecord['form'];
  barcode: string;
  flags: FlagSpec[];
  oiLine: string;
  active: string;
  sourceNote?: string;
  brandOos?: boolean;
  extraSaleLine?: string;
};

const SPECS: RowSpec[] = [
  {
    id: 'rainbow-b207-super-concentrated-echinacea-2oz',
    handle: 'super-concentrated-echinacea-2-fl-oz-59-ml-dropper-bottle-rl39549',
    productName: 'Rainbow Light Super Concentrated Echinacea, 2 fl oz',
    category: IMMUNE,
    form: 'liquid',
    barcode: '850086437012',
    active: 'Super concentrated echinacea extract',
    oiLine: 'Vegetable Glycerin, Purified Water, Potassium Sorbate (For Freshness).',
    flags: LIQUID_HERB_OI,
  },
  {
    id: 'rainbow-b207-echinacea-goldenseal-2oz',
    handle: 'echinacea-goldenseal-2-fl-oz-59-ml-dropper-bottle-rl39548',
    productName: 'Rainbow Light Echinacea Goldenseal, 2 fl oz',
    category: IMMUNE,
    form: 'liquid',
    barcode: '850086437029',
    active: 'Echinacea and goldenseal extract blend',
    oiLine: 'Vegetable Glycerin, Purified Water, Potassium Sorbate (For Freshness).',
    flags: LIQUID_HERB_OI,
  },
  {
    id: 'rainbow-b207-coq10-200-30',
    handle: 'coq10-200-mg-30-quick-release-softgels-rl915',
    productName: 'Rainbow Light CoQ10 200 mg, 30 Quick Release Softgels',
    category: VITAMINS,
    form: 'softgel',
    barcode: '850086437159',
    active: 'Coenzyme Q10',
    oiLine:
      'Rice Bran Oil, Gelatin, Vegetable Glycerin, Sunflower Lecithin and/or Soy Lecithin, Yellow Iron Oxide (Color). Contains soy ingredients.',
    sourceNote: 'Contains soy line not graded.',
    flags: [
      ['Rice Bran Oil', 'cleared', 'riceBranFill'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Sunflower Lecithin', 'cleared', 'lecithin'],
      ['Soy Lecithin', 'cleared', 'lecithin'],
      ['Yellow Iron Oxide (Color)', 'limited', 'ironColor'],
    ],
  },
  {
    id: 'rainbow-b207-melatonin-12mg-90',
    handle: 'melatonin-12-mg-natural-berry-flavor-90-fast-dissolve-tablets-rl7395',
    productName: 'Rainbow Light Melatonin 12 mg Natural Berry Flavor, 90 Fast Dissolve Tablets',
    category: SLEEP,
    form: 'tablet',
    barcode: '850086437173',
    active: 'Melatonin',
    oiLine:
      'Mannitol, Natural Flavors, Cellulose (Plant Origin), Beet Root Color, Crospovidone, Dextrose, Vegetable Stearic Acid, Vegetable Magnesium Stearate, Sucralose, Silica.',
    flags: [
      ['Mannitol', 'limited', 'mannitol'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
      ['Beet Root Color', 'cleared', 'beetColor'],
      ['Crospovidone', 'cleared', 'crospovidone'],
      ['Dextrose', 'limited', 'dextrose'],
      ['Vegetable Stearic Acid', 'cleared', 'stearic'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Sucralose', 'moderate', 'sucralose'],
      ['Silica', 'limited', 'silica'],
    ],
  },
  {
    id: 'rainbow-b207-10-magnesium-complex-90',
    handle: '10-magnesium-complex-90-vegan-capsules-rl24214',
    productName: 'Rainbow Light 10 Magnesium Complex, 90 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850086437135',
    active: 'Ten-form magnesium complex',
    oiLine: 'Vegan Capsule, Vegetable Magnesium Stearate, Silica, Rice Powder.',
    flags: [
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
      ['Rice Powder', 'cleared', 'ricePowder'],
    ],
  },
  {
    id: 'rainbow-b207-vitamin-d3-10000-100',
    handle: 'high-potency-vitamin-d3-10000-iu-100-quick-release-softgels-rl11391',
    productName: 'Rainbow Light High Potency Vitamin D3 10000 IU, 100 Quick Release Softgels',
    category: VITAMINS,
    form: 'softgel',
    barcode: '850086437128',
    active: 'Vitamin D3 (cholecalciferol)',
    oiLine: 'Gelatin, Sunflower Seed Oil, Vegetable Glycerin.',
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Sunflower Seed Oil', 'cleared', 'sunflowerFill'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
    ],
  },
  {
    id: 'rainbow-b207-nmn-complex-60',
    handle: 'nmn-complex-60-capsules-rl29142',
    productName: 'Rainbow Light NMN Complex, 60 Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850086437043',
    active: 'NMN complex blend',
    oiLine:
      'Gelatin Capsule, Silica, Cellulose (Plant Origin), Vegetable Magnesium Stearate. Contains egg and fish (tilapia) ingredients.',
    sourceNote: 'Contains allergen line not graded.',
    flags: [
      ['Gelatin Capsule', 'cleared', 'gelatinCap'],
      ['Silica', 'limited', 'silica'],
      ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
    ],
  },
  {
    id: 'rainbow-b207-lions-mane-liquid-2oz',
    handle: 'lions-mane-mushroom-alcohol-free-2-fl-oz-59-ml-liquid-rl32152',
    productName: "Rainbow Light Lion's Mane Mushroom Alcohol Free, 2 fl oz",
    category: IMMUNE,
    form: 'liquid',
    barcode: '850086437036',
    active: "Lion's mane mushroom extract",
    oiLine: 'Vegetable Glycerin, Purified Water, Potassium Sorbate (For Freshness).',
    flags: LIQUID_HERB_OI,
  },
  {
    id: 'rainbow-b207-beef-organs-women-120',
    handle: 'beef-organs-for-women-120-capsules-rl28692',
    productName: 'Rainbow Light Beef Organs for Women, 120 Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850086437067',
    active: 'Beef organ blend',
    oiLine: 'Gelatin Capsule, Vegetable Magnesium Stearate, Silica.',
    flags: [
      ['Gelatin Capsule', 'cleared', 'gelatinCap'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
    ],
  },
  {
    id: 'rainbow-b207-beef-organ-complex-120',
    handle: 'pasture-raised-beef-organ-complex-120-capsules-rl17651',
    productName: 'Rainbow Light Pasture Raised Beef Organ Complex, 120 Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850086437074',
    active: 'Pasture-raised beef organ complex',
    oiLine: 'Gelatin Capsule, Vegetable Magnesium Stearate, Silica.',
    flags: [
      ['Gelatin Capsule', 'cleared', 'gelatinCap'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
    ],
  },
  {
    id: 'rainbow-b207-fulvic-acid-liquid-2oz',
    handle: 'fulvic-acid-liquid-alcohol-free-2-fl-oz-59-ml-liquid-rl24621',
    productName: 'Rainbow Light Fulvic Acid Liquid Alcohol Free, 2 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584680',
    active: 'Fulvic acid',
    oiLine:
      'Demineralized Water, Citric Acid, Potassium Sorbate (For Freshness), Sodium Benzoate (For Freshness).',
    flags: [
      ['Demineralized Water', 'cleared', 'demineralizedWater'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Potassium Sorbate (For Freshness)', 'limited', 'potassiumSorbate'],
      ['Sodium Benzoate (For Freshness)', 'limited', 'benzoate'],
    ],
  },
  {
    id: 'rainbow-b207-colloidal-minerals-32oz',
    handle: 'colloidal-minerals-raspberry-flavor-32-fl-oz-946-ml-liquid-rl39388',
    productName: 'Rainbow Light Colloidal Minerals Raspberry Flavor, 32 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584673',
    active: 'Colloidal minerals blend',
    oiLine:
      'Demineralized Water, Fructose, Citric Acid, Natural Flavor, Sodium Benzoate (for freshness), Potassium Sorbate (for freshness).',
    flags: [
      ['Demineralized Water', 'cleared', 'demineralizedWater'],
      ['Fructose', 'limited', 'fructose'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Natural Flavor', 'limited', 'flavors'],
      ['Sodium Benzoate (for freshness)', 'limited', 'benzoate'],
      ['Potassium Sorbate (for freshness)', 'limited', 'potassiumSorbate'],
    ],
  },
  {
    id: 'rainbow-b207-ionic-magnesium-liquid-4oz',
    handle: 'ionic-magnesium-liquid-4-fl-oz-118-ml-liquid-rl24241',
    productName: 'Rainbow Light Ionic Magnesium Liquid, 4 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584581',
    active: 'Ionic magnesium',
    oiLine: 'Concentrated Water from Great Salt Lake in Utah.',
    flags: [['Concentrated Water from Great Salt Lake in Utah.', 'cleared', 'gslWater']],
  },
  {
    id: 'rainbow-b207-ashwagandha-gummies-60',
    handle: 'ashwagandha-gummies-500-mg-tropical-flavor-60-vegan-gummies-rl18131',
    productName: 'Rainbow Light Ashwagandha Gummies 500 mg Tropical Flavor, 60 Vegan Gummies',
    category: VITAMINS,
    form: 'gummy',
    barcode: '850068584611',
    active: 'Ashwagandha extract',
    oiLine:
      'Tapioca Syrup, Sugar, Pectin, Citric Acid, Natural Flavors, Fruit and Vegetable Juice Color.',
    flags: [
      ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
      ['Sugar', 'cleared', 'sugar'],
      ['Pectin', 'cleared', 'pectin'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Fruit and Vegetable Juice Color', 'cleared', 'juiceColor'],
    ],
  },
  {
    id: 'rainbow-b207-liquid-chlorophyll-16oz',
    handle: 'liquid-chlorophyll-100-mg-natural-peppermint-flavor-16-fl-oz-473-ml-liquid-rl11960',
    productName: 'Rainbow Light Liquid Chlorophyll 100 mg Natural Peppermint Flavor, 16 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584703',
    active: 'Chlorophyll',
    oiLine: 'Demineralized Water, Vegetable Glycerin, Sodium Chloride, Natural Peppermint Flavor.',
    flags: [
      ['Demineralized Water', 'cleared', 'demineralizedWater'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Sodium Chloride', 'cleared', 'salt'],
      ['Natural Peppermint Flavor', 'cleared', 'namedPeppermintFlavor'],
    ],
  },
  {
    id: 'rainbow-b207-ashwagandha-ksm66-60',
    handle: 'ashwagandha-ksm-66-600-mg-with-l-theanine-60-vegan-caplets-rl19032',
    productName: 'Rainbow Light Ashwagandha KSM-66 600 mg with L-Theanine, 60 Vegan Caplets',
    category: VITAMINS,
    form: 'caplet',
    barcode: '850068584598',
    active: 'KSM-66 ashwagandha with L-theanine',
    oiLine:
      'Dicalcium Phosphate, Cellulose (Plant Origin), Cellulose Gum, Vegetable Stearic Acid, Vegetable Magnesium Stearate, Silica, Cellulose Coating.',
    flags: [
      ['Dicalcium Phosphate', 'cleared', 'dicalcium'],
      ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
      ['Cellulose Gum', 'cleared', 'celluloseGum'],
      ['Vegetable Stearic Acid', 'cleared', 'stearic'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
      ['Cellulose Coating', 'cleared', 'celluloseCoating'],
    ],
  },
  {
    id: 'rainbow-b207-astaxanthin-10mg-60',
    handle: 'algae-derived-astaxanthin-10mg-60-softgels-rl250',
    productName: 'Rainbow Light Algae Derived Astaxanthin 10 mg, 60 Softgels',
    category: VITAMINS,
    form: 'softgel',
    barcode: '850068584628',
    active: 'Astaxanthin from algae',
    oiLine: 'Sunflower Oil and/or Safflower Oil, Gelatin, Vegetable Glycerin.',
    flags: [
      ['Sunflower Oil', 'cleared', 'sunflowerFill'],
      ['Safflower Oil', 'cleared', 'safflowerFill'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
    ],
  },
  {
    id: 'rainbow-b207-prenatal-dha-180',
    handle: 'prenatal-dha-ultra-omega-3-fish-oil-180-softgels-rl27263',
    productName: 'Rainbow Light Prenatal DHA Ultra Omega-3 Fish Oil, 180 Softgels',
    category: PRENATAL,
    form: 'softgel',
    barcode: '850068584093',
    active: 'Prenatal DHA omega-3 fish oil',
    oiLine:
      'Fish Gelatin, Vegetable Glycerin, Natural Orange Flavor. Contains fish (anchovy, tilapia) ingredients.',
    sourceNote: 'Contains fish line not graded.',
    flags: [
      ['Fish Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Natural Orange Flavor', 'cleared', 'flavors'],
    ],
  },
  {
    id: 'rainbow-b207-womens-one-50-plus-150',
    handle: 'womens-one-50-plus-real-food-nutrients-150-vegetarian-caplets-rl20425',
    productName: "Rainbow Light Women's One 50+ Real Food Nutrients, 150 Vegetarian Caplets",
    category: VITAMINS,
    form: 'caplet',
    barcode: '021888204250',
    active: "Women's One 50+ multivitamin blend",
    brandOos: true,
    extraSaleLine:
      'Opened https://www.target.com/p/-/A-1010549362 with sale. Not a duplicate of batch202 Women\'s One 50+ 90 or 120.',
    oiLine:
      'Cellulose (Plant Origin), Cellulose Gum, Vegetable Magnesium Stearate, Silica, Cellulose Coating, Carnauba Wax.',
    flags: [
      ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
      ['Cellulose Gum', 'cleared', 'celluloseGum'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
      ['Cellulose Coating', 'cleared', 'celluloseCoating'],
      ['Carnauba Wax', 'cleared', 'carnauba'],
    ],
  },
  {
    id: 'rainbow-b207-lugols-iodine-2oz',
    handle: 'lugols-iodine-2-solution-2-fl-oz-59-ml-liquid-rl40053',
    productName: "Rainbow Light Lugol's Iodine 2% Solution, 2 fl oz",
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584147',
    active: 'Potassium iodide 4%; iodine 2% (actives ungraded)',
    oiLine: 'Distilled Water 94%, Potassium iodide 4%, Iodine 2%.',
    extraSaleLine:
      'Opened https://healthfullyours.com/products/rainbow-light-lugols-iodine with sale. Founder-confirmed panel t98u.',
    flags: [['Distilled Water', 'cleared', 'distilledWater']],
  },
];

// Row 5 skipped: no exact §5 lock for `Organic Flavors` (distinct from Organic Flavor / Organic Natural Flavors).
// Row 6 skipped: no exact §5 lock for `Organic Tapioca Starch` (t90u aliases Organic Tapioca Powder only) and `Turmeric Extract Color` (distinct from Natural Color (Turmeric)).
// Row 16 skipped: same `Organic Flavors` token as row 5 on Magnesium Glycinate powder.

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function toRecord(spec: RowSpec): RatingRecord {
  const panel = rl(spec.handle);
  const note = spec.sourceNote ? `${spec.sourceNote} ` : '';
  const brandSale = spec.brandOos
    ? 'Rainbow Light brand store out of stock (label/UPC source only; not a sale page).'
    : 'Rainbow Light brand store in stock (t98u sale page).';
  const extra = spec.extraSaleLine ? ` ${spec.extraSaleLine}` : '';
  const source = `Brand page ${panel} supplement-facts image (brand panel) was read. Other ingredients: ${spec.oiLine} ${note}Brand gtin12 ${spec.barcode}. ${brandSale} Amazon — founder-confirmed current US sale page (t98u).${extra} Row graded from the brand Supplement Facts label only; actives ungraded.`;
  return {
    id: spec.id,
    productName: spec.productName,
    brand: 'Rainbow Light',
    category: spec.category,
    formulaId: spec.id,
    audience: ADULT,
    minAge: 18,
    form: spec.form,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: spec.barcode,
    activeIngredients: [{ name: spec.active, strength: 'label serving' }],
    inactiveIngredients: buildOi(panel, spec.flags),
    verdict: verdictFromFlags(spec.flags),
    retailers: ['Rainbow Light', 'Amazon'],
    sourcesGeneral: [source],
  };
}

export const BATCH207_KYR6C_RAINBOW_T99U: RatingRecord[] = SPECS.map(toRecord);

const ROWS = BATCH207_KYR6C_RAINBOW_T99U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 20) throw new Error(`batch207 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch207 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch207 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch207 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch207 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch207 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch207 verdict ${record.id}`);
}
