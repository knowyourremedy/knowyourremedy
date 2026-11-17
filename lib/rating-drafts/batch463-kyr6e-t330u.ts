// DRAFT / not verified / batch 463 KYR6-e (t330u).
// Irwin Naturals packs locked by t330u or by an earlier lock.
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
import { t330uResolve } from '../scan-preview/t330uLocks';
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
  const hit = t330uResolve(name, form);
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
  if (!hit || !why) throw new Error(`t330u unlocked ${name}`);
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

export const BATCH463_KYR6E_T330U: RatingRecord[] = [
  row(
    'irwin-b463-double-potency-5-htp-extra',
    'Irwin Naturals Double-Potency 5-HTP Extra',
    'softgel',
    'double-potency-5-htp-extra',
    [
      'Vitamin D (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Magnesium (as Magnesium Citrate)',
      'Fish Oil (18% EPA, 144 mg, 12% DHA, 96 mg)',
      '5-HTP (Griffonia simplicifolia)(seed)',
      'Lemon Balm extract (4:1)(leaf)',
      'L-Theanine',
      'Damiana (Turnera diffusa) extract (4:1)(leaf)',
      'Holy Basil extract (2.5% ursolic acid, 1.875 mg)(herb)',
      'Saffr\'Activ® Saffron extract (0.3% safranal, 0.015 mg) (stigma and flower)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'dextrin',
      'turmeric (color)',
      'maltodextrin',
      'titanium dioxide (color)',
      'silicon dioxide',
      'sodium copper chlorophyllin (color)',
      'microcrystalline cellulose',
    ],
  ),
  row(
    'irwin-b463-longjack-muira-puama',
    'Irwin Naturals Longjack Extract + Potency Wood (Muira Puama) Primal-Male 60ct',
    'softgel',
    'longjackextract-potency-wood-primal-male-60ct',
    [
      'Flaxseed Oil (seed)',
      'Muira Puama (Potency Wood)(Ptychopetalum olacoides) extract (4:1)(bark)',
      'Epimedium (Horny Goat Weed)(Epimedium sagittatum) extract (15:1)(aerial)',
      'Guaraná (Paullinia cupana) extract (12% caffeine, 18 mg)(seed)',
      'Tongkat Ali (Long Jack) (Eurycoma longifolia) extract (100:1)(root)',
      'Velvet Bean (Mucuna pruriens) extract (seed)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Maltodextrin',
      'gelatin',
      'purified water',
      'glycerin',
      'sunflower lecithin',
      'beeswax',
      'dextrin',
      'caramel (color)',
      'titanium dioxide (color)',
      'St. John\'s bread (carob)(color)',
      'red cabbage extract (color)',
    ],
  ),
  row(
    'irwin-b463-stored-fat-belly-burner',
    'Irwin Naturals Stored-Fat Belly Burner plus CaloriBurn GP',
    'softgel',
    'stored-fat-belly-burner®-plus-caloriburn-gp®',
    [
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Vitamin B12 (as Methylcobalamin)',
      'Magnesium (as Magnesium Citrate)',
      'Chromium (as Chromium Picolinate)',
      'Flaxseed Oil (seed)',
      'Citrus grandis (fruit)',
      'Grapefruit (Citrus paradisi)(fruit)',
      'Guaraná (Paullinia cupana)(seed)',
      'Sweet Orange extract',
      'Blood Orange extract',
      'Tributyrin',
      'Cayenne (Capsicum annuum) extract (5% capsaicin, 1.5 mg)(fruit)',
      'CaloriBurn GP® Grains of Paradise extract (seed)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'sunflower lecithin',
      'beeswax',
      'annatto (color)',
      'titanium dioxide (color)',
      'mannitol',
      'St. John\'s bread (carob)(color)',
      'turmeric (color)',
    ],
  ),
  row(
    'irwin-b463-sleep-fit-pm-fat-burner',
    'Irwin Naturals Sleep Fit + PM Fat Burner',
    'softgel',
    'sleep-fit-pm-fat-burner',
    [
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Magnesium (as Magnesium Glycinate)',
      'Chromium (as Chromium Picolinate)',
      'Flaxseed Oil (seed)',
      'Tributyrin',
      'Glycine (as Magnesium Glycinate)',
      'L-Theanine',
      'Ginger extract (5% gingerols, 7.5 mg)(rhizome)',
      'Gymnema extract (20:1)(leaf)',
      '5-Hydroxytryptophan (5-HTP) (from Griffonia simplicifolia extract)(seed)',
      'ThermoGP™ Grains of Paradise extract (seed)',
      'Melatonin',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'annatto (color)',
      'maltodextrin',
      'turmeric (color)',
      'silicon dioxide',
      'titanium dioxide (color)',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b463-rapid-acting-testosterone-up-thermoburn-max',
    'Irwin Naturals Rapid-Acting Testosterone UP ThermoBurn-MAX',
    'softgel',
    'rapid-acting-testosterone-up-thermoburn-max',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Vitamin B12 (as Methylcobalamin)',
      'Chromium (as Chromium Picolinate)',
      'Flaxseed Oil (seed)',
      'Testosurge® Fenugreek extract (seed)',
      'Guaraná (Paullinia cupana) extract (12% caffeine, 50.4 mg)(seed)',
      'Ashwagandha extract (4:1)(root)',
      'Cayenne powder (30,000 HU)(fruit)',
      'ThermoGP™ Grains of Paradise extract (seed)',
      'Boron (as Boron Chelate)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'maltodextrin',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'annatto (color)',
      'titanium dioxide (color)',
      'St. John\'s bread (carob)(color)',
      'mannitol',
      'silicon dioxide',
      'turmeric (color)',
    ],
  ),
  row(
    'irwin-b463-pro-active-nitric-oxide',
    'Irwin Naturals Pro-Active Nitric Oxide',
    'softgel',
    'pro-active-nitric-oxide',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Vitamin B12 (as Methylcobalamin)',
      'Flaxseed Oil (seed)',
      'L-Citrulline',
      'Medium Chain Triglyceride (MCT) Oil',
      'Sabeet® Beet extract (2% nitrates, 3 mg)(root)',
      'Cayenne powder (30,000 HU)(fruit)',
      'Pomegranate extract (5:1)(pericarp)',
      'Oxystorm® Red Spinach (Amaranthus spp.) extract (9% nitrates, 1.8 mg)(leaf)',
      'Red Ginseng (Panax ginseng) extract (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'maltodextrin',
      'sunflower oil',
      'mannitol',
      'soy lecithin',
      'dextrin',
      'annatto (color)',
      'silicon dioxide',
    ],
  ),
  row(
    'irwin-b463-beet-root-red',
    'Irwin Naturals Beet Root RED',
    'softgel',
    'beet-root-red',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Vitamin B12 (as Methylcobalamin)',
      'Flaxseed Oil (seed)',
      'L-Citrulline',
      'Medium Chain Triglyceride (MCT) Oil',
      'Sabeet® Beet extract (2% nitrates, 3 mg)(root)',
      'Cayenne powder (fruit)',
      'Pomegranate extract (5:1)(pericarp)',
      'Oxystorm® Red Spinach (Amaranthus sp.) extract (9% nitrates, 1.8 mg)(leaf)',
      'Red Ginseng (Panax ginseng) extract (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'annatto (color)',
      'maltodextrin',
      'soy lecithin',
      'silicon dioxide',
      'titanium dioxide (color)',
      'mannitol',
    ],
  ),
  row(
    'irwin-b463-libido-max-active-men',
    'Irwin Naturals Libido Max for Active Men',
    'softgel',
    'level-up-active-male',
    [
      'Zinc (as Zinc Citrate)',
      'Copper (as Copper Citrate)',
      'Epimedium (Horny Goat Weed)(Epimedium brevicornum) extract (15:1)(aerial)',
      'L-Arginine (as L-Arginine Hydrochloride)',
      'Ashwagandha extract (4:1)(root)',
      'Maca (Lepidium meyenii) powder (gelatinized)(root)',
      'Red Ginseng (Panax ginseng) extract (7% ginsenosides, 7 mg)(root)',
      'Damiana extract (4:1)(leaf)',
      'Fenugreek extract (4:1)(seed)',
      'Tongkat Ali (Long Jack)(Eurycoma longifolia) powder (100:1)(root)',
      'Boron (as Boron Citrate)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Flaxseed oil',
      'gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'beeswax',
      'caramel (color)',
      'sunflower lecithin',
      'turmeric (color)',
      'dextrin',
      'St. John’s bread (carob)(color)',
      'silicon dioxide',
    ],
  ),
  row(
    'irwin-b463-only-one-liquid-gel-multi-with-iron',
    'Irwin Naturals Only One Liquid-Gel Multi with Iron',
    'softgel',
    'only-one-liquid-gel-multi-with-iron',
    [
      'Vitamin A (as Beta Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D (as Vitamin D3)',
      'Vitamin E (as d-Alpha Tocopherol)',
      'Thiamin (as Thiamine Hydrochloride)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Biotin',
      'Pantothenic Acid (as d-Calcium Pantothenate)',
      'Calcium',
      'Iron (as Iron Amino Acid Chelate)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as L-Selenomethionine)',
      'Copper (as Copper Citrate)',
      'Manganese (as Manganese Citrate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Molybdenum Citrate)',
      'Fish Oil (30% Omega-3 fatty acids, 150 mg)',
      'Alfalfa powder (aerial)',
      'Broccoli powder (aerial)',
      'Chlorella powder',
      'Kale (Brassica sp.) powder (leaf)',
      'Spirulina powder (whole plant)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'dicalcium phosphate',
      'soy lecithin',
      'beeswax',
      'caramel color',
      'titanium dioxide',
      'mannitol',
    ],
  ),
  row(
    'irwin-b463-only-one-liquid-gel-multi-without-iron',
    'Irwin Naturals Only One Liquid-Gel Multi without Iron',
    'softgel',
    'only-one-liquid-gel-multi-without-iron',
    [
      'Vitamin A (as Beta Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D (as Vitamin D3)',
      'Vitamin E (as d-Alpha Tocopherol)',
      'Thiamin (as Thiamine Hydrochloride)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Biotin',
      'Pantothenic Acid (as d-Calcium Pantothenate)',
      'Calcium (as Calcium Citrate)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as L-Selenomethionine)',
      'Copper (as Copper Citrate)',
      'Manganese (as Manganese Citrate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Molybdenum Citrate)',
      'Fish Oil (30% Omega-3 fatty acids, 150 mg)',
      'Alfalfa powder (aerial)',
      'Broccoli powder (aerial)',
      'Chlorella powder',
      'Kale (Brassica sp.) powder (leaf)',
      'Spirulina powder (whole plant)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'St. John’s bread (carob)(color)',
      'titanium dioxide (color)',
      'dicalcium phosphate',
      'mannitol',
    ],
  ),
  row(
    'irwin-b463-sunny-mood',
    'Irwin Naturals Sunny Mood',
    'softgel',
    'sunny-mood',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Iron',
      'Magnesium (as Magnesium Citrate)',
      'Chromium (as Chromium Picolinate)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 540 mg)(seed)',
      'Fish Oil (18% Eicosapentaenoic Acid (EPA), 90 mg, 12% Docosahexaenoic Acid (DHA), 60 mg)',
      'Rhodiola (Rhodiola rosea) extract (3% rosavins, 10.2 mg, 1% salidroside, 3.4 mg)(root)',
      'Lemon Balm extract (4:1)(leaf)',
      'Passionflower extract (4:1)(aerial)',
      'Damiana extract (4:1)(leaf)',
      'L-Theanine',
      'Saffron (Crocus sativus) extract (flower and stigma)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'soy lecithin',
      'beeswax',
      'turmeric (color)',
      'maltodextrin',
      'microcrystalline cellulose',
      'silicon dioxide',
    ],
  ),
  row(
    'irwin-b463-nitric-oxide-pre-sport',
    'Irwin Naturals Nitric Oxide Pre-Sport',
    'softgel',
    'nitric-oxide-pre-sport',
    [
      'Medium Chain Triglyceride (MCT) Oil',
      'L-Citrulline',
      'Beet powder (root)',
      'L-Theanine',
      'Ginkgo extract (leaf)',
      'Cayenne powder (30,000 HU) (fruit)',
      'Maté (Yerba Maté) powder (leaf)',
      'Asian Ginseng extract (root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'caramel (color)',
      'annatto (color)',
      'soy lecithin',
      'St. John’s bread (carob)(color)',
      'silicon dioxide',
      'titanium dioxide (color)',
    ],
  ),
  row(
    'irwin-b463-power-to-sleep-pm',
    'Irwin Naturals Power to Sleep PM 6mg Melatonin',
    'softgel',
    'power-to-sleep-pm-6mg-melatonin',
    [
      'Calcium (as Calcium Citrate)',
      'Magnesium (as Magnesium Citrate)',
      'Flaxseed Oil (seed)',
      'Ashwagandha extract (root)',
      'Hops extract (10:1)(flower)',
      'Lemon Balm (Melissa officinalis) extract (aerial)',
      'Passionflower (Passiflora incarnata) extract (aerial)',
      'Gamma-Aminobutyric Acid (GABA)',
      'L-Theanine',
      'Melatonin',
      'BioPerine® Black Pepper extract (95% piperine) (fruit)',
      'Ginger extract (5% gingerols) (rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'beeswax',
      'caramel (color)',
      'soy lecithin',
      'turmeric (color)',
      'silicon dioxide',
      'St. John’s bread (carob)(color)',
    ],
  ),
  row(
    'irwin-b463-steel-libido-peak-testosterone',
    'Irwin Naturals Steel-Libido Peak Testosterone',
    'softgel',
    'steel-libido-peak-testosterone',
    [
      'Medium Chain Triglyceride (MCT) Oil',
      'KSM-66® Ashwagandha extract (5% withanolides, 33.75 mg)(root)',
      'Maca powder (root)',
      'Fenugreek extract (4:1)(seed)',
      'Plant Sterols (22% beta sitosterol, 33 mg)',
      'Horny Goat Weed (Epimedium sagittatum) extract (10% icariins, 15 mg)(aerial)',
      'Muira Puama extract (4:1)(bark)',
      'Asian Ginseng extract (4% ginsenosides, 3.2 mg)(root)',
      'Cayenne powder (30,000HU)(fruit)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'caramel (color)',
      'annatto (color)',
      'St. John’s bread (carob)(color)',
      'silicon dioxide',
      'titanium dioxide (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b463-vo2-max-performance-fat-burner',
    'Irwin Naturals VO2 Max Performance Fat Burner',
    'softgel',
    'vo2-max-performance-fat-burner',
    [
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Pantothenic Acid (as d-Calcium Pantothenate)',
      'Flaxseed Oil (seed)',
      'Medium Chain Triglyceride (MCT) Oil',
      'KSM-66® Ashwagandha extract (5% withanolides, 15 mg)(root)',
      'Green Tea extract (98% polyphenols, 264.6 mg, 50% EGCG, 135 mg)(leaf)',
      'Maca powder (gelatinized)(root)',
      'Schisandra (Schisandra chinensis) extract (5:1)(fruit)',
      'Caffeine (from Coffee Bean) (Coffea arabica)(bean)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'annatto (color)',
      'turmeric (color)',
      'titanium dioxide (color)',
      'silicon dioxide',
      'sodium copper chlorophyllin (color)',
      'maltodextrin',
      'dicalcium phosphate',
      'mannitol',
    ],
  ),
  row(
    'irwin-b463-brain-awake',
    'Irwin Naturals Brain Awake',
    'softgel',
    'brain-awake',
    [
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Medium Chain Triglyceride (MCT) Oil',
      'Acetyl-L-Carnitine (as Acetyl-L-Carnitine Hydrochloride)',
      'Bacopa extract (40% bacosides, 150 mg)(whole plant)',
      'Holy Basil (Tulsi) extract (2% ursolic acid, 4 mg)(herb)',
      'AlphaWave® L-Theanine',
      'InnovaTea® Caffeine 98% (from Camellia sinensis, 50.96 mg)(leaf)',
      'Lemon Balm extract (10:1)(aerial)',
      'Rosemary extract (3% rosmarinic acid, 0.9 mg)(leaf)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'flaxseed oil',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'St. John\'s bread (carob)(color)',
      'maltodextrin',
      'titanium dioxide (color)',
      'silicon dioxide',
      'dicalcium phosphate',
      'mannitol',
    ],
  ),
];

if (BATCH463_KYR6E_T330U[0].id !== 'irwin-b463-double-potency-5-htp-extra' || BATCH463_KYR6E_T330U[0].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[0].honestNote) !== false) throw new Error('irwin-b463-double-potency-5-htp-extra');
if (BATCH463_KYR6E_T330U[1].id !== 'irwin-b463-longjack-muira-puama' || BATCH463_KYR6E_T330U[1].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[1].honestNote) !== false) throw new Error('irwin-b463-longjack-muira-puama');
if (BATCH463_KYR6E_T330U[2].id !== 'irwin-b463-stored-fat-belly-burner' || BATCH463_KYR6E_T330U[2].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[2].honestNote) !== false) throw new Error('irwin-b463-stored-fat-belly-burner');
if (BATCH463_KYR6E_T330U[3].id !== 'irwin-b463-sleep-fit-pm-fat-burner' || BATCH463_KYR6E_T330U[3].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[3].honestNote) !== false) throw new Error('irwin-b463-sleep-fit-pm-fat-burner');
if (BATCH463_KYR6E_T330U[4].id !== 'irwin-b463-rapid-acting-testosterone-up-thermoburn-max' || BATCH463_KYR6E_T330U[4].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[4].honestNote) !== false) throw new Error('irwin-b463-rapid-acting-testosterone-up-thermoburn-max');
if (BATCH463_KYR6E_T330U[5].id !== 'irwin-b463-pro-active-nitric-oxide' || BATCH463_KYR6E_T330U[5].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[5].honestNote) !== true) throw new Error('irwin-b463-pro-active-nitric-oxide');
if (BATCH463_KYR6E_T330U[6].id !== 'irwin-b463-beet-root-red' || BATCH463_KYR6E_T330U[6].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[6].honestNote) !== false) throw new Error('irwin-b463-beet-root-red');
if (BATCH463_KYR6E_T330U[7].id !== 'irwin-b463-libido-max-active-men' || BATCH463_KYR6E_T330U[7].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[7].honestNote) !== true) throw new Error('irwin-b463-libido-max-active-men');
if (BATCH463_KYR6E_T330U[8].id !== 'irwin-b463-only-one-liquid-gel-multi-with-iron' || BATCH463_KYR6E_T330U[8].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[8].honestNote) !== false) throw new Error('irwin-b463-only-one-liquid-gel-multi-with-iron');
if (BATCH463_KYR6E_T330U[9].id !== 'irwin-b463-only-one-liquid-gel-multi-without-iron' || BATCH463_KYR6E_T330U[9].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[9].honestNote) !== false) throw new Error('irwin-b463-only-one-liquid-gel-multi-without-iron');
if (BATCH463_KYR6E_T330U[10].id !== 'irwin-b463-sunny-mood' || BATCH463_KYR6E_T330U[10].verdict !== 'caution' || Boolean(BATCH463_KYR6E_T330U[10].honestNote) !== false) throw new Error('irwin-b463-sunny-mood');
if (BATCH463_KYR6E_T330U[11].id !== 'irwin-b463-nitric-oxide-pre-sport' || BATCH463_KYR6E_T330U[11].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[11].honestNote) !== false) throw new Error('irwin-b463-nitric-oxide-pre-sport');
if (BATCH463_KYR6E_T330U[12].id !== 'irwin-b463-power-to-sleep-pm' || BATCH463_KYR6E_T330U[12].verdict !== 'caution' || Boolean(BATCH463_KYR6E_T330U[12].honestNote) !== false) throw new Error('irwin-b463-power-to-sleep-pm');
if (BATCH463_KYR6E_T330U[13].id !== 'irwin-b463-steel-libido-peak-testosterone' || BATCH463_KYR6E_T330U[13].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[13].honestNote) !== false) throw new Error('irwin-b463-steel-libido-peak-testosterone');
if (BATCH463_KYR6E_T330U[14].id !== 'irwin-b463-vo2-max-performance-fat-burner' || BATCH463_KYR6E_T330U[14].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[14].honestNote) !== false) throw new Error('irwin-b463-vo2-max-performance-fat-burner');
if (BATCH463_KYR6E_T330U[15].id !== 'irwin-b463-brain-awake' || BATCH463_KYR6E_T330U[15].verdict !== 'avoid' || Boolean(BATCH463_KYR6E_T330U[15].honestNote) !== false) throw new Error('irwin-b463-brain-awake');
if (BATCH463_KYR6E_T330U.some((row) => row.barcode)) throw new Error('t330u upc');
