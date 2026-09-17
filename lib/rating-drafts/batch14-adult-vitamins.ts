// DRAFT / not verified / batch 14 adult Vitamins / multis
// Vitamins · audience 'adult' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6). This draft set
// has NO independently Clean multi — cleanAlternatives are omitted (honest
// empty; do not point at products outside this batch; do not fake Clean).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from this
// draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// KIRKLAND SPLIT (LOCKED): Daily Multi WITH titanium dioxide and Daily Multi
// WITHOUT titanium dioxide are separate formulaIds. Do not merge them.
// Current Costco / Fig / Open Food Facts 500-ct listings are the no-TiO2
// Caution twin (PEG + silica only). The TiO2 Avoid row applies only when the
// carton lists titanium dioxide.
//
// VITAFUSION SPLIT (LOCKED): MultiVites "coconut and/or palm" / palm = Avoid.
// Coconut-only carton would be Caution (natural flavors + coconut oil) on a
// separate formulaId — SKIPPED this batch; no coconut-only SKU confirmed.
// Coconut oil alone in gummies is NOT the seed/industrial-oil High rule.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// AVOID
// - V1 Centrum Adults (coated) = Avoid. Official US PDF lbl-00000767:
//   TiO2 + talc + Yellow 6 Lake + BHT + PEG + SiO2.
// - V2 Centrum Silver Adults 50+ = Avoid. Official US PDF lbl-00000775:
//   same coated-family TiO2 / talc / dye (Yellow 6 + Red 40 + Blue 2) / BHT
//   / SiO2 pattern. PEG is on some older Silver cartons, not this PDF —
//   not required to reach Avoid.
// - V3 Equate Complete Multivitamin Adults = Avoid. TiO2 + Red 40 (± Yellow
//   6 / Blue 2 / talc / BHT / PEG on retailer other-ingredients).
// - V4 Kirkland Signature Daily Multi WITH TiO2 = Avoid. Separate formulaId
//   from the no-TiO2 twin. Confirm the carton lists titanium dioxide.
// - V5 One A Day Men's Health Formula (coated) = Avoid. Official Bayer
//   livewell label lists talc (High). No TiO2 / synthetic dye on that PDF —
//   talc alone is enough. Skip was only if the carton could not be confirmed.
// - V6 One A Day Women's Complete (coated) = Avoid. Official Bayer livewell
//   PDF: color includes titanium dioxide + talc.
// - V7 OLLY Men's Multi = Avoid. Vegetable oil (coconut, canola) + natural
//   flavors. Canola in a gummy is High.
// - V8 OLLY Women's Multi = Avoid. Same coconut + canola vegetable-oil
//   pattern confirmed on Target / retailer cartons.
// - V9 Nature Made Multi Gummies = Avoid. Palm oil (+ natural flavors).
//   Carmine is a Caution note only — not a second grade.
// - V10 vitafusion MultiVites (palm / coconut-and/or-palm) = Avoid.
// CAUTION
// - V11 Kirkland Daily Multi NO TiO2 carton = Caution. PEG + SiO2 / silica
//   only on matched Costco / Fig / OFF listings. Separate formulaId.
// - V12 Nature Made Multi Complete (± iron) tablets = Caution. PEG + SiO2
//   + maltodextrin. Matched tablet labels have no TiO2 / dye / talc.
//   Softgels are a different dyed / TiO2 formula — not this row.
// - V13 MegaFood One Daily = Caution. SiO2 Caution cap (MCC / stearic acid /
//   hypromellose Cleared-class).
// CLEAN
// - None. Do not invent Clean for an uncoated multi without an exact SKU +
//   label. Prefer zero Clean rows over a fake one.
//
// TALLY (unverified drafts): 13 rows — Clean 0 / Caution 3 / Avoid 10.
// Independently Clean in THIS batch: none. cleanAlternatives omitted on
// every row — no Clean multi is in this draft set; do not invent one and
// do not point at products outside this batch.
//
// TiO2 / talc / synthetic dyes / BHT / BHA / aspartame / seed-industrial
// oils in gummies (palm, canola, vegetable oil, soybean) = High Avoid.
// Sucralose = Moderate. PEG = Moderate. Natural flavor / maltodextrin =
// Limited. SiO2 / silica = Caution cap (0 demerit points), not Avoid alone.
// Carmine = Caution (not Avoid); if the gummy is already Avoid for palm oil,
// carmine is a note only.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - Uncoated Clean invent (no exact SKU + label)
// - Protein powder
// - Kids vitamins
// - Prenatals
// - Amazon-only SKUs
// - vitafusion MultiVites coconut-only carton (cannot confirm a coconut-only
//   SKU; current US retailer lists are "coconut and/or palm")
// - SmartyPants Adult Formula / store multi gummies (current SmartyPants
//   brand lists have no coconut / palm / veg oil — neither the coconut-only
//   Caution write nor the palm/canola Avoid write; store gummies unconfirmed)
// - Nature Made Multi Complete liquid softgels (TiO2 / dyes — different form)
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Every zinc-containing row's honestNote says zinc is
// parked. Silicon dioxide / silica = Caution cap, not Avoid alone.

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

const NO_CLEAN_MULTI =
  'No independently Clean adult multi exists in this draft set — cleanAlternatives omitted (honest empty; form cannot be labeled on a nonexistent §6 swap). Do not invent Clean for an uncoated multi without an exact SKU + label.';

const CENTRUM_ADULTS_CITE =
  'Centrum US label PDF lbl-00000767 (centrum.com / Haleon web-ready Adults)';
const CENTRUM_SILVER_CITE =
  'Centrum US label PDF lbl-00000775 (centrum.com web-ready Silver Adults 50+ tablets)';
const EQUATE_CITE =
  'Equate Complete Multivitamin Adults retailer other-ingredients (Fig / Open Food Facts / HelloPharmacist)';
const KIRKLAND_TIO2_CITE =
  'Kirkland Signature Daily Multi TiO2-coated carton (founder-locked twin — confirm the bottle lists titanium dioxide)';
const KIRKLAND_NO_TIO2_CITE =
  'Kirkland Signature Daily Multi current Costco / Fig / Open Food Facts 500-ct (no titanium dioxide; PEG + silica)';
const OAD_MENS_CITE =
  "One A Day Men's Health Formula official Bayer livewell label (11/10/20 Version 002)";
const OAD_WOMENS_CITE =
  "One A Day Women's Tablets official Bayer livewell PDF (7-15-21)";
const OLLY_MENS_CITE =
  "OLLY Men's Multi retailer other-ingredients (Food Wiki / Fooducate / FairPrice: vegetable oil (coconut, canola))";
const OLLY_WOMENS_CITE =
  "OLLY Women's Multi Target / retailer other-ingredients (vegetable oil (coconut, canola))";
const NM_GUMMY_CITE =
  'Nature Made Multi Gummies retailer / HelloPharmacist other-ingredients (palm oil + natural flavors + carmine)';
const NM_COMPLETE_CITE =
  'Nature Made Multi Complete (± iron) tablet other-ingredients (Fig / Swanson / HEB: PEG + SiO2 + maltodextrin; no TiO2 / dye / talc)';
const MEGAFOOD_CITE =
  'MegaFood One Daily retailer other-ingredients (iHerb / Vitacost: MCC / ferment media / SiO2 / stearic acid / hypromellose)';
const VITAFUSION_PALM_CITE =
  'vitafusion MultiVites retailer other-ingredients (HEB / Vitacost / Target: blend of oils (coconut and/or palm))';

export const BATCH14_ADULT_VITAMINS: RatingRecord[] = [
  // ── Caution ──────────────────────────────────────────────
  {
    id: 'kirkland-daily-multi-no-tio2',
    productName: 'Kirkland Signature Daily Multi (no TiO2 carton)',
    brand: 'Kirkland Signature',
    category: VITAMINS,
    formulaId: 'kirkland-daily-multi-no-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: '18mg' },
      { name: 'Zinc', strength: '11mg' },
    ],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', labelCite(KIRKLAND_NO_TIO2_CITE, METH.peg)),
      flag('Silica / silicon dioxide', 'cleared', labelCite(KIRKLAND_NO_TIO2_CITE, METH.sio2)),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Microcrystalline cellulose'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Hydroxypropyl methylcellulose'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Croscarmellose sodium'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Crospovidone'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Magnesium stearate'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Stearic acid'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Gelatin'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Carnauba wax'),
      labelCleared(KIRKLAND_NO_TIO2_CITE, 'Calcium silicate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Kirkland Signature Daily Multi no-TiO2 carton = Caution if PEG / SiO2 only. Current Costco / Fig / Open Food Facts 500-ct lists polyethylene glycol + silica and does NOT list titanium dioxide, talc, or synthetic dyes. Silicon dioxide / silica is the nanoparticle Caution cap (0 demerit points). Separate formulaId from the TiO2 Avoid twin (`kirkland-daily-multi-tio2`) — do not merge them. Confirm the carton: a bottle that lists titanium dioxide is the Avoid row, not this one. Some other Kirkland Daily Multi snapshots list maltodextrin (Limited) — that is not scored on this no-TiO2 Fig/OFF list. No DailyMed drug SPL (dietary supplement). Adults. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['Costco'],
    sourcesGeneral: [
      `${KIRKLAND_NO_TIO2_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'nature-made-multi-complete',
    productName: 'Nature Made Multi Complete (± iron) tablets',
    brand: 'Nature Made',
    category: VITAMINS,
    barcode: '031604025182',
    formulaId: 'nature-made-multi-complete',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: '18mg when labeled (iron-free twin exists)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', labelCite(NM_COMPLETE_CITE, METH.peg)),
      flag('Maltodextrin', 'limited', labelCite(NM_COMPLETE_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(NM_COMPLETE_CITE, METH.sio2)),
      labelCleared(NM_COMPLETE_CITE, 'Cellulose gel'),
      labelCleared(NM_COMPLETE_CITE, 'Modified food starch'),
      labelCleared(NM_COMPLETE_CITE, 'Croscarmellose sodium'),
      labelCleared(NM_COMPLETE_CITE, 'Hypromellose'),
      labelCleared(NM_COMPLETE_CITE, 'Magnesium stearate'),
      labelCleared(NM_COMPLETE_CITE, 'Gelatin'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nature Made Multi Complete (± iron) tablets = Caution (PEG + SiO2 + maltodextrin) ONLY if the matched tablet label has no TiO2 / dye / talc. Current Fig / Swanson / HEB tablet other-ingredients match that list. Raw demerit math is PEG 2 + maltodextrin 1 → 3 pts Avoid — draft follows the approved Caution call (SiO2 is a 0-pt cap, not a softener). Iron-containing and iron-free tablet twins share this formulaId when the other-ingredients list holds. Multi Complete liquid softgels (TiO2 / Yellow 6 / Red 40 / Blue 1) are a different formula — not this row; do not invent Clean. No DailyMed drug SPL. Adults. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_COMPLETE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'megafood-one-daily',
    barcode: '051494101513 051494101520 051494101537',
    productName: 'MegaFood One Daily',
    brand: 'MegaFood',
    category: VITAMINS,
    formulaId: 'megafood-one-daily',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Food-state multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: '4.5mg' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', labelCite(MEGAFOOD_CITE, METH.sio2)),
      labelCleared(MEGAFOOD_CITE, 'Microcrystalline cellulose'),
      labelCleared(MEGAFOOD_CITE, 'Stearic acid'),
      labelCleared(MEGAFOOD_CITE, 'Hypromellose'),
      labelCleared(MEGAFOOD_CITE, 'Tapioca food starch'),
      labelCleared(
        MEGAFOOD_CITE,
        'Ferment media (organic brown rice, autolyzed yeast extract, rice protein, inactive yeast)',
      ),
      labelCleared(MEGAFOOD_CITE, 'Rice protein'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: MegaFood One Daily = Caution. Driver is silicon dioxide (nanoparticle Caution cap, 0 demerit points). MCC / stearic acid / hypromellose are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap. No DailyMed drug SPL (dietary supplement). Adults. Contains ferment / yeast media — not an inactive-grade driver. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['Whole Foods', 'Sprouts', 'Vitamin shops'],
    sourcesGeneral: [
      `${MEGAFOOD_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'centrum-adults-coated',
    productName: 'Centrum Adults',
    brand: 'Centrum',
    category: VITAMINS,
    formulaId: 'centrum-adults-coated',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: '18mg' },
      { name: 'Zinc', strength: '11mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', labelCite(CENTRUM_ADULTS_CITE, METH.tio2)),
      flag('Talc', 'high', labelCite(CENTRUM_ADULTS_CITE, METH.talc)),
      flag('Yellow 6 Lake', 'high', labelCite(CENTRUM_ADULTS_CITE, METH.dyes)),
      flag('BHT (to preserve freshness)', 'high', labelCite(CENTRUM_ADULTS_CITE, METH.bht)),
      flag('Polyethylene glycol', 'moderate', labelCite(CENTRUM_ADULTS_CITE, METH.peg)),
      flag('Maltodextrin', 'limited', labelCite(CENTRUM_ADULTS_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(CENTRUM_ADULTS_CITE, METH.sio2)),
      flag(
        'Tocopherols (to preserve freshness)',
        'cleared',
        labelCite(CENTRUM_ADULTS_CITE, METH.tocopherols),
      ),
      labelCleared(CENTRUM_ADULTS_CITE, 'Microcrystalline cellulose'),
      labelCleared(CENTRUM_ADULTS_CITE, 'Crospovidone'),
      labelCleared(CENTRUM_ADULTS_CITE, 'Magnesium stearate'),
      labelCleared(CENTRUM_ADULTS_CITE, 'Corn starch'),
      labelCleared(CENTRUM_ADULTS_CITE, 'Modified corn starch'),
      labelCleared(CENTRUM_ADULTS_CITE, 'Gelatin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Centrum Adults coated = Avoid. Official US PDF lbl-00000767 lists titanium dioxide + talc + Yellow 6 Lake + BHT + polyethylene glycol + silicon dioxide. Any one of TiO2 / talc / Yellow 6 / BHT is High Avoid; PEG is Moderate and SiO2 is the 0-pt Caution cap. Maltodextrin is Limited (not needed to reach Avoid). Polyvinyl alcohol is not in Methodology §5 (ungraded; v1.6 intake; not an Avoid driver). Not formulated for children. No DailyMed drug SPL (dietary supplement). ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${CENTRUM_ADULTS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'centrum-silver-adults',
    productName: 'Centrum Silver Adults 50+',
    brand: 'Centrum',
    category: VITAMINS,
    barcode: '305734463818',
    formulaId: 'centrum-silver-adults',
    audience: ADULT,
    minAge: 50,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Multivitamin / multimineral (50+ formula)',
        strength: '1 tablet (label serving)',
      },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', labelCite(CENTRUM_SILVER_CITE, METH.tio2)),
      flag('Talc', 'high', labelCite(CENTRUM_SILVER_CITE, METH.talc)),
      flag('Yellow 6 Lake', 'high', labelCite(CENTRUM_SILVER_CITE, METH.dyes)),
      flag('Red 40 Lake', 'high', labelCite(CENTRUM_SILVER_CITE, METH.dyes)),
      flag('Blue 2 Lake', 'high', labelCite(CENTRUM_SILVER_CITE, METH.dyes)),
      flag('BHT (to preserve freshness)', 'high', labelCite(CENTRUM_SILVER_CITE, METH.bht)),
      flag('Maltodextrin', 'limited', labelCite(CENTRUM_SILVER_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(CENTRUM_SILVER_CITE, METH.sio2)),
      flag(
        'Tocopherols (to preserve freshness)',
        'cleared',
        labelCite(CENTRUM_SILVER_CITE, METH.tocopherols),
      ),
      labelCleared(CENTRUM_SILVER_CITE, 'Microcrystalline cellulose'),
      labelCleared(CENTRUM_SILVER_CITE, 'Crospovidone'),
      labelCleared(CENTRUM_SILVER_CITE, 'Hypromellose'),
      labelCleared(CENTRUM_SILVER_CITE, 'Magnesium stearate'),
      labelCleared(CENTRUM_SILVER_CITE, 'Gelatin'),
      labelCleared(CENTRUM_SILVER_CITE, 'Polydextrose'),
      labelCleared(CENTRUM_SILVER_CITE, 'Medium-chain triglycerides'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Centrum Silver Adults 50+ = Avoid (same coated-family if the carton matches). Official US PDF lbl-00000775 confirms titanium dioxide + talc + Yellow 6 Lake + Red 40 Lake + Blue 2 Lake + BHT + silicon dioxide. PEG appears on some older Silver cartons (Pfizer / LBL-00000087) but is NOT on lbl-00000775 — not required to reach Avoid and not scored on this row. Separate formulaId from Centrum Adults. Labeled adults 50+; minAge 50. No DailyMed drug SPL. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${CENTRUM_SILVER_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'equate-complete-multi',
    productName: 'Equate Complete Multivitamin Adults',
    brand: 'Equate',
    category: VITAMINS,
    formulaId: 'equate-complete-multi',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide (color)', 'high', labelCite(EQUATE_CITE, METH.tio2)),
      flag('FD&C Red No. 40 Lake', 'high', labelCite(EQUATE_CITE, METH.dyes)),
      flag('FD&C Yellow No. 6 Lake', 'high', labelCite(EQUATE_CITE, METH.dyes)),
      flag('FD&C Blue No. 2 Lake', 'high', labelCite(EQUATE_CITE, METH.dyes)),
      flag('Talc', 'high', labelCite(EQUATE_CITE, METH.talc)),
      flag('BHT', 'high', labelCite(EQUATE_CITE, METH.bht)),
      flag('Polyethylene glycol', 'moderate', labelCite(EQUATE_CITE, METH.peg)),
      flag('Maltodextrin', 'limited', labelCite(EQUATE_CITE, METH.maltodextrin)),
      flag('Silica / silicon dioxide', 'cleared', labelCite(EQUATE_CITE, METH.sio2)),
      labelCleared(EQUATE_CITE, 'Microcrystalline cellulose'),
      labelCleared(EQUATE_CITE, 'Hydroxypropyl methylcellulose'),
      labelCleared(EQUATE_CITE, 'Magnesium stearate'),
      flag('Gum arabic', 'cleared', labelCite(EQUATE_CITE, METH.gums)),
      labelCleared(EQUATE_CITE, 'Gelatin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate Complete Multivitamin Adults = Avoid. Retailer other-ingredients list titanium dioxide + Red 40 (plus Yellow 6 Lake / Blue 2 Lake / talc / BHT / PEG on Fig / Open Food Facts / HelloPharmacist snapshots). TiO2 or Red 40 alone is High Avoid. Sunflower oil on some Equate tablet lists is NOT the gummy seed-oil High rule (tablet, not gummy). Confirm the carton. No DailyMed drug SPL. Adults. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['Walmart'],
    sourcesGeneral: [
      `${EQUATE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'kirkland-daily-multi-tio2',
    productName: 'Kirkland Signature Daily Multi (TiO2 carton)',
    brand: 'Kirkland Signature',
    category: VITAMINS,
    formulaId: 'kirkland-daily-multi-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: '18mg' },
      { name: 'Zinc', strength: '11mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', labelCite(KIRKLAND_TIO2_CITE, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', labelCite(KIRKLAND_TIO2_CITE, METH.peg)),
      flag('Silicon dioxide', 'cleared', labelCite(KIRKLAND_TIO2_CITE, METH.sio2)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Kirkland Signature Daily Multi WITH titanium dioxide = Avoid. Separate formulaId from the current no-TiO2 Caution twin (`kirkland-daily-multi-no-tio2`) — do not merge them. This row applies ONLY when the carton lists titanium dioxide. Current Costco / Fig / Open Food Facts 500-ct listings do NOT list TiO2 and are the Caution row, not this one. Remaining coating inactives should be read from the physical bottle; this draft scores the locked TiO2 High (PEG Moderate / SiO2 cap are not needed to reach Avoid). No DailyMed drug SPL. Adults. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['Costco'],
    sourcesGeneral: [
      `${KIRKLAND_TIO2_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'one-a-day-mens-coated',
    productName: "One A Day Men's Health Formula",
    brand: 'One A Day',
    category: VITAMINS,
    formulaId: 'one-a-day-mens-coated',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: "Men's multivitamin / multimineral", strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: '11mg' },
    ],
    inactiveIngredients: [
      flag('Talc', 'high', labelCite(OAD_MENS_CITE, METH.talc)),
      flag('Maltodextrin', 'limited', labelCite(OAD_MENS_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(OAD_MENS_CITE, METH.sio2)),
      labelCleared(OAD_MENS_CITE, 'Microcrystalline cellulose'),
      labelCleared(OAD_MENS_CITE, 'Hydroxypropyl methylcellulose'),
      labelCleared(OAD_MENS_CITE, 'Croscarmellose sodium'),
      labelCleared(OAD_MENS_CITE, 'Stearic acid'),
      labelCleared(OAD_MENS_CITE, 'Gelatin'),
      labelCleared(OAD_MENS_CITE, 'Polydextrose'),
      labelCleared(OAD_MENS_CITE, 'Inulin'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: One A Day Men's coated = Avoid only if TiO2 / dye / talc is confirmed. Official Bayer livewell Men's Health Formula label (11/10/20) lists talc and does NOT list titanium dioxide or synthetic dyes on that PDF. Talc is High Avoid (IARC 2A; no pharma-grade exception). Confirm the carton — a later TiO2 / dye coat is the same Avoid family; do not guess Clean if the coat changes. Labeled adult use only / not for children. No DailyMed drug SPL. " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${OAD_MENS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'one-a-day-womens-coated',
    productName: "One A Day Women's Complete Multivitamin",
    brand: 'One A Day',
    category: VITAMINS,
    barcode: '016500595809',
    formulaId: 'one-a-day-womens-coated',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: "Women's multivitamin / multimineral", strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide (color)',
        'high',
        labelCite(OAD_WOMENS_CITE, METH.tio2),
      ),
      flag('Talc', 'high', labelCite(OAD_WOMENS_CITE, METH.talc)),
      flag('Maltodextrin', 'limited', labelCite(OAD_WOMENS_CITE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', labelCite(OAD_WOMENS_CITE, METH.sio2)),
      labelCleared(OAD_WOMENS_CITE, 'Microcrystalline cellulose'),
      labelCleared(OAD_WOMENS_CITE, 'Hydroxypropyl methylcellulose'),
      labelCleared(OAD_WOMENS_CITE, 'Croscarmellose sodium'),
      labelCleared(OAD_WOMENS_CITE, 'Stearic acid'),
      labelCleared(OAD_WOMENS_CITE, 'Gelatin'),
      labelCleared(OAD_WOMENS_CITE, 'Guar gum'),
      labelCleared(OAD_WOMENS_CITE, 'Vegetable juice (color)'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: One A Day Women's coated = Avoid. Official Bayer livewell Women's Tablets PDF (7-15-21) lists color (riboflavin, titanium dioxide, vegetable juice) + talc. TiO2 or talc is High Avoid. Vegetable juice as color is Cleared-class (not a dye). Confirm the carton. Prenatal One A Day SKUs are not this row. No DailyMed drug SPL. Adults. " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${OAD_WOMENS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'olly-mens-multi-canola',
    productName: "OLLY Men's Multi (coconut + canola)",
    brand: 'OLLY',
    category: VITAMINS,
    formulaId: 'olly-mens-multi-canola',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: "Men's multivitamin (A, C, D, E, B vitamins)", strength: '2 gummies (label serving)' },
      { name: 'Zinc (as zinc citrate)', strength: 'label serving' },
      { name: 'Coenzyme Q-10', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable oil (coconut, canola)',
        'high',
        labelCite(OLLY_MENS_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(OLLY_MENS_CITE, METH.flavors)),
      labelCleared(OLLY_MENS_CITE, 'Glucose syrup'),
      labelCleared(OLLY_MENS_CITE, 'Beet sugar'),
      labelCleared(OLLY_MENS_CITE, 'Water'),
      labelCleared(OLLY_MENS_CITE, 'Gelatin'),
      labelCleared(OLLY_MENS_CITE, 'Lactic acid'),
      labelCleared(OLLY_MENS_CITE, 'Citric acid'),
      labelCleared(OLLY_MENS_CITE, 'Blackberry juice concentrate'),
      labelCleared(
        OLLY_MENS_CITE,
        'Coloring (from carrot, blueberry and black currant juices)',
      ),
      flag('Pectin', 'cleared', labelCite(OLLY_MENS_CITE, METH.gums)),
      labelCleared(OLLY_MENS_CITE, 'Carnauba wax'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: OLLY Men's Multi = Avoid. Vegetable oil (coconut, canola) in a gummy is High-tier (seed/industrial oils in gummies). Coconut oil on the same line does not clear the canola High. Natural flavors are Limited (not needed to reach Avoid). Confirm the carton. No DailyMed drug SPL. Adults. " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['Target', 'CVS', 'Walgreens', 'Grocery'],
    sourcesGeneral: [
      `${OLLY_MENS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'olly-womens-multi-canola',
    productName: "OLLY Women's Multi (coconut + canola)",
    brand: 'OLLY',
    category: VITAMINS,
    formulaId: 'olly-womens-multi-canola',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: "Women's multivitamin (A, C, D, E, B vitamins, biotin, folic acid)",
        strength: '2 gummies (label serving)',
      },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable oil (coconut, canola)',
        'high',
        labelCite(OLLY_WOMENS_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(OLLY_WOMENS_CITE, METH.flavors)),
      labelCleared(OLLY_WOMENS_CITE, 'Glucose syrup'),
      labelCleared(OLLY_WOMENS_CITE, 'Sugar / beet sugar'),
      labelCleared(OLLY_WOMENS_CITE, 'Water'),
      labelCleared(OLLY_WOMENS_CITE, 'Gelatin'),
      labelCleared(OLLY_WOMENS_CITE, 'Lactic acid'),
      labelCleared(OLLY_WOMENS_CITE, 'Citric acid'),
      labelCleared(
        OLLY_WOMENS_CITE,
        'Coloring (from carrot, blueberry and chokeberry juices)',
      ),
      flag('Pectin', 'cleared', labelCite(OLLY_WOMENS_CITE, METH.gums)),
      labelCleared(OLLY_WOMENS_CITE, 'Carnauba wax'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: OLLY Women's Multi = Avoid. Target / retailer cartons confirm the same vegetable oil (coconut, canola) pattern as the Men's Multi. Canola in a gummy is High. Coconut oil on the same line does not clear the canola High. Natural flavors are Limited (not needed to reach Avoid). Prenatal OLLY SKUs are not this row. No DailyMed drug SPL. Adults. " +
      NO_CLEAN_MULTI,
    retailers: ['Target', 'CVS', 'Walgreens', 'Grocery'],
    sourcesGeneral: [
      `${OLLY_WOMENS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'nature-made-multi-gummies',
    productName: 'Nature Made Multi Gummies',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: 'nature-made-multi-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin', strength: '2 gummies (label serving)' },
    ],
    inactiveIngredients: [
      flag('Palm oil', 'high', labelCite(NM_GUMMY_CITE, METH.seedOilGummies)),
      flag('Natural flavors', 'limited', labelCite(NM_GUMMY_CITE, METH.flavors)),
      flag('Carmine', 'cleared', labelCite(NM_GUMMY_CITE, METH.carmine)),
      labelCleared(NM_GUMMY_CITE, 'Glucose syrup'),
      labelCleared(NM_GUMMY_CITE, 'Sugar'),
      labelCleared(NM_GUMMY_CITE, 'Water'),
      labelCleared(NM_GUMMY_CITE, 'Gelatin'),
      labelCleared(NM_GUMMY_CITE, 'Citric acid'),
      labelCleared(NM_GUMMY_CITE, 'Malic acid'),
      flag('Pectin', 'cleared', labelCite(NM_GUMMY_CITE, METH.gums)),
      labelCleared(NM_GUMMY_CITE, 'Carnauba wax'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Nature Made Multi Gummies = Avoid. Palm oil in a gummy is High-tier. Natural flavors are Limited (not needed to reach Avoid). Carmine / colors added (including carmine) is a standalone Caution — note only on this already-Avoid palm row; not a second grade. Multi for Her gummies are the same palm + carmine demerit family (not a separate grade). No DailyMed drug SPL. Adults. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_GUMMY_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'vitafusion-multivites-palm',
    productName: 'vitafusion MultiVites (coconut and/or palm)',
    brand: 'vitafusion',
    category: VITAMINS,
    formulaId: 'vitafusion-multivites-palm',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Complete multivitamin', strength: '2 gummies (label serving)' },
    ],
    inactiveIngredients: [
      flag(
        'Blend of oils (coconut and/or palm)',
        'high',
        labelCite(VITAFUSION_PALM_CITE, METH.seedOilGummies),
      ),
      flag(
        'Natural flavors',
        'limited',
        labelCite(VITAFUSION_PALM_CITE, METH.flavors),
      ),
      flag('Annatto extract (color)', 'cleared', labelCite(VITAFUSION_PALM_CITE, METH.annatto)),
      labelCleared(VITAFUSION_PALM_CITE, 'Glucose syrup'),
      labelCleared(VITAFUSION_PALM_CITE, 'Sugar'),
      labelCleared(VITAFUSION_PALM_CITE, 'Water'),
      labelCleared(VITAFUSION_PALM_CITE, 'Gelatin'),
      flag('Pectin', 'cleared', labelCite(VITAFUSION_PALM_CITE, METH.gums)),
      labelCleared(VITAFUSION_PALM_CITE, 'Citric acid'),
      labelCleared(VITAFUSION_PALM_CITE, 'Lactic acid'),
      labelCleared(
        VITAFUSION_PALM_CITE,
        'Colors (blueberry and carrot concentrates)',
      ),
      labelCleared(VITAFUSION_PALM_CITE, 'Beeswax and/or carnauba wax'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: vitafusion MultiVites with palm / coconut-and/or-palm = Avoid. Current US retailer lists (HEB / Vitacost / Target) say "blend of oils (coconut and/or palm)" — palm on that line is the gummy seed/industrial-oil High rule. Coconut on the same and/or line does not clear the palm High. Natural flavors are Limited (not needed to reach Avoid). Annatto as color is a standalone Caution (not Avoid; not a second grade). Separate formulaId from a coconut-only Caution twin — that twin is SKIPPED this batch because no coconut-only SKU was confirmed. Contains coconut (tree nut). No DailyMed drug SPL. Adults. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_MULTI,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${VITAFUSION_PALM_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];
