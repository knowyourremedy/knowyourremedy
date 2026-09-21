// DRAFT / not verified / batch 75 KYR6 spirulina Caution BACKFILL /
// Methodology v1.6 + current main §5. Founder stamp Sept 21, 2026
// spirulina powder + spirulina extract = Caution (Limited).
// Harm-first. No invented grades. No cousin-match.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Spirulina reopen BACKFILL only. Write ONLY rows
// previously refused on spirulina powder or spirulina extract
// (powder packs; EVE tablets with spirulina extract; any other
// NOW SKU held solely for those tokens) once every other
// inactive maps to an exact §5 row already locked. Still-unknown
// token = REFUSED with the exact string. No Search row.
// US Amazon + nowfoods.com / vitamins / supplements with pinned
// Other Ingredients. nowfoods.com was Cloudflare-blocked.
// Current Vitacost PDP Ingredients + UPC-A (733739…) is the pin.
// Each pack is its own Vitacost PDP (count is not one shared
// accordion). recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. UPC attached
// only when that pack's Vitacost PDP printed a real 12-digit.
// Pack sizes of the same OI+actives share formulaId. Search
// wiring only. Not wired into Clean Picks UI. No photos.
// Letter tiles only on new ids. No fake Clean alts.
// No methodology wipe. No new §5 stamps. PROJECT_NOTES tally-only.
//
// Highest draft after this write = batch75. File MUST be
// named batch75-kyr6-spirulina-caution.ts. Do NOT edit
// batch70 / batch71 / batch72 / batch73 / batch74. Do NOT
// reopen batch61–69 or PR #230. Amazon house CLOSED. No
// Sprouts. No UPC factory #121–#221. Oil/MCT/EO pour bottles
// = hunt list name+URL only; never grade. Do NOT start
// Nutricost or any other leftover 3P brand (still N=7).
// No house Amazon. No toothpaste. No graded oils.
//
// REUSE ONLY (do not rewrite / do not clone the prior row):
// - every batch71 / batch72 / batch73 / batch74 NOW Search row
// - now-spirulina-120 (batch71) stays that capsule row
//
// TALLY (unverified drafts in THIS file): 4 rows —
// Clean 0 / Caution 4 / Avoid 0.
// NEW 2 / REUSE-formula 2 / SKIPPED + REFUSED
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
const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';
const MCT_TAP =
  'Label token "mct oil (medium-chain triglycerides)" does not name coconut on that token (Limited opacity). The same panel then says "MCT oil from coconut/palm kernel oil," which is the Cleared named-MCT row. Both strings written. Named MCT is not gummy High and is not an oil-bottle grade.';

const METH = {
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  xylitol: 'Methodology §5 Limited-risk (xylitol / erythritol, oral — GI effects at volume)',
  mctUnlabeled:
    'Methodology §5 Limited-risk (unlabeled MCT — source not named on that token; opacity; not Avoid). ' +
    MCT_TAP,
  mctNamed:
    'Methodology §5 Cleared (named MCT / Medium Chain Triglycerides from coconut or palm kernel as fill). ' +
    MCT_TAP,
  spirulinaPowder:
    'Methodology §5 Limited-risk (spirulina powder / Organic spirulina powder as Other Ingredient — Caution Limited; unspecified algae + contamination class; same neighborhood as chlorella powder; not Avoid; not Cleared; locked Sept 21, 2026). FDA allowance is not Clean.',
  spirulinaExtract:
    'Methodology §5 Limited-risk (spirulina extract as Other Ingredient / color in a multi — Caution Limited; FDA color allow is not Clean; not Avoid; not Cleared; distinct from spirulina powder; locked Sept 21, 2026).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / cellulose capsule)',
  cellulose: 'Methodology §5 Cleared (cellulose / MCC / croscarmellose / cellulose gum family)',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose)',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC — HPMC family)',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium laurate)',
  riboflavin: 'Methodology §5 Cleared (riboflavin used as color)',
  caCarbonate:
    'Methodology §5 Cleared (calcium carbonate as Other Ingredient filler — mineral-filler Cleared; distinct from Ca as a labeled active; locked Sept 20, 2026 NOW #261 alias)',
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
    alts.push(
      alt(
        'amazon-elements-vitamin-d3-5000-softgels',
        'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).',
      ),
    );
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

const EVE_ACTIVES: RatingRecord['activeIngredients'] = [
  { name: 'Vitamin A (100% as Beta-Carotene)', strength: '3000mcg' },
  { name: 'Vitamin C (from Calcium Ascorbate and Ascorbyl Palmitate)', strength: '300mg' },
  { name: 'Vitamin D (as Ergocalciferol)', strength: '25mcg' },
  { name: 'Iron (from Ferrous Bisglycinate) (Ferrochel)', strength: '18mg' },
];

const EVE_FLAGS: Compact['flags'] = [
  ['Microcrystalline cellulose', 'cleared', 'mcc'],
  ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['Hypromellose (cellulose)', 'cleared', 'hpmc'],
  ['Calcium carbonate (OI coat filler)', 'cleared', 'caCarbonate'],
  ['Xylitol', 'limited', 'xylitol'],
  ['MCT oil (medium-chain triglycerides)', 'limited', 'mctUnlabeled'],
  ['MCT oil from coconut/palm kernel oil', 'cleared', 'mctNamed'],
  ['Spirulina extract', 'limited', 'spirulinaExtract'],
  ['Riboflavin', 'cleared', 'riboflavin'],
  ['Stearic acid', 'cleared', 'stearate'],
  ['Silicon dioxide', 'cleared', 'sio2'],
  ['Croscarmellose sodium', 'cleared', 'cellulose'],
];

const COMPACT: Compact[] = [
  {
    id: 'now-organic-spirulina-powder-1',
    productName: 'Certified Organic Spirulina Powder, 1 lb (454 g)',
    category: 'Vitamins',
    barcode: '733739027146',
    formulaId: 'now-organic-spirulina-powder-1',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Organic spirulina powder', strength: '3.3g' }],
    flags: [['Organic spirulina powder', 'limited', 'spirulinaPowder']],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. The only ingredient is organic spirulina powder (Sept 21 Caution Limited; unspecified algae + contamination class; same neighborhood as chlorella powder). Not Avoid. Not Cleared. FDA allowance is not Clean. No separate excipient. "Not manufactured with yeast, wheat, gluten, soy…" is an absence line, not bare wheat or bare soy. Distinct from batch71 now-spirulina-120, where spirulina is the labeled active and the inactives are hypromellose plus stearic acid. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Certified Organic Spirulina Powder, 1 lb (454 g) (https://www.vitacost.com/products/now-foods-certified-organic-spirulina-powder-1-lb-454-g-7262) ingredients: Organic spirulina powder. Serving 1 level tsp (3.3 g). UPC-A 733739027146. nowfoods.com blocked (Cloudflare). Live Amazon US exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-organic-spirulina-powder-4',
    productName: 'Certified Organic Spirulina Powder, 4 oz (113 g)',
    category: 'Vitamins',
    barcode: '733739026903',
    formulaId: 'now-organic-spirulina-powder-1',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Organic spirulina powder', strength: '3.3g' }],
    flags: [['Organic spirulina powder', 'limited', 'spirulinaPowder']],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same single ingredient and same 1 level tsp (3.3 g) serving as the 1 lb powder, so this count reuses that formulaId. Organic spirulina powder is the Sept 21 Caution Limited stamp. Not Avoid. Not Cleared. Limited-only never Avoid. Avoid needs High.',
    cite: 'Current Vitacost NOW Foods, Certified Organic Spirulina Powder, 4 oz (113 g) (https://www.vitacost.com/products/now-foods-certified-organic-spirulina-powder-4-oz-113-g-117491) ingredients: Organic spirulina powder. Serving 1 level tsp (3.3 g). UPC-A 733739026903. nowfoods.com blocked (Cloudflare). Live Amazon US exact pack via UPC 733739… when listed.',
  },
  {
    id: 'now-eve-superior-womens-multi-180-tablets',
    productName: "EVE™, Superior Women's Multi, 180 Tablets",
    category: 'Vitamins',
    barcode: '733739037978',
    formulaId: 'now-eve-superior-womens-multi-180-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    actives: EVE_ACTIVES,
    flags: EVE_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are spirulina extract inside the named vegetarian coating (Sept 21 Caution Limited; color in a multi; FDA color allow is not Clean), oral xylitol, the unlabeled MCT coat token, and silicon dioxide (0-pt cap). The coating is named, so it is not the blank Vegetarian Coating Caution row. Calcium carbonate in that coat is the Cleared OI filler, distinct from the labeled calcium active. Riboflavin in that coat is the Cleared color row. The following sentence "MCT oil from coconut/palm kernel oil" is the Cleared named-MCT row, not an oil-bottle grade. "Vitamin E from non-GMO soy (highly refined)" is an active-source line, not Limited bare soy. "Not manufactured with whet, gluten…" is an absence line (label typo whet), not bare wheat. Distinct from the EVE softgels (flax seed oil + carob). Limited-only never Avoid. Avoid needs High.',
    cite: "Current Vitacost NOW Foods, EVE™, Superior Women's Multi, 180 Tablets (https://www.vitacost.com/products/now-foods-eve-superior-women-s-multi-180-tablets-16541) other-ingredients: Microcrystalline cellulose, hydroxypropyl cellulose, vegetarian coating [hypromellose (cellulose), calcium carbonate, xylitol, mct oil (medium-chain triglycerides), spirulina extract, riboflavin], stearic acid (vegetable source), silicon dioxide, and croscarmellose sodium. Vitamin E from non-GMO soy (highly refined). MCT oil from coconut/palm kernel oil. UPC-A 733739037978. nowfoods.com blocked (Cloudflare). Live Amazon US exact pack via UPC 733739… when listed.",
  },
  {
    id: 'now-eve-tablets-superior-womens-multi-90',
    productName: "Eve™ Tablets, Superior Women's Multi, 90 Tablets",
    category: 'Vitamins',
    barcode: '733739037961',
    formulaId: 'now-eve-superior-womens-multi-180-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    actives: EVE_ACTIVES,
    flags: EVE_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same other-ingredients and the same labeled amounts as the 180-ct tablets (Vitamin A 3,000 mcg, vitamin C 300 mg, vitamin D 25 mcg, iron 18 mg; serving 3 tablets), so this count reuses that formulaId. The 90-ct calcium active says Aquamin TG and the 180-ct says Aquamin; both are 250 mg and neither string is an Other Ingredient. Drivers remain spirulina extract (Sept 21 Caution Limited), oral xylitol, unlabeled MCT, and silicon dioxide. "Not manufactured with wheat…" is an absence line, not bare wheat. "Vitamin E from non-GMO soy (highly refined)" is an active-source line, not Limited bare soy. Limited-only never Avoid. Avoid needs High.',
    cite: "Current Vitacost NOW Foods, Eve™ Tablets, Superior Women's Multi, 90 Tablets (https://www.vitacost.com/products/now-foods-eve-tablets-superior-women-s-multi-90-tablets-574) other-ingredients: Microcrystalline cellulose, hydroxypropyl cellulose, vegetarian coating [hypromellose (cellulose), calcium carbonate, xylitol, mct oil (medium-chain triglycerides), spirulina extract, riboflavin], stearic acid (vegetable source), silicon dioxide, and croscarmellose sodium. Vitamin E from non-GMO soy (highly refined). MCT oil from coconut/palm kernel oil. UPC-A 733739037961. nowfoods.com blocked (Cloudflare). Live Amazon US exact pack via UPC 733739… when listed.",
  },
];

export const BATCH75_KYR6_SPIRULINA_CAUTION: RatingRecord[] = COMPACT.map(expand);

export const BATCH75_SKIPPED: { sku: string; reason: string }[] = [
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
    sku: 'N=23 — every Search row already written in batch74-kyr6-now-token-stamp-backfill.ts',
    reason: 'SKIPPED already-written batch74 (do not duplicate / do not restage)',
  },
  {
    sku: 'NOW Foods, Spirulina, 120 Veg Capsules (500 mg per Capsule)',
    reason:
      'SKIPPED already-on-MAIN batch71 `now-spirulina-120`. Spirulina is the labeled active. Other ingredients are hypromellose and stearic acid, not the refused organic spirulina powder token. UPC-A 733739027023.',
  },
  {
    sku: 'NOW Foods, Certified Organic Flax Seed Oil, 12 fl oz (355 ml)',
    reason:
      'SKIPPED oil pour hunt-list only. Never grade. https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-12-fl-oz-355-ml-1135',
  },
  {
    sku: 'NOW Foods, Certified Organic Flax Seed Oil, 24 fl oz (710 ml)',
    reason:
      'SKIPPED oil pour hunt-list only. Never grade. https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-24-fl-oz-710-ml-13178',
  },
];

export const BATCH75_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'TopCare adult multi gummies (Orange / Cherry / Berry)',
    reason:
      'REFUSED. Exact string `Spirulina` inside Colors (Cranberry Concentrate, Carrot, Spirulina, and Pumpkin Concentrate, Paprika Extract, Lycopene). That string is not the locked tokens "spirulina powder", "Organic spirulina powder", or "spirulina extract". Do not alias. Exact string `Palm Oil` on the same gummy print (with Carnauba Wax). Gummy Palm Oil is not the Cleared Organic Palm Oil tablet-coating row. No graded oils. No Search row. No UPC attached.',
  },
  {
    sku: "TopCare Women's multi gummies (Mixed Berry)",
    reason:
      'REFUSED. Exact string `Spirulina` inside Colors (Carrot and Cranberry Concentrate, Carrot, Spirulina and Pumpkin Concentrate, Lycopene). That string is not the locked tokens "spirulina powder", "Organic spirulina powder", or "spirulina extract". Do not alias. Exact string `Palm oil` on the same gummy print (with Carnauba Wax). Gummy Palm oil is not the Cleared Organic Palm Oil tablet-coating row. No graded oils. No Search row. UPC 036800488212 seen earlier is not attached.',
  },
];

export const BATCH75_OIL_HUNT: { name: string; url: string }[] = [
  {
    name: 'NOW Foods, Certified Organic Flax Seed Oil, 12 fl oz (355 ml)',
    url: 'https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-12-fl-oz-355-ml-1135',
  },
  {
    name: 'NOW Foods, Certified Organic Flax Seed Oil, 24 fl oz (710 ml)',
    url: 'https://www.vitacost.com/products/now-foods-certified-organic-flax-seed-oil-24-fl-oz-710-ml-13178',
  },
];

const _ROWS = BATCH75_KYR6_SPIRULINA_CAUTION;
if (_ROWS.length !== 4) throw new Error('batch75 tally drift: expected 4 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch75 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 4) {
  throw new Error('batch75 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch75 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch75 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch75 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch75 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) {
  throw new Error('batch75 writes NOW only');
}
if (_ROWS.some((r) => r.barcode && !/^733739\d{6}$/.test(r.barcode))) {
  throw new Error('batch75 invented or non-NOW UPC');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 2) {
  throw new Error('batch75 REUSE-formula tally drift');
}
const _powder4 = _ROWS.find((r) => r.id === 'now-organic-spirulina-powder-4');
if (!_powder4 || _powder4.formulaId !== 'now-organic-spirulina-powder-1') {
  throw new Error('batch75 4 oz powder must reuse the 1 lb formula');
}
const _eve90 = _ROWS.find((r) => r.id === 'now-eve-tablets-superior-womens-multi-90');
if (!_eve90 || _eve90.formulaId !== 'now-eve-superior-womens-multi-180-tablets') {
  throw new Error('batch75 EVE 90 tablets must reuse the 180 tablet formula');
}
if (_ROWS.some((r) => !r.inactiveIngredients.some((i) => /spirulina/i.test(i.name)))) {
  throw new Error('batch75 every row needs a spirulina powder or extract token');
}
if (
  _ROWS.some((r) =>
    r.inactiveIngredients.some((i) =>
      /hydrated silica|stevia rebaudiana|toothpaste|papain|cinnamon .*leaf oil/i.test(i.name),
    ),
  )
) {
  throw new Error('batch75 must not write toothpaste unknowns');
}
if (!BATCH75_SKIPPED.some((s) => /already-written batch71/i.test(s.reason))) {
  throw new Error('batch75 must skip already-written batch71');
}
if (!BATCH75_SKIPPED.some((s) => /already-written batch72/i.test(s.reason))) {
  throw new Error('batch75 must skip already-written batch72');
}
if (!BATCH75_SKIPPED.some((s) => /already-written batch73/i.test(s.reason))) {
  throw new Error('batch75 must skip already-written batch73');
}
if (!BATCH75_SKIPPED.some((s) => /already-written batch74/i.test(s.reason))) {
  throw new Error('batch75 must skip already-written batch74');
}
if (!BATCH75_SKIPPED.some((s) => /now-spirulina-120/i.test(s.reason))) {
  throw new Error('batch75 must skip the already-on-MAIN spirulina capsules');
}
if (!BATCH75_REFUSED.some((s) => /exact string `Spirulina`/i.test(s.reason))) {
  throw new Error('batch75 must list bare Spirulina as the refused string');
}
if (!BATCH75_REFUSED.some((s) => /exact string `Palm Oil`/i.test(s.reason))) {
  throw new Error('batch75 must list gummy Palm Oil as the refused string');
}
if (!BATCH75_REFUSED.some((s) => /exact string `Palm oil`/i.test(s.reason))) {
  throw new Error('batch75 must list gummy Palm oil as the refused string');
}
if (BATCH75_OIL_HUNT.length !== 2) {
  throw new Error('batch75 flax pour bottles stay on the hunt list');
}
if (_ROWS.some((r) => /essential oils?|flax seed oil/i.test(r.productName))) {
  throw new Error('batch75 must not grade oil pour bottles');
}
if (
  _ROWS.some((r) =>
    /nutricost|naturewise|welmate|a\+health|healtha2z|time-cap|goodsense|sprouts|toothpaste/i.test(
      r.brand + r.productName,
    ),
  )
) {
  throw new Error('batch75 leftover 3P / Sprouts / toothpaste must stay out');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch75 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited')) {
    throw new Error(`batch75 Caution without Limited on ${record.id}`);
  }
}
