// DRAFT / not verified / batch 468 KYR6-e (t335u).
// Irwin Naturals packs locked by t335u or by an earlier lock.
// No barcode is published on irwinnaturals.com.
// Previously written Irwin rows are not in this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t140uWhyForName } from '../scan-preview/t140uTokenWhy';
import { t146uWhyForName } from '../scan-preview/t146uTokenWhy';
import { t335uResolve } from '../scan-preview/t335uLocks';
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
  const hit = t335uResolve(name, form);
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
  if (!hit || !why) throw new Error(`t335u unlocked ${name}`);
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

export const BATCH468_KYR6E_T335U: RatingRecord[] = [
  row(
    'irwin-b468-testosterone-up-strength-size',
    'Irwin Naturals Testosterone UP Strength & Size',
    'softgel',
    'testosterone-up-strength-size',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxal-5-Phosphate)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Biotin',
      'Pantothenic Acid (as d-Calcium Pantothenate)',
      'Iron (as Ferrous Bisglycinate)',
      'Magnesium (as Magnesium Citrate)',
      'Zinc (as Zinc Citrate)',
      'Selenium (as L-Selenomethionine)',
      'Copper (as Copper Citrate)',
      'Fish Oil (18% Eicosapentaenoic Acid (EPA) 270 mg, 12% Docosahexaenoic Acid (DHA) 180 mg)',
      'KSM-66® Ashwagandha extract (root)',
      'PrimaVie® Shilajit extract',
      'Ancient Peat',
      'Apple extract',
      'Boron (as Boron Chelate)',
      'Vitamin K2 (as Menaquinone-7, MK-7)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'caramel (color)',
      'sunflower lecithin',
      'dicalcium phosphate',
      'maltodextrin',
      'titanium dioxide (color)',
      'mannitol',
      'silicon dioxide',
      'St. John\'s Bread (carob)(color)',
      'red cabbage extract (color)',
    ],
  ),
];

if (BATCH468_KYR6E_T335U[0].id !== 'irwin-b468-testosterone-up-strength-size' || BATCH468_KYR6E_T335U[0].verdict !== 'avoid' || Boolean(BATCH468_KYR6E_T335U[0].honestNote) !== false) throw new Error('irwin-b468-testosterone-up-strength-size');
if (BATCH468_KYR6E_T335U.some((row) => row.barcode)) throw new Error('t335u upc');
