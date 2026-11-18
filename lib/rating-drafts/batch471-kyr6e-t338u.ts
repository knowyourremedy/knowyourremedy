// DRAFT / not verified / batch 471 KYR6-e (t338u).
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
import { t338uResolve } from '../scan-preview/t338uLocks';
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
  const hit = t338uResolve(name, form);
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
    || t134uWhyForName(inner)
    || t138uWhyForName(inner)
    || t146uWhyForName(inner)
    || cleanTokenWhyForName(inner)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t338u unlocked ${name}`);
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

function row(id: string, name: string, form: string, handle: string, barcode: string | undefined, names: string[]): RatingRecord {
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
    ...(barcode ? { barcode } : {}),
    sourcesGeneral: [
      barcode
        ? `https://masonnatural.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`
        : `https://masonnatural.com/products/${handle} Brand page. DSLD label. No sourced UPC.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH471_KYR6E_T338U: RatingRecord[] = [
  row(
    'mason-b471-delayed-release-c-500-100-caplets',
    'Mason Natural Vitamin C 500 mg Delayed Release, 100 Caplets',
    'caplet',
    'mason-natural-vitamin-c-500-mg-delayed-release-antioxidant-essential-nutrient-100-caplets',
    '311845181114',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Calcium',
      'Microcrystalline Cellulose',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
      'Pharmaceutical Glaze',
      'Magnesium Silicate',
    ],
  ),
  row(
    'mason-b471-calcium-magnesium-zinc-100-tablets',
    'Mason Natural Calcium Magnesium & Zinc, 100 Tablets',
    'tablet',
    'mason-natural-calcium-magnesium-zinc-supports-healthy-bones-enhances-muscle-and-nerve-function-immune-system-booster-100-tablets',
    '311845096814',
    [
      'Calcium (as Calcium Carbonate)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Sulfate)',
      'Croscarmellose Sodium',
      'Hypromellose',
      'Stearic Acid',
      'Acacia',
      'Maltodextrin',
      'Titanium Dioxide',
      'Sodium Lauryl Sulfate',
      'Triacetin',
      'Mineral Oil',
      'Eggshell',
      'Magnesium Silicate',
    ],
  ),
  row(
    'mason-b471-vitamin-c-500-rose-hips-90-tablets',
    'Mason Natural Vitamin C 500 mg with Rose Hips and Bioflavonoids, 90 Tablets',
    'tablet',
    'mason-natural-vitamin-c-500-mg-with-rose-hips-and-bioflavonoids-supports-a-healthy-immune-system-antioxidant-and-essential-nutrient-90-tablets',
    '311845117298',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Calcium (as Dicalcium Phosphate)',
      'Rose Hips',
      'Citrus Bioflavonoids',
      'Lemon Bioflavonoids',
      'Rutin',
      'Acerola',
      'Hesperidin',
      'Microcrystalline Cellulose',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Vegetable Magnesium Stearate',
      'Silicon Dioxide',
      'natural Caramel color',
      'Pharmaceutical Glaze',
      'Magnesium Silicate',
    ],
  ),
  row(
    'mason-b471-biotin-keratin-60-tablets',
    'Mason Natural Biotin 10,000 mcg Plus Keratin 100 mg, 60 Tablets',
    'tablet',
    'mason-natural-biotin-10000-mcg-plus-keratin-100-mg-with-calcium-healthy-hair-strong-nails-and-glowing-skin-premium-beauty-supplement-60-tablets',
    '311845176554',
    [
      'Biotin (as D-Biotin)',
      'Calcium (as Dicalcium Phosphate)',
      'Keratin',
      'Cellulose',
      'Hydroxypropyl Cellulose',
      'Stearic Acid',
      'Croscarmellose Sodium',
      'Silica',
      'Magnesium Stearate',
      'Pharmaceutical Glaze',
      'Talc',
    ],
  ),
  row(
    'mason-b471-vitatrum-complete-150-caplets',
    'Mason Natural Vitatrum Complete Multivitamin-Multimineral, 150 Caplets',
    'caplet',
    'mason-natural-vitatrum-complete-multivitamin-multimineral-150-caplets',
    undefined,
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Vitamin B1 (as Thiamine Mononitrate)',
      'Vitamin B2 (as Riboflavin)',
      'Niacinamide (as Vitamin B3)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Iron (as Ferrous Fumarate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Cupric Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Sodium Molybdate)',
      'Chloride (as Potassium Chloride)',
      'Potassium (as Potassium Chloride)',
      'Silicon (as Silicon Dioxide)',
      'Boron (as Boric Acid)',
      'Tin (as Stannous Chloride)',
      'Vanadium (as Sodium Metavanadate)',
      'Nickel (as Nickelous Sulfate)',
      'Stearic Acid',
      'Gelatin',
      'Croscarmellose Sodium',
      'Microcrystalline Cellulose',
      'Hypromellose',
      'Titanium Dioxide',
      'Crospovidone',
      'Acacia',
      'Maltodextrin',
      'Dicalcium Phosphate',
      'Magnesium Stearate',
      'Corn Starch',
      'Triacetin',
      'Magnesium Silicate',
      'Mineral Oil',
      'Sucrose',
      'Mannitol',
      'Silica',
      'Sodium Ascorbate',
      'FD&C Yellow #6 Lake',
      'Mixed Tocopherols',
      'Triglycerides',
      'Polyvinylpyrrolidone',
      'Sodium Benzoate',
      'Tricalcium Phosphate',
      'Sorbic Acid',
      'Ascorbyl Palmitate',
      'BHT',
    ],
  ),
];

if (BATCH471_KYR6E_T338U[0].id !== 'mason-b471-delayed-release-c-500-100-caplets' || BATCH471_KYR6E_T338U[0].verdict !== 'avoid' || Boolean(BATCH471_KYR6E_T338U[0].honestNote) || (BATCH471_KYR6E_T338U[0].barcode ?? '') !== '311845181114') throw new Error('mason-b471-delayed-release-c-500-100-caplets');
if (BATCH471_KYR6E_T338U[1].id !== 'mason-b471-calcium-magnesium-zinc-100-tablets' || BATCH471_KYR6E_T338U[1].verdict !== 'avoid' || Boolean(BATCH471_KYR6E_T338U[1].honestNote) || (BATCH471_KYR6E_T338U[1].barcode ?? '') !== '311845096814') throw new Error('mason-b471-calcium-magnesium-zinc-100-tablets');
if (BATCH471_KYR6E_T338U[2].id !== 'mason-b471-vitamin-c-500-rose-hips-90-tablets' || BATCH471_KYR6E_T338U[2].verdict !== 'avoid' || Boolean(BATCH471_KYR6E_T338U[2].honestNote) || (BATCH471_KYR6E_T338U[2].barcode ?? '') !== '311845117298') throw new Error('mason-b471-vitamin-c-500-rose-hips-90-tablets');
if (BATCH471_KYR6E_T338U[3].id !== 'mason-b471-biotin-keratin-60-tablets' || BATCH471_KYR6E_T338U[3].verdict !== 'avoid' || Boolean(BATCH471_KYR6E_T338U[3].honestNote) || (BATCH471_KYR6E_T338U[3].barcode ?? '') !== '311845176554') throw new Error('mason-b471-biotin-keratin-60-tablets');
if (BATCH471_KYR6E_T338U[4].id !== 'mason-b471-vitatrum-complete-150-caplets' || BATCH471_KYR6E_T338U[4].verdict !== 'avoid' || Boolean(BATCH471_KYR6E_T338U[4].honestNote) || (BATCH471_KYR6E_T338U[4].barcode ?? '') !== '') throw new Error('mason-b471-vitatrum-complete-150-caplets');
