// DRAFT / not verified / batch 335 KYR6-e (t142e).
// Olbas salve. The brand box is the panel. Co-op Market is the in-stock US page.
// Herbal Bath is not written. The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const T141C = 'Methodology §5 Cleared (founder lock t141e). Does not count toward the t137u stack.';
const T141M = 'Methodology §5 Avoid (hydrogenated peanut oil — t83 decision). This replaces the t141e Caution call. One Avoid token makes the product Avoid.';
const T141L = 'Methodology §5 Limited (sodium cetearyl sulfate — founder lock t141e). Counts toward the t137u stack.';
const T98 = 'Methodology §5 Caution (cetearyl alcohol — founder lock t98u). Does not count toward the t137u stack.';
const CETYL = 'Methodology §5 Cleared (cetyl alcohol).';
const CLOVE = 'Methodology §5 Cleared (clove oil).';
const EUC = 'Methodology §5 Cleared (eucalyptus oil).';
const GLYC = 'Methodology §5 Cleared (glyceryl stearate SE).';
const PEPPER = 'Methodology §5 Cleared (peppermint oil).';
const PG = 'Methodology §5 Cleared (propylene glycol, topical form). Not the swallowed solvent.';
const WATER = 'Methodology §5 Cleared (water).';
const PARAFFIN = 'Methodology §5 Cleared (white soft paraffin).';

type Ing = readonly [string, RiskLevel, string];

const PANEL = 'Olbas Analgesic Salve box. Drug Facts. 1 oz.';

const INGS: Ing[] = [
  ['cajeput oil', 'cleared', T141C],
  ['cetearyl alcohol', 'moderate', T98],
  ['cetyl alcohol', 'cleared', CETYL],
  ['clove oil', 'cleared', CLOVE],
  ['eucalyptus oil', 'cleared', EUC],
  ['glyceryl stearate SE', 'cleared', GLYC],
  ['hydrogenated peanut oil', 'high', T141M],
  ['juniper oil', 'cleared', T141C],
  ['peppermint oil', 'cleared', PEPPER],
  ['propylene glycol', 'cleared', PG],
  ['sodium cetearyl sulfate', 'limited', T141L],
  ['water', 'cleared', WATER],
  ['white soft paraffin', 'cleared', PARAFFIN],
  ['wintergreen oil', 'cleared', T141C],
];

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH335_KYR6E_T142E: RatingRecord[] = [
  finish({
    id: 'olbas-b335-salve-1',
    productName: 'Olbas Analgesic Salve (1 oz)',
    brand: 'Olbas',
    category: 'Pain & Fever',
    formulaId: 'olbas-b335-salve-1',
    form: 'cream',
    audience: 'adult',
    minAge: 2,
    recordStatus: UNVERIFIED,
    productType: 'Drug',
    retailers: ['Olbas', 'Co-op Market'],
    barcode: '',
    activeIngredients: [{ name: 'Menthol', strength: '2.8%' }],
    inactiveIngredients: INGS.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `${PANEL}; ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'avoid',
    honestNote: '',
    sourcesGeneral: [
      't142e. Brand page https://olbas.com/product/olbas-analgesic-salve-1-oz-tube-28g/ is out of stock at $12.95. The box back is a Drug Facts panel. Active ingredient Menthol 2.8% is not graded. Inactive ingredients: cajeput oil, cetearyl alcohol, cetyl alcohol, clove oil, eucalyptus oil, glyceryl stearate SE, hydrogenated peanut oil, juniper oil, peppermint oil, propylene glycol, sodium cetearyl sulfate, water, white soft paraffin, wintergreen oil. Co-op Market https://www.coopmarket.com/products/olbas-analgesic-salve-1-oz is in stock at $12.95 and prints the same other-ingredients set in title case. Counted Limited token: sodium cetearyl sulfate. Cetearyl alcohol is Caution and does not stack. hydrogenated peanut oil is Avoid under the t83 decision and makes the product Avoid. Propylene glycol is the topical form. No UPC was printed on the box photo. A case code was not used. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH335_KYR6E_T142E;
if (ROWS.length !== 1) throw new Error(`batch335 count ${ROWS.length}`);
const record = ROWS[0];
if (record.id !== 'olbas-b335-salve-1') throw new Error(record.id);
if (record.verdict !== 'avoid') throw new Error(`batch335 verdict ${record.verdict}`);
if (record.barcode) throw new Error('batch335 barcode');
if (record.honestNote) throw new Error('batch335 note');
const mapped = applyT54uRow(record);
const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
if (counted.length !== 1 || counted[0].name !== 'sodium cetearyl sulfate') {
  throw new Error(`batch335 stack ${counted.map((i) => i.name).join(',')}`);
}
for (const ingredient of mapped.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || !why.trim()) throw new Error(`batch335 blank ${ingredient.name}`);
  if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
    throw new Error(`batch335 generic ${ingredient.name}: ${why}`);
  }
}
