// DRAFT / not verified / batch 140 KYR6-b Sprouts held bottles only.
// Deionized water = Cleared and grain alcohol = Caution are on MAIN (Oct 1, 2026).
// previewCatalog lists this array before batch36 so uniqueById (first wins)
// keeps the Parasite Cleanse and Detox grades. Those files were not edited.
// batch70–139 were not edited.
//
// TALLY: 4 rows — Clean 1 / Caution 3 / Avoid 0.
// NEW 2 / REUSE 2 / SKIPPED 0 / REFUSED 0.

import type { CleanAlternative, IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const IMMUNE = 'Immune Support';
const RETAILERS = ['Sprouts'] as const;

const METH = {
  glycerin: 'Methodology §5 Cleared (vegetable glycerin).',
  water: 'Methodology §5 Cleared (deionized water = purified water, Oct 1, 2026). Not electrolyzed water.',
  purified: 'Methodology §5 Cleared (purified water).',
  grain:
    'Methodology §5 Caution (grain alcohol as the extract vehicle, Oct 1, 2026). Limited, not Avoid. 46–56% by volume is the strength of that vehicle, not a new token.',
} as const;

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const CLEAN_LIQUID = alt(
  'sprouts-bronchial-syrup',
  'Independently Clean Sprouts Bronchial Syrup already on main (vegetable glycerin, deionized water, organic honey). Form: syrup — labeled, not a hard filter (§6).',
);
const CLEAN_CAP = alt(
  'sprouts-inflacalm-powder-cap',
  'Independently Clean Sprouts Inflacalm Powder Cap already on main (modified vegetable cellulose). Form: capsule — labeled, not a hard filter (§6).',
);

const PANEL =
  'Founder-read panel on MAIN (PROJECT_NOTES, Oct 1, 2026). Shop PDP UPC field already matched this exact 1 fl oz pack in batch139. DailyMed had no Sprouts SPL.';

export const BATCH140_KYR6B_SPROUTS_HELD_BOTTLES: RatingRecord[] = [
  {
    id: 'sprouts-b140-chlorophyll-glycerite',
    productName: 'Sprouts Chlorophyll Glycerite 1 fl oz',
    brand: 'Sprouts',
    category: VITAMINS,
    barcode: '646670620201',
    formulaId: 'sprouts-b140-chlorophyll-glycerite',
    audience: ADULT,
    minAge: 18,
    form: 'liquid drops',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Chlorophyll (as sodium copper chlorophyllin from mulberry leaf)',
        strength: '50 mg',
      },
    ],
    inactiveIngredients: [
      flag('Vegetable glycerin', 'cleared', METH.glycerin),
      flag('Deionized water', 'cleared', METH.water),
    ],
    verdict: 'clean',
    honestNote:
      'Clean. Other ingredients are vegetable glycerin and deionized water, both Cleared. Sodium copper chlorophyllin is the labeled chlorophyll, not an other ingredient. 1 fl oz. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_LIQUID, CLEAN_CAP],
    sourcesGeneral: [
      `${PANEL} UPC 646670620201. Gallery other ingredients: vegetable glycerin, deionized water.`,
    ],
  },
  {
    id: 'sprouts-b140-garlic-1oz',
    productName: 'Sprouts Garlic 1 fl oz',
    brand: 'Sprouts',
    category: IMMUNE,
    barcode: '646670121401',
    formulaId: 'sprouts-b140-garlic-1oz',
    audience: ADULT,
    minAge: 18,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Organic garlic bulb extract', strength: '988 mg' }],
    inactiveIngredients: [
      flag('Grain alcohol', 'limited', METH.grain),
      flag('Purified water', 'cleared', METH.purified),
    ],
    verdict: 'caution',
    honestNote:
      'Caution. Driver is grain alcohol as the extract vehicle (Limited, not Avoid). Purified water is Cleared. Rev 250315. This is not the garlic capsule or the garlic softgel. 1 fl oz. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_LIQUID, CLEAN_CAP],
    sourcesGeneral: [
      `${PANEL} UPC 646670121401. Other ingredients: grain alcohol, purified water. Organic garlic bulb extract 988 mg. Rev 250315.`,
    ],
  },
  {
    id: 'sprouts-parasite-cleanse-liquid',
    productName: 'Sprouts Parasite Cleanse Liquid',
    brand: 'Sprouts',
    category: DIGESTIVE,
    barcode: '646670631405',
    formulaId: 'sprouts-parasite-cleanse-liquid',
    audience: ADULT,
    minAge: 18,
    form: 'liquid tincture',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Parasite cleanse herbal extract blend', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Grain alcohol (46–56% by volume)', 'limited', METH.grain),
      flag('Deionized water', 'cleared', METH.water),
    ],
    verdict: 'caution',
    honestNote:
      'Caution. Driver is grain alcohol as the extract vehicle (Limited, not Avoid). 46–56% by volume is that vehicle’s strength, not a new token. Deionized water is Cleared. Same row as sprouts-parasite-cleanse-liquid. 1 fl oz. Rev 160404. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_LIQUID, CLEAN_CAP],
    sourcesGeneral: [
      `${PANEL} UPC 646670631405 already on this row. Other ingredients: grain alcohol 46–56% by volume, deionized water. Rev 160404.`,
    ],
  },
  {
    id: 'sprouts-detox-drops',
    productName: 'Sprouts Detox Drops',
    brand: 'Sprouts',
    category: DIGESTIVE,
    barcode: '646670116513',
    formulaId: 'sprouts-detox-drops',
    audience: ADULT,
    minAge: 18,
    form: 'liquid tincture',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Detox herbal extract blend', strength: 'label serving' }],
    inactiveIngredients: [
      flag('Grain alcohol (46–56% by volume)', 'limited', METH.grain),
      flag('Deionized water', 'cleared', METH.water),
    ],
    verdict: 'caution',
    honestNote:
      'Caution. Driver is grain alcohol as the extract vehicle (Limited, not Avoid). 46–56% by volume is that vehicle’s strength, not a new token. Deionized water is Cleared. Same row as sprouts-detox-drops. 1 fl oz. Rev 150702. Draft, not verified.',
    retailers: [...RETAILERS],
    cleanAlternatives: [CLEAN_LIQUID, CLEAN_CAP],
    sourcesGeneral: [
      `${PANEL} UPC 646670116513 already on this row. Other ingredients: grain alcohol 46–56% by volume, deionized water. Rev 150702.`,
    ],
  },
];

function upcCheck(upc: string): boolean {
  if (!/^\d{12}$/.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(upc[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(upc[11]);
}

const ROWS = BATCH140_KYR6B_SPROUTS_HELD_BOTTLES;
if (ROWS.length !== 4) throw new Error('batch140 row count');
if (new Set(ROWS.map((r) => r.id)).size !== 4) throw new Error('batch140 duplicate id');
if (ROWS.some((r) => !r.barcode || !upcCheck(r.barcode))) throw new Error('batch140 bad upc');
const clean = ROWS.filter((r) => r.verdict === 'clean');
const caution = ROWS.filter((r) => r.verdict === 'caution');
if (clean.length !== 1 || caution.length !== 3) throw new Error('batch140 verdict tally');
if (clean.some((r) => r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch140 clean has a flag');
}
if (caution.some((r) => r.inactiveIngredients.some((i) => i.riskLevel === 'high' || i.riskLevel === 'moderate'))) {
  throw new Error('batch140 caution has High or Moderate');
}
if (caution.some((r) => !r.inactiveIngredients.some((i) => i.name.toLowerCase().includes('grain alcohol') && i.riskLevel === 'limited'))) {
  throw new Error('batch140 missing grain alcohol driver');
}
const parasite = ROWS.find((r) => r.id === 'sprouts-parasite-cleanse-liquid');
const detox = ROWS.find((r) => r.id === 'sprouts-detox-drops');
if (!parasite || parasite.barcode !== '646670631405' || parasite.formulaId !== parasite.id) {
  throw new Error('batch140 parasite reuse');
}
if (!detox || detox.barcode !== '646670116513' || detox.formulaId !== detox.id) {
  throw new Error('batch140 detox reuse');
}
if (ROWS.some((r) => r.id.startsWith('sprouts-b140-') && (r.barcode === '646670631405' || r.barcode === '646670116513'))) {
  throw new Error('batch140 second row for an existing code');
}
