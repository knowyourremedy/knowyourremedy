// DRAFT / not verified / batch 239 KYR6-c (t131u Spring Valley WRITE — store-brand exception).
// Three packs — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';
const HERBS = 'Herbs';

const METH = {
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate mineral filler).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin; glycemic bulking agent).',
  calciumSilicate: 'Methodology §5 Caution (calcium silicate — silicate family row).',
  cmcsodium: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose-family row).',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium / cellulose-family disintegrant).',
  dextrin: 'Methodology §5 Caution (dextrin — starch-derived bulking agent).',
  dextrose: 'Methodology §5 Caution (dextrose / bare glucose family).',
  lecithin: 'Methodology §5 Cleared (lecithin — emulsifier; soy disclosure not a toxicity flag).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate / citrate-salt row).',
  stearic: 'Methodology §5 Cleared (stearic acid / stearate-family lubricant).',
  starch: 'Methodology §5 Cleared (named starch / bare starch filler row).',
  hpmc: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / HPMC row).',
  polydextrose: 'Methodology §5 Limited (polydextrose; maltodextrin-like bulking fiber).',
  peg: 'Methodology §5 Caution (polyethylene glycol / PEG — process contaminant concern).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral tablet film coating).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap).',
  talc: 'Methodology §5 Avoid (talc — IARC Group 2A 2024; asbestos-contamination pathway).',
  tio2: 'Methodology §5 Avoid (titanium dioxide as color; EU 2022 food-additive ban).',
  ricePowder:
    'Methodology §5 Cleared (Rice Powder — founder lock t132u Oct 20, 2026; §4 re-eval before prior locks).',
  veggieCap:
    'Methodology §4 t130u unnamed rule + §5 Cleared (Vegetarian Capsule — same precedent as batch231 Veggie Capsule; named hypromellose/pullulan shells Cleared).',
  vegMagStearate:
    'Methodology §5 Cleared (vegetable magnesium stearate — t102u alias to stearate-family row).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const PANEL_COHOSH =
  'Walmart ip/14053315 supplement facts label image (matches eBay 198550229556 b2_B36e.png; DSLD 211450)';
const PANEL_B1 =
  'Walmart ip/10534199 supplement facts label image (matches eBay 318831034576 b4_B66e.png; DSLD 82831 label barcode)';
const PANEL_ECHINACEA =
  'Walmart ip/675692970 supplement facts label image (matches eBay 318909438814 b4_B74e.png)';

export const BATCH239_KYR6C_T131U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b239-black-cohosh-40-100',
    productName: 'Spring Valley Black Cohosh, 40 mg (100 tablets)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b239-black-cohosh-40-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131111270',
    activeIngredients: [
      { name: 'Calcium', strength: '130 mg (10% DV)' },
      {
        name: 'Black Cohosh (root & rhizome) Extract',
        strength: '40 mg (Actaea racemosa)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_COHOSH, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_COHOSH, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_COHOSH, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_COHOSH, 'Calcium Silicate', 'limited', 'calciumSilicate'),
      flag(PANEL_COHOSH, 'Carboxymethylcellulose Sodium', 'cleared', 'cmcsodium'),
      flag(PANEL_COHOSH, 'Carnauba Wax', 'cleared', 'carnauba'),
      flag(PANEL_COHOSH, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_COHOSH, 'Dextrin', 'limited', 'dextrin'),
      flag(PANEL_COHOSH, 'Dextrose', 'limited', 'dextrose'),
      flag(PANEL_COHOSH, 'Lecithin', 'cleared', 'lecithin'),
      flag(PANEL_COHOSH, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_COHOSH, 'Sodium Citrate', 'cleared', 'sodiumCitrate'),
      flag(PANEL_COHOSH, 'Stearic Acid', 'cleared', 'stearic'),
    ],
    verdict: 'caution',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_COHOSH}. Serving 2 tablets (50 servings). Black Cohosh Extract on the <2% line supplies the active and is not graded as an other ingredient. Dicalcium phosphate also supplies Calcium 130 mg. Contains soy (allergen line not graded). Walmart ip/14053315 in stock sold by Walmart.com; eBay 205730718853 New seller Amped97 (9 available). UPC 681131111270 = Walmart = DSLD 211450; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b239-vitamin-b1-250-100',
    productName: 'Spring Valley Vitamin B1 (Thiamin), 250 mg (100 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b239-vitamin-b1-250-100',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '078742435886',
    activeIngredients: [
      { name: 'Thiamin', strength: '250 mg (20,833% DV)' },
      { name: 'Calcium', strength: '102 mg (8% DV), from calcium carbonate' },
    ],
    inactiveIngredients: [
      flag(PANEL_B1, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_B1, 'Starch', 'cleared', 'starch'),
      flag(PANEL_B1, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_B1, 'Carboxymethylcellulose Sodium', 'cleared', 'cmcsodium'),
      flag(PANEL_B1, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_B1, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_B1, 'Polydextrose', 'limited', 'polydextrose'),
      flag(PANEL_B1, 'Polyethylene Glycol', 'moderate', 'peg'),
      flag(PANEL_B1, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(PANEL_B1, 'Silica', 'limited', 'silica'),
      flag(PANEL_B1, 'Talc', 'high', 'talc'),
      flag(PANEL_B1, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_B1}. Serving 1 tablet. Thiamine Mononitrate and Calcium Carbonate on the ingredient line supply Supplement Facts actives and are not graded as other ingredients. Other ingredients graded from the <2% portion and fillers: Microcrystalline Cellulose, Starch, Hydroxypropyl Methylcellulose, Carboxymethylcellulose Sodium, Croscarmellose Sodium, Magnesium Stearate, Polydextrose, Polyethylene Glycol, Polyvinyl Alcohol, Silica, Talc, Titanium Dioxide (Color). Walmart ip/10534199 in stock sold by Walmart.com; eBay 318831034576 New seller fit-flare (expiration 04/2027 or later). UPC 078742435886 = Walmart = DSLD 82831 label barcode 0 78742 43588 6; check digit OK.`,
    ],
  },
  {
    id: 'springvalley-b239-echinacea-goldenseal-75',
    productName: 'Spring Valley Echinacea Goldenseal Blend, 900 mg (75 vegetarian capsules)',
    brand: BRAND,
    category: HERBS,
    formulaId: 'springvalley-b239-echinacea-goldenseal-75',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131378840',
    activeIngredients: [
      {
        name: 'Proprietary Herbal Blend',
        strength:
          '92 mg (DV not established); herbal equivalent 900 mg: Echinacea 10:1 Extract (Echinacea purpurea) (aerial); Goldenseal 4:1 Extract (Hydrastis canadensis) (root)',
      },
    ],
    inactiveIngredients: [
      flag(PANEL_ECHINACEA, 'Rice Powder', 'cleared', 'ricePowder'),
      flag(PANEL_ECHINACEA, 'Vegetarian Capsule', 'cleared', 'veggieCap'),
      flag(PANEL_ECHINACEA, 'Vegetable Magnesium Stearate', 'cleared', 'vegMagStearate'),
    ],
    verdict: 'clean',
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u/t131u). Panel ${PANEL_ECHINACEA}. Serving 2 vegetarian capsules (37 servings). New pack UPC 681131378840 (replaces closed UPC 605388325556 / DSLD 178632). Other ingredients verbatim: RICE POWDER, VEGETARIAN CAPSULE, VEGETABLE MAGNESIUM STEARATE. Walmart ip/675692970 in stock sold by Walmart.com; eBay 318909438814 New seller fit-flare (expiration 08/2027 or later). UPC 681131378840 = Walmart = eBay item specifics; check digit OK.`,
    ],
  },
];

const ROWS = BATCH239_KYR6C_T131U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  return verdictFromFlags(levels);
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch239 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch239 duplicate id');

const verdictTally = { clean: 0, caution: 0, avoid: 0 };
for (const record of ROWS) verdictTally[record.verdict] += 1;
if (verdictTally.clean !== 1 || verdictTally.caution !== 1 || verdictTally.avoid !== 1) {
  throw new Error(`batch239 verdict tally ${JSON.stringify(verdictTally)}`);
}

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch239 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch239 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch239 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch239 verdict ${record.id}`);
}
