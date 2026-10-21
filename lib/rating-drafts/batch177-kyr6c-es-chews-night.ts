// DRAFT / not verified / batch 177 KYR6-c.
// Gas-X Extra Strength chewables whose opened count pages print a new inactive
// line, and the Theraflu nighttime Honey & Elderberry 8.3 oz bottle Brookshire's
// showed for sale. The gasx-es-chewables row on MAIN is a different line.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const DIGESTIVE = 'Digestive';
const COLD = 'Cold & Flu';

const METH = {
  calciumPhosphate: 'Methodology §5 Cleared (calcium phosphate). Calcium phosphate tribasic sits on that row.',
  citric: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  citrate: 'Methodology §5 Cleared (citrate salts as buffers). Sodium citrate sits on that row.',
  cmcSodium: 'Methodology §5 Cleared (cellulose gum / sodium carboxymethyl cellulose).',
  cornSyrup: 'Methodology §5 Caution (corn syrup solids).',
  dextrose: 'Methodology §5 Caution (dextrose). Bare glucose. Not the older cleared path.',
  dyes: 'Methodology §5 High-risk (FD&C and D&C dyes, including aluminum lakes).',
  flavors: 'Methodology §5 Caution (flavors). Exact token. Unnamed flavor.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  honey: 'Methodology §5 Cleared (honey, oral sweetener).',
  lipolyzed: 'Methodology §5 Cleared (lipolyzed butteroil). It is butterfat.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  modStarch: 'Methodology §5 Limited (modified starch / modified corn starch). Plain corn starch stays Cleared.',
  peg: 'Methodology §5 Limited (PEGs / polyethylene glycol — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  pg: 'Methodology §5 Limited (Propylene glycol (oral) — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  silica: 'Methodology §5 Caution (colloidal silicon dioxide / silicon dioxide). SiO2 cap. Not the older cleared path.',
  sodiumBenzoate: 'Methodology §5 Caution (sodium benzoate).',
  sodiumGluconate: 'Methodology §5 Cleared (sodium gluconate). Same gluconate family as calcium gluconate.',
  soyProtein: 'Methodology §5 Caution (soy protein isolate). Not Limited bare soy. Not Cleared pea protein isolate.',
  starch: 'Methodology §5 Cleared (bare starch as a filler). Unspecified starch stays Caution.',
  sucralose: 'Methodology §5 Limited (Sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
  zincGluconate: 'Methodology §5 Cleared (zinc gluconate). Same gluconate family as calcium gluconate.',
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

const PEPPERMINT_PANEL = 'ShopRite Gas-X Extra Strength Peppermint Creme 18-count panel';
const STARCH_PANEL = 'Thrifty White Gas-X Extra Strength Peppermint Creme 18-count panel';
const CHERRY_PANEL = 'Target Gas-X Extra Strength Cherry Crème 18-count panel';
const CHERRY_SIO2_PANEL = 'ShopRite Gas-X Extra Strength Cherry Creme panel';
const NIGHT_PANEL = "Brookshire's Theraflu Honey & Elderberry Nighttime 8.3 fl oz panel";

export const BATCH177_KYR6C_ES_CHEWS_NIGHT: RatingRecord[] = [
  {
    id: 'gasx-b177-es-peppermint-18',
    productName: 'Gas-X Extra Strength Chewable Tablets, Peppermint Creme (18 ct)',
    brand: 'Gas-X',
    category: DIGESTIVE,
    barcode: '300430017181',
    formulaId: 'gasx-b177-es-peppermint',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '125 mg' }],
    inactiveIngredients: [
      flag(PEPPERMINT_PANEL, 'Calcium phosphate tribasic', 'cleared', METH.calciumPhosphate),
      flag(PEPPERMINT_PANEL, 'Colloidal silicon dioxide', 'limited', METH.silica),
      flag(PEPPERMINT_PANEL, 'Corn syrup solids', 'limited', METH.cornSyrup),
      flag(PEPPERMINT_PANEL, 'D&C Red No. 30 aluminum lake', 'high', METH.dyes),
      flag(PEPPERMINT_PANEL, 'D&C Yellow No. 10 aluminum lake', 'high', METH.dyes),
      flag(PEPPERMINT_PANEL, 'Dextrose', 'limited', METH.dextrose),
      flag(PEPPERMINT_PANEL, 'Flavors', 'limited', METH.flavors),
      flag(PEPPERMINT_PANEL, 'Lipolyzed butteroil', 'cleared', METH.lipolyzed),
      flag(PEPPERMINT_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(PEPPERMINT_PANEL, 'Modified corn starch', 'limited', METH.modStarch),
    ],
    verdict: 'avoid',
    retailers: ['ShopRite', 'Target'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Gas-X Extra Strength Peppermint Creme Simethicone Chewable Tablets, 125 mg, 18 count, at $5.19. The product URL ties GTIN 00300430017181 to this 18-count, stored as UPC 300430017181. Inactive ingredients: calcium phosphate tribasic, colloidal silicon dioxide, corn syrup solids, D&C Red No. 30 aluminum lake, D&C Yellow No. 10 aluminum lake, dextrose, flavors, lipolyzed butteroil, maltodextrin, modified corn starch. Active: simethicone 125 mg. Target opened the same 18-count peppermint crème at $12.37, in stock, add to cart, sold and shipped by Hey Pharma, and printed that same inactive line and UPC 300430017181. Target directions: adults and children 12 years and older. This is not the gasx-es-chewables row. Thrifty White printed a different inactive line for this UPC, and that line is a separate row.',
    ],
  },
  {
    id: 'gasx-b177-es-peppermint-starch-18',
    productName: 'Gas-X Extra Strength Chewable Tablets, Peppermint Creme, starch line (18 ct)',
    brand: 'Gas-X',
    category: DIGESTIVE,
    formulaId: 'gasx-b177-es-peppermint-starch',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '125 mg' }],
    inactiveIngredients: [
      flag(STARCH_PANEL, 'Calcium phosphate tribasic', 'cleared', METH.calciumPhosphate),
      flag(STARCH_PANEL, 'Colloidal silicon dioxide', 'limited', METH.silica),
      flag(STARCH_PANEL, 'D&C Red 30 aluminum lake', 'high', METH.dyes),
      flag(STARCH_PANEL, 'D&C Yellow 10 aluminum lake', 'high', METH.dyes),
      flag(STARCH_PANEL, 'Dextrose', 'limited', METH.dextrose),
      flag(STARCH_PANEL, 'Flavors', 'limited', METH.flavors),
      flag(STARCH_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(STARCH_PANEL, 'Starch', 'cleared', METH.starch),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Thrifty White opened Gas-X Chewable Tablets Extra Strength Peppermint Creme, 18 ct, at $5.30, in stock, current stock 60, add to cart. The page printed UPC 300430017181. Inactive ingredients: calcium phosphate tribasic, colloidal silicon dioxide, D&C Red 30 aluminum lake, D&C Yellow 10 aluminum lake, dextrose, flavors, maltodextrin, starch. Active: simethicone 125 mg. Adults: chew 1 or 2 tablets. The CVS ingredients page for the peppermint 18-count URL printed that same inactive line and did not show a price. That line has starch and does not have lipolyzed butteroil, corn syrup solids, or modified corn starch. ShopRite and Target printed UPC 300430017181 on the lipolyzed-butteroil 18-count, so this row does not store that code.',
    ],
  },
  {
    id: 'gasx-b177-es-cherry-18',
    productName: 'Gas-X Extra Strength Chewable Tablets, Cherry Crème (18 ct)',
    brand: 'Gas-X',
    category: DIGESTIVE,
    barcode: '300430117188',
    formulaId: 'gasx-b177-es-cherry',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '125 mg' }],
    inactiveIngredients: [
      flag(CHERRY_PANEL, 'Calcium phosphate tribasic', 'cleared', METH.calciumPhosphate),
      flag(CHERRY_PANEL, 'Colloidal silicon dioxide', 'limited', METH.silica),
      flag(CHERRY_PANEL, 'D&C Red 30 aluminum lake', 'high', METH.dyes),
      flag(CHERRY_PANEL, 'Dextrose', 'limited', METH.dextrose),
      flag(CHERRY_PANEL, 'Flavors', 'limited', METH.flavors),
      flag(CHERRY_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(CHERRY_PANEL, 'Propylene glycol', 'limited', METH.pg),
      flag(CHERRY_PANEL, 'Soy protein isolate', 'limited', METH.soyProtein),
    ],
    verdict: 'avoid',
    retailers: ['Target'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Target opened Gas-X Extra Strength Antigas Chewable Cherry Crème Tablets, 18 ct, at $4.59, in stock, add to cart. Count tabs on that page are 18 and 48. Specifications print UPC 300430117188 for the 18-count. Inactive ingredients: calcium phosphate tribasic, colloidal silicon dioxide, D&C Red 30 aluminum lake, dextrose, flavors, maltodextrin, propylene glycol, soy protein isolate. Active: simethicone 125 mg. The description says adults and children 12 years of age and older. This line does not include a second silicon dioxide token. The ShopRite cherry pages print that extra token, so those counts are a separate formula. This is not the gasx-es-chewables row.',
    ],
  },
  {
    id: 'gasx-b177-es-cherry-sio2-18',
    productName: 'Gas-X Extra Strength Chewable Tablets, Cherry Creme, silicon dioxide line (18 ct)',
    brand: 'Gas-X',
    category: DIGESTIVE,
    formulaId: 'gasx-b177-es-cherry-sio2',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '125 mg' }],
    inactiveIngredients: [
      flag(CHERRY_SIO2_PANEL, 'Calcium phosphate tribasic', 'cleared', METH.calciumPhosphate),
      flag(CHERRY_SIO2_PANEL, 'Colloidal silicon dioxide', 'limited', METH.silica),
      flag(CHERRY_SIO2_PANEL, 'D&C Red No. 30 aluminum lake', 'high', METH.dyes),
      flag(CHERRY_SIO2_PANEL, 'Dextrose', 'limited', METH.dextrose),
      flag(CHERRY_SIO2_PANEL, 'Flavors', 'limited', METH.flavors),
      flag(CHERRY_SIO2_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(CHERRY_SIO2_PANEL, 'Propylene glycol', 'limited', METH.pg),
      flag(CHERRY_SIO2_PANEL, 'Silicon dioxide', 'limited', METH.silica),
      flag(CHERRY_SIO2_PANEL, 'Soy protein isolate', 'limited', METH.soyProtein),
    ],
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Gas-X Extra Strength Cherry Creme Simethicone Antigas Chewable Tablets, 125 mg, 18 count, at $5.19. Inactive ingredients: calcium phosphate tribasic, colloidal silicon dioxide, D&C Red No. 30 aluminum lake, dextrose, flavors, maltodextrin, propylene glycol, silicon dioxide, soy protein isolate. Active: simethicone 125 mg. The product URL contains GTIN 00300430117188. Target prints UPC 300430117188 on the 18-count whose drug facts omit silicon dioxide, so this row does not store that code. The 48-count ShopRite page prints this same inactive line.',
    ],
  },
  {
    id: 'gasx-b177-es-cherry-sio2-48',
    productName: 'Gas-X Extra Strength Chewable Tablets, Cherry Creme, silicon dioxide line (48 ct)',
    brand: 'Gas-X',
    category: DIGESTIVE,
    barcode: '300430117485',
    formulaId: 'gasx-b177-es-cherry-sio2',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '125 mg' }],
    inactiveIngredients: [
      flag(CHERRY_SIO2_PANEL, 'Calcium phosphate tribasic', 'cleared', METH.calciumPhosphate),
      flag(CHERRY_SIO2_PANEL, 'Colloidal silicon dioxide', 'limited', METH.silica),
      flag(CHERRY_SIO2_PANEL, 'D&C Red No. 30 aluminum lake', 'high', METH.dyes),
      flag(CHERRY_SIO2_PANEL, 'Dextrose', 'limited', METH.dextrose),
      flag(CHERRY_SIO2_PANEL, 'Flavors', 'limited', METH.flavors),
      flag(CHERRY_SIO2_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
      flag(CHERRY_SIO2_PANEL, 'Propylene glycol', 'limited', METH.pg),
      flag(CHERRY_SIO2_PANEL, 'Silicon dioxide', 'limited', METH.silica),
      flag(CHERRY_SIO2_PANEL, 'Soy protein isolate', 'limited', METH.soyProtein),
    ],
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Gas-X Extra Strength Cherry Creme Simethicone Antigas Chewable Tablets, 125 mg, 48 count, at $11.89. The product URL ties GTIN 00300430117485 to this 48-count, stored as UPC 300430117485. Inactive ingredients match the ShopRite cherry 18-count: calcium phosphate tribasic, colloidal silicon dioxide, D&C Red No. 30 aluminum lake, dextrose, flavors, maltodextrin, propylene glycol, silicon dioxide, soy protein isolate. Active: simethicone 125 mg. Target’s 48-count page opened without a price and without drug facts, so this row uses the ShopRite panel.',
    ],
  },
  {
    id: 'theraflu-b177-night-honey-elderberry-83',
    productName: 'Theraflu Flu Relief Max Strength Nighttime Syrup, Honey & Elderberry (8.3 fl oz)',
    brand: 'Theraflu',
    category: COLD,
    barcode: '300672982001',
    formulaId: 'theraflu-b177-night-honey-elderberry',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '1000 mg / 30 mL' },
      { name: 'Chlorpheniramine maleate', strength: '4 mg / 30 mL' },
      { name: 'Dextromethorphan hydrobromide', strength: '30 mg / 30 mL' },
    ],
    inactiveIngredients: [
      flag(NIGHT_PANEL, 'Anhydrous citric acid', 'cleared', METH.citric),
      flag(NIGHT_PANEL, 'Carboxymethylcellulose sodium', 'cleared', METH.cmcSodium),
      flag(NIGHT_PANEL, 'Flavors', 'limited', METH.flavors),
      flag(NIGHT_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(NIGHT_PANEL, 'Light amber honey', 'cleared', METH.honey),
      flag(NIGHT_PANEL, 'Polyethylene glycol', 'limited', METH.peg),
      flag(NIGHT_PANEL, 'Propylene glycol', 'limited', METH.pg),
      flag(NIGHT_PANEL, 'Purified water', 'cleared', METH.water),
      flag(NIGHT_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
      flag(NIGHT_PANEL, 'Sodium citrate', 'cleared', METH.citrate),
      flag(NIGHT_PANEL, 'Sodium gluconate', 'cleared', METH.sodiumGluconate),
      flag(NIGHT_PANEL, 'Sucralose', 'limited', METH.sucralose),
      flag(NIGHT_PANEL, 'Xanthan gum', 'cleared', METH.xanthan),
      flag(NIGHT_PANEL, 'Zinc gluconate', 'cleared', METH.zincGluconate),
    ],
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Polyethylene glycol, Propylene glycol, Sucralose.',
    retailers: ["Brookshire's"],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      "Brookshire's opened Theraflu Honey & Elderberry Flavor Nighttime Flu Relief, 8.3 fluid ounce, at $11.49. The product URL ties GTIN 00300672982001 to this bottle, stored as UPC 300672982001. Inactive ingredients: anhydrous citric acid, carboxymethylcellulose sodium, flavors, glycerin, light amber honey, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium citrate, sodium gluconate, sucralose, xanthan gum, zinc gluconate. Actives in each 30 mL: acetaminophen 1000 mg, chlorpheniramine maleate 4 mg, and dextromethorphan hydrobromide 30 mg. Do not use in a child under 12 years of age. Honey & Elderberry is the product name. The inactive line says Flavors and light amber honey. This is not the daytime syrup row.",
    ],
  },
];

const ROWS = BATCH177_KYR6C_ES_CHEWS_NIGHT;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch177 row count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch177 duplicate id');
for (const row of ROWS) {
  if (row.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(row.honestNote)) throw new Error(`batch177 note ${row.id}`);
  if (row.formulaId === 'gasx-es-chewables' || row.formulaId === 'theraflu-b175-flu-day-syrup') {
    throw new Error(`batch177 formula reuse ${row.id}`);
  }
  if (!row.inactiveIngredients.length) throw new Error(`batch177 empty line ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch177 blank why ${row.id} ${ingredient.name}`);
    if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch177 flag dailymed ${ingredient.name}`);
  }
}
const withCode = ROWS.filter((row) => row.barcode);
if (withCode.length !== 4) throw new Error(`batch177 barcode count ${withCode.length}`);
for (const row of withCode) {
  if (!row.barcode || !upcOk(row.barcode)) throw new Error(`batch177 upc ${row.id} ${row.barcode}`);
}
const peppermint = ROWS.find((row) => row.id === 'gasx-b177-es-peppermint-18');
const starch = ROWS.find((row) => row.id === 'gasx-b177-es-peppermint-starch-18');
const cherry = ROWS.find((row) => row.id === 'gasx-b177-es-cherry-18');
const cherry18 = ROWS.find((row) => row.id === 'gasx-b177-es-cherry-sio2-18');
const cherry48 = ROWS.find((row) => row.id === 'gasx-b177-es-cherry-sio2-48');
const night = ROWS.find((row) => row.id === 'theraflu-b177-night-honey-elderberry-83');
if (!peppermint || peppermint.verdict !== 'avoid' || peppermint.barcode !== '300430017181') {
  throw new Error('batch177 peppermint');
}
if (cherry18?.barcode || cherry18?.formulaId !== 'gasx-b177-es-cherry-sio2') throw new Error('batch177 cherry 18');
if (cherry48?.barcode !== '300430117485' || cherry48.formulaId !== cherry18?.formulaId) throw new Error('batch177 cherry 48');
const butter = peppermint.inactiveIngredients.find((item) => item.name === 'Lipolyzed butteroil');
if (!butter || butter.riskLevel !== 'cleared') throw new Error('batch177 butter');
const mod = peppermint.inactiveIngredients.find((item) => item.name === 'Modified corn starch');
if (!mod || mod.riskLevel !== 'limited') throw new Error('batch177 mod starch');
const bare = starch?.inactiveIngredients.find((item) => item.name === 'Starch');
if (!bare || bare.riskLevel !== 'cleared') throw new Error('batch177 bare starch');
const soy = cherry?.inactiveIngredients.find((item) => item.name === 'Soy protein isolate');
if (!soy || soy.riskLevel !== 'limited') throw new Error('batch177 soy');
const silica = cherry48?.inactiveIngredients.find((item) => item.name === 'Silicon dioxide');
if (!silica || silica.riskLevel !== 'limited') throw new Error('batch177 silica');
const flavors = night?.inactiveIngredients.find((item) => item.name === 'Flavors');
if (!flavors || flavors.riskLevel !== 'limited') throw new Error('batch177 flavors');
if (night?.inactiveIngredients.some((item) => /natural and artificial/i.test(item.name))) {
  throw new Error('batch177 daytime flavor token');
}
