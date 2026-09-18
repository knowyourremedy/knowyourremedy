// DRAFT / not verified / batch 56 Amazon leftover grades WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only. Do NOT invent a Topical aisle.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack
// sizes of the same name+form+inactives share formulaId. Same
// OI+actives share formulaId. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Search wiring only.
// Not wired into Clean Picks UI. No live Clean Picks file is
// edited. No photos. Letter tiles only on new ids. No fake Clean
// alts. No methodology rewrite. No Sprouts. Do NOT touch
// painFeverPicks.ts. Do NOT rewrite batches 41–55 already on main.
// Do not clone list-1 reuse or batches 54–55 Amazon rows already
// written.
//
// GATE: write a leftover SKU only when every current OI token
// matches an exact Additive / “also appears as” / locked
// exact-INCI line. Missing exact token → REFUSE and quote it.
//
// TALLY (unverified drafts in THIS file): 7 rows — Clean 0 /
// Caution 2 / Avoid 5.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. Independently Clean kids APAP analog
// already on main: genexa-kids-apap-liquid. Independently Clean
// adult APAP analog already on main: genexa-acetaminophen-es.
// No Clean conventional NSAID / lidocaine / naproxen invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Tylenol / Advil / Aleve / Motrin / Bayer / Excedrin / Goody’s /
// Icy Hot family / Voltaren / Biofreeze family / Thrive set /
// Boiron / Genexa / MegaFood / Hyland’s / MediNatura /
// Nature’s Way / Basic Care + Basics already on main /
// Asutra / HealthA2Z IBU 382 + 335 / TIME-Cap Naproxen 220 /
// HealthWise + WELMATE + Amazon Basics lidocaine patches /
// batches 41–55.
//
// WRITTEN (current DailyMed / official OI; exact-§5):
// - Stopain Extra Strength menthol roll-on — official
//   stopain.com + DailyMed 895896dc. Caution (boswellia
//   serrata extract scent-extract; eucalyptus oil; trolamine
//   as inactive; SD alcohol 39C Limited). No High.
// - Flexall Maximum Strength 16% gel — DailyMed 79dd238d /
//   source NDC 41167-1602. Caution (steareth-2 / steareth-21;
//   tocopheryl acetate; eucalyptus / thyme EO; trolamine).
//   Methyl salicylate is listed as inactive and stays in the
//   parked-active class (not an invented §5 inactive grade).
//   No High.
// - HealthA2Z Children’s APAP chew NDC 69168-440 (44c90cbe)
//   — Avoid (D&C red #27 / #30 aluminum lake + Blue 1 lake
//   High; leftover exact High-family strings). 60-ct + 150-ct
//   share formulaId.
// - TIME-Cap Labs IBU 200 (82aad715 / NDC 49483-612 Amazon
//   225-ct + pack twins) — Avoid (Yellow 6 lake + talc +
//   TiO2). Oral PVA Cleared leftover lock.
// - Mentholatum Original ointment (19e4b812) — Avoid (TiO2).
// - Sumifun 4% lidocaine patch (3d7dc8cc / NDC 84165-016) —
//   Avoid (methylparaben + propylparaben High; TiO2 High).
//   Backing ignored. DF graded.
// - Australian Dream Arthritis cream — official
//   australiandream.com current OI + DailyMed 8363f3dd.
//   Avoid (MIT / methylisothiazolinone High leave-on cream).
//   Emu oil + sunflower oil as cream fill Cleared (tap ≠
//   gummy High).
//
// formulaId notes:
// - HealthA2Z Children’s APAP 60-ct (69168-440-60) + 150-ct
//   (69168-440-02) share healtha2z-childrens-apap-chew.
// - TIME-Cap IBU pack sizes on setid 82aad715 share
//   timecap-ibuprofen-200. Do NOT reuse
//   timecap-naproxen-220 already on main.
// - Each other written SKU has its own formulaId===id.
// - Pack sizes / same OI+actives share formulaId.
//
// REFUSED (still missing an exact §5 row — quote the token):
// - Amazon Elements Turmeric Complex → "Vegetable Capsule"
// - Penetrex cream (current penetrex.com carton) → "Steareth-20"
// - JointFlex cream (jointflex.com / DailyMed b82ec69c) →
//   "Glycosaminoglycans"
// - Topricin Pain Relief Cream (topricin.com / DailyMed
//   53f5778f) → "Steareth-20"
// - HealthA2Z Naproxen 300-ct (DailyMed 14554f05 printed DF)
//   → "silicon"
// - Blue-Emu Original (current blue-emu.com carton) →
//   "Cholecalciferol"
// - Teemofe 4% lidocaine patch → "no OI"

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
const UNVERIFIED_NOTE = 'draft, not verified';

const AMAZON = ['Amazon'] as const;
const PF_RETAILERS = [
  'Amazon',
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / capsicum / benzyl alcohol / trolamine salicylate / phenol actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this cream / topical fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const EMU_TAP =
  'Emu oil as topical fill is the locked exact Cleared token. Tap fill ≠ gummy High.';

const SCENT_EXTRACT_TAP =
  'Named single oil as BASE/FILL is Cleared. Botanical EXTRACT or oil used as scent in a blend is Caution (fragrance/EO line).';

const METH = {
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  red27:
    'Methodology §5 High-tier (D&C red #27 aluminum lake — exact High-family string; locked Sept 15, 2026)',
  red30:
    'Methodology §5 High-tier (D&C red #30 aluminum lake — exact High-family string; locked Sept 15, 2026)',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception). Oral / swallow High. Topical talc in a cream/patch is a different Caution row.',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  mit: 'Methodology §5 High-tier (Methylisothiazolinone / MIT — High/Avoid in leave-on cream; exact tokens; locked Sept 15, 2026)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate; ethylene-oxide / 1,4-dioxane)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  peppermint:
    'Methodology §5 Limited-risk (peppermint oil / orange essential oil as flavor — flavor/EO line). Peppermint oil is the locked flavor/EO Limited row. Not gummy High. Not Avoid.',
  mannitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  sd39c:
    'Methodology §5 Limited-risk (SD alcohol 39C — exact alias; same Limited alcohol-vehicle row; locked Sept 15, 2026). Do not invent a second alcohol class.',
  sdAlcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE — SD alcohol / SD alcohol 40 sit on this same alcohol-vehicle row; locked Sept 14, 2026). Do not invent a second alcohol class.',
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  boswellia: `Methodology §5 Caution (topical botanical extracts/oils — boswellia resin extract / boswellia oil as scent-extract; extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026). ${SCENT_EXTRACT_TAP}`,
  eucalyptus:
    'Methodology §5 Caution (pine needle oil, citronella oil, eucalyptus oil, jojoba oil as gel inactives — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  thyme:
    'Methodology §5 Caution (clove oil, boswellia oil, thymus / flower oils as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  trolamine:
    'Methodology §5 Caution (TEA / trolamine as inactive — not the salicylate active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  steareth2:
    'Methodology §5 Caution (steareth-2 / steareth-21 — standalone Caution, not Avoid; locked Sept 15, 2026)',
  tocopherylAcetate:
    'Methodology §5 Caution (tocopheryl acetate — exact INCI; distinct from Cleared mixed tocopherols; standalone Caution, not Avoid; locked Sept 15, 2026)',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum — topical OTC only; standalone Caution, not Avoid)',
  dihydroxyAl:
    'Methodology §5 Caution (dihydroxyaluminum aminoacetate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid — topical gel polymer; standalone Caution, not Avoid; locked Sept 15, 2026)',
  tetrasodiumEdta:
    'Methodology §5 Caution (Tetrasodium EDTA — exact INCI; distinct from Cleared disodium EDTA; standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylamide:
    'Methodology §5 Caution (polyacrylamide — exact INCI; distinct from the AMPS / acrylate-acrylamide family row; standalone Caution, not Avoid; locked Sept 15, 2026)',
  pvaOral:
    'Methodology §5 Cleared (polyvinyl alcohol, oral coating — exact token as oral coating; distinct from PVA topical film; locked Sept 15, 2026)',
  polyethyleneChew:
    'Methodology §5 Cleared (polyethylene as chew binder — exact token; distinct from PEG / polyethylene glycol Moderate; locked Sept 15, 2026)',
  dextrates:
    'Methodology §5 Cleared (dextrates hydrated — exact INCI; locked Sept 15, 2026)',
  ethylcellulose:
    'Methodology §5 Cleared (ethylcellulose — cellulose coating family; locked Sept 15, 2026)',
  emu: `Methodology §5 Cleared (emu oil as topical fill — named single oil as topical fill; locked Sept 15, 2026). ${EMU_TAP}`,
  sunflower: `Methodology §5 Cleared (named single oil as the cream BASE/FILL; sunflower seed oil is the cream vehicle, not gummy High; safflower / soybean cream-base neighborhood; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  c1314:
    'Methodology §5 Cleared (C13-14 isoparaffin — exact INCI; distinct from Caution isohexadecane; locked Sept 15, 2026)',
  ethylhexylStearate:
    'Methodology §5 Cleared (ethylhexyl stearate — exact INCI; locked Sept 15, 2026)',
  laureth7: 'Methodology §5 Cleared (laureth-7 — exact INCI; locked Sept 15, 2026)',
  trideceth6:
    'Methodology §5 Cleared (trideceth-6 — exact INCI; locked Sept 15, 2026)',
  butylene:
    'Methodology §5 Cleared (butylene glycol — exact INCI; locked Sept 15, 2026)',
  msm: 'Methodology §5 Cleared (MSM / methylsulfonylmethane / dimethyl sulfone as labeled inactive — exact token; locked Sept 15, 2026)',
  glucosamine:
    'Methodology §5 Cleared (glucosamine / glucosamine sulfate as labeled inactive — exact token; locked Sept 15, 2026)',
  chondroitin:
    'Methodology §5 Cleared (chondroitin sulfate as labeled inactive — exact token; locked Sept 15, 2026)',
  petrolatum:
    'Methodology §5 Cleared (petrolatum, topical — first-aid ointment base; locked Sept 14, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer / carbomer copolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  diisopropyl:
    'Methodology §5 Cleared (diisopropyl adipate — topical emollient ester; locked Sept 15, 2026)',
  allantoin:
    'Methodology §5 Cleared (allantoin — topical soother; locked Sept 15, 2026)',
  kaolin: 'Methodology §5 Cleared (kaolin — clay / absorbent; locked Sept 15, 2026)',
  tartaric:
    'Methodology §5 Cleared (tartaric acid — organic acid with citric; locked Sept 15, 2026)',
  disodiumEdta:
    'Methodology §5 Cleared (disodium EDTA / edetate disodium — TRACE preservative/stabilizer; locked v1.6)',
  stearate:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate — stearate-family lubricant)',
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

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(opts: RatingRecord): RatingRecord {
  return {
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

const SET = {
  stopain: '895896dc-0762-40a7-8313-cca10ce68984',
  flexall: '79dd238d-87fe-4d89-bb3f-2677cae25993',
  ha2zKids: '44c90cbe-8ece-4dd8-9ea5-7f8d6f4c0096',
  timecapIbu: '82aad715-f652-471b-840c-5151c66e5ade',
  mentholatum: '19e4b812-67c6-49fd-833a-b432100363f5',
  sumifun: '3d7dc8cc-0680-d94d-e063-6394a90ac8e8',
  ausDream: '8363f3dd-7ed3-407e-b681-3d388e8651e0',
} as const;

const ID = {
  stopain: 'stopain-extra-strength-roll-on',
  flexall: 'flexall-max-strength-gel',
  ha2zKids: 'healtha2z-childrens-apap-chew',
  timecapIbu: 'timecap-ibuprofen-200',
  mentholatum: 'mentholatum-original',
  sumifun: 'sumifun-lidocaine-4-patch',
  ausDream: 'australian-dream-arthritis-cream',
} as const;

const CITE = {
  stopain:
    'stopain.com Extra Strength Pain Relief Roll-On (https://stopain.com/products/topical-pain-relief-roll-on) inactive: boswellia serrata extract, carbomer, dimethylsulfone (MSM), eucalyptus oil, glucosamine sulfate, glycerin, peppermint oil, SD alcohol 39C, triethanolamine, water (USP)',
  ausDream:
    'australiandream.com Arthritis Pain Relief Cream current PDP (https://australiandream.com/products/arthritis-pain-relief-cream/) inactive: Butylene Glycol, C13-14 Isoparaffin, Chondroitin Sulfate, Deionized Water (Aqua), Emu Oil, Ethylhexyl Stearate, Glucosamine Sulfate, Helianthus Annuus (Sunflower) Oil, Laureth-7, Methylisothiazolinone, Methylsulfonylmethane (MSM), Polyacrylamide, Potassium Sorbate, Sodium Polyacrylate, Tetrasodium EDTA, Tocopheryl Acetate (Vitamin-E), Trideceth-6',
} as const;

const GENEXA_ES = 'genexa-acetaminophen-es';
const GENEXA_KIDS = 'genexa-kids-apap-liquid';
const EQUATE_IBU = 'equate-ibuprofen-dye-free';
const ARNICARE_GEL = 'boiron-arnicare-gel';

const KIDS_APAP_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_KIDS,
    'Independently Clean kids acetaminophen analog already on main (Genexa Kids acetaminophen liquid, minAge 2). Same active. Form: liquid vs chew — labeled, not a hard filter (§6).',
  ),
];

const IBU_ADULT_ALTS: CleanAlternative[] = [
  alt(
    EQUATE_IBU,
    'Best Caution adult ibuprofen analog already on main (dye-free LNK 44-438). No independently Clean adult ibuprofen or naproxen on this shelf. Form labeled, not a hard filter (§6).',
  ),
  alt(
    GENEXA_ES,
    'Independently Clean adult acetaminophen analog if a non-IBU / non-naproxen swap is acceptable. Form: caplet — labeled, not a hard filter (§6).',
  ),
];

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine / menthol cream invented.',
  ),
];

export const BATCH56_REFUSED: { sku: string; token: string }[] = [
  {
    sku: 'Amazon Elements Turmeric Complex',
    token: 'Vegetable Capsule',
  },
  {
    sku: 'Penetrex cream (current penetrex.com carton)',
    token: 'Steareth-20',
  },
  {
    sku: 'JointFlex cream (jointflex.com / DailyMed b82ec69c)',
    token: 'Glycosaminoglycans',
  },
  {
    sku: 'Topricin Pain Relief Cream (topricin.com / DailyMed 53f5778f)',
    token: 'Steareth-20',
  },
  {
    sku: 'HealthA2Z Naproxen Sodium 220 300-ct (DailyMed 14554f05 printed DF)',
    token: 'silicon',
  },
  {
    sku: 'Blue-Emu Original (current blue-emu.com carton)',
    token: 'Cholecalciferol',
  },
  {
    sku: 'Teemofe 4% lidocaine patch',
    token: 'no OI',
  },
];

export const BATCH56_AMAZON_LEFTOVER_GRADES: RatingRecord[] = [
  row({
    id: ID.stopain,
    productName: 'Stopain Extra Strength Pain Relief Roll-On',
    brand: 'Stopain',
    category: PAIN_FEVER,
    barcode: '724909633038',
    formulaId: ID.stopain,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    productType: OTC,
    activeIngredients: [{ name: 'Menthol', strength: '8%' }],
    inactiveIngredients: [
      flag(
        'Boswellia serrata extract',
        'cleared',
        labelCite(CITE.stopain, METH.boswellia),
      ),
      flag('Eucalyptus oil', 'cleared', labelCite(CITE.stopain, METH.eucalyptus)),
      flag('Triethanolamine', 'cleared', labelCite(CITE.stopain, METH.trolamine)),
      flag('Peppermint oil', 'limited', labelCite(CITE.stopain, METH.peppermint)),
      flag('SD alcohol 39C', 'limited', labelCite(CITE.stopain, METH.sd39c)),
      flag('Dimethylsulfone (MSM)', 'cleared', labelCite(CITE.stopain, METH.msm)),
      flag(
        'Glucosamine sulfate',
        'cleared',
        labelCite(CITE.stopain, METH.glucosamine),
      ),
      flag('Carbomer', 'cleared', labelCite(CITE.stopain, METH.carbomer)),
      flag('Glycerin', 'cleared', labelCite(CITE.stopain, METH.cleared)),
      flag('Water (USP)', 'cleared', labelCite(CITE.stopain, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Stopain Extra Strength menthol roll-on = Caution. Drivers are boswellia serrata extract (scent-extract / boswellia resin-extract Caution) + eucalyptus oil + trolamine as inactive. SD alcohol 39C is the locked Limited alcohol-vehicle alias. Peppermint oil is the locked Limited flavor/EO row. Official stopain.com Extra Strength Roll-On inactive: boswellia serrata extract, carbomer, dimethylsulfone (MSM), eucalyptus oil, glucosamine sulfate, glycerin, peppermint oil, SD alcohol 39C, triethanolamine, water (USP). DailyMed setid ${SET.stopain} (NDC 63936-8523 Extra Strength Cold Pain Relieving Roll On) prints the same current OI. Clinical roll-on (PEG-8 dimethicone + pentylene glycol) is not this row. No High. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} ${SCENT_EXTRACT_TAP} Draft, not verified.`,
    retailers: [...AMAZON, 'CVS', 'Walgreens', 'stopain.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `${CITE.stopain}; DailyMed setid ${SET.stopain} (NDC 63936-8523) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.flexall,
    productName: 'Flexall Maximum Strength Pain Relieving Gel',
    brand: 'Flexall',
    category: PAIN_FEVER,
    barcode: '041167160220',
    formulaId: ID.flexall,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    productType: OTC,
    activeIngredients: [{ name: 'Menthol', strength: '16%' }],
    inactiveIngredients: [
      flag('Steareth-2', 'cleared', dailymed(SET.flexall, METH.steareth2)),
      flag('Steareth-21', 'cleared', dailymed(SET.flexall, METH.steareth2)),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET.flexall, METH.tocopherylAcetate),
      ),
      flag(
        'Eucalyptus globulus leaf oil',
        'cleared',
        dailymed(SET.flexall, METH.eucalyptus),
      ),
      flag(
        'Thymus vulgaris (thyme) oil',
        'cleared',
        dailymed(SET.flexall, METH.thyme),
      ),
      flag('Triethanolamine', 'cleared', dailymed(SET.flexall, METH.trolamine)),
      flag(
        'Mentha piperita (peppermint) oil',
        'limited',
        dailymed(SET.flexall, METH.peppermint),
      ),
      flag(
        'SD alcohol 40',
        'limited',
        dailymed(SET.flexall, METH.sdAlcohol),
      ),
      flag('Allantoin', 'cleared', dailymed(SET.flexall, METH.allantoin)),
      flag(
        'Aloe barbadensis leaf juice',
        'cleared',
        dailymed(SET.flexall, METH.aloe),
      ),
      flag('Carbomer', 'cleared', dailymed(SET.flexall, METH.carbomer)),
      flag(
        'Diisopropyl adipate',
        'cleared',
        dailymed(SET.flexall, METH.diisopropyl),
      ),
      cleared(SET.flexall, 'Glycerin'),
      cleared(SET.flexall, 'Water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Flexall Maximum Strength 16% gel = Caution. Drivers are steareth-2 / steareth-21 + tocopheryl acetate + eucalyptus / thyme EO + trolamine as inactive. DailyMed setid ${SET.flexall} (source NDC 41167-1602) Drug Facts: allantoin, aloe barbadensis leaf juice, carbomer, diisopropyl adipate, eucalyptus globulus leaf oil, glycerin, mentha piperita (peppermint) oil, methyl salicylate, SD alcohol 40 (15% w/w), steareth-2, steareth-21, thymus vulgaris (thyme) oil, tocopheryl acetate, triethanolamine, water. Methyl salicylate is printed as an inactive and stays in the parked menthol / camphor / methyl salicylate active class — not an invented §5 inactive grade. SD alcohol 40 sits on the locked SD-alcohol vehicle row (not a second alcohol class). No High. Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} ${SCENT_EXTRACT_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.flexall} (Flexall Maximum Strength source NDC 41167-1602) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ha2zKids,
    productName: "HealthA2Z Children's Acetaminophen 160 mg Chewable",
    brand: 'HealthA2Z',
    category: PAIN_FEVER,
    formulaId: ID.ha2zKids,
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '160mg' }],
    inactiveIngredients: [
      flag(
        'D&C red #27 aluminum lake',
        'high',
        dailymed(SET.ha2zKids, METH.red27),
      ),
      flag(
        'D&C red #30 aluminum lake',
        'high',
        dailymed(SET.ha2zKids, METH.red30),
      ),
      flag(
        'FD&C blue #1 aluminum lake',
        'high',
        dailymed(SET.ha2zKids, METH.dyes),
      ),
      flag('Sucralose', 'moderate', dailymed(SET.ha2zKids, METH.sucralose)),
      flag('Flavors', 'limited', dailymed(SET.ha2zKids, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET.ha2zKids, METH.mannitol)),
      flag(
        'Dextrates hydrated',
        'cleared',
        dailymed(SET.ha2zKids, METH.dextrates),
      ),
      flag(
        'Polyethylene',
        'cleared',
        dailymed(SET.ha2zKids, METH.polyethyleneChew),
      ),
      flag(
        'Ethylcellulose',
        'cleared',
        dailymed(SET.ha2zKids, METH.ethylcellulose),
      ),
      cleared(SET.ha2zKids, 'Citric acid'),
      cleared(SET.ha2zKids, 'Crospovidone'),
      cleared(SET.ha2zKids, 'Magnesium stearate'),
      cleared(SET.ha2zKids, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: HealthA2Z Children’s APAP 160 mg grape chew = Avoid. Drivers are D&C red #27 aluminum lake + D&C red #30 aluminum lake + FD&C Blue #1 aluminum lake (High — leftover exact High-family strings). DailyMed setid 44c90cbe (Allegiant NDC 69168-440) Drug Facts: citric acid, crospovidone, D&C red #27 aluminum lake, D&C red #30 aluminum lake, dextrates hydrated, ethylcellulose, FD&C blue #1 aluminum lake, flavors, magnesium stearate, mannitol, polyethylene, stearic acid, sucralose. Dextrates hydrated + polyethylene as chew binder are locked leftover Cleared tokens. 60-ct (69168-440-60) and 150-ct (69168-440-02) share this formulaId. Do NOT clone HealthA2Z IBU 382 / 335 already on main. Stay under 4 g/day acetaminophen. Ages 2–11 (under 2: ask a doctor).',
    retailers: [...AMAZON, 'Target'],
    cleanAlternatives: KIDS_APAP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ha2zKids} (HealthA2Z / Allegiant Children’s Pain Relief NDC 69168-440) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.timecapIbu,
    productName: 'TIME-Cap Labs Ibuprofen 200 mg',
    brand: 'TIME-Cap Labs',
    category: PAIN_FEVER,
    formulaId: ID.timecapIbu,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Yellow #6 aluminum lake',
        'high',
        dailymed(SET.timecapIbu, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET.timecapIbu, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.timecapIbu, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.timecapIbu, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.timecapIbu, METH.sio2),
      ),
      flag(
        'Polyvinyl alcohol',
        'cleared',
        dailymed(SET.timecapIbu, METH.pvaOral),
      ),
      cleared(SET.timecapIbu, 'Croscarmellose sodium'),
      cleared(SET.timecapIbu, 'Magnesium stearate'),
      cleared(SET.timecapIbu, 'Microcrystalline cellulose'),
      cleared(SET.timecapIbu, 'Pregelatinized starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: TIME-Cap Labs Ibuprofen 200 = Avoid. Drivers are FD&C Yellow #6 aluminum lake + talc + titanium dioxide (High). DailyMed setid 82aad715 printed Drug Facts: colloidal silicon dioxide, croscarmellose sodium, FD&C yellow #6 aluminum lake, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide. Oral polyvinyl alcohol is the locked leftover Cleared coating token. Amazon 225-ct is NDC 49483-612-34 on this SPL; other 49483-611 / 49483-612 pack sizes share this formulaId. Do NOT reuse timecap-naproxen-220 already on main. Ages 12+.',
    retailers: [...AMAZON],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.timecapIbu} (TIME CAP LABORATORIES IBU 200 NDC 49483-611 / 49483-612) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.mentholatum,
    productName: 'Mentholatum Original Ointment',
    brand: 'Mentholatum',
    category: PAIN_FEVER,
    barcode: '310742000115 310742000122',
    formulaId: ID.mentholatum,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    activeIngredients: [
      { name: 'Camphor', strength: '9%' },
      { name: 'Menthol', strength: '1.3%' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.mentholatum, METH.tio2)),
      flag('Fragrance', 'cleared', dailymed(SET.mentholatum, METH.fragrance)),
      flag('Petrolatum', 'cleared', dailymed(SET.mentholatum, METH.petrolatum)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Mentholatum Original ointment = Avoid. Driver is titanium dioxide (High). DailyMed setid ${SET.mentholatum} (NDC 10742-0002) Drug Facts inactive: fragrance, petrolatum, titanium dioxide. Fragrance is standalone Caution (not the Avoid driver). Petrolatum is the locked topical ointment base. Official mentholatumwellness.com Original Ointment prints the same three inactives. Ages 2+ (under 2: ask a doctor). ${PARKED_ACTIVES} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'mentholatumwellness.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.mentholatum} (Mentholatum Original NDC 10742-0002) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.sumifun,
    productName: 'Sumifun Lidocaine 4% Pain Relief Gel-Patch',
    brand: 'Sumifun',
    category: PAIN_FEVER,
    barcode: '6942488003446',
    formulaId: ID.sumifun,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET.sumifun, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET.sumifun, METH.parabens)),
      flag('Titanium dioxide', 'high', dailymed(SET.sumifun, METH.tio2)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.sumifun, METH.ps80)),
      flag(
        'Dihydroxyaluminum aminoacetate',
        'cleared',
        dailymed(SET.sumifun, METH.dihydroxyAl),
      ),
      flag(
        'Polyacrylic acid',
        'cleared',
        dailymed(SET.sumifun, METH.polyacrylate),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.sumifun, METH.polyacrylate),
      ),
      flag('Propylene glycol', 'cleared', dailymed(SET.sumifun, METH.pgTopical)),
      flag('Kaolin', 'cleared', dailymed(SET.sumifun, METH.kaolin)),
      flag('Tartaric acid', 'cleared', dailymed(SET.sumifun, METH.tartaric)),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed(SET.sumifun, METH.disodiumEdta),
      ),
      cleared(SET.sumifun, 'Glycerin'),
      cleared(SET.sumifun, 'Polyvinylpyrrolidone K90'),
      cleared(SET.sumifun, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Sumifun 4% lidocaine gel-patch = Avoid. Drivers are methylparaben + propylparaben (High in every form, including patches) and titanium dioxide (High). DailyMed setid ${SET.sumifun} (NDC 84165-016) Drug Facts: Dihydroxyaluminum Aminoacetate Anhydrous, Edetate Disodium, Glycerin, Kaolin, Methylparaben, Polyacrylic Acid, Polysorbate 80, PolyvinylPyrrolidone K90, Propylene Glycol, Propylparaben, Sodium Polyacrylate, Tartaric Acid, Titanium Dioxide, Water. Backing ignored. DF graded (not structured-only). Do NOT clone HealthWise / WELMATE / Amazon Basics lidocaine rows already on main (different OI). Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.sumifun} (Sumifun Lidocaine Pain Relief Gel-Patch NDC 84165-016) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ausDream,
    productName: 'Australian Dream Arthritis Pain Relief Cream',
    brand: 'Australian Dream',
    category: PAIN_FEVER,
    formulaId: ID.ausDream,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    activeIngredients: [
      { name: 'Histamine dihydrochloride', strength: '0.025%' },
    ],
    inactiveIngredients: [
      flag('Methylisothiazolinone', 'high', labelCite(CITE.ausDream, METH.mit)),
      flag(
        'Tocopheryl acetate',
        'cleared',
        labelCite(CITE.ausDream, METH.tocopherylAcetate),
      ),
      flag(
        'Tetrasodium EDTA',
        'cleared',
        labelCite(CITE.ausDream, METH.tetrasodiumEdta),
      ),
      flag(
        'Polyacrylamide',
        'cleared',
        labelCite(CITE.ausDream, METH.polyacrylamide),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        labelCite(CITE.ausDream, METH.polyacrylate),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        labelCite(CITE.ausDream, METH.benzoate),
      ),
      flag('Emu oil', 'cleared', labelCite(CITE.ausDream, METH.emu)),
      flag(
        'Helianthus annuus (sunflower) oil',
        'cleared',
        labelCite(CITE.ausDream, METH.sunflower),
      ),
      flag(
        'C13-14 isoparaffin',
        'cleared',
        labelCite(CITE.ausDream, METH.c1314),
      ),
      flag(
        'Ethylhexyl stearate',
        'cleared',
        labelCite(CITE.ausDream, METH.ethylhexylStearate),
      ),
      flag('Laureth-7', 'cleared', labelCite(CITE.ausDream, METH.laureth7)),
      flag('Trideceth-6', 'cleared', labelCite(CITE.ausDream, METH.trideceth6)),
      flag('Butylene glycol', 'cleared', labelCite(CITE.ausDream, METH.butylene)),
      flag(
        'Methylsulfonylmethane (MSM)',
        'cleared',
        labelCite(CITE.ausDream, METH.msm),
      ),
      flag(
        'Glucosamine sulfate',
        'cleared',
        labelCite(CITE.ausDream, METH.glucosamine),
      ),
      flag(
        'Chondroitin sulfate',
        'cleared',
        labelCite(CITE.ausDream, METH.chondroitin),
      ),
      flag('Deionized water', 'cleared', labelCite(CITE.ausDream, METH.cleared)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Australian Dream Arthritis Pain Relief Cream = Avoid. Driver is methylisothiazolinone / MIT (High/Avoid leave-on cream; exact leftover-cream lock). Official australiandream.com current OI: butylene glycol, C13-14 isoparaffin, chondroitin sulfate, deionized water, emu oil, ethylhexyl stearate, glucosamine sulfate, helianthus annuus (sunflower) oil, laureth-7, methylisothiazolinone, methylsulfonylmethane (MSM), polyacrylamide, potassium sorbate, sodium polyacrylate, tetrasodium EDTA, tocopheryl acetate, trideceth-6. DailyMed setid ${SET.ausDream} prints the same leftover-cream stack. ${EMU_TAP} Sunflower oil is the named cream-fill vehicle (not gummy High). Do not write the later Sombra 523333ee carton (different OI). Pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${CREAM_OIL_TAP} Draft, not verified.`,
    retailers: [...AMAZON, 'Walmart', 'CVS', 'australiandream.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `${CITE.ausDream}; DailyMed setid ${SET.ausDream} — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

const BY_ID = Object.fromEntries(
  BATCH56_AMAZON_LEFTOVER_GRADES.map((record) => [record.id, record]),
);

if (BATCH56_AMAZON_LEFTOVER_GRADES.length !== 7) {
  throw new Error('batch 56 must write exactly 7 Search rows');
}
if (BATCH56_AMAZON_LEFTOVER_GRADES.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 56 Clean tally is 0');
}
if (BATCH56_AMAZON_LEFTOVER_GRADES.filter((r) => r.verdict === 'caution').length !== 2) {
  throw new Error('batch 56 Caution tally is 2');
}
if (BATCH56_AMAZON_LEFTOVER_GRADES.filter((r) => r.verdict === 'avoid').length !== 5) {
  throw new Error('batch 56 Avoid tally is 5');
}
if (BATCH56_AMAZON_LEFTOVER_GRADES.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 56 stays on Pain & Fever');
}
const BATCH56_CATCHUP_BARCODES: Record<string, string> = {
  [ID.stopain]: '724909633038',
  [ID.flexall]: '041167160220',
  [ID.mentholatum]: '310742000115 310742000122',
  [ID.sumifun]: '6942488003446',
};
for (const record of BATCH56_AMAZON_LEFTOVER_GRADES) {
  const expected = BATCH56_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 56 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 56 must not invent barcodes on ${record.id}`);
  }
}
if (
  BATCH56_AMAZON_LEFTOVER_GRADES.some(
    (record) => record.recordStatus !== UNVERIFIED,
  )
) {
  throw new Error('batch 56 recordStatus must stay unverified');
}

const STOPAIN = BY_ID[ID.stopain];
const FLEXALL = BY_ID[ID.flexall];
const HA2Z_KIDS = BY_ID[ID.ha2zKids];
const TIMECAP_IBU = BY_ID[ID.timecapIbu];
const MENTHOLATUM = BY_ID[ID.mentholatum];
const SUMIFUN = BY_ID[ID.sumifun];
const AUS = BY_ID[ID.ausDream];

if (TIMECAP_IBU?.formulaId === 'timecap-naproxen-220') {
  throw new Error('TIME-Cap IBU must not reuse the already-on-main naproxen formulaId');
}
if (HA2Z_KIDS?.formulaId === 'healtha2z-ibuprofen-200-382') {
  throw new Error('HealthA2Z kids APAP must not reuse IBU 382 formulaId');
}
if (HA2Z_KIDS?.formulaId === 'healtha2z-ibuprofen-200-335') {
  throw new Error('HealthA2Z kids APAP must not reuse IBU 335 formulaId');
}
if (SUMIFUN?.formulaId === 'amazon-basics-lidocaine-4-patch') {
  throw new Error('Sumifun must not reuse Amazon Basics lidocaine formulaId');
}
if (SUMIFUN?.formulaId === 'healthwise-lidocaine-4-patch') {
  throw new Error('Sumifun must not reuse HealthWise lidocaine formulaId');
}
if (SUMIFUN?.formulaId === 'welmate-lidocaine-4-patch-parabens') {
  throw new Error('Sumifun must not reuse WELMATE paraben lidocaine formulaId');
}
if (!HA2Z_KIDS?.inactiveIngredients.some((item) => item.name === 'D&C red #27 aluminum lake')) {
  throw new Error('HealthA2Z kids APAP must list exact D&C red #27 aluminum lake');
}
if (!HA2Z_KIDS?.inactiveIngredients.some((item) => item.name === 'Dextrates hydrated')) {
  throw new Error('HealthA2Z kids APAP must list exact dextrates hydrated');
}
if (!TIMECAP_IBU?.inactiveIngredients.some((item) => item.name === 'Talc')) {
  throw new Error('TIME-Cap IBU must list exact talc');
}
if (!MENTHOLATUM?.inactiveIngredients.some((item) => item.name === 'Titanium dioxide')) {
  throw new Error('Mentholatum Original must list exact titanium dioxide');
}
if (!SUMIFUN?.inactiveIngredients.some((item) => item.name === 'Methylparaben')) {
  throw new Error('Sumifun must list exact methylparaben');
}
if (!AUS?.inactiveIngredients.some((item) => item.name === 'Methylisothiazolinone')) {
  throw new Error('Australian Dream must list exact methylisothiazolinone');
}
if (!AUS?.inactiveIngredients.some((item) => item.name === 'Emu oil')) {
  throw new Error('Australian Dream must list exact emu oil');
}
if (!STOPAIN?.inactiveIngredients.some((item) => item.name === 'SD alcohol 39C')) {
  throw new Error('Stopain must list exact SD alcohol 39C');
}
if (!FLEXALL?.inactiveIngredients.some((item) => item.name === 'Steareth-2')) {
  throw new Error('Flexall must list exact steareth-2');
}
if (
  AUS?.inactiveIngredients.some((item) =>
    /soybean|canola|vegetable oil/i.test(item.name),
  )
) {
  throw new Error('Australian Dream must not invent a High seed-oil flag');
}
if (BATCH56_REFUSED.some((item) => !item.token)) {
  throw new Error('every refused row must quote a token');
}
if (BATCH56_REFUSED.length !== 7) {
  throw new Error('batch 56 must quote exactly 7 refused SKUs');
}

// Verdict tally (7 records): Clean 0 · Caution 2 · Avoid 5
// formulaId share: HealthA2Z kids APAP pack sizes; TIME-Cap IBU pack sizes.
// Do not reuse TIME-Cap naproxen or HealthA2Z IBU / lidocaine formulaIds.
// Refused still-missing exact §5: Vegetable Capsule; Steareth-20;
// Glycosaminoglycans; silicon; Cholecalciferol; no OI.
