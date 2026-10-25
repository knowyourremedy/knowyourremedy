// DRAFT / not verified / batch 272 KYR6-d (t41u Spring Valley batch 3, packs 31-60).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Held, not in this file:
// - Extra Strength Melatonin 10 mg, 120 vegetarian tablets. The panel image shows actives only.
// - Extra Strength Vitamin B12 cherry 5,000 mcg fast-dissolve. Bottle count is not on the panel (60 and 300 both exist).
// - Vitamin D3 5,000 IU value-size softgels. Bottle count is not on the panel.
// - Melatonin 10 mg fast-dissolve and melatonin 3 mg fast-dissolve. Artificial Flavor and Menthol are unlocked.

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
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup — food syrup).',
  caneSugar: 'Methodology §5 Cleared (cane sugar — food sugar). Not bare sugar.',
  organicSugar:
    'Methodology §5 Cleared (organic sugar — cane sugar row; t90u). Bare sugar stays Caution.',
  riceBranOilGummy:
    'Methodology §5 High (rice bran oil in a gummy — same form call as sunflower oil in a gummy; Oct 15, 2026). Softgel fill stays Cleared.',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  carnauba: 'Methodology §5 Cleared (carnauba wax, including organic — founder lock t133u).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity). Counts toward the t137u stack.',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — flavor family row). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  sunflowerLecithin: 'Methodology §5 Cleared (sunflower lecithin).',
  vegetableOilGummy:
    'Methodology §5 High (vegetable oil in a gummy, including vegetable oil (palm) — seed/industrial oils in gummies).',
  sunflowerGummy:
    'Methodology §5 High (organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  sunflowerSoftgel:
    'Methodology §5 Cleared (sunflower oil / sunflower seed oil as softgel fill — non-gummy fill Cleared; gummy sunflower stays High).',
  riceFlour:
    'Methodology §5 Caution (rice flour — distinct from Cleared rice hull and rice bran). Does not count toward the t137u stack.',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (purified water).',
  annatto:
    'Methodology §5 Caution (Annatto Seed Extract (color) / organic annatto extract (color) — annatto row; t107u). Does not count toward the t137u stack.',
  organicCane:
    'Methodology §5 Cleared (organic cane sugar — cane sugar row). Not bare sugar.',
  malic: 'Methodology §5 Cleared (malic acid / L-malic acid — organic acid).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  rebA:
    'Methodology §5 Limited (Rebaudioside A printed without organic or extracted — founder lock t16u). Counts toward the t137u stack. Organic Rebaudioside A stays Cleared.',
  namedFruitFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u). Not the Limited natural flavors mixture.',
  mixedToco: 'Methodology §5 Cleared (mixed tocopherols).',
  cellulosePlant:
    'Methodology §5 Cleared (Cellulose (Plant Origin) — cellulose-family; founder lock t83u).',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose sodium — cellulose disintegrant). Croscarmellose without sodium maps here (t83u).',
  calciumCarbonate:
    'Methodology §5 Cleared (calcium carbonate as a filler). Not the mineral active.',
  sorbate:
    'Methodology §5 Caution (potassium sorbate — synthetic preservative row with sodium benzoate). Does not count toward the t137u stack.',
  benzoate:
    'Methodology §5 Caution (sodium benzoate — synthetic preservative). Does not count toward the t137u stack.',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup / tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin.',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  potatoStarch: 'Methodology §5 Cleared (potato starch — named simple starch).',
  gellan: 'Methodology §5 Cleared (gellan gum — xanthan / guar / pectin family).',
  riceHull: 'Methodology §5 Cleared (Rice Hull — rice hulls / rice hull concentrate family; t119u / t120u).',
  riceBran: 'Methodology §5 Cleared (rice bran — rice bran plant-fiber family; t111u).',
  agar: 'Methodology §5 Cleared (agar — plant gum with xanthan / guar / acacia / pectin).',
  locust: 'Methodology §5 Cleared (locust bean gum — plant gum).',
  tapiocaStarch:
    'Methodology §5 Cleared (tapioca starch — t122u). Not Limited tapioca powder and not organic tapioca starch.',
  organicFlavors:
    'Methodology §5 Caution (Organic Flavors — unnamed natural flavor family; t100u). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  hydroxypropylStarch:
    'Methodology §5 Limited (hydroxypropyl starch — founder lock t130u). Counts toward the t137u stack.',
  carrageenan:
    'Methodology §5 Limited (Carrageenan — Sept 28, 2026). Counts toward the t137u stack.',
  beeswax: 'Methodology §5 Cleared (yellow beeswax / beeswax).',
  ferric:
    'Methodology §5 Caution (ferric oxide / iron oxide as color — Sept 15, 2026). Does not count toward the t137u stack.',
  sorbitol:
    'Methodology §5 Caution (sorbitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  mannitol:
    'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  crospovidone: 'Methodology §5 Cleared (crospovidone — povidone family).',
  hvo:
    'Methodology §5 High (hydrogenated vegetable oil, including hydrogenated vegetable oil (cottonseed) — Oct 15, 2026). The panel says hydrogenated. It does not say partial or fully.',
  natArtFlavor:
    'Methodology §5 Limited (natural and artificial flavor — singular; t118u). Same Limited natural-flavors opacity row. Counts toward the t137u stack.',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  soybeanSoftgel:
    'Methodology §5 Cleared (soybean oil as softgel fill — non-gummy fill Cleared; gummy / lozenge soybean oil stays High).',
  cornSoftgel:
    'Methodology §5 Cleared (corn oil as softgel fill — non-gummy fill Cleared; gummy corn oil stays High).',
  turmericColor:
    'Methodology §5 Cleared (Turmeric Extract Color / organic turmeric extract (color) — Turmeric (Color); t100u / t75u).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color.',
  starch: 'Methodology §5 Cleared (starch — bare starch as a filler; t35u).',
  gumArabic: 'Methodology §5 Cleared (gum arabic / acacia).',
  calciumStearate: 'Methodology §5 Cleared (calcium stearate — stearate-family lubricant).',
  mct:
    'Methodology §5 Limited (medium chain triglycerides in a gummy with no plant named — founder lock t132u). Counts toward the t137u stack.',
  sodiumAscorbate: 'Methodology §5 Cleared (sodium ascorbate — ascorbate family).',
  inulin: 'Methodology §5 Cleared (inulin as fiber — Sept 14, 2026).',
  tio2: 'Methodology §5 High (titanium dioxide (color), including capsule coloring agent).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P32 =
  'Walmart panel image. Page text lists sucrose, water, lactic acid, fractionated coconut oil, and beeswax. The panel was graded. t41u house-brand single source.';
const P33 =
  'Walmart panel image. New Look. Page ingredients section is blank. Single selected. t41u house-brand single source.';
const P34 =
  'Walmart panel image. Page Inactive spells Silicone Dioxide. The panel says Silicon Dioxide. t41u house-brand single source.';
const P35 = 'Walmart panel image. Total Count 120. t41u house-brand single source.';
const P36 =
  'Walmart panel image. Page ingredients match the panel. Gum arabic is the fiber active and is not graded. t41u house-brand single source.';
const P37 =
  'Walmart ip/3585059228 single on the 3-pack family page. Panel image. New Look. Contains fish is a disclosure. t41u house-brand single source.';
const P38 =
  'Walmart panel image. Total Count 180. New Look. No out-of-stock notice. Sold by Walmart.com. Contains fish is a disclosure. t41u house-brand single source.';
const P39 =
  'Walmart panel image. Page text says Vegetable Cellulose. The panel says Cellulose (Plant Origin). Walmart title for this listing is 50 count. t41u house-brand single source.';
const P40 = 'Walmart panel image. About 30 servings of 2 mL. t41u house-brand single source.';
const P41 =
  'Walmart panel image. Total Count 60. Not the 120-count row. Maltodextrin inside the elderberry complex is not graded. t41u house-brand single source.';
const P42 =
  'Walmart panel image. New Look. Page Ingredients mixes actives into the list. The panel other-ingredients line was graded. Inulin on the facts is an active and is not graded. t41u house-brand single source.';
const P43 =
  'Walmart panel image. Single 60-count on the family page. Page text says Rice Hulls and Rice Extract. The panel says Rice Hull and Rice Bran. t41u house-brand single source.';
const P44 =
  'Walmart panel image. New Look. Page text lists magnesium with the same other-ingredients set. t41u house-brand single source.';
const P45 =
  'Walmart panel image. The other-ingredients line is carousel image 2, a panel image, not page text. Count 120. t41u house-brand single source.';
const P47 = 'Walmart panel image. 45 servings of 2 vegetarian softgels. t41u house-brand single source.';
const P48 = 'Walmart panel image. 59 servings of 1 mL. t41u house-brand single source.';
const P50 =
  'Walmart panel image. New Look. Total Count 100. Shipping is in stock. Page text says Natural Flavors and is cut off. The panel says Organic Flavors. t41u house-brand single source.';
const P51 = 'Walmart panel image. Page ingredients match the panel. 60 servings of 2 gummies. t41u house-brand single source.';
const P52 =
  'Walmart panel image. Total Count 100 selected. The 400 and 450 options on this page are out of stock and are not this row. Not the 250-count row. t41u house-brand single source.';
const P53 = 'Walmart panel image. New Look. 30 servings of 2 gummies. t41u house-brand single source.';
const P54 =
  'Walmart panel image. New Look. Page text is an older formula and was not graded. The panel prints Rebaudioside A (from stevia). That printing is not organic and does not say extracted and purified, so it is the t16u bare Rebaudioside A Limited row. Walmart single on the 3-pack family page is 90 count. t41u house-brand single source.';
const P56 =
  'Walmart panel image. New Look. Not the 60-count row. Page Ingredients omits titanium dioxide. The panel was graded. t41u house-brand single source.';
const P57 =
  'Walmart panel image. New Look. The panel crop does not print servings per container. This orange chewable (vitamin C 250 mg, zinc 50 mg) is the Walmart 150-count listing. t41u house-brand single source.';
const P58 =
  'Walmart panel image, URL id 35912858. Mixed Berry, 45 count. Two page ingredient lists disagree with the panel and were not graded. The panel was graded. t41u house-brand single source.';

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'brand' | 'audience' | 'minAge' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  return finish({
    brand: BRAND,
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Walmart'],
    barcode: '',
    ...partial,
  });
}

export const BATCH272_KYR6D_T41U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b272-collagen-peptides-20',
    productName: 'Spring Valley Collagen Peptides, Unflavored, 10 g (20 servings)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-collagen-peptides-20',
    form: 'powder',
    activeIngredients: [
      { name: 'Hydrolyzed Bovine Collagen Peptides (Type I and III)', strength: '10 g per scoop' },
      { name: 'Calories', strength: '35 per scoop' },
      { name: 'Protein', strength: '9 g per scoop' },
      { name: 'Sodium', strength: '40 mg per scoop' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 3. Walmart panel is the single source. Low stock with Add to cart still counts as for sale. The panel says Other ingredients: None. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-coq10-gummy-60',
    productName: 'Spring Valley CoQ10 200 mg Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-coq10-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Coenzyme Q10', strength: '200 mg per 2 gummies' },
      { name: 'Calories', strength: '25 per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P32, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(P32, 'Cane Sugar', 'cleared', 'caneSugar'),
      flag(P32, 'Rice Bran Oil', 'high', 'riceBranOilGummy'),
      flag(P32, 'Gelatin', 'cleared', 'gelatin'),
      flag(P32, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P32, 'Citric Acid', 'cleared', 'citric'),
      flag(P32, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P32, 'Pectin', 'cleared', 'pectin'),
      flag(P32, 'Sunflower Lecithin', 'cleared', 'sunflowerLecithin'),
      flag(P32, 'Vegetable Oil (Palm)', 'high', 'vegetableOilGummy'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 30 servings of 2 gummies. Page text lists a different formula (sucrose, water, lactic acid, fractionated coconut oil, beeswax, coconut). The panel was graded. CoQ10 is the active and is not graded. Avoid from rice bran oil and vegetable oil (palm) in the gummy. Counted Limited token: natural flavors. That is one, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-coq10-gummy-100',
    productName: 'Spring Valley CoQ10 200 mg Gummies (100 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-coq10-gummy-100',
    form: 'gummy',
    activeIngredients: [
      { name: 'Coenzyme Q10', strength: '200 mg per 2 gummies' },
      { name: 'Calories', strength: '25 per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P33, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(P33, 'Cane Sugar', 'cleared', 'caneSugar'),
      flag(P33, 'Rice Bran Oil', 'high', 'riceBranOilGummy'),
      flag(P33, 'Gelatin', 'cleared', 'gelatin'),
      flag(P33, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P33, 'Citric Acid', 'cleared', 'citric'),
      flag(P33, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P33, 'Pectin', 'cleared', 'pectin'),
      flag(P33, 'Sunflower Lecithin', 'cleared', 'sunflowerLecithin'),
      flag(P33, 'Vegetable Oil (Palm)', 'high', 'vegetableOilGummy'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 50 servings of 2 gummies. New Look. Page ingredients are blank. Same panel formula as the 60-count. Avoid from rice bran oil and vegetable oil (palm) in the gummy. Counted Limited token: natural flavors. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-d-mannose-120',
    productName: 'Spring Valley D-Mannose, 1,500 mg (120 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-d-mannose-120',
    form: 'capsule',
    activeIngredients: [{ name: 'D-Mannose', strength: '1,500 mg per 3 capsules' }],
    inactiveIngredients: [
      flag(P34, 'Hypromellose (cellulose capsule)', 'cleared', 'hpmc'),
      flag(P34, 'Rice Flour', 'moderate', 'riceFlour'),
      flag(P34, 'Stearic Acid (vegetable source)', 'cleared', 'stearic'),
      flag(P34, 'Magnesium Stearate (vegetable source)', 'cleared', 'magStearate'),
      flag(P34, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 40 servings of 3 capsules. Page Inactive spells Silicone Dioxide. The panel says Silicon Dioxide. D-mannose is the active and is not graded. Rice flour is Caution and does not stack. Silicon dioxide is the 0-pt cap and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-d3-k2-5000-120',
    productName: 'Spring Valley Vitamin D3 5,000 IU plus Vitamin K2 (120 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-d3-k2-5000-120',
    form: 'softgel',
    activeIngredients: [
      { name: 'Vitamin D (cholecalciferol)', strength: '125 mcg (5,000 IU) per softgel' },
      { name: 'Vitamin K2 (MenaQ7)', strength: '100 mcg per softgel' },
    ],
    inactiveIngredients: [
      flag(P35, 'Sunflower Oil', 'cleared', 'sunflowerSoftgel'),
      flag(P35, 'Gelatin', 'cleared', 'gelatin'),
      flag(P35, 'Glycerin', 'cleared', 'glycerin'),
      flag(P35, 'Purified Water', 'cleared', 'water'),
      flag(P35, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. Total Count 120. Cholecalciferol and menaquinone-7 are the actives and are not graded. Annatto seed extract (color) is Caution and does not stack. Sunflower oil is Cleared softgel fill. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-fiber-electrolyte-30',
    productName: 'Spring Valley Fiber Electrolyte Powder (30 servings)',
    category: 'Digestive',
    formulaId: 'springvalley-b272-fiber-electrolyte-30',
    form: 'powder',
    activeIngredients: [
      { name: 'Fibregum Gum Arabic (acacia senegal)', strength: '4 g per scoop' },
      { name: 'Niacin', strength: '7.5 mg per scoop' },
      { name: 'Magnesium (citrate)', strength: '75 mg per scoop' },
      { name: 'Sodium (chloride)', strength: '75 mg per scoop' },
      { name: 'Potassium (chloride)', strength: '100 mg per scoop' },
    ],
    inactiveIngredients: [
      flag(P36, 'Organic Cane Sugar', 'cleared', 'organicCane'),
      flag(P36, 'L-Malic Acid', 'cleared', 'malic'),
      flag(P36, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P36, 'Rebaudioside A', 'limited', 'rebA'),
      flag(P36, 'Natural Flavor', 'moderate', 'natFlavor'),
      flag(P36, 'Citric Acid', 'cleared', 'citric'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 30 scoops. Gum arabic is the fiber active on the facts and is not graded. Niacin and the minerals are actives and are not graded. Counted Limited tokens: maltodextrin and rebaudioside A. That is two, so this is not a 3+ stack. Natural flavor singular is Caution and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-fish-oil-500-60',
    productName: 'Spring Valley Fish Oil, 500 mg Omega-3 (60 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-fish-oil-500-60',
    form: 'softgel',
    activeIngredients: [
      { name: 'Omega-3 Fatty Acids (from fish oil)', strength: '500 mg per softgel' },
      { name: 'EPA and DHA', strength: '415 mg per softgel' },
    ],
    inactiveIngredients: [
      flag(P37, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
      flag(P37, 'Glycerin', 'cleared', 'glycerin'),
      flag(P37, 'Purified Water', 'cleared', 'water'),
      flag(P37, 'Natural Lemon Flavor', 'cleared', 'namedFruitFlavor'),
      flag(P37, 'Natural Mixed Tocopherols', 'cleared', 'mixedToco'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. Single selected on the 3-pack family page. Fish oil is the active and is not graded. Contains fish is a disclosure, not a token. Natural lemon flavor is the named Natural [fruit] Flavor Cleared row. Counted Limited tokens: none. No honest note. Not the 1,000 mg 300-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-fish-oil-500-180',
    productName: 'Spring Valley Fish Oil, 500 mg Omega-3 (180 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-fish-oil-500-180',
    form: 'softgel',
    activeIngredients: [
      { name: 'Omega-3 Fatty Acids (from fish oil)', strength: '500 mg per softgel' },
      { name: 'EPA and DHA', strength: '415 mg per softgel' },
    ],
    inactiveIngredients: [
      flag(P38, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
      flag(P38, 'Glycerin', 'cleared', 'glycerin'),
      flag(P38, 'Purified Water', 'cleared', 'water'),
      flag(P38, 'Natural Lemon Flavor', 'cleared', 'namedFruitFlavor'),
      flag(P38, 'Natural Mixed Tocopherols', 'cleared', 'mixedToco'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. Total Count 180. No out-of-stock notice. Sold by Walmart.com. Same panel formula as the 60-count. Fish oil is the active and is not graded. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-dhea-50',
    productName: 'Spring Valley DHEA, 50 mg (50 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-dhea-50',
    form: 'tablet',
    activeIngredients: [{ name: 'DHEA (dehydroepiandrosterone)', strength: '50 mg per tablet' }],
    inactiveIngredients: [
      flag(P39, 'Calcium Carbonate', 'cleared', 'calciumCarbonate'),
      flag(P39, 'Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'),
      flag(P39, 'Croscarmellose', 'cleared', 'croscarmellose'),
      flag(P39, 'Silica', 'limited', 'silica'),
      flag(P39, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(P39, 'Vegetable Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. The panel crop does not print servings per container. This DHEA 50 mg listing is the Walmart 50-count. Page text says Vegetable Cellulose. The panel says Cellulose (Plant Origin). DHEA is the active and is not graded. Calcium carbonate is the filler. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-echinacea-liquid',
    productName: 'Spring Valley Echinacea Liquid Extract, 960 mg (about 30 servings)',
    category: 'Herbs',
    formulaId: 'springvalley-b272-echinacea-liquid',
    form: 'liquid',
    activeIngredients: [
      {
        name: 'Echinacea (Echinacea purpurea) (root)',
        strength: '960 mg per 2 mL (from 576 mg of a 1.67:1 extract)',
      },
    ],
    inactiveIngredients: [
      flag(P40, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P40, 'Purified Water', 'cleared', 'water'),
      flag(P40, 'Potassium Sorbate', 'moderate', 'sorbate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. About 30 servings of 2 mL. Not the echinacea goldenseal 75-capsule row. Echinacea is the active and is not graded. Potassium sorbate is Caution and does not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-elderberry-gummy-60',
    productName: 'Spring Valley Elderberry Gummies, 50 mg (60 gummies)',
    category: 'Immune Support',
    formulaId: 'springvalley-b272-elderberry-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Elderberry Complex', strength: '50 mg per gummy' },
      { name: 'Vitamin C (as ascorbic acid)', strength: '45 mg per gummy' },
      { name: 'Zinc (as zinc citrate)', strength: '3.8 mg per gummy' },
    ],
    inactiveIngredients: [
      flag(P41, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P41, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P41, 'Pectin', 'cleared', 'pectin'),
      flag(P41, 'Citric Acid', 'cleared', 'citric'),
      flag(P41, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P41, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P41, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P41, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. Not springvalley-b270-elderberry-gummy-120. Maltodextrin inside the elderberry complex is not graded. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. That is one, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-probiotic-50b-30',
    productName: 'Spring Valley Probiotic, 50 Billion CFU (30 capsules)',
    category: 'Digestive',
    formulaId: 'springvalley-b272-probiotic-50b-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'Probiotic Blend', strength: '437 mg (50 billion CFU) per capsule' },
      { name: 'Vitamin C (as ascorbic acid)', strength: '15 mg per capsule' },
      { name: 'Inulin (chicory root extract)', strength: '50 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P42, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(P42, 'Hypromellose', 'cleared', 'hpmc'),
      flag(P42, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P42, 'Gellan Gum', 'cleared', 'gellan'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. New Look. Page Ingredients mixes the probiotic blend, inulin, and vitamin C into the list. Those are on the facts and are not graded. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-ashwagandha-1300-60',
    productName: 'Spring Valley Ashwagandha, 1,300 mg with KSM-66 (60 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b272-ashwagandha-1300-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Ashwagandha Root', strength: '700 mg per 2 capsules' },
      { name: 'KSM-66 Ashwagandha Extract', strength: '600 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag(P43, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P43, 'Rice Flour', 'moderate', 'riceFlour'),
      flag(P43, 'Rice Hull', 'cleared', 'riceHull'),
      flag(P43, 'Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 30 servings of 2 capsules. Not springvalley-b271-ashwagandha-500-60. Page text says Rice Hulls and Rice Extract. The panel says Rice Hull and Rice Bran. The facility allergen line is not a token. Rice flour is Caution and does not stack. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-magnesium-gummy-60',
    productName: 'Spring Valley Magnesium Citrate 250 mg Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-magnesium-gummy-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Magnesium (as magnesium citrate)', strength: '250 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P44, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P44, 'Sugar', 'moderate', 'sugar'),
      flag(P44, 'Agar', 'cleared', 'agar'),
      flag(P44, 'Citric Acid', 'cleared', 'citric'),
      flag(P44, 'Locust Bean Gum', 'cleared', 'locust'),
      flag(P44, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P44, 'Organic Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P44, 'Tapioca Starch', 'cleared', 'tapiocaStarch'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 30 servings of 2 gummies. New Look. Magnesium is the active and is not graded. Sugar and organic annatto extract (color) are Caution and do not stack. Counted Limited token: natural flavors. That is one, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-magnesium-gummy-120',
    productName: 'Spring Valley Magnesium Citrate 250 mg Gummies (120 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-magnesium-gummy-120',
    form: 'gummy',
    activeIngredients: [{ name: 'Magnesium (as magnesium citrate)', strength: '250 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P45, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P45, 'Sugar', 'moderate', 'sugar'),
      flag(P45, 'Agar', 'cleared', 'agar'),
      flag(P45, 'Citric Acid', 'cleared', 'citric'),
      flag(P45, 'Locust Bean Gum', 'cleared', 'locust'),
      flag(P45, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P45, 'Organic Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P45, 'Tapioca Starch', 'cleared', 'tapiocaStarch'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 60 servings of 2 gummies. The other-ingredients line is a separate carousel panel image, not page text. Same formula as the 60-count. Counted Limited token: natural flavors. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-turmeric-bioperine-90',
    productName: 'Spring Valley Turmeric with BioPerine (90 vegetarian softgels)',
    category: 'Herbs',
    formulaId: 'springvalley-b272-turmeric-bioperine-90',
    form: 'softgel',
    activeIngredients: [
      { name: 'Turmeric (Curcuma longa) Rhizome Powder', strength: '800 mg per 2 softgels' },
      { name: 'Turmeric Rhizome Extract', strength: '200 mg per 2 softgels' },
      { name: 'BioPerine Black Pepper (fruit) Extract', strength: '5 mg per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(P47, 'Sunflower Seed Oil', 'cleared', 'sunflowerSoftgel'),
      flag(P47, 'Hydroxypropyl Starch', 'limited', 'hydroxypropylStarch'),
      flag(P47, 'Glycerin', 'cleared', 'glycerin'),
      flag(P47, 'Carrageenan', 'limited', 'carrageenan'),
      flag(P47, 'Beeswax', 'cleared', 'beeswax'),
      flag(P47, 'Purified Water', 'cleared', 'water'),
      flag(P47, 'Red Ferric Oxide (Color)', 'moderate', 'ferric'),
      flag(P47, 'Sunflower Lecithin', 'cleared', 'sunflowerLecithin'),
      flag(P47, 'Yellow Ferric Oxide (Color)', 'moderate', 'ferric'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 45 servings of 2 vegetarian softgels. Turmeric powder, turmeric extract, and BioPerine are the actives and are not graded. Counted Limited tokens: hydroxypropyl starch and carrageenan. That is two, so this is not a 3+ stack. Red and yellow ferric oxide are Caution and do not stack. Sunflower seed oil is Cleared softgel fill. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-b12-liquid-5000',
    productName: 'Spring Valley Vitamin B12 Liquid, 5,000 mcg (59 servings)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-b12-liquid-5000',
    form: 'liquid',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '5,000 mcg per 1 mL' }],
    inactiveIngredients: [
      flag(P48, 'Purified Water', 'cleared', 'water'),
      flag(P48, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P48, 'Citric Acid', 'cleared', 'citric'),
      flag(P48, 'Natural Berry Flavor', 'cleared', 'namedFruitFlavor'),
      flag(P48, 'Sorbitol', 'moderate', 'sorbitol'),
      flag(P48, 'Sodium Benzoate', 'moderate', 'benzoate'),
      flag(P48, 'Potassium Sorbate', 'moderate', 'sorbate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 59 servings of 1 mL. Vitamin B12 is the active and is not graded. Natural berry flavor is the named Natural [fruit] Flavor Cleared row. Sorbitol, sodium benzoate, and potassium sorbate are Caution and do not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-b12-gummy-3000-100',
    productName: 'Spring Valley Vitamin B12 3,000 mcg Gummies (100 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-b12-gummy-3000-100',
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin B12 (as methylcobalamin and hydroxocobalamin)', strength: '3,000 mcg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P50, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P50, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P50, 'Citric Acid', 'cleared', 'citric'),
      flag(P50, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P50, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P50, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P50, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P50, 'Pectin', 'cleared', 'pectin'),
      flag(P50, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. Total Count 100. Shipping is in stock. Local delivery out of stock does not block the row. Page text says Natural Flavors and drops Wax. The panel says Organic Flavors. Avoid from organic sunflower oil in the gummy. Organic flavors are Caution and do not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-c-gummy-500-120',
    productName: 'Spring Valley Vitamin C 500 mg Gummies (120 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-c-gummy-500-120',
    form: 'gummy',
    activeIngredients: [{ name: 'Vitamin C', strength: '500 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P51, 'Sugar', 'moderate', 'sugar'),
      flag(P51, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(P51, 'Purified Water', 'cleared', 'water'),
      flag(P51, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(P51, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P51, 'Citric Acid', 'cleared', 'citric'),
      flag(P51, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P51, 'Natural Orange Flavor', 'cleared', 'namedFruitFlavor'),
      flag(P51, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P51, 'Pectin', 'cleared', 'pectin'),
      flag(P51, 'Sodium Ascorbate', 'cleared', 'sodiumAscorbate'),
      flag(P51, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 60 servings of 2 gummies. Ascorbic acid is the vitamin C active and is not graded. Avoid from organic sunflower oil in the gummy. Counted Limited token: medium chain triglycerides. That is one, so this is not a 3+ stack. Sugar, annatto, and natural orange flavor do not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-d3-5000-100',
    productName: 'Spring Valley Vitamin D3, 5,000 IU (100 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-d3-5000-100',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin D (as D3 cholecalciferol)', strength: '125 mcg (5,000 IU) per softgel' }],
    inactiveIngredients: [
      flag(P52, 'Soybean Oil', 'cleared', 'soybeanSoftgel'),
      flag(P52, 'Gelatin', 'cleared', 'gelatin'),
      flag(P52, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P52, 'Corn Oil', 'cleared', 'cornSoftgel'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. Total Count 100. The 400 and 450 options on this page are out of stock and are not this row. Not springvalley-b236-d3-5000iu-250. Vitamin D is the active and is not graded. Soybean oil and corn oil are Cleared softgel fill. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-d3-gummy-5000-60',
    productName: 'Spring Valley Vitamin D3 5,000 IU Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-d3-gummy-5000-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Vitamin D (as cholecalciferol)', strength: '125 mcg (5,000 IU) per 2 gummies' }],
    inactiveIngredients: [
      flag(P53, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P53, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P53, 'Organic Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P53, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P53, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P53, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P53, 'Organic Lemon Juice Concentrate', 'cleared', 'juice'),
      flag(P53, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P53, 'Organic Turmeric Extract (Color)', 'cleared', 'turmericColor'),
      flag(P53, 'Pectin', 'cleared', 'pectin'),
      flag(P53, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. 30 servings of 2 gummies. New Look. Vitamin D is the active and is not graded. Avoid from organic sunflower oil in the gummy. Organic annatto and organic flavors are Caution and do not stack. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-d3-fastdissolve-5000-90',
    productName: 'Spring Valley Vitamin D3 5,000 IU Fast-Dissolve, Strawberry (90 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-d3-fastdissolve-5000-90',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin D (cholecalciferol)', strength: '125 mcg (5,000 IU) per tablet' }],
    inactiveIngredients: [
      flag(P54, 'Mannitol', 'moderate', 'mannitol'),
      flag(P54, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P54, 'Starch', 'cleared', 'starch'),
      flag(P54, 'Gum Arabic', 'cleared', 'gumArabic'),
      flag(P54, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P54, 'Hydrogenated Vegetable Oil (Cottonseed)', 'high', 'hvo'),
      flag(P54, 'Sugar', 'moderate', 'sugar'),
      flag(P54, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P54, 'Calcium Stearate', 'cleared', 'calciumStearate'),
      flag(P54, 'Natural Strawberry Flavor', 'cleared', 'namedFruitFlavor'),
      flag(P54, 'Rebaudioside A', 'limited', 'rebA'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. New Look. Page text is an older formula (vegetable oil powder, medium chain triglycerides, natural flavors, silica, stevia, dl-alpha tocopherol) and was not graded. The panel prints Rebaudioside A (from stevia). It does not say organic and it does not say extracted and purified, so it is the t16u Limited row. The panel crop does not print servings per container. This strawberry fast-dissolve is the Walmart 90-count single on the 3-pack family page. Cholecalciferol is the active and is not graded. Avoid from hydrogenated vegetable oil (cottonseed). Counted Limited tokens: maltodextrin and rebaudioside A. That is two, so this is not a 3+ stack. Mannitol, sugar, and natural strawberry flavor do not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-probiotic-10b-30',
    productName: 'Spring Valley Probiotic, 10 Billion CFU (30 capsules)',
    category: 'Digestive',
    formulaId: 'springvalley-b272-probiotic-10b-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'Probiotic Blend', strength: '119 mg (10 billion CFU) per capsule' },
      { name: 'Vitamin C', strength: '15 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P56, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(P56, 'Hypromellose', 'cleared', 'hpmc'),
      flag(P56, 'Inulin', 'cleared', 'inulin'),
      flag(P56, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P56, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P56, 'Titanium Dioxide (Capsule Coloring Agent)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. New Look. Not springvalley-b236-probiotic-10b-60. Page Ingredients omits titanium dioxide. The panel includes it and was graded. Avoid from titanium dioxide. Counted Limited token: maltodextrin. That is one, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-c-zinc-chew-150',
    productName: 'Spring Valley Vitamin C 250 mg plus Zinc 50 mg Chewable, Orange (150 tablets)',
    category: 'Immune Support',
    formulaId: 'springvalley-b272-c-zinc-chew-150',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin C', strength: '250 mg per chewable tablet' },
      { name: 'Zinc', strength: '50 mg per chewable tablet' },
    ],
    inactiveIngredients: [
      flag(P57, 'Sorbitol', 'moderate', 'sorbitol'),
      flag(P57, 'Maltodextrin Powder', 'limited', 'maltodextrin'),
      flag(P57, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P57, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P57, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P57, 'Hydrogenated Vegetable Oil', 'high', 'hvo'),
      flag(P57, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P57, 'Natural Orange Flavor', 'cleared', 'namedFruitFlavor'),
      flag(P57, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P57, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. New Look. The panel crop does not print servings per container. This orange chewable is the Walmart 150-count listing. Ascorbic acid and zinc citrate are the actives and are not graded. Avoid from hydrogenated vegetable oil. Counted Limited tokens: maltodextrin powder and sucralose. That is two, so this is not a 3+ stack. Sorbitol and natural orange flavor do not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b272-b12-fastdissolve-5000-45',
    productName: 'Spring Valley Vitamin B12 5,000 mcg Fast-Dissolve, Mixed Berry (45 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b272-b12-fastdissolve-5000-45',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '5,000 mcg per tablet' }],
    inactiveIngredients: [
      flag(P58, 'Sugar', 'moderate', 'sugar'),
      flag(P58, 'Mannitol', 'moderate', 'mannitol'),
      flag(P58, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P58, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P58, 'Hydrogenated Vegetable Oil', 'high', 'hvo'),
      flag(P58, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P58, 'Natural and Artificial Flavor', 'limited', 'natArtFlavor'),
      flag(P58, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P58, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u batch 3. Walmart panel image is the single source. Mixed Berry, 45 count. The page shows two other ingredient sets (one with dextrose, gum arabic, maltodextrin, xylitol, beet root, menthol, and silicon dioxide; another with dextrose, F-Melt, and an artificial flavor system). Those lists disagree with the panel and were not graded. This is not a two-formula hold. The panel is readable and self-consistent, so the panel was graded. Vitamin B12 is the active and is not graded. Avoid from hydrogenated vegetable oil. Counted Limited tokens: natural and artificial flavor and sucralose. That is two, so this is not a 3+ stack. Sugar and mannitol are Caution and do not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH272_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: string }> = {
  'springvalley-b272-collagen-peptides-20': { verdict: 'clean', counted: '' },
  'springvalley-b272-coq10-gummy-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b272-coq10-gummy-100': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b272-d-mannose-120': { verdict: 'caution', counted: '' },
  'springvalley-b272-d3-k2-5000-120': { verdict: 'caution', counted: '' },
  'springvalley-b272-fiber-electrolyte-30': { verdict: 'caution', counted: 'Maltodextrin|Rebaudioside A' },
  'springvalley-b272-fish-oil-500-60': { verdict: 'clean', counted: '' },
  'springvalley-b272-fish-oil-500-180': { verdict: 'clean', counted: '' },
  'springvalley-b272-dhea-50': { verdict: 'caution', counted: '' },
  'springvalley-b272-echinacea-liquid': { verdict: 'caution', counted: '' },
  'springvalley-b272-elderberry-gummy-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b272-probiotic-50b-30': { verdict: 'clean', counted: '' },
  'springvalley-b272-ashwagandha-1300-60': { verdict: 'caution', counted: '' },
  'springvalley-b272-magnesium-gummy-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b272-magnesium-gummy-120': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b272-turmeric-bioperine-90': {
    verdict: 'caution',
    counted: 'Hydroxypropyl Starch|Carrageenan',
  },
  'springvalley-b272-b12-liquid-5000': { verdict: 'caution', counted: '' },
  'springvalley-b272-b12-gummy-3000-100': { verdict: 'avoid', counted: '' },
  'springvalley-b272-c-gummy-500-120': { verdict: 'avoid', counted: 'Medium Chain Triglycerides' },
  'springvalley-b272-d3-5000-100': { verdict: 'clean', counted: '' },
  'springvalley-b272-d3-gummy-5000-60': { verdict: 'avoid', counted: '' },
  'springvalley-b272-d3-fastdissolve-5000-90': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Rebaudioside A',
  },
  'springvalley-b272-probiotic-10b-30': { verdict: 'avoid', counted: 'Maltodextrin' },
  'springvalley-b272-c-zinc-chew-150': { verdict: 'avoid', counted: 'Maltodextrin Powder|Sucralose' },
  'springvalley-b272-b12-fastdissolve-5000-45': {
    verdict: 'avoid',
    counted: 'Natural and Artificial Flavor|Sucralose',
  },
};

if (ROWS.length !== 25) throw new Error(`batch272 row count ${ROWS.length}`);

const NOTE_IDS = new Set([
  'springvalley-b272-d3-k2-5000-120',
  'springvalley-b272-ashwagandha-1300-60',
  'springvalley-b272-turmeric-bioperine-90',
  'springvalley-b272-d3-5000-100',
]);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch272 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch272 brand ${record.id}`);
  if (record.barcode) throw new Error(`batch272 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch272 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch272 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch272 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (stackNote) throw new Error(`batch272 unexpected stack note ${record.id}`);
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch272 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch272 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch272 pending ${ingredient.name}`);
    }
  }
}
