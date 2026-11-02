// DRAFT / not verified / batch 339 KYR6-e (t149e).
// Remaining in-stock Zand singles whose facts images are fully locked.
// The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const SYRUP = 'Methodology §5 Cleared (brown rice syrup / food syrup).';
const JUICE = 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const WATER = 'Methodology §5 Cleared (water / purified water / filtered water).';
const OIL = 'Methodology §5 Cleared (named oil — t130e). Does not count toward the t137u stack.';
const LEMON_OIL = 'Methodology §5 Cleared (named lemon oil).';
const MENTHOL = 'Methodology §5 Cleared (Menthol — t122e). Does not count toward the t137u stack.';
const T54 = 'Methodology §5 Limited (t54u natural-flavor rule). Counts toward the t137u stack.';
const T106 = 'Methodology §5 Caution (t106u named flavor with other natural flavors). Does not count toward the t137u stack.';
const GRAIN = 'Methodology §5 Limited (pure grain alcohol — alcohol vehicle). Counts toward the t137u stack.';
const T149 = 'Methodology §5 Limited (t149e standing ladder rule — alcohol vehicle). Counts toward the t137u stack.';
const SUGAR = 'Methodology §5 Cleared (cane sugar).';
const PECTIN = 'Methodology §5 Cleared (pectin).';
const BERRY = 'Methodology §5 Caution (Natural Mixed Berry Flavor — t98u). Does not count toward the t137u stack.';
const COCONUT = 'Methodology §5 Cleared (coconut oil). Not the gummy seed-oil rule.';
const SUN = 'Methodology §5 Avoid (sunflower oil in a gummy).';
const WAX = 'Methodology §5 Cleared (carnauba wax — t133u).';
const COLORS = 'Methodology §5 Caution (Natural Colors — t22u unnamed color, t149e). Does not count toward the t137u stack.';
const XYL = 'Methodology §5 Caution (xylitol — swallowed sugar alcohol). Does not count toward the t137u stack.';
const CELL = 'Methodology §5 Cleared (cellulose).';
const POWDER = 'Methodology §5 Cleared (coconut oil powder). Not the gummy seed-oil rule.';
const STEARIC = 'Methodology §5 Cleared (stearic acid).';
const MALTO = 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.';
const FLAVORS = 'Methodology §5 Limited (Natural Flavors — t54u). Counts toward the t137u stack.';
const SILICA = 'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.';
const STEVIA = 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.';
const DEXTRIN = 'Methodology §5 Cleared (tapioca dextrin).';
const ACACIA = 'Methodology §5 Cleared (acacia gum).';
const GLYCERIN = 'Methodology §5 Cleared (glycerin).';

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
  minAge: number;
  ings: Ing[];
  actives: { name: string; strength?: string }[];
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Zand',
    category: 'Cold & Flu',
    formulaId: args.id,
    form: args.form,
    audience: ADULT,
    minAge: args.minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `Zand brand facts image. t149e. ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const NO_UPC = ' The variant SKU matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.';

export const BATCH339_KYR6E_T149E: RatingRecord[] = [
  row({
    id: 'zand-b339-orange-c-lozenges-45',
    productName: 'Zand Orange C Lozenges (45 lozenges)',
    form: 'lozenge',
    minAge: 18,
    ings: [
      ['Brown Rice Syrup', 'cleared', SYRUP],
      ['Orange juice Concentrate', 'cleared', JUICE],
      ['Orange Oil', 'cleared', OIL],
      ['Natural Sweet Orange Flavor', 'limited', T54],
    ],
    actives: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '90 mg' },
      { name: 'Proprietary Blend', strength: '29 mg' },
    ],
    source: 't149e. Brand page https://zand.com/products/herbalozenge-orange-c is in stock at $9.79. The facts image prints Serving Size 1 Lozenge (3.8 g), Servings Per Container 45. Other Ingredients: Brown Rice Syrup, Orange juice Concentrate, Orange Oil, Natural Sweet Orange Flavor. Vitamin C and the proprietary blend are actives and are not graded. Counted Limited token: Natural Sweet Orange Flavor.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-lemon-zinc-lozenges-45',
    productName: 'Zand Lemon Zinc Lozenges (45 lozenges)',
    form: 'lozenge',
    minAge: 18,
    ings: [
      ['Brown Rice Syrup', 'cleared', SYRUP],
      ['Lemon Oil', 'cleared', LEMON_OIL],
      ['Citric Acid', 'cleared', CITRIC],
      ['Menthol', 'cleared', MENTHOL],
    ],
    actives: [
      { name: 'Zinc (from Zinc Gluconate)', strength: '5 mg' },
      { name: 'Proprietary Blend', strength: '24 mg' },
    ],
    source: 't149e. Brand page https://zand.com/products/herbalozenge-lemon-zinc is in stock at $9.79. The facts image prints Serving Size 1 Lozenge (3.8 g), Servings Per Container 45. Other Ingredients: Brown Rice Syrup, Lemon Oil, Citric Acid, Menthol. Zinc and the proprietary blend are actives and are not graded. Counted Limited tokens: none.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-cherry-echinacea-lozenges-45',
    productName: 'Zand Cherry Echinacea Zinc Lozenges (45 lozenges)',
    form: 'lozenge',
    minAge: 18,
    ings: [
      ['Brown Rice Syrup', 'cleared', SYRUP],
      ['Citric Acid', 'cleared', CITRIC],
      ['Natural Cherry Flavor', 'limited', T54],
    ],
    actives: [
      { name: 'Zinc (from Zinc Gluconate)', strength: '5 mg' },
      { name: 'Proprietary Blend', strength: '49 mg' },
    ],
    source: 't149e. Brand page https://zand.com/products/cherry-echinacea-zinc is in stock at $9.79. The facts image prints Serving Size 1 Lozenge (3.8 g), Servings Per Container 45. Other Ingredients: Brown Rice Syrup, Citric Acid, Natural Cherry Flavor. Zinc and the proprietary blend are actives and are not graded. Counted Limited token: Natural Cherry Flavor.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-lemon-honey-syrup',
    productName: 'Zand Lemon and Honey Vitamin C Syrup',
    form: 'syrup',
    minAge: 1,
    ings: [
      ['Purified Water', 'cleared', WATER],
      ['Natural Lemon Flavor with Other Natural Flavors', 'moderate', T106],
      ['Pure Grain Alcohol', 'limited', GRAIN],
    ],
    actives: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '160 mg' },
      { name: 'Zinc (from Zinc Oxide)', strength: '3 mg' },
      { name: 'Honey & Lemon Apitherapy Formula', strength: '5.7 g' },
    ],
    source: 't149e. Brand page https://zand.com/products/lemon-and-honey-syrup is in stock at $23.39. The facts image prints Serving Size 1 tsp. (5 mL), Servings Per Container about 48. Other Ingredients: Purified Water, Natural Lemon Flavor with Other Natural Flavors and Pure Grain Alcohol. The vitamin, mineral, and apitherapy formula are actives and are not graded. Counted Limited token: Pure Grain Alcohol. The flavor wording is Caution and does not stack. Do not give to children under 1 year of age.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-kids-cherry-syrup-4',
    productName: 'Zand Kids Cherry and Honey Syrup (4 fl oz)',
    form: 'syrup',
    minAge: 1,
    ings: [
      ['Organic Black Cherry Concentrate', 'cleared', JUICE],
      ['Filtered Water', 'cleared', WATER],
      ['White Grape Juice Concentrate', 'cleared', JUICE],
      ['Organic Lemon Juice Concentrate', 'cleared', JUICE],
      ['Natural Dark Sweet Cherry Flavor with other natural flavors', 'moderate', T106],
    ],
    actives: [{ name: 'Kids Cherry Honey Syrup', strength: '3.5 g' }],
    source: 't149e. Brand page https://zand.com/products/kids-cherry-honey-soothing-throat-syrup-herbal-infused-raw-honey-syrup-apitherapy-formula-includes-extracts-of-umckaloabo-black-cherry-marshmallow-24-servings-4-fl-oz is in stock at $13.69. The facts image prints Serving Size 1 tsp. (5 mL), Servings Per Container about 24. Other Ingredients: Organic Black Cherry Concentrate, Filtered Water, White Grape Juice Concentrate, Organic Lemon Juice Concentrate, Natural Dark Sweet Cherry Flavor with other natural flavors. The honey and herb line is the active and is not graded. Counted Limited tokens: none. The flavor wording is Caution and does not stack. Do not feed to children under 1 year of age.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-elderberry-kids-syrup-4',
    productName: 'Zand Elderberry Syrup for Kids (4 fl oz)',
    form: 'syrup',
    minAge: 1,
    ings: [
      ['Red Grape Juice Concentrate', 'cleared', JUICE],
      ['Organic Lemon Juice Concentrate', 'cleared', JUICE],
      ['Natural Grape Flavor with Other Natural Flavors', 'moderate', T106],
    ],
    actives: [{ name: 'Elderberry Honey Syrup', strength: '6.3 g' }],
    source: 't149e. Brand page https://zand.com/products/elderberry-syrup-for-kids-with-honey-kids-elderberry-syrup-6-4-mg-of-elderberry-honey-syrup-with-organic-raw-honey-organic-echinacea-purpurea-and-elderflower-24-servings-4-fl-oz is in stock at $12.49. The facts image prints Serving Size 1 tsp. (5 mL), Servings Per Container about 24. Other Ingredients: Red Grape Juice Concentrate, Organic Lemon Juice Concentrate, Natural Grape Flavor with Other Natural Flavors. The elderberry honey line is the active and is not graded. Counted Limited tokens: none. The flavor wording is Caution and does not stack.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-insure-liquid-8',
    productName: 'Zand Insure Immune Support (8 oz)',
    form: 'liquid',
    minAge: 12,
    ings: [
      ['Purified Water', 'cleared', WATER],
      ['Glycerin', 'cleared', GLYCERIN],
      ['USP Alcohol', 'limited', T149],
    ],
    actives: [{ name: 'Herbal Formula Extract', strength: '180 mg' }],
    source: 't149e. Brand page https://zand.com/products/insure-immune-support lists the 8 oz in stock at $57.49. The facts image file is lb_facts_041954010653 and prints Serving Size 1/4 teaspoon (1.2 mL), Servings per Container 197, which is the 8 oz. Other Ingredients: Purified Water, Glycerin, USP Alcohol. The herbal extract is the active and is not graded. Counted Limited token: USP Alcohol. Directions say adults and children over 12. The 4 oz has no facts image on this page.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-elderberry-honey-syrup-4',
    productName: 'Zand Elderberry Honey Syrup (4 oz, cane alcohol)',
    form: 'syrup',
    minAge: 1,
    ings: [
      ['Water', 'cleared', WATER],
      ['Pure Cane Alcohol', 'limited', T149],
    ],
    actives: [{ name: 'Elderberry Apitherapy Formula', strength: '6.2 g' }],
    source: 't149e. Brand page https://zand.com/products/elderberry-honey-syrup is in stock at $13.99. This is not zand-b300-elderberry-honey-4. That row is the Grade A Raw Honey product and its other ingredients are Pure Grain Alcohol and Purified Water. This facts image prints Serving Size 5 mL (1 tsp), Servings Per Container 23. Other Ingredients: Water, Pure Cane Alcohol. The apitherapy formula is the active and is not graded. Counted Limited token: Pure Cane Alcohol.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-elderberry-zinc-gummies-60',
    productName: 'Zand Elderberry Zinc Gummies (60 gummies)',
    form: 'gummy',
    minAge: 4,
    ings: [
      ['Tapioca Syrup', 'cleared', SYRUP],
      ['Cane Sugar', 'cleared', SUGAR],
      ['Purified Water', 'cleared', WATER],
      ['Pectin', 'cleared', PECTIN],
      ['Natural Mixed Berry Flavor', 'moderate', BERRY],
      ['Citric Acid', 'cleared', CITRIC],
      ['Sodium Citrate', 'cleared', CITRIC],
      ['Coconut Oil', 'cleared', COCONUT],
      ['Sunflower Oil', 'high', SUN],
      ['Carnauba Wax', 'cleared', WAX],
      ['Natural Colors', 'moderate', COLORS],
    ],
    actives: [
      { name: 'Vitamin C (Ascorbic Acid)', strength: '90 mg' },
      { name: 'Zinc (Zinc Citrate)', strength: '11 mg' },
      { name: 'European Elderberry (Sambucus nigra) Extract', strength: '125 mg' },
    ],
    source: 't149e. Brand page https://zand.com/products/gummies-elderberry-zinc is in stock at $16.79. The facts image prints Serving Size 2 Gummies, Servings Per Container 30. Adults and children 4 years and older. Other Ingredients: Tapioca Syrup, Cane Sugar, Purified Water, Pectin, Natural Mixed Berry Flavor, Citric Acid, Sodium Citrate, Coconut Oil, Sunflower Oil, Carnauba Wax, Natural Colors. Sunflower oil in the gummy is Avoid. Counted Limited tokens: none. Natural Mixed Berry Flavor and Natural Colors are Caution and do not stack.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-immune-fast-elderberry-30',
    productName: 'Zand Immune Fast Sweet Elderberry (30 chewables)',
    form: 'tablet',
    minAge: 18,
    ings: [
      ['Xylitol', 'moderate', XYL],
      ['Cellulose', 'cleared', CELL],
      ['Coconut Oil Powder', 'cleared', POWDER],
      ['Stearic Acid', 'cleared', STEARIC],
      ['Maltodextrin', 'limited', MALTO],
      ['Natural Flavors', 'limited', FLAVORS],
      ['Silica', 'moderate', SILICA],
      ['Stevia (leaf extract)', 'limited', STEVIA],
      ['Citric Acid', 'cleared', CITRIC],
    ],
    actives: [
      { name: 'Vitamin C (as ascorbic acid and sodium ascorbate)', strength: '1,000 mg' },
      { name: 'Zinc (from zinc citrate)', strength: '11 mg' },
      { name: 'EpiCor Dried Fermentate', strength: '500 mg' },
      { name: 'Black Elderberry (Sambucus nigra) Berry Extract 4:1', strength: '200 mg' },
    ],
    source: 't149e. Brand page https://zand.com/products/immune-fast-sweet-elderberry is in stock at $17.89. The back image prints Serving Size 3 Chewable Tablets, Servings Per Container 10. Other Ingredients: Xylitol, Cellulose, Coconut Oil Powder, Stearic Acid, Maltodextrin, Natural Flavors, Silica, Stevia (leaf extract), Citric Acid. Counted Limited tokens: Maltodextrin, Natural Flavors, and Stevia (leaf extract). Silica does not stack. Xylitol is Caution and does not stack. The sugar-alcohol line on the nutrition table is the xylitol disclosure and is not graded again.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-immune-fast-orange-30',
    productName: 'Zand Immune Fast Zesty Orange (30 chewables)',
    form: 'tablet',
    minAge: 18,
    ings: [
      ['Xylitol', 'moderate', XYL],
      ['Cellulose', 'cleared', CELL],
      ['Stearic Acid', 'cleared', STEARIC],
      ['Coconut Oil Powder', 'cleared', POWDER],
      ['Natural Orange Flavor with Other Natural Flavors', 'moderate', T106],
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
    source: 't149e. Brand page https://zand.com/products/immune-fast-zesty-orange is in stock at $17.89. The back image prints Serving Size 3 Chewable Tablets, Servings Per Container 10. Other Ingredients: Xylitol, Cellulose, Stearic Acid, Coconut Oil Powder, Natural Orange Flavor with Other Natural Flavors, Silica, Tapioca Dextrin, Acacia Gum, Organic Stevia (leaf extract), Citric Acid and Maltodextrin. Counted Limited tokens: Organic Stevia (leaf extract) and Maltodextrin. That is two, so this is not a 3+ stack. The orange flavor wording and xylitol are Caution and do not stack. Silica does not stack.' + NO_UPC,
  }),
];

const ROWS = BATCH339_KYR6E_T149E;
if (ROWS.length !== 11) throw new Error(`batch339 count ${ROWS.length}`);
const expect: Record<string, { verdict: RatingRecord['verdict']; limited: number; note: boolean }> = {
  'zand-b339-orange-c-lozenges-45': { verdict: 'caution', limited: 1, note: false },
  'zand-b339-lemon-zinc-lozenges-45': { verdict: 'clean', limited: 0, note: false },
  'zand-b339-cherry-echinacea-lozenges-45': { verdict: 'caution', limited: 1, note: false },
  'zand-b339-lemon-honey-syrup': { verdict: 'caution', limited: 1, note: false },
  'zand-b339-kids-cherry-syrup-4': { verdict: 'caution', limited: 0, note: false },
  'zand-b339-elderberry-kids-syrup-4': { verdict: 'caution', limited: 0, note: false },
  'zand-b339-insure-liquid-8': { verdict: 'caution', limited: 1, note: false },
  'zand-b339-elderberry-honey-syrup-4': { verdict: 'caution', limited: 1, note: false },
  'zand-b339-elderberry-zinc-gummies-60': { verdict: 'avoid', limited: 0, note: false },
  'zand-b339-immune-fast-elderberry-30': { verdict: 'avoid', limited: 3, note: true },
  'zand-b339-immune-fast-orange-30': { verdict: 'caution', limited: 2, note: false },
};
for (const record of ROWS) {
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`${record.id} barcode`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== want.limited) throw new Error(`${record.id} stack ${counted.map((i) => i.name).join('|')}`);
  if (want.note) {
    if (!record.honestNote || !/t137u/.test(record.honestNote)) throw new Error(`${record.id} note ${record.honestNote}`);
    for (const name of ['Maltodextrin', 'Natural Flavors', 'Stevia (leaf extract)']) {
      if (!record.honestNote.includes(name)) throw new Error(`${record.id} missing ${name}`);
    }
  } else if (record.honestNote) {
    throw new Error(`${record.id} unexpected note ${record.honestNote}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`${record.id} blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`${record.id} generic ${ingredient.name}: ${why}`);
    }
  }
}
