// DRAFT / not verified / batch 43 Goody’s / BC / Anacin / Bufferin /
// Ecotrin / St. Joseph leftover / methodology v1.6 + Sept 15
// potassium chloride Cleared lock on main.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. New in-scope US Pain & Fever / Sleep rows only.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent Clean. Do NOT invent UPCs /
// barcodes. Pack sizes of the same name+form+inactives share formulaId.
// Shared OI = one formulaId. Form is labeled on cleanAlternatives,
// not a hard filter (§6). Not wired into Clean Picks UI. No live
// Clean Picks file is edited. No photos. Letter tiles only on new
// ids. No fake Clean alts. No methodology rewrite.
//
// REUSE: 0. Nothing already on main for these brands.
//
// LIST 2 — proposed scan verdicts (12 formula rows).
// LIST 3 — founder lock applied, not re-derived (2 formula rows):
//   Potassium chloride (KCl) = Cleared (salt / electrolyte). Not a
//   grade driver. Goody’s Extra Strength + Back & Body Drug Facts
//   are lactose monohydrate + potassium chloride only → Clean.
//   Prefer separate formulaIds when actives differ (ES has caffeine;
//   Back & Body does not) even if the inactive OI matches.
//
// TALLY (unverified drafts in THIS file): 14 rows — Clean 2 /
// Caution 6 / Avoid 6.
// Independently Clean swaps: goodys-extra-strength /
// goodys-back-body (this batch); genuine-bayer-aspirin-325 /
// genexa-acetaminophen-es / hylands-calms-forte already on main.
// No Clean ibuprofen invented.
//
// LIST 4 is PR-comment only — no Search rows for Bufferin Hand
// Sanitizer; Bufferin Lidocaine cream (no OI); Bufferin Arthritis
// off-site (Dr. Reddy’s); Ecotrin 81 paraben SPL superseded
// (f950d4eb); Goody’s Migraine / PM caplets off brand nav; BC
// Sinus / Daytime Cough & Cold (cold/flu); Canada/EU; kits;
// false matches (Lil’ Drug Store BC Cherry).
//
// REFUSED: none. Ungraded inactives are notes-only; they do not
// change the founder-proposed verdict.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
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

const KCL_TAP =
  'Potassium chloride is the locked Cleared salt / electrolyte. Not a grade driver.';

const METHACRYLIC_TAP =
  'Methacrylic acid copolymer / unnamed delayed-release composites are the locked Caution enteric-coat row until specified. Standalone Caution, not additive-scored, not Avoid.';

const SLS_TAP =
  'Sodium lauryl sulfate is standalone Caution (irritant class, not additive-scored) and is not an Avoid driver.';

const TRIACETIN_TAP =
  'Triacetin is the locked Cleared tablet/caplet coating plasticizer. Not a grade driver.';

const SEDATING =
  'Nighttime first-generation antihistamine — labeled drowsiness will occur; next-day drowsiness can linger. Cleanliness grade only; no efficacy claim.';

const TABLET_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this coated-tablet fill they are not that High rule.';

const METH = {
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  polydextrose: 'Methodology §5 Limited-risk (polydextrose — maltodextrin-like)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  sls: `Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid). ${SLS_TAP}`,
  methacrylic: `Methodology §5 Caution (methacrylic acid copolymer / unnamed delayed-release composites — enteric coat; standalone Caution, not Avoid). ${METHACRYLIC_TAP}`,
  kcl: `Methodology §5 Cleared (potassium chloride — salt / electrolyte; locked Sept 15, 2026). ${KCL_TAP}`,
  triacetin: `Methodology §5 Cleared (triacetin — tablet/caplet coating plasticizer; locked Sept 15, 2026). ${TRIACETIN_TAP}`,
  simethicone:
    'Methodology §5 Cleared (simethicone — dimethicone family)',
  alginic: 'Methodology §5 Cleared (sodium alginate — alginic acid / gum-fiber family)',
  citrate: 'Methodology §5 Cleared (citrate salts as fillers/buffers)',
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

const GOODYS_ES = 'goodys-extra-strength';
const GOODYS_BB = 'goodys-back-body';
const GENUINE = 'genuine-bayer-aspirin-325';
const GENEXA_ES = 'genexa-acetaminophen-es';
const CALMS_FORTE = 'hylands-calms-forte';

const POWDER_COMBO_ALTS: CleanAlternative[] = [
  alt(
    GOODYS_ES,
    'Independently Clean in-batch Goody’s Extra Strength powder (lactose + KCl Cleared only). Same powder form. Combo / caffeine SKUs are not a 1:1 active match — cleanliness peer. Form labeled, not a hard filter (§6).',
  ),
  alt(
    GENEXA_ES,
    'Independently Clean adult acetaminophen Extra Strength already on main (founder-exception Clean). Same Pain & Fever shelf. Form: caplet vs powder — labeled, not a hard filter (§6). Not a combo replacement.',
  ),
];

const ASPIRIN_POWDER_ALTS: CleanAlternative[] = [
  alt(
    GENUINE,
    'Independently Clean Genuine Bayer Aspirin 325 coated already on main (triacetin Cleared). Same Pain & Fever shelf. Form: coated tablet vs powder — labeled, not a hard filter (§6). Not a caffeine-combo replacement.',
  ),
  alt(
    GOODYS_ES,
    'Independently Clean in-batch Goody’s Extra Strength powder (lactose + KCl Cleared). Form: powder — labeled, not a hard filter (§6). Adds acetaminophen; not a 1:1 aspirin-only swap.',
  ),
];

const ASPIRIN_TABLET_ALTS: CleanAlternative[] = [
  alt(
    GENUINE,
    'Independently Clean Genuine Bayer Aspirin 325 coated already on main (triacetin Cleared; no High / Limited / Caution on that SPL). Same Pain & Fever shelf. Form labeled, not a hard filter (§6).',
  ),
];

const SLEEP_ALTS: CleanAlternative[] = [
  alt(
    CALMS_FORTE,
    "Independently Clean adult Sleep analog already on main (Hyland's Calms Forte, homeopathic tablets). Form: tablet vs powder — labeled, not a hard filter (§6). Conventional sedating-antihistamine PM aids have no independently Clean match.",
  ),
];

const SET = {
  max: '02b3a604-3f09-47e7-add1-b9038b3a268b',
  coolOrange: '31212c97-9975-427e-bc3d-f7125f30299a',
  mixedFruit: '6cb758bf-5a50-46bb-96e7-65b810b12de0',
  plusAlert: '31ef6d07-d314-4d09-abcd-389ba66cbcc5',
  hangover: '0b0067e0-58b0-4581-aa4b-e398c32c559a',
  pm: 'db5d6c2b-688e-4e88-a42d-0fa2b0d8140b',
  bcOriginal: '226173d4-b6d5-4fe6-b24e-1cc5d1b31c88',
  bcArthritis: '3a85be2d-6548-4de5-8109-60e1ca2bfca3',
  bcCherry: 'c5fa6660-a549-49ff-ac2b-5799afa22ec5',
  bcMax: '1e2a07ab-23e6-49b4-a676-212dc6880f14',
  anacin: '51ab0ee3-3c94-424d-a30a-2d6c14e3d8ff',
  bufferin: '3543b2bf-1062-468a-a5dc-eabb2408af8c',
  ecotrin325: '36cb530b-25b2-4f62-a25d-aa04360815a8',
  ecotrin81: '222d187b-aae6-410b-baeb-b2bd42f5c676',
  stJoeEnteric: 'dbf40c7b-ce30-46f0-9dea-2ca8ff1c9f6f',
  stJoeChew: '248cd302-e380-4837-bdae-9df620b67e8a',
  extraStrength: 'd4325b17-23bc-44ac-868d-bb0886853a73',
  extraStrengthTwin: '16d774cc-4247-4bf8-9b5a-c338ffebda3d',
  backBody: '055d0288-61d4-48bc-b91f-6ecc1969beb8',
} as const;

const ID = {
  maxFlavored: 'goodys-max-triple-flavored',
  plus: 'goodys-plus-alert-hangover',
  pm: 'goodys-pm-powder',
  bcOriginal: 'bc-original-arthritis',
  bcCherry: 'bc-cherry',
  bcMax: 'bc-max',
  anacin: 'anacin-aspirin-caffeine',
  bufferin: 'bufferin-rs-325',
  ecotrin325: 'ecotrin-rs-325-enteric',
  ecotrin81: 'ecotrin-81-enteric-dye',
  stJoeEnteric: 'st-joseph-81-enteric',
  stJoeChew: 'st-joseph-81-chewable',
  extraStrength: GOODYS_ES,
  backBody: GOODYS_BB,
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

export const BATCH43_GOODYS_BC_ECOTRIN: RatingRecord[] = [
  // ── List 2 Caution — Goody’s / BC powders ────────────────
  row({
    id: ID.maxFlavored,
    productName: "Goody's Max Triple Action / Cool Orange / Mixed Fruit Blast",
    brand: "Goody's",
    category: PAIN_FEVER,
    barcode: '042037108458',
    formulaId: ID.maxFlavored,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg or 325mg' },
      { name: 'Aspirin', strength: '500mg' },
      { name: 'Caffeine', strength: '130mg or 65mg' },
    ],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET.max, METH.sucralose)),
      flag('Flavors', 'limited', dailymed(SET.max, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET.max, METH.mannitol)),
      flag('Colloidal silicon dioxide', 'cleared', dailymed(SET.max, METH.sio2)),
      cleared(SET.max, 'Guar gum'),
      cleared(SET.max, 'Microcrystalline cellulose'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Goody’s Max Triple Action + Cool Orange + Mixed Fruit Blast = Caution. Drivers are sucralose (Moderate) + flavors / mannitol (Limited) + silicon dioxide (0-pt Caution cap). ${LIMITED_STACK} DailyMed setids 02b3a604 (Max Triple Action / Tropical Citrus), 31212c97 (Cool Orange), and 6cb758bf (Mixed Fruit Blast) list the same Other Ingredients — one formulaId, not cloned. Actives differ (Max 500/500/130 vs Cool Orange and Mixed Fruit 325/500/65) but shared OI keeps one formulaId. Pack sizes share formulaId. Distinct from Extra Strength unflavored (lactose + KCl Clean) and from PLUS / Hangover (xylitol stack; no acetaminophen). Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'goodyspowder.com'],
    cleanAlternatives: POWDER_COMBO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.max} (Max Triple Action); Cool Orange twin ${SET.coolOrange}; Mixed Fruit Blast twin ${SET.mixedFruit} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.plus,
    productName: "Goody's PLUS Mental Alertness / Hangover",
    brand: "Goody's",
    category: PAIN_FEVER,
    barcode: '042037000813 042037001766 042037001773',
    formulaId: ID.plus,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Aspirin', strength: '1000mg' },
      { name: 'Caffeine', strength: '150mg' },
    ],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET.plusAlert, METH.sucralose)),
      flag('Xylitol', 'limited', dailymed(SET.plusAlert, METH.xylitol)),
      flag('Flavor', 'limited', dailymed(SET.plusAlert, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET.plusAlert, METH.mannitol)),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET.plusAlert, METH.sio2),
      ),
      cleared(SET.plusAlert, 'Guar gum'),
      cleared(SET.plusAlert, 'Microcrystalline cellulose'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Goody’s PLUS Mental Alertness + Hangover = Caution. Drivers are sucralose (Moderate) + xylitol / flavor / mannitol (Limited) + silicon dioxide (0-pt Caution cap). ${LIMITED_STACK} DailyMed setids 31ef6d07 (Mental Alert) and 0b0067e0 (Hangover) list the same Other Ingredients and the same actives (aspirin 1000 mg + caffeine 150 mg) — one formulaId, not cloned. Distinct from Max / Cool Orange / Mixed Fruit (those add acetaminophen; no xylitol). Same inactive stack as BC Max. Hangover carton is Berry Citrus Boost. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'goodyspowder.com'],
    cleanAlternatives: ASPIRIN_POWDER_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.plusAlert} (Mental Alert); Hangover twin ${SET.hangover} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.pm,
    productName: "Goody's PM powder",
    brand: "Goody's",
    category: SLEEP,
    barcode: '042037102951',
    formulaId: ID.pm,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Diphenhydramine citrate', strength: '38mg' },
    ],
    inactiveIngredients: [
      flag('Sodium benzoate', 'limited', dailymed(SET.pm, METH.benzoate)),
      flag('Silica gel', 'cleared', dailymed(SET.pm, METH.sio2)),
      flag('Potassium chloride', 'cleared', dailymed(SET.pm, METH.kcl)),
      flag('Sodium citrate dihydrate', 'cleared', dailymed(SET.pm, METH.citrate)),
      cleared(SET.pm, 'Citric acid'),
      cleared(SET.pm, 'Lactose monohydrate'),
      cleared(SET.pm, 'Magnesium stearate'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Goody’s PM powder = Caution. Drivers are sodium benzoate (Limited) + silica gel / silicon dioxide (0-pt Caution cap). ${LIMITED_STACK} ${KCL_TAP} DailyMed setid db5d6c2b. Distinct from Extra Strength (no diphenhydramine; Clean) and from the off-nav PM caplets (list 4). Docusate sodium, fumaric acid, and glycine are not in Methodology §5 (ungraded; v1.6 intake; notes-only — not required to reach Caution). Contains lactose. ${SEDATING} Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'goodyspowder.com'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.pm} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.bcOriginal,
    productName: 'BC Original / Arthritis powders',
    brand: 'BC',
    category: PAIN_FEVER,
    barcode: '042037103729 042037102838',
    formulaId: ID.bcOriginal,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Aspirin', strength: '845mg or 1000mg' },
      { name: 'Caffeine', strength: '65mg' },
    ],
    inactiveIngredients: [
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(SET.bcOriginal, METH.benzoate),
      ),
      flag(
        'Potassium chloride',
        'cleared',
        dailymed(SET.bcOriginal, METH.kcl),
      ),
      cleared(SET.bcOriginal, 'Lactose monohydrate'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: BC Original + Arthritis powders = Caution. Driver is sodium benzoate (Limited). ${LIMITED_STACK} ${KCL_TAP} DailyMed setids 226173d4 (Original, aspirin 845 mg) and 3a85be2d (Arthritis, aspirin 1000 mg) list the same Other Ingredients — one formulaId, not cloned. Distinct from BC Cherry (Ace-K / sucralose / flavor stack) and from BC Max (acetaminophen + xylitol stack). Docusate sodium and fumaric acid are not in Methodology §5 (ungraded; v1.6 intake; notes-only — not required to reach Caution). Contains lactose. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'bcpowder.com'],
    cleanAlternatives: ASPIRIN_POWDER_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.bcOriginal} (Original); Arthritis twin ${SET.bcArthritis} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.bcCherry,
    productName: 'BC Cherry powder',
    brand: 'BC',
    category: PAIN_FEVER,
    barcode: '042037104917',
    formulaId: ID.bcCherry,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Aspirin', strength: '845mg' },
      { name: 'Caffeine', strength: '65mg' },
    ],
    inactiveIngredients: [
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed(SET.bcCherry, METH.acek),
      ),
      flag('Sucralose', 'moderate', dailymed(SET.bcCherry, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET.bcCherry, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET.bcCherry, METH.mannitol)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.bcCherry, METH.sio2),
      ),
      cleared(SET.bcCherry, 'Guar gum'),
      cleared(SET.bcCherry, 'Microcrystalline cellulose'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: BC Cherry powder = Caution. Drivers are Ace-K + sucralose (Moderate) + flavor / mannitol (Limited) + silicon dioxide (0-pt Caution cap). ${LIMITED_STACK} DailyMed setid c5fa6660 (Medtech). Distinct from Original / Arthritis (benzoate + KCl; no sweeteners) and from Lil’ Drug Store BC Cherry (list 4 false match). Ages 12+.`,
    retailers: [...PF_RETAILERS, 'bcpowder.com'],
    cleanAlternatives: ASPIRIN_POWDER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.bcCherry} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.bcMax,
    productName: 'BC Max powder',
    brand: 'BC',
    category: PAIN_FEVER,
    barcode: '042037000974',
    formulaId: ID.bcMax,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Aspirin', strength: '500mg' },
      { name: 'Caffeine', strength: '65mg' },
    ],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET.bcMax, METH.sucralose)),
      flag('Xylitol', 'limited', dailymed(SET.bcMax, METH.xylitol)),
      flag('Flavor', 'limited', dailymed(SET.bcMax, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET.bcMax, METH.mannitol)),
      flag('Silicon dioxide', 'cleared', dailymed(SET.bcMax, METH.sio2)),
      cleared(SET.bcMax, 'Guar gum'),
      cleared(SET.bcMax, 'Microcrystalline cellulose'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: BC Max powder = Caution. Same inactive stack as Goody’s PLUS (sucralose + xylitol / flavor / mannitol + SiO₂). ${LIMITED_STACK} DailyMed setid 1e2a07ab. Own formulaId — actives add acetaminophen 500 mg (PLUS is aspirin 1000 / caffeine 150 only). Lemonade flavor on the current carton. Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'bcpowder.com'],
    cleanAlternatives: POWDER_COMBO_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.bcMax} — ${UNVERIFIED_NOTE}`],
  }),

  // ── List 2 Avoid — coated / enteric / chewable ───────────
  row({
    id: ID.anacin,
    productName: 'Anacin aspirin-caffeine coated',
    brand: 'Anacin',
    category: PAIN_FEVER,
    barcode: '363736200459',
    formulaId: ID.anacin,
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    activeIngredients: [
      { name: 'Aspirin', strength: '400mg' },
      { name: 'Caffeine', strength: '32mg' },
    ],
    inactiveIngredients: [
      flag('Talc', 'high', dailymed(SET.anacin, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.anacin, METH.tio2)),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET.anacin, METH.sls),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET.anacin, METH.sio2),
      ),
      flag('Triacetin', 'cleared', dailymed(SET.anacin, METH.triacetin)),
      cleared(SET.anacin, 'Corn starch'),
      cleared(SET.anacin, 'Croscarmellose sodium'),
      cleared(SET.anacin, 'Hypromellose'),
      cleared(SET.anacin, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Anacin aspirin-caffeine coated = Avoid. Drivers are talc + titanium dioxide (High). DailyMed setid 51ab0ee3. ${SLS_TAP} ${TRIACETIN_TAP} Mineral oil on the Drug Facts coat is not in Methodology §5 (ungraded coat aid; not the Avoid driver). ${TABLET_OIL_LINE} Silicon dioxide is the 0-pt Caution cap, not needed to reach Avoid. Listed swap is a single-active analog, not a 400/32 replacement. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'anacin.com'],
    cleanAlternatives: ASPIRIN_TABLET_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.anacin} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.bufferin,
    productName: 'Bufferin Regular Strength 325 coated',
    brand: 'Bufferin',
    category: PAIN_FEVER,
    formulaId: ID.bufferin,
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    activeIngredients: [{ name: 'Aspirin (buffered)', strength: '325mg' }],
    inactiveIngredients: [
      flag('Talc', 'high', dailymed(SET.bufferin, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.bufferin, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.bufferin, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.bufferin, METH.pg)),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET.bufferin, METH.sls),
      ),
      flag(
        'Simethicone',
        'cleared',
        dailymed(SET.bufferin, METH.simethicone),
      ),
      cleared(SET.bufferin, 'Anhydrous citric acid'),
      cleared(SET.bufferin, 'Corn starch'),
      cleared(SET.bufferin, 'Hypromellose'),
      cleared(SET.bufferin, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Bufferin Regular Strength 325 coated (Genomma) = Avoid. Drivers are talc + titanium dioxide (High). DailyMed setid 3543b2bf. Carton lists buffered aspirin equal to 325 mg (buffered with calcium carbonate, magnesium carbonate, and magnesium oxide — buffer pair, not a second grade). Oral PEG / PG are Moderate (not needed to reach Avoid). ${SLS_TAP} Hydrogenated vegetable oil, dibasic sodium phosphate anhydrous, and shellac wax are not in Methodology §5 (ungraded; not the Avoid drivers). ${TABLET_OIL_LINE} Distinct from Bufferin Hand Sanitizer / lidocaine cream / off-site Arthritis (list 4). Ages 12+.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: ASPIRIN_TABLET_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.bufferin} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.ecotrin325,
    productName: 'Ecotrin Regular Strength 325 enteric',
    brand: 'Ecotrin',
    category: PAIN_FEVER,
    barcode: '042037103798',
    formulaId: ID.ecotrin325,
    audience: ADULT,
    minAge: 12,
    form: 'enteric-coated tablet',
    activeIngredients: [{ name: 'Aspirin', strength: '325mg' }],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET.ecotrin325, METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.ecotrin325, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET.ecotrin325, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.ecotrin325, METH.tio2)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET.ecotrin325, METH.peg),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed(SET.ecotrin325, METH.pg),
      ),
      flag(
        'Polydextrose',
        'limited',
        dailymed(SET.ecotrin325, METH.polydextrose),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.ecotrin325, METH.sio2),
      ),
      flag(
        'Simethicone',
        'cleared',
        dailymed(SET.ecotrin325, METH.simethicone),
      ),
      flag(
        'Sodium alginate',
        'cleared',
        dailymed(SET.ecotrin325, METH.alginic),
      ),
      flag('Triacetin', 'cleared', dailymed(SET.ecotrin325, METH.triacetin)),
      cleared(SET.ecotrin325, 'Cellulose'),
      cleared(SET.ecotrin325, 'Corn starch'),
      cleared(SET.ecotrin325, 'Hypromellose'),
      cleared(SET.ecotrin325, 'Sodium bicarbonate'),
      cleared(SET.ecotrin325, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Ecotrin Regular Strength 325 enteric = Avoid. Drivers are Yellow #10 + Yellow #6 lakes + talc + titanium dioxide (High). Brand Drug Facts / DailyMed setid 36cb530b — no parabens on the current carton OI (structured leftover paraben rows on that SPL are not the label list). SEPARATE formulaId from Ecotrin 81 dye (222d187b — croscarmellose + MCC; same High stack). Do not write the superseded 81 paraben SPL f950d4eb (list 4). Black iron oxide, polyvinyl acetate phthalate, shellac wax, and triethyl citrate are not in Methodology §5 (ungraded; not the Avoid drivers). ${TRIACETIN_TAP} Pack sizes share formulaId. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'ecotrin.com'],
    cleanAlternatives: ASPIRIN_TABLET_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ecotrin325} (brand Drug Facts OI, no parabens) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ecotrin81,
    productName: 'Ecotrin 81 enteric dye',
    brand: 'Ecotrin',
    category: PAIN_FEVER,
    barcode: '042037103132 042037103750',
    formulaId: ID.ecotrin81,
    audience: ADULT,
    minAge: 12,
    form: 'enteric-coated tablet',
    activeIngredients: [{ name: 'Aspirin', strength: '81mg' }],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET.ecotrin81, METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.ecotrin81, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET.ecotrin81, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.ecotrin81, METH.tio2)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET.ecotrin81, METH.peg),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed(SET.ecotrin81, METH.pg),
      ),
      flag(
        'Polydextrose',
        'limited',
        dailymed(SET.ecotrin81, METH.polydextrose),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.ecotrin81, METH.sio2),
      ),
      flag(
        'Simethicone',
        'cleared',
        dailymed(SET.ecotrin81, METH.simethicone),
      ),
      flag(
        'Sodium alginate',
        'cleared',
        dailymed(SET.ecotrin81, METH.alginic),
      ),
      flag('Triacetin', 'cleared', dailymed(SET.ecotrin81, METH.triacetin)),
      cleared(SET.ecotrin81, 'Corn starch'),
      cleared(SET.ecotrin81, 'Croscarmellose sodium'),
      cleared(SET.ecotrin81, 'Hypromellose'),
      cleared(SET.ecotrin81, 'Microcrystalline cellulose'),
      cleared(SET.ecotrin81, 'Sodium bicarbonate'),
      cleared(SET.ecotrin81, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Ecotrin 81 enteric dye = Avoid. Same High stack as Regular Strength 325 (Yellow #10 + Yellow #6 lakes + talc + TiO₂). DailyMed setid 222d187b. Own formulaId — 81 Drug Facts add croscarmellose + MCC (325 says cellulose). Not the superseded paraben SPL f950d4eb (list 4). Black iron oxide, polyvinyl acetate phthalate, shellac wax, and triethyl citrate are ungraded (not the Avoid drivers). ${TRIACETIN_TAP} Pack sizes share formulaId. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'ecotrin.com'],
    cleanAlternatives: ASPIRIN_TABLET_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.ecotrin81} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.stJoeEnteric,
    productName: 'St. Joseph 81 enteric',
    brand: 'St. Joseph',
    category: PAIN_FEVER,
    barcode: '816526010016',
    formulaId: ID.stJoeEnteric,
    audience: ADULT,
    minAge: 12,
    form: 'enteric-coated tablet',
    activeIngredients: [{ name: 'Aspirin', strength: '81mg' }],
    inactiveIngredients: [
      flag('FD&C Red No. 40', 'high', dailymed(SET.stJoeEnteric, METH.dyes)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET.stJoeEnteric, METH.dyes)),
      flag('Talc', 'high', dailymed(SET.stJoeEnteric, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.stJoeEnteric, METH.tio2)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET.stJoeEnteric, METH.peg),
      ),
      flag(
        'Polydextrose',
        'limited',
        dailymed(SET.stJoeEnteric, METH.polydextrose),
      ),
      flag(
        'Methacrylic acid-ethyl acrylate copolymer',
        'cleared',
        dailymed(SET.stJoeEnteric, METH.methacrylic),
      ),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET.stJoeEnteric, METH.sls),
      ),
      flag(
        'Colloidal anhydrous silica',
        'cleared',
        dailymed(SET.stJoeEnteric, METH.sio2),
      ),
      flag(
        'Simethicone',
        'cleared',
        dailymed(SET.stJoeEnteric, METH.simethicone),
      ),
      flag('Triacetin', 'cleared', dailymed(SET.stJoeEnteric, METH.triacetin)),
      cleared(SET.stJoeEnteric, 'Hypromellose'),
      cleared(SET.stJoeEnteric, 'Microcrystalline cellulose'),
      cleared(SET.stJoeEnteric, 'Pregelatinized starch'),
      cleared(SET.stJoeEnteric, 'Sodium bicarbonate'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: St. Joseph 81 enteric = Avoid. Drivers are Red #40 + Yellow #6 + talc + titanium dioxide (High). DailyMed setid dbf40c7b. ${METHACRYLIC_TAP} ${SLS_TAP} Shellac wax and triethyl citrate are not in Methodology §5 (ungraded; not the Avoid drivers). ${TRIACETIN_TAP} SEPARATE from the orange chewable (Yellow #6 lake only; no enteric coat). Pack sizes share formulaId. Ages 12+ (adult aspirin regimen; children under 12: consult a doctor on the carton).`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: ASPIRIN_TABLET_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.stJoeEnteric} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.stJoeChew,
    productName: 'St. Joseph 81 chewable',
    brand: 'St. Joseph',
    category: PAIN_FEVER,
    barcode: '816526010047',
    formulaId: ID.stJoeChew,
    audience: ADULT,
    minAge: 12,
    form: 'chewable',
    activeIngredients: [{ name: 'Aspirin', strength: '81mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.stJoeChew, METH.dyes),
      ),
      flag('Sucralose', 'moderate', dailymed(SET.stJoeChew, METH.sucralose)),
      flag('Maltodextrin', 'limited', dailymed(SET.stJoeChew, METH.maltodextrin)),
      flag('Flavor', 'limited', dailymed(SET.stJoeChew, METH.flavors)),
      cleared(SET.stJoeChew, 'Corn starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: St. Joseph 81 chewable = Avoid. Driver is Yellow #6 aluminum lake (High). DailyMed setid 248cd302 (orange flavored). Sucralose is Moderate; maltodextrin + flavor are Limited (not needed to reach Avoid). Dextrates hydrated are not in Methodology §5 (ungraded starch/sugar mix; notes-only — Avoid already stands on the dye). SEPARATE formulaId from the 81 enteric (Red #40 + Yellow #6 + talc + TiO₂). Ages 12+ (adult aspirin regimen; children under 12: consult a doctor on the carton).',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: ASPIRIN_TABLET_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.stJoeChew} — ${UNVERIFIED_NOTE}`],
  }),

  // ── List 3 Clean — KCl lock ──────────────────────────────
  row({
    id: ID.extraStrength,
    productName: "Goody's Extra Strength powder",
    brand: "Goody's",
    category: PAIN_FEVER,
    barcode: '042037103668 042037103651',
    formulaId: ID.extraStrength,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '260mg' },
      { name: 'Aspirin', strength: '520mg' },
      { name: 'Caffeine', strength: '32.5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Potassium chloride',
        'cleared',
        dailymed(SET.extraStrength, METH.kcl),
      ),
      cleared(SET.extraStrength, 'Lactose monohydrate'),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: Goody’s Extra Strength powder = Clean. Potassium chloride is Cleared. DailyMed setids d4325b17 and 16d774cc Drug Facts list lactose monohydrate + potassium chloride only — no High / Limited / Caution left. ${KCL_TAP} Pack sizes / carton twins share formulaId (same actives 260/520/32.5). SEPARATE from Back & Body (no caffeine; different actives → own formulaId even though the inactive OI matches). Distinct from Max / Cool Orange / Mixed Fruit (sucralose + flavors Caution). Contains lactose. Confirm the carton matches this unflavored list. Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'goodyspowder.com'],
    sourcesGeneral: [
      `DailyMed setid ${SET.extraStrength}; carton twin ${SET.extraStrengthTwin} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.backBody,
    productName: "Goody's Back & Body powder",
    brand: "Goody's",
    category: PAIN_FEVER,
    barcode: '042037102906',
    formulaId: ID.backBody,
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg' },
      { name: 'Aspirin', strength: '500mg' },
    ],
    inactiveIngredients: [
      flag('Potassium chloride', 'cleared', dailymed(SET.backBody, METH.kcl)),
      cleared(SET.backBody, 'Lactose monohydrate'),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: Goody’s Back & Body powder = Clean. Potassium chloride is Cleared. DailyMed setid 055d0288 Drug Facts list lactose monohydrate + potassium chloride only — no High / Limited / Caution left. ${KCL_TAP} Own formulaId from Extra Strength (this row has no caffeine; actives 325/500 vs ES 260/520/32.5) even though the inactive OI matches. Distinct from Bayer Back & Body caplets already on main. Contains lactose. Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'goodyspowder.com'],
    sourcesGeneral: [`DailyMed setid ${SET.backBody} — ${UNVERIFIED_NOTE}`],
  }),
];

// Verdict tally (14 records): Clean 2 · Caution 6 · Avoid 6
// List 2: Caution 6 / Avoid 6 · List 3: Clean 2
// Refused: none
