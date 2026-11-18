// DRAFT / not verified / batch 473 KYR6-e (t341u).
// Mason Natural rows whose DSLD panels are already locked.
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
import { t341uResolve } from '../scan-preview/t341uLocks';
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

function locked(name: string, form: string): IngredientFlag {
  const hit = t341uResolve(name, form);
  const inner = asInner(name);
  const why = hit?.lock.why
    || t140uWhyForName(name)
    || t139uWhyForName(name, form)
    || t138uWhyForName(name)
    || t135uWhyForName(name, form)
    || t134uWhyForName(name)
    || t128uWhyForName(name)
    || t146uWhyForName(name)
    || cleanTokenWhyForName(name)
    || t139uWhyForName(bareName(name), form)
    || t140uWhyForName(bareName(name))
    || t146uWhyForName(bareName(name))
    || t140uWhyForName(inner)
    || t134uWhyForName(inner)
    || t138uWhyForName(inner)
    || t146uWhyForName(inner)
    || cleanTokenWhyForName(inner)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t341u unlocked ${name}`);
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
  const inactiveIngredients = names.map((ingredient) => locked(ingredient, form));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const record: RatingRecord = {
    id,
    productName: name,
    brand: '21st Century',
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['21st Century'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    ...(barcode ? { barcode } : {}),
    sourcesGeneral: [
      barcode
        ? `https://www.21stcenturyvitamins.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`
        : `https://www.21stcenturyvitamins.com/products/${handle} Brand page. DSLD label. No sourced UPC.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH473_KYR6E_T341U: RatingRecord[] = [
  row(
    'c21-b473-27503',
    '21st Century Melatonin 10mg - Extra Strength, 120 Tablets',
    'tablet',
    'melatonin-10mg-quick-dissolve',
    '740985275030',
    [
      'Melatonin',
      'Sucrose',
      'Mannitol',
      'Polyplasdone',
      'Crospovidone',
      'Cellulose',
    ],
  ),
  row(
    'c21-b473-22282',
    '21st Century B-100 Complex, 60 Tablets',
    'tablet',
    'b-100-complex-prolonged-release',
    '740985222829',
    [
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Hydroxypropyl Methylcellulose',
      'Stearic Acid',
      'Silicon Dioxide',
      'Dicalcium Phosphate',
      'Ethylcellulose',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Pharmaceutical Glaze',
      'Polysorbate',
      'Polyvinyl Alcohol',
    ],
  ),
  row(
    'c21-b473-22251',
    '21st Century B-50 Complex, 60 Tablets',
    'tablet',
    'b-50-complex-prolonged-release',
    '740985222515',
    [
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Hydroxypropyl Methylcellulose',
      'Stearic Acid',
      'Silicon Dioxide',
      'Dicalcium Phosphate',
      'Ethylcellulose',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Pharmaceutical Glaze',
      'Polysorbate',
      'Polyvinyl Alcohol',
    ],
  ),
  row(
    'c21-b473-22668',
    '21st Century B-Complex Plus Vitamin C, 100 Tablets',
    'tablet',
    'b-complex-plus-c',
    '740985226681',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b473-27069',
    '21st Century Cinnamon 1000 mg, 120 Vegetarian Capsules',
    'capsule',
    'cinnamon-1000mg',
    '740985270691',
    [
      'Cinnamon',
      'Cellulose',
      'Rice Bran',
      'Oat Fiber',
      'Magnesium Silicate',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b473-27383',
    '21st Century Cinnamon 2000 mg Plus Chromium, 120 Vegetarian Capsules',
    'capsule',
    'cinnamon-2000mg-plus-chromium',
    '740985273838',
    [
      'Chromium (as Chromium Picolinate)',
      'Cinnamon',
      'Cellulose',
      'Oat Fiber',
      'Rice Bran',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b473-27434',
    '21st Century Co Q-10 100 mg, 150 Capsules',
    'capsule',
    'co-q-10-100mg',
    '740985274347',
    [
      'Coenzyme Q-10',
      'Oat Fiber',
      'Rice Bran',
      'Cellulose',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b473-27435',
    '21st Century Co Q-10 200 mg, 120 Capsules',
    'capsule',
    'co-q-10-200mg',
    '740985274354',
    [
      'Coenzyme Q-10',
      'Oat Fiber',
      'Rice Bran',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Cellulose',
    ],
  ),
  row(
    'c21-b473-21341',
    '21st Century Co Q-10 30 mg, 45 Capsules',
    'capsule',
    'co-q-10-30mg',
    '740985213414',
    [
      'Coenzyme Q-10',
      'Cellulose',
      'Rice Bran',
      'Gelatin',
      'Oat Fiber',
      'Silicon Dioxide',
      'Magnesium Silicate',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b473-27026',
    '21st Century Fish Oil 1200 mg, 90 Softgels',
    'softgel',
    'fish-oil-1200mg',
    '740985270264',
    [
      'Eicosapentaenoic Acid',
      'Docosahexaenoic Acid',
      'Total Omega-3 Fatty Acids',
      'Gelatin',
      'Vegetable Glycerin',
      'purified Water',
      'Mixed Tocopherols',
    ],
  ),
  row(
    'c21-b473-27348',
    '21st Century Fish Oil 1200 mg, 140 Softgels',
    'softgel',
    'fish-oil-1200mg',
    '740985273487',
    [
      'Eicosapentaenoic Acid',
      'Docosahexaenoic Acid',
      'Gelatin',
      'Glycerin',
      'Water, Purified',
      'Mixed Tocopherols',
    ],
  ),
  row(
    'c21-b473-21300',
    '21st Century Ginseng Extract, 60 Vegetarian Capsules',
    'capsule',
    'ginseng-extract',
    '740985213001',
    [
      'Ginseng extract (as Panax ginseng)',
      'Rice Bran',
      'Oat Fiber',
      'Cellulose',
      'Silicon Dioxide',
      'Magnesium Silicate',
    ],
  ),
  row(
    'c21-b473-22639',
    '21st Century Glucosamine Chondroitin Double Strength Tablet, 180 Tablets',
    'tablet',
    'glucosamine-chondroitin-double-strength-tablet',
    '740985226391',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Cellulose',
      'Polyplasdone',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b473-22476',
    '21st Century Glucosamine Chondroitin Triple Strength, 60 Tablets',
    'tablet',
    'glucosamine-chondroitin-triple-strength-easy-to-swallow',
    '740985224762',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Cellulose',
      'Polyvinylpyrrolidone',
      'Beet',
      'Calcium Carbonate',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'PEG',
      'Polyplasdone',
      'Polysorbate',
      'Polyvinyl alcohol',
      'Silicon Dioxide',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b473-22215',
    '21st Century Glucosamine Relief® 1000 mg, 120 Tablets',
    'tablet',
    'glucosamine-relief-1000mg',
    '740985222157',
    [
      'Calcium (as Calcium Carbonate)',
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Cellulose',
      'Stearic Acid',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'PEG',
      'Polyplasdone',
      'Polyvinyl alcohol',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b473-21378',
    '21st Century Grape Seed Extract, 60 Vegetarian Capsules',
    'capsule',
    'grape-seed-extract',
    '740985213780',
    [
      'Grape seed extract (as Vitis vinifera)',
      'Rice Bran',
      'Oat Fiber',
      'Cellulose',
    ],
  ),
  row(
    'c21-b473-22790',
    '21st Century Herbal Slimming Green Tea, 24 Tea Bags',
    'tablet',
    'herbal-slimming-tea-green-tea',
    '740985227909',
    [
      'Green Tea',
      'Senna',
      'Natural flavors',
      'Licorice',
    ],
  ),
  row(
    'c21-b473-22791',
    '21st Century Herbal Slimming Tea Lemon-Lime, 24 Tea Bags',
    'tablet',
    'herbal-slimming-tea-lemon-lime',
    '740985227916',
    [
      'Senna',
      'Green Tea',
      'Natural flavors',
      'Licorice',
    ],
  ),
  row(
    'c21-b473-21720',
    '21st Century MSM 1000 mg, 90 Tablets',
    'tablet',
    'msm-1000mg',
    '740985217207',
    [
      'Calcium (as Calcium Carbonate)',
      'MSM',
      'Cellulose',
      'Croscarmellose Sodium',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'PEG',
      'Polysorbate',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b473-27304',
    '21st Century One Daily Maximum, 100 Tablets',
    'tablet',
    'one-daily-maximum',
    '740985273043',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Iron (as Ferrous Fumarate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Chloride)',
      'Molybdenum (as Sodium Molybdate)',
      'Chloride (as Potassium Chloride)',
      'Potassium (as Potassium Chloride)',
      'Boron (as Sodium Borate)',
      'Tin (as Stannous Chloride)',
      'Silicon (as Silicon Dioxide)',
      'Vanadium (as Sodium Metavanadate)',
      'Cellulose',
      'Stearic Acid',
      'FD&C Blue #2 Carmine',
      'FD&C Red #40',
      'Croscarmellose Sodium',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Starch',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b473-27305',
    '21st Century One Daily Men\'s Health, 100 Tablets',
    'tablet',
    'one-daily-mens-health',
    '740985273050',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopherol Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Oxide)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Chloride)',
      'Lycopene',
      'Cellulose',
      'Starch',
      'Stearic Acid',
      'Gum Acacia',
      'Croscarmellose Sodium',
      'Dicalcium Phosphate',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polysorbate',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b473-22673',
    '21st Century Sentry Men, 120 Tablets',
    'tablet',
    'sentry-men',
    '740985226735',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Iron (as Ferrous Fumarate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Sodium Molybdate)',
      'Chloride (as Potassium Chloride)',
      'Potassium (as Potassium Chloride)',
      'Lycopene',
      'Starch',
      'Cellulose',
      'Stearic Acid',
      'FD&C Yellow #6',
      'Citric Acid',
      'Croscarmellose Sodium',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b473-27540',
    '21st Century Sentry Senior Men\'s 50+, 100 Tablets',
    'tablet',
    'sentry-senior-mens-50-plus',
    '740985275405',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as D-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Sodium Molybdate)',
      'Chloride (as Potassium Chloride)',
      'Potassium (as Potassium Chloride)',
      'Lutein',
      'Lycopene',
      'Cellulose',
      'Starch',
      'Gelatin',
      'Stearic Acid',
      'FD&C Blue #2 Carmine',
      'FD&C Yellow #6',
      'Butylated Hydroxytoluene',
      'Citric Acid',
      'Croscarmellose Sodium',
      'Gum Acacia',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b473-22675',
    '21st Century Sentry Women, 120 Tablets',
    'tablet',
    'sentry-women',
    '740985226759',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Iron (as Ferrous Fumarate Chelate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Sodium Molybdate)',
      'Chloride (as Potassium Chloride)',
      'Potassium (as Potassium Chloride)',
      'Starch',
      'Cellulose',
      'Stearic Acid',
      'FD&C Blue #2 Carmine',
      'FD&C Red #40',
      'Citric Acid',
      'Croscarmellose Sodium',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'PEG',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b473-22331',
    '21st Century Stress B with Zinc, 66 Tablets',
    'tablet',
    'stress-b-plus-zinc',
    '740985223314',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate)',
      'Zinc (as Zinc Oxide)',
      'Copper (as Cupric Sulfate)',
      'Starch',
      'Cellulose',
      'Hydroxypropyl Methylcellulose',
    ],
  ),
  row(
    'c21-b473-27113',
    '21st Century Vitamin B-12 5000 mcg, 110 Tablets',
    'tablet',
    'vitamin-b-12-5000mcg-quick-dissolve',
    '740985271131',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Sucrose',
      'Mannitol',
      'Polyplasdone',
      'Crospovidone',
      'Hydroxypropyl Methylcellulose',
    ],
  ),
  row(
    'c21-b473-21002',
    '21st Century Vitamin C 500 mg with Rose Hips, 110 Tablets',
    'tablet',
    'vitamin-c-500mg-with-rose-hips',
    '740985210024',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Rose Hips',
      'Cellulose',
      'Stearic Acid',
      'Calcium Carbonate',
      'Croscarmellose Sodium',
      'Hydroxypropyl Methylcellulose',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'Polyethylene Glycol',
      'Polysorbate',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b473-28067',
    '21st Century Vitamin K2 100 mcg, 110 Vegetarian Capsules',
    'capsule',
    'vitamin-k2-100mcg',
    '740985280676',
    [
      'Vitamin K2 (as Menaquinone-7)',
      'Cellulose',
      'Oat Fiber',
      'Dicalcium Phosphate',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b473-27129',
    '21st Century Alaska Wild® Fish Oil Mega Omega-3, 90 Softgels',
    'softgel',
    'alaska-wild-fish-oil-mega-omega-3',
    '740985271292',
    [
      'Eicosapentaenoic Acid',
      'Docosahexaenoic Acid',
      'Gelatin',
      'Glycerin',
      'Water',
    ],
  ),
];

if (BATCH473_KYR6E_T341U[0].id !== 'c21-b473-27503' || BATCH473_KYR6E_T341U[0].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[0].honestNote) !== true || (BATCH473_KYR6E_T341U[0].barcode ?? '') !== '740985275030') throw new Error('c21-b473-27503');
if (BATCH473_KYR6E_T341U[1].id !== 'c21-b473-22282' || BATCH473_KYR6E_T341U[1].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[1].honestNote) !== false || (BATCH473_KYR6E_T341U[1].barcode ?? '') !== '740985222829') throw new Error('c21-b473-22282');
if (BATCH473_KYR6E_T341U[2].id !== 'c21-b473-22251' || BATCH473_KYR6E_T341U[2].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[2].honestNote) !== false || (BATCH473_KYR6E_T341U[2].barcode ?? '') !== '740985222515') throw new Error('c21-b473-22251');
if (BATCH473_KYR6E_T341U[3].id !== 'c21-b473-22668' || BATCH473_KYR6E_T341U[3].verdict !== 'clean' || Boolean(BATCH473_KYR6E_T341U[3].honestNote) !== false || (BATCH473_KYR6E_T341U[3].barcode ?? '') !== '740985226681') throw new Error('c21-b473-22668');
if (BATCH473_KYR6E_T341U[4].id !== 'c21-b473-27069' || BATCH473_KYR6E_T341U[4].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[4].honestNote) !== false || (BATCH473_KYR6E_T341U[4].barcode ?? '') !== '740985270691') throw new Error('c21-b473-27069');
if (BATCH473_KYR6E_T341U[5].id !== 'c21-b473-27383' || BATCH473_KYR6E_T341U[5].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[5].honestNote) !== false || (BATCH473_KYR6E_T341U[5].barcode ?? '') !== '740985273838') throw new Error('c21-b473-27383');
if (BATCH473_KYR6E_T341U[6].id !== 'c21-b473-27434' || BATCH473_KYR6E_T341U[6].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[6].honestNote) !== false || (BATCH473_KYR6E_T341U[6].barcode ?? '') !== '740985274347') throw new Error('c21-b473-27434');
if (BATCH473_KYR6E_T341U[7].id !== 'c21-b473-27435' || BATCH473_KYR6E_T341U[7].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[7].honestNote) !== false || (BATCH473_KYR6E_T341U[7].barcode ?? '') !== '740985274354') throw new Error('c21-b473-27435');
if (BATCH473_KYR6E_T341U[8].id !== 'c21-b473-21341' || BATCH473_KYR6E_T341U[8].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[8].honestNote) !== false || (BATCH473_KYR6E_T341U[8].barcode ?? '') !== '740985213414') throw new Error('c21-b473-21341');
if (BATCH473_KYR6E_T341U[9].id !== 'c21-b473-27026' || BATCH473_KYR6E_T341U[9].verdict !== 'clean' || Boolean(BATCH473_KYR6E_T341U[9].honestNote) !== false || (BATCH473_KYR6E_T341U[9].barcode ?? '') !== '740985270264') throw new Error('c21-b473-27026');
if (BATCH473_KYR6E_T341U[10].id !== 'c21-b473-27348' || BATCH473_KYR6E_T341U[10].verdict !== 'clean' || Boolean(BATCH473_KYR6E_T341U[10].honestNote) !== false || (BATCH473_KYR6E_T341U[10].barcode ?? '') !== '740985273487') throw new Error('c21-b473-27348');
if (BATCH473_KYR6E_T341U[11].id !== 'c21-b473-21300' || BATCH473_KYR6E_T341U[11].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[11].honestNote) !== false || (BATCH473_KYR6E_T341U[11].barcode ?? '') !== '740985213001') throw new Error('c21-b473-21300');
if (BATCH473_KYR6E_T341U[12].id !== 'c21-b473-22639' || BATCH473_KYR6E_T341U[12].verdict !== 'caution' || Boolean(BATCH473_KYR6E_T341U[12].honestNote) !== false || (BATCH473_KYR6E_T341U[12].barcode ?? '') !== '740985226391') throw new Error('c21-b473-22639');
if (BATCH473_KYR6E_T341U[13].id !== 'c21-b473-22476' || BATCH473_KYR6E_T341U[13].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[13].honestNote) !== false || (BATCH473_KYR6E_T341U[13].barcode ?? '') !== '740985224762') throw new Error('c21-b473-22476');
if (BATCH473_KYR6E_T341U[14].id !== 'c21-b473-22215' || BATCH473_KYR6E_T341U[14].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[14].honestNote) !== false || (BATCH473_KYR6E_T341U[14].barcode ?? '') !== '740985222157') throw new Error('c21-b473-22215');
if (BATCH473_KYR6E_T341U[15].id !== 'c21-b473-21378' || BATCH473_KYR6E_T341U[15].verdict !== 'caution' || Boolean(BATCH473_KYR6E_T341U[15].honestNote) !== false || (BATCH473_KYR6E_T341U[15].barcode ?? '') !== '740985213780') throw new Error('c21-b473-21378');
if (BATCH473_KYR6E_T341U[16].id !== 'c21-b473-22790' || BATCH473_KYR6E_T341U[16].verdict !== 'caution' || Boolean(BATCH473_KYR6E_T341U[16].honestNote) !== false || (BATCH473_KYR6E_T341U[16].barcode ?? '') !== '740985227909') throw new Error('c21-b473-22790');
if (BATCH473_KYR6E_T341U[17].id !== 'c21-b473-22791' || BATCH473_KYR6E_T341U[17].verdict !== 'caution' || Boolean(BATCH473_KYR6E_T341U[17].honestNote) !== false || (BATCH473_KYR6E_T341U[17].barcode ?? '') !== '740985227916') throw new Error('c21-b473-22791');
if (BATCH473_KYR6E_T341U[18].id !== 'c21-b473-21720' || BATCH473_KYR6E_T341U[18].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[18].honestNote) !== false || (BATCH473_KYR6E_T341U[18].barcode ?? '') !== '740985217207') throw new Error('c21-b473-21720');
if (BATCH473_KYR6E_T341U[19].id !== 'c21-b473-27304' || BATCH473_KYR6E_T341U[19].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[19].honestNote) !== false || (BATCH473_KYR6E_T341U[19].barcode ?? '') !== '740985273043') throw new Error('c21-b473-27304');
if (BATCH473_KYR6E_T341U[20].id !== 'c21-b473-27305' || BATCH473_KYR6E_T341U[20].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[20].honestNote) !== false || (BATCH473_KYR6E_T341U[20].barcode ?? '') !== '740985273050') throw new Error('c21-b473-27305');
if (BATCH473_KYR6E_T341U[21].id !== 'c21-b473-22673' || BATCH473_KYR6E_T341U[21].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[21].honestNote) !== false || (BATCH473_KYR6E_T341U[21].barcode ?? '') !== '740985226735') throw new Error('c21-b473-22673');
if (BATCH473_KYR6E_T341U[22].id !== 'c21-b473-27540' || BATCH473_KYR6E_T341U[22].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[22].honestNote) !== false || (BATCH473_KYR6E_T341U[22].barcode ?? '') !== '740985275405') throw new Error('c21-b473-27540');
if (BATCH473_KYR6E_T341U[23].id !== 'c21-b473-22675' || BATCH473_KYR6E_T341U[23].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[23].honestNote) !== false || (BATCH473_KYR6E_T341U[23].barcode ?? '') !== '740985226759') throw new Error('c21-b473-22675');
if (BATCH473_KYR6E_T341U[24].id !== 'c21-b473-22331' || BATCH473_KYR6E_T341U[24].verdict !== 'clean' || Boolean(BATCH473_KYR6E_T341U[24].honestNote) !== false || (BATCH473_KYR6E_T341U[24].barcode ?? '') !== '740985223314') throw new Error('c21-b473-22331');
if (BATCH473_KYR6E_T341U[25].id !== 'c21-b473-27113' || BATCH473_KYR6E_T341U[25].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[25].honestNote) !== true || (BATCH473_KYR6E_T341U[25].barcode ?? '') !== '740985271131') throw new Error('c21-b473-27113');
if (BATCH473_KYR6E_T341U[26].id !== 'c21-b473-21002' || BATCH473_KYR6E_T341U[26].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[26].honestNote) !== false || (BATCH473_KYR6E_T341U[26].barcode ?? '') !== '740985210024') throw new Error('c21-b473-21002');
if (BATCH473_KYR6E_T341U[27].id !== 'c21-b473-28067' || BATCH473_KYR6E_T341U[27].verdict !== 'avoid' || Boolean(BATCH473_KYR6E_T341U[27].honestNote) !== false || (BATCH473_KYR6E_T341U[27].barcode ?? '') !== '740985280676') throw new Error('c21-b473-28067');
if (BATCH473_KYR6E_T341U[28].id !== 'c21-b473-27129' || BATCH473_KYR6E_T341U[28].verdict !== 'clean' || Boolean(BATCH473_KYR6E_T341U[28].honestNote) !== false || (BATCH473_KYR6E_T341U[28].barcode ?? '') !== '740985271292') throw new Error('c21-b473-27129');
