// DRAFT / not verified / batch 481 KYR6-e (t350u).
// Nature Made rows whose DSLD panels are now locked.
// UPCs are the DSLD label codes. The check digits pass.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t140uWhyForName } from '../scan-preview/t140uTokenWhy';
import { t146uWhyForName } from '../scan-preview/t146uTokenWhy';
import { t350uResolve } from '../scan-preview/t350uLocks';
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
  const hit = t350uResolve(name, useForm);
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
  if (!hit || !why) throw new Error(`t350u unlocked ${name}`);
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
    brand: 'Nature Made',
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Nature Made'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    ...(barcode ? { barcode } : {}),
    sourcesGeneral: [
      barcode
        ? `https://www.naturemade.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`
        : `https://www.naturemade.com/products/${handle} Brand page. DSLD label. No sourced UPC.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH481_KYR6E_T350U: RatingRecord[] = [
  row(
    'nm-b481-choline-extra-strength-dosage-800-mg-per-3-capsules-60',
    'Nature Made Choline Extra Strength Dosage 800 Mg Per 3 Capsules, 60',
    'capsule',
    'choline-extra-strength-dosage-800-mg-per-3-capsules',
    '031604004330',
    [
      'Choline (as Choline Bitartrate)',
      'Hypromellose',
      'Magnesium Stearate',
      'Cellulose Gel',
      'Silicon Dioxide',
    ],
  ),
  row(
    'nm-b481-vitamin-d3-k2-softgels-30',
    'Nature Made Vitamin D3 + K2 Softgels, 30',
    'softgel',
    'vitamin-d3-k2-softgels',
    '031604043452',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin K2 (as all-trans-Menaquinone-7)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Corn Oil',
      'Colors added',
    ],
  ),
  row(
    'nm-b481-calcium-500-mg-with-vitamin-d3-tablets-130',
    'Nature Made Calcium 500 mg with Vitamin D3 Tablets, 130',
    'tablet',
    'calcium-500-mg-with-vitamin-d3-tablets',
    '031604025175',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Gelatin',
      'Corn Starch',
    ],
  ),
  row(
    'nm-b481-sam-e-complete-400-mg-tablets-36',
    'Nature Made SAM-e Complete®◆ 400 mg Tablets, 36',
    'tablet',
    'sam-e-complete-400-mg-tablets',
    '031604411077',
    [
      'SAM-e',
      'S-Adenosylmethionine Tosylate Disulfate',
      'Cellulose Gel',
      'Methacrylic Acid Copolymer',
      'Stearic Acid',
      'Silicon Dioxide',
      'Triethyl Citrate',
      'Magnesium Stearate',
      'Color added',
      'Mannitol',
      'Sodium Starch Glycolate',
    ],
  ),
  row(
    'nm-b481-calcium-600-mg-with-vitamin-d3-tablets-120',
    'Nature Made Calcium 600 mg with Vitamin D3 Tablets, 120',
    'tablet',
    'calcium-600-mg-with-vitamin-d3-tablets',
    '031604012373',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Gelatin',
      'Corn Starch',
    ],
  ),
  row(
    'nm-b481-calcium-600-mg-with-vitamin-d3-tablets-220',
    'Nature Made Calcium 600 mg with Vitamin D3 Tablets, 220',
    'tablet',
    'calcium-600-mg-with-vitamin-d3-tablets',
    '031604012120',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Gelatin',
      'Corn Starch',
    ],
  ),
  row(
    'nm-b481-nature-made-ashwagandha-capsule-60',
    'Nature Made Ashwagandha Capsules, 60',
    'capsule',
    'nature-made-ashwagandha-capsule',
    '031604030476',
    [
      'Sensoril (as Ashwagandha Leaf Extract, Ashwagandha Root Extract)',
      'Cellulose Gel',
      'Hypromellose',
      'Maltodextrin',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'nm-b481-nature-made-magnesium-citrate-softgels-250-mg-120',
    'Nature Made High Absorption Magnesium Citrate 250 mg Softgels, 120',
    'softgel',
    'nature-made-magnesium-citrate-softgels-250-mg',
    '031604028954',
    [
      'Magnesium (as Magnesium Citrate)',
      'Medium Chain Triglycerides',
      'Gelatin',
      'Glycerin',
      'Rapeseed Lecithin',
      'Water',
      'Colors added',
      'yellow Beeswax',
    ],
  ),
  row(
    'nm-b481-vitamin-d3-25-mcg-1000-iu-tablets-100',
    'Nature Made Vitamin D3 1000 IU (25 mcg) Tablets, 100',
    'tablet',
    'vitamin-d3-25-mcg-1000-iu-tablets',
    undefined,
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Magnesium Stearate',
      'Gelatin',
    ],
  ),
  row(
    'nm-b481-vitamin-d3-25-mcg-1000-iu-tablets-300',
    'Nature Made Vitamin D3 1000 IU (25 mcg) Tablets, 300',
    'tablet',
    'vitamin-d3-25-mcg-1000-iu-tablets',
    '031604026837',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Magnesium Stearate',
      'Gelatin',
    ],
  ),
  row(
    'nm-b481-vitamin-d3-50-mcg-2000-iu-tablets-220',
    'Nature Made Vitamin D3 2000 IU (50 mcg) Tablets, 220',
    'tablet',
    'vitamin-d3-50-mcg-2000-iu-tablets',
    '031604026745',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Sugar',
      'Croscarmellose Sodium',
      'Acacia Gum',
      'Stearic Acid',
      'Corn Starch',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-vitamin-d3-50-mcg-2000-iu-tablets-400',
    'Nature Made Vitamin D3 2000 IU (50 mcg) Tablets, 400',
    'tablet',
    'vitamin-d3-50-mcg-2000-iu-tablets',
    '031604028183',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Sugar',
      'Croscarmellose Sodium',
      'Acacia Gum',
      'Stearic Acid',
      'Corn Starch',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-nature-made-vitamin-b12-3000-mcg-softgels-60',
    'Nature Made Vitamin B12 Extra Strength 3000 mcg Softgels, 60',
    'softgel',
    'nature-made-vitamin-b12-3000-mcg-softgels',
    '031604027209',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Soybean Oil',
      'Gelatin',
      'Dibasic Calcium Phosphate',
      'Glycerin',
      'yellow Beeswax',
      'Water',
      'Soy Lecithin',
      'Colors added',
    ],
  ),
  row(
    'nm-b481-nature-made-vitamin-b12-2500-mcg-tablets-60',
    'Nature Made Vitamin B12 Extra Strength 2500 mcg Tablets, 60',
    'tablet',
    'nature-made-vitamin-b12-2500-mcg-tablets',
    '031604027186',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Calcium (as Dibasic Calcium Phosphate)',
      'Cellulose Gel',
      'Stearic Acid',
      'Magnesium Stearate',
      'Croscarmellose Sodium',
    ],
  ),
  row(
    'nm-b481-nature-made-l-lysine-1-000-mg-tablets-60',
    'Nature Made L-Lysine 1000 mg Tablets, 60',
    'tablet',
    'nature-made-l-lysine-1-000-mg-tablets',
    '031604013479',
    [
      'L-Lysine (as L-Lysine Hydrochloride)',
      'Cellulose Gel',
      'Methylcellulose',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Polyethylene Glycol',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'nm-b481-nature-made-folic-acid-tablets-250',
    'Nature Made Folic Acid 400 mcg Tablets, 250',
    'tablet',
    'nature-made-folic-acid-tablets',
    undefined,
    [
      'Folate',
      'Calcium (as Calcium Carbonate, Dibasic Calcium Phosphate)',
      'Cellulose Gel',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-potassium-gluconate-tablets-100',
    'Nature Made 550 mg Potassium Gluconate Tablets, 100',
    'tablet',
    'potassium-gluconate-tablets',
    '031604013585',
    [
      'Potassium',
      'Cellulose Gel',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'nm-b481-iron-tablets-180',
    'Nature Made Iron 65 mg Tablets (325 mg Ferrous Sulfate), 180',
    'tablet',
    'iron-tablets',
    undefined,
    [
      'Iron (as Ferrous Sulfate)',
      'cellulose gel',
      'Dibasic Calcium Phosphate',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Color added',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Triethyl Citrate',
      'Polysorbate 80',
    ],
  ),
  row(
    'nm-b481-magnesium-250-mg-tablets-100',
    'Nature Made Magnesium 250 mg Tablets, 100',
    'tablet',
    'magnesium-250-mg-tablets',
    '031604012694',
    [
      'Magnesium (as Magnesium Oxide)',
      'Cellulose Gel',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Hypromellose',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Color added',
      'Polyethylene Glycol',
      'Triethyl Citrate',
      'Polysorbate 80',
    ],
  ),
  row(
    'nm-b481-magnesium-250-mg-tablets-200',
    'Nature Made Magnesium 250 mg Tablets, 200',
    'tablet',
    'magnesium-250-mg-tablets',
    '031604017187',
    [
      'Magnesium (as Magnesium Oxide)',
      'Cellulose Gel',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Hypromellose',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Color added',
      'Polyethylene Glycol',
      'Triethyl Citrate',
      'Polysorbate 80',
    ],
  ),
  row(
    'nm-b481-magnesium-250-mg-softgels-90',
    'Nature Made Magnesium 250 mg Softgels, 90',
    'softgel',
    'magnesium-250-mg-softgels',
    '031604026844',
    [
      'Magnesium (as Magnesium Oxide)',
      'Gelatin',
      'Medium Chain Triglycerides',
      'Glycerin',
      'Water',
      'Colors added',
      'Soy Lecithin',
      'yellow Beeswax',
    ],
  ),
  row(
    'nm-b481-extra-strength-magnesium-400-mg-softgels-60',
    'Nature Made Magnesium Extra Strength 400 mg Softgels, 60',
    'softgel',
    'extra-strength-magnesium-400-mg-softgels',
    '031604025762',
    [
      'Magnesium (as Magnesium Oxide)',
      'Medium Chain Triglycerides',
      'Gelatin',
      'Glycerin',
      'Water',
      'Soy Lecithin',
      'Colors added',
      'yellow Beeswax',
    ],
  ),
  row(
    'nm-b481-vitamin-c-1000-mg-tablets-300',
    'Nature Made Vitamin C Extra Strength 1000 mg Tablets, 300',
    'tablet',
    'vitamin-c-1000-mg-tablets',
    '031604017804',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Cellulose Gel',
      'Hypromellose',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Polyethylene Glycol',
    ],
  ),
  row(
    'nm-b481-chewable-vitamin-c-500-mg-60',
    'Nature Made Chewable Vitamin C 500 mg Tablets, 60',
    'chewable',
    'chewable-vitamin-c-500-mg',
    undefined,
    [
      'Vitamin C (as Ascorbic Acid, Sodium Ascorbate)',
      'Sugar',
      'Fructose',
      'Stearic Acid',
      'Maltodextrin',
      'Corn Starch',
      'Silicon Dioxide',
      'Natural flavors',
      'Magnesium Stearate',
      'Citrus Bioflavonoids',
      'Lactose',
    ],
  ),
  row(
    'nm-b481-nature-made-coq10-200-mg-softgels-80',
    'Nature Made CoQ10 200 mg Softgels, 80',
    'softgel',
    'nature-made-coq10-200-mg-softgels',
    '031604026806',
    [
      'Coenzyme Q10 (as Ubidecarenone)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Water',
      'Rapeseed Lecithin',
    ],
  ),
  row(
    'nm-b481-nature-made-multi-omega-3-for-him-gummies-150',
    'Nature Made Men\'s Multi + Omega-3 Gummies, 150',
    'gummy',
    'nature-made-multi-omega-3-for-him-gummies',
    '031604030339',
    [
      'Vitamin A (as Retinyl Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Zinc (as Zinc Citrate)',
      'Chromium (as Chromium Chloride)',
      'Fish Oil',
      'Glucose Syrup',
      'Sugar',
      'Water',
      'Gelatin',
      'Citric Acid',
      'Pectin',
      'Natural Flavors',
      'Lactic Acid',
      'Calcium Lactate',
      'Colors added',
      'Tocopherols',
    ],
  ),
  row(
    'nm-b481-nature-made-fish-oil-1-000-mg-softgels-burp-less-150',
    'Nature Made Burp-Less♦ Fish Oil 1000 mg Softgels, 150',
    'softgel',
    'nature-made-fish-oil-1-000-mg-softgels-burp-less',
    '031604026653',
    [
      'Fish Oil',
      'Gelatin',
      'Glycerin',
      'Methacrylic Acid Copolymer',
      'Water',
      'Triethyl Citrate',
      'Polysorbate 80',
      'Glyceryl Monostearate',
      'Propylene Glycol',
      'Tocopherols',
    ],
  ),
  row(
    'nm-b481-nature-made-extra-strength-biotin-2-500-mcg-softgels-150',
    'Nature Made Biotin Extra Strength 2500 mcg Softgels, 150',
    'softgel',
    'nature-made-extra-strength-biotin-2-500-mcg-softgels',
    undefined,
    [
      'Biotin',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'yellow Beeswax',
      'Water',
      'Rapeseed Lecithin',
      'Colors added',
    ],
  ),
  row(
    'nm-b481-sam-e-complete-200-mg-60',
    'Nature Made SAM-e Complete®◆ 200 mg Tablets, 60',
    'tablet',
    'sam-e-complete-200-mg',
    '031604010928',
    [
      'SAM-e',
      'S-Adenosylmethionine Tosylate Disulfate',
      'Cellulose Gel',
      'Mannitol',
      'Methacrylic Acid Copolymer',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Triethyl Citrate',
      'Color added',
      'Sodium Starch Glycolate',
    ],
  ),
  row(
    'nm-b481-nature-made-melatonin-3-mg-tablets-120',
    'Nature Made Melatonin 3 mg Tablets, 120',
    'tablet',
    'nature-made-melatonin-3-mg-tablets',
    '031604027414',
    [
      'Calcium (as Dibasic Calcium Phosphate)',
      'Melatonin',
      'Sodium Starch Glycolate',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-nature-made-melatonin-3-mg-tablets-240',
    'Nature Made Melatonin 3 mg Tablets, 240',
    'tablet',
    'nature-made-melatonin-3-mg-tablets',
    '031604027421',
    [
      'Calcium (as Dibasic Calcium Phosphate)',
      'Melatonin',
      'Sodium Starch Glycolate',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-nature-made-melatonin-5-mg-tablets-90',
    'Nature Made Melatonin 5 mg Tablets, 90',
    'tablet',
    'nature-made-melatonin-5-mg-tablets',
    '031604027438',
    [
      'Calcium (as Dibasic Calcium Phosphate)',
      'Melatonin',
      'Sodium Starch Glycolate',
      'Magnesium Stearate',
      'Croscarmellose Sodium',
    ],
  ),
  row(
    'nm-b481-nature-made-womens-multi-tablets-90',
    'Nature Made Women\'s Multivitamin Tablets, 90',
    'tablet',
    'nature-made-womens-multi-tablets',
    '031604017910',
    [
      'Vitamin A (as Beta-Carotene, Retinyl Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate)',
      'Iron (as Ferrous Fumarate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Cupric Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Chloride)',
      'Molybdenum (as Sodium Molybdate)',
      'Cellulose Gel',
      'Modified Corn Starch',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Gelatin',
      'Polyethylene Glycol',
    ],
  ),
  row(
    'nm-b481-nature-made-multi-gummies-150',
    'Nature Made Multivitamin Gummies, 150',
    'gummy',
    'nature-made-multi-gummies',
    '031604041724',
    [
      'Vitamin A (as Retinyl Acetate)',
      'Vitamin C (as Sodium Ascorbate)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Iodine (as Potassium Iodide)',
      'Zinc (as Zinc Sulfate)',
      'Corn Syrup',
      'Sugar',
      'Water',
      'Gelatin',
      'Citric Acid',
      'Corn Starch',
      'Malic Acid',
      'Palm Oil',
      'Natural flavors',
      'Colors added',
      'Carnauba Wax',
    ],
  ),
  row(
    'nm-b481-vitamin-b1-100-mg-tablets-100',
    'Nature Made Vitamin B1 100 mg Tablets, 100',
    'tablet',
    'vitamin-b1-100-mg-tablets',
    undefined,
    [
      'Thiamine (as Thiamine Mononitrate)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-vitamin-b6-100-mg-tablets-100',
    'Nature Made Vitamin B6 100 mg Tablets, 100',
    'tablet',
    'vitamin-b6-100-mg-tablets',
    '031604012854',
    [
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose Gel',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Maltodextrin',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-energy-b12-gummies-150',
    'Nature Made Energy B12 1000 mcg Gummies, 150',
    'gummy',
    'energy-b12-gummies',
    '031604041748',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Corn Syrup',
      'Sugar',
      'Water',
      'Gelatin',
      'Citric Acid',
      'Coconut Oil',
      'Natural Flavors',
      'Colors added',
      'Carnauba Wax',
    ],
  ),
  row(
    'nm-b481-maximum-strength-vitamin-b12-softgels-60',
    'Nature Made Vitamin B12 Maximum Strength 5000 mcg Softgels, 60',
    'softgel',
    'maximum-strength-vitamin-b12-softgels',
    '031604028862',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'yellow Beeswax',
      'Water',
      'Colors added',
      'Rapeseed Lecithin',
    ],
  ),
  row(
    'nm-b481-vitamin-b12-500-mcg-tablets-200',
    'Nature Made Vitamin B12 500 mcg Tablets, 200',
    'tablet',
    'vitamin-b12-500-mcg-tablets',
    '031604010799',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Calcium (as Calcium Carbonate, Dibasic Calcium Phosphate)',
      'Cellulose Gel',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nm-b481-vitamin-b12-time-release-1-000-mcg-tablets-75',
    'Nature Made Vitamin B12 Time Release 1000 mcg Tablets, 75',
    'tablet',
    'vitamin-b12-time-release-1-000-mcg-tablets',
    '031604027308',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Calcium (as Dibasic Calcium Phosphate)',
      'Cellulose Gel',
      'Hypromellose',
      'Stearic Acid',
      'Silicon Dioxide',
      'Magnesium Stearate',
      'Croscarmellose Sodium',
    ],
  ),
  row(
    'nm-b481-super-b-complex-tablets-360',
    'Nature Made Super B-Complex with C Tablets, 360',
    'tablet',
    'super-b-complex-tablets',
    '031604027292',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Thiamine (as Thiamine Mononitrate)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Dibasic Calcium Phosphate)',
      'Cellulose Gel',
      'Hypromellose',
      'Croscarmellose Sodium',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Polyethylene Glycol',
    ],
  ),
  row(
    'nm-b481-vitamin-k2-100-mcg-softgels-30',
    'Nature Made Vitamin K2 100 mcg Softgels, 30',
    'softgel',
    'vitamin-k2-100-mcg-softgels',
    '031604028824',
    [
      'Vitamin K2 (as Menaquinone-7)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Water',
      'Colors added',
    ],
  ),
];

if (BATCH481_KYR6E_T350U[0].id !== 'nm-b481-choline-extra-strength-dosage-800-mg-per-3-capsules-60' || BATCH481_KYR6E_T350U[0].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[0].honestNote) !== false || (BATCH481_KYR6E_T350U[0].barcode ?? '') !== '031604004330') throw new Error('nm-b481-choline-extra-strength-dosage-800-mg-per-3-capsules-60');
if (BATCH481_KYR6E_T350U[1].id !== 'nm-b481-vitamin-d3-k2-softgels-30' || BATCH481_KYR6E_T350U[1].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[1].honestNote) !== false || (BATCH481_KYR6E_T350U[1].barcode ?? '') !== '031604043452') throw new Error('nm-b481-vitamin-d3-k2-softgels-30');
if (BATCH481_KYR6E_T350U[2].id !== 'nm-b481-calcium-500-mg-with-vitamin-d3-tablets-130' || BATCH481_KYR6E_T350U[2].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[2].honestNote) !== false || (BATCH481_KYR6E_T350U[2].barcode ?? '') !== '031604025175') throw new Error('nm-b481-calcium-500-mg-with-vitamin-d3-tablets-130');
if (BATCH481_KYR6E_T350U[3].id !== 'nm-b481-sam-e-complete-400-mg-tablets-36' || BATCH481_KYR6E_T350U[3].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[3].honestNote) !== true || (BATCH481_KYR6E_T350U[3].barcode ?? '') !== '031604411077') throw new Error('nm-b481-sam-e-complete-400-mg-tablets-36');
if (BATCH481_KYR6E_T350U[4].id !== 'nm-b481-calcium-600-mg-with-vitamin-d3-tablets-120' || BATCH481_KYR6E_T350U[4].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[4].honestNote) !== false || (BATCH481_KYR6E_T350U[4].barcode ?? '') !== '031604012373') throw new Error('nm-b481-calcium-600-mg-with-vitamin-d3-tablets-120');
if (BATCH481_KYR6E_T350U[5].id !== 'nm-b481-calcium-600-mg-with-vitamin-d3-tablets-220' || BATCH481_KYR6E_T350U[5].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[5].honestNote) !== false || (BATCH481_KYR6E_T350U[5].barcode ?? '') !== '031604012120') throw new Error('nm-b481-calcium-600-mg-with-vitamin-d3-tablets-220');
if (BATCH481_KYR6E_T350U[6].id !== 'nm-b481-nature-made-ashwagandha-capsule-60' || BATCH481_KYR6E_T350U[6].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[6].honestNote) !== false || (BATCH481_KYR6E_T350U[6].barcode ?? '') !== '031604030476') throw new Error('nm-b481-nature-made-ashwagandha-capsule-60');
if (BATCH481_KYR6E_T350U[7].id !== 'nm-b481-nature-made-magnesium-citrate-softgels-250-mg-120' || BATCH481_KYR6E_T350U[7].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[7].honestNote) !== true || (BATCH481_KYR6E_T350U[7].barcode ?? '') !== '031604028954') throw new Error('nm-b481-nature-made-magnesium-citrate-softgels-250-mg-120');
if (BATCH481_KYR6E_T350U[8].id !== 'nm-b481-vitamin-d3-25-mcg-1000-iu-tablets-100' || BATCH481_KYR6E_T350U[8].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[8].honestNote) !== false || (BATCH481_KYR6E_T350U[8].barcode ?? '') !== '') throw new Error('nm-b481-vitamin-d3-25-mcg-1000-iu-tablets-100');
if (BATCH481_KYR6E_T350U[9].id !== 'nm-b481-vitamin-d3-25-mcg-1000-iu-tablets-300' || BATCH481_KYR6E_T350U[9].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[9].honestNote) !== false || (BATCH481_KYR6E_T350U[9].barcode ?? '') !== '031604026837') throw new Error('nm-b481-vitamin-d3-25-mcg-1000-iu-tablets-300');
if (BATCH481_KYR6E_T350U[10].id !== 'nm-b481-vitamin-d3-50-mcg-2000-iu-tablets-220' || BATCH481_KYR6E_T350U[10].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[10].honestNote) !== false || (BATCH481_KYR6E_T350U[10].barcode ?? '') !== '031604026745') throw new Error('nm-b481-vitamin-d3-50-mcg-2000-iu-tablets-220');
if (BATCH481_KYR6E_T350U[11].id !== 'nm-b481-vitamin-d3-50-mcg-2000-iu-tablets-400' || BATCH481_KYR6E_T350U[11].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[11].honestNote) !== false || (BATCH481_KYR6E_T350U[11].barcode ?? '') !== '031604028183') throw new Error('nm-b481-vitamin-d3-50-mcg-2000-iu-tablets-400');
if (BATCH481_KYR6E_T350U[12].id !== 'nm-b481-nature-made-vitamin-b12-3000-mcg-softgels-60' || BATCH481_KYR6E_T350U[12].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[12].honestNote) !== false || (BATCH481_KYR6E_T350U[12].barcode ?? '') !== '031604027209') throw new Error('nm-b481-nature-made-vitamin-b12-3000-mcg-softgels-60');
if (BATCH481_KYR6E_T350U[13].id !== 'nm-b481-nature-made-vitamin-b12-2500-mcg-tablets-60' || BATCH481_KYR6E_T350U[13].verdict !== 'clean' || Boolean(BATCH481_KYR6E_T350U[13].honestNote) !== false || (BATCH481_KYR6E_T350U[13].barcode ?? '') !== '031604027186') throw new Error('nm-b481-nature-made-vitamin-b12-2500-mcg-tablets-60');
if (BATCH481_KYR6E_T350U[14].id !== 'nm-b481-nature-made-l-lysine-1-000-mg-tablets-60' || BATCH481_KYR6E_T350U[14].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[14].honestNote) !== false || (BATCH481_KYR6E_T350U[14].barcode ?? '') !== '031604013479') throw new Error('nm-b481-nature-made-l-lysine-1-000-mg-tablets-60');
if (BATCH481_KYR6E_T350U[15].id !== 'nm-b481-nature-made-folic-acid-tablets-250' || BATCH481_KYR6E_T350U[15].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[15].honestNote) !== false || (BATCH481_KYR6E_T350U[15].barcode ?? '') !== '') throw new Error('nm-b481-nature-made-folic-acid-tablets-250');
if (BATCH481_KYR6E_T350U[16].id !== 'nm-b481-potassium-gluconate-tablets-100' || BATCH481_KYR6E_T350U[16].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[16].honestNote) !== false || (BATCH481_KYR6E_T350U[16].barcode ?? '') !== '031604013585') throw new Error('nm-b481-potassium-gluconate-tablets-100');
if (BATCH481_KYR6E_T350U[17].id !== 'nm-b481-iron-tablets-180' || BATCH481_KYR6E_T350U[17].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[17].honestNote) !== false || (BATCH481_KYR6E_T350U[17].barcode ?? '') !== '') throw new Error('nm-b481-iron-tablets-180');
if (BATCH481_KYR6E_T350U[18].id !== 'nm-b481-magnesium-250-mg-tablets-100' || BATCH481_KYR6E_T350U[18].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[18].honestNote) !== false || (BATCH481_KYR6E_T350U[18].barcode ?? '') !== '031604012694') throw new Error('nm-b481-magnesium-250-mg-tablets-100');
if (BATCH481_KYR6E_T350U[19].id !== 'nm-b481-magnesium-250-mg-tablets-200' || BATCH481_KYR6E_T350U[19].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[19].honestNote) !== false || (BATCH481_KYR6E_T350U[19].barcode ?? '') !== '031604017187') throw new Error('nm-b481-magnesium-250-mg-tablets-200');
if (BATCH481_KYR6E_T350U[20].id !== 'nm-b481-magnesium-250-mg-softgels-90' || BATCH481_KYR6E_T350U[20].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[20].honestNote) !== false || (BATCH481_KYR6E_T350U[20].barcode ?? '') !== '031604026844') throw new Error('nm-b481-magnesium-250-mg-softgels-90');
if (BATCH481_KYR6E_T350U[21].id !== 'nm-b481-extra-strength-magnesium-400-mg-softgels-60' || BATCH481_KYR6E_T350U[21].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[21].honestNote) !== false || (BATCH481_KYR6E_T350U[21].barcode ?? '') !== '031604025762') throw new Error('nm-b481-extra-strength-magnesium-400-mg-softgels-60');
if (BATCH481_KYR6E_T350U[22].id !== 'nm-b481-vitamin-c-1000-mg-tablets-300' || BATCH481_KYR6E_T350U[22].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[22].honestNote) !== false || (BATCH481_KYR6E_T350U[22].barcode ?? '') !== '031604017804') throw new Error('nm-b481-vitamin-c-1000-mg-tablets-300');
if (BATCH481_KYR6E_T350U[23].id !== 'nm-b481-chewable-vitamin-c-500-mg-60' || BATCH481_KYR6E_T350U[23].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[23].honestNote) !== true || (BATCH481_KYR6E_T350U[23].barcode ?? '') !== '') throw new Error('nm-b481-chewable-vitamin-c-500-mg-60');
if (BATCH481_KYR6E_T350U[24].id !== 'nm-b481-nature-made-coq10-200-mg-softgels-80' || BATCH481_KYR6E_T350U[24].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[24].honestNote) !== false || (BATCH481_KYR6E_T350U[24].barcode ?? '') !== '031604026806') throw new Error('nm-b481-nature-made-coq10-200-mg-softgels-80');
if (BATCH481_KYR6E_T350U[25].id !== 'nm-b481-nature-made-multi-omega-3-for-him-gummies-150' || BATCH481_KYR6E_T350U[25].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[25].honestNote) !== true || (BATCH481_KYR6E_T350U[25].barcode ?? '') !== '031604030339') throw new Error('nm-b481-nature-made-multi-omega-3-for-him-gummies-150');
if (BATCH481_KYR6E_T350U[26].id !== 'nm-b481-nature-made-fish-oil-1-000-mg-softgels-burp-less-150' || BATCH481_KYR6E_T350U[26].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[26].honestNote) !== false || (BATCH481_KYR6E_T350U[26].barcode ?? '') !== '031604026653') throw new Error('nm-b481-nature-made-fish-oil-1-000-mg-softgels-burp-less-150');
if (BATCH481_KYR6E_T350U[27].id !== 'nm-b481-nature-made-extra-strength-biotin-2-500-mcg-softgels-150' || BATCH481_KYR6E_T350U[27].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[27].honestNote) !== false || (BATCH481_KYR6E_T350U[27].barcode ?? '') !== '') throw new Error('nm-b481-nature-made-extra-strength-biotin-2-500-mcg-softgels-150');
if (BATCH481_KYR6E_T350U[28].id !== 'nm-b481-sam-e-complete-200-mg-60' || BATCH481_KYR6E_T350U[28].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[28].honestNote) !== true || (BATCH481_KYR6E_T350U[28].barcode ?? '') !== '031604010928') throw new Error('nm-b481-sam-e-complete-200-mg-60');
if (BATCH481_KYR6E_T350U[29].id !== 'nm-b481-nature-made-melatonin-3-mg-tablets-120' || BATCH481_KYR6E_T350U[29].verdict !== 'clean' || Boolean(BATCH481_KYR6E_T350U[29].honestNote) !== false || (BATCH481_KYR6E_T350U[29].barcode ?? '') !== '031604027414') throw new Error('nm-b481-nature-made-melatonin-3-mg-tablets-120');
if (BATCH481_KYR6E_T350U[30].id !== 'nm-b481-nature-made-melatonin-3-mg-tablets-240' || BATCH481_KYR6E_T350U[30].verdict !== 'clean' || Boolean(BATCH481_KYR6E_T350U[30].honestNote) !== false || (BATCH481_KYR6E_T350U[30].barcode ?? '') !== '031604027421') throw new Error('nm-b481-nature-made-melatonin-3-mg-tablets-240');
if (BATCH481_KYR6E_T350U[31].id !== 'nm-b481-nature-made-melatonin-5-mg-tablets-90' || BATCH481_KYR6E_T350U[31].verdict !== 'clean' || Boolean(BATCH481_KYR6E_T350U[31].honestNote) !== false || (BATCH481_KYR6E_T350U[31].barcode ?? '') !== '031604027438') throw new Error('nm-b481-nature-made-melatonin-5-mg-tablets-90');
if (BATCH481_KYR6E_T350U[32].id !== 'nm-b481-nature-made-womens-multi-tablets-90' || BATCH481_KYR6E_T350U[32].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[32].honestNote) !== true || (BATCH481_KYR6E_T350U[32].barcode ?? '') !== '031604017910') throw new Error('nm-b481-nature-made-womens-multi-tablets-90');
if (BATCH481_KYR6E_T350U[33].id !== 'nm-b481-nature-made-multi-gummies-150' || BATCH481_KYR6E_T350U[33].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[33].honestNote) !== true || (BATCH481_KYR6E_T350U[33].barcode ?? '') !== '031604041724') throw new Error('nm-b481-nature-made-multi-gummies-150');
if (BATCH481_KYR6E_T350U[34].id !== 'nm-b481-vitamin-b1-100-mg-tablets-100' || BATCH481_KYR6E_T350U[34].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[34].honestNote) !== false || (BATCH481_KYR6E_T350U[34].barcode ?? '') !== '') throw new Error('nm-b481-vitamin-b1-100-mg-tablets-100');
if (BATCH481_KYR6E_T350U[35].id !== 'nm-b481-vitamin-b6-100-mg-tablets-100' || BATCH481_KYR6E_T350U[35].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[35].honestNote) !== false || (BATCH481_KYR6E_T350U[35].barcode ?? '') !== '031604012854') throw new Error('nm-b481-vitamin-b6-100-mg-tablets-100');
if (BATCH481_KYR6E_T350U[36].id !== 'nm-b481-energy-b12-gummies-150' || BATCH481_KYR6E_T350U[36].verdict !== 'avoid' || Boolean(BATCH481_KYR6E_T350U[36].honestNote) !== true || (BATCH481_KYR6E_T350U[36].barcode ?? '') !== '031604041748') throw new Error('nm-b481-energy-b12-gummies-150');
if (BATCH481_KYR6E_T350U[37].id !== 'nm-b481-maximum-strength-vitamin-b12-softgels-60' || BATCH481_KYR6E_T350U[37].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[37].honestNote) !== false || (BATCH481_KYR6E_T350U[37].barcode ?? '') !== '031604028862') throw new Error('nm-b481-maximum-strength-vitamin-b12-softgels-60');
if (BATCH481_KYR6E_T350U[38].id !== 'nm-b481-vitamin-b12-500-mcg-tablets-200' || BATCH481_KYR6E_T350U[38].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[38].honestNote) !== false || (BATCH481_KYR6E_T350U[38].barcode ?? '') !== '031604010799') throw new Error('nm-b481-vitamin-b12-500-mcg-tablets-200');
if (BATCH481_KYR6E_T350U[39].id !== 'nm-b481-vitamin-b12-time-release-1-000-mcg-tablets-75' || BATCH481_KYR6E_T350U[39].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[39].honestNote) !== false || (BATCH481_KYR6E_T350U[39].barcode ?? '') !== '031604027308') throw new Error('nm-b481-vitamin-b12-time-release-1-000-mcg-tablets-75');
if (BATCH481_KYR6E_T350U[40].id !== 'nm-b481-super-b-complex-tablets-360' || BATCH481_KYR6E_T350U[40].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[40].honestNote) !== false || (BATCH481_KYR6E_T350U[40].barcode ?? '') !== '031604027292') throw new Error('nm-b481-super-b-complex-tablets-360');
if (BATCH481_KYR6E_T350U[41].id !== 'nm-b481-vitamin-k2-100-mcg-softgels-30' || BATCH481_KYR6E_T350U[41].verdict !== 'caution' || Boolean(BATCH481_KYR6E_T350U[41].honestNote) !== false || (BATCH481_KYR6E_T350U[41].barcode ?? '') !== '031604028824') throw new Error('nm-b481-vitamin-k2-100-mcg-softgels-30');
