// DRAFT / not verified / batch 476 KYR6-e (t344u).
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
import { t344uResolve } from '../scan-preview/t344uLocks';
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
  const hit = t344uResolve(name, useForm);
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
  if (!hit || !why) throw new Error(`t344u unlocked ${name}`);
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

export const BATCH476_KYR6E_T344U: RatingRecord[] = [
  row(
    'c21-b476-27438',
    '21st Century Glucosamine Chondroitin Complex Plus MSM, 120 Tablets',
    'tablet',
    'glucosamine-chondroitin-complex-plus-msm-advanced-triple-strength',
    '740985274385',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Manganese (as Manganese Sulfate)',
      'Glucosamine Hydrochloride',
      'Chondroitin Sulfate',
      'Methylsulfonylmethane',
      'Collagen, Hydrolyzed',
      'Boswellia serrata',
      'Hyaluronic Acid (as Sodium Hyaluronate)',
      'Boswellia serrata Extract',
      'Boron (as Sodium Borate)',
      'Cellulose',
      'Polyplasdone',
      'FD&C Blue #2 Carmine',
      'FD&C Red #40',
      'FD&C Yellow #5',
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
    'c21-b476-21689',
    '21st Century Saw Palmetto 450 mg, 200 Vegetarian Capsules',
    'capsule',
    'saw-palmetto-450mg',
    '740985216897',
    [
      'Zinc (as Zinc Picolinate)',
      'Saw Palmetto',
      'Cellulose',
      'Rice Bran Extract',
      'Rice hull concentrate',
    ],
  ),
  row(
    'c21-b476-21154',
    '21st Century Selenium 200 mcg, 60 Capsules',
    'capsule',
    'selenium-200mcg',
    '740985211540',
    [
      'Selenium (as Selenium Yeast)',
      'Rice Bran',
      'Brewer\'s Yeast',
      'Oat Fiber',
      'Gelatin',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b476-22702',
    '21st Century Sentry Adults, 300 Tablets',
    'tablet',
    'sentry',
    '740985227022',
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
      'Cellulose',
      'Starch',
      'Stearic Acid',
      'Vegetable Oil',
      'FD&C Yellow #6',
      'Croscarmellose Sodium',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'Monoglycerides',
      'Diglycerides',
      'PEG/PVA Copolymer',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b476-21151',
    '21st Century Vitamin B-1 100 mg, 110 Tablets',
    'tablet',
    'vitamin-b-1-100mg',
    '740985211519',
    [
      'Thiamine (as Thiamine Hydrochloride, Vitamin B1)',
      'Calcium (as Calcium Carbonate)',
      'Maltodextrin',
      'Cellulose',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b476-27452',
    '21st Century Healthy Eyes Lutein & Antioxidants, 60 Tablets',
    'tablet',
    'healthy-eyes-lutein',
    '740985274521',
    [
      'Vitamin A (as Beta-Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Calcium (as Calcium Carbonate)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenite)',
      'Copper (as Cupric Oxide)',
      'Lutein',
      'Cellulose',
      'Gelatin',
      'Starch',
      'Maltodextrin',
      'Silicon Dioxide',
      'Artificial color',
      'Croscarmellose Sodium',
      'Gum Arabic',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'PEG',
      'Polyvinyl alcohol',
      'Stearic Acid',
      'Titanium Dioxide',
    ],
  ),
];

if (BATCH476_KYR6E_T344U[0].id !== 'c21-b476-27438' || BATCH476_KYR6E_T344U[0].verdict !== 'avoid' || Boolean(BATCH476_KYR6E_T344U[0].honestNote) !== false || (BATCH476_KYR6E_T344U[0].barcode ?? '') !== '740985274385') throw new Error('c21-b476-27438');
if (BATCH476_KYR6E_T344U[1].id !== 'c21-b476-21689' || BATCH476_KYR6E_T344U[1].verdict !== 'clean' || Boolean(BATCH476_KYR6E_T344U[1].honestNote) !== false || (BATCH476_KYR6E_T344U[1].barcode ?? '') !== '740985216897') throw new Error('c21-b476-21689');
if (BATCH476_KYR6E_T344U[2].id !== 'c21-b476-21154' || BATCH476_KYR6E_T344U[2].verdict !== 'caution' || Boolean(BATCH476_KYR6E_T344U[2].honestNote) !== false || (BATCH476_KYR6E_T344U[2].barcode ?? '') !== '740985211540') throw new Error('c21-b476-21154');
if (BATCH476_KYR6E_T344U[3].id !== 'c21-b476-22702' || BATCH476_KYR6E_T344U[3].verdict !== 'avoid' || Boolean(BATCH476_KYR6E_T344U[3].honestNote) !== false || (BATCH476_KYR6E_T344U[3].barcode ?? '') !== '740985227022') throw new Error('c21-b476-22702');
if (BATCH476_KYR6E_T344U[4].id !== 'c21-b476-21151' || BATCH476_KYR6E_T344U[4].verdict !== 'caution' || Boolean(BATCH476_KYR6E_T344U[4].honestNote) !== false || (BATCH476_KYR6E_T344U[4].barcode ?? '') !== '740985211519') throw new Error('c21-b476-21151');
if (BATCH476_KYR6E_T344U[5].id !== 'c21-b476-27452' || BATCH476_KYR6E_T344U[5].verdict !== 'avoid' || Boolean(BATCH476_KYR6E_T344U[5].honestNote) !== false || (BATCH476_KYR6E_T344U[5].barcode ?? '') !== '740985274521') throw new Error('c21-b476-27452');
