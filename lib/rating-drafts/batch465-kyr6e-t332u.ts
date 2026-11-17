// DRAFT / not verified / batch 465 KYR6-e (t332u).
// Irwin Naturals packs locked by t332u or by an earlier lock.
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
import { t332uResolve } from '../scan-preview/t332uLocks';
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
  const hit = t332uResolve(name, form);
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
  if (!hit || !why) throw new Error(`t332u unlocked ${name}`);
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

export const BATCH465_KYR6E_T332U: RatingRecord[] = [
  row(
    'irwin-b465-apple-cider-vinegar-metabolism-gummies',
    'Irwin Naturals Apple Cider Vinegar + Metabolism Gummies',
    'gummy',
    'gummies-apple-cider-vinegar-metabolism-40ct',
    [
      'Chromium (as Chromium Picolinate)',
      'Apple Cider Vinegar (Organic)',
      'Polyglycitol syrup',
      'sugar',
      'isomalt',
      'water',
      'pectin',
      'natural flavors',
      'citric acid',
      'sodium citrate',
      'citrus fiber (coating)',
      'malic acid',
      'fruit and vegetable juice (color)',
    ],
  ),
  row(
    'irwin-b465-ashwagandha-healthy-brain-mood-stress',
    'Irwin Naturals Ashwagandha Healthy Brain Mood & Stress 60ct',
    'softgel',
    'ashwagandha-healthy-brain-mood-stress-60ct',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Magnesium (as Magnesium Glycinate)',
      'Chromium (as Chromium Picolinate)',
      'Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 285 mg)(seed)',
      'Tributyrin',
      'Sensoril® Ashwagandha extract (root, leaf)',
      'Lion\'s Mane Mushroom powder (fruiting body)',
      '5-Hydroxytryptophan (5-HTP)(from Griffonia simplicifolia) powder (seed)',
      'SaffSerene® Saffron extract (stigma)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'maltodextrin',
      'mannitol',
      'annatto (color)',
      'titanium dioxide (color)',
      'silicon dioxide',
      'St. John\'s bread (carob)(color)',
      'riboflavin (color)',
      'turmeric (color)',
    ],
  ),
  row(
    'irwin-b465-female-balance-ksm-66-ashwagandha',
    'Irwin Naturals Female Balance KSM-66 Ashwagandha + Evening Primrose',
    'softgel',
    'female-balance-ksm-66-ashwagandha',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folate',
      'Vitamin B12 (as Methylcobalamin)',
      'Magnesium (as Magnesium Glycinate)',
      'Iodine (as Potassium Iodide)',
      'Selenium (as L-Selenomethionine)',
      'Flaxseed Oil (seed)',
      'KSM-66® Ashwagandha extract (root)',
      'Evening Primrose (Oenothera biennis) Oil (seed)',
      'Tributyrin',
      'Milk Thistle extract (25:1)(seed)',
      'Reishi Mushroom (Ganoderma lucidum) powder (fruiting body, mycelium)',
      'Dong Quai extract (10:1)(root)',
      'Chasteberry extract (10:1)(fruit)',
      'BioPerine® Black Pepper extract (95% piperine) (fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'sunflower lecithin',
      'dicalcium phosphate',
      'mannitol',
      'annatto (color)',
      'titanium dioxide (color)',
      'dextrin',
      'St. John\'s bread (carob)(color)',
      'riboflavin (color)',
      'silicon dioxide',
      'turmeric (color)',
      'maltodextrin',
    ],
  ),
  row(
    'irwin-b465-immuno-shield-elderberry',
    'Irwin Naturals Global Wellness Immuno-Shield with Elderberry',
    'softgel',
    'global-wellness-immuno-shield-with-elderberry',
    [
      'Vitamin C (as Ascorbic acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Zinc (as Zinc Citrate)',
      'Selenium (as L-Selenomethionine)',
      'Extra Virgin Olive Oil',
      'Flaxseed Oil (seed)',
      'Astragalus (Astragalus membranaceus) extract (20:1)(root)',
      'Echinacea purpurea extract (10:1)(root)',
      'Black Elder (Black Elderberry) (Sambucus nigra) extract (10:1)(fruit)',
      'Licorice (Glycyrrhiza glabra) powder (root)',
      'Organic Reishi (Ganoderma lucidum) Mushroom powder (fruiting body)',
      'Organic Turkey Tail Mushroom powder (fruiting body)',
      'Organic Agaricus (Agaricus blazei) Mushroom powder (mycelium)',
      'Organic Chaga Mushroom powder (mycelium)',
      'Organic Cordyceps (Cordyceps sinensis) Mushroom powder (mycelium)',
      'Organic Lion’s Mane (Hericium erinaceus) Mushroom powder (mycelium and fruiting body)',
      'Organic Maitake Mushroom powder (mycelium)',
      'Organic Shiitake Mushroom powder (mycelium and fruiting body)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'St. John’s bread (carob)(color)',
      'maltodextrin',
      'titanium dioxide (color)',
      'silicon dioxide',
    ],
  ),
  row(
    'irwin-b465-vision-sharp-eye-health',
    'Irwin Naturals Vision Sharp Multi-Nutrient Eye Health',
    'softgel',
    'vision-sharp-multi-nutrient-eye-health',
    [
      'Vitamin A (100% as Beta Carotene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin E (as d-Alpha Tocopherol)',
      'Zinc (as Zinc Oxide)',
      'Manganese (as Manganese Aspartate)',
      'Fish Oil (30% Omega-3 fatty acids, 303 mg)',
      'Bilberry extract (25% anthocyanidins, 80 mg)(fruit)',
      'Ginkgo extract (24% flavone glycosides, 29 mg, 6% terpene lactones, 7.2 mg)(leaf)',
      'Citrus (Citrus spp.) Bioflavonoids (80% bioflavonoids, 30 mg)(fruit)',
      'Lutein',
      'Zeaxanthin',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'soy lecithin',
      'beeswax',
      'silicon dioxide',
      'titanium dioxide (color)',
      'sodium copper chlorophyllin (color)',
    ],
  ),
  row(
    'irwin-b465-pure-defense-mushroom-8',
    'Irwin Naturals Pure Defense Mushroom-8 Immune Support',
    'softgel',
    'pure-defense-mushroom-8-immune-support',
    [
      'Vitamin C (as Ascorbic acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Zinc (as Zinc Citrate)',
      'Selenium (as L-Selenomethionine)',
      'Extra Virgin Olive Oil',
      'Flaxseed Oil (seed)',
      'Astragalus (Astragalus membranaceus) extract (20:1)(root)',
      'Echinacea purpurea extract (10:1)(root)',
      'Black Elder (Black Elderberry) (Sambucus nigra) extract (10:1)(fruit)',
      'Licorice (Glycyrrhiza glabra) powder (root)',
      'Organic Reishi (Ganoderma lucidum) Mushroom powder (fruiting body)',
      'Organic Turkey Tail Mushroom powder (fruiting body)',
      'Organic Agaricus (Agaricus blazei) Mushroom powder (mycelium)',
      'Organic Chaga Mushroom powder (mycelium)',
      'Organic Cordyceps (Cordyceps sinensis) powder (mycelium)',
      'Organic Lion\'s Mane (Hericium erinaceus) Mushroom powder (mycelium and fruiting body)',
      'Organic Maitake Mushroom powder (mycelium)',
      'Organic Shiitake Mushroom powder (mycelium and fruiting body)',
      'BioPerine® Black Pepper extract (95% piperine)(fruit)',
      'Ginger extract (5% gingerols)(rhizome)',
      'Gelatin',
      'purified water',
      'glycerin',
      'beeswax',
      'soy lecithin',
      'St. John\'s bread (carob)(color)',
      'titanium dioxide (color)',
      'silicon dioxide',
      'maltodextrin',
    ],
  ),
];

if (BATCH465_KYR6E_T332U[0].id !== 'irwin-b465-apple-cider-vinegar-metabolism-gummies' || BATCH465_KYR6E_T332U[0].verdict !== 'avoid' || Boolean(BATCH465_KYR6E_T332U[0].honestNote) !== true) throw new Error('irwin-b465-apple-cider-vinegar-metabolism-gummies');
if (BATCH465_KYR6E_T332U[1].id !== 'irwin-b465-ashwagandha-healthy-brain-mood-stress' || BATCH465_KYR6E_T332U[1].verdict !== 'avoid' || Boolean(BATCH465_KYR6E_T332U[1].honestNote) !== false) throw new Error('irwin-b465-ashwagandha-healthy-brain-mood-stress');
if (BATCH465_KYR6E_T332U[2].id !== 'irwin-b465-female-balance-ksm-66-ashwagandha' || BATCH465_KYR6E_T332U[2].verdict !== 'avoid' || Boolean(BATCH465_KYR6E_T332U[2].honestNote) !== false) throw new Error('irwin-b465-female-balance-ksm-66-ashwagandha');
if (BATCH465_KYR6E_T332U[3].id !== 'irwin-b465-immuno-shield-elderberry' || BATCH465_KYR6E_T332U[3].verdict !== 'avoid' || Boolean(BATCH465_KYR6E_T332U[3].honestNote) !== false) throw new Error('irwin-b465-immuno-shield-elderberry');
if (BATCH465_KYR6E_T332U[4].id !== 'irwin-b465-vision-sharp-eye-health' || BATCH465_KYR6E_T332U[4].verdict !== 'avoid' || Boolean(BATCH465_KYR6E_T332U[4].honestNote) !== false) throw new Error('irwin-b465-vision-sharp-eye-health');
if (BATCH465_KYR6E_T332U[5].id !== 'irwin-b465-pure-defense-mushroom-8' || BATCH465_KYR6E_T332U[5].verdict !== 'avoid' || Boolean(BATCH465_KYR6E_T332U[5].honestNote) !== false) throw new Error('irwin-b465-pure-defense-mushroom-8');
if (BATCH465_KYR6E_T332U.some((row) => row.barcode)) throw new Error('t332u upc');
