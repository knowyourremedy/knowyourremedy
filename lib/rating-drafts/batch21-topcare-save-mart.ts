// DRAFT / not verified / batch 21 TopCare @ Save Mart slice 1 /
// high-conf DailyMed only / FLAG sleep + vitamins skipped /
// methodology untouched.
//
// TopCare house brand at Save Mart only. High-conf DailyMed rows ONLY.
// Mixed categories · audience 'adult' · recordStatus is 'unverified' on
// every row. Founder calls (locked): see notes below. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from
// this draft. Methodology.md / PROJECT_NOTES.md are untouched.
// Brick-and-mortar retailers: ['Save Mart'] only. Lucky / FoodMaxx are
// not listed unless a later carton confirms the same TopCare SKU —
// do not invent retailer presence. No Amazon-only. No Dollar Tree.
// No Safeway / Signature Care / Open Nature.
//
// REUSE (do not duplicate grades):
// - T5 TopCare Allergy Relief loratadine 10 mg MUST reuse
//   `loratadine-l612-plain` (same L612 family as Equate / Kirkland /
//   Member's Mark / up&up).
// - T6 TopCare Allergy & Congestion Relief (loratadine 5 + PSE 120)
//   reuses `equate-loratadine-d-tio2` (same 5/120 TiO2 family; no
//   dye lakes on this SPL).
// - T7 TopCare All Day Allergy cetirizine 10 mg MUST reuse
//   `store-cetirizine-coated-blue1-tio2` (same Blue #1 lake + TiO2
//   coat as Equate / Member's Mark / CVS / Kirkland Aller-Tec).
// - T8 TopCare Mucus DM ER 600/30 reuses `upup-mucus-dm-er-yellow10`
//   (same Yellow #10 lake family and 600/30 strength).
// - T3b TopCare Ibuprofen film-coated caplets (representative dyed
//   + talc + TiO2 SPL) reuses `ibu-kirkland-ib-caplets` (same High
//   flags: Red 40 lake + Yellow 6 lake + talc + TiO2).
//
// NEW formulaIds (do not merge):
// - T2 APAP 500 softgels — dyes, NO TiO2. Do not reuse
//   `apap-tylenol-es-liquid-gels` (that family flags TiO2).
// - T1 APAP 500 film-coated tablets — Red 40 lake + TiO2 + talc.
//   Not L484 / PEG-only (`apap-store-es-l484-peg`). Not a close
//   enough twin of `apap-cvs-es-red40-tio2` (CVS row has no talc).
// - T3a IBU liquid gels / minis — Green #3 + TiO2. Do not reuse
//   `ibu-advil-liqui-gels` (Advil liquigel SPL flags Green #3 + PEG,
//   not TiO2).
// - T4 Dual Action (APAP 250 + IBU 125) — TiO2 + talc. Do not reuse
//   `apap-ibu-advil-dual-action` (Advil dual-action row is TiO2 only).
// - T10 Esomeprazole 20 mg DR capsules — dyes + TiO2 + talc. Different
//   active from Prilosec OTC (omeprazole) — new formulaId.
//
// FOUNDER CALLS (LOCKED) — high-conf DailyMed only:
// CLEAN
// - T5 TopCare Allergy Relief loratadine 10 mg = Clean. Reuse
//   `loratadine-l612-plain`. DailyMed setid a500aebf (NDC 36800-612;
//   imprint L612). Drug Facts: lactose monohydrate, magnesium
//   stearate, povidone, pregelatinized starch. Founder: Clean only
//   if L612 match — confirmed.
// AVOID
// - T2 TopCare Extra Strength Pain Relief APAP 500 softgels = Avoid
//   (dyes). DailyMed setid 8cc2c735 (NDC 36800-414). Red #40 +
//   Yellow #6; no titanium dioxide on this SPL.
// - T1 TopCare Extra Strength Pain Relief APAP 500 film-coated
//   tablets = Avoid (dyed + TiO2 + talc). DailyMed setid 6aca88df
//   (NDC 36800-973; imprint L31G).
// - T3a TopCare Ibuprofen liquid gels / minis = Avoid. DailyMed
//   setid 0a24c758 (NDC 36800-705). Green #3 + TiO2 + PEG family.
// - T3b TopCare Ibuprofen film-coated tablets = Avoid. One
//   representative high-conf SPL: setid 479a0c97 (NDC 36800-517
//   caplets; Red 40 / Yellow 6 lakes + talc + TiO2). Twin tablet
//   setid 66097f19 (NDC 36800-604; TiO2 + iron oxides, no dye
//   lakes) is the same Avoid family, not this row.
// - T4 TopCare Dual Action (APAP 250 + IBU 125) = Avoid. DailyMed
//   setid dddc04c4 (NDC 76162-501 — still TopCare Dual Action on
//   the label). TiO2 + talc High.
// - T6 TopCare Allergy & Congestion Relief (loratadine 5 + PSE 120)
//   = Avoid. DailyMed setid dd93d172 (NDC 36800-611). TiO2; no dye
//   lakes on this SPL.
// - T7 TopCare All Day Allergy cetirizine 10 mg = Avoid. DailyMed
//   setid f2919aad (NDC 36800-458). Blue #1 lake + TiO2.
// - T8 TopCare Mucus DM ER (guaifenesin 600 + DXM 30) = Avoid.
//   DailyMed setid c12c68c3 (NDC 36800-219). Yellow #10 lake =
//   Avoid per founder.
// - T10 TopCare Esomeprazole Magnesium 20 mg delayed-release
//   capsules = Avoid (digestive / acid reducer). DailyMed setid
//   86384845 (NDC 36800-627). Blue #1 (+ lake) + Red #3 + TiO2 +
//   talc. minAge 18. Mirror batch 10 Prilosec OTC TiO2/talc Avoid.
//
// TALLY (unverified drafts): 10 rows — Clean 1 / Caution 0 / Avoid 9.
// Independently Clean in THIS batch: T5 TopCare L612 loratadine only.
// Allergy Avoid rows point at this in-batch L612 + batch 5 Claritin /
// Equate L612. Pain Avoid rows point at batch 1 Clean APAP (Genexa ES
// / CVS 44-175) and the Caution dye-free IBU analog (no Clean IBU).
// Dual-action points at those single-active analogs, not a 250/125
// replacement. Mucus DM points at batch 3 ColdCalm (labeled form swap,
// not a 12-hour expectorant replacement). Esomeprazole points at
// batch 10 Phillips Original MOM / AcidCalm (no Clean PPI here).
//
// SKIPPED (founder FLAG / slice / out of set — do not invent / do
// not write):
// - T9 TopCare sleep DPH — FLAG skip
// - T11 vitamins / kids multi — FLAG skip
// - Safeway non–Signature Care — SKIP entirely
// - Signature Care / Open Nature
// - FLAG / unknown coat rows
// - Slice 2 eye/ear
// - Slice 3 oils
// - iHerb / Fullscript / Amazon-only / Dollar Tree

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const PAIN_FEVER = 'Pain & Fever';
const ALLERGY = 'Allergy';
const COLD_FLU = 'Cold & Flu';
const DIGESTIVE = 'Digestive';
const SAVE_MART = ['Save Mart'] as const;

const L612_FORMULA = 'loratadine-l612-plain';
const COATED_CETIRIZINE = 'store-cetirizine-coated-blue1-tio2';
const LORATADINE_D_TIO2 = 'equate-loratadine-d-tio2';
const MUCUS_DM_YELLOW10 = 'upup-mucus-dm-er-yellow10';
const IBU_KIRKLAND_IB = 'ibu-kirkland-ib-caplets';

const TOPCARE_LORATADINE_ID = 'topcare-allergy-relief-loratadine';
const GENEXA_ES = 'genexa-acetaminophen-es';
const CVS_ES_CASTOR = 'cvs-health-es-castor';
const EQUATE_DYE_FREE_IBU = 'equate-ibuprofen-dye-free';
const CLARITIN_PLAIN = 'claritin-allergy-tablets-plain';
const EQUATE_LORATADINE = 'equate-loratadine-tablets-plain';
const COLDCALM = 'coldcalm-meltaways';
const PHILLIPS_MOM = 'phillips-mom-original';
const ACIDCALM = 'boiron-acidcalm';

const SET_T2_SOFTGELS = '8cc2c735-9bf7-48a7-bb56-a152287782b6';
const SET_T1_TABLETS = '6aca88df-d3b5-4a60-b23b-1e66dc41ee7b';
const SET_T3A_LIQUIGELS = '0a24c758-fa11-4d9b-a8ee-eb059fe1fa5b';
const SET_T3B_CAPLETS = '479a0c97-dbd9-47ad-9910-9dd4edf5136f';
const SET_T4_DUAL = 'dddc04c4-d500-4d42-8406-89f27a9ad651';
const SET_T5_L612 = 'a500aebf-a020-4da9-afdb-a699077cb8e1';
const SET_T6_LORATADINE_D = 'dd93d172-2a3a-4e4c-a237-7668acbd537d';
const SET_T7_CETIRIZINE = 'f2919aad-9ed4-40b8-b233-4aec06df33ea';
const SET_T8_MUCUS_DM = 'c12c68c3-c1bf-45dd-a311-fe1005189ec1';
const SET_T10_ESOMEPRAZOLE = '86384845-0bea-490b-b04a-5770ef88b639';

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  lecithin: 'Methodology §5 Cleared (lecithin, soy or sunflower — locked v1.6)',
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

const APAP_500_ALTS: CleanAlternative[] = [
  {
    productId: GENEXA_ES,
    rankReason:
      'Closest independently Clean adult acetaminophen 500 mg analog (batch 1 Genexa Extra Strength; founder-exception Clean). Form: caplet vs this TopCare form — labeled, not a hard filter (§6).',
  },
  {
    productId: CVS_ES_CASTOR,
    rankReason:
      'Independently Clean adult acetaminophen 500 mg (batch 1 CVS Health LNK 44-175 castor-oil coat). Form: film-coated tablet — labeled, not a hard filter (§6).',
  },
];

function ibuAlts(): CleanAlternative[] {
  return [
    {
      productId: EQUATE_DYE_FREE_IBU,
      rankReason:
        'Best Caution adult ibuprofen analog (batch 1 dye-free LNK 44-438). No independently Clean adult ibuprofen exists in the drafted batches. Form: film-coated tablet — labeled, not a hard filter (§6).',
    },
    {
      productId: GENEXA_ES,
      rankReason:
        'Independently Clean adult acetaminophen analog if a non-IBU swap is acceptable. Form: caplet — labeled, not a hard filter (§6).',
    },
  ];
}

const DUAL_ACTION_ALTS: CleanAlternative[] = [
  {
    productId: EQUATE_DYE_FREE_IBU,
    rankReason:
      'Best Caution ibuprofen analog — no Clean dual-action combo exists in the drafted batches. Form: film-coated tablet vs 250/125 combo — labeled, not a hard filter (§6); not a 250/125 replacement.',
  },
  {
    productId: GENEXA_ES,
    rankReason:
      'Clean acetaminophen analog for the APAP half of the combo (batch 1). Form: caplet — labeled, not a hard filter (§6).',
  },
];

const ALLERGY_ALTS: CleanAlternative[] = [
  {
    productId: TOPCARE_LORATADINE_ID,
    rankReason:
      'Independently Clean in-batch TopCare plain loratadine (same `loratadine-l612-plain` family). Same-store Save Mart analog. Form: tablet — labeled, not a hard filter (§6).',
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
    productId: COLDCALM,
    rankReason:
      'No independently Clean guaifenesin / DM expectorant exists in this draft set. Closest independently Clean adult Cold & Flu analog is batch 3 ColdCalm meltaways. Form: meltaway tablet vs 12-hour ER — labeled, not a hard filter (§6); not an expectorant replacement.',
  },
];

const ACID_REDUCER_ALTS: CleanAlternative[] = [
  {
    productId: PHILLIPS_MOM,
    rankReason:
      'No independently Clean PPI / acid-reducer exists in the drafted batches. Closest independently Clean adult Digestive analog is batch 10 Phillips Original Milk of Magnesia (magnesium hydroxide liquid). Form: liquid vs delayed-release capsule — labeled, not a hard filter (§6); different active; cleanliness peer only.',
  },
  {
    productId: ACIDCALM,
    rankReason:
      'Independently Clean adult Digestive analog (batch 10 Boiron AcidCalm, homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  },
];

const SAVE_MART_NOTE =
  'Graded for the Save Mart shelf only (retailers: Save Mart). TopCare is a Topco house brand; Lucky / FoodMaxx presence is not confirmed for this exact SKU and is not invented.';

export const BATCH21_TOPCARE_SAVE_MART: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: TOPCARE_LORATADINE_ID,
    productName: 'TopCare Allergy Relief (Loratadine 10 mg)',
    brand: 'TopCare',
    category: ALLERGY,
    barcode: '036800339811',
    formulaId: L612_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared(SET_T5_L612, 'Lactose monohydrate'),
      cleared(SET_T5_L612, 'Magnesium stearate'),
      cleared(SET_T5_L612, 'Povidone'),
      cleared(SET_T5_L612, 'Pregelatinized starch'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: TopCare Allergy Relief loratadine 10 mg = Clean only if L612 match — confirmed. Reuses `loratadine-l612-plain` (same L612 family as Equate / Kirkland AllerClear / Member\'s Mark / up&up). DailyMed setid a500aebf (NDC 36800-612; imprint L612). Drug Facts inactive list: lactose monohydrate, magnesium stearate, povidone, pregelatinized starch. No TiO2 / dye. Contains lactose. Ages 6+ (under 6: ask a doctor). This is not a coated / -D SKU. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    sourcesGeneral: [
      `DailyMed setid ${SET_T5_L612} (L612 plain loratadine; draft, not verified)`,
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'topcare-es-pain-relief-softgels',
    productName: 'TopCare Extra Strength Pain Relief (Acetaminophen 500 mg Softgels)',
    brand: 'TopCare',
    category: PAIN_FEVER,
    barcode: '036800423244',
    formulaId: 'apap-topcare-es-softgels-red40-y6',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '500mg' }],
    inactiveIngredients: [
      flag('FD&C Red No. 40', 'high', dailymed(SET_T2_SOFTGELS, METH.dyes)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET_T2_SOFTGELS, METH.dyes)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_T2_SOFTGELS, METH.peg),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed(SET_T2_SOFTGELS, METH.pg),
      ),
      flag('Sorbitol', 'limited', dailymed(SET_T2_SOFTGELS, METH.sorbitol)),
      cleared(SET_T2_SOFTGELS, 'Gelatin'),
      cleared(SET_T2_SOFTGELS, 'Glycerin'),
      cleared(SET_T2_SOFTGELS, 'Povidone'),
      cleared(SET_T2_SOFTGELS, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Extra Strength Pain Relief APAP 500 softgels = Avoid (dyes). New formulaId `apap-topcare-es-softgels-red40-y6` — do not reuse `apap-tylenol-es-liquid-gels` (that Tylenol family flags titanium dioxide; this TopCare SPL does not list TiO2). DailyMed setid 8cc2c735 (NDC 36800-414; imprint PC24). Drug Facts: FD&C red #40, FD&C yellow #6, gelatin, glycerin, polyethylene glycol, povidone, propylene glycol, purified water, sorbitol special, and white edible ink. High drivers are Red #40 + Yellow #6. White edible ink is ungraded appearance ink (not the Avoid driver). Stay under 4 g/day acetaminophen. Ages 12+. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_T2_SOFTGELS} (TopCare ES APAP 500 softgels NDC 36800-414; draft, not verified) — not apap-tylenol-es-liquid-gels`,
    ],
  },
  {
    id: 'topcare-es-pain-relief-tablets',
    productName:
      'TopCare Extra Strength Pain Relief (Acetaminophen 500 mg Film-Coated Tablets)',
    brand: 'TopCare',
    category: PAIN_FEVER,
    barcode: '036800115859',
    formulaId: 'apap-topcare-es-red40-tio2-talc',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '500mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed(SET_T1_TABLETS, METH.dyes),
      ),
      flag('Titanium dioxide', 'high', dailymed(SET_T1_TABLETS, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_T1_TABLETS, METH.talc)),
      flag('Sucralose', 'moderate', dailymed(SET_T1_TABLETS, METH.sucralose)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_T1_TABLETS, METH.peg),
      ),
      cleared(SET_T1_TABLETS, 'Corn starch'),
      cleared(SET_T1_TABLETS, 'Povidone'),
      cleared(SET_T1_TABLETS, 'Pregelatinized starch'),
      cleared(SET_T1_TABLETS, 'Sodium starch glycolate'),
      cleared(SET_T1_TABLETS, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Extra Strength Pain Relief APAP 500 film-coated tablets = Avoid (dyed + TiO2). New formulaId `apap-topcare-es-red40-tio2-talc` — not L484 / PEG-only (`apap-store-es-l484-peg`) and not a close enough twin of `apap-cvs-es-red40-tio2` (that CVS coat is Red 40 lake + TiO2 + sucralose without talc). DailyMed setid 6aca88df (NDC 36800-973; imprint L31G). Drug Facts: corn starch*, FD&C red #40 aluminum lake, polyethylene glycol, polyvinyl alcohol, povidone, pregelatinized starch, sodium starch glycolate*, stearic acid, sucralose, talc, titanium dioxide (*may contain). High drivers are Red 40 lake + TiO2 + talc. Polyvinyl alcohol is not in Methodology §5 (ungraded; not the Avoid driver). Stay under 4 g/day acetaminophen. Ages 12+. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_T1_TABLETS} (TopCare ES APAP 500 film-coated NDC 36800-973 L31G; draft, not verified) — not apap-store-es-l484-peg / not apap-cvs-es-red40-tio2`,
    ],
  },
  {
    id: 'topcare-ibuprofen-liquid-gels',
    productName: 'TopCare Ibuprofen Liquid Gels / Minis (200 mg)',
    brand: 'TopCare',
    category: PAIN_FEVER,
    formulaId: 'ibu-topcare-liqui-gels-green3-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Green No. 3',
        'high',
        dailymed(SET_T3A_LIQUIGELS, METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed(SET_T3A_LIQUIGELS, METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_T3A_LIQUIGELS, METH.peg),
      ),
      flag(
        'Macrogol / PEG 400',
        'moderate',
        dailymed(SET_T3A_LIQUIGELS, METH.peg),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed(SET_T3A_LIQUIGELS, METH.pg),
      ),
      flag('Sorbitol', 'limited', dailymed(SET_T3A_LIQUIGELS, METH.sorbitol)),
      flag(
        'Lecithin',
        'cleared',
        dailymed(
          SET_T3A_LIQUIGELS,
          `${METH.lecithin} — soy-allergy disclosure, not a toxicity flag`,
        ),
      ),
      cleared(SET_T3A_LIQUIGELS, 'Gelatin'),
      cleared(SET_T3A_LIQUIGELS, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Ibuprofen liquid gels / minis = Avoid. New formulaId `ibu-topcare-liqui-gels-green3-tio2` — do not reuse `ibu-advil-liqui-gels` (Advil liquigel family flags Green #3 + PEG; this TopCare Drug Facts list also has titanium dioxide). DailyMed setid 0a24c758 (NDC 36800-705; Advil Liqui-Gels minis compare). Drug Facts: ammonium hydroxide, caprylic and capric acid triglycerides, FD&C green No. 3, gelatin, isopropyl alcohol, lecithin, macrogol/PEG 400, polyethylene glycol, polyvinyl acetate phthalate, potassium hydroxide, propylene glycol, purified water, sorbitol sorbitan solution, titanium dioxide. High drivers are Green #3 + TiO2. Medium-chain triglycerides / polyvinyl acetate phthalate / ink solvents are not in Methodology §5 (ungraded; not the Avoid drivers). Gel Avoid rows stay. Ages 12+. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      `DailyMed setid ${SET_T3A_LIQUIGELS} (TopCare IBU liquid gels / minis NDC 36800-705; draft, not verified) — not ibu-advil-liqui-gels`,
    ],
  },
  {
    id: 'topcare-ibuprofen-caplets',
    productName: 'TopCare Ibuprofen 200 mg Caplets (film-coated)',
    brand: 'TopCare',
    category: PAIN_FEVER,
    barcode: '036800301030',
    formulaId: IBU_KIRKLAND_IB,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed(SET_T3B_CAPLETS, METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET_T3B_CAPLETS, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET_T3B_CAPLETS, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET_T3B_CAPLETS, METH.tio2)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_T3B_CAPLETS, METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_T3B_CAPLETS, METH.sio2),
      ),
      cleared(SET_T3B_CAPLETS, 'Corn starch'),
      cleared(SET_T3B_CAPLETS, 'Croscarmellose sodium'),
      cleared(SET_T3B_CAPLETS, 'Microcrystalline cellulose'),
      cleared(SET_T3B_CAPLETS, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Ibuprofen film-coated tablets = Avoid. One representative high-conf SPL: DailyMed setid 479a0c97 (NDC 36800-517; Motrin IB compare; imprint I2). Reuses `ibu-kirkland-ib-caplets` — same High-tier store twin (Red 40 lake + Yellow 6 lake + talc + TiO2). Drug Facts: colloidal silicon dioxide, corn starch, croscarmellose sodium, FD&C red no. 40 aluminum lake, FD&C yellow no. 6 aluminum lake, iron oxides, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, stearic acid, talc, titanium dioxide. Iron oxides and polyvinyl alcohol are not in Methodology §5 (ungraded; not the Avoid drivers). A separate TopCare tablet SPL (setid 66097f19, NDC 36800-604; Advil-compare brown I2 tablet) is TiO2 + iron oxides without dye lakes / talc — same Avoid family, different formula, not this row; do not merge into `ibu-equate-standard`. Ages 12+. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      `DailyMed setid ${SET_T3B_CAPLETS} (TopCare IBU 200 mg dyed/talc/TiO2 caplets NDC 36800-517; draft, not verified)`,
      'DailyMed setid 66097f19-227c-4f9c-a7f3-ab8476e1bb6e (TopCare IBU 200 mg TiO2 tablet twin NDC 36800-604 — same Avoid family, not this row)',
    ],
  },
  {
    id: 'topcare-dual-action',
    productName:
      'TopCare Dual Action (Acetaminophen 250 mg / Ibuprofen 125 mg)',
    brand: 'TopCare',
    category: PAIN_FEVER,
    formulaId: 'apap-ibu-topcare-dual-action-tio2-talc',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_T4_DUAL, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_T4_DUAL, METH.talc)),
      flag('Sucralose', 'moderate', dailymed(SET_T4_DUAL, METH.sucralose)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_T4_DUAL, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_T4_DUAL, METH.sio2),
      ),
      cleared(SET_T4_DUAL, 'Corn starch'),
      cleared(SET_T4_DUAL, 'Croscarmellose sodium'),
      cleared(SET_T4_DUAL, 'Crospovidone'),
      cleared(SET_T4_DUAL, 'Microcrystalline cellulose'),
      cleared(SET_T4_DUAL, 'Povidone'),
      cleared(SET_T4_DUAL, 'Pregelatinized starch'),
      cleared(SET_T4_DUAL, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Dual Action = Avoid (high-tier inactives confirmed). New formulaId `apap-ibu-topcare-dual-action-tio2-talc` — do not reuse `apap-ibu-advil-dual-action` (Advil dual-action row is TiO2 only; this SPL also has talc). DailyMed setid dddc04c4 (NDC 76162-501 — still TopCare Dual Action on the label; Advil Dual Action compare; imprint I;I). Drug Facts: colloidal silicon dioxide, corn starch, croscarmellose sodium, crospovidone, ferric oxide yellow, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, povidone, pregelatinized starch, stearic acid, sucralose, talc, titanium dioxide. High drivers are TiO2 + talc. Ferric oxide yellow and polyvinyl alcohol are not in Methodology §5 (ungraded; not the Avoid drivers). Dual-action Avoid rows stay — listed swaps are single-active analogs, not a 250/125 replacement. Stay under 4 g/day acetaminophen. Ages 12+. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: DUAL_ACTION_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_T4_DUAL} (TopCare Dual Action NDC 76162-501; draft, not verified) — not apap-ibu-advil-dual-action`,
    ],
  },
  {
    id: 'topcare-allergy-congestion-loratadine-d',
    productName:
      'TopCare Allergy & Congestion Relief (Loratadine 5 mg / Pseudoephedrine 120 mg)',
    brand: 'TopCare',
    category: ALLERGY,
    barcode: '036800461246',
    formulaId: LORATADINE_D_TIO2,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Loratadine', strength: '5mg' },
      { name: 'Pseudoephedrine sulfate', strength: '120mg' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed(SET_T6_LORATADINE_D, METH.tio2),
      ),
      cleared(SET_T6_LORATADINE_D, 'Croscarmellose sodium'),
      cleared(SET_T6_LORATADINE_D, 'Dibasic calcium phosphate'),
      cleared(SET_T6_LORATADINE_D, 'Hypromellose'),
      cleared(SET_T6_LORATADINE_D, 'Lactose monohydrate'),
      cleared(SET_T6_LORATADINE_D, 'Magnesium stearate'),
      cleared(SET_T6_LORATADINE_D, 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Allergy & Congestion Relief (loratadine-D) = Avoid. Reuses `equate-loratadine-d-tio2` — same 5/120 TiO2 family as Equate / Claritin-D 12 Hour (no dye lakes on this SPL). DailyMed setid dd93d172 (NDC 36800-611; imprint 7U0). Drug Facts: croscarmellose sodium, dibasic calcium phosphate, hypromellose, lactose monohydrate, magnesium stearate, pharmaceutical ink, povidone, titanium dioxide. High driver is TiO2. Pharmaceutical ink is ungraded appearance ink (not the Avoid driver). Contains lactose. Ages 12+ (under 12: ask a doctor). Swallow whole — do not divide, crush, chew, or dissolve. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_T6_LORATADINE_D} (TopCare loratadine-D 5/120 NDC 36800-611; draft, not verified)`,
    ],
  },
  {
    id: 'topcare-all-day-allergy-cetirizine',
    productName: 'TopCare All Day Allergy (Cetirizine 10 mg)',
    brand: 'TopCare',
    category: ALLERGY,
    barcode: '036800327269',
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
        dailymed(SET_T7_CETIRIZINE, METH.tio2),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_T7_CETIRIZINE, METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_T7_CETIRIZINE, METH.peg),
      ),
      cleared(SET_T7_CETIRIZINE, 'Corn starch'),
      cleared(SET_T7_CETIRIZINE, 'Hypromellose'),
      cleared(SET_T7_CETIRIZINE, 'Lactose monohydrate'),
      cleared(SET_T7_CETIRIZINE, 'Magnesium stearate'),
      cleared(SET_T7_CETIRIZINE, 'Polydextrose'),
      cleared(SET_T7_CETIRIZINE, 'Povidone'),
      cleared(SET_T7_CETIRIZINE, 'Triacetin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare All Day Allergy cetirizine 10 mg = Avoid. MUST reuse `store-cetirizine-coated-blue1-tio2` — same Blue #1 lake + TiO2 coat family as Equate / Member\'s Mark / CVS / Kirkland Aller-Tec (batch 5 / batch 20). DailyMed setid f2919aad (NDC 36800-458; imprint 4H2). Drug Facts: corn starch, FD&C blue no. 1 aluminum lake, hypromellose, lactose monohydrate, magnesium stearate, polydextrose, polyethylene glycol, povidone, titanium dioxide, triacetin. High drivers are TiO2 + Blue #1 lake. Polydextrose and triacetin are not independently graded in Methodology §5 (ungraded; v1.6 intake; not the Avoid drivers). Contains lactose. Ages 6+. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_T7_CETIRIZINE} (TopCare cetirizine 10 mg NDC 36800-458; draft, not verified)`,
    ],
  },
  {
    id: 'topcare-mucus-dm-er',
    productName: 'TopCare Mucus DM (Guaifenesin 600 mg / Dextromethorphan 30 mg ER)',
    brand: 'TopCare',
    category: COLD_FLU,
    barcode: '036800498129',
    formulaId: MUCUS_DM_YELLOW10,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Guaifenesin', strength: '600mg' },
      { name: 'Dextromethorphan HBr', strength: '30mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET_T8_MUCUS_DM, METH.dyes),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET_T8_MUCUS_DM, METH.sio2),
      ),
      cleared(SET_T8_MUCUS_DM, 'Carbomer homopolymer type B'),
      cleared(SET_T8_MUCUS_DM, 'Copovidone'),
      cleared(SET_T8_MUCUS_DM, 'Hypromellose'),
      cleared(SET_T8_MUCUS_DM, 'Magnesium hydroxide'),
      cleared(SET_T8_MUCUS_DM, 'Magnesium stearate'),
      cleared(SET_T8_MUCUS_DM, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Mucus DM ER = Avoid (lakes = Avoid). Reuses `upup-mucus-dm-er-yellow10` — same Yellow #10 lake family and 600/30 strength as Target up&up / Mucinex DM (batch 3). DailyMed setid c12c68c3 (NDC 36800-219; imprint L219;600). Drug Facts: carbomer homopolymer type B, copovidone, D&C yellow #10 aluminum lake, hypromellose, magnesium hydroxide, magnesium stearate, microcrystalline cellulose, silicon dioxide. Yellow #10 lake is High-tier Avoid. Silicon dioxide is the nanoparticle Caution cap (not needed to reach Avoid). Do not silently merge into batch 20 `kirkland-mucus-dm-max-er` (that club row is 1200/60). Ages 12+ (under 12: do not use). Swallow whole with water — do not crush, chew, or break. ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_T8_MUCUS_DM} (TopCare Mucus DM 600/30 NDC 36800-219; draft, not verified)`,
    ],
  },
  {
    id: 'topcare-esomeprazole-20',
    productName:
      'TopCare Esomeprazole Magnesium 20 mg Delayed-Release Capsules',
    brand: 'TopCare',
    category: DIGESTIVE,
    barcode: '036800464414',
    formulaId: 'topcare-esomeprazole-20-dyes-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'delayed-release capsule',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Esomeprazole magnesium', strength: '20mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed(SET_T10_ESOMEPRAZOLE, METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_T10_ESOMEPRAZOLE, METH.dyes),
      ),
      flag(
        'FD&C Red No. 3',
        'high',
        dailymed(SET_T10_ESOMEPRAZOLE, METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed(SET_T10_ESOMEPRAZOLE, METH.tio2),
      ),
      flag('Talc', 'high', dailymed(SET_T10_ESOMEPRAZOLE, METH.talc)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_T10_ESOMEPRAZOLE, METH.peg),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed(SET_T10_ESOMEPRAZOLE, METH.ps80),
      ),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET_T10_ESOMEPRAZOLE, METH.sls),
      ),
      cleared(SET_T10_ESOMEPRAZOLE, 'Gelatin'),
      cleared(SET_T10_ESOMEPRAZOLE, 'Hypromellose'),
      cleared(SET_T10_ESOMEPRAZOLE, 'Magnesium stearate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: TopCare Esomeprazole Magnesium 20 mg delayed-release capsules = Avoid. New formulaId `topcare-esomeprazole-20-dyes-tio2` — different active from Prilosec OTC (omeprazole); do not reuse `prilosec-otc`. DailyMed setid 86384845 (NDC 36800-627; Nexium 24HR ClearMinis compare; imprint 7U4). Drug Facts: FD&C blue no. 1, FD&C blue no. 1 aluminum lake, FD&C red no. 3, ferric oxide, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, methacrylic acid and ethyl acrylate copolymer dispersion, polyethylene glycol, polysorbate 80, shellac, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate. High drivers are Blue #1 (+ lake) + Red #3 + TiO2 + talc — same High-tier Avoid pattern as batch 10 Prilosec OTC (TiO2 / talc). SLS is standalone Caution (irritant class, not additive-scored) and is not the Avoid driver. Ferric oxide, meglumine, methacrylic copolymer, shellac, sugar spheres, glyceryl monostearate, and triethyl citrate are delayed-release / capsule housekeeping and are not in Methodology §5 (ungraded; not the Avoid drivers). Nexium 24HR / Prevacid OTC remain skipped. Labeled 18+ (children under 18: ask a doctor). ' +
      SAVE_MART_NOTE,
    retailers: [...SAVE_MART],
    cleanAlternatives: ACID_REDUCER_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_T10_ESOMEPRAZOLE} (TopCare esomeprazole 20 mg NDC 36800-627; draft, not verified) — not prilosec-otc`,
    ],
  },
];

// Verdict tally (10 records): Clean 1 · Caution 0 · Avoid 9
// Reused formulaIds: 5 (loratadine-l612-plain, equate-loratadine-d-tio2,
// store-cetirizine-coated-blue1-tio2, upup-mucus-dm-er-yellow10,
// ibu-kirkland-ib-caplets)
// New formulaIds: 5 (apap-topcare-es-softgels-red40-y6,
// apap-topcare-es-red40-tio2-talc, ibu-topcare-liqui-gels-green3-tio2,
// apap-ibu-topcare-dual-action-tio2-talc, topcare-esomeprazole-20-dyes-tio2)
