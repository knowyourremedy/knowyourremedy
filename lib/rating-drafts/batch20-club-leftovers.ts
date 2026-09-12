// DRAFT / not verified / batch 20 club leftovers / high-conf DailyMed only /
// FLAG soft rows skipped / reuse L612 + coated cetirizine formulaIds /
// methodology untouched.
//
// Kirkland + Member's Mark club holes only. High-conf DailyMed rows ONLY.
// Mixed categories · audience 'adult' · recordStatus is 'unverified' on
// every row. Founder calls (locked): see notes below. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from
// this draft. Methodology.md / PROJECT_NOTES.md are untouched.
// No Amazon-only. No Dollar Tree.
//
// REUSE (do not duplicate grades):
// - C1 Member's Mark loratadine 10 mg reuses `loratadine-l612-plain`
//   (same L612 family as Equate / up&up / Kirkland AllerClear in batch 5).
// - C2 Kirkland Aller-Tec plain cetirizine 10 mg reuses
//   `store-cetirizine-coated-blue1-tio2` (same Blue #1 lake + TiO2 coat
//   as Equate / Member's Mark / CVS cetirizine in batch 5).
//
// NEW formulaIds (do not merge):
// - C3 Aller-Tec D is a cetirizine + PSE ER combo — NOT the plain
//   coated-cetirizine formulaId.
// - C4 Mucus-DM Max is a club 1200/60 ER — distinct from
//   `mucinex-dm-er-yellow10` (600/30) unless inactives are identical
//   (they are not: this SPL adds copovidone / Mg hydroxide / Mg stearate
//   / SiO2).
//
// FOUNDER CALLS (LOCKED) — high-conf DailyMed only:
// CLEAN
// - C1 Member's Mark Allergy Relief loratadine 10 mg = Clean. Reuse
//   `loratadine-l612-plain`. DailyMed setid 95c2b45a (imprint L612).
//   Drug Facts: lactose monohydrate, magnesium stearate, povidone,
//   pregelatinized starch. Structured inactive table may omit starch —
//   confirm pregelatinized starch on the carton vs other L612 rows.
// AVOID
// - C2 Kirkland Signature Aller-Tec cetirizine 10 mg (plain, NOT -D) =
//   Avoid. Reuse `store-cetirizine-coated-blue1-tio2`. DailyMed setid
//   d4a688aa: corn starch, FD&C blue no. 1 aluminum lake, hypromellose,
//   lactose, Mg stearate, polydextrose, PEG, povidone, titanium dioxide,
//   triacetin.
// - C3 Kirkland Signature Aller-Tec D (cetirizine HCl 5 mg +
//   pseudoephedrine HCl 120 mg ER) = Avoid. New formulaId
//   `kirkland-aller-tec-d-cetirizine-pse`. DailyMed setid a8e57b21
//   (NDC 63981-147). High drivers from the SPL: TiO2 + talc (white
//   film coat; no synthetic dye on this label). PEG Moderate. SiO2
//   Caution cap. Ages 12+.
// - C4 Kirkland Signature Mucus-DM Max (guaifenesin 1200 mg + DXM
//   60 mg ER) = Avoid. New formulaId `kirkland-mucus-dm-max-er`.
//   DailyMed setid d2151492: carbomer, copovidone, D&C yellow #10
//   aluminum lake, hypromellose, Mg hydroxide, Mg stearate, MCC,
//   silicon dioxide. Yellow #10 = High Avoid. Ages 12+.
//
// TALLY (unverified drafts): 4 rows — Clean 1 / Caution 0 / Avoid 3.
// Independently Clean in THIS batch: C1 Member's Mark L612 loratadine
// only. C2 / C3 cleanAlternatives point at the L612 / Claritin pattern
// used in batch 5 (plus this in-batch C1). C4 has no Clean same-active
// mucus-DM analog — points at batch 3 ColdCalm as a labeled form swap,
// not a 12-hour expectorant replacement.
//
// SKIPPED (founder FLAG / soft — do not invent / do not write):
// - Kirkland guaifenesin-only — FLAG no clean DailyMed
// - Member's Mark Mucus/DM twin — FLAG no Sam's SPL
// - Member's Mark Max Sleep Aid DPH 50 softgels — FLAG until carton/DailyMed
// - Kirkland club sleep — FLAG
// - Member's Mark Vitamin D3 softgels — soft flag (DSLD only)
// - Member's Mark Fish Oil 1200 + D3 — soft flag
// - Member's Mark Men's / Adult Daily Multi — FLAG TiO2 unknown
// - Kirkland Wild Alaskan / enteric FO — FLAG
// - Member's Mark kids multi gummies — FLAG oil
// - Anything already on main (APAP, IBU, Kirkland loratadine, MM
//   cetirizine already drafted, Kirkland multi twins, kids gummies,
//   clear D3/FO)

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const ALLERGY = 'Allergy';
const COLD_FLU = 'Cold & Flu';

const L612_FORMULA = 'loratadine-l612-plain';
const COATED_CETIRIZINE = 'store-cetirizine-coated-blue1-tio2';

const MM_LORATADINE_ID = 'members-mark-loratadine-tablets';
const KIRKLAND_LORATADINE = 'kirkland-allerclear-loratadine-plain';
const CLARITIN_PLAIN = 'claritin-allergy-tablets-plain';
const EQUATE_LORATADINE = 'equate-loratadine-tablets-plain';

const SET_MM_LORATADINE = '95c2b45a-d0e5-467c-aad4-7bbb6c9a5204';
const SET_KIRKLAND_CET = 'd4a688aa-02d4-4af6-9a91-ed31679cfaf8';
const SET_KIRKLAND_CET_D = 'a8e57b21-4622-4315-8e8e-437243be2fe1';
const SET_KIRKLAND_MUCUS_DM = 'd2151492-c6bb-42c7-887f-37ef3eab3460';

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

const L612_CLARITIN_ALTS: CleanAlternative[] = [
  {
    productId: KIRKLAND_LORATADINE,
    rankReason:
      'Independently Clean Kirkland AllerClear plain loratadine (L612 family, batch 5). Same-store Costco club analog. Form: tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: MM_LORATADINE_ID,
    rankReason:
      'Independently Clean in-batch Member\'s Mark plain loratadine (same `loratadine-l612-plain` family). Form: tablet. Club L612 twin (Sam\'s).',
  },
  {
    productId: CLARITIN_PLAIN,
    rankReason:
      'Closest independently Clean national analog (plain Claritin 10 mg tablets, no TiO2, batch 5). Form: tablet.',
  },
  {
    productId: EQUATE_LORATADINE,
    rankReason:
      'Independently Clean store-brand plain loratadine (L612 family, batch 5). Form: tablet.',
  },
];

const COLD_ORAL_ALTS: CleanAlternative[] = [
  {
    productId: 'coldcalm-meltaways',
    rankReason:
      'No independently Clean guaifenesin / DM expectorant exists in this draft set. Closest independently Clean adult Cold & Flu analog is batch 3 ColdCalm meltaways. Form: meltaway tablet vs 12-hour ER — labeled, not a hard filter (§6); not an expectorant replacement.',
  },
];

export const BATCH20_CLUB_LEFTOVERS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: MM_LORATADINE_ID,
    productName: "Member's Mark Allergy Relief (Loratadine 10 mg)",
    brand: "Member's Mark",
    category: ALLERGY,
    formulaId: L612_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared(SET_MM_LORATADINE, 'Lactose monohydrate'),
      cleared(SET_MM_LORATADINE, 'Magnesium stearate'),
      cleared(SET_MM_LORATADINE, 'Povidone'),
      cleared(SET_MM_LORATADINE, 'Pregelatinized starch'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Member\'s Mark Allergy Relief loratadine 10 mg = Clean. Reuses `loratadine-l612-plain` (same L612 family as Equate / up&up / Kirkland AllerClear). DailyMed setid 95c2b45a (NDC 68196-711; imprint L612). Drug Facts inactive list: lactose monohydrate, magnesium stearate, povidone, pregelatinized starch. The structured SPL inactive table lists only lactose / magnesium stearate / povidone and may omit pregelatinized starch vs other L612 rows — confirm starch is still on the carton before treating pack sizes as the same formula. No TiO2 / dye. Contains lactose. Ages 6+ (under 6: ask a doctor). This is not a coated / -D SKU. Member\'s Mark cetirizine is a different Avoid formula already drafted in batch 5.',
    retailers: ["Sam's Club"],
    sourcesGeneral: [
      `DailyMed setid ${SET_MM_LORATADINE} (L612 plain loratadine; draft, not verified) — confirm pregelatinized starch on carton`,
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'kirkland-aller-tec-cetirizine',
    productName: 'Kirkland Signature Aller-Tec (Cetirizine 10 mg)',
    brand: 'Kirkland Signature',
    category: ALLERGY,
    formulaId: COATED_CETIRIZINE,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed(SET_KIRKLAND_CET, METH.tio2),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_KIRKLAND_CET, METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_KIRKLAND_CET, METH.peg),
      ),
      cleared(SET_KIRKLAND_CET, 'Corn starch'),
      cleared(SET_KIRKLAND_CET, 'Hypromellose'),
      cleared(SET_KIRKLAND_CET, 'Lactose monohydrate'),
      cleared(SET_KIRKLAND_CET, 'Magnesium stearate'),
      cleared(SET_KIRKLAND_CET, 'Polydextrose'),
      cleared(SET_KIRKLAND_CET, 'Povidone'),
      cleared(SET_KIRKLAND_CET, 'Triacetin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Kirkland Signature Aller-Tec cetirizine 10 mg (plain, NOT -D) = Avoid. Reuses `store-cetirizine-coated-blue1-tio2` — same Blue #1 lake + TiO2 coat family as Equate / Member\'s Mark / CVS cetirizine (batch 5). DailyMed setid d4a688aa: corn starch, FD&C blue no. 1 aluminum lake, hypromellose, lactose monohydrate, magnesium stearate, polydextrose, polyethylene glycol, povidone, titanium dioxide, triacetin. High drivers are TiO2 + Blue #1 lake. PEG is Moderate (not needed to reach Avoid). This is not Aller-Tec D (combo + ER; separate formulaId). Contains lactose. Ages 6+.',
    retailers: ['Costco'],
    cleanAlternatives: L612_CLARITIN_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_KIRKLAND_CET} (Kirkland Aller-Tec plain cetirizine; draft, not verified)`,
    ],
  },
  {
    id: 'kirkland-aller-tec-d-cetirizine-pse',
    productName:
      'Kirkland Signature Aller-Tec D (Cetirizine 5 mg / Pseudoephedrine 120 mg ER)',
    brand: 'Kirkland Signature',
    category: ALLERGY,
    formulaId: 'kirkland-aller-tec-d-cetirizine-pse',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Cetirizine HCl', strength: '5mg' },
      { name: 'Pseudoephedrine HCl', strength: '120mg' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed(SET_KIRKLAND_CET_D, METH.tio2),
      ),
      flag('Talc', 'high', dailymed(SET_KIRKLAND_CET_D, METH.talc)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_KIRKLAND_CET_D, METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_KIRKLAND_CET_D, METH.sio2),
      ),
      cleared(SET_KIRKLAND_CET_D, 'Hypromellose'),
      cleared(SET_KIRKLAND_CET_D, 'Lactose monohydrate'),
      cleared(SET_KIRKLAND_CET_D, 'Magnesium stearate'),
      cleared(SET_KIRKLAND_CET_D, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Kirkland Signature Aller-Tec D = Avoid. New formulaId `kirkland-aller-tec-d-cetirizine-pse` — do not reuse plain Aller-Tec / `store-cetirizine-coated-blue1-tio2` (this is a cetirizine 5 mg + pseudoephedrine 120 mg 12-hour ER combo). DailyMed setid a8e57b21 (NDC 63981-147; imprint L147). Inactive list: colloidal silicon dioxide, hypromellose, lactose monohydrate, low-substituted hydroxypropyl cellulose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, talc, titanium dioxide. High drivers from this SPL are TiO2 + talc (white film coat; no synthetic dye on the label). PEG is Moderate (not needed to reach Avoid). Silicon dioxide is the nanoparticle Caution cap (0 demerit points; not Avoid alone). Polyvinyl alcohol and low-substituted hydroxypropyl cellulose are on the SPL and are not in Methodology §5 (ungraded; not the Avoid drivers). Contains lactose. Ages 12+ (under 12: ask a doctor; 65+: ask a doctor). Swallow whole — do not break or chew.',
    retailers: ['Costco'],
    cleanAlternatives: L612_CLARITIN_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_KIRKLAND_CET_D} (Kirkland Aller-Tec D NDC 63981-147; draft, not verified)`,
    ],
  },
  {
    id: 'kirkland-mucus-dm-max-er',
    productName: 'Kirkland Signature Mucus-DM Max (1200 mg / 60 mg ER)',
    brand: 'Kirkland Signature',
    category: COLD_FLU,
    formulaId: 'kirkland-mucus-dm-max-er',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Guaifenesin', strength: '1200mg' },
      { name: 'Dextromethorphan HBr', strength: '60mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET_KIRKLAND_MUCUS_DM, METH.dyes),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET_KIRKLAND_MUCUS_DM, METH.sio2),
      ),
      cleared(SET_KIRKLAND_MUCUS_DM, 'Carbomer homopolymer type B'),
      cleared(SET_KIRKLAND_MUCUS_DM, 'Copovidone'),
      cleared(SET_KIRKLAND_MUCUS_DM, 'Hypromellose'),
      cleared(SET_KIRKLAND_MUCUS_DM, 'Magnesium hydroxide'),
      cleared(SET_KIRKLAND_MUCUS_DM, 'Magnesium stearate'),
      cleared(SET_KIRKLAND_MUCUS_DM, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Kirkland Signature Mucus-DM Max = Avoid. New club formulaId `kirkland-mucus-dm-max-er` — do not silently merge into `mucinex-dm-er-yellow10` (that national 600/30 SPL is a different strength and inactive stack). DailyMed setid d2151492 (NDC 63981-812; imprint L812): carbomer homopolymer type B, copovidone, D&C yellow #10 aluminum lake, hypromellose, magnesium hydroxide, magnesium stearate, microcrystalline cellulose, silicon dioxide. Yellow #10 lake is High-tier Avoid. Silicon dioxide is the nanoparticle Caution cap (not needed to reach Avoid). Member\'s Mark Mucus/DM twin was FLAG-skipped (no Sam\'s SPL). Kirkland guaifenesin-only was FLAG-skipped (no clean DailyMed). Ages 12+ (under 12: do not use). Swallow whole with water — do not crush, chew, or break.',
    retailers: ['Costco'],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_KIRKLAND_MUCUS_DM} (Kirkland Mucus-DM Max 1200/60; draft, not verified) — not mucinex-dm-er-yellow10`,
    ],
  },
];
