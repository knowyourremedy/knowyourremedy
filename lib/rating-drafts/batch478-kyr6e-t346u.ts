// DRAFT / not verified / batch 478 KYR6-e (t346u).
// 21st Century rows whose DSLD panels are now locked.
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
import { t346uResolve } from '../scan-preview/t346uLocks';
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

function locked(name: string, form: string, productName: string): IngredientFlag {
  const useForm = /fish body oil/i.test(name) && /\bfish oil\b/i.test(productName) && /\bsoftgel\b/i.test(form)
    ? `${form} base`
    : form;
  const hit = t346uResolve(name, useForm);
  const inner = asInner(name);
  const why = hit?.lock.why
    || t140uWhyForName(name)
    || t139uWhyForName(name, useForm)
    || t138uWhyForName(name)
    || t135uWhyForName(name, useForm)
    || t134uWhyForName(name)
    || t128uWhyForName(name)
    || t146uWhyForName(name)
    || cleanTokenWhyForName(name)
    || t139uWhyForName(bareName(name), useForm)
    || t140uWhyForName(bareName(name))
    || t146uWhyForName(bareName(name))
    || t140uWhyForName(inner)
    || t134uWhyForName(inner)
    || t138uWhyForName(inner)
    || t146uWhyForName(inner)
    || cleanTokenWhyForName(inner)
    || cleanTokenWhyForName(bareName(name))
    || t128uWhyForName(bareName(name));
  if (!hit || !why) throw new Error(`t346u unlocked ${name}`);
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
  const inactiveIngredients = names.map((ingredient) => locked(ingredient, form, name));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients);
  const record: RatingRecord = {
    id,
    productName: name,
    brand: '21st Century',
    category: 'Vitamins',
    formulaId: id,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['21st Century'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients,
    verdict: rollup.verdict,
    ...(barcode ? { barcode } : {}),
    sourcesGeneral: [
      barcode
        ? `https://www.21stcenturyvitamins.com/products/${handle} Brand page. DSLD label barcode ${barcode}. The check digit passes.`
        : `https://www.21stcenturyvitamins.com/products/${handle} Brand page. DSLD label. No sourced UPC.`,
    ],
  };
  if (rollup.cause === 'limited_stack') {
    record.honestNote = STACK_NOTE;
    record.founderHonestNote = STACK_NOTE;
  }
  return record;
}

export const BATCH478_KYR6E_T346U: RatingRecord[] = [
  row(
    'c21-b478-27531',
    '21st Century Calcium 600 +D3, 400 Tablets',
    'tablet',
    'calcium-600-plus-d3',
    '740985275313',
    [
      'Vitamin D3 (as Cholecalciferol)',
      'Calcium (as Calcium Carbonate)',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'FD&C Blue #2 Carmine',
      'FD&C Red #40',
      'FD&C Yellow #6',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Monoglycerides',
      'Diglycerides',
      'Polyethylene Glycol',
      'PVA Copolymer',
      'Polyvinyl Alcohol',
      'Stearic Acid',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b478-21177',
    '21st Century DHEA 25 mg, 90 Capsules',
    'capsule',
    'dhea-25mg-hormone-balance',
    '740985211779',
    [
      'Dehydroepiandrosterone, Pure',
      'Rice Bran',
      'Gelatin',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b478-21840',
    '21st Century Garlic Extract, 60 Tablets',
    'tablet',
    'garlic-extract',
    '740985218402',
    [
      'Calcium (as Dicalcium Phosphate)',
      'Allicin',
      'Cellulose',
      'Stearic Acid',
    ],
  ),
  row(
    'c21-b478-27291',
    '21st Century Glucosamine Chondroitin Advanced Plus 1500mg MSM, 120 Tablets',
    'tablet',
    'glucosamine-chondroitin-advanced-plus-1500mg-msm',
    '740985272916',
    [
      'Glucosamine HCl',
      'MSM',
      'Chondroitin Sulfate Sodium',
      'Chinese skullcap',
      'Black Catechu',
      'Maltodextrin',
      'Hyaluronic Acid (as Sodium Hyaluronate)',
      'Cellulose',
    ],
  ),
  row(
    'c21-b478-21434',
    '21st Century Kalos & Splendor Advanced Hair, Skin & Nails, 50 Tablets',
    'tablet',
    'hair-skin-nails-advanced',
    '740985214343',
    [
      'Vitamin A (as Vitamin A Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Choline (as Choline Bitartrate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Iron (as Ferrous Fumarate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Gluconate)',
      'Manganese (as Manganese Sulfate)',
      'Potassium (as Potassium Iodide, Potassium Sulfate)',
      'Betaine HCl',
      'Inositol',
      'PABA',
      'DNA',
      'RNA',
      'Tyrosine',
      'Cysteine Hydrochloride',
      'Glutamic Acid',
      'Lysine',
      'Leucine',
      'Aspartic Acid',
      'Isoleucine',
      'Valine',
      'Alanine',
      'Arginine',
      'Histidine',
      'Serine',
      'Threonine',
      'Glycine',
      'Ornithine Hydrochloride',
      'Brewers Yeast',
      'Soy Protein',
      'Horsetail',
      'Parsley',
      'Rose Hips',
      'Watercress',
      'Kelp',
      'Citrus Bioflavonoids',
      'Lecithin',
      'Rutin',
      'Cellulose',
      'Stearic Acid',
      'Silicon Dioxide',
      'Maltodextrin',
      'Croscarmellose Sodium',
    ],
  ),
  row(
    'c21-b478-27847',
    '21st Century Kalos & Splendor Hair, Skin & Nails Extra Strength, 90 Tablets',
    'tablet',
    'hair-skin-nails-extra-strength',
    '740985278475',
    [
      'Vitamin A (as Retinyl Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Thiamine (as Thiamine Hydrochloride)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin (as D-Biotin)',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Choline (as Choline Bitartrate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Gluconate)',
      'Manganese (as Manganese Gluconate)',
      'Para-Aminobenzoic Acid',
      'Inositol',
      'Citrus Bioflavonoid',
      'Rutin',
      'Horsetail, Powder',
      'Collagen (as Gelatin, Hydrolyzed)',
      'Cellulose',
      'Croscarmellose Sodium',
      'Maltodextrin',
      'Stearic Acid',
      'Silicon Dioxide',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polysorbate',
      'Polyvinyl Alcohol',
    ],
  ),
  row(
    'c21-b478-22361',
    '21st Century Herbal Slimming Tea Honey Lemon, 24 Tea Bags',
    'tea',
    'herbal-slimming-tea-honey-lemon',
    '740985223611',
    [
      'Senna',
      'Natural flavors',
      'Licorice',
      'Malva verticillata',
      'Eleuthero',
      'Benzyl Benzoate',
      'Butylated Hydroxytoluene',
    ],
  ),
  row(
    'c21-b478-22408',
    '21st Century Lutein 10 mg, 60 Tablets',
    'tablet',
    'lutein-10mg',
    '740985224083',
    [
      'Calcium (as Calcium Carbonate)',
      'Lutein',
      'Gum Arabic',
      'Maltodextrin',
      'Croscarmellose Sodium',
      'Artificial colors',
      'Dextrin',
      'Dextrose',
      'Hydroxypropyl Methylcellulose',
      'Magnesium Stearate',
      'Medium Chain Triglycerides',
      'PEG',
      'Polydextrose',
      'Silicon Dioxide',
      'Sodium Carboxymethycellulose',
      'Sodium Citrate',
      'Stearic Acid',
      'Titanium Dioxide',
      'Triacetin',
    ],
  ),
  row(
    'c21-b478-22658',
    '21st Century Mega Multi For Men, 90 Tablets',
    'tablet',
    'mega-multi-for-men',
    '740985226582',
    [
      'Vitamin A (as Betatene)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as D-Alpha-Tocopheryl Succinate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Choline (as Choline Bitartrate)',
      'Calcium (as Calcium Citrate, Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Selenium Yeast)',
      'Copper (as Copper Oxide)',
      'Manganese (as Manganese Gluconate)',
      'Chromium (as Chromium Picolinate)',
      'Silica (as Silicon Dioxide)',
      'Inositol',
      'Para-Aminobenzoic Acid',
      'Citrus Bioflavonoids Complex',
      'Damiana',
      'Korean Ginseng extract',
      'Oat Straw',
      'deodorized Garlic',
      'Oyster extract',
      'Saw Palmetto',
      'L-Cysteine Hydrochloride',
      'Nettle',
      'Pumpkin',
      'DL-Methionine',
      'Alpha-Lipoic Acid',
      'Lutein',
      'Lycopene',
      'Stearic Acid',
      'Maltodextrin',
      'Hydroxypropyl Methylcellulose',
      'Brewers Yeast',
      'Cellulose',
      'Gelatin',
      'Dicalcium Phosphate',
      'Ethylcellulose',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'natural Vanilla flavor',
      'PEG',
      'Polysorbate',
      'Polyvinyl alcohol',
    ],
  ),
  row(
    'c21-b478-22659',
    '21st Century Mega Multi For Women, 90 Tablets',
    'tablet',
    'mega-multi-for-women',
    '740985226599',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Palmitate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as D-Alpha-Tocopheryl Succinate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Choline (as Choline Bitartrate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Iron (as Iron Amino Acid Chelate)',
      'Iodine (as Kelp)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Selenium Amino Acid Chelate)',
      'Copper (as Copper Amino Acid Chelate)',
      'Manganese (as Manganese Amino Acid Chelate)',
      'Chromium (as Chromium Amino Acid Chelate)',
      'Molybdenum (as Molybdenum Amino Acid Chelate)',
      'Boron (as Boron Hydrolyzed Protein Chelate)',
      'Silica (as Silicon Dioxide)',
      'Inositol',
      'Para-Aminobenzoic Acid',
      'Citrus Bioflavonoids Complex',
      'Bee Pollen powder',
      'Royal Jelly',
      'Dong Quai',
      'Lutein',
      'Red Raspberry',
      'Cellulose',
      'Maltodextrin',
      'Stearic Acid',
      'Hydroxypropyl Methylcellulose',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'natural Vanilla flavor',
      'PEG',
      'Polysorbate',
      'Polyvinyl alcohol',
      'Silicon Dioxide',
      'Sodium Citrate',
    ],
  ),
  row(
    'c21-b478-28028',
    '21st Century Melatonin 10 mg - Extra Strength, 120 Tablets',
    'tablet',
    'melatonin-10mg',
    '740985280287',
    [
      'Calcium (as Calcium Carbonate)',
      'Melatonin',
      'Cellulose',
      'Maltodextrain',
      'Hydroxypropyl Methylcellulose',
      'Stearic Acid',
      'Magnesium Stearate',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b478-21168',
    '21st Century Norwegian Cod Liver Oil 400 mg, 110 Softgels',
    'softgel',
    'norwegian-cod-liver-oil-400mg',
    '740985211687',
    [
      'Vitamin A (as Cod Liver Oil)',
      'Vitamin D3 (as Cod Liver Oil)',
      'Eicosapentaenoic Acid (as Omega-3 Fatty Acids)',
      'Docosahexaenoic Acid (as Omega-3 Fatty Acids)',
      'Gelatin',
      'Glycerin',
      'Water, Purified',
    ],
  ),
  row(
    'c21-b478-27024',
    '21st Century Psyllium Fiber, 160 Capsules',
    'capsule',
    'psyllium-fiber',
    '740985270240',
    [
      'Soluble Fiber',
      'Iron',
      'Potassium',
      'Psyllium',
      'Gelatin',
    ],
  ),
  row(
    'c21-b478-22908',
    '21st Century Red Yeast Rice 600 mg, 150 Vegetarian Capsules',
    'capsule',
    'red-yeast-rice-600mg',
    '740985229088',
    [
      'Red Yeast Rice, Powder',
      'Cellulose',
      'Maltodextrin',
      'Magnesium Stearate',
      'Oat Fiber',
      'Rice Bran',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b478-27285',
    '21st Century Resveratrol Red Wine Extract, 90 Capsules',
    'capsule',
    'resveratrol-red-wine-extract',
    '740985272855',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Red Wine Extract (as Grape Skin Extract)',
      'Citrus Bioflavonoids (as Citrus sinensis)',
      'Grape Seed Extract (as Polyphenols)',
      'Polygonum cuspidatum',
      'Vitis vinifera',
      'Pomegranate Fruit Extract (as Ellagic Acid)',
      'Gelatin',
      'Oat Fiber',
      'Rice Bran',
      'Silicon Dioxide',
      'Magnesium Silicate',
      'Magnesium Stearate',
    ],
  ),
  row(
    'c21-b478-22390',
    '21st Century Sentry Senior Adults 50+, 125 Tablets',
    'tablet',
    'sentry-senior',
    '740985223901',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Sodium Molybdate)',
      'Chloride (as Potassium Chloride)',
      'Potassium (as Potassium Chloride)',
      'Lutein',
      'Lycopene',
      'Starch',
      'Cellulose',
      'Stearic Acid',
      'FD&C Blue #2 Carmine',
      'FD&C Red #40',
      'FD&C Yellow #6',
      'Butylated Hydroxytoluene',
      'Citric Acid',
      'Croscarmellose Sodium',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'Monoglycerides',
      'Diglycerides',
      'Polyethylene Glycol Copolymer',
      'Palmitoleic Acid Copolymer',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b478-22380',
    '21st Century Sentry Adults, 130 Tablets',
    'tablet',
    'sentry',
    '740985223802',
    [
      'Vitamin A (as Beta-Carotene, Vitamin A Acetate)',
      'Vitamin C (as Ascorbic Acid)',
      'Vitamin D3 (as Cholecalciferol)',
      'Vitamin E (as DL-Alpha-Tocopheryl Acetate)',
      'Vitamin K (as Phytonadione)',
      'Thiamine (as Thiamine Mononitrate, Vitamin B1)',
      'Riboflavin (as Vitamin B2)',
      'Niacin (as Niacinamide)',
      'Vitamin B6 (as Pyridoxine Hydrochloride)',
      'Folic Acid',
      'Vitamin B12 (as Cyanocobalamin)',
      'Biotin',
      'Pantothenic Acid (as D-Calcium Pantothenate)',
      'Calcium (as Calcium Carbonate, Dicalcium Phosphate)',
      'Iron (as Ferrous Fumarate)',
      'Phosphorus (as Dicalcium Phosphate)',
      'Iodine (as Potassium Iodide)',
      'Magnesium (as Magnesium Oxide)',
      'Zinc (as Zinc Oxide)',
      'Selenium (as Sodium Selenate)',
      'Copper (as Copper Sulfate)',
      'Manganese (as Manganese Sulfate)',
      'Chromium (as Chromium Picolinate)',
      'Molybdenum (as Sodium Molybdate)',
      'Chloride (as Potassium Chloride)',
      'Potassium (as Potassium Chloride)',
      'Cellulose',
      'Starch',
      'Stearic Acid',
      'Vegetable Oil',
      'Artificial color',
      'Croscarmellose Sodium',
      'Gelatin',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Maltodextrin',
      'Mono/Diglycerides',
      'PEG/PVA Copolymer',
      'Polyvinyl alcohol',
      'Silicon Dioxide',
      'Titanium Dioxide',
    ],
  ),
  row(
    'c21-b478-28086',
    '21st Century VitaJoy B-12 3000 mcg Gummies - Extra Strength, 90 Gummies',
    'gummy',
    'vitajoy-b-12-3000mcg-gummies',
    '740985280867',
    [
      'Vitamin B12 (as Cyanocobalamin)',
      'Sugar',
      'Corn Syrup',
      'Water',
      'Carnauba Wax',
      'Citric Acid',
      'Black Currant Concentrate',
      'Carrot Concentrate',
      'Natural Flavors',
      'Pectin',
      'Sodium Citrate',
      'Vegetable Oil',
    ],
  ),
  row(
    'c21-b478-28037',
    '21st Century VitaJoy Melatonin Gummies 10 mg - Extra Strength, 60 Gummies',
    'gummy',
    'vitajoy-melatonin-gummies-10mg',
    '740985280379',
    [
      'Melatonin',
      'Sugar',
      'Corn Syrup',
      'Water',
      'Carnauba Wax',
      'Citric Acid',
      'Vegetable and Fruit Juice',
      'Natural flavor',
      'Pectin',
      'Sodium Citrate',
      'Vegetable Oil',
    ],
  ),
  row(
    'c21-b478-22383',
    '21st Century Vitamin C 1000 mg with Rose Hips, 110 Tablets',
    'tablet',
    'vitamin-c-1000mg-with-rose-hips',
    '740985223833',
    [
      'Vitamin C (as Ascorbic Acid)',
      'Rose Hip',
      'Cellulose',
      'Stearic Acid',
      'Hydroxypropyl Methylcellulose',
      'Calcium Carbonate',
      'Croscarmellose Sodium',
      'Magnesium Silicate',
      'Magnesium Stearate',
      'Polyethylene Glycol',
      'Polysorbate',
      'Polyvinyl Alcohol',
      'Silicon Dioxide',
    ],
  ),
  row(
    'c21-b478-27505',
    '21st Century Advanced Probiotic, 60 Capsules',
    'capsule',
    'advanced-probiotic',
    '740985275054',
    [
      'Lactobacillus acidophilus',
      'Lactobacillus casei',
      'Lactobacillus rhamnosus',
      'Bifidobacterium longum',
      'Bifidobacterium animalis lactis',
      'Lactobacillus delbrueckii',
      'Maltodextrin',
      'Gelatin',
      'Inulin',
    ],
  ),
];

if (BATCH478_KYR6E_T346U[0].id !== 'c21-b478-27531' || BATCH478_KYR6E_T346U[0].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[0].honestNote) !== false || (BATCH478_KYR6E_T346U[0].barcode ?? '') !== '740985275313') throw new Error('c21-b478-27531');
if (BATCH478_KYR6E_T346U[1].id !== 'c21-b478-21177' || BATCH478_KYR6E_T346U[1].verdict !== 'clean' || Boolean(BATCH478_KYR6E_T346U[1].honestNote) !== false || (BATCH478_KYR6E_T346U[1].barcode ?? '') !== '740985211779') throw new Error('c21-b478-21177');
if (BATCH478_KYR6E_T346U[2].id !== 'c21-b478-21840' || BATCH478_KYR6E_T346U[2].verdict !== 'clean' || Boolean(BATCH478_KYR6E_T346U[2].honestNote) !== false || (BATCH478_KYR6E_T346U[2].barcode ?? '') !== '740985218402') throw new Error('c21-b478-21840');
if (BATCH478_KYR6E_T346U[3].id !== 'c21-b478-27291' || BATCH478_KYR6E_T346U[3].verdict !== 'caution' || Boolean(BATCH478_KYR6E_T346U[3].honestNote) !== false || (BATCH478_KYR6E_T346U[3].barcode ?? '') !== '740985272916') throw new Error('c21-b478-27291');
if (BATCH478_KYR6E_T346U[4].id !== 'c21-b478-21434' || BATCH478_KYR6E_T346U[4].verdict !== 'caution' || Boolean(BATCH478_KYR6E_T346U[4].honestNote) !== false || (BATCH478_KYR6E_T346U[4].barcode ?? '') !== '740985214343') throw new Error('c21-b478-21434');
if (BATCH478_KYR6E_T346U[5].id !== 'c21-b478-27847' || BATCH478_KYR6E_T346U[5].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[5].honestNote) !== false || (BATCH478_KYR6E_T346U[5].barcode ?? '') !== '740985278475') throw new Error('c21-b478-27847');
if (BATCH478_KYR6E_T346U[6].id !== 'c21-b478-22361' || BATCH478_KYR6E_T346U[6].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[6].honestNote) !== false || (BATCH478_KYR6E_T346U[6].barcode ?? '') !== '740985223611') throw new Error('c21-b478-22361');
if (BATCH478_KYR6E_T346U[7].id !== 'c21-b478-22408' || BATCH478_KYR6E_T346U[7].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[7].honestNote) !== false || (BATCH478_KYR6E_T346U[7].barcode ?? '') !== '740985224083') throw new Error('c21-b478-22408');
if (BATCH478_KYR6E_T346U[8].id !== 'c21-b478-22658' || BATCH478_KYR6E_T346U[8].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[8].honestNote) !== false || (BATCH478_KYR6E_T346U[8].barcode ?? '') !== '740985226582') throw new Error('c21-b478-22658');
if (BATCH478_KYR6E_T346U[9].id !== 'c21-b478-22659' || BATCH478_KYR6E_T346U[9].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[9].honestNote) !== false || (BATCH478_KYR6E_T346U[9].barcode ?? '') !== '740985226599') throw new Error('c21-b478-22659');
if (BATCH478_KYR6E_T346U[10].id !== 'c21-b478-28028' || BATCH478_KYR6E_T346U[10].verdict !== 'caution' || Boolean(BATCH478_KYR6E_T346U[10].honestNote) !== false || (BATCH478_KYR6E_T346U[10].barcode ?? '') !== '740985280287') throw new Error('c21-b478-28028');
if (BATCH478_KYR6E_T346U[11].id !== 'c21-b478-21168' || BATCH478_KYR6E_T346U[11].verdict !== 'clean' || Boolean(BATCH478_KYR6E_T346U[11].honestNote) !== false || (BATCH478_KYR6E_T346U[11].barcode ?? '') !== '740985211687') throw new Error('c21-b478-21168');
if (BATCH478_KYR6E_T346U[12].id !== 'c21-b478-27024' || BATCH478_KYR6E_T346U[12].verdict !== 'clean' || Boolean(BATCH478_KYR6E_T346U[12].honestNote) !== false || (BATCH478_KYR6E_T346U[12].barcode ?? '') !== '740985270240') throw new Error('c21-b478-27024');
if (BATCH478_KYR6E_T346U[13].id !== 'c21-b478-22908' || BATCH478_KYR6E_T346U[13].verdict !== 'caution' || Boolean(BATCH478_KYR6E_T346U[13].honestNote) !== false || (BATCH478_KYR6E_T346U[13].barcode ?? '') !== '740985229088') throw new Error('c21-b478-22908');
if (BATCH478_KYR6E_T346U[14].id !== 'c21-b478-27285' || BATCH478_KYR6E_T346U[14].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[14].honestNote) !== false || (BATCH478_KYR6E_T346U[14].barcode ?? '') !== '740985272855') throw new Error('c21-b478-27285');
if (BATCH478_KYR6E_T346U[15].id !== 'c21-b478-22390' || BATCH478_KYR6E_T346U[15].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[15].honestNote) !== false || (BATCH478_KYR6E_T346U[15].barcode ?? '') !== '740985223901') throw new Error('c21-b478-22390');
if (BATCH478_KYR6E_T346U[16].id !== 'c21-b478-22380' || BATCH478_KYR6E_T346U[16].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[16].honestNote) !== false || (BATCH478_KYR6E_T346U[16].barcode ?? '') !== '740985223802') throw new Error('c21-b478-22380');
if (BATCH478_KYR6E_T346U[17].id !== 'c21-b478-28086' || BATCH478_KYR6E_T346U[17].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[17].honestNote) !== false || (BATCH478_KYR6E_T346U[17].barcode ?? '') !== '740985280867') throw new Error('c21-b478-28086');
if (BATCH478_KYR6E_T346U[18].id !== 'c21-b478-28037' || BATCH478_KYR6E_T346U[18].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[18].honestNote) !== false || (BATCH478_KYR6E_T346U[18].barcode ?? '') !== '740985280379') throw new Error('c21-b478-28037');
if (BATCH478_KYR6E_T346U[19].id !== 'c21-b478-22383' || BATCH478_KYR6E_T346U[19].verdict !== 'avoid' || Boolean(BATCH478_KYR6E_T346U[19].honestNote) !== false || (BATCH478_KYR6E_T346U[19].barcode ?? '') !== '740985223833') throw new Error('c21-b478-22383');
if (BATCH478_KYR6E_T346U[20].id !== 'c21-b478-27505' || BATCH478_KYR6E_T346U[20].verdict !== 'caution' || Boolean(BATCH478_KYR6E_T346U[20].honestNote) !== false || (BATCH478_KYR6E_T346U[20].barcode ?? '') !== '740985275054') throw new Error('c21-b478-27505');
