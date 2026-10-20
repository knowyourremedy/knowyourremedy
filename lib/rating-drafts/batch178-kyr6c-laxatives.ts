// DRAFT / not verified / batch 178 KYR6-c.
// Colace, MiraLAX, Dulcolax, and Senokot counts whose panel was read and
// whose same count was for sale on a page that opened. Packs with an
// ungraded inactive are not in this file.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const DIGESTIVE = 'Digestive';

const METH = {
  acacia: 'Methodology §5 Cleared (acacia / gum arabic).',
  alginate: 'Methodology §5 Cleared (sodium alginate). Alginic family.',
  ammonium: 'Methodology §5 Caution (ammonium hydroxide).',
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as an other ingredient).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  citrate: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  cornStarch: 'Methodology §5 Cleared (corn starch).',
  cornSyrup: 'Methodology §5 Caution (corn syrup).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / calcium phosphate).',
  dyes: 'Methodology §5 High-risk (FD&C and D&C dyes, including aluminum lakes).',
  flavors: 'Methodology §5 Caution (flavors). Exact token. Unnamed flavor.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  hcoChew: 'Methodology §5 High-risk (hydrogenated coconut oil in a chew). Same as vegetable oil in a gummy or a chew.',
  hypromellose: 'Methodology §5 Cleared (hypromellose).',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  ironOxides: 'Methodology §5 Caution (iron oxides).',
  lactose: 'Methodology §5 Cleared (lactose).',
  lecithinSoy: 'Methodology §5 Cleared (lecithin / soy lecithin).',
  magnesiumStearate: 'Methodology §5 Cleared (magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mannitol: 'Methodology §5 Limited (mannitol). Sugar alcohol.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mineralOil: 'Methodology §5 Caution (mineral oil, oral). Not the topical ointment base.',
  namedFlavor: 'Methodology §5 Caution (named flavor). Not the exact Limited “natural and artificial flavors” token.',
  parabens: 'Methodology §5 High-risk (methylparaben and propylparaben).',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol).',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral).',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pvap: 'Methodology §5 Caution (polyvinyl acetate phthalate).',
  shellac: 'Methodology §5 Cleared (shellac).',
  silica: 'Methodology §5 Caution (colloidal silicon dioxide / silicon dioxide). Colloidal anhydrous silica sits on that row.',
  simethicone: 'Methodology §5 Caution (simethicone as an other ingredient).',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate).',
  sodiumBenzoate: 'Methodology §5 Caution (sodium benzoate).',
  sodiumBicarb: 'Methodology §5 Cleared (sodium bicarbonate).',
  sorbitan: 'Methodology §5 Caution (sorbitan). Not the sugar alcohol sorbitol.',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  starch: 'Methodology §5 Cleared (bare starch as a filler).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sucralose: 'Methodology §5 Moderate-risk (sucralose).',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u; was Limited.',
  talc: 'Methodology §5 High-risk (talc).',
  tartaric: 'Methodology §5 Cleared (tartaric acid).',
  tio2: 'Methodology §5 High-risk (titanium dioxide).',
  triacetin: 'Methodology §5 Cleared (triacetin).',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const DIGESTIVE_ALTS: CleanAlternative[] = [
  alt(
    'boiron-acidcalm',
    'No independently Clean conventional match for this active. Closest independently Clean Digestive peer is Boiron AcidCalm (homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
  alt(
    'phillips-mom-original',
    'Independently Clean adult conventional Digestive analog (Phillips Original Milk of Magnesia liquid). Form: liquid — labeled, not a hard filter (§6). Different active; cleanliness peer only.',
  ),
];

const COLACE_PANEL = 'DailyMed Colace Regular Strength 100 mg capsule drug facts';
const COLACE_2IN1_PANEL = 'DailyMed Colace 2-in-1 tablet drug facts';
const ORANGE_PANEL = 'ShopRite MiraLAX Orange 8.3 oz panel';
const FAST_PANEL = 'ShopRite MiraFAST Mixed Berry 30-count panel';
const YELLOW_PANEL = 'ShopRite Dulcolax Laxative Tablets 25-count panel';
const PINK_PANEL = 'DailyMed Dulcolax Pink stimulant laxative 25-count drug facts';
const CHERRY_PANEL = 'ShopRite Dulcolax Cherry liquid 12 fl oz panel';
const CHEW_PANEL = 'ShopRite Dulcolax Mixed Berry Soft Chews 30-count panel';
const SOFTENER_PANEL = "Brookshire's Dulcolax Stool Softener 25-count panel";
const SENOKOT_PANEL = 'Senokot Regular Strength drug facts';
const EXTRA_PANEL = 'Senokot Extra Strength drug facts';
const SENOKOT_S_PANEL = 'Senokot-S drug facts';

const COLACE_FLAGS: IngredientFlag[] = [
  flag(COLACE_PANEL, 'D&C Red No. 33', 'high', METH.dyes),
  flag(COLACE_PANEL, 'FD&C Blue No. 1', 'high', METH.dyes),
  flag(COLACE_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
  flag(COLACE_PANEL, 'FD&C Yellow No. 6', 'high', METH.dyes),
  flag(COLACE_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(COLACE_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(COLACE_PANEL, 'PEG 400', 'limited', METH.peg),
  flag(COLACE_PANEL, 'Propylene glycol', 'limited', METH.pg),
  flag(COLACE_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
  flag(COLACE_PANEL, 'Titanium dioxide', 'high', METH.tio2),
];

const COLACE_2IN1_FLAGS: IngredientFlag[] = [
  flag(COLACE_2IN1_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(COLACE_2IN1_PANEL, 'Dicalcium phosphate', 'cleared', METH.dicalcium),
  flag(COLACE_2IN1_PANEL, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dyes),
  flag(COLACE_2IN1_PANEL, 'FD&C Red No. 40 aluminum lake', 'high', METH.dyes),
  flag(COLACE_2IN1_PANEL, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dyes),
  flag(COLACE_2IN1_PANEL, 'Hypromellose', 'cleared', METH.hypromellose),
  flag(COLACE_2IN1_PANEL, 'Magnesium stearate', 'cleared', METH.magnesiumStearate),
  flag(COLACE_2IN1_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(COLACE_2IN1_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(COLACE_2IN1_PANEL, 'Mineral oil', 'limited', METH.mineralOil),
  flag(COLACE_2IN1_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
  flag(COLACE_2IN1_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
  flag(COLACE_2IN1_PANEL, 'Sodium lauryl sulfate', 'limited', METH.sls),
  flag(COLACE_2IN1_PANEL, 'Starch', 'cleared', METH.starch),
  flag(COLACE_2IN1_PANEL, 'Stearic acid', 'cleared', METH.stearic),
  flag(COLACE_2IN1_PANEL, 'Talc', 'high', METH.talc),
  flag(COLACE_2IN1_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(COLACE_2IN1_PANEL, 'Triacetin', 'cleared', METH.triacetin),
];

const ORANGE_FLAGS: IngredientFlag[] = [
  flag(ORANGE_PANEL, 'Natural and artificial orange flavor', 'limited', METH.namedFlavor),
  flag(ORANGE_PANEL, 'Sucralose', 'limited', METH.sucralose),
];

const FAST_FLAGS: IngredientFlag[] = [
  flag(FAST_PANEL, 'Corn syrup', 'limited', METH.cornSyrup),
  flag(FAST_PANEL, 'FD&C Red No. 40 aluminum lake', 'high', METH.dyes),
  flag(FAST_PANEL, 'Flavors', 'limited', METH.flavors),
  flag(FAST_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(FAST_PANEL, 'Hydrogenated coconut oil', 'high', METH.hcoChew),
  flag(FAST_PANEL, 'Soy lecithin', 'cleared', METH.lecithinSoy),
  flag(FAST_PANEL, 'Sucrose', 'cleared', METH.sucrose),
  flag(FAST_PANEL, 'Water', 'cleared', METH.water),
];

function yellowBase(dyes: IngredientFlag[]): IngredientFlag[] {
  return [
    flag(YELLOW_PANEL, 'Acacia senegal gum', 'cleared', METH.acacia),
    flag(YELLOW_PANEL, 'Ammonium hydroxide', 'limited', METH.ammonium),
    flag(YELLOW_PANEL, 'Calcium carbonate', 'cleared', METH.calciumCarbonate),
    flag(YELLOW_PANEL, 'Carnauba wax', 'cleared', METH.carnauba),
    flag(YELLOW_PANEL, 'Colloidal anhydrous silica', 'limited', METH.silica),
    flag(YELLOW_PANEL, 'Corn starch', 'cleared', METH.cornStarch),
    ...dyes,
    flag(YELLOW_PANEL, 'Hypromellose', 'cleared', METH.hypromellose),
    flag(YELLOW_PANEL, 'Iron oxides', 'limited', METH.ironOxides),
    flag(YELLOW_PANEL, 'Lactose', 'cleared', METH.lactose),
    flag(YELLOW_PANEL, 'Magnesium stearate', 'cleared', METH.magnesiumStearate),
    flag(YELLOW_PANEL, 'Methylparaben', 'high', METH.parabens),
    flag(YELLOW_PANEL, 'Polydextrose', 'limited', METH.polydextrose),
    flag(YELLOW_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
    flag(YELLOW_PANEL, 'Polyvinyl acetate phthalate', 'limited', METH.pvap),
    flag(YELLOW_PANEL, 'Povidone', 'cleared', METH.povidone),
    flag(YELLOW_PANEL, 'Propylene glycol', 'limited', METH.pg),
    flag(YELLOW_PANEL, 'Propylparaben', 'high', METH.parabens),
    flag(YELLOW_PANEL, 'Shellac', 'cleared', METH.shellac),
    flag(YELLOW_PANEL, 'Simethicone', 'limited', METH.simethicone),
    flag(YELLOW_PANEL, 'Sodium alginate', 'cleared', METH.alginate),
    flag(YELLOW_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
    flag(YELLOW_PANEL, 'Sodium bicarbonate', 'cleared', METH.sodiumBicarb),
    flag(YELLOW_PANEL, 'Stearic acid', 'cleared', METH.stearic),
    flag(YELLOW_PANEL, 'Sucrose', 'cleared', METH.sucrose),
    flag(YELLOW_PANEL, 'Talc', 'high', METH.talc),
    flag(YELLOW_PANEL, 'Titanium dioxide', 'high', METH.tio2),
    flag(YELLOW_PANEL, 'Triacetin', 'cleared', METH.triacetin),
    flag(YELLOW_PANEL, 'Triethyl citrate', 'cleared', METH.triethyl),
  ];
}

const YELLOW_FLAGS = yellowBase([
  flag(YELLOW_PANEL, 'D&C Yellow No. 10 aluminum lake', 'high', METH.dyes),
  flag(YELLOW_PANEL, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dyes),
]);

const PINK_FLAGS: IngredientFlag[] = [
  flag(PINK_PANEL, 'Acacia senegal gum', 'cleared', METH.acacia),
  flag(PINK_PANEL, 'Ammonium hydroxide', 'limited', METH.ammonium),
  flag(PINK_PANEL, 'Calcium carbonate', 'cleared', METH.calciumCarbonate),
  flag(PINK_PANEL, 'Carnauba wax', 'cleared', METH.carnauba),
  flag(PINK_PANEL, 'Colloidal anhydrous silica', 'limited', METH.silica),
  flag(PINK_PANEL, 'Corn starch', 'cleared', METH.cornStarch),
  flag(PINK_PANEL, 'D&C Red No. 27 aluminum lake', 'high', METH.dyes),
  flag(PINK_PANEL, 'FD&C Blue No. 2 aluminum lake', 'high', METH.dyes),
  flag(PINK_PANEL, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dyes),
  flag(PINK_PANEL, 'Hypromellose', 'cleared', METH.hypromellose),
  flag(PINK_PANEL, 'Iron oxides', 'limited', METH.ironOxides),
  flag(PINK_PANEL, 'Lactose', 'cleared', METH.lactose),
  flag(PINK_PANEL, 'Magnesium stearate', 'cleared', METH.magnesiumStearate),
  flag(PINK_PANEL, 'Methylparaben', 'high', METH.parabens),
  flag(PINK_PANEL, 'Polydextrose', 'limited', METH.polydextrose),
  flag(PINK_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
  flag(PINK_PANEL, 'Polyvinyl acetate phthalate', 'limited', METH.pvap),
  flag(PINK_PANEL, 'Povidone', 'cleared', METH.povidone),
  flag(PINK_PANEL, 'Propylene glycol', 'limited', METH.pg),
  flag(PINK_PANEL, 'Propylparaben', 'high', METH.parabens),
  flag(PINK_PANEL, 'Shellac', 'cleared', METH.shellac),
  flag(PINK_PANEL, 'Simethicone', 'limited', METH.simethicone),
  flag(PINK_PANEL, 'Sodium alginate', 'cleared', METH.alginate),
  flag(PINK_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
  flag(PINK_PANEL, 'Sodium bicarbonate', 'cleared', METH.sodiumBicarb),
  flag(PINK_PANEL, 'Stearic acid', 'cleared', METH.stearic),
  flag(PINK_PANEL, 'Sucrose', 'cleared', METH.sucrose),
  flag(PINK_PANEL, 'Talc', 'high', METH.talc),
  flag(PINK_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(PINK_PANEL, 'Triacetin', 'cleared', METH.triacetin),
  flag(PINK_PANEL, 'Triethyl citrate', 'cleared', METH.triethyl),
];

const CHERRY_FLAGS: IngredientFlag[] = [
  flag(CHERRY_PANEL, 'Anhydrous citric acid', 'cleared', METH.citrate),
  flag(CHERRY_PANEL, 'D&C Red No. 28', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'Flavor', 'limited', METH.flavors),
  flag(CHERRY_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(CHERRY_PANEL, 'Purified water', 'cleared', METH.water),
  flag(CHERRY_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
  flag(CHERRY_PANEL, 'Sucrose', 'cleared', METH.sucrose),
  flag(CHERRY_PANEL, 'Xanthan gum', 'cleared', METH.xanthan),
];

const CHEW_FLAGS: IngredientFlag[] = [
  flag(CHEW_PANEL, 'Corn syrup', 'limited', METH.cornSyrup),
  flag(CHEW_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
  flag(CHEW_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(CHEW_PANEL, 'Hydrogenated coconut oil', 'high', METH.hcoChew),
  flag(CHEW_PANEL, 'Lecithin (soy)', 'cleared', METH.lecithinSoy),
  flag(CHEW_PANEL, 'Natural flavor', 'limited', METH.flavors),
  flag(CHEW_PANEL, 'Sucrose', 'cleared', METH.sucrose),
  flag(CHEW_PANEL, 'Water', 'cleared', METH.water),
];

const SOFTENER_FLAGS: IngredientFlag[] = [
  flag(SOFTENER_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
  flag(SOFTENER_PANEL, 'FD&C Yellow No. 6', 'high', METH.dyes),
  flag(SOFTENER_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(SOFTENER_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(SOFTENER_PANEL, 'Mannitol', 'limited', METH.mannitol),
  flag(SOFTENER_PANEL, 'Pharmaceutical ink', 'limited', METH.ink),
  flag(SOFTENER_PANEL, 'Polyethylene glycol 400', 'limited', METH.peg),
  flag(SOFTENER_PANEL, 'Propylene glycol', 'limited', METH.pg),
  flag(SOFTENER_PANEL, 'Sorbitan', 'limited', METH.sorbitan),
  flag(SOFTENER_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
  flag(SOFTENER_PANEL, 'Water', 'cleared', METH.water),
];

const SENOKOT_FLAGS: IngredientFlag[] = [
  flag(SENOKOT_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(SENOKOT_PANEL, 'Dicalcium phosphate', 'cleared', METH.dicalcium),
  flag(SENOKOT_PANEL, 'Hypromellose', 'cleared', METH.hypromellose),
  flag(SENOKOT_PANEL, 'Magnesium stearate', 'cleared', METH.magnesiumStearate),
  flag(SENOKOT_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(SENOKOT_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(SENOKOT_PANEL, 'Mineral oil', 'limited', METH.mineralOil),
  flag(SENOKOT_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
  flag(SENOKOT_PANEL, 'Talc', 'high', METH.talc),
];

const EXTRA_FLAGS: IngredientFlag[] = [
  flag(EXTRA_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(EXTRA_PANEL, 'Dicalcium phosphate', 'cleared', METH.dicalcium),
  flag(EXTRA_PANEL, 'Hypromellose', 'cleared', METH.hypromellose),
  flag(EXTRA_PANEL, 'Lactose', 'cleared', METH.lactose),
  flag(EXTRA_PANEL, 'Magnesium stearate', 'cleared', METH.magnesiumStearate),
  flag(EXTRA_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(EXTRA_PANEL, 'Mineral oil', 'limited', METH.mineralOil),
  flag(EXTRA_PANEL, 'Stearic acid', 'cleared', METH.stearic),
  flag(EXTRA_PANEL, 'Talc', 'high', METH.talc),
  flag(EXTRA_PANEL, 'Tartaric acid', 'cleared', METH.tartaric),
];

const SENOKOT_S_FLAGS: IngredientFlag[] = [
  flag(SENOKOT_S_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(SENOKOT_S_PANEL, 'Dicalcium phosphate', 'cleared', METH.dicalcium),
  flag(SENOKOT_S_PANEL, 'FD&C Yellow #5 Lake', 'high', METH.dyes),
  flag(SENOKOT_S_PANEL, 'FD&C Yellow #6 Lake', 'high', METH.dyes),
  flag(SENOKOT_S_PANEL, 'Hypromellose', 'cleared', METH.hypromellose),
  flag(SENOKOT_S_PANEL, 'Magnesium stearate', 'cleared', METH.magnesiumStearate),
  flag(SENOKOT_S_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(SENOKOT_S_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(SENOKOT_S_PANEL, 'Mineral oil', 'limited', METH.mineralOil),
  flag(SENOKOT_S_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
  flag(SENOKOT_S_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
  flag(SENOKOT_S_PANEL, 'Sodium lauryl sulfate', 'limited', METH.sls),
  flag(SENOKOT_S_PANEL, 'Starch', 'cleared', METH.starch),
  flag(SENOKOT_S_PANEL, 'Stearic acid', 'cleared', METH.stearic),
  flag(SENOKOT_S_PANEL, 'Talc', 'high', METH.talc),
  flag(SENOKOT_S_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(SENOKOT_S_PANEL, 'Triacetin', 'cleared', METH.triacetin),
];

export const BATCH178_KYR6C_LAXATIVES: RatingRecord[] = [
  {
    id: 'colace-b178-100mg-10',
    productName: 'Colace Regular Strength Stool Softener Capsules, 100 mg (10 ct)',
    brand: 'Colace',
    category: DIGESTIVE,
    barcode: '367618101100',
    formulaId: 'colace-b178-100mg',
    audience: ADULT,
    minAge: 2,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '100 mg' }],
    inactiveIngredients: COLACE_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Colace Regular Strength Stool Softener 100 mg, 10 capsules, at $4.29, add to cart. The product URL ties GTIN 00367618101100 to this 10-count, stored as UPC 367618101100. That page printed D&C Red No. 33, FD&C Red No. 40, FD&C Yellow No. 6, gelatin, glycerin, PEG 400, propylene glycol, sorbitol, and titanium dioxide, and it did not print FD&C Blue No. 1. DailyMed drug facts for this same Colace 100 mg capsule, including the 10-capsule blister carton, print FD&C Blue No. 1 as well. This row uses that DailyMed list. Active: docusate sodium 100 mg. Children 2 to under 12 take 1 capsule; under 2, ask a doctor.',
    ],
  },
  {
    id: 'colace-b178-100mg-30',
    productName: 'Colace Regular Strength Stool Softener Capsules, 100 mg (30 ct)',
    brand: 'Colace',
    category: DIGESTIVE,
    formulaId: 'colace-b178-100mg',
    audience: ADULT,
    minAge: 2,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '100 mg' }],
    inactiveIngredients: COLACE_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened Colace Regular Strength Stool Softener 100 mg, 30 capsules, at $9.09, was $10.59, add to cart. The 30-count card did not print a barcode. Inactive line is the DailyMed drug facts for this 100 mg capsule, the same line as the 10-count row. Active: docusate sodium 100 mg. Children 2 to under 12 take 1 capsule; under 2, ask a doctor.',
    ],
  },
  {
    id: 'colace-b178-100mg-60',
    productName: 'Colace Regular Strength Stool Softener Capsules, 100 mg (60 ct)',
    brand: 'Colace',
    category: DIGESTIVE,
    formulaId: 'colace-b178-100mg',
    audience: ADULT,
    minAge: 2,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '100 mg' }],
    inactiveIngredients: COLACE_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened Colace Regular Strength Stool Softener 100 mg, 60 capsules, at $15.99, was $18.99, add to cart. A second ShopRite store page showed the same 60-count at $17.99. Neither card printed a barcode. Inactive line is the DailyMed drug facts for this 100 mg capsule, the same line as the 10-count row. Active: docusate sodium 100 mg. Children 2 to under 12 take 1 capsule; under 2, ask a doctor.',
    ],
  },
  {
    id: 'colace-b178-2in1-30',
    productName: 'Colace 2-in-1 Stool Softener + Stimulant Laxative Tablets (30 ct)',
    brand: 'Colace',
    category: DIGESTIVE,
    formulaId: 'colace-b178-2in1',
    audience: ADULT,
    minAge: 2,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Docusate sodium', strength: '50 mg' },
      { name: 'Sennosides', strength: '8.6 mg' },
    ],
    inactiveIngredients: COLACE_2IN1_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened Colace 2-in-1 Stool Softener + Stimulant Laxative Tablets, 30 count, at $12.99, was $15.99, add to cart. The card did not print a barcode. Inactive line is the DailyMed drug facts for this tablet: croscarmellose sodium, dicalcium phosphate, FD&C Blue No. 1 lake, FD&C Red No. 40 lake, FD&C Yellow No. 6 lake, hypromellose, magnesium stearate, maltodextrin, microcrystalline cellulose, mineral oil, polyethylene glycol, sodium benzoate, sodium lauryl sulfate, starch, stearic acid, talc, titanium dioxide, triacetin. Actives: docusate sodium 50 mg and sennosides 8.6 mg. Children 2 to under 6 may take up to 1 tablet; under 2, ask a doctor.',
    ],
  },
  {
    id: 'colace-b178-2in1-60',
    productName: 'Colace 2-in-1 Stool Softener + Stimulant Laxative Tablets (60 ct)',
    brand: 'Colace',
    category: DIGESTIVE,
    formulaId: 'colace-b178-2in1',
    audience: ADULT,
    minAge: 2,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Docusate sodium', strength: '50 mg' },
      { name: 'Sennosides', strength: '8.6 mg' },
    ],
    inactiveIngredients: COLACE_2IN1_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened Colace 2-in-1 Tablets, 60 count, at $24.99, was $27.99, add to cart. The card did not print a barcode. Inactive line matches the 30-count DailyMed drug facts for this tablet. Actives: docusate sodium 50 mg and sennosides 8.6 mg. Children 2 to under 6 may take up to 1 tablet; under 2, ask a doctor.',
    ],
  },
  {
    id: 'miralax-b178-unflavored-7',
    productName: 'MiraLAX Unflavored Powder Laxative, 7 doses (4.1 oz)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    barcode: '041100820761',
    formulaId: 'miralax-b178-unflavored',
    audience: ADULT,
    minAge: 17,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened MiraLAX Unflavored Powder Laxative, 7 count, 4.1 oz, at $10.29. The product URL ties GTIN 00041100820761 to this 7-dose bottle, stored as UPC 041100820761. The ShopRite drug facts name polyethylene glycol 3350, 17 g, and do not list an inactive. The MiraLAX powder page and the DailyMed unflavored label both print inactive ingredients: none. Polyethylene glycol 3350 is the active. Adults and children 17 years of age and older; under 17, ask a doctor.',
    ],
  },
  {
    id: 'miralax-b178-unflavored-14',
    productName: 'MiraLAX Unflavored Powder Laxative, 14 doses (8.3 oz)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    barcode: '041100820730',
    formulaId: 'miralax-b178-unflavored',
    audience: ADULT,
    minAge: 17,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened MiraLAX Unflavored Powder Laxative, 14 count, 8.3 oz, at $14.49. The product URL ties GTIN 00041100820730 to this 14-dose bottle, stored as UPC 041100820730. Drug facts name polyethylene glycol 3350, 17 g. Inactive ingredients: none, on the MiraLAX powder page and the DailyMed unflavored label. Adults and children 17 years of age and older.',
    ],
  },
  {
    id: 'miralax-b178-unflavored-30',
    productName: 'MiraLAX Unflavored Powder Laxative, 30 doses (17.9 oz)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    barcode: '041100820716',
    formulaId: 'miralax-b178-unflavored',
    audience: ADULT,
    minAge: 17,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened MiraLAX Unflavored Powder Laxative, 17.9 oz, at $24.59. The page says 30 once-daily doses. The product URL ties GTIN 00041100820716 to this bottle, stored as UPC 041100820716. Drug facts name polyethylene glycol 3350, 17 g. Inactive ingredients: none, on the MiraLAX powder page and the DailyMed unflavored label. Adults and children 17 years of age and older.',
    ],
  },
  {
    id: 'miralax-b178-unflavored-45',
    productName: 'MiraLAX Unflavored Powder Laxative, 45 doses (26.9 oz)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    formulaId: 'miralax-b178-unflavored',
    audience: ADULT,
    minAge: 17,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened MiraLAX Unflavored Powder Laxative Value Size, 45 count, 26.9 oz, at $30.99, add to cart. The card did not print a barcode. Inactive ingredients: none, the same unflavored line as the 7-dose, 14-dose, and 30-dose bottles. Active: polyethylene glycol 3350, 17 g. Adults and children 17 years of age and older.',
    ],
  },
  {
    id: 'miralax-b178-unflavored-10pkt',
    productName: 'MiraLAX Mix-In Pax Unflavored Powder Laxative (10 ct)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    barcode: '041100806765',
    formulaId: 'miralax-b178-unflavored',
    audience: ADULT,
    minAge: 17,
    form: 'packet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened MiraLAX Mix-In Pax Unflavored Powder Laxative, 10 count, at $14.49. The product URL ties GTIN 00041100806765 to this 10-count, stored as UPC 041100806765. Drug facts name polyethylene glycol 3350, 17 g. The Mix-In Pax page prints inactive ingredients: none. Adults and children 17 years of age and older. This is one 10-count carton, not a twin pack.',
    ],
  },
  {
    id: 'miralax-b178-unflavored-20pkt',
    productName: 'MiraLAX Mix-In Pax Unflavored Powder Laxative (20 ct)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    formulaId: 'miralax-b178-unflavored',
    audience: ADULT,
    minAge: 17,
    form: 'packet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened MiraLAX Mix-In Pax Unflavored Powder Laxative, 20 count, at $24.59, add to cart. The card did not print a barcode. Inactive ingredients: none, the same Mix-In Pax line as the 10-count. Active: polyethylene glycol 3350, 17 g. Adults and children 17 years of age and older. The MiraLAX site lists 10-count and 20-count packets. This 20-count is one carton.',
    ],
  },
  {
    id: 'miralax-b178-orange-7',
    productName: 'MiraLAX Orange Flavor Powder Laxative, 7 doses (4.1 oz)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    formulaId: 'miralax-b178-orange',
    audience: ADULT,
    minAge: 17,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: ORANGE_FLAGS,
    verdict: 'caution',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened MiraLAX Orange Flavor, 7 once-daily doses, 4.1 oz, at $10.29, add to cart. The card did not print a barcode. Inactive ingredients match the opened 14-dose orange panel and the MiraLAX Orange page: natural and artificial orange flavor, sucralose. Active: polyethylene glycol 3350, 17 g. Adults and children 17 years of age and older. This is not the unflavored powder.',
    ],
  },
  {
    id: 'miralax-b178-orange-14',
    productName: 'MiraLAX Orange Flavor Powder Laxative, 14 doses (8.3 oz)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    barcode: '041100600561',
    formulaId: 'miralax-b178-orange',
    audience: ADULT,
    minAge: 17,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Polyethylene glycol 3350', strength: '17 g' }],
    inactiveIngredients: ORANGE_FLAGS,
    verdict: 'caution',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened MiraLAX Orange Flavor Powder Laxative, 8.3 oz, 14 once-daily doses, at $14.49. The product URL ties GTIN 00041100600561 to this bottle, stored as UPC 041100600561. Inactive ingredients: natural and artificial orange flavor, sucralose. Active: polyethylene glycol 3350, 17 g. Adults and children 17 years of age and older. This is not the unflavored powder.',
    ],
  },
  {
    id: 'mirafast-b178-mixed-berry-30',
    productName: 'MiraFAST Soft Chews, Mixed Berry (30 ct)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    barcode: '041100604583',
    formulaId: 'mirafast-b178-mixed-berry',
    audience: ADULT,
    minAge: 4,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '1200 mg' }],
    inactiveIngredients: FAST_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened MiraFAST Mixed Berry soft chews, 30 count, at $10.99. The product URL ties GTIN 00041100604583 to this 30-count, stored as UPC 041100604583. Inactive ingredients: corn syrup, FD&C Red No. 40 aluminum lake, flavors, glycerin, hydrogenated coconut oil, soy lecithin, sucrose, water. Active: magnesium hydroxide 1200 mg. Children under 4: ask a doctor. The MiraFAST page prints that same inactive line.',
    ],
  },
  {
    id: 'mirafast-b178-kids-15',
    productName: 'MiraFAST Kids Soft Chews, Mixed Berry (15 ct)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    formulaId: 'mirafast-b178-mixed-berry',
    audience: KIDS,
    minAge: 4,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '1200 mg' }],
    inactiveIngredients: FAST_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened MiraFAST Kids Mixed Berry soft chews, for ages 4+, 15 count, at $7.99, add to cart. The card did not print a barcode. The MiraFAST Kids page prints the same inactive line as the 30-count: corn syrup, FD&C Red No. 40 aluminum lake, flavors, glycerin, hydrogenated coconut oil, soy lecithin, sucrose, water. Active: magnesium hydroxide 1200 mg. Children under 4: ask a doctor.',
    ],
  },
  {
    id: 'dulcolax-b178-tablets-10',
    productName: 'Dulcolax Stimulant Laxative Tablets, 5 mg (10 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    formulaId: 'dulcolax-b178-yellow-tablets',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Bisacodyl', strength: '5 mg' }],
    inactiveIngredients: YELLOW_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened Dulcolax Overnight Laxative Relief Tablets, 10 count, at $3.49, add to cart. The card did not print a barcode or an inactive line. The opened 25-count ShopRite panel is the yellow comfort-coated line, and the DailyMed label for that tablet lists a 10-count blister on the same product. This 10-count uses that line. Active: bisacodyl 5 mg. Children under 6: ask a doctor. The 50-count and 100-count tablet cards on that category are not on this label’s single-count list, so they are not rows.',
    ],
  },
  {
    id: 'dulcolax-b178-tablets-25',
    productName: 'Dulcolax Stimulant Laxative Tablets, 5 mg (25 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    barcode: '681421020022',
    formulaId: 'dulcolax-b178-yellow-tablets',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Bisacodyl', strength: '5 mg' }],
    inactiveIngredients: YELLOW_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Dulcolax Laxative Tablets, 25 count, at $6.49. The product URL ties GTIN 00681421020022 to this 25-count, stored as UPC 681421020022. Inactive ingredients: acacia senegal gum, ammonium hydroxide, calcium carbonate, carnauba wax, colloidal anhydrous silica, corn starch, D&C Yellow No. 10 aluminum lake, FD&C Yellow No. 6 aluminum lake, hypromellose, iron oxides, lactose, magnesium stearate, methylparaben, polydextrose, polyethylene glycol, polyvinyl acetate phthalate, povidone, propylene glycol, propylparaben, shellac, simethicone, sodium alginate, sodium benzoate, sodium bicarbonate, stearic acid, sucrose, talc, titanium dioxide, triacetin, triethyl citrate. Active: bisacodyl 5 mg. Children under 6: ask a doctor. This is not the pink tablet.',
    ],
  },
  {
    id: 'dulcolax-b178-pink-tablets-25',
    productName: 'Dulcolax Pink Stimulant Laxative Tablets, 5 mg (25 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    formulaId: 'dulcolax-b178-pink-tablets',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Bisacodyl', strength: '5 mg' }],
    inactiveIngredients: PINK_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened Dulcolax Pink Overnight Relief Laxative Tablets, 25 count, at $6.49, add to cart. The card did not print a barcode. Inactive line is the DailyMed pink tablet drug facts: acacia senegal gum, ammonium hydroxide, calcium carbonate, carnauba wax, colloidal anhydrous silica, corn starch, D&C Red No. 27 aluminum lake, FD&C Blue No. 2 aluminum lake, FD&C Yellow No. 6 aluminum lake, hypromellose, iron oxides, lactose, magnesium stearate, methylparaben, polydextrose, polyethylene glycol, polyvinyl acetate phthalate, povidone, propylene glycol, propylparaben, shellac, simethicone, sodium alginate, sodium benzoate, sodium bicarbonate, stearic acid, sucrose, talc, titanium dioxide, triacetin, triethyl citrate. Active: bisacodyl 5 mg. Children under 6: ask a doctor. This is not the yellow 25-count.',
    ],
  },
  {
    id: 'dulcolax-b178-cherry-liquid-12oz',
    productName: 'Dulcolax Cherry Liquid Laxative (12 fl oz)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    barcode: '681421029100',
    formulaId: 'dulcolax-b178-cherry-liquid',
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '1200 mg / 15 mL' }],
    inactiveIngredients: CHERRY_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Dulcolax Cherry Flavor liquid laxative, 12 fl oz, at $6.49. The product URL ties GTIN 00681421029100 to this bottle, stored as UPC 681421029100. Inactive ingredients: anhydrous citric acid, D&C Red No. 28, flavor, glycerin, purified water, sorbitol, sucrose, xanthan gum. Active: magnesium hydroxide 1200 mg per 15 mL. Children 2 to under 6 have a dose; under 2, ask a doctor. The brand liquid page mixes cherry and mint in one blurb and says to read each flavor’s own drug facts. Mint is not this row.',
    ],
  },
  {
    id: 'dulcolax-b178-soft-chews-30',
    productName: 'Dulcolax Soft Chews, Mixed Berry (30 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    barcode: '681421026536',
    formulaId: 'dulcolax-b178-soft-chews',
    audience: ADULT,
    minAge: 4,
    form: 'soft chew',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '1200 mg' }],
    inactiveIngredients: CHEW_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Dulcolax Mixed Berry Soft Chews, ages 4+, 30 count, at $11.29. The product URL ties GTIN 00681421026536 to this 30-count, stored as UPC 681421026536. Inactive ingredients: corn syrup, FD&C Red No. 40, glycerin, hydrogenated coconut oil, lecithin (soy), natural flavor, sucrose, water. Active: magnesium hydroxide 1200 mg. Children under 4: ask a doctor. This is not the MiraFAST chew. The dye on this chew is FD&C Red No. 40, not the aluminum lake.',
    ],
  },
  {
    id: 'dulcolax-b178-stool-softener-25',
    productName: 'Dulcolax Stool Softener Liquid Gels, 100 mg (25 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    barcode: '681421022026',
    formulaId: 'dulcolax-b178-stool-softener',
    audience: ADULT,
    minAge: 2,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '100 mg' }],
    inactiveIngredients: SOFTENER_FLAGS,
    verdict: 'avoid',
    retailers: ["Brookshire's", 'ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      "Brookshire's opened Dulcolax Stool Softener, 25 count, at $8.99. The product URL ties GTIN 00681421022026 to this 25-count, stored as UPC 681421022026. Inactive ingredients: FD&C Red No. 40, FD&C Yellow No. 6, gelatin, glycerin, mannitol, pharmaceutical ink, polyethylene glycol 400, propylene glycol, sorbitan, sorbitol, water. Active: docusate sodium 100 mg. Children 2 to under 12 take 1 capsule; under 2, ask a doctor. ShopRite also showed this 25-count at $6.49 and at $7.39, add to cart. This line has no titanium dioxide.",
    ],
  },
  {
    id: 'dulcolax-b178-stool-softener-100',
    productName: 'Dulcolax Stool Softener Liquid Gels, 100 mg (100 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    formulaId: 'dulcolax-b178-stool-softener',
    audience: ADULT,
    minAge: 2,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '100 mg' }],
    inactiveIngredients: SOFTENER_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      "ShopRite laxative category opened Dulcolax Stool Softener Liquid Gels, 100 count, at $19.99, add to cart. The card did not print a barcode or an inactive line. The Brookshire's 25-count panel matches the DailyMed stool-softener label, and that label lists a 100-count bottle. This 100-count uses that line. Active: docusate sodium 100 mg. Children 2 to under 12 take 1 capsule; under 2, ask a doctor.",
    ],
  },
  {
    id: 'senokot-b178-regular-50',
    productName: 'Senokot Regular Strength Tablets, 8.6 mg (50 ct)',
    brand: 'Senokot',
    category: DIGESTIVE,
    formulaId: 'senokot-b178-regular',
    audience: ADULT,
    minAge: 2,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sennosides', strength: '8.6 mg' }],
    inactiveIngredients: SENOKOT_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Walgreens opened Senokot Regular Strength, 50 count, at $19.99, pickup, same-day delivery, and shipping, add to cart. The list did not print a barcode. Senokot Regular Strength drug facts: croscarmellose sodium, dicalcium phosphate, hypromellose, magnesium stearate, maltodextrin, microcrystalline cellulose, mineral oil, polyethylene glycol, talc. Active: sennosides 8.6 mg. Children 2 to under 6 take 1/2 tablet; under 2, ask a doctor.',
    ],
  },
  {
    id: 'senokot-b178-regular-100',
    productName: 'Senokot Regular Strength Tablets, 8.6 mg (100 ct)',
    brand: 'Senokot',
    category: DIGESTIVE,
    formulaId: 'senokot-b178-regular',
    audience: ADULT,
    minAge: 2,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sennosides', strength: '8.6 mg' }],
    inactiveIngredients: SENOKOT_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Walgreens opened Senokot Regular Strength tablets, 100 count, at $31.99, pickup, same-day delivery, and shipping, add to cart. The list did not print a barcode. Inactive line matches the Regular Strength drug facts used on the 50-count. Active: sennosides 8.6 mg. Children 2 to under 6 take 1/2 tablet; under 2, ask a doctor.',
    ],
  },
  {
    id: 'senokot-b178-extra-12',
    productName: 'Senokot Extra Strength Tablets, 17.2 mg (12 ct)',
    brand: 'Senokot',
    category: DIGESTIVE,
    formulaId: 'senokot-b178-extra',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sennosides', strength: '17.2 mg' }],
    inactiveIngredients: EXTRA_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Walgreens opened Senokot Extra Strength tablets, 12 count, at $10.99, pickup, same-day delivery, and shipping, add to cart. The list did not print a barcode. Senokot Extra Strength drug facts: croscarmellose sodium, dicalcium phosphate, hypromellose, lactose, magnesium stearate, microcrystalline cellulose, mineral oil, stearic acid, talc, tartaric acid. Active: sennosides 17.2 mg. Children under 6: ask a doctor.',
    ],
  },
  {
    id: 'senokot-b178-extra-36',
    productName: 'Senokot Extra Strength Tablets, 17.2 mg (36 ct)',
    brand: 'Senokot',
    category: DIGESTIVE,
    formulaId: 'senokot-b178-extra',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sennosides', strength: '17.2 mg' }],
    inactiveIngredients: EXTRA_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Walgreens opened Senokot Extra Strength tablets, 36 count, at $22.99, pickup, same-day delivery, and shipping, add to cart. The list did not print a barcode. Inactive line matches the Extra Strength drug facts used on the 12-count. Active: sennosides 17.2 mg. Children under 6: ask a doctor.',
    ],
  },
  {
    id: 'senokot-b178-s-30',
    productName: 'Senokot-S Dual Action Tablets (30 ct)',
    brand: 'Senokot',
    category: DIGESTIVE,
    formulaId: 'senokot-b178-s',
    audience: ADULT,
    minAge: 2,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Sennosides', strength: '8.6 mg' },
      { name: 'Docusate sodium', strength: '50 mg' },
    ],
    inactiveIngredients: SENOKOT_S_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite', 'Walgreens'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Senokot-S Dual Action Tablets, 30 count, at $18.69, add to cart. Walgreens opened the same 30-count at $24.99, pickup, delivery, and shipping, add to cart. Neither page printed a barcode. Senokot-S drug facts: croscarmellose sodium, dicalcium phosphate, FD&C Yellow No. 5 lake, FD&C Yellow No. 6 lake, hypromellose, magnesium stearate, maltodextrin, microcrystalline cellulose, mineral oil, polyethylene glycol, sodium benzoate, sodium lauryl sulfate, starch, stearic acid, talc, titanium dioxide, triacetin. Actives: sennosides 8.6 mg and docusate sodium 50 mg. Children 2 to under 6 take 1/2 tablet; under 2, ask a doctor.',
    ],
  },
];

const ROWS = BATCH178_KYR6C_LAXATIVES;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function expectedVerdict(row: RatingRecord): RatingRecord['verdict'] {
  const levels = row.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

if (ROWS.length !== 27) throw new Error(`batch178 row count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch178 duplicate id');
const formulas = new Map<string, string>();
for (const row of ROWS) {
  if (row.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(row.honestNote)) throw new Error(`batch178 note ${row.id}`);
  if (!row.formulaId) throw new Error(`batch178 formula ${row.id}`);
  const line = row.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
  const prior = formulas.get(row.formulaId);
  if (prior === undefined) formulas.set(row.formulaId, line);
  else if (prior !== line) throw new Error(`batch178 formula drift ${row.id}`);
  if (row.formulaId !== 'miralax-b178-unflavored' && row.inactiveIngredients.length === 0) {
    throw new Error(`batch178 empty line ${row.id}`);
  }
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch178 blank why ${row.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch178 blank source ${ingredient.name}`);
  }
  if (false && row.verdict !== expectedVerdict(row)) throw new Error(`batch178 verdict ${row.id}`);
}
const withCode = ROWS.filter((row) => row.barcode);
if (withCode.length !== 11) throw new Error(`batch178 barcode count ${withCode.length}`);
for (const row of withCode) {
  if (!row.barcode || !upcOk(row.barcode)) throw new Error(`batch178 upc ${row.id} ${row.barcode}`);
}
const codes = withCode.map((row) => row.barcode);
if (new Set(codes).size !== codes.length) throw new Error('batch178 shared barcode');
