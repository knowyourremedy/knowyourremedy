// DRAFT / not verified / batch 459 KYR6-e (t326u).
// Irwin Naturals packs whose panel tokens are locked or matched to an existing lock.
// No barcode is published on irwinnaturals.com.
// irwin-b456-mega-b-complex, irwin-b457-green-tea-fat-metabolizer, and batch458 are not in this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t128uWhyForName } from '../scan-preview/t128uTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { t326uResolve } from '../scan-preview/t326uLocks';
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
  const hit = t326uResolve(name, form);
  const why = hit?.lock.why
    || t138uWhyForName(name)
    || t135uWhyForName(name, form)
    || t134uWhyForName(name)
    || t128uWhyForName(name)
    || cleanTokenWhyForName(name)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t326u unlocked ${name}`);
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

export const BATCH459_KYR6E_T326U: RatingRecord[] = [
  row(
    'irwin-b459-triple-action-metabolism-electro-fire',
    'Irwin Naturals Triple-Action Metabolism Electro-Fire',
    'softgel',
    'triple-action-metabolism-electro-fire-60ct',
    [
      'Thiamin (as Thiamine Mononitrate)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Vitamin B12 (as Methylcobalamin)',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Magnesium (as Magnesium Glycinate)',
      'Chromium (as Chromium Picolinate)',
      'Potassium (as Potassium Citrate)',
      'AQTIV™ Medium Chain Triglyceride (MCT) Oil',
      'Green Tea extract (50% EGCG, 135mg)(leaf)',
      'Alpha-Lipoic Acid',
      'Taurine',
      'InnovaTea® Caffeine (from Camellia sinensis extract)(leaf)',
      'CoQ10',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'flaxseed oil',
      'glycerin',
      'sorbitol',
      'glycine',
      'purified water',
      'beeswax',
      'sunflower lecithin',
      'annatto (color)',
      'maltodextrin',
      'riboflavin',
      'silicon dioxide',
      'beta-cyclodextrin',
    ],
  ),
  row(
    'irwin-b459-maca-root-ashwagandha-gummies',
    'Irwin Naturals Maca Root + Ashwagandha Gummies',
    'gummy',
    'gummies-maca-root-ashwagandha-42ct',
    [
      'Black Maca powder (Lepidium meyenii)(root)',
      'KSM-66® Ashwagandha extract (root)(Organic)',
      'Polyglycitol syrup',
      'sugar',
      'water',
      'isomalt',
      'pectin',
      'natural flavors',
      'citric acid',
      'sodium citrate',
      'malic acid',
      'fruit and vegetable juice (color)',
      'citrus fiber (coating)',
    ],
  ),
  row(
    'irwin-b459-next-level-steel-libido-v2',
    'Irwin Naturals Next Level Steel Libido V2',
    'softgel',
    'next-level-steel-libido-x2',
    [
      'Maca powder (gelatinized)(root)',
      'Fish Oil (18% Eicosapentaenoic Acid (EPA), 108 mg, 12% Docosahexaenoic Acid (DHA), 72 mg)',
      'AQTIV™ Medium Chain Triglyceride (MCT) Oil',
      'Pumpkin Oil (seed)',
      'L-Arginine (as L-Arginine Hydrochloride)',
      'Epimedium (Horny Goat Weed) (Epimedium sagittatum) extract (10% icariins, 12 mg)(aerial)',
      'Yohimbe extract (2% yohimbe alkaloids, 1.4 mg)(bark)',
      'Red Ginseng (Panax ginseng) extract (20% ginsenosides, 5 mg)(root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'beeswax',
      'caramel (color)',
      'sunflower lecithin',
      'turmeric (color)',
      "St. John's bread (carob)(color)",
      'silicon dioxide',
    ],
  ),
  row(
    'irwin-b459-triple-source-magnesium-ashwagandha',
    'Irwin Naturals Triple-Source Magnesium + Ashwagandha',
    'softgel',
    'triple-source-magnesium-ashwagandha',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Magnesium (as 42% Magnesium Glycinate, 42% Magnesium Aspartate and 16% (Magnesium Hydroxide from Irish Seawater, Aquamin® Mg Sea Minerals))',
      'Zinc (as Zinc Methionine) OptiZinc®',
      'Copper (as Copper Citrate)',
      'Flaxseed Oil (seed)',
      'Sensoril® Ashwagandha (Withania somnifera) extract (root, leaf)',
      'Vitamin K2 (as Menaquinone-7, MK-7)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'annatto (color)',
      'titanium dioxide (color)',
      'dicalcium phosphate',
      'caramel (color)',
      'red cabbage extract (color)',
      'maltodextrin',
    ],
  ),
];

const [electro, maca, steel, triple] = BATCH459_KYR6E_T326U;
if (electro.verdict !== 'avoid' || !electro.honestNote) throw new Error('t326u electro');
if (maca.verdict !== 'avoid' || !maca.honestNote) throw new Error('t326u maca');
if (steel.verdict !== 'avoid' || !steel.honestNote) throw new Error('t326u steel');
if (triple.verdict !== 'avoid' || triple.honestNote) throw new Error('t326u triple');
if (BATCH459_KYR6E_T326U.some((row) => row.barcode)) throw new Error('t326u upc');
if (BATCH459_KYR6E_T326U.some((row) => /b456|b457|b458/.test(row.id))) throw new Error('t326u kept row');
