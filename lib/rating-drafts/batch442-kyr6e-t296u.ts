// DRAFT / not verified / batch 442 KYR6-e (t296u).
// Flora rows unlocked by the t296 locks. Aqueous extracts are graded as the named plants.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t178uWhyForName } from '../scan-preview/t178uTokenWhy';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t259uLock } from '../scan-preview/t259uLocks';
import { t295uLock } from '../scan-preview/t295uLocks';
import { t296uLock } from '../scan-preview/t296uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t296u why ${name}`);
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string, form = 'capsule'): IngredientFlag {
  const own = t296uLock(name) ?? t295uLock(name, form);
  if (own) return fromLock(name, own.grade, own.counts, own.why, t296uLock(name) ? 't296u' : 't295u');
  const hit = t256uResolve(name, form);
  if (!hit) throw new Error(`t296u stored ${name}`);
  const why = hit.lock.why || t134uWhyForName(name) || cleanTokenWhyForName(name) || t178uWhyForName(name);
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, mark);
}

const MALTO = t259uLock('maltodextrin');
const FLAVOR = t256uResolve('natural flavors', 'liquid');
if (!MALTO?.why || !FLAVOR?.lock.why) throw new Error('t296u flavor lock');
const malto = fromLock('maltodextrin', MALTO.grade, MALTO.counts, MALTO.why, 't259u');
const flavors = fromLock('natural flavors', FLAVOR.lock.grade, FLAVOR.lock.counts, FLAVOR.lock.why, FLAVOR.mark === 'stored' ? 't160u' : FLAVOR.mark);
const silica = fromLock('silicon dioxide', 'moderate', false, T128U_SILICA_WHY, 't160u');
const filtered = stored('Filtered water', 'liquid');
const citric = stored('citric acid', 'liquid');

const LOZENGE: IngredientFlag[] = [
  malto,
  stored('xylitol', 'lozenge'),
  stored('microcrystalline cellulose'),
  stored('natural raspberry flavor'),
  stored('ascorbic acid'),
  citric,
  stored('magnesium stearate'),
  silica,
  stored('skim milk'),
  stored('soy peptone'),
  stored('sucrose'),
  stored('trehalose'),
  stored('yeast extract'),
];
const MULTI: IngredientFlag[] = [
  filtered,
  stored('mango fruit puree', 'liquid'),
  stored('pear fruit juice concentrate', 'liquid'),
  stored('pineapple fruit puree', 'liquid'),
  flavors,
  stored('xanthan gum', 'liquid'),
  stored('German chamomile flower', 'liquid'),
  stored('dog rose fruit (hip)', 'liquid'),
  stored('anise seed', 'liquid'),
  stored('acerola fruit juice powder', 'liquid'),
  stored('European elder fruit juice powder', 'liquid'),
  stored('astaxanthin complex (from Haematococcus pluvialis whole algae extract)', 'liquid'),
  stored('acacia gum', 'liquid'),
  silica,
  stored('olive oil', 'liquid'),
  citric,
];
const IRON: IngredientFlag[] = [
  filtered,
  stored('orange juice concentrate', 'liquid'),
  stored('pineapple puree', 'liquid'),
  stored('molasses', 'liquid'),
  stored('spinach', 'liquid'),
  stored('anise', 'liquid'),
  stored('organic red beet juice crystals', 'liquid'),
  stored('organic acerola fruit juice powder', 'liquid'),
  stored('ascorbic acid', 'liquid'),
  citric,
];

function row(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], source: string, extra?: { audience?: 'adult' | 'kids'; minAge?: number }): RatingRecord {
  return {
    id, productName: name, brand: 'Flora', category: 'Vitamins', formulaId, form,
    audience: extra?.audience ?? 'adult', ...(extra?.minAge ? { minAge: extra.minAge } : {}),
    recordStatus: UNVERIFIED, productType: SUPPLEMENT, retailers: ['Flora'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict, sourcesGeneral: [source],
  };
}

const SITE = 'https://www.florahealth.com/products';

export const BATCH442_KYR6E_T296U: RatingRecord[] = [
  row('flora-b442-super-5-60-lozenges', 'Flora Super 5 Lozenge Probiotic 60 Lozenges', 'flora-b442-super-5-60', 'lozenge', LOZENGE, 'caution', `${SITE}/super-5-lozenge-probiotic is the ingredient panel. 60 lozenges. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b442-daily-multi-15oz', 'Flora Daily Multi Essentials+ 15 fl oz', 'flora-b442-daily-multi-15', 'liquid', MULTI, 'caution', `${SITE}/daily-multi-essentials is the ingredient panel. 15 fl oz. The aqueous extract is graded as German chamomile flower, dog rose fruit (hip), and anise seed. Counted Limited: natural flavors. No sourced UPC. Missing UPC.`),
  row('flora-b442-kids-multi-7-6oz', "Flora Kid's Multi Essentials+ 7.6 fl oz", 'flora-b442-kids-multi-7-6', 'liquid', MULTI, 'caution', `${SITE}/kids-multi-essentials is the ingredient panel. 7.6 fl oz. The aqueous extract is graded as German chamomile flower, dog rose fruit (hip), and anise seed. Counted Limited: natural flavors. Adults and children 4 years and over. No sourced UPC. Missing UPC.`, { audience: 'kids', minAge: 4 }),
  row('flora-b442-iron-8-1oz', 'Flora Iron 8.1 fl oz', 'flora-b442-iron', 'liquid', IRON, 'caution', `${SITE}/iron-b-vitamin-complex-liquid is the ingredient panel. 8.1 fl oz. The aqueous extract is graded as spinach and anise. Counted Limited: molasses. No sourced UPC matched this count. Missing UPC.`),
  row('flora-b442-iron-15oz', 'Flora Iron 15 fl oz', 'flora-b442-iron', 'liquid', IRON, 'caution', `${SITE}/iron-b-vitamin-complex-liquid is the ingredient panel. 15 fl oz. Same other ingredients. DSLD drops organic from the beet and acerola tokens, so UPC 061998647424 was not used. Missing UPC.`),
];
