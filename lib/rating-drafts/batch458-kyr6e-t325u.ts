// DRAFT / not verified / batch 458 KYR6-e (t325u).
// Irwin Naturals packs whose panel tokens are locked or matched to an existing lock.
// No barcode is published on irwinnaturals.com.
// irwin-b456-mega-b-complex and irwin-b457-green-tea-fat-metabolizer are not in this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t325uResolve } from '../scan-preview/t325uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const STACK_NOTE = 'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

function locked(name: string, form: string): IngredientFlag {
  const hit = t325uResolve(name, form);
  const why = hit?.lock.why
    || t138uWhyForName(name)
    || t135uWhyForName(name, form)
    || t134uWhyForName(name)
    || cleanTokenWhyForName(name);
  if (!hit || !why) throw new Error(`t325u unlocked ${name}`);
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

function row(id: string, name: string, form: string, handle: string, names: string[]): RatingRecord {
  const inactiveIngredients = names.map((ingredient) => locked(ingredient, form));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const record: RatingRecord = {
    id,
    productName: name,
    brand: 'Irwin Naturals',
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Irwin Naturals'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    sourcesGeneral: [
      `https://irwinnaturals.com/products/${handle} Supplement facts panel. No sourced UPC. Missing UPC.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH458_KYR6E_T325U: RatingRecord[] = [
  row(
    'irwin-b458-magnesium-beets-coq10',
    'Irwin Naturals Advanced Absorption Magnesium + Beets & CoQ10',
    'softgel',
    'magnesium-beets-coq10-60ct',
    [
      'Magnesium (as 75% Magnesium Glycinate, 25% Magnesium Hydroxide from Irish Seawater, Aquamin® Mg Sea Minerals)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 475 mg)(seed)',
      'AQTIV™ Beet powder (root)',
      'Coenzyme Q10',
      'Grape extract (seed)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'sunflower lecithin',
      'beeswax',
      'caramel (color)',
      'annatto (color)',
      "St. John's bread (carob)(color)",
      'silicon dioxide',
      'titanium dioxide (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b458-coq10-red',
    'Irwin Naturals CoQ10 RED',
    'softgel',
    'coq10-red',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin B12 (as Methylcobalamin)',
      'Medium Chain Triglyceride (MCT) Oil',
      'L-Citrulline',
      'Ginkgo extract (leaf)',
      'Coenzyme Q10',
      'Resveratrol (from Japanese Knotweed extract (root))',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'mannitol',
      'annatto (color)',
      'silicon dioxide',
      'maltodextrin',
    ],
  ),
];

const beets = BATCH458_KYR6E_T325U[0];
const red = BATCH458_KYR6E_T325U[1];
if (beets.verdict !== 'avoid' || beets.honestNote) throw new Error('t325u beets');
if (red.verdict !== 'caution' || red.honestNote) throw new Error('t325u coq10 red');
if (BATCH458_KYR6E_T325U.some((row) => row.barcode)) throw new Error('t325u upc');
if (BATCH458_KYR6E_T325U.some((row) => row.id === 'irwin-b456-mega-b-complex' || row.id === 'irwin-b457-green-tea-fat-metabolizer')) {
  throw new Error('t325u touched a kept row');
}
