// DRAFT / not verified / batch 437 KYR6-e (t291u).
// Kyolic rows whose other ingredients are already locked. No honest note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t139uWhyForName } from '../scan-preview/t139uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t240uLock } from '../scan-preview/t240uLocks';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t280uLock } from '../scan-preview/t280uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t291u why ${name}`);
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string, form = 'capsule'): IngredientFlag {
  const hit = t256uResolve(name, form) || t256uResolve(name, 'softgel');
  if (!hit) throw new Error(`t291u stored ${name}`);
  const why = hit.lock.why || cleanTokenWhyForName(name) || t134uWhyForName(name) || t139uWhyForName(name);
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, mark);
}

const WHEY = t240uLock('whey');
const HPC = t280uLock('hydroxypropyl cellulose');
const RICE = t135uWhyForName('rice extract', 'capsule');
if (!WHEY?.why || !HPC?.why || !RICE) throw new Error('t291u special why');
const GEL = t134uWhyForName('gelatin')!;
const MCC = t134uWhyForName('microcrystalline cellulose')!;
const MAG = t134uWhyForName('magnesium stearate (vegetable source)')!;
const SILICA = T128U_SILICA_WHY;
if (!GEL || !MCC || !MAG) throw new Error('t291u base why');

const gel = fromLock('gelatin', 'cleared', false, GEL, 't134u');
const mcc = fromLock('Microcrystalline cellulose', 'cleared', false, MCC, 't134u');
const mag = fromLock('magnesium stearate (vegetable source)', 'cleared', false, MAG, 't134u');
const silica = fromLock('silicon dioxide', 'moderate', false, SILICA, 't160u');
const silicaWord = fromLock('silica', 'moderate', false, SILICA, 't160u');
const whey = fromLock('Whey', 'limited', true, WHEY.why, 't240u');
const hpc = fromLock('hydroxypropylcellulose', 'limited', true, HPC.why, 't280u');

const CAP100: IngredientFlag[] = [whey, gel, mag];
const CAP_SILICA: IngredientFlag[] = [gel, mcc, silica, mag];
const CAP104: IngredientFlag[] = [gel, silica, mag];
const RESERVE: IngredientFlag[] = [gel, mcc, mag, silicaWord];
const CAP_CLEAN: IngredientFlag[] = [gel, mag];
const CAP110: IngredientFlag[] = [mcc, gel, mag];
const CURCUMIN: IngredientFlag[] = [mcc, stored('sunflower lecithin'), gel, silica, mag];
const OMEGA: IngredientFlag[] = [stored('Gelatin', 'softgel'), stored('glycerin', 'softgel'), stored('beeswax', 'softgel'), stored('water', 'softgel')];
const ONE: IngredientFlag[] = [mcc, hpc, silica, mag];
const VEGAN: IngredientFlag[] = [mcc, stored('hypromellose (vegetarian) capsule')];
const MOOD: IngredientFlag[] = [stored('Hypromellose'), mcc];
const MEMORY: IngredientFlag[] = [mcc, gel, mag];
const IMMUNE: IngredientFlag[] = [stored('Cellulose'), stored('hypromellose'), mcc, silica];
const SLEEP: IngredientFlag[] = [mcc, stored('hypromellose'), silica];
const SMART: IngredientFlag[] = [
  mcc,
  stored('hypromellose'),
  stored('dicalcium phosphate'),
  fromLock('rice extract', 'limited', true, RICE, 't135u'),
  stored('rice hulls'),
  stored('gum arabic'),
  stored('sunflower oil'),
  silica,
];

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

export const BATCH437_KYR6E_T291U: RatingRecord[] = [
  row('kyolic-b437-formula-100-100-capsules', 'Kyolic Formula 100 100 Capsules', 'kyolic-b437-formula-100-capsules', 'capsule', CAP100, 'caution', `${SITE}/kyolic-formula-100/ capsule panel. 100 capsules. Counted Limited: Whey. UPC 023542100410 from the bottle photo and DSLD 278504. The check digit passes.`, '023542100410'),
  row('kyolic-b437-formula-100-200-capsules', 'Kyolic Formula 100 200 Capsules', 'kyolic-b437-formula-100-capsules', 'capsule', CAP100, 'caution', `${SITE}/kyolic-formula-100/ capsule panel. 200 capsules. Same other ingredients. DSLD 326197. UPC 023542100427. The check digit passes.`, '023542100427'),
  row('kyolic-b437-formula-100-300-capsules', 'Kyolic Formula 100 300 Capsules', 'kyolic-b437-formula-100-capsules', 'capsule', CAP100, 'caution', `${SITE}/kyolic-formula-100/ capsule panel. 300 capsules. Same other ingredients. DSLD 42158. UPC 023542100434. The check digit passes.`, '023542100434'),
  row('kyolic-b437-formula-103-100-capsules', 'Kyolic Formula 103 100 Capsules', 'kyolic-b437-formula-103', 'capsule', CAP_CLEAN, 'clean', `${SITE}/kyolic-formula-103/ is the ingredient panel. 100 capsules. DSLD 326204. UPC 023542103411. The check digit passes.`, '023542103411'),
  row('kyolic-b437-formula-103-200-capsules', 'Kyolic Formula 103 200 Capsules', 'kyolic-b437-formula-103', 'capsule', CAP_CLEAN, 'clean', `${SITE}/kyolic-formula-103/ is the ingredient panel. 200 capsules. Same other ingredients. DSLD 333103. UPC 023542103428. The check digit passes.`, '023542103428'),
  row('kyolic-b437-formula-103-300-capsules', 'Kyolic Formula 103 300 Capsules', 'kyolic-b437-formula-103', 'capsule', CAP_CLEAN, 'clean', `${SITE}/kyolic-formula-103/ is the ingredient panel. 300 capsules. Same other ingredients. DSLD 326205. UPC 023542103435. The check digit passes.`, '023542103435'),
  row('kyolic-b437-formula-104-100-capsules', 'Kyolic Formula 104 100 Capsules', 'kyolic-b437-formula-104', 'capsule', CAP104, 'caution', `${SITE}/kyolic-formula-104/ is the ingredient panel. 100 capsules. Silicon dioxide is Caution and does not count. DSLD 326206 and 42212 disagree on silicon dioxide versus silica for UPC 023542104418. Missing UPC.`),
  row('kyolic-b437-formula-104-200-capsules', 'Kyolic Formula 104 200 Capsules', 'kyolic-b437-formula-104', 'capsule', CAP104, 'caution', `${SITE}/kyolic-formula-104/ is the ingredient panel. 200 capsules. Same other ingredients. DSLD 333104 matches. UPC 023542104425. The check digit passes.`, '023542104425'),
  row('kyolic-b437-formula-104-300-capsules', 'Kyolic Formula 104 300 Capsules', 'kyolic-b437-formula-104', 'capsule', CAP104, 'caution', `${SITE}/kyolic-formula-104/ is the ingredient panel. 300 capsules. Same other ingredients. No sourced UPC matched this count. Missing UPC.`),
  row('kyolic-b437-formula-105-100-capsules', 'Kyolic Formula 105 100 Capsules', 'kyolic-b437-formula-105', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-105/ is the ingredient panel. 100 capsules. Silicon dioxide is Caution and does not count. DSLD 326207. UPC 023542105415. The check digit passes.`, '023542105415'),
  row('kyolic-b437-formula-105-200-capsules', 'Kyolic Formula 105 200 Capsules', 'kyolic-b437-formula-105', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-105/ is the ingredient panel. 200 capsules. Same other ingredients. No on-market UPC matched this count. Missing UPC.`),
  row('kyolic-b437-formula-106-100-capsules', 'Kyolic Formula 106 100 Capsules', 'kyolic-b437-formula-106', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-106/ is the ingredient panel. 100 capsules. DSLD 326208. UPC 023542106412. The check digit passes.`, '023542106412'),
  row('kyolic-b437-formula-106-200-capsules', 'Kyolic Formula 106 200 Capsules', 'kyolic-b437-formula-106', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-106/ is the ingredient panel. 200 capsules. Same other ingredients. DSLD 326226. UPC 023542106429. The check digit passes.`, '023542106429'),
  row('kyolic-b437-formula-107-80-capsules', 'Kyolic Formula 107 80 Capsules', 'kyolic-b437-formula-107', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-107/ is the ingredient panel. 80 capsules. DSLD 326209. UPC 023542107419. The check digit passes.`, '023542107419'),
  row('kyolic-b437-formula-107-240-capsules', 'Kyolic Formula 107 240 Capsules', 'kyolic-b437-formula-107', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-107/ is the ingredient panel. 240 capsules. Same other ingredients. DSLD 333108. UPC 023542107433. The check digit passes.`, '023542107433'),
  row('kyolic-b437-formula-108-100-capsules', 'Kyolic Formula 108 100 Capsules', 'kyolic-b437-formula-108-100', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-108/ is the ingredient panel. 100 capsules. DSLD 326210. UPC 023542108416. The check digit passes.`, '023542108416'),
  row('kyolic-b437-formula-110-100-capsules', 'Kyolic Formula 110 100 Capsules', 'kyolic-b437-formula-110-100', 'capsule', CAP110, 'clean', `${SITE}/kyolic-formula-110/ is the ingredient panel. 100 capsules. DSLD 326212. UPC 023542110419. The check digit passes.`, '023542110419'),
  row('kyolic-b437-formula-109-80-capsules', 'Kyolic Formula 109 80 Capsules', 'kyolic-b437-formula-109', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-109/ is the ingredient panel. 80 capsules. DSLD 326211 matches. UPC 023542109413. The check digit passes.`, '023542109413'),
  row('kyolic-b437-formula-109-160-capsules', 'Kyolic Formula 109 160 Capsules', 'kyolic-b437-formula-109', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-109/ is the ingredient panel. 160 capsules. Same other ingredients. DSLD 333117 matches. UPC 023542109420. The check digit passes.`, '023542109420'),
  row('kyolic-b437-formula-109-240-capsules', 'Kyolic Formula 109 240 Capsules', 'kyolic-b437-formula-109', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-formula-109/ is the ingredient panel. 240 capsules. Same other ingredients. DSLD 274373 and 69862 disagree for UPC 023542109437. Missing UPC.`),
  row('kyolic-b437-formula-112-100-capsules', 'Kyolic Blood Sugar Balance 100 Capsules', 'kyolic-b437-formula-112-100', 'capsule', CAP_SILICA, 'caution', `${SITE}/blood-sugar-balance/ is the ingredient panel. 100 capsules. DSLD 326214. UPC 023542112413. The check digit passes.`, '023542112413'),
  row('kyolic-b437-formula-111-50-capsules', 'Kyolic Curcumin 50 Capsules', 'kyolic-b437-formula-111', 'capsule', CURCUMIN, 'caution', `${SITE}/kyolic-curcumin/ is the ingredient panel. 50 capsules. DSLD 326213 matches. UPC 023542111454. The check digit passes.`, '023542111454'),
  row('kyolic-b437-formula-111-100-capsules', 'Kyolic Curcumin 100 Capsules', 'kyolic-b437-formula-111', 'capsule', CURCUMIN, 'caution', `${SITE}/kyolic-curcumin/ is the ingredient panel. 100 capsules. DSLD 333109. UPC 023542111416. The check digit passes.`, '023542111416'),
  row('kyolic-b437-formula-111-150-capsules', 'Kyolic Curcumin 150 Capsules', 'kyolic-b437-formula-111', 'capsule', CURCUMIN, 'caution', `${SITE}/kyolic-curcumin/ is the ingredient panel. 150 capsules. Same other ingredients. DSLD 333110. UPC 023542111423. The check digit passes.`, '023542111423'),
  row('kyolic-b437-formula-150-90-softgels', 'Kyolic Omega-3 90 Softgels', 'kyolic-b437-formula-150', 'softgel', OMEGA, 'clean', `${SITE}/kyolic-omega-150/ is the ingredient panel. 90 softgels. DSLD 326216. UPC 023542150491. The check digit passes.`, '023542150491'),
  row('kyolic-b437-formula-150-180-softgels', 'Kyolic Omega-3 180 Softgels', 'kyolic-b437-formula-150', 'softgel', OMEGA, 'clean', `${SITE}/kyolic-omega-150/ is the ingredient panel. 180 softgels. Same other ingredients. DSLD 333111. UPC 023542150422. The check digit passes.`, '023542150422'),
  row('kyolic-b437-formula-114-75-capsules', 'Kyolic Red Yeast Rice plus CoQ10 75 Capsules', 'kyolic-b437-formula-114', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-redyeastricepluscoq10/ is the ingredient panel. 75 capsules. DSLD 326215 matches. UPC 023542114417. The check digit passes.`, '023542114417'),
  row('kyolic-b437-formula-114-150-capsules', 'Kyolic Red Yeast Rice plus CoQ10 150 Capsules', 'kyolic-b437-formula-114', 'capsule', CAP_SILICA, 'caution', `${SITE}/kyolic-redyeastricepluscoq10/ is the ingredient panel. 150 capsules. Same other ingredients. No sourced UPC matched this count. Missing UPC.`),
  row('kyolic-b437-reserve-60-capsules', 'Kyolic Reserve 60 Capsules', 'kyolic-b437-reserve', 'capsule', RESERVE, 'caution', `${SITE}/kyolic-reserve/ is the ingredient panel. 60 capsules. Silica is Caution and does not count. DSLD 326218 and 42334 disagree for UPC 023542200417. Missing UPC.`),
  row('kyolic-b437-reserve-120-capsules', 'Kyolic Reserve 120 Capsules', 'kyolic-b437-reserve', 'capsule', RESERVE, 'caution', `${SITE}/kyolic-reserve/ is the ingredient panel. 120 capsules. Same other ingredients. DSLD 333112 and 42335 disagree for UPC 023542200424. Missing UPC.`),
  row('kyolic-b437-one-per-day-30-caplets', 'Kyolic One Per Day 30 Caplets', 'kyolic-b437-one-per-day-30', 'caplet', ONE, 'caution', `${SITE}/kyolic-one-per-day/ is the ingredient panel. 30 caplets. Counted Limited: hydroxypropylcellulose. DSLD 326219 matches. UPC 023542250634. The check digit passes.`, '023542250634'),
  row('kyolic-b437-formula-300-120-capsules', 'Kyolic Formula 300 Vegan 120 Capsules', 'kyolic-b437-formula-300', 'capsule', VEGAN, 'clean', `${SITE}/kyolic-formula-300-vegan/ is the ingredient panel. 120 capsules. DSLD 269780 and 326220 disagree on hypromellose capsule versus hypromellose for UPC 023542300926. Missing UPC.`),
  row('kyolic-b437-formula-300-360-capsules', 'Kyolic Formula 300 Vegan 360 Capsules', 'kyolic-b437-formula-300', 'capsule', VEGAN, 'clean', `${SITE}/kyolic-formula-300-vegan/ is the ingredient panel. 360 capsules. DSLD 333118. UPC 023542300940. The check digit passes.`, '023542300940'),
  row('kyolic-b437-calm-mood-60-capsules', 'Kyolic Calm Mood 60 Capsules', 'kyolic-b437-calm-mood', 'capsule', MOOD, 'clean', `${SITE}/calm-mood/ is the ingredient panel. 60 capsules. Same other ingredients as the 120-capsule pack. No sourced UPC. Missing UPC.`),
  row('kyolic-b437-calm-mood-120-capsules', 'Kyolic Calm Mood 120 Capsules', 'kyolic-b437-calm-mood', 'capsule', MOOD, 'clean', `${SITE}/calm-mood/ is the ingredient panel. 120 capsules. No sourced UPC. Missing UPC.`),
  row('kyolic-b437-brain-memory-90-capsules', 'Kyolic Brain Memory 90 Capsules', 'kyolic-b437-brain-memory-90', 'capsule', MEMORY, 'clean', `${SITE}/brain-memory/ is the ingredient panel. 90 capsules. No sourced UPC. Missing UPC.`),
  row('kyolic-b437-immune-mushrooms-60-capsules', 'Kyolic Immune Mushrooms+ 60 Capsules', 'kyolic-b437-immune-mushrooms', 'capsule', IMMUNE, 'caution', `${SITE}/immune-mushrooms/ is the ingredient panel. 60 capsules. Silicon dioxide is Caution and does not count. No sourced UPC. Missing UPC.`),
  row('kyolic-b437-immune-mushrooms-120-capsules', 'Kyolic Immune Mushrooms+ 120 Capsules', 'kyolic-b437-immune-mushrooms', 'capsule', IMMUNE, 'caution', `${SITE}/immune-mushrooms/ is the ingredient panel. 120 capsules. Same other ingredients. No sourced UPC. Missing UPC.`),
  row('kyolic-b437-smart-mushrooms-60-capsules', 'Kyolic Smart Mushrooms+ 60 Capsules', 'kyolic-b437-smart-mushrooms-60', 'capsule', SMART, 'caution', `${SITE}/smart-mushrooms/ is the ingredient panel. 60 capsules. The rice-extract blend is graded as rice extract, rice hulls, gum arabic, and sunflower oil. Counted Limited: rice extract. No sourced UPC. Missing UPC.`),
  row('kyolic-b437-sleep-mushrooms-30-capsules', 'Kyolic Sleep Mushrooms+ 30 Capsules', 'kyolic-b437-sleep-mushrooms', 'capsule', SLEEP, 'caution', `${SITE}/sleep-mushrooms/ is the ingredient panel. 30 capsules. Silicon dioxide is Caution and does not count. No sourced UPC. Missing UPC.`),
  row('kyolic-b437-sleep-mushrooms-60-capsules', 'Kyolic Sleep Mushrooms+ 60 Capsules', 'kyolic-b437-sleep-mushrooms', 'capsule', SLEEP, 'caution', `${SITE}/sleep-mushrooms/ is the ingredient panel. 60 capsules. Same other ingredients. No sourced UPC. Missing UPC.`),
];
