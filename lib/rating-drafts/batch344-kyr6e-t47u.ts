// DRAFT / not verified / batch 344 KYR6-e (t47u).
// Nature's Answer singles whose other-ingredient lines are already locked.
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

const CLEARED_GLY = 'Methodology §5 Cleared (glycerin / vegetable glycerin).';
const CLEARED_WATER = 'Methodology §5 Cleared (water / purified water).';
const CLEARED_CITRIC = 'Methodology §5 Cleared (citric acid).';
const CLEARED_ALC = 'Methodology §5 Cleared (certified organic alcohol — t130e). Does not count toward the t137u stack.';
const CLEARED_PEP = 'Methodology §5 Cleared (peppermint oil). Does not count toward the t137u stack.';
const CLEARED_OLIVE = 'Methodology §5 Cleared (extra virgin olive oil).';
const CLEARED_CELL = 'Methodology §5 Cleared (vegetable cellulose capsule).';
const CLEARED_MAG = 'Methodology §5 Cleared (magnesium stearate).';
const CLEARED_MCC = 'Methodology §5 Cleared (microcrystalline cellulose).';
const MOD_SILICA = 'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.';
const CLEARED_GEL = 'Methodology §5 Cleared (gelatin capsule).';
const MOD_SILICATE = 'Methodology §5 Caution (calcium silicate). Does not count toward the t137u stack.';
const CLEARED_GUM = 'Methodology §5 Cleared (gum arabic / acacia).';
const CLEARED_PECTIN = 'Methodology §5 Cleared (pectin).';
const CLEARED_TAPIOCA = 'Methodology §5 Cleared (tapioca syrup).';
const CLEARED_HONEY = 'Methodology §5 Cleared (honey).';
const LIM_FLAVOR = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavor is the exact t54u name. Counts toward the t137u stack.';
const LIM_PG = 'Methodology §5 Limited (oral propylene glycol — founder lock t138u). Counts toward the t137u stack.';

type Ing = readonly [string, RiskLevel, string];
const SRC: Record<string, string> = {

  cleared_gly: CLEARED_GLY,
  cleared_water: CLEARED_WATER,
  cleared_citric: CLEARED_CITRIC,
  cleared_alc: CLEARED_ALC,
  cleared_pep: CLEARED_PEP,
  cleared_olive: CLEARED_OLIVE,
  cleared_cell: CLEARED_CELL,
  cleared_mag: CLEARED_MAG,
  cleared_mcc: CLEARED_MCC,
  mod_silica: MOD_SILICA,
  cleared_gel: CLEARED_GEL,
  mod_silicate: MOD_SILICATE,
  cleared_gum: CLEARED_GUM,
  cleared_pectin: CLEARED_PECTIN,
  cleared_tapioca: CLEARED_TAPIOCA,
  cleared_honey: CLEARED_HONEY,
  lim_flavor: LIM_FLAVOR,
  lim_pg: LIM_PG,
};

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
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, key]) => ({
      name,
      riskLevel,
      source: `Nature's Answer brand facts image. t47u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH344_KYR6E_T47U: RatingRecord[] = [

  row({
    id: 'naturesanswer-b344-clove-alcohol-free-liquid',
    productName: "Nature's Answer Clove Extract - Alcohol Free Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['USP Purified Water', 'cleared', 'cleared_water'],
    ],
    actives: [{ name: 'Clove Extract', strength: '1,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/clove-alcohol-free-liquid lists this pack at $18.99 and in stock. The facts image prints Serving Size 1 mL. Other Ingredients: Vegetable Glycerin, USP Purified Water. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-mullein-x-respiratory-soothing-throat-loze',
    productName: "Nature's Answer Mullein-X Throat Lozenges",
    form: 'lozenge',
    ings: [
      ['Tapioca Syrup', 'cleared', 'cleared_tapioca'],
      ['Honey', 'cleared', 'cleared_honey'],
      ['Natural Flavor', 'limited', 'lim_flavor'],
      ['Citric Acid', 'cleared', 'cleared_citric'],
    ],
    actives: [{ name: 'Mullein-X Throat Lozenge blend', strength: 'as printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/mullein-x-respiratory-soothing-throat-lozenges-24-count lists this pack at $9.99 and in stock. The facts image prints Serving Size 1 lozenge, 24 servings. Other Ingredients: Tapioca Syrup, Honey, Natural Flavor, Citric Acid. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-cardiblend-capsules-60-count',
    productName: "Nature's Answer Cardi Blend - Veggie Capsules",
    form: 'capsule',
    ings: [
      ['Vegetable Cellulose (capsule)', 'cleared', 'cleared_cell'],
      ['Magnesium Stearate', 'cleared', 'cleared_mag'],
      ['Silica', 'moderate', 'mod_silica'],
      ['Microcrystalline Cellulose', 'cleared', 'cleared_mcc'],
    ],
    actives: [{ name: 'Cardi Blend proprietary extract', strength: 'as printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/cardiblend-capsules-60-count lists this pack at $49.99 and in stock. The facts image prints Serving Size 2 capsules, 30 servings. Other Ingredients: Vegetable Cellulose (capsule), Magnesium Stearate, Silica, Microcrystalline Cellulose. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-multi-collagen-capsules-types-i-ii-iii-v-x',
    productName: "Nature's Answer Multi Collagen Types I, II, III, V & X - Capsules",
    form: 'capsule',
    ings: [
      ['Gelatin (Capsule)', 'cleared', 'cleared_gel'],
      ['Calcium Silicate', 'moderate', 'mod_silicate'],
    ],
    actives: [{ name: 'Multi Collagen', strength: 'as printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/multi-collagen-capsules-types-i-ii-iii-v-x lists this pack at $32.99 and in stock. The facts image prints Serving Size as printed on the facts image. Other Ingredients: Gelatin (Capsule), Calcium Silicate. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-yellow-dock-root-alcohol-free-1-oz',
    productName: "Nature's Answer Yellow Dock Extract - Alcohol Free Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['Purified Water', 'cleared', 'cleared_water'],
    ],
    actives: [{ name: 'Yellow Dock Root Extract', strength: 'as printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/yellow-dock-root-alcohol-free-1-oz lists this pack at $14.99 and in stock. The facts image prints Serving Size as printed on the facts image. Other Ingredients: Vegetable Glycerin, Purified Water. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-yarrow-flowers',
    productName: "Nature's Answer Yarrow Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Yarrow Aerial Parts Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/yarrow-flowers lists this pack at $4.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-wild-yam-2-oz',
    productName: "Nature's Answer Wild Yam Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Wild Yam Root Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/wild-yam-2-oz lists this pack at $24.99 and in stock. The facts image prints Serving Size 2 mL (approx. 81 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-vitex-berry-1-oz',
    productName: "Nature's Answer Vitex Berry Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Vitex Berry Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/vitex-berry-1-oz lists this pack at $16.99 and in stock. The facts image prints Serving Size 2 mL (approx. 68 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-valerian-root-low-alcohol',
    productName: "Nature's Answer Valerian Root Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Valerian Root Extract', strength: '335 mg' }],
    source: 't47u. https://naturesanswer.com/products/valerian-root-low-alcohol lists this pack at $16.99 and in stock. The facts image prints Serving Size 1 mL (approx. 28 drops). Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-uva-ursi',
    productName: "Nature's Answer Uva Ursi Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['Purified Water', 'cleared', 'cleared_water'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Uva Ursi Leaf Extract', strength: '1,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/uva-ursi lists this pack at $16.99 and in stock. The facts image prints Serving Size 1 mL (approx. 28 drops). Other Ingredients: Vegetable Glycerin, Purified Water, 12-15% Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-thyme-liquid-extract-1-oz',
    productName: "Nature's Answer Thyme Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['Purified Water', 'cleared', 'cleared_water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Thyme Leaf Extract', strength: '1,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/thyme-liquid-extract-1-oz lists this pack at $14.99 and in stock. The facts image prints Serving Size 1 mL (approx. 28 drops). Other Ingredients: Vegetable Glycerin, Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-st-johns',
    productName: "Nature's Answer St John\'s Wort Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['55-60% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
      ['USP Purified Water', 'cleared', 'cleared_water'],
    ],
    actives: [{ name: 'St John\'s Wort Extract', strength: 'amount printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/st-johns lists this pack at $4.99 and in stock. The facts image prints Serving Size 1 mL (approx. 26 drops). Other Ingredients: 55-60% Certified Organic Alcohol, USP Purified Water. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-slippery-elm-bark-2-oz',
    productName: "Nature's Answer Slippery Elm Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Slippery Elm Inner Bark Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/slippery-elm-bark-2-oz lists this pack at $23.99 and in stock. The facts image prints Serving Size 2 mL (approx. 83 drops). Other Ingredients: Vegetable Glycerin, USP Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-saw-palmetto-berries',
    productName: "Nature's Answer Saw Palmetto Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Saw Palmetto Berry Extract', strength: 'amount printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/saw-palmetto-berries lists this pack at $17.99 and in stock. The facts image prints Serving Size 2 mL (approx. 94 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-rosemary-leaf-1-oz',
    productName: "Nature's Answer Rosemary Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Purified Water', 'cleared', 'cleared_water'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
    ],
    actives: [{ name: 'Rosemary Leaf Extract', strength: '500 mg' }],
    source: 't47u. https://naturesanswer.com/products/rosemary-leaf-1-oz lists this pack at $16.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: Purified Water, 12-15% Certified Organic Alcohol, Vegetable Glycerin. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-red-clover-tops-1-oz',
    productName: "Nature's Answer Red Clover Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Red Clover Top Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/red-clover-tops-1-oz lists this pack at $4.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-raspberry-leaf-1-oz',
    productName: "Nature's Answer Raspberry Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Raspberry Leaf Extract', strength: '1,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/raspberry-leaf-1-oz lists this pack at $14.99 and in stock. The facts image prints Serving Size 1 mL (approx. 28 drops). Other Ingredients: Vegetable Glycerin, USP Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-pumpkin-seed-1-oz',
    productName: "Nature's Answer Pumpkin Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Pumpkin Seed Extract', strength: '235 mg' }],
    source: 't47u. https://naturesanswer.com/products/pumpkin-seed-1-oz lists this pack at $16.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-pleurisy-root-2-oz',
    productName: "Nature's Answer Pleurisy Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Pleurisy Root Extract', strength: '344 mg' }],
    source: 't47u. https://naturesanswer.com/products/pleurisy-root-2-oz lists this pack at $6.99 and in stock. The facts image prints Serving Size 2 mL (approx. 96 drops). Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-plantain-leaves-1-oz',
    productName: "Nature's Answer Plantain Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Plantain Leaf Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/plantain-leaves-1-oz lists this pack at $14.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-peppermint-herb-1-oz',
    productName: "Nature's Answer Peppermint Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['Peppermint Oil', 'cleared', 'cleared_pep'],
    ],
    actives: [{ name: 'Peppermint Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/peppermint-herb-1-oz lists this pack at $15.99 and in stock. The facts image prints Serving Size 2 mL (approx. 89 drops). Other Ingredients: USP Purified Water,12-15% By Volume Certified Organic Alcohol, Vegetable Glycerin, Peppermint Oil. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-peppermint-leaf-alcohol-free-1-oz',
    productName: "Nature's Answer Peppermint Extract - Alcohol Free Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Peppermint Oil', 'cleared', 'cleared_pep'],
    ],
    actives: [{ name: 'Peppermint Leaf Extract', strength: '1,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/peppermint-leaf-alcohol-free-1-oz lists this pack at $16.99 and in stock. The facts image prints Serving Size 1 mL (approx. 44 drops). Other Ingredients: Vegetable Glycerin, USP Purified Water, Peppermint Oil. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-pau-darco-1oz',
    productName: "Nature's Answer Pau D\'Arco Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Pau D\'Arco Bark Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/pau-darco-1oz lists this pack at $4.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-passionflower',
    productName: "Nature's Answer Passionflower Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Passionflower Aerial Parts Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/passionflower lists this pack at $4.99 and in stock. The facts image prints Serving Size 2 mL (approx. 76 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-oregon-grape-root',
    productName: "Nature's Answer Oregon Grape Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Oregon Grape Root Extract', strength: '1,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/oregon-grape-root lists this pack at $6.99 and in stock. The facts image prints Serving Size 1 mL (approx. 42 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-oleopein-olive-leaf-alcohol-free-2-oz',
    productName: "Nature's Answer Olive Extract - Alcohol Free Liquid",
    form: 'liquid',
    ings: [
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['Purified Water', 'cleared', 'cleared_water'],
      ['Gum Arabic', 'cleared', 'cleared_gum'],
    ],
    actives: [{ name: 'Olive Leaf Extract', strength: '600 mg' }],
    source: 't47u. https://naturesanswer.com/products/oleopein-olive-leaf-alcohol-free-2-oz lists this pack at $19.99 and in stock. The facts image prints Serving Size 1.5 mL (approx. 60 drops). Other Ingredients: Vegetable Glycerin, Purified Water, Gum Arabic. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-oil-of-oregano-extract-alcohol-free-1-oz',
    productName: "Nature's Answer Oil of Oregano - Alcohol Free Liquid",
    form: 'liquid',
    ings: [
      ['Extra Virgin Olive Oil', 'cleared', 'cleared_olive'],
    ],
    actives: [{ name: 'Oil of Oregano', strength: 'as printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/oil-of-oregano-extract-alcohol-free-1-oz lists this pack at $33.99 and in stock. The facts image prints Serving Size 3 drops (0.17 mL). Other Ingredients: Extra Virgin Olive Oil. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-nettle-leaf',
    productName: "Nature's Answer Nettle Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Nettle Leaf Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/nettle-leaf lists this pack at $4.99 and in stock. The facts image prints Serving Size 2 mL (approx. 87 drops). Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-myrrh-oleo-gum-resin-1-oz',
    productName: "Nature's Answer Myrrh Gum Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['78-92% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Myrrh Oleo Gum Resin', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/myrrh-oleo-gum-resin-1-oz lists this pack at $16.99 and in stock. The facts image prints Serving Size 2 mL (approx. 106 drops). Other Ingredients: 78-92% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-mullein-leaf-la',
    productName: "Nature's Answer Mullein Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Mullein Leaf Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/mullein-leaf-la lists this pack at $17.99 and in stock. The facts image prints Serving Size 2 mL (approx. 102 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-motherwort-herb-1-oz',
    productName: "Nature's Answer Motherwort Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
    ],
    actives: [{ name: 'Motherwort Herb Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/motherwort-herb-1-oz lists this pack at $15.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: USP Purified Water, 12-15% Certified Organic Alcohol, Vegetable Glycerin. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-marshmallow-root-extract-1-oz',
    productName: "Nature's Answer Marshmallow Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Marshmallow Root Extract', strength: '500 mg' }],
    source: 't47u. https://naturesanswer.com/products/marshmallow-root-extract-1-oz lists this pack at $15.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-lavender-flowers-1-oz',
    productName: "Nature's Answer Lavender Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Lavender Flower Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/lavender-flowers-1-oz lists this pack at $4.99 and in stock. The facts image prints Serving Size 2 mL (approx. 77 drops). Other Ingredients: USP Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-hyssop-herb-1-oz',
    productName: "Nature's Answer Hyssop Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Hyssop Aerial Parts Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/hyssop-herb-1-oz lists this pack at $14.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-hydrangea-root-1-oz',
    productName: "Nature's Answer Hydrangea Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Hydrangea Root Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/hydrangea-root-1-oz lists this pack at $16.99 and in stock. The facts image prints Serving Size 2 mL (approx. 106 drops). Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-horehound-herb-1-oz',
    productName: "Nature's Answer Horehound Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Horehound Aerial Parts Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/horehound-herb-1-oz lists this pack at $4.99 and in stock. The facts image prints Serving Size 2 mL (approx. 73 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-hops-1-oz',
    productName: "Nature's Answer Hops Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Hops Strobile Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/hops-1-oz lists this pack at $16.99 and in stock. The facts image prints Serving Size 2 mL (approx. 67 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-hawthorn-berries',
    productName: "Nature's Answer Hawthorn Extract - Low Alcohol Liquid",
    form: 'liquid',
    ings: [
      ['USP Purified Water', 'cleared', 'cleared_water'],
      ['Vegetable Glycerin', 'cleared', 'cleared_gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'cleared_alc'],
    ],
    actives: [{ name: 'Hawthorn Berry, Leaf, and Flower Extract', strength: '2,000 mg' }],
    source: 't47u. https://naturesanswer.com/products/hawthorn-berries lists this pack at $16.99 and in stock. The facts image prints Serving Size 2 mL (approx. 77 drops). Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field is empty and the facts image did not print a UPC, so none was attached. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b344-propolis-af-1',
    productName: "Nature's Answer Propolis Extract - Ethanol Free Liquid",
    form: 'liquid',
    ings: [
      ['Propylene Glycol', 'limited', 'lim_pg'],
    ],
    actives: [{ name: 'Propolis Extract', strength: 'as printed on the facts image' }],
    source: 't47u. https://naturesanswer.com/products/alcohol-free-propolis-resin-extract lists the 1 oz at $18.99 and in stock. The facts image other ingredients: Propylene Glycol. Counted Limited token: Propylene Glycol. That is one, so this is not a 3+ stack. The 2 oz is a second single on the same page. The facts image does not name a separate 2 oz count, so the 2 oz was not written again. The variant barcode field is empty. Missing UPC.',
  }),
];

const ROWS = BATCH344_KYR6E_T47U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
if (ROWS.length !== 39) throw new Error(`batch344 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(record.id);
  ids.add(record.id);
  if (record.barcode) throw new Error(record.id + ' barcode');
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length >= 3 && !(record.honestNote||'').includes('stacking rule (t137u)')) throw new Error(record.id+' note');
  if (counted.length < 3 && record.honestNote) throw new Error(record.id+' extra '+record.honestNote);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
