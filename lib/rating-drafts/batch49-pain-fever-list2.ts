// DRAFT / not verified / batch 49 list-2 Pain & Fever WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack sizes
// of the same name+form+inactives share formulaId. Same OI+actives
// share formulaId. Form is labeled on cleanAlternatives, not a hard
// filter (§6). Not wired into Clean Picks UI. No live Clean Picks
// file is edited. Do NOT restore Biofreeze Clean Picks. No photos.
// Letter tiles only on new ids. No fake Clean alts. No methodology
// rewrite. No Sprouts.
//
// TALLY (unverified drafts in THIS file): 4 rows — Clean 0 /
// Caution 1 / Avoid 3.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batch 41: Precise creams/patch + AleveX
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel
// Batch 44 list-2 (13 rows)
// Batch 45 remaining (18 rows)
// Batch 46: Tiger Balm Pain Relieving Patch + Hydrogel Patch +
//   Neck & Shoulder vanishing scent Avoid
// Batch 47: Icy Hot / Aspercreme leftover + Salonpas lidocaine
//   gel-patch / FLEX / Pain Relieving Patch + LARGE
// Batch 48: remaining Salonpas / Tiger Balm
//
// LIST 2 written (4 formula rows) under current §5 locks:
// - Biofreeze UltraFlex Lidocaine 4% Patch — Avoid (BHT High).
// - Biofreeze UltraFlex Plus Lidocaine 4% + Menthol 1% Patch —
//   Avoid (same OI math as UltraFlex; actives differ → own
//   formulaId). Do NOT clone UltraFlex.
// - Capzasin Quick Relief Gel — Avoid (methylparaben +
//   propylparaben High every form). Remaining DF exact per scan.
// - Mineral Ice Extreme Menthol Pain Relief Spray 10.5% —
//   Caution (fragrance Caution; alcohol denat. Limited; MSM /
//   Methylsulfonymethane Cleared; IPM / water Cleared). No High.
//
// formulaId notes (list 2):
// - UltraFlex 4-ct + 1-ct share formulaId (one Search row).
// - UltraFlex Plus 4-ct + 1-ct share this Plus formulaId (one
//   Search row). Actives differ from UltraFlex → do NOT clone.
// - Pack sizes of the same name+form+OI+actives share formulaId.
//
// REFUSED (still missing an exact §5 row — do not invent): none
// from list 2. All 4 DailyMed OI lines grade under current locks.
//
// LIST 3 — no Search rows (OUT). Do not write list 3.
// LIST 4 — no Search rows (OUT). Do not restore Biofreeze Clean
// Picks.

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
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / capsicum / benzyl alcohol / trolamine salicylate actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const MINERAL_OIL_TAP =
  'Paraffin + petrolatum / mineral oil as a topical occlusive is Cleared (petrolatum neighborhood). Tap: not an oral oil.';

const METH = {
  bht: 'Methodology §5 High-tier (BHT — butylated hydroxytoluene, E321; EU-restricted endocrine disruption; locked)',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / alcohol denat. / SD alcohol / methylated spirit / dehydrated alcohol as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid)',
  patchAdhesive:
    'Methodology §5 Caution (rosin esters / terpene resin / SIS / polyisobutylene patch adhesives — standalone Caution, not Avoid; locked Sept 15, 2026)',
  acrylate:
    'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmdm:
    'Methodology §5 Caution (DMDM hydantoin / diazolidinyl urea — formaldehyde-donor; standalone Caution, not Avoid unless founder later bumps; locked Sept 15, 2026)',
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  steareth:
    'Methodology §5 Caution (steareth-2 / steareth-21 — standalone Caution, not Avoid; locked Sept 15, 2026)',
  tea:
    'Methodology §5 Caution (TEA / trolamine / triethanolamine as inactive — not the salicylate active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  mineralOil: `Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP}`,
  ipm: 'Methodology §5 Cleared (glycol stearate, isopropyl myristate, stearyl heptanoate — topical emollients; locked Sept 15, 2026)',
  msm: 'Methodology §5 Cleared (MSM / methylsulfonylmethane as labeled inactive — exact token; locked Sept 15, 2026). SPL spells Methylsulfonymethane.',
  allantoin: 'Methodology §5 Cleared (allantoin — topical soother; locked Sept 15, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
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
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / balm / ointment / roll-on / spray / patch — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine cream invented.',
  ),
];

const SET = {
  ultraflex: '2655974b-a67d-9f07-e063-6294a90a54e8',
  ultraflexPlus: '401e1843-e9a6-fda9-e063-6294a90a3073',
  capzasin: 'd6c313a3-8dc6-4231-95b6-ac9399e1c1be',
  mineralIce: '584f5c6e-3385-3221-e063-6294a90aabae',
} as const;

const ID = {
  ultraflex: 'biofreeze-ultraflex-lidocaine-4-patch',
  ultraflexPlus: 'biofreeze-ultraflex-plus-lidocaine-menthol-patch',
  capzasin: 'capzasin-quick-relief-gel',
  mineralIce: 'mineral-ice-extreme-menthol-spray',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function ultraflexPatchInactives(setid: string): IngredientFlag[] {
  return [
    flag('Butylated hydroxytoluene', 'high', dailymed(setid, METH.bht)),
    flag(
      'Glyceryl hydrogenated rosinate',
      'cleared',
      dailymed(setid, METH.patchAdhesive),
    ),
    flag('Mineral oil', 'cleared', dailymed(setid, METH.mineralOil)),
    flag('Polyisobutylene', 'cleared', dailymed(setid, METH.patchAdhesive)),
    flag(
      'Styrene/Isoprene/Styrene block copolymer',
      'cleared',
      dailymed(setid, METH.patchAdhesive),
    ),
  ];
}

export const BATCH49_PAIN_FEVER_LIST2: RatingRecord[] = [
  row({
    id: ID.ultraflex,
    productName: 'Biofreeze UltraFlex Lidocaine 4% Patch',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: ID.ultraflex,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: ultraflexPatchInactives(SET.ultraflex),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze UltraFlex Lidocaine 4% Patch = Avoid. Driver is butylated hydroxytoluene (BHT High). Glyceryl hydrogenated rosinate sits on the locked rosin-ester Caution row. Polyisobutylene + styrene/isoprene/styrene block copolymer sit on the locked patch-adhesive Caution row. Mineral oil is topical-occlusive Cleared. 4-ct (NDC 59316-899-04) + 1-ct (NDC 59316-899-07) share this formulaId — one Search row. Do not merge into UltraFlex Plus (that SPL adds menthol 1%). Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${MINERAL_OIL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ultraflex} (NDC 59316-899) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ultraflexPlus,
    productName: 'Biofreeze UltraFlex Plus Lidocaine 4% + Menthol 1% Patch',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: ID.ultraflexPlus,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Lidocaine', strength: '4%' },
      { name: 'Menthol', strength: '1%' },
    ],
    inactiveIngredients: ultraflexPatchInactives(SET.ultraflexPlus),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze UltraFlex Plus Lidocaine 4% + Menthol 1% Patch = Avoid. Same OI math as UltraFlex (BHT High; glyceryl hydrogenated rosinate / PIB / SIS Caution; mineral oil Cleared). Actives differ (this SPL adds menthol 1%) — own formulaId ${ID.ultraflexPlus}, do NOT clone ${ID.ultraflex}. 4-ct (NDC 59316-898-04) + 1-ct (NDC 59316-898-07) share this formulaId — one Search row. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${MINERAL_OIL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ultraflexPlus} (NDC 59316-898) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.capzasin,
    productName: 'Capzasin Quick Relief Gel',
    brand: 'Capzasin',
    category: PAIN_FEVER,
    barcode: '041167751602',
    formulaId: ID.capzasin,
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    activeIngredients: [
      { name: 'Capsaicin', strength: '0.025%' },
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.capzasin, METH.acrylate),
      ),
      flag('Allantoin', 'cleared', dailymed(SET.capzasin, METH.allantoin)),
      flag(
        'Aloe barbadensis leaf juice',
        'cleared',
        dailymed(SET.capzasin, METH.aloe),
      ),
      flag('DMDM hydantoin', 'cleared', dailymed(SET.capzasin, METH.dmdm)),
      flag('Fragrance', 'cleared', dailymed(SET.capzasin, METH.fragrance)),
      cleared(SET.capzasin, 'Glycerin'),
      flag('Methylparaben', 'high', dailymed(SET.capzasin, METH.parabens)),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.capzasin, METH.phenoxy)),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.capzasin, METH.pgTopical),
      ),
      flag('Propylparaben', 'high', dailymed(SET.capzasin, METH.parabens)),
      flag(
        'SD alcohol 40-2 (15%)',
        'limited',
        dailymed(SET.capzasin, METH.alcoholVehicle),
      ),
      flag('Steareth-2', 'cleared', dailymed(SET.capzasin, METH.steareth)),
      flag('Steareth-21', 'cleared', dailymed(SET.capzasin, METH.steareth)),
      flag('Triethanolamine', 'cleared', dailymed(SET.capzasin, METH.tea)),
      cleared(SET.capzasin, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Capzasin Quick Relief Gel = Avoid. Drivers are methylparaben + propylparaben (High in every form, including rubs). Remaining Drug Facts exact: acrylates/C10-30 alkyl acrylate crosspolymer / DMDM hydantoin / fragrance / phenoxyethanol / steareth-2 / steareth-21 / triethanolamine standalone Caution; SD alcohol 40-2 Limited (vehicle); allantoin / aloe / glycerin / water Cleared. ${PG_TOPICAL_TAP} Pack sizes (NDC 41167-7516) share this formulaId. Ages 18+ (18 or younger: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.capzasin} (NDC 41167-7516) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.mineralIce,
    productName: 'Mineral Ice Extreme Menthol Pain Relief Spray 10.5%',
    brand: 'Mineral Ice',
    category: PAIN_FEVER,
    formulaId: ID.mineralIce,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [{ name: 'Menthol', strength: '10.5%' }],
    inactiveIngredients: [
      flag(
        'Alcohol denat.',
        'limited',
        dailymed(SET.mineralIce, METH.alcoholVehicle),
      ),
      flag('Fragrance', 'cleared', dailymed(SET.mineralIce, METH.fragrance)),
      flag(
        'Isopropyl myristate',
        'cleared',
        dailymed(SET.mineralIce, METH.ipm),
      ),
      flag('Methylsulfonymethane', 'cleared', dailymed(SET.mineralIce, METH.msm)),
      cleared(SET.mineralIce, 'Water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Mineral Ice Extreme Menthol Pain Relief Spray 10.5% = Caution. Fragrance is standalone Caution. Alcohol denat. is Limited (vehicle). Methylsulfonymethane is the SPL spelling of MSM / methylsulfonylmethane — locked exact Cleared inactive token. Isopropyl myristate + water Cleared. No High. Pack sizes (NDC 82632-252) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'mineraliceextreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.mineralIce} (NDC 82632-252) — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

export const BATCH49_LIST2_REFUSED = [] as const;

const ULTRAFLEX = BATCH49_PAIN_FEVER_LIST2.find((r) => r.id === ID.ultraflex);
const ULTRAFLEX_PLUS = BATCH49_PAIN_FEVER_LIST2.find(
  (r) => r.id === ID.ultraflexPlus,
);
const CAPZASIN = BATCH49_PAIN_FEVER_LIST2.find((r) => r.id === ID.capzasin);
const MINERAL_ICE = BATCH49_PAIN_FEVER_LIST2.find((r) => r.id === ID.mineralIce);

if (BATCH49_PAIN_FEVER_LIST2.length !== 4) {
  throw new Error('batch 49 must write exactly 4 list-2 Search rows');
}
if (BATCH49_PAIN_FEVER_LIST2.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 49 Clean tally is 0');
}
if (BATCH49_PAIN_FEVER_LIST2.filter((r) => r.verdict === 'caution').length !== 1) {
  throw new Error('batch 49 Caution tally is 1');
}
if (BATCH49_PAIN_FEVER_LIST2.filter((r) => r.verdict === 'avoid').length !== 3) {
  throw new Error('batch 49 Avoid tally is 3');
}
if (BATCH49_PAIN_FEVER_LIST2.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 49 stays on Pain & Fever');
}
const BATCH49_CATCHUP_BARCODES: Record<string, string> = {
  [ID.capzasin]: '041167751602',
};
for (const record of BATCH49_PAIN_FEVER_LIST2) {
  const expected = BATCH49_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 49 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 49 must not invent barcodes on ${record.id}`);
  }
}
if (BATCH49_PAIN_FEVER_LIST2.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 49 recordStatus must stay unverified');
}
if (ULTRAFLEX?.formulaId === ULTRAFLEX_PLUS?.formulaId) {
  throw new Error('UltraFlex Plus must not clone the UltraFlex formulaId');
}
if (ULTRAFLEX?.formulaId !== ID.ultraflex) {
  throw new Error('UltraFlex 4-ct + 1-ct must share the UltraFlex formulaId');
}
if (ULTRAFLEX_PLUS?.formulaId !== ID.ultraflexPlus) {
  throw new Error('UltraFlex Plus 4-ct + 1-ct must share the Plus formulaId');
}
if (ULTRAFLEX?.verdict !== 'avoid' || ULTRAFLEX_PLUS?.verdict !== 'avoid') {
  throw new Error('both UltraFlex patches must stay Avoid (BHT High)');
}
if (CAPZASIN?.verdict !== 'avoid') {
  throw new Error('Capzasin Quick Relief Gel must stay Avoid (parabens High)');
}
if (MINERAL_ICE?.verdict !== 'caution') {
  throw new Error('Mineral Ice Extreme must stay Caution (no High)');
}
if (CAPZASIN?.minAge !== 18) {
  throw new Error('Capzasin Quick Relief Gel is labeled 18+');
}
if (BATCH49_LIST2_REFUSED.length !== 0) {
  throw new Error('batch 49 refused list must stay empty — all 4 list-2 SKUs grade');
}

// Verdict tally (4 records): Clean 0 · Caution 1 · Avoid 3
// Written: Biofreeze UltraFlex + UltraFlex Plus (separate formulaIds) +
//   Capzasin Quick Relief Gel + Mineral Ice Extreme spray
// Reuse: batches 41 / 42 / 44 / 45 / 46 / 47 / 48 untouched
// List 3 / 4 OUT. No Biofreeze Clean Picks restore.
// Refused still-missing exact §5: none from list 2
