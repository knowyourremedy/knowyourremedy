// DRAFT / not verified / batch 153 KYR6-b Flonase Sensimist 72 sprays.
// Written only because the adult Sensimist panel was read and a page that
// opened showed this same count for sale. The 30-spray, children's 72-spray,
// and children's Nasacort 60-spray counts are not in this file.
// Store-brand fluticasone is not in this file.
//
// TALLY: 1 written — Clean 0 / Caution 1 / Avoid 0.
// NEW 0 / REUSE 1. Written-row ungraded tokens: 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  bkc: 'Methodology §5 Caution (benzalkonium chloride). Benzalkonium chloride solution is this family. Standalone Caution. Not Avoid.',
  anhydrous:
    'Methodology §5 Caution (dextrose anhydrous → dextrose / bare glucose, Oct 7, 2026). Same row. Not a new ingredient. Not the Avoid driver.',
  edta: 'Methodology §5 Caution (edetate disodium → EDTA). Not Cleared trace disodium EDTA. Not Avoid.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const SENSIMIST = 'flonase-sensimist-bkc-ps80';
const SENSIMIST_SET = '107100af-7ca2-44e8-b067-c0ab0a19a6dc';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(meth: string): string {
  return `DailyMed setid ${SENSIMIST_SET}; ${meth}`;
}
function cleared(name: string): IngredientFlag {
  return flag(name, 'cleared', cite(METH.cleared));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const NASAL_ALTS: CleanAlternative[] = [
  alt('xlear-nasal-spray-no-bkc', 'Independently Clean drug-free xylitol saline already on main. Form labeled, not a hard filter (§6).'),
  alt('neilmed-sinus-rinse', 'Independently Clean preservative-free saline rinse already on main. Form labeled, not a hard filter (§6).'),
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
];

const SENSIMIST_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers are benzalkonium chloride, dextrose anhydrous, edetate disodium, and polysorbate 80. Dextrose anhydrous is the dextrose / bare glucose row (Oct 7, 2026). Benzalkonium chloride solution is the benzalkonium chloride family. No High inactive, so this is not Avoid. Carboxymethylcellulose sodium, microcrystalline cellulose, and purified water are Cleared. Ages 2+. Under 2: do not use. Not Flonase propionate. Not a store brand.';

export const BATCH153_KYR6B_SENSIMIST_72: RatingRecord[] = [
  {
    id: 'flonase-b153-sensimist-72',
    productName: 'Flonase Sensimist Allergy Relief (72 sprays)',
    brand: 'Flonase',
    category: ALLERGIES,
    formulaId: SENSIMIST,
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Fluticasone furoate', strength: '27.5 mcg / spray' }],
    inactiveIngredients: [
      flag('Benzalkonium chloride', 'limited', cite(METH.bkc)),
      cleared('Carboxymethylcellulose sodium'),
      flag('Dextrose anhydrous', 'limited', cite(METH.anhydrous)),
      flag('Edetate disodium', 'limited', cite(METH.edta)),
      cleared('Microcrystalline cellulose'),
      flag('Polysorbate 80', 'moderate', cite(METH.ps80)),
      cleared('Purified water'),
    ],
    verdict: 'caution',
    honestNote: SENSIMIST_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 107100af-7ca2-44e8-b067-c0ab0a19a6dc (Haleon, published Dec 23, 2024). Active: fluticasone furoate 27.5 mcg per spray. Inactive ingredients: benzalkonium chloride solution, carboxymethylcellulose sodium, dextrose anhydrous, edetate disodium, microcrystalline cellulose, polysorbate 80, purified water. Package NDC 0135-0615-06 is 72 sprays in 1 bottle, marketing start 01/22/2019, no end date. The image gallery on that label shows the 120-spray carton only. https://www.flonase.com/products/sensimist/ lists 60 or 120 sprays, not 72. Target size chips on https://www.target.com/p/flonase-sensimist-24-hour-allergy-relief-nasal-spray-fluticasone-furoate/-/A-80354264 are 60, 120, and 240 sprays. Instacart CVS listing https://www.instacart.com/products/20515600-flonase-non-drowsy-allergy-relief-spray-72-ct?retailerSlug=cvs is in stock at $19.99. The carton photo on that page reads FLONASE SENSIMIST ALLERGY RELIEF, 72 METERED SPRAYS, 0.22 fl oz (6.4 mL), fluticasone furoate 27.5 mcg, NDC 0135-0615-06. Barcode digits on that photo were not readable, so this row has no UPC. Not the 60-spray or 120-spray code.',
    ],
  },
];

const ROWS = BATCH153_KYR6B_SENSIMIST_72;
if (ROWS.length !== 1) throw new Error(`batch153 row count ${ROWS.length}`);
if (ROWS[0].id !== 'flonase-b153-sensimist-72') throw new Error('batch153 id');
if (ROWS[0].verdict !== 'caution') throw new Error('batch153 verdict');
if (ROWS[0].formulaId !== SENSIMIST) throw new Error('batch153 formula');
if (ROWS[0].inactiveIngredients.length !== 7) throw new Error('batch153 panel');
if (ROWS[0].barcode !== undefined) throw new Error('batch153 upc');
if (/store|equate|kit|2pk|twin/i.test(ROWS[0].id)) throw new Error('batch153 out of scope id');
