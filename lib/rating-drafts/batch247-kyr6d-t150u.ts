// DRAFT / not verified / batch 247 KYR6-d (t150u). Four brands. Grades from other ingredients only.
// Honest note only for a shopper self-contradiction or a real 3+ Limited stack. None of these rows trip that.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const OTC = 'OTC' as const;

const METH = {
  ceteth20:
    'Methodology §5 Limited (Ceteth-20 — founder lock t150u Oct 21, 2026; exact token; not ceteth-20 phosphate or cetostearyl alcohol).',
  chlorocresol:
    'Methodology §5 Limited (Chlorocresol — founder lock t150u Oct 21, 2026; exact token; not chloroxylenol).',
  fractionatedCombo:
    'Methodology §5 Limited (Fractionated coconut and palm kernel oil — founder lock t150u Oct 21, 2026; not Cleared fractionated coconut oil and not named MCT from palm kernel oil).',
  huito:
    'Methodology §5 Caution (Huito extract — founder lock t150u Oct 21, 2026; plant color; does not count toward the t137u stack).',
  watermelon:
    'Methodology §5 Cleared (Watermelon extract — founder lock t150u Oct 21, 2026; named plant color).',
  blackCarrot:
    'Methodology §5 Cleared (Black carrot extract — t150u alias of Black Carrot Extract Color; named plant-color; natural tie-breaker).',
  naturalFlavors:
    'Methodology §5 Limited (natural flavors — undisclosed mixtures; opacity, not a known hazard).',
  mctGummy:
    'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named).',
  xylitol:
    'Methodology §5 Limited-risk (xylitol, oral — GI effects at volume; sugar-alcohol row; does not count toward the t137u stack).',
  hpmc:
    'Methodology §5 Cleared (Hydroxypropyl Methylcellulose — t102u HPMC / hypromellose family; t150u Hydroxypropyl maps here).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  dicalcium:
    'Methodology §5 Cleared (dicalcium phosphate — phosphate-salt filler).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers/buffers).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  water: 'Methodology §5 Cleared (water / purified water).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named starch).',
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval).',
  sugar:
    'Methodology §5 Caution (bare sugar — the label does not name cane sugar).',
  annatto:
    'Methodology §5 Caution (Annatto Seed Extract (color) — t107u Annatto row; condition rule, ADI cannot be checked on the pack).',
  betaCarotene:
    'Methodology §5 Caution (beta-carotene as color — not the vitamin dose).',
  sunflowerGummy:
    'Methodology §5 High-risk (sunflower oil in a gummy — seed/industrial oils in gummies).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder — Oct 15 juice rule; named or not; sweetener or color).',
  monkFruit:
    'Methodology §5 Cleared (monk fruit / Lo Han Fruit Concentrate — mogroside sweetener).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  cetostearyl:
    'Methodology §5 Cleared (cetostearyl alcohol — fatty alcohol in a cream base).',
  mineralOilCream:
    'Methodology §5 Cleared (Paraffin + mineral oil as topical ointment occlusive — this cream lists mineral oil with white petrolatum; not the Caution light liquid paraffin row).',
  pgTopical:
    'Methodology §5 Cleared (propylene glycol, topical form — not the t138u oral Limited row).',
  phosphate:
    'Methodology §5 Cleared (sodium phosphate monobasic — phosphate-salt class).',
  petrolatum: 'Methodology §5 Cleared (white petrolatum — topical ointment base).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  vegJuice:
    'Methodology §5 Cleared (Vegetable Juice (Color) — fruit and vegetable juice, puree, concentrate, and powder; Oct 15 juice rule).',
  sodiumAscorbate: 'Methodology §5 Cleared (sodium ascorbate — ascorbate family).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid — ascorbate family).',
  sodiumCarbonate:
    'Methodology §5 Cleared (Sodium Carbonate — LOCKED Oct 16, 2026 t78u).',
  povidone: 'Methodology §5 Cleared (povidone).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_YEAST =
  'AZO brand page https://azoproducts.com/products/azo-yeast-plus (60 tablets, in stock) and iShop Naturals / PureFormulas / iHerb / Cumberland Apothecary (same inactive line, UPC 787651606675)';
const PANEL_MANNOSE =
  'AZO brand page https://azoproducts.com/products/azo-d-mannose-urinary-tract-health and Thrifty White in stock (UPC 787651760261). Brand comma “Hydroxypropyl, Methylcellulose” is the t150u HPMC lock; Thrifty White, Vitacost, and DSLD 243441 print hydroxypropyl methylcellulose as one token';
const PANEL_CAPLETS =
  'AZO brand page https://azoproducts.com/products/azo-cranberry-caplets (50 caplets, in stock; label typo “colori” read as color) and Giant Food product 177733 at $11.99 (same other-ingredient line). Carton image and Hy-Vee UPC 0787651420670 tie 787651420677 to the 50-count single';
const PANEL_TINACTIN =
  'Tinactin brand page https://www.tinactin.com/tinactin-products/tinactin-athlete-foot-cream, DailyMed setid c3b715a9 NDC 11523-1190-1 (15 g), Thrifty White in stock (26) and Brookshire’s (same inactive line). UPC 041100594310 on both sale pages. Older lookup code 041100409065 is not this current single';
const PANEL_META =
  'Metamucil brand page https://www.metamucil.com/en-us/products/gummies/fiber-probiotics-gummies and Amazon ASIN B0CQF4PBGC (90 count, in stock, sold by Amazon, UPC 030772144589) and CVS 90 CT prodid 736902. Same full ingredient list';
const PANEL_BENE =
  'ShopRite 81 count (id 00886790326540), H-E-B product 10087522 (Add to cart), Thrifty White UPC 886790326540, and CVS 81 CT prodid 494495. Amazon ASIN B0BSKSTLR6 in stock, UPC 886790326540, GTIN 00886790326540';

export const BATCH247_KYR6D_T150U: RatingRecord[] = [
  {
    id: 'azo-b247-yeast-plus-60',
    productName: 'AZO Yeast Plus (60 tablets)',
    brand: 'AZO',
    category: 'First Aid',
    formulaId: 'azo-b247-yeast-plus-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '787651606675',
    activeIngredients: [
      { name: 'Candida albicans', strength: '30X' },
      { name: 'Kreosotum', strength: '30X' },
      { name: 'Natrium muriaticum', strength: '12X' },
      { name: 'Sulphur', strength: '12X' },
    ],
    inactiveIngredients: [
      flag(PANEL_YEAST, 'Dicalcium phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_YEAST, 'Fractionated coconut and palm kernel oil', 'limited', 'fractionatedCombo'),
      flag(PANEL_YEAST, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PANEL_YEAST, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_YEAST, 'Microcrystalline cellulose', 'cleared', 'mcc'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'iHerb', 'PureFormulas'],
    sourcesGeneral: [
      `Homeopathic actives are listed and not graded. One Limited token (fractionated coconut and palm kernel oil, t150u) makes the row Caution. Brand https://azoproducts.com/products/azo-yeast-plus 60 tablets in stock. iShop Naturals in stock at $12.99, UPC 787651606675, same inactive line. PureFormulas 8 in stock. iHerb in stock. Cumberland Apothecary available at $11.83, UPC 787651606675. Check digit OK. 20-count and 120-count DailyMed packages were not on the brand store as singles.`,
    ],
  },
  {
    id: 'azo-b247-d-mannose-120',
    productName: 'AZO D-Mannose Capsules (120 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b247-d-mannose-120',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760261',
    activeIngredients: [{ name: 'D-Mannose', strength: '2000 mg per 4 capsules' }],
    inactiveIngredients: [
      flag(PANEL_MANNOSE, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_MANNOSE, 'Magnesium stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'clean',
    retailers: ['AZO', 'Thrifty White'],
    sourcesGeneral: [
      `D-Mannose is the supplement-facts active and is not graded. Both other-ingredient tokens are Cleared, so the row is Clean. Brand page prints “Hydroxypropyl, Methylcellulose, Magnesium Stearate.” Thrifty White (in stock, UPC 787651760261), Vitacost, and DSLD 243441 print hydroxypropyl methylcellulose as one token. t150u maps Hydroxypropyl to that HPMC lock. The 240-count variant is a 2-pack and is not a row. Check digit OK.`,
    ],
  },
  {
    id: 'azo-b247-cranberry-caplets-50',
    productName: 'AZO Cranberry Caplets (50 caplets)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b247-cranberry-caplets-50',
    audience: ADULT,
    minAge: 18,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651420677',
    activeIngredients: [
      { name: 'Vitamin C (ascorbic acid)', strength: '60 mg' },
      { name: 'Calcium (as dicalcium phosphate)', strength: '110 mg' },
      { name: 'Pacran Whole Fruit Cranberry (Vaccinium macrocarpon)', strength: '500 mg' },
      { name: 'Bacillus coagulans', strength: '30 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_CAPLETS, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_CAPLETS, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_CAPLETS, 'Vegetable Juice (Color)', 'cleared', 'vegJuice'),
      flag(PANEL_CAPLETS, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_CAPLETS, 'Sodium ascorbate', 'cleared', 'sodiumAscorbate'),
      flag(PANEL_CAPLETS, 'Sodium carbonate', 'cleared', 'sodiumCarbonate'),
      flag(PANEL_CAPLETS, 'Annatto Extract (Color)', 'moderate', 'annatto'),
      flag(PANEL_CAPLETS, 'Beta carotene (Color)', 'moderate', 'betaCarotene'),
      flag(PANEL_CAPLETS, 'Ascorbic acid', 'cleared', 'ascorbic'),
      flag(PANEL_CAPLETS, 'Stearic acid', 'cleared', 'stearic'),
      flag(PANEL_CAPLETS, 'Povidone', 'cleared', 'povidone'),
      flag(PANEL_CAPLETS, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_CAPLETS, 'Magnesium stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'Giant Food'],
    sourcesGeneral: [
      `Supplement-facts actives, including calcium from dicalcium phosphate, are listed and not graded. Coating ascorbic acid is an other ingredient and is Cleared. Annatto extract (color) and beta-carotene (color) are Caution, so the row is Caution. No Limited token. Brand 50 caplets in stock. Giant Food lists the same other-ingredient line at $11.99. Target carton image ACBM12534 prints UPC 7 87651 42067 7. Hy-Vee lists UPC 0787651420670 for the 50-count. The 100-count variant is a 2-pack and is not a row. An older dyed coating is not this current panel. Check digit OK.`,
    ],
  },
  {
    id: 'tinactin-b247-af-cream-15g',
    productName: 'Tinactin Athlete’s Foot Cream (0.5 oz / 15 g)',
    brand: 'Tinactin',
    category: 'First Aid',
    formulaId: 'tinactin-b247-af-cream',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '041100594310',
    activeIngredients: [{ name: 'Tolnaftate', strength: '1%' }],
    inactiveIngredients: [
      flag(PANEL_TINACTIN, 'Ceteth-20', 'limited', 'ceteth20'),
      flag(PANEL_TINACTIN, 'Cetostearyl alcohol', 'cleared', 'cetostearyl'),
      flag(PANEL_TINACTIN, 'Chlorocresol', 'limited', 'chlorocresol'),
      flag(PANEL_TINACTIN, 'Mineral oil', 'cleared', 'mineralOilCream'),
      flag(PANEL_TINACTIN, 'Propylene glycol', 'cleared', 'pgTopical'),
      flag(PANEL_TINACTIN, 'Purified water', 'cleared', 'water'),
      flag(PANEL_TINACTIN, 'Sodium phosphate monobasic', 'cleared', 'phosphate'),
      flag(PANEL_TINACTIN, 'White petrolatum', 'cleared', 'petrolatum'),
    ],
    verdict: 'caution',
    retailers: ['Thrifty White', "Brookshire's"],
    sourcesGeneral: [
      `Tolnaftate is the active and is not graded. Ceteth-20 and chlorocresol are Limited (t150u). Two Limited tokens and no Avoid token make the row Caution. Mineral oil in this cream sits with white petrolatum, so it uses the Cleared topical ointment occlusive, not the Caution light liquid paraffin row. Propylene glycol is the topical form. Thrifty White in stock (26), UPC 041100594310, $7.48. Brookshire’s lists the same inactive line and product number 00041100594310 with Add to cart. The 30 g / 1 oz tube is a different count and is not this row. Check digit OK.`,
    ],
  },
  {
    id: 'metamucil-b247-fiber-probiotic-gummy-90',
    productName: 'Metamucil Fiber + Probiotics Gummies, Strawberry Kiwi Blackberry (90 gummies)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b247-fiber-probiotic-gummy-90',
    audience: ADULT,
    minAge: 12,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030772144589',
    activeIngredients: [
      { name: 'Inulin', strength: 'part of 5 g fiber per 3 gummies' },
      { name: 'Soluble corn fiber (Fibersol)', strength: 'part of 5 g fiber per 3 gummies' },
    ],
    inactiveIngredients: [
      flag(PANEL_META, 'Water', 'cleared', 'water'),
      flag(PANEL_META, 'Xylitol', 'limited', 'xylitol'),
      flag(PANEL_META, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_META, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_META, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
      flag(PANEL_META, 'Black carrot extract', 'cleared', 'blackCarrot'),
      flag(PANEL_META, 'Watermelon extract', 'cleared', 'watermelon'),
      flag(PANEL_META, 'Huito extract', 'moderate', 'huito'),
      flag(PANEL_META, 'Natural flavors', 'limited', 'naturalFlavors'),
      flag(PANEL_META, 'Carnauba wax', 'cleared', 'carnauba'),
      flag(PANEL_META, 'Corn starch', 'cleared', 'cornStarch'),
      flag(PANEL_META, 'Medium chain triglyceride oil', 'limited', 'mctGummy'),
    ],
    verdict: 'caution',
    retailers: ['Amazon', 'CVS', 'Metamucil'],
    sourcesGeneral: [
      `Inulin and soluble corn fiber (Fibersol) are the labeled fiber actives and are not graded. The brand also states 1 billion CFU of probiotics per serving; the printed ingredient list does not name a separate probiotic token. Stack-eligible Limited tokens are natural flavors and medium chain triglyceride oil (no plant named, t132u). Xylitol is the oral sugar-alcohol row and does not count toward the t137u stack. Huito extract is Caution (t150u) and does not stack. Two stack-eligible Limited tokens make the row Caution. Amazon ASIN B0CQF4PBGC, 90 count, in stock, sold by Amazon, UPC 030772144589. CVS 90 CT prodid 736902 prints the same list. DSLD 331338 UPC 0 30772 14458 9. Check digit OK.`,
    ],
  },
  {
    id: 'benefiber-b247-prebiotic-gummy-81',
    productName: 'Benefiber Prebiotic Fiber Gummies, Assorted Fruit (81 gummies)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b247-prebiotic-gummy-81',
    audience: ADULT,
    minAge: 12,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790326540',
    activeIngredients: [
      { name: 'Inulin (as chicory root fiber)', strength: 'part of 6 g fiber per 3 gummies' },
      { name: 'Soluble corn fiber', strength: 'part of 6 g fiber per 3 gummies' },
    ],
    inactiveIngredients: [
      flag(PANEL_BENE, 'Sugar', 'moderate', 'sugar'),
      flag(PANEL_BENE, 'Water', 'cleared', 'water'),
      flag(PANEL_BENE, 'Annatto Seed Extract (Color)', 'moderate', 'annatto'),
      flag(PANEL_BENE, 'Citric acid', 'cleared', 'citric'),
      flag(
        PANEL_BENE,
        'Fruit and Vegetable Juice Concentrates (Purple Carrot, Maqui Berry) (Color/Flavor)',
        'cleared',
        'juice',
      ),
      flag(PANEL_BENE, 'Monk Fruit Extract (Siraitia grosvenorii)', 'cleared', 'monkFruit'),
      flag(PANEL_BENE, 'Natural flavors', 'limited', 'naturalFlavors'),
      flag(PANEL_BENE, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_BENE, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
      flag(PANEL_BENE, 'Sunflower oil', 'high', 'sunflowerGummy'),
    ],
    verdict: 'avoid',
    retailers: ['Amazon', 'H-E-B', 'ShopRite'],
    sourcesGeneral: [
      `Inulin and soluble corn fiber are the fiber actives and are not graded. Sunflower oil in a gummy is Avoid, so the row is Avoid. Natural flavors is the only Limited token, so the 3+ Limited stack does not apply and there is no stack note. ShopRite, H-E-B (Add to cart, $18.69), CVS, and Thrifty White (UPC 886790326540) print the same other-ingredient line. Amazon ASIN B0BSKSTLR6, 81 count, in stock, UPC 886790326540. Check digit OK.`,
    ],
  },
];

const ROWS = BATCH247_KYR6D_T150U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch247 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch247 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch247 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch247 unexpected honestNote ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch247 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch247 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch247 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
