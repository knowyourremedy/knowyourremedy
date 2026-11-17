// DRAFT / not verified / batch 460 KYR6-e (t327u).
// Irwin Naturals packs whose panel tokens match an existing lock under the expanded token rule.
// No barcode is published on irwinnaturals.com.
// Previously written Irwin rows are not in this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { t327uResolve } from '../scan-preview/t327uLocks';
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
  const hit = t327uResolve(name, form);
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
  if (!hit || !why) throw new Error(`t327u unlocked ${name}`);
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

export const BATCH460_KYR6E_T327U: RatingRecord[] = [
  row(
    'irwin-b460-stress-defy-detox-v2-gummies',
    'Irwin Naturals Stress-Defy Detox v2 Gummies',
    'gummy',
    'gummies-stress-defy-v2-balanced-calm-focused-30ct',
    [
      'Magnesium (as Magnesium Citrate)',
      'Holixer™ Holy Basil (Tulsi) (Ocimum tenuiflorum) extract (herb)',
      'L-Theanine',
      'Maltitol',
      'water',
      'pectin',
      'natural flavors',
      'citric acid',
      'fruit and vegetable juice (color)',
      'citrus fiber (coating)',
      'sodium citrate',
    ],
  ),
  row(
    'irwin-b460-daily-multi-testosterone-up-booster-for-men',
    'Irwin Naturals Daily-Multi Testosterone UP Booster for Men',
    'softgel',
    'daily-multi-testosterone-up-booster-for-men',
    [
      'Vitamin A (Retinol as Retinyl Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as d-Alpha Tocopherol)',
      'Thiamin (as Thiamine Hydrochloride)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Biotin',
      'Pantothenic acid (as d-Calcium Pantothenate)',
      'Magnesium (as Magnesium Hydroxide)(from Irish Seawater, Aquamin® Mg Sea Minerals)',
      'Zinc (as Zinc Picolinate)',
      'Selenium (as L-Selenomethionine)',
      'Copper (as Copper Citrate)',
      'Manganese (as Manganese Citrate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Molybdenum Citrate)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 425 mg)(seed)',
      'KSM-66® Ashwagandha (Withania somnifera) extract (root)',
      'Boron (as Boron Chelate)',
      'Vitamin K2 (as Menaquinone-7 (MK-7))',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'caramel',
      'annatto (color)',
      'dicalcium phosphate',
      'mannitol',
      'St. John\'s bread (carob) (color)',
      'silicon dioxide',
      'titanium dioxide (color)',
      'maltodextrin',
      'soybean oil',
    ],
  ),
  row(
    'irwin-b460-maca-root-and-ashwagandha',
    'Irwin Naturals Maca Root and Ashwagandha',
    'softgel',
    'maca-root-and-ashwagandha',
    [
      'Flaxseed Oil (seed)',
      'Maca powder (Lepidium meyenii)(gelatinized)(root)',
      'Medium Chain Triglyceride (MCT) Oil',
      'Beet powder (root)',
      'Epimedium (Horny Goat Weed)(Epimedium sagittatum) extract (8:1)(aerial)',
      'Ashwagandha powder (root)',
      'Cayenne powder (30,000 HU)(fruit)',
      'Damiana (Turnera diffusa) extract (4:1)(leaf)',
      'Red Ginseng (Panax ginseng) extract (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'beeswax',
      'caramel (color)',
      'soy lecithin',
      'sunflower oil',
      'St. John\'s bread (carob)(color)',
      'silicon dioxide',
      'annatto (color)',
    ],
  ),
];

const [stress, daily, maca] = BATCH460_KYR6E_T327U;
if (stress.verdict !== 'caution' || stress.honestNote) throw new Error('t327u stress');
if (daily.verdict !== 'avoid' || daily.honestNote) throw new Error('t327u daily');
if (maca.verdict !== 'avoid' || !maca.honestNote) throw new Error('t327u maca row');
if (BATCH460_KYR6E_T327U.some((row) => row.barcode)) throw new Error('t327u upc');
if (BATCH460_KYR6E_T327U.some((row) => /b456|b457|b458|b459/.test(row.id))) throw new Error('t327u kept row');
