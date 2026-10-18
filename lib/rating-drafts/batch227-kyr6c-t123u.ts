// DRAFT / not verified / batch 227 KYR6-c (t123u Physician's Choice WRITE).
// Three packs — grade from OI only; honestNote required.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = "Physician's Choice";
const DIGESTIVE = 'Digestive';
const VITAMINS = 'Vitamins';

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
  carnauba: 'Methodology §5 Caution (Carnauba wax, exact token; LOCKED Sept 25, 2026).',
  lecithin: 'Methodology §5 Cleared (lecithin, sunflower).',
  riceFlour: 'Methodology §5 Caution (rice flour, exact token; LOCKED Sept 15, 2026).',
  vegCapGellan:
    'Methodology §5 Cleared (Vegetable capsule (hypromellose, gellan gum), HPMC / veg-cap family; founder lock Oct 17, 2026 t118u).',
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
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const PANEL_PROB_GUM_60 =
  'https://target.scene7.com/is/image/Target/GUEST_7bf9a931-46b6-41ae-84f0-9582b1e8408f (60-ct facts; OI from Kroger https://www.kroger.com/product/images/xlarge/top/0085004829759)';
const PANEL_COLOSTRUM_30 = 'Walmart ip/20319317124 gallery back panel v3.0.0 (30 servings, Net Wt 60 g)';
const PANEL_60B_ADVANCED =
  'https://cdn.shopify.com/s/files/1/2677/6462/files/60A_CAROUSEL_7_30CT_AMZ_3.0.0.png';

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
  ['carnauba wax', 'limited', 'carnauba'],
];

const PC_COLOSTRUM: FlagSpec[] = [['Sunflower lecithin', 'cleared', 'lecithin']];

const PC_PREBIO: FlagSpec[] = [
  ['Rice flour', 'limited', 'riceFlour'],
  ['vegetable capsule (hypromellose, gellan gum)', 'cleared', 'vegCapGellan'],
  ['rice hull concentrate', 'cleared', 'riceHullConc'],
  ['gum arabic', 'cleared', 'gumArabic'],
  ['sunflower oil', 'cleared', 'sunflowerFill'],
];

const OI_60B_ADVANCED =
  'Rice flour, vegetable capsule (hypromellose, gellan gum), rice hull concentrate, gum arabic, and sunflower oil.';

export const BATCH227_KYR6C_T123U: RatingRecord[] = [
  {
    id: 'physicianschoice-b227-probiotic-gummies-60',
    productName: "Physician's Choice Probiotic Gummies Watermelon (60 gummies)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b227-probiotic-gummies-60',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297593',
    activeIngredients: [
      { name: 'Vitamin D (as D3 cholecalciferol)', strength: '20 mcg (800 IU) (100% DV)' },
      { name: 'Bacillus subtilis (1 Billion CFUs)', strength: '10 mg' },
      { name: 'Dietary Fiber', strength: '3 g per 2 gummies (chicory root fiber base)' },
    ],
    inactiveIngredients: buildOi(PANEL_PROB_GUM_60, PROB_GUM_FLAGS),
    verdict: verdictFromFlags(PROB_GUM_FLAGS),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel (60-ct) Target GUEST_7bf9a931-46b6-41ae-84f0-9582b1e8408f: Serving 2 Gummies; Servings Per Container 30. OI verbatim from Kroger 60 CT label image 0085004829759 (top) and Target A-1010622919 ingredients spec: ${OI_PROB_GUM} Kroger art prints "Servings Per Container 60" (art typo; 60 gummies ÷ 2 = 30). physicianschoice.com/probiotic-gummies "60 Count" $19.99 available; Walmart ip/18803719754 $14.42 sold by Physician's Choice. UPC 850048297593 = Walmart = Target = Kroger CDN; check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Two of them dock it to Caution: an unnamed "natural flavor" (the flavor rule docks unnamed flavors) and carnauba wax (an exact Caution token). Chicory root fiber, pectin, tapioca starch, agar agar, citric acid, trisodium citrate, and black carrot color are Cleared. There is no sugar or sugar alcohol, and the color comes from black carrot, not a dye. The vitamin D (100% DV), the Bacillus subtilis probiotic, and the fiber are actives and are not graded. Watermelon flavor. Serving is 2 gummies daily (30 servings per bottle). Adults; the label prints no minimum age. About 3 g of chicory fiber per serving may cause gas at first.',
  },
  {
    id: 'physicianschoice-b227-colostrum-gold-30-servings',
    productName: "Physician's Choice Colostrum Gold Powder Unflavored (30 servings, 60 g)",
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'physicianschoice-b227-colostrum-gold-30-servings',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297708',
    activeIngredients: [
      { name: 'Whole Bovine Colostrum', strength: '2 g' },
      {
        name: 'Immunoglobulin G (IgG)',
        strength: '2 g (as printed, indented under Whole Bovine Colostrum)',
      },
    ],
    inactiveIngredients: buildOi(PANEL_COLOSTRUM_30, PC_COLOSTRUM),
    verdict: verdictFromFlags(PC_COLOSTRUM),
    retailers: ["Physician's Choice", 'Walmart'],
    sourcesGeneral: [
      `Panel: ${PANEL_COLOSTRUM_30}: Serving 1 Heaping Scoop (2 g); Servings Per Container about 30; Net Wt 60 g (2.12 oz). Other ingredients verbatim: Sunflower lecithin. Contains: Milk. physicianschoice.com/colostrum-gold-powder "30 Servings" $57.10 available (variant barcode 850048297708); Walmart ip/20319317124 sold by Physician's Choice. UPC 850048297708 = brand barcode = Walmart; check digit OK.`,
    ],
    honestNote:
      'Clean: the only other ingredient is sunflower lecithin, a Cleared emulsifier. The colostrum is the active and is not graded. Allergen: Contains Milk (bovine colostrum), so it is not for people with a milk allergy. The panel prints Immunoglobulin G (IgG) 2 g under 2 g of colostrum, while the front badge says 20% IgG (about 0.4 g per scoop). That line looks like a label error, but it is copied as printed and does not affect the grade. Serving is 1 heaping scoop (2 g) daily. This is the smaller 60 g tub of the same formula as the 60-serving size. Adults; the label prints no minimum age.',
  },
  {
    id: 'physicianschoice-b227-60b-advanced-probiotic-30',
    productName: "Physician's Choice 60 Billion Advanced Probiotic (30 capsules)",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'physicianschoice-b227-60b-advanced-probiotic-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '850048297982',
    activeIngredients: [
      {
        name: 'Probiotic Blend (Total Probiotic Activity 60 Billion CFUs): Bifidobacterium lactis HN019™, Lacticaseibacillus casei, Lactobacillus acidophilus, Lacticaseibacillus paracasei, Lactococcus lactis, Ligilactobacillus salivarius, Lactiplantibacillus plantarum, Bifidobacterium lactis Bl-04®, Bifidobacterium bifidum, Bifidobacterium longum, Bifidobacterium breve, Lactobacillus bulgaricus',
        strength: '200 mg',
      },
      {
        name: 'Prebiotic Blend: Organic Inulin (from Jerusalem Artichoke), Organic Acacia Fiber, Organic Inulin (from Chicory)',
        strength: '150 mg',
      },
      { name: 'Heat-Treated Lactobacillus gasseri CP2305', strength: '20 mg' },
    ],
    inactiveIngredients: buildOi(PANEL_60B_ADVANCED, PC_PREBIO),
    verdict: verdictFromFlags(PC_PREBIO),
    retailers: ["Physician's Choice", 'eBay'],
    sourcesGeneral: [
      `Panel ${PANEL_60B_ADVANCED}: Serving 1 Capsule; Servings Per Container 30. Other ingredients verbatim: ${OI_60B_ADVANCED} physicianschoice.com/60-billion-advanced-probiotic $47.05 available (variant barcode 850048297982); eBay 188999074477 New, Buy It Now, seller energizingsolutions, EXP 7/1/28, item-specifics UPC 850048297982. UPC check digit OK.`,
    ],
    honestNote:
      'The grade comes only from the other ingredients. Rice flour is an exact Caution token: unspecified rice ingredients can carry arsenic, and the label names no source or testing. The capsule (hypromellose with gellan gum), rice hull concentrate, gum arabic, and sunflower oil fill are Cleared. This is a different formula from the regular 60 Billion Probiotic. It has 12 strains and adds a heat-treated (non-live) Lactobacillus gasseri CP2305 postbiotic. Those are actives and are not graded. Serving is 1 capsule daily. Adults; the label prints no minimum age.',
  },
];

const ROWS = BATCH227_KYR6C_T123U;

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

if (ROWS.length !== 3) throw new Error(`batch227 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch227 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 1 || verdictTally.caution !== 2 || verdictTally.avoid !== 0) {
  throw new Error(`batch227 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch227 upc ${record.id}`);
  if (!record.honestNote?.trim()) throw new Error(`batch227 missing note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch227 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch227 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch227 verdict ${record.id}`);
}
