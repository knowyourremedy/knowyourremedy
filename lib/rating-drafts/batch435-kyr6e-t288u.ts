// DRAFT / not verified / batch 435 KYR6-e (t288u).
// Advanced CoQ10 100 mg, 60 capsules. One counting Limited. No honest note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t151uWhyForName } from '../scan-preview/t151uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t259uLock } from '../scan-preview/t259uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

const MALTO = t259uLock('maltodextrin');
const PHOSPHATE = t151uWhyForName('tricalcium phosphate', 'capsule', 'cleared');
const HYPRO = t134uWhyForName('hypromellose');
const CALCIUM = t134uWhyForName('calcium carbonate');
const MCC = t134uWhyForName('microcrystalline cellulose');
const MAG = t134uWhyForName('magnesium stearate');
if (!MALTO || MALTO.grade !== 'limited' || !MALTO.counts || !PHOSPHATE || !HYPRO || !CALCIUM || !MCC || !MAG) {
  throw new Error('t288u why');
}

const COQ: IngredientFlag[] = [
  flag('Hypromellose', 'cleared', false, HYPRO, 't134u'),
  flag('calcium carbonate', 'cleared', false, CALCIUM, 't134u'),
  flag('tricalcium phosphate', 'cleared', false, PHOSPHATE, 't151u'),
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't134u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't134u'),
  flag('silicon dioxide', 'moderate', false, T128U_SILICA_WHY, 't160u'),
  flag('maltodextrin', 'limited', true, MALTO.why, 't259u'),
];

export const BATCH435_KYR6E_T288U: RatingRecord[] = [
  {
    id: 'megared-b435-advanced-coq10-60',
    productName: 'MegaRed Advanced CoQ10 100 mg 60 Capsules',
    brand: 'MegaRed',
    category: 'Vitamins',
    formulaId: 'megared-b435-advanced-coq10-60',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['MegaRed'],
    barcode: '020525996794',
    activeIngredients: [{ name: 'Coenzyme Q10', strength: '100 mg' }],
    inactiveIngredients: COQ,
    verdict: 'caution',
    sourcesGeneral: [
      't288u. https://www.schiffvitamins.com/collections/megared/products/megared-advanced-coq10-100mg/ is the ingredient panel. The brand package photo prints 60 capsules. Other ingredients: hypromellose, calcium carbonate, tricalcium phosphate, microcrystalline cellulose, magnesium stearate, silicon dioxide, maltodextrin. Counted Limited: maltodextrin. Silicon dioxide is Caution and does not count. No honest note. The page schema gtin is 020525996794. The check digit passes.',
    ],
  },
];
