// DRAFT / not verified / batch 243 KYR6-c (t141u Spring Valley WRITE — store-brand exception).
// Four packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';
const HERBS = 'Herbs';

const METH = {
  hpmcCapsule: 'Methodology §5 Cleared (hypromellose (capsule) / HPMC vegetarian capsule shell).',
  riceHull: 'Methodology §5 Cleared (rice hull / rice hull concentrate family; t119u).',
  riceBran:
    'Methodology §5 Cleared (organic rice bran extract / rice bran plant-fiber family; distinct from rice flour).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  gelatinCapsule: 'Methodology §5 Cleared (gelatin capsule shell / gelatin softgel base).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — t102u alias to stearate-family row).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  gelatin: 'Methodology §5 Cleared (gelatin softgel / capsule base).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  tapiocaSyrup: 'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup/dextrose — acceptable sweeteners).',
  organicSugar: 'Methodology §5 Cleared (Organic Sugar — t90u Cleared cane sugar; bare Sugar stays Caution).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  naturalFlavors: 'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity, not a known hazard).',
  blackCarrotColor:
    'Methodology §5 Cleared (black carrot / named fruit-or-vegetable juice concentrate as color).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  sunflowerGummy:
    'Methodology §5 High (seed/industrial oils in gummies / lozenges — clean-standard exclusion for gummy formulations).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_TART_CHERRY =
  'Walmart ip/46342032 supplement facts label image (matches eBay 860030693417 tc_e1.png / tc_e2.png)';
const PANEL_MILK_THISTLE =
  'Walmart ip/5542192342 supplement facts label image (matches eBay 137490827434 mt_e2.png; twin-pack 117449600321 mt_twin_back.png UPC corroboration)';
const PANEL_CINNAMON =
  'Walmart ip/182196395 supplement facts label image (matches eBay 406689829212 cn_e1.png; 2-pack 198690651237 cn_e2pack.png UPC corroboration)';
const PANEL_B_GUMMY =
  'Walmart ip/610197663 supplement facts label image (matches eBay 137490838492 bg_ebay_modlux6_137490838492.png)';

export const BATCH243_KYR6C_T141U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b243-tart-cherry-1200-90',
    productName: 'Spring Valley Tart Cherry Extract, 1,200 mg (90 capsules)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b243-tart-cherry-1200-90',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131073950',
    activeIngredients: [
      {
        name: 'Organic Tart Cherry Extract (Prunus cerasus) (fruit)',
        strength: '1,200 mg (from 300 mg of tart cherry 4:1 extract; Daily Value not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_TART_CHERRY, 'Hypromellose (Capsule)', 'cleared', 'hpmcCapsule'),
      flag(PANEL_TART_CHERRY, 'Rice Hull', 'cleared', 'riceHull'),
      flag(PANEL_TART_CHERRY, 'Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t141u). Panel ${PANEL_TART_CHERRY}. Serving 1 capsule (90 servings). Organic tart cherry extract supplies Supplement Facts actives and is not graded as an other ingredient. Other ingredients verbatim: HYPROMELLOSE (CAPSULE), RICE HULL, RICE BRAN. MADE IN A FACILITY THAT ALSO HANDLES MILK, EGGS, FISH, CRUSTACEAN SHELLFISH, TREE NUTS, SOY AND SESAME (facility allergen line not graded). Walmart ip/46342032 in stock sold by Walmart.com; eBay 860030693417 seller fit-flare US $12.20, 7 available, single 90-count, expiry 08/2027 or later. UPC 681131073950 = Walmart page data = eBay item specifics; check digit OK. No DSLD record.`,
    ],
  },
  {
    id: 'springvalley-b243-milk-thistle-175-90',
    productName: 'Spring Valley Standardized Extract Milk Thistle, 175 mg (90 capsules)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b243-milk-thistle-175-90',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '194346253982',
    activeIngredients: [
      {
        name: 'Milk Thistle Extract (Silybum marianum) (seed)',
        strength: '175 mg (standardized to contain 80% Silymarin, 140 mg; Daily Value not established)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_MILK_THISTLE, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_MILK_THISTLE, 'Gelatin (Capsule)', 'cleared', 'gelatinCapsule'),
      flag(PANEL_MILK_THISTLE, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(PANEL_MILK_THISTLE, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t141u). Panel ${PANEL_MILK_THISTLE}. Serving 1 capsule (90 servings). Milk thistle seed extract supplies Supplement Facts actives and is not graded as an other ingredient. Other ingredients verbatim: MALTODEXTRIN, GELATIN (CAPSULE), VEGETABLE MAGNESIUM STEARATE, SILICA. MADE IN A FACILITY THAT ALSO HANDLES MILK, EGGS, FISH, CRUSTACEAN SHELLFISH, TREE NUTS, SOY AND SESAME (facility allergen line not graded). Walmart ip/5542192342 in stock sold by Walmart.com; eBay 137490827434 seller modlux6 US $12.08, more than 10 available, single 90-count, expiry not stated (unstated, accepted). UPC 194346253982 = Walmart = eBay twin-pack 117449600321 specifics 0194346253982 (GTIN-13 form of same UPC-A; multipack UPC source only, not a sale); check digit OK. No DSLD record.`,
    ],
  },
  {
    id: 'springvalley-b243-cinnamon-chromium-500-180',
    productName: 'Spring Valley Cinnamon Plus Chromium, 500 mg (180 capsules)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b243-cinnamon-chromium-500-180',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131093996',
    activeIngredients: [
      { name: 'Total Carbohydrate', strength: '<1 g (<1% DV) per 2 capsules' },
      { name: 'Chromium', strength: '100 mcg (286% DV), from chromium amino acid chelate' },
      {
        name: 'Cinnamon (Cinnamomum cassia) (bark) 4:1 Extract',
        strength: '250 mg (equivalent to 1,000 mg cinnamon) per 2 capsules',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_CINNAMON, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_CINNAMON, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_CINNAMON, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_CINNAMON, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_CINNAMON, 'Silica', 'limited', 'silica'),
      flag(PANEL_CINNAMON, 'Sodium Lauryl Sulfate', 'moderate', 'sls'),
      flag(PANEL_CINNAMON, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t141u). Panel ${PANEL_CINNAMON}. Serving 2 capsules (90 servings). Cinnamon (bark) extract and chromium amino acid chelate on the ingredient line supply Supplement Facts actives and are not graded as other ingredients. Other ingredients graded from the <2% portion: Microcrystalline Cellulose, Gelatin, Maltodextrin, Magnesium Stearate, Silica, Sodium Lauryl Sulfate, Stearic Acid. Walmart ip/182196395 in stock sold by Walmart.com; eBay 406689829212 seller razzaqglobal US $12.49, more than 10 available, single 180-count, expiry not stated (unstated, accepted). UPC 681131093996 = Walmart = eBay 2-pack 198690651237 specifics (multipack UPC source only, not a sale); check digit OK. No DSLD record.`,
    ],
  },
  {
    id: 'springvalley-b243-b-complex-veg-gummy-70',
    productName: 'Spring Valley Vitamin B Complex Adult Vegetarian Gummies (70 count)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b243-b-complex-veg-gummy-70',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131000635',
    activeIngredients: [
      { name: 'Calories', strength: '10' },
      { name: 'Total Carbohydrate', strength: '2 g (1% DV)' },
      { name: 'Total Sugars', strength: '1 g' },
      { name: 'Includes Added Sugars', strength: '1 g (2% DV)' },
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '15 mg (17% DV)' },
      { name: 'Niacin (as Inositol Niacinate)', strength: '20 mg (125% DV)' },
      { name: 'Vitamin B6 (as Pyridoxine Hydrochloride)', strength: '2 mg (118% DV)' },
      {
        name: 'Folate (as Folic Acid)',
        strength: '665 mcg DFE (400 mcg folic acid) (166% DV)',
      },
      {
        name: 'Vitamin B12 (as Methylcobalamin and Hydroxocobalamin)',
        strength: '30 mcg (1,250% DV)',
      },
      { name: 'Biotin', strength: '300 mcg (1,000% DV)' },
      { name: 'Inositol (as Inositol Niacinate)', strength: '7 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_B_GUMMY, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(PANEL_B_GUMMY, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(PANEL_B_GUMMY, 'Citric Acid', 'cleared', 'citric'),
      flag(PANEL_B_GUMMY, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(
        PANEL_B_GUMMY,
        'Organic Black Carrot Juice Concentrate (Color)',
        'cleared',
        'blackCarrotColor',
      ),
      flag(PANEL_B_GUMMY, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(PANEL_B_GUMMY, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(PANEL_B_GUMMY, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_B_GUMMY, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u–t141u). Panel ${PANEL_B_GUMMY}. Serving 1 gummy (70 servings). Ascorbic acid, inositol niacinate, pyridoxine hydrochloride, folic acid, methylcobalamin, hydroxocobalamin, and biotin supply Supplement Facts actives and are not graded as other ingredients. Other ingredients graded from the <2% portion: Organic Tapioca Syrup, Organic Sugar, Citric Acid, Natural Flavors, Organic Black Carrot Juice Concentrate (Color), Organic Carnauba Wax, Organic Sunflower Oil, Pectin, Sodium Citrate. Walmart ip/610197663 in stock sold by Walmart.com; eBay 137490838492 seller modlux6 US $10.16, 10 available, single 70-count, expiry not stated (unstated, accepted). UPC 681131000635 = Walmart = eBay 306991228587 and 224123848348 item specifics (older yellow label, UPC sources only). No DSLD record.`,
    ],
  },
];

const ROWS = BATCH243_KYR6C_T141U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch243 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch243 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 1 || verdictTally.caution !== 2 || verdictTally.avoid !== 1) {
  throw new Error(`batch243 spec tally mismatch ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch243 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch243 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch243 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch243 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
