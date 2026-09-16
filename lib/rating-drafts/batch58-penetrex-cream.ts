// DRAFT / not verified / batch 58 Penetrex cream WRITE /
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
// painFeverPicks.ts. Do NOT rewrite batches 41–57 already on
// main except this new Penetrex row.
//
// GATE: write the PR #105 refused SKU only when every current
// founder OI token matches an exact Additive / “also appears as”
// / locked exact-INCI line. Prefer current penetrex.com /
// carton Ingredients (Cream) over the old refuse harvest
// (side-effects FAQ without Coconut Alkanes / with IPBC).
//
// NEW §5 locks that unlock this (already on MAIN): Coconut
// Alkanes Cleared (exact; do not alias to C15-19 alkane);
// Pyridoxine HCl as inactive Cleared; Tea Tree Leaf Oil /
// Melaleuca Alternifolia Leaf Oil Caution scent/EO (both
// strings written); Steareth-20 Caution (already used on
// Topricin in batch 57).
//
// TALLY (unverified drafts in THIS file): 1 row — Clean 0 /
// Caution 1 / Avoid 0.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID /
// lidocaine / menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Tylenol / Advil / Aleve / Motrin / Bayer / Excedrin / Goody’s /
// Icy Hot family / Voltaren / Biofreeze family / Thrive set /
// Boiron / Genexa / MegaFood / Hyland’s / MediNatura /
// Nature’s Way / Basic Care + Basics already on main /
// Asutra / JointFlex / Topricin / Blue-Emu / Australian Dream /
// batches 41–57.
//
// WRITTEN from founder OI (current penetrex.com Ingredients
// (Cream) — not the old refuse harvest):
// - Penetrex Pain Relief Cream — Caution. Drivers are
//   Steareth-20 / PEG-100 Stearate (PEG) / DMDM hydantoin /
//   phenoxyethanol / tea tree (Melaleuca Alternifolia Leaf
//   Oil). Named sunflower seed oil is cream fill Cleared
//   (oil BASE/FILL tap ≠ gummy High). Coconut Alkanes is
//   the locked exact Cleared token (do not alias to C15-19
//   alkane). Pyridoxine HCl as inactive is Cleared. No High.
//   2 oz + 4 oz cream pack sizes share this formulaId.
//   Do not write the gel / warming / hemp / advanced menthol
//   / morning / night SKUs (different OI).
//
// REFUSED: none.

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

const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this cream / topical fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const SCENT_EXTRACT_TAP =
  'Named single oil as BASE/FILL is Cleared. Botanical EXTRACT or oil used as scent in a blend is Caution (fragrance/EO line).';

const ALKANE_TAP =
  'Coconut Alkanes is the locked exact Cleared cream-emollient alkane. Same job as C15-19 alkane. Distinct token — do not alias.';

const METH = {
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate; ethylene-oxide / 1,4-dioxane)',
  peg100:
    'Methodology §5 Caution (PEG-100 stearate — exact INCI; distinct from the PEG Moderate family row — exact words added; standalone Caution, not Avoid; locked Sept 15, 2026). PEG-stearate also sits on the Moderate PEG family.',
  peppermint:
    'Methodology §5 Limited-risk (peppermint oil / orange essential oil as flavor — flavor/EO line). Peppermint oil is the locked flavor/EO Limited row. Not gummy High. Not Avoid.',
  steareth20:
    'Methodology §5 Caution (Steareth-20 — exact INCI; distinct from steareth-2 / steareth-21 and from unspecified steareth; standalone Caution, not Avoid; locked Sept 15, 2026)',
  teaTree: `Methodology §5 Caution (Tea Tree Leaf Oil / Melaleuca Alternifolia Leaf Oil — scent/EO rule; exact tokens; both strings written; standalone Caution, not Avoid; locked Sept 15, 2026). ${SCENT_EXTRACT_TAP}`,
  dmdm: 'Methodology §5 Caution (DMDM hydantoin / diazolidinyl urea — formaldehyde-donor; Caution, not Avoid; locked Sept 15, 2026)',
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  ceteareth20:
    'Methodology §5 Caution (ceteareth-20 — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ethoxydiglycol:
    'Methodology §5 Caution (DEGEE / ethoxydiglycol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ampsVp:
    'Methodology §5 Caution (acrylamide / sodium acryloyldimethyltaurate copolymer (AMPS); vinyl caprolactam / vinylpyrrolidone copolymer; acrylate / acrylamide copolymers not already locked — Ammonium Acryloyldimethyltaurate/VP Copolymer sits on this AMPS / VP row; standalone Caution, not Avoid; locked Sept 15, 2026)',
  arnica: `Methodology §5 Caution (topical botanical extracts/oils — arnica as scent-extract; extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026). ${SCENT_EXTRACT_TAP}`,
  boswellia: `Methodology §5 Caution (topical botanical extracts/oils — boswellia resin extract / boswellia oil as scent-extract; clove oil, boswellia oil, thymus / flower oils as lotion scent; extract/scent rule; standalone Caution, not Avoid; locked Sept 15, 2026). ${SCENT_EXTRACT_TAP}`,
  camphorInactive:
    'Methodology §5 Caution (camphor / dl-camphor as inactive — exact token when listed as inactive; distinct from parked camphor-as-active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  coconutAlkanes: `Methodology §5 Cleared (Coconut Alkanes — exact INCI; Cleared cream emollient alkane; same job as C15-19 alkane; distinct token — do not alias; locked Sept 15, 2026). ${ALKANE_TAP}`,
  pyridoxine:
    'Methodology §5 Cleared (Pyridoxine HCl — vitamin B6 as inactive; exact token when labeled as inactive; locked Sept 15, 2026)',
  sunflower: `Methodology §5 Cleared (named single oil as the cream BASE/FILL; sunflower seed oil is the cream vehicle, not gummy High; safflower / soybean cream-base neighborhood; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  shea: `Methodology §5 Cleared (shea butter / coconut oil / sweet almond oil in cream or topical — named single oil/butter as the cream vehicle; not gummy High; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate / glyceryl monostearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  cetylEsters:
    'Methodology §5 Cleared (cetyl esters wax, emulsifying wax — wax family; locked Sept 15, 2026)',
  dimethicone:
    'Methodology §5 Cleared (dimethicone / dimethicone copolyol — locked Sept 14, 2026)',
  stearate:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate — stearate-family lubricant)',
  msm: 'Methodology §5 Cleared (MSM / methylsulfonylmethane / dimethyl sulfone as labeled inactive — exact token; locked Sept 15, 2026)',
  glucosamine:
    'Methodology §5 Cleared (glucosamine / glucosamine sulfate as labeled inactive — exact token; locked Sept 15, 2026)',
  choline:
    'Methodology §5 Cleared (choline bitartrate — exact INCI; locked Sept 15, 2026)',
  methylGluceth20:
    'Methodology §5 Cleared (methyl gluceth-20 — exact INCI; locked Sept 15, 2026)',
  cetylMyristoleate:
    'Methodology §5 Cleared (cetyl myristoleate — exact INCI; locked Sept 15, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
  tocopherol:
    'Methodology §5 Cleared (mixed tocopherols / tocopherol as antioxidants — locked v1.6). Distinct from Caution tocopheryl acetate.',
  dipotassium:
    'Methodology §5 Cleared (dipotassium glycyrrhizinate — exact INCI; locked Sept 15, 2026)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol — fatty alcohols; cetyl alcohol sits on this fatty-alcohol family)',
  cocoCaprylate:
    'Methodology §5 Cleared (coco-caprylate/caprate — exact INCI; distinct from cocoyl caprylocaprate; locked Sept 15, 2026)',
  cleared: 'Methodology §5 Cleared',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
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

const ID = {
  penetrex: 'penetrex-pain-relief-cream',
} as const;

const CITE = {
  penetrex:
    'Founder OI — current penetrex.com Ingredients (Cream) on https://penetrex.com/products/penetrex-2-oz (same list on the 4 oz cream PDP). Do NOT use the old side-effects FAQ harvest (no Coconut Alkanes / adds IPBC). Printed Ingredients (Cream): Water (Aqua), Arnica Montana Flower Extract (and) Glycerin, Coconut Alkanes, Sunflower (Helianthus Annuus) Seed Oil, Glyceryl Stearate, PEG-100 Stearate, Cetyl Esters, Dimethicone, Stearic Acid, Ammonium Acryloyldimethyltaurate/VP Copolymer, Steareth-20, Pyridoxine HCl (Vitamin B6), Methylsulfonyl Methane (MSM/DMSO2), Glucosamine HCl, Choline Bitartrate, Ethoxydiglycol, Methyl Gluceth-20, Cetyl Myristoleate, Aloe Vera (Aloe Barbadensis) Leaf Juice, Shea Butter (Butyrospermum Parkii) Extract, Frankincense (Boswellia Serrata) Oil, Peppermint (Mentha Piperita) Oil, Camphor, Tea Tree (Melaleuca Alternifolia) Leaf Oil, Tocopherol (Vitamin E), Dipotassium Glycyrrhizinate, Phenoxyethanol, DMDM Hydantoin, Ceteareth-20, Cetearyl Alcohol, Coco-Caprylate/Caprate, Glyceryl Stearates',
} as const;

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    'boiron-arnicare-gel',
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine / menthol cream invented.',
  ),
];

export const BATCH58_REFUSED: { sku: string; token: string }[] = [];

export const BATCH58_PENETREX_CREAM: RatingRecord[] = [
  row({
    id: ID.penetrex,
    productName: 'Penetrex Pain Relief Cream',
    brand: 'Penetrex',
    category: PAIN_FEVER,
    formulaId: ID.penetrex,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    activeIngredients: [
      { name: 'Arnica montana flower extract', strength: 'labeled' },
      { name: 'Pyridoxine HCl (Vitamin B6)', strength: 'labeled' },
      { name: 'Methylsulfonylmethane (MSM)', strength: 'labeled' },
      { name: 'Boswellia serrata (frankincense) oil', strength: 'labeled' },
    ],
    inactiveIngredients: [
      flag(
        'Steareth-20',
        'cleared',
        labelCite(CITE.penetrex, METH.steareth20),
      ),
      flag(
        'PEG-100 Stearate',
        'moderate',
        labelCite(CITE.penetrex, `${METH.peg} ${METH.peg100}`),
      ),
      flag('DMDM Hydantoin', 'cleared', labelCite(CITE.penetrex, METH.dmdm)),
      flag(
        'Phenoxyethanol',
        'cleared',
        labelCite(CITE.penetrex, METH.phenoxy),
      ),
      flag(
        'Tea Tree (Melaleuca Alternifolia) Leaf Oil',
        'cleared',
        labelCite(CITE.penetrex, METH.teaTree),
      ),
      flag(
        'Ceteareth-20',
        'cleared',
        labelCite(CITE.penetrex, METH.ceteareth20),
      ),
      flag(
        'Ethoxydiglycol',
        'cleared',
        labelCite(CITE.penetrex, METH.ethoxydiglycol),
      ),
      flag(
        'Ammonium Acryloyldimethyltaurate/VP Copolymer',
        'cleared',
        labelCite(CITE.penetrex, METH.ampsVp),
      ),
      flag(
        'Arnica Montana Flower Extract',
        'cleared',
        labelCite(CITE.penetrex, METH.arnica),
      ),
      flag(
        'Frankincense (Boswellia Serrata) Oil',
        'cleared',
        labelCite(CITE.penetrex, METH.boswellia),
      ),
      flag(
        'Camphor',
        'cleared',
        labelCite(CITE.penetrex, METH.camphorInactive),
      ),
      flag(
        'Peppermint (Mentha Piperita) Oil',
        'limited',
        labelCite(CITE.penetrex, METH.peppermint),
      ),
      flag(
        'Coconut Alkanes',
        'cleared',
        labelCite(CITE.penetrex, METH.coconutAlkanes),
      ),
      flag(
        'Pyridoxine HCl (Vitamin B6)',
        'cleared',
        labelCite(CITE.penetrex, METH.pyridoxine),
      ),
      flag(
        'Sunflower (Helianthus Annuus) Seed Oil',
        'cleared',
        labelCite(CITE.penetrex, METH.sunflower),
      ),
      flag(
        'Shea Butter (Butyrospermum Parkii) Extract',
        'cleared',
        labelCite(CITE.penetrex, METH.shea),
      ),
      flag(
        'Glyceryl Stearate',
        'cleared',
        labelCite(CITE.penetrex, METH.glycerylStearate),
      ),
      flag(
        'Glyceryl Stearates',
        'cleared',
        labelCite(CITE.penetrex, METH.glycerylStearate),
      ),
      flag(
        'Cetyl Esters',
        'cleared',
        labelCite(CITE.penetrex, METH.cetylEsters),
      ),
      flag(
        'Dimethicone',
        'cleared',
        labelCite(CITE.penetrex, METH.dimethicone),
      ),
      flag(
        'Stearic Acid',
        'cleared',
        labelCite(CITE.penetrex, METH.stearate),
      ),
      flag(
        'Methylsulfonyl Methane (MSM/DMSO2)',
        'cleared',
        labelCite(CITE.penetrex, METH.msm),
      ),
      flag(
        'Glucosamine HCl',
        'cleared',
        labelCite(CITE.penetrex, METH.glucosamine),
      ),
      flag(
        'Choline Bitartrate',
        'cleared',
        labelCite(CITE.penetrex, METH.choline),
      ),
      flag(
        'Methyl Gluceth-20',
        'cleared',
        labelCite(CITE.penetrex, METH.methylGluceth20),
      ),
      flag(
        'Cetyl Myristoleate',
        'cleared',
        labelCite(CITE.penetrex, METH.cetylMyristoleate),
      ),
      flag(
        'Aloe Vera (Aloe Barbadensis) Leaf Juice',
        'cleared',
        labelCite(CITE.penetrex, METH.aloe),
      ),
      flag(
        'Tocopherol (Vitamin E)',
        'cleared',
        labelCite(CITE.penetrex, METH.tocopherol),
      ),
      flag(
        'Dipotassium Glycyrrhizinate',
        'cleared',
        labelCite(CITE.penetrex, METH.dipotassium),
      ),
      flag(
        'Cetearyl Alcohol',
        'cleared',
        labelCite(CITE.penetrex, METH.fattyAlcohol),
      ),
      flag(
        'Coco-Caprylate/Caprate',
        'cleared',
        labelCite(CITE.penetrex, METH.cocoCaprylate),
      ),
      flag('Glycerin', 'cleared', labelCite(CITE.penetrex, METH.cleared)),
      flag('Water (Aqua)', 'cleared', labelCite(CITE.penetrex, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Penetrex Pain Relief Cream = Caution. Drivers are Steareth-20 / PEG-100 Stearate (PEG) / DMDM hydantoin / phenoxyethanol / Tea Tree (Melaleuca Alternifolia) Leaf Oil. Additional standalone Caution on this carton: arnica flower extract / boswellia (frankincense) oil / camphor-as-inactive / ethoxydiglycol / ceteareth-20 / Ammonium Acryloyldimethyltaurate/VP Copolymer (AMPS / VP). Peppermint oil is the locked Limited flavor/EO row. Current penetrex.com Ingredients (Cream) — not the old refuse harvest that omitted Coconut Alkanes and added IPBC: Water (Aqua), Arnica Montana Flower Extract (and) Glycerin, Coconut Alkanes, Sunflower (Helianthus Annuus) Seed Oil, Glyceryl Stearate, PEG-100 Stearate, Cetyl Esters, Dimethicone, Stearic Acid, Ammonium Acryloyldimethyltaurate/VP Copolymer, Steareth-20, Pyridoxine HCl (Vitamin B6), Methylsulfonyl Methane (MSM/DMSO2), Glucosamine HCl, Choline Bitartrate, Ethoxydiglycol, Methyl Gluceth-20, Cetyl Myristoleate, Aloe Vera (Aloe Barbadensis) Leaf Juice, Shea Butter (Butyrospermum Parkii) Extract, Frankincense (Boswellia Serrata) Oil, Peppermint (Mentha Piperita) Oil, Camphor, Tea Tree (Melaleuca Alternifolia) Leaf Oil, Tocopherol (Vitamin E), Dipotassium Glycyrrhizinate, Phenoxyethanol, DMDM Hydantoin, Ceteareth-20, Cetearyl Alcohol, Coco-Caprylate/Caprate, Glyceryl Stearates. Coconut Alkanes is the locked exact Cleared cream-emollient alkane (the PR #105 refuse string; do not alias to C15-19 alkane / undecane / tridecane). ${ALKANE_TAP} Pyridoxine HCl as inactive is the locked exact Cleared token. Named sunflower seed oil is cream fill Cleared (tap fill ≠ gummy High) — not the gummy seed-oil High rule. ${CREAM_OIL_TAP} Shea butter is the named cream-butter vehicle (Cleared). Tocopherol is the Cleared mixed-tocopherols row (not Caution tocopheryl acetate). Marketed Arnica / B6 / MSM / Boswellia listed neutrally — this draft grades inactives only and makes no efficacy claim. No High. Do not write the gel / warming / hemp / advanced menthol / morning / night SKUs (different OI). 2 oz + 4 oz cream pack sizes share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} ${SCENT_EXTRACT_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'penetrex.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [`${CITE.penetrex} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL for this cream`],
  }),
];

const BY_ID = Object.fromEntries(
  BATCH58_PENETREX_CREAM.map((record) => [record.id, record]),
);

const PENETREX = BY_ID[ID.penetrex];

if (BATCH58_PENETREX_CREAM.length !== 1) {
  throw new Error('batch 58 must write exactly 1 Search row');
}
if (BATCH58_PENETREX_CREAM.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 58 Clean tally is 0');
}
if (BATCH58_PENETREX_CREAM.filter((r) => r.verdict === 'caution').length !== 1) {
  throw new Error('batch 58 Caution tally is 1');
}
if (BATCH58_PENETREX_CREAM.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch 58 Avoid tally is 0');
}
if (BATCH58_PENETREX_CREAM.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 58 stays on Pain & Fever');
}
if (BATCH58_PENETREX_CREAM.some((record) => record.barcode)) {
  throw new Error('batch 58 must not invent barcodes');
}
if (
  BATCH58_PENETREX_CREAM.some((record) => record.recordStatus !== UNVERIFIED)
) {
  throw new Error('batch 58 recordStatus must stay unverified');
}

const FORBIDDEN_FORMULA_IDS = [
  'jointflex-pain-relief-cream',
  'topricin-pain-relief-cream',
  'blue-emu-original',
  'australian-dream-arthritis-cream',
  'asutra-melt-pain-away',
  'asutra-melt-pain-away-thrive',
  'stopain-extra-strength-roll-on',
  'flexall-max-strength-gel',
  'mentholatum-original',
  'boiron-arnicare-gel',
];

if (
  BATCH58_PENETREX_CREAM.some((record) =>
    FORBIDDEN_FORMULA_IDS.includes(record.formulaId ?? ''),
  )
) {
  throw new Error('batch 58 must not reuse already-on-main formulaIds');
}
if (PENETREX?.formulaId !== ID.penetrex) {
  throw new Error('Penetrex formulaId must equal penetrex-pain-relief-cream');
}
if (!PENETREX?.inactiveIngredients.some((item) => item.name === 'Steareth-20')) {
  throw new Error('Penetrex must list exact Steareth-20');
}
if (!PENETREX?.inactiveIngredients.some((item) => item.name === 'Coconut Alkanes')) {
  throw new Error('Penetrex must list exact Coconut Alkanes');
}
if (
  PENETREX?.inactiveIngredients.some((item) =>
    /c15-19|undecane|tridecane/i.test(item.name),
  )
) {
  throw new Error('Penetrex must not alias Coconut Alkanes to C15-19 / undecane / tridecane');
}
if (
  !PENETREX?.inactiveIngredients.some((item) =>
    /pyridoxine hcl/i.test(item.name),
  )
) {
  throw new Error('Penetrex must list exact Pyridoxine HCl as inactive');
}
if (
  !PENETREX?.inactiveIngredients.some((item) =>
    /melaleuca alternifolia/i.test(item.name),
  )
) {
  throw new Error('Penetrex must list exact Melaleuca Alternifolia Leaf Oil');
}
if (
  !PENETREX?.inactiveIngredients.some((item) =>
    /sunflower/i.test(item.name) && item.riskLevel === 'cleared',
  )
) {
  throw new Error('Penetrex sunflower must stay Cleared cream fill');
}
if (
  PENETREX?.inactiveIngredients.some((item) =>
    /sunflower/i.test(item.name) && item.riskLevel === 'high',
  )
) {
  throw new Error('Penetrex sunflower must not use the gummy seed-oil High rule');
}
if (
  !PENETREX?.inactiveIngredients.some((item) => item.name === 'PEG-100 Stearate')
) {
  throw new Error('Penetrex must list exact PEG-100 Stearate');
}
if (
  !PENETREX?.inactiveIngredients.some((item) => item.name === 'DMDM Hydantoin')
) {
  throw new Error('Penetrex must list exact DMDM Hydantoin');
}
if (
  !PENETREX?.inactiveIngredients.some((item) => item.name === 'Phenoxyethanol')
) {
  throw new Error('Penetrex must list exact Phenoxyethanol');
}
if (
  PENETREX?.inactiveIngredients.some((item) => item.riskLevel === 'high')
) {
  throw new Error('Penetrex must not invent a High on this panel');
}
if (
  PENETREX?.inactiveIngredients.some((item) =>
    /iodopropynyl|ipbc/i.test(item.name),
  )
) {
  throw new Error('Penetrex must not use the old IPBC refuse harvest');
}
if (
  BATCH58_PENETREX_CREAM.some((record) =>
    record.inactiveIngredients.some((item) => /sprouts/i.test(item.name)),
  )
) {
  throw new Error('batch 58 must not touch Sprouts');
}
if (BATCH58_REFUSED.length !== 0) {
  throw new Error('batch 58 refused list must stay empty');
}

// Verdict tally (1 record): Clean 0 · Caution 1 · Avoid 0
// Refused: none.
// Founder-OI: current penetrex.com Ingredients (Cream).
// Sunflower = cream fill Cleared. Coconut Alkanes exact. No High.
