// DRAFT / not verified / batch 138 KYR6-b Allegra-D 24 Hour only.
// Same Chattem panel batch137 refused on cellulose acetate. That token is now Caution on MAIN.
// batch70–137 were not edited. The uncounted allegra-d-24hr row was not rewritten.
// This list is not an exact twin of allegra-d-24hr-tio2-talc and does not share allegra-b137-d12.
//
// TALLY: 2 written — Clean 0 / Caution 0 / Avoid 2.
// NEW 2 / REUSE 0 / SKIPPED 0 / REFUSED 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const D_RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Pharmacy'] as const;

const METH = {
  dyes: 'Methodology §5 High (FD&C / D&C dyes, including lake forms). Avoid.',
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  talc: 'Methodology §5 High (talc, oral). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  pg: 'Methodology §5 Moderate (oral propylene glycol). Not the Avoid driver.',
  celluloseAcetate:
    'Methodology §5 Caution (cellulose acetate, Oct 1, 2026). Not cellulose, MCC, HPC, or HPMC. Not HPMCAS. Not the Avoid driver.',
  iron: 'Methodology §5 Caution (iron oxide as color). Black iron oxide sits on this row. Not Avoid.',
  acetone: 'Methodology §5 Caution (acetone). Not Avoid.',
  triacetate:
    'Methodology §5 Caution (glycerol triacetate). Not the Cleared triacetin row. Not Avoid.',
  sio2: 'Methodology §5 Caution (silicon dioxide, 0-point nanoparticle cap). Not Avoid.',
  ipa: 'Methodology §5 Limited (isopropyl alcohol, alcohol vehicle). Not Avoid.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const D24 = 'allegra-b138-d24';
const D24_SET = '1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(meth: string): string {
  return `DailyMed setid ${D24_SET}; ${meth}`;
}
function cleared(name: string): IngredientFlag {
  return flag(name, 'cleared', cite(METH.cleared));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ADULT_ALTS: CleanAlternative[] = [
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
  alt('equate-loratadine-tablets-plain', 'Independently Clean store-brand plain loratadine already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

function d24Flags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(METH.tio2)),
    flag('Talc', 'high', cite(METH.talc)),
    flag('FD&C Blue No. 1 aluminum lake', 'high', cite(METH.dyes)),
    flag('Polyethylene glycol', 'moderate', cite(METH.peg)),
    flag('Propylene glycol', 'moderate', cite(METH.pg)),
    flag('Cellulose acetate', 'limited', cite(METH.celluloseAcetate)),
    flag('Black iron oxide', 'limited', cite(METH.iron)),
    flag('Acetone', 'limited', cite(METH.acetone)),
    flag('Glycerol triacetate', 'limited', cite(METH.triacetate)),
    flag('Colloidal silicon dioxide', 'limited', cite(METH.sio2)),
    flag('Isopropyl alcohol', 'limited', cite(METH.ipa)),
    cleared('Copovidone'),
    cleared('Croscarmellose sodium'),
    cleared('Hypromellose'),
    cleared('Magnesium stearate'),
    cleared('Microcrystalline cellulose'),
    cleared('Povidone'),
    cleared('Sodium chloride'),
    cleared('Water'),
  ];
}

const NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers are talc, titanium dioxide, and FD&C Blue No. 1 aluminum lake. Cellulose acetate is Caution and is not the Avoid driver. Hypromellose stays Cleared. This list does not reuse allegra-d-24hr-tio2-talc because that MAIN formula omitted cellulose acetate and graded colloidal silicon dioxide Cleared. It does not share the 12-hour D formula. Ages 12+.';

const EMPTY =
  'UPC left empty. allegra.com/en-us/products/allergy-and-congestion-relief/allegrad-24-hour-nasal-decongestant prints one page-level sku, 1-00-41167-43207-5, and no count tab. That sku was not copied onto a guessed count. It also decodes to 041167432075, which is already on the uncounted allegra-d-24hr row. Target search did not open an Allegra-D product. Walmart returned a robot wall. No 12-digit code under the bars and no Product UPC field for this exact pack were opened. An 11-digit spec was not turned into a UPC. NDC is not a UPC (draft, not verified).';

const ACTIVES = [
  { name: 'Fexofenadine HCl', strength: '180mg' },
  { name: 'Pseudoephedrine HCl', strength: '240mg' },
];

function expand(id: string, productName: string, source: string): RatingRecord {
  return {
    id,
    productName,
    brand: 'Allegra',
    category: ALLERGIES,
    formulaId: D24,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: ACTIVES,
    inactiveIngredients: d24Flags(),
    verdict: 'avoid',
    honestNote: NOTE,
    retailers: [...D_RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [source],
  };
}

export const BATCH138_KYR6B_ALLEGRA_D24: RatingRecord[] = [
  expand(
    'allegra-b138-d24-10',
    'Allegra-D 24 Hour (10ct)',
    `DailyMed setid ${D24_SET} package NDC 41167-4320-5 is two 5-tablet blisters in one carton (10 extended-release tablets). Inactive ingredients: acetone, black iron oxide, cellulose acetate, colloidal silicon dioxide, copovidone, croscarmellose sodium, FD&C blue #1 aluminum lake, glycerol triacetate, hypromellose, isopropyl alcohol, magnesium stearate, microcrystalline cellulose, polyethylene glycol, propylene glycol, povidone, sodium chloride, talc, titanium dioxide, water. Same paragraph as the 15ct. ${EMPTY}`,
  ),
  expand(
    'allegra-b138-d24-15',
    'Allegra-D 24 Hour (15ct)',
    `DailyMed setid ${D24_SET} principal display panel "15 Tablets" and package NDC 41167-4320-7 (three 5-tablet blisters in one carton). Same inactive paragraph as the 10ct. ${EMPTY}`,
  ),
];

const ROWS = BATCH138_KYR6B_ALLEGRA_D24;
if (ROWS.length !== 2) throw new Error('batch138 row count');
if (new Set(ROWS.map((r) => r.id)).size !== 2) throw new Error('batch138 duplicate id');
if (ROWS.some((r) => r.barcode)) throw new Error('batch138 unexpected barcode');
if (ROWS.some((r) => r.verdict !== 'avoid')) throw new Error('batch138 verdict');
if (ROWS.some((r) => !r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) {
  throw new Error('batch138 Avoid without High');
}
const acetate = ROWS[0].inactiveIngredients.find((i) => i.name === 'Cellulose acetate');
if (!acetate || acetate.riskLevel !== 'limited') throw new Error('batch138 cellulose acetate grade');
const hpmc = ROWS[0].inactiveIngredients.find((i) => i.name === 'Hypromellose');
if (!hpmc || hpmc.riskLevel !== 'cleared') throw new Error('batch138 hypromellose flipped');
if (ROWS.some((r) => r.formulaId !== D24)) throw new Error('batch138 formula');
if (ROWS.some((r) => r.formulaId === 'allegra-b137-d12' || r.formulaId === 'allegra-d-24hr-tio2-talc')) {
  throw new Error('batch138 shared a different D formula');
}
if (ROWS.some((r) => r.form !== 'ER tablet' || !r.productName.includes('ct)'))) {
  throw new Error('batch138 missing count or form');
}
