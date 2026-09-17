// DRAFT / not verified / batch 64 KYR6 Thrive no_OI stash
// CLOSEOUT WRITE / methodology v1.6 + current main §5 exact
// Additive / “also appears as” / locked exact-INCI rows only.
// Founder carton OI (Sept 17) + founder grades. No invented
// grades. No cousin-match. Founder owns final Avoid vs Caution
// vs Clean.
//
// ONE write. These founder-carton rows ONLY. recordStatus is
// 'unverified' on every row. Internal keys only: clean |
// caution | avoid. UPC attached only when carton / brand site /
// Thrive PDP / DailyMed / DSLD has a real barcode — no invented
// codes. Missing code ≠ no row (omit barcode). Pack sizes of
// the same name+form+inactives share formulaId. Form is labeled
// on cleanAlternatives, not a hard filter (§6). Search wiring
// only. Not wired into Clean Picks UI. No photos. Letter tiles
// only on new ids. No fake Clean alts. No methodology wipe.
// PROJECT_NOTES tally-only (do not wipe LIVE NOW).
//
// DO NOT REOPEN / DO NOT CLONE: batch59 241 · batch60 36 ·
// PR #116 / #117 · Amazon batches 61–63 / PR #118–#120.
// Do not touch KYR5 / barcode factory / barcode chunks.
// Do not write Butterfly Pea. Do not write All Terrain
// bandages. Do not write shopping-list bundles. Do not write
// Liver Vitality without an honest Supplement Facts panel.
//
// LOCKS used (exact §5 + founder grades): 100% powder / no OI
// = Clean. Organic Myceliated Oats Cleared food-state (if the
// mushroom is the SF active it is not OI). Natural flavors =
// Limited → product Caution. SiO2 / silica = 0-pt Caution cap.
// Reb A / Reb M = Cleared high-purity steviol glycosides.
// Named plant / fruit color (Exberry grape; blue spirulina;
// turmeric + beet juice powder as color) Cleared. Ascorbyl
// palmitate Cleared (mixed-tocopherols / ascorbyl palmitate
// antioxidants — already on MAIN). Methylcellulose / HPMC /
// MCC / Mg stearate / KCl / cane sugar / citric / malic /
// gum arabic / glycerin / lecithin Cleared. Organic palm oil
// as tablet / chew coating Cleared + tap (NOT a gummy; not
// High). Organic tapioca maltodextrin Limited. Alcohol /
// cane spirits as vehicle Limited. Tea tree / lemon / thuja
// (cedarleaf) / thyme / clove oils in a topical blend =
// EO / scent Caution (bottle over DailyMed). Lithium
// Magnesium Sodium Silicate Caution (not SiO2 cap). Sodium
// Hypochlorite (Trace) Caution. Electrolyzed Water / NaCl /
// NaHCO3 / Phosphates / Sodium Sulfate Cleared. Display keys
// stay clean / caution / avoid.
//
// TALLY (unverified drafts in THIS file): 18 rows — Clean 8 /
// Caution 10 / Avoid 0. NEW 18 / REUSE 0 / SKIPPED-OUT 6.
//
// Independently Clean analogs already on main (not cloned):
// om-lions-mane-powder · om-master-blend-capsules ·
// trace-concentrace-drops · wellmade-organic-acacia-fiber ·
// amazon-basic-care-triple-pain-ointment ·
// codeage-womens-fermented-multi · codeage-teen-multi ·
// gol-vitamin-code-raw-c · ollois-arnica-montana-12c ·
// thorne-creatine-powder · new-chapter-elderberry-syrup.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const FIRST_AID = 'First Aid';
const ALLERGIES = 'Allergies';

const THRIVE = ['Thrive Market'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const PALM_COAT_TAP =
  'Seed/industrial oils are flagged in gummies. Organic Palm Oil as a tablet / chewable coating is not that High rule. Gummy print of palm stays High. This SKU is a chewable tablet, not a gummy.';

const ALCOHOL_TAP =
  'Alcohol / cane spirits as the oral-homeopathic or extract vehicle is Limited, not Avoid. Tap: alcohol is the vehicle, not the gummy High.';

const EO_BLEND_TAP =
  'Named single oil as the topical BASE or FILL is Cleared. Botanical oil used as scent in a blend is Caution (fragrance / EO line). This wart bottle is an EO blend — not a single-oil vehicle.';

const CEDAR_THUJA_TAP =
  'Bottle prints Thuja Oil. DailyMed inactive table maps that token to cedar leaf oil. Founder said bottle over DailyMed. Cedarleaf oil is the locked EO / scent Caution row. Do not invent a second thuja class.';

const ELECTROLYZED_TAP =
  'Electrolyzed Water is the locked HOCl / electrolyzed-saline vehicle (not the purified-water row; not a bleach bottle). Distinct from Caution Sodium Hypochlorite (Trace).';

const SILICATE_TAP =
  'Lithium Magnesium Sodium Silicate is the locked Laponite-class clay thickener. Silicate neighborhood with calcium silicate / magnesium trisilicate. Not the SiO2 nanoparticle cap. Not kaolin.';

const HYPOCHLORITE_TAP =
  'Sodium Hypochlorite (Trace) is the locked residual-oxidizer Caution token. FDA wound-wash allow ≠ Clean. Distinct from Cleared Electrolyzed Water.';

const PHOSPHATE_TAP =
  'Unnamed Phosphates in this gel sit on the phosphate-salt Cleared-by-class (dicalcium / tricalcium / potassium phosphate). Tap: not phosphoric acid. Do not invent a phosphoric-acid grade.';

const METH = {
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica / Silica (oral) — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity). Product display key is caution when this is the worst inactive (Limited-only never Avoid).',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  alcohol: `Methodology §5 Limited-risk (alcohol / ethyl alcohol / cane spirits as a VEHICLE — Limited, not Avoid). ${ALCOHOL_TAP}`,
  lemonOil:
    'Methodology §5 Limited-risk (named lemon oil as flavor — Limited, same class as natural flavors; locked Sept 14, 2026). In this topical EO blend the scent/EO Caution form rule also applies — product display key is caution either way.',
  teaTree: `Methodology §5 Caution (Tea Tree Leaf Oil / Melaleuca Alternifolia Leaf Oil / Tea Tree Oil — scent/EO rule; locked Sept 15, 2026; not Avoid). ${EO_BLEND_TAP}`,
  thuja: `Methodology §5 Caution (cedarleaf oil — exact token; EO / scent line; locked Sept 16, 2026; not Avoid). ${CEDAR_THUJA_TAP} ${EO_BLEND_TAP}`,
  thyme:
    'Methodology §5 Caution (clove oil / thymus / flower oils as lotion scent — fragrance/EO line; locked Sept 15, 2026; not Avoid)',
  clove:
    'Methodology §5 Caution (clove oil — fragrance/EO line; locked Sept 15, 2026; not Avoid)',
  silicate: `Methodology §5 Caution (Lithium Magnesium Sodium Silicate — Laponite-class clay thickener; silicate neighborhood; not SiO2 cap; not kaolin; locked Sept 17, 2026; not Avoid). ${SILICATE_TAP}`,
  hypochlorite: `Methodology §5 Caution (Sodium Hypochlorite (Trace) — residual oxidizer; FDA wound-wash allow ≠ Clean; locked Sept 17, 2026; not Avoid). ${HYPOCHLORITE_TAP}`,
  stevia:
    'Methodology §5 Cleared (stevia / steviol glycosides, high-purity extract / Rebaudioside A / Reb A / Rebaudioside M / Reb M — named siblings; not whole-leaf / crude stevia)',
  namedColor:
    'Methodology §5 Cleared (named plant / fruit-or-vegetable juice as color — Exberry grape; blue spirulina for color; turmeric and beet juice powder as color; black carrot / named juice-as-color family)',
  gums: 'Methodology §5 Cleared (xanthan gum, guar gum, gum arabic / acacia, pectin, gellan gum)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  methylcellulose:
    'Methodology §5 Cleared (methylcellulose — same family as hypromellose)',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / MCC / cellulose-family filler)',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate)',
  kcl: 'Methodology §5 Cleared (potassium chloride — salt / electrolyte; not a grade driver)',
  lecithin: 'Methodology §5 Cleared (lecithin — canola, soy, or sunflower)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6; not tocopheryl acetate)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts / malic / lactic / fumaric / adipic / tartaric)',
  sugar:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup / dextrose / sucrose / evaporated cane sugar / organic dextrose)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / distilled water / filtered water)',
  myceliatedOats:
    'Methodology §5 Cleared (Organic Myceliated Oats — food-state oat / ferment as inactive; if it is the mushroom active it is not an Other Ingredient; locked Sept 16, 2026)',
  palmCoat: `Methodology §5 Cleared (Organic Palm Oil / Palm Oil as tablet / chewable coating — NOT gummy High; locked Sept 16, 2026). ${PALM_COAT_TAP}`,
  electrolyzed: `Methodology §5 Cleared (Electrolyzed Water — HOCl / electrolyzed saline vehicle; not purified-water row; not a bleach bottle; locked Sept 17, 2026). ${ELECTROLYZED_TAP}`,
  salt: 'Methodology §5 Cleared (sodium chloride / sodium bicarbonate — saline bases; Sodium Sulfate sits in this salt / saline neighborhood; locked Sept 17, 2026)',
  sulfate:
    'Methodology §5 Cleared (Sodium Sulfate — salt / saline neighborhood with sodium chloride; locked Sept 17, 2026; distinct from Caution SLS)',
  phosphates: `Methodology §5 Cleared (Phosphates (unnamed, this gel) — phosphate-salt Cleared-by-class; locked Sept 17, 2026). ${PHOSPHATE_TAP}`,
  psyllium:
    'Methodology §5 Cleared (Psyllium Husk — fiber; inulin neighborhood; locked Sept 16, 2026)',
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

function f(
  cite: string,
  name: string,
  risk: IngredientFlag['riskLevel'],
  meth: string,
): IngredientFlag {
  return flag(name, risk, labelCite(cite, meth));
}

const CITE = {
  om_reishi_powder:
    'Founder carton OI (Sept 17) OM Reishi powder — 100% powder / no Other Ingredients line. iHerb / Target SF UPC 892392002027 prints Organic Reishi mycelial biomass & fruit body cultured on organic whole oats as the Supplement Facts active (2 g) — oats are the culture substrate under SF, not a separate OI token. Distinct from HelloPharmacist listings that reprint myceliated oats as OI. Distinct from batch60 om-lions-mane-powder (OI oats) and batch59 om-lions-mane-capsules.',
  om_turkey_tail_powder:
    'Founder carton OI (Sept 17) OM Turkey Tail powder other-ingredients: Organic Myceliated Oats. Target 3.5 oz UPC 892392002041 / pouch UPC 850030553287. Organic Turkey Tail mycelial biomass & primordia is the Supplement Facts active. Distinct from batch60 om-lions-mane-powder (own formulaId).',
  om_master_blend_powder:
    'Founder carton OI (Sept 17) OM Master Blend powder — mushroom + ashwagandha, no Other Ingredients line. Vitacost / Thrive powder UPC 856210008974 SF: Organic Mushroom Powder Blend cultured on organic whole oats (2 g) + Organic KSM-66 Ashwagandha (250 mg) as actives. Distinct from batch59 om-master-blend-capsules (vegetable cellulose; UPC 850011996720).',
  trace_blue_hawaiian:
    'Founder carton OI (Sept 17) Trace ConcenTrace Daily Mineral Powder Blue Hawaiian other-ingredients: Citric Acid, natural flavors (pineapple, coconut, and orange), Reb A, silica, Reb M (OnoSweet), MCC, blue spirulina (for color). Thrive / brand UPC 878941009457. Some retailer panels omit silica — founder carton includes it.',
  trace_mixed_berry:
    'Founder carton OI (Sept 17) Trace Mixed Berry other-ingredients: Organic cane sugar, non-GMO citric acid, natural flavors blend, gum arabic (Acacia senegal), Exberry grape (color), malic acid, Reb A, Reb M, silica. Matches Trace Electrolyte Stamina Power Pak Mixed Berry family (PureFormulas / iHerb UPC 878941002878). Not the Blue Raspberry ConcenTrace powder twin.',
  trace_shilajit:
    'Founder carton OI (Sept 17) Trace Shilajit capsules other-ingredients: Hypromellose, MCC, magnesium stearate, silicon dioxide. iHerb / Swanson 150 ct UPC 878941008900. Capsules — not Trace Shilajit gummies (different OI / form).',
  fon_wart_xs:
    'Founder carton OI (Sept 17) Forces of Nature Wart Extra Strength bottle other-ingredients: Tea Tree Oil, Lemon Oil, Thuja Oil, Thyme Oil, Clove Oil — bottle over DailyMed. Brand + Target UPC 830743009127. DailyMed setid 7c6b837e-aff9-4a77-99d6-a4d0f5dbd9f8 “Also Contains” matches the bottle; SPL inactive table prints CEDAR LEAF OIL for Thuja Oil. Older setid f50c719b (tarragon / no thyme) is not this carton.',
  anima_happiness:
    'Founder carton OI (Sept 17) Anima Mundi Happiness Tonic other-ingredients: Filtered water, vegetable glycerin, cane spirits. Brand SF-style panel: Mucuna / Albizia / Rhodiola / Ashwagandha / St. John\'s Wort liquid extracts are the labeled herbals (actives), not OI. No carton UPC harvested.',
  codeage_multi_collagen:
    'Founder carton OI (Sept 17) Codeage Multi Collagen other-ingredients: Methylcellulose Capsule, Ascorbyl Palmitate, Silicon Dioxide, MCC. Brand / Swanson / iHerb 90 ct UPC 860507000480. Ascorbyl palmitate is the locked mixed-tocopherols / ascorbyl palmitate Cleared antioxidant (v1.6) — already on MAIN §5.',
  codeage_platinum:
    'Founder carton OI (Sept 17) Codeage Platinum other-ingredients: Methylcellulose Capsule, Helix Liposomal Delivery (sunflower lecithin / phosphatidylcholine). Matches Codeage Women\'s Multivitamin Platinum brand / Target / Vitacost UPC 850068815975. Distinct from batch59 codeage-teen-multi-platinum (adds ascorbyl palmitate + SiO2 + MCC) and from Hair / NMN / Vitamin C Platinum rows.',
  codeage_teens_fermented:
    'Founder carton OI (Sept 17) Codeage Teens Fermented Multi other-ingredients: Methylcellulose Capsule, Potassium Chloride. Brand / Target / HelloPharmacist Teen Fermented Multivitamin+ UPC 853919008526. Distinct from batch59 codeage-teen-multi (850068815470) and codeage-teen-multi-platinum / men’s fermented 853919008519. No invented code.',
  gol_kids_sb:
    'Founder carton OI (Sept 17) Garden of Life Kids+ Strawberry Banana chewable other-ingredients: Clean Tablet Technology Blend (Organic Dextrose, Organic Tapioca Maltodextrin, Organic Sunflower Lecithin, Organic Palm Oil, Organic Guar Gum), Organic Strawberry Banana Flavor. Not a gummy. Distinct from batch59 gol-organic-kids-probiotics-berry-cherry (own formulaId). No carton UPC harvested.',
  gol_organic_fiber:
    'Founder carton OI (Sept 17) Garden of Life Unflavored Organic Fiber — no Other Ingredients. Brand Dr. Formulated Organic Fiber Unflavored; product code / UPC 658010118408. Fiber blend (acacia / orange peel / baobab / apple / cranberry) is the Supplement Facts active. Distinct from batch59 new-chapter-organic-fiber-gummies.',
  thrive_multi_collagen:
    'Founder carton OI (Sept 17) Thrive Market Multi-Collagen — no Other Ingredients. Thrive Market Non-GMO Multi-Collagen Peptides Unflavored (house). Collagen peptides are the labeled active. No carton UPC harvested. Distinct from flavored Thrive grass-fed collagen (cocoa / flavor / monk fruit — not this row).',
  himalaya_psyllium:
    'Founder carton OI (Sept 17) Himalaya Organic Psyllium — no Other Ingredients. Brand / Target Organic Psyllium Whole Husk 12 oz UPC 605069064033. Organic psyllium whole husk is the Supplement Facts / fiber active. Distinct from batch59 himalaya-stresscare.',
  ollois_histaminum:
    'Founder carton OI (Sept 17) Ollois Histaminum other-ingredients: Organic sucrose. PureFormulas / MyOTC 30C 80 pellets UPC 855717003161. Distinct from batch52 ollois-arnica-montana-12c (same sucrose string; that row stays Clean / reuse-only). Founder graded this SKU Caution.',
  thorne_creatine_flavored:
    'Founder carton OI (Sept 17) Thorne Creatine (flavored) other-ingredients: Natural Flavors, Citric Acid, Malic Acid, Turmeric and Beet Juice Powder (color), Rebaudioside M. Matches Thorne Creatine Pineapple Orange (SF906) iHerb / clinic UPC 693749015581. Distinct from batch28 thorne-creatine-powder (unflavored; no OI; Clean). Strawberry tub (UPC 693749015567) drops turmeric and keeps the same Limited flavor driver — shares formulaId when the flavor / named-color family holds.',
  asr_hydrogel:
    'Founder carton OI (Sept 17) Active Skin Repair hydrogel other-ingredients: Electrolyzed Water, Sodium Chloride, Lithium Magnesium Sodium Silicate, Sodium Bicarbonate, Phosphates, Sodium Sulfate, Sodium Hypochlorite (Trace). Thrive Medical-Grade Skin & Wound Repair Antimicrobial Hydrogel SKU / UPC 818582012102. Sept 17 electrolyzed-wash §5 tokens used as locked.',
} as const;

const BATCH64_CATCHUP_BARCODES: Record<string, string> = {
  'codeage-teens-fermented-multi': '853919008526',
};

const MINERAL_ALTS: CleanAlternative[] = [
  alt(
    'trace-concentrace-drops',
    'Independently Clean Trace ConcenTrace drops already on main (SF mineral active; no flavored OI). Form: drops vs powder — labeled, not a hard filter (§6). Do not invent a Clean flavored Trace powder.',
  ),
];

const SHILAJIT_ALTS: CleanAlternative[] = [
  alt(
    'om-lions-mane-powder',
    'Independently Clean OM Lion\'s Mane powder already on main (named myceliated oats only). Form: powder vs capsule — labeled, not a hard filter (§6). Cleanliness peer only; different active.',
  ),
];

const WART_ALTS: CleanAlternative[] = [
  alt(
    'amazon-basic-care-triple-pain-ointment',
    'Independently Clean Amazon Basic Care Triple + Pain (petrolatum only) already on main. Form: ointment vs drops — labeled, not a hard filter (§6). First Aid cleanliness peer only; not a wart-active swap.',
  ),
];

const TONIC_ALTS: CleanAlternative[] = [
  alt(
    'new-chapter-elderberry-syrup',
    'Independently Clean New Chapter Elderberry Syrup already on main. Form labeled, not a hard filter (§6). Cleanliness peer only; not an efficacy swap.',
  ),
];

const COLLAGEN_ALTS: CleanAlternative[] = [
  alt(
    'thrive-market-multi-collagen',
    'Independently Clean in-batch Thrive Market Multi-Collagen (no OI). Form: powder vs capsule — labeled, not a hard filter (§6).',
  ),
];

const KIDS_ALTS: CleanAlternative[] = [
  alt(
    'gol-vitamin-code-raw-c',
    'Independently Clean Garden of Life Vitamin Code RAW C already on main. Form: capsule vs chewable — labeled, not a hard filter (§6). Do not invent a Clean Kids+ chewable.',
  ),
];

const HISTAMINUM_ALTS: CleanAlternative[] = [
  alt(
    'ollois-arnica-montana-12c',
    'Independently Clean Ollois Arnica Montana 12C pellets already on main (organic sucrose only). Form: pellets. Different active (arnica vs histaminum); cleanliness peer only. Homeopathic — no efficacy claim.',
  ),
];

const CREATINE_ALTS: CleanAlternative[] = [
  alt(
    'thorne-creatine-powder',
    'Independently Clean Thorne Creatine powder already on main (unflavored; no OI). Form: powder. Same-brand Clean analog. Do not clone that formulaId.',
  ),
];

const HYDROGEL_ALTS: CleanAlternative[] = [
  alt(
    'amazon-basic-care-triple-pain-ointment',
    'Independently Clean Amazon Basic Care Triple + Pain already on main. Form: ointment vs hydrogel — labeled, not a hard filter (§6). First Aid cleanliness peer only.',
  ),
];

export const BATCH64_KYR6_THRIVE_NO_OI: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: 'om-reishi-powder',
    productName: 'Reishi Mushroom Superfood Powder',
    brand: 'OM',
    category: VITAMINS,
    barcode: '892392002027',
    formulaId: 'om-reishi-powder',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic reishi mycelial biomass & fruit body', strength: '2 g' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: OM Reishi powder = Clean. Founder carton is 100% powder / no Other Ingredients line. Oats named under Supplement Facts as the culture substrate stay with the mushroom active — not graded as OI. Distinct from batch60 om-lions-mane-powder (printed OI oats; own formulaId) and from batch59 capsules. Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'OM'],
    sourcesGeneral: [`${CITE.om_reishi_powder} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'om-turkey-tail-powder',
    productName: 'Turkey Tail Mushroom Superfood Powder',
    brand: 'OM',
    category: VITAMINS,
    barcode: '892392002041',
    formulaId: 'om-turkey-tail-powder',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic turkey tail mycelial biomass & primordia', strength: '2 g' },
    ],
    inactiveIngredients: [
      f(CITE.om_turkey_tail_powder, 'Organic myceliated oats', 'cleared', METH.myceliatedOats),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: OM Turkey Tail powder = Clean. Organic Myceliated Oats is the locked food-state oat / ferment Cleared token. The mushroom blend is the Supplement Facts active — not graded as OI. Distinct from batch60 om-lions-mane-powder (own formulaId). Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'OM'],
    sourcesGeneral: [`${CITE.om_turkey_tail_powder} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'om-master-blend-powder',
    productName: 'Master Blend Mushroom Superfood Powder',
    brand: 'OM',
    category: VITAMINS,
    barcode: '856210008974',
    formulaId: 'om-master-blend-powder',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic mushroom master blend', strength: '2 g' },
      { name: 'Organic KSM-66 ashwagandha extract (root)', strength: '250 mg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: OM Master Blend powder = Clean. Founder carton is mushroom + ashwagandha with no Other Ingredients line. Culture oats stay under Supplement Facts with the mushroom blend. Distinct from batch59 om-master-blend-capsules (vegetable cellulose; own formulaId / UPC). Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'OM'],
    sourcesGeneral: [`${CITE.om_master_blend_powder} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'codeage-womens-multi-platinum',
    productName: "Women's Multivitamin Platinum",
    brand: 'Codeage',
    category: VITAMINS,
    barcode: '850068815975',
    formulaId: 'codeage-womens-multi-platinum',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [
      { name: "Women's multivitamin platinum (vitamins / minerals / collagen / probiotics)", strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.codeage_platinum, 'Methylcellulose capsule', 'cleared', METH.methylcellulose),
      f(
        CITE.codeage_platinum,
        'Codeage Helix liposomal delivery (phospholipids from non-GMO sunflower lecithin, including phosphatidylcholine)',
        'cleared',
        METH.lecithin,
      ),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Codeage Platinum (Women's Multivitamin Platinum carton) = Clean. Methylcellulose / HPMC family + named sunflower phospholipid Helix fill (fill ≠ gummy High). No SiO2 on this panel. Distinct from batch59 codeage-teen-multi-platinum (SiO2 Caution) and from Hair / NMN / Vitamin C Platinum. Men's Platinum twin shares formulaId when the other-ingredients list holds. Draft, not verified. No dosing or medical advice. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Codeage'],
    sourcesGeneral: [`${CITE.codeage_platinum} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'codeage-teens-fermented-multi',
    productName: 'Teens Fermented Multi',
    brand: 'Codeage',
    category: VITAMINS,
    barcode: BATCH64_CATCHUP_BARCODES['codeage-teens-fermented-multi'],
    formulaId: 'codeage-teens-fermented-multi',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Teen fermented multivitamin', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.codeage_teens_fermented, 'Methylcellulose capsule', 'cleared', METH.methylcellulose),
      f(CITE.codeage_teens_fermented, 'Potassium chloride', 'cleared', METH.kcl),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Codeage Teens Fermented Multi = Clean. Methylcellulose capsule + potassium chloride (Cleared). Distinct from batch59 codeage-teen-multi and codeage-teen-multi-platinum (own formulaIds). Ages 12+ as labeled. Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Codeage'],
    sourcesGeneral: [`${CITE.codeage_teens_fermented} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'gol-unflavored-organic-fiber',
    productName: 'Unflavored Organic Fiber',
    brand: 'Garden of Life',
    category: DIGESTIVE,
    barcode: '658010118408',
    formulaId: 'gol-unflavored-organic-fiber',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic prebiotic fiber blend (acacia / orange peel / baobab / apple / cranberry)', strength: '5 g fiber' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Garden of Life Unflavored Organic Fiber = Clean. No Other Ingredients on the founder carton. The fiber blend is the Supplement Facts active. Distinct from citrus-flavored Organic Fiber and from batch59 fiber gummies. Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Garden of Life'],
    sourcesGeneral: [`${CITE.gol_organic_fiber} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'thrive-market-multi-collagen',
    productName: 'Multi-Collagen Peptides Unflavored',
    brand: 'Thrive Market',
    category: VITAMINS,
    formulaId: 'thrive-market-multi-collagen',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Multi-collagen peptides', strength: 'label serving' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Thrive Market Multi-Collagen = Clean. No Other Ingredients on the founder carton. Collagen peptides are the labeled active. Do not write flavored Thrive grass-fed collagen (cocoa / flavor / monk fruit). Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE],
    sourcesGeneral: [`${CITE.thrive_multi_collagen} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'himalaya-organic-psyllium',
    productName: 'Organic Psyllium Whole Husk',
    brand: 'Himalaya',
    category: DIGESTIVE,
    barcode: '605069064033',
    formulaId: 'himalaya-organic-psyllium',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic psyllium whole husk (Plantago ovata)', strength: '6 g' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Himalaya Organic Psyllium = Clean. No Other Ingredients on the founder carton. Psyllium husk is the fiber active (Cleared when it appears as OI; here it is SF). Distinct from batch59 himalaya-stresscare. Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Himalaya'],
    sourcesGeneral: [`${CITE.himalaya_psyllium} — ${UNVERIFIED_NOTE}`],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: 'trace-blue-hawaiian-powder',
    productName: 'ConcenTrace Daily Mineral Powder Blue Hawaiian',
    brand: 'Trace',
    category: VITAMINS,
    barcode: '878941009457',
    formulaId: 'trace-blue-hawaiian-powder',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'ConcenTrace trace minerals (CTM)', strength: '700 mg' },
    ],
    inactiveIngredients: [
      f(CITE.trace_blue_hawaiian, 'Citric acid', 'cleared', METH.citrate),
      f(
        CITE.trace_blue_hawaiian,
        'Natural flavors (pineapple, coconut, and orange)',
        'limited',
        METH.flavors,
      ),
      f(CITE.trace_blue_hawaiian, 'Reb A', 'cleared', METH.stevia),
      f(CITE.trace_blue_hawaiian, 'Silica', 'cleared', METH.sio2),
      f(CITE.trace_blue_hawaiian, 'Reb M (OnoSweet)', 'cleared', METH.stevia),
      f(CITE.trace_blue_hawaiian, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      f(CITE.trace_blue_hawaiian, 'Blue spirulina (for color)', 'cleared', METH.namedColor),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Trace Blue Hawaiian powder = Caution. Natural flavors Limited. Silica is the 0-pt nanoparticle Caution cap. Reb A / Reb M Cleared high-purity steviol glycosides. Blue spirulina (for color) is named plant-color Cleared. Distinct from Blue Raspberry / Blue Açai twins (own flavor strings). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Trace Minerals'],
    cleanAlternatives: MINERAL_ALTS,
    sourcesGeneral: [`${CITE.trace_blue_hawaiian} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'trace-mixed-berry-power-pak',
    productName: 'Electrolyte Stamina Power Pak Mixed Berry',
    brand: 'Trace',
    category: VITAMINS,
    barcode: '878941002878',
    formulaId: 'trace-mixed-berry-power-pak',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Vitamin C + electrolytes + ConcenTrace ionic trace minerals', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.trace_mixed_berry, 'Organic cane sugar', 'cleared', METH.sugar),
      f(CITE.trace_mixed_berry, 'Non-GMO citric acid', 'cleared', METH.citrate),
      f(CITE.trace_mixed_berry, 'Natural flavors blend', 'limited', METH.flavors),
      f(CITE.trace_mixed_berry, 'Gum arabic (Acacia senegal)', 'cleared', METH.gums),
      f(CITE.trace_mixed_berry, 'Exberry grape (color)', 'cleared', METH.namedColor),
      f(CITE.trace_mixed_berry, 'Malic acid', 'cleared', METH.citrate),
      f(CITE.trace_mixed_berry, 'Reb A', 'cleared', METH.stevia),
      f(CITE.trace_mixed_berry, 'Reb M', 'cleared', METH.stevia),
      f(CITE.trace_mixed_berry, 'Silica', 'cleared', METH.sio2),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Trace Mixed Berry = Caution. Natural flavors Limited. Silica is the 0-pt nanoparticle Caution cap. Exberry grape (color) is named fruit-color Cleared. Organic cane sugar / gum arabic / acids / Reb A / Reb M Cleared. Distinct from Blue Hawaiian powder (own formulaId). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Trace Minerals'],
    cleanAlternatives: MINERAL_ALTS,
    sourcesGeneral: [`${CITE.trace_mixed_berry} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'trace-shilajit-capsules',
    productName: 'Shilajit Capsules',
    brand: 'Trace',
    category: VITAMINS,
    barcode: '878941008900',
    formulaId: 'trace-shilajit-capsules',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Shilajit extract 20:1', strength: '1000 mg' },
      { name: 'ConcenTrace trace minerals', strength: '25 mg' },
    ],
    inactiveIngredients: [
      f(CITE.trace_shilajit, 'Hypromellose', 'cleared', METH.hpmc),
      f(CITE.trace_shilajit, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      f(CITE.trace_shilajit, 'Magnesium stearate', 'cleared', METH.stearic),
      f(CITE.trace_shilajit, 'Silicon dioxide', 'cleared', METH.sio2),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Trace Shilajit capsules = Caution. SiO2 cap. HPMC / MCC / magnesium stearate Cleared. Capsules — do not write Trace Shilajit gummies. Distinct from MegaFood Shilajit already on main. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Trace Minerals'],
    cleanAlternatives: SHILAJIT_ALTS,
    sourcesGeneral: [`${CITE.trace_shilajit} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'fon-wart-extra-strength',
    productName: 'Wart Extra Strength',
    brand: 'Forces of Nature',
    category: FIRST_AID,
    barcode: '830743009127',
    formulaId: 'fon-wart-extra-strength',
    audience: ADULT,
    minAge: 2,
    form: 'drops',
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
    activeIngredients: [
      { name: 'Thuja occidentalis', strength: '8X HPUS' },
      { name: 'Phytolacca americana', strength: '8X HPUS' },
      { name: 'Calendula officinalis', strength: '8X HPUS' },
    ],
    inactiveIngredients: [
      f(CITE.fon_wart_xs, 'Tea Tree Oil', 'cleared', METH.teaTree),
      f(CITE.fon_wart_xs, 'Lemon Oil', 'limited', METH.lemonOil),
      f(CITE.fon_wart_xs, 'Thuja Oil', 'cleared', METH.thuja),
      f(CITE.fon_wart_xs, 'Thyme Oil', 'cleared', METH.thyme),
      f(CITE.fon_wart_xs, 'Clove Oil', 'cleared', METH.clove),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Forces of Nature Wart Extra Strength = Caution. Founder said bottle over DailyMed: Tea Tree / Lemon / Thuja / Thyme / Clove oils. Those oils are an EO / scent blend (not a single-oil vehicle). Bottle Thuja Oil = DailyMed cedar leaf oil — cedarleaf oil Caution row; do not invent a second thuja class. Homeopathic — cleanliness only, no efficacy claim. Distinct from batch60 Cold & Flu Max / Sinus Max. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${EO_BLEND_TAP} ${CEDAR_THUJA_TAP}`,
    retailers: [...THRIVE, 'Forces of Nature'],
    cleanAlternatives: WART_ALTS,
    sourcesGeneral: [`${CITE.fon_wart_xs} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'anima-mundi-happiness-tonic',
    productName: 'Happiness Tonic',
    brand: 'Anima Mundi',
    category: VITAMINS,
    formulaId: 'anima-mundi-happiness-tonic',
    audience: ADULT,
    minAge: 18,
    form: 'liquid',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Mucuna + albizia + rhodiola + ashwagandha + St. John\'s wort extracts', strength: '50 drops (2.5 mL)' },
    ],
    inactiveIngredients: [
      f(CITE.anima_happiness, 'Filtered water', 'cleared', METH.water),
      f(CITE.anima_happiness, 'Vegetable glycerin', 'cleared', METH.glycerin),
      f(CITE.anima_happiness, 'Cane spirits', 'limited', METH.alcohol),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Anima Mundi Happiness Tonic = Caution. Cane spirits / cane alcohol is the locked alcohol-vehicle Limited token. Filtered water + vegetable glycerin Cleared. Brand panel is SF-style herbal extracts + Other Ingredients — written. Butterfly Pea is OUT (not this row). Liver Vitality is skipped-out (Nutrition Facts only). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ALCOHOL_TAP}`,
    retailers: [...THRIVE, 'Anima Mundi'],
    cleanAlternatives: TONIC_ALTS,
    sourcesGeneral: [`${CITE.anima_happiness} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'codeage-multi-collagen',
    productName: 'Multi Collagen',
    brand: 'Codeage',
    category: VITAMINS,
    barcode: '860507000480',
    formulaId: 'codeage-multi-collagen',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Multi collagen protein complex (types I, II, III, V, X)', strength: '2000 mg' },
    ],
    inactiveIngredients: [
      f(CITE.codeage_multi_collagen, 'Methylcellulose capsule', 'cleared', METH.methylcellulose),
      f(CITE.codeage_multi_collagen, 'Ascorbyl palmitate', 'cleared', METH.tocopherols),
      f(CITE.codeage_multi_collagen, 'Silicon dioxide', 'cleared', METH.sio2),
      f(CITE.codeage_multi_collagen, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Codeage Multi Collagen = Caution. SiO2 cap. Ascorbyl palmitate is the locked mixed-tocopherols / ascorbyl palmitate Cleared antioxidant (already on MAIN §5 — used, not invented). Methylcellulose / MCC Cleared. Distinct from in-batch Thrive Market Multi-Collagen (Clean powder). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Codeage'],
    cleanAlternatives: COLLAGEN_ALTS,
    sourcesGeneral: [`${CITE.codeage_multi_collagen} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'gol-kids-plus-strawberry-banana',
    productName: 'Organic Kids+ Strawberry Banana Chewable',
    brand: 'Garden of Life',
    category: DIGESTIVE,
    barcode: '658010122214',
    formulaId: 'gol-kids-plus-strawberry-banana',
    audience: KIDS,
    minAge: 4,
    form: 'chewable',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Kids probiotic blend', strength: '5 billion CFU' },
      { name: 'Vitamin C', strength: '30 mg' },
      { name: 'Vitamin D3', strength: '10 mcg (400 IU)' },
    ],
    inactiveIngredients: [
      f(CITE.gol_kids_sb, 'Organic dextrose', 'cleared', METH.sugar),
      f(CITE.gol_kids_sb, 'Organic tapioca maltodextrin', 'limited', METH.maltodextrin),
      f(CITE.gol_kids_sb, 'Organic sunflower lecithin', 'cleared', METH.lecithin),
      f(CITE.gol_kids_sb, 'Organic palm oil (tablet coating)', 'cleared', METH.palmCoat),
      f(CITE.gol_kids_sb, 'Organic guar gum', 'cleared', METH.gums),
      f(CITE.gol_kids_sb, 'Organic strawberry banana flavor', 'limited', METH.flavors),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Garden of Life Kids+ Strawberry Banana chewable = Caution. Organic strawberry banana flavor Limited. Organic tapioca maltodextrin Limited. Not a gummy — Organic Palm Oil is the locked tablet / chew coating Cleared token (tap both sides). Distinct from batch59 Berry Cherry Kids+ (own formulaId). Ages 4+. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'Garden of Life'],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [`${CITE.gol_kids_sb} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'ollois-histaminum-30c',
    productName: 'Histaminum Hydrochloricum 30C Pellets',
    brand: 'Ollois',
    category: ALLERGIES,
    barcode: '855717003161',
    formulaId: 'ollois-histaminum-30c',
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
    activeIngredients: [
      { name: 'Histaminum hydrochloricum', strength: '30C HPUS' },
    ],
    inactiveIngredients: [
      f(CITE.ollois_histaminum, 'Organic sucrose', 'cleared', METH.sugar),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Ollois Histaminum 30C = Caution. Founder carton grade (Sept 17) is Caution on this SKU. Only printed inactive is organic sucrose (Cleared cane-sugar / sucrose row). Distinct from batch52 ollois-arnica-montana-12c (same sucrose string; that row stays Clean — do not clone or flip it). Homeopathic pellets — cleanliness only, no efficacy claim. Ages 2+. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Ollois'],
    cleanAlternatives: HISTAMINUM_ALTS,
    sourcesGeneral: [`${CITE.ollois_histaminum} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'thorne-creatine-flavored',
    productName: 'Creatine Powder (Flavored)',
    brand: 'Thorne',
    category: VITAMINS,
    barcode: '693749015581',
    formulaId: 'thorne-creatine-flavored',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Creatine monohydrate', strength: '5 g per scoop' },
    ],
    inactiveIngredients: [
      f(CITE.thorne_creatine_flavored, 'Natural flavors', 'limited', METH.flavors),
      f(CITE.thorne_creatine_flavored, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.thorne_creatine_flavored, 'Malic acid', 'cleared', METH.citrate),
      f(
        CITE.thorne_creatine_flavored,
        'Turmeric and beet juice powder (color)',
        'cleared',
        METH.namedColor,
      ),
      f(CITE.thorne_creatine_flavored, 'Rebaudioside M', 'cleared', METH.stevia),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Thorne Creatine (flavored) = Caution. Natural flavors Limited. Reb M Cleared. Turmeric + beet juice powder (color) is named plant-color Cleared. Distinct from batch28 thorne-creatine-powder (unflavored Clean — do not clone). Pineapple Orange carton matches this OI (UPC 693749015581). Strawberry tub shares formulaId when the flavor / named-color family holds. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Thorne'],
    cleanAlternatives: CREATINE_ALTS,
    sourcesGeneral: [`${CITE.thorne_creatine_flavored} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'active-skin-repair-hydrogel',
    productName: 'Medical-Grade Skin & Wound Repair Antimicrobial Hydrogel',
    brand: 'Active Skin Repair',
    category: FIRST_AID,
    barcode: '818582012102',
    formulaId: 'active-skin-repair-hydrogel',
    audience: ADULT,
    minAge: 18,
    form: 'hydrogel',
    productType: OTC,
    activeIngredients: [
      { name: 'Electrolyzed HOCl wound-wash hydrogel (as labeled)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.asr_hydrogel, 'Electrolyzed Water', 'cleared', METH.electrolyzed),
      f(CITE.asr_hydrogel, 'Sodium chloride', 'cleared', METH.salt),
      f(CITE.asr_hydrogel, 'Lithium Magnesium Sodium Silicate', 'cleared', METH.silicate),
      f(CITE.asr_hydrogel, 'Sodium bicarbonate', 'cleared', METH.salt),
      f(CITE.asr_hydrogel, 'Phosphates', 'cleared', METH.phosphates),
      f(CITE.asr_hydrogel, 'Sodium sulfate', 'cleared', METH.sulfate),
      f(CITE.asr_hydrogel, 'Sodium Hypochlorite (Trace)', 'cleared', METH.hypochlorite),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Active Skin Repair hydrogel = Caution. Lithium Magnesium Sodium Silicate (not the SiO2 cap) + Sodium Hypochlorite (Trace) are the Sept 17 locked Caution tokens. Electrolyzed Water / NaCl / sodium bicarbonate / Phosphates / Sodium Sulfate Cleared. Usable — not Avoid. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ELECTROLYZED_TAP} ${SILICATE_TAP} ${HYPOCHLORITE_TAP} ${PHOSPHATE_TAP}`,
    retailers: [...THRIVE, 'Active Skin Repair'],
    cleanAlternatives: HYDROGEL_ALTS,
    sourcesGeneral: [`${CITE.asr_hydrogel} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH64_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'Anima Mundi Butterfly Pea',
    reason: 'OUT. Food / no write. Do not write.',
  },
  {
    sku: 'Anima Mundi Liver Vitality',
    reason:
      'SKIPPED-OUT — Nutrition Facts / ingredients-and-serving listing only. Brand, Ulta, Grove, and food-barcode pages print the organic greens blend + tsp serving with no honest Supplement Facts panel (no vitamin / mineral SF bar). Founder rule: SF exists → 100% powder Clean; NF-only → skipped-out. Do not invent SF.',
  },
  {
    sku: 'All Terrain Fabric Bandages',
    reason: 'OUT. Bandages are not Search rows this pass.',
  },
  {
    sku: 'Shopping-list bundles',
    reason: 'OUT. Bundles are not Search rows.',
  },
  {
    sku: 'OM Lion\'s Mane powder',
    reason: 'Already on main (batch60 om-lions-mane-powder). Do not clone.',
  },
  {
    sku: 'Codeage Teen Multi+ Platinum / Hair / NMN / Vitamin C Platinum / OM Master Blend capsules',
    reason: 'Already on main from batch59 / 60. Different formulaIds. Do not clone.',
  },
];

const _ROWS = BATCH64_KYR6_THRIVE_NO_OI;
if (_ROWS.length !== 18) throw new Error('batch64 tally drift: expected 18 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 8) {
  throw new Error('batch64 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 10) {
  throw new Error('batch64 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch64 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch64 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch64 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch64 duplicate ids');

const FORBIDDEN_IDS = [
  'om-lions-mane-powder',
  'om-lions-mane-capsules',
  'om-master-blend-capsules',
  'codeage-teen-multi-platinum',
  'codeage-teen-multi',
  'codeage-womens-fermented-multi',
  'codeage-liposomal-nmn-platinum',
  'codeage-hair-platinum',
  'codeage-vitamin-c-platinum',
  'gol-organic-kids-probiotics-berry-cherry',
  'gol-vitamin-code-kids-chewable',
  'new-chapter-organic-fiber-gummies',
  'thorne-creatine-powder',
  'ollois-arnica-montana-12c',
  'himalaya-stresscare',
  'trace-concentrace-drops',
  'trace-mg-glycinate-orange-dream',
  'fon-cold-flu-max',
  'fon-sinus-max',
  'amazon-elements-acacia-fiber',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch64 must not clone batch59 / 60 / 63 ids');
}

const collagen = _ROWS.find((r) => r.id === 'codeage-multi-collagen');
if (collagen?.verdict !== 'caution') {
  throw new Error('Codeage Multi Collagen founder lock is Caution (SiO2)');
}
if (!collagen?.inactiveIngredients.some((i) => /ascorbyl palmitate/i.test(i.name))) {
  throw new Error('Codeage Multi Collagen must use locked ascorbyl palmitate (do not skip)');
}
if (collagen.inactiveIngredients.some((i) => /ascorbyl palmitate/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('ascorbyl palmitate is Cleared antioxidants — not High');
}

const platinum = _ROWS.find((r) => r.id === 'codeage-womens-multi-platinum');
if (platinum?.verdict !== 'clean') {
  throw new Error('Codeage Platinum founder lock is Clean');
}
if (platinum?.inactiveIngredients.some((i) => /silicon dioxide|silica/i.test(i.name))) {
  throw new Error('Codeage Platinum carton has no SiO2 — do not import Teen Multi+ Platinum OI');
}

const kids = _ROWS.find((r) => r.id === 'gol-kids-plus-strawberry-banana');
if (kids?.verdict !== 'caution' || kids.form === 'gummy') {
  throw new Error('GOL Kids+ Strawberry Banana is a chewable Caution, not a gummy');
}
if (kids?.inactiveIngredients.some((i) => /palm/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('chewable palm coating must not be High');
}

const liverWritten = _ROWS.some((r) => /liver vitality/i.test(r.productName));
if (liverWritten) {
  throw new Error('Liver Vitality is skipped-out (NF-only) — do not write');
}
if (_ROWS.some((r) => /butterfly pea/i.test(r.productName))) {
  throw new Error('Butterfly Pea is OUT — do not write');
}

const asr = _ROWS.find((r) => r.id === 'active-skin-repair-hydrogel');
if (asr?.verdict !== 'caution') {
  throw new Error('Active Skin Repair hydrogel founder lock is Caution');
}
if (!asr?.inactiveIngredients.some((i) => /hypochlorite/i.test(i.name))) {
  throw new Error('Active Skin Repair must score Sodium Hypochlorite (Trace)');
}

for (const record of BATCH64_KYR6_THRIVE_NO_OI) {
  const expected = BATCH64_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 64 catch-up UPC drift on ${record.id}`);
  }
}
