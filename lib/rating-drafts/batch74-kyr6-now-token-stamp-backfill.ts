// DRAFT / not verified / batch 74 KYR6 NOW leftover-token BACKFILL /
// Methodology v1.6 + current main §5. Founder stamp Sept 21, 2026
// leftover tokens only. No invented grades. No cousin-match.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. NOW leftover-token BACKFILL only. Write ONLY NOW
// SKUs that were skipped because a founder-stamped token now
// on MAIN was the block, and every other inactive maps to an
// exact §5 row already locked. Still-unknown token = REFUSED
// with the exact string. Spirulina powder + spirulina extract
// stay REFUSED. No Search row.
// US Amazon + nowfoods.com / vitamins / supplements with pinned
// Other Ingredients. Current Vitacost PDP Ingredients + UPC-A
// (733739…) is the pin. recordStatus is 'unverified' on every
// row. Internal keys only: clean | caution | avoid. UPC
// attached only when the Vitacost PDP printed a real 12-digit.
// Pack sizes of the same name+form+inactives+actives share
// formulaId. Search wiring only. Not wired into Clean Picks UI.
// No photos. Letter tiles only on new ids. No fake Clean alts.
// No methodology wipe. No new §5 stamps. PROJECT_NOTES tally-only.
//
// Highest draft after this write = batch74. File MUST be
// named batch74-kyr6-now-token-stamp-backfill.ts. Do NOT edit
// batch73 / batch72 / batch71 / batch70. Do NOT reopen batch61–69
// or PR #230. Amazon house CLOSED. No Sprouts. No UPC factory
// #121–#221. Oil/MCT/EO pour bottles = hunt list name+URL
// only; never grade. Do NOT start Nutricost or any other
// leftover 3P brand (still N=7). No house Amazon. No graded
// oils. No family guesses beyond PROJECT_NOTES + §5 already lock.
//
// REUSE ONLY (do not rewrite / do not clone the prior row):
// - every batch71 / batch72 / batch73 NOW Search row
// - now-saw-palmetto-extract-160-mg-120 (batch71) for the 240-ct
//
// TALLY (unverified drafts in THIS file): 23 rows —
// Clean 0 / Caution 20 / Avoid 3.
// NEW 18 / REUSE-formula 5 / SKIPPED + REFUSED
// listed at the bottom. TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'NOW';
const AMAZON = ['Amazon', 'nowfoods.com', 'Vitacost'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';
const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. Named single oil as this capsule/softgel/liquid-drop fill is not that High rule.';
const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';
const CARAMEL_TAP =
  'Undisclosed-class caramel color is Avoid. The label did not name Class I/II. Burden is on the label.';
const STEVIA_LEAF_TAP =
  'Whole-leaf / crude stevia is Caution. High-purity Reb A / Reb M / steviol glycosides is the Cleared row. Batch71 already maps the exact parenthetical "stevia leaf extract (rebaudioside a)" onto this Caution row. Do not invent a second grade.';

const METH = {
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  steviaLeaf: `Methodology §5 Caution (whole-leaf / crude stevia — do not auto-Clean; not Reb A / Reb M). ${STEVIA_LEAF_TAP}`,
  betaCarotene: 'Methodology §5 Caution (beta-carotene as a color additive — standalone Caution, not Avoid)',
  carobExtract: 'Methodology §5 Caution (plain Carob / Carob Extract — exact alias unless the panel says powder-as-food only; locked Sept 16 / Sept 20 2026 NOW #261 alias). Carob powder stays the Sept 21 Cleared row.',
  greenTea: 'Methodology §5 Caution (green tea extract (leaf) — unspecified/tea extract; NOW exact-§5 token lock after #262)',
  caramel: `Methodology §5 High-tier (caramel color, undisclosed class — treated as Class III/IV). ${CARAMEL_TAP}`,
  flavors: 'Methodology §5 Limited-risk (natural flavors — opacity, not a known hazard)',
  maltodextrin: 'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  xylitol: 'Methodology §5 Limited-risk (xylitol / erythritol, oral — GI effects at volume)',
  sugarAlcohol: 'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / mannitol)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium/potassium benzoate / sorbate / sorbic acid)',
  sucrose: 'Methodology §5 Limited-risk (sucrose — existing Limited sugar row; not Cleared cane sugar; locked Sept 20, 2026 NOW #261 alias)',
  beetSugar: 'Methodology §5 Limited-risk (beet sugar — Limited sugar; distinct from Cleared cane sugar; locked Sept 16, 2026)',
  modStarch: 'Methodology §5 Limited-risk (modified starch / pea starch — unspecified/modified-starch row)',
  mctUnlabeled: 'Methodology §5 Limited-risk (unlabeled MCT — source not named; opacity; not Avoid). Label says MCT / medium-chain triglycerides and does not name coconut on that token.',
  scs: 'Methodology §5 Limited-risk (sodium coco-sulfate — same irritant class as SLS; Limited, not High; locked Sept 21, 2026). Do not alias to SLS as High.',
  fulvic: 'Methodology §5 Limited-risk (fulvic acid as Other Ingredient — exact token; Limited, not High; locked Sept 21, 2026)',
  sorghum: 'Methodology §5 Limited-risk (sorghum powder — unspecified grain powder; distinct from named hull / rice-hull Cleared; locked Sept 21, 2026)',
  chlorella: 'Methodology §5 Limited-risk (chlorella powder — unspecified algae; distinct from REFUSED spirulina; locked Sept 21, 2026)',
  nfdm: 'Methodology §5 Limited-risk (non-fat dry milk — exact token; allergen disclosure, not High; locked Sept 21, 2026)',
  ojPowder: 'Methodology §5 Limited-risk (orange fruit juice powder as sweetener — Limited sugar; distinct from Cleared named juice-as-color; locked Sept 21, 2026)',
  srCaffeine: 'Methodology §5 Limited-risk (sustained-release caffeine as Other Ingredient — exact token; Limited, not High; locked Sept 21, 2026)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / cellulose capsule / vegetable polysaccharide capsule)',
  cellulose: 'Methodology §5 Cleared (cellulose / MCC / croscarmellose / cellulose gum family)',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose)',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC — HPMC family)',
  ethylcellulose: 'Methodology §5 Cleared (ethylcellulose — cellulose coating family)',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium laurate)',
  citric: 'Methodology §5 Cleared (citric acid / ascorbic acid / citrate salts as fillers/buffers)',
  malic: 'Methodology §5 Cleared (lactic / malic / tartaric — organic acids with citric)',
  kcl: 'Methodology §5 Cleared (potassium chloride — salt / electrolyte)',
  salt: 'Methodology §5 Cleared (sodium chloride / sodium bicarbonate)',
  gelatin: 'Methodology §5 Cleared (gelatin / beeswax / carnauba / purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified / distilled / deionized water)',
  lecithin: 'Methodology §5 Cleared (sunflower / soy / canola lecithin). Lecithin stays Cleared. Do not alias to Limited bare soy.',
  gum: 'Methodology §5 Cleared (xanthan / guar / acacia / pectin / gellan family)',
  alginate: 'Methodology §5 Cleared (sodium alginate / alginic family)',
  inulin: 'Methodology §5 Cleared (inulin / FOS / psyllium husk — fiber family)',
  sugar: 'Methodology §5 Cleared (cane sugar / glucose / tapioca syrup / dextrose). Organic cane sugar sits on this Cleared cane-sugar row, not Limited beet sugar.',
  oilFill: `Methodology §5 Cleared (named single oil as capsule/softgel/drop fill — not gummy High). ${OIL_FILL_TAP}`,
  monk: 'Methodology §5 Cleared (monk fruit / mogrosides / luo han, high-purity extract)',
  namedColor: 'Methodology §5 Cleared (named plant color — beet / fruit-or-vegetable juice as color). Riboflavin for color is the separate Cleared color row.',
  riboflavin: 'Methodology §5 Cleared (riboflavin used as color)',
  riceFood: 'Methodology §5 Cleared (rice protein / brown rice / ferment media — food-state; SiO2 cap does NOT apply)',
  riceHull: 'Methodology §5 Cleared (rice hull concentrate — plant-fiber flow agent; distinct from rice flour and SiO2)',
  tocopherols: 'Methodology §5 Cleared (mixed tocopherols / d-alpha-tocopherol as inactive — not tocopheryl acetate)',
  shellac: 'Methodology §5 Cleared (shellac / pharmaceutical glaze — exact alias; locked Sept 15 / Sept 20 2026 NOW #261 alias)',
  caCarbonate: 'Methodology §5 Cleared (calcium carbonate as Other Ingredient filler — mineral-filler Cleared; distinct from Ca as a labeled active; locked Sept 20, 2026 NOW #261 alias)',
  bicarb: 'Methodology §5 Cleared (Mg / K / ammonium / Na carbonate or bicarbonate — bicarb / mineral-filler; NOW exact-§5 token lock after #262)',
  pyridoxine: 'Methodology §5 Cleared (pyridoxine HCl — vitamin B6 as inactive; locked Sept 15, 2026)',
  pg10: 'Methodology §5 Cleared (polyglyceryl-10 laurate — exact INCI; distinct from polyglyceryl-3 diisostearate; locked Sept 21, 2026)',
  flaxFill: 'Methodology §5 Cleared (flax seed oil as fill/OI — named oil fill; not gummy High; not oil-bottle grade; locked Sept 21, 2026)',
  cocoaPowder: 'Methodology §5 Cleared (cocoa powder — exact token; distinct from cocoa seed butter and from extract; locked Sept 21, 2026)',
  phytosterols: 'Methodology §5 Cleared (phytosterols from soy, highly refined — distinct from Limited bare soy; lecithin stays Cleared; locked Sept 21, 2026)',
  taurine: 'Methodology §5 Cleared (taurine as Other Ingredient — exact token; locked Sept 21, 2026)',
  arginine: 'Methodology §5 Cleared (l-arginine as Other Ingredient — exact token; locked Sept 21, 2026)',
  nicotinamide: 'Methodology §5 Cleared (nicotinamide as Other Ingredient — B3 as inactive; locked Sept 21, 2026)',
  b12: 'Methodology §5 Cleared (cyanocobalamin as Other Ingredient — B12 as inactive; locked Sept 21, 2026)',
  carobPowder: 'Methodology §5 Cleared (carob powder / powder-as-food — exact token; Carob Extract stays Caution; locked Sept 21, 2026)',
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

type Compact = {
  id: string;
  productName: string;
  category: string;
  barcode?: string;
  formulaId: string;
  audience: typeof ADULT | typeof KIDS;
  minAge: number;
  form: string;
  productType: typeof VITAMIN | typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Vitamins: ['amazon-elements-vitamin-d3-5000-softgels', 'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).'],
      Digestive: ['megafood-magnesium-300-capsules', 'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).'],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    barcode: d.barcode,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} Current Vitacost / nowfoods.com / Amazon US exact pack. ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI+actives list holds. No DailyMed drug SPL (dietary supplement). Draft, not verified. No dosing or medical advice.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const COMPACT: Compact[] = [
  {
    id: 'now-prostate-health-clinical-strength-180',
    productName: 'Prostate Health, Clinical Strength, 180 Softgels',
    category: 'Vitamins',
    barcode: '733739033499',
    formulaId: 'now-prostate-health-clinical-strength-180',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D (as D3 Cholecalciferol)', strength: '10mcg' },
      { name: 'Zinc (from Zinc Bisglycinate)', strength: '15mg' },
      { name: 'Selenium (from Selenium Glycinate)', strength: '70mcg' },
      { name: 'Saw Palmetto Extract (Berry)', strength: '320mg' },
      { name: 'Phytosterols (Plant Sterols)', strength: '850mg' },
    ],
    flags: [
      ['Sunflower oil', 'cleared', 'oilFill'],
      ['Sunflower lecithin', 'cleared', 'lecithin'],
      ['Beeswax', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob', 'cleared', 'carobExtract'],
      ['Phytosterols from soy (highly refined)', 'cleared', 'phytosterols'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is plain carob (Carob Extract Caution). Phytosterols from soy (highly refined) are the Sept 21 Cleared stamp, distinct from Limited bare soy. Sunflower oil is named softgel fill, not gummy High. Sunflower lecithin stays Cleared lecithin. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Prostate Health, Clinical Strength, 180 Softgels (https://www.vitacost.com/products/now-foods-prostate-health-clinical-strength-180-softgels-23652) other-ingredients: Softgel capsule [bovine gelatin (bse-free), glycerin, water, carob], sunflower oil, sunflower lecithin and beeswax. Phytosterols from soy (highly refined). UPC-A 733739033499. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-prostate-health-90',
    productName: 'Prostate Health, 90 Softgels',
    category: 'Vitamins',
    barcode: '733739033482',
    formulaId: 'now-prostate-health-clinical-strength-180',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D-3 (as Cholecalciferol)', strength: '10mcg' },
      { name: 'Zinc (from Zinc Bisglycinate)', strength: '15mg' },
      { name: 'Selenium (from Selenium Glycinate)', strength: '70mcg' },
      { name: 'Saw Palmetto Extract (Berry)', strength: '320mg' },
      { name: 'Phytosterols (Plant Sterols)', strength: '850mg' },
    ],
    flags: [
      ['Sunflower oil', 'cleared', 'oilFill'],
      ['Sunflower lecithin', 'cleared', 'lecithin'],
      ['Beeswax', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob', 'cleared', 'carobExtract'],
      ['Phytosterols from soy (highly refined)', 'cleared', 'phytosterols'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same OI and matching actives as the 180-ct Clinical Strength. Driver is plain carob (Carob Extract Caution). Phytosterols from soy (highly refined) are the Sept 21 Cleared stamp. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Prostate Health, 90 Softgels (https://www.vitacost.com/products/now-foods-prostate-health-90-softgels-23651) other-ingredients: Softgel capsule [bovine gelatin (bse-free), glycerin, water, carob], sunflower oil, sunflower lecithin and beeswax. phytosterols from soy (highly refined). UPC-A 733739033482. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-eve-superior-womens-multi-180-softgels',
    productName: "EVE™, Superior Women's Multi, 180 Softgels",
    category: 'Vitamins',
    barcode: '733739038036',
    formulaId: 'now-eve-superior-womens-multi-180-softgels',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin A (100% as Beta-Carotene)', strength: '750mcg' },
      { name: 'Vitamin C (from Calcium Ascorbate)', strength: '200mg' },
      { name: 'Vitamin D (as Cholecalciferol)', strength: '25mcg' },
      { name: 'Vitamin E (as d-alpha Tocopherol)', strength: '100mg' },
    ],
    flags: [
      ['Flax seed oil', 'cleared', 'flaxFill'],
      ['Soy lecithin', 'cleared', 'lecithin'],
      ['Beeswax', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob', 'cleared', 'carobExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is plain carob (Carob Extract Caution), not carob powder. Flax seed oil is named softgel fill (Sept 21 Cleared), not an oil-bottle grade and not gummy High. Soy lecithin stays Cleared lecithin, not Limited bare soy. Vitamin A is 750 mcg on this 180-ct. The 90-ct is 1,500 mcg, so it does not share formulaId. Limited-only never Avoid. Avoid needs High.',
    cite: "Current Vitacost NOW Foods, EVE™, Superior Women's Multi, 180 Softgels (https://www.vitacost.com/products/now-foods-eve-superior-women-s-multi-180-softgels-23363) other-ingredients: Softgel capsule [bovine gelatin (BSE-free), glycerin, water, carob], flax seed oil, soy lecithin and beeswax. UPC-A 733739038036. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.",
  },
  {
    id: 'now-eve-superior-womens-multi-90-softgels',
    productName: "EVE™ Softgels, Superior Women's Multi, 90 Softgels",
    category: 'Vitamins',
    barcode: '733739038029',
    formulaId: 'now-eve-superior-womens-multi-90-softgels',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin A (100% as Beta-Carotene) (Betatene®)', strength: '1500mcg' },
      { name: 'Vitamin C (from Calcium Ascorbate)', strength: '200mg' },
      { name: 'Vitamin D (as Cholecalciferol)', strength: '25mcg' },
      { name: 'Vitamin E (as d-alpha Tocopherol)', strength: '100mg' },
    ],
    flags: [
      ['Flax seed oil', 'cleared', 'flaxFill'],
      ['Soy lecithin', 'cleared', 'lecithin'],
      ['Beeswax', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob', 'cleared', 'carobExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same shell OI as the 180-ct softgel. Driver is plain carob. Flax seed oil is named fill (Sept 21 Cleared). Soy lecithin stays Cleared. Vitamin A is 1,500 mcg (Betatene) on this 90-ct, so it does not share the 180-ct formulaId. Limited-only never Avoid. Avoid needs High.',
    cite: "Current Vitacost NOW Foods, EVE™ Softgels, Superior Women's Multi, 90 Softgels (https://www.vitacost.com/products/now-foods-eve-softgels-superior-women-s-multi-90-softgels-116600) other-ingredients: Softgel capsule [bovine gelatin (BSE-free), glycerin, water, carob], flax seed oil, soy lecithin and beeswax. UPC-A 733739038029. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.",
  },
  {
    id: 'now-same-400-mg-60',
    productName: 'SAMe , 400 mg, 60 Tablets',
    category: 'Vitamins',
    barcode: '733739001412',
    formulaId: 'now-same-400-mg-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [
      { name: 'SAMe (S-Adenosyl-L-Methionine)', strength: '400mg' },
    ],
    flags: [
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Pharmaceutical glaze / shellac', 'cleared', 'shellac'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Sodium alginate', 'cleared', 'alginate'],
      ['L-arginine', 'cleared', 'arginine'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide / silica (0-pt nanoparticle Caution cap). L-arginine is the Sept 21 Cleared Other Ingredient stamp. Pharmaceutical glaze is shellac Cleared. Sodium alginate is the locked alginic row. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, SAMe , 400 mg, 60 Tablets (https://www.vitacost.com/products/now-foods-same-400-mg-60-tablets-3345) other-ingredients: Microcrystalline cellulose, stearic acid (vegetable source), pharmaceutical glaze, magnesium stearate (vegetable source), silicon dioxide, glycerin, sodium alginate and l-arginine. UPC-A 733739001412. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-same-400-mg-30',
    productName: 'SAMe, 400 mg, 30 Tablets',
    category: 'Vitamins',
    barcode: '733739001399',
    formulaId: 'now-same-400-mg-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [
      { name: 'SAMe (S-Adenosyl-L-Methionine)', strength: '400mg' },
    ],
    flags: [
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Pharmaceutical glaze / shellac', 'cleared', 'shellac'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Sodium alginate', 'cleared', 'alginate'],
      ['L-arginine', 'cleared', 'arginine'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same OI and SAMe 400 mg active as the 60-ct. Driver is silicon dioxide. L-arginine is the Sept 21 Cleared stamp. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, SAMe, 400 mg, 30 Tablets (https://www.vitacost.com/products/now-foods-same-400-mg-30-tablets-809) other-ingredients: Microcrystalline cellulose, stearic acid (vegetable source), pharmaceutical glaze, magnesium stearate (vegetable source), silicon dioxide, glycerin, sodium alginate and l-arginine. UPC-A 733739001399. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-organic-chlorella-powder-1',
    productName: 'Certified Organic Chlorella, Pure Powder, 1 lb (454 g)',
    category: 'Vitamins',
    barcode: '733739026385',
    formulaId: 'now-organic-chlorella-powder-1',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Organic chlorella powder', strength: '3g' },
    ],
    flags: [
      ['Organic chlorella powder', 'limited', 'chlorella'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. The only ingredient is organic chlorella powder (Sept 21 Limited; unspecified algae). No separate excipient. "Not manufactured with wheat, soy…" is an absence line, not bare wheat or bare soy. Spirulina stays refused and is not this powder. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Certified Organic Chlorella, Pure Powder, 1 lb (454 g) (https://www.vitacost.com/products/now-foods-certified-organic-chlorella-pure-powder-1-lb-454-g-514) ingredients: Organic chlorella powder. UPC-A 733739026385. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-organic-chlorella-powder-4',
    productName: 'Certified Organic Chlorella Pure Powder, 4 oz (113 g)',
    category: 'Vitamins',
    barcode: '733739026361',
    formulaId: 'now-organic-chlorella-powder-1',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Organic chlorella powder', strength: '3g' },
    ],
    flags: [
      ['Organic chlorella powder', 'limited', 'chlorella'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same single ingredient as the 1 lb powder. Organic chlorella powder is the Sept 21 Limited stamp. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Certified Organic Chlorella Pure Powder, 4 oz (113 g) (https://www.vitacost.com/products/now-foods-certified-organic-chlorella-pure-powder-4-oz-113-g-40174) ingredients: Organic chlorella powder. UPC-A 733739026361. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-omega-3-6-9-250',
    productName: 'Omega 3-6-9, 250 Softgels',
    category: 'Vitamins',
    barcode: '733739018373',
    formulaId: 'now-omega-3-6-9-250',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Flax Seed Oil (cold-pressed, organic)', strength: '1400mg' },
      { name: 'Evening Primrose Oil (cold-pressed) (seed)', strength: '300mg' },
      { name: 'Canola Oil (cold-pressed, non-GMO) (seed)', strength: '260mg' },
      { name: 'Black Currant Oil (cold-pressed) (seed)', strength: '20mg' },
      { name: 'Pumpkin Seed Oil (cold-pressed)', strength: '20mg' },
    ],
    flags: [
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob powder', 'cleared', 'carobPowder'],
      ['Caramel color', 'high', 'caramel'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is caramel color, undisclosed class (treated as Class III/IV). Carob powder is the Sept 21 Cleared powder-as-food stamp, distinct from plain Carob / Carob Extract Caution. Flax seed oil 1,400 mg is a Supplement Facts active on this blend, not an extra inactive and not an oil-bottle grade. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Omega 3-6-9, 250 Softgels (https://www.vitacost.com/products/now-foods-omega-3-6-9-250-softgels-723) other-ingredients: Softgel capsule (bovine gelatin, water, glycerin, caramel color, carob powder). UPC-A 733739018373. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-omega-3-6-9-100',
    productName: 'Omega 3-6-9, 100 Softgel',
    category: 'Vitamins',
    barcode: '733739018359',
    formulaId: 'now-omega-3-6-9-250',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Flax Seed Oil', strength: 'label serving' },
      { name: 'Evening Primrose Oil', strength: 'label serving' },
      { name: 'Canola Oil', strength: 'label serving' },
    ],
    flags: [
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob powder', 'cleared', 'carobPowder'],
      ['Caramel color', 'high', 'caramel'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same shell as the 250-ct. Driver is undisclosed caramel color. Carob powder is the Sept 21 Cleared stamp. Flax seed oil stays a labeled active of the oil blend, not an oil-bottle grade. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Omega 3-6-9, 100 Softgel (https://www.vitacost.com/products/now-foods-omega-3-6-9-100-softgel-116599) other-ingredients: Softgel capsule (bovine gelatin, glycerin, water, caramel color, carob powder). UPC-A 733739018359. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-turkey-tail-500-mg-90',
    productName: 'Turkey Tail, 500 mg, 90 Veg Capsules',
    category: 'Vitamins',
    barcode: '733739047946',
    formulaId: 'now-turkey-tail-500-mg-90',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Organic Turkey Tail (Trametes versicolor)', strength: '1000mg' },
    ],
    flags: [
      ['Organic inulin powder', 'cleared', 'inulin'],
      ['Vegetable polysaccharide (capsule)', 'cleared', 'hpmc'],
      ['Organic sorghum powder', 'limited', 'sorghum'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is organic sorghum powder (Sept 21 Limited; unspecified grain powder, not a named hull). Vegetable polysaccharide capsule is the locked HPMC row. Inulin is Cleared fiber. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Turkey Tail, 500 mg, 90 Veg Capsules (https://www.vitacost.com/products/now-foods-turkey-tail-500-mg-90-veg-capsules-129572) other-ingredients: Organic inulin powder, vegetable polysaccharide (capsule) and organic sorghum powder. UPC-A 733739047946. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-kid-cal-orange-100',
    productName: 'Kid Cal, Orange, 100 Chewables',
    category: 'Vitamins',
    barcode: '733739012333',
    formulaId: 'now-kid-cal-orange-100',
    audience: KIDS,
    minAge: 2,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D (as Ergocalciferol)', strength: '2.5mcg' },
      { name: 'Calcium (from Calcium Citrate)', strength: '100mg' },
      { name: 'Magnesium (from Magnesium Citrate)', strength: '50mg' },
    ],
    flags: [
      ['Xylitol / erythritol', 'limited', 'xylitol'],
      ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
      ['Natural orange fruit juice powder', 'limited', 'ojPowder'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Coconut oil powder', 'cleared', 'oilFill'],
      ['Xanthan gum', 'cleared', 'gum'],
      ['Citric acid', 'cleared', 'citric'],
      ['Natural flavors', 'limited', 'flavors'],
      ['Stevia leaf extract', 'cleared', 'steviaLeaf'],
      ['Silicon dioxide', 'cleared', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide (0-pt cap), stevia leaf, oral xylitol, natural flavors, and natural orange fruit juice powder (Sept 21 Limited sweetener, not juice-as-color). Suggested use says children age 2 and up. "Contains soy" is allergen copy; the ingredient list does not print bare soy, so bare soy is not flagged. Coconut oil powder is named oil on a chew, not gummy High. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Kid Cal, Orange, 100 Chewables (https://www.vitacost.com/products/now-foods-kid-cal-orange-100-chewables-7256) other-ingredients: Xylitol, hydroxypropyl cellulose, natural orange fruit juice powder, stearic acid (vegetable source), microcrystalline cellulose, coconut oil powder, xanthan gum, citric acid, natural flavors, organic stevia leaf extract (enzyme-modified steviol glycosides) and silicon dioxide. Contains soy and coconut oil powder. UPC-A 733739012333. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-kids-kid-vits-juicy-orange-60',
    productName: 'Kids, Kid Vits™, Juicy Orange, 60 Chewable Tablets',
    category: 'Vitamins',
    barcode: '733739038845',
    formulaId: 'now-kids-kid-vits-juicy-orange-60',
    audience: KIDS,
    minAge: 4,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin A (100% as Beta-Carotene)', strength: '540mcg' },
      { name: 'Vitamin C (from Sodium Ascorbate)', strength: '60mg' },
      { name: 'Vitamin D (as Ergocalciferol)', strength: '10mcg' },
      { name: 'Vitamin E (as d-alpha Tocopherol)', strength: '10mg' },
    ],
    flags: [
      ['Cane sugar', 'cleared', 'sugar'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Sugar alcohol', 'limited', 'sugarAlcohol'],
      ['Natural orange fruit juice powder', 'limited', 'ojPowder'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Malic acid', 'cleared', 'malic'],
      ['Natural flavors', 'limited', 'flavors'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Modified starch / pea starch', 'limited', 'modStarch'],
      ['Acacia / gum arabic', 'cleared', 'gum'],
      ['Alginate', 'cleared', 'alginate'],
      ['Rice hull concentrate', 'cleared', 'riceHull'],
      ['Citric acid', 'cleared', 'citric'],
      ['Stevia leaf extract', 'cleared', 'steviaLeaf'],
      ['Ethylcellulose', 'cleared', 'ethylcellulose'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Mixed tocopherols / d-alpha tocopherol', 'cleared', 'tocopherols'],
      ['MCT (unlabeled source)', 'limited', 'mctUnlabeled'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide plus Limited maltodextrin, sorbitol, flavors, unlabeled MCT, modified starch, and natural orange fruit juice powder (Sept 21 Limited sweetener). The rest of this chew matches the already-written Kid Vits Berry Lemonade / Grape Splash excipient map (modified tapioca starch + pea starch, bare alginate, rice hull concentrate, stevia leaf extract (rebaudioside a)). Own formulaId because this count adds orange fruit juice powder and omits rosemary extract. Suggested use: children ages 4 and up. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Kids, Kid Vits™, Juicy Orange, 60 Chewable Tablets (https://www.vitacost.com/products/now-foods-kids-kid-vits-juicy-orange-60-chewable-tablets-146936) other-ingredients: Organic cane sugar, microcrystalline cellulose, sorbitol, natural orange fruit juice powder, stearic acid (vegetable source), l-malic acid, natural flavors, maltodextrin (non-gmo), silicon dioxide, modified tapioca starch, gum acacia, alginate, rice hull concentrate, pea starch, citric acid, stevia leaf extract (rebaudioside a), ethyl cellulose, glycerin, hypromellose, mixed tocopherols (sunflower) and medium-chain triglycerides. UPC-A 733739038845. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-liquid-multi-xylitol-tropical-orange-16',
    productName: 'Liquid Multi with Xylitol, Iron-Free, Tropical Orange, 16 fl oz (473 ml)',
    category: 'Vitamins',
    barcode: '733739037725',
    formulaId: 'now-liquid-multi-xylitol-tropical-orange-16',
    audience: ADULT,
    minAge: 18,
    form: 'liquid',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin C (as Ascorbic Acid)', strength: '250mg' },
      { name: 'Vitamin D (as Ergocalciferol)', strength: '10mcg' },
      { name: 'Vitamin E (from d-alpha Tocopheryl Acetate)', strength: '67mg' },
    ],
    flags: [
      ['Water', 'cleared', 'water'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Xylitol / erythritol', 'limited', 'xylitol'],
      ['Natural flavors', 'limited', 'flavors'],
      ['Sunflower lecithin', 'cleared', 'lecithin'],
      ['Citric acid', 'cleared', 'citric'],
      ['Orange fruit juice powder', 'limited', 'ojPowder'],
      ['Malic acid', 'cleared', 'malic'],
      ['Potassium chloride', 'cleared', 'kcl'],
      ['Xanthan gum', 'cleared', 'gum'],
      ['Potassium sorbate / benzoate', 'limited', 'benzoate'],
      ['Brown rice protein', 'cleared', 'riceFood'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are oral xylitol, natural flavors, potassium sorbate, and orange fruit juice powder (Sept 21 Limited sweetener). Brown rice protein is named in the ingredients narrative as the stabilizing agent (Cleared rice protein). "Vitamin E from non-GMO soy" is the active source note, not Limited bare soy. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Liquid Multi with Xylitol, Iron-Free, Tropical Orange, 16 fl oz (473 ml) (https://www.vitacost.com/products/now-foods-liquid-multi-with-xylitol-iron-free-tropical-orange-16-fl-oz-473-ml-4349) other-ingredients: De-ionized water, vegetable glycerin, xylitol, natural flavors, sunflower lecithin, citric acid, orange fruit juice powder, l-malic acid, potassium chloride, xanthan gum and potassium sorbate (as preservative). Vitamin E from non-GMO soy. Brown rice protein as a stabilizing agent. UPC-A 733739037725. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-chewable-vitamin-c-500-orange-100',
    productName: 'Chewable Vitamin C-500, Orange, 100 Tablets',
    category: 'Vitamins',
    barcode: '733739006301',
    formulaId: 'now-chewable-vitamin-c-500-orange-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin C (as Sodium Ascorbate and as Ascorbic Acid)', strength: '500mg' },
    ],
    flags: [
      ['Cane sugar', 'cleared', 'sugar'],
      ['Sugar alcohol', 'limited', 'sugarAlcohol'],
      ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
      ['Xylitol / erythritol', 'limited', 'xylitol'],
      ['Natural orange fruit juice powder', 'limited', 'ojPowder'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Natural flavors', 'limited', 'flavors'],
      ['Stevia leaf extract', 'cleared', 'steviaLeaf'],
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide, stevia leaf, sorbitol, xylitol, natural flavors, and natural orange fruit juice powder (Sept 21 Limited sweetener). Organic cane sugar is Cleared cane sugar, not Limited beet sugar. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Chewable Vitamin C-500, Orange, 100 Tablets (https://www.vitacost.com/products/now-foods-chewable-vitamin-c-500-orange-100-tablets-7946) other-ingredients: Organic cane sugar, sorbitol, hydroxypropyl cellulose, xylitol, natural orange fruit juice powder, stearic acid (vegetable source), natural flavors, organic stevia leaf extract (enzyme-modified steviol glycosides), hypromellose (cellulose), magnesium stearate (vegetable source) and silicon dioxide. UPC-A 733739006301. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-colloidal-minerals-32',
    productName: 'Colloidal Minerals, 32 fl oz (946 ml)',
    category: 'Vitamins',
    barcode: '733739014054',
    formulaId: 'now-colloidal-minerals-32',
    audience: ADULT,
    minAge: 18,
    form: 'liquid',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Liquid Colloidal Minerals Blend', strength: '30ml' },
    ],
    flags: [
      ['Water', 'cleared', 'water'],
      ['Fulvic acid', 'limited', 'fulvic'],
      ['Citric acid', 'cleared', 'citric'],
      ['Potassium sorbate / benzoate', 'limited', 'benzoate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is fulvic acid as Other Ingredient (Sept 21 Limited) plus potassium sorbate and potassium benzoate (existing Limited preservative row). Citric acid is Cleared. The raspberry sibling stays refused on still-unknown `stevia extract (leaf)`. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Colloidal Minerals, 32 fl oz (946 ml) (https://www.vitacost.com/products/now-foods-colloidal-minerals-32-fl-oz-946-ml-501) other-ingredients: Purified water, fulvic acid, citric acid, potassium sorbate (as preservative) and potassium benzoate (as preservative). UPC-A 733739014054. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-effer-hydrate-lemon-lime-10',
    productName: 'Sports, Effer-Hydrate, Lemon Lime, 10 Tablets, 1.8 oz (51 g)',
    category: 'Vitamins',
    barcode: '733739022417',
    formulaId: 'now-effer-hydrate-lemon-lime-10',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Calcium', strength: '13mg' },
      { name: 'Potassium', strength: '100mg' },
      { name: 'Magnesium', strength: '25mg' },
    ],
    flags: [
      ['Citric acid', 'cleared', 'citric'],
      ['Sodium bicarbonate', 'cleared', 'salt'],
      ['Cane sugar', 'cleared', 'sugar'],
      ['Potassium bicarbonate', 'cleared', 'bicarb'],
      ['Natural flavors', 'limited', 'flavors'],
      ['Magnesium carbonate (OI mineral filler)', 'cleared', 'bicarb'],
      ['Taurine', 'cleared', 'taurine'],
      ['Stevia leaf extract', 'cleared', 'steviaLeaf'],
      ['Beta-carotene (for color)', 'cleared', 'betaCarotene'],
      ['Calcium carbonate (OI mineral filler)', 'cleared', 'caCarbonate'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are natural flavor, maltodextrin, stevia leaf extract (rebaudioside a) on the existing Caution row, and beta-carotene color Caution. Taurine is the Sept 21 Cleared Other Ingredient stamp. Cane sugar is Cleared cane sugar, not beet sugar. Potassium bicarbonate and magnesium carbonate are the locked bicarb row. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Sports, Effer-Hydrate, Lemon Lime, 10 Tablets, 1.8 oz (51 g) (https://www.vitacost.com/products/now-foods-sports-effer-hydrate-lemon-lime-10-tablets-1-8-oz-51-g-98689) other-ingredients: Citric acid, sodium bicarbonate, cane sugar, potassium bicarbonate, natural flavor, magnesium carbonate, taurine, stevia leaf extract (rebaudioside a), beta-carotene (for color), calcium carbonate, maltodextrin. UPC-A 733739022417. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-effer-hydrate-orange-strawberry-10',
    productName: 'Sports, Effer-Hydrate Effervescent, Orange Strawberry, 10 Tablets, 1.8 oz (51 g)',
    category: 'Vitamins',
    barcode: '733739022431',
    formulaId: 'now-effer-hydrate-orange-strawberry-10',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Calcium', strength: '13mg' },
      { name: 'Potassium', strength: '100mg' },
      { name: 'Magnesium', strength: '25mg' },
    ],
    flags: [
      ['Citric acid', 'cleared', 'citric'],
      ['Sodium bicarbonate', 'cleared', 'salt'],
      ['Cane sugar', 'cleared', 'sugar'],
      ['Potassium bicarbonate', 'cleared', 'bicarb'],
      ['Natural flavors', 'limited', 'flavors'],
      ['Magnesium carbonate (OI mineral filler)', 'cleared', 'bicarb'],
      ['Taurine', 'cleared', 'taurine'],
      ['Stevia leaf extract', 'cleared', 'steviaLeaf'],
      ['Calcium carbonate (OI mineral filler)', 'cleared', 'caCarbonate'],
      ['Beet powder (color)', 'cleared', 'namedColor'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Riboflavin (for color)', 'cleared', 'riboflavin'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Own formula versus lemon-lime: beet powder for color and riboflavin for color, no beta-carotene. Taurine is the Sept 21 Cleared stamp. Drivers remain natural flavor, maltodextrin, and stevia leaf. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Sports, Effer-Hydrate Effervescent, Orange Strawberry, 10 Tablets, 1.8 oz (51 g) (https://www.vitacost.com/products/now-foods-sports-effer-hydrate-effervescent-orange-strawberry-10-tablets-1-8-oz-51-g-98691) other-ingredients: Citric acid, sodium bicarbonate, cane sugar, potassium bicarbonate, natural flavor, magnesium carbonate, taurine, stevia leaf extract (rebaudioside a), calcium carbonate, beet powder (for color), maltodextrin, riboflavin (for color). UPC-A 733739022431. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-effer-energy-tropical-punch-10',
    productName: 'Sports, Effer-Energy Effervescent, Tropical Punch, 10 Tablets, 1.83 oz (52 g)',
    category: 'Vitamins',
    barcode: '733739022486',
    formulaId: 'now-effer-energy-tropical-punch-10',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Niacin', strength: '20mg' },
      { name: 'Vitamin B6', strength: '2mg' },
      { name: 'Vitamin B12 (as Cyanocobalamin)', strength: '6mcg' },
      { name: 'Magnesium', strength: '25mg' },
    ],
    flags: [
      ['Citric acid', 'cleared', 'citric'],
      ['Sodium bicarbonate', 'cleared', 'salt'],
      ['Cane sugar', 'cleared', 'sugar'],
      ['Potassium bicarbonate', 'cleared', 'bicarb'],
      ['Natural flavors', 'limited', 'flavors'],
      ['Green tea extract (leaf)', 'cleared', 'greenTea'],
      ['Magnesium carbonate (OI mineral filler)', 'cleared', 'bicarb'],
      ['Taurine', 'cleared', 'taurine'],
      ['Stevia leaf extract', 'cleared', 'steviaLeaf'],
      ['Calcium carbonate (OI mineral filler)', 'cleared', 'caCarbonate'],
      ['Beta-carotene (for color)', 'cleared', 'betaCarotene'],
      ['Nicotinamide (niacin)', 'cleared', 'nicotinamide'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Cyanocobalamin (vitamin B12)', 'cleared', 'b12'],
      ['Pyridoxine HCl (vitamin B6)', 'cleared', 'pyridoxine'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are natural flavor, maltodextrin, stevia leaf, green tea extract (leaf) Caution, and beta-carotene color. Taurine, nicotinamide (niacin), and cyanocobalamin (vitamin B12) are Sept 21 Cleared Other Ingredient stamps. Pyridoxine HCl is the locked B6-as-inactive Cleared row. Nutrition Facts also lists niacin, B6, and B12 as labeled amounts; the Ingredients line prints them as inactives, so they are flagged here. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Sports, Effer-Energy Effervescent, Tropical Punch, 10 Tablets, 1.83 oz (52 g) (https://www.vitacost.com/products/now-foods-sports-effer-energy-effervescent-tropical-punch-10-tablets-1-83-oz-52-g-98692) other-ingredients: Citric acid, sodium bicarbonate, cane sugar, potassium bicarbonate, natural flavor, green tea extract (leaf), magnesium carbonate, taurine, stevia leaf extract (rebaudioside a), calcium carbonate, beta-carotene (for color), nicotinamide (niacin), maltodextrin, cyanocobalamin (vitamin b12), pyridoxine hcl (vitamin b6). UPC-A 733739022486. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-sustained-energy-90',
    productName: 'Sustained Energy, 90 Veg Capsules',
    category: 'Vitamins',
    barcode: '733739019950',
    formulaId: 'now-sustained-energy-90',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Total Caffeine (from 100 mg Xtenergy Sustained Release Caffeine Complex and 60 mg Caffeine Powder)', strength: '120mg' },
      { name: 'Taurine (Free-Form)', strength: '250mg' },
      { name: 'L-Tyrosine (Free-Form)', strength: '250mg' },
      { name: 'L-Carnitine (Carnipure®)', strength: '250mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Pharmaceutical glaze / shellac', 'cleared', 'shellac'],
      ['Sustained-release caffeine', 'limited', 'srCaffeine'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide, maltodextrin, and sustained-release caffeine (Sept 21 Limited Other Ingredient). The Ingredients block states about 120 mg immediate and sustained release caffeine per serving. Supplement Facts lists that same 120 mg as Total Caffeine (100 mg Xtenergy sustained-release complex + 60 mg caffeine powder), an active. Taurine on this SKU is a labeled active, not an inactive, so it is not flagged on the Cleared taurine OI row. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Sustained Energy, 90 Veg Capsules (https://www.vitacost.com/products/now-foods-sustained-energy-90-veg-capsules-131361) other-ingredients: Hypromellose (cellulose capsule), stearic acid (vegetable source), silicon dioxide, maltodextrin (non-gmo), microcrystalline cellulose, pharmaceutical glaze and hypromellose. This product has approx. 120 mg of immediate and sustained release caffeine per serving. UPC-A 733739019950. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-e-sport-reaction-chocolate-1',
    productName: 'Sports, E-Sport Reaction, Chocolate Milkshake, 1 lb (454 g)',
    category: 'Vitamins',
    barcode: '733739019103',
    formulaId: 'now-e-sport-reaction-chocolate-1',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Lutein (from Marigold Flowers Extract Complex)', strength: '10mg' },
      { name: 'Zeaxanthin (from Marigold Flowers Extract Complex)', strength: '600mcg' },
      { name: 'Total Caffeine (from 85 mg Xtenergy Sustained Release Caffeine Complex and 50 mg Caffeine Powder)', strength: '100mg' },
    ],
    flags: [
      ['Organic non-fat dry milk powder', 'limited', 'nfdm'],
      ['Organic erythritol', 'limited', 'xylitol'],
      ['Organic cocoa powder', 'cleared', 'cocoaPowder'],
      ['Organic beet sugar', 'limited', 'beetSugar'],
      ['Sea salt', 'cleared', 'salt'],
      ['Organic gum acacia', 'cleared', 'gum'],
      ['Guar gum', 'cleared', 'gum'],
      ['Organic monk fruit extract', 'cleared', 'monk'],
      ['Organic milk chocolate flavor', 'limited', 'flavors'],
      ['Sucrose', 'limited', 'sucrose'],
      ['Modified food starch (non-GMO)', 'limited', 'modStarch'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Organic vanilla flavor', 'limited', 'flavors'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Cellulose', 'cleared', 'cellulose'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Pharmaceutical glaze / shellac', 'cleared', 'shellac'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are non-fat dry milk (Sept 21 Limited), oral erythritol, beet sugar, sucrose, flavors, modified food starch, maltodextrin, and silicon dioxide. Organic cocoa powder is the Sept 21 Cleared powder stamp, distinct from cocoa butter and from extract. Total Caffeine, including the Xtenergy sustained-release complex, is a Supplement Facts active on this powder, not an Other Ingredient line, so it is not also flagged as the OI stamp. Not a protein-aisle whey or pea protein. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Sports, E-Sport Reaction, Chocolate Milkshake, 1 lb (454 g) (https://www.vitacost.com/products/now-foods-sports-e-sport-reaction-chocolate-milkshake-1-lb-454-g-144962) other-ingredients: Organic non-fat dry milk powder, organic erythritol, organic cocoa powder, organic beet sugar, sea salt, organic gum acacia, guar gum, organic monk fruit extract, organic milk chocolate flavor, sucrose, modified food starch (non-gmo), stearic acid (vegetable source), organic vanilla flavor, maltodextrin (non-gmo), cellulose, silicon dioxide and pharmaceutical glaze. Contains milk. UPC-A 733739019103. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-organic-hot-cocoa-14',
    productName: 'Organic Hot Cocoa, 14 oz (397 g)',
    category: 'Vitamins',
    barcode: '733739066718',
    formulaId: 'now-organic-hot-cocoa-14',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Organic cocoa powder', strength: 'label serving' },
    ],
    flags: [
      ['Cane sugar', 'cleared', 'sugar'],
      ['Organic non-fat dry milk powder', 'limited', 'nfdm'],
      ['Organic cocoa powder', 'cleared', 'cocoaPowder'],
      ['Organic vanilla flavor', 'limited', 'flavors'],
      ['Sea salt', 'cleared', 'salt'],
      ['Organic gum acacia', 'cleared', 'gum'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is organic non-fat dry milk (Sept 21 Limited) plus organic vanilla flavor. Organic cocoa powder is the Sept 21 Cleared powder stamp. Organic cane sugar is Cleared cane sugar. This title is Organic Hot Cocoa, not the Real Food Slender Hot Cocoa food-scope SKU. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Organic Hot Cocoa, 14 oz (397 g) (https://www.vitacost.com/products/now-foods-organic-hot-cocoa-14-oz-397-g-120087) ingredients: Organic cane sugar, organic non-fat dry milk powder, organic cocoa powder, organic vanilla flavor, sea salt, organic gum acacia. UPC-A 733739066718. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-saw-palmetto-extract-160-mg-240',
    productName: 'Saw Palmetto Extract, 160 mg, 240 Softgels',
    category: 'Vitamins',
    barcode: '733739047441',
    formulaId: 'now-saw-palmetto-extract-160-mg-120',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Saw Palmetto Berry Extract (Serenoa repens)', strength: '160mg' },
    ],
    flags: [
      ['Extra virgin olive oil', 'cleared', 'oilFill'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Caramel color', 'high', 'caramel'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is caramel color, undisclosed class. Same shell and 160 mg berry extract as batch71 now-saw-palmetto-extract-160-mg-120, so this count reuses that formulaId. The words wheat and soy appear only in "No manufactured with yeast, wheat, gluten, soy…". That is an absence line, not Limited bare wheat or bare soy, so those stamps are not flagged. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Saw Palmetto Extract, 160 mg, 240 Softgels (https://www.vitacost.com/products/now-foods-saw-palmetto-extract-160-mg-240-softgels-801) other-ingredients: Softgel capsule [bovine gelatin (BSE-free), glycerin, water, caramel color] and organic extra virgin olive oil. UPC-A 733739047441. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
];

export const BATCH74_KYR6_NOW_TOKEN_STAMP_BACKFILL: RatingRecord[] = COMPACT.map(expand);

export const BATCH74_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'N=705 — every Search row already written in batch71-kyr6-amazon-3p-now.ts',
    reason: 'SKIPPED already-written batch71 (do not duplicate / do not restage)',
  },
  {
    sku: 'N=111 — every Search row already written in batch72-kyr6-now-refuse-backfill.ts',
    reason: 'SKIPPED already-written batch72 (do not duplicate / do not restage)',
  },
  {
    sku: 'N=27 — every Search row already written in batch73-kyr6-now-exact-s5-backfill.ts',
    reason: 'SKIPPED already-written batch73 (do not duplicate / do not restage)',
  },
  {
    sku: 'NOW Foods, Certified Organic Flax Seed Oil, 12 fl oz (355 ml)',
    reason: 'SKIPPED oil pour hunt-list only. Named bottle is not the Cleared flax-seed-oil fill row and is not Search-graded. https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-12-fl-oz-355-ml-1135',
  },
  {
    sku: 'NOW Foods, Certified Organic Flax Seed Oil, 24 fl oz (710 ml)',
    reason: 'SKIPPED oil pour hunt-list only. Named bottle is not the Cleared flax-seed-oil fill row and is not Search-graded. https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-24-fl-oz-710-ml-13178',
  },
  {
    sku: 'batch73 still-unknowns (chewable corn oil, cinnamon bark oil, liposomal fatty acids from rice bran, missing 15-cap D3 pin)',
    reason: 'SKIPPED not restaged. Those strings are still unknown and are not this Sept 21 stamp list.',
  },
  {
    sku: 'NOW Foods, Solutions XyliWhite toothpastes (Refreshmint and the other Solutions gels)',
    reason: 'SKIPPED cosmetics / Solutions scope from batch71. Not reopened for sodium coco-sulfate.',
  },
];

export const BATCH74_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'NOW Foods, Certified Organic Spirulina Powder, 1 lb (454 g)',
    reason: 'REFUSED spirulina powder. Founder 2026-09-21: stay REFUSED. No §5 row. No Search row. UPC-A 733739027146. Exact token: Organic spirulina powder.',
  },
  {
    sku: 'NOW Foods, Certified Organic Spirulina Powder, 4 oz (113 g)',
    reason: 'REFUSED spirulina powder. Founder 2026-09-21: stay REFUSED. No §5 row. No Search row. UPC-A 733739026903. Exact token: Organic spirulina powder.',
  },
  {
    sku: "NOW Foods, EVE™, Superior Women's Multi, 180 Tablets",
    reason: 'REFUSED spirulina extract inside the vegetarian coating. Other coat tokens map. Spirulina extract stays refused. No Search row. UPC-A 733739037978. Exact token: spirulina extract.',
  },
  {
    sku: "NOW Foods, Eve™ Tablets, Superior Women's Multi, 90 Tablets",
    reason: 'REFUSED spirulina extract inside the vegetarian coating. Other coat tokens map. Spirulina extract stays refused. No Search row. UPC-A 733739037961. Exact token: spirulina extract.',
  },
  {
    sku: 'NOW Foods, XyliWhite™ Toothpaste Gel, Cinnafresh, 6.4 oz (181 g)',
    reason: 'REFUSED sodium coco-sulfate maps (Limited), and these exact strings are still unknown: hydrated silica; papain; cinnamon (cinnamomum cassia) leaf oil. No Search row. UPC-A 733739080929.',
  },
  {
    sku: "NOW Foods, XyliWhite, Kid's Toothpaste Gel, Strawberry Splash, 3 oz (85 g)",
    reason: 'REFUSED sodium coco-sulfate maps (Limited), and these exact strings are still unknown: hydrated silica; xylitol (25%)*; stevia rebaudiana extract. No Search row. UPC-A 733739080974.',
  },
  {
    sku: "NOW Foods, Xyli-White™, Kid's Toothpaste Gel, Bubblegum Splash, 3 oz (85 g)",
    reason: 'REFUSED sodium coco-sulfate maps (Limited), and these exact strings are still unknown: hydrated silica; xylitol (25%) *; stevia rebaudiana extract. No Search row. UPC-A 733739080882.',
  },
  {
    sku: "NOW Foods, Xyli-White™, Kids Toothpaste Gel, Orange Splash, 3 oz (85 g)",
    reason: 'REFUSED sodium coco-sulfate maps (Limited), and these exact strings are still unknown: hydrated silica; xylitol (25%)*; natural favor; stevia rebaudiana extract. No Search row. UPC-A 733739080899.',
  },
  {
    sku: 'NOW Foods, Colloidal Minerals, Raspberry, 32 fl oz (946 ml)',
    reason: 'REFUSED fulvic acid maps (Limited), and this exact string is still unknown: stevia extract (leaf). No Search row. UPC-A 733739014061.',
  },
];

export const BATCH74_OIL_HUNT: { name: string; url: string }[] = [
  {
    name: 'NOW Foods, Certified Organic Flax Seed Oil, 12 fl oz (355 ml)',
    url: 'https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-12-fl-oz-355-ml-1135',
  },
  {
    name: 'NOW Foods, Certified Organic Flax Seed Oil, 24 fl oz (710 ml)',
    url: 'https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-24-fl-oz-710-ml-13178',
  },
];

const STAMP =
  /chlorella powder|sorghum powder|fulvic acid|orange fruit juice powder|non-fat dry milk|cocoa powder|flax seed oil|phytosterols from soy|l-arginine|taurine|nicotinamide|cyanocobalamin|carob powder|sustained-release caffeine/i;

const _ROWS = BATCH74_KYR6_NOW_TOKEN_STAMP_BACKFILL;
if (_ROWS.length !== 23) throw new Error('batch74 tally drift: expected 23 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch74 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 20) {
  throw new Error('batch74 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 3) {
  throw new Error('batch74 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch74 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch74 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch74 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) {
  throw new Error('batch74 writes NOW only');
}
if (_ROWS.some((r) => r.barcode && !/^733739\d{6}$/.test(r.barcode))) {
  throw new Error('batch74 invented or non-NOW UPC');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 5) {
  throw new Error('batch74 REUSE-formula tally drift');
}
if (!BATCH74_SKIPPED.some((s) => /already-written batch71/i.test(s.reason))) {
  throw new Error('batch74 must skip already-written batch71');
}
if (!BATCH74_SKIPPED.some((s) => /already-written batch72/i.test(s.reason))) {
  throw new Error('batch74 must skip already-written batch72');
}
if (!BATCH74_SKIPPED.some((s) => /already-written batch73/i.test(s.reason))) {
  throw new Error('batch74 must skip already-written batch73');
}
if (_ROWS.some((r) => r.id !== 'now-saw-palmetto-extract-160-mg-240' && !r.inactiveIngredients.some((i) => STAMP.test(i.name)))) {
  throw new Error('batch74 every new stamp row needs a founder-stamped token');
}
if (_ROWS.some((r) => r.inactiveIngredients.some((i) => /spirulina/i.test(i.name)))) {
  throw new Error('batch74 must not write spirulina');
}
const _saw = _ROWS.find((r) => r.id === 'now-saw-palmetto-extract-160-mg-240');
if (!_saw || _saw.formulaId !== 'now-saw-palmetto-extract-160-mg-120') {
  throw new Error('batch74 saw 240 must reuse the batch71 120 formula');
}
if (_saw.inactiveIngredients.some((i) => /\b(soy|wheat)\b/i.test(i.name))) {
  throw new Error('batch74 saw 240 absence line is not bare soy or wheat');
}
if (!BATCH74_REFUSED.some((s) => /spirulina/i.test(s.reason))) {
  throw new Error('batch74 must keep spirulina refused');
}
if (!BATCH74_REFUSED.some((s) => /sodium coco-sulfate/i.test(s.reason))) {
  throw new Error('batch74 must keep SCS-plus-unknown toothpastes refused');
}
if (!BATCH74_REFUSED.some((s) => /stevia extract \(leaf\)/i.test(s.reason))) {
  throw new Error('batch74 must list still-unknown stevia extract (leaf)');
}
if (BATCH74_OIL_HUNT.length !== 2) {
  throw new Error('batch74 flax pour bottles stay on the hunt list');
}
if (_ROWS.some((r) => /essential oils?,/i.test(r.productName))) {
  throw new Error('batch74 must not grade EO pour bottles');
}
if (_ROWS.some((r) => /nutricost|naturewise|welmate|a\+health|healtha2z|time-cap|goodsense|sprouts/i.test(r.brand + r.productName))) {
  throw new Error('batch74 leftover 3P / Sprouts must stay out');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch74 Avoid without High on ${record.id}`);
  }
}
