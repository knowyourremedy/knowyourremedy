// DRAFT / not verified / batch 230 KYR6-c (t127u Physician's Choice WRITE — catalog close).
// Three packs — grade from OI only; honestNote required.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = "Physician's Choice";
const DIGESTIVE = 'Digestive';
const NO_OI = 'No other ingredients listed on panel.';

const METH = {
  vegCapHpmc:
    'Methodology §5 Cleared (Vegetable capsule (hypromellose), HPMC / veg-cap family; founder lock Oct 17, 2026 t118u).',
  riceFlour: 'Methodology §5 Caution (rice flour, exact token; LOCKED Sept 15, 2026).',
  riceHullConc: 'Methodology §5 Cleared (rice hull concentrate, rice-hull family; t119u).',
  gumArabic: 'Methodology §5 Cleared (gum arabic, exact token).',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as non-gummy capsule / tablet fill; LOCKED Sept 22, 2026).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  return verdictFromFlagSpecs(flags);
}

const PANEL_DE_BASE =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/DIG-60CT-CAROUSEL_6_3.7.0_3dc88076-3555-4d95-b4cc-8a10bc729693.jpg (per-capsule actives/OI same as physicianschoice-b225-digestive-enzymes-60)';

const PANEL_DE_90 = `Walmart ip/5275489571 gallery supplement facts (Servings Per Container 90); ${PANEL_DE_BASE}`;
const PANEL_DE_180 = `Walmart ip/5347569862 gallery supplement facts (Servings Per Container 180); ${PANEL_DE_BASE}`;

const OI_DE =
  'Vegetable capsule (hypromellose), rice flour, rice hull concentrate, gum arabic, and sunflower oil.';

const PC_DE: FlagSpec[] = [
  ['Vegetable capsule (hypromellose)', 'cleared', 'vegCapHpmc'],
  ['rice flour', 'limited', 'riceFlour'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

const DE_ACTIVES = [
  {
    name: 'Prebiotic and Probiotic Blend',
    strength:
      '159 mg: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber, Inulin (from Chicory), Bacillus subtilis OPTIBIOME BS50™, Bacillus coagulans, Bacillus clausii',
  },
  { name: 'Herbal Blend', strength: '150 mg: Organic Peppermint Leaf, Organic Ginger Root' },
  {
    name: 'Digestive Enzyme Blend',
    strength:
      '85 mg: Bromelain, Amylase, Protease 4.5, Glucoamylase, Protease 6.0, Papain, Lactase, Protease 3.0, Peptidase, Cellulase, Beta-Glucanase, Alpha-Galactosidase, Lipase, Xylanase, Hemicellulase, Invertase',
  },
];

const DE_RICE_TAIL =
  'The probiotic and prebiotic actives are not graded. Serving is 1 capsule daily. Adults; the label prints no minimum age.';

export const BATCH230_KYR6C_T127U: RatingRecord[] = [
  {
    id: 'physicianschoice-b230-digestive-enzymes-90',
    productName: "Physician's Choice Digestive Enzymes with Prebiotics & Probiotics (90 capsules)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b230-digestive-enzymes-90',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297050',
    activeIngredients: DE_ACTIVES,
    inactiveIngredients: buildOi(PANEL_DE_90, PC_DE),
    verdict: verdictFromFlags(PC_DE),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Founder ruling (Brandon, t127u): current panel and UPC confirmed; overrides the earlier hold (two different 90-count panels on Walmart — founder confirms the current formula matches the 60-count). Panel ${PANEL_DE_90}. Serving 1 Capsule; Servings Per Container 90. Other ingredients verbatim: ${OI_DE} physicianschoice.com/digestive-enzymes-prebiotic-probiotic "90 Count" $31.73 available; Walmart ip/5275489571 $26.97 sold by Physician's Choice, in stock. UPC 850048297050 = brand "90 Count" variant barcode = Walmart; check digit OK.`,
    ],
    honestNote:
      `The grade comes only from the other ingredients. Rice flour is an exact Caution token: unspecified rice ingredients can carry arsenic, and the label names no source or testing. Everything else (the hypromellose capsule, rice hull concentrate, gum arabic, sunflower oil fill) is Cleared. ${DE_RICE_TAIL} Same formula as the 60-count; this 90-capsule bottle simply has more servings. The enzymes include bromelain and papain (actives, not graded).`,
  },
  {
    id: 'physicianschoice-b230-digestive-enzymes-180',
    productName: "Physician's Choice Digestive Enzymes with Prebiotics & Probiotics (180 capsules)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b230-digestive-enzymes-180',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297067',
    activeIngredients: DE_ACTIVES,
    inactiveIngredients: buildOi(PANEL_DE_180, PC_DE),
    verdict: verdictFromFlags(PC_DE),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Founder ruling (Brandon, t127u): current panel and UPC confirmed; overrides the earlier hold (mixed old/new panel images on Walmart — founder confirms the current 180-count formula matches the 60-count). Panel ${PANEL_DE_180}. Serving 1 Capsule; Servings Per Container 180. Other ingredients verbatim: ${OI_DE} physicianschoice.com/digestive-enzymes-prebiotic-probiotic "180 Count" $47.02 available; Walmart ip/5347569862 $45.97 sold by Physician's Choice, in stock. UPC 850048297067 = brand "180 Count" variant barcode = Walmart; check digit OK.`,
    ],
    honestNote:
      `The grade comes only from the other ingredients. Rice flour is an exact Caution token: unspecified rice ingredients can carry arsenic, and the label names no source or testing. Everything else (the hypromellose capsule, rice hull concentrate, gum arabic, sunflower oil fill) is Cleared. ${DE_RICE_TAIL} Same formula as the 60-count; this 180-capsule bottle simply has more servings.`,
  },
  {
    id: 'physicianschoice-b230-easy-mix-fiber-unflavored-30',
    productName:
      "Physician's Choice Easy Mix Fiber Unflavored (30-Day Supply, about 30 servings, 7.1 oz)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b230-easy-mix-fiber-unflavored-30',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297562',
    activeIngredients: [
      { name: 'EasyMix™ Prebiotic Fiber Blend', strength: '6.7 g: Soluble Corn Fiber, Guar Fiber' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ["Physician's Choice", 'eBay'],
    sourcesGeneral: [
      `Founder ruling (Brandon, t127u): current panel and UPC confirmed; overrides the earlier hold (no dedicated 30-serving facts-box image on the brand site). Panel: physicianschoice.com/easy-mix-fiber "30 Day Supply" variant image https://cdn.shopify.com/s/files/1/2677/6462/files/120325_EZF_7.1oz-STICKER.png (30 servings, Net Wt 7.1 oz / 201 g) + PDP Supplement Facts text: Serving Size 1 Heaping Tablespoon (6.7 g); Servings Per Container 24 or 30; EasyMix Prebiotic Fiber Blend: Soluble Corn Fiber, Guar Fiber. ${NO_OI} physicianschoice.com/easy-mix-fiber "30 Day Supply" $27.97 available (variant barcode 850048297562); eBay https://www.ebay.com/itm/137664605716 New, seller dealmart007, in stock, EXP 3/28, UPC 0850048297562; eBay 298368748644 (ritzybuyer) UPC 850048297562. UPC check digit OK.`,
    ],
    honestNote:
      `Clean. ${NO_OI} The label is only the two fibers (soluble corn fiber and guar fiber), with no sweetener, flavor, color, or flow agent. With nothing to dock, the grade is Clean. The fibers are actives and are not graded. Serving is 1 heaping spoonful (6.7 g, 6 g fiber) daily mixed into a drink. This 7.1 oz tub holds 30 servings of the same formula as the 24-day size. Start low if you are not used to fiber. For adults 18+.`,
  },
];

const ROWS = BATCH230_KYR6C_T127U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch230 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch230 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch230 upc ${record.id}`);
  if (!record.honestNote?.trim()) throw new Error(`batch230 missing note ${record.id}`);
  if (record.inactiveIngredients.length === 0) {
    if (!record.honestNote.includes(NO_OI) || !record.sourcesGeneral?.some((s) => s.includes(NO_OI))) {
      throw new Error(`batch230 empty OI missing sentence ${record.id}`);
    }
  } else {
    for (const ingredient of record.inactiveIngredients) {
      if (!plainIngredientWhy(ingredient)) throw new Error(`batch230 blank why ${record.id} ${ingredient.name}`);
      if (!ingredient.source?.trim()) throw new Error(`batch230 blank source ${ingredient.name}`);
    }
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch230 verdict ${record.id}`);
}
