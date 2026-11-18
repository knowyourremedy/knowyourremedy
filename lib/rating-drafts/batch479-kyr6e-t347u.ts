// DRAFT / not verified / batch 479 KYR6-e (t347u).
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
  if (!hit || !why) throw new Error(`t347u unlocked ${name}`);
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

export const BATCH479_KYR6E_T347U: RatingRecord[] = [
  row(
    'c21-b479-27418',
    '21st Century Healthy Eyes Extra, 36 Tablets',
    'tablet',
    'healthy-eyes-extra',
    '740985274187',
    [
      'Vitamin A (as Beta-Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide, Vitamin B3)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Cupric Oxide)',
      'Manganese (as Manganese Sulfate)',
      'L-Glutathione',
      'Lutein',
      'Cellulose',
      'Gelatin',
      'Stearic Acid',
      'Starch',
      'FD&C Yellow #6',
      'Croscarmellose Sodium',
      'Dextrin',
      'Dextrose',
      'Gum Arabic',
      'Hydroxypropyl Methylcellulose',
      'Magnesium Stearate',
      'Maltodextrin',
      'Medium Chain Triglyceride',
      'PEG',
      'Polydextrose',
      'Silicon Dioxide',
      'Sodium Carboxymethylcellulose',
      'Sodium Citrate',
      'Titanium Dioxide',
      'Triacetin',
    ],
  ),
  row(
    'c21-b479-27367',
    '21st Century Krill Oil 350 mg, 60 Softgels',
    'softgel',
    'krill-oil-350mg-easy-to-swallow',
    '740985273678',
    [
      'Krill Oil',
      'Eicosapentaenoic Acid',
      'Docosahexaenoic Acid',
      'Phospholipids',
      'Gelatin',
      'Glycerin',
      'Water',
      'Sorbitol',
      'Vanillin',
    ],
  ),
];

if (BATCH479_KYR6E_T347U[0].id !== 'c21-b479-27418' || BATCH479_KYR6E_T347U[0].verdict !== 'avoid' || Boolean(BATCH479_KYR6E_T347U[0].honestNote) !== false || (BATCH479_KYR6E_T347U[0].barcode ?? '') !== '740985274187') throw new Error('c21-b479-27418');
if (BATCH479_KYR6E_T347U[1].id !== 'c21-b479-27367' || BATCH479_KYR6E_T347U[1].verdict !== 'caution' || Boolean(BATCH479_KYR6E_T347U[1].honestNote) !== false || (BATCH479_KYR6E_T347U[1].barcode ?? '') !== '740985273678') throw new Error('c21-b479-27367');
