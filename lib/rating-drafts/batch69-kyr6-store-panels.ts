// DRAFT / not verified / batch 69 KYR6 store-panel WRITE /
// methodology v1.6 + current main §5 exact. Additive / “also
// appears as” / locked exact-INCI rows only. No invented grades.
// No cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. US in-scope store SKUs from the batch69 list.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. UPC attached only when founder gave
// one or a real 12-digit is found. NDC ≠ UPC. Missing code ≠
// no row (omit barcode). Pack sizes of the same name+form+
// inactives share formulaId. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Search wiring
// only. Not wired into Clean Picks UI. No photos. Letter
// tiles only on new ids. No fake Clean alts. No methodology
// wipe. No new §5 stamps. PROJECT_NOTES tally-only (do not
// wipe LIVE NOW).
//
// Next free batch after 68 = 69. Do NOT edit batch67 /
// PR #229. Do NOT reopen 65 / 66 / 68 or PR #230.
//
// REUSE first — match brand+name+form+strength for product
// ids; same inactives share formulaId across store siblings.
// MM D3 50 mcg is already on open PR #229 with formulaId
// `members-mark-d3-softgels-safflower`. New row here shares
// that formulaId / attaches 50 mcg potency. Do not duplicate
// the HelloPharmacist / DSLD soybean+corn panel. Do not
// edit the batch67 file.
//
// DO NOT REOPEN / DO NOT CLONE:
// batch65 20 new / 10 reuse · batch66 6 held · batch67
// members-mark-d3-125mcg-softgels /
// members-mark-adult-multi-gummies · batch68 MM Advanced
// tablet multis / kirkland-wild-alaskan-fish-oil /
// upup-pm-lubricant-ointment · equate-complete-multi
// (already on main) · kirkland-d3-softgels-clear ·
// kirkland-fish-oil-softgels-clear (porcine / tocopherols;
// NOT UPC 096619653539 Wild Alaskan; NOT enteric) ·
// kirkland-mucus-dm-max-er · Kirkland enteric FO · Nice!
// adult multi · Assured · Kirkland guaifenesin-only.
//
// LOCKS used (exact §5): safflower oil as softgel fill =
// Cleared (NOT gummy High; tap both sides; Sept 16).
// PEG = Moderate. Silica / SiO2 = 0-pt nanoparticle Caution
// cap. Synthetic dyes / TiO2 / talc / BHT = High → Avoid.
// Unlabeled MCT = Limited (not the Cleared named-MCT row).
// Unspecified starch = Limited. Maltodextrin / polydextrose
// = Limited. PVA oral coating = Cleared. Limited-only never
// Avoid. Avoid needs High. Softgel / tablet oil fill ≠
// gummy seed-oil High. Do not alias gummy Palm Oil to
// Organic Palm Oil coating. Display keys stay clean /
// caution / avoid. Grade only true inactives — SF vitamins /
// minerals / featured actives are not High/Caution inactive
// flags.
//
// TALLY (unverified drafts in THIS file): 5 rows — Clean 1 /
// Caution 2 / Avoid 2. NEW 5 / REUSE-formula 1 / SKIPPED +
// REFUSED listed at the bottom (Ethyl Vanillin / Spirulina /
// Hibiscus Concentrate are the refused §5 strings).
// TopCare Vitamin C uses the founder fruit-juice / paprika
// panel (no palm). up&up ES APAP PM uses the founder PVA +
// talc + SiO2 stack — own formulaId, do not reuse
// dg-health-pain-relief-pm.
//
// Independently Clean analogs already on main (not cloned):
// nature-made-d3-softgels-clear ·
// kirkland-d3-softgels-clear ·
// amazon-elements-vitamin-d3-5000-softgels ·
// pure-encapsulations-melatonin-sr-3mg ·
// hylands-calms-forte · equate-es-pain-reliever ·
// thorne-womens-multi-50-plus ·
// we-heart-wholesome-womens-multi ·
// gol-vitamin-code-womens ·
// pure-encapsulations-one-multivitamin.
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
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const SLEEP = 'Sleep';

const D3_FORMULA = 'members-mark-d3-softgels-safflower';
const MM_D3_50 = 'members-mark-d3-50mcg-softgels';
const MM_MELATONIN = 'members-mark-melatonin-10mg-tr';
const TC_VIT_C = 'topcare-hp-vitamin-c-gummies';
const WG_MULTI = 'walgreens-adults-multi-tablets';
const UPUP_APAP_PM = 'upup-es-acetaminophen-pm-100';
const UPUP_APAP_PM_FORMULA = 'upup-es-acetaminophen-pm';

const DG_APAP_PM = 'dg-health-pain-relief-pm';
const NM_D3 = 'nature-made-d3-softgels-clear';
const KIRK_D3 = 'kirkland-d3-softgels-clear';
const PE_MELATONIN = 'pure-encapsulations-melatonin-sr-3mg';
const CALMS_FORTE = 'hylands-calms-forte';
const EQUATE_ES = 'equate-es-pain-reliever';
const THORNE_WOMENS = 'thorne-womens-multi-50-plus';
const WH_WOMENS = 'we-heart-wholesome-womens-multi';
const GOL_WOMENS = 'gol-vitamin-code-womens';
const PE_ONE_MULTI = 'pure-encapsulations-one-multivitamin';
const GOL_RAW_C = 'gol-vitamin-code-raw-c';
const PE_ASCORBIC = 'pure-encapsulations-ascorbic-acid-1000';
const THRIVE_C = 'thrive-wellmade-real-food-vitamin-c';

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. Safflower / sunflower / palm / vegetable oil / canola used as a gummy coating or fill is that High rule. In this softgel fill they are not.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const ZINC_PARKED =
  'Zinc (oxide / citrate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const SEDATING =
  'Diphenhydramine is sedating. Ages 12+. Do not use with other diphenhydramine products.';

const CITE = {
  mmD3:
    'Founder-logged Member’s Mark Vitamin D3 softgel Other Ingredients (Sam’s / PROJECT_NOTES ready-to-write; VitaCart 50 mcg carton matches the safflower panel already locked on PR #229): Safflower Oil, Gelatin, Glycerin, Purified Water USP. Contains 2% or less of Cholecalciferol. Distinct from HelloPharmacist / NIH DSLD 272823 soybean oil + gelatin + glycerin + corn oil (UPC 193968030216) — that is a different formula and is not this row. No 12-digit safflower-panel UPC harvested — do not attach the soybean+corn barcode.',
  mmMelatonin:
    "Member's Mark Timed-Release Melatonin 10 mg tablets — live samsclub.com 300-ct (item 7874209463) + Maxima Mart ingredients tile + HelloPharmacist / DSLD 46282 other-ingredients: Dicalcium Phosphate, Microcrystalline Cellulose, Hydroxypropyl Methylcellulose, Croscarmellose Sodium, Stearic Acid, Silicon Dioxide / Silica, Magnesium Stearate, Polyethylene Glycol, Carnauba Wax. Pyridoxine Hydrochloride and Melatonin are the labeled actives. UPC-A 078742094632 (12-digit of the Sam’s / 250-ct DSLD barcode; 300-ct shares the same formula).",
  wgMulti:
    'Walgreens Adults Multivitamin Tablets founder UPC 311917199139 (Open Food Facts 0311917199139 / HelloPharmacist DSLD 274220 200-ct Adults). Other Ingredients (true inactives graded): Microcrystalline Cellulose, Maltodextrin, Carboxymethylcellulose Sodium, DL-Tartaric Acid, FD&C Blue No. 2 Lake, FD&C Red No. 40 Lake, FD&C Yellow No. 6 Lake, Hydroxypropyl Methylcellulose, Magnesium Stearate, Polydextrose, Polyethylene Glycol, Polyvinyl Alcohol, Silica, Starch, Talc, Titanium Dioxide color. SF vitamins/minerals on the mixed Ingredients line (calcium carbonate, potassium chloride, dicalcium phosphate, magnesium oxide, ascorbic acid, ferrous fumarate, beta-carotene, biotin, cholecalciferol, chromium picolinate, cupric sulfate, cyanocobalamin, D-calcium pantothenate, DL-alpha tocopheryl acetate, manganese sulfate, nicotinamide, phytonadione, potassium iodide, pyridoxine HCl, retinyl acetate, sodium metavanadate, sodium molybdate, sodium selenite, stannous chloride, thiamine mononitrate, tricalcium phosphate, zinc oxide) are not inactive flags. OFF OCR on this UPC is noisy and also reads BHT / MCT — not scored as a second conflicting panel; Avoid already stands on dyes + TiO2 + talc.',
  tcC:
    'Founder-logged TopCare high potency Vitamin C gummies Other Ingredients (PROJECT_NOTES exact print): Glucose Syrup, Sugar, Water, Gelatin, 5% Fruit Juice From Concentrate (Apple, Pear, Pineapple, Peach, Orange, Lemon, Raspberry, Blackcurrant, Strawberry, Blackberry, Blueberry, Cherry), Less Than 2% of: Citric Acid, Lactic Acid, Natural Flavors, Color (Paprika Extract). Distinct from Instacart / topcarebrand 240 mg orange UPC 036800464049 (palm oil + carnauba, no fruit-juice line) and from Fig / Instacart 750 mg assorted (sucralose + radish / turmeric ± palm). Do not attach those barcodes. Palm is not on this founder panel — do not invent it and do not alias gummy Palm Oil to Organic Palm Oil coating.',
  upupPm:
    'Founder-logged up&up Extra Strength Acetaminophen PM caplets 100-ct UPC 359726863117 inactive list (PROJECT_NOTES; Target A-11004792): croscarmellose sodium, FD&C blue #1 aluminum lake, FD&C blue #2 aluminum lake, hypromelloses, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, povidone k30, pregelatinized starch, purified water, silicon dioxide, sodium starch glycolate, talc, titanium dioxide. Not the batch68 eye ointment. DailyMed setid f1a10eba-0baa-4e34-bfbe-69faed6b51f1 is a different stack (carnauba / crospovidone / PS80 / stearic, no PVA / talc / SiO2) — do not reuse `dg-health-pain-relief-pm`.',
} as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  polydextrose: 'Methodology §5 Limited-risk (polydextrose — maltodextrin-like)',
  unspecifiedStarch:
    'Methodology §5 Limited-risk (unspecified starch — same Limited unspecified/modified-starch row; distinct from Cleared named corn starch / potato starch / pregelatinized starch)',
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica / Silica (oral) — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  safflowerFill: `Methodology §5 Cleared (safflower oil as softgel fill — NOT gummy High; locked Sept 16, 2026). ${OIL_FILL_TAP}`,
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / purified water USP)',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum / carboxymethylcellulose sodium)',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose / HPC)',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate / vegetable stearate)',
  carnauba: 'Methodology §5 Cleared (carnauba wax — wax family)',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate / dibasic calcium phosphate — mineral fillers / buffers)',
  tartaric: 'Methodology §5 Cleared (tartaric acid / DL-tartaric acid — organic acid with citric)',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol as oral coating — locked Sept 15, 2026)',
  povidone: 'Methodology §5 Cleared (povidone / copovidone / crospovidone — locked housekeeping)',
  starchNamed:
    'Methodology §5 Cleared (pregelatinized starch / corn starch / potato starch)',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate)',
  flavors:
    'Methodology §5 Limited-risk (natural flavors — undisclosed mixtures; opacity, not a known hazard)',
  fruitJuiceBase:
    'Methodology §5 Limited-risk (fruit puree / juice concentrate as gummy base — not the Cleared named juice-as-color row; locked Sept 15, 2026)',
  paprika:
    'Methodology §5 Cleared (paprika extract / capsanthin as color — named spice color; locked Sept 14, 2026)',
  sugar: 'Methodology §5 Cleared (cane sugar / glucose syrup / tapioca syrup)',
  citric:
    'Methodology §5 Cleared (citric acid / ascorbic acid / citrate salts as fillers/buffers)',
  lactic: 'Methodology §5 Cleared (lactic acid / malic acid — organic acids with citric)',
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

const MELATONIN_ALTS: CleanAlternative[] = [
  alt(
    PE_MELATONIN,
    'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already on main (HPMC capsule; no SiO2 / no PEG). Form: capsule vs this tablet — labeled, not a hard filter (§6). Same adult Sleep shelf.',
  ),
];

const VIT_C_ALTS: CleanAlternative[] = [
  alt(
    GOL_RAW_C,
    'Independently Clean Garden of Life Vitamin Code Raw Vitamin C already on main (vegetable cellulose + organic rice hull). Form: capsule vs this gummy — labeled, not a hard filter (§6).',
  ),
  alt(
    PE_ASCORBIC,
    'Independently Clean Pure Encapsulations ascorbic acid 1000 already on main. Form: capsule vs this gummy — labeled, not a hard filter (§6).',
  ),
  alt(
    THRIVE_C,
    'Independently Clean Thrive Wellmade Real Food Vitamin C already on main (named HPMC capsule + rice hull). Form: capsule vs this gummy — labeled, not a hard filter (§6).',
  ),
];

const MULTI_ALTS: CleanAlternative[] = [
  alt(
    PE_ONE_MULTI,
    'Independently Clean Pure Encapsulations ONE Multi already on main. Form: capsule vs this tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    THORNE_WOMENS,
    'Independently Clean Thorne Women’s Multi 50+ already on main (HPMC capsule only). Form: capsule vs this tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    WH_WOMENS,
    'Independently Clean We Heart Wholesome Women’s Multi already on main. Form: capsule vs this tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    GOL_WOMENS,
    'Independently Clean Garden of Life Vitamin Code Women’s already on main. Form labeled, not a hard filter (§6).',
  ),
];

const APAP_PM_ALTS: CleanAlternative[] = [
  alt(
    CALMS_FORTE,
    "Independently Clean Hyland's Calms Forte already on main. Form: homeopathic tablet vs this APAP+DPH caplet — labeled, not a hard filter (§6). No independently Clean acetaminophen+diphenhydramine PM exists on main — do not invent one.",
  ),
  alt(
    EQUATE_ES,
    'Independently Clean Equate Extra Strength Pain Reliever (L484 white 100-ct) already on main. Form: APAP-only caplet vs this PM combo — labeled, not a hard filter (§6). Same-active pain analog; not a nighttime PM swap.',
  ),
];

export const BATCH69_CATCHUP_BARCODES: Record<string, string> = {
  [MM_MELATONIN]: '078742094632',
  [WG_MULTI]: '311917199139',
  [UPUP_APAP_PM]: '359726863117',
};

export const BATCH69_KYR6_STORE_PANELS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: MM_D3_50,
    productName: "Member's Mark Vitamin D3 Softgels, 50 mcg (2000 IU)",
    brand: "Member's Mark",
    category: VITAMINS,
    formulaId: D3_FORMULA,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    retailers: ["Sam's Club"],
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '50mcg (2000 IU)' },
    ],
    inactiveIngredients: [
      flag('Safflower Oil', 'cleared', labelCite(CITE.mmD3, METH.safflowerFill)),
      flag('Gelatin', 'cleared', labelCite(CITE.mmD3, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.mmD3, METH.glycerin)),
      flag('Purified Water USP', 'cleared', labelCite(CITE.mmD3, METH.water)),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Vitamin D3 50 mcg (2000 IU) softgels = Clean. Founder-logged Other Ingredients: Safflower Oil, Gelatin, Glycerin, Purified Water USP. Contains 2% or less of Cholecalciferol (the labeled active — not a second inactive grade). Safflower as softgel fill is Cleared (NOT gummy High; Sept 16 lock). ${OIL_FILL_TAP} New row on main shares formulaId \`${D3_FORMULA}\` already used on open PR #229 batch67 — attach 50 mcg potency here; do not edit batch67 files; do not write a conflicting soybean+corn / BHT panel. Do not reuse \`${KIRK_D3}\` / \`${NM_D3}\` (soybean fill). Do not attach DSLD 272823 UPC 193968030216. No 12-digit safflower-panel UPC harvested — omitted. Confirm carton. No DailyMed drug SPL (dietary supplement). Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.mmD3} — ${UNVERIFIED_NOTE}`],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: MM_MELATONIN,
    productName: "Member's Mark Timed-Release Melatonin Tablets, 10 mg",
    brand: "Member's Mark",
    category: SLEEP,
    barcode: BATCH69_CATCHUP_BARCODES[MM_MELATONIN],
    formulaId: MM_MELATONIN,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    retailers: ["Sam's Club"],
    activeIngredients: [
      { name: 'Melatonin', strength: '10mg' },
      { name: 'Vitamin B6 (pyridoxine hydrochloride)', strength: '10mg' },
    ],
    inactiveIngredients: [
      flag('Dicalcium phosphate', 'cleared', labelCite(CITE.mmMelatonin, METH.dical)),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(CITE.mmMelatonin, METH.cellulose),
      ),
      flag(
        'Hydroxypropyl methylcellulose',
        'cleared',
        labelCite(CITE.mmMelatonin, METH.hpmc),
      ),
      flag(
        'Croscarmellose sodium',
        'cleared',
        labelCite(CITE.mmMelatonin, METH.cellulose),
      ),
      flag('Stearic acid', 'cleared', labelCite(CITE.mmMelatonin, METH.stearic)),
      flag('Silicon dioxide / silica', 'cleared', labelCite(CITE.mmMelatonin, METH.sio2)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.mmMelatonin, METH.stearic)),
      flag('Polyethylene glycol', 'moderate', labelCite(CITE.mmMelatonin, METH.peg)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.mmMelatonin, METH.carnauba)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Timed-Release Melatonin 10 mg tablets = Caution (PEG + silica cap). Live Sam’s 300-ct + HelloPharmacist / DSLD 46282 OI. Grade only true inactives — melatonin and pyridoxine HCl are the labeled actives (B6 as inactive is a different Cleared token and is not this SF vitamin). PEG is Moderate. Silica / silicon dioxide is the 0-pt nanoparticle Caution cap. Dicalcium phosphate / MCC / HPMC / croscarmellose / stearic / magnesium stearate / carnauba are Cleared. No High. ${LIMITED_STACK} ${SIO2_TAP} Own formulaId — not Member’s Mark Max Sleep (DPH; stay skipped). UPC 078742094632 attached (12-digit of the Sam’s / DSLD barcode; 250-ct and 300-ct share this formula when the other-ingredients list holds). No DailyMed drug SPL. Adults; one tablet at bedtime. Draft, not verified.`,
    cleanAlternatives: MELATONIN_ALTS,
    sourcesGeneral: [`${CITE.mmMelatonin} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: TC_VIT_C,
    productName: 'TopCare High Potency Vitamin C Gummies',
    brand: 'TopCare',
    category: VITAMINS,
    formulaId: TC_VIT_C,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    retailers: ['TopCare', 'Grocery'],
    activeIngredients: [
      { name: 'Vitamin C', strength: 'label serving (high potency)' },
    ],
    inactiveIngredients: [
      flag('Glucose syrup', 'cleared', labelCite(CITE.tcC, METH.sugar)),
      flag('Sugar', 'cleared', labelCite(CITE.tcC, METH.sugar)),
      flag('Water', 'cleared', labelCite(CITE.tcC, METH.water)),
      flag('Gelatin', 'cleared', labelCite(CITE.tcC, METH.gelatin)),
      flag(
        'Fruit juice from concentrate (apple, pear, pineapple, peach, orange, lemon, raspberry, blackcurrant, strawberry, blackberry, blueberry, cherry)',
        'limited',
        labelCite(CITE.tcC, METH.fruitJuiceBase),
      ),
      flag('Citric acid', 'cleared', labelCite(CITE.tcC, METH.citric)),
      flag('Lactic acid', 'cleared', labelCite(CITE.tcC, METH.lactic)),
      flag('Natural flavors', 'limited', labelCite(CITE.tcC, METH.flavors)),
      flag('Color (paprika extract)', 'cleared', labelCite(CITE.tcC, METH.paprika)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: TopCare high potency Vitamin C gummies = Caution (Limited fruit-juice concentrate as gummy base + Limited natural flavors). Founder-logged OI has no palm. ${LIMITED_STACK} Named paprika extract as color is Cleared (not unspecified Natural Colors). Glucose syrup / sugar / water / gelatin / citric / lactic are Cleared. Distinct from Instacart / topcarebrand 240 mg orange UPC 036800464049 (palm oil + carnauba) and from Fig / Instacart 750 mg assorted (sucralose + radish / turmeric ± palm) — do not attach those barcodes and do not invent palm on this panel. Do not alias gummy Palm Oil to Organic Palm Oil coating. Own formulaId. No 12-digit matching this fruit-juice panel — omitted. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: VIT_C_ALTS,
    sourcesGeneral: [`${CITE.tcC} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: WG_MULTI,
    productName: 'Walgreens Adults Multivitamin Tablets',
    brand: 'Walgreens',
    category: VITAMINS,
    barcode: BATCH69_CATCHUP_BARCODES[WG_MULTI],
    formulaId: WG_MULTI,
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    productType: VITAMIN,
    retailers: ['Walgreens'],
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron (as ferrous fumarate)', strength: '18mg' },
      { name: 'Zinc (as zinc oxide)', strength: '11mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Blue No. 2 Lake', 'high', labelCite(CITE.wgMulti, METH.dyes)),
      flag('FD&C Red No. 40 Lake', 'high', labelCite(CITE.wgMulti, METH.dyes)),
      flag('FD&C Yellow No. 6 Lake', 'high', labelCite(CITE.wgMulti, METH.dyes)),
      flag('Titanium dioxide (color)', 'high', labelCite(CITE.wgMulti, METH.tio2)),
      flag('Talc', 'high', labelCite(CITE.wgMulti, METH.talc)),
      flag('Polyethylene glycol', 'moderate', labelCite(CITE.wgMulti, METH.peg)),
      flag('Maltodextrin', 'limited', labelCite(CITE.wgMulti, METH.maltodextrin)),
      flag('Polydextrose', 'limited', labelCite(CITE.wgMulti, METH.polydextrose)),
      flag('Starch', 'limited', labelCite(CITE.wgMulti, METH.unspecifiedStarch)),
      flag('Silica', 'cleared', labelCite(CITE.wgMulti, METH.sio2)),
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.wgMulti, METH.cellulose)),
      flag(
        'Carboxymethylcellulose sodium',
        'cleared',
        labelCite(CITE.wgMulti, METH.cellulose),
      ),
      flag('DL-Tartaric acid', 'cleared', labelCite(CITE.wgMulti, METH.tartaric)),
      flag(
        'Hydroxypropyl methylcellulose',
        'cleared',
        labelCite(CITE.wgMulti, METH.hpmc),
      ),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.wgMulti, METH.stearic)),
      flag('Polyvinyl alcohol', 'cleared', labelCite(CITE.wgMulti, METH.pva)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Walgreens Adults Multivitamin tablets UPC 311917199139 = Avoid (Blue #2 / Red #40 / Yellow #6 lakes + TiO2 + talc). HelloPharmacist DSLD 274220 + founder UPC / OFF 0311917199139. Grade only true inactives — SF vitamins/minerals (including sodium metavanadate / stannous chloride as the labeled vanadium / tin mineral forms) are not High/Caution inactive flags. DL-alpha tocopheryl acetate is the labeled vitamin E SF form — not inactive tocopheryl acetate Caution. PEG is Moderate (not needed to reach Avoid). Maltodextrin / polydextrose / unspecified starch are Limited. Silica is the 0-pt cap. PVA oral coating is Cleared. ${LIMITED_STACK} ${SIO2_TAP} ${ZINC_PARKED} OFF OCR on this UPC is noisy and also reads BHT / unlabeled MCT — not written as a second conflicting panel and not required to reach Avoid. Own formulaId — not the 50+ Walgreens carton (UPC 31191719912 family) and not Nice! / Assured. No DailyMed drug SPL. Adults; iron overdose carton applies. Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [
      `${CITE.wgMulti} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`,
    ],
  }),
  row({
    id: UPUP_APAP_PM,
    productName: 'up&up Extra Strength Acetaminophen PM Caplets, 100 ct',
    brand: 'up&up',
    category: SLEEP,
    barcode: BATCH69_CATCHUP_BARCODES[UPUP_APAP_PM],
    formulaId: UPUP_APAP_PM_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    retailers: ['Target'],
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Blue No. 1 aluminum lake', 'high', labelCite(CITE.upupPm, METH.dyes)),
      flag('FD&C Blue No. 2 aluminum lake', 'high', labelCite(CITE.upupPm, METH.dyes)),
      flag('Titanium dioxide', 'high', labelCite(CITE.upupPm, METH.tio2)),
      flag('Talc', 'high', labelCite(CITE.upupPm, METH.talc)),
      flag('Polyethylene glycol', 'moderate', labelCite(CITE.upupPm, METH.peg)),
      flag('Silicon dioxide', 'cleared', labelCite(CITE.upupPm, METH.sio2)),
      flag('Croscarmellose sodium', 'cleared', labelCite(CITE.upupPm, METH.cellulose)),
      flag('Hypromelloses', 'cleared', labelCite(CITE.upupPm, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.upupPm, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.upupPm, METH.cellulose)),
      flag('Polyvinyl alcohol', 'cleared', labelCite(CITE.upupPm, METH.pva)),
      flag('Povidone K30', 'cleared', labelCite(CITE.upupPm, METH.povidone)),
      flag('Pregelatinized starch', 'cleared', labelCite(CITE.upupPm, METH.starchNamed)),
      flag('Purified water', 'cleared', labelCite(CITE.upupPm, METH.water)),
      flag('Sodium starch glycolate', 'cleared', labelCite(CITE.upupPm, METH.ssg)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: up&up Extra Strength Acetaminophen PM 100-ct caplets = Avoid (Blue #1 / Blue #2 lakes + TiO2 + talc). Founder UPC 359726863117. Founder-logged inactives (PROJECT_NOTES) include PVA + SiO2 + talc — own formulaId \`${UPUP_APAP_PM_FORMULA}\`. Do not reuse \`${DG_APAP_PM}\` (DailyMed setid f1a10eba is a different stack: carnauba / crospovidone / PS80 / stearic, no PVA / talc / SiO2). Do not reuse \`tylenol-pm-es\` and do not reopen batch68 \`upup-pm-lubricant-ointment\` (eye ointment, not this swallow PM). PEG is Moderate (not needed to reach Avoid). ${SIO2_TAP} Stay under 4 g/day acetaminophen. ${SEDATING} Draft, not verified.`,
    cleanAlternatives: APAP_PM_ALTS,
    sourcesGeneral: [`${CITE.upupPm} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH69_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'Equate Complete Multivitamin Adults',
    reason:
      'SKIPPED — already on main (batch14 `equate-complete-multi`, UPC 681131119771). Current Fig / HelloPharmacist panel still Avoid (TiO2 + lake dyes + talc + BHT). Do not clone. Do not rewrite the live row with extra ungraded strings (sodium aluminum silicate / tocopherol concentrate).',
  },
  {
    sku: 'Equate Vitamin D3 50 mcg softgels',
    reason:
      'SKIPPED no_OI after hunt — walmart.com / Amazon / Google / DSLD did not yield a live Equate-brand 50 mcg softgel Other Ingredients panel this pass. PROJECT_NOTES still lists Equate D3 softgels as dead this hunt. Do not invent from Nature Made / Walgreens / Spring Valley twins.',
  },
  {
    sku: 'Kirkland Signature Vitamin D3 softgels',
    reason:
      'SKIPPED — already on main (batch18 `kirkland-d3-softgels-clear`, UPC 096619393916). Soybean oil + gelatin (porcine) + glycerin + water = Clean. Do not clone.',
  },
  {
    sku: 'Kirkland Signature second FO softgel (porcine / tocopherols)',
    reason:
      'SKIPPED — already on main (batch18 `kirkland-fish-oil-softgels-clear`, UPC 096619926626). Porcine gelatin + glycerin + water + tocopherols. NOT UPC 096619653539 Wild Alaskan (batch68). NOT enteric. Do not clone.',
  },
  {
    sku: 'Kirkland Signature Krill Oil (Ethyl Vanillin)',
    reason:
      'REFUSED §5 — Costco Business / OFF print Ethyl Vanillin (with Gelatin (Bovine), Water, Glycerin on the current 500 mg 180-ct; some OFF twins also print Sorbitol-Sorbitan Solution + Gelatin (Porcine)). Ethyl Vanillin is not an exact §5 token. Do not invent a grade. Do not alias to vanillin / natural flavors / artificial flavors.',
  },
  {
    sku: 'Kirkland Signature Mucus DM tablets (combo)',
    reason:
      'SKIPPED — already on main (batch20 `kirkland-mucus-dm-max-er`, DailyMed setid d2151492, guaifenesin 1200 / DXM 60 ER). The live Costco combo is that Max ER tablet. Kirkland guaifenesin-only stays skipped. Do not clone.',
  },
  {
    sku: 'TopCare adult multi gummies (Orange / Cherry / Berry)',
    reason:
      'REFUSED §5 — official SmartLabel 0814c71c + Fig print Colors including Spirulina (with Palm Oil and Carnauba Wax). Palm Oil in a gummy would be High, but Spirulina is not an exact §5 token. Do not invent a grade. Do not alias Spirulina to chlorophyll / named vegetable-juice-as-color. Do not alias gummy Palm Oil to Organic Palm Oil coating.',
  },
  {
    sku: "TopCare Men's multi gummies (Mixed Berry)",
    reason:
      'REFUSED §5 — Instacart / retailer PDP prints Colors (Radish Concentrate, Carrot and Hibiscus Concentrate). Hibiscus Concentrate is not an exact §5 token. Do not invent a grade. Do not alias to named vegetable-juice-as-color / Red Radish (For Color). No official SmartLabel this hunt; palm oil was not on that Instacart list (do not invent it).',
  },
  {
    sku: "TopCare Women's multi gummies (Mixed Berry)",
    reason:
      'REFUSED §5 — Instacart / Acme PDP prints Palm Oil and Carnauba Wax plus Colors (… Spirulina and Pumpkin Concentrate, Lycopene). Spirulina is not an exact §5 token. Do not invent a grade. Do not alias gummy Palm Oil to Organic Palm Oil coating. UPC 036800488212 seen at Acme — not attached (row refused).',
  },
  {
    sku: 'Kirkland enteric FO / Nice! adult multi / Assured / Kirkland guaifenesin-only / MM Advanced multis / Kirkland Wild Alaskan 1400 / up&up PM ointment',
    reason:
      'DO NOT WRITE this pass (user skip pile). Already on 68 or previously skipped. Do not reopen 65 / 66 / 68 or PR #230.',
  },
];

const _ROWS = BATCH69_KYR6_STORE_PANELS;
if (_ROWS.length !== 5) throw new Error('batch69 tally drift: expected 5 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 1) {
  throw new Error('batch69 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 2) {
  throw new Error('batch69 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 2) {
  throw new Error('batch69 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch69 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch69 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch69 duplicate ids');

const FORBIDDEN_IDS = [
  'equate-complete-multi',
  'kirkland-d3-softgels-clear',
  'kirkland-fish-oil-softgels-clear',
  'kirkland-wild-alaskan-fish-oil',
  'kirkland-mucus-dm-max-er',
  'members-mark-d3-125mcg-softgels',
  'members-mark-adult-multi-gummies',
  'members-mark-advanced-womens-multi',
  'members-mark-advanced-mens-multi',
  'members-mark-advanced-womens-50-multi',
  'upup-pm-lubricant-ointment',
  'assured-headache-pm',
  'nature-made-d3-softgels-clear',
  'tylenol-pm-es',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch69 must not clone closed product ids');
}

const d3 = _ROWS.find((r) => r.id === MM_D3_50);
if (d3?.verdict !== 'clean' || d3.formulaId !== D3_FORMULA) {
  throw new Error('MM D3 50 mcg must be Clean on members-mark-d3-softgels-safflower');
}
if (d3.barcode) {
  throw new Error('MM D3 50 mcg must not attach the DSLD soybean+corn UPC');
}
if (
  d3.inactiveIngredients.some((i) => /soybean|corn oil|bht/i.test(i.name))
) {
  throw new Error('do not import the DSLD soybean + corn / BHT D3 twin');
}
if (
  d3.inactiveIngredients.some(
    (i) => /safflower/i.test(i.name) && i.riskLevel === 'high',
  )
) {
  throw new Error('softgel safflower fill must not be High');
}

const mel = _ROWS.find((r) => r.id === MM_MELATONIN);
if (mel?.verdict !== 'caution' || mel.formulaId !== MM_MELATONIN) {
  throw new Error('MM melatonin must be Caution on its own formulaId');
}
if (!mel.inactiveIngredients.some((i) => /polyethylene glycol/i.test(i.name) && i.riskLevel === 'moderate')) {
  throw new Error('MM melatonin PEG must be Moderate');
}
if (!mel.inactiveIngredients.some((i) => /silica|silicon dioxide/i.test(i.name))) {
  throw new Error('MM melatonin must list silica / SiO2 as the Caution cap');
}
if (mel.inactiveIngredients.some((i) => /pyridoxine|melatonin/i.test(i.name))) {
  throw new Error('MM melatonin must not flag SF actives as inactives');
}
if (mel.barcode !== '078742094632') {
  throw new Error('MM melatonin must use UPC 078742094632');
}

const wg = _ROWS.find((r) => r.id === WG_MULTI);
if (wg?.verdict !== 'avoid' || wg.formulaId !== WG_MULTI) {
  throw new Error('Walgreens adult multi must be Avoid on its own formulaId');
}
if (wg.barcode !== '311917199139') {
  throw new Error('Walgreens adult multi must use founder UPC 311917199139');
}
if (!wg.inactiveIngredients.some((i) => /titanium dioxide/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('Walgreens adult multi must list TiO2 High');
}
if (!wg.inactiveIngredients.some((i) => /talc/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('Walgreens adult multi must list talc High');
}
if (
  wg.inactiveIngredients.some((i) =>
    /ferrous|folic|cholecalciferol|tocopheryl acetate|sodium metavanadate|stannous/i.test(
      i.name,
    ),
  )
) {
  throw new Error('Walgreens adult multi must not flag SF vitamin/mineral actives as inactives');
}

const upup = _ROWS.find((r) => r.id === UPUP_APAP_PM);
if (upup?.verdict !== 'avoid' || upup.formulaId !== UPUP_APAP_PM_FORMULA) {
  throw new Error('up&up ES APAP PM must use own founder-stack formulaId');
}
if (upup.barcode !== '359726863117') {
  throw new Error('up&up ES APAP PM must use founder UPC 359726863117');
}
if (upup.inactiveIngredients.some((i) => /lanolin/i.test(i.name))) {
  throw new Error('up&up ES APAP PM must not pick up the eye-ointment PM row');
}
if (!upup.inactiveIngredients.some((i) => /talc/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('up&up ES APAP PM founder stack must list talc High');
}
if (!upup.inactiveIngredients.some((i) => /polyvinyl alcohol/i.test(i.name))) {
  throw new Error('up&up ES APAP PM founder stack must list PVA');
}
if (upup.inactiveIngredients.some((i) => /polysorbate|carnauba|stearic acid|crospovidone/i.test(i.name))) {
  throw new Error('up&up ES APAP PM must not import the DailyMed / DG Health stack');
}

const tcC = _ROWS.find((r) => r.id === TC_VIT_C);
if (tcC?.verdict !== 'caution' || tcC.formulaId !== TC_VIT_C) {
  throw new Error('TopCare Vitamin C must be Caution on its own formulaId');
}
if (tcC.barcode) {
  throw new Error('TopCare Vitamin C must not attach the palm-twin UPC');
}
if (tcC.inactiveIngredients.some((i) => /palm/i.test(i.name))) {
  throw new Error('TopCare Vitamin C founder panel has no palm — do not invent it');
}
if (!tcC.inactiveIngredients.some((i) => /fruit juice/i.test(i.name) && i.riskLevel === 'limited')) {
  throw new Error('TopCare Vitamin C must Limited-flag fruit juice concentrate as gummy base');
}
if (!tcC.inactiveIngredients.some((i) => /paprika/i.test(i.name) && i.riskLevel === 'cleared')) {
  throw new Error('TopCare Vitamin C paprika extract as color must be Cleared');
}

const REUSE_FORMULA_COUNT = _ROWS.filter((r) => r.formulaId === D3_FORMULA).length;
if (REUSE_FORMULA_COUNT !== 1) {
  throw new Error('batch69 expected 1 formulaId reuse (MM D3 safflower)');
}

if (BATCH69_SKIPPED.length !== 10) {
  throw new Error('batch69 skipped-list drift');
}

const refused = BATCH69_SKIPPED.filter((s) => s.reason.startsWith('REFUSED'));
if (refused.length !== 4) {
  throw new Error('batch69 expected 4 §5 refuses');
}
if (!refused.some((s) => /Ethyl Vanillin/i.test(s.reason))) {
  throw new Error('Kirkland Krill refuse must list Ethyl Vanillin');
}
if (!refused.some((s) => /Spirulina/i.test(s.reason) && /adult multi/i.test(s.sku))) {
  throw new Error('TopCare adult multi refuse must list Spirulina');
}
if (!refused.some((s) => /Hibiscus Concentrate/i.test(s.reason))) {
  throw new Error("TopCare Men's refuse must list Hibiscus Concentrate");
}

for (const record of BATCH69_KYR6_STORE_PANELS) {
  const expected = BATCH69_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 69 catch-up UPC drift on ${record.id}`);
  }
  if (!expected && record.barcode) {
    throw new Error(`batch 69 invented UPC on ${record.id}`);
  }
}
