// DRAFT / not verified / batch 271 KYR6-d (t41u Spring Valley batch 2, packs 11-30).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Held, not in this file: Biotin & Collagen Liquid 1 fl oz. The inactive line is cut off
// at xanthan gum, and the panel says 5,000 mcg biotin while the title and box say 15,000 mcg.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';

const METH = {
  potatoStarch: 'Methodology §5 Cleared (potato starch — named simple starch).',
  vegCap:
    'Methodology §5 Cleared (Vegetable capsule (hypromellose, gellan gum) — founder lock t118u).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid — ascorbate family; preservative use stays this row).',
  ricePowder: 'Methodology §5 Cleared (Rice Powder — founder lock t132u; distinct from Caution rice flour).',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  cellulosePlant:
    'Methodology §5 Cleared (Cellulose (Plant Origin) — cellulose-family; founder lock t83u).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  riceHull: 'Methodology §5 Cleared (Rice Hull — rice hulls / rice hull concentrate family; t119u / t120u).',
  riceBran: 'Methodology §5 Cleared (rice bran — rice bran plant-fiber family; t111u).',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup / tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin.',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  loHan: 'Methodology §5 Cleared (monk fruit / Lo Han Fruit Concentrate — mogroside sweetener).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity). Counts toward the t137u stack.',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — flavor family row). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  blackCarrot:
    'Methodology §5 Cleared (organic black carrot juice concentrate (color) — named fruit-or-vegetable juice concentrate as color).',
  carnauba: 'Methodology §5 Cleared (carnauba wax, including organic — founder lock t133u).',
  sunflowerGummy:
    'Methodology §5 High (organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  fractionatedCoconut:
    'Methodology §5 Cleared (fractionated coconut oil — named coconut oil; Cleared in a gummy and in a capsule; not the combined fractionated coconut and palm kernel oil Limited row).',
  xylitol:
    'Methodology §5 Caution (xylitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  celluloseGum: 'Methodology §5 Cleared (cellulose gum — cellulose family).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  modifiedTapioca:
    'Methodology §5 Limited (modified tapioca starch — Limited modified starch; Sept 23, 2026). Distinct from Cleared tapioca starch. Counts toward the t137u stack.',
  crospovidone: 'Methodology §5 Cleared (crospovidone — povidone family).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  beetRoot:
    'Methodology §5 Cleared (beet root / beetroot powder for color — Sept 22, 2026). Not a synthetic dye.',
  malic: 'Methodology §5 Cleared (malic acid — organic acid).',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  soybeanSoftgel:
    'Methodology §5 Cleared (soybean oil as softgel fill — non-gummy fill Cleared; gummy / lozenge soybean oil stays High).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose disintegrant).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPC / HPMC family).',
  triacetin: 'Methodology §5 Cleared (triacetin — coating plasticizer). Not triethyl citrate.',
  triethyl: 'Methodology §5 Cleared (triethyl citrate — coating plasticizer; locked Sept 15, 2026).',
  riceFlour:
    'Methodology §5 Caution (rice flour — distinct from Cleared rice hull and rice bran). Does not count toward the t137u stack.',
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup — food syrup).',
  water: 'Methodology §5 Cleared (purified water).',
  annatto:
    'Methodology §5 Caution (Annatto Seed Extract (color) — annatto row; t107u). Does not count toward the t137u stack.',
  mct:
    'Methodology §5 Limited (medium chain triglycerides in a gummy with no plant named — founder lock t132u). Counts toward the t137u stack.',
  gellan: 'Methodology §5 Cleared (gellan gum — xanthan / guar / pectin family).',
  polysorbate:
    'Methodology §5 Limited (Polysorbate 80 — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  tio2: 'Methodology §5 High (titanium dioxide (color)).',
  peg:
    'Methodology §5 Limited (polyethylene glycol — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P11 =
  'Walmart ip/18853361981 panel image. Page Ingredients says see label in store. t41u house-brand single source.';
const P12 = 'Walmart ip/9311021391 panel image. t41u house-brand single source.';
const P13 =
  'Walmart ip/382114592 panel image. Not the 100-count row springvalley-b237-acv-450-100. t41u house-brand single source.';
const P14 =
  'Walmart ip/528758997 panel image. Page text says Rice Hulls and Rice Extract. The panel says Rice Hull and Rice Bran. t41u house-brand single source.';
const P15 =
  'Walmart ip/978103814 panel image. Page text says Monk Fruit Extract and drops Organic on tapioca. The panel says Lo Han Fruit Concentrate. t41u house-brand single source.';
const P16 =
  'Walmart ip/755602460 panel image. New Look. Page order differs. t41u house-brand single source.';
const P17 =
  'Walmart ip/191721633 single 60-count selector on the 2-pack family page. Panel image. New Look. t41u house-brand single source.';
const P19 = 'Walmart ip/35912857 panel image. The 3-pack option is out of stock. The single is in stock. t41u house-brand single source.';
const P20 =
  'Walmart ip/10324942 panel image. New Look. Page says Glycerin. The panel says Vegetable Glycerin. t41u house-brand single source.';
const P21 =
  'Walmart ip/19367913481 panel image. Page text adds acetoglycerides, polyethylene glycol, and polysorbate 80 and is the older list. The panel was graded. t41u house-brand single source.';
const P22 = 'Walmart ip/767725784 panel image. t41u house-brand single source.';
const P23 = 'Walmart ip/5416414555 panel image. New Look. t41u house-brand single source.';
const P24 =
  'Walmart ip/374277722 single 60-count selector on the 3-pack family page. Panel image. New Look. t41u house-brand single source.';
const P25 =
  'Walmart ip/10534204 single 100-count selector on the 2-pack family page. Panel image. New Look. Key features say no artificial dyes. The panel lists titanium dioxide (color), and that color keeps the Avoid grade. t41u house-brand single source.';
const P26 =
  'Walmart ip/893246 panel image. New Look. Page text is an older list (glycerin, medium chain triglycerides, mineral oil, silica, sodium ascorbate, starch, sugar, tocopherol) and omits magnesium stearate. The panel was graded. Key features say no artificial dyes. Titanium dioxide (color) keeps the Avoid grade. t41u house-brand single source.';
const P27 =
  'Walmart ip/655254775 panel image. Page text omits magnesium stearate. The panel was graded. Key features say no artificial dyes. Titanium dioxide (color) keeps the Avoid grade. t41u house-brand single source.';
const P28 = 'Walmart ip/10416559 panel image. A partial barcode was not readable and was not used. t41u house-brand single source.';
const P29 =
  'Walmart ip/294685774 panel image. Page text blocks say Rice Extract, Rice Hulls, or Organic Rice Hull Concentrate. The panel says Rice Flour, Rice Bran, and Rice Hull. t41u house-brand single source.';
const P30 =
  'Walmart ip/635983643 panel image. New Look. Page Inactive says N/A. The panel was graded. Contains coconut is a disclosure, not a token. t41u house-brand single source.';

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'brand' | 'audience' | 'minAge' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  return finish({
    brand: BRAND,
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Walmart'],
    barcode: '',
    ...partial,
  });
}

export const BATCH271_KYR6D_T41U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b271-sleep-stress-probiotic-30',
    productName: 'Spring Valley All Ages Sleep and Stress Probiotic, 3 Billion CFU (30 vegetarian capsules)',
    category: 'Digestive',
    formulaId: 'springvalley-b271-sleep-stress-probiotic-30',
    form: 'capsule',
    activeIngredients: [
      {
        name: 'Probiotic Blend (Lactobacillus helveticus Rosell-52, Bifidobacterium longum Rosell-175)',
        strength: '37 mg (3 Billion CFU) per capsule',
      },
    ],
    inactiveIngredients: [
      flag(P11, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(P11, 'Vegetable Capsule (Hypromellose, Gellan Gum)', 'cleared', 'vegCap'),
      flag(P11, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P11, 'Ascorbic Acid (Preservative)', 'cleared', 'ascorbic'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. The probiotic blend is the active and is not graded. All other ingredients are Cleared. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-ala-200-100',
    productName: 'Spring Valley Alpha Lipoic Acid, 200 mg (100 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-ala-200-100',
    form: 'capsule',
    activeIngredients: [{ name: 'Alpha Lipoic Acid', strength: '200 mg per capsule' }],
    inactiveIngredients: [
      flag(P12, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(P12, 'Gelatin', 'cleared', 'gelatin'),
      flag(P12, 'Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'),
      flag(P12, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(P12, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. Alpha lipoic acid is the active and is not graded. Silica is the 0-pt Caution cap. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-acv-450-250',
    productName: 'Spring Valley Apple Cider Vinegar, 450 mg (250 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-acv-450-250',
    form: 'capsule',
    activeIngredients: [{ name: 'Apple Cider Vinegar Powder', strength: '450 mg per capsule' }],
    inactiveIngredients: [
      flag(P13, 'Gelatin', 'cleared', 'gelatin'),
      flag(P13, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(P13, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(P13, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. Not springvalley-b237-acv-450-100. Apple cider vinegar powder is the active and is not graded. Silica is the 0-pt Caution cap. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-ashwagandha-500-60',
    productName: 'Spring Valley Ashwagandha Root Powder, 500 mg (60 vegetarian capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-ashwagandha-500-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Organic Ashwagandha Root (Withania somnifera)', strength: '500 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P14, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P14, 'Rice Hull', 'cleared', 'riceHull'),
      flag(P14, 'Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. Page text says Rice Hulls and Rice Extract. The panel says Rice Hull and Rice Bran, and that panel was graded. Ashwagandha is the active and is not graded. The facility allergen line is not a token. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-ashwagandha-gummy-60',
    productName: 'Spring Valley Ashwagandha Gummies, Cherry (60 gummies)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-ashwagandha-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Calories', strength: '20 per 2 gummies' },
      { name: 'Total Carbohydrate', strength: '5 g per 2 gummies' },
      { name: 'Total Sugars', strength: '4 g per 2 gummies' },
      { name: 'Includes Added Sugars', strength: '4 g per 2 gummies' },
      { name: 'Vitamin B6 (as Pyridoxine Hydrochloride)', strength: '1.7 mg per 2 gummies' },
      { name: 'Vitamin B12 (as Methylcobalamin and Hydroxocobalamin)', strength: '2.4 mcg per 2 gummies' },
      { name: 'Sodium', strength: '20 mg per 2 gummies' },
      { name: 'KSM-66 Ashwagandha (Withania somnifera) (Root) Extract', strength: '300 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P15, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P15, 'Sugar', 'moderate', 'sugar'),
      flag(P15, 'Citric Acid', 'cleared', 'citric'),
      flag(P15, 'Lo Han Fruit Concentrate', 'cleared', 'loHan'),
      flag(P15, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P15, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'blackCarrot'),
      flag(P15, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P15, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P15, 'Pectin', 'cleared', 'pectin'),
      flag(P15, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. Page text says Monk Fruit Extract. The panel says Lo Han Fruit Concentrate, and that panel was graded. Ashwagandha and the vitamins are actives and are not graded. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. Sugar is Caution and does not stack. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-beet-root-1000-90',
    productName: 'Spring Valley Beet Root, 1,000 mg (90 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-beet-root-1000-90',
    form: 'capsule',
    activeIngredients: [{ name: 'Beet (Beta vulgaris) (root)', strength: '1,000 mg per 2 capsules' }],
    inactiveIngredients: [
      flag(P16, 'Gelatin Capsule', 'cleared', 'gelatin'),
      flag(P16, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(P16, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(P16, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel image is the single source. New Look. Page text lists Rice Powder before Gelatin. The panel says Gelatin Capsule, then Rice Powder. Beet root is the active and is not graded. Silica is the 0-pt Caution cap. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-beet-gummy-60',
    productName: 'Spring Valley Beet Root Gummies, Cherry, 500 mg (60 gummies)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-beet-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Calories', strength: '30 per 2 gummies' },
      { name: 'Total Carbohydrate', strength: '8 g per 2 gummies' },
      { name: 'Total Sugars', strength: '5 g per 2 gummies' },
      { name: 'Includes Added Sugars', strength: '5 g per 2 gummies' },
      { name: 'Vitamin B6 (as Pyridoxine Hydrochloride)', strength: '1.6 mg per 2 gummies' },
      { name: 'Folate (as Folic Acid)', strength: '265 mcg DFE per 2 gummies' },
      { name: 'Sodium', strength: '20 mg per 2 gummies' },
      { name: 'Beet (Beta vulgaris) Root Powder', strength: '500 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P17, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P17, 'Sugar', 'moderate', 'sugar'),
      flag(P17, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P17, 'Citric Acid', 'cleared', 'citric'),
      flag(P17, 'Fractionated Coconut Oil', 'cleared', 'fractionatedCoconut'),
      flag(P17, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P17, 'Pectin', 'cleared', 'pectin'),
      flag(P17, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. The single 60-count on Walmart ip/191721633 is the row. The 2-pack is not a row. Beet root and the vitamins are actives and are not graded. Counted Limited token: natural flavors. Sugar is Caution and does not stack. Fractionated coconut oil is Cleared in the gummy, and that form split is the honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-biotin-10000-fast-60',
    productName: 'Spring Valley Biotin 10,000 mcg Fast-Dissolve (60 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-biotin-10000-fast-60',
    form: 'tablet',
    activeIngredients: [{ name: 'Biotin', strength: '10,000 mcg per tablet' }],
    inactiveIngredients: [
      flag(P19, 'Xylitol', 'moderate', 'xylitol'),
      flag(P19, 'Cellulose Gum', 'cleared', 'celluloseGum'),
      flag(P19, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P19, 'Silicon Dioxide', 'limited', 'silica'),
      flag(P19, 'Modified Tapioca Starch', 'limited', 'modifiedTapioca'),
      flag(P19, 'Natural Flavor', 'moderate', 'natFlavor'),
      flag(P19, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P19, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P19, 'Beet Root', 'cleared', 'beetRoot'),
      flag(P19, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P19, 'Malic Acid', 'cleared', 'malic'),
      flag(P19, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. Not springvalley-b232-biotin-keratin-60. Biotin is the active and is not graded. Avoid from three Limited tokens: maltodextrin, modified tapioca starch, and sucralose. Xylitol and natural flavor are Caution and do not stack. Silicon dioxide is the 0-pt Caution cap and does not stack. The 3-pack is out of stock and is not a row. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-biotin-1000-150',
    productName: 'Spring Valley Biotin, 1,000 mcg (150 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-biotin-1000-150',
    form: 'softgel',
    activeIngredients: [{ name: 'Biotin (as d-Biotin)', strength: '1,000 mcg per softgel' }],
    inactiveIngredients: [
      flag(P20, 'Soybean Oil', 'cleared', 'soybeanSoftgel'),
      flag(P20, 'Gelatin', 'cleared', 'gelatin'),
      flag(P20, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P20, 'Yellow Beeswax', 'cleared', 'beeswax'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 2. Walmart panel image is the single source. New Look. Page text says Glycerin. The panel says Vegetable Glycerin. Biotin is the active and is not graded. Soybean oil is Cleared softgel fill, and that form split is the honest note. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-blood-fortifier-60',
    productName: 'Spring Valley Blood Fortifier with Iron (60 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-blood-fortifier-60',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin C', strength: '15 mg per tablet' },
      { name: 'Folate', strength: '680 mcg DFE per tablet' },
      { name: 'Vitamin B12', strength: '30 mcg per tablet' },
      { name: 'Iron', strength: '26 mg per tablet' },
      { name: 'Organic Beet Root Powder', strength: '125 mg per tablet' },
      {
        name: 'Organic Whole-Food Blend (Organic Broccoli (florets) Powder, Organic Orange Juice (fruit) Powder, Organic Rice Flour)',
        strength: '30 mg per tablet',
      },
    ],
    inactiveIngredients: [
      flag(P21, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P21, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P21, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P21, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P21, 'Hydroxypropyl Cellulose', 'cleared', 'hpc'),
      flag(P21, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P21, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P21, 'Silica', 'limited', 'silica'),
      flag(P21, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P21, 'Triacetin', 'cleared', 'triacetin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel image is the single source. Page text adds acetoglycerides, polyethylene glycol, and polysorbate 80. That older list was not graded. Iron, vitamin C, folate, vitamin B12, beet root powder, and the whole-food blend are actives and are not graded. Silica is the 0-pt Caution cap. Counted Limited tokens: none. Missing UPC. The lot code was not used as a UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-blood-pressure-60',
    productName: 'Spring Valley Blood Pressure Support (60 vegetarian capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-blood-pressure-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Grape Seed Extract (MegaNatural-BP)', strength: '150 mg per capsule' },
      { name: 'Hawthorn Extract (leaf and flower)', strength: '300 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P22, 'Hypromellose (Cellulose Capsule)', 'cleared', 'hpmc'),
      flag(P22, 'Rice Flour', 'moderate', 'riceFlour'),
      flag(P22, 'Magnesium Stearate (Vegetable Source)', 'cleared', 'vegMagStearate'),
      flag(P22, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. Grape seed extract and hawthorn extract are the actives and are not graded. Rice flour is Caution and does not stack. Silicon dioxide is the 0-pt Caution cap and does not stack. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-brain-omega3-gummy-60',
    productName: 'Spring Valley Brain Omega-3 from Algal Oil Gummy (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-brain-omega3-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Calories', strength: '25 per 2 gummies' },
      { name: 'Total Fat', strength: '1 g per 2 gummies' },
      { name: 'Saturated Fat', strength: '1 g per 2 gummies' },
      { name: 'Total Carbohydrate', strength: '4 g per 2 gummies' },
      { name: 'Total Sugars', strength: '4 g per 2 gummies' },
      { name: 'Includes Added Sugars', strength: '4 g per 2 gummies' },
      { name: 'Sodium', strength: '10 mg per 2 gummies' },
      { name: 'Omega-3 DHA (Schizochytrium sp.)', strength: '250 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P23, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(P23, 'Sugar', 'moderate', 'sugar'),
      flag(P23, 'Purified Water', 'cleared', 'water'),
      flag(P23, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(P23, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P23, 'Citric Acid', 'cleared', 'citric'),
      flag(P23, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P23, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P23, 'Pectin', 'cleared', 'pectin'),
      flag(P23, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. New Look. Algal oil supplies the DHA active and is not graded. Counted Limited tokens: medium chain triglycerides and natural flavors. That is two, so this is not a 3+ stack. Sugar and annatto seed extract (color) are Caution and do not stack. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-brain-memory-60',
    productName: 'Spring Valley Brain Performance Memory Support (60 vegetarian capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-brain-memory-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Total Carbohydrate', strength: '1 g per 2 capsules' },
      { name: 'Sodium', strength: '15 mg per 2 capsules' },
      { name: 'BaCognize (Bacopa monnieri) (whole herb) Extract', strength: '300 mg per 2 capsules' },
      { name: 'Ginkgo Biloba (leaf) Extract', strength: '120 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag(P24, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P24, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P24, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(P24, 'Gellan Gum', 'cleared', 'gellan'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. The single 60-count on Walmart ip/374277722 is the row. The 3-pack is not a row. Bacopa extract and ginkgo extract are the actives and are not graded. Counted Limited token: maltodextrin. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-calcium-600-100',
    productName: 'Spring Valley Calcium, 600 mg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-calcium-600-100',
    form: 'tablet',
    activeIngredients: [{ name: 'Calcium', strength: '600 mg per tablet' }],
    inactiveIngredients: [
      flag(P25, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P25, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P25, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P25, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P25, 'Polysorbate 80', 'limited', 'polysorbate'),
      flag(P25, 'Titanium Dioxide (Color)', 'high', 'tio2'),
      flag(P25, 'Triethyl Citrate', 'cleared', 'triethyl'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 2. The single 100-count on Walmart ip/10534204 is the row. The 2-pack is not a row. Calcium carbonate supplies the calcium active and is not graded. Avoid from titanium dioxide (color). Counted Limited tokens: maltodextrin and polysorbate 80. That is two, so this is not a 3+ stack. Key features say no artificial dyes. The panel lists titanium dioxide (color), and that color received the Avoid grade, so the claim is not an honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-calcium-d3-600-100',
    productName: 'Spring Valley Calcium Plus Vitamin D, 600 mg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-calcium-d3-600-100',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin D', strength: '20 mcg (800 IU) per tablet' },
      { name: 'Calcium', strength: '600 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P26, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P26, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P26, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P26, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P26, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P26, 'Polysorbate 80', 'limited', 'polysorbate'),
      flag(P26, 'Titanium Dioxide (Color)', 'high', 'tio2'),
      flag(P26, 'Triethyl Citrate', 'cleared', 'triethyl'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 2. Walmart panel image is the single source. Not the 150 mini softgels and not the 250-count tablet. Page text is an older list and was not graded. Calcium carbonate and cholecalciferol are the actives and are not graded. Avoid from titanium dioxide (color). Counted Limited tokens: maltodextrin and polysorbate 80. That is two, so this is not a 3+ stack. The no-artificial-dyes claim did not change that grade, so there is no honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-calcium-d3-600-500',
    productName: 'Spring Valley Calcium Plus Vitamin D, 600 mg (500 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-calcium-d3-600-500',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin D', strength: '20 mcg (800 IU) per tablet' },
      { name: 'Calcium', strength: '600 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P27, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P27, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P27, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P27, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P27, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P27, 'Polysorbate 80', 'limited', 'polysorbate'),
      flag(P27, 'Titanium Dioxide (Color)', 'high', 'tio2'),
      flag(P27, 'Triethyl Citrate', 'cleared', 'triethyl'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 2. Walmart panel image is the single source. Not the 100-count. Page text omits magnesium stearate. The panel includes it and was graded. Calcium carbonate and cholecalciferol are the actives and are not graded. Avoid from titanium dioxide (color). Counted Limited tokens: maltodextrin and polysorbate 80. That is two, so this is not a 3+ stack. The no-artificial-dyes claim did not change that grade, so there is no honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-cayenne-455-100',
    productName: 'Spring Valley Cayenne, 455 mg (100 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-cayenne-455-100',
    form: 'capsule',
    activeIngredients: [{ name: 'Cayenne (fruit)', strength: '455 mg per capsule' }],
    inactiveIngredients: [
      flag(P28, 'Gelatin', 'cleared', 'gelatin'),
      flag(P28, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P28, 'Polyethylene Glycol', 'limited', 'peg'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel is the single source. Cayenne is the active and is not graded. Counted Limited tokens: maltodextrin and polyethylene glycol. That is two, so this is not a 3+ stack. A partial barcode on the bottle was not readable and was not attached. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-cinnamon-1000-400',
    productName: 'Spring Valley Cinnamon, 1,000 mg (400 vegetarian capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b271-cinnamon-1000-400',
    form: 'capsule',
    activeIngredients: [
      {
        name: 'Cinnamon (Cinnamomum cassia) (bark)',
        strength: '1,000 mg per 2 capsules (from 250 mg of a 4:1 concentrate)',
      },
    ],
    inactiveIngredients: [
      flag(P29, 'Rice Flour', 'moderate', 'riceFlour'),
      flag(P29, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P29, 'Rice Bran', 'cleared', 'riceBran'),
      flag(P29, 'Rice Hull', 'cleared', 'riceHull'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 2. Walmart panel image is the single source. Not the Ceylon cinnamon 120-count and not cinnamon plus chromium. Page text blocks differ. The panel says Rice Flour, Rice Bran, and Rice Hull, and that panel was graded. Cinnamon is the active and is not graded. Rice flour is Caution and does not stack. The facility allergen line is not a token. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b271-coconut-oil-1000-90',
    productName: 'Spring Valley Extra Virgin Coconut Oil, 1,000 mg (90 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b271-coconut-oil-1000-90',
    form: 'softgel',
    activeIngredients: [
      { name: 'Calories', strength: '20 per 2 softgels' },
      { name: 'Total Fat', strength: '2 g per 2 softgels' },
      { name: 'Saturated Fat', strength: '2 g per 2 softgels' },
      { name: 'Organic Extra Virgin Coconut Oil (fruit)', strength: '2,000 mg per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(P30, 'Gelatin', 'cleared', 'gelatin'),
      flag(P30, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P30, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 2. Walmart panel image is the single source. New Look. Page Inactive says N/A. Coconut oil is the active and is not graded. Contains coconut is a disclosure, not a token. Avoid from titanium dioxide (color). Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH271_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: string }> = {
  'springvalley-b271-sleep-stress-probiotic-30': { verdict: 'clean', counted: '' },
  'springvalley-b271-ala-200-100': { verdict: 'caution', counted: '' },
  'springvalley-b271-acv-450-250': { verdict: 'caution', counted: '' },
  'springvalley-b271-ashwagandha-500-60': { verdict: 'clean', counted: '' },
  'springvalley-b271-ashwagandha-gummy-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b271-beet-root-1000-90': { verdict: 'caution', counted: '' },
  'springvalley-b271-beet-gummy-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b271-biotin-10000-fast-60': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Modified Tapioca Starch|Sucralose',
  },
  'springvalley-b271-biotin-1000-150': { verdict: 'clean', counted: '' },
  'springvalley-b271-blood-fortifier-60': { verdict: 'caution', counted: '' },
  'springvalley-b271-blood-pressure-60': { verdict: 'caution', counted: '' },
  'springvalley-b271-brain-omega3-gummy-60': {
    verdict: 'caution',
    counted: 'Medium Chain Triglycerides|Natural Flavors',
  },
  'springvalley-b271-brain-memory-60': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b271-calcium-600-100': { verdict: 'avoid', counted: 'Maltodextrin|Polysorbate 80' },
  'springvalley-b271-calcium-d3-600-100': { verdict: 'avoid', counted: 'Maltodextrin|Polysorbate 80' },
  'springvalley-b271-calcium-d3-600-500': { verdict: 'avoid', counted: 'Maltodextrin|Polysorbate 80' },
  'springvalley-b271-cayenne-455-100': {
    verdict: 'caution',
    counted: 'Maltodextrin|Polyethylene Glycol',
  },
  'springvalley-b271-cinnamon-1000-400': { verdict: 'caution', counted: '' },
  'springvalley-b271-coconut-oil-1000-90': { verdict: 'avoid', counted: '' },
};

if (ROWS.length !== 19) throw new Error(`batch271 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch271 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch271 brand ${record.id}`);
  if (record.barcode) throw new Error(`batch271 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch271 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch271 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch271 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (record.id === 'springvalley-b271-biotin-10000-fast-60') {
    if (rollup.cause !== 'limited_stack' || !stackNote) throw new Error('batch271 biotin stack missing');
  } else if (stackNote) {
    throw new Error(`batch271 unexpected stack note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch271 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch271 pending ${ingredient.name}`);
    }
  }
}
