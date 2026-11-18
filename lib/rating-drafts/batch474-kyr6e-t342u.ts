// DRAFT / not verified / batch 474 KYR6-e (t342u).
// 21st Century rows whose DSLD panels are now locked.
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
import { t342uResolve } from '../scan-preview/t342uLocks';
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
  const hit = t342uResolve(name, useForm);
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
  if (!hit || !why) throw new Error(`t342u unlocked ${name}`);
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

export const BATCH474_KYR6E_T342U: RatingRecord[] = [
  row(
    'c21-b474-22667',
    '21st Century Antioxidant, 75 Tablets',
    'tablet',
    'antioxidant',
    '740985226674',
    [
      'Vitamin A (as Beta-Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Calcium (as Dicalcium Phosphate)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Cupric Oxide)',
      'Manganese (as Manganese Sulfate)',
      'Gelatin',
      'Cellulose',
      'Croscarmellose Sodium',
      'Glucose',
      'Maltodextrin',
      'FD&C Blue #2 Carmine',
      'FD&C Red #40',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Silicon Dioxide',
      'Starch',
      'Stearic Acid',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-27523',
    '21st Century Calcium 500 Plus D3, 400 Tablets',
    'tablet',
    'calcium-500-plus-d3-easy-to-swallow',
    '740985275238',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Oyster Shell)',
      'Maltodextrin',
      'Cellulose',
      'FD&C Blue #1',
      'FD&C Yellow #5',
      'Croscarmellose Sodium',
      'Hydroxypropyl Methylcellulose',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Stearic Acid',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-27498',
    '21st Century Calcium 600 +D3 Plus Minerals, 120 Tablets',
    'tablet',
    'calcium-600-plus-d3-plus-minerals',
    '740985274989',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Copper (as Copper Oxide)',
      'Manganese (as Manganese Sulfate)',
      'Boron (as Sodium Borate)',
      'Gum Acacia',
      'Croscarmellose Sodium',
      'Cellulose',
      'Artificial Colors',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Stearic Acid',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-21495',
    '21st Century Fish Oil 1000 mg, 60 Softgels',
    'softgel',
    'fish-oil-1000mg',
    '740985214954',
    [
      'Eicosapentaenoic Acid',
      'Docosahexaenoic Acid',
      'Total Omega-3 Fatty Acids',
      'Fish Body Oil',
      'Gelatin',
      'Glycerin',
      'purified Water',
      'refined Soybean Oil',
      'Mixed Tocopherols',
    ],
  ),
  row(
    'c21-b474-22872',
    '21st Century Fish Oil 1000 mg, 120 Softgels',
    'softgel',
    'fish-oil-1000mg',
    '740985228722',
    [
      'Eicosapentaenoic Acid',
      'Docosahexaenoic Acid',
      'Total Omega-3 Fatty Acids',
      'Fish Body Oil',
      'Gelatin',
      'Glycerin',
      'purified Water',
      'refined Soybean Oil',
      'Mixed Tocopherols',
    ],
  ),
  row(
    'c21-b474-22921',
    '21st Century Fish Oil 1000 mg, 300 Softgels',
    'softgel',
    'fish-oil-1000mg',
    '740985229217',
    [
      'Eicosapentaenoic Acid',
      'Docosahexaenoic Acid',
      'Total Omega-3 Fatty Acids',
      'Fish Body Oil',
      'Gelatin',
      'Glycerin',
      'purified Water',
      'refined Soybean Oil',
      'Mixed Tocopherols',
    ],
  ),
  row(
    'c21-b474-27387',
    '21st Century Glucosamine Chondroitin Plus Hyaluronic Acid +MSM, 120 Tablets',
    'tablet',
    'glucosamine-chondroitin-plus-hyaluronic-acid-plus-msm',
    '740985273876',
    [
      'Glucosamine HCl',
      'Chondroitin Sulfate',
      'MSM',
      'Silica',
      'Hyaluronic Acid (as Sodium Hyaluronate)',
      'Cellulose',
      'Polyplasdone',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b474-27708',
    '21st Century Glucosamine Daily Complex +Vitamin D3, 60 Tablets',
    'tablet',
    'glucosamine-daily-complex',
    '740985277089',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Glucosamine HCl',
      'Boswellia serrata extract',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b474-22690',
    '21st Century Iron 27 mg, 110 Tablets',
    'tablet',
    'iron-27mg',
    '740985226902',
    [
      'Iron (as Ferrous Gluconate)',
      'Dextrose',
      'Cellulose',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'FD&C Blue #2',
      'Carmine',
      'FD&C Red #40',
      'FD&C Yellow #5',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-22670',
    '21st Century Iron 65mg, 120 Tablets',
    'tablet',
    'iron-65mg',
    '740985226704',
    [
      'Iron (as Ferrous Sulfate, Dried)',
      'Cellulose',
      'Dextrose',
      'Sorbitol',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'FD&C Blue #1',
      'FD&C Yellow #5',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-21364',
    '21st Century Niacin 100 mg, 110 Tablets',
    'tablet',
    'niacin-100mg',
    '740985213643',
    [
      'Niacin',
      'Calcium (as Calcium Carbonate)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Silicon Dioxide',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b474-22849',
    '21st Century Niacin 250 mg, 110 Tablets',
    'tablet',
    'niacin-250mg-prolonged-release',
    '740985228494',
    [
      'Niacin',
      'Calcium (as Calcium Carbonate)',
      'Hydroxypropyl Methylcellulose',
      'Cellulose',
      'Stearic Acid',
      'Maltodextrin',
    ],
  ),
  row(
    'c21-b474-27474',
    '21st Century Niacin 500 mg, 100 Tablets',
    'tablet',
    'niacin-500mg-prolonged-release',
    '740985274743',
    [
      'Niacin',
      'Cellulose',
      'Hydroxypropyl Methylcellulose',
      'Stearic Acid',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polysorbate',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b474-27303',
    '21st Century One Daily Essential, 100 Tablets',
    'tablet',
    'one-daily-essential',
    '740985273036',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Cellulose',
      'Starch',
      'Gelatin',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Artificial Colors',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'PEG',
      'Polyvinyl alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-27309',
    '21st Century One Daily Women\'s 50+, 100 Tablets',
    'tablet',
    'one-daily-womens-50-plus',
    '740985273098',
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
      'Calcium (as Calcium Carbonate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Chloride)',
      'Molybdenum (as Sodium Molybdate)',
      'Maltodextrin',
      'Starch',
      'Artificial color',
      'Cellulose',
      'Croscarmellose Sodium',
      'Dicalcium Phosphate',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl alcohol',
      'Silicon Dioxide',
      'Stearic Acid',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-27310',
    '21st Century PreNatal, 60 Tablets',
    'tablet',
    'prenatal',
    '740985273104',
    [
      'Vitamin A (as Beta-Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Thiamine (as Thiamine Mononitrate)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Calcium (as Calcium Carbonate)',
      'Iron (as Ferrous Fumarate)',
      'Zinc (as Zinc Oxide)',
      'Cellulose',
      'Starch',
      'Stearic Acid',
      'Maltodextrin',
      'Gelatin',
      'Artificial Colors',
      'Croscarmellose Sodium',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'PEG',
      'Polyvinyl alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b474-21024',
    '21st Century Vitamin C 500 mg Chewable, 110 Chewable Tablets',
    'chewable',
    'vitamin-c-500mg-orange',
    '740985210246',
    [
      'Vitamin C (as Ascorbic Acid, Sodium Ascorbate)',
      'Sucrose',
      'Sorbitol',
      'Cellulose',
      'Silicon Dioxide',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b474-22324',
    '21st Century Vitamin E 450 mg, 55 Softgels',
    'softgel',
    'vitamin-e-450mg',
    '740985223246',
    [
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Gelatin',
      'Glycerin',
      'refined Soybean Oil',
      'purified Water',
    ],
  ),
  row(
    'c21-b474-22672',
    '21st Century Zinc Plus Vitamins C & B-6 Chewable, 90 Chewable Tablets',
    'chewable',
    'zinc-plus-c-b-6',
    '740985226728',
    [
      'Vitamin C (as Ascorbic Acid, Sodium Ascorbate)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Zinc (as Zinc Aspartate)',
      'Sorbitol',
      'Sucrose',
      'Maltodextrin',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b474-27313',
    '21st Century Zoo Friends Multi Chewables with Extra C, 60 Chewable Tablets',
    'chewable',
    'zoo-friends-multi-chewable',
    '740985273135',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid, Sodium Ascorbate)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Thiamine (as Thiamine Mononitrate)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Sorbitol',
      'Sucrose',
      'Stearic Acid',
      'FD&C Yellow #6',
      'Gelatin',
      'Magnesium Stearate',
      'natural Orange flavor',
      'Silicon Dioxide',
      'Starch',
      'Sucralose',
    ],
  ),
];

if (BATCH474_KYR6E_T342U[0].id !== 'c21-b474-22667' || BATCH474_KYR6E_T342U[0].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[0].honestNote) !== false || (BATCH474_KYR6E_T342U[0].barcode ?? '') !== '740985226674') throw new Error('c21-b474-22667');
if (BATCH474_KYR6E_T342U[1].id !== 'c21-b474-27523' || BATCH474_KYR6E_T342U[1].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[1].honestNote) !== false || (BATCH474_KYR6E_T342U[1].barcode ?? '') !== '740985275238') throw new Error('c21-b474-27523');
if (BATCH474_KYR6E_T342U[2].id !== 'c21-b474-27498' || BATCH474_KYR6E_T342U[2].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[2].honestNote) !== false || (BATCH474_KYR6E_T342U[2].barcode ?? '') !== '740985274989') throw new Error('c21-b474-27498');
if (BATCH474_KYR6E_T342U[3].id !== 'c21-b474-21495' || BATCH474_KYR6E_T342U[3].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[3].honestNote) !== false || (BATCH474_KYR6E_T342U[3].barcode ?? '') !== '740985214954') throw new Error('c21-b474-21495');
if (BATCH474_KYR6E_T342U[4].id !== 'c21-b474-22872' || BATCH474_KYR6E_T342U[4].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[4].honestNote) !== false || (BATCH474_KYR6E_T342U[4].barcode ?? '') !== '740985228722') throw new Error('c21-b474-22872');
if (BATCH474_KYR6E_T342U[5].id !== 'c21-b474-22921' || BATCH474_KYR6E_T342U[5].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[5].honestNote) !== false || (BATCH474_KYR6E_T342U[5].barcode ?? '') !== '740985229217') throw new Error('c21-b474-22921');
if (BATCH474_KYR6E_T342U[6].id !== 'c21-b474-27387' || BATCH474_KYR6E_T342U[6].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[6].honestNote) !== false || (BATCH474_KYR6E_T342U[6].barcode ?? '') !== '740985273876') throw new Error('c21-b474-27387');
if (BATCH474_KYR6E_T342U[7].id !== 'c21-b474-27708' || BATCH474_KYR6E_T342U[7].verdict !== 'clean' || Boolean(BATCH474_KYR6E_T342U[7].honestNote) !== false || (BATCH474_KYR6E_T342U[7].barcode ?? '') !== '740985277089') throw new Error('c21-b474-27708');
if (BATCH474_KYR6E_T342U[8].id !== 'c21-b474-22690' || BATCH474_KYR6E_T342U[8].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[8].honestNote) !== false || (BATCH474_KYR6E_T342U[8].barcode ?? '') !== '740985226902') throw new Error('c21-b474-22690');
if (BATCH474_KYR6E_T342U[9].id !== 'c21-b474-22670' || BATCH474_KYR6E_T342U[9].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[9].honestNote) !== false || (BATCH474_KYR6E_T342U[9].barcode ?? '') !== '740985226704') throw new Error('c21-b474-22670');
if (BATCH474_KYR6E_T342U[10].id !== 'c21-b474-21364' || BATCH474_KYR6E_T342U[10].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[10].honestNote) !== false || (BATCH474_KYR6E_T342U[10].barcode ?? '') !== '740985213643') throw new Error('c21-b474-21364');
if (BATCH474_KYR6E_T342U[11].id !== 'c21-b474-22849' || BATCH474_KYR6E_T342U[11].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[11].honestNote) !== false || (BATCH474_KYR6E_T342U[11].barcode ?? '') !== '740985228494') throw new Error('c21-b474-22849');
if (BATCH474_KYR6E_T342U[12].id !== 'c21-b474-27474' || BATCH474_KYR6E_T342U[12].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[12].honestNote) !== false || (BATCH474_KYR6E_T342U[12].barcode ?? '') !== '740985274743') throw new Error('c21-b474-27474');
if (BATCH474_KYR6E_T342U[13].id !== 'c21-b474-27303' || BATCH474_KYR6E_T342U[13].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[13].honestNote) !== false || (BATCH474_KYR6E_T342U[13].barcode ?? '') !== '740985273036') throw new Error('c21-b474-27303');
if (BATCH474_KYR6E_T342U[14].id !== 'c21-b474-27309' || BATCH474_KYR6E_T342U[14].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[14].honestNote) !== false || (BATCH474_KYR6E_T342U[14].barcode ?? '') !== '740985273098') throw new Error('c21-b474-27309');
if (BATCH474_KYR6E_T342U[15].id !== 'c21-b474-27310' || BATCH474_KYR6E_T342U[15].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[15].honestNote) !== false || (BATCH474_KYR6E_T342U[15].barcode ?? '') !== '740985273104') throw new Error('c21-b474-27310');
if (BATCH474_KYR6E_T342U[16].id !== 'c21-b474-21024' || BATCH474_KYR6E_T342U[16].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[16].honestNote) !== false || (BATCH474_KYR6E_T342U[16].barcode ?? '') !== '740985210246') throw new Error('c21-b474-21024');
if (BATCH474_KYR6E_T342U[17].id !== 'c21-b474-22324' || BATCH474_KYR6E_T342U[17].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[17].honestNote) !== false || (BATCH474_KYR6E_T342U[17].barcode ?? '') !== '740985223246') throw new Error('c21-b474-22324');
if (BATCH474_KYR6E_T342U[18].id !== 'c21-b474-22672' || BATCH474_KYR6E_T342U[18].verdict !== 'caution' || Boolean(BATCH474_KYR6E_T342U[18].honestNote) !== false || (BATCH474_KYR6E_T342U[18].barcode ?? '') !== '740985226728') throw new Error('c21-b474-22672');
if (BATCH474_KYR6E_T342U[19].id !== 'c21-b474-27313' || BATCH474_KYR6E_T342U[19].verdict !== 'avoid' || Boolean(BATCH474_KYR6E_T342U[19].honestNote) !== false || (BATCH474_KYR6E_T342U[19].barcode ?? '') !== '740985273135') throw new Error('c21-b474-27313');
