// DRAFT / not verified / batch 158 KYR6-b Benadryl chewables.
// One counted pack. The panel was read and the founder confirms an opened
// page shows this 20-tablet grape carton for sale. The older uncounted
// chewables row omitted ingredients and stored dextrose as Cleared, so
// this line is a new formula.
//
// TALLY: 1 written — Clean 0 / Caution 0 / Avoid 1.
// NEW 1 / REUSE 0. Written-row ungraded tokens: 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const SETID = 'b08f71d8-a06c-41ba-8ed1-fbc41dbc1919';
const FORMULA = 'benadryl-b158-chewables';

const METH = {
  dye: 'Methodology §5 High (synthetic dyes, including lake forms). Avoid.',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  glucose: 'Methodology §5 Caution (dextrose excipient → bare glucose). Not the Avoid driver.',
  sugar: 'Methodology §5 Caution (sugar spheres → bare sugar). Not the Avoid driver.',
  flavors: 'Methodology §5 Caution (bare flavors). Exact “Natural flavors” stays Limited. Not the Avoid driver.',
  hpc: 'Methodology §5 Cleared (hydroxypropylcellulose → hydroxypropyl cellulose / HPC).',
  ethyl: 'Methodology §5 Cleared (ethylcellulose).',
  tartaric: 'Methodology §5 Cleared (tartaric acid).',
  gum: 'Methodology §5 Cleared (gum arabic).',
  cellulose: 'Methodology §5 Cleared (microcrystalline cellulose).',
  cleared: 'Methodology §5 Cleared.',
} as const;

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(meth: string): string {
  return `DailyMed setid ${SETID}; ${meth}`;
}
function cleared(name: string, meth: string = METH.cleared): IngredientFlag {
  return flag(name, 'cleared', cite(meth));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const KIDS_ALTS: CleanAlternative[] = [
  alt('genexa-kids-allergy-dph-liquid', 'Independently Clean kids diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

const NOTE =
  'Avoid. Drivers are D&C red no. 30 aluminum lake, D&C red no. 7 calcium lake, and FD&C blue no. 1 aluminum lake. Sucralose is Moderate. Dextrose excipient is bare glucose Caution. Sugar spheres are bare sugar Caution. Flavors are the bare-flavors Caution family. Crospovidone, ethylcellulose, gum arabic, hydroxypropylcellulose, magnesium stearate, microcrystalline cellulose, and tartaric acid are Cleared. The older uncounted chewables row omitted ethylcellulose, hydroxypropylcellulose, sugar spheres, and tartaric acid, and stored dextrose as Cleared, so this line is a new formula. Grape. Ages 6+. Ages 2 to 5: do not use unless directed by a doctor. Under 2: do not use. Adults and children 12 years and over: 2 to 4 chewable tablets.';

const PANEL =
  'DailyMed setid b08f71d8-a06c-41ba-8ed1-fbc41dbc1919 (Kenvue). Active: diphenhydramine HCl 12.5 mg. Inactive ingredients: crospovidone, D&C red no. 30 aluminum lake, D&C red no. 7 calcium lake, dextrose excipient, ethylcellulose, FD&C blue no. 1 aluminum lake, flavors, gum arabic, hydroxypropylcellulose, magnesium stearate, microcrystalline cellulose, sucralose, sugar spheres, tartaric acid. Package NDC 50580-232-01 is one carton with two 10-count blister packs, 20 chewable tablets. Grape.';

export const BATCH158_KYR6B_CHEWABLES: RatingRecord[] = [
  {
    id: 'benadryl-b158-chewables-20',
    productName: "Children's Benadryl Allergy Chewables (20 tablets)",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450553201',
    formulaId: FORMULA,
    audience: KIDS,
    minAge: 6,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5 mg' }],
    inactiveIngredients: [
      flag('D&C red no. 30 aluminum lake', 'high', cite(METH.dye)),
      flag('D&C red no. 7 calcium lake', 'high', cite(METH.dye)),
      flag('FD&C blue no. 1 aluminum lake', 'high', cite(METH.dye)),
      flag('Sucralose', 'moderate', cite(METH.sucralose)),
      flag('Dextrose excipient', 'limited', cite(METH.glucose)),
      flag('Sugar spheres', 'limited', cite(METH.sugar)),
      flag('Flavors', 'limited', cite(METH.flavors)),
      cleared('Crospovidone'),
      cleared('Ethylcellulose', METH.ethyl),
      cleared('Gum arabic', METH.gum),
      cleared('Hydroxypropylcellulose', METH.hpc),
      cleared('Magnesium stearate'),
      cleared('Microcrystalline cellulose', METH.cellulose),
      cleared('Tartaric acid', METH.tartaric),
    ],
    verdict: 'avoid',
    honestNote: NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `${PANEL} Carton barcode 300450553201 is this 20-tablet pack. The founder confirms an opened page shows this grape 20-count for sale.`,
    ],
  },
];

const ROWS = BATCH158_KYR6B_CHEWABLES;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch158 row count ${ROWS.length}`);
const row = ROWS[0];
if (row.id !== 'benadryl-b158-chewables-20') throw new Error('batch158 id');
if (row.verdict !== 'avoid') throw new Error('batch158 verdict');
if (row.barcode !== '300450553201') throw new Error('batch158 upc');
if (!upcOk(row.barcode ?? '')) throw new Error('batch158 check digit');
if (row.formulaId !== FORMULA) throw new Error('batch158 formula');
if (row.minAge !== 6 || row.audience !== 'kids') throw new Error('batch158 age');
if (row.inactiveIngredients.length !== 14) throw new Error('batch158 panel');
if (row.inactiveIngredients.filter((item) => item.riskLevel === 'high').length !== 3) {
  throw new Error('batch158 dye count');
}
