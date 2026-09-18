// DRAFT / not verified / batch 37 MediNatura + Boericke & Tafel /
// methodology v1.6 + Sept 14–15 locks + this-pass founder cream/gel/syrup
// locks. Founder owns final Avoid vs Caution vs Clean.
//
// TWO banners, ONE write. MediNatura (T-Relief, Traumeel, BHI, ClearLife,
// ReBoost, WellMind, BodyAnew) and Boericke & Tafel (Schwabe / Nature’s
// Way). Mixed categories · recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Do NOT invent Clean. Do
// NOT invent UPCs / barcodes except KYR5-b catch-up allowlist. Pack sizes of same name+form+strength
// share formulaId. formulaId == id on every NEW row. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Not wired into Clean Picks
// UI. No live Clean Picks file is edited. No photos. Letter tiles only
// on new ids. No fake Clean alts. No methodology rewrite. Traumeel ≠
// T-Relief (different actives — do NOT reuse as one formula). BHI each
// own row. Zero of these brands already on main — nothing cloned.
//
// TALLY (unverified drafts in THIS file): 39 rows — Clean 1 /
// Caution 38 / Avoid 0.
// Independently Clean in THIS batch: Traumeel Tablets (lactose +
// magnesium stearate = 0 pt). Limited-only never Avoid. Avoid needs
// High. SiO2 Caution cap is inactive-only (BHI Migraine Silicea 10X is
// a homeopathic ACTIVE — not that cap).
//
// LIST 2 — proposed scan verdicts applied (27 formula rows).
// LIST 3 — founder locks applied, not re-derived (12 formula rows):
// - Cream safflower / soy oil + sunflower seed wax + aloe + paraffin /
//   mineral oil ointment + witch hazel + glycol stearate / IPM /
//   stearyl heptanoate = Cleared (form taps: cream/ointment/gel fill ≠
//   gummy seed-oil High).
// - Sodium polyacrylate / polyacrylic acid = Caution.
// - Pine / citronella / eucalyptus / jojoba as gel inactives = Caution.
// - Oat = Cleared. Barley malt = Limited.
//
// REFUSED (do not invent OI): none. Every write row has a DailyMed SPL
// or a named brand-page OI line (Arthritis Extra Strength Cream).
//
// LIST 4 is PR-comment only — see the pull request body. Do not add
// Search rows for those SKUs.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const PAIN_FEVER = 'Pain & Fever';
const COLD_FLU = 'Cold & Flu';
const ALLERGIES = 'Allergies';
const SLEEP = 'Sleep';
const DIGESTIVE = 'Digestive';
const FIRST_AID = 'First Aid';

const BRAND_MN = 'MediNatura';
const BRAND_BT = 'Boericke & Tafel';

const MN_RETAILERS = [
  'MediNatura.com',
  'Amazon',
  'Whole Foods',
  'Sprouts',
  'Thrive',
] as const;

const BT_RETAILERS = [
  "Nature's Way",
  'Amazon',
  'Whole Foods',
  'Sprouts',
  'Thrive',
  'Walmart',
  'Walgreens',
] as const;

const CREAM_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this cream they are not that High rule.';

const OINTMENT_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this ointment they are not that High rule.';

const ALCOHOL_VEHICLE_LINE =
  'Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid.';

const STEVIA_LEAF_TAP =
  'Stevia leaf / Stevia rebaudiana leaf is the whole-leaf / crude Caution row. It is not high-purity Reb A / Reb M (Cleared).';

const MCT_COCONUT_CREAM_TAP =
  'Caprylic/capric triglycerides are labeled from coconut on this panel — Cleared coconut MCT on a cream (not a cooking-oil bottle), and not the gummy seed-oil High rule.';

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglycerides and does not name coconut on that line. We mark that Limited because the source isn’t clear. MCT labeled from coconut is Cleared on oral capsule/softgel/liquid supplements and on this cream form when the carton names coconut.';

const POLYACRYLATE_TAP =
  'Sodium polyacrylate / polyacrylic acid is a founder-locked Caution on this cream pass. Not Avoid.';

const PINE_TAP =
  'Pine needle oil as a gel inactive is a founder-locked Caution on this pass. Not the gummy seed-oil High rule. Not Avoid.';

const CITRONELLA_TAP =
  'Citronella / eucalyptus / jojoba as gel inactives are founder-locked Caution on this pass. Not Avoid.';

const OAT_TAP =
  'Oat is a founder-locked Cleared on this pass. Barley malt is the Limited twin — do not merge the two.';

const BARLEY_TAP =
  'Barley malt is a founder-locked Limited on this pass. Oat is Cleared. This carton is the oat formula (no barley malt).';

const KOH_TAP =
  'Potassium hydroxide is the pH-adjuster alkali on this cream. Sodium hydroxide as pH adjuster is the locked Cleared row — this carton uses the potassium salt for the same job. Draft-row tap only; not a methodology rewrite.';

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const METH = {
  cleared: 'Methodology §5 Cleared',
  maltodextrin:
    'Methodology §5 Limited-risk (organic maltodextrin — same Limited as non-organic)',
  fructose: 'Methodology §5 Limited-risk (fructose as sweetener — treat with sugars; not High)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  cherryFlavor: 'Methodology §5 Limited-risk (cherry flavor — flavor-opacity / Limited flavor row)',
  alcoholVehicle: `Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE). ${ALCOHOL_VEHICLE_LINE} Not Avoid.`,
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  carrageenan: 'Methodology §5 Limited-risk (carrageenan)',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  mctCoconut: `Methodology §5 Cleared (MCT oil labeled coconut — cream / topical, not a cooking-oil bottle; not gummy High). ${MCT_COCONUT_CREAM_TAP}`,
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  steviaLeaf: `Methodology §5 Caution (whole-leaf / crude stevia — do not auto-Clean; not Reb A / Reb M). ${STEVIA_LEAF_TAP}`,
  benzylAdult:
    'Methodology §5 Caution (benzyl alcohol — population split is oral/infant Avoid; this carton is not under-3 / infant. Adult topical — standalone Caution, not additive-scored, not Avoid)',
  polyacrylate: `Founder lock this pass (sodium polyacrylate / polyacrylic acid = Caution, not Avoid). ${POLYACRYLATE_TAP}`,
  pine: `Founder lock this pass (pine needle oil as a gel inactive = Caution, not Avoid). ${PINE_TAP}`,
  citronella: `Founder lock this pass (citronella / eucalyptus / jojoba as gel inactives = Caution, not Avoid). ${CITRONELLA_TAP}`,
  oat: `Founder lock this pass (oat = Cleared). ${OAT_TAP}`,
  barley: `Founder lock this pass (barley malt = Limited). ${BARLEY_TAP}`,
  creamOil: `Methodology §5 Cleared (shea / coconut / sweet almond / cream vegetable oil — not the gummy seed-oil High rule). ${CREAM_OIL_LINE}`,
  safflower: `Founder lock this pass (cream safflower / soy oil = Cleared; not gummy High). ${CREAM_OIL_LINE}`,
  soyCream: `Founder lock this pass (cream soy oil = Cleared; not gummy High). ${CREAM_OIL_LINE}`,
  seedWax: 'Founder lock this pass (sunflower seed wax = Cleared). Not the gummy seed-oil High rule.',
  aloe: 'Founder lock this pass (aloe = Cleared)',
  paraffin: `Founder lock this pass (paraffin / mineral oil ointment = Cleared). ${OINTMENT_OIL_LINE}`,
  mineralOil: `Founder lock this pass (mineral oil ointment / cream = Cleared). ${OINTMENT_OIL_LINE}`,
  witchHazel: 'Founder lock this pass (witch hazel = Cleared)',
  glycolStearate:
    'Founder lock this pass (glycol stearate / isopropyl myristate / stearyl heptanoate = Cleared)',
  ipm: 'Founder lock this pass (isopropyl myristate / glycol stearate / stearyl heptanoate = Cleared)',
  stearylHeptanoate:
    'Founder lock this pass (stearyl heptanoate / glycol stearate / IPM = Cleared)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family)',
  petrolatum: 'Methodology §5 Cleared (petrolatum, topical — first-aid ointment base)',
  carbomer: 'Methodology §5 Cleared (carbomer homopolymer)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster)',
  koh: `Methodology §5 Cleared (sodium hydroxide as pH adjuster — locked). ${KOH_TAP}`,
  tocopherol: 'Methodology §5 Cleared (mixed tocopherols / vitamin E as antioxidant)',
  namedBotanical:
    'Methodology §5 Cleared (named food/botanical extract as inactive — same class as grape seed extract). Do not Caution the product on these extracts alone.',
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

function dmUrl(setid: string): string {
  return `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function homeopathicFields() {
  return {
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

function homeoNote(lead: string): string {
  return `${lead} Homeopathic — cleanliness only, no efficacy claim. ${CARLSTON} Pack sizes of the same name+form+strength share formulaId. ${LIMITED_STACK} Draft, not verified.`;
}

const ID = {
  traumeelTabs: 'medinatura-traumeel-tablets',
  tReliefXsDrops: 'medinatura-t-relief-xs-oral-drops',
  tReliefXsGel: 'medinatura-t-relief-xs-gel',
  tReliefPainGel: 'medinatura-t-relief-pain-gel',
  tReliefXsTabs: 'medinatura-t-relief-xs-tablets',
  tReliefPainTabs: 'medinatura-t-relief-pain-tablets',
  tReliefArthXsTabs: 'medinatura-t-relief-arthritis-xs-tablets',
  clearlifeTabs: 'medinatura-clearlife-allergy-tablets',
  reboostZincLemon: 'medinatura-reboost-cold-flu-zinc-lemon',
  reboostSpray: 'medinatura-reboost-sore-throat-spray-cherry',
  wellmindCalm: 'medinatura-wellmind-calming-tablets',
  bodyanewDrops: 'medinatura-bodyanew-cleanse-drops',
  bhiAllergy: 'medinatura-bhi-allergy',
  bhiArthritis: 'medinatura-bhi-arthritis',
  bhiBack: 'medinatura-bhi-back',
  bhiCalming: 'medinatura-bhi-calming-support',
  bhiConstipation: 'medinatura-bhi-constipation',
  bhiDiarrhea: 'medinatura-bhi-diarrhea',
  bhiFlu: 'medinatura-bhi-flu-cold',
  bhiHemorrhoid: 'medinatura-bhi-hemorrhoid',
  bhiMigraine: 'medinatura-bhi-migraine',
  bhiMucus: 'medinatura-bhi-mucus',
  bhiNausea: 'medinatura-bhi-nausea',
  bhiSinus: 'medinatura-bhi-sinus-congestion',
  bhiSkin: 'medinatura-bhi-skin-eczema',
  bhiSpasm: 'medinatura-bhi-spasm-cramp',
  bhiTraumex: 'medinatura-bhi-traumex',
  tReliefPainCream: 'medinatura-t-relief-pain-cream',
  tReliefXsCream: 'medinatura-t-relief-xs-cream',
  tReliefArthXsCream: 'medinatura-t-relief-arthritis-xs-cream',
  tReliefLido: 'medinatura-t-relief-lidocaine-4-cream',
  traumeelOint: 'medinatura-traumeel-ointment',
  arniflora: 'bt-arniflora-arnica-gel',
  triflora: 'bt-triflora-arthritis-gel',
  ssssting: 'bt-ssssting-stop-gel',
  florasone: 'bt-florasone-cream',
  psoriaflora: 'bt-psoriaflora-cream',
  coughDay: 'bt-cough-bronchial-daytime',
  coughNight: 'bt-cough-bronchial-nighttime',
} as const;

// KYR5-b in-store 1s/2s — MediNatura 3 oz Arthritis Extra Strength Cream
// (retailer UPC; no current DailyMed SPL).
const BATCH37_CATCHUP_BARCODES: Record<string, string> = {
  [ID.tReliefArthXsCream]: '787647101801',
  [ID.traumeelTabs]: '787647302024',
  [ID.reboostSpray]: '787647300969',
  [ID.reboostZincLemon]: '787647201518',
  [ID.bhiTraumex]: '787647948406',
  [ID.arniflora]: '308078250977',
  [ID.triflora]: '308078252971',
  [ID.ssssting]: '308078253909',
  [ID.florasone]: '308078503905',
  // KYR5-c barcode-tile chunk 1 — Nature's Way brand PDP Other Details
  // UPC 308078509907 for 1 oz (28 g) cream.
  [ID.psoriaflora]: '308078509907',
  [ID.coughDay]: '359800162518 359800162525',
  [ID.coughNight]: '359800162785',
  [ID.tReliefXsDrops]: '787647101429',
  [ID.tReliefXsGel]: '787647853007',
  [ID.tReliefPainGel]: '787647200948',
  [ID.tReliefXsTabs]: '787647852802',
  [ID.tReliefPainTabs]: '787647101030',
  [ID.tReliefArthXsTabs]: '787647301959',
  [ID.clearlifeTabs]: '787647310067',
  [ID.wellmindCalm]: '787647704033',
  [ID.bodyanewDrops]: '787647201181',
  [ID.bhiAllergy]: '787647100019',
  [ID.bhiArthritis]: '787647100026',
  [ID.bhiBack]: '787647100040',
  [ID.bhiCalming]: '787647100101',
  [ID.bhiConstipation]: '787647100163',
  [ID.bhiDiarrhea]: '787647100187',
  [ID.bhiFlu]: '787647200917',
  [ID.bhiHemorrhoid]: '787647100354',
  [ID.bhiMigraine]: '787647100323',
  [ID.bhiMucus]: '787647100088',
  [ID.bhiNausea]: '787647100507',
  [ID.bhiSinus]: '787647100606',
  [ID.bhiSkin]: '787647100613',
  [ID.bhiSpasm]: '787647100637',
  [ID.tReliefPainCream]: '787647101771',
  [ID.tReliefXsCream]: '787647852819',
  [ID.tReliefLido]: '787647948598',
  [ID.traumeelOint]: '787647853090',
};

const SET = {
  traumeelTabs: '39630b57-28b1-486b-a4ff-4af65324454f',
  tReliefXsDrops: '01804104-32c2-4011-a2e4-0f4e74bd974d',
  tReliefXsGel: 'e4bf2e39-5635-4797-8519-7e115e8b1a27',
  tReliefPainGel: 'edb2fe62-e990-4cef-8600-9d1b85bffa5a',
  tReliefXsTabs: '97959b87-690d-45c1-9319-c17cdfa85020',
  tReliefPainTabs: '2bd442ca-0bbe-0bc3-e054-00144ff8d46c',
  tReliefArthXsTabs: 'dbfd6183-a058-4292-ab99-31a60b1dd215',
  clearlifeTabs: '088ba0ac-8ffa-4057-8286-88765c228f39',
  reboostZincLemon: '781c1a63-5210-4069-8427-bc7df68d6d63',
  reboostSpray: 'd26137fa-6916-473a-9518-b0613e5cbcce',
  wellmindCalm: 'df97b188-efa3-4432-b9f0-5afe33a04136',
  bodyanewKit: 'e5f86823-624d-44a6-830f-2d5c7187fdef',
  bhiAllergy: 'e985b147-fec1-42c2-819a-67796cc2ced1',
  bhiArthritis: 'd58c4651-2871-4beb-b1f5-e01a793cbc44',
  bhiBack: 'aa622a5b-16de-4098-9c3f-d7569f7d2c2f',
  bhiCalming: '681b7b04-9dd9-493a-88dc-b3178069a903',
  bhiConstipation: '0365b75b-fee4-4c1d-89ab-c692bdd73f75',
  bhiDiarrhea: '6e58f888-429a-4497-8fe5-4ccd829fcb28',
  bhiFlu: '8d73082d-a1bc-4e76-9714-49f718b5850b',
  bhiHemorrhoid: 'd7df7d3e-48ad-4f58-aef5-a7bd48d2f191',
  bhiMigraine: '11cad8ba-6914-420e-bab0-4ca37d33f2e6',
  bhiMucus: '6338dc4f-b2d9-4b9a-a397-0440cbd1345a',
  bhiNausea: 'c038c390-9e70-4fc7-87dc-84e679ee69fc',
  bhiSinus: 'cb11ccaf-7569-4cf3-8064-811c7db11001',
  bhiSkin: '70ab2931-bd2d-43de-bb36-d019f78e3d73',
  bhiSpasm: '3e117ea6-bbb2-4b77-b3ce-01572e6d71c1',
  bhiTraumex: '335c8bec-f0c3-4b95-a6a6-5fda262be0e6',
  tReliefPainCream: '1fcfd0a5-b4ff-4546-e054-00144ff8d46c',
  tReliefXsCream: '12f6cf2f-a924-42b1-9ca0-c360c7a59244',
  tReliefLido: '3c19aff8-fb18-78d0-e063-6294a90a9481',
  traumeelOint: 'c9962e63-3c30-4c62-9caf-91f663c7eeaa',
  arniflora: '935bf19d-a32c-49b8-a5cc-13e7ddfb23fe',
  triflora: '0f7796ae-a20e-431f-bdec-bca7415b468f',
  ssssting: 'b01fe801-7316-11df-93f2-0800200c9a66',
  florasone: '0ea5879c-5955-427d-8604-a0677a4bb5cd',
  psoriaflora: '67f13a07-07c6-41ae-8ff4-29a105db43b2',
  coughDay: 'ab0a4fd6-2311-4dd4-a146-949b86bfb4e7',
  coughNight: '31445469-8f7f-4729-8128-fc53d5e5ab06',
} as const;

const ARTH_CREAM_CITE =
  'https://www.medinatura.com/products/t-relief-arthritis-extra-strength-3oz-cream';

const TRAUMEEL_TABS = ID.traumeelTabs;
const ARNICARE_GEL = 'boiron-arnicare-gel';
const GENEXA_ALLERGY = 'genexa-allergy-care';
const COLDCALM = 'coldcalm-meltaways';
const CALMS_FORTE = 'hylands-calms-forte';
const NAUSEACALM = 'boiron-nauseacalm';
const HEMCALM = 'boiron-hemcalm-tablets';
const CALENDULA_OINT = 'boiron-calendula-ointment';

const ALTS = {
  painOral: [
    alt(
      TRAUMEEL_TABS,
      'Independently Clean in-batch Traumeel Tablets (lactose + magnesium stearate = 0 pt). Different actives from T-Relief — do not merge formulaIds. Form: tablet — labeled, not a hard filter (§6). Same Pain & Fever shelf.',
    ),
  ],
  painTopical: [
    alt(
      TRAUMEEL_TABS,
      'Independently Clean in-batch Traumeel Tablets (lactose + magnesium stearate). Form: tablet vs cream/gel/ointment — labeled, not a hard filter (§6). Different actives from T-Relief.',
    ),
    alt(
      ARNICARE_GEL,
      'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / ointment — labeled, not a hard filter (§6).',
    ),
  ],
  allergy: [
    alt(
      GENEXA_ALLERGY,
      'Independently Clean allergy chewable already on main (Genexa Allergy Care, minAge 12). Form: chewable tablet vs tablet — labeled, not a hard filter (§6).',
    ),
  ],
  cold: [
    alt(
      COLDCALM,
      'Independently Clean homeopathic meltaway already on main (Boiron ColdCalm, formulaId boiron-coldcalm-meltaways). Form: meltaway tablet vs tablet / spray / syrup — labeled, not a hard filter (§6).',
    ),
  ],
  sleep: [
    alt(
      CALMS_FORTE,
      "Independently Clean Hyland's Calms Forte already on main (lactose / stearate / MCC / starch). Form: tablet — labeled, not a hard filter (§6). Same Sleep shelf.",
    ),
  ],
  nausea: [
    alt(
      NAUSEACALM,
      'Independently Clean Boiron NauseaCalm pellets already on main (lactose + sucrose). Form: pellet vs tablet — labeled, not a hard filter (§6).',
    ),
  ],
  hemorrhoid: [
    alt(
      HEMCALM,
      'Independently Clean Boiron HemCalm Tablets already on main (croscarmellose + lactose + magnesium stearate). Form: tablet — labeled, not a hard filter (§6).',
    ),
  ],
  firstAid: [
    alt(
      CALENDULA_OINT,
      'Independently Clean adult First Aid analog already on main (Boiron Calendula Ointment). Form: ointment vs gel / cream — labeled, not a hard filter (§6).',
    ),
    alt(
      ARNICARE_GEL,
      'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream — labeled, not a hard filter (§6).',
    ),
  ],
};

function tabletMaltodextrin(setid: string, hasLactose: boolean): IngredientFlag[] {
  const rows: IngredientFlag[] = [
    flag('Maltodextrin', 'limited', dailymed(setid, METH.maltodextrin)),
    flag('Dextrose', 'cleared', dailymed(setid, METH.cleared)),
    flag('Magnesium stearate', 'cleared', dailymed(setid, METH.cleared)),
  ];
  if (hasLactose) {
    rows.push(flag('Lactose', 'cleared', dailymed(setid, METH.cleared)));
  }
  return rows;
}

function creamBaseCoconutMct(setid: string): IngredientFlag[] {
  return [
    flag('Sodium polyacrylate', 'cleared', dailymed(setid, METH.polyacrylate)),
    flag('Phenoxyethanol', 'cleared', dailymed(setid, METH.phenoxy)),
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Carrageenan', 'limited', dailymed(setid, METH.carrageenan)),
    flag('Caprylic/capric triglycerides (from coconut)', 'cleared', dailymed(setid, METH.mctCoconut)),
    flag('Safflower oil', 'cleared', dailymed(setid, METH.safflower)),
    flag('Soybean oil (in aloe oil)', 'cleared', dailymed(setid, METH.soyCream)),
    flag('Sunflower seed wax', 'cleared', dailymed(setid, METH.seedWax)),
    flag('Aloe', 'cleared', dailymed(setid, METH.aloe)),
    flag('Shea butter', 'cleared', dailymed(setid, METH.creamOil)),
    flag('Coconut oil', 'cleared', dailymed(setid, METH.creamOil)),
    flag('Vitamin E / tocopherol (in aloe oil)', 'cleared', dailymed(setid, METH.tocopherol)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function mnRow(
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers'> & {
    homeopathic?: boolean;
  },
): RatingRecord {
  const { homeopathic, ...rest } = partial;
  return {
    brand: BRAND_MN,
    recordStatus: UNVERIFIED,
    retailers: [...MN_RETAILERS],
    ...(homeopathic === false ? { productType: OTC } : homeopathicFields()),
    ...rest,
  };
}

function btRow(
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers'>,
): RatingRecord {
  return {
    brand: BRAND_BT,
    recordStatus: UNVERIFIED,
    retailers: [...BT_RETAILERS],
    ...homeopathicFields(),
    ...partial,
  };
}

const TRAUMEEL_ACTIVES: RatingRecord['activeIngredients'] = [
  { name: 'Atropa belladonna', strength: '4X HPUS' },
  { name: 'Echinacea (unspecified)', strength: '2X HPUS' },
  { name: 'Aconitum napellus', strength: '3X HPUS' },
  { name: 'Arnica montana root', strength: '2X HPUS' },
  { name: 'Bellis perennis', strength: '2X HPUS' },
  { name: 'Calendula officinalis flowering top', strength: '2X HPUS' },
  { name: 'Calcium sulfide', strength: '8X HPUS' },
  { name: 'Hypericum perforatum', strength: '2X HPUS' },
  { name: 'Comfrey root', strength: '8X HPUS' },
  { name: 'Matricaria recutita', strength: '3X HPUS' },
  { name: 'Hamamelis virginiana leaf', strength: '2X HPUS' },
  { name: 'Echinacea purpurea', strength: '2X HPUS' },
  { name: 'Mercurius solubilis', strength: '8X HPUS' },
  { name: 'Achillea millefolium', strength: '3X HPUS' },
];

const T_RELIEF_PAIN_ACTIVES: RatingRecord['activeIngredients'] = [
  { name: 'Aconitum napellus', strength: '3X HPUS' },
  { name: 'Arnica montana', strength: '3X HPUS' },
  { name: 'Atropa belladonna', strength: '3X HPUS' },
  { name: 'Baptisia tinctoria root', strength: '2X HPUS' },
  { name: 'Bellis perennis', strength: '2X HPUS' },
  { name: 'Calendula officinalis flowering top', strength: '2X HPUS' },
  { name: 'Echinacea angustifolia', strength: '2X HPUS' },
  { name: 'Hamamelis virginiana root bark/stem bark', strength: '2X HPUS' },
  { name: 'Hypericum perforatum', strength: '3X HPUS' },
  { name: 'Matricaria recutita', strength: '2X HPUS' },
  { name: 'Achillea millefolium', strength: '2X HPUS' },
  { name: 'Ruta graveolens flowering top', strength: '4X HPUS' },
  { name: 'Comfrey root', strength: '8X HPUS' },
];

const T_RELIEF_XS_TAB_ACTIVES: RatingRecord['activeIngredients'] = [
  { name: 'Arnica montana', strength: '3X HPUS' },
  { name: 'Calendula officinalis flowering top', strength: '2X HPUS' },
  { name: 'Hamamelis virginiana root bark/stem bark', strength: '2X HPUS' },
  { name: 'Baptisia tinctoria root', strength: '2X HPUS' },
  { name: 'Bellis perennis', strength: '2X HPUS' },
  { name: 'Echinacea (unspecified)', strength: '2X HPUS' },
  { name: 'Aconitum napellus', strength: '3X HPUS' },
  { name: 'Matricaria chamomilla', strength: '2X HPUS' },
  { name: 'Achillea millefolium', strength: '2X HPUS' },
  { name: 'Atropa belladonna', strength: '3X HPUS' },
  { name: 'Hypericum perforatum', strength: '3X HPUS' },
  { name: 'Ruta graveolens flowering top', strength: '3X HPUS' },
  { name: 'Comfrey root', strength: '6X HPUS' },
];

const T_RELIEF_ARTH_ACTIVES: RatingRecord['activeIngredients'] = [
  { name: 'Arnica montana', strength: '3X HPUS' },
  { name: 'Bryonia alba root', strength: '3X HPUS' },
  { name: 'Sus scrofa cartilage', strength: '4X HPUS' },
  { name: 'Solanum dulcamara top', strength: '2X HPUS' },
  { name: 'Sus scrofa embryo', strength: '6X HPUS' },
  { name: 'Sus scrofa umbilical cord', strength: '6X HPUS' },
  { name: 'Ledum palustre twig', strength: '6X HPUS' },
  { name: 'Sus scrofa placenta', strength: '6X HPUS' },
  { name: 'Rhododendron aureum leaf', strength: '8X HPUS' },
  { name: 'Toxicodendron pubescens leaf', strength: '4X HPUS' },
  { name: 'Sanguinaria canadensis root', strength: '3X HPUS' },
  { name: 'Sulfur', strength: '6X HPUS' },
  { name: 'Comfrey root', strength: '7X HPUS' },
];

function bhiRow(
  id: string,
  productName: string,
  category: string,
  setid: string,
  actives: RatingRecord['activeIngredients'],
  hasLactose: boolean,
  extraNote: string,
  alts?: CleanAlternative[],
): RatingRecord {
  const catchup = BATCH37_CATCHUP_BARCODES[id];
  return mnRow({
    id,
    productName,
    category,
    ...(catchup ? { barcode: catchup } : {}),
    formulaId: id,
    audience: ADULT,
    minAge: 4,
    form: 'tablet',
    activeIngredients: actives,
    inactiveIngredients: tabletMaltodextrin(setid, hasLactose),
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-STYLE DRAFT: ${productName} = Caution. Driver is maltodextrin (Limited). Dextrose + magnesium stearate${hasLactose ? ' + lactose' : ''} Cleared. Own formulaId — do not merge BHI rows. ${extraNote}`,
    ),
    cleanAlternatives: alts,
    sourcesGeneral: [dmUrl(setid) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  });
}

export const BATCH37_MEDINATURA_BT: RatingRecord[] = [
  // ── List 2 Clean ─────────────────────────────────────────
  mnRow({
    id: ID.traumeelTabs,
    productName: 'Traumeel Tablets',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.traumeelTabs],
    formulaId: ID.traumeelTabs,
    audience: ADULT,
    minAge: 4,
    form: 'tablet',
    activeIngredients: TRAUMEEL_ACTIVES,
    inactiveIngredients: [
      flag('Lactose', 'cleared', dailymed(SET.traumeelTabs, METH.cleared)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.traumeelTabs, METH.cleared)),
    ],
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Traumeel Tablets = Clean. Lactose + magnesium stearate = 0 pt. DailyMed setid 39630b57. Distinct from T-Relief (different actives — do NOT reuse as one formula) and from BHI Traumex (maltodextrin Caution). Adults and children 4+ (under 4: ask a doctor). Contains lactose.',
    ),
    sourcesGeneral: [dmUrl(SET.traumeelTabs) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  // ── List 2 Caution — MediNatura ──────────────────────────
  mnRow({
    id: ID.tReliefXsDrops,
    productName: 'T-Relief Extra Strength Oral Drops',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefXsDrops],
    formulaId: ID.tReliefXsDrops,
    audience: ADULT,
    minAge: 4,
    form: 'oral drops',
    activeIngredients: [
      { name: 'Calendula officinalis flowering top', strength: '2X HPUS' },
      { name: 'Matricaria recutita', strength: '2X HPUS' },
      { name: 'Hamamelis virginiana root bark/stem bark', strength: '3X HPUS' },
      { name: 'Achillea millefolium', strength: '2X HPUS' },
      { name: 'Ruta graveolens flowering top', strength: '3X HPUS' },
      { name: 'Comfrey root', strength: '8X HPUS' },
      { name: 'Aconitum napellus', strength: '3X HPUS' },
      { name: 'Echinacea (unspecified)', strength: '2X HPUS' },
      { name: 'Baptisia tinctoria root', strength: '2X HPUS' },
      { name: 'Atropa belladonna', strength: '3X HPUS' },
      { name: 'Arnica montana', strength: '3X HPUS' },
      { name: 'Bellis perennis', strength: '2X HPUS' },
      { name: 'Hypericum perforatum', strength: '3X HPUS' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.tReliefXsDrops, METH.alcoholVehicle)),
      flag('Purified water', 'cleared', dailymed(SET.tReliefXsDrops, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-STYLE DRAFT: T-Relief Extra Strength Oral Drops = Caution. Driver is alcohol as the oral-homeopathic vehicle (Limited). Water Cleared. ${ALCOHOL_VEHICLE_LINE} Distinct from Traumeel Tablets (Clean) and from T-Relief gels/creams.`,
    ),
    cleanAlternatives: ALTS.painOral,
    sourcesGeneral: [dmUrl(SET.tReliefXsDrops) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.tReliefXsGel,
    productName: 'T-Relief Extra Strength Gel',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefXsGel],
    formulaId: ID.tReliefXsGel,
    audience: ADULT,
    minAge: 4,
    form: 'gel',
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '1X HPUS' },
      { name: 'Arnica montana', strength: '1X HPUS' },
      { name: 'Baptisia tinctoria root', strength: '4X HPUS' },
      { name: 'Atropa belladonna', strength: '2X HPUS' },
      { name: 'Bellis perennis', strength: '2X HPUS' },
      { name: 'Calendula officinalis flowering top', strength: '1X HPUS' },
      { name: 'Matricaria recutita', strength: '2X HPUS' },
      { name: 'Echinacea (unspecified)', strength: '1X HPUS' },
      { name: 'Hamamelis virginiana root bark/stem bark', strength: '2X HPUS' },
      { name: 'Hypericum perforatum', strength: '6X HPUS' },
      { name: 'Achillea millefolium', strength: '2X HPUS' },
      { name: 'Ruta graveolens flowering top', strength: '4X HPUS' },
      { name: 'Comfrey root', strength: '4X HPUS' },
    ],
    inactiveIngredients: [
      flag('Phenoxyethanol', 'cleared', dailymed(SET.tReliefXsGel, METH.phenoxy)),
      flag('Alcohol', 'limited', dailymed(SET.tReliefXsGel, METH.alcoholVehicle)),
      flag('Carbomer homopolymer type C', 'cleared', dailymed(SET.tReliefXsGel, METH.carbomer)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.tReliefXsGel, METH.naoh)),
      flag('Purified water', 'cleared', dailymed(SET.tReliefXsGel, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-STYLE DRAFT: T-Relief Extra Strength Gel = Caution. Drivers are phenoxyethanol (Caution-table) and alcohol vehicle (Limited). Carbomer + NaOH + water Cleared. Same OI stack as T-Relief Pain Gel — kept separate because Ruta is 4X here vs 2X on the Pain Gel. ${ALCOHOL_VEHICLE_LINE}`,
    ),
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [dmUrl(SET.tReliefXsGel) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.tReliefPainGel,
    productName: 'T-Relief Pain Gel',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefPainGel],
    formulaId: ID.tReliefPainGel,
    audience: ADULT,
    minAge: 4,
    form: 'gel',
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '1X HPUS' },
      { name: 'Arnica montana', strength: '1X HPUS' },
      { name: 'Baptisia tinctoria root', strength: '4X HPUS' },
      { name: 'Atropa belladonna', strength: '2X HPUS' },
      { name: 'Bellis perennis', strength: '2X HPUS' },
      { name: 'Calendula officinalis flowering top', strength: '1X HPUS' },
      { name: 'Matricaria recutita', strength: '2X HPUS' },
      { name: 'Echinacea (unspecified)', strength: '1X HPUS' },
      { name: 'Hamamelis virginiana root bark/stem bark', strength: '2X HPUS' },
      { name: 'Hypericum perforatum', strength: '6X HPUS' },
      { name: 'Achillea millefolium', strength: '2X HPUS' },
      { name: 'Ruta graveolens flowering top', strength: '2X HPUS' },
      { name: 'Comfrey root', strength: '4X HPUS' },
    ],
    inactiveIngredients: [
      flag('Phenoxyethanol', 'cleared', dailymed(SET.tReliefPainGel, METH.phenoxy)),
      flag('Alcohol', 'limited', dailymed(SET.tReliefPainGel, METH.alcoholVehicle)),
      flag('Carbomer homopolymer type C', 'cleared', dailymed(SET.tReliefPainGel, METH.carbomer)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.tReliefPainGel, METH.naoh)),
      flag('Purified water', 'cleared', dailymed(SET.tReliefPainGel, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: T-Relief Pain Gel = Caution. Same OI stack as Extra Strength Gel (phenoxyethanol Caution-table + alcohol Limited). 2 oz / 8.75 oz share this formulaId. Kept separate from Extra Strength Gel because Ruta potency differs (2X here vs 4X). Distinct from Traumeel.',
    ),
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [dmUrl(SET.tReliefPainGel) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.tReliefXsTabs,
    productName: 'T-Relief Extra Strength Tablets',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefXsTabs],
    formulaId: ID.tReliefXsTabs,
    audience: ADULT,
    minAge: 4,
    form: 'chewable tablet',
    activeIngredients: T_RELIEF_XS_TAB_ACTIVES,
    inactiveIngredients: [
      flag('Maltodextrin', 'limited', dailymed(SET.tReliefXsTabs, METH.maltodextrin)),
      flag('Dextrose', 'cleared', dailymed(SET.tReliefXsTabs, METH.cleared)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.tReliefXsTabs, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: T-Relief Extra Strength Tablets = Caution. Driver is maltodextrin (Limited). 100 ct / 250 ct share this formulaId. Distinct from T-Relief Pain Tablets (adds lactose; different potencies) and from Traumeel Tablets (Clean).',
    ),
    cleanAlternatives: ALTS.painOral,
    sourcesGeneral: [dmUrl(SET.tReliefXsTabs) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.tReliefPainTabs,
    productName: 'T-Relief Pain Tablets',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefPainTabs],
    formulaId: ID.tReliefPainTabs,
    audience: ADULT,
    minAge: 4,
    form: 'chewable tablet',
    activeIngredients: T_RELIEF_PAIN_ACTIVES,
    inactiveIngredients: tabletMaltodextrin(SET.tReliefPainTabs, true),
    verdict: 'caution',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: T-Relief Pain Tablets = Caution. Driver is maltodextrin (Limited). Lactose + dextrose + magnesium stearate Cleared. Distinct from Extra Strength Tablets and from Traumeel Tablets (Clean). Contains lactose.',
    ),
    cleanAlternatives: ALTS.painOral,
    sourcesGeneral: [dmUrl(SET.tReliefPainTabs) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.tReliefArthXsTabs,
    productName: 'T-Relief Arthritis Extra Strength Tablets',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefArthXsTabs],
    formulaId: ID.tReliefArthXsTabs,
    audience: ADULT,
    minAge: 4,
    form: 'tablet',
    activeIngredients: T_RELIEF_ARTH_ACTIVES,
    inactiveIngredients: tabletMaltodextrin(SET.tReliefArthXsTabs, true),
    verdict: 'caution',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: T-Relief Arthritis Extra Strength Tablets = Caution. Driver is maltodextrin (Limited). 100 ct / 250 ct share this formulaId. Non–XS T-Relief Arthritis is list-4 / PR-comment only — not this row. Distinct from Traumeel.',
    ),
    cleanAlternatives: ALTS.painOral,
    sourcesGeneral: [dmUrl(SET.tReliefArthXsTabs) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.clearlifeTabs,
    productName: 'ClearLife Allergy Relief Tablets',
    category: ALLERGIES,
    barcode: BATCH37_CATCHUP_BARCODES[ID.clearlifeTabs],
    formulaId: ID.clearlifeTabs,
    audience: ADULT,
    minAge: 4,
    form: 'tablet',
    activeIngredients: [
      { name: 'Onion', strength: '3X HPUS' },
      { name: 'Ambrosia artemisiifolia', strength: '3X HPUS' },
      { name: 'Apis mellifera', strength: '4X HPUS' },
      { name: 'Arnica montana', strength: '5X HPUS' },
      { name: 'Euphrasia stricta', strength: '3X HPUS' },
      { name: 'Graphite', strength: '10X HPUS' },
      { name: 'Galphimia glauca flowering top', strength: '3X HPUS' },
      { name: 'Pulsatilla vulgaris', strength: '4X HPUS' },
      { name: 'Histamine dihydrochloride', strength: '8X HPUS' },
      { name: 'Pine tar', strength: '10X HPUS' },
      { name: 'Schoenocaulon officinale seed', strength: '6X HPUS' },
      { name: 'Sulfur', strength: '4X HPUS' },
      { name: 'Sulfuric acid', strength: '20X HPUS' },
      { name: 'Tellurium', strength: '10X HPUS' },
      { name: 'Thuja occidentalis leafy twig', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag('Stevia rebaudiana leaf', 'cleared', dailymed(SET.clearlifeTabs, METH.steviaLeaf)),
      flag('Maltodextrin', 'limited', dailymed(SET.clearlifeTabs, METH.maltodextrin)),
      flag('Citric acid', 'cleared', dailymed(SET.clearlifeTabs, METH.cleared)),
      flag('Lactose', 'cleared', dailymed(SET.clearlifeTabs, METH.cleared)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.clearlifeTabs, METH.cleared)),
      flag('Dextrose', 'cleared', dailymed(SET.clearlifeTabs, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-STYLE DRAFT: ClearLife Allergy Relief Tablets = Caution. Drivers are whole-leaf stevia (Caution-cap; DailyMed STEVIA REBAUDIUNA LEAF) and maltodextrin (Limited). ${STEVIA_LEAF_TAP} DailyMed title is Clearlife Extra Strength tablets — this is the oral tablet row, not ClearLife XS nasal (list-4 / PR-comment only). Contains lactose.`,
    ),
    cleanAlternatives: ALTS.allergy,
    sourcesGeneral: [dmUrl(SET.clearlifeTabs) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.reboostZincLemon,
    productName: 'ReBoost Cold & Flu Tablets Zinc +10 Lemon',
    category: COLD_FLU,
    barcode: BATCH37_CATCHUP_BARCODES[ID.reboostZincLemon],
    formulaId: ID.reboostZincLemon,
    audience: ADULT,
    minAge: 4,
    form: 'tablet',
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '3X HPUS' },
      { name: 'Bryonia alba root', strength: '3X HPUS' },
      { name: 'Eupatorium perfoliatum flowering top', strength: '6X HPUS' },
      { name: 'Goldenseal', strength: '5X HPUS' },
      { name: 'Lachesis muta venom', strength: '10X HPUS' },
      { name: 'Phosphorus', strength: '8X HPUS' },
      { name: 'Vincetoxicum hirundinaria root', strength: '6X HPUS' },
      { name: 'Zinc gluconate', strength: '1X HPUS' },
      { name: 'Zinc acetate', strength: '2X HPUS' },
      { name: 'Cairina moschata heart/liver autolysate', strength: '20X HPUS' },
      { name: 'Ipecac', strength: '3X HPUS' },
      { name: 'Sulfur', strength: '4X HPUS' },
    ],
    inactiveIngredients: [
      flag('Stevia rebaudiana leaf', 'cleared', dailymed(SET.reboostZincLemon, METH.steviaLeaf)),
      flag('Maltodextrin', 'limited', dailymed(SET.reboostZincLemon, METH.maltodextrin)),
      flag('Lactose', 'cleared', dailymed(SET.reboostZincLemon, METH.cleared)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.reboostZincLemon, METH.cleared)),
      flag('Citric acid', 'cleared', dailymed(SET.reboostZincLemon, METH.cleared)),
      flag('Dextrose', 'cleared', dailymed(SET.reboostZincLemon, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-STYLE DRAFT: ReBoost Cold & Flu Tablets Zinc +10 Lemon = Caution. Drivers are whole-leaf stevia (Caution-cap) and maltodextrin (Limited). ${STEVIA_LEAF_TAP} Zinc is parked as an active (Methodology v1.6) — this draft grades inactives only. ReBoost nasal is list-4 / PR-comment only. Contains lactose.`,
    ),
    cleanAlternatives: ALTS.cold,
    sourcesGeneral: [dmUrl(SET.reboostZincLemon) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.reboostSpray,
    productName: 'ReBoost Sore Throat Spray Cherry',
    category: COLD_FLU,
    barcode: BATCH37_CATCHUP_BARCODES[ID.reboostSpray],
    formulaId: ID.reboostSpray,
    audience: ADULT,
    minAge: 4,
    form: 'spray',
    activeIngredients: [
      { name: 'Apis mellifera', strength: '6X HPUS' },
      { name: 'Atropa belladonna', strength: '5X HPUS' },
      { name: 'Calendula officinalis flowering top', strength: '4X HPUS' },
      { name: 'Echinacea purpurea', strength: '4X HPUS' },
      { name: 'Goldenseal', strength: '5X HPUS' },
      { name: 'Phytolacca americana root', strength: '4X HPUS' },
      { name: 'Plantago major', strength: '3X HPUS' },
      { name: 'Sage', strength: '3X HPUS' },
      { name: 'Zinc gluconate', strength: '1X HPUS' },
      { name: 'Baptisia tinctoria root', strength: '1X HPUS' },
      { name: 'Ulmus rubra bark', strength: '1X HPUS' },
      { name: 'Sulfur', strength: '4X HPUS' },
      { name: 'Zinc acetate', strength: '4X HPUS' },
      { name: 'Vincetoxicum hirundinaria root', strength: '6X HPUS' },
      { name: 'Cairina moschata heart/liver autolysate', strength: '20X HPUS' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.reboostSpray, METH.alcoholVehicle)),
      flag('Fructose', 'limited', dailymed(SET.reboostSpray, METH.fructose)),
      flag('Cherry flavor', 'limited', dailymed(SET.reboostSpray, METH.cherryFlavor)),
      flag('Glycerin', 'cleared', dailymed(SET.reboostSpray, METH.cleared)),
      flag('Purified water', 'cleared', dailymed(SET.reboostSpray, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-STYLE DRAFT: ReBoost Sore Throat Spray Cherry = Caution. Drivers are alcohol vehicle + fructose + cherry flavor (Limited-only — stays Caution, not Avoid). ${ALCOHOL_VEHICLE_LINE} Zinc parked as an active.`,
    ),
    cleanAlternatives: ALTS.cold,
    sourcesGeneral: [dmUrl(SET.reboostSpray) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.wellmindCalm,
    productName: 'WellMind Calming Tablets',
    category: SLEEP,
    barcode: BATCH37_CATCHUP_BARCODES[ID.wellmindCalm],
    formulaId: ID.wellmindCalm,
    audience: ADULT,
    minAge: 4,
    form: 'tablet',
    activeIngredients: [
      { name: 'Matricaria chamomilla', strength: '2X HPUS' },
      { name: 'Arabica coffee bean', strength: '10X HPUS' },
      { name: 'Hops', strength: '2X HPUS' },
      { name: 'Strychnos ignatii seed', strength: '8X HPUS' },
      { name: 'Moschus moschiferus musk sac resin', strength: '10X HPUS' },
      { name: 'Strychnos nux-vomica seed', strength: '30X HPUS' },
      { name: 'Passiflora incarnata flowering top', strength: '2X HPUS' },
      { name: 'Sulfur', strength: '12X HPUS' },
      { name: 'Valerian', strength: '2X HPUS' },
      { name: 'Veratrum album root', strength: '4X HPUS' },
    ],
    inactiveIngredients: tabletMaltodextrin(SET.wellmindCalm, true),
    verdict: 'caution',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: WellMind Calming Tablets = Caution. Driver is maltodextrin (Limited). WellMind Vertigo / Mental Focus are list-4 / PR-comment only. Contains lactose.',
    ),
    cleanAlternatives: ALTS.sleep,
    sourcesGeneral: [dmUrl(SET.wellmindCalm) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.bodyanewDrops,
    productName: 'BodyAnew Cleanse/Detox Oral Drops',
    category: DIGESTIVE,
    barcode: BATCH37_CATCHUP_BARCODES[ID.bodyanewDrops],
    formulaId: ID.bodyanewDrops,
    audience: ADULT,
    minAge: 18,
    form: 'oral drops',
    activeIngredients: [
      { name: 'Bryonia alba root', strength: '3X HPUS' },
      { name: 'Chelidonium majus', strength: '3X HPUS' },
      { name: 'Citrullus colocynthis fruit pulp', strength: '3X HPUS' },
      { name: 'Lycopodium clavatum spore', strength: '9X HPUS' },
      { name: 'Strychnos nux-vomica seed', strength: '3X HPUS' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.bodyanewKit, METH.alcoholVehicle)),
      flag('Purified water', 'cleared', dailymed(SET.bodyanewKit, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-STYLE DRAFT: BodyAnew Cleanse/Detox Oral Drops = Caution. Driver is alcohol as the oral-homeopathic vehicle (Limited). Water Cleared. ${ALCOHOL_VEHICLE_LINE} Written as the drops formula only — the BodyAnew Kit is list-4 / PR-comment only. DailyMed setid e5f86823 is the kit SPL that carries the drops OI (alcohol + water). Adult 18+.`,
    ),
    sourcesGeneral: [
      dmUrl(SET.bodyanewKit) + ' — kit SPL cited for drops OI only; kit is not a Search row — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  }),

  // ── BHI — each own Caution row ───────────────────────────
  bhiRow(
    ID.bhiAllergy,
    'BHI Allergy Tablets',
    ALLERGIES,
    SET.bhiAllergy,
    [
      { name: 'Antimony trisulfide', strength: '10X HPUS' },
      { name: 'Arnica montana root', strength: '6X HPUS' },
      { name: 'Formic acid', strength: '8X HPUS' },
      { name: 'Graphite', strength: '10X HPUS' },
      { name: 'Histamine dihydrochloride', strength: '8X HPUS' },
      { name: 'Strychnos ignatii seed', strength: '6X HPUS' },
      { name: 'Arctium lappa root', strength: '8X HPUS' },
      { name: 'Ledum palustre twig', strength: '8X HPUS' },
      { name: 'Lycopodium clavatum spore', strength: '6X HPUS' },
      { name: 'Pine tar', strength: '10X HPUS' },
      { name: 'Selenium', strength: '12X HPUS' },
      { name: 'Sulfur', strength: '12X HPUS' },
      { name: 'Sulfuric acid', strength: '30X HPUS' },
      { name: 'Tellurium', strength: '10X HPUS' },
      { name: 'Thuja occidentalis leafy twig', strength: '6X HPUS' },
    ],
    true,
    'Contains lactose.',
    ALTS.allergy,
  ),
  bhiRow(
    ID.bhiArthritis,
    'BHI Arthritis Tablets',
    PAIN_FEVER,
    SET.bhiArthritis,
    [
      { name: 'Arnica montana root', strength: '6X HPUS' },
      { name: 'Berberis vulgaris root bark', strength: '8X HPUS' },
      { name: 'Bryonia alba', strength: '4X HPUS' },
      { name: 'Causticum', strength: '4X HPUS' },
      { name: 'Citrullus colocynthis fruit pulp', strength: '5X HPUS' },
      { name: 'Solanum dulcamara top', strength: '6X HPUS' },
      { name: 'Ferrosoferric phosphate', strength: '12X HPUS' },
      { name: 'Ledum palustre twig', strength: '6X HPUS' },
      { name: 'Lycopodium clavatum spore', strength: '10X HPUS' },
      { name: 'Ranunculus bulbosus', strength: '8X HPUS' },
      { name: 'Rhododendron aureum leaf', strength: '6X HPUS' },
      { name: 'Toxicodendron pubescens leaf', strength: '4X HPUS' },
      { name: 'Sulfur', strength: '10X HPUS' },
    ],
    true,
    'Contains lactose.',
    ALTS.painOral,
  ),
  bhiRow(
    ID.bhiBack,
    'BHI Back Tablets',
    PAIN_FEVER,
    SET.bhiBack,
    [
      { name: 'Ammonium chloride', strength: '6X HPUS' },
      { name: 'Matricaria recutita', strength: '10X HPUS' },
      { name: 'Citrullus colocynthis fruit pulp', strength: '5X HPUS' },
      { name: 'Gelsemium sempervirens root', strength: '6X HPUS' },
      { name: 'Pseudognaphalium obtusifolium', strength: '5X HPUS' },
      { name: 'Toxicodendron pubescens leaf', strength: '8X HPUS' },
    ],
    true,
    'Contains lactose.',
    ALTS.painOral,
  ),
  bhiRow(
    ID.bhiCalming,
    'BHI Calming Support Tablets',
    SLEEP,
    SET.bhiCalming,
    [
      { name: 'Matricaria recutita', strength: '2X HPUS' },
      { name: 'Arabica coffee bean', strength: '10X HPUS' },
      { name: 'Hops', strength: '2X HPUS' },
      { name: 'Strychnos ignatii seed', strength: '8X HPUS' },
      { name: 'Moschus moschiferus musk sac resin', strength: '10X HPUS' },
      { name: 'Strychnos nux-vomica seed', strength: '30X HPUS' },
      { name: 'Passiflora incarnata flowering top', strength: '2X HPUS' },
      { name: 'Sulfur', strength: '12X HPUS' },
      { name: 'Valerian', strength: '2X HPUS' },
      { name: 'Veratrum album root', strength: '4X HPUS' },
    ],
    true,
    'Contains lactose.',
    ALTS.sleep,
  ),
  bhiRow(
    ID.bhiConstipation,
    'BHI Constipation Tablets',
    DIGESTIVE,
    SET.bhiConstipation,
    [
      { name: 'Dioscorea villosa tuber', strength: '4X HPUS' },
      { name: 'Sodium chloride', strength: '200X HPUS' },
      { name: 'Strychnos nux-vomica seed', strength: '8X HPUS' },
    ],
    false,
    'No lactose on this SPL.',
  ),
  bhiRow(
    ID.bhiDiarrhea,
    'BHI Diarrhea Tablets',
    DIGESTIVE,
    SET.bhiDiarrhea,
    [
      { name: 'Aloe', strength: '4X HPUS' },
      { name: 'Activated charcoal', strength: '12X HPUS' },
      { name: 'Citrullus colocynthis fruit pulp', strength: '6X HPUS' },
      { name: 'Cupric acetate', strength: '6X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '10X HPUS' },
      { name: 'Podophyllum', strength: '6X HPUS' },
      { name: 'Potentilla erecta root', strength: '4X HPUS' },
      { name: 'Veratrum album root', strength: '5X HPUS' },
    ],
    true,
    'Contains lactose.',
  ),
  bhiRow(
    ID.bhiFlu,
    'BHI Flu+Cold Tablets',
    COLD_FLU,
    SET.bhiFlu,
    [
      { name: 'Aconitum napellus', strength: '4X HPUS' },
      { name: 'Cairina moschata heart/liver autolysate', strength: '200C HPUS' },
      { name: 'Bryonia alba', strength: '4X HPUS' },
      { name: 'Eupatorium perfoliatum flowering top', strength: '4X HPUS' },
      { name: 'Ipecac', strength: '6X HPUS' },
      { name: 'Lachesis muta venom', strength: '12X HPUS' },
      { name: 'Phosphorus', strength: '8X HPUS' },
      { name: 'Pulsatilla vulgaris', strength: '6X HPUS' },
      { name: 'Sulfur', strength: '8X HPUS' },
      { name: 'Zinc gluconate', strength: '3X HPUS' },
      { name: 'Zinc', strength: '3X HPUS' },
    ],
    false,
    'Zinc parked as an active. No lactose on this SPL.',
    ALTS.cold,
  ),
  bhiRow(
    ID.bhiHemorrhoid,
    'BHI Hemorrhoid Tablets',
    DIGESTIVE,
    SET.bhiHemorrhoid,
    [
      { name: 'Horse chestnut', strength: '4X HPUS' },
      { name: 'Aloe', strength: '4X HPUS' },
      { name: 'Collinsonia canadensis root', strength: '4X HPUS' },
      { name: 'Veronicastrum virginicum root', strength: '6X HPUS' },
      { name: 'Hydrochloric acid', strength: '6X HPUS' },
      { name: 'Strychnos nux-vomica seed', strength: '5X HPUS' },
      { name: 'Paeonia officinalis root', strength: '6X HPUS' },
      { name: 'Sulfur', strength: '10X HPUS' },
    ],
    true,
    'Contains lactose.',
    ALTS.hemorrhoid,
  ),
  bhiRow(
    ID.bhiMigraine,
    'BHI Migraine Tablets',
    PAIN_FEVER,
    SET.bhiMigraine,
    [
      { name: 'Acetic acid', strength: '6X HPUS' },
      { name: 'Araneus diadematus', strength: '8X HPUS' },
      { name: 'Asafetida', strength: '6X HPUS' },
      { name: 'Bryonia alba', strength: '30X HPUS' },
      { name: 'Tribasic calcium phosphate', strength: '10X HPUS' },
      { name: 'Activated charcoal', strength: '10X HPUS' },
      { name: 'Cinchona officinalis bark', strength: '4X HPUS' },
      { name: 'Marsdenia condurango bark', strength: '4X HPUS' },
      { name: 'Tubocurarine chloride', strength: '10X HPUS' },
      { name: 'Kalmia latifolia leaf', strength: '8X HPUS' },
      { name: 'Lycopodium clavatum spore', strength: '6X HPUS' },
      { name: 'Sodium sulfate', strength: '6X HPUS' },
      { name: 'Phosphoric acid', strength: '6X HPUS' },
      { name: 'Pulsatilla vulgaris', strength: '4X HPUS' },
      { name: 'Claviceps purpurea sclerotium', strength: '6X HPUS' },
      { name: 'Silicon dioxide (Silicea)', strength: '10X HPUS' },
      { name: 'Strychnine nitrate', strength: '8X HPUS' },
    ],
    false,
    'Silicea / silicon dioxide 10X is a homeopathic ACTIVE on this carton — not the inactive SiO2 nanoparticle Caution cap. No lactose on this SPL.',
    ALTS.painOral,
  ),
  bhiRow(
    ID.bhiMucus,
    'BHI Mucus Tablets',
    COLD_FLU,
    SET.bhiMucus,
    [
      { name: 'Antimony potassium tartrate', strength: '5X HPUS' },
      { name: 'Atropa belladonna', strength: '6X HPUS' },
      { name: 'Bryonia alba', strength: '6X HPUS' },
      { name: 'Anemone hepatica', strength: '6X HPUS' },
      { name: 'Hyoscyamus niger', strength: '5X HPUS' },
      { name: 'Ipecac', strength: '6X HPUS' },
      { name: 'Lobelia inflata', strength: '4X HPUS' },
      { name: 'Human sputum, Bordetella pertussis infected', strength: '30X HPUS' },
      { name: 'Lobaria pulmonaria', strength: '5X HPUS' },
    ],
    false,
    'Current MediNatura SPL (maltodextrin). Legacy Heel BHI Mucus (lactose + stearate only) is list-4 / PR-comment only.',
    ALTS.cold,
  ),
  bhiRow(
    ID.bhiNausea,
    'BHI Nausea Tablets',
    DIGESTIVE,
    SET.bhiNausea,
    [
      { name: 'Semecarpus anacardium juice', strength: '6X HPUS' },
      { name: 'Silver nitrate', strength: '8X HPUS' },
      { name: 'Activated charcoal', strength: '12X HPUS' },
      { name: 'Ipecac', strength: '6X HPUS' },
      { name: 'Iodine', strength: '12X HPUS' },
      { name: 'Robinia pseudoacacia bark', strength: '10X HPUS' },
      { name: 'Sepia officinalis juice', strength: '30X HPUS' },
    ],
    false,
    'No lactose on this SPL.',
    ALTS.nausea,
  ),
  bhiRow(
    ID.bhiSinus,
    'BHI Sinus Congestion Tablets',
    COLD_FLU,
    SET.bhiSinus,
    [
      { name: 'Euphorbia resinifera resin', strength: '6X HPUS' },
      { name: 'Goldenseal', strength: '6X HPUS' },
      { name: 'Potassium dichromate', strength: '6X HPUS' },
      { name: 'Potassium iodide', strength: '8X HPUS' },
      { name: 'Phosphorus', strength: '8X HPUS' },
      { name: 'Pulsatilla vulgaris', strength: '4X HPUS' },
      { name: 'Thuja occidentalis leafy twig', strength: '6X HPUS' },
    ],
    false,
    'No lactose on this SPL.',
    ALTS.cold,
  ),
  bhiRow(
    ID.bhiSkin,
    'BHI Skin Eczema Tablets',
    FIRST_AID,
    SET.bhiSkin,
    [
      { name: 'Berberis vulgaris root bark', strength: '6X HPUS' },
      { name: 'Graphite', strength: '10X HPUS' },
      { name: 'Hydrofluoric acid', strength: '10X HPUS' },
      { name: 'Lycopodium clavatum spore', strength: '12X HPUS' },
      { name: 'Petrolatum', strength: '10X HPUS' },
      { name: 'Toxicodendron pubescens leaf', strength: '8X HPUS' },
      { name: 'Sepia officinalis juice', strength: '10X HPUS' },
      { name: 'Sulfur', strength: '12X HPUS' },
    ],
    false,
    'Petrolatum here is a homeopathic ACTIVE (10X), not the topical ointment-base Cleared row. No lactose on this SPL.',
    ALTS.firstAid,
  ),
  bhiRow(
    ID.bhiSpasm,
    'BHI Spasm/Cramp Tablets',
    PAIN_FEVER,
    SET.bhiSpasm,
    [
      { name: 'Atropine sulfate', strength: '6X HPUS' },
      { name: 'Aconitum napellus', strength: '4X HPUS' },
      { name: 'Bryonia alba root', strength: '4X HPUS' },
      { name: 'Citrullus colocynthis fruit pulp', strength: '4X HPUS' },
      { name: 'Cupric sulfate', strength: '6X HPUS' },
    ],
    false,
    'DailyMed title is BHI Spasm Pain. No lactose on this SPL.',
    ALTS.painOral,
  ),
  bhiRow(
    ID.bhiTraumex,
    'BHI Traumex Tablets',
    PAIN_FEVER,
    SET.bhiTraumex,
    [
      { name: 'Arnica montana', strength: '3X HPUS' },
      { name: 'Calendula officinalis flowering top', strength: '2X HPUS' },
      { name: 'Hamamelis virginiana root bark/stem bark', strength: '2X HPUS' },
      { name: 'Baptisia tinctoria root', strength: '2X HPUS' },
      { name: 'Bellis perennis', strength: '2X HPUS' },
      { name: 'Echinacea angustifolia', strength: '2X HPUS' },
      { name: 'Aconitum napellus', strength: '3X HPUS' },
      { name: 'Matricaria chamomilla', strength: '2X HPUS' },
      { name: 'Achillea millefolium', strength: '2X HPUS' },
      { name: 'Atropa belladonna', strength: '3X HPUS' },
      { name: 'Hypericum perforatum', strength: '3X HPUS' },
      { name: 'Ruta graveolens flowering top', strength: '4X HPUS' },
      { name: 'Comfrey root', strength: '8X HPUS' },
    ],
    false,
    'NOT Traumeel Clean — this is the BHI Traumex maltodextrin tablet. Do not merge into Traumeel Tablets.',
    ALTS.painOral,
  ),

  // ── List 3 — founder cream / gel / syrup locks ───────────
  mnRow({
    id: ID.tReliefPainCream,
    productName: 'T-Relief Pain Cream',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefPainCream],
    formulaId: ID.tReliefPainCream,
    audience: ADULT,
    minAge: 4,
    form: 'cream',
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS' },
      { name: 'Baptisia tinctoria root', strength: '4X HPUS' },
      { name: 'Atropa belladonna', strength: '2X HPUS' },
      { name: 'Bellis perennis', strength: '2X HPUS' },
      { name: 'Calendula officinalis flowering top', strength: '1X HPUS' },
      { name: 'Matricaria recutita', strength: '2X HPUS' },
      { name: 'Echinacea (unspecified)', strength: '1X HPUS' },
      { name: 'Hamamelis virginiana root bark/stem bark', strength: '2X HPUS' },
      { name: 'Hypericum perforatum', strength: '6X HPUS' },
      { name: 'Ruta graveolens flowering top', strength: '4X HPUS' },
      { name: 'Aconitum napellus', strength: '1X HPUS' },
      { name: 'Comfrey root', strength: '4X HPUS' },
      { name: 'Achillea millefolium', strength: '2X HPUS' },
    ],
    inactiveIngredients: creamBaseCoconutMct(SET.tReliefPainCream),
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: T-Relief Pain Cream = Caution. Sodium polyacrylate Caution; phenoxyethanol Caution-table; alcohol Limited; carrageenan Limited. Safflower / soy (in aloe oil) / sunflower seed wax / aloe / shea / coconut Cleared with cream form taps. MCT labeled from coconut (Cocos nucifera) = Cleared, not unlabeled-MCT Limited. 2 oz / 4 oz share this formulaId. ${CREAM_OIL_LINE} Distinct from Extra Strength Cream (separate marketed strength / pack) and from Traumeel Ointment.`,
    ),
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [dmUrl(SET.tReliefPainCream) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.tReliefXsCream,
    productName: 'T-Relief Extra Strength Cream',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefXsCream],
    formulaId: ID.tReliefXsCream,
    audience: ADULT,
    minAge: 4,
    form: 'cream',
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS' },
      { name: 'Calendula officinalis flowering top', strength: '1X HPUS' },
      { name: 'Echinacea (unspecified)', strength: '1X HPUS' },
      { name: 'Aconitum napellus', strength: '1X HPUS' },
      { name: 'Achillea millefolium', strength: '2X HPUS' },
      { name: 'Hamamelis virginiana root bark/stem bark', strength: '2X HPUS' },
      { name: 'Matricaria chamomilla', strength: '2X HPUS' },
      { name: 'Atropa belladonna', strength: '2X HPUS' },
      { name: 'Bellis perennis', strength: '2X HPUS' },
      { name: 'Ruta graveolens flowering top', strength: '4X HPUS' },
      { name: 'Baptisia tinctoria root', strength: '4X HPUS' },
      { name: 'Comfrey root', strength: '4X HPUS' },
      { name: 'Hypericum perforatum', strength: '6X HPUS' },
    ],
    inactiveIngredients: creamBaseCoconutMct(SET.tReliefXsCream),
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: T-Relief Extra Strength Cream = Caution. Same locked cream math as Pain Cream (sodium polyacrylate Caution; phenoxyethanol Caution; alcohol / carrageenan Limited; safflower / soy / seed wax / aloe Cleared). 3 oz / 8 oz share this formulaId. ${CREAM_OIL_LINE} Separate formulaId from Pain Cream (marketed Extra Strength vs regular; shop says 50% more of each botanical).`,
    ),
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [dmUrl(SET.tReliefXsCream) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  mnRow({
    id: ID.tReliefArthXsCream,
    productName: 'T-Relief Arthritis Extra Strength Cream',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefArthXsCream],
    formulaId: ID.tReliefArthXsCream,
    audience: ADULT,
    minAge: 4,
    form: 'cream',
    activeIngredients: T_RELIEF_ARTH_ACTIVES,
    inactiveIngredients: [
      flag('Sodium polyacrylate', 'cleared', labelCite(ARTH_CREAM_CITE, METH.polyacrylate)),
      flag('Phenoxyethanol', 'cleared', labelCite(ARTH_CREAM_CITE, METH.phenoxy)),
      flag('Alcohol / ethanol', 'limited', labelCite(ARTH_CREAM_CITE, METH.alcoholVehicle)),
      flag('Carrageenan', 'limited', labelCite(ARTH_CREAM_CITE, METH.carrageenan)),
      flag(
        'Caprylic/capric triglycerides',
        'limited',
        labelCite(ARTH_CREAM_CITE, METH.mctUnlabeled),
      ),
      flag('Safflower oil', 'cleared', labelCite(ARTH_CREAM_CITE, METH.safflower)),
      flag('Soybean oil (in aloe oil)', 'cleared', labelCite(ARTH_CREAM_CITE, METH.soyCream)),
      flag('Sunflower seed wax', 'cleared', labelCite(ARTH_CREAM_CITE, METH.seedWax)),
      flag('Aloe', 'cleared', labelCite(ARTH_CREAM_CITE, METH.aloe)),
      flag('Shea butter', 'cleared', labelCite(ARTH_CREAM_CITE, METH.creamOil)),
      flag('Coconut oil', 'cleared', labelCite(ARTH_CREAM_CITE, METH.creamOil)),
      flag('Vitamin E (in aloe oil)', 'cleared', labelCite(ARTH_CREAM_CITE, METH.tocopherol)),
      flag('Purified water', 'cleared', labelCite(ARTH_CREAM_CITE, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: T-Relief Arthritis Extra Strength Cream = Caution. Same locked cream math (sodium polyacrylate Caution; safflower / soy / seed wax / aloe Cleared; phenoxyethanol Caution; alcohol Limited). Caprylic/capric triglycerides are not named coconut on the shop OI line → unlabeled MCT Limited. ${CREAM_OIL_LINE} No current DailyMed SPL (legacy arthritis-cream setid 861754ec is inactivated / list-4). OI from the current MediNatura 3 oz product page. Arthritis actives — do not merge into T-Relief Pain / Extra Strength Cream.`,
    ),
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [
      ARTH_CREAM_CITE + ' — shop OI; no current DailyMed SPL — ' + UNVERIFIED_NOTE,
      CARLSTON,
    ],
  }),

  mnRow({
    id: ID.tReliefLido,
    productName: 'T-Relief Lidocaine 4% Cream',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.tReliefLido],
    formulaId: ID.tReliefLido,
    audience: ADULT,
    minAge: 4,
    form: 'cream',
    homeopathic: false,
    activeIngredients: [
      { name: 'Lidocaine hydrochloride', strength: '4%' },
      { name: 'Arnica montana (homeopathic)', strength: 'on carton' },
      { name: 'Calendula officinalis (homeopathic)', strength: 'on carton' },
      { name: 'Matricaria chamomilla (homeopathic)', strength: 'on carton' },
      { name: 'Echinacea (homeopathic)', strength: 'on carton' },
      { name: 'Hypericum perforatum (homeopathic)', strength: 'on carton' },
      { name: 'Achillea millefolium (homeopathic)', strength: 'on carton' },
    ],
    inactiveIngredients: [
      flag('Sodium polyacrylate', 'cleared', dailymed(SET.tReliefLido, METH.polyacrylate)),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.tReliefLido, METH.phenoxy)),
      flag(
        'Caprylic/capric triglyceride',
        'limited',
        dailymed(SET.tReliefLido, METH.mctUnlabeled),
      ),
      flag('Carrageenan', 'limited', dailymed(SET.tReliefLido, METH.carrageenan)),
      flag('Safflower oil', 'cleared', dailymed(SET.tReliefLido, METH.safflower)),
      flag('Soybean oil (in aloe oil)', 'cleared', dailymed(SET.tReliefLido, METH.soyCream)),
      flag('Sunflower seed wax', 'cleared', dailymed(SET.tReliefLido, METH.seedWax)),
      flag('Aloe', 'cleared', dailymed(SET.tReliefLido, METH.aloe)),
      flag('Shea butter', 'cleared', dailymed(SET.tReliefLido, METH.creamOil)),
      flag('Coconut oil', 'cleared', dailymed(SET.tReliefLido, METH.creamOil)),
      flag('Vitamin E (in aloe oil)', 'cleared', dailymed(SET.tReliefLido, METH.tocopherol)),
      flag('Carbomer (Carbopol Ultrez 10)', 'cleared', dailymed(SET.tReliefLido, METH.carbomer)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.tReliefLido, METH.naoh)),
      flag('Purified water', 'cleared', dailymed(SET.tReliefLido, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCKED DRAFT: T-Relief Lidocaine 4% Cream = Caution. Sodium polyacrylate Caution; safflower / soy Cleared with cream taps; phenoxyethanol Caution-table; unlabeled MCT Limited; carrageenan Limited. ${CREAM_OIL_LINE} Lidocaine is the OTC monograph active (parked for active-safety-cap review — inactives graded only). Homeopathic botanicals on the carton are listed as additional actives, not OI. Adults and children 4+ (under 4: ask a doctor). Not homeopathic-subtype — this is a 4% lidocaine cream. Distinct from T-Relief Pain / Extra Strength Cream. Pack sizes share formulaId. ${LIMITED_STACK} Draft, not verified.`,
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [dmUrl(SET.tReliefLido) + ' — ' + UNVERIFIED_NOTE],
  }),

  mnRow({
    id: ID.traumeelOint,
    productName: 'Original Traumeel Ointment',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.traumeelOint],
    formulaId: ID.traumeelOint,
    audience: ADULT,
    minAge: 4,
    form: 'ointment',
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '1X HPUS' },
      { name: 'Arnica montana root', strength: '3X HPUS' },
      { name: 'Atropa belladonna', strength: '1X HPUS' },
      { name: 'Bellis perennis', strength: '1X HPUS' },
      { name: 'Calendula officinalis flowering top', strength: '1X HPUS' },
      { name: 'Matricaria recutita', strength: '1X HPUS' },
      { name: 'Echinacea (unspecified)', strength: '1X HPUS' },
      { name: 'Echinacea purpurea', strength: '1X HPUS' },
      { name: 'Hamamelis virginiana root bark/stem bark', strength: '1X HPUS' },
      { name: 'Calcium sulfide', strength: '6X HPUS' },
      { name: 'Hypericum perforatum', strength: '6X HPUS' },
      { name: 'Mercurius solubilis', strength: '6X HPUS' },
      { name: 'Achillea millefolium', strength: '1X HPUS' },
      { name: 'Comfrey root', strength: '4X HPUS' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.traumeelOint, METH.alcoholVehicle)),
      flag('Paraffin', 'cleared', dailymed(SET.traumeelOint, METH.paraffin)),
      flag('Mineral oil', 'cleared', dailymed(SET.traumeelOint, METH.mineralOil)),
      flag('Cetostearyl alcohol', 'cleared', dailymed(SET.traumeelOint, METH.fattyAlcohol)),
      flag('Purified water', 'cleared', dailymed(SET.traumeelOint, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: Original Traumeel Ointment = Caution. Paraffin / mineral oil Cleared; cetostearyl alcohol Cleared fatty-alcohol family; alcohol vehicle Limited → Limited-only stays Caution (not Clean). ${ALCOHOL_VEHICLE_LINE} ${OINTMENT_OIL_LINE} MediNatura setid c9962e63 — not the Heel legacy ointment SPL (list-4). Distinct from Traumeel Tablets (Clean) and from T-Relief creams.`,
    ),
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [dmUrl(SET.traumeelOint) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  btRow({
    id: ID.arniflora,
    productName: 'B&T Arniflora Arnica Gel',
    category: FIRST_AID,
    barcode: BATCH37_CATCHUP_BARCODES[ID.arniflora],
    formulaId: ID.arniflora,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [{ name: 'Arnica montana', strength: '1X HPUS' }],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.arniflora, METH.alcoholVehicle)),
      flag('Witch hazel', 'cleared', dailymed(SET.arniflora, METH.witchHazel)),
      flag('Carbomer homopolymer type C', 'cleared', dailymed(SET.arniflora, METH.carbomer)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.arniflora, METH.naoh)),
      flag('Purified water', 'cleared', dailymed(SET.arniflora, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: B&T Arniflora Arnica Gel = Caution. Witch hazel Cleared; alcohol vehicle Limited → Caution (not Clean). ${ALCOHOL_VEHICLE_LINE} Schwabe North America setid 935bf19d — Mexico SPL is list-4 / PR-comment only.`,
    ),
    cleanAlternatives: ALTS.firstAid,
    sourcesGeneral: [dmUrl(SET.arniflora) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  btRow({
    id: ID.triflora,
    productName: 'B&T Triflora Arthritis Gel',
    category: PAIN_FEVER,
    barcode: BATCH37_CATCHUP_BARCODES[ID.triflora],
    formulaId: ID.triflora,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Urtica dioica', strength: '1X HPUS' },
      { name: 'Toxicodendron pubescens leaf', strength: '4X HPUS' },
      { name: 'Ledum palustre twig', strength: '2X HPUS' },
    ],
    inactiveIngredients: [
      flag('Pine needle oil (Pinus sylvestris)', 'cleared', dailymed(SET.triflora, METH.pine)),
      flag('Alcohol', 'limited', dailymed(SET.triflora, METH.alcoholVehicle)),
      flag('Witch hazel', 'cleared', dailymed(SET.triflora, METH.witchHazel)),
      flag('Carbomer homopolymer type C', 'cleared', dailymed(SET.triflora, METH.carbomer)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.triflora, METH.naoh)),
      flag('Purified water', 'cleared', dailymed(SET.triflora, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: B&T Triflora Arthritis Gel = Caution. Witch hazel Cleared; pine needle oil Caution (founder gel-inactive lock); alcohol Limited. ${PINE_TAP} Schwabe North America setid — Mexico SPL is list-4.`,
    ),
    cleanAlternatives: ALTS.painTopical,
    sourcesGeneral: [dmUrl(SET.triflora) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  btRow({
    id: ID.ssssting,
    productName: 'B&T Ssssting Stop Gel',
    category: FIRST_AID,
    barcode: BATCH37_CATCHUP_BARCODES[ID.ssssting],
    formulaId: ID.ssssting,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Echinacea angustifolia', strength: '1X HPUS' },
      { name: 'Ledum palustre twig', strength: '2X HPUS' },
      { name: 'Urtica dioica', strength: '1X HPUS' },
    ],
    inactiveIngredients: [
      flag('Citronella oil', 'cleared', dailymed(SET.ssssting, METH.citronella)),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.ssssting, METH.citronella)),
      flag('Jojoba oil', 'cleared', dailymed(SET.ssssting, METH.citronella)),
      flag('Alcohol', 'limited', dailymed(SET.ssssting, METH.alcoholVehicle)),
      flag('Witch hazel', 'cleared', dailymed(SET.ssssting, METH.witchHazel)),
      flag('Carbomer homopolymer type C', 'cleared', dailymed(SET.ssssting, METH.carbomer)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.ssssting, METH.naoh)),
      flag('Purified water', 'cleared', dailymed(SET.ssssting, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: B&T Ssssting Stop Gel = Caution. Citronella / eucalyptus / jojoba as gel inactives = Caution; alcohol Limited; witch hazel Cleared. ${CITRONELLA_TAP} Schwabe North America setid — Mexico SPL is list-4.`,
    ),
    cleanAlternatives: ALTS.firstAid,
    sourcesGeneral: [dmUrl(SET.ssssting) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  btRow({
    id: ID.florasone,
    productName: 'B&T Florasone Cream',
    category: FIRST_AID,
    barcode: BATCH37_CATCHUP_BARCODES[ID.florasone],
    formulaId: ID.florasone,
    audience: ADULT,
    minAge: 6,
    form: 'cream',
    activeIngredients: [
      { name: 'Cardiospermum halicacabum flowering top', strength: '1X HPUS' },
    ],
    inactiveIngredients: [
      flag('Benzyl alcohol', 'cleared', dailymed(SET.florasone, METH.benzylAdult)),
      flag('Alcohol', 'limited', dailymed(SET.florasone, METH.alcoholVehicle)),
      flag('Mineral oil', 'cleared', dailymed(SET.florasone, METH.mineralOil)),
      flag('Glycol stearate', 'cleared', dailymed(SET.florasone, METH.glycolStearate)),
      flag('Isopropyl myristate', 'cleared', dailymed(SET.florasone, METH.ipm)),
      flag('Stearyl heptanoate', 'cleared', dailymed(SET.florasone, METH.stearylHeptanoate)),
      flag('Cetyl alcohol', 'cleared', dailymed(SET.florasone, METH.fattyAlcohol)),
      flag('Glycerin', 'cleared', dailymed(SET.florasone, METH.cleared)),
      flag('Potassium hydroxide', 'cleared', dailymed(SET.florasone, METH.koh)),
      flag('Purified water', 'cleared', dailymed(SET.florasone, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: B&T Florasone Cream = Caution. Mineral oil / glycol stearate / IPM / stearyl heptanoate Cleared (this-pass lock). Benzyl alcohol is standalone Caution on this 6+ topical (not the under-3 Avoid split). Alcohol vehicle Limited. ${KOH_TAP} ${CREAM_OIL_LINE} Schwabe North America — Mexico SPL is list-4. Ages 6+.`,
    ),
    cleanAlternatives: ALTS.firstAid,
    sourcesGeneral: [dmUrl(SET.florasone) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  btRow({
    id: ID.psoriaflora,
    productName: 'B&T Psoriaflora Cream (1 oz)',
    category: FIRST_AID,
    barcode: BATCH37_CATCHUP_BARCODES[ID.psoriaflora],
    formulaId: ID.psoriaflora,
    audience: ADULT,
    minAge: 6,
    form: 'cream',
    activeIngredients: [{ name: 'Mahonia aquifolium root bark', strength: '2X HPUS' }],
    inactiveIngredients: [
      flag('Benzyl alcohol', 'cleared', dailymed(SET.psoriaflora, METH.benzylAdult)),
      flag('Alcohol', 'limited', dailymed(SET.psoriaflora, METH.alcoholVehicle)),
      flag('Mineral oil', 'cleared', dailymed(SET.psoriaflora, METH.mineralOil)),
      flag('Glycol stearate', 'cleared', dailymed(SET.psoriaflora, METH.glycolStearate)),
      flag('Isopropyl myristate', 'cleared', dailymed(SET.psoriaflora, METH.ipm)),
      flag('Stearyl heptanoate', 'cleared', dailymed(SET.psoriaflora, METH.stearylHeptanoate)),
      flag('Cetyl alcohol', 'cleared', dailymed(SET.psoriaflora, METH.fattyAlcohol)),
      flag('Potassium hydroxide', 'cleared', dailymed(SET.psoriaflora, METH.koh)),
      flag('Purified water', 'cleared', dailymed(SET.psoriaflora, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: B&T Psoriaflora Cream = Caution. Same locked cream stack as Florasone (mineral oil / glycol stearate / IPM / stearyl heptanoate Cleared; benzyl alcohol Caution; alcohol Limited). ${KOH_TAP} Schwabe North America — Mexico SPL is list-4.`,
    ),
    cleanAlternatives: ALTS.firstAid,
    sourcesGeneral: [dmUrl(SET.psoriaflora) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  btRow({
    id: ID.coughDay,
    productName: 'B&T Cough & Bronchial Daytime',
    category: COLD_FLU,
    barcode: BATCH37_CATCHUP_BARCODES[ID.coughDay],
    formulaId: ID.coughDay,
    audience: ADULT,
    minAge: 12,
    form: 'syrup',
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '3X HPUS' },
      { name: 'Bryonia alba root', strength: '3X HPUS' },
      { name: 'Calcium sulfide', strength: '6C HPUS' },
      { name: 'Spongia officinalis skeleton, roasted', strength: '3X HPUS' },
      { name: 'Tin', strength: '6C HPUS' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.coughDay, METH.alcoholVehicle)),
      flag('Potassium sorbate', 'limited', dailymed(SET.coughDay, METH.sorbate)),
      flag('Sorbitol', 'limited', dailymed(SET.coughDay, METH.sorbitol)),
      flag('Oat', 'cleared', dailymed(SET.coughDay, METH.oat)),
      flag('Glycerin', 'cleared', dailymed(SET.coughDay, METH.cleared)),
      flag('Lactose monohydrate', 'cleared', dailymed(SET.coughDay, METH.cleared)),
      flag('Citric acid', 'cleared', dailymed(SET.coughDay, METH.cleared)),
      flag('Purified water', 'cleared', dailymed(SET.coughDay, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: B&T Cough & Bronchial Daytime = Caution. Current US SPL (setid ab0a4fd6, 2026) is the oat formula — oat Cleared; no barley malt on this carton. Alcohol + potassium sorbate + sorbitol Limited → Limited-only stays Caution. ${OAT_TAP} Older barley-malt daytime SPLs (e8949f67 / 791a8da1) are not this row. Ages 12+. Contains lactose.`,
    ),
    cleanAlternatives: ALTS.cold,
    sourcesGeneral: [dmUrl(SET.coughDay) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),

  btRow({
    id: ID.coughNight,
    productName: 'B&T Cough & Bronchial Nighttime',
    category: COLD_FLU,
    barcode: BATCH37_CATCHUP_BARCODES[ID.coughNight],
    formulaId: ID.coughNight,
    audience: ADULT,
    minAge: 12,
    form: 'syrup',
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '3X HPUS' },
      { name: 'Bryonia alba root', strength: '3X HPUS' },
      { name: 'Calcium sulfide', strength: '6C HPUS' },
      { name: 'Spongia officinalis skeleton, roasted', strength: '3X HPUS' },
      { name: 'Tin', strength: '6C HPUS' },
      { name: 'Medicago sativa leaf', strength: '2X HPUS' },
      { name: 'Alfalfa', strength: '2X HPUS' },
      { name: 'Arabica coffee bean', strength: '7X HPUS' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.coughNight, METH.alcoholVehicle)),
      flag('Potassium sorbate', 'limited', dailymed(SET.coughNight, METH.sorbate)),
      flag('Sorbitol', 'limited', dailymed(SET.coughNight, METH.sorbitol)),
      flag('Oat', 'cleared', dailymed(SET.coughNight, METH.oat)),
      flag('Glycerin', 'cleared', dailymed(SET.coughNight, METH.cleared)),
      flag('Lactose monohydrate', 'cleared', dailymed(SET.coughNight, METH.cleared)),
      flag('Anhydrous citric acid', 'cleared', dailymed(SET.coughNight, METH.cleared)),
      flag('Purified water', 'cleared', dailymed(SET.coughNight, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote: homeoNote(
      `FOUNDER-LOCKED DRAFT: B&T Cough & Bronchial Nighttime = Caution. Current US SPL (setid 31445469, 2026) is the oat-inactive formula — oat Cleared; no barley malt. Alcohol + potassium sorbate + sorbitol Limited → not Clean (Clean only if the locked stack is Cleared-only). ${OAT_TAP} Older barley-malt nighttime SPLs (00d38f6f / b3899e48) are not this row. Ages 12+. Contains lactose.`,
    ),
    cleanAlternatives: ALTS.cold,
    sourcesGeneral: [dmUrl(SET.coughNight) + ' — ' + UNVERIFIED_NOTE, CARLSTON],
  }),
];

for (const record of BATCH37_MEDINATURA_BT) {
  const expected = BATCH37_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 37 catch-up UPC drift on ${record.id}`);
  }
}
