// DRAFT / not verified / batch 70 KYR6 Amazon 3P FIRST SLICE /
// Micro Ingredients only. Methodology v1.6 + current main §5
// exact. Additive / “also appears as” / locked exact-INCI rows
// only. No invented grades. No cousin-match. Founder owns
// final Avoid vs Caution vs Clean.
//
// ONE write. US Amazon Micro Ingredients vitamins /
// supplements / OTC with pinned Other Ingredients only.
// recordStatus is 'unverified' on every row. Internal keys
// only: clean | caution | avoid. UPC attached only when a
// real 12-digit is on the PDP / brand / iHerb / Vitacost
// panel. NDC ≠ UPC. Missing code ≠ no row (omit barcode).
// Pack sizes of the same name+form+inactives share
// formulaId. Form is labeled on cleanAlternatives, not a
// hard filter (§6). Search wiring only. Not wired into
// Clean Picks UI. No photos. Letter tiles only on new ids.
// No fake Clean alts. No methodology wipe. No new §5
// stamps. PROJECT_NOTES tally-only (do not wipe LIVE NOW).
//
// Highest draft after this write = batch70. File MUST be
// named batch70-kyr6-amazon-3p-micro-ingredients.ts.
// Do NOT reopen batch61–69 or PR #230. Amazon house
// (Basics / Elements / Revly / Solimo) CLOSED. Mama Bear
// four + PR #118 CLOSED. No Sprouts. No UPC factory
// #121–#221. No new oil bottles graded (hunt list only).
//
// Priority parked ex-Elements 3P: Mg lemon powder +
// Glucosamine. Glucosamine 7-in-1 is written. Lemonade Mg
// glycinate powder is SKIPPED no_OI after brand / Amazon
// first-paint + iHerb/Vitacost hunt (do NOT steal the peach
// panel). MiracleMag / Mag Duo lemonade also no_OI.
//
// Current store PDP beats older DSLD when they conflict
// (D3 5000 now coconut fill, not the 2020 gelatin-only
// DSLD 232102 panel). HTML bullets alone ≠ OI.
//
// LOCKS used (exact §5): unnamed “coating” / coating
// powder = Vegetable Coating (unnamed) Caution. Stevia
// leaf extract = whole-leaf / crude Caution (not Reb A /
// Reb M). Beta-carotene as color = Caution. Natural
// flavors = Limited. Named lemon oil as flavor = Limited.
// Coconut oil as softgel fill = Cleared (NOT gummy High;
// tap). Gelatin / glycerin / water / MCC / croscarmellose
// / HPMC / magnesium stearate / citric / malic = Cleared.
// SiO2 / rice flour not on these written panels. Limited-
// only never Avoid. Avoid needs High. Display keys stay
// clean / caution / avoid. Grade only true inactives — SF
// vitamins / minerals / featured actives are not flags.
//
// TALLY (unverified drafts in THIS file): 7 rows — Clean 3
// / Caution 4 / Avoid 0. NEW 6 / REUSE-formula 1 /
// SKIPPED + REFUSED listed at the bottom.
//
// Independently Clean analogs already on main (not cloned):
// megafood-magnesium-300-capsules ·
// amazon-elements-vitamin-d3-5000-softgels ·
// nature-made-d3-softgels-clear ·
// kirkland-d3-softgels-clear ·
// kirkland-fish-oil-softgels-clear ·
// thrive-wellmade-fish-oil ·
// thorne-glucosamine-chondroitin.
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
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const PAIN_FEVER = 'Pain & Fever';

const BRAND = 'Micro Ingredients';
const AMAZON = ['Amazon'] as const;

const MG_PURE = 'micro-ingredients-pure-mg-glycinate-240';
const D3_5000 = 'micro-ingredients-d3-5000-coconut-500';
const D3_K2 = 'micro-ingredients-d3-k2-10000-200-coconut-300';
const GLUCOSAMINE = 'micro-ingredients-glucosamine-7in1-300';
const MG_PEACH = 'micro-ingredients-mg-glycinate-powder-peach-12oz';
const FO_LEMON = 'micro-ingredients-omega3-lemon-240';
const FO_LEMON_120 = 'micro-ingredients-omega3-lemon-120';
const FO_LEMON_FORMULA = 'micro-ingredients-omega3-lemon';

const MEGAFOOD_MG = 'megafood-magnesium-300-capsules';
const AE_D3 = 'amazon-elements-vitamin-d3-5000-softgels';
const NM_D3 = 'nature-made-d3-softgels-clear';
const KIRK_D3 = 'kirkland-d3-softgels-clear';
const KIRK_FO = 'kirkland-fish-oil-softgels-clear';
const THRIVE_FO = 'thrive-wellmade-fish-oil';
const THORNE_GLUCOSAMINE = 'thorne-glucosamine-chondroitin';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. Sunflower / palm / safflower / vegetable oil / canola used as a gummy coating or fill is that High rule. Coconut oil as this softgel fill is not.';

const COAT_TAP =
  'Vegetable Coating / Vegetable-Based Tablet Coating is an unnamed coat. Named wax / GMS / named (HPMC, glycerin) stays Cleared. The label here prints only “coating.”';

const STEVIA_LEAF_TAP =
  'Whole-leaf / crude stevia is Caution. High-purity Reb A / Reb M is the Cleared steviol-glycoside row — this panel prints stevia leaf extract, not Reb A / Reb M.';

const CITE = {
  mgPure:
    'Current iHerb Pure Magnesium Glycinate 240 capsules (https://nz.iherb.com/pr/micro-ingredients-pure-magnesium-glycinate-240-capsules/149859) other-ingredients: Gelatin (capsule). Supplement Facts: Magnesium (as magnesium glycinate) 400 mg + Vitamin C (as ascorbyl palmitate) 204 mg per 3-capsule serving. Live Amazon US filler-free 240-ct pouch https://www.amazon.com/Magnesium-Glycinate-Capsules-Muscle-Sleep/dp/B0DGRNP1ZL. Distinct from iHerb MII-02388 rice-flour / SiO2 gelatin twin (850069023881) and from Amazon veggie 350 mg B0DWDHJZ4T (no_OI). Ascorbyl palmitate is the labeled SF vitamin C — not the inactive antioxidant flag.',
  d35000:
    'Current Vitacost / iHerb Micro Ingredients Vitamin D3 5,000 IU 500 softgels (https://www.vitacost.com/products/micro-ingredients-vitamin-d3-5-000-iu-500-softgels-151017) Ingredients: Coconut oil, softgel (gelatin, glycerin, purified water). UPC-A 850056167819. Live Amazon US https://www.amazon.com/Micro-Ingredients-Softgels-Absorption-Cholecalciferol/dp/B0DGRWCTN8. Distinct from older HelloPharmacist / DSLD 232102 (kosher gelatin / glycerin / water only; Amazon-style code X0016XUJJX — not a GTIN-12 and not this coconut panel).',
  d3k2:
    'Current iHerb Micro Ingredients Vitamin D3 & K2 300 softgels (https://za.iherb.com/pr/micro-ingredients-vitamin-d3-k2-300-softgels/148171) other-ingredients: Coconut oil, softgel (gelatin, glycerin, purified water). SF: Vitamin D (as cholecalciferol) 250 mcg (10,000 IU) + Vitamin K2 (as menaquinone-7) 200 mcg. Live Amazon US coconut 300-ct pouch is the same pack described on Amazon bundle copy (B0FGKPXD1M). Distinct from Amazon D3 5,000 IU + K2 100 mcg 180-ct sunflower title B0D2S6DMDS (no full OI this hunt — skipped) and from older HelloPharmacist / DSLD 232088 (125 mcg / 100 mcg; gelatin / glycerin / water only; X0026FC961).',
  glucosamine:
    'Current iHerb / Vitacost Micro Ingredients Glucosamine Chondroitin, MSM & Turmeric 300 bisected tablets (https://uk.iherb.com/pr/micro-ingredients-glucosamine-chondroitin-msm-turmeric-300-bisected-tablets/152160 ; https://www.vitacost.com/products/micro-ingredients-glucosamine-chondroitin-msm-turmeric-300-bisected-tablets-152160) other-ingredients: Microcrystalline cellulose, croscarmellose sodium, coating, magnesium stearate. Live Amazon US https://www.amazon.com/Chondroitin-glucosamine-MSM-Bone-Joint/dp/B0DK683WHV. SF actives: glucosamine HCl 1,500 mg, MSM 1,000 mg, chondroitin sulfate 100 mg, turmeric root, boswellia extract, hydrolyzed collagen, hyaluronic acid. Vitacost UPC field empty this hunt — omitted. Do not invent a coat composition.',
  peachMg:
    'Current iHerb Micro Ingredients Magnesium Glycinate Powder, Peach Rings, 12 oz / 340 g (https://mu.iherb.com/pr/micro-ingredients-magnesium-glycinate-powder-peach-rings-12-oz-340-g/156508) other-ingredients: Citric acid, malic acid, natural flavors, stevia leaf extract, beta carotene. UPC-A 850056167741. Live Amazon US peach 12 oz https://www.amazon.com/Magnesium-Glycinate-Powder-Calm-Sleep/dp/B0DG3QT3M2. Do NOT reuse this panel on lemonade 12 oz B0G163QK2Y / Mag Duo lemonade / MiracleMag raspberry-lemon (those stay no_OI).',
  lemonFo:
    'Current Vitacost Micro Ingredients Omega-3 Fish Oil Triple Strength Lemon — 240-ct (https://www.vitacost.com/products/micro-ingredients-omega-3-fish-oil-lemon-240-softgels-146057) and 120-ct (https://www.vitacost.com/products/micro-ingredients-omega-3-fish-oil-triple-strength-lemon-120-softgels-1-400-mg-per-softgel-146511) Ingredients: Softgel (gelatin, glycerin, natural lemon oil, purified water). 120-ct UPC-A 850056167222. Same OI + same per-serving actives (fish oil 4,200 mg / EPA 1,200 / DHA 900 per 3 softgels) — share formulaId. Live Amazon US store / 240-ct lemon triple-strength line. Distinct from older HelloPharmacist / DSLD 231854 unflavored gelatin / glycerin / water fish oil (X001Z2KPA3). Marketing “enteric coated” is not a printed OI token — do not invent enteric polymers.',
} as const;

const METH = {
  unnamedCoat: `Methodology §5 Caution (Vegetable Coating / Vegetable-Based Tablet Coating — unnamed coat; named wax / GMS / named (HPMC, glycerin) stays Cleared; standalone Caution, not Avoid; locked Sept 16, 2026). ${COAT_TAP}`,
  steviaLeaf: `Methodology §5 Caution (whole-leaf / crude stevia — do not auto-Clean; not Reb A / Reb M; locked Sept 14, 2026). ${STEVIA_LEAF_TAP}`,
  betaCarotene:
    'Methodology §5 Caution (beta-carotene as a color additive — exact token; standalone Caution, not Avoid; Beta Carotene (For Color) restamp Sept 16, 2026)',
  flavors:
    'Methodology §5 Limited-risk (natural flavors — undisclosed mixtures; opacity, not a known hazard)',
  lemonOil:
    'Methodology §5 Limited-risk (named lemon oil as flavor — locked Sept 14, 2026 housekeeping; not topical EO Caution)',
  coconutFill: `Methodology §5 Cleared (coconut oil as softgel fill — coconut exception, NOT gummy seed-oil High; locked Sept 14 / Sept 16, 2026). ${OIL_FILL_TAP}`,
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / purified water USP)',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum / carboxymethylcellulose sodium)',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate / vegetable stearate)',
  citric:
    'Methodology §5 Cleared (citric acid / ascorbic acid / citrate salts as fillers/buffers)',
  malic: 'Methodology §5 Cleared (lactic acid / malic acid — organic acids with citric)',
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

const MG_ALTS: CleanAlternative[] = [
  alt(
    MEGAFOOD_MG,
    'Independently Clean MegaFood Magnesium 300 already on main. Form: capsule vs this capsule / powder — labeled, not a hard filter (§6). Same adult Vitamins shelf.',
  ),
];

const D3_ALTS: CleanAlternative[] = [
  alt(
    AE_D3,
    'Independently Clean Amazon Elements Vitamin D3 5000 IU safflower softgels already on main. Form: softgel. Same adult Vitamins shelf. Safflower fill ≠ this coconut fill — both Cleared softgel oils.',
  ),
  alt(
    NM_D3,
    'Independently Clean Nature Made D3 softgels already on main. Form labeled, not a hard filter (§6).',
  ),
  alt(
    KIRK_D3,
    'Independently Clean Kirkland D3 softgels already on main. Form labeled, not a hard filter (§6).',
  ),
];

const FO_ALTS: CleanAlternative[] = [
  alt(
    KIRK_FO,
    'Independently Clean Kirkland fish oil (porcine gelatin / tocopherols) already on main. Form: softgel vs this lemon-oil softgel — labeled, not a hard filter (§6).',
  ),
  alt(
    THRIVE_FO,
    'Independently Clean Thrive Wellmade fish oil already on main. Form labeled, not a hard filter (§6).',
  ),
];

const GLUCOSAMINE_ALTS: CleanAlternative[] = [
  alt(
    THORNE_GLUCOSAMINE,
    'Independently Clean Thorne Glucosamine & Chondroitin already on main (HPMC capsule + calcium laurate). Form: capsule vs this coated tablet — labeled, not a hard filter (§6). Same adult Pain & Fever / joint shelf.',
  ),
];

export const BATCH70_CATCHUP_BARCODES: Record<string, string> = {
  [D3_5000]: '850056167819',
  [MG_PEACH]: '850056167741',
  [FO_LEMON_120]: '850056167222',
};

export const BATCH70_KYR6_AMAZON_3P_MICRO_INGREDIENTS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: MG_PURE,
    productName: 'Pure Magnesium Glycinate Capsules, 400 mg (240 ct)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: MG_PURE,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    retailers: [...AMAZON, 'iHerb'],
    activeIngredients: [
      { name: 'Magnesium (as magnesium glycinate)', strength: '400mg' },
      { name: 'Vitamin C (as ascorbyl palmitate)', strength: '204mg' },
    ],
    inactiveIngredients: [
      flag('Gelatin (capsule)', 'cleared', labelCite(CITE.mgPure, METH.gelatin)),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Micro Ingredients Pure Magnesium Glycinate 240 capsules = Clean. Current iHerb other-ingredients: Gelatin (capsule) only. Live Amazon US filler-free 240-ct B0DGRNP1ZL. Gelatin is Cleared. Vitamin C as ascorbyl palmitate is the labeled Supplement Facts vitamin — not an inactive flag. Distinct from iHerb 850069023881 rice-flour / SiO2 / gelatin twin and from Amazon veggie 350 mg B0DWDHJZ4T (no_OI this hunt). Do not write lemonade powder / MiracleMag / Mag Duo here. Pack sizes of this gelatin-only 400 mg/serving formula share this formulaId. No carton UPC harvested — omitted. No DailyMed drug SPL (dietary supplement). Adults. Draft, not verified.`,
    cleanAlternatives: MG_ALTS,
    sourcesGeneral: [`${CITE.mgPure} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: D3_5000,
    productName: 'Vitamin D3 Softgels, 5,000 IU (500 ct)',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH70_CATCHUP_BARCODES[D3_5000],
    formulaId: D3_5000,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    retailers: [...AMAZON, 'iHerb', 'Vitacost'],
    activeIngredients: [
      { name: 'Vitamin D (as cholecalciferol) (D3)', strength: '125mcg (5000 IU)' },
    ],
    inactiveIngredients: [
      flag('Coconut oil', 'cleared', labelCite(CITE.d35000, METH.coconutFill)),
      flag('Gelatin', 'cleared', labelCite(CITE.d35000, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.d35000, METH.glycerin)),
      flag('Purified water', 'cleared', labelCite(CITE.d35000, METH.water)),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Micro Ingredients Vitamin D3 5,000 IU 500 softgels = Clean. Current Vitacost / iHerb Ingredients: Coconut oil, softgel (gelatin, glycerin, purified water). ${OIL_FILL_TAP} Live Amazon US B0DGRWCTN8. UPC 850056167819 attached. Distinct from older DSLD 232102 gelatin-only panel (do not write that as this row). Distinct from D3+K2 10,000 IU / 200 mcg coconut 300-ct (own formulaId; K2 active differs). Contains coconut. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: D3_ALTS,
    sourcesGeneral: [`${CITE.d35000} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: D3_K2,
    productName: 'Vitamin D3 10,000 IU + K2 200 mcg Softgels (300 ct)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: D3_K2,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    retailers: [...AMAZON, 'iHerb'],
    activeIngredients: [
      { name: 'Vitamin D (as cholecalciferol) (D3)', strength: '250mcg (10000 IU)' },
      { name: 'Vitamin K2 (as menaquinone-7) (MK-7)', strength: '200mcg' },
    ],
    inactiveIngredients: [
      flag('Coconut oil', 'cleared', labelCite(CITE.d3k2, METH.coconutFill)),
      flag('Gelatin', 'cleared', labelCite(CITE.d3k2, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.d3k2, METH.glycerin)),
      flag('Purified water', 'cleared', labelCite(CITE.d3k2, METH.water)),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Micro Ingredients Vitamin D3 10,000 IU + K2 200 mcg 300 softgels = Clean. Current iHerb other-ingredients: Coconut oil, softgel (gelatin, glycerin, purified water). ${OIL_FILL_TAP} Same coconut / gelatin / glycerin / water family as the 5,000 IU D3-only pouch, but K2 + 10,000 IU per-softgel active ≠ that row — own formulaId \`${D3_K2}\`. Distinct from Amazon sunflower-oil D3 5,000 + K2 100 mcg 180-ct B0D2S6DMDS (no full OI; skipped) and from DSLD 232088 125 mcg / 100 mcg gelatin-only. No 12-digit harvested — omitted. Contains coconut. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: D3_ALTS,
    sourcesGeneral: [`${CITE.d3k2} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: GLUCOSAMINE,
    productName: 'Glucosamine Chondroitin MSM & Turmeric 7-in-1 Tablets (300 ct)',
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: GLUCOSAMINE,
    audience: ADULT,
    minAge: 18,
    form: 'coated bisected tablet',
    productType: SUPPLEMENT,
    retailers: [...AMAZON, 'iHerb', 'Vitacost'],
    activeIngredients: [
      { name: 'Glucosamine hydrochloride (shellfish free)', strength: '1500mg' },
      { name: 'MSM (methylsulfonylmethane)', strength: '1000mg' },
      { name: 'Chondroitin sulfate', strength: '100mg' },
      { name: 'Turmeric (Curcuma longa) (root)', strength: 'label serving' },
      { name: 'Boswellia extract (Boswellia serrata) (gum resin)', strength: '100mg' },
      { name: 'Hydrolyzed collagen', strength: '50mg' },
      { name: 'Hyaluronic acid (as sodium hyaluronate)', strength: '25mg' },
    ],
    inactiveIngredients: [
      flag(
        'Coating',
        'cleared',
        labelCite(CITE.glucosamine, METH.unnamedCoat),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(CITE.glucosamine, METH.cellulose),
      ),
      flag(
        'Croscarmellose sodium',
        'cleared',
        labelCite(CITE.glucosamine, METH.cellulose),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(CITE.glucosamine, METH.stearic),
      ),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Micro Ingredients Glucosamine Chondroitin MSM & Turmeric 7-in-1 300 bisected tablets = Caution. Driver is unnamed “coating” (Vegetable Coating / Vegetable-Based Tablet Coating Caution; not the named HPMC+glycerin Cleared coat). ${COAT_TAP} Current iHerb / Vitacost OI: Microcrystalline cellulose, croscarmellose sodium, coating, magnesium stearate. Live Amazon US B0DK683WHV — this is the parked ex-Elements Glucosamine 3P SKU. MCC / croscarmellose / magnesium stearate are Cleared. No High. ${LIMITED_STACK} Do not invent a coat recipe. Vitacost UPC field empty this hunt — omitted. Joint actives listed neutrally — this draft grades inactives only. Own formulaId. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: GLUCOSAMINE_ALTS,
    sourcesGeneral: [`${CITE.glucosamine} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: MG_PEACH,
    productName: 'Magnesium Glycinate Powder, Peach Rings, 12 oz',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH70_CATCHUP_BARCODES[MG_PEACH],
    formulaId: MG_PEACH,
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: VITAMIN,
    retailers: [...AMAZON, 'iHerb'],
    activeIngredients: [
      { name: 'Magnesium (as magnesium glycinate)', strength: '400mg' },
    ],
    inactiveIngredients: [
      flag(
        'Stevia leaf extract',
        'cleared',
        labelCite(CITE.peachMg, METH.steviaLeaf),
      ),
      flag(
        'Beta carotene',
        'cleared',
        labelCite(CITE.peachMg, METH.betaCarotene),
      ),
      flag('Natural flavors', 'limited', labelCite(CITE.peachMg, METH.flavors)),
      flag('Citric acid', 'cleared', labelCite(CITE.peachMg, METH.citric)),
      flag('Malic acid', 'cleared', labelCite(CITE.peachMg, METH.malic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Micro Ingredients Magnesium Glycinate Powder Peach Rings 12 oz = Caution. Drivers are stevia leaf extract (whole-leaf / crude Caution, not Reb A / Reb M) + beta-carotene as color (Caution) + Limited natural flavors. ${STEVIA_LEAF_TAP} Current iHerb OI: Citric acid, malic acid, natural flavors, stevia leaf extract, beta carotene. Live Amazon US B0DG3QT3M2. UPC 850056167741 attached. Citric / malic are Cleared. No High. ${LIMITED_STACK} Do NOT clone this panel onto lemonade 12 oz B0G163QK2Y, Mag Duo lemonade, or MiracleMag raspberry-lemon (those stay SKIPPED no_OI). Distinct from Pure Magnesium Glycinate 240 gelatin capsules (Clean). Pack sizes of this peach powder formula share this formulaId. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: MG_ALTS,
    sourcesGeneral: [`${CITE.peachMg} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: FO_LEMON,
    productName: 'Triple Strength Omega-3 Fish Oil Softgels, Lemon, 240 ct',
    brand: BRAND,
    category: VITAMINS,
    formulaId: FO_LEMON_FORMULA,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    retailers: [...AMAZON, 'iHerb', 'Vitacost'],
    activeIngredients: [
      { name: 'Omega-3 fish oil', strength: '4200mg' },
      { name: 'EPA (eicosapentaenoic acid)', strength: '1200mg' },
      { name: 'DHA (docosahexaenoic acid)', strength: '900mg' },
    ],
    inactiveIngredients: [
      flag('Natural lemon oil', 'limited', labelCite(CITE.lemonFo, METH.lemonOil)),
      flag('Gelatin', 'cleared', labelCite(CITE.lemonFo, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.lemonFo, METH.glycerin)),
      flag('Purified water', 'cleared', labelCite(CITE.lemonFo, METH.water)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Micro Ingredients Triple Strength Omega-3 Fish Oil lemon 240-ct = Caution (Limited named lemon oil as flavor). Current Vitacost Ingredients: Softgel (gelatin, glycerin, natural lemon oil, purified water). Gelatin / glycerin / water are Cleared. No High. ${LIMITED_STACK} Marketing “enteric coated” is not printed on the OI line — do not invent enteric polymers. Distinct from older DSLD 231854 unflavored gelatin/glycerin/water fish oil. 120-ct shares formulaId \`${FO_LEMON_FORMULA}\` when this OI holds. 240-ct Vitacost UPC field empty this hunt — omitted. Contains fish (anchovies, sardines). No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: FO_ALTS,
    sourcesGeneral: [`${CITE.lemonFo} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: FO_LEMON_120,
    productName: 'Triple Strength Omega-3 Fish Oil Softgels, Lemon, 120 ct',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH70_CATCHUP_BARCODES[FO_LEMON_120],
    formulaId: FO_LEMON_FORMULA,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    retailers: [...AMAZON, 'iHerb', 'Vitacost'],
    activeIngredients: [
      { name: 'Omega-3 fish oil', strength: '4200mg' },
      { name: 'EPA (eicosapentaenoic acid)', strength: '1200mg' },
      { name: 'DHA (docosahexaenoic acid)', strength: '900mg' },
    ],
    inactiveIngredients: [
      flag('Natural lemon oil', 'limited', labelCite(CITE.lemonFo, METH.lemonOil)),
      flag('Gelatin', 'cleared', labelCite(CITE.lemonFo, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.lemonFo, METH.glycerin)),
      flag('Purified water', 'cleared', labelCite(CITE.lemonFo, METH.water)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Micro Ingredients Triple Strength Omega-3 Fish Oil lemon 120-ct = Caution (same Limited lemon-oil panel as the 240-ct). Shares formulaId \`${FO_LEMON_FORMULA}\` — REUSE, not a second grade. Current Vitacost 120-ct UPC 850056167222 attached. Same per-serving actives (4,200 mg fish oil / 1,200 EPA / 900 DHA per 3 softgels). Do not invent enteric polymers. Contains fish. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: FO_ALTS,
    sourcesGeneral: [`${CITE.lemonFo} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
];

export const BATCH70_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'Micro Ingredients Magnesium Glycinate Powder Lemonade 12 oz (Amazon B0G163QK2Y / brand lemonade 12 oz)',
    reason:
      'SKIPPED no_OI after hunt — parked ex-Elements Mg lemon powder. Brand site + Amazon first-paint / bullets have no Other Ingredients. Do not steal Peach Rings iHerb OI (citric / malic / flavors / stevia leaf / beta carotene). Accordion + count-tab hunt did not pin a lemonade panel this pass. NO Search row.',
  },
  {
    sku: 'Micro Ingredients MiracleMag raspberry-lemon magnesium citrate powder (1 lb / 2 lb; Amazon B0FH5QKZ9V)',
    reason:
      'SKIPPED no_OI after hunt — brand / Amazon describe magnesium carbonate + citric acid + water as how the citrate active is made, not a pinned Other Ingredients line. Flavor/sweetener panel not pinned. Do not invent stevia / flavors from the peach glycinate twin.',
  },
  {
    sku: 'Micro Ingredients Mag Duo Magtein + glycinate lemonade powder (Amazon B0GHCR3PKT)',
    reason:
      'SKIPPED no_OI after hunt — brand / Amazon bullets only. Do not steal peach glycinate OI.',
  },
  {
    sku: 'Micro Ingredients Vitamin D3 5,000 IU + K2 100 mcg 180 softgels sunflower (Amazon B0D2S6DMDS)',
    reason:
      'SKIPPED no_OI after hunt — title names virgin sunflower seed oil but no full Other Ingredients panel pinned. Do not invent gelatin/glycerin/water around that oil. Distinct from the written coconut D3 and coconut D3+K2 10,000/200 rows.',
  },
  {
    sku: 'Micro Ingredients Magnesium Glycinate 350 mg 240 veggie capsules (Amazon B0DWDHJZ4T)',
    reason:
      'SKIPPED no_OI after hunt — veggie capsule, no pinned shell/excipient list. Unlabeled Vegetable Capsule is not graded. Do not invent HPMC. Do not clone the gelatin-only 400 mg row.',
  },
  {
    sku: 'Micro Ingredients Magnesium Glycinate 500 mg 240 capsules (Amazon B087F4HLJ3) + iHerb rice-flour 240-ct 850069023881',
    reason:
      'SKIPPED — iHerb MII-02388 pins rice flour / magnesium stearate / silicon dioxide / gelatin, but that panel is not locked to the live Amazon 500 mg B087F4HLJ3 count/strength this hunt. Do not alias strengths. Distinct from written filler-free 400 mg gelatin-only.',
  },
  {
    sku: 'Micro Ingredients Triple Magnesium Complex 300 capsules (iHerb gelatin-only)',
    reason:
      'SKIPPED this pass — iHerb pins Gelatin (capsule) only (Clean-class), but no Amazon US exact-pack ASIN pinned this hunt. Do not write without the US Amazon listing lock.',
  },
  {
    sku: 'Electrolyte hydration drink mixes / packets / Pina Colada powder (Pedialyte-class)',
    reason:
      'SKIPPED-OUT — Pedialyte-class chug / hydration drink. Mineral/ionic drops with SF + dropper would be IN; these are drink-mix powders.',
  },
  {
    sku: 'Clear Protein+ / whey-style / meal-replacement / collagen-peptide protein-aisle tubs',
    reason: 'SKIPPED-OUT — protein-aisle / food-drink-shaped park.',
  },
  {
    sku: 'Magnesium lotion; magnesium oil spray; MCT pour bottles; oregano / black-seed / carrier oil pour bottles',
    reason:
      'SKIPPED-OUT / hunt-list only — cosmetics + oil bottles. Never grade pour-bottle oils. Softgel oil SKUs stay IN when OI is pinned (lemon FO written; other oil softgels not pinned this slice).',
  },
  {
    sku: 'Organic chia / hemp seeds; condiments; cosmetics; pet; Canada/EU; bundles; shipping-protection',
    reason: 'SKIPPED-OUT — food / cosmetics / pet / bundle / not a US single SKU.',
  },
  {
    sku: 'Remaining live Micro Ingredients Amazon US vitamin/supplement catalog (capsules, flavored powders, gummies, 100% powders, biotin/melatonin/zinc twins, creatine, etc.)',
    reason:
      'SKIPPED this first slice — OI not pinned from gallery / brand / current iHerb-Vitacost / DSLD-current for that exact Amazon pack after accordion + count-tab hunt. DSLD “None” 2020 powders not mass-written without a current Amazon exact-pack pin. Do not invent. Later Micro Ingredients leftover slice may write them.',
  },
];

export const BATCH70_OIL_HUNT: { name: string; url: string }[] = [
  {
    name: 'Micro Ingredients Organic MCT Oil with Prebiotic Fiber Powder / MCT pour bottles',
    url: 'https://www.microingredients.com/products/micro-ingredients-organic-mct-oil-with-prebiotic-fiber-powder-8oz',
  },
  {
    name: 'Micro Ingredients Magnesium Oil+ Advanced Spray Cool Mint, 12 fl oz',
    url: 'https://www.microingredients.com/products/micro-ingredients-magnesium-oil-advanced-spray-cool-mint-12-fl-oz',
  },
  {
    name: 'Micro Ingredients Oil of Oregano with Black Seed Oil (pour / oil SKU if seen as a bottle)',
    url: 'https://www.microingredients.com/products/micro-ingredients-oil-of-oregano-with-black-seed-oil',
  },
];

const _ROWS = BATCH70_KYR6_AMAZON_3P_MICRO_INGREDIENTS;
if (_ROWS.length !== 7) throw new Error('batch70 tally drift: expected 7 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 3) {
  throw new Error('batch70 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 4) {
  throw new Error('batch70 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch70 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch70 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch70 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch70 duplicate ids');

const FORBIDDEN_IDS = [
  'amazon-elements-chelated-magnesium',
  'amazon-elements-vitamin-d3-5000-softgels',
  'amazon-basics-fish-oil-gummies',
  'amazon-elements-omega-3-6-9',
  'mama-bear-kids-d3',
  'thorne-glucosamine-chondroitin',
  'kirkland-fish-oil-softgels-clear',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch70 must not clone house / Mama Bear / closed ids');
}

const gluc = _ROWS.find((r) => r.id === GLUCOSAMINE);
if (gluc?.verdict !== 'caution' || gluc.formulaId !== GLUCOSAMINE) {
  throw new Error('glucosamine 7-in-1 must be Caution on its own formulaId');
}
if (!gluc.inactiveIngredients.some((i) => /^coating$/i.test(i.name))) {
  throw new Error('glucosamine must list unnamed coating');
}
if (gluc.inactiveIngredients.some((i) => /hpmc|hypromellose|glycerin/i.test(i.name))) {
  throw new Error('do not invent a named coat on glucosamine');
}
if (gluc.barcode) {
  throw new Error('glucosamine must not attach an invented UPC');
}

const peach = _ROWS.find((r) => r.id === MG_PEACH);
if (peach?.verdict !== 'caution' || peach.barcode !== '850056167741') {
  throw new Error('peach Mg powder must be Caution with UPC 850056167741');
}
if (!peach.inactiveIngredients.some((i) => /stevia leaf/i.test(i.name))) {
  throw new Error('peach Mg must list stevia leaf extract');
}
if (peach.inactiveIngredients.some((i) => /reb(audioside)?\s*[am]/i.test(i.name))) {
  throw new Error('do not alias stevia leaf extract to Reb A / Reb M');
}

const d3 = _ROWS.find((r) => r.id === D3_5000);
if (d3?.verdict !== 'clean' || d3.barcode !== '850056167819') {
  throw new Error('D3 5000 coconut must be Clean with UPC 850056167819');
}
if (
  d3.inactiveIngredients.some((i) => /safflower|soybean/i.test(i.name))
) {
  throw new Error('D3 5000 must use the current coconut panel, not safflower/soy');
}

const d3k2 = _ROWS.find((r) => r.id === D3_K2);
if (d3k2?.verdict !== 'clean' || d3k2.formulaId === D3_5000) {
  throw new Error('D3+K2 10k/200 must be Clean on its own formulaId');
}
if (d3k2.barcode) {
  throw new Error('D3+K2 must not attach an invented UPC');
}

const mgPure = _ROWS.find((r) => r.id === MG_PURE);
if (mgPure?.verdict !== 'clean') {
  throw new Error('pure Mg 240 gelatin-only must be Clean');
}
if (mgPure.inactiveIngredients.some((i) => /rice flour|silicon dioxide|silica/i.test(i.name))) {
  throw new Error('do not import the rice-flour Mg twin onto the gelatin-only row');
}

const fo240 = _ROWS.find((r) => r.id === FO_LEMON);
const fo120 = _ROWS.find((r) => r.id === FO_LEMON_120);
if (fo240?.formulaId !== FO_LEMON_FORMULA || fo120?.formulaId !== FO_LEMON_FORMULA) {
  throw new Error('lemon FO packs must share formulaId');
}
if (fo240?.verdict !== 'caution' || fo120?.verdict !== 'caution') {
  throw new Error('lemon FO must be Caution on lemon oil');
}
if (fo120.barcode !== '850056167222') {
  throw new Error('lemon FO 120 must use UPC 850056167222');
}
if (fo240.barcode) {
  throw new Error('lemon FO 240 must not invent a UPC');
}

if (_ROWS.filter((r) => r.formulaId === FO_LEMON_FORMULA).length !== 2) {
  throw new Error('batch70 expected 1 formulaId reuse (lemon FO 120/240)');
}

if (BATCH70_SKIPPED.length !== 12) {
  throw new Error('batch70 skipped-list drift');
}
if (BATCH70_SKIPPED.some((s) => s.reason.startsWith('REFUSED'))) {
  throw new Error('batch70 has no §5 refuses this slice');
}
if (!BATCH70_SKIPPED.some((s) => /lemonade/i.test(s.sku))) {
  throw new Error('batch70 must skip lemonade Mg powder no_OI');
}

for (const record of BATCH70_KYR6_AMAZON_3P_MICRO_INGREDIENTS) {
  const expected = BATCH70_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 70 catch-up UPC drift on ${record.id}`);
  }
  if (!expected && record.barcode) {
    throw new Error(`batch 70 invented UPC on ${record.id}`);
  }
  if (record.brand !== BRAND) {
    throw new Error('batch70 writes Micro Ingredients only');
  }
}
