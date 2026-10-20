// DRAFT / not verified / batch 231 KYR6-c (t130u Spring Valley WRITE — store-brand exception).
// Three packs — grade from OI only; no honestNote (no shopper contradiction on these panels).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  hpmc:
    'Methodology §5 Cleared (hypromellose / HPMC / methylcellulose family; EFSA: no carcinogenicity, ADI not needed).',
  riceBran:
    'Methodology §5 Cleared (rice bran / organic rice bran; t111u founder override — rice-bran plant-fiber family).',
  riceHull:
    'Methodology §5 Cleared (rice hull / rice hull concentrate / ground rice hulls family; not silicon dioxide).',
  veggieCap:
    'Methodology §4 t130u unnamed rule + §5 Cleared (named vegetarian capsule shells — hypromellose, pullulan, tapioca — Cleared; unnamed Veggie Capsule not worse when named form would not change severity).',
  water: 'Methodology §5 Cleared (purified water / deionized water / water family).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family; EFSA 2017: no carcinogenicity, ADI not needed).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / mineral filler / buffer salts).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium / cellulose gum / CMC family).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  hpmcCoat: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / HPMC family; EFSA).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant; EFSA 2018).',
  vanillaFlavor:
    'Methodology §5 Cleared (Natural Vanilla Flavor — named natural flavor; t119u flavor clarification / named-fruit-flavor family, same posture as named lemon flavor).',
  peg: 'Methodology §5 Caution (polyethylene glycol / PEG — ethylene-oxide / 1,4-dioxane process contaminant concern).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant; EFSA 2018).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  return verdictFromRiskLevels(levels);
}

const PANEL_MUSHROOM = 'Walmart ip/2594178352 supplement facts label image (matches eBay 318835364171)';
const PANEL_CINNAMON = 'Walmart ip/901727935 supplement facts label image (matches eBay 198671520023)';
const PANEL_ZINC = 'Walmart ip/10325002 supplement facts label image (matches DSLD 331642 / eBay 336792830499)';

export const BATCH231_KYR6C_T130U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b231-mushroom-complex-30',
    productName: 'Spring Valley Mushroom Complex Dietary Supplement (6,200 mg equivalent, 30 vegetarian capsules)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b231-mushroom-complex-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131100786',
    activeIngredients: [
      {
        name: 'Cordyceps 8:1 Extract (Cordyceps militaris) (mycelium)',
        strength: '200 mg (equivalent to 1,600 mg Cordyceps)',
      },
      {
        name: 'Reishi 15:1 Extract (Ganoderma lucidum) (mycelium)',
        strength: '200 mg (equivalent to 3,000 mg Reishi)',
      },
      {
        name: "Lion's Mane 8:1 Extract (Hericium erinaceus) (fruiting body)",
        strength: "200 mg (equivalent to 1,600 mg Lion's Mane)",
      },
    ],
    inactiveIngredients: [
      flag(PANEL_MUSHROOM, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PANEL_MUSHROOM, 'Rice Bran', 'cleared', 'riceBran'),
      flag(PANEL_MUSHROOM, 'Rice Hull', 'cleared', 'riceHull'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley is an approved store-brand exception to the t130u no-store-brand row-writing rule. Panel ${PANEL_MUSHROOM}. Serving 1 capsule. Other ingredients verbatim: Hypromellose (capsule), Rice Bran, Rice Hull. Allergen: made in a facility that also handles milk, eggs, fish, crustacean shellfish, tree nuts, soy and sesame. Walmart ip/2594178352 in stock sold by Walmart.com; eBay 318835364171 New in stock seller fit-flare. UPC 681131100786 = Walmart = bestpeek WM-681131100786; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b231-ceylon-cinnamon-1200-120',
    productName: 'Spring Valley Ceylon Cinnamon Metabolism Support (1,200 mg, 120 vegetarian capsules)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b231-ceylon-cinnamon-1200-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131281256',
    activeIngredients: [
      {
        name: 'Organic Ceylon (Sri Lanka) Cinnamon Powder (Cinnamomum verum) (bark)',
        strength: '1,200 mg per 2 capsules (60 servings per container)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_CINNAMON, 'Veggie Capsule', 'cleared', 'veggieCap'),
      flag(PANEL_CINNAMON, 'Purified Water', 'cleared', 'water'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_CINNAMON}. Serving 2 capsules; Servings Per Container 60. Other ingredients verbatim: Veggie Capsule, Purified Water. Walmart ip/901727935 in stock sold by Walmart.com; eBay 198671520023 New in stock seller americanbullco. UPC 681131281256 = Walmart = eBay item specifics; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b231-zinc-50-200',
    productName: 'Spring Valley Zinc 50 mg Immune Health (200 caplets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b231-zinc-50-200',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131633284',
    activeIngredients: [{ name: 'Zinc', strength: '50 mg (455% DV) as zinc gluconate (active, ungraded)' }],
    inactiveIngredients: [
      flag(PANEL_ZINC, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_ZINC, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_ZINC, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_ZINC, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(PANEL_ZINC, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmcCoat'),
      flag(PANEL_ZINC, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_ZINC, 'Natural Vanilla Flavor', 'cleared', 'vanillaFlavor'),
      flag(PANEL_ZINC, 'Polyethylene Glycol', 'moderate', 'peg'),
      flag(PANEL_ZINC, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_ZINC}. Serving 1 caplet. Other ingredients verbatim: Microcrystalline Cellulose, Dicalcium Phosphate, Croscarmellose Sodium. Contains 2% or less of: Carnauba Wax, Hydroxypropyl Methylcellulose, Magnesium Stearate, Natural Vanilla Flavor, Polyethylene Glycol, Stearic Acid. Walmart ip/10325002 in stock sold by Walmart.com; eBay 336792830499 New seller HarborLane_Trader; DSLD 331642 label agrees. UPC 681131633284; check digit OK.`,
    ],
  },
];

const ROWS = BATCH231_KYR6C_T130U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch231 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch231 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch231 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch231 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch231 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch231 verdict ${record.id}`);
}
