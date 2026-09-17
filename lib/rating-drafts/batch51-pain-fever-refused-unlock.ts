// DRAFT / not verified / batch 51 PR #98 refused-unlock WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack sizes
// of the same name+form+inactives share formulaId. Same OI+actives
// share formulaId. Form is labeled on cleanAlternatives, not a hard
// filter (§6). Not wired into Clean Picks UI. No live Clean Picks
// file is edited. Do NOT restore Biofreeze Clean Picks. No photos.
// Letter tiles only on new ids. No fake Clean alts. No methodology
// rewrite. No Sprouts. Do NOT rewrite batches 41–50.
//
// GATE: write a PR #98 refused SKU only when every current DailyMed
// OI token matches an exact §5 Additive column / “also appears as”
// / locked exact-INCI line. Cousin-matching is NOT enough.
// Tetrasodium EDTA ≠ Cleared disodium EDTA. calcined kaolin ≠
// Cleared kaolin. ammonium hydroxide ≠ Strong ammonia solution.
//
// TALLY (unverified drafts in THIS file): 3 rows — Clean 0 /
// Caution 1 / Avoid 2.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batch 41: Precise creams/patch + AleveX
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel
// Batch 44 list-2 (13 rows)
// Batch 45 remaining (18 rows)
// Batch 46: Tiger Balm Pain Relieving Patch + Hydrogel Patch +
//   Neck & Shoulder vanishing scent Avoid
// Batch 47: Icy Hot / Aspercreme leftover + Salonpas lidocaine
//   gel-patch / FLEX / Pain Relieving Patch + LARGE
// Batch 48: remaining Salonpas / Tiger Balm
// Batch 49 list-2: UltraFlex / UltraFlex Plus / Capzasin Quick
//   Relief / Mineral Ice Extreme Spray
// Batch 50 list-3: Biofreeze / Bengay cream+gel+lido / Capzasin HP
//   / Mineral Ice Extreme gel + stick / Absorbine Jr.
//
// WRITTEN from the PR #98 refused list (current DailyMed OI):
// - Biofreeze Foot Cream (32450cbf): Tetrasodium EDTA is now the
//   locked exact Caution INCI (not Cleared disodium EDTA). Caution.
//   Own formulaId — do not clone biofreeze-pain-relief-cream.
// - Bengay Ultra Strength Pain Relieving Patch 5% (f57ccc33):
//   calcined kaolin is now the locked exact Caution INCI (not
//   Cleared kaolin). Avoid (parabens + TiO2 High).
// - Mineral Ice Original Therapeutic Menthol Gel 2% (7b30076a):
//   ammonium hydroxide is now the locked exact Caution token (not
//   Strong ammonia). Avoid (Blue 1 High). 8 oz + 16 oz share
//   formulaId. Do not clone mineral-ice-extreme-gel.
//
// REFUSED (still missing an exact §5 row — do not invent): none
// from the three PR #98 leftover SKUs. All current DailyMed OI
// lines grade under current locks.

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
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
  'Safeway',
] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / capsicum / benzyl alcohol / trolamine salicylate / phenol actives stay parked (no invented active-safety cap). Inactives graded only.';

const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this cream / stick / spray fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglyceride and does not name coconut. We mark that Limited because the source isn’t clear. This cream fill is not the gummy seed-oil High rule.';

const METH = {
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  ipa: 'Methodology §5 Limited-risk (isopropyl alcohol — IPA / isopropanol; alcohol-vehicle family; locked Sept 15, 2026). Not Avoid.',
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  caprylyl:
    'Methodology §5 Limited-risk (caprylyl glycol / hexanediol / sorbic acid — Limited preservative family; locked Sept 14, 2026)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  ps60: 'Methodology §5 Moderate-risk (polysorbate 60 — same Moderate family as P80 / P20)',
  tetraEdta:
    'Methodology §5 Caution (Tetrasodium EDTA — exact INCI; distinct from Cleared disodium EDTA trace; standalone Caution, not Avoid; locked Sept 15, 2026)',
  calcinedKaolin:
    'Methodology §5 Caution (calcined kaolin — exact INCI; distinct from Cleared kaolin; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ammoniumHydroxide:
    'Methodology §5 Caution (ammonium hydroxide — exact words; distinct from Strong ammonia solution; do not alias; standalone Caution, not Avoid; locked Sept 15, 2026)',
  botanical:
    'Methodology §5 Caution (topical botanical extracts/oils used as inactives — arnica; burdock; boswellia resin extract; calendula extract or flower oil; camellia leaf oil/extract; ilex; lemon balm; chamomile; echinacea; juniper; white tea; wormwood extract; wormwood oil; ginger extract; camphor leaf oil; gaultheria fragrantissima oil; spearmint bare — fragrance/EO line; locked Sept 15, 2026). Do not Clear just because they are plants.',
  hydroxyaceto:
    'Methodology §5 Caution (hydroxyacetophenone — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ipbc:
    'Methodology §5 Caution (IPBC / iodopropynyl butylcarbamate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  acrylate:
    'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid, topical gel polymer — standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylateStarch:
    'Methodology §5 Caution (sodium polyacrylate starch — exact INCI; distinct from sodium polyacrylate / polyacrylic acid; standalone Caution, not Avoid; locked Sept 15, 2026)',
  sorbitanOleate:
    'Methodology §5 Caution (sorbitan oleate / sorbitan monooleate, topical — standalone Caution, not additive-scored, not Avoid)',
  thymol:
    'Methodology §5 Caution (thymol — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  grapeSeed: `Methodology §5 Cleared (grape seed oil as cream fill — named single oil as cream vehicle; not gummy High; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  gluconolactone:
    'Methodology §5 Cleared (gluconolactone — exact INCI; locked Sept 15, 2026)',
  ssl: 'Methodology §5 Cleared (sodium stearoyl lactylate — exact INCI; stearate-family emulsifier; distinct from sodium stearoyl glutamate; locked Sept 15, 2026)',
  mgSulfate:
    'Methodology §5 Cleared (magnesium sulfate — exact INCI; locked Sept 15, 2026)',
  cuSulfate:
    'Methodology §5 Cleared (copper sulfate / cupric sulfate — both spellings; exact tokens; locked Sept 15, 2026)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer / carbomer copolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol / cetostearyl alcohol — fatty-alcohol family)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate / glyceryl monostearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  dimethicone:
    'Methodology §5 Cleared (dimethicone / dimethicone copolyol — locked Sept 14, 2026)',
  tocopherol:
    'Methodology §5 Cleared (mixed tocopherols / tocopheryl acetate / alpha-tocopherol acetate as antioxidants — locked v1.6)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster — locked Sept 14, 2026)',
  cellulose:
    'Methodology §5 Cleared (cellulose gum / carboxymethylcellulose sodium — MCC / cellulose-family filler)',
  tartaric: 'Methodology §5 Cleared (tartaric acid / L-tartaric acid — organic acid with citric; locked Sept 15, 2026)',
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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ARNICARE_GEL = 'boiron-arnicare-gel';

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / balm / ointment / roll-on / spray / patch / foam / stick / pen — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine cream invented.',
  ),
];

const SET = {
  foot: '32450cbf-4ed4-402b-a30e-e08a17bba3fb',
  bengayPatch: 'f57ccc33-400b-4401-a348-c54d1eb9f5d0',
  miOrig: '7b30076a-0af6-2f74-e053-2a91aa0ae08d',
} as const;

const ID = {
  foot: 'biofreeze-foot-cream',
  bengayPatch: 'bengay-ultra-strength-patch-5',
  miOrig: 'mineral-ice-original-gel-2',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

export const BATCH51_PAIN_FEVER_REFUSED_UNLOCK: RatingRecord[] = [
  row({
    id: ID.foot,
    productName: 'Biofreeze Foot Cream',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: ID.foot,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [{ name: 'Menthol', strength: '10%' }],
    inactiveIngredients: [
      flag(
        'Caprylic/Capric Triglyceride',
        'limited',
        dailymed(SET.foot, METH.mctUnlabeled),
      ),
      flag('Caprylyl Glycol', 'limited', dailymed(SET.foot, METH.caprylyl)),
      flag('Cetearyl Alcohol', 'cleared', dailymed(SET.foot, METH.fattyAlcohol)),
      flag('Dimethicone', 'cleared', dailymed(SET.foot, METH.dimethicone)),
      flag('Gluconolactone', 'cleared', dailymed(SET.foot, METH.gluconolactone)),
      cleared(SET.foot, 'Glycerin'),
      flag(
        'Glyceryl Stearate',
        'cleared',
        dailymed(SET.foot, METH.glycerylStearate),
      ),
      flag(
        'Hydroxyacetophenone',
        'cleared',
        dailymed(SET.foot, METH.hydroxyaceto),
      ),
      flag(
        'Ilex Paraguariensis Leaf Extract',
        'cleared',
        dailymed(SET.foot, METH.botanical),
      ),
      flag(
        'Iodopropynyl Butylcarbamate',
        'cleared',
        dailymed(SET.foot, METH.ipbc),
      ),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.foot, METH.phenoxy)),
      flag('Polysorbate 60', 'moderate', dailymed(SET.foot, METH.ps60)),
      flag('Sodium Benzoate', 'limited', dailymed(SET.foot, METH.benzoate)),
      flag('Sodium Hydroxide', 'cleared', dailymed(SET.foot, METH.naoh)),
      flag(
        'Sodium Stearoyl Lactylate',
        'cleared',
        dailymed(SET.foot, METH.ssl),
      ),
      flag('Tetrasodium EDTA', 'cleared', dailymed(SET.foot, METH.tetraEdta)),
      flag('Tocopheryl Acetate', 'cleared', dailymed(SET.foot, METH.tocopherol)),
      flag(
        'Vitis Vinifera (Grape) Seed Oil',
        'cleared',
        dailymed(SET.foot, METH.grapeSeed),
      ),
      cleared(SET.foot, 'Water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Foot Cream = Caution. Tetrasodium EDTA is the locked exact Caution INCI (distinct from Cleared disodium EDTA trace — that was the PR #98 refuse string). Ilex extract / IPBC / hydroxyacetophenone / phenoxyethanol standalone Caution. Polysorbate 60 is Moderate. Caprylic/capric triglyceride is unlabeled-MCT Limited. Caprylyl glycol / sodium benzoate Limited. Grape seed oil is the named cream-vehicle Cleared oil (not gummy High). ${CREAM_OIL_TAP} No High. Own formulaId — do not clone biofreeze-pain-relief-cream (that SPL has alcohol / IPA / PEG-4 laurate / calcium gluconate / edetate sodium and no Tetrasodium EDTA). 3 oz (NDC 59316-001-10) + 4 oz (NDC 59316-001-20) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.foot} (NDC 59316-001) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.bengayPatch,
    productName: 'Bengay Ultra Strength Pain Relieving Patch 5%',
    brand: 'Bengay',
    category: PAIN_FEVER,
    barcode: '074300081496',
    formulaId: ID.bengayPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [{ name: 'Menthol', strength: '5%' }],
    inactiveIngredients: [
      flag(
        'calcined kaolin',
        'cleared',
        dailymed(SET.bengayPatch, METH.calcinedKaolin),
      ),
      flag(
        'cellulose gum',
        'cleared',
        dailymed(SET.bengayPatch, METH.cellulose),
      ),
      cleared(SET.bengayPatch, 'glycerin'),
      flag(
        'methyl acrylate/2-ethylhexyl acrylate copolymer',
        'cleared',
        dailymed(SET.bengayPatch, METH.acrylate),
      ),
      flag('methylparaben', 'high', dailymed(SET.bengayPatch, METH.parabens)),
      flag(
        'polyacrylic acid',
        'cleared',
        dailymed(SET.bengayPatch, METH.polyacrylate),
      ),
      flag('polysorbate 80', 'moderate', dailymed(SET.bengayPatch, METH.ps80)),
      flag('propylparaben', 'high', dailymed(SET.bengayPatch, METH.parabens)),
      flag('silica', 'cleared', dailymed(SET.bengayPatch, METH.sio2)),
      flag(
        'sodium polyacrylate',
        'cleared',
        dailymed(SET.bengayPatch, METH.polyacrylate),
      ),
      flag(
        'sodium polyacrylate starch',
        'cleared',
        dailymed(SET.bengayPatch, METH.polyacrylateStarch),
      ),
      flag(
        'sorbitan oleate',
        'cleared',
        dailymed(SET.bengayPatch, METH.sorbitanOleate),
      ),
      flag('sorbitol', 'limited', dailymed(SET.bengayPatch, METH.sorbitol)),
      flag('tartaric acid', 'cleared', dailymed(SET.bengayPatch, METH.tartaric)),
      flag('titanium dioxide', 'high', dailymed(SET.bengayPatch, METH.tio2)),
      cleared(SET.bengayPatch, 'water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Bengay Ultra Strength Pain Relieving Patch 5% = Avoid. Drivers are methylparaben + propylparaben (High in every form, including patches) + titanium dioxide (High; no topical exception). calcined kaolin is the locked exact Caution INCI (distinct from Cleared kaolin — that was the PR #98 refuse string; do not Clear this patch on plain kaolin). Acrylate copolymer / polyacrylic acid / sodium polyacrylate / sodium polyacrylate starch / sorbitan oleate standalone Caution. Polysorbate 80 Moderate. Sorbitol Limited. Silica is the 0-pt SiO2 Caution cap. 1-ct (NDC 69968-0487-1) + 4-ct (NDC 69968-0487-4) share this formulaId — one Search row. Ages 12+ (under 12: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.bengayPatch} (NDC 69968-0487) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.miOrig,
    productName: 'Mineral Ice Original Therapeutic Menthol Gel 2%',
    brand: 'Mineral Ice',
    category: PAIN_FEVER,
    formulaId: ID.miOrig,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [{ name: 'Menthol', strength: '2%' }],
    inactiveIngredients: [
      flag(
        'ammonium hydroxide',
        'cleared',
        dailymed(SET.miOrig, METH.ammoniumHydroxide),
      ),
      flag('carbomer', 'cleared', dailymed(SET.miOrig, METH.carbomer)),
      flag('cupric sulfate', 'cleared', dailymed(SET.miOrig, METH.cuSulfate)),
      flag('FD&C blue no. 1', 'high', dailymed(SET.miOrig, METH.dyes)),
      flag('isopropyl alcohol', 'limited', dailymed(SET.miOrig, METH.ipa)),
      flag(
        'magnesium sulfate',
        'cleared',
        dailymed(SET.miOrig, METH.mgSulfate),
      ),
      cleared(SET.miOrig, 'purified water'),
      flag('sodium hydroxide', 'cleared', dailymed(SET.miOrig, METH.naoh)),
      flag('thymol', 'cleared', dailymed(SET.miOrig, METH.thymol)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Mineral Ice Original Therapeutic Menthol Gel 2% = Avoid. Driver is FD&C blue no. 1 (synthetic dye High). ammonium hydroxide is the locked exact Caution token (exact words; distinct from Strong ammonia solution — that was the PR #98 refuse string; do not alias). Thymol standalone Caution. Isopropyl alcohol Limited. Carbomer / cupric sulfate / magnesium sulfate / sodium hydroxide / water Cleared. 8 oz (NDC 0316-0226-08) + 16 oz (NDC 0316-0226-16) share this formulaId — one Search row. Own formulaId — do not clone mineral-ice-extreme-gel (10% menthol; different OI). Ages 2+ (under 2: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.miOrig} (NDC 0316-0226) — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

export const BATCH51_REFUSED = [] as const;

const FOOT = BATCH51_PAIN_FEVER_REFUSED_UNLOCK.find((r) => r.id === ID.foot);
const BENGAY = BATCH51_PAIN_FEVER_REFUSED_UNLOCK.find(
  (r) => r.id === ID.bengayPatch,
);
const MI = BATCH51_PAIN_FEVER_REFUSED_UNLOCK.find((r) => r.id === ID.miOrig);

if (BATCH51_PAIN_FEVER_REFUSED_UNLOCK.length !== 3) {
  throw new Error('batch 51 must write exactly 3 PR #98 leftover Search rows');
}
if (BATCH51_PAIN_FEVER_REFUSED_UNLOCK.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 51 Clean tally is 0');
}
if (BATCH51_PAIN_FEVER_REFUSED_UNLOCK.filter((r) => r.verdict === 'caution').length !== 1) {
  throw new Error('batch 51 Caution tally is 1');
}
if (BATCH51_PAIN_FEVER_REFUSED_UNLOCK.filter((r) => r.verdict === 'avoid').length !== 2) {
  throw new Error('batch 51 Avoid tally is 2');
}
if (BATCH51_PAIN_FEVER_REFUSED_UNLOCK.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 51 stays on Pain & Fever');
}
const BATCH51_CATCHUP_BARCODES: Record<string, string> = {
  [ID.bengayPatch]: '074300081496',
};
for (const record of BATCH51_PAIN_FEVER_REFUSED_UNLOCK) {
  const expected = BATCH51_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 51 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 51 must not invent barcodes on ${record.id}`);
  }
}
if (BATCH51_PAIN_FEVER_REFUSED_UNLOCK.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 51 recordStatus must stay unverified');
}
function mustDiffer(a: string | undefined, b: string | undefined, msg: string) {
  if (a && b && a === b) throw new Error(msg);
}
if (FOOT?.formulaId !== ID.foot) {
  throw new Error('Foot Cream pack sizes must share the Foot Cream formulaId');
}
if (BENGAY?.formulaId !== ID.bengayPatch) {
  throw new Error('Bengay patch pack sizes must share the patch formulaId');
}
if (MI?.formulaId !== ID.miOrig) {
  throw new Error('Mineral Ice 8 oz + 16 oz must share the original-gel formulaId');
}
mustDiffer(FOOT?.formulaId, 'biofreeze-pain-relief-cream', 'Foot Cream must not clone the jar-cream formulaId');
mustDiffer(BENGAY?.formulaId, 'bengay-ultra-strength-nongreasy', 'Bengay patch must not clone the Non-Greasy cream formulaId');
mustDiffer(MI?.formulaId, 'mineral-ice-extreme-gel', 'Original 2% gel must not clone Mineral Ice Extreme gel');
if (FOOT?.verdict !== 'caution') {
  throw new Error('Foot Cream must stay Caution (no High)');
}
if (BENGAY?.verdict !== 'avoid') {
  throw new Error('Bengay patch must stay Avoid (parabens + TiO2 High)');
}
if (MI?.verdict !== 'avoid') {
  throw new Error('Mineral Ice Original must stay Avoid (Blue 1 High)');
}
if (MI?.minAge !== 2) {
  throw new Error('Mineral Ice Original is labeled 2+');
}
if (
  !FOOT?.inactiveIngredients.some((item) => item.name === 'Tetrasodium EDTA')
) {
  throw new Error('Foot Cream must list Tetrasodium EDTA (not disodium EDTA)');
}
if (
  !BENGAY?.inactiveIngredients.some((item) => item.name === 'calcined kaolin')
) {
  throw new Error('Bengay patch must list calcined kaolin (not plain kaolin)');
}
if (
  !MI?.inactiveIngredients.some((item) => item.name === 'ammonium hydroxide')
) {
  throw new Error('Mineral Ice Original must list ammonium hydroxide (not Strong ammonia)');
}
if (BATCH51_REFUSED.length !== 0) {
  throw new Error('batch 51 refused list must stay empty — all 3 PR #98 leftover SKUs grade');
}

// Verdict tally (3 records): Clean 0 · Caution 1 · Avoid 2
// Written: Biofreeze Foot Cream (Caution) + Bengay Ultra Strength
//   Patch 5% (Avoid) + Mineral Ice Original 2% gel (Avoid; 8/16 oz
//   share formulaId)
// Reuse: batches 41–50 untouched
// Refused still-missing exact §5: none from the three PR #98 leftovers
