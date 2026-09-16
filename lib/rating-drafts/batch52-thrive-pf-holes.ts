// DRAFT / not verified / batch 52 Thrive Market P&F holes WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only. Do NOT invent a Topical aisle.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack
// sizes of the same name+form+inactives share formulaId. Same
// OI+actives share formulaId. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Not wired into Clean
// Picks UI. No live Clean Picks file is edited. Do NOT restore
// Biofreeze Clean Picks. No photos. Letter tiles only on new ids.
// No fake Clean alts. No methodology rewrite. No Sprouts. Do NOT
// touch painFeverPicks.ts. Do NOT rewrite existing list-1 reuse
// rows (Boiron Arnica / Arnicare / Camilia, Genexa Arnica,
// MegaFood turmeric twins, Thorne glutamine / glucosamine).
//
// TALLY (unverified drafts in THIS file): 14 rows — Clean 8 /
// Caution 5 / Avoid 1.
// Independently Clean in THIS batch: Ollois Arnica 12C pellets;
// Oregon’s Wild Harvest Turmeric; Organic India Turmeric Formula;
// Sports Research Turmeric Curcumin softgel; New Chapter Turmeric
// Force; Codeage Liposomal Turmeric+; Gaia Herbs Turmeric Supreme
// Extra Strength; Life-flo Pure Magnesium Oil spray.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Boiron Arnica / Arnicare / Camilia (batch 34 / 12)
// Genexa Arnica Pain (batch 32)
// MegaFood turmeric twins (batch 31)
// Thorne L-Glutamine Powder + Glucosamine & Chondroitin (batch 28)
// Batches 41–51 pain-rub / P&F writes
//
// LIST 2 written (8 formula rows) under current §5 locks:
// - Ollois Arnica Montana 12C pellets — Clean (organic sucrose).
// - Oregon’s Wild Harvest Turmeric — Clean (pullulan capsule).
// - Organic India Turmeric Formula — Clean (organic pullulan).
// - Sports Research Turmeric Curcumin softgel — Clean (named
//   coconut-oil fill Cleared; ≠ gummy High).
// - wellmade by Thrive Market Turmeric — Caution (silica / SiO2
//   0-pt cap).
// - New Chapter Turmeric Force — Clean (olive-oil fill Cleared).
// - Codeage Liposomal Turmeric+ — Clean (sunflower-oil fill +
//   sunflower lecithin Cleared).
// - Life-flo Pure Magnesium Oil spray — Clean (magnesium chloride
//   brine only).
//
// LIST 3 written (6 formula rows) after founder leftover locks:
// - Gaia Herbs Turmeric Supreme Extra Strength — Clean
//   (chlorophyll named pigment Cleared ≠ chlorophyllin).
// - Thorne Curcumin Phytosome 500 mg — Caution (SiO2 cap;
//   leucine Cleared).
// - Thorne Curcumin Phytosome 1000 mg — Caution (same OI math;
//   per-capsule active 1000 mg ≠ 500 mg → own formulaId).
// - Garden of Life myKind Organics Inflammatory Response Turmeric
//   Gummies — Avoid (sunflower oil coating = gummy seed-oil High).
//   Organic rice meal Caution; fruit puree / juice concentrate
//   Limited. Limited-only would stay Caution; Avoid needs High.
// - Life-flo Magnesium Lotion Vanilla — Caution (fragrance).
//   Remaining blockers were MCT + cetearyl glucoside. Cetearyl
//   glucoside Cleared. Caprylic/Capric Triglyceride uses the
//   existing unlabeled-MCT Limited row (source not named on the
//   CCT token) + oil-fill tap. Do not invent a new string.
// - Life-flo Magnesium Lotion Unscented — Caution (Limited-only
//   stack: unlabeled MCT + potassium sorbate). Same CCT / cetearyl
//   glucoside locks. No fragrance.
//
// formulaId notes:
// - Thorne 500 and Thorne 1000 do NOT share formulaId — OI matches
//   but labeled per-capsule actives differ (500 mg vs 1000 mg).
// - Pack sizes of the same name+form+OI+actives share formulaId
//   (formulaId == id on every row).
//
// REFUSED (still missing an exact §5 row — do not invent): none.
// All written SKUs grade under current locks.
//
// SKIPPED by founder order (no Search rows):
// - Gaia Golden Milk
// - Weleda Arnica Muscle Massage Oil
// - Dr. Bronner’s Magic Balm Arnica-Menthol
// - New Chapter Turmeric Force Nighttime
// - Asutra Melt Pain Away (still multi-token question)
// - List 4 out items
// - Existing list-1 reuse rows named above

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const PAIN_FEVER = 'Pain & Fever';
const UNVERIFIED_NOTE = 'draft, not verified';

const THRIVE = ['Thrive Market'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. In this capsule / softgel fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this cream / lotion fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglyceride and does not name coconut on that token. We mark that Limited because the source isn’t clear. This lotion emollient / vehicle is not the gummy seed-oil High rule.';

const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. Sunflower oil used as a gummy coating is that High rule. Capsule / softgel / cream fill of the same oil is not.';

const CHLOROPHYLL_TAP =
  'Named chlorophyll pigment is Cleared. Distinct from Caution sodium copper chlorophyllin. The label names chlorophyll, not chlorophyllin.';

const RICE_MEAL_TAP =
  'Organic rice meal is the locked exact Caution token. Distinct from Cleared rice-hull / rice-bran / rice protein / rice flour and from Limited unspecified rice extract.';

const FRUIT_PUREE_TAP =
  'Fruit puree / juice concentrate as a gummy base is Limited. Distinct from the Cleared named juice-as-color row.';

const METH = {
  sio2:
    'Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  fruitPuree: `Methodology §5 Limited-risk (fruit puree / juice concentrate as gummy base — not the Cleared named juice-as-color row; locked Sept 15, 2026). ${FRUIT_PUREE_TAP}`,
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  seedOilGummies: `Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, vegetable oil, sunflower). ${GUMMY_OIL_TAP}`,
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid)',
  riceMeal: `Methodology §5 Caution (organic rice meal — exact token; distinct from Cleared rice-hull / rice-bran / rice protein and from Limited unspecified rice extract; standalone Caution, not Avoid; locked Sept 15, 2026). ${RICE_MEAL_TAP}`,
  chlorophyll: `Methodology §5 Cleared (chlorophyll, named pigment — distinct from Caution sodium copper chlorophyllin; locked Sept 15, 2026). ${CHLOROPHYLL_TAP}`,
  leucine:
    'Methodology §5 Cleared (leucine — exact INCI; locked Sept 15, 2026)',
  cetearylGlucoside:
    'Methodology §5 Cleared (cetearyl glucoside — exact INCI; distinct from cetearyl alcohol and from arachidyl glucoside; locked Sept 15, 2026)',
  pullulan:
    'Methodology §5 Cleared (organic pullulan — starch capsule polymer; HPMC-family vegan cap)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  methylcellulose:
    'Methodology §5 Cleared (methylcellulose — same family as hypromellose; EFSA: no carcinogenicity, no ADI needed)',
  cellulose:
    'Methodology §5 Cleared (vegetable cellulose / capsule cellulose / MCC — cellulose-family filler)',
  lecithin:
    'Methodology §5 Cleared (lecithin — canola, soy, or sunflower; locked v1.6). Sunflower lecithin: no allergen concern.',
  coconutFill: `Methodology §5 Cleared (coconut oil as capsule / softgel fill — named single oil as the fill; not the gummy seed-oil High rule). ${OIL_FILL_TAP}`,
  oliveFill: `Methodology §5 Cleared (named single oil as the BASE or FILL — extra-virgin olive oil capsule fill; tap fill ≠ gummy High; locked Sept 15, 2026). ${OIL_FILL_TAP}`,
  sunflowerFill: `Methodology §5 Cleared (named single oil as the BASE or FILL — sunflower oil capsule fill; tap fill ≠ gummy High; locked Sept 15, 2026). ${OIL_FILL_TAP}`,
  coconutTopical: `Methodology §5 Cleared (shea butter / coconut oil in cream or topical — not the gummy seed-oil High rule; form tap required; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  shea: `Methodology §5 Cleared (shea butter / coconut oil in cream or topical — not the gummy seed-oil High rule; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  beeswax: 'Methodology §5 Cleared (beeswax / yellow beeswax / organic yellow beeswax)',
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin — locked Sept 14, 2026 housekeeping)',
  mgChloride:
    'Methodology §5 Cleared (magnesium chloride — exact salt token; locked Sept 15, 2026)',
  calciumLaurate:
    'Methodology §5 Cleared (calcium laurate — stearate-family lubricant; locked Sept 14, 2026 housekeeping)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers/buffers — locked Sept 14, 2026 housekeeping)',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — standard cellulose-family filler)',
  sucrose:
    'Methodology §5 Cleared (cane sugar / sucrose / glucose syrup / tapioca syrup/dextrose — acceptable sweeteners)',
  pectin:
    'Methodology §5 Cleared (xanthan gum, guar gum, gum arabic / acacia, pectin, gellan gum — locked v1.6)',
  xanthan:
    'Methodology §5 Cleared (xanthan gum / guar / gum arabic / pectin / gellan — locked v1.6)',
  glycerylStearateSe:
    'Methodology §5 Cleared (glyceryl stearate SE — exact INCI; distinct from glyceryl stearate; locked Sept 15, 2026)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate / glyceryl monostearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  emulsifyingWax:
    'Methodology §5 Cleared (cetyl esters wax, emulsifying wax — wax family; locked Sept 15, 2026)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family)',
  riceFlour:
    'Methodology §5 Cleared (pregelatinized / corn / potato / rice flour / similar simple starches — locked v1.6 housekeeping). Light rice-powder dusting is this starch family, distinct from Caution organic rice meal.',
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

function labelCleared(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.cleared));
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

const ID = {
  ollois: 'ollois-arnica-montana-12c',
  owh: 'oregons-wild-harvest-turmeric',
  organicIndia: 'organic-india-turmeric-formula',
  sportsResearch: 'sports-research-turmeric-curcumin',
  wellmade: 'thrive-wellmade-turmeric',
  newChapter: 'new-chapter-turmeric-force',
  codeage: 'codeage-liposomal-turmeric',
  lifeFloOil: 'life-flo-pure-magnesium-oil',
  gaia: 'gaia-turmeric-supreme-extra-strength',
  thorne500: 'thorne-curcumin-phytosome-500',
  thorne1000: 'thorne-curcumin-phytosome-1000',
  golGummy: 'gol-mykind-turmeric-inflammatory-gummies',
  lotionVanilla: 'life-flo-magnesium-lotion-vanilla',
  lotionUnscented: 'life-flo-magnesium-lotion-unscented',
} as const;

const CITE = {
  ollois:
    'PureFormulas / Fullscript Ollois Arnica Montana 12C 80 pellets (SKU 855717003024) Drug Facts inactive: organic sucrose',
  owh:
    'Oregon\'s Wild Harvest / NHC Turmeric capsules (SKU 706195004105) other-ingredients: pullulan (from naturally fermented tapioca starch) capsules and nothing else',
  organicIndia:
    'Vitacost / iHerb Organic India Turmeric Formula 180 veg caps (SKU 801541512485) other-ingredients: organic pullulan',
  sportsResearch:
    'Target / Vitacost Sports Research Turmeric Curcumin 120 softgels (SKU 023249000839) other-ingredients: organic virgin coconut oil, softgel capsule (gelatin, vegetable glycerin, purified water), organic beeswax',
  wellmade:
    'Thrive Market wellmade Turmeric Herbal Supplement PDP https://thrivemarket.com/p/wellmade-turmeric-caps SKU 671635734631 other-ingredients: Vegan Capsule (Hypromellose, Water), Vegetable Cellulose, Silica',
  newChapter:
    'NewChapter.com / iHerb Turmeric Force 120 vegetarian capsules (SKU 727783900456) other-ingredients: extra-virgin olive oil, hypromellose (capsule), organic yellow beeswax',
  codeage:
    'Fullscript / Swanson Codeage Liposomal Turmeric+ (SKU 853919008472) other-ingredients: Methylcellulose Capsule, Phospholipid Complex (Non-GMO Sunflower Oil, Sunflower Lecithin)',
  lifeFloOil:
    'Vitacost / Swanson Life-flo Pure Magnesium Oil Spray 8 fl oz (SKU 645951405308) ingredients: magnesium chloride brine',
  gaia:
    'GaiaHerbs.com / iHerb Turmeric Supreme Extra Strength 120 liquid phyto-caps (SKU 751063145961) other-ingredients: sunflower lecithin, vegan capsule (hypromellose, chlorophyll), water, vegetable glycerin',
  thorne500:
    'iHerb / HelloPharmacist Thorne Curcumin Phytosome 120 capsules 500 mg/cap (SKU 693749004790) other-ingredients: Hypromellose (derived from cellulose) capsule, leucine, calcium laurate, silicon dioxide, calcium citrate, microcrystalline cellulose',
  thorne1000:
    'NHC / HelloPharmacist Thorne Curcumin Phytosome 1000 mg 60 capsules (SKU 693749004851) other-ingredients: Hypromellose (derived from cellulose) capsule, Leucine, Calcium Laurate, Silicon Dioxide, Calcium Citrate, Microcrystalline Cellulose',
  golGummy:
    'PureFormulas / iHerb Garden of Life mykind Organics Turmeric Inflammatory Response Gummy 120 vegan gummy drops (SKU 658010121781) other-ingredients: Certified Organic Fruit Chew Base Blend — organic apple (fruit puree concentrate & juice concentrate), organic peach (fruit puree concentrate), organic lemon juice concentrate, pectin (from apples and oranges), organic apple flavor, organic rice meal, organic sunflower oil (for coating)',
  lotionVanilla:
    'Life-flo.com Magnesium Lotion Vanilla (SKU 645951827285) ingredients: Aqua, Magnesium Oil (Magnesium Chloride Brine), Cocos Nucifera (Coconut) Oil, Glycerin, Caprylic/Capric Triglyceride, Butyrospermum Parkii (Shea Butter), Glyceryl Stearate SE, Emulsifying Wax NF, Cetearyl Glucoside, Cetearyl Alcohol, Fragrance, Hydroxypropyl Methylcellulose, Potassium Sorbate, Citric Acid, Xanthan Gum',
  lotionUnscented:
    'PureFormulas / SBNF Life-flo Magnesium Lotion Unscented 8 fl oz (SKU 645951164120) ingredients: Aqua, Magnesium Chloride Brine, Glycerin, Cocos Nucifera (Coconut) Oil, Caprylic/Capric Triglyceride, Butyrospermum Parkii (Shea) Butter, Glyceryl Stearate, Emulsifying Wax NF, Cetearyl Glucoside, Cetearyl Alcohol, Hydroxypropyl Methylcellulose, Potassium Sorbate, Citric Acid, Xanthan Gum',
} as const;

const ARNICARE_GEL = 'boiron-arnicare-gel';

const TURMERIC_ALTS: CleanAlternative[] = [
  alt(
    ID.owh,
    'Independently Clean in-batch Oregon’s Wild Harvest Turmeric (pullulan capsule only). Form: capsule — labeled, not a hard filter (§6). Same turmeric / curcumin shelf. Do not invent a Clean MegaFood turmeric (those rows stay Caution SiO2 on main).',
  ),
  alt(
    ID.organicIndia,
    'Independently Clean in-batch Organic India Turmeric Formula (organic pullulan capsule only). Form: capsule — labeled, not a hard filter (§6).',
  ),
  alt(
    ID.sportsResearch,
    'Independently Clean in-batch Sports Research Turmeric Curcumin (named coconut-oil softgel fill Cleared; ≠ gummy High). Form: softgel vs capsule — labeled, not a hard filter (§6).',
  ),
];

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ID.lifeFloOil,
    'Independently Clean in-batch Life-flo Pure Magnesium Oil spray (magnesium chloride brine only). Form: spray vs lotion — labeled, not a hard filter (§6). Same-brand topical magnesium. Do not invent a Clean conventional NSAID cream.',
  ),
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs lotion / spray — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine cream invented.',
  ),
];

const GUMMY_ALTS: CleanAlternative[] = [
  alt(
    ID.owh,
    'Independently Clean in-batch Oregon’s Wild Harvest Turmeric (pullulan capsule only). Form: capsule vs gummy — labeled, not a hard filter (§6). Same turmeric shelf; no gummy seed-oil High.',
  ),
  alt(
    ID.newChapter,
    'Independently Clean in-batch New Chapter Turmeric Force (olive-oil capsule fill Cleared; ≠ gummy High). Form: capsule vs gummy — labeled, not a hard filter (§6).',
  ),
];

export const BATCH52_THRIVE_PF_HOLES: RatingRecord[] = [
  row({
    id: ID.ollois,
    productName: 'Ollois Arnica Montana 12C Pellets',
    brand: 'Ollois',
    category: PAIN_FEVER,
    formulaId: ID.ollois,
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
    activeIngredients: [{ name: 'Arnica montana', strength: '12C HPUS' }],
    inactiveIngredients: [
      flag('Organic sucrose', 'cleared', labelCite(CITE.ollois, METH.sucrose)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Ollois Arnica Montana 12C pellets = Clean. Only scored inactive is organic sucrose (Cleared sweetener / pellet base). Lactose-free — do not clone Boiron Arnica 30C pellets (that row is lactose+sucrose and stays reuse-only on main). Homeopathic pellets — cleanliness only, no efficacy claim. Pack sizes share this formulaId. Label directions: adults/children. Ages 2+. Draft, not verified.',
    retailers: [...THRIVE, 'Ollois'],
    sourcesGeneral: [`${CITE.ollois} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.owh,
    productName: "Oregon's Wild Harvest Turmeric",
    brand: "Oregon's Wild Harvest",
    category: PAIN_FEVER,
    formulaId: ID.owh,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Turmeric rhizome extract (95% curcuminoids) + organic turmeric rhizome',
        strength: '1350mg per 3-capsule serving',
      },
      {
        name: 'Black pepper fruit extract (BioPerine)',
        strength: '9mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Pullulan (from naturally fermented tapioca starch) capsules',
        'cleared',
        labelCite(CITE.owh, METH.pullulan),
      ),
    ],
    verdict: 'clean',
    honestNote:
      "FOUNDER-LOCK DRAFT: Oregon's Wild Harvest Turmeric = Clean. Current brand / NHC other-ingredients: pullulan capsules and nothing else. Organic pullulan is the locked HPMC-family vegan cap. Turmeric + BioPerine are labeled actives listed neutrally — this draft grades inactives only and makes no efficacy claim. Older gelatin-capsule snapshots are a different unmatched formula — not this row. Pack sizes (60 / 120) share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.",
    retailers: [...THRIVE, "Oregon's Wild Harvest"],
    sourcesGeneral: [`${CITE.owh} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.organicIndia,
    productName: 'Organic India Turmeric Formula',
    brand: 'Organic India',
    category: PAIN_FEVER,
    formulaId: ID.organicIndia,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic turmeric rhizome', strength: '740mg' },
      { name: 'Organic turmeric extract', strength: '170mg' },
      { name: 'Organic black pepper berries', strength: '30mg' },
      { name: 'Organic ginger rhizome', strength: '30mg' },
      { name: 'Organic long pepper fruit', strength: '30mg' },
    ],
    inactiveIngredients: [
      flag(
        'Organic pullulan',
        'cleared',
        labelCite(CITE.organicIndia, METH.pullulan),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Organic India Turmeric Formula = Clean. Other-ingredients: organic pullulan only (locked HPMC-family vegan cap). Turmeric / black pepper / ginger / long pepper are labeled actives listed neutrally — this draft grades inactives only and makes no efficacy claim. 90-ct + 180-ct share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...THRIVE, 'Organic India'],
    sourcesGeneral: [`${CITE.organicIndia} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.sportsResearch,
    productName: 'Sports Research Turmeric Curcumin Softgels',
    brand: 'Sports Research',
    category: PAIN_FEVER,
    formulaId: ID.sportsResearch,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Turmeric extract (Curcumin C3 Complex, 95% curcuminoids)',
        strength: '500mg',
      },
      { name: 'Black pepper extract (BioPerine)', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Organic virgin coconut oil',
        'cleared',
        labelCite(CITE.sportsResearch, METH.coconutFill),
      ),
      flag(
        'Softgel capsule (gelatin, vegetable glycerin, purified water)',
        'cleared',
        labelCite(CITE.sportsResearch, METH.gelatin),
      ),
      flag(
        'Organic beeswax',
        'cleared',
        labelCite(CITE.sportsResearch, METH.beeswax),
      ),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: Sports Research Turmeric Curcumin softgel = Clean. Named coconut-oil fill is Cleared (fill ≠ gummy High — that High rule is the Sports Research gummy SKU, not this softgel). ${OIL_FILL_TAP} Gelatin / glycerin / water / organic beeswax are Cleared. Contains tree nuts (coconut) — allergen disclosure, not a grade. Turmeric + BioPerine are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.`,
    retailers: [...THRIVE, 'Sports Research', 'Target'],
    sourcesGeneral: [`${CITE.sportsResearch} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.wellmade,
    productName: 'wellmade by Thrive Market Turmeric Herbal Supplement',
    brand: 'wellmade by Thrive Market',
    category: PAIN_FEVER,
    formulaId: ID.wellmade,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Turmeric root extract (95% curcuminoids)',
        strength: '450mg',
      },
      { name: 'Black pepper fruit extract', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Vegan Capsule (Hypromellose, Water)',
        'cleared',
        labelCite(CITE.wellmade, METH.hpmc),
      ),
      flag(
        'Vegetable Cellulose',
        'cleared',
        labelCite(CITE.wellmade, METH.cellulose),
      ),
      flag('Silica', 'cleared', labelCite(CITE.wellmade, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: wellmade by Thrive Market Turmeric = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). HPMC / water / vegetable cellulose are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap. Distinct from batch 27 wellmade probiotics / vitamin C (those rows stay reuse-only). Turmeric + black pepper are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...THRIVE],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.wellmade} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.newChapter,
    productName: 'New Chapter Turmeric Force',
    brand: 'New Chapter',
    category: PAIN_FEVER,
    formulaId: ID.newChapter,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Turmeric rhizome aqueous extract', strength: '320mg' },
      {
        name: 'Organic turmeric rhizome supercritical extract',
        strength: '80mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Extra-virgin olive oil',
        'cleared',
        labelCite(CITE.newChapter, METH.oliveFill),
      ),
      flag(
        'Hypromellose (capsule)',
        'cleared',
        labelCite(CITE.newChapter, METH.hpmc),
      ),
      flag(
        'Organic yellow beeswax',
        'cleared',
        labelCite(CITE.newChapter, METH.beeswax),
      ),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: New Chapter Turmeric Force = Clean. Extra-virgin olive oil is the named capsule fill (Cleared; fill ≠ gummy High). ${OIL_FILL_TAP} HPMC + organic yellow beeswax are Cleared. Do not write Turmeric Force Nighttime (founder skip). Turmeric extracts are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults (not recommended for use in children). No dosing or medical advice in this draft. Draft, not verified.`,
    retailers: [...THRIVE, 'New Chapter'],
    sourcesGeneral: [`${CITE.newChapter} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.codeage,
    productName: 'Codeage Liposomal Turmeric+',
    brand: 'Codeage',
    category: PAIN_FEVER,
    formulaId: ID.codeage,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Fermented / organic turmeric curcumin blend',
        strength: 'label serving',
      },
    ],
    inactiveIngredients: [
      flag(
        'Methylcellulose capsule',
        'cleared',
        labelCite(CITE.codeage, METH.methylcellulose),
      ),
      flag(
        'Phospholipid complex (non-GMO sunflower oil)',
        'cleared',
        labelCite(CITE.codeage, METH.sunflowerFill),
      ),
      flag(
        'Sunflower lecithin',
        'cleared',
        labelCite(CITE.codeage, METH.lecithin),
      ),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: Codeage Liposomal Turmeric+ = Clean. Current Fullscript / Swanson other-ingredients: methylcellulose capsule + phospholipid complex (non-GMO sunflower oil, sunflower lecithin). Sunflower-oil fill is Cleared (fill ≠ gummy High). ${OIL_FILL_TAP} Sunflower lecithin is the locked lecithin row. Methylcellulose is Cleared with the HPMC / MCC family. Older “sunflower lecithin, phosphatidylcholine” snapshots are a different unmatched formula — not this row. Fermented turmeric / botanical blends are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.`,
    retailers: [...THRIVE, 'Codeage'],
    sourcesGeneral: [`${CITE.codeage} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.lifeFloOil,
    productName: 'Life-flo Pure Magnesium Oil Spray',
    brand: 'Life-flo',
    category: PAIN_FEVER,
    formulaId: ID.lifeFloOil,
    audience: ADULT,
    minAge: 18,
    form: 'spray',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium chloride brine', strength: '~70mg elemental Mg per 4 sprays' },
    ],
    inactiveIngredients: [
      flag(
        'Magnesium chloride brine',
        'cleared',
        labelCite(CITE.lifeFloOil, METH.mgChloride),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Life-flo Pure Magnesium Oil spray = Clean. Label ingredients: magnesium chloride brine only (nothing added / nothing removed). Magnesium chloride is the locked exact Cleared salt token. This is a topical brine spray, not a cooking-oil bottle and not an OilInfoRecord. External use only. Pack sizes share this formulaId when the ingredients list holds. No DailyMed drug SPL. Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...THRIVE, 'Life-flo'],
    sourcesGeneral: [`${CITE.lifeFloOil} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.gaia,
    productName: 'Gaia Herbs Turmeric Supreme Extra Strength',
    brand: 'Gaia Herbs',
    category: PAIN_FEVER,
    formulaId: ID.gaia,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Turmeric root extract blend (curcuminoids)',
        strength: '616mg herbal extract blend / 50mg curcuminoids',
      },
      {
        name: 'Black pepper fruit supercritical CO2 extract',
        strength: '7mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Sunflower lecithin',
        'cleared',
        labelCite(CITE.gaia, METH.lecithin),
      ),
      flag(
        'Vegan capsule (hypromellose)',
        'cleared',
        labelCite(CITE.gaia, METH.hpmc),
      ),
      flag(
        'Chlorophyll',
        'cleared',
        labelCite(CITE.gaia, METH.chlorophyll),
      ),
      labelCleared(CITE.gaia, 'Water'),
      flag(
        'Vegetable glycerin',
        'cleared',
        labelCite(CITE.gaia, METH.glycerin),
      ),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: Gaia Herbs Turmeric Supreme Extra Strength = Clean. Chlorophyll is the named pigment (Cleared; ≠ Caution chlorophyllin). ${CHLOROPHYLL_TAP} Sunflower lecithin / HPMC / water / vegetable glycerin are Cleared. Do not write Gaia Golden Milk (founder skip). Turmeric + black pepper are labeled actives listed neutrally. Pack sizes share this formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.`,
    retailers: [...THRIVE, 'Gaia Herbs'],
    sourcesGeneral: [`${CITE.gaia} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.thorne500,
    productName: 'Thorne Curcumin Phytosome 500 mg',
    brand: 'Thorne',
    category: PAIN_FEVER,
    formulaId: ID.thorne500,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Curcumin phytosome (Meriva; sunflower phospholipid complex)',
        strength: '500mg per capsule / 1g per 2-capsule serving',
      },
    ],
    inactiveIngredients: [
      flag(
        'Hypromellose (derived from cellulose) capsule',
        'cleared',
        labelCite(CITE.thorne500, METH.hpmc),
      ),
      flag('Leucine', 'cleared', labelCite(CITE.thorne500, METH.leucine)),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(CITE.thorne500, METH.calciumLaurate),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(CITE.thorne500, METH.sio2),
      ),
      flag(
        'Calcium citrate',
        'cleared',
        labelCite(CITE.thorne500, METH.citrate),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(CITE.thorne500, METH.mcc),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Thorne Curcumin Phytosome 500 mg = Caution. Driver is silicon dioxide (0-pt Caution cap). Leucine is the locked exact Cleared token. HPMC / calcium laurate / calcium citrate / MCC are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap. Own formulaId — do not share with the 1000 mg SKU (per-capsule active 500 mg ≠ 1000 mg even though OI matches). Do not clone Thorne L-Glutamine Powder or Glucosamine & Chondroitin (reuse-only on main). Pack sizes of this 500 mg/cap formula share this formulaId. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.',
    retailers: [...THRIVE, 'Thorne'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.thorne500} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.thorne1000,
    productName: 'Thorne Curcumin Phytosome 1000 mg',
    brand: 'Thorne',
    category: PAIN_FEVER,
    formulaId: ID.thorne1000,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Curcumin phytosome (Meriva; sunflower phospholipid complex)',
        strength: '1000mg per capsule',
      },
    ],
    inactiveIngredients: [
      flag(
        'Hypromellose (derived from cellulose) capsule',
        'cleared',
        labelCite(CITE.thorne1000, METH.hpmc),
      ),
      flag('Leucine', 'cleared', labelCite(CITE.thorne1000, METH.leucine)),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(CITE.thorne1000, METH.calciumLaurate),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(CITE.thorne1000, METH.sio2),
      ),
      flag(
        'Calcium citrate',
        'cleared',
        labelCite(CITE.thorne1000, METH.citrate),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(CITE.thorne1000, METH.mcc),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Thorne Curcumin Phytosome 1000 mg = Caution. Same OI math as the 500 mg SKU (SiO2 0-pt cap; leucine Cleared; HPMC / calcium laurate / calcium citrate / MCC Cleared). Per-capsule active is 1000 mg — own formulaId ${ID.thorne1000}, do NOT clone ${ID.thorne500}. Do not clone Thorne L-Glutamine Powder or Glucosamine & Chondroitin. Pack sizes of this 1000 mg/cap formula share this formulaId. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. Draft, not verified.`,
    retailers: [...THRIVE, 'Thorne'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.thorne1000} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.golGummy,
    productName:
      'Garden of Life myKind Organics Inflammatory Response Turmeric Gummies',
    brand: 'Garden of Life',
    category: PAIN_FEVER,
    formulaId: ID.golGummy,
    audience: ADULT,
    minAge: 4,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Organic fermented turmeric root / turmeric extract / black pepper',
        strength: '254mg blend (50mg curcuminoids)',
      },
      { name: 'Organic cinnamon bark', strength: '60mg' },
      { name: 'Organic fermented ginger root', strength: '50mg' },
    ],
    inactiveIngredients: [
      flag(
        'Organic apple (fruit puree concentrate & juice concentrate)',
        'limited',
        labelCite(CITE.golGummy, METH.fruitPuree),
      ),
      flag(
        'Organic peach (fruit puree concentrate)',
        'limited',
        labelCite(CITE.golGummy, METH.fruitPuree),
      ),
      flag(
        'Organic lemon juice concentrate',
        'limited',
        labelCite(CITE.golGummy, METH.fruitPuree),
      ),
      flag('Pectin (from apples and oranges)', 'cleared', labelCite(CITE.golGummy, METH.pectin)),
      flag(
        'Organic apple flavor',
        'limited',
        labelCite(CITE.golGummy, METH.flavors),
      ),
      flag(
        'Organic rice meal',
        'cleared',
        labelCite(CITE.golGummy, METH.riceMeal),
      ),
      flag(
        'Organic sunflower oil (for coating)',
        'high',
        labelCite(CITE.golGummy, METH.seedOilGummies),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Garden of Life myKind Organics Inflammatory Response Turmeric Gummies = Avoid. Driver is organic sunflower oil for coating (gummy seed-oil High). ${GUMMY_OIL_TAP} Organic rice meal is the locked exact Caution token. ${RICE_MEAL_TAP} Fruit puree / juice concentrate as the gummy base is Limited (not the Cleared juice-as-color row). ${FRUIT_PUREE_TAP} Organic apple flavor is Limited opacity. Pectin is Cleared. Limited-only would stay Caution; Avoid needs this High. Carton also says “lightly dusted with organic rice powder, not sugar” — that dusting is the Cleared rice-flour / simple-starch family, distinct from Caution organic rice meal, and is not a second High. Label: adults 4 gummies daily; children 4+ under adult supervision. Pack sizes share this formulaId. No DailyMed drug SPL (dietary supplement). ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...THRIVE, 'Garden of Life'],
    cleanAlternatives: GUMMY_ALTS,
    sourcesGeneral: [`${CITE.golGummy} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.lotionVanilla,
    productName: 'Life-flo Magnesium Lotion Vanilla',
    brand: 'Life-flo',
    category: PAIN_FEVER,
    formulaId: ID.lotionVanilla,
    audience: ADULT,
    minAge: 18,
    form: 'lotion',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium chloride brine', strength: 'label serving' },
    ],
    inactiveIngredients: [
      labelCleared(CITE.lotionVanilla, 'Aqua'),
      flag(
        'Magnesium oil (magnesium chloride brine)',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.mgChloride),
      ),
      flag(
        'Cocos nucifera (coconut) oil',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.coconutTopical),
      ),
      flag('Glycerin', 'cleared', labelCite(CITE.lotionVanilla, METH.glycerin)),
      flag(
        'Caprylic/Capric Triglyceride',
        'limited',
        labelCite(CITE.lotionVanilla, METH.mctUnlabeled),
      ),
      flag(
        'Butyrospermum parkii (shea butter)',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.shea),
      ),
      flag(
        'Glyceryl stearate SE',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.glycerylStearateSe),
      ),
      flag(
        'Emulsifying wax NF',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.emulsifyingWax),
      ),
      flag(
        'Cetearyl glucoside',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.cetearylGlucoside),
      ),
      flag(
        'Cetearyl alcohol',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.fattyAlcohol),
      ),
      flag(
        'Fragrance',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.fragrance),
      ),
      flag(
        'Hydroxypropyl methylcellulose',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.hpmc),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        labelCite(CITE.lotionVanilla, METH.benzoate),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(CITE.lotionVanilla, METH.citrate),
      ),
      flag('Xanthan gum', 'cleared', labelCite(CITE.lotionVanilla, METH.xanthan)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Life-flo Magnesium Lotion Vanilla = Caution. Fragrance is standalone Caution. Caprylic/capric triglyceride sits on the existing unlabeled-MCT Limited row (source not named on that token; lotion emollient / vehicle ≠ gummy High — do not invent a new methodology string). ${MCT_UNLABELED_TAP} Cetearyl glucoside is the locked exact Cleared INCI. Potassium sorbate Limited. Coconut oil / shea butter are topical cream vehicles (Cleared; not gummy High). ${CREAM_OIL_TAP} Glyceryl stearate SE / emulsifying wax NF / cetearyl alcohol / HPMC / citric acid / xanthan / water / magnesium chloride Cleared. No High. Own formulaId — do not clone the unscented lotion (that SKU has no fragrance). External use only. Pack sizes share this formulaId. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...THRIVE, 'Life-flo'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [`${CITE.lotionVanilla} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.lotionUnscented,
    productName: 'Life-flo Magnesium Lotion Unscented',
    brand: 'Life-flo',
    category: PAIN_FEVER,
    formulaId: ID.lotionUnscented,
    audience: ADULT,
    minAge: 18,
    form: 'lotion',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium chloride brine', strength: 'label serving' },
    ],
    inactiveIngredients: [
      labelCleared(CITE.lotionUnscented, 'Aqua'),
      flag(
        'Magnesium chloride brine',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.mgChloride),
      ),
      flag('Glycerin', 'cleared', labelCite(CITE.lotionUnscented, METH.glycerin)),
      flag(
        'Cocos nucifera (coconut) oil',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.coconutTopical),
      ),
      flag(
        'Caprylic/Capric Triglyceride',
        'limited',
        labelCite(CITE.lotionUnscented, METH.mctUnlabeled),
      ),
      flag(
        'Butyrospermum parkii (shea) butter',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.shea),
      ),
      flag(
        'Glyceryl stearate',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.glycerylStearate),
      ),
      flag(
        'Emulsifying wax NF',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.emulsifyingWax),
      ),
      flag(
        'Cetearyl glucoside',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.cetearylGlucoside),
      ),
      flag(
        'Cetearyl alcohol',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.fattyAlcohol),
      ),
      flag(
        'Hydroxypropyl methylcellulose',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.hpmc),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        labelCite(CITE.lotionUnscented, METH.benzoate),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.citrate),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        labelCite(CITE.lotionUnscented, METH.xanthan),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Life-flo Magnesium Lotion Unscented = Caution. Limited-only stack (unlabeled MCT + potassium sorbate) stays Caution — never Avoid. ${LIMITED_STACK} Caprylic/capric triglyceride sits on the existing unlabeled-MCT Limited row (source not named on that token; lotion emollient / vehicle ≠ gummy High — do not invent a new methodology string). ${MCT_UNLABELED_TAP} Cetearyl glucoside is the locked exact Cleared INCI. No fragrance on this SKU. Coconut oil / shea butter are topical cream vehicles (Cleared; not gummy High). ${CREAM_OIL_TAP} Own formulaId — do not clone the vanilla lotion (that SKU adds fragrance). Written from the PureFormulas / SBNF SKU-matched panel that still lists cetearyl glucoside (the remaining founder blockers). External use only. Pack sizes share this formulaId. Draft, not verified.`,
    retailers: [...THRIVE, 'Life-flo'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [`${CITE.lotionUnscented} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH52_REFUSED = [] as const;

export const BATCH52_SKIPPED_BY_FOUNDER_ORDER = [
  'Gaia Golden Milk',
  'Weleda Arnica Muscle Massage Oil',
  "Dr. Bronner's Magic Balm Arnica-Menthol",
  'New Chapter Turmeric Force Nighttime',
  'Asutra Melt Pain Away (still multi-token question)',
  'List 4 out items',
] as const;

const OLLOIS = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.ollois);
const OWH = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.owh);
const ORGANIC_INDIA = BATCH52_THRIVE_PF_HOLES.find(
  (r) => r.id === ID.organicIndia,
);
const SR = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.sportsResearch);
const WELLMADE = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.wellmade);
const NEW_CHAPTER = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.newChapter);
const CODEAGE = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.codeage);
const OIL = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.lifeFloOil);
const GAIA = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.gaia);
const THORNE_500 = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.thorne500);
const THORNE_1000 = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.thorne1000);
const GOL = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.golGummy);
const VANILLA = BATCH52_THRIVE_PF_HOLES.find((r) => r.id === ID.lotionVanilla);
const UNSCENTED = BATCH52_THRIVE_PF_HOLES.find(
  (r) => r.id === ID.lotionUnscented,
);

if (BATCH52_THRIVE_PF_HOLES.length !== 14) {
  throw new Error('batch 52 must write exactly 14 Search rows');
}
if (BATCH52_THRIVE_PF_HOLES.filter((r) => r.verdict === 'clean').length !== 8) {
  throw new Error('batch 52 Clean tally is 8');
}
if (BATCH52_THRIVE_PF_HOLES.filter((r) => r.verdict === 'caution').length !== 5) {
  throw new Error('batch 52 Caution tally is 5');
}
if (BATCH52_THRIVE_PF_HOLES.filter((r) => r.verdict === 'avoid').length !== 1) {
  throw new Error('batch 52 Avoid tally is 1');
}
if (BATCH52_THRIVE_PF_HOLES.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 52 stays on Pain & Fever');
}
if (BATCH52_THRIVE_PF_HOLES.some((record) => record.barcode)) {
  throw new Error('batch 52 must not invent barcodes');
}
if (BATCH52_THRIVE_PF_HOLES.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 52 recordStatus must stay unverified');
}
if (THORNE_500?.formulaId === THORNE_1000?.formulaId) {
  throw new Error('Thorne 1000 mg must not clone the 500 mg formulaId');
}
if (VANILLA?.formulaId === UNSCENTED?.formulaId) {
  throw new Error('Vanilla lotion must not clone the unscented lotion formulaId');
}
if (OLLOIS?.verdict !== 'clean' || OWH?.verdict !== 'clean') {
  throw new Error('Ollois + Oregon’s Wild Harvest must stay Clean');
}
if (ORGANIC_INDIA?.verdict !== 'clean' || SR?.verdict !== 'clean') {
  throw new Error('Organic India + Sports Research must stay Clean');
}
if (NEW_CHAPTER?.verdict !== 'clean' || CODEAGE?.verdict !== 'clean') {
  throw new Error('New Chapter + Codeage must stay Clean');
}
if (OIL?.verdict !== 'clean' || GAIA?.verdict !== 'clean') {
  throw new Error('Life-flo oil + Gaia Extra Strength must stay Clean');
}
if (WELLMADE?.verdict !== 'caution' || THORNE_500?.verdict !== 'caution') {
  throw new Error('wellmade + Thorne 500 must stay Caution (SiO2 cap)');
}
if (THORNE_1000?.verdict !== 'caution') {
  throw new Error('Thorne 1000 must stay Caution (SiO2 cap)');
}
if (VANILLA?.verdict !== 'caution' || UNSCENTED?.verdict !== 'caution') {
  throw new Error('both Life-flo lotions must stay Caution (no High)');
}
if (GOL?.verdict !== 'avoid') {
  throw new Error('GOL turmeric gummies must stay Avoid (sunflower oil High)');
}
if (
  !GAIA?.inactiveIngredients.some((item) => item.name === 'Chlorophyll')
) {
  throw new Error('Gaia Extra Strength must list chlorophyll (not chlorophyllin)');
}
if (
  !THORNE_500?.inactiveIngredients.some((item) => item.name === 'Leucine')
) {
  throw new Error('Thorne 500 must list leucine');
}
if (
  !GOL?.inactiveIngredients.some((item) => item.name === 'Organic rice meal')
) {
  throw new Error('GOL gummies must list organic rice meal');
}
if (
  !VANILLA?.inactiveIngredients.some(
    (item) => item.name === 'Cetearyl glucoside',
  )
) {
  throw new Error('Vanilla lotion must list cetearyl glucoside');
}
if (BATCH52_REFUSED.length !== 0) {
  throw new Error('batch 52 refused list must stay empty — all written SKUs grade');
}

// Verdict tally (14 records): Clean 8 · Caution 5 · Avoid 1
// Written: list 2 (8) + unlocked list 3 (6)
// Reuse: Boiron / Genexa Arnica / MegaFood turmeric / Thorne
//   glutamine+glucosamine + batches 41–51 untouched
// Skipped by founder order: Gaia Golden Milk; Weleda Arnica Muscle
//   Massage Oil; Dr. Bronner’s Magic Balm Arnica-Menthol; New Chapter
//   Turmeric Force Nighttime; Asutra Melt Pain Away; list 4
// Refused still-missing exact §5: none
