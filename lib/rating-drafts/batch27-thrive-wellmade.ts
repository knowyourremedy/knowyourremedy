// DRAFT / not verified / batch 27 Thrive wellmade / founder calls
// locked / methodology untouched.
//
// Thrive Market house-brand RatingRecords (wellmade by Thrive Market).
// Mixed categories (Digestive + Vitamins) · audience adult except Kids
// Chewable Probiotic (kids / minAge 4 from PDP) · recordStatus is
// 'unverified' on every row. Founder calls (locked): see notes below.
// Methodology v1.6 grades only — do not change locked ingredient grades.
// Do NOT invent Clean. Do NOT write FLAG / skipped products. Do NOT
// invent UPCs. Barcodes omitted — SKUs appear in cites / notes only.
// Pack sizes share formulaId. formulaId == id on every row (same
// pattern as batch 24 / 26). Form is labeled on cleanAlternatives, not
// a hard filter (§6). Not wired into Clean Picks UI. No live Clean
// Picks file is edited from this draft. Methodology.md / PROJECT_NOTES.md
// are untouched. Genexa / Boiron rows are reuse-only — this file does
// not rewrite them. Softgel fish oil is a RatingRecord, not an
// OilInfoRecord. Softgel carrier ≠ gummy seed-oil High.
//
// FOUNDER CALLS (LOCKED) — write these 8 rows only:
// CLEAN (4)
// - Women's Daily Probiotic = Clean. Digestive · adult · capsule.
//   Non-GMO vegetable cellulose capsule + microcrystalline cellulose
//   Cleared. No gellan. No SiO2.
// - Men's Daily Probiotic = Clean. Same OI stack as Women's.
// - Real Food Vitamin C = Clean. Vitamins · adult · Vitamin · capsule.
//   Vegetarian capsule (HPMC, water); Organic Rice Hull Powder
//   Cleared (rice hull extract class LOCKED Cleared; NOT SiO2).
// - Fish Oil 240 softgels = Clean. Vitamins · adult · Supplement ·
//   softgel. Softgel (gelatin, glycerin, water); vitamin E Cleared.
//   No natural flavor on this SKU. Softgel carrier ≠ gummy seed-oil
//   High; not an OilInfoRecord.
// CAUTION (4)
// Encode SiO2 like batch 15 / 24 / 25: riskLevel 'cleared' +
// precautionary Caution-cap source string; verdict caution.
// - Magnesium Glycinate = Caution. Vitamins · adult · capsule.
//   Vegan capsules (HPMC, water); cellulose; magnesium stearate;
//   stearic acid; silica. cleanAlternatives → existing Clean Mg
//   formulaIds already on main (form labeled §6). Do not invent a
//   new Clean house Mg.
// - Vitamin C tablets = Caution. Vitamins · adult · Vitamin · tablet.
//   Cellulose; stearic acid; magnesium stearate; silica.
//   cleanAlternatives → in-batch Real Food Vitamin C and existing
//   Clean PE / Thorne ascorbic rows on main.
// - Chewable Vitamin C = Caution. Vitamins · adult (chewable) ·
//   Vitamin · chewable tablet. Tapioca dextrose Cleared; mannitol
//   Limited; acacia Cleared; natural flavors Limited; stearic acid
//   Cleared; silica Caution cap; orange juice powder notes-only
//   ungraded (∉ §5; v1.6 intake); stevia Cleared. Sea salt / sodium
//   chloride is on the PDP and is Cleared (§5).
// - Kids Chewable Probiotic (Super Strawberry Banana) = Caution.
//   Digestive · audience kids · minAge 4 (PDP: children 4 years &
//   older). Xylitol Limited oral; tapioca dextrose Cleared; MCT
//   notes-only ungraded (v1.6 intake; founder: MCT stays FLAG note
//   not a new grade — omit from scored array); pea starch Cleared;
//   natural flavors Limited; stevia Cleared; silica Caution cap;
//   beet root powder (color) notes-only ungraded. Drivers: natural
//   flavors + silica (not inventing an MCT grade).
//   cleanAlternatives omitted — no independently Clean kids
//   probiotic in the repo (honest empty; do not invent one; do not
//   point at adult Clean probiotics — §6 age-matching).
//
// TALLY (unverified drafts): 8 rows — Clean 4 / Caution 4 / Avoid 0.
// Independently Clean in THIS batch: Women's Daily Probiotic;
// Men's Daily Probiotic; Real Food Vitamin C; Fish Oil 240 softgels.
// No independently Clean kids probiotic. No Clean house Mg.
//
// formulaIds:
// - thrive-wellmade-womens-daily-probiotic (Clean, Digestive)
// - thrive-wellmade-mens-daily-probiotic (Clean, Digestive)
// - thrive-wellmade-real-food-vitamin-c (Clean, Vitamins)
// - thrive-wellmade-fish-oil (Clean, Vitamins)
// - thrive-wellmade-magnesium-glycinate (Caution, Vitamins)
// - thrive-wellmade-vitamin-c-tablets (Caution, Vitamins)
// - thrive-wellmade-chewable-vitamin-c (Caution, Vitamins)
// - thrive-wellmade-kids-chewable-probiotic (Caution, Digestive, kids)
//
// FLAG / SKIP (do not write rows):
// - Real Food Prenatal
// - Real Food Women's Multi
// - Women's Multi & Mineral
// - Mood+ Probiotic
// - herbal / acacia / propolis / elderberry depth
// - invented Clean kids probiotic
// - invented Clean house multi / Mg
// - Thorne.com / B-Alive / Amazon / Dollar Tree
// - graded oils
// - Genexa / Boiron rewrites
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety
// grade. Grade inactives only. Silicon dioxide / silica = Caution
// cap, not Avoid alone. No dosing. No medical advice. No "consult
// your doctor" prescriptions.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const DIGESTIVE = 'Digestive';
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'wellmade by Thrive Market';
const RETAILERS = ['Thrive Market'] as const;

const METH = {
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  xylitol:
    'Methodology §5 Limited-risk (xylitol / erythritol, oral/ingested — GI effects at volume; oral only)',
  stevia:
    'Methodology §5 Cleared (stevia / steviol glycosides, high-purity extract — locked v1.6; founder Cleared-class on this carton)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  starches:
    'Methodology §5 Cleared (pregelatinized / corn / potato / rice flour / pea starch / similar simple starches — locked v1.6 housekeeping)',
  tapioca:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup / dextrose — locked v1.6)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropylmethylcellulose)',
  riceHull:
    'Methodology §5 Cleared (organic rice hull extract / rice concentrate / ground rice hulls — plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  salt: 'Methodology §5 Cleared (sodium chloride / sea salt)',
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

const NO_CLEAN_KIDS_PROBIOTIC =
  'No independently Clean kids probiotic exists in the repo — cleanAlternatives omitted (honest empty; do not invent a Clean kids probiotic; do not point at adult Clean probiotics — §6 age-matching).';

const WOMENS_PROBIOTIC_ID = 'thrive-wellmade-womens-daily-probiotic';
const MENS_PROBIOTIC_ID = 'thrive-wellmade-mens-daily-probiotic';
const REAL_FOOD_C_ID = 'thrive-wellmade-real-food-vitamin-c';
const FISH_OIL_ID = 'thrive-wellmade-fish-oil';
const MAGNESIUM_ID = 'thrive-wellmade-magnesium-glycinate';
const VITAMIN_C_TABLETS_ID = 'thrive-wellmade-vitamin-c-tablets';
const CHEWABLE_C_ID = 'thrive-wellmade-chewable-vitamin-c';
const KIDS_PROBIOTIC_ID = 'thrive-wellmade-kids-chewable-probiotic';

const PE_MAG_GLYCINATE_ID = 'pure-encapsulations-magnesium-glycinate';
const DFH_MAG_ID = 'dfh-magnesium-glycinate-complex';
const THORNE_MAG_POWDER_ID = 'thorne-magnesium-bisglycinate-powder';
const WE_HEART_MAG_ID = 'we-heart-wholesome-magnesium-glycinate';
const PE_ASCORBIC_ID = 'pure-encapsulations-ascorbic-acid-1000';
const THORNE_C_ID = 'thorne-vitamin-c-ascorbic-acid';

const WOMENS_PROBIOTIC_CITE =
  'Thrive Market wellmade Women\'s Daily Probiotic PDP https://thrivemarket.com/p/wellmade-womens-daily-probiotic SKU 671635733559 other-ingredients (Non-GMO Vegetable Cellulose Capsule, Microcrystalline Cellulose; no gellan / no SiO2)';
const MENS_PROBIOTIC_CITE =
  'Thrive Market wellmade Men\'s Daily Probiotic PDP https://thrivemarket.com/p/wellmade-mens-daily-probiotic SKU 671635733535 other-ingredients (Non-GMO Vegetable Cellulose Capsule, Microcrystalline Cellulose; no gellan / no SiO2)';
const REAL_FOOD_C_CITE =
  'Thrive Market wellmade Real Food Vitamin C PDP https://thrivemarket.com/p/wellmade-real-food-vitamin-c SKU 671635733771 other-ingredients (Vegetarian Capsule (Hypromellose, Water), Organic Rice Hull Powder)';
const FISH_OIL_CITE =
  'Thrive Market wellmade Fish Oil 240 softgels PDP https://thrivemarket.com/p/wellmade-fish-oil SKU 671635733955 other-ingredients (Softgel (Gelatin, Glycerin And Water), Vitamin E; no natural flavor)';
const MAGNESIUM_CITE =
  'Thrive Market wellmade Magnesium Glycinate PDP https://thrivemarket.com/p/wellmade-magnesium-glycinate SKU 671635734464 other-ingredients (Vegan Capsules (Hypromellose, Water), Cellulose, Magnesium Stearate, Stearic Acid, Silica)';
const VITAMIN_C_TABLETS_CITE =
  'Thrive Market wellmade Vitamin C tablets PDP https://thrivemarket.com/p/wellmade-vitamin-c SKU 671635733818 other-ingredients (Cellulose, Stearic Acid, Magnesium Stearate, Silica)';
const CHEWABLE_C_CITE =
  'Thrive Market wellmade Chewable Vitamin C PDP https://thrivemarket.com/p/wellmade-chewable-vitamin-c SKU 671635734044 other-ingredients (Tapioca Dextrose, Mannitol, Acacia Powder, Natural Flavors, Stearic Acid, Silica, Orange Juice Powder, Sea Salt, Stevia Extract Powder (Reb A))';
const KIDS_PROBIOTIC_CITE =
  'Thrive Market wellmade Organic Kids Chewable Probiotic Super Strawberry Banana PDP https://thrivemarket.com/p/wellmade-organic-kids-chewable-probiotic-super-strawberry-banana SKU 671635734402 other-ingredients (Xylitol*, Tapioca Dextrose*, Medium Chain Triglycerides*, Pea Starch Powder*, Natural Flavors*, Stevia Extract Powder (Reb A)*, Silica, Beet Root Powder (Color)*; *Organic)';

const MAG_ALTS: CleanAlternative[] = [
  {
    productId: PE_MAG_GLYCINATE_ID,
    rankReason:
      'Independently Clean Pure Encapsulations Magnesium (glycinate) already graded on main in batch 25 (vegetarian capsule cellulose/water + ascorbyl palmitate; no SiO2). Form: capsule — labeled, not a hard filter (§6). Same-active magnesium glycinate peer. Do not invent a new Clean wellmade house Mg.',
  },
  {
    productId: DFH_MAG_ID,
    rankReason:
      'Independently Clean Designs for Health Magnesium Glycinate Complex already graded on main in batch 25 (cellulose capsule + vegetable stearate; no SiO2). Form: capsule — labeled, not a hard filter (§6).',
  },
  {
    productId: THORNE_MAG_POWDER_ID,
    rankReason:
      'Independently Clean Thorne Magnesium Bisglycinate powder already graded on main in batch 25 (citric acid + high-purity monk fruit concentrate). Form: powder — labeled, not a hard filter (§6).',
  },
  {
    productId: WE_HEART_MAG_ID,
    rankReason:
      'Independently Clean We Heart Nutrition Wholesome Magnesium Glycinate already graded on main in batch 26 (vegan capsule HPMC/water + calcium stearate Cleared-by-class; no SiO2). Form: capsule — labeled, not a hard filter (§6).',
  },
];

const VITAMIN_C_TABLET_ALTS: CleanAlternative[] = [
  {
    productId: REAL_FOOD_C_ID,
    rankReason:
      'Independently Clean in-batch wellmade Real Food Vitamin C (vegetarian capsule HPMC/water + organic rice hull powder; rice-hull class LOCKED Cleared, not SiO2). Form: capsule — labeled, not a hard filter (§6). Same-store Thrive house brand.',
  },
  {
    productId: PE_ASCORBIC_ID,
    rankReason:
      'Independently Clean Pure Encapsulations Ascorbic Acid 1000 mg already graded on main in batch 25 (vegetarian capsule cellulose/water + ascorbyl palmitate; no SiO2). Form: capsule — labeled, not a hard filter (§6).',
  },
  {
    productId: THORNE_C_ID,
    rankReason:
      'Independently Clean Thorne Vitamin C as Ascorbic Acid already graded on main in batch 25 (current on-market hypromellose + calcium laurate + cellulose; no SiO2). Form: capsule — labeled, not a hard filter (§6).',
  },
];

const CHEWABLE_C_ALTS: CleanAlternative[] = [
  {
    productId: REAL_FOOD_C_ID,
    rankReason:
      'Independently Clean in-batch wellmade Real Food Vitamin C (vegetarian capsule HPMC/water + organic rice hull powder). Form: capsule vs chewable tablet — labeled, not a hard filter (§6). Same-store Thrive house brand; no flavors / silica.',
  },
  {
    productId: PE_ASCORBIC_ID,
    rankReason:
      'Independently Clean Pure Encapsulations Ascorbic Acid 1000 mg already graded on main in batch 25 (vegetarian capsule cellulose/water + ascorbyl palmitate; no SiO2). Form: capsule vs chewable tablet — labeled, not a hard filter (§6).',
  },
];

export const BATCH27_THRIVE_WELLMADE: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: WOMENS_PROBIOTIC_ID,
    productName: 'Women\'s Daily Probiotic',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '671635733559',
    formulaId: WOMENS_PROBIOTIC_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Women\'s daily probiotic blend (15 strains as labeled)',
        strength: '50 billion CFU (250mg) per capsule',
      },
      {
        name: 'Lactobacillus blend (L. acidophilus, L. plantarum, L. casei, L. paracasei, L. bulgaricus, L. brevis, L. reuteri, L. salivarius, L. fermentum, L. gasseri, L. rhamnosus)',
        strength: '40 billion CFU as labeled',
      },
      {
        name: 'Bifidobacterium blend (B. lactis, B. bifidum, B. breve, B. infantis, B. longum)',
        strength: '10 billion CFU as labeled',
      },
      {
        name: 'Organic prebiotic blend (organic tapioca starch powder, organic gum arabic / acacia)',
        strength: '377mg',
      },
    ],
    inactiveIngredients: [
      labelCleared(
        WOMENS_PROBIOTIC_CITE,
        'Non-GMO vegetable cellulose capsule',
      ),
      labelCleared(WOMENS_PROBIOTIC_CITE, 'Microcrystalline cellulose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Women\'s Daily Probiotic = Clean. Thrive PDP SKU 671635733559 other-ingredients: Non-GMO Vegetable Cellulose Capsule, Microcrystalline Cellulose. Vegetable cellulose capsule / MCC are Cleared. CONFIRMED no gellan and no silicon dioxide / silica on that matched list. Labeled actives listed neutrally from the PDP Supplement Facts (not an efficacy claim): 50 billion CFU / 15 strains as labeled — Daily Probiotic Blend 250mg with Lactobacillus acidophilus, L. plantarum, L. casei, L. paracasei, L. bulgaricus, L. brevis, L. reuteri, L. salivarius, L. fermentum, L. gasseri, L. rhamnosus (total Lactobacillus 40 billion CFU as labeled) and Bifidobacterium lactis, B. bifidum, B. breve, B. infantis, B. longum (total Bifidobacterium 10 billion CFU as labeled); Organic Prebiotic Blend 377mg (organic tapioca starch powder, organic gum arabic / acacia). Inulin also appears on the scraped Supplement Facts after the bifido subtotal — listed neutrally if present on carton; not scored as an inactive. This draft grades inactives only. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${WOMENS_PROBIOTIC_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: MENS_PROBIOTIC_ID,
    productName: 'Men\'s Daily Probiotic',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '671635733535',
    formulaId: MENS_PROBIOTIC_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Men\'s daily probiotic blend (15 strains as labeled)',
        strength: '50 billion CFU (250mg) per capsule',
      },
      {
        name: 'Lactobacillus blend (L. acidophilus, L. casei, L. gasseri, L. plantarum, L. paracasei, L. brevis, L. bulgaricus, L. rhamnosus, L. salivarius, L. fermentum, L. reuteri)',
        strength: '35 billion CFU as labeled',
      },
      {
        name: 'Bifidobacterium blend (B. lactis, B. bifidum, B. breve, B. infantis, B. longum)',
        strength: '15 billion CFU as labeled',
      },
      {
        name: 'Organic prebiotic fiber blend (organic tapioca starch powder, organic gum arabic / acacia)',
        strength: '407mg',
      },
    ],
    inactiveIngredients: [
      labelCleared(
        MENS_PROBIOTIC_CITE,
        'Non-GMO vegetable cellulose capsule',
      ),
      labelCleared(MENS_PROBIOTIC_CITE, 'Microcrystalline cellulose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Men\'s Daily Probiotic = Clean. Thrive PDP SKU 671635733535 other-ingredients: Non-GMO Vegetable Cellulose Capsule, Microcrystalline Cellulose — same OI stack as the Women\'s Daily Probiotic row. Vegetable cellulose capsule / MCC are Cleared. CONFIRMED no gellan and no silicon dioxide / silica on that matched list. Separate formulaId from the women\'s row (different labeled strain mix / CFU split). Labeled actives listed neutrally from the PDP Supplement Facts (not an efficacy claim): 50 billion CFU / 15 strains as labeled — Daily Probiotic Blend 250mg with Lactobacillus acidophilus, L. casei, L. gasseri, L. plantarum, L. paracasei, L. brevis, L. bulgaricus, L. rhamnosus, L. salivarius, L. fermentum, L. reuteri (total Lactobacillus 35 billion CFU as labeled) and Bifidobacterium lactis, B. bifidum, B. breve, B. infantis, B. longum (total Bifidobacterium 15 billion CFU as labeled); Organic Prebiotic Fiber Blend 407mg (organic tapioca starch powder, organic gum arabic / acacia). Inulin also appears on the scraped Supplement Facts — listed neutrally if present on carton; not scored as an inactive. Facility allergen note on the PDP: produced in a facility that also processes wheat and dairy. This draft grades inactives only. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${MENS_PROBIOTIC_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: REAL_FOOD_C_ID,
    productName: 'Real Food Vitamin C',
    brand: BRAND,
    category: VITAMINS,
    barcode: '671635733771',
    formulaId: REAL_FOOD_C_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Vitamin C (from acerola extract, as ascorbic acid, and from Food Complex Blend)',
        strength: '500mg per 2-capsule serving',
      },
      {
        name: 'Food Complex Blend (acerola, citrus bioflavonoids, rose hips, rutin, organic fruit / vegetable / mushroom / grain blend as labeled)',
        strength: '900mg',
      },
      {
        name: 'Probiotic and enzyme blend (as labeled)',
        strength: '60mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Vegetarian capsule (hypromellose, water)',
        'cleared',
        labelCite(REAL_FOOD_C_CITE, METH.hpmc),
      ),
      flag(
        'Organic rice hull powder',
        'cleared',
        labelCite(REAL_FOOD_C_CITE, METH.riceHull),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Real Food Vitamin C = Clean. Thrive PDP SKU 671635733771 other-ingredients: Vegetarian Capsule (Hypromellose, Water), Organic Rice Hull Powder. HPMC / water are Cleared. Organic rice hull powder is Cleared (rice hull extract / rice concentrate / ground rice hulls class LOCKED Cleared — plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply). No gellan, silicon dioxide, titanium dioxide, or synthetic dye on that matched list. Active is Vitamin C 500mg per 2 vegan capsules as labeled (from acerola extract, as ascorbic acid, and from Food Complex Blend). Food Complex Blend 900mg and Probiotic and Enzyme Blend 60mg are labeled actives listed neutrally; this draft grades inactives only and makes no efficacy claim. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${REAL_FOOD_C_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: FISH_OIL_ID,
    productName: 'Fish Oil 240 softgels',
    brand: BRAND,
    category: VITAMINS,
    barcode: '671635733955',
    formulaId: FISH_OIL_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Fish oil concentrate (anchovy)',
        strength: '1000mg per softgel',
      },
      { name: 'EPA (eicosapentaenoic acid)', strength: '180mg' },
      { name: 'DHA (docosahexaenoic acid)', strength: '120mg' },
    ],
    inactiveIngredients: [
      labelCleared(FISH_OIL_CITE, 'Gelatin'),
      labelCleared(FISH_OIL_CITE, 'Glycerin'),
      labelCleared(FISH_OIL_CITE, 'Water'),
      flag(
        'Vitamin E',
        'cleared',
        labelCite(FISH_OIL_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Fish Oil 240 softgels = Clean. Thrive PDP SKU 671635733955 other-ingredients: Softgel (Gelatin, Glycerin And Water), Vitamin E. Gelatin / glycerin / water are Cleared. Vitamin E is Cleared-class (v1.6 tocopherol antioxidant lock). CONFIRMED no natural flavor on this 240-softgel SKU — do not merge with a lemon-flavored liquid fish oil or any flavored twin. Softgel fish-oil fill / gelatin-glycerin-water carrier is NOT the gummy seed/industrial-oil High rule and is not an OilInfoRecord (batch 23 oil drafts live elsewhere). Labeled actives: fish oil concentrate 1000mg per softgel with EPA 180mg / DHA 120mg as labeled (anchovy). Contains fish (anchovy). Contains gelatin. Pack sizes of this unflavored softgel share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${FISH_OIL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: MAGNESIUM_ID,
    productName: 'Magnesium Glycinate',
    brand: BRAND,
    category: VITAMINS,
    barcode: '671635734464',
    formulaId: MAGNESIUM_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Magnesium (from magnesium glycinate)',
        strength: '400mg per 3-capsule serving',
      },
    ],
    inactiveIngredients: [
      flag(
        'Vegan capsules (hypromellose, water)',
        'cleared',
        labelCite(MAGNESIUM_CITE, METH.hpmc),
      ),
      labelCleared(MAGNESIUM_CITE, 'Cellulose'),
      labelCleared(MAGNESIUM_CITE, 'Magnesium stearate'),
      labelCleared(MAGNESIUM_CITE, 'Stearic acid'),
      flag('Silica', 'cleared', labelCite(MAGNESIUM_CITE, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Magnesium Glycinate = Caution (silica). Thrive PDP SKU 671635734464 other-ingredients: Vegan Capsules (Hypromellose, Water), Cellulose, Magnesium Stearate, Stearic Acid, Silica. HPMC / water, cellulose, magnesium stearate, and stearic acid are Cleared-class and do not raise the grade. Silica / silicon dioxide is the nanoparticle Caution cap (0 demerit points) — same encoding as batch 15 Nature Made Prenatal Multi tablets, batch 24 DFH Prenatal Pro, and batch 25 PE Probiotic-5 / Thorne FloraMend / Thorne Mg caps (`riskLevel: \'cleared\'` + METH.sio2 source; verdict caution, NOT avoid). Do not invent Clean on the SiO2 cap. Do not invent a new Clean wellmade house magnesium. Active is magnesium (from magnesium glycinate) 400mg per 3 vegan capsules as labeled. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    cleanAlternatives: MAG_ALTS,
    sourcesGeneral: [
      `${MAGNESIUM_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: VITAMIN_C_TABLETS_ID,
    productName: 'Vitamin C tablets',
    brand: BRAND,
    category: VITAMINS,
    barcode: '671635733818',
    formulaId: VITAMIN_C_TABLETS_ID,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '1000mg' },
    ],
    inactiveIngredients: [
      labelCleared(VITAMIN_C_TABLETS_CITE, 'Cellulose'),
      labelCleared(VITAMIN_C_TABLETS_CITE, 'Stearic acid'),
      labelCleared(VITAMIN_C_TABLETS_CITE, 'Magnesium stearate'),
      flag(
        'Silica',
        'cleared',
        labelCite(VITAMIN_C_TABLETS_CITE, METH.sio2),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Vitamin C tablets = Caution (silica). Thrive PDP SKU 671635733818 other-ingredients: Cellulose, Stearic Acid, Magnesium Stearate, Silica. Cellulose / stearic acid / magnesium stearate are Cleared-class and do not raise the grade. Silica / silicon dioxide is the nanoparticle Caution cap (0 demerit points) — same encoding as batch 15 / 24 / 25 (`riskLevel: \'cleared\'` + METH.sio2 source; verdict caution, NOT avoid). Do not invent Clean on the SiO2 cap. Separate formulaId from in-batch Clean Real Food Vitamin C (`thrive-wellmade-real-food-vitamin-c`) and from the chewable Caution row. Active is Vitamin C (as ascorbic acid) 1000mg per tablet as labeled. Facility allergen note on the PDP: made on the same equipment as milk, egg, anchovy, mackerel, shrimp, soy, coconut, and wheat. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    cleanAlternatives: VITAMIN_C_TABLET_ALTS,
    sourcesGeneral: [
      `${VITAMIN_C_TABLETS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: CHEWABLE_C_ID,
    productName: 'Chewable Vitamin C',
    brand: BRAND,
    category: VITAMINS,
    barcode: '671635734044',
    formulaId: CHEWABLE_C_ID,
    audience: ADULT,
    minAge: 18,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Vitamin C (as sodium ascorbate and ascorbic acid)',
        strength: '500mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Tapioca dextrose',
        'cleared',
        labelCite(CHEWABLE_C_CITE, METH.tapioca),
      ),
      flag('Mannitol', 'limited', labelCite(CHEWABLE_C_CITE, METH.mannitol)),
      flag('Acacia powder', 'cleared', labelCite(CHEWABLE_C_CITE, METH.gums)),
      flag(
        'Natural flavors',
        'limited',
        labelCite(CHEWABLE_C_CITE, METH.flavors),
      ),
      labelCleared(CHEWABLE_C_CITE, 'Stearic acid'),
      flag('Silica', 'cleared', labelCite(CHEWABLE_C_CITE, METH.sio2)),
      flag('Sea salt', 'cleared', labelCite(CHEWABLE_C_CITE, METH.salt)),
      flag(
        'Stevia extract powder (Reb A)',
        'cleared',
        labelCite(CHEWABLE_C_CITE, METH.stevia),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Chewable Vitamin C = Caution. Thrive PDP SKU 671635734044 other-ingredients: Tapioca Dextrose, Mannitol, Acacia Powder, Natural Flavors, Stearic Acid, Silica, Orange Juice Powder, Sea Salt, Stevia Extract Powder (Reb A). Drivers are natural flavors (Limited) + silica (nanoparticle Caution cap, 0 demerit points — same encoding as batch 15 / 24 / 25; verdict caution, NOT avoid) plus mannitol (Limited sugar alcohol). Tapioca dextrose is Cleared. Acacia / gum arabic is Cleared (v1.6 gums lock). Stearic acid is Cleared. Sea salt / sodium chloride is on the PDP and is Cleared (§5). Stevia extract powder (Reb A) is Cleared (v1.6 high-purity steviol glycosides lock — not whole-leaf/crude). Orange juice powder is present on the label and is not in Methodology §5 (ungraded; v1.6 intake) — omitted from the scored inactiveIngredients array (same notes-only pattern as batch 24 PE Melatonin-SR sodium alginate / Nordic rosemary extract); not a demerit driver; no invented riskLevel. Carton is an adult chewable (PDP: adults chew one tablet daily); form chewable tablet noted — not a kids row. Separate formulaId from in-batch Clean Real Food Vitamin C and from the tablet Caution row. Active is Vitamin C 500mg (as sodium ascorbate and ascorbic acid) as labeled. Orange mango flavor is the labeled flavor, not a second grade. Facility allergen note on the PDP: made on the same equipment as milk, egg, soy, wheat, coconut, anchovy, mackerel, shrimp. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    cleanAlternatives: CHEWABLE_C_ALTS,
    sourcesGeneral: [
      `${CHEWABLE_C_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: KIDS_PROBIOTIC_ID,
    productName: 'Organic Kids Chewable Probiotic, Super Strawberry Banana',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '671635734402',
    formulaId: KIDS_PROBIOTIC_ID,
    audience: KIDS,
    minAge: 4,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Proprietary probiotic blend (Lactobacillus acidophilus, L. brevis, L. bulgaricus, L. casei, L. gasseri, L. paracasei, L. plantarum, L. rhamnosus, L. salivarius; Bifidobacterium lactis, B. bifidum, B. breve, B. infantis, B. longum)',
        strength: '28mg (5 billion CFU) per chewable tablet',
      },
      {
        name: 'Vitamin C (as ascorbic acid from organic amla fruit extract)',
        strength: '30mg',
      },
      {
        name: 'Vitamin D3 (as cholecalciferol from organic algae)',
        strength: '10mcg (400 IU)',
      },
      {
        name: 'Organic prebiotic fiber blend (organic acacia gum, organic cranberry fruit powder, organic amla as labeled)',
        strength: '310mg',
      },
    ],
    inactiveIngredients: [
      flag('Xylitol', 'limited', labelCite(KIDS_PROBIOTIC_CITE, METH.xylitol)),
      flag(
        'Tapioca dextrose',
        'cleared',
        labelCite(KIDS_PROBIOTIC_CITE, METH.tapioca),
      ),
      flag(
        'Pea starch powder',
        'cleared',
        labelCite(KIDS_PROBIOTIC_CITE, METH.starches),
      ),
      flag(
        'Natural flavors',
        'limited',
        labelCite(KIDS_PROBIOTIC_CITE, METH.flavors),
      ),
      flag(
        'Stevia extract powder (Reb A)',
        'cleared',
        labelCite(KIDS_PROBIOTIC_CITE, METH.stevia),
      ),
      flag('Silica', 'cleared', labelCite(KIDS_PROBIOTIC_CITE, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: wellmade by Thrive Market Organic Kids Chewable Probiotic Super Strawberry Banana = Caution (natural flavors + silica). Thrive PDP SKU 671635734402 other-ingredients: Xylitol*, Tapioca Dextrose*, Medium Chain Triglycerides*, Pea Starch Powder*, Natural Flavors*, Stevia Extract Powder (Reb A)*, Silica, Beet Root Powder (Color)* (*Organic). Drivers are natural flavors (Limited) + silica (nanoparticle Caution cap, 0 demerit points — same encoding as batch 15 / 24 / 25; verdict caution, NOT avoid). Xylitol is Limited oral/ingested. Tapioca dextrose is Cleared. Pea starch powder is Cleared (v1.6 simple-starch housekeeping). Stevia extract powder (Reb A) is Cleared (v1.6 high-purity lock). Medium chain triglycerides are present on the label but are not in Methodology §5 (ungraded; v1.6 intake) — omitted from the scored inactiveIngredients array (same notes-only pattern as batch 25 Thorne Magnesium Glycinate capsules MCT oil); founder lock: MCT stays a FLAG note, not a new grade; not a demerit driver; no invented riskLevel. Beet root powder (color) is on the label and is not independently listed in Methodology §5 (ungraded; v1.6 intake) — omitted from the scored array; notes-only; not a second color-additive lock and not a demerit driver. REQUIRED audience kids. PDP age chart: children 4 years & older chew 1 tablet under adult supervision — minAge 4 from that carton floor (not a guessed 2–3). Labeled actives listed neutrally: proprietary probiotic blend 28mg / 5 billion CFU as labeled; Vitamin C 30mg from organic amla; Vitamin D3 10mcg (400 IU) from organic algae; Organic Prebiotic Fiber Blend 310mg. This draft grades inactives only and makes no efficacy claim. Sugar-free / vegan claims on the PDP are not grade drivers. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). ' +
      NO_CLEAN_KIDS_PROBIOTIC,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${KIDS_PROBIOTIC_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];
