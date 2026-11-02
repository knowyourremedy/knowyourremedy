// DRAFT / not verified / batch 336 KYR6-e (t144e).
// Olbas Herbal Bath 8 fl oz. Brand listing, Herbspro, and Greens Nutrition print the same line.
// Wildwood's shorter line is not this row. The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const PANEL = 'Olbas Herbal Bath listing. 8 fl oz.';

const T144L = 'Methodology §5 Limited (founder lock t144e). Counts toward the t137u stack.';
const T143L = 'Methodology §5 Limited (Decyl Polyglucoside (from Glucose) — founder lock t143e). Counts toward the t137u stack.';
const T143C = 'Methodology §5 Cleared (Cajuput Oil — founder lock t143e). Does not count toward the t137u stack.';
const T141L = 'Methodology §5 Limited (Cocamidopropyl Betaine (Coconut Based Foaming Agent) — founder lock t141e). Counts toward the t137u stack.';
const T141C = 'Methodology §5 Cleared (founder lock t141e). Does not count toward the t137u stack.';
const T144C = 'Methodology §5 Cleared (founder lock t144e). Does not count toward the t137u stack.';
const WATER = 'Methodology §5 Cleared (water).';
const PEPPER = 'Methodology §5 Cleared (peppermint oil).';
const EUC = 'Methodology §5 Cleared (eucalyptus oil).';

type Ing = readonly [string, RiskLevel, string];

const INGS: Ing[] = [
  ['Water', 'cleared', WATER],
  ['Cocamidopropyl Betaine (Coconut Based Foaming Agent)', 'limited', T141L],
  ['Sodium Coceth Sulfate and PEG-40 Glycerol Cocoate (Coconut Fatty Esters & Hydrogenated Castor Oil)', 'limited', T144L],
  ['PEG-6 Caprylic/Capric Glycerides (Coconut and Palm Oil Based)', 'limited', T144L],
  ['Peppermint Oil', 'cleared', PEPPER],
  ['Eucalyptus Oil', 'cleared', EUC],
  ['Decyl Polyglucoside (from Glucose)', 'limited', T143L],
  ['Cajuput Oil', 'cleared', T143C],
  ['Wintergreen Oil', 'cleared', T141C],
  ['Juniper Oil', 'cleared', T141C],
  ['Chlorophyll', 'cleared', T144C],
  ['Clove Oil', 'cleared', T144C],
];

const COUNTED = [
  'Cocamidopropyl Betaine (Coconut Based Foaming Agent)',
  'Sodium Coceth Sulfate and PEG-40 Glycerol Cocoate (Coconut Fatty Esters & Hydrogenated Castor Oil)',
  'PEG-6 Caprylic/Capric Glycerides (Coconut and Palm Oil Based)',
  'Decyl Polyglucoside (from Glucose)',
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

export const BATCH336_KYR6E_T144E: RatingRecord[] = [
  finish({
    id: 'olbas-b336-bath-8',
    productName: 'Olbas Herbal Bath (8 fl oz)',
    brand: 'Olbas',
    category: 'Herbs',
    formulaId: 'olbas-b336-bath-8',
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Herbspro', 'Greens Nutrition'],
    barcode: '715486503203',
    activeIngredients: [],
    inactiveIngredients: INGS.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `${PANEL}; ${whySource}`,
    })),
    verdict: 'avoid',
    honestNote: '',
    sourcesGeneral: [
      't144e. Brand page https://olbas.com/product/olbas-herbal-bath-8-fl-oz-236ml/ is out of stock at $19.95 and prints the full ingredient line. Herbspro https://www.herbspro.com/collections/olbas/products/herbal-bath-62711 is in stock at $14.36 in Hayward, California, and prints that same line. Greens Nutrition https://greensnutrition.com/products/therapeutic-herbal-bath-62711 is in stock at $17.95, ships from the USA, and prints that same line. UPC 715486503203 is on the Greens Nutrition 8 oz single and the check digit passes. The line is Water, Cocamidopropyl Betaine (Coconut Based Foaming Agent), Sodium Coceth Sulfate and PEG-40 Glycerol Cocoate (Coconut Fatty Esters & Hydrogenated Castor Oil), PEG-6 Caprylic/Capric Glycerides (Coconut and Palm Oil Based), Peppermint Oil, Eucalyptus Oil, Decyl Polyglucoside (from Glucose), Cajuput Oil, Wintergreen Oil, Juniper Oil, Chlorophyll, Clove Oil. Wildwood Natural Food Market is in stock at $17.99 and prints a shorter line without the parentheses. That shorter line is not this row. Counted Limited tokens: Cocamidopropyl Betaine (Coconut Based Foaming Agent); Sodium Coceth Sulfate and PEG-40 Glycerol Cocoate (Coconut Fatty Esters & Hydrogenated Castor Oil); PEG-6 Caprylic/Capric Glycerides (Coconut and Palm Oil Based); Decyl Polyglucoside (from Glucose). Hydrogenated Castor Oil inside the sulfate parenthesis is not graded again. No code was invented.',
    ],
  }),
];

const ROWS = BATCH336_KYR6E_T144E;
if (ROWS.length !== 1) throw new Error(`batch336 count ${ROWS.length}`);
const record = ROWS[0];
if (record.verdict !== 'avoid') throw new Error(`batch336 verdict ${record.verdict}`);
if (record.barcode !== '715486503203' || !upcCheck(record.barcode)) throw new Error('batch336 upc');
if (!record.honestNote || !/t137u/.test(record.honestNote)) throw new Error(`batch336 note ${record.honestNote}`);
for (const name of COUNTED) {
  if (!record.honestNote.includes(name)) throw new Error(`batch336 note missing ${name}`);
}
const mapped = applyT54uRow(record);
const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
if (counted.length !== 4) throw new Error(`batch336 stack ${counted.map((i) => i.name).join(' | ')}`);
for (const ingredient of mapped.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || !why.trim()) throw new Error(`batch336 blank ${ingredient.name}`);
  if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
    throw new Error(`batch336 generic ${ingredient.name}: ${why}`);
  }
}
