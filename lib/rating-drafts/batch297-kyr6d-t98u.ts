// DRAFT / not verified / batch 297 KYR6-d (t98u).
// Brand page is the single source when that page shows the 1-pack and the panel.
// The barcode string 5.00E+12 is not a UPC. Missing UPCs stay empty.
// No brand is closed. The Sprouts section is not edited.
// t98u requires a full honest note on every row.
// Flower essences are actives. They are not graded.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const S = {
  alcohol27:
    'Methodology §5 Caution (27% grape alcohol solution — t98u). Does not count toward the t137u stack. Not the Cleared Grape Alcohol token.',
  cleared98: 'Methodology §5 Cleared (t98u). Does not count toward the t137u stack.',
  caution98: 'Methodology §5 Caution (t98u). Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  malic: 'Methodology §5 Cleared (malic acid).',
  lactone:
    'Methodology §5 Cleared (Glucono Delta Lactone — t51u). Same substance as gluconolactone. Does not count toward the t137u stack.',
  gomct:
    'Methodology §5 Limited (goMCT® — branded medium-chain triglyceride, t49u). Counts toward the t137u stack. The parenthesis medium chain triglycerides is this same ingredient, not a second Limited token.',
  acacia: 'Methodology §5 Cleared (gum acacia / acacia gum).',
  beet: 'Methodology §5 Cleared (organic beet root).',
  monk: 'Methodology §5 Cleared (organic monk fruit extract).',
  rasp:
    'Methodology §5 Limited (t54u natural-flavor rule). Natural Raspberry Flavor is the exact t54u name. Counts toward the t137u stack.',
  lemonF:
    'Methodology §5 Limited (t54u natural-flavor rule). Natural Lemon Flavor is the exact t54u name. Counts toward the t137u stack.',
  strawF:
    'Methodology §5 Limited (t54u natural-flavor rule). Natural Strawberry Flavor is the exact t54u name. Counts toward the t137u stack.',
  natFlavor:
    'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavor is the exact t54u name. Counts toward the t137u stack.',
  orangeF:
    'Methodology §5 Limited (t54u natural-flavor rule). Natural orange flavor is the exact t54u name. Counts toward the t137u stack.',
  vanillaF:
    'Methodology §5 Limited (natural vanilla flavor — t54u). A documented product that uses this exact wording contains a Limited carrier. Counts toward the t137u stack.',
  stevia:
    'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.',
  polyol: 'Methodology §5 Limited (named sugar alcohol). Does not count toward the t137u stack.',
  wax: 'Methodology §5 Cleared (carnauba wax — t133u).',
  coconut: 'Methodology §5 Cleared (coconut oil, named, any form — t111u).',
  water: 'Methodology §5 Cleared (water / purified water).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  sugar: 'Methodology §5 Caution (sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  glucose: 'Methodology §5 Caution (glucose syrup). Does not count toward the t137u stack.',
  syrup: 'Methodology §5 Cleared (tapioca syrup / glucose-syrup family).',
  pectin: 'Methodology §5 Cleared (pectin).',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  juice: 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — Oct 15, 2026).',
  mct:
    'Methodology §5 Limited (caprylic/capric triglyceride — unlabeled MCT). The label does not name the plant. Counts toward the t137u stack.',
} as const;

type MethKey = keyof typeof S;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  if (record.honestNote) return record;
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
    productType?: RatingRecord['productType'];
  },
): RatingRecord {
  return finish({
    ...partial,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: partial.productType ?? 'OTC',
    retailers: [partial.brand],
    barcode: partial.barcode ?? '',
  });
}

const FIVE = [
  { name: 'Cherry Plum (Prunus cerasifera)', strength: '5X HPUS' },
  { name: 'Clematis (Clematis vitalba)', strength: '5X HPUS' },
  { name: 'Impatiens (Impatiens glandulifera)', strength: '5X HPUS' },
  { name: 'Rock Rose (Helianthemum nummularium)', strength: '5X HPUS' },
  { name: 'Star of Bethlehem (Ornithogalum umbellatum)', strength: '5X HPUS' },
];
const CHESTNUT = { name: 'White Chestnut (Aesculus hippocastanum)', strength: '5X HPUS' };

const NOTE_FLOWER =
  'The flower named on the label is the active and is not graded. 27% grape alcohol solution is Caution and does not stack. Counted Limited tokens: none. This is not the Cleared Grape Alcohol lock.';

const FLOWERS: Array<[slug: string, title: string, active: string, sku: string]> = [
  ['oak', 'Oak', 'Oak (Quercus robur)', 'BF00621'],
  ['agrimony', 'Agrimony', 'Agrimony (Agrimonia eupatoria)', 'BF00411'],
  ['willow', 'Willow', 'Willow (Salix vitellina)', 'BF00781'],
  ['wild-rose', 'Wild Rose', 'Wild Rose (Rosa canina)', 'BF00771'],
  ['wild-oat', 'Wild Oat', 'Wild Oat (Bromus ramosus)', 'BF00761'],
  ['white-chestnut', 'White Chestnut', 'White Chestnut (Aesculus hippocastanum)', 'BF00751'],
  ['water-violet', 'Water Violet', 'Water Violet (Hottonia palustris)', 'BF00741'],
  ['walnut', 'Walnut', 'Walnut (Juglans regia)', 'BF00731'],
  ['vine', 'Vine', 'Vine (Vitis vinifera)', 'BF00721'],
  ['vervain', 'Vervain', 'Vervain (Verbena officinalis)', 'BF00711'],
  ['sweet-chestnut', 'Sweet Chestnut', 'Sweet Chestnut (Castanea sativa)', 'BF00701'],
  ['star-of-bethlehem', 'Star of Bethlehem', 'Star of Bethlehem (Ornithogalum umbellatum)', 'BF00691'],
  ['scleranthus', 'Scleranthus', 'Scleranthus (Scleranthus annuus)', 'BF00681'],
  ['rock-water', 'Rock Water', 'Rock Water', 'BF00671'],
  ['red-chestnut', 'Red Chestnut', 'Red Chestnut (Aesculus carnea)', 'BF00651'],
  ['pine', 'Pine', 'Pine (Pinus sylvestris)', 'BF00641'],
  ['olive', 'Olive', 'Olive (Olea europaea)', 'BF00631'],
  ['mimulus', 'Mimulus', 'Mimulus (Mimulus guttatus)', 'BF00601'],
  ['larch', 'Larch', 'Larch (Larix decidua)', 'BF00591'],
  ['impatiens', 'Impatiens', 'Impatiens (Impatiens glandulifera)', 'BF00581'],
  ['hornbeam', 'Hornbeam', 'Hornbeam (Carpinus betulus)', 'BF00571'],
  ['honeysuckle', 'Honeysuckle', 'Honeysuckle (Lonicera caprifolium)', 'BF00561'],
  ['holly', 'Holly', 'Holly (Ilex aquifolium)', 'BF00551'],
  ['heather', 'Heather', 'Heather (Calluna vulgaris)', 'BF00541'],
  ['gorse', 'Gorse', 'Gorse (Ulex europaeus)', 'BF00531'],
  ['gentian', 'Gentian', 'Gentian (Gentiana amarella)', 'BF00521'],
  ['elm', 'Elm', 'Elm (Ulmus procera)', 'BF00511'],
  ['crab-apple', 'Crab Apple', 'Crab Apple (Malus pumila)', 'BF00501'],
  ['clematis', 'Clematis', 'Clematis (Clematis vitalba)', 'BF00491'],
  ['chicory', 'Chicory', 'Chicory (Cichorium intybus)', 'BF00481'],
  ['chestnut-bud', 'Chestnut Bud', 'Chestnut Bud (Aesculus hippocastanum)', 'BF00471'],
  ['cherry-plum', 'Cherry Plum', 'Cherry Plum (Prunus cerasifera)', 'BF00461'],
  ['cerato', 'Cerato', 'Cerato (Ceratostigma willmottiana)', 'BF00451'],
  ['centaury', 'Centaury', 'Centaury (Centaurium umbellatum)', 'BF00441'],
  ['beech', 'Beech', 'Beech (Fagus sylvatica)', 'BF00431'],
  ['aspen', 'Aspen', 'Aspen (Populus tremula)', 'BF00421'],
  ['rock-rose', 'Rock Rose', 'Rock Rose (Helianthemum nummularium)', 'BF00661'],
];

function flowerRows(): RatingRecord[] {
  return FLOWERS.map(([slug, title, active, sku]) => {
    const url = `https://www.nelsons.com/en-us/products/bach-r-${slug}`;
    const panel = `Nelsons US brand page. ${url}. Active ingredients (5X HPUS): ${active}. Inactive ingredients: 27% grape alcohol solution. t98u brand-page single source.`;
    const aspen =
      slug === 'aspen'
        ? ' The page prints an extra closing parenthesis after Populus tremula. The flower name was stored without that extra mark.'
        : '';
    return row({
      id: `bach-b297-${slug}-20`,
      productName: `Bach ${title} (20 mL)`,
      brand: 'Bach',
      category: 'Herbs',
      formulaId: `bach-b297-${slug}-20`,
      form: 'liquid drops',
      productSubtype: 'homeopathic',
      homeopathicSubtype: 'homeopathic',
      activeIngredients: [{ name: active, strength: '5X HPUS' }],
      inactiveIngredients: [flag(panel, '27% grape alcohol solution', 'moderate', 'alcohol27')],
      verdict: 'caution',
      honestNote: NOTE_FLOWER,
      sourcesGeneral: [
        `t98u. Nelsons US brand page is the single source. ${url} lists the 20 mL at $19.49 and in stock. SKU ${sku}. The barcode field is empty. Active ingredients (5X HPUS): ${active}. Inactive ingredients: 27% grape alcohol solution. The flower is the active and is not graded. 27% grape alcohol solution is Caution and does not stack. Counted Limited tokens: none. Take 2 drops. About 380 doses. Missing UPC. No code was invented. Not a Bach blend. Not a Rescue product.${aspen}`,
      ],
    });
  });
}

const PRASP =
  'BiOptimizers brand page. Raspberry Lemonade supplement-facts image. Serving size 1 scoop (3.9 g). Servings per container 30. t98u brand-page single source.';
const PCHERRY =
  'BiOptimizers brand page. Tart Cherry supplement-facts image. Serving size 1 scoop (5.04 g). Servings per container 30. t98u brand-page single source.';
const PPUNCH =
  'BiOptimizers brand page. Fruit Punch supplement-facts image. Serving size 1 scoop (3.65 g). Servings per container 30. t98u brand-page single source.';

const NOTE_RASP =
  'Avoid: three or more Limited tokens triggered the stacking rule (t137u): goMCT®, Natural Raspberry Flavor, Natural Lemon Flavor. Natural Mixed Berry Flavor is Caution and does not stack. Citric acid, gum acacia, glucono delta lactone, organic beet root, organic monk fruit extract, and Thaumatin Powder (Katemfe Fruit Extract) are Cleared. The panel prints goMCT® (Medium Chain Triglycerides, Gum Acacia). The parenthesis medium chain triglycerides is the same goMCT® ingredient, not a second Limited token.';
const NOTE_CHERRY =
  'Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. Organic Black Cherry Flavor is Caution and does not stack. Malic acid, gum acacia, glucono delta lactone, and Thaumatin Powder (Katemfe Fruit Extract) are Cleared. The panel prints goMCT® (Medium Chain Triglycerides, Gum Acacia). The parenthesis medium chain triglycerides is the same goMCT® ingredient, not a second Limited token. CherryCraft European Sour Cherry Extract is an active and is not graded.';
const NOTE_PUNCH =
  'Counted Limited tokens: goMCT® and Natural Strawberry Flavor. That is two, so this is not a 3+ stack. Organic Fruit Punch Flavor is Caution and does not stack. Malic acid, gum acacia, glucono delta lactone, organic beet root, organic monk fruit extract, and Thaumatin Powder (Katemfe Fruit Extract) are Cleared. The panel prints goMCT® (Medium Chain Triglycerides, Gum Acacia). The parenthesis medium chain triglycerides is the same goMCT® ingredient, not a second Limited token.';

const MAG_ACTIVE = {
  name: 'Magnesium (as magnesium chelate, magnesium carbonate, magnesium bisglycinate, magnesium taurate, Sucrosomial® magnesium (magnesium oxide), magnesium malate, magnesium orotate, magnesium citrate)',
  strength: '325 mg',
};

function polyols(panel: string, names: string[]): IngredientFlag[] {
  return names.map((name) => flag(panel, name, 'limited', 'polyol'));
}

const PCRAN =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-pastilles-cranberry-1-7oz. Inactive ingredients read on the page. t98u brand-page single source.';
const PLEM =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-pastilles-lemon-1-7oz. Inactive ingredients read on the page. t98u brand-page single source.';
const PWAT =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-pastilles-watermelon-1-7oz. Inactive ingredients read on the page. t98u brand-page single source.';
const PBLK =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-pastilles-black-currant-1-7oz. Inactive ingredients read on the page. t98u brand-page single source.';
const PORG =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-pastilles-orange-elderflower-1-7oz. Inactive ingredients read on the page. t98u brand-page single source.';
const PCREAM =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-cream-1oz. Inactive ingredients read on the page. t98u brand-page single source.';
const PPEARL =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-r-pearls. Inactive ingredients read on the page. t98u brand-page single source.';
const PMELT =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-sleep-r-liquid-melts. Inactive ingredients read on the page. White Chestnut is an active. t98u brand-page single source.';
const PGSTRAW =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-plus-sleep-gummies-strawberry-60ct. Other ingredients read on the page. Flower essences are actives. t98u brand-page single source.';
const PGOR =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-plus-mood-stress-support-gummies-orange-60ct. Other ingredients read on the page. Flower essences are actives. t98u brand-page single source.';
const PGBLU =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-plus-sleep-stress-support-gummies-blueberry-60ct. Other ingredients read on the page. Flower essences are actives. t98u brand-page single source.';

const NOTE_CRAN =
  'cranberry (as flavor) is Caution and does not stack. Counted Limited tokens: none. Isomalt, maltitol, sorbitol, and xylitol are named sugar alcohols and do not stack. Beeswax, black carrot extract, citric acid, gum arabic, and sustainable palm kernel oil are Cleared.';
const NOTE_LEM =
  'lemon (as flavor) is Caution and does not stack. The panel prints turmeric. That word is the t98u turmeric flavor/color lock. It is Caution and does not stack. Counted Limited tokens: none. Isomalt, maltitol, sorbitol, and xylitol do not stack. Beeswax, citric acid, gum arabic, and sustainable palm kernel oil are Cleared.';
const NOTE_WAT =
  'Counted Limited tokens: natural flavor and stevia leaf extract (rebaudioside-A). That is two, so this is not a 3+ stack. Maltitol and sorbitol do not stack. Carnauba wax, citric acid, coconut oil, elderberry concentrate (as color), gum arabic, purified water, and watermelon concentrate (as flavor) are Cleared.';
const NOTE_BLK =
  'black currant (as flavor) is Caution and does not stack. Counted Limited tokens: none. Isomalt, maltitol, sorbitol, and xylitol do not stack. Beeswax, black carrot extract, citric acid, elder extract, gum arabic, red cabbage extract, and sustainable palm kernel oil are Cleared.';
const NOTE_ORG =
  'elderflower (as flavor) and orange (as flavor) are Caution and do not stack. Counted Limited tokens: none. Isomalt, maltitol, sorbitol, and xylitol do not stack. Beeswax, gum arabic, and sustainable palm kernel oil are Cleared.';
const NOTE_CREAM =
  'Counted Limited token: caprylic/capric triglyceride. That is one, so this is not a 3+ stack. Caprylyl glycol, cetearyl alcohol, cetyl palmitate, glyceryl stearate citrate, isopropyl palmitate, and potassium sorbate are Caution and do not stack. Beeswax, citric acid, glycerin, purified water, shea butter, and xanthan gum are Cleared.';
const NOTE_PEARL =
  'Counted Limited tokens: natural orange flavor and natural vanilla flavor. That is two, so this is not a 3+ stack. Sorbitol does not stack. Carnauba wax, coconut oil, gelatin (fish), grapeseed oil, and pectin are Cleared. The five flowers are the actives and are not graded.';
const NOTE_MELT =
  'The Sleep formula includes White Chestnut. White Chestnut is an active and is not graded. Counted Limited tokens: natural orange flavor and natural vanilla flavor. That is two, so this is not a 3+ stack. Sorbitol does not stack. Carnauba wax, coconut oil, gelatin (fish), grapeseed oil, and pectin are Cleared.';
const NOTE_GSTRAW =
  'The flower essences printed in the other-ingredient line are actives and are not graded. Counted Limited token: natural flavor. That is one, so this is not a 3+ stack. Sugar is Caution and does not stack. Organic tapioca syrup, water, pectin, citric acid, sodium citrate, fruit and vegetable juice (for color), coconut oil, and carnauba wax are Cleared.';
const NOTE_GOR =
  'The flower essences printed in the other-ingredient line are actives and are not graded. Counted Limited token: natural flavor. That is one, so this is not a 3+ stack. Sugar is Caution and does not stack. Tapioca syrup, pectin, citric acid, vegetable juice (color from paprika & carrot), medium chain triglycerides (from coconut/rapeseed oil), and carnauba wax are Cleared. The words “(to maintain freshness)” are the role of citric acid, not a second token.';
const NOTE_GBLU =
  'The flower essences printed in the other-ingredient line are actives and are not graded. The Sleep formula includes white chestnut. It is an active and is not graded. Counted Limited token: natural flavor. That is one, so this is not a 3+ stack. Sugar and glucose syrup are Caution and do not stack. Pectin, citric acid, fruit and vegetable juice (color from carrot and cherry), medium chain triglycerides (from coconut/rapeseed oil), and carnauba wax are Cleared. The words “(to maintain freshness)” are the role of citric acid, not a second token.';

const OTHER_ROWS: RatingRecord[] = [
  row({
    id: 'bioptimizers-b297-mag-drink-raspberry-30',
    productName: 'BiOptimizers Magnesium Breakthrough Drink Raspberry Lemonade (30 servings)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b297-mag-drink-raspberry-30',
    form: 'powder',
    productType: 'Supplement',
    barcode: '689176916324',
    activeIngredients: [MAG_ACTIVE],
    inactiveIngredients: [
      flag(PRASP, 'Citric Acid', 'cleared', 'citric'),
      flag(PRASP, 'goMCT®', 'limited', 'gomct'),
      flag(PRASP, 'Gum Acacia', 'cleared', 'acacia'),
      flag(PRASP, 'Glucono Delta Lactone', 'cleared', 'lactone'),
      flag(PRASP, 'Natural Raspberry Flavor', 'limited', 'rasp'),
      flag(PRASP, 'Natural Lemon Flavor', 'limited', 'lemonF'),
      flag(PRASP, 'Organic Beet Root', 'cleared', 'beet'),
      flag(PRASP, 'Natural Mixed Berry Flavor', 'moderate', 'caution98'),
      flag(PRASP, 'Organic Monk Fruit Extract', 'cleared', 'monk'),
      flag(PRASP, 'Thaumatin Powder (Katemfe Fruit Extract)', 'cleared', 'cleared98'),
    ],
    verdict: 'avoid',
    honestNote: NOTE_RASP,
    sourcesGeneral: [
      't97u read the brand-page facts image. t98u locks cleared the tokens that were holding this pack. https://bioptimizers.com/products/magnesium-breakthrough-drink lists 30 servings / Raspberry Lemonade at $39.99 and in stock. SKU 1081-MGDRL30S. The variant barcode field prints 0689176916324. The last 12 digits pass the UPC-A check digit. UPC 689176916324. Serving size 1 scoop (3.9 g). Servings per container 30. Magnesium 325 mg is the active and is not graded. Other ingredients: Citric Acid, goMCT® (Medium Chain Triglycerides, Gum Acacia), Glucono Delta Lactone, Natural Raspberry Flavor, Natural Lemon Flavor, Organic Beet Root, Natural Mixed Berry Flavor, Organic Monk Fruit Extract, Thaumatin Powder (Katemfe Fruit Extract). Counted Limited tokens: goMCT®, Natural Raspberry Flavor, and Natural Lemon Flavor. That is three, so this is Avoid, and the note names the stack. Not the unflavored drink. Not the capsule.',
    ],
  }),
  row({
    id: 'bioptimizers-b297-mag-drink-cherry-30',
    productName: 'BiOptimizers Magnesium Breakthrough Drink Tart Cherry (30 servings)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b297-mag-drink-cherry-30',
    form: 'powder',
    productType: 'Supplement',
    barcode: '850064051148',
    activeIngredients: [
      MAG_ACTIVE,
      { name: 'CherryCraft® European Sour Cherry Extract (Prunus cerasus L.) (fruit)', strength: '1 g' },
    ],
    inactiveIngredients: [
      flag(PCHERRY, 'Malic Acid', 'cleared', 'malic'),
      flag(PCHERRY, 'goMCT®', 'limited', 'gomct'),
      flag(PCHERRY, 'Gum Acacia', 'cleared', 'acacia'),
      flag(PCHERRY, 'Glucono Delta Lactone', 'cleared', 'lactone'),
      flag(PCHERRY, 'Organic Black Cherry Flavor', 'moderate', 'caution98'),
      flag(PCHERRY, 'Thaumatin Powder (Katemfe Fruit Extract)', 'cleared', 'cleared98'),
    ],
    verdict: 'caution',
    honestNote: NOTE_CHERRY,
    sourcesGeneral: [
      't97u read the brand-page facts image. t98u locks cleared the tokens that were holding this pack. https://bioptimizers.com/products/magnesium-breakthrough-drink lists 30 servings / Tart Cherry at $39.99 and in stock. SKU 1164-MGDTCV4. The variant barcode field prints 0850064051148. The last 12 digits pass the UPC-A check digit. UPC 850064051148. Serving size 1 scoop (5.04 g). Servings per container 30. Magnesium 325 mg and CherryCraft 1 g are actives and are not graded. Other ingredients: Malic Acid, goMCT® (Medium Chain Triglycerides, Gum Acacia), Glucono Delta Lactone, Organic Black Cherry Flavor, Thaumatin Powder (Katemfe Fruit Extract). Counted Limited token: goMCT®. That is one, so this is not a 3+ stack. Not the unflavored drink.',
    ],
  }),
  row({
    id: 'bioptimizers-b297-mag-drink-punch-30',
    productName: 'BiOptimizers Magnesium Breakthrough Drink Fruit Punch (30 servings)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b297-mag-drink-punch-30',
    form: 'powder',
    productType: 'Supplement',
    barcode: '689176916355',
    activeIngredients: [MAG_ACTIVE],
    inactiveIngredients: [
      flag(PPUNCH, 'Malic Acid', 'cleared', 'malic'),
      flag(PPUNCH, 'goMCT®', 'limited', 'gomct'),
      flag(PPUNCH, 'Gum Acacia', 'cleared', 'acacia'),
      flag(PPUNCH, 'Glucono Delta Lactone', 'cleared', 'lactone'),
      flag(PPUNCH, 'Organic Fruit Punch Flavor', 'moderate', 'caution98'),
      flag(PPUNCH, 'Organic Beet Root', 'cleared', 'beet'),
      flag(PPUNCH, 'Natural Strawberry Flavor', 'limited', 'strawF'),
      flag(PPUNCH, 'Thaumatin Powder (Katemfe Fruit Extract)', 'cleared', 'cleared98'),
      flag(PPUNCH, 'Organic Monk Fruit Extract', 'cleared', 'monk'),
    ],
    verdict: 'caution',
    honestNote: NOTE_PUNCH,
    sourcesGeneral: [
      't97u read the brand-page facts image. t98u locks cleared the tokens that were holding this pack. https://bioptimizers.com/products/magnesium-breakthrough-drink lists 30 servings / Fruit Punch at $39.99 and in stock. SKU 1082-MGDFP30S. The variant barcode field prints 0689176916355. The last 12 digits pass the UPC-A check digit. UPC 689176916355. Serving size 1 scoop (3.65 g). Servings per container 30. Magnesium 325 mg is the active and is not graded. Other ingredients: Malic Acid, goMCT® (Medium Chain Triglycerides, Gum Acacia), Glucono Delta Lactone, Organic Fruit Punch Flavor, Organic Beet Root, Natural Strawberry Flavor, Thaumatin Powder (Katemfe Fruit Extract), Organic Monk Fruit Extract. Counted Limited tokens: goMCT® and Natural Strawberry Flavor. That is two, so this is not a 3+ stack. Not the unflavored drink.',
    ],
  }),
  row({
    id: 'bach-b297-pastilles-cranberry-50',
    productName: 'Bach RESCUE Pastilles Cranberry (50 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b297-pastilles-cranberry-50',
    form: 'pastille',
    minAge: 6,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FIVE,
    inactiveIngredients: [
      flag(PCRAN, 'Beeswax', 'cleared', 'cleared98'),
      flag(PCRAN, 'black carrot extract', 'cleared', 'cleared98'),
      flag(PCRAN, 'Citric Acid', 'cleared', 'citric'),
      flag(PCRAN, 'cranberry (as flavor)', 'moderate', 'caution98'),
      flag(PCRAN, 'Gum Arabic', 'cleared', 'acacia'),
      ...polyols(PCRAN, ['Isomalt', 'Maltitol', 'Sorbitol', 'Xylitol']),
      flag(PCRAN, 'sustainable palm kernel oil', 'cleared', 'cleared98'),
    ],
    verdict: 'caution',
    honestNote: NOTE_CRAN,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-pastilles-cranberry-1-7oz lists the 50 g tin at $13.99 and in stock. SKU BF01539. The barcode field is empty. Ages 6 and older. Dissolve 1 pastille. About 35 pastilles. Inactive ingredients: Beeswax, black carrot extract, citric acid, cranberry (as flavor), gum arabic, isomalt, maltitol, sorbitol, sustainable palm kernel oil, xylitol. Counted Limited tokens: none. cranberry (as flavor) is Caution and does not stack. The named sugar alcohols do not stack. Missing UPC. No code was invented. Not the UK blackcurrant flavour tin.',
    ],
  }),
  row({
    id: 'bach-b297-pastilles-lemon-50',
    productName: 'Bach RESCUE Pastilles Lemon (50 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b297-pastilles-lemon-50',
    form: 'pastille',
    minAge: 6,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FIVE,
    inactiveIngredients: [
      flag(PLEM, 'Beeswax', 'cleared', 'cleared98'),
      flag(PLEM, 'Citric Acid', 'cleared', 'citric'),
      flag(PLEM, 'Gum Arabic', 'cleared', 'acacia'),
      flag(PLEM, 'Isomalt', 'limited', 'polyol'),
      flag(PLEM, 'lemon (as flavor)', 'moderate', 'caution98'),
      flag(PLEM, 'Maltitol', 'limited', 'polyol'),
      flag(PLEM, 'Sorbitol', 'limited', 'polyol'),
      flag(PLEM, 'sustainable palm kernel oil', 'cleared', 'cleared98'),
      flag(PLEM, 'turmeric', 'moderate', 'caution98'),
      flag(PLEM, 'Xylitol', 'limited', 'polyol'),
    ],
    verdict: 'caution',
    honestNote: NOTE_LEM,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-pastilles-lemon-1-7oz lists the 50 g tin at $13.99 and in stock. SKU BF01572. The barcode field is empty. Ages 6 and older. Inactive ingredients: Beeswax, citric acid, gum arabic, isomalt, lemon (as flavor), maltitol, sorbitol, sustainable palm kernel oil, turmeric, xylitol. The panel prints turmeric. That word is the t98u turmeric flavor/color lock. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b297-pastilles-watermelon-50',
    productName: 'Bach RESCUE Pastilles Watermelon (50 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b297-pastilles-watermelon-50',
    form: 'pastille',
    minAge: 6,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FIVE,
    inactiveIngredients: [
      flag(PWAT, 'Carnauba Wax', 'cleared', 'wax'),
      flag(PWAT, 'Citric Acid', 'cleared', 'citric'),
      flag(PWAT, 'Coconut Oil', 'cleared', 'coconut'),
      flag(PWAT, 'elderberry concentrate (as color)', 'cleared', 'cleared98'),
      flag(PWAT, 'Gum Arabic', 'cleared', 'acacia'),
      flag(PWAT, 'Maltitol', 'limited', 'polyol'),
      flag(PWAT, 'Natural Flavor', 'limited', 'natFlavor'),
      flag(PWAT, 'Purified Water', 'cleared', 'water'),
      flag(PWAT, 'Sorbitol', 'limited', 'polyol'),
      flag(PWAT, 'stevia leaf extract (rebaudioside-A)', 'limited', 'stevia'),
      flag(PWAT, 'watermelon concentrate (as flavor)', 'cleared', 'cleared98'),
    ],
    verdict: 'caution',
    honestNote: NOTE_WAT,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-pastilles-watermelon-1-7oz lists the 50 g tin at $13.99 and in stock. SKU 3005884. The barcode field is empty. Ages 6 and older. Inactive ingredients: carnauba wax, citric acid, coconut oil, elderberry concentrate (as color), gum arabic, maltitol, natural flavor, purified water, sorbitol, stevia leaf extract (rebaudioside-A), watermelon concentrate (as flavor). Counted Limited tokens: natural flavor and stevia leaf extract (rebaudioside-A). That is two, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b297-pastilles-black-currant-50',
    productName: 'Bach RESCUE Pastilles Black Currant (50 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b297-pastilles-black-currant-50',
    form: 'pastille',
    minAge: 6,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FIVE,
    inactiveIngredients: [
      flag(PBLK, 'Beeswax', 'cleared', 'cleared98'),
      flag(PBLK, 'black carrot extract', 'cleared', 'cleared98'),
      flag(PBLK, 'black currant (as flavor)', 'moderate', 'caution98'),
      flag(PBLK, 'Citric Acid', 'cleared', 'citric'),
      flag(PBLK, 'elder extract', 'cleared', 'cleared98'),
      flag(PBLK, 'Gum Arabic', 'cleared', 'acacia'),
      flag(PBLK, 'Isomalt', 'limited', 'polyol'),
      flag(PBLK, 'Maltitol', 'limited', 'polyol'),
      flag(PBLK, 'red cabbage extract', 'cleared', 'cleared98'),
      flag(PBLK, 'Sorbitol', 'limited', 'polyol'),
      flag(PBLK, 'sustainable palm kernel oil', 'cleared', 'cleared98'),
      flag(PBLK, 'Xylitol', 'limited', 'polyol'),
    ],
    verdict: 'caution',
    honestNote: NOTE_BLK,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-pastilles-black-currant-1-7oz lists the 50 g tin at $13.99 and in stock. SKU BF01457. The barcode field prints the string 5.00E+12. That is not a 12-digit UPC and it was not attached. Ages 6 and older. Inactive ingredients: Beeswax, black carrot extract, black currant (as flavor), citric acid, elder extract, gum arabic, isomalt, maltitol, red cabbage extract, sorbitol, sustainable palm kernel oil, xylitol. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b297-pastilles-orange-elderflower-50',
    productName: 'Bach RESCUE Pastilles Orange and Elderflower (50 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b297-pastilles-orange-elderflower-50',
    form: 'pastille',
    minAge: 6,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FIVE,
    inactiveIngredients: [
      flag(PORG, 'Beeswax', 'cleared', 'cleared98'),
      flag(PORG, 'elderflower (as flavor)', 'moderate', 'caution98'),
      flag(PORG, 'Gum Arabic', 'cleared', 'acacia'),
      flag(PORG, 'Isomalt', 'limited', 'polyol'),
      flag(PORG, 'Maltitol', 'limited', 'polyol'),
      flag(PORG, 'orange (as flavor)', 'moderate', 'caution98'),
      flag(PORG, 'Sorbitol', 'limited', 'polyol'),
      flag(PORG, 'sustainable palm kernel oil', 'cleared', 'cleared98'),
      flag(PORG, 'Xylitol', 'limited', 'polyol'),
    ],
    verdict: 'caution',
    honestNote: NOTE_ORG,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-pastilles-orange-elderflower-1-7oz lists the 50 g tin at $13.99 and in stock. SKU BF01451. The barcode field prints the string 5.00E+12. That is not a 12-digit UPC and it was not attached. Ages 6 and older. Inactive ingredients: Beeswax, elderflower (as flavor), gum arabic, isomalt, maltitol, orange (as flavor), sorbitol, sustainable palm kernel oil, xylitol. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b297-rescue-cream-30',
    productName: 'Bach RESCUE Cream (30 g)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b297-rescue-cream-30',
    form: 'cream',
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [
      { name: 'Cherry Plum (Prunus cerasifera)', strength: '5X HPUS' },
      { name: 'Clematis (Clematis vitalba)', strength: '5X HPUS' },
      { name: 'Impatiens (Impatiens glandulifera)', strength: '5X HPUS' },
      { name: 'Crab Apple (Malus pumila)', strength: '5X HPUS' },
      { name: 'Rock Rose (Helianthemum nummularium)', strength: '5X HPUS' },
      { name: 'Star of Bethlehem (Ornithogalum umbellatum)', strength: '5X HPUS' },
    ],
    inactiveIngredients: [
      flag(PCREAM, 'Beeswax', 'cleared', 'cleared98'),
      flag(PCREAM, 'caprylic/capric triglyceride', 'limited', 'mct'),
      flag(PCREAM, 'caprylyl glycol', 'moderate', 'caution98'),
      flag(PCREAM, 'cetearyl alcohol', 'moderate', 'caution98'),
      flag(PCREAM, 'cetyl palmitate', 'moderate', 'caution98'),
      flag(PCREAM, 'Citric Acid', 'cleared', 'citric'),
      flag(PCREAM, 'Glycerin', 'cleared', 'glycerin'),
      flag(PCREAM, 'glyceryl stearate citrate', 'moderate', 'caution98'),
      flag(PCREAM, 'isopropyl palmitate', 'moderate', 'caution98'),
      flag(PCREAM, 'potassium sorbate', 'moderate', 'caution98'),
      flag(PCREAM, 'Purified Water', 'cleared', 'water'),
      flag(PCREAM, 'shea butter', 'cleared', 'cleared98'),
      flag(PCREAM, 'xanthan gum', 'cleared', 'cleared98'),
    ],
    verdict: 'caution',
    honestNote: NOTE_CREAM,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-cream-1oz lists the 30 g tube at $13.49 and in stock. SKU BF01461. The barcode field is empty. This is the 30 g tube, not the 50 mL cream whose US page returned 404. Active ingredients include Crab Apple plus the five Rescue flowers, each 5X HPUS. Inactive ingredients: Beeswax, caprylic/capric triglyceride, caprylyl glycol, cetearyl alcohol, cetyl palmitate, citric acid, glycerin, glyceryl stearate citrate, isopropyl palmitate, potassium sorbate, purified water, shea butter, xanthan gum. Counted Limited token: caprylic/capric triglyceride. That is one, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b297-rescue-pearls-28',
    productName: 'Bach RESCUE Pearls (28 melts)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b297-rescue-pearls-28',
    form: 'melt',
    minAge: 6,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: FIVE,
    inactiveIngredients: [
      flag(PPEARL, 'Carnauba Wax', 'cleared', 'wax'),
      flag(PPEARL, 'Coconut Oil', 'cleared', 'coconut'),
      flag(PPEARL, 'Gelatin (fish)', 'cleared', 'gelatin'),
      flag(PPEARL, 'grapeseed oil', 'cleared', 'cleared98'),
      flag(PPEARL, 'natural orange flavor', 'limited', 'orangeF'),
      flag(PPEARL, 'natural vanilla flavor', 'limited', 'vanillaF'),
      flag(PPEARL, 'Pectin', 'cleared', 'pectin'),
      flag(PPEARL, 'Sorbitol', 'limited', 'polyol'),
    ],
    verdict: 'caution',
    honestNote: NOTE_PEARL,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-r-pearls lists 28 melts at $12.99 and in stock. SKU BF01542. The barcode field prints the string 5.00E+12. That is not a 12-digit UPC and it was not attached. Active ingredients are the five Rescue flowers, each 5X HPUS. Inactive ingredients: Carnauba wax, coconut oil, gelatin (fish), grapeseed oil, natural orange flavor, natural vanilla flavor, pectin, sorbitol. Counted Limited tokens: natural orange flavor and natural vanilla flavor. That is two, so this is not a 3+ stack. Ask a doctor before use in children under 6. Missing UPC. No code was invented. Not the Sleep Liquid Melts.',
    ],
  }),
  row({
    id: 'bach-b297-rescue-sleep-melts-28',
    productName: 'Bach RESCUE Sleep Liquid Melts (28 melts)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b297-rescue-sleep-melts-28',
    form: 'melt',
    minAge: 6,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [...FIVE, CHESTNUT],
    inactiveIngredients: [
      flag(PMELT, 'Carnauba Wax', 'cleared', 'wax'),
      flag(PMELT, 'Coconut Oil', 'cleared', 'coconut'),
      flag(PMELT, 'Gelatin (fish)', 'cleared', 'gelatin'),
      flag(PMELT, 'grapeseed oil', 'cleared', 'cleared98'),
      flag(PMELT, 'natural orange flavor', 'limited', 'orangeF'),
      flag(PMELT, 'natural vanilla flavor', 'limited', 'vanillaF'),
      flag(PMELT, 'Pectin', 'cleared', 'pectin'),
      flag(PMELT, 'Sorbitol', 'limited', 'polyol'),
    ],
    verdict: 'caution',
    honestNote: NOTE_MELT,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-sleep-r-liquid-melts lists 28 capsules at $12.99 and in stock. SKU BF01528. The barcode field is empty. Active ingredients include the five Rescue flowers and White Chestnut, each 5X HPUS. The Sleep formula includes White Chestnut. It is an active and is not graded. Inactive ingredients: Carnauba wax, coconut oil, gelatin (fish), grapeseed oil, natural orange flavor, natural vanilla flavor, pectin, sorbitol. Counted Limited tokens: natural orange flavor and natural vanilla flavor. That is two, so this is not a 3+ stack. Missing UPC. No code was invented. Not the Rescue Pearls.',
    ],
  }),
  row({
    id: 'bach-b297-rescue-plus-sleep-gummies-strawberry-60',
    productName: 'Bach RESCUE Plus Sleep Gummies Strawberry (60 gummies)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b297-rescue-plus-sleep-gummies-strawberry-60',
    form: 'gummy',
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [
      { name: 'White Chestnut (Aesculus hippocastanum) (flower) Essence' },
      { name: 'Clematis (Clematis vitalba) (flower) Essence' },
      { name: 'Star of Bethlehem (Ornithogalum umbellatum) (flower) Essence' },
      { name: 'Cherry Plum (Prunuscerasifera) (flower) Essence' },
      { name: 'Rock Rose (Helianthemum nummularium) (flower) Essence' },
      { name: 'Impatiens (Impatiens glandulifera) (flower) Essence' },
    ],
    inactiveIngredients: [
      flag(PGSTRAW, 'Organic Tapioca Syrup', 'cleared', 'syrup'),
      flag(PGSTRAW, 'Sugar', 'moderate', 'sugar'),
      flag(PGSTRAW, 'Water', 'cleared', 'water'),
      flag(PGSTRAW, 'Pectin', 'cleared', 'pectin'),
      flag(PGSTRAW, 'Citric Acid', 'cleared', 'citric'),
      flag(PGSTRAW, 'Sodium Citrate', 'cleared', 'citric'),
      flag(PGSTRAW, 'Natural Flavor', 'limited', 'natFlavor'),
      flag(PGSTRAW, 'Fruit & Vegetable Juice (for color)', 'cleared', 'juice'),
      flag(PGSTRAW, 'Coconut Oil', 'cleared', 'coconut'),
      flag(PGSTRAW, 'Carnauba Wax', 'cleared', 'wax'),
    ],
    verdict: 'caution',
    honestNote: NOTE_GSTRAW,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-plus-sleep-gummies-strawberry-60ct lists 60 gummies at $15.49 and in stock. SKU 3002827. The barcode field is empty. Adults: chew 1 to 2 gummies. Other ingredients: Organic Tapioca Syrup, Sugar, Water, Pectin, Citric Acid, Sodium Citrate, Natural Flavor, Fruit & Vegetable Juice (for color), Coconut Oil, Carnauba Wax, then the six flower essences. Those essences are actives and are not graded. The page prints Cherry Plum (Prunuscerasifera) with no space. Counted Limited token: natural flavor. That is one, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b297-rescue-plus-mood-gummies-orange-60',
    productName: 'Bach RESCUE Plus Mood Gummies Orange (60 gummies)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b297-rescue-plus-mood-gummies-orange-60',
    form: 'gummy',
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [
      { name: 'cherry plum (flower) essence' },
      { name: 'clematis (flower) essence' },
      { name: 'impatiens (flower) essence' },
      { name: 'rock rose (flower) essence' },
      { name: 'star of bethlehem (flower) essence' },
    ],
    inactiveIngredients: [
      flag(PGOR, 'Tapioca Syrup', 'cleared', 'syrup'),
      flag(PGOR, 'Sugar', 'moderate', 'sugar'),
      flag(PGOR, 'Pectin', 'cleared', 'pectin'),
      flag(PGOR, 'Citric Acid', 'cleared', 'citric'),
      flag(PGOR, 'Natural Flavor', 'limited', 'natFlavor'),
      flag(PGOR, 'vegetable juice (color from paprika & carrot)', 'cleared', 'cleared98'),
      flag(PGOR, 'medium chain triglycerides (from coconut/rapeseed oil)', 'cleared', 'cleared98'),
      flag(PGOR, 'Carnauba Wax', 'cleared', 'wax'),
    ],
    verdict: 'caution',
    honestNote: NOTE_GOR,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-plus-mood-stress-support-gummies-orange-60ct lists 60 gummies at $20.99 and in stock. SKU 3004601. The barcode field is empty. Adults: chew 3 gummies 2 times per day. Children under 18: consult a healthcare professional. Other ingredients: tapioca syrup, sugar, pectin, citric acid (to maintain freshness), natural flavor, vegetable juice (color from paprika & carrot), medium chain triglycerides (from coconut/rapeseed oil), carnauba wax, then the five flower essences. Those essences are actives and are not graded. Counted Limited token: natural flavor. That is one, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b297-rescue-plus-sleep-gummies-blueberry-60',
    productName: 'Bach RESCUE Plus Sleep Gummies Blueberry (60 gummies)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b297-rescue-plus-sleep-gummies-blueberry-60',
    form: 'gummy',
    minAge: 12,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [
      { name: 'white chestnut (flower) essence' },
      { name: 'cherry plum (flower) essence' },
      { name: 'clematis (flower) essence' },
      { name: 'impatiens (flower) essence' },
      { name: 'rock rose (flower) essence' },
      { name: 'star of bethlehem (flower) essence' },
    ],
    inactiveIngredients: [
      flag(PGBLU, 'Glucose Syrup', 'moderate', 'glucose'),
      flag(PGBLU, 'Sugar', 'moderate', 'sugar'),
      flag(PGBLU, 'Pectin', 'cleared', 'pectin'),
      flag(PGBLU, 'Citric Acid', 'cleared', 'citric'),
      flag(PGBLU, 'Natural Flavor', 'limited', 'natFlavor'),
      flag(PGBLU, 'fruit & vegetable juice (color from carrot & cherry)', 'cleared', 'cleared98'),
      flag(PGBLU, 'medium chain triglycerides (from coconut/rapeseed oil)', 'cleared', 'cleared98'),
      flag(PGBLU, 'Carnauba Wax', 'cleared', 'wax'),
    ],
    verdict: 'caution',
    honestNote: NOTE_GBLU,
    sourcesGeneral: [
      't98u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-plus-sleep-stress-support-gummies-blueberry-60ct lists 60 gummies at $20.99 and in stock. SKU 3004602. The barcode field is empty. Adults and children ages 12 and up: chew 2 gummies. Other ingredients: glucose syrup, sugar, pectin, citric acid (to maintain freshness), natural flavor, fruit & vegetable juice (color from carrot & cherry), medium chain triglycerides (from coconut/rapeseed oil), carnauba wax, then the flower essences including white chestnut. Those essences are actives and are not graded. Counted Limited token: natural flavor. That is one, so this is not a 3+ stack. Missing UPC. No code was invented.',
    ],
  }),
];

export const BATCH297_KYR6D_T98U: RatingRecord[] = [...flowerRows(), ...OTHER_ROWS];

const ROWS = BATCH297_KYR6D_T98U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bioptimizers-b297-mag-drink-raspberry-30': {
    verdict: 'avoid',
    cause: 'limited_stack',
    counted: 'goMCT®|Natural Raspberry Flavor|Natural Lemon Flavor',
    note: NOTE_RASP,
    barcode: '689176916324',
  },
  'bioptimizers-b297-mag-drink-cherry-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'goMCT®',
    note: NOTE_CHERRY,
    barcode: '850064051148',
  },
  'bioptimizers-b297-mag-drink-punch-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'goMCT®|Natural Strawberry Flavor',
    note: NOTE_PUNCH,
    barcode: '689176916355',
  },
  'bach-b297-pastilles-cranberry-50': { verdict: 'caution', cause: 'moderate', counted: '', note: NOTE_CRAN, barcode: '' },
  'bach-b297-pastilles-lemon-50': { verdict: 'caution', cause: 'moderate', counted: '', note: NOTE_LEM, barcode: '' },
  'bach-b297-pastilles-watermelon-50': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavor|stevia leaf extract (rebaudioside-A)',
    note: NOTE_WAT,
    barcode: '',
  },
  'bach-b297-pastilles-black-currant-50': { verdict: 'caution', cause: 'moderate', counted: '', note: NOTE_BLK, barcode: '' },
  'bach-b297-pastilles-orange-elderflower-50': { verdict: 'caution', cause: 'moderate', counted: '', note: NOTE_ORG, barcode: '' },
  'bach-b297-rescue-cream-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'caprylic/capric triglyceride',
    note: NOTE_CREAM,
    barcode: '',
  },
  'bach-b297-rescue-pearls-28': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'natural orange flavor|natural vanilla flavor',
    note: NOTE_PEARL,
    barcode: '',
  },
  'bach-b297-rescue-sleep-melts-28': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'natural orange flavor|natural vanilla flavor',
    note: NOTE_MELT,
    barcode: '',
  },
  'bach-b297-rescue-plus-sleep-gummies-strawberry-60': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavor',
    note: NOTE_GSTRAW,
    barcode: '',
  },
  'bach-b297-rescue-plus-mood-gummies-orange-60': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavor',
    note: NOTE_GOR,
    barcode: '',
  },
  'bach-b297-rescue-plus-sleep-gummies-blueberry-60': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Flavor',
    note: NOTE_GBLU,
    barcode: '',
  },
};

if (ROWS.length !== 51) throw new Error(`batch297 row count ${ROWS.length}`);

const flowerIds = new Set(FLOWERS.map(([slug]) => `bach-b297-${slug}-20`));

for (const record of ROWS) {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (flowerIds.has(record.id)) {
    if (rollup.verdict !== 'caution' || rollup.cause !== 'moderate' || counted !== '' || (mapped.barcode ?? '') !== '') {
      throw new Error(`batch297 flower ${record.id} ${rollup.verdict} ${rollup.cause} ${counted}`);
    }
    if ((mapped.honestNote ?? '') !== NOTE_FLOWER) throw new Error(`batch297 flower note ${record.id}`);
  } else {
    const expected = EXPECTED[record.id];
    if (!expected) throw new Error(`batch297 unexpected id ${record.id}`);
    if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
      throw new Error(`batch297 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
    }
    if (counted !== expected.counted) throw new Error(`batch297 stack ${record.id} ${counted}`);
    if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch297 note ${record.id}`);
    if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch297 upc ${record.id} ${mapped.barcode}`);
  }
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const note = mapped.honestNote ?? '';
  if (formNote && !note.startsWith(formNote)) throw new Error(`batch297 form note ${record.id} ${formNote}`);
  if (stackNote && !note.includes(stackNote)) throw new Error(`batch297 stack note ${record.id} ${stackNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch297 blank why ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch297 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
