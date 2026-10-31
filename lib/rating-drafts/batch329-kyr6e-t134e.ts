// DRAFT / not verified / batch 329 KYR6-e (t134e).
// Reprise and Bestie brand facts images are the source.
// The Sprouts section is not edited. Neither brand is closed.
// Ids: reprise-b329- and bestie-b329-

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

function flag(panel: string, name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${whySource}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const WATER = 'Methodology §5 Cleared (filtered water).';
const SUGAR = 'Methodology §5 Cleared (non-GMO cane sugar).';
const TAP = 'Methodology §5 Cleared (gluten-free tapioca syrup).';
const PECTIN = 'Methodology §5 Cleared (pectin from citrus peel).';
const MALIC = 'Methodology §5 Cleared (malic acid).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const CITRATE = 'Methodology §5 Cleared (sodium citrate).';
const WAX = 'Methodology §5 Cleared (carnauba wax, t133u).';
const GLYC = 'Methodology §5 Cleared (glycerin).';
const NF = 'Methodology §5 Limited (natural flavors, t54u natural-flavor rule). Counts toward the t137u stack.';
const MANDARIN = 'Methodology §5 Caution (Natural Mandarin Orange Flavor — founder lock t106u). Does not count toward the t137u stack.';

type Ing = readonly [string, RiskLevel, string];

const BASE: Ing[] = [
  ['Filtered Water', 'cleared', WATER],
  ['Non-GMO Cane Sugar', 'cleared', SUGAR],
  ['Gluten-Free Tapioca Syrup', 'cleared', TAP],
  ['Pectin from Citrus Peel', 'cleared', PECTIN],
];
const TAIL: Ing[] = [
  ['Malic Acid', 'cleared', MALIC],
  ['Citric Acid', 'cleared', CITRIC],
  ['Sodium Citrate', 'cleared', CITRATE],
  ['Carnauba Wax', 'cleared', WAX],
  ['Glycerin', 'cleared', GLYC],
];

function gummy(args: {
  id: string;
  productName: string;
  barcode: string;
  url: string;
  price: string;
  sku: string;
  serving: string;
  flavor: Ing;
  extra?: string;
}): RatingRecord {
  const panel = `Reprise facts image. ${args.productName}.`;
  const ings = [...BASE, args.flavor, ...TAIL];
  const oi = ings.map(([name]) => name).join(', ');
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Reprise',
    category: 'Vitamins',
    formulaId: args.id,
    form: 'gummy',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Reprise'],
    barcode: args.barcode,
    activeIngredients: [{ name: args.productName }],
    inactiveIngredients: ings.map(([name, level, src]) => flag(panel, name, level, src)),
    verdict: 'caution',
    honestNote: '',
    sourcesGeneral: [
      `t134e. Reprise brand page ${args.url} lists this pack at $${args.price} and in stock. SKU ${args.sku}. The facts image other ingredients: ${oi}. Serving size on the image: ${args.serving}. No UPC was printed on the facts image. Missing UPC. The herbal extract on the supplement facts is the active and is not graded. ${args.extra ?? ''}No code was invented.`,
    ],
  });
}

export const BATCH329_KYR6E_T134E: RatingRecord[] = [
  gummy({
    id: 'reprise-b329-menopause-60',
    productName: 'Reprise Menopause Gummies (60 gummies)',
    barcode: '',
    url: 'https://reprisehealth.com/products/menopause-gummies',
    price: '45.00',
    sku: 'RPRS-G-11-1M',
    serving: '2 Gummies. Servings per pouch 30.',
    flavor: ['Natural Grape Flavor', 'limited', NF],
  }),
  gummy({
    id: 'reprise-b329-sleep-60',
    productName: 'Reprise Restful Sleep Gummies (60 gummies)',
    barcode: '',
    url: 'https://reprisehealth.com/products/restful-sleep-gummies',
    price: '45.00',
    sku: 'RPRS-G-09-1M',
    serving: '2 Gummies. Servings per pouch 30.',
    flavor: ['Natural Lemon Flavor', 'limited', NF],
  }),
  gummy({
    id: 'reprise-b329-reishi-45',
    productName: 'Reprise Reishi Mushroom Gummies (45 gummies)',
    barcode: '',
    url: 'https://reprisehealth.com/products/reishi-gummies',
    price: '24.99',
    sku: 'RPRS-G-06',
    serving: '2 Gummies. Servings per container 22.5.',
    flavor: ['Natural Strawberry Flavor', 'limited', NF],
  }),
  gummy({
    id: 'reprise-b329-turmeric-45',
    productName: 'Reprise Turmeric Gummies (45 gummies)',
    barcode: '',
    url: 'https://reprisehealth.com/products/turmeric-gummies',
    price: '24.99',
    sku: 'RPRS-G-05',
    serving: '2 Gummies. Servings per container 22.5.',
    flavor: ['Natural Mandarin Orange Flavor', 'moderate', MANDARIN],
  }),
  finish({
    id: 'bestie-b329-creatine',
    productName: 'Bestie Creatine (creatine monohydrate)',
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: 'bestie-b329-creatine',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Bestie'],
    barcode: '',
    activeIngredients: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't134e. Bestie brand page https://bestiesupplements.com/products/creatine lists this pack at $24.99 and in stock. The facts image serving size is 1 scoop (5 g). The only supplement-facts line is Creatine Monohydrate 5 g. No other-ingredients line was printed. No UPC was printed. Missing UPC. Creatine monohydrate is the active and is not graded. No code was invented.',
    ],
  }),
];

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: number }> = {
  'reprise-b329-menopause-60': { verdict: 'caution', counted: 1 },
  'reprise-b329-sleep-60': { verdict: 'caution', counted: 1 },
  'reprise-b329-reishi-45': { verdict: 'caution', counted: 1 },
  'reprise-b329-turmeric-45': { verdict: 'caution', counted: 0 },
  'bestie-b329-creatine': { verdict: 'clean', counted: 0 },
};

const ROWS = BATCH329_KYR6E_T134E;
if (ROWS.length !== 5) throw new Error(`batch329 count ${ROWS.length}`);
const seen = new Set<string>();
for (const record of ROWS) {
  if (seen.has(record.id)) throw new Error(`batch329 duplicate ${record.id}`);
  seen.add(record.id);
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch329 unexpected ${record.id}`);
  if (record.verdict !== expected.verdict) throw new Error(`batch329 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch329 barcode ${record.id}`);
  if (record.honestNote) throw new Error(`batch329 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== expected.counted) {
    throw new Error(`batch329 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch329 blank ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch329 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
