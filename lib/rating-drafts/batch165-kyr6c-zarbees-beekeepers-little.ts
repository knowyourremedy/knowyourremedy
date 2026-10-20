// DRAFT / not verified / batch 165 KYR6-c Zarbee's, Beekeeper's Naturals, Little Remedies.
// US only. Missing packs only. Existing MAIN rows were not rewritten.
// A row exists only when that pack's panel was read and a page that
// opened showed that same count for sale. No bonus box, 2-pack, or kit.
//
// Held, not written. No live grade:
// Zarbee's Children's Sleep Chewable Tablet, 30-count and 50-count.
//   Vegetable protein isolate. Oligofructose. Natural Color.
//   That stop ends the rest of Zarbee's.
// Little Remedies Gripe Water.
//   Potassium benzoate.
//   That stop ends the rest of Little Remedies.
//
// TALLY: 10 written — Clean 3 / Caution 7 / Avoid 0.
// Zarbee's 4 (Caution 4). Beekeeper's 4 (Clean 2 / Caution 2). Little Remedies 2 (Clean 1 / Caution 1).
// UPC attached 10 / empty 0.
// Written-row ungraded tokens: 0.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const COLD = 'Cold & Flu';

const METH = {
  aloe: 'Methodology §5 Caution (aloe barbadensis leaf extract as an other ingredient).',
  benzoate: 'Methodology §5 Limited (sodium benzoate, synthetic preservative).',
  benzoic: 'Methodology §5 Limited (benzoic acid, synthetic preservative).',
  chicory: 'Methodology §5 Cleared (chicory root fiber, inulin family).',
  citric: 'Methodology §5 Cleared (citric acid).',
  flavors: 'Methodology §5 Limited (natural flavors). Exact natural flavors stays Limited.',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  honey: 'Methodology §5 Cleared (honey, oral).',
  monk: 'Methodology §5 Cleared (monk fruit / mogrosides, high-purity extract).',
  salt: 'Methodology §5 Cleared (sodium chloride, saline base).',
  sorbate: 'Methodology §5 Limited (potassium sorbate, synthetic preservative).',
  tapioca: 'Methodology §5 Cleared (tapioca syrup).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const KIDS_COUGH_ALTS: CleanAlternative[] = [
  alt(
    'genexa-kids-multi-cold-flu-liquid',
    'Independently Clean kids cold liquid already on main. Minimum age 4, higher than this bottle. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'boiron-chestal-kids-pellets',
    'Independently Clean kids cough pellets already on main. Minimum age 4. Form labeled, not a hard filter (§6).',
  ),
];

const SALINE_ALTS: CleanAlternative[] = [
  alt(
    'xlear-nasal-spray-no-bkc',
    'Independently Clean saline nasal spray already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'neilmed-sinus-rinse',
    'Independently Clean saline rinse packets already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
];

const ADULT_THROAT_ALTS: CleanAlternative[] = [
  alt(
    'beekeepers-propolis-throat-spray',
    'Independently Clean propolis throat spray already on main. Form labeled, not a hard filter (§6).',
  ),
];

const HONEY_BASE = "Zarbee's honey syrup panel (water, natural flavor, citric acid)";
const Z_SALINE = "Zarbee's Soothing Saline Nasal Mist with Aloe brand panel";
const B_DAY = "Beekeeper's Naturals Daytime Propolis Cough Syrup brand panel";
const B_LOZ = "Beekeeper's Naturals Soothing Lozenges panel";
const B_KIDS = "Beekeeper's Naturals Kid's Propolis Immune Support Throat Spray brand panel";
const LR_DROPS = 'Little Remedies Saline Spray + Drops brand panel';
const LR_MIST = 'Little Remedies Sterile Saline Nasal Mist brand panel';

function honeyBase(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Water', 'cleared', METH.water),
    flag(panel, 'Natural flavor', 'limited', METH.flavors),
    flag(panel, 'Citric acid', 'cleared', METH.citric),
  ];
}

function lozengeLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Chicory root fiber', 'cleared', METH.chicory),
    flag(panel, 'Honey', 'cleared', METH.honey),
    flag(panel, 'Tapioca syrup', 'cleared', METH.tapioca),
    flag(panel, 'Monk fruit', 'cleared', METH.monk),
  ];
}

export const BATCH165_KYR6C_ZARBEES_BEEKEEPERS_LITTLE: RatingRecord[] = [
  {
    id: 'zarbees-b165-baby-cough-grape-2',
    productName: "Zarbee's Baby Cough Syrup + Immune with Honey, Natural Grape (2 fl oz)",
    brand: "Zarbee's",
    category: COLD,
    barcode: '897233709011',
    formulaId: 'zarbees-b165-honey-base',
    audience: KIDS,
    minAge: 1,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Dark honey', strength: 'label serving' },
      { name: 'Zinc (as zinc gluconate)', strength: 'label serving' },
    ],
    inactiveIngredients: honeyBase(HONEY_BASE),
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: KIDS_COUGH_ALTS,
    sourcesGeneral: [
      "Zarbee's baby cough syrup page lists Cherry and Grape. The grape panel that opened: proprietary blend of dark honey; zinc (as zinc gluconate); water, natural flavor, citric acid. Ages 1 year to 3 years, 3 mL. Not for under 1 year because it contains honey. Target TCIN 83650652 opened the natural grape 2 fl oz at $6.99, barcode 897233709011. Barcode Index ties 897233709011 to this 2 ounce grape bottle. That code stays on this 2 fl oz grape bottle.",
    ],
  },
  {
    id: 'zarbees-b165-baby-cough-peach-2',
    productName: "Zarbee's Soothing Baby Cough Syrup, Natural Peach and Honey (2 fl oz)",
    brand: "Zarbee's",
    category: COLD,
    barcode: '897233709042',
    formulaId: 'zarbees-b165-honey-base',
    audience: KIDS,
    minAge: 1,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [{ name: 'Dark honey', strength: 'label serving' }],
    inactiveIngredients: honeyBase(HONEY_BASE),
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: KIDS_COUGH_ALTS,
    sourcesGeneral: [
      "Zarbee's soothing baby cough page: proprietary blend of dark honey; water, natural flavor, citric acid. Natural peach and honey flavor. Ages 12 to 24 months. Not for under 12 months because it contains honey. No zinc on this panel, so it is not the grape immune bottle. The inactive line matches that grape bottle, so this row reuses formula zarbees-b165-honey-base. Target TCIN 83650656 opened the 2 fl oz peach and honey bottle at $6.99, barcode 897233709042. The grape code 897233709011 was not copied here.",
    ],
  },
  {
    id: 'zarbees-b165-mucus-day-8',
    productName: "Zarbee's Kid's Cough + Mucus Day, Mixed Berry (8 fl oz)",
    brand: "Zarbee's",
    category: COLD,
    barcode: '300450664051',
    formulaId: 'zarbees-b165-honey-base',
    audience: KIDS,
    minAge: 2,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Dark honey', strength: 'label serving' },
      { name: 'English ivy (Hedera helix) leaf extract', strength: 'label serving' },
      { name: 'Black elderberry (Sambucus nigra)', strength: 'label serving' },
      { name: 'Zinc (as zinc gluconate)', strength: 'label serving' },
    ],
    inactiveIngredients: honeyBase(HONEY_BASE),
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: KIDS_COUGH_ALTS,
    sourcesGeneral: [
      "Zarbee's Kid's Cough + Mucus Day panel and the Kenvue professional page: grade A proprietary blend of dark honey, English ivy leaf extract, black elderberry, zinc (as zinc gluconate); water, natural flavor, citric acid. Ages 2 to 6 years. The inactive line matches the baby honey syrups, so this row reuses formula zarbees-b165-honey-base. Target opened the mixed berry 8 fl oz with Add to cart, TCIN 87824548. Kenvue also lists a 4 fl oz. No 4 fl oz sale page opened, so that size is not a row. DSLD label 302827 ties barcode 300450664051 to this 8 fl oz daytime bottle, and its other ingredients are water, natural flavor, citric acid. The 4 fl oz code 300450664075 was not copied here. The day/night value pack is a kit and is not a row.",
    ],
  },
  {
    id: 'zarbees-b165-saline-3',
    productName: "Zarbee's Soothing Saline Nasal Mist with Aloe (3 oz)",
    brand: "Zarbee's",
    category: COLD,
    barcode: '857647007165',
    formulaId: 'zarbees-b165-saline',
    audience: KIDS,
    minAge: 0,
    form: 'nasal mist',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sodium chloride', strength: 'saline mist' }],
    inactiveIngredients: [
      flag(Z_SALINE, 'Water', 'cleared', METH.water),
      flag(Z_SALINE, 'Sodium chloride', 'cleared', METH.salt),
      flag(Z_SALINE, 'Aloe (aloe barbadensis) leaf extract', 'limited', METH.aloe),
    ],
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: SALINE_ALTS,
    sourcesGeneral: [
      "Zarbee's saline mist page: water, sodium chloride, aloe (aloe barbadensis) leaf extract. Ages 0 months and up. Sodium chloride is the saline. Aloe leaf extract is the Caution. Target TCIN 75456131 opened the 3 oz at $5.99, barcode 857647007165.",
    ],
  },
  {
    id: 'beekeepers-b165-cough-day-4',
    productName: "Beekeeper's Naturals Daytime Propolis Cough Syrup (4 fl oz)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '628055142843',
    formulaId: 'beekeepers-b165-cough-day',
    audience: ADULT,
    minAge: 12,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Unpasteurized buckwheat honey', strength: 'label serving' },
      { name: 'Wildflower honey', strength: 'label serving' },
      { name: 'Elderberry fruit extract', strength: 'label serving' },
      { name: 'Bee propolis extract', strength: 'label serving' },
      { name: 'Ivy leaf extract', strength: 'label serving' },
      { name: 'Grape seed extract', strength: 'label serving' },
      { name: 'Olive leaf extract', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(B_DAY, 'Glycerin', 'cleared', METH.glycerin),
      flag(B_DAY, 'Purified water', 'cleared', METH.water),
      flag(B_DAY, 'Citric acid', 'cleared', METH.citric),
      flag(B_DAY, 'Potassium sorbate', 'limited', METH.sorbate),
    ],
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: ADULT_THROAT_ALTS,
    sourcesGeneral: [
      "Beekeeper's daytime cough syrup page is for sale at $9.99. Ingredients that opened: unpasteurized buckwheat honey, wildflower honey, elderberry fruit extract, bee propolis extract, ivy leaf extract, grape seed extract, olive leaf extract, glycerin, purified water, citric acid, potassium sorbate. Adults and children 12 and older. The brand page does not print a bottle size. Target opened Daytime Propolis Cough Syrup, 4 fl oz, TCIN 86258475, with Add to cart. Amazon US lists that 4 oz with model 0628055142843. That is UPC 628055142843, and it stays on this 4 fl oz. Amazon marketing text also says chaga. The brand ingredient list that opened does not include chaga, so chaga is not on this row.",
    ],
  },
  {
    id: 'beekeepers-b165-lozenges-14',
    productName: "Beekeeper's Naturals Soothing Lozenges (14 lozenges)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '628055142508',
    formulaId: 'beekeepers-b165-lozenges',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Bee propolis extract', strength: '25 mg' },
      { name: 'Zinc (as zinc gluconate)', strength: '3 mg' },
      { name: 'Vitamin D (as cholecalciferol)', strength: '7.5 mcg (1500 IU)' },
    ],
    inactiveIngredients: lozengeLine(B_LOZ),
    verdict: 'clean',
    retailers: ['Target'],
    sourcesGeneral: [
      "The brand lozenge page sells 24 lozenges at $9.99 and lists bee propolis extract, zinc, vitamin D, honey, chicory root fiber, tapioca syrup, monk fruit. The 14-count other-ingredients line that opened is chicory root fiber, honey, tapioca syrup, monk fruit, with bee propolis extract 25 mg, zinc 3 mg, and vitamin D 7.5 mcg. Ages 12 and older. Target TCIN 86258476 opened the honey 14-count at $5.99. Grove lists that 14-count in stock with GTIN 628055142508. Barcode Index ties 628055142508 to the 14-count. That code stays on the 14-count.",
    ],
  },
  {
    id: 'beekeepers-b165-lozenges-24',
    productName: "Beekeeper's Naturals Soothing Lozenges (24 lozenges)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '834706002682',
    formulaId: 'beekeepers-b165-lozenges',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Bee propolis extract', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
      { name: 'Vitamin D', strength: 'label serving' },
    ],
    inactiveIngredients: lozengeLine(B_LOZ),
    verdict: 'clean',
    retailers: ["Beekeeper's Naturals"],
    sourcesGeneral: [
      "Beekeeper's lozenge page opened 24 lozenges for sale at $9.99. The ingredient line matches the 14-count, so this row reuses formula beekeepers-b165-lozenges. The brand product record for this 24-lozenge page lists barcode 834706002682. The 14-count code 628055142508 was not copied here.",
    ],
  },
  {
    id: 'beekeepers-b165-kids-throat-1',
    productName: "Beekeeper's Naturals Kid's Propolis Immune Support Throat Spray (1 fl oz)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '628055142195',
    formulaId: 'beekeepers-b165-kids-throat',
    audience: KIDS,
    minAge: 1,
    form: 'throat spray',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [{ name: 'Bee propolis extract', strength: '77.5 mg' }],
    inactiveIngredients: [
      flag(B_KIDS, 'Vegetable glycerin', 'cleared', METH.glycerin),
      flag(B_KIDS, 'Purified water', 'cleared', METH.water),
      flag(B_KIDS, 'Buckwheat honey', 'cleared', METH.honey),
      flag(B_KIDS, 'Natural flavors', 'limited', METH.flavors),
    ],
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: KIDS_COUGH_ALTS,
    sourcesGeneral: [
      "Beekeeper's kids throat spray page is for sale at $13.99. Ingredients that opened: bee propolis extract, vegetable glycerin, purified water, buckwheat honey, natural flavors. The same page says 77.5 mg propolis per serving and ages 1 and older. This is not the adult throat spray already on main (85 mg, wildflower honey, no natural flavors). Target opened the 1 fl oz kids spray, TCIN 86258480. Amazon US ties UPC 628055142195 to the 1.06 oz kids spray. That code stays on this 1 fl oz. The 4-pack is not its own row. A 15 mL travel size was priced on Target and its panel was not opened, so it is not a row.",
    ],
  },
  {
    id: 'little-remedies-b165-saline-drops-1',
    productName: 'Little Remedies Saline Spray + Drops (1 fl oz)',
    brand: 'Little Remedies',
    category: COLD,
    barcode: '756184120118',
    formulaId: 'little-remedies-b165-saline-drops',
    audience: KIDS,
    minAge: 0,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sodium chloride', strength: 'saline' }],
    inactiveIngredients: [
      flag(LR_DROPS, 'Water', 'cleared', METH.water),
      flag(LR_DROPS, 'Sodium chloride', 'cleared', METH.salt),
      flag(LR_DROPS, 'Glycerin', 'cleared', METH.glycerin),
      flag(LR_DROPS, 'Sodium benzoate', 'limited', METH.benzoate),
      flag(LR_DROPS, 'Benzoic acid', 'limited', METH.benzoic),
    ],
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: SALINE_ALTS,
    sourcesGeneral: [
      'Little Remedies Saline Spray + Drops page: water, sodium chloride, glycerin, sodium benzoate, benzoic acid. Newborns and infants, and children and adults. One bottle is used as drops or as a spray, so it is one row. Target TCIN 52654995 opened the 1 fl oz at $3.99. Dollar General showed the 1 fl oz in stock. GL Medical Supplies lists UPC 756184120118 on the 1 oz in stock. That code stays on this 1 fl oz. It is not the gas-drops code already on main.',
    ],
  },
  {
    id: 'little-remedies-b165-saline-mist-3',
    productName: 'Little Remedies Sterile Saline Nasal Mist (3 fl oz)',
    brand: 'Little Remedies',
    category: COLD,
    barcode: '756184000090',
    formulaId: 'little-remedies-b165-saline-mist',
    audience: KIDS,
    minAge: 0,
    form: 'nasal mist',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sodium chloride', strength: 'saline mist' }],
    inactiveIngredients: [
      flag(LR_MIST, 'Water', 'cleared', METH.water),
      flag(LR_MIST, 'Sodium chloride', 'cleared', METH.salt),
    ],
    verdict: 'clean',
    retailers: ['Target', 'Walgreens'],
    sourcesGeneral: [
      'Little Remedies sterile saline mist page: water, sodium chloride. Preservative-free. Target TCIN 11199183 opened the 3 fl oz at $5.59. Walgreens lists the 3.0 oz. UPC 756184000090 is tied to that 3 fl oz on the shop page and on upcitemdb. The 1 fl oz spray-and-drops code 756184120118 was not copied here. This inactive line is not the spray-and-drops line.',
    ],
  },
];

const ROWS = BATCH165_KYR6C_ZARBEES_BEEKEEPERS_LITTLE;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function lineKey(record: RatingRecord): string {
  return record.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
}

if (ROWS.length !== 10) throw new Error(`batch165 row count ${ROWS.length}`);

const expected = [
  ['zarbees-b165-baby-cough-grape-2', 'caution', '897233709011', 'zarbees-b165-honey-base', 1],
  ['zarbees-b165-baby-cough-peach-2', 'caution', '897233709042', 'zarbees-b165-honey-base', 1],
  ['zarbees-b165-mucus-day-8', 'caution', '300450664051', 'zarbees-b165-honey-base', 2],
  ['zarbees-b165-saline-3', 'caution', '857647007165', 'zarbees-b165-saline', 0],
  ['beekeepers-b165-cough-day-4', 'caution', '628055142843', 'beekeepers-b165-cough-day', 12],
  ['beekeepers-b165-lozenges-14', 'clean', '628055142508', 'beekeepers-b165-lozenges', 12],
  ['beekeepers-b165-lozenges-24', 'clean', '834706002682', 'beekeepers-b165-lozenges', 12],
  ['beekeepers-b165-kids-throat-1', 'caution', '628055142195', 'beekeepers-b165-kids-throat', 1],
  ['little-remedies-b165-saline-drops-1', 'caution', '756184120118', 'little-remedies-b165-saline-drops', 0],
  ['little-remedies-b165-saline-mist-3', 'clean', '756184000090', 'little-remedies-b165-saline-mist', 0],
] as const;

for (const [id, verdict, barcode, formulaId, minAge] of expected) {
  const record = ROWS.find((item) => item.id === id);
  if (!record) throw new Error(`batch165 missing ${id}`);
  if (record.verdict !== verdict || (record.barcode ?? '') !== barcode || record.formulaId !== formulaId || record.minAge !== minAge) {
    throw new Error(`batch165 mismatch ${id}`);
  }
  if (barcode && !upcOk(barcode)) throw new Error(`batch165 bad upc ${barcode}`);
  if (!barcode && record.barcode) throw new Error(`batch165 unexpected upc ${id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch165 note ${id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch165 blank why ${id} ${ingredient.name}`);
  }
}

const barcodes = ROWS.map((item) => item.barcode).filter((code): code is string => Boolean(code));
if (new Set(barcodes).size !== 10) throw new Error('batch165 upc copy');

const honey = lineKey(ROWS.find((item) => item.id === 'zarbees-b165-baby-cough-grape-2')!);
const peach = lineKey(ROWS.find((item) => item.id === 'zarbees-b165-baby-cough-peach-2')!);
const mucus = lineKey(ROWS.find((item) => item.id === 'zarbees-b165-mucus-day-8')!);
if (honey !== peach || honey !== mucus) throw new Error('batch165 honey base should match');

const loz14 = lineKey(ROWS.find((item) => item.id === 'beekeepers-b165-lozenges-14')!);
const loz24 = lineKey(ROWS.find((item) => item.id === 'beekeepers-b165-lozenges-24')!);
if (loz14 !== loz24) throw new Error('batch165 lozenge lines should match');

const drops = lineKey(ROWS.find((item) => item.id === 'little-remedies-b165-saline-drops-1')!);
const mist = lineKey(ROWS.find((item) => item.id === 'little-remedies-b165-saline-mist-3')!);
if (drops === mist) throw new Error('batch165 saline lines should differ');

if (ROWS.some((item) => item.brand === 'Afrin' || item.brand === 'Sprouts')) {
  throw new Error('batch165 closed brand');
}
