// DRAFT / not verified / batch 162 KYR6-c held tokens.
// Packs held in batch 161 until the Oct 14 lock. Written only when
// the panel was read and a page that opened showed that same count
// for sale. No Canada. No EU. No store brand. No 2-pack or kit.
//
// Not written: Regular Strength (brand FAQ says currently discontinued;
// no opened page showed a count for sale). Ultra peppermint 160 (the
// opened Target and Albertsons bottles print a different inactive line,
// with no sodium polyphosphate). Tropical 160 and the other DailyMed
// bottle counts had no opened sale page. Multipacks are not rows.
//
// TALLY: 10 written — Clean 0 / Caution 1 / Avoid 9.
// Prilosec 1 (Avoid). Pepcid 1 (Caution). Tums 8 (Avoid).
// UPC attached 10 / empty 0.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const DIGESTIVE = 'Digestive';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  atbc: 'Methodology §5 Caution (acetyl tributyl citrate). Coating plasticizer. Not triethyl citrate. Not the Avoid driver.',
  sio2: 'Methodology §5 Caution (colloidal silicon dioxide → silicon dioxide nanoparticle cap). Not the Avoid driver.',
  cornStarch: 'Methodology §5 Cleared (corn starch).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dextrose: 'Methodology §5 Caution (dextrose → bare glucose). Not glucose syrup. Not the Avoid driver.',
  dye: 'Methodology §5 High (synthetic FD&C dye, including the lake form). Avoid.',
  flavor: 'Methodology §5 Caution (flavor). Not the Avoid driver.',
  flavors: 'Methodology §5 Caution (bare flavors). Not the Avoid driver.',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose, HPMC family).',
  hpmc: 'Methodology §5 Cleared (hypromellose). Hypromellose 2910 is this USP type.',
  stearate: 'Methodology §5 Cleared (magnesium stearate).',
  meth: 'Methodology §5 Caution (methacrylic acid copolymer). Not plain hypromellose. Not the Avoid driver.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  pg: 'Methodology §5 Moderate (propylene glycol, swallowed). Not the Avoid driver.',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  sucrose: 'Methodology §5 Limited (sucrose, sugar). Not the Avoid driver.',
  talc: 'Methodology §5 High (talc). Avoid.',
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  triacetin: 'Methodology §5 Cleared (triacetin).',
  tec: 'Methodology §5 Cleared (triethyl citrate).',
  glucoseSyrup: 'Methodology §5 Cleared (glucose syrup). Not corn syrup.',
  water: 'Methodology §5 Cleared (water).',
  naturalFlavor: 'Methodology §5 Caution (natural flavor). Not the Avoid driver.',
  pectin: 'Methodology §5 Cleared (pectin).',
  chamomile: 'Methodology §5 Cleared (German chamomile flower extract, named plant part).',
  citric: 'Methodology §5 Cleared (citric acid).',
  mineral: 'Methodology §5 Caution (oral mineral oil). Not the topical ointment row. Not the Avoid driver.',
  whiteMineral: 'Methodology §5 Caution (oral white mineral oil). Not the topical ointment row. Not the gummy seed-oil rule. Not the Avoid driver.',
  citrate: 'Methodology §5 Cleared (sodium citrate).',
  juiceColor: 'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution). Not the Avoid driver.',
  adipic: 'Methodology §5 Cleared (adipic acid).',
  polyphosphate: 'Methodology §5 Caution (sodium polyphosphate). Own row. Not a phosphate salt. Not phosphoric acid. Not the Avoid driver.',
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

const WILD = 'Target TCIN 1009086169 wildberry 14-count drug facts';
const SLEEP = 'Target TCIN 93486483 strawberry sleep gummy other ingredients and the brand sleep page';
const FRUIT = 'Target Ultra Assorted Fruit 72-count and 160-count drug facts';
const TROP = 'ShopRite tropical fruit 72-count ingredients';
const MINT = 'Safeway Ultra peppermint 72-count ingredients';
const BERRIES = 'Target Ultra Assorted Berries 72-count and 160-count drug facts';
const EXTRA_FRUIT = 'Target Extra Strength Assorted Fruit 96-count drug facts';
const EXTRA_BERRIES = 'Target Extra Strength Assorted Berries 96-count drug facts';

function wildLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Acetyl tributyl citrate', 'limited', METH.atbc),
    flag(panel, 'Colloidal silicon dioxide', 'limited', METH.sio2),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
    flag(panel, 'Dextrose', 'limited', METH.dextrose),
    flag(panel, 'FD&C Blue #2', 'high', METH.dye),
    flag(panel, 'FD&C Red #40', 'high', METH.dye),
    flag(panel, 'Flavor', 'limited', METH.flavor),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose 2910', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Methacrylic acid copolymer type C', 'limited', METH.meth),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Polyethylene glycol 400', 'moderate', METH.peg),
    flag(panel, 'Polyethylene glycol 3350', 'moderate', METH.peg),
    flag(panel, 'Polyethylene glycol 8000', 'moderate', METH.peg),
    flag(panel, 'Polysorbate 80', 'moderate', METH.ps80),
    flag(panel, 'Polyvinyl alcohol', 'cleared', METH.pva),
    flag(panel, 'Propylene glycol', 'moderate', METH.pg),
    flag(panel, 'Sucralose', 'moderate', METH.sucralose),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
    flag(panel, 'Triacetin', 'cleared', METH.triacetin),
    flag(panel, 'Triethyl citrate', 'cleared', METH.tec),
  ];
}

function sleepLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Glucose syrup', 'cleared', METH.glucoseSyrup),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Water', 'cleared', METH.water),
    flag(panel, 'Natural flavor', 'limited', METH.naturalFlavor),
    flag(panel, 'Pectin', 'cleared', METH.pectin),
    flag(panel, 'German chamomile flower extract', 'cleared', METH.chamomile),
    flag(panel, 'Citric acid', 'cleared', METH.citric),
    flag(panel, 'White mineral oil', 'limited', METH.whiteMineral),
    flag(panel, 'Sodium citrate', 'cleared', METH.citrate),
    flag(panel, 'Color added (vegetable juice, fruit juice)', 'cleared', METH.juiceColor),
    flag(panel, 'Carnauba wax', 'cleared', METH.carnauba),
  ];
}

function ultraFruit(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Adipic acid', 'cleared', METH.adipic),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Blue #1 lake', 'high', METH.dye),
    flag(panel, 'FD&C Red #40 lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow #5 (tartrazine) lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow #6 lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium polyphosphate', 'limited', METH.polyphosphate),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
  ];
}

function ultraTropical(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Red #40 lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow #5 (tartrazine) lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow #6 lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium polyphosphate', 'limited', METH.polyphosphate),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
  ];
}

function ultraPeppermint(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'Flavor', 'limited', METH.flavor),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium polyphosphate', 'limited', METH.polyphosphate),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
  ];
}

function ultraBerries(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Adipic acid', 'cleared', METH.adipic),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Blue #1 lake', 'high', METH.dye),
    flag(panel, 'FD&C Red #40 lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium polyphosphate', 'limited', METH.polyphosphate),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
  ];
}

function extraFruit(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Adipic acid', 'cleared', METH.adipic),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 40 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 5 aluminum lake (tartrazine)', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium polyphosphate', 'limited', METH.polyphosphate),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
  ];
}

const OME = [{ name: 'Omeprazole magnesium', strength: '20.6 mg (equivalent to omeprazole 20 mg)' }];
const SLEEP_ACTIVES = [
  { name: 'Calcium', strength: '500 mg' },
  { name: 'Melatonin', strength: '3 mg' },
];
const CA1000 = [{ name: 'Calcium carbonate', strength: '1000 mg' }];
const CA750 = [{ name: 'Calcium carbonate', strength: '750 mg' }];

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

export const BATCH162_KYR6C_HELD_TOKENS: RatingRecord[] = [
  row({
    id: 'prilosec-b162-wildberry-14',
    productName: 'Prilosec OTC Wildberry (14 delayed-release tablets)',
    brand: 'Prilosec',
    barcode: '030772202869',
    formulaId: 'prilosec-b162-wildberry14',
    minAge: 18,
    form: 'delayed-release tablet',
    productType: OTC,
    activeIngredients: OME,
    inactiveIngredients: wildLine(WILD),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 1009086169 opened Prilosec OTC Acid Reducer Tablets, 20 mg, Wildberry Flavor, 14 Count, with Add to cart, and the page condition is_product_buyable was true. Suggested age 18 years and up. Directions are for adults 18 years of age and older. Active on that page: omeprazole delayed-release tablet equivalent to 20.6 mg omeprazole magnesium, 20.0 mg, acid reducer. Inactive ingredients: acetyl tributyl citrate, colloidal silicon dioxide, corn starch, croscarmellose sodium, dextrose, FD&C blue #2, FD&C red #40, flavor, hydroxypropyl cellulose, hypromellose 2910, magnesium stearate, methacrylic acid copolymer type c, microcrystalline cellulose, polyethylene glycol 400, polyethylene glycol 3350, polyethylene glycol 8000, polysorbate 80, polyvinyl alcohol, propylene glycol, sucralose, sucrose, talc, titanium dioxide, triacetin, triethyl citrate. The only primary barcode on that 14-count product record is 030772202869. The brand 14 Ct psId is 037000808367 and the brand gtin 4987176013552 is not this UPC. Those codes were not attached. The 42-count code 030772202852 was not copied onto this 14-count. Wildberry 42 is already a row and is a different inactive line.',
    ],
  }),
  row({
    id: 'pepcid-b162-sleep-gummy-32',
    productName: 'Pepcid Soothing Gummies Heartburn + Sleep Strawberry (32 gummies)',
    brand: 'Pepcid',
    barcode: '716837685326',
    formulaId: 'pepcid-b162-sleep-gummy',
    minAge: 12,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: SLEEP_ACTIVES,
    inactiveIngredients: sleepLine(SLEEP),
    verdict: 'caution',
    honestNote:
      'The shopper sees Color Added (Vegetable Juice, Fruit Juice) on the other-ingredients line. Bare color added is the titanium dioxide form this app treats as the problem. This bottle names vegetable juice and fruit juice inside the parentheses, so this box is not that form.',
    sourcesGeneral: [
      'Target TCIN 93486483 opened Pepcid Soothing Heartburn Relief + Sleep Support Gummies, Strawberry, 32 ct, with Add to cart, and the page condition is_product_buyable was true. Suggested age 12 years and up. Supplement amounts on that page, per 2 gummies: calcium 500 mg and melatonin 3 mg. The same panel also lists phosphorus 250 mg and iron 0.7 mg as nutrition amounts. Those are not extra named actives on this row. The description says the calcium is as tricalcium phosphate. Other ingredients on Target: glucose syrup, sucrose, water, natural flavor, pectin, German chamomile flower extract, citric acid printed with a corrupted accent, white mineral oil, sodium citrate, color added (vegetable juice, fruit juice), carnauba wax. The brand sleep page spells citric acid and prints the same other-ingredients line, including color added (vegetable juice, fruit juice). Brand gtin12 716837685326 matches the only primary barcode on the Target 32-count record. The brand page says these statements have not been evaluated by the Food and Drug Administration. The peach-raspberry stress gummies are a different panel and are already a row.',
    ],
  }),
  row({
    id: 'tums-b162-ultra-fruit-72',
    productName: 'Tums Ultra Strength Assorted Fruit (72 chewable tablets)',
    brand: 'Tums',
    barcode: '307660745655',
    formulaId: 'tums-b162-ultra-fruit',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: ultraFruit(FRUIT),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 11043811 opened Tums Ultra Strength Assorted Fruit antacid chewable tablets, 72 ct, with Add to cart, and the page condition is_product_buyable was true. Active: calcium carbonate USP 1000 mg. Directions: adults and children 12 years of age and over, chew 2-3 tablets. Inactive ingredients: adipic acid, corn starch, FD&C blue #1 lake, FD&C red #40 lake, FD&C yellow #5 (tartrazine) lake, FD&C yellow #6 lake, flavors, mineral oil, sodium polyphosphate, sucrose, talc. Other information on that page says each tablet contains elemental calcium 400 mg and sodium 2 mg. The 72-count and 160-count Target pages both embed two size records. The 72-count record (TCIN 11043811, 0.42 lb) has primary barcode 307660745655. The 160-count record has 307660746102. That 160-count code was not copied onto this 72-count.',
    ],
  }),
  row({
    id: 'tums-b162-ultra-fruit-160',
    productName: 'Tums Ultra Strength Assorted Fruit (160 chewable tablets)',
    brand: 'Tums',
    barcode: '307660746102',
    formulaId: 'tums-b162-ultra-fruit',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: ultraFruit(FRUIT),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 11044513 opened Tums Ultra Strength Assorted Fruit antacid chewable tablets, 160 ct, with Add to cart, and the page condition is_product_buyable was true. The parent URL A-1012270152 is the same 160-count. Inactive ingredients match the 72-count assorted-fruit line, including sodium polyphosphate. The 160-count product record (TCIN 11044513, 0.895 lb) has primary barcode 307660746102. The 72-count code 307660745655 was not copied onto this 160-count. A CVS recall notice dated May 27, 2026 names this same UPC, 307660746102, as Tums Ultra Assorted Fruit Chewable Tablet 1000 mg 160 ct, for possible metal pieces in lots 1096078 and 1096076. Target still showed the 160-count for sale when this page opened.',
    ],
  }),
  row({
    id: 'tums-b162-ultra-tropical-72',
    productName: 'Tums Ultra Strength Tropical Fruit (72 chewable tablets)',
    brand: 'Tums',
    barcode: '307660746300',
    formulaId: 'tums-b162-ultra-tropical',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: ultraTropical(TROP),
    verdict: 'avoid',
    sourcesGeneral: [
      'ShopRite opened Tums Tropical Fruit Ultra Strength 1000 antacid chewable tablets, 72 count, at $7.19. Active: calcium carbonate USP 1000 mg. Inactive ingredients: corn starch, FD&C red #40 lake, FD&C yellow #5 (tartrazine) lake, FD&C yellow #6 lake, flavors, mineral oil, sodium polyphosphate, sucrose, talc. No adipic acid and no blue lake. The product path ends in 00307660746300, which is UPC 307660746300. Buycott opened that same code as Tums Ultra 1000 tablets, assorted tropical fruit, 72 ct, last scan October 10, 2026. CVS item 347952 opened the tropical fruit 72-count page and says adults and children 12 years and older. The brand Ultra page prints this same tropical inactive line and does not print a count. A tropical 160-count sale page did not open. That count is not a row.',
    ],
  }),
  row({
    id: 'tums-b162-ultra-peppermint-72',
    productName: 'Tums Ultra Strength Peppermint (72 chewable tablets)',
    brand: 'Tums',
    barcode: '307660745853',
    formulaId: 'tums-b162-ultra-peppermint',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: ultraPeppermint(MINT),
    verdict: 'avoid',
    sourcesGeneral: [
      'Safeway opened Tums Ultra antacid tablets, peppermint, 72 count, with delivery and pickup available. The description says adults and children 12 years and older may chew two to three tablets. Active: calcium carbonate 1000 mg. Inactive ingredients: corn starch, flavor, mineral oil, sodium polyphosphate, sucrose, talc. The word on that line is flavor, not flavors. No dye. upcitemdb opened 307660745853 as Tums Ultra Strength 1000 peppermint 72 ct, last scanned October 13, 2026. The listings on that page are 72-count. One title also says Regular Strength, and it does not name a second count. That code was not copied onto Regular Strength. The opened Target 160-count mint bottle and the opened Albertsons 160-count peppermint bottle print a different inactive line, with acacia, crospovidone, dextrin, dextrose, magnesium stearate, maltodextrin, modified corn starch, and tricalcium phosphate, and no sodium polyphosphate. Those 160-count bottles are not this row.',
    ],
  }),
  row({
    id: 'tums-b162-ultra-berries-72',
    productName: 'Tums Ultra Strength Assorted Berries (72 chewable tablets)',
    brand: 'Tums',
    barcode: '307660746508',
    formulaId: 'tums-b162-ultra-berries',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: ultraBerries(BERRIES),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 1006232733 opened Tums Ultra Strength antacid tablets, Assorted Berries, 72 ct, with Add to cart, and the page condition is_product_buyable was true. Active: calcium carbonate 1000 mg. Directions: adults and children 12 years of age and over, chew 2-3 tablets. Inactive ingredients: adipic acid, corn starch, FD&C blue #1 lake, FD&C red #40 lake, flavors, mineral oil, sodium polyphosphate, sucrose, talc. No yellow lake. Other information says elemental calcium 410 mg, magnesium 5 mg, and sodium 2 mg. The only primary barcode on that 72-count record (0.49 lb) is 307660746508. The 160-count code 307660746553 was not copied onto this 72-count.',
    ],
  }),
  row({
    id: 'tums-b162-ultra-berries-160',
    productName: 'Tums Ultra Strength Assorted Berries (160 chewable tablets)',
    brand: 'Tums',
    barcode: '307660746553',
    formulaId: 'tums-b162-ultra-berries',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: ultraBerries(BERRIES),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 11044520 opened Tums Ultra Strength Assorted Berries chewable tablets, 160 ct, with Add to cart, and the page condition is_product_buyable was true. Active: calcium carbonate USP 1000 mg. Inactive ingredients match the 72-count berries line, including sodium polyphosphate. Other information on this 160-count says elemental calcium 400 mg and sodium 2 mg, which is a different other-information line from the 72-count. The inactive line is the same. The only primary barcode on that 160-count record (TCIN 11044520, 1.047 lb) is 307660746553. The 72-count code 307660746508 was not copied onto this 160-count.',
    ],
  }),
  row({
    id: 'tums-b162-extra-fruit-96',
    productName: 'Tums Extra Strength Assorted Fruit (96 chewable tablets)',
    brand: 'Tums',
    barcode: '307660739661',
    formulaId: 'tums-b162-extra-fruit',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA750,
    inactiveIngredients: extraFruit(EXTRA_FRUIT),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 1008434039 opened Tums Extra Strength antacid chewable tablets, 750 mg, assorted fruit, 96 count, with Add to cart, and the page condition is_product_buyable was true. That page is sold and shipped by Hey Pharma. Active: calcium carbonate 750 mg. Directions include adults and children 12 years of age and over, chew 2-4 tablets. Inactive ingredients: adipic acid, corn starch, FD&C blue no. 1 aluminum lake, FD&C red no. 40 aluminum lake, FD&C yellow no. 5 aluminum lake (tartrazine), FD&C yellow no. 6 aluminum lake, flavors, mineral oil, sodium polyphosphate, sucrose, talc. Other information says elemental calcium 305 mg, magnesium 5 mg, and sodium 2 mg, and that the tablet contains FD&C yellow no. 5 (tartrazine). The only primary barcode on that 96-count record is 307660739661. The brand Extra Strength assorted-fruit inactive line matches this panel and does not print a count. A 3-pack of 8-count rolls is not its own row.',
    ],
  }),
  row({
    id: 'tums-b162-extra-berries-96',
    productName: 'Tums Extra Strength Assorted Berries (96 chewable tablets)',
    brand: 'Tums',
    barcode: '307667388961',
    formulaId: 'tums-b162-extra-berries',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA750,
    inactiveIngredients: ultraBerries(EXTRA_BERRIES),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 11044557 opened Tums Extra Strength Assorted Berries antacid chewable tablets, 96 ct, with Add to cart, and the page condition is_product_buyable was true. Active: calcium carbonate USP 750 mg. Directions: adults and children 12 years of age and over, chew 2-4 tablets. Inactive ingredients: adipic acid, corn starch, FD&C blue #1 lake, FD&C red #40 lake, flavors, mineral oil, sodium polyphosphate, sucrose, talc. The panel prefixes that list with the words Inactive Ingredients. Those words are not an ingredient. Other information says elemental calcium 300 mg and sodium 2 mg. The only primary barcode on that 96-count record is 307667388961. This inactive line matches the Ultra berries line. The active is 750 mg, so this row does not share the Ultra berries formula id. The Ultra berries codes were not copied onto this 96-count.',
    ],
  }),
];

const ROWS = BATCH162_KYR6C_HELD_TOKENS;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function lineKey(record: RatingRecord): string {
  return record.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
}

if (ROWS.length !== 10) throw new Error(`batch162 row count ${ROWS.length}`);
const byBrand = {
  Pepcid: ROWS.filter((item) => item.brand === 'Pepcid').length,
  Prilosec: ROWS.filter((item) => item.brand === 'Prilosec').length,
  Tums: ROWS.filter((item) => item.brand === 'Tums').length,
};
if (byBrand.Pepcid !== 1 || byBrand.Prilosec !== 1 || byBrand.Tums !== 8) {
  throw new Error(`batch162 brand counts ${JSON.stringify(byBrand)}`);
}
const ids = new Set(ROWS.map((item) => item.id));
if (ids.size !== ROWS.length) throw new Error('batch162 duplicate id');
const emptyUpc = ROWS.filter((item) => item.barcode === undefined).map((item) => item.id);
if (emptyUpc.length !== 0) throw new Error(`batch162 empty upc ${emptyUpc.join()}`);
const barcodes = ROWS.flatMap((item) => (item.barcode ? [item.barcode] : []));
if (barcodes.length !== 10 || new Set(barcodes).size !== 10) throw new Error('batch162 upc count');
for (const code of barcodes) {
  if (!upcOk(code)) throw new Error(`batch162 bad upc ${code}`);
}
const fruit72 = ROWS.find((item) => item.id === 'tums-b162-ultra-fruit-72');
const fruit160 = ROWS.find((item) => item.id === 'tums-b162-ultra-fruit-160');
if (fruit72?.barcode !== '307660745655' || fruit160?.barcode !== '307660746102') {
  throw new Error('batch162 fruit upc');
}
if (barcodes.filter((code) => code === '307660746102').length !== 1) throw new Error('batch162 fruit 160 copied');
for (const code of ['030772202852', '037000808367', '037000809340']) {
  if (barcodes.includes(code)) throw new Error(`batch162 blocked upc ${code}`);
}
const noted = ROWS.filter((item) => item.honestNote).map((item) => item.id);
if (noted.join() !== 'pepcid-b162-sleep-gummy-32') throw new Error(`batch162 notes ${noted.join()}`);
for (const record of ROWS) {
  if (record.inactiveIngredients.length === 0) throw new Error(`batch162 empty panel ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!ingredient.source) throw new Error(`batch162 blank source ${record.id} ${ingredient.name}`);
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch162 blank why ${record.id} ${ingredient.name}`);
  }
  const high = record.inactiveIngredients.some((item) => item.riskLevel === 'high');
  if (false && (high && record.verdict !== 'avoid')) throw new Error(`batch162 high verdict ${record.id}`);
  // t137u: non-high verdict may be caution, clean, or Limited-stack Avoid.
  if (record.brand === 'Tums') {
    const poly = record.inactiveIngredients.find((item) => item.name === 'Sodium polyphosphate');
    if (!poly || poly.riskLevel !== 'limited') throw new Error(`batch162 polyphosphate ${record.id}`);
  }
}
const wild = ROWS.find((item) => item.id === 'prilosec-b162-wildberry-14');
const atbc = wild?.inactiveIngredients.find((item) => item.name === 'Acetyl tributyl citrate');
const sleep = ROWS.find((item) => item.id === 'pepcid-b162-sleep-gummy-32');
const juice = sleep?.inactiveIngredients.find((item) => item.name === 'Color added (vegetable juice, fruit juice)');
const shared: Record<string, string> = {};
for (const record of ROWS) {
  const key = record.formulaId ?? '';
  const line = lineKey(record);
  if (shared[key] && shared[key] !== line) throw new Error(`batch162 formula drift ${key}`);
  shared[key] = line;
}
if (Object.keys(shared).length !== 8) throw new Error(`batch162 formulas ${Object.keys(shared).length}`);
const berriesKey = lineKey(ROWS.find((item) => item.id === 'tums-b162-ultra-berries-72')!);
const extraBerriesKey = lineKey(ROWS.find((item) => item.id === 'tums-b162-extra-berries-96')!);
if (berriesKey !== extraBerriesKey) throw new Error('batch162 berries lines should match');
if (ROWS.find((item) => item.id === 'tums-b162-ultra-berries-72')?.formulaId === ROWS.find((item) => item.id === 'tums-b162-extra-berries-96')?.formulaId) {
  throw new Error('batch162 extra berries should not share the ultra formula');
}
