// DRAFT / not verified / batch 35 Sprouts store-brand / methodology
// v1.6 + Sept 14 leftover locks already on main.
// Founder owns final Avoid vs Caution vs Clean.
//
// Sprouts house-brand in-scope OTC / vitamin / supplement drafts from
// the Sept 15 RESCAN (photo/text OI). Whole in-scope line that is
// writable — not one aisle. Mixed categories · recordStatus is
// 'unverified' on every row. Internal keys only: clean | caution |
// avoid. Do NOT invent Clean. Do NOT invent UPCs / barcodes. Pack
// sizes share formulaId. formulaId == id on every NEW row. Form is
// labeled on cleanAlternatives, not a hard filter (§6). Not wired
// into Clean Picks UI. No live Clean Picks file is edited. No photos.
// Letter tiles only on new ids. No fake Clean alts. No night photos.
// No other brand rewrites.
//
// REUSE ONLY (still no OI — do NOT rewrite / do NOT invent OI):
// - sprouts-organic-prenatal-once-daily — Caution (batch 16)
// - sprouts-organic-prenatal-whole-food — Caution (batch 16)
//
// TALLY (unverified drafts in THIS file): 44 rows — Clean 24 /
// Caution 18 / Avoid 2.
// Independently Clean in THIS batch: Inflacalm Ache + Powder Cap;
// Bronchial / Ginger & Wild Cherry syrups; Ginger & Elderberry +
// Elderberry Umckaloabo syrups; Sleep Powder Cap; Relax-All Calm &
// Sleep; Ashwagandha Powder Cap; Immune Rescue; Zinc Picolinate 30;
// Ginkgo; Women's Hair Skin Nails; Krill Oil; Vitamin A 10k;
// Vitamin E 400; Oregano Oil Liquid Cap; Kids Ear Clear; Relax-All
// Ease unflavored + Dragonfruit; Organic Blue Spirulina; D3 1000 /
// 2000 rice-bran softgels; Organic Beet Root pullulan.
//
// LIST 3 LOCKS (already on main — applied, not re-derived):
// - Coconut MCT (oral capsule/softgel/liquid supplement, not a
//   cooking-oil bottle) = Cleared. Unlabeled MCT = Limited.
// - Rice bran oil in D3 softgels = Cleared fill + form tap (not the
//   rice-bran extract row; not gummy High).
// - D3 5000 Citrus MCT: MCT per label (coconut vs unlabeled) + orange
//   EO Limited. This carton does not name coconut → unlabeled MCT
//   Limited + orange EO Limited + named lemon oil Limited.
// - B-12 500 mcg unspecified resin = Caution + tap.
// - Calcium citrate + D magnesium trisilicate = Caution.
// - Organic pullulan = Cleared. Organic beet root stay Cleared.
// - Organic MCT Oil BOTTLE = OUT of Search. Name+URL in the PR
//   comment only. Do not add a Search row.
// - Herb lozenges: peppermint oil Limited; caramel sugar syrup
//   Cleared (not caramel color).
//
// STILL BLOCKED: 187 named in-scope unread house SKUs (RESCAN
// no-panel / front-only / cropped / failed PDP). Do not guess.
// Fizzy Vitamin C drink mixes, protein, food, and culinary oils stay
// out of scope. Organic MCT Oil bottle is PR-comment only.
//
// Organic MCT Oil bottle (PR comment only — not a Search row):
// Sprouts Organic MCT Oil 16 fl oz
// https://shop.sprouts.com/store/sprouts/products/102783913-sprouts-organic-mct-oil-16-fl-oz
// Sibling catalog id 17858969. HTML: MCT from organic coconut oil.

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
const OTC = 'OTC' as const;
const BRAND = 'Sprouts';
const RETAILERS = ['Sprouts'] as const;

const PAIN_FEVER = 'Pain & Fever';
const COLD_FLU = 'Cold & Flu';
const SLEEP = 'Sleep';
const IMMUNE = 'Immune Support';
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const FIRST_AID = 'First Aid';

const CAPSULE_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this capsule/softgel/liquid-drop fill they are not that High rule.';

const ALCOHOL_VEHICLE_LINE =
  'Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid.';

const RICE_BRAN_OIL_TAP =
  'Rice bran oil here is a softgel fill — not the Cleared organic rice bran extract row, and not the gummy seed-oil High rule. ' +
  CAPSULE_OIL_TAP;

const MCT_UNLABELED_TAP =
  'Label says medium-chain triglycerides and does not name coconut. We mark that Limited because the source isn’t clear. MCT labeled from coconut is Cleared on oral capsule/softgel/liquid supplements (not a cooking-oil bottle).';

const RESIN_TAP =
  'Label only says resin — it doesn’t name the resin. We mark Caution until it does. This is not the topical wood-rosin / colophony row.';

const TRISILICATE_TAP =
  'Magnesium trisilicate is a silicate-adjacent filler. Caution, not the silicon dioxide 0-pt nanoparticle cap, and not talc / Avoid.';

const CARAMEL_SYRUP_TAP =
  'Caramel sugar syrup is a named food sugar / lozenge sweetener. It is not caramel color (E150) and is not the undisclosed-class Avoid row.';

const HONEY_LINE =
  'Honey is a Cleared-class sweetener. Not for under 1. No dosing.';

const ZINC_PARKED =
  'Zinc (picolinate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const METH = {
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  lemonOil:
    'Methodology §5 Limited-risk (named lemon oil as flavor — not a Clean auto-pass)',
  peppermintOil:
    'Methodology §5 Limited-risk (peppermint oil as flavor / EO line — not gummy High)',
  orangeOil:
    'Methodology §5 Limited-risk (orange essential oil as flavor / EO line — not gummy High)',
  maltodextrin:
    'Methodology §5 Limited-risk (organic maltodextrin — same Limited as non-organic)',
  fructose: 'Methodology §5 Limited-risk (fructose as sweetener — treat with sugars; not High)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  alcoholVehicle: `Methodology §5 Limited-risk (alcohol / ethyl alcohol / grain alcohol as a VEHICLE). ${ALCOHOL_VEHICLE_LINE} Not Avoid.`,
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  resin: `Methodology §5 Caution (unspecified resin — standalone Caution, not additive-scored, not Avoid). ${RESIN_TAP}`,
  trisilicate: `Methodology §5 Caution (magnesium trisilicate — silicate-adjacent filler; standalone Caution, not the SiO2 0-pt cap, not Avoid). ${TRISILICATE_TAP}`,
  annatto:
    'Methodology §5 Caution (annatto — allergenic; standalone Caution, not additive-scored, not Avoid)',
  cleared: 'Methodology §5 Cleared',
  honey: `Methodology §5 Cleared-class (honey — sweetener). ${HONEY_LINE}`,
  lecithin: 'Methodology §5 Cleared (lecithin — soy or sunflower — locked v1.6)',
  stevia:
    'Methodology §5 Cleared (stevia / steviol glycosides, high-purity extract — locked v1.6)',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors / organic colors)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / acacia / pectin / gellan — locked v1.6)',
  pullulan:
    'Methodology §5 Cleared (organic pullulan — starch capsule polymer; HPMC-family vegan cap)',
  riceBranOil: `Methodology §5 Cleared (rice bran oil as softgel/capsule fill — not organic rice bran extract; not gummy High). ${RICE_BRAN_OIL_TAP}`,
  capsuleOil: `Methodology §5 — oil in a capsule / softgel / liquid-drop fill is NOT the gummy seed/industrial-oil High rule. ${CAPSULE_OIL_TAP}`,
  caramelSyrup: `Methodology §5 Cleared (caramel sugar syrup — named food sugar / lozenge sweetener). ${CARAMEL_SYRUP_TAP}`,
  namedBotanical:
    'Methodology §5 Cleared (named food/botanical extract as oral inactive — same class as grape seed extract). Do not Caution the product on these extracts alone.',
  brownRice:
    'Methodology §5 Cleared (rice protein / ferment media / organic/brown rice / rice syrup — food-state / starch family; not SiO2)',
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

function labelCleared(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.cleared));
}

function pdp(slug: string): string {
  return `https://shop.sprouts.com/store/sprouts/products/${slug}`;
}

const ID = {
  inflacalmAche: 'sprouts-inflacalm-ache-relief',
  inflacalmPowder: 'sprouts-inflacalm-powder-cap',
  bronchial: 'sprouts-bronchial-syrup',
  gingerCherry: 'sprouts-ginger-wild-cherry-bronchial',
  gingerElderberry: 'sprouts-ginger-elderberry-immune',
  umcka: 'sprouts-elderberry-umckaloabo-zinc',
  sleepCap: 'sprouts-sleep-powder-cap',
  relaxCalm: 'sprouts-relax-all-calm-sleep',
  ashwagandha: 'sprouts-ashwagandha-powder-cap',
  immuneRescue: 'sprouts-immune-rescue',
  zincPicolinate: 'sprouts-zinc-picolinate-30',
  ginkgo: 'sprouts-ginkgo-biloba',
  hsn: 'sprouts-womens-hair-skin-nails',
  krill: 'sprouts-krill-oil',
  vitA: 'sprouts-vitamin-a-10k',
  vitE: 'sprouts-vitamin-e-400',
  oreganoCap: 'sprouts-oregano-oil-liquid-cap',
  earClear: 'sprouts-kids-ear-clear-oil',
  easeUnflavored: 'sprouts-relax-all-ease-unflavored',
  easeDragon: 'sprouts-relax-all-ease-dragonfruit',
  spirulina: 'sprouts-organic-blue-spirulina',
  d3_1000: 'sprouts-d3-1000-rice-bran',
  d3_2000: 'sprouts-d3-2000-rice-bran',
  beet: 'sprouts-organic-beet-root',
} as const;

const PE_MELATONIN = 'pure-encapsulations-melatonin-sr-3mg';
const THORNE_EPA = 'thorne-super-epa-nsf';
const THORNE_CALCIUM = 'thorne-calcium-dicalcium-malate';

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ALTS = {
  omega: [
    alt(
      ID.krill,
      'Independently Clean in-batch Sprouts Krill Oil (gelatin / glycerin / water). Form: softgel — labeled, not a hard filter (§6). Same omega shelf. Do not invent a Clean Sprouts fish-oil twin of the TiO2 turmeric SKU.',
    ),
    alt(
      THORNE_EPA,
      'Independently Clean Thorne Super EPA NSF already graded on main in batch 28 (gelatin / water / glycerin + mixed tocopherols; no flavor). Form: softgel — labeled, not a hard filter (§6).',
    ),
  ],
  calcium: [
    alt(
      THORNE_CALCIUM,
      'Independently Clean Thorne Calcium (DiCalcium Malate) already graded on main in batch 28 (HPMC capsule + calcium laurate). Form: capsule — labeled, not a hard filter (§6). Do not invent a Clean Sprouts calcium.',
    ),
  ],
  zinc: [
    alt(
      ID.zincPicolinate,
      'Independently Clean in-batch Sprouts Zinc Picolinate 30 mg (gelatin / cellulose / magnesium stearate). Form: capsule — labeled, not a hard filter (§6). Same zinc shelf. Zinc parked as an active.',
    ),
  ],
  sleep: [
    alt(
      ID.sleepCap,
      'Independently Clean in-batch Sprouts Sleep Powder Cap (modified vegetable cellulose only). Form: capsule — labeled, not a hard filter (§6). Same Sleep shelf.',
    ),
    alt(
      ID.relaxCalm,
      'Independently Clean in-batch Sprouts Relax-All Calm & Sleep (cellulose capsule only). Form: capsule — labeled, not a hard filter (§6).',
    ),
    alt(
      PE_MELATONIN,
      'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already graded on main in batch 24. Form: capsule — labeled, not a hard filter (§6). Same-category adult Sleep peer. Do not invent a Clean Sprouts melatonin liquid.',
    ),
  ],
  d3: [
    alt(
      ID.d3_1000,
      'Independently Clean in-batch Sprouts Vitamin D3 1000 IU softgel (gelatin / glycerin / water / rice bran oil fill — not gummy High). Form: softgel — labeled, not a hard filter (§6). Same D3 shelf.',
    ),
  ],
  cold: [
    alt(
      ID.bronchial,
      'Independently Clean in-batch Sprouts Bronchial Syrup (vegetable glycerin / deionized water / organic honey). Form: syrup — labeled, not a hard filter (§6). Same Cold & Flu shelf. Honey — not for under 1.',
    ),
  ],
} as const;

type Draft = {
  id: string;
  productName: string;
  category: string;
  form: string;
  audience?: typeof ADULT | typeof KIDS;
  minAge?: number;
  productType?: typeof VITAMIN | typeof SUPPLEMENT | typeof OTC;
  actives: RatingRecord['activeIngredients'];
  inactives: IngredientFlag[];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  alts?: CleanAlternative[];
  zinc?: boolean;
};

function row(d: Draft): RatingRecord {
  const barcode = BATCH35_CATCHUP_BARCODES[d.id];
  return {
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.id,
    audience: d.audience ?? ADULT,
    minAge: d.minAge ?? (d.audience === KIDS ? 2 : 18),
    form: d.form,
    recordStatus: UNVERIFIED,
    productType: d.productType ?? SUPPLEMENT,
    activeIngredients: d.actives,
    inactiveIngredients: d.inactives,
    verdict: d.verdict,
    honestNote:
      `${d.note} ${d.zinc ? ZINC_PARKED + ' ' : ''}Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement unless noted). No dosing or medical advice in this draft. Draft, not verified.`
        .replace(/\s+/g, ' ')
        .trim(),
    retailers: [...RETAILERS],
    cleanAlternatives: d.alts,
    sourcesGeneral: [`${d.cite} — draft, not verified; no DailyMed drug SPL`],
    ...(barcode ? { barcode } : {}),
  };
}

const CITE = {
  omega3Turmeric: `${pdp('26902770-sprouts-high-potency-omega-3-turmeric-caplets-60-ct')} HTML Ingredients (Highly Refined And Concentrated Omega-3 Fish Oil, Capsule Shell (Gelatin, Glycerin, Purified Water, Annatto Extract, Titanium Dioxide), Meriva Turmeric Phyosome, Beeswax, Sunflower Lecithin, D-Limonene, Natura Mixed Ocopherols — typos as published)`,
  calcium600: `${pdp('17858747-sprouts-600-mg-wit-vitamin-d-calcium-each')} gallery-2 photo OI (soybean oil, gelatin, glycerin, soy lecithin, water, natural beeswax, titanium dioxide)`,
  zincLozenge: `${pdp('17858773-sprouts-cool-lemon-zinc-lozenges-60-l')} gallery-2 photo OI (Sorbitol, Fructose, Cellulose, Calcium Stearate, Brown Rice Syrup Solids, Silicon Dioxide). Natural lemon flavor is in the active Natural Defense Blend, not Other Ingredients.`,
  vitC1000: `${pdp('17858881-sprouts-1000-mg-vitamin-c-capsules-100-ct')} gallery-2 photo OI (vegetarian/veg cellulose capsule, magnesium stearate, silicon dioxide). 250 ct productId 17858883 shares this formulaId.`,
  zinc50: `${pdp('17858919-sprouts-50-mg-zinc-tablets-250-ct')} gallery-2 photo OI (cellulose, cellulose gum, stearic acid, calcium stearate, glycerin, silica/SiO₂)`,
  b12pr: `${pdp('17858717-sprouts-1000-mcg-prolonged-release-vitamin-b-12-100-ct')} gallery-2 photo OI (cellulose, stearic acid, calcium stearate, glycerin, silica/SiO₂)`,
  lysine1000: `${pdp('17859153-sprouts-l-lysine-1000-mg-tablets-50-ct')} gallery-2 photo OI (vegetable stearates, modified cellulose, silica)`,
  lysine500: `${pdp('17859155-sprouts-l-lysine-500-mg-supplement-tablets-250-ct')} gallery-2 photo OI (calcium phosphate, vegetable stearates, cellulose, modified cellulose, silica)`,
  melatoninLiq: `${pdp('17855330-sprouts-melatonin-2-fl-oz')} gallery-2 photo OI (Vegetable Glycerin, Deionized Water, Natural Flavors)`,
  sleepLiq: `${pdp('17858671-sprouts-sleep-1-fl-oz')} gallery-2 photo OI (Grain Alcohol 50–60% as vehicle, Deionized Water)`,
  valerianLiq: `${pdp('17858657-sprouts-valerian-1-fl-oz')} gallery-2 photo OI (Grain Alcohol 65–75% as vehicle; deionized water on the Sleep-class first pass)`,
  b12af: `${pdp('17858449-sprouts-b12-liquid-sublingual-alcohol-free-supplement-2-fl-oz')} gallery-2 photo OI (raspberry/berry natural flavors named as the Limited driver; full carrier line not independently dumped — do not invent glycerin/water)`,
  bComplex: `${pdp('17855332-sprouts-vitamin-b-complex-liquid-1-fl-oz')} gallery-2 photo OI (Vegetable Glycerin, Deionized Water, Raspberry Natural Flavor, Lemon Essential Oil). Stevia leaf extract is in Supplement Facts as an active, not OI. 2 fl oz ${pdp('17855334-sprouts-liquid-rasberry-b-complex-2-fl-oz')} shares this formulaId.`,
  b12folic: `${pdp('17858697-sprouts-b-12-liquid-sublingual-w-folic-acid-vit-b6-1-fl-oz')} gallery-2 photo OI (natural flavor + named lemon oil — same flavor/oil pattern as B Complex Raspberry; glycerin/water not independently dumped — do not invent)`,
  dmannose: `${pdp('27994400-sprouts-d-mannose-cranberry-flavored-dietary-supplement-7-05-oz')} HTML Ingredients (Organic Maltodextrin, Citric Acid And Stevia Leaf Extract.)`,
  inflacalmAche: `${pdp('25028818-sprouts-inflacam-ache-relief-vegetarian-capsule-60-ct')} gallery-2 photo OI (Vegetable Cellulose)`,
  inflacalmPowder: `${pdp('17858493-sprouts-inflacalm-powder-capsule-60-ct')} gallery-2 photo OI (Modified Vegetable Cellulose)`,
  bronchial: `${pdp('17858599-sprouts-cough-syrup-4-fl-oz')} gallery-2 photo OI (Vegetable Glycerin, Deionized Water, Organic Honey). Menthol crystals are in the proprietary blend, not OI.`,
  gingerCherry: `${pdp('25586535-sprouts-ginger-wild-cherry-bronchial-syrup-4-fl-oz')} gallery-2 photo OI (Vegetable Glycerin, Organic Honey, Deionized Water)`,
  gingerElderberry: `${pdp('25586531-sprouts-ginger-elderberry-immune-syrup-4-fl-oz')} gallery-2 photo OI (Vegetable Glycerin, Organic Honey, Deionized Water)`,
  umcka: `${pdp('22036516-sprouts-elderberry-umckaloabo-zinc-syrup-4-fl-oz')} gallery-2 photo OI (Vegetable Glycerin, Deionized Water, Organic Elderberry and Blackberry Juice Concentrates, Citric Acid). Organic stevia leaf extract is in Facts as an active, not OI.`,
  sleepCap: `${pdp('17858571-sprouts-sleep-powder-capsules-90-ct')} gallery-2 photo OI (Modified Vegetable Cellulose)`,
  relaxCalm: `${pdp('25437717-sprouts-relax-all-calm-sleep-dietary-supplement-capsules-60-ct')} gallery-2 photo OI (Cellulose capsule)`,
  ashwagandha: `${pdp('17858577-sprouts-ashwagandha-powder-capsules-90-ct')} gallery-2 photo OI (Modified Vegetable Cellulose)`,
  immuneRescue: `${pdp('24170122-sprouts-100-vegetarian-immune-rescue-capsules-90-ct')} photo + HTML Other Ingredients (Modified Vegetable Cellulose, Organic Mycellated Brown Rice — spelling as published)`,
  zincPicolinate: `${pdp('17858921-sprouts-zinc-picolinate-30-mg-100-ct')} gallery-2 photo OI (gelatin capsule, cellulose, magnesium stearate)`,
  ginkgo: `${pdp('26119854-sprouts-ginkgo-biloba-veggie-capsules-180-ct')} gallery-2 photo OI (vegetable cellulose)`,
  hsn: `${pdp('29421830-sprouts-women-s-health-hair-skin-nails-capsules-with-biotin-hyaluronic-acid-90-ct')} gallery-2 photo OI (vegetable cellulose)`,
  krill: `${pdp('17859133-sprouts-krill-oil-each')} gallery-2 photo OI (gelatin, glycerin, water)`,
  vitA: `${pdp('17858875-sprouts-vitamin-a-10000-1-g')} gallery-2 photo OI (gelatin, glycerin, soybean oil fill). Pack sibling productId 17858877 shares this formulaId.`,
  vitE: `${pdp('17858905-sprouts-400-iu-vitamin-e-with-mixed-tocopherol-each')} gallery-2 photo OI (gelatin, glycerin, soybean oil fill, mixed tocopherols, water)`,
  oreganoCap: `${pdp('17858687-sprouts-oregano-oil-liquid-cap-60-ct')} gallery-2 photo OI (soy lecithin, modified vegetable cellulose, extra-virgin olive oil as capsule fill)`,
  earClear: `${pdp('17858505-sprouts-kid-s-ear-clear-oil-1-fl-oz')} HTML Ingredients (Mullein Flower (Verbascum Spp.), Coptis Root (Coptis Chinensis), Garlic Bulb (Allium Sativum), And Arnica Flower (Arnica Montana) In A Base Of Extra Virgin Olive Oil (Olea Europaea).)`,
  easeUnflavored: `${pdp('25561821-sprouts-unflavored-relax-all-ease-powder-8-oz')} HTML Ingredients (Ionic Magnesium Citrate (Citric Acid, Magnesium Carbonate, And Sea Magnesium).)`,
  easeDragon: `${pdp('25561819-sprouts-dragonfruit-relax-all-ease-dietary-supplement-powder-8-oz')} HTML Ingredients (Ionic Magnesium Citrate (Citric Acid, Magnesium Carbonate, And Sea Magnesium), Organic Dragon Fruit Flavor, And Organic Steviol Glycosides.)`,
  spirulina: `${pdp('100356442-sprouts-organic-blue-spirulina-powder-2-oz')} HTML Ingredients (Organic Phycocyanin (Arthrospira Platensis Extract), And Organic Acacia Fiber.)`,
  optimalSleep: `${pdp('17855318-sprouts-optimal-sleep-60-ct')} gallery-2 photo OI (Non-GMO Soy Lecithin, Modified Vegetable Cellulose, Medium Chain Triglycerides)`,
  d3_1000: `${pdp('17858937-sprouts-1000-iu-vitamin-d3-each')} gallery-2 photo OI (gelatin, glycerin, purified water, rice bran oil)`,
  d3_2000: `${pdp('17859061-sprouts-2000-iu-vitamin-each')} gallery-2 photo OI (gelatin, glycerin, purified water, rice bran oil — same oil family as 1000 IU; separate strength / formulaId)`,
  d3_5000: `${pdp('17858707-sprouts-d3-5000-iu-citrus-mct-oil-1-fl-oz')} gallery-2 photo OI (MCT; orange essential oil; lemon essential oil). MCT source not named coconut. Full carrier list not independently dumped — do not invent glycerin/water.`,
  b12500: `${pdp('17858719-sprouts-500-mcg-vitamin-b-12-100-ct')} gallery-2 photo OI (lactose, resin, cellulose, calcium stearate). 250 ct productId 17858721 shares this formulaId.`,
  calCitrate: `${pdp('17858745-sprouts-calcium-citrate-with-vitamin-d-120-ct')} gallery-2 photo OI (cellulose, magnesium stearate, modified cellulose gum, glycerin, magnesium trisilicate)`,
  beet: `${pdp('84678026-sprouts-organic-beet-root-90-ct')} HTML Other Ingredients (Organic Pullulan Capsule, Organic Brown Rice Flour.)`,
  herbLozenge: `${pdp('23000009-sprouts-original-herb-herbal-lozenges-23-l')} HTML Other Ingredients (Sugar, Glucose Syrup, Honey, Extract Of 20 Herbs (Licorice Root, Plantain Leaves, Blackberry Leaves, Peppermint Leaves, Chamomile Flower, Mallow Flower, Primrose Flower, Elderflower, Thyme, Icelandic Moss, Linden Flower, Sage Leaves, Anise, Marshmallow Leaves, Pimpernel Root, Fennel, Marigold Flower, Mullein Flower, Eucalyptus Leaves, Yarrow Flower), Caramel Sugar Syrup (Color), Peppermint Oil, Menthol.)`,
} as const;

// KYR5-b in-store Sprouts chunk 1 — official shop.sprouts PDP "UPC:" field
// (GTIN-14 00+UPC-A → 12-digit UPC-A). Pack extras share formulaId.
const BATCH35_CATCHUP_BARCODES: Record<string, string> = {
  [ID.inflacalmAche]: '646670682001',
  [ID.inflacalmPowder]: '646670620522',
  [ID.bronchial]: '646670621352',
  [ID.gingerCherry]: '646670682506',
  [ID.gingerElderberry]: '646670682490',
  [ID.umcka]: '646670621697',
  [ID.sleepCap]: '646670621123',
  [ID.relaxCalm]: '646670681806',
  [ID.ashwagandha]: '646670621161',
  [ID.immuneRescue]: '646670621734',
  [ID.zincPicolinate]: '646670672804',
  [ID.ginkgo]: '646670682520',
  [ID.hsn]: '646670549168',
  [ID.krill]: '646670682124',
  [ID.vitA]: '646670672309 646670672316',
  [ID.vitE]: '646670672699',
  [ID.oreganoCap]: '646670631511',
  [ID.earClear]: '646670620591',
  [ID.easeUnflavored]: '646670681783',
  [ID.easeDragon]: '646670681790',
  [ID.spirulina]: '646670681257',
  [ID.d3_1000]: '646670672996',
  [ID.d3_2000]: '646670681356',
  [ID.beet]: '646670545801',
  'sprouts-zinc-lozenges-cool-lemon': '646670670831',
  'sprouts-vitamin-c-1000-capsules': '646670672347 646670672354',
  'sprouts-zinc-50-tablets': '646670672798',
  'sprouts-b12-1000-pr': '646670670107',
  'sprouts-l-lysine-1000': '646670690167',
  'sprouts-l-lysine-500': '646670690174',
  'sprouts-melatonin-3mg-liquid': '646670130021',
  'sprouts-sleep-liquid': '646670631429',
  'sprouts-valerian-liquid': '646670631337',
  'sprouts-b12-alcohol-free-sublingual': '646670620157',
  'sprouts-b-complex-raspberry-liquid': '646670130212 646670130229',
  'sprouts-b12-folic-b6-liquid': '646670631597',
  'sprouts-d-mannose-cranberry-powder': '646670681837',
  'sprouts-optimal-sleep-mct': '646670125805',
  'sprouts-d3-5000-citrus-mct': '646670631658',
  'sprouts-b12-500-resin': '646670670114 646670670121',
  'sprouts-calcium-citrate-d-trisilicate': '646670670527',
  'sprouts-original-herb-lozenges': '646670695018',
  'sprouts-omega3-turmeric-tio2': '646670548055',
  'sprouts-calcium-600-d-softgel-tio2': '646670670534',
};

export const BATCH35_SPROUTS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: ID.inflacalmAche,
    productName: 'Sprouts Inflacalm Ache Relief',
    category: PAIN_FEVER,
    form: 'vegetarian capsule',
    actives: [
      { name: 'Inflacalm herbal blend (ginger / holy basil / turmeric / white willow / green tea / rosemary / boswellia as labeled)', strength: '1 capsule (label serving)' },
    ],
    inactives: [labelCleared(CITE.inflacalmAche, 'Vegetable cellulose')],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Inflacalm Ache Relief = Clean. RESCAN photo OI is vegetable cellulose only (Cleared). Separate formulaId from Inflacalm Powder Cap. No SiO2 / stearate / flavor on the captured panel.',
    cite: CITE.inflacalmAche,
  }),
  row({
    id: ID.inflacalmPowder,
    productName: 'Sprouts Inflacalm Powder Cap',
    category: PAIN_FEVER,
    form: 'powder capsule',
    actives: [{ name: 'Inflacalm herbal powder blend', strength: '1 capsule (label serving)' }],
    inactives: [labelCleared(CITE.inflacalmPowder, 'Modified vegetable cellulose')],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Inflacalm Powder Cap = Clean. RESCAN photo OI is modified vegetable cellulose only (Cleared hypromellose / capsule cellulose). Separate formulaId from Inflacalm Ache Relief. No SiO2 or stearate on the captured panel.',
    cite: CITE.inflacalmPowder,
  }),
  row({
    id: ID.bronchial,
    productName: 'Sprouts Bronchial Syrup',
    category: COLD_FLU,
    form: 'syrup',
    actives: [{ name: 'Bronchial herbal blend (menthol crystals in the proprietary blend as labeled)', strength: 'label serving' }],
    inactives: [
      labelCleared(CITE.bronchial, 'Vegetable glycerin'),
      labelCleared(CITE.bronchial, 'Deionized water'),
      flag('Organic honey', 'cleared', labelCite(CITE.bronchial, METH.honey)),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Bronchial Syrup = Clean. RESCAN photo OI is vegetable glycerin, deionized water, and organic honey (Cleared). Menthol crystals sit in the proprietary blend, not Other Ingredients. ${HONEY_LINE}`,
    cite: CITE.bronchial,
  }),
  row({
    id: ID.gingerCherry,
    productName: 'Sprouts Ginger & Wild Cherry Bronchial Syrup',
    category: COLD_FLU,
    form: 'syrup',
    actives: [{ name: 'Ginger and wild cherry bronchial herbal blend', strength: 'label serving' }],
    inactives: [
      labelCleared(CITE.gingerCherry, 'Vegetable glycerin'),
      flag('Organic honey', 'cleared', labelCite(CITE.gingerCherry, METH.honey)),
      labelCleared(CITE.gingerCherry, 'Deionized water'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Ginger & Wild Cherry Bronchial Syrup = Clean. RESCAN photo OI is vegetable glycerin, organic honey, and deionized water. ${HONEY_LINE}`,
    cite: CITE.gingerCherry,
  }),
  row({
    id: ID.gingerElderberry,
    productName: 'Sprouts Ginger & Elderberry Immune Syrup',
    category: IMMUNE,
    form: 'syrup',
    actives: [{ name: 'Ginger and elderberry immune herbal blend', strength: 'label serving' }],
    inactives: [
      labelCleared(CITE.gingerElderberry, 'Vegetable glycerin'),
      flag('Organic honey', 'cleared', labelCite(CITE.gingerElderberry, METH.honey)),
      labelCleared(CITE.gingerElderberry, 'Deionized water'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Ginger & Elderberry Immune Syrup = Clean. RESCAN photo OI matches the wild-cherry bronchial family (vegetable glycerin, organic honey, deionized water). ${HONEY_LINE}`,
    cite: CITE.gingerElderberry,
  }),
  row({
    id: ID.umcka,
    productName: 'Sprouts Elderberry Umckaloabo & Zinc Syrup',
    category: IMMUNE,
    form: 'syrup',
    zinc: true,
    actives: [
      { name: 'Elderberry and umckaloabo herbal blend', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactives: [
      labelCleared(CITE.umcka, 'Vegetable glycerin'),
      labelCleared(CITE.umcka, 'Deionized water'),
      labelCleared(CITE.umcka, 'Organic elderberry juice concentrate'),
      labelCleared(CITE.umcka, 'Organic blackberry juice concentrate'),
      labelCleared(CITE.umcka, 'Citric acid'),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Elderberry Umckaloabo & Zinc Syrup = Clean. RESCAN photo OI is vegetable glycerin, deionized water, organic elderberry and blackberry juice concentrates, and citric acid (Cleared). Organic stevia leaf extract is in Supplement Facts as an active, not Other Ingredients.',
    cite: CITE.umcka,
  }),
  row({
    id: ID.sleepCap,
    productName: 'Sprouts Sleep Powder Cap',
    category: SLEEP,
    form: 'powder capsule',
    actives: [{ name: 'Sleep herbal powder blend', strength: '1 capsule (label serving)' }],
    inactives: [labelCleared(CITE.sleepCap, 'Modified vegetable cellulose')],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Sleep Powder Cap = Clean. RESCAN photo OI is modified vegetable cellulose only. Separate formulaId from Optimal Sleep (unlabeled MCT Caution) and from Relax-All Calm & Sleep.',
    cite: CITE.sleepCap,
  }),
  row({
    id: ID.relaxCalm,
    productName: 'Sprouts Relax-All Calm & Sleep',
    category: SLEEP,
    form: 'capsule',
    actives: [{ name: 'Relax-All calm and sleep herbal blend', strength: '1 capsule (label serving)' }],
    inactives: [labelCleared(CITE.relaxCalm, 'Cellulose capsule')],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Relax-All Calm & Sleep = Clean. RESCAN photo OI is a cellulose capsule only. Separate formulaId from Relax-All Ease powders.',
    cite: CITE.relaxCalm,
  }),
  row({
    id: ID.ashwagandha,
    productName: 'Sprouts Ashwagandha Powder Cap',
    category: SLEEP,
    form: 'powder capsule',
    actives: [{ name: 'Ashwagandha (Withania somnifera) powder', strength: 'label serving' }],
    inactives: [labelCleared(CITE.ashwagandha, 'Modified vegetable cellulose')],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Ashwagandha Powder Cap = Clean. RESCAN photo OI is modified vegetable cellulose only. The 1 fl oz ashwagandha tincture stays blocked (no readable OI).',
    cite: CITE.ashwagandha,
  }),
  row({
    id: ID.immuneRescue,
    productName: 'Sprouts 100% Vegetarian Immune Rescue',
    category: IMMUNE,
    form: 'capsule',
    actives: [{ name: 'Immune Rescue herbal / mushroom blend', strength: '1 capsule (label serving)' }],
    inactives: [
      labelCleared(CITE.immuneRescue, 'Modified vegetable cellulose'),
      flag(
        'Organic mycellated brown rice',
        'cleared',
        labelCite(CITE.immuneRescue, METH.brownRice),
      ),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts 100% Vegetarian Immune Rescue = Clean. Photo matches HTML Other Ingredients: modified vegetable cellulose and organic mycellated brown rice (food-state / ferment-media Cleared; spelling as published). Not silicon dioxide.',
    cite: CITE.immuneRescue,
  }),
  row({
    id: ID.zincPicolinate,
    productName: 'Sprouts Zinc Picolinate 30 mg',
    category: VITAMINS,
    form: 'gelatin capsule',
    productType: VITAMIN,
    zinc: true,
    actives: [{ name: 'Zinc (as zinc picolinate)', strength: '30mg' }],
    inactives: [
      labelCleared(CITE.zincPicolinate, 'Gelatin capsule'),
      labelCleared(CITE.zincPicolinate, 'Cellulose'),
      labelCleared(CITE.zincPicolinate, 'Magnesium stearate'),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Zinc Picolinate 30 mg = Clean. RESCAN photo OI is gelatin capsule, cellulose, and magnesium stearate. Separate formulaId from Zinc 50 mg tablets (SiO2 Caution) and Zinc Lozenges Cool Lemon.',
    cite: CITE.zincPicolinate,
  }),
  row({
    id: ID.ginkgo,
    productName: 'Sprouts Ginkgo Biloba Veggie Capsules',
    category: VITAMINS,
    form: 'veggie capsule',
    actives: [{ name: 'Ginkgo biloba', strength: 'label serving' }],
    inactives: [labelCleared(CITE.ginkgo, 'Vegetable cellulose')],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Ginkgo Biloba veggie caps = Clean. RESCAN photo OI is vegetable cellulose only.',
    cite: CITE.ginkgo,
  }),
  row({
    id: ID.hsn,
    productName: "Sprouts Women's Health Hair, Skin & Nails",
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    zinc: true,
    actives: [
      { name: 'Biotin', strength: 'label serving' },
      { name: 'Hyaluronic acid', strength: 'label serving' },
      { name: "Women's hair, skin, and nails blend", strength: '1 capsule (label serving)' },
    ],
    inactives: [labelCleared(CITE.hsn, 'Vegetable cellulose')],
    verdict: 'clean',
    note:
      "FOUNDER-STYLE DRAFT: Sprouts Women's Health Hair, Skin & Nails = Clean. RESCAN photo OI is vegetable cellulose only.",
    cite: CITE.hsn,
  }),
  row({
    id: ID.krill,
    productName: 'Sprouts Krill Oil',
    category: VITAMINS,
    form: 'softgel',
    actives: [{ name: 'Krill oil', strength: 'label serving' }],
    inactives: [
      labelCleared(CITE.krill, 'Gelatin'),
      labelCleared(CITE.krill, 'Glycerin'),
      labelCleared(CITE.krill, 'Water'),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Krill Oil = Clean. RESCAN photo OI is gelatin, glycerin, and water. Contains shellfish (krill). No flavor / TiO2 on the captured panel.',
    cite: CITE.krill,
  }),
  row({
    id: ID.vitA,
    productName: 'Sprouts Vitamin A 10,000 IU Softgel',
    category: VITAMINS,
    form: 'softgel',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin A', strength: '10000 IU' }],
    inactives: [
      labelCleared(CITE.vitA, 'Gelatin'),
      labelCleared(CITE.vitA, 'Glycerin'),
      flag('Soybean oil (softgel fill)', 'cleared', labelCite(CITE.vitA, METH.capsuleOil)),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Vitamin A 10,000 IU softgel = Clean. RESCAN photo OI is gelatin, glycerin, and soybean oil as softgel fill. ${CAPSULE_OIL_TAP} Pack sibling productId 17858877 shares this formulaId.`,
    cite: CITE.vitA,
  }),
  row({
    id: ID.vitE,
    productName: 'Sprouts Vitamin E 400 IU Mixed Tocopherol',
    category: VITAMINS,
    form: 'softgel',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin E (mixed tocopherols)', strength: '400 IU' }],
    inactives: [
      labelCleared(CITE.vitE, 'Gelatin'),
      labelCleared(CITE.vitE, 'Glycerin'),
      flag('Soybean oil (softgel fill)', 'cleared', labelCite(CITE.vitE, METH.capsuleOil)),
      labelCleared(CITE.vitE, 'Mixed tocopherols'),
      labelCleared(CITE.vitE, 'Water'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Vitamin E 400 IU Mixed Tocopherol = Clean. RESCAN photo OI is gelatin, glycerin, soybean oil fill, mixed tocopherols, and water. ${CAPSULE_OIL_TAP} Not the front-only Vitamin E 400 IU twins (17858909 / 117398146) — those stay blocked.`,
    cite: CITE.vitE,
  }),
  row({
    id: ID.oreganoCap,
    productName: 'Sprouts Oregano Oil Liquid Cap',
    category: IMMUNE,
    form: 'liquid capsule',
    actives: [{ name: 'Oregano oil', strength: 'label serving' }],
    inactives: [
      flag('Soy lecithin', 'cleared', labelCite(CITE.oreganoCap, METH.lecithin)),
      labelCleared(CITE.oreganoCap, 'Modified vegetable cellulose'),
      flag(
        'Extra-virgin olive oil (capsule fill)',
        'cleared',
        labelCite(CITE.oreganoCap, METH.capsuleOil),
      ),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Oregano Oil Liquid Cap = Clean. RESCAN photo OI is soy lecithin, modified vegetable cellulose, and extra-virgin olive oil as capsule fill. Lecithin is Cleared, not seed-oil High. ${CAPSULE_OIL_TAP} The 1 fl oz oregano oil dropper stays blocked.`,
    cite: CITE.oreganoCap,
  }),
  row({
    id: ID.earClear,
    productName: "Sprouts Kids Ear Clear Oil",
    category: FIRST_AID,
    form: 'topical oil',
    audience: KIDS,
    minAge: 2,
    productType: OTC,
    actives: [
      { name: 'Mullein flower (Verbascum spp.)', strength: 'in extra-virgin olive oil base' },
      { name: 'Coptis root (Coptis chinensis)', strength: 'in extra-virgin olive oil base' },
      { name: 'Garlic bulb (Allium sativum)', strength: 'in extra-virgin olive oil base' },
      { name: 'Arnica flower (Arnica montana)', strength: 'in extra-virgin olive oil base' },
    ],
    inactives: [
      flag(
        'Extra virgin olive oil (Olea europaea) base',
        'cleared',
        labelCite(CITE.earClear, METH.capsuleOil),
      ),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Kids Ear Clear Oil = Clean. HTML lists named botanicals in an extra-virgin olive oil base. Olive oil is a liquid-drop / topical carrier, not gummy High. ${CAPSULE_OIL_TAP} Typical kids ear-oil class (confirm carton age). Cleanliness grade only; no efficacy claim.`,
    cite: CITE.earClear,
  }),
  row({
    id: ID.easeUnflavored,
    productName: 'Sprouts Unflavored Relax-All Ease Powder',
    category: SLEEP,
    form: 'powder',
    actives: [
      { name: 'Ionic magnesium citrate (citric acid, magnesium carbonate, and sea magnesium)', strength: 'label serving' },
    ],
    inactives: [
      labelCleared(CITE.easeUnflavored, 'Citric acid (magnesium citrate system)'),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Unflavored Relax-All Ease Powder = Clean. HTML treats the ionic magnesium citrate system (citric acid, magnesium carbonate, sea magnesium) as the full formula. Citrate salts / citric acid are Cleared. Separate formulaId from Dragonfruit Relax-All Ease (organic flavor + steviol glycosides). PDP id is 25561821 — not 26561819.',
    cite: CITE.easeUnflavored,
  }),
  row({
    id: ID.easeDragon,
    productName: 'Sprouts Dragonfruit Relax-All Ease Powder',
    category: SLEEP,
    form: 'powder',
    actives: [
      { name: 'Ionic magnesium citrate (citric acid, magnesium carbonate, and sea magnesium)', strength: 'label serving' },
    ],
    inactives: [
      labelCleared(CITE.easeDragon, 'Citric acid (magnesium citrate system)'),
      flag(
        'Organic dragon fruit flavor',
        'cleared',
        labelCite(CITE.easeDragon, METH.organicFlavor),
      ),
      flag(
        'Organic steviol glycosides',
        'cleared',
        labelCite(CITE.easeDragon, METH.stevia),
      ),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Dragonfruit Relax-All Ease Powder = Clean. HTML adds organic dragon fruit flavor (Cleared organic-flavor row) and organic steviol glycosides (Cleared high-purity stevia). Separate formulaId from the unflavored powder. PDP id is 25561819 — not 26561819.',
    cite: CITE.easeDragon,
  }),
  row({
    id: ID.spirulina,
    productName: 'Sprouts Organic Blue Spirulina Powder',
    category: VITAMINS,
    form: 'powder',
    actives: [
      { name: 'Organic phycocyanin (Arthrospira platensis extract)', strength: 'label serving' },
    ],
    inactives: [
      flag('Organic acacia fiber', 'cleared', labelCite(CITE.spirulina, METH.gums)),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Organic Blue Spirulina Powder = Clean. HTML Ingredients: organic phycocyanin (Arthrospira platensis extract) and organic acacia fiber (gum arabic Cleared). The organic spirulina tablet / jar twins stay blocked (no writable OI).',
    cite: CITE.spirulina,
  }),
  row({
    id: ID.d3_1000,
    productName: 'Sprouts Vitamin D3 1000 IU Softgel',
    category: VITAMINS,
    form: 'softgel',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin D3 (cholecalciferol)', strength: '1000 IU' }],
    inactives: [
      labelCleared(CITE.d3_1000, 'Gelatin'),
      labelCleared(CITE.d3_1000, 'Glycerin'),
      labelCleared(CITE.d3_1000, 'Purified water'),
      flag('Rice bran oil (softgel fill)', 'cleared', labelCite(CITE.d3_1000, METH.riceBranOil)),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Vitamin D3 1000 IU softgel = Clean. RESCAN photo OI is gelatin, glycerin, purified water, and rice bran oil. Rice bran oil is a Cleared softgel fill (not organic rice bran extract; not gummy High). ${RICE_BRAN_OIL_TAP} Separate formulaId from D3 2000 IU (same oil family, different strength) and from D3 5000 Citrus MCT liquid.`,
    cite: CITE.d3_1000,
  }),
  row({
    id: ID.d3_2000,
    productName: 'Sprouts Vitamin D3 2000 IU Softgel',
    category: VITAMINS,
    form: 'softgel',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin D3 (cholecalciferol)', strength: '2000 IU' }],
    inactives: [
      labelCleared(CITE.d3_2000, 'Gelatin'),
      labelCleared(CITE.d3_2000, 'Glycerin'),
      labelCleared(CITE.d3_2000, 'Purified water'),
      flag('Rice bran oil (softgel fill)', 'cleared', labelCite(CITE.d3_2000, METH.riceBranOil)),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Vitamin D3 2000 IU softgel = Clean. Same rice-bran-oil fill family as the 1000 IU row; separate formulaId because strength differs. ${RICE_BRAN_OIL_TAP}`,
    cite: CITE.d3_2000,
  }),
  row({
    id: ID.beet,
    productName: 'Sprouts Organic Beet Root',
    category: VITAMINS,
    form: 'capsule',
    actives: [{ name: 'Organic beet root', strength: 'label serving' }],
    inactives: [
      flag('Organic pullulan capsule', 'cleared', labelCite(CITE.beet, METH.pullulan)),
      labelCleared(CITE.beet, 'Organic brown rice flour'),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Organic Beet Root = Clean. HTML Other Ingredients: organic pullulan capsule (Cleared HPMC-family vegan cap) and organic brown rice flour (Cleared starch / food-state rice). Organic beet root itself is Cleared whole-food. Not a synthetic dye.',
    cite: CITE.beet,
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: 'sprouts-zinc-lozenges-cool-lemon',
    productName: 'Sprouts Zinc Lozenges Cool Lemon',
    category: IMMUNE,
    form: 'lozenge',
    productType: SUPPLEMENT,
    zinc: true,
    actives: [
      { name: 'Zinc', strength: 'label serving' },
      { name: 'Natural Defense Blend (includes natural lemon flavor on the Facts panel)', strength: 'label serving' },
    ],
    inactives: [
      flag('Sorbitol', 'limited', labelCite(CITE.zincLozenge, METH.sorbitol)),
      flag('Fructose', 'limited', labelCite(CITE.zincLozenge, METH.fructose)),
      labelCleared(CITE.zincLozenge, 'Cellulose'),
      labelCleared(CITE.zincLozenge, 'Calcium stearate'),
      labelCleared(CITE.zincLozenge, 'Brown rice syrup solids'),
      flag('Silicon dioxide', 'cleared', labelCite(CITE.zincLozenge, METH.sio2)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Zinc Lozenges Cool Lemon = Caution. Drivers are sorbitol + fructose (2 Limited) plus the silicon dioxide 0-pt Caution cap. Natural lemon flavor sits in the active Natural Defense Blend, not Other Ingredients — not scored as an OI flavor row. Cellulose, calcium stearate, and brown rice syrup solids are Cleared. ${LIMITED_STACK}`,
    cite: CITE.zincLozenge,
    alts: [...ALTS.zinc],
  }),
  row({
    id: 'sprouts-vitamin-c-1000-capsules',
    productName: 'Sprouts Vitamin C 1000 mg Capsules',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin C (ascorbic acid)', strength: '1000mg' }],
    inactives: [
      labelCleared(CITE.vitC1000, 'Vegetarian cellulose capsule'),
      labelCleared(CITE.vitC1000, 'Magnesium stearate'),
      flag('Silicon dioxide', 'cleared', labelCite(CITE.vitC1000, METH.sio2)),
    ],
    verdict: 'caution',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Vitamin C 1000 mg capsules = Caution. Driver is silicon dioxide (nanoparticle Caution cap, 0 demerit points). Vegetarian cellulose capsule and magnesium stearate are Cleared. 100 ct and 250 ct (productId 17858883) share this formulaId. Do not invent Clean on the SiO2 cap. No independently Clean Sprouts vitamin C in this batch — cleanAlternatives omitted.',
    cite: CITE.vitC1000,
  }),
  row({
    id: 'sprouts-zinc-50-tablets',
    productName: 'Sprouts Zinc 50 mg Tablets',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    zinc: true,
    actives: [{ name: 'Zinc', strength: '50mg' }],
    inactives: [
      labelCleared(CITE.zinc50, 'Cellulose'),
      labelCleared(CITE.zinc50, 'Cellulose gum'),
      labelCleared(CITE.zinc50, 'Stearic acid'),
      labelCleared(CITE.zinc50, 'Calcium stearate'),
      labelCleared(CITE.zinc50, 'Glycerin'),
      flag('Silicon dioxide (silica)', 'cleared', labelCite(CITE.zinc50, METH.sio2)),
    ],
    verdict: 'caution',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts Zinc 50 mg tablets = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). Cellulose, cellulose gum, stearic acid, calcium stearate, and glycerin are Cleared. Separate formulaId from Zinc Picolinate 30 mg (Clean).',
    cite: CITE.zinc50,
    alts: [...ALTS.zinc],
  }),
  row({
    id: 'sprouts-b12-1000-pr',
    productName: 'Sprouts B-12 1000 mcg Prolonged Release',
    category: VITAMINS,
    form: 'prolonged-release tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B-12', strength: '1000 mcg' }],
    inactives: [
      labelCleared(CITE.b12pr, 'Cellulose'),
      labelCleared(CITE.b12pr, 'Stearic acid'),
      labelCleared(CITE.b12pr, 'Calcium stearate'),
      labelCleared(CITE.b12pr, 'Glycerin'),
      flag('Silicon dioxide (silica)', 'cleared', labelCite(CITE.b12pr, METH.sio2)),
    ],
    verdict: 'caution',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts B-12 1000 mcg Prolonged Release = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). Separate formulaId from B-12 500 mcg (unspecified resin Caution). No independently Clean Sprouts B-12 tablet in this batch — cleanAlternatives omitted.',
    cite: CITE.b12pr,
  }),
  row({
    id: 'sprouts-l-lysine-1000',
    productName: 'Sprouts L-Lysine 1000 mg',
    category: IMMUNE,
    form: 'tablet',
    actives: [{ name: 'L-Lysine', strength: '1000mg' }],
    inactives: [
      labelCleared(CITE.lysine1000, 'Vegetable stearates'),
      labelCleared(CITE.lysine1000, 'Modified cellulose'),
      flag('Silicon dioxide (silica)', 'cleared', labelCite(CITE.lysine1000, METH.sio2)),
    ],
    verdict: 'caution',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts L-Lysine 1000 mg = Caution. Driver is silica (0-pt Caution cap). Vegetable stearates and modified cellulose are Cleared. Separate formulaId from L-Lysine 500 mg (adds calcium phosphate). No independently Clean lysine in this batch — cleanAlternatives omitted.',
    cite: CITE.lysine1000,
  }),
  row({
    id: 'sprouts-l-lysine-500',
    productName: 'Sprouts L-Lysine 500 mg',
    category: IMMUNE,
    form: 'tablet',
    actives: [{ name: 'L-Lysine', strength: '500mg' }],
    inactives: [
      labelCleared(CITE.lysine500, 'Calcium phosphate'),
      labelCleared(CITE.lysine500, 'Vegetable stearates'),
      labelCleared(CITE.lysine500, 'Cellulose'),
      labelCleared(CITE.lysine500, 'Modified cellulose'),
      flag('Silicon dioxide (silica)', 'cleared', labelCite(CITE.lysine500, METH.sio2)),
    ],
    verdict: 'caution',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts L-Lysine 500 mg = Caution. Different formula from 1000 mg (adds calcium phosphate). Driver is silica (0-pt Caution cap). Calcium phosphate / vegetable stearates / cellulose / modified cellulose are Cleared. Separate formulaId from L-Lysine 1000 mg. No independently Clean lysine in this batch — cleanAlternatives omitted.',
    cite: CITE.lysine500,
  }),
  row({
    id: 'sprouts-melatonin-3mg-liquid',
    productName: 'Sprouts Melatonin 3 mg Liquid',
    category: SLEEP,
    form: 'liquid',
    actives: [{ name: 'Melatonin', strength: '3mg (label serving)' }],
    inactives: [
      labelCleared(CITE.melatoninLiq, 'Vegetable glycerin'),
      labelCleared(CITE.melatoninLiq, 'Deionized water'),
      flag('Natural flavors', 'limited', labelCite(CITE.melatoninLiq, METH.flavors)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Melatonin 3 mg liquid = Caution. Driver is natural flavors (1 Limited). Vegetable glycerin and deionized water are Cleared. Separate formulaId from the 60 ct melatonin tablets (PDP failed / no panel — stays blocked). ${LIMITED_STACK}`,
    cite: CITE.melatoninLiq,
    alts: [...ALTS.sleep],
  }),
  row({
    id: 'sprouts-sleep-liquid',
    productName: 'Sprouts Sleep Liquid',
    category: SLEEP,
    form: 'liquid tincture',
    actives: [{ name: 'Sleep herbal extract blend', strength: 'label serving' }],
    inactives: [
      flag(
        'Grain alcohol (50–60% as vehicle)',
        'limited',
        labelCite(CITE.sleepLiq, METH.alcoholVehicle),
      ),
      labelCleared(CITE.sleepLiq, 'Deionized water'),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Sleep liquid 1 fl oz = Caution. Driver is grain alcohol as the extract vehicle (Limited, not Avoid). ${ALCOHOL_VEHICLE_LINE} Deionized water is Cleared. ${LIMITED_STACK} Do not assume other unread alcohol tinctures.`,
    cite: CITE.sleepLiq,
    alts: [...ALTS.sleep],
  }),
  row({
    id: 'sprouts-valerian-liquid',
    productName: 'Sprouts Valerian Liquid',
    category: SLEEP,
    form: 'liquid tincture',
    actives: [{ name: 'Valerian (Valeriana officinalis) extract', strength: 'label serving' }],
    inactives: [
      flag(
        'Grain alcohol (65–75% as vehicle)',
        'limited',
        labelCite(CITE.valerianLiq, METH.alcoholVehicle),
      ),
      labelCleared(CITE.valerianLiq, 'Deionized water'),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Valerian liquid 1 fl oz = Caution. Driver is grain alcohol as the extract vehicle (Limited, not Avoid). ${ALCOHOL_VEHICLE_LINE} Alcohol-free valerian stays blocked. ${LIMITED_STACK}`,
    cite: CITE.valerianLiq,
    alts: [...ALTS.sleep],
  }),
  row({
    id: 'sprouts-b12-alcohol-free-sublingual',
    productName: 'Sprouts B12 Liquid Sublingual Alcohol Free',
    category: VITAMINS,
    form: 'liquid sublingual',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B-12', strength: 'label serving' }],
    inactives: [
      flag('Natural flavors (raspberry / berry)', 'limited', labelCite(CITE.b12af, METH.flavors)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts B12 Liquid Sublingual Alcohol Free = Caution. Driver is raspberry/berry natural flavors (1 Limited). Full carrier line was not independently dumped on the RESCAN photo — do not invent glycerin or water. ${LIMITED_STACK} No independently Clean Sprouts B-12 liquid in this batch — cleanAlternatives omitted.`,
    cite: CITE.b12af,
  }),
  row({
    id: 'sprouts-b-complex-raspberry-liquid',
    productName: 'Sprouts B Complex Raspberry Liquid',
    category: VITAMINS,
    form: 'liquid',
    productType: VITAMIN,
    actives: [
      { name: 'B-complex vitamins', strength: 'label serving' },
      { name: 'Stevia leaf extract (Supplement Facts active)', strength: 'label serving' },
    ],
    inactives: [
      labelCleared(CITE.bComplex, 'Vegetable glycerin'),
      labelCleared(CITE.bComplex, 'Deionized water'),
      flag('Raspberry natural flavor', 'limited', labelCite(CITE.bComplex, METH.flavors)),
      flag('Lemon essential oil', 'limited', labelCite(CITE.bComplex, METH.lemonOil)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts B Complex Raspberry liquid = Caution. Drivers are raspberry natural flavor + named lemon essential oil (2 Limited). Vegetable glycerin and deionized water are Cleared. Stevia leaf extract is in Supplement Facts as an active, not Other Ingredients. 1 fl oz and 2 fl oz share this formulaId. ${LIMITED_STACK} No independently Clean Sprouts B-complex liquid in this batch — cleanAlternatives omitted.`,
    cite: CITE.bComplex,
  }),
  row({
    id: 'sprouts-b12-folic-b6-liquid',
    productName: 'Sprouts B-12 with Folic Acid & Vitamin B6 Liquid',
    category: VITAMINS,
    form: 'liquid sublingual',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin B-12', strength: 'label serving' },
      { name: 'Folic acid', strength: 'label serving' },
      { name: 'Vitamin B6', strength: 'label serving' },
    ],
    inactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.b12folic, METH.flavors)),
      flag('Lemon essential oil', 'limited', labelCite(CITE.b12folic, METH.lemonOil)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts B-12 with Folic Acid & Vitamin B6 liquid = Caution. RESCAN photo matches the B Complex Raspberry flavor/oil pattern (natural flavor + named lemon oil = 2 Limited). Glycerin/water were not independently dumped — do not invent them. ${LIMITED_STACK} No independently Clean Sprouts B-12 liquid in this batch — cleanAlternatives omitted.`,
    cite: CITE.b12folic,
  }),
  row({
    id: 'sprouts-d-mannose-cranberry-powder',
    productName: 'Sprouts D-Mannose + Cranberry Powder',
    category: DIGESTIVE,
    form: 'flavored powder',
    actives: [
      { name: 'D-Mannose', strength: 'label serving' },
      { name: 'Cranberry', strength: 'label serving' },
    ],
    inactives: [
      flag('Organic maltodextrin', 'limited', labelCite(CITE.dmannose, METH.maltodextrin)),
      labelCleared(CITE.dmannose, 'Citric acid'),
      flag('Stevia leaf extract', 'cleared', labelCite(CITE.dmannose, METH.stevia)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts D-Mannose + Cranberry powder = Caution. Driver is organic maltodextrin (1 Limited — same as non-organic). Citric acid is Cleared. Stevia leaf extract is Cleared high-purity (not whole-leaf). ${LIMITED_STACK} Unflavored D-mannose tablets stay blocked. No independently Clean digestive powder in this batch — cleanAlternatives omitted.`,
    cite: CITE.dmannose,
  }),
  row({
    id: 'sprouts-optimal-sleep-mct',
    productName: 'Sprouts Optimal Sleep',
    category: SLEEP,
    form: 'capsule',
    actives: [{ name: 'Optimal Sleep herbal blend', strength: '1 capsule (label serving)' }],
    inactives: [
      flag('Non-GMO soy lecithin', 'cleared', labelCite(CITE.optimalSleep, METH.lecithin)),
      labelCleared(CITE.optimalSleep, 'Modified vegetable cellulose'),
      flag(
        'Medium chain triglycerides (source not named)',
        'limited',
        labelCite(CITE.optimalSleep, METH.mctUnlabeled),
      ),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Optimal Sleep = Caution. Driver is unlabeled MCT (Limited opacity — label says medium-chain triglycerides and does not name coconut). Soy lecithin and modified vegetable cellulose are Cleared. Coconut-labeled MCT on an oral capsule would be Cleared; this carton is the unlabeled twin. ${MCT_UNLABELED_TAP} ${LIMITED_STACK} Separate formulaId from Sleep Powder Cap (Clean).`,
    cite: CITE.optimalSleep,
    alts: [...ALTS.sleep],
  }),
  row({
    id: 'sprouts-d3-5000-citrus-mct',
    productName: 'Sprouts D3 5000 IU Citrus MCT Oil',
    category: VITAMINS,
    form: 'liquid oil',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin D3 (cholecalciferol)', strength: '5000 IU' }],
    inactives: [
      flag(
        'Medium chain triglycerides (source not named)',
        'limited',
        labelCite(CITE.d3_5000, METH.mctUnlabeled),
      ),
      flag('Orange essential oil', 'limited', labelCite(CITE.d3_5000, METH.orangeOil)),
      flag('Lemon essential oil', 'limited', labelCite(CITE.d3_5000, METH.lemonOil)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts D3 5000 IU Citrus MCT Oil = Caution. MCT on this carton does not name coconut → unlabeled MCT Limited. Orange essential oil is Limited (flavor/EO line). Named lemon oil is Limited. Full carrier list was not independently dumped — do not invent glycerin or water. ${MCT_UNLABELED_TAP} ${LIMITED_STACK} Separate formulaId from D3 1000 / 2000 rice-bran softgels (Clean).`,
    cite: CITE.d3_5000,
    alts: [...ALTS.d3],
  }),
  row({
    id: 'sprouts-b12-500-resin',
    productName: 'Sprouts B-12 500 mcg Tablets',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B-12', strength: '500 mcg' }],
    inactives: [
      labelCleared(CITE.b12500, 'Lactose'),
      flag('Resin (unspecified)', 'cleared', labelCite(CITE.b12500, METH.resin)),
      labelCleared(CITE.b12500, 'Cellulose'),
      labelCleared(CITE.b12500, 'Calcium stearate'),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts B-12 500 mcg tablets = Caution. Driver is unspecified resin (standalone Caution — label did not name the resin). ${RESIN_TAP} Lactose, cellulose, and calcium stearate are Cleared. Contains lactose. 100 ct and 250 ct share this formulaId. Separate from B-12 1000 mcg Prolonged Release (SiO2). Do not treat as topical wood rosin. No independently Clean Sprouts B-12 tablet in this batch — cleanAlternatives omitted.`,
    cite: CITE.b12500,
  }),
  row({
    id: 'sprouts-calcium-citrate-d-trisilicate',
    productName: 'Sprouts Calcium Citrate with Vitamin D',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Calcium (as calcium citrate)', strength: 'label serving' },
      { name: 'Vitamin D', strength: 'label serving' },
    ],
    inactives: [
      labelCleared(CITE.calCitrate, 'Cellulose'),
      labelCleared(CITE.calCitrate, 'Magnesium stearate'),
      labelCleared(CITE.calCitrate, 'Modified cellulose gum'),
      labelCleared(CITE.calCitrate, 'Glycerin'),
      flag(
        'Magnesium trisilicate',
        'cleared',
        labelCite(CITE.calCitrate, METH.trisilicate),
      ),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Calcium Citrate with Vitamin D = Caution. Driver is magnesium trisilicate (standalone Caution — silicate-adjacent filler). ${TRISILICATE_TAP} Cellulose, magnesium stearate, modified cellulose gum, and glycerin are Cleared. Separate formulaId from Calcium 600 mg with Vitamin D softgel (Avoid, TiO2).`,
    cite: CITE.calCitrate,
    alts: [...ALTS.calcium],
  }),
  row({
    id: 'sprouts-original-herb-lozenges',
    productName: 'Sprouts Original Herb Herbal Lozenges',
    category: COLD_FLU,
    form: 'herbal lozenge',
    actives: [{ name: 'Menthol', strength: 'label serving' }],
    inactives: [
      labelCleared(CITE.herbLozenge, 'Sugar'),
      labelCleared(CITE.herbLozenge, 'Glucose syrup'),
      flag('Honey', 'cleared', labelCite(CITE.herbLozenge, METH.honey)),
      flag(
        'Extract of 20 herbs (licorice root, plantain leaves, blackberry leaves, peppermint leaves, chamomile flower, mallow flower, primrose flower, elderflower, thyme, Icelandic moss, linden flower, sage leaves, anise, marshmallow leaves, pimpernel root, fennel, marigold flower, mullein flower, eucalyptus leaves, yarrow flower)',
        'cleared',
        labelCite(CITE.herbLozenge, METH.namedBotanical),
      ),
      flag(
        'Caramel sugar syrup (color)',
        'cleared',
        labelCite(CITE.herbLozenge, METH.caramelSyrup),
      ),
      flag('Peppermint oil', 'limited', labelCite(CITE.herbLozenge, METH.peppermintOil)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Original Herb Herbal Lozenges = Caution. Driver is peppermint oil (Limited flavor/EO line). Caramel sugar syrup is Cleared food sugar — not caramel color / E150 and not the undisclosed-class Avoid row. ${CARAMEL_SYRUP_TAP} Named 20-herb extract is Cleared-class food/botanical (do not Caution on those herbs alone). Menthol is treated as the labeled active (parked active-safety; not an inactive grade). ${HONEY_LINE} ${LIMITED_STACK}`,
    cite: CITE.herbLozenge,
    alts: [...ALTS.cold],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: 'sprouts-omega3-turmeric-tio2',
    productName: 'Sprouts High Potency Omega-3 + Turmeric',
    category: VITAMINS,
    form: 'softgel',
    actives: [
      { name: 'Omega-3 fish oil (highly refined and concentrated)', strength: 'label serving' },
      { name: 'Meriva turmeric phytosome', strength: 'label serving' },
    ],
    inactives: [
      flag('Titanium dioxide', 'high', labelCite(CITE.omega3Turmeric, METH.tio2)),
      flag('Annatto extract', 'cleared', labelCite(CITE.omega3Turmeric, METH.annatto)),
      labelCleared(CITE.omega3Turmeric, 'Gelatin'),
      labelCleared(CITE.omega3Turmeric, 'Glycerin'),
      labelCleared(CITE.omega3Turmeric, 'Purified water'),
      labelCleared(CITE.omega3Turmeric, 'Beeswax'),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.omega3Turmeric, METH.lecithin)),
      labelCleared(CITE.omega3Turmeric, 'Mixed tocopherols'),
    ],
    verdict: 'avoid',
    note:
      'FOUNDER-STYLE DRAFT: Sprouts High Potency Omega-3 + Turmeric = Avoid. Driver is titanium dioxide in the capsule shell (High). Annatto extract is standalone Caution and loses to High. Gelatin, glycerin, water, beeswax, sunflower lecithin, and mixed tocopherols are Cleared. Meriva turmeric phytosome is treated as an active, not OI. D-Limonene appears on the HTML string and is not in Methodology §5 (ungraded; v1.6 intake; notes-only — Avoid already stands on TiO2). HTML typos kept as published (Phyosome / Natura Mixed Ocopherols). Other house omega-3s stay blocked (front-only).',
    cite: CITE.omega3Turmeric,
    alts: [...ALTS.omega],
  }),
  row({
    id: 'sprouts-calcium-600-d-softgel-tio2',
    productName: 'Sprouts Calcium 600 mg with Vitamin D Softgel',
    category: VITAMINS,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Calcium', strength: '600mg' },
      { name: 'Vitamin D', strength: 'label serving' },
    ],
    inactives: [
      flag('Titanium dioxide', 'high', labelCite(CITE.calcium600, METH.tio2)),
      flag('Soybean oil (softgel fill)', 'cleared', labelCite(CITE.calcium600, METH.capsuleOil)),
      labelCleared(CITE.calcium600, 'Gelatin'),
      labelCleared(CITE.calcium600, 'Glycerin'),
      flag('Soy lecithin', 'cleared', labelCite(CITE.calcium600, METH.lecithin)),
      labelCleared(CITE.calcium600, 'Water'),
      labelCleared(CITE.calcium600, 'Natural beeswax'),
    ],
    verdict: 'avoid',
    note:
      `FOUNDER-STYLE DRAFT: Sprouts Calcium 600 mg with Vitamin D softgel = Avoid. Driver is titanium dioxide (High). Soybean oil is capsule fill, not gummy seed-oil High. ${CAPSULE_OIL_TAP} Separate formulaId from Calcium Citrate + D tablets (magnesium trisilicate Caution).`,
    cite: CITE.calcium600,
    alts: [...ALTS.calcium],
  }),
];

for (const record of BATCH35_SPROUTS) {
  const expected = BATCH35_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 35 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 35 must not invent barcodes on ${record.id}`);
  }
}
