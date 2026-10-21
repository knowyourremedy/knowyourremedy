// DRAFT / not verified / batch 167 KYR6-c cough, nighttime, saline, and fever.
// US only. A row exists only when that pack's panel was read and a page
// that opened showed that same count for sale. No 2-pack or kit.
// Barcode-only attaches for the mucus 8 fl oz and the 24 lozenges stay in batch165.
//
// Held, not written. Ungraded inactive:
// Beekeeper's Nasal Spray Max, 1 fl oz.
//   poly-epsilon lysine. nisin.
//   eucalyptus globulus leaf extract. origanum vulgare leaf extract.
//
// TALLY: 5 written — Clean 0 / Caution 5 / Avoid 0.
// UPC attached 4 / empty 1.
// Empty: Zarbee's Kid's Cough + Immune Day 4 fl oz.
// Written-row ungraded tokens: 0.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const COLD = 'Cold & Flu';
const PAIN = 'Pain & Fever';

const METH = {
  aloe: 'Methodology §5 Caution (aloe barbadensis leaf juice as an other ingredient).',
  benzoic: 'Methodology §5 Caution (benzoic acid).',
  benzoate: 'Methodology §5 Limited (sodium benzoate, synthetic preservative).',
  botanical: 'Methodology §5 Cleared (named food or botanical extract as an oral inactive).',
  citric: 'Methodology §5 Cleared (citric acid).',
  flavorNamed: 'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  flavors: 'Methodology §5 Limited (natural flavors). Exact natural flavors stays Limited.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  grape: 'Methodology §5 Cleared (grape seed extract as an other ingredient, not the oil).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose, cellulose gum family).',
  salt: 'Methodology §5 Cleared (sodium chloride, saline base).',
  sorbate: 'Methodology §5 Limited (potassium sorbate, synthetic preservative).',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u; was Limited.',
  water: 'Methodology §5 Cleared (water / purified water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
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
    'Independently Clean saline nasal spray already on main. Minimum age 2, higher than this mist. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'neilmed-sinus-rinse',
    'Independently Clean saline rinse packets already on main. Minimum age 2, higher than this mist. Form labeled, not a hard filter (§6).',
  ),
];

const ADULT_THROAT_ALTS: CleanAlternative[] = [
  alt(
    'beekeepers-propolis-throat-spray',
    'Independently Clean propolis throat spray already on main. Form labeled, not a hard filter (§6).',
  ),
];

const FEVER_ALTS: CleanAlternative[] = [
  alt(
    'genexa-infants-apap-liquid',
    'Independently Clean infant acetaminophen liquid already on main. Same active. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'genexa-kids-apap-liquid',
    'Independently Clean kids acetaminophen liquid already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
];

const IMMUNE = "Zarbee's Kid's Cough + Immune Day brand panel";
const ADULT_NIGHT = "Grove 4 oz Beekeeper's Naturals Nighttime Propolis Cough Syrup panel";
const KIDS_NIGHT = "Grove 4 oz Beekeeper's Naturals Kids Nighttime Cough Syrup panel";
const SALINE = "Beekeeper's Naturals Kid's Saline Nasal Mist brand panel";
const FEVER = 'Amazon Little Remedies Infant Fever and Pain Reliever Natural Berry 2 fl oz panel';

function honeyCarriers(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Water', 'cleared', METH.water),
    flag(panel, 'Natural flavor', 'limited', METH.flavors),
    flag(panel, 'Citric acid', 'cleared', METH.citric),
  ];
}

function nightCarriers(panel: string, lemonBalm: boolean): IngredientFlag[] {
  const line = [
    flag(panel, 'Grape seed extract', 'cleared', METH.grape),
    flag(panel, 'Glycerin', 'cleared', METH.glycerin),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Citric acid', 'cleared', METH.citric),
    flag(panel, 'Potassium sorbate', 'limited', METH.sorbate),
  ];
  if (lemonBalm) {
    line.unshift(flag(panel, 'Lemon balm extract', 'cleared', METH.botanical));
  }
  return line;
}

export const BATCH167_KYR6C_COUGH_NIGHT_FEVER: RatingRecord[] = [
  {
    id: 'zarbees-b167-immune-day-4',
    productName: "Zarbee's Kid's Cough + Immune Day, Natural Mixed Berry (4 fl oz)",
    brand: "Zarbee's",
    category: COLD,
    formulaId: 'zarbees-b165-honey-base',
    audience: KIDS,
    minAge: 2,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Dark honey', strength: 'label serving' },
      { name: 'Black elderberry (Sambucus nigra) fruit extract', strength: 'label serving' },
      { name: 'Vitamin D3 (as cholecalciferol)', strength: 'label serving' },
      { name: 'Zinc (as zinc gluconate)', strength: 'label serving' },
    ],
    inactiveIngredients: honeyCarriers(IMMUNE),
    verdict: 'caution',
    retailers: ['CVS'],
    cleanAlternatives: KIDS_COUGH_ALTS,
    sourcesGeneral: [
      "Zarbee's Kid's Cough + Immune Day page: proprietary blend of dark honey, black elderberry (Sambucus nigra) fruit extract, vitamin D3 (as cholecalciferol), zinc (as zinc gluconate); water, natural flavor, citric acid. Ages 2 through 12 years, 1 tsp (5 mL). The inactive line matches formula zarbees-b165-honey-base, so this row reuses it. The brand page does not name a bottle size. Instacart opened the CVS 4 fl oz at $12.49. No page that opened tied a 12-digit code to this 4 fl oz alone, so the barcode is empty. The day/night value pack is a kit and is not a row.",
    ],
  },
  {
    id: 'beekeepers-b167-night-adult-4',
    productName: "Beekeeper's Naturals Nighttime Propolis Cough Syrup (4 fl oz)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '628055142850',
    formulaId: 'beekeepers-b167-night-adult',
    audience: ADULT,
    minAge: 12,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Unpasteurized buckwheat honey', strength: 'label serving' },
      { name: 'Elderberry fruit extract', strength: 'label serving' },
      { name: 'Bee propolis extract', strength: 'label serving' },
      { name: 'Melatonin', strength: 'label serving' },
      { name: 'L-theanine', strength: 'label serving' },
    ],
    inactiveIngredients: nightCarriers(ADULT_NIGHT, true),
    verdict: 'caution',
    retailers: ['Grove'],
    cleanAlternatives: ADULT_THROAT_ALTS,
    sourcesGeneral: [
      "Grove opened Nighttime Propolis Cough Syrup, 4 oz, at $9.49, in stock, gtin12 628055142850. Ingredients on that page: unpasteurized buckwheat honey, elderberry fruit extract, bee propolis extract, melatonin, L-theanine, lemon balm extract, grape seed extract, glycerin, purified water, citric acid, potassium sorbate. Adults and children ages 12 and older, two teaspoons. The brand nighttime page is for sale at $9.99 and does not name a bottle size. That brand list adds wildflower honey, ivy leaf, and chamomile and does not list melatonin or L-theanine, so it is not this 4 oz row. The daytime 4 fl oz code 628055142843 was not copied here.",
    ],
  },
  {
    id: 'beekeepers-b167-night-kids-4',
    productName: "Beekeeper's Naturals Kids Nighttime Honey Cough Syrup (4 fl oz)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '628055142522',
    formulaId: 'beekeepers-b167-night-kids',
    audience: KIDS,
    minAge: 1,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Buckwheat honey', strength: 'label serving' },
      { name: 'Elderberry fruit extract', strength: 'label serving' },
      { name: 'Bee propolis extract', strength: 'label serving' },
      { name: 'Vitamin D', strength: 'label serving' },
      { name: 'Vitamin C', strength: 'label serving' },
    ],
    inactiveIngredients: nightCarriers(KIDS_NIGHT, false),
    verdict: 'caution',
    retailers: ['Grove'],
    cleanAlternatives: KIDS_COUGH_ALTS,
    sourcesGeneral: [
      "Grove opened Kids Nighttime Cough Syrup, 4 oz, at $8.78, in stock, gtin12 628055142522. Ingredients on that page: buckwheat honey, elderberry fruit extract, bee propolis extract, vitamin D, vitamin C, grape seed extract, glycerin, purified water, citric acid, potassium sorbate. The page says children ages 1 to 12. The brand kids nighttime page is for sale at $9.99 and does not name a bottle size. That brand list adds wildflower honey, chamomile, and ivy leaf and does not list vitamin D or vitamin C, so it is not this 4 oz row. The adult nighttime code 628055142850 was not copied here. A day/night combo is a kit and is not a row.",
    ],
  },
  {
    id: 'beekeepers-b167-kids-saline-3',
    productName: "Beekeeper's Naturals Kid's Saline Nasal Mist (3 fl oz)",
    brand: "Beekeeper's Naturals",
    category: COLD,
    barcode: '834706001586',
    formulaId: 'beekeepers-b167-kids-saline',
    audience: KIDS,
    minAge: 1,
    form: 'nasal mist',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [{ name: 'Propolis extract', strength: 'nasal mist' }],
    inactiveIngredients: [
      flag(SALINE, 'Water', 'cleared', METH.water),
      flag(SALINE, 'Sodium chloride', 'cleared', METH.salt),
      flag(SALINE, 'Aloe (Vera) barbadensis leaf juice (inner fillet)', 'limited', METH.aloe),
    ],
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: SALINE_ALTS,
    sourcesGeneral: [
      "Beekeeper's kids saline page: saline solution (water, sodium chloride), aloe (vera) barbadensis leaf juice (inner fillet), propolis extract. Ages 1 and older. The brand page does not name a bottle size. Target TCIN 1010846649 opened the 3 fl oz at $8.99, primary barcode 834706001586. The brand product record lists that same barcode. The adult nasal spray code 834706000213 was not copied here.",
    ],
  },
  {
    id: 'little-remedies-b167-fever-berry-2',
    productName: 'Little Remedies Infant Fever and Pain Reliever, Natural Berry (2 fl oz)',
    brand: 'Little Remedies',
    category: PAIN,
    barcode: '756184101766',
    formulaId: 'little-remedies-b167-fever-berry',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '160 mg / 5 mL' }],
    inactiveIngredients: [
      flag(FEVER, 'Benzoic acid', 'limited', METH.benzoic),
      flag(FEVER, 'Carboxymethylcellulose', 'cleared', METH.cmc),
      flag(FEVER, 'Glycerin', 'cleared', METH.glycerin),
      flag(FEVER, 'Natural berry flavor', 'cleared', METH.flavorNamed),
      flag(FEVER, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      flag(FEVER, 'Sucrose', 'cleared', METH.sucrose),
      flag(FEVER, 'Sodium benzoate', 'limited', METH.benzoate),
      flag(FEVER, 'Water', 'cleared', METH.water),
      flag(FEVER, 'Xanthan gum', 'cleared', METH.xanthan),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    cleanAlternatives: FEVER_ALTS,
    sourcesGeneral: [
      'Amazon opened Little Remedies Infant Fever and Pain Reliever, Natural Berry, 2 fl oz, at $6.70, in stock. Active ingredient: acetaminophen 160 mg in each 5 mL. Inactive ingredients on that page: benzoic acid, carboxymethylcellulose, glycerin, natural berry flavor, microcrystalline cellulose, sucrose, sodium benzoate, water, xanthan gum. UPC 756184101766 is printed on that 2 fl oz page. The brand infant page prints natural grape flavor and does not name a bottle size, so the grape line is not this row. A 2-pack is not a row.',
    ],
  },
];

const ROWS = BATCH167_KYR6C_COUGH_NIGHT_FEVER;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch167 row count ${ROWS.length}`);

const expected = [
  ['zarbees-b167-immune-day-4', 'caution', '', 'zarbees-b165-honey-base', 2],
  ['beekeepers-b167-night-adult-4', 'caution', '628055142850', 'beekeepers-b167-night-adult', 12],
  ['beekeepers-b167-night-kids-4', 'caution', '628055142522', 'beekeepers-b167-night-kids', 1],
  ['beekeepers-b167-kids-saline-3', 'caution', '834706001586', 'beekeepers-b167-kids-saline', 1],
  ['little-remedies-b167-fever-berry-2', 'caution', '756184101766', 'little-remedies-b167-fever-berry', 0],
] as const;

for (const [id, verdict, barcode, formulaId, minAge] of expected) {
  const record = ROWS.find((item) => item.id === id);
  if (!record) throw new Error(`batch167 missing ${id}`);
  if (record.verdict !== verdict || (record.barcode ?? '') !== barcode || record.formulaId !== formulaId || record.minAge !== minAge) {
    throw new Error(`batch167 mismatch ${id}`);
  }
  if (barcode && !upcOk(barcode)) throw new Error(`batch167 bad upc ${barcode}`);
  if (!barcode && record.barcode) throw new Error(`batch167 unexpected upc ${id}`);
  if (record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(record.honestNote)) throw new Error(`batch167 note ${id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch167 blank why ${id} ${ingredient.name}`);
    if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch167 dailymed ${id}`);
  }
  if (/dailymed/i.test((record.sourcesGeneral ?? []).join(' '))) throw new Error(`batch167 dailymed source ${id}`);
}

const barcodes = ROWS.map((item) => item.barcode).filter((code): code is string => Boolean(code));
if (new Set(barcodes).size !== 4) throw new Error('batch167 upc copy');
