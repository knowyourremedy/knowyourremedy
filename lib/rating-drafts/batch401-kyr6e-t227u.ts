// DRAFT / not verified / batch 401 KYR6-e (t227u).
// Liquid Pregnenolone. anise seed extract (1%) uses the existing anise seed extract lock.
// Liquid DHEA stays held. No honest note is stored. No UPC was printed.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const BRAND = 'Professional Formulas';
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t225u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t225u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t225u). Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}` };
}

export const BATCH401_KYR6E_T227U: RatingRecord[] = [
  {
    id: 'pf-b401-liquid-pregnenolone-2',
    productName: 'Liquid Pregnenolone (2 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b401-liquid-pregnenolone-2',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Liquid Pregnenolone brand page. 2 fl oz.', 'Ethanol (54%)', 'cleared', false),
      flag('Professional Formulas Liquid Pregnenolone brand page. 2 fl oz.', 'vegetable glycerin (from soy) (45%)', 'cleared', false),
      flag('Professional Formulas Liquid Pregnenolone brand page. 2 fl oz.', 'anise seed extract (1%)', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't227u. https://professionalformulas.com/product/liquid-pregnenolone/ is in stock at $28. Product code SLP2. 2 fl oz (59 mL). Other ingredients: Ethanol (54%), vegetable glycerin (from soy) (45%), and anise seed extract (1%). anise seed extract (1%) is the anise seed extract lock. Actives are not graded. Counted Limited tokens: none. No UPC was printed. Missing UPC.',
    ],
  },
];
