// DRAFT / not verified / batch 47 PR #93/#94 refused-unlock WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears as”
// / locked exact-INCI rows only. No invented grades. No cousin-match.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack sizes
// of the same name+form+inactives share formulaId. Same OI+actives
// share formulaId. Form is labeled on cleanAlternatives, not a hard
// filter (§6). Not wired into Clean Picks UI. No live Clean Picks
// file is edited. No photos. Letter tiles only on new ids. No fake
// Clean alts. No methodology rewrite.
//
// GATE: write a PR #93 / still-refused-after-#94 SKU only when every
// current DailyMed OI token matches an exact §5 Additive column /
// “also appears as” / locked exact-INCI line. Cousin-matching is
// NOT enough. steareth ≠ steareth-2/21; polysorbate ≠ P20/P60/P80;
// ceteth phosphate ≠ ceteth-20 phosphate; mentha oil ≠ Mentha
// arvensis leaf oil; magnesium aluminometasilicate ≠ silodrate;
// polybutene ≠ polyisobutylene; PEG-120 methyl glucose dioleate
// is not an exact §5 row (do not use the PEG family or the Cleared
// plain methyl glucose dioleate row); cocoa butter ≠ cocoa seed
// butter.
//
// TALLY (unverified drafts in THIS file): 25 rows — Clean 0 /
// Caution 6 / Avoid 19.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batch 41: Precise creams/patch + AleveX
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel
// Batch 44 list-2 (13 rows)
// Batch 45 remaining (18 rows, including tiger-balm-neck-shoulder-rub)
// Batch 46: Tiger Balm Pain Relieving Patch + Hydrogel Patch +
//   Neck & Shoulder vanishing scent Avoid
//
// REFUSED (still missing an exact §5 row — do not invent): see
// BATCH47_PAIN_RUB_REFUSED at the bottom of this file.

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
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / capsicum / benzyl alcohol / trolamine salicylate actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const MINERAL_OIL_TAP =
  'Paraffin + petrolatum / mineral oil as a topical occlusive is Cleared (petrolatum neighborhood). Tap: not an oral oil.';

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglyceride and does not name coconut. We mark that Limited because the source isn’t clear. This cream fill is not the gummy seed-oil High rule.';

const METH = {
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / alcohol denat. / SD alcohol / methylated spirit / dehydrated alcohol as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  peppermint:
    'Methodology §5 Limited-risk (peppermint oil / orange essential oil as flavor — flavor/EO line). Peppermint oil is the locked flavor/EO Limited row. Not gummy High. Not Avoid.',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid)',
  tea:
    'Methodology §5 Caution (TEA / trolamine / triethanolamine as inactive — not the salicylate active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  amp:
    'Methodology §5 Caution (aminomethyl propanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  steareth:
    'Methodology §5 Caution (steareth-2 / steareth-21 — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ethylhexyl:
    'Methodology §5 Caution (ethylhexylglycerin — standalone Caution, not Avoid; locked Sept 15, 2026)',
  hydroxyaceto:
    'Methodology §5 Caution (hydroxyacetophenone — standalone Caution, not Avoid; locked Sept 15, 2026)',
  acrylate:
    'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — standalone Caution, not Avoid; locked Sept 15, 2026)',
  amps:
    'Methodology §5 Caution (hydroxyethyl acrylate / sodium acryloyldimethyltaurate copolymer — AMPS family; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ceteth20:
    'Methodology §5 Caution (ceteth-20 phosphate — standalone Caution, not Avoid; locked Sept 15, 2026). Not bare ceteth phosphate.',
  dicetyl:
    'Methodology §5 Caution (dicetyl phosphate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  capsaicinInactive:
    'Methodology §5 Caution (capsaicin when listed as inactive — exact token; standalone Caution, not Avoid; locked Sept 15, 2026)',
  c30:
    'Methodology §5 Caution (C30-45 alkyl dimethicone / C30-45 crosspolymer — standalone Caution, not Avoid; locked Sept 15, 2026)',
  caprylylMethicone:
    'Methodology §5 Caution (caprylyl methicone — standalone Caution, not Avoid; locked Sept 15, 2026)',
  isohexadecane:
    'Methodology §5 Caution (isohexadecane, topical — standalone Caution, not Avoid; locked Sept 15, 2026)',
  nonoxynol30:
    'Methodology §5 Caution (nonoxynol-30 — standalone Caution, not Avoid; locked Sept 15, 2026). Not unspecified nonoxynol.',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid, topical gel polymer — standalone Caution, not Avoid; locked Sept 15, 2026)',
  alGlycinate:
    'Methodology §5 Caution (aluminum glycinate — standalone Caution, not Avoid; locked Sept 15, 2026)',
  alHydroxide:
    'Methodology §5 Caution (aluminum hydroxide, topical / patch — exact inactive token; not the oral antacid active-safety cap; standalone Caution, not Avoid; locked Sept 15, 2026)',
  alSilicate:
    'Methodology §5 Caution (aluminum silicate / synthetic aluminum silicate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dihydroxyAl:
    'Methodology §5 Caution (dihydroxyaluminum aminoacetate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  patchAdhesive:
    'Methodology §5 Caution (rosin esters / terpene resin / SIS / polyisobutylene patch adhesives — standalone Caution, not Avoid; locked Sept 15, 2026)',
  topicalTalc:
    'Methodology §5 Caution (topical talc in a cream/patch — not the oral-talc High swallow rule; tap form; standalone Caution, not Avoid; locked Sept 15, 2026)',
  syntheticBeeswax:
    'Methodology §5 Caution (synthetic beeswax — distinct from Cleared beeswax; standalone Caution, not Avoid; locked Sept 15, 2026)',
  grapefruit:
    'Methodology §5 Caution (grapefruit oil — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  spearmint:
    'Methodology §5 Caution (spearmint oil — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as a gel / liniment / ointment / patch inactive — fragrance/EO line; standalone Caution, not Avoid)',
  lavender:
    'Methodology §5 Caution (lavender oil / spike lavender oil, topical — fragrance-style; standalone Caution, not Avoid; locked Sept 15, 2026)',
  farnesol:
    'Methodology §5 Caution (farnesol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  butylcyclo:
    'Methodology §5 Caution (4-t-butylcyclohexanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  menthylLactate:
    'Methodology §5 Caution (menthyl lactate — standalone Caution, not Avoid; locked Sept 15, 2026)',
  degee:
    'Methodology §5 Caution (DEGEE / ethoxydiglycol — standalone Caution, not Avoid; not Cleared; locked Sept 15, 2026)',
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  ferric:
    'Methodology §5 Caution (ferric ferrocyanide — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026). Not an FD&C/D&C High dye row.',
  sorbitanEsters:
    'Methodology §5 Caution (sorbitan, plain / sorbitan esters as emulsifier — polysorbate neighborhood; standalone Caution, not Avoid; not the sorbitol Limited row; locked Sept 15, 2026)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  ps60: 'Methodology §5 Moderate-risk (polysorbate 60 — same Moderate family as P80 / P20)',
  pegStearate:
    'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate, pegoxol-7 stearate, lauroyl macrogolglycerides; ethylene-oxide / 1,4-dioxane). PEG-150 stearate sits on the PEG-stearate also-appears-as line. Not PEG-120 methyl glucose dioleate (that token has no exact §5 row).',
  cocoaSeed:
    'Methodology §5 Cleared (cocoa seed butter — exact INCI; locked Sept 15, 2026). Not cocoa butter. Label INCI is Theobroma cacao (cocoa) seed butter.',
  glycerylDilaurate:
    'Methodology §5 Cleared (glyceryl dilaurate — exact INCI; locked Sept 15, 2026)',
  soybeanSterols:
    'Methodology §5 Cleared (soybean sterols — exact INCI; locked Sept 15, 2026)',
  c1519: 'Methodology §5 Cleared (C15-19 alkane — exact INCI; locked Sept 15, 2026)',
  kPhos: 'Methodology §5 Cleared (potassium phosphate — exact INCI; locked Sept 15, 2026)',
  panthenol: 'Methodology §5 Cleared (panthenol — exact INCI; locked Sept 15, 2026)',
  map: 'Methodology §5 Cleared (magnesium ascorbyl phosphate — exact INCI; locked Sept 15, 2026)',
  triethyl: 'Methodology §5 Cleared (triethyl citrate — exact INCI; locked Sept 15, 2026)',
  tocopherol:
    'Methodology §5 Cleared (mixed tocopherols / tocopheryl acetate as antioxidants — locked v1.6)',
  creamOil: `Methodology §5 Cleared (cream / topical vegetable-oil fill — not the gummy seed-oil High rule). ${CREAM_OIL_LINE}`,
  almond: `Methodology §5 Cleared (shea butter / coconut oil / sweet almond oil in cream or topical — locked Sept 15, 2026). ${CREAM_OIL_LINE}`,
  coconut: `Methodology §5 Cleared (shea butter / coconut oil / sweet almond oil in cream or topical — locked Sept 15, 2026). ${CREAM_OIL_LINE}`,
  avocado: `Methodology §5 Cleared (avocado oil as cream fill — locked Sept 15, 2026). ${CREAM_OIL_LINE}`,
  sunflowerWax:
    'Methodology §5 Cleared (sunflower seed wax — wax ≠ oil; carnauba family; locked Sept 15, 2026)',
  carnauba: 'Methodology §5 Cleared (carnauba wax)',
  mineralOil: `Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP}`,
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer / carbomer copolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate / glyceryl monostearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  dimethicone:
    'Methodology §5 Cleared (dimethicone / dimethicone copolyol — locked Sept 14, 2026)',
  ipm: 'Methodology §5 Cleared (glycol stearate, isopropyl myristate, stearyl heptanoate — topical emollients; locked Sept 15, 2026)',
  jojobaEsters:
    'Methodology §5 Cleared (jojoba esters — wax / emollient; distinct from jojoba OIL Caution scent; locked Sept 15, 2026)',
  diisopropyl:
    'Methodology §5 Cleared (diisopropyl adipate — topical emollient ester; locked Sept 15, 2026)',
  pentylene:
    'Methodology §5 Cleared (pentylene glycol / propanediol — humectant / solvent; locked Sept 15, 2026)',
  allantoin: 'Methodology §5 Cleared (allantoin — topical soother; locked Sept 15, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
  koh: 'Methodology §5 Cleared (potassium hydroxide — pH adjuster, trace; locked Sept 15, 2026)',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant)',
  urea: 'Methodology §5 Cleared (urea, topical — topical humectant; locked Sept 15, 2026)',
  edta: 'Methodology §5 Cleared (disodium EDTA, TRACE preservative/stabilizer use — locked v1.6)',
  oleic: 'Methodology §5 Cleared (oleic acid — fatty-acid / stearate cousin; locked Sept 15, 2026)',
  pva: 'Methodology §5 Cleared (PVA / polyvinyl alcohol, topical film; locked Sept 15, 2026)',
  cellulose:
    'Methodology §5 Cleared (cellulose gum / carboxymethylcellulose sodium — MCC / cellulose-family filler)',
  tartaric: 'Methodology §5 Cleared (tartaric acid — organic acid with citric; locked Sept 15, 2026)',
  citric: 'Methodology §5 Cleared (citric acid as filler/buffer)',
  xanthan: 'Methodology §5 Cleared (xanthan gum / guar gum / gum arabic / pectin / gellan gum)',
  gelatin: 'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
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
  icyBalm: '09e2b0cb-5186-4f9c-b256-edaced4ca014',
  icyLidoLarge: '267c0070-f65e-4faf-b10e-9f7f2393b9e2',
  icyProPatch: '27099a18-5b1c-45dd-93ba-e8d0457ea63c',
  icyLidoRoll: '347f9a18-8ab6-47d3-9610-5b4e9ca5d53a',
  icyOrigRoll: '4ce2b823-7ef5-4cca-a2d8-2fe781bc958e',
  icyMax: '75b28b06-77ea-4fea-b516-2e8a0dac7037',
  icyOrigPatch: '941de921-c1f5-4293-973e-d3b786c78511',
  icyMicro: 'df5fd485-f583-46b7-a869-16ca2e17185c',
  asperEuc: '03e247b4-a2e2-4354-a018-880f1bc987fd',
  asperFoot2: '2c33d15e-5032-46d9-bd98-5abc7df3bbe5',
  asperLav: '3948a3d2-ce04-4703-8709-211e75c9c38d',
  asperLidoPatch: '7ad8efa9-7031-4cd0-be1d-6dee63091fd1',
  asperAppl: '8092cde7-28d0-4755-b5c0-5765934e572f',
  asperOrig: '97dd587b-ecc3-4b4b-a116-6355d3c6ea6d',
  asperRosLiq: '9c81d5eb-fa9b-47fb-8924-6ebf6a5c6bab',
  asperRosCream: '9d40bfea-85d0-4943-83e9-0c16e79a011c',
  asperXl: 'b0859b10-539e-4905-ab52-af78b778d6a4',
  asperOdor: 'd5da67c3-c2ec-4e3e-abe9-cc862dcfc8bd',
  asperFoot: 'da82cc0e-cc39-408e-87e1-c35bb6f9f51e',
  asperPro: 'ef297864-5917-4645-8ec7-f2bc49e037e8',
  salonGel: '4f3a438c-f378-4d2a-a95c-58e56cf1e797',
  salonPrpLarge: '5bb6c6a3-7dc0-463d-ab2c-9f3bd3f3eff5',
  salonGelHis: '63911880-8194-4c7d-a72f-cab94761b2d7',
  salonFlex: '9507f727-c49f-4de4-9d64-b6d977d568ab',
  salonPrp: 'acdd5622-a9a7-4cc3-877e-57efea23303f',
} as const;

const ID = {
  icyBalm: 'icy-hot-pro-massaging-balm',
  icyLidoLarge: 'icy-hot-lidocaine-large-patch',
  icyProPatch: 'icy-hot-pro-pain-relief-patch',
  icyLidoRoll: 'icy-hot-lidocaine-no-mess-roll-on',
  icyOrigRoll: 'icy-hot-original-no-mess-roll-on',
  icyMax: 'icy-hot-max-lidocaine-cream',
  icyOrigPatch: 'icy-hot-original-menthol-patch',
  icyMicro: 'icy-hot-pro-microbeads-cream',
  asperEuc: 'aspercreme-lidocaine-eucalyptus-cream',
  asperFoot2: 'aspercreme-lidocaine-foot-2in1',
  asperLav: 'aspercreme-lidocaine-no-mess-lavender',
  asperLidoPatch: 'aspercreme-lidocaine-patch',
  asperAppl: 'aspercreme-lidocaine-no-mess-applicator',
  asperOrig: 'aspercreme-original-cream',
  asperRosLiq: 'aspercreme-lidocaine-rosemary-mint',
  asperRosCream: 'aspercreme-lidocaine-rosemary-mint-cream',
  asperXl: 'aspercreme-lidocaine-xl-patch',
  asperOdor: 'aspercreme-lidocaine-odor-free',
  asperFoot: 'aspercreme-lidocaine-foot-pain-cream',
  asperPro: 'aspercreme-professional-cream',
  salonGel: 'salonpas-lidocaine-gel-patch',
  salonPrpLarge: 'salonpas-pain-relieving-patch-large',
  salonGelHis: 'salonpas-lidocaine-gel-patch-hisamitsu',
  salonFlex: 'salonpas-lidocaine-flex-patch',
  salonPrp: 'salonpas-pain-relieving-patch',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function lidoNoMessBase(setid: string, extra: IngredientFlag[] = []): IngredientFlag[] {
  return [
    flag(
      'Acrylates/C10-30 alkyl acrylate crosspolymer',
      'cleared',
      dailymed(setid, METH.acrylate),
    ),
    flag('Alcohol denat.', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Aloe barbadensis leaf juice', 'cleared', dailymed(setid, METH.aloe)),
    flag('Aminomethyl propanol', 'cleared', dailymed(setid, METH.amp)),
    flag(
      'C30-45 alkyl cetearyl dimethicone crosspolymer',
      'cleared',
      dailymed(setid, METH.c30),
    ),
    flag('Caprylyl methicone', 'cleared', dailymed(setid, METH.caprylylMethicone)),
    flag('Cetearyl alcohol', 'cleared', dailymed(setid, METH.fattyAlcohol)),
    flag('Ceteth-20 phosphate', 'cleared', dailymed(setid, METH.ceteth20)),
    flag('Dicetyl phosphate', 'cleared', dailymed(setid, METH.dicetyl)),
    flag('Dimethicone', 'cleared', dailymed(setid, METH.dimethicone)),
    flag('Disodium EDTA', 'cleared', dailymed(setid, METH.edta)),
    flag('Ethylhexylglycerin', 'cleared', dailymed(setid, METH.ethylhexyl)),
    flag('Glyceryl stearate', 'cleared', dailymed(setid, METH.glycerylStearate)),
    flag(
      'Hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer',
      'cleared',
      dailymed(setid, METH.amps),
    ),
    flag('Isohexadecane', 'cleared', dailymed(setid, METH.isohexadecane)),
    flag('Methylparaben', 'high', dailymed(setid, METH.parabens)),
    flag('Polysorbate 60', 'moderate', dailymed(setid, METH.ps60)),
    ...extra,
    flag('Steareth-2', 'cleared', dailymed(setid, METH.steareth)),
    flag('Steareth-21', 'cleared', dailymed(setid, METH.steareth)),
    cleared(setid, 'Purified water'),
  ];
}

function asperLidoPatchInactives(setid: string): IngredientFlag[] {
  return [
    flag('Aluminum glycinate', 'cleared', dailymed(setid, METH.alGlycinate)),
    flag('Aluminum hydroxide', 'cleared', dailymed(setid, METH.alHydroxide)),
    flag('Cellulose gum', 'cleared', dailymed(setid, METH.cellulose)),
    cleared(setid, 'Glycerin'),
    flag(
      'Methyl acrylate/2-ethylhexyl acrylate copolymer',
      'cleared',
      dailymed(setid, METH.acrylate),
    ),
    flag('Methylparaben', 'high', dailymed(setid, METH.parabens)),
    flag('Nonoxynol-30', 'cleared', dailymed(setid, METH.nonoxynol30)),
    flag('Polyacrylic acid', 'cleared', dailymed(setid, METH.polyacrylate)),
    flag('Polysorbate 80', 'moderate', dailymed(setid, METH.ps80)),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
    flag('Silica', 'cleared', dailymed(setid, METH.sio2)),
    flag('Sodium polyacrylate', 'cleared', dailymed(setid, METH.polyacrylate)),
    flag('Tartaric acid', 'cleared', dailymed(setid, METH.tartaric)),
    flag('Titanium dioxide', 'high', dailymed(setid, METH.tio2)),
    flag('Urea', 'cleared', dailymed(setid, METH.urea)),
    cleared(setid, 'Purified water'),
  ];
}

function salonGelPatchInactives(setid: string, tio2Name: string): IngredientFlag[] {
  return [
    flag('Aluminum silicate', 'cleared', dailymed(setid, METH.alSilicate)),
    flag(
      'Dihydroxyaluminum aminoacetate',
      'cleared',
      dailymed(setid, METH.dihydroxyAl),
    ),
    flag('Disodium edetate', 'cleared', dailymed(setid, METH.edta)),
    flag('Gelatin', 'cleared', dailymed(setid, METH.gelatin)),
    cleared(setid, 'Glycerin'),
    flag('Methylparaben', 'high', dailymed(setid, METH.parabens)),
    flag('Oleic acid', 'cleared', dailymed(setid, METH.oleic)),
    flag('Polyacrylic acid', 'cleared', dailymed(setid, METH.polyacrylate)),
    flag('Polyvinyl alcohol', 'cleared', dailymed(setid, METH.pva)),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
    flag('Propylparaben', 'high', dailymed(setid, METH.parabens)),
    flag('Sodium polyacrylate', 'cleared', dailymed(setid, METH.polyacrylate)),
    flag('Tartaric acid', 'cleared', dailymed(setid, METH.tartaric)),
    flag(tio2Name, 'high', dailymed(setid, METH.tio2)),
    cleared(setid, 'Purified water'),
  ];
}

function salonPainRelievingInactives(
  setid: string,
  silicateName: string,
): IngredientFlag[] {
  return [
    flag('Mineral oil', 'cleared', dailymed(setid, METH.mineralOil)),
    flag('Perfume', 'cleared', dailymed(setid, METH.fragrance)),
    flag('Polyisobutylene', 'cleared', dailymed(setid, METH.patchAdhesive)),
    flag(
      'Styrene-isoprene-styrene block copolymer',
      'cleared',
      dailymed(setid, METH.patchAdhesive),
    ),
    flag(silicateName, 'cleared', dailymed(setid, METH.alSilicate)),
    flag('Terpene resin', 'cleared', dailymed(setid, METH.patchAdhesive)),
    flag('Titanium dioxide', 'high', dailymed(setid, METH.tio2)),
  ];
}

export const BATCH47_PAIN_RUB_EXACT_UNLOCK: RatingRecord[] = [
  row({
    id: ID.icyBalm,
    productName: 'Icy Hot Pro Pain Massaging Balm',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167079003',
    formulaId: ID.icyBalm,
    audience: ADULT,
    minAge: 12,
    form: 'balm',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '16%' },
    ],
    inactiveIngredients: [
      flag(
        'Prunus amygdalus dulcis (sweet almond) oil',
        'cleared',
        dailymed(SET.icyBalm, METH.almond),
      ),
      flag(
        'Helianthus annuus (sunflower) seed wax',
        'cleared',
        dailymed(SET.icyBalm, METH.sunflowerWax),
      ),
      flag(
        'Theobroma cacao (cocoa) seed butter',
        'cleared',
        dailymed(SET.icyBalm, METH.cocoaSeed),
      ),
      flag(
        'Cocos nucifera (coconut) oil',
        'cleared',
        dailymed(SET.icyBalm, METH.coconut),
      ),
      flag(
        'Persea gratissima (avocado) oil',
        'cleared',
        dailymed(SET.icyBalm, METH.avocado),
      ),
      flag(
        'Hydrogenated vegetable oil',
        'cleared',
        dailymed(SET.icyBalm, METH.creamOil),
      ),
      flag(
        'Copernicia cerifera (carnauba) wax',
        'cleared',
        dailymed(SET.icyBalm, METH.carnauba),
      ),
      flag(
        'Synthetic beeswax',
        'cleared',
        dailymed(SET.icyBalm, METH.syntheticBeeswax),
      ),
      flag(
        'Citrus paradisi (grapefruit) peel oil',
        'cleared',
        dailymed(SET.icyBalm, METH.grapefruit),
      ),
      flag(
        'Eucalyptus globulus leaf oil',
        'cleared',
        dailymed(SET.icyBalm, METH.eucalyptus),
      ),
      flag(
        'Mentha piperita (peppermint) oil',
        'limited',
        dailymed(SET.icyBalm, METH.peppermint),
      ),
      flag(
        'Mentha viridis (spearmint) leaf oil',
        'cleared',
        dailymed(SET.icyBalm, METH.spearmint),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Pro Pain Massaging Balm = Caution. Drivers are synthetic beeswax + grapefruit / eucalyptus / spearmint (standalone Caution EO) and peppermint oil (Limited flavor/EO). Cocoa seed butter is the locked exact INCI (label Theobroma cacao (cocoa) seed butter — not cocoa butter). Sweet almond / coconut / avocado / hydrogenated vegetable oil are cream-fill Cleared — ${CREAM_OIL_LINE} Sunflower seed wax / carnauba Cleared. No High. Pack sizes (NDC 41167-0790) share this formulaId. Ages 12+ (under 12: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyBalm} (NDC 41167-0790) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyLidoLarge,
    productName: 'Icy Hot with Lidocaine Large Patch',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167172018',
    formulaId: ID.icyLidoLarge,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Lidocaine', strength: '4%' },
      { name: 'Menthol', strength: '1%' },
    ],
    inactiveIngredients: asperLidoPatchInactives(SET.icyLidoLarge),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot with Lidocaine Large Patch = Avoid. Drivers are methylparaben (High in every form, including patches) + titanium dioxide (High). Aluminum hydroxide is the locked topical/patch Caution token (not the oral antacid active-safety cap). Aluminum glycinate / nonoxynol-30 / polyacrylic acid / sodium polyacrylate / acrylate copolymer are standalone Caution. P80 is Moderate; silica is the 0-pt Caution cap. Same DailyMed OI as Aspercreme lidocaine patches — separate formulaId because this SPL adds menthol 1%. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyLidoLarge} (NDC 41167-1720) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyProPatch,
    productName: 'Icy Hot Pro Pain Relief Patch',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167007303',
    formulaId: ID.icyProPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '3%' },
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: [
      flag('Aluminum hydroxide', 'cleared', dailymed(SET.icyProPatch, METH.alHydroxide)),
      flag('Cellulose gum', 'cleared', dailymed(SET.icyProPatch, METH.cellulose)),
      flag('Disodium EDTA', 'cleared', dailymed(SET.icyProPatch, METH.edta)),
      cleared(SET.icyProPatch, 'Glycerin'),
      flag(
        'Methyl acrylate/2-ethylhexyl acrylate copolymer',
        'cleared',
        dailymed(SET.icyProPatch, METH.acrylate),
      ),
      flag('Nonoxynol-30', 'cleared', dailymed(SET.icyProPatch, METH.nonoxynol30)),
      flag('Polyacrylic acid', 'cleared', dailymed(SET.icyProPatch, METH.polyacrylate)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.icyProPatch, METH.ps80)),
      flag('Propylene glycol', 'cleared', dailymed(SET.icyProPatch, METH.pgTopical)),
      flag('Silica', 'cleared', dailymed(SET.icyProPatch, METH.sio2)),
      flag('Sodium polyacrylate', 'cleared', dailymed(SET.icyProPatch, METH.polyacrylate)),
      flag('Talc', 'cleared', dailymed(SET.icyProPatch, METH.topicalTalc)),
      flag('Tartaric acid', 'cleared', dailymed(SET.icyProPatch, METH.tartaric)),
      flag('Titanium dioxide', 'high', dailymed(SET.icyProPatch, METH.tio2)),
      cleared(SET.icyProPatch, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Pro Pain Relief Patch = Avoid. Driver is titanium dioxide (High). No paraben on this SPL. Aluminum hydroxide is the locked topical/patch Caution token. Topical talc is Caution (not the oral-talc High swallow rule). Acrylate copolymer / nonoxynol-30 / polyacrylic acid / sodium polyacrylate standalone Caution; P80 Moderate; silica 0-pt cap. 2-ethylhexyl acrylate in the copolymer name is not ethylhexyl acetate — the copolymer sits on the locked acrylate-copolymer family row. Own formulaId (camphor 3% + menthol 5%). Pack sizes (NDC 41167-0074) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyProPatch} (NDC 41167-0074) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyLidoRoll,
    productName: 'Icy Hot Lidocaine No-Mess Roll On',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    formulaId: ID.icyLidoRoll,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: lidoNoMessBase(SET.icyLidoRoll),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Lidocaine No-Mess Roll On = Avoid. Driver is methylparaben (High). Dicetyl phosphate + ceteth-20 phosphate are the locked exact Caution rows (not bare ceteth phosphate). Steareth-2 / steareth-21 are the numbered locks (not unspecified steareth). P60 Moderate; alcohol denat. Limited. DailyMed OI + actives (lidocaine HCl 4%) match Aspercreme Lidocaine No-Mess Applicator (setid ${SET.asperAppl}) — shared formulaId ${ID.icyLidoRoll}, two Search rows. Distinct from Max Lidocaine cream (that SPL adds menthol 1% and drops steareth-2). Pack sizes (NDC 41167-1711) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyLidoRoll}; Aspercreme applicator twin ${SET.asperAppl} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyOrigRoll,
    productName: 'Icy Hot Original No-Mess Roll On (16% menthol applicator)',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167009109',
    formulaId: ID.icyOrigRoll,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    activeIngredients: [{ name: 'Menthol', strength: '16%' }],
    inactiveIngredients: [
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.icyOrigRoll, METH.acrylate),
      ),
      flag('Alcohol denat.', 'limited', dailymed(SET.icyOrigRoll, METH.alcoholVehicle)),
      flag('Capsaicin', 'cleared', dailymed(SET.icyOrigRoll, METH.capsaicinInactive)),
      cleared(SET.icyOrigRoll, 'Glycerin'),
      flag('Isopropyl myristate', 'cleared', dailymed(SET.icyOrigRoll, METH.ipm)),
      flag('Propylene glycol', 'cleared', dailymed(SET.icyOrigRoll, METH.pgTopical)),
      flag('Triethanolamine', 'cleared', dailymed(SET.icyOrigRoll, METH.tea)),
      cleared(SET.icyOrigRoll, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Original No-Mess Roll On (16% menthol applicator) = Caution. Capsaicin is listed as an inactive — locked exact Caution token (not the parked capsaicin active). Alcohol denat. Limited; acrylates / TEA standalone Caution. IPM / glycerin / water Cleared. No High. Distinct from Nighttime / Revive 8% menthol roll-ons already on main. Pack sizes (NDC 41167-0091) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyOrigRoll} (NDC 41167-0091) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyMax,
    productName: 'Icy Hot Max Lidocaine Pain Relief Cream',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167171011',
    formulaId: ID.icyMax,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Lidocaine HCl', strength: '4%' },
      { name: 'Menthol', strength: '1%' },
    ],
    inactiveIngredients: [
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.icyMax, METH.acrylate),
      ),
      flag('Alcohol denat.', 'limited', dailymed(SET.icyMax, METH.alcoholVehicle)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.icyMax, METH.aloe)),
      flag('Aminomethyl propanol', 'cleared', dailymed(SET.icyMax, METH.amp)),
      flag(
        'C30-45 alkyl cetearyl dimethicone crosspolymer',
        'cleared',
        dailymed(SET.icyMax, METH.c30),
      ),
      flag('Caprylyl methicone', 'cleared', dailymed(SET.icyMax, METH.caprylylMethicone)),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.icyMax, METH.fattyAlcohol)),
      flag('Ceteth-20 phosphate', 'cleared', dailymed(SET.icyMax, METH.ceteth20)),
      flag('Dicetyl phosphate', 'cleared', dailymed(SET.icyMax, METH.dicetyl)),
      flag('Dimethicone', 'cleared', dailymed(SET.icyMax, METH.dimethicone)),
      flag('Disodium EDTA', 'cleared', dailymed(SET.icyMax, METH.edta)),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.icyMax, METH.ethylhexyl)),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.icyMax, METH.glycerylStearate)),
      flag(
        'Hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer',
        'cleared',
        dailymed(SET.icyMax, METH.amps),
      ),
      flag('Isohexadecane', 'cleared', dailymed(SET.icyMax, METH.isohexadecane)),
      flag('Methylparaben', 'high', dailymed(SET.icyMax, METH.parabens)),
      flag('Polysorbate 60', 'moderate', dailymed(SET.icyMax, METH.ps60)),
      flag('Steareth-21', 'cleared', dailymed(SET.icyMax, METH.steareth)),
      cleared(SET.icyMax, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Max Lidocaine Pain Relief Cream = Avoid. Driver is methylparaben (High). Dicetyl phosphate + ceteth-20 phosphate are locked exact Caution rows. No steareth-2 on this SPL (steareth-21 only) and actives add menthol 1% — own formulaId, not merged into ${ID.icyLidoRoll}. Pack sizes (NDC 41167-1710) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyMax} (NDC 41167-1710) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyOrigPatch,
    productName: 'Icy Hot Original Menthol Patch (Arm/Neck/Leg + Back/XL/Value)',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167008416 041167008430 041167008478',
    formulaId: ID.icyOrigPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Menthol', strength: '5%' }],
    inactiveIngredients: [
      flag('Aluminum hydroxide', 'cleared', dailymed(SET.icyOrigPatch, METH.alHydroxide)),
      flag('Cellulose gum', 'cleared', dailymed(SET.icyOrigPatch, METH.cellulose)),
      cleared(SET.icyOrigPatch, 'Glycerin'),
      flag('Isopropyl myristate', 'cleared', dailymed(SET.icyOrigPatch, METH.ipm)),
      flag(
        'Methyl acrylate/2-ethylhexyl acrylate copolymer',
        'cleared',
        dailymed(SET.icyOrigPatch, METH.acrylate),
      ),
      flag('Nonoxynol-30', 'cleared', dailymed(SET.icyOrigPatch, METH.nonoxynol30)),
      flag('Polyacrylic acid', 'cleared', dailymed(SET.icyOrigPatch, METH.polyacrylate)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.icyOrigPatch, METH.ps80)),
      flag('Sodium polyacrylate', 'cleared', dailymed(SET.icyOrigPatch, METH.polyacrylate)),
      flag(
        'Sorbitan sesquioleate',
        'cleared',
        dailymed(SET.icyOrigPatch, METH.sorbitanEsters),
      ),
      flag(
        'Starch/acrylic acid graft copolymer sodium salt',
        'cleared',
        dailymed(SET.icyOrigPatch, METH.acrylate),
      ),
      flag('Talc', 'cleared', dailymed(SET.icyOrigPatch, METH.topicalTalc)),
      flag('Tartaric acid', 'cleared', dailymed(SET.icyOrigPatch, METH.tartaric)),
      flag('Titanium dioxide', 'high', dailymed(SET.icyOrigPatch, METH.tio2)),
      cleared(SET.icyOrigPatch, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Original Menthol Patch (Arm/Neck/Leg + Back/XL/Value) = Avoid. Driver is titanium dioxide (High). Aluminum hydroxide is the locked topical/patch Caution token. Topical talc is Caution (not oral-talc High). Sorbitan sesquioleate sits on the locked sorbitan-esters Caution row. Starch/acrylic acid graft copolymer sits on the locked acrylate-copolymer family row (not free acrylic-acid monomer). Same setid covers Arm/Neck/Leg, Back, XL, and Value pack sizes — one formulaId. Ages 12+. ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyOrigPatch} (NDC 41167-0073 / 0083 / 0084 / 0843 / 0847) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.icyMicro,
    productName: 'Icy Hot Pro Pain Relief Cream with microbeads',
    brand: 'Icy Hot',
    category: PAIN_FEVER,
    barcode: '041167007808',
    formulaId: ID.icyMicro,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '16%' },
    ],
    inactiveIngredients: [
      cleared(SET.icyMicro, 'Purified water'),
      flag('Propanediol', 'cleared', dailymed(SET.icyMicro, METH.pentylene)),
      flag('Steareth-21', 'cleared', dailymed(SET.icyMicro, METH.steareth)),
      flag('Alcohol denat.', 'limited', dailymed(SET.icyMicro, METH.alcoholVehicle)),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.icyMicro, METH.glycerylStearate)),
      flag('Cetyl alcohol', 'cleared', dailymed(SET.icyMicro, METH.fattyAlcohol)),
      flag('Farnesol', 'cleared', dailymed(SET.icyMicro, METH.farnesol)),
      flag('Stearic acid', 'cleared', dailymed(SET.icyMicro, METH.stearic)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.icyMicro, METH.aloe)),
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.icyMicro, METH.acrylate),
      ),
      flag('Menthyl lactate', 'cleared', dailymed(SET.icyMicro, METH.menthylLactate)),
      flag('Jojoba esters', 'cleared', dailymed(SET.icyMicro, METH.jojobaEsters)),
      flag('Diisopropyl adipate', 'cleared', dailymed(SET.icyMicro, METH.diisopropyl)),
      flag('Pentylene glycol', 'cleared', dailymed(SET.icyMicro, METH.pentylene)),
      flag('4-t-butylcyclohexanol', 'cleared', dailymed(SET.icyMicro, METH.butylcyclo)),
      flag('Potassium hydroxide', 'cleared', dailymed(SET.icyMicro, METH.koh)),
      flag('Allantoin', 'cleared', dailymed(SET.icyMicro, METH.allantoin)),
      flag('Fragrance', 'cleared', dailymed(SET.icyMicro, METH.fragrance)),
      flag(
        'Citrus paradisi (grapefruit) peel oil',
        'cleared',
        dailymed(SET.icyMicro, METH.grapefruit),
      ),
      flag(
        'Mentha piperita (peppermint) oil',
        'limited',
        dailymed(SET.icyMicro, METH.peppermint),
      ),
      flag(
        'Mentha viridis (spearmint) leaf oil',
        'cleared',
        dailymed(SET.icyMicro, METH.spearmint),
      ),
      flag('Ethoxydiglycol', 'cleared', dailymed(SET.icyMicro, METH.degee)),
      flag('Glyceryl dilaurate', 'cleared', dailymed(SET.icyMicro, METH.glycerylDilaurate)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.icyMicro, METH.ps80)),
      flag('PEG-150 stearate', 'moderate', dailymed(SET.icyMicro, METH.pegStearate)),
      flag(
        'Glycine soja (soybean) sterols',
        'cleared',
        dailymed(SET.icyMicro, METH.soybeanSterols),
      ),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.icyMicro, METH.phenoxy)),
      flag('Methylparaben', 'high', dailymed(SET.icyMicro, METH.parabens)),
      cleared(SET.icyMicro, 'Glycerin'),
      flag('Disodium EDTA', 'cleared', dailymed(SET.icyMicro, METH.edta)),
      flag('Xanthan gum', 'cleared', dailymed(SET.icyMicro, METH.xanthan)),
      flag('Ferric ferrocyanide', 'cleared', dailymed(SET.icyMicro, METH.ferric)),
      flag('Citric acid', 'cleared', dailymed(SET.icyMicro, METH.citric)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Icy Hot Pro Pain Relief Cream with microbeads = Avoid. Driver is methylparaben (High). Glyceryl dilaurate + soybean sterols are locked exact Cleared INCI. Ferric ferrocyanide is the locked exact Caution INCI (not an FD&C High dye). PEG-150 stearate sits on the PEG-stearate also-appears-as line (not PEG-120 methyl glucose dioleate). P80 Moderate; alcohol denat. + peppermint Limited. Distinct from Advanced / Pro No-Mess already on main (those SPLs have no microbead / ferric / glyceryl dilaurate stack). Pack sizes (NDC 41167-0078) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'icyhot.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.icyMicro} (NDC 41167-0078) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperEuc,
    productName: 'Aspercreme Lidocaine with Eucalyptus Essential Oil cream',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167056608',
    formulaId: ID.asperEuc,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: [
      flag('Alcohol denat.', 'limited', dailymed(SET.asperEuc, METH.alcoholVehicle)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.asperEuc, METH.aloe)),
      flag('C15-19 alkane', 'cleared', dailymed(SET.asperEuc, METH.c1519)),
      flag(
        'Caprylic/capric triglyceride (unlabeled MCT)',
        'limited',
        dailymed(SET.asperEuc, METH.mctUnlabeled),
      ),
      flag('Carbomer', 'cleared', dailymed(SET.asperEuc, METH.carbomer)),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.asperEuc, METH.fattyAlcohol)),
      flag('Citric acid', 'cleared', dailymed(SET.asperEuc, METH.citric)),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.asperEuc, METH.ethylhexyl)),
      flag(
        'Eucalyptus globulus leaf oil',
        'cleared',
        dailymed(SET.asperEuc, METH.eucalyptus),
      ),
      cleared(SET.asperEuc, 'Glycerin'),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.asperEuc, METH.glycerylStearate)),
      flag('Hydroxyacetophenone', 'cleared', dailymed(SET.asperEuc, METH.hydroxyaceto)),
      flag('Potassium hydroxide', 'cleared', dailymed(SET.asperEuc, METH.koh)),
      flag('Polysorbate 60', 'moderate', dailymed(SET.asperEuc, METH.ps60)),
      flag('Propanediol', 'cleared', dailymed(SET.asperEuc, METH.pentylene)),
      flag('Steareth-2', 'cleared', dailymed(SET.asperEuc, METH.steareth)),
      flag('Steareth-21', 'cleared', dailymed(SET.asperEuc, METH.steareth)),
      cleared(SET.asperEuc, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine with Eucalyptus Essential Oil cream = Caution. C15-19 alkane is the locked exact Cleared INCI. Unlabeled MCT is Limited opacity. P60 Moderate; alcohol denat. Limited; eucalyptus / steareth-2 / steareth-21 / ethylhexylglycerin / hydroxyacetophenone standalone Caution. No High. Pack sizes (NDC 41167-0566) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperEuc} (NDC 41167-0566) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperFoot2,
    productName: 'Aspercreme Lidocaine Foot (2-in-1) cream',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167059708',
    formulaId: ID.asperFoot2,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: [
      cleared(SET.asperFoot2, 'Purified water'),
      flag('Alcohol denat.', 'limited', dailymed(SET.asperFoot2, METH.alcoholVehicle)),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.asperFoot2, METH.fattyAlcohol)),
      flag('Ceteth-20 phosphate', 'cleared', dailymed(SET.asperFoot2, METH.ceteth20)),
      flag('Dimethicone', 'cleared', dailymed(SET.asperFoot2, METH.dimethicone)),
      flag('Caprylyl methicone', 'cleared', dailymed(SET.asperFoot2, METH.caprylylMethicone)),
      flag('Dicetyl phosphate', 'cleared', dailymed(SET.asperFoot2, METH.dicetyl)),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.asperFoot2, METH.glycerylStearate)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.asperFoot2, METH.aloe)),
      flag('Panthenol', 'cleared', dailymed(SET.asperFoot2, METH.panthenol)),
      flag('Tocopheryl acetate', 'cleared', dailymed(SET.asperFoot2, METH.tocopherol)),
      flag(
        'Magnesium ascorbyl phosphate',
        'cleared',
        dailymed(SET.asperFoot2, METH.map),
      ),
      flag('Aminomethyl propanol', 'cleared', dailymed(SET.asperFoot2, METH.amp)),
      flag(
        'C30-45 alkyl cetearyl dimethicone crosspolymer',
        'cleared',
        dailymed(SET.asperFoot2, METH.c30),
      ),
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.asperFoot2, METH.acrylate),
      ),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.asperFoot2, METH.ethylhexyl)),
      flag('Methylparaben', 'high', dailymed(SET.asperFoot2, METH.parabens)),
      flag('Disodium EDTA', 'cleared', dailymed(SET.asperFoot2, METH.edta)),
      flag('Citric acid', 'cleared', dailymed(SET.asperFoot2, METH.citric)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine Foot (2-in-1) cream = Avoid. Driver is methylparaben (High). Dicetyl phosphate / panthenol / magnesium ascorbyl phosphate are locked exact rows. Distinct from Foot Pain Cream (that SPL has fragrance + triethyl citrate + hydroxyacetophenone and no paraben). Pack sizes (NDC 41167-0597) share this formulaId. Ages 12+ (12 or younger: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperFoot2} (NDC 41167-0597) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperLav,
    productName: 'Aspercreme Lidocaine No-Mess plus Lavender',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167056851',
    formulaId: ID.asperLav,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: lidoNoMessBase(SET.asperLav, [
      flag(
        'Lavandula angustifolia (lavender) oil',
        'cleared',
        dailymed(SET.asperLav, METH.lavender),
      ),
    ]),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine No-Mess plus Lavender = Avoid. Driver is methylparaben (High). Lavender oil is standalone Caution. Same no-mess base as ${ID.icyLidoRoll} plus lavender — own formulaId. Pack sizes (NDC 41167-0568) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperLav} (NDC 41167-0568) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperLidoPatch,
    productName: 'Aspercreme with Lidocaine Pain Relieving Patch',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167058404',
    formulaId: ID.asperLidoPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: asperLidoPatchInactives(SET.asperLidoPatch),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme with Lidocaine Pain Relieving Patch = Avoid. Drivers are methylparaben + titanium dioxide (High). DailyMed Drug Facts OI + actives (lidocaine 4%) match Aspercreme with Lidocaine XL Patch (setid ${SET.asperXl}) — shared formulaId ${ID.asperLidoPatch}, two Search rows. Not merged into Icy Hot with Lidocaine Large Patch (that SPL adds menthol 1%). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperLidoPatch}; XL twin ${SET.asperXl} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperAppl,
    productName: 'Aspercreme Lidocaine No-Mess Applicator / fragrance-free roll-on',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167058107',
    formulaId: ID.icyLidoRoll,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: lidoNoMessBase(SET.asperAppl),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine No-Mess Applicator / fragrance-free roll-on = Avoid. OI + actives match Icy Hot Lidocaine No-Mess Roll On (setid ${SET.icyLidoRoll}) — one formulaId, two Search rows. Driver is methylparaben (High). Pack sizes (NDC 41167-0581 / 0599) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperAppl}; Icy Hot roll-on twin ${SET.icyLidoRoll} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperOrig,
    productName: 'Aspercreme Original Pain Relief Cream (trolamine salicylate)',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167057032 041167057247 041167057230',
    formulaId: ID.asperOrig,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Trolamine salicylate', strength: '10%' }],
    inactiveIngredients: [
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.asperOrig, METH.aloe)),
      flag('Cetyl alcohol', 'cleared', dailymed(SET.asperOrig, METH.fattyAlcohol)),
      cleared(SET.asperOrig, 'Glycerin'),
      flag('Methylparaban', 'high', dailymed(SET.asperOrig, METH.parabens)),
      flag('Mineral oil', 'cleared', dailymed(SET.asperOrig, METH.mineralOil)),
      flag('Potassium phosphate', 'cleared', dailymed(SET.asperOrig, METH.kPhos)),
      flag('Propylparaban', 'high', dailymed(SET.asperOrig, METH.parabens)),
      flag('Stearic acid', 'cleared', dailymed(SET.asperOrig, METH.stearic)),
      flag('Triethanolamine', 'cleared', dailymed(SET.asperOrig, METH.tea)),
      cleared(SET.asperOrig, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Original Pain Relief Cream = Avoid. Drivers are methylparaban + propylparaban (label spellings of the High paraben family — High in every form, including rubs). Potassium phosphate is the locked exact Cleared INCI. TEA is standalone Caution (not the salicylate active). Mineral oil is topical-occlusive Cleared. Pack sizes (NDC 41167-0570) share this formulaId. Ages 12+ (12 and younger: ask a doctor). ${PARKED_ACTIVES} ${MINERAL_OIL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperOrig} (NDC 41167-0570) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperRosLiq,
    productName: 'Aspercreme Lidocaine Rosemary Mint liquid',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167059876',
    formulaId: ID.asperRosLiq,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: lidoNoMessBase(SET.asperRosLiq, [
      flag('Rosemary mint fragrance', 'cleared', dailymed(SET.asperRosLiq, METH.fragrance)),
    ]),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine Rosemary Mint liquid = Avoid. Driver is methylparaben (High). Rosemary mint fragrance is standalone Caution. DailyMed OI + actives match Aspercreme Lidocaine with Rosemary and Mint (setid ${SET.asperRosCream}) — shared formulaId ${ID.asperRosLiq}, two Search rows. Pack sizes (NDC 41167-0598) share this formulaId. Ages 12+ (12 or younger: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperRosLiq}; Rosemary and Mint twin ${SET.asperRosCream} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperRosCream,
    productName: 'Aspercreme Lidocaine with Rosemary and Mint',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    formulaId: ID.asperRosLiq,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: lidoNoMessBase(SET.asperRosCream, [
      flag(
        'Rosemary mint fragrance',
        'cleared',
        dailymed(SET.asperRosCream, METH.fragrance),
      ),
    ]),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine with Rosemary and Mint = Avoid. OI + actives match Aspercreme Lidocaine Rosemary Mint liquid (setid ${SET.asperRosLiq}) — one formulaId, two Search rows. Driver is methylparaben (High). Pack sizes (NDC 41167-0565) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperRosCream}; liquid twin ${SET.asperRosLiq} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperXl,
    productName: 'Aspercreme with Lidocaine XL Patch',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167058428',
    formulaId: ID.asperLidoPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: asperLidoPatchInactives(SET.asperXl),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme with Lidocaine XL Patch = Avoid. OI + actives match Aspercreme with Lidocaine Pain Relieving Patch (setid ${SET.asperLidoPatch}) — one formulaId, two Search rows. Current Drug Facts no longer list polygalic acid (that was a PR #94 refuse string; the token is now locked anyway). Drivers are methylparaben + titanium dioxide (High). Pack sizes (NDC 41167-0585) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperXl}; regular patch twin ${SET.asperLidoPatch} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperOdor,
    productName: 'Aspercreme with Lidocaine Odor-Free Cream',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167058848 041167058770',
    formulaId: ID.asperOdor,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: [
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.asperOdor, METH.acrylate),
      ),
      flag('Alcohol denat.', 'limited', dailymed(SET.asperOdor, METH.alcoholVehicle)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.asperOdor, METH.aloe)),
      flag('Aminomethyl propanol', 'cleared', dailymed(SET.asperOdor, METH.amp)),
      flag(
        'C30-45 alkyl cetearyl dimethicone crosspolymer',
        'cleared',
        dailymed(SET.asperOdor, METH.c30),
      ),
      flag('Caprylyl methicone', 'cleared', dailymed(SET.asperOdor, METH.caprylylMethicone)),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.asperOdor, METH.fattyAlcohol)),
      flag('Ceteth-20 phosphate', 'cleared', dailymed(SET.asperOdor, METH.ceteth20)),
      flag('Dicetyl phosphate', 'cleared', dailymed(SET.asperOdor, METH.dicetyl)),
      flag('Dimethicone', 'cleared', dailymed(SET.asperOdor, METH.dimethicone)),
      flag('Disodium EDTA', 'cleared', dailymed(SET.asperOdor, METH.edta)),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.asperOdor, METH.ethylhexyl)),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.asperOdor, METH.glycerylStearate)),
      flag('Methylparaben', 'high', dailymed(SET.asperOdor, METH.parabens)),
      flag('Steareth-21', 'cleared', dailymed(SET.asperOdor, METH.steareth)),
      cleared(SET.asperOdor, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme with Lidocaine Odor-Free Cream = Avoid. Driver is methylparaben (High). Shorter OI than the no-mess roll-on (no AMPS / isohexadecane / P60 / steareth-2) — own formulaId. Pack sizes (NDC 41167-0582 / 0587) share this formulaId. Ages 12+ (12 and younger: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperOdor} (NDC 41167-0582 / 0587) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperFoot,
    productName: 'Aspercreme Lidocaine Foot Pain Cream',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    barcode: '041167058626',
    formulaId: ID.asperFoot,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: [
      cleared(SET.asperFoot, 'Purified water'),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.asperFoot, METH.fattyAlcohol)),
      flag('Alcohol denat.', 'limited', dailymed(SET.asperFoot, METH.alcoholVehicle)),
      flag('Ceteth-20 phosphate', 'cleared', dailymed(SET.asperFoot, METH.ceteth20)),
      flag('Dimethicone', 'cleared', dailymed(SET.asperFoot, METH.dimethicone)),
      flag('Caprylyl methicone', 'cleared', dailymed(SET.asperFoot, METH.caprylylMethicone)),
      flag('Dicetyl phosphate', 'cleared', dailymed(SET.asperFoot, METH.dicetyl)),
      flag(
        'C30-45 alkyl cetearyl dimethicone crosspolymer',
        'cleared',
        dailymed(SET.asperFoot, METH.c30),
      ),
      flag('Triethyl citrate', 'cleared', dailymed(SET.asperFoot, METH.triethyl)),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.asperFoot, METH.glycerylStearate)),
      flag('Potassium hydroxide', 'cleared', dailymed(SET.asperFoot, METH.koh)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.asperFoot, METH.aloe)),
      flag('Hydroxyacetophenone', 'cleared', dailymed(SET.asperFoot, METH.hydroxyaceto)),
      flag('Fragrance', 'cleared', dailymed(SET.asperFoot, METH.fragrance)),
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.asperFoot, METH.acrylate),
      ),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.asperFoot, METH.ethylhexyl)),
      flag('Panthenol', 'cleared', dailymed(SET.asperFoot, METH.panthenol)),
      flag('Tocopheryl acetate', 'cleared', dailymed(SET.asperFoot, METH.tocopherol)),
      flag(
        'Magnesium ascorbyl phosphate',
        'cleared',
        dailymed(SET.asperFoot, METH.map),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Lidocaine Foot Pain Cream = Caution. No High. Dicetyl phosphate / triethyl citrate / panthenol / magnesium ascorbyl phosphate are locked exact rows. Fragrance / hydroxyacetophenone / ceteth-20 phosphate standalone Caution; alcohol denat. Limited. Distinct from Foot 2-in-1 (that SPL has methylparaben). Pack sizes (NDC 41167-0586) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperFoot} (NDC 41167-0586) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.asperPro,
    productName: 'Aspercreme Professional Cream',
    brand: 'Aspercreme',
    category: PAIN_FEVER,
    formulaId: ID.asperPro,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Lidocaine HCl', strength: '4%' }],
    inactiveIngredients: [
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.asperPro, METH.acrylate),
      ),
      flag('Alcohol denat.', 'limited', dailymed(SET.asperPro, METH.alcoholVehicle)),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.asperPro, METH.aloe)),
      flag(
        'C30-45 alkyl cetearyl dimethicone crosspolymer',
        'cleared',
        dailymed(SET.asperPro, METH.c30),
      ),
      flag('Caprylyl methicone', 'cleared', dailymed(SET.asperPro, METH.caprylylMethicone)),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.asperPro, METH.fattyAlcohol)),
      flag('Ceteth-20 phosphate', 'cleared', dailymed(SET.asperPro, METH.ceteth20)),
      flag('Dicetyl phosphate', 'cleared', dailymed(SET.asperPro, METH.dicetyl)),
      flag('Dimethicone', 'cleared', dailymed(SET.asperPro, METH.dimethicone)),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.asperPro, METH.ethylhexyl)),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.asperPro, METH.glycerylStearate)),
      flag('Hydroxyacetophenone', 'cleared', dailymed(SET.asperPro, METH.hydroxyaceto)),
      flag(
        'Magnesium ascorbyl phosphate',
        'cleared',
        dailymed(SET.asperPro, METH.map),
      ),
      flag('Panthenol', 'cleared', dailymed(SET.asperPro, METH.panthenol)),
      flag('Potassium hydroxide', 'cleared', dailymed(SET.asperPro, METH.koh)),
      flag('Tocopheryl acetate', 'cleared', dailymed(SET.asperPro, METH.tocopherol)),
      flag('Triethyl citrate', 'cleared', dailymed(SET.asperPro, METH.triethyl)),
      cleared(SET.asperPro, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aspercreme Professional Cream = Caution. No High. Dicetyl phosphate / panthenol / magnesium ascorbyl phosphate / triethyl citrate are locked exact rows. Ceteth-20 phosphate / hydroxyacetophenone / C30-45 / ethylhexylglycerin standalone Caution; alcohol denat. Limited. Own formulaId (no fragrance vs Foot Pain; no paraben vs Foot 2-in-1). Pack sizes (NDC 41167-0564) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aspercreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.asperPro} (NDC 41167-0564) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonGel,
    productName: 'Salonpas Lidocaine 4% Pain Relieving Gel-Patch',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    barcode: '346581830064',
    formulaId: ID.salonGel,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: salonGelPatchInactives(SET.salonGel, 'Titanium dioxide'),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Lidocaine 4% Pain Relieving Gel-Patch = Avoid. Drivers are methylparaben + propylparaben + titanium dioxide (High). Aluminum silicate + dihydroxyaluminum aminoacetate are locked exact Caution INCI. DailyMed OI + actives match the Hisamitsu America gel-patch (setid ${SET.salonGelHis}) — shared formulaId ${ID.salonGel}, two Search rows. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonGel}; Hisamitsu twin ${SET.salonGelHis} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonPrpLarge,
    productName: 'Salonpas Pain Relieving Patch LARGE',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    barcode: '346581210064',
    formulaId: ID.salonPrp,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor', strength: '3.1%' },
      { name: 'Menthol', strength: '6.0%' },
      { name: 'Methyl salicylate', strength: '10.0%' },
    ],
    inactiveIngredients: salonPainRelievingInactives(
      SET.salonPrpLarge,
      'Aluminum silicate',
    ),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Pain Relieving Patch LARGE = Avoid. Driver is titanium dioxide (High). Aluminum silicate is the locked exact Caution INCI (same row as synthetic aluminum silicate on the regular patch). Perfume is fragrance Caution. SIS / polyisobutylene / terpene resin sit on the locked patch-adhesive Caution row. DailyMed OI + actives match Salonpas Pain Relieving Patch (setid ${SET.salonPrp}) — shared formulaId ${ID.salonPrp}, two Search rows. Pack sizes (NDC 46581-210) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${MINERAL_OIL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonPrpLarge}; regular twin ${SET.salonPrp} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonGelHis,
    productName: 'Salonpas Lidocaine 4% Pain Relieving Gel-Patch (Hisamitsu America)',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    barcode: '355328100063',
    formulaId: ID.salonGel,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: salonGelPatchInactives(SET.salonGelHis, 'Titanium dioxyde'),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Lidocaine 4% Pain Relieving Gel-Patch (Hisamitsu America) = Avoid. OI + actives match the Hisamitsu gel-patch (setid ${SET.salonGel}) — one formulaId, two Search rows. SPL spells titanium dioxide as “titanium dioxyde”; same High row. Drivers are methylparaben + propylparaben + titanium dioxide (High). Pack sizes (NDC 55328-100) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonGelHis}; gel-patch twin ${SET.salonGel} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonFlex,
    productName: 'Salonpas Pain Relieving FLEX Patch Lidocaine 4%',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    barcode: '346581840070',
    formulaId: ID.salonFlex,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Aluminum silicate', 'cleared', dailymed(SET.salonFlex, METH.alSilicate)),
      flag('Mineral oil', 'cleared', dailymed(SET.salonFlex, METH.mineralOil)),
      flag('Polyisobutylene', 'cleared', dailymed(SET.salonFlex, METH.patchAdhesive)),
      flag('Propylene glycol', 'cleared', dailymed(SET.salonFlex, METH.pgTopical)),
      flag(
        'Styrene-isoprene-styrene block copolymer',
        'cleared',
        dailymed(SET.salonFlex, METH.patchAdhesive),
      ),
      flag('Terpene resin', 'cleared', dailymed(SET.salonFlex, METH.patchAdhesive)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Pain Relieving FLEX Patch Lidocaine 4% = Caution. No High (no titanium dioxide, no paraben). Aluminum silicate is the locked exact Caution INCI. SIS / polyisobutylene / terpene resin sit on the locked patch-adhesive Caution row. Own formulaId — not merged into the gel-patch (that SPL adds parabens + TiO2 + polyacrylic acid). Pack sizes (NDC 46581-840) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} ${MINERAL_OIL_TAP} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonFlex} (NDC 46581-840) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.salonPrp,
    productName: 'Salonpas Pain Relieving Patch',
    brand: 'Salonpas',
    category: PAIN_FEVER,
    barcode: '346581110609',
    formulaId: ID.salonPrp,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor', strength: '3.1%' },
      { name: 'Menthol', strength: '6.0%' },
      { name: 'Methyl salicylate', strength: '10.0%' },
    ],
    inactiveIngredients: salonPainRelievingInactives(
      SET.salonPrp,
      'Synthetic aluminum silicate',
    ),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Salonpas Pain Relieving Patch = Avoid. OI + actives match Salonpas Pain Relieving Patch LARGE (setid ${SET.salonPrpLarge}) — one formulaId, two Search rows. Driver is titanium dioxide (High). Synthetic aluminum silicate sits on the same locked Caution row as aluminum silicate. Pack sizes (NDC 46581-110) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${MINERAL_OIL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'salonpas.us'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.salonPrp}; LARGE twin ${SET.salonPrpLarge} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

export const BATCH47_PAIN_RUB_REFUSED = [
  {
    sku: 'Salonpas Lidocaine Plus Pain Relieving Cream',
    setid: '364924d3-fac3-4f4e-9b40-decd4ec48245',
    missing: ['ceteth phosphate', 'steareth', 'polysorbate'],
  },
  {
    sku: 'Salonpas Arthritis Pain Patch',
    setid: '2e88c933-89e6-4a48-be7a-dc6a36e5c8f8',
    missing: ['alicyclic saturated hydrocarbon resin', 'baking cloth', 'film'],
  },
  {
    sku: 'Salonpas Pain Relief Patch',
    setid: '724bc4d3-0bc1-4275-a23b-4bbc62fbc0d2',
    missing: ['alicyclic saturated hydrocarbon resin', 'baking cloth', 'film'],
  },
  {
    sku: 'Salonpas Arthritis Pain Patch LARGE',
    setid: 'a6518167-fe32-43b2-b736-ba01ac69c12d',
    missing: ['alicyclic saturated hydrocarbon resin', 'baking cloth', 'film'],
  },
  {
    sku: 'Salonpas Pain Relief Patch LARGE',
    setid: 'acd7ba91-221a-485a-ad1f-dd41ed155656',
    missing: ['alicyclic saturated hydrocarbon resin', 'baking cloth', 'film'],
  },
  {
    sku: 'Salonpas Pain Relieving Gel-Patch HOT',
    setid: 'd2aa8820-a947-404b-b617-e692fbd16502',
    missing: ['magnesium aluminometasilicate', 'nonoxynol'],
  },
  {
    sku: 'Salonpas-HOT Capsicum Patch',
    setid: 'ef5373aa-9857-4d01-95af-2d7716e54ae4',
    missing: ['polybutene'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Hydrogel Patch Large',
    setid: '064d04ca-184d-492b-867c-beaa165ab3e0',
    missing: ['Mentha Oil'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Cool Patch',
    setid: '41590ba1-32bb-4352-97ba-d6a3cc9d0546',
    missing: ['Mentha Oil'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Patch (regular hydrogel)',
    setid: '5066dc10-e4d5-49e9-9a5f-0ac220cfbf28',
    missing: ['mentha oil'],
  },
  {
    sku: 'Tiger Balm Arthritis Rub',
    setid: '80932288-4797-40d3-aa8a-6af686fb67ad',
    missing: ['PEG-120 Methyl Glucose Dioleate'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Patch (wider hydrogel)',
    setid: 'ca601b02-e9be-4d8d-a384-c62553302ceb',
    missing: ['mentha oil'],
  },
] as const;

const ICY_ROLL = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.icyLidoRoll);
const ASPER_APPL = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.asperAppl);
const ASPER_PATCH = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.asperLidoPatch);
const ASPER_XL = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.asperXl);
const ASPER_ROS = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.asperRosLiq);
const ASPER_ROS_C = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.asperRosCream);
const SALON_GEL = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.salonGel);
const SALON_GEL_HIS = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.salonGelHis);
const SALON_PRP = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.salonPrp);
const SALON_PRP_L = BATCH47_PAIN_RUB_EXACT_UNLOCK.find((r) => r.id === ID.salonPrpLarge);

if (BATCH47_PAIN_RUB_EXACT_UNLOCK.length !== 25) {
  throw new Error('batch 47 must write exactly 25 newly-unlocked Search rows');
}
if (BATCH47_PAIN_RUB_EXACT_UNLOCK.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 47 Clean tally is 0');
}
if (BATCH47_PAIN_RUB_EXACT_UNLOCK.filter((r) => r.verdict === 'caution').length !== 6) {
  throw new Error('batch 47 Caution tally is 6');
}
if (BATCH47_PAIN_RUB_EXACT_UNLOCK.filter((r) => r.verdict === 'avoid').length !== 19) {
  throw new Error('batch 47 Avoid tally is 19');
}
if (BATCH47_PAIN_RUB_EXACT_UNLOCK.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 47 stays on Pain & Fever');
}
const BATCH47_CATCHUP_BARCODES: Record<string, string> = {
  [ID.asperOrig]: '041167057032 041167057247 041167057230',
  [ID.salonPrpLarge]: '346581210064',
  [ID.icyLidoLarge]: '041167172018',
  [ID.asperLav]: '041167056851',
  [ID.asperLidoPatch]: '041167058404',
  [ID.asperOdor]: '041167058848 041167058770',
  [ID.salonGel]: '346581830064',
  [ID.salonGelHis]: '355328100063',
  [ID.salonPrp]: '346581110609',
  [ID.icyProPatch]: '041167007303',
  [ID.icyOrigPatch]: '041167008416 041167008430 041167008478',
  [ID.asperXl]: '041167058428',
  [ID.icyOrigRoll]: '041167009109',
  [ID.asperAppl]: '041167058107',
  [ID.asperFoot]: '041167058626',
  [ID.asperFoot2]: '041167059708',
  [ID.salonFlex]: '346581840070',
  [ID.icyMicro]: '041167007808',
  [ID.icyMax]: '041167171011',
  [ID.icyBalm]: '041167079003',
  [ID.asperEuc]: '041167056608',
  [ID.asperRosLiq]: '041167059876',
};
for (const record of BATCH47_PAIN_RUB_EXACT_UNLOCK) {
  const expected = BATCH47_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 47 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 47 must not invent barcodes on ${record.id}`);
  }
}
if (ICY_ROLL?.formulaId !== ASPER_APPL?.formulaId) {
  throw new Error('Icy Hot lidocaine no-mess roll-on and Aspercreme applicator must share formulaId');
}
if (ASPER_PATCH?.formulaId !== ASPER_XL?.formulaId) {
  throw new Error('Aspercreme lidocaine patch and XL must share formulaId');
}
if (ASPER_ROS?.formulaId !== ASPER_ROS_C?.formulaId) {
  throw new Error('Aspercreme rosemary-mint liquid and cream must share formulaId');
}
if (SALON_GEL?.formulaId !== SALON_GEL_HIS?.formulaId) {
  throw new Error('Salonpas lidocaine gel-patch twins must share formulaId');
}
if (SALON_PRP?.formulaId !== SALON_PRP_L?.formulaId) {
  throw new Error('Salonpas pain-relieving patch and LARGE must share formulaId');
}
if (BATCH47_PAIN_RUB_REFUSED.length !== 12) {
  throw new Error('batch 47 refused list must stay 12 still-missing SKUs');
}

// Verdict tally (25 records): Clean 0 · Caution 6 · Avoid 19
// Reuse: batches 41 / 42 / 44 / 45 / 46 untouched
// Refused still-missing exact §5: see BATCH47_PAIN_RUB_REFUSED
