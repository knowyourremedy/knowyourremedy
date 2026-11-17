// DRAFT / not verified / batch 443 KYR6-e (t298u).
// Renew Life rows whose other ingredients are already locked. No honest note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t295uLock } from '../scan-preview/t295uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t298u why ${name}`);
  const meth = grade === 'moderate'
    ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
    : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string): IngredientFlag {
  const gellan = t295uLock(name);
  if (gellan?.why) return fromLock(name, gellan.grade, gellan.counts, gellan.why, 't295u');
  const hit = t256uResolve(name, 'capsule');
  if (!hit) throw new Error(`t298u stored ${name}`);
  const why = hit.lock.why || t134uWhyForName(name) || cleanTokenWhyForName(name);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

const SHELL: IngredientFlag[] = [stored('Cellulose'), stored('Gellan Gum')];
const SILICA: IngredientFlag[] = [...SHELL, fromLock('Silica', 'moderate', false, T128U_SILICA_WHY, 't160u')];

function row(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], source: string): RatingRecord {
  return {
    id, productName: name, brand: 'Renew Life', category: 'Vitamins', formulaId, form,
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Renew Life'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict, sourcesGeneral: [source],
  };
}

const SITE = 'https://www.renewlife.com/products';
const CAP = `${SITE} delayed-release capsule is cellulose and gellan gum.`;

export const BATCH443_KYR6E_T298U: RatingRecord[] = [
  row('renew-life-b443-colon-care-30', 'Renew Life Ultimate Flora Colon Care 80 Billion 30 Capsules', 'renew-life-b443-colon-care', 'capsule', SHELL, 'clean', `${CAP} 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-colon-care-60', 'Renew Life Ultimate Flora Colon Care 80 Billion 60 Capsules', 'renew-life-b443-colon-care', 'capsule', SHELL, 'clean', `${CAP} 60 capsules. Same other ingredients. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-daily-mood-60', 'Renew Life Ultimate Flora Daily Mood+ 65 Billion 60 Capsules', 'renew-life-b443-daily-mood-60', 'capsule', SHELL, 'clean', `${CAP} 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-digestive-once-daily-30', 'Renew Life Ultimate Flora Digestive Once Daily 65 Billion 30 Capsules', 'renew-life-b443-digestive-once-daily-30', 'capsule', SHELL, 'clean', `${CAP} 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-extra-care-100-30', 'Renew Life Ultimate Flora Extra Care 100 Billion 30 Capsules', 'renew-life-b443-extra-care-100-30', 'capsule', SHELL, 'clean', `${CAP} 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-mens-once-daily-30', "Renew Life Ultimate Flora Men's Once Daily 65 Billion 30 Capsules", 'renew-life-b443-mens-once-daily-30', 'capsule', SHELL, 'clean', `${CAP} 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-womens-50-30', "Renew Life Ultimate Flora Women's 50+ 70 Billion 30 Capsules", 'renew-life-b443-womens-50-30', 'capsule', SHELL, 'clean', `${CAP} 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-clear-fiber-7oz', 'Renew Life Completely Clear Organic Prebiotic Fiber 7 oz', 'renew-life-b443-clear-fiber-7oz', 'powder', [], 'clean', `${SITE}/completely-clear-organic-prebiotic-fiber-7-oz-198-g-powder-rn1581105 says other ingredients: none. 7 oz. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-extra-care-200-sticks', 'Renew Life Ultimate Flora Extra Care 200 Billion 7 Stick Packs', 'renew-life-b443-extra-care-200-sticks', 'powder', [], 'clean', `${SITE}/ultimate-flora-extra-care-probiotic-200-billion-7-stick-packs-rn1550041 says other ingredients: none. 7 stick packs. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-intestinew-6oz', 'Renew Life IntestiNew 6 oz', 'renew-life-b443-intestinew-6oz', 'powder', [], 'clean', `${SITE}/intestinew-intestinal-lining-support-30-day-supply-6-oz-rn15638 says other ingredients: none. Contains shellfish is an allergen line. 6 oz. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-extra-care-150-30', 'Renew Life Ultimate Flora Extra Care 150 Billion 30 Capsules', 'renew-life-b443-extra-care-150-30', 'capsule', SILICA, 'caution', `${CAP} Silica is Caution and does not count. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-womens-once-daily-30', "Renew Life Ultimate Flora Women's Once Daily 65 Billion 30 Capsules", 'renew-life-b443-womens-once-daily-30', 'capsule', SILICA, 'caution', `${CAP} Silica is Caution and does not count. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b443-womens-vaginal-advanced-30', "Renew Life Ultimate Flora Women's Vaginal Care Advanced 70 Billion 30 Capsules", 'renew-life-b443-womens-vaginal-advanced-30', 'capsule', SILICA, 'caution', `${CAP} Silica is Caution and does not count. 30 capsules. No sourced UPC. Missing UPC.`),
];
