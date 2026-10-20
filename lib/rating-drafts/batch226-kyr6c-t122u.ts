// DRAFT / not verified / batch 226 KYR6-c (t122u Physician's Choice WRITE).
// Four packs — grade from OI only; honestNote required (t121u/t122u founder order).

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = "Physician's Choice";
const DIGESTIVE = 'Digestive';

const METH = {
  chicoryFiber:
    'Methodology §5 Cleared (Chicory Root Fiber, exact restamp; inulin/chicory family).',
  gums: 'Methodology §5 Cleared (gums incl. pectin).',
  tapiocaStarch: 'Methodology §5 Cleared (tapioca starch; founder lock Oct 18, 2026 t122u).',
  agarAgar:
    'Methodology §5 Cleared (agar agar; maps to Agar / agar-agar row; founder lock Oct 18, 2026 t122u).',
  natFlavor: 'Methodology §5 Caution (flavor family; unnamed natural flavor).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  trisodiumCitrate: 'Methodology §5 Cleared (trisodium citrate).',
  blackCarrot:
    'Methodology §5 Cleared (black carrot / named vegetable juice as COLOR).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  xylitol: 'Methodology §5 Caution (xylitol / erythritol, oral).',
  beetJuiceColor:
    'Methodology §5 Cleared (beet juice (color); named vegetable juice as color; founder lock Oct 18, 2026 t122u).',
  malic: 'Methodology §5 Cleared (lactic / malic acid).',
  palmChew:
    'Methodology §5 Avoid (Palm oil in a chewable tablet; founder lock Oct 18, 2026 t120u).',
  riceHullConc: 'Methodology §5 Cleared (rice hull concentrate, rice-hull family; t119u).',
  rebM:
    'Methodology §5 Cleared (rebaudioside M (stevia leaf extract); t121u, PR #736).',
  gumArabic: 'Methodology §5 Cleared (gum arabic, exact token).',
  sunflowerChew:
    'Methodology §5 Cleared (Sunflower oil in a chewable tablet; founder lock Oct 18, 2026 t121u, PR #736).',
  spirulinaColor:
    'Methodology §5 Cleared (spirulina (color); t121u override. spirulina (for color) stays Caution).',
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
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const PANEL_FIBER_GUM =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/FIBGUM-60CT-CAROUSEL_7_3.0.0.jpg';
const PANEL_KIDS_FIBER_GUM = 'https://cdn.shopify.com/s/files/1/2677/6462/files/KFG-CAROUSEL-7.jpg';
const PANEL_KIDS_CHEW_30 =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/Kids_Chewable_PDP_Carousel_1c65b739-e54a-42f8-a25e-a1120240bc01.jpg';
const PANEL_KIDS_CHEW_60 =
  'https://cdn.shopify.com/s/files/1/0804/8974/2651/files/14_c8193d3a-953c-4941-bed2-eda72a98bc67.jpg';

const OI_GUMMY_FIBER =
  'Chicory root fiber, pectin, tapioca starch, agar agar, natural flavor, citric acid, trisodium citrate, black carrot (for color), and carnauba wax.';

const GUMMY_FIBER_FLAGS: FlagSpec[] = [
  ['Chicory root fiber', 'cleared', 'chicoryFiber'],
  ['pectin', 'cleared', 'gums'],
  ['tapioca starch', 'cleared', 'tapiocaStarch'],
  ['agar agar', 'cleared', 'agarAgar'],
  ['natural flavor', 'limited', 'natFlavor'],
  ['citric acid', 'cleared', 'citric'],
  ['trisodium citrate', 'cleared', 'trisodiumCitrate'],
  ['black carrot (for color)', 'cleared', 'blackCarrot'],
  ['carnauba wax', 'cleared', 'carnauba'],
];

const OI_KIDS_CHEW =
  'Xylitol, beet juice (color), natural flavor, malic acid, palm oil, rice hull concentrate, citric acid, rebaudioside M (stevia leaf extract), gum arabic, sunflower oil, and spirulina (color).';

const KIDS_CHEW_FLAGS: FlagSpec[] = [
  ['Xylitol', 'limited', 'xylitol'],
  ['beet juice (color)', 'cleared', 'beetJuiceColor'],
  ['natural flavor', 'limited', 'natFlavor'],
  ['malic acid', 'cleared', 'malic'],
  ['palm oil', 'high', 'palmChew'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['citric acid', 'cleared', 'citric'],
  ['rebaudioside M (stevia leaf extract)', 'cleared', 'rebM'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerChew'],
  ['spirulina (color)', 'cleared', 'spirulinaColor'],
];

export const BATCH226_KYR6C_T122U: RatingRecord[] = [
  {
    id: 'physicianschoice-b226-fiber-gummies-60',
    productName: "Physician's Choice Fiber Gummies Raspberry Lemon (60 gummies)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b226-fiber-gummies-60',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297517',
    activeIngredients: [
      { name: 'Dietary Fiber', strength: '5 g per 2 gummies (chicory root fiber base)' },
    ],
    inactiveIngredients: buildOi(PANEL_FIBER_GUM, GUMMY_FIBER_FLAGS),
    verdict: verdictFromFlags(GUMMY_FIBER_FLAGS),
    retailers: ["Physician's Choice", 'Target'],
    sourcesGeneral: [
      `Panel ${PANEL_FIBER_GUM}. Serving 2 Gummies; Servings Per Container 30. Other ingredients verbatim: ${OI_GUMMY_FIBER} physicianschoice.com/fiber-gummies $21.20 available; Target A-1010622918 in stock. Walmart ip/18693856880 $17.82 in stock (also agrees on UPC). UPC 850048297517 check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Two of them dock it to Caution: an unnamed "natural flavor" (the flavor rule docks unnamed flavors) and carnauba wax (exact Caution token). Chicory root fiber, pectin, tapioca starch, agar agar, citric acid, trisodium citrate, and black carrot color are Cleared. There is no added sugar or sugar alcohol, and the color is from black carrot, not a dye. The actives are not graded. Raspberry lemon flavor. The label says "Adults chew two (2) gummies daily." 5 g of chicory fiber per serving may cause gas or bloating at first.',
  },
  {
    id: 'physicianschoice-b226-kids-fiber-gummies-60',
    productName: "Physician's Choice Kids Fiber Gummies (60 gummies)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b226-kids-fiber-gummies-60',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297272',
    activeIngredients: [
      { name: 'Dietary Fiber', strength: '3 g per 2 gummies (chicory root fiber base)' },
    ],
    inactiveIngredients: buildOi(PANEL_KIDS_FIBER_GUM, GUMMY_FIBER_FLAGS),
    verdict: verdictFromFlags(GUMMY_FIBER_FLAGS),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_KIDS_FIBER_GUM}. Serving 2 Gummies; Servings Per Container 30. Other ingredients verbatim: ${OI_GUMMY_FIBER} physicianschoice.com/kids-fiber-gummies $19.97 available; Walmart ip/20191069375 $16.97 sold by Physician's Choice in stock. UPC 850048297272 check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Two of them dock it to Caution: an unnamed "natural flavor" (the flavor rule docks unnamed flavors) and carnauba wax (exact Caution token). Chicory root fiber, pectin, tapioca starch, agar agar, citric acid, trisodium citrate, and black carrot color are Cleared. There is no added sugar or sugar alcohol, and the color is from black carrot, not a dye. The actives are not graded. The label says "For ages 4+, take two (2) gummies daily under adult supervision," so the minimum age is 4. 3 g of chicory fiber may cause gas in kids at first. Sugar-free.',
  },
  {
    id: 'physicianschoice-b226-kids-probiotic-chewable-30',
    productName: "Physician's Choice Kids Probiotic Chewable Tart Berry (30 chewable tablets)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b226-kids-probiotic-chewable-30',
    audience: KIDS,
    minAge: 4,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '854226008995',
    activeIngredients: [
      { name: 'Vitamin C (from Ascorbic Acid)', strength: '45 mg (50% DV)' },
      { name: 'Vitamin D3 (as Cholecalciferol)', strength: '15 mcg (75% DV)' },
      { name: 'Zinc (from Zinc Glycinate)', strength: '2.5 mg (23% DV)' },
      {
        name: 'Probiotic Blend',
        strength:
          '22 mg (Total Probiotic Activity 5 Billion CFUs on the 30-ct label): Lactobacillus acidophilus, Lacticaseibacillus rhamnosus GG, Bacillus coagulans, Bifidobacterium breve, Ligilactobacillus salivarius, Lactiplantibacillus plantarum, Bifidobacterium lactis',
      },
      { name: 'Organic Acacia Fiber', strength: '145 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_KIDS_CHEW_30, KIDS_CHEW_FLAGS),
    verdict: verdictFromFlags(KIDS_CHEW_FLAGS),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_KIDS_CHEW_30}. Serving 1 Chewable Tablet; Servings Per Container 30. Other ingredients verbatim: ${OI_KIDS_CHEW} physicianschoice.com/kids-probiotic 1-Pack $24.17 available; Walmart ip/3999667483 $14.47 sold by Physician's Choice in stock. UPC 854226008995 check digit OK.`,
    ],
    honestNote:
      'Avoid. The grade comes only from the other ingredients, and palm oil in a chewable tablet is an Avoid token (founder lock t120u). That alone sets Avoid. Xylitol and the unnamed "natural flavor" are Caution. Beet juice color, malic acid, rice hull concentrate, citric acid, rebaudioside M (stevia), gum arabic, sunflower oil (Cleared in a chewable, t121u), and spirulina color (Cleared, t121u) are Cleared. The vitamins, zinc, probiotics, and acacia fiber are actives and are not graded. The label says "Children 4 years and older, chew one (1) tablet daily under adult supervision," so the minimum age is 4. It contains xylitol, which is toxic to dogs: keep it away from pets.',
  },
  {
    id: 'physicianschoice-b226-kids-probiotic-chewable-60',
    productName: "Physician's Choice Kids Probiotic Chewable Tart Berry (60 chewable tablets)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b226-kids-probiotic-chewable-60',
    audience: KIDS,
    minAge: 4,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297210',
    activeIngredients: [
      { name: 'Vitamin C (from Ascorbic Acid)', strength: '45 mg (50% DV)' },
      { name: 'Vitamin D3 (as Cholecalciferol)', strength: '15 mcg (75% DV)' },
      { name: 'Zinc (from Zinc Glycinate)', strength: '2.5 mg (23% DV)' },
      {
        name: 'Probiotic Blend',
        strength:
          '22 mg: Lactobacillus acidophilus, Lacticaseibacillus rhamnosus GG, Bacillus coagulans, Bifidobacterium breve, Ligilactobacillus salivarius, Lactiplantibacillus plantarum, Bifidobacterium lactis',
      },
      { name: 'Organic Acacia Fiber', strength: '145 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_KIDS_CHEW_60, KIDS_CHEW_FLAGS),
    verdict: verdictFromFlags(KIDS_CHEW_FLAGS),
    retailers: ['Vitacost', 'Walmart'],
    sourcesGeneral: [
      `Panel ${PANEL_KIDS_CHEW_60}. Serving 1 Chewable Tablet; Servings Per Container 60. Other ingredients verbatim: ${OI_KIDS_CHEW} Vitacost 160665 $27.51 available; Walmart ip/8930669317 $26.97 sold by Physician's Choice in stock. UPC 850048297210 check digit OK.`,
    ],
    honestNote:
      'Avoid. The grade comes only from the other ingredients, and palm oil in a chewable tablet is an Avoid token (founder lock t120u). That alone sets Avoid. Xylitol and the unnamed "natural flavor" are Caution. Beet juice color, malic acid, rice hull concentrate, citric acid, rebaudioside M (stevia), gum arabic, sunflower oil (Cleared in a chewable, t121u), and spirulina color (Cleared, t121u) are Cleared. The vitamins, zinc, probiotics, and acacia fiber are actives and are not graded. The label says "Children 4 years and older, chew one (1) tablet daily under adult supervision," so the minimum age is 4. It contains xylitol, which is toxic to dogs: keep it away from pets. This is the 60-count bottle of the same formula.',
  },
];

const ROWS = BATCH226_KYR6C_T122U;

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

if (ROWS.length !== 4) throw new Error(`batch226 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch226 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 0 || verdictTally.caution !== 2 || verdictTally.avoid !== 2) {
  throw new Error(`batch226 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch226 upc ${record.id}`);
  if (!record.honestNote?.trim()) throw new Error(`batch226 missing note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch226 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch226 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch226 verdict ${record.id}`);
}
