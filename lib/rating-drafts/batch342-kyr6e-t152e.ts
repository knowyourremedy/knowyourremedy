// DRAFT / not verified / batch 342 KYR6-e (t152e).
// Neuro 90-count Energy & Focus gums, then Nature's Answer singles whose
// other-ingredient lines are already covered. No new locks. The Sprouts
// section is not edited.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const POLYOL = 'Methodology §5 Caution (named sugar alcohol). Does not count toward the t137u stack.';
const GUM = 'Methodology §5 Limited (gum base). The label does not name each part. Counts toward the t137u stack.';
const FLAVORS = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavors is the exact t54u name. Counts toward the t137u stack.';
const FLAVOR = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Flavor is the exact t54u name. Counts toward the t137u stack.';
const RASP = 'Methodology §5 Limited (t54u natural-flavor rule). Natural Raspberry Flavor is the exact t54u name. Counts toward the t137u stack.';
const ORGFLAV = 'Methodology §5 Limited (organic flavors). Counts toward the t137u stack.';
const STEARATE = 'Methodology §5 Cleared (calcium stearate).';
const JUICE = 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder).';
const SUCRALOSE = 'Methodology §5 Limited (sucralose). Counts toward the t137u stack.';
const MONK = 'Methodology §5 Cleared (monk fruit).';
const STEVIOL = 'Methodology §5 Limited (steviol glycosides — t16u). Printed without high-purity. Counts toward the t137u stack.';
const ACACIA = 'Methodology §5 Cleared (gum acacia / acacia gum).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const SPIR = 'Methodology §5 Cleared (t70u named spirulina color). Does not count toward the t137u stack.';
const GLYC = 'Methodology §5 Cleared (glycerin / vegetable glycerin).';
const WATER = 'Methodology §5 Cleared (water / purified water).';
const ALC = 'Methodology §5 Cleared (12-15% Certified Organic Alcohol — t130e). Does not count toward the t137u stack.';
const ETH = 'Methodology §5 Caution (ethanol vehicle). Does not count toward the t137u stack.';
const SUGAR = 'Methodology §5 Cleared (Non-GMO Sugar — t130e). Does not count toward the t137u stack.';
const SYRUP = 'Methodology §5 Caution (corn syrup). Does not count toward the t137u stack.';
const SUCROSE = 'Methodology §5 Cleared (sucrose — t118u).';
const PECTIN = 'Methodology §5 Cleared (pectin).';
const FIBER = 'Methodology §5 Cleared (soluble corn fiber).';
const STARCH = 'Methodology §5 Cleared (corn starch).';
const INULIN = 'Methodology §5 Cleared (inulin).';
const ALLU = 'Methodology §5 Cleared (allulose).';
const LACTIC = 'Methodology §5 Cleared (lactic acid).';
const MALIC = 'Methodology §5 Cleared (malic acid).';
const SORB = 'Methodology §5 Caution (potassium sorbate — t98u). Does not count toward the t137u stack.';
const BERRY = 'Methodology §5 Caution (Natural Mixed Berry Flavor — t98u). Does not count toward the t137u stack.';
const QUIK = 'Methodology §5 Caution (named plant-part blend). Does not count toward the t137u stack.';
const FLOUR = 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.';
const CELL = 'Methodology §5 Cleared (vegetable cellulose capsule).';
const SILICATE = 'Methodology §5 Caution (calcium silicate). Does not count toward the t137u stack.';

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
  brand: string;
  category: string;
  form: string;
  audience: 'adult' | 'kids';
  minAge: number;
  barcode?: string;
  ings: Ing[];
  actives: ActiveIngredient[];
  source: string;
  panel: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: args.brand,
    category: args.category,
    formulaId: args.id,
    form: args.form,
    audience: args.audience,
    minAge: args.minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: [args.brand],
    barcode: args.barcode ?? '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `${args.panel} t152e. ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const NO_UPC = ' No UPC was printed on the facts image, and no store page printed one, so none was attached. Missing UPC. No code was invented.';
const NEURO = 'Neuro brand facts image.';
const NA = "Nature's Answer brand facts image.";

export const BATCH342_KYR6E_T152E: RatingRecord[] = [
  row({
    id: 'neuro-b342-energy-focus-gum-cinnamon-90',
    productName: 'Neuro Energy & Focus Gum Cinnamon (90 pieces)',
    brand: 'Neuro',
    category: 'Vitamins',
    form: 'gum',
    audience: 'adult',
    minAge: 18,
    barcode: '850008160714',
    panel: NEURO,
    ings: [
      ['Sorbitol', 'moderate', POLYOL],
      ['Gum Base', 'limited', GUM],
      ['Xylitol', 'moderate', POLYOL],
      ['Natural Flavors', 'limited', FLAVORS],
      ['Calcium Stearate', 'cleared', STEARATE],
      ['Fruit And Vegetable Juice For Color', 'cleared', JUICE],
      ['Sucralose', 'limited', SUCRALOSE],
      ['Monk Fruit', 'cleared', MONK],
      ['Steviol Glycosides', 'limited', STEVIOL],
      ['Gum Arabic', 'cleared', ACACIA],
      ['Citric Acid', 'cleared', CITRIC],
    ],
    actives: [
      { name: 'Vitamin B6 (as Pyridoxine)', strength: '0.7 mg' },
      { name: 'Vitamin B12 (as Methylcobalamin)', strength: '2.4 mcg' },
      { name: 'L-Theanine', strength: '60 mg' },
      { name: 'Natural Caffeine (from Green Coffee Bean Extract)', strength: '40 mg' },
    ],
    source:
      't152e. https://neurogum.com/products/energy-caffeine-gum lists Cinnamon 90-piece pack, SKU NG_EF_CNB90, at $30.99 and in stock. The 90-count pouch image prints Serving Size 1 Piece (1.7 g), Servings Per Container 90. Other Ingredients: Sorbitol, Gum Base, Xylitol, Natural Flavors, Calcium Stearate, Fruit And Vegetable Juice For Color, Sucralose, Monk Fruit, Steviol Glycosides, Gum Arabic, Citric Acid. The pouch barcode decodes to 850008160714. The 12-pack and the 180-piece pack are multipacks of an in-stock single and are not rows. Directions say adults.',
  }),
  row({
    id: 'neuro-b342-energy-focus-gum-spearmint-90',
    productName: 'Neuro Energy & Focus Gum Spearmint (90 pieces)',
    brand: 'Neuro',
    category: 'Vitamins',
    form: 'gum',
    audience: 'adult',
    minAge: 18,
    barcode: '850042893371',
    panel: NEURO,
    ings: [
      ['Sorbitol', 'moderate', POLYOL],
      ['Gum Base', 'limited', GUM],
      ['Xylitol', 'moderate', POLYOL],
      ['Natural Flavors', 'limited', FLAVORS],
      ['Calcium Stearate', 'cleared', STEARATE],
      ['Green Spirulina Flakes', 'cleared', SPIR],
      ['Sucralose', 'limited', SUCRALOSE],
      ['Monk Fruit', 'cleared', MONK],
      ['Steviol Glycosides', 'limited', STEVIOL],
    ],
    actives: [
      { name: 'Vitamin B6 (as Pyridoxine)', strength: '0.7 mg' },
      { name: 'Vitamin B12 (as Methylcobalamin)', strength: '2.4 mcg' },
      { name: 'L-Theanine', strength: '60 mg' },
      { name: 'Natural Caffeine (from Green Coffee Bean Extract)', strength: '40 mg' },
    ],
    source:
      't152e. https://neurogum.com/products/energy-caffeine-gum lists Spearmint 90-piece pack, SKU NG_EF_SMB90, at $30.99 and in stock. The 90-count pouch image prints Serving Size 1 Piece (1.7 g), Servings Per Container 90. Other Ingredients: Sorbitol, Gum Base, Xylitol, Natural Flavors, Calcium Stearate, Green Spirulina Flakes, Sucralose, Monk Fruit, Steviol Glycosides. The pouch barcode decodes to 850042893371. The 180-piece pack uses the same barcode and is a multipack of this single.',
  }),
  row({
    id: 'neuro-b342-energy-focus-gum-wintergreen-90',
    productName: 'Neuro Energy & Focus Gum Wintergreen (90 pieces)',
    brand: 'Neuro',
    category: 'Vitamins',
    form: 'gum',
    audience: 'adult',
    minAge: 18,
    barcode: '850042893388',
    panel: NEURO,
    ings: [
      ['Sorbitol', 'moderate', POLYOL],
      ['Xylitol', 'moderate', POLYOL],
      ['Gum Base', 'limited', GUM],
      ['Natural Flavors', 'limited', FLAVORS],
      ['Calcium Stearate', 'cleared', STEARATE],
      ['Green Spirulina Flakes', 'cleared', SPIR],
      ['Blue Spirulina Flakes', 'cleared', SPIR],
      ['Sucralose', 'limited', SUCRALOSE],
      ['Monk Fruit', 'cleared', MONK],
      ['Steviol Glycosides', 'limited', STEVIOL],
    ],
    actives: [
      { name: 'Vitamin B6 (as Pyridoxine)', strength: '0.7 mg' },
      { name: 'Vitamin B12 (as Methylcobalamin)', strength: '2.4 mcg' },
      { name: 'L-Theanine', strength: '60 mg' },
      { name: 'Natural Caffeine (from Green Coffee Bean Extract)', strength: '40 mg' },
    ],
    source:
      't152e. https://neurogum.com/products/energy-caffeine-gum lists Wintergreen 90-piece pack, SKU NG_EF_WGB90, at $30.99 and in stock. The 90-count pouch image prints Serving Size 1 Piece (1.7 g), Servings Per Container 90. Other Ingredients: Sorbitol, Xylitol, Gum Base, Natural Flavors, Calcium Stearate, Green Spirulina Flakes, Blue Spirulina Flakes, Sucralose, Monk Fruit, Steviol Glycosides. The pouch barcode decodes to 850042893388.',
  }),
  row({
    id: 'neuro-b342-energy-focus-gum-peppermint-90',
    productName: 'Neuro Energy & Focus Gum Peppermint (90 pieces)',
    brand: 'Neuro',
    category: 'Vitamins',
    form: 'gum',
    audience: 'adult',
    minAge: 18,
    barcode: '850008160745',
    panel: NEURO,
    ings: [
      ['Sorbitol', 'moderate', POLYOL],
      ['Gum Base', 'limited', GUM],
      ['Natural Flavors', 'limited', FLAVORS],
      ['Calcium Stearate', 'cleared', STEARATE],
      ['Spirulina Extract for Blue Color Flakes', 'cleared', SPIR],
      ['Sucralose', 'limited', SUCRALOSE],
      ['Monk Fruit', 'cleared', MONK],
      ['Steviol Glycosides', 'limited', STEVIOL],
      ['Gum Arabic', 'cleared', ACACIA],
    ],
    actives: [
      { name: 'Vitamin B6 (as Pyridoxine)', strength: '0.7 mg' },
      { name: 'Vitamin B12 (as Methylcobalamin)', strength: '2.4 mcg' },
      { name: 'L-Theanine', strength: '60 mg' },
      { name: 'Natural Caffeine (from Green Coffee Bean Extract)', strength: '40 mg' },
    ],
    source:
      't152e. https://neurogum.com/products/energy-caffeine-gum lists Peppermint 90-piece pack, SKU NG_EF_MTB90, at $30.99 and in stock. The 90-count pouch image prints Serving Size 1 Piece (1.7 g), Servings Per Container 90. Other Ingredients: Sorbitol, Gum Base, Natural Flavors, Calcium Stearate, Spirulina Extract for Blue Color Flakes, Sucralose, Monk Fruit, Steviol Glycosides, Gum Arabic. This line does not include Xylitol. It is not neuro-b301-energy-focus-gum-peppermint-54. The pouch barcode decodes to 850008160745.',
  }),
  row({
    id: 'naturesanswer-b342-milk-thistle-1',
    productName: "Nature's Answer Milk Thistle Extract Low Alcohol (1 oz)",
    brand: "Nature's Answer",
    category: 'Herbs',
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['USP Purified Water', 'cleared', WATER],
      ['Vegetable Glycerin', 'cleared', GLYC],
      ['12-15% Certified Organic Alcohol', 'cleared', ALC],
    ],
    actives: [{ name: 'Milk Thistle (Silybum marianum) Seeds Extract', strength: '2,000 mg' }],
    source:
      't152e. https://naturesanswer.com/products/milk-thistle-1oz lists this 1 oz pack at $17.99 and in stock. The facts image prints Serving Size 2 mL (approx. 56 drops), Servings Per Container 15. Other Ingredients: USP Purified Water, Vegetable Glycerin, 12-15% Certified Organic Alcohol.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-propolis-1',
    productName: "Nature's Answer Propolis Immune Extract Low Alcohol (1 oz)",
    brand: "Nature's Answer",
    category: 'Herbs',
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Vegetable Glycerin', 'cleared', GLYC],
      ['15-20% Ethanol', 'moderate', ETH],
      ['USP Purified Water', 'cleared', WATER],
    ],
    actives: [
      { name: 'Propolis Resin Extract', strength: '250 mg' },
      { name: 'Proprietary Herbal Extract Blend', strength: '750 mg' },
    ],
    source:
      't152e. https://naturesanswer.com/products/propolis-immune-1oz-low-alcohol lists this 1 oz pack at $4.99 and in stock. The facts image prints Serving Size 1 mL (approx. 28 drops), Servings Per Container 30. Other Ingredients: Vegetable Glycerin, 15-20% Ethanol, USP Purified Water. The herbal blend is the active and is not graded. Contains: Tree Nuts (Black Walnut) is an allergen line and is not graded.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-sambucus-gummies-45',
    productName: "Nature's Answer Sambucus Daily Gummy (45 gummies)",
    brand: "Nature's Answer",
    category: 'Vitamins',
    form: 'gummy',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Non-GMO Corn Syrup', 'moderate', SYRUP],
      ['Sucrose', 'cleared', SUCROSE],
      ['Purified Water', 'cleared', WATER],
      ['Pectin', 'cleared', PECTIN],
      ['Citric Acid', 'cleared', CITRIC],
    ],
    actives: [{ name: 'Elderberry (Sambucus nigra) Fruit Extract', strength: '5 mg' }],
    source:
      't152e. https://naturesanswer.com/products/sambucus-gummies-45-count-2x-more-elderberry-3200-mg-concentration lists 45 gummies at $7.99 and in stock. The facts image prints Serving Size 1 Gummy (4 g), Servings Per Container 45. Other Ingredients: Non-GMO Corn Syrup, Sucrose, Purified Water, Pectin, Citric Acid. The extract line also prints Herbal Equivalent 3,200 mg Fresh Black Elderberries. The 12-pack shot is a multipack and is not this row.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-chlorophyll-gummies-60',
    productName: "Nature's Answer Chlorophyll Gummies (60 gummies)",
    brand: "Nature's Answer",
    category: 'Vitamins',
    form: 'gummy',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Non-GMO Sugar', 'cleared', SUGAR],
      ['Non-GMO Corn Syrup', 'moderate', SYRUP],
      ['USP Purified Water', 'cleared', WATER],
      ['Pectin', 'cleared', PECTIN],
      ['Citric Acid', 'cleared', CITRIC],
      ['Soluble Corn Fiber', 'cleared', FIBER],
      ['Natural Flavor', 'limited', FLAVOR],
      ['Corn Starch', 'cleared', STARCH],
    ],
    actives: [{ name: 'Chlorophyll (as Sodium Copper Chlorophyllin)', strength: '50 mg' }],
    source:
      't152e. https://naturesanswer.com/products/chlorophyll-gummies-60-count lists 60 gummies at $21.99 and in stock. The facts image prints Serving Size 2 Gummies (8 g), Servings Per Container 30. Other Ingredients: Non-GMO Sugar, Non-GMO Corn Syrup, USP Purified Water, Pectin, Citric Acid, Soluble Corn Fiber, Natural Flavor, Corn Starch. Counted Limited token: Natural Flavor. That is one, so this is not a 3+ stack.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-organic-mullein-gummies-60',
    productName: "Nature's Answer Organic Mullein Sugar Free Gummies (60 gummies)",
    brand: "Nature's Answer",
    category: 'Herbs',
    form: 'gummy',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Organic Inulin', 'cleared', INULIN],
      ['Organic Allulose', 'cleared', ALLU],
      ['Pectin', 'cleared', PECTIN],
      ['Citric Acid', 'cleared', CITRIC],
      ['Organic Flavors', 'limited', ORGFLAV],
      ['Organic Vegetable Juice (color)', 'cleared', JUICE],
    ],
    actives: [{ name: 'Organic Mullein Leaf Extract (from 200 mg of 10:1 Extract)', strength: '2,000 mg' }],
    source:
      't152e. https://naturesanswer.com/products/organic-mullein-sugar-free-gummies lists 60 gummies at $34.99 and in stock. The facts image prints Serving Size 2 Gummies, Servings Per Container 30. Other Ingredients: Organic Inulin, Organic Allulose, Pectin, Citric Acid, Organic Flavors, Organic Vegetable Juice (color). Counted Limited token: Organic Flavors. That is one, so this is not a 3+ stack.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-mullein-daily-gummies-60',
    productName: "Nature's Answer Mullein-X Daily Gummies (60 gummies)",
    brand: "Nature's Answer",
    category: 'Herbs',
    form: 'gummy',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Inulin', 'cleared', INULIN],
      ['Allulose', 'cleared', ALLU],
      ['Pectin', 'cleared', PECTIN],
      ['Natural Flavors', 'limited', FLAVORS],
      ['Lactic Acid', 'cleared', LACTIC],
      ['Malic Acid', 'cleared', MALIC],
      ['Citric Acid', 'cleared', CITRIC],
      ['Vegetable Juice for Color', 'cleared', JUICE],
    ],
    actives: [
      { name: 'Organic Mullein (Verbascum thapsus) (Leaf) (from 200 mg of 10:1 Extract)', strength: '2,000 mg' },
      { name: 'Mullein-X Blend', strength: '100 mg' },
    ],
    source:
      't152e. https://naturesanswer.com/products/mullein-x-daily-gummies lists 60 vegan gummies at $34.99 and in stock. The facts image prints Serving Size 2 Gummies, Servings Per Container 30. Other Ingredients: Inulin, Allulose, Pectin, Natural Flavors, Lactic Acid, Malic Acid, Citric Acid, Vegetable Juice for Color. Counted Limited token: Natural Flavors. That is one, so this is not a 3+ stack. The blend is the active and is not graded.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-kids-mullein-cough-4',
    productName: "Nature's Answer Mullein-X Childrens Cough Syrup (4 oz)",
    brand: "Nature's Answer",
    category: 'Cold & Flu',
    form: 'liquid',
    audience: 'kids',
    minAge: 2,
    panel: NA,
    ings: [
      ['Vegetable Glycerin', 'cleared', GLYC],
      ['USP Purified Water', 'cleared', WATER],
      ['Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit)', 'moderate', QUIK],
    ],
    actives: [
      { name: 'Pure Honey', strength: '4,000 mg' },
      { name: 'Mullein-X Cough Syrup Proprietary Extract Blend', strength: '250 mg' },
    ],
    source:
      't152e. https://naturesanswer.com/products/kids-natural-mullein-x-cough-syrup-4-oz-alcohol-free lists the 4 oz children\'s syrup at $19.99 and in stock. The facts image prints Serving Size 1 Teaspoon (5 mL), Servings Per Container 24. Other Ingredients: Vegetable Glycerin, USP Purified Water, Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit). Honey and the extract blend are on the amount table and are not graded. Contains: Bee Product is an allergen line and is not graded. Not the written throat spray.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-mullein-pm-4',
    productName: "Nature's Answer Mullein-X Cough Syrup PM Nighttime (4 oz)",
    brand: "Nature's Answer",
    category: 'Cold & Flu',
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Vegetable Glycerin', 'cleared', GLYC],
      ['USP Purified Water', 'cleared', WATER],
      ['Natural Flavor', 'limited', FLAVOR],
      ['Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit)', 'moderate', QUIK],
    ],
    actives: [{ name: 'Mullein-X Cough Syrup Proprietary Extract Blend', strength: '2,900 mg' }],
    source:
      't152e. https://naturesanswer.com/products/mullein-x-cough-syrup-nighttime-pm lists the 4 oz nighttime syrup at $24.99 and in stock. The facts image prints Serving Size 1 Teaspoon (5 mL), Servings Per Container 24. Other Ingredients: Vegetable Glycerin, USP Purified Water, Natural Flavor, Quik-Sorb® (Ginger Rhizome, Amla Fruit, Capsicum Fruit). Counted Limited token: Natural Flavor. That is one, so this is not a 3+ stack. Contains: Bee Product is an allergen line and is not graded.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-methyl-b12-spray-1',
    productName: "Nature's Answer Methyl B-12 2500 mcg Spray (1 oz)",
    brand: "Nature's Answer",
    category: 'Vitamins',
    form: 'spray',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Vegetable Glycerin', 'cleared', GLYC],
      ['Purified Water', 'cleared', WATER],
      ['Citric Acid', 'cleared', CITRIC],
      ['Potassium Sorbate (as preservative)', 'moderate', SORB],
      ['Quik-Sorb® (Ginger Root Powder, Amla Fruit Extract, Capsicum Fruit Powder)', 'moderate', QUIK],
      ['Natural Raspberry Flavor', 'limited', RASP],
    ],
    actives: [{ name: 'Vitamin B12 (as Methylcobalamin)', strength: '2,500 mcg' }],
    source:
      't152e. https://naturesanswer.com/products/methyl-b-12-2500mcg-spray lists the 1 oz spray at $22.99 and in stock. The facts image prints Serving Size 0.33 mL (2 sprays), Servings Per Container 90. Other Ingredients: Vegetable Glycerin, Purified Water, Citric Acid, Potassium Sorbate (as preservative), Quik-Sorb® (Ginger Root Powder, Amla Fruit Extract, Capsicum Fruit Powder), Natural Raspberry Flavor. Counted Limited token: Natural Raspberry Flavor. That is one, so this is not a 3+ stack.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-tart-cherry-8',
    productName: "Nature's Answer Liquid Tart Cherry Alcohol Free (8 oz)",
    brand: "Nature's Answer",
    category: 'Herbs',
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Apple Juice Concentrate', 'cleared', JUICE],
      ['Vegetable Glycerin', 'cleared', GLYC],
      ['Purified Water', 'cleared', WATER],
      ['Citric Acid', 'cleared', CITRIC],
      ['Potassium Sorbate', 'moderate', SORB],
      ['Quik-Sorb (Ginger Rhizome, Alma Fruit, Capsicum Fruit)', 'moderate', QUIK],
    ],
    actives: [
      { name: 'Tart Cherry (Prunus cerasus) Juice Concentrate', strength: '4,500 mg' },
      { name: 'CherryCraft Tart Cherry Fruit Extract', strength: '75 mg' },
      { name: 'Chamomile (Matricaria recutita) Flower Extract', strength: '50 mg' },
      { name: 'Lemon Balm (Melissa officinalis) Leaf Extract', strength: '50 mg' },
      { name: 'Suntheanine L-Theanine', strength: '50 mg' },
    ],
    source:
      't152e. https://naturesanswer.com/products/liquid-tart-cherry-8oz-alcohol-free lists the 8 oz liquid at $25.99 and in stock. The facts image prints Serving Size 2 Teaspoons (10 mL), Servings Per Container 24. Other Ingredients: Apple Juice Concentrate, Vegetable Glycerin, Purified Water, Citric Acid, Potassium Sorbate, Quik-Sorb (Ginger Rhizome, Alma Fruit, Capsicum Fruit). The printed word is Alma, not Amla, and this token has no registered mark. Magnesium on the amount table is an active and is not graded.' + NO_UPC,
  }),
  row({
    id: 'naturesanswer-b342-zinc-plus-60',
    productName: "Nature's Answer Zinc Plus Veggie Capsules (60 capsules)",
    brand: "Nature's Answer",
    category: 'Vitamins',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    panel: NA,
    ings: [
      ['Rice Flour', 'moderate', FLOUR],
      ['Vegetable Cellulose (Capsule)', 'cleared', CELL],
      ['Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit)', 'moderate', QUIK],
      ['Calcium Silicate', 'moderate', SILICATE],
    ],
    actives: [
      { name: 'Vitamin B6 (as Pyridoxal-5-Phosphate)', strength: '3 mg' },
      { name: 'Zinc (as Zinc Picolinate and Zinc Citrate)', strength: '25 mg' },
      { name: 'Copper (as Copper Gluconate)', strength: '1 mg' },
    ],
    source:
      't152e. https://naturesanswer.com/products/zinc-plus-zinc-vitamins-for-adults-25mg-of-immune-support-with-b6-60-veg-capsules lists 60 capsules at $15.99 and in stock. The facts image prints Serving Size 1 Capsule, Servings Per Container 60. Other Ingredients: Rice Flour, Vegetable Cellulose (Capsule), Quik-Sorb® (ginger rhizome, alma fruit, capsicum fruit), Calcium Silicate. The NO list under the panel is a free-from line and is not graded.' + NO_UPC,
  }),
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

const ROWS = BATCH342_KYR6E_T152E;
const STACK = 'Gum Base|Natural Flavors|Sucralose|Steviol Glycosides';
const expect: Record<string, { verdict: RatingRecord['verdict']; limited: string; barcode: string }> = {
  'neuro-b342-energy-focus-gum-cinnamon-90': { verdict: 'avoid', limited: STACK, barcode: '850008160714' },
  'neuro-b342-energy-focus-gum-spearmint-90': { verdict: 'avoid', limited: STACK, barcode: '850042893371' },
  'neuro-b342-energy-focus-gum-wintergreen-90': { verdict: 'avoid', limited: STACK, barcode: '850042893388' },
  'neuro-b342-energy-focus-gum-peppermint-90': { verdict: 'avoid', limited: STACK, barcode: '850008160745' },
  'naturesanswer-b342-milk-thistle-1': { verdict: 'clean', limited: '', barcode: '' },
  'naturesanswer-b342-propolis-1': { verdict: 'caution', limited: '', barcode: '' },
  'naturesanswer-b342-sambucus-gummies-45': { verdict: 'caution', limited: '', barcode: '' },
  'naturesanswer-b342-chlorophyll-gummies-60': { verdict: 'caution', limited: 'Natural Flavor', barcode: '' },
  'naturesanswer-b342-organic-mullein-gummies-60': { verdict: 'caution', limited: 'Organic Flavors', barcode: '' },
  'naturesanswer-b342-mullein-daily-gummies-60': { verdict: 'caution', limited: 'Natural Flavors', barcode: '' },
  'naturesanswer-b342-kids-mullein-cough-4': { verdict: 'caution', limited: '', barcode: '' },
  'naturesanswer-b342-mullein-pm-4': { verdict: 'caution', limited: 'Natural Flavor', barcode: '' },
  'naturesanswer-b342-methyl-b12-spray-1': { verdict: 'caution', limited: 'Natural Raspberry Flavor', barcode: '' },
  'naturesanswer-b342-tart-cherry-8': { verdict: 'caution', limited: '', barcode: '' },
  'naturesanswer-b342-zinc-plus-60': { verdict: 'caution', limited: '', barcode: '' },
};
if (ROWS.length !== 15) throw new Error(`batch342 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`dup ${record.id}`);
  ids.add(record.id);
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  if ((record.barcode ?? '') !== want.barcode) throw new Error(`${record.id} barcode ${record.barcode}`);
  if (want.barcode && !upcCheck(want.barcode)) throw new Error(`${record.id} check`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
  if (counted.join('|') !== want.limited) throw new Error(`${record.id} stack ${counted.join('|')}`);
  if (want.verdict === 'avoid') {
    const note = record.honestNote ?? '';
    if (!note.startsWith('Avoid: three or more Limited tokens triggered the stacking rule (t137u): ')) {
      throw new Error(`${record.id} note ${note}`);
    }
    if (!note.includes(counted.join(', '))) throw new Error(`${record.id} note tokens`);
  } else if (record.honestNote) {
    throw new Error(`${record.id} extra note ${record.honestNote}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`${record.id} blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`${record.id} generic ${ingredient.name}: ${why}`);
    }
  }
}
