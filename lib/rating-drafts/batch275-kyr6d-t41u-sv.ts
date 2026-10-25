// DRAFT / not verified / batch 275 KYR6-d (t41u Spring Valley packs 121-150).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Not in this file:
// - NAC 1,000 mg, 100 capsules. Rice Fiber has no lock. Held.
// - Apple Cider Vinegar gummies, 60. No Supplement Facts image. Held.
// - Odor-controlled garlic, 120 softgels. Garlic Oil Extract has no lock. Held.
// - Papaya enzyme chewables, 180. Inactive line is not on any image. Pickup only, still for sale. Held.
// - Prenatal mini softgels, 120. Blurry panel. Inactive line is not fully legible. Held.
// - Probiotic acidophilus, 30 caplets. No Supplement Facts image. Held.
// - Quercetin with zinc, 60 capsules. Rice Fiber has no lock. Held.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';

const METH = {
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (purified water).',
  mixedToco: 'Methodology §5 Cleared (mixed tocopherols / natural mixed tocopherols).',
  tocopherol: 'Methodology §5 Cleared (dl-alpha tocopherol — mixed-tocopherols row; t118u).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  riceHull: 'Methodology §5 Cleared (Rice Hull — rice hulls / rice hull concentrate family; t119u / t120u).',
  ricePowder: 'Methodology §5 Cleared (rice powder — exact token; t132u). Not rice flour.',
  riceBran: 'Methodology §5 Cleared (rice bran — rice bran plant-fiber family; t111u).',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup / tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin.',
  organicSugar:
    'Methodology §5 Cleared (organic sugar — cane sugar row; t90u). Bare sugar stays Caution.',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose — t118u). Not bare sugar.',
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup — food syrup).',
  glucose:
    'Methodology §5 Caution (bare glucose — Sept 22, 2026). Distinct from glucose syrup. Does not count toward the t137u stack.',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  organicFlavors:
    'Methodology §5 Caution (Organic Flavors — unnamed natural flavor family; t100u). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity). Counts toward the t137u stack.',
  namedFruit:
    'Methodology §5 Cleared (Natural Lemon Flavor / Natural Mixed Berry Flavor — named Natural [fruit] Flavor; t132u).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose sodium — cellulose disintegrant).',
  peg:
    'Methodology §5 Limited (polyethylene glycol — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum). Not carboxymethylcellulose calcium.',
  polydextrose:
    'Methodology §5 Limited (polydextrose — starch-based bulk sweetener). Counts toward the t137u stack.',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol (oral coating) — Sept 15, 2026). Distinct from topical PVA.',
  talc: 'Methodology §5 High (talc — oral swallow).',
  tio2: 'Methodology §5 High (titanium dioxide (color), including capsule coloring agent).',
  ascorbic:
    'Methodology §5 Cleared (ascorbic acid as a preservative — ascorbate family).',
  sodiumAscorbate: 'Methodology §5 Cleared (sodium ascorbate — ascorbate family).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  gumArabic: 'Methodology §5 Cleared (gum arabic — acacia family).',
  carnauba: 'Methodology §5 Cleared (carnauba wax, including organic — founder lock t133u).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  sunflowerGummy:
    'Methodology §5 High (organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  soybeanFill:
    'Methodology §5 Cleared (soybean oil as softgel fill, including highly refined — not the gummy seed-oil High).',
  riceBranOil:
    'Methodology §5 Cleared (rice bran oil as softgel fill — not the gummy rice-bran-oil High).',
  fractionated:
    'Methodology §5 Cleared (fractionated coconut oil in a gummy — named coconut oil; not the seed-oil gummy flag).',
  mct:
    'Methodology §5 Limited (medium chain triglycerides with no plant named — founder lock t132u). Counts toward the t137u stack.',
  maltitolSyrup:
    'Methodology §5 Caution (maltitol syrup — maltitol solution; Sept 26, 2026). Distinct from Limited maltitol powder. Does not count toward the t137u stack.',
  maltitol:
    'Methodology §5 Limited (maltitol powder — sugar-alcohol row). Distinct from Caution maltitol syrup.',
  isomalt:
    'Methodology §5 Caution (isomalt — founder restamp Sept 25, 2026; was Limited). Does not count toward the t137u stack.',
  xylitol:
    'Methodology §5 Caution (xylitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  annatto:
    'Methodology §5 Caution (Annatto Extract (color) — annatto row; t107u). Does not count toward the t137u stack.',
  starch: 'Methodology §5 Cleared (bare starch as a filler — named simple starch).',
  cornStarch: 'Methodology §5 Cleared (cornstarch — corn starch named simple starch; t118u).',
  tartaric: 'Methodology §5 Cleared (DL-tartaric acid — organic acid; t132u).',
  cholineBit:
    'Methodology §5 Cleared (choline bitartrate — exact INCI, Sept 15, 2026). Distinct from choline chloride.',
  greenTea:
    'Methodology §5 Caution (green tea extract as an other ingredient — t75u / t77u). Not the Supplement Facts active. Does not count toward the t137u stack.',
  rosemary:
    'Methodology §5 Caution (Rosemary Extract (A Natural Preservative) / bare Rosemary Extract — oral inactive). Does not count toward the t137u stack.',
  lecithin: 'Methodology §5 Cleared (lecithin / soy lecithin).',
  beeswax: 'Methodology §5 Cleared (beeswax / yellow beeswax).',
  fdc: 'Methodology §5 High (FD&C dye / aluminum lake — synthetic dye family).',
  betaCarotene:
    'Methodology §5 Caution (beta-carotene as a color). Does not count toward the t137u stack.',
  gammaCd: 'Methodology §5 Cleared (gamma-cyclodextrin — Sept 15, 2026).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P121 =
  'Walmart panel image. The other-ingredients line is a separate image. 30 servings of 2 gummies. Page text omits choline bitartrate. The separate image was graded. t41u house-brand single source.';
const P124 =
  'Walmart panel image. 50 servings of 2 capsules. Page text says rice hulls and rice extract. The panel says rice hull and rice bran. The facility line is a disclosure. Echinacea is the active and is not graded. t41u house-brand single source.';
const P125 =
  'Walmart panel image. Low resolution and legible. 30 servings of 2 gummies. Page text omits sodium citrate. The panel was graded. Melatonin is the active and is not graded. t41u house-brand single source.';
const P126 =
  'Walmart panel image. Low resolution and legible. The panel prints 60 servings of 2 gummies. The opened listing and the bottle are 180. Page order differs. The panel was graded. Melatonin is the active and is not graded. t41u house-brand single source.';
const P128 =
  'Walmart panel image. 90 servings of 2 softgels. Page text splits EPA 1,290 mg and DHA 620 mg as ethyl esters. The panel says EPA plus DHA 1,480 mg and additional omega-3s 520 mg. The panel actives were used. Fish oil is the active and is not graded. Contains fish is a disclosure. t41u house-brand single source.';
const P129 =
  'Walmart panel image. New Look. 30 servings of 2 gummies. Page text matches the panel. Algal oil is the active and is not graded. t41u house-brand single source.';
const P130 =
  'Walmart panel image. 75 servings of 2 gummies. Page text says natural flavors. The panel says organic flavors. The panel was graded. Biotin is the active and is not graded. t41u house-brand single source.';
const P131 =
  'Walmart panel image. 45 servings of 2 gummies. Page order differs. The panel was graded. Biotin is the active and is not graded. t41u house-brand single source.';
const P133 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 500 caplets. Potassium gluconate is the active and is not graded. t41u house-brand single source.';
const P134 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 250 caplets. Page text moves stearic acid out of the less-than-2% group. The panel was graded. Potassium gluconate is the active and is not graded. t41u house-brand single source.';
const P136 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 100 tablets. Page ingredients omit several panel items. The panel was graded. Vitamins and minerals on the facts are not graded. t41u house-brand single source.';
const P137 =
  'Walmart panel image. 120 servings of 1 softgel. Page ingredients are blank. Fish oil is the active and is not graded. Contains fish is a disclosure. t41u house-brand single source.';
const P138 =
  'Walmart panel image. 180 servings of 1 softgel. Page text reorders the fish species and drops bovine. The panel was graded. Contains fish is a disclosure. t41u house-brand single source.';
const P139 =
  'Walmart panel image. New Look. 60 servings of 2 mini softgels. The single is in stock. The 3-pack on the page is out of stock and is not a row. Page inactive order differs. The panel was graded. Contains fish is a disclosure. t41u house-brand single source.';
const P141 =
  'Walmart panel image. New Look. About 66 servings of 3 tablets. Calcium and phosphorus are on the facts, so dicalcium phosphate is not graded. Enzymes, ox bile, and the probiotic are the actives and are not graded. t41u house-brand single source.';
const P142 =
  'Walmart panel image. 30 servings of 2 gummies. Page text adds water. The panel was graded. Inulin and the probiotic are on the facts and are not graded. t41u house-brand single source.';
const P144 =
  'Walmart panel image. New Look. 60 servings of 2 softgels. The title 600 mg is per softgel. The panel is 1,200 mg per 2 softgels. Contains soy is a disclosure. Calcium and vitamin D are the actives and are not graded. t41u house-brand single source.';
const P145 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 60 softgels. Page text drops the less-than-2% split and the soy line. The panel was graded. CoQ10 is the active and is not graded. Contains soy is a disclosure. t41u house-brand single source.';
const P146 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 30 softgels. Page text drops the less-than-2% split and the soy line. The panel was graded. CoQ10 is the active and is not graded. Contains soy is a disclosure. t41u house-brand single source.';
const P147 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 100 capsules. Magnesium citrate is the active and is not graded. t41u house-brand single source.';
const P148 =
  'Walmart panel image. 60 servings of 2 capsules. Red yeast rice is the active and is not graded. t41u house-brand single source.';
const P149 =
  'Walmart panel image. 30 servings of 2 capsules. Red yeast rice is the active and is not graded. t41u house-brand single source.';
const P150 =
  'Walmart panel image. Low resolution, legible after upscale. 30 servings of 2 gummies. Every inactive token on that line was read. GutGard, the botanical blend, and L-glutamine are the actives and are not graded. t41u house-brand single source.';

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  const audience = partial.audience ?? ADULT;
  const minAge = partial.minAge ?? (audience === 'kids' ? undefined : 18);
  const next: RatingRecord = {
    ...partial,
    brand: BRAND,
    audience,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Walmart'],
    barcode: '',
  };
  if (minAge === undefined) delete next.minAge;
  else next.minAge = minAge;
  return finish(next);
}

function fishOilFlags(panel: string, water: string, toco: string): IngredientFlag[] {
  return [
    flag(panel, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
    flag(panel, 'Glycerin', 'cleared', 'glycerin'),
    flag(panel, water, 'cleared', 'water'),
    flag(panel, 'Natural Lemon Flavor', 'cleared', 'namedFruit'),
    flag(panel, toco, 'cleared', 'mixedToco'),
  ];
}

function potassiumFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Magnesium Stearate', 'cleared', 'magStearate'),
    flag(panel, 'Stearic Acid', 'cleared', 'stearic'),
  ];
}

function redYeastFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Gelatin', 'cleared', 'gelatin'),
    flag(panel, 'Rice Powder', 'cleared', 'ricePowder'),
    flag(panel, 'Silica', 'limited', 'silica'),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
  ];
}

export const BATCH275_KYR6D_T41U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b275-multi-gummy-60',
    productName: 'Spring Valley Multivitamin Vegetarian Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-multi-gummy-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Multivitamin and mineral blend', strength: '2 gummies' }],
    inactiveIngredients: [
      flag(P121, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P121, 'Sucrose', 'cleared', 'sucrose'),
      flag(P121, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P121, 'Choline Bitartrate', 'cleared', 'cholineBit'),
      flag(P121, 'Citric Acid', 'cleared', 'citric'),
      flag(P121, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P121, 'Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P121, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P121, 'Pectin', 'cleared', 'pectin'),
      flag(P121, 'Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P121, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. The other-ingredients line is a separate image. 30 servings of 2 gummies. Same inactive line as the 120-count and the 240-count. Counted Limited token: natural flavors. Honest note names fractionated coconut oil. Page text omits choline bitartrate. Not the kids multis. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-echinacea-760-100',
    productName: 'Spring Valley Organic Echinacea 760 mg (100 capsules)',
    category: 'Immune Support',
    formulaId: 'springvalley-b275-echinacea-760-100',
    form: 'capsule',
    activeIngredients: [{ name: 'Organic Echinacea (aerial part)', strength: '760 mg per 2 capsules' }],
    inactiveIngredients: [
      flag(P124, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P124, 'Rice Hull', 'cleared', 'riceHull'),
      flag(P124, 'Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 50 servings of 2 capsules. Page text says rice hulls and rice extract. The panel says rice hull and rice bran. Counted Limited tokens: none. Honest note names rice hull. The facility line is a disclosure. Not the echinacea liquid. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-melatonin-gummy-10-60',
    productName: 'Spring Valley Melatonin Gummies 10 mg, Blueberry (60 gummies)',
    category: 'Sleep',
    formulaId: 'springvalley-b275-melatonin-gummy-10-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Melatonin', strength: '10 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P125, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P125, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P125, 'Pectin', 'cleared', 'pectin'),
      flag(P125, 'Citric Acid', 'cleared', 'citric'),
      flag(P125, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P125, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P125, 'Organic Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P125, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P125, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. Low resolution and legible. 30 servings of 2 gummies. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. Page text omits sodium citrate. No honest note. Not the 5 mg strawberry gummies. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-melatonin-gummy-5-180',
    productName: 'Spring Valley Melatonin Gummies 5 mg, Strawberry (180 gummies)',
    category: 'Sleep',
    formulaId: 'springvalley-b275-melatonin-gummy-5-180',
    form: 'gummy',
    activeIngredients: [{ name: 'Melatonin', strength: '5 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P126, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P126, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P126, 'Citric Acid', 'cleared', 'citric'),
      flag(P126, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P126, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P126, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P126, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P126, 'Pectin', 'cleared', 'pectin'),
      flag(P126, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. Low resolution and legible. The opened listing is 180 gummies. The panel prints 60 servings of 2 gummies, which is 120. The row keeps the opened 180-count. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. No honest note. Not the 60-count 5 mg gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-omega3-fish-2000-180',
    productName: 'Spring Valley Omega-3 Fish Oil 2,000 mg (180 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-omega3-fish-2000-180',
    form: 'softgel',
    activeIngredients: [
      { name: 'Omega-3 fatty acids', strength: '2,000 mg per 2 softgels' },
      { name: 'EPA and DHA', strength: '1,480 mg per 2 softgels' },
    ],
    inactiveIngredients: fishOilFlags(P128, 'Purified Water', 'Natural Mixed Tocopherols'),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. 90 servings of 2 softgels. Page text says EPA 1,290 mg and DHA 620 mg as ethyl esters. The panel says EPA plus DHA 1,480 mg and additional omega-3s 520 mg. The panel actives were used. Counted Limited tokens: none. No honest note. Not the 120-count 2,000 mg fish oil. Contains fish is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-omega3-gummy-500-60',
    productName: 'Spring Valley Omega-3 Algal Oil Gummies 500 mg (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-omega3-gummy-500-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Algal oil (omega-3 fatty acids)', strength: '500 mg omega-3 per 2 gummies' }],
    inactiveIngredients: [
      flag(P129, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(P129, 'Sugar', 'moderate', 'sugar'),
      flag(P129, 'Bovine Gelatin', 'cleared', 'gelatin'),
      flag(P129, 'Citric Acid', 'cleared', 'citric'),
      flag(P129, 'Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P129, 'Ascorbic Acid (for Freshness)', 'cleared', 'ascorbic'),
      flag(P129, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P129, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P129, 'Green Tea Extract (for Freshness)', 'moderate', 'greenTea'),
      flag(P129, 'Mixed Tocopherols (for Freshness)', 'cleared', 'mixedToco'),
      flag(P129, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P129, 'Pectin', 'cleared', 'pectin'),
      flag(P129, 'Rosemary Extract (for Freshness)', 'moderate', 'rosemary'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. 30 servings of 2 gummies. Counted Limited token: natural flavors. Sugar, annatto extract (color), green tea extract, and rosemary extract are Caution and do not stack. Honest note names fractionated coconut oil. Algal oil is the active and is not graded. Not the 2,000 mg algal softgels. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-biotin-gummy-5000-150',
    productName: 'Spring Valley Organic Biotin Gummies 5,000 mcg, Blueberry (150 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-biotin-gummy-5000-150',
    form: 'gummy',
    activeIngredients: [{ name: 'Biotin', strength: '5,000 mcg per 2 gummies' }],
    inactiveIngredients: [
      flag(P130, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P130, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P130, 'Citric Acid', 'cleared', 'citric'),
      flag(P130, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P130, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P130, 'Organic Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P130, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P130, 'Pectin', 'cleared', 'pectin'),
      flag(P130, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 75 servings of 2 gummies. Avoid from organic sunflower oil in the gummy. Organic flavors are Caution and do not stack. Counted Limited tokens: none. Page text says natural flavors. The panel says organic flavors. No honest note. Not the 10,000 mcg gummy and not the fast-dissolve biotin. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-biotin-gummy-10000-90',
    productName: 'Spring Valley Organic Biotin Gummies 10,000 mcg, Cherry (90 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-biotin-gummy-10000-90',
    form: 'gummy',
    activeIngredients: [{ name: 'Biotin', strength: '10,000 mcg per 2 gummies' }],
    inactiveIngredients: [
      flag(P131, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P131, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P131, 'Citric Acid', 'cleared', 'citric'),
      flag(P131, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P131, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P131, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P131, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P131, 'Pectin', 'cleared', 'pectin'),
      flag(P131, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 45 servings of 2 gummies. Avoid from organic sunflower oil in the gummy. Organic flavors are Caution and do not stack. Counted Limited tokens: none. No honest note. Not the 5,000 mcg blueberry gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-potassium-99-500',
    productName: 'Spring Valley Potassium 99 mg (500 caplets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-potassium-99-500',
    form: 'tablet',
    activeIngredients: [{ name: 'Potassium (as potassium gluconate)', strength: '99 mg per caplet' }],
    inactiveIngredients: potassiumFlags(P133),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 500 count. Counted Limited tokens: none. No honest note. Potassium gluconate is the active and is not graded. Not the 250-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-potassium-99-250',
    productName: 'Spring Valley Potassium 99 mg (250 caplets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-potassium-99-250',
    form: 'tablet',
    activeIngredients: [{ name: 'Potassium (as potassium gluconate)', strength: '99 mg per caplet' }],
    inactiveIngredients: potassiumFlags(P134),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 250 count. Page text moves stearic acid out of the less-than-2% group. Same items. Counted Limited tokens: none. No honest note. Not the 500-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-prenatal-100',
    productName: 'Spring Valley Prenatal Multivitamin (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-prenatal-100',
    form: 'tablet',
    activeIngredients: [{ name: 'Prenatal multivitamin and mineral blend', strength: '1 tablet' }],
    inactiveIngredients: [
      flag(P136, 'Starch', 'cleared', 'starch'),
      flag(P136, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P136, 'Beta-Carotene', 'moderate', 'betaCarotene'),
      flag(P136, 'Carboxymethylcellulose Sodium', 'cleared', 'cmc'),
      flag(P136, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P136, 'DL-Tartaric Acid', 'cleared', 'tartaric'),
      flag(P136, 'dl-Alpha Tocopherol', 'cleared', 'tocopherol'),
      flag(P136, 'FD&C Blue No. 2 Lake', 'high', 'fdc'),
      flag(P136, 'FD&C Red No. 40 Lake', 'high', 'fdc'),
      flag(P136, 'FD&C Yellow No. 6 Lake', 'high', 'fdc'),
      flag(P136, 'Gelatin', 'cleared', 'gelatin'),
      flag(P136, 'Glucose', 'moderate', 'glucose'),
      flag(P136, 'Gum Arabic', 'cleared', 'gumArabic'),
      flag(P136, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P136, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P136, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P136, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P136, 'Polydextrose', 'limited', 'polydextrose'),
      flag(P136, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P136, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P136, 'Silica', 'limited', 'silica'),
      flag(P136, 'Sodium Ascorbate', 'cleared', 'sodiumAscorbate'),
      flag(P136, 'Sucrose', 'cleared', 'sucrose'),
      flag(P136, 'Talc', 'high', 'talc'),
      flag(P136, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. Servings are not on the panel. This listing is 100 count. Avoid from FD&C Blue No. 2 Lake, FD&C Red No. 40 Lake, FD&C Yellow No. 6 Lake, talc, and titanium dioxide (color). Counted Limited tokens: maltodextrin, medium chain triglycerides, polydextrose, and polyethylene glycol. The dyes set Avoid, so there is no 3+ stack note. Glucose and beta-carotene are Caution and do not stack. Silica is the 0-pt cap and does not stack. Page text says vitamin A is 100% beta-carotene. The panel does not name a vitamin A source, so beta-carotene on the ingredient line was graded. Calcium carbonate, the vitamin salts, ferrous fumarate, zinc oxide, and tricalcium phosphate are the actives and are not graded. No honest note. Not the prenatal iron 250. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-fish-oil-1000-120',
    productName: 'Spring Valley Proactive Support Fish Oil 1,000 mg (120 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-fish-oil-1000-120',
    form: 'softgel',
    activeIngredients: [{ name: 'Omega-3 fatty acids (as ethyl esters)', strength: '1,000 mg per softgel' }],
    inactiveIngredients: fishOilFlags(P137, 'Water', 'Mixed Natural Tocopherols'),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 120 servings of 1 softgel. Page ingredients are blank. Counted Limited tokens: none. No honest note. Not the 60-count 1,000 mg row and not the 180-count. Contains fish is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-fish-oil-1000-180',
    productName: 'Spring Valley Proactive Support Fish Oil 1,000 mg (180 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-fish-oil-1000-180',
    form: 'softgel',
    activeIngredients: [{ name: 'Omega-3 fatty acids (as ethyl esters)', strength: '1,000 mg per softgel' }],
    inactiveIngredients: fishOilFlags(P138, 'Water', 'Mixed Natural Tocopherols'),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 180 servings of 1 softgel. Page text reorders the fish species. The panel was graded. Counted Limited tokens: none. No honest note. Not the 120-count. Contains fish is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-fish-oil-mini-1000-120',
    productName: 'Spring Valley Proactive Support Fish Oil Mini 1,000 mg (120 mini softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-fish-oil-mini-1000-120',
    form: 'softgel',
    activeIngredients: [{ name: 'Omega-3 fatty acids (as ethyl esters)', strength: '1,000 mg per 2 mini softgels' }],
    inactiveIngredients: fishOilFlags(P139, 'Water', 'Mixed Natural Tocopherols'),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. 60 servings of 2 mini softgels. The single is in stock. The 3-pack is out of stock and is not a row. Counted Limited tokens: none. No honest note. Not the regular 120-count softgel. Contains fish is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-probiotic-enzyme-200',
    productName: 'Spring Valley Probiotic Multi-Enzyme Digestive Formula (200 tablets)',
    category: 'Digestive',
    formulaId: 'springvalley-b275-probiotic-enzyme-200',
    form: 'tablet',
    activeIngredients: [
      { name: 'Digestive enzyme blend', strength: '3 tablets' },
      { name: 'Lactobacillus acidophilus La-14', strength: '500 million CFU per 3 tablets' },
    ],
    inactiveIngredients: [
      flag(P141, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P141, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P141, 'Glucose', 'moderate', 'glucose'),
      flag(P141, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P141, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P141, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P141, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. About 66 servings of 3 tablets. Counted Limited token: maltodextrin. Glucose is Caution and does not stack. Silica is the 0-pt cap and does not stack. No honest note. Calcium and phosphorus are on the facts, so dicalcium phosphate is not graded. Enzymes, ox bile, and the probiotic are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-probiotic-inulin-gummy-60',
    productName: 'Spring Valley Probiotic with Inulin Gummies 3 Billion CFU (60 gummies)',
    category: 'Digestive',
    formulaId: 'springvalley-b275-probiotic-inulin-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Inulin (as chicory root fiber)', strength: '2.5 g per 2 gummies' },
      { name: 'Bacillus coagulans MTCC 5856', strength: '3 billion CFU per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P142, 'Sugar', 'moderate', 'sugar'),
      flag(P142, 'Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P142, 'Black Carrot Juice Extract (Color)', 'cleared', 'juice'),
      flag(P142, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P142, 'Citric Acid', 'cleared', 'citric'),
      flag(P142, 'Cornstarch', 'cleared', 'cornStarch'),
      flag(P142, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P142, 'Genipap Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P142, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P142, 'Pectin', 'cleared', 'pectin'),
      flag(P142, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P142, 'Watermelon Juice Concentrate (Color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 30 servings of 2 gummies. Counted Limited token: natural flavors. Sugar and annatto extract (color) are Caution and do not stack. Honest note names fractionated coconut oil. Page text adds water. The panel was graded. Inulin and the probiotic are on the facts and are not graded. Not the multi plus probiotic and fiber gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-calcium-600-120',
    productName: 'Spring Valley Rapid-Release Calcium 600 mg (120 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-calcium-600-120',
    form: 'softgel',
    activeIngredients: [
      { name: 'Calcium (as calcium carbonate)', strength: '1,200 mg per 2 softgels' },
      { name: 'Vitamin D (as cholecalciferol)', strength: '25 mcg (1,000 IU) per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(P144, 'Soybean Oil (Highly Refined)', 'cleared', 'soybeanFill'),
      flag(P144, 'Gelatin', 'cleared', 'gelatin'),
      flag(P144, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P144, 'Soy Lecithin', 'cleared', 'lecithin'),
      flag(P144, 'Beeswax', 'cleared', 'beeswax'),
      flag(P144, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. 60 servings of 2 softgels. The title says 600 mg. The panel is 1,200 mg calcium per 2 softgels. Avoid from titanium dioxide (color). Counted Limited tokens: none. Honest note names soybean oil. Contains soy is a disclosure. Not the calcium 600 tablets. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-coq10-300-60',
    productName: 'Spring Valley Rapid-Release CoQ10 300 mg (60 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-coq10-300-60',
    form: 'softgel',
    activeIngredients: [{ name: 'Coenzyme Q10', strength: '300 mg per softgel' }],
    inactiveIngredients: [
      flag(P145, 'Soybean Oil (Highly Refined)', 'cleared', 'soybeanFill'),
      flag(P145, 'Gelatin', 'cleared', 'gelatin'),
      flag(P145, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P145, 'Silica', 'limited', 'silica'),
      flag(P145, 'Soy Lecithin', 'cleared', 'lecithin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. Servings are not on the panel. This listing is 60 count. Silica is the 0-pt cap. Counted Limited tokens: none. Honest note names soybean oil. Contains soy is a disclosure. Not the CoQ10 gummies and not the 400 mg softgel. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-coq10-400-30',
    productName: 'Spring Valley Rapid-Release CoQ10 400 mg (30 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-coq10-400-30',
    form: 'softgel',
    activeIngredients: [{ name: 'Coenzyme Q10', strength: '400 mg per softgel' }],
    inactiveIngredients: [
      flag(P146, 'Rice Bran Oil', 'cleared', 'riceBranOil'),
      flag(P146, 'Gelatin', 'cleared', 'gelatin'),
      flag(P146, 'Glycerin', 'cleared', 'glycerin'),
      flag(P146, 'Silica', 'limited', 'silica'),
      flag(P146, 'Soy Lecithin', 'cleared', 'lecithin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. Servings are not on the panel. This listing is 30 count. Silica is the 0-pt cap. Rice bran oil is softgel fill. Counted Limited tokens: none. No honest note. Contains soy is a disclosure. Not the 300 mg softgel. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-mag-citrate-100-100',
    productName: 'Spring Valley Rapid-Release Magnesium Citrate 100 mg (100 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-mag-citrate-100-100',
    form: 'capsule',
    activeIngredients: [{ name: 'Magnesium (as magnesium citrate)', strength: '100 mg per capsule' }],
    inactiveIngredients: [
      flag(P147, 'Gelatin', 'cleared', 'gelatin'),
      flag(P147, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P147, 'Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 100 count. Counted Limited tokens: none. No honest note. Not the 165 mg gummies and not the 250 mg tablets. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-red-yeast-600-120',
    productName: 'Spring Valley Red Yeast Rice 600 mg (120 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-red-yeast-600-120',
    form: 'capsule',
    activeIngredients: [{ name: 'Red yeast rice powder', strength: '1,200 mg per 2 capsules' }],
    inactiveIngredients: redYeastFlags(P148),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 60 servings of 2 capsules. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Red yeast rice is the active and is not graded. Not the 60-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-red-yeast-600-60',
    productName: 'Spring Valley Red Yeast Rice 600 mg (60 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b275-red-yeast-600-60',
    form: 'capsule',
    activeIngredients: [{ name: 'Red yeast rice powder', strength: '1,200 mg per 2 capsules' }],
    inactiveIngredients: redYeastFlags(P149),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. 30 servings of 2 capsules. Same formula as the 120-count. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b275-reflux-gummy-60',
    productName: 'Spring Valley Reflux Guard with Peppermint, Mixed Berry (60 gummies)',
    category: 'Digestive',
    formulaId: 'springvalley-b275-reflux-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'GutGard licorice (root) extract', strength: '150 mg per 2 gummies' },
      { name: 'Botanical digestive blend', strength: '100 mg per 2 gummies' },
      { name: 'L-Glutamine', strength: '40 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P150, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P150, 'Isomalt', 'moderate', 'isomalt'),
      flag(P150, 'Maltitol', 'limited', 'maltitol'),
      flag(P150, 'Xylitol', 'moderate', 'xylitol'),
      flag(P150, 'Pectin', 'cleared', 'pectin'),
      flag(P150, 'Black/Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P150, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P150, 'Citric Acid', 'cleared', 'citric'),
      flag(P150, 'Gamma-Cyclodextrin', 'cleared', 'gammaCd'),
      flag(P150, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P150, 'Natural Mixed Berry Flavor', 'cleared', 'namedFruit'),
      flag(P150, 'Purified Water', 'cleared', 'water'),
      flag(P150, 'Silica', 'limited', 'silica'),
      flag(P150, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 121–150. Walmart panel image is the single source. The image is 250 px and was legible after upscale. 30 servings of 2 gummies. Counted Limited token: medium chain triglycerides. Maltitol powder is the Limited sugar-alcohol row. The name maltitol does not count toward the stack. Maltitol syrup, isomalt, and xylitol are Caution and do not stack. Silica is the 0-pt cap and does not stack. Natural mixed berry flavor is the named fruit-flavor row. No honest note. Licorice, chamomile, ginger, marshmallow, peppermint, and L-glutamine are the actives and are not graded. The sugar-alcohol line on the facts is the nutrition amount, not a separate ingredient. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH275_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; counted: string }> = {
  'springvalley-b275-multi-gummy-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b275-echinacea-760-100': { verdict: 'clean', counted: '' },
  'springvalley-b275-melatonin-gummy-10-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b275-melatonin-gummy-5-180': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b275-omega3-fish-2000-180': { verdict: 'clean', counted: '' },
  'springvalley-b275-omega3-gummy-500-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b275-biotin-gummy-5000-150': { verdict: 'avoid', counted: '' },
  'springvalley-b275-biotin-gummy-10000-90': { verdict: 'avoid', counted: '' },
  'springvalley-b275-potassium-99-500': { verdict: 'clean', counted: '' },
  'springvalley-b275-potassium-99-250': { verdict: 'clean', counted: '' },
  'springvalley-b275-prenatal-100': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Medium Chain Triglycerides|Polydextrose|Polyethylene Glycol',
  },
  'springvalley-b275-fish-oil-1000-120': { verdict: 'clean', counted: '' },
  'springvalley-b275-fish-oil-1000-180': { verdict: 'clean', counted: '' },
  'springvalley-b275-fish-oil-mini-1000-120': { verdict: 'clean', counted: '' },
  'springvalley-b275-probiotic-enzyme-200': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b275-probiotic-inulin-gummy-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b275-calcium-600-120': { verdict: 'avoid', counted: '' },
  'springvalley-b275-coq10-300-60': { verdict: 'caution', counted: '' },
  'springvalley-b275-coq10-400-30': { verdict: 'caution', counted: '' },
  'springvalley-b275-mag-citrate-100-100': { verdict: 'clean', counted: '' },
  'springvalley-b275-red-yeast-600-120': { verdict: 'caution', counted: '' },
  'springvalley-b275-red-yeast-600-60': { verdict: 'caution', counted: '' },
  'springvalley-b275-reflux-gummy-60': { verdict: 'caution', counted: 'Medium Chain Triglycerides' },
};

const NOTE_IDS = new Set([
  'springvalley-b275-multi-gummy-60',
  'springvalley-b275-echinacea-760-100',
  'springvalley-b275-omega3-gummy-500-60',
  'springvalley-b275-probiotic-inulin-gummy-60',
  'springvalley-b275-calcium-600-120',
  'springvalley-b275-coq10-300-60',
]);

if (ROWS.length !== 23) throw new Error(`batch275 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch275 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch275 brand ${record.id}`);
  if (record.barcode) throw new Error(`batch275 upc ${record.id}`);
  if (record.audience !== 'adult' || record.minAge !== 18) throw new Error(`batch275 adult ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch275 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch275 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch275 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (stackNote) throw new Error(`batch275 unexpected stack note ${record.id} ${stackNote}`);
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch275 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch275 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch275 pending ${ingredient.name}`);
    }
  }
}
