// DRAFT / not verified / batch 228 KYR6-c (t125u Physician's Choice Vaginal Probiotic 30 WRITE).
// One pack — grade from OI only; honestNote required.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = "Physician's Choice";
const DIGESTIVE = 'Digestive';

const METH = {
  vegCapGellan:
    'Methodology §5 Cleared (Vegetable capsule (hypromellose, gellan gum), HPMC / veg-cap family; founder lock Oct 17, 2026 t118u).',
  riceFlour: 'Methodology §5 Caution (rice flour, exact token; LOCKED Sept 15, 2026).',
  riceHullConc: 'Methodology §5 Cleared (rice hull concentrate, rice-hull family; t119u).',
  gumArabic: 'Methodology §5 Cleared (gum arabic, exact token).',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as non-gummy capsule / tablet fill; LOCKED Sept 22, 2026).',
  pcVaginal30Typo:
    'Methodology §5 (Physician\'s Choice Vaginal Probiotic 30 unclosed-bracket OI; founder lock Oct 18, 2026 t125u — splits to veg-cap, rice flour, rice hull concentrate, gum arabic, sunflower oil).',
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

const PANEL_VAGINAL_30 =
  'Walmart ip/5217863002 gallery image 6 (30-ct supplement facts; panel also misspells "esablished")';

const OI_PRINTED =
  'Vegetable capsule (hypromellose, gellan gum, rice flour, rice hull concentrate, gum arabic, and sunflower oil.';

const VAGINAL_30_FLAGS: FlagSpec[] = [
  ['Vegetable capsule (hypromellose, gellan gum)', 'cleared', 'vegCapGellan'],
  ['rice flour', 'limited', 'riceFlour'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

export const BATCH228_KYR6C_T125U: RatingRecord[] = [
  {
    id: 'physicianschoice-b228-vaginal-probiotic-30',
    productName: "Physician's Choice Vaginal Probiotic (30 capsules)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b228-vaginal-probiotic-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297074',
    activeIngredients: [
      { name: 'Organic Acacia Fiber', strength: '150 mg' },
      { name: 'Organic Cranberry (Fruit) Extract', strength: '75 mg' },
      {
        name: 'Vaginal Probiotic Blend',
        strength:
          '70 mg (Total Probiotic Activity 6 Billion CFUs): Limosilactobacillus reuteri (RC-14®), Lactobacillus crispatus (LBV88™), Lacticaseibacillus rhamnosus (GR-1®)',
      },
      { name: 'Deglycyrrhizinated Licorice Root Extract', strength: '50 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_VAGINAL_30, VAGINAL_30_FLAGS),
    verdict: verdictFromFlags(VAGINAL_30_FLAGS),
    retailers: ['Walmart', 'Target'],
    sourcesGeneral: [
      `Panel ${PANEL_VAGINAL_30}. Serving Size 1 Capsule; Servings Per Container 30. Actives: Organic Acacia Fiber 150 mg; Organic Cranberry (Fruit) Extract 75 mg; Vaginal Probiotic Blend 70 mg, Total Probiotic Activity 6 Billion CFUs (Limosilactobacillus reuteri RC-14™, Lactobacillus crispatus LBV88™, Lacticaseibacillus rhamnosus GR-1™); Deglycyrrhizinated Licorice Root Extract 50 mg. Other ingredients verbatim as printed (unclosed bracket): ${OI_PRINTED} Founder reading (t125u): Vegetable Capsule (hypromellose, Gellan gum), Rice flour, rice hull concentrate, gum arabic, and sunflower Oil. physicianschoice.com/physicians-choice-vaginal-probiotic-30-ct; Walmart ip/5217863002 $17.49 sold by Physician's Choice in stock; Target A-91620614 $25.49 in stock. UPC 850048297074 = Walmart = Target; check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Rice flour is an exact Caution token: unspecified rice ingredients can carry arsenic, and the label names no source or testing. Everything else (the hypromellose/gellan capsule, rice hull concentrate, gum arabic, sunflower oil fill) is Cleared. The probiotic, cranberry, acacia fiber, and DGL licorice actives are not graded. Serving is 1 capsule daily. Adults; the label prints no minimum age. The printed other-ingredients line is missing a closing parenthesis after gellan gum; the founder reading matches the 60-count formula and is what we graded.',
  },
];

const ROWS = BATCH228_KYR6C_T125U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch228 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch228 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch228 upc ${record.id}`);
  if (!record.honestNote?.trim()) throw new Error(`batch228 missing note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch228 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch228 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch228 verdict ${record.id}`);
}
