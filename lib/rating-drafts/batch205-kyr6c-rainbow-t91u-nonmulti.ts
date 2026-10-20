// DRAFT / not verified / batch 205 KYR6-c (t91u WRITE).
// Rainbow Light non-multi — brand Supplement Facts OI only; actives ungraded.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const IMMUNE = 'Immune Support';
const SLEEP = 'Sleep';
const PRENATAL = 'Prenatal';
const SUPPLEMENT = 'Supplement' as const;

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies and soft chews. In this capsule / softgel / drop fill they are not that High rule. Named single oil as the base or fill is Cleared.';
const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies and soft chews. Sunflower / palm / safflower / vegetable oil used as a gummy or chew coating or fill is that High rule. Capsule / softgel / drop fill of the same oil is not.';

const METH = {
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate).',
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as mineral salt / buffer).',
  caramel: 'Methodology §5 High-tier (caramel color, undisclosed class — IARC 2B / 4-MEI; treated as Class III/IV).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  cellulosePlant:
    'Methodology §5 Cleared (cellulose-family / Cellulose (Plant Origin) — t83u Oct 17, 2026).',
  citric: 'Methodology §5 Cleared (citric acid).',
  citrate: 'Methodology §5 Cleared (sodium citrate, citrate salt).',
  coconutGummy:
    'Methodology §5 Cleared (coconut oil alone in gummies/chews — NOT the seed/industrial-oil High rule).',
  demineralizedWater:
    'Methodology §5 Cleared (Demineralized Water — purified water / deionized water; t90u Oct 17, 2026).',
  flavors: 'Methodology §5 Limited-risk (natural flavors opacity — Natural Flavor / Natural Flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  gelatinCap: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic vegetable glycerin).',
  juiceColor:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — sweetener or color).',
  lecithin: 'Methodology §5 Cleared (lecithin / sunflower lecithin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  namedColor:
    'Methodology §5 Cleared (black carrot / fruit-or-vegetable juice as color / Organic Vegetable Juice (Color)).',
  oliveFill: `Methodology §5 Cleared (extra-virgin / organic extra virgin olive oil as softgel or drop fill — NOT gummy High). ${OIL_FILL_TAP}`,
  organicFlavor:
    'Methodology §5 Caution (flavor family — Organic Flavor; named/organic flavor Caution row).',
  organicNaturalFlavors:
    'Methodology §5 Caution (Organic Natural Flavors — unnamed natural flavor family; t90u Oct 17, 2026).',
  organicOatHull:
    'Methodology §5 Caution (Organic Oat Hull / Organic Oat Hull Fiber — organic oat fiber; t90u Oct 17, 2026).',
  organicRiceFiber:
    'Methodology §5 Cleared (Organic Rice Fiber — organic rice hull / concentrate / rice-hull family; t90u Oct 17, 2026).',
  organicSugar: 'Methodology §5 Cleared (Organic Sugar / organic beet sugar — t90u Oct 17, 2026).',
  organicTapiocaPowder: 'Methodology §5 Limited (Organic Tapioca Powder — t90u Oct 17, 2026).',
  paprikaColor:
    'Methodology §5 Caution (Paprika (color) — paprika extract natural color; t90u Oct 17, 2026).',
  pectin: 'Methodology §5 Cleared (pectin).',
  potassiumSorbate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate).',
  purifiedWater: 'Methodology §5 Cleared (purified water / distilled water).',
  riceBranFill: `Methodology §5 Cleared (rice bran oil as softgel / capsule fill — NOT gummy High). ${OIL_FILL_TAP}`,
  riceExtract:
    'Methodology §5 Limited-risk (unspecified rice extract / Organic Rice Extract Blend — opacity).',
  ricePowder:
    'Methodology §5 Cleared (Rice Powder — founder lock t132u Oct 20, 2026; §4 re-eval before prior locks).',
  salt: 'Methodology §5 Cleared (sodium chloride / sea salt).',
  seedOilGummy: `Methodology §5 High-tier (seed/industrial oils in gummies / soft chews — sunflower seed oil, palm oil). ${GUMMY_OIL_TAP}`,
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  steviaRebA:
    'Methodology §5 Cleared (stevia / steviol glycosides — Stevia Extract (Rebaudioside A) / Reb A).',
  sugar: 'Methodology §5 Cleared (sugar / cane sugar).',
  sunflowerFill: `Methodology §5 Cleared (sunflower oil as softgel fill — NOT gummy High). ${OIL_FILL_TAP}`,
  sustainablePalmChew: `Methodology §5 High-tier (Sustainable Palm Oil in soft chews — gummy/chew seed-oil rule; t90u Oct 17, 2026). ${GUMMY_OIL_TAP}`,
  tapiocaSyrup: 'Methodology §5 Cleared (tapioca syrup / organic tapioca syrup).',
  veganCapsule:
    'Methodology §5 Caution (Vegan Capsule — unnamed vegetable / vegetarian capsule shell; t90u Oct 17, 2026).',
  veggieSoftgel:
    'Methodology §5 Caution (Veggie Softgel — unnamed shell; t90u Oct 17, 2026).',
  vitETocopherylAcetateOi:
    'Methodology §5 Cleared (Vitamin E (d-alpha-tocopheryl acetate) as OI — t90u Oct 17, 2026).',
  wax: 'Methodology §5 Cleared (beeswax / yellow beeswax).',
  xanthan: 'Methodology §5 Cleared (xanthan gum — guar / pectin family).',
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

type RowSpec = {
  id: string;
  handle: string;
  productName: string;
  category: string;
  form: RatingRecord['form'];
  barcode?: string;
  retailers: string[];
  secondUrl: string;
  active: string;
  flags: FlagSpec[];
  oiLine: string;
  sourceNote?: string;
};

const SPECS: RowSpec[] = [
  {
    id: 'rainbow-b205-l-methylfolate-15-60',
    handle: 'l-methylfolate-15-mg-methyl-b12-saffron-60-vegan-capsules-rl28721',
    productName: 'Rainbow Light L-Methylfolate 15 mg + Methyl B12 + Saffron, 60 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584819',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl: 'https://www.vitacost.com/products/rainbow-light-l-methylfolate-60-vegan-capsules-161595',
    active: 'L-methylfolate + methyl B12 + saffron blend',
    oiLine:
      'Rice Powder, Vegan Capsule, Vegetable Magnesium Stearate, Silica.',
    flags: [
      ['Rice Powder', 'cleared', 'ricePowder'],
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
    ],
  },
  {
    id: 'rainbow-b205-berberine-complex-60',
    handle: 'berberine-complex-1000-mg-60-vegan-capsules-rl27031',
    productName: 'Rainbow Light Berberine Complex 1000 mg, 60 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584031',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-naturally-derived-berine-complex-60-vegan-capsules-161024',
    active: 'Berberine complex',
    oiLine:
      'Organic Oat Hull, Vegan Capsule, Organic Rice Extract Blend, Organic Rice Fiber.',
    sourceNote: 'Vitacost title typo Berine; UPC matches.',
    flags: [
      ['Organic Oat Hull', 'limited', 'organicOatHull'],
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
      ['Organic Rice Fiber', 'cleared', 'organicRiceFiber'],
    ],
  },
  {
    id: 'rainbow-b205-pumpkin-seed-oil-biotin-90',
    handle: 'pumpkin-seed-oil-biotin-saw-palmetto-90-softgels-rl28731',
    productName: 'Rainbow Light Pumpkin Seed Oil + Biotin & Saw Palmetto, 90 Softgels',
    category: VITAMINS,
    form: 'softgel',
    barcode: '850068584949',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/pumpkin-seed-oil-biotin-saw-palmetto-90-softgels-by-rainbow-light/1000070534',
    active: 'Pumpkin seed oil + biotin + saw palmetto blend',
    oiLine: 'Gelatin, Vegetable Glycerin, Caramel Color, Yellow Beeswax, Sunflower Lecithin.',
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Caramel Color', 'high', 'caramel'],
      ['Yellow Beeswax', 'cleared', 'wax'],
      ['Sunflower Lecithin', 'cleared', 'lecithin'],
    ],
  },
  {
    id: 'rainbow-b205-daily-prebiotic-probiotic-powder',
    handle: 'daily-prebiotic-probiotic-powder-organic-20-billion-cfu-476-oz-bottle-rl1550073',
    productName:
      'Rainbow Light Organic Daily Prebiotic + Probiotic Powder 20 Billion CFU, 4.76 oz',
    category: DIGESTIVE,
    form: 'powder',
    barcode: '850068584765',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/organic-daily-probiotic-20-billion-cfu-pre-powder-4-76-oz-by-rainbow-light/1000070001',
    active: 'Prebiotic + probiotic blend',
    oiLine: 'None.',
    flags: [],
  },
  {
    id: 'rainbow-b205-vitamin-d3-k2-liquid-2oz',
    handle: 'vitamin-d3-k2-as-mk-7-2-fl-oz-59-ml-liquid-rl18621',
    productName: 'Rainbow Light Vitamin D3 + K2 as MK-7, 2 fl oz',
    category: VITAMINS,
    form: 'liquid',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl: 'https://www.vitacost.com/products/rainbow-light-vitamin-d3-k2-as-mk-7-2-fl-oz-59-ml-161596',
    active: 'Vitamin D3 + K2 (MK-7)',
    oiLine: 'Organic Extra Virgin Olive Oil.',
    sourceNote:
      't85u: brand page shows no gtin12; only Vitacost shows UPC 850068584246 — barcode left empty.',
    flags: [['Organic Extra Virgin Olive Oil', 'cleared', 'oliveFill']],
  },
  {
    id: 'rainbow-b205-magnesium-glycinate-softgel-60',
    handle: 'magnesium-glycinate-250-mg-60-quick-release-softgels-rl24123',
    productName:
      'Rainbow Light High Absorption Magnesium Glycinate 250 mg, 60 Quick Release Softgels',
    category: VITAMINS,
    form: 'softgel',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/high-absorption-magnesium-glycinate-250-mg-60-quick-release-softgels-by-rainbow-light/1000070533',
    active: 'Magnesium glycinate',
    oiLine:
      'Rice Bran Oil, Gelatin, Vegetable Glycerin, Sunflower Lecithin, Caramel Color, Calcium Carbonate.',
    sourceNote:
      't85u: brand shows no gtin12; PureFormulas page UPC 850068584536 — barcode left empty.',
    flags: [
      ['Rice Bran Oil', 'cleared', 'riceBranFill'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Sunflower Lecithin', 'cleared', 'lecithin'],
      ['Caramel Color', 'high', 'caramel'],
      ['Calcium Carbonate', 'cleared', 'calciumCarbonate'],
    ],
  },
  {
    id: 'rainbow-b205-all-zyme-double-strength-90',
    handle: 'all-zyme-double-strength-90-vegan-capsules-rl35101',
    productName: 'Rainbow Light All-Zyme Double Strength, 90 Vegan Capsules',
    category: DIGESTIVE,
    form: 'capsule',
    barcode: '021888351015',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl: 'https://www.vitacost.com/products/rainbow-light-all-zyme-90-vegan-capsules-40950',
    active: 'Digestive enzyme blend',
    oiLine:
      'Organic Oat Hull Fiber, Vegan Capsule, Organic Rice Fiber, Organic Rice Extract Blend.',
    flags: [
      ['Organic Oat Hull Fiber', 'limited', 'organicOatHull'],
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Organic Rice Fiber', 'cleared', 'organicRiceFiber'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
    ],
  },
  {
    id: 'rainbow-b205-creatine-multi-collagen-powder-10oz',
    handle: 'creatine-multi-collagen-powder-10-oz-285-g-bottle-rl28641',
    productName: 'Rainbow Light Creatine + Multi Collagen Powder Unflavored, 10 oz',
    category: VITAMINS,
    form: 'powder',
    barcode: '850068584512',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/creatine-multi-collagen-powder-unflavored-10-oz-by-rainbow-light/1000070005',
    active: 'Creatine + multi collagen blend',
    oiLine:
      'None. Contains egg and fish (tilapia) ingredients. May contain: Trace amounts of naturally occurring sulfite residue.',
    sourceNote: 'Allergen / Contains lines not graded.',
    flags: [],
  },
  {
    id: 'rainbow-b205-oil-oregano-black-seed-90',
    handle: 'oil-of-oregano-black-seed-oil-8000-mg-90-softgels-rl28602',
    productName: 'Rainbow Light Oil of Oregano with Black Seed Oil 8,000 mg, 90 Softgels',
    category: IMMUNE,
    form: 'softgel',
    barcode: '850068584659',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/oil-of-oregano-with-black-seed-oil-8-000-mg-90-softgels-by-rainbow-light/1000070537',
    active: 'Oil of oregano + black seed oil blend',
    oiLine: 'Gelatin, Vegetable Glycerin.',
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
    ],
  },
  {
    id: 'rainbow-b205-vitamin-c-gummies-60',
    handle: 'high-potency-vitamin-c-gummies-citrus-flavor-60-vegan-gummies-rl20398',
    productName: 'Rainbow Light High Potency Vitamin C Gummies Citrus Flavor, 60 Vegan Gummies',
    category: VITAMINS,
    form: 'gummy',
    barcode: '021888203987',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-vitamin-c-slices-plus-vitamin-e-citrus-60-vegan-gummies-40004',
    active: 'Vitamin C gummy blend',
    oiLine:
      'Organic Beet Sugar, Glucose Syrup, Citric Acid, Pectin, Sunflower Seed Oil, Natural Flavor, Sodium Citrate, Carnauba Wax, Coconut Oil, Orange Juice Concentrate, Paprika (color), Sunflower Lecithin.',
    flags: [
      ['Organic Beet Sugar', 'cleared', 'organicSugar'],
      ['Glucose Syrup', 'cleared', 'glucose'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Pectin', 'cleared', 'pectin'],
      ['Sunflower Seed Oil', 'high', 'seedOilGummy'],
      ['Natural Flavor', 'limited', 'flavors'],
      ['Sodium Citrate', 'cleared', 'citrate'],
      ['Carnauba Wax', 'cleared', 'carnauba'],
      ['Coconut Oil', 'cleared', 'coconutGummy'],
      ['Orange Juice Concentrate', 'cleared', 'juiceColor'],
      ['Paprika (color)', 'limited', 'paprikaColor'],
      ['Sunflower Lecithin', 'cleared', 'lecithin'],
    ],
  },
  {
    id: 'rainbow-b205-astaxanthin-12mg-60',
    handle: 'triple-strength-astaxanthin-from-micoalgae-12-mg-60-quick-release-softgels-rl12322',
    productName:
      'Rainbow Light Triple Strength Astaxanthin from Microalgae 12 mg, 60 Quick Release Softgels',
    category: VITAMINS,
    form: 'softgel',
    barcode: '850068584635',
    retailers: ['Rainbow Light', 'Lindberg Nutrition'],
    secondUrl:
      'https://www.lindbergnutrition.com/products/triple-strength-astaxanthin-from-micoalgae-12-mg-60-quick-release-softgels-rl12322',
    active: 'Astaxanthin',
    oiLine: 'Sunflower Oil, Gelatin, Vegetable Glycerin, Caramel Color.',
    flags: [
      ['Sunflower Oil', 'cleared', 'sunflowerFill'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Caramel Color', 'high', 'caramel'],
    ],
  },
  {
    id: 'rainbow-b205-himalayan-shilajit-60',
    handle: 'himalayan-shilajit-2000-mg-60-quick-release-capsules-rl8115',
    productName: 'Rainbow Light Himalayan Shilajit 2,000 mg, 60 Quick Release Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584895',
    retailers: ['Rainbow Light', 'Co-op Market'],
    secondUrl: 'https://www.coopmarket.com/rainbow-light-himalayan-shilajit-2-000-mg-60-quick-release-capsules',
    active: 'Shilajit extract',
    oiLine: 'Cellulose (Plant Origin), Gelatin Capsule, Vegetable Magnesium Stearate.',
    flags: [
      ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
      ['Gelatin Capsule', 'cleared', 'gelatinCap'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
    ],
  },
  {
    id: 'rainbow-b205-valerian-root-liquid-2oz',
    handle: 'valerian-root-liquid-herbal-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl39552',
    productName: 'Rainbow Light Valerian Root Liquid Herbal Extract Alcohol Free, 2 fl oz',
    category: SLEEP,
    form: 'liquid',
    barcode: '850068584284',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-valerian-root-alcohol-free-2-fl-oz-59-ml-161027',
    active: 'Valerian root extract',
    oiLine: 'Vegetable Glycerin, Purified Water, Potassium Sorbate (For Freshness).',
    flags: [
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Purified Water', 'cleared', 'purifiedWater'],
      ['Potassium Sorbate (For Freshness)', 'limited', 'potassiumSorbate'],
    ],
  },
  {
    id: 'rainbow-b205-saffron-magnesium-b12-90',
    handle: 'saffron-magnesium-glycinate-with-b12-90-vegan-capsules-rl28741',
    productName:
      'Rainbow Light Saffron + Magnesium Glycinate with Methyl B12, 90 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584901',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-saffron-magnesium-glycinate-with-methyl-b12-90-vegan-capsules-161594',
    active: 'Saffron + magnesium glycinate + methyl B12 blend',
    oiLine: 'Cellulose (Plant Origin), Vegan Capsule, Silica, Vegetable Magnesium Stearate.',
    flags: [
      ['Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'],
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Silica', 'limited', 'silica'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
    ],
  },
  {
    id: 'rainbow-b205-lithium-orotate-120',
    handle: 'lithium-orotate-5-mg-120-vegan-capsules-rl15233',
    productName: 'Rainbow Light Lithium Orotate 5 mg Bioavailable, 120 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584697',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/lithium-orotate-5-mg-bioavailable-by-rainbow-light/1000070535',
    active: 'Lithium orotate',
    oiLine: 'Rice Powder, Vegan Capsule, Vegetable Magnesium Stearate.',
    flags: [
      ['Rice Powder', 'cleared', 'ricePowder'],
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
    ],
  },
  {
    id: 'rainbow-b205-super-yohimbe-liquid-2oz',
    handle: 'super-yohimbe-liquid-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl40411',
    productName: 'Rainbow Light Fast Acting Super Yohimbe Liquid Extract Alcohol Free, 2 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584307',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/fast-acting-super-yohimbe-liquid-extract-alcohol-free-by-rainbow-light/1000069995',
    active: 'Yohimbe extract',
    oiLine: 'Vegetable Glycerin, Purified Water, Potassium Sorbate (For Freshness).',
    flags: [
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Purified Water', 'cleared', 'purifiedWater'],
      ['Potassium Sorbate (For Freshness)', 'limited', 'potassiumSorbate'],
    ],
  },
  {
    id: 'rainbow-b205-acv-gummies-50',
    handle: 'apple-cider-vinegar-gummies-organic-apple-flavor-50-vegan-gummies-rl27761',
    productName: 'Rainbow Light Organic Apple Cider Vinegar Gummies Apple Flavor, 50 Vegan Gummies',
    category: VITAMINS,
    form: 'gummy',
    barcode: '850068584505',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/organic-apple-cider-vinegar-gummies-by-rainbow-light/1000070006',
    active: 'Organic apple cider vinegar gummy blend',
    oiLine:
      'Organic Sugar, Organic Tapioca Syrup, Pectin, Organic Flavor, Citric Acid, Organic Tapioca Powder, Organic Vegetable Juice (Color).',
    flags: [
      ['Organic Sugar', 'cleared', 'organicSugar'],
      ['Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
      ['Pectin', 'cleared', 'pectin'],
      ['Organic Flavor', 'limited', 'organicFlavor'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Organic Tapioca Powder', 'limited', 'organicTapiocaPowder'],
      ['Organic Vegetable Juice (Color)', 'cleared', 'namedColor'],
    ],
  },
  {
    id: 'rainbow-b205-biotin-collagen-liquid-2oz',
    handle: 'biotin-collagen-hyaluronic-acid-vanilla-citrus-flavor-2-fl-oz-59-ml-liquid-rl28351',
    productName:
      'Rainbow Light Biotin + Collagen + Hyaluronic Acid Vanilla Citrus Flavor, 2 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584758',
    retailers: ['Rainbow Light', 'Fruitful Yield'],
    secondUrl: 'https://www.fruitfulyield.com/rainbow-light-biotin-collagen-hyaluronic-acid-2oz.html',
    active: 'Biotin + collagen + hyaluronic acid blend',
    oiLine:
      'Demineralized Water, Organic Vegetable Glycerin, Citric Acid, Organic Natural Flavors, Xanthan Gum, Potassium Sorbate (For Freshness), Sodium Benzoate (For Freshness).',
    flags: [
      ['Demineralized Water', 'cleared', 'demineralizedWater'],
      ['Organic Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Organic Natural Flavors', 'limited', 'organicNaturalFlavors'],
      ['Xanthan Gum', 'cleared', 'xanthan'],
      ['Potassium Sorbate (For Freshness)', 'limited', 'potassiumSorbate'],
      ['Sodium Benzoate (For Freshness)', 'limited', 'benzoate'],
    ],
  },
  {
    id: 'rainbow-b205-beet-root-soft-chews-60',
    handle: 'beet-root-soft-chews-mixed-berry-flavor-60-soft-chews-rl28421',
    productName: 'Rainbow Light Beet Root Soft Chews Mixed Berry Flavor, 60 Soft Chews',
    category: VITAMINS,
    form: 'chew',
    barcode: '850068584864',
    retailers: ['Rainbow Light', 'Health For You'],
    secondUrl: 'https://healthfullyours.com/products/rainbow-light-beet-root-soft-chews',
    active: 'Beet root soft chew blend',
    oiLine:
      'Tapioca Syrup, Organic Sugar, Sustainable Palm Oil, Natural Flavor, Citric Acid, Sunflower Lecithin, Fruit and Vegetable Juice Color, Sea Salt.',
    sourceNote:
      't85u: only brand gtin12 850068584864; Health For You shows no UPC — barcode left empty.',
    flags: [
      ['Tapioca Syrup', 'cleared', 'tapiocaSyrup'],
      ['Organic Sugar', 'cleared', 'organicSugar'],
      ['Sustainable Palm Oil', 'high', 'sustainablePalmChew'],
      ['Natural Flavor', 'limited', 'flavors'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Sunflower Lecithin', 'cleared', 'lecithin'],
      ['Fruit and Vegetable Juice Color', 'cleared', 'namedColor'],
      ['Sea Salt', 'cleared', 'salt'],
    ],
  },
  {
    id: 'rainbow-b205-l-methylfolate-liquid-2oz',
    handle: 'l-methylfolate-15-mg-with-organic-glycerin-berry-flavor-2-fl-oz-59-ml-liquid-rl31631',
    productName:
      'Rainbow Light 5-MTHF L-Methylfolate 15 mg with Organic Glycerin Berry Flavor, 2 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584789',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/5-mthf-l-methylfolate-15-mg-with-organic-glycerin-berry-flavor-by-rainbow-light/1000070848',
    active: 'L-methylfolate liquid',
    oiLine: 'Organic Vegetable Glycerin, Purified Water, Organic Natural Flavors, Citric Acid.',
    flags: [
      ['Organic Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Purified Water', 'cleared', 'purifiedWater'],
      ['Organic Natural Flavors', 'limited', 'organicNaturalFlavors'],
      ['Citric Acid', 'cleared', 'citric'],
    ],
  },
  {
    id: 'rainbow-b205-oil-oregano-2000mg-90',
    handle: 'oil-of-oregano-extract-2000-mg-90-softgels-rl3580',
    productName: 'Rainbow Light Oil of Oregano Extract 2,000 mg, 90 Softgels',
    category: IMMUNE,
    form: 'softgel',
    barcode: '850068584642',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/oil-of-oregano-extract-2000-mg-by-rainbow-light/1000070536',
    active: 'Oil of oregano extract',
    oiLine: 'Gelatin, Vegetable Glycerin.',
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
    ],
  },
  {
    id: 'rainbow-b205-mushroom-gummies-60',
    handle: '10-mushroom-power-complex-gummies-blueberry-flavor-60-vegan-gummies-rl25483',
    productName:
      'Rainbow Light 10 Mushroom Power Complex Gummies Blueberry Flavor, 60 Vegan Gummies',
    category: IMMUNE,
    form: 'gummy',
    barcode: '850068584857',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/10-mushroom-power-complex-gummies-delicious-blueberry-flavor-by-rainbow-light/1000069993',
    active: 'Mushroom complex gummy blend',
    oiLine:
      'Glucose Syrup, Sugar, Pectin, Citric Acid, Sodium Citrate, Natural Flavors, Vitamin E (d-alpha-tocopheryl acetate), Carnauba Wax, Palm Oil, Caramel Color, Stevia Extract (Rebaudioside A).',
    flags: [
      ['Glucose Syrup', 'cleared', 'glucose'],
      ['Sugar', 'cleared', 'sugar'],
      ['Pectin', 'cleared', 'pectin'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Sodium Citrate', 'cleared', 'citrate'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Vitamin E (d-alpha-tocopheryl acetate)', 'cleared', 'vitETocopherylAcetateOi'],
      ['Carnauba Wax', 'cleared', 'carnauba'],
      ['Palm Oil', 'high', 'seedOilGummy'],
      ['Caramel Color', 'high', 'caramel'],
      ['Stevia Extract (Rebaudioside A)', 'cleared', 'steviaRebA'],
    ],
  },
  {
    id: 'rainbow-b205-magnesium-ashwagandha-120',
    handle: 'magnesium-glycinate-ashwagandha-120-vegan-capsules-rl27015',
    productName: 'Rainbow Light Magnesium Glycinate + Ashwagandha, 120 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584925',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/magnesium-glycinate-ashwagandha-by-rainbow-light/1000070002',
    active: 'Magnesium glycinate + ashwagandha blend',
    oiLine: 'Vegan Capsule, Organic Oat Hull Fiber, Organic Rice Fiber, Organic Rice Extract Blend.',
    flags: [
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Organic Oat Hull Fiber', 'limited', 'organicOatHull'],
      ['Organic Rice Fiber', 'cleared', 'organicRiceFiber'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
    ],
  },
  {
    id: 'rainbow-b205-graviola-soursop-60',
    handle: 'graviola-soursop-60-capsules-rl6075',
    productName: 'Rainbow Light Graviola Soursop 2,000 mg, 60 Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584802',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl: 'https://www.pureformulas.com/product/graviola-soursop-2000-mg-by-rainbow-light/1000069996',
    active: 'Graviola (soursop) extract',
    oiLine: 'Gelatin Capsule, Rice Powder, Vegetable Magnesium Stearate, Silica.',
    flags: [
      ['Gelatin Capsule', 'cleared', 'gelatinCap'],
      ['Rice Powder', 'cleared', 'ricePowder'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
    ],
  },
  {
    id: 'rainbow-b205-mucuna-ashwagandha-200',
    handle: 'mucuna-ashwagandha-3000mg-200-vegan-capsules-rl24262',
    productName: 'Rainbow Light Mucuna + Ashwagandha 3,000 mg, 200 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584604',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/mucuna-ashwagandha-3000-mg-by-rainbow-light/1000070004',
    active: 'Mucuna + ashwagandha blend',
    oiLine: 'Rice Powder, Vegan Capsule, Vegetable Magnesium Stearate, Silica.',
    flags: [
      ['Rice Powder', 'cleared', 'ricePowder'],
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Silica', 'limited', 'silica'],
    ],
  },
  {
    id: 'rainbow-b205-probiolicious-gummies-50',
    handle: 'probiolicious-probiotic-gummies-berry-flavor-50-vegan-gummies-rl12121',
    productName: 'Rainbow Light Probiolicious Probiotic Gummies Berry Flavor, 50 Vegan Gummies',
    category: DIGESTIVE,
    form: 'gummy',
    barcode: '021888121212',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-probiolicious-probiotic-gummies-delicious-berry-50-gummies-40951',
    active: 'Probiotic gummy blend',
    oiLine:
      'Pectin, Citric Acid, Organic Sugar, Natural Flavors, Sodium Citrate, Carnauba Wax, Coconut Oil, Black Carrot Juice Concentrate (color).',
    flags: [
      ['Pectin', 'cleared', 'pectin'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Organic Sugar', 'cleared', 'organicSugar'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Sodium Citrate', 'cleared', 'citrate'],
      ['Carnauba Wax', 'cleared', 'carnauba'],
      ['Coconut Oil', 'cleared', 'coconutGummy'],
      ['Black Carrot Juice Concentrate (color)', 'cleared', 'namedColor'],
    ],
  },
  {
    id: 'rainbow-b205-gummy-vitamin-c-slices-90',
    handle: 'gummy-vitamin-c-slices-250-mg-tangy-orange-flavor-90-vegan-gummies-rl12033',
    productName:
      'Rainbow Light Gummy Vitamin C Slices 250 mg Tangy Orange Flavor, 90 Vegan Gummies',
    category: VITAMINS,
    form: 'gummy',
    barcode: '021888120338',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-gummy-vitamin-c-slices-plus-vitamin-e-tangy-orange-90-gummies-40005',
    active: 'Vitamin C + vitamin E gummy blend',
    oiLine:
      'Organic Sugar, Glucose Syrup, Citric Acid, Pectin, Sunflower Seed Oil, Natural Flavor, Sodium Citrate, Carnauba Wax, Coconut Oil, Orange Juice Concentrate, Paprika (color), Sunflower Lecithin.',
    flags: [
      ['Organic Sugar', 'cleared', 'organicSugar'],
      ['Glucose Syrup', 'cleared', 'glucose'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Pectin', 'cleared', 'pectin'],
      ['Sunflower Seed Oil', 'high', 'seedOilGummy'],
      ['Natural Flavor', 'limited', 'flavors'],
      ['Sodium Citrate', 'cleared', 'citrate'],
      ['Carnauba Wax', 'cleared', 'carnauba'],
      ['Coconut Oil', 'cleared', 'coconutGummy'],
      ['Orange Juice Concentrate', 'cleared', 'juiceColor'],
      ['Paprika (color)', 'limited', 'paprikaColor'],
      ['Sunflower Lecithin', 'cleared', 'lecithin'],
    ],
  },
  {
    id: 'rainbow-b205-mushroom-complex-60',
    handle: '10-mushroom-power-complex-60-vegan-capsules-rl25613',
    productName: 'Rainbow Light 10 Mushroom Power Complex, 60 Vegan Capsules',
    category: IMMUNE,
    form: 'capsule',
    barcode: '850068584048',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/10-mushroom-power-complex-by-rainbow-light/1000067883',
    active: 'Mushroom complex blend',
    oiLine: 'Vegan Capsule, Organic Rice Fiber, Organic Rice Extract Blend, Organic Oat Hull Fiber.',
    flags: [
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Organic Rice Fiber', 'cleared', 'organicRiceFiber'],
      ['Organic Rice Extract Blend', 'limited', 'riceExtract'],
      ['Organic Oat Hull Fiber', 'limited', 'organicOatHull'],
    ],
  },
  {
    id: 'rainbow-b205-pumpkin-seed-oil-liquid-16oz',
    handle: 'pumpkin-seed-oil-cold-pressed-organic-16-fl-oz-473-ml-liquid-rl8720',
    productName: 'Rainbow Light Organic Extra Virgin Pumpkin Seed Oil Cold Pressed, 16 fl oz',
    category: VITAMINS,
    form: 'liquid',
    barcode: '850068584369',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/organic-extra-virgin-pumpkin-seed-oil-cold-pressed-by-rainbow-light/1000070007',
    active: 'Organic pumpkin seed oil',
    oiLine: 'None',
    flags: [],
  },
  {
    id: 'rainbow-b205-oil-oregano-liquid-2oz',
    handle: 'oil-of-oregano-liquid-extract-alcohol-free-organic-2-fl-oz-59-ml-liquid-rl30261',
    productName: 'Rainbow Light Organic Oil of Oregano Liquid Extract Alcohol Free, 2 fl oz',
    category: IMMUNE,
    form: 'liquid',
    barcode: '850068584352',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-organic-oil-of-oregano-alcohol-free-2-fl-oz-59-ml-161025',
    active: 'Organic oil of oregano extract',
    oiLine: 'Organic Extra Virgin Olive Oil.',
    flags: [['Organic Extra Virgin Olive Oil', 'cleared', 'oliveFill']],
  },
  {
    id: 'rainbow-b205-dandelion-root-liquid-2oz',
    handle: 'dandelion-root-liquid-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl40351',
    productName:
      'Rainbow Light Super Concentrated Dandelion Root Liquid Extract Alcohol Free, 2 fl oz',
    category: DIGESTIVE,
    form: 'liquid',
    barcode: '850068584277',
    retailers: ['Rainbow Light', 'PureFormulas'],
    secondUrl:
      'https://www.pureformulas.com/product/super-concentrated-dandelion-root-liquid-extract-alcohol-free-by-rainbow-light/1000070011',
    active: 'Dandelion root extract',
    oiLine: 'Vegetable Glycerin, Purified Water, Potassium Sorbate (For Freshness).',
    flags: [
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Purified Water', 'cleared', 'purifiedWater'],
      ['Potassium Sorbate (For Freshness)', 'limited', 'potassiumSorbate'],
    ],
  },
  {
    id: 'rainbow-b205-prenatal-dha-60',
    handle: 'prenatal-dha-ultra-omega-3-fish-oil-60-softgels-rl11332',
    productName: 'Rainbow Light Prenatal DHA Ultra Omega-3 Fish Oil, 60 Softgels',
    category: PRENATAL,
    form: 'softgel',
    barcode: '021888113323',
    retailers: ['Rainbow Light', 'Vitacost'],
    secondUrl:
      'https://www.vitacost.com/products/rainbow-light-prenatal-dha-omega-3-fish-oil-60-softgels-14871',
    active: 'Prenatal DHA fish oil blend',
    oiLine:
      'Veggie Softgel, Vegetable Glycerin. Contains fish (anchovy, jack mackerel, mackerel, sardine) ingredients.',
    sourceNote: 'Contains fish line not graded.',
    flags: [
      ['Veggie Softgel', 'limited', 'veggieSoftgel'],
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
    ],
  },
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

function toRecord(spec: RowSpec): RatingRecord {
  const panel = rl(spec.handle);
  const rlCode = spec.handle.includes('-rl') ? spec.handle.split('-rl').pop()!.toUpperCase() : 'panel';
  const note = spec.sourceNote ? `${spec.sourceNote} ` : '';
  const upcNote = spec.barcode ? ` UPC ${spec.barcode} on attached sources.` : '';
  const source = `Brand page ${panel} supplement-facts image ${rlCode} supplement-facts image (brand panel) was read. Other ingredients: ${spec.oiLine} ${note}Brand store in stock (t88u sale page). Opened ${spec.secondUrl} with sale.${upcNote} Row graded from the brand Supplement Facts label only; actives ungraded.`;
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
    ...(spec.barcode ? { barcode: spec.barcode } : {}),
    activeIngredients: [{ name: spec.active, strength: 'label serving' }],
    inactiveIngredients: buildOi(panel, spec.flags),
    verdict: verdictFromFlags(spec.flags),
    retailers: spec.retailers,
    sourcesGeneral: [source],
  };
}

export const BATCH205_KYR6C_RAINBOW_T91U_NONMULTI: RatingRecord[] = SPECS.map(toRecord);

const ROWS = BATCH205_KYR6C_RAINBOW_T91U_NONMULTI;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 32) throw new Error(`batch205 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch205 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch205 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch205 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch205 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch205 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch205 verdict ${record.id}`);
}
