// DRAFT / not verified / batch 179 KYR6-c.
// Held Colace and Dulcolax counts whose panel was read and whose same
// count was for sale on a page that opened. Batch178 stays as written.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const DIGESTIVE = 'Digestive';

const METH = {
  ammonium: 'Methodology §5 Caution (ammonium hydroxide).',
  beeswax: 'Methodology §5 Cleared (white beeswax). Maps to beeswax. Alias. Not a new grade.',
  carmine: 'Methodology §5 Caution (carmine).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  cornSyrup: 'Methodology §5 Caution (corn syrup).',
  dextrose: 'Methodology §5 Caution (dextrose / bare glucose). Anhydrous dextrose is that row.',
  dyes: 'Methodology §5 High-risk (FD&C and D&C dyes, including aluminum lakes).',
  alcohol: 'Methodology §5 Caution (alcohol as a vehicle). Isopropanol is that vehicle.',
  ethanol: 'Methodology §5 Caution (ethanol). Same as grain alcohol as a vehicle. Alias. Not a new grade.',
  ethylAcetate: 'Methodology §5 Caution (ethyl acetate). Flavor solvent.',
  flavors: 'Methodology §5 Caution (flavors). Exact token. Unnamed flavor.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  gellan: 'Methodology §5 Cleared (gellan gum).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  gumArabic: 'Methodology §5 Cleared (gum arabic / acacia).',
  hco: 'Methodology §5 Avoid (hydrogenated coconut oil). The panel says hydrogenated. It does not say partial or fully. Partial is the banned form.',
  hcotton: 'Methodology §5 Avoid (hydrogenated cottonseed oil). The panel says hydrogenated. It does not say partial or fully. Partial is the banned form.',
  ink: 'Methodology §5 Caution (edible dye-free ink). The colorant is not named. Not an FD&C lake.',
  ironOxides: 'Methodology §5 Caution (iron oxides). Ferric oxide yellow is that color.',
  lecithinSoy: 'Methodology §5 Cleared (lecithin / soy lecithin).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  nButanol: 'Methodology §5 Caution (n-butanol). Same chemical as n-butyl alcohol. Alias. Not a new grade.',
  parabens: 'Methodology §5 High-risk (methylparaben and propylparaben).',
  pectin: 'Methodology §5 Cleared (pectin).',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol).',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral).',
  phosphoric: 'Methodology §5 Caution (phosphoric acid).',
  povidone: 'Methodology §5 Cleared (povidone).',
  shellac: 'Methodology §5 Cleared (shellac).',
  sodiumBenzoate: 'Methodology §5 Caution (sodium benzoate).',
  sorbitan: 'Methodology §5 Caution (sorbitol sorbitan solution). Not the sugar alcohol sorbitol.',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  soybean: 'Methodology §5 Cleared (soybean oil as a softgel fill). Gummy and lozenge soybean oil stay High.',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u; was Limited.',
  tio2: 'Methodology §5 High-risk (titanium dioxide).',
  water: 'Methodology §5 Cleared (water / purified water).',
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

const CLEAR_PANEL = 'DailyMed Colace Clear 50 mg soft gel drug facts';
const EXTRA_PANEL = 'DailyMed Colace Extra Strength 250 mg soft gel drug facts';
const GEL_PANEL = 'ShopRite Dulcolax Liquid Gel 20-count drug facts';
const ASSORTED_PANEL = 'DailyMed Dulcolax Chewy Fruit Bites Assorted Fruits drug facts';
const CHERRY_PANEL = 'DailyMed Dulcolax Chewy Fruit Bites Cherry Berry drug facts';

const CLEAR_FLAGS: IngredientFlag[] = [
  flag(CLEAR_PANEL, 'Edible dye-free ink', 'limited', METH.ink),
  flag(CLEAR_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(CLEAR_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(CLEAR_PANEL, 'PEG 400', 'moderate', METH.peg),
  flag(CLEAR_PANEL, 'Propylene glycol', 'moderate', METH.pg),
  flag(CLEAR_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
];

const EXTRA_FLAGS: IngredientFlag[] = [
  flag(EXTRA_PANEL, 'Edible dye-free ink', 'limited', METH.ink),
  flag(EXTRA_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(EXTRA_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(EXTRA_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(EXTRA_PANEL, 'Povidone', 'cleared', METH.povidone),
  flag(EXTRA_PANEL, 'Propylene glycol', 'moderate', METH.pg),
  flag(EXTRA_PANEL, 'Purified water', 'cleared', METH.water),
  flag(EXTRA_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
];

const GEL_FLAGS: IngredientFlag[] = [
  flag(GEL_PANEL, 'Anhydrous dextrose', 'limited', METH.dextrose),
  flag(GEL_PANEL, 'Ferric oxide yellow', 'limited', METH.ironOxides),
  flag(GEL_PANEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(GEL_PANEL, 'Gellan gum', 'cleared', METH.gellan),
  flag(GEL_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(GEL_PANEL, 'Hydrogenated cottonseed oil', 'high', METH.hcotton),
  flag(GEL_PANEL, 'Pectin', 'cleared', METH.pectin),
  flag(GEL_PANEL, 'Sorbitol sorbitan solution', 'limited', METH.sorbitan),
  flag(GEL_PANEL, 'Soybean oil', 'cleared', METH.soybean),
];

const ASSORTED_FLAGS: IngredientFlag[] = [
  flag(ASSORTED_PANEL, 'Ammonium hydroxide', 'limited', METH.ammonium),
  flag(ASSORTED_PANEL, 'Carnauba wax', 'cleared', METH.carnauba),
  flag(ASSORTED_PANEL, 'Corn syrup', 'limited', METH.cornSyrup),
  flag(ASSORTED_PANEL, 'Ethanol', 'limited', METH.ethanol),
  flag(ASSORTED_PANEL, 'Ethyl acetate', 'limited', METH.ethylAcetate),
  flag(ASSORTED_PANEL, 'FD&C Blue No. 1', 'high', METH.dyes),
  flag(ASSORTED_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
  flag(ASSORTED_PANEL, 'FD&C Red No. 40 aluminum lake', 'high', METH.dyes),
  flag(ASSORTED_PANEL, 'FD&C Yellow No. 5', 'high', METH.dyes),
  flag(ASSORTED_PANEL, 'FD&C Yellow No. 5 aluminum lake', 'high', METH.dyes),
  flag(ASSORTED_PANEL, 'FD&C Yellow No. 6', 'high', METH.dyes),
  flag(ASSORTED_PANEL, 'Gum arabic', 'cleared', METH.gumArabic),
  flag(ASSORTED_PANEL, 'Hydrogenated coconut oil', 'high', METH.hco),
  flag(ASSORTED_PANEL, 'Isopropanol', 'limited', METH.alcohol),
  flag(ASSORTED_PANEL, 'Lecithin (soy)', 'cleared', METH.lecithinSoy),
  flag(ASSORTED_PANEL, 'Natural and artificial flavors', 'limited', METH.flavors),
  flag(ASSORTED_PANEL, 'N-butanol', 'limited', METH.nButanol),
  flag(ASSORTED_PANEL, 'Phosphoric acid', 'limited', METH.phosphoric),
  flag(ASSORTED_PANEL, 'Propylene glycol', 'moderate', METH.pg),
  flag(ASSORTED_PANEL, 'Shellac', 'cleared', METH.shellac),
  flag(ASSORTED_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
  flag(ASSORTED_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
  flag(ASSORTED_PANEL, 'Sucrose', 'cleared', METH.sucrose),
  flag(ASSORTED_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(ASSORTED_PANEL, 'Water', 'cleared', METH.water),
  flag(ASSORTED_PANEL, 'White beeswax', 'cleared', METH.beeswax),
];

const CHERRY_FLAGS: IngredientFlag[] = [
  flag(CHERRY_PANEL, 'Ammonium hydroxide', 'limited', METH.ammonium),
  flag(CHERRY_PANEL, 'Carmine', 'limited', METH.carmine),
  flag(CHERRY_PANEL, 'Carnauba wax', 'cleared', METH.carnauba),
  flag(CHERRY_PANEL, 'Corn syrup', 'limited', METH.cornSyrup),
  flag(CHERRY_PANEL, 'Ethanol', 'limited', METH.ethanol),
  flag(CHERRY_PANEL, 'Ethyl acetate', 'limited', METH.ethylAcetate),
  flag(CHERRY_PANEL, 'FD&C Blue No. 1', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'FD&C Blue No. 2', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'FD&C Red No. 40 aluminum lake', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'FD&C Yellow No. 5', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'FD&C Yellow No. 5 aluminum lake', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'FD&C Yellow No. 6', 'high', METH.dyes),
  flag(CHERRY_PANEL, 'Gum arabic', 'cleared', METH.gumArabic),
  flag(CHERRY_PANEL, 'Hydrogenated coconut oil', 'high', METH.hco),
  flag(CHERRY_PANEL, 'Isopropanol', 'limited', METH.alcohol),
  flag(CHERRY_PANEL, 'Lecithin (soy)', 'cleared', METH.lecithinSoy),
  flag(CHERRY_PANEL, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(CHERRY_PANEL, 'Methylparaben', 'high', METH.parabens),
  flag(CHERRY_PANEL, 'Natural and artificial flavors', 'limited', METH.flavors),
  flag(CHERRY_PANEL, 'N-butanol', 'limited', METH.nButanol),
  flag(CHERRY_PANEL, 'Phosphoric acid', 'limited', METH.phosphoric),
  flag(CHERRY_PANEL, 'Propylene glycol', 'moderate', METH.pg),
  flag(CHERRY_PANEL, 'Propylparaben', 'high', METH.parabens),
  flag(CHERRY_PANEL, 'Shellac', 'cleared', METH.shellac),
  flag(CHERRY_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
  flag(CHERRY_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
  flag(CHERRY_PANEL, 'Sucrose', 'cleared', METH.sucrose),
  flag(CHERRY_PANEL, 'Titanium dioxide', 'high', METH.tio2),
  flag(CHERRY_PANEL, 'Water', 'cleared', METH.water),
  flag(CHERRY_PANEL, 'White beeswax', 'cleared', METH.beeswax),
];

export const BATCH179_KYR6C_HELD_LAXATIVES: RatingRecord[] = [
  {
    id: 'colace-b179-clear-28',
    productName: 'Colace Clear Stool Softener Soft Gels, 50 mg (28 ct)',
    brand: 'Colace',
    category: DIGESTIVE,
    barcode: '367618111284',
    formulaId: 'colace-b179-clear',
    audience: ADULT,
    minAge: 2,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '50 mg' }],
    inactiveIngredients: CLEAR_FLAGS,
    verdict: 'caution',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Colace Clear Stool Softener Soft Gels, 50 mg, 28 count, at $9.49, was $10.99, add to cart. The product URL ties GTIN 00367618111284 to this 28-count, stored as UPC 367618111284. ShopRite printed gelatin, glycerin, PEG 400, propylene glycol, and sorbitol, and left off the ink sentence. DailyMed setid a1591da0-a1a9-9583-3cf5-788b8fee3814 prints that same inactive line and adds: soft gels are imprinted with edible dye-free ink. Active: docusate sodium 50 mg. Adults and children 12 years and over take 1 to 6 soft gels daily. Children 2 to under 12 take 1 to 3. Under 2, ask a doctor.',
    ],
  },
  {
    id: 'colace-b179-extra-60',
    productName: 'Colace Extra Strength Stool Softener Soft Gels, 250 mg (60 ct)',
    brand: 'Colace',
    category: DIGESTIVE,
    formulaId: 'colace-b179-extra',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '250 mg' }],
    inactiveIngredients: EXTRA_FLAGS,
    verdict: 'caution',
    retailers: ['Hy-Vee'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Hy-Vee Aisles Online opened Colace Extra Strength Stool Softener, 60 Clear Soft Gels, at $32.99. The aisle card did not print a barcode. DailyMed setid 34e06b05-64a5-4b3e-af38-cdcd7c1d521b prints the 60 clear soft gel carton. Inactive ingredients: gelatin, glycerin, polyethylene glycol, povidone, propylene glycol, purified water, sorbitol. Softgels are imprinted with edible, dye-free ink. Active: docusate sodium 250 mg. Adults and children 12 years of age and older take 1 softgel daily. Children under 12, ask a doctor. This is one 60-count bottle. The 2×60 kit is not a row.',
    ],
  },
  {
    id: 'dulcolax-b179-liquid-gel-20',
    productName: 'Dulcolax Stimulant Laxative Liquid Gels, 5 mg (20 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    barcode: '681421022200',
    formulaId: 'dulcolax-b179-liquid-gel',
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Bisacodyl', strength: '5 mg' }],
    inactiveIngredients: GEL_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Dulcolax Laxative Liquid Gel, 20 count, at $6.49, add to cart. The product URL ties GTIN 00681421022200 to this 20-count, stored as UPC 681421022200. Inactive ingredients on that page: anhydrous dextrose, ferric oxide yellow, gelatin, gellan gum, glycerin, hydrogenated cottonseed oil, pectin, sorbitol sorbitan solution, soybean oil. DailyMed setid 919375cd-7646-4958-9e2b-cec2e1b2bd49 prints that same line. Active: bisacodyl 5 mg. Adults and children 12 years and over start with 1 capsule a day. Children 6 to under 12 take 1 capsule daily. Under 6, ask a doctor.',
    ],
  },
  {
    id: 'dulcolax-b179-assorted-30',
    productName: 'Dulcolax Chewy Fruit Bites, Assorted Fruit (30 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    formulaId: 'dulcolax-b179-assorted',
    audience: ADULT,
    minAge: 6,
    form: 'chew',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '600 mg' }],
    inactiveIngredients: ASSORTED_FLAGS,
    verdict: 'avoid',
    retailers: ['Walgreens', 'Food Lion'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'Walgreens opened Dulcolax Saline Laxative Chewy Fruit Bites Assorted Fruit, 30 count, at $14.99, was $17.99, pickup, same-day delivery, and shipping, add to cart. The list did not print a barcode. Food Lion opened the same 30-count bottle and printed the inactive line. DailyMed setid f3f97143-339c-4324-bfae-c670dea04a6e prints that line: ammonium hydroxide, carnauba wax, corn syrup, ethanol, ethyl acetate, FD&C blue no. 1, FD&C red no. 40, FD&C red no. 40 aluminum lake, FD&C yellow no. 5, FD&C yellow no. 5 aluminum lake, FD&C yellow no. 6, gum arabic, hydrogenated coconut oil, isopropanol, lecithin (soy), natural and artificial flavors, n-butanol, phosphoric acid, propylene glycol, shellac, sodium benzoate, sorbitol, sucrose, titanium dioxide, water, white beeswax. Active: magnesium hydroxide 600 mg. Adults and children 12 years and over take 4 chews, up to 8. Children 6 to under 12 take 2 chews, up to 4. Under 6, ask a doctor. This is not the Cherry Berry chew.',
    ],
  },
  {
    id: 'dulcolax-b179-cherry-30',
    productName: 'Dulcolax Chewy Fruit Bites, Cherry Berry (30 ct)',
    brand: 'Dulcolax',
    category: DIGESTIVE,
    formulaId: 'dulcolax-b179-cherry',
    audience: ADULT,
    minAge: 6,
    form: 'chew',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Magnesium hydroxide', strength: '600 mg' }],
    inactiveIngredients: CHERRY_FLAGS,
    verdict: 'avoid',
    retailers: ['ShopRite', 'Walgreens'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite laxative category opened Dulcolax Chewy Cherry Berry Fruit Chewable Bites, 30 count, at $11.29. Walgreens opened the same 30-count at $14.99, was $17.99, pickup, same-day delivery, and shipping, add to cart. Neither page printed a barcode. DailyMed setid b29d2771-f685-45c5-b18b-3ca976df6984 prints the 30-chew bottle. Inactive ingredients: ammonium hydroxide, carmine, carnauba wax, corn syrup, ethanol, ethyl acetate, FD&C blue no. 1, FD&C blue no. 2, FD&C red no. 40, FD&C red no. 40 aluminum lake, FD&C yellow no. 5, FD&C yellow no. 5 aluminum lake, FD&C yellow no. 6, gum arabic, hydrogenated coconut oil, isopropanol, lecithin (soy), maltodextrin, methylparaben, natural and artificial flavors, n-butanol, phosphoric acid, propylene glycol, propylparaben, shellac, sodium benzoate, sorbitol, sucrose, titanium dioxide, water, white beeswax. Active: magnesium hydroxide 600 mg. Adults and children 12 years and over take 4 chews, up to 8. Children 6 to under 12 take 2 chews, up to 4. Under 6, ask a doctor. The 12-count bag was not for sale on a page that opened. This is not the Assorted Fruit chew.',
    ],
  },
];

const ROWS = BATCH179_KYR6C_HELD_LAXATIVES;

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

if (ROWS.length !== 5) throw new Error(`batch179 row count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch179 duplicate id');
const formulas = new Map<string, string>();
for (const row of ROWS) {
  if (row.honestNote) throw new Error(`batch179 note ${row.id}`);
  if (!row.formulaId) throw new Error(`batch179 formula ${row.id}`);
  const line = row.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
  const prior = formulas.get(row.formulaId);
  if (prior === undefined) formulas.set(row.formulaId, line);
  else if (prior !== line) throw new Error(`batch179 formula drift ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch179 blank why ${row.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch179 blank source ${ingredient.name}`);
  }
  if (row.verdict !== expectedVerdict(row)) throw new Error(`batch179 verdict ${row.id}`);
}
const withCode = ROWS.filter((row) => row.barcode);
if (withCode.length !== 2) throw new Error(`batch179 barcode count ${withCode.length}`);
for (const row of withCode) {
  if (!row.barcode || !upcOk(row.barcode)) throw new Error(`batch179 upc ${row.id} ${row.barcode}`);
}
const codes = withCode.map((row) => row.barcode);
if (new Set(codes).size !== codes.length) throw new Error('batch179 shared barcode');
const gel = ROWS.find((row) => row.id === 'dulcolax-b179-liquid-gel-20');
if (!gel || !contradictionHonestNote(gel)?.includes('Soybean oil')) {
  throw new Error('batch179 liquid gel must show the soybean-oil form note on screen');
}
for (const row of ROWS) {
  if (row.id === 'dulcolax-b179-liquid-gel-20') continue;
  if (contradictionHonestNote(row)) throw new Error(`batch179 unexpected note ${row.id}`);
}
