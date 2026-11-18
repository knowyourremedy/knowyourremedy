// DRAFT / not verified / batch 475 KYR6-e (t343u).
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
import { t343uResolve } from '../scan-preview/t343uLocks';
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
  const hit = t343uResolve(name, useForm);
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
  if (!hit || !why) throw new Error(`t343u unlocked ${name}`);
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

export const BATCH475_KYR6E_T343U: RatingRecord[] = [
  row(
    'c21-b475-27848',
    '21st Century Cranberry Plus Probiotic, 60 Tablets',
    'tablet',
    'cranberry-plus-probiotic',
    '740985278482',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Calcium (as Dicalcium Phosphate)',
      'Cranberry, Powder (as Vaccinium macrocarpon, Powder)',
      'Lactobacillus acidophilus',
      'Streptococcus thermophilus',
      'Bifidobacterium bifidum',
      'Lactobacillus salivarius',
      'Cellulose',
      'Stearic Acid',
      'Silicon Dioxide',
      'Croscarmellose Sodium',
      'FD&C Blue #2 Carmine',
      'FD&C Red #40',
      'Inulin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polyvinyl Alcohol',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b475-22407',
    '21st Century Flaxseed Oil 1000 mg, 60 Softgels',
    'softgel',
    'flaxseed-oil-1000mg',
    '740985224076',
    [
      'Alpha-Linolenic Acid',
      'Linoleic Acid',
      'Oleic Acid',
      'Gelatin',
      'Glycerin',
      'purified Water',
    ],
  ),
  row(
    'c21-b475-22871',
    '21st Century Flaxseed Oil 1000 mg, 120 Softgels',
    'softgel',
    'flaxseed-oil-1000mg',
    '740985228715',
    [
      'Alpha-Linolenic Acid',
      'Linoleic Acid',
      'Oleic Acid',
      'Gelatin',
      'Glycerin',
      'purified Water',
    ],
  ),
  row(
    'c21-b475-22399',
    '21st Century Herbal Slimming Tea All Natural, 24 Tea Bags',
    'tea',
    'herbal-slimming-tea-all-natural',
    '740985223994',
    [
      'Senna',
      'Licorice',
      'Malva verticillata',
      'Eleuthero',
    ],
  ),
  row(
    'c21-b475-22692',
    '21st Century Herbal Slimming Tea Peach-Apricot, 24 Tea Bags',
    'tea',
    'herbal-slimming-tea-peach-apricot',
    '740985226926',
    [
      'Senna',
      'Natural and Artificial flavors',
      'Licorice',
      'Malva verticillata',
      'Eleuthero',
    ],
  ),
  row(
    'c21-b475-22713',
    '21st Century Magnesium 250mg, 110 Tablets',
    'tablet',
    'magnesium-250mg',
    '740985227138',
    [
      'Calcium (as Calcium Carbonate)',
      'Magnesium (as Magnesium Oxide)',
      'Cellulose',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Kelp',
    ],
  ),
  row(
    'c21-b475-27072',
    '21st Century Mgo 400, 90 Tablets',
    'tablet',
    'mgo-400',
    '740985270721',
    [
      'Calcium (as Calcium Carbonate)',
      'elemental Magnesium (as Magnesium Oxide)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Kelp',
    ],
  ),
  row(
    'c21-b475-21464',
    '21st Century Vitamin A 3000 mcg, 110 Softgels',
    'softgel',
    'vitamin-a-3000mcg',
    '740985214640',
    [
      'Vitamin A (as Vitamin A Palmitate)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Water, Purified',
    ],
  ),
  row(
    'c21-b475-27685',
    '21st Century Zoo Friends Multivitamin Gummies Plus Extra C, 60 Gummies',
    'gummy',
    'zoo-friends-multi-gummies-c',
    '740985276853',
    [
      'Vitamin A (as Retinyl Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Choline (as Choline Bitartrate)',
      'Iodine (as Potassium Iodide)',
      'Zinc (as Zinc Sulfate)',
      'Inositol',
      'Sugar',
      'Glucose Syrup',
      'Water',
      'Sodium Hexametaphosphate',
      'Pectin',
      'Carnauba Wax',
      'Citric Acid',
      'Fruit Juice',
      'Spirulina Extract',
      'Vegetable Juice',
      'Natural Flavors',
      'Stevia',
      'Vegetable Oil',
    ],
  ),
  row(
    'c21-b475-27619',
    '21st Century Zoo Friends Multi Gummies, 60 Gummies',
    'gummy',
    'zoo-friends-multi-gummies',
    '740985276198',
    [
      'Vitamin A (as Vitamin A Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Choline (as Choline Bitartrate)',
      'Iodine (as Potassium Iodide)',
      'Zinc (as Zinc Sulfate)',
      'Inositol',
      'Sugar',
      'Glucose Syrup',
      'Water',
      'Sodium Hexametaphosphate',
      'Pectin',
      'Carnauba Wax',
      'Citric Acid',
      'Fruit Juice',
      'Spirulina Extract',
      'Vegetable Juice',
      'Natural Flavors',
      'Stevia',
      'Vegetable Oil',
    ],
  ),
  row(
    'c21-b475-27617',
    '21st Century VitaJoy Adult Multi Gummies, 75 Gummies',
    'gummy',
    'vitajoy-adult-multi-gummies',
    '740985276174',
    [
      'Vitamin A (as Retinyl Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Iodine (as Potassium Iodide)',
      'Zinc (as Zinc Sulfate)',
      'Sugar',
      'Glucose Syrup',
      'Water',
      'Sodium Hexametaphosphate',
      'Pectin',
      'Carnauba Wax',
      'Citric Acid',
      'Fruit and Vegetable Juice',
      'Spirulina Extract',
      'Natural Flavors',
      'Stevia',
      'Vegetable Oil',
    ],
  ),
  row(
    'c21-b475-27618',
    '21st Century VitaJoy Adult Multi Gummies, 120 Gummies',
    'gummy',
    'vitajoy-adult-multi-gummies',
    '740985276181',
    [
      'Vitamin A (as Retinyl Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Iodine (as Potassium Iodide)',
      'Zinc (as Zinc Sulfate)',
      'Sugar',
      'Glucose Syrup',
      'Water',
      'Sodium Hexametaphosphate',
      'Pectin',
      'Carnauba Wax',
      'Citric Acid',
      'Fruit juice',
      'Vegetable Juice',
      'Spirulina extract',
      'Natural Flavors',
      'Stevia',
      'Vegetable Oil',
    ],
  ),
  row(
    'c21-b475-21339',
    '21st Century Acidophilus Probiotic Blend, 100 Capsules',
    'capsule',
    'acidophilus-probiotic-blend',
    '740985213391',
    [
      'Lactobacillus acidophilus',
      'Lactobacillus salivarius',
      'Bifidobacterium bifidum',
      'Streptococcus thermophilus',
      'Whey',
      'Inulin',
      'Gelatin',
      'Cellulose',
      'Citrus Pectin',
    ],
  ),
  row(
    'c21-b475-22928',
    '21st Century Acidophilus Probiotic Blend, 150 Capsules',
    'capsule',
    'acidophilus-probiotic-blend',
    '740985229286',
    [
      'Lactobacillus acidophilus',
      'Lactobacillus salivarius',
      'Bifidobacterium bifidum',
      'Streptococcus thermophilus',
      'Whey',
      'Inulin',
      'Gelatin',
      'Cellulose',
      'Citrus Pectin',
    ],
  ),
];

if (BATCH475_KYR6E_T343U[0].id !== 'c21-b475-27848' || BATCH475_KYR6E_T343U[0].verdict !== 'avoid' || Boolean(BATCH475_KYR6E_T343U[0].honestNote) !== false || (BATCH475_KYR6E_T343U[0].barcode ?? '') !== '740985278482') throw new Error('c21-b475-27848');
if (BATCH475_KYR6E_T343U[1].id !== 'c21-b475-22407' || BATCH475_KYR6E_T343U[1].verdict !== 'clean' || Boolean(BATCH475_KYR6E_T343U[1].honestNote) !== false || (BATCH475_KYR6E_T343U[1].barcode ?? '') !== '740985224076') throw new Error('c21-b475-22407');
if (BATCH475_KYR6E_T343U[2].id !== 'c21-b475-22871' || BATCH475_KYR6E_T343U[2].verdict !== 'clean' || Boolean(BATCH475_KYR6E_T343U[2].honestNote) !== false || (BATCH475_KYR6E_T343U[2].barcode ?? '') !== '740985228715') throw new Error('c21-b475-22871');
if (BATCH475_KYR6E_T343U[3].id !== 'c21-b475-22399' || BATCH475_KYR6E_T343U[3].verdict !== 'clean' || Boolean(BATCH475_KYR6E_T343U[3].honestNote) !== false || (BATCH475_KYR6E_T343U[3].barcode ?? '') !== '740985223994') throw new Error('c21-b475-22399');
if (BATCH475_KYR6E_T343U[4].id !== 'c21-b475-22692' || BATCH475_KYR6E_T343U[4].verdict !== 'caution' || Boolean(BATCH475_KYR6E_T343U[4].honestNote) !== false || (BATCH475_KYR6E_T343U[4].barcode ?? '') !== '740985226926') throw new Error('c21-b475-22692');
if (BATCH475_KYR6E_T343U[5].id !== 'c21-b475-22713' || BATCH475_KYR6E_T343U[5].verdict !== 'caution' || Boolean(BATCH475_KYR6E_T343U[5].honestNote) !== false || (BATCH475_KYR6E_T343U[5].barcode ?? '') !== '740985227138') throw new Error('c21-b475-22713');
if (BATCH475_KYR6E_T343U[6].id !== 'c21-b475-27072' || BATCH475_KYR6E_T343U[6].verdict !== 'caution' || Boolean(BATCH475_KYR6E_T343U[6].honestNote) !== false || (BATCH475_KYR6E_T343U[6].barcode ?? '') !== '740985270721') throw new Error('c21-b475-27072');
if (BATCH475_KYR6E_T343U[7].id !== 'c21-b475-21464' || BATCH475_KYR6E_T343U[7].verdict !== 'caution' || Boolean(BATCH475_KYR6E_T343U[7].honestNote) !== false || (BATCH475_KYR6E_T343U[7].barcode ?? '') !== '740985214640') throw new Error('c21-b475-21464');
if (BATCH475_KYR6E_T343U[8].id !== 'c21-b475-27685' || BATCH475_KYR6E_T343U[8].verdict !== 'avoid' || Boolean(BATCH475_KYR6E_T343U[8].honestNote) !== false || (BATCH475_KYR6E_T343U[8].barcode ?? '') !== '740985276853') throw new Error('c21-b475-27685');
if (BATCH475_KYR6E_T343U[9].id !== 'c21-b475-27619' || BATCH475_KYR6E_T343U[9].verdict !== 'avoid' || Boolean(BATCH475_KYR6E_T343U[9].honestNote) !== false || (BATCH475_KYR6E_T343U[9].barcode ?? '') !== '740985276198') throw new Error('c21-b475-27619');
if (BATCH475_KYR6E_T343U[10].id !== 'c21-b475-27617' || BATCH475_KYR6E_T343U[10].verdict !== 'avoid' || Boolean(BATCH475_KYR6E_T343U[10].honestNote) !== false || (BATCH475_KYR6E_T343U[10].barcode ?? '') !== '740985276174') throw new Error('c21-b475-27617');
if (BATCH475_KYR6E_T343U[11].id !== 'c21-b475-27618' || BATCH475_KYR6E_T343U[11].verdict !== 'avoid' || Boolean(BATCH475_KYR6E_T343U[11].honestNote) !== false || (BATCH475_KYR6E_T343U[11].barcode ?? '') !== '740985276181') throw new Error('c21-b475-27618');
if (BATCH475_KYR6E_T343U[12].id !== 'c21-b475-21339' || BATCH475_KYR6E_T343U[12].verdict !== 'caution' || Boolean(BATCH475_KYR6E_T343U[12].honestNote) !== false || (BATCH475_KYR6E_T343U[12].barcode ?? '') !== '740985213391') throw new Error('c21-b475-21339');
if (BATCH475_KYR6E_T343U[13].id !== 'c21-b475-22928' || BATCH475_KYR6E_T343U[13].verdict !== 'caution' || Boolean(BATCH475_KYR6E_T343U[13].honestNote) !== false || (BATCH475_KYR6E_T343U[13].barcode ?? '') !== '740985229286') throw new Error('c21-b475-22928');
