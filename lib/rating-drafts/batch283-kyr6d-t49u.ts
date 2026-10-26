// DRAFT / not verified / batch 283 KYR6-d (t49u still-open continuation).
// Herbs Etc. brand pages are the single source. A pack is here only when that page
// shows it for sale and every other-ingredient token is already locked.
// Barcode fields on these pages were empty. SKUs were not copied into the barcode.
// Not in this file: the two gummies, Menopautonic liquid, ChlorOxygen mint, bundles, and the allergy system.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, source: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${source}` };
}

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & { barcode?: string },
): RatingRecord {
  return finish({
    ...partial,
    brand: 'Herbs Etc.',
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Herbs Etc.'],
    barcode: partial.barcode ?? '',
  });
}

const ALC = 'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE — oral liquid). The percent on the bottle is the strength of this vehicle, not a new token.';
const WATER = 'Methodology §5 Cleared (water / purified water).';
const GLY = 'Methodology §5 Cleared (vegetable glycerin / glycerin).';
const ACV = 'Methodology §5 Cleared (apple cider vinegar).';
const GEL = 'Methodology §5 Cleared (gelatin / bovine gelatin).';
const CAROB = 'Methodology §5 Caution (Carob — color in a softgel; Carob Extract row, not Cleared carob powder-as-food).';
const CHL = 'Methodology §5 Cleared (chlorophyll — named green plant pigment, not chlorophyllin).';
const EVOO = 'Methodology §5 Cleared (extra virgin olive oil — softgel fill).';
const LEC = 'Methodology §5 Cleared (sunflower lecithin).';
const WAX = 'Methodology §5 Cleared (beeswax).';
const CIT = 'Methodology §5 Caution (citric acid). Does not count toward the t137u stack.';
const HONEY = 'Methodology §5 Cleared (honey).';
const GUM = 'Methodology §5 Cleared (gum arabic).';
const TRAG = 'Methodology §5 Cleared (gum tragacanth).';
const OILS = 'Methodology §5 Cleared (lemon and lime essential oils).';
const CITRAL = 'Methodology §5 Cleared (citral).';
const CANE = 'Methodology §5 Cleared (evaporated cane juice / cane sugar).';
const OLIVE = 'Methodology §5 Cleared (olive oil).';
const VITE = 'Methodology §5 Cleared (vitamin E oil).';
const GARLIC = 'Methodology §5 Caution (garlic clove oil). Does not count toward the t137u stack.';
const LEMON = 'Methodology §5 Cleared (lemon oil emulsion).';
const MONK = 'Methodology §5 Cleared (monk fruit extract).';
const AGAVE = 'Methodology §5 Cleared (agave inulin).';
const LJ = 'Methodology §5 Cleared (lemon juice powder).';
const STEVIA = 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.';

const HERB = [{ name: 'Herbal blend', strength: 'milligram amounts not printed' }];

function liq(panel: string, withGly: boolean, withAcv: boolean): IngredientFlag[] {
  const flags = [flag(panel, 'Alcohol', 'limited', ALC), flag(panel, 'Purified Water', 'cleared', WATER)];
  if (withGly) flags.push(flag(panel, 'Vegetable Glycerine', 'cleared', GLY));
  if (withAcv) flags.push(flag(panel, 'Apple Cider Vinegar', 'cleared', ACV));
  return flags;
}

function soft(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Bovine Gelatin', 'cleared', GEL),
    flag(panel, 'Vegetable Glycerine', 'cleared', GLY),
    flag(panel, 'Purified Water', 'cleared', WATER),
    flag(panel, 'Carob', 'moderate', CAROB),
    flag(panel, 'Chlorophyll', 'cleared', CHL),
    flag(panel, 'Extra Virgin Olive Oil', 'cleared', EVOO),
    flag(panel, 'Sunflower Lecithin', 'cleared', LEC),
    flag(panel, 'Beeswax', 'cleared', WAX),
  ];
}

export const BATCH283_KYR6D_T49U: RatingRecord[] = [
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops twice daily. For maximum support, take consistently for 100 days or longer. Herbalist's Tip: Adrenotonic™ is designed for consistent, ongoing support rather than as a quick energy boost. t49u brand-page single source.";
    return row({
      id: "herbs-b283-adrenotonic-1oz",
      productName: "Herbs Etc. Adrenotonic Classic Liquid Extract (1 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-adrenotonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/adrenotonic lists 1 oz at $16.98 and in stock. Take 30 drops twice daily. For maximum support, take consistently for 100 days or longer. Herbalist's Tip: Adrenotonic™ is designed for consistent, ongoing support rather than as a quick energy boost. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take 1 softgel twice daily . For maximum support, take consistently for 100 days or longer . Herbalist's Tip: Adrenotonic™ is designed for consistent, ongoing support rather than as a quick energy boos. t49u brand-page single source.";
    return row({
      id: "herbs-b283-adrenotonic-softgels-60ct",
      productName: "Herbs Etc. Adrenotonic Softgels (60 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-adrenotonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/adrenotonic-softgels lists 60 ct at $33.98 and in stock. Take 1 softgel twice daily . For maximum support, take consistently for 100 days or longer . Herbalist's Tip: Adrenotonic™ is designed for consistent, ongoing support rather than as a quick energy boos. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Immediate Support: Take 40 drops every 2–3 hours until optimal comfort is achieved. Ongoing Support: Take 40 drops three times daily . Proactive Support: Beginning two months prior to seasonal challeng. t49u brand-page single source.";
    return row({
      id: "herbs-b283-allertonic-1oz",
      productName: "Herbs Etc. Allertonic Classic Liquid Extract (1 oz)",
      category: "Allergies",
      formulaId: "herbs-b283-allertonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/allertonic lists 1 oz at $16.98 and in stock. Immediate Support: Take 40 drops every 2–3 hours until optimal comfort is achieved. Ongoing Support: Take 40 drops three times daily . Proactive Support: Beginning two months prior to seasonal challeng. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Immediate Support: Take 40 drops every 2–3 hours until optimal comfort is achieved. Ongoing Support: Take 40 drops three times daily . Proactive Support: Beginning two months prior to seasonal challeng. t49u brand-page single source.";
    return row({
      id: "herbs-b283-allertonic-2oz",
      productName: "Herbs Etc. Allertonic Classic Liquid Extract (2 oz)",
      category: "Allergies",
      formulaId: "herbs-b283-allertonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/allertonic lists 2 oz at $29.98 and in stock. Immediate Support: Take 40 drops every 2–3 hours until optimal comfort is achieved. Ongoing Support: Take 40 drops three times daily . Proactive Support: Beginning two months prior to seasonal challeng. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Immediate Support: Take 1 softgel every 2–3 hours until optimal comfort is achieved. Noticeable relief is typically experienced within the first or second day. Ongoing Support: Take 1 softgel three tim. t49u brand-page single source.";
    return row({
      id: "herbs-b283-allertonic-softgels-60ct",
      productName: "Herbs Etc. Allertonic Softgels (60 ct)",
      category: "Allergies",
      formulaId: "herbs-b283-allertonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/allertonic-softgels lists 60 ct at $33.98 and in stock. Immediate Support: Take 1 softgel every 2–3 hours until optimal comfort is achieved. Noticeable relief is typically experienced within the first or second day. Ongoing Support: Take 1 softgel three tim. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 120 ct. Immediate Support: Take 1 softgel every 2–3 hours until optimal comfort is achieved. Noticeable relief is typically experienced within the first or second day. Ongoing Support: Take 1 softgel three tim. t49u brand-page single source.";
    return row({
      id: "herbs-b283-allertonic-softgels-120ct",
      productName: "Herbs Etc. Allertonic Softgels (120 ct)",
      category: "Allergies",
      formulaId: "herbs-b283-allertonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/allertonic-softgels lists 120 ct at $56.79 and in stock. Immediate Support: Take 1 softgel every 2–3 hours until optimal comfort is achieved. Noticeable relief is typically experienced within the first or second day. Ongoing Support: Take 1 softgel three tim. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Spray liberally on affected skin area(s) three times daily up to every two hours . Discontinue use and consult with a doctor if the condition persists or worsens. Herbalist's Tip: Keep Bug Itch ReLeaf®. t49u brand-page single source.";
    return row({
      id: "herbs-b283-bug-itch-releaf-1oz",
      productName: "Herbs Etc. Bug Itch ReLeaf Classic Topical Spray (1 oz)",
      category: "First Aid",
      formulaId: "herbs-b283-bug-itch-releaf",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, false, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/bug-itch-releaf lists 1 oz at $16.98 and in stock. Spray liberally on affected skin area(s) three times daily up to every two hours . Discontinue use and consult with a doctor if the condition persists or worsens. Herbalist's Tip: Keep Bug Itch ReLeaf®. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Shake well before using. Take 15 drops in water for 50 mg of chlorophyll . To obtain 100 mg of chlorophyll, take 30 drops in water . ChlorOxygen® is water soluble for maximum absorption. Herbalist's Ti. t49u brand-page single source.";
    return row({
      id: "herbs-b283-chloroxygen-alcohol-free-1oz",
      productName: "Herbs Etc. ChlorOxygen Chlorophyll Concentrate Alcohol Free Drops (1 oz)",
      category: "Vitamins",
      formulaId: "herbs-b283-chloroxygen-alcohol-free",
      form: "liquid",
      minAge: 18,
      activeIngredients: [{ name: 'Chlorophyll', strength: '50 mg per 15 drops' }],
      inactiveIngredients: [flag(PANEL,'Vegetable Glycerine','cleared',GLY), flag(PANEL,'Purified Water','cleared',WATER)],
      verdict: "clean",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-alcohol-free lists 1 oz at $16.98 and in stock. Shake well before using. Take 15 drops in water for 50 mg of chlorophyll . To obtain 100 mg of chlorophyll, take 30 drops in water . ChlorOxygen® is water soluble for maximum absorption. Herbalist's Ti. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Shake well before using. Take 15 drops in water for 50 mg of chlorophyll . To obtain 100 mg of chlorophyll, take 30 drops in water . ChlorOxygen® is water soluble for maximum absorption. Herbalist's Ti. t49u brand-page single source.";
    return row({
      id: "herbs-b283-chloroxygen-alcohol-free-2oz",
      productName: "Herbs Etc. ChlorOxygen Chlorophyll Concentrate Alcohol Free Drops (2 oz)",
      category: "Vitamins",
      formulaId: "herbs-b283-chloroxygen-alcohol-free",
      form: "liquid",
      minAge: 18,
      activeIngredients: [{ name: 'Chlorophyll', strength: '50 mg per 15 drops' }],
      inactiveIngredients: [flag(PANEL,'Vegetable Glycerine','cleared',GLY), flag(PANEL,'Purified Water','cleared',WATER)],
      verdict: "clean",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-alcohol-free lists 2 oz at $29.98 and in stock. Shake well before using. Take 15 drops in water for 50 mg of chlorophyll . To obtain 100 mg of chlorophyll, take 30 drops in water . ChlorOxygen® is water soluble for maximum absorption. Herbalist's Ti. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Shake well before using. Take 15 drops in water to obtain 50 mg of chlorophyll. Water soluble for maximum absorption. Enjoy over ice for a tasty beverage. t49u brand-page single source.";
    return row({
      id: "herbs-b283-chloroxygen-chlorophyll-concentrate-lemonade-drops-1oz",
      productName: "Herbs Etc. Chloroxygen Lemonade Drops 1oz (1 oz)",
      category: "Vitamins",
      formulaId: "herbs-b283-chloroxygen-chlorophyll-concentrate-lemonade-drops",
      form: "liquid",
      minAge: 18,
      activeIngredients: [{ name: 'Chlorophyll', strength: '50 mg per 15 drops' }],
      inactiveIngredients: [flag(PANEL,'Vegetable Glycerin','cleared',GLY), flag(PANEL,'Lemon Oil Emulsion','cleared',LEMON), flag(PANEL,'Monk Fruit Extract','cleared',MONK)],
      verdict: "clean",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-chlorophyll-concentrate-lemonade-drops lists 1 oz at $16.98 and in stock. Shake well before using. Take 15 drops in water to obtain 50 mg of chlorophyll. Water soluble for maximum absorption. Enjoy over ice for a tasty beverage. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 10 ct. Add 1 stick pack to 8 oz of water. Whisk, stir or shake vigorously and enjoy!. t49u brand-page single source.";
    return row({
      id: "herbs-b283-chloroxygen-chlorophyll-concentrate-lemonade-powder-10ct",
      productName: "Herbs Etc. ChlorOxygen Lemonade Powder 10 CT (10 ct)",
      category: "Vitamins",
      formulaId: "herbs-b283-chloroxygen-chlorophyll-concentrate-lemonade-powder",
      form: "powder",
      minAge: 18,
      activeIngredients: [{ name: 'Chlorophyll', strength: 'amount not printed' }],
      inactiveIngredients: [flag(PANEL,'Agave Inulin','cleared',AGAVE), flag(PANEL,'Lemon Juice Powder','cleared',LJ), flag(PANEL,'Non-GMO Citric Acid','moderate',CIT), flag(PANEL,'Monk Fruit Extract','cleared',MONK), flag(PANEL,'Stevia Leaf Extract','limited',STEVIA)],
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-chlorophyll-concentrate-lemonade-powder lists 10 ct at $19.99 and in stock. Add 1 stick pack to 8 oz of water. Whisk, stir or shake vigorously and enjoy!. Counted Limited tokens: Stevia Leaf Extract. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel with water twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-chloroxygen-softgels-60ct",
      productName: "Herbs Etc. ChlorOxygen Chlorophyll Concentrate Softgels (60 ct)",
      category: "Vitamins",
      formulaId: "herbs-b283-chloroxygen-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-softgels lists 60 ct at $18.19 and in stock. Take one softgel with water twice a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 120 ct. Take one softgel with water twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-chloroxygen-softgels-120ct",
      productName: "Herbs Etc. ChlorOxygen Chlorophyll Concentrate Softgels (120 ct)",
      category: "Vitamins",
      formulaId: "herbs-b283-chloroxygen-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/chloroxygen-softgels lists 120 ct at $33.98 and in stock. Take one softgel with water twice a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops up to four times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-congest-free-1oz",
      productName: "Herbs Etc. Congest Free Classic Liquid Extract (1 oz)",
      category: "Allergies",
      formulaId: "herbs-b283-congest-free",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, false, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/congest-free lists 1 oz at $16.98 and in stock. Take 30 drops up to four times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Acute Support - Take 40 drops every three to four hours. Increase suggested use to 80 drops should you need more support. Proactive Support - As a preventative measure take 40 drops twice a day five da. t49u brand-page single source.";
    return row({
      id: "herbs-b283-cramp-releaf-1oz",
      productName: "Herbs Etc. Cramp ReLeaf (Menstrual) Classic Liquid Extract (1 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-cramp-releaf",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/cramp-releaf lists 1 oz at $16.98 and in stock. Acute Support - Take 40 drops every three to four hours. Increase suggested use to 80 drops should you need more support. Proactive Support - As a preventative measure take 40 drops twice a day five da. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Immediate Support - Take one softgel every three to four hours. Increase suggested use to two softgels should you need additional support. Proactive - As a preventative measure, take one softgel twice. t49u brand-page single source.";
    return row({
      id: "herbs-b283-cramp-releaf-softgels-60ct",
      productName: "Herbs Etc. Cramp ReLeaf (Menstrual) Softgels (60 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-cramp-releaf-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/cramp-releaf-softgels lists 60 ct at $33.98 and in stock. Immediate Support - Take one softgel every three to four hours. Increase suggested use to two softgels should you need additional support. Proactive - As a preventative measure, take one softgel twice. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Acute Support - Take 30 drops every two to three hours. Ongoing Support - Take 30 drops twice a day on an ongoing basis. t49u brand-page single source.";
    return row({
      id: "herbs-b283-cranbladder-releaf-1oz",
      productName: "Herbs Etc. CranBladder ReLeaf Classic Liquid Extract (1 oz)",
      category: "Digestive",
      formulaId: "herbs-b283-cranbladder-releaf",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/cranbladder-releaf lists 1 oz at $17.78 and in stock. Acute Support - Take 30 drops every two to three hours. Ongoing Support - Take 30 drops twice a day on an ongoing basis. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Immediate support - Take one softgel every two to three hours. Ongoing support - Take one softgel twice a day on an ongoing basis. t49u brand-page single source.";
    return row({
      id: "herbs-b283-cranbladder-releaf-softgels-60ct",
      productName: "Herbs Etc. CranBladder ReLeaf Softgels (60 ct)",
      category: "Digestive",
      formulaId: "herbs-b283-cranbladder-releaf-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/cranbladder-releaf-softgels lists 60 ct at $33.98 and in stock. Immediate support - Take one softgel every two to three hours. Ongoing support - Take one softgel twice a day on an ongoing basis. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops three times a day, after meals or before bedtime. t49u brand-page single source.";
    return row({
      id: "herbs-b283-dailyherbalbitters-1oz",
      productName: "Herbs Etc. Daily Herbal Bitters Classic Liquid Extract (1 oz)",
      category: "Digestive",
      formulaId: "herbs-b283-dailyherbalbitters",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/dailyherbalbitters lists 1 oz at $16.98 and in stock. Take 30 drops three times a day, after meals or before bedtime. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Take 30 drops in water twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-health-2oz",
      productName: "Herbs Etc. Deep Health Classic Liquid Extract (2 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-deep-health",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-health lists 2 oz at $29.98 and in stock. Take 30 drops in water twice a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops one hour prior to bedtime and 30 drops at bedtime. Best results are achieved by the second or third night. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-sleep-1oz",
      productName: "Herbs Etc. Deep Sleep Classic Liquid Extract (1 oz)",
      category: "Sleep",
      formulaId: "herbs-b283-deep-sleep",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep lists 1 oz at $16.98 and in stock. Take 30 drops one hour prior to bedtime and 30 drops at bedtime. Best results are achieved by the second or third night. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Take 30 drops one hour prior to bedtime and 30 drops at bedtime. Best results are achieved by the second or third night. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-sleep-2oz",
      productName: "Herbs Etc. Deep Sleep Classic Liquid Extract (2 oz)",
      category: "Sleep",
      formulaId: "herbs-b283-deep-sleep",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep lists 2 oz at $29.98 and in stock. Take 30 drops one hour prior to bedtime and 30 drops at bedtime. Best results are achieved by the second or third night. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 4 oz. Take 30 drops one hour prior to bedtime and 30 drops at bedtime. Best results are achieved by the second or third night. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-sleep-4oz",
      productName: "Herbs Etc. Deep Sleep Classic Liquid Extract (4 oz)",
      category: "Sleep",
      formulaId: "herbs-b283-deep-sleep",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep lists 4 oz at $56.79 and in stock. Take 30 drops one hour prior to bedtime and 30 drops at bedtime. Best results are achieved by the second or third night. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 10 ct. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-sleep-softgels-10ct",
      productName: "Herbs Etc. Deep Sleep Softgels (10 ct)",
      category: "Sleep",
      formulaId: "herbs-b283-deep-sleep-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep-softgels lists 10 ct at $8.98 and in stock. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 30 ct. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-sleep-softgels-30ct",
      productName: "Herbs Etc. Deep Sleep Softgels (30 ct)",
      category: "Sleep",
      formulaId: "herbs-b283-deep-sleep-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep-softgels lists 30 ct at $20.98 and in stock. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-sleep-softgels-60ct",
      productName: "Herbs Etc. Deep Sleep Softgels (60 ct)",
      category: "Sleep",
      formulaId: "herbs-b283-deep-sleep-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep-softgels lists 60 ct at $33.98 and in stock. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 120 ct. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. t49u brand-page single source.";
    return row({
      id: "herbs-b283-deep-sleep-softgels-120ct",
      productName: "Herbs Etc. Deep Sleep Softgels (120 ct)",
      category: "Sleep",
      formulaId: "herbs-b283-deep-sleep-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/deep-sleep-softgels lists 120 ct at $56.79 and in stock. Take one softgel one hour before bedtime and one softgel at bedtime. Best results are achieved by the second or third night. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Take 40 drops twice a day on an empty stomach. t49u brand-page single source.";
    return row({
      id: "herbs-b283-essiac-tonic-2oz",
      productName: "Herbs Etc. Essiac Tonic Classic Liquid Extract (2 oz)",
      category: "Immune Support",
      formulaId: "herbs-b283-essiac-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/essiac-tonic lists 2 oz at $29.98 and in stock. Take 40 drops twice a day on an empty stomach. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 4 oz. Take 40 drops twice a day on an empty stomach. t49u brand-page single source.";
    return row({
      id: "herbs-b283-essiac-tonic-4oz",
      productName: "Herbs Etc. Essiac Tonic Classic Liquid Extract (4 oz)",
      category: "Immune Support",
      formulaId: "herbs-b283-essiac-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/essiac-tonic lists 4 oz at $56.79 and in stock. Take 40 drops twice a day on an empty stomach. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel twice a day on an empty stomach. t49u brand-page single source.";
    return row({
      id: "herbs-b283-essiac-tonic-softgels-60ct",
      productName: "Herbs Etc. Essiac Tonic Softgels (60 ct)",
      category: "Immune Support",
      formulaId: "herbs-b283-essiac-tonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/essiac-tonic-softgels lists 60 ct at $33.98 and in stock. Take one softgel twice a day on an empty stomach. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 120 ct. Take one softgel twice a day on an empty stomach. t49u brand-page single source.";
    return row({
      id: "herbs-b283-essiac-tonic-softgels-120ct",
      productName: "Herbs Etc. Essiac Tonic Softgels (120 ct)",
      category: "Immune Support",
      formulaId: "herbs-b283-essiac-tonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/essiac-tonic-softgels lists 120 ct at $56.79 and in stock. Take one softgel twice a day on an empty stomach. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-hb-pressure-tonic-1oz",
      productName: "Herbs Etc. HB Pressure Tonic Classic Liquid Extract (1 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-hb-pressure-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/hb-pressure-tonic lists 1 oz at $16.98 and in stock. Take 30 drops three times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Take 30 drops three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-hb-pressure-tonic-2oz",
      productName: "Herbs Etc. HB Pressure Tonic Classic Liquid Extract (2 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-hb-pressure-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/hb-pressure-tonic lists 2 oz at $29.98 and in stock. Take 30 drops three times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-hb-pressure-tonic-softgels-60ct",
      productName: "Herbs Etc. HB Pressure Tonic Softgels (60 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-hb-pressure-tonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/hb-pressure-tonic-softgels lists 60 ct at $33.98 and in stock. Take one softgel three times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 40 drops up to every three hours or as needed. t49u brand-page single source.";
    return row({
      id: "herbs-b283-herbalpm-1oz",
      productName: "Herbs Etc. Herbal PM Classic Liquid Extract (1 oz)",
      category: "Sleep",
      formulaId: "herbs-b283-herbalpm",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/herbalpm lists 1 oz at $16.98 and in stock. Take 40 drops up to every three hours or as needed. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Immediate support: Take 30 drops every hour. Ongoing support: Take 30 drops twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-immune-alert-1oz",
      productName: "Herbs Etc. Immune Alert Classic Liquid Extract (1 oz)",
      category: "Immune Support",
      formulaId: "herbs-b283-immune-alert",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/immune-alert lists 1 oz at $16.98 and in stock. Immediate support: Take 30 drops every hour. Ongoing support: Take 30 drops twice a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Immediate support - Take one softgel every hour. Ongoing support - One softgel twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-immune-alert-softgels-60ct",
      productName: "Herbs Etc. Immune Alert Softgels (60 ct)",
      category: "Immune Support",
      formulaId: "herbs-b283-immune-alert-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/immune-alert-softgels lists 60 ct at $33.98 and in stock. Immediate support - Take one softgel every hour. Ongoing support - One softgel twice a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops in water two to four times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-immunoboost-1oz",
      productName: "Herbs Etc. ImmunoBoost Classic Liquid Extract (1 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-immunoboost",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/immunoboost lists 1 oz at $16.98 and in stock. Take 30 drops in water two to four times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel two to four times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-immunoboost-softgels-60ct",
      productName: "Herbs Etc. ImmunoBoost Softgels (60 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-immunoboost-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/immunoboost-softgels lists 60 ct at $33.98 and in stock. Take one softgel two to four times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Spray liberally on skin area(s) three to five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-ivy-itch-releaf-1oz",
      productName: "Herbs Etc. Ivy Itch ReLeaf Topical Spray (1 oz)",
      category: "First Aid",
      formulaId: "herbs-b283-ivy-itch-releaf",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/ivy-itch-releaf lists 1 oz at $16.98 and in stock. Spray liberally on skin area(s) three to five times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel with water every 4 hours as needed. t49u brand-page single source.";
    return row({
      id: "herbs-b283-kava_calm-60ct",
      productName: "Herbs Etc. Kava Calm Softgels (60 ct)",
      category: "Sleep",
      formulaId: "herbs-b283-kava_calm",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/kava_calm lists 60 ct at $33.98 and in stock. Take one softgel with water every 4 hours as needed. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops every four hours as needed. t49u brand-page single source.";
    return row({
      id: "herbs-b283-kavacalm-1oz",
      productName: "Herbs Etc. Kava Calm Classic Liquid Extract (1 oz)",
      category: "Sleep",
      formulaId: "herbs-b283-kavacalm",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/kavacalm lists 1 oz at $17.78 and in stock. Take 30 drops every four hours as needed. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Immediate Support - Take 30 drops every four hours. Ongoing Support - Take 30 drops twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-kidney-tonic-1oz",
      productName: "Herbs Etc. Kidney Tonic Classic Liquid Extract (1 oz)",
      category: "Digestive",
      formulaId: "herbs-b283-kidney-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/kidney-tonic lists 1 oz at $16.98 and in stock. Immediate Support - Take 30 drops every four hours. Ongoing Support - Take 30 drops twice a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Immediate Support - Take 30 drops every four hours. Ongoing Support - Take 30 drops twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-kidney-tonic-2oz",
      productName: "Herbs Etc. Kidney Tonic Classic Liquid Extract (2 oz)",
      category: "Digestive",
      formulaId: "herbs-b283-kidney-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/kidney-tonic lists 2 oz at $29.98 and in stock. Immediate Support - Take 30 drops every four hours. Ongoing Support - Take 30 drops twice a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Immediate support - Take one softgel with water every four hours. Ongoing support - Take one softgel with water twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-kidney-tonic-softgels-60ct",
      productName: "Herbs Etc. Kidney Tonic Softgels (60 ct)",
      category: "Digestive",
      formulaId: "herbs-b283-kidney-tonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/kidney-tonic-softgels lists 60 ct at $33.98 and in stock. Immediate support - Take one softgel with water every four hours. Ongoing support - Take one softgel with water twice a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 20 drops three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-liver-tonic-1oz",
      productName: "Herbs Etc. Liver Tonic Classic Liquid Extract (1 oz)",
      category: "Digestive",
      formulaId: "herbs-b283-liver-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/liver-tonic lists 1 oz at $16.98 and in stock. Take 20 drops three times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel two or three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-liver-tonic-softgels-60ct",
      productName: "Herbs Etc. Liver Tonic Softgels (60 ct)",
      category: "Digestive",
      formulaId: "herbs-b283-liver-tonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/liver-tonic-softgels lists 60 ct at $33.98 and in stock. Take one softgel two or three times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops every two or three hours. t49u brand-page single source.";
    return row({
      id: "herbs-b283-loviral-1oz",
      productName: "Herbs Etc. Loviral Classic Liquid Extract (1 oz)",
      category: "Immune Support",
      formulaId: "herbs-b283-loviral",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, false, true),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/loviral lists 1 oz at $17.78 and in stock. Take 30 drops every two or three hours. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel every two to three hours. t49u brand-page single source.";
    return row({
      id: "herbs-b283-loviral-softgels-60ct",
      productName: "Herbs Etc. Loviral Softgels (60 ct)",
      category: "Immune Support",
      formulaId: "herbs-b283-loviral-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/loviral-softgels lists 60 ct at $33.98 and in stock. Take one softgel every two to three hours. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops three times a day. Specific for long-term use. t49u brand-page single source.";
    return row({
      id: "herbs-b283-lung-tonic-1oz",
      productName: "Herbs Etc. Lung Tonic Classic Liquid Extract (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-lung-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, true),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/lung-tonic lists 1 oz at $16.98 and in stock. Take 30 drops three times a day. Specific for long-term use. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Take 30 drops three times a day. Specific for long-term use. t49u brand-page single source.";
    return row({
      id: "herbs-b283-lung-tonic-2oz",
      productName: "Herbs Etc. Lung Tonic Classic Liquid Extract (2 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-lung-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, true),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/lung-tonic lists 2 oz at $29.98 and in stock. Take 30 drops three times a day. Specific for long-term use. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-lung-tonic-softgels-60ct",
      productName: "Herbs Etc. Lung Tonic Softgels (60 ct)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-lung-tonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/lung-tonic-softgels lists 60 ct at $33.98 and in stock. Take one softgel three times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 120 ct. Take one softgel three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-lung-tonic-softgels-120ct",
      productName: "Herbs Etc. Lung Tonic Softgels (120 ct)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-lung-tonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/lung-tonic-softgels lists 120 ct at $56.79 and in stock. Take one softgel three times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-lymphatonic-1oz",
      productName: "Herbs Etc. Lymphatonic Classic Liquid Extract (1 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-lymphatonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/lymphatonic lists 1 oz at $16.98 and in stock. Take 30 drops three times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Take 30 drops three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-lymphatonic-2oz",
      productName: "Herbs Etc. Lymphatonic Classic Liquid Extract (2 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-lymphatonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/lymphatonic lists 2 oz at $29.98 and in stock. Take 30 drops three times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-lymphatonic-softgels-60ct",
      productName: "Herbs Etc. Lymphatonic Softgels (60 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-lymphatonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/lymphatonic-softgels lists 60 ct at $33.98 and in stock. Take one softgel three times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel with water in the morning and one softgel before bed. After two months, should suggested use be insufficient, increase to two softgels twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-menopautonic-softgels-60ct",
      productName: "Herbs Etc. Menopautonic Softgels (60 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-menopautonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/menopautonic-softgels lists 60 ct at $33.98 and in stock. Take one softgel with water in the morning and one softgel before bed. After two months, should suggested use be insufficient, increase to two softgels twice a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 120 ct. Take one softgel with water in the morning and one softgel before bed. After two months, should suggested use be insufficient, increase to two softgels twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-menopautonic-softgels-120ct",
      productName: "Herbs Etc. Menopautonic Softgels (120 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-menopautonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/menopautonic-softgels lists 120 ct at $56.79 and in stock. Take one softgel with water in the morning and one softgel before bed. After two months, should suggested use be insufficient, increase to two softgels twice a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Apply five drops to cotton swab, then apply to gums and oral tissues twice a day. Do not rinse. Swallow. If stinging occurs, dilute with water. Water pick flosser use: Add 30 drops to the tray. t49u brand-page single source.";
    return row({
      id: "herbs-b283-mouth-tonic-1oz",
      productName: "Herbs Etc. Mouth Tonic Classic Liquid Extract (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-mouth-tonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/mouth-tonic lists 1 oz at $16.98 and in stock. Apply five drops to cotton swab, then apply to gums and oral tissues twice a day. Do not rinse. Swallow. If stinging occurs, dilute with water. Water pick flosser use: Add 30 drops to the tray. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Warm the oil to body temperature, put 1-4 drops in each ear, insert sterile cotton in each ear to prevent dripping. Repeat every six hours. t49u brand-page single source.";
    return row({
      id: "herbs-b283-mullein-garlic-ear-drops-1oz",
      productName: "Herbs Etc. Mullein Garlic Ear Drops (1 oz)",
      category: "Eye & Ear",
      formulaId: "herbs-b283-mullein-garlic-ear-drops",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: [flag(PANEL,'Olive Oil','cleared',OLIVE), flag(PANEL,'Vitamin E Oil','cleared',VITE), flag(PANEL,'Garlic Clove Oil','moderate',GARLIC), flag(PANEL,'Alcohol','limited',ALC), flag(PANEL,'Purified Water','cleared',WATER)],
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/mullein-garlic-ear-drops lists 1 oz at $16.98 and in stock. Warm the oil to body temperature, put 1-4 drops in each ear, insert sterile cotton in each ear to prevent dripping. Repeat every six hours. Counted Limited tokens: Alcohol. Missing UPC. No code was invented. The page says for external use only."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 40 drops three times a day before meals. t49u brand-page single source.";
    return row({
      id: "herbs-b283-parafree-1oz",
      productName: "Herbs Etc. ParaFree Classic Liquid Extract (1 oz)",
      category: "Digestive",
      formulaId: "herbs-b283-parafree",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/parafree lists 1 oz at $16.98 and in stock. Take 40 drops three times a day before meals. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three times a day before meals. t49u brand-page single source.";
    return row({
      id: "herbs-b283-parafree-softgels-60ct",
      productName: "Herbs Etc. ParaFree Softgels (60 ct)",
      category: "Digestive",
      formulaId: "herbs-b283-parafree-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/parafree-softgels lists 60 ct at $33.98 and in stock. Take one softgel three times a day before meals. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops every three or four hours. t49u brand-page single source.";
    return row({
      id: "herbs-b283-peak-defense-1oz",
      productName: "Herbs Etc. Peak Defense Classic Liquid Extract (1 oz)",
      category: "Immune Support",
      formulaId: "herbs-b283-peak-defense",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/peak-defense lists 1 oz at $16.98 and in stock. Take 30 drops every three or four hours. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three to five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-peak-defense-softgels-60ct",
      productName: "Herbs Etc. Peak Defense Softgels (60 ct)",
      category: "Immune Support",
      formulaId: "herbs-b283-peak-defense-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/peak-defense-softgels lists 60 ct at $33.98 and in stock. Take one softgel three to five times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops five times a day. External Use: Dilute and apply. t49u brand-page single source.";
    return row({
      id: "herbs-b283-phytocillin-1oz",
      productName: "Herbs Etc. Phytocillin Classic Liquid Extract (1 oz)",
      category: "Immune Support",
      formulaId: "herbs-b283-phytocillin",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/phytocillin lists 1 oz at $16.98 and in stock. Take 30 drops five times a day. External Use: Dilute and apply. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-phytocillin-softgels-60ct",
      productName: "Herbs Etc. Phytocillin Softgels (60 ct)",
      category: "Immune Support",
      formulaId: "herbs-b283-phytocillin-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/phytocillin-softgels lists 60 ct at $33.98 and in stock. Take one softgel five times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 120 ct. Take one softgel five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-phytocillin-softgels-120ct",
      productName: "Herbs Etc. Phytocillin Softgels (120 ct)",
      category: "Immune Support",
      formulaId: "herbs-b283-phytocillin-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/phytocillin-softgels lists 120 ct at $56.79 and in stock. Take one softgel five times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops three to five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-respiratonic-1oz",
      productName: "Herbs Etc. Respiratonic Classic Liquid Extract (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-respiratonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/respiratonic lists 1 oz at $16.98 and in stock. Take 30 drops three to five times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 2 oz. Take 30 drops three to five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-respiratonic-2oz",
      productName: "Herbs Etc. Respiratonic Classic Liquid Extract (2 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-respiratonic",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/respiratonic lists 2 oz at $29.98 and in stock. Take 30 drops three to five times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 30 ct. Take one softgel three to five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-respiratonic-softgels-30ct",
      productName: "Herbs Etc. Respiratonic Softgels (30 ct)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-respiratonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/respiratonic-softgels lists 30 ct at $19.28 and in stock. Take one softgel three to five times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three to five times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-respiratonic-softgels-60ct",
      productName: "Herbs Etc. Respiratonic Softgels (60 ct)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-respiratonic-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/respiratonic-softgels lists 60 ct at $33.98 and in stock. Take one softgel three to five times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 4 oz. Adults and Children 12 years of age and older: Take 1 teaspoon every 3 hours. Children 5-12 years of age: Take 1/2 teaspoon every 3 hours. Children younger than 5 years of age: Consult a healthcare pro. t49u brand-page single source.";
    return row({
      id: "herbs-b283-rocky-mountain-throat-syrup-4oz",
      productName: "Herbs Etc. Rocky Mountain Throat Syrup (4 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-rocky-mountain-throat-syrup",
      form: "liquid",
      minAge: 5,
      activeIngredients: HERB,
      inactiveIngredients: [flag(PANEL,'Evaporated Cane Juice','cleared',CANE), flag(PANEL,'Purified Water','cleared',WATER), flag(PANEL,'Vegetable Glycerine','cleared',GLY), flag(PANEL,'Alcohol','limited',ALC)],
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/rocky-mountain-throat-syrup lists 4 oz at $17.78 and in stock. Adults and Children 12 years of age and older: Take 1 teaspoon every 3 hours. Children 5-12 years of age: Take 1/2 teaspoon every 3 hours. Children younger than 5 years of age: Consult a healthcare pro. Counted Limited tokens: Alcohol. Missing UPC. No code was invented. Ages 12 and older take 1 teaspoon. Ages 5 to 12 take 1/2 teaspoon."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 8 oz. Adults and Children 12 years of age and older: Take 1 teaspoon every 3 hours. Children 5-12 years of age: Take 1/2 teaspoon every 3 hours. Children younger than 5 years of age: Consult a healthcare pro. t49u brand-page single source.";
    return row({
      id: "herbs-b283-rocky-mountain-throat-syrup-8oz",
      productName: "Herbs Etc. Rocky Mountain Throat Syrup (8 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-rocky-mountain-throat-syrup",
      form: "liquid",
      minAge: 5,
      activeIngredients: HERB,
      inactiveIngredients: [flag(PANEL,'Evaporated Cane Juice','cleared',CANE), flag(PANEL,'Purified Water','cleared',WATER), flag(PANEL,'Vegetable Glycerine','cleared',GLY), flag(PANEL,'Alcohol','limited',ALC)],
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/rocky-mountain-throat-syrup lists 8 oz at $29.98 and in stock. Adults and Children 12 years of age and older: Take 1 teaspoon every 3 hours. Children 5-12 years of age: Take 1/2 teaspoon every 3 hours. Children younger than 5 years of age: Consult a healthcare pro. Counted Limited tokens: Alcohol. Missing UPC. No code was invented. Ages 12 and older take 1 teaspoon. Ages 5 to 12 take 1/2 teaspoon."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Spray twice in throat and swallow. Do not exceed 12 applications in a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-singers-saving-grace-extra-strength-1oz",
      productName: "Herbs Etc. Singers Saving Grace Extra Strength Classic Spray (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-singers-saving-grace-extra-strength",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/singers-saving-grace-extra-strength lists 1 oz at $16.98 and in stock. Spray twice in throat and swallow. Do not exceed 12 applications in a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Spray twice in throat and swallow. Do not exceed 12 applications in a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-singers-saving-grace-honey-lemon-1oz",
      productName: "Herbs Etc. Singers Saving Grace Honey Lemon Classic Spray (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-singers-saving-grace-honey-lemon",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: [flag(PANEL,'Alcohol','limited',ALC), flag(PANEL,'Purified Water','cleared',WATER), flag(PANEL,'Honey','cleared',HONEY), flag(PANEL,'Vegetable Glycerine','cleared',GLY), flag(PANEL,'Lemon & Lime Essential Oils','cleared',OILS), flag(PANEL,'Citral','cleared',CITRAL)],
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/singers-saving-grace-honey-lemon lists 1 oz at $16.98 and in stock. Spray twice in throat and swallow. Do not exceed 12 applications in a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Spray twice in throat and swallow. Do not exceed 12 applications in a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-singers-saving-grace-lemon-honey-non-alcohol-1oz",
      productName: "Herbs Etc. Singers Saving Grace Lemon & Honey Non Alcohol Spray (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-singers-saving-grace-lemon-honey-non-alcohol",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: [flag(PANEL,'Vegetable Glycerine','cleared',GLY), flag(PANEL,'Purified Water','cleared',WATER), flag(PANEL,'Citric Acid','moderate',CIT), flag(PANEL,'Gum Arabic','cleared',GUM), flag(PANEL,'Gum Tragacanth','cleared',TRAG), flag(PANEL,'Honey','cleared',HONEY), flag(PANEL,'Lemon & Lime Essential Oils','cleared',OILS), flag(PANEL,'Citral','cleared',CITRAL)],
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/singers-saving-grace-lemon-honey-non-alcohol lists 1 oz at $17.98 and in stock. Spray twice in throat and swallow. Do not exceed 12 applications in a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Spray twice directly into the throat and swallow. Do not exceed 12 applications per day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-singers-saving-grace-professional-strength-non-alcohol-1oz",
      productName: "Herbs Etc. Singers Saving Grace Professional Strength Non Alcohol Spray (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-singers-saving-grace-professional-strength-non-alcohol",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: [flag(PANEL,'Vegetable Glycerine','cleared',GLY), flag(PANEL,'Purified Water','cleared',WATER), flag(PANEL,'Citric Acid','moderate',CIT), flag(PANEL,'Gum Arabic','cleared',GUM), flag(PANEL,'Gum Tragacanth','cleared',TRAG)],
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/singers-saving-grace-professional-strength-non-alcohol lists 1 oz at $17.98 and in stock. Spray twice directly into the throat and swallow. Do not exceed 12 applications per day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel every two to three hours. t49u brand-page single source.";
    return row({
      id: "herbs-b283-smoke-free-softgels-60ct",
      productName: "Herbs Etc. Smoke Free Softgels (60 ct)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-smoke-free-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/smoke-free-softgels lists 60 ct at $33.98 and in stock. Take one softgel every two to three hours. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Spray two times directly in mouth and swallow. t49u brand-page single source.";
    return row({
      id: "herbs-b283-smoke-free-spray-1oz",
      productName: "Herbs Etc. Smoke Free Classic Spray (1 oz)",
      category: "Cold & Flu",
      formulaId: "herbs-b283-smoke-free-spray",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, true),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/smoke-free-spray lists 1 oz at $16.98 and in stock. Spray two times directly in mouth and swallow. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 40 drops three times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-stress-releaf-1oz",
      productName: "Herbs Etc. Stress ReLeaf Classic Liquid Extract (1 oz)",
      category: "Sleep",
      formulaId: "herbs-b283-stress-releaf",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/stress-releaf lists 1 oz at $17.78 and in stock. Take 40 drops three times a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three times a day. Ongoing support - Take one softgel twice a day on an ongoing basis. t49u brand-page single source.";
    return row({
      id: "herbs-b283-stress-releaf-softgels-60ct",
      productName: "Herbs Etc. Stress ReLeaf Softgels (60 ct)",
      category: "Sleep",
      formulaId: "herbs-b283-stress-releaf-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/stress-releaf-softgels lists 60 ct at $33.98 and in stock. Take one softgel three times a day. Ongoing support - Take one softgel twice a day on an ongoing basis. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops twice a day for at least one month to achieve best results. t49u brand-page single source.";
    return row({
      id: "herbs-b283-ultimate-ginseng-1oz",
      productName: "Herbs Etc. Ultimate Ginseng Classic Liquid Extract (1 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-ultimate-ginseng",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/ultimate-ginseng lists 1 oz at $33.98 and in stock. Take 30 drops twice a day for at least one month to achieve best results. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 30 ct. Take one softgel twice a day for at least one month to achieve best results. t49u brand-page single source.";
    return row({
      id: "herbs-b283-ultimate-ginseng-softgels-30ct",
      productName: "Herbs Etc. Ultimate Ginseng Softgels (30 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-ultimate-ginseng-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/ultimate-ginseng-softgels lists 30 ct at $37.38 and in stock. Take one softgel twice a day for at least one month to achieve best results. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Immediate Support - Take 30 drops every hour. Ongoing Support - Take 30 drops twice a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-ultimateechinacea-1oz",
      productName: "Herbs Etc. Ultimate Echinacea Classic Liquid Extract (1 oz)",
      category: "Immune Support",
      formulaId: "herbs-b283-ultimateechinacea",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, false, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/ultimateechinacea lists 1 oz at $16.98 and in stock. Immediate Support - Take 30 drops every hour. Ongoing Support - Take 30 drops twice a day. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Take 30 drops mid-morning, afternoon, or as needed as a natural quick pick-me-up. t49u brand-page single source.";
    return row({
      id: "herbs-b283-vibrant-energy-1oz",
      productName: "Herbs Etc. Vibrant Energy Classic Liquid Extract (1 oz)",
      category: "Herbs",
      formulaId: "herbs-b283-vibrant-energy",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/vibrant-energy lists 1 oz at $16.98 and in stock. Take 30 drops mid-morning, afternoon, or as needed as a natural quick pick-me-up. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 30 ct. Take one softgel with water mid-morning, afternoon, or other times as a natural quick pick-me-up. t49u brand-page single source.";
    return row({
      id: "herbs-b283-vibrant-energy-softgels-30ct",
      productName: "Herbs Etc. Vibrant Energy Softgels (30 ct)",
      category: "Herbs",
      formulaId: "herbs-b283-vibrant-energy-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/vibrant-energy-softgels lists 30 ct at $20.48 and in stock. Take one softgel with water mid-morning, afternoon, or other times as a natural quick pick-me-up. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 1 oz. Internally: Take 30 drops three to four times a day. Externally: One teaspoon of extract in half cup of boiled water. Douche or apply when water cools. t49u brand-page single source.";
    return row({
      id: "herbs-b283-yeast-releaf-1oz",
      productName: "Herbs Etc. Yeast ReLeaf Classic Liquid Extract (1 oz)",
      category: "Digestive",
      formulaId: "herbs-b283-yeast-releaf",
      form: "liquid",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: liq(PANEL, true, false),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/yeast-releaf lists 1 oz at $16.98 and in stock. Internally: Take 30 drops three to four times a day. Externally: One teaspoon of extract in half cup of boiled water. Douche or apply when water cools. Counted Limited tokens: Alcohol. Missing UPC. No code was invented."],
    });
  })(),
  (() => {
    const PANEL = "Herbs Etc. brand page. 60 ct. Take one softgel three to four times a day. t49u brand-page single source.";
    return row({
      id: "herbs-b283-yeast-releaf-softgels-60ct",
      productName: "Herbs Etc. Yeast ReLeaf Softgels (60 ct)",
      category: "Digestive",
      formulaId: "herbs-b283-yeast-releaf-softgels",
      form: "softgel",
      minAge: 18,
      activeIngredients: HERB,
      inactiveIngredients: soft(PANEL),
      verdict: "caution",
      sourcesGeneral: ["t49u. Herbs Etc. brand page is the single source. https://herbsetc.com/products/yeast-releaf-softgels lists 60 ct at $33.98 and in stock. Take one softgel three to four times a day. Counted Limited tokens: none. Missing UPC. No code was invented."],
    });
  })(),
];

const ROWS = BATCH283_KYR6D_T49U;
const EXPECTED: Record<string, { verdict: "clean" | "caution" | "avoid"; cause: string; counted: string }> = {
  "herbs-b283-adrenotonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-adrenotonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-allertonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-allertonic-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-allertonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-allertonic-softgels-120ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-bug-itch-releaf-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-chloroxygen-alcohol-free-1oz": { verdict: "clean", cause: "clean", counted: "" },
  "herbs-b283-chloroxygen-alcohol-free-2oz": { verdict: "clean", cause: "clean", counted: "" },
  "herbs-b283-chloroxygen-chlorophyll-concentrate-lemonade-drops-1oz": { verdict: "clean", cause: "clean", counted: "" },
  "herbs-b283-chloroxygen-chlorophyll-concentrate-lemonade-powder-10ct": { verdict: "caution", cause: "limited_1_2", counted: "Stevia Leaf Extract" },
  "herbs-b283-chloroxygen-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-chloroxygen-softgels-120ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-congest-free-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-cramp-releaf-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-cramp-releaf-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-cranbladder-releaf-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-cranbladder-releaf-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-dailyherbalbitters-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-deep-health-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-deep-sleep-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-deep-sleep-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-deep-sleep-4oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-deep-sleep-softgels-10ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-deep-sleep-softgels-30ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-deep-sleep-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-deep-sleep-softgels-120ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-essiac-tonic-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-essiac-tonic-4oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-essiac-tonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-essiac-tonic-softgels-120ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-hb-pressure-tonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-hb-pressure-tonic-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-hb-pressure-tonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-herbalpm-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-immune-alert-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-immune-alert-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-immunoboost-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-immunoboost-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-ivy-itch-releaf-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-kava_calm-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-kavacalm-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-kidney-tonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-kidney-tonic-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-kidney-tonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-liver-tonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-liver-tonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-loviral-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-loviral-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-lung-tonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-lung-tonic-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-lung-tonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-lung-tonic-softgels-120ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-lymphatonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-lymphatonic-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-lymphatonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-menopautonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-menopautonic-softgels-120ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-mouth-tonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-mullein-garlic-ear-drops-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-parafree-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-parafree-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-peak-defense-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-peak-defense-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-phytocillin-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-phytocillin-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-phytocillin-softgels-120ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-respiratonic-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-respiratonic-2oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-respiratonic-softgels-30ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-respiratonic-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-rocky-mountain-throat-syrup-4oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-rocky-mountain-throat-syrup-8oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-singers-saving-grace-extra-strength-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-singers-saving-grace-honey-lemon-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-singers-saving-grace-lemon-honey-non-alcohol-1oz": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-singers-saving-grace-professional-strength-non-alcohol-1oz": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-smoke-free-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-smoke-free-spray-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-stress-releaf-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-stress-releaf-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-ultimate-ginseng-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-ultimate-ginseng-softgels-30ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-ultimateechinacea-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-vibrant-energy-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-vibrant-energy-softgels-30ct": { verdict: "caution", cause: "moderate", counted: "" },
  "herbs-b283-yeast-releaf-1oz": { verdict: "caution", cause: "limited_1_2", counted: "Alcohol" },
  "herbs-b283-yeast-releaf-softgels-60ct": { verdict: "caution", cause: "moderate", counted: "" },
};

if (ROWS.length !== 88) throw new Error(`batch283 row count ${ROWS.length}`);
for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch283 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch283 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients.filter((item) => ingredientCountsTowardLimitedStack(item)).map((item) => item.name).join('|');
  if (counted !== expected.counted) throw new Error(`batch283 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) throw new Error(`batch283 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch283 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch283 pending ${ingredient.name}`);
    }
  }
}
