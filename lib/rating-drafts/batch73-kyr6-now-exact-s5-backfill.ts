// DRAFT / not verified / batch 73 KYR6 NOW exact-§5 BACKFILL /
// Methodology v1.6 + current main §5 exact. Additive / “also
// appears as” / locked exact-INCI rows only. No invented grades.
// No cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. NOW exact-§5 BACKFILL only. Write ONLY NOW SKUs
// that failed ONLY on the PROJECT_NOTES WRITE list after #262.
// US Amazon + nowfoods.com / vitamins / supplements with pinned
// Other Ingredients. Current Vitacost PDP Ingredients + UPC-A
// (733739…) is the pin — store HTML bullets alone ≠ OI. DSLD
// used only as a cross-check family, not a stale override.
// recordStatus is 'unverified' on every row. Internal keys
// only: clean | caution | avoid. UPC attached only when the
// Vitacost PDP printed a real 12-digit. NDC ≠ UPC. Pack sizes
// of the same name+form+inactives+actives share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter
// (§6). Search wiring only. Not wired into Clean Picks UI.
// No photos. Letter tiles only on new ids. No fake Clean
// alts. No methodology wipe. No new §5 stamps.
// PROJECT_NOTES tally-only.
//
// Highest draft after this write = batch73. File MUST be
// named batch73-kyr6-now-exact-s5-backfill.ts. Do NOT edit
// batch72 / batch71 / batch70. Do NOT reopen batch61–69 or
// PR #230. Amazon house CLOSED. No Sprouts. No UPC factory
// #121–#221. Oil/MCT/EO pour bottles = hunt list name+URL
// only; never grade. Do NOT start Nutricost or any other
// leftover 3P brand (still N=7). No house Amazon. No graded
// oils. No family guesses / cousin aliases beyond PROJECT_NOTES
// + §5 already lock.
//
// REUSE ONLY (do not rewrite / do not clone):
// - every batch71 NOW Search row (do not duplicate)
// - every batch72 NOW Search row (do not duplicate)
// - now-turmeric-curcumin-bioperine (batch54, UPC 733739047922)
// - now-magnesium-calcium-with-zinc-and-vitamin-d-3-250 (batch72)
//
// TALLY (unverified drafts in THIS file): 27 rows —
// Clean 9 / Caution 17 / Avoid 1.
// NEW 15 / REUSE-formula 12 / SKIPPED + REFUSED
// listed at the bottom. TALLY is asserted at the bottom.

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

const BRAND = 'NOW';
const AMAZON = ['Amazon', 'nowfoods.com', 'Vitacost'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';
const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. Named single oil as this capsule/softgel/liquid-drop fill is not that High rule.';
const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';
const RICE_FLOUR_TAP =
  'Rice flour is the locked exact Caution token. Distinct from Cleared rice-hull / rice-bran / rice protein.';
const CARAMEL_TAP =
  'Undisclosed-class caramel color is Avoid. The label did not name Class I/II. Burden is on the label.';
const MCT_TAP =
  'Label says MCT / medium-chain triglycerides and does not name coconut on that token. Limited opacity. Named MCT from coconut/palm kernel is Cleared fill.';

const METH = {
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  riceFlour: `Methodology §5 Caution (rice flour — exact token; standalone Caution, not Avoid; locked Sept 15, 2026). ${RICE_FLOUR_TAP}`,
  chlorophyllin: 'Methodology §5 Caution (sodium copper chlorophyllin — copper-complex color; not raw chlorophyll)',
  carobExtract: 'Methodology §5 Caution (plain Carob / Carob Extract — exact alias unless the panel says powder-as-food only; locked Sept 16 / Sept 20 2026 NOW #261 alias)',
  enteric: 'Methodology §5 Caution (unnamed coating blend / bare Enteric Coating — delayed-release family; locked Sept 16, 2026)',
  caramel: `Methodology §5 High-tier (caramel color, undisclosed class — treated as Class III/IV). ${CARAMEL_TAP}`,
  flavors: 'Methodology §5 Limited-risk (natural flavors — opacity, not a known hazard)',
  maltodextrin: 'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  lemonOil: 'Methodology §5 Limited-risk (named lemon oil as flavor — not a Clean auto-pass)',
  peppermint: 'Methodology §5 Limited-risk (peppermint oil / orange essential oil as flavor — flavor/EO line; not gummy High)',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — source not named; opacity; not Avoid). ${MCT_TAP}`,
  polydextrose: 'Methodology §5 Limited-risk (polydextrose / tapioca dextrin — maltodextrin-like)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / cellulose capsule)',
  cellulose: 'Methodology §5 Cleared (cellulose / MCC / croscarmellose / cellulose gum family)',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose)',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium laurate)',
  ascorbyl: 'Methodology §5 Cleared (ascorbyl palmitate / mixed tocopherols as antioxidants)',
  citric: 'Methodology §5 Cleared (citric acid / ascorbic acid / citrate salts as fillers/buffers)',
  kcl: 'Methodology §5 Cleared (potassium chloride — salt / electrolyte)',
  salt: 'Methodology §5 Cleared (sodium chloride / sodium bicarbonate)',
  gelatin: 'Methodology §5 Cleared (gelatin / beeswax / carnauba / purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified / distilled / deionized water)',
  lecithin: 'Methodology §5 Cleared (sunflower / soy / canola lecithin)',
  inulin: 'Methodology §5 Cleared (inulin / FOS / psyllium husk — fiber family)',
  starch: 'Methodology §5 Cleared (corn / potato / pregelatinized starch)',
  oilFill: `Methodology §5 Cleared (named single oil as capsule/softgel/drop fill — not gummy High). ${OIL_FILL_TAP}`,
  zincOxide: 'Methodology §5 Cleared (zinc oxide as labeled inactive / topical)',
  namedCoat: 'Methodology §5 Cleared (Vegetable Coating NAMED as HPMC, glycerin / named vegetarian coating — named-coat row, not the blank Caution; locked Sept 16 / Sept 20 2026 NOW #261 alias)',
  shellac: 'Methodology §5 Cleared (shellac / pharmaceutical glaze — exact alias; locked Sept 15 / Sept 20 2026 NOW #261 alias)',
  caCarbonate: 'Methodology §5 Cleared (calcium carbonate as Other Ingredient filler — mineral-filler Cleared; distinct from Ca as a labeled active; locked Sept 20, 2026 NOW #261 alias)',
  bicarb: 'Methodology §5 Cleared (Mg / K / ammonium / Na carbonate or bicarbonate — bicarb / mineral-filler; NOW exact-§5 token lock after #262)',
  kSulfate: 'Methodology §5 Cleared (potassium sulfate — saline/mineral salt with bicarb; NOW exact-§5 token lock after #262)',
  fiberCitrus: 'Methodology §5 Cleared (citrus / grapefruit / bergamot fiber — fiber + pectin / inulin neighborhood; NOW exact-§5 token lock after #262)',
  caSilicate: 'Methodology §5 Caution (calcium silicate — silicate anti-caking; not the SiO2 0-pt cap; locked Sept 15 / Sept 16 2026)',
  cinnamonBot: 'Methodology §5 Caution (ginger root + cinnamon bark powder — ginger/cinnamon botanical; NOW exact-§5 token lock after #262)',
  peppermintLeaf: 'Methodology §5 Caution (peppermint leaf powder — unspecified botanical powder; peppermint oil flavor stays the existing §5 flavor row, not this leaf-powder Caution; NOW exact-§5 token lock after #262)',
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
  audience: typeof ADULT;
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
      Sleep: ['pure-encapsulations-melatonin-sr-3mg', 'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already on main. Form labeled, not a hard filter (§6).'],
      'Pain & Fever': ['thorne-glucosamine-chondroitin', 'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).'],
      'Immune Support': ['natures-way-alive-max6', "Independently Clean Nature's Way Alive! Max6 already on main. Form labeled, not a hard filter (§6)."],
      Prenatal: ['we-heart-wholesome-prenatal', 'Independently Clean We Heart Nutrition Wholesome Prenatal already on main. Form labeled, not a hard filter (§6).'],
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
    id: 'now-water-out-100',
    productName: 'Water Out™, 100 Veg Capsules',
    category: 'Digestive',
    barcode: '733739019080',
    formulaId: 'now-water-out-100',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin B-6 (from Pyridoxine HCl', strength: '25mg' },
      { name: 'Potassium (from Potassium Chloride', strength: '99mg' },
      { name: 'Uva Ursi Extract Blend', strength: '250mg' },
      { name: 'Dandelion (Taraxacum officinale) (Leaf', strength: '200mg' },
      { name: 'Juniper (Juniperus communis) (Berries', strength: '120mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Rice flour', 'cleared', 'riceFlour'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Magnesium carbonate (OI mineral filler)', 'cleared', 'bicarb'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is rice flour (locked exact Caution). Magnesium carbonate as OI filler maps to existing bicarb / mineral-filler Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Water Out™, 100 Veg Capsules (https://www.vitacost.com/products/now-foods-water-out-100-veg-capsules-15373) other-ingredients: Hypromellose (cellulose capsule), rice flour, stearic acid (vegetable source) and magnesium carbonate. UPC-A 733739019080. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-water-out-200',
    productName: 'Water Out™, 200 Veg Capsules',
    category: 'Digestive',
    barcode: '733739019097',
    formulaId: 'now-water-out-100',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin B-6 (from Pyridoxine HCl', strength: '25mg' },
      { name: 'Potassium (from Potassium Chloride', strength: '99mg' },
      { name: 'Uva Ursi Extract Blend', strength: '250mg' },
      { name: 'Dandelion (Taraxacum officinale) (Leaf', strength: '200mg' },
      { name: 'Juniper (Juniperus communis) (Berries', strength: '120mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Rice flour', 'cleared', 'riceFlour'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Magnesium carbonate (OI mineral filler)', 'cleared', 'bicarb'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is rice flour (locked exact Caution). Magnesium carbonate as OI filler maps to existing bicarb / mineral-filler Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Water Out™, 200 Veg Capsules (https://www.vitacost.com/products/now-foods-water-out-200-veg-capsules-156859) other-ingredients: Hypromellose (cellulose capsule), Rice Flour, Stearic Acid (vegetable source) and Magnesium Carbonate. UPC-A 733739019097. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-whole-psyllium-husks-12',
    productName: 'Whole Psyllium Husks, 12 oz (340 g)',
    category: 'Digestive',
    barcode: '733739059802',
    formulaId: 'now-whole-psyllium-husks-12',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Whole Psyllium Husks', strength: 'label serving' }],
    flags: [['Psyllium husk', 'cleared', 'inulin']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (Psyllium Husk fiber; sesame traces = allergen copy only). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule.',
    cite: 'Current Vitacost NOW Foods, Whole Psyllium Husks, 12 oz (340 g) (https://www.vitacost.com/products/now-foods-whole-psyllium-husks-12-oz-340-g-874) other-ingredients: Psyllium (seed husk). May contain traces of sesame. UPC-A 733739059802. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-whole-psyllium-husks-16',
    productName: 'Whole Psyllium Husks, 16 oz (454 g)',
    category: 'Digestive',
    barcode: '733739059819',
    formulaId: 'now-whole-psyllium-husks-12',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Whole Psyllium Husks', strength: 'label serving' }],
    flags: [['Psyllium husk', 'cleared', 'inulin']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (Psyllium Husk fiber; sesame traces = allergen copy only). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule.',
    cite: 'Current Vitacost NOW Foods, Whole Psyllium Husks, 16 oz (454 g) (https://www.vitacost.com/products/now-foods-whole-psyllium-husks-16-oz-454-g-37841) other-ingredients: Psyllium (seed/husk). May contain traces of sesame. UPC-A 733739059819. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-whole-psyllium-husks-24',
    productName: 'Whole Psyllium Husks, 24 oz (680 g)',
    category: 'Digestive',
    barcode: '733739059826',
    formulaId: 'now-whole-psyllium-husks-12',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Whole Psyllium Husks', strength: 'label serving' }],
    flags: [['Psyllium husk', 'cleared', 'inulin']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (Psyllium Husk fiber; sesame traces = allergen copy only). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule.',
    cite: 'Current Vitacost NOW Foods, Whole Psyllium Husks, 24 oz (680 g) (https://www.vitacost.com/products/now-foods-whole-psyllium-husks-24-oz-680-g-16574) other-ingredients: Psyllium husks (husk/seed). May contain traces of sesame. UPC-A 733739059826. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-psyllium-husk-powder-12',
    productName: 'Psyllium Husk Powder, 12 oz (340 g)',
    category: 'Digestive',
    barcode: '733739059758',
    formulaId: 'now-psyllium-husk-powder-12',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Psyllium Husk Powder', strength: 'label serving' }],
    flags: [['Psyllium husk', 'cleared', 'inulin']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (Psyllium Husk fiber; sesame traces = allergen copy only). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule.',
    cite: 'Current Vitacost NOW Foods, Psyllium Husk Powder, 12 oz (340 g) (https://www.vitacost.com/products/now-foods-psyllium-husk-powder-12-oz-340-g-8934) other-ingredients: Psyllium (seed husk). May contain traces of sesame. UPC-A 733739059758. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-psyllium-husk-powder-24',
    productName: 'Psyllium Husk Powder, 24 oz (680 g)',
    category: 'Digestive',
    barcode: '733739059789',
    formulaId: 'now-psyllium-husk-powder-12',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Psyllium Husk Powder', strength: 'label serving' }],
    flags: [['Psyllium husk', 'cleared', 'inulin']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (Psyllium Husk fiber; sesame traces = allergen copy only). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule.',
    cite: 'Current Vitacost NOW Foods, Psyllium Husk Powder, 24 oz (680 g) (https://www.vitacost.com/products/now-foods-psyllium-husk-powder-24-oz-680-g-21133) other-ingredients: Psyllium (seed/husk). May contain traces of sesame. UPC-A 733739059789. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-certified-organic-whole-psyllium-husks-12',
    productName: 'Certified Organic Whole Psyllium Husks, 12 oz (340 g)',
    category: 'Digestive',
    barcode: '733739059680',
    formulaId: 'now-certified-organic-whole-psyllium-husks-12',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Certified Organic Whole Psyllium Husks', strength: 'label serving' }],
    flags: [['Psyllium husk', 'cleared', 'inulin']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (Psyllium Husk fiber; sesame traces = allergen copy only). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule.',
    cite: 'Current Vitacost NOW Foods, Certified Organic Whole Psyllium Husks, 12 oz (340 g) (https://www.vitacost.com/products/now-foods-certified-organic-whole-psyllium-husks-12-oz-340-g-21117) other-ingredients: Organic psyllium (seed husk). May contain traces of sesame. UPC-A 733739059680. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-certified-organic-psyllium-husk-powder-12',
    productName: 'Certified Organic Psyllium Husk Powder, 12 oz (340 g)',
    category: 'Digestive',
    barcode: '733739059666',
    formulaId: 'now-certified-organic-psyllium-husk-powder-12',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Certified Organic Psyllium Husk Powder', strength: 'label serving' }],
    flags: [['Psyllium husk', 'cleared', 'inulin']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (Psyllium Husk fiber; sesame traces = allergen copy only). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule.',
    cite: 'Current Vitacost NOW Foods, Certified Organic Psyllium Husk Powder, 12 oz (340 g) (https://www.vitacost.com/products/now-foods-certified-organic-psyllium-husk-powder-12-oz-340-g-21116) other-ingredients: Organic psyllium (seed husk). May contain traces of sesame. UPC-A 733739059666. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-uc-ii-joint-health-120',
    productName: 'UC-II®, Joint Health with Undenatured Type II Collagen, 120 Capsules',
    category: 'Pain & Fever',
    barcode: '733739031365',
    formulaId: 'now-uc-ii-joint-health-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Calcium (from Aquamin®', strength: '80mg' },
      { name: 'UC-II® Standardized Chicken Cartilage (Providing 10 mg Total Collagen, including Undenatured Type II Collagen', strength: '40mg' },
      { name: 'Aquamin® (Seaweed Derived Minerals) (Lithothamnium spp.) (Whole Plant', strength: '250mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Corn starch', 'cleared', 'starch'],
      ['Potassium chloride (stabilizer)', 'cleared', 'kcl'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide / silica (0-pt nanoparticle Caution cap). Potassium chloride as stabilizer maps to existing saline/mineral salt Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, UC-II®, Joint Health with Undenatured Type II Collagen, 120 Capsules (https://www.vitacost.com/products/now-foods-uc-ii-joint-health-with-undenatured-type-ii-collagen-120-capsules-64318) other-ingredients: Hypromellose (cellulose capsule), microcrystalline cellulose, corn starch (non-gmo), potassium chloride (stabilizer), stearic acid (vegetable source) and silicon dioxide. UPC-A 733739031365. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-uc-ii-joint-health-60',
    productName: 'UC-II® Joint Health with Undenatured Type II Collagen, 60 Capsules',
    category: 'Pain & Fever',
    barcode: '733739031341',
    formulaId: 'now-uc-ii-joint-health-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Calcium (from Aquamin®', strength: '80mg' },
      { name: 'UC-II® Standardized Chicken Cartilage (Providing 10 mg Total Collagen, including Undenatured Type II Collagen', strength: '40mg' },
      { name: 'Aquamin® (Seaweed Derived Minerals) (Lithothamnium spp.) (Whole Plant', strength: '250mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Corn starch', 'cleared', 'starch'],
      ['Potassium chloride (stabilizer)', 'cleared', 'kcl'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide / silica (0-pt nanoparticle Caution cap). Potassium chloride as stabilizer maps to existing saline/mineral salt Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, UC-II® Joint Health with Undenatured Type II Collagen, 60 Capsules (https://www.vitacost.com/products/now-foods-uc-ii-joint-health-with-undenatured-type-ii-collagen-60-capsules-16572) other-ingredients: Hypromellose (cellulose capsule), microcrystalline cellulose, corn starch (non-gmo), potassium chloride (stabilizer), stearic acid (vegetable source) and silicon dioxide. UPC-A 733739031341. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-chewable-papaya-enzymes-360',
    productName: 'Chewable Papaya Enzymes, 360 Lozenges',
    category: 'Digestive',
    barcode: '733739029720',
    formulaId: 'now-chewable-papaya-enzymes-360',
    audience: ADULT,
    minAge: 18,
    form: 'lozenge',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Papain (from Papaya) (2000 USP/mg', strength: '100mg' },
      { name: 'Papaya Fruit Powder', strength: '80mg' },
      { name: 'Bromelain (from Pineapple) (2400 GDU/g', strength: '20mg' },
    ],
    flags: [
      ['Stearic acid', 'cleared', 'stearate'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Peppermint leaf powder', 'cleared', 'peppermintLeaf'],
      ['Peppermint oil', 'limited', 'peppermint'],
      ['Sodium copper chlorophyllin', 'cleared', 'chlorophyllin'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide / silica (0-pt nanoparticle Caution cap); peppermint leaf powder (unspecified botanical powder Caution — NOW exact-§5 WRITE list); sodium copper chlorophyllin. Peppermint oil stays the existing §5 flavor row, not the leaf-powder Caution. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Chewable Papaya Enzymes, 360 Lozenges (https://www.vitacost.com/products/now-foods-chewable-papaya-enzymes-360-lozenges-721) other-ingredients: Stearic acid (vegetable source), magnesium stearate (vegetable source), silicon dioxide, peppermint leaf powder, peppermint oil and sodium copper chlorophyllin (chlorophyll). UPC-A 733739029720. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-chewable-papaya-enzymes-180',
    productName: 'Chewable Papaya Enzymes, 180 Lozenges',
    category: 'Digestive',
    barcode: '733739029706',
    formulaId: 'now-chewable-papaya-enzymes-360',
    audience: ADULT,
    minAge: 18,
    form: 'lozenge',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Papain (from Papaya) (2000 USP/mg', strength: '100mg' },
      { name: 'Papaya Fruit Powder', strength: '80mg' },
      { name: 'Bromelain (from Pineapple) (2400 GDU/g', strength: '20mg' },
    ],
    flags: [
      ['Stearic acid', 'cleared', 'stearate'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Peppermint leaf powder', 'cleared', 'peppermintLeaf'],
      ['Peppermint oil', 'limited', 'peppermint'],
      ['Sodium copper chlorophyllin', 'cleared', 'chlorophyllin'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide / silica (0-pt nanoparticle Caution cap); peppermint leaf powder (unspecified botanical powder Caution — NOW exact-§5 WRITE list); sodium copper chlorophyllin. Peppermint oil stays the existing §5 flavor row, not the leaf-powder Caution. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Chewable Papaya Enzymes, 180 Lozenges (https://www.vitacost.com/products/now-foods-chewable-papaya-enzymes-180-lozenges-51077) other-ingredients: Stearic acid (vegetable source), magnesium stearate (vegetable source), silicon dioxide, peppermint leaf powder, peppermint oil and sodium copper chlorophyllin (chlorophyll). UPC-A 733739029706. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-peppermint-gels-with-ginger-fennel-oils-90',
    productName: 'Peppermint Gels With Ginger & Fennel Oils, 90 Softgels',
    category: 'Digestive',
    barcode: '733739047274',
    formulaId: 'now-peppermint-gels-with-ginger-fennel-oils-90',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Peppermint Oil (Mentha piperita', strength: '0.4 mL / 362mg' },
      { name: 'Ginger Oil (Zingiber officinale', strength: '0.04 mL / 35.2mg' },
      { name: 'Fennel Oil (Foeniculum vulgare', strength: '0.04 mL / 38.6mg' },
    ],
    flags: [
      ['Pharmaceutical glaze / shellac', 'cleared', 'shellac'],
      ['Carboxymethylcellulose sodium / cellulose gum', 'cleared', 'cellulose'],
      ['Ammonium bicarbonate', 'cleared', 'bicarb'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Sunflower oil', 'cleared', 'oilFill'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Enteric coating', 'cleared', 'enteric'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob (plain) / carob extract', 'cleared', 'carobExtract'],
      ['Extra virgin olive oil', 'cleared', 'oilFill'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide / silica (0-pt nanoparticle Caution cap); plain carob / carob extract (not powder-as-food); named enteric coat. Ammonium bicarbonate maps to existing bicarb / mineral-filler Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Peppermint Gels With Ginger & Fennel Oils, 90 Softgels (https://www.vitacost.com/products/now-foods-peppermint-gels-with-ginger-fennel-oils-90-softgels-16549) other-ingredients: Softgel capsule [bovine gelatin (bse-free), glycerin, enteric coating (pharmaceutical glaze, carboxymethylcellulose sodium, ammonium bicarbonate, microcrystalline cellulose, sunflower oil, silicon dioxide), water, carob] and organic olive oil. UPC-A 733739047274. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-calcium-magnesium-with-vitamin-d-3-and-zinc-240',
    productName: 'Calcium & Magnesium With Vitamin D-3 and Zinc, 240 Softgels',
    category: 'Vitamins',
    barcode: '733739012524',
    formulaId: 'now-calcium-magnesium-with-vitamin-d-3-and-zinc-240',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D (as D3 Cholecalciferol', strength: '15mcg' },
      { name: 'Calcium (elemental) (from Calcium Carbonate and Calcium Citrate', strength: '1000mg' },
      { name: 'Magnesium (elemental) (from Magnesium Oxide and Magnesium Citrate', strength: '500mg' },
      { name: 'Zinc (elemental) (from Zinc Oxide', strength: '9mg' },
    ],
    flags: [
      ['Rice bran oil', 'cleared', 'oilFill'],
      ['Citrus / grapefruit / bergamot fiber', 'cleared', 'fiberCitrus'],
      ['Beeswax / carnauba wax', 'cleared', 'gelatin'],
      ['Zinc oxide (inactive)', 'cleared', 'zincOxide'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (HPMC / gelatin / glycerin / water / stearate / named oil fill / citrus fiber as present). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule. Citrus fiber maps to existing fiber + pectin Cleared (NOW exact-§5 WRITE list).',
    cite: 'Current Vitacost NOW Foods, Calcium & Magnesium With Vitamin D-3 and Zinc, 240 Softgels (https://www.vitacost.com/products/now-foods-calcium-magnesium-with-vitamin-d-3-and-zinc-240-softgels-461) other-ingredients: Rice bran oil, softgel capsule [bovine gelatin (BSE-free), glycerin, water, citrus fiber, carnauba wax, zinc oxide], sunflower lecithin and beeswax. UPC-A 733739012524. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-calcium-magnesium-with-vitamin-d3-and-zinc-120',
    productName: 'Calcium & Magnesium with Vitamin D3 and Zinc, 120 Softgels',
    category: 'Vitamins',
    barcode: '733739012517',
    formulaId: 'now-calcium-magnesium-with-vitamin-d-3-and-zinc-240',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D (as D3 Cholecalciferol', strength: '15mcg' },
      { name: 'Calcium (elemental) (from Calcium Carbonate and Calcium Citrate', strength: '1000mg' },
      { name: 'Magnesium (elemental) (from Magnesium Oxide and Magnesium Citrate', strength: '500mg' },
      { name: 'Zinc (elemental) (from Zinc Oxide', strength: '9mg' },
    ],
    flags: [
      ['Rice bran oil', 'cleared', 'oilFill'],
      ['Citrus / grapefruit / bergamot fiber', 'cleared', 'fiberCitrus'],
      ['Beeswax / carnauba wax', 'cleared', 'gelatin'],
      ['Zinc oxide (inactive)', 'cleared', 'zincOxide'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (HPMC / gelatin / glycerin / water / stearate / named oil fill / citrus fiber as present). No SiO2 / rice flour / dye / TiO2 / undisclosed caramel. Named oil as softgel fill is not the gummy seed-oil High rule. Citrus fiber maps to existing fiber + pectin Cleared (NOW exact-§5 WRITE list).',
    cite: 'Current Vitacost NOW Foods, Calcium & Magnesium with Vitamin D3 and Zinc, 120 Softgels (https://www.vitacost.com/products/now-foods-calcium-magnesium-with-vitamin-d3-and-zinc-120-softgels-120066) other-ingredients: Rice bran oil, softgel capsule [bovine gelatin (bse-free), glycerin, water, citrus fiber, carnauba wax, zinc oxide], sunflower lecithin and beeswax. UPC-A 733739012517. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-magnesium-calcium-with-zinc-and-vitamin-d-3-100',
    productName: 'Magnesium & Calcium With Zinc and Vitamin D-3, 100 Tablets',
    category: 'Vitamins',
    barcode: '733739012777',
    formulaId: 'now-magnesium-calcium-with-zinc-and-vitamin-d-3-250',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Zinc (elemental) (from L-OptiZinc® Monomethionine', strength: '15mg' }],
    flags: [
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Named vegetarian coating (HPMC / glycerin)', 'cleared', 'namedCoat'],
      ['Polydextrose / rice dextrin', 'limited', 'polydextrose'],
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Calcium carbonate (OI filler)', 'cleared', 'caCarbonate'],
      ['MCT (unlabeled source)', 'limited', 'mctUnlabeled'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide / silica (0-pt nanoparticle Caution cap). Same OI family as batch72 250-ct — do not restage that grade. Calcium carbonate + medium-chain triglycerides in the named coat map to existing mineral-filler Cleared + unlabeled MCT Limited. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Magnesium & Calcium With Zinc and Vitamin D-3, 100 Tablets (https://www.vitacost.com/products/now-foods-magnesium-calcium-with-zinc-and-vitamin-d-3-100-tablets-39667) other-ingredients: Microcrystalline cellulose, vegetarian coating [polydextrose, hypromellose (cellulose), calcium carbonate medium-chain triglycerides], maltodextrin, croscarmellose sodium, stearic acid (vegetable source), magnesium stearate (vegetable source) and silicon dioxide. UPC-A 733739012777. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-adam-superior-men-s-multi-180-softgels',
    productName: "ADAM™, Superior Men's Multi, 180 Softgels",
    category: 'Vitamins',
    barcode: '733739038814',
    formulaId: 'now-adam-superior-men-s-multi-180-softgels',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin A [60% as Beta-Carotene and 40% as Retinyl Palmitate]', strength: '3000mcg' },
      { name: 'Vitamin C (from Calcium Ascorbate', strength: '250mg' },
      { name: 'Vitamin D-3 (as Cholecalciferol', strength: '25mcg' },
      { name: 'Vitamin E (as d-alpha Tocopherol', strength: '100mg' },
    ],
    flags: [
      ['Pumpkin seed oil', 'cleared', 'oilFill'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Beeswax / carnauba wax', 'cleared', 'gelatin'],
      ['Cinnamon bark powder', 'cleared', 'cinnamonBot'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob (plain) / carob extract', 'cleared', 'carobExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are plain carob / carob extract (not powder-as-food); cinnamon bark powder (ginger/cinnamon botanical Caution — NOW exact-§5 WRITE list). Beeswax and sunflower lecithin map to existing Cleared wax / lecithin rows. Named pumpkin seed oil as softgel fill is not the gummy seed-oil High rule. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: "Current Vitacost NOW Foods, ADAM™, Superior Men's Multi, 180 Softgels (https://www.vitacost.com/products/now-foods-adam-superior-men-s-multi-180-softgels-23364) other-ingredients: Softgel capsule [bovine gelatin (bse-free), glycerin, water, carob], pumpkin seed oil, sunflower lecithin, beeswax and cinnamon bark powder. Contains soy. UPC-A 733739038814. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.",
  },
  {
    id: 'now-adam-superior-men-s-multi-90-softgels',
    productName: "ADAM™, Superior Men's Multi, 90 Softgels",
    category: 'Vitamins',
    barcode: '733739038807',
    formulaId: 'now-adam-superior-men-s-multi-180-softgels',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin A [60% as Beta-Carotene and 40% as Retinyl Palmitate]', strength: '3000mcg' },
      { name: 'Vitamin C (from Calcium Ascorbate', strength: '250mg' },
      { name: 'Vitamin D-3 (as Cholecalciferol', strength: '25mcg' },
      { name: 'Vitamin E (as d-alpha Tocopherol', strength: '100mg' },
    ],
    flags: [
      ['Pumpkin seed oil', 'cleared', 'oilFill'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Beeswax / carnauba wax', 'cleared', 'gelatin'],
      ['Cinnamon bark powder', 'cleared', 'cinnamonBot'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob (plain) / carob extract', 'cleared', 'carobExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are plain carob / carob extract (not powder-as-food); cinnamon bark powder (ginger/cinnamon botanical Caution — NOW exact-§5 WRITE list). Beeswax and sunflower lecithin map to existing Cleared wax / lecithin rows. Named pumpkin seed oil as softgel fill is not the gummy seed-oil High rule. Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: "Current Vitacost NOW Foods, ADAM™, Superior Men's Multi, 90 Softgels (https://www.vitacost.com/products/now-foods-adam-superior-men-s-multi-90-softgels-76072) other-ingredients: Softgel capsule [bovine gelatin (BSE-free), glycerin, water, carob], pumpkin seed oil, sunflower lecithin, beeswax and cinnamon bark powder. Contains soy. UPC-A 733739038807. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.",
  },
  {
    id: 'now-allibiotic-cf-60',
    productName: 'AlliBiotic CF™, 60 Softgels',
    category: 'Immune Support',
    barcode: '733739018113',
    formulaId: 'now-allibiotic-cf-60',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Elderberry Blend', strength: '50mg' },
      { name: 'Olive Leaf Extract Blend', strength: '40mg' },
      { name: 'Garlic Extract Blend', strength: '40mg' },
      { name: 'Oregano Oil (Origanum vulgare) (min. 60% Carvacrol', strength: '40mg' },
    ],
    flags: [
      ['Pharmaceutical glaze / shellac', 'cleared', 'shellac'],
      ['Carboxymethylcellulose sodium / cellulose gum', 'cleared', 'cellulose'],
      ['Ammonium bicarbonate', 'cleared', 'bicarb'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Sunflower oil', 'cleared', 'oilFill'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Enteric coating', 'cleared', 'enteric'],
      ['Caramel color', 'high', 'caramel'],
      ['Rice bran oil', 'cleared', 'oilFill'],
      ['Beeswax / carnauba wax', 'cleared', 'gelatin'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is caramel color, undisclosed class (treated as Class III/IV; IARC 2B / 4-MEI). The label does not name Class I/II. Soy lecithin and ammonium bicarbonate map to existing lecithin Cleared + bicarb / mineral-filler Cleared (NOW exact-§5 WRITE list). Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, AlliBiotic CF™, 60 Softgels (https://www.vitacost.com/products/now-foods-allibiotic-cf-60-softgels-3322) other-ingredients: Softgel capsule [bovine gelatin (bse-free), glycerin, enteric coating (pharmaceutical glaze, carboxymethylcellulose sodium, ammonium bicarbonate, microcrystalline cellulose, sunflower oil, silicon dioxide), water, caramel color], rice bran oil, beeswax and soy lecithin (non-gmo). UPC-A 733739018113. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-prenatal-gels-dha-90',
    productName: 'Prenatal Gels + DHA, 90 Softgels',
    category: 'Prenatal',
    barcode: '733739038098',
    formulaId: 'now-prenatal-gels-dha-90',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin A (100% as Beta-Carotene', strength: '750mcg' },
      { name: 'Vitamin C (from Calcium Ascorbate', strength: '120mg' },
      { name: 'Vitamin D (as D-3 Cholecalciferol', strength: '15mcg' },
      { name: 'Iron (from Ferrochel Bisglycinate', strength: '27mg' },
    ],
    flags: [
      ['Rice bran oil', 'cleared', 'oilFill'],
      ['Beeswax / carnauba wax', 'cleared', 'gelatin'],
      ['Potassium sulfate', 'cleared', 'kSulfate'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Lemon oil', 'limited', 'lemonOil'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob (plain) / carob extract', 'cleared', 'carobExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are plain carob / carob extract (not powder-as-food); named lemon oil as flavor (Limited — not a Clean auto-pass). Potassium sulfate maps to existing saline/mineral salt with bicarb Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Prenatal Gels + DHA, 90 Softgels (https://www.vitacost.com/products/now-foods-prenatal-gels-dha-90-softgels-45705) other-ingredients: Softgel capsule [bovine gelatin, (BSE-free), glycerin, water, carob], rice bran oil, beeswax, potassium sulfate, soy lecithin and lemon oil. Contains fish (tuna, anchovies) and soy. UPC-A 733739038098. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-prenatal-gels-dha-180',
    productName: 'Prenatal Gels + DHA, 180 Softgels',
    category: 'Prenatal',
    barcode: '733739038111',
    formulaId: 'now-prenatal-gels-dha-90',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin A (100% as Beta-Carotene', strength: '750mcg' },
      { name: 'Vitamin C (from Calcium Ascorbate', strength: '120mg' },
      { name: 'Vitamin D-3 (as Cholecalciferol', strength: '15mcg' },
      { name: 'Iron (from Ferrous Bisglycinate', strength: '27mg' },
    ],
    flags: [
      ['Rice bran oil', 'cleared', 'oilFill'],
      ['Beeswax / carnauba wax', 'cleared', 'gelatin'],
      ['Potassium sulfate', 'cleared', 'kSulfate'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Lemon oil', 'limited', 'lemonOil'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
      ['Carob (plain) / carob extract', 'cleared', 'carobExtract'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are plain carob / carob extract (not powder-as-food); named lemon oil as flavor (Limited — not a Clean auto-pass). Potassium sulfate maps to existing saline/mineral salt with bicarb Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Prenatal Gels + DHA, 180 Softgels (https://www.vitacost.com/products/now-foods-prenatal-gels-dha-180-softgels-45706) other-ingredients: Softgel capsule [bovine gelatin (BSE-free), glycerin, water, carob], rice bran oil, beeswax, potassium sulfate, soy lecithin and natural lemon oil. Contains fish (tuna, anchovies) and soy. UPC-A 733739038111. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-co-enzyme-b-complex-60',
    productName: 'Co-Enzyme B-Complex, 60 Veg Capsules',
    category: 'Vitamins',
    barcode: '733739004062',
    formulaId: 'now-co-enzyme-b-complex-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin C (from Magnesium Ascorbate', strength: '60mg' },
      { name: 'Thiamin (Vit. B-1) (from Thiamin HCl and Cocarboxylase', strength: '50mg' },
      { name: 'Riboflavin (as Riboflavin & from Riboflavin-5-Phosphate Sodium', strength: '50mg' },
      { name: 'Alpha Lipoic Acid', strength: '50mg' },
      { name: 'CoQ10 (Coenzyme Q10) (Ubiquinone', strength: '10mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Calcium silicate', 'cleared', 'caSilicate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide / silica (0-pt nanoparticle Caution cap); calcium silicate (silicate anti-caking Caution — not the SiO2 cap; NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Co-Enzyme B-Complex, 60 Veg Capsules (https://www.vitacost.com/products/now-foods-co-enzyme-b-complex-60-veg-capsules-71698) other-ingredients: Hypromellose (cellulose capsule), microcrystalline cellulose, stearic acid (vegetable source, silicon dioxide, hypromellose (cellulose) and calcium silicate. UPC-A 733739004062. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-coenzyme-b-complex-with-alpha-lipoic-acid-and-coq10-120',
    productName: 'Coenzyme B-Complex With Alpha Lipoic Acid and CoQ10, 120 Veg Capsules',
    category: 'Vitamins',
    barcode: '733739004079',
    formulaId: 'now-co-enzyme-b-complex-60',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin C (from Magnesium Ascorbate', strength: '60mg' },
      { name: 'Thiamin (Vit. B-1) (from Thiamin HCl and Cocarboxylase', strength: '50mg' },
      { name: 'Riboflavin (as Riboflavin and from Riboflavin-5-Phosphate Sodium', strength: '50mg' },
      { name: 'Alpha Lipoic Acid', strength: '50mg' },
      { name: 'CoQ10 (Coenzyme Q10) (Ubiquinone', strength: '10mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Calcium silicate', 'cleared', 'caSilicate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide / silica (0-pt nanoparticle Caution cap); calcium silicate (silicate anti-caking Caution — not the SiO2 cap; NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Coenzyme B-Complex With Alpha Lipoic Acid and CoQ10, 120 Veg Capsules (https://www.vitacost.com/products/now-foods-coenzyme-b-complex-with-alpha-lipoic-acid-and-coq10-120-veg-capsules-151145) other-ingredients: Hypromellose (cellulose capsule), microcrystalline cellulose, stearic acid (vegetable source), silicon dioxide, hypromellose (cellulose) and calcium silicate. UPC-A 733739004079. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-testojack-200-120',
    productName: 'TestoJack 200™, 120 Veg Capsules',
    category: 'Vitamins',
    barcode: '733739021977',
    formulaId: 'now-testojack-200-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Eurycoma longifolia Jack Extract Complex (Root) (Tongkat Ali) (EuryGold™', strength: '200mg' },
      { name: 'Organic Maca Root (Lepidium meyenii) (6:1 Concentrate', strength: '500mg' },
      { name: 'Epimedium Extract Complex (Horny Goat Weed) (Aerial Parts', strength: '300mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Citrus / grapefruit / bergamot fiber', 'cleared', 'fiberCitrus'],
      ['Ascorbyl palmitate', 'cleared', 'ascorbyl'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide / silica (0-pt nanoparticle Caution cap). Citrus bergamot fiber maps to existing fiber + pectin Cleared (NOW exact-§5 WRITE list). Limited-only maltodextrin does not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, TestoJack 200™, 120 Veg Capsules (https://www.vitacost.com/products/now-foods-testojack-200-120-veg-capsules-46306) other-ingredients: Hypromellose (cellulose capsule), maltodextrin (non-gmo), citrus bergamot fiber, ascorbyl palmitate, stearic acid (vegetable source) and silicon dioxide. UPC-A 733739021977. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-testojack-200-60',
    productName: 'TestoJack 200™, 60 Veg Capsules',
    category: 'Vitamins',
    barcode: '733739021984',
    formulaId: 'now-testojack-200-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Eurycoma longifolia Jack Extract Complex (Root) (Tongkat Ali) (EuryGold™', strength: '200mg' },
      { name: 'Organic Maca Root (Lepidium meyenii) (6:1 Concentrate', strength: '500mg' },
      { name: 'Epimedium Extract Complex (Horny Goat Weed) (Aerial Parts', strength: '300mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Citrus / grapefruit / bergamot fiber', 'cleared', 'fiberCitrus'],
      ['Ascorbyl palmitate', 'cleared', 'ascorbyl'],
      ['Stearic acid', 'cleared', 'stearate'],
      ['Silicon dioxide', 'cleared', 'sio2'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide / silica (0-pt nanoparticle Caution cap). Citrus bergamot fiber maps to existing fiber + pectin Cleared (NOW exact-§5 WRITE list). Limited-only maltodextrin does not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, TestoJack 200™, 60 Veg Capsules (https://www.vitacost.com/products/now-foods-testojack-200-60-veg-capsules-22554) other-ingredients: Hypromellose (cellulose capsule), maltodextrin (non-gmo), citrus bergamot fiber, ascorbyl palmitate, stearic acid (vegetable source) and silicon dioxide. UPC-A 733739021984. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-horse-chestnut-with-added-rutin-90',
    productName: 'Horse Chestnut With Added Rutin, 90 Veg Capsules',
    category: 'Vitamins',
    barcode: '733739047137',
    formulaId: 'now-horse-chestnut-with-added-rutin-90',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Horse Chestnut Extract (Aesculus hippocastanum) (seed/fruit', strength: '300mg' },
      { name: 'Rutin Powder (from Sophora japonica Flower Bud', strength: '200mg' },
    ],
    flags: [
      ['Hypromellose (cellulose capsule)', 'cleared', 'hpmc'],
      ['Calcium citrate (OI filler/buffer)', 'cleared', 'citric'],
      ['Silicon dioxide', 'cleared', 'sio2'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide / silica (0-pt nanoparticle Caution cap). Calcium citrate as OI filler/buffer maps to existing citrate salts Cleared (NOW exact-§5 WRITE list). Cleared capsule/softgel/fill tokens do not raise Avoid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Horse Chestnut With Added Rutin, 90 Veg Capsules (https://www.vitacost.com/products/now-foods-horse-chestnut-with-added-rutin-90-veg-capsules-633) other-ingredients: Hypromellose (cellulose capsule), calcium citrate, silicon dioxide and stearic acid (vegetable source). Contains tree nut (horse chestnut). UPC-A 733739047137. Live Amazon US / nowfoods.com exact pack via UPC 733739… when listed.',
  },
];

export const BATCH73_KYR6_NOW_EXACT_S5_BACKFILL: RatingRecord[] = COMPACT.map(expand);

export const BATCH73_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'N=705 — every Search row already written in batch71-kyr6-amazon-3p-now.ts',
    reason: 'SKIPPED already-written batch71 (do not duplicate / do not restage)',
  },
  {
    sku: 'N=111 — every Search row already written in batch72-kyr6-now-refuse-backfill.ts',
    reason: 'SKIPPED already-written batch72 (do not duplicate / do not restage)',
  },
  {
    sku: 'NOW Foods, TestoJack 300™, 300 mg, 60 Veg Capsules',
    reason: 'SKIPPED different SKU line (not a TestoJack 200 count tab). Bergamot N=2 lock is the 200 120 + 200 60 pair already written. Do not invent a new line.',
  },
];

const STEP7 =
  '7-step packet required before a Search row: (1) EFSA/EU (2) FDA/IID/GRAS context only (3) IARC + NTP + Prop 65 (4) Health Canada or EMA if relevant (5) one or two key primary papers (6) EWG/CSPI if they flag it — advocacy, not the vote (7) founder call. Do not invent a grade. NO Search row.';

export const BATCH73_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'NOW Foods, Prostate Health, Clinical Strength, 180 Softgels',
    reason: `REFUSED write-list + do-not-write. WRITE beeswax is locked, but the same PDP still prints phytosterols from soy. Do not backfill 7-step or soy phytosterols. ${STEP7} SKU: NOW Foods, Prostate Health, Clinical Strength, 180 Softgels.`,
  },
  {
    sku: 'NOW Foods, Prostate Health, 90 Softgels',
    reason: `REFUSED write-list + do-not-write. WRITE beeswax is locked, but the same PDP still prints phytosterols from soy. Do not backfill 7-step or soy phytosterols. ${STEP7} SKU: NOW Foods, Prostate Health, 90 Softgels.`,
  },
  {
    sku: "NOW Foods, EVE™, Superior Women's Multi, 180 Softgels",
    reason: `REFUSED do-not-write \`flax seed oil\` as OI. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, EVE™, Superior Women's Multi, 180 Softgels.`,
  },
  {
    sku: "NOW Foods, EVE™ Softgels, Superior Women's Multi, 90 Softgels",
    reason: `REFUSED do-not-write \`flax seed oil\` as OI. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, EVE™ Softgels, Superior Women's Multi, 90 Softgels.`,
  },
  {
    sku: 'NOW Foods, SAMe , 400 mg, 60 Tablets',
    reason: `REFUSED do-not-write \`l-arginine\`. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, SAMe , 400 mg, 60 Tablets.`,
  },
  {
    sku: 'NOW Foods, SAMe, 400 mg, 30 Tablets',
    reason: `REFUSED do-not-write \`l-arginine\`. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, SAMe, 400 mg, 30 Tablets.`,
  },
  {
    sku: 'NOW Foods, Turkey Tail, 500 mg, 90 Veg Capsules',
    reason: `REFUSED do-not-write \`organic sorghum powder\`. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, Turkey Tail, 500 mg, 90 Veg Capsules.`,
  },
  {
    sku: "NOW Foods, EVE™, Superior Women's Multi, 180 Tablets",
    reason: `REFUSED spirulina extract — still refused / same TopCare §5 refuse; no Search row. Do not backfill spirulina. ${STEP7} SKU: NOW Foods, EVE™, Superior Women's Multi, 180 Tablets.`,
  },
  {
    sku: "NOW Foods, Eve™ Tablets, Superior Women's Multi, 90 Tablets",
    reason: `REFUSED spirulina extract — still refused / same TopCare §5 refuse; no Search row. Do not backfill spirulina. ${STEP7} SKU: NOW Foods, Eve™ Tablets, Superior Women's Multi, 90 Tablets.`,
  },
  {
    sku: 'NOW Foods, Sports, Effer-Hydrate, Lemon Lime, 10 Tablets, 1.8 oz (51 g)',
    reason: `REFUSED write-list + do-not-write. Potassium bicarbonate / magnesium carbonate are WRITE, but the same PDP still prints taurine. ${STEP7} SKU: NOW Foods, Sports, Effer-Hydrate, Lemon Lime, 10 Tablets, 1.8 oz (51 g).`,
  },
  {
    sku: 'NOW Foods, Sports, Effer-Hydrate Effervescent, Orange Strawberry, 10 Tablets, 1.8 oz (51 g)',
    reason: `REFUSED write-list + do-not-write. Potassium bicarbonate / magnesium carbonate / riboflavin-as-color are WRITE, but the same PDP still prints taurine. ${STEP7} SKU: NOW Foods, Sports, Effer-Hydrate Effervescent, Orange Strawberry, 10 Tablets, 1.8 oz (51 g).`,
  },
  {
    sku: 'NOW Foods, Sports, Effer-Energy Effervescent, Tropical Punch, 10 Tablets, 1.83 oz (52 g)',
    reason: `REFUSED write-list + do-not-write. Bicarb / green tea extract / pyridoxine HCl are WRITE, but the same PDP still prints taurine + nicotinamide + cyanocobalamin. ${STEP7} SKU: NOW Foods, Sports, Effer-Energy Effervescent, Tropical Punch, 10 Tablets, 1.83 oz (52 g).`,
  },
  {
    sku: 'NOW Foods, Sustained Energy, 90 Veg Capsules',
    reason: `REFUSED do-not-write sustained-release caffeine as OI. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, Sustained Energy, 90 Veg Capsules.`,
  },
  {
    sku: 'NOW Foods, Sports, E-Sport Reaction, Chocolate Milkshake, 1 lb (454 g)',
    reason: `REFUSED write-list + do-not-write. Organic erythritol / organic beet sugar are WRITE, but the same PDP still prints organic non-fat dry milk powder + organic cocoa powder. ${STEP7} SKU: NOW Foods, Sports, E-Sport Reaction, Chocolate Milkshake, 1 lb (454 g).`,
  },
  {
    sku: 'NOW Foods, Chewable Vitamin D-3, Fruit, 25 mcg (1,000 IU), 180 Chewables',
    reason: `REFUSED still-unknown \`corn oil\` on a chewable (not the locked softgel/drop named-oil fill row; not a gummy High invent). Sodium ascorbate + sucrose are WRITE, but a still-unknown inactive remains. No family guess. ${STEP7} SKU: NOW Foods, Chewable Vitamin D-3, Fruit, 25 mcg (1,000 IU), 180 Chewables.`,
  },
  {
    sku: 'NOW Foods, D3 + K2 Chewables, 90 Chewables Tablets',
    reason: `REFUSED still-unknown \`corn oil\` on a chewable (not the locked softgel/drop named-oil fill row; not a gummy High invent). Sodium ascorbate + sucrose are WRITE, but a still-unknown inactive remains. No family guess. ${STEP7} SKU: NOW Foods, D3 + K2 Chewables, 90 Chewables Tablets.`,
  },
  {
    sku: 'NOW Foods, Vitamin D3, Max Potency, 50,000 IU, 15 Capsules',
    reason: `REFUSED no current Vitacost PDP pin (nowfoods.com blocked). Softgel 12/50 already on batch71. Do not invent OI or UPC for the 15-cap dry pack. Sodium ascorbate stays unwritten on that missing pin. ${STEP7} SKU: NOW Foods, Vitamin D3, Max Potency, 50,000 IU, 15 Capsules.`,
  },
  {
    sku: 'NOW Foods, Ultra B-12, 16 fl oz (473 ml)',
    reason: `REFUSED no current Vitacost 16 fl oz PDP (nowfoods.com blocked). The live 4 fl oz sibling prints grapefruit fiber (WRITE) AND cinnamon bark oil (not cinnamon bark powder; no cousin alias). Keep refused. ${STEP7} SKU: NOW Foods, Ultra B-12, 16 fl oz (473 ml).`,
  },
  {
    sku: 'NOW Foods, Ultra B-12, 4 fl oz (118 ml)',
    reason: `REFUSED write-list + still-unknown. Grapefruit fiber is WRITE, but the same PDP prints cinnamon bark oil (not the locked cinnamon bark powder token; no cousin alias to cinnamon oil). ${STEP7} SKU: NOW Foods, Ultra B-12, 4 fl oz (118 ml).`,
  },
  {
    sku: 'NOW Foods, Liquid B-12, 8 fl oz (237 ml)',
    reason: `REFUSED write-list + still-unknown. Ginger root + grapefruit fiber are WRITE, but the same PDP prints cinnamon bark oil (not cinnamon bark powder). ${STEP7} SKU: NOW Foods, Liquid B-12, 8 fl oz (237 ml).`,
  },
  {
    sku: 'NOW Foods, Liquid B-12, B-Complex, 2 fl oz (59 ml)',
    reason: `REFUSED write-list + still-unknown. Ginger root + grapefruit fiber are WRITE, but the same PDP prints cinnamon bark oil (not cinnamon bark powder). ${STEP7} SKU: NOW Foods, Liquid B-12, B-Complex, 2 fl oz (59 ml).`,
  },
  {
    sku: 'NOW Foods, Liposomal Vitamin C, 120 Veg Capsules (500 mg per Capsule)',
    reason: `REFUSED write-list + still-unknown. Sunflower lecithin phospholipids are WRITE, but the same PDP still prints fatty acids (from rice bran) and citrus bioflavonoids as OI. No family guess to rice bran oil or named fatty-acid rows. ${STEP7} SKU: NOW Foods, Liposomal Vitamin C, 120 Veg Capsules (500 mg per Capsule).`,
  },
  {
    sku: 'NOW Foods, Certified Organic Spirulina Powder, 1 lb (454 g)',
    reason: `REFUSED spirulina — still refused / same TopCare §5 refuse; no Search row. Do not backfill spirulina. ${STEP7} SKU: NOW Foods, Certified Organic Spirulina Powder, 1 lb (454 g).`,
  },
  {
    sku: 'NOW Foods, Certified Organic Chlorella, Pure Powder, 1 lb (454 g)',
    reason: `REFUSED do-not-write chlorella powder. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, Certified Organic Chlorella, Pure Powder, 1 lb (454 g).`,
  },
  {
    sku: 'NOW Foods, Omega 3-6-9, 250 Softgels',
    reason: `REFUSED do-not-write carob powder / powder-as-food (Carob Extract Caution stays; powder-as-food is not auto-Cleared). ${STEP7} SKU: NOW Foods, Omega 3-6-9, 250 Softgels.`,
  },
  {
    sku: 'NOW Foods, Colloidal Minerals, 32 fl oz (946 ml)',
    reason: `REFUSED do-not-write fulvic acid. Do not backfill 7-step. ${STEP7} SKU: NOW Foods, Colloidal Minerals, 32 fl oz (946 ml).`,
  },
  {
    sku: 'NOW Foods, Chewable Vitamin C-500, Orange, 100 Tablets',
    reason: `REFUSED do-not-write orange fruit juice powder as sweetener (≠ juice-as-color). ${STEP7} SKU: NOW Foods, Chewable Vitamin C-500, Orange, 100 Tablets.`,
  },
  {
    sku: 'NOW Foods, Saw Palmetto Extract, 160 mg, 240 Softgels',
    reason: `REFUSED do-not-write bare wheat + bare soy. ${STEP7} SKU: NOW Foods, Saw Palmetto Extract, 160 mg, 240 Softgels.`,
  },
];

export const BATCH73_OIL_HUNT: { name: string; url: string }[] = [];

const _ROWS = BATCH73_KYR6_NOW_EXACT_S5_BACKFILL;
if (_ROWS.length !== 27) throw new Error('batch73 tally drift: expected 27 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 9) {
  throw new Error('batch73 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 17) {
  throw new Error('batch73 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 1) {
  throw new Error('batch73 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch73 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch73 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch73 duplicate ids');
if (_ids.has('now-turmeric-curcumin-bioperine')) {
  throw new Error('batch73 must not clone already-on-MAIN turmeric BioPerine');
}
if (_ROWS.some((r) => r.brand !== BRAND)) {
  throw new Error('batch73 writes NOW only');
}
if (_ROWS.some((r) => r.barcode && !/^733739\d{6}$/.test(r.barcode))) {
  throw new Error('batch73 invented or non-NOW UPC');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 12) {
  throw new Error('batch73 REUSE-formula tally drift');
}
if (!BATCH73_SKIPPED.some((s) => /already-written batch71/i.test(s.reason))) {
  throw new Error('batch73 must skip already-written batch71');
}
if (!BATCH73_SKIPPED.some((s) => /already-written batch72/i.test(s.reason))) {
  throw new Error('batch73 must skip already-written batch72');
}
if (!_ROWS.some((r) => r.inactiveIngredients.some((i) => /psyllium|citrus|bergamot|cinnamon bark|peppermint leaf|calcium silicate|potassium sulfate|ammonium bicarbonate|magnesium carbonate|calcium citrate/i.test(i.name)))) {
  throw new Error('batch73 must write at least one exact-§5 WRITE-list token');
}
if (_ROWS.some((r) => r.inactiveIngredients.some((i) => /spirulina|fulvic|sorghum|taurine|l-arginine|nicotinamide|cyanocobalamin|cocoa powder|chlorella|flax seed oil|phytosterols from soy|sodium coco-sulfate/i.test(i.name)))) {
  throw new Error('batch73 must not write do-not-write / 7-step tokens');
}
if (!BATCH73_REFUSED.length) {
  throw new Error('batch73 must keep leftover unmapped / mixed tokens refused');
}
if (_ROWS.some((r) => /essential oils?,/i.test(r.productName))) {
  throw new Error('batch73 must not grade EO pour bottles');
}
if (_ROWS.some((r) => /nutricost|naturewise|welmate|a\+health|healtha2z|time-cap|goodsense|sprouts/i.test(r.brand + r.productName))) {
  throw new Error('batch73 leftover 3P / Sprouts must stay out');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    if (!/caramel|talc|titanium|dye|seed oil/i.test(record.honestNote || '')) {
      throw new Error(`batch73 Avoid without High on ${record.id}`);
    }
  }
}
