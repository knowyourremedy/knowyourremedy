// DRAFT / not verified / batch 68 KYR6 founder-panel WRITE /
// methodology v1.6 + current main §5 exact. Additive / “also
// appears as” / locked exact-INCI rows only. No invented grades.
// No cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Founder-hunted panels ONLY (MM tablet multis +
// Kirkland Wild Alaskan FO + up&up PM ointment). recordStatus
// is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. UPC attached only when carton /
// Costco / OFF has a real 12-digit barcode — no invented
// codes. NDC ≠ UPC. Missing code ≠ no row (omit barcode).
// Pack sizes of the same name+form+inactives share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter
// (§6). Search wiring only. Not wired into Clean Picks UI.
// No photos. Letter tiles only on new ids. No fake Clean
// alts. No methodology wipe. No new §5 stamps.
// PROJECT_NOTES tally-only (do not wipe LIVE NOW).
//
// Next free batch after 67 = 68. Do not wait on PR #229
// (batch67 MM D3 / adult gummies). Do not edit batch67
// files. Do not reopen batch 65 / 66.
//
// REUSE first — match brand+name+form+strength for product
// ids; same inactives share formulaId across store siblings.
//
// DO NOT REOPEN / DO NOT CLONE:
// batch65 20 new / 10 reuse · batch66 6 held · batch67
// members-mark-d3-50mcg-softgels /
// members-mark-d3-125mcg-softgels /
// members-mark-adult-multi-gummies ·
// kirkland-fish-oil-softgels-clear (porcine 1000 mg — not
// Wild Alaskan) · nature-made-fish-oil-1200-burpless
// (enteric — do not alias) · assured-headache-pm (already
// on main, batch29) · equate / cvs / walgreens PM ointment
// product ids · MM kids gummies · Kirkland enteric FO ·
// TopCare Century Women’s 50+ · MM Max Sleep · Nice! ·
// Walgreens adult vitamins · Kirkland guaifenesin-only ·
// cetirizine store twins (stay dead this write).
//
// LOCKS used (exact §5): Silica / SiO2 = 0-pt nanoparticle
// Caution cap. Calcium silicate = standalone Caution
// (silicate anti-caking; not the SiO2 cap). Maltodextrin
// Limited. Unlabeled MCT / Medium Chain Triglycerides with
// no plant named = Limited (tap vs named-MCT Cleared).
// Unspecified starch = Limited (distinct from named corn /
// pregelatinized starch). Glucose syrup / sugar = Cleared
// sweetener row. Gelatin (including Gelatin (Bovine)) =
// Cleared; bovine is an honest note, not a second grade.
// Mixed tocopherols / dl-alpha tocopherol as antioxidant =
// Cleared (≠ tocopheryl acetate). d-ALPHA TOCOPHERYL
// SUCCINATE on these MM tablets is the labeled vitamin E
// SF form — not graded as inactive tocopheryl acetate
// Caution. dl-ALPHA TOCOPHERYL ACETATE on Women’s 50+ is
// the labeled vitamin E SF form — same (not inactive
// Caution). Named plant-part oral food/botanical extracts
// (chaste tree berry; pomegranate fruit powder extract) =
// Cleared class (Sept 15). Distinct from Caution
// “Pomegranate Powder” exact token. Organic beet root /
// beet (root) powder as food/excipient = Cleared. HPMC /
// MCC / croscarmellose / crospovidone / stearates /
// carnauba / triacetin / gum arabic / dicalcium /
// tricalcium phosphate = Cleared. Limited-only never
// Avoid. Avoid needs High. Softgel / topical oil fill ≠
// gummy seed-oil High. Display keys stay clean / caution /
// avoid. Grade only true inactives — SF vitamins/minerals
// / featured herb actives are not High/Caution inactive
// flags.
//
// TALLY (unverified drafts in THIS file): 5 rows — Clean 1 /
// Caution 4 / Avoid 0. NEW 5 / REUSE-formula 1 / SKIPPED
// Assured Headache PM (already on main; live DF complete)
// plus the listed do-not-write pile.
//
// Independently Clean analogs already on main (not cloned):
// thorne-womens-multi-50-plus · thorne-mens-multi-50-plus ·
// we-heart-wholesome-womens-multi · we-heart-wholesome-mens-multi ·
// gol-vitamin-code-womens · gol-vitamin-code-womens-50 ·
// gol-vitamin-code-mens · kirkland-fish-oil-softgels-clear ·
// nature-made-fish-oil-1200-clear · equate-lubricant-eye-pf ·
// refresh-tears-pf.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const ALLERGY = 'Allergy';

const MM_WOMENS = 'members-mark-advanced-womens-multi';
const MM_MENS = 'members-mark-advanced-mens-multi';
const MM_WOMENS_50 = 'members-mark-advanced-womens-50-multi';
const KIRK_WILD_FO = 'kirkland-wild-alaskan-fish-oil';
const UPUP_PM = 'upup-pm-lubricant-ointment';

const STORE_PM_LANOLIN = 'store-pm-ointment-lanolin-alcohol';
const THORNE_WOMENS = 'thorne-womens-multi-50-plus';
const THORNE_MENS = 'thorne-mens-multi-50-plus';
const WH_WOMENS = 'we-heart-wholesome-womens-multi';
const WH_MENS = 'we-heart-wholesome-mens-multi';
const GOL_WOMENS = 'gol-vitamin-code-womens';
const GOL_WOMENS_50 = 'gol-vitamin-code-womens-50';
const GOL_MENS = 'gol-vitamin-code-mens';
const EQUATE_EYE_PF = 'equate-lubricant-eye-pf';
const REFRESH_TEARS_PF = 'refresh-tears-pf';

const SET_UPUP_PM = 'e92a258b-15ee-491e-b367-5d1be85be8c5';

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const CA_SILICATE_TAP =
  'Calcium silicate is a standalone Caution silicate anti-caking row (Mg trisilicate neighborhood). It is not the SiO2 0-pt nanoparticle cap.';

const UNLABELED_MCT_TAP =
  'Unlabeled Medium Chain Triglycerides / MCT with no coconut or plant named is the Limited opacity row. Named MCT (derived from palm kernel oil) / MCT oil labeled coconut / named MCT coating are the Cleared fill rows — this unlabeled string is not that Cleared row.';

const ZINC_PARKED =
  'Zinc (oxide / citrate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const METH = {
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica / Silica (oral) — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  calciumSilicate: `Methodology §5 Caution (calcium silicate — silicate anti-caking; not the SiO2 0-pt cap; locked Sept 15, 2026). ${CA_SILICATE_TAP}`,
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  unlabeledMct: `Methodology §5 Limited-risk (unlabeled MCT / medium chain triglycerides with no coconut or plant named — opacity; not the Cleared named-MCT coating/fill row). ${UNLABELED_MCT_TAP}`,
  unspecifiedStarch:
    'Methodology §5 Limited-risk (unspecified starch — same Limited unspecified/modified-starch row; distinct from Cleared named corn starch / potato starch / pregelatinized starch)',
  lanolinAlcohol:
    'Methodology §5 Caution (lanolin alcohol / lanolin alcohols — exact token; same Caution as lanolin / wool-alcohol family; standalone Caution, not Avoid; locked Sept 16, 2026)',
  namedBotanical:
    'Methodology §5 Cleared (named food/botanical extracts as oral inactive — fennel seed, chamomile flower, calendula, lemon balm leaf, and like named plant-part food botanicals; same class as grape seed extract; locked Sept 15, 2026). Distinct from Caution Pomegranate Powder exact token.',
  beetRoot:
    'Methodology §5 Cleared (organic beet root / beet (root) powder as food / excipient / color-food — whole-food, not a synthetic dye; locked Sept 14, 2026)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / D-Alpha-Tocopherol / dl-alpha tocopherol as antioxidants — locked v1.6 / Sept 16). Distinct from Caution tocopheryl acetate.',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate / vegetable stearate)',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum)',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose / HPC)',
  povidone: 'Methodology §5 Cleared (povidone / copovidone / crospovidone — locked housekeeping)',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate / dibasic calcium phosphate — mineral fillers / buffers)',
  gelatin: 'Methodology §5 Cleared (gelatin / lactose / carnauba wax / beeswax / purified water)',
  carnauba: 'Methodology §5 Cleared (carnauba wax — wax family)',
  triacetin: 'Methodology §5 Cleared (triacetin — tablet/caplet coating plasticizer; locked Sept 15, 2026)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  sugar:
    'Methodology §5 Cleared (cane sugar / glucose syrup / tapioca syrup-dextrose — acceptable sweeteners)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / water)',
  mineralOil:
    'Methodology §5 Cleared (mineral oil as topical ointment occlusive — petrolatum neighborhood; tap: not an oral oil)',
  petrolatum:
    'Methodology §5 Cleared (petrolatum / white petrolatum — topical occlusive)',
  cleared: 'Methodology §5 Cleared',
} as const;

const CITE = {
  mmWomens:
    "Founder Sam’s ingredients tile + live samsclub.com Member's Mark Advanced Women's Multivitamin Tablets, 275 ct. (item 13850672942) Ingredients (exact): CALCIUM CARBONATE, MAGNESIUM OXIDE, POTASSIUM CHLORIDE, MICROCRYSTALLINE CELLULOSE, CALCIUM ASCORBATE, FERROUS FUMARATE, MALTODEXTRIN, CHOLINE BITARTRATE, CROSCARMELLOSE SODIUM, DICALCIUM PHOSPHATE, CALCIUM SILICATE. CONTAINS < 2% OF BEET (ROOT) POWDER, BETA-CAROTENE, BIOTIN, CHASTE TREE (BERRY) POWDER EXTRACT, CHOLECALCIFEROL, CHROMIUM PICOLINATE, CUPRIC SULFATE, d-ALPHA TOCOPHERYL SUCCINATE, D-CALCIUM PANTOTHENATE, FOLIC ACID, HYDROXYPROPYL METHYLCELLULOSE, MAGNESIUM STEARATE, MANGANESE SULFATE, METHYLCOBALAMIN, NIACINAMIDE, PHYTONADIONE, POMEGRANATE (FRUIT) POWDER EXTRACT, POTASSIUM IODIDE, PYRIDOXINE HYDROCHLORIDE, RETINYL ACETATE, RIBOFLAVIN, SILICA, SODIUM MOLYBDATE, SODIUM SELENATE, STEARIC ACID, THIAMINE HYDROCHLORIDE, TRIACETIN, ZINC CITRATE, ZINC OXIDE.",
  mmMens:
    "Founder Sam’s ingredients tile Member's Mark Advanced Men's Multivitamin Tablets, 275 ct. (samsclub.com item 13904307439 / #990342488) Ingredients (exact): CALCIUM CARBONATE, MAGNESIUM OXIDE, MICROCRYSTALLINE CELLULOSE, POTASSIUM CHLORIDE, CALCIUM ASCORBATE, MALTODEXTRIN, DICALCIUM PHOSPHATE, BEET (ROOT) POWDER. CONTAINS < 2% OF BETA-CAROTENE, BIOTIN, CALCIUM SILICATE, CARNAUBA WAX, CHOLECALCIFEROL, CHROMIUM PICOLINATE, CROSCARMELLOSE SODIUM, CUPRIC SULFATE, d-ALPHA TOCOPHERYL SUCCINATE, D-CALCIUM PANTOTHENATE, ELEUTHERO (ROOT) EXTRACT, FOLIC ACID, HYDROXYPROPYL METHYLCELLULOSE, MAGNESIUM STEARATE, MANGANESE SULFATE, METHYLCOBALAMIN, NIACINAMIDE, PHYTONADIONE, POTASSIUM IODIDE, PYRIDOXINE HYDROCHLORIDE, RETINYL ACETATE, RIBOFLAVIN, SODIUM MOLYBDATE, SODIUM SELENATE, STEARIC ACID, THIAMINE HYDROCHLORIDE, TRIACETIN, TURMERIC (ROOT) POWDER EXTRACT, ZINC CITRATE, ZINC OXIDE.",
  mmWomens50:
    "Founder Sam’s ingredients tile Member's Mark Advanced Women's 50+ Multivitamin Tablets, 275 ct. (samsclub.com item 13899862238 / #990315403) Ingredients (exact): CALCIUM CARBONATE, MAGNESIUM OXIDE, ASCORBIC ACID, POTASSIUM CHLORIDE, DICALCIUM PHOSPHATE, MICROCRYSTALLINE CELLULOSE, CRANBERRY POWDER (FRUIT), CHOLINE BITARTRATE, STARCH, MALTODEXTRIN, dl-ALPHA TOCOPHERYL ACETATE. CONTAINS < 2% OF BETA-CAROTENE, BIOTIN, CALCIUM SILICATE, CHOLECALCIFEROL, CHROMIUM PICOLINATE, CROSCARMELLOSE SODIUM, CROSPOVIDONE, CUPRIC SULFATE, D-CALCIUM PANTOTHENATE, dl-ALPHA TOCOPHEROL, FERROUS FUMARATE, FOLIC ACID, GELATIN, GLUCOSE SYRUP, GUM ARABIC, HYDROXYPROPYL METHYLCELLULOSE, MAGNESIUM STEARATE, MANGANESE SULFATE, MARIGOLD FLOWER EXTRACT, MEDIUM CHAIN TRIGLYCERIDES, METHYLCOBALAMIN, MIXED TOCOPHEROLS, NIACINAMIDE, PHYTONADIONE, POTASSIUM IODIDE, PYRIDOXINE HYDROCHLORIDE, RIBOFLAVIN, SILICA, SODIUM ASCORBATE, SODIUM BORATE, SODIUM MOLYBDATE, SODIUM SELENATE, STEARIC ACID, SUGAR, THIAMINE MONONITRATE, TRIACETIN, TRICALCIUM PHOSPHATE, ZINC CITRATE, ZINC OXIDE.",
  kirkWild:
    'Kirkland Signature Wild Alaskan Fish Oil 1400 mg 230-ct Costco Business / Open Food Facts 096619653539 / DSLD 239461 other-ingredients: Softgel (Gelatin (Bovine), Glycerin, Water), Vitamin E (as a mixed tocopherol, as an antioxidant). Fish Oil (Pollock and Salmon as naturally formed triglycerides) is the active. Distinct from kirkland-fish-oil-softgels-clear (porcine gelatin, 1000 mg) and from Kirkland enteric FO.',
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

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return {
    ...opts,
    recordStatus: opts.recordStatus ?? UNVERIFIED,
  };
}

const WOMENS_ALTS: CleanAlternative[] = [
  alt(
    THORNE_WOMENS,
    'Independently Clean Thorne Women’s Multi 50+ already on main (HPMC capsule only). Form: capsule vs this tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    WH_WOMENS,
    'Independently Clean We Heart Wholesome Women’s Multi already on main (HPMC capsule + organic rice flour). Form: capsule vs this tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    GOL_WOMENS,
    'Independently Clean Garden of Life Vitamin Code Women’s already on main. Form labeled, not a hard filter (§6).',
  ),
];

const MENS_ALTS: CleanAlternative[] = [
  alt(
    THORNE_MENS,
    'Independently Clean Thorne Men’s Multi 50+ already on main (HPMC + MCC). Form: capsule vs this tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    WH_MENS,
    'Independently Clean We Heart Wholesome Men’s Multi already on main (HPMC capsule + organic rice flour). Form: capsule vs this tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    GOL_MENS,
    'Independently Clean Garden of Life Vitamin Code Men’s already on main. Form labeled, not a hard filter (§6).',
  ),
];

const WOMENS_50_ALTS: CleanAlternative[] = [
  alt(
    THORNE_WOMENS,
    'Independently Clean Thorne Women’s Multi 50+ already on main (HPMC capsule only). Form: capsule vs this tablet — labeled, not a hard filter (§6). Same 50+ aisle peer.',
  ),
  alt(
    GOL_WOMENS_50,
    'Independently Clean Garden of Life Vitamin Code 50 & Wiser Women already on main. Form labeled, not a hard filter (§6).',
  ),
];

const EYE_PF_ALTS: CleanAlternative[] = [
  alt(
    EQUATE_EYE_PF,
    'Independently Clean Equate preservative-free lubricant already on main. Form: PF vial vs this PM ointment — labeled, not a hard filter (§6). Prefer PF over lanolin-alcohol bottles.',
  ),
  alt(
    REFRESH_TEARS_PF,
    'Independently Clean Refresh Tears PF already on main. Form: PF vial — labeled, not a hard filter (§6).',
  ),
];

export const BATCH68_CATCHUP_BARCODES: Record<string, string> = {
  [KIRK_WILD_FO]: '096619653539',
};

export const BATCH68_KYR6_FOUNDER_PANELS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: KIRK_WILD_FO,
    productName: 'Kirkland Signature Wild Alaskan Fish Oil 1400 mg Softgels',
    brand: 'Kirkland Signature',
    category: VITAMINS,
    barcode: BATCH68_CATCHUP_BARCODES[KIRK_WILD_FO],
    formulaId: KIRK_WILD_FO,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    retailers: ['Costco'],
    activeIngredients: [
      { name: 'Wild Alaskan fish oil (pollock and salmon, naturally formed triglycerides)', strength: '1400mg' },
      { name: 'Omega-3 fatty acids', strength: '330mg' },
      { name: 'EPA + DHA', strength: '230mg' },
      { name: 'Vitamin A (as retinol, naturally occurring)', strength: '300mcg RAE' },
      { name: 'Vitamin D3 (as cholecalciferol, naturally occurring)', strength: '0.3mcg' },
    ],
    inactiveIngredients: [
      flag('Gelatin (bovine)', 'cleared', labelCite(CITE.kirkWild, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.kirkWild, METH.glycerin)),
      flag('Water', 'cleared', labelCite(CITE.kirkWild, METH.water)),
      flag(
        'Vitamin E (mixed tocopherols, as an antioxidant)',
        'cleared',
        labelCite(CITE.kirkWild, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Kirkland Signature Wild Alaskan Fish Oil = Clean. Costco tile / DSLD 239461 / Open Food Facts UPC 096619653539. Softgel is Gelatin (Bovine), Glycerin, Water plus mixed-tocopherol vitamin E as the antioxidant — no TiO2 / FD&C / enteric polymers. Gelatin (Bovine) sits on the Cleared gelatin row; bovine is an honest note (not porcine, not a second grade). Mixed tocopherols are Cleared-class antioxidants. Own formulaId — do NOT alias to `kirkland-fish-oil-softgels-clear` (that twin is porcine gelatin / 1000 mg standard clear FO already on main) and do NOT alias to Kirkland enteric FO (not written). Softgel fill ≠ gummy seed-oil High. Contains fish. No DailyMed drug SPL (dietary supplement). Adults. Draft, not verified.',
    sourcesGeneral: [
      `${CITE.kirkWild} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`,
    ],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: MM_WOMENS,
    productName: "Member's Mark Advanced Women's Multivitamin Tablets",
    brand: "Member's Mark",
    category: VITAMINS,
    formulaId: MM_WOMENS,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    retailers: ["Sam's Club"],
    activeIngredients: [
      { name: "Women's multivitamin / multimineral (29 vitamins, minerals, and herbs as labeled)", strength: '1 tablet (label serving)' },
      { name: 'Vitamin C (as calcium ascorbate)', strength: 'label serving' },
      { name: 'Vitamin E (as d-alpha tocopheryl succinate)', strength: 'label serving' },
      { name: 'Iron (as ferrous fumarate)', strength: 'label serving' },
      { name: 'Choline (as choline bitartrate)', strength: 'label serving' },
      { name: 'Chaste tree (berry) / pomegranate (fruit) — labeled herbs', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.mmWomens, METH.cellulose)),
      flag('Maltodextrin', 'limited', labelCite(CITE.mmWomens, METH.maltodextrin)),
      flag('Croscarmellose sodium', 'cleared', labelCite(CITE.mmWomens, METH.cellulose)),
      flag('Dicalcium phosphate', 'cleared', labelCite(CITE.mmWomens, METH.dical)),
      flag('Calcium silicate', 'cleared', labelCite(CITE.mmWomens, METH.calciumSilicate)),
      flag('Beet (root) powder', 'cleared', labelCite(CITE.mmWomens, METH.beetRoot)),
      flag(
        'Chaste tree (berry) powder extract',
        'cleared',
        labelCite(CITE.mmWomens, METH.namedBotanical),
      ),
      flag('Hydroxypropyl methylcellulose', 'cleared', labelCite(CITE.mmWomens, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.mmWomens, METH.stearic)),
      flag(
        'Pomegranate (fruit) powder extract',
        'cleared',
        labelCite(CITE.mmWomens, METH.namedBotanical),
      ),
      flag('Silica', 'cleared', labelCite(CITE.mmWomens, METH.sio2)),
      flag('Stearic acid', 'cleared', labelCite(CITE.mmWomens, METH.stearic)),
      flag('Triacetin', 'cleared', labelCite(CITE.mmWomens, METH.triacetin)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Advanced Women’s Multi tablets = Caution (calcium silicate + silica cap + maltodextrin). Founder Sam’s tile OI exact (samsclub.com Advanced Women’s 275-ct). Grade only true inactives — SF vitamins/minerals (calcium carbonate, magnesium oxide, potassium chloride, calcium ascorbate, ferrous fumarate, choline bitartrate, beta-carotene, biotin, cholecalciferol, chromium picolinate, cupric sulfate, d-alpha tocopheryl succinate, D-calcium pantothenate, folic acid, manganese sulfate, methylcobalamin, niacinamide, phytonadione, potassium iodide, pyridoxine HCl, retinyl acetate, riboflavin, sodium molybdate, sodium selenate, thiamine HCl, zinc citrate, zinc oxide) are not High/Caution inactive flags. d-ALPHA TOCOPHERYL SUCCINATE is the labeled vitamin E SF form — not inactive tocopheryl acetate Caution. Chaste tree (berry) powder extract and pomegranate (fruit) powder extract are named plant-part oral food/botanical extracts = Cleared class (Sept 15). Distinct from Caution “Pomegranate Powder” exact token. Beet (root) powder is the Cleared whole-food beet-root row. Calcium silicate is standalone Caution. Silica is the 0-pt nanoparticle cap. Maltodextrin is Limited. No High. ${LIMITED_STACK} ${SIO2_TAP} ${CA_SILICATE_TAP} ${ZINC_PARKED} Own formulaId — not the HelloPharmacist Women’s Daily BHT/TiO2/dye twin (conflicted; not this carton). No 12-digit UPC on the Sam’s tile this hunt — omitted (do not invent). Adults; one tablet daily with food. Iron overdose carton applies. Draft, not verified.`,
    cleanAlternatives: WOMENS_ALTS,
    sourcesGeneral: [
      `${CITE.mmWomens} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL; no confirmed 12-digit UPC`,
    ],
  }),
  row({
    id: MM_MENS,
    productName: "Member's Mark Advanced Men's Multivitamin Tablets",
    brand: "Member's Mark",
    category: VITAMINS,
    formulaId: MM_MENS,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    retailers: ["Sam's Club"],
    activeIngredients: [
      { name: "Men's multivitamin / multimineral (27 vitamins, minerals, and herbs as labeled)", strength: '1 tablet (label serving)' },
      { name: 'Vitamin C (as calcium ascorbate)', strength: 'label serving' },
      { name: 'Vitamin E (as d-alpha tocopheryl succinate)', strength: 'label serving' },
      { name: 'Turmeric (root) powder extract — labeled joint-support herb', strength: 'label serving' },
      { name: 'Eleuthero (root) extract — labeled energy herb', strength: 'label serving' },
      { name: 'Beet (root) powder — labeled blood-flow herb', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.mmMens, METH.cellulose)),
      flag('Maltodextrin', 'limited', labelCite(CITE.mmMens, METH.maltodextrin)),
      flag('Dicalcium phosphate', 'cleared', labelCite(CITE.mmMens, METH.dical)),
      flag('Calcium silicate', 'cleared', labelCite(CITE.mmMens, METH.calciumSilicate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.mmMens, METH.carnauba)),
      flag('Croscarmellose sodium', 'cleared', labelCite(CITE.mmMens, METH.cellulose)),
      flag('Hydroxypropyl methylcellulose', 'cleared', labelCite(CITE.mmMens, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.mmMens, METH.stearic)),
      flag('Stearic acid', 'cleared', labelCite(CITE.mmMens, METH.stearic)),
      flag('Triacetin', 'cleared', labelCite(CITE.mmMens, METH.triacetin)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Advanced Men’s Multi tablets = Caution (calcium silicate + maltodextrin). Founder Sam’s tile OI exact. Grade only true inactives — SF vitamins/minerals (calcium carbonate, magnesium oxide, potassium chloride, calcium ascorbate, beta-carotene, biotin, cholecalciferol, chromium picolinate, cupric sulfate, d-alpha tocopheryl succinate, D-calcium pantothenate, folic acid, manganese sulfate, methylcobalamin, niacinamide, phytonadione, potassium iodide, pyridoxine HCl, retinyl acetate, riboflavin, sodium molybdate, sodium selenate, thiamine HCl, zinc citrate, zinc oxide) are not High/Caution inactive flags. d-ALPHA TOCOPHERYL SUCCINATE is the labeled vitamin E SF form — not inactive tocopheryl acetate Caution. Beet (root) / eleuthero (root) extract / turmeric (root) powder extract are the labeled featured herbs on the Sam’s marketing copy (blood flow / energy / joints) — SF/formula actives, not inactive grades. Turmeric-as-color and oleoresin turmeric rows are not this string. No silica on this panel. Calcium silicate is standalone Caution. Maltodextrin is Limited. No High. ${LIMITED_STACK} ${CA_SILICATE_TAP} ${ZINC_PARKED} Own formulaId — not DSLD Men 50+ 400-ct BHT/TiO2/dye/talc (wrong SKU). No 12-digit UPC on the Sam’s tile this hunt — omitted. Adults; one tablet daily with food. Draft, not verified.`,
    cleanAlternatives: MENS_ALTS,
    sourcesGeneral: [
      `${CITE.mmMens} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL; no confirmed 12-digit UPC`,
    ],
  }),
  row({
    id: MM_WOMENS_50,
    productName: "Member's Mark Advanced Women's 50+ Multivitamin Tablets",
    brand: "Member's Mark",
    category: VITAMINS,
    formulaId: MM_WOMENS_50,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    retailers: ["Sam's Club"],
    activeIngredients: [
      { name: "Women's 50+ multivitamin / multimineral (as labeled)", strength: '1 tablet (label serving)' },
      { name: 'Vitamin C (as ascorbic acid / sodium ascorbate)', strength: 'label serving' },
      { name: 'Vitamin E (as dl-alpha tocopheryl acetate)', strength: 'label serving' },
      { name: 'Cranberry powder (fruit) — labeled urinary-tract herb', strength: 'label serving' },
      { name: 'Lutein (from marigold flower extract)', strength: 'label serving' },
      { name: 'Boron (as sodium borate)', strength: 'label serving' },
      { name: 'Choline (as choline bitartrate)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.mmWomens50, METH.cellulose)),
      flag('Starch', 'limited', labelCite(CITE.mmWomens50, METH.unspecifiedStarch)),
      flag('Maltodextrin', 'limited', labelCite(CITE.mmWomens50, METH.maltodextrin)),
      flag('Calcium silicate', 'cleared', labelCite(CITE.mmWomens50, METH.calciumSilicate)),
      flag('Croscarmellose sodium', 'cleared', labelCite(CITE.mmWomens50, METH.cellulose)),
      flag('Crospovidone', 'cleared', labelCite(CITE.mmWomens50, METH.povidone)),
      flag('Gelatin', 'cleared', labelCite(CITE.mmWomens50, METH.gelatin)),
      flag('Glucose syrup', 'cleared', labelCite(CITE.mmWomens50, METH.sugar)),
      flag('Gum arabic', 'cleared', labelCite(CITE.mmWomens50, METH.gums)),
      flag('Hydroxypropyl methylcellulose', 'cleared', labelCite(CITE.mmWomens50, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.mmWomens50, METH.stearic)),
      flag(
        'Medium chain triglycerides',
        'limited',
        labelCite(CITE.mmWomens50, METH.unlabeledMct),
      ),
      flag('dl-Alpha tocopherol', 'cleared', labelCite(CITE.mmWomens50, METH.tocopherols)),
      flag('Mixed tocopherols', 'cleared', labelCite(CITE.mmWomens50, METH.tocopherols)),
      flag('Silica', 'cleared', labelCite(CITE.mmWomens50, METH.sio2)),
      flag('Stearic acid', 'cleared', labelCite(CITE.mmWomens50, METH.stearic)),
      flag('Sugar', 'cleared', labelCite(CITE.mmWomens50, METH.sugar)),
      flag('Triacetin', 'cleared', labelCite(CITE.mmWomens50, METH.triacetin)),
      flag('Tricalcium phosphate', 'cleared', labelCite(CITE.mmWomens50, METH.dical)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Advanced Women’s 50+ tablets = Caution (calcium silicate + silica cap + unlabeled MCT + unspecified starch + maltodextrin). Founder Sam’s tile OI exact. Grade only true inactives — SF vitamins/minerals (calcium carbonate, magnesium oxide, ascorbic acid, potassium chloride, dicalcium phosphate as the mineral source, choline bitartrate, beta-carotene, biotin, cholecalciferol, chromium picolinate, cupric sulfate, D-calcium pantothenate, ferrous fumarate, folic acid, manganese sulfate, methylcobalamin, niacinamide, phytonadione, potassium iodide, pyridoxine HCl, riboflavin, sodium ascorbate, sodium molybdate, sodium selenate, thiamine mononitrate, zinc citrate, zinc oxide) are not High/Caution inactive flags. dl-ALPHA TOCOPHERYL ACETATE is the labeled vitamin E SF form — not graded as inactive tocopheryl acetate Caution. Cranberry powder (fruit) is the labeled urinary-tract herb (SF/formula active). Marigold flower extract is the labeled lutein source (SF active). Sodium borate is the labeled boron mineral form on this 50+ formula (Sam’s / club copy: boron + lutein + cranberry) — SF active, not an ungraded inactive and not a new §5 row. Unlabeled Medium Chain Triglycerides (no plant named) is the existing Limited unlabeled-MCT lock — tap vs named-MCT Cleared. Bare STARCH is unspecified starch Limited (not named corn / pregelatinized). Maltodextrin Limited. Calcium silicate standalone Caution. Silica is the 0-pt cap. Glucose syrup / sugar are the Cleared sweetener row. dl-alpha tocopherol + mixed tocopherols as antioxidants are Cleared (≠ tocopheryl acetate). No High. ${LIMITED_STACK} ${SIO2_TAP} ${CA_SILICATE_TAP} ${UNLABELED_MCT_TAP} ${ZINC_PARKED} Own formulaId — not the HelloPharmacist / DSLD 47220 400-ct dyed/BHT Women 50+ (wrong carton; UPC 078742090344 not attached). No 12-digit UPC on the current 275-ct Sam’s tile this hunt — omitted. Adults (50+ labeled); one tablet daily with food. Iron overdose carton applies. Draft, not verified.`,
    cleanAlternatives: WOMENS_50_ALTS,
    sourcesGeneral: [
      `${CITE.mmWomens50} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL; no confirmed 12-digit UPC on the 275-ct Advanced carton`,
    ],
  }),
  row({
    id: UPUP_PM,
    productName: 'up&up Nighttime Relief Lubricant Eye Ointment',
    brand: 'up&up',
    category: ALLERGY,
    formulaId: STORE_PM_LANOLIN,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['Target'],
    activeIngredients: [
      { name: 'Mineral oil', strength: '42.5%' },
      { name: 'White petrolatum', strength: '57.3%' },
    ],
    inactiveIngredients: [
      flag('Lanolin alcohol', 'cleared', dailymed(SET_UPUP_PM, METH.lanolinAlcohol)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: up&up Nighttime Relief lubricant eye ointment = Caution (lanolin alcohol). DailyMed setid e92a258b (NDC 11673-575). Actives are mineral oil 42.5% + white petrolatum 57.3% (lubricant ACTIVES — not oral oil demerits). Only inactive is lanolin alcohol — locked Caution wool-alcohol family (Sept 16). No High. New product id only — reuses `store-pm-ointment-lanolin-alcohol` from batch65 Equate / CVS and batch66 Walgreens PM ointment (same actives + lanolin-alcohol inactive). SPL notes an inactivated NDC code; this is the setid the founder locked for the write, not a new invented Target SKU. No Target UPC harvested — omitted (do not invent). Prefer PF tears over this PM ointment. Draft, not verified.',
    cleanAlternatives: EYE_PF_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_UPUP_PM} (up&up PM lubricant NDC 11673-575; ${UNVERIFIED_NOTE}) — reuse ${STORE_PM_LANOLIN}`,
    ],
  }),
];

export const BATCH68_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'Assured Headache PM (APAP 500 + DPH citrate 38 mg)',
    reason:
      'SKIPPED — already on main (batch29 `assured-headache-pm`). Live DailyMed setid d9d22e45-1a13-4b45-910d-1183a8e6ed7d / NDC 68210-4135 Drug Facts are complete (colloidal silicon dioxide, FD&C Blue #1, FD&C blue #2, hypromellose, magnesium stearate, MCC, PEG, povidone, pregelatinized corn starch, stearic acid, titanium dioxide → TiO2 + dyes = Avoid). Do not clone. Cetirizine stays dead.',
  },
  {
    sku: "Member's Mark kids gummies / Adult Multi gummies / D3 softgels",
    reason:
      'DO NOT WRITE / already in open PR #229 batch67 (D3 safflower + adult gummies). Kids gummies stay unwritten. Do not reopen batch67 files.',
  },
  {
    sku: 'Kirkland enteric fish oil',
    reason:
      'DO NOT WRITE. Do not alias Wild Alaskan 096619653539 to the enteric FO SKU or to `kirkland-fish-oil-softgels-clear`.',
  },
  {
    sku: "TopCare Century Women's 50+ / Member's Mark Max Sleep / Nice! / Walgreens adult vitamins / Kirkland guaifenesin-only",
    reason: 'DO NOT WRITE this pass. Dead / skip pile stays closed.',
  },
];

const _ROWS = BATCH68_KYR6_FOUNDER_PANELS;
if (_ROWS.length !== 5) throw new Error('batch68 tally drift: expected 5 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 1) {
  throw new Error('batch68 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 4) {
  throw new Error('batch68 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch68 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch68 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch68 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch68 duplicate ids');

const FORBIDDEN_IDS = [
  'kirkland-fish-oil-softgels-clear',
  'nature-made-fish-oil-1200-clear',
  'nature-made-fish-oil-1200-burpless',
  'members-mark-d3-50mcg-softgels',
  'members-mark-d3-125mcg-softgels',
  'members-mark-adult-multi-gummies',
  'assured-headache-pm',
  'equate-nighttime-lubricant-ointment',
  'cvs-health-nighttime-dry-eye',
  'walgreens-pm-lubricant-ointment',
  'members-mark-cetirizine-tablets',
  'equate-es-pain-reliever',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch68 must not clone closed product ids');
}

const wild = _ROWS.find((r) => r.id === KIRK_WILD_FO);
if (wild?.verdict !== 'clean' || wild.formulaId !== KIRK_WILD_FO) {
  throw new Error('Kirkland Wild Alaskan FO must be Clean on its own formulaId');
}
if (!wild.inactiveIngredients.some((i) => /bovine/i.test(i.name) && i.riskLevel === 'cleared')) {
  throw new Error('Wild Alaskan FO must list Gelatin (bovine) as Cleared gelatin');
}
if (wild.barcode !== '096619653539') {
  throw new Error('Wild Alaskan FO must use UPC 096619653539');
}
if (wild.inactiveIngredients.some((i) => /methacrylic|enteric|polysorbate|titanium/i.test(i.name))) {
  throw new Error('Wild Alaskan FO must not pick up enteric / TiO2 inactives');
}

const womens = _ROWS.find((r) => r.id === MM_WOMENS);
if (womens?.verdict !== 'caution' || womens.formulaId !== MM_WOMENS) {
  throw new Error("MM Women's Multi must be Caution on its own formulaId");
}
if (!womens.inactiveIngredients.some((i) => /calcium silicate/i.test(i.name))) {
  throw new Error("MM Women's Multi must list calcium silicate");
}
if (!womens.inactiveIngredients.some((i) => /^silica$/i.test(i.name))) {
  throw new Error("MM Women's Multi must list silica as the SiO2 cap");
}
if (!womens.inactiveIngredients.some((i) => /maltodextrin/i.test(i.name) && i.riskLevel === 'limited')) {
  throw new Error("MM Women's Multi maltodextrin is Limited");
}
if (
  womens.inactiveIngredients.some((i) =>
    /tocopheryl succinate|tocopheryl acetate|ferrous|folic|methylcobalamin|cholecalciferol/i.test(
      i.name,
    ),
  )
) {
  throw new Error("MM Women's Multi must not flag SF vitamin/mineral actives as inactives");
}
if (womens.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
  throw new Error("MM Women's Multi must not invent a High on this no-dye panel");
}
if (womens.barcode) {
  throw new Error("MM Women's Multi has no confirmed 12-digit UPC — omit barcode");
}

const mens = _ROWS.find((r) => r.id === MM_MENS);
if (mens?.verdict !== 'caution' || mens.formulaId !== MM_MENS) {
  throw new Error("MM Men's Multi must be Caution on its own formulaId");
}
if (mens.inactiveIngredients.some((i) => /^(silica|silicon dioxide|colloidal silicon dioxide)$/i.test(i.name))) {
  throw new Error("MM Men's Multi panel does not print silica — do not invent it");
}
if (!mens.inactiveIngredients.some((i) => /calcium silicate/i.test(i.name))) {
  throw new Error("MM Men's Multi must list calcium silicate");
}
if (
  mens.inactiveIngredients.some((i) => /eleuthero|turmeric|tocopheryl succinate/i.test(i.name))
) {
  throw new Error("MM Men's Multi must not grade featured herb / vitamin E SF forms as inactives");
}
if (mens.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
  throw new Error("MM Men's Multi must not invent a High on this no-dye panel");
}
if (mens.barcode) {
  throw new Error("MM Men's Multi has no confirmed 12-digit UPC — omit barcode");
}

const w50 = _ROWS.find((r) => r.id === MM_WOMENS_50);
if (w50?.verdict !== 'caution' || w50.formulaId !== MM_WOMENS_50) {
  throw new Error("MM Women's 50+ must be Caution on its own formulaId");
}
if (!w50.inactiveIngredients.some((i) => /medium chain triglyceride/i.test(i.name) && i.riskLevel === 'limited')) {
  throw new Error("MM Women's 50+ unlabeled MCT must be Limited");
}
if (!w50.inactiveIngredients.some((i) => /^starch$/i.test(i.name) && i.riskLevel === 'limited')) {
  throw new Error("MM Women's 50+ bare starch is unspecified starch Limited");
}
if (w50.inactiveIngredients.some((i) => /tocopheryl acetate|sodium borate|cranberry|marigold/i.test(i.name))) {
  throw new Error("MM Women's 50+ must not flag vitamin E / boron / cranberry / lutein actives as inactives");
}
if (w50.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
  throw new Error("MM Women's 50+ must not invent a High on this no-dye panel");
}
if (w50.barcode) {
  throw new Error("MM Women's 50+ has no confirmed 12-digit UPC on the 275-ct Advanced carton — omit barcode");
}
if (!w50.activeIngredients.some((i) => /sodium borate/i.test(i.name))) {
  throw new Error("MM Women's 50+ must list boron as sodium borate in actives (not an ungraded inactive)");
}

const upup = _ROWS.find((r) => r.id === UPUP_PM);
if (upup?.verdict !== 'caution' || upup.formulaId !== STORE_PM_LANOLIN) {
  throw new Error('up&up PM ointment must reuse store-pm-ointment-lanolin-alcohol');
}
if (upup.barcode) {
  throw new Error('up&up PM ointment has no confirmed Target UPC — omit barcode');
}

const REUSE_FORMULA_COUNT = _ROWS.filter((r) => r.formulaId === STORE_PM_LANOLIN).length;
if (REUSE_FORMULA_COUNT !== 1) {
  throw new Error('batch68 expected 1 formulaId reuse (store PM lanolin alcohol)');
}

if (BATCH68_SKIPPED.length !== 4) {
  throw new Error('batch68 skipped-list drift');
}

for (const record of BATCH68_KYR6_FOUNDER_PANELS) {
  const expected = BATCH68_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 68 catch-up UPC drift on ${record.id}`);
  }
  if (!expected && record.barcode) {
    throw new Error(`batch 68 invented UPC on ${record.id}`);
  }
}
