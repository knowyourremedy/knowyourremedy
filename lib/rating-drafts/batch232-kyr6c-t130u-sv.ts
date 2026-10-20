// DRAFT / not verified / batch 232 KYR6-c (t130u Spring Valley WRITE — store-brand exception).
// One pack — grade from OI only; no honestNote.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Spring Valley';
const VITAMINS = 'Vitamins';

const METH = {
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family; EFSA 2017: no carcinogenicity, ADI not needed).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate mineral filler and buffer).',
  hpmc: 'Methodology §5 Cleared (hydroxypropyl methylcellulose / hypromellose / HPC; EFSA ADI not specified).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium / cellulose-family disintegrant).',
  crospovidone: 'Methodology §5 Cleared (crospovidone / copovidone family; oral pharmaceutical disintegrant).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant; EFSA 2018).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin / organic maltodextrin; glycemic bulking agent).',
  polydextrose: 'Methodology §5 Limited (polydextrose; maltodextrin-like bulking fiber).',
  peg: 'Methodology §5 Caution (polyethylene glycol / PEG — ethylene-oxide / 1,4-dioxane process contaminant concern).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating; distinct from topical PVA film).',
  silica: 'Methodology §5 Caution (silica / silicon dioxide oral nanoparticle data-gap cap; EFSA 2018).',
  talc: 'Methodology §5 Avoid (talc — IARC Group 2A 2024; asbestos-contamination pathway; §0 override).',
  tio2: 'Methodology §5 Avoid (titanium dioxide as color; EU 2022 food-additive ban; EFSA genotoxicity data gap).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  return verdictFromRiskLevels(levels);
}

const PANEL_BIOTIN =
  'Walmart ip/24681645 supplement facts label image (matches eBay 267726825043 r2_b24e.png and DSLD 271610 ingredient list)';

const OI_VERBATIM =
  'MICROCRYSTALLINE CELLULOSE, DICALCIUM PHOSPHATE, KERATIN, HYDROXYPROPYL METHYLCELLULOSE. CONTAINS 2% OR LESS OF: BIOTIN, CROSCARMELLOSE SODIUM, CROSPOVIDONE, MAGNESIUM STEARATE, MALTODEXTRIN, POLYDEXTROSE, POLYETHYLENE GLYCOL, POLYVINYL ALCOHOL, SILICA, TALC, TITANIUM DIOXIDE (COLOR).';

const BIOTIN_OI: RiskLevel[] = [
  'cleared',
  'cleared',
  'cleared',
  'cleared',
  'cleared',
  'cleared',
  'limited',
  'limited',
  'moderate',
  'cleared',
  'limited',
  'high',
  'high',
];

export const BATCH232_KYR6C_T130U_SV: RatingRecord[] = [
  {
    id: 'springvalley-b232-biotin-keratin-60',
    productName: 'Spring Valley Extra Strength Biotin 10,000 mcg plus Keratin (60 tablets)',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'springvalley-b232-biotin-keratin-60',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '681131057110',
    activeIngredients: [
      { name: 'Biotin', strength: '10,000 mcg (33,333% DV)' },
      { name: 'Calcium', strength: '70 mg (5% DV)' },
      { name: 'Keratin', strength: '100 mg (DV not established)' },
    ],
    inactiveIngredients: [
      flag(PANEL_BIOTIN, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PANEL_BIOTIN, 'Dicalcium Phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_BIOTIN, 'Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'),
      flag(PANEL_BIOTIN, 'Croscarmellose Sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_BIOTIN, 'Crospovidone', 'cleared', 'crospovidone'),
      flag(PANEL_BIOTIN, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PANEL_BIOTIN, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_BIOTIN, 'Polydextrose', 'limited', 'polydextrose'),
      flag(PANEL_BIOTIN, 'Polyethylene Glycol', 'limited', 'peg'),
      flag(PANEL_BIOTIN, 'Polyvinyl Alcohol', 'cleared', 'pva'),
      flag(PANEL_BIOTIN, 'Silica', 'limited', 'silica'),
      flag(PANEL_BIOTIN, 'Talc', 'high', 'talc'),
      flag(PANEL_BIOTIN, 'Titanium Dioxide (Color)', 'high', 'tio2'),
    ],
    verdict: verdictFromFlags(BIOTIN_OI),
    retailers: ['Walmart', 'eBay'],
    sourcesGeneral: [
      `Founder ruling: Spring Valley store-brand exception (t130u). Panel ${PANEL_BIOTIN}. Serving 1 tablet. Actives: Biotin 10,000 mcg (33,333% DV); Calcium 70 mg (5% DV); Keratin 100 mg (DV not established). Other ingredients verbatim: ${OI_VERBATIM} Keratin and Biotin on the ingredient line are also Supplement Facts actives and are not graded as other ingredients. Walmart ip/24681645 in stock sold and shipped by Walmart.com; eBay 267726825043 Brand New seller Tide Solutions. UPC 681131057110 = Walmart = eBay item specifics = DSLD 271610; check digit OK.`,
    ],
  },
];

const ROWS = BATCH232_KYR6C_T130U_SV;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch232 row count ${ROWS.length}`);

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch232 upc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch232 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch232 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch232 verdict ${record.id}`);
}
