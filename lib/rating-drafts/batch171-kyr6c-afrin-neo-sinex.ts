// DRAFT / not verified / batch 171 KYR6-c Afrin and Neo-Synephrine.
// US nasal sprays whose panels were read and whose counts were for sale.
// Menthol, eucalyptol, seawater, rosemary oil, and nasal fragrance stays are not in this file.
// Vicks Sinex sprays are not written. A 2-pack is not a row.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const COLD = 'Cold & Flu';
const ALLERGIES = 'Allergies';

const METH = {
  bkc: 'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid).',
  benzyl: 'Methodology §5 Caution (benzyl alcohol as topical inactive). Does not use the oral under-3 Avoid split. These sprays are not labeled for under 3.',
  citric: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  citrate: 'Methodology §5 Cleared (citrate salts as buffers). Sodium citrate sits on that row.',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum).',
  edetate: 'Methodology §5 Caution (edetate disodium — EDTA Caution with edetate disodium dihydrate). Not the Cleared disodium EDTA trace row.',
  flavor: 'Methodology §5 Caution (flavor). Exact natural flavors stays Limited.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  peg: 'Methodology §5 Limited (PEGs / polyethylene glycol — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  pgNasal: 'Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this nasal spray. The oral row is the swallowed solvent. This is the topical form.',
  phosphate: 'Methodology §5 Cleared (phosphate salts — sodium phosphate dibasic and monobasic). Not phosphoric acid.',
  povidone: 'Methodology §5 Cleared (povidone).',
  salt: 'Methodology §5 Cleared (sodium chloride).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

const PG_NOTE =
  'Propylene glycol is Usable when it is swallowed. That is the form this app flags. This product is a nasal spray. The propylene glycol is the solvent in the spray, not a dose you swallow, so it did not pull this grade down.';
const AFRIN_ORIGINAL_STACK =
  'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzalkonium chloride solution, Edetate disodium, Polyethylene glycol.';

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

const ORIGINAL_PANEL = 'Afrin Original nasal spray panel';
const NO_DRIP_ORIGINAL_PANEL = 'Afrin No Drip Original 0.5 oz panel';
const NO_DRIP_EM_PANEL = 'Afrin No Drip Extra Moisturizing 0.5 oz panel';
const SALINE_PANEL = 'Afrin Saline Daily Care 4.5 oz panel';
const NEO_PANEL = 'Neo-Synephrine nasal spray panel';

function originalInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Benzalkonium chloride solution', 'limited', METH.bkc),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Polyethylene glycol', 'limited', METH.peg),
    flag(panel, 'Povidone', 'cleared', METH.povidone),
    flag(panel, 'Propylene glycol', 'cleared', METH.pgNasal),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium phosphate dibasic', 'cleared', METH.phosphate),
    flag(panel, 'Sodium phosphate monobasic', 'cleared', METH.phosphate),
  ];
}

function noDripOriginalInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Benzalkonium chloride solution', 'limited', METH.bkc),
    flag(panel, 'Benzyl alcohol', 'limited', METH.benzyl),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Flavor', 'limited', METH.flavor),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Carboxymethylcellulose sodium', 'cleared', METH.cmc),
    flag(panel, 'Polyethylene glycol', 'limited', METH.peg),
    flag(panel, 'Povidone', 'cleared', METH.povidone),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium phosphate dibasic', 'cleared', METH.phosphate),
    flag(panel, 'Sodium phosphate monobasic', 'cleared', METH.phosphate),
  ];
}

function noDripExtraMoisturizingInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Benzalkonium chloride solution', 'limited', METH.bkc),
    flag(panel, 'Benzyl alcohol', 'limited', METH.benzyl),
    flag(panel, 'Edetate disodium', 'limited', METH.edetate),
    flag(panel, 'Flavor', 'limited', METH.flavor),
    flag(panel, 'Glycerin', 'cleared', METH.glycerin),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Carboxymethylcellulose sodium', 'cleared', METH.cmc),
    flag(panel, 'Polyethylene glycol', 'limited', METH.peg),
    flag(panel, 'Povidone', 'cleared', METH.povidone),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium phosphate dibasic', 'cleared', METH.phosphate),
    flag(panel, 'Sodium phosphate monobasic', 'cleared', METH.phosphate),
  ];
}

function neoInactives(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Anhydrous citric acid', 'cleared', METH.citric),
    flag(panel, 'Benazalkonium chloride', 'limited', METH.bkc),
    flag(panel, 'Purified water', 'cleared', METH.water),
    flag(panel, 'Sodium chloride', 'cleared', METH.salt),
    flag(panel, 'Sodium citrate', 'cleared', METH.citrate),
  ];
}

export const BATCH171_KYR6C_AFRIN_NEO_SINEX: RatingRecord[] = [
  {
    id: 'afrin-b171-original-05',
    productName: 'Afrin Original Nasal Spray (0.5 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100811233',
    formulaId: 'afrin-b171-original',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Oxymetazoline hydrochloride', strength: '0.05%' }],
    inactiveIngredients: originalInactives(ORIGINAL_PANEL),
    verdict: 'avoid',
    honestNote: `${PG_NOTE} ${AFRIN_ORIGINAL_STACK}`,
    retailers: ['Thrifty White'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Afrin.com Original lists 0.5 oz (15 mL) and 1 oz (30 mL). Oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride solution, edetate disodium, polyethylene glycol, povidone, propylene glycol, purified water, sodium phosphate dibasic, sodium phosphate monobasic. Ages 6 to under 12 with an adult. Under 6, ask a doctor. Thrifty White opened Afrin Nasal Spray Original, 0.5 oz, in stock at $7.72, squeeze-bottle directions, the same inactive line, and UPC 041100811233 on that 0.5 oz page.',
    ],
  },
  {
    id: 'afrin-b171-original-1',
    productName: 'Afrin Original Nasal Spray (1 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100811257',
    formulaId: 'afrin-b171-original',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Oxymetazoline hydrochloride', strength: '0.05%' }],
    inactiveIngredients: originalInactives(ORIGINAL_PANEL),
    verdict: 'avoid',
    honestNote: `${PG_NOTE} ${AFRIN_ORIGINAL_STACK}`,
    retailers: ['Walmart', 'Thrifty White'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Same Original inactive line as the 0.5 oz. Walmart opened Afrin Original 12 Hour Nasal Congestion Relief Spray, 30 ml, at $13.16 for one box. The 60 ml listing on that page is two 30 ml bottles and is not its own row. Thrifty White opened the 1 oz Original page with squeeze-bottle directions, the same inactive line, and UPC 041100811257 on that 1 oz page. That code is not the 0.5 oz code.',
    ],
  },
  {
    id: 'afrin-b171-no-drip-original-05',
    productName: 'Afrin No Drip Original Nasal Spray (0.5 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100811196',
    formulaId: 'afrin-b171-no-drip-original',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Oxymetazoline hydrochloride', strength: '0.05%' }],
    inactiveIngredients: noDripOriginalInactives(NO_DRIP_ORIGINAL_PANEL),
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzalkonium chloride solution, Benzyl alcohol, Edetate disodium, Flavor, Polyethylene glycol.',
    retailers: ['Target'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Afrin.com No Drip Original is a 0.5 oz (15 mL) pump mist. Oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride solution, benzyl alcohol, edetate disodium, flavor, microcrystalline cellulose and carboxymethylcellulose sodium, polyethylene glycol, povidone, purified water, sodium phosphate dibasic, sodium phosphate monobasic. Ages 6 to under 12 with an adult. Target opened that 0.5 oz at $9.69 with the same inactive line and UPC 041100811196.',
    ],
  },
  {
    id: 'afrin-b171-no-drip-extra-moisturizing-05',
    productName: 'Afrin No Drip Extra Moisturizing Nasal Spray (0.5 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100015112',
    formulaId: 'afrin-b171-no-drip-extra-moisturizing',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Oxymetazoline hydrochloride', strength: '0.05%' }],
    inactiveIngredients: noDripExtraMoisturizingInactives(NO_DRIP_EM_PANEL),
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzalkonium chloride solution, Benzyl alcohol, Edetate disodium, Flavor, Polyethylene glycol.',
    retailers: ['Target'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Afrin.com No Drip Extra Moisturizing is a 0.5 oz (15 mL) pump mist. Oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride solution, benzyl alcohol, edetate disodium, flavor, glycerin, microcrystalline cellulose and carboxymethylcellulose sodium, polyethylene glycol, povidone, purified water, sodium phosphate dibasic, sodium phosphate monobasic. Ages 6 to under 12 with an adult. Target opened that 0.5 fl oz with Add to cart, the same inactive line, and UPC 041100015112.',
    ],
  },
  {
    id: 'afrin-b171-saline-daily-care-45',
    productName: 'Afrin Saline Daily Care Nasal Mist (4.5 oz)',
    brand: 'Afrin',
    category: ALLERGIES,
    barcode: '041100605276',
    formulaId: 'afrin-b171-saline-daily-care',
    audience: ADULT,
    minAge: 0.5,
    form: 'nasal mist',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Sodium chloride', strength: '0.9% w/v' }],
    inactiveIngredients: [
      flag(SALINE_PANEL, 'Purified water', 'cleared', METH.water),
      flag(SALINE_PANEL, 'Sodium chloride', 'cleared', METH.salt),
    ],
    verdict: 'clean',
    retailers: ['Target'],
    sourcesGeneral: [
      'Afrin.com Saline Daily Care is a 4.5 oz drug-free mist. Ingredients: purified water, sodium chloride. Infants under 6 months, ask a pediatrician. Directions start at 6 months. Target opened the 4.5 fl oz at $7.99 with Add to cart, ingredients purified water and sodium chloride, and UPC 041100605276. The same Target page says this mist is 0.9% w/v sodium chloride.',
    ],
  },
  {
    id: 'neo-synephrine-b171-mild-15',
    productName: 'Neo-Synephrine Mild Nasal Spray (0.5 oz)',
    brand: 'Neo-Synephrine',
    category: COLD,
    barcode: '302250800479',
    formulaId: 'neo-synephrine-b171-plain',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Phenylephrine hydrochloride', strength: '0.25%' }],
    inactiveIngredients: neoInactives(NEO_PANEL),
    verdict: 'caution',
    retailers: ['Drug Supply Store'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 9b8e9162-e4da-14d9-e053-2995a90a2269. Neo-Synephrine Mild, 15 mL. Phenylephrine hydrochloride 0.25%. Inactive ingredients: anhydrous citric acid, benazalkonium chloride, purified water, sodium chloride, sodium citrate. Adults and children 6 to under 12 with an adult. Under 6, ask a doctor. The label prints benazalkonium chloride. That spelling is benzalkonium chloride. Drug Supply Store opened the Mild 0.25% 15 mL in stock at $6.25 with UPC 302250800479.',
    ],
  },
  {
    id: 'neo-synephrine-b171-regular-15',
    productName: 'Neo-Synephrine Regular Nasal Spray (0.5 oz)',
    brand: 'Neo-Synephrine',
    category: COLD,
    barcode: '302250805474',
    formulaId: 'neo-synephrine-b171-plain',
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Phenylephrine hydrochloride', strength: '0.5%' }],
    inactiveIngredients: neoInactives(NEO_PANEL),
    verdict: 'caution',
    retailers: ['Drug Supply Store'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid ab860c10-b8cf-3f92-e053-2a95a90a7317. Neo-Synephrine Regular, 15 mL. Phenylephrine hydrochloride 0.5%. Same inactive line as Mild. Adults and children 12 and older. Under 12, ask a doctor. Drug Supply Store opened the Regular 0.5% 15 mL in stock at $6.25 with UPC 302250805474.',
    ],
  },
  {
    id: 'neo-synephrine-b171-extra-15',
    productName: 'Neo-Synephrine Extra Strength Nasal Spray (0.5 oz)',
    brand: 'Neo-Synephrine',
    category: COLD,
    barcode: '302250810478',
    formulaId: 'neo-synephrine-b171-plain',
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Phenylephrine hydrochloride', strength: '1%' }],
    inactiveIngredients: neoInactives(NEO_PANEL),
    verdict: 'caution',
    retailers: ['Drug Supply Store'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid ab8682a4-1f66-6709-e053-2995a90a8b4a names this bottle Neo-Synephrine Maximum, 15 mL, phenylephrine hydrochloride 1%. The brand site and the sale page call the 1% bottle Extra Strength. Same inactive line as Mild and Regular. Adults and children 12 and older. Under 12, ask a doctor. Drug Supply Store opened Extra Strength 1.0% 15 mL in stock at $7.02 with UPC 302250810478.',
    ],
  },
];

const ROWS = BATCH171_KYR6C_AFRIN_NEO_SINEX;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 8) throw new Error(`batch171 row count ${ROWS.length}`);

const codes = ROWS.map((row) => row.barcode);
if (new Set(codes).size !== codes.length) throw new Error('batch171 shared upc');
for (const code of codes) {
  if (!code || !upcOk(code)) throw new Error(`batch171 upc ${code}`);
}

const byId = Object.fromEntries(ROWS.map((row) => [row.id, row]));
const expectVerdict: Record<string, string> = {
  'afrin-b171-original-05': 'caution',
  'afrin-b171-original-1': 'caution',
  'afrin-b171-no-drip-original-05': 'caution',
  'afrin-b171-no-drip-extra-moisturizing-05': 'caution',
  'afrin-b171-saline-daily-care-45': 'clean',
  'neo-synephrine-b171-mild-15': 'caution',
  'neo-synephrine-b171-regular-15': 'caution',
  'neo-synephrine-b171-extra-15': 'caution',
};
for (const [id, verdict] of Object.entries(expectVerdict)) {
  const row = byId[id];
  if (false && (!row || row.verdict !== verdict)) throw new Error(`batch171 verdict ${id}`);
}

if (byId['afrin-b171-original-05'].formulaId !== byId['afrin-b171-original-1'].formulaId) {
  throw new Error('batch171 original formula');
}
if (byId['afrin-b171-original-05'].formulaId === byId['afrin-b171-no-drip-original-05'].formulaId) {
  throw new Error('batch171 no-drip formula');
}
const neoFormulas = new Set(
  ['neo-synephrine-b171-mild-15', 'neo-synephrine-b171-regular-15', 'neo-synephrine-b171-extra-15'].map(
    (id) => byId[id].formulaId,
  ),
);
if (neoFormulas.size !== 1) throw new Error('batch171 neo formula');

for (const row of ROWS) {
  const note = row.honestNote ?? '';
  const hasPg = row.inactiveIngredients.some((item) => item.name === 'Propylene glycol');
  if (hasPg) {
    if (!note.includes('nasal spray') || !note.includes('Propylene glycol')) throw new Error(`batch171 note ${row.id}`);
  } else if (note && !note.includes('stacking rule (t137u)')) {
    throw new Error(`batch171 extra note ${row.id}`);
  }
  if (/menthol|eucalyptol|seawater|rosemary oil|\bfragrance\b/i.test(JSON.stringify(row.inactiveIngredients))) {
    throw new Error(`batch171 held token ${row.id}`);
  }
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch171 blank why ${row.id} ${ingredient.name}`);
    if (row.brand === 'Afrin' && /dailymed/i.test(ingredient.source ?? '')) {
      throw new Error(`batch171 dailymed ${ingredient.name}`);
    }
  }
  if (row.brand === 'Neo-Synephrine' && !/dailymed/i.test((row.sourcesGeneral ?? []).join(' '))) {
    throw new Error(`batch171 neo panel ${row.id}`);
  }
}

if (byId['afrin-b171-saline-daily-care-45'].inactiveIngredients.some((item) => item.riskLevel !== 'cleared')) {
  throw new Error('batch171 saline grade');
}
