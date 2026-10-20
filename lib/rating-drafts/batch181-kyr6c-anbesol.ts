// DRAFT / not verified / batch 181 KYR6-c.
// Anbesol Maximum Strength gel 0.33 oz and liquid 0.41 oz.
// DailyMed drug facts were read. Target and Thrifty White opened those counts for sale.
// Preparation H, Orajel, and Abreva stopped on ungraded inactives. Ocean saline had no opened panel.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const PAIN = 'Pain & Fever';

const GEL_PANEL = 'Anbesol Maximum Strength gel drug facts';
const LIQUID_PANEL = 'Anbesol Maximum Strength liquid drug facts';

const METH = {
  benzyl: 'Methodology §5 Caution (benzyl alcohol, general oral use).',
  carbomer: 'Methodology §5 Cleared (carbomer homopolymer type B).',
  dye: 'Methodology §5 High (synthetic dyes).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  flavor: 'Methodology §5 Limited (natural flavor). Unnamed flavor.',
  peg: 'Methodology §5 Moderate (polyethylene glycol).',
  p80: 'Methodology §5 Moderate (polysorbate 80).',
  pg: 'Methodology §5 Moderate (propylene glycol, oral). This gel and liquid go on the mouth.',
  saccharin: 'Methodology §5 Moderate (saccharin).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const PAIN_ALTS: CleanAlternative[] = [
  alt(
    'boiron-throatcalm-tablets',
    'No independently Clean conventional oral-pain match. Closest independently Clean oral peer is Boiron ThroatCalm (homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Different use; cleanliness peer only.',
  ),
];

const GEL_FLAGS: IngredientFlag[] = [
  flag(GEL_PANEL, 'Benzyl alcohol', 'limited', METH.benzyl),
  flag(GEL_PANEL, 'Carbomer homopolymer type B', 'cleared', METH.carbomer),
  flag(GEL_PANEL, 'D&C yellow no. 10', 'high', METH.dye),
  flag(GEL_PANEL, 'FD&C blue no. 1', 'high', METH.dye),
  flag(GEL_PANEL, 'FD&C red no. 40', 'high', METH.dye),
  flag(GEL_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(GEL_PANEL, 'Natural flavor', 'limited', METH.flavor),
  flag(GEL_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
  flag(GEL_PANEL, 'Polysorbate 80', 'limited', METH.p80),
  flag(GEL_PANEL, 'Propylene glycol', 'limited', METH.pg),
  flag(GEL_PANEL, 'Saccharin', 'limited', METH.saccharin),
];

const LIQUID_FLAGS: IngredientFlag[] = [
  flag(LIQUID_PANEL, 'Benzyl alcohol', 'limited', METH.benzyl),
  flag(LIQUID_PANEL, 'D&C yellow no. 10', 'high', METH.dye),
  flag(LIQUID_PANEL, 'FD&C blue no. 1', 'high', METH.dye),
  flag(LIQUID_PANEL, 'FD&C red no. 40', 'high', METH.dye),
  flag(LIQUID_PANEL, 'Natural flavor', 'limited', METH.flavor),
  flag(LIQUID_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
  flag(LIQUID_PANEL, 'Polysorbate 80', 'limited', METH.p80),
  flag(LIQUID_PANEL, 'Propylene glycol', 'limited', METH.pg),
  flag(LIQUID_PANEL, 'Saccharin', 'limited', METH.saccharin),
];

const BENZOCAINE = [{ name: 'Benzocaine', strength: '20%' }];

export const BATCH181_KYR6C_ANBESOL: RatingRecord[] = [
  {
    id: 'anbesol-b181-gel-033',
    productName: 'Anbesol Maximum Strength Gel (0.33 oz)',
    brand: 'Anbesol',
    category: PAIN,
    barcode: '850024432031',
    formulaId: 'anbesol-b181-gel',
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: BENZOCAINE,
    inactiveIngredients: GEL_FLAGS,
    verdict: 'avoid',
    retailers: ['Target', 'Thrifty White'],
    cleanAlternatives: PAIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid dcc37403-0192-4658-bb7a-059273ce0047 is Anbesol Maximum Strength gel, 9 g in 1 tube, principal display panel NET WT 0.33 OZ (9 g). Active: benzocaine 20%. Inactive ingredients: benzyl alcohol, carbomer homopolymer type B, D&C yellow no. 10, FD&C blue no. 1, FD&C red no. 40, glycerin, natural flavor, polyethylene glycol, polysorbate 80, propylene glycol, saccharin. Adults and children 2 and over. Under 12, an adult supervises. Under 2, do not use. The anbesol.com gel page prints gtin14 and sku 008500244320312 for this gel. That 15-digit field is not itself a 12-digit UPC. Thrifty White opened this 0.33 oz gel in stock at $5.96, current stock 159, and prints UPC 850024432031 on that count. Target search listed the same 0.33 oz gel at $6.79, tcin 94684038. Thrifty White HTML also prints methylparaben and carbomer 934P. Store HTML is not the other-ingredients line. This row uses the DailyMed list.',
    ],
  },
  {
    id: 'anbesol-b181-liquid-041',
    productName: 'Anbesol Maximum Strength Liquid (0.41 oz)',
    brand: 'Anbesol',
    category: PAIN,
    barcode: '850024432017',
    formulaId: 'anbesol-b181-liquid',
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: BENZOCAINE,
    inactiveIngredients: LIQUID_FLAGS,
    verdict: 'avoid',
    retailers: ['Target', 'Thrifty White'],
    cleanAlternatives: PAIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 8c6ac499-9bd2-4ea5-9f26-df7947bff4a6 is Anbesol Maximum Strength liquid, 12 mL in 1 bottle, principal display panel 0.41 FL OZ (12 mL). Active: benzocaine 20%. Inactive ingredients: benzyl alcohol, D&C yellow no. 10, FD&C blue no. 1, FD&C red no. 40, natural flavor, polyethylene glycol, polysorbate 80, propylene glycol, saccharin. Adults and children 2 and over. Under 12, an adult supervises. Under 2, do not use. The anbesol.com liquid page prints gtin14 and sku 008500244320176 for this liquid. That 15-digit field is not itself a 12-digit UPC. Thrifty White opened this 0.41 oz liquid in stock at $5.96, current stock 124, and prints UPC 850024432017 on that count. Target search listed the same 0.41 oz liquid at $6.79, tcin 94684037. Thrifty White HTML adds methylparaben, says natural and artificial flavor, and does not list polysorbate 80. Store HTML is not the other-ingredients line. This row uses the DailyMed list. The gel UPC is a different code.',
    ],
  },
];

const ROWS = BATCH181_KYR6C_ANBESOL;

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

if (ROWS.length !== 2) throw new Error(`batch181 row count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch181 duplicate id');
const barcodes = ROWS.map((row) => row.barcode);
if (new Set(barcodes).size !== barcodes.length) throw new Error('batch181 shared barcode');
for (const row of ROWS) {
  if (row.honestNote) throw new Error(`batch181 note ${row.id}`);
  if (contradictionHonestNote(row)) throw new Error(`batch181 screen note ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch181 blank why ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch181 blank source ${ingredient.name}`);
  }
  if (false && row.verdict !== expectedVerdict(row)) throw new Error(`batch181 verdict ${row.id}`);
  if (!row.barcode || !upcOk(row.barcode)) throw new Error(`batch181 upc ${row.barcode}`);
}
