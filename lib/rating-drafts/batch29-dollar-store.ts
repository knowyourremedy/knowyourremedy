// DRAFT / not verified / batch 29 dollar-store house brands /
// Assured + DG Health / Rexall + Family Wellness / founder calls
// locked / methodology untouched.
//
// Brick-and-mortar dollar SKUs only. Brand names: Assured (Dollar
// Tree), DG Health + Rexall (Dollar General), Family Wellness
// (Family Dollar). Mixed OTC categories · audience adult except
// three kids rows · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Methodology v1.6 grades
// only — do not change locked ingredient grades. Do NOT invent
// Clean. Do NOT write FLAG / skipped products. Do NOT invent
// UPCs / barcodes. Barcodes omitted — NDCs / setIds appear in
// cites / notes only. Pack sizes share formulaId. Form is labeled
// on cleanAlternatives, not a hard filter (§6). Not wired into
// Clean Picks UI. No live Clean Picks file is edited from this
// draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// CATEGORY (existing RatingRecord strings only): Allergy (incl.
// nasal + redness eye, same aisle home as batch 21 / 22), Pain &
// Fever, Cold & Flu, Digestive, First Aid, Sleep.
//
// REUSE (do not regrade / do not invent new grades):
// - R1 DG Health Allergy Relief loratadine 10 mg MUST reuse
//   `loratadine-l612-plain` (same L612 family as Equate / Kirkland /
//   Member's Mark / TopCare / up&up).
// - R2 DG Health All Day Allergy cetirizine MUST reuse
//   `store-cetirizine-coated-blue1-tio2`.
// - R3 Rexall All Day Allergy Relief cetirizine MUST reuse
//   `store-cetirizine-coated-blue1-tio2`.
// - R4 Family Wellness Extra Strength APAP 500 MUST reuse
//   `apap-store-es-l484-peg` (oral PEG Caution).
// - R5 Rexall Pain Relief APAP MUST reuse `apap-store-es-l484-peg`.
// - R6 DG Health Mucus-ER guaifenesin ER MUST reuse
//   `equate-mucus-er-600-blue1` (Blue #1 lake mucus-ER family).
// - R7 DG Health Mucus-DM ER MUST reuse
//   `upup-mucus-dm-er-yellow10` (Yellow #10 lake 600/30 family).
// - R8 DG Health Allergy Relief Nasal fluticasone MUST reuse
//   `equate-fluticasone-bkc-ps80` (BKC + PS80).
// - R9 Family Wellness Triple Antibiotic + Pain ointment MUST
//   reuse `neosporin-plus-pain-ointment` (petrolatum-only twin;
//   same four actives as batch 12 Neosporin Plus Pain).
// - R10 DG Health loratadine ODT MUST reuse
//   `loratadine-mint-odt-sucralose`.
// - A9 Family Wellness cetirizine coated (TiO2, no Blue #1)
//   reuses `zyrtec-allergy-tablets-tio2` (same TiO2 / PEG / SiO2
//   coat family as Zyrtec tablets).
// - A16 DG Health Sleep Aid doxylamine reuses
//   `upup-doxylamine-sleeptabs` (Blue #1 lake + anhydrous /
//   dihydrate calcium-phosphate pair).
// - A20 DG Health Children’s loratadine chewable reuses
//   `claritin-chewable-aspartame-dye` (aspartame + Red 27 + Blue 2
//   grape chew family).
//
// NEW formulaIds (do not merge):
// - C1 Family Wellness loratadine 10 — lactose / Mg stearate /
//   MCC / SSG corn; NO povidone. Not L612. Not 365-loratadine-plain-ssg
//   (that 365 row has pregelatinized starch, no MCC).
// - C3 Family Wellness dual / plain triple Abx — petrolatum +
//   mineral oil (confirmed). Shared new formulaId. Not the
//   petrolatum-only Plus Pain twin (R9). Not 69396-041 (squalane /
//   cetyl extras — skipped). Not 69396-054 oil-blend / sodium
//   pyruvate (skipped).
// - K1 Assured Advanced Relief Eye — BKC; new formulaId===id.
// - Avoid staples below (High-tier dyes / TiO2 / parabens / BHT /
//   aspartame / talc).
//
// FOUNDER CALLS (LOCKED) — brick-and-mortar dollar SKUs only:
// CLEAN
// - R1 DG Health loratadine 10 mg = Clean. Reuse L612.
// - R9 Family Wellness Triple + Pain ointment = Clean.
//   Petrolatum only on setid 9e52c8f2.
// - C1 Family Wellness All Day Allergy Relief loratadine 10 =
//   Clean. New formulaId `family-wellness-loratadine-10`.
// - C3 Family Wellness dual Abx (69396-037) + plain triple
//   (69571-003) = Clean. Actives + petrolatum ± mineral oil
//   confirmed. Shared formulaId
//   `family-wellness-abx-petrolatum-mineral-oil`.
// CAUTION
// - R4 / R5 L484-family APAP = Caution (oral PEG).
// - R8 DG fluticasone = Caution (BKC + PS80). Phenylethyl alcohol
//   ∉ §5 notes-only.
// - R10 DG loratadine ODT = Caution (sucralose Moderate +
//   mannitol Limited; founder lock, not a 3-pt Avoid stack).
// - K1 Assured Advanced Relief Eye = Caution (BKC). PEG 400 is a
//   lubricant ACTIVE on this SPL — not an oral PEG Moderate
//   demerit. Redness-reliever rebound is a use note, not a new
//   active-safety grade.
// AVOID
// - R2 / R3 coated cetirizine = Avoid (Blue #1 + TiO2).
// - R6 Mucus-ER = Avoid (Blue #1 lake).
// - R7 Mucus-DM ER = Avoid (Yellow #10 lake). Copovidone ∉ §5
//   notes-only (Avoid already stands on dye).
// - A1 Assured Ibuprofen 200 film-coated = Avoid (TiO2 + talc).
// - A3 Assured Headache PM = Avoid (Blue #1 / #2 + TiO2).
// - A5 Assured Gas Relief ES softgels = Avoid (Yellow #10 +
//   Blue #1 + TiO2).
// - A6 Assured Hydrocortisone cream = Avoid (methylparaben +
//   ethylparaben).
// - A7 Assured Lidocaine pain gel = Avoid (parabens + TiO2).
// - A9 FW cetirizine coated = Avoid (TiO2; no Blue #1 on this SPL).
// - A10 FW Children’s APAP suspension = Avoid (butylparaben +
//   propylparaben + sucralose + oral PG). Kids.
// - A11 FW Max Strength 1% HC = Avoid (methylparaben +
//   propylparaben).
// - A12 DG Health Ibuprofen coated = Avoid (TiO2). Representative
//   setid fd27d4e1 (iron-oxide coat; no dye lakes). Dyed + talc
//   twin b514b589 is the same Avoid aisle, not a second row.
// - A13 DG Health Ibuprofen liquid gels = Avoid (Green #3 + TiO2).
//   MCT ∉ §5 notes-only.
// - A14 DG Health Pain Relief APAP dyed lakes = Avoid (Red 40
//   lake + Yellow 6 lake). No TiO2 on this SPL.
// - A15 DG Health Pain Relief PM + Sleep Aid DPH = Avoid
//   (Blue #1 / #2 + TiO2). Two rows.
// - A16 DG Health Sleep Aid doxylamine = Avoid (Blue #1 lake).
// - A17 DG Health Cold & Flu day softgels + night liquid = Avoid
//   (dyes ± saccharin / PEG / PG). Two representative rows.
//   Day/night kit ddcc1e78 collapsed — not a third grade.
// - A18 DG Health Hydrocortisone 1% cream = Avoid (BHT).
//   Diazolidinyl urea parked (formaldehyde-releaser).
// - A19 DG Health Omeprazole DR = Avoid (TiO2 + talc).
// - A20 DG Health Children’s loratadine chewable = Avoid
//   (aspartame + dyes). Kids.
// - A21 DG Health Infants’ Ibuprofen = Avoid (Red 40). Kids.
//
// TALLY (unverified drafts): 34 rows — Clean 5 / Caution 5 / Avoid 24.
// Independently Clean in THIS batch: R1 DG L612 loratadine; C1 FW
// loratadine; R9 FW Triple + Pain (petrolatum); C3 dual / plain
// triple (petrolatum + mineral oil). No independently Clean kids
// row in this batch. No Clean house IBU. No Clean Mucus-ER Max.
//
// FLAG / SKIP (do not write rows):
// - Assured loratadine (expired NDC 33992-0612)
// - Assured cetirizine / ES APAP with no live DailyMed
// - DG Mucus-ER Max (FLAG until NDC 55910-626-74 shelf confirm)
// - DG / FW guaifenesin IR (copovidone ungraded)
// - DG Triple Abx oil-blend (sodium pyruvate ungraded)
// - FW Triple Original 69396-041 (squalane / cetyl extras — not
//   petrolatum ± mineral oil)
// - FW Pain Scar Itch 69396-054 (oil-blend + sodium pyruvate)
// - ValuHealth · Amazon-only · graded oils · B-Alive
// - Assured menthol patches (ungraded stacks)
// - invented Clean kids APAP / IBU / loratadine
// - invented Clean house IBU
//
// ZINC / ACTIVES ARE PARKED (Methodology v1.6): grade inactives
// only. No invented active-safety grades. Silicon dioxide / silica
// = Caution cap, not Avoid alone. BKC = Caution (not Avoid). No
// dosing. No medical advice. No "consult your doctor" prescriptions.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const ALLERGY = 'Allergy';
const PAIN_FEVER = 'Pain & Fever';
const COLD_FLU = 'Cold & Flu';
const DIGESTIVE = 'Digestive';
const FIRST_AID = 'First Aid';
const SLEEP = 'Sleep';

const L612_FORMULA = 'loratadine-l612-plain';
const COATED_CETIRIZINE = 'store-cetirizine-coated-blue1-tio2';
const L484_FORMULA = 'apap-store-es-l484-peg';
const MUCUS_ER_BLUE1 = 'equate-mucus-er-600-blue1';
const MUCUS_DM_YELLOW10 = 'upup-mucus-dm-er-yellow10';
const FLUTICASONE_BKC = 'equate-fluticasone-bkc-ps80';
const NEOSPORIN_PAIN_OINT = 'neosporin-plus-pain-ointment';
const MINT_ODT = 'loratadine-mint-odt-sucralose';
const ZYRTEC_TIO2 = 'zyrtec-allergy-tablets-tio2';
const UPUP_DOXYLAMINE = 'upup-doxylamine-sleeptabs';
const CLARITIN_CHEW = 'claritin-chewable-aspartame-dye';
const FW_LORATADINE_ID = 'family-wellness-loratadine-10';
const FW_ABX_MOI = 'family-wellness-abx-petrolatum-mineral-oil';
const DG_LORATADINE_ID = 'dg-health-loratadine-tablets';

const GENEXA_ES = 'genexa-acetaminophen-es';
const CVS_ES_CASTOR = 'cvs-health-es-castor';
const EQUATE_DYE_FREE_IBU = 'equate-ibuprofen-dye-free';
const CLARITIN_PLAIN = 'claritin-allergy-tablets-plain';
const EQUATE_LORATADINE = 'equate-loratadine-tablets-plain';
const COLDCALM = 'coldcalm-meltaways';
const PHILLIPS_MOM = 'phillips-mom-original';
const ACIDCALM = 'boiron-acidcalm';
const CALMS_FORTE = 'hylands-calms-forte';
const ALLERGYCALM = 'boiron-allergycalm-meltaways';
const GENEXA_KIDS_DPH = 'genexa-kids-allergy';
const GENEXA_KIDS_APAP = 'genexa-kids-apap-liquid';
const EQUATE_EYE_PF = 'equate-lubricant-eye-pf';
const REFRESH_TEARS_PF = 'refresh-tears-pf';
const EQUATE_TRIPLE_PAIN = 'equate-triple-antibiotic-pain-ointment';

const DT = ['Dollar Tree'] as const;
const DG = ['Dollar General'] as const;
const FD = ['Family Dollar'] as const;

const SET_R1 = 'dfc4b065-1980-48ec-9c3e-aaa4a42214d3';
const SET_R2 = 'b9ac489a-80ed-4077-b68e-d03df1b892a6';
const SET_R3 = '4d79fb74-1895-4efe-8016-c0dd5ed10f7a';
const SET_R4 = 'f8383108-0970-9f1e-e053-6294a90ad38f';
const SET_R5 = '9783cf37-3a2b-4ca1-b4eb-6d6ba047a325';
const SET_R6 = 'bf99fa83-c3be-4052-b5b6-ad91997cb034';
const SET_R7 = 'a95401cc-349e-435a-b953-4d8fd1f54744';
const SET_R8 = '5f0514bd-7893-4602-a17b-716fb9947572';
const SET_R9 = '9e52c8f2-da12-3472-e053-2995a90af3bb';
const SET_R10 = '04258018-3d57-46d7-9595-04786da3f51a';
const SET_R10B = 'c18c40ae-19c8-4699-842a-43a5c4c236d5';
const SET_C1 = '6b8d786e-2ee3-487f-bf7b-7dc738ea2fc9';
const SET_C3_DUAL = '9157681a-3ed1-096e-e053-2a95a90a05e3';
const SET_C3_TRIPLE = 'bd3b8146-6271-488d-bf79-0bb659123b31';
const SET_K1 = '593d1899-6c87-4366-9c1b-9f6933598b8a';
const SET_A1 = '5c65b691-b795-44a5-abb7-931cd772f1a1';
const SET_A3 = 'd9d22e45-1a13-4b45-910d-1183a8e6ed7d';
const SET_A5 = 'd5b412b4-9121-42e0-8c3f-413810ade6dd';
const SET_A6 = 'bc97f364-9443-47b8-9c2d-b5dcc00cc9b7';
const SET_A7 = 'bdbd4106-e4fe-4daf-a757-3aee3a87bb09';
const SET_A9 = 'b90b5ef2-5aa2-45ca-94b9-c9d9e5877e23';
const SET_A10 = '902c1136-04d2-41f0-81c6-412663cdf378';
const SET_A11 = 'bca5ac2c-45cd-44e3-98f1-317a04e44d7d';
const SET_A12 = 'fd27d4e1-8edf-4bc3-a593-6be5c3345ed0';
const SET_A12B = 'b514b589-d965-4a21-91b3-fab4019e9d96';
const SET_A13 = '1dd4ffc5-3132-419b-8e70-78a7bb71da62';
const SET_A14 = '42f0c87c-7020-4af7-9f6b-3a774137e564';
const SET_A15A = '4d1eddf0-eff7-4c47-b312-30dee08d9e5f';
const SET_A15B = '038c1b4e-43f5-4370-896b-97da1b0a89ca';
const SET_A16 = 'a4c6b400-7fa6-4ad1-9d39-d34621eb91a6';
const SET_A17A = 'ff4a2f0a-d638-4ed2-8e05-2a52afbc4909';
const SET_A17B = '3d8ce88e-9f40-4b58-a811-160ddbfb8112';
const SET_A18 = '3d298bd8-1433-46fc-baff-9b104b067f5d';
const SET_A19 = '326bf21c-fad4-473e-9e7f-797319d4353a';
const SET_A20 = '302fc570-bec9-43cb-8965-139576102cdd';
const SET_A21 = '9022e393-084e-499b-ac84-f35360d79592';

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  parabens: 'Methodology §5 High-tier (parabens)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B; locked Avoid, §0 override)',
  bht: 'Methodology §5 High-tier (BHT — locked Avoid, EU 2022 endocrine restriction)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  maltitol: 'Methodology §5 Limited-risk (sugar alcohols — maltitol)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  bkc:
    'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid)',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer — locked v1.6)',
  lecithin: 'Methodology §5 Cleared (lecithin, soy or sunflower — locked v1.6)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / tocopheryl acetate as antioxidants — locked v1.6)',
  ungraded:
    'Not in Methodology §5 — ungraded (v1.6 intake). Mentioned as present; not graded on the spot; not used to invent Clean or Avoid',
  pgTopical:
    'Propylene glycol is oral-scoped in Methodology §5 — not scored as Moderate on this topical label',
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

function ungraded(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.ungraded));
}

const APAP_500_ALTS: CleanAlternative[] = [
  {
    productId: GENEXA_ES,
    rankReason:
      'Closest independently Clean adult acetaminophen 500 mg analog (batch 1 Genexa Extra Strength; founder-exception Clean). Form: caplet vs this dollar-store form — labeled, not a hard filter (§6).',
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

const ALLERGY_ALTS: CleanAlternative[] = [
  {
    productId: DG_LORATADINE_ID,
    rankReason:
      'Independently Clean in-batch DG Health plain loratadine (same `loratadine-l612-plain` family). Dollar General analog. Form: tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: FW_LORATADINE_ID,
    rankReason:
      'Independently Clean in-batch Family Wellness plain loratadine (new MCC / SSG family, no povidone). Form: tablet.',
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

const NASAL_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'No independently Clean nasal steroid exists in the drafted batches. Closest independently Clean adult Allergy analog is batch 5 AllergyCalm meltaways. Form: meltaway tablet vs nasal spray — labeled, not a hard filter (§6).',
  },
  {
    productId: CLARITIN_PLAIN,
    rankReason:
      'Independently Clean adult oral loratadine (batch 5). Form: tablet vs nasal — labeled, not a hard filter (§6).',
  },
];

const COLD_ORAL_ALTS: CleanAlternative[] = [
  {
    productId: COLDCALM,
    rankReason:
      'No independently Clean guaifenesin / DM expectorant exists in this draft set. Closest independently Clean adult Cold & Flu analog is batch 3 ColdCalm meltaways. Form: meltaway tablet vs 12-hour ER / liquid / softgel — labeled, not a hard filter (§6); not an expectorant replacement.',
  },
];

const ACID_REDUCER_ALTS: CleanAlternative[] = [
  {
    productId: PHILLIPS_MOM,
    rankReason:
      'No independently Clean PPI / acid-reducer exists in the drafted batches. Closest independently Clean adult Digestive analog is batch 10 Phillips Original Milk of Magnesia. Form: liquid vs delayed-release tablet — labeled, not a hard filter (§6); different active; cleanliness peer only.',
  },
  {
    productId: ACIDCALM,
    rankReason:
      'Independently Clean adult Digestive analog (batch 10 Boiron AcidCalm, homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  },
];

const FIRST_AID_ALTS: CleanAlternative[] = [
  {
    productId: 'family-wellness-triple-antibiotic-pain',
    rankReason:
      'Independently Clean in-batch Family Wellness Triple + Pain ointment (petrolatum only; same `neosporin-plus-pain-ointment` family). Form: ointment — labeled, not a hard filter (§6).',
  },
  {
    productId: NEOSPORIN_PAIN_OINT,
    rankReason:
      'Independently Clean adult first-aid ointment (batch 12 Neosporin Plus Pain Relief, petrolatum only). Form: ointment.',
  },
  {
    productId: EQUATE_TRIPLE_PAIN,
    rankReason:
      'Independently Clean store-brand petrolatum-only Triple + Pain ointment (batch 12 Equate). Form: ointment.',
  },
];

const SLEEP_ALTS: CleanAlternative[] = [
  {
    productId: CALMS_FORTE,
    rankReason:
      'Independently Clean adult Sleep analog (batch 7 Hyland\'s Calms Forte, homeopathic tablets). Form: tablet — labeled, not a hard filter (§6). Conventional sedating-antihistamine sleep aids have no independently Clean match in the drafted batches.',
  },
];

const EYE_ALTS: CleanAlternative[] = [
  {
    productId: EQUATE_EYE_PF,
    rankReason:
      'Independently Clean PF lubricant (batch 22 Equate Lubricant Eye Drops Preservative-Free). Form: single-use eye drop — labeled, not a hard filter (§6). Dry-eye lubricant, not a redness-reliever replacement.',
  },
  {
    productId: REFRESH_TEARS_PF,
    rankReason:
      'Independently Clean PF lubricant (batch 22 Refresh Tears PF). Form: eye drops — labeled, not a hard filter (§6). Not a redness-reliever swap.',
  },
];

const KIDS_APAP_ALTS: CleanAlternative[] = [
  {
    productId: GENEXA_KIDS_APAP,
    rankReason:
      'Closest independently Clean kids acetaminophen liquid (batch 2 Genexa Kids, ages 2+). Form: liquid. Do not invent a Clean dollar-store kids APAP.',
  },
];

const KIDS_ALLERGY_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'Closest independently Clean kids oral analog that is age-matched for 2+ (batch 6 AllergyCalm meltaway, minAge 2). Form: meltaway tablet vs chewable — labeled, not a hard filter (§6). No independently Clean kids loratadine exists in the drafted batches.',
  },
  {
    productId: GENEXA_KIDS_DPH,
    rankReason:
      'Independently Clean kids conventional DPH liquid (batch 6 Genexa Kids\' Allergy, minAge 6 — higher than this 2+ chew; not an age-matched swap for ages 2–5). Form: liquid vs chewable — labeled, not a hard filter (§6).',
  },
];

const L484_NOTE =
  'LNK L484 extra-strength acetaminophen family — oral PEG is Moderate (2 pts) → Caution. These store brands share inactives and formulaId; pack sizes are not graded separately. Some of the same retailers also sell dyed / titanium-dioxide ES SKUs under similar names — confirm the L484 / PEG list on the bottle. Stay under 4 g/day acetaminophen. Ages 12+.';

const SEDATING =
  'Nighttime first-generation antihistamine — labeled drowsiness will occur; next-day drowsiness can linger. Cleanliness grade only; no efficacy claim.';

const PARKED_FORMALDEHYDE =
  'Diazolidinyl urea is a formaldehyde-releaser — parked / out-of-scope (Methodology §5). Notes only, not a demerit.';

const BATCH29_CATCHUP_BARCODES: Record<string, string> = {
  'dg-health-loratadine-odt': '370030169856',
  'dg-health-cetirizine-tablets': '370030116669',
  'rexall-cetirizine-tablets': '370030659432',
  'dg-health-sleep-aid-doxylamine': '370030115488',
  'dg-health-pain-relief-pm': '370030168491',
  'dg-health-hydrocortisone-bht': '370030657698',
  'dg-health-infants-ibuprofen': '370030167609',
  'dg-health-fluticasone-nasal': '370030640287',
  'dg-health-mucus-er': '370030100903',
  'dg-health-childrens-loratadine-chew': '370030641833',
  'dg-health-ibuprofen-liquid-gels': '370030169887',
  'dg-health-sleep-aid-dph': '370030166985',
  'dg-health-cold-flu-day-softgels': '370030641635',
};

export const BATCH29_DOLLAR_STORE: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: DG_LORATADINE_ID,
    productName: 'DG Health Allergy Relief (Loratadine 10 mg)',
    brand: 'DG Health',
    category: ALLERGY,
    formulaId: L612_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared(SET_R1, 'Lactose monohydrate'),
      cleared(SET_R1, 'Magnesium stearate'),
      cleared(SET_R1, 'Povidone'),
      cleared(SET_R1, 'Pregelatinized starch'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: DG Health Allergy Relief loratadine 10 mg = Clean. Reuses `loratadine-l612-plain` (same L612 family as Equate / Kirkland AllerClear / Member\'s Mark / TopCare / up&up). DailyMed setid dfc4b065 (NDC 55910-806). Drug Facts inactive list: lactose monohydrate, magnesium stearate, povidone, pregelatinized starch. The structured SPL inactive table lists only lactose / magnesium stearate / povidone and may omit pregelatinized starch vs other L612 rows — confirm starch is still on the carton before treating pack sizes as the same formula. No TiO2 / dye. Contains lactose. Ages 6+ (under 6: ask a doctor). This is not a coated / ODT / -D SKU.',
    retailers: [...DG],
    sourcesGeneral: [
      `DailyMed setid ${SET_R1} (DG Health L612 plain loratadine NDC 55910-806; draft, not verified)`,
    ],
  },
  {
    id: FW_LORATADINE_ID,
    productName: 'Family Wellness All Day Allergy Relief (Loratadine 10 mg)',
    brand: 'Family Wellness',
    category: ALLERGY,
    barcode: '032251935152',
    formulaId: FW_LORATADINE_ID,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared(SET_C1, 'Lactose monohydrate'),
      cleared(SET_C1, 'Magnesium stearate'),
      cleared(SET_C1, 'Microcrystalline cellulose'),
      cleared(SET_C1, 'Sodium starch glycolate (corn)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Family Wellness All Day Allergy Relief loratadine 10 mg = Clean. New formulaId `family-wellness-loratadine-10` (formulaId===id) — distinct from `loratadine-l612-plain` (that family HAS povidone / pregelatinized starch and does not list MCC / SSG) and from `365-loratadine-plain-ssg` (365 lists pregelatinized starch maize + SSG, no MCC). DailyMed setid 6b8d786e (NDC 55319-938). Drug Facts: lactose monohydrate, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. No TiO2 / dye / povidone. Contains lactose. Ages 6+.',
    retailers: [...FD],
    sourcesGeneral: [
      `DailyMed setid ${SET_C1} (Family Wellness loratadine 10 NDC 55319-938; draft, not verified) — not loratadine-l612-plain`,
    ],
  },
  {
    id: 'family-wellness-triple-antibiotic-pain',
    productName: 'Family Wellness Triple Antibiotic Ointment + Pain Relief',
    brand: 'Family Wellness',
    category: FIRST_AID,
    barcode: '032251533129',
    formulaId: NEOSPORIN_PAIN_OINT,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '500 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
      { name: 'Pramoxine HCl', strength: '10mg / g' },
    ],
    inactiveIngredients: [cleared(SET_R9, 'Petrolatum')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Family Wellness Triple Antibiotic + Pain Relief ointment = Clean. Petrolatum only on setid 9e52c8f2 (NDC 69396-053-01). Reuses `neosporin-plus-pain-ointment` — same four actives + petrolatum-only inactive as batch 12 Neosporin Plus Pain / Equate Triple + Pain. Separate from the C3 petrolatum + mineral oil family and from the skipped oil-blend / sodium pyruvate SKU (69396-054). First-aid antibiotic monograph: ages 2+ (under 2: ask a doctor).',
    retailers: [...FD],
    sourcesGeneral: [
      `DailyMed setid ${SET_R9} (Family Wellness Triple + Pain NDC 69396-053-01; draft, not verified)`,
    ],
  },
  {
    id: 'family-wellness-dual-antibiotic',
    productName: 'Family Wellness First Aid Antibiotic (Bacitracin + Polymyxin)',
    brand: 'Family Wellness',
    category: FIRST_AID,
    barcode: '032251533099',
    formulaId: FW_ABX_MOI,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '500 units / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
    ],
    inactiveIngredients: [
      cleared(SET_C3_DUAL, 'Petrolatum'),
      ungraded(SET_C3_DUAL, 'Mineral oil'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Family Wellness dual antibiotic ointment = Clean. Confirmed actives + petrolatum ± mineral oil on DailyMed setid 9157681a (NDC 69396-037). Drug Facts: mineral oil, white petrolatum. New shared formulaId `family-wellness-abx-petrolatum-mineral-oil` — not the petrolatum-only Plus Pain twin (R9 / `neosporin-plus-pain-ointment`) and not `polysporin-ointment` (petrolatum only, no mineral oil). Mineral oil is not in Methodology §5 (ungraded; v1.6 intake) — not a Clean-blocker on this topical ointment. Ages 2+ (under 2: ask a doctor).',
    retailers: [...FD],
    sourcesGeneral: [
      `DailyMed setid ${SET_C3_DUAL} (Family Wellness dual Abx NDC 69396-037; draft, not verified)`,
    ],
  },
  {
    id: 'family-wellness-triple-antibiotic',
    productName: 'Family Wellness Triple Antibiotic Ointment',
    brand: 'Family Wellness',
    category: FIRST_AID,
    formulaId: FW_ABX_MOI,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '400 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '5,000 units / g' },
    ],
    inactiveIngredients: [
      cleared(SET_C3_TRIPLE, 'Petrolatum'),
      ungraded(SET_C3_TRIPLE, 'Mineral oil'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Family Wellness plain Triple Antibiotic ointment = Clean. Confirmed actives + petrolatum ± mineral oil on DailyMed setid bd3b8146 (NDC 69571-003). Drug Facts: mineral oil, petrolatum. Shares `family-wellness-abx-petrolatum-mineral-oil` with the dual Abx row (same inactive pair). Not 69396-041 Family Wellness Original (squalane / cetyl alcohol / stearic acid / vitamin E extras — skipped as not petrolatum ± mineral oil). Not the oil-blend Pain Scar Itch 69396-054. Ages 2+ (under 2: ask a doctor).',
    retailers: [...FD],
    sourcesGeneral: [
      `DailyMed setid ${SET_C3_TRIPLE} (Family Wellness plain triple NDC 69571-003; draft, not verified)`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'family-wellness-es-apap-caplets',
    productName: 'Family Wellness Extra Strength Pain Relief (Acetaminophen 500 mg)',
    brand: 'Family Wellness',
    category: PAIN_FEVER,
    barcode: '032251921667',
    formulaId: L484_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '500mg' }],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', dailymed(SET_R4, METH.peg)),
      cleared(SET_R4, 'Hypromellose'),
      cleared(SET_R4, 'Povidone'),
      cleared(SET_R4, 'Stearic acid'),
      cleared(SET_R4, 'Carnauba wax'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER CALL: Family Wellness Extra Strength Pain Relief APAP 500 = Caution. Reuses \`${L484_FORMULA}\` — oral PEG Moderate. DailyMed setid f8383108 (NDC 55319-177). Drug Facts: hydroxypropyl methyl cellulose, polyethylene glycol, povidone, pregelatinized starch, sodium starch glycolate, stearic acid. Starch / SSG are Cleared housekeeping and are not a reason to split this L484 family. ${L484_NOTE}`,
    retailers: [...FD],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R4} (Family Wellness ES APAP L484 NDC 55319-177; draft, not verified)`,
    ],
  },
  {
    id: 'rexall-pain-relief-apap',
    productName: 'Rexall Pain Relief (Acetaminophen 500 mg)',
    brand: 'Rexall',
    category: PAIN_FEVER,
    formulaId: L484_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '500mg' }],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', dailymed(SET_R5, METH.peg)),
      cleared(SET_R5, 'Hypromellose'),
      cleared(SET_R5, 'Povidone'),
      cleared(SET_R5, 'Stearic acid'),
      cleared(SET_R5, 'Carnauba wax'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER CALL: Rexall Pain Relief APAP tablets = Caution. Reuses \`${L484_FORMULA}\`. DailyMed setid 9783cf37 (NDC 55910-701). Drug Facts: carnauba wax, corn starch*, croscarmellose sodium*, hypromellose, polyethylene glycol, povidone, pregelatinized starch, sodium starch glycolate*, stearic acid (*may contain). Dollar General Rexall SKU. ${L484_NOTE}`,
    retailers: [...DG],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R5} (Rexall APAP L484 NDC 55910-701; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-fluticasone-nasal',
    productName: 'DG Health Allergy Relief Nasal (Fluticasone Propionate)',
    brand: 'DG Health',
    category: ALLERGY,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-fluticasone-nasal'],
    formulaId: FLUTICASONE_BKC,
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Fluticasone propionate', strength: '50mcg / spray' },
    ],
    inactiveIngredients: [
      flag('Benzalkonium chloride', 'cleared', dailymed(SET_R8, METH.bkc)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_R8, METH.ps80)),
      cleared(SET_R8, 'Dextrose'),
      cleared(SET_R8, 'Microcrystalline cellulose'),
      cleared(SET_R8, 'Sodium carboxymethylcellulose'),
      cleared(SET_R8, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: DG Health Allergy Relief Nasal fluticasone = Caution (BKC ± PS80). Reuses `equate-fluticasone-bkc-ps80` — same Flonase-style store spray as batch 5 / batch 6 Equate. DailyMed setid 5f0514bd (NDC 55910-773). Drug Facts: benzalkonium chloride, dextrose, microcrystalline cellulose, phenylethyl alcohol, polysorbate 80, purified water, sodium carboxymethylcellulose. Phenylethyl alcohol is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake; notes-only — not the Caution driver). BKC is standalone Caution (not Avoid). Adult 12+.',
    retailers: [...DG],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R8} (DG Health fluticasone NDC 55910-773; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-loratadine-odt',
    productName: 'DG Health Allergy Relief Orally Disintegrating (Loratadine 10 mg)',
    brand: 'DG Health',
    category: ALLERGY,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-loratadine-odt'],
    formulaId: MINT_ODT,
    audience: ADULT,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET_R10, METH.sucralose)),
      flag('Mannitol', 'limited', dailymed(SET_R10, METH.mannitol)),
      flag(
        'Natural and artificial mint flavor',
        'limited',
        dailymed(SET_R10, METH.flavors),
      ),
      cleared(SET_R10, 'Croscarmellose sodium'),
      cleared(SET_R10, 'Crospovidone'),
      cleared(SET_R10, 'Hypromellose'),
      cleared(SET_R10, 'Magnesium stearate'),
      cleared(SET_R10, 'Microcrystalline cellulose'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: DG Health loratadine ODT = Caution. Reuses `loratadine-mint-odt-sucralose` (same mint-dissolve sucralose family as Equate / Signature Care in batch 5). DailyMed setid 04258018 (NDC 55910-970) and twin setid c18c40ae (NDC 55910-594) share the same Drug Facts list: croscarmellose sodium, crospovidone, hypromellose, magnesium stearate, mannitol, microcrystalline cellulose, natural and artificial mint flavor, sucralose. Raw demerit math is sucralose 2 + mannitol 1 + mint flavor 1 = 4 pts Avoid — draft follows the locked Caution call, not a 3-pt Avoid stack. Do not treat RediTabs (no sucralose) as this formula. Ages 6+.',
    retailers: [...DG],
    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R10} (DG Health loratadine ODT NDC 55910-970; draft, not verified)`,
      `DailyMed setid ${SET_R10B} (same mint-ODT family NDC 55910-594; draft, not verified)`,
    ],
  },
  {
    id: 'assured-advanced-relief-eye',
    productName: 'Assured Advanced Relief Eye',
    brand: 'Assured',
    category: ALLERGY,
    barcode: '639277837691',
    formulaId: 'assured-advanced-relief-eye',
    audience: ADULT,
    minAge: 6,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Dextran 70', strength: '0.1%' },
      { name: 'Polyethylene glycol 400', strength: '1%' },
      { name: 'Povidone', strength: '1%' },
      { name: 'Tetrahydrozoline HCl', strength: '0.05%' },
    ],
    inactiveIngredients: [
      flag('Benzalkonium chloride', 'cleared', dailymed(SET_K1, METH.bkc)),
      flag('Edetate disodium', 'cleared', dailymed(SET_K1, METH.edta)),
      cleared(SET_K1, 'Boric acid'),
      cleared(SET_K1, 'Sodium chloride'),
      cleared(SET_K1, 'Sodium borate'),
      cleared(SET_K1, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Assured Advanced Relief Eye = Caution (BKC). New formulaId `assured-advanced-relief-eye` (formulaId===id). DailyMed setid 593d1899 (NDC 33992-8376-5). Actives are dextran 70 + polyethylene glycol 400 + povidone + tetrahydrozoline HCl 0.05% (lubricant + redness combo). FOUNDER CALL — PEG 400 is the lubricant active, not an oral inactive Moderate demerit (same reading as batch 22 Systane Ultra PF). Inactives: benzalkonium chloride, boric acid, edetate disodium, purified water, sodium chloride, sodium borate. BKC is standalone Caution (not Avoid). Tetrahydrozoline rebound-redness is a labeled use note, not an invented active-safety grade. Not a cleaner alternative. Ages 6+ typical for this redness class (under 6: consult a doctor). Dollar Tree Assured SKU. Category uses the existing Allergy string (batch 22 eye-aisle home) — no new eye enum.',
    retailers: [...DT],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_K1} (Assured Advanced Relief Eye NDC 33992-8376-5; draft, not verified)`,
    ],
  },

  // ── Avoid (reuse) ────────────────────────────────────────
  {
    id: 'dg-health-cetirizine-tablets',
    productName: 'DG Health All Day Allergy (Cetirizine 10 mg)',
    brand: 'DG Health',
    category: ALLERGY,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-cetirizine-tablets'],
    formulaId: COATED_CETIRIZINE,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_R2, METH.tio2)),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_R2, METH.dyes),
      ),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_R2, METH.peg)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health All Day Allergy cetirizine = Avoid. MUST reuse `store-cetirizine-coated-blue1-tio2` — same Blue #1 lake + TiO2 coat family as Equate / Member\'s Mark / CVS / Kirkland Aller-Tec / TopCare (batch 5 / 20 / 21). DailyMed setid b9ac489a (NDC 55910-458). Drug Facts: corn starch, FD&C blue no. 1 aluminum lake, hypromellose, lactose monohydrate, magnesium stearate, polydextrose, polyethylene glycol, povidone, titanium dioxide, triacetin. High drivers are TiO2 + Blue #1 lake. Polydextrose and triacetin are not independently graded in Methodology §5 (ungraded; v1.6 intake; not the Avoid drivers). Contains lactose. Ages 6+.',
    retailers: [...DG],
    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R2} (DG Health cetirizine NDC 55910-458; draft, not verified)`,
    ],
  },
  {
    id: 'rexall-cetirizine-tablets',
    productName: 'Rexall All Day Allergy Relief (Cetirizine 10 mg)',
    brand: 'Rexall',
    category: ALLERGY,
    barcode: BATCH29_CATCHUP_BARCODES['rexall-cetirizine-tablets'],
    formulaId: COATED_CETIRIZINE,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_R3, METH.tio2)),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_R3, METH.dyes),
      ),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_R3, METH.peg)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Rexall All Day Allergy Relief cetirizine = Avoid. Reuses `store-cetirizine-coated-blue1-tio2`. DailyMed setid 4d79fb74 (NDC 55910-699-66). Same Blue #1 lake + TiO2 Drug Facts list as the DG Health cetirizine row. Dollar General Rexall SKU. Ages 6+.',
    retailers: [...DG],
    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R3} (Rexall cetirizine NDC 55910-699; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-mucus-er',
    productName: 'DG Health Mucus-ER (Guaifenesin 600 mg)',
    brand: 'DG Health',
    category: COLD_FLU,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-mucus-er'],
    formulaId: MUCUS_ER_BLUE1,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Guaifenesin', strength: '600mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_R6, METH.dyes),
      ),
      cleared(SET_R6, 'Carbomer homopolymer type B'),
      cleared(SET_R6, 'Hypromellose'),
      cleared(SET_R6, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Mucus-ER = Avoid. Reuses `equate-mucus-er-600-blue1` — same Blue #1 aluminum lake mucus-ER family as Equate / Mucinex ER / up&up (batch 3). DailyMed setid bf99fa83 (NDC 55910-904-01). Drug Facts: carbomer homopolymer type B, FD&C blue #1 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. Blue #1 lake is High-tier Avoid. This is not Mucus-ER Max (FLAG-skipped until NDC 55910-626-74 shelf confirm — do not invent a dye-free Clean twin). Ages 12+ (under 12: do not use). Swallow whole — do not crush, chew, or break.',
    retailers: [...DG],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R6} (DG Health Mucus-ER 600 NDC 55910-904-01; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-mucus-dm-er',
    productName: 'DG Health Mucus-DM ER (Guaifenesin 600 mg / DXM 30 mg)',
    brand: 'DG Health',
    category: COLD_FLU,
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
        dailymed(SET_R7, METH.dyes),
      ),
      flag('Silicon dioxide', 'cleared', dailymed(SET_R7, METH.sio2)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Mucus-DM ER = Avoid. Reuses `upup-mucus-dm-er-yellow10` — same Yellow #10 lake family and 600/30 strength as Target up&up / Mucinex DM / TopCare (batch 3 / 21). DailyMed setid a95401cc (NDC 55910-746). Drug Facts: carbomer homopolymer type B, copovidone, D&C yellow #10 aluminum lake, hypromellose, magnesium hydroxide, magnesium stearate, microcrystalline cellulose, silicon dioxide. Yellow #10 lake is High-tier Avoid. Copovidone is not in Methodology §5 (ungraded; v1.6 intake; notes-only — Avoid already stands on the dye). Silicon dioxide is the nanoparticle Caution cap (not needed to reach Avoid). Ages 12+ (under 12: do not use). Swallow whole with water — do not crush, chew, or break.',
    retailers: [...DG],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R7} (DG Health Mucus-DM ER 600/30 NDC 55910-746; draft, not verified)`,
    ],
  },
  {
    id: 'family-wellness-cetirizine-tablets',
    productName: 'Family Wellness Allergy Relief (Cetirizine 10 mg)',
    brand: 'Family Wellness',
    category: ALLERGY,
    barcode: '032251920844',
    formulaId: ZYRTEC_TIO2,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_A9, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A9, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_A9, METH.sio2),
      ),
      cleared(SET_A9, 'Croscarmellose sodium'),
      cleared(SET_A9, 'Hypromellose'),
      cleared(SET_A9, 'Lactose monohydrate'),
      cleared(SET_A9, 'Magnesium stearate'),
      cleared(SET_A9, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Family Wellness cetirizine coated = Avoid (TiO2). Reuses `zyrtec-allergy-tablets-tio2` — this SPL has no Blue #1 (so it is NOT `store-cetirizine-coated-blue1-tio2`); Drug Facts match the Zyrtec TiO2 / PEG / SiO2 coat family (colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide). DailyMed setid b90b5ef2 (NDC 55319-962). High driver is TiO2. Contains lactose. Ages 6+.',
    retailers: [...FD],
    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A9} (Family Wellness cetirizine TiO2 NDC 55319-962; draft, not verified) — not store-cetirizine-coated-blue1-tio2`,
    ],
  },
  {
    id: 'dg-health-sleep-aid-doxylamine',
    productName: 'DG Health Sleep Aid (Doxylamine 25 mg)',
    brand: 'DG Health',
    category: SLEEP,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-sleep-aid-doxylamine'],
    formulaId: UPUP_DOXYLAMINE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Doxylamine succinate', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_A16, METH.dyes),
      ),
      cleared(SET_A16, 'Anhydrous dibasic calcium phosphate'),
      cleared(SET_A16, 'Dibasic calcium phosphate dihydrate'),
      cleared(SET_A16, 'Magnesium stearate'),
      cleared(SET_A16, 'Microcrystalline cellulose'),
      cleared(SET_A16, 'Sodium starch glycolate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Sleep Aid doxylamine = Avoid. Reuses `upup-doxylamine-sleeptabs` — Blue #1 aluminum lake plus the anhydrous / dihydrate calcium-phosphate pair (same store-twin split from Unisom SleepTabs in batch 7). DailyMed setid a4c6b400 (NDC 55910-909). Drug Facts: anhydrous dibasic calcium phosphate, dibasic calcium phosphate dihydrate, FD&C blue no. 1 aluminum lake, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. One tablet at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: [...DG],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A16} (DG Health doxylamine NDC 55910-909; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-childrens-loratadine-chew',
    productName: "DG Health Children's Allergy Relief Chewable (Loratadine 5 mg)",
    brand: 'DG Health',
    category: ALLERGY,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-childrens-loratadine-chew'],
    formulaId: CLARITIN_CHEW,
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '5mg' }],
    inactiveIngredients: [
      flag('Aspartame', 'high', dailymed(SET_A20, METH.aspartame)),
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(SET_A20, METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed(SET_A20, METH.dyes),
      ),
      flag('Artificial grape flavor', 'limited', dailymed(SET_A20, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET_A20, METH.mannitol)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_A20, METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Children’s loratadine chewable = Avoid (aspartame + dyes). Reuses `claritin-chewable-aspartame-dye` — same grape aspartame + Red 27 lake + Blue 2 lake family as Children’s Claritin chews (batch 5 / 6). DailyMed setid 302fc570 (NDC 55910-807-52). Drug Facts: artificial grape flavor, aspartame, colloidal silicon dioxide, D&C red #27 aluminum lake, FD&C blue #2 aluminum lake, magnesium stearate, mannitol, microcrystalline cellulose, sodium starch glycolate, stearic acid. Phenylketonurics: aspartame. Ages 2+. Do not invent a Clean dollar-store kids loratadine.',
    retailers: [...DG],
    cleanAlternatives: KIDS_ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A20} (DG Health kids loratadine chew NDC 55910-807; draft, not verified)`,
    ],
  },

  // ── Avoid (new) ──────────────────────────────────────────
  {
    id: 'assured-ibuprofen-200',
    productName: 'Assured Ibuprofen 200 mg Film-Coated Tablets',
    brand: 'Assured',
    category: PAIN_FEVER,
    barcode: '639277373182',
    formulaId: 'assured-ibuprofen-coated-tio2-talc',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_A1, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_A1, METH.talc)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A1, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_A1, METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Assured Ibuprofen 200 film-coated = Avoid (TiO2 + talc). New formulaId `assured-ibuprofen-coated-tio2-talc`. DailyMed setid 5c65b691 (NDC 68210-0081). Drug Facts: colloidal silicon dioxide, croscarmellose sodium*, iron oxide red, magnesium stearate*, microcrystalline cellulose*, polyethylene glycol, polyvinyl alcohol, povidone k-30*, pregelatinized starch, sodium starch glycolate*, stearic acid*, talc, titanium dioxide (*contains one or more of these ingredients). High drivers are TiO2 + talc. Iron oxides / polyvinyl alcohol are not in Methodology §5 (ungraded; not the Avoid drivers). No Yellow #6 on this SPL — A2 dye twin not written (not distinct enough / not on this label). Ages 12+.',
    retailers: [...DT],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      `DailyMed setid ${SET_A1} (Assured IBU 200 NDC 68210-0081; draft, not verified)`,
    ],
  },
  {
    id: 'assured-headache-pm',
    productName: 'Assured Headache PM Aspirin-Free (APAP 500 + DPH citrate 38 mg)',
    brand: 'Assured',
    category: SLEEP,
    formulaId: 'assured-headache-pm',
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Diphenhydramine citrate', strength: '38mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET_A3, METH.dyes)),
      flag('FD&C Blue No. 2', 'high', dailymed(SET_A3, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET_A3, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A3, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_A3, METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Assured Headache PM = Avoid (Blue #1 / #2 + TiO2). New formulaId `assured-headache-pm`. DailyMed setid d9d22e45 (NDC 68210-4135-2). Drug Facts: colloidal silicon dioxide, FD&C Blue #1, FD&C blue #2, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized corn starch, stearic acid, titanium dioxide. Diphenhydramine citrate 38 mg is the labeled PM-citrate salt (about 25 mg DPH HCl equivalent). Stay under 4 g/day acetaminophen. Ages 12+. ' +
      SEDATING,
    retailers: [...DT],
    cleanAlternatives: [...SLEEP_ALTS, ...APAP_500_ALTS],
    sourcesGeneral: [
      `DailyMed setid ${SET_A3} (Assured Headache PM NDC 68210-4135-2; draft, not verified)`,
    ],
  },
  {
    id: 'assured-gas-relief-es',
    productName: 'Assured Gas Relief Extra Strength Softgels',
    brand: 'Assured',
    category: DIGESTIVE,
    barcode: '639277632104',
    formulaId: 'assured-gas-relief-es',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '125mg' }],
    inactiveIngredients: [
      flag('D&C Yellow No. 10', 'high', dailymed(SET_A5, METH.dyes)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET_A5, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET_A5, METH.tio2)),
      cleared(SET_A5, 'Gelatin'),
      cleared(SET_A5, 'Glycerin'),
      cleared(SET_A5, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Assured Gas Relief Extra Strength softgels = Avoid (Yellow #10 + Blue #1 + TiO2). New formulaId `assured-gas-relief-es`. DailyMed setid d5b412b4 (NDC 33992-0113-1). Drug Facts: D&C yellow 10, FD&C blue 1, gelatin, glycerin, purified water, titanium dioxide. Structured active lists dimethicone 125 mg — monograph name on the carton is Extra Strength simethicone 125 mg. Do not reuse `gasx-max-softgels` (that family flags Red 33 + Blue 1 + TiO2). Softgel carrier ≠ gummy seed-oil High. Ages 12+.',
    retailers: [...DT],
    cleanAlternatives: ACID_REDUCER_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A5} (Assured Gas Relief ES NDC 33992-0113-1; draft, not verified)`,
    ],
  },
  {
    id: 'assured-hydrocortisone-cream',
    productName: 'Assured Hydrocortisone 1% Cream',
    brand: 'Assured',
    category: FIRST_AID,
    formulaId: 'assured-hydrocortisone-parabens',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_A6, METH.parabens)),
      flag('Ethylparaben', 'high', dailymed(SET_A6, METH.parabens)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_A6, METH.ps80)),
      flag('Maltodextrin', 'limited', dailymed(SET_A6, METH.maltodextrin)),
      flag('Tocopherol', 'cleared', dailymed(SET_A6, METH.tocopherols)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Assured Hydrocortisone cream = Avoid (methylparaben + ethylparaben). New formulaId `assured-hydrocortisone-parabens`. DailyMed setid bc97f364 (NDC 55621-018-28). Drug Facts also list aloe, cetyl alcohol, dimethicone, EDTA, glycerin, glyceryl monostearate, isohexadecane, methyl gluceth-20, petrolatum, phenoxyethanol, propylene glycol, sodium citrate, stearic acid, water, ginger root extract. Propylene glycol is oral-scoped and is not scored as Moderate on this topical (`' +
      METH.pgTopical +
      '). Phenoxyethanol / isohexadecane / ginger are not in Methodology §5 (ungraded; not the Avoid drivers). Ages 2+ (under 2: ask a doctor).',
    retailers: [...DT],
    cleanAlternatives: [
      {
        productId: 'cortizone10-water-resistant',
        rankReason:
          'Independently Clean adult hydrocortisone analog (batch 12 Cortizone-10 Water Resistant, petrolatum only). Form: ointment vs cream — labeled, not a hard filter (§6).',
      },
      ...FIRST_AID_ALTS,
    ],
    sourcesGeneral: [
      `DailyMed setid ${SET_A6} (Assured HC cream NDC 55621-018-28; draft, not verified)`,
    ],
  },
  {
    id: 'assured-lidocaine-pain-gel',
    productName: 'Assured Lidocaine Pain Relief Gel',
    brand: 'Assured',
    category: FIRST_AID,
    formulaId: 'assured-lidocaine-parabens-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_A7, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_A7, METH.parabens)),
      flag('Titanium dioxide', 'high', dailymed(SET_A7, METH.tio2)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_A7, METH.ps80)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Assured Lidocaine pain gel = Avoid (parabens + TiO2). New formulaId `assured-lidocaine-parabens-tio2`. DailyMed setid bdbd4106 (NDC 69159-100-01). Drug Facts: dihydroxyaluminum aminoacetate, glycerin, kaolin, methylparaben, propylparaben, propylene glycol, PVP, polyacrylic acid, polysorbate 80, sodium polyacrylate, titanium dioxide, tartaric acid, water. Propylene glycol is oral-scoped and is not scored as Moderate on this topical. Kaolin / polyacrylate / tartaric acid are not in Methodology §5 (ungraded; not the Avoid drivers). Lidocaine as the topical anesthetic active stays parked — inactives graded only. Ages 12+ typical for 4% lidocaine.',
    retailers: [...DT],
    cleanAlternatives: FIRST_AID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A7} (Assured lidocaine gel NDC 69159-100-01; draft, not verified)`,
    ],
  },
  {
    id: 'family-wellness-childrens-apap',
    productName: "Family Wellness Children's Pain Reliever (Acetaminophen 160 mg / 5 mL)",
    brand: 'Family Wellness',
    category: PAIN_FEVER,
    barcode: '032251933356',
    formulaId: 'family-wellness-childrens-apap-parabens',
    audience: KIDS,
    minAge: 2,
    form: 'suspension',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '160mg / 5mL' }],
    inactiveIngredients: [
      flag('Butylparaben', 'high', dailymed(SET_A10, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_A10, METH.parabens)),
      flag('Sucralose', 'moderate', dailymed(SET_A10, METH.sucralose)),
      flag('Propylene glycol', 'moderate', dailymed(SET_A10, METH.pg)),
      flag('Maltitol', 'limited', dailymed(SET_A10, METH.maltitol)),
      flag('Flavor', 'limited', dailymed(SET_A10, METH.flavors)),
      flag('Xanthan gum', 'cleared', dailymed(SET_A10, METH.gums)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Family Wellness Children’s APAP suspension = Avoid (butylparaben + propylparaben + sucralose + oral PG). New formulaId `family-wellness-childrens-apap-parabens` — not `store-children-apap-dyed-liquid` (that family is dyed + benzoate, not parabens). DailyMed setid 902c1136 (NDC 55319-930-03). Drug Facts: butylparaben, citric acid, flavor, glycerin, maltitol, microcrystalline cellulose and carboxymethylcellulose sodium, propylene glycol, propylparaben, purified water, sucralose, xanthan gum. Ages 2+. Do not invent a Clean dollar-store kids APAP.',
    retailers: [...FD],
    cleanAlternatives: KIDS_APAP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A10} (Family Wellness kids APAP NDC 55319-930; draft, not verified)`,
    ],
  },
  {
    id: 'family-wellness-hc-max',
    productName: 'Family Wellness Max Strength 1% Hydrocortisone Cream',
    brand: 'Family Wellness',
    category: FIRST_AID,
    barcode: '032251922008',
    formulaId: 'family-wellness-hc-max-parabens',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_A11, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_A11, METH.parabens)),
      flag('Edetate disodium', 'cleared', dailymed(SET_A11, METH.edta)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Family Wellness Max Strength 1% HC cream = Avoid (methylparaben + propylparaben). New formulaId `family-wellness-hc-max-parabens`. DailyMed setid bca5ac2c (NDC 55319-982). Drug Facts: aloe barbadensis leaf juice, cetyl alcohol, disodium EDTA, glyceryl monostearate, methylparaben, mineral oil, petrolatum, polysorbate 60, propylene glycol, propylparaben, purified water, sorbitan monostearate. Polysorbate 60 is not PS80 / PS20 and is not in Methodology §5 (ungraded). Propylene glycol is oral-scoped and is not scored as Moderate on this topical. Separate from Assured HC (ethylparaben stack) and from DG Health HC (BHT). Ages 2+ (under 2: ask a doctor).',
    retailers: [...FD],
    cleanAlternatives: [
      {
        productId: 'cortizone10-water-resistant',
        rankReason:
          'Independently Clean adult hydrocortisone analog (batch 12 Cortizone-10 Water Resistant, petrolatum only). Form: ointment vs cream — labeled, not a hard filter (§6).',
      },
    ],
    sourcesGeneral: [
      `DailyMed setid ${SET_A11} (Family Wellness Max 1% HC NDC 55319-982; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-ibuprofen-tablets',
    productName: 'DG Health Ibuprofen 200 mg Film-Coated Tablets',
    brand: 'DG Health',
    category: PAIN_FEVER,
    formulaId: 'dg-health-ibuprofen-coated-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_A12, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A12, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_A12, METH.ps80)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_A12, METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Ibuprofen coated tablets = Avoid (TiO2). New formulaId `dg-health-ibuprofen-coated-tio2` — representative high-conf SPL setid fd27d4e1 (NDC 55910-604; iron-oxide brown coat, no dye lakes). Twin setid 98492b9f is the same TiO2 / PS80 / PEG list. Dyed + talc twin setid b514b589 (NDC 55910-758; Red 40 lake + Yellow 6 lake + talc + TiO2) is the same Avoid aisle and is not a second grade — confirm the bottle. Iron oxides are not in Methodology §5 (ungraded; not the Avoid driver). Do not silently merge into `ibu-equate-standard` / `ibu-kirkland-ib-caplets` (those are separate coats). Ages 12+.',
    retailers: [...DG],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      `DailyMed setid ${SET_A12} (DG Health IBU coated NDC 55910-604; draft, not verified)`,
      `DailyMed setid ${SET_A12B} (dyed + talc twin NDC 55910-758; same Avoid aisle, not a second row)`,
    ],
  },
  {
    id: 'dg-health-ibuprofen-liquid-gels',
    productName: 'DG Health Ibuprofen Liquid Gels (200 mg)',
    brand: 'DG Health',
    category: PAIN_FEVER,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-ibuprofen-liquid-gels'],
    formulaId: 'dg-health-ibuprofen-liqui-gels-green3-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('FD&C Green No. 3', 'high', dailymed(SET_A13, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET_A13, METH.tio2)),
      flag('Polyethylene glycol 600', 'moderate', dailymed(SET_A13, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET_A13, METH.pg)),
      flag('Sorbitol', 'limited', dailymed(SET_A13, METH.sorbitol)),
      flag(
        'Lecithin',
        'cleared',
        dailymed(
          SET_A13,
          `${METH.lecithin} — soy-allergy disclosure, not a toxicity flag`,
        ),
      ),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET_A13, METH.sls),
      ),
      cleared(SET_A13, 'Gelatin'),
      cleared(SET_A13, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Ibuprofen liquid gels = Avoid (Green #3 + TiO2). New formulaId `dg-health-ibuprofen-liqui-gels-green3-tio2` — do not reuse `ibu-advil-liqui-gels` (Advil flags Green #3 + PEG, not TiO2) and do not silently merge into `ibu-topcare-liqui-gels-green3-tio2` (different MCT / ink stack). DailyMed setid 1dd4ffc5 (NDC 55910-650). Drug Facts: FD&C green 3, gelatin, lecithin, medium chain triglyceride, polyethylene glycol 600, potassium hydroxide, propylene glycol, purified water, shellac, sodium lauryl sulfate, sorbitol sorbitan solution, titanium dioxide. High drivers are Green #3 + TiO2. MCT is not in Methodology §5 (ungraded; v1.6 intake; notes-only — Avoid already stands on the dye). SLS is standalone Caution (irritant class, not additive-scored) and is not the Avoid driver. Softgel carrier ≠ gummy seed-oil High. Ages 12+.',
    retailers: [...DG],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      `DailyMed setid ${SET_A13} (DG Health IBU liquid gels NDC 55910-650; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-apap-dyed',
    productName: 'DG Health Pain Relief (Acetaminophen 500 mg, dyed lakes)',
    brand: 'DG Health',
    category: PAIN_FEVER,
    formulaId: 'dg-health-apap-red40-yellow6',
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
        dailymed(SET_A14, METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET_A14, METH.dyes),
      ),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A14, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_A14, METH.ps80)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Pain Relief APAP dyed lakes = Avoid (Red 40 lake + Yellow 6 lake). New formulaId `dg-health-apap-red40-yellow6` — not L484 / PEG-only (`apap-store-es-l484-peg`) and not the Red 40 + TiO2 CVS/up&up coats (this SPL has no titanium dioxide). DailyMed setid 42f0c87c (NDC 55910-506). Drug Facts: croscarmellose sodium, crospovidone, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, mica-based pearlescent pigment, polyethylene glycol, polysorbate 80, povidone, pregelatinized starch, stearic acid. Mica pigment is not in Methodology §5 (ungraded; not the Avoid driver). Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...DG],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A14} (DG Health dyed APAP NDC 55910-506; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-pain-relief-pm',
    productName: 'DG Health Pain Relief PM Extra Strength (APAP 500 + DPH 25 mg)',
    brand: 'DG Health',
    category: SLEEP,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-pain-relief-pm'],
    formulaId: 'dg-health-pain-relief-pm',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_A15A, METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed(SET_A15A, METH.dyes),
      ),
      flag('Titanium dioxide', 'high', dailymed(SET_A15A, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A15A, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_A15A, METH.ps80)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Pain Relief PM Extra Strength = Avoid (Blue #1 / #2 + TiO2). New formulaId `dg-health-pain-relief-pm`. DailyMed setid 4d1eddf0 (NDC 55910-437). Drug Facts: carnauba wax, crospovidone, FD&C blue #1 aluminum lake, FD&C blue #2 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, povidone, pregelatinized starch, sodium starch glycolate, stearic acid, titanium dioxide. Do not reuse `tylenol-pm-es` (different inactive stack). Stay under 4 g/day acetaminophen. Ages 12+. ' +
      SEDATING,
    retailers: [...DG],
    cleanAlternatives: [...SLEEP_ALTS, ...APAP_500_ALTS],
    sourcesGeneral: [
      `DailyMed setid ${SET_A15A} (DG Health Pain Relief PM NDC 55910-437; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-sleep-aid-dph',
    productName: 'DG Health Sleep Aid (Diphenhydramine 25 mg)',
    brand: 'DG Health',
    category: SLEEP,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-sleep-aid-dph'],
    formulaId: 'dg-health-sleep-aid-dph',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET_A15B, METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed(SET_A15B, METH.dyes),
      ),
      flag('Titanium dioxide', 'high', dailymed(SET_A15B, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A15B, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_A15B, METH.ps80)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Sleep Aid DPH = Avoid (Blue #1 / #2 + TiO2). New formulaId `dg-health-sleep-aid-dph` — DPH-only, not the APAP + DPH Pain Relief PM row. DailyMed setid 038c1b4e (NDC 55910-431). Drug Facts: carnauba wax, crospovidone, dibasic calcium phosphate dihydrate, FD&C blue #1 aluminum lake, FD&C blue #2 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, pregelatinized starch, stearic acid, titanium dioxide. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: [...DG],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A15B} (DG Health Sleep Aid DPH NDC 55910-431; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-cold-flu-day-softgels',
    productName: 'DG Health Cold + Flu Relief Daytime Softgels',
    brand: 'DG Health',
    category: COLD_FLU,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-cold-flu-day-softgels'],
    formulaId: 'dg-health-cold-flu-day-softgels',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg' },
      { name: 'Dextromethorphan HBr', strength: '10mg' },
      { name: 'Phenylephrine HCl', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Red No. 40', 'high', dailymed(SET_A17A, METH.dyes)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET_A17A, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A17A, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET_A17A, METH.pg)),
      flag('Sorbitol', 'limited', dailymed(SET_A17A, METH.sorbitol)),
      cleared(SET_A17A, 'Gelatin'),
      cleared(SET_A17A, 'Glycerin'),
      cleared(SET_A17A, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Cold + Flu daytime softgels = Avoid (Red 40 + Yellow 6). Representative high-conf row — one of two A17 reps (do not explode into every day/night SKU). New formulaId `dg-health-cold-flu-day-softgels`. DailyMed setid ff4a2f0a (NDC 55910-994). Drug Facts: edible ink*, FD&C red no. 40, FD&C yellow no. 6, gelatin, glycerin, polyethylene glycol, povidone, propylene glycol, purified water, sorbitol sorbitan solution (*may contain). No TiO2 on this SPL. Softgel carrier ≠ gummy seed-oil High. Day/night kit setid ddcc1e78 is the same dyed-softgel Avoid aisle and is not a third grade. Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...DG],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A17A} (DG Health daytime cold/flu softgels NDC 55910-994; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-cold-flu-night-liquid',
    productName: 'DG Health Cold & Flu Relief Nighttime Liquid',
    brand: 'DG Health',
    category: COLD_FLU,
    formulaId: 'dg-health-cold-flu-night-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 30mL' },
      { name: 'Dextromethorphan HBr', strength: '30mg / 30mL' },
      { name: 'Doxylamine succinate', strength: '12.5mg / 30mL' },
    ],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET_A17B, METH.dyes)),
      flag('FD&C Red No. 40', 'high', dailymed(SET_A17B, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_A17B, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET_A17B, METH.pg)),
      flag('Saccharin sodium', 'moderate', dailymed(SET_A17B, METH.saccharin)),
      flag('Flavor', 'limited', dailymed(SET_A17B, METH.flavors)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Cold & Flu nighttime liquid = Avoid (Blue #1 + Red 40). Second A17 representative row. New formulaId `dg-health-cold-flu-night-liquid`. DailyMed setid 3d8ce88e (NDC 55910-459). Drug Facts: alcohol, anhydrous citric acid, FD&C blue no. 1, FD&C red no. 40, flavor, high fructose corn syrup, polyethylene glycol, propylene glycol, purified water, saccharin sodium, sodium citrate. HFCS is parked / ungraded (Methodology §5) — mentioned as present only; not a new lock. Alcohol is not in Methodology §5 (ungraded; not the Avoid driver). Stay under 4 g/day acetaminophen. Ages 12+. ' +
      SEDATING,
    retailers: [...DG],
    cleanAlternatives: COLD_ORAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A17B} (DG Health nighttime cold/flu liquid NDC 55910-459; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-hydrocortisone-bht',
    productName: 'DG Health Hydrocortisone 1% Cream',
    brand: 'DG Health',
    category: FIRST_AID,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-hydrocortisone-bht'],
    formulaId: 'dg-health-hydrocortisone-bht',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      flag('Butylated hydroxytoluene', 'high', dailymed(SET_A18, METH.bht)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Hydrocortisone 1% cream = Avoid (BHT). New formulaId `dg-health-hydrocortisone-bht`. DailyMed setid 3d298bd8 (NDC 55910-541-16). Drug Facts: water, cetearyl alcohol, cetyl palmitate, glycerin, isopropyl myristate, isostearyl neopentanoate, ceteareth-20, diazolidinyl urea, sorbic acid, aloe barbadensis leaf juice, BHT, sodium hydroxide. BHT is High-tier Avoid. ' +
      PARKED_FORMALDEHYDE +
      ' Sorbic acid / ceteareth-20 / isostearyl neopentanoate are not in Methodology §5 (ungraded; not the Avoid driver). Separate from Assured / Family Wellness paraben HC creams. Ages 2+ (under 2: ask a doctor).',
    retailers: [...DG],
    cleanAlternatives: [
      {
        productId: 'cortizone10-water-resistant',
        rankReason:
          'Independently Clean adult hydrocortisone analog (batch 12 Cortizone-10 Water Resistant, petrolatum only). Form: ointment vs cream — labeled, not a hard filter (§6).',
      },
    ],
    sourcesGeneral: [
      `DailyMed setid ${SET_A18} (DG Health HC 1% BHT NDC 55910-541; draft, not verified)`,
    ],
  },
  {
    id: 'dg-health-omeprazole-dr',
    productName: 'DG Health Omeprazole 20 mg Delayed-Release Tablets',
    brand: 'DG Health',
    category: DIGESTIVE,
    formulaId: 'dg-health-omeprazole-tio2-talc',
    audience: ADULT,
    minAge: 18,
    form: 'delayed-release tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Omeprazole', strength: '20mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_A19, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_A19, METH.talc)),
      flag('Propylene glycol', 'moderate', dailymed(SET_A19, METH.pg)),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET_A19, METH.sls),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Omeprazole DR = Avoid (TiO2 + talc). New formulaId `dg-health-omeprazole-tio2-talc` — do not reuse `prilosec-otc` (that row is omeprazole magnesium with a different PEG coat). DailyMed setid 326bf21c (NDC 55910-915). Drug Facts: carnauba wax, ferric oxide red, ferric oxide yellow, hypromellose, hypromellose acetate succinate, lactose monohydrate, monoethanolamine, propylene glycol, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, talc, titanium dioxide, triethyl citrate. High drivers are TiO2 + talc. SLS is standalone Caution (irritant class, not additive-scored) and is not the Avoid driver. Iron oxides / methacrylic housekeeping / triethyl citrate are not in Methodology §5 (ungraded; not the Avoid drivers). Contains lactose. Labeled 18+ (children under 18: ask a doctor).',
    retailers: [...DG],
    cleanAlternatives: ACID_REDUCER_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_A19} (DG Health omeprazole DR NDC 55910-915; draft, not verified) — not prilosec-otc`,
    ],
  },
  {
    id: 'dg-health-infants-ibuprofen',
    productName: "DG Health Infants' Ibuprofen Oral Suspension (50 mg / 1.25 mL)",
    brand: 'DG Health',
    category: PAIN_FEVER,
    barcode: BATCH29_CATCHUP_BARCODES['dg-health-infants-ibuprofen'],
    formulaId: 'dg-health-infants-ibuprofen-red40',
    audience: KIDS,
    minAge: 0,
    form: 'suspension',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '50mg / 1.25mL' }],
    inactiveIngredients: [
      flag('FD&C Red No. 40', 'high', dailymed(SET_A21, METH.dyes)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_A21, METH.ps80)),
      flag('Sodium benzoate', 'limited', dailymed(SET_A21, METH.benzoate)),
      flag('Sorbitol', 'limited', dailymed(SET_A21, METH.sorbitol)),
      flag(
        'Natural and artificial berry flavor',
        'limited',
        dailymed(SET_A21, METH.flavors),
      ),
      flag('Xanthan gum', 'cleared', dailymed(SET_A21, METH.gums)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: DG Health Infants’ Ibuprofen = Avoid (Red 40). New formulaId `dg-health-infants-ibuprofen-red40` — infants concentrated 50 mg / 1.25 mL; do not merge into `store-children-ibu-dyed-liquid` (that family is 100 mg / 5 mL, minAge 2). DailyMed setid 9022e393 (NDC 55910-503-05). Drug Facts: anhydrous citric acid, FD&C red #40, glycerin, hypromellose, natural and artificial berry flavor, polysorbate 80, purified water, sodium benzoate, sorbitol solution, sucrose, xanthan gum. Infant-labeled (minAge 0; confirm the dosing chart / ask-a-doctor under 6 months on the bottle). No independently Clean kids ibuprofen exists in the drafted batches — cleanAlternatives omitted (honest empty; do not invent a Clean kids IBU; do not point at adult dye-free IBU — §6 age-matching). Prefer Genexa Infants acetaminophen only if a different-active analog is acceptable; that swap is not listed here because it is not ibuprofen.',
    retailers: [...DG],
    sourcesGeneral: [
      `DailyMed setid ${SET_A21} (DG Health infants IBU NDC 55910-503-05; draft, not verified)`,
    ],
  },
];

for (const record of BATCH29_DOLLAR_STORE) {
  const expected = BATCH29_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 29 catch-up UPC drift on ${record.id}`);
  }
}

// Verdict tally (34 records): Clean 5 · Caution 5 · Avoid 24
// Reused formulaIds: 11 (loratadine-l612-plain, store-cetirizine-coated-blue1-tio2,
// apap-store-es-l484-peg, equate-mucus-er-600-blue1, upup-mucus-dm-er-yellow10,
// equate-fluticasone-bkc-ps80, neosporin-plus-pain-ointment,
// loratadine-mint-odt-sucralose, zyrtec-allergy-tablets-tio2,
// upup-doxylamine-sleeptabs, claritin-chewable-aspartame-dye)
// New formulaIds: 20 (family-wellness-loratadine-10,
// family-wellness-abx-petrolatum-mineral-oil, assured-advanced-relief-eye,
// assured-ibuprofen-coated-tio2-talc, assured-headache-pm,
// assured-gas-relief-es, assured-hydrocortisone-parabens,
// assured-lidocaine-parabens-tio2, family-wellness-childrens-apap-parabens,
// family-wellness-hc-max-parabens, dg-health-ibuprofen-coated-tio2,
// dg-health-ibuprofen-liqui-gels-green3-tio2, dg-health-apap-red40-yellow6,
// dg-health-pain-relief-pm, dg-health-sleep-aid-dph,
// dg-health-cold-flu-day-softgels, dg-health-cold-flu-night-liquid,
// dg-health-hydrocortisone-bht, dg-health-omeprazole-tio2-talc,
// dg-health-infants-ibuprofen-red40)

