// DRAFT / not verified / batch 273 KYR6-d (t41u Spring Valley packs 61-90).
// House brand sold only through Walmart. The Walmart panel image is the single source (t41u).
// Not in this file:
// - Flaxseed Oil 1,000 mg, 100 softgels. Single and 3-pack are out of stock. Closed as not for sale.
// - Healthy Aging 50+ Vitality Probiotic with Zinc, 30 capsules. Stock was not shown.
// - High Potency Probiotic Gummies, 60 count. No Supplement Facts panel image.

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
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  riceHull: 'Methodology §5 Cleared (Rice Hull — rice hulls / rice hull concentrate family; t119u / t120u).',
  riceBran: 'Methodology §5 Cleared (rice bran — rice bran plant-fiber family; t111u).',
  tapiocaSyrup:
    'Methodology §5 Cleared (organic tapioca syrup / tapioca syrup — cane sugar, glucose syrup, tapioca syrup/dextrose). Not tapioca maltodextrin.',
  organicSugar:
    'Methodology §5 Cleared (organic sugar — cane sugar row; t90u). Bare sugar stays Caution.',
  caneSugar: 'Methodology §5 Cleared (cane sugar — food sugar). Not bare sugar.',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose — t118u). Not bare sugar.',
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup — food syrup).',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar). Does not count toward the t137u stack.',
  peaStarch:
    'Methodology §5 Caution (organic pea starch / pea starch — Sept 22, 2026 founder restamp; was Limited). Does not count toward the t137u stack.',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts).',
  organicFlavors:
    'Methodology §5 Caution (Organic Flavors — unnamed natural flavor family; t100u). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor, singular — flavor family row). Not the Limited natural flavors mixture. Does not count toward the t137u stack.',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity). Counts toward the t137u stack.',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color.',
  monk: 'Methodology §5 Cleared (monk fruit / organic monk fruit extract — high-purity sweetener).',
  riceConcentrate:
    'Methodology §5 Cleared (Rice Concentrate — exact token on the organic rice hull extract / rice concentrate / ground rice hulls row).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent). Counts toward the t137u stack.',
  carrageenan:
    'Methodology §5 Limited (Carrageenan — Sept 28, 2026). Counts toward the t137u stack.',
  potassiumAcetate: 'Methodology §5 Cleared (potassium acetate — Sept 23, 2026).',
  calciumCarbonate:
    'Methodology §5 Cleared (calcium carbonate as a filler). Not the mineral active.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
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
  tio2: 'Methodology §5 High (titanium dioxide (color), including capsule coloring agent).',
  crospovidone: 'Methodology §5 Cleared (crospovidone — povidone family).',
  bht: 'Methodology §5 High (BHT — EU 2022 restriction for endocrine disruption).',
  potatoStarch: 'Methodology §5 Cleared (potato starch — named simple starch).',
  vegCap:
    'Methodology §5 Cleared (vegetable capsule (hypromellose, gellan gum) — HPMC family; t118u).',
  ascorbic:
    'Methodology §5 Cleared (ascorbic acid as a preservative — ascorbate family).',
  pectin: 'Methodology §5 Cleared (pectin / standard food gums).',
  carnauba: 'Methodology §5 Cleared (carnauba wax, including organic — founder lock t133u).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate salts).',
  sunflowerGummy:
    'Methodology §5 High (organic sunflower oil in a gummy — seed/industrial oils in gummies / lozenges).',
  fractionated:
    'Methodology §5 Cleared (fractionated coconut oil in a gummy — named coconut oil; not the seed-oil gummy flag).',
  fdc: 'Methodology §5 High (FD&C dye / aluminum lake — synthetic dye family).',
  mct:
    'Methodology §5 Limited (medium chain triglycerides with no plant named — founder lock t132u). Counts toward the t137u stack.',
  carmine:
    'Methodology §5 Caution (carmine / cochineal — Not Avoid). Does not count toward the t137u stack.',
  dextrin:
    'Methodology §5 Caution (bare dextrin — Sept 22, 2026). Distinct from Limited tapioca dextrin. Does not count toward the t137u stack.',
  maltitolSyrup:
    'Methodology §5 Caution (maltitol syrup — maltitol solution; Sept 26, 2026). Distinct from Limited maltitol powder. Does not count toward the t137u stack.',
  isomalt:
    'Methodology §5 Caution (isomalt — founder restamp Sept 25, 2026; was Limited). Does not count toward the t137u stack.',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  annatto:
    'Methodology §5 Caution (Annatto Seed Extract (color) / annatto extract (color) — annatto row; t107u). Does not count toward the t137u stack.',
  inulin: 'Methodology §5 Cleared (inulin as fiber — Sept 14, 2026).',
  xylitol:
    'Methodology §5 Caution (xylitol — sugar alcohol; GI effects at volume). Does not count toward the t137u stack.',
  lactic: 'Methodology §5 Cleared (lactic acid — organic acid).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P61 =
  'Walmart panel image. New Look. Page directions say one softgel daily. The panel says three times daily. Page ingredients are blank. Contains fish and soy is a disclosure. Not the 1,000 mg 300-count. t41u house-brand single source.';
const P62 =
  'Walmart panel image. Page text spells Gelati. The panel says Gelatin. Flaxseed oil is the active and is not graded. t41u house-brand single source.';
const P64 =
  'Walmart panel image. New Look. Page ingredient accordions are blank. Flaxseed oil is the active and is not graded. t41u house-brand single source.';
const P65 =
  'Walmart panel image. New Look. The title says 500 mg. The panel splits inositol hexanicotinate into 400 mg niacin and 100 mg inositol. Not the 60-count. t41u house-brand single source.';
const P66 =
  'Walmart panel image. Total Count 100. The crop does not print servings per container. The facility line is a disclosure. t41u house-brand single source.';
const P67 =
  'Walmart panel image. Page text uses the same items without the less-than-2% split. Iron is the active and is not graded. t41u house-brand single source.';
const P68 =
  'Walmart panel image. Page text says rice extract, rice hulls, and organic rice hull concentrate. The panel says rice hull and rice bran. Ginger is the active and is not graded. t41u house-brand single source.';
const P69 =
  'Walmart panel image. New Look. Page text lists only hydroxypropyl methylcellulose and organic rice concentrate. The panel was graded. t41u house-brand single source.';
const P70 =
  'Walmart panel image. Page text adds croscarmellose sodium and stearic acid and drops microcrystalline cellulose, colloidal silicon dioxide, and magnesium stearate. The panel was graded. Calcium carbonate is a filler. Ginkgo is the active and is not graded. t41u house-brand single source.';
const P71 =
  'Walmart panel image. 30 servings of 2 tablets. Glucosamine, turmeric, and BioPerine are on the facts and are not graded. Contains shellfish is a disclosure. t41u house-brand single source.';
const P72 =
  'Walmart panel image. Servings per container are not on the panel. The Walmart listing is 200 count. Glucosamine sulfate is the active and is not graded. Contains crab and shrimp is a disclosure. t41u house-brand single source.';
const P73 =
  'Walmart panel image. New Look. 80 servings of 3 caplets, Total Count 240. Nutrients on the Supplement Facts are not graded. BHT is a preservative and is graded. t41u house-brand single source.';
const P75 =
  'Walmart bottle photo, flat-lit and legible. The flat Supplement Facts image has no inactive line. The bottle photo is the readable panel. Page text matches that line. Probiotic blend is the active and is not graded. t41u house-brand single source.';
const P76 =
  'Walmart panel image. About 30 servings. Page text lists the same silicon dioxide. Magnesium glycinate is the active and is not graded. t41u house-brand single source.';
const P78 =
  'Walmart panel image. Not the plain elderberry 60 or 120. Maltodextrin inside the elderberry complex is an active and is not graded. The panel prints Arial Parts. Page text drops echinacea. The panel was graded. t41u house-brand single source.';
const P79 =
  'Walmart panel image. Page text lists the same items, reordered, and includes zinc. Zinc is the active and is not graded. t41u house-brand single source.';
const P80 =
  'Walmart panel image. The other-ingredients line is a separate carousel image, not page text. Page ingredients are blank. Iron is the active and is not graded. t41u house-brand single source.';
const P81 =
  'Walmart panel image. New Look. Total Count 100. Not the 200-count. Page text adds ethanol. The panel has no ethanol. Ferrous sulfate is the active and is not graded. t41u house-brand single source.';
const P82 =
  'Walmart panel image. New Look. Total Count 250. Page text adds ethanol and drops dextrin. The panel was graded. Calcium carbonate and ferrous sulfate are the actives and are not graded. t41u house-brand single source.';
const P83 =
  'Walmart panel image. The other-ingredients line is a separate carousel image. Page text cuts the other-ingredients label. The panel does not state a minimum age. Magnesium is the active and is not graded. t41u house-brand single source.';
const P84 =
  'Walmart panel image. Page text matches the panel. Vitamin D, the probiotic, inulin, and the supergreens blend are on the facts and are not graded. The panel does not state a minimum age. t41u house-brand single source.';
const P85 =
  'Walmart panel image. The other-ingredients line is a separate carousel image. Ages 2–3 take 1 gummy. The bottle is 60 gummies. Calcium, vitamin D, and phosphorus are actives and are not graded. t41u house-brand single source.';
const P86 =
  'Walmart panel image only. The page also prints a gummy-style inactive list. That list was not graded. Melatonin is the active and is not graded. Ages 3 and older. t41u house-brand single source.';
const P87 =
  'Walmart panel image only. The page also prints an older agar formula. That list was not graded. Melatonin is the active and is not graded. Ages 4 and older. t41u house-brand single source.';
const P88 =
  'Walmart panel image. The other-ingredients line is a separate carousel image. Ages 2–3 take 1 gummy. This bottle is 120 gummies. Vitamins and minerals on the facts are not graded. t41u house-brand single source.';
const P89 =
  'Walmart panel image. The other-ingredients line is a separate carousel image and matches the 120-count. This bottle is 60 gummies. Vitamins and minerals on the facts are not graded. t41u house-brand single source.';
const P90 =
  'Walmart bottle-back photo, flat-lit. Page text matches the panel. Krill oil is the active and is not graded. Contains krill is a disclosure. t41u house-brand single source.';

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

export const BATCH273_KYR6D_T41U_SV: RatingRecord[] = [
  row({
    id: 'springvalley-b273-fish-oil-1000-60',
    productName: 'Spring Valley Fish Oil 1,000 mg Omega-3 (60 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-fish-oil-1000-60',
    form: 'softgel',
    activeIngredients: [{ name: 'Fish Oil', strength: '1,000 mg per softgel' }],
    inactiveIngredients: [
      flag(P61, 'Gelatin', 'cleared', 'gelatin'),
      flag(P61, 'Glycerin', 'cleared', 'glycerin'),
      flag(P61, 'Purified Water', 'cleared', 'water'),
      flag(P61, 'Mixed Natural Tocopherols', 'cleared', 'mixedToco'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. New Look. Page directions say one softgel daily. The panel says three times daily. Contains anchovies, herring, jack, mackerel, sardines, and soy is a disclosure. Fish oil is the active and is not graded. Not springvalley-b242-fish-oil-1000-300. Clean. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-flax-1400-90',
    productName: 'Spring Valley Organic Flaxseed Oil 1,400 mg (90 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-flax-1400-90',
    form: 'softgel',
    activeIngredients: [{ name: 'Organic Flax Seed Oil', strength: '1,400 mg per softgel' }],
    inactiveIngredients: [
      flag(P62, 'Gelatin', 'cleared', 'gelatin'),
      flag(P62, 'Glycerin', 'cleared', 'glycerin'),
      flag(P62, 'Water', 'cleared', 'water'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Page text spells Gelati. The panel says Gelatin. Flaxseed oil is the active and is not graded. Clean. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-flax-1200-200',
    productName: 'Spring Valley Organic Flaxseed Oil 1,200 mg (200 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-flax-1200-200',
    form: 'softgel',
    activeIngredients: [{ name: 'Flaxseed Oil', strength: '1,200 mg per softgel' }],
    inactiveIngredients: [
      flag(P64, 'Gelatin', 'cleared', 'gelatin'),
      flag(P64, 'Glycerin', 'cleared', 'glycerin'),
      flag(P64, 'Purified Water', 'cleared', 'water'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. New Look. The 1,000 mg 100-count is out of stock and is not this row. Flaxseed oil is the active and is not graded. Clean. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-niacin-flushfree-240',
    productName: 'Spring Valley Flush Free Niacin 500 mg (240 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-niacin-flushfree-240',
    form: 'capsule',
    activeIngredients: [
      { name: 'Niacin (as inositol hexanicotinate)', strength: '400 mg per capsule' },
      { name: 'Inositol (as inositol hexanicotinate)', strength: '100 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P65, 'Gelatin', 'cleared', 'gelatin'),
      flag(P65, 'Vegetable Stearic Acid', 'cleared', 'stearic'),
      flag(P65, 'Silica', 'limited', 'silica'),
      flag(P65, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. New Look. Not springvalley-b234-flush-free-niacin-60. The title says 500 mg. The panel is 400 mg niacin plus 100 mg inositol from the same inositol hexanicotinate. Silica is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-gaba-750-100',
    productName: 'Spring Valley GABA 750 mg (100 capsules)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-gaba-750-100',
    form: 'capsule',
    activeIngredients: [{ name: 'GABA (gamma-aminobutyric acid)', strength: '750 mg per capsule' }],
    inactiveIngredients: [
      flag(P66, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P66, 'Rice Hull', 'cleared', 'riceHull'),
      flag(P66, 'Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Total Count 100. The crop does not print servings per container. The facility line is a disclosure. GABA is the active and is not graded. Clean. Counted Limited tokens: none. Honest note names rice hull. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-iron-gummy-9-60',
    productName: 'Spring Valley Iron Gummies 9 mg, Mixed Berries (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-iron-gummy-9-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Iron (as ferric saccharate)', strength: '9 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P67, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P67, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P67, 'Organic Pea Starch', 'moderate', 'peaStarch'),
      flag(P67, 'Citric Acid', 'cleared', 'citric'),
      flag(P67, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P67, 'Organic Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P67, 'Organic Monk Fruit Extract', 'cleared', 'monk'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. 30 servings of 2 gummies. Organic pea starch and organic flavors are Caution and do not stack. Counted Limited tokens: none. No honest note. Iron is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-ginger-550-100',
    productName: 'Spring Valley Organic Ginger Root 550 mg (100 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b273-ginger-550-100',
    form: 'capsule',
    activeIngredients: [{ name: 'Organic Ginger Root', strength: '550 mg per capsule' }],
    inactiveIngredients: [
      flag(P68, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(P68, 'Rice Hull', 'cleared', 'riceHull'),
      flag(P68, 'Rice Bran', 'cleared', 'riceBran'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Page text says rice extract, rice hulls, and organic rice hull concentrate. The panel says rice hull and rice bran. Ginger is the active and is not graded. Clean. Counted Limited tokens: none. Honest note names rice hull. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-ginkgo-120-90',
    productName: 'Spring Valley Ginkgo Biloba Extract 120 mg (90 capsules)',
    category: 'Herbs',
    formulaId: 'springvalley-b273-ginkgo-120-90',
    form: 'capsule',
    activeIngredients: [
      { name: 'Ginkgo Biloba Extract (leaf)', strength: '120 mg per capsule' },
      { name: 'Organic Ginkgo Biloba (leaf) powder', strength: '200 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(P69, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P69, 'Rice Concentrate', 'cleared', 'riceConcentrate'),
      flag(P69, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P69, 'Carrageenan', 'limited', 'carrageenan'),
      flag(P69, 'Potassium Acetate', 'cleared', 'potassiumAcetate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. New Look. Page text lists only hydroxypropyl methylcellulose and organic rice concentrate. Counted Limited tokens: maltodextrin and carrageenan. That is two, so this is not a 3+ stack. Honest note names rice concentrate. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-ginkgo-60-240',
    productName: 'Spring Valley Ginkgo Biloba 60 mg (240 tablets)',
    category: 'Herbs',
    formulaId: 'springvalley-b273-ginkgo-60-240',
    form: 'tablet',
    activeIngredients: [{ name: 'Ginkgo Biloba Extract (leaf)', strength: '60 mg per tablet' }],
    inactiveIngredients: [
      flag(P70, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P70, 'Calcium Carbonate', 'cleared', 'calciumCarbonate'),
      flag(P70, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P70, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P70, 'Colloidal Silicon Dioxide', 'limited', 'silica'),
      flag(P70, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P70, 'Glycerin', 'cleared', 'glycerin'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Page text is a different excipient list and was not graded. Counted Limited token: maltodextrin. Colloidal silicon dioxide is the 0-pt cap and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-glucosamine-turmeric-60',
    productName: 'Spring Valley Glucosamine plus Turmeric and Black Pepper (60 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-glucosamine-turmeric-60',
    form: 'tablet',
    activeIngredients: [
      { name: 'Glucosamine Hydrochloride', strength: '1,500 mg per 2 tablets' },
      { name: 'Turmeric Complex', strength: '500 mg per 2 tablets' },
      { name: 'BioPerine Black Pepper Extract', strength: '5 mg per 2 tablets' },
    ],
    inactiveIngredients: [
      flag(P71, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P71, 'Povidone', 'cleared', 'povidone'),
      flag(P71, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P71, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(P71, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P71, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P71, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P71, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. 30 servings of 2 tablets. Glucosamine, turmeric powder, turmeric extract, and BioPerine are on the facts and are not graded. Contains crustacean shellfish is a disclosure. Counted Limited token: polyethylene glycol. Silica is the 0-pt cap and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-glucosamine-sulfate-1000-200',
    productName: 'Spring Valley Glucosamine Sulfate 1,000 mg (200 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-glucosamine-sulfate-1000-200',
    form: 'tablet',
    activeIngredients: [{ name: 'Glucosamine Sulfate Potassium Chloride', strength: '1,000 mg per tablet' }],
    inactiveIngredients: [
      flag(P72, 'Povidone', 'cleared', 'povidone'),
      flag(P72, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P72, 'Carboxymethylcellulose Sodium', 'cleared', 'cmc'),
      flag(P72, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P72, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P72, 'Polydextrose', 'limited', 'polydextrose'),
      flag(P72, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P72, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P72, 'Silica', 'limited', 'silica'),
      flag(P72, 'Talc', 'high', 'talc'),
      flag(P72, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Servings per container are not on the panel. The Walmart listing is 200 count. Avoid from talc and titanium dioxide (color). Counted Limited tokens: polydextrose and polyethylene glycol. That is two, so this is not a 3+ stack. Polyvinyl alcohol is the oral-coating Cleared row. Silica is the 0-pt cap and does not stack. No honest note. Glucosamine is the active and is not graded. Contains crab and shrimp is a disclosure. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-hair-skin-nails-240',
    productName: 'Spring Valley Hair, Skin and Nails (240 caplets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-hair-skin-nails-240',
    form: 'tablet',
    activeIngredients: [
      { name: 'Vitamin A', strength: '1,500 mcg RAE per 3 caplets' },
      { name: 'Vitamin C', strength: '60 mg per 3 caplets' },
      { name: 'Vitamin D', strength: '25 mcg per 3 caplets' },
      { name: 'Biotin', strength: '3,000 mcg per 3 caplets' },
      { name: 'Collagen (hydrolyzed gelatin)', strength: '50 mg per 3 caplets' },
    ],
    inactiveIngredients: [
      flag(P73, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P73, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P73, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P73, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P73, 'BHT (Preservative)', 'high', 'bht'),
      flag(P73, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P73, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P73, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(P73, 'Silica', 'limited', 'silica'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. New Look. 80 servings of 3 caplets. Vitamins, minerals, collagen, inositol, PABA, citrus bioflavonoids, rutin, and horsetail are on the facts and are not graded. Avoid from BHT (preservative). Counted Limited tokens: maltodextrin and polyethylene glycol. That is two, so this is not a 3+ stack. Silica is the 0-pt cap and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-skin-probiotic-10b-30',
    productName: 'Spring Valley Healthy Skin Probiotic 10 Billion CFU (30 capsules)',
    category: 'Digestive',
    formulaId: 'springvalley-b273-skin-probiotic-10b-30',
    form: 'capsule',
    activeIngredients: [{ name: 'Probiotic Blend', strength: '10 billion CFU per capsule' }],
    inactiveIngredients: [
      flag(P75, 'Potato Starch', 'cleared', 'potatoStarch'),
      flag(P75, 'Vegetable Capsule (Hypromellose, Gellan Gum)', 'cleared', 'vegCap'),
      flag(P75, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P75, 'Ascorbic Acid (Preservative)', 'cleared', 'ascorbic'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 61–90. The inactive line was read from the flat-lit bottle photo. That photo is a readable panel. The flat Supplement Facts image on the same page has no inactive line. Page text matches the bottle photo. This is not springvalley-b272-probiotic-10b-30. The probiotic blend is the active and is not graded. Clean. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-mag-glycinate-powder-30',
    productName: 'Spring Valley High Absorption Magnesium Glycinate Powder 250 mg (30 servings)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-mag-glycinate-powder-30',
    form: 'powder',
    activeIngredients: [{ name: 'Magnesium (as magnesium glycinate)', strength: '250 mg per scoop' }],
    inactiveIngredients: [flag(P76, 'Silicon Dioxide', 'limited', 'silica')],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. About 30 servings. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. Magnesium glycinate is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-immune-elderberry-gummy-60',
    productName: 'Spring Valley Immune Plus Elderberry Gummies (60 gummies)',
    category: 'Immune Support',
    formulaId: 'springvalley-b273-immune-elderberry-gummy-60',
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin C', strength: '180 mg per 2 gummies' },
      { name: 'Vitamin D', strength: '25 mcg per 2 gummies' },
      { name: 'Zinc', strength: '5 mg per 2 gummies' },
      { name: 'Elderberry Complex', strength: '50 mg per 2 gummies' },
      { name: 'Echinacea purpurea extract', strength: '10 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P78, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P78, 'Sugar', 'moderate', 'sugar'),
      flag(P78, 'Pectin', 'cleared', 'pectin'),
      flag(P78, 'Citric Acid', 'cleared', 'citric'),
      flag(P78, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P78, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P78, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P78, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Not springvalley-b270-elderberry-gummy-120 and not springvalley-b272-elderberry-gummy-60. Maltodextrin inside the elderberry complex is not graded. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. Sugar is Caution and does not stack. No honest note. The panel prints Arial Parts. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-zinc-gummy-22-60',
    productName: 'Spring Valley Zinc Gummies 22 mg, Grapefruit (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-zinc-gummy-22-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Zinc (as zinc citrate)', strength: '22 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P79, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P79, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P79, 'Organic Pea Starch', 'moderate', 'peaStarch'),
      flag(P79, 'Organic Lemon Juice Concentrate', 'cleared', 'juice'),
      flag(P79, 'Organic Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P79, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P79, 'Organic Flavors', 'moderate', 'organicFlavors'),
      flag(P79, 'Organic Monk Fruit Extract', 'cleared', 'monk'),
      flag(P79, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Avoid from organic sunflower oil in the gummy. Organic pea starch and organic flavors are Caution and do not stack. Counted Limited tokens: none. No honest note. Zinc is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-iron-gummy-18-60',
    productName: 'Spring Valley Iron Adult Gummies 18 mg, Blackberry Lemon (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-iron-gummy-18-60',
    form: 'gummy',
    activeIngredients: [{ name: 'Iron (as iron pyrophosphate)', strength: '18 mg per 2 gummies' }],
    inactiveIngredients: [
      flag(P80, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P80, 'Sugar', 'moderate', 'sugar'),
      flag(P80, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P80, 'Citric Acid', 'cleared', 'citric'),
      flag(P80, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P80, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P80, 'Pectin', 'cleared', 'pectin'),
      flag(P80, 'Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P80, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. The other-ingredients line is a separate carousel image. Counted Limited token: natural flavors. Sugar is Caution and does not stack. Honest note is the fractionated coconut oil sentence. Iron is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-iron-65-100',
    productName: 'Spring Valley Iron 65 mg (100 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-iron-65-100',
    form: 'tablet',
    activeIngredients: [{ name: 'Iron (as ferrous sulfate)', strength: '65 mg per tablet' }],
    inactiveIngredients: [
      flag(P81, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P81, 'Povidone', 'cleared', 'povidone'),
      flag(P81, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P81, 'FD&C Blue No. 1 Lake', 'high', 'fdc'),
      flag(P81, 'FD&C Yellow No. 6 Lake', 'high', 'fdc'),
      flag(P81, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P81, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(P81, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P81, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P81, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. New Look. Total Count 100. Not springvalley-b234-iron-65-200. Page text adds ethanol. The panel has no ethanol, so ethanol was not graded. Avoid from FD&C Blue No. 1 Lake, FD&C Yellow No. 6 Lake, and titanium dioxide (color). Counted Limited token: medium chain triglycerides. That is one, so this is not a 3+ stack. No honest note. Ferrous sulfate is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-iron-prenatal-27-250',
    productName: 'Spring Valley Prenatal Iron 27 mg (250 tablets)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-iron-prenatal-27-250',
    form: 'tablet',
    activeIngredients: [
      { name: 'Calcium (as calcium carbonate)', strength: '46 mg per tablet' },
      { name: 'Iron (as ferrous sulfate)', strength: '27 mg per tablet' },
    ],
    inactiveIngredients: [
      flag(P82, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(P82, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(P82, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P82, 'Carmine (Color)', 'moderate', 'carmine'),
      flag(P82, 'Citric Acid', 'cleared', 'citric'),
      flag(P82, 'Dextrin', 'moderate', 'dextrin'),
      flag(P82, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(P82, 'Medium Chain Triglycerides', 'limited', 'mct'),
      flag(P82, 'Polydextrose', 'limited', 'polydextrose'),
      flag(P82, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(P82, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P82, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. New Look. Total Count 250. Page text adds ethanol and drops dextrin. The panel was graded. Calcium and iron are the actives and are not graded. Avoid from titanium dioxide (color). Counted Limited tokens: maltodextrin, medium chain triglycerides, and polydextrose. Titanium dioxide sets Avoid, so there is no 3+ stack note. Carmine and dextrin are Caution and do not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-mag-gummy-kids-30',
    productName: "Spring Valley Kid's Magnesium Glycinate Gummies 50 mg (30 gummies)",
    category: 'Vitamins',
    formulaId: 'springvalley-b273-mag-gummy-kids-30',
    audience: 'kids',
    form: 'gummy',
    activeIngredients: [{ name: 'Magnesium (as magnesium bisglycinate)', strength: '50 mg per gummy' }],
    inactiveIngredients: [
      flag(P83, 'Sugar', 'moderate', 'sugar'),
      flag(P83, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P83, 'Citric Acid', 'cleared', 'citric'),
      flag(P83, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P83, 'Pectin', 'cleared', 'pectin'),
      flag(P83, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P83, 'Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      "t41u packs 61–90. Walmart panel image is the single source. The other-ingredients line is a separate carousel image. The panel does not state a minimum age, so none was added. Counted Limited token: natural flavors. Sugar and maltitol syrup are Caution and do not stack. No honest note. Magnesium is the active and is not graded. Missing UPC. No code was invented.",
    ],
  }),
  row({
    id: 'springvalley-b273-supergreens-gummy-60',
    productName: "Spring Valley Kid's Supergreens plus Prebiotic and Probiotic Gummies (60 gummies)",
    category: 'Digestive',
    formulaId: 'springvalley-b273-supergreens-gummy-60',
    audience: 'kids',
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin D', strength: '4 mcg per 2 gummies' },
      { name: 'Bacillus coagulans', strength: '2 billion CFU per 2 gummies' },
      { name: 'Inulin (chicory root fiber)', strength: '1.25 g per 2 gummies' },
      { name: 'Supergreens Blend', strength: '150 mg per 2 gummies' },
    ],
    inactiveIngredients: [
      flag(P84, 'Maltitol Syrup', 'moderate', 'maltitolSyrup'),
      flag(P84, 'Isomalt', 'moderate', 'isomalt'),
      flag(P84, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P84, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(P84, 'Citric Acid', 'cleared', 'citric'),
      flag(P84, 'Fractionated Coconut Oil', 'cleared', 'fractionated'),
      flag(P84, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P84, 'Pectin', 'cleared', 'pectin'),
      flag(P84, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(P84, 'Sucralose', 'limited', 'sucralose'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. The panel does not state a minimum age, so none was added. Vitamin D, the probiotic, inulin, and the supergreens blend are on the facts and are not graded. Avoid from three Limited tokens: maltodextrin, natural flavors, and sucralose. Maltitol syrup and isomalt are Caution and do not stack. Honest note names those three Limited tokens and the fractionated coconut oil form. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-kids-calcium-d3-60',
    productName: 'Spring Valley Kids Calcium plus Vitamin D3 Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-kids-calcium-d3-60',
    audience: 'kids',
    minAge: 2,
    form: 'gummy',
    activeIngredients: [
      { name: 'Calcium (as tricalcium phosphate)', strength: '110 mg per gummy, ages 2–3' },
      { name: 'Vitamin D', strength: '5.5 mcg per gummy, ages 2–3' },
      { name: 'Phosphorus (as tricalcium phosphate)', strength: '50 mg per gummy, ages 2–3' },
    ],
    inactiveIngredients: [
      flag(P85, 'Sucrose', 'cleared', 'sucrose'),
      flag(P85, 'Glucose Syrup', 'cleared', 'glucoseSyrup'),
      flag(P85, 'Gelatin', 'cleared', 'gelatin'),
      flag(P85, 'Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P85, 'Citric Acid', 'cleared', 'citric'),
      flag(P85, 'Lactic Acid', 'cleared', 'lactic'),
      flag(P85, 'Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P85, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P85, 'Pectin', 'cleared', 'pectin'),
      flag(P85, 'Purple Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. The other-ingredients line is a separate carousel image. Ages 2–3 take 1 gummy, so the minimum age is 2. 60 servings of 1 gummy. Counted Limited token: natural flavors. Annatto extract (color) is Caution and does not stack. Sucrose is the t118u Cleared row. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-kids-melatonin-1-60',
    productName: "Spring Valley Kid's Melatonin Fast-Dissolve 1 mg, Grape (60 tablets)",
    category: 'Sleep',
    formulaId: 'springvalley-b273-kids-melatonin-1-60',
    audience: 'kids',
    minAge: 3,
    form: 'tablet',
    activeIngredients: [{ name: 'Melatonin', strength: '1 mg per tablet' }],
    inactiveIngredients: [
      flag(P86, 'Sugar', 'moderate', 'sugar'),
      flag(P86, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(P86, 'Beet Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P86, 'Citric Acid', 'cleared', 'citric'),
      flag(P86, 'Inulin', 'cleared', 'inulin'),
      flag(P86, 'Natural Flavor', 'moderate', 'natFlavor'),
      flag(P86, 'Silica', 'limited', 'silica'),
      flag(P86, 'Stearic Acid', 'cleared', 'stearic'),
      flag(P86, 'Xylitol', 'moderate', 'xylitol'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image only. The page Inactive Ingredients block is a gummy-style list and was not graded. The panel says 3 years and older. Counted Limited token: maltodextrin. Natural flavor singular, sugar, and xylitol are Caution and do not stack. Silica is the 0-pt cap and does not stack. No honest note. Melatonin is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-kids-melatonin-gummy-1-60',
    productName: "Spring Valley Kid's Melatonin Gummies 1 mg, Raspberry (60 gummies)",
    category: 'Sleep',
    formulaId: 'springvalley-b273-kids-melatonin-gummy-1-60',
    audience: 'kids',
    minAge: 4,
    form: 'gummy',
    activeIngredients: [{ name: 'Melatonin', strength: '1 mg per gummy' }],
    inactiveIngredients: [
      flag(P87, 'Organic Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P87, 'Organic Sugar', 'cleared', 'organicSugar'),
      flag(P87, 'Pectin', 'cleared', 'pectin'),
      flag(P87, 'Citric Acid', 'cleared', 'citric'),
      flag(P87, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P87, 'Organic Carnauba Wax', 'cleared', 'carnauba'),
      flag(P87, 'Organic Maqui Berry Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P87, 'Organic Sunflower Oil', 'high', 'sunflowerGummy'),
      flag(P87, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image only. The page Ingredients block is an older agar formula and was not graded. The panel says children 4 years and older. Avoid from organic sunflower oil in the gummy. Counted Limited token: natural flavors. No honest note. Melatonin is the active and is not graded. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-kids-multi-gummy-120',
    productName: 'Spring Valley Kids Multivitamin Gummies (120 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-kids-multi-gummy-120',
    audience: 'kids',
    minAge: 2,
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin A', strength: '180 mcg per gummy, ages 2–3' },
      { name: 'Vitamin C', strength: '15 mg per gummy, ages 2–3' },
      { name: 'Vitamin D', strength: '10 mcg per gummy, ages 2–3' },
      { name: 'Vitamin E', strength: '3.8 mg per gummy, ages 2–3' },
    ],
    inactiveIngredients: [
      flag(P88, 'Cane Sugar', 'cleared', 'caneSugar'),
      flag(P88, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P88, 'Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P88, 'Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P88, 'Citric Acid', 'cleared', 'citric'),
      flag(P88, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P88, 'Pectin', 'cleared', 'pectin'),
      flag(P88, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. The other-ingredients line is a separate carousel image. Ages 2–3 take 1 gummy, so the minimum age is 2. 120 servings of 1 gummy. Counted Limited token: natural flavors. Annatto extract (color) is Caution and does not stack. Vitamins and minerals on the facts are not graded. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-kids-multi-gummy-60',
    productName: 'Spring Valley Kids Multivitamin Gummies (60 gummies)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-kids-multi-gummy-60',
    audience: 'kids',
    minAge: 2,
    form: 'gummy',
    activeIngredients: [
      { name: 'Vitamin A', strength: '180 mcg per gummy, ages 2–3' },
      { name: 'Vitamin C', strength: '15 mg per gummy, ages 2–3' },
      { name: 'Vitamin D', strength: '10 mcg per gummy, ages 2–3' },
      { name: 'Vitamin E', strength: '3.8 mg per gummy, ages 2–3' },
    ],
    inactiveIngredients: [
      flag(P89, 'Cane Sugar', 'cleared', 'caneSugar'),
      flag(P89, 'Tapioca Syrup', 'cleared', 'tapiocaSyrup'),
      flag(P89, 'Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(P89, 'Black Carrot Juice Concentrate (Color)', 'cleared', 'juice'),
      flag(P89, 'Citric Acid', 'cleared', 'citric'),
      flag(P89, 'Natural Flavors', 'limited', 'naturalFlavors'),
      flag(P89, 'Pectin', 'cleared', 'pectin'),
      flag(P89, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't41u packs 61–90. Walmart panel image is the single source. Same other-ingredients line as the 120-count. This bottle is 60 gummies. Ages 2–3 take 1 gummy, so the minimum age is 2. Counted Limited token: natural flavors. Annatto extract (color) is Caution and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row({
    id: 'springvalley-b273-krill-500-120',
    productName: 'Spring Valley Krill Oil 500 mg (120 softgels)',
    category: 'Vitamins',
    formulaId: 'springvalley-b273-krill-500-120',
    form: 'softgel',
    activeIngredients: [
      { name: 'Krill Oil', strength: '500 mg per softgel' },
      { name: 'Omega-3 Complex', strength: '120 mg per softgel' },
      { name: 'Phospholipids', strength: '200 mg per softgel' },
      { name: 'Astaxanthin', strength: '150 mcg per softgel' },
    ],
    inactiveIngredients: [
      flag(P90, 'Gelatin', 'cleared', 'gelatin'),
      flag(P90, 'Vegetable Glycerin', 'cleared', 'glycerin'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't41u packs 61–90. The panel is a flat-lit photo of the bottle back. Page text matches. Krill oil is the active and is not graded. Contains krill is a disclosure. Clean. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH273_KYR6D_T41U_SV;

const EXPECTED: Record<string, { verdict: RatingRecord['verdict']; counted: string; minAge?: number; kids?: boolean }> = {
  'springvalley-b273-fish-oil-1000-60': { verdict: 'clean', counted: '' },
  'springvalley-b273-flax-1400-90': { verdict: 'clean', counted: '' },
  'springvalley-b273-flax-1200-200': { verdict: 'clean', counted: '' },
  'springvalley-b273-niacin-flushfree-240': { verdict: 'caution', counted: '' },
  'springvalley-b273-gaba-750-100': { verdict: 'clean', counted: '' },
  'springvalley-b273-iron-gummy-9-60': { verdict: 'caution', counted: '' },
  'springvalley-b273-ginger-550-100': { verdict: 'clean', counted: '' },
  'springvalley-b273-ginkgo-120-90': { verdict: 'caution', counted: 'Maltodextrin|Carrageenan' },
  'springvalley-b273-ginkgo-60-240': { verdict: 'caution', counted: 'Maltodextrin' },
  'springvalley-b273-glucosamine-turmeric-60': { verdict: 'caution', counted: 'Polyethylene Glycol' },
  'springvalley-b273-glucosamine-sulfate-1000-200': {
    verdict: 'avoid',
    counted: 'Polydextrose|Polyethylene Glycol',
  },
  'springvalley-b273-hair-skin-nails-240': { verdict: 'avoid', counted: 'Maltodextrin|Polyethylene Glycol' },
  'springvalley-b273-skin-probiotic-10b-30': { verdict: 'clean', counted: '' },
  'springvalley-b273-mag-glycinate-powder-30': { verdict: 'caution', counted: '' },
  'springvalley-b273-immune-elderberry-gummy-60': { verdict: 'avoid', counted: 'Natural Flavors' },
  'springvalley-b273-zinc-gummy-22-60': { verdict: 'avoid', counted: '' },
  'springvalley-b273-iron-gummy-18-60': { verdict: 'caution', counted: 'Natural Flavors' },
  'springvalley-b273-iron-65-100': { verdict: 'avoid', counted: 'Medium Chain Triglycerides' },
  'springvalley-b273-iron-prenatal-27-250': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Medium Chain Triglycerides|Polydextrose',
  },
  'springvalley-b273-mag-gummy-kids-30': { verdict: 'caution', counted: 'Natural Flavors', kids: true },
  'springvalley-b273-supergreens-gummy-60': {
    verdict: 'avoid',
    counted: 'Maltodextrin|Natural Flavors|Sucralose',
    kids: true,
  },
  'springvalley-b273-kids-calcium-d3-60': { verdict: 'caution', counted: 'Natural Flavors', kids: true, minAge: 2 },
  'springvalley-b273-kids-melatonin-1-60': { verdict: 'caution', counted: 'Maltodextrin', kids: true, minAge: 3 },
  'springvalley-b273-kids-melatonin-gummy-1-60': {
    verdict: 'avoid',
    counted: 'Natural Flavors',
    kids: true,
    minAge: 4,
  },
  'springvalley-b273-kids-multi-gummy-120': { verdict: 'caution', counted: 'Natural Flavors', kids: true, minAge: 2 },
  'springvalley-b273-kids-multi-gummy-60': { verdict: 'caution', counted: 'Natural Flavors', kids: true, minAge: 2 },
  'springvalley-b273-krill-500-120': { verdict: 'clean', counted: '' },
};

if (ROWS.length !== 27) throw new Error(`batch273 row count ${ROWS.length}`);

const NOTE_IDS = new Set([
  'springvalley-b273-gaba-750-100',
  'springvalley-b273-ginger-550-100',
  'springvalley-b273-ginkgo-120-90',
  'springvalley-b273-iron-gummy-18-60',
  'springvalley-b273-supergreens-gummy-60',
]);
const STACK_ID = 'springvalley-b273-supergreens-gummy-60';

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch273 unexpected id ${record.id}`);
  if (record.brand !== BRAND) throw new Error(`batch273 brand ${record.id}`);
  if (record.barcode) throw new Error(`batch273 upc ${record.id}`);
  if (expected.kids) {
    if (record.audience !== 'kids') throw new Error(`batch273 audience ${record.id}`);
    if (expected.minAge === undefined) {
      if (record.minAge !== undefined) throw new Error(`batch273 invented age ${record.id}`);
    } else if (record.minAge !== expected.minAge) {
      throw new Error(`batch273 age ${record.id} ${record.minAge}`);
    }
  } else if (record.audience !== 'adult' || record.minAge !== 18) {
    throw new Error(`batch273 adult ${record.id}`);
  }
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || record.verdict !== expected.verdict) {
    throw new Error(`batch273 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch273 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch273 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (stackNote && record.id !== STACK_ID) throw new Error(`batch273 unexpected stack note ${record.id}`);
  if (record.id === STACK_ID && !stackNote.includes('Maltodextrin, Natural Flavors, Sucralose')) {
    throw new Error(`batch273 stack names ${stackNote}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch273 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch273 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch273 pending ${ingredient.name}`);
    }
  }
}
