// DRAFT / not verified / batch 457 KYR6-e (t324u).
// Irwin Naturals softgel whose panel tokens are locked or matched to an existing lock.
// No barcode is published on irwinnaturals.com.
// irwin-b456-mega-b-complex is not in this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t324uResolve } from '../scan-preview/t324uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

const NAMES = [
  'Chromium (as Chromium Picolinate)',
  'Flaxseed Oil (seed)',
  'Green Tea extract (50% EGCG, 200 mg)(leaf)',
  'Caffeine (from Green Coffee (Coffea arabica)(bean))',
  'BioPerine® Black Pepper extract (95% piperine)(fruit)',
  'Ginger extract (5% gingerols)(rhizome)',
  'Gelatin',
  'purified water',
  'glycerin',
  'soy lecithin',
  'beeswax',
  'turmeric (color)',
  'gum acacia',
  'maltodextrin',
  'sodium copper chlorophyllin (color)',
] as const;

function locked(name: string): IngredientFlag {
  const hit = t324uResolve(name, 'softgel');
  const why = hit?.lock.why
    || t135uWhyForName(name, 'softgel')
    || t134uWhyForName(name)
    || cleanTokenWhyForName(name);
  if (!hit || !why) throw new Error(`t324u unlocked ${name}`);
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

export const BATCH457_KYR6E_T324U: RatingRecord[] = [
  {
    id: 'irwin-b457-green-tea-fat-metabolizer',
    productName: 'Irwin Naturals Green Tea Fat Metabolizer',
    brand: 'Irwin Naturals',
    category: 'Vitamins',
    formulaId: 'irwin-b457-green-tea-fat-metabolizer',
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
      'https://irwinnaturals.com/products/green-tea-fat-metabolizer Supplement facts panel. No sourced UPC. Missing UPC.',
    ],
  },
];

if (rollup.verdict !== 'caution') throw new Error(`t324u verdict ${rollup.verdict} ${rollup.cause}`);
if (rollup.cause === 'limited_stack') throw new Error('t324u stack');
if (BATCH457_KYR6E_T324U[0].honestNote || BATCH457_KYR6E_T324U[0].founderHonestNote) throw new Error('t324u note');
if (BATCH457_KYR6E_T324U[0].barcode) throw new Error('t324u upc');
if (BATCH457_KYR6E_T324U.some((row) => row.id === 'irwin-b456-mega-b-complex')) throw new Error('t324u touched b456');
