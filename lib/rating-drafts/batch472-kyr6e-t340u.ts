// DRAFT / not verified / batch 472 KYR6-e (t340u).
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
import { t340uResolve } from '../scan-preview/t340uLocks';
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
  const hit = t340uResolve(name, form);
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
  if (!hit || !why) throw new Error(`t340u unlocked ${name}`);
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

export const BATCH472_KYR6E_T340U: RatingRecord[] = [
  row(
    'c21-b472-27757',
    '21st Century Biotin 10,000 mcg, 120 Tablets',
    'tablet',
    'biotin-10000mcg',
    '740985277577',
    [
      'Biotin',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Maltodextrin',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-27729',
    '21st Century Kalos & Splendor Biotin Gummies 5000 mcg, 120 Gummies',
    'gummy',
    'kalos-splendor-biotin-gummies',
    '740985277294',
    [
      'Biotin',
      'Sugar',
      'Glucose Syrup',
      'Water',
      'Pectin',
    ],
  ),
  row(
    'c21-b472-28072',
    '21st Century Alpha Lipoic Acid, 60 Vegetarian Capsules',
    'capsule',
    'alpha-lipoic-acid-200mg',
    '740985280720',
    [
      'Alpha-Lipoic Acid',
      'Cellulose',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-28071',
    '21st Century Ashwagandha Extract, 60 Vegetarian Capsules',
    'capsule',
    'ashwagandha-extract',
    '740985280713',
    [
      'Ashwagandha Extract (as Ashwagandha Leaf Extract, Ashwagandha Root Extract, Withanolide Glycosides)',
      'Cellulose',
      'Magnesium Stearate',
      'Rice Bran',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-21196',
    '21st Century Vitamin B-6 100 mg, 110 Tablets',
    'tablet',
    'b-6-100mg',
    '740985211960',
    [
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Silicon Dioxide',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-27116',
    '21st Century Biotin 5000 mcg, 110 Capsules',
    'capsule',
    'biotin-5000mcg',
    '740985271162',
    [
      'Biotin',
      'Calcium (as Dicalcium Phosphate)',
      'Cellulose',
      'Gelatin',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-22881',
    '21st Century Biotin 800 mcg, 110 Tablets',
    'tablet',
    'biotin-800mcg',
    '740985228814',
    [
      'Biotin',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Cellulose',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-22263',
    '21st Century Cal Mag Zinc +D3, 90 Tablets',
    'tablet',
    'cal-mag-zinc-plus-d3',
    '740985222638',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
    ],
  ),
  row(
    'c21-b472-22653',
    '21st Century Calcium 1200 mg Plus D3, 90 Softgels',
    'softgel',
    'calcium-1200mg-plus-d3',
    '740985226537',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Water, Purified',
      'Beeswax',
      'Lecithin',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b472-27516',
    '21st Century Calcium 500 Plus D3, 90 Tablets',
    'tablet',
    'calcium-500-plus-d3-easy-to-swallow',
    '740985275160',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Oyster)',
      'Maltodextrin',
      'Cellulose',
    ],
  ),
  row(
    'c21-b472-27519',
    '21st Century Calcium 500 Plus Extra D3, 90 Tablets',
    'tablet',
    'calcium-500-plus-extra-d3-easy-to-swallow',
    '740985275191',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Oyster Shell)',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Cellulose',
    ],
  ),
  row(
    'c21-b472-27522',
    '21st Century Calcium 500 Plus Extra D3, 400 Tablets',
    'tablet',
    'calcium-500-plus-extra-d3-easy-to-swallow',
    '740985275221',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Oyster)',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Cellulose',
    ],
  ),
  row(
    'c21-b472-27287',
    '21st Century Calcium 600+D3 Plus Minerals Chewables, 75 Chewable Tablets',
    'chewable',
    'calcium-600-plus-d3-plus-minerals-fruit-punch',
    '740985272879',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Copper (as Copper Oxide)',
      'Manganese (as Manganese Sulfate)',
      'Boron (as Sodium Borate)',
      'Sucrose',
      'Cellulose',
      'Starch',
      'Fructose',
      'Mannitol',
    ],
  ),
  row(
    'c21-b472-27534',
    '21st Century Calcium 600, 400 Tablets',
    'tablet',
    'calcium-600mg',
    '740985275344',
    [
      'Calcium (as Calcium Carbonate)',
      'Maltodextrin',
    ],
  ),
  row(
    'c21-b472-27709',
    '21st Century Calcium Citrate Petites +D3, 200 Tablets',
    'tablet',
    'calcium-citrate-d3-petites',
    '740985277096',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Citrate)',
      'Cellulose',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b472-27492',
    '21st Century Calcium Citrate Maximum +D3, 75 Tablet',
    'tablet',
    'calcium-citrate-plus-d3-max',
    '740985274927',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Citrate)',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-27493',
    '21st Century Calcium Citrate Maximum +D3, 120 Tablet',
    'tablet',
    'calcium-citrate-plus-d3-max',
    '740985274934',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Citrate)',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-27495',
    '21st Century Calcium Citrate Maximum +D3, 400 Tablet',
    'tablet',
    'calcium-citrate-plus-d3-max',
    '740985274958',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Citrate)',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-21368',
    '21st Century Chromium Picolinate 200 mcg, 100 Tablets',
    'tablet',
    'chromium-picolinate-200mcg',
    '740985213681',
    [
      'Calcium (as Calcium Carbonate)',
      'Chromium (as Chromium Picolinate)',
      'Cellulose',
      'Maltodextrin',
      'Stearic Acid',
      'Croscarmellose Sodium',
    ],
  ),
  row(
    'c21-b472-27413',
    '21st Century Co Q-10 100 mg Liquid Filled, 90 Softgels',
    'softgel',
    'co-q-10-100mg-liquid-filled',
    '740985274132',
    [
      'Coenzyme Q-10',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Beeswax',
      'purified Water',
      'Lecithin',
      'Caramel',
    ],
  ),
  row(
    'c21-b472-27414',
    '21st Century Co Q-10 200 mg Liquid Filled, 90 Softgels',
    'softgel',
    'co-q-10-200mg-liquid-filled',
    '740985274149',
    [
      'Coenzyme Q-10',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Beeswax',
      'purified Water',
      'Lecithin',
      'Caramel',
    ],
  ),
  row(
    'c21-b472-22757',
    '21st Century Curcumin 95, 45 Vegetarian Capsules',
    'capsule',
    'curcumin-95',
    '740985227572',
    [
      'Turmeric extract (as Curcuminoids)',
      'Cellulose',
      'Rice hull concentrate',
      'Magnesium Silicate',
      'Rice Bran extract',
    ],
  ),
  row(
    'c21-b472-21377',
    '21st Century Folic Acid 400 mcg, 250 Tablets',
    'tablet',
    'folic-acid-400mcg',
    '740985213773',
    [
      'Folic Acid',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-22563',
    '21st Century Folic Acid 800 mcg, 180 Tablets',
    'tablet',
    'folic-acid-800mcg',
    '740985225639',
    [
      'Folic Acid',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-22663',
    '21st Century Kalos & Splendor Gelatin, 100 Capsules',
    'capsule',
    'gelatin-600mg',
    '740985226636',
    [
      'Gelatin',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b472-22301',
    '21st Century Glucosamine Chondroitin Double Strength, 60 Capsules',
    'capsule',
    'glucosamine-chondroitin-double-strength-capsule',
    '740985223017',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-22314',
    '21st Century Glucosamine Chondroitin Double Strength, 150 Capsules',
    'capsule',
    'glucosamine-chondroitin-double-strength-capsule',
    '740985223147',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Gelatin',
    ],
  ),
  row(
    'c21-b472-22787',
    '21st Century Glucosamine Chondroitin Double Strength, 210 Capsules',
    'capsule',
    'glucosamine-chondroitin-double-strength-capsule',
    '740985227879',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Gelatin',
    ],
  ),
  row(
    'c21-b472-21472',
    '21st Century Glucosamine Chondroitin Original Strength, 60 Capsules',
    'capsule',
    'glucosamine-chondroitin-original-strength-easy-to-swallow',
    '740985214725',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Gelatin',
      'Magnesium Silicate',
      'Cellulose',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b472-23023',
    '21st Century Glucosamine Chondroitin Original Strength, 120 Capsules',
    'capsule',
    'glucosamine-chondroitin-original-strength-easy-to-swallow',
    '740985230237',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Gelatin',
      'Magnesium Silicate',
      'Cellulose',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b472-21690',
    '21st Century Glucosamine Chondroitin Original Strength, 200 Capsules',
    'capsule',
    'glucosamine-chondroitin-original-strength-easy-to-swallow',
    '740985216903',
    [
      'Potassium',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate',
      'Gelatin',
      'Magnesium Silicate',
      'Cellulose',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b472-22564',
    '21st Century Glucosamine Relief® 500 mg, 60 Capsules',
    'capsule',
    'glucosamine-relief-500mg',
    '740985225646',
    [
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Cellulose',
      'Gelatin',
      'Silicon Dioxide',
      'Stearic Acid',
      'Magnesium Stearate',
      'Magnesium Silicate',
    ],
  ),
  row(
    'c21-b472-27086',
    '21st Century L-Arginine 1000 mg, 100 Tablets',
    'tablet',
    'l-arginine-1000mg',
    '740985270868',
    [
      'L-Arginine (as L-Arginine Hydrochloride)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-28063',
    '21st Century L-Lysine 1000 mg, 90 Tablets',
    'tablet',
    'l-lysine-1000mg',
    '740985280638',
    [
      'L-Lysine (as L-Lysine Hydrochloride)',
      'Cellulose',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b472-27073',
    '21st Century Lutein 20 mg, 60 Softgels',
    'softgel',
    'lutein-20mg',
    '740985270738',
    [
      'Zeaxanthin',
      'Sunflower Oil',
      'Gelatin',
      'Glycerin',
      'Beeswax',
      'purified Water',
      'Soy Lecithin',
    ],
  ),
  row(
    'c21-b472-21240',
    '21st Century Melatonin 3 mg, 90 Tablets',
    'tablet',
    'melatonin-3mg',
    '740985212400',
    [
      'Calcium (as Calcium Carbonate)',
      'Melatonin',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-22721',
    '21st Century Melatonin 3 mg, 200 Tablets',
    'tablet',
    'melatonin-3mg',
    '740985227213',
    [
      'Calcium (as Calcium Carbonate)',
      'Melatonin',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-27087',
    '21st Century Melatonin 5 mg, 120 Tablets',
    'tablet',
    'melatonin-5mg',
    '740985270875',
    [
      'Calcium (as Calcium Carbonate)',
      'Melatonin',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-22343',
    '21st Century Natural Vitamin E 268mg, 110 Softgels',
    'softgel',
    'natural-vitamin-e-268mg',
    '740985223437',
    [
      'Vitamin E (as D-Alpha-Tocopherol)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Water, Purified',
    ],
  ),
  row(
    'c21-b472-27384',
    '21st Century PreNatal DHA, 30 Softgel',
    'softgel',
    'prenatal-dha',
    '740985273845',
    [
      'Dextrose (as Glucose)',
      'high Oleic Sunflower Oil',
      'Sunflower Lecithin',
      'mixed Tocopherols',
      'Ascorbyl Palmitate',
      'Gelatin Capsule',
    ],
  ),
  row(
    'c21-b472-27343',
    '21st Century Slow Release Iron, 60 Tablets',
    'tablet',
    'slow-release-iron',
    '740985273432',
    [
      'Calcium (as Calcium Carbonate)',
      'Iron (as dried Ferrous Sulfate)',
      'Hydroxypropyl Methylcellulose',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-22424',
    '21st Century Kalos & Splendor Super Collagen Plus Vitamin C, 180 Tablets',
    'tablet',
    'super-collagen-plus-vitamin-c',
    '740985224243',
    [
      'Vitamin C (as Calcium Ascorbate)',
      'hydrolyzed Collagen',
      'Cellulose',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-27791',
    '21st Century VitaJoy Daily C Gummies 250 mg, 60 Gummies',
    'gummy',
    'vitajoy-daily-c-gummies-250mg',
    '740985277911',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Sugar',
      'Glucose Syrup',
      'Water',
      'Pectin',
    ],
  ),
  row(
    'c21-b472-27770',
    '21st Century VitaJoy Melatonin Gummies 5 mg, 120 Gummies',
    'gummy',
    'vitajoy-melatonin-gummies-5mg',
    '740985277706',
    [
      'Melatonin',
      'Sugar',
      'Glucose Syrup',
      'Water',
      'Pectin',
      'Carnauba Wax',
      'Citric Acid',
      'Vegetable Juice',
      'Fruit Juice',
      'Natural flavor',
      'Sodium Citrate',
      'Vegetable Oil',
    ],
  ),
  row(
    'c21-b472-21104',
    '21st Century Vitamin B-12 1000 mcg, 110 Tablets',
    'tablet',
    'vitamin-b-12-1000mcg-prolonged-release',
    '740985211045',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Maltodextrin',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-22309',
    '21st Century Vitamin B-12 500 mcg, 110 Tablets',
    'tablet',
    'vitamin-b-12-500mcg',
    '740985223093',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Maltodextrin',
      'Stearic Acid',
      'Croscarmellose Sodium',
    ],
  ),
  row(
    'c21-b472-21225',
    '21st Century Vitamin C 1000 mg, 110 Tablets',
    'tablet',
    'vitamin-c-1000mg-prolonged-release',
    '740985212257',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Hydroxypropyl Methylcellulose',
      'Stearic Acid',
      'Cellulose',
      'Calcium Carbonate',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b472-22433',
    '21st Century Vitamin C 1000 mg, 110 Tablets',
    'tablet',
    'vitamin-c-1000mg',
    '740985224335',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Stearic Acid',
      'Hydroxypropyl Methylcellulose',
    ],
  ),
  row(
    'c21-b472-21190',
    '21st Century Vitamin C 500 mg, 110 Tablets',
    'tablet',
    'vitamin-c-500mg-prolonged-release',
    '740985211908',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Calcium (as Calcium Carbonate)',
      'Stearic Acid',
      'Hydroxypropyl Methylcellulose',
      'Cellulose',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b472-22316',
    '21st Century Vitamin C 500 mg, 110 Tablets',
    'tablet',
    'vitamin-c-500mg',
    '740985223161',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Calcium (as Calcium Carbonate)',
      'Stearic Acid',
      'Cellulose',
      'Croscarmellose Sodium',
      'Hydroxypropyl Methylcellulose',
    ],
  ),
  row(
    'c21-b472-22338',
    '21st Century Vitamin C 500 mg, 250 Tablets',
    'tablet',
    'vitamin-c-500mg',
    '740985223383',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Calcium (as Calcium Carbonate)',
      'Stearic Acid',
      'Cellulose',
      'Croscarmellose Sodium',
      'Hydroxypropyl Methylcellulose',
    ],
  ),
  row(
    'c21-b472-27380',
    '21st Century Vitamin D3 10 mcg Chewable, 110 Chewable Tablets',
    'chewable',
    'vitamin-d3-10mcg-orange',
    '740985273807',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Sorbitol',
      'Sucrose',
      'Mannitol',
      'Cellulose',
      'Citric Acid',
      'Crospovidone',
      'Hydroxypropyl Methylcellulose',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-22661',
    '21st Century Vitamin D3 10 mcg, 100 Tablets',
    'tablet',
    'vitamin-d3-10mcg',
    '740985226612',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-28059',
    '21st Century Vitamin D3 125 mcg, 110 Softgels',
    'softgel',
    'vitamin-d3-125mcg-rapid',
    '740985280591',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Water, Purified',
      'Corn Oil',
    ],
  ),
  row(
    'c21-b472-27288',
    '21st Century Vitamin D3 125 mcg, 110 Tablets',
    'tablet',
    'vitamin-d3-125mcg',
    '740985272886',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Maltodextrin',
      'Gelatin',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-27403',
    '21st Century Vitamin D3 125 mcg, 360 Tablets',
    'tablet',
    'vitamin-d3-125mcg',
    '740985274033',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
      'Gelatin',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-28060',
    '21st Century Vitamin D3 250 mcg, 110 Softgels',
    'softgel',
    'vitamin-d3-250mcg-rapid',
    '740985280607',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Safflower Oil',
      'Gelatin',
      'Glycerin',
      'Water, Purified',
      'Sunflower Oil',
    ],
  ),
  row(
    'c21-b472-27504',
    '21st Century Vitamin D3 250 mcg, 110 Tablets',
    'tablet',
    'vitamin-d3-250mcg',
    '740985275047',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Gelatin',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Maltodextrin',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Starch',
      'Sucrose',
    ],
  ),
  row(
    'c21-b472-27062',
    '21st Century Vitamin D3 25 mcg, 110 Tablets',
    'tablet',
    'vitamin-d3-25mcg',
    '740985270622',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-27292',
    '21st Century Vitamin D3 25 mcg, 300 Tablets',
    'tablet',
    'vitamin-d3-25mcg',
    '740985272923',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-27139',
    '21st Century Vitamin D3 25 mcg, 500 Tablets',
    'tablet',
    'vitamin-d3-25mcg',
    '740985271391',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-27416',
    '21st Century Vitamin D3 50 mcg, 250 Softgels',
    'softgel',
    'vitamin-d3-50mcg-rapid-release',
    '740985274163',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Soybean Oil',
      'Safflower Oil',
      'Gelatin',
      'Glycerin',
      'purified Water',
    ],
  ),
  row(
    'c21-b472-27111',
    '21st Century Vitamin D3 50 mcg, 110 Tablets',
    'tablet',
    'vitamin-d3-50mcg',
    '740985271117',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b472-21245',
    '21st Century Vitamin E 180 mg, 110 Softgels',
    'softgel',
    'vitamin-e-180mg',
    '740985212455',
    [
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Gelatin',
      'Glycerin',
      'Soybean Oil',
      'Water, Purified',
    ],
  ),
  row(
    'c21-b472-22730',
    '21st Century Vitamin E 180 mg, 250 Softgels',
    'softgel',
    'vitamin-e-180mg',
    '740985227305',
    [
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Gelatin',
      'Glycerin',
      'Soybean Oil',
      'Water, Purified',
    ],
  ),
  row(
    'c21-b472-21302',
    '21st Century Vitamin E 90 mg, 110 Softgels',
    'softgel',
    'vitamin-e-90mg',
    '740985213025',
    [
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'purified Water',
    ],
  ),
  row(
    'c21-b472-21393',
    '21st Century Zinc 50 mg, 110 Tablets',
    'tablet',
    'zinc-50mg',
    '740985213933',
    [
      'Calcium (as Calcium Carbonate)',
      'Zinc (as Zinc Amino Acid Chelate)',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b472-28032',
    '21st Century Zinc Citrate 50 mg, 360 Tablets',
    'tablet',
    'zinc-citrate-50mg',
    '740985280324',
    [
      'Calcium (as Dicalcium Phosphate)',
      'Zinc (as Zinc Citrate)',
      'Microcrystalline Cellulose',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b472-22822',
    '21st Century Co Q-10 400 mg, 30 Capsules',
    'capsule',
    'co-q-10-400mg',
    '740985228227',
    [
      'Coenzyme Q-10',
      'Vegetable Cellulose',
      'Tricalcium Phosphate',
    ],
  ),
];

if (BATCH472_KYR6E_T340U[0].id !== 'c21-b472-27757' || BATCH472_KYR6E_T340U[0].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[0].honestNote) !== false || (BATCH472_KYR6E_T340U[0].barcode ?? '') !== '740985277577') throw new Error('c21-b472-27757');
if (BATCH472_KYR6E_T340U[1].id !== 'c21-b472-27729' || BATCH472_KYR6E_T340U[1].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[1].honestNote) !== false || (BATCH472_KYR6E_T340U[1].barcode ?? '') !== '740985277294') throw new Error('c21-b472-27729');
if (BATCH472_KYR6E_T340U[2].id !== 'c21-b472-28072' || BATCH472_KYR6E_T340U[2].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[2].honestNote) !== false || (BATCH472_KYR6E_T340U[2].barcode ?? '') !== '740985280720') throw new Error('c21-b472-28072');
if (BATCH472_KYR6E_T340U[3].id !== 'c21-b472-28071' || BATCH472_KYR6E_T340U[3].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[3].honestNote) !== false || (BATCH472_KYR6E_T340U[3].barcode ?? '') !== '740985280713') throw new Error('c21-b472-28071');
if (BATCH472_KYR6E_T340U[4].id !== 'c21-b472-21196' || BATCH472_KYR6E_T340U[4].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[4].honestNote) !== false || (BATCH472_KYR6E_T340U[4].barcode ?? '') !== '740985211960') throw new Error('c21-b472-21196');
if (BATCH472_KYR6E_T340U[5].id !== 'c21-b472-27116' || BATCH472_KYR6E_T340U[5].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[5].honestNote) !== false || (BATCH472_KYR6E_T340U[5].barcode ?? '') !== '740985271162') throw new Error('c21-b472-27116');
if (BATCH472_KYR6E_T340U[6].id !== 'c21-b472-22881' || BATCH472_KYR6E_T340U[6].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[6].honestNote) !== false || (BATCH472_KYR6E_T340U[6].barcode ?? '') !== '740985228814') throw new Error('c21-b472-22881');
if (BATCH472_KYR6E_T340U[7].id !== 'c21-b472-22263' || BATCH472_KYR6E_T340U[7].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[7].honestNote) !== false || (BATCH472_KYR6E_T340U[7].barcode ?? '') !== '740985222638') throw new Error('c21-b472-22263');
if (BATCH472_KYR6E_T340U[8].id !== 'c21-b472-22653' || BATCH472_KYR6E_T340U[8].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[8].honestNote) !== false || (BATCH472_KYR6E_T340U[8].barcode ?? '') !== '740985226537') throw new Error('c21-b472-22653');
if (BATCH472_KYR6E_T340U[9].id !== 'c21-b472-27516' || BATCH472_KYR6E_T340U[9].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[9].honestNote) !== false || (BATCH472_KYR6E_T340U[9].barcode ?? '') !== '740985275160') throw new Error('c21-b472-27516');
if (BATCH472_KYR6E_T340U[10].id !== 'c21-b472-27519' || BATCH472_KYR6E_T340U[10].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[10].honestNote) !== false || (BATCH472_KYR6E_T340U[10].barcode ?? '') !== '740985275191') throw new Error('c21-b472-27519');
if (BATCH472_KYR6E_T340U[11].id !== 'c21-b472-27522' || BATCH472_KYR6E_T340U[11].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[11].honestNote) !== false || (BATCH472_KYR6E_T340U[11].barcode ?? '') !== '740985275221') throw new Error('c21-b472-27522');
if (BATCH472_KYR6E_T340U[12].id !== 'c21-b472-27287' || BATCH472_KYR6E_T340U[12].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[12].honestNote) !== false || (BATCH472_KYR6E_T340U[12].barcode ?? '') !== '740985272879') throw new Error('c21-b472-27287');
if (BATCH472_KYR6E_T340U[13].id !== 'c21-b472-27534' || BATCH472_KYR6E_T340U[13].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[13].honestNote) !== false || (BATCH472_KYR6E_T340U[13].barcode ?? '') !== '740985275344') throw new Error('c21-b472-27534');
if (BATCH472_KYR6E_T340U[14].id !== 'c21-b472-27709' || BATCH472_KYR6E_T340U[14].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[14].honestNote) !== false || (BATCH472_KYR6E_T340U[14].barcode ?? '') !== '740985277096') throw new Error('c21-b472-27709');
if (BATCH472_KYR6E_T340U[15].id !== 'c21-b472-27492' || BATCH472_KYR6E_T340U[15].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[15].honestNote) !== false || (BATCH472_KYR6E_T340U[15].barcode ?? '') !== '740985274927') throw new Error('c21-b472-27492');
if (BATCH472_KYR6E_T340U[16].id !== 'c21-b472-27493' || BATCH472_KYR6E_T340U[16].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[16].honestNote) !== false || (BATCH472_KYR6E_T340U[16].barcode ?? '') !== '740985274934') throw new Error('c21-b472-27493');
if (BATCH472_KYR6E_T340U[17].id !== 'c21-b472-27495' || BATCH472_KYR6E_T340U[17].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[17].honestNote) !== false || (BATCH472_KYR6E_T340U[17].barcode ?? '') !== '740985274958') throw new Error('c21-b472-27495');
if (BATCH472_KYR6E_T340U[18].id !== 'c21-b472-21368' || BATCH472_KYR6E_T340U[18].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[18].honestNote) !== false || (BATCH472_KYR6E_T340U[18].barcode ?? '') !== '740985213681') throw new Error('c21-b472-21368');
if (BATCH472_KYR6E_T340U[19].id !== 'c21-b472-27413' || BATCH472_KYR6E_T340U[19].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[19].honestNote) !== false || (BATCH472_KYR6E_T340U[19].barcode ?? '') !== '740985274132') throw new Error('c21-b472-27413');
if (BATCH472_KYR6E_T340U[20].id !== 'c21-b472-27414' || BATCH472_KYR6E_T340U[20].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[20].honestNote) !== false || (BATCH472_KYR6E_T340U[20].barcode ?? '') !== '740985274149') throw new Error('c21-b472-27414');
if (BATCH472_KYR6E_T340U[21].id !== 'c21-b472-22757' || BATCH472_KYR6E_T340U[21].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[21].honestNote) !== false || (BATCH472_KYR6E_T340U[21].barcode ?? '') !== '740985227572') throw new Error('c21-b472-22757');
if (BATCH472_KYR6E_T340U[22].id !== 'c21-b472-21377' || BATCH472_KYR6E_T340U[22].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[22].honestNote) !== false || (BATCH472_KYR6E_T340U[22].barcode ?? '') !== '740985213773') throw new Error('c21-b472-21377');
if (BATCH472_KYR6E_T340U[23].id !== 'c21-b472-22563' || BATCH472_KYR6E_T340U[23].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[23].honestNote) !== false || (BATCH472_KYR6E_T340U[23].barcode ?? '') !== '740985225639') throw new Error('c21-b472-22563');
if (BATCH472_KYR6E_T340U[24].id !== 'c21-b472-22663' || BATCH472_KYR6E_T340U[24].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[24].honestNote) !== false || (BATCH472_KYR6E_T340U[24].barcode ?? '') !== '740985226636') throw new Error('c21-b472-22663');
if (BATCH472_KYR6E_T340U[25].id !== 'c21-b472-22301' || BATCH472_KYR6E_T340U[25].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[25].honestNote) !== false || (BATCH472_KYR6E_T340U[25].barcode ?? '') !== '740985223017') throw new Error('c21-b472-22301');
if (BATCH472_KYR6E_T340U[26].id !== 'c21-b472-22314' || BATCH472_KYR6E_T340U[26].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[26].honestNote) !== false || (BATCH472_KYR6E_T340U[26].barcode ?? '') !== '740985223147') throw new Error('c21-b472-22314');
if (BATCH472_KYR6E_T340U[27].id !== 'c21-b472-22787' || BATCH472_KYR6E_T340U[27].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[27].honestNote) !== false || (BATCH472_KYR6E_T340U[27].barcode ?? '') !== '740985227879') throw new Error('c21-b472-22787');
if (BATCH472_KYR6E_T340U[28].id !== 'c21-b472-21472' || BATCH472_KYR6E_T340U[28].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[28].honestNote) !== false || (BATCH472_KYR6E_T340U[28].barcode ?? '') !== '740985214725') throw new Error('c21-b472-21472');
if (BATCH472_KYR6E_T340U[29].id !== 'c21-b472-23023' || BATCH472_KYR6E_T340U[29].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[29].honestNote) !== false || (BATCH472_KYR6E_T340U[29].barcode ?? '') !== '740985230237') throw new Error('c21-b472-23023');
if (BATCH472_KYR6E_T340U[30].id !== 'c21-b472-21690' || BATCH472_KYR6E_T340U[30].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[30].honestNote) !== false || (BATCH472_KYR6E_T340U[30].barcode ?? '') !== '740985216903') throw new Error('c21-b472-21690');
if (BATCH472_KYR6E_T340U[31].id !== 'c21-b472-22564' || BATCH472_KYR6E_T340U[31].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[31].honestNote) !== false || (BATCH472_KYR6E_T340U[31].barcode ?? '') !== '740985225646') throw new Error('c21-b472-22564');
if (BATCH472_KYR6E_T340U[32].id !== 'c21-b472-27086' || BATCH472_KYR6E_T340U[32].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[32].honestNote) !== false || (BATCH472_KYR6E_T340U[32].barcode ?? '') !== '740985270868') throw new Error('c21-b472-27086');
if (BATCH472_KYR6E_T340U[33].id !== 'c21-b472-28063' || BATCH472_KYR6E_T340U[33].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[33].honestNote) !== false || (BATCH472_KYR6E_T340U[33].barcode ?? '') !== '740985280638') throw new Error('c21-b472-28063');
if (BATCH472_KYR6E_T340U[34].id !== 'c21-b472-27073' || BATCH472_KYR6E_T340U[34].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[34].honestNote) !== false || (BATCH472_KYR6E_T340U[34].barcode ?? '') !== '740985270738') throw new Error('c21-b472-27073');
if (BATCH472_KYR6E_T340U[35].id !== 'c21-b472-21240' || BATCH472_KYR6E_T340U[35].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[35].honestNote) !== false || (BATCH472_KYR6E_T340U[35].barcode ?? '') !== '740985212400') throw new Error('c21-b472-21240');
if (BATCH472_KYR6E_T340U[36].id !== 'c21-b472-22721' || BATCH472_KYR6E_T340U[36].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[36].honestNote) !== false || (BATCH472_KYR6E_T340U[36].barcode ?? '') !== '740985227213') throw new Error('c21-b472-22721');
if (BATCH472_KYR6E_T340U[37].id !== 'c21-b472-27087' || BATCH472_KYR6E_T340U[37].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[37].honestNote) !== false || (BATCH472_KYR6E_T340U[37].barcode ?? '') !== '740985270875') throw new Error('c21-b472-27087');
if (BATCH472_KYR6E_T340U[38].id !== 'c21-b472-22343' || BATCH472_KYR6E_T340U[38].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[38].honestNote) !== false || (BATCH472_KYR6E_T340U[38].barcode ?? '') !== '740985223437') throw new Error('c21-b472-22343');
if (BATCH472_KYR6E_T340U[39].id !== 'c21-b472-27384' || BATCH472_KYR6E_T340U[39].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[39].honestNote) !== false || (BATCH472_KYR6E_T340U[39].barcode ?? '') !== '740985273845') throw new Error('c21-b472-27384');
if (BATCH472_KYR6E_T340U[40].id !== 'c21-b472-27343' || BATCH472_KYR6E_T340U[40].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[40].honestNote) !== false || (BATCH472_KYR6E_T340U[40].barcode ?? '') !== '740985273432') throw new Error('c21-b472-27343');
if (BATCH472_KYR6E_T340U[41].id !== 'c21-b472-22424' || BATCH472_KYR6E_T340U[41].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[41].honestNote) !== false || (BATCH472_KYR6E_T340U[41].barcode ?? '') !== '740985224243') throw new Error('c21-b472-22424');
if (BATCH472_KYR6E_T340U[42].id !== 'c21-b472-27791' || BATCH472_KYR6E_T340U[42].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[42].honestNote) !== false || (BATCH472_KYR6E_T340U[42].barcode ?? '') !== '740985277911') throw new Error('c21-b472-27791');
if (BATCH472_KYR6E_T340U[43].id !== 'c21-b472-27770' || BATCH472_KYR6E_T340U[43].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[43].honestNote) !== false || (BATCH472_KYR6E_T340U[43].barcode ?? '') !== '740985277706') throw new Error('c21-b472-27770');
if (BATCH472_KYR6E_T340U[44].id !== 'c21-b472-21104' || BATCH472_KYR6E_T340U[44].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[44].honestNote) !== false || (BATCH472_KYR6E_T340U[44].barcode ?? '') !== '740985211045') throw new Error('c21-b472-21104');
if (BATCH472_KYR6E_T340U[45].id !== 'c21-b472-22309' || BATCH472_KYR6E_T340U[45].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[45].honestNote) !== false || (BATCH472_KYR6E_T340U[45].barcode ?? '') !== '740985223093') throw new Error('c21-b472-22309');
if (BATCH472_KYR6E_T340U[46].id !== 'c21-b472-21225' || BATCH472_KYR6E_T340U[46].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[46].honestNote) !== false || (BATCH472_KYR6E_T340U[46].barcode ?? '') !== '740985212257') throw new Error('c21-b472-21225');
if (BATCH472_KYR6E_T340U[47].id !== 'c21-b472-22433' || BATCH472_KYR6E_T340U[47].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[47].honestNote) !== false || (BATCH472_KYR6E_T340U[47].barcode ?? '') !== '740985224335') throw new Error('c21-b472-22433');
if (BATCH472_KYR6E_T340U[48].id !== 'c21-b472-21190' || BATCH472_KYR6E_T340U[48].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[48].honestNote) !== false || (BATCH472_KYR6E_T340U[48].barcode ?? '') !== '740985211908') throw new Error('c21-b472-21190');
if (BATCH472_KYR6E_T340U[49].id !== 'c21-b472-22316' || BATCH472_KYR6E_T340U[49].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[49].honestNote) !== false || (BATCH472_KYR6E_T340U[49].barcode ?? '') !== '740985223161') throw new Error('c21-b472-22316');
if (BATCH472_KYR6E_T340U[50].id !== 'c21-b472-22338' || BATCH472_KYR6E_T340U[50].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[50].honestNote) !== false || (BATCH472_KYR6E_T340U[50].barcode ?? '') !== '740985223383') throw new Error('c21-b472-22338');
if (BATCH472_KYR6E_T340U[51].id !== 'c21-b472-27380' || BATCH472_KYR6E_T340U[51].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[51].honestNote) !== false || (BATCH472_KYR6E_T340U[51].barcode ?? '') !== '740985273807') throw new Error('c21-b472-27380');
if (BATCH472_KYR6E_T340U[52].id !== 'c21-b472-22661' || BATCH472_KYR6E_T340U[52].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[52].honestNote) !== false || (BATCH472_KYR6E_T340U[52].barcode ?? '') !== '740985226612') throw new Error('c21-b472-22661');
if (BATCH472_KYR6E_T340U[53].id !== 'c21-b472-28059' || BATCH472_KYR6E_T340U[53].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[53].honestNote) !== false || (BATCH472_KYR6E_T340U[53].barcode ?? '') !== '740985280591') throw new Error('c21-b472-28059');
if (BATCH472_KYR6E_T340U[54].id !== 'c21-b472-27288' || BATCH472_KYR6E_T340U[54].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[54].honestNote) !== false || (BATCH472_KYR6E_T340U[54].barcode ?? '') !== '740985272886') throw new Error('c21-b472-27288');
if (BATCH472_KYR6E_T340U[55].id !== 'c21-b472-27403' || BATCH472_KYR6E_T340U[55].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[55].honestNote) !== false || (BATCH472_KYR6E_T340U[55].barcode ?? '') !== '740985274033') throw new Error('c21-b472-27403');
if (BATCH472_KYR6E_T340U[56].id !== 'c21-b472-28060' || BATCH472_KYR6E_T340U[56].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[56].honestNote) !== false || (BATCH472_KYR6E_T340U[56].barcode ?? '') !== '740985280607') throw new Error('c21-b472-28060');
if (BATCH472_KYR6E_T340U[57].id !== 'c21-b472-27504' || BATCH472_KYR6E_T340U[57].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[57].honestNote) !== false || (BATCH472_KYR6E_T340U[57].barcode ?? '') !== '740985275047') throw new Error('c21-b472-27504');
if (BATCH472_KYR6E_T340U[58].id !== 'c21-b472-27062' || BATCH472_KYR6E_T340U[58].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[58].honestNote) !== false || (BATCH472_KYR6E_T340U[58].barcode ?? '') !== '740985270622') throw new Error('c21-b472-27062');
if (BATCH472_KYR6E_T340U[59].id !== 'c21-b472-27292' || BATCH472_KYR6E_T340U[59].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[59].honestNote) !== false || (BATCH472_KYR6E_T340U[59].barcode ?? '') !== '740985272923') throw new Error('c21-b472-27292');
if (BATCH472_KYR6E_T340U[60].id !== 'c21-b472-27139' || BATCH472_KYR6E_T340U[60].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[60].honestNote) !== false || (BATCH472_KYR6E_T340U[60].barcode ?? '') !== '740985271391') throw new Error('c21-b472-27139');
if (BATCH472_KYR6E_T340U[61].id !== 'c21-b472-27416' || BATCH472_KYR6E_T340U[61].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[61].honestNote) !== false || (BATCH472_KYR6E_T340U[61].barcode ?? '') !== '740985274163') throw new Error('c21-b472-27416');
if (BATCH472_KYR6E_T340U[62].id !== 'c21-b472-27111' || BATCH472_KYR6E_T340U[62].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[62].honestNote) !== false || (BATCH472_KYR6E_T340U[62].barcode ?? '') !== '740985271117') throw new Error('c21-b472-27111');
if (BATCH472_KYR6E_T340U[63].id !== 'c21-b472-21245' || BATCH472_KYR6E_T340U[63].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[63].honestNote) !== false || (BATCH472_KYR6E_T340U[63].barcode ?? '') !== '740985212455') throw new Error('c21-b472-21245');
if (BATCH472_KYR6E_T340U[64].id !== 'c21-b472-22730' || BATCH472_KYR6E_T340U[64].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[64].honestNote) !== false || (BATCH472_KYR6E_T340U[64].barcode ?? '') !== '740985227305') throw new Error('c21-b472-22730');
if (BATCH472_KYR6E_T340U[65].id !== 'c21-b472-21302' || BATCH472_KYR6E_T340U[65].verdict !== 'caution' || Boolean(BATCH472_KYR6E_T340U[65].honestNote) !== false || (BATCH472_KYR6E_T340U[65].barcode ?? '') !== '740985213025') throw new Error('c21-b472-21302');
if (BATCH472_KYR6E_T340U[66].id !== 'c21-b472-21393' || BATCH472_KYR6E_T340U[66].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[66].honestNote) !== false || (BATCH472_KYR6E_T340U[66].barcode ?? '') !== '740985213933') throw new Error('c21-b472-21393');
if (BATCH472_KYR6E_T340U[67].id !== 'c21-b472-28032' || BATCH472_KYR6E_T340U[67].verdict !== 'avoid' || Boolean(BATCH472_KYR6E_T340U[67].honestNote) !== false || (BATCH472_KYR6E_T340U[67].barcode ?? '') !== '740985280324') throw new Error('c21-b472-28032');
if (BATCH472_KYR6E_T340U[68].id !== 'c21-b472-22822' || BATCH472_KYR6E_T340U[68].verdict !== 'clean' || Boolean(BATCH472_KYR6E_T340U[68].honestNote) !== false || (BATCH472_KYR6E_T340U[68].barcode ?? '') !== '740985228227') throw new Error('c21-b472-22822');
