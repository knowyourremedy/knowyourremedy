// DRAFT / not verified / batch 450 KYR6-e (t306u).
// Emerald Labs rows whose other ingredients are already locked. No honest note.
// Carton barcodes are on the brand label images. The check digits pass.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t256uResolve } from '../scan-preview/t256uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const SITE = 'https://store.emeraldlabs.com/products';

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string): IngredientFlag {
  const hit = t256uResolve(name, 'capsule');
  const why = hit?.lock.why || (name.toLowerCase() === 'water' ? cleanTokenWhyForName(name) : undefined) || t134uWhyForName(name) || cleanTokenWhyForName(name);
  if (!hit || !why || hit.lock.grade !== 'cleared') throw new Error(`t306u stored ${name}`);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

function row(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], handle: string, note: string, barcode: string): RatingRecord {
  return {
    id, productName: name, brand: 'Emerald Labs', category: 'Vitamins', formulaId, form,
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Emerald Labs'], barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict: 'clean',
    sourcesGeneral: [`${SITE}/${handle} ${note} Label barcode ${barcode}. The check digit passes.`],
  };
}

export const BATCH450_KYR6E_T306U: RatingRecord[] = [
  row('emerald-labs-b450-creatine-powder', 'Emerald Labs Creatine Powder', 'emerald-labs-b450-creatine-powder', 'powder', [], 'creatine-powder', 'Other ingredients: none. 30 servings. Scoop 5 g.', '743650003808'),
  row('emerald-labs-b450-leaky-gut', 'Emerald Labs Leaky Gut Health', 'emerald-labs-b450-leaky-gut', 'powder', [], 'leaky-gut-health', 'Other ingredients: none. 60 servings. Scoop 3 g.', '743650003716'),
  row('emerald-labs-b450-pea', 'Emerald Labs PEA+', 'emerald-labs-b450-pea', 'capsule', [stored('hypromellose'), stored('water')], 'pea', 'Other ingredients: vegetable capsule (hypromellose, water). 60 capsules.', '743650003747'),
];
