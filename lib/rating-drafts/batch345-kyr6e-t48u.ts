// DRAFT / not verified / batch 345 KYR6-e (t48u).
// Nature's Answer holds opened by the Quik-Sorb and sorbate locks.
// The Sprouts section is not edited. No other locks.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const GLY = 'Methodology §5 Cleared (glycerin / vegetable glycerin).';
const WATER = 'Methodology §5 Cleared (water / purified water).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const FLAVORS = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavors is the exact t54u name. Counts toward the t137u stack.';
const PEPFLAV = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Peppermint Flavor is the exact t54u name. Counts toward the t137u stack.';
const LEMON = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Lemon Flavor is the exact t54u name. Counts toward the t137u stack.';
const ORANGE = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Orange Flavor is the exact t54u name. Counts toward the t137u stack.';
const RASP = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Raspberry Flavor is the exact t54u name. Counts toward the t137u stack.';
const SORB = 'Methodology §5 Caution (potassium sorbate — t45u). Zero-point Caution cap. Does not count toward the t137u stack.';
const SORB48 = 'Methodology §5 Caution (t48u). Parenthetical potassium sorbate. Zero-point Caution cap. Does not count toward the t137u stack.';
const MONK = 'Methodology §5 Cleared (monk fruit extract). Does not count toward the t137u stack.';
const XANTH = 'Methodology §5 Cleared (xanthan gum — t98u). Does not count toward the t137u stack.';
const QUIK = 'Methodology §5 Cleared (t48u). Quik-Sorb named ginger, amla or alma, and capsicum token. Does not count toward the t137u stack.';
const PEP = 'Methodology §5 Cleared (peppermint oil). Does not count toward the t137u stack.';
const SPEAR = 'Methodology §5 Cleared (spearmint oil — t130e). Does not count toward the t137u stack.';
const CELL = 'Methodology §5 Cleared (vegetable cellulose capsule).';
const SILICATE = 'Methodology §5 Caution (calcium silicate). Does not count toward the t137u stack.';
const FLOUR = 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.';
const AGAVE = 'Methodology §5 Cleared (agave nectar / syrup). Does not count toward the t137u stack.';
const SODIUM = 'Methodology §5 Cleared (sodium citrate).';
const MALIC = 'Methodology §5 Cleared (malic acid).';
const OLIVE = 'Methodology §5 Cleared (extra virgin olive oil).';
const HPMC = 'Methodology §5 Cleared (hypromellose capsule).';
const SILICA = 'Methodology §5 Caution (silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.';
const LEC = 'Methodology §5 Cleared (sunflower lecithin). EFSA 2017 lecithin review. Does not count toward the t137u stack.';
const STEVIA = 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.';
const TANGERINE = 'Methodology §5 Cleared (t48u). Natural Tangerine Flavor names tangerine. Does not count toward the t137u stack.';
const VITE = 'Methodology §5 Cleared (vitamin E acetate / tocopheryl acetate).';
const ORANGEOIL = 'Methodology §5 Cleared (orange oil — t130e). Does not count toward the t137u stack.';

const SRC: Record<string, string> = {
  gly: GLY, water: WATER, citric: CITRIC, flavors: FLAVORS, pepflav: PEPFLAV, lemon: LEMON, orange: ORANGE,
  rasp: RASP, sorb: SORB, sorb48: SORB48, monk: MONK, xanth: XANTH, quik: QUIK, pep: PEP, spear: SPEAR,
  cell: CELL, silicate: SILICATE, flour: FLOUR, agave: AGAVE, sodium: SODIUM, malic: MALIC, olive: OLIVE,
  hpmc: HPMC, silica: SILICA, lec: LEC, stevia: STEVIA, tangerine: TANGERINE, vite: VITE, orangeoil: ORANGEOIL,
};

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
  barcode: string;
  ings: Ing[];
  actives: ActiveIngredient[];
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: "Nature's Answer",
    category: 'Herbs',
    formulaId: args.id,
    form: args.form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ["Nature's Answer"],
    barcode: args.barcode,
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, key]) => ({
      name,
      riskLevel,
      source: `Nature's Answer brand facts image. t48u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const MISS = ' The facts image did not print a UPC. The brand variant barcode field is empty, so none was attached. Missing UPC.';

export const BATCH345_KYR6E_T48U: RatingRecord[] = [
  row({
    id: 'naturesanswer-b345-eye-care-8',
    productName: "Nature's Answer Liquid Eye Care Max (8 oz)",
    form: 'liquid',
    barcode: '083000261497',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Potassium Sorbate', 'moderate', 'sorb'],
      ['Monk Fruit Extract', 'cleared', 'monk'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Eye Care blend', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-eye-care-max-8oz lists 8 oz at $34.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, Natural Flavors, Citric Acid, Potassium Sorbate, Monk Fruit Extract, Xanthan Gum, Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit). Counted Limited token: Natural Flavors. Potassium Sorbate is the zero-point Caution cap. The brand variant barcode field lists 083000261497. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-mullein-throat-spray-2',
    productName: "Nature's Answer Mullein-X Throat Spray (2 oz)",
    form: 'spray',
    barcode: '083000262555',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Natural Peppermint Flavor', 'limited', 'pepflav'],
      ['Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Mullein-X Throat Spray blend', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/mullein-x-throat-spray-on-the-go lists 2 oz at $18.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, Natural Peppermint Flavor, Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit). Counted Limited token: Natural Peppermint Flavor. The brand variant barcode field lists 083000262555. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-chlorophyll-drops-2',
    productName: "Nature's Answer Chlorophyll Liquid Drops (2 oz)",
    form: 'liquid',
    barcode: '083000261114',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Peppermint Oil', 'cleared', 'pep'],
      ['Quik-Sorb® (Ginger Rhizome Extract, Amla Fruit Extract, Capsicum Fruit Extract)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Chlorophyll', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/chlorophyll-liquid-drops-2oz lists 2 oz at $21.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, Citric Acid, Peppermint Oil, Quik-Sorb® (Ginger Rhizome Extract, Amla Fruit Extract, Capsicum Fruit Extract). Counted Limited tokens: none. The brand variant barcode field lists 083000261114. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-lions-mane-90',
    productName: "Nature's Answer Lion's Mane (90 capsules)",
    form: 'capsule',
    barcode: '083000161728',
    ings: [
      ['Vegetable Cellulose (capsule)', 'cleared', 'cell'],
      ['Quik-Sorb® (Ginger Root, Amla Extract, Capsicum Fruit)', 'cleared', 'quik'],
      ['Calcium Silicate', 'moderate', 'silicate'],
    ],
    actives: [{ name: "Lion's Mane", strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/lions-mane lists 90 capsules at $29.99 and in stock. Other Ingredients: Vegetable Cellulose (capsule), Quik-Sorb® (Ginger Root, Amla Extract, Capsicum Fruit), Calcium Silicate. The line after that is a free-from list and is not graded. Counted Limited tokens: none. Calcium silicate is Caution and does not stack. The brand variant barcode field lists 083000161728. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-ionic-zinc-4',
    productName: "Nature's Answer Ionic Zinc Immune with Black Elderberry (4 oz)",
    form: 'liquid',
    barcode: '',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Quik-Sorb® (Ginger Root, Amla Fruit Extract, Capsicum Fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Ionic Zinc Immune blend', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/ionic-zinc-immune-with-black-elderberry-4-oz-extract-with-slippery-elm-echinacea-astragalus-sage lists 4 oz at $28.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, Citric Acid, Quik-Sorb® (Ginger Root, Amla Fruit Extract, Capsicum Fruit). Counted Limited tokens: none.' + MISS,
  }),
  row({
    id: 'naturesanswer-b345-vitamin-c-8',
    productName: "Nature's Answer Vitamin C Liquid (8 oz)",
    form: 'liquid',
    barcode: '083000261152',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Natural Lemon Flavor', 'limited', 'lemon'],
      ['Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Vitamin C', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-vitamin-c-8-oz lists 8 oz at $14.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, Citric Acid, Natural Lemon Flavor, Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit). Counted Limited token: Natural Lemon Flavor. The brand variant barcode field lists 083000261152. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-b-complex-8',
    productName: "Nature's Answer Vitamin B-Complex Liquid (8 oz)",
    form: 'liquid',
    barcode: '083000261053',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Organic Agave Nectar', 'cleared', 'agave'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Potassium Sorbate (preservative)', 'moderate', 'sorb48'],
      ['Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Vitamin B-Complex', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-vitamin-b-complex lists 8 oz at $21.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, Organic Agave Nectar, Xanthan Gum, Natural Flavors, Potassium Sorbate (preservative), Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit). Counted Limited token: Natural Flavors. The 16 oz is a separate single. The brand variant barcode field lists 083000261053. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-b-complex-16',
    productName: "Nature's Answer Vitamin B-Complex Liquid (16 oz)",
    form: 'liquid',
    barcode: '083000261077',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Organic Agave Nectar', 'cleared', 'agave'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Potassium Sorbate (preservative)', 'moderate', 'sorb48'],
      ['Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Vitamin B-Complex', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-vitamin-b-complex lists 16 oz at $34.99 and in stock. Same other-ingredients line as the 8 oz. Counted Limited token: Natural Flavors. The brand variant barcode field lists 083000261077. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-turmeric-ginger-90',
    productName: "Nature's Answer Turmeric and Ginger (90 capsules)",
    form: 'capsule',
    barcode: '083000265945',
    ings: [
      ['Extra Virgin Olive Oil', 'cleared', 'olive'],
      ['Hypromellose (Capsule)', 'cleared', 'hpmc'],
      ['Silicon Dioxide', 'moderate', 'silica'],
      ['Organic Sunflower Lecithin Oil', 'cleared', 'lec'],
      ['Quik-Sorb® Blend (Ginger Root Powder, Amla Fruit Extract, Cayenne Fruit Powder)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Turmeric and Ginger', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/turmeric-and-ginger-90-extractacaps lists 90 capsules at $34.99 and in stock. Other Ingredients: Extra Virgin Olive Oil, Hypromellose (Capsule), Silicon Dioxide, Organic Sunflower Lecithin Oil, Quik-Sorb® Blend (Ginger Root Powder, Amla Fruit Extract, Cayenne Fruit Powder). The line after that is a free-from list and is not graded. Counted Limited tokens: none. Silicon dioxide is the zero-point Caution cap. The brand variant barcode field lists 083000265945. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-resveratrol-5',
    productName: "Nature's Answer Resveratrol Reserve (5 oz)",
    form: 'liquid',
    barcode: '083000261770',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Resveratrol Reserve', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/resveratrol-reserve-liquid lists 5 oz at $38.99 and in stock. The facts image prints a 1 teaspoon (5 mL) serving. Other Ingredients: Vegetable Glycerin, USP Purified Water, Xanthan Gum, Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit). Counted Limited tokens: none. The brand variant barcode field lists 083000261770. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-pueraria-60',
    productName: "Nature's Answer Pueraria Mirifica (60 capsules)",
    form: 'capsule',
    barcode: '083000261879',
    ings: [
      ['Rice Flour', 'moderate', 'flour'],
      ['Vegetable Cellulose (capsule)', 'cleared', 'cell'],
      ['Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit)', 'cleared', 'quik'],
      ['Calcium Silicate', 'moderate', 'silicate'],
    ],
    actives: [{ name: 'Pueraria Mirifica', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/pueraria-mirifica-60-veggie-capsules lists 60 capsules at $27.99 and in stock. Other Ingredients: Rice Flour, Vegetable Cellulose (capsule), Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit), Calcium Silicate. Counted Limited tokens: none. Rice flour and calcium silicate are Caution and do not stack. The brand variant barcode field lists 083000261879. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-green-tea-12',
    productName: "Nature's Answer Green Tea Energy 12-Pack (2 oz)",
    form: 'liquid',
    barcode: '083000017001',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Organic Agave Nectar Concentrate', 'cleared', 'agave'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Sodium Citrate', 'cleared', 'sodium'],
      ['Potassium Sorbate (preservative)', 'moderate', 'sorb48'],
      ['Malic Acid', 'cleared', 'malic'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Quik-Sorb® (Ginger Root, Amla Fruit Extract, Capsicum Fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Green Tea Energy', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/green-tea-energy-shot-2oz lists only the 2 oz 12-pack, in stock at $47.88. No single 2 oz shot is sold, so this pack is the available unit. Other Ingredients: Purified Water, Organic Agave Nectar Concentrate, Vegetable Glycerin, Natural Flavors, Sodium Citrate, Potassium Sorbate (preservative), Malic Acid, Citric Acid, Quik-Sorb® (Ginger Root, Amla Fruit Extract, Capsicum Fruit). Counted Limited token: Natural Flavors. The brand variant barcode field lists 083000017001. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-turmeric-pepper-16',
    productName: "Nature's Answer Turmeric with Black Pepper (16 oz)",
    form: 'liquid',
    barcode: '083000261633',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['Stevia (Stevia rebaudiana) Leaf Extract Powder', 'limited', 'stevia'],
      ['Natural Orange Flavor', 'limited', 'orange'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Sunflower Lecithin', 'cleared', 'lec'],
      ['Potassium Sorbate (as a preservative)', 'moderate', 'sorb48'],
    ],
    actives: [{ name: 'Turmeric with Black Pepper', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-turmeric-with-black-pepper-16-ounce-3500-mg lists 16 oz at $26.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, Stevia (Stevia rebaudiana) Leaf Extract Powder, Natural Orange Flavor, Citric Acid, Xanthan Gum, Sunflower Lecithin, Potassium Sorbate (as a preservative). Counted Limited tokens: Stevia (Stevia rebaudiana) Leaf Extract Powder and Natural Orange Flavor. That is two, so this is not a 3+ stack. The brand variant barcode field lists 083000261633. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-chlorophyll-16',
    productName: "Nature's Answer Chlorophyll Liquid (16 oz)",
    form: 'liquid',
    barcode: '083000261268',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Potassium Sorbate (preservative)', 'moderate', 'sorb48'],
      ['Spearmint Oil', 'cleared', 'spear'],
    ],
    actives: [{ name: 'Chlorophyll', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/chlorophyll-liquid-16-oz lists 16 oz at $21.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, Citric Acid, Potassium Sorbate (preservative), Spearmint Oil. Counted Limited tokens: none. Potassium Sorbate (preservative) is the zero-point Caution cap. The brand variant barcode field lists 083000261268. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-sambucus-shot-12',
    productName: "Nature's Answer Sambucus Shot 12-Pack (2 oz)",
    form: 'liquid',
    barcode: '083000018008',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Sodium Citrate', 'cleared', 'sodium'],
      ['Potassium Sorbate (preservative)', 'moderate', 'sorb48'],
      ['Malic Acid', 'cleared', 'malic'],
      ['Citric Acid', 'cleared', 'citric'],
    ],
    actives: [{ name: 'Sambucus', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/sambucus-shot-on-the-go-12-pack-of-2oz-alcohol-free lists only the 2 oz 12-pack, in stock at $3.99. No single 2 oz shot is sold, so this pack is the available unit. Other Ingredients: Purified Water, Vegetable Glycerin, Natural Flavors, Sodium Citrate, Potassium Sorbate (preservative), Malic Acid, Citric Acid. Counted Limited token: Natural Flavors. The brand variant barcode field lists 083000018008. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-mag-16',
    productName: "Nature's Answer Magnesium Malate and Glycinate (16 oz)",
    form: 'liquid',
    barcode: '083000261732',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Organic Agave Nectar Syrup', 'cleared', 'agave'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Potassium Sorbate', 'moderate', 'sorb'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Natural Tangerine Flavor', 'cleared', 'tangerine'],
    ],
    actives: [{ name: 'Magnesium Malate and Glycinate', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-magnesium-and-glycinate lists 16 oz at $21.99 and in stock. Other Ingredients: Purified Water, Organic Agave Nectar Syrup, Citric Acid, Potassium Sorbate, Xanthan Gum, Natural Tangerine Flavor. Counted Limited tokens: none. Potassium Sorbate is the zero-point Caution cap. The brand variant barcode field lists 083000261732. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-mag-32',
    productName: "Nature's Answer Magnesium Malate and Glycinate (32 oz)",
    form: 'liquid',
    barcode: '',
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Organic Agave Nectar Syrup', 'cleared', 'agave'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Potassium Sorbate', 'moderate', 'sorb'],
      ['Xanthan Gum', 'cleared', 'xanth'],
      ['Natural Tangerine Flavor', 'cleared', 'tangerine'],
    ],
    actives: [{ name: 'Magnesium Malate and Glycinate', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-magnesium-and-glycinate lists 32 oz at $39.99 and in stock. Same other-ingredients line as the 16 oz. Counted Limited tokens: none. The variant barcode field is 08300026191, which is 11 digits, so it was not attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b345-b12-2',
    productName: "Nature's Answer Vitamin B-12 Liquid (2 oz)",
    form: 'liquid',
    barcode: '',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Potassium Sorbate (preservative)', 'moderate', 'sorb48'],
      ['Vitamin E Acetate', 'cleared', 'vite'],
      ['Quik-Sorb (ginger rhizome, amla fruit, capsicum fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Vitamin B-12', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/liquid-vitamin-b12-2-oz lists 2 oz at $19.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, Natural Flavors, Citric Acid, Potassium Sorbate (preservative), Vitamin E Acetate, Quik-Sorb (ginger rhizome, amla fruit, capsicum fruit). Contains: Soy is an allergen line and is not graded. Counted Limited token: Natural Flavors.' + MISS,
  }),
  row({
    id: 'naturesanswer-b345-mullein-multi-4',
    productName: "Nature's Answer Mullein-X Multi System Cough Syrup (4 oz)",
    form: 'liquid',
    barcode: '083000262531',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['Natural Peppermint Flavor', 'limited', 'pepflav'],
      ['Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'Mullein-X Multi System blend', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/mullein-x-cough-syrup-multi-system lists the 4 oz bottle at $21.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, Natural Peppermint Flavor, Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit). Counted Limited token: Natural Peppermint Flavor. The 2-bottle variant is a multipack of this single and is not a row. The brand variant barcode field lists 083000262531. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-carnitine-16',
    productName: "Nature's Answer L-Carnitine 1200 (16 oz)",
    form: 'liquid',
    barcode: '083000261756',
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Potassium Sorbate (preservative)', 'moderate', 'sorb48'],
      ['Natural Raspberry Flavor', 'limited', 'rasp'],
      ['Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit)', 'cleared', 'quik'],
    ],
    actives: [{ name: 'L-Carnitine', strength: '1,200 mg' }],
    source: 't48u. https://naturesanswer.com/products/liquid-l-carnitine-1200-mg-16-oz lists 16 oz at $29.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, Citric Acid, Potassium Sorbate (preservative), Natural Raspberry Flavor, Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit). Counted Limited token: Natural Raspberry Flavor. The brand variant barcode field lists 083000261756. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b345-omega3-8',
    productName: "Nature's Answer Omega-3 Black Seed Oil (8 oz)",
    form: 'liquid',
    barcode: '083000261428',
    ings: [
      ['Orange Oil', 'cleared', 'orangeoil'],
    ],
    actives: [{ name: 'Omega-3 Black Seed Oil', strength: 'as printed on the facts image' }],
    source: 't48u. https://naturesanswer.com/products/omega-3-black-seed-oil-8oz-deep-sea-fish-oil lists 8 oz at $37.99 and in stock. Other Ingredients: Orange Oil. Contains: Fish (Anchovy, Sardine) is an allergen line and is not graded. Counted Limited tokens: none. The brand variant barcode field lists 083000261428. The check digit passes.',
  }),
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

const ROWS = BATCH345_KYR6E_T48U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
if (ROWS.length !== 21) throw new Error(`batch345 count ${ROWS.length}`);
const expectLimited: Record<string, number> = {
  'naturesanswer-b345-eye-care-8': 1,
  'naturesanswer-b345-mullein-throat-spray-2': 1,
  'naturesanswer-b345-chlorophyll-drops-2': 0,
  'naturesanswer-b345-lions-mane-90': 0,
  'naturesanswer-b345-ionic-zinc-4': 0,
  'naturesanswer-b345-vitamin-c-8': 1,
  'naturesanswer-b345-b-complex-8': 1,
  'naturesanswer-b345-b-complex-16': 1,
  'naturesanswer-b345-turmeric-ginger-90': 0,
  'naturesanswer-b345-resveratrol-5': 0,
  'naturesanswer-b345-pueraria-60': 0,
  'naturesanswer-b345-green-tea-12': 1,
  'naturesanswer-b345-turmeric-pepper-16': 2,
  'naturesanswer-b345-chlorophyll-16': 0,
  'naturesanswer-b345-sambucus-shot-12': 1,
  'naturesanswer-b345-mag-16': 0,
  'naturesanswer-b345-mag-32': 0,
  'naturesanswer-b345-b12-2': 1,
  'naturesanswer-b345-mullein-multi-4': 1,
  'naturesanswer-b345-carnitine-16': 1,
  'naturesanswer-b345-omega3-8': 0,
};
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(record.id);
  ids.add(record.id);
  if (expectLimited[record.id] === undefined) throw new Error('missing ' + record.id);
  if (record.barcode && !upcCheck(record.barcode)) throw new Error(record.id + ' upc');
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== expectLimited[record.id]) throw new Error(`${record.id} stack ${counted.map((i) => i.name).join('|')}`);
  if (counted.length >= 3) {
    if (!(record.honestNote || '').includes('stacking rule (t137u)')) throw new Error(record.id + ' note');
  } else if (record.honestNote) throw new Error(record.id + ' extra ' + record.honestNote);
  const cautionCap = record.inactiveIngredients.some((i) => i.riskLevel === 'moderate');
  const want = counted.length >= 3 ? 'avoid' : counted.length > 0 || cautionCap ? 'caution' : 'clean';
  if (record.verdict !== want) throw new Error(`${record.id} ${record.verdict} != ${want}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
