// DRAFT / not verified / batch 53 Asutra Melt Pain Away WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only. Do NOT invent a Topical aisle.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack
// sizes of the same name+form+inactives share formulaId. Same
// OI+actives share formulaId. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Not wired into Clean
// Picks UI. No live Clean Picks file is edited. Do NOT restore
// Biofreeze Clean Picks. No photos. Letter tiles only on new ids.
// No fake Clean alts. No methodology rewrite. No Sprouts. Do NOT
// touch painFeverPicks.ts. Do NOT rewrite batches 41–52.
//
// Capsaicin 0.025% is the labeled ACTIVE (not the §5 inactive
// Caution token). Grade inactives only.
//
// TWO formulaIds — DailyMed setid a95a11d7-… Drug Facts OI does
// NOT match the current Thrive / Asutra.com carton. Do not merge
// mismatched OI into one formulaId.
//
// TALLY (unverified drafts in THIS file): 2 rows — Clean 0 /
// Caution 2 / Avoid 0.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. Independently Clean topical magnesium
// analog already on main: life-flo-pure-magnesium-oil. No Clean
// conventional NSAID / lidocaine / capsaicin cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batches 41–52 pain-rub / P&F writes (including batch 52 Life-flo
// magnesium oil + lotions).
//
// WRITTEN:
// - DailyMed setid a95a11d7-a2ae-6654-e053-2a95a90a802c (NDC
//   72683-003) — jar 200 g + 1.9 g packet share formulaId.
//   Drivers: tocopheryl acetate (≠ mixed tocopherols); pentaerythrityl
//   tetra-di-t-butyl hydroxyhydrocinnamate; Cymbopogon flexuosus
//   oil (lemongrass scent); hydroxyacetophenone. No High.
// - Thrive / current Asutra.com carton (SKU 856458008873 family;
//   3.4 oz / 7.0 oz / tube share this OI) — own formulaId.
//   Drivers: Cymbopogon citratus oil (lemongrass scent);
//   hydroxyethyl acrylate / sodium acryloyldimethyl taurate
//   copolymer. Unlabeled MCT + potassium sorbate Limited.
//   C15-19 alkane + arachidyl alcohol / behenyl alcohol /
//   arachidyl glucoside Cleared exact. No High.
//
// REFUSED (still missing an exact §5 row — do not invent): none.
// All written tokens grade under the Sept 15 Asutra §5 locks.
//
// SKIPPED: lavender Melt Pain Away (different scent / founder did
// not ask). Do not write.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const PAIN_FEVER = 'Pain & Fever';
const UNVERIFIED_NOTE = 'draft, not verified';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / capsicum / benzyl alcohol / trolamine salicylate / phenol actives stay parked (no invented active-safety cap). Inactives graded only. Capsaicin 0.025% is the labeled ACTIVE on these rows — not the §5 inactive Caution token.';

const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this cream / body-butter fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglyceride and does not name coconut on that token. We mark that Limited because the source isn’t clear. This cream / body-butter emollient / vehicle is not the gummy seed-oil High rule.';

const METH = {
  tocopherylAcetate:
    'Methodology §5 Caution (tocopheryl acetate — exact INCI; distinct from Cleared mixed tocopherols; standalone Caution, not Avoid; locked Sept 15, 2026)',
  pentaerythrityl:
    'Methodology §5 Caution (pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  cymbopogonFlexuosus:
    'Methodology §5 Caution (Cymbopogon flexuosus oil — lemongrass scent; exact token; botanical oil used as scent — extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026). Named single oil as BASE/FILL is Cleared; this lemongrass oil is the scent-blend Caution, not a cream vehicle.',
  cymbopogonCitratus:
    'Methodology §5 Caution (Cymbopogon citratus oil — lemongrass scent; exact token; botanical oil used as scent — extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026). Named single oil as BASE/FILL is Cleared; this lemongrass oil is the scent-blend Caution, not a cream vehicle.',
  hydroxyaceto:
    'Methodology §5 Caution (hydroxyacetophenone — standalone Caution, not Avoid; locked Sept 15, 2026)',
  amps:
    'Methodology §5 Caution (acrylamide / sodium acryloyldimethyltaurate copolymer / hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer — AMPS; standalone Caution, not Avoid; locked Sept 15, 2026)',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  sweetAlmond: `Methodology §5 Cleared (shea butter / coconut oil / sweet almond oil in cream or topical — named single oil as the base or fill; not gummy High; form tap required; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  shea: `Methodology §5 Cleared (shea butter / coconut oil / sweet almond oil in cream or topical — named single oil/butter as the cream vehicle; not gummy High; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  sodiumLactate:
    'Methodology §5 Cleared (sodium lactate — exact INCI; locked Sept 15, 2026)',
  glycerylStearateCitrate:
    'Methodology §5 Cleared (glyceryl stearate citrate — exact INCI; distinct from glyceryl stearate / glyceryl stearate SE / glyceryl distearate; locked Sept 15, 2026)',
  polyglyceryl3:
    'Methodology §5 Cleared (polyglyceryl-3 diisostearate — exact INCI; locked Sept 15, 2026)',
  undecane:
    'Methodology §5 Cleared (undecane — exact INCI; cream emollient alkane; same job as C15-19 alkane; distinct token — do not alias; locked Sept 15, 2026)',
  tridecane:
    'Methodology §5 Cleared (tridecane — exact INCI; cream emollient alkane; same job as C15-19 alkane; distinct token — do not alias; locked Sept 15, 2026)',
  calciumChloride:
    'Methodology §5 Cleared (calcium chloride — exact INCI; locked Sept 15, 2026)',
  c1519:
    'Methodology §5 Cleared (C15-19 alkane — exact INCI; cream emollient alkane; same job as undecane / tridecane; do not alias those tokens to this row; locked Sept 15, 2026)',
  arachidylAlcohol:
    'Methodology §5 Cleared (arachidyl alcohol — exact words; do not alias; do not rely on the fatty-alcohol family row alone; locked Sept 15, 2026)',
  behenylAlcohol:
    'Methodology §5 Cleared (behenyl alcohol — exact words; do not alias; do not rely on the fatty-alcohol family row alone; locked Sept 15, 2026)',
  arachidylGlucoside:
    'Methodology §5 Cleared (arachidyl glucoside — exact words; do not alias; distinct from cetearyl glucoside; locked Sept 15, 2026)',
  cetylPalmitate:
    'Methodology §5 Cleared (cetyl palmitate — wax ester; fatty-alcohol / wax family; locked Sept 14, 2026)',
  mgChloride:
    'Methodology §5 Cleared (magnesium chloride — exact salt token; locked Sept 15, 2026)',
  mgSulfate:
    'Methodology §5 Cleared (magnesium sulfate — exact INCI; locked Sept 15, 2026)',
  msm: 'Methodology §5 Cleared (MSM / methylsulfonylmethane / dimethyl sulfone as labeled inactive — exact token; locked Sept 15, 2026)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol / cetostearyl alcohol — fatty-alcohol family)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate / glyceryl monostearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  pentylene:
    'Methodology §5 Cleared (pentylene glycol / propanediol — humectant / solvent; locked Sept 15, 2026)',
  panthenol:
    'Methodology §5 Cleared (panthenol — exact INCI; locked Sept 15, 2026)',
  allantoin:
    'Methodology §5 Cleared (allantoin — topical soother; locked Sept 15, 2026)',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin — locked Sept 14, 2026 housekeeping)',
  xanthan:
    'Methodology §5 Cleared (xanthan gum / guar / gum arabic / pectin / gellan — locked v1.6)',
  kcl: 'Methodology §5 Cleared (potassium chloride — salt / electrolyte; locked Sept 15, 2026)',
  nacl: 'Methodology §5 Cleared (sodium chloride / sodium bicarbonate — saline bases)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster — locked Sept 14, 2026)',
  cleared: 'Methodology §5 Cleared',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

const SET = {
  dailymed: 'a95a11d7-a2ae-6654-e053-2a95a90a802c',
} as const;

const ID = {
  dailymed: 'asutra-melt-pain-away',
  thrive: 'asutra-melt-pain-away-thrive',
} as const;

const CITE = {
  thrive:
    'Asutra.com Melt Pain Away Magnesium Body Butter current PDP (https://asutra.com/products/magnesium-body-butter and https://asutra.com/products/melt-pain-away-body-butter-tube) + Thrive Market listing https://thrivemarket.com/p/asutra-melt-pain-away-magnesium-body-butter SKU 856458008873 — Drug Facts inactive: Purified Water, C15-19 Alkane, Magnesium Chloride, Arachidyl Alcohol and Behenyl Alcohol and Arachidyl Glucoside, Cetearyl Alcohol, Butyrospermum Parkii (Shea) Butter, Glycerin USP, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Caprylic Capric Triglyceride, Methylsulfonylmethane, Potassium Sorbate, Cymbopogon Citratus (Lemongrass) Oil',
} as const;

const ARNICARE_GEL = 'boiron-arnicare-gel';
const LIFE_FLO_OIL = 'life-flo-pure-magnesium-oil';

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    LIFE_FLO_OIL,
    'Independently Clean topical magnesium analog already on main (Life-flo Pure Magnesium Oil spray — magnesium chloride brine only). Form: spray vs body butter — labeled, not a hard filter (§6). Different actives (no capsaicin). No Clean conventional NSAID / lidocaine / capsaicin cream invented.',
  ),
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs body butter — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine / capsaicin cream invented.',
  ),
];

export const BATCH53_ASUTRA_MELT_PAIN_AWAY: RatingRecord[] = [
  row({
    id: ID.dailymed,
    productName: 'Melt Pain Away Magnesium Body Butter',
    brand: 'Asutra',
    category: PAIN_FEVER,
    formulaId: ID.dailymed,
    audience: ADULT,
    minAge: 18,
    form: 'body butter',
    activeIngredients: [{ name: 'Capsaicin', strength: '0.025%' }],
    inactiveIngredients: [
      cleared(SET.dailymed, 'Water'),
      flag(
        'Magnesium Chloride',
        'cleared',
        dailymed(SET.dailymed, METH.mgChloride),
      ),
      flag(
        'Prunus Amygdalus Dulcis (Sweet Almond) Oil',
        'cleared',
        dailymed(SET.dailymed, METH.sweetAlmond),
      ),
      flag(
        'Cetearyl Alcohol',
        'cleared',
        dailymed(SET.dailymed, METH.fattyAlcohol),
      ),
      flag(
        'Butyrospermum Parkii (Shea) Butter',
        'cleared',
        dailymed(SET.dailymed, METH.shea),
      ),
      flag(
        'Dimethyl Sulfone (MSM)',
        'cleared',
        dailymed(SET.dailymed, METH.msm),
      ),
      flag(
        'Sodium Lactate',
        'cleared',
        dailymed(SET.dailymed, METH.sodiumLactate),
      ),
      flag(
        'Glyceryl Stearate Citrate',
        'cleared',
        dailymed(SET.dailymed, METH.glycerylStearateCitrate),
      ),
      flag(
        'Cetyl Palmitate',
        'cleared',
        dailymed(SET.dailymed, METH.cetylPalmitate),
      ),
      flag('Glycerin', 'cleared', dailymed(SET.dailymed, METH.glycerin)),
      flag(
        'Glyceryl Stearate',
        'cleared',
        dailymed(SET.dailymed, METH.glycerylStearate),
      ),
      flag(
        'Polyglyceryl-3 Diisostearate',
        'cleared',
        dailymed(SET.dailymed, METH.polyglyceryl3),
      ),
      flag(
        'Pentylene Glycol',
        'cleared',
        dailymed(SET.dailymed, METH.pentylene),
      ),
      flag('Undecane', 'cleared', dailymed(SET.dailymed, METH.undecane)),
      flag('Xanthan Gum', 'cleared', dailymed(SET.dailymed, METH.xanthan)),
      flag(
        'Magnesium Sulfate',
        'cleared',
        dailymed(SET.dailymed, METH.mgSulfate),
      ),
      flag('Tridecane', 'cleared', dailymed(SET.dailymed, METH.tridecane)),
      flag('Potassium Chloride', 'cleared', dailymed(SET.dailymed, METH.kcl)),
      flag('Sodium Chloride', 'cleared', dailymed(SET.dailymed, METH.nacl)),
      flag(
        'Calcium Chloride',
        'cleared',
        dailymed(SET.dailymed, METH.calciumChloride),
      ),
      flag(
        'Tocopheryl Acetate (Vitamin E)',
        'cleared',
        dailymed(SET.dailymed, METH.tocopherylAcetate),
      ),
      flag(
        'Hydroxyacetophenone',
        'cleared',
        dailymed(SET.dailymed, METH.hydroxyaceto),
      ),
      flag('Panthenol', 'cleared', dailymed(SET.dailymed, METH.panthenol)),
      flag('Allantoin', 'cleared', dailymed(SET.dailymed, METH.allantoin)),
      flag(
        'Pentaerythrityl Tetra-Di-T-Butyl Hydroxyhydrocinnamate',
        'cleared',
        dailymed(SET.dailymed, METH.pentaerythrityl),
      ),
      flag('Sodium Hydroxide', 'cleared', dailymed(SET.dailymed, METH.naoh)),
      flag(
        'Cymbopogon Flexuosus (East-Indian Lemongrass) Oil',
        'cleared',
        dailymed(SET.dailymed, METH.cymbopogonFlexuosus),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Asutra Melt Pain Away Magnesium Body Butter (DailyMed setid ${SET.dailymed}) = Caution. Capsaicin 0.025% is the labeled ACTIVE — not graded as the §5 inactive Caution token. Drivers are tocopheryl acetate (exact Caution INCI; distinct from Cleared mixed tocopherols), pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate (exact Caution INCI), Cymbopogon flexuosus oil (lemongrass scent — extract/scent Caution, not a cream-vehicle Clear), and hydroxyacetophenone. Sweet almond oil + shea butter are named cream vehicles (Cleared; not gummy High). ${CREAM_OIL_TAP} Sodium lactate / glyceryl stearate citrate / polyglyceryl-3 diisostearate / undecane / tridecane / calcium chloride are the locked exact Cleared Asutra tokens. No High. No parabens. Own formulaId ${ID.dailymed} — do NOT merge the Thrive / current Asutra.com carton (that OI is C15-19 alkane + arachidyl alcohols/glucoside + AMPS + unlabeled MCT + Cymbopogon citratus oil and has its own formulaId ${ID.thrive}). Jar 200 g (NDC 72683-003-01) + 1.9 g packet (NDC 72683-003-02) share this formulaId. Adults / 18+ (18 or younger: consult a doctor). External use only. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: ['Asutra'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.dailymed} (NDC 72683-003) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.thrive,
    productName: 'Melt Pain Away Magnesium Body Butter (Thrive carton)',
    brand: 'Asutra',
    category: PAIN_FEVER,
    formulaId: ID.thrive,
    audience: ADULT,
    minAge: 18,
    form: 'body butter',
    activeIngredients: [{ name: 'Capsaicin', strength: '0.025%' }],
    inactiveIngredients: [
      flag(
        'Purified Water',
        'cleared',
        labelCite(CITE.thrive, METH.cleared),
      ),
      flag('C15-19 Alkane', 'cleared', labelCite(CITE.thrive, METH.c1519)),
      flag(
        'Magnesium Chloride',
        'cleared',
        labelCite(CITE.thrive, METH.mgChloride),
      ),
      flag(
        'Arachidyl Alcohol',
        'cleared',
        labelCite(CITE.thrive, METH.arachidylAlcohol),
      ),
      flag(
        'Behenyl Alcohol',
        'cleared',
        labelCite(CITE.thrive, METH.behenylAlcohol),
      ),
      flag(
        'Arachidyl Glucoside',
        'cleared',
        labelCite(CITE.thrive, METH.arachidylGlucoside),
      ),
      flag(
        'Cetearyl Alcohol',
        'cleared',
        labelCite(CITE.thrive, METH.fattyAlcohol),
      ),
      flag(
        'Butyrospermum Parkii (Shea) Butter',
        'cleared',
        labelCite(CITE.thrive, METH.shea),
      ),
      flag('Glycerin USP', 'cleared', labelCite(CITE.thrive, METH.glycerin)),
      flag(
        'Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer',
        'cleared',
        labelCite(CITE.thrive, METH.amps),
      ),
      flag(
        'Caprylic Capric Triglyceride',
        'limited',
        labelCite(CITE.thrive, METH.mctUnlabeled),
      ),
      flag(
        'Methylsulfonylmethane',
        'cleared',
        labelCite(CITE.thrive, METH.msm),
      ),
      flag(
        'Potassium Sorbate',
        'limited',
        labelCite(CITE.thrive, METH.benzoate),
      ),
      flag(
        'Cymbopogon Citratus (Lemongrass) Oil',
        'cleared',
        labelCite(CITE.thrive, METH.cymbopogonCitratus),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Asutra Melt Pain Away Magnesium Body Butter (Thrive / current Asutra.com carton) = Caution. Capsaicin 0.025% is the labeled ACTIVE — not graded as the §5 inactive Caution token. Current carton OI differs from DailyMed setid ${SET.dailymed} — own formulaId ${ID.thrive}, do NOT clone ${ID.dailymed}. Drivers are Cymbopogon citratus oil (lemongrass scent — extract/scent Caution, not a cream-vehicle Clear) and hydroxyethyl acrylate / sodium acryloyldimethyl taurate copolymer (AMPS Caution). Caprylic/capric triglyceride sits on the existing unlabeled-MCT Limited row (source not named on that token; cream / body-butter vehicle ≠ gummy High). ${MCT_UNLABELED_TAP} Potassium sorbate Limited. C15-19 alkane is the locked exact Cleared cream-emollient alkane (same job as undecane / tridecane — do not alias). Arachidyl alcohol / behenyl alcohol / arachidyl glucoside are the locked exact Cleared words. Shea butter is the named cream vehicle (Cleared; not gummy High). ${CREAM_OIL_TAP} No High. No parabens. Limited-only would stay Caution; Avoid needs High. ${LIMITED_STACK} 3.4 oz + 7.0 oz + tube share this formulaId when the carton OI holds. Thrive listing SKU 856458008873 is this carton family — barcode not invented on the record. Adults / 18+ (18 or younger: consult a doctor). External use only. Lavender Melt Pain Away is a different scent and is not this row. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: ['Thrive Market', 'Asutra'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [`${CITE.thrive} — ${UNVERIFIED_NOTE}; no matching DailyMed drug SPL for this carton OI`],
  }),
];

export const BATCH53_REFUSED = [] as const;

const DAILYMED = BATCH53_ASUTRA_MELT_PAIN_AWAY.find(
  (r) => r.id === ID.dailymed,
);
const THRIVE = BATCH53_ASUTRA_MELT_PAIN_AWAY.find((r) => r.id === ID.thrive);

if (BATCH53_ASUTRA_MELT_PAIN_AWAY.length !== 2) {
  throw new Error('batch 53 must write exactly 2 Search rows');
}
if (BATCH53_ASUTRA_MELT_PAIN_AWAY.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 53 Clean tally is 0');
}
if (BATCH53_ASUTRA_MELT_PAIN_AWAY.filter((r) => r.verdict === 'caution').length !== 2) {
  throw new Error('batch 53 Caution tally is 2');
}
if (BATCH53_ASUTRA_MELT_PAIN_AWAY.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch 53 Avoid tally is 0');
}
if (BATCH53_ASUTRA_MELT_PAIN_AWAY.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 53 stays on Pain & Fever');
}
if (BATCH53_ASUTRA_MELT_PAIN_AWAY.some((record) => record.barcode)) {
  throw new Error('batch 53 must not invent barcodes');
}
if (BATCH53_ASUTRA_MELT_PAIN_AWAY.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 53 recordStatus must stay unverified');
}
if (DAILYMED?.formulaId === THRIVE?.formulaId) {
  throw new Error('Thrive carton must not clone the DailyMed formulaId');
}
if (DAILYMED?.verdict !== 'caution' || THRIVE?.verdict !== 'caution') {
  throw new Error('both Asutra Melt Pain Away rows must stay Caution');
}
if (
  !DAILYMED?.activeIngredients.some(
    (item) => item.name === 'Capsaicin' && item.strength === '0.025%',
  )
) {
  throw new Error('DailyMed row must list capsaicin 0.025% as ACTIVE');
}
if (
  DAILYMED?.inactiveIngredients.some((item) =>
    /capsaicin/i.test(item.name),
  )
) {
  throw new Error('DailyMed row must not grade capsaicin as an inactive');
}
if (
  !DAILYMED?.inactiveIngredients.some(
    (item) => item.name === 'Tocopheryl Acetate (Vitamin E)',
  )
) {
  throw new Error('DailyMed row must list tocopheryl acetate');
}
if (
  !DAILYMED?.inactiveIngredients.some((item) =>
    item.name.includes('Cymbopogon Flexuosus'),
  )
) {
  throw new Error('DailyMed row must list Cymbopogon flexuosus oil');
}
if (
  !THRIVE?.inactiveIngredients.some((item) => item.name === 'C15-19 Alkane')
) {
  throw new Error('Thrive carton must list C15-19 alkane');
}
if (
  !THRIVE?.inactiveIngredients.some((item) =>
    item.name.includes('Cymbopogon Citratus'),
  )
) {
  throw new Error('Thrive carton must list Cymbopogon citratus oil');
}
if (BATCH53_REFUSED.length !== 0) {
  throw new Error('batch 53 refused list must stay empty — all written tokens grade');
}

// Verdict tally (2 records): Clean 0 · Caution 2 · Avoid 0
// Written: DailyMed SPL + Thrive / current carton (two formulaIds)
// Reuse: batches 41–52 untouched
// Refused still-missing exact §5: none
