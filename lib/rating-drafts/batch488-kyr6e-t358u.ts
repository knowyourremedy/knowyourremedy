// DRAFT / not verified / batch 488 KYR6-e (t358u).
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
import { t358uResolve } from '../scan-preview/t358uLocks';
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
  return t358uResolve(name, form);
}

function locked(name: string, form: string, productName: string): IngredientFlag {
  const useForm = /fish body oil/i.test(name) && /\bfish oil\b/i.test(productName) && /\bsoftgel\b/i.test(form)
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
  if (!hit || !why) throw new Error(`t358u unlocked ${name}`);
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

export const BATCH488_KYR6E_T358U: RatingRecord[] = [

  row(
    "sg-b488-skin-nails-hair-tablets-80",
    "Solgar Skin Nails Hair Tablets, 80",
    "tablet",
    "skin-nails-hair-tablets",
    "033984717350",
    [
      "Vitamin C (as L-Ascorbic Acid)",
      "Zinc (as Zinc Citrate)",
      "Copper (as Copper Glycinate Amino Acid Chelate)",
      "MSM (as OptiMSM)",
      "Silicon (as L. calcareum, Silicon Dioxide)",
      "L-Proline",
      "L-Lysine (as L-Lysine Hydrochloride)",
      "Microcrystalline Cellulose",
      "Stearic Acid",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-skin-nails-hair-tablets-120",
    "Solgar Skin Nails Hair Tablets, 120",
    "tablet",
    "skin-nails-hair-tablets",
    "033984017368",
    [
      "Vitamin C (as L-Ascorbic Acid)",
      "Zinc (as Zinc Citrate)",
      "Copper (as Copper Glycinate Amino Acid Chelate)",
      "MSM (as OptiMSM)",
      "Silicon (as L. calcareum, Silicon Dioxide)",
      "L-Proline",
      "L-Lysine (as L-Lysine Hydrochloride)",
      "Microcrystalline Cellulose",
      "Stearic Acid",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-full-spectrum-curcumin-liquid-extract-softgels-90",
    "Solgar Full Spectrum Curcumin Liquid Extract Softgels, 90",
    "softgel",
    "full-spectrum-curcumin-liquid-extract-softgels",
    "033984547087",
    [
      "full spectrum Curcumin liquid extract",
      "Full Spectrum Curcumin",
      "Turmeric extract",
      "Gelatin",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-full-spectrum-curcumin-liquid-extract-softgels-30",
    "Solgar Full Spectrum Curcumin Liquid Extract Softgels, 30",
    "softgel",
    "full-spectrum-curcumin-liquid-extract-softgels",
    "033984595972",
    [
      "full spectrum Curcumin liquid extract",
      "Full Spectrum Curcumin",
      "Turmeric extract",
      "Gelatin",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-full-spectrum-curcumin-liquid-extract-softgels-60",
    "Solgar Full Spectrum Curcumin Liquid Extract Softgels, 60",
    "softgel",
    "full-spectrum-curcumin-liquid-extract-softgels",
    "033984547070",
    [
      "full spectrum Curcumin liquid extract",
      "Full Spectrum Curcumin",
      "Turmeric extract",
      "Gelatin",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-megasorb-coq-10-100-mg-softgels-90",
    "Solgar Megasorb Coq 10 100 mg Softgels, 90",
    "softgel",
    "megasorb-coq-10-100-mg-softgels",
    "033984009141",
    [
      "Megasorb Coenzyme Q-10 (as Ubiquinone)",
      "Rice Bran Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Soy Lecithin",
      "Paprika",
      "Titanium Dioxide color",
    ],
  ),
  row(
    "sg-b488-megasorb-coq-10-100-mg-softgels-60",
    "Solgar Megasorb Coq 10 100 mg Softgels, 60",
    "softgel",
    "megasorb-coq-10-100-mg-softgels",
    "033984009523",
    [
      "Megasorb Coenzyme Q-10 (as Ubiquinone)",
      "Rice Bran Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Soy Lecithin",
      "Paprika",
      "Titanium Dioxide color",
    ],
  ),
  row(
    "sg-b488-megasorb-coq-10-100-mg-softgels-30",
    "Solgar Megasorb Coq 10 100 mg Softgels, 30",
    "softgel",
    "megasorb-coq-10-100-mg-softgels",
    "033984009479",
    [
      "Megasorb Coenzyme Q-10 (as Ubiquinone)",
      "Rice Bran Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Soy Lecithin",
      "Paprika",
      "Titanium Dioxide color",
    ],
  ),
  row(
    "sg-b488-b-complex-50-vegetable-capsules-250",
    "Solgar B Complex 50 Vegetable Capsules, 250",
    "capsule",
    "b-complex-50-vegetable-capsules",
    "033984011229",
    [
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Niacin (as Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin (as D-Biotin)",
      "Pantothenic Acid (as D-Calcium Pantothenate, Vitamin B5)",
      "Choline (as Choline Bitartrate)",
      "Inositol",
      "Kelp",
      "Acerola extract complex",
      "Alfalfa",
      "Parsley",
      "Rose Hips",
      "Watercress",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
      "Microcrystalline Cellulose",
    ],
  ),
  row(
    "sg-b488-b-complex-50-vegetable-capsules-50",
    "Solgar B Complex 50 Vegetable Capsules, 50",
    "capsule",
    "b-complex-50-vegetable-capsules",
    "033984011205",
    [
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Niacin (as Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin (as D-Biotin)",
      "Pantothenic Acid (as D-Calcium Pantothenate, Vitamin B5)",
      "Choline (as Choline Bitartrate)",
      "Inositol",
      "Kelp",
      "Acerola extract complex",
      "Alfalfa",
      "Parsley",
      "Rose Hips",
      "Watercress",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
      "Microcrystalline Cellulose",
    ],
  ),
  row(
    "sg-b488-b-complex-50-vegetable-capsules-100",
    "Solgar B Complex 50 Vegetable Capsules, 100",
    "capsule",
    "b-complex-50-vegetable-capsules",
    "033984011212",
    [
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Niacin (as Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin (as D-Biotin)",
      "Pantothenic Acid (as D-Calcium Pantothenate, Vitamin B5)",
      "Choline (as Choline Bitartrate)",
      "Inositol",
      "Kelp",
      "Acerola extract complex",
      "Alfalfa",
      "Parsley",
      "Rose Hips",
      "Watercress",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
      "Microcrystalline Cellulose",
    ],
  ),
  row(
    "sg-b488-solgar-milk-thistle-vegetable-capsules-100",
    "Solgar Solgar Milk Thistle Vegetable Capsules, 100",
    "capsule",
    "solgar-milk-thistle-vegetable-capsules",
    "033984039728",
    [
      "standardized Milk Thistle extract (as Silymarin)",
      "Milk Thistle powder",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b488-solgar-milk-thistle-vegetable-capsules-250",
    "Solgar Solgar Milk Thistle Vegetable Capsules, 250",
    "capsule",
    "solgar-milk-thistle-vegetable-capsules",
    "033984039735",
    [
      "standardized Milk Thistle extract (as Silymarin)",
      "Milk Thistle powder",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b488-solgar-red-yeast-rice-vegetable-capsules-120",
    "Solgar Solgar Red Yeast Rice Vegetable Capsules, 120",
    "capsule",
    "solgar-red-yeast-rice-vegetable-capsules",
    "033984023253",
    [
      "organic Red Yeast Rice powder",
      "Vegetable Cellulose",
      "Microcrystalline Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "sg-b488-solgar-red-yeast-rice-vegetable-capsules-60",
    "Solgar Solgar Red Yeast Rice Vegetable Capsules, 60",
    "capsule",
    "solgar-red-yeast-rice-vegetable-capsules",
    "033984023246",
    [
      "organic Red Yeast Rice powder",
      "Vegetable Cellulose",
      "Microcrystalline Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "sg-b488-vitamin-b1-thiamin-500-mg-tablets-100",
    "Solgar Vitamin B1 Thiamin 500 mg Tablets, 100",
    "tablet",
    "vitamin-b1-thiamin-500-mg-tablets",
    "033984029804",
    [
      "Vitamin B1 (as Thiamine Hydrochloride)",
      "Microcrystalline Cellulose",
      "Dicalcium Phosphate",
      "Vegetable Cellulose",
      "Stearic Acid",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-megasorb-coq-10-200-mg-softgels-30",
    "Solgar Megasorb Coq 10 200 mg Softgels, 30",
    "softgel",
    "megasorb-coq-10-200-mg-softgels",
    "033984009592",
    [
      "Megasorb Coenzyme Q-10 (as Ubiquinone)",
      "Rice Bran Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Soy Lecithin",
      "Paprika",
      "Titanium Dioxide color",
    ],
  ),
  row(
    "sg-b488-megasorb-coq-10-200-mg-softgels-60",
    "Solgar Megasorb Coq 10 200 mg Softgels, 60",
    "softgel",
    "megasorb-coq-10-200-mg-softgels",
    "033984009684",
    [
      "Megasorb Coenzyme Q-10 (as Ubiquinone)",
      "Rice Bran Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Soy Lecithin",
      "Paprika",
      "Titanium Dioxide color",
    ],
  ),
  row(
    "sg-b488-vitamin-b1-thiamin-100-mg-vegetable-capsules-100",
    "Solgar Vitamin B1 Thiamin 100 mg Vegetable Capsules, 100",
    "capsule",
    "vitamin-b1-thiamin-100-mg-vegetable-capsules",
    "033984029507",
    [
      "Vitamin B1 (as Thiamine Hydrochloride)",
      "Vegetable Cellulose",
      "Silica",
      "Microcrystalline Cellulose",
      "Vegetable Magnesium Stearate",
    ],
  ),
  row(
    "sg-b488-fp-cinnamon-vegetable-capsules-100",
    "Solgar Fp Cinnamon Vegetable Capsules, 100",
    "capsule",
    "fp-cinnamon-vegetable-capsules",
    "033984008779",
    [
      "Cinnamon extract",
      "Cinnamon powder",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "sg-b488-b-complex-100-tablets-100",
    "Solgar B Complex 100 Tablets, 100",
    "tablet",
    "b-complex-100-tablets",
    "033984011618",
    [
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Niacin (as Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin (as D-Biotin)",
      "Pantothenic Acid (as D-Calcium Pantothenate, Vitamin B5)",
      "Choline (as Choline Bitartrate)",
      "Inositol",
      "Kelp",
      "Acerola extract complex",
      "Alfalfa",
      "Parsley",
      "Rose Hips",
      "Watercress",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
      "Titanium Dioxide",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-b-complex-100-tablets-250",
    "Solgar B Complex 100 Tablets, 250",
    "tablet",
    "b-complex-100-tablets",
    "033984011625",
    [
      "Thiamine (as Thiamine Mononitrate, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Niacin (as Niacinamide, Vitamin B3)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Biotin (as D-Biotin)",
      "Pantothenic Acid (as D-Calcium Pantothenate, Vitamin B5)",
      "Choline (as Choline Bitartrate)",
      "Inositol",
      "Kelp",
      "Acerola extract complex",
      "Alfalfa",
      "Parsley",
      "Rose Hips",
      "Watercress",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
      "Titanium Dioxide",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-extra-strength-glucosamine-chondroitin-complex-tablets-150",
    "Solgar Extra Strength Glucosamine Chondroitin Complex Tablets, 150",
    "tablet",
    "extra-strength-glucosamine-chondroitin-complex-tablets",
    "033984012882",
    [
      "Vitamin C (as Calcium Ascorbate)",
      "Manganese (as Manganese Glycinate Chelate)",
      "Sodium Chondroitin Sulfate",
      "Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)",
      "Vegetable Cellulose",
      "Microcrystalline Cellulose",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Stearic Acid",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-extra-strength-glucosamine-chondroitin-complex-tablets-300",
    "Solgar Extra Strength Glucosamine Chondroitin Complex Tablets, 300",
    "tablet",
    "extra-strength-glucosamine-chondroitin-complex-tablets",
    "033984012967",
    [
      "Vitamin C (as Calcium Ascorbate)",
      "Manganese (as Manganese Glycinate Chelate)",
      "Sodium Chondroitin Sulfate",
      "Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)",
      "Vegetable Cellulose",
      "Microcrystalline Cellulose",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Stearic Acid",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-extra-strength-glucosamine-chondroitin-complex-tablets-75",
    "Solgar Extra Strength Glucosamine Chondroitin Complex Tablets, 75",
    "tablet",
    "extra-strength-glucosamine-chondroitin-complex-tablets",
    "033984012875",
    [
      "Vitamin C (as Calcium Ascorbate)",
      "Manganese (as Manganese Glycinate Chelate)",
      "Sodium Chondroitin Sulfate",
      "Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)",
      "Vegetable Cellulose",
      "Microcrystalline Cellulose",
      "Silica",
      "Vegetable Magnesium Stearate",
      "Stearic Acid",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b488-resveratrol-250-mg-with-red-wine-extract-softgels-60",
    "Solgar Resveratrol 250 mg With Red Wine Extract Softgels, 60",
    "softgel",
    "resveratrol-250-mg-with-red-wine-extract-softgels",
    "033984024847",
    [
      "Trans-Resveratrol",
      "Red Wine extract",
      "Soybean Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Soy Lecithin",
      "yellow Beeswax",
      "Caramel",
      "Silica",
      "Titanium Dioxide",
    ],
  ),
  row(
    "sg-b488-resveratrol-250-mg-with-red-wine-extract-softgels-30",
    "Solgar Resveratrol 250 mg With Red Wine Extract Softgels, 30",
    "softgel",
    "resveratrol-250-mg-with-red-wine-extract-softgels",
    "033984023369",
    [
      "Trans-Resveratrol",
      "Red Wine extract",
      "Soybean Oil",
      "Gelatin",
      "Vegetable Glycerin",
      "Soy Lecithin",
      "yellow Beeswax",
      "Caramel",
      "Silica",
      "Titanium Dioxide",
    ],
  ),
];

const T358U_EXPECT: Array<[string, RatingRecord["verdict"], boolean, string]> = [
  ["sg-b488-skin-nails-hair-tablets-80", "caution", false, "033984717350"],
  ["sg-b488-skin-nails-hair-tablets-120", "caution", false, "033984017368"],
  ["sg-b488-full-spectrum-curcumin-liquid-extract-softgels-90", "clean", false, "033984547087"],
  ["sg-b488-full-spectrum-curcumin-liquid-extract-softgels-30", "clean", false, "033984595972"],
  ["sg-b488-full-spectrum-curcumin-liquid-extract-softgels-60", "clean", false, "033984547070"],
  ["sg-b488-megasorb-coq-10-100-mg-softgels-90", "avoid", false, "033984009141"],
  ["sg-b488-megasorb-coq-10-100-mg-softgels-60", "avoid", false, "033984009523"],
  ["sg-b488-megasorb-coq-10-100-mg-softgels-30", "avoid", false, "033984009479"],
  ["sg-b488-b-complex-50-vegetable-capsules-250", "caution", false, "033984011229"],
  ["sg-b488-b-complex-50-vegetable-capsules-50", "caution", false, "033984011205"],
  ["sg-b488-b-complex-50-vegetable-capsules-100", "caution", false, "033984011212"],
  ["sg-b488-solgar-milk-thistle-vegetable-capsules-100", "clean", false, "033984039728"],
  ["sg-b488-solgar-milk-thistle-vegetable-capsules-250", "clean", false, "033984039735"],
  ["sg-b488-solgar-red-yeast-rice-vegetable-capsules-120", "caution", false, "033984023253"],
  ["sg-b488-solgar-red-yeast-rice-vegetable-capsules-60", "caution", false, "033984023246"],
  ["sg-b488-vitamin-b1-thiamin-500-mg-tablets-100", "caution", false, "033984029804"],
  ["sg-b488-megasorb-coq-10-200-mg-softgels-30", "avoid", false, "033984009592"],
  ["sg-b488-megasorb-coq-10-200-mg-softgels-60", "avoid", false, "033984009684"],
  ["sg-b488-vitamin-b1-thiamin-100-mg-vegetable-capsules-100", "caution", false, "033984029507"],
  ["sg-b488-fp-cinnamon-vegetable-capsules-100", "caution", false, "033984008779"],
  ["sg-b488-b-complex-100-tablets-100", "avoid", false, "033984011618"],
  ["sg-b488-b-complex-100-tablets-250", "avoid", false, "033984011625"],
  ["sg-b488-extra-strength-glucosamine-chondroitin-complex-tablets-150", "caution", false, "033984012882"],
  ["sg-b488-extra-strength-glucosamine-chondroitin-complex-tablets-300", "caution", false, "033984012967"],
  ["sg-b488-extra-strength-glucosamine-chondroitin-complex-tablets-75", "caution", false, "033984012875"],
  ["sg-b488-resveratrol-250-mg-with-red-wine-extract-softgels-60", "avoid", false, "033984024847"],
  ["sg-b488-resveratrol-250-mg-with-red-wine-extract-softgels-30", "avoid", false, "033984023369"],
];

for (const [id, verdict, note, barcode] of T358U_EXPECT) {
  const found = BATCH488_KYR6E_T358U.find((record) => record.id === id);
  if (!found || found.verdict !== verdict || Boolean(found.honestNote) !== note || (found.barcode ?? '') !== barcode) {
    throw new Error(id);
  }
}
