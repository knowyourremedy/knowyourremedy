// DRAFT / not verified / batch 15 prenatals / adult Vitamins
// Vitamins · audience 'adult' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6). This draft set
// has NO independently Clean prenatal — cleanAlternatives are omitted (honest
// empty; do not point at products outside this batch; do not fake Clean).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from this
// draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// P3 / P9 SPLIT (LOCKED): One A Day Prenatal 1 softgels WITH TiO2 / FD&C
// Blue #1 / Red #40 (`one-a-day-prenatal-1-softgels`) = Avoid. Softgel carton
// WITHOUT FD&C / TiO2 (`one-a-day-prenatal-softgels-no-dye`) = Caution, NOT
// Clean, until the physical carton is matched. Separate formulaIds. Do not
// merge them.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// AVOID
// - P1 Centrum Prenatal / Centrum Specialist Prenatal coated tablet = Avoid.
//   TiO2 + talc + BHT (± carmine Caution note only). DailyMed Specialist
//   Prenatal / Centrum prenatal non-medicinal / US label patterns.
// - P2 Equate Daily Prenatal Multivitamin coated tablet = Avoid. TiO2 + talc
//   + Red 40 / Blue 2 lakes + PEG + SiO2. HelloPharmacist / retailer
//   other-ingredients.
// - P3 One A Day Prenatal 1 softgels WITH TiO2 / FD&C Blue #1 / Red #40 =
//   Avoid. CVS inactive list. Separate formulaId from P9.
// - P4 Store coated prenatals with TiO2, dye, or talc = Avoid. THREE rows
//   (confirm carton lists TiO2 / dye / talc):
//   CVS Health Prenatal coated; up&up (Target) Prenatal coated; Walgreens
//   Prenatal coated. Typical private-label twin pattern (TiO2 ± dye ± talc).
// - P10 OLLY Essential Prenatal Multivitamin gummies = Avoid. Vegetable oil
//   (coconut, canola) + natural flavors. Canola in a gummy is High. Target
//   other-ingredients.
// CAUTION
// - P5 Nature Made Prenatal Multi tablets = Caution. PEG + SiO2 +
//   maltodextrin. NO TiO2 / dye / talc on matched Target / Instacart lists.
//   Hydrogenated soybean oil if present on some older lists is TABLET oil —
//   NOT the gummy seed-oil High rule (do not Avoid for that alone).
// - P9 One A Day Prenatal softgel carton WITHOUT FD&C / TiO2 = Caution, NOT
//   Clean, until the label is matched. Separate formulaId from P3.
// - P12 Nature Made Prenatal gummies (Folic Acid + DHA + Choline) = Caution.
//   Natural flavors + color added; no palm / canola / veg oil on matched
//   Target / CVS lists (sucrose fatty acid esters ≠ seed-oil High).
// CLEAN
// - None. Do not invent Clean for an uncoated / dye-free prenatal without an
//   exact SKU + matched label. Prefer zero Clean rows over a fake one.
//
// TALLY (unverified drafts): 10 rows — Clean 0 / Caution 3 / Avoid 7.
// Independently Clean in THIS batch: none. cleanAlternatives omitted on
// every row — no Clean prenatal is in this draft set; do not invent one and
// do not point at products outside this batch.
//
// TiO2 / talc / synthetic dyes / BHT / BHA / seed-industrial oils in
// gummies (palm, canola, vegetable oil, soybean) = High Avoid.
// Sucralose = Moderate. PEG = Moderate. Natural flavor / maltodextrin =
// Limited. SiO2 / silica = Caution cap (0 demerit points), not Avoid alone.
// Carmine = Caution (not Avoid); if the product is already Avoid for TiO2 /
// talc / BHT, carmine is a note only. Coconut oil alone in gummies is NOT
// seed-oil High. Hydrogenated oil in a tablet is not gummy seed-oil High.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - P6 MegaFood Baby & Me — not confirmed in-store
// - P7 uncoated Clean invent
// - P8 Nature Made Prenatal + DHA softgels — carton not matched
// - P11 vitafusion Prenatal — oil (palm vs coconut-only) not confirmed
// - Store prenatal gummies without confirmed oil
// - Ritual / Needed / Amazon-only / protein powder / postnatal-only unless
//   same formula
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Every zinc-containing row's honestNote says zinc is
// parked. Silicon dioxide / silica = Caution cap, not Avoid alone.
// Honest notes may say the carton is labeled for pregnancy / prenatal use.
// No dosing. No medical advice. No "consult your doctor" prescriptions.
// Iron overdose child warning may be noted as on-carton when iron is labeled.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  bht: 'Methodology §5 High-tier (BHT — locked Avoid, EU 2022 endocrine restriction)',
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, "vegetable oil", sunflower)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  carmine:
    'Methodology §5 Caution (cochineal / carmine — allergenic; standalone Caution, not Avoid)',
  annatto:
    'Methodology §5 Caution (annatto — allergenic; standalone Caution, not additive-scored, not Avoid)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  coconutOil:
    'Methodology §5 — coconut oil / fractionated coconut oil alone is NOT the gummy seed/industrial-oil High rule',
  tabletOil:
    'Methodology §5 — hydrogenated / seed oil in a TABLET is NOT the gummy seed/industrial-oil High rule',
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
  'Zinc (oxide / citrate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const NO_CLEAN_PRENATAL =
  'No independently Clean prenatal exists in this draft set — cleanAlternatives omitted (honest empty; form cannot be labeled on a nonexistent §6 swap). Do not invent Clean for an uncoated / dye-free prenatal without an exact SKU + matched label.';

const PRENATAL_LABEL =
  'Carton is labeled for prenatal / pregnancy use. No dosing or medical advice in this draft.';

const IRON_OVERDOSE_CARTON =
  'On-carton iron overdose warning (when iron is labeled): accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6 — keep out of reach of children.';

const CENTRUM_PRENATAL_CITE =
  'DailyMed setid d5fd7fd6-b5d8-4ada-adfd-6858343f7e30 (Centrum Specialist Prenatal tablet) / Centrum Prenatal US + Canada non-medicinal label patterns (TiO2 + talc + BHT ± carmine)';
const EQUATE_PRENATAL_CITE =
  'Equate Daily Prenatal Multivitamin HelloPharmacist / retailer other-ingredients (TiO2 + talc + Red 40 / Blue 2 lakes + PEG + SiO2)';
const OAD_PRENATAL_DYE_CITE =
  'One A Day Prenatal 1 Multivitamin Soft-Gels CVS inactive list (titanium dioxide (color) + FD&C Blue #1 + FD&C Red #40)';
const OAD_PRENATAL_NO_DYE_CITE =
  "One A Day Women's Prenatal 1 official Bayer livewell PDF (05/28/20 Version 002) — color (annatto extract [seed]); no FD&C / TiO2 on that PDF";
const CVS_PRENATAL_CITE =
  'CVS Health Prenatal Vitamins Open Food Facts / HelloPharmacist other-ingredients (TiO2 + talc + Red 40 / Yellow 6 lakes + BHT)';
const UPANDUP_PRENATAL_CITE =
  'up&up Prenatal Vitamin Dietary Supplement Tablets Target other-ingredients (titanium dioxide (color) + FD&C Blue No. 2 / Red No. 40 / Yellow No. 6 lakes + PEG + silica)';
const WALGREENS_PRENATAL_CITE =
  'Walgreens Prenatal Multivitamin with Folate HelloPharmacist / retailer other-ingredients (TiO2 + Blue 2 / Red 40 / Yellow 6 lakes + PEG + SiO2)';
const NM_PRENATAL_TAB_CITE =
  'Nature Made Prenatal Multi tablets Target / Instacart other-ingredients (PEG + SiO2 + maltodextrin; no TiO2 / dye / talc)';
const NM_PRENATAL_GUMMY_CITE =
  'Nature Made Prenatal Gummies (Folic Acid + DHA + Choline) Target / CVS other-ingredients (natural flavors + color added; sucrose fatty acid esters; no palm / canola / vegetable oil)';
const OLLY_PRENATAL_CITE =
  'OLLY Essential Prenatal Multivitamin gummies Target other-ingredients (vegetable oil (coconut, canola) + natural flavors)';

export const BATCH15_PRENATALS: RatingRecord[] = [
  // ── Caution ──────────────────────────────────────────────
  {
    id: 'nature-made-prenatal-multi-tablets',
    productName: 'Nature Made Prenatal Multi tablets',
    brand: 'Nature Made',
    category: VITAMINS,
    barcode: '031604014353',
    formulaId: 'nature-made-prenatal-multi-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Folic acid', strength: '800mcg' },
      { name: 'Iron', strength: '27mg' },
      { name: 'Zinc', strength: '11mg' },
    ],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', labelCite(NM_PRENATAL_TAB_CITE, METH.peg)),
      flag('Maltodextrin', 'limited', labelCite(NM_PRENATAL_TAB_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(NM_PRENATAL_TAB_CITE, METH.sio2)),
      labelCleared(NM_PRENATAL_TAB_CITE, 'Cellulose gel'),
      labelCleared(NM_PRENATAL_TAB_CITE, 'Modified food starch'),
      labelCleared(NM_PRENATAL_TAB_CITE, 'Dibasic calcium phosphate'),
      labelCleared(NM_PRENATAL_TAB_CITE, 'Croscarmellose sodium'),
      labelCleared(NM_PRENATAL_TAB_CITE, 'Hypromellose'),
      labelCleared(NM_PRENATAL_TAB_CITE, 'Magnesium stearate'),
      labelCleared(NM_PRENATAL_TAB_CITE, 'Gelatin'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nature Made Prenatal Multi tablets = Caution (PEG + SiO2 + maltodextrin). Matched Target / Instacart other-ingredients have no titanium dioxide, synthetic dye, or talc. Raw demerit math is PEG 2 + maltodextrin 1 → 3 pts Avoid — draft follows the approved Caution call (SiO2 is a 0-pt cap, not a softener). Hydrogenated soybean oil appears on some older HelloPharmacist / DirectionsForMe lists; that is TABLET oil — not the gummy seed-oil High rule — and is not scored as Avoid on this row (' +
      METH.tabletOil +
      '). Current Target / Instacart lists omit it. Nature Made Prenatal + DHA softgels are a different unmatched formula — not this row (P8 skip). No DailyMed drug SPL (dietary supplement). Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_PRENATAL_TAB_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'one-a-day-prenatal-softgels-no-dye',
    productName: 'One A Day Prenatal softgels (no FD&C / TiO2 carton)',
    brand: 'One A Day',
    category: VITAMINS,
    formulaId: 'one-a-day-prenatal-softgels-no-dye',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral + DHA', strength: '1 softgel (label serving)' },
      { name: 'Folic acid', strength: 'label serving' },
      { name: 'Iron (carbonyl iron)', strength: 'label serving' },
      { name: 'Zinc (as zinc oxide)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Color (annatto extract [seed])',
        'cleared',
        labelCite(OAD_PRENATAL_NO_DYE_CITE, METH.annatto),
      ),
      labelCleared(OAD_PRENATAL_NO_DYE_CITE, 'Gelatin'),
      labelCleared(OAD_PRENATAL_NO_DYE_CITE, 'Glycerin'),
      labelCleared(OAD_PRENATAL_NO_DYE_CITE, 'Yellow beeswax'),
      labelCleared(OAD_PRENATAL_NO_DYE_CITE, 'Purified water'),
      labelCleared(OAD_PRENATAL_NO_DYE_CITE, 'Soy lecithin'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: One A Day Prenatal softgel carton WITHOUT FD&C / titanium dioxide = Caution, NOT Clean, until the physical carton is matched. Official Bayer livewell Prenatal 1 PDF (05/28/20 Version 002) lists color (annatto extract [seed]) and does NOT list TiO2 or synthetic dyes on that PDF. Annatto is a standalone Caution (not Avoid; not additive-scored). Confirm the carton has no TiO2 / synthetic dye — a CVS-listed TiO2 + Blue #1 + Red #40 coat is the Avoid twin (`one-a-day-prenatal-1-softgels`), not this row. Separate formulaIds; do not merge them. Contains fish and soy (carton allergen labeling). No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${OAD_PRENATAL_NO_DYE_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'nature-made-prenatal-gummies',
    productName: 'Nature Made Prenatal Gummies (Folic Acid + DHA + Choline)',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: 'nature-made-prenatal-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin gummy (folic acid + DHA + choline)', strength: '2 gummies (label serving)' },
      { name: 'DHA (from fish oil)', strength: '58mg' },
      { name: 'Choline', strength: '55mg' },
      { name: 'Zinc', strength: '2.6mg' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(NM_PRENATAL_GUMMY_CITE, METH.flavors)),
      flag(
        'Tocopherols',
        'cleared',
        labelCite(NM_PRENATAL_GUMMY_CITE, METH.tocopherols),
      ),
      labelCleared(NM_PRENATAL_GUMMY_CITE, 'Sugar'),
      labelCleared(NM_PRENATAL_GUMMY_CITE, 'Glucose syrup'),
      labelCleared(NM_PRENATAL_GUMMY_CITE, 'Water'),
      labelCleared(NM_PRENATAL_GUMMY_CITE, 'Gelatin'),
      labelCleared(NM_PRENATAL_GUMMY_CITE, 'Lactic acid'),
      labelCleared(NM_PRENATAL_GUMMY_CITE, 'Calcium lactate'),
      labelCleared(NM_PRENATAL_GUMMY_CITE, 'Citric acid'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nature Made Prenatal gummies (Folic Acid + DHA + Choline) = Caution (natural flavors + color added). Matched Target / CVS other-ingredients list no palm oil, canola, or vegetable oil. Sucrose fatty acid esters on those lists are NOT the gummy seed/industrial-oil High rule and are not scored as Avoid. Color added is listed without a synthetic-dye name on matched retailer pages (some cartons say color derived from a natural source) — this draft does not invent a dye High. Confirm the carton: a later palm / canola / vegetable-oil listing is a different formula. Contains fish. No iron on typical matched gummy cartons — iron-overdose warning does not apply unless iron is labeled. No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_PRENATAL_GUMMY_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'centrum-prenatal-complete',
    productName: 'Centrum Prenatal / Centrum Specialist Prenatal',
    brand: 'Centrum',
    category: VITAMINS,
    formulaId: 'centrum-prenatal-complete',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Folic acid', strength: '800mcg' },
      { name: 'Iron', strength: '27mg' },
      { name: 'Zinc (as zinc oxide)', strength: '11mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', labelCite(CENTRUM_PRENATAL_CITE, METH.tio2)),
      flag('Talc', 'high', labelCite(CENTRUM_PRENATAL_CITE, METH.talc)),
      flag('BHT (to retard oxidation)', 'high', labelCite(CENTRUM_PRENATAL_CITE, METH.bht)),
      flag('Carmine (color)', 'cleared', labelCite(CENTRUM_PRENATAL_CITE, METH.carmine)),
      flag('Polyethylene glycol', 'moderate', labelCite(CENTRUM_PRENATAL_CITE, METH.peg)),
      flag('Maltodextrin', 'limited', labelCite(CENTRUM_PRENATAL_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(CENTRUM_PRENATAL_CITE, METH.sio2)),
      flag(
        'Tocopherols (to retard oxidation)',
        'cleared',
        labelCite(CENTRUM_PRENATAL_CITE, METH.tocopherols),
      ),
      labelCleared(CENTRUM_PRENATAL_CITE, 'Microcrystalline cellulose'),
      labelCleared(CENTRUM_PRENATAL_CITE, 'Pregelatinized corn starch'),
      labelCleared(CENTRUM_PRENATAL_CITE, 'Crospovidone'),
      labelCleared(CENTRUM_PRENATAL_CITE, 'Hypromellose'),
      labelCleared(CENTRUM_PRENATAL_CITE, 'Magnesium stearate'),
      labelCleared(CENTRUM_PRENATAL_CITE, 'Gelatin'),
      flag('Acacia', 'cleared', labelCite(CENTRUM_PRENATAL_CITE, METH.gums)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Centrum Prenatal / Centrum Specialist Prenatal coated tablet = Avoid. DailyMed Specialist Prenatal tablet (setid d5fd7fd6-b5d8-4ada-adfd-6858343f7e30) plus Centrum prenatal US / Canada non-medicinal patterns list titanium dioxide + talc + BHT. Any one of TiO2 / talc / BHT is High Avoid. Carmine (color) is a standalone Caution — note only on this already-Avoid row; not a second grade. PEG is Moderate and SiO2 is the 0-pt Caution cap (not needed to reach Avoid). Specialist kits pair the coated tablet with a separate DHA softgel — this formulaId grades the coated tablet. Confirm the carton still lists TiO2 / talc / BHT. Contains soy on the DailyMed Specialist tablet list. No DailyMed drug-monograph SPL (dietary supplement kit). Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${CENTRUM_PRENATAL_CITE} — draft, not verified; dietary-supplement DailyMed label`,
    ],
  },
  {
    id: 'equate-daily-prenatal',
    productName: 'Equate Daily Prenatal Multivitamin',
    brand: 'Equate',
    category: VITAMINS,
    formulaId: 'equate-daily-prenatal',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Folic acid', strength: 'label serving' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc (as zinc oxide)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide (color)', 'high', labelCite(EQUATE_PRENATAL_CITE, METH.tio2)),
      flag('Talc', 'high', labelCite(EQUATE_PRENATAL_CITE, METH.talc)),
      flag('FD&C Red #40 Aluminum Lake', 'high', labelCite(EQUATE_PRENATAL_CITE, METH.dyes)),
      flag('FD&C Blue #2 Aluminum Lake', 'high', labelCite(EQUATE_PRENATAL_CITE, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', labelCite(EQUATE_PRENATAL_CITE, METH.peg)),
      flag('Silicon dioxide', 'cleared', labelCite(EQUATE_PRENATAL_CITE, METH.sio2)),
      labelCleared(EQUATE_PRENATAL_CITE, 'Microcrystalline cellulose'),
      labelCleared(EQUATE_PRENATAL_CITE, 'Croscarmellose sodium'),
      labelCleared(EQUATE_PRENATAL_CITE, 'Stearic acid'),
      labelCleared(EQUATE_PRENATAL_CITE, 'Polyvinyl alcohol'),
      labelCleared(EQUATE_PRENATAL_CITE, 'Magnesium stearate'),
      labelCleared(EQUATE_PRENATAL_CITE, 'Gelatin'),
      labelCleared(EQUATE_PRENATAL_CITE, 'Calcium silicate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate Daily Prenatal Multivitamin coated tablet = Avoid. HelloPharmacist / retailer other-ingredients list titanium dioxide + talc + FD&C Red #40 Aluminum Lake + FD&C Blue #2 Aluminum Lake + polyethylene glycol + silicon dioxide. TiO2, talc, or either lake dye is High Avoid. PEG is Moderate; SiO2 is the 0-pt Caution cap (not needed to reach Avoid). Equate One Daily Prenatal softgels (annatto, no TiO2 on some Instacart lists) are a different formula — not this row. Confirm the coated-tablet carton. No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['Walmart'],
    sourcesGeneral: [
      `${EQUATE_PRENATAL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'one-a-day-prenatal-1-softgels',
    productName: 'One A Day Prenatal 1 softgels (TiO2 / FD&C carton)',
    brand: 'One A Day',
    category: VITAMINS,
    formulaId: 'one-a-day-prenatal-1-softgels',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral + DHA', strength: '1 softgel (label serving)' },
      { name: 'Folic acid', strength: 'label serving' },
      { name: 'Iron (carbonyl iron)', strength: 'label serving' },
      { name: 'Zinc (as zinc oxide)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide (color)', 'high', labelCite(OAD_PRENATAL_DYE_CITE, METH.tio2)),
      flag('FD&C Blue #1', 'high', labelCite(OAD_PRENATAL_DYE_CITE, METH.dyes)),
      flag('FD&C Red #40', 'high', labelCite(OAD_PRENATAL_DYE_CITE, METH.dyes)),
      labelCleared(OAD_PRENATAL_DYE_CITE, 'Gelatin'),
      labelCleared(OAD_PRENATAL_DYE_CITE, 'Glycerin'),
      labelCleared(OAD_PRENATAL_DYE_CITE, 'Yellow beeswax'),
      labelCleared(OAD_PRENATAL_DYE_CITE, 'Purified water'),
      labelCleared(OAD_PRENATAL_DYE_CITE, 'Soy lecithin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: One A Day Prenatal 1 softgels WITH titanium dioxide / FD&C Blue #1 / FD&C Red #40 = Avoid. CVS inactive list names those three High-tier colorants. Separate formulaId from the no-dye / no-TiO2 Caution twin (`one-a-day-prenatal-softgels-no-dye`) — do not merge them. This row applies ONLY when the carton lists TiO2 or synthetic dye. Contains fish and soy (carton allergen labeling). No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${OAD_PRENATAL_DYE_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'cvs-health-prenatal-coated',
    productName: 'CVS Health Prenatal Multivitamin (coated)',
    brand: 'CVS Health',
    category: VITAMINS,
    formulaId: 'cvs-health-prenatal-coated',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Folic acid', strength: 'label serving' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', labelCite(CVS_PRENATAL_CITE, METH.tio2)),
      flag('Talc', 'high', labelCite(CVS_PRENATAL_CITE, METH.talc)),
      flag('FD&C Red #40 Lake', 'high', labelCite(CVS_PRENATAL_CITE, METH.dyes)),
      flag('FD&C Yellow #6 Lake', 'high', labelCite(CVS_PRENATAL_CITE, METH.dyes)),
      flag('BHT', 'high', labelCite(CVS_PRENATAL_CITE, METH.bht)),
      flag('Maltodextrin', 'limited', labelCite(CVS_PRENATAL_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(CVS_PRENATAL_CITE, METH.sio2)),
      flag(
        'Tocopherols / ascorbyl palmitate',
        'cleared',
        labelCite(CVS_PRENATAL_CITE, METH.tocopherols),
      ),
      labelCleared(CVS_PRENATAL_CITE, 'Microcrystalline cellulose'),
      labelCleared(CVS_PRENATAL_CITE, 'Stearic acid'),
      labelCleared(CVS_PRENATAL_CITE, 'Croscarmellose sodium'),
      labelCleared(CVS_PRENATAL_CITE, 'Hypromellose'),
      labelCleared(CVS_PRENATAL_CITE, 'Gelatin'),
      flag('Acacia', 'cleared', labelCite(CVS_PRENATAL_CITE, METH.gums)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: store coated prenatals with TiO2, dye, or talc = Avoid. CVS Health Prenatal Multivitamin coated — Open Food Facts / HelloPharmacist other-ingredients list titanium dioxide + talc + Red 40 Lake + Yellow 6 Lake + BHT (typical private-label twin pattern). Confirm the physical carton lists TiO2 / dye / talc before treating a bottle as this formulaId. Separate formulaId from up&up and Walgreens twins. No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['CVS'],
    sourcesGeneral: [
      `${CVS_PRENATAL_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'up-and-up-prenatal-coated',
    productName: 'up&up Prenatal Multivitamin (coated)',
    brand: 'up&up',
    category: VITAMINS,
    formulaId: 'up-and-up-prenatal-coated',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Folic acid', strength: 'label serving' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc (as zinc oxide)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide (color)',
        'high',
        labelCite(UPANDUP_PRENATAL_CITE, METH.tio2),
      ),
      flag('FD&C Blue No. 2 Lake', 'high', labelCite(UPANDUP_PRENATAL_CITE, METH.dyes)),
      flag('FD&C Red No. 40 Lake', 'high', labelCite(UPANDUP_PRENATAL_CITE, METH.dyes)),
      flag('FD&C Yellow No. 6 Lake', 'high', labelCite(UPANDUP_PRENATAL_CITE, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', labelCite(UPANDUP_PRENATAL_CITE, METH.peg)),
      flag('Silica', 'cleared', labelCite(UPANDUP_PRENATAL_CITE, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(UPANDUP_PRENATAL_CITE, METH.maltodextrin)),
      labelCleared(UPANDUP_PRENATAL_CITE, 'Microcrystalline cellulose'),
      labelCleared(UPANDUP_PRENATAL_CITE, 'Hydroxypropyl methylcellulose'),
      labelCleared(UPANDUP_PRENATAL_CITE, 'Croscarmellose sodium'),
      labelCleared(UPANDUP_PRENATAL_CITE, 'Stearic acid'),
      labelCleared(UPANDUP_PRENATAL_CITE, 'Magnesium stearate'),
      labelCleared(UPANDUP_PRENATAL_CITE, 'Soy lecithin'),
      labelCleared(UPANDUP_PRENATAL_CITE, 'Carnauba wax'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: store coated prenatals with TiO2, dye, or talc = Avoid. up&up (Target) Prenatal Multivitamin coated — Target other-ingredients list titanium dioxide (color) + Blue 2 / Red 40 / Yellow 6 lakes + PEG + silica (typical private-label twin pattern; talc is not on this Target list). Target page also states the product contains artificial colors, including Red No. 40 and titanium dioxide. Confirm the physical carton lists TiO2 / dye / talc before treating a bottle as this formulaId. Separate formulaId from CVS Health and Walgreens twins. Contains soy (lecithin). No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['Target'],
    sourcesGeneral: [
      `${UPANDUP_PRENATAL_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'walgreens-prenatal-coated',
    productName: 'Walgreens Prenatal Multivitamin (coated)',
    brand: 'Walgreens',
    category: VITAMINS,
    formulaId: 'walgreens-prenatal-coated',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Folic acid', strength: 'label serving' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc (as zinc oxide)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', labelCite(WALGREENS_PRENATAL_CITE, METH.tio2)),
      flag('FD&C Blue 2 Lake', 'high', labelCite(WALGREENS_PRENATAL_CITE, METH.dyes)),
      flag('FD&C Red 40 Lake', 'high', labelCite(WALGREENS_PRENATAL_CITE, METH.dyes)),
      flag('FD&C Yellow 6 Lake', 'high', labelCite(WALGREENS_PRENATAL_CITE, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', labelCite(WALGREENS_PRENATAL_CITE, METH.peg)),
      flag('Silicon dioxide', 'cleared', labelCite(WALGREENS_PRENATAL_CITE, METH.sio2)),
      labelCleared(WALGREENS_PRENATAL_CITE, 'Microcrystalline cellulose'),
      labelCleared(WALGREENS_PRENATAL_CITE, 'Croscarmellose sodium'),
      labelCleared(WALGREENS_PRENATAL_CITE, 'Stearic acid'),
      labelCleared(WALGREENS_PRENATAL_CITE, 'Magnesium stearate'),
      labelCleared(WALGREENS_PRENATAL_CITE, 'Gelatin'),
      labelCleared(WALGREENS_PRENATAL_CITE, 'Carnauba wax'),
      labelCleared(WALGREENS_PRENATAL_CITE, 'Lecithin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: store coated prenatals with TiO2, dye, or talc = Avoid. Walgreens Prenatal Multivitamin coated — HelloPharmacist / retailer other-ingredients list titanium dioxide + Blue 2 / Red 40 / Yellow 6 lakes + PEG + silicon dioxide (typical private-label twin pattern; talc is not on that HelloPharmacist snapshot). Confirm the physical carton lists TiO2 / dye / talc before treating a bottle as this formulaId. Separate formulaId from CVS Health and up&up twins. No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      IRON_OVERDOSE_CARTON +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['Walgreens'],
    sourcesGeneral: [
      `${WALGREENS_PRENATAL_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'olly-essential-prenatal',
    productName: 'OLLY Essential Prenatal Multivitamin gummies',
    brand: 'OLLY',
    category: VITAMINS,
    formulaId: 'olly-essential-prenatal',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin gummy (folic acid + DHA)', strength: '2 gummies (label serving)' },
      { name: 'Zinc', strength: '3mg' },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable oil (coconut, canola)',
        'high',
        labelCite(OLLY_PRENATAL_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(OLLY_PRENATAL_CITE, METH.flavors)),
      flag(
        'Ascorbyl palmitate / mixed tocopherols (antioxidant)',
        'cleared',
        labelCite(OLLY_PRENATAL_CITE, METH.tocopherols),
      ),
      labelCleared(OLLY_PRENATAL_CITE, 'Glucose syrup'),
      labelCleared(OLLY_PRENATAL_CITE, 'Beet sugar'),
      labelCleared(OLLY_PRENATAL_CITE, 'Water'),
      labelCleared(OLLY_PRENATAL_CITE, 'Gelatin'),
      labelCleared(OLLY_PRENATAL_CITE, 'Lactic acid'),
      labelCleared(OLLY_PRENATAL_CITE, 'Citric acid'),
      labelCleared(
        OLLY_PRENATAL_CITE,
        'Coloring (from carrot, apple and black carrot juices)',
      ),
      flag('Pectin', 'cleared', labelCite(OLLY_PRENATAL_CITE, METH.gums)),
      labelCleared(OLLY_PRENATAL_CITE, 'Carnauba wax'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: OLLY Essential Prenatal Multivitamin gummies = Avoid. Target other-ingredients list vegetable oil (coconut, canola) + natural flavors. Canola in a gummy is High-tier (seed/industrial oils in gummies). Coconut oil on the same line does not clear the canola High (' +
      METH.coconutOil +
      '). Natural flavors are Limited (not needed to reach Avoid). Some older / other-count Target snapshots omit vegetable oil — confirm the carton; an oil-free listing would be a different formula (not invented here). Carton is labeled no iron added. Contains fish on some Essential Prenatal cartons. No DailyMed drug SPL. Adults. ' +
      PRENATAL_LABEL +
      ' ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_PRENATAL,
    retailers: ['Target', 'CVS', 'Walgreens', 'Grocery'],
    sourcesGeneral: [
      `${OLLY_PRENATAL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];
