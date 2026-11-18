// DRAFT / not verified / batch 489 KYR6-e (t359u).
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
import { t359uResolve } from '../scan-preview/t359uLocks';
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
  return t359uResolve(name, form);
}

function locked(name: string, form: string, productName: string): IngredientFlag {
  const useForm = /flaxseed oil/i.test(name) && /flaxseed oil/i.test(productName)
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
  if (!hit || !why) throw new Error(`t359u unlocked ${name}`);
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

export const BATCH489_KYR6E_T359U: RatingRecord[] = [

  row(
    "sg-b489-b-complex-with-vitamin-c-stress-formula-tablets-100",
    "Solgar B Complex With Vitamin C Stress Formula Tablets, 100",
    "tablet",
    "b-complex-with-vitamin-c-stress-formula-tablets",
    "033984002005",
    [
      "Vitamin C (as L-Ascorbic Acid)",
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
      "Acerola Complex",
      "Alfalfa",
      "Parsley",
      "Rose Hips",
      "Watercress",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Silica",
      "Stearic Acid",
      "Titanium Dioxide",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b489-b-complex-with-vitamin-c-stress-formula-tablets-250",
    "Solgar B Complex With Vitamin C Stress Formula Tablets, 250",
    "tablet",
    "b-complex-with-vitamin-c-stress-formula-tablets",
    "033984002012",
    [
      "Vitamin C (as L-Ascorbic Acid)",
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
      "Acerola Complex",
      "Alfalfa",
      "Parsley",
      "Rose Hips",
      "Watercress",
      "Microcrystalline Cellulose",
      "Vegetable Cellulose",
      "Silica",
      "Stearic Acid",
      "Titanium Dioxide",
      "Vegetable Magnesium Stearate",
      "Vegetable Glycerin",
    ],
  ),
  row(
    "sg-b489-dlpa-500-mg-vegetable-capsules-50",
    "Solgar Dlpa 500 mg Vegetable Capsules, 50",
    "capsule",
    "dlpa-500-mg-vegetable-capsules",
    "033984010109",
    [
      "DL-Phenylalanine",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
    ],
  ),
  row(
    "sg-b489-dlpa-500-mg-vegetable-capsules-100",
    "Solgar Dlpa 500 mg Vegetable Capsules, 100",
    "capsule",
    "dlpa-500-mg-vegetable-capsules",
    "033984010116",
    [
      "DL-Phenylalanine",
      "Vegetable Cellulose",
      "Vegetable Magnesium Stearate",
      "Silica",
    ],
  ),
];

export const T359U_EXPECT: Array<[string, RatingRecord["verdict"], boolean, string]> = [
  ["sg-b489-b-complex-with-vitamin-c-stress-formula-tablets-100", "avoid", false, "033984002005"],
  ["sg-b489-b-complex-with-vitamin-c-stress-formula-tablets-250", "avoid", false, "033984002012"],
  ["sg-b489-dlpa-500-mg-vegetable-capsules-50", "caution", false, "033984010109"],
  ["sg-b489-dlpa-500-mg-vegetable-capsules-100", "caution", false, "033984010116"],
];

for (const [id, verdict, note, barcode] of T359U_EXPECT) {
  const found = BATCH489_KYR6E_T359U.find((record) => record.id === id);
  if (!found || found.verdict !== verdict || Boolean(found.honestNote) !== note || (found.barcode ?? '') !== barcode) {
    throw new Error(id);
  }
}
