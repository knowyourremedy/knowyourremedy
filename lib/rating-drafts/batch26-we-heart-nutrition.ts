// DRAFT / not verified / batch 26 We Heart Nutrition / founder
// combined lock / official SupplementFacts_*_0926.png panels only
// (not marketing-page text).
//
// Mixed categories (Vitamins + Digestive + Immune Support) · audience
// 'adult' · recordStatus is 'unverified' on every row. Founder calls
// (locked): see notes below. Methodology v1.6 + founder combined lock
// for organic rice hull extract / calcium stearate — do not change
// other locked ingredient grades. Do NOT invent Clean. Do NOT invent
// UPCs. Barcodes omitted — match prior rating-draft batches. Pack
// sizes share formulaId. formulaId == id on every row. Form is labeled
// on cleanAlternatives, not a hard filter (§6). Clean rows omit
// cleanAlternatives. Caution Omega-3 omits cleanAlternatives (no
// independently Clean fish-oil peer in this batch). Not wired into
// Clean Picks UI. No live Clean Picks file is edited from this draft.
// PROJECT_NOTES.md is untouched. METHODOLOGY.md §5 Cleared table only
// (organic rice hull extract lock + calcium stearate Cleared-by-class).
//
// OTHER-INGREDIENTS LOCK: Official 0926 Supplement Facts panels only.
// Organic rice hull extract / rice concentrate / ground rice hulls =
// Cleared (plant-fiber flow agent; ≠ rice flour; ≠ silicon dioxide;
// SiO₂ nanoparticle Caution cap does NOT apply). Calcium stearate =
// Cleared-by-class with magnesium stearate / stearic acid. Organic
// rice flour + HPMC / water = Cleared. Lemon oil (lemon peel extract)
// = natural-flavor Limited. Softgel fish oil ≠ gummy seed-oil High.
// Brand story / donations / Clean Label Project Purity Award are NOT
// grade drivers. Truemed is a purchase path via the brand — retailer
// chip is We Heart Nutrition only.
//
// FOUNDER CALLS (LOCKED) — write these 11 rows:
// CLEAN (10)
// - W3 Wholesome Women’s Multi = Clean. Vegan capsule (HPMC, water)
//   + organic rice flour. Zinc parked.
// - W4 Wholesome Women’s Multi 40+ = Clean. Same OI. Zinc parked.
//   Labeled for women 40+.
// - W5 Wholesome Men’s Multi = Clean. Same OI. Zinc parked.
// - W9 Wholesome Iron = Clean. Organic rice flour + vegan capsule
//   (HPMC, water). On-carton iron overdose keep-away note. No medical
//   advice. Grade inactives only.
// - W10 Wholesome Immunity = Clean. Vegan capsule (HPMC, water) +
//   organic rice flour. Zinc parked.
// - W8 Wholesome Magnesium Glycinate = Clean. Vegan capsule (HPMC,
//   water) + calcium stearate (Cleared-by-class).
// - W1 Wholesome Prenatal = Clean. Vegan capsule (HPMC, water) +
//   organic rice hull extract (Cleared). Prenatal carton note. Zinc
//   parked. Iron-free design is not a cleanliness demerit.
// - W2 Wholesome Postnatal = Clean. Same hull-extract OI. Postpartum /
//   nursing label note. Zinc parked. Iron-free note.
// - W7 Wholesome Probiotic = Clean. Vegan capsule (HPMC, water) +
//   organic rice hull extract + organic rice flour. Digestive.
//   Actives listed neutrally; grade inactives only.
// - W11 Wholesome Balance = Clean. Vegan capsule (HPMC, water) +
//   organic rice flour + organic rice hull extract. Zinc parked.
// CAUTION (1)
// - W6 Wholesome Omega-3 = Caution. Official panel: fish oil
//   (anchovy), bovine gelatin, glycerin, purified water, Lemon Oil
//   (lemon peel extract), natural mixed tocopherols. Lemon oil =
//   natural flavor Limited (1 pt Caution). Gelatin / glycerin / water
//   / tocopherols Cleared. Softgel fish oil ≠ gummy seed-oil High.
//
// TALLY (unverified drafts): 11 rows — Clean 10 / Caution 1 / Avoid 0.
// Independently Clean in THIS batch: the 10 Clean rows. No Clean
// fish-oil peer — Omega-3 cleanAlternatives omitted.
//
// formulaIds:
// - we-heart-wholesome-womens-multi (Clean, Vitamins)
// - we-heart-wholesome-womens-multi-40 (Clean, Vitamins)
// - we-heart-wholesome-mens-multi (Clean, Vitamins)
// - we-heart-wholesome-iron (Clean, Vitamins)
// - we-heart-wholesome-immunity (Clean, Immune Support)
// - we-heart-wholesome-magnesium-glycinate (Clean, Vitamins)
// - we-heart-wholesome-prenatal (Clean, Vitamins)
// - we-heart-wholesome-postnatal (Clean, Vitamins)
// - we-heart-wholesome-probiotic (Clean, Digestive)
// - we-heart-wholesome-balance (Clean, Vitamins)
// - we-heart-wholesome-omega-3 (Caution, Vitamins)
//
// FLAG / SKIP (do not write rows):
// - Thrive / Thorne.com / B-Alive / Amazon / Dollar Tree
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety
// grade. Grade inactives only. Every zinc-containing row's honestNote
// says zinc is parked. No dosing. No medical advice. No "consult your
// doctor" prescriptions. Iron-free design on multi / prenatal /
// postnatal formulas is not a cleanliness demerit. Iron overdose
// child warning is noted as on-carton on the iron row only.

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
  riceHull:
    'Methodology §5 Cleared (organic rice hull extract / rice concentrate / ground rice hulls — plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply)',
  calciumStearate:
    'Methodology §5 Cleared-by-class (calcium stearate — same stearate-family class as magnesium stearate / stearic acid)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
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

const NO_CLEAN_FISH_OIL =
  'No independently Clean fish-oil row exists in this draft set — cleanAlternatives omitted (honest empty; do not point at out-of-batch fish oils).';

const WOMENS_MULTI_ID = 'we-heart-wholesome-womens-multi';
const WOMENS_MULTI_40_ID = 'we-heart-wholesome-womens-multi-40';
const MENS_MULTI_ID = 'we-heart-wholesome-mens-multi';
const IRON_ID = 'we-heart-wholesome-iron';
const IMMUNITY_ID = 'we-heart-wholesome-immunity';
const MAGNESIUM_ID = 'we-heart-wholesome-magnesium-glycinate';
const PRENATAL_ID = 'we-heart-wholesome-prenatal';
const POSTNATAL_ID = 'we-heart-wholesome-postnatal';
const PROBIOTIC_ID = 'we-heart-wholesome-probiotic';
const BALANCE_ID = 'we-heart-wholesome-balance';
const OMEGA_ID = 'we-heart-wholesome-omega-3';

const WOMENS_MULTI_CITE =
  'We Heart Nutrition Wholesome Women\'s Multi official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour';
const WOMENS_MULTI_40_CITE =
  'We Heart Nutrition Wholesome Women\'s Multi 40+ official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour';
const MENS_MULTI_CITE =
  'We Heart Nutrition Wholesome Men\'s Multi official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour';
const IRON_CITE =
  'We Heart Nutrition Wholesome Iron official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Organic Rice Flour, Vegan Capsule (hydroxypropyl methylcellulose, water).';
const IMMUNITY_CITE =
  'We Heart Nutrition Wholesome Immunity official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour';
const MAGNESIUM_CITE =
  'We Heart Nutrition Wholesome Magnesium Glycinate official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Calcium Stearate.';
const PRENATAL_CITE =
  'We Heart Nutrition Wholesome Prenatal official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Hull Extract.';
const POSTNATAL_CITE =
  'We Heart Nutrition Wholesome Postnatal official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Hull Extract.';
const PROBIOTIC_CITE =
  'We Heart Nutrition Wholesome Probiotic official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Hull Extract, Organic Rice Flour.';
const BALANCE_CITE =
  'We Heart Nutrition Wholesome Balance official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour, Organic Rice Hull Extract.';
const OMEGA_CITE =
  'We Heart Nutrition Wholesome Omega-3 official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients: Highly Refined and Concentrated Omega-3 Fish Oil (anchovy), Bovine Gelatin, Glycerin, Purified Water, Lemon Oil (lemon peel extract), Natural Mixed Tocopherols.';

export const BATCH26_WE_HEART_NUTRITION: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(WOMENS_MULTI_CITE, METH.hpmc),
      ),
      flag('Organic Rice Flour', 'cleared', labelCite(WOMENS_MULTI_CITE, METH.starches)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Women\'s Multi = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour. HPMC / water and organic rice flour are Cleared (§5). No Organic Rice Hull Extract, calcium stearate, gellan, silicon dioxide, titanium dioxide, or synthetic dye on that panel. Iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${WOMENS_MULTI_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(WOMENS_MULTI_40_CITE, METH.hpmc),
      ),
      flag('Organic Rice Flour', 'cleared', labelCite(WOMENS_MULTI_40_CITE, METH.starches)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Women\'s Multi 40+ = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour. HPMC / water and organic rice flour are Cleared (§5). No Organic Rice Hull Extract, calcium stearate, gellan, silicon dioxide, titanium dioxide, or synthetic dye on that panel. Carton is labeled for women 40+. Iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${WOMENS_MULTI_40_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(MENS_MULTI_CITE, METH.hpmc),
      ),
      flag('Organic Rice Flour', 'cleared', labelCite(MENS_MULTI_CITE, METH.starches)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Men\'s Multi = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour. HPMC / water and organic rice flour are Cleared (§5). No Organic Rice Hull Extract, calcium stearate, gellan, silicon dioxide, titanium dioxide, or synthetic dye on that panel. Lycopene / beta-sitosterol / trans-resveratrol are labeled actives listed neutrally — this draft grades inactives only. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${MENS_MULTI_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag('Organic Rice Flour', 'cleared', labelCite(IRON_CITE, METH.starches)),
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(IRON_CITE, METH.hpmc),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Iron = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Organic Rice Flour, Vegan Capsule (hydroxypropyl methylcellulose, water). HPMC / water and organic rice flour are Cleared (§5). No Organic Rice Hull Extract, calcium stearate, gellan, silicon dioxide, or synthetic dye on that panel. This draft grades inactives only and does not invent an iron active-safety Avoid or Caution beyond the on-carton overdose keep-away note. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      IRON_OVERDOSE_CARTON,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${IRON_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(IMMUNITY_CITE, METH.hpmc),
      ),
      flag('Organic Rice Flour', 'cleared', labelCite(IMMUNITY_CITE, METH.starches)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Immunity = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour. HPMC / water and organic rice flour are Cleared (§5). No Organic Rice Hull Extract, calcium stearate, gellan, silicon dioxide, or synthetic dye on that panel. Labeled actives (PureWay-C vitamin C, D3, zinc bisglycinate, selenium, beta-glucan, quercetin phytosome, bovine colostrum) are listed neutrally; this draft grades inactives only and makes no efficacy claim. Bovine colostrum is a milk-derived active — milk / colostrum allergen disclosure is a note, not a grade. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${IMMUNITY_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(MAGNESIUM_CITE, METH.hpmc),
      ),
      flag(
        'Calcium Stearate',
        'cleared',
        labelCite(MAGNESIUM_CITE, METH.calciumStearate),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Magnesium Glycinate = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Calcium Stearate. HPMC / water are Cleared. Calcium stearate is Cleared-by-class with magnesium stearate / stearic acid (Methodology §5). No rice flour, Organic Rice Hull Extract, gellan, silicon dioxide, or synthetic dye on that panel. Active is magnesium (as magnesium glycinate) 75mg per capsule as labeled. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${MAGNESIUM_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
    ],
  },
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(PRENATAL_CITE, METH.hpmc),
      ),
      flag(
        'Organic Rice Hull Extract',
        'cleared',
        labelCite(PRENATAL_CITE, METH.riceHull),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Prenatal = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Hull Extract. HPMC / water are Cleared. Organic rice hull extract is Cleared (plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply). No rice flour, calcium stearate, gellan, silicon dioxide, titanium dioxide, or synthetic dye on that panel. Iron is intentionally omitted on this formula — iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${PRENATAL_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(POSTNATAL_CITE, METH.hpmc),
      ),
      flag(
        'Organic Rice Hull Extract',
        'cleared',
        labelCite(POSTNATAL_CITE, METH.riceHull),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Postnatal = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Hull Extract. HPMC / water are Cleared. Organic rice hull extract is Cleared (plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply). No rice flour, calcium stearate, gellan, silicon dioxide, titanium dioxide, or synthetic dye on that panel. Iron is intentionally omitted on this formula — iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. ' +
      POSTNATAL_LABEL +
      ' ' +
      IRON_FREE_NOT_DEMERIT +
      ' ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${POSTNATAL_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(PROBIOTIC_CITE, METH.hpmc),
      ),
      flag(
        'Organic Rice Hull Extract',
        'cleared',
        labelCite(PROBIOTIC_CITE, METH.riceHull),
      ),
      flag('Organic Rice Flour', 'cleared', labelCite(PROBIOTIC_CITE, METH.starches)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Probiotic = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Hull Extract, Organic Rice Flour. HPMC / water and organic rice flour are Cleared. Organic rice hull extract is Cleared (plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply). No gellan, calcium stearate, silicon dioxide, or synthetic dye on that panel. Bacillus coagulans SNZ 1969 and Mucosave FG (prickly pear / olive) are labeled actives listed neutrally; this draft grades inactives only and makes no efficacy claim. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${PROBIOTIC_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
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
      flag(
        'Vegan Capsule (hydroxypropyl methylcellulose, water)',
        'cleared',
        labelCite(BALANCE_CITE, METH.hpmc),
      ),
      flag('Organic Rice Flour', 'cleared', labelCite(BALANCE_CITE, METH.starches)),
      flag(
        'Organic Rice Hull Extract',
        'cleared',
        labelCite(BALANCE_CITE, METH.riceHull),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Balance = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Vegan Capsule (hydroxypropyl methylcellulose, water), Organic Rice Flour, Organic Rice Hull Extract. HPMC / water and organic rice flour are Cleared. Organic rice hull extract is Cleared (plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply). No gellan, calcium stearate, silicon dioxide, or synthetic dye on that panel. Thiamin, zinc, turmeric, saffron, and ginger are labeled actives listed neutrally; this draft grades inactives only and makes no efficacy claim. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${BALANCE_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: OMEGA_ID,
    productName: 'Wholesome Omega-3',
    brand: BRAND,
    category: VITAMINS,
    formulaId: OMEGA_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Highly refined and concentrated omega-3 fish oil (anchovy)',
        strength: 'as labeled',
      },
    ],
    inactiveIngredients: [
      flag(
        'Lemon Oil (lemon peel extract)',
        'limited',
        labelCite(OMEGA_CITE, METH.flavors),
      ),
      labelCleared(OMEGA_CITE, 'Bovine Gelatin'),
      labelCleared(OMEGA_CITE, 'Glycerin'),
      labelCleared(OMEGA_CITE, 'Purified Water'),
      flag(
        'Natural Mixed Tocopherols',
        'cleared',
        labelCite(OMEGA_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Omega-3 = Caution on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Official other-ingredients: Highly Refined and Concentrated Omega-3 Fish Oil (anchovy), Bovine Gelatin, Glycerin, Purified Water, Lemon Oil (lemon peel extract), Natural Mixed Tocopherols. Driver is Lemon Oil (lemon peel extract) as natural-flavor Limited (1 pt Caution). Bovine gelatin / glycerin / purified water are Cleared. Natural mixed tocopherols are Cleared-class antioxidants. Softgel fish-oil fill is NOT the gummy seed/industrial-oil High rule. Fish oil (anchovy) is the labeled active, not an inactive demerit. Pack sizes share formulaId when the other-ingredients list holds. Contains fish (anchovy). Contains bovine gelatin. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      NO_CLEAN_FISH_OIL,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${OMEGA_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
    ],
  },
];
