// DRAFT / not verified / batch 45 remaining Icy Hot / Aspercreme /
// Salonpas / Tiger Balm / Voltaren US Pain & Fever rubs / creams /
// gels / sprays / liniment / patches / methodology v1.6 + Sept 15
// leftover locks on main (steareth / ethylhexylglycerin / TEA /
// patch-resin / nonoxynol / parabens High every form / IPA Limited /
// fragrance / polyoxyl 20 / ammonia / isobutane / unlabeled MCT /
// AMP / AMPS-VP / DMI / EO / mineral-oil / Blue 1 High / etc.).
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack sizes
// of the same name+form+inactives share formulaId. Form is labeled
// on cleanAlternatives, not a hard filter (§6). Not wired into Clean
// Picks UI. No live Clean Picks file is edited. No photos. Letter
// tiles only on new ids. No fake Clean alts. No methodology rewrite.
//
// TALLY (unverified drafts in THIS file): 18 rows — Clean 1 /
// Caution 12 / Avoid 5.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. Icy Hot Original Balm is Clean on inactives
// (paraffin + white petrolatum only). No Clean conventional NSAID /
// lidocaine cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batch 41: Precise creams/patch + AleveX
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel
// Batch 44 list-2 (13 rows, all present on Search): Voltaren Haleon
//   gel, Aspercreme Arthritis fragrance + no-fragrance, Salonpas
//   diclofenac gel, Salonpas Jet Spray, Icy Hot Performance /
//   Original / Pro Dry Sprays, Icy Hot + Aspercreme Lidocaine Dry
//   Sprays, Icy Hot Lidocaine No-Mess liquid, Salonpas Deep
//   Relieving Gel, Tiger Balm Liniment
// Batch 37 / 33 / 38 reuse from batch 41 still stands.
//
// formulaId notes (this file):
// - Icy Hot Performance Cream + Performance No-Mess Cream share
//   formulaId — OI + actives match (menthol 16% + camphor 11%; KOH
//   version). Two Search rows.
// - Icy Hot Advanced Pain Relief Cream + Icy Hot Pro No-Mess share
//   formulaId — OI + actives match (menthol 16% + camphor 11%; TEA
//   version, no KOH). Two Search rows. Not merged into Performance
//   (OI differs: TEA vs KOH).
// - Icy Hot Nighttime Recovery + Revive & Recovery No-Mess roll-ons
//   share formulaId — OI + actives match (menthol 8%). Two Search
//   rows. Revive fragrance variants (NDC 41167-0802 / 0804 / 0806)
//   share that formulaId.
// - Tiger Balm Muscle Rub + Active Muscle Rub share formulaId —
//   OI + actives match. Two Search rows.
// - Tiger Balm Red / Ultra / White keep separate formulaIds
//   (actives and/or OI differ: Ultra menthol 11% + cassia; Red
//   menthol 10% + cassia; White menthol 8%, no cassia).
// - Pack sizes of the same name+form+OI+actives share formulaId.
// - Do NOT clone Precise / AleveX / Motrin / Aleve / Voltaren ids.
//
// REFUSED (still missing from §5 — do not invent): see
// BATCH45_PAIN_RUB_REFUSED at the bottom of this file.

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
  'Seed/industrial oils are flagged in gummies. In this cream / balm / ointment they are not that High rule.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / benzyl alcohol / trolamine salicylate actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const MINERAL_OIL_TAP =
  'Paraffin + petrolatum / mineral oil as a topical occlusive is Cleared (petrolatum neighborhood). Tap: not an oral oil.';

const METH = {
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / alcohol denat. / SD alcohol / methylated spirit / dehydrated alcohol as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  peppermint:
    'Methodology §5 Limited-risk (peppermint oil / orange essential oil as flavor — flavor/EO line). Peppermint oil is the locked flavor/EO Limited row. Not gummy High. Not Avoid.',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid)',
  oleth:
    'Methodology §5 Caution (oleth-3-phosphate — standalone Caution, not additive-scored, not Avoid; locked Sept 15, 2026)',
  amp:
    'Methodology §5 Caution (aminomethyl propanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  steareth:
    'Methodology §5 Caution (steareth-2 / steareth-21 — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ethylhexyl:
    'Methodology §5 Caution (ethylhexylglycerin — standalone Caution, not Avoid; locked Sept 15, 2026)',
  hydroxyaceto:
    'Methodology §5 Caution (hydroxyacetophenone — standalone Caution, not Avoid; locked Sept 15, 2026)',
  tea:
    'Methodology §5 Caution (TEA / trolamine / triethanolamine as inactive — not the salicylate active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  farnesol:
    'Methodology §5 Caution (farnesol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  butylcyclo:
    'Methodology §5 Caution (4-t-butylcyclohexanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  grapefruit:
    'Methodology §5 Caution (grapefruit oil — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  spearmint:
    'Methodology §5 Caution (spearmint oil — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  cajuput:
    'Methodology §5 Caution (cajuput oil — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  cassia:
    'Methodology §5 Caution (cassia oil — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dementhol:
    'Methodology §5 Caution (dementholized mint — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  clove:
    'Methodology §5 Caution (clove oil / boswellia oil / thymus / flower oils as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as a gel / liniment / ointment inactive — fragrance/EO line; standalone Caution, not Avoid)',
  lavender:
    'Methodology §5 Caution (lavender oil / spike lavender oil, topical — fragrance-style; standalone Caution, not Avoid; locked Sept 15, 2026)',
  acrylate:
    'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — standalone Caution, not Avoid; locked Sept 15, 2026)',
  peg15:
    'Methodology §5 Caution (PEG-15 cocamine — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ppg5:
    'Methodology §5 Caution (PPG-5-ceteth-20 — standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmdm:
    'Methodology §5 Caution (DMDM hydantoin / diazolidinyl urea — formaldehyde-donor; standalone Caution, not Avoid unless founder later bumps; locked Sept 15, 2026)',
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  lpg:
    'Methodology §5 Caution (LPG / liquefied petroleum gas — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ps60: 'Methodology §5 Moderate-risk (polysorbate 60 — same Moderate family as P80 / P20)',
  petrolatum:
    `Methodology §5 Cleared (petrolatum / paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP} ${CREAM_OIL_LINE}`,
  paraffin:
    `Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP}`,
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  waxFamily:
    'Methodology §5 Cleared (cetyl esters wax / emulsifying wax — wax family; locked Sept 15, 2026)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  diisopropyl:
    'Methodology §5 Cleared (diisopropyl adipate — topical emollient ester; locked Sept 15, 2026)',
  allantoin: 'Methodology §5 Cleared (allantoin — topical soother; locked Sept 15, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
  pentylene:
    'Methodology §5 Cleared (pentylene glycol / propanediol — humectant / solvent; locked Sept 15, 2026)',
  koh: 'Methodology §5 Cleared (potassium hydroxide — pH adjuster, trace; locked Sept 15, 2026)',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant)',
  methylGlucose:
    'Methodology §5 Cleared (methyl glucose dioleate — topical emollient; locked Sept 15, 2026)',
  pgTopical: `Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this topical. ${PG_TOPICAL_TAP}`,
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
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / balm / ointment / roll-on / spray — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine cream invented.',
  ),
];

const SET = {
  icyBalm: '40c8c02f-fa5f-4e80-81a0-48271fa6f94b',
  icyCream: '40c8c02f-fa5f-4e80-81a0-48271fa6f94b',
  icyPerfNoMess: '5e3e272a-c001-4f57-9535-521ccc85ae65',
  icyPerfCream: '73f7a113-ef11-4932-bf4d-4e62863f7941',
  icyAdvanced: '9979ff36-415b-44e4-bb10-6bf682cd00f9',
  icyProNoMess: '9e8fedf5-fb59-4531-b288-715f851ee05b',
  icyNight: 'aa40c907-eeb5-4fda-b35e-439cbecc178c',
  icyRevive: 'b16ba9c2-23bf-4fdf-b44b-7abb9fec1911',
  icyVanish: 'e2092016-9741-433d-92e6-74bfddadb72c',
  salonpasLidoLiq: 'ea5b4a7f-d47d-4dbd-9288-c01329e387e5',
  tbMuscle: '011fc383-10bc-44cf-a67c-4be45fef33e0',
  tbActiveRub: '2e7638c6-e1ce-4e2f-bd50-52fbce5a138e',
  tbNeck: '02a65b25-78b2-4e29-9484-40e2228fb384',
  tbActiveGel: '845a4ead-f9c0-4009-bcae-b17cd388439b',
  tbSpray: '96b06d3f-8685-4314-ad7d-5d2720f4dde6',
  tbRed: 'ce703715-4c11-472c-9270-daac87b7be05',
  tbUltra: 'f0561804-e0f7-495d-9768-9b86a208c51e',
  tbWhite: 'f406161e-a9c4-47d1-8b21-93b1b7938063',
} as const;

const ID = {
  icyBalm: 'icy-hot-original-balm',
  icyCream: 'icy-hot-original-cream',
  icyPerfCream: 'icy-hot-performance-cream',
  icyPerfNoMess: 'icy-hot-performance-no-mess-cream',
  icyAdvanced: 'icy-hot-advanced-pain-relief-cream',
  icyProNoMess: 'icy-hot-pro-no-mess',
  icyNight: 'icy-hot-nighttime-recovery-roll-on',
  icyRevive: 'icy-hot-revive-recovery-roll-on',
  icyVanish: 'icy-hot-vanishing-scent-gel',
  salonpasLidoLiq: 'salonpas-lidocaine-plus-liquid',
  tbMuscle: 'tiger-balm-muscle-rub',
  tbActiveRub: 'tiger-balm-active-muscle-rub',
  tbNeck: 'tiger-balm-neck-shoulder-rub',
  tbActiveGel: 'tiger-balm-active-muscle-gel',
  tbSpray: 'tiger-balm-pain-relieving-muscle-spray',
  tbRed: 'tiger-balm-red-extra-strength',
  tbUltra: 'tiger-balm-ultra-strength',
  tbWhite: 'tiger-balm-white-regular-strength',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function performanceKohCreamInactives(setid: string): IngredientFlag[] {
  return [
    flag('4-t-butylcyclohexanol', 'cleared', dailymed(setid, METH.butylcyclo)),
    flag(
      'Acrylates/C10-30 alkyl acrylate crosspolymer',
      'cleared',
      dailymed(setid, METH.acrylate),
    ),
    flag('Alcohol denat.', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Allantoin', 'cleared', dailymed(setid, METH.allantoin)),
    flag('Aloe barbadensis leaf juice', 'cleared', dailymed(setid, METH.aloe)),
    flag('Cetyl alcohol', 'cleared', dailymed(setid, METH.fattyAlcohol)),
    flag('Grapefruit peel oil', 'cleared', dailymed(setid, METH.grapefruit)),
    flag('Farnesol', 'cleared', dailymed(setid, METH.farnesol)),
    flag('Fragrance', 'cleared', dailymed(setid, METH.fragrance)),
    flag('Glyceryl stearate', 'cleared', dailymed(setid, METH.glycerylStearate)),
    flag('Peppermint oil', 'limited', dailymed(setid, METH.peppermint)),
    flag('Spearmint leaf oil', 'cleared', dailymed(setid, METH.spearmint)),
    flag('Pentylene glycol', 'cleared', dailymed(setid, METH.pentylene)),
    flag('Propanediol', 'cleared', dailymed(setid, METH.pentylene)),
    flag('Potassium hydroxide', 'cleared', dailymed(setid, METH.koh)),
    flag('Steareth-21', 'cleared', dailymed(setid, METH.steareth)),
    flag('Stearic acid', 'cleared', dailymed(setid, METH.stearic)),
    cleared(setid, 'Purified water'),
  ];
}

function advancedTeaCreamInactives(setid: string): IngredientFlag[] {
  return [
    flag('4-t-butylcyclohexanol', 'cleared', dailymed(setid, METH.butylcyclo)),
    flag(
      'Acrylates/C10-30 alkyl acrylate crosspolymer',
      'cleared',
      dailymed(setid, METH.acrylate),
    ),
    flag('Alcohol denat.', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Allantoin', 'cleared', dailymed(setid, METH.allantoin)),
    flag('Aloe barbadensis leaf juice', 'cleared', dailymed(setid, METH.aloe)),
    flag('Cetyl alcohol', 'cleared', dailymed(setid, METH.fattyAlcohol)),
    flag('Grapefruit peel oil', 'cleared', dailymed(setid, METH.grapefruit)),
    flag('Farnesol', 'cleared', dailymed(setid, METH.farnesol)),
    flag('Fragrance', 'cleared', dailymed(setid, METH.fragrance)),
    flag('Glyceryl stearate', 'cleared', dailymed(setid, METH.glycerylStearate)),
    flag('Peppermint oil', 'limited', dailymed(setid, METH.peppermint)),
    flag('Spearmint leaf oil', 'cleared', dailymed(setid, METH.spearmint)),
    flag('Pentylene glycol', 'cleared', dailymed(setid, METH.pentylene)),
    flag('Propanediol', 'cleared', dailymed(setid, METH.pentylene)),
    flag('Steareth-21', 'cleared', dailymed(setid, METH.steareth)),
    flag('Stearic acid', 'cleared', dailymed(setid, METH.stearic)),
    flag('Triethanolamine', 'cleared', dailymed(setid, METH.tea)),
    cleared(setid, 'Purified water'),
  ];
}

function recoveryRollOnInactives(setid: string): IngredientFlag[] {
  return [
    cleared(setid, 'Purified water'),
    cleared(setid, 'Glycerin'),
    flag('Propanediol', 'cleared', dailymed(setid, METH.pentylene)),
    flag('Diisopropyl adipate', 'cleared', dailymed(setid, METH.diisopropyl)),
    flag('Aloe barbadensis leaf juice', 'cleared', dailymed(setid, METH.aloe)),
    flag('Fragrance', 'cleared', dailymed(setid, METH.fragrance)),
    flag('Steareth-21', 'cleared', dailymed(setid, METH.steareth)),
    flag(
      'Acrylates/C10-30 alkyl acrylate crosspolymer',
      'cleared',
      dailymed(setid, METH.acrylate),
    ),
    flag('Hydroxyacetophenone', 'cleared', dailymed(setid, METH.hydroxyaceto)),
    flag('Allantoin', 'cleared', dailymed(setid, METH.allantoin)),
    flag('Potassium hydroxide', 'cleared', dailymed(setid, METH.koh)),
    flag('Ethylhexylglycerin', 'cleared', dailymed(setid, METH.ethylhexyl)),
    flag('Steareth-2', 'cleared', dailymed(setid, METH.steareth)),
  ];
}

function muscleRubInactives(setid: string): IngredientFlag[] {
  return [
    flag('Carbomer', 'cleared', dailymed(setid, METH.carbomer)),
    flag('Diazolidinyl urea', 'cleared', dailymed(setid, METH.dmdm)),
    cleared(setid, 'Glycerin'),
    flag(
      'Methyl glucose dioleate',
      'cleared',
      dailymed(setid, METH.methylGlucose),
    ),
    flag('Methylparaben', 'high', dailymed(setid, METH.parabens)),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
    flag('Propylparaben', 'high', dailymed(setid, METH.parabens)),
    cleared(setid, 'Purified water'),
    flag('Triethanolamine', 'cleared', dailymed(setid, METH.tea)),
  ];
}

export const BATCH45_PAIN_RUBS_REMAINING: RatingRecord[] = [
  row({
    id: ID.icyBalm,
    productName: 'Icy Hot Original Pain Relief Balm',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167008799',
    formulaId: ID.icyBalm,
    audience: ADULT,
    minAge: 12,
    form: 'balm',
    activeIngredients: [
      { name: 'Menthol', strength: '7.6%' },
      { name: 'Methyl salicylate', strength: '29%' },
    ],
    inactiveIngredients: [
      flag('Paraffin', 'cleared', dailymed(SET.icyBalm, METH.paraffin)),
      flag('White petrolatum', 'cleared', dailymed(SET.icyBalm, METH.petrolatum)),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Original Pain Relief Balm = Clean. DailyMed Drug Facts list paraffin + white petrolatum only — no High / Limited / Caution-table inactive on this SPL. ${MINERAL_OIL_TAP} ${CREAM_OIL_LINE} Distinct from the Original Cream (same setid, different Drug Facts / actives 10% menthol + 30% methyl salicylate) and from the discontinued Extra Strength Stick (marketing end 01/31/2023 — list-4 OUT). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    sourcesGeneral: [
      `DailyMed setid ${SET.icyBalm} (balm NDC 41167-0087) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyCream,
    productName: 'Icy Hot Original Cream',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyCream,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Menthol', strength: '10%' },
      { name: 'Methyl salicylate', strength: '30%' },
    ],
    inactiveIngredients: [
      flag('Aminomethylpropanol', 'cleared', dailymed(SET.icyCream, METH.amp)),
      flag('Carbomer', 'cleared', dailymed(SET.icyCream, METH.carbomer)),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.icyCream, METH.fattyAlcohol)),
      flag('Cetyl esters', 'cleared', dailymed(SET.icyCream, METH.waxFamily)),
      flag('Oleth-3 phosphate', 'cleared', dailymed(SET.icyCream, METH.oleth)),
      flag('Polysorbate 60', 'moderate', dailymed(SET.icyCream, METH.ps60)),
      flag('Stearic acid', 'cleared', dailymed(SET.icyCream, METH.stearic)),
      cleared(SET.icyCream, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Original Cream = Caution. Drivers are oleth-3-phosphate + aminomethylpropanol (standalone Caution) and polysorbate 60 (Moderate family with P80 / P20). Carbomer / cetearyl alcohol / cetyl esters / stearic acid / water Cleared. Same DailyMed setid as the Original Balm — separate formulaId because OI + actives differ (this cream is menthol 10% / methyl salicylate 30%). Pack sizes (NDC 41167-0088) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyCream} (cream NDC 41167-0088) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyPerfNoMess,
    productName: 'Icy Hot Performance No-Mess Pain Relief Cream',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyPerfCream,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '16%' },
    ],
    inactiveIngredients: performanceKohCreamInactives(SET.icyPerfNoMess),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Performance No-Mess Pain Relief Cream = Caution. Alcohol denat. + peppermint Limited; 4-t-butylcyclohexanol / acrylates / grapefruit / farnesol / fragrance / spearmint / steareth-21 standalone Caution. KOH / glyceryl stearate / pentylene / propanediol / allantoin / aloe / cetyl / stearic Cleared. DailyMed OI + actives (menthol 16% / camphor 11%) match Icy Hot Performance Cream (setid ${SET.icyPerfCream}) — shared formulaId ${ID.icyPerfCream}, two Search rows. Distinct from Advanced / Pro No-Mess (those SPLs use TEA, not KOH). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyPerfNoMess}; Performance Cream twin ${SET.icyPerfCream} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyPerfCream,
    productName: 'Icy Hot Performance Cream',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyPerfCream,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '16%' },
    ],
    inactiveIngredients: performanceKohCreamInactives(SET.icyPerfCream),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Performance Cream = Caution. OI + actives match Icy Hot Performance No-Mess Pain Relief Cream (setid ${SET.icyPerfNoMess}) — one formulaId, two Search rows. NDC 41167-0803 pack sizes (3 g packet / 680 g bottle) share this formulaId. Not merged into Advanced / Pro No-Mess (TEA vs KOH). Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyPerfCream}; No-Mess twin ${SET.icyPerfNoMess} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyAdvanced,
    productName: 'Icy Hot Advanced Pain Relief Cream',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167080160',
    formulaId: ID.icyAdvanced,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Menthol', strength: '16%' },
      { name: 'Camphor (synthetic)', strength: '11%' },
    ],
    inactiveIngredients: advancedTeaCreamInactives(SET.icyAdvanced),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Advanced Pain Relief Cream = Caution. Same locked EO / steareth / acrylate / alcohol stack as Performance, but this SPL uses triethanolamine (TEA Caution) and does not name KOH — separate formulaId from ${ID.icyPerfCream}. DailyMed OI + actives match Icy Hot Pro No-Mess (setid ${SET.icyProNoMess}) — shared formulaId ${ID.icyAdvanced}, two Search rows. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyAdvanced}; Pro No-Mess twin ${SET.icyProNoMess} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyProNoMess,
    productName: 'Icy Hot Pro No-Mess',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167007969',
    formulaId: ID.icyAdvanced,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '16%' },
    ],
    inactiveIngredients: advancedTeaCreamInactives(SET.icyProNoMess),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Pro No-Mess = Caution. OI + actives match Icy Hot Advanced Pain Relief Cream (setid ${SET.icyAdvanced}) — one formulaId, two Search rows (Pro No-Mess vs Advanced). Not merged into Performance (KOH vs TEA). NDC 41167-0079 / 41167-7181 pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyProNoMess}; Advanced twin ${SET.icyAdvanced} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyNight,
    productName: 'Icy Hot Original Nighttime Recovery No-Mess Roll On',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyNight,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    activeIngredients: [{ name: 'Menthol', strength: '8%' }],
    inactiveIngredients: recoveryRollOnInactives(SET.icyNight),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Original Nighttime Recovery No-Mess Roll On = Caution. Drivers are fragrance / steareth-2 / steareth-21 / acrylates / hydroxyacetophenone / ethylhexylglycerin (standalone Caution). Propanediol / diisopropyl adipate / aloe / allantoin / KOH / glycerin / water Cleared. No High. DailyMed OI + actives (menthol 8%) match Revive & Recovery No-Mess (setid ${SET.icyRevive}) — shared formulaId ${ID.icyNight}, two Search rows. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyNight}; Revive twin ${SET.icyRevive} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyRevive,
    productName: 'Icy Hot Revive & Recovery No-Mess Roll On',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyNight,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    activeIngredients: [{ name: 'Menthol', strength: '8%' }],
    inactiveIngredients: recoveryRollOnInactives(SET.icyRevive),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Revive & Recovery No-Mess Roll On = Caution. OI + actives match Nighttime Recovery (setid ${SET.icyNight}) — one formulaId, two Search rows. Fragrance variants (NDC 41167-0802 / 0804 / 0806, including Lime & Mint) share this formulaId (same named OI). Not merged into the 16% menthol no-mess applicator (that SPL lists capsaicin as an inactive — refused). Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyRevive}; Nighttime twin ${SET.icyNight} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyVanish,
    productName: 'Icy Hot Original Vanishing Scent Gel',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167009239',
    formulaId: ID.icyVanish,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    activeIngredients: [{ name: 'Menthol', strength: '2.5%' }],
    inactiveIngredients: [
      flag('Alcohol denat.', 'limited', dailymed(SET.icyVanish, METH.alcoholVehicle)),
      flag('Allantoin', 'cleared', dailymed(SET.icyVanish, METH.allantoin)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.icyVanish, METH.aloe)),
      flag('Carbomer', 'cleared', dailymed(SET.icyVanish, METH.carbomer)),
      flag('DMDM hydantoin', 'cleared', dailymed(SET.icyVanish, METH.dmdm)),
      cleared(SET.icyVanish, 'Glycerin'),
      flag('Methylparaben', 'high', dailymed(SET.icyVanish, METH.parabens)),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.icyVanish, METH.phenoxy)),
      flag('Propylparaben', 'high', dailymed(SET.icyVanish, METH.parabens)),
      flag('Steareth-2', 'cleared', dailymed(SET.icyVanish, METH.steareth)),
      flag('Steareth-21', 'cleared', dailymed(SET.icyVanish, METH.steareth)),
      flag('Triethanolamine', 'cleared', dailymed(SET.icyVanish, METH.tea)),
      cleared(SET.icyVanish, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Original Vanishing Scent Gel = Avoid. Drivers are methylparaben + propylparaben (High in every form, including rubs — Sept 15 lock). DMDM hydantoin / phenoxyethanol / steareth-2 / steareth-21 / triethanolamine are standalone Caution (not Avoid on their own). Alcohol denat. is Limited (vehicle). ${LIMITED_STACK} Distinct from the Original Balm (Clean) and Original Cream (Caution). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyVanish} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonpasLidoLiq,
    productName: 'Salonpas Lidocaine Plus Pain Relieving Liquid',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: ID.salonpasLidoLiq,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    activeIngredients: [
      { name: 'Benzyl alcohol', strength: '10%' },
      { name: 'Lidocaine HCl', strength: '4%' },
    ],
    inactiveIngredients: [
      flag(
        'Aloe barbadensis leaf juice',
        'cleared',
        dailymed(SET.salonpasLidoLiq, METH.aloe),
      ),
      flag(
        'Aminomethylpropanol',
        'cleared',
        dailymed(SET.salonpasLidoLiq, METH.amp),
      ),
      flag('Carbomer', 'cleared', dailymed(SET.salonpasLidoLiq, METH.carbomer)),
      flag(
        'SD alcohol 40-B',
        'limited',
        dailymed(SET.salonpasLidoLiq, METH.alcoholVehicle),
      ),
      cleared(SET.salonpasLidoLiq, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Lidocaine Plus Pain Relieving Liquid (no-mess roll-on) = Caution. Aminomethylpropanol is standalone Caution; SD alcohol 40-B is Limited (vehicle). Aloe / carbomer / water Cleared. Benzyl alcohol 10% is an active on this SPL (parked — not the oral gasping-syndrome split). Distinct from the Lidocaine Plus cream (refused — butylene glycol / dicetyl phosphate / squalane / unspecified steareth + polysorbate). Distinct from Jet Spray and Deep Relieving Gel already on main. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonpasLidoLiq} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbMuscle,
    productName: 'Tiger Balm Muscle Rub',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbMuscle,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Methyl salicylate', strength: '15%' },
      { name: 'Menthol', strength: '5%' },
      { name: 'Camphor (synthetic)', strength: '3%' },
    ],
    inactiveIngredients: muscleRubInactives(SET.tbMuscle),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Muscle Rub = Avoid. Drivers are methylparaben + propylparaben (High in every form). Diazolidinyl urea + triethanolamine are standalone Caution. Carbomer / methyl glucose dioleate / glycerin / water Cleared. ${PG_TOPICAL_TAP} DailyMed OI + actives match Tiger Balm Active Muscle Rub (setid ${SET.tbActiveRub}) — shared formulaId ${ID.tbMuscle}, two Search rows. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbMuscle}; Active Muscle Rub twin ${SET.tbActiveRub} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbActiveRub,
    productName: 'Tiger Balm Active Muscle Rub',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbMuscle,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Methyl salicylate', strength: '15%' },
      { name: 'Menthol', strength: '5%' },
      { name: 'Camphor (synthetic)', strength: '3%' },
    ],
    inactiveIngredients: muscleRubInactives(SET.tbActiveRub),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Active Muscle Rub = Avoid. OI + actives match Tiger Balm Muscle Rub (setid ${SET.tbMuscle}) — one formulaId, two Search rows. Parabens High. Distinct from Active Muscle Gel (Blue 1 High; different OI / actives). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbActiveRub}; Muscle Rub twin ${SET.tbMuscle} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbNeck,
    productName: 'Tiger Balm Neck & Shoulder Rub',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbNeck,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      flag('Carbomer', 'cleared', dailymed(SET.tbNeck, METH.carbomer)),
      flag('Dementholised mint oil', 'cleared', dailymed(SET.tbNeck, METH.dementhol)),
      flag('Diazolidinyl urea', 'cleared', dailymed(SET.tbNeck, METH.dmdm)),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.tbNeck, METH.eucalyptus)),
      flag('FD&C Blue 1', 'high', dailymed(SET.tbNeck, METH.dyes)),
      cleared(SET.tbNeck, 'Glycerin'),
      flag('Lavender fragrance', 'cleared', dailymed(SET.tbNeck, METH.fragrance)),
      flag(
        'Methyl glucose dioleate',
        'cleared',
        dailymed(SET.tbNeck, METH.methylGlucose),
      ),
      flag('Methylparaben', 'high', dailymed(SET.tbNeck, METH.parabens)),
      flag('Propylene glycol', 'cleared', dailymed(SET.tbNeck, METH.pgTopical)),
      flag('Propylparaben', 'high', dailymed(SET.tbNeck, METH.parabens)),
      flag('Triethanolamine', 'cleared', dailymed(SET.tbNeck, METH.tea)),
      cleared(SET.tbNeck, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Neck & Shoulder Rub (lavender / carbomer SPL) = Avoid. Drivers are FD&C Blue 1 + methylparaben + propylparaben (High). Dementholised mint / eucalyptus / lavender fragrance / diazolidinyl urea / TEA are standalone Caution. The vanishing-scent twin on the same NDC family (setid 2f272d12, PVM/MA Decadiene Crosspolymer) is refused — that copolymer is still missing from §5. Pack sizes of this carbomer SPL share this formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbNeck} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbActiveGel,
    productName: 'Tiger Balm Active Muscle Gel',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbActiveGel,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    activeIngredients: [
      { name: 'Methyl salicylate', strength: '16%' },
      { name: 'Menthol', strength: '8%' },
    ],
    inactiveIngredients: [
      flag('Carbomer 940', 'cleared', dailymed(SET.tbActiveGel, METH.carbomer)),
      flag('Citric acid monohydrate', 'cleared', dailymed(SET.tbActiveGel, METH.cleared)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET.tbActiveGel, METH.dyes)),
      flag('Fragrance', 'cleared', dailymed(SET.tbActiveGel, METH.fragrance)),
      flag(
        'Methylated spirit',
        'limited',
        dailymed(SET.tbActiveGel, METH.alcoholVehicle),
      ),
      flag('PEG-15 cocamine', 'cleared', dailymed(SET.tbActiveGel, METH.peg15)),
      flag('PPG-5-ceteth-20', 'cleared', dailymed(SET.tbActiveGel, METH.ppg5)),
      flag('Propylene glycol', 'cleared', dailymed(SET.tbActiveGel, METH.pgTopical)),
      cleared(SET.tbActiveGel, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Active Muscle Gel = Avoid. Driver is FD&C Blue No. 1 (High synthetic dye). Methylated spirit is Limited (same alcohol-vehicle row as ethyl alcohol). Fragrance / PEG-15 cocamine / PPG-5-ceteth-20 are standalone Caution. Carbomer 940 is the locked carbomer Cleared row (older 940 benzene concern does not apply). Distinct from Active Muscle Rub (paraben cream; different actives). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbActiveGel} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbSpray,
    productName: 'Tiger Balm Pain Relieving Muscle Spray',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbSpray,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Methyl salicylate', strength: '25%' },
      { name: 'Menthol', strength: '16%' },
      { name: 'Camphor (synthetic)', strength: '7%' },
    ],
    inactiveIngredients: [
      flag('Ethanol (dehydrated alcohol)', 'limited', dailymed(SET.tbSpray, METH.alcoholVehicle)),
      flag('Liquefied petroleum gas', 'cleared', dailymed(SET.tbSpray, METH.lpg)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Pain Relieving Muscle Spray = Caution. Ethanol / dehydrated alcohol is Limited (vehicle). LPG is standalone Caution (pain-spray propellant family). No High. ${LIMITED_STACK} Distinct from Tiger Balm Liniment already on main (eucalyptus / spike lavender / light mineral oil). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbSpray} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbRed,
    productName: 'Tiger Balm Red Extra Strength',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    barcode: '039278220100',
    formulaId: ID.tbRed,
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      flag('Cajuput oil', 'cleared', dailymed(SET.tbRed, METH.cajuput)),
      flag('Cassia oil', 'cleared', dailymed(SET.tbRed, METH.cassia)),
      flag('Clove oil', 'cleared', dailymed(SET.tbRed, METH.clove)),
      flag('Dementholised mint oil', 'cleared', dailymed(SET.tbRed, METH.dementhol)),
      flag('Paraffin petrolatum', 'cleared', dailymed(SET.tbRed, METH.petrolatum)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Red Extra Strength = Caution. Cajuput / cassia / clove / dementholised mint are fragrance/EO standalone Caution. Paraffin petrolatum is Cleared (petrolatum neighborhood). ${MINERAL_OIL_TAP} Own formulaId — Ultra has the same OI but menthol 11% (actives differ). White has no cassia and menthol 8%. Export-only Red (NDC 66761-803) is list-4 OUT. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbRed} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbUltra,
    productName: 'Tiger Balm Ultra Strength',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    barcode: '039278315417',
    formulaId: ID.tbUltra,
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '11%' },
    ],
    inactiveIngredients: [
      flag('Cajuput oil', 'cleared', dailymed(SET.tbUltra, METH.cajuput)),
      flag('Cassia oil', 'cleared', dailymed(SET.tbUltra, METH.cassia)),
      flag('Clove oil', 'cleared', dailymed(SET.tbUltra, METH.clove)),
      flag('Dementholized mint oil', 'cleared', dailymed(SET.tbUltra, METH.dementhol)),
      flag('Paraffin petrolatum', 'cleared', dailymed(SET.tbUltra, METH.petrolatum)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Ultra Strength = Caution. Same locked EO + petrolatum stack as Red Extra Strength, but menthol 11% vs Red 10% — separate formulaId. Non-staining carton. Pack sizes (including 2 g / 8 g / 10 g / 18 g / 50 g) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbUltra} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbWhite,
    productName: 'Tiger Balm White Regular Strength',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    barcode: '039278110104',
    formulaId: ID.tbWhite,
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '8%' },
    ],
    inactiveIngredients: [
      flag('Cajuput oil', 'cleared', dailymed(SET.tbWhite, METH.cajuput)),
      flag('Clove oil', 'cleared', dailymed(SET.tbWhite, METH.clove)),
      flag('Dementholised mint oil', 'cleared', dailymed(SET.tbWhite, METH.dementhol)),
      flag('Paraffin petrolatum', 'cleared', dailymed(SET.tbWhite, METH.petrolatum)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm White Regular Strength = Caution. Cajuput / clove / dementholised mint are fragrance/EO standalone Caution. No cassia on this SPL (unlike Red / Ultra) and menthol 8% — own formulaId. Paraffin petrolatum Cleared. ${MINERAL_OIL_TAP} Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbWhite} — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

export const BATCH45_PAIN_RUB_REFUSED = [
  {
    sku: 'Icy Hot Pro Pain Massaging Balm',
    setid: '09e2b0cb-5186-4f9c-b256-edaced4ca014',
    missing: ['theobroma cacao (cocoa) seed butter'],
  },
  {
    sku: 'Icy Hot with Lidocaine Large Patch',
    setid: '267c0070-f65e-4faf-b10e-9f7f2393b9e2',
    missing: ['aluminum hydroxide'],
  },
  {
    sku: 'Icy Hot Pro Pain Relief Patch',
    setid: '27099a18-5b1c-45dd-93ba-e8d0457ea63c',
    missing: ['aluminum hydroxide'],
  },
  {
    sku: 'Icy Hot Lidocaine No-Mess Roll On',
    setid: '347f9a18-8ab6-47d3-9610-5b4e9ca5d53a',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Icy Hot Original No-Mess Roll On (16% menthol applicator)',
    setid: '4ce2b823-7ef5-4cca-a2d8-2fe781bc958e',
    missing: ['capsaicin (listed as inactive)'],
  },
  {
    sku: 'Icy Hot Max Lidocaine Pain Relief Cream',
    setid: '75b28b06-77ea-4fea-b516-2e8a0dac7037',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Icy Hot Original Arm/Neck/Leg + Back/XL/Value patches',
    setid: '941de921-c1f5-4293-973e-d3b786c78511',
    missing: ['aluminum hydroxide'],
  },
  {
    sku: 'Icy Hot Pro Pain Relief Cream with microbeads',
    setid: 'df5fd485-f583-46b7-a869-16ca2e17185c',
    missing: [
      'glyceryl dilaurate',
      'glycine soja (soybean) sterols',
      'ferric ferrocyanide',
    ],
  },
  {
    sku: 'Aspercreme Lidocaine with Eucalyptus Essential Oil cream',
    setid: '03e247b4-a2e2-4354-a018-880f1bc987fd',
    missing: ['C15-19 alkane'],
  },
  {
    sku: 'Aspercreme Lidocaine Foot (2-in-1) cream',
    setid: '2c33d15e-5032-46d9-bd98-5abc7df3bbe5',
    missing: [
      'dicetyl phosphate',
      'panthenol',
      'magnesium ascorbyl phosphate',
    ],
  },
  {
    sku: 'Aspercreme Lidocaine No-Mess plus Lavender',
    setid: '3948a3d2-ce04-4703-8709-211e75c9c38d',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme with Lidocaine Pain Relieving Patch',
    setid: '7ad8efa9-7031-4cd0-be1d-6dee63091fd1',
    missing: ['aluminum hydroxide'],
  },
  {
    sku: 'Aspercreme Lidocaine No-Mess Applicator / fragrance-free roll-on',
    setid: '8092cde7-28d0-4755-b5c0-5765934e572f',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme Original Pain Relief Cream (trolamine salicylate)',
    setid: '97dd587b-ecc3-4b4b-a116-6355d3c6ea6d',
    missing: ['potassium phosphate'],
  },
  {
    sku: 'Aspercreme Lidocaine Rosemary Mint liquid',
    setid: '9c81d5eb-fa9b-47fb-8924-6ebf6a5c6bab',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme Lidocaine with Rosemary and Mint',
    setid: '9d40bfea-85d0-4943-83e9-0c16e79a011c',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme with Lidocaine XL Patch',
    setid: 'b0859b10-539e-4905-ab52-af78b778d6a4',
    missing: ['aluminum hydroxide'],
  },
  {
    sku: 'Aspercreme with Lidocaine Odor-Free Cream',
    setid: 'd5da67c3-c2ec-4e3e-abe9-cc862dcfc8bd',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme Lidocaine Foot Pain Cream',
    setid: 'da82cc0e-cc39-408e-87e1-c35bb6f9f51e',
    missing: [
      'dicetyl phosphate',
      'triethyl citrate',
      'panthenol',
      'magnesium ascorbyl phosphate',
    ],
  },
  {
    sku: 'Aspercreme Professional Cream',
    setid: 'ef297864-5917-4645-8ec7-f2bc49e037e8',
    missing: [
      'dicetyl phosphate',
      'panthenol',
      'magnesium ascorbyl phosphate',
      'triethyl citrate',
    ],
  },
  {
    sku: 'Salonpas Arthritis Pain Patch',
    setid: '2e88c933-89e6-4a48-be7a-dc6a36e5c8f8',
    missing: ['synthetic aluminum silicate'],
  },
  {
    sku: 'Salonpas Lidocaine Plus Pain Relieving Cream',
    setid: '364924d3-fac3-4f4e-9b40-decd4ec48245',
    missing: [
      'butylene glycol',
      'ceteth phosphate',
      'dicetyl phosphate',
      'squalane',
      'steareth (unspecified)',
      'polysorbate (unspecified)',
    ],
  },
  {
    sku: 'Salonpas Lidocaine 4% Pain Relieving Gel-Patch',
    setid: '4f3a438c-f378-4d2a-a95c-58e56cf1e797',
    missing: ['aluminum silicate', 'dihydroxyaluminum aminoacetate'],
  },
  {
    sku: 'Salonpas Pain Relieving Patch LARGE',
    setid: '5bb6c6a3-7dc0-463d-ab2c-9f3bd3f3eff5',
    missing: ['aluminum silicate'],
  },
  {
    sku: 'Salonpas Lidocaine 4% Pain Relieving Gel-Patch (Hisamitsu America)',
    setid: '63911880-8194-4c7d-a72f-cab94761b2d7',
    missing: ['aluminum silicate', 'dihydroxyaluminum aminoacetate'],
  },
  {
    sku: 'Salonpas Pain Relief Patch',
    setid: '724bc4d3-0bc1-4275-a23b-4bbc62fbc0d2',
    missing: ['synthetic aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relieving FLEX Patch Lidocaine 4%',
    setid: '9507f727-c49f-4de4-9d64-b6d977d568ab',
    missing: ['aluminum silicate'],
  },
  {
    sku: 'Salonpas Arthritis Pain Patch LARGE',
    setid: 'a6518167-fe32-43b2-b736-ba01ac69c12d',
    missing: ['synthetic aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relief Patch LARGE',
    setid: 'acd7ba91-221a-485a-ad1f-dd41ed155656',
    missing: ['synthetic aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relieving Patch',
    setid: 'acdd5622-a9a7-4cc3-877e-57efea23303f',
    missing: ['synthetic aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relieving Gel-Patch HOT',
    setid: 'd2aa8820-a947-404b-b617-e692fbd16502',
    missing: ['magnesium aluminometasilicate', 'oleyl alcohol'],
  },
  {
    sku: 'Salonpas-HOT Capsicum Patch',
    setid: 'ef5373aa-9857-4d01-95af-2d7716e54ae4',
    missing: ['polybutene', 'zinc oxide (as inactive)'],
  },
  {
    sku: 'Tiger Balm Neck & Shoulder Rub (vanishing scent)',
    setid: '2f272d12-7b34-430e-817e-1005f57ed9e9',
    missing: ['PVM/MA Decadiene Crosspolymer'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Hydrogel Patch Large',
    setid: '064d04ca-184d-492b-867c-beaa165ab3e0',
    missing: ['mentha oil'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Cool Patch',
    setid: '41590ba1-32bb-4352-97ba-d6a3cc9d0546',
    missing: ['dihydroxyaluminum aminoacetate', 'mentha oil'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Patch',
    setid: '440e97bc-bd97-4733-9955-643b18e7fb18',
    missing: ['mentha oil'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Patch (regular hydrogel)',
    setid: '5066dc10-e4d5-49e9-9a5f-0ac220cfbf28',
    missing: ['mentha oil'],
  },
  {
    sku: 'Tiger Balm Arthritis Rub',
    setid: '80932288-4797-40d3-aa8a-6af686fb67ad',
    missing: [
      'chondroitin sulfate',
      'cinnamon oil',
      'glucosamine sulfate',
      'methylsulfonylmethane (MSM)',
      'PEG-120 methyl glucose dioleate',
    ],
  },
  {
    sku: 'Tiger Balm Pain Relieving Patch (wider hydrogel)',
    setid: 'ca601b02-e9be-4d8d-a384-c62553302ceb',
    missing: ['mentha oil'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Hydrogel Patch',
    setid: 'cb60037f-bceb-4090-a5e4-bdda0cbf9f5c',
    missing: ['mentha oil'],
  },
] as const;

const ICY_PERF_NM = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyPerfNoMess);
const ICY_PERF = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyPerfCream);
const ICY_ADV = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyAdvanced);
const ICY_PRO = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyProNoMess);
const ICY_NIGHT = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyNight);
const ICY_REVIVE = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyRevive);
const TB_MUSCLE = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.tbMuscle);
const TB_ACTIVE = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.tbActiveRub);
const ICY_BALM = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyBalm);
const ICY_VANISH = BATCH45_PAIN_RUBS_REMAINING.find((r) => r.id === ID.icyVanish);

if (BATCH45_PAIN_RUBS_REMAINING.length !== 18) {
  throw new Error('batch 45 must write exactly 18 remaining Search rows');
}
if (BATCH45_PAIN_RUBS_REMAINING.filter((r) => r.verdict === 'clean').length !== 1) {
  throw new Error('batch 45 Clean tally is the Original Balm only');
}
if (BATCH45_PAIN_RUBS_REMAINING.filter((r) => r.verdict === 'caution').length !== 12) {
  throw new Error('batch 45 Caution tally is 12');
}
if (BATCH45_PAIN_RUBS_REMAINING.filter((r) => r.verdict === 'avoid').length !== 5) {
  throw new Error('batch 45 Avoid tally is 5');
}
if (BATCH45_PAIN_RUBS_REMAINING.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 45 stays on Pain & Fever');
}
const BATCH45_CATCHUP_BARCODES: Record<string, string> = {
  [ID.icyBalm]: '041167008799',
  [ID.tbRed]: '039278220100',
  [ID.tbWhite]: '039278110104',
  [ID.icyAdvanced]: '041167080160',
  [ID.tbUltra]: '039278315417',
  [ID.icyProNoMess]: '041167007969',
  [ID.icyVanish]: '041167009239',
};
for (const record of BATCH45_PAIN_RUBS_REMAINING) {
  const expected = BATCH45_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 45 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 45 must not invent barcodes on ${record.id}`);
  }
}
if (ICY_PERF_NM?.formulaId !== ICY_PERF?.formulaId) {
  throw new Error('Performance Cream and Performance No-Mess must share formulaId');
}
if (ICY_ADV?.formulaId !== ICY_PRO?.formulaId) {
  throw new Error('Advanced and Pro No-Mess must share formulaId');
}
if (ICY_NIGHT?.formulaId !== ICY_REVIVE?.formulaId) {
  throw new Error('Nighttime Recovery and Revive must share formulaId');
}
if (TB_MUSCLE?.formulaId !== TB_ACTIVE?.formulaId) {
  throw new Error('Tiger Balm Muscle Rub and Active Muscle Rub must share formulaId');
}
if (ICY_PERF?.formulaId === ICY_ADV?.formulaId) {
  throw new Error('Performance (KOH) must not share Advanced/Pro (TEA) formulaId');
}
if (ICY_BALM?.verdict !== 'clean') {
  throw new Error('Original Balm must stay Clean');
}
if (ICY_VANISH?.verdict !== 'avoid') {
  throw new Error('Vanishing Scent must stay Avoid (parabens)');
}

// Verdict tally (18 records): Clean 1 · Caution 12 · Avoid 5
// Written: Icy Hot Original Balm (Clean) + Original Cream + Performance
//   Cream / No-Mess Cream + Advanced / Pro No-Mess + Nighttime /
//   Revive roll-ons + Vanishing Scent (Avoid) + Salonpas Lidocaine
//   Plus liquid + Tiger Balm Muscle / Active Muscle rubs (Avoid) +
//   Neck & Shoulder (Avoid) + Active Muscle Gel (Avoid) + Muscle
//   Spray + Red / Ultra / White ointments
// List-2 / batch44: already complete on main — no backfill
// Refused still-missing §5: see BATCH45_PAIN_RUB_REFUSED
