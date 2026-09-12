// DRAFT / not verified / batch 17 kids vitamins / founder calls locked /
// kids audience + minAge every row / no Clean invent / zinc parked /
// methodology untouched / L'il Critters coconut-and/or-palm = Avoid not
// coconut-only / chewable soy oil ≠ gummy High alone.
//
// Vitamins · audience 'kids' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology
// v1.6 grades only — do not change locked ingredient grades.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6). This draft
// set has NO independently Clean kids multi — cleanAlternatives are omitted
// (honest empty; do not point at products outside this batch; do not fake
// Clean).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from
// this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// L'IL CRITTERS SPLIT (LOCKED): standard Gummy Vites "coconut and/or palm"
// = Avoid. Coconut-only carton would be Caution (natural flavors + coconut
// oil) on a separate formulaId — SKIPPED this batch (K9); no coconut-only
// carton confirmed. Coconut oil alone in gummies is NOT the
// seed/industrial-oil High rule. Paw Patrol shares the oil blend — same
// Avoid family, not a second grade.
//
// CHEWABLE SOY OIL (LOCKED): hydrogenated vegetable oil (soy) in a
// chewable tablet is NOT the gummy seed-oil High rule alone. Flintstones
// Complete chewables are Avoid because of FD&C lakes, not the soy oil.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// AVOID — gummies with palm / canola / sunflower / veg oil
// - K1 Flintstones Complete Gummies = Avoid. Vegetable oil (palm) +
//   natural flavor. minAge 2. Target other-ingredients.
// - K2 L'il Critters Gummy Vites (standard; Paw Patrol shares oil blend)
//   = Avoid. Blend of oils (coconut and/or palm) — NOT coconut-only
//   Caution. minAge 2. Target / Vitacost.
// - K3 One A Day Kids Multi Gummies (± Iron same oil) = Avoid. Vegetable
//   oil (palm). minAge 4. CVS / Fig.
// - K4 Kirkland Signature Children's Complete Multivitamin Gummies =
//   Avoid. Vegetable oil (palm). minAge 2 (typical kids gummy floor —
//   confirm carton). Instacart / HelloPharmacist.
// - K5 Equate Kids Multivitamin Gummies = Avoid. Palm oil blend. minAge 2
//   (confirm carton). Open Food Facts / retailer.
// - K6 MaryRuth's Organic Kids Multivitamin Gummies = Avoid. Organic
//   sunflower oil + natural flavor + organic maltodextrin. minAge 4.
//   IngredientList / brand.
// CAUTION — no seed oil gummy
// - K8 SmartyPants Kids Plus Multi & Omegas = Caution. Natural flavors +
//   annatto Caution; brand other-ingredients list has NO palm / canola /
//   veg / coconut oil (organic cane sugar, tapioca syrup, pectin, gelatin,
//   citric acid, natural flavors, colors from annatto / turmeric / black
//   carrot). minAge 4. smartypantsvitamins.com.
// AVOID — chewables
// - K10 Flintstones Complete Chewable Tablets = Avoid. FD&C Blue #2 /
//   Red #40 / Yellow #6 lakes + sucralose Moderate + SiO2 Caution cap +
//   N&A flavors. Hydrogenated vegetable oil (soy) is NOT the gummy
//   seed-oil High rule alone — dyes drive Avoid. minAge 2 (label: ½
//   tablet ages 2–3; full 4+). CVS inactive list / Open Food Facts.
// CAUTION — liquid
// - K13 MaryRuth's Kids Morning Multivitamin Liquid = Caution. Natural
//   flavors Limited; purified water, vegetable glycerin, citric acid,
//   xanthan gum, grape skin extract (color) Cleared-class. minAge 1.
//   Target / IngredientList. Zinc parked.
// CLEAN
// - None. Do not invent Clean. Prefer zero Clean rows over a fake one.
//
// TALLY (unverified drafts): 9 rows — Clean 0 / Caution 2 (K8, K13) /
// Avoid 7 (K1–K6, K10). Independently Clean in THIS batch: none.
// cleanAlternatives omitted on every row — no Clean kids multi is in this
// draft set; do not invent one and do not point at products outside this
// batch.
//
// TiO2 / talc / synthetic dyes / BHT / BHA / aspartame / seed-industrial
// oils in gummies (palm, canola, vegetable oil, soybean, sunflower) =
// High Avoid. Sucralose = Moderate. Natural flavor / non-organic
// maltodextrin = Limited. Organic maltodextrin is Cleared-class — do NOT
// score it as the Limited non-organic maltodextrin row. SiO2 / silica =
// Caution cap (0 demerit points), not Avoid alone. Annatto = Caution
// (not Avoid); standalone, not additive-scored. Coconut oil alone in
// gummies is NOT seed-oil High. Hydrogenated soy oil in a chewable is
// not gummy seed-oil High.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - K9 coconut-only invent (no carton)
// - K11 Centrum Kids chewable — no matched US carton (do not use EU label)
// - K12 store chewables without matched dye / TiO2 carton
// - K7 generic store gummies without a specific matched SKU + oil list
//   (K1–K6 cover confirmed palm / sunflower nationals / club / store Equate)
// - Store liquids unmatched
// - Protein powder, Amazon-only, adult multis, prenatals
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Every zinc-containing row's honestNote says zinc
// is parked. Silicon dioxide / silica = Caution cap, not Avoid alone.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const VITAMINS = 'Vitamins';
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, "vegetable oil", sunflower)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  annatto:
    'Methodology §5 Caution (annatto — allergenic; standalone Caution, not additive-scored, not Avoid)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  coconutOil:
    'Methodology §5 — coconut oil / fractionated coconut oil alone is NOT the gummy seed/industrial-oil High rule',
  chewableOil:
    'Methodology §5 — hydrogenated / seed oil in a CHEWABLE TABLET is NOT the gummy seed/industrial-oil High rule',
  organicMaltodextrin:
    'Methodology §5 Cleared — organic maltodextrin is NOT the Limited non-organic maltodextrin row',
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
  'Zinc (oxide / citrate / gluconate / sulfate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const NO_CLEAN_KIDS_MULTI =
  'No independently Clean kids multi exists in this draft set — cleanAlternatives omitted (honest empty; form cannot be labeled on a nonexistent §6 swap). Do not invent Clean.';

const IRON_OVERDOSE_CARTON =
  'On-carton iron overdose warning (when iron is labeled): accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6 — keep out of reach of children.';

const FLINTSTONES_GUMMY_CITE =
  'Flintstones Complete Gummies Target other-ingredients (vegetable oil (palm) + natural flavor)';
const LIL_CRITTERS_CITE =
  "L'il Critters Gummy Vites (standard) Target / Vitacost other-ingredients (blend of oils (coconut and/or palm) with beeswax and/or carnauba wax)";
const OAD_KIDS_GUMMY_CITE =
  'One A Day Kids Multi Gummies CVS / Fig other-ingredients (vegetable oil (palm) + natural flavors)';
const KIRKLAND_KIDS_GUMMY_CITE =
  "Kirkland Signature Children's Complete Multivitamin Gummies Instacart / HelloPharmacist other-ingredients (vegetable oil (palm) + natural flavors; HelloPharmacist lists vegetable oil)";
const EQUATE_KIDS_GUMMY_CITE =
  'Equate Kids Multivitamin Gummies Open Food Facts / retailer other-ingredients (blend of oils (coconut and/or palm) with beeswax and/or carnauba wax; HelloPharmacist: blend of oils, contains coconut)';
const MARYRUTH_GUMMY_CITE =
  "MaryRuth's Organic Kids Multivitamin Gummies IngredientList / brand / Target other-ingredients (organic sunflower oil + natural flavor + organic maltodextrin)";
const SMARTYPANTS_CITE =
  'SmartyPants Kids Plus Multi & Omegas smartypantsvitamins.com other-ingredients (organic cane sugar, organic tapioca syrup, pectin, gelatin, citric acid, natural flavors, colors added (organic annatto extract, organic turmeric extract, organic black carrot juice concentrate) — no palm / canola / vegetable / coconut oil)';
const FLINTSTONES_CHEW_CITE =
  'Flintstones Complete Chewable Tablets CVS inactive list / Open Food Facts (FD&C Blue #2 / Red #40 / Yellow #6 lakes + sucralose + silicon dioxide + natural & artificial flavors + hydrogenated vegetable oil (soy))';
const MARYRUTH_LIQUID_CITE =
  "MaryRuth's Kids Morning Multivitamin Liquid Target / IngredientList other-ingredients (purified water, vegetable glycerin, natural flavors, citric acid, xanthan gum, grape skin extract (color))";

export const BATCH17_KIDS_VITAMINS: RatingRecord[] = [
  // ── Caution ──────────────────────────────────────────────
  {
    id: 'smartypants-kids-plus-multi-omegas',
    productName: 'SmartyPants Kids Plus Multi & Omegas',
    brand: 'SmartyPants',
    category: VITAMINS,
    formulaId: 'smartypants-kids-plus-multi-omegas',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Kids multivitamin / multimineral + omega-3s (algal oil)',
        strength: '2 gummies (label serving)',
      },
      { name: 'Zinc (as zinc citrate)', strength: '1.6mg' },
      { name: 'Omega-3 fatty acids (DHA + EPA from algal oil)', strength: '85mg' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(SMARTYPANTS_CITE, METH.flavors)),
      flag(
        'Organic annatto extract (color)',
        'cleared',
        labelCite(SMARTYPANTS_CITE, METH.annatto),
      ),
      labelCleared(SMARTYPANTS_CITE, 'Organic cane sugar'),
      labelCleared(SMARTYPANTS_CITE, 'Organic tapioca syrup'),
      flag('Pectin', 'cleared', labelCite(SMARTYPANTS_CITE, METH.gums)),
      labelCleared(SMARTYPANTS_CITE, 'Gelatin'),
      labelCleared(SMARTYPANTS_CITE, 'Citric acid'),
      labelCleared(SMARTYPANTS_CITE, 'Organic turmeric extract (color)'),
      labelCleared(SMARTYPANTS_CITE, 'Organic black carrot juice concentrate (color)'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: SmartyPants Kids Plus Multi & Omegas = Caution. Drivers are natural flavors (Limited) + annatto (standalone Caution, not Avoid, not additive-scored). Brand other-ingredients on smartypantsvitamins.com: organic cane sugar, organic tapioca syrup, pectin, gelatin, citric acid, natural flavors, colors added (organic annatto extract, organic turmeric extract, organic black carrot juice concentrate). That list has NO palm / canola / vegetable / coconut oil — do not invent a seed-oil Avoid on this formulaId. Vitamin E may appear on supplement facts as d-alpha-tocopherol from sunflower oil — that is the vitamin form, not an other-ingredients gummy oil. Toddler Plus / Organic Kids / Zero Sugar siblings that list organic sunflower oil are different formulas — not this row. Confirm the carton. No DailyMed drug SPL (dietary supplement). Ages 4+ (2 gummies daily as labeled). ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['Target', 'Whole Foods', 'Vitamin shops', 'Grocery'],
    sourcesGeneral: [
      `${SMARTYPANTS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'maryruth-kids-morning-liquid-multi',
    productName: "MaryRuth's Kids Morning Multivitamin Liquid",
    brand: "MaryRuth's",
    category: VITAMINS,
    formulaId: 'maryruth-kids-morning-liquid-multi',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids liquid multivitamin / multimineral', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(MARYRUTH_LIQUID_CITE, METH.flavors)),
      labelCleared(MARYRUTH_LIQUID_CITE, 'Purified water'),
      labelCleared(MARYRUTH_LIQUID_CITE, 'Vegetable glycerin'),
      labelCleared(MARYRUTH_LIQUID_CITE, 'Citric acid'),
      flag('Xanthan gum', 'cleared', labelCite(MARYRUTH_LIQUID_CITE, METH.gums)),
      labelCleared(MARYRUTH_LIQUID_CITE, 'Grape skin extract (color)'),
    ],
    verdict: 'caution',
    honestNote:
      "FOUNDER CALL: MaryRuth's Kids Morning Multivitamin Liquid = Caution. Driver is natural flavors (Limited). Target / IngredientList other-ingredients: purified water, vegetable glycerin, natural flavors, citric acid, xanthan gum, grape skin extract (color) — those remaining inactives are Cleared-class. No seed / industrial oil, no synthetic dye, no sucralose. Confirm the carton. No DailyMed drug SPL (dietary supplement). Ages 1+ as locked (label serving; some cartons also list a younger infant chart — confirm the bottle). " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['Target', 'CVS', 'Vitamin shops'],
    sourcesGeneral: [
      `${MARYRUTH_LIQUID_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'flintstones-complete-gummies-palm',
    productName: 'Flintstones Complete Gummies',
    brand: 'Flintstones',
    category: VITAMINS,
    formulaId: 'flintstones-complete-gummies-palm',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids complete multivitamin / multimineral', strength: '1–2 gummies (label serving)' },
      { name: 'Zinc (as zinc sulfate)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Vegetable oil (palm)', 'high', labelCite(FLINTSTONES_GUMMY_CITE, METH.seedOilGummies)),
      flag('Natural flavor', 'limited', labelCite(FLINTSTONES_GUMMY_CITE, METH.flavors)),
      labelCleared(FLINTSTONES_GUMMY_CITE, 'Glucose syrup'),
      labelCleared(FLINTSTONES_GUMMY_CITE, 'Sugar'),
      labelCleared(FLINTSTONES_GUMMY_CITE, 'Water'),
      labelCleared(FLINTSTONES_GUMMY_CITE, 'Gelatin'),
      labelCleared(FLINTSTONES_GUMMY_CITE, 'Beeswax'),
      labelCleared(FLINTSTONES_GUMMY_CITE, 'Carnauba wax'),
      labelCleared(FLINTSTONES_GUMMY_CITE, 'Citric acid'),
      labelCleared(
        FLINTSTONES_GUMMY_CITE,
        'Color (apple, black currant and carrot juice concentrates)',
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Flintstones Complete Gummies = Avoid. Target other-ingredients list vegetable oil (palm) + natural flavor. Palm / vegetable oil in a gummy is High-tier. Natural flavor is Limited (not needed to reach Avoid). Juice-concentrate colors are Cleared-class (not synthetic dyes). Some 70-ct snapshots say “vegetable oil (coconut or palm)” — palm on that line is still this Avoid formulaId; coconut on the same or-line does not clear the palm High. Contains wheat (carton allergen). No DailyMed drug SPL. Ages 2–3: 1 gummy; 4+: 2 gummies as labeled. Not for children under 2. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['Target', 'CVS', 'Walgreens', 'Walmart', 'Grocery'],
    sourcesGeneral: [
      `${FLINTSTONES_GUMMY_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'lil-critters-gummy-vites-palm',
    productName: "L'il Critters Gummy Vites",
    brand: "L'il Critters",
    category: VITAMINS,
    formulaId: 'lil-critters-gummy-vites-palm',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids daily multivitamin', strength: '1–2 gummies (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Blend of oils (coconut and/or palm)',
        'high',
        labelCite(LIL_CRITTERS_CITE, METH.seedOilGummies),
      ),
      flag('Flavors', 'limited', labelCite(LIL_CRITTERS_CITE, METH.flavors)),
      flag('Annatto extract (color)', 'cleared', labelCite(LIL_CRITTERS_CITE, METH.annatto)),
      labelCleared(LIL_CRITTERS_CITE, 'Glucose syrup'),
      labelCleared(LIL_CRITTERS_CITE, 'Sugar'),
      labelCleared(LIL_CRITTERS_CITE, 'Water'),
      labelCleared(LIL_CRITTERS_CITE, 'Gelatin'),
      labelCleared(LIL_CRITTERS_CITE, 'Beeswax and/or carnauba wax'),
      labelCleared(LIL_CRITTERS_CITE, 'Citric acid'),
      labelCleared(
        LIL_CRITTERS_CITE,
        'Colors (blueberry and carrot concentrates, purple carrot juice concentrate)',
      ),
      labelCleared(LIL_CRITTERS_CITE, 'Lactic acid'),
      flag('Pectin', 'cleared', labelCite(LIL_CRITTERS_CITE, METH.gums)),
      labelCleared(LIL_CRITTERS_CITE, 'Sodium citrate'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: L'il Critters Gummy Vites (standard) = Avoid. Target / Vitacost other-ingredients list blend of oils (coconut and/or palm) — palm on that and/or line is the gummy seed/industrial-oil High rule. This is NOT a coconut-only Caution (K9 coconut-only invent is skipped; no coconut-only carton). Coconut on the same and/or line does not clear the palm High. Flavors are Limited (not needed to reach Avoid). Annatto as color is a standalone Caution note only on this already-Avoid palm row. Paw Patrol L'il Critters shares the same oil blend — same Avoid family, not a second formulaId. No-sugar-added Gummy Vites that keep the coconut-and/or-palm blend stay this oil-Avoid family; a later coconut-only carton would need its own formulaId (not written). Contains coconut (tree nut). No DailyMed drug SPL. Ages 2–3: 1 gummy; 4+: 2 gummies as labeled. Not recommended under 2 (choking). " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['Target', 'Walmart', 'Walgreens', 'Grocery'],
    sourcesGeneral: [
      `${LIL_CRITTERS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'one-a-day-kids-multi-gummies-palm',
    productName: 'One A Day Kids Multi Gummies',
    brand: 'One A Day',
    category: VITAMINS,
    formulaId: 'one-a-day-kids-multi-gummies-palm',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids multivitamin', strength: '2 gummies (label serving)' },
      { name: 'Zinc (as zinc gluconate)', strength: 'label serving' },
      { name: 'Iron (as ferrous fumarate)', strength: 'when labeled (Multi + Iron twin)' },
    ],
    inactiveIngredients: [
      flag('Vegetable oil (palm)', 'high', labelCite(OAD_KIDS_GUMMY_CITE, METH.seedOilGummies)),
      flag('Natural flavors', 'limited', labelCite(OAD_KIDS_GUMMY_CITE, METH.flavors)),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'Glucose syrup'),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'Sugar'),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'Water'),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'Food starch-modified (potato)'),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'Carnauba wax'),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'Citric acid'),
      labelCleared(
        OAD_KIDS_GUMMY_CITE,
        'Color (black currant, carrot, and paprika juice concentrates)',
      ),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'Sodium citrate'),
      labelCleared(OAD_KIDS_GUMMY_CITE, 'White beeswax'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: One A Day Kids Multi Gummies = Avoid. CVS / Fig other-ingredients list vegetable oil (palm). Palm in a gummy is High-tier. Natural flavors are Limited (not needed to reach Avoid). Multi + Iron gummies use the same vegetable oil (palm) inactive pattern (CVS: carrot and cherry juice concentrate + natural flavor + palm) — same Avoid oil family; iron is an active difference, not a second inactive grade. Juice-concentrate colors are Cleared-class. Confirm the carton. No DailyMed drug SPL. Ages 4+ (2 gummies daily as labeled; not for children under 4). ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${OAD_KIDS_GUMMY_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'kirkland-childrens-multi-gummies-palm',
    productName: "Kirkland Signature Children's Complete Multivitamin Gummies",
    brand: 'Kirkland Signature',
    category: VITAMINS,
    formulaId: 'kirkland-childrens-multi-gummies-palm',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids complete multivitamin / multimineral', strength: 'label serving' },
      { name: 'Zinc (as zinc citrate)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable oil (palm) (contains carnauba wax)',
        'high',
        labelCite(KIRKLAND_KIDS_GUMMY_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(KIRKLAND_KIDS_GUMMY_CITE, METH.flavors)),
      flag('Maltodextrin', 'limited', labelCite(KIRKLAND_KIDS_GUMMY_CITE, METH.maltodextrin)),
      labelCleared(KIRKLAND_KIDS_GUMMY_CITE, 'Corn syrup'),
      labelCleared(KIRKLAND_KIDS_GUMMY_CITE, 'Sugar'),
      labelCleared(KIRKLAND_KIDS_GUMMY_CITE, 'Water'),
      labelCleared(KIRKLAND_KIDS_GUMMY_CITE, 'Gelatin (porcine)'),
      labelCleared(KIRKLAND_KIDS_GUMMY_CITE, 'Citric acid'),
      labelCleared(KIRKLAND_KIDS_GUMMY_CITE, 'Vegetable and fruit juice (color)'),
      flag('Pectin', 'cleared', labelCite(KIRKLAND_KIDS_GUMMY_CITE, METH.gums)),
      labelCleared(KIRKLAND_KIDS_GUMMY_CITE, 'Spirulina extract (color)'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: Kirkland Signature Children's Complete Multivitamin Gummies = Avoid. Instacart lists vegetable oil (palm) (contains carnauba wax); HelloPharmacist lists vegetable oil. Palm / vegetable oil in a gummy is High-tier. Natural flavors and non-organic maltodextrin are Limited (not needed to reach Avoid). Confirm the carton lists palm / vegetable oil — a later no-oil carton would be a different formula (not written). minAge 2 is the typical kids gummy floor used because the matched age chart was not locked on the HelloPharmacist snapshot — confirm the bottle (Costco kids complete gummies are commonly 2+; not for under 2 if the carton says so). No DailyMed drug SPL. " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['Costco'],
    sourcesGeneral: [
      `${KIRKLAND_KIDS_GUMMY_CITE} — draft, not verified; carton-confirm required (oil + age); no DailyMed drug SPL`,
    ],
  },
  {
    id: 'equate-kids-multi-gummies-palm',
    productName: 'Equate Kids Multivitamin Gummies',
    brand: 'Equate',
    category: VITAMINS,
    formulaId: 'equate-kids-multi-gummies-palm',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids multivitamin / multimineral', strength: '1–2 gummies (label serving)' },
      { name: 'Zinc (as zinc gluconate)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Blend of oils (coconut and/or palm)',
        'high',
        labelCite(EQUATE_KIDS_GUMMY_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(EQUATE_KIDS_GUMMY_CITE, METH.flavors)),
      labelCleared(EQUATE_KIDS_GUMMY_CITE, 'Glucose syrup'),
      labelCleared(EQUATE_KIDS_GUMMY_CITE, 'Sugar'),
      labelCleared(EQUATE_KIDS_GUMMY_CITE, 'Water'),
      labelCleared(EQUATE_KIDS_GUMMY_CITE, 'Gelatin'),
      labelCleared(EQUATE_KIDS_GUMMY_CITE, 'Beeswax and/or carnauba wax'),
      labelCleared(EQUATE_KIDS_GUMMY_CITE, 'Citric acid'),
      labelCleared(
        EQUATE_KIDS_GUMMY_CITE,
        'Colors (blueberry and carrot concentrates, purple carrot juice concentrate)',
      ),
      flag('Pectin', 'cleared', labelCite(EQUATE_KIDS_GUMMY_CITE, METH.gums)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate Kids Multivitamin Gummies = Avoid. Open Food Facts / retailer other-ingredients match a L\'il Critters-style blend of oils (coconut and/or palm) with beeswax and/or carnauba wax; HelloPharmacist lists blend of oils and “contains coconut.” Palm on that blend is High — this is NOT a coconut-only Caution. Natural flavors are Limited (not needed to reach Avoid). Confirm the carton: a later Equate kids gummy snapshot (cane sugar / tapioca syrup / pectin / no oil) is a different formula — not this row; do not invent Clean on that unmatched twin. minAge 2 with carton-confirm (OFF / retailer 2–3 year chart; typical kids gummy floor). Contains coconut (tree nut) on the palm-blend carton. No DailyMed drug SPL. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['Walmart'],
    sourcesGeneral: [
      `${EQUATE_KIDS_GUMMY_CITE} — draft, not verified; carton-confirm required (oil + age); no DailyMed drug SPL`,
    ],
  },
  {
    id: 'maryruth-organic-kids-multi-gummies-sunflower',
    productName: "MaryRuth's Organic Kids Multivitamin Gummies",
    brand: "MaryRuth's",
    category: VITAMINS,
    formulaId: 'maryruth-organic-kids-multi-gummies-sunflower',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Organic kids multivitamin / multimineral', strength: '2 gummies (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Organic sunflower oil',
        'high',
        labelCite(MARYRUTH_GUMMY_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(MARYRUTH_GUMMY_CITE, METH.flavors)),
      flag(
        'Organic maltodextrin',
        'cleared',
        labelCite(MARYRUTH_GUMMY_CITE, METH.organicMaltodextrin),
      ),
      labelCleared(MARYRUTH_GUMMY_CITE, 'Organic glucose / vegetable syrup'),
      labelCleared(MARYRUTH_GUMMY_CITE, 'Organic cane sugar'),
      labelCleared(MARYRUTH_GUMMY_CITE, 'Purified water'),
      flag('Pectin', 'cleared', labelCite(MARYRUTH_GUMMY_CITE, METH.gums)),
      labelCleared(MARYRUTH_GUMMY_CITE, 'Citric acid'),
      labelCleared(
        MARYRUTH_GUMMY_CITE,
        'Organic vegetable / fruit juice (color)',
      ),
      labelCleared(MARYRUTH_GUMMY_CITE, 'Organic carnauba wax'),
      labelCleared(MARYRUTH_GUMMY_CITE, 'Sodium citrate'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: MaryRuth's Organic Kids Multivitamin Gummies = Avoid. IngredientList / brand / Target other-ingredients list organic sunflower oil + natural flavor + organic maltodextrin. Organic sunflower oil in a gummy is High-tier (seed/industrial oils in gummies). Natural flavors are Limited (not needed to reach Avoid). Organic maltodextrin is Cleared-class — do NOT score it as the Limited non-organic maltodextrin row (same lock as Genexa organic-maltodextrin rows). Sugar-free MaryRuth kids gummies are a different formula (not this row). Confirm the carton. No DailyMed drug SPL. Ages 4+ as labeled (unlike many 2+ kids gummies). " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['Target', 'Whole Foods', 'Vitamin shops'],
    sourcesGeneral: [
      `${MARYRUTH_GUMMY_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'flintstones-complete-chewables-dyed',
    productName: 'Flintstones Complete Chewable Tablets',
    brand: 'Flintstones',
    category: VITAMINS,
    formulaId: 'flintstones-complete-chewables-dyed',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids complete multivitamin / multimineral', strength: '½–1 tablet (label serving)' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc (as zinc oxide)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue #2 Aluminum Lake',
        'high',
        labelCite(FLINTSTONES_CHEW_CITE, METH.dyes),
      ),
      flag(
        'FD&C Red #40 Aluminum Lake',
        'high',
        labelCite(FLINTSTONES_CHEW_CITE, METH.dyes),
      ),
      flag(
        'FD&C Yellow #6 Aluminum Lake',
        'high',
        labelCite(FLINTSTONES_CHEW_CITE, METH.dyes),
      ),
      flag('Sucralose', 'moderate', labelCite(FLINTSTONES_CHEW_CITE, METH.sucralose)),
      flag(
        'Natural & artificial flavors',
        'limited',
        labelCite(FLINTSTONES_CHEW_CITE, METH.flavors),
      ),
      flag('Maltodextrin', 'limited', labelCite(FLINTSTONES_CHEW_CITE, METH.maltodextrin)),
      flag('Sorbitol', 'limited', labelCite(FLINTSTONES_CHEW_CITE, METH.sorbitol)),
      flag('Mannitol', 'limited', labelCite(FLINTSTONES_CHEW_CITE, METH.mannitol)),
      flag('Silicon dioxide', 'cleared', labelCite(FLINTSTONES_CHEW_CITE, METH.sio2)),
      flag(
        'Hydrogenated vegetable oil (soy)',
        'cleared',
        labelCite(FLINTSTONES_CHEW_CITE, METH.chewableOil),
      ),
      labelCleared(FLINTSTONES_CHEW_CITE, 'Fructose'),
      labelCleared(FLINTSTONES_CHEW_CITE, 'Gelatin'),
      labelCleared(FLINTSTONES_CHEW_CITE, 'Magnesium stearate'),
      labelCleared(FLINTSTONES_CHEW_CITE, 'Soy lecithin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Flintstones Complete Chewable Tablets = Avoid. CVS inactive list / Open Food Facts: FD&C Blue #2 Aluminum Lake + FD&C Red #40 Aluminum Lake + FD&C Yellow #6 Aluminum Lake + sucralose + silicon dioxide + natural & artificial flavors + hydrogenated vegetable oil (soy). Synthetic lake dyes drive Avoid (High). Sucralose is Moderate; N&A flavors are Limited; SiO2 is the nanoparticle Caution cap (0 demerit points). Hydrogenated vegetable oil (soy) in a chewable tablet is NOT the gummy seed-oil High rule alone — do not treat chewable soy oil as a second High. Sorbitol / mannitol / maltodextrin are Limited on the CVS list (not needed to reach Avoid). Contains wheat and soy. Confirm the carton. No DailyMed drug SPL. Ages 2–3: ½ tablet; 4+: 1 tablet as labeled. Not for children under 2. ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_KIDS_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${FLINTSTONES_CHEW_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];
