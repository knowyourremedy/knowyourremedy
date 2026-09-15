// DRAFT / not verified / batch 44 list-2 gradeable rubs / sprays /
// liniment / methodology v1.6 + Sept 15 IPA Limited + fragrance /
// polyoxyl 20 / ammonia / isobutane / AMP / AMPS-VP / DMI / EO /
// unlabeled MCT / mineral-oil locks on main.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent Clean. Do NOT invent UPCs /
// barcodes. Pack sizes of the same name+form+inactives share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6). Not
// wired into Clean Picks UI. No live Clean Picks file is edited. No
// photos. Letter tiles only on new ids. No fake Clean alts. No
// methodology rewrite.
//
// TALLY (unverified drafts in THIS file): 13 rows — Clean 0 /
// Caution 13 / Avoid 0.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — list 1 already on main:
// Batch 41: tylenol-precise-pain-relieving-cream,
//   tylenol-precise-cooling-cream, tylenol-precise-warming-cream,
//   tylenol-precise-nighttime-cream, tylenol-precise-lidocaine-4-patch,
//   alevex-pain-relieving-lotion-roll-on,
//   alevex-pain-relieving-lotion-tube, alevex-pain-relieving-spray
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel — already Search rows. Do not rewrite.
// Batch 37 / 33 / 38 reuse from batch 41 still stands.
//
// LIST 2 written (13 formula rows) under current §5 locks:
// - Isopropyl alcohol = Limited (alcohol-vehicle family).
// - Alcohol / alcohol denat. / SD alcohol 40-B = Limited (vehicle).
// - Unlabeled MCT / caprylic/capric triglyceride (no coconut named)
//   = Limited (opacity). Not Avoid.
// - Fragrance / parfum = Caution (standalone).
// - Polyoxyl 20 cetostearyl ether = Caution (PEG-ether).
// - Strong ammonia solution = Caution.
// - Isobutane = Caution (pain-spray propellant).
// - Aminomethyl propanol = Caution.
// - Ammonium acryloyldimethyltaurate/VP copolymer = Caution (AMPS /
//   vinylpyrrolidone family).
// - Dimethyl isosorbide = Caution.
// - Eucalyptus oil / spike lavender oil = Caution (fragrance/EO).
// - Light mineral oil / mineral oil topical = Cleared (petrolatum
//   neighborhood). Tap: not an oral oil.
// - Carbomer / cocoyl caprylocaprate / glycerin / water / HPMC /
//   citric acid stay Cleared.
// - Propylene glycol is oral-scoped Moderate. On these topicals it
//   is not that Moderate row.
// Menthol / camphor / lidocaine / methyl salicylate actives stay parked.
//
// formulaId notes (list 2):
// - Voltaren keeps its own brand-labeled id. Do NOT clone
//   aleve-arthritis-pain-gel. Same math twin (IPA Limited + fragrance /
//   polyoxyl 20 / ammonia Caution).
// - Aspercreme Arthritis no-fragrance ≠ fragrance. Separate formulaIds.
//   No-fragrance = Motrin twin math. Fragrance = Aleve twin math.
// - Icy Hot Performance Dry Spray + Icy Hot Pro Dry Spray share
//   formulaId — OI + actives match (menthol 16% + camphor 11%).
// - Icy Hot Dry Spray Original = same OI as Performance/Pro but
//   menthol-only actives → separate formulaId.
// - Icy Hot Lidocaine Dry Spray ≠ Aspercreme Lidocaine Dry Spray
//   formulaId — OI matches, actives do not (menthol 1% vs lidocaine-only).
//
// REFUSED (still missing from §5 — do not invent): none from list 2.
// All 13 DailyMed OI lines grade under current locks.
//
// LIST 3 + LIST 4 — no Search rows (PR-comment only):
// All remaining question-mark SKUs (38). Do not invent steareth /
// ethylhexylglycerin / patch-resin / TEA / nonoxynol / etc. grades.
// Wound-only, cosmetics, Canada/EU, kits (including Voltaren kits
// NDC 0067-8153 / 0067-8154), discontinued/off-catalog, private-label,
// Lead duplicates — OUT.

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

const PF_RETAILERS = [
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
  'Safeway',
] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / methyl salicylate actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const MINERAL_OIL_TAP =
  'Mineral oil as a topical occlusive is Cleared (petrolatum neighborhood). Not an oral oil.';

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglyceride / medium-chain triglycerides and does not name coconut. We mark that Limited because the source isn’t clear. MCT labeled from coconut is Cleared on oral capsule/softgel/liquid supplements (not a cooking-oil bottle). This spray fill is not the gummy seed-oil High rule.';

const IPA_TAP =
  'Isopropyl alcohol is the locked Limited alcohol-vehicle family. Not Avoid. Distinct from drinking alcohol as an active. Not the gummy seed-oil High rule.';

const METH = {
  ipa: `Methodology §5 Limited-risk (isopropyl alcohol — alcohol vehicle family; locked Sept 15, 2026). ${IPA_TAP}`,
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / alcohol denat. / SD alcohol as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid)',
  polyoxyl20:
    'Methodology §5 Caution (polyoxyl 20 cetostearyl ether — PEG-ether family; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ammonia:
    'Methodology §5 Caution (strong ammonia solution — standalone Caution, not Avoid; locked Sept 15, 2026)',
  propellant:
    'Methodology §5 Caution (isobutane / isopentane / propane pain-spray propellants — standalone Caution, not Avoid; locked Sept 15, 2026)',
  amp:
    'Methodology §5 Caution (aminomethyl propanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ampsVp:
    'Methodology §5 Caution (ammonium acryloyldimethyltaurate/VP copolymer — AMPS / vinylpyrrolidone family; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmi:
    'Methodology §5 Caution (dimethyl isosorbide — standalone Caution, not Avoid; locked Sept 15, 2026)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as a gel / liniment inactive — fragrance/EO line; standalone Caution, not Avoid)',
  lavender:
    'Methodology §5 Caution (lavender oil / spike lavender oil, topical — fragrance-style; standalone Caution, not Avoid; locked Sept 15, 2026)',
  mineralOil: `Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP}`,
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  cocoyl:
    'Methodology §5 Cleared (cocoyl caprylocaprate — topical emollient ester; locked Sept 15, 2026)',
  pgTopical: `Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this topical. ${PG_TOPICAL_TAP}`,
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose)',
  citric: 'Methodology §5 Cleared (citric acid as filler/buffer)',
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

const ARNICARE_GEL = 'boiron-arnicare-gel';

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / lotion / spray / liniment — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine / menthol cream invented.',
  ),
];

const SET = {
  voltaren: '30a94282-0892-442a-aa10-6525cbd4fe88',
  asperNf: '81f78685-c416-48b5-8840-eef03a66bc28',
  asperFr: '762b7ef4-166c-43b8-9acd-2b9e7fa0bf36',
  salonpasDiclo: 'f439445d-046e-4220-a4a7-13d750ee0949',
  salonpasJet: 'dd1ea3bf-891a-402e-8f43-14302bc9c3e5',
  icyPerf: '8927570f-761b-4d83-8612-30077224fdb8',
  icyOrig: '720a85cc-8e98-43f2-9cc8-5636ae09624f',
  icyPro: '4de1bc29-d166-4599-9e75-5f841bf20967',
  icyLidoSpray: 'd500a74e-ab93-4919-8665-a89e9d4cad28',
  asperLidoSpray: '008abaaa-5e12-4246-a7f5-66f3966acf28',
  icyNoMess: 'a2803c07-bf39-4028-9262-5082da25b46e',
  salonpasDeep: 'a4ddb2b9-d023-4c8c-9285-93d51f93207d',
  tigerLiniment: '51293a06-5922-4072-ae14-afaba9c1b58e',
} as const;

const ID = {
  voltaren: 'voltaren-arthritis-pain-gel',
  asperNf: 'aspercreme-arthritis-pain-gel',
  asperFr: 'aspercreme-arthritis-pain-gel-fragrance',
  salonpasDiclo: 'salonpas-diclofenac-arthritis-pain-gel',
  salonpasJet: 'salonpas-pain-relieving-jet-spray',
  icyPerf: 'icy-hot-performance-dry-spray',
  icyOrig: 'icy-hot-dry-spray-original',
  icyPro: 'icy-hot-pro-dry-spray',
  icyLidoSpray: 'icy-hot-lidocaine-dry-spray',
  asperLidoSpray: 'aspercreme-lidocaine-dry-spray',
  icyNoMess: 'icy-hot-lidocaine-no-mess-liquid',
  salonpasDeep: 'salonpas-deep-relieving-gel',
  tigerLiniment: 'tiger-balm-liniment',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function diclofenacGelInactives(
  setid: string,
  fragrant: boolean,
): IngredientFlag[] {
  const rows: IngredientFlag[] = [
    flag('Isopropyl alcohol', 'limited', dailymed(setid, METH.ipa)),
  ];
  if (fragrant) {
    rows.push(flag('Fragrance', 'cleared', dailymed(setid, METH.fragrance)));
  }
  rows.push(
    flag(
      'Polyoxyl 20 cetostearyl ether',
      'cleared',
      dailymed(setid, METH.polyoxyl20),
    ),
    flag('Strong ammonia solution', 'cleared', dailymed(setid, METH.ammonia)),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
    flag('Mineral oil', 'cleared', dailymed(setid, METH.mineralOil)),
    flag('Carbomer homopolymer Type C', 'cleared', dailymed(setid, METH.carbomer)),
    flag('Cocoyl caprylocaprate', 'cleared', dailymed(setid, METH.cocoyl)),
    cleared(setid, 'Purified water'),
  );
  return rows;
}

function icyMentholCamphorDrySprayInactives(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol denat.', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Isobutane', 'cleared', dailymed(setid, METH.propellant)),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
    cleared(setid, 'Glycerin'),
    cleared(setid, 'Purified water'),
  ];
}

function lidoDrySprayInactives(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol denat.', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag(
      'Caprylic/capric triglyceride (unlabeled MCT)',
      'limited',
      dailymed(setid, METH.mctUnlabeled),
    ),
    flag('Isobutane', 'cleared', dailymed(setid, METH.propellant)),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
  ];
}

export const BATCH44_LIST2_REFUSED = [] as const;

export const BATCH44_PAIN_RUBS_LIST2: RatingRecord[] = [
  row({
    id: ID.voltaren,
    productName: 'Voltaren Arthritis Pain Gel',
    brand: 'Voltaren',
    category: PAIN_FEVER,
    formulaId: ID.voltaren,
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    activeIngredients: [{ name: 'Diclofenac sodium', strength: '1%' }],
    inactiveIngredients: diclofenacGelInactives(SET.voltaren, true),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Voltaren Arthritis Pain Gel (Haleon) = Caution. Own brand-labeled formulaId — do not clone aleve-arthritis-pain-gel. Same math twin as the Aleve arthritis gel (isopropyl alcohol Limited + fragrance / polyoxyl 20 cetostearyl ether / strong ammonia Caution). ${PG_TOPICAL_TAP} ${MINERAL_OIL_TAP} Carbomer + cocoyl caprylocaprate Cleared. Pack sizes of this gel share this formulaId. Voltaren kits (NDC 0067-8153 / 0067-8154) are list-4 OUT — no Search row. Ages 18+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'voltarengel.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.voltaren} (Haleon) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperNf,
    productName: 'Aspercreme Arthritis Pain Gel (no fragrance)',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    formulaId: ID.asperNf,
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    activeIngredients: [{ name: 'Diclofenac sodium', strength: '1%' }],
    inactiveIngredients: diclofenacGelInactives(SET.asperNf, false),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Arthritis Pain Gel (no fragrance) = Caution. Motrin twin math — IPA Limited + polyoxyl 20 / ammonia Caution; no fragrance on setid ${SET.asperNf}. Separate formulaId from the fragrant Aspercreme arthritis gel. Do not clone motrin-arthritis-pain-gel. ${PG_TOPICAL_TAP} Pack sizes share this formulaId. Ages 18+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperNf} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperFr,
    productName: 'Aspercreme Arthritis Pain Gel (fragrance)',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    formulaId: ID.asperFr,
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    activeIngredients: [{ name: 'Diclofenac sodium', strength: '1%' }],
    inactiveIngredients: diclofenacGelInactives(SET.asperFr, true),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Arthritis Pain Gel (fragrance) = Caution. Aleve twin math — IPA Limited + fragrance / polyoxyl 20 / ammonia Caution. Separate formulaId from the no-fragrance Aspercreme arthritis gel (setid ${SET.asperNf}). Do not clone aleve-arthritis-pain-gel. ${PG_TOPICAL_TAP} Pack sizes share this formulaId. Ages 18+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperFr} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonpasDiclo,
    productName: 'Salonpas Arthritis Pain Relief Gel (diclofenac)',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: ID.salonpasDiclo,
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    activeIngredients: [{ name: 'Diclofenac sodium', strength: '1%' }],
    inactiveIngredients: diclofenacGelInactives(SET.salonpasDiclo, true),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Arthritis Pain Relief Gel (diclofenac) = Caution. Aleve twin math — IPA Limited + fragrance / polyoxyl 20 / ammonia Caution (Drug Facts lists fragrance; DailyMed also names coco-caprylate/caprate = cocoyl caprylocaprate Cleared). Own formulaId — not merged into Voltaren or Aspercreme fragrance. ${PG_TOPICAL_TAP} Pack sizes share this formulaId. Ages 18+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonpasDiclo} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonpasJet,
    productName: 'Salonpas Pain Relieving Jet Spray',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: ID.salonpasJet,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '3%' },
      { name: 'Methyl salicylate', strength: '10%' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.salonpasJet, METH.alcoholVehicle)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Pain Relieving Jet Spray = Caution. Alcohol-vehicle Limited-only — no High, no standalone Caution-table inactive on this SPL. ${LIMITED_STACK} Distinct from the diclofenac gel and Deep Relieving Gel. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonpasJet} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyPerf,
    productName: 'Icy Hot Performance Dry Spray',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyPerf,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '16%' },
      { name: 'Camphor (synthetic)', strength: '11%' },
    ],
    inactiveIngredients: icyMentholCamphorDrySprayInactives(SET.icyPerf),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Performance Dry Spray = Caution. Alcohol denat. Limited + isobutane standalone Caution. ${PG_TOPICAL_TAP} DailyMed OI + actives (menthol 16% / camphor 11%) match Icy Hot Pro Dry Spray (setid ${SET.icyPro}) — shared formulaId ${ID.icyPerf}, two Search rows (Performance vs Pro). Distinct from Original (menthol-only actives). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyPerf}; Pro twin ${SET.icyPro} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyOrig,
    productName: 'Icy Hot Dry Spray Original',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyOrig,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [{ name: 'Menthol', strength: '16%' }],
    inactiveIngredients: icyMentholCamphorDrySprayInactives(SET.icyOrig),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Dry Spray Original = Caution. Same OI as Performance / Pro (alcohol denat. Limited + isobutane Caution) but menthol-only actives — separate formulaId. Do not merge into ${ID.icyPerf}. ${PG_TOPICAL_TAP} Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyOrig} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyPro,
    productName: 'Icy Hot Pro Dry Spray',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyPerf,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '16%' },
      { name: 'Camphor (synthetic)', strength: '11%' },
    ],
    inactiveIngredients: icyMentholCamphorDrySprayInactives(SET.icyPro),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Pro Dry Spray = Caution. OI + actives match Icy Hot Performance Dry Spray (setid ${SET.icyPerf}) — one formulaId, two Search rows (Pro vs Performance). Not merged into Original (menthol-only). ${PG_TOPICAL_TAP} Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyPro}; Performance twin ${SET.icyPerf} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyLidoSpray,
    productName: 'Icy Hot Lidocaine Dry Spray',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyLidoSpray,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Lidocaine', strength: '4%' },
      { name: 'Menthol', strength: '1%' },
    ],
    inactiveIngredients: lidoDrySprayInactives(SET.icyLidoSpray),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Lidocaine Dry Spray = Caution. Alcohol denat. Limited + unlabeled MCT (caprylic/capric triglyceride, coconut not named) Limited + isobutane standalone Caution. ${MCT_UNLABELED_TAP} ${PG_TOPICAL_TAP} Same OI as Aspercreme Lidocaine Dry Spray, but actives differ (this SPL is lidocaine 4% + menthol 1%) — separate formulaId. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyLidoSpray} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperLidoSpray,
    productName: 'Aspercreme Lidocaine Dry Spray',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    formulaId: ID.asperLidoSpray,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: lidoDrySprayInactives(SET.asperLidoSpray),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine Dry Spray = Caution. Same OI as Icy Hot Lidocaine Dry Spray (alcohol + unlabeled MCT Limited + isobutane Caution) but lidocaine-only actives (no menthol) — OI+actives do not match, so separate formulaId. ${MCT_UNLABELED_TAP} ${PG_TOPICAL_TAP} Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperLidoSpray} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyNoMess,
    productName: 'Icy Hot with Lidocaine No-Mess (liquid)',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyNoMess,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    activeIngredients: [
      { name: 'Lidocaine', strength: '4%' },
      { name: 'Menthol', strength: '1%' },
    ],
    inactiveIngredients: [
      flag('Alcohol denat.', 'limited', dailymed(SET.icyNoMess, METH.alcoholVehicle)),
      flag('Aminomethylpropanol', 'cleared', dailymed(SET.icyNoMess, METH.amp)),
      flag('Citric acid', 'cleared', dailymed(SET.icyNoMess, METH.citric)),
      flag(
        'Hydroxypropyl methylcellulose',
        'cleared',
        dailymed(SET.icyNoMess, METH.hpmc),
      ),
      cleared(SET.icyNoMess, 'Glycerin'),
      cleared(SET.icyNoMess, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot with Lidocaine No-Mess liquid = Caution. Alcohol denat. Limited + aminomethylpropanol standalone Caution. Citric acid / HPMC / glycerin / water Cleared. Distinct from the lidocaine dry sprays (no MCT / no isobutane on this SPL). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyNoMess} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonpasDeep,
    productName: 'Salonpas Deep Relieving Gel',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: ID.salonpasDeep,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '3.1%' },
      { name: 'Menthol', strength: '10%' },
      { name: 'Methyl salicylate', strength: '15%' },
    ],
    inactiveIngredients: [
      flag(
        'SD alcohol 40-B',
        'limited',
        dailymed(SET.salonpasDeep, METH.alcoholVehicle),
      ),
      flag(
        'Ammonium acryloyldimethyltaurate/VP copolymer',
        'cleared',
        dailymed(SET.salonpasDeep, METH.ampsVp),
      ),
      flag(
        'Dimethyl isosorbide',
        'cleared',
        dailymed(SET.salonpasDeep, METH.dmi),
      ),
      flag('Propylene glycol', 'cleared', dailymed(SET.salonpasDeep, METH.pgTopical)),
      cleared(SET.salonpasDeep, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Deep Relieving Gel = Caution. Ammonium acryloyldimethyltaurate/VP copolymer + dimethyl isosorbide are standalone Caution; SD alcohol 40-B is Limited (vehicle). ${PG_TOPICAL_TAP} Distinct from the diclofenac gel and Jet Spray. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonpasDeep} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tigerLiniment,
    productName: 'Tiger Balm Liniment',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tigerLiniment,
    audience: ADULT,
    minAge: 12,
    form: 'liniment',
    activeIngredients: [
      { name: 'Methyl salicylate', strength: '28%' },
      { name: 'Menthol', strength: '16%' },
    ],
    inactiveIngredients: [
      flag('Eucalyptus oil', 'cleared', dailymed(SET.tigerLiniment, METH.eucalyptus)),
      flag(
        'Spike lavender oil',
        'cleared',
        dailymed(SET.tigerLiniment, METH.lavender),
      ),
      flag(
        'Light mineral oil',
        'cleared',
        dailymed(SET.tigerLiniment, METH.mineralOil),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Liniment = Caution. Eucalyptus oil + spike lavender oil are fragrance/EO standalone Caution. Light mineral oil is Cleared (topical occlusive, not an oral oil). ${MINERAL_OIL_TAP} Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tigerLiniment} — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

const VOLTAREN = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.voltaren);
const ASPER_NF = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.asperNf);
const ASPER_FR = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.asperFr);
const ICY_PERF = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.icyPerf);
const ICY_PRO = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.icyPro);
const ICY_ORIG = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.icyOrig);
const ICY_LIDO = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.icyLidoSpray);
const ASPER_LIDO = BATCH44_PAIN_RUBS_LIST2.find((r) => r.id === ID.asperLidoSpray);

if (BATCH44_PAIN_RUBS_LIST2.length !== 13) {
  throw new Error('batch 44 must write exactly 13 list-2 Search rows');
}
if (BATCH44_PAIN_RUBS_LIST2.some((record) => record.verdict !== 'caution')) {
  throw new Error('batch 44 list-2 tally is Caution-only');
}
if (BATCH44_PAIN_RUBS_LIST2.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 44 list-2 stays on Pain & Fever');
}
if (BATCH44_PAIN_RUBS_LIST2.some((record) => record.barcode)) {
  throw new Error('batch 44 must not invent barcodes');
}
if (VOLTAREN?.formulaId === 'aleve-arthritis-pain-gel') {
  throw new Error('Voltaren must keep its own formulaId');
}
if (ASPER_NF?.formulaId === ASPER_FR?.formulaId) {
  throw new Error('Aspercreme fragrance vs no-fragrance must split formulaId');
}
if (ICY_PERF?.formulaId !== ICY_PRO?.formulaId) {
  throw new Error('Icy Hot Performance and Pro must share formulaId');
}
if (ICY_ORIG?.formulaId === ICY_PERF?.formulaId) {
  throw new Error('Icy Hot Original must not share Performance/Pro formulaId');
}
if (ICY_LIDO?.formulaId === ASPER_LIDO?.formulaId) {
  throw new Error('Lidocaine dry sprays must not share formulaId (actives differ)');
}

// Verdict tally (13 records): Clean 0 · Caution 13 · Avoid 0
// Written: Voltaren gel (own id) + Aspercreme arthritis NF/FR + Salonpas
//   diclofenac gel + Salonpas Jet Spray + Icy Hot Performance / Original /
//   Pro dry sprays + Icy Hot + Aspercreme lidocaine dry sprays + Icy Hot
//   No-Mess liquid + Salonpas Deep Relieving Gel + Tiger Balm Liniment
// Refused still-missing §5: none from list 2
// List 3 / 4 OUT: remaining question-mark SKUs; kits; wound-only;
//   cosmetics; Canada/EU; discontinued; private-label; Lead duplicates
