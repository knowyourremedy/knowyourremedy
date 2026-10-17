// DRAFT / not verified / batch 206 KYR6-c (t96u WRITE).
// Rainbow Light three packs — brand Supplement Facts OI only; actives ungraded.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const SUPPLEMENT = 'Supplement' as const;

const MCT_UNLABELED_TAP =
  'Label says MCT / medium chain triglycerides and does not name coconut on that token. Limited because the source is not clear. Not the gummy seed-oil High rule.';

const METH = {
  gelatinCap: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic vegetable glycerin).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / vegetable magnesium stearate).',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  potassiumSorbate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate).',
  purifiedWater: 'Methodology §5 Cleared (purified water / distilled water).',
  ricePowder:
    'Methodology §5 Caution (Rice Powder — exact token; distinct from Cleared rice hull / rice bran; locked Sept 16, 2026).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide, oral).',
  veganCapsule:
    'Methodology §5 Caution (Vegan Capsule — unnamed vegetable / vegetarian capsule shell; t90u Oct 17, 2026).',
} as const;

type MethKey = keyof typeof METH;
type FlagSpec = [name: string, risk: RiskLevel, meth: MethKey];

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function buildOi(panel: string, specs: FlagSpec[]): IngredientFlag[] {
  return specs.map(([name, risk, key]) => flag(panel, name, risk, METH[key]));
}

type RowSpec = {
  id: string;
  labelUrl: string;
  productName: string;
  category: string;
  form: RatingRecord['form'];
  barcode: string;
  retailers: string[];
  saleUrlA: string;
  saleUrlB: string;
  active: string;
  flags: FlagSpec[];
  oiLine: string;
  sourceNote?: string;
};

const SPECS: RowSpec[] = [
  {
    id: 'rainbow-b206-nad-resveratrol-collagen-60',
    labelUrl:
      'https://www.rainbowlight.com/products/nad-trans-resveratrol-multi-collagen-60-rapid-release-capsules-rl28681',
    productName: 'Rainbow Light NAD+ Trans-Resveratrol Multi Collagen, 60 Rapid Release Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584888',
    retailers: ['PureFormulas', 'HiLife Vitamins'],
    saleUrlA:
      'https://www.pureformulas.com/product/nad-trans-resveratrol-multi-collagen-by-rainbow-light/1000070005',
    saleUrlB: 'https://hilifevitamins.com/products/rainbow-light-850068584888',
    active: 'NAD+ trans-resveratrol multi collagen blend',
    oiLine:
      'Gelatin Capsule, Vegetable Magnesium Stearate, Rice Powder, Silica. Contains egg and fish (tilapia) ingredients.',
    sourceNote: 'Contains allergen line not graded.',
    flags: [
      ['Gelatin Capsule', 'cleared', 'gelatinCap'],
      ['Vegetable Magnesium Stearate', 'cleared', 'magStearate'],
      ['Rice Powder', 'limited', 'ricePowder'],
      ['Silica', 'limited', 'silica'],
    ],
  },
  {
    id: 'rainbow-b206-nettle-leaf-liquid-2oz',
    labelUrl:
      'https://www.rainbowlight.com/products/nettle-leaf-liquid-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl40414',
    productName: 'Rainbow Light Nettle Leaf Liquid Extract Alcohol Free, 2 fl oz',
    category: DIGESTIVE,
    form: 'liquid',
    barcode: '850068584314',
    retailers: ['PureFormulas', 'Green Bay Essentials'],
    saleUrlA:
      'https://www.pureformulas.com/product/super-concentrated-nettle-leaf-traditional-herbal-tonic-alcohol-free-by-rainbow-light/1000070012',
    saleUrlB:
      'https://greenbayessentials.com/product/rainbow-light-nettle-leaf-fast-acting-alcohol-free-2-oz/',
    active: 'Nettle leaf extract',
    oiLine: 'Vegetable Glycerin, Purified Water, Potassium Sorbate (For Freshness).',
    flags: [
      ['Vegetable Glycerin', 'cleared', 'glycerin'],
      ['Purified Water', 'cleared', 'purifiedWater'],
      ['Potassium Sorbate (For Freshness)', 'limited', 'potassiumSorbate'],
    ],
  },
  {
    id: 'rainbow-b206-magnesium-glycinate-325-120',
    labelUrl: 'https://www.rainbowlight.com/products/magnesium-glycinate-325-mg-120-vegan-capsules-rl4399',
    productName: 'Rainbow Light Magnesium Glycinate 325 mg, 120 Vegan Capsules',
    category: VITAMINS,
    form: 'capsule',
    barcode: '850068584529',
    retailers: ['PureFormulas', 'Green Bay Essentials'],
    saleUrlA:
      'https://www.pureformulas.com/product/high-absorption-magnesium-glycinate-325-mg-by-rainbow-light/1000069998',
    saleUrlB:
      'https://greenbayessentials.com/product/rainbow-light-magnesium-glycinate-325-mg-vegetarian-and-gluten-free-120/',
    active: 'Magnesium glycinate',
    oiLine: 'Vegan Capsule, Silica, MCT.',
    flags: [
      ['Vegan Capsule', 'limited', 'veganCapsule'],
      ['Silica', 'limited', 'silica'],
      ['MCT', 'limited', 'mctUnlabeled'],
    ],
  },
];

function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {
  const levels = flags.map((f) => f[1]);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function toRecord(spec: RowSpec): RatingRecord {
  const panel = spec.labelUrl;
  const note = spec.sourceNote ? `${spec.sourceNote} ` : '';
  const source = `Brand page ${panel} supplement-facts image (brand panel) was read for label and UPC. Rainbow Light brand store out of stock on this count (label/UPC source only; not a sale page). Other ingredients: ${spec.oiLine} ${note}Brand gtin12 ${spec.barcode}. Opened ${spec.saleUrlA} in stock with sale. Opened ${spec.saleUrlB} in stock with sale; store pages agree on UPC ${spec.barcode}. Row graded from the brand Supplement Facts label only; actives ungraded.`;
  return {
    id: spec.id,
    productName: spec.productName,
    brand: 'Rainbow Light',
    category: spec.category,
    formulaId: spec.id,
    audience: ADULT,
    minAge: 18,
    form: spec.form,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: spec.barcode,
    activeIngredients: [{ name: spec.active, strength: 'label serving' }],
    inactiveIngredients: buildOi(panel, spec.flags),
    verdict: verdictFromFlags(spec.flags),
    retailers: spec.retailers,
    sourcesGeneral: [source],
  };
}

export const BATCH206_KYR6C_RAINBOW_T96U: RatingRecord[] = SPECS.map(toRecord);

const ROWS = BATCH206_KYR6C_RAINBOW_T96U;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch206 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch206 duplicate id');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch206 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch206 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch206 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch206 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch206 verdict ${record.id}`);
}
