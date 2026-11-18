// DRAFT / not verified / batch 485 KYR6-e (t355u).
// Nature's Truth rows whose held panels are now fully locked.
// UPCs are the DSLD label codes whose check digits pass. No new why text.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t140uWhyForName } from '../scan-preview/t140uTokenWhy';
import { t146uWhyForName } from '../scan-preview/t146uTokenWhy';
import { t355uResolve } from '../scan-preview/t355uLocks';
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

function locked(name: string, form: string, productName: string): IngredientFlag {
  const useForm = /fish body oil/i.test(name) && /\bfish oil\b/i.test(productName) && /\bsoftgel\b/i.test(form)
    ? `${form} base`
    : form;
  const hit = t355uResolve(name, useForm);
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
  if (!hit || !why) throw new Error(`t355u unlocked ${name}`);
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

export const BATCH485_KYR6E_T355U: RatingRecord[] = [

  row(
    "nt-b485-chlorophyll-50-mg-liquid-natural-mint-nt11962-2",
    "Nature's Truth Chlorophyll 50 mg Liquid (Natural Mint), 2 fl oz",
    "liquid",
    "chlorophyll-50-mg-liquid-natural-mint-nt11962",
    undefined,
    [
      "Chlorophyll (as Sodium Copper Chlorophyllin)",
      "Glycerin",
      "Water",
      "Sodium Chloride",
      "natural Peppermint flavor",
    ],
  ),
  row(
    "nt-b485-ashwagandha-3000-mg-extra-strength-capsules-90",
    "Nature's Truth Ashwagandha 3000 mg |  Extra Strength Capsules, 90",
    "capsule",
    "ashwagandha-3000-mg-extra-strength-capsules",
    "840093116642",
    [
      "Ashwagandha",
      "Black Pepper fruit extract (as Piperine)",
      "Rice, Powder",
      "Gelatin",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b485-vitamin-c-500-mg-plus-bioflavonoids-rose-hips-nt1331-100",
    "Nature's Truth Vitamin C 500 mg plus Bioflavonoids, Rose Hips, 100",
    "tablet",
    "vitamin-c-500-mg-plus-bioflavonoids-rose-hips-nt1331",
    "840093101235",
    [
      "Vitamin C (as Ascorbic Acid)",
      "Citrus Bioflavonoid Complex (as Citrus spp.)",
      "Rose Hip (as Rosa canina)",
      "Cellulose",
      "Croscarmellose",
      "Magnesium Stearate",
      "Stearic Acid",
      "Silica",
      "Cellulose Coating",
    ],
  ),
  row(
    "nt-b485-l-theanine-200-mg-nt8521-60",
    "Nature's Truth L-Theanine 200 mg, 60",
    "capsule",
    "l-theanine-200-mg-nt8521",
    "840093101945",
    [
      "L-Theanine",
      "Gelatin",
      "Cellulose",
      "Magnesium Stearate",
      "Rice, Powder",
      "Silica",
    ],
  ),
  row(
    "nt-b485-vitamin-d3-2000-iu-gummies-delicious-pineapple-nt16601-70",
    "Nature's Truth Vitamin D3 2000 IU Gummies (Delicious Pineapple), 70",
    "gummy",
    "vitamin-d3-2000-iu-gummies-delicious-pineapple-nt16601",
    "840093115263",
    [
      "Vitamin D (as Vitamin D3)",
      "Glucose Syrup",
      "Sugar",
      "Pectin",
      "Apple juice concentrate",
      "Citric Acid",
      "Sodium Citrate",
      "Natural flavor",
      "Lactic Acid",
      "Palm Leaf Glaze, Natural",
      "Palm Oil",
      "Annatto Color",
    ],
  ),
  row(
    "nt-b485-vitamin-b-complex-plus-b-12-nt1300-90",
    "Nature's Truth Vitamin B Complex plus B-12, 90",
    "tablet",
    "vitamin-b-complex-plus-b-12-nt1300",
    "840093102058",
    [
      "Thiamin (as Brewer's Yeast, Thiamin Hydrochloride)",
      "Riboflavin (as Brewer's Yeast, Riboflavin)",
      "Niacin (as Brewer's Yeast, Niacinamide)",
      "Vitamin B12 (as Brewer's Yeast, Cyanocobalamin)",
      "Papain (as Papaya Enzyme)",
      "Calcium Carbonate",
      "Cellulose",
      "Stearic Acid",
      "Croscarmellose",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b485-b-12-energy-gummies-delicious-peach-raspberry-nt16581-48",
    "Nature's Truth B-12 Energy Gummies (Delicious Peach Raspberry), 48",
    "gummy",
    "b-12-energy-gummies-delicious-peach-raspberry-nt16581",
    "840093115140",
    [
      "Thiamin (as Thiamine Hydrochloride)",
      "Riboflavin (as Vitamin B2)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Vitamin B12 (as Cyanocobalamin)",
      "L-Carnitine (as L-Carnitine Tartrate)",
      "Ashwagandha",
      "Glucose Syrup",
      "Sugar",
      "Pectin",
      "Raspberry juice concentrate",
      "Citric Acid",
      "Natural Flavors",
      "Sodium Citrate",
      "Lactic Acid",
      "natural Palm leaf glaze",
      "Palm Oil",
      "Red Radish Color",
      "Caramel color",
      "Stevioside",
    ],
  ),
  row(
    "nt-b485-vitamin-a-10000-iu-3000-mcg-nt1511-100",
    "Nature's Truth Vitamin A 10,000 IU (3000 mcg), 100",
    "softgel",
    "vitamin-a-10000-iu-3000-mcg-nt1511",
    "840093101440",
    [
      "Vitamin A (as Cod Liver Oil, Retinyl Palmitate)",
      "Sunflower Oil",
      "Gelatin",
      "Glycerin",
    ],
  ),
  row(
    "nt-b485-tart-cherry-2000-mg-gummies-delicious-cherry-nt18961-60",
    "Nature's Truth Tart Cherry 2000 mg Gummies (Delicious Cherry), 60",
    "gummy",
    "tart-cherry-2000-mg-gummies-delicious-cherry-nt18961",
    "840093120830",
    [
      "Tart Cherry",
      "Glucose Syrup",
      "Sugar",
      "Pectin",
      "Citric Acid",
      "Natural Flavors",
      "Sodium Citrate",
      "D-Alpha-Tocopheryl Acetate",
      "Palm Leaf Glaze, Natural",
      "Palm Oil",
      "Black Carrot Juice Concentrate",
    ],
  ),
  row(
    "nt-b485-super-greens-10-gummies-delicious-apple-nt18881-60",
    "Nature's Truth Super Greens 10 Gummies (Delicious Apple), 60",
    "gummy",
    "super-greens-10-gummies-delicious-apple-nt18881",
    "840093118899",
    [
      "Vitamin A (as Retinyl Palmitate)",
      "Vitamin C (as Ascorbic Acid)",
      "Vitamin D (as Vitamin D2)",
      "Thiamine (as Thiamine Hydrochloride, Vitamin B1)",
      "Riboflavin (as Vitamin B2)",
      "Vitamin B6 (as Pyridoxine Hydrochloride)",
      "Folate",
      "Vitamin B12 (as Cyanocobalamin)",
      "Zinc (as Zinc Citrate)",
      "Spinach whole plant Extract",
      "Broccoli",
      "Cabbage leaf Extract",
      "Flaxseed Oil",
      "Apple fruit Extract",
      "Barley Grass",
      "Celery Juice, Powder",
      "Chlorella",
      "Wheat Grass",
      "Aloe Vera",
      "Spirulina",
      "Sodium Copper Chlorophyllin Compex",
      "Glucose Syrup",
      "Sugar",
      "Pectin",
      "Natural Flavors",
      "Citric Acid",
      "Sodium Citrate",
      "Malic Acid",
      "Lactic Acid",
      "Palm Leaf Glaze, Natural",
      "Palm Oil",
      "Sunflower seed Oil",
    ],
  ),
  row(
    "nt-b485-super-ginseng-complex-plus-royal-jelly-nt2690-60",
    "Nature's Truth Super Ginseng Complex plus Royal Jelly, 60",
    "capsule",
    "super-ginseng-complex-plus-royal-jelly-nt2690",
    "840093101570",
    [
      "Korean Ginseng Root Extract (as Ginsenosides)",
      "Red Chinese Ginseng",
      "Manchurian Ginseng",
      "American Ginseng Root Extract (as Ginsenosides)",
      "Royal Jelly",
      "Rice, Powder",
      "Gelatin",
      "Magnesium Stearate",
    ],
  ),
  row(
    "nt-b485-saw-palmetto-2400-mg-nt2101-120",
    "Nature's Truth Saw Palmetto 2400 mg, 120",
    "capsule",
    "saw-palmetto-2400-mg-nt2101",
    "840093101938",
    [
      "Saw Palmetto Whole Berry Extract (as Serenoa repens Whole Berry Extract)",
      "Saw Palmetto (as Serenoa repens)",
      "Rice, Powder",
      "Gelatin",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b485-red-yeast-rice-1200-mg-nt681-120",
    "Nature's Truth Red Yeast Rice 1200 mg, 120",
    "capsule",
    "red-yeast-rice-1200-mg-nt681",
    "840093101143",
    [
      "Red Yeast Rice",
      "Rice, Powder",
      "Gelatin",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b485-prostaid-saw-palmetto-herbal-complex-nt7101-60",
    "Nature's Truth Prostaid Saw Palmetto Herbal Complex, 60",
    "capsule",
    "prostaid-saw-palmetto-herbal-complex-nt7101",
    "840093112101",
    [
      "Saw Palmetto",
      "Pygeum",
      "Stinging Nettle",
      "Lycopene",
      "Rice, Powder",
      "Gelatin",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b485-l-carnitine-1000-mg-nt3765-60",
    "Nature's Truth L-Carnitine 1000 mg, 60",
    "capsule",
    "l-carnitine-1000-mg-nt3765",
    "840093101013",
    [
      "L-Carnitine (as L-Carnitine L-Tartrate)",
      "Gelatin",
      "Magnesium Stearate",
      "Calcium Silicate",
      "Silica",
      "Rice, Powder",
    ],
  ),
  row(
    "nt-b485-magnesium-200-mg-gummies-delicious-lemon-raspberry-nt18191-60",
    "Nature's Truth Magnesium 200 mg Gummies (Delicious Lemon Raspberry), 60",
    "gummy",
    "magnesium-200-mg-gummies-delicious-lemon-raspberry-nt18191",
    "840093116604",
    [
      "Magnesium (as Magnesium Citrate)",
      "Lemon Balm (as Melissa officinalis)",
      "Sugar",
      "Glucose Syrup",
      "Citric Acid",
      "Pectin",
      "Natural Flavors",
      "Sodium Citrate",
      "Black Carrot Juice Concentrate",
      "Stevia Extract",
    ],
  ),
  row(
    "nt-b485-berberine-500-mg-nt16271-60",
    "Nature's Truth Berberine 500 mg, 60",
    "capsule",
    "berberine-500-mg-nt16271",
    "840093114723",
    [
      "Berberine Hydrochloride (as Barberry extract)",
      "Rice, Powder",
      "Capsule",
      "Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "nt-b485-aloe-vera-5000-mg-nt2880-100",
    "Nature's Truth Aloe Vera 5000 mg, 100",
    "softgel",
    "aloe-vera-5000-mg-nt2880",
    "840093109811",
    [
      "Aloe vera (as Aloe barbadensis)",
      "Sunflower Oil",
      "Safflower Oil",
      "Gelatin",
      "Glycerin",
      "White Beeswax",
    ],
  ),
];

const T355U_EXPECT: Array<[string, RatingRecord["verdict"], boolean, string]> = [
  ["nt-b485-chlorophyll-50-mg-liquid-natural-mint-nt11962-2", "clean", false, ""],
  ["nt-b485-ashwagandha-3000-mg-extra-strength-capsules-90", "caution", false, "840093116642"],
  ["nt-b485-vitamin-c-500-mg-plus-bioflavonoids-rose-hips-nt1331-100", "caution", false, "840093101235"],
  ["nt-b485-l-theanine-200-mg-nt8521-60", "caution", false, "840093101945"],
  ["nt-b485-vitamin-d3-2000-iu-gummies-delicious-pineapple-nt16601-70", "avoid", true, "840093115263"],
  ["nt-b485-vitamin-b-complex-plus-b-12-nt1300-90", "caution", false, "840093102058"],
  ["nt-b485-b-12-energy-gummies-delicious-peach-raspberry-nt16581-48", "avoid", true, "840093115140"],
  ["nt-b485-vitamin-a-10000-iu-3000-mcg-nt1511-100", "caution", false, "840093101440"],
  ["nt-b485-tart-cherry-2000-mg-gummies-delicious-cherry-nt18961-60", "avoid", true, "840093120830"],
  ["nt-b485-super-greens-10-gummies-delicious-apple-nt18881-60", "avoid", false, "840093118899"],
  ["nt-b485-super-ginseng-complex-plus-royal-jelly-nt2690-60", "caution", false, "840093101570"],
  ["nt-b485-saw-palmetto-2400-mg-nt2101-120", "caution", false, "840093101938"],
  ["nt-b485-red-yeast-rice-1200-mg-nt681-120", "caution", false, "840093101143"],
  ["nt-b485-prostaid-saw-palmetto-herbal-complex-nt7101-60", "caution", false, "840093112101"],
  ["nt-b485-l-carnitine-1000-mg-nt3765-60", "caution", false, "840093101013"],
  ["nt-b485-magnesium-200-mg-gummies-delicious-lemon-raspberry-nt18191-60", "caution", false, "840093116604"],
  ["nt-b485-berberine-500-mg-nt16271-60", "caution", false, "840093114723"],
  ["nt-b485-aloe-vera-5000-mg-nt2880-100", "caution", false, "840093109811"],
];

for (const [id, verdict, note, barcode] of T355U_EXPECT) {
  const found = BATCH485_KYR6E_T355U.find((record) => record.id === id);
  if (!found || found.verdict !== verdict || Boolean(found.honestNote) !== note || (found.barcode ?? '') !== barcode) {
    throw new Error(id);
  }
}
