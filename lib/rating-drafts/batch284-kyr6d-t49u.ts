// DRAFT / not verified / batch 284 KYR6-d (t49u still-open continuation).
// Brand page is the single source. A pack is here only when that page shows the
// 1-pack for sale and every other-ingredient token is already locked.
// Multipacks are not rows. Barcodes stay empty when the 1-pack had no code.
// Not in this file: Purr gummies (two listings, one SKU, two lines), Balance,
// Play, Colostrum, Burn TikTok, Sleep Immune 5 mg, TheraZinc 60-count,
// echinacea lozenges, Grüns 28s, Magnesium Breakthrough 60.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const S = {
  cleared: (name: string) => `Methodology §5 Cleared (${name}).`,
  citric: 'Methodology §5 Caution (citric acid). Does not count toward the t137u stack.',
  citrate: 'Methodology §5 Caution (sodium citrate). Does not count toward the t137u stack.',
  flavor: 'Methodology §5 Caution (natural flavor, singular). Does not count toward the t137u stack.',
  orgFlavor: 'Methodology §5 Caution (organic flavor). Does not count toward the t137u stack.',
  orgNat: 'Methodology §5 Caution (organic natural flavor — t90u). Does not count toward the t137u stack.',
  flavors: 'Methodology §5 Limited (natural flavors). Counts toward the t137u stack.',
  stevia:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.',
  malt: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  fruc: 'Methodology §5 Limited (fructose). Counts toward the t137u stack.',
  palm: 'Methodology §5 Avoid (non-GMO palm oil in a chew or gummy).',
  sugar: 'Methodology §5 Caution (sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  dextrose: 'Methodology §5 Caution (dextrose). Does not count toward the t137u stack.',
  tartaric: 'Methodology §5 Caution (tartaric acid). Does not count toward the t137u stack.',
  rice: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  bamboo:
    'Methodology §5 Caution (bamboo leaf extract). The parenthetical silica is not a separate token. Does not count toward the t137u stack.',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
} as const;

type Tok = [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  brand: string,
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  return finish({
    ...partial,
    brand,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: [brand],
    barcode: partial.barcode ?? '',
  });
}

function flags(panel: string, toks: Tok[]): IngredientFlag[] {
  return toks.map(([name, riskLevel, source]) => ({ name, riskLevel, source: `${panel}; ${source}` }));
}

const C = (name: string): Tok => [name, 'cleared', S.cleared(name)];
const CIT: Tok = ['Citric Acid', 'moderate', S.citric];
const SC: Tok = ['Sodium Citrate', 'moderate', S.citrate];
const NF: Tok = ['Natural Flavors', 'limited', S.flavors];
const N1: Tok = ['Natural Flavor', 'moderate', S.flavor];
const PALM: Tok = ['Non-GMO Palm Oil', 'high', S.palm];
const STEVIA: Tok = ['Stevia Leaf Extract', 'limited', S.stevia];
const OSTEVIA: Tok = ['Organic Stevia Leaf Extract', 'limited', S.stevia];

const PFOCUS =
  'Lemme brand page. Serving 2 gummies. Servings per container 25. The 1-pack is 50 gummies. Vitamin B12 is an active and is not graded. t49u brand-page single source.';
const PGROW =
  'Lemme brand page. Serving 1 chew. Servings per container 30. Biotin and the grow blend are actives and are not graded. t49u brand-page single source.';
const PRELAX =
  'Lemme brand page. Serving 1 chew. Servings per container 30. Magnesium is the active and is not graded. t49u brand-page single source.';
const PNAD =
  'Lemme brand page. Serving 2 capsules. Servings per container 30. The bottle is 60 capsules. NMN is the active and is not graded. t49u brand-page single source.';
const PSKIN =
  'Lemme brand page. Serving 1 gummy ring. Servings per container 21. The skin blend is the active and is not graded. t49u brand-page single source.';
const PCRE =
  'Lemme brand page. Serving 4 gummies. Servings per container 15. The bottle is 60 gummies. Creatine is the active and is not graded. t49u brand-page single source.';
const PMULTI =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The vitamins are the actives and are not graded. t49u brand-page single source.';
const PMOSS =
  'Lemme brand page. Serving 30 drops (1 mL). Servings per container 30. Vitamin D and the sea-moss blend are actives and are not graded. t49u brand-page single source.';
const PBURN =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The burn blend is the active and is not graded. t49u brand-page single source.';
const PIMM =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The immunity blend is the active and is not graded. t49u brand-page single source.';
const PGREEN =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The greens blend is the active and is not graded. t49u brand-page single source.';
const PCURB =
  'Lemme brand page. Serving 1 chew. Servings per container 30. The curb blend is the active and is not graded. t49u brand-page single source.';
const PFIB =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The fiber blend is the active and is not graded. t49u brand-page single source.';
const PTONE =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The tone blend is the active and is not graded. t49u brand-page single source.';
const PPURR =
  'Lemme brand page. Serving 2 capsules. Servings per container 30. The bottle is 60 capsules. The purr blend is the active and is not graded. t49u brand-page single source.';
const PGLOW =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The glow blend is the active and is not graded. t49u brand-page single source.';
const PSLEEP =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The sleep blend is the active and is not graded. t49u brand-page single source.';
const PDEB =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The bottle is 60 gummies. The debloat blend is the active and is not graded. t49u brand-page single source.';
const PQS =
  'Quantum Health brand page. Serving 1 capsule. Servings per container 30. The herbs and melatonin are the actives and are not graded. t49u brand-page single source.';
const PQSI =
  'Quantum Health brand page. Serving 1 capsule. Servings per container 30. The 2 mg listing is the line on the page. The herbs and melatonin are the actives and are not graded. t49u brand-page single source.';
const PELD =
  'Quantum Health brand page. Serving 1 lozenge. Servings per container 14. Zinc and elderberry are the actives and are not graded. t49u brand-page single source.';
const PLEM =
  'Quantum Health brand page. Serving 1 lozenge. The bottle is 24 lozenges. Zinc and the herbal blend are the actives and are not graded. t49u brand-page single source.';
const PCHE =
  'Quantum Health brand page. Serving 1 lozenge. The bottle is 24 lozenges. Zinc and the herbal blend are the actives and are not graded. This flavor line does not list citric acid. t49u brand-page single source.';

const BLEND = [{ name: 'Herbal blend', strength: 'milligram amounts not printed' }];

export const BATCH284_KYR6D_T49U: RatingRecord[] = [
  row('Lemme', {
    id: 'lemme-b284-focus-50',
    productName: 'Lemme Focus Gummies (50 gummies)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-focus-50',
    form: 'gummy',
    barcode: '850037549009',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PFOCUS, [
      C('Organic Tapioca Syrup'), C('Organic Cane Sugar'), C('Water'), CIT, C('Coconut Oil'), C('Carnauba Wax'),
      C('Fruit and Vegetable Juice (Color)'), ['Organic Natural Flavor', 'moderate', S.orgNat], C('Pectin'), SC,
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/focus lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 25. The 1-pack is 50 gummies. Organic natural flavor, citric acid, and sodium citrate are Caution and do not stack. Counted Limited tokens: none. No honest note. UPC 850037549009 is the 1-pack. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-grow-chew-30',
    productName: 'Lemme Grow Soft Chews (30 chews)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-grow-chew-30',
    form: 'chew',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PGROW, [
      C('Tapioca Syrup'), C('Organic Raw Cane Sugar'), PALM, N1, CIT, C('Sunflower Lecithin'),
      C('Fruit and Vegetable Juice (Color)'), C('Sea Salt'),
    ]),
    verdict: 'avoid',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-grow-soft-chews lists the 1-pack at $40 and in stock. Serving 1 chew. Servings per container 30. Non-GMO palm oil is Avoid in a chew. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-relax-chew-30',
    productName: 'Lemme Relax Magnesium Soft Chews (30 chews)',
    category: 'Sleep',
    formulaId: 'lemme-b284-relax-chew-30',
    form: 'chew',
    activeIngredients: [{ name: 'Magnesium', strength: 'amount not printed' }],
    inactiveIngredients: flags(PRELAX, [
      C('Tapioca Syrup'), C('Organic Raw Cane Sugar'), PALM, N1, CIT, C('Fruit and Vegetable Juice (Color)'),
      C('Sunflower Lecithin'), C('Sea Salt'), C('Stevia (Reb M)'), C('Monk Fruit'),
    ]),
    verdict: 'avoid',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-relax-soft-chews lists the 1-pack at $40 and in stock. Serving 1 chew. Servings per container 30. Non-GMO palm oil is Avoid in a chew. Stevia (Reb M) and monk fruit are the high-purity sweeteners and are Cleared. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row. The TikTok URL prints the same line and is not a second row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-nad-60',
    productName: 'Lemme NAD+ Capsules (60 capsules)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-nad-60',
    form: 'capsule',
    activeIngredients: [{ name: 'NMN', strength: '300 mg per 2 capsules' }],
    inactiveIngredients: flags(PNAD, [
      C('Organic Brown Rice Grain Flour'), C('Organic Brown Rice Sprouted Protein'), C('Hypromellose Vegan Capsule'),
    ]),
    verdict: 'clean',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-nad-capsules lists the 1-pack at $50 and in stock. Serving 2 capsules. Servings per container 30. The bottle is 60 capsules. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-skin-21',
    productName: 'Lemme Skin Gummy Rings (21 rings)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-skin-21',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PSKIN, [
      C('Cane Sugar'), C('Tapioca Syrup'), C('Water'), C('Pectin'), NF, CIT, C('Fruit and Vegetable Juice (Color)'), C('Lactic Acid'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-skin-firming-hydrating-gummy-rings lists the 1-pack at $40 and in stock. Serving 1 gummy ring. Servings per container 21. Natural flavors is the one counted Limited token. The page also says contains wheat. Wheat is not in the other-ingredient line and is not graded. Counted Limited tokens: natural flavors. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-creatine-apple-60',
    productName: 'Lemme Creatine Gummies Sour Apple (60 gummies)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-creatine-apple-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Creatine', strength: 'amount not printed' }],
    inactiveIngredients: flags(PCRE, [
      C('Tapioca Syrup'), C('Water'), C('Cane Sugar'), C('Pectin'), NF, CIT, C('Spirulina Extract (Color)'),
      C('Fruit Juice (Color)'), SC, OSTEVIA, ['Tartaric Acid', 'moderate', S.tartaric], C('Malic Acid'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-creatine-gummies-sour-apple lists the 1-pack at $30 and in stock. Serving 4 gummies. Servings per container 15. The bottle is 60 gummies. Counted Limited tokens: natural flavors and organic stevia leaf extract. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-creatine-blue-60',
    productName: 'Lemme Creatine Gummies Blue Raspberry (60 gummies)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-creatine-blue-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Creatine', strength: 'amount not printed' }],
    inactiveIngredients: flags(PCRE, [
      C('Tapioca Syrup'), C('Water'), C('Cane Sugar'), C('Pectin'), NF, CIT, C('Spirulina Extract (Color)'),
      SC, OSTEVIA, C('Malic Acid'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-creatine-gummies-blue-raspberry lists the 1-pack at $30 and in stock. Serving 4 gummies. Servings per container 15. The bottle is 60 gummies. This flavor does not list tartaric acid or fruit juice. Counted Limited tokens: natural flavors and organic stevia leaf extract. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-creatine-strawberry-60',
    productName: 'Lemme Creatine Gummies Sour Strawberry (60 gummies)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-creatine-strawberry-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Creatine', strength: 'amount not printed' }],
    inactiveIngredients: flags(PCRE, [
      C('Tapioca Syrup'), C('Water'), C('Cane Sugar'), C('Pectin'), NF, CIT, C('Vegetable Juice (Color)'),
      SC, OSTEVIA, C('Malic Acid'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-creatine-gummies lists the 1-pack at $30 and in stock. Serving 4 gummies. Servings per container 15. The bottle is 60 gummies. Counted Limited tokens: natural flavors and organic stevia leaf extract. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-multi-60',
    productName: 'Lemme Multi Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-multi-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PMULTI, [
      C('Tapioca Syrup'), C('Organic Cane Sugar'), C('Water'), C('Pectin'), NF, C('Vegetable Juice (Color)'),
      CIT, SC, C('Coconut Oil'), C('Carnauba Wax'), STEVIA,
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-multi-gummies lists the 1-pack at $40 and in stock. Serving 2 gummies. Servings per container 30. Counted Limited tokens: natural flavors and stevia leaf extract. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-sea-moss-30',
    productName: 'Lemme Sea Moss Tincture (30 mL)',
    category: 'Herbs',
    formulaId: 'lemme-b284-sea-moss-30',
    form: 'liquid',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PMOSS, [
      C('Organic Glycerin'), C('Purified Water'), ['Organic Flavor', 'moderate', S.orgFlavor],
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/sea-moss lists the 1-pack at $25 and in stock. Serving 30 drops (1 mL). Servings per container 30. The bottle is 30 mL. Organic flavor is Caution and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-burn-gummy-60',
    productName: 'Lemme Burn Gummies (60 gummies)',
    category: 'Herbs',
    formulaId: 'lemme-b284-burn-gummy-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PBURN, [
      C('Tapioca Fiber'), C('Organic Cane Sugar'), C('Water'), C('Pectin'), NF, CIT, C('Agar'), SC,
      C('Coconut Oil'), C('Carnauba Wax'), STEVIA,
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-burn-gummies lists the 1-pack at $40 and in stock. Serving 2 gummies. Servings per container 30. This is not the Burn Capsules row. Counted Limited tokens: natural flavors and stevia leaf extract. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-immunity-60',
    productName: 'Lemme Immunity Gummies (60 gummies)',
    category: 'Immune Support',
    formulaId: 'lemme-b284-immunity-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PIMM, [
      C('Tapioca Syrup'), C('Organic Cane Sugar'), C('Water'), C('Carnauba Wax'), C('Coconut Oil'), CIT,
      C('Fruit & Vegetable Juice (Color)'), NF, C('Pectin'), SC,
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-immunity-gummies lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. Counted Limited token: natural flavors. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row. The 14-count gift is not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-greens-60',
    productName: 'Lemme Greens Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-greens-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PGREEN, [
      C('Organic Tapioca Syrup'), C('Organic Cane Sugar'), C('Water'), C('Pectin'), N1, CIT, C('Monk Fruit Extract'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-greens-gummies lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. Natural flavor is the singular Caution token and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 3-pack and the 6-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-curb-30',
    productName: 'Lemme Curb Soft Chews (30 chews)',
    category: 'Digestive',
    formulaId: 'lemme-b284-curb-30',
    form: 'chew',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PCURB, [
      C('Tapioca Syrup'), C('Raw Cane Sugar'), PALM, C('Gum Arabic'), NF, C('Sunflower Lecithin'), CIT,
      C('Fruit and Vegetable Juice (Color)'), C('Sea Salt'),
    ]),
    verdict: 'avoid',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-curb-soft-chews-tiktok lists the 1-pack at $30 and in stock. The handle without TikTok had no available variant. Serving 1 chew. Servings per container 30. Non-GMO palm oil is Avoid in a chew. Natural flavors still counts, and the palm oil sets Avoid. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-fiber-60',
    productName: 'Lemme Fiber Gummies (60 gummies)',
    category: 'Digestive',
    formulaId: 'lemme-b284-fiber-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PFIB, [
      C('Water'), C('Pectin'), C('Agar Agar'), C('Tapioca Starch'), CIT, N1, C('Black Carrot (For Color)'),
      ['Trisodium Citrate', 'moderate', S.citrate], C('Carnauba Wax'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-fiber-gummies lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-tone-60',
    productName: 'Lemme Tone Gummies (60 gummies)',
    category: 'Herbs',
    formulaId: 'lemme-b284-tone-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PTONE, [
      C('Tapioca Fiber'), C('Organic Cane Sugar'), C('Water'), C('Pectin'), CIT, NF, C('Carnauba Wax'),
      C('Coconut Oil'), SC, C('Vegetable Juice (For Color)'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-tone-gummies lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. Counted Limited token: natural flavors. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-purr-cap-60',
    productName: 'Lemme Purr Capsules (60 capsules)',
    category: 'Herbs',
    formulaId: 'lemme-b284-purr-cap-60',
    form: 'capsule',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PPURR, [
      ['Bamboo Leaf Extract (Silica)', 'moderate', S.bamboo], C('Hypromellose Capsule'), ['Maltodextrin', 'limited', S.malt],
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-purr-capsule lists the 1-pack at $30 and in stock. Serving 2 capsules. Servings per container 30. Counted Limited token: maltodextrin. Bamboo leaf extract is Caution and does not stack. No honest note. Missing UPC. No code was invented. The 3-pack and the 6-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-glow-60',
    productName: 'Lemme Glow Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'lemme-b284-glow-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PGLOW, [
      C('Organic Tapioca Syrup'), C('Organic Cane Sugar'), C('Water'), C('Carnauba Wax'), CIT, C('Coconut Oil'),
      N1, C('Organic Fruit and Vegetable Juice (Color)'), C('Pectin'), SC,
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-glow lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. Natural flavor is the singular Caution token and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-sleep-60',
    productName: 'Lemme Sleep Gummies (60 gummies)',
    category: 'Sleep',
    formulaId: 'lemme-b284-sleep-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PSLEEP, [
      C('Organic Tapioca Syrup'), C('Organic Cane Sugar'), C('Water'), CIT, C('Coconut Oil'), C('Carnauba Wax'),
      C('Fruit and Vegetable Juice (Color)'), N1, C('Pectin'), SC,
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/sleep lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. Natural flavor is the singular Caution token and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b284-debloat-gummy-60',
    productName: 'Lemme Debloat Gummies (60 gummies)',
    category: 'Digestive',
    formulaId: 'lemme-b284-debloat-gummy-60',
    form: 'gummy',
    activeIngredients: BLEND,
    inactiveIngredients: flags(PDEB, [
      C('Tapioca Syrup'), C('Organic Cane Sugar'), C('Water'), C('Pectin'), CIT, NF, C('Fruit Juice (Color)'),
      SC, C('Coconut Oil'), C('Carnauba Wax'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/debloat lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. This is not the Debloat Capsules row. Counted Limited token: natural flavors. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b284-sleep-2-30',
    productName: 'Quantum Health Sleep (30 capsules, 2 mg melatonin)',
    category: 'Sleep',
    formulaId: 'quantum-b284-sleep',
    form: 'capsule',
    activeIngredients: [{ name: 'Melatonin', strength: '2 mg' }],
    inactiveIngredients: flags(PQS, [
      C('Hypromellose (Capsule)'), ['Rice Flour', 'moderate', S.rice], C('Magnesium Stearate'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/sleep lists the 2 mg bottle at $17.99 and in stock. Serving 1 capsule. Servings per container 30. Rice flour is Caution and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 5 mg bottle is a separate row.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b284-sleep-5-30',
    productName: 'Quantum Health Sleep Extra Strength (30 capsules, 5 mg melatonin)',
    category: 'Sleep',
    formulaId: 'quantum-b284-sleep',
    form: 'capsule',
    activeIngredients: [{ name: 'Melatonin', strength: '5 mg' }],
    inactiveIngredients: flags(PQS, [
      C('Hypromellose (Capsule)'), ['Rice Flour', 'moderate', S.rice], C('Magnesium Stearate'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/sleep lists the 5 mg bottle at $26.99 and in stock. Serving 1 capsule. Servings per container 30. The other-ingredient line matches the 2 mg bottle. The melatonin amount is 5 mg on this line. Rice flour is Caution and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b284-sleep-immune-2-30',
    productName: 'Quantum Health Sleep Immune (30 capsules, 2 mg melatonin)',
    category: 'Sleep',
    formulaId: 'quantum-b284-sleep-immune-2',
    form: 'capsule',
    activeIngredients: [{ name: 'Melatonin', strength: '2 mg' }],
    inactiveIngredients: flags(PQSI, [
      C('Hypromellose (Capsule)'), ['Rice Flour', 'moderate', S.rice], C('Magnesium Stearate'),
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/sleep-immune lists the 2 mg bottle at $26.99 and in stock. Serving 1 capsule. Servings per container 30. Rice flour is Caution and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. The 5 mg block on the same page still prints melatonin 2 mg, so that bottle is not this row.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b284-therazinc-elder-14',
    productName: 'Quantum Health TheraZinc Elderberry Raspberry Lozenges (14 lozenges)',
    category: 'Cold & Flu',
    formulaId: 'quantum-b284-therazinc-elder-14',
    form: 'lozenge',
    activeIngredients: [
      { name: 'Zinc (from zinc gluconate)', strength: '7 mg' },
      { name: 'European elder fruit', strength: '36 mg' },
    ],
    inactiveIngredients: flags(PELD, [
      ['Sugar', 'moderate', S.sugar],
      ['Dextrose', 'moderate', S.dextrose],
      ['Fructose', 'limited', S.fruc],
      ['Maltodextrin', 'limited', S.malt],
      C('Magnesium Stearate (vegetable source)'),
      C('Natural Raspberry Flavor'),
      ['Stevia Leaf Extract (Steviol Glycosides)', 'limited', S.stevia],
    ]),
    verdict: 'avoid',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-elderberry-lozenges lists the 14-count at $3.59 and in stock. Serving 1 lozenge. Servings per container 14. Counted Limited tokens: fructose, maltodextrin, and stevia leaf extract. Three Limited tokens make Avoid, and the honest note names those three. Missing UPC. No code was invented. The 60-count is a different size and the page serving line is 14, so the 60-count is not this row.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b284-therazinc-lemon-24',
    productName: 'Quantum Health TheraZinc Immune Support Lozenges Lemon (24 lozenges)',
    category: 'Cold & Flu',
    formulaId: 'quantum-b284-therazinc-lemon-24',
    form: 'lozenge',
    activeIngredients: [{ name: 'Zinc (from zinc gluconate)', strength: '14 mg' }],
    inactiveIngredients: flags(PLEM, [
      ['Sugar', 'moderate', S.sugar],
      C('Stearic Acid'),
      C('Natural Lemon Flavor'),
      CIT,
      C('Magnesium Stearate (vegetable source)'),
      ['Silicon Dioxide', 'limited', S.silica],
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-foil-packed-lozenges lists Lemon Lozenges at $12.59 and in stock. Serving 1 lozenge. The bottle is 24 lozenges. Sugar and citric acid are Caution and do not stack. Silicon dioxide does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented. Orange lozenges were not available and are not this row.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b284-therazinc-cherry-24',
    productName: 'Quantum Health TheraZinc Immune Support Lozenges Cherry (24 lozenges)',
    category: 'Cold & Flu',
    formulaId: 'quantum-b284-therazinc-cherry-24',
    form: 'lozenge',
    activeIngredients: [{ name: 'Zinc (from zinc gluconate)', strength: '14 mg' }],
    inactiveIngredients: flags(PCHE, [
      ['Sugar', 'moderate', S.sugar],
      C('Stearic Acid'),
      C('Natural Cherry Flavor'),
      C('Magnesium Stearate (vegetable source)'),
      ['Silicon Dioxide', 'limited', S.silica],
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-foil-packed-lozenges lists Cherry Lozenges at $12.59 and in stock. Serving 1 lozenge. The bottle is 24 lozenges. This flavor line does not list citric acid. Sugar is Caution and does not stack. Silicon dioxide does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH284_KYR6D_T49U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string }> = {
  'lemme-b284-focus-50': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b284-grow-chew-30': { verdict: 'avoid', cause: 'high', counted: '' },
  'lemme-b284-relax-chew-30': { verdict: 'avoid', cause: 'high', counted: '' },
  'lemme-b284-nad-60': { verdict: 'clean', cause: 'clean', counted: '' },
  'lemme-b284-skin-21': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors' },
  'lemme-b284-creatine-apple-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors|Organic Stevia Leaf Extract' },
  'lemme-b284-creatine-blue-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors|Organic Stevia Leaf Extract' },
  'lemme-b284-creatine-strawberry-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors|Organic Stevia Leaf Extract' },
  'lemme-b284-multi-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors|Stevia Leaf Extract' },
  'lemme-b284-sea-moss-30': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b284-burn-gummy-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors|Stevia Leaf Extract' },
  'lemme-b284-immunity-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors' },
  'lemme-b284-greens-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b284-curb-30': { verdict: 'avoid', cause: 'high', counted: 'Natural Flavors' },
  'lemme-b284-fiber-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b284-tone-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors' },
  'lemme-b284-purr-cap-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Maltodextrin' },
  'lemme-b284-glow-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b284-sleep-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b284-debloat-gummy-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Natural Flavors' },
  'quantum-b284-sleep-2-30': { verdict: 'caution', cause: 'moderate', counted: '' },
  'quantum-b284-sleep-5-30': { verdict: 'caution', cause: 'moderate', counted: '' },
  'quantum-b284-sleep-immune-2-30': { verdict: 'caution', cause: 'moderate', counted: '' },
  'quantum-b284-therazinc-elder-14': { verdict: 'avoid', cause: 'limited_stack', counted: 'Fructose|Maltodextrin|Stevia Leaf Extract (Steviol Glycosides)' },
  'quantum-b284-therazinc-lemon-24': { verdict: 'caution', cause: 'moderate', counted: '' },
  'quantum-b284-therazinc-cherry-24': { verdict: 'caution', cause: 'moderate', counted: '' },
};

const NOTE_IDS = new Set(['quantum-b284-therazinc-elder-14']);

if (ROWS.length !== 26) throw new Error(`batch284 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch284 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch284 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch284 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch284 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch284 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch284 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch284 pending ${ingredient.name}`);
    }
  }
}
