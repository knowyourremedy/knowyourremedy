// DRAFT / not verified / batch 245 KYR6-c (t145u Spring Valley WRITE — store-brand exception; founder second-source waiver).
// Three packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { t141uMeth } from '../scan-preview/limitedStackEligibility';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';
const HERBS = 'Herbs';

const METH = {
  glucoseSyrup:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup/dextrose — acceptable sweeteners; distinct from Caution bare glucose).',
  sugar:
    'Methodology §5 Caution (bare sugar — exact token when the label prints bare sugar; distinct from Cleared cane sugar and Cleared sucrose t118u; Caution cap, not stacked per t141u).',
  purifiedWater: 'Methodology §5 Cleared (purified water — water base row).',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers/buffers).',
  mctGummy:
    'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; Limited unless a plant source is named; label names no coconut or palm source).',
  cranberryFlavor:
    'Methodology §5 Cleared (Natural Cranberry Flavor — founder lock t132u Oct 20, 2026; named natural fruit flavor family).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  pineappleColor:
    'Methodology §5 Cleared (Pineapple Juice Concentrate (Color) — founder lock t132u Oct 20, 2026; fruit/vegetable juice as color lock Oct 15, 2026).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  riceConcentrate:
    'Methodology §5 Cleared (organic rice hull extract / rice concentrate / ground rice hulls — plant-fiber flow agent; distinct from rice flour).',
  veggieCapsule:
    'Methodology §4 t130u unnamed rule + §5 Cleared (Veggie Capsule — unnamed vegetarian capsule shell not worse than named hypromellose/pullulan shells; Sept 28 Caution stamp struck; batch231/batch239 precedent).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — EFSA 2018 no confirmed harm, open nanoparticle questions; 0-pt Caution cap, not stacked).',
  gelatin: 'Methodology §5 Cleared (gelatin — gummy / capsule base).',
  annatto:
    'Methodology §5 Caution (annatto seed extract (color) — same Caution row as annatto (bixin/norbixin, E160b): documented allergenic potential in chronic urticaria patients; EFSA review; Caution cap, not stacked per t141u).',
  carrotColor:
    'Methodology §5 Cleared (Black/Purple Carrot Juice Concentrate (Color) — founder lock t132u Oct 20, 2026; named juice concentrate as color).',
  lactic: 'Methodology §5 Cleared (lactic acid / malic acid — organic acids with citric).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity, not a known hazard).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function flagTapiocaMaltodextrin(panel: string): IngredientFlag {
  return { name: 'Tapioca Maltodextrin', riskLevel: 'limited', source: `${panel}; ${t141uMeth()}` };
}

const PANEL_CRANBERRY =
  'eBay 298481183368 supplement facts label image (cranberry_ebay_298481183368.png; same text as Walmart ip/627644284 cr_walmart.png; founder-verified label t145u)';
const PANEL_GINSENG =
  'Walmart ip/371018840 supplement facts label image (ginseng_walmart_371018840.png; matches eBay 137498226465; founder-verified label t145u)';
const PANEL_CALCIUM =
  'Walmart ip/829597644 supplement facts label image (calcium_walmart_829597644.png; matches eBay 197646490241; founder-verified label t145u)';

export const BATCH245_KYR6C_T145U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b245-cranberry-500-veg-gummy-60',
    productName: 'Spring Valley Cranberry 500 mg Vegetarian Gummies (60 count)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b245-cranberry-500-veg-gummy-60',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131093972',
    activeIngredients: [
      { name: 'Calories', strength: '25' },
      { name: 'Total Carbohydrate', strength: '4 g (1% DV)' },
      { name: 'Total Sugars', strength: '4 g' },
      { name: 'Includes Added Sugars', strength: '4 g (8% DV)' },
      { name: 'Sodium', strength: '10 mg (<1% DV)' },
      {
        name: 'Cranberry (Vaccinium macrocarpon) (fruit) Powder',
        strength: '500 mg per 2 gummies (Daily Value not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_CRANBERRY, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(PANEL_CRANBERRY, 'Sugar', 'moderate', 'sugar'),
      flag(PANEL_CRANBERRY, 'Purified Water', 'cleared', 'purifiedWater'),
      flag(PANEL_CRANBERRY, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(PANEL_CRANBERRY, 'Citric Acid', 'cleared', 'citric'),
      flag(PANEL_CRANBERRY, 'Medium Chain Triglycerides', 'limited', 'mctGummy'),
      flag(PANEL_CRANBERRY, 'Natural Cranberry Flavor', 'cleared', 'cranberryFlavor'),
      flag(PANEL_CRANBERRY, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_CRANBERRY, 'Pineapple Juice Concentrate (Color)', 'cleared', 'pineappleColor'),
      flag(PANEL_CRANBERRY, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    retailers: ['eBay', 'Walmart'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t145u). Founder t145u personally verified label and UPC and waived second sale / second UPC source. Panel ${PANEL_CRANBERRY}. Serving 2 vegetarian gummies (30 servings). Cranberry (fruit) powder supplies the Supplement Facts active and is not graded as an other ingredient. Ingredients verbatim: GLUCOSE SYRUP, SUGAR, CRANBERRY (FRUIT) POWDER, PURIFIED WATER. CONTAINS < 2% OF: CARNAUBA WAX, CITRIC ACID, MEDIUM CHAIN TRIGLYCERIDES, NATURAL CRANBERRY FLAVOR, PECTIN, PINEAPPLE JUICE CONCENTRATE (COLOR), SODIUM CITRATE. In-stock sale: eBay 298481183368 seller vigorvibe6 US $13.45, 10 available, single 60-count, expiry not stated (unstated, accepted); listing shows no UPC field. Walmart ip/627644284 (sold by Walmart.com, UPC 681131093972) out of stock at t145u read — label/UPC page only. UPC 681131093972 = founder-verified = Walmart page data; check digit OK. No DSLD record under this UPC.`,
    ],
  },
  {
    id: 'springvalley-b245-korean-panax-ginseng-100-60',
    productName: 'Spring Valley Standardized Extract Korean Panax Ginseng, 100 mg (60 vegetarian capsules)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b245-korean-panax-ginseng-100-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131350006',
    activeIngredients: [
      {
        name: 'Korean Ginseng Extract (Panax ginseng) (stem, root)',
        strength: '100 mg (standardized to 7% ginsenosides, 7 mg; Daily Value not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_GINSENG, 'Rice Concentrate', 'cleared', 'riceConcentrate'),
      flag(PANEL_GINSENG, 'Veggie Capsule', 'cleared', 'veggieCapsule'),
      flagTapiocaMaltodextrin(PANEL_GINSENG),
      flag(PANEL_GINSENG, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t145u). Founder t145u personally verified label and UPC and waived second sale / second UPC source. Panel ${PANEL_GINSENG}. Serving 1 capsule (60 servings). Korean ginseng extract supplies the Supplement Facts active and is not graded as an other ingredient. Other ingredients verbatim: RICE CONCENTRATE, VEGGIE CAPSULE, TAPIOCA MALTODEXTRIN, SILICA. Walmart ip/371018840 in stock, sold and shipped by Walmart.com, US $6.24, UPC 681131350006; also eBay 137498226465 seller modlux6 US $8.76, more than 10 available, expiry not stated, identical panel. Older back-of-bottle image in the same Walmart gallery (Maltodextrin, Organic Rice Powder, Hydroxypropyl Methylcellulose; <2% Silica) also grades Caution — not grade-changing (b23). UPC 681131350006 = founder-verified = Walmart page data; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b245-calcium-500-d3-gummy-100',
    productName: 'Spring Valley Calcium 500 mg + Vitamin D3 25 mcg (1,000 IU) Adult Gummies (100 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b245-calcium-500-d3-gummy-100',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131094320',
    activeIngredients: [
      { name: 'Calories', strength: '35' },
      { name: 'Total Carbohydrate', strength: '7 g (3% DV)' },
      { name: 'Total Sugars', strength: '5 g' },
      { name: 'Includes Added Sugars', strength: '5 g (10% DV)' },
      { name: 'Vitamin D (as Cholecalciferol)', strength: '25 mcg (1,000 IU) (125% DV)' },
      { name: 'Calcium (as Tricalcium Phosphate)', strength: '500 mg (38% DV)' },
      { name: 'Phosphorus (as Tricalcium Phosphate)', strength: '230 mg (18% DV)' },
      { name: 'Sodium', strength: '15 mg (1% DV)' },
    ],
    inactiveIngredients: [
      flag(PANEL_CALCIUM, 'Sugar', 'moderate', 'sugar'),
      flag(PANEL_CALCIUM, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(PANEL_CALCIUM, 'Purified Water', 'cleared', 'purifiedWater'),
      flag(PANEL_CALCIUM, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_CALCIUM, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(PANEL_CALCIUM, 'Black/Purple Carrot Juice Concentrate (Color)', 'cleared', 'carrotColor'),
      flag(PANEL_CALCIUM, 'Citric Acid', 'cleared', 'citric'),
      flag(PANEL_CALCIUM, 'Lactic Acid', 'cleared', 'lactic'),
      flag(PANEL_CALCIUM, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(PANEL_CALCIUM, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_CALCIUM, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t145u). Founder t145u personally verified label and UPC and waived second sale / second UPC source. Panel ${PANEL_CALCIUM}. Serving 2 gummies (50 servings). Tricalcium phosphate and cholecalciferol supply Supplement Facts actives and are not graded as other ingredients. Ingredients verbatim: SUGAR, GLUCOSE SYRUP, TRICALCIUM PHOSPHATE, PURIFIED WATER, GELATIN. CONTAINS < 2% OF: ANNATTO SEED EXTRACT (COLOR), BLACK/PURPLE CARROT JUICE CONCENTRATE (COLOR), CHOLECALCIFEROL, CITRIC ACID, LACTIC ACID, NATURAL FLAVORS, PECTIN, SODIUM CITRATE. Walmart ip/829597644 in stock, sold and shipped by Walmart.com, US $9.88, UPC 681131094320; also eBay 197646490241 seller americanbullco US $14.99, 9 available, expiry 05/2027 or later, identical panel (UPC field "Does not apply"). UPC 681131094320 = founder-verified = Walmart page data; check digit OK. New pack; no DSLD record counts.`,
    ],
  },
];

const ROWS = BATCH245_KYR6C_T145U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch245 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch245 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 0 || verdictTally.caution !== 3 || verdictTally.avoid !== 0) {
  throw new Error(`batch245 spec tally mismatch ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch245 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch245 unexpected honestNote ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch245 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch245 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch245 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
