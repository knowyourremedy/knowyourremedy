// DRAFT / not verified / batch 349 KYR6-e (t58u).
// Nature's Answer holds whose other-ingredient lines are locked after the t58u strings.
// Strath Original Liquid stays held. The Sprouts section is not edited.

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
  alcBare: 'Methodology §5 Limited (alcohol / ethyl alcohol as a vehicle — oral liquid). Counts toward the t137u stack.',
  eth: 'Methodology §5 Cleared (t58u). 60-65% Certified Organic Ethanol. Does not count toward the t137u stack.',
  byvol: 'Methodology §5 Cleared (t58u). 80-92% By Volume Certified Organic Alcohol. The words By Volume are part of this token. Does not count toward the t137u stack.',
  ethyl: 'Methodology §5 Cleared (t58u). 18-25% Ethyl Alcohol. Does not count toward the t137u stack.',
  citrus: 'Methodology §5 Cleared (t58u). Citrus Sinensis (Orange) Peel Extract names orange peel. Does not count toward the t137u stack.',
  gentian: 'Methodology §5 Cleared (t130e). Gentiana Lutea Root Extract (Gentian). Does not count toward the t137u stack.',
  myrrh: 'Methodology §5 Cleared (t130e). Commiphora Myrrha Resin Extract (Myrrh). Does not count toward the t137u stack.',
  dandelion: 'Methodology §5 Cleared (t50u). Taraxacum Officinale (Dandelion) Root Extract. Does not count toward the t137u stack.',
  rubarb: 'Methodology §5 Caution (t55u). Rheum Officinale (Rubarb) Root Extract. Zero-point cap. Does not count toward the t137u stack.',
  senna: 'Methodology §5 Cleared (t130e). Cassia Angustifolia Leaf Extract (Senna). Does not count toward the t137u stack.',
  angelica: 'Methodology §5 Cleared (t130e). Angelica Archangelica Root Extract. Does not count toward the t137u stack.',
  thistle: 'Methodology §5 Cleared (t130e). Carbenia Benedicta Extract (Blessed Thistle). Does not count toward the t137u stack.',
  aloe: 'Methodology §5 Caution (aloe barbadensis leaf juice as an other ingredient, Sept 26, 2026). Does not count toward the t137u stack.',
  menthol: 'Methodology §5 Cleared (t122e). Menthol. Does not count toward the t137u stack.',
  orgflav: 'Methodology §5 Limited (t54u natural-flavor rule). Organic Flavors. Counts toward the t137u stack.',
  natflav1: 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavor. Counts toward the t137u stack.',
  reb: 'Methodology §5 Cleared (t58u). Rebaudioside A (from Organic Stevia rebaudiana Leaf). High-purity steviol glycosides (EFSA ADI, 2011). Does not count toward the t137u stack.',
  cell: 'Methodology §5 Cleared (vegetable cellulose capsule).',
  rice: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  quik: 'Methodology §5 Cleared (t48u). Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit). Does not count toward the t137u stack.',
  quikComma: 'Methodology §5 Cleared (t58u). Quik-Sorb®, (ginger rhizome, amla fruit, capsicum fruit). The comma after the mark is part of this token. Does not count toward the t137u stack.',
  quikAlma: 'Methodology §5 Cleared (t48u). Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit). Does not count toward the t137u stack.',
  casil: 'Methodology §5 Caution (calcium silicate). Does not count toward the t137u stack.',
  malt: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  silcone: 'Methodology §5 Caution (t58u). Silicone Dioxide. Zero-point cap. It is not the silicon dioxide nanoparticle cap (EFSA 2018). Does not count toward the t137u stack.',
  olive: 'Methodology §5 Cleared (extra virgin olive oil).',
  gelatin: 'Methodology §5 Cleared (gelatin capsule).',
  tio2: 'Methodology §5 Avoid (titanium dioxide). European Union food ban, 2022, after EFSA could not rule out DNA damage.',
  mct: 'Methodology §5 Limited (medium-chain triglycerides with no plant named). Counts toward the t137u stack.',
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
      source: `Nature's Answer brand facts image. t58u. ${SRC[key]}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH349_KYR6E_T58U: RatingRecord[] = [
  row({
    id: 'naturesanswer-b349-bio-ear-05',
    productName: 'Nature\'s Answer Bio-Ear (0.5 oz)',
    form: 'liquid',
    barcode: '083000008078',
    actives: [{ name: 'Herbal extract', strength: 'see label' }],
    ings: [
      ['Water', 'cleared', 'water'],
      ['Alcohol', 'limited', 'alcBare'],
      ['Gentiana Lutea Root Extract (Gentian)', 'cleared', 'gentian'],
      ['Citrus Sinensis (Orange) Peel Extract', 'cleared', 'citrus'],
      ['Commiphora Myrrha Resin Extract (Myrrh)', 'cleared', 'myrrh'],
      ['Taraxacum Officinale (Dandelion) Root Extract', 'cleared', 'dandelion'],
      ['Rheum Officinale (Rubarb) Root Extract', 'moderate', 'rubarb'],
      ['Cassia Angustifolia Leaf Extract (Senna)', 'cleared', 'senna'],
      ['Angelica Archangelica Root Extract', 'cleared', 'angelica'],
      ['Carbenia Benedicta Extract (Blessed Thistle)', 'cleared', 'thistle'],
      ['Aloe Barbadensis Leaf Juice', 'moderate', 'aloe'],
      ['Menthol', 'cleared', 'menthol'],
    ],
    source: 't58u. https://naturesanswer.com/products/bio-ear lists the 0.5 oz at $4.99 and in stock. The 1 oz variant is out of stock. The product page facts graphic is shared by both variants and the filename says 1oz. Other Ingredients: Water, Alcohol, Gentiana Lutea Root Extract (Gentian), Citrus Sinensis (Orange) Peel Extract, Commiphora Myrrha Resin Extract (Myrrh), Taraxacum Officinale (Dandelion) Root Extract, Rheum Officinale (Rubarb) Root Extract, Cassia Angustifolia Leaf Extract (Senna), Angelica Archangelica Root Extract, Carbenia Benedicta Extract (Blessed Thistle), Aloe Barbadensis Leaf Juice, Menthol. Counted Limited token: Alcohol. Rheum Officinale (Rubarb) Root Extract is the t55u Caution cap. The variant barcode field lists 083000008078. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-ginkgo-1',
    productName: 'Nature\'s Answer Ginkgo Extract (1 oz)',
    form: 'liquid',
    barcode: '083000003196',
    actives: [{ name: 'Ginkgo (Ginkgo biloba L.) Leaf Extract', strength: '2,000 mg' }],
    ings: [
      ['60-65% Certified Organic Ethanol', 'cleared', 'eth'],
      ['USP Purified Water', 'cleared', 'water'],
    ],
    source: 't58u. https://naturesanswer.com/products/ginkgo-biloba-1-oz lists this pack at $4.99 and in stock. Serving size 2 mL (approx. 52 drops). Other Ingredients: 60-65% Certified Organic Ethanol, USP Purified Water. The variant barcode field lists 083000003196. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-cayenne-1',
    productName: 'Nature\'s Answer Cayenne Extract (1 oz)',
    form: 'liquid',
    barcode: '083000001819',
    actives: [{ name: 'Cayenne (Capsicum annuum L.) Fruit Extract', strength: '850 mg' }],
    ings: [
      ['80-92% By Volume Certified Organic Alcohol', 'cleared', 'byvol'],
      ['USP Purified Water', 'cleared', 'water'],
    ],
    source: 't58u. https://naturesanswer.com/products/cayenne-tincture lists the 1 oz at $14.99 and in stock. Serving size 1 mL (approx. 53 drops). Other Ingredients: 80-92% By Volume Certified Organic Alcohol, USP Purified Water. The variant barcode field lists 083000001819. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-cayenne-2',
    productName: 'Nature\'s Answer Cayenne Extract (2 oz)',
    form: 'liquid',
    barcode: '083000001840',
    actives: [{ name: 'Cayenne (Capsicum annuum L.) Fruit Extract', strength: '850 mg' }],
    ings: [
      ['80-92% By Volume Certified Organic Alcohol', 'cleared', 'byvol'],
      ['USP Purified Water', 'cleared', 'water'],
    ],
    source: 't58u. https://naturesanswer.com/products/cayenne-tincture lists the 2 oz at $22.99 and in stock. Serving size 1 mL (approx. 53 drops), 60 servings. Other Ingredients: 80-92% By Volume Certified Organic Alcohol, USP Purified Water. The variant barcode field lists 083000001840. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-lobelia-1',
    productName: 'Nature\'s Answer Lobelia Extract (1 oz)',
    form: 'liquid',
    barcode: '083000003882',
    actives: [{ name: 'Lobelia (L. inflata) Whole Herb Extract', strength: '240 mg' }],
    ings: [
      ['Purified Water', 'cleared', 'water'],
      ['18-25% Ethyl Alcohol', 'cleared', 'ethyl'],
    ],
    source: 't58u. https://naturesanswer.com/products/lobelia-herb-1-oz lists this pack at $15.99 and in stock. Serving size 1/4 mL (approx. 9 drops). Other Ingredients: Purified Water, 18-25% Ethyl Alcohol. The variant barcode field lists 083000003882. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-beets-634',
    productName: 'Nature\'s Answer Organic Fermented Whole Beets (6.34 oz)',
    form: 'powder',
    barcode: '083000269103',
    actives: [{ name: 'Proprietary Blend (Organic Fermented Whole Beet Root, Organic Beet Root)', strength: '5.4 g' }],
    ings: [
      ['Organic Flavors', 'limited', 'orgflav'],
      ['Rebaudioside A (from Organic Stevia rebaudiana Leaf)', 'cleared', 'reb'],
    ],
    source: 't58u. https://naturesanswer.com/products/organic-fermented-whole-beets-6-34-oz lists this pack at $26.99 and in stock. Serving size 1 scoop (6 g), 30 servings. Other Ingredients: Organic Flavors, Rebaudioside A (from Organic Stevia rebaudiana Leaf). Counted Limited token: Organic Flavors. The variant barcode field lists 083000269103. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-resveratrol-60',
    productName: 'Nature\'s Answer Resveratrol 250 mg (60 capsules)',
    form: 'capsule',
    barcode: '083000261794',
    actives: [{ name: 'Japanese Knotweed (Polygonum cuspidatum) Root Extract', strength: '500 mg' }],
    ings: [
      ['Vegetable Cellulose (capsule)', 'cleared', 'cell'],
      ['Rice Flour', 'moderate', 'rice'],
      ['Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit)', 'cleared', 'quik'],
      ['Calcium Silicate', 'moderate', 'casil'],
      ['Maltodextrin', 'limited', 'malt'],
      ['Silicone Dioxide', 'moderate', 'silcone'],
    ],
    source: 't58u. https://naturesanswer.com/products/resveratrol-250-mg-60-veggie-capsules lists this pack at $37.99 and in stock. Serving size 1 capsule. Other Ingredients: Vegetable Cellulose (capsule), Rice Flour, Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit), Calcium Silicate, Maltodextrin, Silicone Dioxide. Counted Limited token: Maltodextrin. The variant barcode field lists 083000261794. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-ut-answer-4',
    productName: 'Nature\'s Answer UT Answer (4 oz)',
    form: 'liquid',
    barcode: '083000263705',
    actives: [{ name: 'Cranberry Juice Concentrate (Vaccinium macrocarpon) (fruit)', strength: '500 mg' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Purified Water', 'cleared', 'water'],
      ['Quik-Sorb®, (ginger rhizome, amla fruit, capsicum fruit)', 'cleared', 'quikComma'],
    ],
    source: 't58u. https://naturesanswer.com/products/ut-answer-cranberry-liquid-4-oz lists this pack at $37.99 and in stock. Serving size 1 tablespoon (15 mL), 8 servings. Other Ingredients: Vegetable Glycerin, Purified Water, Quik-Sorb®, (ginger rhizome, amla fruit, capsicum fruit). The variant barcode field lists 083000263705. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-eyebright-90',
    productName: 'Nature\'s Answer Eyebright (90 capsules)',
    form: 'capsule',
    barcode: '083000162107',
    actives: [{ name: 'Eyebright (Euphrasia spp.) (aerial parts)', strength: '800 mg' }],
    ings: [
      ['Vegetable Cellulose (capsule)', 'cleared', 'cell'],
      ['Rice Flour', 'moderate', 'rice'],
      ['Calcium Silicate', 'moderate', 'casil'],
    ],
    source: 't58u. https://naturesanswer.com/products/eyebright-herb-90-veggie-capsules lists this pack at $14.99 and in stock. Serving size 2 capsules, 45 servings. Other Ingredients: Vegetable Cellulose (capsule), Rice Flour, Calcium Silicate. The variant barcode field lists 083000162107. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-feverfew-af-1',
    productName: 'Nature\'s Answer Feverfew Extract, Alcohol Free (1 oz)',
    form: 'liquid',
    barcode: '083000006159',
    actives: [{ name: 'Feverfew (Tanacetum parthenium) Flower Extract', strength: '2,000 mg' }],
    ings: [
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['USP Purified Water', 'cleared', 'water'],
    ],
    source: 't58u. https://naturesanswer.com/products/feverfew-alcohol-free-1-oz lists this pack at $15.99 and in stock. Serving size 2 mL (approx. 61 drops). Other Ingredients: Vegetable Glycerin, USP Purified Water. The variant barcode field lists 083000006159. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-evening-primrose-4',
    productName: 'Nature\'s Answer Evening Primrose Oil (4 oz)',
    form: 'liquid',
    barcode: '083000261404',
    actives: [{ name: 'Evening Primrose (Oenothera biennis) (seed) Oil', strength: '2,000 mg' }],
    ings: [
      ['Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit)', 'cleared', 'quik'],
    ],
    source: 't58u. https://naturesanswer.com/products/liquid-evening-primrose-oil-4-oz lists this pack at $35.99 and in stock. Serving size 1/2 teaspoon (2.5 mL), 48 servings. Other Ingredients: Quik-Sorb® (ginger rhizome, amla fruit, capsicum fruit). The variant barcode field lists 083000261404. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-vitamin-d3-05',
    productName: 'Nature\'s Answer Vitamin D3 Drops (0.5 oz)',
    form: 'liquid',
    barcode: '083000261329',
    actives: [{ name: 'Vitamin D3 (as Cholecalciferol)', strength: '100 mcg' }],
    ings: [
      ['Extra Virgin Olive Oil', 'cleared', 'olive'],
      ['Medium Chain Triglycerides', 'limited', 'mct'],
    ],
    source: 't58u. https://naturesanswer.com/products/liquid-vitamin-d3-drops-0-5-oz lists this pack at $19.99 and in stock. Serving size 2 drops, 240 servings. Other Ingredients: Extra Virgin Olive Oil, Medium Chain Triglycerides. Counted Limited token: Medium Chain Triglycerides. The variant barcode field lists 083000261329. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-oregano-90',
    productName: 'Nature\'s Answer Oil of Oregano (90 softgels)',
    form: 'softgel',
    barcode: '083000163081',
    actives: [{ name: 'Oil of Oregano (Origanum vulgare) Aerial Parts Extract', strength: '150 mg' }],
    ings: [
      ['Extra Virgin Olive Oil', 'cleared', 'olive'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
    ],
    source: 't58u. https://naturesanswer.com/products/oil-of-oregano-90-softgels lists this pack at $23.99 and in stock. Serving size 1 softgel, 90 servings. Other Ingredients: Extra Virgin Olive Oil, Gelatin, Vegetable Glycerin. The variant barcode field lists 083000163081. The check digit passes.',
  }),
  row({
    id: 'naturesanswer-b349-coconut-oil-120',
    productName: 'Nature\'s Answer Organic Coconut Oil 1000 mg (120 softgels)',
    form: 'softgel',
    barcode: '083000261312',
    actives: [{ name: 'Organic Coconut Oil', strength: '4,000 mg' }],
    ings: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Vegetable Glycerin', 'cleared', 'gly'],
      ['Titanium Dioxide', 'high', 'tio2'],
    ],
    source: 't58u. https://naturesanswer.com/products/organic-coconut-oil-1000mg-120ct lists this pack at $18.99 and in stock. Serving size 4 softgels, 30 servings. Other Ingredients: Gelatin, Vegetable Glycerin, Titanium Dioxide. The panel prints Gelatin and Vegetable Glycerin with no space after the comma. The variant barcode field lists 083000261312. The check digit passes.',
  }),
];

const ROWS = BATCH349_KYR6E_T58U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i;
function upcCheck(code: string): boolean {
  if (!code) return true;
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (ROWS.length !== 14) throw new Error(`batch349 count ${ROWS.length}`);
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
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why)) throw new Error(`${record.id} ${ingredient.name}: ${why}`);
  }
}
