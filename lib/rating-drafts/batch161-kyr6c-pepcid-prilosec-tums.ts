// DRAFT / not verified / batch 161 KYR6-c Pepcid, Prilosec, Tums.
// US branded OTC only. Counted packs whose panel was read and whose
// same count was for sale on a page that opened. No Canada. No EU.
// No store brand. No bonus box, 2-pack, or kit.
//
// Not written, and not a hunt: Wildberry 14, the strawberry sleep gummies,
// and the Tums Ultra / Extra / Regular tablet lines. Those packs are not
// rows in this file. The Oct 14 lock grades their tokens. This pass does
// not add a product.
//
// TALLY: 22 written — Clean 0 / Caution 2 / Avoid 20.
// Pepcid 15 (Avoid 14 / Caution 1). Prilosec 3 (Avoid 3). Tums 4 (Avoid 3 / Caution 1).
// NEW 15 / REUSE 7. Written-row ungraded tokens: 0.
// UPC attached 21 / empty 1. Smoothies 12 is 307660740605. Smoothies 140 is 307667399646.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const DIGESTIVE = 'Digestive';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution). Not the Avoid driver.',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose, HPMC family).',
  hpmc: 'Methodology §5 Cleared (hypromellose). Hypromellose 2910 is this USP type.',
  stearate: 'Methodology §5 Cleared (magnesium stearate).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  iron: 'Methodology §5 Caution (iron oxide as color). Not a synthetic dye. Not the Avoid driver.',
  talc: 'Methodology §5 High (talc). Avoid.',
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  dye: 'Methodology §5 High (synthetic FD&C / D&C dye, including the lake form). Avoid.',
  flavors: 'Methodology §5 Caution (bare flavors). Exact “Natural flavors” stays Limited. Not the Avoid driver.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  acetate: 'Methodology §5 Caution (cellulose acetate). Not cellulose, MCC, HPC, or hypromellose. Not the Avoid driver.',
  cornStarch: 'Methodology §5 Cleared (corn starch).',
  crospovidone: 'Methodology §5 Cleared (crospovidone, povidone family).',
  dextrose: 'Methodology §5 Caution (dextrose and dextrose excipient → bare glucose). Not glucose syrup. Not the Avoid driver.',
  gum: 'Methodology §5 Cleared (gum arabic / acacia).',
  lactose: 'Methodology §5 Cleared (lactose monohydrate → lactose).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin). Not the Avoid driver.',
  mineral: 'Methodology §5 Caution (oral mineral oil / paraffin). Not the topical ointment row. Not the Avoid driver.',
  modStarch: 'Methodology §5 Limited (modified starch). Not plain corn starch. Not the Avoid driver.',
  sucrose: 'Methodology §5 Limited (sucrose, sugar). Not the Avoid driver.',
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup). Not corn syrup.',
  water: 'Methodology §5 Cleared (water).',
  naturalFlavor: 'Methodology §5 Caution (natural flavor). Not the Avoid driver.',
  pectin: 'Methodology §5 Cleared (pectin).',
  citric: 'Methodology §5 Cleared (citric acid).',
  citrate: 'Methodology §5 Cleared (sodium citrate).',
  annatto: 'Methodology §5 Caution (annatto). Color added (annatto) is this color. Not Avoid.',
  gms: 'Methodology §5 Cleared (glyceryl monostearate).',
  pvp: 'Methodology §5 Cleared (polyvinylpyrrolidone → povidone).',
  ssf: 'Methodology §5 Cleared (sodium stearyl fumarate, stearate family).',
  starch: 'Methodology §5 Cleared (bare starch as filler). Not unspecified starch.',
  meth: 'Methodology §5 Caution (methacrylic acid copolymer). Not plain hypromellose. Not the Avoid driver.',
  tec: 'Methodology §5 Cleared (triethyl citrate).',
  mica: 'Methodology §5 Caution (mica). Not the Avoid driver.',
  saccharin: 'Methodology §5 Moderate (saccharin sodium → sodium saccharin). Not Avoid.',
  carmine: 'Methodology §5 Caution (carmine / cochineal). Not Avoid.',
  caStearate: 'Methodology §5 Cleared (calcium stearate, stearate family).',
  adipic: 'Methodology §5 Cleared (adipic acid).',
  guar: 'Methodology §5 Cleared (guar gum).',
  sorbitol: 'Methodology §5 Limited (oral sorbitol). Not the Avoid driver.',
  beeswax: 'Methodology §5 Cleared (beeswax).',
  coconut: 'Methodology §5 High (coconut oil in a gummy or chew). Avoid.',
  vegOil: 'Methodology §5 High (vegetable oil in a gummy or chew). Avoid.',
  cornSyrup: 'Methodology §5 Caution (corn syrup). Not glucose syrup. Not the Avoid driver.',
  dextrin: 'Methodology §5 Caution (bare dextrin). Not tapioca dextrin. Not the Avoid driver.',
  paraben: 'Methodology §5 High (paraben). Avoid.',
  namedFlavors: 'Methodology §5 Limited (natural and artificial flavors). Not the Avoid driver.',
  ink: 'Methodology §5 Caution (pharmaceutical ink). Not the Avoid driver.',
  phosphoric: 'Methodology §5 Caution (phosphoric acid). Not a phosphate salt. Not the Avoid driver.',
  pg: 'Methodology §5 Moderate (propylene glycol, swallowed). Not the Avoid driver.',
  shellac: 'Methodology §5 Cleared (shellac).',
  benzoate: 'Methodology §5 Limited (sodium benzoate). Not the Avoid driver.',
  sorbic: 'Methodology §5 Limited (sorbic acid, preservative family). Not the Avoid driver.',
  lecithin: 'Methodology §5 Cleared (soy lecithin).',
  triacetin: 'Methodology §5 Cleared (triacetin).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ALTS: CleanAlternative[] = [
  alt('phillips-mom-original', 'Independently Clean liquid antacid already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-acidcalm', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

const ORIG = 'Cub 30-count ingredients and DailyMed setid 54f4086f-e443-4e7e-8c7e-94e152e1c256';
const MAX = 'Target Maximum Strength drug facts (25, 50, and 75) and Instacart Walgreens 8-count ingredients';
const ICY = 'Target Icy Cool Mint drug facts';
const BERRY25 = 'Target TCIN 14777658 berry 25-count drug facts';
const BERRY50 = 'Target TCIN 14786915 berry 50-count drug facts';
const BERRY70 = 'Target TCIN 95249122 berry 70-count drug facts';
const MINT25 = 'Cub mint 25-count ingredients';
const MINT50 = 'Target TCIN 51911452 mint 50-count drug facts';
const MINT70 = 'Target TCIN 1009425878 cool mint 70-count drug facts';
const STRESS = 'Target TCIN 93486484 peach-raspberry 32-count other ingredients';
const PRI = 'Target Prilosec OTC 14-count and 42-count drug facts';
const WILD = 'Target TCIN 14165446 wildberry 42-count drug facts';
const NAT = 'Target TCIN 80326509 black cherry and watermelon 190-count drug facts';
const SMOOTH = 'Target Smoothies assorted fruit 12-count and 140-count drug facts';
const CHEW = 'Target TCIN 94936251 tropical fruit smoothie 32-count drug facts';

function originalLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Carnauba wax', 'cleared', METH.carnauba),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Pregelatinized starch', 'cleared', METH.pregel),
    flag(panel, 'Red iron oxide', 'limited', METH.iron),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
  ];
}

function maxLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Carnauba wax', 'cleared', METH.carnauba),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Pregelatinized starch', 'cleared', METH.pregel),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
  ];
}

function icyLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Carnauba wax', 'cleared', METH.carnauba),
    flag(panel, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Hypromellose 2910', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Polyethylene glycol', 'moderate', METH.peg),
    flag(panel, 'Polysorbate 80', 'moderate', METH.ps80),
    flag(panel, 'Pregelatinized starch', 'cleared', METH.pregel),
    flag(panel, 'Sucralose', 'moderate', METH.sucralose),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
  ];
}

function berry25(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose acetate', 'limited', METH.acetate),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'Crospovidone', 'cleared', METH.crospovidone),
    flag(panel, 'D&C Red No. 7 calcium lake', 'high', METH.dye),
    flag(panel, 'Dextrose excipient', 'limited', METH.dextrose),
    flag(panel, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 40 aluminum lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Gum arabic', 'cleared', METH.gum),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Lactose monohydrate', 'cleared', METH.lactose),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Maltodextrin', 'limited', METH.maltodextrin),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Modified starch', 'limited', METH.modStarch),
    flag(panel, 'Sucralose', 'moderate', METH.sucralose),
  ];
}

function berry50(panel: string): IngredientFlag[] {
  return berry25(panel).filter((item) => item.name !== 'Modified starch');
}

function berry70(panel: string): IngredientFlag[] {
  return berry25(panel).map((item) =>
    item.name === 'Mineral oil'
      ? flag(panel, 'Mineral oil*', 'limited', `${METH.mineral} The panel prints an asterisk and the footnote “May Contain Mineral Oil.”`)
      : item,
  );
}

function mint25(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose acetate', 'limited', METH.acetate),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'Crospovidone', 'cleared', METH.crospovidone),
    flag(panel, 'D&C Yellow No. 10 aluminum lake', 'high', METH.dye),
    flag(panel, 'Dextrose excipient', 'limited', METH.dextrose),
    flag(panel, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Gum arabic', 'cleared', METH.gum),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Lactose monohydrate', 'cleared', METH.lactose),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Maltodextrin', 'limited', METH.maltodextrin),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sucralose', 'moderate', METH.sucralose),
  ];
}

function mint50(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Cellulose acetate', 'limited', METH.acetate),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'Crospovidone', 'cleared', METH.crospovidone),
    flag(panel, 'Dextrose excipient', 'limited', METH.dextrose),
    flag(panel, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Gum arabic', 'cleared', METH.gum),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Lactose monohydrate', 'cleared', METH.lactose),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Maltodextrin', 'limited', METH.maltodextrin),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sucralose', 'moderate', METH.sucralose),
    flag(panel, 'Yellow iron oxide', 'limited', METH.iron),
  ];
}

function mint70(panel: string): IngredientFlag[] {
  return mint50(panel).map((item) =>
    item.name === 'Mineral oil'
      ? flag(panel, 'Mineral oil*', 'limited', `${METH.mineral} The panel prints an asterisk and the footnote “May Contain Mineral Oil.”`)
      : item,
  );
}

function stressLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Glucose syrup', 'cleared', METH.glucoseSyrup),
    flag(panel, 'Sucrose', 'limited', METH.sucrose),
    flag(panel, 'Water', 'cleared', METH.water),
    flag(panel, 'Natural flavor', 'limited', METH.naturalFlavor),
    flag(panel, 'Pectin', 'cleared', METH.pectin),
    flag(panel, 'Citric acid', 'cleared', METH.citric),
    flag(panel, 'White mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium citrate', 'cleared', METH.citrate),
    flag(panel, 'Color added (annatto)', 'limited', METH.annatto),
    flag(panel, 'Carnauba wax', 'cleared', METH.carnauba),
  ];
}

function prilosecLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Glyceryl monostearate', 'cleared', METH.gms),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Iron oxide', 'limited', METH.iron),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Methacrylic acid copolymer', 'limited', METH.meth),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Paraffin', 'limited', METH.mineral),
    flag(panel, 'Polyethylene glycol 6000', 'moderate', METH.peg),
    flag(panel, 'Polysorbate 80', 'moderate', METH.ps80),
    flag(panel, 'Polyvinylpyrrolidone', 'cleared', METH.pvp),
    flag(panel, 'Sodium stearyl fumarate', 'cleared', METH.ssf),
    flag(panel, 'Starch', 'cleared', METH.starch),
    flag(panel, 'Sucrose', 'limited', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
    flag(panel, 'Triethyl citrate', 'cleared', METH.tec),
  ];
}

function wildLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'FD&C Blue 2 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Red 40 aluminum lake', 'high', METH.dye),
    flag(panel, 'Flavor', 'limited', METH.flavors),
    flag(panel, 'Glyceryl monostearate', 'cleared', METH.gms),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Methacrylic acid copolymer', 'limited', METH.meth),
    flag(panel, 'Mica', 'limited', METH.mica),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Polyethylene glycol 6000', 'moderate', METH.peg),
    flag(panel, 'Polysorbate 80', 'moderate', METH.ps80),
    flag(panel, 'Polyvinylpyrrolidone', 'cleared', METH.pvp),
    flag(panel, 'Saccharin sodium', 'moderate', METH.saccharin),
    flag(panel, 'Sodium stearyl fumarate', 'cleared', METH.ssf),
    flag(panel, 'Starch', 'cleared', METH.starch),
    flag(panel, 'Sucrose', 'limited', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
    flag(panel, 'Triethyl citrate', 'cleared', METH.tec),
  ];
}

function naturalsLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Calcium stearate', 'cleared', METH.caStearate),
    flag(panel, 'Carmine', 'limited', METH.carmine),
    flag(panel, 'Dextrose', 'limited', METH.dextrose),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Gum arabic', 'cleared', METH.gum),
  ];
}

function smoothiesLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Acacia', 'cleared', METH.gum),
    flag(panel, 'Adipic acid', 'cleared', METH.adipic),
    flag(panel, 'Calcium stearate', 'cleared', METH.caStearate),
    flag(panel, 'Dextrose', 'limited', METH.dextrose),
    flag(panel, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 40 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 5 aluminum lake (tartrazine)', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Guar gum', 'cleared', METH.guar),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Sorbitol', 'limited', METH.sorbitol),
  ];
}

function chewyLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Acacia', 'cleared', METH.gum),
    flag(panel, 'Beeswax', 'cleared', METH.beeswax),
    flag(panel, 'Carnauba wax', 'cleared', METH.carnauba),
    flag(panel, 'Citric acid', 'cleared', METH.citric),
    flag(panel, 'Coconut oil', 'high', METH.coconut),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'Corn syrup', 'limited', METH.cornSyrup),
    flag(panel, 'Dextrin', 'limited', METH.dextrin),
    flag(panel, 'FD&C Red No. 40', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 40 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 5 aluminum lake (tartrazine)', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 6', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dye),
    flag(panel, 'Maltodextrin', 'limited', METH.maltodextrin),
    flag(panel, 'Methylparaben', 'high', METH.paraben),
    flag(panel, 'Natural and artificial flavors', 'limited', METH.namedFlavors),
    flag(panel, 'Pharmaceutical ink', 'limited', METH.ink),
    flag(panel, 'Phosphoric acid', 'limited', METH.phosphoric),
    flag(panel, 'Propylene glycol', 'moderate', METH.pg),
    flag(panel, 'Propylparaben', 'high', METH.paraben),
    flag(panel, 'Shellac', 'cleared', METH.shellac),
    flag(panel, 'Sodium benzoate', 'limited', METH.benzoate),
    flag(panel, 'Sorbic acid', 'limited', METH.sorbic),
    flag(panel, 'Sorbitol', 'limited', METH.sorbitol),
    flag(panel, 'Soy lecithin', 'cleared', METH.lecithin),
    flag(panel, 'Sucrose', 'limited', METH.sucrose),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
    flag(panel, 'Triacetin', 'cleared', METH.triacetin),
    flag(panel, 'Vegetable oil', 'high', METH.vegOil),
  ];
}

const FAM10 = [{ name: 'Famotidine', strength: '10 mg' }];
const FAM20 = [{ name: 'Famotidine', strength: '20 mg' }];
const COMPLETE = [
  { name: 'Famotidine', strength: '10 mg' },
  { name: 'Calcium carbonate', strength: '800 mg' },
  { name: 'Magnesium hydroxide', strength: '165 mg' },
];
const OME = [{ name: 'Omeprazole magnesium', strength: '20.6 mg (equivalent to omeprazole 20 mg)' }];
const CA1000 = [{ name: 'Calcium carbonate', strength: '1000 mg' }];
const CA750 = [{ name: 'Calcium carbonate', strength: '750 mg' }];
const STRESS_ACTIVES = [
  { name: 'Calcium', strength: '500 mg' },
  { name: 'Lemon balm extract (aerial parts)', strength: '40 mg' },
];

function row(partial: Omit<RatingRecord, 'category' | 'audience' | 'recordStatus' | 'retailers' | 'cleanAlternatives'>): RatingRecord {
  return {
    category: DIGESTIVE,
    audience: ADULT,
    recordStatus: UNVERIFIED,
    retailers: [...RETAILERS],
    cleanAlternatives: ALTS,
    ...partial,
  };
}

export const BATCH161_KYR6C_PEPCID_PRILOSEC_TUMS: RatingRecord[] = [
  row({
    id: 'pepcid-b161-original-30',
    productName: 'Pepcid AC Original Strength (30 film-coated tablets)',
    brand: 'Pepcid',
    barcode: '716837872306',
    formulaId: 'pepcid-b161-original',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM10,
    inactiveIngredients: originalLine(ORIG),
    verdict: 'avoid',
    sourcesGeneral: [
      'Cub opened Pepcid AC Original Strength Heartburn Medicine, 10mg Famotidine, 30 ct, in stock at $15.49. UPC on that page: 716837872306. Inactive ingredients: carnauba wax, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, pregelatinized starch, red iron oxide, talc, titanium dioxide. The brand original-strength page prints the same inactive line and the 30 Count UPC field 716837872306. DailyMed setid 54f4086f-e443-4e7e-8c7e-94e152e1c256 prints the same inactive line. Package NDC 16837-872-20 is 30 tablets. Adults and children 12 years and over.',
    ],
  }),
  row({
    id: 'pepcid-b161-original-90',
    productName: 'Pepcid AC Original Strength (90 film-coated tablets)',
    brand: 'Pepcid',
    barcode: '716837872900',
    formulaId: 'pepcid-b161-original',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM10,
    inactiveIngredients: originalLine(ORIG),
    verdict: 'avoid',
    sourcesGeneral: [
      'Same original-strength inactive line as the 30-count. DailyMed setid 54f4086f-e443-4e7e-8c7e-94e152e1c256 package NDC 16837-872-90 is 90 tablets in a bottle, with a start date and no marketing end date on that package. myOTCstore opened Pepcid AC Acid Reducer Original Strength Famotidine 10mg Tablets 90Ea in stock at $24.73, with Add to cart. That page’s UPC field is 716837872900. The brand 30 Count UPC field 716837872306 was not copied onto this 90-count. A 90-count image filename on the brand page sits next to the 30 Count record and was not used as this barcode.',
    ],
  }),
  row({
    id: 'pepcid-b161-max-8',
    productName: 'Pepcid AC Maximum Strength (8 film-coated tablets)',
    brand: 'Pepcid',
    formulaId: 'pepcid-b161-max',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM20,
    inactiveIngredients: maxLine(MAX),
    verdict: 'avoid',
    sourcesGeneral: [
      'Instacart Walgreens opened Pepcid AC Maximum Strength Heartburn Medicine, 20 mg Famotidine, 8 ct, in stock at $8.99. Inactive ingredients on that page: carnauba wax, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, pregelatinized starch, talc, titanium dioxide. No barcode was printed. The 25, 50, and 75 codes were not copied onto this 8-count.',
    ],
  }),
  row({
    id: 'pepcid-b161-max-25',
    productName: 'Pepcid AC Maximum Strength (25 film-coated tablets)',
    brand: 'Pepcid',
    barcode: '716837855255',
    formulaId: 'pepcid-b161-max',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM20,
    inactiveIngredients: maxLine(MAX),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 14013777 opened Pepcid AC Maximum Strength Heartburn Prevention & Relief Tablets, 25 ct, with Add to cart. Active: famotidine 20 mg. Inactive ingredients match the 8-count line. Primary barcode 716837855255. Adults and children 12 years and over.',
    ],
  }),
  row({
    id: 'pepcid-b161-max-50',
    productName: 'Pepcid AC Maximum Strength (50 film-coated tablets)',
    brand: 'Pepcid',
    barcode: '716837855507',
    formulaId: 'pepcid-b161-max',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM20,
    inactiveIngredients: maxLine(MAX),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 17210308 opened Pepcid AC Acid Reducers Maximum Strength, 50 ct, with Add to cart. Inactive ingredients match the 25-count line. Primary barcode 716837855507.',
    ],
  }),
  row({
    id: 'pepcid-b161-max-75',
    productName: 'Pepcid AC Maximum Strength (75 film-coated tablets)',
    brand: 'Pepcid',
    barcode: '716837855781',
    formulaId: 'pepcid-b161-max',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM20,
    inactiveIngredients: maxLine(MAX),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 81874954 opened Pepcid AC Digestive Treatment Tablet, 75 ct, with Add to cart. Inactive ingredients match the 25-count line. Primary barcode 716837855781.',
    ],
  }),
  row({
    id: 'pepcid-b161-icy-20',
    productName: 'Pepcid AC Maximum Strength Icy Cool Mint (20 film-coated tablets)',
    brand: 'Pepcid',
    barcode: '716837879206',
    formulaId: 'pepcid-b161-icy',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM20,
    inactiveIngredients: icyLine(ICY),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 89678417 opened Pepcid AC Max Strength Icy Cool Mint, 20 ct, with Add to cart. Active: famotidine 20 mg. Inactive ingredients: carnauba wax, FD&C blue no. 1 aluminum lake, flavors, hypromellose 2910, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, pregelatinized starch, sucralose, talc, titanium dioxide. Primary barcode 716837879206. The 40-count code 716837879404 was not copied onto this 20-count. The brand page drops a comma between the blue lake and flavors; this row uses the comma version printed on the Target drug facts.',
    ],
  }),
  row({
    id: 'pepcid-b161-icy-40',
    productName: 'Pepcid AC Maximum Strength Icy Cool Mint (40 film-coated tablets)',
    brand: 'Pepcid',
    barcode: '716837879404',
    formulaId: 'pepcid-b161-icy',
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: FAM20,
    inactiveIngredients: icyLine(ICY),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 89678418 opened Pepcid AC Max Strength Icy Cool Mint, 40 ct, with Add to cart. Inactive ingredients match the 20-count line. Primary barcode 716837879404. UPC printed on the page: 716837879404.',
    ],
  }),
  row({
    id: 'pepcid-b161-complete-berry-25',
    productName: 'Pepcid Complete Berry (25 chewable tablets)',
    brand: 'Pepcid',
    barcode: '716837291251',
    formulaId: 'pepcid-b161-complete-berry25',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: COMPLETE,
    inactiveIngredients: berry25(BERRY25),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 14777658 opened Pepcid AC Complete Dual Action Chewable Tablets, Berry Flavor, 25 ct, with Add to cart. Actives: famotidine 10 mg, calcium carbonate 800 mg, magnesium hydroxide 165 mg. Inactive ingredients include modified starch and mineral oil with no may-contain footnote. Primary barcode 716837291251. Adults and children 12 years and over. Chew completely.',
    ],
  }),
  row({
    id: 'pepcid-b161-complete-berry-50',
    productName: 'Pepcid Complete Berry (50 chewable tablets)',
    brand: 'Pepcid',
    barcode: '716837291503',
    formulaId: 'pepcid-b161-complete-berry50',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: COMPLETE,
    inactiveIngredients: berry50(BERRY50),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 14786915 opened Pepcid AC Complete Dual Action Chewable Tablets, Berry Flavor, 50 ct, with Add to cart. Inactive ingredients match the 25-count berry line except modified starch is not on this panel. Mineral oil has no may-contain footnote. Primary barcode 716837291503.',
    ],
  }),
  row({
    id: 'pepcid-b161-complete-berry-70',
    productName: 'Pepcid Complete Berry (70 chewable tablets)',
    brand: 'Pepcid',
    barcode: '716837291725',
    formulaId: 'pepcid-b161-complete-berry70',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: COMPLETE,
    inactiveIngredients: berry70(BERRY70),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 95249122 opened Pepcid Complete berry chews, 70 ct, with Add to cart. Inactive ingredients include modified starch. Mineral oil is printed with an asterisk and the footnote “May Contain Mineral Oil.” That is a different line from the 25-count and the 50-count. Primary barcode 716837291725.',
    ],
  }),
  row({
    id: 'pepcid-b161-complete-mint-25',
    productName: 'Pepcid Complete Mint (25 chewable tablets)',
    brand: 'Pepcid',
    barcode: '716837888253',
    formulaId: 'pepcid-b161-complete-mint25',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: COMPLETE,
    inactiveIngredients: mint25(MINT25),
    verdict: 'avoid',
    sourcesGeneral: [
      'Cub opened Pepcid Complete Acid Reducer + Antacid Famotidine Chews, Mint, 25 ct, in stock at $15.49. UPC on that page: 716837888253. Inactive ingredients: cellulose acetate, corn starch, crospovidone, D&C yellow no. 10 aluminum lake, dextrose excipient, FD&C blue no. 1 aluminum lake, flavors, gum arabic, hydroxypropyl cellulose, hypromellose, lactose monohydrate, magnesium stearate, maltodextrin, mineral oil, sucralose. No yellow iron oxide. Other information begins “each tablet contains: calcium 32,” the same calcium disclosure as the opened Complete panels that print 320 mg calcium. Those panels print famotidine 10 mg, calcium carbonate 800 mg, and magnesium hydroxide 165 mg. Directions: adults and children 12 years and over.',
    ],
  }),
  row({
    id: 'pepcid-b161-complete-mint-50',
    productName: 'Pepcid Complete Mint (50 chewable tablets)',
    brand: 'Pepcid',
    barcode: '716837888505',
    formulaId: 'pepcid-b161-complete-mint50',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: COMPLETE,
    inactiveIngredients: mint50(MINT50),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 51911452 opened Pepcid AC Complete Tablets, Mint, 50 ct, with Add to cart. Actives: famotidine 10 mg, calcium carbonate 800 mg, magnesium hydroxide 165 mg. Inactive ingredients include yellow iron oxide and mineral oil with no may-contain footnote. No D&C yellow no. 10. Primary barcode 716837888505.',
    ],
  }),
  row({
    id: 'pepcid-b161-complete-mint-70',
    productName: 'Pepcid Complete Cool Mint (70 chewable tablets)',
    brand: 'Pepcid',
    barcode: '716837888727',
    formulaId: 'pepcid-b161-complete-mint70',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: COMPLETE,
    inactiveIngredients: mint70(MINT70),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 1009425878 opened Pepcid Complete cool mint chews, 70 ct, with Add to cart. Inactive ingredients match the mint 50-count line except mineral oil is printed with an asterisk and the footnote “May Contain Mineral Oil.” Primary barcode 716837888727.',
    ],
  }),
  row({
    id: 'pepcid-b161-stress-gummy-32',
    productName: 'Pepcid Soothing Gummies Heartburn + Stress Peach Raspberry (32 gummies)',
    brand: 'Pepcid',
    barcode: '716837684329',
    formulaId: 'pepcid-b161-stress-gummy',
    minAge: 12,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: STRESS_ACTIVES,
    inactiveIngredients: stressLine(STRESS),
    verdict: 'caution',
    sourcesGeneral: [
      'Target TCIN 93486484 opened Pepcid Soothing Heartburn Relief + Stress Relief Gummies, Peach Raspberry, 32 ct, with Add to cart. Suggested age 12 years and up. Supplement amounts on that page: calcium 500 mg and lemon balm extract (aerial parts) 40 mg per 2 gummies. Other ingredients: glucose syrup, sucrose, water, natural flavor, pectin, citric acid, white mineral oil, sodium citrate, color added (annatto), carnauba wax. Primary barcode 716837684329. The brand stress page gtin12 is 716837684329 and describes tricalcium phosphate with 40 mg of lemon balm extract. The brand page says these statements have not been evaluated by the Food and Drug Administration. Strawberry sleep gummies are a different panel and are not this row.',
    ],
  }),
  row({
    id: 'prilosec-b161-tablets-14',
    productName: 'Prilosec OTC (14 delayed-release tablets)',
    brand: 'Prilosec',
    barcode: '037000359050',
    formulaId: 'prilosec-b161-tablets',
    minAge: 18,
    form: 'delayed-release tablet',
    productType: OTC,
    activeIngredients: OME,
    inactiveIngredients: prilosecLine(PRI),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 13369415 opened Prilosec OTC 20 mg delayed-release tablets, 14 ct, with Add to cart. Suggested age 18 years and up. Active: omeprazole magnesium delayed-release tablet 20.6 mg, equivalent to 20 mg omeprazole. Inactive ingredients: glyceryl monostearate, hydroxypropyl cellulose, hypromellose, iron oxide, magnesium stearate, methacrylic acid copolymer, microcrystalline cellulose, paraffin, polyethylene glycol 6000, polysorbate 80, polyvinylpyrrolidone, sodium stearyl fumarate, starch, sucrose, talc, titanium dioxide, triethyl citrate. The brand 14 Ct UPC field (psId) is 037000359050. Target also printed primary barcode 030772202876 on this 14-count and on the 42-count. That shared code was not attached. The brand gtin 4987176002228 is not this UPC. The 28-count was not given its own panel read and is not a row.',
    ],
  }),
  row({
    id: 'prilosec-b161-tablets-42',
    productName: 'Prilosec OTC (42 delayed-release tablets)',
    brand: 'Prilosec',
    barcode: '037000359074',
    formulaId: 'prilosec-b161-tablets',
    minAge: 18,
    form: 'delayed-release tablet',
    productType: OTC,
    activeIngredients: OME,
    inactiveIngredients: prilosecLine(PRI),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 10918258 opened Prilosec OTC 20 mg delayed-release tablets, 42 ct, with Add to cart. Inactive ingredients match the 14-count line. The brand 42 Ct UPC field (psId) is 037000359074. Target primary barcode 030772202876 was also on the 14-count and was not attached. The 42 ct tray code 30772242964 was not attached.',
    ],
  }),
  row({
    id: 'prilosec-b161-wildberry-42',
    productName: 'Prilosec OTC Wildberry (42 delayed-release tablets)',
    brand: 'Prilosec',
    barcode: '030772202852',
    formulaId: 'prilosec-b161-wildberry42',
    minAge: 18,
    form: 'delayed-release tablet',
    productType: OTC,
    activeIngredients: OME,
    inactiveIngredients: wildLine(WILD),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 14165446 opened Prilosec OTC Wildberry 20 mg delayed-release tablets, 42 ct, with Add to cart. Active matches the regular tablet. Inactive ingredients: FD&C blue 2 aluminum lake, FD&C red 40 aluminum lake, flavor, glyceryl monostearate, hydroxypropyl cellulose, hypromellose, magnesium stearate, methacrylic acid copolymer, mica, microcrystalline cellulose, polyethylene glycol 6000, polysorbate 80, polyvinylpyrrolidone, saccharin sodium, sodium stearyl fumarate, starch, sucrose, talc, titanium dioxide, triethyl citrate. Primary barcode 030772202852. The brand 42 Ct psId 037000809340 was not the code on this opened page and was not attached. Wildberry 14-count is a different panel and is not this row.',
    ],
  }),
  row({
    id: 'tums-b161-naturals-cherry-watermelon-190',
    productName: 'Tums Naturals Ultra Strength 1000 Black Cherry & Watermelon (190 chewable tablets)',
    brand: 'Tums',
    barcode: '307667250367',
    formulaId: 'tums-b161-naturals-carmine',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: naturalsLine(NAT),
    verdict: 'caution',
    sourcesGeneral: [
      'Target TCIN 80326509 opened Tums Naturals Ultra Strength antacid chewable tablets, Black Cherry & Watermelon, 190 ct, with Add to cart. Active: calcium carbonate 1000 mg. Inactive ingredients: calcium stearate, carmine, dextrose, flavors, gum arabic. Directions: adults and children 12 years of age and over. Primary barcode 307667250367. This line includes carmine. It is not the coconut-pineapple naturals line.',
    ],
  }),
  row({
    id: 'tums-b161-smoothies-assorted-12',
    productName: 'Tums Extra Strength Smoothies Assorted Fruit (12 chewable tablets)',
    brand: 'Tums',
    barcode: '307660740605',
    formulaId: 'tums-b161-smoothies-assorted',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA750,
    inactiveIngredients: smoothiesLine(SMOOTH),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 14779009 opened Tums Extra Strength antacid Smoothies, Assorted Fruit, 12 ct, with Add to cart. Active: calcium carbonate 750 mg. Inactive ingredients: acacia, adipic acid, calcium stearate, dextrose, FD&C blue no. 1 aluminum lake, FD&C red no. 40 aluminum lake, FD&C yellow no. 5 aluminum lake (tartrazine), FD&C yellow no. 6 aluminum lake, flavors, guar gum, microcrystalline cellulose, sorbitol. The page also prints “Contains: Soy,” which is an allergen line and is not an extra inactive. Adults and children 12 years of age and over. The 12-count and 140-count Target pages both embed two size records. The 12-count record (buy URL for TCIN 14779009, 0.07 lb) has primary barcode 307660740605. The 140-count record has 307667399646. Dollar General opened the 12 Count page at the path ending 307660740605. upcitemdb opened 307660740605 as the 12ct. DailyMed setid c22944b8-8733-4689-be0c-f320467f79ea lists the 12-count NDC and does not print this UPC. The brand Smoothies page names a 12-count travel size and does not print a UPC field. CVS returned 403. Amazon’s 12-count page lists GTIN 00307660740605 together with 00307660740650. Walgreens 12 ea (prod1936614) uses GTIN 00307660740650, so that second code was not attached to this row.',
    ],
  }),
  row({
    id: 'tums-b161-smoothies-assorted-140',
    productName: 'Tums Extra Strength Smoothies Assorted Fruit (140 chewable tablets)',
    brand: 'Tums',
    barcode: '307667399646',
    formulaId: 'tums-b161-smoothies-assorted',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA750,
    inactiveIngredients: smoothiesLine(SMOOTH),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 16205593 opened Tums Extra Strength Smoothies, Assorted Fruit, 140 ct, with Add to cart. Inactive ingredients match the 12-count line, including the soy allergen line, which is not an inactive. The 140-count product record on that page (buy URL for TCIN 16205593, 0.7 lb) has primary barcode 307667399646. Walgreens product prod6331822 opened as sizeCount 140.0 ea with GTIN 00307667399646. Barcode Spider opened 307667399646 as Tums Antacid Smoothies Assorted Fruit 140 CT. The 12-count code 307660740605 was not copied onto this 140-count.',
    ],
  }),
  row({
    id: 'tums-b161-chewy-tropical-32',
    productName: 'Tums Chewy Bites Tropical Fruit Smoothie (32 chews)',
    brand: 'Tums',
    barcode: '307661321940',
    formulaId: 'tums-b161-chewy-tropical-32',
    minAge: 12,
    form: 'chew',
    productType: OTC,
    activeIngredients: CA750,
    inactiveIngredients: chewyLine(CHEW),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 94936251 opened Tums Chewy Bites antacid chewables, Tropical Fruit Smoothie, 32 ct, with Add to cart. Active: calcium carbonate USP 750 mg. Inactive ingredients: acacia, beeswax, carnauba wax, citric acid, coconut oil, corn starch, corn syrup, dextrin, FD&C red no. 40, FD&C red no. 40 aluminum lake, FD&C yellow no. 5 aluminum lake (tartrazine), FD&C yellow no. 6, FD&C yellow no. 6 aluminum lake, maltodextrin, methylparaben, natural and artificial flavors, pharmaceutical ink, phosphoric acid, propylene glycol, propylparaben, shellac, sodium benzoate, sorbic acid, sorbitol, soy lecithin, sucrose, titanium dioxide, triacetin, vegetable oil. Primary barcode 307661321940. Adults and children 12 years of age and over.',
    ],
  }),
];

const ROWS = BATCH161_KYR6C_PEPCID_PRILOSEC_TUMS;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function lineKey(record: RatingRecord): string {
  return record.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
}

if (ROWS.length !== 22) throw new Error(`batch161 row count ${ROWS.length}`);
const byBrand = {
  Pepcid: ROWS.filter((item) => item.brand === 'Pepcid').length,
  Prilosec: ROWS.filter((item) => item.brand === 'Prilosec').length,
  Tums: ROWS.filter((item) => item.brand === 'Tums').length,
};
if (byBrand.Pepcid !== 15 || byBrand.Prilosec !== 3 || byBrand.Tums !== 4) {
  throw new Error(`batch161 brand counts ${JSON.stringify(byBrand)}`);
}
const ids = new Set(ROWS.map((item) => item.id));
if (ids.size !== ROWS.length) throw new Error('batch161 duplicate id');
const emptyUpc = ROWS.filter((item) => item.barcode === undefined).map((item) => item.id);
if (emptyUpc.join() !== 'pepcid-b161-max-8') {
  throw new Error(`batch161 empty upc ${emptyUpc.join()}`);
}
const barcodes = ROWS.flatMap((item) => (item.barcode ? [item.barcode] : []));
if (barcodes.length !== 21 || new Set(barcodes).size !== 21) throw new Error('batch161 upc count');
for (const code of barcodes) {
  if (!upcOk(code)) throw new Error(`batch161 bad upc ${code}`);
}
const smooth12 = ROWS.find((item) => item.id === 'tums-b161-smoothies-assorted-12');
const smooth140 = ROWS.find((item) => item.id === 'tums-b161-smoothies-assorted-140');
if (smooth12?.barcode !== '307660740605' || smooth140?.barcode !== '307667399646') {
  throw new Error('batch161 smoothies upc');
}
const blocked = ['030772202876', '307660740650', '037000809340', '037000359067'];
for (const code of blocked) {
  if (barcodes.includes(code)) throw new Error(`batch161 blocked upc ${code}`);
}
for (const record of ROWS) {
  if (record.honestNote) throw new Error(`batch161 note ${record.id}`);
  if (record.inactiveIngredients.length === 0) throw new Error(`batch161 empty panel ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!ingredient.source) throw new Error(`batch161 blank source ${record.id} ${ingredient.name}`);
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch161 blank why ${record.id} ${ingredient.name}`);
  }
  const high = record.inactiveIngredients.some((item) => item.riskLevel === 'high');
  if (high && record.verdict !== 'avoid') throw new Error(`batch161 high verdict ${record.id}`);
  if (!high && record.verdict !== 'caution') throw new Error(`batch161 caution verdict ${record.id}`);
}
const cautionIds = ROWS.filter((item) => item.verdict === 'caution').map((item) => item.id);
if (cautionIds.join() !== 'pepcid-b161-stress-gummy-32,tums-b161-naturals-cherry-watermelon-190') {
  throw new Error(`batch161 caution ids ${cautionIds.join()}`);
}
const shared: Record<string, string> = {};
for (const record of ROWS) {
  const key = record.formulaId ?? '';
  const line = lineKey(record);
  if (shared[key] && shared[key] !== line) throw new Error(`batch161 formula drift ${key}`);
  shared[key] = line;
}
if (Object.keys(shared).length !== 15) throw new Error(`batch161 formulas ${Object.keys(shared).length}`);
const berry25Key = lineKey(ROWS.find((item) => item.id === 'pepcid-b161-complete-berry-25')!);
const berry50Key = lineKey(ROWS.find((item) => item.id === 'pepcid-b161-complete-berry-50')!);
const berry70Key = lineKey(ROWS.find((item) => item.id === 'pepcid-b161-complete-berry-70')!);
if (berry25Key === berry50Key || berry25Key === berry70Key || berry50Key === berry70Key) {
  throw new Error('batch161 berry lines should differ');
}
const mint25Key = lineKey(ROWS.find((item) => item.id === 'pepcid-b161-complete-mint-25')!);
const mint50Key = lineKey(ROWS.find((item) => item.id === 'pepcid-b161-complete-mint-50')!);
const mint70Key = lineKey(ROWS.find((item) => item.id === 'pepcid-b161-complete-mint-70')!);
if (mint25Key === mint50Key || mint50Key === mint70Key || mint25Key === mint70Key) {
  throw new Error('batch161 mint lines should differ');
}
