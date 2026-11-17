// DRAFT / not verified / batch 464 KYR6-e (t331u).
// Irwin Naturals packs locked by t331u or by an earlier lock.
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
import { t331uResolve } from '../scan-preview/t331uLocks';
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
  const hit = t331uResolve(name, form);
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
  if (!hit || !why) throw new Error(`t331u unlocked ${name}`);
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

export const BATCH464_KYR6E_T331U: RatingRecord[] = [
  row(
    'irwin-b464-milk-thistle-liver-detox-v2-gummies',
    'Irwin Naturals Milk Thistle Liver Detox v2 Gummies',
    'gummy',
    'gummies-milk-thistle-liver-detox-v2-30ct',
    [
      'Siliphos® Silybin Phospholipid (Milk Thistle extract (fruit) and Sunflower Lecithin)',
      'AquaTurm® Turmeric (Curcuma longa) extract (rhizome)',
      'Polyglycitol syrup',
      'sugar',
      'water',
      'isomalt',
      'pectin',
      'natural flavors',
      'sodium citrate',
      'malic acid',
      'citrus fiber (coating)',
    ],
  ),
  row(
    'irwin-b464-milk-thistle-triple-detox',
    'Irwin Naturals Milk Thistle Triple-Detox',
    'softgel',
    'milk-thistle-triple-detox-60ct-1',
    [
      'Vitamin E (as d-Alpha Tocopherol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Magnesium (as Magnesium Glycinate)',
      'Selenium (as L-Selenomethionine)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 300 mg) (seed)',
      'Amla powder (fruit)',
      'Belleric Myrobalan powder (fruit)',
      'Chebulic Myrobalan (Terminalia chebula) powder (fruit)',
      'Pumpkin Oil (Cucurbita pepo L.) (seed)',
      'Taurine',
      'Tributyrin',
      'Siliphos® Silybin Phospholipid (Milk Thistle extract (fruit), and Sunflower Lecithin)',
      'Artichoke extract (10:1) (leaf)',
      'BioPerine® Black Pepper extract (95% piperine) (fruit)',
      'Ginger extract (5% gingerols) (rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'dicalcium phosphate',
      'soybean oil',
      'maltodextrin',
      'mannitol',
      'titanium dioxide (color)',
      'silicon dioxide',
      'turmeric (color)',
      'sunflower lecithin',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b464-extra-strength-ashwagandha',
    'Irwin Naturals Extra Strength Ashwagandha',
    'softgel',
    'extra-strength-ashwagandha-mind-body',
    [
      'Flaxseed Oil (seed)',
      'KSM-66® Ashwagandha (Withania somnifera) extract (root)',
      'Eleuthero extract (5:1)(root and stem)',
      'Milk Thistle (Silybum marianum) extract (seed)',
      'Bacopa extract (10:1)(whole herb)',
      'Turmeric powder (root)',
      'Cayenne powder (30,000 HU)(fruit)',
      'Asian Ginseng (Panax ginseng) extract (root)',
      'Cordyceps (Cordyceps sinensis) extract (mycelium)',
      'Turmeric extract (95% curcuminoids, 9.5 mg)(root)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'dextrin',
      'soy lecithin',
      'annatto (color)',
      'titanium dioxide (color)',
      'turmeric (color)',
      'St. John\'s bread (carob)(color)',
      'silicon dioxide',
      'sodium copper chlorophyllin (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b464-sensual-woman-endurance-stress-libido',
    'Irwin Naturals Sensual Woman Endurance - Stress - Libido',
    'softgel',
    'sensual-woman-endurance-stress-libido',
    [
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 500 mg)(seed)',
      'KSM-66® Ashwagandha extract (root)',
      'Shatavari extract (6:1)(root)',
      'Maca powder (gelatinized)(root)',
      'Theobromine',
      'Dong Quai extract (10:1)(root)',
      'Ginger extract (5% gingerols, 2.5 mg)(rhizome)',
      'Cayenne powder (30,000 HU)(fruit)',
      'Saffr\'Activ™ Saffron extract (0.4% saffranal, 30 mcg)(stigma)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'beeswax',
      'sunflower lecithin',
      'titanium dioxide (color)',
      'microcrystalline cellulose',
      'annatto (color)',
      'silicon dioxide',
      'St. John\'s bread (carob)(color)',
      'lycopene (color)',
      'turmeric (color)',
    ],
  ),
  row(
    'irwin-b464-mens-living-green-liquid-gel-multi',
    'Irwin Naturals Men\'s Living Green Liquid-Gel Multi',
    'softgel',
    'mens-living-green-liquid-gel-multi',
    [
      'Vitamin A (as Beta Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as d-Alpha Tocopherol)',
      'Thiamin (as Thiamine Mononitrate)',
      'Riboflavin',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Citrate)',
      'Magnesium (as Magnesium Amino Acid Chelate)',
      'Zinc (as Zinc Citrate)',
      'Selenium (as L-Selenomethionine)',
      'Copper (as Copper Amino Acid Chelate)',
      'Manganese (as Manganese Ascorbate)',
      'Chromium (as Chromium Polynicotinate)',
      'Molybdenum (as Molybdenum Amino Acid Chelate)',
      'Flaxseed Oil (50% ALA)(seed)',
      'Pumpkin Seed Oil',
      'Milk Thistle powder (seed)',
      'Saw Palmetto Oil (fruit)',
      'Stinging Nettle powder (leaf)',
      'Açaí (Assai Palm)(Euterpe oleracea) extract (4:1)(fruit)',
      'Grape Seed extract (95% polyphenols)',
      'Green Tea extract (50% polyphenols)(leaf)',
      'Resveratrol (from Japanese Knotweed extract (root))',
      'White Tea extract (90% polyphenols)(leaf)',
      'Alfalfa (aerial)',
      'Asparagus (aerial)',
      'Beet (root)',
      'Blueberry (Vaccinium angustifolium)(fruit)',
      'Broccoli (aerial)',
      'Brussels Sprouts (Brassica oleracea var. gemmifera)(aerial)',
      'Cabbage (Brassica oleracea)(aerial)',
      'Carrot (Daucus carota ssp. sativus)(root)',
      'Collards (aerial)',
      'Garlic (bulb)',
      'Ginger (root)',
      'Grape (fruit)',
      'Grapefruit (fruit)',
      'Lemon (fruit)',
      'Onion (bulb)',
      'Papaya (fruit)',
      'Pineapple (fruit)',
      'Spinach (leaf)',
      'Tomato (fruit)',
      'L-Histidine Hydrochloride',
      'L-Isoleucine',
      'L-Leucine',
      'L-Lysine Hydrochloride',
      'L-Methionine',
      'L-Phenylalanine',
      'L-Threonine',
      'L-5-Hydroxytryptophan',
      'L-Valine',
      'Cat’s Claw powder (bark)',
      'European Elder (Elderberry) powder (fruit)',
      'Garlic powder (bulb)',
      'American Ginseng powder (root)',
      'Asian Ginseng powder (root)',
      'Montmorillonite',
      'Ashwagandha powder (root)',
      'Astragalus (Astragalus membranaceus) powder (root)',
      'Bupleurum (Bupleurum chinense) powder (root)',
      'Barley Grass powder',
      'Chlorella (Chlorella pyrenoidosa) powder (whole plant)',
      'Spirulina (Arthrospira platensis) powder',
      'Ginkgo powder (leaf)',
      'Phosphatidylserine',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'soybean oil',
      'soy lecithin',
      'beeswax',
      'medium chain triglyceride (MCT) oil',
      'dicalcium phosphate',
      'maltodextrin',
      'mannitol',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b464-prosta-strong-red',
    'Irwin Naturals Prosta-Strong RED',
    'softgel',
    'prosta-strong-red',
    [
      'Zinc (as Zinc Citrate)',
      'L-Citrulline',
      'Pumpkin Oil (seed)',
      'MCT (Medium Chain Triglyceride) Oil',
      'Saw Palmetto extract (85% fatty acids, 272 mg)(fruit)',
      'Ginkgo extract (leaf)',
      'Beet Juice Powder (root)',
      'Pygeum extract (13% phytosterols, 13 mg)(bark)',
      'Beta Sitosterol',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'annatto (color)',
      'beeswax',
      'silicon dioxide',
      'soy lecithin',
      'titanium dioxide (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b464-vita-c-plus-urgent-rescue',
    'Irwin Naturals Vita-C Plus Urgent Rescue',
    'softgel',
    'vita-c-plus-urgent-rescue',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Zinc (as Zinc Citrate)',
      'Flaxseed Oil (seed)',
      'Echinacea Purpurea extract (6:1)(root)',
      'Olive extract (20% oleuropein, 40 mg)(leaf)',
      'European Elder (Elderberry) extract (4:1)(fruit)',
      'Rugose Rose (Rose Hip) extract (4:1)(fruit)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'annatto (color)',
      'dextrin',
      'titanium dioxide (color)',
      'St. John\'s bread (carob)(color)',
      'maltodextrin',
      'turmeric (color)',
      'silicon dioxide',
    ],
  ),
  row(
    'irwin-b464-testosterone-extra-fat-burner',
    'Irwin Naturals Testosterone-Extra Fat Burner',
    'softgel',
    'testosterone-extra-fat-burner',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Zinc (as Zinc Citrate)',
      'Chromium (as Chromium Picolinate)',
      'Flaxseed Oil (seed)',
      'Medium Chain Triglyceride (MCT) Oil',
      'KSM-66® Ashwagandha extract (root)',
      'Green Tea extract (50% EGCG, 135 mg)(leaf)',
      'Caffeine (from Green Coffee (Coffea arabica)(bean))',
      'Cinnamon (Cinnamomum zeylanicum) extract (5:1)(bark)',
      'Shilajit extract (Asphaltum punjabinum)(6:1)(rock exudate)',
      'Cayenne powder (30,000 HU)(fruit)',
      'Cordyceps (Cordyceps sinensis) extract (mycelium)',
      'Stinging Nettle extract (15:1)(root)',
      'Boron (as Boron Chelate)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'dextrin',
      'turmeric (color)',
      'sunflower oil',
      'maltodextrin',
      'silicon dioxide',
      'annatto (color)',
    ],
  ),
  row(
    'irwin-b464-brain-awake-red',
    'Irwin Naturals Brain Awake RED',
    'softgel',
    'brain-awake-red',
    [
      'Vitamin D',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Vitamin B12 (as Methylcobalamin)',
      'Flaxseed Oil (seed)',
      'L-Citrulline',
      'Acetyl-L-Carnitine (as Acetyl-L-Carnitine Hydrochloride)',
      'Holy Basil (Tulsi)(Ocimum tenuiflorum) extract (leaf)',
      'Ginkgo (Ginkgo biloba) extract (leaf)',
      'AlphaWave® L-Theanine',
      'InnovaTea® Natural Tea extract (98% caffeine, 23.52 mg)(leaf)',
      'Gotu Kola (Centella asiatica) extract (4:1)(herb)',
      'Phosphatidylserine',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'sunflower lecithin',
      'beeswax',
      'mannitol',
      'maltodextrin',
      'medium chain triglyceride (MCT) oil',
      'annatto (color)',
      'soy lecithin',
      'silicon dioxide',
    ],
  ),
];

if (BATCH464_KYR6E_T331U[0].id !== 'irwin-b464-milk-thistle-liver-detox-v2-gummies' || BATCH464_KYR6E_T331U[0].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[0].honestNote) !== true) throw new Error('irwin-b464-milk-thistle-liver-detox-v2-gummies');
if (BATCH464_KYR6E_T331U[1].id !== 'irwin-b464-milk-thistle-triple-detox' || BATCH464_KYR6E_T331U[1].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[1].honestNote) !== false) throw new Error('irwin-b464-milk-thistle-triple-detox');
if (BATCH464_KYR6E_T331U[2].id !== 'irwin-b464-extra-strength-ashwagandha' || BATCH464_KYR6E_T331U[2].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[2].honestNote) !== false) throw new Error('irwin-b464-extra-strength-ashwagandha');
if (BATCH464_KYR6E_T331U[3].id !== 'irwin-b464-sensual-woman-endurance-stress-libido' || BATCH464_KYR6E_T331U[3].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[3].honestNote) !== false) throw new Error('irwin-b464-sensual-woman-endurance-stress-libido');
if (BATCH464_KYR6E_T331U[4].id !== 'irwin-b464-mens-living-green-liquid-gel-multi' || BATCH464_KYR6E_T331U[4].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[4].honestNote) !== true) throw new Error('irwin-b464-mens-living-green-liquid-gel-multi');
if (BATCH464_KYR6E_T331U[5].id !== 'irwin-b464-prosta-strong-red' || BATCH464_KYR6E_T331U[5].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[5].honestNote) !== false) throw new Error('irwin-b464-prosta-strong-red');
if (BATCH464_KYR6E_T331U[6].id !== 'irwin-b464-vita-c-plus-urgent-rescue' || BATCH464_KYR6E_T331U[6].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[6].honestNote) !== false) throw new Error('irwin-b464-vita-c-plus-urgent-rescue');
if (BATCH464_KYR6E_T331U[7].id !== 'irwin-b464-testosterone-extra-fat-burner' || BATCH464_KYR6E_T331U[7].verdict !== 'avoid' || Boolean(BATCH464_KYR6E_T331U[7].honestNote) !== true) throw new Error('irwin-b464-testosterone-extra-fat-burner');
if (BATCH464_KYR6E_T331U[8].id !== 'irwin-b464-brain-awake-red' || BATCH464_KYR6E_T331U[8].verdict !== 'caution' || Boolean(BATCH464_KYR6E_T331U[8].honestNote) !== false) throw new Error('irwin-b464-brain-awake-red');
if (BATCH464_KYR6E_T331U.some((row) => row.barcode)) throw new Error('t331u upc');
