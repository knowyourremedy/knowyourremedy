// DRAFT / not verified / batch 469 KYR6-e (t336u).
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
import { t335uResolve } from '../scan-preview/t335uLocks';
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
  const hit = t335uResolve(name, form);
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
    || t146uWhyForName(inner)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t336u unlocked ${name}`);
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

function row(id: string, name: string, form: string, handle: string, barcode: string, names: string[]): RatingRecord {
  const inactiveIngredients = names.map((ingredient) => locked(ingredient, form));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const record: RatingRecord = {
    id,
    productName: name,
    brand: 'Mason Natural',
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Mason Natural'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    barcode,
    sourcesGeneral: [
      `https://masonnatural.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH469_KYR6E_T336U: RatingRecord[] = [
  row(
    'mason-b469-vitamin-c-500-100-tablets',
    'Mason Natural Vitamin C 500 mg, 100 Tablets',
    'tablet',
    'mason-natural-vitamin-c-500-mg-supports-healthy-immune-system-antioxidant-and-essential-nutrient-100-tablets',
    '311845051714',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Stearic Acid',
      'Microcrystalline Cellulose',
      'Silicon Dioxide',
      'Vegetable Magnesium Stearate',
      'Croscarmellose Sodium',
      'Hydroxypropyl Methylcellulose',
    ],
  ),
  row(
    'mason-b469-vitamin-e-400-100-softgels',
    'Mason Natural Vitamin E 400 IU (180 mg), 100 Softgels',
    'softgel',
    'mason-natural-vitamin-e-180-mg-400-iu-antioxidant-and-essential-nutrient-healthy-immune-system-skin-and-eyes-whole-body-supplement-100-softgels',
    '311845050519',
    [
      'Vitamin E (as DL-Alpha-Tocopherol Acetate)',
      'Gelatin Bovine',
      'Glycerin',
      'Water, Purified',
    ],
  ),
];

if (BATCH469_KYR6E_T336U[0].id !== 'mason-b469-vitamin-c-500-100-tablets' || BATCH469_KYR6E_T336U[0].verdict !== 'caution' || BATCH469_KYR6E_T336U[0].barcode !== '311845051714' || BATCH469_KYR6E_T336U[0].honestNote) throw new Error('mason-b469-vitamin-c-500-100-tablets');
if (BATCH469_KYR6E_T336U[1].id !== 'mason-b469-vitamin-e-400-100-softgels' || BATCH469_KYR6E_T336U[1].verdict !== 'clean' || BATCH469_KYR6E_T336U[1].barcode !== '311845050519' || BATCH469_KYR6E_T336U[1].honestNote) throw new Error('mason-b469-vitamin-e-400-100-softgels');
