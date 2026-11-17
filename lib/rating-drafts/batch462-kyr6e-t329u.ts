// DRAFT / not verified / batch 462 KYR6-e (t329u).
// Irwin Naturals packs locked by t329u or by an earlier lock.
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
import { t329uResolve } from '../scan-preview/t329uLocks';
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
  const hit = t329uResolve(name, form);
  const why = hit?.lock.why
    || t140uWhyForName(name)
    || t139uWhyForName(name, form)
    || t138uWhyForName(name)
    || t135uWhyForName(name, form)
    || t134uWhyForName(name)
    || t128uWhyForName(name)
    || cleanTokenWhyForName(name)
    || t139uWhyForName(bareName(name), form)
    || t140uWhyForName(bareName(name))
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t329u unlocked ${name}`);
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

export const BATCH462_KYR6E_T329U: RatingRecord[] = [
  row(
    'irwin-b462-testosterone-up-red',
    'Irwin Naturals Testosterone UP RED',
    'softgel',
    'testosterone-up-red',
    [
      'Medium Chain Triglyceride (MCT) Oil',
      'L-Citrulline',
      'Fenugreek extract (4:1)(seed)',
      'Plant Sterols (22% beta sitosterol, 33 mg)',
      'Ginkgo extract (leaf)',
      'Beet powder (root)',
      'LJ100® Tongkat Ali (Eurycoma longifolia) extract (40% glycosaponins, 40 mg and 22% eurypeptides, 22 mg)(root)',
      'Cayenne powder (30,000 HU)(fruit)',
      'Asian Ginseng extract (4% ginsenosides, 1.2 mg)(root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'annatto (color)',
      'soy lecithin',
      'beeswax',
      'silicon dioxide',
      'titanium dioxide (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b462-turbo-energy-libido-max-red',
    'Irwin Naturals Turbo-Energy Libido-Max RED 72ct',
    'softgel',
    'turbo-energy-libido-max-red-72ct',
    [
      'Thiamin (as Thiamine Hydrochloride)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B12 (as Methylcobalamin)',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Flaxseed Oil (seed)',
      'L-Citrulline',
      'Medium Chain Triglycerides (MCT) Oil',
      'Maté (Yerba Maté) extract (20% caffeine, 75 mg)(leaf)',
      'Green Tea extract (50% EGCG, 135 mg)(leaf)',
      'Cococin™ Coconut Water powder (fruit)',
      'AlphaWave® L-Theanine',
      'Guarana powder (seed)',
      'Spirulina (Arthrospira platensis) powder (whole plant)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'annatto (color)',
      'sunflower lecithin',
      'beeswax',
      'maltodextrin',
      'silicon dioxide',
      'titanium dioxide (color)',
      'mannitol',
    ],
  ),
  row(
    'irwin-b462-good-mood-sleep-pm',
    'Irwin Naturals Good Mood Sleep PM',
    'softgel',
    'good-mood-sleep-pm',
    [
      'Vitamin D (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Magnesium (as Magnesium Citrate)',
      'Flaxseed Oil (seed)',
      'Chamomile extract (4:1)(flower)',
      'L-Theanine',
      'Passionflower extract (4:1)(flower)',
      'Rhodiola (Rhodiola rosea) extract (root)',
      'Ashwagandha powder (root)',
      '5-Hydroxytryptophan (5-HTP)(from Griffonia simplicifolia extract)(seed)',
      'Lemon Balm extract (10:1)(aerial)',
      'Melatonin',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'annatto (color)',
      'beeswax',
      'soy lecithin',
      'maltodextrin',
      'silicon dioxide',
      'titanium dioxide (color)',
    ],
  ),
  row(
    'irwin-b462-thermo-burn-stubborn-fat-metabolizer',
    'Irwin Naturals Thermo-Burn Stubborn Fat Metabolizer',
    'softgel',
    'thermo-burn-stubborn-fat-metabolizer',
    [
      'Chromium (as Chromium Picolinate)',
      'Flaxseed Oil (seed)',
      'Medium Chain Triglyceride (MCT) Oil',
      'Grapefruit (Citrus paradisi L.)(fruit)',
      'Guaraná (Paullinia cupana Kunth) (1% caffeine, 4.5 mg)(seed)',
      'Sweet Orange extract',
      'Blood Orange extract',
      'Cayenne powder (fruit)',
      'Ginger extract (5% gingerols, 7.5 mg)(rhizome)',
      'Cinnamon (Cassia) (Cinnamomum aromaticum) extract (4:1)(bark)',
      'Green Tea extract (50% EGCG, 50 mg)(leaf)',
      'Turmeric powder (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'beeswax',
      'sunflower lecithin',
      'glucose',
      'St. John\'s bread (carob)(color)',
      'turmeric (color)',
      'silicon dioxide',
      'annatto (color)',
      'pectin',
    ],
  ),
  row(
    'irwin-b462-daily-gentle-cleanse',
    'Irwin Naturals Daily Gentle Cleanse',
    'softgel',
    'daily-gentle-cleanse',
    [
      'Fish Oil (30% Omega-3 fatty acids, 322 mg)',
      'Amla extract (5:1)(fruit)',
      'Belleric Myrobalan powder (fruit)',
      'Chebulic Myrobalan extract (5:1)(fruit)',
      'Milk Thistle extract (80% silymarin, 160 mg)(seed)',
      'Artichoke extract (2.5% cynarin, 2.5 mg)(leaf)',
      'Dandelion (Taraxacum officinale) extract (3% vitexin, 3 mg)(leaf)',
      'Marshmallow extract (4:1)(root)',
      'Ginger extract (5% gingerols, 1 mg)(rhizome)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'soy lecithin',
      'beeswax',
      'caramel (color)',
      'titanium dioxide (color)',
      'silicon dioxide',
    ],
  ),
  row(
    'irwin-b462-one-per-day-mega-b-12',
    'Irwin Naturals One-Per-Day Mega B-12',
    'softgel',
    'one-per-day-mega-b-12',
    [
      'Vitamin B12 (as Methylcobalamin)',
      'Medium Chain Triglyceride (MCT) Oil',
      'Eleuthero extract (4:1)(root)',
      'Asian Ginseng (Panax ginseng) extract (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Mannitol',
      'gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'annatto (color)',
      'titanium dioxide (color)',
      'St. John’s bread (carob)(color)',
      'silicon dioxide',
      'turmeric (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b462-high-potency-d3-k2-turmeric',
    'Irwin Naturals High Potency D3 & K2 +Turmeric Extract',
    'softgel',
    'high-potency-d3-k2-complex',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin K2 (as Menaquinone-7 MK-7)',
      'Magnesium (as Magnesium Citrate)',
      'Zinc (as Zinc Citrate)',
      'Flaxseed Oil (seed)',
      'Eleuthero (Eleutherococcus senticosus) extract (4:1)(root)',
      'Bamboo (Bambusa Vulgaris) extract (70% silica, 20 mg)(stem and leaf)',
      'Turmeric extract (95% curcuminoids, 23.75 mg)(root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'medium chain triglyceride oil',
      'beeswax',
      'St. John\'s bread (carob)(color)',
      'soy lecithin',
      'maltodextrin',
      'titanium dioxide (color)',
      'carboxymethyl cellulose',
    ],
  ),
  row(
    'irwin-b462-testosterone-mega-boost-red',
    'Irwin Naturals Testosterone Mega-Boost RED',
    'softgel',
    'testosterone-mega-boost-red',
    [
      'Medium Chain Triglyceride (MCT) Oil',
      'L-Citrulline',
      'Fenugreek extract (4:1)(seed)',
      'Plant Sterols (22% beta sitosterol, 33 mg)',
      'Ginkgo extract (leaf)',
      'Beet powder (root)',
      'LJ100® Tongkat Ali (Eurycoma longifolia) extract (40% glycosaponins, 40 mg and 22% eurypeptides, 22 mg)(root)',
      'Cayenne powder (30,000 HU)(fruit)',
      'Asian Ginseng extract (4% ginsenosides, 1.2 mg)(root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'annatto (color)',
      'soy lecithin',
      'beeswax',
      'silicon dioxide',
      'titanium dioxide (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b462-keto-karma-burn-fat-red',
    'Irwin Naturals Keto-Karma Burn Fat RED',
    'softgel',
    'keto-karma-burn-fat-red',
    [
      'Thiamin (as Thiamine Hydrochloride)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B12 (as Methylcobalamin)',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Flaxseed Oil (seed)',
      'L-Citrulline',
      'Medium Chain Triglycerides (MCT) Oil',
      'Maté (Yerba Maté) extract (20% caffeine, 75 mg)(leaf)',
      'Green Tea extract (50% EGCG, 135 mg)(leaf)',
      'Cococin™ Coconut Water powder (fruit)',
      'AlphaWave® L-Theanine',
      'Guarana powder (seed)',
      'Spirulina (Arthrospira platensis) powder (whole plant)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'annatto (color)',
      'sunflower lecithin',
      'beeswax',
      'maltodextrin',
      'silicon dioxide',
      'titanium dioxide (color)',
      'mannitol',
    ],
  ),
  row(
    'irwin-b462-body-fat-diet-system-six-red',
    'Irwin Naturals Body Fat Diet System-Six RED',
    'softgel',
    'body-fat-diet-system-six-red',
    [
      'Thiamin (as Thiamine Hydrochloride)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B12 (as Methylcobalamin)',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Flaxseed Oil (seed)',
      'L-Citrulline',
      'Medium Chain Triglycerides (MCT) Oil',
      'Maté (Yerba Maté) extract (20% caffeine, 75 mg)(leaf)',
      'Green Tea extract (50% EGCG, 135 mg)(leaf)',
      'Cococin™ Coconut Water powder (fruit)',
      'AlphaWave® L-Theanine',
      'Guarana powder (seed)',
      'Spirulina (Arthrospira platensis) powder (whole plant)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'annatto (color)',
      'sunflower lecithin',
      'beeswax',
      'maltodextrin',
      'silicon dioxide',
      'titanium dioxide (color)',
      'mannitol',
    ],
  ),
  row(
    'irwin-b462-3-in-1-joint-formula',
    'Irwin Naturals 3-in-1 Joint Formula',
    'softgel',
    '3-in-1-joint-formula',
    [
      'Vitamin E (as d-Alpha Tocopherol)',
      'Niacin (as Niacinamide)',
      'Folate',
      'Vitamin B12 (as Cyanocobalamin)',
      'Manganese (as Manganese Gluconate)',
      'Potassium',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 1410 mg)(seed)',
      'Glucosamine Sulfate (as Glucosamine Sulfate 2KCl)',
      'Chondroitin Sulfate (as Chondroitin Sulfate Sodium)',
      'Methylsulfonylmethane (MSM)',
      'Indian Frankincense extract (65% boswellic acids, 74.75 mg)(gum resin)',
      'Stinging Nettle extract (0.8% phytosterols, 0.56 mg)(leaf)',
      'Turmeric extract (95% curcuminoids, 38 mg)(root)',
      'Alpha-Lipoic Acid',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'soy lecithin',
      'turmeric (color)',
      'beeswax',
      'dicalcium phosphate',
      'maltodextrin',
      'soybean oil',
    ],
  ),
];

if (BATCH462_KYR6E_T329U[0].id !== 'irwin-b462-testosterone-up-red' || BATCH462_KYR6E_T329U[0].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[0].honestNote) !== false) throw new Error('t329u irwin-b462-testosterone-up-red');
if (BATCH462_KYR6E_T329U[1].id !== 'irwin-b462-turbo-energy-libido-max-red' || BATCH462_KYR6E_T329U[1].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[1].honestNote) !== false) throw new Error('t329u irwin-b462-turbo-energy-libido-max-red');
if (BATCH462_KYR6E_T329U[2].id !== 'irwin-b462-good-mood-sleep-pm' || BATCH462_KYR6E_T329U[2].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[2].honestNote) !== false) throw new Error('t329u irwin-b462-good-mood-sleep-pm');
if (BATCH462_KYR6E_T329U[3].id !== 'irwin-b462-thermo-burn-stubborn-fat-metabolizer' || BATCH462_KYR6E_T329U[3].verdict !== 'caution' || Boolean(BATCH462_KYR6E_T329U[3].honestNote) !== false) throw new Error('t329u irwin-b462-thermo-burn-stubborn-fat-metabolizer');
if (BATCH462_KYR6E_T329U[4].id !== 'irwin-b462-daily-gentle-cleanse' || BATCH462_KYR6E_T329U[4].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[4].honestNote) !== false) throw new Error('t329u irwin-b462-daily-gentle-cleanse');
if (BATCH462_KYR6E_T329U[5].id !== 'irwin-b462-one-per-day-mega-b-12' || BATCH462_KYR6E_T329U[5].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[5].honestNote) !== false) throw new Error('t329u irwin-b462-one-per-day-mega-b-12');
if (BATCH462_KYR6E_T329U[6].id !== 'irwin-b462-high-potency-d3-k2-turmeric' || BATCH462_KYR6E_T329U[6].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[6].honestNote) !== false) throw new Error('t329u irwin-b462-high-potency-d3-k2-turmeric');
if (BATCH462_KYR6E_T329U[7].id !== 'irwin-b462-testosterone-mega-boost-red' || BATCH462_KYR6E_T329U[7].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[7].honestNote) !== false) throw new Error('t329u irwin-b462-testosterone-mega-boost-red');
if (BATCH462_KYR6E_T329U[8].id !== 'irwin-b462-keto-karma-burn-fat-red' || BATCH462_KYR6E_T329U[8].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[8].honestNote) !== false) throw new Error('t329u irwin-b462-keto-karma-burn-fat-red');
if (BATCH462_KYR6E_T329U[9].id !== 'irwin-b462-body-fat-diet-system-six-red' || BATCH462_KYR6E_T329U[9].verdict !== 'avoid' || Boolean(BATCH462_KYR6E_T329U[9].honestNote) !== false) throw new Error('t329u irwin-b462-body-fat-diet-system-six-red');
if (BATCH462_KYR6E_T329U[10].id !== 'irwin-b462-3-in-1-joint-formula' || BATCH462_KYR6E_T329U[10].verdict !== 'caution' || Boolean(BATCH462_KYR6E_T329U[10].honestNote) !== false) throw new Error('t329u irwin-b462-3-in-1-joint-formula');
if (BATCH462_KYR6E_T329U.some((row) => row.barcode)) throw new Error('t329u upc');
