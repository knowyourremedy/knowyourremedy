// DRAFT / not verified / batch 10 adult Digestive
// Digestive · audience 'adult' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Digestive / Clean Picks file is edited
// from this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// CLEAN
// - D1 Boiron AcidCalm meltaway = Clean. setid 258ebe86. Croscarmellose /
//   lactose / Mg stearate. Homeopathic.
// - D2 Boiron NauseaCalm pellets = Clean. setid 1e8e0388. Lactose + sucrose.
// - D3 Boiron MotionCalm pellets = Clean. setid 1ea4de81. Lactose + sucrose.
// - D4 Phillips Original Milk of Magnesia liquid = Clean. setid 0a57bb45.
//   Purified water + sodium hypochlorite only (list holds). NaOCl is not in
//   Methodology §5 — ungraded (v1.6 intake), not a Clean-blocker.
// CAUTION
// - D5 Alka-Seltzer Gold = Caution. Mannitol Limited (1 pt). Mg stearate
//   Cleared-class. setid 0824bedb. Single Limited ≠ Clean (founder lock).
// - D6 Rolaids Ultra/ES Mint = Caution. Sucralose + flavor + SiO2.
//   setid 0f8cfcc5. Raw 2+1 (+ maltodextrin) math is Avoid — draft follows
//   the approved Caution call (SiO2 is a 0-pt cap, not a softener).
// - D7 Phillips Fresh Mint MOM = Caution. Flavor + saccharin. setid 0a59f9c3
//   (corrected full setid; draft prefix 0a59f9c3-…8e88 404s).
// - D8 Gaviscon Extra Strength Cool Mint liquid = Caution. AlOH active-safety
//   cap (floor Caution). Dye-free mint inactives confirmed on SPL 2d74e5bc
//   Extra Strength Cool Mint panel. NOT Avoid on the active alone.
// - D9 Gaviscon ES tablets (plain, not Cherry Ace-K) = Caution. AlOH cap +
//   flavor / sugar-alcohol Limited. Cherry Ace-K panel = Avoid twin
//   (separate formulaId `gaviscon-es-tablets-cherry`).
// - D10 Imodium A-D caplets = Caution. PEG. setid 01da76d0.
// - D11 Mylanta Gas Minis = Caution. Sucralose + flavors + silica.
//   setid 5045b945. Raw 2+1 math is Avoid — founder Caution.
// - D12 Emetrol Chewables = Caution. Sucralose + flavor + silica.
//   setid 9880a18a (Mixed Berry 4965fab0 is the same demerit family).
// AVOID
// - D13 Tums Ultra fruit-dyed = Avoid. Dye lakes and/or talc High.
// - D14 Tums Smoothies = Avoid. Dye lakes (talc Extra Strength Smoothies
//   sibling is the same Avoid family — separate carton).
// - D15 Tums Chewy Bites = Avoid. Dye lakes + TiO2 (± parabens).
// - D16 Rolaids Ultra Assorted Fruit = Avoid. Dye lakes. Advanced Berry
//   is the same demerit family.
// - D17 Phillips Wild Cherry MOM = Avoid. D&C Red #28. setid 0a6d824a.
// - D18 Gaviscon Regular Strength liquid = Avoid. AlOH Caution floor
//   overridden by Blue #1 / Yellow #10. setid 2d74e5bc (RS panel).
// - D19 Pepcid AC Original = Avoid. TiO2 + talc coating.
// - D20 Pepcid AC Maximum Strength = Avoid. TiO2 + talc coating.
// - D21 Pepcid AC Icy Cool Mint = Avoid. TiO2 + Blue #1 + sucralose + talc.
// - D22 Equate Famotidine 20 mg = Avoid. TiO2 + talc coating.
// - D23 Prilosec OTC = Avoid. TiO2 + talc + PEG coating.
// - D24 Imodium A-D softgels = Avoid. Blue #1 (± BHA). setid 31bfcbb4.
// - D25 Imodium A-D liquid = Avoid. Dyes + sucralose + TiO2 + caramel
//   (undisclosed class).
// - D26 Imodium Multi-Symptom Relief = Avoid. Ace-K + flavor. setid ecb91e47.
// - D27 Pepto-Bismol caplets = Avoid. D&C Red #27 lake.
// - D28 Pepto-Bismol chewables = Avoid. Red #27 lake + talc.
// - D29 Pepto-Bismol liquid = Avoid. D&C Red #22 / #28.
// - D30 up&up 5-Symptom Digestive Relief chewables = Avoid. Red lake +
//   sucralose.
// - D31 Gas-X Maximum Strength softgels = Avoid. TiO2 + dyes.
// - D32 Gas-X Ultimate Strength softgels = Avoid. Red #27 lake.
// - D33 Gas-X Extra Strength chewables = Avoid. Dye lakes.
// - D34 Phazyme Fast Gels (250 mg) = Avoid. Dyes + TiO2.
// - D35 Dramamine Less Drowsy = Avoid. Yellow #10 lake.
// - D36 Dramamine Chewable Orange = Avoid. Yellow #6 + BHT.
// - D37 Bonine = Avoid. Red #40 lake.
// - D38 Emetrol Cherry liquid = Avoid. Red #40 + methylparaben.
//   setid a8469128.
// - D39 Nauzene Chewables = Avoid. Dye + aspartame (a60660b2). Ginger Honey
//   twin (25c9825d) is dye + sucralose — same Avoid family.
// - D40 Culturelle Digestive Daily (TiO2 carton) = Avoid. Retailer / CA
//   brand lists. Current US brand-page purple-carrot carton is a different
//   formula — not this row; Clean is not invented.
// - D41 Align Daily Probiotic = Avoid. TiO2 on retailer other-ingredients
//   (± propyl gallate on some cartons).
//
// TALLY (unverified drafts): 42 rows — Clean 4 / Caution 8 / Avoid 30.
// Independently Clean in THIS batch only: AcidCalm, NauseaCalm, MotionCalm,
// Phillips Original MOM. Caution / Avoid rows offer the closest Clean peer
// with form labeled (§6). Antacid / acid-reducer Avoid → Phillips MOM or
// AcidCalm. Nausea Avoid → NauseaCalm. Motion Avoid → MotionCalm. No
// independently Clean loperamide / simethicone / bismuth / probiotic /
// H2 / PPI exists here — those rows still point at the closest Clean
// Digestive peer (form labeled).
//
// ALUMINUM HYDROXIDE RULE (LOCKED v1.6): active-safety Caution cap. NEVER
// add AlOH as a §5 inactive-table row. Floor is Caution from the active.
// Dyes / Ace-K / parabens can still push Avoid. Mandatory honestNote:
// long-term use, CKD, infants; NOT Avoid for typical short-term antacid
// use on the active alone.
// SINGLE LIMITED ≠ CLEAN: Alka-Seltzer Gold stays Caution for mannitol.
// SiO2 / silica = Caution cap (0 demerit points), not Avoid alone.
// Talc / TiO2 / synthetic dyes / parabens / aspartame / BHT / BHA /
// undisclosed caramel = High Avoid. Sucralose / Ace-K / PEG / PS80 /
// saccharin / PG = Moderate. Flavors / maltodextrin / mannitol / sorbitol
// = Limited. Seed / industrial oils in gummies = High Avoid (no concrete
// probiotic-gummy SKU written).
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - Nexium 24HR
// - Prevacid OTC
// - Pepcid Complete
// - Florastor
// - Kids Dramamine
// - Amazon-only SKUs
// - Optional probiotic gummy (no concrete brick-and-mortar SKU with a
//   confirmed seed / vegetable oil)
// - Optional Maalox-style store AlOH liquid (CVS / Walgreens ES mint
//   liquids add sucralose + flavor; no dye-free / additive-clean store
//   SPL written — Gaviscon ES Cool Mint already covers dye-free AlOH)

import type {
  ActiveSafetyFlag,
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const DIGESTIVE = 'Digestive';
const ADULT = 'adult' as const;
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  parabens: 'Methodology §5 High-tier (parabens)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B; locked Avoid, §0 override)',
  bht: 'Methodology §5 High-tier (BHT — locked Avoid, EU 2022 endocrine restriction)',
  bha: 'Methodology §5 High-tier (BHA — NTP reasonably anticipated carcinogen)',
  caramel:
    'Methodology §5 High-tier (caramel color, undisclosed class — treated as III/IV)',
  propylGallate: 'Methodology §5 High-tier (propyl gallate — locked v1.6)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  sugarAlcohol:
    'Methodology §5 Limited-risk (other sugar alcohols — isomalt / sugar-alcohol class)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  benzyl:
    'Methodology §5 Caution (benzyl alcohol — general oral OTC; standalone Caution, not additive-scored, not Avoid on this population)',
  carmine:
    'Methodology §5 Caution (cochineal / carmine — allergenic; standalone Caution, not Avoid)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer — locked v1.6)',
  lecithin: 'Methodology §5 Cleared (lecithin, soy or sunflower — locked v1.6)',
  castor: 'Methodology §5 Cleared (castor oil / polyoxyl castor oil, oral/topical — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
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

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const ALOH_NOTE =
  'Aluminum hydroxide is a locked Methodology v1.6 active-safety Caution cap — not a §5 inactive-table row. Long-term use can deplete phosphate / contribute to osteomalacia even with normal kidneys; accumulation / encephalopathy risk is higher in CKD / dialysis; infants are a labeled risk population. Alzheimer\'s link is unproven (weak/contested). NOT Avoid for typical short-term antacid use on the active alone.';

const ALOH_FLAG: ActiveSafetyFlag = {
  description:
    'Long-term phosphate depletion / osteomalacia; CKD and infant accumulation risk — Caution cap. NOT Avoid for typical short-term antacid use',
  cappedAt: 'caution',
  source:
    'Methodology §4 / §5 worked example — aluminum hydroxide Caution cap (locked v1.6)',
};

const ACIDCALM = 'boiron-acidcalm';
const NAUSEACALM = 'boiron-nauseacalm';
const MOTIONCALM = 'boiron-motioncalm';
const PHILLIPS_MOM = 'phillips-mom-original';

const SET_ACIDCALM = '258ebe86-1fb3-c03d-e063-6394a90a820b';
const SET_NAUSEACALM = '1e8e0388-c5c8-d4da-e063-6394a90ab294';
const SET_MOTIONCALM = '1ea4de81-3ec0-e9e4-e063-6294a90a7ac9';
const SET_PHILLIPS_ORIG = '0a57bb45-d4f7-443b-e054-00144ff8d46c';
const SET_ALKA_GOLD = '0824bedb-413b-2fa0-e054-00144ff88e88';
const SET_ROLAIDS_MINT = '0f8cfcc5-e975-6645-e063-6394a90adf6c';
const SET_PHILLIPS_MINT = '0a59f9c3-c14e-2824-e054-00144ff8d46c';
const SET_GAVISCON_LIQ = '2d74e5bc-1f10-4fb6-9258-cd906e360013';
const SET_GAVISCON_TABS = '7f367927-c366-465c-a059-e2cfb337d562';
const SET_IMODIUM_CAP = '01da76d0-1979-4c45-9d39-c72ae4e4ffe2';
const SET_MYLANTA_GAS = '5045b945-23ee-4c25-a32c-af3cd5045c73';
const SET_EMETROL_CHEW = '9880a18a-cf84-47cd-99b5-d692065a25bf';
const SET_TUMS_ULTRA = 'f4786707-a0f7-4ba8-9656-06278d1b4b6c';
const SET_TUMS_SMOOTH = 'c22944b8-8733-4689-be0c-f320467f79ea';
const SET_TUMS_CHEWY = '72ac000c-90f7-42e2-88a6-740de114a954';
const SET_ROLAIDS_FRUIT = '0cc9d823-bdac-0a65-e063-6394a90aa65c';
const SET_PHILLIPS_CHERRY = '0a6d824a-3d9a-07f9-e054-00144ff8d46c';
const SET_PEPCID_AC = '54f4086f-e443-4e7e-8c7e-94e152e1c256';
const SET_PEPCID_MAX = '2854047f-c5c4-43c3-8ef2-5c0a84a307f2';
const SET_PEPCID_ICY = '0f343092-4fc7-1fff-e063-6294a90aba6e';
const SET_EQUATE_FAM = '8ac94821-aa78-4e57-bc9a-f1f2a0e47b07';
const SET_PRILOSEC = '37291cab-e350-d8e3-e063-6294a90a9cb1';
const SET_IMODIUM_SOFT = '31bfcbb4-c58c-4edc-ac68-356a448b7507';
const SET_IMODIUM_LIQ = '76a976d5-8bee-4158-a94d-7fbfc5544fd4';
const SET_IMODIUM_MULTI = 'ecb91e47-2b0c-47c8-9256-4623d8bc825e';
const SET_PEPTO_CAP = '66d9d631-ba73-3ce4-e053-2a91aa0a1cc4';
const SET_PEPTO_CHEW = 'dd2f2205-34d1-4960-bf37-bb8d534cd0e1';
const SET_PEPTO_LIQ = '67006e82-870d-8d63-e053-2991aa0a02d1';
const SET_UPUP = '7f6b2960-943d-464c-9ff9-4649a8ab4a4e';
const SET_GASX_MAX = '45d1e373-0717-47df-9160-619c451666f4';
const SET_GASX_ULT = '24b777e5-f0b5-400d-8ca9-ae0c04b8503b';
const SET_GASX_CHEW = 'f553374b-c20e-4c92-a8c0-cef0aeda8d1c';
const SET_PHAZYME = '470d2ea9-a869-47c5-9073-f970f58a0801';
const SET_DRAM_LD = 'fa6a0969-7427-4b87-bc04-a2792665c218';
const SET_DRAM_OR = '30387e63-278d-412a-bcad-7965c7c0aea7';
const SET_BONINE = '0b2ea6b8-b342-4940-8922-898758fbeb31';
const SET_EMETROL_LIQ = 'a8469128-592a-4682-82c7-4d2a6f97a998';
const SET_NAUZENE = 'a60660b2-c5db-45a0-885f-de93e655380d';

const CULTURELLE_CITE =
  'Culturelle Canada brand page + US retailer labels (Stop & Shop) — titanium dioxide (color) carton';
const ALIGN_CITE =
  'Align Daily Probiotic retailer other-ingredients (Costco / Stop & Shop / Food Lion) — titanium dioxide (color)';

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ANTACID_ALTS: CleanAlternative[] = [
  alt(
    PHILLIPS_MOM,
    'Independently Clean adult antacid analog in this batch (Phillips Original Milk of Magnesia, magnesium hydroxide liquid). Form: liquid — labeled, not a hard filter (§6).',
  ),
  alt(
    ACIDCALM,
    'Independently Clean adult Digestive analog (Boiron AcidCalm, homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim.',
  ),
];

const NAUSEA_ALTS: CleanAlternative[] = [
  alt(
    NAUSEACALM,
    'Independently Clean adult nausea analog in this batch (Boiron NauseaCalm, homeopathic pellets). Form: pellets — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim.',
  ),
  alt(
    MOTIONCALM,
    'Independently Clean adult motion-sickness analog (Boiron MotionCalm, homeopathic pellets). Form: pellets — labeled, not a hard filter (§6).',
  ),
];

const MOTION_ALTS: CleanAlternative[] = [
  alt(
    MOTIONCALM,
    'Independently Clean adult motion-sickness analog in this batch (Boiron MotionCalm, homeopathic pellets). Form: pellets — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim.',
  ),
  alt(
    NAUSEACALM,
    'Independently Clean adult nausea analog (Boiron NauseaCalm, homeopathic pellets). Form: pellets — labeled, not a hard filter (§6).',
  ),
];

const DIGESTIVE_PEER_ALTS: CleanAlternative[] = [
  alt(
    ACIDCALM,
    'No independently Clean conventional match for this active in this batch. Closest independently Clean Digestive peer is Boiron AcidCalm (homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
  alt(
    PHILLIPS_MOM,
    'Independently Clean adult conventional Digestive analog in this batch (Phillips Original Milk of Magnesia liquid). Form: liquid — labeled, not a hard filter (§6). Different active; cleanliness peer only.',
  ),
];

export const BATCH10_ADULT_DIGESTIVE: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: ACIDCALM,
    productName: 'Boiron AcidCalm',
    brand: 'Boiron',
    category: DIGESTIVE,
    formulaId: ACIDCALM,
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Robinia pseudoacacia', strength: '4C HPUS' },
      { name: 'Abies nigra (Picea mariana resin)', strength: '4C HPUS' },
      { name: 'Carbo vegetabilis', strength: '4C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_ACIDCALM, 'Croscarmellose sodium'),
      cleared(SET_ACIDCALM, 'Lactose'),
      cleared(SET_ACIDCALM, 'Magnesium stearate'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boiron AcidCalm meltaway = Clean. Draft Clean on inactives (croscarmellose sodium, lactose, magnesium stearate). Homeopathic meltaway tablets — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Contains lactose. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_ACIDCALM} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: NAUSEACALM,
    productName: 'Boiron NauseaCalm',
    brand: 'Boiron',
    category: DIGESTIVE,
    formulaId: NAUSEACALM,
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Tabacum', strength: '4C HPUS' },
      { name: 'Petroleum', strength: '4C HPUS' },
      { name: 'Ipecacuanha', strength: '4C HPUS' },
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Cocculus indicus', strength: '4C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_NAUSEACALM, 'Lactose'),
      cleared(SET_NAUSEACALM, 'Sucrose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boiron NauseaCalm pellets = Clean. Draft Clean on inactives (lactose + sucrose). Homeopathic pellets — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Contains lactose. Adult Digestive row; carton also has a 2+ chart.',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_NAUSEACALM} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: MOTIONCALM,
    productName: 'Boiron MotionCalm',
    brand: 'Boiron',
    category: DIGESTIVE,
    formulaId: MOTIONCALM,
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Ipecacuanha', strength: '4C HPUS' },
      { name: 'Cocculus indicus', strength: '4C HPUS' },
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Tabacum', strength: '4C HPUS' },
      { name: 'Petroleum', strength: '4C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_MOTIONCALM, 'Lactose'),
      cleared(SET_MOTIONCALM, 'Sucrose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boiron MotionCalm pellets = Clean. Draft Clean on inactives (lactose + sucrose). Homeopathic pellets — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Contains lactose. Adult Digestive row; carton also has a 2+ chart.',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_MOTIONCALM} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: PHILLIPS_MOM,
    productName: "Phillips' Original Milk of Magnesia",
    brand: "Phillips'",
    category: DIGESTIVE,
    formulaId: PHILLIPS_MOM,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '1200mg / 15mL' }],
    inactiveIngredients: [
      cleared(SET_PHILLIPS_ORIG, 'Purified water'),
      flag(
        'Sodium hypochlorite',
        'cleared',
        dailymed(
          SET_PHILLIPS_ORIG,
          'Not in Methodology §5 — ungraded (v1.6 intake); residual sanitizer on a two-inactive label. Not treated as a Clean-blocker.',
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Phillips Original Milk of Magnesia = Clean IF the two-inactive list holds (purified water + sodium hypochlorite). DailyMed setid 0a57bb45 matches that list. Sodium hypochlorite is not in Methodology §5 and is not graded on the spot (v1.6 intake) — mentioned here, not used to invent a flag. Fresh Mint and Wild Cherry are separate formulaIds (Caution / Avoid). Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `DailyMed setid ${SET_PHILLIPS_ORIG} (draft, not verified)`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'alka-seltzer-gold',
    productName: 'Alka-Seltzer Gold',
    brand: 'Alka-Seltzer',
    category: DIGESTIVE,
    barcode: '016500041085',
    formulaId: 'alka-seltzer-gold',
    audience: ADULT,
    minAge: 12,
    form: 'effervescent tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Citric acid', strength: '1000mg' },
      { name: 'Potassium bicarbonate', strength: '344mg' },
      { name: 'Sodium bicarbonate', strength: '1050mg' },
    ],
    inactiveIngredients: [
      flag('Mannitol', 'limited', dailymed(SET_ALKA_GOLD, METH.mannitol)),
      cleared(SET_ALKA_GOLD, 'Magnesium stearate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Alka-Seltzer Gold = Caution. Mannitol is Limited (1 pt). Magnesium stearate is Cleared-class. A single Limited-risk additive is not Clean — do not upgrade. Aspirin-free Gold formula (citric acid / bicarbonates), not original Alka-Seltzer. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_ALKA_GOLD} (draft, not verified)`],
  },
  {
    id: 'rolaids-ultra-mint',
    productName: 'Rolaids Ultra Strength Mint',
    brand: 'Rolaids',
    category: DIGESTIVE,
    barcode: '720112004535',
    formulaId: 'rolaids-ultra-mint',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Calcium carbonate', strength: '1000mg' },
      { name: 'Magnesium hydroxide', strength: '200mg' },
    ],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET_ROLAIDS_MINT, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET_ROLAIDS_MINT, METH.flavors)),
      flag('Maltodextrin', 'limited', dailymed(SET_ROLAIDS_MINT, METH.maltodextrin)),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET_ROLAIDS_MINT, METH.sio2),
      ),
      cleared(SET_ROLAIDS_MINT, 'Dextrose'),
      cleared(SET_ROLAIDS_MINT, 'Magnesium stearate'),
      cleared(SET_ROLAIDS_MINT, 'Stearic acid'),
      cleared(SET_ROLAIDS_MINT, 'Sucrose'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Rolaids Ultra/ES Mint = Caution (sucralose + flavor + SiO2). Raw demerit math is sucralose 2 + flavor 1 + maltodextrin 1 = 4 → Avoid; draft follows the approved Caution call. Silicon dioxide is the nanoparticle Caution cap (0 pts), not a softener and not the driver. Assorted Fruit / Advanced Berry dyed twins are separate Avoid rows. Ages 12+ (typical adult antacid chart).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_ROLAIDS_MINT} (draft, not verified)`],
  },
  {
    id: 'phillips-mom-mint',
    productName: "Phillips' Fresh Mint Milk of Magnesia",
    brand: "Phillips'",
    category: DIGESTIVE,
    barcode: '312843363069',
    formulaId: 'phillips-mom-mint',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '1200mg / 15mL' }],
    inactiveIngredients: [
      flag('Flavor', 'limited', dailymed(SET_PHILLIPS_MINT, METH.flavors)),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed(SET_PHILLIPS_MINT, METH.saccharin),
      ),
      cleared(SET_PHILLIPS_MINT, 'Purified water'),
      cleared(SET_PHILLIPS_MINT, 'Sodium hypochlorite'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Phillips Fresh Mint MOM = Caution (flavor + saccharin). Raw 1+2 math is 3 pts Avoid — draft follows the approved Caution call. Mineral oil appears on the SPL and is not in Methodology §5 (ungraded; v1.6 intake) — not the Caution driver. Original unsweetened MOM is the independently Clean twin. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PHILLIPS_MINT} (draft, not verified)`],
  },
  {
    id: 'gaviscon-es-cool-mint',
    productName: 'Gaviscon Extra Strength Cool Mint Liquid',
    brand: 'Gaviscon',
    category: DIGESTIVE,
    formulaId: 'gaviscon-es-cool-mint',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Aluminum hydroxide', strength: '254mg / 5mL' },
      { name: 'Magnesium carbonate', strength: '237.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag('Natural and artificial flavors', 'limited', dailymed(SET_GAVISCON_LIQ, METH.flavors)),
      flag(
        'Sodium saccharin',
        'moderate',
        dailymed(SET_GAVISCON_LIQ, METH.saccharin),
      ),
      flag('Sorbitol', 'limited', dailymed(SET_GAVISCON_LIQ, METH.sorbitol)),
      flag(
        'Benzyl alcohol',
        'cleared',
        dailymed(SET_GAVISCON_LIQ, METH.benzyl),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed(SET_GAVISCON_LIQ, METH.edta),
      ),
      flag('Xanthan gum', 'cleared', dailymed(SET_GAVISCON_LIQ, METH.gums)),
      cleared(SET_GAVISCON_LIQ, 'Glycerin'),
      cleared(SET_GAVISCON_LIQ, 'Purified water'),
    ],
    activeSafetyFlag: ALOH_FLAG,
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Gaviscon Extra Strength Cool Mint liquid = Caution. Dye-free mint inactives confirmed on DailyMed setid 2d74e5bc Extra Strength Cool Mint panel (benzyl alcohol, edetate disodium, glycerin, natural and artificial flavors, purified water, simethicone emulsion, sodium alginate, sodium saccharin, sorbitol, xanthan gum). Floor is Caution from aluminum hydroxide — ' +
      ALOH_NOTE +
      ' Raw sucralose-class math is saccharin 2 + flavor 1 + sorbitol 1 = 4 → Avoid; draft follows the approved Caution / AlOH-floor call. Regular Strength dyed panel on the same SPL is a separate Avoid formulaId. Extra Strength Cherry liquid panel is dye-free like Cool Mint (same inactives) — not a separate row. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_GAVISCON_LIQ} Extra Strength Cool Mint panel (draft, not verified)`,
      'Methodology §4 / §5 aluminum-hydroxide Caution cap (locked v1.6)',
    ],
  },
  {
    id: 'gaviscon-es-tablets',
    productName: 'Gaviscon Extra Strength Tablets',
    brand: 'Gaviscon',
    category: DIGESTIVE,
    formulaId: 'gaviscon-es-tablets',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Aluminum hydroxide', strength: '160mg' },
      { name: 'Magnesium carbonate', strength: '105mg' },
    ],
    inactiveIngredients: [
      flag('Flavor', 'limited', dailymed(SET_GAVISCON_TABS, METH.flavors)),
      flag('Sorbitol or mannitol', 'limited', dailymed(SET_GAVISCON_TABS, METH.mannitol)),
      cleared(SET_GAVISCON_TABS, 'Alginic acid'),
      cleared(SET_GAVISCON_TABS, 'Calcium stearate'),
      cleared(SET_GAVISCON_TABS, 'Sodium bicarbonate'),
      cleared(SET_GAVISCON_TABS, 'Sucrose'),
    ],
    activeSafetyFlag: ALOH_FLAG,
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Gaviscon Extra Strength tablets (plain, not Cherry) = Caution. Plain Extra Strength panel: alginic acid, calcium stearate, flavor, sodium bicarbonate, sucrose; may contain stearic acid / starch; contains sorbitol or mannitol. Flavor + sugar alcohol = Limited stack; floor is Caution from aluminum hydroxide. ' +
      ALOH_NOTE +
      ' Cherry Ace-K carton is a separate Avoid formulaId. Alginic acid / sodium alginate are not in Methodology §5 (ungraded; v1.6 intake). Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_GAVISCON_TABS} Extra Strength (plain) panel (draft, not verified)`,
      'Methodology §4 / §5 aluminum-hydroxide Caution cap (locked v1.6)',
    ],
  },
  {
    id: 'imodium-ad-caplets',
    productName: 'Imodium A-D Caplets',
    brand: 'Imodium',
    category: DIGESTIVE,
    formulaId: 'imodium-ad-caplets',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loperamide HCl', strength: '2mg' }],
    inactiveIngredients: [
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET_IMODIUM_CAP, METH.peg),
      ),
      cleared(SET_IMODIUM_CAP, 'Anhydrous lactose'),
      cleared(SET_IMODIUM_CAP, 'Carnauba wax'),
      cleared(SET_IMODIUM_CAP, 'Hypromellose'),
      cleared(SET_IMODIUM_CAP, 'Magnesium stearate'),
      cleared(SET_IMODIUM_CAP, 'Microcrystalline cellulose'),
      cleared(SET_IMODIUM_CAP, 'Pregelatinized starch'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Imodium A-D caplets = Caution (PEG Moderate, 2 pts). Softgels / liquid / Multi-Symptom are separate Avoid formulaIds. Contains lactose. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_IMODIUM_CAP} (draft, not verified)`],
  },
  {
    id: 'mylanta-gas-minis',
    productName: 'Mylanta Gas Minis Mint',
    brand: 'Mylanta',
    category: DIGESTIVE,
    formulaId: 'mylanta-gas-minis',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '125mg' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET_MYLANTA_GAS, METH.sucralose)),
      flag('Flavors', 'limited', dailymed(SET_MYLANTA_GAS, METH.flavors)),
      flag('Maltodextrin', 'limited', dailymed(SET_MYLANTA_GAS, METH.maltodextrin)),
      flag('Silica (silicon dioxide)', 'cleared', dailymed(SET_MYLANTA_GAS, METH.sio2)),
      flag('Isomalt', 'limited', dailymed(SET_MYLANTA_GAS, METH.sugarAlcohol)),
      cleared(SET_MYLANTA_GAS, 'Carboxymethylcellulose sodium'),
      cleared(SET_MYLANTA_GAS, 'Magnesium stearate'),
      cleared(SET_MYLANTA_GAS, 'Sucrose'),
      cleared(SET_MYLANTA_GAS, 'Tricalcium phosphate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Mylanta Gas Minis = Caution (sucralose + flavors + silica). Raw 2+1+maltodextrin/isomalt math is Avoid — draft follows the approved Caution call. Silicon dioxide is the 0-pt nanoparticle cap. Hydroxypropyl cellulose is on the SPL and is not independently graded in §5 (ungraded; not the driver). Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_MYLANTA_GAS} (draft, not verified)`],
  },
  {
    id: 'emetrol-chewables',
    productName: 'Emetrol Chewables',
    brand: 'Emetrol',
    category: DIGESTIVE,
    barcode: '365197204007',
    formulaId: 'emetrol-chewables',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Sodium citrate dihydrate', strength: '230mg' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET_EMETROL_CHEW, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET_EMETROL_CHEW, METH.flavors)),
      flag('Maltodextrin', 'limited', dailymed(SET_EMETROL_CHEW, METH.maltodextrin)),
      flag('Silica (silicon dioxide)', 'cleared', dailymed(SET_EMETROL_CHEW, METH.sio2)),
      cleared(SET_EMETROL_CHEW, 'Dextrose'),
      cleared(SET_EMETROL_CHEW, 'Fructose'),
      cleared(SET_EMETROL_CHEW, 'Magnesium stearate'),
      cleared(SET_EMETROL_CHEW, 'Sodium carboxymethylcellulose'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Emetrol Chewables = Caution (sucralose + flavor + silica). Mixed Berry twin (setid 4965fab0) shares the same sucralose / flavor / silica demerit family — one row. Raw 2+1 math is Avoid — draft follows the approved Caution call. Cherry liquid is a separate Avoid formulaId. Ages 12+ adult row (carton charts may run younger).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NAUSEA_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_EMETROL_CHEW} (draft, not verified)`],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'tums-ultra-fruit-dyed',
    productName: 'Tums Ultra Assorted Fruit',
    brand: 'Tums',
    category: DIGESTIVE,
    formulaId: 'tums-ultra-fruit-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Calcium carbonate', strength: '1000mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1 aluminum lake', 'high', dailymed(SET_TUMS_ULTRA, METH.dyes)),
      flag('FD&C Red No. 40 aluminum lake', 'high', dailymed(SET_TUMS_ULTRA, METH.dyes)),
      flag('FD&C Yellow No. 5 aluminum lake', 'high', dailymed(SET_TUMS_ULTRA, METH.dyes)),
      flag('FD&C Yellow No. 6 aluminum lake', 'high', dailymed(SET_TUMS_ULTRA, METH.dyes)),
      flag('Talc', 'high', dailymed(SET_TUMS_ULTRA, METH.talc)),
      flag('Flavors', 'limited', dailymed(SET_TUMS_ULTRA, METH.flavors)),
      cleared(SET_TUMS_ULTRA, 'Corn starch'),
      cleared(SET_TUMS_ULTRA, 'Sucrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Tums Ultra fruit-dyed = Avoid. Assorted Fruit panel (setid f4786707) lists Blue #1 / Red #40 / Yellow #5 / Yellow #6 lakes plus talc — each High-tier. Assorted Tropical Fruit panel on the same SPL drops Blue #1 but keeps dye lakes + talc (same Avoid family). A separate Ultra SPL (c544120f) is also dye lakes + talc. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_TUMS_ULTRA} (draft, not verified)`],
  },
  {
    id: 'tums-smoothies',
    productName: 'Tums Smoothies Assorted Fruit',
    brand: 'Tums',
    category: DIGESTIVE,
    formulaId: 'tums-smoothies',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Calcium carbonate', strength: '750mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1 aluminum lake', 'high', dailymed(SET_TUMS_SMOOTH, METH.dyes)),
      flag('FD&C Red No. 40 aluminum lake', 'high', dailymed(SET_TUMS_SMOOTH, METH.dyes)),
      flag('FD&C Yellow No. 5 aluminum lake', 'high', dailymed(SET_TUMS_SMOOTH, METH.dyes)),
      flag('FD&C Yellow No. 6 aluminum lake', 'high', dailymed(SET_TUMS_SMOOTH, METH.dyes)),
      flag('Flavors', 'limited', dailymed(SET_TUMS_SMOOTH, METH.flavors)),
      flag('Sorbitol', 'limited', dailymed(SET_TUMS_SMOOTH, METH.sorbitol)),
      flag('Acacia (gum arabic)', 'cleared', dailymed(SET_TUMS_SMOOTH, METH.gums)),
      flag('Guar gum', 'cleared', dailymed(SET_TUMS_SMOOTH, METH.gums)),
      cleared(SET_TUMS_SMOOTH, 'Dextrose'),
      cleared(SET_TUMS_SMOOTH, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Tums Smoothies = Avoid (dye lakes High). Berry Fusion / Mixed Berry panel on the same SPL keeps Blue #1 + Red #40 lakes. Extra Strength Smoothies (setid 11078d7c) is a dye-free talc carton — still Avoid (talc High); same Avoid family, different formula, not merged. Contains soy on some Smoothies panels. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_TUMS_SMOOTH} (draft, not verified)`],
  },
  {
    id: 'tums-chewy-bites',
    productName: 'Tums Chewy Bites',
    brand: 'Tums',
    category: DIGESTIVE,
    formulaId: 'tums-chewy-bites',
    audience: ADULT,
    minAge: 12,
    form: 'chew',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Calcium carbonate', strength: '750mg' }],
    inactiveIngredients: [
      flag('FD&C Red No. 40 aluminum lake', 'high', dailymed(SET_TUMS_CHEWY, METH.dyes)),
      flag('FD&C Yellow No. 5 aluminum lake', 'high', dailymed(SET_TUMS_CHEWY, METH.dyes)),
      flag('FD&C Blue No. 2 aluminum lake', 'high', dailymed(SET_TUMS_CHEWY, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET_TUMS_CHEWY, METH.tio2)),
      flag('Methylparaben', 'high', dailymed(SET_TUMS_CHEWY, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_TUMS_CHEWY, METH.parabens)),
      flag('Carmine', 'cleared', dailymed(SET_TUMS_CHEWY, METH.carmine)),
      flag('Propylene glycol', 'moderate', dailymed(SET_TUMS_CHEWY, METH.pg)),
      flag('Natural and artificial flavors', 'limited', dailymed(SET_TUMS_CHEWY, METH.flavors)),
      flag('Maltodextrin', 'limited', dailymed(SET_TUMS_CHEWY, METH.maltodextrin)),
      flag('Sodium benzoate', 'limited', dailymed(SET_TUMS_CHEWY, METH.benzoate)),
      flag('Sorbitol', 'limited', dailymed(SET_TUMS_CHEWY, METH.sorbitol)),
      flag('Soy lecithin', 'cleared', dailymed(SET_TUMS_CHEWY, METH.lecithin)),
      cleared(SET_TUMS_CHEWY, 'Sucrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Tums Chewy Bites = Avoid. Haleon multi-flavor SPL (72ac000c) carries dye lakes, titanium dioxide, and methylparaben / propylparaben — any one is High-tier. Corn / vegetable oil and coconut oil appear on Chewy Bites SPLs; this is a chew, not a gummy, so the seed/industrial-oil High gummy rule is not applied. Wintermint / Orange-and-Cream twins stay Avoid on dyes and/or TiO2 / parabens. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_TUMS_CHEWY} (draft, not verified)`],
  },
  {
    id: 'rolaids-assorted-dyed',
    productName: 'Rolaids Ultra Strength Assorted Fruit',
    brand: 'Rolaids',
    category: DIGESTIVE,
    formulaId: 'rolaids-assorted-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Calcium carbonate', strength: '1000mg' },
      { name: 'Magnesium hydroxide', strength: '200mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Red No. 40 aluminum lake', 'high', dailymed(SET_ROLAIDS_FRUIT, METH.dyes)),
      flag('FD&C Yellow No. 5 aluminum lake', 'high', dailymed(SET_ROLAIDS_FRUIT, METH.dyes)),
      flag('FD&C Yellow No. 6 aluminum lake', 'high', dailymed(SET_ROLAIDS_FRUIT, METH.dyes)),
      flag('Sucralose', 'moderate', dailymed(SET_ROLAIDS_FRUIT, METH.sucralose)),
      flag(
        'Natural and artificial flavor',
        'limited',
        dailymed(SET_ROLAIDS_FRUIT, METH.flavors),
      ),
      flag('Maltodextrin', 'limited', dailymed(SET_ROLAIDS_FRUIT, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', dailymed(SET_ROLAIDS_FRUIT, METH.sio2)),
      flag('Tocopherols', 'cleared', dailymed(SET_ROLAIDS_FRUIT, METH.tocopherols)),
      cleared(SET_ROLAIDS_FRUIT, 'Dextrose'),
      cleared(SET_ROLAIDS_FRUIT, 'Magnesium stearate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Rolaids Ultra Assorted Fruit = Avoid (dye lakes High). Advanced Wild Berry / Mixed Berry (setids 07649a83 / 3884c05a) add Blue #1 / Red #40 lakes — same Avoid demerit family; notes cover those twins. Mint Ultra is the separate Caution formulaId. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_ROLAIDS_FRUIT} (draft, not verified)`],
  },
  {
    id: 'phillips-mom-cherry',
    productName: "Phillips' Wild Cherry Milk of Magnesia",
    brand: "Phillips'",
    category: DIGESTIVE,
    formulaId: 'phillips-mom-cherry',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '1200mg / 15mL' }],
    inactiveIngredients: [
      flag('D&C Red No. 28', 'high', dailymed(SET_PHILLIPS_CHERRY, METH.dyes)),
      flag('Flavor', 'limited', dailymed(SET_PHILLIPS_CHERRY, METH.flavors)),
      flag('Xanthan gum', 'cleared', dailymed(SET_PHILLIPS_CHERRY, METH.gums)),
      cleared(SET_PHILLIPS_CHERRY, 'Anhydrous citric acid'),
      cleared(SET_PHILLIPS_CHERRY, 'Glycerin'),
      cleared(SET_PHILLIPS_CHERRY, 'Microcrystalline cellulose'),
      cleared(SET_PHILLIPS_CHERRY, 'Purified water'),
      cleared(SET_PHILLIPS_CHERRY, 'Sucrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Phillips Wild Cherry MOM = Avoid. D&C Red #28 is High-tier. Original unsweetened MOM is the independently Clean twin. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PHILLIPS_CHERRY} (draft, not verified)`],
  },
  {
    id: 'gaviscon-rs-liquid-dyed',
    productName: 'Gaviscon Regular Strength Liquid',
    brand: 'Gaviscon',
    category: DIGESTIVE,
    formulaId: 'gaviscon-rs-liquid-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Aluminum hydroxide', strength: '95mg / 5mL' },
      { name: 'Magnesium carbonate', strength: '358mg / 5mL' },
    ],
    inactiveIngredients: [
      flag('D&C Yellow No. 10', 'high', dailymed(SET_GAVISCON_LIQ, METH.dyes)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET_GAVISCON_LIQ, METH.dyes)),
      flag('Flavor', 'limited', dailymed(SET_GAVISCON_LIQ, METH.flavors)),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed(SET_GAVISCON_LIQ, METH.saccharin),
      ),
      flag('Sorbitol', 'limited', dailymed(SET_GAVISCON_LIQ, METH.sorbitol)),
      flag('Benzyl alcohol', 'cleared', dailymed(SET_GAVISCON_LIQ, METH.benzyl)),
      flag('Edetate disodium', 'cleared', dailymed(SET_GAVISCON_LIQ, METH.edta)),
      flag('Xanthan gum', 'cleared', dailymed(SET_GAVISCON_LIQ, METH.gums)),
      cleared(SET_GAVISCON_LIQ, 'Glycerin'),
      cleared(SET_GAVISCON_LIQ, 'Water'),
    ],
    activeSafetyFlag: ALOH_FLAG,
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Gaviscon Regular Strength liquid = Avoid. AlOH Caution floor is overridden by D&C Yellow #10 + FD&C Blue #1 (High). Regular Strength panel on setid 2d74e5bc: benzyl alcohol, D&C yellow #10, edetate disodium, FD&C blue #1, flavor, glycerin, saccharin sodium, sodium alginate, sorbitol, water, xanthan gum. Extra Strength Cool Mint on the same SPL is the separate dye-free Caution formulaId. ' +
      ALOH_NOTE,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_GAVISCON_LIQ} Regular Strength panel (draft, not verified)`,
      'Methodology §4 / §5 aluminum-hydroxide Caution cap (locked v1.6)',
    ],
  },
  {
    id: 'gaviscon-es-tablets-cherry',
    productName: 'Gaviscon Extra Strength Cherry Tablets',
    brand: 'Gaviscon',
    category: DIGESTIVE,
    formulaId: 'gaviscon-es-tablets-cherry',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Aluminum hydroxide', strength: '160mg' },
      { name: 'Magnesium carbonate', strength: '105mg' },
    ],
    inactiveIngredients: [
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed(SET_GAVISCON_TABS, METH.acek),
      ),
      flag('Artificial flavor', 'limited', dailymed(SET_GAVISCON_TABS, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET_GAVISCON_TABS, METH.mannitol)),
      cleared(SET_GAVISCON_TABS, 'Alginic acid'),
      cleared(SET_GAVISCON_TABS, 'Calcium stearate'),
      cleared(SET_GAVISCON_TABS, 'Corn starch'),
      cleared(SET_GAVISCON_TABS, 'Sodium bicarbonate'),
      cleared(SET_GAVISCON_TABS, 'Stearic acid'),
      cleared(SET_GAVISCON_TABS, 'Sucrose'),
    ],
    activeSafetyFlag: ALOH_FLAG,
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Gaviscon ES Cherry tablets = Avoid (separate formulaId from plain ES tablets). Extra Strength Cherry panel: Ace-K (Moderate 2) + artificial flavor (1) + mannitol (1) = 4 pts Avoid; AlOH cap does not save a High/3+ additive stack. Plain ES tablets remain the Caution twin. ' +
      ALOH_NOTE,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_GAVISCON_TABS} Extra Strength Cherry panel (draft, not verified)`,
    ],
  },
  {
    id: 'pepcid-ac',
    productName: 'Pepcid AC Original Strength',
    brand: 'Pepcid',
    category: DIGESTIVE,
    barcode: '716837872306',
    formulaId: 'pepcid-ac',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Famotidine', strength: '10mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_PEPCID_AC, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_PEPCID_AC, METH.talc)),
      cleared(SET_PEPCID_AC, 'Carnauba wax'),
      cleared(SET_PEPCID_AC, 'Hypromellose'),
      cleared(SET_PEPCID_AC, 'Magnesium stearate'),
      cleared(SET_PEPCID_AC, 'Microcrystalline cellulose'),
      cleared(SET_PEPCID_AC, 'Pregelatinized starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Pepcid AC Original Strength = Avoid. Titanium dioxide and talc coatings are each High-tier. Red iron oxide is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake) — Avoid already stands on TiO2 / talc. Pepcid Complete is skipped. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PEPCID_AC} (draft, not verified)`],
  },
  {
    id: 'pepcid-max',
    productName: 'Pepcid AC Maximum Strength',
    brand: 'Pepcid',
    category: DIGESTIVE,
    barcode: '716837855255',
    formulaId: 'pepcid-max',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Famotidine', strength: '20mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_PEPCID_MAX, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_PEPCID_MAX, METH.talc)),
      cleared(SET_PEPCID_MAX, 'Carnauba wax'),
      cleared(SET_PEPCID_MAX, 'Hypromellose'),
      cleared(SET_PEPCID_MAX, 'Magnesium stearate'),
      cleared(SET_PEPCID_MAX, 'Microcrystalline cellulose'),
      cleared(SET_PEPCID_MAX, 'Pregelatinized starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Pepcid AC Maximum Strength = Avoid. Titanium dioxide + talc coating (High). Icy Cool Mint is a separate dyed / sucralose formulaId. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PEPCID_MAX} (draft, not verified)`],
  },
  {
    id: 'pepcid-icy-cool-mint',
    productName: 'Pepcid AC Maximum Strength Icy Cool Mint',
    brand: 'Pepcid',
    category: DIGESTIVE,
    barcode: '716837879404',
    formulaId: 'pepcid-icy-cool-mint',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Famotidine', strength: '20mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_PEPCID_ICY, METH.tio2)),
      flag('FD&C Blue No. 1 aluminum lake', 'high', dailymed(SET_PEPCID_ICY, METH.dyes)),
      flag('Talc', 'high', dailymed(SET_PEPCID_ICY, METH.talc)),
      flag('Sucralose', 'moderate', dailymed(SET_PEPCID_ICY, METH.sucralose)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_PEPCID_ICY, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_PEPCID_ICY, METH.ps80)),
      flag('Flavors', 'limited', dailymed(SET_PEPCID_ICY, METH.flavors)),
      cleared(SET_PEPCID_ICY, 'Carnauba wax'),
      cleared(SET_PEPCID_ICY, 'Hypromellose'),
      cleared(SET_PEPCID_ICY, 'Magnesium stearate'),
      cleared(SET_PEPCID_ICY, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Pepcid AC Icy Cool Mint = Avoid. Titanium dioxide, Blue #1 lake, and talc are each High-tier; sucralose / PEG / PS80 stack on top. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PEPCID_ICY} (draft, not verified)`],
  },
  {
    id: 'equate-famotidine',
    productName: 'Equate Famotidine 20 mg',
    brand: 'Equate',
    category: DIGESTIVE,
    barcode: '681131016827',
    formulaId: 'equate-famotidine',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Famotidine', strength: '20mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_EQUATE_FAM, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_EQUATE_FAM, METH.talc)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_EQUATE_FAM, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_EQUATE_FAM, METH.sio2),
      ),
      cleared(SET_EQUATE_FAM, 'Carnauba wax'),
      cleared(SET_EQUATE_FAM, 'Croscarmellose sodium'),
      cleared(SET_EQUATE_FAM, 'Lactose monohydrate'),
      cleared(SET_EQUATE_FAM, 'Magnesium stearate'),
      cleared(SET_EQUATE_FAM, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate Famotidine = Avoid (TiO2 ± talc coating). Representative 20 mg film-coat SPL 8ac94821. A mint / sucralose Equate 20 mg twin (setid f38f8a8f: Blue #1 lake + sucralose + TiO2) is the same Avoid family — confirm the bottle. 10 mg Equate (15973213) is also TiO2 + talc. Polyvinyl alcohol is on the SPL and is not in Methodology §5 (ungraded). Ages 12+.',
    retailers: ['Walmart'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_EQUATE_FAM} (draft, not verified)`],
  },
  {
    id: 'prilosec-otc',
    productName: 'Prilosec OTC',
    brand: 'Prilosec',
    category: DIGESTIVE,
    barcode: '030772202883',
    formulaId: 'prilosec-otc',
    audience: ADULT,
    minAge: 18,
    form: 'delayed-release tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Omeprazole magnesium', strength: '20.6mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_PRILOSEC, METH.tio2)),
      flag('Talc', 'high', dailymed(SET_PRILOSEC, METH.talc)),
      flag('Polyethylene glycol 400', 'moderate', dailymed(SET_PRILOSEC, METH.peg)),
      flag('Polyethylene glycol 3350', 'moderate', dailymed(SET_PRILOSEC, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_PRILOSEC, METH.sio2),
      ),
      cleared(SET_PRILOSEC, 'Croscarmellose sodium'),
      cleared(SET_PRILOSEC, 'Hypromellose'),
      cleared(SET_PRILOSEC, 'Magnesium stearate'),
      cleared(SET_PRILOSEC, 'Microcrystalline cellulose'),
      cleared(SET_PRILOSEC, 'Sucrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Prilosec OTC = Avoid. Titanium dioxide + talc + PEG coating. Wildberry twin (setid 35a79458) adds Blue #2 / Red #40 lakes + saccharin — still Avoid. Methacrylic acid copolymer / polyvinyl alcohol / acetyl tributyl citrate are delayed-release housekeeping and are not in Methodology §5 (ungraded; not the Avoid drivers). Nexium / Prevacid OTC are skipped. Labeled 18+ (children under 18: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PRILOSEC} (draft, not verified)`],
  },
  {
    id: 'imodium-ad-softgels',
    productName: 'Imodium A-D Softgels',
    brand: 'Imodium',
    category: DIGESTIVE,
    barcode: '300450137241',
    formulaId: 'imodium-ad-softgels',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loperamide HCl', strength: '2mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET_IMODIUM_SOFT, METH.dyes)),
      flag('Butylated hydroxyanisole', 'high', dailymed(SET_IMODIUM_SOFT, METH.bha)),
      flag(
        'Polyoxyl 40 hydrogenated castor oil',
        'cleared',
        dailymed(SET_IMODIUM_SOFT, METH.castor),
      ),
      cleared(SET_IMODIUM_SOFT, 'Gelatin'),
      cleared(SET_IMODIUM_SOFT, 'Glycerin'),
      cleared(SET_IMODIUM_SOFT, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Imodium A-D softgels = Avoid. FD&C Blue #1 is High-tier (setid 31bfcbb4). BHA on the same SPL is also High. Caplets are the separate PEG Caution formulaId. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_IMODIUM_SOFT} (draft, not verified)`],
  },
  {
    id: 'imodium-ad-liquid',
    productName: 'Imodium A-D Liquid',
    brand: 'Imodium',
    category: DIGESTIVE,
    barcode: '300450134080',
    formulaId: 'imodium-ad-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loperamide HCl', strength: '1mg / 7.5mL' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET_IMODIUM_LIQ, METH.dyes)),
      flag('D&C Yellow No. 10', 'high', dailymed(SET_IMODIUM_LIQ, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET_IMODIUM_LIQ, METH.tio2)),
      flag('Caramel color (class not stated)', 'high', dailymed(SET_IMODIUM_LIQ, METH.caramel)),
      flag('Sucralose', 'moderate', dailymed(SET_IMODIUM_LIQ, METH.sucralose)),
      flag('Propylene glycol', 'moderate', dailymed(SET_IMODIUM_LIQ, METH.pg)),
      flag('Flavor', 'limited', dailymed(SET_IMODIUM_LIQ, METH.flavors)),
      flag('Sodium benzoate', 'limited', dailymed(SET_IMODIUM_LIQ, METH.benzoate)),
      flag('Xanthan gum', 'cleared', dailymed(SET_IMODIUM_LIQ, METH.gums)),
      cleared(SET_IMODIUM_LIQ, 'Glycerin'),
      cleared(SET_IMODIUM_LIQ, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Imodium A-D liquid = Avoid (dyes + sucralose + TiO2). Undisclosed-class caramel color is also High (v1.6 class-split). Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_IMODIUM_LIQ} (draft, not verified)`],
  },
  {
    id: 'imodium-multi-symptom',
    productName: 'Imodium Multi-Symptom Relief',
    brand: 'Imodium',
    category: DIGESTIVE,
    formulaId: 'imodium-multi-symptom',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Loperamide HCl', strength: '2mg' },
      { name: 'Simethicone', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed(SET_IMODIUM_MULTI, METH.acek),
      ),
      flag('Flavor', 'limited', dailymed(SET_IMODIUM_MULTI, METH.flavors)),
      cleared(SET_IMODIUM_MULTI, 'Croscarmellose sodium'),
      cleared(SET_IMODIUM_MULTI, 'Dibasic calcium phosphate'),
      cleared(SET_IMODIUM_MULTI, 'Microcrystalline cellulose'),
      cleared(SET_IMODIUM_MULTI, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Imodium Multi-Symptom Relief = Avoid. Ace-K (Moderate 2) + flavor (Limited 1) = 3 pts Avoid. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_IMODIUM_MULTI} (draft, not verified)`],
  },
  {
    id: 'pepto-bismol-caplets',
    productName: 'Pepto-Bismol Caplets',
    brand: 'Pepto-Bismol',
    category: DIGESTIVE,
    formulaId: 'pepto-bismol-caplets',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Bismuth subsalicylate', strength: '262mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(SET_PEPTO_CAP, METH.dyes),
      ),
      flag('Polysorbate 80', 'moderate', dailymed(SET_PEPTO_CAP, METH.ps80)),
      flag('Mannitol', 'limited', dailymed(SET_PEPTO_CAP, METH.mannitol)),
      flag('Silicon dioxide', 'cleared', dailymed(SET_PEPTO_CAP, METH.sio2)),
      cleared(SET_PEPTO_CAP, 'Calcium carbonate'),
      cleared(SET_PEPTO_CAP, 'Magnesium stearate'),
      cleared(SET_PEPTO_CAP, 'Microcrystalline cellulose'),
      cleared(SET_PEPTO_CAP, 'Povidone'),
      cleared(SET_PEPTO_CAP, 'Sodium starch glycolate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Pepto-Bismol caplets = Avoid (pink dye lake High). Ultra caplets (setid 63283ebc) use the same Red #27 lake family. Contains salicylate — Reye warning is standard-of-care, not a cleanliness flag. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PEPTO_CAP} (draft, not verified)`],
  },
  {
    id: 'pepto-bismol-chewables',
    productName: 'Pepto-Bismol Chewable Tablets',
    brand: 'Pepto-Bismol',
    category: DIGESTIVE,
    formulaId: 'pepto-bismol-chewables',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Bismuth subsalicylate', strength: '262mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(SET_PEPTO_CHEW, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET_PEPTO_CHEW, METH.talc)),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed(SET_PEPTO_CHEW, METH.saccharin),
      ),
      flag('Flavor', 'limited', dailymed(SET_PEPTO_CHEW, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET_PEPTO_CHEW, METH.mannitol)),
      cleared(SET_PEPTO_CHEW, 'Calcium carbonate'),
      cleared(SET_PEPTO_CHEW, 'Magnesium stearate'),
      cleared(SET_PEPTO_CHEW, 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Pepto-Bismol chewables = Avoid. Red #27 lake and talc are each High-tier. Contains salicylate — Reye warning is standard-of-care, not a cleanliness flag. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PEPTO_CHEW} (draft, not verified)`],
  },
  {
    id: 'pepto-bismol-liquid',
    productName: 'Pepto-Bismol Liquid',
    brand: 'Pepto-Bismol',
    category: DIGESTIVE,
    formulaId: 'pepto-bismol-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Bismuth subsalicylate', strength: '525mg / 30mL' }],
    inactiveIngredients: [
      flag('D&C Red No. 22', 'high', dailymed(SET_PEPTO_LIQ, METH.dyes)),
      flag('D&C Red No. 28', 'high', dailymed(SET_PEPTO_LIQ, METH.dyes)),
      flag('Sucralose', 'moderate', dailymed(SET_PEPTO_LIQ, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET_PEPTO_LIQ, METH.flavors)),
      flag('Benzoic acid', 'limited', dailymed(SET_PEPTO_LIQ, METH.benzoate)),
      cleared(SET_PEPTO_LIQ, 'Methylcellulose'),
      cleared(SET_PEPTO_LIQ, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Pepto-Bismol liquid = Avoid (pink dye lakes High). Cherry / Ultra liquids (setids 67382f40 / 673893bd) keep D&C Red #22 / #28 — same Avoid family. Gellan gum / magnesium aluminum silicate are not in Methodology §5 (ungraded). Contains salicylate — Reye warning is standard-of-care. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PEPTO_LIQ} (draft, not verified)`],
  },
  {
    id: 'upup-digestive-relief',
    productName: 'up&up 5-Symptom Digestive Relief Chewable Tablets',
    brand: 'up&up',
    category: DIGESTIVE,
    formulaId: 'upup-digestive-relief',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Bismuth subsalicylate', strength: '262mg' }],
    inactiveIngredients: [
      flag('D&C Red No. 27 aluminum lake', 'high', dailymed(SET_UPUP, METH.dyes)),
      flag('Sucralose', 'moderate', dailymed(SET_UPUP, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET_UPUP, METH.flavors)),
      flag('Sorbitol', 'limited', dailymed(SET_UPUP, METH.sorbitol)),
      cleared(SET_UPUP, 'Magnesium stearate'),
      cleared(SET_UPUP, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Store bismuth (up&up 5-Symptom Digestive Relief chewables) = Avoid (red lake + sucralose). Setid 7f6b2960. A swallow-tablet twin (6462e224) is Red #27 lake + SLS (SLS is standalone Caution, not the driver) — still Avoid; confirm the bottle. Contains salicylate. Ages 12+.',
    retailers: ['Target'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_UPUP} (draft, not verified)`],
  },
  {
    id: 'gasx-max-softgels',
    productName: 'Gas-X Maximum Strength Softgels',
    brand: 'Gas-X',
    category: DIGESTIVE,
    formulaId: 'gasx-max-softgels',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '250mg' }],
    inactiveIngredients: [
      flag('D&C Red No. 33', 'high', dailymed(SET_GASX_MAX, METH.dyes)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET_GASX_MAX, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET_GASX_MAX, METH.tio2)),
      flag('Soy lecithin', 'cleared', dailymed(SET_GASX_MAX, METH.lecithin)),
      cleared(SET_GASX_MAX, 'Gelatin'),
      cleared(SET_GASX_MAX, 'Glycerin'),
      cleared(SET_GASX_MAX, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Gas-X Maximum Strength softgels = Avoid (TiO2 + dyes). Extra Strength 125 mg softgels (setid fa4a3b07) also use dyes + TiO2 — same Avoid family. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_GASX_MAX} (draft, not verified)`],
  },
  {
    id: 'gasx-ultimate-softgels',
    productName: 'Gas-X Ultimate Strength Softgels',
    brand: 'Gas-X',
    category: DIGESTIVE,
    formulaId: 'gasx-ultimate-softgels',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '500mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(SET_GASX_ULT, METH.dyes),
      ),
      flag('Soy lecithin', 'cleared', dailymed(SET_GASX_ULT, METH.lecithin)),
      cleared(SET_GASX_ULT, 'Gelatin'),
      cleared(SET_GASX_ULT, 'Glycerin'),
      cleared(SET_GASX_ULT, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Gas-X Ultimate Strength softgels = Avoid (Red #27 lake High). Medium-chain triglycerides appear on the SPL and are not in Methodology §5 (ungraded; not a gummy seed-oil High). Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_GASX_ULT} (draft, not verified)`],
  },
  {
    id: 'gasx-es-chewables',
    productName: 'Gas-X Extra Strength Chewable Tablets',
    brand: 'Gas-X',
    category: DIGESTIVE,
    formulaId: 'gasx-es-chewables',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '125mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 30 aluminum lake',
        'high',
        dailymed(SET_GASX_CHEW, METH.dyes),
      ),
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET_GASX_CHEW, METH.dyes),
      ),
      flag('Flavors', 'limited', dailymed(SET_GASX_CHEW, METH.flavors)),
      flag('Maltodextrin', 'limited', dailymed(SET_GASX_CHEW, METH.maltodextrin)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_GASX_CHEW, METH.sio2),
      ),
      cleared(SET_GASX_CHEW, 'Dextrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Gas-X Extra Strength chewables = Avoid (dye lakes High). Cherry/flavor twin SPL 7ce312ca is Red #30 lake + flavor + maltodextrin — same Avoid family. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_GASX_CHEW} (draft, not verified)`],
  },
  {
    id: 'phazyme-fast-gels',
    productName: 'Phazyme Fast Gels 250 mg',
    brand: 'Phazyme',
    category: DIGESTIVE,
    formulaId: 'phazyme-fast-gels',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '250mg' }],
    inactiveIngredients: [
      flag('D&C Red No. 33', 'high', dailymed(SET_PHAZYME, METH.dyes)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET_PHAZYME, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET_PHAZYME, METH.tio2)),
      cleared(SET_PHAZYME, 'Gelatin'),
      cleared(SET_PHAZYME, 'Glycerin'),
      cleared(SET_PHAZYME, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Phazyme Fast Gels = Avoid (dyes + TiO2). Representative 250 mg Fast Gel / Maximum Strength SPLs 470d2ea9 / ef3cb514. Ultra Strength 180 mg (Yellow #6) and Ultimate 500 mg (Blue #1) stay Avoid on dyes. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_PHAZYME} (draft, not verified)`],
  },
  {
    id: 'dramamine-less-drowsy',
    productName: 'Dramamine Less Drowsy',
    brand: 'Dramamine',
    category: DIGESTIVE,
    formulaId: 'dramamine-less-drowsy',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Meclizine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET_DRAM_LD, METH.dyes),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_DRAM_LD, METH.sio2),
      ),
      cleared(SET_DRAM_LD, 'Anhydrous lactose'),
      cleared(SET_DRAM_LD, 'Corn starch'),
      cleared(SET_DRAM_LD, 'Magnesium stearate'),
      cleared(SET_DRAM_LD, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Dramamine Less Drowsy = Avoid (Yellow #10 lake High). Kids Dramamine is skipped. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: MOTION_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_DRAM_LD} (draft, not verified)`],
  },
  {
    id: 'dramamine-chewable-orange',
    productName: 'Dramamine Chewable Orange',
    brand: 'Dramamine',
    category: DIGESTIVE,
    formulaId: 'dramamine-chewable-orange',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Meclizine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag('FD&C Yellow No. 6 aluminum lake', 'high', dailymed(SET_DRAM_OR, METH.dyes)),
      flag('Butylated hydroxytoluene', 'high', dailymed(SET_DRAM_OR, METH.bht)),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed(SET_DRAM_OR, METH.saccharin),
      ),
      flag(
        'Natural orange flavor / natural pink lemonade flavor',
        'limited',
        dailymed(SET_DRAM_OR, METH.flavors),
      ),
      flag('Maltodextrin', 'limited', dailymed(SET_DRAM_OR, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', dailymed(SET_DRAM_OR, METH.sio2)),
      cleared(SET_DRAM_OR, 'Croscarmellose sodium'),
      cleared(SET_DRAM_OR, 'Crospovidone'),
      cleared(SET_DRAM_OR, 'Lactose monohydrate'),
      cleared(SET_DRAM_OR, 'Magnesium stearate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Dramamine Chewable Orange = Avoid. Yellow #6 lake and BHT are each High-tier (locked). Kids Dramamine is skipped. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: MOTION_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_DRAM_OR} (draft, not verified)`],
  },
  {
    id: 'bonine',
    productName: 'Bonine',
    brand: 'Bonine',
    category: DIGESTIVE,
    barcode: '365197275120',
    formulaId: 'bonine',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Meclizine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag('FD&C Red No. 40 aluminum lake', 'high', dailymed(SET_BONINE, METH.dyes)),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed(SET_BONINE, METH.saccharin),
      ),
      flag('Flavor', 'limited', dailymed(SET_BONINE, METH.flavors)),
      flag('Propylene glycol', 'moderate', dailymed(SET_BONINE, METH.pg)),
      flag('Silicon dioxide', 'cleared', dailymed(SET_BONINE, METH.sio2)),
      cleared(SET_BONINE, 'Lactose monohydrate'),
      cleared(SET_BONINE, 'Magnesium stearate'),
      cleared(SET_BONINE, 'Pregelatinized starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Bonine = Avoid (Red #40 lake High). Bonine Kids is skipped. Ages 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: MOTION_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_BONINE} (draft, not verified)`],
  },
  {
    id: 'emetrol-liquid-cherry',
    productName: 'Emetrol Cherry Liquid',
    brand: 'Emetrol',
    category: DIGESTIVE,
    formulaId: 'emetrol-liquid-cherry',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextrose', strength: '1.87g / 5mL' },
      { name: 'Fructose', strength: '1.87g / 5mL' },
      { name: 'Phosphoric acid', strength: '21.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag('FD&C Red No. 40', 'high', dailymed(SET_EMETROL_LIQ, METH.dyes)),
      flag('Methylparaben', 'high', dailymed(SET_EMETROL_LIQ, METH.parabens)),
      flag('Flavors', 'limited', dailymed(SET_EMETROL_LIQ, METH.flavors)),
      cleared(SET_EMETROL_LIQ, 'Glycerin'),
      cleared(SET_EMETROL_LIQ, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Emetrol Cherry liquid = Avoid (Red #40 + methylparaben). Chewables are the separate Caution formulaId. Ages 12+ adult row.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NAUSEA_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_EMETROL_LIQ} (draft, not verified)`],
  },
  {
    id: 'nauzene-chewables',
    productName: 'Nauzene Chewables',
    brand: 'Nauzene',
    category: DIGESTIVE,
    barcode: '072959010775',
    formulaId: 'nauzene-chewables',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Sodium citrate', strength: '230mg' }],
    inactiveIngredients: [
      flag('Aspartame', 'high', dailymed(SET_NAUZENE, METH.aspartame)),
      flag('FD&C Red No. 40 aluminum lake', 'high', dailymed(SET_NAUZENE, METH.dyes)),
      flag('Flavors', 'limited', dailymed(SET_NAUZENE, METH.flavors)),
      flag('Maltodextrin', 'limited', dailymed(SET_NAUZENE, METH.maltodextrin)),
      flag('Silicon dioxide', 'cleared', dailymed(SET_NAUZENE, METH.sio2)),
      cleared(SET_NAUZENE, 'Dextrose'),
      cleared(SET_NAUZENE, 'Fructose'),
      cleared(SET_NAUZENE, 'Magnesium stearate'),
      cleared(SET_NAUZENE, 'Povidone'),
      cleared(SET_NAUZENE, 'Sucrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Nauzene Chewables = Avoid (dye + aspartame). Setid a60660b2. Ginger Honey twin (setid 25c9825d) is D&C Yellow #10 lake + sucralose + flavors — same Avoid family, different formula; notes cover the twin. Phenylketonurics: aspartame. Ages 12+ adult row.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NAUSEA_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_NAUZENE} (draft, not verified)`,
      'DailyMed setid 25c9825d-a4e8-4671-e063-6294a90ab46d Ginger Honey twin (draft, not verified)',
    ],
  },
  {
    id: 'culturelle-digestive-daily',
    productName: 'Culturelle Digestive Daily Probiotic Capsules',
    brand: 'Culturelle',
    category: DIGESTIVE,
    formulaId: 'culturelle-digestive-daily',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Lactobacillus rhamnosus GG', strength: '10 billion CFU' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide (color)',
        'high',
        labelCite(CULTURELLE_CITE, METH.tio2),
      ),
      flag(
        'Maltodextrin',
        'limited',
        labelCite(CULTURELLE_CITE, METH.maltodextrin),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(CULTURELLE_CITE, METH.sio2),
      ),
      flag(
        'Hydroxypropyl methylcellulose',
        'cleared',
        labelCite(CULTURELLE_CITE, METH.cleared),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(CULTURELLE_CITE, METH.cleared),
      ),
      flag(
        'Sucrose',
        'cleared',
        labelCite(CULTURELLE_CITE, METH.cleared),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Culturelle Digestive Daily = Avoid (TiO2 on supplement labels). Cited carton: Culturelle Canada brand page and US retailer labels (Stop & Shop) list titanium dioxide (color) with inulin, HPMC, sucrose, maltodextrin, sodium ascorbate, magnesium stearate, and silicon dioxide. Current culturelle.com US page describes a purple-carrot-concentrate capsule and does not list TiO2 — that is a different formula, not this row; do not invent Clean for the purple-carrot carton. Inulin is not in Methodology §5 (ungraded). Ages 12+ (brand directions).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [
      'Culturelle Canada brand page (titanium dioxide color) — draft, not verified',
      'Stop & Shop Culturelle Digestive Health Daily Probiotic retailer label (TiO2) — draft, not verified',
      'culturelle.com Digestive Daily product page (purple-carrot carton is a different formula)',
    ],
  },
  {
    id: 'align-daily-probiotic',
    productName: 'Align Daily Probiotic',
    brand: 'Align',
    category: DIGESTIVE,
    formulaId: 'align-daily-probiotic',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Bifidobacterium 35624 (B. longum subsp. longum)', strength: '1 billion CFU at manufacture' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide (color)',
        'high',
        labelCite(ALIGN_CITE, METH.tio2),
      ),
      flag(
        'Propyl gallate',
        'high',
        labelCite(ALIGN_CITE, METH.propylGallate),
      ),
      flag(
        'Gellan gum',
        'cleared',
        labelCite(ALIGN_CITE, METH.gums),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(ALIGN_CITE, METH.cleared),
      ),
      flag(
        'Hypromellose',
        'cleared',
        labelCite(ALIGN_CITE, METH.cleared),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(ALIGN_CITE, METH.cleared),
      ),
      flag(
        'Sucrose',
        'cleared',
        labelCite(ALIGN_CITE, METH.cleared),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Align Daily Probiotic = Avoid (TiO2 on supplement labels). Costco / grocery other-ingredients lists include microcrystalline cellulose, hypromellose, sucrose, magnesium stearate, sodium caseinate, titanium dioxide (color), trisodium citrate, propyl gallate, and gellan gum. Food Lion / Stop & Shop short lists still name titanium dioxide (color). Propyl gallate is also High when present. Contains milk (sodium caseinate). Brand site does not publish a full other-ingredients panel — retailer labels are the cite. Optional probiotic gummy with seed oil was skipped (no concrete SKU). Typical adult capsule; 18+ aisle.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIGESTIVE_PEER_ALTS,
    sourcesGeneral: [
      'Align Daily Probiotic retailer other-ingredients (Costco / Stop & Shop / Food Lion) — draft, not verified',
    ],
  },
];
