// DRAFT / not verified / batch 268 KYR6-d (t35u).
// Founder-verified panels. Not re-searched. The founder label is the single source.
// Os-Cal chewable 60 is not in this file: bare Triglycerides is not locked.
// t73u: Meltaways 15 only. Brand page for SKU 042037106928 replaces
// Crospovidone and bare Starch with Povidone and Corn starch. Grade stays Avoid.
// t74u: Meltaways 15 honestNote only. No other field changes.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  acetic: 'Methodology §5 Cleared (acetic acid — acidulant; locked Sept 26, 2026).',
  calciumGluconate: 'Methodology §5 Cleared (calcium gluconate — mineral salt inactive).',
  calciumStearate: 'Methodology §5 Cleared (calcium stearate — stearate-family lubricant).',
  celluloseGel: 'Methodology §5 Cleared (cellulose gel — cellulose-family filler; t118u).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  cornSyrupSolids:
    'Methodology §5 Caution (corn syrup solids — sweetener neighborhood of sugar / glucose; locked Sept 26, 2026). Does not count toward the t137u stack. Not Cleared glucose syrup.',
  povidone:
    'Methodology §5 Cleared (povidone / povidone USP — tablet binder; locked Sept 25, 2026). Not crospovidone.',
  dlTocopherol:
    'Methodology §5 Cleared (DL-Alpha Tocopherol / DL alpha tocopherol — mixed-tocopherols row). Founder override Oct 17, 2026 t118u.',
  dye: 'Methodology §5 High-risk (synthetic dyes — FD&C / D&C, including lake forms).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  invertase: 'Methodology §5 Cleared (Invertase — enzyme excipient; locked Oct 17, 2026 t118u).',
  magnesiumStearate: 'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.',
  mannitol:
    'Methodology §5 Caution (mannitol — sugar alcohol; GI effects at volume; does not count toward the t137u stack).',
  natArtFlavor:
    'Methodology §5 Limited (natural and artificial flavor — singular; t118u). Same Limited natural-flavors opacity row. Counts toward the t137u stack.',
  paraben: 'Methodology §5 High-risk (parabens — methylparaben and propylparaben).',
  peg: 'Methodology §5 Limited (polyethylene glycol 3350 — PEG family; founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  polysorbate:
    'Methodology §5 Limited (polysorbate 80 — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval). Counts toward the t137u stack.',
  potatoStarch: 'Methodology §5 Cleared (potato starch — named simple starch).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol — oral coating; locked Sept 15, 2026).',
  pvAc: 'Methodology §5 Caution (polyvinyl acetate — coating polymer; locked Sept 26, 2026). Distinct from polyvinyl acetate phthalate. Does not count toward the t137u stack.',
  silica:
    'Methodology §5 Caution (silicon dioxide oral cap). Colloidal silica maps here (Oct 17, 2026 t118u). Zero-point cap. Does not count toward the t137u stack.',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Does not count toward the t137u stack.',
  ssf: 'Methodology §5 Cleared (sodium stearyl fumarate — stearate-family lubricant; locked Sept 16, 2026).',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate — disintegrant).',
  sucrose: 'Methodology §5 Cleared (sucrose). Founder override Oct 17, 2026 t118u.',
  talc: 'Methodology §5 High-risk (talc — oral / swallow; IARC Group 2A).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  triacetin: 'Methodology §5 Cleared (triacetin — tablet coating plasticizer; locked Sept 15, 2026).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const P_TOGO =
  'Founder-verified panel (t35u). Beano To Go 12. UPC 042037106911 check digit OK. Not re-searched.';
const P_MELT =
  'Brand page https://www.beanogas.com/anti-gas-pills/beano-meltaways (t73u). SKU 042037106928. Other ingredients: mannitol, povidone, corn starch, water, sodium stearyl fumarate, polyvinyl acetate, less than 1% of: maltodextrin, silicon dioxide, calcium gluconate, triacetin, natural & artificial flavor, red no. 40 lake, acetic acid, sodium lauryl sulfate.';
const P_OSCAL =
  'Founder-verified panel (t35u). Os-Cal Calcium + D3 caplets. Same formula on the 75 and the 160. Not re-searched.';

const TOGO_FLAGS: IngredientFlag[] = [
  flag(P_TOGO, 'Cellulose gel', 'cleared', 'celluloseGel'),
  flag(P_TOGO, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_TOGO, 'Invertase', 'cleared', 'invertase'),
  flag(P_TOGO, 'Potato starch', 'cleared', 'potatoStarch'),
  flag(P_TOGO, 'Magnesium stearate', 'cleared', 'magnesiumStearate'),
  flag(P_TOGO, 'Colloidal silica', 'moderate', 'silica'),
  flag(P_TOGO, 'Gelatin', 'cleared', 'gelatin'),
];

const MELT_FLAGS: IngredientFlag[] = [
  flag(P_MELT, 'Mannitol', 'moderate', 'mannitol'),
  flag(P_MELT, 'Povidone', 'cleared', 'povidone'),
  flag(P_MELT, 'Corn starch', 'cleared', 'cornStarch'),
  flag(P_MELT, 'Water', 'cleared', 'water'),
  flag(P_MELT, 'Sodium stearyl fumarate', 'cleared', 'ssf'),
  flag(P_MELT, 'Polyvinyl acetate', 'moderate', 'pvAc'),
  flag(P_MELT, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(P_MELT, 'Silicon dioxide', 'moderate', 'silica'),
  flag(P_MELT, 'Calcium gluconate', 'cleared', 'calciumGluconate'),
  flag(P_MELT, 'Triacetin', 'cleared', 'triacetin'),
  flag(P_MELT, 'Natural and artificial flavor', 'limited', 'natArtFlavor'),
  flag(P_MELT, 'FD&C Red No. 40 Lake', 'high', 'dye'),
  flag(P_MELT, 'Acetic acid', 'cleared', 'acetic'),
  flag(P_MELT, 'Sodium lauryl sulfate', 'moderate', 'sls'),
];

const OSCAL_FLAGS: IngredientFlag[] = [
  flag(P_OSCAL, 'Corn syrup solids', 'moderate', 'cornSyrupSolids'),
  flag(P_OSCAL, 'Talc', 'high', 'talc'),
  flag(P_OSCAL, 'Corn starch', 'cleared', 'cornStarch'),
  flag(P_OSCAL, 'Sodium starch glycolate', 'cleared', 'ssg'),
  flag(P_OSCAL, 'Polysorbate 80', 'limited', 'polysorbate'),
  flag(P_OSCAL, 'Polyvinyl alcohol', 'cleared', 'pva'),
  flag(P_OSCAL, 'Polyethylene glycol 3350', 'limited', 'peg'),
  flag(P_OSCAL, 'Titanium dioxide', 'high', 'tio2'),
  flag(P_OSCAL, 'Yellow 5 Lake', 'high', 'dye'),
  flag(P_OSCAL, 'Blue 1 Lake', 'high', 'dye'),
  flag(P_OSCAL, 'Calcium stearate', 'cleared', 'calciumStearate'),
  flag(P_OSCAL, 'Methylparaben', 'high', 'paraben'),
  flag(P_OSCAL, 'Propylparaben', 'high', 'paraben'),
  flag(P_OSCAL, 'Gelatin', 'cleared', 'gelatin'),
  flag(P_OSCAL, 'Sucrose', 'cleared', 'sucrose'),
  flag(P_OSCAL, 'dl-alpha tocopherol', 'cleared', 'dlTocopherol'),
];

const ENZYME: RatingRecord['activeIngredients'] = [
  { name: 'Alpha-galactosidase enzyme', strength: 'not graded' },
];

const CALCIUM: RatingRecord['activeIngredients'] = [
  { name: 'Calcium carbonate', strength: 'not graded' },
  { name: 'Cholecalciferol (Vitamin D3)', strength: 'not graded' },
];

function pack(
  id: string,
  productName: string,
  brand: string,
  category: string,
  formulaId: string,
  form: string,
  barcode: string,
  flags: IngredientFlag[],
  actives: RatingRecord['activeIngredients'],
  sources: string,
): RatingRecord {
  const rollup = computeVerdictFromInactiveIngredients(flags);
  const honest = limitedStackHonestNoteIfAny(flags);
  if (honest) throw new Error(`batch268 unexpected stack note ${id}`);
  return {
    id,
    productName,
    brand,
    category,
    formulaId,
    audience: ADULT,
    minAge: 18,
    form,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode,
    activeIngredients: actives,
    inactiveIngredients: flags,
    verdict: rollup.verdict,
    retailers: ['founder-verified'],
    sourcesGeneral: [sources],
  };
}

const MELT_HONEST_NOTE =
  'Avoid from FD&C Red No. 40 Lake. Counted Limited tokens: maltodextrin and natural and artificial flavor. That is two, so this is not a 3+ stack. Mannitol, polyvinyl acetate, silicon dioxide, and sodium lauryl sulfate are Caution and do not stack. Povidone is Cleared. Corn starch is Cleared named simple starch.';

export const BATCH268_KYR6D_T35U: RatingRecord[] = [
  pack(
    'beano-b268-to-go-12',
    'Beano To Go Tablets (12)',
    'Beano',
    'Digestive',
    'beano-b268-to-go-12',
    'tablet',
    '042037106911',
    TOGO_FLAGS,
    ENZYME,
    'Caution. Colloidal silica is the silicon dioxide cap and does not stack. Mannitol is Caution and does not stack. Counted Limited tokens: none. Cellulose gel, invertase, potato starch, magnesium stearate, and gelatin are Cleared. Not the written 100 or 30 (those rows have calcium gluconate and no invertase or gelatin). Not a 3+ stack. No honest note. Founder-verified panel. UPC 042037106911 check digit OK.',
  ),
  pack(
    'beano-b268-meltaways-15',
    'Beano Meltaways (15)',
    'Beano',
    'Digestive',
    'beano-b268-meltaways-15',
    'meltaway tablet',
    '042037106928',
    MELT_FLAGS,
    ENZYME,
    'Avoid from FD&C Red No. 40 Lake. Counted Limited tokens: maltodextrin and natural and artificial flavor. That is two, so this is not a 3+ stack. Mannitol, polyvinyl acetate, silicon dioxide, and sodium lauryl sulfate are Caution and do not stack. Povidone is Cleared. Corn starch is Cleared named simple starch. No honest note. Brand page https://www.beanogas.com/anti-gas-pills/beano-meltaways is the current formula for SKU 042037106928. Not the t35u names Crospovidone and bare Starch. UPC 042037106928 check digit OK.',
  ),
  pack(
    'oscal-b268-calcium-d3-75',
    'Os-Cal Calcium + D3 Caplets (75)',
    'Os-Cal',
    'Vitamins',
    'oscal-b268-calcium-d3',
    'caplet',
    '0300881654751',
    OSCAL_FLAGS,
    CALCIUM,
    'Avoid from talc, titanium dioxide, Yellow 5 Lake, Blue 1 Lake, methylparaben, and propylparaben. Counted Limited tokens: polysorbate 80 and polyethylene glycol 3350. That is two, so this is not a 3+ stack. Corn syrup solids is Caution and does not stack. No honest note. Founder-verified panel. UPC 0300881654751 is EAN-13 and the check digit is OK. Hy-Vee 0300881654750 was not substituted. Same formula as the 160.',
  ),
  pack(
    'oscal-b268-calcium-d3-160',
    'Os-Cal Calcium + D3 Caplets (160)',
    'Os-Cal',
    'Vitamins',
    'oscal-b268-calcium-d3',
    'caplet',
    '0307661654604',
    OSCAL_FLAGS,
    CALCIUM,
    'Avoid from talc, titanium dioxide, Yellow 5 Lake, Blue 1 Lake, methylparaben, and propylparaben. Counted Limited tokens: polysorbate 80 and polyethylene glycol 3350. That is two, so this is not a 3+ stack. Corn syrup solids is Caution and does not stack. No honest note. Founder-verified panel. UPC 0307661654604 is EAN-13 and the check digit is OK. Cub 307661654604 was not substituted. Same formula as the 75.',
  ),
];

const meltaways = BATCH268_KYR6D_T35U.find((record) => record.id === 'beano-b268-meltaways-15');
if (!meltaways) throw new Error('batch268 meltaways missing');
meltaways.honestNote = MELT_HONEST_NOTE;

const ROWS = BATCH268_KYR6D_T35U;

const expect: Record<
  string,
  { verdict: 'caution' | 'avoid'; cause: 'moderate' | 'high'; driver: string; limited: number; barcode: string }
> = {
  'beano-b268-to-go-12': {
    verdict: 'caution',
    cause: 'moderate',
    driver: 'Mannitol',
    limited: 0,
    barcode: '042037106911',
  },
  'beano-b268-meltaways-15': {
    verdict: 'avoid',
    cause: 'high',
    driver: 'FD&C Red No. 40 Lake',
    limited: 2,
    barcode: '042037106928',
  },
  'oscal-b268-calcium-d3-75': {
    verdict: 'avoid',
    cause: 'high',
    driver: 'Talc',
    limited: 2,
    barcode: '0300881654751',
  },
  'oscal-b268-calcium-d3-160': {
    verdict: 'avoid',
    cause: 'high',
    driver: 'Talc',
    limited: 2,
    barcode: '0307661654604',
  },
};

if (ROWS.length !== 4) throw new Error(`batch268 row count ${ROWS.length}`);

const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch268 duplicate id ${record.id}`);
  ids.add(record.id);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  const wanted = expect[record.id];
  if (
    !wanted
    || rollup.verdict !== wanted.verdict
    || rollup.cause !== wanted.cause
    || rollup.driver !== wanted.driver
    || record.verdict !== wanted.verdict
    || record.barcode !== wanted.barcode
  ) {
    throw new Error(`batch268 shape ${record.id} ${rollup.verdict} ${rollup.cause} ${rollup.driver} ${record.barcode}`);
  }
  if (record.id === 'beano-b268-meltaways-15') {
    if (record.honestNote !== MELT_HONEST_NOTE) throw new Error(`batch268 note ${record.id}`);
  } else if (record.honestNote) throw new Error(`batch268 note ${record.id}`);
  const counted = record.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item));
  if (counted.length !== wanted.limited) {
    throw new Error(`batch268 stack ${record.id} ${counted.map((item) => item.name).join(',')}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch268 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch268 pending ${ingredient.name}`);
    }
  }
}
