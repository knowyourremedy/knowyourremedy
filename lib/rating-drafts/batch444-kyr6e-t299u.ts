// DRAFT / not verified / batch 444 KYR6-e (t299u).
// Renew Life rows unlocked by the t299 locks. Gummies are Avoid from sunflower seed oil. No 3+ note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t138uWhyForName } from '../scan-preview/t138uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t252uLock } from '../scan-preview/t252uLocks';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t259uLock } from '../scan-preview/t259uLocks';
import { t295uLock } from '../scan-preview/t295uLocks';
import { t299uLock } from '../scan-preview/t299uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t299u why ${name}`);
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited' && counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string, form = 'capsule'): IngredientFlag {
  const own = t299uLock(name, form) ?? t295uLock(name, form);
  if (own) return fromLock(name, own.grade, own.counts, own.why, t299uLock(name, form) ? 't299u' : 't295u');
  const coconut = t252uLock(name, form);
  if (coconut?.why) return fromLock(name, coconut.grade, coconut.counts, coconut.why, 't252u');
  const malto = t259uLock(name);
  if (malto?.why && name.toLowerCase() === 'modified starch') return fromLock(name, malto.grade, malto.counts, malto.why, 't259u');
  const hit = t256uResolve(name, form);
  if (!hit) throw new Error(`t299u stored ${name} ${form}`);
  const why = hit.lock.why || t134uWhyForName(name) || t138uWhyForName(name) || cleanTokenWhyForName(name) || (name.toLowerCase() === 'silica' ? T128U_SILICA_WHY : undefined) || (name.toLowerCase() === 'bamboo extract' ? 'Bamboo extract is a plant silica source used as a flow agent. It is graded Limited and counts toward a 3+ Limited stack.' : undefined);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

const shell = (name: string) => stored(name);
const cellulose = stored('Cellulose');
const gellan = stored('Gellan Gum');
const mct = stored('MCT');
const silica = fromLock('Silica', 'moderate', false, T128U_SILICA_WHY, 't160u');
const plantCellulose = stored('Cellulose (Plant Origin)');
const MCT_SILICA = [cellulose, gellan, mct, silica];
const MCT_ONLY = [cellulose, gellan, mct];
const MCT_PLANT = [plantCellulose, cellulose, gellan, mct];

const GUMMY: IngredientFlag[] = [
  stored('Glucose Syrup', 'gummy'),
  stored('Organic Sugar', 'gummy'),
  stored('Pectin', 'gummy'),
  stored('Citric Acid', 'gummy'),
  stored('Natural Flavors', 'gummy'),
  stored('Sodium Citrate', 'gummy'),
  stored('Sunflower Seed Oil', 'gummy'),
  stored('Carnauba Wax', 'gummy'),
  stored('Coconut Oil', 'gummy'),
  stored('Turmeric (color)', 'gummy'),
];

function row(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], source: string, extra?: { audience?: 'adult' | 'kids'; minAge?: number }): RatingRecord {
  return {
    id, productName: name, brand: 'Renew Life', category: 'Vitamins', formulaId, form,
    audience: extra?.audience ?? 'adult', ...(extra?.minAge ? { minAge: extra.minAge } : { minAge: extra?.audience === 'kids' ? undefined : 18 }),
    recordStatus: UNVERIFIED, productType: SUPPLEMENT, retailers: ['Renew Life'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict, sourcesGeneral: [source],
  };
}

const SITE = 'https://www.renewlife.com/products';

export const BATCH444_KYR6E_T299U: RatingRecord[] = [
  row('renew-life-b444-candismart', 'Renew Life CandiSmart', 'renew-life-b444-candismart', 'capsule', [shell('Non-GMO Vegetarian capsule')], 'clean', `${SITE}/candismart-yeast-balancing-formula-15-day-program-rn15524 other ingredient is the capsule shell. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-cleanse-more-60', 'Renew Life Cleanse More 60 Capsules', 'renew-life-b444-cleanse-more', 'capsule', [shell('Non-GMO Vegetarian capsule')], 'clean', `${SITE}/cleanse-more-overnight-formula-60-vegetarian-capsules-rn15523 other ingredient is the capsule shell. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-cleanse-more-100', 'Renew Life Cleanse More 100 Capsules', 'renew-life-b444-cleanse-more-100', 'capsule', [shell('Non-GMO Vegan Capsule')], 'clean', `${SITE}/cleanse-more-overnight-formula-100-vegetarian-capsules-rn15644 other ingredient is the capsule shell. 100 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-cleanse-smart', 'Renew Life Cleanse Smart', 'renew-life-b444-cleanse-smart', 'capsule', [shell('Non-GMO Vegetarian capsule')], 'clean', `${SITE}/cleanse-smart-total-body-cleanse-total-body-cleanse-rn15522 other ingredient is the capsule shell. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-3-day-24', 'Renew Life 3-Day Cleanse 24 Capsules', 'renew-life-b444-3-day-24', 'capsule', [shell('Non-GMO Vegan Capsule')], 'clean', `${SITE}/3-day-cleanse-total-body-reset-24-vegan-capsules-rn15979 other ingredient is the capsule shell. 24 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-fiber-smart-120', 'Renew Life Fiber Smart 120 Capsules', 'renew-life-b444-fiber-smart-120', 'capsule', [shell('Non-GMO Vegan Capsule')], 'clean', `${SITE}/fiber-smart-with-probiotics-120-vegan-capsules-rn15632 other ingredient is the capsule shell. 120 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-daily-fiber-150', 'Renew Life Daily Digestive Prebiotic Fiber 150 Capsules', 'renew-life-b444-daily-fiber-150', 'capsule', [shell('Vegan Capsule')], 'clean', `${SITE}/daily-digestive-prebiotic-fiber-150-vegetarian-capsules-rn1581106 other ingredient is the capsule shell. 150 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-florazyme-90', 'Renew Life FloraZyme 90 Capsules', 'renew-life-b444-florazyme-90', 'capsule', [shell('Vegan Capsule')], 'clean', `${SITE}/florazyme-digestive-enzymes-dr-formulated-90-vegan-capsules-rn24821 other ingredient is the capsule shell. 90 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-triple-action-45', 'Renew Life Digestive Enzymes Triple Action 45 Capsules', 'renew-life-b444-triple-action-45', 'capsule', [shell('Non-GMO Vegan Capsule')], 'clean', `${SITE}/digestive-enzymes-triple-action-pre-pro-postbiotics-45-vegan-capsules-rn26821 other ingredient is the capsule shell. 45 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-daily-balance-60', 'Renew Life Daily Balance 2-in-1 60 Capsules', 'renew-life-b444-daily-balance-60', 'capsule', [shell('Organic Vegetarian Capsule')], 'clean', `${SITE}/daily-balance-2-in-1-prebiotics-probiotics-60-vegetarian-capsules-rn1550167 other ingredient is the capsule shell. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-daily-60', "Renew Life Women's Daily 3-in-1 60 Capsules", 'renew-life-b444-womens-daily-60', 'capsule', [shell('Organic Vegetarian Capsule')], 'clean', `${SITE}/womens-daily-3-in-1-prebiotics-probiotics-60-vegetarian-capsules-rn1550168 other ingredient is the capsule shell. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-liver-support-90', 'Renew Life Liver Support 90 Capsules', 'renew-life-b444-liver-support-90', 'capsule', [shell('Vegetarian Capsule')], 'clean', `${SITE}/liver-support-herbal-detox-formula-90-vegetarian-capsules-rn1550069 other ingredient is the capsule shell. Contains soy is an allergen line. 90 capsules. No sourced UPC. Missing UPC.`),

  row('renew-life-b444-extra-care-30-30', 'Renew Life Ultimate Flora Extra Care 30 Billion 30 Capsules', 'renew-life-b444-extra-care-30', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-30-billion-30-delayed-release-vegan-caps-rn1530081 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-extra-care-30-60', 'Renew Life Ultimate Flora Extra Care 30 Billion 60 Capsules', 'renew-life-b444-extra-care-30-60', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-30-billion-60-delayed-release-vegan-caps-rn1550136 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-extra-care-30-go-30', 'Renew Life Ultimate Flora Extra Care 30 Billion Go Pack 30 Capsules', 'renew-life-b444-extra-care-30-go-30', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-30-billion-go-pack-30-delayed-release-vegan-caps-rn1530118 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-extra-care-50-30', 'Renew Life Ultimate Flora Extra Care 50 Billion 30 Capsules', 'renew-life-b444-extra-care-50', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-50-billion-30-delayed-release-vegan-caps-rn1550148 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-extra-care-50-60', 'Renew Life Ultimate Flora Extra Care 50 Billion 60 Capsules', 'renew-life-b444-extra-care-50-60', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-50-billion-60-delayed-release-vegan-caps-rn1550149 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-extra-care-50-90', 'Renew Life Ultimate Flora Extra Care 50 Billion 90 Capsules', 'renew-life-b444-extra-care-50-90', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-50-billion-90-delayed-release-vegan-caps-rn1550150 capsule is cellulose and gellan gum. Counted Limited: MCT. 90 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-extra-care-50-go-30', 'Renew Life Ultimate Flora Extra Care 50 Billion Go Pack 30 Capsules', 'renew-life-b444-extra-care-50-go', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-50-billion-go-pack-30-delayed-release-vegan-caps-rn1550184 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-extra-care-50-go-60', 'Renew Life Ultimate Flora Extra Care 50 Billion Go Pack 60 Capsules', 'renew-life-b444-extra-care-50-go-60', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-extra-care-probiotic-50-billion-go-pack-60-delayed-release-vegan-caps-rn1550183 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-50-plus-30', 'Renew Life Ultimate Flora 50+ 30 Billion 30 Capsules', 'renew-life-b444-50-plus', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-50-probiotic-30-billion-30-delayed-release-vegan-caps-rn1550133 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-50-plus-60', 'Renew Life Ultimate Flora 50+ 30 Billion 60 Capsules', 'renew-life-b444-50-plus-60', 'capsule', MCT_PLANT, 'caution', `${SITE}/ultimate-flora-50-probiotic-30-billion-60-delayed-release-vegan-caps-rn1550134 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-50-plus-90', 'Renew Life Ultimate Flora 50+ 30 Billion 90 Capsules', 'renew-life-b444-50-plus-90', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-50-probiotic-30-billion-90-delayed-release-vegan-caps-rn1550135 capsule is cellulose and gellan gum. Counted Limited: MCT. 90 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-everyday-15-30', 'Renew Life Ultimate Flora Everyday Care 15 Billion 30 Capsules', 'renew-life-b444-everyday-15', 'capsule', MCT_PLANT, 'caution', `${SITE}/ultimate-flora-everyday-care-probiotic-15-billion-30-delayed-release-vegan-caps-rn1550139 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-everyday-15-60', 'Renew Life Ultimate Flora Everyday Care 15 Billion 60 Capsules', 'renew-life-b444-everyday-15-60', 'capsule', MCT_PLANT, 'caution', `${SITE}/ultimate-flora-everyday-care-probiotic-15-billion-60-delayed-release-vegan-caps-rn1550140 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-everyday-15-go-30', 'Renew Life Ultimate Flora Everyday Care 15 Billion Go Pack 30 Capsules', 'renew-life-b444-everyday-15-go-30', 'capsule', MCT_PLANT, 'caution', `${SITE}/ultimate-flora-everyday-care-probiotic-15-billion-go-pack-30-delayed-release-vegan-caps-rn1550111 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-mens-care-30', "Renew Life Ultimate Flora Men's Care 50 Billion 30 Capsules", 'renew-life-b444-mens-care-30', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-mens-care-probiotic-50-billion-30-delayed-release-vegan-caps-rn1530124 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-mens-complete-30', "Renew Life Ultimate Flora Men's Complete 90 Billion 30 Capsules", 'renew-life-b444-mens-complete-30', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-mens-complete-probiotic-90-billion-30-delayed-release-vegan-caps-rn1550161 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-dr-70-30', 'Renew Life Ultimate Flora 70 Billion Dr. Formulated 30 Capsules', 'renew-life-b444-dr-70-30', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-probiotic-70-billion-dr-formulated-30-delayed-release-vegan-caps-rn28793 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-care-15-go-30', "Renew Life Ultimate Flora Women's Care 15 Billion Go Pack 30 Capsules", 'renew-life-b444-womens-care-15-go-30', 'capsule', MCT_PLANT, 'caution', `${SITE}/ultimate-flora-womens-care-probiotic-15-billion-go-pack-30-delayed-release-vegan-caps-rn1550185 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-care-25-30', "Renew Life Ultimate Flora Women's Care 25 Billion 30 Capsules", 'renew-life-b444-womens-care-25', 'capsule', MCT_ONLY, 'caution', `${SITE}/ultimate-flora-womens-care-probiotic-25-billion-30-delayed-release-vegan-caps-rn1530093 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-care-25-60', "Renew Life Ultimate Flora Women's Care 25 Billion 60 Capsules", 'renew-life-b444-womens-care-25-60', 'capsule', MCT_PLANT, 'caution', `${SITE}/ultimate-flora-womens-care-probiotic-25-billion-60-delayed-release-vegan-caps-rn1530096 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-complete-30', "Renew Life Ultimate Flora Women's Complete 90 Billion 30 Capsules", 'renew-life-b444-womens-complete', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-womens-complete-probiotic-90-billion-30-delayed-release-vegan-caps-rn1550146 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-complete-60', "Renew Life Ultimate Flora Women's Complete 90 Billion 60 Capsules", 'renew-life-b444-womens-complete-60', 'capsule', MCT_SILICA, 'caution', `${SITE}/ultimate-flora-womens-complete-probiotic-90-billion-60-delayed-release-vegan-caps-rn1550145 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-vaginal-50-30', "Renew Life Ultimate Flora Women's Vaginal Care 50 Billion 30 Capsules", 'renew-life-b444-womens-vaginal-50', 'capsule', MCT_ONLY, 'caution', `${SITE}/ultimate-flora-womens-vaginal-care-probiotic-50-billion-30-delayed-release-vegan-caps-rn1550155 capsule is cellulose and gellan gum. Counted Limited: MCT. 30 capsules. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-vaginal-50-60', "Renew Life Ultimate Flora Women's Vaginal Care 50 Billion 60 Capsules", 'renew-life-b444-womens-vaginal-50-60', 'capsule', MCT_ONLY, 'caution', `${SITE}/ultimate-flora-womens-vaginal-care-probiotic-50-billion-60-delayed-release-vegan-caps-rn1550156 capsule is cellulose and gellan gum. Counted Limited: MCT. 60 capsules. No sourced UPC. Missing UPC.`),

  row('renew-life-b444-gummies-48', 'Renew Life Ultimate Flora Probiotic Gummies 48', 'renew-life-b444-gummies', 'gummy', GUMMY, 'avoid', `${SITE}/ultimate-flora-probiotic-gummies-48-vegan-gummies-rn1530089 is the ingredient panel. 48 gummies. Sunflower seed oil is the gummy base. No 3+ note. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-womens-gummies-48', "Renew Life Ultimate Flora Women's Care Gummies 48", 'renew-life-b444-womens-gummies-48', 'gummy', GUMMY, 'avoid', `${SITE}/ultimate-flora-womens-care-probiotic-gummies-48-vegan-gummies-rn1530087 is the ingredient panel. 48 gummies. Sunflower seed oil is the gummy base. No 3+ note. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-kids-gummies-30', 'Renew Life Ultimate Flora Kids Probiotic Gummies 30', 'renew-life-b444-kids-gummies-30', 'gummy', GUMMY, 'avoid', `${SITE}/ultimate-flora-kids-probiotic-gummies-1-billion-30-berry-licious-gummies-rn1530090 is the ingredient panel. 30 gummies. Label says children 4 years and older. Sunflower seed oil is the gummy base. No 3+ note. No sourced UPC. Missing UPC.`, { audience: 'kids', minAge: 4 }),
  row('renew-life-b444-kids-gummies-60', 'Renew Life Ultimate Flora Kids Probiotic Gummies 60', 'renew-life-b444-kids-gummies-60', 'gummy', GUMMY, 'avoid', `${SITE}/ultimate-flora-kids-probiotic-gummies-2-billion-60-vegan-gummies-rn15675 is the ingredient panel. 60 gummies. Sunflower seed oil is the gummy base. No 3+ note. No sourced UPC. Missing UPC.`, { audience: 'kids', minAge: 2 }),

  row('renew-life-b444-kids-chew-30', 'Renew Life Ultimate Flora Kids Probiotic Chewables 30', 'renew-life-b444-kids-chew-30', 'chewable', [
    stored('Xylitol', 'chewable'), stored('Sugar', 'chewable'), stored('Natural Flavors', 'chewable'), stored('Vegetable Stearic Acid', 'chewable'), silica, stored('Vegetable Magnesium Stearate', 'chewable'), stored('Cranberry Fruit Juice Powder', 'chewable'), stored('Organic Stevia Extract (Rebaudioside A)', 'chewable'), stored('Citric Acid', 'chewable'),
  ], 'caution', `${SITE}/ultimate-flora-kids-probiotic-chewable-tablets-3-billion-3-billion-30-berry-licious-chewable-tablets-rn15806 is the ingredient panel. 30 chewables. Label says children 4 years and older. Counted Limited: Natural Flavors, Organic Stevia Extract (Rebaudioside A). No sourced UPC. Missing UPC.`, { audience: 'kids', minAge: 4 }),
  row('renew-life-b444-kids-chew-60', 'Renew Life Ultimate Flora Kids Probiotic Chewables 60', 'renew-life-b444-kids-chew-60', 'chewable', [
    stored('Xylitol', 'chewable'), stored('Natural Flavors', 'chewable'), stored('Vegetable Stearic Acid', 'chewable'), stored('Citric Acid', 'chewable'), stored('Organic Monk Fruit Extract', 'chewable'), stored('Vegetable Magnesium Stearate', 'chewable'), silica,
  ], 'caution', `${SITE}/ultimate-flora-kids-probiotic-chewable-tablets-3-billion-3-billion-60-berry-licious-chewable-tablets-rn15718 is the ingredient panel. 60 chewables. Label says not under 4 years. Counted Limited: Natural Flavors, Organic Monk Fruit Extract. No sourced UPC. Missing UPC.`, { audience: 'kids', minAge: 4 }),

  row('renew-life-b444-boulardii-20', 'Renew Life Ultimate Flora Saccharomyces Boulardii 20 Capsules', 'renew-life-b444-boulardii-20', 'capsule', [
    stored('Potato Starch'), shell('Non-GMO Vegan Capsule'), stored('Modified Starch'), stored('Inulin'), stored('Vegetable Magnesium Stearate'), silica,
  ], 'caution', `${SITE}/ultimate-flora-saccaromyces-boulardii-go-pack-20-vegan-capsules-rn15417 is the ingredient panel. 20 capsules. Counted Limited: Modified Starch. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-debloat-30', 'Renew Life Ultimate Flora Debloat 30 Capsules', 'renew-life-b444-debloat-30', 'capsule', [
    stored('Rice Powder'), cellulose, gellan, silica, stored('Vegetable Magnesium Stearate'),
  ], 'caution', `${SITE}/ultimate-flora-debloat-probiotic-dr-formulated-30-delayed-release-vegan-caps-rn28481 is the ingredient panel. 30 capsules. Counted Limited: Rice Powder. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-vaginal-urinary-60', 'Renew Life Ultimate Flora Vaginal and Urinary Complete 60 Capsules', 'renew-life-b444-vaginal-urinary-60', 'capsule', [
    cellulose, gellan, plantCellulose, stored('Bamboo Extract'), stored('Organic Acacia'), silica,
  ], 'caution', `${SITE}/ultimate-flora-vaginal-urinary-complete-probiotic-cranberry-60-delayed-release-vegan-caps-rn1530102 is the ingredient panel. 60 capsules. Counted Limited: Bamboo Extract. No sourced UPC. Missing UPC.`),

  row('renew-life-b444-critical-omega-60', 'Renew Life Norwegian Gold Critical Omega 60 Softgels', 'renew-life-b444-critical-omega', 'softgel', [
    stored('fish gelatin', 'softgel'), stored('vegetable glycerin', 'softgel'), stored('enteric coating', 'softgel'), stored('caramel (color)', 'softgel'), stored('carob powder', 'softgel'),
  ], 'caution', `${SITE}/norwegian-gold-critical-omega-60-fish-gelatin-softgels-rn15579 is the ingredient panel. 60 softgels. Counted Limited: enteric coating, caramel (color). No sourced UPC. Missing UPC.`),
  row('renew-life-b444-critical-omega-120', 'Renew Life Norwegian Gold Critical Omega 120 Softgels', 'renew-life-b444-critical-omega', 'softgel', [
    stored('fish gelatin', 'softgel'), stored('vegetable glycerin', 'softgel'), stored('enteric coating', 'softgel'), stored('caramel (color)', 'softgel'), stored('carob powder', 'softgel'),
  ], 'caution', `${SITE}/norwegian-gold-critical-omega-120-fish-gelatin-softgels-rn15405 is the ingredient panel. 120 softgels. Same other ingredients. No sourced UPC. Missing UPC.`),
  row('renew-life-b444-super-critical-omega-30', 'Renew Life Norwegian Gold Super Critical Omega 30 Softgels', 'renew-life-b444-super-critical-omega', 'softgel', [
    stored('fish gelatin', 'softgel'), stored('vegetable glycerin', 'softgel'), stored('enteric coating', 'softgel'), stored('caramel (color)', 'softgel'), stored('vitamin d3 cholecalciferol', 'softgel'), stored('carob powder', 'softgel'),
  ], 'caution', `${SITE}/norwegian-gold-super-critical-omega-30-fish-gelatin-softgels-rn15554 is the ingredient panel. 30 softgels. Counted Limited: enteric coating, caramel (color). No sourced UPC. Missing UPC.`),
  row('renew-life-b444-super-critical-omega-60', 'Renew Life Norwegian Gold Super Critical Omega 60 Softgels', 'renew-life-b444-super-critical-omega', 'softgel', [
    stored('fish gelatin', 'softgel'), stored('vegetable glycerin', 'softgel'), stored('enteric coating', 'softgel'), stored('caramel (color)', 'softgel'), stored('vitamin d3 cholecalciferol', 'softgel'), stored('carob powder', 'softgel'),
  ], 'caution', `${SITE}/norwegian-gold-super-critical-omega-60-fish-gelatin-softgels-rn15407 is the ingredient panel. 60 softgels. Same other ingredients. No sourced UPC. Missing UPC.`),
];
