// DRAFT / not verified / batch 348 KYR6-e (t57u).
// Nature's Answer singles whose other-ingredient lines are already locked.
// Bio-Ear stays held. The Sprouts section is not edited. No new locks.

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
  gly: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (water / purified water).',
  alc: 'Methodology §5 Cleared (certified organic alcohol — t130e). Does not count toward the t137u stack.',
  olive: 'Methodology §5 Cleared (extra virgin olive oil).',
  leci: 'Methodology §5 Cleared (sunflower lecithin). EFSA 2017, no safety concern.',
  citric: 'Methodology §5 Cleared (citric acid).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
  agave: 'Methodology §5 Cleared (agave syrup, plant sweetener).',
  glucose: 'Methodology §5 Cleared (glucose syrup).',
  cane: 'Methodology §5 Cleared (cane sugar).',
  pectin: 'Methodology §5 Cleared (pectin).',
  wax: 'Methodology §5 Cleared (carnauba wax — t133u). Does not count toward the t137u stack.',
  lemon: 'Methodology §5 Cleared (lemon oil — t130e). Does not count toward the t137u stack.',
  lime: 'Methodology §5 Cleared (lime oil — t130e). Does not count toward the t137u stack.',
  quik: 'Methodology §5 Cleared (t48u). Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit). The parenthesis is one token. Does not count toward the t137u stack.',
  quik2: 'Methodology §5 Cleared (t48u). Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit). The parenthesis is one token. Does not count toward the t137u stack.',
  pep: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Peppermint Flavor. Counts toward the t137u stack.',
  rice: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  cell: 'Methodology §5 Cleared (vegetable cellulose capsule).',
  casil: 'Methodology §5 Caution (calcium silicate). Does not count toward the t137u stack.',
  dical: 'Methodology §5 Cleared (dicalcium phosphate).',
  acacia: 'Methodology §5 Cleared (gum acacia).',
  sugar: 'Methodology §5. The label says sugar and does not name cane sugar. Cane sugar is a different line.',
  malt: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  evap: 'Methodology §5 Cleared (evaporated cane sugar).',
  dextrose: 'Methodology §5. Dextrose is a sugar. Syrup forms that name tapioca or glucose syrup are a different line from bare dextrose.',
  stearic: 'Methodology §5 Cleared (stearic acid). EFSA 2018, no safety concern.',
  flavors: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavors. Counts toward the t137u stack.',
  malic: 'Methodology §5 Cleared (malic acid).',
  mag: 'Methodology §5 Cleared (magnesium stearate).',
  mannitol: 'Methodology §5 Limited (sugar alcohols — mannitol; GI effects at volume). Does not count toward the t137u stack.',
  cross: 'Methodology §5 Cleared (croscarmellose sodium).',
  starch: 'Methodology §5 Cleared (corn starch).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose). EFSA 2017, no ADI.',
  sio2: 'Methodology §5 Caution (silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.',
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
  audience?: 'adult' | 'kids';
  minAge?: number;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: "Nature's Answer",
    category: 'Herbs',
    formulaId: args.id,
    form: args.form,
    audience: args.audience ?? 'adult',
    minAge: args.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ["Nature's Answer"],
    barcode: args.barcode,
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, key]) => ({
      name,
      riskLevel,
      source: `Nature's Answer brand facts image. t57u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH348_KYR6E_T57U: RatingRecord[] = [
  row({
    id: 'naturesanswer-b348-angelica-1',
    productName: 'Nature\'s Answer Angelica Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001062',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/angelica-root-1oz lists this pack at $4.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000001062. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-astragalus-1',
    productName: 'Nature\'s Answer Astragalus Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001253',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/astragalus-1oz lists this pack at $4.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000001253. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-barberry-1',
    productName: 'Nature\'s Answer Barberry Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001161',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/barberry-root-berberis-vulgaris-1oz lists this pack at $16.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000001161. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-bioflavonoids-8',
    productName: 'Nature\'s Answer Bio-Flavonoids (8 oz)',
    form: 'liquid',
    barcode: '083000008382',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/bio-flavonoids-rose-hip-8fl-oz lists this pack at $37.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000008382. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-black-walnut-1',
    productName: 'Nature\'s Answer Black Walnut Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001369',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/black-walnut-extract lists this pack at $17.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000001369. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-bladderwrack-1',
    productName: 'Nature\'s Answer Bladderwrack Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001390',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/bladderwrack-1oz lists this pack at $16.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000001390. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-burdock-1',
    productName: 'Nature\'s Answer Burdock Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001697',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/burdock-root lists this pack at $15.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000001697. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-burdock-2',
    productName: 'Nature\'s Answer Burdock Extract (2 oz)',
    form: 'liquid',
    barcode: '083000001727',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/burdock-root lists this pack at $26.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000001727. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-calendula-1',
    productName: 'Nature\'s Answer Calendula Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001789',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/calendula-flowers lists this pack at $14.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000001789. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-cats-claw-2',
    productName: 'Nature\'s Answer Cat\'s Claw Extract (2 oz)',
    form: 'liquid',
    barcode: '083000001918',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['24-32% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/cats-claw-2 lists this pack at $6.99 and in stock. Other Ingredients: USP Purified Water, 24-32% Certified Organic Alcohol. The variant barcode field lists 083000001918. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-celery-seed-1',
    productName: 'Nature\'s Answer Celery Seed Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001932',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/celery-seed-1oz lists this pack at $4.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000001932. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-chamomile-1',
    productName: 'Nature\'s Answer Chamomile Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001994',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-17% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/chamomile-flower-low-alcohol lists this pack at $4.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-17% By Volume Certified Organic Alcohol. The variant barcode field lists 083000001994. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-cinnamon-1',
    productName: 'Nature\'s Answer Cinnamon Extract (1 oz)',
    form: 'liquid',
    barcode: '083000002175',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/cinnamon-low-alcohol lists this pack at $15.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000002175. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-dandelion-1',
    productName: 'Nature\'s Answer Dandelion Extract (1 oz)',
    form: 'liquid',
    barcode: '083000002472',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/dandelion-root lists this pack at $18.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000002472. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-dandelion-2',
    productName: 'Nature\'s Answer Dandelion Extract (2 oz)',
    form: 'liquid',
    barcode: '083000002502',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/dandelion-root lists this pack at $29.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000002502. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-dong-quai-1',
    productName: 'Nature\'s Answer Dong Quai Extract (1 oz)',
    form: 'liquid',
    barcode: '083000002595',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['10-13% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/dong-quai-liquid-extract-1oz lists this pack at $4.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 10-13% Certified Organic Alcohol. The variant barcode field lists 083000002595. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-echinacea-goldenseal-1',
    productName: 'Nature\'s Answer Echinacea and Goldenseal Extract (1 oz)',
    form: 'liquid',
    barcode: '083000002663',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/echinacea-and-goldenseal-root lists this pack at $9.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000002663. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-echinacea-goldenseal-2',
    productName: 'Nature\'s Answer Echinacea and Goldenseal Extract (2 oz)',
    form: 'liquid',
    barcode: '083000002670',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/echinacea-and-goldenseal-root lists this pack at $12.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000002670. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-echinacea-aerial-2',
    productName: 'Nature\'s Answer Echinacea Aerial Parts (2 oz)',
    form: 'liquid',
    barcode: '083000002656',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['15-20% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/echinacea-root-2oz lists this pack at $6.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 15-20% By Volume Certified Organic Alcohol. The variant barcode field lists 083000002656. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-eyebright-1',
    productName: 'Nature\'s Answer Eyebright Extract (1 oz)',
    form: 'liquid',
    barcode: '083000002588',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/eyebright-herb-1-oz lists this pack at $16.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000002588. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-fennel-1',
    productName: 'Nature\'s Answer Fennel Extract (1 oz)',
    form: 'liquid',
    barcode: '083000002892',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/fennel-seed-1-oz lists this pack at $14.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000002892. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-fenugreek-2',
    productName: 'Nature\'s Answer Fenugreek Extract (2 oz)',
    form: 'liquid',
    barcode: '083000002953',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/fenugreek-seed lists this pack at $28.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000002953. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-fo-ti-1',
    productName: 'Nature\'s Answer Fo Ti Extract (1 oz)',
    form: 'liquid',
    barcode: '083000002984',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/fo-ti-1-oz lists this pack at $4.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000002984. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-garlic-1',
    productName: 'Nature\'s Answer Garlic Extract (1 oz)',
    form: 'liquid',
    barcode: '083000003042',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-20% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/garlic-1-oz lists this pack at $14.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-20% Certified Organic Alcohol. The variant barcode field lists 083000003042. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-ginger-1',
    productName: 'Nature\'s Answer Ginger Extract (1 oz)',
    form: 'liquid',
    barcode: '083000003134',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['30-35% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/ginger-root-extract lists this pack at $4.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 30-35% By Volume Certified Organic Alcohol. The variant barcode field lists 083000003134. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-ginger-2',
    productName: 'Nature\'s Answer Ginger Extract (2 oz)',
    form: 'liquid',
    barcode: '083000003165',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['30-35% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/ginger-root-extract lists this pack at $6.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 30-35% By Volume Certified Organic Alcohol. The variant barcode field lists 083000003165. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-ginseng-1',
    productName: 'Nature\'s Answer American Ginseng Extract (1 oz)',
    form: 'liquid',
    barcode: '083000003226',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['USP Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['12-15% Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/ginseng-root-1-oz lists this pack at $25.99 and in stock. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol. The variant barcode field lists 083000003226. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-goldenseal-1',
    productName: 'Nature\'s Answer Goldenseal Extract (1 oz)',
    form: 'liquid',
    barcode: '083000003288',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
      ['12-15% By Volume Certified Organic Alcohol', 'cleared', 'alc'],
    ],
    source: 't57u. https://naturesanswer.com/products/goldenseal lists this pack at $24.99 and in stock. Other Ingredients: Vegetable Glycerin, USP Purified Water, 12-15% By Volume Certified Organic Alcohol. The variant barcode field lists 083000003288. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-turmeric-3-1',
    productName: 'Nature\'s Answer Turmeric-3 Extract (1 oz)',
    form: 'liquid',
    barcode: '083000009013',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Extra Virgin Olive Oil', 'cleared', 'olive'],
      ['Sunflower Lecithin', 'cleared', 'leci'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Xanthan Gum', 'cleared', 'xanthan'],
    ],
    source: 't57u. https://naturesanswer.com/products/turmeric-3-liquid-1-oz lists this pack at $24.99 and in stock. Other Ingredients: Purified Water, Vegetable Glycerin, Extra Virgin Olive Oil, Sunflower Lecithin, Citric Acid, Xanthan Gum. The variant barcode field lists 083000009013. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-sambucus-kids-4',
    productName: 'Nature\'s Answer Sambucus for Kids (4 oz)',
    form: 'liquid',
    barcode: '083000260445',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Organic Agave Syrup', 'cleared', 'agave'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Citric Acid', 'cleared', 'citric'],
    ],
    source: 't57u. https://naturesanswer.com/products/sambucus-for-kids lists this pack at $16.49 and in stock. Other Ingredients: Organic Agave Syrup, Vegetable Glycerin, Purified Water, Citric Acid. The variant barcode field lists 083000260445. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-sambucus-mega-gummies-30',
    productName: 'Nature\'s Answer Sambucus Mega Gummies (30 gummies)',
    form: 'gummy',
    barcode: '083000262340',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Non-GMO Glucose Syrup', 'cleared', 'glucose'],
      ['Cane Sugar', 'cleared', 'cane'],
      ['Pectin', 'cleared', 'pectin'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Carnauba Wax', 'cleared', 'wax'],
    ],
    source: 't57u. https://naturesanswer.com/products/sambucus-mega-gummies-7x-30-elderberry-gummies-sambucus-gummies lists this pack at $34.99 and in stock. Other Ingredients: Non-GMO Glucose Syrup, Cane Sugar, Pectin, Citric Acid, Carnauba Wax. The variant barcode field lists 083000262340. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-cod-liver-oil-16',
    productName: 'Nature\'s Answer Norwegian Cod Liver Oil (16 oz)',
    form: 'liquid',
    barcode: '083000261800',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Lemon Oil', 'cleared', 'lemon'],
      ['Lime Oil', 'cleared', 'lime'],
      ['Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit.)', 'cleared', 'quik'],
    ],
    source: 't57u. https://naturesanswer.com/products/liquid-cod-liver-oil-16floz lists this pack at $38.99 and in stock. Other Ingredients: Lemon Oil, Lime Oil, Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit.). The variant barcode field lists 083000261800. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-mullein-cough-4',
    productName: 'Nature\'s Answer Mullein-X Cough Syrup, Immune and Relax (4 oz)',
    form: 'liquid',
    barcode: '083000262548',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Natural Peppermint Flavor', 'limited', 'pep'],
      ['Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit)', 'cleared', 'quik2'],
    ],
    source: 't57u. https://naturesanswer.com/products/mullein-x-cough-immune-relax-syrup lists this pack at $24.99 and in stock. Other Ingredients: Vegetable Glycerin, Purified Water, Natural Peppermint Flavor, Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit). The variant barcode field lists 083000262548. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-milk-thistle-60',
    productName: 'Nature\'s Answer Milk Thistle (60 capsules)',
    form: 'capsule',
    barcode: '083000164156',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Rice Flour', 'moderate', 'rice'],
      ['Vegetable Cellulose (capsule)', 'cleared', 'cell'],
      ['Calcium Silicate', 'moderate', 'casil'],
    ],
    source: 't57u. https://naturesanswer.com/products/milk-thistle-standardized lists this pack at $22.99 and in stock. Other Ingredients: Rice Flour, Vegetable Cellulose (capsule), Calcium Silicate. The variant barcode field lists 083000164156. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-boswellia-90',
    productName: 'Nature\'s Answer Boswellia (90 capsules)',
    form: 'capsule',
    barcode: '083000163661',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Dicalcium Phosphate', 'cleared', 'dical'],
      ['Vegetable Cellulose (capsule)', 'cleared', 'cell'],
      ['Calcium Silicate', 'moderate', 'casil'],
      ['Rice Flour', 'moderate', 'rice'],
      ['Gum Acacia', 'cleared', 'acacia'],
    ],
    source: 't57u. https://naturesanswer.com/products/boswellia-extract lists this pack at $31.99 and in stock. Other Ingredients: Dicalcium Phosphate, Vegetable Cellulose (capsule), Calcium Silicate, Rice Flour, Gum Acacia. The variant barcode field lists 083000163661. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-sambucus-chewables-45',
    productName: 'Nature\'s Answer Kids Sambucus Chewables (45 chewables)',
    form: 'tablet',
    barcode: '083000262692',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Sugar', 'cleared', 'sugar'],
      ['Maltodextrin', 'limited', 'malt'],
      ['Evaporated Cane Sugar', 'cleared', 'evap'],
      ['Dextrose', 'cleared', 'dextrose'],
      ['Stearic Acid', 'cleared', 'stearic'],
      ['Natural Flavors', 'limited', 'flavors'],
      ['Malic Acid', 'cleared', 'malic'],
      ['Magnesium Stearate', 'cleared', 'mag'],
      ['Citric Acid', 'cleared', 'citric'],
      ['Mannitol', 'limited', 'mannitol'],
      ['Calcium Silicate', 'moderate', 'casil'],
      ['Croscarmellose Sodium', 'cleared', 'cross'],
    ],
    source: 't57u. https://naturesanswer.com/products/kids-sambucus-chewables-black-elderberry-with-vitamin-c-zinc lists this pack at $15.99 and in stock. Other Ingredients: Sugar, Maltodextrin, Evaporated Cane Sugar, Dextrose, Stearic Acid, Natural Flavors, Malic Acid, Magnesium Stearate, Citric Acid, Mannitol, Calcium Silicate, Croscarmellose Sodium. The variant barcode field lists 083000262692. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b348-strath-tablets-100',
    productName: 'Nature\'s Answer Strath Tablets (100 tablets)',
    form: 'tablet',
    barcode: '',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Corn Starch', 'cleared', 'starch'],
      ['Microcrystalline Cellulose (Bulking Agent)', 'cleared', 'mcc'],
      ['Pectin', 'cleared', 'pectin'],
      ['Silicon Dioxide (Anticaking Agent)', 'moderate', 'sio2'],
    ],
    source: 't57u. https://naturesanswer.com/products/strath-tablets lists this pack at $29.99 and in stock. Other Ingredients: Corn Starch, Microcrystalline Cellulose (Bulking Agent), Pectin, Silicon Dioxide (Anticaking Agent). The variant barcode field is empty. Missing UPC.',
  }),
  row({
    id: 'naturesanswer-b348-strath-magnesium-100',
    productName: 'Nature\'s Answer Strath with Magnesium (100 tablets)',
    form: 'tablet',
    barcode: '',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Corn Starch', 'cleared', 'starch'],
      ['Microcrystalline Cellulose (Bulking Agent)', 'cleared', 'mcc'],
      ['Pectin', 'cleared', 'pectin'],
      ['Silicon Dioxide (Anticaking Agent)', 'moderate', 'sio2'],
    ],
    source: 't57u. https://naturesanswer.com/products/strath-with-magnesium-100-tablets lists this pack at $29.99 and in stock. Other Ingredients: Corn Starch, Microcrystalline Cellulose (Bulking Agent), Pectin, Silicon Dioxide (Anticaking Agent). The variant barcode field is empty. Missing UPC.',
  }),
];

const ROWS = BATCH348_KYR6E_T57U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!code) return true;
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 38) throw new Error(`batch348 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(record.id);
  ids.add(record.id);
  if (!upcCheck(record.barcode ?? '')) throw new Error(record.id + ' upc');
  const roll = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (roll.verdict !== record.verdict) throw new Error(`${record.id} ${record.verdict} vs ${roll.verdict}`);
  const counted = record.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length >= 3) {
    if (!(record.honestNote||'').includes('stacking rule (t137u)')) throw new Error(record.id + ' note');
  } else if (record.honestNote) throw new Error(record.id + ' extra ' + record.honestNote);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
