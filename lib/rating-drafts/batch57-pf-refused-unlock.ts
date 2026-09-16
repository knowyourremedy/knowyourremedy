// DRAFT / not verified / batch 57 PR #104 refused-unlock WRITE /
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
// painFeverPicks.ts. Do NOT rewrite batch 56 rows already on
// main (Stopain, Flexall, HealthA2Z kids APAP, TIME-Cap IBU,
// Mentholatum, Sumifun, Australian Dream).
//
// GATE: rewrite a PR #104 refused SKU only when the refused
// token is now exact-§5 on MAIN and every current OI token
// matches an exact Additive / “also appears as” / locked
// exact-INCI line. Prefer founder carton/photo OI over
// DailyMed/site harvest when they conflict.
//
// NEW §5 locks that unlock these (already on MAIN): Steareth-20
// Caution (exact; ≠ steareth-2/21/unspecified); Glycosaminoglycans
// Caution; Cholecalciferol as inactive Cleared; silicon (exact
// word) Caution — do not alias silica / SiO2.
//
// TALLY (unverified drafts in THIS file): 6 rows — Clean 0 /
// Caution 3 / Avoid 3.
// Independently Clean turmeric analogs already on main:
// oregons-wild-harvest-turmeric / organic-india-turmeric-formula /
// sports-research-turmeric-curcumin. Independently Clean topical
// analog already on main: boiron-arnicare-gel. No Clean
// conventional NSAID / lidocaine / naproxen invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Tylenol / Advil / Aleve / Motrin / Bayer / Excedrin / Goody’s /
// Icy Hot family / Voltaren / Biofreeze family / Thrive set /
// Boiron / Genexa / MegaFood / Hyland’s / MediNatura /
// Nature’s Way / Basic Care + Basics already on main /
// Asutra / HealthA2Z IBU 382 + 335 / TIME-Cap Naproxen 220 /
// HealthWise + WELMATE + Amazon Basics + Sumifun lidocaine /
// batches 41–56 including batch 56 leftovers.
//
// WRITTEN from the PR #104 refused list (founder OI first):
// - Amazon Elements Turmeric Complex — Caution (SiO2 0-pt cap).
//   Founder OI: HPMC named + MCC + magnesium stearate + SiO2.
//   Do NOT refuse Vegetable Capsule — founder says HPMC is named.
//   Ginger / black pepper are labeled actives, not inactives.
// - JointFlex cream — Caution. jointflex.com / DailyMed b82ec69c
//   with Glycosaminoglycans now exact-§5 Caution. No High.
// - Topricin Pain Relief Cream — Caution. topricin.com / DailyMed
//   53f5778f with Steareth-20 now exact-§5 Caution. Unlabeled MCT
//   Limited. No High.
// - Blue-Emu Original — Avoid. Founder jar photo includes FD&C
//   Blue #1 (High). Do NOT use any “no dye” harvest.
//   Cholecalciferol as inactive is now Cleared. Emu oil fill
//   Cleared. Methylparaben + propylparaben also High on the
//   founder jar. Imidazolidinyl urea stays parked (not graded;
//   not the Avoid driver).
// - Teemofe 4% lidocaine patch — Avoid (TiO2 High). Founder OI
//   completed from the matching Drug Facts family. Backing
//   ignored. Do not refuse “no OI.” Silica is the SiO2 Caution
//   alias — not the new silicon token.
// - HealthA2Z Naproxen 300-ct — Avoid (TiO2 + Blue 2 High).
//   Founder OI + DailyMed 14554f05 printed “silicon” (exact
//   word) uses the new Caution silicon token — not aliased to
//   silica / SiO2.
//
// REFUSED (still missing an exact §5 row — quote the token):
// - Penetrex cream (current penetrex.com carton) →
//   "Coconut Alkanes"
//   Steareth-20 is now locked; that is no longer the block.
//   Current penetrex.com cream OI still prints Coconut Alkanes,
//   which is not an exact Additive / also-appears-as / locked
//   INCI row (C15-19 alkane / undecane / tridecane are distinct
//   tokens — do not alias). Also still unpinned on that carton:
//   Pyridoxine HCl; Tea Tree (Melaleuca Alternifolia) Leaf Oil.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const HOMEOPATHIC = 'homeopathic';
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

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglyceride and does not name coconut on that token. We mark that Limited because the source isn’t clear. This cream emollient / vehicle is not the gummy seed-oil High rule.';

const SCENT_EXTRACT_TAP =
  'Named single oil as BASE/FILL is Cleared. Botanical EXTRACT or oil used as scent in a blend is Caution (fragrance/EO line).';

const SILICON_TAP =
  'silicon is the locked exact Caution token when the label prints that word. Distinct from silica / silicon dioxide / hydrated silica. Do not alias.';

const METH = {
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate; ethylene-oxide / 1,4-dioxane)',
  ps20: 'Methodology §5 Moderate-risk (polysorbate 20 — same 2023 gut-barrier signal as P80; locked v1.6)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  silicon: `Methodology §5 Caution (silicon — exact word when the label prints “silicon,” not silica; do not alias silicon dioxide / silica / hydrated silica; standalone Caution, not Avoid; locked Sept 15, 2026). ${SILICON_TAP}`,
  peppermint:
    'Methodology §5 Limited-risk (peppermint oil / orange essential oil as flavor — flavor/EO line). Peppermint oil is the locked flavor/EO Limited row. Not gummy High. Not Avoid.',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — MCT with no coconut or other source named; opacity). ${MCT_UNLABELED_TAP}`,
  steareth20:
    'Methodology §5 Caution (Steareth-20 — exact INCI; distinct from steareth-2 / steareth-21 and from unspecified steareth; standalone Caution, not Avoid; locked Sept 15, 2026)',
  gag: 'Methodology §5 Caution (Glycosaminoglycans — exact token; distinct from Cleared glucosamine / chondroitin as labeled inactive; standalone Caution, not Avoid; locked Sept 15, 2026)',
  acetylatedLanolin:
    'Methodology §5 Caution (acetylated lanolin / hydroxylated lanolin — exact tokens; same Caution as lanolin; do not Clear; standalone Caution, not Avoid; locked Sept 15, 2026)',
  hydroxylatedLanolin:
    'Methodology §5 Caution (acetylated lanolin / hydroxylated lanolin — exact tokens; same Caution as lanolin; do not Clear; standalone Caution, not Avoid; locked Sept 15, 2026)',
  acrylateC1030:
    'Methodology §5 Caution (acrylate/C10-30 alkyl acrylate crosspolymer — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  diazolidinyl:
    'Methodology §5 Caution (diazolidinyl urea — exact string; same Caution as the DMDM / diazolidinyl urea formaldehyde-donor row; not Avoid; locked Sept 15, 2026)',
  tocopherylAcetate:
    'Methodology §5 Caution (tocopheryl acetate — exact INCI; distinct from Cleared mixed tocopherols; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ipbc: 'Methodology §5 Caution (IPBC / iodopropynyl butylcarbamate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  caprylhydroxamic:
    'Methodology §5 Caution (caprylhydroxamic acid — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  acrylateAcrylamide:
    'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ps85: 'Methodology §5 Caution (polysorbate 85 — exact token; distinct numbered ester — do not alias to P80/P20/P60 alone; standalone Caution, not Avoid; locked Sept 15, 2026)',
  retinylPalmitate:
    'Methodology §5 Caution (retinyl palmitate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  horseChestnut:
    'Methodology §5 Caution (horse chestnut / comfrey / zanthoxylum extracts as scent-extract — exact topical scent-extract tokens; extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026)',
  chamomile: `Methodology §5 Caution (topical botanical extracts/oils — chamomile as scent-extract; extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026). ${SCENT_EXTRACT_TAP}`,
  calendula: `Methodology §5 Caution (topical botanical extracts/oils — calendula extract or flower oil as scent-extract; extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026). ${SCENT_EXTRACT_TAP}`,
  trolamine:
    'Methodology §5 Caution (TEA / trolamine as inactive — not the salicylate active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  tetrasodiumEdta:
    'Methodology §5 Caution (Tetrasodium EDTA — exact INCI; distinct from Cleared disodium EDTA; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ethoxydiglycol:
    'Methodology §5 Caution (DEGEE / ethoxydiglycol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  aluminumGlycinate:
    'Methodology §5 Caution (aluminum glycinate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  aluminumHydroxide:
    'Methodology §5 Caution (aluminum hydroxide (topical / patch) — exact inactive token; not the oral antacid active-safety cap row; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmdm: 'Methodology §5 Caution (DMDM hydantoin / diazolidinyl urea — formaldehyde-donor; Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid — topical gel polymer; standalone Caution, not Avoid; locked Sept 15, 2026)',
  cholecalciferol:
    'Methodology §5 Cleared (Cholecalciferol — vitamin D3 as inactive; exact token when labeled as inactive; locked Sept 15, 2026)',
  emu: `Methodology §5 Cleared (emu oil as topical fill — named single oil as topical fill; locked Sept 15, 2026). ${EMU_TAP}`,
  mineralOil:
    'Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; tap: not an oral oil; locked Sept 15, 2026)',
  hvo: `Methodology §5 Cleared (hydrogenated vegetable oil as cream fill — exact token as cream fill; tap fill ≠ gummy High; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  glycerylMonoSe:
    'Methodology §5 Cleared (glyceryl monostearate SE — exact words; alias of glyceryl stearate SE; both strings written; locked Sept 15, 2026)',
  glycerylCaprylate:
    'Methodology §5 Cleared (glyceryl caprylate — exact INCI; locked Sept 15, 2026)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate — topical emollient / stearate cousin; locked Sept 15, 2026). Printed JointFlex spelling Glycerol Stearate is the same locked glyceryl stearate token (INCI synonym; structured SPL maps to glyceryl monostearate).',
  c1215:
    'Methodology §5 Cleared (C12-15 alkyl benzoate — exact INCI; locked Sept 15, 2026)',
  dimethiconolStearate:
    'Methodology §5 Cleared (dimethiconol stearate — exact INCI; locked Sept 15, 2026)',
  methylGluceth20:
    'Methodology §5 Cleared (methyl gluceth-20 — exact INCI; locked Sept 15, 2026)',
  methylGlucoseSesqui:
    'Methodology §5 Cleared (methyl glucose sesquistearate — exact INCI; distinct from Cleared methyl glucose dioleate; locked Sept 15, 2026)',
  potassiumCarbomer:
    'Methodology §5 Cleared (potassium carbomer — exact INCI; distinct from the carbomer family row — exact words added; locked Sept 15, 2026)',
  panthenol:
    'Methodology §5 Cleared (panthenol — exact INCI; locked Sept 15, 2026)',
  ipm: 'Methodology §5 Cleared (glycol stearate, isopropyl myristate, stearyl heptanoate — topical emollients; locked Sept 15, 2026)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide (pH adjuster) — already those exact words on §5)',
  msm: 'Methodology §5 Cleared (MSM / methylsulfonylmethane / dimethyl sulfone as labeled inactive — exact token; locked Sept 15, 2026)',
  glucosamine:
    'Methodology §5 Cleared (glucosamine / glucosamine sulfate as labeled inactive — exact token; locked Sept 15, 2026)',
  chondroitin:
    'Methodology §5 Cleared (chondroitin sulfate as labeled inactive — exact token; locked Sept 15, 2026)',
  castor:
    'Methodology §5 Cleared (castor oil, polyoxyl castor oil derivatives — oral/topical use; locked v1.6)',
  urea: 'Methodology §5 Cleared (urea (topical) — locked Sept 15, 2026)',
  oleyl: 'Methodology §5 Cleared (oleyl alcohol — exact INCI; locked Sept 15, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer / carbomer copolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  allantoin:
    'Methodology §5 Cleared (allantoin — topical soother; locked Sept 15, 2026)',
  tartaric:
    'Methodology §5 Cleared (tartaric acid — organic acid with citric; locked Sept 15, 2026)',
  dimethicone:
    'Methodology §5 Cleared (dimethicone / dimethicone copolyol — locked Sept 14, 2026)',
  disodiumEdta:
    'Methodology §5 Cleared (disodium EDTA / edetate disodium — TRACE preservative/stabilizer; locked v1.6)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  stearate:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate — stearate-family lubricant)',
  celluloseGum:
    'Methodology §5 Cleared (microcrystalline cellulose, croscarmellose sodium, cellulose gum, powdered cellulose, capsule cellulose)',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate)',
  cetylAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol — fatty alcohols; cetyl alcohol sits on this fatty-alcohol family)',
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
  jointflex: 'b82ec69c-bd00-400b-bd94-ac15fb620f9b',
  topricin: '53f5778f-ab62-4dda-9bd9-8cc7fdd69d1e',
  ha2zNap: '14554f05-14e1-4c52-99ce-94561c42c0da',
  teemofeDf: '3875bde5-2e1a-5fdf-e063-6294a90a3c0d',
} as const;

const ID = {
  turmeric: 'amazon-elements-turmeric-complex',
  jointflex: 'jointflex-pain-relief-cream',
  topricin: 'topricin-pain-relief-cream',
  blueEmu: 'blue-emu-original',
  teemofe: 'teemofe-lidocaine-4-patch',
  ha2zNap: 'healtha2z-naproxen-220-300',
} as const;

const CITE = {
  turmeric:
    'Founder carton / photo OI for Amazon Elements Turmeric Complex: HPMC named + microcrystalline cellulose + magnesium stearate + silicon dioxide. Labeled actives: turmeric root extract (400 mg / 316 mg curcumin) + organic ginger root powder (140 mg) + black pepper fruit extract. Do not reuse the old harvest that refused “Vegetable Capsule” — founder says HPMC is named.',
  jointflex:
    'jointflex.com / DailyMed setid b82ec69c-bd00-400b-bd94-ac15fb620f9b (NDC 72927-904) printed Drug Facts inactive: Acetylated Lanolin, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Aloe Vera, C12-15 Alkyl Benzoate, Chondroitin Sulfate, Diazolidinyl Urea, Dimethicone, Dimethiconol Stearate, Disodium EDTA, dl Panthenol, Glucosamine Sulfate, Glycerin, Glycerol Stearate, Glycosaminoglycans, Hydroxylated Lanolin, Hydroxypropyl methycellulose, Iodopropynyl Butylcarbamate, Methyl Gluceth-20, Methyl Glucose Sesquistearate, Peppermint Oil, Polysorbate 20, Potassium Carbomer, Purified Water, Tocopheryl Acetate (Vitamin E)',
  topricin:
    'topricin.com Pain Relief Cream / Classic current OI (https://www.topricin.com/products/topricin-classic-4-oz) + DailyMed setid 53f5778f-ab62-4dda-9bd9-8cc7fdd69d1e printed Drug Facts: Water/Aqua/Eau, Caprylic/Capric Triglyceride, Isopropyl Myristate, Glycerin, Glyceryl Monostearate SE, Steareth-20, Hydrogenated Vegetable Oil, Caprylhydroxamic Acid, Glyceryl Caprylate, Cetyl Alcohol, Carbomer, Sodium Hydroxide',
  blueEmu:
    'Founder jar photo OI for Blue-Emu Original Super Strength (do not use any “no dye” harvest): Water; Emu Oil; Glycerin; Dimethyl Sulfone (MSM); Mineral Oil; Acrylates/Acrylamide Copolymer; Polysorbate 85; Stearic Acid; Cetyl Alcohol; Dimethicone; Cholecalciferol; Tocopheryl Acetate; Retinyl Palmitate; Imidazolidinyl Urea; Aloe Vera Gel; Methylparaben; Propylparaben; Tetrasodium EDTA; Aesculus Hippocastanum (Horse Chestnut) Seed Extract; Anthemis Nobilis Flower Extract; Calendula Officinalis Flower Extract; Symphytum Officinale Root Extract; Zanthoxylum Alatum Fruit Extract; Allantoin; Panthenol; Glucosamine Sulfate; FD&C Blue #1; Triethanolamine; Oleyl Alcohol; Ethoxydiglycol',
  teemofe:
    'Founder carton / Drug Facts OI for Teemofe 4% lidocaine patch: Aluminum Glycinate, Aluminum Hydroxide, Cellulose Gum, DMDM hydantoin, Glycerin, Polyacrylic Acid, Polysorbate 80, Propylene Glycol, Ricinus Communis Seed Oil (castor), Silica, Sodium Polyacrylate, Tartaric Acid, Titanium Dioxide, Urea, Water. Matching printed-DF family DailyMed setid 3875bde5-2e1a-5fdf-e063-6294a90a3c0d (not a Teemofe-branded SPL claim). Backing ignored.',
} as const;

const GENEXA_ES = 'genexa-acetaminophen-es';
const EQUATE_IBU = 'equate-ibuprofen-dye-free';
const OWH = 'oregons-wild-harvest-turmeric';
const ORGANIC_INDIA = 'organic-india-turmeric-formula';
const SPORTS_RESEARCH = 'sports-research-turmeric-curcumin';
const ARNICARE_GEL = 'boiron-arnicare-gel';

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

const TURMERIC_ALTS: CleanAlternative[] = [
  alt(
    OWH,
    'Independently Clean Oregon’s Wild Harvest Turmeric already on main (pullulan capsule only). Form: capsule — labeled, not a hard filter (§6). Same turmeric / curcumin shelf.',
  ),
  alt(
    ORGANIC_INDIA,
    'Independently Clean Organic India Turmeric Formula already on main (organic pullulan only). Form: capsule.',
  ),
  alt(
    SPORTS_RESEARCH,
    'Independently Clean Sports Research Turmeric Curcumin already on main (named coconut-oil softgel fill Cleared; ≠ gummy High). Form: softgel vs capsule — labeled, not a hard filter (§6).',
  ),
];

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine / menthol cream invented.',
  ),
];

export const BATCH57_REFUSED: { sku: string; token: string }[] = [
  {
    sku: 'Penetrex cream (current penetrex.com carton)',
    token: 'Coconut Alkanes',
  },
];

export const BATCH57_PF_REFUSED_UNLOCK: RatingRecord[] = [
  row({
    id: ID.turmeric,
    productName: 'Amazon Elements Turmeric Complex',
    brand: 'Amazon Elements',
    category: PAIN_FEVER,
    formulaId: ID.turmeric,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Turmeric root extract (316 mg curcumin)',
        strength: '400mg',
      },
      { name: 'Organic ginger root powder', strength: '140mg' },
      { name: 'Black pepper fruit extract', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(CITE.turmeric, METH.sio2),
      ),
      flag(
        'Hypromellose (HPMC; vegetable capsule)',
        'cleared',
        labelCite(CITE.turmeric, METH.hpmc),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(CITE.turmeric, METH.stearate),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(CITE.turmeric, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Amazon Elements Turmeric Complex = Caution. Driver is silicon dioxide (0-pt Caution cap). Founder carton / photo OI: HPMC named + microcrystalline cellulose + magnesium stearate + silicon dioxide. Do NOT refuse Vegetable Capsule — founder says HPMC is named on this panel. Ginger and black pepper are labeled actives / botanicals, listed neutrally — this draft grades inactives only and makes no efficacy claim. Do not reuse the old harvest that refused this SKU on “Vegetable Capsule.” No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...AMAZON],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.turmeric} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.jointflex,
    productName: 'JointFlex Pain Relief Cream',
    brand: 'JointFlex',
    category: PAIN_FEVER,
    formulaId: ID.jointflex,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    activeIngredients: [{ name: 'Camphor', strength: '3.2%' }],
    inactiveIngredients: [
      flag(
        'Glycosaminoglycans',
        'cleared',
        labelCite(CITE.jointflex, METH.gag),
      ),
      flag(
        'Acetylated Lanolin',
        'cleared',
        labelCite(CITE.jointflex, METH.acetylatedLanolin),
      ),
      flag(
        'Hydroxylated Lanolin',
        'cleared',
        labelCite(CITE.jointflex, METH.hydroxylatedLanolin),
      ),
      flag(
        'Acrylates/C10-30 Alkyl Acrylate Crosspolymer',
        'cleared',
        labelCite(CITE.jointflex, METH.acrylateC1030),
      ),
      flag(
        'Diazolidinyl Urea',
        'cleared',
        labelCite(CITE.jointflex, METH.diazolidinyl),
      ),
      flag(
        'Tocopheryl Acetate (Vitamin E)',
        'cleared',
        labelCite(CITE.jointflex, METH.tocopherylAcetate),
      ),
      flag(
        'Iodopropynyl Butylcarbamate',
        'cleared',
        labelCite(CITE.jointflex, METH.ipbc),
      ),
      flag(
        'Polysorbate 20',
        'moderate',
        labelCite(CITE.jointflex, METH.ps20),
      ),
      flag(
        'Peppermint Oil',
        'limited',
        labelCite(CITE.jointflex, METH.peppermint),
      ),
      flag(
        'C12-15 Alkyl Benzoate',
        'cleared',
        labelCite(CITE.jointflex, METH.c1215),
      ),
      flag(
        'Dimethiconol Stearate',
        'cleared',
        labelCite(CITE.jointflex, METH.dimethiconolStearate),
      ),
      flag(
        'Glycerol Stearate',
        'cleared',
        labelCite(CITE.jointflex, METH.glycerylStearate),
      ),
      flag(
        'Methyl Gluceth-20',
        'cleared',
        labelCite(CITE.jointflex, METH.methylGluceth20),
      ),
      flag(
        'Methyl Glucose Sesquistearate',
        'cleared',
        labelCite(CITE.jointflex, METH.methylGlucoseSesqui),
      ),
      flag(
        'Potassium Carbomer',
        'cleared',
        labelCite(CITE.jointflex, METH.potassiumCarbomer),
      ),
      flag(
        'dl Panthenol',
        'cleared',
        labelCite(CITE.jointflex, METH.panthenol),
      ),
      flag(
        'Hydroxypropyl methycellulose',
        'cleared',
        labelCite(CITE.jointflex, METH.hpmc),
      ),
      flag(
        'Chondroitin Sulfate',
        'cleared',
        labelCite(CITE.jointflex, METH.chondroitin),
      ),
      flag(
        'Glucosamine Sulfate',
        'cleared',
        labelCite(CITE.jointflex, METH.glucosamine),
      ),
      flag(
        'Dimethicone',
        'cleared',
        labelCite(CITE.jointflex, METH.dimethicone),
      ),
      flag(
        'Disodium EDTA',
        'cleared',
        labelCite(CITE.jointflex, METH.disodiumEdta),
      ),
      flag('Aloe Vera', 'cleared', labelCite(CITE.jointflex, METH.aloe)),
      flag('Glycerin', 'cleared', labelCite(CITE.jointflex, METH.cleared)),
      flag(
        'Purified Water',
        'cleared',
        labelCite(CITE.jointflex, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: JointFlex Pain Relief Cream = Caution. Drivers are Glycosaminoglycans (the PR #104 refuse string; now the locked exact Caution token) + acetylated / hydroxylated lanolin + acrylate/C10-30 alkyl acrylate crosspolymer + diazolidinyl urea + tocopheryl acetate + IPBC (standalone Caution) and polysorbate 20 (Moderate). Peppermint oil is the locked Limited flavor/EO row. DailyMed setid ${SET.jointflex} (NDC 72927-904) printed Drug Facts: Acetylated Lanolin, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Aloe Vera, C12-15 Alkyl Benzoate, Chondroitin Sulfate, Diazolidinyl Urea, Dimethicone, Dimethiconol Stearate, Disodium EDTA, dl Panthenol, Glucosamine Sulfate, Glycerin, Glycerol Stearate, Glycosaminoglycans, Hydroxylated Lanolin, Hydroxypropyl methycellulose, Iodopropynyl Butylcarbamate, Methyl Gluceth-20, Methyl Glucose Sesquistearate, Peppermint Oil, Polysorbate 20, Potassium Carbomer, Purified Water, Tocopheryl Acetate (Vitamin E). Do not re-use the PR #104 refuse. No High. 4 oz + 1 oz pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} ${SCENT_EXTRACT_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'jointflex.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `${CITE.jointflex} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.topricin,
    productName: 'Topricin Pain Relief Cream',
    brand: 'Topricin',
    category: PAIN_FEVER,
    formulaId: ID.topricin,
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
    activeIngredients: [
      { name: 'Aesculus hippocastanum', strength: '6X' },
      { name: 'Arnica montana', strength: '6X' },
      { name: 'Belladonna', strength: '6X' },
      { name: 'Crotalus horridus', strength: '8X' },
      { name: 'Echinacea', strength: '6X' },
      { name: 'Graphites', strength: '6X' },
      { name: 'Heloderma', strength: '8X' },
      { name: 'Lachesis mutus', strength: '8X' },
      { name: 'Naja tripudians', strength: '8X' },
      { name: 'Rhus toxicodendron', strength: '6X' },
      { name: 'Ruta graveolens', strength: '6X' },
    ],
    inactiveIngredients: [
      flag(
        'Steareth-20',
        'cleared',
        labelCite(CITE.topricin, METH.steareth20),
      ),
      flag(
        'Caprylhydroxamic Acid',
        'cleared',
        labelCite(CITE.topricin, METH.caprylhydroxamic),
      ),
      flag(
        'Caprylic/Capric Triglyceride',
        'limited',
        labelCite(CITE.topricin, METH.mctUnlabeled),
      ),
      flag(
        'Glyceryl Monostearate SE',
        'cleared',
        labelCite(CITE.topricin, METH.glycerylMonoSe),
      ),
      flag(
        'Hydrogenated Vegetable Oil',
        'cleared',
        labelCite(CITE.topricin, METH.hvo),
      ),
      flag(
        'Glyceryl Caprylate',
        'cleared',
        labelCite(CITE.topricin, METH.glycerylCaprylate),
      ),
      flag(
        'Isopropyl Myristate',
        'cleared',
        labelCite(CITE.topricin, METH.ipm),
      ),
      flag(
        'Sodium Hydroxide',
        'cleared',
        labelCite(CITE.topricin, METH.naoh),
      ),
      flag('Carbomer', 'cleared', labelCite(CITE.topricin, METH.carbomer)),
      flag(
        'Cetyl Alcohol',
        'cleared',
        labelCite(CITE.topricin, METH.cetylAlcohol),
      ),
      flag('Glycerin', 'cleared', labelCite(CITE.topricin, METH.cleared)),
      flag('Water/Aqua/Eau', 'cleared', labelCite(CITE.topricin, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Topricin Pain Relief Cream = Caution. Drivers are Steareth-20 (the PR #104 refuse string; now the locked exact Caution token) + caprylhydroxamic acid (standalone Caution) and unlabeled MCT / caprylic/capric triglyceride (Limited; coconut not named on that token). Official topricin.com Classic / Pain Relief Cream inactive: Water/Aqua/Eau, Caprylic/Capric Triglyceride, Isopropyl Myristate, Glycerin, Glyceryl Monostearate SE, Steareth-20, Hydrogenated Vegetable Oil, Caprylhydroxamic Acid, Glyceryl Caprylate, Cetyl Alcohol, Carbomer, Sodium Hydroxide. DailyMed setid ${SET.topricin} prints the same current OI. Hydrogenated vegetable oil is the locked cream-fill Cleared token (tap ≠ gummy High). Homeopathic actives listed neutrally — this draft grades inactives only and makes no efficacy claim. Do not re-use the PR #104 refuse. Do not write Topricin Foot Therapy (different OI / Steareth-21). Pack sizes share this formulaId. Ages 2+. ${PARKED_ACTIVES} ${LIMITED_STACK} ${MCT_UNLABELED_TAP} ${CREAM_OIL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'topricin.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [`${CITE.topricin} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.blueEmu,
    productName: 'Blue-Emu Original Super Strength',
    brand: 'Blue-Emu',
    category: PAIN_FEVER,
    formulaId: ID.blueEmu,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    activeIngredients: [
      {
        name: 'Emu oil / MSM / glucosamine (labeled formula; no Drug Facts monograph active on the founder jar)',
        strength: 'topical cream',
      },
    ],
    inactiveIngredients: [
      flag('FD&C Blue #1', 'high', labelCite(CITE.blueEmu, METH.dyes)),
      flag('Methylparaben', 'high', labelCite(CITE.blueEmu, METH.parabens)),
      flag('Propylparaben', 'high', labelCite(CITE.blueEmu, METH.parabens)),
      flag(
        'Acrylates/Acrylamide Copolymer',
        'cleared',
        labelCite(CITE.blueEmu, METH.acrylateAcrylamide),
      ),
      flag(
        'Polysorbate 85',
        'cleared',
        labelCite(CITE.blueEmu, METH.ps85),
      ),
      flag(
        'Tocopheryl Acetate',
        'cleared',
        labelCite(CITE.blueEmu, METH.tocopherylAcetate),
      ),
      flag(
        'Retinyl Palmitate',
        'cleared',
        labelCite(CITE.blueEmu, METH.retinylPalmitate),
      ),
      flag(
        'Aesculus Hippocastanum (Horse Chestnut) Seed Extract',
        'cleared',
        labelCite(CITE.blueEmu, METH.horseChestnut),
      ),
      flag(
        'Symphytum Officinale Root Extract',
        'cleared',
        labelCite(CITE.blueEmu, METH.horseChestnut),
      ),
      flag(
        'Zanthoxylum Alatum Fruit Extract',
        'cleared',
        labelCite(CITE.blueEmu, METH.horseChestnut),
      ),
      flag(
        'Anthemis Nobilis Flower Extract',
        'cleared',
        labelCite(CITE.blueEmu, METH.chamomile),
      ),
      flag(
        'Calendula Officinalis Flower Extract',
        'cleared',
        labelCite(CITE.blueEmu, METH.calendula),
      ),
      flag(
        'Tetrasodium EDTA',
        'cleared',
        labelCite(CITE.blueEmu, METH.tetrasodiumEdta),
      ),
      flag(
        'Triethanolamine',
        'cleared',
        labelCite(CITE.blueEmu, METH.trolamine),
      ),
      flag(
        'Ethoxydiglycol',
        'cleared',
        labelCite(CITE.blueEmu, METH.ethoxydiglycol),
      ),
      flag(
        'Cholecalciferol',
        'cleared',
        labelCite(CITE.blueEmu, METH.cholecalciferol),
      ),
      flag('Emu Oil', 'cleared', labelCite(CITE.blueEmu, METH.emu)),
      flag(
        'Mineral Oil',
        'cleared',
        labelCite(CITE.blueEmu, METH.mineralOil),
      ),
      flag(
        'Dimethyl Sulfone (MSM)',
        'cleared',
        labelCite(CITE.blueEmu, METH.msm),
      ),
      flag(
        'Glucosamine Sulfate',
        'cleared',
        labelCite(CITE.blueEmu, METH.glucosamine),
      ),
      flag(
        'Oleyl Alcohol',
        'cleared',
        labelCite(CITE.blueEmu, METH.oleyl),
      ),
      flag(
        'Dimethicone',
        'cleared',
        labelCite(CITE.blueEmu, METH.dimethicone),
      ),
      flag('Allantoin', 'cleared', labelCite(CITE.blueEmu, METH.allantoin)),
      flag('Panthenol', 'cleared', labelCite(CITE.blueEmu, METH.panthenol)),
      flag('Aloe Vera Gel', 'cleared', labelCite(CITE.blueEmu, METH.aloe)),
      flag(
        'Cetyl Alcohol',
        'cleared',
        labelCite(CITE.blueEmu, METH.cetylAlcohol),
      ),
      flag(
        'Stearic Acid',
        'cleared',
        labelCite(CITE.blueEmu, METH.stearate),
      ),
      flag('Glycerin', 'cleared', labelCite(CITE.blueEmu, METH.cleared)),
      flag('Water', 'cleared', labelCite(CITE.blueEmu, METH.cleared)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Blue-Emu Original Super Strength = Avoid. Driver is FD&C Blue #1 on the founder jar photo (High — do NOT use any “no dye” harvest). Founder jar also prints methylparaben + propylparaben (High in every form). Cholecalciferol as inactive is now the locked Cleared token (the PR #104 refuse string). ${EMU_TAP} Founder jar OI: Water; Emu Oil; Glycerin; Dimethyl Sulfone (MSM); Mineral Oil; Acrylates/Acrylamide Copolymer; Polysorbate 85; Stearic Acid; Cetyl Alcohol; Dimethicone; Cholecalciferol; Tocopheryl Acetate; Retinyl Palmitate; Imidazolidinyl Urea; Aloe Vera Gel; Methylparaben; Propylparaben; Tetrasodium EDTA; Aesculus Hippocastanum (Horse Chestnut) Seed Extract; Anthemis Nobilis Flower Extract; Calendula Officinalis Flower Extract; Symphytum Officinale Root Extract; Zanthoxylum Alatum Fruit Extract; Allantoin; Panthenol; Glucosamine Sulfate; FD&C Blue #1; Triethanolamine; Oleyl Alcohol; Ethoxydiglycol. Imidazolidinyl urea stays parked (remaining formaldehyde-releaser; not graded; not an invented §5 class; not the Avoid driver). Later paraben-free / phenoxyethanol harvests are not this row. No Drug Facts monograph active on this jar. Pack sizes of this founder-jar OI share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${SCENT_EXTRACT_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'blue-emu.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [`${CITE.blueEmu} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.teemofe,
    productName: 'Teemofe Lidocaine 4% Pain Relief Patch',
    brand: 'Teemofe',
    category: PAIN_FEVER,
    formulaId: ID.teemofe,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Titanium Dioxide', 'high', labelCite(CITE.teemofe, METH.tio2)),
      flag('Polysorbate 80', 'moderate', labelCite(CITE.teemofe, METH.ps80)),
      flag(
        'Aluminum Glycinate',
        'cleared',
        labelCite(CITE.teemofe, METH.aluminumGlycinate),
      ),
      flag(
        'Aluminum Hydroxide',
        'cleared',
        labelCite(CITE.teemofe, METH.aluminumHydroxide),
      ),
      flag('DMDM hydantoin', 'cleared', labelCite(CITE.teemofe, METH.dmdm)),
      flag(
        'Polyacrylic Acid',
        'cleared',
        labelCite(CITE.teemofe, METH.polyacrylate),
      ),
      flag(
        'Sodium Polyacrylate',
        'cleared',
        labelCite(CITE.teemofe, METH.polyacrylate),
      ),
      flag('Silica', 'cleared', labelCite(CITE.teemofe, METH.sio2)),
      flag(
        'Ricinus Communis Seed Oil (castor)',
        'cleared',
        labelCite(CITE.teemofe, METH.castor),
      ),
      flag('Urea', 'cleared', labelCite(CITE.teemofe, METH.urea)),
      flag(
        'Cellulose Gum',
        'cleared',
        labelCite(CITE.teemofe, METH.celluloseGum),
      ),
      flag('Tartaric Acid', 'cleared', labelCite(CITE.teemofe, METH.tartaric)),
      flag(
        'Propylene Glycol',
        'cleared',
        labelCite(CITE.teemofe, METH.pgTopical),
      ),
      flag('Glycerin', 'cleared', labelCite(CITE.teemofe, METH.cleared)),
      flag('Water', 'cleared', labelCite(CITE.teemofe, METH.cleared)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Teemofe 4% lidocaine patch = Avoid. Driver is titanium dioxide (High). Founder carton / Drug Facts OI: Aluminum Glycinate, Aluminum Hydroxide, Cellulose Gum, DMDM hydantoin, Glycerin, Polyacrylic Acid, Polysorbate 80, Propylene Glycol, Ricinus Communis Seed Oil (castor), Silica, Sodium Polyacrylate, Tartaric Acid, Titanium Dioxide, Urea, Water. Do not refuse “no OI.” Silica is the locked SiO2 / silica Caution alias (0-pt cap; not the Avoid driver) — do not alias to the new exact-word silicon token. Aluminum glycinate / aluminum hydroxide (topical/patch) / DMDM hydantoin / polyacrylate are standalone Caution. Castor oil + urea (topical) are Cleared. Backing ignored. DF graded. Matching printed-DF family DailyMed setid ${SET.teemofeDf} is cited only to complete the panel — not a Teemofe-branded SPL claim. Do NOT clone HealthWise / WELMATE / Amazon Basics / Sumifun lidocaine rows already on main (different OI). Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [`${CITE.teemofe} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.ha2zNap,
    productName: 'HealthA2Z Naproxen Sodium 220 mg (300-ct)',
    brand: 'HealthA2Z',
    category: PAIN_FEVER,
    formulaId: ID.ha2zNap,
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag(
        'FD&C blue #2 aluminum lake',
        'high',
        dailymed(SET.ha2zNap, METH.dyes),
      ),
      flag('Titanium dioxide', 'high', dailymed(SET.ha2zNap, METH.tio2)),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed(SET.ha2zNap, METH.peg),
      ),
      flag('silicon', 'cleared', dailymed(SET.ha2zNap, METH.silicon)),
      flag('Hypromellose', 'cleared', dailymed(SET.ha2zNap, METH.hpmc)),
      flag(
        'Sodium starch glycolate',
        'cleared',
        dailymed(SET.ha2zNap, METH.ssg),
      ),
      flag('Stearic acid', 'cleared', dailymed(SET.ha2zNap, METH.stearate)),
      flag(
        'Magnesium stearate',
        'cleared',
        dailymed(SET.ha2zNap, METH.stearate),
      ),
      cleared(SET.ha2zNap, 'Corn starch'),
      cleared(SET.ha2zNap, 'Croscarmellose sodium'),
      cleared(SET.ha2zNap, 'Microcrystalline cellulose'),
      cleared(SET.ha2zNap, 'Povidone'),
      cleared(SET.ha2zNap, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: HealthA2Z Naproxen Sodium 220 300-ct = Avoid. Drivers are FD&C Blue #2 aluminum lake + titanium dioxide (High). Founder OI: corn starch, Blue 2 lake, HPMC, MCC, PEG, povidone, SSG, stearic acid, TiO2. DailyMed setid ${SET.ha2zNap} (Allegiant NDC 69168-395; 300-ct is 69168-395-17) printed Drug Facts: FD&C blue #2 aluminum lake, hypromellose, microcrystalline cellulose, polyethylene glycol, povidone, titanium dioxide. May contain: corn starch, croscarmellose sodium, magnesium stearate, purified water, silicon. Printed “silicon” (exact word) uses the new Caution silicon token — do not alias to silica / silicon dioxide (the PR #104 refuse string). PEG is Moderate (not needed to reach Avoid). Do NOT reuse timecap-naproxen-220 or HealthA2Z IBU 382 / 335 already on main. 50-ct / 10-ct pack twins on this setid share this formulaId. Ages 12+. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `Founder OI + DailyMed setid ${SET.ha2zNap} (HealthA2Z / Allegiant Naproxen Sodium 220 NDC 69168-395, 300-ct 69168-395-17) — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

const BY_ID = Object.fromEntries(
  BATCH57_PF_REFUSED_UNLOCK.map((record) => [record.id, record]),
);

if (BATCH57_PF_REFUSED_UNLOCK.length !== 6) {
  throw new Error('batch 57 must write exactly 6 Search rows');
}
if (BATCH57_PF_REFUSED_UNLOCK.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 57 Clean tally is 0');
}
if (BATCH57_PF_REFUSED_UNLOCK.filter((r) => r.verdict === 'caution').length !== 3) {
  throw new Error('batch 57 Caution tally is 3');
}
if (BATCH57_PF_REFUSED_UNLOCK.filter((r) => r.verdict === 'avoid').length !== 3) {
  throw new Error('batch 57 Avoid tally is 3');
}
if (BATCH57_PF_REFUSED_UNLOCK.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 57 stays on Pain & Fever');
}
if (BATCH57_PF_REFUSED_UNLOCK.some((record) => record.barcode)) {
  throw new Error('batch 57 must not invent barcodes');
}
if (
  BATCH57_PF_REFUSED_UNLOCK.some(
    (record) => record.recordStatus !== UNVERIFIED,
  )
) {
  throw new Error('batch 57 recordStatus must stay unverified');
}

const TURMERIC = BY_ID[ID.turmeric];
const JOINTFLEX = BY_ID[ID.jointflex];
const TOPRICIN = BY_ID[ID.topricin];
const BLUE_EMU = BY_ID[ID.blueEmu];
const TEEMOFE = BY_ID[ID.teemofe];
const HA2Z_NAP = BY_ID[ID.ha2zNap];

const FORBIDDEN_FORMULA_IDS = [
  'timecap-naproxen-220',
  'healtha2z-ibuprofen-200-382',
  'healtha2z-ibuprofen-200-335',
  'healtha2z-childrens-apap-chew',
  'amazon-basics-lidocaine-4-patch',
  'healthwise-lidocaine-4-patch',
  'welmate-lidocaine-4-patch-parabens',
  'welmate-lidocaine-4-patch-ethylhexyl',
  'sumifun-lidocaine-4-patch',
  'goodsense-naproxen-220',
  'stopain-extra-strength-roll-on',
  'flexall-max-strength-gel',
  'timecap-ibuprofen-200',
  'mentholatum-original',
  'australian-dream-arthritis-cream',
];

if (
  BATCH57_PF_REFUSED_UNLOCK.some((record) =>
    FORBIDDEN_FORMULA_IDS.includes(record.formulaId ?? ''),
  )
) {
  throw new Error('batch 57 must not reuse batch 56 or already-on-main formulaIds');
}
if (HA2Z_NAP?.formulaId === 'timecap-naproxen-220') {
  throw new Error('HealthA2Z naproxen must not reuse TIME-Cap naproxen formulaId');
}
if (TEEMOFE?.formulaId === 'sumifun-lidocaine-4-patch') {
  throw new Error('Teemofe must not reuse Sumifun lidocaine formulaId');
}
if (TEEMOFE?.formulaId === 'amazon-basics-lidocaine-4-patch') {
  throw new Error('Teemofe must not reuse Amazon Basics lidocaine formulaId');
}
if (
  !TURMERIC?.inactiveIngredients.some((item) =>
    /hypromellose|hpmc/i.test(item.name),
  )
) {
  throw new Error('Amazon Elements turmeric must list named HPMC');
}
if (
  TURMERIC?.inactiveIngredients.some((item) =>
    item.name.toLowerCase() === 'vegetable capsule',
  )
) {
  throw new Error('Amazon Elements turmeric must not refuse Vegetable Capsule');
}
if (!JOINTFLEX?.inactiveIngredients.some((item) => item.name === 'Glycosaminoglycans')) {
  throw new Error('JointFlex must list exact Glycosaminoglycans');
}
if (!TOPRICIN?.inactiveIngredients.some((item) => item.name === 'Steareth-20')) {
  throw new Error('Topricin must list exact Steareth-20');
}
if (!BLUE_EMU?.inactiveIngredients.some((item) => item.name === 'FD&C Blue #1')) {
  throw new Error('Blue-Emu must list founder-jar FD&C Blue #1');
}
if (!BLUE_EMU?.inactiveIngredients.some((item) => item.name === 'Cholecalciferol')) {
  throw new Error('Blue-Emu must list exact Cholecalciferol');
}
if (
  BLUE_EMU?.inactiveIngredients.some((item) =>
    /no dye|dye-free|dye free/i.test(item.name),
  )
) {
  throw new Error('Blue-Emu must not use a no-dye harvest');
}
if (!TEEMOFE?.inactiveIngredients.some((item) => /titanium dioxide/i.test(item.name))) {
  throw new Error('Teemofe must list exact titanium dioxide');
}
if (!TEEMOFE?.inactiveIngredients.some((item) => item.name === 'Silica')) {
  throw new Error('Teemofe must list exact silica (not silicon)');
}
if (!HA2Z_NAP?.inactiveIngredients.some((item) => item.name === 'silicon')) {
  throw new Error('HealthA2Z naproxen must list exact-word silicon');
}
if (
  HA2Z_NAP?.inactiveIngredients.some((item) =>
    item.name.toLowerCase() === 'silica' || item.name.toLowerCase() === 'silicon dioxide',
  )
) {
  throw new Error('HealthA2Z naproxen must not alias silicon to silica / SiO2');
}
if (!HA2Z_NAP?.inactiveIngredients.some((item) => /blue #2/i.test(item.name))) {
  throw new Error('HealthA2Z naproxen must list Blue 2 lake');
}
if (
  BATCH57_PF_REFUSED_UNLOCK.some((record) =>
    record.inactiveIngredients.some((item) => /sprouts/i.test(item.name)),
  )
) {
  throw new Error('batch 57 must not touch Sprouts');
}
if (BATCH57_REFUSED.some((item) => !item.token)) {
  throw new Error('every refused row must quote a token');
}
if (BATCH57_REFUSED.length !== 1) {
  throw new Error('batch 57 must quote exactly 1 refused SKU');
}
if (BATCH57_REFUSED[0]?.token !== 'Coconut Alkanes') {
  throw new Error('Penetrex refuse token must stay Coconut Alkanes');
}

// Verdict tally (6 records): Clean 0 · Caution 3 · Avoid 3
// Refused still-missing exact §5: Coconut Alkanes (Penetrex).
// Founder-OI overrides: Amazon Elements HPMC named; Blue-Emu FD&C
// Blue #1 jar (not a no-dye harvest); HealthA2Z printed silicon;
// Teemofe founder carton OI (not “no OI”).
