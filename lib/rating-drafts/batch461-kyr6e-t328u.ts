// DRAFT / not verified / batch 461 KYR6-e (t328u).
// Irwin Naturals packs whose panel tokens match an existing lock or a t328u lock.
// No barcode is published on irwinnaturals.com.
// Previously written Irwin rows are not in this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t328uResolve } from '../scan-preview/t328uLocks';
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

function locked(name: string, form: string): IngredientFlag {
  const hit = t328uResolve(name, form);
  const why = hit?.lock.why
    || t139uWhyForName(name, form)
    || t138uWhyForName(name)
    || t135uWhyForName(name, form)
    || t134uWhyForName(name)
    || t128uWhyForName(name)
    || cleanTokenWhyForName(name)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name))
    || t139uWhyForName(bareName(name), form);
  if (!hit || !why) throw new Error(`t328u unlocked ${name}`);
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

export const BATCH461_KYR6E_T328U: RatingRecord[] = [
  row(
    'irwin-b461-next-level-extra-strength-testosterone-up-v2',
    'Irwin Naturals Next-Level Extra Strength Testosterone UP V2',
    'softgel',
    'next-level-extra-strength-testosterone-up-v2',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Magnesium (as Magnesium Aspartate)',
      'Zinc (as Zinc Methionine) OptiZinc®',
      'Selenium (as L-Selenomethionine)',
      'Copper (as Copper Gluconate)',
      'Extra Virgin Olive Oil',
      'Pumpkin Oil (seed)',
      'KSM-66® Ashwagandha extract (root)',
      'Testosurge® Fenugreek extract (seed)',
      'Stinging Nettle (Urtica dioica) extract (15:1)(root)',
      'Beta Sitosterol',
      'Boron (as Boron Citrate)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'caramel (color)',
      'beeswax',
      'sunflower lecithin',
      'dicalcium phosphate',
      'dextrin',
      'St. John\'s bread (carob)(color)',
      'silicon dioxide',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b461-l-citrulline-l-arginine',
    'Irwin Naturals L-Citrulline + L-Arginine 60ct',
    'softgel',
    'l-citrulline-l-arginine-60ct',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 825 mg)(seed)',
      'L-Citrulline',
      'Horny Goat Weed (Epimedium sagittatum) extract (4:1)(aerial)',
      'L-Arginine (as L-Arginine Hydrochloride)',
      'AQTIV™ Beet powder (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'caramel (color)',
      'maltodextrin',
      'St. John\'s bread (carob)(color)',
      'turmeric (color)',
      'gum acacia',
      'silicon dioxide',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b461-power-male-horny-goat-weed',
    'Irwin Naturals Power-Male Horny Goat Weed with Nitric Oxide Booster',
    'softgel',
    'power-male-horny-goat-weed-with-nitric-oxide-booster',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 825 mg)(seed)',
      'L-Citrulline',
      'Horny Goat Weed (Epimedium sagittatum) extract (4:1)(aerial)',
      'L-Arginine (as L-Arginine Hydrochloride)',
      'AQTIV™ Beet powder (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'caramel (color)',
      'maltodextrin',
      'St. John\'s bread (carob)(color)',
      'turmeric (color)',
      'gum acacia',
      'silicon dioxide',
      'sodium copper chlorophyllin (color)',
    ],
  ),
];

const [testUp, citrulline, power] = BATCH461_KYR6E_T328U;
if (testUp.verdict !== 'avoid' || !testUp.honestNote) throw new Error('t328u test up');
if (citrulline.verdict !== 'caution' || citrulline.honestNote) throw new Error('t328u citrulline');
if (power.verdict !== 'caution' || power.honestNote) throw new Error('t328u power');
if (BATCH461_KYR6E_T328U.some((row) => row.barcode)) throw new Error('t328u upc');
if (BATCH461_KYR6E_T328U.some((row) => /b456|b457|b458|b459|b460/.test(row.id))) throw new Error('t328u kept row');
