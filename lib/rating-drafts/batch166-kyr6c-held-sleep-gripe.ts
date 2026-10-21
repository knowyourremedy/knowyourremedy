// DRAFT / not verified / batch 166 KYR6-c held sleep chewables and gripe water.
// US only. These are the packs batch165 held for vegetable protein isolate,
// oligofructose, Natural Color, and potassium benzoate. Those tokens are
// now Caution (Usable). A row exists only when that pack's panel was read
// and a page that opened showed that same count for sale. No 2-pack or kit.
//
// TALLY: 3 written — Clean 0 / Caution 3 / Avoid 0.
// Zarbee's Children's Sleep Chewables 2 (Caution 2). Little Remedies Gripe Water 1 (Caution 1).
// UPC attached 3 / empty 0.
// Written-row ungraded tokens: 0.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const SLEEP = 'Sleep';
const DIGESTIVE = 'Digestive';

const METH = {
  agave: 'Methodology §5 Cleared (organic agave).',
  benzoate: 'Methodology §5 Caution (potassium benzoate, same family as sodium benzoate).',
  botanical: 'Methodology §5 Cleared (named food or botanical extract as an oral inactive).',
  citric: 'Methodology §5 Cleared (citric acid).',
  cornSyrup: 'Methodology §5 Caution (corn syrup). Distinct from Cleared glucose syrup.',
  flavorNamed: 'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  flavors: 'Methodology §5 Limited (natural flavors). Exact natural flavors stays Limited.',
  fructose: 'Methodology §5 Limited (fructose).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  naturalColor: 'Methodology §5 Caution (Natural Color). Unnamed color. Not a named juice or paprika color.',
  oligofructose: 'Methodology §5 Caution (oligofructose). Same family as the fructooligosaccharide blend. Not the Cleared inulin row.',
  silica: 'Methodology §5 Caution (silicon dioxide, nanoparticle cap).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sugar: 'Methodology §5 Caution (bare sugar). Cane sugar is a different line.',
  vegetableProtein: 'Methodology §5 Caution (vegetable protein isolate). Unnamed plant. Not pea protein isolate. Not soy protein isolate.',
  water: 'Methodology §5 Cleared (water / purified water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
  xylitol: 'Methodology §5 Limited (xylitol, oral).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const SLEEP_ALTS: CleanAlternative[] = [
  alt(
    'boiron-sleepcalm-kids-pellets',
    'Independently Clean kids sleep pellets already on main. Minimum age 3. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'hylands-4kids-calm-restful',
    "Independently Clean kids meltaway already on main. Minimum age 2. Form labeled, not a hard filter (§6).",
  ),
];

const GRIPE_ALTS: CleanAlternative[] = [
  alt(
    'boiron-gasalia-meltaways',
    'Independently Clean kids gas meltaways already on main. Minimum age 6, higher than this newborn bottle. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'boiron-gasalia-pellets',
    'Independently Clean kids gas pellets already on main. Minimum age 6, higher than this newborn bottle. Form labeled, not a hard filter (§6).',
  ),
];

const CHEW = "Zarbee's Children's Sleep Chewable Tablet brand panel";
const GRIPE = 'Little Remedies Gripe Water brand panel';

const NATURAL_COLOR_NOTE =
  'The shopper sees Natural Color on the other-ingredients line. A named color such as Natural Color (turmeric), or a named juice color, names the plant. This chewable lists Natural Color and does not name the plant.';

function chewLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Sugar', 'limited', METH.sugar),
    flag(panel, 'Natural Flavors', 'limited', METH.flavors),
    flag(panel, 'Xylitol', 'limited', METH.xylitol),
    flag(panel, 'Natural Color', 'limited', METH.naturalColor),
    flag(panel, 'Stearic Acid', 'cleared', METH.stearic),
    flag(panel, 'Citric Acid', 'cleared', METH.citric),
    flag(panel, 'Silicon Dioxide', 'limited', METH.silica),
    flag(panel, 'Oligofructose', 'limited', METH.oligofructose),
    flag(panel, 'Fructose', 'limited', METH.fructose),
    flag(panel, 'Vegetable Protein Isolate', 'limited', METH.vegetableProtein),
  ];
}

function gripeLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Foeniculum vulgare (Fennel) seed extract', 'cleared', METH.botanical),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Organic agave syrup', 'cleared', METH.agave),
    flag(panel, 'Glycerin', 'cleared', METH.glycerin),
    flag(panel, 'Corn syrup', 'limited', METH.cornSyrup),
    flag(panel, 'Maltodextrin', 'limited', METH.maltodextrin),
    flag(panel, 'Melissa officinalis (lemon balm) leaf extract', 'cleared', METH.botanical),
    flag(panel, 'Natural ginger flavor', 'cleared', METH.flavorNamed),
    flag(panel, 'Matricaria recutita (chamomile) flower heads extract', 'cleared', METH.botanical),
    flag(panel, 'Citric acid', 'cleared', METH.citric),
    flag(panel, 'Potassium benzoate', 'moderate', METH.benzoate),
    flag(panel, 'Xanthan gum', 'cleared', METH.xanthan),
  ];
}

export const BATCH166_KYR6C_HELD_SLEEP_GRIPE: RatingRecord[] = [
  {
    id: 'zarbees-b166-sleep-chew-30',
    productName: "Zarbee's Children's Sleep Chewable Tablets with Melatonin, Natural Grape (30 chewable tablets)",
    brand: "Zarbee's",
    category: SLEEP,
    barcode: '898115002503',
    formulaId: 'zarbees-b166-sleep-chew',
    audience: KIDS,
    minAge: 3,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '1 mg' }],
    inactiveIngredients: chewLine(CHEW),
    verdict: 'caution',
    honestNote: `${NATURAL_COLOR_NOTE}`,
    retailers: ['Dollar General'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      "Zarbee's children's melatonin chewable page lists Count 30 and Count 50 and one ingredients block: melatonin; sugar, natural flavors, xylitol, natural color, stearic acid, citric acid, silicon dioxide, oligofructose, fructose, vegetable protein isolate. Each tablet contains melatonin 1 mg. Ages 3 to 5 years: 1 tablet. Ages 6 to 12 years: 1 to 2 tablets. Wegmans printed that same other-ingredients line on the 30 ct. Dollar General opened the natural grape 30 ct at $80.75 with 1 in stock. That page address ties UPC 898115002503 to this 30 ct. That code stays on this 30-count. The 50-count code 858438005582 was not copied here.",
    ],
  },
  {
    id: 'zarbees-b166-sleep-chew-50',
    productName: "Zarbee's Children's Sleep Chewable Tablets with Melatonin, Natural Grape (50 chewable tablets)",
    brand: "Zarbee's",
    category: SLEEP,
    barcode: '858438005582',
    formulaId: 'zarbees-b166-sleep-chew',
    audience: KIDS,
    minAge: 3,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '1 mg' }],
    inactiveIngredients: chewLine(CHEW),
    verdict: 'caution',
    honestNote: `${NATURAL_COLOR_NOTE}`,
    retailers: ['Target', 'Dollar General'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      "The same Zarbee's children's melatonin chewable page is the panel for this 50-count. The inactive line matches the 30-count, so this row reuses formula zarbees-b166-sleep-chew. Target TCIN 78821569 opened the natural grape 50ct at $13.59, primary barcode 858438005582. Dollar General opened that 50 ct at $9.00 with 3 in stock, and the page address is that same code. The 30-count code 898115002503 was not copied here. Target did not print the inactive line.",
    ],
  },
  {
    id: 'little-remedies-b166-gripe-4',
    productName: 'Little Remedies Gripe Water with Chamomile (4 fl oz)',
    brand: 'Little Remedies',
    category: DIGESTIVE,
    barcode: '756184122778',
    formulaId: 'little-remedies-b166-gripe',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Foeniculum vulgare (Fennel) seed extract', strength: 'label serving' },
      { name: 'Melissa officinalis (lemon balm) leaf extract', strength: 'label serving' },
      { name: 'Matricaria recutita (chamomile) flower heads extract', strength: 'label serving' },
    ],
    inactiveIngredients: gripeLine(GRIPE),
    verdict: 'caution',
    honestNote:
      '',
    retailers: ['Target', 'Amazon'],
    cleanAlternatives: GRIPE_ALTS,
    sourcesGeneral: [
      'Little Remedies gripe water page, one ingredients list: Foeniculum vulgare (Fennel) seed extract, purified water, organic agave syrup, glycerin, corn syrup, maltodextrin, melissa officinalis (lemon balm) leaf extract, natural ginger flavor, matricaria recutita (chamomile) flower heads extract, citric acid, potassium benzoate, xanthan gum. Safe for newborns. The page says this statement has not been evaluated by the Food and Drug Administration. Target TCIN 16346763 opened the 4 fl oz at $9.39, package quantity 1, primary barcode 756184122778. Amazon opened the 4 fl oz pack of 1 at $9.39, in stock, and printed UPC 756184122778. That code stays on this 4 fl oz bottle. A multipack is not a row. The saline codes were not copied here.',
    ],
  },
];

const ROWS = BATCH166_KYR6C_HELD_SLEEP_GRIPE;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function lineKey(record: RatingRecord): string {
  return record.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
}

if (ROWS.length !== 3) throw new Error(`batch166 row count ${ROWS.length}`);

const expected = [
  ['zarbees-b166-sleep-chew-30', 'caution', '898115002503', 'zarbees-b166-sleep-chew', 3],
  ['zarbees-b166-sleep-chew-50', 'caution', '858438005582', 'zarbees-b166-sleep-chew', 3],
  ['little-remedies-b166-gripe-4', 'caution', '756184122778', 'little-remedies-b166-gripe', 0],
] as const;

for (const [id, verdict, barcode, formulaId, minAge] of expected) {
  const record = ROWS.find((item) => item.id === id);
  if (!record) throw new Error(`batch166 missing ${id}`);
  if (record.verdict !== verdict || (record.barcode ?? '') !== barcode || record.formulaId !== formulaId || record.minAge !== minAge) {
    throw new Error(`batch166 mismatch ${id}`);
  }
  if (!upcOk(barcode)) throw new Error(`batch166 bad upc ${barcode}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch166 blank why ${id} ${ingredient.name}`);
    if (/pending dailymed/i.test(why) || /pending dailymed/i.test(ingredient.source ?? '')) {
      throw new Error(`batch166 pending tag ${id} ${ingredient.name}`);
    }
  }
  const sources = (record.sourcesGeneral ?? []).join(' ');
  if (/dailymed/i.test(sources)) throw new Error(`batch166 dailymed tag ${id}`);
}

const chew30 = ROWS.find((item) => item.id === 'zarbees-b166-sleep-chew-30')!;
const chew50 = ROWS.find((item) => item.id === 'zarbees-b166-sleep-chew-50')!;
const gripe = ROWS.find((item) => item.id === 'little-remedies-b166-gripe-4')!;
if (lineKey(chew30) !== lineKey(chew50)) throw new Error('batch166 chewable lines should match');
if (lineKey(chew30) === lineKey(gripe)) throw new Error('batch166 gripe line should differ');
if (!chew30.honestNote?.includes('does not name the plant') || chew30.honestNote !== chew50.honestNote) {
  throw new Error('batch166 natural color note');
}
if (gripe.honestNote?.includes('stacking rule (t137u)')) {
  throw new Error('batch166 gripe note');
}
if (new Set(ROWS.map((item) => item.barcode)).size !== 3) throw new Error('batch166 upc copy');
