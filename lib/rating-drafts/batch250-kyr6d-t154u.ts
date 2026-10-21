// DRAFT / not verified / batch 250 KYR6-d. Does not repeat rows from 796, 805, or 806.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  carmine: 'Methodology §5 Caution (carmine / cochineal — insect red color; allergy in sensitive people).',
  carob: 'Methodology §5 Caution (Carob — color in a softgel; Carob Extract row, not Cleared carob powder-as-food).',
  annatto: 'Methodology §5 Caution (annatto — named color).',
  spirulina:
    'Methodology §5 Caution (spirulina extract as other-ingredient color — Sept 21, 2026; not Cleared spirulina (color)).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate — phosphate-salt filler).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  hpmc: 'Methodology §5 Cleared (Hydroxypropyl Methylcellulose — t102u HPMC / hypromellose family).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPC; HPMC family).',
  glycerin: 'Methodology §5 Cleared (glycerin / glycerine).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose-family disintegrant).',
  fos: 'Methodology §5 Cleared (fructooligosaccharides — fiber family with inulin).',
  gelatin: 'Methodology §5 Cleared (gelatin — capsule base).',
  sunflower:
    'Methodology §5 Cleared (sunflower oil as softgel fill — not the gummy seed-oil High).',
  riceBranOil:
    'Methodology §5 Cleared (rice bran oil as softgel fill — not the gummy seed-oil High).',
  water: 'Methodology §5 Cleared (water / purified water).',
  lecithin: 'Methodology §5 Cleared (sunflower lecithin — named lecithin).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax — wax row).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_MENO =
  'AZO brand page https://azoproducts.com/products/azo-daily-menopause-support-plus-vitamin-d-tablets (30 tablets, available), iHerb in stock, and Vitacost UPC 787651760605. Same other-ingredient line. Target TCIN 94742526 lists pickup and delivery. The 60-count is a 2-pack';
const PANEL_SOFT =
  'AZO brand page https://azoproducts.com/products/azo-cranberry-softgels-120ct (120 softgels, for sale) and Walmart item 515931297, 120 count, sold by Walmart.com, in stock. Brand barcode and the Walmart SKU field are UPC 787651760230';
const PANEL_CAP =
  'Thrifty White in stock and Drug Supply Store add-to-cart, both UPC 037000405115, ingredients psyllium husk and gelatin. Target TCIN 14830652 lists the 160-count with pickup and delivery. Dubois Drug lists the same UPC as available';
const PANEL_DUAL =
  'AZO brand page https://azoproducts.com/products/azo-dual-protection (30 capsules) and iHerb in stock, UPC 787651760285, same other-ingredient line';

const SOFT_NOTE =
  'Sunflower oil and rice bran oil are Not clean when they are the base of a gummy. That is the form this app flags. This product is a softgel. The oils are the fill that holds the cranberry, not a gummy you chew, so they did not pull this grade down.';

export const BATCH250_KYR6D_T154U: RatingRecord[] = [
  {
    id: 'azo-b250-menopause-d-30',
    productName: 'AZO Daily Menopause Support + Vitamin D (30 tablets)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b250-menopause-d-30',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760605',
    activeIngredients: [
      { name: 'Vitamin D (as cholecalciferol)', strength: '25 mcg' },
      { name: 'Genistein', strength: '30 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_MENO, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_MENO, 'Dicalcium phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_MENO, 'Stearic acid', 'cleared', 'stearic'),
      flag(PANEL_MENO, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_MENO, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PANEL_MENO, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
      flag(PANEL_MENO, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_MENO, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_MENO, 'Spirulina extract (color)', 'moderate', 'spirulina'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'iHerb', 'Vitacost', 'Target'],
    sourcesGeneral: [
      'Vitamin D and genistein are supplement-facts ingredients and are not graded. Spirulina extract as a color is Caution, so the row is Caution. It is not the Cleared spirulina (color) token. The 60-count is a 2-pack and is not a row. UPC 787651760605 check digit OK.',
    ],
  },
  {
    id: 'azo-b250-cranberry-softgel-120',
    productName: 'AZO Cranberry Softgels (120 softgels)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b250-cranberry-softgel-120',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760230',
    honestNote: SOFT_NOTE,
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '120 mg per 2 softgels' },
      { name: 'Pacran whole fruit cranberry', strength: '500 mg per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(PANEL_SOFT, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_SOFT, 'Sunflower oil', 'cleared', 'sunflower'),
      flag(PANEL_SOFT, 'Rice bran oil', 'cleared', 'riceBranOil'),
      flag(PANEL_SOFT, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_SOFT, 'Water', 'cleared', 'water'),
      flag(PANEL_SOFT, 'Sunflower lecithin', 'cleared', 'lecithin'),
      flag(PANEL_SOFT, 'Yellow beeswax', 'cleared', 'beeswax'),
      flag(PANEL_SOFT, 'Carob', 'moderate', 'carob'),
      flag(PANEL_SOFT, 'Carmine', 'moderate', 'carmine'),
      flag(PANEL_SOFT, 'Annatto', 'moderate', 'annatto'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'Walmart'],
    sourcesGeneral: [
      'Vitamin C and Pacran are supplement-facts ingredients and are not graded. Carob, carmine, and annatto are Caution, so the row is Caution. The brand says sunflower oil replaced soy. The 100-count is not this row. UPC 787651760230 check digit OK.',
    ],
  },
  {
    id: 'metamucil-b250-capsules-160',
    productName: 'Metamucil 3-in-1 Fiber Capsules (160 capsules)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b250-capsules-160',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '037000405115',
    activeIngredients: [{ name: 'Psyllium husk', strength: '2 g fiber per 5 capsules' }],
    inactiveIngredients: [flag(PANEL_CAP, 'Gelatin', 'cleared', 'gelatin')],
    verdict: 'clean',
    retailers: ['Thrifty White', 'Drug Supply Store', 'Target'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Gelatin is the only other ingredient, so the row is Clean. Thrifty White is in stock. Drug Supply Store shows add to cart for the same UPC and the same two-ingredient line. UPC 037000405115 check digit OK. The 340-count is not this row.',
    ],
  },
  {
    id: 'azo-b250-dual-protection-30',
    productName: 'AZO Dual Protection (30 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b250-dual-protection-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760285',
    activeIngredients: [
      { name: 'Intelliflora blend (four Lactobacillus strains)', strength: '150 mg / 5 billion CFU' },
      { name: 'PreforPro blend (bacteriophages)', strength: '15 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_DUAL, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_DUAL, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PANEL_DUAL, 'Fructooligosaccharides', 'cleared', 'fos'),
      flag(PANEL_DUAL, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_DUAL, 'Titanium dioxide (color)', 'high', 'tio2'),
      flag(PANEL_DUAL, 'Carmine (color)', 'moderate', 'carmine'),
    ],
    verdict: 'avoid',
    retailers: ['AZO', 'iHerb'],
    sourcesGeneral: [
      'The probiotic and prebiotic blends are supplement-facts ingredients and are not graded. Titanium dioxide is Avoid, so the row is Avoid. That is the European Union food ban, not a 3+ Limited stack. Carmine is Caution and does not change it. The 60-count variant barcode on the brand site is not a 12-digit UPC and is not this row. UPC 787651760285 check digit OK.',
    ],
  },
];

const ROWS = BATCH250_KYR6D_T154U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch250 row count ${ROWS.length}`);
for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch250 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (rollup.cause === 'limited_stack' && !record.honestNote?.includes('Limited')) {
    throw new Error(`batch250 missing stack note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch250 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch250 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch250 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
