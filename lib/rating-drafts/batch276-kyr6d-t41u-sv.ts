// DRAFT / not verified / batch 276 KYR6-d (t41u Spring Valley packs 151-180).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Ten downsized-sheet lines were checked against the attached panel images. Each line matched.
// Not in this file:
// - SAMe 400 mg, 40 caplets. Yellow Ochre and Modified Cellulose Gum have no lock. Held.
// - Green tea extract 500 mg, 60 capsules. Rice Bran Powder has no lock. Held.
// - Turmeric with ginger, 90 capsules. No Supplement Facts image. Held.
// - Turmeric with ginger, 180 capsules. No Supplement Facts image. Held.
// - Turmeric gummies, 60. Inactive line is not on any image. Held.
// - Melatonin fast-dissolve 12 mg, 60. Natural Menthol, Sucrose Esters, and Beet Root Extract have no lock. Held.
// - Ultra strength turmeric 1,500 mg, 90 capsules. Inactive line is not on any image. Held.
// - Vitamin B6 100 mg, 250 tablets. Panel is cut off and not legible. Held.

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
  cellulose: 'Methodology §5 Cleared (cellulose / cellulose (plant origin) — cellulose family).',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose / croscarmellose sodium — cellulose disintegrant; t83u).',
  vegStearic: 'Methodology §5 Cleared (vegetable stearic acid — stearate-family lubricant; t102u).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  yeast:
    'Methodology §5 Cleared (Cultured Yeast (Saccharomyces cerevisiae) — ferment-media family). Brewer\'s Yeast maps here.',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  riceBran: 'Methodology §5 Cleared (rice bran — rice bran plant-fiber family; t111u).',
  bamboo:
    'Methodology §5 Caution (bamboo extract / organic bamboo extract). Does not count toward the t137u stack.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  powderedCellulose: 'Methodology §5 Cleared (powdered cellulose — cellulose family).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate — calcium phosphate filler).',
  povidone: 'Methodology §5 Cleared (povidone / povidone USP).',
  crospovidone: 'Methodology §5 Cleared (crospovidone — povidone family).',
  carnauba: 'Methodology §5 Cleared (carnauba wax, including organic — founder lock t133u).',
  fdc: 'Methodology §5 High (FD&C dye / aluminum lake — synthetic dye family).',
  polydextrose:
    'Methodology §5 Limited (polydextrose — starch-based bulk sweetener). Counts toward the t137u stack.',
  peg:
    'Methodology §5 Limited (polyethylene glycol — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol (oral coating) — Sept 15, 2026). Distinct from topical PVA.',
  tio2: 'Methodology §5 High (titanium dioxide (color), including capsule coloring agent).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  mannitol:
    'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color.',
  namedFruit:
    'Methodology §5 Cleared (Natural Cherry Flavor / Natural Orange Flavor / Natural Lemon Lime Flavor — named Natural [fruit] Flavor; t132u).',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  cornStarch: 'Methodology §5 Cleared (cornstarch — corn starch named simple starch; t118u).',
  fractionated:
    'Methodology §5 Cleared (fractionated coconut oil in a gummy — named coconut oil; not the seed-oil gummy flag).',
  lactic: 'Methodology §5 Cleared (lactic acid — organic acid with citric acid).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity). Counts toward the t137u stack.',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (purified water).',
  mixedToco: 'Methodology §5 Cleared (mixed tocopherols / tocopherol — mixed-tocopherols row; t118u).',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup / tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin.',
  organicSugar:
    'Methodology §5 Cleared (organic sugar — cane sugar row; t90u). Bare sugar stays Caution.',
  organicFlavors:
    'Methodology §5 Caution (Organic Flavors — unnamed natural flavor family; t100u). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  sunflowerGummy:
    'Methodology §5 High (organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  cornSyrup: 'Methodology §5 Cleared (corn syrup — food syrup).',
  annatto:
    'Methodology §5 Caution (Annatto Extract (color) / organic annatto extract (color) — annatto row; t107u). Does not count toward the t137u stack.',
  soybeanFill:
    'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil High).',
  starch: 'Methodology §5 Cleared (bare starch as a filler — named simple starch).',
  dextrose:
    'Methodology §5 Caution (bare dextrose — glucose / dextrose sweetener row). Does not count toward the t137u stack.',
  natArt:
    'Methodology §5 Limited (natural and artificial flavor — the panel prints an ampersand). Counts toward the t137u stack.',
  aspartame: 'Methodology §5 High (aspartame — locked Avoid).',
  sorbitol:
    'Methodology §5 Caution (sorbitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  artificialFlavor:
    'Methodology §5 Caution (artificial [fruit] flavor — artificial blueberry flavor family). Does not count toward the t137u stack.',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P152 =
  'Walmart panel image, checked against the attached image. Serving 1 tablet. The bottle is 100 tablets. Page ingredients wording differs. The panel was graded. Contains wheat is a disclosure. Selenium yeast is the active and is not graded. t41u house-brand single source.';
const P153 =
  'Walmart panel image, checked against the attached image. 30 servings of 2 capsules. The bottle is 60 vegetarian capsules. The title 500 mg is per 2 capsules. The facility line is a disclosure. Shilajit is the active and is not graded. t41u house-brand single source.';
const P154 =
  'Walmart panel image, checked against the attached image. Serving 1 tablet. The bottle is 30 tablets. Page text omits povidone, microcrystalline cellulose, polydextrose, polyvinyl alcohol, and stearic acid. The panel was graded. Ferrous sulfate is the iron active and is not graded. t41u house-brand single source.';
const P156 =
  'Walmart panel image. Low resolution and legible. Serving 1 capsule. The front is 180 capsules. The facility line is a disclosure. Milk thistle extract is the active and is not graded. t41u house-brand single source.';
const P157 =
  'Walmart panel image, checked against the attached image. Serving 1 microlozenge. The bottle is 200 microlozenges. Shipping is out of stock. Pickup and delivery are available, so the pack is for sale. Page ingredients are empty. Cyanocobalamin is the active and is not graded. t41u house-brand single source.';
const P158 =
  'Walmart panel image. 30 servings of 2 gummies. The jar is 60 gummies. The facts print sodium 10 g. That unit is a label typo. Sodium is a nutrition amount, not an ingredient. The probiotic, Immuno-LP20, and inulin are the actives and are not graded. t41u house-brand single source.';
const P159 =
  'Walmart panel image. 60 servings of 2 softgels. The jar is 120 softgels. Page text omits purified water and the fish allergen line. The panel was graded. Fish oil, flaxseed oil, and the essential-oil blend are the actives and are not graded. Vitamin E on the facts is not graded. Contains fish is a disclosure. t41u house-brand single source.';
const P164 =
  'Walmart panel image. Low resolution and legible. 30 servings of 2 gummies. The front is 60 vegetarian gummies. Melatonin is the active and is not graded. t41u house-brand single source.';
const P166 =
  'Walmart panel image. 30 servings of 2 gummies. The front is 60 vegetarian gummies. The title omits the gummy form and names only methylcobalamin. The panel lists methylcobalamin and hydroxocobalamin. Page text says natural flavors and a carrot-juice color. The panel says organic flavors and has no color. The panel was graded. Vitamin B12 is the active and is not graded. t41u house-brand single source.';
const P167 =
  'Walmart panel image. 30 servings of 2 gummies. The jar is 60 vegetarian gummies. Page text lists glucose syrup and purified water. The panel lists corn syrup, pectin, citric acid, annatto, and natural flavors. The panel was graded. Vitamin C is the active and is not graded. t41u house-brand single source.';
const P168 =
  'Walmart panel image. 60 servings of 2 capsules. The jar is 120 vegetarian capsules. The title 2,000 mg is per 2 capsules. Page text omits magnesium stearate. The panel was graded. Ascorbic acid is the active and is not graded. t41u house-brand single source.';
const P169 =
  'Walmart panel image. Serving 1 softgel. The jar is 250 softgels. Shipping is out of stock and pickup is not available. Delivery is available, so the pack is for sale. Page text omits contains soy. The panel was graded. Vitamin A is the active and is not graded. Contains soy is a disclosure. t41u house-brand single source.';
const P170 =
  'Walmart panel image, checked against the attached image. Serving 1 tablet. The jar is 60 tablets. Page ingredients are empty. Cyanocobalamin is the vitamin B12 source and is not graded. t41u house-brand single source.';
const P171 =
  'Walmart panel image, checked against the attached image. Serving 1 tablet. The jar is 60 tablets. Page ingredients are empty. Calcium is not on the facts, so dicalcium phosphate is graded. Cyanocobalamin is the active and is not graded. t41u house-brand single source.';
const P172 =
  'Walmart panel image. 50 servings of 2 gummies. The jar is 100 vegetarian gummies. Page ingredients are empty. Vitamin B12 is the active and is not graded. t41u house-brand single source.';
const P173 =
  'Walmart panel image, checked against the attached image. Serving 1 tablet. The jar is 120 tablets. Same inactive line as the 60-count cherry tablets. Page ingredients are empty. Cyanocobalamin is the vitamin B12 source and is not graded. t41u house-brand single source.';
const P174 =
  'Walmart panel image. Serving 1 tablet. The count is not on any image. The opened listing title is 100 tablets and matches the index, so the row uses that listing count. Page ingredients are empty. Cyanocobalamin is the active and is not graded. t41u house-brand single source.';
const P176 =
  'Walmart panel image. 60 servings of 2 vegetarian tablets. The jar is 120 tablets. The title 500 mg is per 2 tablets. The panel prints an ampersand in the flavor name. Page text matches the panel. Ascorbic acid is the active and is not graded. t41u house-brand single source.';
const P177 =
  'Walmart panel image, checked against the attached image. Serving 1 tablet. The jar is 60 chewable tablets. Page ingredients are empty. Ascorbic acid and sodium ascorbate are the vitamin C and are not graded. t41u house-brand single source.';
const P178 =
  'Walmart panel image. Serving 1 tablet. The jar is 200 chewable tablets. Aspartame is on the image. The phenylketonurics footnote and the tartrazine sentence are cut off and are page text only. Those statements were not added as tokens. FD&C Yellow No. 5 Lake is on the panel and was graded. Ascorbic acid and sodium ascorbate are the vitamin C and are not graded. t41u house-brand single source.';
const P179 =
  'Walmart panel image. The panel prints 35 servings of 2 gummies. The jar is 150 vegetarian gummies. The row keeps the opened 150-count. Page ingredients are empty. Vitamin C is the active and is not graded. t41u house-brand single source.';
const P180 =
  'Walmart panel image. Serving 1 tablet. The jar is 500 tablets. Page ingredients are empty. Ascorbic acid and the rose hips on the facts are the actives and are not graded. The rose hips repeat in the less-than-2% line is the same active. t41u house-brand single source.';

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

export const BATCH276_KYR6D_T41U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b276-selenium-200-100',
    productName: 'Spring Valley Selenium 200 mcg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-selenium-200-100',
    form: 'tablet',
    activeIngredients: [{ name: 'Selenium (as selenium yeast)', strength: '200 mcg per tablet' }],
    inactiveIngredients: [
      flag(P152, "Brewer's Yeast", 'cleared', 'yeast'),
      flag(P152, 'Cellulose (Plant Origin)', 'cleared', 'cellulose'),
      flag(P152, 'Croscarmellose', 'cleared', 'croscarmellose'),
      flag(P152, 'Vegetable Stearic Acid', 'cleared', 'vegStearic'),
      flag(P152, 'Silica', 'limited', 'silica'),
      flag(P152, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. Serving 1 tablet. The bottle is 100 tablets. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Contains wheat is a disclosure. Selenium yeast is the active and is not graded. Page ingredients wording differs. The panel was graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-shilajit-500-60',
    productName: 'Spring Valley Shilajit 50% Fulvic Acid 500 mg (60 vegetarian capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-shilajit-500-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Shilajit extract (Asphaltum punjabianum)', strength: '500 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag(P153, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P153, 'Rice Bran', 'cleared', 'riceBran'),
      flag(P153, 'Bamboo Extract', 'moderate', 'bamboo'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. 30 servings of 2 capsules. The title 500 mg is per 2 capsules. Bamboo extract is Caution and does not stack. Counted Limited tokens: none. No honest note. The facility line is a disclosure. Shilajit is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-iron-45-30',
    productName: 'Spring Valley Slow Release Iron 45 mg (30 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-iron-45-30',
    form: 'tablet',
    activeIngredients: [{ name: 'Iron (as ferrous sulfate)', strength: '45 mg per tablet' }],
    inactiveIngredients: [
      flag(P154, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P154, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(P154, 'Povidone', 'cleared', 'povidone'),
      flag(P154, 'Powdered Cellulose', 'cleared', 'powderedCellulose'),
      flag(P154, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P154, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P154, 'FD&C Blue No. 1 Lake', 'high', 'fdc'),
      flag(P154, 'FD&C Red No. 40 Lake', 'high', 'fdc'),
      flag(P154, 'FD&C Yellow No. 6 Lake', 'high', 'fdc'),
      flag(P154, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P154, 'Polydextrose', 'limited', 'polydextrose'),
      flag(P154, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P154, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P154, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P154, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. Serving 1 tablet. The bottle is 30 tablets. Avoid from FD&C Blue No. 1 Lake, FD&C Red No. 40 Lake, FD&C Yellow No. 6 Lake, and titanium dioxide (color). Counted Limited tokens: polydextrose and polyethylene glycol. That is two, so this is not a 3+ stack. No honest note. Calcium is not on the facts, so dicalcium phosphate is graded. Ferrous sulfate is the iron active and is not graded. Page text omits several panel items. The panel was graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-milk-thistle-175-180',
    productName: 'Spring Valley Milk Thistle Extract 175 mg (180 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b276-milk-thistle-175-180',
    form: 'capsule',
    activeIngredients: [
      { name: 'Milk thistle extract (Silybum marianum) (seed)', strength: '175 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P156, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P156, 'Gelatin (Capsule)', 'cleared', 'gelatin'),
      flag(P156, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(P156, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. Low resolution and legible. Serving 1 capsule. The front is 180 capsules. Counted Limited token: maltodextrin. Silica is the 0-pt cap and does not stack. No honest note. The facility line is a disclosure. Milk thistle is the active and is not graded. Not the 90-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-b12-micro-500-200',
    productName: 'Spring Valley Sublingual Vitamin B12 500 mcg, Cherry (200 microlozenges)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-b12-micro-500-200',
    form: 'lozenge',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '500 mcg per microlozenge' }],
    inactiveIngredients: [
      flag(P157, 'Mannitol', 'moderate', 'mannitol'),
      flag(P157, 'Cellulose (Plant Origin)', 'cleared', 'cellulose'),
      flag(P157, 'Vegetable Stearic Acid', 'cleared', 'vegStearic'),
      flag(P157, 'Beet Juice Color', 'cleared', 'juice'),
      flag(P157, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P157, 'Natural Cherry Flavor', 'cleared', 'namedFruit'),
      flag(P157, 'Sucralose', 'limited', 'sucralose'),
      flag(P157, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. Serving 1 microlozenge. The bottle is 200 microlozenges. Shipping is out of stock. Pickup and delivery are available, so the pack is for sale. Counted Limited token: sucralose. Mannitol is Caution and does not stack. No honest note. Cyanocobalamin is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-synbiotic-gummy-60',
    productName: 'Spring Valley Synbiotic Gummies, Raspberry (60 gummies)',
    category: 'Digestive',
    formulaId: 'springvalley-b276-synbiotic-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Bacillus coagulans SNZ1969', strength: '1 billion CFU per 2 gummies' },
      { name: 'Immuno-LP20 (heat-killed Lactobacillus plantarum L-137)', strength: '50 mg per 2 gummies' },
      { name: 'Inulin (as chicory root fiber)', strength: '2.5 g per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P158, 'Sugar', 'moderate', 'sugar'),
      flag(P158, 'Black Carrot Juice Extract (Color)', 'cleared', 'juice'),
      flag(P158, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P158, 'Citric Acid', 'cleared', 'citric'),
      flag(P158, 'Cornstarch', 'cleared', 'cornStarch'),
      flag(P158, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P158, 'Lactic Acid', 'cleared', 'lactic'),
      flag(P158, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P158, 'Pectin', 'cleared', 'pectin'),
      flag(P158, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. 30 servings of 2 gummies. The jar is 60 gummies. Counted Limited token: natural flavors. Sugar is Caution and does not stack. Honest note names fractionated coconut oil. The facts print sodium 10 g. That unit is a label typo for the nutrition line. Sodium is not an ingredient. The probiotic, Immuno-LP20, and inulin are the actives and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-triple-omega-120',
    productName: 'Spring Valley Triple Omega (120 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-triple-omega-120',
    form: 'softgel',
    activeIngredients: [
      { name: 'Fish oil', strength: '800 mg per 2 softgels' },
      { name: 'Flaxseed oil', strength: '800 mg per 2 softgels' },
      { name: 'Essential oil blend', strength: '400 mg per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(P159, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
      flag(P159, 'Glycerin', 'cleared', 'glycerin'),
      flag(P159, 'Purified Water', 'cleared', 'water'),
      flag(P159, 'Mixed Tocopherols', 'cleared', 'mixedToco'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. 60 servings of 2 softgels. The jar is 120 softgels. Counted Limited tokens: none. No honest note. Page text omits purified water and the fish allergen line. The panel was graded. Fish oil, flaxseed oil, and the essential-oil blend are the actives and are not graded. Contains fish is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-melatonin-gummy-12-60',
    productName: 'Spring Valley Ultra Strength Melatonin Gummies 12 mg (60 gummies)',
    category: 'Sleep',
    formulaId: 'springvalley-b276-melatonin-gummy-12-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Melatonin', strength: '12 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P164, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P164, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P164, 'Citric Acid', 'cleared', 'citric'),
      flag(P164, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P164, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P164, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P164, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P164, 'Pectin', 'cleared', 'pectin'),
      flag(P164, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. Low resolution and legible. 30 servings of 2 gummies. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. No honest note. Not the 5 mg or 10 mg gummies and not the 12 mg fast-dissolve. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-b12-gummy-5000-60',
    productName: 'Spring Valley Ultra Strength Vitamin B12 5,000 mcg (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-b12-gummy-5000-60',
    form: 'gummy',
    activeIngredients: [
      {
        name: 'Vitamin B12 (as methylcobalamin and hydroxocobalamin)',
        strength: '5,000 mcg per 2 gummies',
      },
    ],
    inactiveIngredients: [
      flag(P166, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P166, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P166, 'Pectin', 'cleared', 'pectin'),
      flag(P166, 'Citric Acid', 'cleared', 'citric'),
      flag(P166, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P166, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P166, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P166, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. 30 servings of 2 gummies. Avoid from organic sunflower oil in the gummy. Organic flavors are Caution and do not stack. Counted Limited tokens: none. No honest note. The title names only methylcobalamin. The panel lists methylcobalamin and hydroxocobalamin. Page text says natural flavors. The panel says organic flavors. Not the 3,000 mcg gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-c-gummy-1000-60',
    productName: 'Spring Valley Ultra Strength Vitamin C 1,000 mg (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-c-gummy-1000-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid and sodium ascorbate)', strength: '1,000 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P167, 'Sugar', 'moderate', 'sugar'),
      flag(P167, 'Corn Syrup', 'cleared', 'cornSyrup'),
      flag(P167, 'Pectin', 'cleared', 'pectin'),
      flag(P167, 'Citric Acid', 'cleared', 'citric'),
      flag(P167, 'Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P167, 'Natural Flavors', 'limited', 'naturalFlavors'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. 30 servings of 2 gummies. Counted Limited token: natural flavors. Sugar and annatto extract (color) are Caution and do not stack. No honest note. Page text lists glucose syrup and purified water. The panel was graded. Vitamin C is the active and is not graded. Not the 500 mg gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-c-2000-120',
    productName: 'Spring Valley Ultra Strength Vitamin C 2,000 mg (120 vegetarian capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-c-2000-120',
    form: 'capsule',
    activeIngredients: [{ name: 'Vitamin C (as ascorbic acid)', strength: '2,000 mg per 2 capsules' }],
    inactiveIngredients: [
      flag(P168, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P168, 'Bamboo Extract', 'moderate', 'bamboo'),
      flag(P168, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P168, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. 60 servings of 2 capsules. The title 2,000 mg is per 2 capsules. Bamboo extract is Caution and does not stack. Counted Limited tokens: none. No honest note. Page text omits magnesium stearate. The panel was graded. Ascorbic acid is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-vitamin-a-2400-250',
    productName: 'Spring Valley Vitamin A 2,400 mcg (250 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-vitamin-a-2400-250',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin A (as retinyl palmitate)', strength: '2,400 mcg per softgel' }],
    inactiveIngredients: [
      flag(P169, 'Soybean Oil', 'cleared', 'soybeanFill'),
      flag(P169, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
      flag(P169, 'Glycerin', 'cleared', 'glycerin'),
      flag(P169, 'Purified Water', 'cleared', 'water'),
      flag(P169, 'Tocopherol', 'cleared', 'mixedToco'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. Serving 1 softgel. The jar is 250 softgels. Shipping is out of stock and pickup is not available. Delivery is available, so the pack is for sale. Counted Limited tokens: none. Honest note names soybean oil. Contains soy is a disclosure. Page text omits that line. Vitamin A is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-b12-2500-60',
    productName: 'Spring Valley Vitamin B12 Quick-Dissolve 2,500 mcg, Cherry (60 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-b12-2500-60',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '2,500 mcg per tablet' }],
    inactiveIngredients: [
      flag(P170, 'Mannitol', 'moderate', 'mannitol'),
      flag(P170, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P170, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P170, 'Natural Cherry Flavor', 'cleared', 'namedFruit'),
      flag(P170, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. Serving 1 tablet. The jar is 60 tablets. Counted Limited token: sucralose. Mannitol is Caution and does not stack. No honest note. Cyanocobalamin is the vitamin B12 source and is not graded. Not the 120-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-b12-1000-60',
    productName: 'Spring Valley Vitamin B12 Timed-Release 1,000 mcg (60 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-b12-1000-60',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '1,000 mcg per tablet' }],
    inactiveIngredients: [
      flag(P171, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(P171, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P171, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P171, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P171, 'Silicon Dioxide', 'limited', 'silica'),
      flag(P171, 'Starch', 'cleared', 'starch'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. Serving 1 tablet. The jar is 60 tablets. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. Calcium is not on the facts, so dicalcium phosphate is graded. Cyanocobalamin is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-b12-gummy-500-100',
    productName: 'Spring Valley Vitamin B12 Gummies 500 mcg, Raspberry (100 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-b12-gummy-500-100',
    form: 'gummy',
    activeIngredients: [
      {
        name: 'Vitamin B12 (as methylcobalamin and hydroxocobalamin)',
        strength: '500 mcg per 2 gummies',
      },
    ],
    inactiveIngredients: [
      flag(P172, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P172, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P172, 'Citric Acid', 'cleared', 'citric'),
      flag(P172, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P172, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P172, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P172, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P172, 'Pectin', 'cleared', 'pectin'),
      flag(P172, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. 50 servings of 2 gummies. Avoid from organic sunflower oil in the gummy. Organic flavors are Caution and do not stack. Counted Limited tokens: none. No honest note. Not the 5,000 mcg gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-b12-2500-120',
    productName: 'Spring Valley Vitamin B12 Quick-Dissolve 2,500 mcg, Cherry (120 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-b12-2500-120',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '2,500 mcg per tablet' }],
    inactiveIngredients: [
      flag(P173, 'Mannitol', 'moderate', 'mannitol'),
      flag(P173, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P173, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P173, 'Natural Cherry Flavor', 'cleared', 'namedFruit'),
      flag(P173, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. Serving 1 tablet. The jar is 120 tablets. Same inactive line as the 60-count. Counted Limited token: sucralose. Mannitol is Caution and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-b12-500-100',
    productName: 'Spring Valley Vitamin B12 500 mcg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-b12-500-100',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '500 mcg per tablet' }],
    inactiveIngredients: [
      flag(P174, 'Dextrose', 'moderate', 'dextrose'),
      flag(P174, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P174, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P174, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P174, 'Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. Serving 1 tablet. The count is not on any image. The opened listing title is 100 tablets and matches the index, so this row uses that listing count. Dextrose is Caution and does not stack. Counted Limited tokens: none. No honest note. Cyanocobalamin is the active and is not graded. Not the 200-count microlozenge. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-c-fastdissolve-500-120',
    productName: 'Spring Valley Vitamin C 500 mg, Orange, Fast Dissolve (120 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-c-fastdissolve-500-120',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin C (as ascorbic acid)', strength: '500 mg per 2 tablets' }],
    inactiveIngredients: [
      flag(P176, 'Mannitol', 'moderate', 'mannitol'),
      flag(P176, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P176, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P176, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P176, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P176, 'Natural & Artificial Orange Flavor', 'limited', 'natArt'),
      flag(P176, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P176, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. 60 servings of 2 tablets. The title 500 mg is per 2 tablets. Counted Limited tokens: natural and artificial orange flavor and sucralose. That is two, so this is not a 3+ stack. The panel prints an ampersand. Mannitol is Caution and does not stack. No honest note. Ascorbic acid is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-c-chew-orange-60',
    productName: 'Spring Valley Vitamin C 500 mg, Orange, Chewable (60 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-c-chew-orange-60',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin C', strength: '500 mg per tablet' }],
    inactiveIngredients: [
      flag(P177, 'Sugar', 'moderate', 'sugar'),
      flag(P177, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P177, 'FD&C Yellow No. 6 Lake', 'high', 'fdc'),
      flag(P177, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P177, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P177, 'Natural Orange Flavor', 'cleared', 'namedFruit'),
      flag(P177, 'Orange Juice Concentrate', 'cleared', 'juice'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The attached image matches the inactive line. Serving 1 tablet. The jar is 60 chewable tablets. Avoid from FD&C Yellow No. 6 Lake. Sugar is Caution and does not stack. Counted Limited tokens: none. No honest note. Ascorbic acid and sodium ascorbate are the vitamin C and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-c-chew-tropical-200',
    productName: 'Spring Valley Vitamin C 500 mg, Tropical Fruit, Chewable (200 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-c-chew-tropical-200',
    form: 'tablet',
    activeIngredients: [{ name: 'Vitamin C', strength: '500 mg per tablet' }],
    inactiveIngredients: [
      flag(P178, 'Sorbitol', 'moderate', 'sorbitol'),
      flag(P178, 'Sugar', 'moderate', 'sugar'),
      flag(P178, 'Artificial Orange Flavor', 'moderate', 'artificialFlavor'),
      flag(P178, 'Artificial Piña Colada Flavor', 'moderate', 'artificialFlavor'),
      flag(P178, 'Artificial Watermelon Flavor', 'moderate', 'artificialFlavor'),
      flag(P178, 'Aspartame', 'high', 'aspartame'),
      flag(P178, 'FD&C Blue No. 1 Lake', 'high', 'fdc'),
      flag(P178, 'FD&C Red No. 40 Lake', 'high', 'fdc'),
      flag(P178, 'FD&C Yellow No. 5 Lake', 'high', 'fdc'),
      flag(P178, 'FD&C Yellow No. 6 Lake', 'high', 'fdc'),
      flag(P178, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P178, 'Natural Lemon Lime Flavor', 'cleared', 'namedFruit'),
      flag(P178, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. Serving 1 tablet. The jar is 200 chewable tablets. Avoid from aspartame, FD&C Blue No. 1 Lake, FD&C Red No. 40 Lake, FD&C Yellow No. 5 Lake, and FD&C Yellow No. 6 Lake. Counted Limited tokens: none. Sorbitol, sugar, and the three artificial flavors are Caution and do not stack. No honest note. Aspartame is on the image. The phenylketonurics footnote and the tartrazine sentence are cut off the image and were not added as tokens. Yellow No. 5 Lake is on the panel. Ascorbic acid and sodium ascorbate are the vitamin C and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-c-gummy-250-150',
    productName: 'Spring Valley Vitamin C Gummies 250 mg, Orange (150 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-c-gummy-250-150',
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid and sodium ascorbate)', strength: '250 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P179, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P179, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P179, 'Citric Acid', 'cleared', 'citric'),
      flag(P179, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P179, 'Organic Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P179, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P179, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P179, 'Pectin', 'cleared', 'pectin'),
      flag(P179, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. The panel prints 35 servings of 2 gummies, which is 70. The jar is 150 gummies. The row keeps the opened 150-count. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. Organic annatto extract (color) is Caution and does not stack. No honest note. Not the 1,000 mg gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b276-c-rosehips-1000-500',
    productName: 'Spring Valley Vitamin C with Rose Hips 1,000 mg (500 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b276-c-rosehips-1000-500',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '1,000 mg per tablet' },
      { name: 'Rose hips', strength: '8 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P180, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P180, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P180, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P180, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P180, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P180, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P180, 'Silica', 'limited', 'silica'),
      flag(P180, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 151–180. Walmart panel image is the single source. Serving 1 tablet. The jar is 500 tablets. Counted Limited token: polyethylene glycol. Silica is the 0-pt cap and does not stack. No honest note. Ascorbic acid and rose hips are the actives and are not graded. The rose hips repeat in the less-than-2% line is the same active. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH276_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; counted: string }> = {
  'springvalley-b276-selenium-200-100': { verdict: 'caution', counted: '' },
  'springvalley-b276-shilajit-500-60': { verdict: 'caution', counted: '' },
  'springvalley-b276-iron-45-30': { verdict: 'avoid', counted: 'Polydextrose|Polyethylene Glycol' },
  'springvalley-b276-milk-thistle-175-180': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b276-b12-micro-500-200': { verdict: 'caution', counted: 'Sucralose' },
  'springvalley-b276-synbiotic-gummy-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b276-triple-omega-120': { verdict: 'clean', counted: '' },
  'springvalley-b276-melatonin-gummy-12-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b276-b12-gummy-5000-60': { verdict: 'avoid', counted: '' },
  'springvalley-b276-c-gummy-1000-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b276-c-2000-120': { verdict: 'caution', counted: '' },
  'springvalley-b276-vitamin-a-2400-250': { verdict: 'clean', counted: '' },
  'springvalley-b276-b12-2500-60': { verdict: 'caution', counted: 'Sucralose' },
  'springvalley-b276-b12-1000-60': { verdict: 'caution', counted: '' },
  'springvalley-b276-b12-gummy-500-100': { verdict: 'avoid', counted: '' },
  'springvalley-b276-b12-2500-120': { verdict: 'caution', counted: 'Sucralose' },
  'springvalley-b276-b12-500-100': { verdict: 'caution', counted: '' },
  'springvalley-b276-c-fastdissolve-500-120': {
    verdict: 'caution',
    counted: 'Natural & Artificial Orange Flavor|Sucralose',
  },
  'springvalley-b276-c-chew-orange-60': { verdict: 'avoid', counted: '' },
  'springvalley-b276-c-chew-tropical-200': { verdict: 'avoid', counted: '' },
  'springvalley-b276-c-gummy-250-150': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b276-c-rosehips-1000-500': { verdict: 'caution', counted: 'Polyethylene Glycol' },
};

const NOTE_IDS = new Set([
  'springvalley-b276-synbiotic-gummy-60',
  'springvalley-b276-vitamin-a-2400-250',
]);

if (ROWS.length !== 22) throw new Error(`batch276 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch276 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch276 brand ${record.id}`);
  if (record.barcode) throw new Error(`batch276 upc ${record.id}`);
  if (record.audience !== 'adult' || record.minAge !== 18) throw new Error(`batch276 adult ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch276 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch276 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch276 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (stackNote) throw new Error(`batch276 unexpected stack note ${record.id} ${stackNote}`);
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch276 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch276 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch276 pending ${ingredient.name}`);
    }
  }
}
