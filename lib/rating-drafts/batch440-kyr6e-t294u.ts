// DRAFT / not verified / batch 440 KYR6-e (t294u).
// Flora rows whose other ingredients are already locked. No honest note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t259uLock } from '../scan-preview/t259uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t294u why ${name}`);
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string, form = 'capsule'): IngredientFlag {
  const hit = t256uResolve(name, form);
  if (!hit) throw new Error(`t294u stored ${name}`);
  const why = hit.lock.why || t134uWhyForName(name) || cleanTokenWhyForName(name);
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, mark);
}

const MALTO = t259uLock('maltodextrin');
if (!MALTO?.why) throw new Error('t294u maltodextrin');
const mcc = stored('microcrystalline cellulose');
const mag = stored('magnesium stearate');
const hpmc = stored('hydroxypropyl methylcellulose');
const malto = fromLock('maltodextrin', MALTO.grade, MALTO.counts, MALTO.why, 't259u');
const silica = fromLock('silicon dioxide', 'moderate', false, T128U_SILICA_WHY, 't160u');
const water = stored('Filtered water', 'liquid');
const citric = stored('citric acid', 'liquid');
const flax = stored('organic flaxseed oil', 'liquid');

const CAP: IngredientFlag[] = [stored('Hypromellose'), mcc, mag];
const ASH: IngredientFlag[] = [mcc, hpmc, mag];
const CIRCU: IngredientFlag[] = [hpmc, mcc, silica, mag];
const WATER: IngredientFlag[] = [water, citric];
const PRO: IngredientFlag[] = [stored('Water', 'capsule'), hpmc];
const ENZYME: IngredientFlag[] = [malto, hpmc, mcc, mag];
const FLAX: IngredientFlag[] = [{ ...flax, name: 'Organic flax seed oil' }];

function row(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], source: string, barcode?: string): RatingRecord {
  return {
    id, productName: name, brand: 'Flora', category: 'Vitamins', formulaId, form,
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Flora'], ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict, sourcesGeneral: [source],
  };
}

const SITE = 'https://www.florahealth.com/products';

export const BATCH440_KYR6E_T294U: RatingRecord[] = [
  row('flora-b440-acerola-120-capsules', 'Flora Acerola Natural Vitamin C 120 Capsules', 'flora-b440-acerola-120', 'capsule', CAP, 'clean', `${SITE}/acerola-natural-vitamin-c-capsules is the ingredient panel. 120 capsules. No sourced UPC. Missing UPC.`),
  row('flora-b440-ashwagandha-120-capsules', 'Flora Ashwagandha KSM-66 120 Capsules', 'flora-b440-ashwagandha-120', 'capsule', ASH, 'clean', `${SITE}/ashwagandha-ksm-66 is the ingredient panel. 120 capsules. No sourced UPC. Missing UPC.`),
  row('flora-b440-circuvein-60-capsules', 'Flora CircuVein 60 Capsules', 'flora-b440-circuvein-60', 'capsule', CIRCU, 'caution', `${SITE}/circuvein is the ingredient panel. 60 capsules. Silicon dioxide is Caution and does not count. DSLD 213440 matches. UPC 061998615782. The check digit passes.`, '061998615782'),
  row('flora-b440-flor-essence-17oz', 'Flora Flor-Essence 17 fl oz', 'flora-b440-flor-essence', 'liquid', WATER, 'clean', `${SITE}/flor-essence is the ingredient panel. 17 fl oz. DSLD lists watercress herb extract with the other ingredients, so UPC 061998680704 was not used. Missing UPC.`),
  row('flora-b440-flor-essence-32oz', 'Flora Flor-Essence 32 fl oz', 'flora-b440-flor-essence', 'liquid', WATER, 'clean', `${SITE}/flor-essence is the ingredient panel. 32 fl oz. Same other ingredients. DSLD lists watercress herb extract with the other ingredients, so UPC 061998680728 was not used. Missing UPC.`),
  row('flora-b440-flor-essence-turkey-17oz', 'Flora Flor-Essence Turkey Tail and Turmeric 17 fl oz', 'flora-b440-flor-essence-turkey', 'liquid', WATER, 'clean', `${SITE}/flor-essence-turkey-tail-turmeric is the ingredient panel. 17 fl oz. No sourced UPC. Missing UPC.`),
  row('flora-b440-flor-essence-turkey-32oz', 'Flora Flor-Essence Turkey Tail and Turmeric 32 fl oz', 'flora-b440-flor-essence-turkey', 'liquid', WATER, 'clean', `${SITE}/flor-essence-turkey-tail-turmeric is the ingredient panel. 32 fl oz. Same other ingredients. No sourced UPC. Missing UPC.`),
  row('flora-b440-swedish-bitters-3-4oz', 'Flora Swedish Bitters Alcohol-Free 3.4 fl oz', 'flora-b440-swedish-bitters', 'liquid', WATER, 'clean', `${SITE}/swedish-bitters-alcohol-free is the ingredient panel. 3.4 fl oz. DSLD 323243 and DSLD 73222 disagree, so no UPC was chosen. Missing UPC.`),
  row('flora-b440-swedish-bitters-8-5oz', 'Flora Swedish Bitters Alcohol-Free 8.5 fl oz', 'flora-b440-swedish-bitters', 'liquid', WATER, 'clean', `${SITE}/swedish-bitters-alcohol-free is the ingredient panel. 8.5 fl oz. Same other ingredients. DSLD 323244 matches. UPC 061998681923. The check digit passes.`, '061998681923'),
  row('flora-b440-pro-essence-120-capsules', 'Flora Pro-Essence 120 Capsules', 'flora-b440-pro-essence-120', 'capsule', PRO, 'clean', `${SITE}/pro-essence is the ingredient panel. 120 capsules. DSLD 214992 matches. UPC 061998680957. The check digit passes.`, '061998680957'),
  row('flora-b440-enzyme-daily-60-capsules', 'Flora Daily Maintenance Digestive Enzymes 60 Capsules', 'flora-b440-enzyme-daily-60', 'capsule', ENZYME, 'caution', `${SITE}/adult-enzyme-daily-maintenance is the ingredient panel. 60 capsules. Counted Limited: maltodextrin. DSLD adds water, so UPC 061998613702 was not used. Missing UPC.`),
  row('flora-b440-enzyme-urgent-60-capsules', 'Flora Urgent Support Digestive Enzymes 60 Capsules', 'flora-b440-enzyme-urgent-60', 'capsule', ENZYME, 'caution', `${SITE}/advanced-adult-enzyme-urgent-care is the ingredient panel. 60 capsules. Counted Limited: maltodextrin. DSLD adds water, so UPC 061998613795 was not used. Missing UPC.`),
  row('flora-b440-enzyme-immediate-60-capsules', 'Flora Immediate Support Digestive Enzymes 60 Capsules', 'flora-b440-enzyme-immediate', 'capsule', ENZYME, 'caution', `${SITE}/immediate-relief-enzyme-blend is the ingredient panel. 60 capsules. Counted Limited: maltodextrin. DSLD adds water, so UPC 061998613627 was not used. Missing UPC.`),
  row('flora-b440-enzyme-immediate-90-capsules', 'Flora Immediate Support Digestive Enzymes 90 Capsules', 'flora-b440-enzyme-immediate', 'capsule', ENZYME, 'caution', `${SITE}/immediate-relief-enzyme-blend is the ingredient panel. 90 capsules. Same other ingredients. DSLD 323240 matches. UPC 061998613603. The check digit passes.`, '061998613603'),
  row('flora-b440-flax-oil-8-5oz', 'Flora Organic Flax Oil 8.5 fl oz', 'flora-b440-flax-oil', 'liquid', FLAX, 'caution', `${SITE}/flax-oil-certified-organic is the ingredient panel. 8.5 fl oz. Organic flax seed oil is the liquid base and counts. DSLD 213379 matches. UPC 061998679005. The check digit passes.`, '061998679005'),
  row('flora-b440-flax-oil-17oz', 'Flora Organic Flax Oil 17 fl oz', 'flora-b440-flax-oil', 'liquid', FLAX, 'caution', `${SITE}/flax-oil-certified-organic is the ingredient panel. 17 fl oz. Same ingredient. DSLD 213375 matches. UPC 061998679029. The check digit passes.`, '061998679029'),
  row('flora-b440-flax-oil-32oz', 'Flora Organic Flax Oil 32 fl oz', 'flora-b440-flax-oil', 'liquid', FLAX, 'caution', `${SITE}/flax-oil-certified-organic is the ingredient panel. 32 fl oz. Same ingredient. DSLD 213382 matches. UPC 061998678985. The check digit passes.`, '061998678985'),
];
