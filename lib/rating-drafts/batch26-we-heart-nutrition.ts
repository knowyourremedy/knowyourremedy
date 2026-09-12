// DRAFT / not verified / batch 26 We Heart Nutrition / founder calls
// locked / methodology untouched.
//
// Official source: SupplementFacts_*_0926.png panels (not marketing
// page text). Mixed categories (Vitamins + Immune Support) · audience
// 'adult' · recordStatus is 'unverified' on every row. Founder calls
// (locked): see notes below. Methodology v1.6 grades only — do not
// change locked ingredient grades. Do NOT invent Clean. Do NOT invent
// a grade for Organic Rice Hull Extract (UNGRADED; ≠ rice flour). Do
// NOT write W6 Omega-3. Do NOT invent UPCs. Barcodes omitted — match
// prior rating-draft batches. Pack sizes share formulaId. formulaId ==
// id on every row (same pattern as prior batches). Form is labeled on
// cleanAlternatives, not a hard filter (§6). This draft set is Clean
// only — cleanAlternatives omitted on every row (honest empty; no
// Caution / Avoid peers in this file). Not wired into Clean Picks UI.
// No live Clean Picks file is edited from this draft.
// Methodology.md / PROJECT_NOTES.md are untouched.
//
// OTHER-INGREDIENTS LOCK (CLEAN ONLY): Official 0926 Supplement Facts
// panels must be exactly HPMC / hypromellose / hydroxypropylmethylcellulose
// + water ± organic rice flour. All Cleared (§5). Organic Rice Hull
// Extract is UNGRADED (v1.6 — do not invent a grade; ≠ rice flour) —
// those SKUs are FLAG, not written. Calcium stearate is outside the
// HPMC+water±organic-rice-flour lock and needs founder confirm before
// Clean. No gellan. No SiO2. No TiO2 / dye / talc / PEG / flavor.
// Brand story / donations / Clean Label Project Purity Award are NOT
// grade drivers and are not used in any row. Truemed is a purchase
// path via the brand — retailer chip is We Heart Nutrition only.
//
// FOUNDER CALLS (LOCKED) — write these 5 Clean rows only:
// CLEAN
// - W3 Wholesome Women’s Multi = Clean. Official 0926 panel:
//   vegetarian capsule (HPMC, water) ± organic rice flour. Zinc parked.
// - W4 Wholesome Women’s Multi 40+ = Clean. Official 0926 panel:
//   vegetarian capsule (HPMC, water) ± organic rice flour. Zinc parked.
//   Labeled for women 40+.
// - W5 Wholesome Men’s Multi = Clean. Official 0926 panel:
//   vegetarian capsule (HPMC, water) ± organic rice flour. Zinc parked.
// - W9 Wholesome Iron = Clean. Official 0926 panel: organic rice flour
//   + vegetarian capsule (HPMC, water). Iron (as ferrous bisglycinate)
//   13.5mg. On-carton iron overdose keep-away note required. Grade
//   inactives only — do not invent an iron active-safety Avoid /
//   Caution beyond that note.
// - W10 Wholesome Immunity = Clean. Official 0926 panel: vegan capsule
//   (HPMC, water), organic rice flour. Actives as labeled (listed
//   neutrally). Zinc parked. Milk / bovine-colostrum allergen
//   disclosure is a note, not a grade. Immune Support (batch 9
//   category string).
//
// TALLY (unverified drafts): 5 rows — Clean 5 / Caution 0 / Avoid 0.
// Independently Clean in THIS batch: the 5 written rows.
// cleanAlternatives omitted on every Clean row.
//
// formulaIds:
// - we-heart-wholesome-womens-multi (Clean, Vitamins)
// - we-heart-wholesome-womens-multi-40 (Clean, Vitamins)
// - we-heart-wholesome-mens-multi (Clean, Vitamins)
// - we-heart-wholesome-iron (Clean, Vitamins)
// - we-heart-wholesome-immunity (Clean, Immune Support)
//
// FLAG / SKIP (do not write rows):
// - W1 Wholesome Prenatal — FLAG. Official 0926 panel lists Organic
//   Rice Hull Extract (UNGRADED; ≠ rice flour). Do not invent a grade.
//   Do not keep a Clean row.
// - W2 Wholesome Postnatal — FLAG. Same Organic Rice Hull Extract
//   UNGRADED lock as prenatal.
// - W7 Wholesome Probiotic — FLAG. Official 0926 panel lists Organic
//   Rice Hull Extract (UNGRADED; ≠ rice flour).
// - W11 Wholesome Balance — FLAG. Official 0926 panel lists Organic
//   Rice Hull Extract (UNGRADED; ≠ rice flour).
// - W8 Wholesome Magnesium Glycinate — FLAG pending. Official 0926
//   panel OI is HPMC + water + Calcium Stearate (not HPMC±organic rice
//   flour only). Founder lock was HPMC+water±rice flour only; Ca
//   stearate needs founder confirm before Clean. Do not invent Clean.
// - W6 Wholesome Omega-3 — FLAG skip entirely. Do not invent Clean.
//   Do not write Caution without a full carton other-ingredients list.
// - Thrive / Thorne.com / B-Alive / Amazon / Dollar Tree
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety
// grade. Grade inactives only. Every zinc-containing row's honestNote
// says zinc is parked. No dosing. No medical advice. No "consult your
// doctor" prescriptions. Iron-free design on the written multi
// formulas is not a cleanliness demerit. Iron overdose child warning
// is noted as on-carton on the iron row only.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const VITAMINS = 'Vitamins';
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

function riceFlour(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.starches));
}

function hpmcCapsule(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.hpmc));
}

const ZINC_PARKED =
  'Zinc (oxide / citrate / bisglycinate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const IRON_FREE_NOT_DEMERIT =
  'Iron is intentionally omitted on this formula (iron-free by design). That omission is not a cleanliness demerit.';

const IRON_OVERDOSE_CARTON =
  'On-carton iron overdose warning: accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6 — keep out of reach of children.';

const WOMENS_MULTI_ID = 'we-heart-wholesome-womens-multi';
const WOMENS_MULTI_40_ID = 'we-heart-wholesome-womens-multi-40';
const MENS_MULTI_ID = 'we-heart-wholesome-mens-multi';
const IRON_ID = 'we-heart-wholesome-iron';
const IMMUNITY_ID = 'we-heart-wholesome-immunity';

const WOMENS_MULTI_CITE =
  'We Heart Nutrition Wholesome Women\'s Multi official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients (vegetarian capsule (hydroxypropylmethylcellulose, water) ± organic rice flour; no Organic Rice Hull Extract; no calcium stearate; no gellan / SiO2 / TiO2 / dye)';
const WOMENS_MULTI_40_CITE =
  'We Heart Nutrition Wholesome Women\'s Multi 40+ official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients (vegetarian capsule (hydroxypropylmethylcellulose, water) ± organic rice flour; no Organic Rice Hull Extract; no calcium stearate; no gellan / SiO2 / TiO2 / dye)';
const MENS_MULTI_CITE =
  'We Heart Nutrition Wholesome Men\'s Multi official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients (vegetarian capsule (hydroxypropylmethylcellulose, water) ± organic rice flour; no Organic Rice Hull Extract; no calcium stearate; no gellan / SiO2 / TiO2 / dye)';
const IRON_CITE =
  'We Heart Nutrition Wholesome Iron official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients (organic rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water); no Organic Rice Hull Extract; no calcium stearate; no gellan / SiO2 / TiO2 / dye)';
const IMMUNITY_CITE =
  'We Heart Nutrition Wholesome Immunity official SupplementFacts_*_0926.png panel (not marketing-page text) other-ingredients (vegan capsule (hydroxypropylmethylcellulose, water), organic rice flour; no Organic Rice Hull Extract; no calcium stearate; no gellan / SiO2 / TiO2 / dye)';

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
      hpmcCapsule(WOMENS_MULTI_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(WOMENS_MULTI_CITE, 'Organic rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Women\'s Multi = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Matched other-ingredients: vegetarian capsule (hydroxypropylmethylcellulose, water) ± organic rice flour. HPMC / water and organic rice flour are Cleared (§5). Official panel does not list Organic Rice Hull Extract (UNGRADED; ≠ rice flour — do not invent a grade) or calcium stearate. No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc. Iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
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
      hpmcCapsule(WOMENS_MULTI_40_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(WOMENS_MULTI_40_CITE, 'Organic rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Women\'s Multi 40+ = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Matched other-ingredients: vegetarian capsule (hydroxypropylmethylcellulose, water) ± organic rice flour. HPMC / water and organic rice flour are Cleared (§5). Official panel does not list Organic Rice Hull Extract (UNGRADED; ≠ rice flour — do not invent a grade) or calcium stearate. No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc. Carton / brand page is labeled for women 40+. Iron-free design is not a cleanliness demerit. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
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
      hpmcCapsule(MENS_MULTI_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(MENS_MULTI_CITE, 'Organic rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Men\'s Multi = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Matched other-ingredients: vegetarian capsule (hydroxypropylmethylcellulose, water) ± organic rice flour. HPMC / water and organic rice flour are Cleared (§5). Official panel does not list Organic Rice Hull Extract (UNGRADED; ≠ rice flour — do not invent a grade) or calcium stearate. No gellan, silicon dioxide, titanium dioxide, synthetic dye, or talc. Lycopene / beta-sitosterol / trans-resveratrol are labeled actives listed neutrally — this draft grades inactives only. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
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
      riceFlour(IRON_CITE, 'Organic rice flour'),
      hpmcCapsule(IRON_CITE, 'Vegetarian capsule (hydroxypropylmethylcellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Iron = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Matched other-ingredients: organic rice flour; vegetarian capsule (hydroxypropylmethylcellulose, water). HPMC / water and organic rice flour are Cleared (§5). Official panel does not list Organic Rice Hull Extract (UNGRADED; ≠ rice flour — do not invent a grade) or calcium stearate. No gellan, silicon dioxide, titanium dioxide, or synthetic dye. This draft grades inactives only and does not invent an iron active-safety Avoid or Caution beyond the on-carton overdose keep-away note. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
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
      hpmcCapsule(IMMUNITY_CITE, 'Vegan capsule (hydroxypropylmethylcellulose, water)'),
      riceFlour(IMMUNITY_CITE, 'Organic rice flour'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: We Heart Nutrition Wholesome Immunity = Clean on the official SupplementFacts_*_0926.png panel only (not marketing-page text). Matched other-ingredients: vegan capsule (hydroxypropylmethylcellulose, water), organic rice flour. HPMC / water and organic rice flour are Cleared (§5). Official panel does not list Organic Rice Hull Extract (UNGRADED; ≠ rice flour — do not invent a grade) or calcium stearate. No gellan, silicon dioxide, titanium dioxide, or synthetic dye. Labeled actives (PureWay-C vitamin C, D3, zinc bisglycinate, selenium, beta-glucan, quercetin phytosome, bovine colostrum) are listed neutrally; this draft grades inactives only and makes no efficacy claim. Bovine colostrum is a milk-derived active — milk / colostrum allergen disclosure is a note, not a grade. Pack sizes / refill pouch vs starter bottle share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${IMMUNITY_CITE} — draft, not verified; official 0926 panel; no DailyMed drug SPL`,
    ],
  },
];
