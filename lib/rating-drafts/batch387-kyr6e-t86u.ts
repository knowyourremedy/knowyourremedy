// DRAFT / not verified / batch 387 KYR6-e (t86u).
// North American Herb & Spice holds whose Other lines are exact Cleared
// locks, with a readable panel and a confirmed own-count package UPC.
// Packet 24 adds seven of those. Holds with a new unlocked print, a
// clipped barcode, or an Ingredients line stay off this file.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import { applyT83uRow } from '../scan-preview/t83uLocks';
import { applyT86uRow } from '../scan-preview/t86uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT86uRow(applyT83uRow(applyT54uRow(record)));
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function cleared83(name: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: 'Methodology §5 Cleared (t83u). This exact printed string is Cleared and does not stack.',
  };
}

function cleared86(name: string): IngredientFlag {
  return {
    name,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: 'Methodology §5 Cleared (t86u). This exact printed string is Cleared and does not stack.',
  };
}

const BEESWAX: IngredientFlag = {
  name: 'beeswax',
  riskLevel: 'cleared',
  stackCountExempt: true,
  source: 'Methodology §5 Cleared (t98u). This exact printed string is Cleared and does not stack.',
};

const SUNFLOWER_LECITHIN: IngredientFlag = {
  name: 'sunflower lecithin',
  riskLevel: 'cleared',
  stackCountExempt: true,
  source: 'Methodology §5 Cleared. Sunflower lecithin is the lecithin lock. It does not stack.',
};

export const BATCH387_KYR6E_T86U: RatingRecord[] = [
  finish({
    id: 'nahs-b387-purely-e-60',
    productName: 'North American Herb & Spice Purely-E (60 gelcaps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-purely-e-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb'],
    barcode: '635824002734',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '750 mg' },
      { name: 'Sunflower seed vitamin E complex (alpha, beta, delta, gamma tocopherols)', strength: '' },
      { name: 'Cold-pressed Austrian pumpkin seed oil', strength: '' },
      { name: 'Cold-pressed red palm oil', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Vitamin E complex', strength: '110 mg' },
    ],
    inactiveIngredients: [cleared86('fish gelatin capsules (100% Non-GMO)')],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/purely-e/ Select a Size includes 60 Gelcaps at $36.99. No stock word was on the brand page. The facts photograph prints Supplement Facts, Serving Size 1 capsule, Servings per container 60, and Proprietary blend 750 mg. The rows with no separate amounts are Sunflower seed vitamin E complex (alpha, beta, delta, gamma tocopherols), Cold-pressed Austrian pumpkin seed oil, Cold-pressed red palm oil, and Wild rosemary oil. Vitamin E complex is 110 mg and is 700%. Those rows are actives and are not graded. The 700% stays in the facts table. Other ingredients: fish gelatin capsules (100% Non-GMO). That print is the t86u Cleared lock. It is not non-GMO fish gelatin (capsule). Contains: Fish (Tilapia) is an allergen line and is not a second token. Label directions say one capsule daily with meals. iHerb https://www.iherb.com/pr/north-american-herb-spice-purely-e-60-caps/14881 is in stock and prints the same facts, the same 110 mg at 700%, and the same shell. The iHerb gallery does not show barcode digits. The brand photograph prints 6 35824 00273 4. The check digit passes. UPC 635824002734. This code is the 60 gelcaps only. The 1 oz code stays on nahs-b378-purely-e-1. Natural Healthy Concepts and Professional Supplement Center print Vitamin E complex 165 IU at 550% and were not copied. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-cherry-bears-60',
    productName: 'North American Herb & Spice kid-e-kare Yummy Gummy Cherry Bears (60 gummies)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-cherry-bears-60',
    form: 'gummy',
    audience: 'kids',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824004219',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '60 mg' },
      { name: 'Extra virgin black seed oil', strength: '' },
      { name: 'wild oregano oil P73', strength: '' },
    ],
    inactiveIngredients: [
      cleared83('certified organic fair trade granulated coconut blossom nectar'),
      cleared83('organic Peruvian yacon syrup'),
      cleared83('organic apple pectin'),
      cleared83('organic citric acid (from citrus fruit)'),
      cleared86('organic tart cherry concentrate'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page shelf for Yummy Gummy Cherry Bears is $34.99. The $29.74 figure is the subscribe 15% price and is not the shelf price. The front says kid-e-kare, Dietary Supplement, and daily immune support for children. Serving size 2 gummies. Servings per container 30. Calories, total carbohydrate, and total sugars stay in the facts box and are not graded actives. Proprietary blend 60 mg. Extra virgin black seed oil and wild oregano oil P73 sit inside that blend and are not graded. Other ingredients, in label order: certified organic fair trade granulated coconut blossom nectar, organic Peruvian yacon syrup, organic apple pectin, organic citric acid (from citrus fruit), organic tart cherry concentrate. The first four strings are the t83u Cleared locks. organic tart cherry concentrate is the t86u Cleared lock. It is not organic tart cherry flavor. Label directions say take two P73 Yummy Gummy Cherry Bears daily. The page How to Take says the same two gummies. The package photographs print Proprietary blend 60 mg and the digits 6 35824 00421 9. The check digit passes. UPC 635824004219. The page SKU is 9268. Natural Healthy Concepts and Professional Supplement Center print Proprietary Blend 40 mg and were not copied. The sample code was not used. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-oregaresp-90',
    productName: 'North American Herb & Spice OregaRESP (90 vegi-capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-oregaresp-90',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'iHerb', 'Natural Healthy Concepts'],
    barcode: '635824002079',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '450 mg' },
      { name: 'Wild, mountain-grown oregano herb', strength: '' },
      { name: 'Wild, mountain-grown oregano oil powder', strength: '' },
      { name: 'Mountain-grown cumin oil extract powder', strength: '' },
      { name: 'Wild, high-mountain, organic sage oil powder', strength: '' },
      { name: 'Cinnamon oil powder', strength: '' },
      { name: 'Ginger herb powder', strength: '' },
    ],
    inactiveIngredients: [
      cleared83('pullulan'),
      cleared86('non-GMO oat fiber'),
      cleared86('silica mineral'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/oregaresp/ kept the range $34.99–$79.99. iHerb https://www.iherb.com/pr/north-american-herb-spice-oregaresp-multiple-spice-extract-90-capsules/11951 is in stock. The back prints Supplement Facts, 1 capsule, 90 servings, and proprietary blend 450 mg. The six rows are Wild, mountain-grown oregano herb, Wild, mountain-grown oregano oil powder, Mountain-grown cumin oil extract powder, Wild, high-mountain, organic sage oil powder, Cinnamon oil powder, and Ginger herb powder. Those rows are actives and are not graded. Other ingredients: pullulan, non-GMO oat fiber, silica mineral. pullulan is the t83u Cleared lock. non-GMO oat fiber and silica mineral are the t86u Cleared locks. non-GMO oat fiber is not bare oat fiber. silica mineral is not silicon dioxide and it is not bare silica. Contains no animal products is a claim. The iHerb package image shows no barcode digits. The Natural Healthy Concepts directions photograph prints 6 35824 00207 9. The check digit passes. UPC 635824002079. Natural Healthy Concepts one-time purchase is $67.99. The $64.59 figure is subscribe and save and is not the shelf price. This code is the 90 vegi-capsules only. The 60 softgel code and the 1 fl oz code stay on their own rows. The 30-count page text was not attached. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-purelyliver-150',
    productName: 'North American Herb & Spice PurelyLIVER (150 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-purelyliver-150',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009733',
    activeIngredients: [{ name: 'Freeze dried beef liver', strength: '3.75 g' }],
    inactiveIngredients: [
      cleared86('hypromellose chlorophyll capsules'),
      cleared86('oregano oil P73 powder'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page lists PurelyLIVER Capsules at $44.99. No stock word was on the page. The front says 150 CAPSULES (750 mg) and 3.75 g per serving. Supplement Facts, 5 capsules, 30 servings. Freeze dried beef liver 3.75 g stays inside the facts table and is not graded. Other Ingredients: hypromellose chlorophyll capsules, oregano oil P73 powder. Both prints are t86u Cleared locks. Label directions say five capsules daily. The printed digits are 6 35824 00973 3. A barcode read gives 635824009733. The check digit passes. UPC 635824009733. This code is the 150 capsules only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-turmeric-60',
    productName: 'North American Herb & Spice Turmeric Power Plus (60 gelcaps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-turmeric-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824006671',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1000 mg' },
      { name: 'Black seed oil (Nigella sativa)', strength: '' },
      { name: 'CO2-extracted wild, organic turmeric (turmerones 100 mg)', strength: '' },
      { name: 'Wild, organic oregano oil', strength: '' },
      { name: 'Wild organic turmeric extract (curcuminoids 22 mg)', strength: '' },
      { name: 'Coconut crème oil', strength: '' },
      { name: 'Organic ginger oleoresin', strength: '' },
      { name: 'Wild rosemary oil', strength: '' },
      { name: 'Mycellized wild, organic oregano oil', strength: '' },
    ],
    inactiveIngredients: [cleared86('fish gelatin'), { ...BEESWAX }, { ...SUNFLOWER_LECITHIN }],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page lists Turmeric Power Plus at $34.99 for 60 gelcaps. No stock word was on the page. Serving size 2 capsules. Servings per container 30. Proprietary blend 1000 mg. The eight rows have no separate amounts: Black seed oil (Nigella sativa), CO2-extracted wild, organic turmeric (turmerones 100 mg), Wild, organic oregano oil, Wild organic turmeric extract (curcuminoids 22 mg), Coconut crème oil, Organic ginger oleoresin, Wild rosemary oil, and Mycellized wild, organic oregano oil. Those rows are actives and are not graded. Other ingredients: fish gelatin, beeswax, sunflower lecithin. fish gelatin is the t86u Cleared lock. It is not non-GMO fish gelatin (capsule). beeswax is the t98u Cleared lock. sunflower lecithin is the lecithin lock. This product is 100% non-GMO is a claim. Contains: Fish (Tilapia), Tree Nuts (Coconut) is an allergen line. Label directions say two or more capsules daily. The page How to Take says two capsules daily. The package photograph prints 6 35824 00667 1. The check digit passes. UPC 635824006671. LA9121R1 beside the bars matches the page SKU 9121. That code is not a UPC. This code is the 60 gelcaps only. The 120 gelcap panel and the 2 oz panel stay their own holds. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-dlenolate-30',
    productName: 'North American Herb & Spice P73 Wild Oregano + d-Lenolate Olive Leaf Blend (30 capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-dlenolate-30',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824009917',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '2000 mg' },
      { name: 'Olive leaf d-Lenolate extract', strength: '' },
      { name: 'Wild high-mountain oregano P73 herb', strength: '' },
      { name: 'Wild high-mountain oregano P73 oil powder', strength: '' },
      { name: 'Organic garlic (bulb)', strength: '' },
    ],
    inactiveIngredients: [
      cleared83('pullulan'),
      cleared86('non-GMO oat fiber'),
      cleared86('silica mineral'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. The brand page kept the olive-leaf blend range $42.99–$109.99 across the two counts. No stock word was on the page. The 30-capsule facts photograph prints Supplement Facts, Serving Size 1 capsule, Servings per container 30, and Proprietary blend 2000 mg. The four blend rows are Olive leaf d-Lenolate extract, Wild high-mountain oregano P73 herb, Wild high-mountain oregano P73 oil powder, and Organic garlic (bulb). Those rows are actives and are not graded. Other ingredients: pullulan, non-GMO oat fiber, silica mineral. pullulan is the t83u Cleared lock. non-GMO oat fiber and silica mineral are the t86u Cleared locks. Contains no animal products is a claim. Label directions say take one capsule twice daily and increase as needed. The facts serving is 1 capsule. The package photograph prints 6 35824 00991 7. The check digit passes. UPC 635824009917. LA9117R1 beside the bars is a lot code and is not a UPC. This code is the 30 capsules only. The 90-capsule panel prints proprietary blend 550 mg and the blend row d-Lenolate olive leaf extract. That panel was not copied, and its barcode digits are cut off. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-polarpower-60',
    productName: 'North American Herb & Spice PolarPower (60 softgels)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-polarpower-60',
    form: 'softgel',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Professional Supplement Center'],
    barcode: '635824002819',
    activeIngredients: [
      { name: 'Alaskan sockeye salmon oil', strength: '2,000 mg' },
      { name: 'Omega-3s', strength: '400 mg' },
      { name: 'EPA', strength: '160 mg' },
      { name: 'DHA', strength: '146 mg' },
      { name: 'Omega-6s', strength: '47 mg' },
      { name: 'Omega-9s', strength: '447 mg' },
      { name: 'Astaxanthin', strength: '240 mcg' },
      { name: 'Natural vitamin A', strength: '674 IU' },
      { name: 'Natural vitamin D', strength: '200 IU' },
    ],
    inactiveIngredients: [
      cleared86('wild rosemary extract'),
      cleared86('non-GMO certified fish gelatin capsule'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/polarpower/?attribute_pa_size=60-softgels shows 60 Softgels selected. The page range is $39.99–$44.99. No stock word was on the brand page. The package photograph prints Supplement Facts, Alaskan sockeye salmon oil 2,000 mg, Serving Size 2 Softgels, and Servings Per Container 30. Calories 20, calories from fat 20, Total Fat 2 g, Saturated fat 0.3 g, and Cholesterol 20 mg stay in the facts box. Sodium, Total Carbohydrate, Dietary Fiber, Sugars, and Protein have no amounts in the photograph. The named rows are Omega-3s 400 mg (EPA 160 mg/DHA 146 mg), Omega-6s 47 mg, Omega-9s 447 mg, Astaxanthin 240 mcg, Natural vitamin A 674 IU (14%), and Natural vitamin D 200 IU (50%). Those rows are actives and are not graded. Other ingredients: wild rosemary extract, non-GMO certified fish gelatin capsule. Both prints are t86u Cleared locks. wild rosemary extract is not rosemary extract. The facts serving is 2 softgels. Professional Supplement Center https://www.professionalsupplementcenter.com/products/polarpower-1000-mg-by-north-american-herb-spice is the package photograph. The printed digits are 6 35824 00281 9. The check digit passes. UPC 635824002819. This code is the 60 softgels only. The 8 fl oz row nahs-b377-polarpower-8 stays on its own panel. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-purely-zinc-17',
    productName: 'North American Herb & Spice Purely-Zinc Plus (17.63 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-purely-zinc-17',
    form: 'powder',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824007692',
    activeIngredients: [
      { name: 'Vitamin C', strength: '268 mg' },
      { name: 'Iron', strength: '3.68 mg' },
      { name: 'Thiamin', strength: '0.292 mg' },
      { name: 'Phosphorous', strength: '513 mg' },
      { name: 'Niacin', strength: '5.12 mg' },
      { name: 'Copper', strength: '0.48 mg' },
      { name: 'Vitamin B6', strength: '0.9 mg' },
      { name: 'Zinc', strength: '3.03 mg' },
      { name: 'Folate', strength: '34.7 mcg' },
      { name: 'Magnesium', strength: '218 mg' },
      { name: 'Manganese', strength: '2.49 mg' },
      { name: 'Potassium', strength: '424 mg' },
    ],
    inactiveIngredients: [
      cleared86('pumpkin seed powder'),
      {
        name: 'rice bran',
        riskLevel: 'cleared',
        stackCountExempt: true,
        source: 'Methodology §5 Cleared (organic rice bran / rice bran, unspecified bran). Founder override Oct 17, 2026 t111u; was Caution Sept 23, 2026.',
      },
      cleared86('wild camu camu'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/purely-zinc-plus/?attribute_pa_size=17-63-oz shows 17.63 oz selected. The page range is $13.99–$39.99. No stock word was on the page. The pouch photograph prints Supplement Facts, Serving size 2 tablespoons (28g), and Servings per container 18. Calories 100, Total Fat 3g, Saturated Fat 0g, Trans Fat 0g, Cholesterol 0mg, Sodium 110mg, Total Carb. 7g, Dietary Fiber 3g, Sugars less than 1 gram, and Protein 12g stay in the facts box. The named rows are Vitamin C 268mg, Iron 3.68mg, Thiamin 0.292mg, Phosphorous 513mg, Niacin 5.12mg, Copper 0.48mg, Vitamin B6 0.9mg, Zinc 3.03mg, Folate 34.7mcg, Magnesium 218mg, Manganese 2.49mg, and Potassium 424mg. Those rows are actives and are not graded. Other Ingredients: pumpkin seed powder, rice bran, wild camu camu. pumpkin seed powder and wild camu camu are t86u Cleared locks. rice bran is the t111u Cleared lock. Label directions say take at least 2 tablespoons daily in juice, milk, or smoothies. The facts serving is 2 tablespoons. The package photograph prints 6 35824 00769 2. The check digit passes. UPC 635824007692. This code is the 17.63 oz pouch only. The 5.29 oz pouch prints 5 servings and its barcode digits are cut off. That code was not borrowed. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-oregabiotic-60',
    productName: 'North American Herb & Spice OregaBiotic (60 gradual release capsules)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-oregabiotic-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'Professional Supplement Center'],
    barcode: '635824002291',
    activeIngredients: [
      { name: 'Proprietary blend in organic extra virgin olive oil, black seed oil & beeswax', strength: '1000 mg' },
      { name: 'Wild oregano oil (P73)', strength: '' },
      { name: 'Cumin oil', strength: '' },
      { name: 'Wild sage oil', strength: '' },
      { name: 'Wild bay leaf oil', strength: '' },
    ],
    inactiveIngredients: [cleared86('cellulose (vegi caps)')],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/oregabiotic/?attribute_pa_size=60-gradual-release-capsules lists 60 Gradual Release Capsules at $69.99. No stock word was on the brand page. The facts photograph prints Supplement Facts, Serving Size 2 capsules, Servings per container 30, and Proprietary blend in organic extra virgin olive oil, black seed oil & beeswax 1000 mg. Beeswax stays inside that blend heading. The four rows are Wild oregano oil (P73), Cumin oil, Wild sage oil, and Wild bay leaf oil. Those rows are actives and are not graded. Other ingredients: cellulose (vegi caps). The next line, (100% GMO-free), is a claim and is not a second token. cellulose (vegi caps) is the t86u Cleared lock. It is not cellulose (vegi-capsule) and it is not bare cellulose. The facts serving is 2 capsules. Professional Supplement Center https://www.professionalsupplementcenter.com/products/oregabiotic-by-north-american-herb-and-spice is the package photograph. The printed digits are 6 35824 00229 1. The check digit passes. UPC 635824002291. This code is the 60 capsules only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-prostaclenz-60',
    productName: 'North American Herb & Spice ProstaClenz (60 vegi-gelcaps)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-prostaclenz-60',
    form: 'capsule',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice', 'HerbsPro'],
    barcode: '635824000679',
    activeIngredients: [
      { name: 'Proprietary blend', strength: '1400 mg' },
      { name: 'Wild high mountain oregano', strength: '' },
      { name: 'Wild rosemary powder', strength: '' },
      { name: 'Wild oregano oil powder', strength: '' },
      { name: 'Austrian Alpine pumpkin seed oil powder (10:1)', strength: '' },
      { name: "Wild St. John's wort", strength: '' },
    ],
    inactiveIngredients: [cleared83('pullulan (tapioca)')],
    verdict: 'clean',
    sourcesGeneral: [
      "t86u. https://www.northamericanherbandspice.com/shop/prostaclenz/?attribute_pa_size=60-vegi-gelcaps lists 60 Vegi-Gelcaps at $49.99. No stock word was on the brand page. The brand photograph prints Supplement Facts, Serving Size 2 capsules, Servings per container 30, and Proprietary blend 1400 mg. The five rows are Wild high mountain oregano, Wild rosemary powder, Wild oregano oil powder, Austrian Alpine pumpkin seed oil powder (10:1), and Wild St. John's wort. Those rows are actives and are not graded. Other ingredients: pullulan (tapioca). That print is the t83u Cleared lock. The next line, (100% GMO free) Contains no animal products, is a claim and is not a second token. The visible directions include without meals. The facts serving is 2 capsules. The package photograph prints 6 35824 00067 9. The check digit passes. UPC 635824000679. LA067A beside the bars is a lot code and is not a UPC. HerbsPro https://www.herbspro.com/products/prostaclenz prints Other Ingredients: Cellulose (100% GMO Free) and puts a 0 in an amount cell. That page text was not copied over the brand photograph. Cellulose (100% GMO Free) is its own t86u Cleared lock, so the page disagreement is between two Cleared prints. Our Price is $38.24. M.R.P. $44.99 is not the shelf price. This code is the 60 vegi-gelcaps only. Counted Limited tokens: none.",
    ],
  }),
  finish({
    id: 'nahs-b387-cilantrol-1',
    productName: 'North American Herb & Spice Cilantrol (1 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-cilantrol-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000112',
    activeIngredients: [
      { name: 'Proprietary blend in certified organic extra virgin olive oil', strength: '' },
      { name: 'Mountain-grown coriander (cilantro) seed oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/cilantrol/?attribute_pa_size=1-ounce-spice-oil-complex lists the 1 ounce spice oil complex at $44.99. No stock word was on the page. The package photograph prints Supplement Facts, Serving Size 5 drops, and Servings Per Container 172. Proprietary blend in certified organic extra virgin olive oil has no amount. Mountain-grown coriander (cilantro) seed oil has no amount. Those rows are actives and are not graded. The olive oil stays inside the blend heading. The photograph has no Other ingredients heading. None is not printed. The facts serving is 5 drops. The package photograph prints 6 35824 00011 2. The check digit passes. UPC 635824000112. This code is the 1 oz bottle only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-clovanol-1',
    productName: 'North American Herb & Spice Clovanol (1 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-clovanol-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000761',
    activeIngredients: [
      { name: 'Proprietary blend emulsified in organic extra virgin olive oil', strength: '' },
      { name: 'Steam-extracted clove bud oil', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/clovanol/?attribute_pa_size=1-ounce-spice-oil-complex lists the 1 ounce spice oil complex at $41.99. The 15% monthly figure is subscribe and save and is not the shelf price. No stock word was on the page. The package photograph prints Supplement Facts, Serving Size 3 drops, and Servings per container 318. Proprietary blend emulsified in organic extra virgin olive oil has no amount. Steam-extracted clove bud oil has no amount. Those rows are actives and are not graded. The olive oil stays inside the blend heading. Non-GMO under the box is a claim. The photograph has no Other ingredients heading. None is not printed. The facts serving is 3 drops. The package photograph prints 6 35824 00076 1. The check digit passes. UPC 635824000761. This code is the 1 oz bottle only. Counted Limited tokens: none.',
    ],
  }),
  finish({
    id: 'nahs-b387-cuminol-1',
    productName: 'North American Herb & Spice Cuminol (1 oz)',
    brand: 'North American Herb & Spice',
    category: 'Herbs',
    formulaId: 'nahs-b387-cuminol-1',
    form: 'liquid',
    audience: 'adult',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['North American Herb & Spice'],
    barcode: '635824000037',
    activeIngredients: [
      { name: 'Proprietary blend in extra virgin olive oil', strength: '100 mg' },
      { name: 'Wild oil of cumin', strength: '' },
      { name: 'Wild oil of fennel', strength: '' },
      { name: 'Wild oregano oil P73', strength: '' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't86u. https://www.northamericanherbandspice.com/shop/cuminol/ shows Out of stock. The struck price is $44.99. The $31.49 figure is the sale price. The package photograph prints Supplement Facts, Serving Size 5 drops, Servings Per Container 172, and Proprietary blend in extra virgin olive oil 100 mg. The three rows are Wild oil of cumin, Wild oil of fennel, and Wild oregano oil P73. Those rows are actives and are not graded. The olive oil stays inside the blend heading. 100% GMO-free under the box is a claim. The photograph has no Other ingredients heading. None is not printed. The facts serving is 5 drops. The package photograph prints 6 35824 00003 7. The check digit passes. UPC 635824000037. This code is the 1 oz bottle only. Counted Limited tokens: none.',
    ],
  }),
];

const ROWS = BATCH387_KYR6E_T86U;
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 13) throw new Error(`batch387 count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch387 duplicate id');

const expected: Record<string, { barcode: string; actives: number; inactive: number; audience: 'adult' | 'kids' }> = {
  'nahs-b387-purely-e-60': { barcode: '635824002734', actives: 6, inactive: 1, audience: 'adult' },
  'nahs-b387-cherry-bears-60': { barcode: '635824004219', actives: 3, inactive: 5, audience: 'kids' },
  'nahs-b387-oregaresp-90': { barcode: '635824002079', actives: 7, inactive: 3, audience: 'adult' },
  'nahs-b387-purelyliver-150': { barcode: '635824009733', actives: 1, inactive: 2, audience: 'adult' },
  'nahs-b387-turmeric-60': { barcode: '635824006671', actives: 9, inactive: 3, audience: 'adult' },
  'nahs-b387-dlenolate-30': { barcode: '635824009917', actives: 5, inactive: 3, audience: 'adult' },
  'nahs-b387-polarpower-60': { barcode: '635824002819', actives: 9, inactive: 2, audience: 'adult' },
  'nahs-b387-purely-zinc-17': { barcode: '635824007692', actives: 12, inactive: 3, audience: 'adult' },
  'nahs-b387-oregabiotic-60': { barcode: '635824002291', actives: 5, inactive: 1, audience: 'adult' },
  'nahs-b387-prostaclenz-60': { barcode: '635824000679', actives: 6, inactive: 1, audience: 'adult' },
  'nahs-b387-cilantrol-1': { barcode: '635824000112', actives: 2, inactive: 0, audience: 'adult' },
  'nahs-b387-clovanol-1': { barcode: '635824000761', actives: 2, inactive: 0, audience: 'adult' },
  'nahs-b387-cuminol-1': { barcode: '635824000037', actives: 4, inactive: 0, audience: 'adult' },
};

for (const row of ROWS) {
  const spec = expected[row.id];
  if (!spec) throw new Error(`batch387 id ${row.id}`);
  if (row.barcode !== spec.barcode || !upcCheck(row.barcode)) throw new Error(`batch387 upc ${row.id}`);
  if (row.category !== 'Herbs' || row.audience !== spec.audience || row.verdict !== 'clean' || row.honestNote) {
    throw new Error(`batch387 grade ${row.id}`);
  }
  if (row.activeIngredients.length !== spec.actives) throw new Error(`${row.id} actives`);
  if (row.inactiveIngredients.length !== spec.inactive) throw new Error(`${row.id} other`);
  const roll = computeVerdictFromInactiveIngredients(row.inactiveIngredients);
  if (roll.verdict !== 'clean') throw new Error(`${row.id} rollup`);
  if (row.inactiveIngredients.some((ingredient) => ingredientCountsTowardLimitedStack(ingredient))) {
    throw new Error(`${row.id} stack`);
  }
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`${row.id} ${ingredient.name}: ${why}`);
  }
  const source = (row.sourcesGeneral ?? []).join(' ');
  if (banned.test(source) || source.includes('None is printed')) throw new Error(`${row.id} source`);
  if (!row.retailers.includes('North American Herb & Spice')) throw new Error(`${row.id} carrier`);
}

const held = [
  '635824004172',
  '635824005933',
  '635824006305',
  '635824006664',
  '635824006824',
  '635824009900',
  '335824000937',
];
if (ROWS.some((row) => held.includes(row.barcode ?? ''))) throw new Error('batch387 held upc attached');
