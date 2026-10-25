// DRAFT / not verified / batch 274 KYR6-d (t41u Spring Valley packs 91-120).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Not in this file:
// - L-Lysine 500 mg, 250 tablets. No readable Supplement Facts panel. Held.
// - Liquid Melatonin 10 mg, 2 fl oz. Out of stock. Closed as not for sale.

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
  mixedToco: 'Methodology §5 Cleared (mixed tocopherols).',
  tocopherols: 'Methodology §5 Cleared (tocopherols / mixed natural tocopherols).',
  natVitE: 'Methodology §5 Cleared (natural vitamin E — tocopherol antioxidant).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPMC family).',
  riceHull: 'Methodology §5 Cleared (Rice Hull — rice hulls / rice hull concentrate family; t119u / t120u).',
  ricePowder: 'Methodology §5 Cleared (rice powder — exact token; t132u). Not rice flour.',
  riceFlour:
    'Methodology §5 Caution (white rice flour / rice flour). Does not count toward the t137u stack.',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup / tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin.',
  tapiocaStarch: 'Methodology §5 Cleared (tapioca starch — named simple starch; t122u).',
  organicSugar:
    'Methodology §5 Cleared (organic sugar — cane sugar row; t90u). Bare sugar stays Caution.',
  caneSugar: 'Methodology §5 Cleared (cane sugar — food sugar). Not bare sugar.',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose — t118u). Not bare sugar.',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity). Counts toward the t137u stack.',
  namedFruit:
    'Methodology §5 Cleared (Natural Lemon Flavor — named Natural [fruit] Flavor; t132u).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  cellulosePlant: 'Methodology §5 Cleared (cellulose (plant origin) — cellulose family; t83u).',
  povidone: 'Methodology §5 Cleared (povidone — tablet binder).',
  croscarmellose:
    'Methodology §5 Cleared (croscarmellose sodium — cellulose disintegrant). Croscarmellose without sodium maps here (t83u).',
  peg:
    'Methodology §5 Limited (polyethylene glycol — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum). Not carboxymethylcellulose calcium.',
  polydextrose:
    'Methodology §5 Limited (polydextrose — starch-based bulk sweetener). Counts toward the t137u stack.',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol (oral coating) — Sept 15, 2026). Distinct from topical PVA.',
  talc: 'Methodology §5 High (talc — oral swallow).',
  magSilicate: 'Methodology §5 High (magnesium silicate — talc lock alias; oral swallow).',
  tio2: 'Methodology §5 High (titanium dioxide (color), including capsule coloring agent).',
  crospovidone: 'Methodology §5 Cleared (crospovidone — povidone family).',
  ascorbic:
    'Methodology §5 Cleared (ascorbic acid as a preservative — ascorbate family).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  gum: 'Methodology §5 Cleared (agar / locust bean gum — food gum).',
  carnauba: 'Methodology §5 Cleared (carnauba wax, including organic — founder lock t133u).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  sunflowerGummy:
    'Methodology §5 High (organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as softgel fill — not the gummy seed-oil High).',
  safflowerFill:
    'Methodology §5 Cleared (safflower oil as softgel fill — not the gummy seed-oil High).',
  cornFill: 'Methodology §5 Cleared (corn oil as softgel fill — not the gummy seed-oil High).',
  fractionated:
    'Methodology §5 Cleared (fractionated coconut oil in a gummy — named coconut oil; not the seed-oil gummy flag).',
  mct:
    'Methodology §5 Limited (medium chain triglycerides with no plant named — founder lock t132u). Counts toward the t137u stack.',
  maltitolSyrup:
    'Methodology §5 Caution (maltitol syrup — maltitol solution; Sept 26, 2026). Distinct from Limited maltitol powder. Does not count toward the t137u stack.',
  annatto:
    'Methodology §5 Caution (Annatto (Color) / annatto extract (color) — annatto row; t107u). Does not count toward the t137u stack.',
  lactic: 'Methodology §5 Cleared (lactic acid — organic acid).',
  lecithin: 'Methodology §5 Cleared (lecithin with no source named).',
  beeswax: 'Methodology §5 Cleared (beeswax).',
  dicalcium:
    'Methodology §5 Cleared (dicalcium phosphate as a filler). Not the mineral active.',
  starch: 'Methodology §5 Cleared (bare starch as a filler — named simple starch).',
  cornStarch: 'Methodology §5 Cleared (cornstarch — corn starch named simple starch; t118u).',
  vegCapsuleBare:
    'Methodology §5 Caution (vegetarian capsule — unnamed shell; t90u). Does not name hypromellose or pullulan. Does not count toward the t137u stack.',
  calciumSilicate:
    'Methodology §5 Caution (calcium silicate — anticaking silicate). Not the silicon dioxide cap. Does not count toward the t137u stack.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate — tablet disintegrant).',
  tartaric: 'Methodology §5 Cleared (DL-tartaric acid — organic acid; t132u).',
  cholineBit:
    'Methodology §5 Cleared (choline bitartrate — exact INCI, Sept 15, 2026). Distinct from choline chloride.',
  hexameta:
    'Methodology §5 Caution (sodium hexametaphosphate — exact token, Sept 25, 2026). Does not count toward the t137u stack.',
  sorbate:
    'Methodology §5 Caution (potassium sorbate — preservative). Does not count toward the t137u stack.',
  benzoate:
    'Methodology §5 Caution (sodium benzoate — preservative). Does not count toward the t137u stack.',
  rebA:
    'Methodology §5 Limited (rebaudioside A printed without organic or extracted — founder lock t16u). Counts toward the t137u stack.',
  greenTea:
    'Methodology §5 Caution (green tea extract as an other ingredient — t75u / t77u). Not the Supplement Facts active. Does not count toward the t137u stack.',
  rosemary:
    'Methodology §5 Caution (Rosemary Extract (A Natural Preservative) / bare Rosemary Extract — oral inactive). Does not count toward the t137u stack.',
  turmericColor:
    'Methodology §5 Cleared (Turmeric Extract Color / organic turmeric extract (color) — Turmeric (Color); t100u / t75u).',
  calciumCarbonate:
    'Methodology §5 Cleared (calcium carbonate as a filler). Not the mineral active.',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P91 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 30 tablets. Page text moves silica and croscarmellose above the less-than-2% split. Same items. L-carnitine is the active and is not graded. t41u house-brand single source.';
const P92 =
  'Walmart panel image. 50 servings of 2 capsules. Page ingredients match the panel. L-arginine is the active and is not graded. t41u house-brand single source.';
const P93 =
  'Walmart panel image. 25 servings of 2 capsules. Page inactive matches the panel. L-arginine is the active and is not graded. t41u house-brand single source.';
const P94 =
  'Walmart panel image. 50 servings of 2 tablets. The panel labels the line Ingredients. L-glutamine is the active and is not graded. Dicalcium phosphate is not on the facts. t41u house-brand single source.';
const P96 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 100 capsules. Page text drops hydroxypropyl methylcellulose and adds polyethylene glycol, acetic acid, and sodium lauryl sulfate. The panel was graded. Calcium is on the facts, so dicalcium phosphate is not graded. t41u house-brand single source.';
const P97 =
  'Walmart panel image. Page text lists sodium hexametaphosphate as an active and calls the product DirtDetox. The panel lists it as a preservative. The panel was graded. The cleansing blend and activated charcoal are the actives and are not graded. t41u house-brand single source.';
const P99 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 30 softgels. Lutein with zeaxanthin is the active and is not graded. t41u house-brand single source.';
const P100 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 90 softgels. Lutein with zeaxanthin is the active and is not graded. t41u house-brand single source.';
const P101 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 90 capsules. Page inactive says tapioca modified starch and organic rice concentrate. Page ingredients and the panel say hypromellose and rice hull. The panel was graded. The facility line is a disclosure. Maca is the active and is not graded. t41u house-brand single source.';
const P102 =
  'Walmart panel image. 30 servings of 2 gummies. Page text matches the panel. Magnesium is the active and is not graded. t41u house-brand single source.';
const P103 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 60 tablets. Page ingredients match the panel. Magnesium, ashwagandha, and L-theanine are on the facts and are not graded. t41u house-brand single source.';
const P104 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 100 tablets. Page inactive adds talc and sodium lauryl sulfate. The panel was graded. Magnesium and calcium are the actives and are not graded. t41u house-brand single source.';
const P105 =
  'Walmart panel image. New Look. Servings per container are not on the panel. Specifications say 250. Page inactive is a different formula. The panel was graded. Magnesium and calcium are the actives and are not graded. t41u house-brand single source.';
const P106 =
  'Walmart panel image. 60 servings of 2 capsules. Page ingredients match the panel. Magnesium glycinate is the active and is not graded. t41u house-brand single source.';
const P107 =
  'Walmart panel image. New Look. 30 servings of 2 gummies. Page text says organic tapioca starch. The panel says tapioca starch. The panel was graded. Magnesium citrate is the active and is not graded. t41u house-brand single source.';
const P108 =
  'Walmart panel image. New Look. 30 servings of 2 capsules. Page text lists only hypromellose. The panel was graded. Magnesium is the active and is not graded. t41u house-brand single source.';
const P109 =
  'Walmart panel image. 30 servings of 2 softgels. Pickup and delivery are in stock. Shipping is not available. Page ingredients match the panel. Algal oil and vitamin D are the actives and are not graded. t41u house-brand single source.';
const P110 =
  'Walmart panel image. 60 servings of 2 softgels. Page text reorders the fish species and drops bovine from gelatin. The panel was graded. Contains fish is a disclosure. Fish oil and vitamin D are the actives and are not graded. t41u house-brand single source.';
const P111 =
  'Walmart panel image. New Look. 60 servings of 1 softgel. The title says 2,000 mg. The panel is 30.8 mg of a 65:1 extract, equivalent to 2,000 mg of leaf, in extra virgin olive oil. That olive oil is inside the active and is not graded. t41u house-brand single source.';
const P112 =
  'Walmart panel image only. 30 servings of 2 gummies. Page text is a gelatin formula. The panel was graded. Melatonin is the active and is not graded. t41u house-brand single source.';
const P113 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 150 tablets. Page text drops carnauba wax. The panel was graded. Vitamins, minerals, the fruit and vegetable blend, and boron are on the facts and are not graded. t41u house-brand single source.';
const P114 =
  'Walmart panel image. New Look. Servings per container are not on the panel. The Walmart listing is 150 tablets. Page text drops carnauba wax. The panel was graded. Vitamins, minerals, turmeric powder, and the fruit and vegetable blend are on the facts and are not graded. t41u house-brand single source.';
const P115 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 30 tablets. Page ingredients match the panel. Fenugreek, boron, selenium, and zinc are on the facts and are not graded. t41u house-brand single source.';
const P116 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 30 capsules. A bottle-back line says may contain sulfites. Sulfites are not an ingredient. Estro-G and GABA are the actives and are not graded. t41u house-brand single source.';
const P117 =
  'Walmart panel image. The other-ingredients line is a separate bottle-back image. 30 servings of 2 gummies. Page text mixes actives into the list. The bottle-back line was graded. Inulin is the fiber on the facts and is not graded. t41u house-brand single source.';
const P118 =
  'Walmart panel image. The other-ingredients line is a separate image. 30 servings of 2 gummies. The opened listing is Multivitamin + Omega-3, 60 gummies, and that title and count match the index. Page text spells inositol wrong and adds the actives. The separate image was graded. t41u house-brand single source.';
const P119 =
  'Walmart panel image. The other-ingredients line is a separate image. 60 servings of 2 gummies. The opened listing is Multivitamin Vegetarian Gummies, 120 count, and that title and count match the index. Page text omits choline bitartrate. The separate image was graded. t41u house-brand single source.';
const P120 =
  'Walmart panel image. The other-ingredients line is a separate image. 120 servings of 2 gummies. The opened listing is Multivitamin Vegetarian Gummies, 240 count, and that title and count match the index. Page text omits choline bitartrate. The separate image was graded. t41u house-brand single source.';

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

function luteinFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Sunflower Oil', 'cleared', 'sunflowerFill'),
    flag(panel, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
    flag(panel, 'Safflower Oil', 'cleared', 'safflowerFill'),
    flag(panel, 'Glycerin', 'cleared', 'glycerin'),
    flag(panel, 'Purified Water', 'cleared', 'water'),
    flag(panel, 'Lecithin', 'cleared', 'lecithin'),
    flag(panel, 'Beeswax', 'cleared', 'beeswax'),
    flag(panel, 'Natural Vitamin E', 'cleared', 'natVitE'),
  ];
}

function arginineFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Gelatin', 'cleared', 'gelatin'),
    flag(panel, 'Silica', 'limited', 'silica'),
    flag(panel, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
  ];
}

function mensTabletFlags(panel: string, withCmc: boolean): IngredientFlag[] {
  const flags: IngredientFlag[] = [
    flag(panel, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
    flag(panel, 'Starch', 'cleared', 'starch'),
    flag(panel, 'Maltodextrin', 'limited', 'maltodextrin'),
  ];
  if (withCmc) flags.push(flag(panel, 'Carboxymethylcellulose Sodium', 'cleared', 'cmc'));
  flags.push(
    flag(panel, 'Carnauba Wax', 'cleared', 'carnauba'),
    flag(panel, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
    flag(panel, 'DL-Tartaric Acid', 'cleared', 'tartaric'),
    flag(panel, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
    flag(panel, 'Magnesium Stearate', 'cleared', 'magStearate'),
    flag(panel, 'Polyvinyl Alcohol', 'cleared', 'pva'),
    flag(panel, 'Silica', 'limited', 'silica'),
  );
  return flags;
}

function multiGummyFlags(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
    flag(panel, 'Sucrose', 'cleared', 'sucrose'),
    flag(panel, 'Carnauba Wax', 'cleared', 'carnauba'),
    flag(panel, 'Choline Bitartrate', 'cleared', 'cholineBit'),
    flag(panel, 'Citric Acid', 'cleared', 'citric'),
    flag(panel, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
    flag(panel, 'Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
    flag(panel, 'Natural Flavors', 'limited', 'naturalFlavors'),
    flag(panel, 'Pectin', 'cleared', 'pectin'),
    flag(panel, 'Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
    flag(panel, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
  ];
}

export const BATCH274_KYR6D_T41U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b274-carnitine-500-30',
    productName: 'Spring Valley L-Carnitine 500 mg (30 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-carnitine-500-30',
    form: 'tablet',
    activeIngredients: [{ name: 'L-Carnitine (as L-carnitine L-tartrate)', strength: '500 mg per tablet' }],
    inactiveIngredients: [
      flag(P91, 'Cellulose (Plant Origin)', 'cleared', 'cellulosePlant'),
      flag(P91, 'Vegetable Stearic Acid', 'cleared', 'stearic'),
      flag(P91, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P91, 'Calcium Carbonate', 'cleared', 'calciumCarbonate'),
      flag(P91, 'Croscarmellose', 'cleared', 'croscarmellose'),
      flag(P91, 'Magnesium Silicate', 'high', 'magSilicate'),
      flag(P91, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P91, 'Silica', 'limited', 'silica'),
      flag(P91, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. Magnesium silicate is the talc alias and sets Avoid. Counted Limited token: polyethylene glycol. Silica is the 0-pt cap and does not stack. That is one Limited token, so this is not a 3+ stack. No honest note. L-carnitine is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-arginine-1000-100',
    productName: 'Spring Valley L-Arginine 1,000 mg (100 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-arginine-1000-100',
    form: 'capsule',
    activeIngredients: [{ name: 'L-Arginine', strength: '1,000 mg per 2 capsules' }],
    inactiveIngredients: arginineFlags(P92),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 50 servings of 2 capsules. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Not the 50-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-arginine-1000-50',
    productName: 'Spring Valley L-Arginine 1,000 mg (50 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-arginine-1000-50',
    form: 'capsule',
    activeIngredients: [{ name: 'L-Arginine', strength: '1,000 mg per 2 capsules' }],
    inactiveIngredients: arginineFlags(P93),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 25 servings of 2 capsules. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Not the 100-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-glutamine-500-100',
    productName: 'Spring Valley L-Glutamine 500 mg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-glutamine-500-100',
    form: 'tablet',
    activeIngredients: [{ name: 'L-Glutamine', strength: '1,000 mg per 2 tablets' }],
    inactiveIngredients: [
      flag(P94, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P94, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(P94, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P94, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P94, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P94, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P94, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P94, 'Polyvinyl Alcohol', 'cleared', 'pva'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 50 servings of 2 tablets. The title says 500 mg. The panel is 1,000 mg per 2 tablets. Counted Limited token: maltodextrin. Dicalcium phosphate is a filler and is not on the facts. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-theanine-100-100',
    productName: 'Spring Valley L-Theanine 100 mg (100 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-theanine-100-100',
    form: 'capsule',
    activeIngredients: [
      { name: 'L-Theanine', strength: '100 mg per capsule' },
      { name: 'Calcium', strength: '54 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P96, 'Gelatin', 'cleared', 'gelatin'),
      flag(P96, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P96, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P96, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 100 count. Page text is a different excipient list and was not graded. Calcium is on the facts, so dicalcium phosphate is not graded. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-lemon-charcoal-cleanse-16',
    productName: 'Spring Valley Lemon Charcoal Colon Cleanse (16 fl oz)',
    category: 'Digestive',
    formulaId: 'springvalley-b274-lemon-charcoal-cleanse-16',
    form: 'liquid',
    activeIngredients: [
      { name: 'Proprietary Cleansing Blend', strength: '6.5 g per 4 fl oz' },
      { name: 'Activated Charcoal', strength: '500 mg per 4 fl oz' },
    ],
    inactiveIngredients: [
      flag(P97, 'Purified Water', 'cleared', 'water'),
      flag(P97, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P97, 'Sodium Hexametaphosphate', 'moderate', 'hexameta'),
      flag(P97, 'Potassium Sorbate', 'moderate', 'sorbate'),
      flag(P97, 'Sodium Benzoate', 'moderate', 'benzoate'),
      flag(P97, 'Rebaudioside A', 'limited', 'rebA'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 4 servings of 4 fl oz. Counted Limited tokens: natural flavors and rebaudioside A. That is two, so this is not a 3+ stack. Sodium hexametaphosphate, potassium sorbate, and sodium benzoate are Caution and do not stack. Page text calls sodium hexametaphosphate an active and names DirtDetox. The panel was graded. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-lutein-20-30',
    productName: 'Spring Valley Lutein with Zeaxanthin 20 mg (30 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-lutein-20-30',
    form: 'softgel',
    activeIngredients: [{ name: 'Lutein (contains zeaxanthin)', strength: '20 mg per softgel' }],
    inactiveIngredients: luteinFlags(P99),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 30 count. Sunflower oil and safflower oil are softgel fill. Counted Limited tokens: none. Honest note names both oils. Not the 90-count. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-lutein-20-90',
    productName: 'Spring Valley Lutein with Zeaxanthin 20 mg (90 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-lutein-20-90',
    form: 'softgel',
    activeIngredients: [{ name: 'Lutein (contains zeaxanthin)', strength: '20 mg per softgel' }],
    inactiveIngredients: luteinFlags(P100),
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. Servings are not on the panel. This listing is 90 count. Same formula as the 30-count. Sunflower oil and safflower oil are softgel fill. Counted Limited tokens: none. Honest note names both oils. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-maca-500-90',
    productName: 'Spring Valley Maca 500 mg (90 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b274-maca-500-90',
    form: 'capsule',
    activeIngredients: [{ name: 'Organic Maca (root)', strength: '500 mg per capsule' }],
    inactiveIngredients: [
      flag(P101, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P101, 'Rice Hull', 'cleared', 'riceHull'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. Servings are not on the panel. This listing is 90 count. Page inactive is a different capsule and rice line. The panel was graded. The facility line is a disclosure. Counted Limited tokens: none. Honest note names rice hull. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-mag-glycinate-gummy-100-60',
    productName: 'Spring Valley Magnesium Glycinate 100 mg (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-mag-glycinate-gummy-100-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Magnesium (as magnesium bisglycinate)', strength: '100 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P102, 'Sugar', 'moderate', 'sugar'),
      flag(P102, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P102, 'Citric Acid', 'cleared', 'citric'),
      flag(P102, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P102, 'Pectin', 'cleared', 'pectin'),
      flag(P102, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P102, 'Organic Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 30 servings of 2 gummies. Counted Limited token: natural flavors. Sugar and maltitol syrup are Caution and do not stack. No honest note. Not the 50 mg kids gummy and not the powder. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-mag-ashwagandha-theanine-60',
    productName: 'Spring Valley Magnesium, Ashwagandha, and L-Theanine (60 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-mag-ashwagandha-theanine-60',
    form: 'tablet',
    activeIngredients: [
      { name: 'Magnesium (as magnesium aspartate)', strength: '200 mg per tablet' },
      { name: 'Sensoril Ashwagandha (root and leaf) extract', strength: '125 mg per tablet' },
      { name: 'L-Theanine', strength: '50 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P103, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P103, 'Hydroxypropyl Cellulose', 'cleared', 'hpc'),
      flag(P103, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P103, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P103, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P103, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P103, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P103, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P103, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P103, 'Silica', 'limited', 'silica'),
      flag(P103, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. Servings are not on the panel. This listing is 60 count. Counted Limited tokens: maltodextrin and polyethylene glycol. That is two, so this is not a 3+ stack. Silica is the 0-pt cap and does not stack. No honest note. Magnesium, ashwagandha, and L-theanine are on the facts and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-magnesium-250-100',
    productName: 'Spring Valley Magnesium Oxide 250 mg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-magnesium-250-100',
    form: 'tablet',
    activeIngredients: [
      { name: 'Magnesium (as magnesium oxide)', strength: '250 mg per tablet' },
      { name: 'Calcium', strength: '28.6 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P104, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P104, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P104, 'Carboxymethylcellulose Sodium', 'cleared', 'cmc'),
      flag(P104, 'Citric Acid', 'cleared', 'citric'),
      flag(P104, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P104, 'Silica', 'limited', 'silica'),
      flag(P104, 'Starch', 'cleared', 'starch'),
      flag(P104, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 100 count. Page inactive adds talc and sodium lauryl sulfate. The panel was graded. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Magnesium oxide and calcium carbonate are the actives and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-magnesium-400-250',
    productName: 'Spring Valley Magnesium Oxide 400 mg (250 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-magnesium-400-250',
    form: 'tablet',
    activeIngredients: [
      { name: 'Magnesium (as magnesium oxide)', strength: '400 mg per tablet' },
      { name: 'Calcium', strength: '53 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P105, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P105, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P105, 'Povidone', 'cleared', 'povidone'),
      flag(P105, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P105, 'Carboxymethylcellulose Sodium', 'cleared', 'cmc'),
      flag(P105, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P105, 'Citric Acid', 'cleared', 'citric'),
      flag(P105, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P105, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P105, 'Polydextrose', 'limited', 'polydextrose'),
      flag(P105, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P105, 'Starch', 'cleared', 'starch'),
      flag(P105, 'Talc', 'high', 'talc'),
      flag(P105, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. Specifications say 250 servings. Avoid from talc and titanium dioxide (color). Counted Limited tokens: medium chain triglycerides and polydextrose. That is two, so this is not a 3+ stack. Page inactive is a different formula and was not graded. No honest note. Not the 100-count 250 mg tablet. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-mag-glycinate-200-120',
    productName: 'Spring Valley Magnesium Glycinate 200 mg (120 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-mag-glycinate-200-120',
    form: 'capsule',
    activeIngredients: [{ name: 'Magnesium (as magnesium glycinate)', strength: '200 mg per 2 capsules' }],
    inactiveIngredients: [
      flag(P106, 'Vegetarian Capsule', 'moderate', 'vegCapsuleBare'),
      flag(P106, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
      flag(P106, 'Silica', 'limited', 'silica'),
      flag(P106, 'Rice Powder', 'cleared', 'ricePowder'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 60 servings of 2 capsules. Vegetarian capsule does not name hypromellose or pullulan, so it is Caution and does not stack. Silica is the 0-pt cap and does not stack. Rice powder is Cleared and is not rice flour. Counted Limited tokens: none. No honest note. Not the powder and not the 100 mg gummy. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-magnesium-gummy-165-60',
    productName: 'Spring Valley Magnesium Citrate Gummies 165 mg, Orange (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-magnesium-gummy-165-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Magnesium (as magnesium citrate)', strength: '165 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P107, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P107, 'Sugar', 'moderate', 'sugar'),
      flag(P107, 'Agar', 'cleared', 'gum'),
      flag(P107, 'Citric Acid', 'cleared', 'citric'),
      flag(P107, 'Locust Bean Gum', 'cleared', 'gum'),
      flag(P107, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P107, 'Organic Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P107, 'Tapioca Starch', 'cleared', 'tapiocaStarch'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. 30 servings of 2 gummies. Counted Limited token: natural flavors. Sugar and organic annatto extract (color) are Caution and do not stack. Page text says organic tapioca starch. The panel says tapioca starch, and that panel word was graded. No honest note. Not the 250 mg citrate gummies. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-mag-sleep-200-60',
    productName: 'Spring Valley Magnesium Sleep Support 200 mg (60 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-mag-sleep-200-60',
    form: 'capsule',
    activeIngredients: [
      {
        name: 'Magnesium (as magnesium bisglycinate chelate buffered and magnesium oxide)',
        strength: '200 mg per 2 capsules',
      },
    ],
    inactiveIngredients: [
      flag(P108, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P108, 'Hypromellose (Vegetarian Capsule)', 'cleared', 'hpmc'),
      flag(P108, 'White Rice Flour', 'moderate', 'riceFlour'),
      flag(P108, 'Silicon Dioxide', 'limited', 'silica'),
      flag(P108, 'Calcium Stearate', 'cleared', 'stearic'),
      flag(P108, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. 30 servings of 2 capsules. White rice flour is Caution and does not stack. Silicon dioxide is the 0-pt cap and does not stack. Hypromellose is named, so the shell is Cleared. Counted Limited tokens: none. No honest note. Page text is shorter and was not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-omega3-algal-2000-60',
    productName: 'Spring Valley Maximum Care Omega-3 from Algal Oil 2,000 mg (60 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-omega3-algal-2000-60',
    form: 'softgel',
    activeIngredients: [
      { name: 'Total Omega-3 fatty acids (as ethyl esters)', strength: '2,000 mg per 2 softgels' },
      { name: 'Vitamin D', strength: '25 mcg (1,000 IU) per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(P109, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
      flag(P109, 'Glycerin', 'cleared', 'glycerin'),
      flag(P109, 'Water', 'cleared', 'water'),
      flag(P109, 'Natural Lemon Flavor', 'cleared', 'namedFruit'),
      flag(P109, 'Tocopherols', 'cleared', 'tocopherols'),
      flag(P109, 'Corn Oil', 'cleared', 'cornFill'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 30 servings of 2 softgels. Pickup and delivery are in stock. Shipping is not available. Corn oil is softgel fill. Natural lemon flavor is the named fruit-flavor row. Counted Limited tokens: none. Honest note names corn oil. Algal oil and vitamin D are the actives and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-omega3-fish-2000-120',
    productName: 'Spring Valley Maximum Care Omega-3 from Fish Oil 2,000 mg (120 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-omega3-fish-2000-120',
    form: 'softgel',
    activeIngredients: [
      { name: 'Omega-3 fatty acids (as ethyl esters)', strength: '2,000 mg per 2 softgels' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '25 mcg (1,000 IU) per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(P110, 'Gelatin (Bovine)', 'cleared', 'gelatin'),
      flag(P110, 'Glycerin', 'cleared', 'glycerin'),
      flag(P110, 'Water', 'cleared', 'water'),
      flag(P110, 'Natural Lemon Flavor', 'cleared', 'namedFruit'),
      flag(P110, 'Mixed Natural Tocopherols', 'cleared', 'mixedToco'),
      flag(P110, 'Corn Oil', 'cleared', 'cornFill'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 60 servings of 2 softgels. Page text reorders the fish species. The panel was graded. Contains fish is a disclosure. Corn oil is softgel fill. Counted Limited tokens: none. Honest note names corn oil. Not the 1,000 mg fish oil rows. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-oregano-oil-2000-60',
    productName: 'Spring Valley Mediterranean Oil of Oregano (60 softgels)',
    category: 'Herbs',
    formulaId: 'springvalley-b274-oregano-oil-2000-60',
    form: 'softgel',
    activeIngredients: [
      {
        name: 'Oil of oregano extract (65:1, in extra virgin olive oil)',
        strength: '30.8 mg per softgel, equivalent to 2,000 mg leaf',
      },
    ],
    inactiveIngredients: [
      flag(P111, 'Gelatin', 'cleared', 'gelatin'),
      flag(P111, 'Vegetable Glycerin', 'cleared', 'glycerin'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. The title says 2,000 mg. The panel amount is 30.8 mg of a 65:1 extract, equivalent to 2,000 mg of oregano leaf, in a base of extra virgin olive oil. That olive oil is part of the active and is not graded. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-melatonin-gummy-5-60',
    productName: 'Spring Valley Melatonin Gummies 5 mg, Strawberry (60 gummies)',
    category: 'Sleep',
    formulaId: 'springvalley-b274-melatonin-gummy-5-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Melatonin', strength: '5 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P112, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P112, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P112, 'Pectin', 'cleared', 'pectin'),
      flag(P112, 'Citric Acid', 'cleared', 'citric'),
      flag(P112, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P112, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P112, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P112, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P112, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. 30 servings of 2 gummies. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. Page text is a gelatin formula and was not graded. No honest note. Not the kids 1 mg melatonin rows. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-mens-50-multi-150',
    productName: "Spring Valley Men's 50+ Multivitamin (150 tablets)",
    category: 'Vitamins',
    formulaId: 'springvalley-b274-mens-50-multi-150',
    form: 'tablet',
    activeIngredients: [{ name: "Men's 50+ multivitamin and mineral blend", strength: '1 tablet' }],
    inactiveIngredients: mensTabletFlags(P113, true),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 150 count. Counted Limited token: maltodextrin. Silica is the 0-pt cap and does not stack. Page text drops carnauba wax. The panel was graded. Vitamins, minerals, the fruit and vegetable blend, and boron are on the facts and are not graded. No honest note. Not the adult 365-count multi. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-mens-multi-150',
    productName: "Spring Valley Men's Multivitamin (150 tablets)",
    category: 'Vitamins',
    formulaId: 'springvalley-b274-mens-multi-150',
    form: 'tablet',
    activeIngredients: [{ name: "Men's multivitamin and mineral blend", strength: '1 tablet' }],
    inactiveIngredients: mensTabletFlags(P114, false),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. New Look. Servings are not on the panel. This listing is 150 count. Counted Limited token: maltodextrin. Silica is the 0-pt cap and does not stack. Page text drops carnauba wax. The panel was graded. This panel has no carboxymethylcellulose sodium. Turmeric powder and the fruit and vegetable blend are on the facts and are not graded. No honest note. Not the 50+ formula. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-mens-testosterone-30',
    productName: "Spring Valley Men's Ultimate Sexual Health and Testosterone (30 tablets)",
    category: 'Vitamins',
    formulaId: 'springvalley-b274-mens-testosterone-30',
    form: 'tablet',
    activeIngredients: [
      { name: 'Furosap fenugreek seed extract', strength: '500 mg per tablet' },
      { name: 'Zinc', strength: '11 mg per tablet' },
      { name: 'Selenium', strength: '55 mcg per tablet' },
      { name: 'Boron', strength: '3 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P115, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P115, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P115, 'Calcium Silicate', 'moderate', 'calciumSilicate'),
      flag(P115, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P115, 'Sodium Starch Glycolate', 'cleared', 'ssg'),
      flag(P115, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P115, 'Hydroxypropyl Cellulose', 'cleared', 'hpc'),
      flag(P115, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P115, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P115, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P115, 'Silica', 'limited', 'silica'),
      flag(P115, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. Servings are not on the panel. This listing is 30 count. Counted Limited token: polyethylene glycol. Calcium silicate is Caution and does not stack. Silica is the 0-pt cap and does not stack. No honest note. Fenugreek, sodium borate, sodium selenate, and zinc oxide are the actives and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-menopause-estrog-30',
    productName: 'Spring Valley Menopause Support with Estro-G 100 (30 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b274-menopause-estrog-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'EstroG-100 herbal extract blend', strength: '514 mg per capsule' },
      { name: 'GABA', strength: '50 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P116, 'Gelatin', 'cleared', 'gelatin'),
      flag(P116, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P116, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P116, 'Silica', 'limited', 'silica'),
      flag(P116, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. Walmart panel image is the single source. Servings are not on the panel. This listing is 30 count. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. A bottle-back line says may contain sulfites. Sulfites are not printed as an ingredient. Estro-G and GABA are the actives and are not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-multi-probiotic-fiber-60',
    productName: 'Spring Valley Multi plus Probiotic and Fiber Gummies (60 gummies)',
    category: 'Digestive',
    formulaId: 'springvalley-b274-multi-probiotic-fiber-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Bacillus coagulans', strength: '1 billion CFU per 2 gummies' },
      { name: 'Dietary fiber', strength: '3 g per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P117, 'Cane Sugar', 'cleared', 'caneSugar'),
      flag(P117, 'Annatto (Color)', 'moderate', 'annatto'),
      flag(P117, 'Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P117, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P117, 'Choline Bitartrate', 'cleared', 'cholineBit'),
      flag(P117, 'Citric Acid', 'cleared', 'citric'),
      flag(P117, 'Cornstarch', 'cleared', 'cornStarch'),
      flag(P117, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P117, 'Genipap Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P117, 'Lactic Acid', 'cleared', 'lactic'),
      flag(P117, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P117, 'Pectin', 'cleared', 'pectin'),
      flag(P117, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P117, 'Watermelon Juice Concentrate (Color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. The other-ingredients line is a separate bottle-back image. 30 servings of 2 gummies. Counted Limited token: natural flavors. Annatto (color) is Caution and does not stack. Honest note names fractionated coconut oil. Inulin is the fiber on the facts and is not graded. The probiotic and the vitamins are not graded. Choline is not on the facts, so choline bitartrate is graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-multi-omega3-gummy-60',
    productName: 'Spring Valley Multivitamin plus Omega-3 Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-multi-omega3-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Algal oil', strength: '200 mg per 2 gummies' },
      { name: 'Multivitamin and mineral blend', strength: '2 gummies' },
    ],
    inactiveIngredients: [
      flag(P118, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P118, 'Cane Sugar', 'cleared', 'caneSugar'),
      flag(P118, 'Ascorbic Acid (for Freshness)', 'cleared', 'ascorbic'),
      flag(P118, 'Choline Bitartrate', 'cleared', 'cholineBit'),
      flag(P118, 'Citric Acid', 'cleared', 'citric'),
      flag(P118, 'Green Tea Extract (for Freshness)', 'moderate', 'greenTea'),
      flag(P118, 'Mixed Tocopherols (for Freshness)', 'cleared', 'mixedToco'),
      flag(P118, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P118, 'Org Black Carrot Juice (Color)', 'cleared', 'juice'),
      flag(P118, 'Organic Turmeric Extract (Color)', 'cleared', 'turmericColor'),
      flag(P118, 'Pectin', 'cleared', 'pectin'),
      flag(P118, 'Rosemary Extract (for Freshness)', 'moderate', 'rosemary'),
      flag(P118, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. The other-ingredients line is a separate image. 30 servings of 2 gummies. The opened title is Multivitamin + Omega-3, 60 gummies, and the count matches the index. Counted Limited token: natural flavors. Green tea extract and rosemary extract are Caution and do not stack. The panel prints Org Black Carrot Juice. That is the black carrot juice color. Ascorbic acid for freshness is the preservative. Vitamin C on the facts is not graded again. Algal oil and inositol are the actives and are not graded. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-multi-gummy-120',
    productName: 'Spring Valley Multivitamin Vegetarian Gummies (120 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-multi-gummy-120',
    form: 'gummy',
    activeIngredients: [{ name: 'Multivitamin and mineral blend', strength: '2 gummies' }],
    inactiveIngredients: multiGummyFlags(P119),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. The other-ingredients line is a separate image. 60 servings of 2 gummies. The opened title is Multivitamin Vegetarian Gummies, 120 count, and the count matches the index. Counted Limited token: natural flavors. Honest note names fractionated coconut oil. Page text omits choline bitartrate. The separate image was graded. Vitamins and inositol are the actives and are not graded. Not the 240-count and not the kids multis. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b274-multi-gummy-240',
    productName: 'Spring Valley Multivitamin Vegetarian Gummies (240 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b274-multi-gummy-240',
    form: 'gummy',
    activeIngredients: [{ name: 'Multivitamin and mineral blend', strength: '2 gummies' }],
    inactiveIngredients: multiGummyFlags(P120),
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 91–120. The other-ingredients line is a separate image. 120 servings of 2 gummies. The opened title is Multivitamin Vegetarian Gummies, 240 count, and the count matches the index. Same formula as the 120-count. Counted Limited token: natural flavors. Honest note names fractionated coconut oil. Page text omits choline bitartrate. The separate image was graded. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH274_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; counted: string }> = {
  'springvalley-b274-carnitine-500-30': { verdict: 'avoid', counted: 'Polyethylene Glycol' },
  'springvalley-b274-arginine-1000-100': { verdict: 'caution', counted: '' },
  'springvalley-b274-arginine-1000-50': { verdict: 'caution', counted: '' },
  'springvalley-b274-glutamine-500-100': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b274-theanine-100-100': { verdict: 'caution', counted: '' },
  'springvalley-b274-lemon-charcoal-cleanse-16': {
    verdict: 'caution',
    counted: 'Natural Flavors|Rebaudioside A',
  },
  'springvalley-b274-lutein-20-30': { verdict: 'clean', counted: '' },
  'springvalley-b274-lutein-20-90': { verdict: 'clean', counted: '' },
  'springvalley-b274-maca-500-90': { verdict: 'clean', counted: '' },
  'springvalley-b274-mag-glycinate-gummy-100-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b274-mag-ashwagandha-theanine-60': {
    verdict: 'caution',
    counted: 'Maltodextrin|Polyethylene Glycol',
  },
  'springvalley-b274-magnesium-250-100': { verdict: 'caution', counted: '' },
  'springvalley-b274-magnesium-400-250': {
    verdict: 'avoid',
    counted: 'Medium Chain Triglycerides|Polydextrose',
  },
  'springvalley-b274-mag-glycinate-200-120': { verdict: 'caution', counted: '' },
  'springvalley-b274-magnesium-gummy-165-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b274-mag-sleep-200-60': { verdict: 'caution', counted: '' },
  'springvalley-b274-omega3-algal-2000-60': { verdict: 'clean', counted: '' },
  'springvalley-b274-omega3-fish-2000-120': { verdict: 'clean', counted: '' },
  'springvalley-b274-oregano-oil-2000-60': { verdict: 'clean', counted: '' },
  'springvalley-b274-melatonin-gummy-5-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b274-mens-50-multi-150': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b274-mens-multi-150': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b274-mens-testosterone-30': { verdict: 'caution', counted: 'Polyethylene Glycol' },
  'springvalley-b274-menopause-estrog-30': { verdict: 'caution', counted: '' },
  'springvalley-b274-multi-probiotic-fiber-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b274-multi-omega3-gummy-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b274-multi-gummy-120': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b274-multi-gummy-240': { verdict: 'caution', counted: 'Natural Flavors' },
};

const NOTE_IDS = new Set([
  'springvalley-b274-lutein-20-30',
  'springvalley-b274-lutein-20-90',
  'springvalley-b274-maca-500-90',
  'springvalley-b274-omega3-algal-2000-60',
  'springvalley-b274-omega3-fish-2000-120',
  'springvalley-b274-multi-probiotic-fiber-60',
  'springvalley-b274-multi-gummy-120',
  'springvalley-b274-multi-gummy-240',
]);

if (ROWS.length !== 28) throw new Error(`batch274 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch274 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch274 brand ${record.id}`);
  if (record.barcode) throw new Error(`batch274 upc ${record.id}`);
  if (record.audience !== 'adult' || record.minAge !== 18) throw new Error(`batch274 adult ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch274 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch274 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch274 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (stackNote) throw new Error(`batch274 unexpected stack note ${record.id} ${stackNote}`);
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch274 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch274 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch274 pending ${ingredient.name}`);
    }
  }
}
