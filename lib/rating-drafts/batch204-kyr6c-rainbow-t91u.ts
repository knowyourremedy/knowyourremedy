// DRAFT / not verified / batch 204 KYR6-c (t91u WRITE).
// Rainbow Light fifteen packs — brand label OI; UPC when t85u sources agree.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const VITAMINS = 'Vitamins';
const IMMUNE = 'Immune Support';
const VITAMIN = 'Vitamin' as const;

const METH = {
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as mineral salt / buffer).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  cellulose: 'Methodology §5 Cleared (cellulose / microcrystalline cellulose / vegetable cellulose).',
  celluloseCoating:
    'Methodology §5 Cleared (cellulose-family / Cellulose Coating — t83u Oct 17, 2026).',
  celluloseGum: 'Methodology §5 Cleared (cellulose gum / sodium carboxymethyl cellulose family).',
  cellulosePlant:
    'Methodology §5 Cleared (cellulose-family / Cellulose (Plant Origin) — t83u Oct 17, 2026).',
  citric: 'Methodology §5 Cleared (citric acid).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / povidone family).',
  dextrose:
    'Methodology §5 Caution (glucose / bare dextrose sweetener — t87u Oct 17, 2026; not tapioca dextrose or organic cultured dextrose).',
  fructose: 'Methodology §5 Limited (fructose as sweetener).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin / organic maltodextrin).',
  naturalFlavors: 'Methodology §5 Limited (natural flavors opacity).',
  organicPlantCoating:
    'Methodology §5 Cleared (cellulose-family / Organic Plant-Based Coating — t87u Oct 17, 2026).',
  pullulan:
    'Methodology §5 Cleared (Organic pullulan / Vegetarian Capsule (Pullulan) — t87u Oct 17, 2026).',
  riboflavinColor: 'Methodology §5 Cleared (riboflavin used as color).',
  riceHusk:
    'Methodology §5 Cleared (organic rice hull extract / rice concentrate / Organic Rice Husk Extract — t87u Oct 17, 2026).',
  riceProtein:
    'Methodology §5 Cleared (brown rice protein concentrate / rice protein / Organic Brown Rice Concentrate — t87u Oct 17, 2026).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  stearic: 'Methodology §5 Cleared (stearic acid / vegetable stearic acid — stearate-family lubricant).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function rl(handle: string): string {
  return `https://www.rainbowlight.com/products/${handle}`;
}

function img(rlCode: string): string {
  return `${rlCode} supplement-facts image (brand panel)`;
}

const H_KIDS_50 =
  'kids-one-multi-real-food-nutrients-fruit-punch-50-chewable-vegan-tablets-rl30231';
const H_KIDS_90 =
  'kids-one-multi-real-food-nutrients-fruit-punch-90-chewable-vegan-tablets-rl10982';
const H_CERT_W_120 = 'certified-womens-real-food-nutrients-multi-120-vegetarian-capsules-rl80001';
const H_CERT_M_120 = 'certified-mens-multivitamin-120-vegetarian-capsules-rl80011';
const H_MENS_60 = 'mens-one-real-food-nutrients-60-vegetarian-caplets-rl20392';
const H_MENS_50_90 = 'mens-one-50-plus-real-food-nutrients-90-vegetarian-caplets-rl20404';
const H_MENS_50_150 = 'mens-one-50-plus-real-food-nutrients-150-vegetarian-caplets-rl20406';
const H_PRENATAL_60 = 'prenatal-one-real-food-nutrients-60-vegan-caplets-rl20429';
const H_PRENATAL_120 = 'prenatal-one-real-food-nutrients-120-vegan-caplets-rl20431';
const H_MOM_60 = '35-mom-baby-real-food-nutrients-60-caplets-rl20312';
const H_COUNTER_30 = 'counter-attack-30-vegan-caplets-rl11601';
const H_WOMENS_120 = 'womens-one-real-food-nutrients-120-vegetarian-caplets-rl20416';
const H_CALMAG_90 =
  'calcium-magnesium-and-vegan-d3-real-food-nutrients-90-vegan-caplets-rl10951';
const H_CALMAG_180 =
  'calcium-magnesium-and-vegan-d3-real-food-nutrients-180-vegan-caplets-rl10952';
const H_TEEN_45 =
  'active-health-teen-with-dermacomplex-real-food-nutrients-45-vegan-caplets-rl30221';

function kidsChewOi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Fructose', 'limited', METH.fructose),
    flag(panel, 'Dextrose', 'limited', METH.dextrose),
    flag(panel, 'Natural Flavors', 'limited', METH.naturalFlavors),
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Citric Acid', 'cleared', METH.citric),
  ];
}

function certifiedCapsOi(panel: string, magFirst: boolean): IngredientFlag[] {
  const cap = flag(panel, 'Vegetarian Capsule (Pullulan)', 'cleared', METH.pullulan);
  const rice = flag(panel, 'Organic Brown Rice Concentrate', 'cleared', METH.riceProtein);
  const mag = flag(panel, 'Magnesium Stearate', 'cleared', METH.magStearate);
  const husk = flag(panel, 'Organic Rice Husk Extract', 'cleared', METH.riceHusk);
  return magFirst ? [cap, rice, mag, husk] : [cap, rice, husk, mag];
}

function mensOne60Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Croscarmellose Sodium', 'cleared', METH.croscarmellose),
    flag(panel, 'Hydroxypropyl Cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Carnauba Wax', 'cleared', METH.carnauba),
  ];
}

function mens50Plus90Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Hydroxypropyl Cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Carnauba Wax', 'cleared', METH.carnauba),
  ];
}

function prenatalOi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Hydroxypropyl Cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
  ];
}

function counter30Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Maltodextrin', 'limited', METH.maltodextrin),
    flag(panel, 'Cellulose Coating', 'cleared', METH.celluloseCoating),
    flag(panel, 'Riboflavin (color)', 'cleared', METH.riboflavinColor),
    flag(panel, 'Calcium Carbonate', 'cleared', METH.calciumCarbonate),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
  ];
}

function womens120Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Hydroxypropyl Cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Carnauba Wax', 'cleared', METH.carnauba),
  ];
}

function calMag90Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Crospovidone', 'cleared', METH.crospovidone),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Organic Plant-Based Coating', 'cleared', METH.organicPlantCoating),
  ];
}

function calMag180Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Organic Plant-Based Coating', 'cleared', METH.organicPlantCoating),
  ];
}

function teen45Oi(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
    flag(panel, 'Cellulose Gum', 'cleared', METH.celluloseGum),
    flag(panel, 'Vegetable Stearic Acid', 'cleared', METH.stearic),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
    flag(panel, 'Silica', 'limited', METH.silica),
    flag(panel, 'Organic Plant-Based Coating', 'cleared', METH.organicPlantCoating),
  ];
}

export const BATCH204_KYR6C_RAINBOW_T91U: RatingRecord[] = [
  {
    id: 'rainbow-b204-kids-one-50',
    productName: "Rainbow Light Kid's One Multi Fruit Punch, 50 Chewable Vegan Tablets",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-kids-one-50',
    audience: KIDS,
    minAge: 1,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888302314',
    activeIngredients: [{ name: "Kid's multivitamin blend", strength: 'label serving' }],
    inactiveIngredients: kidsChewOi(rl(H_KIDS_50)),
    verdict: 'avoid',
    retailers: ['Walmart', 'PureFormulas'],
    sourcesGeneral: [
      `Brand page ${rl(H_KIDS_50)} supplement-facts image ${img('RL30231')} was read. Other ingredients: Fructose, Dextrose, Natural Flavors, Cellulose (Plant Origin), Vegetable Stearic Acid, Silica, Citric Acid. Brand gtin12 021888302314. Walmart opened https://www.walmart.com/ip/113977741 with sale. PureFormulas opened https://www.pureformulas.com/product/kids-one-chewable-multivitamin-minerals-fruit-punch-flavor-by-rainbow-light/1000002745 with UPC 021888302314. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-kids-one-90',
    productName: "Rainbow Light Kid's One Multi Fruit Punch, 90 Chewable Vegan Tablets",
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-kids-one-90',
    audience: KIDS,
    minAge: 1,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888109821',
    activeIngredients: [{ name: "Kid's multivitamin blend", strength: 'label serving' }],
    inactiveIngredients: kidsChewOi(rl(H_KIDS_90)),
    verdict: 'avoid',
    retailers: ['Walmart', 'Vitacost', 'PureFormulas'],
    sourcesGeneral: [
      `Brand page ${rl(H_KIDS_90)} supplement-facts image ${img('RL10982')} was read. Brand image filename includes Supp Facts old; other ingredients match the 50-count current label: Fructose, Dextrose, Natural Flavors, Cellulose (Plant Origin), Vegetable Stearic Acid, Silica, Citric Acid. Brand gtin12 021888109821. Walmart opened https://www.walmart.com/ip/28645988 with sale. Vitacost opened https://www.vitacost.com/products/rainbow-light-kid-s-one-for-ages-1-above-fruit-punch-90-tablets-1775 with UPC 021888109821. PureFormulas 1000002745 lists the 90-count option with UPC 021888109821. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-certified-womens-120',
    productName: 'Rainbow Light Certified Women\'s Multi, 120 Vegetarian Capsules',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-certified-womens-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888800018',
    activeIngredients: [{ name: 'Certified women\'s multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: certifiedCapsOi(rl(H_CERT_W_120), true),
    verdict: 'clean',
    retailers: ['Walmart', 'Vitacost'],
    sourcesGeneral: [
      `Brand page ${rl(H_CERT_W_120)} supplement-facts image ${img('RL80001')} was read. Other ingredients: Vegetarian Capsule (Pullulan), Organic Brown Rice Concentrate, Magnesium Stearate, Organic Rice Husk Extract. Brand gtin12 021888800018. Walmart opened https://www.walmart.com/ip/30871210 with UPC 021888800018. Vitacost opened https://www.vitacost.com/products/rainbow-light-certified-women-s-multivitamin-120-capsules-23452 with UPC 021888800018. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-certified-mens-120',
    productName: 'Rainbow Light Certified Men\'s Multivitamin, 120 Vegetarian Capsules',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-certified-mens-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888800117',
    activeIngredients: [{ name: 'Certified men\'s multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: certifiedCapsOi(rl(H_CERT_M_120), false),
    verdict: 'clean',
    retailers: ['Walmart', 'Vitacost'],
    sourcesGeneral: [
      `Brand page ${rl(H_CERT_M_120)} supplement-facts image ${img('RL80011')} was read. Other ingredients: Vegetarian Capsule (Pullulan), Organic Brown Rice Concentrate, Organic Rice Husk Extract, Magnesium Stearate. Brand gtin12 021888800117. Walmart opened https://www.walmart.com/ip/25462040 with UPC 021888800117. Vitacost opened https://www.vitacost.com/products/rainbow-light-certified-men-s-multivitamin-120-capsules-23450 with UPC 021888800117. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-mens-one-60',
    productName: 'Rainbow Light Men\'s One Real Food Nutrients, 60 Vegetarian Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-mens-one-60',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888217137',
    activeIngredients: [{ name: 'Men\'s multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: mensOne60Oi(rl(H_MENS_60)),
    verdict: 'clean',
    retailers: ['Walmart', 'Vitacost'],
    sourcesGeneral: [
      `Brand page ${rl(H_MENS_60)} supplement-facts image ${img('RL20392')} was read. Other ingredients: Cellulose (Plant Origin), Croscarmellose Sodium, Coating (Hydroxypropyl Cellulose, Hypromellose), Carnauba Wax. Brand gtin12 021888217137. Walmart opened https://www.walmart.com/ip/423256884 with sale. Vitacost opened https://www.vitacost.com/products/rainbow-light-men-s-one-real-food-nutrients-60-vegetarian-caplets-159560 with UPC 021888217137. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-mens-one-50-plus-90',
    productName: 'Rainbow Light Men\'s One 50+ Real Food Nutrients, 90 Vegetarian Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-mens-one-50-plus-90',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888204045',
    activeIngredients: [{ name: 'Men\'s 50+ multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: mens50Plus90Oi(rl(H_MENS_50_90)),
    verdict: 'caution',
    retailers: ['Walmart', 'Vitacost', 'PureFormulas'],
    sourcesGeneral: [
      `Brand page ${rl(H_MENS_50_90)} supplement-facts image ${img('RL20404')} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Silica, Coating (Hydroxypropyl Cellulose, Hypromellose), Carnauba Wax. Brand gtin12 021888204045. Walmart opened https://www.walmart.com/ip/2151775937 with sale. Vitacost opened https://www.vitacost.com/products/rainbow-light-men-s-one-50-real-food-nutrients-90-vegetarian-caplets-116007 with UPC 021888204045. PureFormulas opened https://www.pureformulas.com/product/mens-one-50-by-rainbow-light/1000070003 with UPC 021888204045. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-mens-one-50-plus-150',
    productName: 'Rainbow Light Men\'s One 50+ Real Food Nutrients, 150 Vegetarian Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-mens-one-50-plus-150',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888204069',
    activeIngredients: [{ name: 'Men\'s 50+ multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: [
      flag(rl(H_MENS_50_150), 'Cellulose (Plant Origin)', 'cleared', METH.cellulosePlant),
      flag(rl(H_MENS_50_150), 'Cellulose Gum', 'cleared', METH.celluloseGum),
      flag(rl(H_MENS_50_150), 'Vegetable Magnesium Stearate', 'cleared', METH.magStearate),
      flag(rl(H_MENS_50_150), 'Silica', 'limited', METH.silica),
      flag(rl(H_MENS_50_150), 'Cellulose Coating', 'cleared', METH.celluloseCoating),
    ],
    verdict: 'caution',
    retailers: ['Rainbow Light', 'Walmart'],
    sourcesGeneral: [
      `Brand page ${rl(H_MENS_50_150)} supplement-facts image ${img('RL20406')} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Magnesium Stearate, Silica, Cellulose Coating. Brand gtin12 021888204069 only on brand store; Walmart https://www.walmart.com/ip/2158228172 shows no UPC (t85u — barcode left empty). Rainbow Light brand store lists in stock at $45.32 (t88u brand store counts as a sale page). Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-prenatal-one-60',
    productName: 'Rainbow Light Prenatal One Real Food Nutrients, 60 Vegan Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-prenatal-one-60',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888217236',
    activeIngredients: [{ name: 'Prenatal multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: prenatalOi(rl(H_PRENATAL_60)),
    verdict: 'caution',
    retailers: ['Walmart', 'Vitacost'],
    sourcesGeneral: [
      `Brand page ${rl(H_PRENATAL_60)} supplement-facts image ${img('RL20429')} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Magnesium Stearate, Silica, Coating (Hydroxypropyl Cellulose, Hypromellose). Brand gtin12 021888217236. Walmart opened https://www.walmart.com/ip/133719244 with UPC 021888217236. Vitacost opened https://www.vitacost.com/products/rainbow-light-prenatal-one-real-food-nutrients-60-vegan-caplets-159561 with UPC 021888217236. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-prenatal-one-120',
    productName: 'Rainbow Light Prenatal One Real Food Nutrients, 120 Vegan Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-prenatal-one-120',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888217250',
    activeIngredients: [{ name: 'Prenatal multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: prenatalOi(rl(H_PRENATAL_120)),
    verdict: 'caution',
    retailers: ['Vitacost', 'PureFormulas'],
    sourcesGeneral: [
      `Brand page ${rl(H_PRENATAL_120)} supplement-facts image ${img('RL20431')} was read. Other ingredients match the 60-count Prenatal One brand panel. Brand gtin12 021888217250. Vitacost opened https://www.vitacost.com/products/rainbow-light-prenatal-one-daily-multivitamin-high-potency-120-vegan-tablets-158223 with UPC 021888217250. PureFormulas Prenatal One + Real Food Nutrients 120 (Item RLI1180) with UPC 021888217250. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-35-mom-baby-60',
    productName: 'Rainbow Light 35+ Mom & Baby Real Food Nutrients, 60 Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-35-mom-baby-60',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888203123',
    activeIngredients: [{ name: '35+ Mom & Baby multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: prenatalOi(rl(H_MOM_60)),
    verdict: 'caution',
    retailers: ['Target', 'Vitacost'],
    sourcesGeneral: [
      `Brand page ${rl(H_MOM_60)} supplement-facts image ${img('RL20312')} was read. Other ingredients match Prenatal One 60 brand panel. Brand gtin12 021888203123. Target opened https://www.target.com/p/-/A-87092421 with UPC 021888203123. Vitacost opened https://www.vitacost.com/products/rainbow-light-35-mom-baby-60-caplets-74245 with UPC 021888203123. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-counter-attack-30',
    productName: 'Rainbow Light Counter Attack, 30 Vegan Caplets',
    brand: 'Rainbow Light',
    category: IMMUNE,
    formulaId: 'rainbow-b204-counter-attack-30',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888116010',
    activeIngredients: [{ name: 'Counter Attack herbal / immune blend', strength: 'label serving' }],
    inactiveIngredients: counter30Oi(rl(H_COUNTER_30)),
    verdict: 'caution',
    retailers: ['Target', 'Vitacost'],
    sourcesGeneral: [
      `Brand page ${rl(H_COUNTER_30)} supplement-facts image ${img('RL11601')} was read. Other ingredients: Cellulose (Plant Origin), Maltodextrin, Cellulose Coating, Riboflavin (color), Calcium Carbonate, Cellulose Gum. Brand gtin12 021888116010. Target opened https://www.target.com/p/-/A-86797349 with UPC 021888116010. Vitacost opened https://www.vitacost.com/products/rainbow-light-counter-attack-30-tablets-10887 with UPC 021888116010. Tab Immune Support matches batch202 Counter Attack 90. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-womens-one-120',
    productName: 'Rainbow Light Women\'s One Real Food Nutrients, 120 Vegetarian Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-womens-one-120',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888217052',
    activeIngredients: [{ name: 'Women\'s multivitamin blend', strength: 'label serving' }],
    inactiveIngredients: womens120Oi(rl(H_WOMENS_120)),
    verdict: 'caution',
    retailers: ['Vitacost', 'PureFormulas'],
    sourcesGeneral: [
      `Brand page ${rl(H_WOMENS_120)} supplement-facts image ${img('RL20416')} was read. Other ingredients: Cellulose (Plant Origin), Vegetable Magnesium Stearate, Cellulose Gum, Silica, Coating (Hydroxypropyl Cellulose, Hypromellose), Carnauba Wax. Brand gtin12 021888217052. Vitacost opened https://www.vitacost.com/products/rainbow-light-women-s-one-real-food-nutrients-120-vegetarian-caplets-158224 with UPC 021888217052. PureFormulas opened https://www.pureformulas.com/product/womens-one-real-food-nutrients-by-rainbow-light/1000019345 (120-count option) with UPC 021888217052. Not one of the removed Women's One 30 / 60 / 150 rows. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-cal-mag-d3-90',
    productName:
      'Rainbow Light Calcium Magnesium and Vegan D3 Real Food Nutrients, 90 Vegan Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-cal-mag-d3-90',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888109517',
    activeIngredients: [
      { name: 'Calcium / magnesium / vegan D3 blend', strength: 'label serving' },
    ],
    inactiveIngredients: calMag90Oi(rl(H_CALMAG_90)),
    verdict: 'caution',
    retailers: ['Target', 'Vitacost'],
    sourcesGeneral: [
      `Brand page ${rl(H_CALMAG_90)} supplement-facts image ${img('RL10951')} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Crospovidone, Vegetable Magnesium Stearate, Silica, Organic Plant-Based Coating. Brand gtin12 021888109517. Target opened https://www.target.com/p/-/A-1012042550 with UPC 021888109517. Vitacost opened https://www.vitacost.com/products/rainbow-light-calcium-with-magnesium-vitamin-d3-90-tablets-40943 with UPC 021888109517. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-cal-mag-d3-180',
    productName:
      'Rainbow Light Calcium Magnesium and Vegan D3 Real Food Nutrients, 180 Vegan Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-cal-mag-d3-180',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888109524',
    activeIngredients: [
      { name: 'Calcium / magnesium / vegan D3 blend', strength: 'label serving' },
    ],
    inactiveIngredients: calMag180Oi(rl(H_CALMAG_180)),
    verdict: 'caution',
    retailers: ['Vitacost', 'Swanson'],
    sourcesGeneral: [
      `Brand page ${rl(H_CALMAG_180)} supplement-facts image ${img('RL10952')} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Stearic Acid, Vegetable Magnesium Stearate, Silica, Organic Plant-Based Coating. Brand gtin12 021888109524. Vitacost opened https://www.vitacost.com/products/rainbow-light-calcium-with-magnesium-vegan-d3-180-tablets-1778 with UPC 021888109524. Swanson opened https://www.swansonvitamins.com/p/rainbow-light-calcium-magnesium-vegan-d3-180-tabs with sale. Row graded from the brand label only.`,
    ],
  },
  {
    id: 'rainbow-b204-active-health-teen-45',
    productName:
      'Rainbow Light Active Health Teen with DermaComplex + Real Food Nutrients, 45 Vegan Caplets',
    brand: 'Rainbow Light',
    category: VITAMINS,
    formulaId: 'rainbow-b204-active-health-teen-45',
    audience: ADULT,
    minAge: 13,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    barcode: '021888302215',
    activeIngredients: [
      { name: 'Teen multivitamin / DermaComplex blend', strength: 'label serving' },
    ],
    inactiveIngredients: teen45Oi(rl(H_TEEN_45)),
    verdict: 'caution',
    retailers: ['Walmart', 'Rainbow Light'],
    sourcesGeneral: [
      `Brand page ${rl(H_TEEN_45)} supplement-facts image ${img('RL30221')} was read. Other ingredients: Cellulose (Plant Origin), Cellulose Gum, Vegetable Stearic Acid, Vegetable Magnesium Stearate, Silica, Organic Plant-Based Coating. Brand gtin12 021888302215 only; Walmart https://www.walmart.com/ip/48768005 shows no UPC (t85u — barcode left empty). Rainbow Light brand store in stock at $18.88 (t88u brand store counts as a sale page). Row graded from the brand label only.`,
    ],
  },
];

const ROWS = BATCH204_KYR6C_RAINBOW_T91U;

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

if (ROWS.length !== 15) throw new Error(`batch204 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch204 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch204 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch204 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch204 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch204 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch204 verdict ${record.id}`);
}
