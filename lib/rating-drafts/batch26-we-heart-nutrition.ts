// DRAFT / not verified / batch 26 We Heart Nutrition / founder calls
// locked / methodology untouched.
//
// Mixed categories (Vitamins + Digestive + Immune Support) · audience
// 'adult' · recordStatus is 'unverified' on every row. Founder calls
// (locked): see notes below. Methodology v1.6 grades only — do not
// change locked ingredient grades. Do NOT invent Clean. Do NOT write
// W6 Omega-3. Do NOT invent UPCs. Barcodes omitted — match prior
// rating-draft batches. Pack sizes share formulaId. formulaId == id on
// every row (same pattern as prior batches). Form is labeled on
// cleanAlternatives, not a hard filter (§6). This draft set is Clean
// only — cleanAlternatives omitted on every row (honest empty; no
// Caution / Avoid peers in this file). Not wired into Clean Picks UI.
// No live Clean Picks file is edited from this draft.
// Methodology.md / PROJECT_NOTES.md are untouched.
//
// OTHER-INGREDIENTS LOCK (CLEAN ONLY): Matched brand other-ingredients
// are HPMC / hypromellose / hydroxypropylmethylcellulose + water
// ± rice flour / organic rice flour ONLY. All Cleared (§5). No gellan.
// No SiO2. No TiO2 / dye / talc / PEG / flavor. Brand story / donations
// / Clean Label Project Purity Award are NOT grade drivers and are not
// used in any row. Truemed is a purchase path via the brand — retailer
// chip is We Heart Nutrition only.
//
// FOUNDER CALLS (LOCKED) — write these 10 Clean rows only:
// CLEAN
// - W1 Wholesome Prenatal = Clean. Organic rice flour + vegetarian
//   capsule (HPMC, water). Prenatal carton note. Zinc parked. Iron
//   intentionally omitted on formula — iron-free design is not a
//   cleanliness demerit. No dosing / medical advice.
// - W2 Wholesome Postnatal = Clean. Same OI stack as prenatal.
//   Postpartum / nursing label note. Zinc parked. Iron-free note. No
//   medical advice.
// - W3 Wholesome Women’s Multi = Clean. Vegetarian capsule (HPMC,
//   water), rice flour. Zinc parked.
// - W4 Wholesome Women’s Multi 40+ = Clean. Vegetarian capsule (HPMC,
//   water), rice flour. Zinc parked. Labeled for women 40+.
// - W5 Wholesome Men’s Multi = Clean. Vegetarian capsule (HPMC,
//   water), rice flour. Zinc parked.
// - W7 Wholesome Probiotic = Clean. Vegan capsule (HPMC, water),
//   organic rice flour. Digestive · Supplement. Bacillus coagulans
//   SNZ 1969 + Mucosave FG (prickly pear / olive) listed neutrally;
//   grade inactives only. No gellan / SiO2.
// - W8 Wholesome Magnesium Glycinate = Clean. Vegetarian capsule
//   (HPMC, water) ONLY (no rice flour on matched refill OI). Magnesium
//   (as magnesium glycinate) 75mg per capsule. Supplement · Vitamins.
// - W9 Wholesome Iron = Clean. Rice flour + vegetarian capsule (HPMC,
//   water). Iron (as ferrous bisglycinate) 13.5mg. On-carton iron
//   overdose keep-away note required. Grade inactives only — do not
//   invent an iron active-safety Avoid / Caution beyond that note.
// - W10 Wholesome Immunity = Clean. Vegan capsule (HPMC, water),
//   organic rice flour. Actives as labeled (listed neutrally). Zinc
//   parked. Milk / bovine-colostrum allergen disclosure is a note,
//   not a grade. Immune Support (batch 9 category string).
// - W11 Wholesome Balance = Clean. Rice flour + vegetarian capsule
//   (HPMC, water). Thiamin / zinc / turmeric / saffron / ginger as
//   labeled — grade inactives only. Zinc parked. Vitamins (no
//   mood / stress category in-repo).
//
// TALLY (unverified drafts): 10 rows — Clean 10 / Caution 0 / Avoid 0.
// Independently Clean in THIS batch: all 10 written rows.
// cleanAlternatives omitted on every Clean row.
//
// formulaIds:
// - we-heart-wholesome-prenatal (Clean, Vitamins)
// - we-heart-wholesome-postnatal (Clean, Vitamins)
// - we-heart-wholesome-womens-multi (Clean, Vitamins)
// - we-heart-wholesome-womens-multi-40 (Clean, Vitamins)
// - we-heart-wholesome-mens-multi (Clean, Vitamins)
// - we-heart-wholesome-probiotic (Clean, Digestive)
// - we-heart-wholesome-magnesium-glycinate (Clean, Vitamins)
// - we-heart-wholesome-iron (Clean, Vitamins)
// - we-heart-wholesome-immunity (Clean, Immune Support)
// - we-heart-wholesome-balance (Clean, Vitamins)
//
// FLAG / SKIP (do not write rows):
// - W6 Wholesome Omega-3 — FLAG skip entirely. Do not invent Clean.
//   Do not write Caution without a full carton other-ingredients list.
// - Thrive / Thorne.com / B-Alive / Amazon / Dollar Tree
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety
// grade. Grade inactives only. Every zinc-containing row's honestNote
// says zinc is parked. No dosing. No medical advice. No "consult your
// doctor" prescriptions. Iron-free design on the multi / prenatal /
// postnatal formulas is not a cleanliness demerit. Iron overdose child
// warning is noted as on-carton on the iron row only.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const IMMUNE = 'Immune Support';
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'We Heart Nutrition';
const RETAILERS = [BRAND] as const;

const METH = {
  starches:
    'Methodology §5 Cleared (pregelatinized / corn / potato / rice flour / similar simple starches — locked v1.6 housekeeping)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropylmethylcellulose)',
  cleared: 'Methodology §5 Cleared',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function labelCleared(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.cleared));
}

function riceFlour(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.starches));
}

function hpmcCapsule(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.hpmc));
}

const ZINC_PARKED =
  'Zinc (oxide / citrate / bisglycinate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const PRENATAL_LABEL =
  'Carton is labeled for prenatal / pregnancy use. No dosing or medical advice in this draft.';

const POSTNATAL_LABEL =
  'Carton is labeled for postpartum / nursing use. No dosing or medical advice in this draft.';

const IRON_FREE_NOT_DEMERIT =
  'Iron is intentionally omitted on this formula (iron-free by design). That omission is not a cleanliness demerit.';

const IRON_OVERDOSE_CARTON =
  'On-carton iron overdose warning: accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6 — keep out of reach of children.';

const PRENATAL_ID = 'we-heart-wholesome-prenatal';
const POSTNATAL_ID = 'we-heart-wholesome-postnatal';
const WOMENS_MULTI_ID = 'we-heart-wholesome-womens-multi';
const WOMENS_MULTI_40_ID = 'we-heart-wholesome-womens-multi-40';
const MENS_MULTI_ID = 'we-heart-wholesome-mens-multi';
const PROBIOTIC_ID = 'we-heart-wholesome-probiotic';
const MAGNESIUM_ID = 'we-heart-wholesome-magnesium-glycinate';
const IRON_ID = 'we-heart-wholesome-iron';
const IMMUNITY_ID = 'we-heart-wholesome-immunity';
const BALANCE_ID = 'we-heart-wholesome-balance';

const PRENATAL_CITE =
  'We Heart Nutrition Wholesome Prenatal brand page (https://www.weheartnutrition.com/products/prenatal) / Wholesome Prenatal Refill Pack (https://www.weheartnutrition.com/products/wholesome-prenatal-refill-pack) other-ingredients (organic rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water); no iron; no gellan / SiO2 / TiO2 / dye)';
const POSTNATAL_CITE =
  'We Heart Nutrition Wholesome Postnatal Refill Pack brand page (https://www.weheartnutrition.com/products/wholesome-postnatal-refill-pack) other-ingredients (organic rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water); no iron; no gellan / SiO2 / TiO2 / dye)';
const WOMENS_MULTI_CITE =
  'We Heart Nutrition Wholesome Women\'s Multi / wholesome-womens-multi refill brand pages (https://www.weheartnutrition.com/products/wholesome-womens-multi / https://www.weheartnutrition.com/products/wholesome-womens-multi-refill-pack) other-ingredients (vegetarian capsule (hydroxypropylmethylcellulose, water), rice flour; no gellan / SiO2 / TiO2 / dye)';
const WOMENS_MULTI_40_CITE =
  'We Heart Nutrition Wholesome Women\'s Multi 40+ refill / wholesome-womens-multivitamin-40 brand pages (https://www.weheartnutrition.com/products/wholesome-womens-multi-40-refill-pack / https://www.weheartnutrition.com/products/wholesome-womens-multivitamin-40) other-ingredients (vegetarian capsule (hydroxypropylmethylcellulose, water), rice flour; no gellan / SiO2 / TiO2 / dye)';
const MENS_MULTI_CITE =
  'We Heart Nutrition Wholesome Men\'s Multi refill brand page (https://www.weheartnutrition.com/products/wholesome-mens-multi-refill-pack) other-ingredients (vegetarian capsule (hydroxypropylmethylcellulose, water), rice flour; no gellan / SiO2 / TiO2 / dye)';
const PROBIOTIC_CITE =
  'We Heart Nutrition Wholesome Probiotic brand page (https://www.weheartnutrition.com/products/wholesome-probiotic) other-ingredients (vegan capsule (hydroxypropylmethylcellulose, water), organic rice flour; no gellan / no SiO2 / no TiO2 / dye)';
const MAGNESIUM_CITE =
  'We Heart Nutrition Wholesome Magnesium Glycinate refill pack (https://www.weheartnutrition.com/products/wholesome-magnesium-refill-pack) other-ingredients (vegetarian capsule (hydroxypropylmethylcellulose, water) only; no rice flour on matched refill OI; no gellan / SiO2 / TiO2 / dye)';
const IRON_CITE =
  'We Heart Nutrition Wholesome Iron (https://www.weheartnutrition.com/products/wholesome-iron-supplement) other-ingredients (rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water); no gellan / SiO2 / TiO2 / dye)';
const IMMUNITY_CITE =
  'We Heart Nutrition Wholesome Immunity refill (https://www.weheartnutrition.com/products/wholesome-immunity-refill) other-ingredients (vegan capsule (hydroxypropylmethylcellulose, water), organic rice flour; no gellan / SiO2 / TiO2 / dye)';
const BALANCE_CITE =
  'We Heart Nutrition Wholesome Balance brand page (https://www.weheartnutrition.com/products/wholesome-balance) other-ingredients (rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water); no gellan / SiO2 / TiO2 / dye)';

export const BATCH26_WE_HEART_NUTRITION: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: PRENATAL_ID,
    productName: 'Wholesome Prenatal',
    brand: BRAND,
    category: VITAMINS,
    formulaId: PRENATAL_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral (iron-free)', strength: '4 capsules (label serving)' },
      { name: 'Folate (as 5-MTHF, Magnafolate-Pro)', strength: '600mcg DFE' },
      { name: 'Choline (as choline bitartrate)', strength: '320mg' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '100mcg (4000 IU)' },
      { name: 'Zinc (as labeled)', strength: 'as labeled' },
    ],
    inactiveIngredients: [
      riceFlour(PRENATAL_CITE, 'Organic rice flour'),
      hpmcCapsule(PRENATAL_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Prenatal = Clean. Matched brand / refill other-ingredients: organic rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water). HPMC / water and organic rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc on the matched list. Iron is intentionally omitted on this formula — iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${PRENATAL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: POSTNATAL_ID,
    productName: 'Wholesome Postnatal',
    brand: BRAND,
    category: VITAMINS,
    formulaId: POSTNATAL_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Postnatal multivitamin / multimineral (iron-free)', strength: '4 capsules (label serving)' },
      { name: 'Folate (as 5-MTHF, Magnafolate-Pro)', strength: '500mcg DFE' },
      { name: 'Choline (as choline bitartrate)', strength: '320mg' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '160mcg (6400 IU)' },
      { name: 'Zinc (as labeled)', strength: 'as labeled' },
    ],
    inactiveIngredients: [
      riceFlour(POSTNATAL_CITE, 'Organic rice flour'),
      hpmcCapsule(POSTNATAL_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Postnatal = Clean. Matched postnatal refill other-ingredients match the prenatal stack: organic rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water). HPMC / water and organic rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc on the matched list. Iron is intentionally omitted on this formula — iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. ' +
      POSTNATAL_LABEL +
      ' ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${POSTNATAL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: WOMENS_MULTI_ID,
    productName: 'Wholesome Women\'s Multi',
    brand: BRAND,
    category: VITAMINS,
    formulaId: WOMENS_MULTI_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Women\'s multivitamin / multimineral (iron-free)', strength: '2 capsules (label serving)' },
      { name: 'Folate (as 5-MTHF, Magnafolate-Pro)', strength: '400mcg DFE' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '50mcg (2000 IU)' },
      { name: 'Zinc (as labeled)', strength: 'as labeled' },
    ],
    inactiveIngredients: [
      hpmcCapsule(WOMENS_MULTI_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(WOMENS_MULTI_CITE, 'Rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Women\'s Multi = Clean. Matched wholesome-womens-multi / refill other-ingredients: vegetarian capsule (hydroxypropylmethylcellulose, water), rice flour. HPMC / water and rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc on the matched list. Iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${WOMENS_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: WOMENS_MULTI_40_ID,
    productName: 'Wholesome Women\'s Multi 40+',
    brand: BRAND,
    category: VITAMINS,
    formulaId: WOMENS_MULTI_40_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Women\'s 40+ multivitamin / multimineral (iron-free)', strength: '3 capsules (label serving)' },
      { name: 'Folate (as 5-MTHF, Magnafolate-Pro)', strength: '400mcg DFE' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '50mcg (2000 IU)' },
      { name: 'Red Orange Complex', strength: '50mg' },
      { name: 'Zinc (as labeled)', strength: 'as labeled' },
    ],
    inactiveIngredients: [
      hpmcCapsule(WOMENS_MULTI_40_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(WOMENS_MULTI_40_CITE, 'Rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Women\'s Multi 40+ = Clean. Matched 40+ refill / multivitamin-40 other-ingredients: vegetarian capsule (hydroxypropylmethylcellulose, water), rice flour. HPMC / water and rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc on the matched list. Carton / brand page is labeled for women 40+. Iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${WOMENS_MULTI_40_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: MENS_MULTI_ID,
    productName: 'Wholesome Men\'s Multi',
    brand: BRAND,
    category: VITAMINS,
    formulaId: MENS_MULTI_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Men\'s multivitamin / multimineral', strength: '2 capsules (label serving)' },
      { name: 'Lycopene (from tomato extract)', strength: 'as labeled' },
      { name: 'Beta-sitosterol', strength: 'as labeled' },
      { name: 'Zinc (as labeled)', strength: 'as labeled' },
    ],
    inactiveIngredients: [
      hpmcCapsule(MENS_MULTI_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(MENS_MULTI_CITE, 'Rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Men\'s Multi = Clean. Matched mens-multi refill other-ingredients: vegetarian capsule (hydroxypropylmethylcellulose, water), rice flour. HPMC / water and rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc on the matched list. Lycopene / beta-sitosterol / trans-resveratrol are labeled actives listed neutrally — this draft grades inactives only. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${MENS_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PROBIOTIC_ID,
    productName: 'Wholesome Probiotic',
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: PROBIOTIC_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Bacillus coagulans SNZ 1969',
        strength: '2 billion CFU (20mg) per 2-capsule serving as labeled',
      },
      {
        name: 'Mucosave FG (prickly pear / olive extract blend)',
        strength: '400mg per 2-capsule serving as labeled',
      },
    ],
    inactiveIngredients: [
      hpmcCapsule(PROBIOTIC_CITE, 'Vegan capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(PROBIOTIC_CITE, 'Organic rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Probiotic = Clean. Matched wholesome-probiotic other-ingredients: vegan capsule (hydroxypropylmethylcellulose, water), organic rice flour. HPMC / water and organic rice flour are Cleared (§5). No gellan and no silicon dioxide on the matched list — do not invent a gellan or SiO2 grade. Bacillus coagulans SNZ 1969 and Mucosave FG (prickly pear / olive) are labeled actives listed neutrally; this draft grades inactives only and makes no efficacy claim. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${PROBIOTIC_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: MAGNESIUM_ID,
    productName: 'Wholesome Magnesium Glycinate',
    brand: BRAND,
    category: VITAMINS,
    formulaId: MAGNESIUM_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium (as magnesium glycinate)', strength: '75mg per capsule' },
    ],
    inactiveIngredients: [
      hpmcCapsule(MAGNESIUM_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Magnesium Glycinate = Clean. Matched wholesome-magnesium-refill-pack other-ingredients: vegetarian capsule (hydroxypropylmethylcellulose, water) ONLY — no rice flour on that matched refill OI. HPMC / water are Cleared (§5). Do not invent rice flour on this row. No gellan, silicon dioxide, titanium dioxide, or synthetic dye on the matched list. Active is magnesium (as magnesium glycinate) 75mg per capsule as labeled. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${MAGNESIUM_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: IRON_ID,
    productName: 'Wholesome Iron',
    brand: BRAND,
    category: VITAMINS,
    formulaId: IRON_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Iron (as ferrous bisglycinate)', strength: '13.5mg' },
    ],
    inactiveIngredients: [
      riceFlour(IRON_CITE, 'Rice flour'),
      hpmcCapsule(IRON_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Iron = Clean. Matched wholesome-iron-supplement other-ingredients: rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water). HPMC / water and rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, or synthetic dye on the matched list. This draft grades inactives only and does not invent an iron active-safety Avoid or Caution beyond the on-carton overdose keep-away note. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      IRON_OVERDOSE_CARTON,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${IRON_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: IMMUNITY_ID,
    productName: 'Wholesome Immunity',
    brand: BRAND,
    category: IMMUNE,
    formulaId: IMMUNITY_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Vitamin C (as PureWay-C)', strength: '90mg' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: '15mcg (600 IU)' },
      { name: 'Zinc (as zinc bisglycinate chelate)', strength: '11mg' },
      { name: 'Selenium (as SelenoExcell high-selenium yeast)', strength: '55mcg' },
      { name: 'Puremune beta-glucan (1,3/1,6)', strength: '7.5mg' },
      { name: 'Quercetin phytosome (Quercefit)', strength: '50mg' },
      { name: 'Colostrum (bovine)', strength: '200mg' },
    ],
    inactiveIngredients: [
      hpmcCapsule(IMMUNITY_CITE, 'Vegan capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(IMMUNITY_CITE, 'Organic rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Immunity = Clean. Matched wholesome-immunity-refill other-ingredients: vegan capsule (hydroxypropylmethylcellulose, water), organic rice flour. HPMC / water and organic rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, or synthetic dye on the matched list. Labeled actives (PureWay-C vitamin C, D3, zinc bisglycinate, selenium, beta-glucan, quercetin phytosome, bovine colostrum) are listed neutrally; this draft grades inactives only and makes no efficacy claim. Bovine colostrum is a milk-derived active — milk / colostrum allergen disclosure is a note, not a grade. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${IMMUNITY_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: BALANCE_ID,
    productName: 'Wholesome Balance',
    brand: BRAND,
    category: VITAMINS,
    formulaId: BALANCE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Thiamin (as thiamine mononitrate)', strength: '100mg per 2-capsule serving' },
      { name: 'Zinc (as zinc bisglycinate)', strength: '11mg per 2-capsule serving' },
      { name: 'Turmeric extract 95% (Curcumin C3 Complex)', strength: '200mg per 2-capsule serving' },
      { name: 'Saffron extract (Affron)', strength: '28mg per 2-capsule serving' },
      { name: 'Ginger extract (Ginfort)', strength: '200mg per 2-capsule serving' },
    ],
    inactiveIngredients: [
      riceFlour(BALANCE_CITE, 'Rice flour'),
      hpmcCapsule(BALANCE_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Balance = Clean. Matched wholesome-balance other-ingredients: rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water). HPMC / water and rice flour are Cleared (§5). No gellan, silicon dioxide, titanium dioxide, or synthetic dye on the matched list. Thiamin, zinc, turmeric, saffron, and ginger are labeled actives listed neutrally; this draft grades inactives only and makes no efficacy claim. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${BALANCE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];
