// DRAFT / not verified / batch 330 KYR6-e (t135e).
// Reprise and Bestie brand facts images are the source.
// The Sprouts section is not edited. Neither brand is closed.
// Ids: reprise-b330- and bestie-b330-

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
const PECTIN_PEEL = 'Methodology §5 Cleared (pectin from citrus peel).';
const PECTIN = 'Methodology §5 Cleared (pectin).';
const MALIC = 'Methodology §5 Cleared (malic acid).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const CITRATE = 'Methodology §5 Cleared (sodium citrate).';
const WAX = 'Methodology §5 Cleared (carnauba wax, t133u).';
const GLYC = 'Methodology §5 Cleared (glycerin).';
const CANE = 'Methodology §5 Cleared (cane sugar).';
const PLAIN_WATER = 'Methodology §5 Cleared (water).';
const MALT = 'Methodology §5 Cleared (Malted Rice — founder lock t135e). Does not count toward the t137u stack.';
const FLAVOR = 'Methodology §5 Cleared (named fruit flavor — founder lock t135e). Does not count toward the t137u stack.';
const RICE = 'Methodology §5 Cleared (Organic Rice Fiber (Nu-FLOW®) — founder lock t135e). Does not count toward the t137u stack.';
const HPMC = 'Methodology §5 Cleared (HPMC vegetable capsule).';

type Ing = readonly [string, RiskLevel, string];

const REPRISE_BASE: Ing[] = [
  ['Filtered Water', 'cleared', WATER],
  ['Non-GMO Cane Sugar', 'cleared', SUGAR],
  ['Gluten-Free Tapioca Syrup', 'cleared', TAP],
  ['Pectin from Citrus Peel', 'cleared', PECTIN_PEEL],
];
const REPRISE_TAIL: Ing[] = [
  ['Malic Acid', 'cleared', MALIC],
  ['Citric Acid', 'cleared', CITRIC],
  ['Sodium Citrate', 'cleared', CITRATE],
  ['Carnauba Wax', 'cleared', WAX],
  ['Glycerin', 'cleared', GLYC],
];

function reprise(args: {
  id: string;
  productName: string;
  url: string;
  price: string;
  sku: string;
  serving: string;
  flavor: string;
}): RatingRecord {
  const panel = `Reprise facts image. ${args.productName}.`;
  const ings: Ing[] = [...REPRISE_BASE, [args.flavor, 'cleared', FLAVOR], ...REPRISE_TAIL];
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
    barcode: '',
    activeIngredients: [{ name: args.productName }],
    inactiveIngredients: ings.map(([name, level, src]) => flag(panel, name, level, src)),
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      `t135e. Reprise brand page ${args.url} lists this pack at $${args.price} and in stock. SKU ${args.sku}. The facts image other ingredients: ${oi}. Serving size on the image: ${args.serving}. No UPC was printed. Missing UPC. The herbal extract on the supplement facts is the active and is not graded. No code was invented.`,
    ],
  });
}

function bestie(args: {
  id: string;
  productName: string;
  url: string;
  serving: string;
}): RatingRecord {
  const panel = `Bestie facts image. ${args.productName}.`;
  const ings: Ing[] = [
    ['Organic Rice Fiber (Nu-FLOW®)', 'cleared', RICE],
    ['HPMC (vegetable capsule)', 'cleared', HPMC],
  ];
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: args.id,
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Bestie'],
    barcode: '',
    activeIngredients: [{ name: args.productName }],
    inactiveIngredients: ings.map(([name, level, src]) => flag(panel, name, level, src)),
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      `t135e. Bestie brand page ${args.url} lists this pack at $39.99 and in stock. The bottle back other ingredients: Organic Rice Fiber (Nu-FLOW®), HPMC (vegetable capsule). Serving size on the image: ${args.serving}. No UPC was printed. Missing UPC. The supplement-facts actives are not graded. Contains lines are allergen statements and are not graded. No code was invented.`,
    ],
  });
}

export const BATCH330_KYR6E_T135E: RatingRecord[] = [
  reprise({
    id: 'reprise-b330-destress-60',
    productName: 'Reprise De-Stress Gummies (60 gummies)',
    url: 'https://reprisehealth.com/products/de-stress-gummies',
    price: '45.00',
    sku: 'RPRS-G-07-1M',
    serving: '2 Gummies. Servings per pouch 30.',
    flavor: 'Natural Passionfruit Flavor',
  }),
  reprise({
    id: 'reprise-b330-focus-60',
    productName: 'Reprise Super Focus Gummies (60 gummies)',
    url: 'https://reprisehealth.com/products/super-focus-gummies',
    price: '45.00',
    sku: 'RPRS-G-08-1M',
    serving: '2 Gummies. Servings per pouch 30.',
    flavor: 'Natural Mango Flavor',
  }),
  reprise({
    id: 'reprise-b330-ginseng-45',
    productName: 'Reprise Korean Ginseng Gummies (45 gummies)',
    url: 'https://reprisehealth.com/products/korean-ginseng-gummies',
    price: '24.99',
    sku: 'RPRS-G-01',
    serving: '2 Gummies. Servings per container 22.5.',
    flavor: 'Natural Pineapple Flavor',
  }),
  finish({
    id: 'reprise-b330-jujube-45',
    productName: 'Reprise Jujube Seed Gummies (45 gummies)',
    brand: 'Reprise',
    category: 'Vitamins',
    formulaId: 'reprise-b330-jujube-45',
    form: 'gummy',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Reprise'],
    barcode: '',
    activeIngredients: [{ name: 'Reprise Jujube Seed Gummies (45 gummies)' }],
    inactiveIngredients: (
      [
        ['Cane Sugar', 'cleared', CANE],
        ['Water', 'cleared', PLAIN_WATER],
        ['Malted Rice', 'cleared', MALT],
        ['Pectin', 'cleared', PECTIN],
        ['Natural Peach Flavor', 'cleared', FLAVOR],
        ['Malic Acid', 'cleared', MALIC],
        ['Citric Acid', 'cleared', CITRIC],
        ['Sodium Citrate', 'cleared', CITRATE],
        ['Carnauba Wax', 'cleared', WAX],
        ['Glycerin', 'cleared', GLYC],
      ] as Ing[]
    ).map(([name, level, src]) =>
      flag('Reprise facts image. Reprise Jujube Seed Gummies (45 gummies).', name, level, src),
    ),
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't135e. Reprise brand page https://reprisehealth.com/products/jujube-seed-gummies lists this pack at $24.99 and in stock. SKU RPRS-G-04. The facts image other ingredients: Cane Sugar, Water, Malted Rice, Pectin, Natural Peach Flavor, Malic Acid, Citric Acid, Sodium Citrate, Carnauba Wax, Glycerin. Serving size on the image: 2 Gummies. Servings per pouch 22.5. No UPC was printed. Missing UPC. Jujube (seed) extract is the active and is not graded. No code was invented.',
    ],
  }),
  bestie({
    id: 'bestie-b330-finesse',
    productName: 'Bestie Finesse (80 capsules)',
    url: 'https://bestiesupplements.com/products/finesse',
    serving: '4 Capsules. Servings per container 20.',
  }),
  bestie({
    id: 'bestie-b330-baby-dancin',
    productName: "Bestie Baby Dancin' (60 capsules)",
    url: 'https://bestiesupplements.com/products/baby-dancin',
    serving: '3 Capsules. Servings per container 20.',
  }),
  bestie({
    id: 'bestie-b330-hey-ladies',
    productName: 'Bestie Hey Ladies (60 capsules)',
    url: 'https://bestiesupplements.com/products/hey-ladies',
    serving: '3 Capsules. Servings per container 20.',
  }),
  bestie({
    id: 'bestie-b330-vibe-check',
    productName: 'Bestie Vibe Check (60 capsules)',
    url: 'https://bestiesupplements.com/products/vibe-check',
    serving: '3 Capsules. Servings per container 20.',
  }),
  bestie({
    id: 'bestie-b330-brain-flex',
    productName: 'Bestie Brain Flex (80 capsules)',
    url: 'https://bestiesupplements.com/products/brain-flex',
    serving: '4 Capsules. Servings per container 20.',
  }),
];

const ROWS = BATCH330_KYR6E_T135E;
if (ROWS.length !== 9) throw new Error(`batch330 count ${ROWS.length}`);
const seen = new Set<string>();
for (const record of ROWS) {
  if (seen.has(record.id)) throw new Error(`batch330 duplicate ${record.id}`);
  seen.add(record.id);
  if (record.verdict !== 'clean') throw new Error(`batch330 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch330 barcode ${record.id}`);
  if (record.honestNote) throw new Error(`batch330 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== 0) throw new Error(`batch330 stack ${record.id}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch330 blank ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch330 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
