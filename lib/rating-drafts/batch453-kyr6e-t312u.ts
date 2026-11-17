// DRAFT / not verified / batch 453 KYR6-e (t312u).
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
  if (!hit || !why || hit.lock.grade !== 'cleared' || hit.lock.counts) throw new Error(`t312u ${name}`);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

function row(id: string, name: string, formId: string, facts: string[], handle: string, note: string, barcode?: string): RatingRecord {
  return {
    id, productName: name, brand: 'Emerald Labs', category: 'Vitamins', formulaId: formId, form: 'capsule',
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Emerald Labs'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [...facts, ...SHELL].map(locked),
    verdict: 'clean',
    sourcesGeneral: [`${SITE}/${handle} ${note}${barcode ? ` Label barcode ${barcode}. The check digit passes.` : ' No sourced UPC. Missing UPC.'}`],
  };
}

export const BATCH453_KYR6E_T312U: RatingRecord[] = [
  row('emerald-labs-b453-bitter-melon-60', 'Emerald Labs Bitter Melon, 60 capsules', 'emerald-labs-b453-bitter-melon', ['Bitter Melon Fruit Extract (4:1) (Powder) (Momordica Charantia)'], 'bitter-melon', 'Serving size 2. 30 servings. 60 capsules.', '743650002115'),
  row('emerald-labs-b453-nmn-30', 'Emerald Labs Liposomal NMN+ RedOrange Complex, 30 capsules', 'emerald-labs-b453-nmn', ['RedOrange Complex™ (BIONAP) (Citrus sinensis) (juice)', 'Liposomal NMN™ (nicotinamide mononucleotide)'], 'nmn-redorange-complex', '30 capsules.', '743650003761'),
  row('emerald-labs-b453-magnesium-120', 'Emerald Labs Magnesium 400 mg, 120 capsules', 'emerald-labs-b453-magnesium', ['Magnesium', 'Albion® Magnesium Bisglycinate Chelate Buffered', 'Magnesium Bisglycinate Chelate', 'Magnesium Oxide'], 'magnesium-400mg', 'Serving size 4. 30 servings. 120 capsules.'),
  row('emerald-labs-b453-affron-30', 'Emerald Labs Affron Saffron Extract, 30 capsules', 'emerald-labs-b453-affron', ['Affron® Saffron Extract (3.5% Lepticrosalides®) (Crocus sativus stigma)', 'Tocotriene Complex'], 'affron®-saffron-extract', '30 capsules.'),
  row('emerald-labs-b453-african-mango-60', 'Emerald Labs African Mango, 60 capsules', 'emerald-labs-b453-african-mango', ['Irvingia Gabonensis Extract (seed)', 'IGOB 131® Proprietary Extract', 'Tocotriene Complex'], 'african-mango', '60 capsules.'),
  row('emerald-labs-b453-cranberry-60', 'Emerald Labs Cranberry Fruit, 60 capsules', 'emerald-labs-b453-cranberry', ['PACran™ Cranberry Extract (powder) (Standardized to 1.5% A-Type PAC)', 'Cranberry Powder'], 'cranberry-fruit', 'Serving size 2. 30 servings. 60 capsules.'),
  row('emerald-labs-b453-ginkgo-60', 'Emerald Labs Ginkgo Biloba, 60 capsules', 'emerald-labs-b453-ginkgo', ['European Ginkgo Biloba Extract (24% Ginkgo Flavonoglycosides / 6% Terpene Lactones)', 'Tocotriene Complex'], 'ginkgo-biloba', 'Serving size 2. 30 servings. 60 capsules.'),
  row('emerald-labs-b453-grape-seed-90', 'Emerald Labs Grape Seed Extract, 90 capsules', 'emerald-labs-b453-grape-seed', ["European Grape Seed Extract (95% OPC's)", 'Tocotriene Complex'], 'grape-seed-extract', '90 capsules.'),
  row('emerald-labs-b453-milk-thistle-60', 'Emerald Labs Milk Thistle, 60 capsules', 'emerald-labs-b453-milk-thistle', ['European Milk Thistle Extract (80% Silymarin - yielding all 6 Isomers)', 'Tocotriene Complex'], 'milk-thistle', '60 capsules.'),
  row('emerald-labs-b453-meratrim-60', 'Emerald Labs Meratrim, 60 capsules', 'emerald-labs-b453-meratrim', ['Meratrim®', 'Garcinia Mangostana', 'Sphaeranthus Indicus', 'Tocotriene Complex'], 'meratrim', '60 capsules.'),
  row('emerald-labs-b453-gentle-iron-120', 'Emerald Labs Gentle Iron 25 mg, 120 capsules', 'emerald-labs-b453-gentle-iron', ['Iron', 'Ferrochel® Ferrous Bisglycinate Chelate', 'Tocotriene Complex'], 'gentle-iron', '120 capsules.'),
  row('emerald-labs-b453-meriva-60', 'Emerald Labs Meriva Turmeric Plus, 60 capsules', 'emerald-labs-b453-meriva', ['Vitamin C (as Ascorbic Acid from PureWay-C®)', 'Meriva® Turmeric Root Extract (18-22% Curcuminoids & 40% Sunflower-Based, Soy-Free Phosphatidyl Choline)', 'OptiMSM® (MSM) Methylsulfonylmethane', 'Tocotriene Complex'], 'meriva-optimsm', 'Serving size 2. 30 servings. 60 capsules.'),
];
