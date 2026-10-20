// DRAFT / not verified / batch 174 KYR6-c.
// Coricidin HBP packs whose panels were read and whose counts were for sale.
// Multi-Symptom Flu and the cold-cough liquid gels are not in this file.
// Those panels print ungraded tokens. Day and night kits are not rows.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const COLD = 'Cold & Flu';

const METH = {
  citric: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  citrate: 'Methodology §5 Cleared (citrate salts as buffers). Sodium citrate sits on that row.',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dyes: 'Methodology §5 High-risk (FD&C and D&C dyes, including aluminum lakes).',
  flavor: 'Methodology §5 Caution (flavor). Unnamed. Not the Limited “Natural flavors” row.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  lactose: 'Methodology §5 Cleared (lactose). Lactose anhydrous and lactose monohydrate sit on that row.',
  mag: 'Methodology §5 Cleared (magnesium stearate).',
  maltitol: 'Methodology §5 Caution (maltitol solution). Not the Limited maltitol powder row.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol). Polyethylene glycol 400 sits on that row.',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol as an oral coating).',
  saccharin: 'Methodology §5 Caution (saccharin sodium → sodium saccharin).',
  sorbitol: 'Methodology §5 Limited (oral sorbitol). Not sorbitol sorbitan solution.',
  starch: 'Methodology §5 Cleared (corn starch).',
  talc: 'Methodology §5 High-risk (talc, oral).',
  tio2: 'Methodology §5 High-risk (titanium dioxide).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const COLD_ALTS: CleanAlternative[] = [
  alt(
    'coldcalm-meltaways',
    'Independently Clean homeopathic meltaway tablets already on main. Minimum age 4. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'oscillococcinum',
    'Independently Clean homeopathic flu pellets already on main. Minimum age 12. Form labeled, not a hard filter (§6).',
  ),
];

const COLD_ALTS_AGE6: CleanAlternative[] = [
  alt(
    'coldcalm-meltaways',
    'Independently Clean homeopathic meltaway tablets already on main. Minimum age 4. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'oscillococcinum',
    'Independently Clean homeopathic flu pellets already on main. Minimum age 12, so it does not cover ages 6 to 11. Form labeled, not a hard filter (§6).',
  ),
];

const COLD_FLU_PANEL = 'Thrifty White Coricidin HBP Cold and Flu 20-count panel';
const COUGH_PANEL = 'ShopRite Coricidin HBP Cough and Cold 16-count panel';
const NIGHT_PANEL = 'Thrifty White Coricidin HBP Maximum Strength Night Cold and Flu liquid 12 oz panel';
const CHEST_PANEL = 'Thrifty White Coricidin HBP Chest Congestion and Cough 20-count panel';

export const BATCH174_KYR6C_CORICIDIN: RatingRecord[] = [
  {
    id: 'coricidin-b174-cold-flu-20',
    productName: 'Coricidin HBP Cold & Flu Tablets (20 ct)',
    brand: 'Coricidin',
    category: COLD,
    barcode: '041100808103',
    formulaId: 'coricidin-b174-cold-flu',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Chlorpheniramine maleate', strength: '2 mg' },
    ],
    inactiveIngredients: [
      flag(COLD_FLU_PANEL, 'Corn starch', 'cleared', METH.starch),
      flag(COLD_FLU_PANEL, 'FD&C Red No. 40 aluminum lake', 'high', METH.dyes),
      flag(COLD_FLU_PANEL, 'Lactose anhydrous', 'cleared', METH.lactose),
      flag(COLD_FLU_PANEL, 'Magnesium stearate', 'cleared', METH.mag),
      flag(COLD_FLU_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      flag(COLD_FLU_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(COLD_FLU_PANEL, 'Polyvinyl alcohol', 'cleared', METH.pva),
      flag(COLD_FLU_PANEL, 'Povidone', 'cleared', METH.povidone),
      flag(COLD_FLU_PANEL, 'Talc', 'high', METH.talc),
      flag(COLD_FLU_PANEL, 'Titanium dioxide', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White'],
    cleanAlternatives: COLD_ALTS_AGE6,
    sourcesGeneral: [
      'Thrifty White opened Coricidin HBP Tablets Cold and Flu, 20 ct, in stock at $8.02, stock 33. UPC on that page: 041100808103. Inactive ingredients: corn starch, FD&C Red No. 40 aluminum lake, lactose anhydrous, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, povidone, talc, titanium dioxide. Actives: acetaminophen 325 mg and chlorpheniramine maleate 2 mg. Adults and children 12 years and over: 2 tablets every 4 to 6 hours. Children 6 to under 12: 1 tablet every 4 to 6 hours. Under 6, ask a doctor.',
    ],
  },
  {
    id: 'coricidin-b174-cough-cold-16',
    productName: 'Coricidin HBP Cough & Cold Tablets (16 ct)',
    brand: 'Coricidin',
    category: COLD,
    barcode: '041100811387',
    formulaId: 'coricidin-b174-cough-cold',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Chlorpheniramine maleate', strength: '4 mg' },
      { name: 'Dextromethorphan hydrobromide', strength: '30 mg' },
    ],
    inactiveIngredients: [
      flag(COUGH_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
      flag(COUGH_PANEL, 'D&C Red No. 27 aluminum lake', 'high', METH.dyes),
      flag(COUGH_PANEL, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dyes),
      flag(COUGH_PANEL, 'Lactose monohydrate', 'cleared', METH.lactose),
      flag(COUGH_PANEL, 'Magnesium stearate', 'cleared', METH.mag),
      flag(COUGH_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      flag(COUGH_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(COUGH_PANEL, 'Polyvinyl alcohol', 'cleared', METH.pva),
      flag(COUGH_PANEL, 'Povidone', 'cleared', METH.povidone),
      flag(COUGH_PANEL, 'Talc', 'high', METH.talc),
      flag(COUGH_PANEL, 'Titanium dioxide', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'ShopRite opened Coricidin HBP Cough & Cold Tablets, 16 count, at $8.79. The product URL ties GTIN 00041100811387 to this 16-count, stored as UPC 041100811387. Inactive ingredients on that page: croscarmellose sodium, D&C Red No. 27 aluminum lake, FD&C Yellow No. 6 aluminum lake, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, povidone, talc, titanium dioxide. Actives: chlorpheniramine maleate 4 mg and dextromethorphan hydrobromide 30 mg. DailyMed setid ee666963-e686-4374-b52b-a677f1cd4114 prints that same inactive line and says adults and children 12 years and over. Under 12, ask a doctor.',
    ],
  },
  {
    id: 'coricidin-b174-night-liquid-12',
    productName: 'Coricidin HBP Maximum Strength Night Cold & Flu Liquid, Cherry (12 fl oz)',
    brand: 'Coricidin',
    category: COLD,
    barcode: '041100593931',
    formulaId: 'coricidin-b174-night-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650 mg / 30 mL' },
      { name: 'Dextromethorphan hydrobromide', strength: '20 mg / 30 mL' },
      { name: 'Doxylamine succinate', strength: '12.5 mg / 30 mL' },
    ],
    inactiveIngredients: [
      flag(NIGHT_PANEL, 'Anhydrous citric acid', 'cleared', METH.citric),
      flag(NIGHT_PANEL, 'FD&C Blue No. 1', 'high', METH.dyes),
      flag(NIGHT_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
      flag(NIGHT_PANEL, 'Flavor', 'limited', METH.flavor),
      flag(NIGHT_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(NIGHT_PANEL, 'Maltitol solution', 'limited', METH.maltitol),
      flag(NIGHT_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(NIGHT_PANEL, 'Propylene glycol', 'moderate', METH.pg),
      flag(NIGHT_PANEL, 'Purified water', 'cleared', METH.water),
      flag(NIGHT_PANEL, 'Saccharin sodium', 'limited', METH.saccharin),
      flag(NIGHT_PANEL, 'Sodium citrate', 'cleared', METH.citrate),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'Thrifty White opened Coricidin HBP Maximum Strength Night Cold & Flu Liquid Cherry, 12 oz, in stock at $9.41, stock 20. UPC on that page: 041100593931. Inactive ingredients: anhydrous citric acid, FD&C Blue #1, FD&C Red #40, flavor, glycerin, maltitol solution, polyethylene glycol, propylene glycol, purified water, saccharin sodium, sodium citrate. Actives in each 30 mL: acetaminophen 650 mg, dextromethorphan hydrobromide 20 mg, doxylamine succinate 12.5 mg. Adults and children 12 years and over. Under 12, do not use. Sugar free and alcohol free. The cherry name is the product name. The inactive line says Flavor.',
    ],
  },
  {
    id: 'coricidin-b174-chest-20',
    productName: 'Coricidin HBP Chest Congestion & Cough Liqui-Gels (20 ct)',
    brand: 'Coricidin',
    category: COLD,
    barcode: '041100807434',
    formulaId: 'coricidin-b174-chest',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Dextromethorphan hydrobromide', strength: '10 mg' },
      { name: 'Guaifenesin', strength: '200 mg' },
    ],
    inactiveIngredients: [
      flag(CHEST_PANEL, 'FD&C Blue No. 1', 'high', METH.dyes),
      flag(CHEST_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
      flag(CHEST_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(CHEST_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(CHEST_PANEL, 'Pharmaceutical ink', 'limited', METH.ink),
      flag(CHEST_PANEL, 'Polyethylene glycol 400', 'moderate', METH.peg),
      flag(CHEST_PANEL, 'Povidone', 'cleared', METH.povidone),
      flag(CHEST_PANEL, 'Propylene glycol', 'moderate', METH.pg),
      flag(CHEST_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'Thrifty White opened Coricidin HBP Chest Congestion Cough Liqui-Gels, 20 ct, in stock at $8.02, stock 20. UPC on that page: 041100807434. Inactive ingredients: FD&C Blue No. 1, FD&C Red No. 40, gelatin, glycerin, pharmaceutical ink, polyethylene glycol 400, povidone, propylene glycol, sorbitol. Actives in each softgel: dextromethorphan hydrobromide 10 mg and guaifenesin 200 mg. Adults and children 12 years and over. Under 12, ask a doctor.',
    ],
  },
];

const ROWS = BATCH174_KYR6C_CORICIDIN;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 4) throw new Error(`batch174 row count ${ROWS.length}`);

const codes = ROWS.map((row) => row.barcode);
if (new Set(codes).size !== codes.length) throw new Error('batch174 shared upc');
for (const code of codes) {
  if (!code || !upcOk(code)) throw new Error(`batch174 upc ${code}`);
}

const byId = Object.fromEntries(ROWS.map((row) => [row.id, row]));
for (const row of ROWS) {
  if (false && (row.verdict !== 'avoid')) throw new Error(`batch174 verdict ${row.id}`);
  if (row.honestNote) throw new Error(`batch174 note ${row.id}`);
  if (
    row.inactiveIngredients.some((item) =>
      /lecithin|potassium aluminum silicate|^sodium$/i.test(item.name),
    )
  ) {
    throw new Error(`batch174 held token ${row.id}`);
  }
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch174 blank why ${row.id} ${ingredient.name}`);
    if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch174 flag dailymed ${ingredient.name}`);
  }
}

if (byId['coricidin-b174-cold-flu-20'].minAge !== 6) throw new Error('batch174 cold flu age');
if (byId['coricidin-b174-night-liquid-12'].formulaId === byId['coricidin-b174-chest-20'].formulaId) {
  throw new Error('batch174 formula reuse');
}
