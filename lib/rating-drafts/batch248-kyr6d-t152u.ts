// DRAFT / not verified / batch 248 KYR6-d. Continuation after batch247. No honestNote.
// Grades from other ingredients only. Does not repeat batch247 UPCs.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const OTC = 'OTC' as const;

const METH = {
  peg: 'Methodology §5 Limited (PEGs / polyethylene glycol — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity, not a known hazard).',
  vanilla:
    'Methodology §5 Caution (Natural vanilla powder — t150u Oct 21, 2026; vanilla flavor row; natural tie-breaker; does not stack).',
  sugar: 'Methodology §5 Caution (bare sugar — the label does not name cane sugar).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  glucose:
    'Methodology §5 Cleared (glucose syrup — acceptable sweetener; distinct from Caution bare glucose).',
  water: 'Methodology §5 Cleared (water / purified water).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers/buffers).',
  citrate:
    'Methodology §5 Cleared (sodium citrate dihydrate / trisodium citrate dihydrate — citrate-salt class).',
  coconut:
    'Methodology §5 Cleared (coconut oil, named, any form). Founder override Oct 17, 2026 t111u; the Sept 25, 2026 gummy-Avoid restamp is struck.',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval).',
  gelatin: 'Methodology §5 Cleared (gelatin — capsule base).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate — phosphate-salt filler).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose-family disintegrant).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  hpmc: 'Methodology §5 Cleared (Hydroxypropyl Methylcellulose — t102u HPMC / hypromellose family).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized corn starch — named starch).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_PRE =
  'AZO brand page https://azoproducts.com/products/azo-daily-pre-menopause-support-capsules (30 capsules), Target TCIN 93198629 in stock, Meijer in stock at Alpine, and Thrifty White in stock (73), UPC 787651760582. Same other-ingredient line. The brand comma between croscarmellose sodium and stearic acid is present on Target and Meijer; Thrifty White omits that comma';
const PANEL_GUM =
  'AZO brand page https://azoproducts.com/products/azo-cranberry-gummies (72 gummies) and Target TCIN 81782549 in stock. Target, Vitacost, and iHerb print trisodium citrate dihydrate as one salt; the brand splits that name across “Trisodium Citrate, Citrate Dihydrate.” Coating is coconut oil and carnauba wax. UPC 787651760100';
const PANEL_MAX =
  'AZO brand page https://azoproducts.com/products/azo-urinary-pain-relief-maximum-strength-tablets, Target TCIN 16293312 in stock, and Greens Nutrition in stock. DailyMed setid b4874fe2 matches. UPC 787651241531. “May also contain corn starch” is optional and is not a second formula';
const PANEL_BENE =
  'Benefiber brand page https://www.benefiber.com/fiber-supplement-products/benefiber-powder/ (wheat dextrin) and Thrifty White in stock (9), ingredients line is wheat dextrin only, UPC 886790218302. Walmart item 50259010, 125 servings / 17.6 oz, sold by Walmart.com, in stock, made with wheat dextrin';

export const BATCH248_KYR6D_T152U: RatingRecord[] = [
  {
    id: 'azo-b248-pre-menopause-30',
    productName: 'AZO Daily Pre-Menopause Support Capsules (30 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b248-pre-menopause-30',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760582',
    activeIngredients: [
      { name: 'Black Cohosh Root Extract', strength: '40 mg' },
      { name: 'Soy Isoflavones', strength: '56 mg' },
      { name: 'Cissus quadrangularis Stem and Leaf Extract', strength: '300 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_PRE, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_PRE, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_PRE, 'Dicalcium phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_PRE, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_PRE, 'Stearic acid', 'cleared', 'stearic'),
      flag(PANEL_PRE, 'Natural vanilla powder', 'moderate', 'vanilla'),
      flag(PANEL_PRE, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_PRE, 'Titanium dioxide (color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    retailers: ['AZO', 'Target', 'Meijer', 'Thrifty White'],
    sourcesGeneral: [
      `Supplement-facts botanicals are listed and not graded. Contains soy is a disclosure, not an other-ingredient token. Titanium dioxide is Avoid, so the row is Avoid. Natural vanilla powder is Caution (t150u) and does not stack. The 60-count variant is a 2-pack and is not a row. UPC 787651760582 check digit OK.`,
    ],
  },
  {
    id: 'azo-b248-cranberry-gummy-72',
    productName: 'AZO Cranberry Gummies (72 gummies)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b248-cranberry-gummy-72',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760100',
    activeIngredients: [
      { name: 'Pacran Cranberry (Vaccinium macrocarpon) Whole Fruit Powder', strength: '500 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(PANEL_GUM, 'Glucose syrup (corn)', 'cleared', 'glucose'),
      flag(PANEL_GUM, 'Sugar', 'moderate', 'sugar'),
      flag(PANEL_GUM, 'Water', 'cleared', 'water'),
      flag(PANEL_GUM, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_GUM, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_GUM, 'Trisodium citrate dihydrate', 'cleared', 'citrate'),
      flag(PANEL_GUM, 'Natural flavors', 'limited', 'naturalFlavors'),
      flag(PANEL_GUM, 'Coconut oil', 'cleared', 'coconut'),
      flag(PANEL_GUM, 'Carnauba wax', 'cleared', 'carnauba'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'Target', 'iHerb'],
    sourcesGeneral: [
      `Pacran is the supplement-facts active and is not graded. One Limited token (natural flavors) plus bare sugar makes the row Caution. Coconut oil in the gummy coating is the t111u Cleared coconut row. Meijer still prints an older line (glucose syrup corn or wheat; vegetable oil coconut and canola). That older line is not this row. UPC 787651760100 check digit OK.`,
    ],
  },
  {
    id: 'azo-b248-urinary-pain-max-24',
    productName: 'AZO Urinary Pain Relief Maximum Strength (24 tablets)',
    brand: 'AZO',
    category: 'Pain & Fever',
    formulaId: 'azo-b248-urinary-pain-max-24',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '787651241531',
    activeIngredients: [{ name: 'Phenazopyridine hydrochloride', strength: '99.5 mg' }],
    inactiveIngredients: [
      flag(PANEL_MAX, 'Carnauba wax', 'cleared', 'carnauba'),
      flag(PANEL_MAX, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_MAX, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PANEL_MAX, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_MAX, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_MAX, 'Polyethylene glycol', 'limited', 'peg'),
      flag(PANEL_MAX, 'Povidone', 'cleared', 'povidone'),
      flag(PANEL_MAX, 'Pregelatinized corn starch', 'cleared', 'pregel'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'Target', 'Greens Nutrition'],
    sourcesGeneral: [
      `Phenazopyridine hydrochloride is the active and is not graded. Polyethylene glycol is the one Limited token (t138u), so the row is Caution. “May also contain corn starch” does not change the grade. This is not the 95 mg Urinary Pain Relief 30-count. UPC 787651241531 check digit OK. DailyMed NDC 49973-247-24 is the 24-count package on this label; NDC is not the UPC.`,
    ],
  },
  {
    id: 'benefiber-b248-powder-125',
    productName: 'Benefiber Original Powder, Unflavored (125 servings / 17.6 oz)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b248-powder-wheat-dextrin',
    audience: ADULT,
    minAge: 6,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790218302',
    activeIngredients: [{ name: 'Wheat dextrin', strength: '3 g fiber per 2 teaspoons' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['Thrifty White', 'Walmart', 'Benefiber'],
    sourcesGeneral: [
      `Wheat dextrin is the only ingredient and it is the fiber active, so there is no other-ingredient token and the row is Clean. Thrifty White in stock, UPC 886790218302, ingredients line is wheat dextrin. Brand page says original powder is wheat dextrin. Walmart item 50259010, 125 servings, 17.6 oz, sold and shipped by Walmart.com, in stock. The 410-teaspoon club pack is not a row. Other counts (76, 124, 250) are not this barcode. Check digit OK.`,
    ],
  },
];

const ROWS = BATCH248_KYR6D_T152U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch248 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch248 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch248 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch248 unexpected honestNote ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch248 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch248 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch248 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
