// DRAFT / not verified / batch 438 KYR6-e (t292u).
// Kyolic rows unlocked by the t292 locks. Brain Focus stores the named 3+ note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { T128U_MCT_WHY, T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t240uLock } from '../scan-preview/t240uLocks';
import { t251uLock } from '../scan-preview/t251uLocks';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t259uLock } from '../scan-preview/t259uLocks';
import { t280uLock } from '../scan-preview/t280uLocks';
import { t292uLock } from '../scan-preview/t292uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t292u why ${name}`);
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string, form = 'capsule'): IngredientFlag {
  const hit = t256uResolve(name, form) || t256uResolve(name, 'softgel');
  if (!hit) throw new Error(`t292u stored ${name}`);
  const why = hit.lock.why || cleanTokenWhyForName(name) || t134uWhyForName(name);
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, mark);
}

function locked(name: string, form?: string): IngredientFlag {
  const own = t292uLock(name, form);
  if (!own) throw new Error(`t292u lock ${name}`);
  return fromLock(name, own.grade, own.counts, own.why, 't292u');
}

const WHEY = t240uLock('whey');
const HPC = t280uLock('hydroxypropyl cellulose');
const MALTO = t259uLock('maltodextrin');
const CARAMEL = t251uLock('caramel color');
if (!WHEY?.why || !HPC?.why || !MALTO?.why || !CARAMEL?.why || !T128U_MCT_WHY) throw new Error('t292u special why');
const MCC = t134uWhyForName('microcrystalline cellulose')!;
const GEL = t134uWhyForName('gelatin')!;
const MAG = t134uWhyForName('magnesium stearate (vegetable source)')!;
const CROSS = t134uWhyForName('croscarmellose sodium')!;
const WATER = t134uWhyForName('water')!;
if (!MCC || !GEL || !MAG || !CROSS || !WATER) throw new Error('t292u base why');

const mcc = fromLock('Microcrystalline cellulose', 'cleared', false, MCC, 't134u');
const gel = fromLock('gelatin', 'cleared', false, GEL, 't134u');
const mag = fromLock('magnesium stearate (vegetable source)', 'cleared', false, MAG, 't134u');
const silica = fromLock('silicon dioxide', 'moderate', false, T128U_SILICA_WHY, 't160u');
const silicaWord = fromLock('silica', 'moderate', false, T128U_SILICA_WHY, 't160u');
const cross = fromLock('croscarmellose sodium', 'cleared', false, CROSS, 't134u');
const hpc = fromLock('hydroxypropylcellulose', 'limited', true, HPC.why, 't280u');
const whey = fromLock('Whey', 'limited', true, WHEY.why, 't240u');
const malto = fromLock('maltodextrin', 'limited', true, MALTO.why, 't259u');
const mct = fromLock('medium chain triglycerides', 'limited', true, T128U_MCT_WHY, 't162u');
const water = fromLock('Water', 'cleared', false, WATER, 't134u');
const caramel = fromLock('caramel color', 'limited', true, CARAMEL.why, 't251u');
const palmFill = locked('palm oil', 'capsule');
const starch = locked('starch (potato and corn)');
const alginic = locked('alginic acid (seaweed)');
const alcohol = locked('residual alcohol from extraction');

const CAP101: IngredientFlag[] = [mcc, gel, palmFill, silica, mag];
const CAP102: IngredientFlag[] = [mcc, stored('gum arabic'), stored('hypromellose (vegetable capsule)'), starch, silica, mag];
const TAB102: IngredientFlag[] = [mcc, stored('gum arabic'), starch, alginic, cross, hpc, silica, mag];
const TAB100: IngredientFlag[] = [whey, alginic, silicaWord, stored('cellulose', 'tablet'), mag];
const FOCUS: IngredientFlag[] = [
  mcc,
  stored('potato starch', 'caplet'),
  cross,
  hpc,
  mag,
  silica,
  stored('hydroxypropylmethylcellulose', 'caplet'),
  malto,
  mct,
];
const LIQUID: IngredientFlag[] = [water, alcohol, caramel];

function row(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], source: string, barcode?: string): RatingRecord {
  return {
    id, productName: name, brand: 'Kyolic', category: 'Vitamins', formulaId, form,
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Kyolic'], ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict, sourcesGeneral: [source],
  };
}

const SITE = 'https://kyolic.com/product';
const NOTE = 'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

export const BATCH438_KYR6E_T292U: RatingRecord[] = [
  {
    ...row(
      'kyolic-b438-brain-focus-60-caplets',
      'Kyolic Brain Focus 60 Caplets',
      'kyolic-b438-brain-focus-60',
      'caplet',
      FOCUS,
      'avoid',
      `${SITE}/brain-focus/ is the ingredient panel. 60 caplets. Counted Limited: hydroxypropylcellulose, maltodextrin, medium chain triglycerides. DSLD 326222 matches. UPC 023542352611. The check digit passes.`,
      '023542352611',
    ),
    honestNote: NOTE,
    founderHonestNote: NOTE,
  },
  row('kyolic-b438-formula-101-100-capsules', 'Kyolic Formula 101 100 Capsules', 'kyolic-b438-formula-101-capsules', 'capsule', CAP101, 'caution', `${SITE}/kyolic-formula-101/ capsule panel. 100 capsules. Palm oil is the capsule fill and is Caution. DSLD 274369 matches. UPC 023542101417. The check digit passes.`, '023542101417'),
  row('kyolic-b438-formula-101-200-capsules', 'Kyolic Formula 101 200 Capsules', 'kyolic-b438-formula-101-capsules', 'capsule', CAP101, 'caution', `${SITE}/kyolic-formula-101/ capsule panel. 200 capsules. Same other ingredients. DSLD 326233 matches. UPC 023542101424. The check digit passes.`, '023542101424'),
  row('kyolic-b438-formula-101-300-capsules', 'Kyolic Formula 101 300 Capsules', 'kyolic-b438-formula-101-capsules', 'capsule', CAP101, 'caution', `${SITE}/kyolic-formula-101/ capsule panel. 300 capsules. Same other ingredients. DSLD 326234 matches. UPC 023542101431. The check digit passes.`, '023542101431'),
  row('kyolic-b438-formula-102-100-capsules', 'Kyolic Formula 102 100 Capsules', 'kyolic-b438-formula-102-capsules', 'capsule', CAP102, 'caution', `${SITE}/kyolic-formula-102-vegetarian/ capsule panel. 100 capsules. DSLD drops the potato-and-corn and vegetable-capsule wording, so no UPC was chosen. Missing UPC.`),
  row('kyolic-b438-formula-102-200-capsules', 'Kyolic Formula 102 200 Capsules', 'kyolic-b438-formula-102-capsules', 'capsule', CAP102, 'caution', `${SITE}/kyolic-formula-102-vegetarian/ capsule panel. 200 capsules. Same other ingredients. DSLD drops the parentheticals, so no UPC was chosen. Missing UPC.`),
  row('kyolic-b438-formula-102-100-tablets', 'Kyolic Formula 102 100 Tablets', 'kyolic-b438-formula-102-tablets', 'tablet', TAB102, 'caution', `${SITE}/kyolic-formula-102-vegetarian/ tablet panel. 100 tablets. Counted Limited: hydroxypropylcellulose. DSLD drops the potato-and-corn and seaweed wording, so no UPC was chosen. Missing UPC.`),
  row('kyolic-b438-formula-102-200-tablets', 'Kyolic Formula 102 200 Tablets', 'kyolic-b438-formula-102-tablets', 'tablet', TAB102, 'caution', `${SITE}/kyolic-formula-102-vegetarian/ tablet panel. 200 tablets. Same other ingredients. DSLD drops the parentheticals, so no UPC was chosen. Missing UPC.`),
  row('kyolic-b438-formula-100-100-tablets', 'Kyolic Formula 100 100 Tablets', 'kyolic-b438-formula-100-tablets', 'tablet', TAB100, 'caution', `${SITE}/kyolic-formula-100/ tablet panel. 100 tablets. Counted Limited: Whey. DSLD omits the seaweed source, so no UPC was chosen. Missing UPC.`),
  row('kyolic-b438-formula-100-200-tablets', 'Kyolic Formula 100 200 Tablets', 'kyolic-b438-formula-100-tablets', 'tablet', TAB100, 'caution', `${SITE}/kyolic-formula-100/ tablet panel. 200 tablets. Same other ingredients. DSLD omits the seaweed source, so no UPC was chosen. Missing UPC.`),
  row('kyolic-b438-liquid-2-fl-oz', 'Kyolic Aged Garlic Extract Liquid 2 fl oz', 'kyolic-b438-liquid', 'liquid', LIQUID, 'caution', `${SITE}/plain-liquid/ is the ingredient panel. 2 fl oz. Counted Limited: residual alcohol from extraction, caramel color. DSLD says Alcohol and Caramel, so no UPC was chosen. Missing UPC.`),
  row('kyolic-b438-liquid-4-fl-oz', 'Kyolic Aged Garlic Extract Liquid 4 fl oz', 'kyolic-b438-liquid', 'liquid', LIQUID, 'caution', `${SITE}/plain-liquid/ is the ingredient panel. 4 fl oz. Same other ingredients. DSLD says Alcohol and Caramel, so no UPC was chosen. Missing UPC.`),
];
