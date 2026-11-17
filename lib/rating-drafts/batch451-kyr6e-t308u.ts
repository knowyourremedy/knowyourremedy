// DRAFT / not verified / batch 451 KYR6-e (t308u).
// Emerald Labs capsules whose supplement-facts and other-ingredient tokens are locked.
// No honest note. Carton barcodes are on the brand label images. The check digits pass.

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
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function locked(name: string): IngredientFlag {
  const hit = t256uResolve(name, 'capsule');
  const why = hit?.lock.why
    || (t240uNorm(name) === 'water' ? cleanTokenWhyForName(name) : undefined)
    || t134uWhyForName(name)
    || cleanTokenWhyForName(name);
  if (!hit || !why || hit.lock.grade !== 'cleared' || hit.lock.counts) throw new Error(`t308u ${name}`);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

function row(id: string, name: string, formId: string, facts: string[], handle: string, note: string, barcode: string): RatingRecord {
  return {
    id, productName: name, brand: 'Emerald Labs', category: 'Vitamins', formulaId: formId, form: 'capsule',
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Emerald Labs'], barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [...facts, ...SHELL].map(locked),
    verdict: 'clean',
    sourcesGeneral: [`${SITE}/${handle} ${note} Label barcode ${barcode}. The check digit passes.`],
  };
}

export const BATCH451_KYR6E_T308U: RatingRecord[] = [
  row('emerald-labs-b451-msm-1000-200', 'Emerald Labs MSM 1000 mg, 200 capsules', 'emerald-labs-b451-msm-1000', ['MSM (Methylsulfonylmethane)'], 'msm-1000mg-2', 'Other ingredients: vegetable capsule (hypromellose (from non-GMO pine bark), water). 200 capsules.', '743650101047'),
  row('emerald-labs-b451-nac-60', 'Emerald Labs NAC 600 mg, 60 capsules', 'emerald-labs-b451-nac', ['N-Acetyl-L-Cysteine'], 'nac-600mg', 'Other ingredients: vegetable capsule (hypromellose (from non-GMO pine bark), water). 60 capsules.', '743650003709'),
  row('emerald-labs-b451-glutathione-30', 'Emerald Labs L-Glutathione Setria, 30 capsules', 'emerald-labs-b451-glutathione', ['Setria® Glutathione (L-Glutathione)'], 'l-glutathione', 'Other ingredients: vegetable capsule (hypromellose (from non-GMO pine bark), water). 30 capsules.', '743650104437'),
  row('emerald-labs-b451-dhea-50-60', 'Emerald Labs DHEA 50 mg, 60 capsules', 'emerald-labs-b451-dhea-50', ['DHEA (Dehydroepiandrosterone)', 'Tocotriene Complex'], 'dhea-50mg', 'Other ingredients: vegetable capsule (hypromellose (from non-GMO pine bark), water). 60 capsules.', '743650100163'),
  row('emerald-labs-b451-vitamin-c-90', 'Emerald Labs Vitamin C as PureWay-C, 90 capsules', 'emerald-labs-b451-vitamin-c', ['Vitamin C (as Ascorbic Acid from PureWay-C®)', 'R-Alpha Lipoic Acid'], 'vitamin-c-pureway-c', 'Other ingredients: vegetable capsule (hypromellose (from non-GMO pine bark), water). 90 capsules. Serving size 2.', '743650003556'),
  row('emerald-labs-b451-olive-leaf-60', 'Emerald Labs Olive Leaf, 60 capsules', 'emerald-labs-b451-olive-leaf', ['Olive Leaf Extract (Standardized to 18% Oleuropein)'], 'olive-leaf', 'Other ingredients: vegetable capsule (hypromellose (from non-GMO pine bark), water). 60 capsules.', '743650001866'),
  row('emerald-labs-b451-quercetin-60', 'Emerald Labs Quercetin Phytosome, 60 capsules', 'emerald-labs-b451-quercetin', ['Sophora japonica L. extract (flower)', 'Sunflower lecithin'], 'quercetin-phytosome', 'Other ingredients: vegetable capsule (hypromellose (from non-GMO pine bark), water). 60 capsules. Quercefit parts: Sophora japonica L. extract (flower); Sunflower lecithin.', '743650003655'),
];
