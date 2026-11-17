// DRAFT / not verified / batch 452 KYR6-e (t310u).
// Emerald Labs capsules whose tokens match existing locks, including Latin, percentage, and brand parentheticals.
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
  const meth = `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function locked(name: string): IngredientFlag {
  const hit = t256uResolve(name, 'capsule');
  const why = hit?.lock.why
    || (t240uNorm(name) === 'water' ? cleanTokenWhyForName(name) : undefined)
    || t134uWhyForName(name)
    || cleanTokenWhyForName(name);
  if (!hit || !why || hit.lock.grade !== 'cleared' || hit.lock.counts) throw new Error(`t310u ${name}`);
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

export const BATCH452_KYR6E_T310U: RatingRecord[] = [
  row('emerald-labs-b452-maca-60', 'Emerald Labs Maca Root, 60 capsules', 'emerald-labs-b452-maca', ['Organic Maca Root Powder (Lepidium meyenii)'], 'maca-root', '60 capsules.', '743650002108'),
  row('emerald-labs-b452-noni-60', 'Emerald Labs Noni Fruit, 60 capsules', 'emerald-labs-b452-noni', ['Organic Noni Fruit Powder (Morinda citrifolia)'], 'noni-fruit', '60 capsules.', '743650001521'),
  row('emerald-labs-b452-goji-60', 'Emerald Labs Goji Berry, 60 capsules', 'emerald-labs-b452-goji', ['Goji Berry Extract (fruit) (40% Polysaccharides) (Lycium barbarum)'], 'goji-berry', 'Serving size 2. 30 servings. 60 capsules.', '743650001507'),
  row('emerald-labs-b452-resveratrol-30', 'Emerald Labs Resveratrol, 30 capsules', 'emerald-labs-b452-resveratrol', ['Resveratrol (Polygonum Cuspidatum - 50%)'], 'resveratrol', '30 capsules.', '743650002085'),
  row('emerald-labs-b452-pomegranate-60', 'Emerald Labs Pomegranate, 60 capsules', 'emerald-labs-b452-pomegranate', ['Pomegranate Juice Powder', 'Pomegranate Standardized Extract (40% Ellagic Acid) (Punica granatum)'], 'pomegranate', 'Serving size 2. 30 servings. 60 capsules.', '743650001477'),
  row('emerald-labs-b452-sea-buckthorn-60', 'Emerald Labs Sea Buckthorn, 60 capsules', 'emerald-labs-b452-sea-buckthorn', ["Sea Buckthorn Fruit Powder (Standardized to 10% Omega-7's) (Hippophae rhamnoides)"], 'sea-buckthorn', 'Serving size 2. 30 servings. 60 capsules.', '743650002023'),
  row('emerald-labs-b452-zinc-90', 'Emerald Labs Zinc 25 mg, 90 capsules', 'emerald-labs-b452-zinc', ['Zinc', 'Albion® Zinc Bisglycinate Chelate', 'Tocotriene Complex'], 'zinc-25mg', '90 capsules.', '743650003594'),
  row('emerald-labs-b452-methyl-folate-60', 'Emerald Labs Methyl Folate, 60 capsules', 'emerald-labs-b452-methyl-folate', ['Folate', 'L-5-Methyltetrahydrofolate Calcium', 'Tocotriene Complex'], 'methyl-folate', '60 capsules.', '743650003792'),
  row('emerald-labs-b452-pregnenolone-60', 'Emerald Labs Pregnenolone 50 mg, 60 capsules', 'emerald-labs-b452-pregnenolone', ['Pregnenolone', 'Tocotriene Complex'], 'pregnenolone-50mg', '60 capsules.', '743650100224'),
  row('emerald-labs-b452-dhea-preg-60', 'Emerald Labs DHEA+Pregnenolone, 60 capsules', 'emerald-labs-b452-dhea-preg', ['DHEA (Dehydroepiandrosterone)', 'Pregnenolone', 'Tocotriene Complex'], 'dhea-pregnenolone', '60 capsules.', '743650100200'),
  row('emerald-labs-b452-preg-dhea-60', 'Emerald Labs Pregnenolone+DHEA, 60 capsules', 'emerald-labs-b452-preg-dhea', ['Pregnenolone', 'DHEA (Dehydroepiandrosterone)', 'Tocotriene Complex'], 'pregnenolone-dhea', '60 capsules.', '743650100217'),
  row('emerald-labs-b452-berberine-60', 'Emerald Labs Berberine Phytosome, 60 capsules', 'emerald-labs-b452-berberine', ['Berberine Phytosome', 'Berberis aristata extract (root)', 'Phospholipid complex from Pea, Sunflower, Grape Seed', 'Berberine HCl', 'Indian Barberry extract'], 'berberine-phytosome', 'Serving size 2. 30 servings. 60 capsules.', '743650003730'),
  row('emerald-labs-b452-quercetin-zinc-60', 'Emerald Labs Quercetin plus Zinc, 60 capsules', 'emerald-labs-b452-quercetin-zinc', ['Zinc', 'Albion® Zinc Bisglycinate Chelate', 'Sophora japonica L. extract (flower)', 'Sunflower lecithin'], 'quercetin-plus-zinc', '60 capsules.', '743650003662'),
  row('emerald-labs-b452-vitacholine-60', 'Emerald Labs VitaCholine 550 mg, 60 capsules', 'emerald-labs-b452-vitacholine', ['Choline (as Choline L+Bitartrate) (VitaCholine®)'], 'vitacholine-550mg', 'Serving size 2. 30 servings. 60 capsules.', '743650003754'),
];
