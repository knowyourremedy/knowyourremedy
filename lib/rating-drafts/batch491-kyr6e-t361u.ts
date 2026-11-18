// DRAFT / not verified / batch 491 KYR6-e (t361u).
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
import { t361uResolve } from '../scan-preview/t361uLocks';
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
  return t361uResolve(name, form);
}

function locked(name: string, form: string, productName: string): IngredientFlag {
  const useForm = /flaxseed oil/i.test(name) && /flaxseed oil|omega 3 6 9/i.test(productName)
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
  if (!hit || !why) throw new Error(`t361u unlocked ${name}`);
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

export const BATCH491_KYR6E_T361U: RatingRecord[] = [

  row(
    "sg-b491-north-atlantic-kelp-tablets-250",
    "Solgar North Atlantic Kelp Tablets, 250",
    "tablet",
    "north-atlantic-kelp-tablets",
    "033984015005",
    [
      "Iodine",
      "Microcrystalline Cellulose",
      "Dicalcium Phosphate",
      "North Atlantic Kelp",
      "Stearic Acid",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Potassium Iodide",
    ],
  ),
  row(
    "sg-b491-menopause-relief-tablets-30",
    "Solgar Menopause Relief Tablets, 30",
    "tablet",
    "menopause-relief-tablets",
    "033984005891",
    [
      "Affron (as Saffron Stigma Extract)",
      "ERr 731 (as Rhapontic Rhubarb Root Extract)",
      "Dicalcium Phosphate",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Silica",
      "Vegetable Stearic Acid",
      "Sodium Alginate",
      "Vegetable Magnesium Stearate",
      "Ammonium Hydroxide",
      "Medium Chain Triglycerides",
      "Oleic Acid",
    ],
  ),
  row(
    "sg-b491-liquid-melatonin-10-mg-natural-black-cherry-flavor-2",
    "Solgar Liquid Melatonin 10 mg Natural Black Cherry Flavor, 2 fl oz",
    "liquid",
    "liquid-melatonin-10-mg-natural-black-cherry-flavor",
    "033984503809",
    [
      "Melatonin",
      "Vegetable Glycerin",
      "Water",
      "natural Black Carrot concentrate",
      "Black Currant concentrate",
      "Citric Acid",
      "natural Black Cherry flavor",
      "Sodium Gluconate",
      "Sodium Benzoate",
      "Potassium Sorbate",
    ],
  ),
  row(
    "sg-b491-probi-20-billion-vegetable-capsules-30",
    "Solgar Probi 20 Billion Vegetable Capsules, 30",
    "capsule",
    "probi-20-billion-vegetable-capsules",
    "033984539242",
    [
      "Lactobacillus plantarum LP299v",
      "Potato Starch",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b491-probi-30-billion-vegetable-capsules-30",
    "Solgar Probi 30 Billion Vegetable Capsules, 30",
    "capsule",
    "probi-30-billion-vegetable-capsules",
    "033984539259",
    [
      "Lactobacillus plantarum",
      "Potato Starch",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b491-comfort-zone-digestive-complex-vegetable-capsules-90",
    "Solgar Comfort Zone Digestive Complex Vegetable Capsules, 90",
    "capsule",
    "comfort-zone-digestive-complex-vegetable-capsules",
    "033984512993",
    [
      "Amylase",
      "Protease",
      "Lactase",
      "Pectinase, Phytase (as Pectinase, Phytase)",
      "Lipase",
      "Bromelain",
      "Cellulase",
      "Papain",
      "Invertase",
      "Maltase",
      "Alpha-Galactosidase",
      "Cumin powder",
      "Fennel extract",
      "Chamomile",
      "Ginger extract",
      "Anise powder",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Silica",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b491-astaxanthin-10-mg-softgels-30",
    "Solgar Astaxanthin 10 mg Softgels, 30",
    "softgel",
    "astaxanthin-10-mg-softgels",
    "033984362048",
    [
      "Astaxanthin (as H. pluvialis)",
      "Sunflower seed Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "contains naturally occurring Carotenoids",
    ],
  ),
  row(
    "sg-b491-solgar-omega-3-6-9-1300-mg-softgels-60",
    "Solgar Solgar Omega 3 6 9 1300 mg Softgels, 60",
    "softgel",
    "solgar-omega-3-6-9-1300-mg-softgels",
    "033984020276",
    [
      "Fish Oil",
      "Flaxseed Oil",
      "Borage Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Mixed Tocopherols",
    ],
  ),
  row(
    "sg-b491-prenatal-nutrients-tablets-120",
    "Solgar Prenatal Nutrients Tablets, 120",
    "tablet",
    "prenatal-nutrients-tablets",
    "033984022720",
    [
      "Vitamin A (as Beta-Carotene)",
      "Vitamin C (as L-Ascorbic Acid)",
      "Vitamin D (as Ergocalciferol)",
      "Vitamin E (as D-Alpha-Tocopheryl Succinate)",
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Niacin (as Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin",
      "Pantothenic Acid (as D-Calcium Pantothenate)",
      "Calcium (as Calcium Carbonate, Calcium Citrate)",
      "Iron (as Ferrous Bisglycinate Chelate)",
      "Iodine (as Potassium Iodide)",
      "Magnesium (as Magnesium Citrate, Magnesium Oxide)",
      "Zinc (as Zinc Glycinate Chelate, Zinc Oxide)",
      "Selenium (as L-Selenomethionine)",
      "Copper (as Albion Copper Glycinate Amino Acid Chelate, Copper Gluconate)",
      "Manganese (as Manganese Gluconate, Manganese Glycinate Chelate)",
      "Chromium (as Chromium Picolinate)",
      "Potassium (as Potassium Amino Acid Complex, Potassium Gluconate)",
      "Inositol",
      "Choline Bitartrate",
      "Soy Protein isolate",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Stearic Acid",
      "Purple Carrot",
      "Vegetable Glycerin",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Titanium Dioxide color",
    ],
  ),
];

export const T361U_EXPECT: Array<[string, RatingRecord["verdict"], boolean, string]> = [
  ["sg-b491-north-atlantic-kelp-tablets-250", "clean", false, "033984015005"],
  ["sg-b491-menopause-relief-tablets-30", "caution", false, "033984005891"],
  ["sg-b491-liquid-melatonin-10-mg-natural-black-cherry-flavor-2", "caution", false, "033984503809"],
  ["sg-b491-probi-20-billion-vegetable-capsules-30", "clean", false, "033984539242"],
  ["sg-b491-probi-30-billion-vegetable-capsules-30", "clean", false, "033984539259"],
  ["sg-b491-comfort-zone-digestive-complex-vegetable-capsules-90", "caution", false, "033984512993"],
  ["sg-b491-astaxanthin-10-mg-softgels-30", "caution", false, "033984362048"],
  ["sg-b491-solgar-omega-3-6-9-1300-mg-softgels-60", "caution", false, "033984020276"],
  ["sg-b491-prenatal-nutrients-tablets-120", "avoid", false, "033984022720"],
];

for (const [id, verdict, note, barcode] of T361U_EXPECT) {
  const found = BATCH491_KYR6E_T361U.find((record) => record.id === id);
  if (!found || found.verdict !== verdict || Boolean(found.honestNote) !== note || (found.barcode ?? '') !== barcode) {
    throw new Error(id);
  }
}
