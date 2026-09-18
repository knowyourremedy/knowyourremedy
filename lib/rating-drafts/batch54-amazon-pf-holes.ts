// DRAFT / not verified / batch 54 Amazon US Pain & Fever WRITE /
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
// painFeverPicks.ts. Do NOT clone list-1 reuse rows (drugstore
// banners / Thrive set / Basic Care+Basics already on main /
// Asutra / batches 41–53).
//
// TALLY (unverified drafts in THIS file): 20 rows — Clean 2 /
// Caution 6 / Avoid 12.
// Independently Clean in THIS batch: BioSchwartz Turmeric 1500
// (HPMC only); Nutricost Turmeric 2300 (HPMC + veg stearate).
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
// Nature’s Way / Basic Care / Basics / GoodSense ES APAP L484 /
// Asutra Melt Pain Away / batches 41–53.
// GoodSense Dual Action REUSES formulaId
// `amazon-basic-care-dual-action-tio2-talc` (same OI+actives as
// the already-on-main Basic Care Dual Action row). New product
// id only — the Basic Care row is not rewritten.
//
// LIST 2 written:
// - GoodSense Naproxen Sodium 220 film-coated — Avoid (talc +
//   TiO2 / Blue 2). setids a980b939 + 494db9ba share formulaId.
// - TIME-Cap Labs Naproxen Sodium 220 (Marksans 48cb1363) —
//   Avoid (TiO2 / Blue 2 / SiO2 cap). No talc.
// - HealthA2Z Ibuprofen 200 NDC 69168-382 — Avoid (Yellow 6 /
//   TiO2).
// - Mommy’s Bliss Infants’ Pain and Fever APAP — Caution
//   (natural flavors + sodium benzoate Limited). organic
//   elderberry juice concentrate = named juice color Cleared.
// - BioSchwartz Turmeric Curcumin 1500 — Clean (hypromellose
//   vegetable capsule only).
// - Nutricost Turmeric Curcumin 2300 — Clean (HPMC + vegetable
//   magnesium stearate only).
// - NOW Turmeric Curcumin (± BioPerine) veg caps — SiO2 Caution
//   (HPMC / calcium laurate / SiO2).
// - Doctor’s Best High Absorption Curcumin 1000 — SiO2 Caution.
// - Qunol Extra Strength Turmeric Curcumin Complex 1500 veg
//   caps (NOT the gamma-cyclodextrin / oleoresin 1000 SKU) —
//   SiO2 Caution (HPMC / Mg stearate / SiO2).
// - HealthWise Lidocaine 4% patch (31314dda) — Avoid (TiO2).
//   Backing ignored. DF graded (not structured-only).
// - WELMATE Lidocaine 4% patch (4303fd30 / 73581-912) — Avoid
//   parabens (methylparaben + propylparaben High). Own
//   formulaId — not the 73581-911 twin.
//
// LIST 3 written where exact leftover tokens now exist:
// - NatureWise Curcumin Turmeric 2250 — rice flour Caution.
//   Pullulan + rice hull sit on locked Cleared rice-hull /
//   pullulan rows.
// - GoodSense Dual Action APAP 250 / IBU 125 — ferric oxide
//   yellow Caution; oral polyvinyl alcohol Cleared. Avoid
//   still stands on talc + TiO2. Reuses Basic Care Dual Action
//   formulaId (not cloned). Pregelatinized starch listed
//   (simple-starch Cleared).
// - Qunol Turmeric 1000 / hydro-soluble (qunol.com Extra
//   Strength 1000) — gamma-cyclodextrin sits inside the labeled
//   Bioenhanced Turmeric Complex (Cleared leftover lock).
//   Official other-ingredients are HPMC / Mg stearate / SiO2
//   only — SiO2 Caution. Distinct from 1500. Cartons that still
//   print oleoresin turmeric are refused (not this row).
// - HealthA2Z Ibuprofen 200 NDC 69168-335 — full current OI
//   exact-covered (talc + TiO2 High; iron oxide red Caution;
//   pregelatinized starch + triacetin Cleared). Not a rewrite
//   of amazon-basic-care-ibuprofen-tio2.
// - GoodSense Children’s Ibuprofen 100 chew (a8fc1b0c) —
//   ammonium glycyrrhizin Caution + succinic acid Cleared.
//   Avoid on aspartame + Yellow 6 High. Soybean oil on this
//   chew sits on the gummy/chew seed-oil High row.
// - GoodSense Ibuprofen liquid gels (Perrigo 0cb4b0ef) —
//   polyvinyl acetate phthalate Caution; ammonium hydroxide
//   Caution (DF words, not bare AMMONIA). Avoid on Green 3 +
//   TiO2.
// - Midol Complete caplets — shellac Cleared. Avoid on Blue 2
//   lake + TiO2. Gelcaps not written (black iron oxide /
//   ferrosoferric oxide not an exact leftover lock).
// - Amazon Basics Lidocaine 4% (e3b4f9b1) + WELMATE 73581-911
//   (cff71b75) — DF prints 3-(2-ethylhexyloxy)propane-1,2-diol
//   (ethylhexylglycerin alias Caution). Same OI+actives → one
//   formulaId, two Search rows. Do not clone HealthWise /
//   WELMATE 73581-912 (list 2).
//
// formulaId notes:
// - GoodSense Dual Action reuses amazon-basic-care-dual-action-tio2-talc.
// - Amazon Basics lidocaine 4% + WELMATE 73581-911 share
//   amazon-basics-lidocaine-4-patch.
// - HealthWise 31314dda and WELMATE 4303fd30 do NOT share
//   formulaId (parabens vs TiO2-only; DF differs).
// - Qunol 1000 and Qunol 1500 do NOT share formulaId (different
//   labeled complex strength / serving).
// - Pack sizes of the same name+form+OI+actives share formulaId.
//
// REFUSED (still missing an exact §5 row — quote the token):
// - Amazon Basic Care / Basics IBU leftover 72288-604 / 080 /
//   311 (3329f487 / b5a47efe / 9bbbedb3) → "iron oxide yellow"
//   (iron oxide red is locked; iron oxide yellow is NOT —
//   do not alias to ferric oxide yellow). Do not rewrite
//   amazon-basic-care-ibuprofen-tio2 (red iron oxide / yellow
//   iron oxide still ungraded on that already-on-main row).
// - Qunol cartons that still print oleoresin turmeric
//   (HelloPharmacist / older hydro-soluble + gellan snapshot)
//   → "oleoresin turmeric" (NOT locked — do not alias). Official
//   qunol.com Extra Strength 1000 current OI does not print it
//   and is written above.
// - A+Health Dual Action (04ccc4b2 / 4834aa7f) →
//   "glyceryl dibehenate"
// - Amazon Elements Turmeric → unlabeled "Vegetable Capsule"
// - Qunol Zero Sugar Turmeric Gummies → "isomalt" (OI pinned
//   but isomalt is not an exact §5 sugar-alcohol token;
//   fractionated coconut oil is coconut-named and is not the
//   refuse driver)
// - HealthA2Z Children’s APAP chew / Naproxen 300-ct /
//   TIME-Cap IBU → setid/count/SKU still not pinned to one
//   Amazon carton (multiple Allegiant / TIME CAP SPLs)
// - Stopain / Blue-Emu / Sumifun / Teemofe / store movers →
//   no OI
// - Botanical-blend creams (Penetrex, JointFlex, Australian
//   Dream, Mentholatum, Flexall, Topricin, etc.) → not
//   exact-§5

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
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

const CHEW_OIL_TAP =
  'Seed/industrial oils are flagged in gummies and chews. Soybean oil on this chewable tablet is that High rule. Capsule / softgel / cream fill of a named oil is not.';

const RICE_FLOUR_TAP =
  'Rice flour is the locked exact Caution token. Distinct from Cleared rice-hull / rice-bran / rice protein and from Caution organic rice meal.';

const RICE_HULL_TAP =
  'Rice hull sits on the locked Cleared rice-hull family (organic rice hull extract / rice concentrate / ground rice hulls). Distinct from Caution rice flour.';

const JUICE_COLOR_TAP =
  'Named fruit-or-vegetable juice concentrate as COLOR is Cleared. Distinct from Limited fruit puree / juice concentrate as a gummy base.';

const METH = {
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception). Oral / swallow High. Topical talc in a cream/patch is a different Caution row.',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B + founder strict-sweetener stance; locked)',
  seedOilChew: `Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, vegetable oil, sunflower). ${CHEW_OIL_TAP}`,
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate; ethylene-oxide / 1,4-dioxane)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  aceK: 'Methodology §5 Moderate-risk (acesulfame potassium — Ace-K)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  mannitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  polydextrose:
    'Methodology §5 Limited-risk (polydextrose — maltodextrin-like; locked Sept 14, 2026 housekeeping)',
  mctUnlabeled:
    'Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). Label says caprylic and capric acid triglycerides and does not name coconut on that token.',
  ipa: 'Methodology §5 Limited-risk (isopropyl alcohol — IPA / isopropanol; alcohol-vehicle family; locked Sept 15, 2026). Not Avoid.',
  riceFlour: `Methodology §5 Caution (rice flour — exact token; distinct from Cleared rice-hull / rice-bran / rice protein and from Caution organic rice meal; standalone Caution, not Avoid; locked Sept 15, 2026). ${RICE_FLOUR_TAP}`,
  ferricYellow:
    'Methodology §5 Caution (ferric oxide yellow — exact INCI; distinct from ferric ferrocyanide; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ironOxideRed:
    'Methodology §5 Caution (iron oxide red — exact token; distinct from ferric oxide red and from ferric ferrocyanide; standalone Caution, not Avoid; locked Sept 15, 2026)',
  pvap: 'Methodology §5 Caution (polyvinyl acetate phthalate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ammonGly:
    'Methodology §5 Caution (ammonium glycyrrhizin — exact INCI; distinct from Cleared licorice / Glycyrrhiza extract; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ethylhexyl:
    'Methodology §5 Caution (3-(2-ethylhexyloxy)propane-1,2-diol / ethylhexylglycerin — exact alias; same Caution as ethylhexylglycerin; both strings written; standalone Caution, not Avoid; locked Sept 15, 2026)',
  aluminumGlycinate:
    'Methodology §5 Caution (aluminum glycinate — standalone Caution, not Avoid; locked Sept 15, 2026)',
  hydroxyaceto:
    'Methodology §5 Caution (hydroxyacetophenone — standalone Caution, not Avoid; locked Sept 15, 2026)',
  dihydroxyAl:
    'Methodology §5 Caution (dihydroxyaluminum aminoacetate — exact INCI; DF spelling dihydroxyaluminium aminoacetate; standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid — topical gel polymer; standalone Caution, not Avoid; locked Sept 15, 2026)',
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  ipbc: 'Methodology §5 Caution (IPBC / iodopropynyl butylcarbamate — exact INCI; both names; standalone Caution, not Avoid; locked Sept 15, 2026)',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate — standalone Caution, not Avoid)',
  sorbitan:
    'Methodology §5 Caution (sorbitan / sorbitan esters as emulsifier — polysorbate neighborhood; not the sorbitol row; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ammoniumHydroxide:
    'Methodology §5 Caution (ammonium hydroxide — exact words; distinct from strong ammonia solution; do not alias; standalone Caution, not Avoid; locked Sept 15, 2026)',
  pvaOral:
    'Methodology §5 Cleared (polyvinyl alcohol, oral coating — exact token as oral coating; distinct from PVA topical film; locked Sept 15, 2026)',
  shellac: 'Methodology §5 Cleared (shellac — exact INCI; locked Sept 15, 2026)',
  succinic:
    'Methodology §5 Cleared (succinic acid — exact INCI; locked Sept 15, 2026)',
  juiceColor: `Methodology §5 Cleared (black carrot / named fruit-or-vegetable juice concentrate as COLOR — named plant color; locked Sept 14, 2026). ${JUICE_COLOR_TAP}`,
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  calciumLaurate:
    'Methodology §5 Cleared (calcium laurate — stearate-family lubricant; locked Sept 14, 2026 housekeeping)',
  stearate:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate — stearate-family lubricant)',
  pullulan:
    'Methodology §5 Cleared (organic pullulan — starch capsule polymer; HPMC-family vegan cap)',
  riceHull: `Methodology §5 Cleared (organic rice hull extract / rice concentrate / ground rice hulls — plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply). ${RICE_HULL_TAP}`,
  celluloseGum:
    'Methodology §5 Cleared (cellulose gum / powdered cellulose / capsule cellulose / carboxymethylcellulose sodium — MCC family; locked Sept 14, 2026 housekeeping)',
  lecithin:
    'Methodology §5 Cleared (lecithin — canola, soy, or sunflower; locked v1.6)',
  koh: 'Methodology §5 Cleared (potassium hydroxide — pH adjuster; locked Sept 15, 2026)',
  triacetin:
    'Methodology §5 Cleared (triacetin — tablet/caplet coating plasticizer; locked Sept 15, 2026)',
  kaolin: 'Methodology §5 Cleared (kaolin — clay / absorbent; locked Sept 15, 2026)',
  tartaric:
    'Methodology §5 Cleared (tartaric acid — organic acid with citric; locked Sept 15, 2026)',
  petrolatum:
    'Methodology §5 Cleared (petrolatum, topical — first-aid ointment base; locked Sept 14, 2026)',
  disodiumEdta:
    'Methodology §5 Cleared (disodium EDTA / edetate disodium — TRACE preservative/stabilizer; locked v1.6)',
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
  gsNapA: 'a980b939-f74d-4e95-87a8-65ad5a783ac5',
  gsNapB: '494db9ba-6907-497d-a150-451e12c81cb1',
  timecapNap: '48cb1363-ff12-40ee-a87a-2252dfbf8ff7',
  ha2z382: '2e33a153-0a3f-4b88-b193-d63e0b792ccc',
  mommy: '05e26650-81b3-d7b1-e063-6394a90a14ed',
  healthwise: '31314dda-6199-574d-e063-6394a90aae7a',
  welmateParaben: '4303fd30-0d35-3671-e063-6394a90a2aee',
  gsDual: 'b117358c-f4ca-4ea8-95ee-88a42cc05040',
  ha2z335: 'dd63b011-0573-4374-9669-8d29146e5fc9',
  gsKidsChew: 'a8fc1b0c-dd69-4567-8eea-de4d9b0c7740',
  gsLiqGel: '0cb4b0ef-5cdd-4c79-8718-4fb157a2c948',
  midol: 'ce9e6acb-a38b-4c9b-a7e8-3e1c2a49a324',
  amzLido: 'e3b4f9b1-ac6b-cb2a-e053-2a95a90a9e1e',
  welmateEh: 'cff71b75-fc4e-29ac-e053-2995a90abd50',
} as const;

const ID = {
  gsNap: 'goodsense-naproxen-220',
  timecapNap: 'timecap-naproxen-220',
  ha2z382: 'healtha2z-ibuprofen-200-382',
  mommy: 'mommys-bliss-infants-pain-fever',
  bioschwartz: 'bioschwartz-turmeric-curcumin-1500',
  nutricost: 'nutricost-turmeric-curcumin-2300',
  nowTurmeric: 'now-turmeric-curcumin-bioperine',
  doctorsBest: 'doctors-best-high-absorption-curcumin-1000',
  qunol1500: 'qunol-extra-strength-turmeric-1500',
  qunol1000: 'qunol-extra-strength-turmeric-1000',
  healthwise: 'healthwise-lidocaine-4-patch',
  welmateParaben: 'welmate-lidocaine-4-patch-parabens',
  naturewise: 'naturewise-curcumin-turmeric-2250',
  gsDual: 'goodsense-dual-action',
  ha2z335: 'healtha2z-ibuprofen-200-335',
  gsKidsChew: 'goodsense-childrens-ibuprofen-chew',
  gsLiqGel: 'goodsense-ibuprofen-liquid-gels',
  midol: 'midol-complete',
  amzLido: 'amazon-basics-lidocaine-4-patch',
  welmateEh: 'welmate-lidocaine-4-patch-ethylhexyl',
} as const;

const CITE = {
  bioschwartz:
    'iHerb / Vitacost / Swanson BioSchwartz Ultra Premium Turmeric Curcumin with BioPerine 90 veggie caps (SKU 7212751023 family) other-ingredients: Hypromellose (vegetable capsule)',
  nutricost:
    'iHerb / HelloPharmacist Nutricost Turmeric 2300 mg 120 veg capsules (SKU 702669931403) other-ingredients: Hypromellose (cellulose) capsule, magnesium stearate (vegetable source)',
  nowTurmeric:
    'NOWFoods.com / iHerb / PureFormulas NOW Turmeric Curcumin with BioPerine veg capsules other-ingredients: Hypromellose (cellulose capsule), Calcium Laurate and Silicon Dioxide',
  doctorsBest:
    'DoctorsBest.com / Vitacost Doctor’s Best High Absorption Curcumin 1000 mg 120 tablets (DRB-00195) other-ingredients: Microcrystalline cellulose, sodium starch glycolate, magnesium stearate (vegetable source), silicon dioxide, hypromellose (coating)',
  qunol1500:
    'Swanson / Vitacost / Target Qunol Extra Strength Turmeric Curcumin Complex 1500 mg vegetarian capsules (SKU 850184008459 family) other-ingredients: Vegetable hypromellose, magnesium stearate, and silicon dioxide. Bioenhanced Turmeric Complex is the labeled active blend (not the oleoresin / gellan carton and not the qunol.com Extra Strength 1000 hydro-soluble SKU).',
  qunol1000:
    'qunol.com Extra Strength Turmeric Curcumin Complex 1000 mg (https://www.qunol.com/products/qunol-turmeric-extra-strength) other-ingredients: Vegetable hypromellose, magnesium stearate and silicon dioxide. Labeled active: Bioenhanced Turmeric Complex 1000 mg (20% curcuminoids) — gamma-cyclodextrin (for absorption) + turmeric extract (Curcuma longa) (rhizome). Current official OI does not print oleoresin.',
  naturewise:
    'iHerb / Target NatureWise Curcumin Turmeric 2250 mg vegan capsules (SKU family 180 / 90 / 360 ct) other-ingredients: Pullulan capsule, rice hull, rice flour',
} as const;

const GENEXA_ES = 'genexa-acetaminophen-es';
const GENEXA_KIDS = 'genexa-kids-apap-liquid';
const GENEXA_INFANTS = 'genexa-infants-apap-liquid';
const EQUATE_IBU = 'equate-ibuprofen-dye-free';
const OWH = 'oregons-wild-harvest-turmeric';
const ORGANIC_INDIA = 'organic-india-turmeric-formula';
const SPORTS_RESEARCH = 'sports-research-turmeric-curcumin';
const ARNICARE_GEL = 'boiron-arnicare-gel';
const BC_DUAL_FORMULA = 'amazon-basic-care-dual-action-tio2-talc';

const APAP_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'Independently Clean adult acetaminophen Extra Strength already on main (founder-exception Clean). Same Pain & Fever shelf. Form labeled, not a hard filter (§6).',
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

const DUAL_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'No independently Clean dual-action combo. Closest Clean analog is Genexa Extra Strength acetaminophen for the APAP half — not a 250/125 replacement. Form labeled, not a hard filter (§6).',
  ),
  alt(
    EQUATE_IBU,
    'Best Caution ibuprofen analog for the IBU half. Not a 250/125 replacement.',
  ),
];

const KIDS_IBU_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_KIDS,
    'No independently Clean kids ibuprofen. Closest Clean Pain & Fever analog is Genexa Kids acetaminophen liquid (minAge 2). Different active. Form: liquid vs chew — labeled, not a hard filter (§6).',
  ),
];

const INFANT_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_INFANTS,
    'Independently Clean infant-labeled acetaminophen liquid already on main. Age-matched infant swap. Form: liquid. Same active.',
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
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs patch — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine cream invented.',
  ),
];

export const BATCH54_REFUSED: { sku: string; token: string }[] = [
  {
    sku: 'Amazon Basic Care / Basics Ibuprofen leftover NDC 72288-604 / 72288-080 / 72288-311 (DailyMed 3329f487 / b5a47efe / 9bbbedb3)',
    token: 'iron oxide yellow',
  },
  {
    sku: 'Qunol hydro-soluble / Extra Strength cartons that still print oleoresin (HelloPharmacist 1500 oleoresin + gellan snapshot; not the current qunol.com Extra Strength 1000 OI)',
    token: 'oleoresin turmeric',
  },
  {
    sku: 'A+Health Dual Action APAP 250 / IBU 125 (DailyMed 04ccc4b2 / 4834aa7f)',
    token: 'glyceryl dibehenate',
  },
  {
    sku: 'Amazon Elements Turmeric Complex / Turmeric Root Extract',
    token: 'Vegetable Capsule',
  },
  {
    sku: 'Qunol Zero Sugar Turmeric Gummies',
    token: 'isomalt',
  },
  {
    sku: 'HealthA2Z Children’s APAP chew / Naproxen 300-ct / TIME-Cap IBU',
    token: 'setid/OI still not pinned to one Amazon carton',
  },
  {
    sku: 'Stopain / Blue-Emu / Sumifun / Teemofe / store movers',
    token: 'no OI',
  },
  {
    sku: 'Penetrex / JointFlex / Australian Dream / Mentholatum / Flexall / Topricin',
    token: 'botanical-blend cream not exact-§5',
  },
];

export const BATCH54_AMAZON_PF_HOLES: RatingRecord[] = [
  row({
    id: ID.gsNap,
    productName: 'GoodSense Naproxen Sodium 220 mg',
    brand: 'GoodSense',
    category: PAIN_FEVER,
    formulaId: ID.gsNap,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 2 aluminum lake', 'high', dailymed(SET.gsNapA, METH.dyes)),
      flag('Talc', 'high', dailymed(SET.gsNapA, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.gsNapA, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.gsNapA, METH.peg)),
      cleared(SET.gsNapA, 'Hypromellose'),
      cleared(SET.gsNapA, 'Magnesium stearate'),
      cleared(SET.gsNapA, 'Microcrystalline cellulose'),
      cleared(SET.gsNapA, 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: GoodSense Naproxen Sodium 220 film-coated = Avoid. Drivers are talc + titanium dioxide + FD&C Blue #2 aluminum lake (High). DailyMed setids a980b939 (NDC 0113-1412) and 494db9ba (NDC 0113-4368 / 50090-3369) list the same Drug Facts OI — one formulaId, not cloned. Distinct from TIME-Cap / Marksans 48cb1363 (no talc; adds SiO2 + croscarmellose). Distinct from amazon-basic-care-naproxen-blue2-tio2 already on main (do not clone). Ages 12+.',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.gsNapA} (GoodSense / Perrigo NDC 0113-1412); twin ${SET.gsNapB} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.timecapNap,
    productName: 'TIME-Cap Labs Naproxen Sodium 220 mg',
    brand: 'TIME-Cap Labs',
    category: PAIN_FEVER,
    formulaId: ID.timecapNap,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Naproxen sodium', strength: '220mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 2 lake', 'high', dailymed(SET.timecapNap, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.timecapNap, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.timecapNap, METH.peg)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.timecapNap, METH.sio2),
      ),
      cleared(SET.timecapNap, 'Croscarmellose sodium'),
      cleared(SET.timecapNap, 'Hypromellose'),
      cleared(SET.timecapNap, 'Magnesium stearate'),
      cleared(SET.timecapNap, 'Microcrystalline cellulose'),
      cleared(SET.timecapNap, 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: TIME-Cap Labs Naproxen Sodium 220 (Marksans DailyMed 48cb1363) = Avoid. Drivers are FD&C Blue #2 lake + titanium dioxide (High). Colloidal silicon dioxide is the 0-pt Caution cap (not the Avoid driver). No talc on this SPL — distinct from GoodSense a980b939 / 494db9ba. Pack sizes share this formulaId. Ages 12+.',
    retailers: [...AMAZON],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.timecapNap} (Marksans / TIME-Cap Naproxen Sodium 220) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ha2z382,
    productName: 'HealthA2Z Ibuprofen 200 mg',
    brand: 'HealthA2Z',
    category: PAIN_FEVER,
    formulaId: ID.ha2z382,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('FD&C Yellow No. 6', 'high', dailymed(SET.ha2z382, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.ha2z382, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.ha2z382, METH.peg)),
      flag('Polydextrose', 'limited', dailymed(SET.ha2z382, METH.polydextrose)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.ha2z382, METH.sio2),
      ),
      cleared(SET.ha2z382, 'Corn starch'),
      cleared(SET.ha2z382, 'Hypromellose'),
      cleared(SET.ha2z382, 'Povidone'),
      cleared(SET.ha2z382, 'Pregelatinized starch'),
      cleared(SET.ha2z382, 'Purified water'),
      cleared(SET.ha2z382, 'Sodium starch glycolate'),
      cleared(SET.ha2z382, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: HealthA2Z Ibuprofen 200 caplet NDC 69168-382 = Avoid. Drivers are FD&C Yellow #6 + titanium dioxide (High). DailyMed setid 2e33a153. Drug Facts: colloidal silicon dioxide, corn starch, FD&C yellow #6, hypromellose, polydextrose, polyethylene glycol, povidone, pregelatinized starch, purified water, sodium starch glycolate, stearic acid, titanium dioxide. Distinct from NDC 69168-335 (talc + TiO2, no Yellow 6). Ages 12+.',
    retailers: [...AMAZON],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ha2z382} (HealthA2Z / Allegiant NDC 69168-382) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.mommy,
    productName: 'Mommy’s Bliss Infants’ Pain and Fever',
    brand: "Mommy's Bliss",
    category: PAIN_FEVER,
    barcode: '679234058936',
    formulaId: ID.mommy,
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '160mg / 5mL' }],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', dailymed(SET.mommy, METH.flavors)),
      flag('Sodium benzoate', 'limited', dailymed(SET.mommy, METH.benzoate)),
      flag(
        'Organic elderberry juice concentrate',
        'cleared',
        dailymed(SET.mommy, METH.juiceColor),
      ),
      flag(
        'Microcrystalline cellulose and carboxymethylcellulose sodium',
        'cleared',
        dailymed(SET.mommy, METH.celluloseGum),
      ),
      cleared(SET.mommy, 'Anhydrous citric acid'),
      cleared(SET.mommy, 'Glycerin'),
      cleared(SET.mommy, 'Purified water'),
      cleared(SET.mommy, 'Sucrose'),
      cleared(SET.mommy, 'Xanthan gum'),
    ],
    verdict: 'caution',
    honestNote:
      `PROPOSED DRAFT: Mommy’s Bliss Infants’ Pain and Fever APAP liquid = Caution. Limited drivers are natural flavors + sodium benzoate. ${LIMITED_STACK} Organic elderberry juice concentrate is the locked named juice-as-color Cleared row (not a dye; not the Limited gummy-base juice row). DailyMed setid 05e26650 Drug Facts: anhydrous citric acid, glycerin, microcrystalline cellulose and carboxymethylcellulose sodium, natural flavors, organic elderberry juice concentrate, purified water, sodium benzoate, sucrose, xanthan gum. Carton dosing chart starts at 24 lb / 2 years (under 2: ask a doctor). Stay under labeled acetaminophen limits. Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: INFANT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.mommy} (Mommy’s Bliss Infants’ Pain and Fever NDC 71444-893) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.bioschwartz,
    productName: 'BioSchwartz Turmeric Curcumin 1500 mg',
    brand: 'BioSchwartz',
    category: PAIN_FEVER,
    barcode: '737212751023 810056430450 810056430573 810056430405',
    formulaId: ID.bioschwartz,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic turmeric root powder', strength: '1350mg' },
      { name: 'Turmeric root extract (95% curcuminoids)', strength: '150mg' },
      { name: 'Black pepper fruit extract (BioPerine)', strength: '10mg' },
    ],
    inactiveIngredients: [
      flag(
        'Hypromellose (vegetable capsule)',
        'cleared',
        labelCite(CITE.bioschwartz, METH.hpmc),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: BioSchwartz Turmeric Curcumin 1500 = Clean. Official iHerb / Vitacost / Swanson other-ingredients: Hypromellose (vegetable capsule) only. HPMC-only (or HPMC ± veg stearate only) was the Clean gate — this panel is HPMC only. No SiO2 / dye / TiO2 / seed-oil gummy. Turmeric + BioPerine are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...AMAZON, 'iHerb', 'BioSchwartz'],
    sourcesGeneral: [`${CITE.bioschwartz} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.nutricost,
    productName: 'Nutricost Turmeric Curcumin 2300 mg',
    brand: 'Nutricost',
    category: PAIN_FEVER,
    barcode: '702669931403',
    formulaId: ID.nutricost,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic turmeric powder (rhizome)', strength: '2150mg' },
      {
        name: 'Turmeric extract (95% curcuminoids)',
        strength: '150mg',
      },
      {
        name: 'BioPerine black pepper extract (min. 95% piperine)',
        strength: '15mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Hypromellose (cellulose) capsule',
        'cleared',
        labelCite(CITE.nutricost, METH.hpmc),
      ),
      flag(
        'Magnesium stearate (vegetable source)',
        'cleared',
        labelCite(CITE.nutricost, METH.stearate),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Nutricost Turmeric Curcumin 2300 = Clean. Official iHerb / HelloPharmacist other-ingredients: Hypromellose (cellulose) capsule + magnesium stearate (vegetable source). HPMC ± veg stearate only was the Clean gate. No SiO2 / dye / TiO2. Turmeric + BioPerine are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...AMAZON, 'Nutricost'],
    sourcesGeneral: [`${CITE.nutricost} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.nowTurmeric,
    productName: 'NOW Turmeric Curcumin with BioPerine',
    brand: 'NOW',
    category: PAIN_FEVER,
    barcode: '733739047922',
    formulaId: ID.nowTurmeric,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Turmeric root extract (min. 95% curcuminoids)',
        strength: '658mg',
      },
      { name: 'Black pepper fruit extract (BioPerine)', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Hypromellose (cellulose capsule)',
        'cleared',
        labelCite(CITE.nowTurmeric, METH.hpmc),
      ),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(CITE.nowTurmeric, METH.calciumLaurate),
      ),
      flag('Silicon dioxide', 'cleared', labelCite(CITE.nowTurmeric, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: NOW Turmeric Curcumin (± BioPerine) veg caps = Caution. Driver is silicon dioxide (0-pt Caution cap). HPMC + calcium laurate are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap. Official NOWFoods.com / iHerb / PureFormulas other-ingredients: Hypromellose (cellulose capsule), Calcium Laurate and Silicon Dioxide. Turmeric + BioPerine are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...AMAZON, 'NOW'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.nowTurmeric} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.doctorsBest,
    productName: 'Doctor’s Best High Absorption Curcumin 1000 mg',
    brand: "Doctor's Best",
    category: PAIN_FEVER,
    barcode: '753950001954',
    formulaId: ID.doctorsBest,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Curcumin C3 Complex turmeric extract (95% curcuminoids)',
        strength: '1000mg',
      },
      { name: 'Black pepper extract (BioPerine)', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(CITE.doctorsBest, METH.sio2),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(CITE.doctorsBest, METH.cleared),
      ),
      flag(
        'Sodium starch glycolate',
        'cleared',
        labelCite(CITE.doctorsBest, METH.cleared),
      ),
      flag(
        'Magnesium stearate (vegetable source)',
        'cleared',
        labelCite(CITE.doctorsBest, METH.stearate),
      ),
      flag(
        'Hypromellose (coating)',
        'cleared',
        labelCite(CITE.doctorsBest, METH.hpmc),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Doctor’s Best High Absorption Curcumin 1000 = Caution. Driver is silicon dioxide (0-pt Caution cap). Current DoctorsBest.com / Vitacost panel: MCC, sodium starch glycolate, vegetable magnesium stearate, silicon dioxide, hypromellose coating. Older stearic-acid / croscarmellose snapshots are a different unmatched formula — not this row. Do not invent Clean on the SiO2 cap. Pack sizes of this 1000 mg tablet share this formulaId. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...AMAZON, "Doctor's Best"],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.doctorsBest} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.qunol1500,
    productName: 'Qunol Extra Strength Turmeric Curcumin Complex 1500 mg',
    brand: 'Qunol',
    category: PAIN_FEVER,
    barcode: '850184008459 850184008466',
    formulaId: ID.qunol1500,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Bioenhanced turmeric complex (20% curcuminoids)',
        strength: '1500mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable hypromellose',
        'cleared',
        labelCite(CITE.qunol1500, METH.hpmc),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(CITE.qunol1500, METH.stearate),
      ),
      flag('Silicon dioxide', 'cleared', labelCite(CITE.qunol1500, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Qunol Extra Strength Turmeric Curcumin Complex 1500 veg caps = Caution. Driver is silicon dioxide (0-pt Caution cap). Official Swanson / Vitacost / Target other-ingredients: vegetable hypromellose, magnesium stearate, and silicon dioxide. This is NOT the qunol.com Extra Strength 1000 hydro-soluble SKU (that row is written separately — gamma-cyclodextrin sits in the labeled 1000 mg complex) and NOT leftover cartons that still print oleoresin turmeric (those are refused). Do not invent Clean on the SiO2 cap. Pack sizes of this 1500 mg/3-cap formula share this formulaId. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...AMAZON, 'Qunol', 'Target'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.qunol1500} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.qunol1000,
    productName: 'Qunol Extra Strength Turmeric Curcumin Complex 1000 mg',
    brand: 'Qunol',
    category: PAIN_FEVER,
    barcode: '850184008435 850184008756',
    formulaId: ID.qunol1000,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Bioenhanced turmeric complex (20% curcuminoids; gamma-cyclodextrin + turmeric extract)',
        strength: '1000mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable hypromellose',
        'cleared',
        labelCite(CITE.qunol1000, METH.hpmc),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(CITE.qunol1000, METH.stearate),
      ),
      flag('Silicon dioxide', 'cleared', labelCite(CITE.qunol1000, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Qunol Extra Strength Turmeric Curcumin Complex 1000 / hydro-soluble (qunol.com) = Caution. Driver is silicon dioxide (0-pt Caution cap). Official other-ingredients: vegetable hypromellose, magnesium stearate and silicon dioxide. Gamma-cyclodextrin is named inside the labeled Bioenhanced Turmeric Complex (locked leftover Cleared token — not an Other-Ingredients string on this carton). Current official OI does not print oleoresin turmeric; leftover cartons that still print "oleoresin turmeric" are refused (oleoresin is NOT locked — do not alias). Distinct from the 1500 mg/3-cap row (different active strength / serving). Do not invent Clean on the SiO2 cap. Pack sizes of this 1000 mg/2-cap formula share this formulaId. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...AMAZON, 'Qunol'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.qunol1000} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.healthwise,
    productName: 'HealthWise Lidocaine 4% Patch',
    brand: 'HealthWise',
    category: PAIN_FEVER,
    formulaId: ID.healthwise,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.healthwise, METH.tio2)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.healthwise, METH.ps80)),
      flag(
        'Dihydroxyaluminium aminoacetate',
        'cleared',
        dailymed(SET.healthwise, METH.dihydroxyAl),
      ),
      flag(
        'Hydroxyacetophenone',
        'cleared',
        dailymed(SET.healthwise, METH.hydroxyaceto),
      ),
      flag(
        'Polyacrylic acid',
        'cleared',
        dailymed(SET.healthwise, METH.polyacrylate),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.healthwise, METH.polyacrylate),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.healthwise, METH.pgTopical),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed(SET.healthwise, METH.disodiumEdta),
      ),
      flag('Kaolin', 'cleared', dailymed(SET.healthwise, METH.kaolin)),
      flag('Tartaric acid', 'cleared', dailymed(SET.healthwise, METH.tartaric)),
      cleared(SET.healthwise, 'Glycerin'),
      cleared(SET.healthwise, 'PVP'),
      cleared(SET.healthwise, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: HealthWise Lidocaine 4% Patch = Avoid. Driver is titanium dioxide (High; no topical exception). DailyMed setid 31314dda Drug Facts: dihydroxyaluminium aminoacetate, edetate disodium, glycerin, hydroxyacetophenone, kaolin, polyacrylic acid, polysorbate 80, propylene glycol, PVP, sodium polyacrylate, tartaric acid, titanium dioxide, water. Backing / film is a patch device material — not a gradeable inactive; omitted, not a block. Own formulaId — do NOT clone WELMATE 4303fd30 (parabens) or e3b4f9b1 / cff71b75 (3-(2-ethylhexyloxy)propane-1,2-diol twin). Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.healthwise} (HealthWise Lidocaine 4% NDC 71101-064) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.welmateParaben,
    productName: 'WELMATE Lidocaine 4% Patch',
    brand: 'WELMATE',
    category: PAIN_FEVER,
    formulaId: ID.welmateParaben,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET.welmateParaben, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET.welmateParaben, METH.parabens)),
      flag('Titanium dioxide', 'high', dailymed(SET.welmateParaben, METH.tio2)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.welmateParaben, METH.ps80)),
      flag(
        'Aluminum glycinate',
        'cleared',
        dailymed(SET.welmateParaben, METH.aluminumGlycinate),
      ),
      flag(
        'Polyacrylic acid',
        'cleared',
        dailymed(SET.welmateParaben, METH.polyacrylate),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.welmateParaben, METH.polyacrylate),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.welmateParaben, METH.pgTopical),
      ),
      flag('Kaolin', 'cleared', dailymed(SET.welmateParaben, METH.kaolin)),
      flag(
        'Tartaric acid',
        'cleared',
        dailymed(SET.welmateParaben, METH.tartaric),
      ),
      cleared(SET.welmateParaben, 'Glycerin'),
      cleared(SET.welmateParaben, 'PVP'),
      cleared(SET.welmateParaben, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: WELMATE Lidocaine 4% Patch (DailyMed 4303fd30 / NDC 73581-912) = Avoid. Drivers are methylparaben + propylparaben (High in every form, including patches). Titanium dioxide is also High. DailyMed Drug Facts: aluminum glycinate, glycerin, kaolin, methylparaben, polyacrylic acid, polysorbate 80, propylene glycol, propylparaben, PVP, sodium polyacrylate, tartaric acid, titanium dioxide, water. Own formulaId — do NOT clone HealthWise 31314dda and do NOT clone WELMATE 73581-911 / Amazon Basics e3b4f9b1 (those DF print 3-(2-ethylhexyloxy)propane-1,2-diol and have no parabens). Backing ignored. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.welmateParaben} (WELMATE Lidocaine 4% NDC 73581-912) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.naturewise,
    productName: 'NatureWise Curcumin Turmeric 2250 mg',
    brand: 'NatureWise',
    category: PAIN_FEVER,
    barcode: '858081006196 858081006110 810157850065',
    formulaId: ID.naturewise,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic turmeric root', strength: '1750mg' },
      {
        name: 'Organic turmeric extract (95% curcuminoids)',
        strength: '500mg',
      },
      { name: 'Organic ginger root', strength: '105mg' },
      { name: 'BioPerine black pepper extract', strength: '15mg' },
    ],
    inactiveIngredients: [
      flag('Rice flour', 'cleared', labelCite(CITE.naturewise, METH.riceFlour)),
      flag(
        'Pullulan capsule',
        'cleared',
        labelCite(CITE.naturewise, METH.pullulan),
      ),
      flag('Rice hull', 'cleared', labelCite(CITE.naturewise, METH.riceHull)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: NatureWise Curcumin Turmeric 2250 = Caution. Driver is rice flour (locked exact Caution token; distinct from Cleared rice-hull / rice-bran / rice protein). ${RICE_FLOUR_TAP} Pullulan capsule is Cleared. Rice hull sits on the locked Cleared rice-hull family (distinct from rice flour). Official iHerb / Target other-ingredients: pullulan capsule, rice hull, rice flour. No SiO2 / dye / TiO2. Turmeric / ginger / BioPerine are labeled actives listed neutrally. Pack sizes (90 / 180 / 360) share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.`,
    retailers: [...AMAZON, 'Target', 'NatureWise'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.naturewise} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.gsDual,
    productName: 'GoodSense Dual Action',
    brand: 'GoodSense',
    category: PAIN_FEVER,
    barcode: '301135300684',
    formulaId: BC_DUAL_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag('Talc', 'high', dailymed(SET.gsDual, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.gsDual, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.gsDual, METH.peg)),
      flag('Sucralose', 'moderate', dailymed(SET.gsDual, METH.sucralose)),
      flag(
        'Ferric oxide yellow',
        'cleared',
        dailymed(SET.gsDual, METH.ferricYellow),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.gsDual, METH.sio2),
      ),
      flag(
        'Polyvinyl alcohol',
        'cleared',
        dailymed(SET.gsDual, METH.pvaOral),
      ),
      cleared(SET.gsDual, 'Corn starch'),
      cleared(SET.gsDual, 'Croscarmellose sodium'),
      cleared(SET.gsDual, 'Crospovidone'),
      cleared(SET.gsDual, 'Microcrystalline cellulose'),
      cleared(SET.gsDual, 'Povidone'),
      cleared(SET.gsDual, 'Pregelatinized starch'),
      cleared(SET.gsDual, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: GoodSense Dual Action APAP 250 / IBU 125 = Avoid. Drivers are talc + titanium dioxide (High). Ferric oxide yellow is the locked leftover Caution token (not the Avoid driver). Oral polyvinyl alcohol is now Cleared (oral-coating lock). Reuses formulaId `amazon-basic-care-dual-action-tio2-talc` — same OI+actives as the already-on-main Basic Care Dual Action row (7e27f5cb). That Basic Care row is not rewritten / not cloned. DailyMed setid b117358c (NDC 0113-5300). Sportpharm twin 3f4ade2c and Dual Action Back Pain 89476188 share this OI and are not extra Search rows. Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: DUAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.gsDual} (GoodSense Dual Action NDC 0113-5300); reuses ${BC_DUAL_FORMULA} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ha2z335,
    productName: 'HealthA2Z Ibuprofen 200 mg Fast Relief',
    brand: 'HealthA2Z',
    category: PAIN_FEVER,
    formulaId: ID.ha2z335,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('Talc', 'high', dailymed(SET.ha2z335, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.ha2z335, METH.tio2)),
      flag(
        'Iron oxide red',
        'cleared',
        dailymed(SET.ha2z335, METH.ironOxideRed),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET.ha2z335, METH.sio2),
      ),
      flag('Triacetin', 'cleared', dailymed(SET.ha2z335, METH.triacetin)),
      cleared(SET.ha2z335, 'Corn starch'),
      cleared(SET.ha2z335, 'Hypromellose'),
      cleared(SET.ha2z335, 'Magnesium stearate'),
      cleared(SET.ha2z335, 'Microcrystalline cellulose'),
      cleared(SET.ha2z335, 'Pregelatinized starch'),
      cleared(SET.ha2z335, 'Sodium starch glycolate'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: HealthA2Z Ibuprofen 200 NDC 69168-335 = Avoid. Drivers are talc + titanium dioxide (High). Iron oxide red is the locked leftover Caution token (exact string; distinct from ferric oxide red). DailyMed setid dd63b011 Drug Facts: corn starch, hypromellose, iron oxide red, magnesium stearate, microcrystalline cellulose, pregelatinized starch, silicon dioxide, sodium starch glycolate, talc, titanium dioxide, triacetin. Full current OI is now exact-covered. Not a rewrite of amazon-basic-care-ibuprofen-tio2 already on main (that SPL prints red iron oxide / yellow iron oxide — those strings stay ungraded; do not alias). Distinct from NDC 69168-382 (Yellow 6, no talc). Ages 12+.',
    retailers: [...AMAZON],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ha2z335} (HealthA2Z / Allegiant NDC 69168-335) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.gsKidsChew,
    productName: 'GoodSense Children’s Ibuprofen 100 mg Chewable',
    brand: 'GoodSense',
    category: PAIN_FEVER,
    formulaId: ID.gsKidsChew,
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '100mg' }],
    inactiveIngredients: [
      flag('Aspartame', 'high', dailymed(SET.gsKidsChew, METH.aspartame)),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.gsKidsChew, METH.dyes),
      ),
      flag('Soybean oil', 'high', dailymed(SET.gsKidsChew, METH.seedOilChew)),
      flag('Acesulfame potassium', 'moderate', dailymed(SET.gsKidsChew, METH.aceK)),
      flag(
        'Ammonium glycyrrhizin',
        'cleared',
        dailymed(SET.gsKidsChew, METH.ammonGly),
      ),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET.gsKidsChew, METH.sls),
      ),
      flag('Mannitol', 'limited', dailymed(SET.gsKidsChew, METH.mannitol)),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed(SET.gsKidsChew, METH.flavors),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed(SET.gsKidsChew, METH.sio2),
      ),
      flag('Succinic acid', 'cleared', dailymed(SET.gsKidsChew, METH.succinic)),
      cleared(SET.gsKidsChew, 'Carnauba wax'),
      cleared(SET.gsKidsChew, 'Croscarmellose sodium'),
      cleared(SET.gsKidsChew, 'Hypromellose'),
      cleared(SET.gsKidsChew, 'Magnesium stearate'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: GoodSense Children’s Ibuprofen 100 chew (DailyMed a8fc1b0c) = Avoid. Drivers are aspartame + FD&C Yellow #6 aluminum lake + soybean oil on this chew (gummy/chew seed-oil High). ${CHEW_OIL_TAP} Ammonium glycyrrhizin is the locked leftover Caution token (distinct from Cleared licorice extract). Succinic acid is the locked leftover Cleared token. Drug Facts: acesulfame potassium, ammonium glycyrrhizin, aspartame, carnauba wax, croscarmellose sodium, FD&C yellow no. 6 aluminum lake, hypromellose, magnesium stearate, mannitol, natural and artificial flavors, silicon dioxide, sodium lauryl sulfate, soybean oil, succinic acid. Phenylketonurics: phenylalanine 6 mg/tablet. Ages 2–11 (under 2: ask a doctor).`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: KIDS_IBU_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.gsKidsChew} (GoodSense Children’s Ibuprofen chew NDC 0113-2461) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.gsLiqGel,
    productName: 'GoodSense Ibuprofen Liquid Gels 200 mg',
    brand: 'GoodSense',
    category: PAIN_FEVER,
    formulaId: ID.gsLiqGel,
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    productType: OTC,
    activeIngredients: [{ name: 'Solubilized ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('FD&C Green No. 3', 'high', dailymed(SET.gsLiqGel, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.gsLiqGel, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.gsLiqGel, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.gsLiqGel, METH.pg)),
      flag(
        'Polyvinyl acetate phthalate',
        'cleared',
        dailymed(SET.gsLiqGel, METH.pvap),
      ),
      flag(
        'Ammonium hydroxide',
        'cleared',
        dailymed(SET.gsLiqGel, METH.ammoniumHydroxide),
      ),
      flag('Sorbitan', 'cleared', dailymed(SET.gsLiqGel, METH.sorbitan)),
      flag('Sorbitol', 'limited', dailymed(SET.gsLiqGel, METH.sorbitol)),
      flag(
        'Caprylic and capric acid triglycerides',
        'limited',
        dailymed(SET.gsLiqGel, METH.mctUnlabeled),
      ),
      flag(
        'Isopropyl alcohol',
        'limited',
        dailymed(SET.gsLiqGel, METH.ipa),
      ),
      flag('Lecithin', 'cleared', dailymed(SET.gsLiqGel, METH.lecithin)),
      flag('Potassium hydroxide', 'cleared', dailymed(SET.gsLiqGel, METH.koh)),
      cleared(SET.gsLiqGel, 'Gelatin'),
      cleared(SET.gsLiqGel, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: GoodSense Ibuprofen liquid gels = Avoid. Drivers are FD&C Green #3 + titanium dioxide (High). Polyvinyl acetate phthalate is the locked leftover Caution token (not needed to reach Avoid). Drug Facts on DailyMed 0cb4b0ef (NDC 0113-4501 minis): ammonium hydroxide, caprylic and capric acid triglycerides, FD&C green No. 3, gelatin, isopropyl alcohol, lecithin, macrogol/PEG 400, polyethylene glycol, polyvinyl acetate phthalate, potassium hydroxide, propylene glycol, purified water, sorbitol sorbitan solution, titanium dioxide. Ammonium hydroxide is the locked exact Caution token (DF words — not aliased from structured AMMONIA). Distinct from amazon-basic-care-ibuprofen-liqui-gels already on main (do not clone). Ages 12+.',
    retailers: [...PF_RETAILERS],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.gsLiqGel} (GoodSense Ibuprofen liquid gels NDC 0113-4501) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.midol,
    productName: 'Midol Complete',
    brand: 'Midol',
    category: PAIN_FEVER,
    barcode: '312843158597 312843555198',
    formulaId: ID.midol,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Caffeine', strength: '60mg' },
      { name: 'Pyrilamine maleate', strength: '15mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed(SET.midol, METH.dyes),
      ),
      flag('Titanium dioxide', 'high', dailymed(SET.midol, METH.tio2)),
      flag('Propylene glycol', 'moderate', dailymed(SET.midol, METH.pg)),
      flag('Shellac', 'cleared', dailymed(SET.midol, METH.shellac)),
      flag('Triacetin', 'cleared', dailymed(SET.midol, METH.triacetin)),
      cleared(SET.midol, 'Carnauba wax'),
      cleared(SET.midol, 'Croscarmellose sodium'),
      cleared(SET.midol, 'Hypromellose'),
      cleared(SET.midol, 'Magnesium stearate'),
      cleared(SET.midol, 'Microcrystalline cellulose'),
      cleared(SET.midol, 'Pregelatinized starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Midol Complete caplets = Avoid. Drivers are FD&C Blue #2 aluminum lake + titanium dioxide (High). Shellac is the locked leftover Cleared token (not a grade driver). DailyMed setid ce9e6acb Drug Facts: carnauba wax, croscarmellose sodium, FD&C blue #2 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, pregelatinized starch, propylene glycol, shellac, titanium dioxide, triacetin. Midol Complete Gelcaps are not this row (black iron oxide / ferrosoferric oxide is not an exact leftover lock). Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...PF_RETAILERS, 'midol.com'],
    cleanAlternatives: APAP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.midol} (Midol Complete NDC 0280-8005) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.amzLido,
    productName: 'Amazon Basics Pain Relief Patch with 4% Lidocaine',
    brand: 'Amazon Basics',
    category: PAIN_FEVER,
    formulaId: ID.amzLido,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.amzLido, METH.tio2)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.amzLido, METH.ps80)),
      flag(
        '3-(2-ethylhexyloxy)propane-1,2-diol',
        'cleared',
        dailymed(SET.amzLido, METH.ethylhexyl),
      ),
      flag(
        'Aluminum glycinate',
        'cleared',
        dailymed(SET.amzLido, METH.aluminumGlycinate),
      ),
      flag(
        'Iodopropynyl butylcarbamate',
        'cleared',
        dailymed(SET.amzLido, METH.ipbc),
      ),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.amzLido, METH.phenoxy)),
      flag(
        'Polyacrylic acid',
        'cleared',
        dailymed(SET.amzLido, METH.polyacrylate),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.amzLido, METH.polyacrylate),
      ),
      flag('Propylene glycol', 'cleared', dailymed(SET.amzLido, METH.pgTopical)),
      flag(
        'Carboxymethylcellulose sodium',
        'cleared',
        dailymed(SET.amzLido, METH.celluloseGum),
      ),
      flag('Kaolin', 'cleared', dailymed(SET.amzLido, METH.kaolin)),
      flag('Petrolatum', 'cleared', dailymed(SET.amzLido, METH.petrolatum)),
      flag('Tartaric acid', 'cleared', dailymed(SET.amzLido, METH.tartaric)),
      cleared(SET.amzLido, 'Glycerin'),
      cleared(SET.amzLido, 'Povidone'),
      cleared(SET.amzLido, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Amazon Basics Pain Relief Patch with 4% Lidocaine = Avoid. Driver is titanium dioxide (High). DailyMed setid e3b4f9b1 Drug Facts print 3-(2-ethylhexyloxy)propane-1,2-diol — the locked exact ethylhexylglycerin alias Caution row (both strings written; not Avoid). Aluminum glycinate / IPBC / phenoxyethanol / polyacrylate are standalone Caution. Same OI+actives as WELMATE 73581-911 (cff71b75) — they share this formulaId (two Search rows). Do NOT clone HealthWise 31314dda or WELMATE 73581-912 paraben row (list 2). Backing ignored. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.amzLido} (Amazon Basics Lidocaine 4% NDC 72288-967); twin WELMATE ${SET.welmateEh} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.welmateEh,
    productName: 'WELMATE Lidocaine 4% Pain Relieving Patch',
    brand: 'WELMATE',
    category: PAIN_FEVER,
    formulaId: ID.amzLido,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '4%' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.welmateEh, METH.tio2)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.welmateEh, METH.ps80)),
      flag(
        '3-(2-ethylhexyloxy)propane-1,2-diol',
        'cleared',
        dailymed(SET.welmateEh, METH.ethylhexyl),
      ),
      flag(
        'Aluminum glycinate',
        'cleared',
        dailymed(SET.welmateEh, METH.aluminumGlycinate),
      ),
      flag(
        'Iodopropynyl butylcarbamate',
        'cleared',
        dailymed(SET.welmateEh, METH.ipbc),
      ),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.welmateEh, METH.phenoxy)),
      flag(
        'Polyacrylic acid',
        'cleared',
        dailymed(SET.welmateEh, METH.polyacrylate),
      ),
      flag(
        'Sodium polyacrylate',
        'cleared',
        dailymed(SET.welmateEh, METH.polyacrylate),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET.welmateEh, METH.pgTopical),
      ),
      flag(
        'Carboxymethylcellulose sodium',
        'cleared',
        dailymed(SET.welmateEh, METH.celluloseGum),
      ),
      flag('Kaolin', 'cleared', dailymed(SET.welmateEh, METH.kaolin)),
      flag('Petrolatum', 'cleared', dailymed(SET.welmateEh, METH.petrolatum)),
      flag('Tartaric acid', 'cleared', dailymed(SET.welmateEh, METH.tartaric)),
      cleared(SET.welmateEh, 'Glycerin'),
      cleared(SET.welmateEh, 'Povidone'),
      cleared(SET.welmateEh, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: WELMATE Lidocaine 4% Pain Relieving Patch (NDC 73581-911 / DailyMed cff71b75) = Avoid. Same Drug Facts OI as Amazon Basics e3b4f9b1 — including printed 3-(2-ethylhexyloxy)propane-1,2-diol — so this row REUSES formulaId ${ID.amzLido} (not cloned). Do NOT merge into WELMATE 73581-912 (list 2 paraben Avoid) or HealthWise 31314dda. Backing ignored. Ages 12+. ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.welmateEh} (WELMATE Lidocaine 4% NDC 73581-911); shares formulaId ${ID.amzLido} — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

const BY_ID = Object.fromEntries(
  BATCH54_AMAZON_PF_HOLES.map((record) => [record.id, record]),
);

if (BATCH54_AMAZON_PF_HOLES.length !== 20) {
  throw new Error('batch 54 must write exactly 20 Search rows');
}
if (BATCH54_AMAZON_PF_HOLES.filter((r) => r.verdict === 'clean').length !== 2) {
  throw new Error('batch 54 Clean tally is 2');
}
if (BATCH54_AMAZON_PF_HOLES.filter((r) => r.verdict === 'caution').length !== 6) {
  throw new Error('batch 54 Caution tally is 6');
}
if (BATCH54_AMAZON_PF_HOLES.filter((r) => r.verdict === 'avoid').length !== 12) {
  throw new Error('batch 54 Avoid tally is 12');
}
if (BATCH54_AMAZON_PF_HOLES.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 54 stays on Pain & Fever');
}
const BATCH54_CATCHUP_BARCODES: Record<string, string> = {
  [ID.nutricost]: '702669931403',
  [ID.qunol1500]: '850184008459 850184008466',
  [ID.qunol1000]: '850184008435 850184008756',
  [ID.mommy]: '679234058936',
  [ID.bioschwartz]: '737212751023 810056430450 810056430573 810056430405',
  [ID.nowTurmeric]: '733739047922',
  [ID.doctorsBest]: '753950001954',
  [ID.naturewise]: '858081006196 858081006110 810157850065',
  [ID.midol]: '312843158597 312843555198',
  // KYR5-b set-id-only chunk 19 — Kroger grocery PDP 36-ct UPC-A for
  // NDC 0113-5300-68 (setid b117358c). Do not steal GoodSense naproxen
  // 0113-0901 / 301139490787 (different setid 6bc74cda) or liquid-gel
  // 0113-0298 / 301130298603 (different setid 3b78c004).
  [ID.gsDual]: '301135300684',
};
for (const record of BATCH54_AMAZON_PF_HOLES) {
  const expected = BATCH54_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 54 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 54 must not invent barcodes on ${record.id}`);
  }
}
if (BATCH54_AMAZON_PF_HOLES.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 54 recordStatus must stay unverified');
}

const GS_DUAL = BY_ID[ID.gsDual];
const HA2Z335 = BY_ID[ID.ha2z335];
const AMZ_LIDO = BY_ID[ID.amzLido];
const WELMATE_EH = BY_ID[ID.welmateEh];
const WELMATE_PARABEN = BY_ID[ID.welmateParaben];
const HEALTHWISE = BY_ID[ID.healthwise];
const QUNOL_1000 = BY_ID[ID.qunol1000];
const QUNOL_1500 = BY_ID[ID.qunol1500];
const BIOSCHWARTZ = BY_ID[ID.bioschwartz];
const NUTRICOST = BY_ID[ID.nutricost];
const NATUREWISE = BY_ID[ID.naturewise];
const GS_KIDS = BY_ID[ID.gsKidsChew];
const MIDOL = BY_ID[ID.midol];

if (GS_DUAL?.formulaId !== BC_DUAL_FORMULA) {
  throw new Error('GoodSense Dual Action must reuse amazon-basic-care-dual-action-tio2-talc');
}
if (AMZ_LIDO?.formulaId !== ID.amzLido || WELMATE_EH?.formulaId !== ID.amzLido) {
  throw new Error('Amazon Basics + WELMATE 73581-911 must share amazon-basics-lidocaine-4-patch');
}
if (
  HEALTHWISE?.formulaId === WELMATE_PARABEN?.formulaId
  || HEALTHWISE?.formulaId === AMZ_LIDO?.formulaId
  || WELMATE_PARABEN?.formulaId === AMZ_LIDO?.formulaId
) {
  throw new Error('lidocaine list-2 rows must not clone the ethylhexyl twin formulaId');
}
if (QUNOL_1000?.formulaId === QUNOL_1500?.formulaId) {
  throw new Error('Qunol 1000 must not share the 1500 formulaId');
}
if (BIOSCHWARTZ?.verdict !== 'clean' || NUTRICOST?.verdict !== 'clean') {
  throw new Error('HPMC-only / HPMC + veg stearate turmeric rows must stay Clean');
}
if (NATUREWISE?.verdict !== 'caution' || QUNOL_1000?.verdict !== 'caution') {
  throw new Error('NatureWise rice flour and Qunol 1000 SiO2 must stay Caution');
}
if (
  !HA2Z335?.inactiveIngredients.some((item) => item.name === 'Iron oxide red')
) {
  throw new Error('HealthA2Z 69168-335 must list exact iron oxide red');
}
if (
  !GS_DUAL?.inactiveIngredients.some((item) => item.name === 'Pregelatinized starch')
) {
  throw new Error('GoodSense Dual Action must list pregelatinized starch');
}
if (
  !GS_KIDS?.inactiveIngredients.some((item) => item.name === 'Ammonium glycyrrhizin')
  || !GS_KIDS?.inactiveIngredients.some((item) => item.name === 'Succinic acid')
) {
  throw new Error('GoodSense kids chew must list ammonium glycyrrhizin + succinic acid');
}
if (!MIDOL?.inactiveIngredients.some((item) => item.name === 'Shellac')) {
  throw new Error('Midol Complete must list shellac');
}
if (
  !AMZ_LIDO?.inactiveIngredients.some(
    (item) => item.name === '3-(2-ethylhexyloxy)propane-1,2-diol',
  )
) {
  throw new Error('Amazon Basics lidocaine must print the ethylhexylglycerin alias');
}
if (BATCH54_REFUSED.some((item) => !item.token)) {
  throw new Error('every refused row must quote a token');
}

// Verdict tally (20 records): Clean 2 · Caution 6 · Avoid 12
// Reuse not cloned: drugstore banners / Thrive / Basic Care+Basics already
// on main / Asutra / batches 41–53. GoodSense Dual Action reuses
// amazon-basic-care-dual-action-tio2-talc. Amazon Basics lidocaine 4% +
// WELMATE 73581-911 share amazon-basics-lidocaine-4-patch.
// Refused still-missing exact §5: iron oxide yellow; oleoresin turmeric;
// glyceryl dibehenate; Vegetable Capsule; isomalt; unpinned HealthA2Z /
// TIME-Cap setids; no-OI movers; botanical-blend creams.
