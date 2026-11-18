// DRAFT / not verified / batch 480 KYR6-e (t349u).
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
import { t347uResolve } from '../scan-preview/t347uLocks';
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
  const hit = t347uResolve(name, useForm);
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
  if (!hit || !why) throw new Error(`t349u unlocked ${name}`);
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

export const BATCH480_KYR6E_T349U: RatingRecord[] = [
  row(
    'nm-b480-turmeric-extra-strength-1000-mg-capsules-60',
    'Nature Made Turmeric Extra Strength 1000 mg (950 mg Curcuminoids) Per Serving Capsules, 60',
    'capsule',
    'turmeric-extra-strength-1000-mg-capsules',
    undefined,
    [
      'Turmeric Root Extract',
      'Black Pepper Fruit Extract',
      'Microcrystalline Cellulose',
      'Hypromellose',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Stearic Acid',
    ],
  ),
  row(
    'nm-b480-magnesium-complex-with-d3-and-zinc-60',
    'Nature Made Magnesium Complex Capsules with D3 and Zinc, 60',
    'capsule',
    'magnesium-complex-with-d3-and-zinc',
    '031604002596',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Magnesium (as Magnesium Citrate, Magnesium Glycinate, Magnesium Malate, Magnesium Oxide)',
      'Zinc (as Zinc Ascorbate, Zinc Citrate)',
      'Rice Flour',
      'Hypromellose',
      'Palm Oil',
    ],
  ),
  row(
    'nm-b480-vitamin-d3-50-mcg-2000-iu-softgels-90',
    'Nature Made Vitamin D3 2000 IU (50 mcg) Softgels, 90',
    'softgel',
    'vitamin-d3-50-mcg-2000-iu-softgels',
    '031604025854',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Water',
    ],
  ),
  row(
    'nm-b480-nature-made-flaxseed-oil-1-000-mg-softgels-100',
    'Nature Made Flaxseed Oil 1000 mg Softgels, 100',
    'softgel',
    'nature-made-flaxseed-oil-1-000-mg-softgels',
    '031604016173',
    [
      'Vitamin E (as D-Alpha-Tocopherol)',
      'organic Flaxseed Oil',
      'Gelatin',
      'Glycerin',
      'Water',
    ],
  ),
  row(
    'nm-b480-nature-made-flaxseed-oil-1-000-mg-softgels-180',
    'Nature Made Flaxseed Oil 1000 mg Softgels, 180',
    'softgel',
    'nature-made-flaxseed-oil-1-000-mg-softgels',
    '031604017156',
    [
      'Vitamin E (as D-Alpha-Tocopherol)',
      'organic Flaxseed Oil',
      'Gelatin',
      'Glycerin',
      'Water',
    ],
  ),
  row(
    'nm-b480-nature-made-fish-oil-1-200-mg-softgels-150',
    'Nature Made Fish Oil 1200 mg Softgels, 150',
    'softgel',
    'nature-made-fish-oil-1-200-mg-softgels',
    '031604042943',
    [
      'Fish Oil',
      'Gelatin',
      'Glycerin',
      'Water',
      'Tocopherols',
    ],
  ),
  row(
    'nm-b480-nature-made-fish-oil-1-200-mg-softgels-230',
    'Nature Made Fish Oil 1200 mg Softgels, 230',
    'softgel',
    'nature-made-fish-oil-1-200-mg-softgels',
    '031604042950',
    [
      'Fish Oil',
      'Gelatin',
      'Glycerin',
      'Water',
      'Tocopherols',
    ],
  ),
  row(
    'nm-b480-vitamin-d3-25-mcg-1000-iu-softgels-180',
    'Nature Made Vitamin D3 1000 IU (25 mcg) Softgels, 180',
    'softgel',
    'vitamin-d3-25-mcg-1000-iu-softgels',
    '031604026769',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
    ],
  ),
];

if (BATCH480_KYR6E_T349U[0].id !== 'nm-b480-turmeric-extra-strength-1000-mg-capsules-60' || BATCH480_KYR6E_T349U[0].verdict !== 'caution' || Boolean(BATCH480_KYR6E_T349U[0].honestNote) !== false || (BATCH480_KYR6E_T349U[0].barcode ?? '') !== '') throw new Error('nm-b480-turmeric-extra-strength-1000-mg-capsules-60');
if (BATCH480_KYR6E_T349U[1].id !== 'nm-b480-magnesium-complex-with-d3-and-zinc-60' || BATCH480_KYR6E_T349U[1].verdict !== 'caution' || Boolean(BATCH480_KYR6E_T349U[1].honestNote) !== false || (BATCH480_KYR6E_T349U[1].barcode ?? '') !== '031604002596') throw new Error('nm-b480-magnesium-complex-with-d3-and-zinc-60');
if (BATCH480_KYR6E_T349U[2].id !== 'nm-b480-vitamin-d3-50-mcg-2000-iu-softgels-90' || BATCH480_KYR6E_T349U[2].verdict !== 'caution' || Boolean(BATCH480_KYR6E_T349U[2].honestNote) !== false || (BATCH480_KYR6E_T349U[2].barcode ?? '') !== '031604025854') throw new Error('nm-b480-vitamin-d3-50-mcg-2000-iu-softgels-90');
if (BATCH480_KYR6E_T349U[3].id !== 'nm-b480-nature-made-flaxseed-oil-1-000-mg-softgels-100' || BATCH480_KYR6E_T349U[3].verdict !== 'caution' || Boolean(BATCH480_KYR6E_T349U[3].honestNote) !== false || (BATCH480_KYR6E_T349U[3].barcode ?? '') !== '031604016173') throw new Error('nm-b480-nature-made-flaxseed-oil-1-000-mg-softgels-100');
if (BATCH480_KYR6E_T349U[4].id !== 'nm-b480-nature-made-flaxseed-oil-1-000-mg-softgels-180' || BATCH480_KYR6E_T349U[4].verdict !== 'caution' || Boolean(BATCH480_KYR6E_T349U[4].honestNote) !== false || (BATCH480_KYR6E_T349U[4].barcode ?? '') !== '031604017156') throw new Error('nm-b480-nature-made-flaxseed-oil-1-000-mg-softgels-180');
if (BATCH480_KYR6E_T349U[5].id !== 'nm-b480-nature-made-fish-oil-1-200-mg-softgels-150' || BATCH480_KYR6E_T349U[5].verdict !== 'clean' || Boolean(BATCH480_KYR6E_T349U[5].honestNote) !== false || (BATCH480_KYR6E_T349U[5].barcode ?? '') !== '031604042943') throw new Error('nm-b480-nature-made-fish-oil-1-200-mg-softgels-150');
if (BATCH480_KYR6E_T349U[6].id !== 'nm-b480-nature-made-fish-oil-1-200-mg-softgels-230' || BATCH480_KYR6E_T349U[6].verdict !== 'clean' || Boolean(BATCH480_KYR6E_T349U[6].honestNote) !== false || (BATCH480_KYR6E_T349U[6].barcode ?? '') !== '031604042950') throw new Error('nm-b480-nature-made-fish-oil-1-200-mg-softgels-230');
if (BATCH480_KYR6E_T349U[7].id !== 'nm-b480-vitamin-d3-25-mcg-1000-iu-softgels-180' || BATCH480_KYR6E_T349U[7].verdict !== 'caution' || Boolean(BATCH480_KYR6E_T349U[7].honestNote) !== false || (BATCH480_KYR6E_T349U[7].barcode ?? '') !== '031604026769') throw new Error('nm-b480-vitamin-d3-25-mcg-1000-iu-softgels-180');
