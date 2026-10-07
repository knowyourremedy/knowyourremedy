// DRAFT / not verified / batch 152 KYR6-b Nasacort and Flonase Sensimist.
// Written only for packs held on dextrose anhydrous or hydrochloric acid,
// and only where that pack's panel was read and a page that opened showed
// the same spray count for sale. Kits and twin packs are not rows.
// Store-brand fluticasone and triamcinolone are not in this file.
//
// TALLY: 6 written — Clean 0 / Caution 6 / Avoid 0.
// NEW 1 / REUSE 5. Written-row ungraded tokens: 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  bkc: 'Methodology §5 Caution (benzalkonium chloride). Benzalkonium chloride solution is this family. Standalone Caution. Not Avoid.',
  dextrose: 'Methodology §5 Caution (dextrose → bare glucose). Not Cleared glucose syrup. Not the Avoid driver.',
  anhydrous:
    'Methodology §5 Caution (dextrose anhydrous → dextrose / bare glucose, Oct 7, 2026). Same row. Not a new ingredient. Not the Avoid driver.',
  edta: 'Methodology §5 Caution (edetate disodium → EDTA). Not Cleared trace disodium EDTA. Not Avoid.',
  hcl: 'Methodology §5 Caution (hydrochloric acid, Oct 7, 2026). pH adjuster in a finished spray. Not "Not clean". Not the concentrated acid. Not Avoid.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as a pH adjuster).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const NASACORT = 'nasacort-b152-allergy';
const NASACORT_SET = '4bff57a5-cce0-401c-a0fe-23c65c1b7ddc';
const SENSIMIST = 'flonase-sensimist-bkc-ps80';
const SENSIMIST_SET = '107100af-7ca2-44e8-b067-c0ab0a19a6dc';
const CHILD_SET = '893234b5-be82-4425-b850-2b884637b18e';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}
function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', cite(setid, METH.cleared));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const NASAL_ALTS: CleanAlternative[] = [
  alt('xlear-nasal-spray-no-bkc', 'Independently Clean drug-free xylitol saline already on main. Form labeled, not a hard filter (§6).'),
  alt('neilmed-sinus-rinse', 'Independently Clean preservative-free saline rinse already on main. Form labeled, not a hard filter (§6).'),
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
];

function nasacortFlags(): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(NASACORT_SET, METH.bkc)),
    cleared(NASACORT_SET, 'Carboxymethylcellulose sodium'),
    flag('Dextrose', 'limited', cite(NASACORT_SET, METH.dextrose)),
    flag('Edetate disodium', 'limited', cite(NASACORT_SET, METH.edta)),
    flag('Hydrochloric acid', 'limited', cite(NASACORT_SET, METH.hcl)),
    flag('Sodium hydroxide', 'cleared', cite(NASACORT_SET, METH.naoh)),
    cleared(NASACORT_SET, 'Microcrystalline cellulose'),
    flag('Polysorbate 80', 'moderate', cite(NASACORT_SET, METH.ps80)),
    cleared(NASACORT_SET, 'Purified water'),
  ];
}

function sensimistFlags(setid: string): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(setid, METH.bkc)),
    cleared(setid, 'Carboxymethylcellulose sodium'),
    flag('Dextrose anhydrous', 'limited', cite(setid, METH.anhydrous)),
    flag('Edetate disodium', 'limited', cite(setid, METH.edta)),
    cleared(setid, 'Microcrystalline cellulose'),
    flag('Polysorbate 80', 'moderate', cite(setid, METH.ps80)),
    cleared(setid, 'Purified water'),
  ];
}

const NASACORT_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers are benzalkonium chloride, dextrose, edetate disodium, hydrochloric acid, and polysorbate 80. Hydrochloric acid is the finished-spray pH adjuster (Oct 7, 2026), not the concentrated acid and not Avoid. Sodium hydroxide on the same "or" phrase is Cleared. No High inactive, so this is not Avoid. Carboxymethylcellulose sodium, microcrystalline cellulose, and purified water are Cleared. Ages 2+. Under 2: do not use. Not a store brand.';

const SENSIMIST_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers are benzalkonium chloride, dextrose anhydrous, edetate disodium, and polysorbate 80. Dextrose anhydrous is the dextrose / bare glucose row (Oct 7, 2026). Benzalkonium chloride solution is the benzalkonium chloride family. No High inactive, so this is not Avoid. Carboxymethylcellulose sodium, microcrystalline cellulose, and purified water are Cleared. Ages 2+. Under 2: do not use. Not Flonase propionate. Not a store brand.';

const CHILD_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Same drivers as adult Sensimist: benzalkonium chloride, dextrose anhydrous, edetate disodium, and polysorbate 80. The Target drug facts on this carton match that inactive line. DailyMed prints "edentate disodium"; the same label\'s UNII table is edetate disodium. No High inactive, so this is not Avoid. Ages 2+. Under 2: do not use. Separate children\'s carton, not the adult 60-spray bottle. Not a store brand.';

const NASACORT_PANEL =
  'DailyMed setid 4bff57a5-cce0-401c-a0fe-23c65c1b7ddc (Chattem, published Jan 14, 2026). Active: triamcinolone acetonide 55 mcg per spray. Inactive ingredients: benzalkonium chloride, carboxymethylcellulose sodium, dextrose, edetate disodium, hydrochloric acid or sodium hydroxide (for pH adjustment), microcrystalline cellulose, polysorbate 80, purified water.';

const SENSIMIST_PANEL =
  'DailyMed setid 107100af-7ca2-44e8-b067-c0ab0a19a6dc (Haleon, published Dec 23, 2024). Active: fluticasone furoate 27.5 mcg per spray. Inactive ingredients: benzalkonium chloride solution, carboxymethylcellulose sodium, dextrose anhydrous, edetate disodium, microcrystalline cellulose, polysorbate 80, purified water.';

const NASACORT_ACTIVE = [{ name: 'Triamcinolone acetonide', strength: '55 mcg / spray' }];
const SENSIMIST_ACTIVE = [{ name: 'Fluticasone furoate', strength: '27.5 mcg / spray' }];

type Spec = {
  id: string;
  productName: string;
  brand: 'Nasacort' | 'Flonase';
  formulaId: string;
  audience: 'adult' | 'kids';
  minAge: number;
  barcode?: string;
  flags: IngredientFlag[];
  note: string;
  actives: { name: string; strength: string }[];
  source: string;
};

function expand(d: Spec): RatingRecord {
  return {
    id: d.id,
    productName: d.productName,
    brand: d.brand,
    category: ALLERGIES,
    barcode: d.barcode,
    formulaId: d.formulaId,
    audience: d.audience === 'kids' ? KIDS : ADULT,
    minAge: d.minAge,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags,
    verdict: 'caution',
    honestNote: d.note,
    retailers: [...RETAILERS],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [d.source],
  };
}

export const BATCH152_KYR6B_NASACORT_SENSIMIST: RatingRecord[] = [
  expand({
    id: 'nasacort-b152-allergy-30',
    productName: 'Nasacort Allergy 24HR (30 sprays)',
    brand: 'Nasacort',
    formulaId: NASACORT,
    audience: 'adult',
    minAge: 2,
    barcode: '041167580431',
    flags: nasacortFlags(),
    note: NASACORT_NOTE,
    actives: NASACORT_ACTIVE,
    source: `${NASACORT_PANEL} Package NDC 41167-5800-1 is 30 sprays in 1 bottle. Target 0.23 fl oz page (TCIN 95264051, https://www.target.com/p/nasacort-30-nasal-spray-triamcinolone-acetonide-0-23-fl-oz/-/A-95264051) says one 0.23 fl oz bottle (30 sprays). primary_barcode 041167580431. The Target drug facts match this inactive line. Add to cart and pickup were offered.`,
  }),
  expand({
    id: 'nasacort-b152-allergy-60',
    productName: 'Nasacort Allergy 24HR (60 sprays)',
    brand: 'Nasacort',
    formulaId: NASACORT,
    audience: 'adult',
    minAge: 2,
    barcode: '041167580035',
    flags: nasacortFlags(),
    note: NASACORT_NOTE,
    actives: NASACORT_ACTIVE,
    source: `${NASACORT_PANEL} Package NDC 41167-5800-3 is 60 sprays in 1 bottle. The carton panel prints 0.37 fl oz (10.8 ml) 60 sprays. https://www.nasacort.com/en-us/allergy-nasal-spray/ingredients lists 60 sprays. Target 60-spray tab (TCIN 15068149, https://www.target.com/p/nasacort-allergy-relief-spray-triamcinolone-acetonide/-/A-15068149) size "60 Sprays (0.37 fl oz)". primary_barcode 041167580035 is inside that tcin. Add to cart and pickup were offered.`,
  }),
  expand({
    id: 'nasacort-b152-allergy-120',
    productName: 'Nasacort Allergy 24HR (120 sprays)',
    brand: 'Nasacort',
    formulaId: NASACORT,
    audience: 'adult',
    minAge: 2,
    barcode: '041167580059',
    flags: nasacortFlags(),
    note: NASACORT_NOTE,
    actives: NASACORT_ACTIVE,
    source: `${NASACORT_PANEL} Package NDC 41167-5800-5 is 120 sprays in 1 bottle. The carton panel prints 0.57 fl oz (16.9 ml) 120 sprays. The brand page lists 120 sprays. Target 0.57 fl oz tab (TCIN 15068150, https://www.target.com/p/nasacort-allergy-relief-medicine-spray-triamcinolone-acetonide-0-57-fl-oz/-/A-15068150) gallery title is "Nasacort Allergy 24HR Nasal Allergy Spray - 120 Sprays". primary_barcode 041167580059 is inside that tcin. Add to cart and pickup were offered. The 240-spray tab is the 2-pack and is not this row.`,
  }),
  expand({
    id: 'flonase-b152-sensimist-60',
    productName: 'Flonase Sensimist Allergy Relief (60 sprays)',
    brand: 'Flonase',
    formulaId: SENSIMIST,
    audience: 'adult',
    minAge: 2,
    barcode: '353100202158',
    flags: sensimistFlags(SENSIMIST_SET),
    note: SENSIMIST_NOTE,
    actives: SENSIMIST_ACTIVE,
    source: `${SENSIMIST_PANEL} Package NDC 0135-0615-02 is 60 sprays in 1 bottle. https://www.flonase.com/products/sensimist/ lists 60 sprays. Target 60-spray tab (TCIN 51599352, https://www.target.com/p/flonase-sensimist-24-hour-allergy-relief-nasal-spray-fluticasone-furoate-0-2-fl-oz/-/A-51599352) size "60 sprays" selected. primary_barcode 353100202158 is inside that tcin. The Target drug facts match this inactive line. Add to cart and pickup were offered.`,
  }),
  expand({
    id: 'flonase-b152-sensimist-120',
    productName: 'Flonase Sensimist Allergy Relief (120 sprays)',
    brand: 'Flonase',
    formulaId: SENSIMIST,
    audience: 'adult',
    minAge: 2,
    barcode: '353100202257',
    flags: sensimistFlags(SENSIMIST_SET),
    note: SENSIMIST_NOTE,
    actives: SENSIMIST_ACTIVE,
    source: `${SENSIMIST_PANEL} Package NDC 0135-0615-03 is 120 sprays in 1 bottle. The brand page lists 120 sprays. Target 0.31 fl oz page (TCIN 51599564, https://www.target.com/p/flonase-sensimist-24-hour-allergy-relief-nasal-spray-fluticasone-furoate-0-31-fl-oz/-/A-51599564) shows 120 sprays, including the carton image text "120 SPRAYS". primary_barcode 353100202257 is inside that tcin. Add to cart and pickup were offered. The 240-spray tab is the 2-pack and is not this row.`,
  }),
  expand({
    id: 'flonase-b152-sensimist-child-60',
    productName: "Children's Flonase Sensimist Allergy Relief (60 sprays)",
    brand: 'Flonase',
    formulaId: SENSIMIST,
    audience: 'kids',
    minAge: 2,
    barcode: '353100202301',
    flags: sensimistFlags(CHILD_SET),
    note: CHILD_NOTE,
    actives: SENSIMIST_ACTIVE,
    source: `DailyMed setid ${CHILD_SET} (Haleon, published Mar 5, 2024). Carton NDC 0135-0616-01 prints CHILDREN'S FLONASE SENSIMIST, 60 metered sprays, 0.20 fl oz. Inactive line on that label: benzalkonium chloride, carboxymethylcellulose sodium, dextrose anhydrous, edentate disodium, microcrystalline cellulose, polysorbate 80, purified water. The ingredients table on the same label is EDETATE DISODIUM (UNII 7FLD91C86K). https://www.flonase.com/products/childrens-sensimist/ lists 60 sprays, ages 2+. Target (TCIN 52455605, https://www.target.com/p/children-s-flonase-sensimist-allergy-relief-nasal-spray-fluticasone-furoate-0-2-fl-oz/-/A-52455605) says one 60-spray bottle and prints Benzalkonium Chloride Solution, Carboxymethylcellulose Sodium, Dextrose Anhydrous, Edetate Disodium, Microcrystalline Cellulose, Polysorbate 80, Purified Water. primary_barcode 353100202301. Add to cart and pickup were offered. Not the adult 60-spray UPC.`,
  }),
];

const ROWS = BATCH152_KYR6B_NASACORT_SENSIMIST;
if (ROWS.length !== 6) throw new Error(`batch152 row count ${ROWS.length}`);
if (new Set(ROWS.map((r) => r.id)).size !== 6) throw new Error('batch152 duplicate id');
if (ROWS.some((r) => r.verdict !== 'caution')) throw new Error('batch152 verdict');
if (ROWS.filter((r) => r.formulaId === NASACORT).length !== 3) throw new Error('batch152 nasacort');
if (ROWS.filter((r) => r.formulaId === SENSIMIST).length !== 3) throw new Error('batch152 sensimist');
if (ROWS.filter((r) => r.brand === 'Nasacort').some((r) => r.inactiveIngredients.length !== 9)) {
  throw new Error('batch152 nasacort panel');
}
if (ROWS.filter((r) => r.brand === 'Flonase').some((r) => r.inactiveIngredients.length !== 7)) {
  throw new Error('batch152 sensimist panel');
}
const UPC: Record<string, string | undefined> = {
  'nasacort-b152-allergy-30': '041167580431',
  'nasacort-b152-allergy-60': '041167580035',
  'nasacort-b152-allergy-120': '041167580059',
  'flonase-b152-sensimist-60': '353100202158',
  'flonase-b152-sensimist-120': '353100202257',
  'flonase-b152-sensimist-child-60': '353100202301',
};
for (const row of ROWS) {
  if (row.barcode !== UPC[row.id]) throw new Error(`batch152 upc ${row.id}`);
}
if (ROWS.some((r) => /store|equate|kit|2pk|twin/i.test(r.id))) {
  throw new Error('batch152 out of scope id');
}
