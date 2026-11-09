// DRAFT / not verified / batch 291 KYR6-d (t84u).
// Brand page is the single source when that page shows the 1-pack and the panel.
// Missing UPCs stay empty. No brand is closed. The Sprouts section is not edited.
// Honest note only when a form contradicts itself or a 3+ Limited stack applies.

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
const KIDS = 'kids' as const;

const S = {
  grape: 'Methodology §5 Cleared (Grape Alcohol — t84u). Named grape-derived alcohol vehicle. Does not count toward the t137u stack.',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  water: 'Methodology §5 Cleared (water / purified water).',
  riceBran: 'Methodology §5 Cleared (Stabilized Rice Bran — t84u). Named rice bran. Rice-bran / rice-hull fiber family. Distinct from the Limited rice extract.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate / mixed-tocopherols antioxidant).',
  xylitol: 'Methodology §5 Limited (xylitol). Named sugar alcohol. Does not count toward the t137u stack.',
  peppermint: 'Methodology §5 Cleared (Natural Peppermint — t84u). Named natural peppermint flavor. No Limited carrier on the token.',
  spearmint: 'Methodology §5 Caution (spearmint flavor). Names spearmint. Does not count toward the t137u stack.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate, vegetable source).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers and buffers).',
  bicarb: 'Methodology §5 Cleared (sodium bicarbonate).',
  stevia: 'Methodology §5 Limited (stevia — t158u). Counts toward the t137u stack.',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  steviaHp:
    'Methodology §5 Cleared (high-purity steviol glycosides). The panel names Stevia rebaudiana (Stevial Glycocids) Extract. The parenthesis is the glycoside form.',
  clove: 'Methodology §5 Caution (Clove Bud Oil — t84u). Named essential oil. Does not count toward the t137u stack.',
  pepOil: 'Methodology §5 Cleared (peppermint oil).',
  menthol: 'Methodology §5 Caution (menthol). Inactive menthol in a spray stays Caution. Does not count toward the t137u stack.',
  echinacea: 'Methodology §5 Cleared (Echinacea purpurea root extract). Named plant-part extract used as an inactive.',
  elder: 'Methodology §5 Cleared (Elderberry (Sambucus nigra) Fruit Extract — t84u). Named plant-part extract used as an inactive.',
  slippery: 'Methodology §5 Cleared (Slippery Elm Bark Extract — t84u). Named plant-part extract used as an inactive.',
  cherry: 'Methodology §5 Cleared (Wild Cherry Bark Extract — t84u). Named plant-part extract used as an inactive.',
  cane: 'Methodology §5 Caution (organic cane syrup — t51u). Does not count toward the t137u stack.',
  brownRice: 'Methodology §5 Cleared (brown rice syrup).',
  raspFlavor:
    'Methodology §5 Caution (Natural Raspberry and other Natural Flavors). Names raspberry. Does not count toward the t137u stack.',
  honey: 'Methodology §5 Cleared (honey).',
  sorbitol: 'Methodology §5 Limited (sorbitol). Named sugar alcohol. Does not count toward the t137u stack.',
  maltitol: 'Methodology §5 Limited (maltitol). Named sugar alcohol. Does not count toward the t137u stack.',
  steviol: 'Methodology §5 Limited (steviol glycosides from Stevia). Counts toward the t137u stack.',
  gum: 'Methodology §5 Cleared (gum arabic).',
  juice: 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — Oct 15, 2026).',
  flavour: 'Methodology §5 Cleared (natural flavouring — t84u). Named plant-color family. UK spelling. Does not count toward the t137u stack.',
  colour: 'Methodology §5 Cleared (colouring foods (carrot and blackcurrant concentrate) — t84u). Named plant color.',
  wax: 'Methodology §5 Cleared (carnauba wax — t133u).',
  sugar: 'Methodology §5 Caution (bare sugar — Sept 22, 2026). The label says sugar and does not name cane sugar. Does not count toward the t137u stack.',
  cocoa: 'Methodology §5 Cleared (cocoa butter).',
  milkPowder: 'Methodology §5 Cleared (whole milk powder).',
  chocolate: 'Methodology §5 Cleared (unsweetened chocolate).',
  nonfat: 'Methodology §5 Cleared (nonfat dry milk).',
  milkfat: 'Methodology §5 Cleared (milkfat).',
  lecithin: 'Methodology §5 Cleared (soy lecithin / lecithin).',
  vanilla: 'Methodology §5 Cleared (natural vanilla extract — t50u).',
  riceStarch: 'Methodology §5 Cleared (rice starch).',
  tapioca: 'Methodology §5 Limited (tapioca dextrin). Counts toward the t137u stack.',
  cabbage: 'Methodology §5 Cleared (Color Added (red cabbage) — t84u). Named plant color. Same lock as Colored with Red Cabbage Color.',
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
  partial: Omit<RatingRecord, 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & { barcode?: string },
): RatingRecord {
  return finish({
    ...partial,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: [partial.brand],
    barcode: partial.barcode ?? '',
  });
}

const PBACH =
  'Nelsons US brand page. The bottle is 20 mL. Put 4 drops on the tongue or in a drink, up to 4 times a day. Grape Alcohol is about 27% v/v. The flower essences are the actives and are not graded. t84u brand-page single source.';
const PPROB =
  'BiOptimizers brand page. https://bioptimizers.com/products/probiotic-breakthrough. The facts image is the 60-capsule panel. Serving 2 capsules. Servings per container 30. t84u brand-page single source.';
const PZINC =
  'BiOptimizers brand page. https://bioptimizers.com/products/zinc-breakthrough. The facts image is the 60-capsule panel. The 30-capsule variant is the same other-ingredient line. Serving 1 capsule. t84u brand-page single source.';
const PHYLA =
  'Hyalogic brand page. https://hyalogic.com/products/hylamints. Serving 1 mint lozenge. Servings per container 60. The Nature’s Moisturizer Blend is the active and is not graded. t84u brand-page single source.';
const PSPRAY =
  'Quantum Health brand page. https://quantumhealth.com/products/therazinc-zinc-throat-spray. Serving 8 sprays (1.4 mL). Zinc (from zinc gluconate) 7.4 mg. t84u brand-page single source.';
const PELD =
  'Quantum Health brand page. https://quantumhealth.com/products/therazinc-usda-elderberry-raspberry-lozenges. The facts image is the panel. Serving 1 lozenge (3.5 g). t84u brand-page single source.';
const PPAST =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-kids-night-pastilles-raspberry-50g. The tin is 50 g. Ages 3 and older. Chew one pastille. The flower essences are the actives and are not graded. t84u brand-page single source.';
const PVAL =
  'Good Day Chocolate brand page. https://shop.gooddaychocolate.com/products/kids-sleep-with-valerian-root. Ages 3 and older take 2 pieces (7 g). Ages 5 and older take 4 pieces (14 g). The bottle image names the color. t84u brand-page single source.';
const MILK: IngredientFlag[] = [
  flag(PVAL, 'Sugar', 'moderate', 'sugar'),
  flag(PVAL, 'Cocoa Butter', 'cleared', 'cocoa'),
  flag(PVAL, 'Whole Milk Powder', 'cleared', 'milkPowder'),
  flag(PVAL, 'Unsweetened Chocolate', 'cleared', 'chocolate'),
  flag(PVAL, 'Nonfat Dry Milk', 'cleared', 'nonfat'),
  flag(PVAL, 'Milkfat', 'cleared', 'milkfat'),
  flag(PVAL, 'Soy Lecithin', 'cleared', 'lecithin'),
  flag(PVAL, 'Natural Vanilla Extract', 'cleared', 'vanilla'),
  flag(PVAL, 'Sugar', 'moderate', 'sugar'),
  flag(PVAL, 'Rice Starch', 'cleared', 'riceStarch'),
  flag(PVAL, 'Tapioca Dextrin', 'limited', 'tapioca'),
  flag(PVAL, 'Gum Arabic', 'cleared', 'gum'),
  flag(PVAL, 'Carnauba Wax', 'cleared', 'wax'),
];

const SPRAY: IngredientFlag[] = [
  flag(PSPRAY, 'Water', 'cleared', 'water'),
  flag(PSPRAY, 'Glycerin', 'cleared', 'glycerin'),
  flag(PSPRAY, 'Stevia rebaudiana (Stevial Glycocids) Extract', 'cleared', 'steviaHp'),
  flag(PSPRAY, 'Clove Bud Oil', 'moderate', 'clove'),
  flag(PSPRAY, 'Peppermint Oil', 'cleared', 'pepOil'),
  flag(PSPRAY, 'Menthol', 'moderate', 'menthol'),
  flag(PSPRAY, 'Echinacea purpurea Root Extract', 'cleared', 'echinacea'),
  flag(PSPRAY, 'Elderberry (Sambucus nigra) Fruit Extract', 'cleared', 'elder'),
  flag(PSPRAY, 'Slippery Elm Bark Extract', 'cleared', 'slippery'),
  flag(PSPRAY, 'Wild Cherry Bark Extract', 'cleared', 'cherry'),
];

const ELDER: IngredientFlag[] = [
  flag(PELD, 'Organic Cane Syrup', 'moderate', 'cane'),
  flag(PELD, 'Organic Brown Rice Syrup', 'cleared', 'brownRice'),
  flag(PELD, 'Natural Raspberry and other Natural Flavors', 'moderate', 'raspFlavor'),
  flag(PELD, 'Organic Honey', 'cleared', 'honey'),
];

const PAST: IngredientFlag[] = [
  flag(PPAST, 'Sorbitol', 'limited', 'sorbitol'),
  flag(PPAST, 'Maltitol', 'limited', 'maltitol'),
  flag(PPAST, 'steviol glycosides from Stevia', 'limited', 'steviol'),
  flag(PPAST, 'Gum Arabic', 'cleared', 'gum'),
  flag(PPAST, 'Water', 'cleared', 'water'),
  flag(PPAST, 'Citric Acid', 'cleared', 'citric'),
  flag(PPAST, 'Concentrated Raspberry Juice', 'cleared', 'juice'),
  flag(PPAST, 'natural flavouring', 'cleared', 'flavour'),
  flag(PPAST, 'colouring foods (carrot and blackcurrant concentrate)', 'cleared', 'colour'),
  flag(PPAST, 'Carnauba Wax', 'cleared', 'wax'),
];

const NIGHT = [
  { name: 'Rock Rose (Helianthemum nummularium)', strength: 'flower essence' },
  { name: 'Clematis (Clematis vitalba)', strength: 'flower essence' },
  { name: 'Impatiens (Impatiens glandulifera)', strength: 'flower essence' },
  { name: 'Cherry Plum (Prunus cerasifera)', strength: 'flower essence' },
  { name: 'Star of Bethlehem (Ornithogalum umbellatum)', strength: 'flower essence' },
  { name: 'White Chestnut (Aesculus hippocastanum)', strength: 'flower essence' },
];

export const BATCH291_KYR6D_T84U: RatingRecord[] = [
  row({
    id: 'bach-b291-self-confidence-20',
    productName: 'Bach Self Confidence Blend (20 mL)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b291-self-confidence-20',
    form: 'liquid drops',
    activeIngredients: [
      { name: 'Crab Apple (Malus sylvestris)', strength: 'flower essence' },
      { name: 'Pine (Pinus sylvestris)', strength: 'flower essence' },
      { name: 'Larch (Larix decidua)', strength: 'flower essence' },
      { name: 'Walnut (Juglans regia)', strength: 'flower essence' },
    ],
    inactiveIngredients: [flag(PBACH, 'Grape Alcohol', 'cleared', 'grape')],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/bach-self-confidence-blend lists the 20 mL at $21.60 and in stock. Ingredients: Grape Alcohol (approx. 27% v/v) and flower essences of Crab Apple, Pine, Larch, and Walnut. Grape Alcohol is the t84u named vehicle. Counted Limited tokens: none. The variant barcode field is empty. Missing UPC. No code was invented. The $0 French and German duplicates are not this row.',
    ],
  }),
  row({
    id: 'bach-b291-peaceful-mind-20',
    productName: 'Bach Peaceful Mind Blend (20 mL)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b291-peaceful-mind-20',
    form: 'liquid drops',
    activeIngredients: [
      { name: 'Hornbeam (Carpinus betulus)', strength: 'flower essence' },
      { name: 'Clematis (Clematis vitalba)', strength: 'flower essence' },
      { name: 'White Chestnut (Aesculus hippocastanum)', strength: 'flower essence' },
      { name: 'Scleranthus (Scleranthus annuus)', strength: 'flower essence' },
    ],
    inactiveIngredients: [flag(PBACH, 'Grape Alcohol', 'cleared', 'grape')],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/bach-peaceful-mind-blend lists the 20 mL at $21.60 and in stock. Ingredients: Grape Alcohol (approx. 27% v/v) and flower essences of Hornbeam, Clematis, White Chestnut, and Scleranthus. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b291-menopause-20',
    productName: 'Bach Menopause Blend (20 mL)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b291-menopause-20',
    form: 'liquid drops',
    activeIngredients: [
      { name: 'Scleranthus (Scleranthus annuus)', strength: 'flower essence' },
      { name: 'Walnut (Juglans regia)', strength: 'flower essence' },
      { name: 'Elm (Ulmus procera)', strength: 'flower essence' },
      { name: 'Crab Apple (Malus sylvestris)', strength: 'flower essence' },
    ],
    inactiveIngredients: [flag(PBACH, 'Grape Alcohol', 'cleared', 'grape')],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/bach-menopause-blend lists the 20 mL at $21.60 and in stock. Ingredients: Grape Alcohol (approx. 27% v/v) and flower essences of Scleranthus, Walnut, Elm, and Crab Apple. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b291-letting-go-20',
    productName: 'Bach Letting Go Blend (20 mL)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b291-letting-go-20',
    form: 'liquid drops',
    activeIngredients: [
      { name: 'Red Chestnut (Aesculus carnea)', strength: 'flower essence' },
      { name: 'Chestnut Bud (Aesculus hippocastanum)', strength: 'flower essence' },
      { name: 'Walnut (Juglans regia)', strength: 'flower essence' },
      { name: 'Elm (Ulmus procera)', strength: 'flower essence' },
    ],
    inactiveIngredients: [flag(PBACH, 'Grape Alcohol', 'cleared', 'grape')],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/bach-letting-go-blend lists the 20 mL at $21.60 and in stock. Ingredients: Grape Alcohol (approx. 27% v/v) and flower essences of Red Chestnut, Chestnut Bud, Walnut, and Elm. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bach-b291-emotional-recharge-20',
    productName: 'Bach Emotional Recharge Blend (20 mL)',
    brand: 'Bach',
    category: 'Herbs',
    formulaId: 'bach-b291-emotional-recharge-20',
    form: 'liquid drops',
    activeIngredients: [
      { name: 'Olive (Olea europaea)', strength: 'flower essence' },
      { name: 'Oak (Quercus robur)', strength: 'flower essence' },
      { name: 'Elm (Ulmus procera)', strength: 'flower essence' },
    ],
    inactiveIngredients: [flag(PBACH, 'Grape Alcohol', 'cleared', 'grape')],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/bach-emotional-recharge-blend lists the 20 mL at $21.60 and in stock. Ingredients: Grape Alcohol (approx. 27% v/v) and flower essences of Olive, Oak, and Elm. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bioptimizers-b291-probiotic-30',
    productName: 'BiOptimizers Probiotic Breakthrough (30 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b291-probiotic',
    form: 'capsule',
    activeIngredients: [
      { name: 'Synbiotic Blend (dried chicory root inulin, L. plantarum OM)', strength: '500 mg' },
      { name: 'L. plantarum OM', strength: '5 billion CFU' },
    ],
    inactiveIngredients: [
      flag(PPROB, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PPROB, 'Water', 'cleared', 'water'),
      flag(PPROB, 'Stabilized Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/probiotic-breakthrough lists the 30 capsules at $21.99 and in stock. The facts image prints Other Ingredients: Capsule (hypromellose, water), Stabilized Rice Bran. Serving 2 capsules. The image prints 30 servings, which is the 60-capsule bottle. The 30-capsule bottle is 15 servings of that same line. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bioptimizers-b291-probiotic-60',
    productName: 'BiOptimizers Probiotic Breakthrough (60 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b291-probiotic',
    form: 'capsule',
    activeIngredients: [
      { name: 'Synbiotic Blend (dried chicory root inulin, L. plantarum OM)', strength: '500 mg' },
      { name: 'L. plantarum OM', strength: '5 billion CFU' },
    ],
    inactiveIngredients: [
      flag(PPROB, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PPROB, 'Water', 'cleared', 'water'),
      flag(PPROB, 'Stabilized Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/probiotic-breakthrough lists the 60 capsules at $39.99 and in stock. Serving 2 capsules. Servings per container 30. Other ingredients: Capsule (hypromellose, water), Stabilized Rice Bran. Stabilized Rice Bran is the t84u rice-bran lock. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bioptimizers-b291-probiotic-120',
    productName: 'BiOptimizers Probiotic Breakthrough (120 capsules)',
    brand: 'BiOptimizers',
    category: 'Digestive',
    formulaId: 'bioptimizers-b291-probiotic',
    form: 'capsule',
    activeIngredients: [
      { name: 'Synbiotic Blend (dried chicory root inulin, L. plantarum OM)', strength: '500 mg' },
      { name: 'L. plantarum OM', strength: '5 billion CFU' },
    ],
    inactiveIngredients: [
      flag(PPROB, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PPROB, 'Water', 'cleared', 'water'),
      flag(PPROB, 'Stabilized Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/probiotic-breakthrough lists the 120 capsules at $74.99 and in stock. Same other-ingredient line as the 60. Serving 2 capsules. The 120-capsule bottle is 60 servings. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'bioptimizers-b291-zinc-breakthrough-30',
    productName: 'BiOptimizers Zinc Breakthrough (30 capsules)',
    brand: 'BiOptimizers',
    category: 'Vitamins',
    formulaId: 'bioptimizers-b291-zinc-breakthrough-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin C (as magnesium ascorbate and calcium ascorbate)', strength: '125 mg' },
      { name: 'Zinc (as zinc picolinate, zinc citrate, zinc gluconate, zinc aspartate, zinc oxide, zinc carnosine, zinc orotate)', strength: '15 mg' },
      { name: 'Copper (as copper bisglycinate chelate)', strength: '1.9 mg' },
    ],
    inactiveIngredients: [
      flag(PZINC, 'Hypromellose (capsule)', 'cleared', 'hpmc'),
      flag(PZINC, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PZINC, 'Ascorbyl Palmitate', 'cleared', 'ascorbyl'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't84u. BiOptimizers brand page is the single source. https://bioptimizers.com/products/zinc-breakthrough lists the 30 capsules at $13.99 and in stock. The only facts image prints 60 servings. That image is bioptimizers-b290-zinc-breakthrough-60. The 30-capsule variant is the other in-stock count on the same page and uses that other-ingredient line. Serving 1 capsule. Servings per container 30. Counted Limited tokens: none. Missing UPC. No code was invented. Not the written 60.',
    ],
  }),
  row({
    id: 'hyalogic-b291-hylamints-60',
    productName: 'Hyalogic HylaMints (60 lozenges)',
    brand: 'Hyalogic',
    category: 'Vitamins',
    formulaId: 'hyalogic-b291-hylamints-60',
    form: 'lozenge',
    activeIngredients: [
      { name: 'Nature’s Moisturizer Blend (hyaluronic acid, pectin, slippery elm bark, cranberry extract)', strength: 'amount not printed' },
    ],
    inactiveIngredients: [
      flag(PHYLA, 'Xylitol', 'limited', 'xylitol'),
      flag(PHYLA, 'Natural Peppermint', 'cleared', 'peppermint'),
      flag(PHYLA, 'Spearmint Flavor', 'moderate', 'spearmint'),
      flag(PHYLA, 'Vegetable Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PHYLA, 'Citric Acid', 'cleared', 'citric'),
      flag(PHYLA, 'Sodium Bicarbonate', 'cleared', 'bicarb'),
      flag(PHYLA, 'Stevia', 'limited', 'stevia'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't84u. Hyalogic brand page is the single source. https://hyalogic.com/products/hylamints lists the 60 lozenges at $14.95 and in stock. Serving 1 lozenge. Ingredients: Xylitol, Nature’s Moisturizer Blend (hyaluronic acid, pectin, slippery elm bark, cranberry extract), Natural Peppermint, Spearmint Flavor, Vegetable Magnesium Stearate, Citric Acid, Sodium Bicarbonate, Stevia. Counted Limited token: Stevia. That is one, so this is not a 3+ stack. Xylitol does not stack. Spearmint Flavor is Caution and does not stack. Natural Peppermint is the t84u lock. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'quantum-b291-therazinc-spray-2',
    productName: 'Quantum Health TheraZinc Throat Spray (2 oz)',
    brand: 'Quantum Health',
    category: 'Cold & Flu',
    formulaId: 'quantum-b291-therazinc-spray',
    form: 'spray',
    minAge: 12,
    activeIngredients: [{ name: 'Zinc (from zinc gluconate)', strength: '7.4 mg' }],
    inactiveIngredients: SPRAY,
    verdict: 'caution',
    sourcesGeneral: [
      't84u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-zinc-throat-spray lists the 2 oz at $12.59 and in stock. Serving 8 sprays (1.4 mL). Servings per container 41. Zinc 7.4 mg. Other ingredients: Water, Glycerin, Stevia rebaudiana (Stevial Glycocids) Extract, Clove Bud Oil, Peppermint Oil, Menthol, Echinacea purpurea Root Extract, Elderberry (Sambucus nigra) Fruit Extract, Slippery Elm Bark Extract, Wild Cherry Bark Extract. Clove Bud Oil and menthol are Caution and do not stack. Counted Limited tokens: none. Children under 12: ask a health professional. Missing UPC. No code was invented. The 4 oz is a separate row.',
    ],
  }),
  row({
    id: 'quantum-b291-therazinc-spray-4',
    productName: 'Quantum Health TheraZinc Throat Spray (4 oz)',
    brand: 'Quantum Health',
    category: 'Cold & Flu',
    formulaId: 'quantum-b291-therazinc-spray',
    form: 'spray',
    minAge: 12,
    activeIngredients: [{ name: 'Zinc (from zinc gluconate)', strength: '7.4 mg' }],
    inactiveIngredients: SPRAY,
    verdict: 'caution',
    sourcesGeneral: [
      't84u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-zinc-throat-spray lists the 4 oz at $18.89 and in stock. Same other-ingredient line as the 2 oz. Serving 8 sprays (1.4 mL). Servings per container 82. The facts image prints 82 servings. Counted Limited tokens: none. Missing UPC. No code was invented. The 2 oz is a separate row.',
    ],
  }),
  row({
    id: 'quantum-b291-therazinc-organic-elder-18',
    productName: 'Quantum Health TheraZinc USDA Organic Elderberry Raspberry Lozenges (18 lozenges)',
    brand: 'Quantum Health',
    category: 'Cold & Flu',
    formulaId: 'quantum-b291-therazinc-organic-elder',
    form: 'lozenge',
    minAge: 12,
    activeIngredients: [
      { name: 'Zinc (from zinc gluconate)', strength: '7 mg' },
      { name: 'Organic Elderberry (Sambucus nigra) Fruit Powder', strength: '36 mg' },
    ],
    inactiveIngredients: ELDER,
    verdict: 'caution',
    sourcesGeneral: [
      't84u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-usda-elderberry-raspberry-lozenges lists the 18-count at $7.19 and in stock. The facts image prints Other Ingredients: Organic Cane Syrup, Organic Brown Rice Syrup, Natural Raspberry and other Natural Flavors, Organic Honey. Serving 1 lozenge (3.5 g). The image does not print a separate servings number. The 18-count bag is 18 servings. Organic cane syrup is Caution and does not stack. The raspberry flavor names raspberry and does not stack. Counted Limited tokens: none. Missing UPC. No code was invented. The 25-count is a separate row. Not the written Blood Orange 25.',
    ],
  }),
  row({
    id: 'quantum-b291-therazinc-organic-elder-25',
    productName: 'Quantum Health TheraZinc USDA Organic Elderberry Raspberry Lozenges (25 lozenges)',
    brand: 'Quantum Health',
    category: 'Cold & Flu',
    formulaId: 'quantum-b291-therazinc-organic-elder',
    form: 'lozenge',
    minAge: 12,
    activeIngredients: [
      { name: 'Zinc (from zinc gluconate)', strength: '7 mg' },
      { name: 'Organic Elderberry (Sambucus nigra) Fruit Powder', strength: '36 mg' },
    ],
    inactiveIngredients: ELDER,
    verdict: 'caution',
    sourcesGeneral: [
      't84u. Quantum Health brand page is the single source. https://quantumhealth.com/products/therazinc-usda-elderberry-raspberry-lozenges lists the 25-count at $13.49 and in stock. Same facts image as the 18-count. Serving 1 lozenge (3.5 g). The 25-count box is 25 servings. Organic cane syrup is Caution and does not stack. Counted Limited tokens: none. Missing UPC. No code was invented. The 18-count is a separate row.',
    ],
  }),
  row({
    id: 'bach-b291-kids-night-pastilles-raspberry-50',
    productName: 'Bach RESCUE Kids Night Raspberry Pastilles (50 g)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b291-kids-night-pastilles-raspberry-50',
    form: 'pastille',
    audience: KIDS,
    minAge: 3,
    activeIngredients: NIGHT,
    inactiveIngredients: PAST,
    verdict: 'caution',
    sourcesGeneral: [
      't84u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-kids-night-pastilles-raspberry-50g lists the 50 g tin at $10.79 and in stock. Ages 3 and older. Ingredients: Sweeteners (sorbitol, maltitol, steviol glycosides from Stevia), gelling agent (gum arabic), water, acidifier (citric acid), concentrated raspberry juice, natural flavouring, colouring foods (carrot and blackcurrant concentrate), glazing agent (carnauba wax), and the RESCUE NIGHT flower essences. Counted Limited token: steviol glycosides from Stevia. That is one, so this is not a 3+ stack. Sorbitol and maltitol do not stack. natural flavouring and the colouring foods are the t84u locks. The tin prints EAN-13 5000488304855. That is not a 12-digit UPC. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'goodday-b291-kids-sleep-valerian-50',
    productName: 'Good Day Chocolate Kids Sleep with Valerian Root (50 pieces)',
    brand: 'Good Day Chocolate',
    category: 'Sleep',
    formulaId: 'goodday-b291-kids-sleep-valerian',
    form: 'chocolate',
    audience: KIDS,
    minAge: 3,
    barcode: '858982004987',
    activeIngredients: [
      { name: 'Valerian Root Extract', strength: '150 mg' },
      { name: 'L-Theanine', strength: '50 mg' },
    ],
    inactiveIngredients: [...MILK, flag(PVAL, 'Color Added (red cabbage)', 'cleared', 'cabbage')],
    verdict: 'caution',
    sourcesGeneral: [
      't84u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/kids-sleep-with-valerian-root lists the 50-piece bottle at $21.95 and in stock. Ages 3 and older. Serving 2 pieces (7 g). The 50-count is 12 to 25 servings depending on the 4-piece or 2-piece serving. Ages 5 and older take 4 pieces (14 g): valerian root extract 300 mg and L-theanine 100 mg. The bottle prints Color Added (red cabbage). The page text says Color Added and leaves the parenthesis off. The bottle was graded. Counted Limited token: tapioca dextrin. That is one, so this is not a 3+ stack. Bare sugar is Caution and does not stack. The milk-chocolate parts are split and are not graded a second time as the wrapper name. UPC 858982004987. The variant barcode field prints 8-5898200498-7. The 80-piece bottle is out of stock and is not this row. Not goodday-b282-kids-sleep-50.',
    ],
  }),
];

const ROWS = BATCH291_KYR6D_T84U;
const CLEAN = { verdict: 'clean' as const, cause: 'clean', counted: '', note: '', barcode: '' };
const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bach-b291-self-confidence-20': CLEAN,
  'bach-b291-peaceful-mind-20': CLEAN,
  'bach-b291-menopause-20': CLEAN,
  'bach-b291-letting-go-20': CLEAN,
  'bach-b291-emotional-recharge-20': CLEAN,
  'bioptimizers-b291-probiotic-30': CLEAN,
  'bioptimizers-b291-probiotic-60': CLEAN,
  'bioptimizers-b291-probiotic-120': CLEAN,
  'bioptimizers-b291-zinc-breakthrough-30': CLEAN,
  'hyalogic-b291-hylamints-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Stevia', note: '', barcode: '' },
  'quantum-b291-therazinc-spray-2': { verdict: 'caution', cause: 'moderate', counted: '', note: '', barcode: '' },
  'quantum-b291-therazinc-spray-4': { verdict: 'caution', cause: 'moderate', counted: '', note: '', barcode: '' },
  'quantum-b291-therazinc-organic-elder-18': { verdict: 'caution', cause: 'moderate', counted: '', note: '', barcode: '' },
  'quantum-b291-therazinc-organic-elder-25': { verdict: 'caution', cause: 'moderate', counted: '', note: '', barcode: '' },
  'bach-b291-kids-night-pastilles-raspberry-50': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'steviol glycosides from Stevia',
    note: '',
    barcode: '',
  },
  'goodday-b291-kids-sleep-valerian-50': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Tapioca Dextrin',
    note: '',
    barcode: '858982004987',
  },
};

if (ROWS.length !== 16) throw new Error(`batch291 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch291 unexpected id ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch291 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch291 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch291 note ${record.id} ${JSON.stringify(mapped.honestNote)}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch291 upc ${record.id} ${mapped.barcode}`);
  if (contradictionHonestNote(record) || limitedStackHonestNoteIfAny(record.inactiveIngredients)) {
    throw new Error(`batch291 unexpected auto note ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch291 blank why ${record.id} ${ingredient.name}`);
  }
}
