// DRAFT / not verified / batch 172 KYR6-c nasal packs held for menthol, eucalyptol,
// rosemary oil, seawater, fragrance, and aloe.
// A pack is here only when the panel was read and a page that opened showed that count for sale.
// Sinex oral capsules are not in this file. A 2-pack is not a row.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const COLD = 'Cold & Flu';
const ALLERGIES = 'Allergies';

const METH = {
  acesulfame: 'Methodology §5 Moderate-risk (acesulfame potassium).',
  aloe: 'Methodology §5 Caution (aloe as an other ingredient). Not the Cleared aloe topical base.',
  bkc: 'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid).',
  benzyl: 'Methodology §5 Caution (benzyl alcohol as topical inactive). Does not use the oral under-3 Avoid split. These sprays are not labeled for under 3.',
  camphor: 'Methodology §5 Caution (camphor as inactive). Not parked camphor as an active.',
  citric: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  citrate: 'Methodology §5 Cleared (citrate salts as buffers). Sodium citrate sits on that row.',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum).',
  edetate: 'Methodology §5 Caution (edetate disodium — EDTA Caution with edetate disodium dihydrate). Not the Cleared disodium EDTA trace row.',
  eucalyptol: 'Methodology §5 Caution (eucalyptol, when Inactive). Named chemical. Not a hidden flavor blend. Not the drug.',
  fragrance: 'Methodology §5 Caution (fragrance / parfum). Unnamed. Already the rule. Nasal spray uses that same Caution.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  menthol: 'Methodology §5 Caution (menthol, when Inactive in a spray). Named chemical. Not a hidden flavor blend. Not the drug.',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol).',
  pgNasal: 'Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this nasal spray. The oral row is the swallowed solvent. This is the topical form.',
  phosphate: 'Methodology §5 Cleared (phosphate salts — sodium phosphate dibasic and monobasic). Not phosphoric acid.',
  polysorbate: 'Methodology §5 Moderate-risk (polysorbate 80).',
  povidone: 'Methodology §5 Cleared (povidone).',
  rosemaryOil: 'Methodology §5 Caution (rosemary oil). Scent oil. Not the oral rosemary extract.',
  seawater: 'Methodology §5 Cleared (seawater as the saline in a nasal spray). Not Evaporated Sea Water. Not Trace Minerals (From Seawater).',
  sorbitol: 'Methodology §5 Limited-risk (sorbitol, oral). The nasal spray keeps this row.',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

const PG_NOTE =
  'Propylene glycol is Usable when it is swallowed. That is the form this app flags. This product is a nasal spray. The propylene glycol is the solvent in the spray, not a dose you swallow, so it did not pull this grade down.';

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const NASAL_ALTS: CleanAlternative[] = [
  alt(
    'xlear-nasal-spray-no-bkc',
    'Independently Clean saline nasal spray already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'neilmed-sinus-rinse',
    'Independently Clean saline rinse packets already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
];

const SQUEEZE = 'Afrin squeeze nasal spray panel';
const NO_DRIP_SEVERE = 'Afrin No Drip Severe Congestion 0.5 oz panel';
const VAPOR = 'Afrin Vapor Burst inhaler panel';
const EXTRA = 'Afrin Saline Burst Extra Strength 5 oz panel';
const MOIST = 'Afrin Saline Burst Moisturizing 5 oz panel';
const SINEX_UF = 'Vicks Sinex Severe Original Ultra Fine Mist panel';
const SINEX_MOIST = 'Vicks Sinex Severe Moisturizing Ultra Fine Mist panel';
const SINEX_VAPO = 'Vicks Sinex Severe VapoCool Ultra Fine Mist panel';

function squeezeInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Benzalkonium chloride solution', 'limited', METH.bkc),
    flag(panel, 'Benzyl alcohol', 'limited', METH.benzyl),
    flag(panel, 'Camphor', 'limited', METH.camphor),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Eucalyptol', 'limited', METH.eucalyptol),
    flag(panel, 'Menthol', 'limited', METH.menthol),
    flag(panel, 'Polysorbate 80', 'moderate', METH.polysorbate),
    flag(panel, 'Propylene glycol', 'cleared', METH.pgNasal),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium phosphate dibasic', 'cleared', METH.phosphate),
    flag(panel, 'Sodium phosphate monobasic', 'cleared', METH.phosphate),
  ];
}

function noDripSevereInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Benzalkonium chloride solution', 'limited', METH.bkc),
    flag(panel, 'Benzyl alcohol', 'limited', METH.benzyl),
    flag(panel, 'Camphor', 'limited', METH.camphor),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Eucalyptol', 'limited', METH.eucalyptol),
    flag(panel, 'Menthol', 'limited', METH.menthol),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Carboxymethylcellulose sodium', 'cleared', METH.cmc),
    flag(panel, 'Polyethylene glycol', 'moderate', METH.peg),
    flag(panel, 'Povidone', 'cleared', METH.povidone),
    flag(panel, 'Propylene glycol', 'cleared', METH.pgNasal),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium phosphate dibasic', 'cleared', METH.phosphate),
    flag(panel, 'Sodium phosphate monobasic', 'cleared', METH.phosphate),
  ];
}

function seawaterInactives(panel: string, seawater: string): IngredientFlag[] {
  return [
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, seawater, 'cleared', METH.seawater),
  ];
}

function sinexOriginalInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Benzalkonium chloride', 'limited', METH.bkc),
    flag(panel, 'Benzyl alcohol', 'limited', METH.benzyl),
    flag(panel, 'Citric acid anhydrous', 'cleared', METH.citric),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Fragrance', 'limited', METH.fragrance),
    flag(panel, 'Polysorbate 80', 'moderate', METH.polysorbate),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium citrate', 'cleared', METH.citrate),
    flag(panel, 'Sorbitol', 'limited', METH.sorbitol),
  ];
}

function sinexMoistInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Acesulfame potassium', 'moderate', METH.acesulfame),
    flag(panel, 'Aloe', 'limited', METH.aloe),
    flag(panel, 'Benzalkonium chloride', 'limited', METH.bkc),
    flag(panel, 'Benzyl alcohol', 'limited', METH.benzyl),
    flag(panel, 'Citric acid anhydrous', 'cleared', METH.citric),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Fragrance', 'limited', METH.fragrance),
    flag(panel, 'Polysorbate 80', 'moderate', METH.polysorbate),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium citrate', 'cleared', METH.citrate),
    flag(panel, 'Sorbitol', 'limited', METH.sorbitol),
  ];
}

function sinexVapoInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Benzalkonium chloride', 'limited', METH.bkc),
    flag(panel, 'Benzyl alcohol', 'limited', METH.benzyl),
    flag(panel, 'Citric acid anhydrous', 'cleared', METH.citric),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Fragrance', 'limited', METH.fragrance),
    flag(panel, 'Polysorbate 80', 'moderate', METH.polysorbate),
    flag(panel, 'Propylene glycol', 'cleared', METH.pgNasal),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium citrate', 'cleared', METH.citrate),
  ];
}

const OXY = [{ name: 'Oxymetazoline hydrochloride', strength: '0.05%' }];

export const BATCH172_KYR6C_NASAL_HELD: RatingRecord[] = [
  {
    id: 'afrin-b172-severe-05',
    productName: 'Afrin Severe Congestion Nasal Spray (0.5 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100811172',
    formulaId: 'afrin-b172-squeeze-menthol',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: squeezeInactives(SQUEEZE),
    verdict: 'caution',
    honestNote: PG_NOTE,
    retailers: ['HerbsPro'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'HerbsPro opened Afrin Severe Congestion Nasal Spray, 0.5 oz, in stock at $10.63, with UPC 041100811172. Active ingredient oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride solution, benzyl alcohol, camphor, edetate disodium, eucalyptol, menthol, polysorbate 80, propylene glycol, purified water, sodium phosphate dibasic, sodium phosphate monobasic. Menthol and eucalyptol are under Inactive. Ages 6 to under 12 with an adult. Under 6, ask a doctor. Directions say squeeze the bottle.',
    ],
  },
  {
    id: 'afrin-b172-allergy-sinus-05',
    productName: 'Afrin Allergy Sinus Nasal Spray (0.5 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100811271',
    formulaId: 'afrin-b172-squeeze-menthol',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: squeezeInactives(SQUEEZE),
    verdict: 'caution',
    honestNote: PG_NOTE,
    retailers: ['Thrifty White'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Thrifty White opened Afrin Allergy Sinus Nasal Spray, 15 mL, in stock at $8.06, current stock 24, with UPC 041100811271. Active ingredient oxymetazoline hydrochloride 0.05%. Inactive ingredients match the Severe Congestion squeeze bottle: benzalkonium chloride solution, benzyl alcohol, camphor, edetate disodium, eucalyptol, menthol, polysorbate 80, propylene glycol, purified water, sodium phosphate dibasic, sodium phosphate monobasic. Menthol and eucalyptol are under Inactive. Ages 6 to under 12 with an adult. Directions say squeeze the bottle.',
    ],
  },
  {
    id: 'afrin-b172-no-drip-severe-05',
    productName: 'Afrin No Drip Severe Congestion Nasal Spray (0.5 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100820334',
    formulaId: 'afrin-b172-no-drip-severe',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: noDripSevereInactives(NO_DRIP_SEVERE),
    verdict: 'caution',
    honestNote: PG_NOTE,
    retailers: ['Target'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Target opened Afrin No Drip Severe Congestion, 0.5 fl oz, at $9.69 with Add to cart and UPC 041100820334. Active ingredient oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride solution, benzyl alcohol, camphor, edetate disodium, eucalyptol, menthol, microcrystalline cellulose and carboxymethylcellulose sodium, polyethylene glycol, povidone, propylene glycol, purified water, sodium phosphate dibasic, sodium phosphate monobasic. The Target scrape printed carboxymetlylcellulose. The ingredient is carboxymethylcellulose sodium. Menthol and eucalyptol are under Inactive. Ages 6 to under 12 with an adult.',
    ],
  },
  {
    id: 'afrin-b172-vapor-burst',
    productName: 'Afrin Vapor Burst Inhaler (0.8 mL)',
    brand: 'Afrin',
    category: COLD,
    formulaId: 'afrin-b172-vapor-burst',
    audience: ADULT,
    minAge: 12,
    form: 'nasal inhaler',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [],
    inactiveIngredients: [
      flag(VAPOR, 'Eucalyptol', 'limited', METH.eucalyptol),
      flag(VAPOR, 'Rosemary oil', 'limited', METH.rosemaryOil),
      flag(VAPOR, 'Menthol', 'limited', METH.menthol),
    ],
    verdict: 'caution',
    retailers: ['Hy-Vee'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Afrin.com Vapor Burst is a drug-free inhaler, 0.8 mL. The panel has no Active header. Ingredients: eucalyptol, rosemary oil, menthol. Adults and children 12 and older. Not for under 12. Hy-Vee opened that inhaler at $7.99 and printed the same three ingredients. Hy-Vee calls the size 0.03 fl oz. The printed code 0041100601170 fails the check digit, so this row has no barcode.',
    ],
  },
  {
    id: 'afrin-b172-saline-burst-extra-5',
    productName: 'Afrin Saline Burst Extra Strength Daily Nasal Mist (5 oz)',
    brand: 'Afrin',
    category: ALLERGIES,
    barcode: '041100603845',
    formulaId: 'afrin-b172-seawater-22',
    audience: ADULT,
    minAge: 6,
    form: 'nasal mist',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Seawater', strength: 'diluted to 2.2% w/v sodium chloride' }],
    inactiveIngredients: seawaterInactives(EXTRA, 'Seawater'),
    verdict: 'clean',
    retailers: ['ShopRite'],
    sourcesGeneral: [
      'Afrin.com Saline Burst Extra Strength is a 5.0 oz drug-free mist. Ingredients: purified water, seawater diluted to 2.2% w/v sodium chloride. Under 6, ask a health professional. Directions start at age 6. ShopRite opened that 5.0 oz at $11.99 with the same seawater line. The ShopRite product id 00041100603845 is this count. The 12-digit UPC is 041100603845.',
    ],
  },
  {
    id: 'afrin-b172-saline-burst-moisturizing-5',
    productName: 'Afrin Saline Burst Moisturizing Daily Nasal Mist (5 oz)',
    brand: 'Afrin',
    category: ALLERGIES,
    barcode: '041100603852',
    formulaId: 'afrin-b172-seawater-09',
    audience: ADULT,
    minAge: 6,
    form: 'nasal mist',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Seawater', strength: 'diluted to 0.9% w/v sodium chloride' }],
    inactiveIngredients: seawaterInactives(MOIST, 'Seawater'),
    verdict: 'clean',
    retailers: ['ShopRite'],
    sourcesGeneral: [
      'Afrin.com Saline Burst Moisturizing is a 5.0 oz drug-free mist. Ingredients: purified water, seawater diluted to 0.9% w/v sodium chloride. Under 6, ask a health professional. Directions start at age 6. ShopRite opened that 5.0 oz on sale at $5.99 with the same seawater line. The ShopRite product id 00041100603852 is this count. The 12-digit UPC is 041100603852.',
    ],
  },
  {
    id: 'sinex-b172-original-uf-05',
    productName: 'Vicks Sinex Severe Original Ultra Fine Mist (0.5 oz)',
    brand: 'Vicks',
    category: COLD,
    barcode: '323900023253',
    formulaId: 'sinex-b172-original-uf',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: sinexOriginalInactives(SINEX_UF),
    verdict: 'caution',
    retailers: ['Dollar General'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4645336e-40d8-89e6-e063-6294a90a7655. Vicks Sinex Severe Original Ultra Fine Mist, 15 mL single. Oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride, benzyl alcohol, citric acid anhydrous, edetate disodium, fragrance, polysorbate 80, purified water, sodium citrate, sorbitol. No menthol and no eucalyptol. Adults and children 6 and older. Dollar General opened that 0.5 fl oz in stock at $10.50. The page URL ties UPC 323900023253 to this single.',
    ],
  },
  {
    id: 'sinex-b172-moisturizing-uf-05',
    productName: 'Vicks Sinex Severe Moisturizing Ultra Fine Mist (0.5 oz)',
    brand: 'Vicks',
    category: COLD,
    barcode: '323900023260',
    formulaId: 'sinex-b172-moisturizing-uf',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: sinexMoistInactives(SINEX_MOIST),
    verdict: 'caution',
    retailers: ['Target'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 464534ee-15f8-3af8-e063-6394a90a3f18. Vicks Sinex Severe Moisturizing Ultra Fine Mist, 15 mL single. Oxymetazoline hydrochloride 0.05%. Inactive ingredients: acesulfame potassium, aloe, benzalkonium chloride, benzyl alcohol, citric acid anhydrous, edetate disodium, fragrance, polysorbate 80, purified water, sodium citrate, sorbitol. Aloe is an other ingredient, not the topical base. No menthol and no eucalyptol. Adults and children 6 and older. Target opened that 0.5 fl oz in stock at $9.99 with Add to cart, UPC 323900023260, and the same inactive line.',
    ],
  },
  {
    id: 'sinex-b172-vapocool-05',
    productName: 'Vicks Sinex Severe VapoCool Ultra Fine Mist (0.5 oz)',
    brand: 'Vicks',
    category: COLD,
    barcode: '323900041677',
    formulaId: 'sinex-b172-vapocool',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: sinexVapoInactives(SINEX_VAPO),
    verdict: 'caution',
    honestNote: PG_NOTE,
    retailers: ['Dollar General'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 464550b3-5970-aca5-e063-6294a90a5954. Vicks Sinex Severe VapoCool Ultra Fine Mist, 15 mL single. Oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride, benzyl alcohol, citric acid anhydrous, edetate disodium, fragrance, polysorbate 80, propylene glycol, purified water, sodium citrate. No menthol, no eucalyptol, and no sorbitol. Adults and children 6 and older. Dollar General opened that 0.5 fl oz in stock at $10.50. The page URL ties UPC 323900041677 to this single. Target opened the same 0.5 fl oz title.',
    ],
  },
];

const ROWS = BATCH172_KYR6C_NASAL_HELD;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 9) throw new Error(`batch172 row count ${ROWS.length}`);

const codes = ROWS.map((row) => row.barcode).filter((code): code is string => Boolean(code));
if (codes.length !== 8) throw new Error('batch172 barcode count');
if (new Set(codes).size !== codes.length) throw new Error('batch172 shared upc');
for (const code of codes) {
  if (!upcOk(code)) throw new Error(`batch172 upc ${code}`);
}

const byId = Object.fromEntries(ROWS.map((row) => [row.id, row]));
if (byId['afrin-b172-vapor-burst'].barcode) throw new Error('batch172 vapor barcode');

const expectVerdict: Record<string, string> = {
  'afrin-b172-severe-05': 'caution',
  'afrin-b172-allergy-sinus-05': 'caution',
  'afrin-b172-no-drip-severe-05': 'caution',
  'afrin-b172-vapor-burst': 'caution',
  'afrin-b172-saline-burst-extra-5': 'clean',
  'afrin-b172-saline-burst-moisturizing-5': 'clean',
  'sinex-b172-original-uf-05': 'caution',
  'sinex-b172-moisturizing-uf-05': 'caution',
  'sinex-b172-vapocool-05': 'caution',
};
for (const [id, verdict] of Object.entries(expectVerdict)) {
  const row = byId[id];
  if (!row || row.verdict !== verdict) throw new Error(`batch172 verdict ${id}`);
}

if (byId['afrin-b172-severe-05'].formulaId !== byId['afrin-b172-allergy-sinus-05'].formulaId) {
  throw new Error('batch172 squeeze formula');
}
if (byId['afrin-b172-severe-05'].formulaId === byId['afrin-b172-no-drip-severe-05'].formulaId) {
  throw new Error('batch172 no-drip formula');
}
if (byId['afrin-b172-saline-burst-extra-5'].formulaId === byId['afrin-b172-saline-burst-moisturizing-5'].formulaId) {
  throw new Error('batch172 seawater formula');
}

const MENTHOL_WHY =
  'Menthol is a named chemical, not a hidden flavor blend. In this spray it is the cooling inactive, not the drug. That is why it is Usable.';
const EUCALYPTOL_WHY =
  'Eucalyptol is a named chemical, not a hidden flavor blend. In this spray it is the scent inactive, not the drug. That is why it is Usable.';
const FRAGRANCE_WHY =
  'This is an unnamed fragrance. The word hides the mixture, so you cannot see the solvents or the carriers. That is why it is Usable.';

for (const row of ROWS) {
  const note = row.honestNote ?? '';
  const hasPg = row.inactiveIngredients.some((item) => item.name === 'Propylene glycol');
  if (hasPg) {
    if (note !== PG_NOTE) throw new Error(`batch172 note ${row.id}`);
  } else if (note) {
    throw new Error(`batch172 extra note ${row.id}`);
  }
  if (row.verdict === 'clean' && row.inactiveIngredients.some((item) => item.riskLevel !== 'cleared')) {
    throw new Error(`batch172 clean grade ${row.id}`);
  }
  const joined = (row.sourcesGeneral ?? []).join(' ');
  if (row.brand === 'Afrin' && /dailymed/i.test(joined)) throw new Error(`batch172 dailymed ${row.id}`);
  if (row.brand === 'Vicks' && !/dailymed/i.test(joined)) throw new Error(`batch172 sinex panel ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch172 blank why ${row.id} ${ingredient.name}`);
    if (ingredient.name === 'Menthol' && why !== MENTHOL_WHY) throw new Error(`batch172 menthol why ${row.id}`);
    if (ingredient.name === 'Eucalyptol' && why !== EUCALYPTOL_WHY) throw new Error(`batch172 eucalyptol why ${row.id}`);
    if (ingredient.name === 'Fragrance' && why !== FRAGRANCE_WHY) throw new Error(`batch172 fragrance why ${row.id}`);
    if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch172 flag dailymed ${ingredient.name}`);
  }
}
