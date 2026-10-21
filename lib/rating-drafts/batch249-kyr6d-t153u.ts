// DRAFT / not verified / batch 249 KYR6-d. Continuation after batch248. Does not repeat 796 or 805.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const OTC = 'OTC' as const;

const METH = {
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  caramel:
    'Methodology §5 High-risk (caramel color, class unnamed — ammonia-process 4-MEI; IARC possibly carcinogenic).',
  aspartame:
    'Methodology §5 High-risk (aspartame — IARC 2B 2023; founder strict-sweetener lock stays Avoid).',
  yellow6:
    'Methodology §5 High-risk (FD&C Yellow No. 6 / sunset yellow — synthetic dye; EU activity-and-attention warning).',
  red40:
    'Methodology §5 High-risk (FD&C Red No. 40 aluminum lake / allura red — synthetic dye; EU activity-and-attention warning).',
  blue1:
    'Methodology §5 High-risk (FD&C Blue No. 1 aluminum lake / brilliant blue — synthetic dye; EU activity-and-attention warning).',
  sorbitol:
    'Methodology §5 Limited (oral sorbitol — sugar alcohol; does not count toward the t137u stack).',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  acek:
    'Methodology §5 Limited (acesulfame potassium — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  sio2:
    'Methodology §5 Caution (silicon dioxide — nanoparticle cap; 0-point; does not count toward the t137u stack).',
  dextrates:
    'Methodology §5 Caution (dextrates — bare token, Sept 25, 2026; distinct from Cleared dextrates hydrated).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named starch).',
  palm: 'Methodology §5 High-risk (palm oil in a gummy — seed/industrial oil base; worst half of vegetable oil (palm and coconut)).',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin — counts toward the t137u stack).',
  natArt:
    'Methodology §5 Limited (natural and artificial flavors — undisclosed mixture; a named taste does not clear the artificial half).',
  gelatin: 'Methodology §5 Cleared (gelatin — capsule base).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate — phosphate-salt filler).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  sugar: 'Methodology §5 Caution (bare sugar — the label does not name cane sugar).',
  tapiocaSyrup: 'Methodology §5 Cleared (tapioca syrup — food syrup).',
  water: 'Methodology §5 Cleared (purified water).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  naturalFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — unnamed natural flavor; not the Limited “natural flavors” mixture).',
  tapiocaStarch: 'Methodology §5 Cleared (tapioca starch — named starch).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  coconut:
    'Methodology §5 Cleared (coconut oil, named, any form). Founder override Oct 17, 2026 t111u; the Sept 25, 2026 gummy-Avoid restamp is struck.',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_BLADDER =
  'AZO brand page https://azoproducts.com/products/azo-bladder-control-with-go-less and iHerb in stock (54 count https://www.iherb.com/pr/azo-bladder-control-54-capsules-300-mg-per-capsule/63593; 72 count UPC 787651760056). Same other-ingredient line. PureFormulas 54 in stock matches. Fry’s (Kroger) 54 shows pickup. Contains soy is a disclosure, not an other-ingredient token';
const PANEL_DAY =
  'AZO brand page https://azoproducts.com/products/azo-menopause-relief-daytime-gummies (30 gummies, available) and Vitacost, UPC 787651760599, same other-ingredient line. Walmart item 14349054446 sold by Walmart.com, arrives today. Target TCIN 93198627 lists pickup and delivery';
const PANEL_NIGHT =
  'AZO brand page https://azoproducts.com/products/azo-menopause-relief-nighttime-gummies (30 gummies, available), barcode 787651760612, and Instacart Walmart listing with the same other-ingredient line. Amazon model 787651760612. Target TCIN 94742527 lists pickup and delivery';
const PANEL_CHEW =
  'Benefiber brand page https://www.benefiber.com/fiber-supplement-products/benefiber-chewable/ (100 count) and Amazon ASIN B07Q1SYTQS in stock, UPC 886790738954, same ingredient line. Thrifty White in stock with that UPC. Carewell in stock with the same line';
const PANEL_MM =
  'DailyMed setid a9824f73-5ea2-4a65-a926-3a57561441b8 (sugar-free orange 30 packets) and Thrifty White in stock, UPC 030772057124, same inactive line. Walmart item 1835993212, 30 packets, sold by Walmart.com, shipping arrives tomorrow. Stop & Shop prints the same ingredient line';

const OIL_NOTE =
  'Vegetable oil (palm and coconut) names two oils on one line. Coconut oil is Cleared in a gummy. Palm oil is Not clean when it is the base of a gummy. That is the form this app flags. Palm oil is why this row is Avoid.';

function bladderFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Gelatin', 'cleared', 'gelatin'),
    flag(panel, 'Titanium dioxide (color)', 'high', 'tio2'),
    flag(panel, 'Caramel (color)', 'high', 'caramel'),
    flag(panel, 'Maltodextrin', 'limited', 'maltodextrin'),
    flag(panel, 'Dicalcium phosphate', 'cleared', 'dicalcium'),
    flag(panel, 'Microcrystalline cellulose', 'cleared', 'mcc'),
    flag(panel, 'Magnesium stearate', 'cleared', 'magStearate'),
  ];
}

function gummyFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Sugar', 'moderate', 'sugar'),
    flag(panel, 'Tapioca syrup', 'cleared', 'tapiocaSyrup'),
    flag(panel, 'Purified water', 'cleared', 'water'),
    flag(panel, 'Pectin', 'cleared', 'pectin'),
    flag(panel, 'Citric acid', 'cleared', 'citric'),
    flag(panel, 'Natural flavor', 'moderate', 'naturalFlavor'),
    flag(panel, 'Tapioca starch', 'cleared', 'tapiocaStarch'),
    flag(panel, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
    flag(panel, 'Palm oil', 'high', 'palm'),
    flag(panel, 'Coconut oil', 'cleared', 'coconut'),
    flag(panel, 'Carrot and blueberry juices (color)', 'cleared', 'juice'),
    flag(panel, 'Carnauba wax', 'cleared', 'carnauba'),
  ];
}

export const BATCH249_KYR6D_T153U: RatingRecord[] = [
  {
    id: 'azo-b249-bladder-control-54',
    productName: 'AZO Bladder Control with Go-Less (54 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b249-bladder-control',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760025',
    activeIngredients: [
      { name: 'Go-Less blend (pumpkin seed extract and soy germ extract)', strength: '300 mg' },
    ],
    inactiveIngredients: bladderFlags(PANEL_BLADDER),
    verdict: 'avoid',
    retailers: ['AZO', 'iHerb', 'PureFormulas', "Fry's"],
    sourcesGeneral: [
      'Pumpkin seed extract and soy germ extract are the supplement-facts blend and are not graded. Titanium dioxide and unnamed caramel color are Avoid, so the row is Avoid. Maltodextrin is one Limited token and does not change that. The 72-count is the same formula on its own row. UPC 787651760025 check digit OK.',
    ],
  },
  {
    id: 'azo-b249-bladder-control-72',
    productName: 'AZO Bladder Control with Go-Less (72 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b249-bladder-control',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760056',
    activeIngredients: [
      { name: 'Go-Less blend (pumpkin seed extract and soy germ extract)', strength: '300 mg' },
    ],
    inactiveIngredients: bladderFlags(PANEL_BLADDER),
    verdict: 'avoid',
    retailers: ['AZO', 'iHerb'],
    sourcesGeneral: [
      'Same other-ingredient line as the 54-count. iHerb 72-count is in stock and prints UPC 787651760056. Titanium dioxide and unnamed caramel color are Avoid. UPC check digit OK. This is not a 2-pack.',
    ],
  },
  {
    id: 'azo-b249-menopause-day-gummy-30',
    productName: 'AZO Menopause Relief Daytime Gummies (30 gummies)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b249-menopause-day-gummy-30',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760599',
    activeIngredients: [{ name: 'Genistein', strength: '30 mg' }],
    inactiveIngredients: gummyFlags(PANEL_DAY),
    verdict: 'avoid',
    honestNote: OIL_NOTE,
    retailers: ['AZO', 'Vitacost', 'Walmart', 'Target'],
    sourcesGeneral: [
      'Genistein is the supplement-facts ingredient and is not graded. Palm oil in the gummy is Avoid. Coconut oil on the same line is Cleared and did not clear the row. The 60-count is a 2-pack and is not a row. UPC 787651760599 check digit OK.',
    ],
  },
  {
    id: 'azo-b249-menopause-night-gummy-30',
    productName: 'AZO Menopause Relief Nighttime Gummies (30 gummies)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b249-menopause-night-gummy-30',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760612',
    activeIngredients: [
      { name: 'Genistein', strength: '30 mg' },
      { name: 'Melatonin', strength: '1 mg' },
    ],
    inactiveIngredients: gummyFlags(PANEL_NIGHT),
    verdict: 'avoid',
    honestNote: OIL_NOTE,
    retailers: ['AZO', 'Walmart', 'Target', 'Amazon'],
    sourcesGeneral: [
      'Genistein and melatonin are supplement-facts ingredients and are not graded. The other-ingredient line matches the daytime gummies, including palm and coconut oil. Palm oil in the gummy is Avoid. The 60-count is a 2-pack and is not a row. UPC 787651760612 check digit OK.',
    ],
  },
  {
    id: 'metamucil-b249-sf-orange-packets-30',
    productName: 'Metamucil 4-in-1 On-the-Go, Sugar-Free Orange (30 packets)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b249-sf-orange-packets-30',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '030772057124',
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g fiber per packet' }],
    inactiveIngredients: [
      flag(PANEL_MM, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_MM, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_MM, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_MM, 'Aspartame', 'high', 'aspartame'),
      flag(PANEL_MM, 'FD&C Yellow No. 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White', 'Walmart', 'Stop & Shop'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Aspartame stays Avoid (IARC 2B and the founder sweetener lock). FD&C Yellow No. 6 is Avoid. Those two highs set the row. Maltodextrin and the natural-and-artificial flavor are Limited and do not change it. This is not a 3+ Limited stack. The real-sugar orange packet is a different formula and is not this row. UPC 030772057124 check digit OK. NDC 37000-0024 is not the UPC.',
    ],
  },
  {
    id: 'benefiber-b249-chewable-100',
    productName: 'Benefiber Chewable Tablets, Assorted Fruit (100 tablets)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b249-chewable-100',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790738954',
    activeIngredients: [{ name: 'Wheat dextrin', strength: '3 g fiber per 3 tablets' }],
    inactiveIngredients: [
      flag(PANEL_CHEW, 'Sorbitol', 'limited', 'sorbitol'),
      flag(PANEL_CHEW, 'Corn starch', 'cleared', 'cornStarch'),
      flag(PANEL_CHEW, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_CHEW, 'Dextrates', 'moderate', 'dextrates'),
      flag(PANEL_CHEW, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_CHEW, 'Natural and artificial flavor', 'limited', 'natArt'),
      flag(PANEL_CHEW, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_CHEW, 'Silicon dioxide', 'moderate', 'sio2'),
      flag(PANEL_CHEW, 'Sucralose', 'limited', 'sucralose'),
      flag(PANEL_CHEW, 'Aspartame', 'high', 'aspartame'),
      flag(PANEL_CHEW, 'Acesulfame potassium', 'limited', 'acek'),
      flag(PANEL_CHEW, 'FD&C Red No. 40 aluminum lake', 'high', 'red40'),
      flag(PANEL_CHEW, 'FD&C Yellow No. 6 aluminum lake', 'high', 'yellow6'),
      flag(PANEL_CHEW, 'FD&C Blue No. 1 aluminum lake', 'high', 'blue1'),
    ],
    verdict: 'avoid',
    retailers: ['Benefiber', 'Amazon', 'Thrifty White', 'Carewell'],
    sourcesGeneral: [
      'Wheat dextrin is the fiber active and is not graded. Aspartame and the three dye lakes are Avoid, so the row is Avoid. Sucralose, acesulfame potassium, and the natural-and-artificial flavor are Limited. Sorbitol is Limited and does not count toward the stack. Silicon dioxide is the zero-point Caution cap. The dye and aspartame highs set the grade, so this is not a 3+ Limited stack note. Soy in the flavor parentheses is a disclosure, not a separate token. UPC 886790738954 check digit OK.',
    ],
  },
];

const ROWS = BATCH249_KYR6D_T153U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch249 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch249 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch249 upc ${record.id}`);
  const stack =
    computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).cause ===
    'limited_stack';
  if (stack && !record.honestNote?.includes('Limited')) {
    throw new Error(`batch249 missing stack note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch249 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch249 blank source ${ingredient.name}`);
    if (/pending dailymed review/i.test(ingredient.source) || /pending dailymed review/i.test(plainIngredientWhy(ingredient) ?? '')) {
      throw new Error(`batch249 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch249 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
