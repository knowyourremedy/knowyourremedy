// DRAFT / not verified / batch 470 KYR6-e (t337u).
// Mason Natural rows whose DSLD panels are already locked.
// UPCs are the DSLD label codes. The check digits pass.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t140uWhyForName } from '../scan-preview/t140uTokenWhy';
import { t146uWhyForName } from '../scan-preview/t146uTokenWhy';
import { t337uResolve } from '../scan-preview/t337uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const STACK_NOTE = 'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

function bareName(name: string): string {
  let current = name;
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\([^()]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function asInner(name: string): string {
  return name.match(/\(\s*as\s+([^)]+)\)/i)?.[1]?.trim() ?? '';
}

function locked(name: string, form: string): IngredientFlag {
  const hit = t337uResolve(name, form);
  const inner = asInner(name);
  const why = hit?.lock.why
    || t140uWhyForName(name)
    || t139uWhyForName(name, form)
    || t138uWhyForName(name)
    || t135uWhyForName(name, form)
    || t134uWhyForName(name)
    || t128uWhyForName(name)
    || t146uWhyForName(name)
    || cleanTokenWhyForName(name)
    || t139uWhyForName(bareName(name), form)
    || t140uWhyForName(bareName(name))
    || t146uWhyForName(bareName(name))
    || t146uWhyForName(inner)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t337u unlocked ${name}`);
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

function row(id: string, name: string, form: string, handle: string, barcode: string, names: string[]): RatingRecord {
  const inactiveIngredients = names.map((ingredient) => locked(ingredient, form));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const record: RatingRecord = {
    id,
    productName: name,
    brand: 'Mason Natural',
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Mason Natural'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    barcode,
    sourcesGeneral: [
      `https://masonnatural.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH470_KYR6E_T337U: RatingRecord[] = [
  row(
    'mason-b470-lutein-40-30-softgels',
    'Mason Natural Lutein 40 mg, 30 Softgels',
    'softgel',
    'mason-natural-lutein-40-mg-supports-vision-health-30-softgels',
    '311845166685',
    [
      'Lutein (as Elemental Lutein)',
      'Soybean Oil',
      'Gelatin',
      'Glycerin',
      'Carob extract',
      'purified Water',
      'Soy Lecithin',
      'yellow Beeswax',
    ],
  ),
  row(
    'mason-b470-magnesium-glycinate-bioperine-60',
    'Mason Natural Optimum Absorption Magnesium Glycinate with BioPerine, 60 Capsules',
    'capsule',
    'mason-natural-optimum-absorption-magnesium-glycinate-with-bioperine',
    '311845187154',
    [
      'Magnesium (as Magnesium Glycinate)',
      'Bioperine (as Black Pepper Fruit Extract)',
      'Cellulose',
      'Stearate',
      'Dicalcium Phosphate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'mason-b470-folic-acid-400-100-tablets',
    'Mason Natural Folic Acid 400 mcg, 100 Tablets',
    'tablet',
    'mason-natural-folic-acid-400-mcg-100-tablets',
    '311845065315',
    [
      'Folic Acid',
      'Whey',
      'Microcrystalline Cellulose',
      'Calcium Carbonate',
      'Croscarmellose Sodium',
      'Stearic Acid',
      'Magnesium Stearate',
    ],
  ),
  row(
    'mason-b470-magnesium-gluconate-550-100-tablets',
    'Mason Natural Magnesium Gluconate 550 mg, 100 Tablets',
    'tablet',
    'mason-natural-magnesium-gluconate-550-mg-healthy-heart-and-nervous-system-improved-muscle-function-and-blood-pressure-levels-100-tablets',
    '311845061713',
    [
      'Magnesium Gluconate',
      'Maltodextrin',
      'Stearic Acid',
      'Microcrystalline Cellulose',
      'Vegetable Magnesium Stearate',
    ],
  ),
  row(
    'mason-b470-vein-erect-80-capsules',
    'Mason Natural Vein Erect with L-Arginine and Maca, 80 Capsules',
    'capsule',
    'mason-natural-vein-erect-with-l-arginine-and-maca-supports-sexual-vascular-health-supplement-for-varicose-veins-and-spider-veins-80-capsules',
    '311845134981',
    [
      'Calcium (as Calcium Carbonate)',
      'L-Arginine Hydrochloride',
      'Maca',
      'Maca 4:1 extract',
      'Gelatin',
      'Vegetable Magnesium Stearate',
      'Silicon Dioxide',
      'Cellulose',
    ],
  ),
];

if (BATCH470_KYR6E_T337U[0].id !== 'mason-b470-lutein-40-30-softgels' || BATCH470_KYR6E_T337U[0].verdict !== 'caution' || BATCH470_KYR6E_T337U[0].barcode !== '311845166685' || BATCH470_KYR6E_T337U[0].honestNote) throw new Error('mason-b470-lutein-40-30-softgels');
if (BATCH470_KYR6E_T337U[1].id !== 'mason-b470-magnesium-glycinate-bioperine-60' || BATCH470_KYR6E_T337U[1].verdict !== 'caution' || BATCH470_KYR6E_T337U[1].barcode !== '311845187154' || BATCH470_KYR6E_T337U[1].honestNote) throw new Error('mason-b470-magnesium-glycinate-bioperine-60');
if (BATCH470_KYR6E_T337U[2].id !== 'mason-b470-folic-acid-400-100-tablets' || BATCH470_KYR6E_T337U[2].verdict !== 'caution' || BATCH470_KYR6E_T337U[2].barcode !== '311845065315' || BATCH470_KYR6E_T337U[2].honestNote) throw new Error('mason-b470-folic-acid-400-100-tablets');
if (BATCH470_KYR6E_T337U[3].id !== 'mason-b470-magnesium-gluconate-550-100-tablets' || BATCH470_KYR6E_T337U[3].verdict !== 'caution' || BATCH470_KYR6E_T337U[3].barcode !== '311845061713' || BATCH470_KYR6E_T337U[3].honestNote) throw new Error('mason-b470-magnesium-gluconate-550-100-tablets');
if (BATCH470_KYR6E_T337U[4].id !== 'mason-b470-vein-erect-80-capsules' || BATCH470_KYR6E_T337U[4].verdict !== 'caution' || BATCH470_KYR6E_T337U[4].barcode !== '311845134981' || BATCH470_KYR6E_T337U[4].honestNote) throw new Error('mason-b470-vein-erect-80-capsules');
