// DRAFT / not verified / batch 168 KYR6-c Beekeeper's Nasal Spray Max.
// US only. The 1 fl oz panel was read and a page that opened showed that
// bottle for sale. The four tokens this pack was held for are now stamped.
// Lollipops and Gas Drops are not this file.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const ALLERGIES = 'Allergies';

const METH = {
  citric: 'Methodology §5 Cleared (citric acid).',
  eucalyptus: 'Methodology §5 Caution (eucalyptus globulus leaf extract). Leaf extract, not the parked eucalyptus oil.',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  lysine: 'Methodology §5 Cleared (poly-epsilon lysine). Fermentation preservative. Harm studies are clean. Not Usable.',
  nisin: 'Methodology §5 Caution (nisin). Food preservative. EFSA intake stays under the limit. Not Not clean.',
  oregano: 'Methodology §5 Caution (origanum vulgare leaf extract). Leaf extract, not the oil.',
  salt: 'Methodology §5 Cleared (sodium chloride, saline base).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xylitol: 'Methodology §5 Cleared (xylitol, topical/nasal).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const NASAL_ALTS: CleanAlternative[] = [
  alt(
    'xlear-nasal-spray-no-bkc',
    'Independently Clean saline nasal spray already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'neilmed-sinus-rinse',
    'Independently Clean saline rinse packets already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
];

const PANEL = "Vitacost Beekeeper's Naturals Saline Nasal Spray Max 1 fl oz panel";

export const BATCH168_KYR6C_NASAL_MAX: RatingRecord[] = [
  {
    id: 'beekeepers-b168-nasal-max',
    productName: "Beekeeper's Naturals Nasal Spray Max (1 fl oz)",
    brand: "Beekeeper's Naturals",
    category: ALLERGIES,
    barcode: '834706000336',
    formulaId: 'beekeepers-b168-nasal-max',
    audience: ADULT,
    minAge: 18,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    productSubtype: 'herbal',
    activeIngredients: [{ name: 'Propolis extract', strength: 'nasal spray' }],
    inactiveIngredients: [
      flag(PANEL, 'Water', 'cleared', METH.water),
      flag(PANEL, 'Sodium chloride', 'cleared', METH.salt),
      flag(PANEL, 'Xylitol', 'cleared', METH.xylitol),
      flag(PANEL, 'Vegetable glycerin', 'cleared', METH.glycerin),
      flag(PANEL, 'Eucalyptus globulus leaf extract', 'limited', METH.eucalyptus),
      flag(PANEL, 'Origanum vulgare leaf extract', 'limited', METH.oregano),
      flag(PANEL, 'Citric acid', 'cleared', METH.citric),
      flag(PANEL, 'Poly-epsilon lysine', 'cleared', METH.lysine),
      flag(PANEL, 'Nisin', 'limited', METH.nisin),
    ],
    verdict: 'avoid',
    retailers: ['Vitacost'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      "Vitacost opened Beekeeper's Naturals Saline Nasal Spray Max, 1 fl oz (30 ml), at $14.41, best by 01/01/2028, UPC 834706000336. Ingredients on that page: saline solution (water and sodium chloride), xylitol, vegetable glycerin, propolis extract, eucalyptus globulus leaf extract, (oregano) origanum vulgare leaf extract, citric acid, poly-epsilon lysine, nisin. The brand product record lists that same barcode on Nasal Spray Max, 30 mL (1.0 fl oz), and shows it available at $13.99. The brand ingredients block says saline solution, xylitol, propolis extract, eucalyptus, oregano, citric acid, poly-epsilon lysine, and nisin, and the page calls the herbs oregano oil and eucalyptus, so that shorter line was not used. Curated Wellness opened Nasal Spray Plus, 1 fl oz, in stock at $13.99, with the leaf extracts and without vegetable glycerin. This row follows the Vitacost 1 fl oz line that prints the barcode. The adult nasal spray code 834706000213 was not copied here. A multi-pack is not a row.",
    ],
  },
];

const ROWS = BATCH168_KYR6C_NASAL_MAX;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch168 row count ${ROWS.length}`);

const record = ROWS[0];
if (record.id !== 'beekeepers-b168-nasal-max') throw new Error('batch168 id');
if (record.barcode !== '834706000336' || !upcOk(record.barcode)) throw new Error('batch168 upc');
if (record.formulaId !== 'beekeepers-b168-nasal-max') throw new Error('batch168 formula');
if (record.minAge !== 18) throw new Error('batch168 age');
if (record.honestNote) throw new Error('batch168 note');
if (/dailymed/i.test((record.sourcesGeneral ?? []).join(' '))) throw new Error('batch168 dailymed source');
for (const ingredient of record.inactiveIngredients) {
  if (!plainIngredientWhy(ingredient)) throw new Error(`batch168 blank why ${ingredient.name}`);
  if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch168 dailymed ${ingredient.name}`);
}
