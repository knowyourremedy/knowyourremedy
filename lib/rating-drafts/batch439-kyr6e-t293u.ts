// DRAFT / not verified / batch 439 KYR6-e (t293u).
// Formula 101 tablets. Palm oil is a fill. No form note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t292uLock } from '../scan-preview/t292uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t293u why ${name}`);
  const meth = grade === 'moderate'
    ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
    : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

const PALM = t292uLock('palm oil', 'capsule');
const MCC = t134uWhyForName('microcrystalline cellulose');
const CROSS = t134uWhyForName('croscarmellose sodium');
const MAG = t134uWhyForName('magnesium stearate (vegetable source)');
if (!PALM?.why || PALM.grade !== 'moderate' || PALM.counts || !MCC || !CROSS || !MAG) throw new Error('t293u lock');

const TABLET: IngredientFlag[] = [
  fromLock('Microcrystalline cellulose', 'cleared', false, MCC, 't134u'),
  fromLock('palm oil', PALM.grade, PALM.counts, PALM.why, 't292u'),
  fromLock('croscarmellose sodium', 'cleared', false, CROSS, 't134u'),
  fromLock('silicon dioxide', 'moderate', false, T128U_SILICA_WHY, 't160u'),
  fromLock('magnesium stearate (vegetable source)', 'cleared', false, MAG, 't134u'),
];

function row(id: string, name: string, source: string, barcode?: string): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'Kyolic',
    category: 'Vitamins',
    formulaId: 'kyolic-b439-formula-101-tablets',
    form: 'tablet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Kyolic'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: TABLET,
    verdict: 'caution',
    honestNote: '',
    founderHonestNote: '',
    sourcesGeneral: [source],
  };
}

const SITE = 'https://kyolic.com/product/kyolic-formula-101/';

export const BATCH439_KYR6E_T293U: RatingRecord[] = [
  row(
    'kyolic-b439-formula-101-100-tablets',
    'Kyolic Formula 101 100 Tablets',
    `${SITE} tablet panel. 100 tablets. Palm oil is a fill and is Caution. It does not count. DSLD 326201 matches. UPC 023542101318. The check digit passes.`,
    '023542101318',
  ),
  row(
    'kyolic-b439-formula-101-200-tablets',
    'Kyolic Formula 101 200 Tablets',
    `${SITE} tablet panel. 200 tablets. Same other ingredients. Palm oil is a fill and is Caution. No on-market label matches this panel. Missing UPC.`,
  ),
];
