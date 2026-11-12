// DRAFT / not verified / batch 398 KYR6-e (t221u).
// The seven CellCore packs whose other ingredients the founder supplied.
// No honest notes are stored.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const BRAND = 'CellCore';
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}` };
}

export const BATCH398_KYR6E_T221U: RatingRecord[] = [
  {
    id: 'cellcore-b398-ct-biotic',
    productName: 'CT-Biotic (60 capsules)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b398-ct-biotic',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131150273',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('t221u founder-supplied other ingredients. CellCore CT-Biotic 60 capsules.', 'Vegetable Cellulose (Capsule)', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore CT-Biotic 60 capsules.', 'L-Leucine Complex', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore CT-Biotic 60 capsules.', 'Silica', 'moderate', false),
      flag('t221u founder-supplied other ingredients. CellCore CT-Biotic 60 capsules.', 'Microcrystalline Cellulose', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't221u. Founder-supplied other ingredients: Vegetable Cellulose (Capsule), L-Leucine Complex, Silica, Microcrystalline Cellulose. https://cellcore.com/products/ct-biotic is for sale. 60 capsules. SKU CC-BIOTC-060-BTL-02. Brand variant barcode 810131150273. The check digit passes. Actives are not graded.',
    ],
  },
  {
    id: 'cellcore-b398-is-borr-4',
    productName: 'IS-BORR (4 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b398-is-borr-4',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131152109',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('t221u founder-supplied other ingredients. CellCore IS-BORR 4 fl oz.', 'Purified Water', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore IS-BORR 4 fl oz.', 'Organic Cane Alcohol', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't221u. Founder-supplied other ingredients: Purified Water, Organic Cane Alcohol. https://cellcore.com/products/is-borr is for sale. 4 fl oz. SKU CC-BORRX-4OZ-BTL-02. Brand variant barcode 810131152109. The check digit passes. Actives are not graded. Organic Cane Alcohol is the Cleared t138e lock.',
    ],
  },
  {
    id: 'cellcore-b398-me-support-2',
    productName: 'ME Support (2 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b398-me-support-2',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131152031',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('t221u founder-supplied other ingredients. CellCore ME Support 2 fl oz.', 'Vegetable Glycerin', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore ME Support 2 fl oz.', 'Distilled Water', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't221u. Founder-supplied other ingredients: Vegetable Glycerin, Distilled Water. https://cellcore.com/products/me-support is for sale. 2 fl oz. SKU CC-MESUP-2OZ-BTL-01. Brand variant barcode 810131152031. The check digit passes. Actives are not graded. Vegetable glycerin is the Sept 14 Cleared lock. Distilled Water is the t99u Cleared lock.',
    ],
  },
  {
    id: 'cellcore-b398-metabolic-activator-2',
    productName: 'Metabolic Activator (2 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b398-metabolic-activator-2',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131152017',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('t221u founder-supplied other ingredients. CellCore Metabolic Activator 2 fl oz.', 'Vegetable Glycerin', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore Metabolic Activator 2 fl oz.', 'Distilled Water', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't221u. Founder-supplied other ingredients: Vegetable Glycerin, Distilled Water. https://cellcore.com/products/metabolic-activator is for sale. 2 fl oz. SKU CC-METAC-2OZ-BTL-01. Brand variant barcode 810131152017. The check digit passes. Actives are not graded. Vegetable glycerin is the Sept 14 Cleared lock. Distilled Water is the t99u Cleared lock.',
    ],
  },
  {
    id: 'cellcore-b398-mitoactive',
    productName: 'MitoActive (60 capsules)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b398-mitoactive',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131150716',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('t221u founder-supplied other ingredients. CellCore MitoActive 60 capsules.', 'Microcrystalline Cellulose', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore MitoActive 60 capsules.', 'Vegetable Cellulose (Capsule)', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore MitoActive 60 capsules.', 'Silica', 'moderate', false),
      flag('t221u founder-supplied other ingredients. CellCore MitoActive 60 capsules.', 'L-Leucine Complex', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't221u. Founder-supplied other ingredients: Microcrystalline Cellulose, Vegetable Cellulose (Capsule), Silica, L-Leucine Complex. https://cellcore.com/products/mitoactive is for sale. 60 capsules. SKU CC-MTACT-060-BTL-01. Brand variant barcode 810131150716. The check digit passes. Actives are not graded.',
    ],
  },
  {
    id: 'cellcore-b398-para-4',
    productName: 'Para 4 (120 capsules)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b398-para-4',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131150662',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('t221u founder-supplied other ingredients. CellCore Para 4 120 capsules.', 'Vegetable Cellulose (Capsule)', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore Para 4 120 capsules.', 'Microcrystalline Cellulose', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore Para 4 120 capsules.', 'L-Leucine Complex', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore Para 4 120 capsules.', 'Silica', 'moderate', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't221u. Founder-supplied other ingredients: Vegetable Cellulose (Capsule), Microcrystalline Cellulose, L-Leucine Complex, Silica. https://cellcore.com/products/para-4 is for sale. 120 capsules. SKU CC-PARA4-120-BTL-02. Brand variant barcode 810131150662. The check digit passes. Actives are not graded.',
    ],
  },
  {
    id: 'cellcore-b398-s-tro',
    productName: 'S-TRO (120 capsules)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b398-s-tro',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131150471',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('t221u founder-supplied other ingredients. CellCore S-TRO 120 capsules.', 'Vegetable Cellulose (Capsule)', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore S-TRO 120 capsules.', 'Silica', 'moderate', false),
      flag('t221u founder-supplied other ingredients. CellCore S-TRO 120 capsules.', 'L-Leucine Complex', 'cleared', false),
      flag('t221u founder-supplied other ingredients. CellCore S-TRO 120 capsules.', 'Microcrystalline Cellulose', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't221u. Founder-supplied other ingredients: Vegetable Cellulose (Capsule), Silica, L-Leucine Complex, Microcrystalline Cellulose. https://cellcore.com/products/s-tro is for sale. 120 capsules. SKU CC-STROX-120-BTL-02. Brand variant barcode 810131150471. The check digit passes. Actives are not graded.',
    ],
  },
];
