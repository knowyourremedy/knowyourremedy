// DRAFT / not verified / batch 251 KYR6-d. Does not repeat rows from 796, 805, 806, or 811.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const OTC = 'OTC' as const;

const JUICE =
  'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.';

const METH = {
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  caramel:
    'Methodology §5 High-risk (caramel color, class unnamed — ammonia-process 4-MEI; IARC possibly carcinogenic).',
  red40: 'Methodology §5 High-risk (FD&C Red No. 40 lake — synthetic dye).',
  yellow6: 'Methodology §5 High-risk (FD&C Yellow No. 6 lake — synthetic dye).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  hpmc: 'Methodology §5 Cleared (Hydroxypropyl Methylcellulose — t102u HPMC / hypromellose family).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPC; HPMC family).',
  fos: 'Methodology §5 Cleared (fructooligosaccharides — fiber family with inulin).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  citric: 'Methodology §5 Cleared (citric acid).',
  malic: 'Methodology §5 Cleared (malic acid — acidulant with citric acid).',
  juice: JUICE,
  steviol:
    'Methodology §5 Cleared (high-purity steviol glycosides — EFSA acceptable daily intake; not stevia leaf extract).',
  natArt:
    'Methodology §5 Limited (natural and artificial flavors — the label names a taste and does not list every part).',
  xylitol: 'Methodology §5 Limited (xylitol — sugar alcohol; does not count toward the t137u stack).',
  mannitol: 'Methodology §5 Limited (mannitol — sugar alcohol; does not count toward the t137u stack).',
  natFlavor:
    'Methodology §5 Caution (Natural Flavor singular — unnamed flavor; Usable; does not stack).',
  steviaLeaf:
    'Methodology §5 Caution (stevia leaf extract — not the high-purity steviol glycoside row).',
  aloe: 'Methodology §5 Caution (aloe vera gel as an other ingredient — plant gel; not a High row).',
  cellulose: 'Methodology §5 Cleared (cellulose / powdered cellulose — cellulose-family filler).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose-family disintegrant).',
  benzoic: 'Methodology §5 Caution (benzoic acid — preservative; benzoate family).',
  ink: 'Methodology §5 Caution (edible black ink — printing ink; pigments not each named).',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid-ethyl acrylate copolymer — enteric coating; not plain hypromellose).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide — zero-point Caution cap; does not count toward the Limited stack).',
  triethyl: 'Methodology §5 Cleared (triethyl citrate — coating plasticizer).',
  gelatin: 'Methodology §5 Cleared (gelatin — capsule base).',
  sunflower:
    'Methodology §5 Cleared (sunflower oil as softgel fill — not the gummy seed-oil High).',
  riceBranOil:
    'Methodology §5 Cleared (rice bran oil as softgel fill — not the gummy seed-oil High).',
  glycerin: 'Methodology §5 Cleared (glycerin / glycerine).',
  water: 'Methodology §5 Cleared (water / purified water).',
  lecithin: 'Methodology §5 Cleared (sunflower lecithin — named lecithin).',
  beeswax: 'Methodology §5 Cleared (yellow beeswax — wax row).',
  carob: 'Methodology §5 Caution (Carob — color in a softgel; Carob Extract row, not Cleared carob powder-as-food).',
  carmine: 'Methodology §5 Caution (carmine / cochineal — insect red color; allergy in sensitive people).',
  annatto: 'Methodology §5 Caution (annatto — named color).',
  ceteth20:
    'Methodology §5 Limited (Ceteth-20 — founder lock t150u Oct 21, 2026; exact token; not ceteth-20 phosphate or cetostearyl alcohol).',
  chlorocresol:
    'Methodology §5 Limited (Chlorocresol — founder lock t150u Oct 21, 2026; exact token; not chloroxylenol).',
  cetostearyl:
    'Methodology §5 Cleared (cetostearyl alcohol — fatty alcohol in a cream base).',
  mineralOilCream:
    'Methodology §5 Cleared (Paraffin + mineral oil as topical ointment occlusive — this cream lists mineral oil with white petrolatum; not the Caution light liquid paraffin row).',
  pgTopical:
    'Methodology §5 Cleared (propylene glycol, topical — not the oral t138u Limited row).',
  phosphate:
    'Methodology §5 Cleared (sodium phosphate monobasic — phosphate-salt class).',
  petrolatum: 'Methodology §5 Cleared (white petrolatum — topical ointment base).',
  bht: 'Methodology §5 High-risk (BHT / butylated hydroxytoluene — EU 2022 restriction; hormone disruption).',
  isobutane: 'Methodology §5 Cleared (isobutane — spray propellant).',
  ppg: 'Methodology §5 Caution (PPG-12-Buteth-16 — condition rule; one-level drop because the non-irritating condition cannot be confirmed).',
  sdAlcohol:
    'Methodology §5 Limited (SD alcohol 40-B — alcohol vehicle; not Avoid).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_FEM =
  'AZO brand page https://azoproducts.com/products/azo-complete-feminine-balance-daily-probiotic-capsules (30 and 60 capsules, both available) and iHerb in stock. Same other-ingredient line on Vitacost. Thrifty White 30-count is in stock and adds silicon dioxide; that extra token is not on the brand, iHerb, or Vitacost line';
const PANEL_MINI =
  'AZO brand page https://azoproducts.com/products/azo-vaginal-probiotic-mini-chews-packets (14 packets, available), iHerb in stock, and Vitacost. Same other-ingredient line. UPC 787651760674. The 28-count is a 2-pack';
const PANEL_BORIC =
  'AZO brand page https://azoproducts.com/products/azo-boric-acid (14 and 30 suppositories, both available). Target 14-count is in stock and prints the same ingredient line. iHerb 30-count is in stock and Vitacost prints UPC 787651760308 with the same line. DailyMed has no AZO boric acid SPL';
const PANEL_PACK =
  'AZO brand page https://azoproducts.com/products/azo-urinary-health-ready-to-mix-packets (10 packets, available) and Vitacost. Same other-ingredient line. Thrifty White is in stock, UPC 787651760575, 68 units. The 20-count is a 2-pack';
const PANEL_SOFT100 =
  'Vitacost https://www.vitacost.com/products/azo-cranberry-urinary-health-100-softgels-88632 and iHerb in stock, both 100 softgels, UPC 787651101675, same other-ingredient line as the 120-count. The brand site lists only the 120-count. This is not that row';
const SOFT_NOTE =
  'Sunflower oil and rice bran oil are Not clean when they are the base of a gummy. That is the form this app flags. This product is a softgel. The oils are the fill that holds the cranberry, not a gummy you chew, so they did not pull this grade down.';

const PANEL_CREAM =
  'Thrifty White in stock, UPC 041100594204, and Vitacost. Same inactive line. Walgreens 1 oz lists pickup. Target 1 oz lists pickup and delivery. This is not the 0.5 oz / 15 g cream';
const PANEL_LIQUID =
  'Thrifty White in stock, UPC 311017410059. Cub and ShopRite print the same inactive line. Tinactin brand liquid-spray page and DailyMed setid bb878f31 match. NDC is not the UPC';
const PANEL_UTD =
  'iHerb in stock, UPC 787651760117, and DailyMed setid ba13a608-e4c5-4465-8be8-be0fd1fd46ae. Same inactive line as the AZO brand page and the Target 24-count carton. Walmart item 50274881, 24 count, sold by Walmart.com, arrives today. The brand variant is sold out. NDC 49973-011-24 is not the UPC';

export const BATCH251_KYR6D_T155U: RatingRecord[] = [
  {
    id: 'azo-b251-feminine-balance-30',
    productName: 'AZO Complete Feminine Balance (30 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b251-feminine-balance',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760162',
    activeIngredients: [
      { name: 'Intelliflora blend (L. crispatus LBV 88, L. rhamnosus LBV 96, L. gasseri LBV 150N, L. jensenii LBV 116)', strength: '150 mg / 5 billion CFU' },
    ],
    inactiveIngredients: [
      flag(PANEL_FEM, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_FEM, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_FEM, 'Fructooligosaccharides', 'cleared', 'fos'),
      flag(PANEL_FEM, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_FEM, 'Titanium dioxide (color)', 'high', 'tio2'),
      flag(PANEL_FEM, 'Caramel (color)', 'high', 'caramel'),
    ],
    verdict: 'avoid',
    retailers: ['AZO', 'iHerb', 'Vitacost'],
    sourcesGeneral: [
      'The probiotic blend is a supplement-facts ingredient and is not graded. Titanium dioxide is Avoid (EU 2022 food ban; EFSA could not rule out DNA damage). Unnamed caramel color is also Avoid. Those highs set the row. This is not a 3+ Limited stack. Thrifty White’s in-stock 30-count adds silicon dioxide, which is not on the brand, iHerb, or Vitacost line, so it is not on this row. The 60-count is the same formula on its own row. UPC 787651760162 check digit OK.',
    ],
  },
  {
    id: 'azo-b251-feminine-balance-60',
    productName: 'AZO Complete Feminine Balance (60 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b251-feminine-balance',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760186',
    activeIngredients: [
      { name: 'Intelliflora blend (L. crispatus LBV 88, L. rhamnosus LBV 96, L. gasseri LBV 150N, L. jensenii LBV 116)', strength: '150 mg / 5 billion CFU' },
    ],
    inactiveIngredients: [
      flag(PANEL_FEM, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_FEM, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_FEM, 'Fructooligosaccharides', 'cleared', 'fos'),
      flag(PANEL_FEM, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_FEM, 'Titanium dioxide (color)', 'high', 'tio2'),
      flag(PANEL_FEM, 'Caramel (color)', 'high', 'caramel'),
    ],
    verdict: 'avoid',
    retailers: ['AZO', 'iHerb', 'Vitacost'],
    sourcesGeneral: [
      'Same other-ingredient line as the 30-count. iHerb 60-count is in stock and prints UPC 787651760186. Vitacost and DSLD 242644 print the same line. Titanium dioxide and unnamed caramel color are Avoid. This is not a 3+ Limited stack. The 60-count title is 60 capsules, not a 2-pack. UPC check digit OK.',
    ],
  },
  {
    id: 'azo-b251-mini-chews-14',
    productName: 'AZO Vaginal Probiotic Mini-Chews (14 packets)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b251-mini-chews-14',
    audience: ADULT,
    minAge: 18,
    form: 'chew',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760674',
    activeIngredients: [
      { name: 'Intelliflora blend', strength: '200 mg / 5 billion CFU' },
      { name: 'Lactobacillus rhamnosus GG', strength: '20 mg / 2 billion CFU' },
    ],
    inactiveIngredients: [
      flag(PANEL_MINI, 'Xylitol', 'limited', 'xylitol'),
      flag(PANEL_MINI, 'Mannitol', 'limited', 'mannitol'),
      flag(PANEL_MINI, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
      flag(PANEL_MINI, 'Stearic acid', 'cleared', 'stearic'),
      flag(PANEL_MINI, 'Natural Flavor', 'moderate', 'natFlavor'),
      flag(PANEL_MINI, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_MINI, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_MINI, 'Vegetable juice (color)', 'cleared', 'juice'),
      flag(PANEL_MINI, 'Malic acid', 'cleared', 'malic'),
      flag(PANEL_MINI, 'Stevia leaf extract', 'moderate', 'steviaLeaf'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'iHerb', 'Vitacost'],
    sourcesGeneral: [
      'The probiotic strains are supplement-facts ingredients and are not graded. Natural Flavor (singular) and stevia leaf extract are Caution, so the row is Caution. Xylitol and mannitol are sugar alcohols and do not count toward a Limited stack. Contains wheat is a disclosure, not a token. The 28-count is a 2-pack and is not a row. UPC 787651760674 check digit OK.',
    ],
  },
  {
    id: 'azo-b251-boric-14',
    productName: 'AZO Boric Acid Suppositories (14 suppositories)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b251-boric-acid',
    audience: ADULT,
    minAge: 18,
    form: 'suppository',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760353',
    activeIngredients: [{ name: 'Boric acid', strength: '600 mg' }],
    inactiveIngredients: [
      flag(PANEL_BORIC, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_BORIC, 'Aloe vera gel (powder)', 'moderate', 'aloe'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'Target'],
    sourcesGeneral: [
      'Boric acid 600 mg is the supplement ingredient and is not graded. Aloe vera gel (powder) is Caution, so the row is Caution. The capsule is hydroxypropyl methylcellulose and is Cleared. Target 14-count is in stock and prints the same line. The 30-count is the same formula on its own row. The 60-count is a 2-pack and is sold out. UPC 787651760353 check digit OK.',
    ],
  },
  {
    id: 'azo-b251-boric-30',
    productName: 'AZO Boric Acid Suppositories (30 suppositories)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b251-boric-acid',
    audience: ADULT,
    minAge: 18,
    form: 'suppository',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760308',
    activeIngredients: [{ name: 'Boric acid', strength: '600 mg' }],
    inactiveIngredients: [
      flag(PANEL_BORIC, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_BORIC, 'Aloe vera gel (powder)', 'moderate', 'aloe'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'iHerb', 'Vitacost'],
    sourcesGeneral: [
      'Same ingredient line as the 14-count. iHerb 30-count is in stock. Vitacost prints UPC 787651760308 and the same line. Aloe vera gel (powder) is Caution. UPC check digit OK.',
    ],
  },
  {
    id: 'azo-b251-d-mannose-packets-10',
    productName: 'AZO D-Mannose Ready to Mix Packets (10 packets)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b251-d-mannose-packets-10',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760575',
    activeIngredients: [
      { name: 'D-Mannose', strength: '2000 mg' },
      { name: 'Vitamin C (as ascorbic acid)', strength: '500 mg' },
      { name: 'Vitamin D (as cholecalciferol)', strength: '15 mcg' },
      { name: 'Vitamin B6 (as pyridoxine hydrochloride)', strength: '2 mg' },
      { name: 'Calcium (as calcium carbonate)', strength: '30 mg' },
      { name: 'Magnesium (as magnesium oxide)', strength: '30 mg' },
      { name: 'Potassium (as potassium citrate)', strength: '360 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_PACK, 'Natural and artificial flavors', 'limited', 'natArt'),
      flag(PANEL_PACK, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_PACK, 'Steviol glycosides', 'cleared', 'steviol'),
      flag(PANEL_PACK, 'Vegetable juice (color)', 'cleared', 'juice'),
    ],
    verdict: 'caution',
    retailers: ['AZO', 'Vitacost', 'Thrifty White'],
    sourcesGeneral: [
      'D-Mannose, the vitamins, and the electrolyte salts are supplement-facts ingredients and are not graded. Natural and artificial flavors are one Limited token, so the row is Caution. This is not a 3+ Limited stack. Steviol glycosides are the high-purity row. Thrifty White is in stock at 68 units with the same UPC. The 20-count is a 2-pack and is not a row. UPC 787651760575 check digit OK.',
    ],
  },
  {
    id: 'azo-b251-tract-defense-24',
    productName: 'AZO Urinary Tract Defense (24 tablets)',
    brand: 'AZO',
    category: 'Pain & Fever',
    formulaId: 'azo-b251-tract-defense-24',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '787651760117',
    activeIngredients: [
      { name: 'Methenamine', strength: '162 mg' },
      { name: 'Sodium salicylate', strength: '162.5 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_UTD, 'Benzoic acid', 'moderate', 'benzoic'),
      flag(PANEL_UTD, 'Cellulose', 'cleared', 'cellulose'),
      flag(PANEL_UTD, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_UTD, 'Edible black ink', 'moderate', 'ink'),
      flag(PANEL_UTD, 'FD&C Red #40 Lake', 'high', 'red40'),
      flag(PANEL_UTD, 'FD&C Yellow #6 Lake', 'high', 'yellow6'),
      flag(PANEL_UTD, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
      flag(PANEL_UTD, 'Hydroxypropyl methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_UTD, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_UTD, 'Methacrylic acid-ethyl acrylate copolymer', 'moderate', 'methacrylic'),
      flag(PANEL_UTD, 'Silica', 'moderate', 'silica'),
      flag(PANEL_UTD, 'Stearic acid', 'cleared', 'stearic'),
      flag(PANEL_UTD, 'Titanium dioxide', 'high', 'tio2'),
      flag(PANEL_UTD, 'Triethyl citrate', 'cleared', 'triethyl'),
    ],
    verdict: 'avoid',
    retailers: ['iHerb', 'Walmart', 'Walgreens'],
    sourcesGeneral: [
      'Methenamine and sodium salicylate are the drug-facts actives and are not graded. FD&C Red No. 40 lake, FD&C Yellow No. 6 lake, and titanium dioxide are Avoid, so the row is Avoid. This is not a 3+ Limited stack. Silica is the zero-point Caution cap. The brand 24-count variant is sold out; iHerb and Walmart.com are in stock on the same line. The 18-count is a different package and is not this row. NDC 49973-011-24 is not the UPC. UPC 787651760117 check digit OK.',
    ],
  },
  {
    id: 'azo-b251-cranberry-softgel-100',
    productName: 'AZO Cranberry Softgels (100 softgels)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b251-cranberry-softgel-100',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651101675',
    honestNote: SOFT_NOTE,
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '120 mg per 2 softgels' },
      { name: 'Pacran whole fruit cranberry', strength: '500 mg per 2 softgels' },
    ],
    inactiveIngredients: [
      flag(PANEL_SOFT100, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_SOFT100, 'Sunflower oil', 'cleared', 'sunflower'),
      flag(PANEL_SOFT100, 'Rice bran oil', 'cleared', 'riceBranOil'),
      flag(PANEL_SOFT100, 'Glycerin', 'cleared', 'glycerin'),
      flag(PANEL_SOFT100, 'Water', 'cleared', 'water'),
      flag(PANEL_SOFT100, 'Sunflower lecithin', 'cleared', 'lecithin'),
      flag(PANEL_SOFT100, 'Yellow beeswax', 'cleared', 'beeswax'),
      flag(PANEL_SOFT100, 'Carob', 'moderate', 'carob'),
      flag(PANEL_SOFT100, 'Carmine', 'moderate', 'carmine'),
      flag(PANEL_SOFT100, 'Annatto', 'moderate', 'annatto'),
    ],
    verdict: 'caution',
    retailers: ['Vitacost', 'iHerb'],
    sourcesGeneral: [
      'Vitamin C and Pacran are supplement-facts ingredients and are not graded. Carob, carmine, and annatto are Caution, so the row is Caution. Sunflower oil and rice bran oil are the softgel fill, not a gummy base. This is not the 120-count (UPC 787651760230). The brand site does not list a 100-count; Vitacost and iHerb do, and they agree. UPC 787651101675 check digit OK.',
    ],
  },
  {
    id: 'tinactin-b251-af-cream-30g',
    productName: 'Tinactin Athlete’s Foot Cream (1 oz / 30 g)',
    brand: 'Tinactin',
    category: 'First Aid',
    formulaId: 'tinactin-b247-af-cream',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '041100594204',
    activeIngredients: [{ name: 'Tolnaftate', strength: '1%' }],
    inactiveIngredients: [
      flag(PANEL_CREAM, 'Ceteth-20', 'limited', 'ceteth20'),
      flag(PANEL_CREAM, 'Cetostearyl alcohol', 'cleared', 'cetostearyl'),
      flag(PANEL_CREAM, 'Chlorocresol', 'limited', 'chlorocresol'),
      flag(PANEL_CREAM, 'Mineral oil', 'cleared', 'mineralOilCream'),
      flag(PANEL_CREAM, 'Propylene glycol', 'cleared', 'pgTopical'),
      flag(PANEL_CREAM, 'Purified water', 'cleared', 'water'),
      flag(PANEL_CREAM, 'Sodium phosphate monobasic', 'cleared', 'phosphate'),
      flag(PANEL_CREAM, 'White petrolatum', 'cleared', 'petrolatum'),
    ],
    verdict: 'caution',
    retailers: ['Thrifty White', 'Vitacost', 'Walgreens', 'Target'],
    sourcesGeneral: [
      'Tolnaftate is the active and is not graded. Ceteth-20 and chlorocresol are Limited (t150u). Two Limited tokens and no Avoid token make the row Caution. This is not a 3+ Limited stack. Same inactive line as the 0.5 oz / 15 g cream, which stays its own row. Thrifty White is in stock (15), UPC 041100594204. Vitacost prints the same UPC and the same inactive line. Walgreens lists pickup. Target lists pickup and delivery. UPC check digit OK.',
    ],
  },
  {
    id: 'tinactin-b251-liquid-spray-150g',
    productName: 'Tinactin Athlete’s Foot Liquid Spray (5.3 oz / 150 g)',
    brand: 'Tinactin',
    category: 'First Aid',
    formulaId: 'tinactin-b251-liquid-spray',
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '311017410059',
    activeIngredients: [{ name: 'Tolnaftate', strength: '1%' }],
    inactiveIngredients: [
      flag(PANEL_LIQUID, 'Butylated hydroxytoluene', 'high', 'bht'),
      flag(PANEL_LIQUID, 'Isobutane', 'cleared', 'isobutane'),
      flag(PANEL_LIQUID, 'PPG-12-Buteth-16', 'moderate', 'ppg'),
      flag(PANEL_LIQUID, 'SD alcohol 40-B', 'limited', 'sdAlcohol'),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White', 'Cub', 'ShopRite', 'Tinactin'],
    sourcesGeneral: [
      'Tolnaftate is the active and is not graded. BHT is Avoid (EU 2022 hormone restriction), so the row is Avoid. This is not a 3+ Limited stack. SD alcohol 40-B is one Limited token. PPG-12-Buteth-16 is Caution on the condition rule. Thrifty White is in stock (30), UPC 311017410059. Cub and ShopRite print the same inactive line on product number 00311017410059. The brand liquid-spray page prints the same line. DailyMed setid bb878f31 matches. NDC 11523-0165 is not the UPC. UPC check digit OK.',
    ],
  },
];

const ROWS = BATCH251_KYR6D_T155U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 10) throw new Error(`batch251 row count ${ROWS.length}`);
for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch251 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (rollup.cause === 'limited_stack' && !record.honestNote?.includes('Limited')) {
    throw new Error(`batch251 missing stack note ${record.id}`);
  }
  if (record.honestNote && record.id !== 'azo-b251-cranberry-softgel-100') {
    throw new Error(`batch251 unexpected honest note ${record.id}`);
  }
  if (record.id === 'azo-b251-cranberry-softgel-100' && record.honestNote !== SOFT_NOTE) {
    throw new Error('batch251 softgel note');
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch251 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch251 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch251 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
