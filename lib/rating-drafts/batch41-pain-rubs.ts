// DRAFT / not verified / batch 41 same-aisle pain rubs /
// methodology v1.6 + Sept 15 parabens High every form + Precise /
// Advil / AleveX / Motrin-gel inactive locks on main.
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
// TALLY (unverified drafts in THIS file): 8 rows — Clean 0 /
// Caution 7 / Avoid 1.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — existing ids:
// Batch 37: medinatura-t-relief-pain-gel, medinatura-t-relief-xs-gel,
//   medinatura-t-relief-pain-cream, medinatura-t-relief-xs-cream,
//   medinatura-t-relief-arthritis-xs-cream,
//   medinatura-t-relief-lidocaine-4-cream, medinatura-traumeel-ointment,
//   bt-triflora-arthritis-gel
//   bt-arniflora-arnica-gel stays First Aid — do not move or rewrite.
// Batch 33: hylands-leg-cramps-arnica-cream,
//   hylands-leg-cramps-arnica-pm-cream
// Batch 38: natures-way-sports-gel already Caution — leave alone.
//
// LIST 3 written (8 formula rows) under current §5 locks:
// - Cetearyl olivate / sorbitan olivate = Cleared.
// - Isopropyl palmitate / isopropyl laurate = Cleared (IPM family).
// - Carbomer interpolymer = Cleared (widened carbomer row).
// - Vanillyl butyl ether = Caution (standalone).
// - DEGEE / ethoxydiglycol = Caution (standalone). Not Cleared.
// - Parabens High in every form, including patches.
// - Linseed oil in lotion/cream fill = Cleared. Not gummy High.
// - Pentylene glycol / propanediol = Cleared.
// - Clove / boswellia / thymus / flower oils as lotion scent = Caution.
// - Isopulegol / menthoxypropanediol = Caution.
// - Aminomethyl propanol = Caution.
// - DMAEMA + vinyl caprolactam / vinylpyrrolidone copolymer = Caution.
// - Dimethyl isosorbide = Caution.
// - Isobutane / isopentane / propane = Caution.
// - Phenoxyethanol / sodium polyacrylate / eucalyptus / sorbitan
//   oleate / fragrance-style EOs stay as already locked.
// Menthol / camphor / lidocaine actives stay parked.
//
// REFUSED (still missing from §5 — do not invent):
// - Advil Targeted Relief Cream (16e6be21) — isocetyl stearate
// - Motrin Arthritis Pain Gel (db5b4288) — isopropyl alcohol
//   (not the ethyl-alcohol vehicle row)
// - Aleve Arthritis Pain Gel (bad675d1) — isopropyl alcohol
//
// LIST 4 — no Search rows (PR-comment only):
// - Genexa Pain Crush — setid 6e8dd8bb; inactivated NDC 69676-0004-6
// - Kits; Excedrin/Bayer no topical; T-Relief Pet; Heel legacy;
//   Mexico B&T; wound-only First Aid

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

const CREAM_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this cream / lotion they are not that High rule.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const PEPPERMINT_TAP =
  'Peppermint oil is the locked flavor/EO Limited row. Not gummy High. Not Avoid.';

const ROSEMARY_TAP =
  'Rosemary oil is on the locked lotion-scent fragrance/EO row (clove / boswellia / thymus / flower oils). Not Avoid.';

const METH = {
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  peppermint: `Methodology §5 Limited-risk (peppermint oil / orange essential oil as flavor — flavor/EO line). ${PEPPERMINT_TAP}`,
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid, topical gel polymer — standalone Caution, not additive-scored, not Avoid)',
  vanillyl:
    'Methodology §5 Caution (vanillyl butyl ether — standalone Caution, not additive-scored, not Avoid; locked Sept 15, 2026)',
  degee:
    'Methodology §5 Caution (DEGEE / ethoxydiglycol — standalone Caution, not additive-scored, not Avoid, not Cleared; locked Sept 15, 2026)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as a gel / lotion inactive — fragrance/EO line; standalone Caution, not Avoid)',
  clove:
    'Methodology §5 Caution (clove oil / boswellia oil / thymus / flower oils as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  boswellia:
    'Methodology §5 Caution (boswellia / frankincense oil as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  thymus:
    'Methodology §5 Caution (thymus / flower oils as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  rosemary: `Methodology §5 Caution (clove / boswellia / thymus / flower oils as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026). ${ROSEMARY_TAP}`,
  isopulegol:
    'Methodology §5 Caution (isopulegol / menthoxypropanediol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  menthoxy:
    'Methodology §5 Caution (isopulegol / menthoxypropanediol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  amp:
    'Methodology §5 Caution (aminomethyl propanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmaema:
    'Methodology §5 Caution (DMAEMA copolymer; vinyl caprolactam / vinylpyrrolidone copolymer — standalone Caution, not Avoid; locked Sept 15, 2026)',
  vinyl:
    'Methodology §5 Caution (vinyl caprolactam / vinylpyrrolidone copolymer — standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmi:
    'Methodology §5 Caution (dimethyl isosorbide — standalone Caution, not Avoid; locked Sept 15, 2026)',
  propellant:
    'Methodology §5 Caution (isobutane / isopentane / propane pain-spray propellants — standalone Caution, not Avoid; locked Sept 15, 2026)',
  sorbitanOleate:
    'Methodology §5 Caution (sorbitan oleate / sorbitan monooleate, topical — standalone Caution, not additive-scored, not Avoid)',
  olivate:
    'Methodology §5 Cleared (cetearyl olivate / sorbitan olivate — topical emulsifier pair; locked Sept 15, 2026)',
  ipmFamily:
    'Methodology §5 Cleared (isopropyl palmitate / isopropyl laurate — IPM family; locked Sept 15, 2026)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family)',
  linseed: `Methodology §5 Cleared (linseed oil in lotion/cream fill — not the gummy seed-oil High rule; locked Sept 15, 2026). ${CREAM_OIL_LINE}`,
  pentylene:
    'Methodology §5 Cleared (pentylene glycol / propanediol — humectant / solvent; locked Sept 15, 2026)',
  pgTopical: `Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this topical. ${PG_TOPICAL_TAP}`,
  tocopherol: 'Methodology §5 Cleared (mixed tocopherols / vitamin E as antioxidant)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster)',
  povidone: 'Methodology §5 Cleared (povidone / PVP)',
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
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / lotion / patch / spray — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine / menthol cream invented.',
  ),
];

const SET = {
  preciseFf: 'fc1e0451-8c84-729e-e053-6394a90aaba0',
  preciseCool: 'fc0a3404-b174-3952-e053-6294a90a1e02',
  preciseWarm: '0c60b607-ade9-68f2-e063-6394a90a4025',
  preciseNight: '2ef4fe16-0820-6aad-e063-6294a90a8449',
  precisePatch: '36a95afd-97e5-2271-e063-6394a90aea18',
  alevexLotion: 'bc66bc1b-c0d5-2481-e053-2a95a90a75de',
  alevexTube: 'bafdf06b-25f5-e29e-e053-2a95a90a5e1b',
  alevexSpray: 'bafd199a-e198-d5d1-e053-2995a90ad1cb',
} as const;

const ID = {
  preciseFf: 'tylenol-precise-pain-relieving-cream',
  preciseCool: 'tylenol-precise-cooling-cream',
  preciseWarm: 'tylenol-precise-warming-cream',
  preciseNight: 'tylenol-precise-nighttime-cream',
  precisePatch: 'tylenol-precise-lidocaine-4-patch',
  alevexLotion: 'alevex-pain-relieving-lotion',
  alevexRollon: 'alevex-pain-relieving-lotion-roll-on',
  alevexTube: 'alevex-pain-relieving-lotion-tube',
  alevexSpray: 'alevex-pain-relieving-spray',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function preciseOlivateBase(setid: string): IngredientFlag[] {
  return [
    flag('Phenoxyethanol', 'cleared', dailymed(setid, METH.phenoxy)),
    flag('Cetearyl olivate', 'cleared', dailymed(setid, METH.olivate)),
    flag('Sorbitan olivate', 'cleared', dailymed(setid, METH.olivate)),
    flag('Isopropyl palmitate', 'cleared', dailymed(setid, METH.ipmFamily)),
    flag('Cetyl alcohol', 'cleared', dailymed(setid, METH.fattyAlcohol)),
    cleared(setid, 'Glycerin'),
    cleared(setid, 'Purified water'),
  ];
}

function alevexLotionInactives(setid: string): IngredientFlag[] {
  return [
    flag('Polysorbate 80', 'moderate', dailymed(setid, METH.ps80)),
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Peppermint oil', 'limited', dailymed(setid, METH.peppermint)),
    flag('Clove oil', 'cleared', dailymed(setid, METH.clove)),
    flag('Frankincense / boswellia oil', 'cleared', dailymed(setid, METH.boswellia)),
    flag(
      'Thymus mastichina flowering-top oil',
      'cleared',
      dailymed(setid, METH.thymus),
    ),
    flag('Rosemary oil', 'cleared', dailymed(setid, METH.rosemary)),
    flag('Eucalyptus oil', 'cleared', dailymed(setid, METH.eucalyptus)),
    flag('Vanillyl butyl ether', 'cleared', dailymed(setid, METH.vanillyl)),
    flag('Isopulegol', 'cleared', dailymed(setid, METH.isopulegol)),
    flag(
      '3-((l-Menthyl)oxy)propane-1,2-diol (menthoxypropanediol)',
      'cleared',
      dailymed(setid, METH.menthoxy),
    ),
    flag('Aminomethylpropanol', 'cleared', dailymed(setid, METH.amp)),
    flag('Sorbitan monooleate', 'cleared', dailymed(setid, METH.sorbitanOleate)),
    flag('Linseed oil', 'cleared', dailymed(setid, METH.linseed)),
    flag(
      'Carbomer interpolymer type A',
      'cleared',
      dailymed(setid, METH.carbomer),
    ),
    flag('Pentylene glycol', 'cleared', dailymed(setid, METH.pentylene)),
    flag('Edetate disodium', 'cleared', dailymed(setid, METH.edta)),
    flag('Tocopherol', 'cleared', dailymed(setid, METH.tocopherol)),
    cleared(setid, 'Glycerin'),
    cleared(setid, 'Purified water'),
  ];
}

export const BATCH41_PAIN_RUB_REFUSED = [
  'advil-targeted-relief-cream',
  'motrin-arthritis-pain-gel',
  'aleve-arthritis-pain-gel',
] as const;

export const BATCH41_PAIN_RUBS: RatingRecord[] = [
  row({
    id: ID.preciseFf,
    productName: 'Tylenol Precise Pain Relieving Cream (fragrance-free)',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: ID.preciseFf,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag(
        'Sodium polyacrylate (2500000 MW)',
        'cleared',
        dailymed(SET.preciseFf, METH.polyacrylate),
      ),
      ...preciseOlivateBase(SET.preciseFf),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tylenol Precise Pain Relieving Cream (fragrance-free) = Caution. Drivers are phenoxyethanol + sodium polyacrylate (standalone Caution-table, not Avoid). Cetearyl olivate / sorbitan olivate and isopropyl palmitate are Cleared (Sept 15 lock). ${PARKED_ACTIVES} Fragrance-free carton — not the Cooling / Warming / Nighttime / patch rows. Pack sizes share this formulaId. Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'tylenol.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.preciseFf} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.preciseCool,
    productName: 'Tylenol Precise Cooling Cream',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: ID.preciseCool,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Menthol', strength: 'on carton' },
      { name: 'Lidocaine', strength: 'on carton' },
    ],
    inactiveIngredients: [
      flag(
        'Sodium polyacrylate (2500000 MW)',
        'cleared',
        dailymed(SET.preciseCool, METH.polyacrylate),
      ),
      ...preciseOlivateBase(SET.preciseCool),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tylenol Precise Cooling Cream = Caution. Same olivate / palmitate Cleared stack as the fragrance-free cream; drivers are phenoxyethanol + sodium polyacrylate. NDC 69968-0793 pack sizes share this formulaId. Distinct from fragrance-free / Warming / Nighttime / patch. ${PARKED_ACTIVES} Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'tylenol.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.preciseCool} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.preciseWarm,
    productName: 'Tylenol Precise Warming Cream',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: ID.preciseWarm,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine', strength: 'on carton' }],
    inactiveIngredients: [
      flag('Phenoxyethanol', 'cleared', dailymed(SET.preciseWarm, METH.phenoxy)),
      flag(
        'Vanillyl butyl ether',
        'cleared',
        dailymed(SET.preciseWarm, METH.vanillyl),
      ),
      flag('Cetearyl olivate', 'cleared', dailymed(SET.preciseWarm, METH.olivate)),
      flag('Sorbitan olivate', 'cleared', dailymed(SET.preciseWarm, METH.olivate)),
      flag(
        'Isopropyl palmitate',
        'cleared',
        dailymed(SET.preciseWarm, METH.ipmFamily),
      ),
      flag(
        'Carbomer interpolymer type A (55000 CPS)',
        'cleared',
        dailymed(SET.preciseWarm, METH.carbomer),
      ),
      flag('Cetyl alcohol', 'cleared', dailymed(SET.preciseWarm, METH.fattyAlcohol)),
      cleared(SET.preciseWarm, 'Glycerin'),
      cleared(SET.preciseWarm, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tylenol Precise Warming Cream = Caution. Drivers are phenoxyethanol + vanillyl butyl ether (standalone Caution, not Avoid). Olivate pair + isopropyl palmitate + carbomer interpolymer are Cleared. No sodium polyacrylate on this SPL (carbomer interpolymer instead). Distinct from Cooling / Nighttime / fragrance-free / patch. ${PARKED_ACTIVES} Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'tylenol.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.preciseWarm} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.preciseNight,
    productName: 'Tylenol Precise Nighttime Cream',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: ID.preciseNight,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: 'on carton' },
      { name: 'Menthol', strength: 'on carton' },
    ],
    inactiveIngredients: [
      flag('Phenoxyethanol', 'cleared', dailymed(SET.preciseNight, METH.phenoxy)),
      flag(
        'Vanillyl butyl ether',
        'cleared',
        dailymed(SET.preciseNight, METH.vanillyl),
      ),
      flag('Cetearyl olivate', 'cleared', dailymed(SET.preciseNight, METH.olivate)),
      flag('Sorbitan olivate', 'cleared', dailymed(SET.preciseNight, METH.olivate)),
      flag(
        'Isopropyl palmitate',
        'cleared',
        dailymed(SET.preciseNight, METH.ipmFamily),
      ),
      flag(
        'Carbomer interpolymer type A (55000 CPS)',
        'cleared',
        dailymed(SET.preciseNight, METH.carbomer),
      ),
      flag(
        'Cetyl alcohol',
        'cleared',
        dailymed(SET.preciseNight, METH.fattyAlcohol),
      ),
      cleared(SET.preciseNight, 'Glycerin'),
      cleared(SET.preciseNight, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tylenol Precise Nighttime Cream = Caution. Same locked stack as Warming (phenoxyethanol + vanillyl Caution; olivate / palmitate / interpolymer Cleared). Distinct formulaId because actives differ (camphor + menthol, no lidocaine) even though the inactive list matches Warming. ${PARKED_ACTIVES} Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'tylenol.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.preciseNight} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.precisePatch,
    productName: 'Tylenol Precise Lidocaine 4% Patch',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: ID.precisePatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET.precisePatch, METH.parabens)),
      flag('Ethylparaben', 'high', dailymed(SET.precisePatch, METH.parabens)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.precisePatch, METH.ps80)),
      flag(
        'Diethylene glycol monoethyl ether (DEGEE)',
        'cleared',
        dailymed(SET.precisePatch, METH.degee),
      ),
      flag(
        'Isopropyl laurate',
        'cleared',
        dailymed(SET.precisePatch, METH.ipmFamily),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.precisePatch, METH.pgTopical),
      ),
      flag('Povidone', 'cleared', dailymed(SET.precisePatch, METH.povidone)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.precisePatch, METH.naoh)),
      cleared(SET.precisePatch, 'Glycerin'),
      cleared(SET.precisePatch, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tylenol Precise Lidocaine 4% Patch = Avoid. Drivers are methylparaben + ethylparaben (High in every form, including patches — Sept 15 lock). DEGEE is standalone Caution (not Cleared). Isopropyl laurate is Cleared (IPM family). ${PG_TOPICAL_TAP} No copolymers on this SPL. ${PARKED_ACTIVES} Distinct from the Precise creams. Pack sizes share this formulaId. Ages 12+ (12–17: adult supervision). Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'tylenol.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.precisePatch} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.alevexRollon,
    productName: 'AleveX Pain Relieving Lotion (roll-on)',
    brand: 'AleveX',
    category: PAIN_FEVER,
    formulaId: ID.alevexLotion,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on lotion',
    activeIngredients: [
      { name: 'Menthol', strength: 'on carton' },
      { name: 'Camphor (synthetic)', strength: 'on carton' },
    ],
    inactiveIngredients: alevexLotionInactives(SET.alevexLotion),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: AleveX Pain Relieving Lotion roll-on = Caution. PS80 is Moderate; alcohol vehicle + peppermint oil are Limited; clove / boswellia / thymus / rosemary / eucalyptus / vanillyl / isopulegol / menthoxypropanediol / aminomethylpropanol / sorbitan monooleate are standalone Caution. Linseed oil is Cleared (lotion fill ≠ gummy High). ${CREAM_OIL_LINE} DailyMed OI matches the 77 g tube (setid ${SET.alevexTube}, NDC 0280-0063) exactly — shared formulaId ${ID.alevexLotion}, not merged into one Search row (roll-on vs tube). Distinct from the spray. ${PARKED_ACTIVES} Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.alevexLotion} (roll-on NDC 0280-0050); tube twin ${SET.alevexTube} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.alevexTube,
    productName: 'AleveX Pain Relieving Lotion (tube 77 g)',
    brand: 'AleveX',
    category: PAIN_FEVER,
    formulaId: ID.alevexLotion,
    audience: ADULT,
    minAge: 12,
    form: 'lotion',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: 'on carton' },
      { name: 'Menthol', strength: 'on carton' },
    ],
    inactiveIngredients: alevexLotionInactives(SET.alevexTube),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: AleveX Pain Relieving Lotion tube 77 g = Caution. Same locked OI as the roll-on (setid ${SET.alevexLotion}) — one formulaId, two Search rows (roll-on vs tube). Do not merge with the spray (different OI). ${PARKED_ACTIVES} Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.alevexTube} (tube NDC 0280-0063); roll-on twin ${SET.alevexLotion} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.alevexSpray,
    productName: 'AleveX Pain Relieving Spray',
    brand: 'AleveX',
    category: PAIN_FEVER,
    formulaId: ID.alevexSpray,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: 'on carton' },
      { name: 'Menthol', strength: 'on carton' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.alevexSpray, METH.alcoholVehicle)),
      flag('Peppermint oil', 'limited', dailymed(SET.alevexSpray, METH.peppermint)),
      flag('Clove oil', 'cleared', dailymed(SET.alevexSpray, METH.clove)),
      flag(
        'Frankincense / boswellia oil',
        'cleared',
        dailymed(SET.alevexSpray, METH.boswellia),
      ),
      flag(
        'Thymus mastichina flowering-top oil',
        'cleared',
        dailymed(SET.alevexSpray, METH.thymus),
      ),
      flag('Rosemary oil', 'cleared', dailymed(SET.alevexSpray, METH.rosemary)),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.alevexSpray, METH.eucalyptus)),
      flag('Vanillyl butyl ether', 'cleared', dailymed(SET.alevexSpray, METH.vanillyl)),
      flag('Isopulegol', 'cleared', dailymed(SET.alevexSpray, METH.isopulegol)),
      flag(
        '3-((l-Menthyl)oxy)propane-1,2-diol (menthoxypropanediol)',
        'cleared',
        dailymed(SET.alevexSpray, METH.menthoxy),
      ),
      flag(
        'Dimethylaminoethyl methacrylate – butyl methacrylate – methyl methacrylate copolymer (DMAEMA)',
        'cleared',
        dailymed(SET.alevexSpray, METH.dmaema),
      ),
      flag('N-vinylcaprolactam', 'cleared', dailymed(SET.alevexSpray, METH.vinyl)),
      flag('N-vinylpyrrolidinone', 'cleared', dailymed(SET.alevexSpray, METH.vinyl)),
      flag('Dimethyl isosorbide', 'cleared', dailymed(SET.alevexSpray, METH.dmi)),
      flag('Isobutane', 'cleared', dailymed(SET.alevexSpray, METH.propellant)),
      flag('Isopentane', 'cleared', dailymed(SET.alevexSpray, METH.propellant)),
      flag('Propane', 'cleared', dailymed(SET.alevexSpray, METH.propellant)),
      flag('Linseed oil', 'cleared', dailymed(SET.alevexSpray, METH.linseed)),
      flag(
        'Carbomer interpolymer type A',
        'cleared',
        dailymed(SET.alevexSpray, METH.carbomer),
      ),
      flag('Propanediol', 'cleared', dailymed(SET.alevexSpray, METH.pentylene)),
      flag('Tocopherol', 'cleared', dailymed(SET.alevexSpray, METH.tocopherol)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: AleveX Pain Relieving Spray = Caution. Separate formulaId from the lotion — OI does not match (aerosol propellants + DMAEMA / vinyl copolymers + dimethyl isosorbide + propanediol; no PS80 / pentylene glycol / EDTA / sorbitan / aminomethylpropanol / glycerin / water on this SPL). Alcohol + peppermint Limited; EO / vanillyl / copolymer / DMI / propellant stack is standalone Caution, not Avoid. ${CREAM_OIL_LINE} ${PARKED_ACTIVES} Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.alevexSpray} — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

// Verdict tally (8 records): Clean 0 · Caution 7 · Avoid 1
// Written: Precise FF / Cooling / Warming / Nighttime / Patch + AleveX
//   roll-on / tube / spray
// Refused: Advil Targeted Relief (isocetyl stearate); Motrin + Aleve
//   arthritis gels (isopropyl alcohol)
