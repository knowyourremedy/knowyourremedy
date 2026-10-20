// DRAFT / not verified / batch 170 KYR6-c Little Remedies Gas Relief Drops, strawberry.
// US only. The strawberry 1 fl oz panel was read. UPC 756184000137.
// The Natural Berry 1 fl oz stays on little-remedies-gas-drops.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const DIGESTIVE = 'Digestive';

const METH = {
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate).',
  citric: 'Methodology §5 Cleared (citric acid).',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose, cellulose gum family).',
  flavorNamed:
    'Methodology §5 Cleared (Natural strawberry flavor — founder lock t132u Oct 20, 2026; named Natural [fruit] Flavor family).',
  gums: 'Methodology §5 Cleared (xanthan gum).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral).',
  sucralose: 'Methodology §5 Moderate-risk (sucralose).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const GAS_ALTS: CleanAlternative[] = [
  alt(
    'boiron-gasalia-meltaways',
    'Closest independently Clean kids gas analog already on main (Boiron Gasalia meltaways). Form: meltaway tablet vs drops — labeled, not a hard filter (§6). Minimum age 6, higher than this infant product. No independently Clean infant simethicone exists here.',
  ),
  alt(
    'boiron-gasalia-pellets',
    'Independently Clean kids-usable Gasalia pellets already on main. Minimum age 6. Form: pellets — labeled, not a hard filter (§6).',
  ),
];

const PANEL = 'Little Remedies Gas Relief Drops, strawberry, 1 fl oz panel';

export const BATCH170_KYR6C_GAS_DROPS_STRAWBERRY: RatingRecord[] = [
  {
    id: 'little-remedies-b170-gas-drops-strawberry',
    productName: 'Little Remedies Gas Relief Drops, Strawberry (1 fl oz)',
    brand: 'Little Remedies',
    category: DIGESTIVE,
    barcode: '756184000137',
    formulaId: 'little-remedies-b170-gas-drops-strawberry',
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '20mg / 0.3mL' }],
    inactiveIngredients: [
      flag(PANEL, 'Carboxymethyl cellulose sodium', 'cleared', METH.cmc),
      flag(PANEL, 'Citric acid', 'cleared', METH.citric),
      flag(PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      flag(PANEL, 'Natural strawberry flavor', 'cleared', METH.flavorNamed),
      flag(PANEL, 'Propylene glycol', 'moderate', METH.pg),
      flag(PANEL, 'Purified water', 'cleared', METH.water),
      flag(PANEL, 'Sodium benzoate', 'limited', METH.benzoate),
      flag(PANEL, 'Sucralose', 'moderate', METH.sucralose),
      flag(PANEL, 'Xanthan gum', 'cleared', METH.gums),
    ],
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: GAS_ALTS,
    sourcesGeneral: [
      'The panel was read for Little Remedies Gas Relief Drops, strawberry, 1 fl oz. Simethicone 20 mg per 0.3 mL. Inactive ingredients: carboxymethyl cellulose sodium, citric acid, microcrystalline cellulose, natural strawberry flavor, propylene glycol, purified water, sodium benzoate, sucralose, xanthan gum. Newborns and infants under 2 years, and children 2 and over. Barcode 756184000137 stays on this strawberry 1 fl oz. The Natural Berry 1 fl oz is a different row.',
    ],
  },
];

const ROWS = BATCH170_KYR6C_GAS_DROPS_STRAWBERRY;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch170 row count ${ROWS.length}`);

const record = ROWS[0];
if (record.id !== 'little-remedies-b170-gas-drops-strawberry') throw new Error('batch170 id');
if (record.verdict !== 'caution') throw new Error('batch170 verdict');
if (record.barcode !== '756184000137' || !upcOk(record.barcode)) throw new Error('batch170 upc');
if (record.formulaId !== 'little-remedies-b170-gas-drops-strawberry') throw new Error('batch170 formula');
if (record.honestNote) throw new Error('batch170 note');
if (/756184120415/.test(JSON.stringify(record))) throw new Error('batch170 berry code');
if (/dailymed/i.test((record.sourcesGeneral ?? []).join(' '))) throw new Error('batch170 dailymed source');
for (const ingredient of record.inactiveIngredients) {
  if (!plainIngredientWhy(ingredient)) throw new Error(`batch170 blank why ${ingredient.name}`);
  if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch170 dailymed ${ingredient.name}`);
}
if (!record.inactiveIngredients.some((item) => item.name === 'Natural strawberry flavor' && item.riskLevel === 'cleared')) {
  throw new Error('batch170 strawberry flavor');
}
