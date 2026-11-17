// DRAFT / not verified / batch 454 KYR6-e (t314u).
// Emerald Labs capsules whose panel tokens are locked or matched to an existing lock.
// No honest note. A barcode is set only when a carton image already supplied one.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t240uNorm } from '../scan-preview/t240uLocks';
import { t256uResolve } from '../scan-preview/t256uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const SITE = 'https://store.emeraldlabs.com/products';
const SHELL = ['hypromellose (from non-GMO pine bark)', 'water'] as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function locked(name: string): IngredientFlag {
  const hit = t256uResolve(name, 'capsule');
  const why = hit?.lock.why
    || (t240uNorm(name) === 'water' ? cleanTokenWhyForName(name) : undefined)
    || t134uWhyForName(name)
    || cleanTokenWhyForName(name);
  if (!hit || !why || hit.lock.grade !== 'cleared' || hit.lock.counts) throw new Error(`t314u ${name}`);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

function row(id: string, name: string, formId: string, facts: string[], handle: string, note: string, barcode: string): RatingRecord {
  return {
    id, productName: name, brand: 'Emerald Labs', category: 'Vitamins', formulaId: formId, form: 'capsule',
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Emerald Labs'],
    barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [...facts, ...SHELL].map(locked),
    verdict: 'clean',
    sourcesGeneral: [`${SITE}/${handle} ${note} Label barcode ${barcode}. The check digit passes.`],
  };
}

export const BATCH454_KYR6E_T314U: RatingRecord[] = [
  row(
    'emerald-labs-b454-camu-camu-60',
    'Emerald Labs Camu Camu Extract, 60 capsules',
    'emerald-labs-b454-camu-camu',
    ['Camu Camu Juice Powder (Myrciaria dubia) (20% Vitamin C) (Each serving has 200mg of Vitamin C)'],
    'camu-camu',
    'Serving size 2. 30 servings. 60 capsules.',
    '743650001514',
  ),
  row(
    'emerald-labs-b454-coq10-200-30',
    'Emerald Labs CoQ10 200 mg, 30 capsules',
    'emerald-labs-b454-coq10-200',
    ['Vitamin E (from Sunflower-based D-Alpha Tocopherol) (60 IU)', 'CoenzymeQ10 (Ubiquinone)', 'Tocotriene Complex'],
    'coq10-200mg',
    'Serving size 1. 30 servings. 30 capsules.',
    '743650104345',
  ),
];
