// DRAFT / not verified / batch 483 KYR6-e (t353u).
// Nature's Truth rows whose on-market DSLD panels are fully locked.
// UPCs are the DSLD label codes whose check digits pass. No new locks.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t140uWhyForName } from '../scan-preview/t140uTokenWhy';
import { t146uWhyForName } from '../scan-preview/t146uTokenWhy';
import { t352uResolve } from '../scan-preview/t352uLocks';
import type { T320uHit } from '../scan-preview/t320uLocks';
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

function resolveHit(name: string, form: string): T320uHit | undefined {
  const direct = t352uResolve(name, form);
  if (direct) return direct;
  const latin = name.match(/^(.*?)\s*\(as\s+([A-Z][a-z]+ [a-z]+(?:\s+spp\.)?)\)\s*$/);
  if (!latin) return undefined;
  return t352uResolve(latin[1].trim(), form);
}

function locked(name: string, form: string, productName: string): IngredientFlag {
  const useForm = /fish body oil/i.test(name) && /\bfish oil\b/i.test(productName) && /\bsoftgel\b/i.test(form)
    ? `${form} base`
    : form;
  const hit = resolveHit(name, useForm);
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
  if (!hit || !why) throw new Error(`t353u unlocked ${name}`);
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
    brand: "Nature's Truth",
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Nature's Truth"],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    ...(barcode ? { barcode } : {}),
    sourcesGeneral: [
      barcode
        ? `https://naturestruth.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`
        : `https://naturestruth.com/products/${handle} Brand page. DSLD label. No sourced UPC.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH483_KYR6E_T353U: RatingRecord[] = [

  row(
    "nt-b483-high-potency-vitamin-d3-10000-iu-250-mcg-na11396-100",
    "Nature's Truth High Potency Vitamin D3 10,000 IU (250 mcg), 100",
    "softgel",
    "high-potency-vitamin-d3-10000-iu-250-mcg-na11396",
    "840093100702",
    [
      "Vitamin D (as Vitamin D3)",
      "Sunflower Oil",
      "Safflower Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-pumpkin-seed-oil-3000-mg-nt3646-75",
    "Nature's Truth Pumpkin Seed Oil 3000 mg, 75",
    "softgel",
    "pumpkin-seed-oil-3000-mg-nt3646",
    "840093123787",
    [
      "Extra Virgin Pumpkin Seed Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-melatonin-10-mg-plus-l-theanine-nt18284-72",
    "Nature's Truth Melatonin 10 mg plus L-Theanine, 72",
    "tablet",
    "melatonin-10-mg-plus-l-theanine-nt18284",
    "840093100825",
    [
      "Melatonin",
      "L-Theanine",
      "Dicalcium Phosphate",
      "Cellulose",
      "Crospovidone",
      "Magnesium Stearate",
      "Stearic Acid",
      "Silica",
    ],
  ),
  row(
    "nt-b483-vitamin-c-1000-mg-plus-rosehips-nt11246-100",
    "Nature's Truth Vitamin C 1000 mg Plus Rosehips, 100",
    "tablet",
    "vitamin-c-1000-mg-plus-rosehips-nt11246",
    "840093106032",
    [
      "Vitamin C (as Ascorbic Acid)",
      "Rose Hip (as Rosa canina)",
      "Cellulose",
      "Dicalcium Phosphate",
      "Croscarmellose",
      "Stearic Acid",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b483-vitamin-c-1000-mg-plus-rose-hips-timed-release-nt1370-60",
    "Nature's Truth Vitamin C 1000 mg plus Rose Hips Timed Release, 60",
    "tablet",
    "vitamin-c-1000-mg-plus-rose-hips-timed-release-nt1370",
    "840093101822",
    [
      "Vitamin C (as Ascorbic Acid)",
      "Rose Hips",
      "Cellulose",
      "Dicalcium Phosphate",
      "Stearic Acid",
      "Silica",
      "Magnesium Stearate",
      "Cellulose Coating",
    ],
  ),
  row(
    "nt-b483-vitamin-c-1000-mg-plus-bioflavonoids-rose-hips-nt1391-100",
    "Nature's Truth Vitamin C 1000 mg plus Bioflavonoids, Rose Hips, 100",
    "capsule",
    "vitamin-c-1000-mg-plus-bioflavonoids-rose-hips-nt1391",
    "840093100696",
    [
      "Vitamin C (as Ascorbic Acid)",
      "Citrus Bioflavonoids (as Citrus spp.)",
      "Rose Hip (as Rosa canina)",
      "Gelatin",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b483-slow-release-iron-45-mg-nt39743-60",
    "Nature's Truth Slow Release Iron 45 mg, 60",
    "tablet",
    "slow-release-iron-45-mg-nt39743",
    "840093101952",
    [
      "Iron",
      "Cellulose",
      "Hypromellose",
      "Stearic Acid",
      "Magnesium Stearate",
      "Silica",
      "Cellulose Coating",
      "FD&C Blue #2 Lake",
      "FD&C Red #40 Lake",
      "FD&C Yellow #6 Lake",
      "Titanium Dioxide",
    ],
  ),
  row(
    "nt-b483-vitamin-e-1000-iu-450-mg-nt11261-60",
    "Nature's Truth Vitamin E 1000 IU (450 mg), 60",
    "softgel",
    "vitamin-e-1000-iu-450-mg-nt11261",
    "840093106056",
    [
      "Vitamin E (as DL-Alpha-Tocopheryl Acetate)",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-vitamin-d3-2000-iu-50-mcg-nt7260-300",
    "Nature's Truth Vitamin D3 2000 IU (50 mcg), 300",
    "softgel",
    "vitamin-d3-2000-iu-50-mcg-nt7260",
    "840093103734",
    [
      "Vitamin D (as Vitamin D3)",
      "Sunflower Oil",
      "Safflower Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-vitamin-d3-2000-iu-50-mcg-nt7260-150",
    "Nature's Truth Vitamin D3 2000 IU (50 mcg), 150",
    "softgel",
    "vitamin-d3-2000-iu-50-mcg-nt7260",
    "840093101167",
    [
      "Vitamin D (as Vitamin D3)",
      "Sunflower Oil",
      "Safflower Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-liquid-vitamin-d3-5000-iu-125-mcg-nt1600-2",
    "Nature's Truth Liquid Vitamin D3, 5000 IU (125 mcg), 2 fl oz",
    "liquid",
    "liquid-vitamin-d3-5000-iu-125-mcg-nt1600",
    undefined,
    [
      "Vitamin D (as Vitamin D3)",
      "Sunflower seed Oil",
    ],
  ),
  row(
    "nt-b483-vitamin-d3-1000-iu-25-mcg-nt1581-130",
    "Nature's Truth Vitamin D3 1000 IU (25 mcg), 130",
    "softgel",
    "vitamin-d3-1000-iu-25-mcg-nt1581",
    "840093101501",
    [
      "Vitamin D (as Vitamin D3)",
      "Sunflower Oil",
      "Safflower Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-vitamin-d3-1000-iu-25-mcg-nt1581-250",
    "Nature's Truth Vitamin D3 1000 IU (25 mcg), 250",
    "softgel",
    "vitamin-d3-1000-iu-25-mcg-nt1581",
    "840093105318",
    [
      "Vitamin D (as Vitamin D3)",
      "Sunflower Oil",
      "Safflower Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-vitamin-c-500-mg-with-rose-hips-nt11231-110",
    "Nature's Truth Vitamin C 500 mg with Rose Hips, 110",
    "tablet",
    "vitamin-c-500-mg-with-rose-hips-nt11231",
    "840093106049",
    [
      "Vitamin C (as Ascorbic Acid)",
      "Rose Hip (as Rosa canina)",
      "Cellulose",
      "Croscarmellose",
      "Stearic Acid",
      "Dicalcium Phosphate",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b483-chromium-picolinate-1000-mcg-nt1751-90",
    "Nature's Truth Chromium Picolinate 1000 mcg, 90",
    "tablet",
    "chromium-picolinate-1000-mcg-nt1751",
    "840093101365",
    [
      "Chromium (as Chromium Picolinate)",
      "Dicalcium Phosphate",
      "Cellulose",
      "Magnesium Stearate",
      "Croscarmellose",
      "Silica",
      "Stearic Acid",
    ],
  ),
  row(
    "nt-b483-selenium-200-mcg-nt1851-100",
    "Nature's Truth Selenium 200 mcg, 100",
    "tablet",
    "selenium-200-mcg-nt1851",
    "840093101969",
    [
      "Selenium (as Selenium Yeast)",
      "Cellulose",
      "Magnesium Stearate",
      "Stearic Acid",
      "Croscarmellose",
      "Silica",
    ],
  ),
  row(
    "nt-b483-melatonin-10-mg-liquid-delicious-berry-nt531-2",
    "Nature's Truth Melatonin 10 mg Liquid (Delicious Berry), 2 fl oz",
    "liquid",
    "melatonin-10-mg-liquid-delicious-berry-nt531",
    undefined,
    [
      "Melatonin",
      "Glycerin",
      "Water",
      "Beet",
      "Xanthan Gum",
      "natural Berry flavor",
      "Sodium Gluconate",
      "Sodium Benzoate",
      "Potassium Sorbate",
      "Citric Acid",
    ],
  ),
  row(
    "nt-b483-lutein-40-mg-plus-zeaxanthin-nt510-30",
    "Nature's Truth Lutein 40 mg plus Zeaxanthin, 30",
    "softgel",
    "lutein-40-mg-plus-zeaxanthin-nt510",
    "840093109149",
    [
      "Lutein (as Marigold Petal Extract)",
      "Zeaxanthin (as Marigold Petal Extract)",
      "Gelatin",
      "Sunflower Oil",
      "Glycerin",
      "yellow Beeswax",
      "Calcium Carbonate",
      "Red Iron Oxide",
    ],
  ),
  row(
    "nt-b483-liposomal-vitamin-c-1650-mg-nt18931-60",
    "Nature's Truth Liposomal Vitamin C 1650 mg, 60",
    "softgel",
    "liposomal-vitamin-c-1650-mg-nt18931",
    "840093120861",
    [
      "Vitamin C (as Ascorbic Acid)",
      "Sunflower Lecithin",
      "Soy Lecithin",
      "Medium Chain Triglyceride Oil",
      "Gelatin",
      "Glycerin",
      "Caramel",
    ],
  ),
  row(
    "nt-b483-l-lysine-500-mg-nt3932-130",
    "Nature's Truth L-Lysine 500 mg, 130",
    "tablet",
    "l-lysine-500-mg-nt3932",
    "840093106278",
    [
      "L-Lysine (as L-Lysine Hydrochloride)",
      "Dicalcium Phosphate",
      "Cellulose",
      "Croscarmellose",
      "Stearic Acid",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b483-folic-acid-800-mcg-nt1223-250",
    "Nature's Truth Folic Acid 800 mcg, 250",
    "tablet",
    "folic-acid-800-mcg-nt1223",
    "840093101488",
    [
      "Folate",
      "Dicalcium Phosphate",
      "Cellulose",
      "Croscarmellose",
      "Magnesium Stearate",
      "Stearic Acid",
      "Silica",
    ],
  ),
  row(
    "nt-b483-flaxseed-oil-3000-mg-nt731-90",
    "Nature's Truth Flaxseed Oil 3000 mg, 90",
    "softgel",
    "flaxseed-oil-3000-mg-nt731",
    "840093101273",
    [
      "Flaxseed Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-evening-primrose-oil-2000-mg-nt2190-60",
    "Nature's Truth Evening Primrose Oil 2000 mg, 60",
    "softgel",
    "evening-primrose-oil-2000-mg-nt2190",
    "840093101556",
    [
      "Evening Primrose Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b483-beta-carotene-25000-iu-7500-mcg-nt1491-100",
    "Nature's Truth Beta Carotene 25,000 IU (7500 mcg), 100",
    "softgel",
    "beta-carotene-25000-iu-7500-mcg-nt1491",
    "840093105998",
    [
      "Vitamin A (as Beta-Carotene)",
      "Sunflower Oil",
      "Safflower Oil",
      "Gelatin",
      "Glycerin",
      "yellow Beeswax",
      "Sunflower Lecithin",
    ],
  ),
  row(
    "nt-b483-vitamin-b-12-time-release-1000-mcg-nt13171-75",
    "Nature's Truth Vitamin B-12 Time Release 1000 mcg, 75",
    "tablet",
    "vitamin-b-12-time-release-1000-mcg-nt13171",
    "840093110992",
    [
      "Vitamin B12 (as Cyanocobalamin)",
      "Dicalcium Phosphate",
      "Cellulose",
      "Magnesium Stearate",
      "Stearic Acid",
      "Silica",
    ],
  ),
  row(
    "nt-b483-vitamin-b-12-1000-mcg-nt1093-220",
    "Nature's Truth Vitamin B-12 1000 mcg, 220",
    "tablet",
    "vitamin-b-12-1000-mcg-nt1093",
    "840093106025",
    [
      "Vitamin B12 (as Cyanocobalamin)",
      "Dicalcium Phosphate",
      "Stearic Acid",
      "Croscarmellose",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b483-activated-charcoal-780-mg-nt4433-150",
    "Nature's Truth Activated Charcoal 780 mg, 150",
    "capsule",
    "activated-charcoal-780-mg-nt4433",
    "840093109804",
    [
      "Charcoal, Activated (as Coconut)",
      "Gelatin",
      "Magnesium Stearate",
    ],
  ),
  row(
    "nt-b483-activated-charcoal-780-mg-nt4433-90",
    "Nature's Truth Activated Charcoal 780 mg, 90",
    "capsule",
    "activated-charcoal-780-mg-nt4433",
    "840093108852",
    [
      "Charcoal, Activated (as Coconut)",
      "Gelatin",
      "Magnesium Stearate",
    ],
  ),
];

const T353U_EXPECT: Array<[string, RatingRecord["verdict"], boolean, string]> = [
  ["nt-b483-high-potency-vitamin-d3-10000-iu-250-mcg-na11396-100", "caution", false, "840093100702"],
  ["nt-b483-pumpkin-seed-oil-3000-mg-nt3646-75", "caution", false, "840093123787"],
  ["nt-b483-melatonin-10-mg-plus-l-theanine-nt18284-72", "caution", false, "840093100825"],
  ["nt-b483-vitamin-c-1000-mg-plus-rosehips-nt11246-100", "caution", false, "840093106032"],
  ["nt-b483-vitamin-c-1000-mg-plus-rose-hips-timed-release-nt1370-60", "caution", false, "840093101822"],
  ["nt-b483-vitamin-c-1000-mg-plus-bioflavonoids-rose-hips-nt1391-100", "caution", false, "840093100696"],
  ["nt-b483-slow-release-iron-45-mg-nt39743-60", "avoid", false, "840093101952"],
  ["nt-b483-vitamin-e-1000-iu-450-mg-nt11261-60", "clean", false, "840093106056"],
  ["nt-b483-vitamin-d3-2000-iu-50-mcg-nt7260-300", "caution", false, "840093103734"],
  ["nt-b483-vitamin-d3-2000-iu-50-mcg-nt7260-150", "caution", false, "840093101167"],
  ["nt-b483-liquid-vitamin-d3-5000-iu-125-mcg-nt1600-2", "caution", false, ""],
  ["nt-b483-vitamin-d3-1000-iu-25-mcg-nt1581-130", "caution", false, "840093101501"],
  ["nt-b483-vitamin-d3-1000-iu-25-mcg-nt1581-250", "caution", false, "840093105318"],
  ["nt-b483-vitamin-c-500-mg-with-rose-hips-nt11231-110", "caution", false, "840093106049"],
  ["nt-b483-chromium-picolinate-1000-mcg-nt1751-90", "caution", false, "840093101365"],
  ["nt-b483-selenium-200-mcg-nt1851-100", "caution", false, "840093101969"],
  ["nt-b483-melatonin-10-mg-liquid-delicious-berry-nt531-2", "caution", false, ""],
  ["nt-b483-lutein-40-mg-plus-zeaxanthin-nt510-30", "caution", false, "840093109149"],
  ["nt-b483-liposomal-vitamin-c-1650-mg-nt18931-60", "caution", false, "840093120861"],
  ["nt-b483-l-lysine-500-mg-nt3932-130", "caution", false, "840093106278"],
  ["nt-b483-folic-acid-800-mcg-nt1223-250", "caution", false, "840093101488"],
  ["nt-b483-flaxseed-oil-3000-mg-nt731-90", "caution", false, "840093101273"],
  ["nt-b483-evening-primrose-oil-2000-mg-nt2190-60", "caution", false, "840093101556"],
  ["nt-b483-beta-carotene-25000-iu-7500-mcg-nt1491-100", "caution", false, "840093105998"],
  ["nt-b483-vitamin-b-12-time-release-1000-mcg-nt13171-75", "caution", false, "840093110992"],
  ["nt-b483-vitamin-b-12-1000-mcg-nt1093-220", "caution", false, "840093106025"],
  ["nt-b483-activated-charcoal-780-mg-nt4433-150", "clean", false, "840093109804"],
  ["nt-b483-activated-charcoal-780-mg-nt4433-90", "clean", false, "840093108852"],
];

for (const [id, verdict, note, barcode] of T353U_EXPECT) {
  const found = BATCH483_KYR6E_T353U.find((record) => record.id === id);
  if (!found || found.verdict !== verdict || Boolean(found.honestNote) !== note || (found.barcode ?? '') !== barcode) {
    throw new Error(id);
  }
}
