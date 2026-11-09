// DRAFT / not verified / batch 353 KYR6-e (t65u).
// In-stock Grüns 28-count packs whose supplement-facts images are already locked.
// The Sprouts section is not edited. No new locks.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SRC: Record<string, string> = {
  cane: 'Methodology §5 Cleared (cane sugar).',
  water: 'Methodology §5 Cleared (water).',
  pectin: 'Methodology §5 Cleared (pectin).',
  straw: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Strawberry Flavor. Counts toward the t137u stack.',
  flavors: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavors. Counts toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid).',
  vjuice: 'Methodology §5 Cleared (vegetable juice — juice rule).',
  fjuice: 'Methodology §5 Cleared (fruit and/or vegetable juice as color — juice rule).',
  sodium: 'Methodology §5 Cleared (sodium citrate).',
  allu: 'Methodology §5 Cleared (allulose, a rare sugar). Does not count toward the t137u stack.',
  rebm: 'Methodology §5 Cleared (high-purity Reb M). Does not count toward the t137u stack.',
};

type Ing = readonly [string, RiskLevel, string];

const STRAW_LS: Ing[] = [
  ['Cane Sugar', 'cleared', 'cane'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'pectin'],
  ['Natural Strawberry Flavor', 'limited', 'straw'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Vegetable Juice', 'cleared', 'vjuice'],
  ['Sodium Citrate', 'cleared', 'sodium'],
];

const STRAW_SF: Ing[] = [
  ['Allulose', 'cleared', 'allu'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'pectin'],
  ['Natural Strawberry Flavor', 'limited', 'straw'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Vegetable Juice', 'cleared', 'vjuice'],
  ['Sodium Citrate', 'cleared', 'sodium'],
  ['Reb M (OnoSweet™)', 'cleared', 'rebm'],
];

const FLAV_LS: Ing[] = [
  ['Cane Sugar', 'cleared', 'cane'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'pectin'],
  ['Natural Flavors', 'limited', 'flavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Fruit and/or Vegetable Juice (color)', 'cleared', 'fjuice'],
  ['Sodium Citrate', 'cleared', 'sodium'],
];

const FLAV_SF: Ing[] = [
  ['Allulose', 'cleared', 'allu'],
  ['Water', 'cleared', 'water'],
  ['Pectin', 'cleared', 'pectin'],
  ['Natural Flavors', 'limited', 'flavors'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Fruit and/or Vegetable Juice (color)', 'cleared', 'fjuice'],
  ['Sodium Citrate', 'cleared', 'sodium'],
  ['Reb M (OnoSweet™)', 'cleared', 'rebm'],
];

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
  audience: 'adult' | 'kids';
  minAge: number;
  barcode: string;
  ings: Ing[];
  blend: string;
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Grüns',
    category: 'Herbs',
    formulaId: args.id,
    form: 'gummy',
    audience: args.audience,
    minAge: args.minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Grüns'],
    barcode: args.barcode,
    activeIngredients: [{ name: 'Core Nutrients Blend', strength: args.blend }],
    inactiveIngredients: args.ings.map(([name, riskLevel, key]) => ({
      name,
      riskLevel,
      source: `Grüns supplement-facts image. t65u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const ADULT = 'The facts image prints Serving Size One Pack (20 g), 28 servings. Core Nutrients Blend 8.7 g. Vitamins and minerals on the same panel are actives and are not graded again.';
const KID = 'The facts image prints Serving Size One Pack (15 g), 28 servings, with daily-value columns for children 2–3 years and 4 years and older. Core Nutrients Blend 6.3 g. Vitamins and minerals on the same panel are actives and are not graded again.';

export const BATCH353_KYR6E_T65U: RatingRecord[] = [
  row({
    id: 'gruns-b353-ls-28',
    productName: 'Grüns Low Sugar (28 packs)',
    audience: 'adult',
    minAge: 18,
    barcode: '860011207108',
    ings: STRAW_LS,
    blend: '8.7 g',
    source: 't65u. https://gruns.co/products/gruns lists Low Sugar 28 packs in stock. The image Nutrition_Label_LS_-_Adults_B_-_Desktop.jpg prints Other Ingredients: Cane Sugar, Water, Pectin, Natural Strawberry Flavor, Citric Acid, Vegetable Juice, Sodium Citrate. ' + ADULT + ' Counted Limited token: Natural Strawberry Flavor. The variant barcode field lists 860011207108. The check digit passes. The 84-pack uses the same barcode and is a multipack of this in-stock 28, so it is not a row.',
  }),
  row({
    id: 'gruns-b353-sf-28',
    productName: 'Grüns Sugar-Free (28 packs)',
    audience: 'adult',
    minAge: 18,
    barcode: '860011207122',
    ings: STRAW_SF,
    blend: '8.7 g',
    source: 't65u. https://gruns.co/products/gruns lists Sugar-Free 28 packs in stock. The image Nutrition_Label_SF_-_Adults_B_-_Desktop.jpg prints Other Ingredients: Allulose, Water, Pectin, Natural Strawberry Flavor, Citric Acid, Vegetable Juice, Sodium Citrate, Reb M (OnoSweet™). ' + ADULT + ' Counted Limited token: Natural Strawberry Flavor. The variant barcode field lists 860011207122. The check digit passes.',
  }),
  row({
    id: 'gruns-b353-kids-ls-28',
    productName: 'Grüns Kids Low Sugar (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '860011207146',
    ings: STRAW_LS,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/gruns-kids lists Low Sugar 28 packs in stock. The image Nutrition_Label_LS_-_Kids_B_V2_-_Desktop.jpg prints the same other-ingredients line as the adult low-sugar label. ' + KID + ' Counted Limited token: Natural Strawberry Flavor. The variant barcode field lists 860011207146. The check digit passes.',
  }),
  row({
    id: 'gruns-b353-kids-sf-28',
    productName: 'Grüns Kids Sugar-Free (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '860011207153',
    ings: STRAW_SF,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/gruns-kids lists Sugar-Free 28 packs in stock. The image Nutrition_Label_SF_-_Kids_B_V2_-_Desktop.jpg prints the same other-ingredients line as the adult sugar-free label. ' + KID + ' Counted Limited token: Natural Strawberry Flavor. The variant barcode field lists 860011207153. The check digit passes.',
  }),
  row({
    id: 'gruns-b353-shrek-ls-28',
    productName: 'Grüns Shrek Low Sugar (28 packs)',
    audience: 'adult',
    minAge: 18,
    barcode: '',
    ings: FLAV_LS,
    blend: '8.7 g',
    source: 't65u. https://gruns.co/products/shrek-gruns lists Low Sugar 28 packs in stock. The image NLabel-Shrek_LTO-LS.webp prints Other Ingredients: Cane Sugar, Water, Pectin, Natural Flavors, Citric Acid, Fruit and/or Vegetable Juice (color), Sodium Citrate. ' + ADULT + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-shrek-sf-28',
    productName: 'Grüns Shrek Sugar-Free (28 packs)',
    audience: 'adult',
    minAge: 18,
    barcode: '',
    ings: FLAV_SF,
    blend: '8.7 g',
    source: 't65u. https://gruns.co/products/shrek-gruns lists Sugar-Free 28 packs in stock. The image NLabel-Shrek_LTO-SF.webp prints Other Ingredients: Allulose, Water, Pectin, Natural Flavors, Citric Acid, Fruit and/or Vegetable Juice (color), Sodium Citrate, Reb M (OnoSweet™). ' + ADULT + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-shrek-kids-ls-28',
    productName: 'Grüns Kids Shrek Low Sugar (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '',
    ings: FLAV_LS,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/shrek-gruns-kids lists Low Sugar 28 packs in stock. The image NLabel-Shrek_LTO-Kids-LS.webp prints the same other-ingredients line as the adult Shrek low-sugar label. ' + KID + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-shrek-kids-sf-28',
    productName: 'Grüns Kids Shrek Sugar-Free (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '',
    ings: FLAV_SF,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/shrek-gruns-kids lists Sugar-Free 28 packs in stock. The image NLabel-Shrek_LTO-Kids-SF.webp prints the same other-ingredients line as the adult Shrek sugar-free label. ' + KID + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-minions-ls-28',
    productName: 'Grüns Minions Low Sugar (28 packs)',
    audience: 'adult',
    minAge: 18,
    barcode: '',
    ings: FLAV_LS,
    blend: '8.7 g',
    source: 't65u. https://gruns.co/products/minions-gruns lists Low Sugar 28 packs in stock. The image NLabel-Minions_LTO-LS.webp prints Other Ingredients: Cane Sugar, Water, Pectin, Natural Flavors, Citric Acid, Fruit and/or Vegetable Juice (color), Sodium Citrate. ' + ADULT + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-minions-sf-28',
    productName: 'Grüns Minions Sugar-Free (28 packs)',
    audience: 'adult',
    minAge: 18,
    barcode: '',
    ings: FLAV_SF,
    blend: '8.7 g',
    source: 't65u. https://gruns.co/products/minions-gruns lists Sugar-Free 28 packs in stock. The image NLabel-Minions_LTO-SF.webp prints the same other-ingredients line as the Shrek sugar-free label. ' + ADULT + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-minions-kids-ls-28',
    productName: 'Grüns Kids Minions Low Sugar (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '',
    ings: FLAV_LS,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/minions-gruns-kids lists Low Sugar 28 packs in stock. The image NLabel-Minions_LTO-Kids-LS.webp prints the same other-ingredients line as the adult Minions low-sugar label. ' + KID + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-minions-kids-sf-28',
    productName: 'Grüns Kids Minions Sugar-Free (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '',
    ings: FLAV_SF,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/minions-gruns-kids lists Sugar-Free 28 packs in stock. The image NLabel-Minions_LTO-Kids-SF.webp prints the same other-ingredients line as the adult Minions sugar-free label. ' + KID + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-raspberry-kids-ls-28',
    productName: 'Grüns Kids Raspberry Lemonade Low Sugar (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '',
    ings: FLAV_LS,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/raspberry-lemonade-gruns-kids lists Low Sugar 28 packs in stock. The image NLabel-RaspberryLemonadeLTO-Kids-LS.webp prints the same other-ingredients line as the adult Minions low-sugar label. ' + KID + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'gruns-b353-raspberry-kids-sf-28',
    productName: 'Grüns Kids Raspberry Lemonade Sugar-Free (28 packs)',
    audience: 'kids',
    minAge: 2,
    barcode: '',
    ings: FLAV_SF,
    blend: '6.3 g',
    source: 't65u. https://gruns.co/products/raspberry-lemonade-gruns-kids lists Sugar-Free 28 packs in stock. The image NLabel-RaspberryLemonadeLTO-Kids-SF.webp prints the same other-ingredients line as the adult Minions sugar-free label. ' + KID + ' Counted Limited token: Natural Flavors. The variant barcode field is empty. Missing UPC.',
  }),
];

const ROWS = BATCH353_KYR6E_T65U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!code) return true;
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 14) throw new Error(`batch353 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(record.id);
  ids.add(record.id);
  if (!upcCheck(record.barcode ?? '')) throw new Error(record.id + ' upc');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== record.verdict) throw new Error(`${record.id} ${record.verdict} vs ${roll.verdict}`);
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length >= 3) {
    if (!(record.honestNote || '').includes('stacking rule (t137u)')) throw new Error(record.id + ' note');
  } else if (record.honestNote) throw new Error(record.id + ' extra ' + record.honestNote);
  if (counted.length !== 1) throw new Error(record.id + ' count ' + counted.map((i) => i.name).join(','));
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
