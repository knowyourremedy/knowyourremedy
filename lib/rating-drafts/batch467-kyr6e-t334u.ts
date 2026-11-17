// DRAFT / not verified / batch 467 KYR6-e (t334u).
// Irwin Naturals packs locked by t334u or by an earlier lock.
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
import { t334uResolve } from '../scan-preview/t334uLocks';
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
  const hit = t334uResolve(name, form);
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
  if (!hit || !why) throw new Error(`t334u unlocked ${name}`);
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

export const BATCH467_KYR6E_T334U: RatingRecord[] = [
  row(
    'irwin-b467-gummies-magnesium-whole-body-balance',
    'Irwin Naturals Magnesium + Whole-Body Balance Gummies',
    'gummy',
    'gummies-magnesium-whole-body-balance-40ct',
    [
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Magnesium (as Magnesium Citrate)',
      'Zinc (as Zinc Citrate)',
      'Maltitol',
      'sugar',
      'water',
      'natural flavors',
      'agar (organic)',
      'citrus fiber (coating)',
      'sodium citrate',
      'citric acid',
      'annatto (color)',
    ],
  ),
  row(
    'irwin-b467-magnesium-milk-thistle-turmeric',
    'Irwin Naturals Magnesium + Milk Thistle & Turmeric 60ct',
    'softgel',
    'magnesium-milk-thistle-turmeric-60ct',
    [
      'Magnesium (as Magnesium Glycinate)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 480 mg)(seed)',
      'Milk Thistle extract (45% silymarin, 123.75 mg)(seed)',
      'Curcuvail™ Turmeric (Curcuma longa) extract (35% curcuminoids, 43.75 mg)(rhizome)',
      'Artichoke extract (4:1)(leaf)',
      'BioPerine® Black Pepper extract (95% piperine) (fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'maltodextrin',
      'vegetable gum',
      'sunflower lecithin',
      'beeswax',
      'annatto (color)',
      'titanium dioxide (color)',
      'St. John\'s bread (carob)(color)',
      'turmeric (color)',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b467-hair-follicle-stimulator',
    'Irwin Naturals Hair Follicle Stimulator',
    'softgel',
    'hair-follicle-stimulator',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin E (as d-Alpha Tocopherol)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Biotin',
      'Pantothenic Acid (as d-Calcium Pantothenate)',
      'Zinc (as Zinc Citrate)',
      'Selenium (as L-Selenomethionine)',
      'Pumpkin Oil (seed)',
      'Flaxseed Oil (seed)',
      'Millet oil (seed)',
      'Sunflower (Helianthus annuus) oil (seed)',
      'Wheat extract (seed)',
      'Rosemary extract (leaf)',
      'Horsetail (Equisetum arvense) extract (7% silica, 11.2 mg)(herb)',
      'Fo-Ti (Polygonum multiflorum) (10:1) extract (root)',
      'Saw Palmetto extract (fruit)',
      'Chaste Tree (Vitex agnus-castus) extract (10:1) (fruit)',
      'Shoden® Ashwagandha extract (root, leaf)',
      'BioPerine® Black Pepper extract (95% piperine) (fruit)',
      'Ginger extract (5% gingerols) (rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'soybean oil',
      'turmeric (color)',
      'maltodextrin',
      'dicalcium phosphate',
      'dextrin',
      'gum acacia',
      'mannitol',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b467-beets-4-cardio',
    'Irwin Naturals Beets 4 Cardio',
    'softgel',
    'beets-4-cardio',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Magnesium (as Magnesium Bisglycinate)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 350 mg)(seed)',
      'AQTIV™ Organic Beet powder (root)',
      'Cordiart® Orange (Citrus sinensis) extract (whole fruit)',
      'Grape extract (seed)',
      'PomePunic® Pomegranate Oil (seed)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'annatto (color)',
      'sunflower lecithin',
      'mannitol',
      'silicon dioxide',
      'titanium dioxide (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b467-immuno-shield-all-season-wellness',
    'Irwin Naturals Immuno-Shield All Season Wellness ECHINACEA AND ZINC',
    'softgel',
    'immuno-shield-all-season-wellness',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin E (as d-Alpha Tocopherol)',
      'Zinc (as Zinc Picolinate)',
      'Selenium (as Selenium Aspartate)',
      'Echinacea purpurea extract (4% phenolic compounds, 16 mg)(whole herb)',
      'Olive extract (10% oleuropein, 24 mg)(leaf)',
      'Astragalus (Astragalus membranaceus) extract (10:1)(root)',
      'Citrus (Citrus sinensis) Bioflavonoids extract (80% bioflavonoids, 160 mg)(fruit)',
      'Andrographis extract (10:1)(stem)',
      'Cat’s Claw extract (3% alkaloids, 3 mg)(bark)',
      'Beta Glucan',
      'Bifidobacterium bifidum (500 million CFU/g )',
      'Oregano Oil (60% carvacrol, 43.2 mg)(leaf)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Soybean oil',
      'gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'maltodextrin',
      'turmeric (color)',
      'dextrin',
      'titanium dioxide (color)',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b467-collagen-beauty',
    'Irwin Naturals Collagen Beauty',
    'softgel',
    'collagen-beauty',
    [
      'Vitamin A (as Beta Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Biotin',
      'Calcium',
      'Flaxseed Oil (seed)',
      'VERISOL® Collagen Type I and III',
      'Coconut Oil (copra)',
      'Gotu Kola (Centella asiatica) extract (4:1)(whole herb)',
      'Apricot Oil (kernel)',
      'Evening Primrose Oil (seed)',
      'Grape Oil (seed)',
      'Pomegranate extract (4:1)(fruit)',
      'Moroccan Argan (Argania spinosa) Oil (kernel)',
      'Coenzyme Q10',
      'Resveratrol (as Japanese Knotweed extract (root))',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'medium chain triglyceride (MCT) oil',
      'glycerin',
      'dicalcium phosphate',
      'soy lecithin',
      'maltodextrin',
      'turmeric (color)',
      'soybean oil',
      'beeswax',
      'glucose',
      'St. John\'s bread (carob)(color)',
      'sunflower oil',
      'dunaliella extract',
      'silicon dioxide',
      'annatto (color)',
      'pectin',
    ],
  ),
  row(
    'irwin-b467-active-cleanse-and-probiotics',
    'Irwin Naturals Active-Cleanse and Probiotics',
    'softgel',
    'active-cleanse-and-probiotics',
    [
      'Extra Virgin Olive Oil',
      'Amla powder (fruit)',
      'Belleric Myrobalan powder (fruit)',
      'Chebulic Myrobalan powder (fruit)',
      'Unique IS-2™ Bacillus Coagulans (providing 4.5 Billion organisms )',
      'Chebulic Myrobalan (Haritaki) extract (10% tannins, 25 mg)(fruit)',
      'Cape Aloe extract (25% hydroxyanthracene derivatives, 30 mg)(leaf)',
      'Coriander extract (4:1)(seed)',
      'Cumin extract (4:1)(seed)',
      'Fennel extract (4:1)(seed)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'titanium dioxide (color)',
      'maltodextrin',
      'sodium copper chlorophyllin (color)',
      'silicon dioxide',
      'turmeric (color)',
    ],
  ),
  row(
    'irwin-b467-bloat-away',
    'Irwin Naturals Bloat-Away Water Balance',
    'softgel',
    'bloat-away',
    [
      'Iron',
      'Potassium (as Potassium Citrate)',
      'Flaxseed Oil (seed)',
      'Dandelion (Taraxacum officinale) powder (leaf)',
      'Juniper berry powder (fruit)',
      'Uva-Ursi extract (10% arbutin, 25 mg)(leaf)',
      'Buchu (Barosma Crenulata) powder (leaf)',
      'Cranberry (Vaccinium macrocarpon) powder (fruit)',
      'Hibiscus (Hibiscus sabdariffa) extract (4:1)(flower)',
      'Chamomile extract (4:1)(flower)',
      'Cornsilk powder (stigma)',
      'Grape Seed extract (95% proanthocyanidins, 85.5 mg)(seed)',
      'Parsley extract (4:1)(stem and leaf)',
      'Red Raspberry (Rubus idaeus ssp. idaeus) powder (leaf)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'soy lecithin',
      'beeswax',
      'titanium dioxide (color)',
      'maltodextrin',
      'silicon dioxide',
      'caramel (color)',
      'red cabbage powder (color)',
    ],
  ),
];

if (BATCH467_KYR6E_T334U[0].id !== 'irwin-b467-gummies-magnesium-whole-body-balance' || BATCH467_KYR6E_T334U[0].verdict !== 'caution' || Boolean(BATCH467_KYR6E_T334U[0].honestNote) !== false) throw new Error('irwin-b467-gummies-magnesium-whole-body-balance');
if (BATCH467_KYR6E_T334U[1].id !== 'irwin-b467-magnesium-milk-thistle-turmeric' || BATCH467_KYR6E_T334U[1].verdict !== 'avoid' || Boolean(BATCH467_KYR6E_T334U[1].honestNote) !== false) throw new Error('irwin-b467-magnesium-milk-thistle-turmeric');
if (BATCH467_KYR6E_T334U[2].id !== 'irwin-b467-hair-follicle-stimulator' || BATCH467_KYR6E_T334U[2].verdict !== 'caution' || Boolean(BATCH467_KYR6E_T334U[2].honestNote) !== false) throw new Error('irwin-b467-hair-follicle-stimulator');
if (BATCH467_KYR6E_T334U[3].id !== 'irwin-b467-beets-4-cardio' || BATCH467_KYR6E_T334U[3].verdict !== 'avoid' || Boolean(BATCH467_KYR6E_T334U[3].honestNote) !== false) throw new Error('irwin-b467-beets-4-cardio');
if (BATCH467_KYR6E_T334U[4].id !== 'irwin-b467-immuno-shield-all-season-wellness' || BATCH467_KYR6E_T334U[4].verdict !== 'avoid' || Boolean(BATCH467_KYR6E_T334U[4].honestNote) !== false) throw new Error('irwin-b467-immuno-shield-all-season-wellness');
if (BATCH467_KYR6E_T334U[5].id !== 'irwin-b467-collagen-beauty' || BATCH467_KYR6E_T334U[5].verdict !== 'caution' || Boolean(BATCH467_KYR6E_T334U[5].honestNote) !== false) throw new Error('irwin-b467-collagen-beauty');
if (BATCH467_KYR6E_T334U[6].id !== 'irwin-b467-active-cleanse-and-probiotics' || BATCH467_KYR6E_T334U[6].verdict !== 'avoid' || Boolean(BATCH467_KYR6E_T334U[6].honestNote) !== false) throw new Error('irwin-b467-active-cleanse-and-probiotics');
if (BATCH467_KYR6E_T334U[7].id !== 'irwin-b467-bloat-away' || BATCH467_KYR6E_T334U[7].verdict !== 'avoid' || Boolean(BATCH467_KYR6E_T334U[7].honestNote) !== false) throw new Error('irwin-b467-bloat-away');
if (BATCH467_KYR6E_T334U.some((row) => row.barcode)) throw new Error('t334u upc');
