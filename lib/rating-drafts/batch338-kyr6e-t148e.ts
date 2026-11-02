// DRAFT / not verified / batch 338 KYR6-e (t148e).
// Four Zand holds. Brand facts images are the panels.
// The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const T148 = 'Methodology §5 Cleared (founder-standing ladder rule t148e). Does not count toward the t137u stack.';
const CAPSULE = 'Methodology §5 Cleared (vegetable cellulose capsule).';
const RICE_BLEND = 'Methodology §5 Limited (organic rice extract blend — the form is not named). Counts toward the t137u stack.';
const SILICA = 'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.';
const POLICOSANOL = 'Methodology §5 Cleared (Policosanol — t106u). Does not count toward the t137u stack.';
const GINGER = 'Methodology §5 Cleared (named plant part, ginger root).';
const RICE_CONC = 'Methodology §5 Cleared (Whole Rice Concentrate — t106u). Does not count toward the t137u stack.';
const OLIVE = 'Methodology §5 Cleared (organic extra virgin olive oil).';
const SYRUP = 'Methodology §5 Cleared (brown rice syrup).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const WATER = 'Methodology §5 Cleared (purified water).';

type Ing = readonly [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function row(args: {
  id: string;
  productName: string;
  form: string;
  minAge: number;
  panel: string;
  ings: Ing[];
  actives: { name: string; strength?: string }[];
  note?: string;
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Zand',
    category: 'Herbs',
    formulaId: args.id,
    form: args.form,
    audience: ADULT,
    minAge: args.minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `${args.panel}; ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: args.note ?? '',
    sourcesGeneral: [args.source],
  });
}

const HIVE_NOTE =
  'Organic Rice Extract Blend does not name hull, bran, or concentrate, so that token still counts. Whole Rice Concentrate on the same label names the rice form and does not count. They are not the same token.';

export const BATCH338_KYR6E_T148E: RatingRecord[] = [
  row({
    id: 'zand-b338-hive-vitality-100',
    productName: 'Zand Hive Vitality (100 capsules)',
    form: 'capsule',
    minAge: 1,
    panel: 'Zand Hive Vitality facts image. 100 capsules.',
    ings: [
      ['Vegetable Cellulose Capsule', 'cleared', CAPSULE],
      ['Organic Rice Extract Blend', 'limited', RICE_BLEND],
      ['Silica', 'moderate', SILICA],
      ['Peppermint (aerial)', 'cleared', T148],
      ['Policosanol', 'cleared', POLICOSANOL],
      ['Ginger (root)', 'cleared', GINGER],
      ['Cayenne (pepper)', 'cleared', T148],
      ['Whole Rice Concentrate', 'cleared', RICE_CONC],
    ],
    actives: [
      { name: 'Bee Pollen', strength: '200 mg' },
      { name: 'Gotu Kola (aerial)', strength: '150 mg' },
      { name: 'Eleuthero (root)', strength: '100 mg' },
      { name: 'Korean Ginseng (Panax ginseng) (root)', strength: '50 mg' },
      { name: 'Schizandra (berry)', strength: '50 mg' },
      { name: 'Royal Jelly Concentrate', strength: '25 mg' },
    ],
    note: HIVE_NOTE,
    source:
      't148e. Brand page https://zand.com/products/raw-energy-extreme is in stock at $23.39. The facts image prints Serving Size 1 Capsule, Servings Per Container 100. Other Ingredients: Vegetable Cellulose Capsule, Organic Rice Extract Blend, Silica, Peppermint (aerial), Policosanol, Ginger (root), Cayenne (pepper), Whole Rice Concentrate. The supplement-facts herbs and bee products are actives and are not graded. Counted Limited token: Organic Rice Extract Blend. Silica is the 0-point Caution cap and does not stack. Variant SKU 731111461007 matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.',
  }),
  row({
    id: 'zand-b338-oregano-oil-1',
    productName: 'Zand Oregano Oil (1 oz)',
    form: 'liquid',
    minAge: 12,
    panel: 'Zand Oregano Oil facts image. 1 oz.',
    ings: [
      ['Organic Extra Virgin Olive Oil', 'cleared', OLIVE],
      ['Cinnamon (Cinnamomum zeylanicum) Bark Oil', 'cleared', T148],
    ],
    actives: [{ name: 'Oregano (Origanum vulgare) (leaf oil)', strength: '10 mg' }],
    source:
      't148e. Brand page https://zand.com/products/oregano-oil is in stock at $28.29. The facts image prints Serving Size 4 Drops (0.1 mL), Servings Per Container 300. Other Ingredients: Organic Extra Virgin Olive Oil and Cinnamon (Cinnamomum zeylanicum) Bark Oil. Oregano leaf oil is the active and is not graded. Directions say adults and children ages 12 and older. Variant SKU 041954030002 matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.',
  }),
  row({
    id: 'zand-b338-menthol-lozenges-45',
    productName: 'Zand Menthol Lozenges (45 lozenges)',
    form: 'lozenge',
    minAge: 18,
    panel: 'Zand Menthol Lozenges facts image. 45 lozenges.',
    ings: [
      ['Brown Rice Syrup', 'cleared', SYRUP],
      ['Citric Acid', 'cleared', CITRIC],
      ['Natural Mint Flavor', 'cleared', T148],
    ],
    actives: [
      { name: 'Zinc (from Zinc Gluconate)', strength: '5 mg' },
      { name: 'Proprietary Blend', strength: '33 mg' },
    ],
    source:
      't148e. Brand page https://zand.com/products/herbalozenge-menthol is in stock at $9.79. The facts image prints Serving Size 1 Lozenge (3.8 g), Servings Per Container 45. Other Ingredients: Brown Rice Syrup, Citric Acid, Natural Mint Flavor. Zinc and the proprietary herbal blend, including Menthol inside that blend, are actives and are not graded. Variant SKU 041954141128 matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.',
  }),
  row({
    id: 'zand-b338-herbal-mist-2',
    productName: 'Zand Organic Herbal Mist Throat Spray (2 oz)',
    form: 'spray',
    minAge: 18,
    panel: 'Zand Organic Herbal Mist facts image. 2 oz.',
    ings: [
      ['Purified water', 'cleared', WATER],
      ['organic brown rice syrup', 'cleared', SYRUP],
      ['18-23% by volume organic alcohol', 'cleared', T148],
    ],
    actives: [{ name: 'Proprietary Blend', strength: '126 mg' }],
    source:
      't148e. Brand page https://zand.com/products/organic-herbal-mist-throat-spray is in stock at $22.49. The facts image prints Serving Size 3 sprays (0.48 mL), Servings Per Container 123. Other Ingredients: Purified water, organic brown rice syrup and 18-23% by volume organic alcohol. The herbal proprietary blend is the active and is not graded. Variant SKU 041954010752 matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.',
  }),
];

const ROWS = BATCH338_KYR6E_T148E;
if (ROWS.length !== 4) throw new Error(`batch338 count ${ROWS.length}`);
const expect: Record<string, { verdict: RatingRecord['verdict']; limited: string[] }> = {
  'zand-b338-hive-vitality-100': { verdict: 'caution', limited: ['Organic Rice Extract Blend'] },
  'zand-b338-oregano-oil-1': { verdict: 'clean', limited: [] },
  'zand-b338-menthol-lozenges-45': { verdict: 'clean', limited: [] },
  'zand-b338-herbal-mist-2': { verdict: 'clean', limited: [] },
};
for (const record of ROWS) {
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`${record.id} barcode`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
  if (counted.join('|') !== want.limited.join('|')) throw new Error(`${record.id} stack ${counted.join('|')}`);
  if (record.id === 'zand-b338-hive-vitality-100') {
    if (!record.honestNote?.includes('Organic Rice Extract Blend') || !record.honestNote.includes('Whole Rice Concentrate')) {
      throw new Error(`hive note ${record.honestNote}`);
    }
    if (/t137u/.test(record.honestNote)) throw new Error('hive should not be a 3+ stack note');
  } else if (record.honestNote) {
    throw new Error(`${record.id} note ${record.honestNote}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`${record.id} blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`${record.id} generic ${ingredient.name}: ${why}`);
    }
  }
}
