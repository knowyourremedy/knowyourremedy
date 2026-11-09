// DRAFT / not verified / batch 375 KYR6-e (t83u).
// OregaRESP 1 fl oz and OregaUltra 1 fl oz. Blend rows are actives and are not graded.
// None is not stored. The 8 ml Oreganol row is not edited.

import type { RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import { applyT83uRow } from '../scan-preview/t83uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT83uRow(applyT54uRow(record));
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH375_KYR6E_T83U: RatingRecord[] = [
  finish({
    id: 'nahs-b375-oregaresp-1',
    productName: 'North American Herb & Spice OregaRESP (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b375-oregaresp-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '335824000920',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '225 mg' },
      { name: 'Wild oregano oil P73', strength: '' },
      { name: 'Cinnamon bark oil', strength: '' },
      { name: 'Cumin oil', strength: '' },
      { name: 'Wild sage oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oregaresp/?attribute_pa_size=1-fl-oz shows the 1 fl oz oil. The page kept the range $34.99–$79.99. No stock word was on the page. The front says Dietary Supplement and OregaRESP. The amount is not in that front crop. The facts photograph is the 1 oz gallery image. It prints Supplement Facts, Serving Size 6 drops, Serving per container 183, and Proprietary blend in extra virgin olive oil 225 mg. The rows are Wild oregano oil P73, Cinnamon bark oil, Cumin oil, and Wild sage oil. Those rows are actives and are not graded. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. Non-GMO under the box is a claim. Label directions say six drops with or without meals twice daily, take more if needed, and the oil may also be used topically. The page How to Take uses that dose. The printed digits are 3 35824 00092 0. A barcode read gives 335824000920. The check digit passes. The 6-prefix string 635824000920 does not pass. This code is the 1 fl oz oil only. It is not the 60-count or the 90-count. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b375-oregaultra-1',
    productName: 'North American Herb & Spice OregaUltra (1 fl oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b375-oregaultra-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006961',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '50 mg' },
      { name: 'Organic extra virgin olive oil', strength: '' },
      { name: 'black seed oil', strength: '' },
      { name: 'organic OregaUltra 84% carvacrol oregano oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't83u. https://www.northamericanherbandspice.com/shop/oregaultra/?attribute_pa_size=1-ounce-spice-oil-complex shows one choice, 1 Ounce Spice Oil Complex, at $69.99. No stock word was on the page. The front says Oil of Wild Oregano P73. The amount is not in that front crop. The facts photograph prints Supplement Facts, Serving Size 2 drops, Servings per container 432, and Proprietary blend 50 mg. The same cell names organic extra virgin olive oil, black seed oil, and organic OregaUltra 84% carvacrol oregano oil. Those names stay inside the blend and are not graded. Black seed oil in that cell is not an Other ingredient. The photograph has no Other ingredients heading. None is not printed. Non-GMO under the box is a claim. Label directions say two drops daily, and also rub topically on joints and muscles. The page How to Take uses those words. The printed digits on the facts crop and the directions crop are 6 35824 00696 1. A barcode read gives 635824006961. The check digit passes. The linked PDF viewer was a blank canvas and added no panel. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH375_KYR6E_T83U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 2) throw new Error(`batch375 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch375 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number }> = {
  'nahs-b375-oregaresp-1': { barcode: '335824000920', actives: 5, inactive: 0 },
  'nahs-b375-oregaultra-1': { barcode: '635824006961', actives: 4, inactive: 0 },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch375 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch375 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== 'adult' || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch375 grade ${row.id}`);
  }
  if (row.activeIngredients.length !== spec.actives) throw new Error(`${row.id} actives`);
  if (row.inactiveIngredients.length !== spec.inactive) throw new Error(`${row.id} other`);
  const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(`${row.id} rollup`);
  if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
    throw new Error(`${row.id} stack`);
  }
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`${row.id} ${ingredient.name}: ${why}`);
  }
  const source = (row.sourcesGeneral ?? []).join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`${row.id} source`);
}

const resp = ROWS[0];
const ultra = ROWS[1];
if (resp?.activeIngredients[0]?.strength !== '225 mg' || resp.inactiveIngredients.length !== 0) throw new Error('batch375 resp');
if (!resp.sourcesGeneral?.[0]?.includes('3 35824 00092 0')) throw new Error('batch375 resp digits');
if (ultra?.activeIngredients[0]?.strength !== '50 mg' || ultra.inactiveIngredients.length !== 0) throw new Error('batch375 ultra');
if (!ultra.sourcesGeneral?.[0]?.includes('6 35824 00696 1')) throw new Error('batch375 ultra digits');
if (ROWS.some((row) => ['635824002048', '635824007623', '335824000012', '335824000647', '335824000951'].includes(row.barcode ?? ''))) {
  throw new Error('batch375 held upc attached');
}
