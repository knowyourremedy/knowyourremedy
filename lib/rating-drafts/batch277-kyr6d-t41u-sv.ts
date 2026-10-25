// DRAFT / not verified / batch 277 KYR6-d (t41u Spring Valley packs 181-214).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Not in this file:
// - Wild Alaskan Omega-3 1,200 mg, 120 softgels. No image shows the inactive line. Held.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';

const METH = {
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose / croscarmellose sodium — cellulose disintegrant; t83u).',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium — cellulose gum family).',
  tartaric: 'Methodology §5 Cleared (L-tartaric acid / DL-tartaric acid — tartaric acid).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (purified water).',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup / tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin.',
  organicSugar:
    'Methodology §5 Cleared (organic sugar — cane sugar row; t90u). Bare sugar stays Caution.',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color.',
  annatto:
    'Methodology §5 Caution (Annatto Extract (color) / annatto seed extract (color) / organic annatto extract (color) — annatto row). Does not count toward the t137u stack.',
  carnauba: 'Methodology §5 Cleared (carnauba wax, including organic — founder lock t133u).',
  organicFlavors:
    'Methodology §5 Caution (Organic Flavors — unnamed natural flavor family; t100u). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  sunflowerGummy:
    'Methodology §5 High (sunflower oil / sunflower seed oil / organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as softgel fill — not the gummy seed-oil High).',
  safflowerFill:
    'Methodology §5 Cleared (safflower oil as softgel fill — not the gummy seed-oil High).',
  soybeanFill:
    'Methodology §5 Cleared (soybean oil as softgel fill — not the gummy seed-oil High).',
  cornFill: 'Methodology §5 Cleared (corn oil as softgel fill — not the gummy seed-oil High).',
  turmericColor:
    'Methodology §5 Cleared (turmeric (color) / organic turmeric extract (color) — turmeric-as-color).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  caramel:
    'Methodology §5 High (caramel color, undisclosed class — locked v1.6). The label does not name Class I or II.',
  starch: 'Methodology §5 Cleared (bare starch as a filler — named simple starch).',
  potatoStarch: 'Methodology §5 Cleared (potato starch — named simple starch).',
  cornStarch: 'Methodology §5 Cleared (cornstarch — corn starch named simple starch; t118u).',
  riceFlour:
    'Methodology §5 Caution (rice flour). Does not count toward the t137u stack. Not rice hull. Not rice bran.',
  riceHull: 'Methodology §5 Cleared (rice hull — rice-hull / rice concentrate family; t120u).',
  riceBran: 'Methodology §5 Cleared (rice bran — rice bran plant-fiber family; t111u).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol (oral coating) — Sept 15, 2026). Distinct from topical PVA.',
  inulin: 'Methodology §5 Cleared (inulin — food fiber).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity). Counts toward the t137u stack.',
  namedTaste:
    'Methodology §5 Caution (Natural Flavors with the fruits named in parentheses). Not the exact Limited natural flavors token. Not the Cleared singular Natural [fruit] Flavor row. Does not count toward the t137u stack.',
  namedFruit:
    'Methodology §5 Cleared (Natural Orange Flavor — named Natural [fruit] Flavor; t132u).',
  fractionated:
    'Methodology §5 Cleared (fractionated coconut oil in a gummy — named coconut oil; not the seed-oil gummy flag).',
  maltitolSyrup:
    'Methodology §5 Caution (maltitol syrup — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  maltitol:
    'Methodology §5 Limited (maltitol powder). The name does not count toward the t137u stack.',
  isomalt:
    'Methodology §5 Caution (isomalt — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  xylitol:
    'Methodology §5 Caution (xylitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  erythritol:
    'Methodology §5 Caution (erythritol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  mct:
    'Methodology §5 Limited (medium chain triglycerides — no plant named). Counts toward the t137u stack.',
  carmine:
    'Methodology §5 Caution (carmine / cochineal — Not Avoid). Does not count toward the t137u stack.',
  carrageenan:
    'Methodology §5 Limited (Carrageenan — Sept 28, 2026). Counts toward the t137u stack.',
  malic: 'Methodology §5 Cleared (DL-malic acid / malic acid — organic acid with citric acid).',
  lactic: 'Methodology §5 Cleared (lactic acid — organic acid with citric acid).',
  naturalColors:
    'Methodology §5 Limited (Natural Colors unspecified — same opacity bucket as natural flavors). Counts toward the t137u stack.',
  stevia:
    'Methodology §5 Limited (Stevia — founder lock t158u). Counts toward the t137u stack. Not high-purity steviol glycosides.',
  steviol:
    'Methodology §5 Limited (Steviol glycosides printed without high-purity — founder lock t16u). Counts toward the t137u stack.',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate — calcium phosphate filler).',
  cholineBit: 'Methodology §5 Cleared (choline bitartrate — exact INCI).',
  cornSyrup: 'Methodology §5 Cleared (corn syrup — food syrup).',
  ascorbate: 'Methodology §5 Cleared (ascorbic acid as a preservative — ascorbate family).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P181 =
  'Walmart panel image. Serving 1 tablet. The bottle is 100 tablets. Ascorbic acid and the rose hips on the facts are the actives and are not graded. The rose hips repeat in the less-than-2% line is the same active. t41u house-brand single source.';
const P182 =
  'Walmart panel image. Serving 1 tablet. The bottle is 250 tablets. Same inactive line as the 100-count. Ascorbic acid and the rose hips on the facts are the actives and are not graded. t41u house-brand single source.';
const P183 =
  'Walmart panel image. 40 servings of 2 gummies. The bottle is 80 vegetarian gummies. Shipping is available. Delivery is not available. The pack is for sale. Cholecalciferol is the active and is not graded. t41u house-brand single source.';
const P184 =
  'Walmart panel image. 80 servings of 2 gummies. The bottle is 160 vegetarian gummies. Same inactive line as the 80-count. Cholecalciferol is the active and is not graded. t41u house-brand single source.';
const P185 =
  'Walmart panel image. Serving 1 softgel. The bottle is 200 softgels. Cholecalciferol is the active and is not graded. t41u house-brand single source.';
const P186 =
  'Walmart panel image. Serving 1 softgel. The bottle is 200 softgels. Cholecalciferol is the active and is not graded. t41u house-brand single source.';
const P187 =
  'Walmart panel image. Serving 1 softgel. The bottle is 200 softgels. The panel says 10 mcg (400 IU). A page bullet also says 50 mcg (2,000 IU). The panel was graded. Cholecalciferol is the active and is not graded. t41u house-brand single source.';
const P188 =
  'Walmart panel image. Serving 1 softgel. The bottle is 100 softgels. The panel omits 400 IU. The 200-count tile on this page is a different listing. dl-alpha tocopheryl acetate is the vitamin E and is not graded. t41u house-brand single source.';
const P189 =
  'Walmart panel image. Serving 1 softgel. The bottle is 200 softgels. The panel states 180 mg (400 IU). This is the in-stock 200-count listing. dl-alpha tocopheryl acetate is the vitamin E and is not graded. t41u house-brand single source.';
const P190 =
  'Walmart panel image. 30 servings of 2 gummies. The bottle is 60 gummies. A Nature’s Life bottle in the gallery is a different product and was not graded. Cholecalciferol and menaquinone-7 are the actives and are not graded. t41u house-brand single source.';
const P191 =
  'Walmart panel image. Serving 1 softgel. The bottle is 60 softgels. Menaquinone-7 is the active and is not graded. t41u house-brand single source.';
const P192 =
  'Walmart panel image. Serving 1 capsule. The bottle is 90 vegetarian capsules. Low stock with Add to cart is for sale. Cholecalciferol and menaquinone are the actives and are not graded. t41u house-brand single source.';
const P193 =
  'Walmart panel image, checked against the attached image. Low resolution and legible. Serving 1 gummy. The bottle is 60 gummies. Low stock with Add to cart is for sale. Chromium picolinate and apple cider vinegar powder are the actives and are not graded. t41u house-brand single source.';
const P194 =
  'Walmart panel image, checked against the attached image. Low resolution. The inactive line reads GELATIN, VEGETABLE MAGNESIUM STEARATE and ends with a period. That is the locked vegetable magnesium stearate token, not a cut-off word. The count is not on any image. The opened listing title is 100 capsules and matches the index, so the row uses that listing count. Cascara sagrada bark is the active and is not graded. t41u house-brand single source.';
const P195 =
  'Walmart panel image. 100 servings of 2 capsules. The bottle is 200 capsules. The title 450 mg is per capsule. The panel is 900 mg per 2 capsules. Shipping is available. Delivery is out of stock. The pack is for sale. The facility line is a disclosure. Saw palmetto is the active and is not graded. t41u house-brand single source.';
const P197 =
  'Walmart panel image. Serving 1 tablet. The bottle is 150 tablets. Shipping is available. Delivery is not available. The pack is for sale. Vitamins, minerals, the fruit and vegetable blend, boron, and lutein are on the facts and are not graded. Beta-carotene is the named vitamin A source and is not graded. t41u house-brand single source.';
const P198 =
  'Walmart panel image. Serving 1 tablet. The bottle is 150 tablets. Shipping is available. Delivery is not available. The pack is for sale. Vitamins, minerals, the fruit and vegetable blend, and cranberry powder are on the facts and are not graded. Beta-carotene is the named vitamin A source and is not graded. t41u house-brand single source.';
const P199 =
  'Walmart panel image. Serving 1 capsule. The bottle is 30 delayed-release vegetarian capsules. The probiotic blend is the active and is not graded. t41u house-brand single source.';
const P200 =
  'Walmart panel image. Serving 1 capsule. The bottle is 30 vegetarian capsules. The title omits cranberry. The panel lists cranberry concentrate 125 mg as an active, and it is not graded. The probiotic blend and vitamin C are actives and are not graded. t41u house-brand single source.';
const P201 =
  'Walmart panel image, checked against the attached image. Serving 1 capsule. The bottle is 60 vegetarian capsules. The panel says 1 billion CFU. A box photo says 3 billion CFU. The inactive line is the same on both reads. The panel was graded. This is an active-amount conflict, not two inactive formulas. The probiotic blend, vitamin C, and cranberry concentrate are actives and are not graded. t41u house-brand single source.';
const P202 =
  'Walmart panel image. 30 servings of 2 gummies. The bottle is 60 gummies. Bacillus coagulans and cranberry fruit powder are the actives and are not graded. t41u house-brand single source.';
const P203 =
  'Walmart panel image. 30 servings of 2 gummies. The bottle is 60 gummies. Shipping is available. Delivery is not available. The pack is for sale. Collagen peptides are the active and are not graded. The may-contain line is a disclosure. Sugar alcohol on the facts is a nutrition amount, not a token. t41u house-brand single source.';
const P204 =
  'Walmart panel image. Serving 1 stick pack. The box is 15 sticks. Shipping is available. Delivery is not available. The pack is for sale. UPC 194346608096 is printed on the back-of-box image. UPC-A check digit OK. Vitamin C and Bacillus coagulans are the actives and are not graded. t41u house-brand single source.';
const P205 =
  'Walmart panel image. Serving 1 stick pack. The box is 30 sticks. Same inactive line as the 15-count. Shipping is available. Delivery is not available. The pack is for sale. UPC 194346603831 is printed on the back-of-box image. UPC-A check digit OK. Vitamin C and Bacillus coagulans are the actives and are not graded. t41u house-brand single source.';
const P206 =
  'Walmart panel image. Serving 1 gummy. The panel has no servings per container. The opened listing title is 120 gummies and matches the index, so the row uses that listing count. The panel has %DV columns for children 2–3 and for ages 4 and older. Melatonin in the less-than-2% line is the active and is not graded. Sugar alcohol on the facts is a nutrition amount, not a token. t41u house-brand single source.';
const P207 =
  'Walmart panel image. Ages 2–3 take 1 gummy (180 servings). Ages 4 and older take 2 gummies (90 servings). The bottle is 180 gummies. Shipping is available. Delivery is not available. The pack is for sale. Vitamins, minerals, choline, the fruit and vegetable blend, lutein, and inositol are on the facts and are not graded. The may-contain line is a disclosure. t41u house-brand single source.';
const P208 =
  'Walmart panel image. 75 servings of 2 gummies. The bottle is 150 gummies. Shipping is available. Delivery is not available. The pack is for sale. Vitamins, minerals, boron, and the fruit and vegetable blend are on the facts and are not graded. The may-contain line is a disclosure. t41u house-brand single source.';
const P209 =
  'Walmart panel image, checked against the attached image. The facts panel is low resolution and legible. The inactive line is a separate panel image. 60 servings of 2 gummies. The bottle is 120 vegetarian gummies. The facts omit choline. Choline bitartrate is on the inactive image and is graded. Vitamins, minerals, and inositol are on the facts and are not graded. Sugar alcohol on the facts is a nutrition amount, not a token. The trivial-sugar footnote is not a token. t41u house-brand single source.';
const P210 =
  'Walmart panel image. 60 servings of 2 gummies. The bottle is 120 vegetarian gummies. Ascorbic acid and sodium ascorbate are the vitamin C and are not graded. t41u house-brand single source.';
const P211 =
  'Walmart panel image. 60 servings of 2 gummies. The bottle is 120 gummies. Shipping is available. Delivery is not available. The pack is for sale. Cholecalciferol is the active and is not graded. t41u house-brand single source.';
const P212 =
  'Walmart panel image. 75 servings of 2 gummies. The bottle is 150 gummies. Shipping is available. Delivery is not available. The pack is for sale. Calcium is on the facts, so tricalcium phosphate is not graded. Vitamins, minerals, boron, inositol, and the fruit and vegetable blend are on the facts and are not graded. The may-contain line is a disclosure. t41u house-brand single source.';
const P213 =
  'Walmart panel image. Serving 1 capsule. The bottle is 150 capsules. Calcium is not on the facts, so dicalcium phosphate is graded. Zinc gluconate and cholecalciferol are the actives and are not graded. t41u house-brand single source.';
const P214 =
  'Walmart panel image. The inactive line is a separate panel image. 30 servings of 2 gummies. The bottle is 60 gummies. The gummies are gelatin, not vegetarian. Zinc citrate is the active and is not graded. t41u house-brand single source.';

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
    barcode: partial.barcode ?? '',
  };
  if (minAge === undefined) delete next.minAge;
  else next.minAge = minAge;
  return finish(next);
}

function roseHipsFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
    flag(panel, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
    flag(panel, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
    flag(panel, 'L-Tartaric Acid', 'cleared', 'tartaric'),
    flag(panel, 'Magnesium Stearate', 'cleared', 'magStearate'),
    flag(panel, 'Silica', 'limited', 'silica'),
  ];
}

function d3GummyFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
    flag(panel, 'Organic Sugar', 'cleared', 'organicSugar'),
    flag(panel, 'Organic Lemon Juice Concentrate', 'cleared', 'juice'),
    flag(panel, 'Organic Annatto Extract (Color)', 'moderate', 'annatto'),
    flag(panel, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
    flag(panel, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
    flag(panel, 'Organic Flavors', 'moderate', 'organicFlavors'),
    flag(panel, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
    flag(panel, 'Organic Turmeric Extract (Color)', 'cleared', 'turmericColor'),
    flag(panel, 'Pectin', 'cleared', 'pectin'),
    flag(panel, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
  ];
}

function d3SoftgelFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Soybean Oil', 'cleared', 'soybeanFill'),
    flag(panel, 'Gelatin', 'cleared', 'gelatin'),
    flag(panel, 'Vegetable Glycerin', 'cleared', 'glycerin'),
    flag(panel, 'Corn Oil', 'cleared', 'cornFill'),
  ];
}

function polyolBase(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
    flag(panel, 'Isomalt', 'moderate', 'isomalt'),
    flag(panel, 'Maltitol', 'limited', 'maltitol'),
    flag(panel, 'Xylitol', 'moderate', 'xylitol'),
  ];
}

export const BATCH277_KYR6D_T41U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b277-c-rosehips-500-100',
    productName: 'Spring Valley Vitamin C with Rose Hips 500 mg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-c-rosehips-500-100',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '500 mg per tablet' },
      { name: 'Rose hips powder', strength: '10 mg per tablet' },
    ],
    inactiveIngredients: roseHipsFlags(P181),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 tablet. The bottle is 100 tablets. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Ascorbic acid and rose hips are the actives and are not graded. Not the 1,000 mg 500-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-c-rosehips-500-250',
    productName: 'Spring Valley Vitamin C with Rose Hips 500 mg (250 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-c-rosehips-500-250',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '500 mg per tablet' },
      { name: 'Rose hips powder', strength: '10 mg per tablet' },
    ],
    inactiveIngredients: roseHipsFlags(P182),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 tablet. The bottle is 250 tablets. Same inactive line as the 100-count. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-d3-gummy-2000-80',
    productName: 'Spring Valley Vitamin D3 50 mcg (2,000 IU) (80 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-d3-gummy-2000-80',
    form: 'gummy',
    activeIngredients: [{ name: 'Vitamin D (as cholecalciferol)', strength: '50 mcg per 2 gummies' }],
    inactiveIngredients: d3GummyFlags(P183),
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 40 servings of 2 gummies. The bottle is 80 vegetarian gummies. Shipping is available and delivery is not, so the pack is for sale. Avoid from organic sunflower oil in the gummy. Counted Limited tokens: none. Organic flavors and organic annatto are Caution and do not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-d3-gummy-2000-160',
    productName: 'Spring Valley Vitamin D3 50 mcg (2,000 IU) (160 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-d3-gummy-2000-160',
    form: 'gummy',
    activeIngredients: [{ name: 'Vitamin D (as cholecalciferol)', strength: '50 mcg per 2 gummies' }],
    inactiveIngredients: d3GummyFlags(P184),
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 80 servings of 2 gummies. The bottle is 160 vegetarian gummies. Same inactive line as the 80-count. Avoid from organic sunflower oil in the gummy. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-d3-1000-200',
    productName: 'Spring Valley Vitamin D3 25 mcg (1,000 IU) (200 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-d3-1000-200',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin D (as cholecalciferol)', strength: '25 mcg per softgel' }],
    inactiveIngredients: d3SoftgelFlags(P185),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 softgel. The bottle is 200 softgels. Clean. Soybean oil and corn oil are the softgel fill. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-d3-10000-200',
    productName: 'Spring Valley Vitamin D3 250 mcg (10,000 IU) (200 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-d3-10000-200',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin D (as cholecalciferol)', strength: '250 mcg per softgel' }],
    inactiveIngredients: [
      flag(P186, 'Safflower Oil', 'cleared', 'safflowerFill'),
      flag(P186, 'Gelatin', 'cleared', 'gelatin'),
      flag(P186, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P186, 'Sunflower Oil', 'cleared', 'sunflowerFill'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 softgel. The bottle is 200 softgels. Clean. Safflower oil and sunflower oil are the softgel fill. Counted Limited tokens: none. Not the 5,000 IU rows. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-d3-400-200',
    productName: 'Spring Valley Vitamin D3 10 mcg (400 IU) (200 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-d3-400-200',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin D (as cholecalciferol)', strength: '10 mcg (400 IU) per softgel' }],
    inactiveIngredients: d3SoftgelFlags(P187),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 softgel. The bottle is 200 softgels. The panel says 10 mcg (400 IU). A page bullet also says 50 mcg (2,000 IU). The panel was graded. Clean. Soybean oil and corn oil are the softgel fill. Counted Limited tokens: none. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-e-180-100',
    productName: 'Spring Valley Vitamin E 180 mg (100 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-e-180-100',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin E', strength: '180 mg per softgel' }],
    inactiveIngredients: [
      flag(P188, 'Gelatin (Non-Porcine)', 'cleared', 'gelatin'),
      flag(P188, 'Glycerin', 'cleared', 'glycerin'),
      flag(P188, 'Purified Water USP', 'cleared', 'water'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 softgel. The bottle is 100 softgels. The panel omits 400 IU. Clean. Counted Limited tokens: none. No honest note. dl-alpha tocopheryl acetate is the vitamin E and is not graded. The 200-count on this page is a separate in-stock listing. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-e-180-200',
    productName: 'Spring Valley Vitamin E 180 mg (400 IU) (200 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-e-180-200',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin E (as dl-alpha tocopheryl acetate)', strength: '180 mg (400 IU) per softgel' }],
    inactiveIngredients: [
      flag(P189, 'Gelatin', 'cleared', 'gelatin'),
      flag(P189, 'Glycerin', 'cleared', 'glycerin'),
      flag(P189, 'Purified Water', 'cleared', 'water'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 softgel. The bottle is 200 softgels. The panel states 180 mg (400 IU). Clean. Counted Limited tokens: none. No honest note. Different inactive line from the 100-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-k2-d3-gummy-60',
    productName: 'Spring Valley Vitamin K2 + Vitamin D3 Mixed Berry (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-k2-d3-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin D (as cholecalciferol)', strength: '50 mcg per 2 gummies' },
      { name: 'Vitamin K2 (as menaquinone-7)', strength: '100 mcg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P190, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P190, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P190, 'Organic Lemon Juice Concentrate', 'cleared', 'juice'),
      flag(P190, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P190, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P190, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P190, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P190, 'Pectin', 'cleared', 'pectin'),
      flag(P190, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 30 servings of 2 gummies. The bottle is 60 gummies. Avoid from organic sunflower oil in the gummy. Counted Limited tokens: none. Organic flavors are Caution and do not stack. No honest note. A Nature’s Life bottle in the gallery was ignored. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-k2-100-60',
    productName: 'Spring Valley Vitamin K2 100 mcg (60 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-k2-100-60',
    form: 'softgel',
    activeIngredients: [{ name: 'Vitamin K2 (as menaquinone-7)', strength: '100 mcg per softgel' }],
    inactiveIngredients: [
      flag(P191, 'Sunflower Oil', 'cleared', 'sunflowerFill'),
      flag(P191, 'Gelatin', 'cleared', 'gelatin'),
      flag(P191, 'Vegetable Glycerin', 'cleared', 'glycerin'),
      flag(P191, 'Caramel Color', 'high', 'caramel'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 softgel. The bottle is 60 softgels. Avoid from undisclosed caramel color. Counted Limited tokens: none. Sunflower oil is the softgel fill. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-k2-d3-90',
    productName: 'Spring Valley Vitamin K2 90 mcg + D3 125 mcg (90 vegetarian capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-k2-d3-90',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '125 mcg per capsule' },
      { name: 'Vitamin K2 (as menaquinone-7)', strength: '90 mcg per capsule' },
    ],
    inactiveIngredients: [
      flag(P192, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P192, 'Vegetarian Capsule (Hypromellose)', 'cleared', 'hpmc'),
      flag(P192, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P192, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 capsule. The bottle is 90 vegetarian capsules. Low stock is still for sale. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. The capsule names hypromellose. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-chromium-gummy-60',
    productName: 'Spring Valley Chromium Picolinate 400 mcg Apple Cider Vinegar (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-chromium-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Chromium (as chromium picolinate)', strength: '400 mcg per gummy' },
      { name: 'Apple cider vinegar powder', strength: '100 mg per gummy' },
    ],
    inactiveIngredients: [
      flag(P193, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P193, 'Sugar', 'moderate', 'sugar'),
      flag(P193, 'Pectin', 'cleared', 'pectin'),
      flag(P193, 'Citric Acid', 'cleared', 'citric'),
      flag(P193, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P193, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P193, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P193, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P193, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. The attached image is low resolution and legible. Serving 1 gummy. The bottle is 60 gummies. Low stock is still for sale. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. Sugar is Caution and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-cascara-450-100',
    productName: 'Spring Valley Cascara Sagrada 450 mg (100 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b277-cascara-450-100',
    form: 'capsule',
    activeIngredients: [{ name: 'Cascara sagrada (bark)', strength: '450 mg per capsule' }],
    inactiveIngredients: [
      flag(P194, 'Gelatin', 'cleared', 'gelatin'),
      flag(P194, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. The attached image is low resolution. The inactive line is complete: gelatin, vegetable magnesium stearate. The count is not on any image. The opened listing title is 100 capsules and matches the index, so the row uses that listing count. Clean. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-saw-palmetto-450-200',
    productName: 'Spring Valley Saw Palmetto 450 mg (200 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b277-saw-palmetto-450-200',
    form: 'capsule',
    activeIngredients: [{ name: 'Saw palmetto (whole fruit)', strength: '900 mg per 2 capsules' }],
    inactiveIngredients: [
      flag(P195, 'Gelatin (Capsule)', 'cleared', 'gelatin'),
      flag(P195, 'Rice Flour', 'moderate', 'riceFlour'),
      flag(P195, 'Rice Hull', 'cleared', 'riceHull'),
      flag(P195, 'Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 100 servings of 2 capsules. The bottle is 200 capsules. The title 450 mg is per capsule. Shipping is available and delivery is out of stock, so the pack is for sale. Caution from rice flour. Counted Limited tokens: none. Rice hull is the named form. The facility line is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-womens-50-multi-150',
    productName: "Spring Valley Women's 50+ Multivitamin (150 tablets)",
    category: 'Vitamins',
    formulaId: 'springvalley-b277-womens-50-multi-150',
    form: 'tablet',
    activeIngredients: [{ name: "Women's 50+ multivitamin and mineral blend", strength: '1 tablet' }],
    inactiveIngredients: [
      flag(P197, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P197, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P197, 'Starch', 'cleared', 'starch'),
      flag(P197, 'Carboxymethylcellulose Sodium', 'cleared', 'cmc'),
      flag(P197, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P197, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P197, 'DL-Tartaric Acid', 'cleared', 'tartaric'),
      flag(P197, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P197, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P197, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P197, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 tablet. The bottle is 150 tablets. Shipping is available and delivery is not, so the pack is for sale. Counted Limited token: maltodextrin. Silica is the 0-pt cap and does not stack. No honest note. Vitamin and mineral salts, the fruit and vegetable blend, boron, lutein, and beta-carotene as the vitamin A source are not graded. Not the men’s multis. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-womens-multi-150',
    productName: "Spring Valley Women's Multivitamin (150 tablets)",
    category: 'Vitamins',
    formulaId: 'springvalley-b277-womens-multi-150',
    form: 'tablet',
    activeIngredients: [{ name: "Women's multivitamin and mineral blend", strength: '1 tablet' }],
    inactiveIngredients: [
      flag(P198, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P198, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P198, 'Starch', 'cleared', 'starch'),
      flag(P198, 'Carboxymethylcellulose Sodium', 'cleared', 'cmc'),
      flag(P198, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P198, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P198, 'DL-Tartaric Acid', 'cleared', 'tartaric'),
      flag(P198, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P198, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P198, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P198, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 tablet. The bottle is 150 tablets. Shipping is available and delivery is not, so the pack is for sale. Counted Limited token: maltodextrin. Silica is the 0-pt cap and does not stack. No honest note. Not the 50+ formula. Cranberry powder is on the facts and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-period-probiotic-30',
    productName: 'Spring Valley Women’s Period Support Probiotic (30 capsules)',
    category: 'Digestive',
    formulaId: 'springvalley-b277-period-probiotic-30',
    form: 'capsule',
    activeIngredients: [{ name: 'Probiotic blend', strength: '6 billion CFU per capsule' }],
    inactiveIngredients: [
      flag(P199, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(P199, 'Vegetable Capsule (Hypromellose, Gellan Gum)', 'cleared', 'hpmc'),
      flag(P199, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P199, 'Ascorbic Acid (Preservative)', 'cleared', 'ascorbate'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 capsule. The bottle is 30 delayed-release vegetarian capsules. Clean. Counted Limited tokens: none. No honest note. The capsule names hypromellose and gellan gum. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-womens-probiotic-30',
    productName: 'Spring Valley Women’s Probiotic with Cranberry (30 capsules)',
    category: 'Digestive',
    formulaId: 'springvalley-b277-womens-probiotic-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'Probiotic blend', strength: '1 billion CFU per capsule' },
      { name: 'Cranberry concentrate', strength: '125 mg per capsule' },
      { name: 'Vitamin C', strength: '15 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P200, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(P200, 'Hypromellose', 'cleared', 'hpmc'),
      flag(P200, 'Inulin', 'cleared', 'inulin'),
      flag(P200, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P200, 'Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 capsule. The bottle is 30 vegetarian capsules. Counted Limited token: maltodextrin. No honest note. The title omits cranberry. The panel lists cranberry concentrate as an active. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-womens-probiotic-60',
    productName: 'Spring Valley Women’s Probiotic with Cranberry (60 capsules)',
    category: 'Digestive',
    formulaId: 'springvalley-b277-womens-probiotic-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Probiotic blend', strength: '1 billion CFU per capsule' },
      { name: 'Cranberry concentrate', strength: '125 mg per capsule' },
      { name: 'Vitamin C', strength: '15 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P201, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(P201, 'Hypromellose', 'cleared', 'hpmc'),
      flag(P201, 'Inulin', 'cleared', 'inulin'),
      flag(P201, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P201, 'Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. The attached panel says 1 billion CFU. A box photo says 3 billion CFU. The inactive line matches the 30-count. The panel was graded. This is an active-amount conflict, not two inactive formulas. Serving 1 capsule. The bottle is 60 vegetarian capsules. Counted Limited token: maltodextrin. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-probiotic-cranberry-gummy-60',
    productName: 'Spring Valley Women’s Probiotic with Cranberry (60 gummies)',
    category: 'Digestive',
    formulaId: 'springvalley-b277-probiotic-cranberry-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Bacillus coagulans', strength: '1 billion CFU per 2 gummies' },
      { name: 'Cranberry fruit powder', strength: '250 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P202, 'Sugar', 'moderate', 'sugar'),
      flag(P202, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P202, 'Water', 'cleared', 'water'),
      flag(P202, 'Black Carrot Juice Extract (Color)', 'cleared', 'juice'),
      flag(P202, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P202, 'Citric Acid', 'cleared', 'citric'),
      flag(P202, 'Cornstarch', 'cleared', 'cornStarch'),
      flag(P202, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P202, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P202, 'Pectin', 'cleared', 'pectin'),
      flag(P202, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 30 servings of 2 gummies. The bottle is 60 gummies. Counted Limited token: natural flavors. Sugar is Caution and does not stack. Fractionated coconut oil is Cleared in the gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-collagen-gummy-60',
    productName: 'Spring Valley Zero Sugar Collagen Peptides 2,500 mg (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-collagen-gummy-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Collagen peptides', strength: '2,500 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P203, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P203, 'Isomalt', 'moderate', 'isomalt'),
      flag(P203, 'Inulin', 'cleared', 'inulin'),
      flag(P203, 'Maltitol', 'limited', 'maltitol'),
      flag(P203, 'Erythritol', 'moderate', 'erythritol'),
      flag(P203, 'Gelatin', 'cleared', 'gelatin'),
      flag(P203, 'Purified Water', 'cleared', 'water'),
      flag(P203, 'Carmine (Color)', 'moderate', 'carmine'),
      flag(P203, 'Carrageenan', 'limited', 'carrageenan'),
      flag(P203, 'Citric Acid', 'cleared', 'citric'),
      flag(P203, 'DL-Malic Acid', 'cleared', 'malic'),
      flag(P203, 'Natural Flavors', 'limited', 'naturalFlavors'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 30 servings of 2 gummies. The bottle is 60 gummies. Shipping is available and delivery is not, so the pack is for sale. Counted Limited tokens: carrageenan and natural flavors. Maltitol does not count. Carmine is Caution and does not stack. No honest note. Collagen peptides are the active and are not graded. The may-contain line is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-immunity-powder-15',
    productName: 'Spring Valley Zero Sugar Daily Immunity with Probiotics (15 sticks)',
    category: 'Immune Support',
    formulaId: 'springvalley-b277-immunity-powder-15',
    form: 'powder',
    barcode: '194346608096',
    activeIngredients: [
      { name: 'Vitamin C', strength: '1,000 mg per stick' },
      { name: 'Bacillus coagulans', strength: '2 billion CFU per stick' },
    ],
    inactiveIngredients: [
      flag(P204, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P204, 'Citric Acid', 'cleared', 'citric'),
      flag(P204, 'Natural Colors', 'limited', 'naturalColors'),
      flag(P204, 'Stevia', 'limited', 'stevia'),
      flag(P204, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 stick. The box is 15 sticks. Shipping is available and delivery is not, so the pack is for sale. Avoid from three Limited tokens. Silicon dioxide is the 0-pt cap and does not stack. Graded under Immune Support because the title leads with immunity. UPC 194346608096 is printed on the back-of-box image. UPC-A check digit OK.',
    ],
  }),
  row({
    id: 'springvalley-b277-immunity-powder-30',
    productName: 'Spring Valley Zero Sugar Daily Immunity with Probiotics (30 sticks)',
    category: 'Immune Support',
    formulaId: 'springvalley-b277-immunity-powder-30',
    form: 'powder',
    barcode: '194346603831',
    activeIngredients: [
      { name: 'Vitamin C', strength: '1,000 mg per stick' },
      { name: 'Bacillus coagulans', strength: '2 billion CFU per stick' },
    ],
    inactiveIngredients: [
      flag(P205, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P205, 'Citric Acid', 'cleared', 'citric'),
      flag(P205, 'Natural Colors', 'limited', 'naturalColors'),
      flag(P205, 'Stevia', 'limited', 'stevia'),
      flag(P205, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 stick. The box is 30 sticks. Same inactive line as the 15-count. Shipping is available and delivery is not, so the pack is for sale. Avoid from three Limited tokens. Silicon dioxide is the 0-pt cap and does not stack. UPC 194346603831 is printed on the back-of-box image. UPC-A check digit OK.',
    ],
  }),
  row({
    id: 'springvalley-b277-kids-melatonin-1-120',
    productName: 'Spring Valley Kids Melatonin 1 mg Raspberry Blackberry (120 gummies)',
    category: 'Sleep',
    formulaId: 'springvalley-b277-kids-melatonin-1-120',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    activeIngredients: [{ name: 'Melatonin', strength: '1 mg per gummy' }],
    inactiveIngredients: [
      ...polyolBase(P206),
      flag(P206, 'Black/Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P206, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P206, 'Citric Acid', 'cleared', 'citric'),
      flag(P206, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P206, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P206, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P206, 'Pectin', 'cleared', 'pectin'),
      flag(P206, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. The count is not on any image. The opened listing title is 120 gummies and matches the index, so the row uses that listing count. The panel has columns for children 2–3 and for ages 4 and older. Avoid from organic sunflower oil in the gummy. Counted Limited tokens: medium chain triglycerides and natural flavors. The polyols do not stack. No 3+ stack note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-kids-multi-gummy-180',
    productName: 'Spring Valley Zero Sugar Kids Multivitamin (180 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-kids-multi-gummy-180',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    activeIngredients: [{ name: 'Kids multivitamin and mineral blend', strength: '1 gummy ages 2–3; 2 gummies ages 4+' }],
    inactiveIngredients: [
      ...polyolBase(P207),
      flag(P207, 'Pectin', 'cleared', 'pectin'),
      flag(P207, 'Black Currant Juice Concentrate', 'cleared', 'juice'),
      flag(P207, 'Black/Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P207, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P207, 'Citric Acid', 'cleared', 'citric'),
      flag(P207, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P207, 'Natural Flavors (Blueberry, Cherry, Orange)', 'moderate', 'namedTaste'),
      flag(P207, 'Purified Water', 'cleared', 'water'),
      flag(P207, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Ages 2–3 take 1 gummy (180 servings). Ages 4 and older take 2 gummies (90 servings). The bottle is 180 gummies. Shipping is available and delivery is not, so the pack is for sale. Counted Limited token: medium chain triglycerides. Natural Flavors names blueberry, cherry, and orange, so it is not the exact Limited natural flavors token and does not stack. The polyols do not stack. No honest note. Choline bitartrate is the choline on the facts and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-mens-multi-gummy-150',
    productName: "Spring Valley Zero Sugar Men's Multivitamin (150 gummies)",
    category: 'Vitamins',
    formulaId: 'springvalley-b277-mens-multi-gummy-150',
    form: 'gummy',
    activeIngredients: [{ name: "Men's multivitamin and mineral blend", strength: '2 gummies' }],
    inactiveIngredients: [
      flag(P208, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P208, 'Maltitol', 'limited', 'maltitol'),
      flag(P208, 'Isomalt', 'moderate', 'isomalt'),
      flag(P208, 'Gelatin', 'cleared', 'gelatin'),
      flag(P208, 'Erythritol', 'moderate', 'erythritol'),
      flag(P208, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(P208, 'Black/Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P208, 'Citric Acid', 'cleared', 'citric'),
      flag(P208, 'DL-Malic Acid', 'cleared', 'malic'),
      flag(P208, 'Natural Flavors (Blackberry, Raspberry, Strawberry)', 'moderate', 'namedTaste'),
      flag(P208, 'Pectin', 'cleared', 'pectin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 75 servings of 2 gummies. The bottle is 150 gummies. Shipping is available and delivery is not, so the pack is for sale. Caution from the polyols. Counted Limited tokens: none. Natural Flavors names blackberry, raspberry, and strawberry and does not stack. Maltitol does not count. No honest note. Boron citrate is the boron on the facts and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-zero-sugar-multi-120',
    productName: 'Spring Valley Zero Sugar Multivitamin (120 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-zero-sugar-multi-120',
    form: 'gummy',
    activeIngredients: [{ name: 'Multivitamin and mineral blend', strength: '2 gummies' }],
    inactiveIngredients: [
      flag(P209, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P209, 'Isomalt', 'moderate', 'isomalt'),
      flag(P209, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P209, 'Xylitol', 'moderate', 'xylitol'),
      flag(P209, 'Pectin', 'cleared', 'pectin'),
      flag(P209, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P209, 'Choline Bitartrate', 'cleared', 'cholineBit'),
      flag(P209, 'Citric Acid', 'cleared', 'citric'),
      flag(P209, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P209, 'Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P209, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P209, 'Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P209, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P209, 'Steviol Glycosides', 'limited', 'steviol'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. The attached facts panel is low resolution and legible. The inactive line is a separate panel image. 60 servings of 2 gummies. The bottle is 120 vegetarian gummies. Avoid from three Limited tokens. The facts omit choline. Choline bitartrate is graded from the inactive image. Fractionated coconut oil is Cleared in the gummy. Sugar alcohol on the facts is not a token. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-c-gummy-250-120',
    productName: 'Spring Valley Zero Sugar Vitamin C 250 mg (120 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-c-gummy-250-120',
    form: 'gummy',
    activeIngredients: [{ name: 'Vitamin C', strength: '250 mg per 2 gummies' }],
    inactiveIngredients: [
      ...polyolBase(P210),
      flag(P210, 'Pectin', 'cleared', 'pectin'),
      flag(P210, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(P210, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P210, 'Citric Acid', 'cleared', 'citric'),
      flag(P210, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P210, 'Natural Orange Flavor', 'cleared', 'namedFruit'),
      flag(P210, 'Purified Water', 'cleared', 'water'),
      flag(P210, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P210, 'Sunflower Oil', 'high', 'sunflowerGummy'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 60 servings of 2 gummies. The bottle is 120 vegetarian gummies. Avoid from sunflower oil in the gummy. Counted Limited token: medium chain triglycerides. Natural orange flavor is the named fruit flavor and does not stack. No honest note. Ascorbic acid and sodium ascorbate are the vitamin C and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-d-gummy-2000-120',
    productName: 'Spring Valley Zero Sugar Vitamin D 50 mcg (2,000 IU) (120 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-d-gummy-2000-120',
    form: 'gummy',
    activeIngredients: [{ name: 'Vitamin D', strength: '50 mcg per 2 gummies' }],
    inactiveIngredients: [
      ...polyolBase(P211),
      flag(P211, 'Purified Water', 'cleared', 'water'),
      flag(P211, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(P211, 'Black/Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P211, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P211, 'Citric Acid', 'cleared', 'citric'),
      flag(P211, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P211, 'Natural Flavors (Lemon, Orange, Strawberry)', 'moderate', 'namedTaste'),
      flag(P211, 'Pectin', 'cleared', 'pectin'),
      flag(P211, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P211, 'Sunflower Seed Oil', 'high', 'sunflowerGummy'),
      flag(P211, 'Turmeric (Color)', 'cleared', 'turmericColor'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 60 servings of 2 gummies. The bottle is 120 gummies. Shipping is available and delivery is not, so the pack is for sale. Avoid from sunflower seed oil in the gummy. Counted Limited token: medium chain triglycerides. Natural Flavors names lemon, orange, and strawberry and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-womens-multi-gummy-150',
    productName: "Spring Valley Zero Sugar Women's Multivitamin (150 gummies)",
    category: 'Vitamins',
    formulaId: 'springvalley-b277-womens-multi-gummy-150',
    form: 'gummy',
    activeIngredients: [{ name: "Women's multivitamin and mineral blend", strength: '2 gummies' }],
    inactiveIngredients: [
      flag(P212, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P212, 'Maltitol', 'limited', 'maltitol'),
      flag(P212, 'Inulin', 'cleared', 'inulin'),
      flag(P212, 'Gelatin', 'cleared', 'gelatin'),
      flag(P212, 'Purified Water', 'cleared', 'water'),
      flag(P212, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(P212, 'Black/Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P212, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P212, 'Citric Acid', 'cleared', 'citric'),
      flag(P212, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P212, 'Natural Flavors (Blackberry, Raspberry, Strawberry)', 'moderate', 'namedTaste'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. 75 servings of 2 gummies. The bottle is 150 gummies. Shipping is available and delivery is not, so the pack is for sale. Counted Limited token: medium chain triglycerides. Natural Flavors names blackberry, raspberry, and strawberry and does not stack. Maltitol does not stack. No honest note. Calcium is on the facts, so tricalcium phosphate is not graded. Inulin is not on the facts and is graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-zinc-d-50-150',
    productName: 'Spring Valley Zinc 50 mg with Vitamin D (150 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-zinc-d-50-150',
    form: 'capsule',
    activeIngredients: [
      { name: 'Zinc (as zinc gluconate)', strength: '50 mg per capsule' },
      { name: 'Vitamin D', strength: '50 mcg per capsule' },
    ],
    inactiveIngredients: [
      flag(P213, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P213, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(P213, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P213, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P213, 'Silica', 'limited', 'silica'),
      flag(P213, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. Walmart panel image is the single source. Serving 1 capsule. The bottle is 150 capsules. Calcium is not on the facts, so dicalcium phosphate is graded. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Zinc gluconate and cholecalciferol are the actives and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b277-zinc-gummy-30-60',
    productName: 'Spring Valley Zinc 30 mg (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b277-zinc-gummy-30-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Zinc (as zinc citrate)', strength: '30 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P214, 'Corn Syrup', 'cleared', 'cornSyrup'),
      flag(P214, 'Sugar', 'moderate', 'sugar'),
      flag(P214, 'Gelatin', 'cleared', 'gelatin'),
      flag(P214, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P214, 'Citric Acid', 'cleared', 'citric'),
      flag(P214, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P214, 'Lactic Acid', 'cleared', 'lactic'),
      flag(P214, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P214, 'Pectin', 'cleared', 'pectin'),
      flag(P214, 'Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 181–214. The inactive line is a separate panel image. 30 servings of 2 gummies. The bottle is 60 gummies. The gummies are gelatin. Counted Limited token: natural flavors. Sugar is Caution and does not stack. Fractionated coconut oil is Cleared in the gummy. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH277_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; counted: string }> = {
  'springvalley-b277-c-rosehips-500-100': { verdict: 'caution', counted: '' },
  'springvalley-b277-c-rosehips-500-250': { verdict: 'caution', counted: '' },
  'springvalley-b277-d3-gummy-2000-80': { verdict: 'avoid', counted: '' },
  'springvalley-b277-d3-gummy-2000-160': { verdict: 'avoid', counted: '' },
  'springvalley-b277-d3-1000-200': { verdict: 'clean', counted: '' },
  'springvalley-b277-d3-10000-200': { verdict: 'clean', counted: '' },
  'springvalley-b277-d3-400-200': { verdict: 'clean', counted: '' },
  'springvalley-b277-e-180-100': { verdict: 'clean', counted: '' },
  'springvalley-b277-e-180-200': { verdict: 'clean', counted: '' },
  'springvalley-b277-k2-d3-gummy-60': { verdict: 'avoid', counted: '' },
  'springvalley-b277-k2-100-60': { verdict: 'avoid', counted: '' },
  'springvalley-b277-k2-d3-90': { verdict: 'caution', counted: '' },
  'springvalley-b277-chromium-gummy-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b277-cascara-450-100': { verdict: 'clean', counted: '' },
  'springvalley-b277-saw-palmetto-450-200': { verdict: 'caution', counted: '' },
  'springvalley-b277-womens-50-multi-150': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b277-womens-multi-150': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b277-period-probiotic-30': { verdict: 'clean', counted: '' },
  'springvalley-b277-womens-probiotic-30': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b277-womens-probiotic-60': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b277-probiotic-cranberry-gummy-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b277-collagen-gummy-60': { verdict: 'caution', counted: 'Carrageenan|Natural Flavors' },
  'springvalley-b277-immunity-powder-15': {
    verdict: 'avoid',
    counted: 'Natural Flavors|Natural Colors|Stevia',
  },
  'springvalley-b277-immunity-powder-30': {
    verdict: 'avoid',
    counted: 'Natural Flavors|Natural Colors|Stevia',
  },
  'springvalley-b277-kids-melatonin-1-120': {
    verdict: 'avoid',
    counted: 'Medium Chain Triglycerides|Natural Flavors',
  },
  'springvalley-b277-kids-multi-gummy-180': { verdict: 'caution', counted: 'Medium Chain Triglycerides' },
  'springvalley-b277-mens-multi-gummy-150': { verdict: 'caution', counted: '' },
  'springvalley-b277-zero-sugar-multi-120': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Natural Flavors|Steviol Glycosides',
  },
  'springvalley-b277-c-gummy-250-120': { verdict: 'avoid', counted: 'Medium Chain Triglycerides' },
  'springvalley-b277-d-gummy-2000-120': { verdict: 'avoid', counted: 'Medium Chain Triglycerides' },
  'springvalley-b277-womens-multi-gummy-150': { verdict: 'caution', counted: 'Medium Chain Triglycerides' },
  'springvalley-b277-zinc-d-50-150': { verdict: 'caution', counted: '' },
  'springvalley-b277-zinc-gummy-30-60': { verdict: 'caution', counted: 'Natural Flavors' },
};

const NOTE_IDS = new Set([
  'springvalley-b277-d3-1000-200',
  'springvalley-b277-d3-10000-200',
  'springvalley-b277-d3-400-200',
  'springvalley-b277-k2-100-60',
  'springvalley-b277-saw-palmetto-450-200',
  'springvalley-b277-probiotic-cranberry-gummy-60',
  'springvalley-b277-immunity-powder-15',
  'springvalley-b277-immunity-powder-30',
  'springvalley-b277-zero-sugar-multi-120',
  'springvalley-b277-zinc-gummy-30-60',
]);

const UPC: Record<string, string> = {
  'springvalley-b277-immunity-powder-15': '194346608096',
  'springvalley-b277-immunity-powder-30': '194346603831',
};

const KID_AGE: Record<string, number> = {
  'springvalley-b277-kids-melatonin-1-120': 2,
  'springvalley-b277-kids-multi-gummy-180': 2,
};

if (ROWS.length !== 33) throw new Error(`batch277 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch277 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch277 brand ${record.id}`);
  if ((record.barcode ?? '') !== (UPC[record.id] ?? '')) throw new Error(`batch277 upc ${record.id}`);
  const kidAge = KID_AGE[record.id];
  if (kidAge !== undefined) {
    if (record.audience !== 'kids' || record.minAge !== kidAge) {
      throw new Error(`batch277 kids ${record.id} ${record.audience} ${record.minAge}`);
    }
  } else if (record.audience !== 'adult' || record.minAge !== 18) {
    throw new Error(`batch277 adult ${record.id}`);
  }
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch277 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch277 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch277 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch277 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  if (stackNote && rollup.cause !== 'limited_stack') {
    throw new Error(`batch277 stack note without stack cause ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch277 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch277 pending ${ingredient.name}`);
    }
  }
}
