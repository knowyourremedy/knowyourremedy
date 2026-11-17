// DRAFT / not verified / batch 446 KYR6-e (t301u).
// PARA Smart. Capsules and drops are one program. Both other-ingredient lines are Cleared.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t299uLock } from '../scan-preview/t299uLocks';
import { t301uLock } from '../scan-preview/t301uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'cleared'
    ? `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`
    : `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string): IngredientFlag {
  const own = t301uLock(name) ?? t299uLock(name, 'capsule');
  if (own) return fromLock(name, own.grade, own.counts, own.why, t301uLock(name) ? 't301u' : 't299u');
  const hit = t256uResolve(name, 'capsule');
  const why = hit?.lock.why || cleanTokenWhyForName(name);
  if (!hit || !why) throw new Error(`t301u stored ${name}`);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

export const BATCH446_KYR6E_T301U: RatingRecord[] = [
  {
    id: 'renew-life-b446-para-smart',
    productName: 'Renew Life PARA Smart',
    brand: 'Renew Life',
    category: 'Vitamins',
    formulaId: 'renew-life-b446-para-smart',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Renew Life'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      stored('Non-GMO Vegetarian capsule'),
      stored('Filtered water'),
      stored('ethyl alcohol USP'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      'https://www.renewlife.com/products/para-smart-cleansing-formula-15-day-program-rn15521 facts image. Capsule other ingredient: Non-GMO Vegetarian capsule. Drop other ingredients: Filtered water and ethyl alcohol USP. Percent Alcohol: 35-45%. Contains tree nuts is an allergen line. No sourced UPC. Missing UPC.',
    ],
  },
];
