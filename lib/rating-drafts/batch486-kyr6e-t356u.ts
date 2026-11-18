// DRAFT / not verified / batch 486 KYR6-e (t356u).
// The last two held Nature's Truth panels. UPCs are DSLD codes whose check digits pass.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t140uWhyForName } from '../scan-preview/t140uTokenWhy';
import { t146uWhyForName } from '../scan-preview/t146uTokenWhy';
import { t356uResolve } from '../scan-preview/t356uLocks';
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
  const useForm = name === 'Norwegian Cod Liver Oil' && /\bsoftgel\b/i.test(form) && /cod liver oil/i.test(productName)
    ? `${form} base`
    : form;
  const hit = t356uResolve(name, useForm);
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
  if (!hit || !why) throw new Error(`t356u unlocked ${name}`);
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

export const BATCH486_KYR6E_T356U: RatingRecord[] = [
  row(
    'nt-b486-tribulus-terrestris-1000-mg-nt2001-100',
    "Nature's Truth Tribulus Terrestris 1000 mg, 100",
    'capsule',
    'tribulus-terrestris-1000-mg-nt2001',
    '840093113184',
    [
      'Tribulus terrestris Fruit Extract (as Saponins)',
      'Rice, Powder',
      'Gelatin',
      'Magnesium Stearate',
    ],
  ),
  row(
    'nt-b486-norwegian-cod-liver-oil-with-epa-dha-nt1571-100',
    "Nature's Truth Norwegian Cod Liver Oil with EPA, DHA, 100",
    'softgel',
    'norwegian-cod-liver-oil-with-epa-dha-nt1571',
    '840093101495',
    [
      'Vitamin A (as Retinyl Palmitate)',
      'Vitamin D (as Vitamin D3)',
      'Norwegian Cod Liver Oil',
      'Gelatin',
      'Glycerin',
    ],
  ),
];

const T356U_EXPECT: Array<[string, RatingRecord['verdict'], boolean, string]> = [
  ['nt-b486-tribulus-terrestris-1000-mg-nt2001-100', 'clean', false, '840093113184'],
  ['nt-b486-norwegian-cod-liver-oil-with-epa-dha-nt1571-100', 'caution', false, '840093101495'],
];

for (const [id, verdict, note, barcode] of T356U_EXPECT) {
  const found = BATCH486_KYR6E_T356U.find((record) => record.id === id);
  if (!found || found.verdict !== verdict || Boolean(found.honestNote) !== note || (found.barcode ?? '') !== barcode) {
    throw new Error(id);
  }
}
