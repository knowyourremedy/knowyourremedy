// DRAFT / not verified / batch 260 KYR6-d (t22u).
// Culturelle, Align, and Phillips' singles. Two sources: t18u brand facts image
// plus the founder's Oct 22, 2026 real-browser store page. No retailer was curled.
// Does not repeat batch258, batch259, align-daily-probiotic, or the Phillips' 12 oz rows.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const SUPPLEMENT = 'Supplement' as const;
const OTC = 'OTC' as const;

const METH = {
  acacia: 'Methodology §5 Cleared (acacia gum / gum arabic — gum family).',
  acaciaHydro: 'Methodology §5 Cleared (Acacia hydrolysate — founder lock t16u Oct 22, 2026). Not acacia gum.',
  annatto: 'Methodology §5 Caution (annatto — plant color; does not count toward the t137u stack).',
  ascorbate: 'Methodology §5 Cleared (sodium ascorbate — ascorbate family).',
  beet: 'Methodology §5 Cleared (beet juice (color) — fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Locked Oct 15, 2026.',
  blue1: 'Methodology §5 High-risk (FD&C Blue 1 / Blue 1 — synthetic dye; EU activity-and-attention warning).',
  cane: 'Methodology §5 Cleared (cane sugar / organic cane sugar).',
  caramel: 'Methodology §5 High-risk (caramel color, class unnamed — ammonia-process 4-MEI; IARC possibly carcinogenic).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026).',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  coconut: 'Methodology §5 Cleared (coconut oil, named, any form — founder override t111u Oct 17, 2026).',
  cornStarch: 'Methodology §5 Cleared (corn starch / organic corn starch — named starch).',
  cornSyrup: 'Methodology §5 Caution (corn syrup — sweetener; does not count toward the t137u stack).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose-family disintegrant).',
  drm: 'Methodology §5 Limited (Digestion-resistant maltodextrin — founder lock t16u Oct 22, 2026; counts toward the t137u stack). Not generic maltodextrin. Not tapioca maltodextrin.',
  fos: 'Methodology §5 Cleared (FOS / fructooligosaccharides — fiber family with inulin).',
  fracCoco: 'Methodology §5 Cleared (Fractionated coconut oil — coconut-in-gummy exception; not gummy seed-oil Avoid).',
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup — cane-sugar / glucose-syrup row). Not bare glucose.',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — HPMC family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — cellulose-family coating).',
  inulin: 'Methodology §5 Cleared (inulin — food fiber).',
  juice: 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  larch: 'Methodology §5 Cleared (Larch arabinogalactan — founder lock t16u Oct 22, 2026).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  malic: 'Methodology §5 Cleared (malic acid — organic acid).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin — generic starch sweetener; counts toward the t137u stack).',
  mannitol: 'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  mctGummy: 'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named; counts toward the t137u stack).',
  natFlavor: 'Methodology §5 Caution (Natural flavor, singular — unnamed natural flavor; not the Limited natural flavors mixture).',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  oatBran: 'Methodology §5 Cleared (Oat bran — founder lock t16u Oct 22, 2026).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  peg: 'Methodology §5 Limited (PEGs / polyethylene glycol — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  polydextrose: 'Methodology §5 Limited (polydextrose — maltodextrin-like bulking fiber; counts toward the t137u stack).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch — named starch).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol — oral coating).',
  purpleCarrot: 'Methodology §5 Cleared (purple carrot concentrate — Oct 15, 2026 juice and concentrate lock). Sweetener or color.',
  rebA: 'Methodology §5 Limited (Rebaudioside A printed without organic or extracted — founder lock t16u Oct 22, 2026; counts toward the t137u stack).',
  silica: 'Methodology §5 Caution (silicon dioxide — zero-point Caution cap; does not count toward the Limited stack).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / trisodium citrate — citrate-salt buffer).',
  solubleCorn: 'Methodology §5 Cleared (soluble corn fiber — fiber family).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  steviaLeaf: 'Methodology §5 Limited (stevia leaf extract — founder lock t159u Oct 21, 2026; counts toward the t137u stack).',
  steviol: 'Methodology §5 Limited (Steviol glycosides printed without high-purity — founder lock t16u Oct 22, 2026; counts toward the t137u stack).',
  sugar: 'Methodology §5 Caution (bare sugar — does not count toward the t137u stack).',
  sucrose: 'Methodology §5 Cleared (sucrose). Founder override Oct 17, 2026 t118u.',
  talc: 'Methodology §5 High-risk (talc — IARC Group 2A, 2024; Avoid in oral products).',
  tapiocaMd: 'Methodology §5 Limited (Tapioca Maltodextrin — founder lock t141u Oct 20, 2026; counts toward the t137u stack).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  trehalose: 'Methodology §5 Cleared (Trehalose — founder lock t16u Oct 22, 2026).',
  vegJuice: 'Methodology §5 Cleared (vegetable juice (color) — fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Locked Oct 15, 2026.',
  vegMag: 'Methodology §5 Cleared (vegetable magnesium stearate — stearate-family lubricant).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xylitol: 'Methodology §5 Caution (xylitol, oral — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  isomalt: 'Methodology §5 Caution (isomalt — founder restamp Sept 25, 2026; does not count toward the t137u stack).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function contra(flags: IngredientFlag[], form: string): string | undefined {
  return (
    contradictionHonestNote({
      id: 'note',
      productName: 'note',
      brand: 'note',
      category: 'Digestive',
      form,
      activeIngredients: [],
      inactiveIngredients: flags,
      verdict: 'clean',
      retailers: [],
    }) ?? undefined
  );
}

function withNotes(flags: IngredientFlag[], form: string): string | undefined {
  const stack = limitedStackHonestNoteIfAny(flags);
  const formNote = contra(flags, form);
  if (stack && formNote) return `${formNote} ${stack}`;
  return stack ?? formNote;
}

const P_FIBER =
  'Culturelle brand FiberMax facts image (t18u; sku 049100402123, in stock). Target A-1010807201, $19.99, Add to cart, UPC 049100402123 (founder browser Oct 22, 2026)';
const P_MINI =
  'Culturelle brand Mini-Chews facts image (t18u; sku 049100402017). Target A-95046775, $23.99, Add to cart, UPC 049100402017 (founder browser Oct 22, 2026)';
const P_MELTS =
  'Culturelle brand Kids Fast Melts facts image (t18u; sku 049100402031). Target A-94938844, $23.99, Add to cart, UPC 049100402031 (founder browser Oct 22, 2026)';
const P_ELEC =
  'Culturelle brand Kids Electrolytes facts image (t18u; sku 049100402048). Target A-94913544, $23.99, Add to cart, UPC 049100402048 (founder browser Oct 22, 2026)';
const P_W4 =
  'Culturelle brand Women\'s 4-in-1 facts image (t18u; sku 049100400594). Target A-75001757, $27.49, Add to cart, UPC 049100400594 (founder browser Oct 22, 2026)';
const P_MET =
  'Culturelle brand Metabolism facts image (t18u; sku 049100401836). Target A-94270783, $26.99, Add to cart, UPC 049100401836 (founder browser Oct 22, 2026)';
const P_LUT =
  'Culturelle brand Kids lutein gummies facts image (t18u; sku 049100401485). Target A-84761324, $18.19, Add to cart, UPC 049100401485, and Walmart https://www.walmart.com/ip/926404046, $24.27 (founder browser Oct 22, 2026)';
const P_KIMM =
  'Culturelle brand Kids Immune chewables facts image (t18u; sku 049100401201). Target A-80348552, $23.99, Add to cart, UPC 049100401201, and Walmart https://www.walmart.com/ip/919654704, $21.99 (founder browser Oct 22, 2026)';
const P_IMM =
  'Culturelle brand Immune Defense chewables facts image (t18u; sku 049100401225). Walmart https://www.walmart.com/ip/511182576, $23.99, line matches the brand (founder browser Oct 22, 2026)';
const P_ADG =
  'Culturelle brand adult gummies facts image (t18u; sku 049100400921). Target A-76758797, $19.69, Add to cart, UPC 049100400921 (founder browser Oct 22, 2026)';
const P_PKT =
  'Culturelle brand Kids Purely packets facts image (t18u; sku 049100400082). Target A-13921277, $19.99, Add to cart, UPC 049100400082 (founder browser Oct 22, 2026)';
const P_WW =
  'Culturelle brand Women\'s Wellness chewables facts image (t18u; sku 049100401492). CVS prodid-323004, line matches the brand (founder browser Oct 22, 2026). Walmart https://www.walmart.com/ip/1529515592, $26.50, Add to cart';
const P_HW50 =
  'Culturelle brand Health & Wellness facts image (t18u; sku 049100400433). Walmart https://www.walmart.com/ip/843792750, $25.26, Add to cart, same titanium dioxide line (founder browser Oct 22, 2026)';
const P_PURE =
  'Culturelle brand Kids Purely chewables facts image (t18u; sku 049100400150). Target A-51611897, $20.99, Add to cart, UPC 049100400426, titled Kids Daily Probiotic Chewable (founder browser Oct 22, 2026). CVS prodid-883971 adds Sugar Alcohol and is not on this row';
const P_AX =
  'Align Extra Strength facts image (t18u; file UPC 037000505051). Target A-52491311, $27.49, Add to cart (founder browser Oct 22, 2026)';
const P_AWD =
  'Align Women\'s Dual Action facts image (t18u; 030772032565). Target A-84799482, $30.99, Add to cart, UPC 030772032565 (founder browser Oct 22, 2026)';
const P_ABC =
  'Align Bloating Relief capsules facts image (t18u; 030772086773). Walmart https://www.walmart.com/ip/1746780027, $29.98, and Target A-93227244, $30.99, UPC 030772086773 (founder browser Oct 22, 2026)';
const P_A31 =
  'Align 3-in-1 Biotic gummies facts image (t18u). Target A-94982165, $24.99, Add to cart, UPC 030772191316 (founder browser Oct 22, 2026)';
const P_ADB =
  'Align DualBiotic gummies facts image (t18u; 037000779377). Target A-75557336, $24.99, Add to cart, UPC 037000779377, and Walmart https://www.walmart.com/ip/581445245 (founder browser Oct 22, 2026)';
const P_ABG =
  'Align Bloating Relief gummies facts image (t18u). Target A-89650897, $24.99, Add to cart, UPC 030772132562 (founder browser Oct 22, 2026)';
const P_A70 =
  'Align 70 Billion facts image (t18u). Target A-95234558, $34.99, Add to cart, UPC 030772198681 (founder browser Oct 22, 2026)';
const P_AST =
  'Align Gut Health & Stress facts image (t18u; 037000598558). Target De-Stress A-81875293, $26.99, Add to cart, UPC 037000598558 (founder browser Oct 22, 2026)';
const P_CAP =
  'Target A-82778933, $9.89, Add to cart, UPC 312843520820; Walmart https://www.walmart.com/ip/10316191, $15.78, Add to cart; Walgreens prod6143224, $13.99 (founder browser Oct 22, 2026)';
const P_CH =
  'Walmart https://www.walmart.com/ip/130784792, $20.71, 3P Hey Pharma, Add to cart, box barcode 312843534308, LGG + BB-12. Walgreens prod4177530, $17.99, in stock, same other line (founder browser Oct 22, 2026)';

const FIBER_FLAGS: IngredientFlag[] = [
  flag(P_FIBER, 'Acacia gum', 'cleared', 'acacia'),
  flag(P_FIBER, 'Soluble corn fiber', 'cleared', 'solubleCorn'),
  flag(P_FIBER, 'Oat bran', 'cleared', 'oatBran'),
  flag(P_FIBER, 'Larch arabinogalactan', 'cleared', 'larch'),
];

const MINI_FLAGS: IngredientFlag[] = [
  flag(P_MINI, 'Digestion-resistant maltodextrin', 'limited', 'drm'),
  flag(P_MINI, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_MINI, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_MINI, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_MINI, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_MINI, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_MINI, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_MINI, 'Citric acid', 'cleared', 'citric'),
  flag(P_MINI, 'Steviol glycosides', 'limited', 'steviol'),
  flag(P_MINI, 'Vegetable juice (color)', 'cleared', 'vegJuice'),
  flag(P_MINI, 'Malic acid', 'cleared', 'malic'),
];

const MELTS_FLAGS: IngredientFlag[] = [
  flag(P_MELTS, 'Isomalt', 'moderate', 'isomalt'),
  flag(P_MELTS, 'Acacia hydrolysate', 'cleared', 'acaciaHydro'),
  flag(P_MELTS, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_MELTS, 'Citric acid', 'cleared', 'citric'),
  flag(P_MELTS, 'Rebaudioside A', 'limited', 'rebA'),
];

const ELEC_FLAGS: IngredientFlag[] = [
  flag(P_ELEC, 'Polydextrose', 'limited', 'polydextrose'),
  flag(P_ELEC, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_ELEC, 'Citric acid', 'cleared', 'citric'),
  flag(P_ELEC, 'Malic acid', 'cleared', 'malic'),
  flag(P_ELEC, 'Black carrot juice concentrate (color)', 'cleared', 'juice'),
  flag(P_ELEC, 'Tapioca maltodextrin', 'limited', 'tapiocaMd'),
  flag(P_ELEC, 'Rebaudioside A', 'limited', 'rebA'),
];

const W4_FLAGS: IngredientFlag[] = [
  flag(P_W4, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_W4, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_W4, 'Fructooligosaccharides', 'cleared', 'fos'),
  flag(P_W4, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_W4, 'Titanium dioxide (color)', 'high', 'tio2'),
  flag(P_W4, 'Caramel (color)', 'high', 'caramel'),
];

const MET_FLAGS: IngredientFlag[] = [
  flag(P_MET, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_MET, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_MET, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_MET, 'Purple carrot concentrate (color)', 'cleared', 'purpleCarrot'),
];

const LUT_FLAGS: IngredientFlag[] = [
  flag(P_LUT, 'Glucose syrup', 'cleared', 'glucoseSyrup'),
  flag(P_LUT, 'Cane sugar', 'cleared', 'cane'),
  flag(P_LUT, 'Water', 'cleared', 'water'),
  flag(P_LUT, 'Pectin', 'cleared', 'pectin'),
  flag(P_LUT, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_LUT, 'Citric acid', 'cleared', 'citric'),
  flag(P_LUT, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_LUT, 'Organic black carrot juice concentrate (color)', 'cleared', 'juice'),
  flag(P_LUT, 'Fractionated coconut oil', 'cleared', 'fracCoco'),
  flag(P_LUT, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_LUT, 'Organic corn starch', 'cleared', 'cornStarch'),
];

const KIMM_FLAGS: IngredientFlag[] = [
  flag(P_KIMM, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_KIMM, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_KIMM, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_KIMM, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_KIMM, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_KIMM, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_KIMM, 'Vegetable juice (color)', 'cleared', 'vegJuice'),
  flag(P_KIMM, 'Stevia leaf extract', 'limited', 'steviaLeaf'),
];

const IMM_FLAGS: IngredientFlag[] = [
  flag(P_IMM, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_IMM, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_IMM, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_IMM, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_IMM, 'Natural flavor', 'moderate', 'natFlavor'),
  flag(P_IMM, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_IMM, 'Vegetable juice (color)', 'cleared', 'vegJuice'),
  flag(P_IMM, 'Stevia leaf extract', 'limited', 'steviaLeaf'),
];

const ADG_FLAGS: IngredientFlag[] = [
  flag(P_ADG, 'Water', 'cleared', 'water'),
  flag(P_ADG, 'Organic cane sugar', 'cleared', 'cane'),
  flag(P_ADG, 'Pectin', 'cleared', 'pectin'),
  flag(P_ADG, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_ADG, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_ADG, 'Citric acid', 'cleared', 'citric'),
  flag(P_ADG, 'Colors from fruits and vegetables', 'cleared', 'juice'),
  flag(P_ADG, 'Fractionated coconut oil', 'cleared', 'fracCoco'),
  flag(P_ADG, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_ADG, 'Corn starch', 'cleared', 'cornStarch'),
];

const PKT_FLAGS: IngredientFlag[] = [
  flag(P_PKT, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_PKT, 'Inulin', 'cleared', 'inulin'),
];

const WW_FLAGS: IngredientFlag[] = [
  flag(P_WW, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_WW, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_WW, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_WW, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_WW, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
  flag(P_WW, 'Citric acid', 'cleared', 'citric'),
  flag(P_WW, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_WW, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_WW, 'Vegetable juice (color)', 'cleared', 'vegJuice'),
  flag(P_WW, 'Malic acid', 'cleared', 'malic'),
  flag(P_WW, 'Stevia leaf extract', 'limited', 'steviaLeaf'),
];

const HW50_FLAGS: IngredientFlag[] = [
  flag(P_HW50, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_HW50, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_HW50, 'Vegetable magnesium stearate', 'cleared', 'vegMag'),
  flag(P_HW50, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const PURE_FLAGS: IngredientFlag[] = [
  flag(P_PURE, 'Xylitol', 'moderate', 'xylitol'),
  flag(P_PURE, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_PURE, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_PURE, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_PURE, 'Beet juice (color)', 'cleared', 'beet'),
  flag(P_PURE, 'Citric acid', 'cleared', 'citric'),
  flag(P_PURE, 'Malic acid', 'cleared', 'malic'),
  flag(P_PURE, 'Magnesium stearate', 'cleared', 'magStearate'),
];

const AX_FLAGS: IngredientFlag[] = [
  flag(P_AX, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_AX, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_AX, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_AX, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const AWD_FLAGS: IngredientFlag[] = [
  flag(P_AWD, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_AWD, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_AWD, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(P_AWD, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_AWD, 'Silicon dioxide', 'moderate', 'silica'),
];

const ABC_FLAGS: IngredientFlag[] = AWD_FLAGS.map((ingredient) => ({
  ...ingredient,
  source: ingredient.source.replace(P_AWD, P_ABC),
}));

const A31_FLAGS: IngredientFlag[] = [
  flag(P_A31, 'Sugar', 'moderate', 'sugar'),
  flag(P_A31, 'Water', 'cleared', 'water'),
  flag(P_A31, 'Pectin', 'cleared', 'pectin'),
  flag(P_A31, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_A31, 'Citric acid', 'cleared', 'citric'),
  flag(P_A31, 'Black carrot juice (color)', 'cleared', 'juice'),
  flag(P_A31, 'Watermelon juice (color)', 'cleared', 'juice'),
  flag(P_A31, 'Huito juice (color)', 'cleared', 'juice'),
  flag(P_A31, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_A31, 'MCT oil', 'limited', 'mctGummy'),
  flag(P_A31, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_A31, 'Corn starch', 'cleared', 'cornStarch'),
];

const ADB_FLAGS: IngredientFlag[] = [
  flag(P_ADB, 'Water', 'cleared', 'water'),
  flag(P_ADB, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_ADB, 'Pectin', 'cleared', 'pectin'),
  flag(P_ADB, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_ADB, 'Citric acid', 'cleared', 'citric'),
  flag(P_ADB, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_ADB, 'Black carrot (color)', 'cleared', 'juice'),
  flag(P_ADB, 'Annatto', 'moderate', 'annatto'),
  flag(P_ADB, 'Genipap juice concentrate (color)', 'cleared', 'juice'),
  flag(P_ADB, 'Watermelon juice concentrate (color)', 'cleared', 'juice'),
  flag(P_ADB, 'Coconut oil', 'cleared', 'coconut'),
  flag(P_ADB, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_ADB, 'Corn starch', 'cleared', 'cornStarch'),
];

const ABG_FLAGS: IngredientFlag[] = [
  flag(P_ABG, 'Corn syrup', 'moderate', 'cornSyrup'),
  flag(P_ABG, 'Sugar', 'moderate', 'sugar'),
  flag(P_ABG, 'Water', 'cleared', 'water'),
  flag(P_ABG, 'Pectin', 'cleared', 'pectin'),
  flag(P_ABG, 'Natural flavors', 'limited', 'natFlavors'),
  flag(P_ABG, 'Citric acid', 'cleared', 'citric'),
  flag(P_ABG, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
  flag(P_ABG, 'Carnauba wax', 'cleared', 'carnauba'),
  flag(P_ABG, 'Black carrot juice (color)', 'cleared', 'juice'),
  flag(P_ABG, 'Corn starch', 'cleared', 'cornStarch'),
  flag(P_ABG, 'MCT oil', 'limited', 'mctGummy'),
];

const A70_FLAGS: IngredientFlag[] = [
  flag(P_A70, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_A70, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_A70, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(P_A70, 'Trehalose', 'cleared', 'trehalose'),
  flag(P_A70, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_A70, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_A70, 'Silicon dioxide', 'moderate', 'silica'),
  flag(P_A70, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const AST_FLAGS: IngredientFlag[] = [
  flag(P_AST, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_AST, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_AST, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(P_AST, 'Silicon dioxide', 'moderate', 'silica'),
  flag(P_AST, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_AST, 'Blue 1', 'high', 'blue1'),
];

const CAP_FLAGS: IngredientFlag[] = [
  flag(P_CAP, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_CAP, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
  flag(P_CAP, 'Pregelatinized starch', 'cleared', 'pregel'),
  flag(P_CAP, 'Polyethylene glycol', 'limited', 'peg'),
  flag(P_CAP, 'Polyvinyl alcohol', 'cleared', 'pva'),
  flag(P_CAP, 'Silicon dioxide', 'moderate', 'silica'),
  flag(P_CAP, 'Stearic acid', 'cleared', 'stearic'),
  flag(P_CAP, 'Talc', 'high', 'talc'),
  flag(P_CAP, 'Titanium dioxide (color)', 'high', 'tio2'),
];

const CH_FLAGS: IngredientFlag[] = [
  flag(P_CH, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(P_CH, 'Hypromellose', 'cleared', 'hpmc'),
  flag(P_CH, 'Microcrystalline cellulose', 'cleared', 'mcc'),
  flag(P_CH, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_CH, 'Magnesium stearate', 'cleared', 'magStearate'),
  flag(P_CH, 'Sodium ascorbate', 'cleared', 'ascorbate'),
];

function pack(
  id: string,
  productName: string,
  brand: string,
  formulaId: string,
  audience: typeof ADULT | typeof KIDS,
  minAge: number,
  form: string,
  productType: typeof SUPPLEMENT | typeof OTC,
  barcode: string,
  actives: RatingRecord['activeIngredients'],
  flags: IngredientFlag[],
  retailers: string[],
  sources: string,
): RatingRecord {
  const rollup = computeVerdictFromInactiveIngredients(flags);
  return {
    id,
    productName,
    brand,
    category: 'Digestive',
    formulaId,
    audience,
    minAge,
    form,
    recordStatus: UNVERIFIED,
    productType,
    barcode,
    activeIngredients: actives,
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    honestNote: withNotes(flags, form),
    retailers,
    sourcesGeneral: [sources],
  };
}

const LGG = [{ name: 'Lactobacillus rhamnosus GG', strength: 'not graded' }];
const BB = [
  { name: 'Lactobacillus rhamnosus GG', strength: 'not graded' },
  { name: 'Bifidobacterium animalis subsp. lactis BB-12', strength: 'not graded' },
];

export const BATCH260_KYR6D_T22U: RatingRecord[] = [
  pack('culturelle-b260-fibermax-20', 'Culturelle Probiotics + FiberMax Packets (20)', 'Culturelle', 'culturelle-b260-fibermax', ADULT, 18, 'packet', SUPPLEMENT, '049100402123', LGG, FIBER_FLAGS, ['Culturelle', 'Target'], 'All other ingredients are Cleared fiber. Clean. Not a 3+ Limited stack. Brand facts image and Target A-1010807201 agree. UPC 049100402123 check digit OK.'),
  pack('culturelle-b260-minichews-28', 'Culturelle Complete 3-in-1 Biotics Mini-Chews (28)', 'Culturelle', 'culturelle-b260-minichews', ADULT, 18, 'chewable', SUPPLEMENT, '049100402017', LGG, MINI_FLAGS, ['Culturelle', 'Target'], 'Caution. Digestion-resistant maltodextrin and bare steviol glycosides are the two Limited tokens. Not a 3+ stack. Xylitol and mannitol are Caution and do not stack. Brand facts image and Target A-95046775 agree. UPC 049100402017 check digit OK.'),
  pack('culturelle-b260-fast-melts-30', 'Culturelle Kids Complete Fast Melts (30)', 'Culturelle', 'culturelle-b260-fast-melts', KIDS, 1, 'chewable', SUPPLEMENT, '049100402031', LGG, MELTS_FLAGS, ['Culturelle', 'Target'], 'Caution. Rebaudioside A is the one Limited token. Isomalt is Caution and does not stack. Not a 3+ stack. Brand facts image and Target A-94938844 agree. UPC 049100402031 check digit OK.'),
  pack('culturelle-b260-electrolytes-30', 'Culturelle Kids Probiotics + Electrolytes (30)', 'Culturelle', 'culturelle-b260-electrolytes', KIDS, 1, 'packet', SUPPLEMENT, '049100402048', LGG, ELEC_FLAGS, ['Culturelle', 'Target'], 'Avoid from the 3+ Limited stack, not from a High token. The tokens that counted are polydextrose, natural flavors, tapioca maltodextrin, and rebaudioside A. Brand facts image and Target A-94913544 agree. UPC 049100402048 check digit OK.'),
  pack('culturelle-b260-womens-4in1-30', "Culturelle Women's 4-in-1 Daily Probiotic Capsules (30)", 'Culturelle', 'culturelle-b260-womens-4in1', ADULT, 18, 'capsule', SUPPLEMENT, '049100400594', LGG, W4_FLAGS, ['Culturelle', 'Target'], 'Avoid from titanium dioxide and unnamed caramel color. Not a 3+ Limited stack. Fructooligosaccharides are Cleared fiber. Brand facts image and Target A-75001757 agree. UPC 049100400594 check digit OK.'),
  pack('culturelle-b260-metabolism-30', 'Culturelle Metabolism + Weight Management Capsules (30)', 'Culturelle', 'culturelle-b260-metabolism', ADULT, 18, 'capsule', SUPPLEMENT, '049100401836', LGG, MET_FLAGS, ['Culturelle', 'Target'], 'All other ingredients are Cleared, including purple carrot concentrate (color). Clean. Brand facts image and Target A-94270783 agree. UPC 049100401836 check digit OK.'),
  pack('culturelle-b260-lutein-60', 'Culturelle Kids Complete + Lutein Gummies (60)', 'Culturelle', 'culturelle-b260-lutein', KIDS, 1, 'gummy', SUPPLEMENT, '049100401485', LGG, LUT_FLAGS, ['Culturelle', 'Target', 'Walmart'], 'Caution. Natural flavors is the one Limited token. Not a 3+ stack. Glucose syrup and organic corn starch are Cleared. Fractionated coconut oil is the coconut exception, so the gummy oil rule did not set Avoid. Brand facts image, Target A-84761324, and Walmart 926404046 agree. UPC 049100401485 check digit OK.'),
  pack('culturelle-b260-kids-immune-30', 'Culturelle Kids Immune Defense Chewables (30)', 'Culturelle', 'culturelle-b260-kids-immune', KIDS, 1, 'chewable', SUPPLEMENT, '049100401201', LGG, KIMM_FLAGS, ['Culturelle', 'Target', 'Walmart'], 'Caution. Stevia leaf extract is the one Limited token. Natural flavor (singular) is Caution and does not stack. Not a 3+ stack. Brand facts image, Target A-80348552, and Walmart 919654704 agree. UPC 049100401201 check digit OK.'),
  pack('culturelle-b260-immune-defense-28', 'Culturelle Immune Defense Chewables (28)', 'Culturelle', 'culturelle-b260-immune-defense', ADULT, 18, 'chewable', SUPPLEMENT, '049100401225', LGG, IMM_FLAGS, ['Culturelle', 'Walmart'], 'Caution. Stevia leaf extract is the one Limited token. Not a 3+ stack. Brand facts image and Walmart 511182576 agree. UPC 049100401225 is the brand sku and the check digit passes.'),
  pack('culturelle-b260-adult-gummies-52', 'Culturelle Probiotic + Prebiotic Gummies (52)', 'Culturelle', 'culturelle-b260-adult-gummies', ADULT, 18, 'gummy', SUPPLEMENT, '049100400921', LGG, ADG_FLAGS, ['Culturelle', 'Target'], 'Caution. Natural flavors is the one Limited token. Not a 3+ stack. Fractionated coconut oil is the coconut exception. Brand facts image and Target A-76758797 agree. UPC 049100400921 check digit OK.'),
  pack('culturelle-b260-purely-packets-30', 'Culturelle Kids Purely Probiotic Packets (30)', 'Culturelle', 'culturelle-b260-purely-packets', KIDS, 1, 'packet', SUPPLEMENT, '049100400082', LGG, PKT_FLAGS, ['Culturelle', 'Target'], 'Caution. Mannitol is a sugar alcohol and does not stack. Inulin is Cleared. Not a 3+ stack. Brand facts image and Target A-13921277 agree. UPC 049100400082 check digit OK. The 50-count CVS line is a different formula and is not this row.'),
  pack('culturelle-b260-womens-wellness-30', "Culturelle Women's Wellness Chewables (30)", 'Culturelle', 'culturelle-b260-womens-wellness', ADULT, 18, 'chewable', SUPPLEMENT, '049100401492', LGG, WW_FLAGS, ['Culturelle', 'CVS', 'Walmart'], 'Caution. Natural flavors and stevia leaf extract are the two Limited tokens. Not a 3+ stack. Brand facts image and CVS prodid-323004 agree. Walmart 1529515592 is Add to cart and did not print a line. UPC 049100401492 check digit OK.'),
  pack('culturelle-b260-health-wellness-50', 'Culturelle Health & Wellness Capsules (50)', 'Culturelle', 'culturelle-b260-health-wellness', ADULT, 18, 'capsule', SUPPLEMENT, '049100400433', LGG, HW50_FLAGS, ['Culturelle', 'Walmart'], 'Avoid from titanium dioxide. Not a 3+ Limited stack. Same panel as the written 30. Brand facts image and Walmart 843792750 agree. That page also shows an Out of stock line beside Add to cart. UPC 049100400433 check digit OK.'),
  pack('culturelle-b260-purely-chew-30', 'Culturelle Kids Purely Probiotic Chewables (30)', 'Culturelle', 'culturelle-b260-purely-chew', KIDS, 1, 'chewable', SUPPLEMENT, '049100400426', LGG, PURE_FLAGS, ['Culturelle', 'Target'], 'Caution. Natural flavors is the one Limited token. Not a 3+ stack. Brand facts image and Target A-51611897 agree on this line. The row uses Target UPC 049100400426 (check digit OK). Brand sku 049100400150 also passes the check digit and is the conflicting code. CVS prodid-883971 adds Sugar Alcohol and that token is not on this row.'),
  pack('align-b260-extra-strength-21', 'Align Extra Strength Probiotic Capsules (21)', 'Align', 'align-b260-extra-strength', ADULT, 18, 'capsule', SUPPLEMENT, '037000505051', [{ name: 'Bifidobacterium 35624', strength: 'not graded' }], AX_FLAGS, ['Align', 'Target'], 'Avoid from titanium dioxide. Not a 3+ Limited stack. Brand facts image and Target A-52491311 agree. UPC 037000505051 is the facts-image code and the check digit passes. Dropdown sku 037000293101 also passes the check digit and is the conflicting code. Target did not print a UPC.'),
  pack('align-b260-womens-dual-28', "Align Women's Dual Action Capsules (28)", 'Align', 'align-b260-womens-dual', ADULT, 18, 'capsule', SUPPLEMENT, '030772032565', [{ name: 'Bifidobacterium 35624', strength: 'not graded' }], AWD_FLAGS, ['Align', 'Target'], 'Caution. Maltodextrin is the one Limited token. Silicon dioxide is the zero-point cap and does not stack. Not a 3+ stack. Brand facts image and Target A-84799482 agree. UPC 030772032565 check digit OK.'),
  pack('align-b260-bloating-caps-28', 'Align Bloating Relief Capsules (28)', 'Align', 'align-b260-bloating-caps', ADULT, 18, 'capsule', SUPPLEMENT, '030772086773', [{ name: 'Bifidobacterium 35624', strength: 'not graded' }], ABC_FLAGS, ['Align', 'Walmart', 'Target'], 'Caution. Maltodextrin is the one Limited token. Silicon dioxide does not stack. Not a 3+ stack. Brand facts image, Walmart 1746780027, and Target A-93227244 agree. UPC 030772086773 check digit OK.'),
  pack('align-b260-3in1-gummies-50', 'Align 3-in-1 Biotic Gummies (50)', 'Align', 'align-b260-3in1-gummies', ADULT, 18, 'gummy', SUPPLEMENT, '030772191316', [{ name: 'Bifidobacterium 35624', strength: 'not graded' }], A31_FLAGS, ['Align', 'Target'], 'Caution. Natural flavors and MCT oil in the gummy are the two Limited tokens. Not a 3+ stack. Huito juice is the juice lock, not huito extract. Brand facts image and Target A-94982165 agree. UPC 030772191316 check digit OK. The 11-digit brand sku was not padded.'),
  pack('align-b260-dualbiotic-60', 'Align DualBiotic Gummies (60)', 'Align', 'align-b260-dualbiotic', ADULT, 18, 'gummy', SUPPLEMENT, '037000779377', [{ name: 'Bifidobacterium 35624', strength: 'not graded' }], ADB_FLAGS, ['Align', 'Target', 'Walmart'], 'Caution. Natural flavors is the one Limited token. Annatto is Caution and does not stack. Not a 3+ stack. Brand facts image and Target A-75557336 agree. Walmart 581445245 shows the same line and both Add to cart and Not available text. UPC 037000779377 check digit OK.'),
  pack('align-b260-bloating-gummies-60', 'Align Bloating Relief Gummies (60)', 'Align', 'align-b260-bloating-gummies', ADULT, 18, 'gummy', SUPPLEMENT, '030772132562', [{ name: 'Bifidobacterium 35624', strength: 'not graded' }], ABG_FLAGS, ['Align', 'Target'], 'Caution. Natural flavors and MCT oil in the gummy are the two Limited tokens. Corn syrup and sugar are Caution and do not stack. Not a 3+ stack. Brand facts image and Target A-89650897 agree. UPC 030772132562 check digit OK. The 14-digit brand code was not used.'),
  pack('align-b260-70-billion-30', 'Align 70 Billion CFU Capsules (30)', 'Align', 'align-b260-70-billion', ADULT, 18, 'capsule', SUPPLEMENT, '030772198681', [{ name: 'Probiotic blend', strength: '70 billion CFU' }], A70_FLAGS, ['Align', 'Target'], 'Avoid from titanium dioxide. Maltodextrin is the only Limited token, so this is not a 3+ stack. Brand facts image and Target A-95234558 agree. UPC 030772198681 check digit OK. The 11-digit brand sku was not padded.'),
  pack('align-b260-stress-21', 'Align Gut Health & Stress Capsules (21)', 'Align', 'align-b260-stress', ADULT, 18, 'capsule', SUPPLEMENT, '037000598558', [{ name: 'Bifidobacterium 35624', strength: 'not graded' }], AST_FLAGS, ['Align', 'Target'], 'Avoid from Blue 1. Maltodextrin is the only Limited token, so this is not a 3+ stack. Ashwagandha on the label is an active and is not graded. Brand facts image and Target De-Stress A-81875293 agree. UPC 037000598558 check digit OK.'),
  pack('phillips-b260-caplets-55', "Phillips' Laxative Caplets (55)", "Phillips'", 'phillips-b260-caplets', ADULT, 18, 'tablet', OTC, '312843520820', [{ name: 'Magnesium oxide', strength: 'active laxative, not graded' }], CAP_FLAGS, ['Target', 'Walmart', 'Walgreens'], 'Avoid from talc and titanium dioxide. Polyethylene glycol is the only Limited token, so this is not a 3+ stack. Magnesium oxide is the active and is not graded. Target A-82778933, Walmart 10316191, and Walgreens prod6143224 agree. UPC 312843520820 check digit OK. The Walgreens 11-digit code was not padded.'),
  pack('phillips-b260-colon-health-30', "Phillips' Colon Health Probiotic Capsules (30)", "Phillips'", 'phillips-b260-colon-health-lgg', ADULT, 18, 'capsule', SUPPLEMENT, '312843534308', BB, CH_FLAGS, ['Walmart', 'Walgreens'], 'Caution. Maltodextrin is the one Limited token. Not a 3+ stack. This is the in-stock LGG + BB-12 formula. Walmart 130784792 and Walgreens prod4177530 agree. UPC 312843534308 is the box barcode and the check digit passes. The gasseri / potato-starch panel is the older formula and is not this row. The Walgreens 11-digit code was not padded.'),
];

const ROWS = BATCH260_KYR6D_T22U;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 24) throw new Error(`batch260 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch260 duplicate id');
const codes = ROWS.map((record) => record.barcode).filter((code): code is string => Boolean(code));
if (new Set(codes).size !== codes.length) throw new Error('batch260 duplicate upc');

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch260 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (record.verdict !== rollup.verdict) {
    throw new Error(`batch260 verdict ${record.id}: wrote ${record.verdict}, expected ${rollup.verdict}`);
  }
  const expectedNote = withNotes(record.inactiveIngredients, record.form);
  if ((record.honestNote ?? '') !== (expectedNote ?? '')) {
    throw new Error(`batch260 note ${record.id}`);
  }
  if (record.honestNote && rollup.cause !== 'limited_stack' && !contradictionHonestNote(record)) {
    throw new Error(`batch260 unexpected note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch260 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why)) throw new Error(`batch260 pending ${ingredient.name}`);
  }
}
