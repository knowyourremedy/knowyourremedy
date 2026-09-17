// DRAFT / not verified / batch 48 PR #95 refused Salonpas / Tiger
// Balm WRITE / methodology v1.6 + current main §5 exact Additive /
// “also appears as” / locked exact-INCI rows only. No invented
// grades. No cousin-match. Founder owns final Avoid vs Caution vs
// Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack sizes
// of the same name+form+inactives share formulaId. Same OI+actives
// share formulaId. LARGE pack of the same formula shares formulaId
// with the base when OI matches. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Not wired into Clean
// Picks UI. No live Clean Picks file is edited. No photos. Letter
// tiles only on new ids. No fake Clean alts. No methodology rewrite.
//
// GATE: write a PR #95 refused SKU only when every current DailyMed
// OI token matches an exact §5 Additive column / “also appears as”
// / locked exact-INCI line. Cousin-matching is NOT enough.
// baking cloth + film are backing / device, not gradeable inactives
// — ignore them; do not invent §5 rows; do not block the SKU.
//
// TALLY (unverified drafts in THIS file): 12 rows — Clean 0 /
// Caution 9 / Avoid 3.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batch 41: Precise creams/patch + AleveX
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel
// Batch 44 list-2 (13 rows)
// Batch 45 remaining (18 rows, including tiger-balm-neck-shoulder-rub
//   and salonpas-lidocaine-plus-liquid)
// Batch 46: Tiger Balm Pain Relieving Patch + Hydrogel Patch +
//   Neck & Shoulder vanishing scent Avoid
// Batch 47: Icy Hot / Aspercreme leftover + Salonpas lidocaine
//   gel-patch / FLEX / Pain Relieving Patch + LARGE
//
// REFUSED (still missing an exact §5 row — do not invent): none.

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

const CLOTH_FILM =
  'Baking cloth + film are backing / device, not gradeable inactives — omitted, not graded.';

const METH = {
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / alcohol denat. / SD alcohol / methylated spirit / dehydrated alcohol as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  bht: 'Methodology §5 High-tier (BHT — butylated hydroxytoluene, E321; EU-restricted endocrine disruption; locked)',
  psUnspec:
    'Methodology §5 Moderate-risk (Polysorbate (unspecified) — alias so “polysorbate” matches the same Moderate family as P80 / P20 / P60; locked Sept 15, 2026). Do not invent a new class.',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  amp:
    'Methodology §5 Caution (aminomethyl propanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  amps:
    'Methodology §5 Caution (hydroxyethyl acrylate / sodium acryloyldimethyltaurate copolymer — AMPS family; standalone Caution, not Avoid; locked Sept 15, 2026)',
  acrylate:
    'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — standalone Caution, not Avoid; locked Sept 15, 2026)',
  cetethPhos:
    'Methodology §5 Caution (ceteth phosphate — exact INCI; distinct from ceteth-20 phosphate; standalone Caution, not Avoid; locked Sept 15, 2026)',
  stearethUnspec:
    'Methodology §5 Caution (steareth (unspecified) — exact token when the label does not number the steareth; distinct from steareth-2 / steareth-21; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dicetyl:
    'Methodology §5 Caution (dicetyl phosphate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  alSilicate:
    'Methodology §5 Caution (aluminum silicate / synthetic aluminum silicate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  alicyclic:
    'Methodology §5 Caution (alicyclic saturated hydrocarbon resin — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  patchAdhesive:
    'Methodology §5 Caution (rosin esters / terpene resin / SIS / polyisobutylene patch adhesives — standalone Caution, not Avoid; locked Sept 15, 2026)',
  magAlumino:
    'Methodology §5 Caution (magnesium aluminometasilicate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026). Distinct from silodrate.',
  nonoxynol:
    'Methodology §5 Caution (nonoxynol — bare / unspecified; distinct from nonoxynol-30; standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid, topical gel polymer — standalone Caution, not Avoid; locked Sept 15, 2026)',
  sorbitanOleate:
    'Methodology §5 Caution (sorbitan oleate / sorbitan monooleate, topical — standalone Caution, not additive-scored, not Avoid)',
  polybutene:
    'Methodology §5 Caution (polybutene — exact INCI; distinct from polyisobutylene; standalone Caution, not Avoid; locked Sept 15, 2026)',
  latex:
    'Methodology §5 Caution (latex — standalone Caution, not Avoid; locked Sept 15, 2026)',
  menthaOil:
    'Methodology §5 Caution (Mentha Oil / mentha oil — generic mint EO; exact tokens; distinct from Mentha arvensis leaf oil; standalone Caution, not Avoid; locked Sept 15, 2026)',
  methylAcrylate:
    'Methodology §5 Caution (methyl acrylate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026). The copolymer sits on the locked acrylate-copolymer family row.',
  dihydroxyAl:
    'Methodology §5 Caution (dihydroxyaluminum aminoacetate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  alGlycinate:
    'Methodology §5 Caution (aluminum glycinate — standalone Caution, not Avoid; locked Sept 15, 2026)',
  hydrotalcite:
    'Methodology §5 Caution (hydrotalcite — standalone Caution, not Avoid; locked Sept 15, 2026)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as a gel / liniment / ointment / patch inactive — fragrance/EO line; standalone Caution, not Avoid)',
  cajuput:
    'Methodology §5 Caution (cajuput oil — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  cinnamon:
    'Methodology §5 Caution (cinnamon oil — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  clove:
    'Methodology §5 Caution (clove oil / boswellia oil / thymus / flower oils as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dementhol:
    'Methodology §5 Caution (dementholized mint — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmdm:
    'Methodology §5 Caution (DMDM hydantoin / diazolidinyl urea — formaldehyde-donor; standalone Caution, not Avoid unless founder later bumps; locked Sept 15, 2026)',
  peg120:
    'Methodology §5 Caution (PEG-120 Methyl Glucose Dioleate — exact INCI; distinct from Cleared methyl glucose dioleate; standalone Caution, not Avoid; locked Sept 15, 2026). Not the PEG Moderate family row.',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  butylene:
    'Methodology §5 Cleared (butylene glycol — exact INCI; locked Sept 15, 2026)',
  squalane: 'Methodology §5 Cleared (squalane — exact INCI; locked Sept 15, 2026)',
  oleyl: 'Methodology §5 Cleared (oleyl alcohol — exact INCI; locked Sept 15, 2026)',
  zno: 'Methodology §5 Cleared (zinc oxide (inactive / topical) — exact token when labeled as inactive; distinct from parked zinc-as-active; locked Sept 15, 2026)',
  glucosamine:
    'Methodology §5 Cleared (glucosamine / glucosamine sulfate as labeled inactive — exact token; locked Sept 15, 2026)',
  msm: 'Methodology §5 Cleared (MSM / methylsulfonylmethane as labeled inactive — exact token; locked Sept 15, 2026)',
  chondroitin:
    'Methodology §5 Cleared (chondroitin sulfate as labeled inactive — exact token; locked Sept 15, 2026)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer / carbomer copolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate / glyceryl monostearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  dimethicone:
    'Methodology §5 Cleared (dimethicone / dimethicone copolyol — locked Sept 14, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
  mineralOil: `Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP}`,
  pva: 'Methodology §5 Cleared (PVA / polyvinyl alcohol, topical film; locked Sept 15, 2026)',
  cellulose:
    'Methodology §5 Cleared (cellulose gum / carboxymethylcellulose sodium — MCC / cellulose-family filler)',
  kaolin: 'Methodology §5 Cleared (kaolin — clay / absorbent; locked Sept 15, 2026)',
  tartaric: 'Methodology §5 Cleared (tartaric acid — organic acid with citric; locked Sept 15, 2026)',
  gelatin: 'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  edta: 'Methodology §5 Cleared (disodium EDTA, TRACE preservative/stabilizer use — locked v1.6)',
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
  salonLidoCream: '364924d3-fac3-4f4e-9b40-decd4ec48245',
  salonArth: '2e88c933-89e6-4a48-be7a-dc6a36e5c8f8',
  salonRelief: '724bc4d3-0bc1-4275-a23b-4bbc62fbc0d2',
  salonArthLarge: 'a6518167-fe32-43b2-b736-ba01ac69c12d',
  salonReliefLarge: 'acd7ba91-221a-485a-ad1f-dd41ed155656',
  salonGelHot: 'd2aa8820-a947-404b-b617-e692fbd16502',
  salonCapsicum: 'ef5373aa-9857-4d01-95af-2d7716e54ae4',
  tbHydroLarge: '064d04ca-184d-492b-867c-beaa165ab3e0',
  tbCool: '41590ba1-32bb-4352-97ba-d6a3cc9d0546',
  tbRegHydro: '5066dc10-e4d5-49e9-9a5f-0ac220cfbf28',
  tbArthritis: '80932288-4797-40d3-aa8a-6af686fb67ad',
  tbWider: 'ca601b02-e9be-4d8d-a384-c62553302ceb',
} as const;

const ID = {
  salonLidoCream: 'salonpas-lidocaine-plus-cream',
  salonArth: 'salonpas-arthritis-pain-patch',
  salonRelief: 'salonpas-pain-relief-patch',
  salonArthLarge: 'salonpas-arthritis-pain-patch-large',
  salonReliefLarge: 'salonpas-pain-relief-patch-large',
  salonGelHot: 'salonpas-gel-patch-hot',
  salonCapsicum: 'salonpas-hot-capsicum-patch',
  tbHydroLarge: 'tiger-balm-hydrogel-patch-large',
  tbCool: 'tiger-balm-cool-patch',
  tbRegHydro: 'tiger-balm-pain-relieving-patch-regular-hydrogel',
  tbArthritis: 'tiger-balm-arthritis-rub',
  tbWider: 'tiger-balm-pain-relieving-patch-wider-hydrogel',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function nsaidPatchInactives(
  setid: string,
  sisName: string,
): IngredientFlag[] {
  return [
    flag(
      'Alicyclic saturated hydrocarbon resin',
      'cleared',
      dailymed(setid, METH.alicyclic),
    ),
    flag('Mineral oil', 'cleared', dailymed(setid, METH.mineralOil)),
    flag('Polyisobutylene', 'cleared', dailymed(setid, METH.patchAdhesive)),
    flag(
      'Polyisobutylene 1,200,000',
      'cleared',
      dailymed(setid, METH.patchAdhesive),
    ),
    flag(sisName, 'cleared', dailymed(setid, METH.patchAdhesive)),
    flag(
      'Synthetic aluminum silicate',
      'cleared',
      dailymed(setid, METH.alSilicate),
    ),
  ];
}

function mentholMsPatchRow(opts: {
  id: string;
  productName: string;
  formulaId: string;
  setid: string;
  ndc: string;
  sisName: string;
  twinNote: string;
}): RatingRecord {
  return row({
    id: opts.id,
    productName: opts.productName,
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: opts.formulaId,
    audience: ADULT,
    minAge: 18,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '3%' },
      { name: 'Methyl salicylate', strength: '10%' },
    ],
    inactiveIngredients: nsaidPatchInactives(opts.setid, opts.sisName),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: ${opts.productName} = Caution. Alicyclic saturated hydrocarbon resin is the locked exact Caution INCI. Synthetic aluminum silicate is the locked exact Caution INCI. SIS / polyisobutylene (including 1,200,000 MW) sit on the locked patch-adhesive Caution row. No High. ${CLOTH_FILM} ${opts.twinNote} Pack sizes (NDC ${opts.ndc}) share this formulaId. Ages 18+ (under 18: do not use). ${PARKED_ACTIVES} ${MINERAL_OIL_TAP} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (NDC ${opts.ndc}) — ${UNVERIFIED_NOTE}`,
    ],
  });
}

function regularWiderHydrogelInactives(setid: string): IngredientFlag[] {
  return [
    flag('Aluminium glycinate', 'cleared', dailymed(setid, METH.alGlycinate)),
    flag('Eucalyptus oil', 'cleared', dailymed(setid, METH.eucalyptus)),
    cleared(setid, 'Glycerin'),
    flag('Hydrotalcite', 'cleared', dailymed(setid, METH.hydrotalcite)),
    flag('Kaolin', 'cleared', dailymed(setid, METH.kaolin)),
    flag('Mentha oil', 'cleared', dailymed(setid, METH.menthaOil)),
    flag('Polysorbate 80', 'moderate', dailymed(setid, METH.ps80)),
    flag(
      'Polyacrylic acid solution',
      'cleared',
      dailymed(setid, METH.polyacrylate),
    ),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
    flag(
      'Sodium carboxymethylcellulose',
      'cleared',
      dailymed(setid, METH.cellulose),
    ),
    flag('Sodium polyacrylate', 'cleared', dailymed(setid, METH.polyacrylate)),
    flag('Sorbitol solution', 'limited', dailymed(setid, METH.sorbitol)),
    cleared(setid, 'Purified water'),
  ];
}

export const BATCH48_SALONPAS_TIGER_BALM_WRITE: RatingRecord[] = [
  row({
    id: ID.salonLidoCream,
    productName: 'Salonpas Lidocaine Plus Pain Relieving Cream',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: ID.salonLidoCream,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Benzyl alcohol', strength: '10%' },
      { name: 'Lidocaine HCl', strength: '4%' },
    ],
    inactiveIngredients: [
      flag(
        'Aloe barbadensis leaf juice',
        'cleared',
        dailymed(SET.salonLidoCream, METH.aloe),
      ),
      flag(
        'Aminomethyl propanol',
        'cleared',
        dailymed(SET.salonLidoCream, METH.amp),
      ),
      flag(
        'Butylene glycol',
        'cleared',
        dailymed(SET.salonLidoCream, METH.butylene),
      ),
      flag(
        'Carbomer copolymer',
        'cleared',
        dailymed(SET.salonLidoCream, METH.carbomer),
      ),
      flag(
        'Cetearyl alcohol',
        'cleared',
        dailymed(SET.salonLidoCream, METH.fattyAlcohol),
      ),
      flag(
        'Ceteth phosphate',
        'cleared',
        dailymed(SET.salonLidoCream, METH.cetethPhos),
      ),
      flag(
        'Dicetyl phosphate',
        'cleared',
        dailymed(SET.salonLidoCream, METH.dicetyl),
      ),
      flag(
        'Dimethicone',
        'cleared',
        dailymed(SET.salonLidoCream, METH.dimethicone),
      ),
      flag(
        'Glyceryl monostearate',
        'cleared',
        dailymed(SET.salonLidoCream, METH.glycerylStearate),
      ),
      flag(
        'Hydroxyl acrylate/sodium acryloyldimethyl taurate copolymer',
        'cleared',
        dailymed(SET.salonLidoCream, METH.amps),
      ),
      flag(
        'Polysorbate',
        'moderate',
        dailymed(SET.salonLidoCream, METH.psUnspec),
      ),
      flag(
        'SD alcohol 40-B',
        'limited',
        dailymed(SET.salonLidoCream, METH.alcoholVehicle),
      ),
      flag('Squalane', 'cleared', dailymed(SET.salonLidoCream, METH.squalane)),
      flag(
        'Steareth',
        'cleared',
        dailymed(SET.salonLidoCream, METH.stearethUnspec),
      ),
      cleared(SET.salonLidoCream, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Lidocaine Plus Pain Relieving Cream = Caution. Unspecified polysorbate is Moderate (P80 / P20 / P60 family alias — not a new class). SD alcohol 40-B is Limited (vehicle). Ceteth phosphate is the locked exact Caution INCI (not ceteth-20 phosphate). Unspecified steareth is the locked exact Caution token (not steareth-2 / steareth-21). Dicetyl phosphate / AMP / AMPS copolymer are standalone Caution. Butylene glycol + squalane are locked exact Cleared INCI. No High. Own formulaId — do not clone salonpas-lidocaine-plus-liquid (that SPL has no ceteth / steareth / polysorbate / squalane stack). Benzyl alcohol 10% is an active on this SPL (parked — not the oral gasping-syndrome split). Pack sizes (NDC 55328-902) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonLidoCream} (NDC 55328-902) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  mentholMsPatchRow({
    id: ID.salonArth,
    productName: 'Salonpas Arthritis Pain Patch',
    formulaId: ID.salonArth,
    setid: SET.salonArth,
    ndc: '46581-680',
    sisName: 'Styrene-isoprene-sryrene block copolymer',
    twinNote: `DailyMed OI + actives (menthol 3% + methyl salicylate 10%) match Salonpas Pain Relief Patch (setid ${SET.salonRelief}) and both LARGE packs — shared formulaId ${ID.salonArth}, four Search rows. Distinct from Salonpas Pain Relieving Patch already on main (that SPL adds camphor 3.1% / menthol 6.0% / perfume / terpene resin / titanium dioxide).`,
  }),
  mentholMsPatchRow({
    id: ID.salonRelief,
    productName: 'Salonpas Pain Relief Patch',
    formulaId: ID.salonArth,
    setid: SET.salonRelief,
    ndc: '46581-670',
    sisName: 'Styrene-isoprene-styrene block copolymer',
    twinNote: `OI + actives match Salonpas Arthritis Pain Patch (setid ${SET.salonArth}) — one formulaId, four Search rows. SPL spells SIS correctly (Arthritis SPL has “sryrene”). Distinct from batch-47 Pain Relieving Patch (camphor + TiO2).`,
  }),
  mentholMsPatchRow({
    id: ID.salonArthLarge,
    productName: 'Salonpas Arthritis Pain Patch LARGE',
    formulaId: ID.salonArth,
    setid: SET.salonArthLarge,
    ndc: '46581-685',
    sisName: 'Styrene-isoprene-sryrene block copolymer',
    twinNote: `LARGE pack of the same menthol 3% / methyl salicylate 10% formula — shared formulaId ${ID.salonArth} with the regular Arthritis / Pain Relief patches. OI matches.`,
  }),
  mentholMsPatchRow({
    id: ID.salonReliefLarge,
    productName: 'Salonpas Pain Relief Patch LARGE',
    formulaId: ID.salonArth,
    setid: SET.salonReliefLarge,
    ndc: '46581-675',
    sisName: 'Styrene-isoprene-styrene block copolymer',
    twinNote: `LARGE pack of the same menthol 3% / methyl salicylate 10% formula — shared formulaId ${ID.salonArth} with the regular Arthritis / Pain Relief patches. OI matches.`,
  }),
  row({
    id: ID.salonGelHot,
    productName: 'Salonpas Pain Relieving Gel-Patch HOT',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: ID.salonGelHot,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Capsicum extract (as capsaicin)', strength: '0.025%' },
      { name: 'Menthol', strength: '1.25%' },
    ],
    inactiveIngredients: [
      flag(
        'Edetate disodium',
        'cleared',
        dailymed(SET.salonGelHot, METH.edta),
      ),
      flag('Gelatin', 'cleared', dailymed(SET.salonGelHot, METH.gelatin)),
      cleared(SET.salonGelHot, 'Glycerin'),
      flag(
        'Magnesium aluminometasilicate',
        'cleared',
        dailymed(SET.salonGelHot, METH.magAlumino),
      ),
      flag(
        'Methylacrylate/2-ethylhexyl acrylate copolymer',
        'cleared',
        dailymed(SET.salonGelHot, METH.acrylate),
      ),
      flag('Nonoxynol', 'cleared', dailymed(SET.salonGelHot, METH.nonoxynol)),
      flag('Oleyl alcohol', 'cleared', dailymed(SET.salonGelHot, METH.oleyl)),
      flag(
        'Polyacrylic acid',
        'cleared',
        dailymed(SET.salonGelHot, METH.polyacrylate),
      ),
      flag(
        'Polyvinyl alcohol',
        'cleared',
        dailymed(SET.salonGelHot, METH.pva),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.salonGelHot, METH.pgTopical),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.salonGelHot, METH.polyacrylate),
      ),
      flag(
        'Sorbitan monooleate',
        'cleared',
        dailymed(SET.salonGelHot, METH.sorbitanOleate),
      ),
      flag(
        'Tartaric acid',
        'cleared',
        dailymed(SET.salonGelHot, METH.tartaric),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed(SET.salonGelHot, METH.tio2),
      ),
      cleared(SET.salonGelHot, 'Purified water'),
      flag(
        'Methyparaben',
        'high',
        dailymed(SET.salonGelHot, METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed(SET.salonGelHot, METH.parabens),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Pain Relieving Gel-Patch HOT = Avoid. Drivers are methyparaben (label spelling of methylparaben) + propylparaben + titanium dioxide (High). Magnesium aluminometasilicate is the locked exact Caution INCI (not silodrate). Bare nonoxynol is the locked exact Caution token (not nonoxynol-30). Oleyl alcohol is the locked exact Cleared INCI. Methylacrylate/2-ethylhexyl acrylate copolymer sits on the locked acrylate-copolymer family row (2-ethylhexyl acrylate in the copolymer name is not ethylhexyl acetate). Own formulaId — not merged into the lidocaine gel-patch (different actives + OI). Pack sizes (NDC 46581-871) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonGelHot} (NDC 46581-871) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonCapsicum,
    productName: 'Salonpas-HOT Capsicum Patch',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    formulaId: ID.salonCapsicum,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Capsicum extract (as capsaicin)', strength: '0.025%' },
    ],
    inactiveIngredients: [
      flag(
        'Butylated hydroxytoluene',
        'high',
        dailymed(SET.salonCapsicum, METH.bht),
      ),
      flag(
        'Hydrogenated rosin glycerol ester',
        'cleared',
        dailymed(SET.salonCapsicum, METH.patchAdhesive),
      ),
      flag(
        'Maleated rosin glycerin ester',
        'cleared',
        dailymed(SET.salonCapsicum, METH.patchAdhesive),
      ),
      flag(
        'Natural rubber latex',
        'cleared',
        dailymed(SET.salonCapsicum, METH.latex),
      ),
      flag(
        'Polybutene',
        'cleared',
        dailymed(SET.salonCapsicum, METH.polybutene),
      ),
      flag(
        'Polyisobutylene',
        'cleared',
        dailymed(SET.salonCapsicum, METH.patchAdhesive),
      ),
      flag('Silicon dioxide', 'cleared', dailymed(SET.salonCapsicum, METH.sio2)),
      flag(
        'Titanium dioxide',
        'high',
        dailymed(SET.salonCapsicum, METH.tio2),
      ),
      flag('Zinc oxide', 'cleared', dailymed(SET.salonCapsicum, METH.zno)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas-HOT Capsicum Patch = Avoid. Drivers are butylated hydroxytoluene (BHT High) + titanium dioxide (High). Polybutene is the locked exact Caution INCI (not polyisobutylene). Rosin esters / polyisobutylene sit on the locked patch-adhesive Caution row. Natural rubber latex is standalone Caution. Zinc oxide is the locked exact Cleared inactive/topical token (not parked zinc-as-active). Silicon dioxide is the 0-pt Caution cap. Own formulaId — not merged into Gel-Patch HOT (that SPL adds menthol 1.25% + parabens + hydrogel stack). Pack sizes (NDC 46581-700) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonCapsicum} (NDC 46581-700) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbHydroLarge,
    productName: 'Tiger Balm Pain Relieving Hydrogel Patch Large',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    barcode: '039278323009',
    formulaId: ID.tbHydroLarge,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '230 mg/patch' },
      { name: 'Levomenthol (L-menthol)', strength: '70 mg/patch' },
      { name: 'Capsicum extract', strength: '46 mg/patch' },
    ],
    inactiveIngredients: [
      flag(
        'Carboxymethylcellulose sodium',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.cellulose),
      ),
      flag(
        'Eucalyptus oil',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.eucalyptus),
      ),
      cleared(SET.tbHydroLarge, 'Glycerin'),
      flag('Mentha Oil', 'cleared', dailymed(SET.tbHydroLarge, METH.menthaOil)),
      flag(
        'Methyl Acrylate and 2-Ethylhexyl Acrylate Copolymer',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.methylAcrylate),
      ),
      cleared(SET.tbHydroLarge, 'Purified water'),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed(SET.tbHydroLarge, METH.ps80),
      ),
      flag('PVA Solution', 'cleared', dailymed(SET.tbHydroLarge, METH.pva)),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.sio2),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.polyacrylate),
      ),
      flag(
        'Sodium Polyacrylate Starch',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.acrylate),
      ),
      flag(
        'Sorbitan monooleate',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.sorbitanOleate),
      ),
      flag(
        'Sorbitol solution',
        'limited',
        dailymed(SET.tbHydroLarge, METH.sorbitol),
      ),
      flag(
        'Tartaric acid',
        'cleared',
        dailymed(SET.tbHydroLarge, METH.tartaric),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Pain Relieving Hydrogel Patch Large = Caution. Mentha Oil is the locked exact generic-mint-EO Caution token (not Mentha arvensis leaf oil). Polysorbate 80 is Moderate; sorbitol is Limited; eucalyptus / sorbitan monooleate / methyl-acrylate copolymer / sodium polyacrylate are standalone Caution; silicon dioxide is the 0-pt Caution cap. PVA Solution sits on the locked PVA topical-film Cleared row. Sodium Polyacrylate Starch sits on the locked acrylate-copolymer family row (same posture as starch/acrylic acid graft on batch 47). No High. Own formulaId — do not clone tiger-balm-pain-relieving-patch / tiger-balm-hydrogel-patch (those SPLs have no Mentha Oil / methyl-acrylate / PVA / starch graft; actives are 110 / 33 / 22 mg). Pack sizes (NDC 66761-324) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbHydroLarge} (NDC 66761-324) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbCool,
    productName: 'Tiger Balm Pain Relieving Cool Patch',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbCool,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '80 mg/patch' },
      { name: 'Menthol', strength: '24 mg/patch' },
    ],
    inactiveIngredients: [
      flag(
        'Carboxymethylcellulose sodium',
        'cleared',
        dailymed(SET.tbCool, METH.cellulose),
      ),
      flag(
        'Dihydroxyaluminum aminoacetate',
        'cleared',
        dailymed(SET.tbCool, METH.dihydroxyAl),
      ),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.tbCool, METH.eucalyptus)),
      cleared(SET.tbCool, 'Glycerin'),
      flag('Heavy kaolin', 'cleared', dailymed(SET.tbCool, METH.kaolin)),
      flag('Mentha Oil', 'cleared', dailymed(SET.tbCool, METH.menthaOil)),
      flag(
        'Polyacrylic acid',
        'cleared',
        dailymed(SET.tbCool, METH.polyacrylate),
      ),
      flag('Polysorbate 80', 'moderate', dailymed(SET.tbCool, METH.ps80)),
      cleared(SET.tbCool, 'Purified water'),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.tbCool, METH.pgTopical),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.tbCool, METH.polyacrylate),
      ),
      flag('Sorbitol solution', 'limited', dailymed(SET.tbCool, METH.sorbitol)),
      flag(
        'Synthetic hydrotalcite',
        'cleared',
        dailymed(SET.tbCool, METH.hydrotalcite),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Pain Relieving Cool Patch = Caution. Mentha Oil is the locked exact generic-mint-EO Caution token (not Mentha arvensis leaf oil). Polysorbate 80 is Moderate; sorbitol is Limited; dihydroxyaluminum aminoacetate / eucalyptus / polyacrylic acid / sodium polyacrylate / synthetic hydrotalcite are standalone Caution. Heavy kaolin sits on the locked kaolin Cleared row (Drug Facts missing comma after glycerin). No High. No capsicum on this SPL — own formulaId, not merged into the regular / wider hydrogel (those add capsicum + aluminium glycinate). Pack sizes (NDC 66761-325) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbCool} (NDC 66761-325) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbRegHydro,
    productName: 'Tiger Balm Pain Relieving Patch (regular hydrogel)',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbRegHydro,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '80 mg/patch' },
      { name: 'Menthol', strength: '24 mg/patch' },
      { name: 'Capsicum extract', strength: '16 mg/patch' },
    ],
    inactiveIngredients: regularWiderHydrogelInactives(SET.tbRegHydro),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Pain Relieving Patch (regular hydrogel) = Caution. Mentha oil is the locked exact generic-mint-EO Caution token (not Mentha arvensis leaf oil). Polysorbate 80 is Moderate; sorbitol is Limited; aluminium glycinate / eucalyptus / hydrotalcite / polyacrylic acid / sodium polyacrylate are standalone Caution. No High. DailyMed OI matches Tiger Balm Pain Relieving Patch (wider hydrogel) (setid ${SET.tbWider}) — wider is the same formula at 2× mg/patch (160 / 48 / 32) — shared formulaId ${ID.tbRegHydro}, two Search rows. Do not clone tiger-balm-pain-relieving-patch (batch 46; Mentha oil gone from that SPL; actives 110 / 33 / 22 mg). Pack sizes (NDC 66761-322) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbRegHydro} (NDC 66761-322); wider hydrogel twin ${SET.tbWider} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbArthritis,
    productName: 'Tiger Balm Arthritis Rub',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    barcode: '039278422047',
    formulaId: ID.tbArthritis,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '11%' },
    ],
    inactiveIngredients: [
      flag('Cajuput oil', 'cleared', dailymed(SET.tbArthritis, METH.cajuput)),
      flag(
        'Chondroitin sulfate',
        'cleared',
        dailymed(SET.tbArthritis, METH.chondroitin),
      ),
      flag(
        'Cinnamon oil',
        'cleared',
        dailymed(SET.tbArthritis, METH.cinnamon),
      ),
      flag('Clove oil', 'cleared', dailymed(SET.tbArthritis, METH.clove)),
      cleared(SET.tbArthritis, 'Purified water'),
      flag(
        'Dementholised mint oil',
        'cleared',
        dailymed(SET.tbArthritis, METH.dementhol),
      ),
      flag(
        'Diazolidinyl urea',
        'cleared',
        dailymed(SET.tbArthritis, METH.dmdm),
      ),
      flag(
        'Glucosamine sulfate',
        'cleared',
        dailymed(SET.tbArthritis, METH.glucosamine),
      ),
      flag(
        'Methyl paraben',
        'high',
        dailymed(SET.tbArthritis, METH.parabens),
      ),
      flag(
        'Methylsulfonylmethane (MSM)',
        'cleared',
        dailymed(SET.tbArthritis, METH.msm),
      ),
      flag(
        'PEG-120 Methyl Glucose Dioleate',
        'cleared',
        dailymed(SET.tbArthritis, METH.peg120),
      ),
      flag(
        'Propyl paraben',
        'high',
        dailymed(SET.tbArthritis, METH.parabens),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.tbArthritis, METH.pgTopical),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Arthritis Rub = Avoid. Drivers are methyl paraben + propyl paraben (High in every form, including rubs). PEG-120 Methyl Glucose Dioleate is the locked exact Caution INCI (not Cleared plain methyl glucose dioleate; not the PEG Moderate family row used on batch-46 vanishing scent). Cajuput / cinnamon / clove / dementholised mint are fragrance/EO standalone Caution. Diazolidinyl urea is standalone Caution (formaldehyde-donor). Chondroitin sulfate / glucosamine sulfate / MSM are locked exact Cleared inactive tokens. Own formulaId — do not clone tiger-balm-neck-shoulder-rub or vanishing scent (those SPLs have no cinnamon / chondroitin / glucosamine / MSM stack). Pack sizes (NDC 66761-422) share this formulaId. Ages 12+ (children over 12). ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbArthritis} (NDC 66761-422) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbWider,
    productName: 'Tiger Balm Pain Relieving Patch (wider hydrogel)',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbRegHydro,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '160 mg/patch' },
      { name: 'Levomenthol (L-menthol)', strength: '48 mg/patch' },
      { name: 'Capsicum extract', strength: '32 mg/patch' },
    ],
    inactiveIngredients: regularWiderHydrogelInactives(SET.tbWider),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Pain Relieving Patch (wider hydrogel) = Caution. OI matches Tiger Balm Pain Relieving Patch (regular hydrogel) (setid ${SET.tbRegHydro}) — one formulaId, two Search rows. Wider is the same formula at 2× mg/patch (160 / 48 / 32 vs 80 / 24 / 16). Mentha oil is the locked exact generic-mint-EO Caution token. Pack sizes (NDC 66761-354) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbWider} (NDC 66761-354); regular hydrogel twin ${SET.tbRegHydro} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

export const BATCH48_PAIN_RUB_REFUSED = [] as const;

const SALON_ARTH = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.salonArth,
);
const SALON_RELIEF = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.salonRelief,
);
const SALON_ARTH_L = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.salonArthLarge,
);
const SALON_RELIEF_L = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.salonReliefLarge,
);
const TB_REG = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.tbRegHydro,
);
const TB_WIDER = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.tbWider,
);
const TB_HYDRO_L = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.tbHydroLarge,
);
const LIDO_CREAM = BATCH48_SALONPAS_TIGER_BALM_WRITE.find(
  (r) => r.id === ID.salonLidoCream,
);

if (BATCH48_SALONPAS_TIGER_BALM_WRITE.length !== 12) {
  throw new Error('batch 48 must write exactly 12 newly-unlocked Search rows');
}
if (BATCH48_SALONPAS_TIGER_BALM_WRITE.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 48 Clean tally is 0');
}
if (BATCH48_SALONPAS_TIGER_BALM_WRITE.filter((r) => r.verdict === 'caution').length !== 9) {
  throw new Error('batch 48 Caution tally is 9');
}
if (BATCH48_SALONPAS_TIGER_BALM_WRITE.filter((r) => r.verdict === 'avoid').length !== 3) {
  throw new Error('batch 48 Avoid tally is 3');
}
if (BATCH48_SALONPAS_TIGER_BALM_WRITE.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 48 stays on Pain & Fever');
}
const BATCH48_CATCHUP_BARCODES: Record<string, string> = {
  [ID.tbHydroLarge]: '039278323009',
  [ID.tbArthritis]: '039278422047',
};
for (const record of BATCH48_SALONPAS_TIGER_BALM_WRITE) {
  const expected = BATCH48_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 48 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 48 must not invent barcodes on ${record.id}`);
  }
}
if (BATCH48_SALONPAS_TIGER_BALM_WRITE.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 48 recordStatus must stay unverified');
}
if (
  SALON_ARTH?.formulaId !== ID.salonArth ||
  SALON_RELIEF?.formulaId !== ID.salonArth ||
  SALON_ARTH_L?.formulaId !== ID.salonArth ||
  SALON_RELIEF_L?.formulaId !== ID.salonArth
) {
  throw new Error('four menthol 3% / methyl salicylate 10% Salonpas patches must share formulaId');
}
if (TB_REG?.formulaId !== TB_WIDER?.formulaId) {
  throw new Error('regular and wider hydrogel patches must share formulaId');
}
if (TB_HYDRO_L?.formulaId === 'tiger-balm-hydrogel-patch') {
  throw new Error('Hydrogel Large must not clone the batch 46 hydrogel formulaId');
}
if (TB_REG?.formulaId === 'tiger-balm-pain-relieving-patch') {
  throw new Error('regular hydrogel must not clone the batch 46 patch formulaId');
}
if (LIDO_CREAM?.formulaId === 'salonpas-lidocaine-plus-liquid') {
  throw new Error('Lidocaine Plus cream must not clone the batch 45 liquid formulaId');
}
if (SALON_ARTH?.minAge !== 18) {
  throw new Error('NSAID menthol/methyl-salicylate patches are labeled 18+');
}
if (BATCH48_PAIN_RUB_REFUSED.length !== 0) {
  throw new Error('batch 48 refused list must stay empty — all 12 PR #95 SKUs are covered');
}

// Verdict tally (12 records): Clean 0 · Caution 9 · Avoid 3
// Reuse: batches 41 / 42 / 44 / 45 / 46 / 47 untouched
// Refused still-missing exact §5: none
