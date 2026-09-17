// DRAFT / not verified / batch 39 Tylenol / Advil / Aleve holes /
// methodology v1.6 + Sept 15 KOH Cleared + sorbitan Caution locks.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. New in-scope US Pain & Fever / Sleep holes only.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent Clean. Do NOT invent UPCs /
// barcodes. Pack sizes of the same name+form+inactives share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6). Not
// wired into Clean Picks UI. No live Clean Picks file is edited. No
// photos. Letter tiles only on new ids. No fake Clean alts. No
// methodology rewrite. Do NOT touch tylenol-8hr-peg.
//
// REUSE ONLY (do not rewrite / do not clone) — 28 existing ids from
// batches 1 / 2 / 7:
// Batch 1: tylenol-es-caplets, tylenol-es-rapid-release-gels,
//   tylenol-es-liquid-gels, tylenol-rs-tablets-plain, tylenol-rs-caplets,
//   tylenol-8hr-peg (Caution — DO NOT CHANGE), tylenol-8hr-tio2,
//   advil-tablets, advil-liqui-gels, advil-gel-caplets, motrin-ib-caplets,
//   advil-dual-action
// Batch 2: tylenol-children-liquid-dyed, tylenol-children-liquid-dyefree,
//   tylenol-infants-liquid-dyed, tylenol-infants-liquid-dyefree,
//   tylenol-children-chew-dyefree, motrin-children-liquid-dyed,
//   motrin-children-liquid-dyefree, motrin-children-chew-dyefree,
//   motrin-children-chew-dyed, motrin-infants-liquid-dyed,
//   junior-strength-advil (chew — keep), childrens-advil-suspension,
//   childrens-advil-suspension-dyefree
// Batch 7: tylenol-pm-es, advil-pm-liquigels, advil-pm-caplets
// Marketing twins of those 28 (Easy to Swallow, Liqui-Gels Minis,
// Easy Open Cap, Soft Grip, etc.) share the existing formulaId — not
// cloned as new Search rows.
//
// LIST 2 — proposed scan verdicts (18 formula rows).
// LIST 3 — founder locks applied, not re-derived (2 formula rows):
//   Potassium hydroxide (KOH) = Cleared (pH adjuster, trace).
//   Sorbitan (plain / sorbitan esters) = Caution (polysorbate
//   neighborhood; standalone, not additive-scored). Not the sorbitol
//   Limited row. PEG Moderate + sorbitol Limited. Softgel fill ≠
//   gummy High (tap only if oils are present — none on these two).
//
// TALLY (unverified drafts in THIS file): 20 rows — Clean 0 /
// Caution 6 / Avoid 14.
// Independently Clean swaps used here already live on main
// (genexa-acetaminophen-es, genexa-kids-apap-liquid,
// genexa-infants-apap-liquid, hylands-calms-forte). No Clean
// naproxen / ibuprofen invented.
//
// LIST 4 is PR-comment only — no Search rows for cold/flu/sinus/
// mucus/cough, topicals (Precise, Targeted Relief, arthritis gels,
// Alevex), kits, Canada/EU, beauty/food, or list-1 marketing twins.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const PAIN_FEVER = 'Pain & Fever';
const SLEEP = 'Sleep';
const UNVERIFIED_NOTE = 'draft, not verified';

const PF_RETAILERS = [
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
  'Safeway',
] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const SOFTGEL_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this capsule/softgel/liquid-drop fill they are not that High rule.';

const MCT_UNLABELED_TAP =
  'Label says medium-chain triglycerides and does not name coconut. We mark that Limited because the source isn’t clear. MCT labeled from coconut is Cleared on oral capsule/softgel/liquid supplements (not a cooking-oil bottle). Softgel/tablet fill is not the gummy seed-oil High rule.';

const KOH_TAP =
  'Potassium hydroxide is the locked Cleared pH-adjuster (trace). Not a grade driver. Same job as sodium hydroxide as pH adjuster.';

const SORBITAN_TAP =
  'Sorbitan (plain / sorbitan esters) is the locked Caution row — polysorbate neighborhood, not additive-scored, not Avoid. It is not the sugar-alcohol Limited row.';

const SEDATING =
  'Nighttime first-generation antihistamine — labeled drowsiness will occur; next-day drowsiness can linger. Cleanliness grade only; no efficacy claim.';

const METH = {
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  parabens: 'Methodology §5 High-tier (parabens)',
  bht: 'Methodology §5 High-tier (BHT — locked v1.6)',
  caramel:
    'Methodology §5 High-tier (caramel color, undisclosed class — treated as Class III/IV)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  polydextrose: 'Methodology §5 Limited-risk (polydextrose — maltodextrin-like)',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP} ${SOFTGEL_OIL_LINE}`,
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  sorbitan: `Methodology §5 Caution (sorbitan, plain / sorbitan esters as emulsifier — polysorbate neighborhood; standalone Caution, not additive-scored, not Avoid; not the sugar-alcohol Limited row). ${SORBITAN_TAP}`,
  koh: `Methodology §5 Cleared (potassium hydroxide — pH adjuster, trace; locked Sept 15, 2026). ${KOH_TAP}`,
  dibehenin:
    'Methodology §5 Cleared (dibehenin / glyceryl dibehenate / glyceryl behenate — vegetable wax/lubricant; stearate / wax family)',
  ethylcellulose: 'Methodology §5 Cleared (ethylcellulose — cellulose coating family)',
  copovidone: 'Methodology §5 Cleared (copovidone — povidone-family copolymer)',
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

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const GENEXA_ES = 'genexa-acetaminophen-es';
const GENEXA_KIDS = 'genexa-kids-apap-liquid';
const GENEXA_INFANTS = 'genexa-infants-apap-liquid';
const CALMS_FORTE = 'hylands-calms-forte';

const APAP_ADULT_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'Independently Clean adult acetaminophen Extra Strength already on main (founder-exception Clean). Same Pain & Fever shelf. Form labeled, not a hard filter (§6).',
  ),
];

const APAP_KIDS_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_KIDS,
    'Independently Clean kids acetaminophen liquid already on main (ages 2+). Same Pain & Fever shelf. Form: liquid — labeled, not a hard filter (§6).',
  ),
];

const APAP_INFANTS_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_INFANTS,
    'Independently Clean infant-labeled acetaminophen liquid already on main. Age-matched infant swap. Form: liquid. Different active when the scanned row is ibuprofen.',
  ),
];

const IBU_ADULT_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'No independently Clean adult ibuprofen or naproxen on this shelf. Closest Clean Pain & Fever analog is Genexa Extra Strength acetaminophen (different active). Form labeled, not a hard filter (§6).',
  ),
];

const JUNIOR_IBU_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_KIDS,
    'No independently Clean kids ibuprofen. Closest Clean Pain & Fever analog is Genexa Kids acetaminophen liquid (minAge 2 — allowed as a lower-minimum swap for this 6+ junior product). Different active (ibuprofen → acetaminophen). Form: liquid, not a coated tablet.',
  ),
];

const DUAL_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'No independently Clean dual-action combo. Closest Clean analog is Genexa Extra Strength acetaminophen for the APAP half — not a 250/125 replacement. Form labeled, not a hard filter (§6).',
  ),
];

const SLEEP_ALTS: CleanAlternative[] = [
  alt(
    CALMS_FORTE,
    'Independently Clean adult Sleep analog already on main (Hyland\'s Calms Forte, homeopathic tablets). Form: tablet — labeled, not a hard filter (§6). Conventional sedating-antihistamine PM aids have no independently Clean match.',
  ),
];

const SET = {
  aleveCaplets: '3ca84972-f8c9-1881-e063-6294a90a9070',
  aleveCapletsTwin: '02941928-128a-2c88-e063-6294a90ac6ba',
  aleveTablets: '31bad2d9-c0bb-7f20-e063-6294a90acb17',
  aleveGelcaps: '0ad8bbb9-dd5f-4273-b085-ee3e5ed22613',
  aleveLiquidGels: '1266393e-b55e-4e34-9710-0b87209f4158',
  alevePm: '82891458-ab0d-459a-8602-dcebd22c3010',
  aleveBack: '6376e1b8-52c4-0519-e053-2a91aa0af35f',
  aleveHeadache: 'c69f4926-c5cd-63a0-e053-2a95a90a2ca6',
  tylenolEsDissolve: 'ab02080a-c903-4e4a-a9f3-2b8197ed2f2b',
  tylenolKidsDissolve: '79669930-f744-4bb1-8325-b75951489b64',
  tylenolEsLiquid: '42321456-d7dd-3b51-e063-6394a90ac292',
  tylenolPlusAdults: '5bb8ef99-a94b-49f9-89f9-cd1ce0a47a42',
  tylenolKidsChewGrape: '9782fe86-d72a-4231-b1ba-d3f3b4ee49e3',
  tylenolKidsChewRed7: 'b297aff8-a08b-4d37-b168-800a56564cbd',
  advilJrCoated: '5ed0d404-c54d-b05f-578a-d2730e8a78ee',
  infantsAdvil: 'db5ed801-7a7e-3c83-0172-77f914daaa5a',
  advilMigraine: 'e4a6219d-4ad4-0119-4cf8-7fc39b4b5979',
  advilDualBack: 'acaa9806-e552-44f2-a680-b8bb64c49e1f',
  advilFilm: '5be198b8-396e-4b44-8819-e2e3b5d2ad0e',
  advilMenstrual: 'ae1625f4-ef32-4d4f-bf54-c44085843e41',
  motrinDual: 'f2ee9cf5-02b7-6612-e053-2995a90a90c4',
  motrinPm: '55403f19-58ae-450b-8a7b-0bc544088f20',
  motrinIbGels: 'd9fc716a-fba5-45f8-8024-52325799d1dd',
  motrinIbMigraineGels: '34818110-5291-4bda-9571-bd77d90bba7c',
} as const;

const ID = {
  aleveCaplets: 'aleve-caplets-tablets',
  aleveGelcaps: 'aleve-gelcaps',
  aleveLiquidGels: 'aleve-liquid-gels',
  alevePm: 'aleve-pm',
  aleveBack: 'aleve-back-muscle-pain',
  aleveHeadache: 'aleve-headache-pain',
  tylenolEsDissolve: 'tylenol-es-dissolve-packs',
  tylenolKidsDissolve: 'tylenol-children-dissolve-packs',
  tylenolEsLiquid: 'tylenol-es-liquid',
  tylenolPlusAdults: 'tylenol-for-children-plus-adults',
  tylenolKidsChewDyed: 'tylenol-children-chew-dyed',
  advilJrCoated: 'junior-strength-advil-coated',
  infantsAdvil: 'infants-advil-drops',
  advilMigraine: 'advil-migraine-liqui-gels',
  advilDualBack: 'advil-dual-action-back-pain',
  advilFilmMenstrual: 'advil-film-coated-menstrual',
  motrinDual: 'motrin-dual-action',
  motrinPm: 'motrin-pm',
  motrinIbGels: 'motrin-ib-liquid-gels',
  motrinIbMigraineGels: 'motrin-ib-migraine-liquid-gels',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

export const BATCH39_TYLENOL_ADVIL_ALEVE_HOLES: RatingRecord[] = [
  // ── List 2 Avoid — Aleve ─────────────────────────────────
  row({
    id: ID.aleveCaplets,
    productName: 'Aleve Caplets / Tablets',
    brand: 'Aleve',
    category: PAIN_FEVER,
    barcode: '025866592261 025866591998',
    formulaId: ID.aleveCaplets,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 2 aluminum lake', 'high', dailymed(SET.aleveCaplets, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.aleveCaplets, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.aleveCaplets, METH.peg)),
      flag('Mannitol', 'limited', dailymed(SET.aleveCaplets, METH.mannitol)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.aleveCaplets, METH.sio2),
      ),
      cleared(SET.aleveCaplets, 'Hypromellose'),
      cleared(SET.aleveCaplets, 'Magnesium stearate'),
      cleared(SET.aleveCaplets, 'Sodium starch glycolate'),
      cleared(SET.aleveCaplets, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Aleve Caplets / Tablets (current Blueshield) = Avoid. Drivers are FD&C Blue #2 aluminum lake + titanium dioxide (High). Current Bayer / Select Consumer SPLs 3ca84972, 02941928, and 31bad2d9 share this no-talc inactive list — Easy Open Arthritis / Soft Grip pack twins share this formulaId, not cloned. Older Aleve tablet SPLs (e.g. 00ef5b30 / a3745850) still list talc + Blue #2 + TiO2; if the bottle is that older talc list it is still Avoid (talc is High) and is not a second current formula row. aleve.com. Ages 12+.',
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.aleveCaplets} (current Blueshield caplets); twin pack SPLs ${SET.aleveCapletsTwin} / ${SET.aleveTablets} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.aleveGelcaps,
    productName: 'Aleve Gelcaps',
    brand: 'Aleve',
    category: PAIN_FEVER,
    barcode: '025866592346',
    formulaId: ID.aleveGelcaps,
    audience: ADULT,
    minAge: 12,
    form: 'gelcap',
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET.aleveGelcaps, METH.dyes)),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.aleveGelcaps, METH.dyes),
      ),
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET.aleveGelcaps, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET.aleveGelcaps, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.aleveGelcaps, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.aleveGelcaps, METH.peg)),
      cleared(SET.aleveGelcaps, 'Gelatin'),
      cleared(SET.aleveGelcaps, 'Glycerin'),
      cleared(SET.aleveGelcaps, 'Hypromellose'),
      cleared(SET.aleveGelcaps, 'Magnesium stearate'),
      cleared(SET.aleveGelcaps, 'Microcrystalline cellulose'),
      cleared(SET.aleveGelcaps, 'Povidone'),
      cleared(SET.aleveGelcaps, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Aleve Gelcaps = Avoid. Drivers are Blue #1 + Yellow #6 lake + D&C Yellow #10 lake + talc + titanium dioxide (each High). Edible ink / edetate disodium are ungraded appearance / chelator aids (not the Avoid drivers). Distinct from current Blueshield caplets (no-talc) and from Liquid Gels. Ages 12+.',
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.aleveGelcaps} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.aleveLiquidGels,
    productName: 'Aleve Liquid Gels',
    brand: 'Aleve',
    category: PAIN_FEVER,
    barcode: '025866591967',
    formulaId: ID.aleveLiquidGels,
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET.aleveLiquidGels, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.aleveLiquidGels, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.aleveLiquidGels, METH.pg)),
      flag('Sorbitol', 'limited', dailymed(SET.aleveLiquidGels, METH.sorbitol)),
      flag('Mannitol', 'limited', dailymed(SET.aleveLiquidGels, METH.mannitol)),
      flag('Sorbitan', 'cleared', dailymed(SET.aleveLiquidGels, METH.sorbitan)),
      cleared(SET.aleveLiquidGels, 'Gelatin'),
      cleared(SET.aleveLiquidGels, 'Glycerin'),
      cleared(SET.aleveLiquidGels, 'Lactic acid'),
      cleared(SET.aleveLiquidGels, 'Povidone'),
      cleared(SET.aleveLiquidGels, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Aleve Liquid Gels (current) = Avoid. Driver is FD&C Blue #1 (High). PEG is Moderate; sorbitol / mannitol Limited. Sorbitan is the locked Caution emulsifier (not Avoid, not the sorbitol row) — ${SORBITAN_TAP} Pharmaceutical ink is ungraded appearance ink. Softgel fill has no seed-oil line on this SPL. Distinct from Gelcaps and from Blueshield caplets. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.aleveLiquidGels} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.alevePm,
    productName: 'Aleve PM',
    brand: 'Aleve',
    category: SLEEP,
    barcode: '025866591882',
    formulaId: ID.alevePm,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    activeIngredients: [
      { name: 'Naproxen sodium', strength: '220mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed(SET.alevePm, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET.alevePm, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.alevePm, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.alevePm, METH.peg)),
      cleared(SET.alevePm, 'Carnauba wax'),
      cleared(SET.alevePm, 'Hypromellose'),
      cleared(SET.alevePm, 'Magnesium stearate'),
      cleared(SET.alevePm, 'Microcrystalline cellulose'),
      cleared(SET.alevePm, 'Povidone'),
      cleared(SET.alevePm, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Aleve PM = Avoid. Drivers are Blue #2 lake + talc + titanium dioxide (High). Labeled 2 caplets at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.alevePm} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.aleveBack,
    productName: 'Aleve Back & Muscle Pain',
    brand: 'Aleve',
    category: PAIN_FEVER,
    barcode: '025866592254',
    formulaId: ID.aleveBack,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 2 lake', 'high', dailymed(SET.aleveBack, METH.dyes)),
      flag('Talc', 'high', dailymed(SET.aleveBack, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.aleveBack, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.aleveBack, METH.peg)),
      cleared(SET.aleveBack, 'Hypromellose'),
      cleared(SET.aleveBack, 'Magnesium stearate'),
      cleared(SET.aleveBack, 'Microcrystalline cellulose'),
      cleared(SET.aleveBack, 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Aleve Back & Muscle Pain = Avoid. Drivers are Blue #2 + talc + titanium dioxide (High). Own formulaId — do not merge into current Blueshield caplets (those current SPLs have no talc) or into Headache Pain (different named SKU). Ages 12+.',
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.aleveBack} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.aleveHeadache,
    productName: 'Aleve Headache Pain',
    brand: 'Aleve',
    category: PAIN_FEVER,
    barcode: '025866593510',
    formulaId: ID.aleveHeadache,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 2 lake', 'high', dailymed(SET.aleveHeadache, METH.dyes)),
      flag('Talc', 'high', dailymed(SET.aleveHeadache, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.aleveHeadache, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.aleveHeadache, METH.peg)),
      cleared(SET.aleveHeadache, 'Hypromellose'),
      cleared(SET.aleveHeadache, 'Magnesium stearate'),
      cleared(SET.aleveHeadache, 'Microcrystalline cellulose'),
      cleared(SET.aleveHeadache, 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Aleve Headache Pain = Avoid. Drivers are Blue #2 + talc + titanium dioxide (High). Own formulaId — do not merge into Back & Muscle or into current Blueshield caplets. Ages 12+.',
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.aleveHeadache} — ${UNVERIFIED_NOTE}`],
  }),

  // ── List 2 Caution — Tylenol ──────────────────────────────
  row({
    id: ID.tylenolEsDissolve,
    productName: 'Tylenol Dissolve Packs Extra Strength',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450415325 300450415134',
    formulaId: ID.tylenolEsDissolve,
    audience: ADULT,
    minAge: 12,
    form: 'dissolve powder',
    activeIngredients: [{ name: 'Acetaminophen', strength: '500mg' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET.tylenolEsDissolve, METH.sucralose)),
      flag(
        'Maltodextrin',
        'limited',
        dailymed(SET.tylenolEsDissolve, METH.maltodextrin),
      ),
      flag('Xylitol', 'limited', dailymed(SET.tylenolEsDissolve, METH.xylitol)),
      flag('Flavor', 'limited', dailymed(SET.tylenolEsDissolve, METH.flavors)),
      flag(
        'Ethylcellulose',
        'cleared',
        dailymed(SET.tylenolEsDissolve, METH.ethylcellulose),
      ),
      cleared(SET.tylenolEsDissolve, 'Citric acid'),
      cleared(SET.tylenolEsDissolve, 'Magnesium stearate'),
      cleared(SET.tylenolEsDissolve, 'Sodium bicarbonate'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Tylenol Extra Strength Dissolve Packs = Caution. Driver is sucralose (Moderate, 2 pts) plus maltodextrin / xylitol / flavor (Limited). ${LIMITED_STACK} Berry flavor SPL. Distinct from Children's Dissolve Packs (160 mg, ages 6–11). Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: APAP_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tylenolEsDissolve} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tylenolKidsDissolve,
    productName: "Children's Tylenol Dissolve Packs",
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450416186',
    formulaId: ID.tylenolKidsDissolve,
    audience: KIDS,
    minAge: 6,
    form: 'dissolve powder',
    activeIngredients: [{ name: 'Acetaminophen', strength: '160mg' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed(SET.tylenolKidsDissolve, METH.sucralose),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed(SET.tylenolKidsDissolve, METH.maltodextrin),
      ),
      flag('Xylitol', 'limited', dailymed(SET.tylenolKidsDissolve, METH.xylitol)),
      flag('Flavor', 'limited', dailymed(SET.tylenolKidsDissolve, METH.flavors)),
      flag(
        'Ethylcellulose',
        'cleared',
        dailymed(SET.tylenolKidsDissolve, METH.ethylcellulose),
      ),
      cleared(SET.tylenolKidsDissolve, 'Citric acid'),
      cleared(SET.tylenolKidsDissolve, 'Magnesium stearate'),
      cleared(SET.tylenolKidsDissolve, 'Sodium bicarbonate'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Children's Tylenol Dissolve Packs = Caution. Same sucralose Moderate + maltodextrin / xylitol Limited stack as the adult ES packs. ${LIMITED_STACK} Wild berry SPL; ages 6–11. Distinct formulaId from the adult 500 mg packs and from dye-free chewables already on main. Clean swap is Genexa Kids liquid (form labeled).`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: APAP_KIDS_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tylenolKidsDissolve} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tylenolEsLiquid,
    productName: 'Tylenol Extra Strength Adult Liquid / Suspension',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: ID.tylenolEsLiquid,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    activeIngredients: [{ name: 'Acetaminophen', strength: '960mg / 30mL' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET.tylenolEsLiquid, METH.sucralose)),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed(SET.tylenolEsLiquid, METH.sorbate),
      ),
      flag('Sorbitol', 'limited', dailymed(SET.tylenolEsLiquid, METH.sorbitol)),
      flag('Flavors', 'limited', dailymed(SET.tylenolEsLiquid, METH.flavors)),
      cleared(SET.tylenolEsLiquid, 'Anhydrous citric acid'),
      cleared(SET.tylenolEsLiquid, 'Glycerin'),
      cleared(
        SET.tylenolEsLiquid,
        'Microcrystalline cellulose and carboxymethylcellulose sodium',
      ),
      cleared(SET.tylenolEsLiquid, 'Purified water'),
      cleared(SET.tylenolEsLiquid, 'Sucrose'),
      cleared(SET.tylenolEsLiquid, 'Xanthan gum'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Tylenol Extra Strength Adult Liquid / Suspension = Caution. Sucralose (Moderate) + potassium sorbate + sorbitol + flavors (Limited). ${LIMITED_STACK} Cherry SPL; DailyMed lists acetaminophen 960 mg with a 30 mL cup. This adult liquid is NOT the Children's dye-free Avoid trap already on main (tylenol-children-liquid-dyefree). Distinct from For Children Plus Adults (kids 2+ chart, 160 mg / 5 mL). Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: APAP_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tylenolEsLiquid} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tylenolPlusAdults,
    productName: 'Tylenol For Children Plus Adults Liquid',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: ID.tylenolPlusAdults,
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    activeIngredients: [{ name: 'Acetaminophen', strength: '160mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed(SET.tylenolPlusAdults, METH.sucralose),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed(SET.tylenolPlusAdults, METH.sorbate),
      ),
      flag('Sorbitol', 'limited', dailymed(SET.tylenolPlusAdults, METH.sorbitol)),
      flag('Flavors', 'limited', dailymed(SET.tylenolPlusAdults, METH.flavors)),
      cleared(SET.tylenolPlusAdults, 'Anhydrous citric acid'),
      cleared(SET.tylenolPlusAdults, 'Glycerin'),
      cleared(
        SET.tylenolPlusAdults,
        'Microcrystalline cellulose and carboxymethylcellulose sodium',
      ),
      cleared(SET.tylenolPlusAdults, 'Purified water'),
      cleared(SET.tylenolPlusAdults, 'Sucrose'),
      cleared(SET.tylenolPlusAdults, 'Xanthan gum'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Tylenol For Children Plus Adults liquid = Caution. Same sucralose + potassium sorbate + sorbitol stack as the adult ES liquid; ${LIMITED_STACK} Cherry; 160 mg / 5 mL with a 2+ weight chart (under 2: ask a doctor) plus an adult 12+ line. Distinct from Children's dyed liquid (Avoid) and from Children's dye-free Avoid trap already on main. Do not merge into tylenol-es-liquid (different strength / age chart).`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: APAP_KIDS_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tylenolPlusAdults} — ${UNVERIFIED_NOTE}`,
    ],
  }),

  // ── List 2 Avoid — Tylenol chew / Advil / Motrin ──────────
  row({
    id: ID.tylenolKidsChewDyed,
    productName: "Children's Tylenol Chewables (dyed)",
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450518248 300450519245',
    formulaId: ID.tylenolKidsChewDyed,
    audience: KIDS,
    minAge: 2,
    form: 'chewable',
    activeIngredients: [{ name: 'Acetaminophen', strength: '160mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 7 calcium lake',
        'high',
        dailymed(SET.tylenolKidsChewRed7, METH.dyes),
      ),
      flag(
        'D&C Red No. 30 aluminum lake',
        'high',
        dailymed(SET.tylenolKidsChewGrape, METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET.tylenolKidsChewGrape, METH.dyes),
      ),
      flag('Sucralose', 'moderate', dailymed(SET.tylenolKidsChewRed7, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET.tylenolKidsChewRed7, METH.flavors)),
      cleared(SET.tylenolKidsChewRed7, 'Anhydrous citric acid'),
      cleared(SET.tylenolKidsChewRed7, 'Crospovidone'),
      cleared(SET.tylenolKidsChewRed7, 'Dextrose'),
      cleared(SET.tylenolKidsChewRed7, 'Magnesium stearate'),
      cleared(SET.tylenolKidsChewRed7, 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Children\'s Tylenol Chewables (dyed) = Avoid. Driver is D&C Red No. 7 (High); grape SPL 9782fe86 also lists D&C Red 30 + FD&C Blue #1 lakes on the same sucralose pattern. SEPARATE from dye-free chew / meltaways already on main (tylenol-children-chew-dyefree). One dyed-chew formula row — pack / flavor sizes share this formulaId. Ages 2–11. Clean swap is Genexa Kids liquid (form labeled).',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: APAP_KIDS_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tylenolKidsChewRed7} (Red 7); grape twin ${SET.tylenolKidsChewGrape} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.advilJrCoated,
    productName: 'Junior Strength Advil Coated Tablets',
    brand: 'Advil',
    category: PAIN_FEVER,
    formulaId: ID.advilJrCoated,
    audience: KIDS,
    minAge: 6,
    form: 'coated tablet',
    activeIngredients: [{ name: 'Ibuprofen', strength: '100mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.advilJrCoated, METH.tio2)),
      flag('Methylparaben', 'high', dailymed(SET.advilJrCoated, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET.advilJrCoated, METH.parabens)),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(SET.advilJrCoated, METH.benzoate),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.advilJrCoated, METH.sio2),
      ),
      cleared(SET.advilJrCoated, 'Carnauba wax'),
      cleared(SET.advilJrCoated, 'Corn starch'),
      cleared(SET.advilJrCoated, 'Croscarmellose sodium'),
      cleared(SET.advilJrCoated, 'Microcrystalline cellulose'),
      cleared(SET.advilJrCoated, 'Povidone'),
      cleared(SET.advilJrCoated, 'Pregelatinized starch'),
      cleared(SET.advilJrCoated, 'Stearic acid'),
      cleared(SET.advilJrCoated, 'Sucrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Junior Strength Advil coated tablets = Avoid. Drivers are titanium dioxide + methylparaben / propylparaben (High). OWN ROW — distinct from junior-strength-advil chewables already on main (aspartame + dye lakes). Synthetic iron oxides / pharmaceutical glaze / ink / acetylated monoglycerides are not in Methodology §5 (ungraded; not the Avoid drivers). Ages 6–11.',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: JUNIOR_IBU_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.advilJrCoated} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.infantsAdvil,
    productName: "Infants' Advil Concentrated Drops",
    brand: 'Advil',
    category: PAIN_FEVER,
    barcode: '305730191203',
    formulaId: ID.infantsAdvil,
    audience: KIDS,
    minAge: 0,
    form: 'concentrated drops',
    activeIngredients: [{ name: 'Ibuprofen', strength: '50mg / 1.25mL' }],
    inactiveIngredients: [
      flag('Butylated hydroxytoluene (BHT)', 'high', dailymed(SET.infantsAdvil, METH.bht)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.infantsAdvil, METH.ps80)),
      flag('Propylene glycol', 'moderate', dailymed(SET.infantsAdvil, METH.pg)),
      flag('Sodium benzoate', 'limited', dailymed(SET.infantsAdvil, METH.benzoate)),
      flag('Sorbitol', 'limited', dailymed(SET.infantsAdvil, METH.sorbitol)),
      flag('Artificial flavor', 'limited', dailymed(SET.infantsAdvil, METH.flavors)),
      cleared(SET.infantsAdvil, 'Glycerin'),
      cleared(SET.infantsAdvil, 'Microcrystalline cellulose'),
      cleared(SET.infantsAdvil, 'Purified water'),
      cleared(SET.infantsAdvil, 'Sucrose'),
      cleared(SET.infantsAdvil, 'Xanthan gum'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Infants\' Advil concentrated drops = Avoid. Driver is BHT (High, locked). Grape SPL; ages about 6–23 months. No independently Clean infant ibuprofen — listed swap is Genexa Infants acetaminophen (different active, age-matched). Distinct from Children\'s Advil suspension rows already on main.',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: APAP_INFANTS_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.infantsAdvil} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.advilMigraine,
    productName: 'Advil Migraine Liqui-Gels',
    brand: 'Advil',
    category: PAIN_FEVER,
    barcode: '305730168205',
    formulaId: ID.advilMigraine,
    audience: ADULT,
    minAge: 18,
    form: 'liquid gel',
    activeIngredients: [{ name: 'Solubilized ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('FD&C Green No. 3', 'high', dailymed(SET.advilMigraine, METH.dyes)),
      flag('FD&C Red No. 40', 'high', dailymed(SET.advilMigraine, METH.dyes)),
      flag('D&C Yellow No. 10', 'high', dailymed(SET.advilMigraine, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.advilMigraine, METH.peg)),
      flag('Sorbitol', 'limited', dailymed(SET.advilMigraine, METH.sorbitol)),
      flag('Sorbitan', 'cleared', dailymed(SET.advilMigraine, METH.sorbitan)),
      flag(
        'Potassium hydroxide',
        'cleared',
        dailymed(SET.advilMigraine, METH.koh),
      ),
      cleared(SET.advilMigraine, 'Gelatin'),
      cleared(SET.advilMigraine, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Advil Migraine Liqui-Gels = Avoid. Drivers are Green #3 + Red #40 + D&C Yellow #10 (High). ≠ plain Advil Liqui-Gels / Minis already on main (those flag Green #3 + PEG only — do not reuse ibu-advil-liqui-gels). KOH is Cleared. ${SORBITAN_TAP} Pharmaceutical ink is ungraded. Softgel fill has no seed-oil line on this SPL. Labeled 18+ on typical Migraine cartons; confirm the bottle. Ages 12+ Drug Facts still apply if the carton says 12 — this row uses the Migraine adult carton.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.advilMigraine} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.advilDualBack,
    productName: 'Advil Dual Action Back Pain',
    brand: 'Advil',
    category: PAIN_FEVER,
    barcode: '305730145183 305730145725',
    formulaId: ID.advilDualBack,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.advilDualBack, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.advilDualBack, METH.peg)),
      flag('Polydextrose', 'limited', dailymed(SET.advilDualBack, METH.polydextrose)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.advilDualBack, METH.sio2),
      ),
      flag(
        'Glyceryl dibehenate',
        'cleared',
        dailymed(SET.advilDualBack, METH.dibehenin),
      ),
      cleared(SET.advilDualBack, 'Croscarmellose sodium'),
      cleared(SET.advilDualBack, 'Hypromellose'),
      cleared(SET.advilDualBack, 'Pregelatinized starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Advil Dual Action Back Pain = Avoid. Driver is titanium dioxide (High). Distinct from advil-dual-action already on main (plain Dual Action, TiO2 only — do not reuse that id). Ferric oxides / pharmaceutical ink / polyvinyl-style coat aids are not in Methodology §5 (ungraded; not the Avoid drivers). Listed swap is a single-active analog, not a 250/125 replacement. Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: DUAL_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.advilDualBack} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.advilFilmMenstrual,
    productName: 'Advil Film-Coated / Menstrual Pain (ibuprofen sodium)',
    brand: 'Advil',
    category: PAIN_FEVER,
    formulaId: ID.advilFilmMenstrual,
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    activeIngredients: [
      { name: 'Ibuprofen (as ibuprofen sodium)', strength: '200mg' },
    ],
    inactiveIngredients: [
      flag(
        'Caramel color (undisclosed class)',
        'high',
        dailymed(SET.advilFilm, METH.caramel),
      ),
      flag('Titanium dioxide', 'high', dailymed(SET.advilFilm, METH.tio2)),
      flag('Acesulfame potassium', 'moderate', dailymed(SET.advilFilm, METH.acek)),
      flag('Sucralose', 'moderate', dailymed(SET.advilFilm, METH.sucralose)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.advilFilm, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.advilFilm, METH.pg)),
      flag(
        'Natural and artificial flavor',
        'limited',
        dailymed(SET.advilFilm, METH.flavors),
      ),
      flag('Mannitol', 'limited', dailymed(SET.advilFilm, METH.mannitol)),
      flag(
        'Medium-chain triglycerides (source not named)',
        'limited',
        dailymed(SET.advilFilm, METH.mctUnlabeled),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.advilFilm, METH.sio2),
      ),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET.advilFilm, METH.sls),
      ),
      flag('Copovidone', 'cleared', dailymed(SET.advilFilm, METH.copovidone)),
      cleared(SET.advilFilm, 'Carnauba wax'),
      cleared(SET.advilFilm, 'Hypromellose'),
      cleared(SET.advilFilm, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Advil Film-Coated / Menstrual Pain (ibuprofen sodium) = Avoid. Drivers are undisclosed-class caramel color + titanium dioxide (High). DailyMed setids 5be198b8 (film-coated) and ae1625f4 (Menstrual) list the same Other Ingredients — one formulaId, not cloned. ${MCT_UNLABELED_TAP} Ferric oxide / pharmaceutical ink are ungraded (not the Avoid drivers). SLS is standalone Caution, not the Avoid driver. Distinct from Advil tablets already on main (TiO2 + parabens). Ages 12+.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.advilFilm} (film-coated); menstrual twin ${SET.advilMenstrual} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.motrinDual,
    productName: 'Motrin Dual Action with Tylenol',
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450311801',
    formulaId: ID.motrinDual,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.motrinDual, METH.tio2)),
      flag('Talc', 'high', dailymed(SET.motrinDual, METH.talc)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.motrinDual, METH.peg)),
      flag('Sucralose', 'moderate', dailymed(SET.motrinDual, METH.sucralose)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.motrinDual, METH.sio2),
      ),
      cleared(SET.motrinDual, 'Corn starch'),
      cleared(SET.motrinDual, 'Croscarmellose sodium'),
      cleared(SET.motrinDual, 'Crospovidone'),
      cleared(SET.motrinDual, 'Microcrystalline cellulose'),
      cleared(SET.motrinDual, 'Povidone'),
      cleared(SET.motrinDual, 'Pregelatinized starch'),
      cleared(SET.motrinDual, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Motrin Dual Action with Tylenol = Avoid. Drivers are titanium dioxide + talc (High). Distinct from advil-dual-action (TiO2 only) and from Advil Dual Action Back Pain. Polyvinyl alcohol is not in Methodology §5 (ungraded; not the Avoid driver). Listed swap is a single-active analog, not a 250/125 replacement. Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: DUAL_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.motrinDual} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.motrinPm,
    productName: 'Motrin PM',
    brand: 'Motrin',
    category: SLEEP,
    barcode: '300450563200 300450563804',
    formulaId: ID.motrinPm,
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    activeIngredients: [
      { name: 'Ibuprofen', strength: '200mg' },
      { name: 'Diphenhydramine citrate', strength: '38mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.motrinPm, METH.tio2)),
      flag('Talc', 'high', dailymed(SET.motrinPm, METH.talc)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.motrinPm, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.motrinPm, METH.sio2),
      ),
      flag(
        'Glyceryl behenate',
        'cleared',
        dailymed(SET.motrinPm, METH.dibehenin),
      ),
      cleared(SET.motrinPm, 'Croscarmellose sodium'),
      cleared(SET.motrinPm, 'Hydroxypropyl cellulose'),
      cleared(SET.motrinPm, 'Lactose monohydrate'),
      cleared(SET.motrinPm, 'Magnesium stearate'),
      cleared(SET.motrinPm, 'Microcrystalline cellulose'),
      cleared(SET.motrinPm, 'Pregelatinized starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Motrin PM = Avoid. Drivers are titanium dioxide + talc (High). Distinct from Advil PM caplets / Liqui-Gels already on main. Polyvinyl alcohol is ungraded (not the Avoid driver). Diphenhydramine citrate 38 mg is the labeled PM-citrate salt. Labeled 2 caplets at bedtime. Ages 12+. ' +
      SEDATING,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.motrinPm} — ${UNVERIFIED_NOTE}`],
  }),

  // ── List 3 Caution — Motrin IB gels (KOH / sorbitan locks) ─
  row({
    id: ID.motrinIbGels,
    productName: 'Motrin IB Liquid Gels',
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450409126 300450409201',
    formulaId: ID.motrinIbGels,
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    activeIngredients: [{ name: 'Solubilized ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', dailymed(SET.motrinIbGels, METH.peg)),
      flag('Sorbitol', 'limited', dailymed(SET.motrinIbGels, METH.sorbitol)),
      flag('Sorbitan', 'cleared', dailymed(SET.motrinIbGels, METH.sorbitan)),
      flag(
        'Potassium hydroxide',
        'cleared',
        dailymed(SET.motrinIbGels, METH.koh),
      ),
      cleared(SET.motrinIbGels, 'Gelatin'),
      cleared(SET.motrinIbGels, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Motrin IB Liquid Gels = Caution. KOH is Cleared. Sorbitan is Caution (not Avoid, not sorbitol). PEG is Moderate (2 pts); sorbitol is Limited. No High on this SPL — overall Caution. ${KOH_TAP} ${SORBITAN_TAP} ${LIMITED_STACK} Pharmaceutical ink is ungraded appearance ink. Softgel fill has no seed-oil line on this SPL (not the gummy High rule). Distinct from Motrin IB caplets already on main (dyes + talc + TiO2 Avoid) and from Advil Liqui-Gels (Green #3 Avoid). Ages 12+.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.motrinIbGels} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.motrinIbMigraineGels,
    productName: 'Motrin IB Migraine Liquid Gels',
    brand: 'Motrin',
    category: PAIN_FEVER,
    formulaId: ID.motrinIbMigraineGels,
    audience: ADULT,
    minAge: 18,
    form: 'liquid gel',
    activeIngredients: [{ name: 'Solubilized ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET.motrinIbMigraineGels, METH.peg),
      ),
      flag('Sorbitol', 'limited', dailymed(SET.motrinIbMigraineGels, METH.sorbitol)),
      flag(
        'Sorbitan',
        'cleared',
        dailymed(SET.motrinIbMigraineGels, METH.sorbitan),
      ),
      flag(
        'Potassium hydroxide',
        'cleared',
        dailymed(SET.motrinIbMigraineGels, METH.koh),
      ),
      cleared(SET.motrinIbMigraineGels, 'Gelatin'),
      cleared(SET.motrinIbMigraineGels, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Motrin IB Migraine Liquid Gels = Caution. Same math as Motrin IB Liquid Gels: KOH Cleared + sorbitan Caution + PEG Moderate + sorbitol Limited → overall Caution (no High). ${KOH_TAP} ${SORBITAN_TAP} ${LIMITED_STACK} Own formulaId — do not merge into Motrin IB Liquid Gels or into Advil Migraine (that Advil row is dye Avoid). Softgel fill has no seed-oil line on this SPL. Confirm the carton age line (Migraine SKUs are often 18+).`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.motrinIbMigraineGels} — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

// Verdict tally (20 records): Clean 0 · Caution 6 · Avoid 14
// List 2: Avoid 14 / Caution 4 · List 3: Caution 2
