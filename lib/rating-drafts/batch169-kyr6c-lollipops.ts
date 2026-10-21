// DRAFT / not verified / batch 169 KYR6-c Beekeeper's Propolis Lollipops.
// US only. The 15-count panel was read. UPC 834706000435.
// Apple puree, strawberry puree, and blackberry puree are Cleared
// named fruit. The Sept 15 Limited gummy-base lock is struck.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const COLD = 'Cold & Flu';

const METH = {
  appleFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  berryFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  brownRice: 'Methodology §5 Cleared (organic brown rice syrup — rice syrup / brown rice food-state).',
  chicory: 'Methodology §5 Cleared (chicory root fiber — inulin family).',
  citric: 'Methodology §5 Cleared (citric acid).',
  fruit: 'Methodology §5 Cleared (apple puree, strawberry puree, and blackberry puree — named fruit; Clean; not a sugar row; not Usable; not high fructose corn syrup; locked Oct 14, 2026). These are the fruit.',
  honey: 'Methodology §5 Cleared (honey, oral sweetener).',
  honeyFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  juiceColor: 'Methodology §5 Cleared (fruit and vegetable juices for color — named fruit-or-vegetable juice as color).',
  malic: 'Methodology §5 Cleared (malic acid — organic acid with citric).',
  monk: 'Methodology §5 Cleared (monk fruit extract — high-purity monk fruit / mogrosides).',
  strawberryFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  tapioca: 'Methodology §5 Cleared (tapioca fiber — same fiber row as soluble tapioca fiber). Not tapioca dextrin.',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const LOLLIPOP_ALTS: CleanAlternative[] = [
  alt(
    'beekeepers-propolis-throat-spray',
    'Independently Clean propolis throat spray already on main. Minimum age 12. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'beekeepers-b165-lozenges-14',
    'Independently Clean propolis lozenge already on main. Minimum age 12. Form labeled, not a hard filter (§6).',
  ),
];

const PANEL = "Beekeeper's Naturals Propolis Lollipops 15-count panel";

export const BATCH169_KYR6C_LOLLIPOPS: RatingRecord[] = [
  {
    id: 'beekeepers-b169-lollipops-15',
    productName: "Beekeeper's Naturals Propolis Lollipops (15 count)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '834706000435',
    formulaId: 'beekeepers-b169-lollipops',
    form: 'lollipop',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [{ name: 'Propolis', strength: 'label serving' }],
    inactiveIngredients: [
      flag(PANEL, 'Organic brown rice syrup', 'cleared', METH.brownRice),
      flag(PANEL, 'Chicory root fiber', 'cleared', METH.chicory),
      flag(PANEL, 'Tapioca fiber', 'cleared', METH.tapioca),
      flag(PANEL, 'Honey', 'cleared', METH.honey),
      flag(PANEL, 'Apple puree', 'cleared', METH.fruit),
      flag(PANEL, 'Strawberry puree', 'cleared', METH.fruit),
      flag(PANEL, 'Blackberry puree', 'cleared', METH.fruit),
      flag(PANEL, 'Natural apple flavor', 'cleared', METH.appleFlavor),
      flag(PANEL, 'Natural strawberry flavor', 'cleared', METH.strawberryFlavor),
      flag(PANEL, 'Natural mixed berry/elderberry flavor', 'cleared', METH.berryFlavor),
      flag(PANEL, 'Citric acid', 'cleared', METH.citric),
      flag(PANEL, 'Malic acid', 'cleared', METH.malic),
      flag(PANEL, 'Fruit and vegetable juices (for color)', 'cleared', METH.juiceColor),
      flag(PANEL, 'Monk fruit extract', 'cleared', METH.monk),
      flag(PANEL, 'Natural honey flavor', 'cleared', METH.honeyFlavor),
    ],
    verdict: 'clean',
    retailers: [],
    cleanAlternatives: LOLLIPOP_ALTS,
    sourcesGeneral: [
      "The panel was read for Beekeeper's Naturals Propolis Lollipops, 15 count. UPC 834706000435. Other ingredients: organic brown rice syrup, chicory root fiber, tapioca fiber, honey, apple puree, strawberry puree, blackberry puree, natural apple flavor, natural strawberry flavor, natural mixed berry/elderberry flavor, citric acid, malic acid, fruit and vegetable juices (for color), monk fruit extract, natural honey flavor. Propolis is the active. The 14-count lozenge code 628055142508 and the 24-count lozenge code 834706002682 were not copied here.",
    ],
  },
];

const ROWS = BATCH169_KYR6C_LOLLIPOPS;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch169 row count ${ROWS.length}`);

const record = ROWS[0];
if (record.id !== 'beekeepers-b169-lollipops-15') throw new Error('batch169 id');
if (record.barcode !== '834706000435' || !upcOk(record.barcode)) throw new Error('batch169 upc');
if (record.formulaId !== 'beekeepers-b169-lollipops') throw new Error('batch169 formula');
if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error('batch169 note');
if (record.minAge != null) throw new Error('batch169 age was not on the panel');
if (/dailymed/i.test((record.sourcesGeneral ?? []).join(' '))) throw new Error('batch169 dailymed source');
const names = record.inactiveIngredients.map((item) => item.name);
if (names.length !== 15) throw new Error(`batch169 inactive count ${names.length}`);
for (const ingredient of record.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why) throw new Error(`batch169 blank why ${ingredient.name}`);
  if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch169 dailymed ${ingredient.name}`);
  if (/puree/.test(ingredient.name.toLowerCase())) {
    if (ingredient.riskLevel !== 'cleared') throw new Error(`batch169 puree ${ingredient.name}`);
    if (!/this is the fruit/i.test(why)) throw new Error(`batch169 puree why ${ingredient.name}: ${why}`);
  }
}
const limited = record.inactiveIngredients.filter((item) => item.riskLevel === 'limited').map((item) => item.name);
if (limited.length !== 0) throw new Error(`batch169 limited ${limited.join('|')}`);
