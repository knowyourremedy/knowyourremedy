// DRAFT / not verified / batch 408 KYR6-e (t245u).
// Vital Proteins capsules whose other ingredients are already locked.
// Panels are on-market NIH DSLD label records. The brand site does not print Other Ingredients.
// No honest notes are stored. Packs with an unlocked token, two panels on one UPC, or no current panel are not rows.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
      : grade === 'high'
        ? 'Methodology §5 Avoid.'
        : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}` };
}

export const BATCH408_KYR6E_T245U: RatingRecord[] = [
  {
    id: 'vitalproteins-b408-marine-collagen-capsules',
    productName: 'Marine Collagen Capsules',
    brand: 'Vital Proteins',
    category: 'Vitamins',
    formulaId: 'vitalproteins-b408-marine-collagen-capsules',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Vital Proteins'],
    barcode: '850232005645',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Vital Proteins Marine Collagen Capsules. NIH DSLD label 302863.', 'Pullulan', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't245u. NIH DSLD label 302863 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Vital Proteins Marine Collagen Capsules. 360 Capsule(s). Label barcode 850232005645. The check digit passes. Other ingredients: Pullulan. Collagen peptides from snapper are the active and are not graded. Counted Limited tokens: none.',
    ],
  },
  {
    id: 'vitalproteins-b408-hyaluronic-acid-super-surge',
    productName: 'Hyaluronic Acid Super Surge',
    brand: 'Vital Proteins',
    category: 'Vitamins',
    formulaId: 'vitalproteins-b408-hyaluronic-acid-super-surge',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Vital Proteins'],
    barcode: '857273008987',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Vital Proteins Hyaluronic Acid Super Surge. NIH DSLD label 246586.', 'Hypromellose', 'cleared', false),
      flag('Vital Proteins Hyaluronic Acid Super Surge. NIH DSLD label 246586.', 'Silica', 'moderate', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't245u. NIH DSLD label 246586 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Vital Proteins Hyaluronic Acid Super Surge. 120 Capsule(s). Label barcode 857273008987. The check digit passes. Other ingredients: Hypromellose, Silica. Actives are not graded. Counted Limited tokens: none.',
    ],
  },
  {
    id: 'vitalproteins-b408-cartilage-collagen-capsules',
    productName: 'Cartilage Collagen Capsules',
    brand: 'Vital Proteins',
    category: 'Vitamins',
    formulaId: 'vitalproteins-b408-cartilage-collagen-capsules',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Vital Proteins'],
    barcode: '850502008932',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Vital Proteins Cartilage Collagen Capsules. NIH DSLD label 302846.', 'Gelatin', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't245u. NIH DSLD label 302846 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Vital Proteins Cartilage Collagen Capsules. 120 Capsule(s). Label barcode 850502008932. The check digit passes. Other ingredients: Gelatin. Actives are not graded. Counted Limited tokens: none.',
    ],
  },
  {
    id: 'vitalproteins-b408-feeling-zen',
    productName: 'Feeling Zen',
    brand: 'Vital Proteins',
    category: 'Vitamins',
    formulaId: 'vitalproteins-b408-feeling-zen',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Vital Proteins'],
    barcode: '850015883798',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Vital Proteins Feeling Zen. NIH DSLD label 302860.', 'Hypromellose', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't245u. NIH DSLD label 302860 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Vital Proteins Feeling Zen. 60 Capsule(s). Label barcode 850015883798. The check digit passes. Other ingredients: Hypromellose. Actives are not graded. Counted Limited tokens: none.',
    ],
  },
];
