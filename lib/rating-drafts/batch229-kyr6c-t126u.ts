// DRAFT / not verified / batch 229 KYR6-c (t126u Physician's Choice WRITE).
// Three packs — grade from OI only; honestNote required.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
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
  vegCapGellan:
    'Methodology §5 Cleared (Vegetable capsule (hypromellose, gellan gum), HPMC / veg-cap family; founder lock Oct 17, 2026 t118u).',
  riceHullConc: 'Methodology §5 Cleared (rice hull concentrate, rice-hull family; t119u).',
  gumArabic: 'Methodology §5 Cleared (gum arabic, exact token).',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as non-gummy capsule / tablet fill; LOCKED Sept 22, 2026).',
  caneSugar: 'Methodology §5 Cleared (cane sugar).',
  vegJuiceColor: 'Methodology §5 Cleared (Vegetable Juice (Color)).',
  steviaLeaf: 'Methodology §5 Caution (stevia extract / stevia leaf extract).',
  turmericColor: 'Methodology §5 Cleared (Turmeric (Color), trace color use; t75u).',
  spirulinaExtract:
    'Methodology §5 Caution/Limited (Spirulina extract as color). The t121u spirulina (color) Cleared override does NOT extend to spirulina extract.',
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

const PANEL_MOOD =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/MSP-30CT-CAROUSEL_6_3.1.0.jpg (30CT art)';

const OI_MOOD =
  'Vegetable capsule (hypromellose, gellan gum), rice hull concentrate, gum arabic, and sunflower oil.';

const MOOD_FLAGS: FlagSpec[] = [
  ['Vegetable capsule (hypromellose, gellan gum)', 'cleared', 'vegCapGellan'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

const PANEL_STICK =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/EMF-SP-CAROUSEL_8.jpg (variety carton; graded by worst stick — Cucumber Lime)';

const PC_EASY_CL: FlagSpec[] = [
  ['Cane sugar', 'cleared', 'caneSugar'],
  ['citric acid', 'cleared', 'citric'],
  ['natural flavor', 'limited', 'natFlavor'],
  ['stevia leaf extract', 'limited', 'steviaLeaf'],
  ['turmeric (color)', 'cleared', 'turmericColor'],
  ['spirulina extract (color)', 'limited', 'spirulinaExtract'],
  ['vegetable juice (color)', 'cleared', 'vegJuiceColor'],
];

const PANEL_PROB_GUM_90 =
  'Per-serving panel identical to physicianschoice-b227-probiotic-gummies-60 (Target GUEST_7bf9a931-46b6-41ae-84f0-9582b1e8408f; OI from Kroger 0085004829759 top)';

const OI_PROB_GUM =
  'Chicory root fiber, pectin, tapioca starch, agar agar, natural flavor, citric acid, trisodium citrate, black carrot (for color), and carnauba wax.';

const PROB_GUM_FLAGS: FlagSpec[] = [
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

export const BATCH229_KYR6C_T126U: RatingRecord[] = [
  {
    id: 'physicianschoice-b229-mood-support-probiotic-30',
    productName: "Physician's Choice Mood Support Probiotic (30 capsules)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b229-mood-support-probiotic-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297340',
    activeIngredients: [
      {
        name: 'Folate (as L-5-Methyltetrahydrofolate, calcium salt)',
        strength: '1,200 mcg DFE (300% DV)',
      },
      { name: 'Vitamin B12 (as methylcobalamin)', strength: '48 mcg (2000% DV)' },
      {
        name: 'Prebiotic Blend: Resistant Potato Starch, Organic Acacia Fiber, Organic Inulin (from Agave)',
        strength: '150 mg',
      },
      { name: 'Ashwagandha Root and Leaf Extract (Sensoril®)', strength: '125 mg' },
      {
        name: 'Probiotic Blend (Total Probiotic Activity 20 Billion CFUs): Lacticaseibacillus paracasei Lpc-37®, Lactobacillus plantarum DR7®',
        strength: '57 mg',
      },
    ],
    inactiveIngredients: buildOi(PANEL_MOOD, MOOD_FLAGS),
    verdict: verdictFromFlags(MOOD_FLAGS),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Founder ruling (Brandon, t126u): current panel and UPC confirmed; overrides the earlier b227 UPC-conflict hold. Panel ${PANEL_MOOD}: Serving 1 Capsule; Servings Per Container 30. OI verbatim: ${OI_MOOD} physicianschoice.com/mood-support-probiotic "1-Pack" $34.97 available; Walmart ip/16471657204 $29.97 sold by Physician's Choice. UPC 850048297340 = Walmart = eBay 117448645121 item specifics (founder-confirmed); check digit OK.`,
    ],
    honestNote:
      'Clean. All four other ingredients are Cleared: a plant-cellulose capsule (hypromellose with gellan gum), rice hull concentrate as a natural flow agent, gum arabic, and sunflower oil as the capsule fill. It has no rice flour, so unlike most Physician\'s Choice probiotics it is not docked to Caution. The actives are not graded, but you should know what they are. The capsule contains ashwagandha (Sensoril, 125 mg), which is commonly flagged for pregnancy and thyroid conditions. Folate is 300% DV and B12 is 2000% DV, so anyone also taking a B-complex should count them. Serving is 1 capsule daily. For adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b229-easy-mix-fiber-stick-packs-18',
    productName:
      "Physician's Choice Easy Mix Fiber Stick Packs Variety (18 stick packs: 6 Unflavored, 6 Cucumber Lime, 6 Peach Mango)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b229-easy-mix-fiber-stick-packs-18',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297777',
    activeIngredients: [
      {
        name: 'EasyMix™ Prebiotic Fiber Blend: Soluble Corn Fiber, Guar Fiber',
        strength: '6.7 g per stick (Unflavored, Cucumber Lime, Peach Mango)',
      },
    ],
    inactiveIngredients: buildOi(PANEL_STICK, PC_EASY_CL),
    verdict: verdictFromFlags(PC_EASY_CL),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Founder ruling (Brandon, t126u): the one-UPC three-flavor variety carton (Unflavored, Cucumber Lime, Peach Mango) is a single row, not a multipack; current panel and UPC confirmed; overrides the earlier b225 variety-carton hold. Panel https://cdn.shopify.com/s/files/1/2677/6462/files/EMF-SP-CAROUSEL_8.jpg: 1 stick pack; 6 servings per flavor; EasyMix Prebiotic Fiber Blend 6.7 g (Soluble Corn Fiber, Guar Fiber). Unflavored (6.7 g): No other ingredients listed on panel. Cucumber Lime (9.4 g) OI verbatim: Cane sugar, citric acid, natural flavor, stevia leaf extract, turmeric (color), spirulina extract (color), and vegetable juice (color). Peach Mango (9.5 g) OI verbatim: Cane sugar, citric acid, vegetable juice (color), natural flavor, and stevia leaf extract. Graded by the worst stick (Cucumber Lime). physicianschoice.com/easy-mix-fiber-stick-packs $28.20 available; Walmart ip/20262717788 $23.97 sold by Physician's Choice. UPC 850048297777 = brand variant barcode = Walmart; check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients and is set by the worst stick in the box. That stick is Cucumber Lime. Its unnamed "natural flavor" (the flavor rule), stevia leaf extract (a Caution sweetener extract), and spirulina extract used as color (Caution; the "spirulina (color)" clearance does not cover spirulina extract) dock it to Caution. Peach Mango is docked by the same natural flavor and stevia leaf extract. In both flavors, cane sugar, citric acid, turmeric color, and vegetable juice color are Cleared. The 6 Unflavored sticks have no other ingredients and would be Clean on their own. The colors come from foods, not synthetic dyes. Each flavored stick has 2 g of added cane sugar; Unflavored has none. The fiber blend (soluble corn fiber and guar fiber, 6 g fiber per stick) is the active and is not graded. Serving is 1 stick stirred into 8–10 oz of water daily. 6 g of new fiber a day can cause gas or bloating at first. For adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b229-probiotic-gummies-90',
    productName: "Physician's Choice Probiotic Gummies Watermelon (90 gummies)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b229-probiotic-gummies-90',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297265',
    activeIngredients: [
      { name: 'Vitamin D (as D3 cholecalciferol)', strength: '20 mcg (800 IU) (100% DV)' },
      { name: 'Bacillus subtilis (1 Billion CFUs)', strength: '10 mg' },
      { name: 'Dietary Fiber', strength: '3 g per 2 gummies (chicory root fiber base)' },
    ],
    inactiveIngredients: buildOi(PANEL_PROB_GUM_90, PROB_GUM_FLAGS),
    verdict: verdictFromFlags(PROB_GUM_FLAGS),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Founder ruling (Brandon, t126u): current panel and UPC confirmed; 90-ct per-serving panel identical to the 60-ct; overrides the earlier b225/b227 UPC hold. Panel (per serving) as physicianschoice-b227-probiotic-gummies-60 (Target GUEST_7bf9a931-46b6-41ae-84f0-9582b1e8408f; OI from Kroger 0085004829759 top): Serving 2 Gummies; Servings Per Container 45 (90 ct). OI verbatim: ${OI_PROB_GUM} physicianschoice.com/probiotic-gummies "90 Count" $25.97 available; Walmart ip/19550415900 $14.59 sold by Physician's Choice, in stock. UPC 850048297265 = Walmart (founder-confirmed); check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Two of them dock it to Caution: an unnamed "natural flavor" (the flavor rule docks unnamed flavors) and carnauba wax (an exact Caution token). Chicory root fiber, pectin, tapioca starch, agar agar, citric acid, trisodium citrate, and black carrot color are Cleared. There is no sugar or sugar alcohol, and the color comes from black carrot, not a dye. The vitamin D (100% DV), the Bacillus subtilis probiotic, and the fiber are actives and are not graded. Watermelon flavor. Serving is 2 gummies daily (45 servings per 90-count bottle). This is the same formula as the 60-count bottle. For adults; the label prints no minimum age. About 3 g of chicory fiber per serving may cause gas at first.',
  },
];

const ROWS = BATCH229_KYR6C_T126U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch229 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch229 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
// t137u: hardcoded tally assert removed; run scripts/t135u-fix-tallies.ts after rescan.

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch229 upc ${record.id}`);
  if (!record.honestNote?.trim()) throw new Error(`batch229 missing note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch229 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch229 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch229 verdict ${record.id}`);
}
