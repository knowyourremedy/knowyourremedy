// DRAFT / not verified / batch 256 KYR6-d. Does not repeat rows from 796, 805, 806, or 811 through 816.
// t160u: a missing UPC does not stop a write. The strawberry lemonade 36-count has no UPC on the pages that opened.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, limitedStackHonestNoteIfAny } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u.',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  natArt:
    'Methodology §5 Limited (natural and artificial flavors — undisclosed mixture; a named taste does not clear the artificial half).',
  yellow6:
    'Methodology §5 High-risk (FD&C Yellow No. 6 / sunset yellow — synthetic dye; EU activity-and-attention warning).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin — generic starch sweetener; counts toward the t137u stack).',
  aspartame: 'Methodology §5 High-risk (aspartame — IARC 2023 Group 2B).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  beet:
    'Methodology §5 Cleared (beet juice concentrate (color) — fruit and vegetable juice, puree, concentrate, and powder; named vegetable juice as color). Founder lock Oct 15, 2026.',
  rebA:
    'Methodology §5 Limited (rebaudioside a (extracted and purified from natural stevia leaf) — founder lock t158u Oct 21, 2026; counts toward the t137u stack). Organic Rebaudioside A stays Cleared.',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — zero-point Caution cap; does not count toward the Limited stack).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_RS114 =
  'Amazon is in stock, sold by Amazon.com, UPC 037000741343, 114 tablespoons. Meijer is in stock at Alpine and prints the same inactive line';
const PANEL_SF =
  'Amazon, Cub, Thrifty White, Hannaford, and the P&G SmartLabel print Psyllium Husk, Maltodextrin, Citric Acid, Natural and Artificial Orange Flavor, Aspartame, Yellow 6';
const PANEL_CAP =
  'BJ’s product page prints Psyllium Husk, Gelatin and UPC 030772144312. P&G SmartLabel GTIN 00030772144312 prints Gelatin';
const PANEL_LEM =
  'Target listing A-1007139632 is in stock, sold by Hey Pharma, and prints the other-ingredient line. The Benefiber FAQ prints the same line. No 12-digit UPC on either page';

const LEM_INACTIVES: IngredientFlag[] = [
  flag(PANEL_LEM, 'Natural flavors', 'limited', 'natFlavors'),
  flag(PANEL_LEM, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(PANEL_LEM, 'Beet juice concentrate (color)', 'cleared', 'beet'),
  flag(PANEL_LEM, 'Rebaudioside A (extracted and purified from natural stevia leaf)', 'limited', 'rebA'),
  flag(PANEL_LEM, 'Silica', 'moderate', 'silica'),
];

const LEM_NOTE = limitedStackHonestNoteIfAny(LEM_INACTIVES);

export const BATCH256_KYR6D_T160U: RatingRecord[] = [
  {
    id: 'metamucil-b256-real-sugar-orange-114',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Real Sugar Orange (114 count)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b252-real-sugar-orange-72',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '037000741343',
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per rounded tablespoon' }],
    inactiveIngredients: [
      flag(PANEL_RS114, 'Sucrose', 'cleared', 'sucrose'),
      flag(PANEL_RS114, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_RS114, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_RS114, 'Yellow 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['Amazon', 'Meijer'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Yellow 6 is Avoid (synthetic dye; EU activity-and-attention warning). That high sets the row. Natural and artificial orange flavor is one Limited token and does not change it. This is not a 3+ Limited stack. Sucrose is Cleared (t118u). This is the 114-tablespoon / 48.2 oz canister, not the 72-count row. Amazon is in stock, sold by Amazon.com, and prints UPC 037000741343 with sucrose, psyllium husk, citric acid, natural and artificial orange flavor, and Yellow 6. Meijer is in stock at Alpine, $28.99, and prints that same line. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b256-sf-orange-72',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Sugar-Free Orange (72 count)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-sf-orange-powder',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '037000740841',
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per rounded teaspoon' }],
    inactiveIngredients: [
      flag(PANEL_SF, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_SF, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_SF, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_SF, 'Aspartame', 'high', 'aspartame'),
      flag(PANEL_SF, 'Yellow 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['Amazon', 'Cub', 'Thrifty White'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Aspartame is Avoid (IARC 2023 Group 2B). Yellow 6 is also Avoid. Those highs set the row. Maltodextrin and natural and artificial orange flavor are two Limited tokens. This is not a 3+ Limited stack. This is the 72-teaspoon / 15 oz canister. Amazon is in stock, sold by Amazon.com, and prints UPC 037000740841 with that line. Cub has Add to Cart at $22.49, product number 00037000740841, and the same line. Thrifty White is in stock and prints the same line under a conflicting code 370007408414, which fails the UPC check digit. The row keeps 037000740841. The 114-count and 180-count are separate rows on this same formula. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b256-sf-orange-114',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Sugar-Free Orange (114 count)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-sf-orange-powder',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '037000740858',
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per rounded teaspoon' }],
    inactiveIngredients: [
      flag(PANEL_SF, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_SF, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_SF, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_SF, 'Aspartame', 'high', 'aspartame'),
      flag(PANEL_SF, 'Yellow 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White', 'Cub', 'Herbspro'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Aspartame is Avoid (IARC 2023 Group 2B). Yellow 6 is also Avoid. Those highs set the row. Maltodextrin and natural and artificial orange flavor are two Limited tokens. This is not a 3+ Limited stack. This is the 114-teaspoon / 23.3 oz canister, not the 72-count. Thrifty White is in stock (83), $27.48, UPC 037000740858, and prints psyllium husk, maltodextrin, citric acid, natural and artificial orange flavor, aspartame, and Yellow 6. Cub shows the same UPC at $33.29 with that line. Herbspro is in stock at $43.08 and prints the same other-ingredient line. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b256-sf-orange-180',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Sugar-Free Orange (180 count)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-sf-orange-powder',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '037000741367',
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per rounded teaspoon' }],
    inactiveIngredients: [
      flag(PANEL_SF, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_SF, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_SF, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_SF, 'Aspartame', 'high', 'aspartame'),
      flag(PANEL_SF, 'Yellow 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['Amazon', 'Meijer', 'Hannaford'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Aspartame is Avoid (IARC 2023 Group 2B). Yellow 6 is also Avoid. Those highs set the row. Maltodextrin and natural and artificial orange flavor are two Limited tokens. This is not a 3+ Limited stack. This is the 180-teaspoon / 36.8 oz canister. Amazon is in stock and prints UPC 037000741367 with that line. Meijer is in stock at Alpine, $33.99. Hannaford prints the same line on the 36.8 oz can. Cub prints the same line and UPC and is out of stock, so Cub is not the sale proof. P&G SmartLabel GTIN 00037000741367 lists aspartame, Yellow 6, and maltodextrin. UPC check digit OK.',
    ],
  },
  {
    id: 'metamucil-b256-capsules-340',
    productName: 'Metamucil 3-in-1 Fiber Capsules (340 capsules)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b250-capsules-160',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030772144312',
    activeIngredients: [{ name: 'Psyllium husk', strength: '1.8 g soluble fiber per serving' }],
    inactiveIngredients: [flag(PANEL_CAP, 'Gelatin', 'cleared', 'gelatin')],
    verdict: 'clean',
    retailers: ["BJ's", 'ShopRite'],
    sourcesGeneral: [
      'Psyllium husk is the fiber active and is not graded. Gelatin is the only other ingredient and it is Cleared, so the row is Clean. BJ’s lists the 340-count single with UPC 030772144312, estimated delivery, and the line psyllium husk, gelatin. P&G SmartLabel GTIN 00030772144312 names that same 340-capsule bottle and lists gelatin. ShopRite has Add to Cart at $40.99 on the 340-count. This is not the 160-count row. Ages 12 and up. UPC check digit OK.',
    ],
  },
  {
    id: 'benefiber-b256-lemonade-36',
    productName: 'Benefiber Prebiotic Fiber Sticks, Strawberry Lemonade (36 count)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b256-lemonade-sticks',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Inulin (from chicory root)', strength: '3 g fiber per stick' }],
    inactiveIngredients: LEM_INACTIVES,
    verdict: 'avoid',
    honestNote: LEM_NOTE,
    retailers: ['Target', 'Benefiber'],
    sourcesGeneral: [
      'Inulin from chicory root is the fiber active and is not graded. Natural flavors, maltodextrin, and rebaudioside A (extracted and purified from natural stevia leaf) are the three stack-eligible Limited tokens. That 3+ Limited stack is the Avoid. Beet juice concentrate (color) is Cleared juice-as-color. Silica is the zero-point Caution cap and does not stack. Target listing A-1007139632 is in stock at $34.33, sold by Hey Pharma, 36 sticks, and prints that other-ingredient line. The Benefiber FAQ prints the same strawberry lemonade line for the stick packs. No 12-digit UPC was on either page (t160u: the missing UPC does not stop the write). The 24-count is not this row. Ages 12 and up.',
    ],
  },
];

const ROWS = BATCH256_KYR6D_T160U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch256 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch256 duplicate id');
for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch256 upc ${record.id}`);
  if (record.id === 'benefiber-b256-lemonade-36') {
    if (record.barcode) throw new Error('batch256 lemonade UPC should stay blank');
    const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
    if (rollup.cause !== 'limited_stack') throw new Error(`batch256 lemonade cause ${rollup.cause}`);
    const expected = limitedStackHonestNoteIfAny(record.inactiveIngredients);
    if (!expected || record.honestNote !== expected) {
      throw new Error(`batch256 lemonade note ${record.honestNote} vs ${expected}`);
    }
  } else if (!record.barcode || !upcOk(record.barcode)) {
    throw new Error(`batch256 missing upc ${record.id}`);
  } else if (record.honestNote) {
    throw new Error(`batch256 unexpected honest note ${record.id}`);
  }
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.id.startsWith('metamucil-b256-sf-') || record.id === 'metamucil-b256-real-sugar-orange-114') {
    if (rollup.cause !== 'high') throw new Error(`batch256 ${record.id} cause ${rollup.cause}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch256 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch256 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch256 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
