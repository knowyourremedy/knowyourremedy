// DRAFT / not verified / batch 490 KYR6-e (t360u).
// Solgar rows whose held panels are now fully locked.
// UPCs are DSLD label codes whose check digits pass.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t140uWhyForName } from '../scan-preview/t140uTokenWhy';
import { t146uWhyForName } from '../scan-preview/t146uTokenWhy';
import { t240uNorm } from '../scan-preview/t240uLocks';
import { t356uResolve } from '../scan-preview/t356uLocks';
import { t360uResolve } from '../scan-preview/t360uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const STACK_NOTE = 'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

function bareName(name: string): string {
  let current = name;
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\([^()]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function asInner(name: string): string {
  return name.match(/\(\s*as\s+([^)]+)\)/i)?.[1]?.trim() ?? '';
}

function resolve(name: string, form: string) {
  if (t240uNorm(name) === 'pantothenic acid as d calcium pantothenate vitamin b5') {
    return t356uResolve('Pantothenic Acid (as D-Calcium Pantothenate) (B5)', form);
  }
  return t360uResolve(name, form);
}

function locked(name: string, form: string, productName: string): IngredientFlag {
  const useForm = /flaxseed oil/i.test(name) && /flaxseed oil/i.test(productName)
    ? `${form} base`
    : form;
  const hit = resolve(name, useForm);
  const inner = asInner(name);
  const why = hit?.lock.why
    || t140uWhyForName(name)
    || t139uWhyForName(name, useForm)
    || t138uWhyForName(name)
    || t135uWhyForName(name, useForm)
    || t134uWhyForName(name)
    || t128uWhyForName(name)
    || t146uWhyForName(name)
    || cleanTokenWhyForName(name)
    || t139uWhyForName(bareName(name), useForm)
    || t140uWhyForName(bareName(name))
    || t146uWhyForName(bareName(name))
    || t140uWhyForName(inner)
    || t134uWhyForName(inner)
    || t138uWhyForName(inner)
    || t146uWhyForName(inner)
    || cleanTokenWhyForName(inner)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t360u unlocked ${name}`);
  const grade = hit.lock.grade;
  const counts = hit.lock.counts;
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited' && counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'limited'
        ? `Methodology §5 Limited (founder lock ${mark}). Does not count toward the t137u stack.`
        : grade === 'moderate'
          ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
          : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function row(id: string, name: string, form: string, handle: string, barcode: string | undefined, names: string[]): RatingRecord {
  const inactiveIngredients = names.map((ingredient) => locked(ingredient, form, name));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const record: RatingRecord = {
    id,
    productName: name,
    brand: 'Solgar',
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Solgar'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    ...(barcode ? { barcode } : {}),
    sourcesGeneral: [
      barcode
        ? `https://www.solgar.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`
        : `https://www.solgar.com/products/${handle} Brand page. DSLD label. No sourced UPC.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH490_KYR6E_T360U: RatingRecord[] = [

  row(
    "sg-b490-megasorb-b-complex-50-tablets-100",
    "Solgar Megasorb B Complex 50 Tablets, 100",
    "tablet",
    "megasorb-b-complex-50-tablets",
    "033984017511",
    [
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Riboflavin, Riboflavin 5-Phosphate)",
      "Niacin (as Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxal 5-Phosphate, Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin (as D-Biotin)",
      "Pantothenic Acid (as Calcium D-Pantothenate, Pantethine, Vitamin B5)",
      "Choline (as Choline Bitartrate)",
      "Magnesium (as Magnesium Citrate, Magnesium Oxide)",
      "Soy Lecithin",
      "Inositol",
      "Microcrystalline Cellulose",
      "Silica",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
      "Riboflavin",
    ],
  ),
  row(
    "sg-b490-earth-source-organic-flaxseed-oil-16",
    "Solgar Earth Source Organic Flaxseed Oil, 16",
    "liquid",
    "earth-source-organic-flaxseed-oil",
    "033984011328",
    [
      "organic Flaxseed Oil",
      "cold pressed organic Flaxseed Oil",
    ],
  ),
  row(
    "sg-b490-reishi-shiitake-maitake-mushroom-extract-vegetable-capsules-50",
    "Solgar Reishi Shiitake Maitake Mushroom Extract Vegetable Capsules, 50",
    "capsule",
    "reishi-shiitake-maitake-mushroom-extract-vegetable-capsules",
    "033984023277",
    [
      "organic Red Reishi Mushroom extract",
      "organic Shiitake Mushroom extract",
      "organic Maitake Mushroom extract",
      "organic Red Reishi Mushroom extract (as Beta-Glucans, Triterpenoids)",
      "Shiitake Mushroom extract",
      "Vegetable Cellulose",
      "Microcrystalline Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b490-policosanol-20-mg-vegetable-capsules-100",
    "Solgar Policosanol 20 mg Vegetable Capsules, 100",
    "capsule",
    "policosanol-20-mg-vegetable-capsules",
    "033984022515",
    [
      "Policosanol",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b490-extra-strength-glucosamine-chondroitin-msm-with-ester-c-tablets-180",
    "Solgar Extra Strength Glucosamine Chondroitin Msm With Ester C Tablets, 180",
    "tablet",
    "extra-strength-glucosamine-chondroitin-msm-with-ester-c-tablets",
    "033984012721",
    [
      "Vitamin C (as Ester-C)",
      "Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)",
      "Sodium Chondroitin Sulfate",
      "MSM (as OptiMSM)",
      "Stearic Acid",
      "Vegetable Cellulose",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b490-solgar-l-carnitine-500-mg-tablets-60",
    "Solgar Solgar L Carnitine 500 mg Tablets, 60",
    "tablet",
    "solgar-l-carnitine-500-mg-tablets",
    "033984005716",
    [
      "L-Carnitine",
      "Microcrystalline Cellulose",
      "Dicalcium Phosphate",
      "Vegetable Cellulose",
      "Silica",
      "Stearic Acid",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
      "Titanium Dioxide",
    ],
  ),
  row(
    "sg-b490-solgar-niacin-vitamin-b3-500-mg-vegetable-capsules-100",
    "Solgar Solgar Niacin Vitamin B3 500 mg Vegetable Capsules, 100",
    "capsule",
    "solgar-niacin-vitamin-b3-500-mg-vegetable-capsules",
    "033984018518",
    [
      "Niacin (as Nicotinic Acid)",
      "Vegetable Cellulose",
      "Magnesium Stearate",
    ],
  ),
  row(
    "sg-b490-royal-jelly-500-softgels-30",
    "Solgar Royal Jelly 500 Softgels, 30",
    "softgel",
    "royal-jelly-500-softgels",
    "033984024304",
    [
      "Royal Jelly concentrate",
      "Safflower Oil",
      "Gelatin",
      "yellow Beeswax",
      "Soy Lecithin",
      "Glycerin",
    ],
  ),
  row(
    "sg-b490-beta-glucans-tablets-60",
    "Solgar Beta Glucans Tablets, 60",
    "tablet",
    "beta-glucans-tablets",
    "033984002357",
    [
      "Beta Glucans (as Beta 1-3 Glucan, Beta 1-6 Glucans, Yeast cell wall extract)",
      "Microcrystalline Cellulose",
      "Stearic Acid",
      "Vegetable Cellulose",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b490-ultimate-bc-complex-tablets-90",
    "Solgar Ultimate Bc Complex Tablets, 90",
    "tablet",
    "ultimate-bc-complex-tablets",
    "033984027725",
    [
      "Vitamin C (as L-Ascorbic Acid)",
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Niacin (as Niacin, Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin (as D-Biotin)",
      "Pantothenic Acid (as D-Calcium Pantothenate, Vitamin B5)",
      "Choline (as Choline Bitartrate)",
      "Inositol",
      "Citrus Bioflavonoid Complex",
      "Rose Hips",
      "Hesperidin",
      "Rutin",
      "Betaine (as Betaine HCl)",
      "L-Glutamic Acid",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Stearic Acid",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b490-bilberry-ginkgo-eyebright-complex-vegetable-capsules-60",
    "Solgar Bilberry Ginkgo Eyebright Complex Vegetable Capsules, 60",
    "capsule",
    "bilberry-ginkgo-eyebright-complex-vegetable-capsules",
    "033984003156",
    [
      "Vitamin A (as Beta-Carotene, Retinyl Palmitate)",
      "Vitamin C (as Calcium Ascorbate)",
      "Vitamin E (as D-Alpha-Tocopheryl Acid Succinate)",
      "Zinc (as Zinc Glycinate)",
      "Selenium (as L-Selenomethionine)",
      "Eyebright extract",
      "Bilberry Extract",
      "Ginkgo biloba leaf extract",
      "NAC",
      "Taurine",
      "Carotenoid Mix",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Microcrystalline Cellulose",
      "Caramel",
      "Maltodextrin",
    ],
  ),
  row(
    "sg-b490-fp-super-ginkgo-vegetable-capsules-120",
    "Solgar Fp Super Ginkgo Vegetable Capsules, 120",
    "capsule",
    "fp-super-ginkgo-vegetable-capsules",
    "033984039155",
    [
      "standardized Ginkgo biloba extract (as Ginkgo Flavonol Glycosides)",
      "Ginkgo biloba powder",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b490-pycnogenol-100-mg-vegetable-capsules-30",
    "Solgar Pycnogenol 100 mg Vegetable Capsules, 30",
    "capsule",
    "pycnogenol-100-mg-vegetable-capsules",
    "033984023062",
    [
      "Pycnogenol extract",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b490-non-gmo-super-concentrated-isoflavones-tablets-120",
    "Solgar Non Gmo Super Concentrated Isoflavones Tablets, 120",
    "tablet",
    "non-gmo-super-concentrated-isoflavones-tablets",
    "033984014596",
    [
      "total Soy Isoflavones (as Soy germ extract)",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Silica",
      "Caramel color",
      "Titanium Dioxide color",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
];

export const T360U_EXPECT: Array<[string, RatingRecord["verdict"], boolean, string]> = [
  ["sg-b490-megasorb-b-complex-50-tablets-100", "caution", false, "033984017511"],
  ["sg-b490-earth-source-organic-flaxseed-oil-16", "caution", false, "033984011328"],
  ["sg-b490-reishi-shiitake-maitake-mushroom-extract-vegetable-capsules-50", "clean", false, "033984023277"],
  ["sg-b490-policosanol-20-mg-vegetable-capsules-100", "clean", false, "033984022515"],
  ["sg-b490-extra-strength-glucosamine-chondroitin-msm-with-ester-c-tablets-180", "caution", false, "033984012721"],
  ["sg-b490-solgar-l-carnitine-500-mg-tablets-60", "avoid", false, "033984005716"],
  ["sg-b490-solgar-niacin-vitamin-b3-500-mg-vegetable-capsules-100", "clean", false, "033984018518"],
  ["sg-b490-royal-jelly-500-softgels-30", "caution", false, "033984024304"],
  ["sg-b490-beta-glucans-tablets-60", "caution", false, "033984002357"],
  ["sg-b490-ultimate-bc-complex-tablets-90", "caution", false, "033984027725"],
  ["sg-b490-bilberry-ginkgo-eyebright-complex-vegetable-capsules-60", "caution", false, "033984003156"],
  ["sg-b490-fp-super-ginkgo-vegetable-capsules-120", "clean", false, "033984039155"],
  ["sg-b490-pycnogenol-100-mg-vegetable-capsules-30", "clean", false, "033984023062"],
  ["sg-b490-non-gmo-super-concentrated-isoflavones-tablets-120", "avoid", false, "033984014596"],
];

for (const [id, verdict, note, barcode] of T360U_EXPECT) {
  const found = BATCH490_KYR6E_T360U.find((record) => record.id === id);
  if (!found || found.verdict !== verdict || Boolean(found.honestNote) !== note || (found.barcode ?? '') !== barcode) {
    throw new Error(id);
  }
}
