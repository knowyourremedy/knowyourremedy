// DRAFT / not verified / batch 282 KYR6-d (t49u ladder continuation).
// Brand page is the single source. A pack is here only when that page shows it for sale
// and every other-ingredient token is already locked. Missing UPCs stay empty.
// Not in this file: Magnesium Breakthrough 60. Not VegZymes. Not the drink.
// Not RidgeCrest Hair Revive. Not Hyalogic HA Gummy. Not HA Collagen Builder.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const METH = {
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  croscarm: 'Methodology §5 Cleared (croscarmellose sodium / cellulose family).',
  dical: 'Methodology §5 Cleared (dicalcium phosphate).',
  trical: 'Methodology §5 Cleared (tricalcium phosphate).',
  water: 'Methodology §5 Cleared (water / purified water).',
  alcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE — oral liquid). The percent on the bottle is the strength of this vehicle, not a new token.',
  cellulose: 'Methodology §5 Cleared (vegetable cellulose / cellulose family).',
  vegCap:
    'Methodology §5 Cleared (vegetable capsule — t130u unnamed rule; a named hypromellose or cellulose shell is Cleared, so the unnamed shell is not docked).',
  maltodextrin:
    'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  riceBran: 'Methodology §5 Cleared (rice bran extract / organic rice bran extract).',
  glycerin: 'Methodology §5 Cleared (vegetable glycerin / glycerin).',
  citric: 'Methodology §5 Caution (citric acid). Does not count toward the t137u stack.',
  benzoate: 'Methodology §5 Caution (sodium benzoate). Does not count toward the t137u stack.',
  sorbate: 'Methodology §5 Caution (potassium sorbate). Does not count toward the t137u stack.',
  orangeFlavor: 'Methodology §5 Cleared (natural flavor (orange) — named orange flavor).',
  isomalt: 'Methodology §5 Caution (isomalt). Does not count toward the t137u stack.',
  xylitol: 'Methodology §5 Caution (xylitol). Does not count toward the t137u stack.',
  beet: 'Methodology §5 Cleared (beet powder for color — named plant color).',
  berry: 'Methodology §5 Cleared (natural berry flavor — named berry flavor).',
  stevia: 'Methodology §5 Limited (stevia extract — t159u). Counts toward the t137u stack.',
  tapiocaSyrup: 'Methodology §5 Cleared (organic tapioca syrup).',
  cane: 'Methodology §5 Cleared (organic cane sugar / cane sugar).',
  coconut: 'Methodology §5 Cleared (coconut oil, named, any form — t111u).',
  carnauba: 'Methodology §5 Cleared (carnauba wax).',
  juiceColor: 'Methodology §5 Cleared (fruit and vegetable juice for color).',
  flavor: 'Methodology §5 Caution (natural flavor, singular). Does not count toward the t137u stack.',
  pectin: 'Methodology §5 Cleared (pectin).',
  citrate: 'Methodology §5 Caution (sodium citrate). Does not count toward the t137u stack.',
  bamboo: 'Methodology §5 Caution (bamboo leaf extract). The parenthetical silica is not a separate token. Does not count toward the t137u stack.',
  mctOil:
    'Methodology §5 Cleared (MCT oil — exact token; capsule coating or fill — t118u). Distinct from Limited unlabeled MCT and from Limited goMCT®.',
  starch: 'Methodology §5 Cleared (tapioca starch).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function cleared(panel: string, name: string): IngredientFlag {
  return { name, riskLevel: 'cleared', source: `${panel}; Methodology §5 Cleared (${name}).` };
}

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
  const audience = partial.audience ?? ADULT;
  const minAge = partial.minAge ?? 18;
  return finish({
    ...partial,
    brand,
    audience,
    minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: [brand],
    barcode: partial.barcode ?? '',
  });
}

const PLYS =
  'Quantum Health brand page and the bottle image on that page. Serving 1 tablet. The bottle image reads 100 tablets. L-lysine is the active and is not graded. t49u brand-page single source.';
const PSLIQ =
  'Quantum Health brand page. Serving 1 dropper (0.7 mL). The bottle is 2 oz, about 80 servings. Lysine is the active and is not graded. The 40% on the alcohol line is the strength of the vehicle. t49u brand-page single source.';
const PRES =
  'Hyalogic brand page. Serving 1 capsule. The bottle is 30 capsules. Resveratrol is the active and is not graded. t49u brand-page single source.';
const PLOZ =
  'Hyalogic brand page. Serving 1 chewable lozenge. The bottle is 60 count. Hyaluronic acid is the active and is not graded. t49u brand-page single source.';
const PADR =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PIMM =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PLIQ =
  'RidgeCrest Herbals brand page. The bottle is 2 oz (59 mL). Directions say take 1/2 mL. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PSPORT =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PEYE =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 120 capsules, 60 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PGLAD =
  'RidgeCrest Herbals brand page. Serving 3 capsules. The bottle is 60 capsules, 20 servings. Directions say 3 capsules twice daily. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PPHY =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PSER =
  'RidgeCrest Herbals brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PTHY =
  'RidgeCrest Herbals brand page. Serving 3 capsules. The bottle is 60 capsules, 20 servings. Directions say take 3 capsules in the morning. Adults and children 12 and older. The herbs are the actives and are not graded. t49u brand-page single source.';
const PCHILL =
  'Lemme brand page. Serving 2 gummies. Servings per container 30. The 1-pack is 60 gummies. The 2-pack and the 3-pack are multipacks and are not this row. t49u brand-page single source.';
const PDEB =
  'Lemme brand page. Serving 2 capsules. Servings per container 30. The 1-pack is 60 capsules. The 3-pack and the 6-pack are multipacks and are not this row. t49u brand-page single source.';
const PGROW =
  'Lemme brand page. Serving 2 capsules. Servings per container 30. The 1-pack is 60 capsules. MCT Oil is the exact Cleared token. The multipacks are not this row. t49u brand-page single source.';
const PVIS =
  'Hyalogic brand page. Serving 2 capsules. Servings per container 60. The bottle is 120 capsules. The vitamins are the actives and are not graded. t49u brand-page single source.';
const PLIQHA =
  'Hyalogic brand page. Serving 2 teaspoons (10 mL). About 36 servings. Hyaluronic acid and MSM are the actives and are not graded. t49u brand-page single source.';
const PLIQHSN =
  'Hyalogic brand page. Serving 2 teaspoons (10 mL). About 36 servings. Hyaluronic acid, biotin, and MSM are the actives and are not graded. t49u brand-page single source.';
const PLIQSKIN =
  'Hyalogic brand page. Serving 2 teaspoons (10 mL). About 36 servings. MSM and hyaluronic acid are the actives and are not graded. t49u brand-page single source.';
const PDARK =
  'Good Day Chocolate brand page. The chocolate, the added sugar, the starch, the dextrin, the gum, the wax, and the named color are the other ingredients. t49u brand-page single source.';
const PMILK =
  'Good Day Chocolate brand page. The milk chocolate, the added sugar, the starch, the dextrin, the gum, the wax, and the named color are the other ingredients. t49u brand-page single source.';

const DARK = [
  'Unsweetened Chocolate',
  'Sugar',
  'Cocoa Butter',
  'Soy Lecithin',
  'Natural Vanilla Extract',
  'Rice Starch',
  'Tapioca Dextrin',
  'Gum Arabic',
  'Carnauba Wax',
];
const MILK = [
  'Sugar',
  'Cocoa Butter',
  'Whole Milk Powder',
  'Unsweetened Chocolate',
  'Nonfat Dry Milk',
  'Milkfat',
  'Soy Lecithin',
  'Natural Vanilla Extract',
  'Rice Starch',
  'Tapioca Dextrin',
  'Gum Arabic',
  'Carnauba Wax',
];

function goodDayRows(): RatingRecord[] {
  const dark = (panel: string, color: string) => [...DARK.map((name) => cleared(panel, name)), cleared(panel, color)];
  const milk = (panel: string, color: string) => [...MILK.map((name) => cleared(panel, name)), cleared(panel, color)];
  const pack = (
    id: string,
    productName: string,
    category: string,
    formulaId: string,
    barcode: string,
    audience: RatingRecord['audience'],
    minAge: number,
    actives: RatingRecord['activeIngredients'],
    inactiveIngredients: IngredientFlag[],
    source: string,
  ): RatingRecord =>
    row('Good Day Chocolate', {
      id,
      productName,
      category,
      formulaId,
      form: 'chocolate',
      barcode,
      audience,
      minAge,
      activeIngredients: actives,
      inactiveIngredients,
      verdict: 'clean',
      sourcesGeneral: [source],
    });
  const imm = [{ name: 'Proprietary Immunity Blend', strength: '500 mg' }];
  const foc = [{ name: 'Proprietary Focus Blend', strength: '200 mg' }];
  const energy = [
    { name: 'Thiamin (as thiamine mononitrate)', strength: '150 mcg' },
    { name: 'Riboflavin', strength: '170 mcg' },
    { name: 'Niacin (as niacinamide)', strength: '2 mg' },
    { name: 'Vitamin B6 (as pyridoxine hydrochloride)', strength: '5 mg' },
    { name: 'Folate (as folic acid)', strength: '68 mcg' },
    { name: 'Vitamin B12 (as cyanocobalamin)', strength: '15 mcg' },
    { name: 'Biotin', strength: '30 mcg' },
    { name: 'Pantothenic Acid (as calcium-d-pantothenate)', strength: '1 mg' },
    { name: 'Iron', strength: '1 mg' },
    { name: 'Proprietary Energy Blend', strength: '262 mg' },
  ];
  const calmA = [
    { name: 'Magnesium (as magnesium oxide)', strength: '40 mg' },
    { name: 'Proprietary Calm Blend', strength: '60 mg' },
  ];
  const mind = [{ name: 'Phosphatidylserine', strength: '400 mg' }];
  const sleep = [
    { name: 'Proprietary Sleep Blend', strength: '7 mg' },
    { name: 'Melatonin', strength: '2 mg' },
  ];
  const kidsMulti = [
    { name: 'Vitamin A (as retinyl palmitate)', strength: '225 mcg' },
    { name: 'Vitamin C (as ascorbic acid)', strength: '11 mg' },
    { name: 'Vitamin D3 (as cholecalciferol)', strength: '20 mcg' },
    { name: 'Vitamin E (as dl-alpha-tocopheryl acetate)', strength: '9 mg' },
    { name: 'Thiamin (as thiamine mononitrate)', strength: '0.3 mg' },
    { name: 'Riboflavin', strength: '0.2 mg' },
    { name: 'Vitamin B6 (as pyridoxine hydrochloride)', strength: '0.3 mg' },
    { name: 'Folate (as L-methylfolate calcium)', strength: '400 mcg DFE' },
    { name: 'Vitamin B12 (as methylcobalamin)', strength: '4.8 mcg' },
    { name: 'Biotin', strength: '18 mcg' },
    { name: 'Pantothenic Acid (as calcium d-pantothenate)', strength: '1.3 mg' },
    { name: 'Choline (as choline bitartrate)', strength: '5 mg' },
    { name: 'Zinc (as zinc gluconate)', strength: '0.5 mg' },
  ];
  const calmK = [
    { name: 'Magnesium (as magnesium oxide)', strength: '20 mg' },
    { name: 'Proprietary Calm Blend', strength: '30 mg' },
  ];
  const sleepK = [
    { name: 'Proprietary Sleep Blend', strength: '3.5 mg' },
    { name: 'Melatonin', strength: '1 mg' },
  ];
  return [
    pack(
      'goodday-b282-immunity-8',
      'Good Day Chocolate Adult Immunity (8 pieces)',
      'Immune Support',
      'goodday-b282-immunity',
      '',
      ADULT,
      18,
      imm,
      dark(PDARK, 'Caramel Color'),
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-immunity-8ct is in stock at $3.95. Serving 4 pieces. The 8-piece pack is 2 servings. The 80-piece page prints the 500 mg blend and the same other-ingredient line. Counted Limited tokens: none. No honest note. Missing UPC. The master case of 72 is a wholesale case and is not this row.',
    ),
    pack(
      'goodday-b282-immunity-80',
      'Good Day Chocolate Adult Immunity (80 pieces)',
      'Immune Support',
      'goodday-b282-immunity',
      '850038267131',
      ADULT,
      18,
      imm,
      dark(PDARK, 'Caramel Color'),
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-immunity-by-good-day-chocolate lists 80 pieces at $27.95 and in stock. Serving 4 pieces (14 g). Servings per container 20. Counted Limited tokens: none. No honest note. UPC 850038267131.',
    ),
    pack(
      'goodday-b282-focus-8',
      'Good Day Chocolate Adult Focus (8 pieces)',
      'Herbs',
      'goodday-b282-focus',
      '',
      ADULT,
      18,
      foc,
      [...dark(PDARK, 'Turmeric'), cleared(PDARK, 'Vegetable Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-focus-8ct is in stock at $3.95. Serving 2 pieces. The 8-piece pack is 4 servings. The color line names turmeric and vegetable juice color. Counted Limited tokens: none. No honest note. Missing UPC. The master case of 72 is a wholesale case and is not this row.',
    ),
    pack(
      'goodday-b282-focus-80',
      'Good Day Chocolate Adult Focus (80 pieces)',
      'Herbs',
      'goodday-b282-focus',
      '850038267155',
      ADULT,
      18,
      foc,
      [...dark(PDARK, 'Turmeric'), cleared(PDARK, 'Vegetable Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-focus-by-good-day-chocolate lists 80 pieces at $27.95 and in stock. Serving 2 pieces (7 g). Servings per container 40. Counted Limited tokens: none. No honest note. UPC 850038267155.',
    ),
    pack(
      'goodday-b282-energy-8',
      'Good Day Chocolate Adult Energy (8 pieces)',
      'Vitamins',
      'goodday-b282-energy',
      '858982004000',
      ADULT,
      18,
      energy,
      dark(PDARK, 'Annatto (color)'),
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-energy-chocolate-supplement-by-good-day-chocolate lists the 8-piece pack at $3.95 and in stock. Serving 2 pieces (7 g). Servings per container 4. The page says 20 mg caffeine per piece. Counted Limited tokens: none. No honest note. UPC 858982004000. The 50-piece 2-pack is a multipack and is not this row.',
    ),
    pack(
      'goodday-b282-energy-50',
      'Good Day Chocolate Adult Energy (50 pieces)',
      'Vitamins',
      'goodday-b282-energy',
      '858982004598',
      ADULT,
      18,
      energy,
      dark(PDARK, 'Annatto (color)'),
      't49u. Good Day Chocolate brand page is the single source. The 50-piece pack on the energy page is in stock at $19.95. Serving 2 pieces. The page says the panel is the same and only the servings per container change. 50 pieces at 2 per serving is 25 servings. Counted Limited tokens: none. No honest note. UPC 858982004598.',
    ),
    pack(
      'goodday-b282-calm-8',
      'Good Day Chocolate Adult Calm (8 pieces)',
      'Sleep',
      'goodday-b282-calm',
      '858982004017',
      ADULT,
      18,
      calmA,
      [...milk(PMILK, 'Fruit Juice'), cleared(PMILK, 'Purple Sweet Potato Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-calm-chocolate-supplement-by-good-day-chocolate lists the 8-piece pack at $3.95 and in stock. Serving 4 pieces (14 g). Servings per container 2. Counted Limited tokens: none. No honest note. UPC 858982004017. The 50-piece pack is not this row. 50 does not divide by 4, and that variant was not the serving line on screen.',
    ),
    pack(
      'goodday-b282-calm-80',
      'Good Day Chocolate Adult Calm (80 pieces)',
      'Sleep',
      'goodday-b282-calm',
      '858982004116',
      ADULT,
      18,
      calmA,
      [...milk(PMILK, 'Fruit Juice'), cleared(PMILK, 'Purple Sweet Potato Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. The 80-piece calm pack is in stock at $24.95. Serving 4 pieces. 80 pieces at 4 per serving is 20 servings. The page says only the servings per container change. Counted Limited tokens: none. No honest note. UPC 858982004116.',
    ),
    pack(
      'goodday-b282-mind-80',
      'Good Day Chocolate Adult Mind Fuel (80 pieces)',
      'Herbs',
      'goodday-b282-mind',
      '850038267148',
      ADULT,
      18,
      mind,
      dark(PDARK, 'Red Cabbage'),
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-mind-fuel-by-good-day-chocolate lists 80 pieces at $27.95 and in stock. Serving 4 pieces (14 g). Servings per container 20. Counted Limited tokens: none. No honest note. UPC 850038267148.',
    ),
    pack(
      'goodday-b282-sleep-1mg-8',
      'Good Day Chocolate Adult Sleep Milk Chocolate 1 mg (8 pieces)',
      'Sleep',
      'goodday-b282-sleep-1mg',
      '858982004048',
      ADULT,
      18,
      sleep,
      milk(PMILK, 'Spirulina Extract'),
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/adult-sleep-with-melatonin had Milk Chocolate 1 mg 8 pieces selected. It is in stock at $3.95. Serving 2 pieces (7 g). Servings per container 4. Melatonin is 2 mg per serving, 1 mg per piece. Counted Limited tokens: none. No honest note. UPC 858982004048. The 3 mg, 5 mg, and dark-chocolate variants were not the panel on screen.',
    ),
    pack(
      'goodday-b282-sleep-1mg-50',
      'Good Day Chocolate Adult Sleep Milk Chocolate 1 mg (50 pieces)',
      'Sleep',
      'goodday-b282-sleep-1mg',
      '858982004543',
      ADULT,
      18,
      sleep,
      milk(PMILK, 'Spirulina Extract'),
      't49u. Good Day Chocolate brand page is the single source. Milk Chocolate 1 mg 50 pieces is in stock at $19.95. Serving 2 pieces. The page says the panel is the same for a strength and only the servings per container change. 50 pieces at 2 per serving is 25 servings. Counted Limited tokens: none. No honest note. UPC 858982004543. The 2-pack is a multipack and is not this row.',
    ),
    pack(
      'goodday-b282-sleep-1mg-80',
      'Good Day Chocolate Adult Sleep Milk Chocolate 1 mg (80 pieces)',
      'Sleep',
      'goodday-b282-sleep-1mg',
      '858982004437',
      ADULT,
      18,
      sleep,
      milk(PMILK, 'Spirulina Extract'),
      't49u. Good Day Chocolate brand page is the single source. Milk Chocolate 1 mg 80 pieces is in stock at $24.95. Serving 2 pieces. 80 pieces at 2 per serving is 40 servings. Counted Limited tokens: none. No honest note. UPC 858982004437.',
    ),
    pack(
      'goodday-b282-kids-multi-8',
      'Good Day Chocolate Kids Multivitamin (8 pieces)',
      'Vitamins',
      'goodday-b282-kids-multi',
      '',
      'kids',
      3,
      kidsMulti,
      [...milk(PMILK, 'Turmeric'), cleared(PMILK, 'Vegetable Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/kids-multivitamin-8ct is in stock at $3.95. Ages 3 and older. Serving 2 pieces. The 8-piece pack is 4 servings. The 50-piece page prints the vitamin amounts and the same other-ingredient line. Counted Limited tokens: none. No honest note. Missing UPC. The master case of 72 is a wholesale case and is not this row.',
    ),
    pack(
      'goodday-b282-kids-multi-50',
      'Good Day Chocolate Kids Multivitamin (50 pieces)',
      'Vitamins',
      'goodday-b282-kids-multi',
      '858982004307',
      'kids',
      3,
      kidsMulti,
      [...milk(PMILK, 'Turmeric'), cleared(PMILK, 'Vegetable Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/kids-multivitamin-chocolate-supplement-by-good-day-chocolate lists 50 pieces at $19.95 and in stock. Ages 3 and older. Serving 2 pieces (7 g). Servings per container 25. Counted Limited tokens: none. No honest note. UPC 858982004307.',
    ),
    pack(
      'goodday-b282-kids-multi-80',
      'Good Day Chocolate Kids Multivitamin (80 pieces)',
      'Vitamins',
      'goodday-b282-kids-multi',
      '858982004963',
      'kids',
      3,
      kidsMulti,
      [...milk(PMILK, 'Turmeric'), cleared(PMILK, 'Vegetable Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. The 80-piece kids multivitamin is in stock at $24.95. Serving 2 pieces. Servings per container 40. Counted Limited tokens: none. No honest note. UPC 858982004963.',
    ),
    pack(
      'goodday-b282-kids-calm-8',
      'Good Day Chocolate Kids Calm (8 pieces)',
      'Sleep',
      'goodday-b282-kids-calm',
      '',
      'kids',
      3,
      calmK,
      [...milk(PMILK, 'Fruit Juice'), cleared(PMILK, 'Purple Sweet Potato Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/kids-calm-8ct is in stock at $3.95. Ages 3 and older. Serving 2 pieces. The 8-piece pack is 4 servings. The 50-piece page prints the 20 mg magnesium and the same other-ingredient line. Counted Limited tokens: none. No honest note. Missing UPC.',
    ),
    pack(
      'goodday-b282-kids-calm-50',
      'Good Day Chocolate Kids Calm (50 pieces)',
      'Sleep',
      'goodday-b282-kids-calm',
      '858982004321',
      'kids',
      3,
      calmK,
      [...milk(PMILK, 'Fruit Juice'), cleared(PMILK, 'Purple Sweet Potato Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/kids-calm lists 50 pieces at $19.95 and in stock. Ages 3 and older. Serving 2 pieces (7 g). Servings per container 25. Counted Limited tokens: none. No honest note. UPC 858982004321.',
    ),
    pack(
      'goodday-b282-kids-calm-80',
      'Good Day Chocolate Kids Calm (80 pieces)',
      'Sleep',
      'goodday-b282-kids-calm',
      '858982004956',
      'kids',
      3,
      calmK,
      [...milk(PMILK, 'Fruit Juice'), cleared(PMILK, 'Purple Sweet Potato Juice Color')],
      't49u. Good Day Chocolate brand page is the single source. The 80-piece kids calm pack is in stock at $24.95. Serving 2 pieces. 80 pieces at 2 per serving is 40 servings. Counted Limited tokens: none. No honest note. UPC 858982004956.',
    ),
    pack(
      'goodday-b282-kids-sleep-50',
      'Good Day Chocolate Kids Sleep 1 mg (50 pieces)',
      'Sleep',
      'goodday-b282-kids-sleep',
      '858982004314',
      'kids',
      3,
      sleepK,
      milk(PMILK, 'Spirulina Extract'),
      't49u. Good Day Chocolate brand page is the single source. https://shop.gooddaychocolate.com/products/kids-sleep-with-melatonin had 1 mg 50 pieces selected. It is in stock at $19.95. Ages 3 and older. Serving 1 piece (3.5 g). Servings per container 50. Melatonin is 1 mg. Counted Limited tokens: none. No honest note. UPC 858982004314. The 2-pack is a multipack and is not this row.',
    ),
    pack(
      'goodday-b282-kids-sleep-80',
      'Good Day Chocolate Kids Sleep 1 mg (80 pieces)',
      'Sleep',
      'goodday-b282-kids-sleep',
      '858982004949',
      'kids',
      3,
      sleepK,
      milk(PMILK, 'Spirulina Extract'),
      't49u. Good Day Chocolate brand page is the single source. Kids Sleep 1 mg 80 pieces is in stock at $24.95. Serving 1 piece. The page says only the servings per container change. 80 pieces at 1 per serving is 80 servings. Counted Limited tokens: none. No honest note. UPC 858982004949.',
    ),
  ];
}

const HERB = [{ name: 'Herbal blend', strength: 'milligram amounts not printed' }];

export const BATCH282_KYR6D_T49U: RatingRecord[] = [
  row('Quantum Health', {
    id: 'quantum-b282-lysine-500-100',
    productName: 'Quantum Health L-Lysine 500 mg (100 tablets)',
    category: 'Immune Support',
    formulaId: 'quantum-b282-lysine-500-100',
    form: 'tablet',
    barcode: '046985001304',
    activeIngredients: [{ name: 'L-Lysine (as L-Lysine HCl)', strength: '500 mg' }],
    inactiveIngredients: [
      flag(PLYS, 'Dicalcium Phosphate', 'cleared', 'dical'),
      flag(PLYS, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PLYS, 'Stearic Acid', 'cleared', 'stearic'),
      flag(PLYS, 'Croscarmellose Sodium', 'cleared', 'croscarm'),
      flag(PLYS, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PLYS, 'Silicon Dioxide', 'limited', 'silica'),
      flag(PLYS, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/l-lysine-500-mg is in stock at $11.19. The bottle image on that page reads 100 tablets. Serving 1 tablet. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. UPC 046985001304 is printed on the bottle image as 0 46985 00130 4.',
    ],
  }),
  row('Quantum Health', {
    id: 'quantum-b282-superlysine-liquid-2',
    productName: 'Quantum Health Super Lysine+ Liquid (2 oz)',
    category: 'Immune Support',
    formulaId: 'quantum-b282-superlysine-liquid-2',
    form: 'liquid',
    activeIngredients: [{ name: 'Lysine', strength: 'amount not printed' }],
    inactiveIngredients: [
      flag(PSLIQ, 'Alcohol', 'limited', 'alcohol'),
      flag(PSLIQ, 'Water', 'cleared', 'water'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Quantum Health brand page is the single source. https://quantumhealth.com/products/superlysine-liquid-extract is in stock. Net weight 2 oz. Serving 1 dropper (0.7 mL), about 80 servings. Counted Limited token: alcohol. That is one, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b282-resveratrol-30',
    productName: 'Hyalogic Resveratrol Plus (30 capsules)',
    category: 'Vitamins',
    formulaId: 'hyalogic-b282-resveratrol-30',
    form: 'capsule',
    barcode: '856682008137',
    activeIngredients: [{ name: 'Resveratrol', strength: 'amount not printed' }],
    inactiveIngredients: [
      flag(PRES, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PRES, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PRES, 'Vegetable Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PRES, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Hyalogic brand page is the single source. https://hyalogic.com/products/resveratrol-plus is in stock at $14.95. Serving 1 capsule. Servings per container 30. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. UPC 856682008137.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b282-ha-lozenge-60',
    productName: 'Hyalogic HA Chewable Lozenge (60 lozenges)',
    category: 'Vitamins',
    formulaId: 'hyalogic-b282-ha-lozenge-60',
    form: 'lozenge',
    barcode: '858259000650',
    activeIngredients: [{ name: 'Hyaluronic Acid', strength: 'amount not printed' }],
    inactiveIngredients: [
      flag(PLOZ, 'Isomalt', 'moderate', 'isomalt'),
      flag(PLOZ, 'Xylitol', 'moderate', 'xylitol'),
      flag(PLOZ, 'Beet Powder (for color)', 'cleared', 'beet'),
      flag(PLOZ, 'Natural Berry Flavor', 'cleared', 'berry'),
      flag(PLOZ, 'Citric Acid', 'moderate', 'citric'),
      flag(PLOZ, 'Stearic Acid', 'cleared', 'stearic'),
      flag(PLOZ, 'Stevia Extract', 'limited', 'stevia'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Hyalogic brand page is the single source. https://hyalogic.com/products/ha-chewable-lozenge is in stock at $39.95. Serving 1 chewable lozenge. 60 count. Counted Limited token: stevia extract. Isomalt, xylitol, and citric acid are Caution and do not stack. That is one Limited token, so this is not a 3+ stack. No honest note. UPC 858259000650.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-adrenalove-60',
    productName: 'RidgeCrest Herbals AdrenaLove (60 capsules)',
    category: 'Herbs',
    formulaId: 'ridgecrest-b282-adrenalove-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724003104',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PADR, 'Vegetable Cellulose (Capsule)', 'cleared', 'cellulose'),
      flag(PADR, 'Maltodextrin (from non-GMO corn)', 'limited', 'maltodextrin'),
      flag(PADR, 'Rice Bran Extract', 'cleared', 'riceBran'),
      flag(PADR, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/adrenalove lists 60 capsules, 30 servings, at $32.99 and in stock. Take 2 capsules daily. Counted Limited token: maltodextrin. Silica does not stack. UPC 355724003104.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-clearlungs-immune-60',
    productName: 'RidgeCrest Herbals ClearLungs Immune (60 capsules)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b282-clearlungs-immune-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724001391',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PIMM, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PIMM, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PIMM, 'Rice Bran Extract', 'cleared', 'riceBran'),
      flag(PIMM, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/clearlungs-immune lists 60 capsules, 30 servings, at $29.99 and in stock. Take 2 capsules daily. Silica is the 0-pt cap. Counted Limited tokens: none. UPC 355724001391.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-clearlungs-liquid-2',
    productName: 'RidgeCrest Herbals ClearLungs Liquid (2 oz)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b282-clearlungs-liquid-2',
    form: 'liquid',
    minAge: 12,
    barcode: '355724005535',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PLIQ, 'Purified Water', 'cleared', 'water'),
      flag(PLIQ, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(PLIQ, 'Citric Acid', 'moderate', 'citric'),
      flag(PLIQ, 'Sodium Benzoate', 'moderate', 'benzoate'),
      flag(PLIQ, 'Natural Flavor (Orange)', 'cleared', 'orangeFlavor'),
      flag(PLIQ, 'Potassium Sorbate', 'moderate', 'sorbate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/clearlungs-liquid lists 2 oz (59 mL) at $24.99 and in stock. Directions say take 1/2 mL. Citric acid, sodium benzoate, and potassium sorbate are Caution and do not stack. Counted Limited tokens: none. No honest note. UPC 355724005535.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-clearlungs-sport-60',
    productName: 'RidgeCrest Herbals ClearLungs Sport (60 capsules)',
    category: 'Cold & Flu',
    formulaId: 'ridgecrest-b282-clearlungs-sport-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724001384',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PSPORT, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PSPORT, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PSPORT, 'Rice Bran Extract', 'cleared', 'riceBran'),
      flag(PSPORT, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/clearlungs-sport lists 60 capsules, 30 servings, at $34.99 and in stock. Take 2 capsules before training or daily. Silica is the 0-pt cap. Counted Limited tokens: none. UPC 355724001384.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-essentialeyes-120',
    productName: 'RidgeCrest Herbals EssentialEyes (120 capsules)',
    category: 'Eye & Ear',
    formulaId: 'ridgecrest-b282-essentialeyes-120',
    form: 'capsule',
    minAge: 12,
    barcode: '355724001971',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PEYE, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PEYE, 'Organic Rice Bran Extract', 'cleared', 'riceBran'),
      flag(PEYE, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/essentialeyes lists 120 capsules, 60 servings, at $49.99 and in stock. Take 2 capsules. Silica is the 0-pt cap. Counted Limited tokens: none. UPC 355724001971.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-gladder-60',
    productName: 'RidgeCrest Herbals Gladder Bladder (60 capsules)',
    category: 'Herbs',
    formulaId: 'ridgecrest-b282-gladder-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724003265',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PGLAD, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PGLAD, 'Tapioca Starch', 'cleared', 'starch'),
      flag(PGLAD, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PGLAD, 'Silica', 'limited', 'silica'),
      flag(PGLAD, 'Maltodextrin (non-GMO)', 'limited', 'maltodextrin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/gladder-bladder lists 60 capsules, 20 servings, at $34.99 and in stock. Directions say 3 capsules twice daily. Counted Limited token: maltodextrin. Silica does not stack. No honest note. UPC 355724003265.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-physiqol-60',
    productName: 'RidgeCrest Herbals Physiqol (60 capsules)',
    category: 'Herbs',
    formulaId: 'ridgecrest-b282-physiqol-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724005665',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PPHY, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PPHY, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PPHY, 'Rice Bran Extract', 'cleared', 'riceBran'),
      flag(PPHY, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/physiqol lists 60 capsules, 30 servings, at $39.99 and in stock. Take 2 capsules daily. Silica is the 0-pt cap. Counted Limited tokens: none. UPC 355724005665.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-serenizen-60',
    productName: 'RidgeCrest Herbals SereniZen (60 capsules)',
    category: 'Sleep',
    formulaId: 'ridgecrest-b282-serenizen-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724003203',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PSER, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PSER, 'Maltodextrin (from non-GMO corn)', 'limited', 'maltodextrin'),
      flag(PSER, 'Rice Bran Extract', 'cleared', 'riceBran'),
      flag(PSER, 'Silica', 'limited', 'silica'),
      flag(PSER, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/serenizen lists 60 capsules, 30 servings, at $32.99 and in stock. Take 2 capsules daily. Counted Limited token: maltodextrin. Silica does not stack. UPC 355724003203.',
    ],
  }),
  row('RidgeCrest Herbals', {
    id: 'ridgecrest-b282-thyronourish-60',
    productName: 'RidgeCrest Herbals ThyroNourish (60 capsules)',
    category: 'Herbs',
    formulaId: 'ridgecrest-b282-thyronourish-60',
    form: 'capsule',
    minAge: 12,
    barcode: '355724001919',
    activeIngredients: HERB,
    inactiveIngredients: [
      flag(PTHY, 'Vegetable Capsule', 'cleared', 'vegCap'),
      flag(PTHY, 'Maltodextrin (non-GMO)', 'limited', 'maltodextrin'),
      flag(PTHY, 'Dicalcium Phosphate', 'cleared', 'dical'),
      flag(PTHY, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PTHY, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. RidgeCrest Herbals brand page is the single source. https://rcherbals.com/products/thyronourish lists 60 capsules, 20 servings, at $34.99 and in stock. Take 3 capsules in the morning. Counted Limited token: maltodextrin. Silica does not stack. No honest note. UPC 355724001919.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b282-chill-60',
    productName: 'Lemme Chill Gummies (60 gummies)',
    category: 'Sleep',
    formulaId: 'lemme-b282-chill-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Chill blend', strength: 'amount not printed' }],
    inactiveIngredients: [
      flag(PCHILL, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(PCHILL, 'Organic Cane Sugar', 'cleared', 'cane'),
      flag(PCHILL, 'Water', 'cleared', 'water'),
      flag(PCHILL, 'Citric Acid', 'moderate', 'citric'),
      flag(PCHILL, 'Coconut Oil', 'cleared', 'coconut'),
      flag(PCHILL, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(PCHILL, 'Fruit and Vegetable Juice (Color)', 'cleared', 'juiceColor'),
      flag(PCHILL, 'Natural Flavor', 'moderate', 'flavor'),
      flag(PCHILL, 'Pectin', 'cleared', 'pectin'),
      flag(PCHILL, 'Sodium Citrate', 'moderate', 'citrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/chill lists the 1-pack at $30 and in stock. Serving 2 gummies. Servings per container 30. Counted Limited tokens: none. Natural flavor is the singular Caution token and does not stack. No honest note. Three barcodes were on the page and were not tied to the 1-pack, so the barcode is empty. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b282-debloat-60',
    productName: 'Lemme Debloat Capsules (60 capsules)',
    category: 'Digestive',
    formulaId: 'lemme-b282-debloat-60',
    form: 'capsule',
    activeIngredients: [{ name: 'Debloat blend', strength: 'amount not printed' }],
    inactiveIngredients: [
      flag(PDEB, 'Bamboo Leaf Extract (Silica)', 'moderate', 'bamboo'),
      flag(PDEB, 'Hypromellose Capsule', 'cleared', 'hpmc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-debloat-capsules lists the 1-pack at $30 and in stock. Serving 2 capsules. Servings per container 30. Bamboo leaf extract is Caution and does not stack. Counted Limited tokens: none. No honest note. Two barcodes were on the page and were not tied to the 1-pack, so the barcode is empty. No code was invented. The 3-pack and the 6-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', {
    id: 'lemme-b282-grow-60',
    productName: 'Lemme Grow Capsules (60 capsules)',
    category: 'Vitamins',
    formulaId: 'lemme-b282-grow-60',
    form: 'capsule',
    activeIngredients: [{ name: 'Grow blend', strength: 'amount not printed' }],
    inactiveIngredients: [
      flag(PGROW, 'Hypromellose Capsule', 'cleared', 'hpmc'),
      flag(PGROW, 'MCT Oil', 'cleared', 'mctOil'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't49u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-grow-capsules lists the 1-pack at $50 and in stock. Serving 2 capsules. Servings per container 30. MCT Oil is the exact Cleared token, not goMCT® and not unlabeled MCT. Counted Limited tokens: none. No honest note. Three barcodes were on the page and were not tied to the 1-pack, so the barcode is empty. No code was invented. The multipacks are not this row.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b282-hylavision-120',
    productName: 'Hyalogic HylaVision (120 capsules)',
    category: 'Eye & Ear',
    formulaId: 'hyalogic-b282-hylavision-120',
    form: 'capsule',
    barcode: '858259000254',
    activeIngredients: [
      { name: 'Vitamin A (as beta carotene)', strength: '6600 IU' },
      { name: 'Vitamin C (as ascorbic acid)', strength: '400 mg' },
      { name: 'Vitamin E (as D-alpha tocopherol)', strength: '150 IU' },
      { name: 'Zinc (as zinc oxide)', strength: '30 mg' },
      { name: 'Riboflavin', strength: '10 mg' },
      { name: 'Manganese (as manganese acid chelate)', strength: '10 mg' },
      { name: 'Copper (as copper gluconate)', strength: '2 mg' },
      { name: 'Selenium (as selenium amino acid chelate)', strength: '40 mcg' },
      { name: 'Bilberry Extract 4:1 (fruit)', strength: '40 mg' },
      { name: 'Hyaluronic Acid', strength: '5 mg' },
      { name: 'Lutein/Zeaxanthin Complex (marigold)', strength: '4 mg' },
    ],
    inactiveIngredients: [
      flag(PVIS, 'Vegetable Cellulose', 'cleared', 'cellulose'),
      flag(PVIS, 'Vegetable Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PVIS, 'Tricalcium Phosphate', 'cleared', 'trical'),
      flag(PVIS, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Hyalogic brand page is the single source. https://hyalogic.com/products/hylavision is in stock at $24.95. Serving 2 capsules. Servings per container 60. 2 times 60 is 120 capsules. An earlier read cut 60 down to 6. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. UPC 858259000254.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b282-joint-liquid',
    productName: 'Hyalogic Advanced Liquid Formula for Joint Support',
    category: 'Vitamins',
    formulaId: 'hyalogic-b282-joint-liquid',
    form: 'liquid',
    barcode: '856682008458',
    activeIngredients: [
      { name: 'Hyaluronic Acid', strength: '100 mg' },
      { name: 'MSM (Methyl Sulfonyl Methane)', strength: '100 mg' },
    ],
    inactiveIngredients: [
      flag(PLIQHA, 'Purified Water', 'cleared', 'water'),
      flag(PLIQHA, 'Sodium Citrate', 'moderate', 'citrate'),
      flag(PLIQHA, 'Potassium Sorbate', 'moderate', 'sorbate'),
      flag(PLIQHA, 'Vegetable Glycerin', 'cleared', 'glycerin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Hyalogic brand page is the single source. https://hyalogic.com/products/hyaluronic-acid-advanced-liquid-formula-for-joint-support is in stock at $39.95. Serving 2 teaspoons (10 mL). About 36 servings. Sodium citrate and potassium sorbate are Caution and do not stack. Counted Limited tokens: none. No honest note. UPC 856682008458.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b282-hsn-liquid',
    productName: 'Hyalogic Hyaluronic Acid Advanced Liquid for Hair, Skin and Nails',
    category: 'Vitamins',
    formulaId: 'hyalogic-b282-hsn-liquid',
    form: 'liquid',
    barcode: '856682008601',
    activeIngredients: [
      { name: 'Hyaluronic Acid', strength: '50 mg' },
      { name: 'Biotin', strength: '5,000 mcg' },
      { name: 'MSM (Methyl Sulfonyl Methane)', strength: '50 mg' },
    ],
    inactiveIngredients: [
      flag(PLIQHSN, 'Purified Water', 'cleared', 'water'),
      flag(PLIQHSN, 'Sodium Citrate', 'moderate', 'citrate'),
      flag(PLIQHSN, 'Potassium Sorbate', 'moderate', 'sorbate'),
      flag(PLIQHSN, 'Vegetable Glycerin', 'cleared', 'glycerin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Hyalogic brand page is the single source. https://hyalogic.com/products/hyaluronic-acid-advanced-liquid-formula-for-hair-skin-nails is in stock at $34.95. Serving 2 teaspoons (10 mL). About 36 servings. Same other-ingredient line as the joint liquid. The actives differ. Counted Limited tokens: none. No honest note. UPC 856682008601.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b282-skin-liquid',
    productName: 'Hyalogic Advanced Formula for Skin and Beauty',
    category: 'Vitamins',
    formulaId: 'hyalogic-b282-skin-liquid',
    form: 'liquid',
    barcode: '856682008519',
    activeIngredients: [
      { name: 'MSM (Methyl Sulfonyl Methane)', strength: '100 mg' },
      { name: 'Hyaluronic Acid', strength: '100 mg' },
    ],
    inactiveIngredients: [
      flag(PLIQSKIN, 'Purified Water', 'cleared', 'water'),
      flag(PLIQSKIN, 'Sodium Citrate', 'moderate', 'citrate'),
      flag(PLIQSKIN, 'Potassium Sorbate', 'moderate', 'sorbate'),
      flag(PLIQSKIN, 'Vegetable Glycerin', 'cleared', 'glycerin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't49u. Hyalogic brand page is the single source. https://hyalogic.com/products/advanced-formula-for-skin-beauty is in stock at $39.95. Serving 2 teaspoons (10 mL). About 36 servings. Same other-ingredient line as the joint liquid. The actives match the joint liquid amounts and the product name differs. Counted Limited tokens: none. No honest note. UPC 856682008519.',
    ],
  }),
  ...goodDayRows(),
];

const ROWS = BATCH282_KYR6D_T49U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string }> = {
  'quantum-b282-lysine-500-100': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'quantum-b282-superlysine-liquid-2': { verdict: 'caution', cause: 'limited_1_2', counted: 'Alcohol' },
  'hyalogic-b282-resveratrol-30': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'hyalogic-b282-ha-lozenge-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Stevia Extract' },
  'ridgecrest-b282-adrenalove-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Maltodextrin (from non-GMO corn)' },
  'ridgecrest-b282-clearlungs-immune-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b282-clearlungs-liquid-2': { verdict: 'caution', cause: 'moderate', counted: '' },
  'ridgecrest-b282-clearlungs-sport-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b282-essentialeyes-120': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b282-gladder-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Maltodextrin (non-GMO)' },
  'ridgecrest-b282-physiqol-60': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'ridgecrest-b282-serenizen-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Maltodextrin (from non-GMO corn)' },
  'ridgecrest-b282-thyronourish-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Maltodextrin (non-GMO)' },
  'lemme-b282-chill-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b282-debloat-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b282-grow-60': { verdict: 'clean', cause: 'clean', counted: '' },
  'hyalogic-b282-hylavision-120': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'hyalogic-b282-joint-liquid': { verdict: 'caution', cause: 'moderate', counted: '' },
  'hyalogic-b282-hsn-liquid': { verdict: 'caution', cause: 'moderate', counted: '' },
  'hyalogic-b282-skin-liquid': { verdict: 'caution', cause: 'moderate', counted: '' },
  'goodday-b282-immunity-8': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-immunity-80': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-focus-8': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-focus-80': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-energy-8': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-energy-50': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-calm-8': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-calm-80': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-mind-80': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-sleep-1mg-8': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-sleep-1mg-50': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-sleep-1mg-80': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-multi-8': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-multi-50': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-multi-80': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-calm-8': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-calm-50': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-calm-80': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-sleep-50': { verdict: 'clean', cause: 'clean', counted: '' },
  'goodday-b282-kids-sleep-80': { verdict: 'clean', cause: 'clean', counted: '' },
};

const NOTE_IDS = new Set([
  'ridgecrest-b282-adrenalove-60',
  'ridgecrest-b282-clearlungs-immune-60',
  'ridgecrest-b282-clearlungs-sport-60',
  'ridgecrest-b282-essentialeyes-120',
  'ridgecrest-b282-physiqol-60',
  'ridgecrest-b282-serenizen-60',
]);

if (ROWS.length !== 40) throw new Error(`batch282 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch282 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch282 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch282 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch282 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch282 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch282 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch282 pending ${ingredient.name}`);
    }
  }
}
