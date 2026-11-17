// DRAFT / not verified / batch 456 KYR6-e (t323u).
// Irwin Naturals softgel whose panel tokens are locked or matched to an existing lock.
// No barcode is published on irwinnaturals.com.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t323uResolve } from '../scan-preview/t323uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

const NAMES = [
  'Thiamin (as Thiamine Hydrochloride) (B1)',
  'Riboflavin (B2)',
  'Niacin (as Niacinamide) (B3)',
  'Vitamin B6 (as Pyridoxine Hydrochloride)',
  'Folate (B9)',
  'Vitamin B12 (as Methylcobalamin)',
  'Biotin (B7)',
  'Pantothenic Acid (as D-Calcium Pantothenate) (B5)',
  'Medium Chain Triglyceride (MCT) Oil',
  'N,N- Dimethylglycine (DMG) Hydrochloride (B15)',
  'BioPerine® Black Pepper extract (95% piperine)(fruit)',
  'Ginger extract (5% gingerols)(rhizome)',
  'Gelatin',
  'purified water',
  'glycerin',
  'caramel (color)',
  'beeswax',
  'soy lecithin',
  'titanium dioxide (color)',
  'silicon dioxide',
  'dicalcium phosphate',
  'mannitol',
] as const;

function locked(name: string): IngredientFlag {
  const hit = t323uResolve(name, 'softgel');
  const why = hit?.lock.why
    || t135uWhyForName(name, 'softgel')
    || t134uWhyForName(name)
    || cleanTokenWhyForName(name);
  if (!hit || !why) throw new Error(`t323u unlocked ${name}`);
  const grade = hit.lock.grade;
  const counts = hit.lock.counts;
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited' && counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'limited'
        ? `Methodology §5 Limited (founder lock ${mark}). Does not count toward the t137u stack.`
        : grade === 'moderate'
          ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
          : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

const inactiveIngredients = NAMES.map(locked);
const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);

export const BATCH456_KYR6E_T323U: RatingRecord[] = [
  {
    id: 'irwin-b456-mega-b-complex',
    productName: 'Irwin Naturals Advanced Absorption Mega B-Complex',
    brand: 'Irwin Naturals',
    category: 'Vitamins',
    formulaId: 'irwin-b456-mega-b-complex',
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Irwin Naturals'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    sourcesGeneral: [
      'https://irwinnaturals.com/products/advanced-absorption-mega-b-complex Supplement facts panel. No sourced UPC. Missing UPC.',
    ],
  },
];

if (rollup.verdict !== 'avoid' || rollup.cause !== 'high') throw new Error(`t323u verdict ${rollup.verdict} ${rollup.cause}`);
if (BATCH456_KYR6E_T323U[0].honestNote || BATCH456_KYR6E_T323U[0].founderHonestNote) throw new Error('t323u note');
if (BATCH456_KYR6E_T323U[0].barcode) throw new Error('t323u upc');
