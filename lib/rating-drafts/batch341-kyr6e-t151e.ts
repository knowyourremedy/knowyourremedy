// DRAFT / not verified / batch 341 KYR6-e (t151e).
// Zand holds opened by the seven Cleared locks.
// The Sprouts section is not edited.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const T151 = 'Methodology §5 Cleared (t151e). Does not count toward the t137u stack.';
const SYRUP = 'Methodology §5 Cleared (brown rice syrup / food syrup).';
const JUICE = 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder).';
const OIL = 'Methodology §5 Cleared (Orange Oil — t130e). Does not count toward the t137u stack.';
const WATER = 'Methodology §5 Cleared (water / purified water / filtered water).';
const GRAIN = 'Methodology §5 Limited (pure grain alcohol — alcohol vehicle). Counts toward the t137u stack.';
const GLYCERIN = 'Methodology §5 Cleared (glycerin).';
const XYL = 'Methodology §5 Caution (xylitol — swallowed sugar alcohol). Does not count toward the t137u stack.';
const CELL = 'Methodology §5 Cleared (cellulose).';
const STEARIC = 'Methodology §5 Cleared (stearic acid).';
const POWDER = 'Methodology §5 Cleared (coconut oil powder). Not the gummy seed-oil rule.';
const SILICA = 'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.';
const DEXTRIN = 'Methodology §5 Cleared (tapioca dextrin).';
const ACACIA = 'Methodology §5 Cleared (acacia gum).';
const STEVIA = 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const MALTO = 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.';

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
  audience: 'adult' | 'kids';
  minAge: number;
  ings: Ing[];
  actives: ActiveIngredient[];
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Zand',
    category: 'Cold & Flu',
    formulaId: args.id,
    form: args.form,
    audience: args.audience,
    minAge: args.minAge,
    recordStatus: 'unverified',
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `Zand brand facts image. t151e. ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const NO_UPC = ' The variant SKU matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.';

export const BATCH341_KYR6E_T151E: RatingRecord[] = [
  row({
    id: 'zand-b341-orange-c-lozenges-45',
    productName: 'Zand Orange C Lozenges (45 lozenges)',
    form: 'lozenge',
    audience: 'adult',
    minAge: 18,
    ings: [
      ['Brown Rice Syrup', 'cleared', SYRUP],
      ['Orange juice Concentrate', 'cleared', JUICE],
      ['Orange Oil', 'cleared', OIL],
      ['Natural Sweet Orange Flavor', 'cleared', T151],
    ],
    actives: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '90 mg' },
      { name: 'Proprietary Blend', strength: '29 mg' },
    ],
    source: 't151e. Brand page https://zand.com/products/herbalozenge-orange-c is in stock at $9.79. The facts image prints Serving Size 1 Lozenge (3.8 g), Servings Per Container 45. Other Ingredients: Brown Rice Syrup, Orange juice Concentrate, Orange Oil, Natural Sweet Orange Flavor. Vitamin C and the proprietary blend are actives and are not graded. Counted Limited tokens: none.' + NO_UPC,
  }),
  row({
    id: 'zand-b341-lemon-honey-syrup',
    productName: 'Zand Lemon and Honey Vitamin C Syrup',
    form: 'syrup',
    audience: 'adult',
    minAge: 1,
    ings: [
      ['Purified Water', 'cleared', WATER],
      ['Natural Lemon Flavor with Other Natural Flavors', 'cleared', T151],
      ['Pure Grain Alcohol', 'limited', GRAIN],
    ],
    actives: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '160 mg' },
      { name: 'Zinc (from Zinc Oxide)', strength: '3 mg' },
      { name: 'Honey & Lemon Apitherapy Formula', strength: '5.7 g' },
    ],
    source: 't151e. Brand page https://zand.com/products/lemon-and-honey-syrup is in stock at $23.39. The facts image prints Serving Size 1 tsp. (5 mL), Servings Per Container about 48. Other Ingredients: Purified Water, Natural Lemon Flavor with Other Natural Flavors and Pure Grain Alcohol. Counted Limited token: Pure Grain Alcohol. Do not give to children under 1 year of age.' + NO_UPC,
  }),
  row({
    id: 'zand-b341-kids-cherry-syrup-4',
    productName: 'Zand Kids Cherry and Honey Syrup (4 fl oz)',
    form: 'syrup',
    audience: 'kids',
    minAge: 1,
    ings: [
      ['Organic Black Cherry Concentrate', 'cleared', JUICE],
      ['Filtered Water', 'cleared', WATER],
      ['White Grape Juice Concentrate', 'cleared', JUICE],
      ['Organic Lemon Juice Concentrate', 'cleared', JUICE],
      ['Natural Dark Sweet Cherry Flavor with other natural flavors', 'cleared', T151],
    ],
    actives: [{ name: 'Kids Cherry Honey Syrup', strength: '3.5 g' }],
    source: 't151e. Brand page https://zand.com/products/kids-cherry-honey-soothing-throat-syrup-herbal-infused-raw-honey-syrup-apitherapy-formula-includes-extracts-of-umckaloabo-black-cherry-marshmallow-24-servings-4-fl-oz is in stock at $13.69. The facts image prints Serving Size 1 tsp. (5 mL), Servings Per Container about 24. Other Ingredients: Organic Black Cherry Concentrate, Filtered Water, White Grape Juice Concentrate, Organic Lemon Juice Concentrate, Natural Dark Sweet Cherry Flavor with other natural flavors. Counted Limited tokens: none. Do not feed to children under 1 year of age.' + NO_UPC,
  }),
  row({
    id: 'zand-b341-elderberry-kids-syrup-4',
    productName: 'Zand Elderberry Syrup for Kids (4 fl oz)',
    form: 'syrup',
    audience: 'kids',
    minAge: 1,
    ings: [
      ['Red Grape Juice Concentrate', 'cleared', JUICE],
      ['Organic Lemon Juice Concentrate', 'cleared', JUICE],
      ['Natural Grape Flavor with Other Natural Flavors', 'cleared', T151],
    ],
    actives: [{ name: 'Elderberry Honey Syrup', strength: '6.3 g' }],
    source: 't151e. Brand page https://zand.com/products/elderberry-syrup-for-kids-with-honey-kids-elderberry-syrup-6-4-mg-of-elderberry-honey-syrup-with-organic-raw-honey-organic-echinacea-purpurea-and-elderflower-24-servings-4-fl-oz is in stock at $12.49. The facts image prints Serving Size 1 tsp. (5 mL), Servings Per Container about 24. Other Ingredients: Red Grape Juice Concentrate, Organic Lemon Juice Concentrate, Natural Grape Flavor with Other Natural Flavors. Counted Limited tokens: none.' + NO_UPC,
  }),
  row({
    id: 'zand-b341-insure-liquid-8',
    productName: 'Zand Insure Immune Support (8 oz)',
    form: 'liquid',
    audience: 'adult',
    minAge: 12,
    ings: [
      ['Purified Water', 'cleared', WATER],
      ['Glycerin', 'cleared', GLYCERIN],
      ['USP Alcohol', 'cleared', T151],
    ],
    actives: [{ name: 'Herbal Formula Extract', strength: '180 mg' }],
    source: 't151e. Brand page https://zand.com/products/insure-immune-support lists the 8 oz in stock at $57.49. The facts image file lb_facts_041954010653 prints Serving Size 1/4 teaspoon (1.2 mL), Servings per Container 197. Other Ingredients: Purified Water, Glycerin, USP Alcohol. Counted Limited tokens: none. Directions say adults and children over 12. The 4 oz image is the front only.' + NO_UPC,
  }),
  row({
    id: 'zand-b341-elderberry-honey-cane-4',
    productName: 'Zand Elderberry Honey Syrup (4 oz, cane alcohol)',
    form: 'syrup',
    audience: 'adult',
    minAge: 1,
    ings: [
      ['Water', 'cleared', WATER],
      ['Pure Cane Alcohol', 'cleared', T151],
    ],
    actives: [{ name: 'Elderberry Apitherapy Formula', strength: '6.2 g' }],
    source: 't151e. Brand page https://zand.com/products/elderberry-honey-syrup is in stock at $13.99. This is not zand-b300-elderberry-honey-4. That row is the Grade A product and prints Pure Grain Alcohol and Purified Water. This facts image prints Serving Size 5 mL (1 tsp), Servings Per Container 23. Other Ingredients: Water, Pure Cane Alcohol. Counted Limited tokens: none.' + NO_UPC,
  }),
  row({
    id: 'zand-b341-immune-fast-orange-30',
    productName: 'Zand Immune Fast Zesty Orange (30 chewables)',
    form: 'tablet',
    audience: 'adult',
    minAge: 18,
    ings: [
      ['Xylitol', 'moderate', XYL],
      ['Cellulose', 'cleared', CELL],
      ['Stearic Acid', 'cleared', STEARIC],
      ['Coconut Oil Powder', 'cleared', POWDER],
      ['Natural Orange Flavor with Other Natural Flavors', 'cleared', T151],
      ['Silica', 'moderate', SILICA],
      ['Tapioca Dextrin', 'cleared', DEXTRIN],
      ['Acacia Gum', 'cleared', ACACIA],
      ['Organic Stevia (leaf extract)', 'limited', STEVIA],
      ['Citric Acid', 'cleared', CITRIC],
      ['Maltodextrin', 'limited', MALTO],
    ],
    actives: [
      { name: 'Vitamin C (as ascorbic acid and sodium ascorbate)', strength: '1,000 mg' },
      { name: 'Zinc (from zinc citrate)', strength: '11 mg' },
      { name: 'EpiCor Dried Fermentate', strength: '500 mg' },
      { name: 'Echinacea Blend', strength: '100 mg' },
    ],
    source: 't151e. Brand page https://zand.com/products/immune-fast-zesty-orange is in stock at $17.89. The back image prints Serving Size 3 Chewable Tablets, Servings Per Container 10. Other Ingredients: Xylitol, Cellulose, Stearic Acid, Coconut Oil Powder, Natural Orange Flavor with Other Natural Flavors, Silica, Tapioca Dextrin, Acacia Gum, Organic Stevia (leaf extract), Citric Acid and Maltodextrin. Counted Limited tokens: Organic Stevia (leaf extract) and Maltodextrin. That is two, so this is not a 3+ stack. Xylitol and silica are Caution and do not stack.' + NO_UPC,
  }),
];

const ROWS = BATCH341_KYR6E_T151E;
if (ROWS.length !== 7) throw new Error(`batch341 count ${ROWS.length}`);
const expect: Record<string, { verdict: RatingRecord['verdict']; limited: string[] }> = {
  'zand-b341-orange-c-lozenges-45': { verdict: 'clean', limited: [] },
  'zand-b341-lemon-honey-syrup': { verdict: 'caution', limited: ['Pure Grain Alcohol'] },
  'zand-b341-kids-cherry-syrup-4': { verdict: 'clean', limited: [] },
  'zand-b341-elderberry-kids-syrup-4': { verdict: 'clean', limited: [] },
  'zand-b341-insure-liquid-8': { verdict: 'clean', limited: [] },
  'zand-b341-elderberry-honey-cane-4': { verdict: 'clean', limited: [] },
  'zand-b341-immune-fast-orange-30': { verdict: 'caution', limited: ['Organic Stevia (leaf extract)', 'Maltodextrin'] },
};
for (const record of ROWS) {
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`${record.id} barcode`);
  if (record.honestNote) throw new Error(`${record.id} note ${record.honestNote}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
  if (counted.join('|') !== want.limited.join('|')) throw new Error(`${record.id} stack ${counted.join('|')}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`${record.id} blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`${record.id} generic ${ingredient.name}: ${why}`);
    }
  }
}
