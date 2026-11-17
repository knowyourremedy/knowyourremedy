// DRAFT / not verified / batch 441 KYR6-e (t295u).
// Flora rows unlocked by the t295 locks. The two algae rows store the named 3+ note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { T128U_SILICA_WHY, T128U_SORBITOL_WHY } from '../scan-preview/t128uTokenWhy';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t259uLock } from '../scan-preview/t259uLocks';
import { T295U_STACK_NOTE, t295uLock } from '../scan-preview/t295uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string | undefined, mark: string): IngredientFlag {
  if (!why) throw new Error(`t295u why ${name}`);
  const meth = grade === 'limited' && counts
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string, form = 'capsule'): IngredientFlag {
  const hit = t256uResolve(name, form);
  if (!hit) throw new Error(`t295u stored ${name}`);
  const why = hit.lock.why || t134uWhyForName(name) || cleanTokenWhyForName(name) || (name.toLowerCase() === 'sorbitol' ? T128U_SORBITOL_WHY : undefined);
  const mark = hit.mark === 'stored' ? 't160u' : hit.mark;
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, mark);
}

function locked(name: string, form?: string): IngredientFlag {
  const own = t295uLock(name, form);
  if (!own) throw new Error(`t295u lock ${name}`);
  return fromLock(name, own.grade, own.counts, own.why, 't295u');
}

const MALTO = t259uLock('maltodextrin');
const CARRAGEENAN = t259uLock('carrageenan');
if (!MALTO?.why || !CARRAGEENAN?.why) throw new Error('t295u t259');
const malto = fromLock('maltodextrin', MALTO.grade, MALTO.counts, MALTO.why, 't259u');
const carrageenan = fromLock('carrageenan', CARRAGEENAN.grade, CARRAGEENAN.counts, CARRAGEENAN.why, 't259u');
const silica = fromLock('silicon dioxide', 'moderate', false, T128U_SILICA_WHY, 't160u');
const potato = stored('Potato starch');
const hypo = stored('hypromellose');
const ascorbic = stored('ascorbic acid');
const stearic = stored('stearic acid');
const milk = locked('skim milk');
const peptone = locked('soy peptone');
const yeast = locked('yeast extract');
const trehalose = locked('trehalose');
const sucrose = locked('sucrose');
const mcc = stored('microcrystalline cellulose');
const mag = stored('magnesium stearate');
const hpmc = stored('hydroxypropyl methylcellulose');
const water = stored('Water', 'liquid');
const filtered = stored('Filtered water', 'liquid');
const citric = stored('citric acid', 'liquid');
const glycerin = stored('glycerin', 'softgel');

const PRO: IngredientFlag[] = [potato, hypo, ascorbic, stearic, silica, malto, milk, peptone, sucrose, trehalose, yeast];
const ADULT: IngredientFlag[] = [potato, hypo, ascorbic, stearic, silica, trehalose, malto, milk, peptone, sucrose, yeast];
const WOMEN: IngredientFlag[] = [potato, hypo, mag, ascorbic, malto, milk, peptone, sucrose, trehalose, yeast];
const TODDLER: IngredientFlag[] = [malto, silica, ascorbic, yeast, trehalose, milk, peptone, sucrose];
const GRAPE: IngredientFlag[] = [locked('Cranberry powder'), mcc, mag, water, hpmc];
const FERRITIN: IngredientFlag[] = [mcc, hpmc, locked('gellan gum'), mag];
const LIGNAN: IngredientFlag[] = [locked('Certified organic flax seed oil', 'liquid'), locked('certified organic defatted flax seed')];
const MCT: IngredientFlag[] = [locked('Organic medium chain triglycerides coconut oil', 'liquid')];
const DHA: IngredientFlag[] = [
  locked('Medium-chain triglycerides', 'softgel'),
  stored('high oleic sunflower oil', 'softgel'),
  locked('modified corn starch'),
  glycerin,
  carrageenan,
  water,
  fromLock('sorbitol', 'limited', false, T128U_SORBITOL_WHY, 't160u'),
  locked('rosemary leaf extract'),
  stored('sunflower lecithin', 'softgel'),
  stored('tocopherols', 'softgel'),
  stored('ascorbyl palmitate', 'softgel'),
  stored('purified water', 'softgel'),
];
const OMEGA: IngredientFlag[] = [
  locked('Medium chain triglycerides', 'softgel'),
  stored('high oleic sunflower oil', 'softgel'),
  locked('modified food starch'),
  carrageenan,
  glycerin,
  fromLock('sorbitol', 'limited', false, T128U_SORBITOL_WHY, 't160u'),
  stored('purified water', 'softgel'),
  locked('annatto'),
  stored('sunflower lecithin', 'softgel'),
  locked('rosemary leaf extract'),
  stored('tocopherols', 'softgel'),
  stored('ascorbyl palmitate', 'softgel'),
];
const CARDIO: IngredientFlag[] = [filtered, locked('apple juice concentrate'), locked('blackstrap molasses'), locked('natural strawberry flavor'), stored('xanthan gum', 'liquid')];
const SLEEP: IngredientFlag[] = [filtered, locked('apple juice concentrate'), locked('hibiscus extract'), locked('passion fruit flavor')];
const RESPIR: IngredientFlag[] = [filtered, locked('pear fruit juice concentrate'), citric];
const ELDER: IngredientFlag[] = [water, locked('organic natural flavor'), locked('organic stevia leaf'), citric];
const BEET: IngredientFlag[] = [locked('organic red beet crystals'), citric];

function row(
  id: string,
  name: string,
  formulaId: string,
  form: string,
  ingredients: IngredientFlag[],
  verdict: RatingRecord['verdict'],
  source: string,
  extra?: { barcode?: string; audience?: 'adult' | 'kids' },
): RatingRecord {
  return {
    id, productName: name, brand: 'Flora', category: 'Vitamins', formulaId, form,
    audience: extra?.audience ?? 'adult', recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['Flora'], ...(extra?.barcode ? { barcode: extra.barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict, sourcesGeneral: [source],
  };
}

const SITE = 'https://www.florahealth.com/products';
const NOTE = T295U_STACK_NOTE;

export const BATCH441_KYR6E_T295U: RatingRecord[] = [
  row('flora-b441-adult-probiotic-60-capsules', "Flora Adult's Probiotic 60 Capsules", 'flora-b441-adult-probiotic', 'capsule', ADULT, 'caution', `${SITE}/adults-probiotic is the ingredient panel. 60 capsules. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-adult-probiotic-120-capsules', "Flora Adult's Probiotic 120 Capsules", 'flora-b441-adult-probiotic', 'capsule', ADULT, 'caution', `${SITE}/adults-probiotic is the ingredient panel. 120 capsules. Same other ingredients. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-advanced-probiotic-30-capsules', "Flora Advanced Adult's Probiotic 30 Capsules", 'flora-b441-advanced-probiotic', 'capsule', PRO, 'caution', `${SITE}/advanced-adults-probiotic is the ingredient panel. 30 capsules. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-advanced-probiotic-60-capsules', "Flora Advanced Adult's Probiotic 60 Capsules", 'flora-b441-advanced-probiotic', 'capsule', PRO, 'caution', `${SITE}/advanced-adults-probiotic is the ingredient panel. 60 capsules. Same other ingredients. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-super-8-30-capsules', 'Flora Super 8 Hi-Potency Probiotic 30 Capsules', 'flora-b441-super-8', 'capsule', PRO, 'caution', `${SITE}/super-8-probiotic is the ingredient panel. 30 capsules. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-super-8-60-capsules', 'Flora Super 8 Hi-Potency Probiotic 60 Capsules', 'flora-b441-super-8', 'capsule', PRO, 'caution', `${SITE}/super-8-probiotic is the ingredient panel. 60 capsules. Same other ingredients. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-super-bifido-30-capsules', 'Flora Super Bifido Plus Probiotic 30 Capsules', 'flora-b441-super-bifido-30', 'capsule', PRO, 'caution', `${SITE}/super-bifido-probiotic is the ingredient panel. 30 capsules. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-childrens-probiotic-60-capsules', "Flora Children's Blend Probiotic 60 Capsules", 'flora-b441-childrens-probiotic-60', 'capsule', PRO, 'caution', `${SITE}/childrens-probiotic is the ingredient panel. 60 capsules. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`, { audience: 'kids' }),
  row('flora-b441-womens-probiotic-30-capsules', "Flora Women's Care Probiotic 30 Capsules", 'flora-b441-womens-probiotic-30', 'capsule', WOMEN, 'caution', `${SITE}/womens-care-probiotic is the ingredient panel. 30 capsules. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-toddler-probiotic-2-64oz', "Flora Toddler's Blend Probiotic 2.64 oz", 'flora-b441-toddler-probiotic', 'powder', TODDLER, 'caution', `${SITE}/toddlers-probiotic is the ingredient panel. 2.64 oz. Counted Limited: maltodextrin, sucrose. DSLD omits the cryoprotectants, so no UPC was chosen. Missing UPC.`, { audience: 'kids' }),
  row('flora-b441-grape-seed-60-capsules', 'Flora Grape Seed Extract Plus 60 Capsules', 'flora-b441-grape-seed-60', 'capsule', GRAPE, 'clean', `${SITE}/beyond-grape-seed is the ingredient panel. 60 capsules. The capsule is water and hydroxypropyl methylcellulose. DSLD 265448 matches. UPC 061998613443. The check digit passes.`, { barcode: '061998613443' }),
  row('flora-b441-ferritin-30-blister', 'Flora Ferritin+ 30 Capsules Blister', 'flora-b441-ferritin', 'capsule', FERRITIN, 'clean', `${SITE}/ferritin is the ingredient panel. 30 blister capsules. DSLD 265072 matches and has no UPC. Missing UPC.`),
  row('flora-b441-ferritin-30-capsules', 'Flora Ferritin+ 30 Capsules', 'flora-b441-ferritin', 'capsule', FERRITIN, 'clean', `${SITE}/ferritin is the ingredient panel. 30 capsules. Same other ingredients. No sourced UPC. Missing UPC.`),
  row('flora-b441-ferritin-60-capsules', 'Flora Ferritin+ 60 Capsules', 'flora-b441-ferritin', 'capsule', FERRITIN, 'clean', `${SITE}/ferritin is the ingredient panel. 60 capsules. Same other ingredients. No sourced UPC. Missing UPC.`),
  row('flora-b441-high-lignan-flax-8-5oz', 'Flora High Lignan Flax Oil 8.5 fl oz', 'flora-b441-high-lignan-flax', 'liquid', LIGNAN, 'caution', `${SITE}/high-lignan-flax-oil-certified-organic is the ingredient panel. 8.5 fl oz. Certified organic flax seed oil is the liquid base and counts. DSLD shortens defatted flax seed, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-high-lignan-flax-17oz', 'Flora High Lignan Flax Oil 17 fl oz', 'flora-b441-high-lignan-flax', 'liquid', LIGNAN, 'caution', `${SITE}/high-lignan-flax-oil-certified-organic is the ingredient panel. 17 fl oz. Same ingredients. DSLD shortens defatted flax seed, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-mct-oil-8-5oz', 'Flora Organic MCT Oil 8.5 fl oz', 'flora-b441-mct-oil', 'liquid', MCT, 'caution', `${SITE}/organic-mct-oil is the ingredient panel. 8.5 fl oz. Counted Limited: Organic medium chain triglycerides coconut oil. No sourced UPC. Missing UPC.`),
  row('flora-b441-mct-oil-17oz', 'Flora Organic MCT Oil 17 fl oz', 'flora-b441-mct-oil', 'liquid', MCT, 'caution', `${SITE}/organic-mct-oil is the ingredient panel. 17 fl oz. Same ingredient. No sourced UPC. Missing UPC.`),
  row('flora-b441-mct-oil-32oz', 'Flora Organic MCT Oil 32 fl oz', 'flora-b441-mct-oil', 'liquid', MCT, 'caution', `${SITE}/organic-mct-oil is the ingredient panel. 32 fl oz. Same ingredient. No sourced UPC. Missing UPC.`),
  {
    ...row('flora-b441-dha-vegan-algae-60-softgels', 'Flora DHA Vegan Algae 60 Softgels', 'flora-b441-dha-vegan-algae-60', 'softgel', DHA, 'avoid', `${SITE}/dha-vegetarian-algae is the ingredient panel. 60 softgels. Counted Limited: Medium-chain triglycerides, modified corn starch, carrageenan. DSLD 265450 matches. UPC 061998614228. The check digit passes.`, { barcode: '061998614228' }),
    honestNote: NOTE,
    founderHonestNote: NOTE,
  },
  {
    ...row('flora-b441-omega-3-vegan-algae-60-softgels', 'Flora Omega-3 Vegan Algae 60 Softgels', 'flora-b441-omega-3-vegan-algae-60', 'softgel', OMEGA, 'avoid', `${SITE}/omega-3-vegan-algae-epa-dha is the ingredient panel. 60 softgels. Counted Limited: Medium chain triglycerides, modified food starch, carrageenan. No sourced UPC. Missing UPC.`),
    honestNote: NOTE,
    founderHonestNote: NOTE,
  },
  row('flora-b441-cardio-essence-17oz', 'Flora Cardio-Essence 17 fl oz', 'flora-b441-cardio-essence-17', 'liquid', CARDIO, 'caution', `${SITE}/cardio-essence is the ingredient panel. 17 fl oz. Counted Limited: blackstrap molasses. DSLD says Water rather than Filtered water, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-sleep-essence-17oz', 'Flora Sleep-Essence 17 fl oz', 'flora-b441-sleep-essence-17', 'liquid', SLEEP, 'clean', `${SITE}/sleep-essence is the ingredient panel. 17 fl oz. DSLD 214984 matches. UPC 061998681503. The check digit passes.`, { barcode: '061998681503' }),
  row('flora-b441-respir-essence-17oz', 'Flora Respir-Essence 17 fl oz', 'flora-b441-respir-essence-17', 'liquid', RESPIR, 'clean', `${SITE}/respir-essence is the ingredient panel. 17 fl oz. DSLD says Water rather than Filtered water, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-sambuguard-elderberry-8-5oz', 'Flora SambuGuard Elderberry+ 8.5 fl oz', 'flora-b441-sambuguard-elderberry-8-5', 'liquid', ELDER, 'caution', `${SITE}/sambuguard-elderberry-liquid is the ingredient panel. 8.5 fl oz. Counted Limited: organic natural flavor, organic stevia leaf. DSLD shortens both names, so no UPC was chosen. Missing UPC.`),
  row('flora-b441-red-beet-crystals-7oz', 'Flora Organic Red Beet Crystals 7 oz', 'flora-b441-red-beet-crystals-7', 'powder', BEET, 'clean', `${SITE}/red-beet-crystals is the ingredient panel. 7 oz. No sourced UPC. Missing UPC.`),
];
