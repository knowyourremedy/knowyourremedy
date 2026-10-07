// DRAFT / not verified / batch 151 KYR6-b Flonase, Nasacort, Astepro US OTC.
// A row is written only when that pack's Drug Facts was read and a page
// that opened showed that same spray count for sale. Store-brand
// fluticasone, triamcinolone, and azelastine are not in this file.
// Sensimist is not written: dextrose anhydrous is not a locked token.
// Nasacort is not written: hydrochloric acid is not a locked token.
// Kits and twin packs are not rows.
//
// TALLY: 5 written — Clean 0 / Caution 5 / Avoid 0.
// NEW 1 / REUSE 4. Written-row ungraded tokens: 0.

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
  bkc: 'Methodology §5 Caution (benzalkonium chloride). Standalone Caution. Not Avoid.',
  dextrose: 'Methodology §5 Caution (dextrose → bare glucose). Not Cleared glucose syrup. Not the Avoid driver.',
  pea: 'Methodology §5 Caution (phenylethylalcohol → phenylethyl alcohol, Sept 18). Spelling. Not Avoid.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  edta: 'Methodology §5 Caution (edetate disodium → EDTA). Not Cleared trace disodium EDTA. Not Avoid.',
  sorbitol: 'Methodology §5 Limited (sorbitol). Limited does not stack into Avoid.',
  sucralose: 'Methodology §5 Moderate (sucralose). Not an Avoid driver. No High inactive on this panel.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const FLONASE = 'flonase-b151-propionate';
const FLONASE_SET = 'b6134ba0-b70a-4eac-9a82-cef64b242c1d';
const ASTEPRO = 'astepro-allergy-sucralose';
const ASTEPRO_SET = 'e0640846-19a6-7f79-e053-2995a90a8176';

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

function flonaseFlags(): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(FLONASE_SET, METH.bkc)),
    flag('Dextrose', 'limited', cite(FLONASE_SET, METH.dextrose)),
    flag('Phenylethyl alcohol', 'limited', cite(FLONASE_SET, METH.pea)),
    flag('Polysorbate 80', 'moderate', cite(FLONASE_SET, METH.ps80)),
    cleared(FLONASE_SET, 'Microcrystalline cellulose'),
    cleared(FLONASE_SET, 'Sodium carboxymethylcellulose'),
    cleared(FLONASE_SET, 'Purified water'),
  ];
}

function asteproFlags(): IngredientFlag[] {
  return [
    flag('Sucralose', 'moderate', cite(ASTEPRO_SET, METH.sucralose)),
    flag('Sorbitol', 'limited', cite(ASTEPRO_SET, METH.sorbitol)),
    flag('Benzalkonium chloride', 'limited', cite(ASTEPRO_SET, METH.bkc)),
    flag('Edetate disodium', 'limited', cite(ASTEPRO_SET, METH.edta)),
    cleared(ASTEPRO_SET, 'Hypromellose'),
    cleared(ASTEPRO_SET, 'Sodium citrate'),
    cleared(ASTEPRO_SET, 'Purified water'),
  ];
}

const FLONASE_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers are benzalkonium chloride, dextrose, phenylethyl alcohol, and polysorbate 80. No High inactive, so this is not Avoid. The Drug Facts spelling phenylethylalcohol maps to phenylethyl alcohol. Dextrose maps to bare glucose. Microcrystalline cellulose, sodium carboxymethylcellulose, and purified water are Cleared. Ages 4+. Under 4: do not use. Ages 4–11: 1 spray in each nostril once daily. Ages 12+: 2 sprays in each nostril in week 1. Not Sensimist. Not a store brand.';

const ASTEPRO_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Driver is sucralose. Benzalkonium chloride, edetate disodium, and sorbitol are not Avoid drivers. No High inactive, so this is not Avoid. Hypromellose, sodium citrate, and purified water are Cleared. Ages 6+. Under 6: do not use. Not a store brand.';

const FLONASE_PANEL =
  'DailyMed setid b6134ba0-b70a-4eac-9a82-cef64b242c1d (Haleon, published Dec 23, 2024). Active: fluticasone propionate 50 mcg per spray. Inactive ingredients: benzalkonium chloride, dextrose, microcrystalline cellulose, phenylethylalcohol, polysorbate 80, purified water, sodium carboxymethylcellulose.';

const ASTEPRO_PANEL =
  'DailyMed setid e0640846-19a6-7f79-e053-2995a90a8176 (Bayer, published Dec 5, 2025). Active: azelastine HCl 205.5 mcg per spray. Inactive ingredients: benzalkonium chloride, edetate disodium, hypromellose, purified water, sodium citrate, sorbitol, sucralose.';

type Spec = {
  id: string;
  productName: string;
  brand: 'Flonase' | 'Astepro';
  formulaId: string;
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
    audience: ADULT,
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

const FLONASE_ACTIVE = [{ name: 'Fluticasone propionate', strength: '50 mcg / spray' }];
const ASTEPRO_ACTIVE = [{ name: 'Azelastine HCl', strength: '205.5 mcg / spray' }];

export const BATCH151_KYR6B_NASAL_US_OTC: RatingRecord[] = [
  expand({
    id: 'flonase-b151-allergy-72',
    productName: 'Flonase Allergy Relief (72 sprays)',
    brand: 'Flonase',
    formulaId: FLONASE,
    minAge: 4,
    barcode: '353100228899',
    flags: flonaseFlags(),
    note: FLONASE_NOTE,
    actives: FLONASE_ACTIVE,
    source: `${FLONASE_PANEL} Package NDC 0135-0576-17 is 72 sprays in 1 bottle. https://www.flonase.com/products/flonase-allergy-relief/ lists 72 sprays. Target 72-spray tab (TCIN 79809794, https://www.target.com/p/flonase-allergy-relief-nasal-spray-fluticasone-propionate-0-38-fl-oz/-/A-79809794) primary_barcode 353100228899. Pickup and delivery were offered. The 288-spray tab is the 2-pack and is not this row.`,
  }),
  expand({
    id: 'flonase-b151-allergy-144',
    productName: 'Flonase Allergy Relief (144 sprays)',
    brand: 'Flonase',
    formulaId: FLONASE,
    minAge: 4,
    barcode: '353100229575',
    flags: flonaseFlags(),
    note: FLONASE_NOTE,
    actives: FLONASE_ACTIVE,
    source: `${FLONASE_PANEL} Package NDC 0135-0576-14 is 144 sprays in 1 bottle. The brand page lists 144 sprays. Target 144-spray tab (TCIN 16527277, https://www.target.com/p/flonase-allergy-relief-nasal-spray-fluticasone-propionate-144ct-0-62-fl-oz/-/A-16527277) primary_barcode 353100229575. Pickup, delivery, and shipping were offered. The 2x144 carton is not this row.`,
  }),
  expand({
    id: 'astepro-b151-allergy-60',
    productName: 'Astepro Allergy (60 sprays)',
    brand: 'Astepro',
    formulaId: ASTEPRO,
    minAge: 6,
    barcode: '041100589927',
    flags: asteproFlags(),
    note: ASTEPRO_NOTE,
    actives: ASTEPRO_ACTIVE,
    source: `${ASTEPRO_PANEL} Package NDC 0280-0065-01 is 60 sprays in 1 bottle in 1 carton. Target 60-spray page (TCIN 84855938, https://www.target.com/p/astepro-azelastine-hydrochloride-allergy-steroid-free-antihistamine-nasal-spray-60-metered-sprays/-/A-84855938) primary_barcode 041100589927. The Target drug facts match this inactive line. Pickup and delivery were offered.`,
  }),
  expand({
    id: 'astepro-b151-allergy-120',
    productName: 'Astepro Allergy (120 sprays)',
    brand: 'Astepro',
    formulaId: ASTEPRO,
    minAge: 6,
    barcode: '041100589903',
    flags: asteproFlags(),
    note: ASTEPRO_NOTE,
    actives: ASTEPRO_ACTIVE,
    source: `${ASTEPRO_PANEL} Package NDC 0280-0065-02 is 120 sprays in 1 bottle in 1 carton. Target 120-spray page (TCIN 84855940, https://www.target.com/p/astepro-allergy-azelastine-hydrochloride-steroid-free-antihistamine-nasal-spray-120-metered-sprays/-/A-84855940) primary_barcode 041100589903. Pickup and delivery were offered. The 2x120 and 3x120 cartons are not this row.`,
  }),
  expand({
    id: 'astepro-b151-allergy-200',
    productName: 'Astepro Allergy (200 sprays)',
    brand: 'Astepro',
    formulaId: ASTEPRO,
    minAge: 6,
    flags: asteproFlags(),
    note: ASTEPRO_NOTE,
    actives: ASTEPRO_ACTIVE,
    source: `${ASTEPRO_PANEL} Package NDC 0280-0065-04 is 200 sprays in 1 bottle in 1 carton. https://more4lessoutlet.com/products/astepro-allergy-antihistamine-nasal-spray-200-metered-sprays showed the 200-spray bottle at $29.99 with available true. The Shopify barcode 041100595443 failed the check digit and was not attached. UPC left empty.`,
  }),
];

const ROWS = BATCH151_KYR6B_NASAL_US_OTC;
if (ROWS.length !== 5) throw new Error(`batch151 row count ${ROWS.length}`);
if (new Set(ROWS.map((r) => r.id)).size !== 5) throw new Error('batch151 duplicate id');
if (ROWS.some((r) => r.verdict !== 'caution')) throw new Error('batch151 verdict');
if (ROWS.filter((r) => r.formulaId === FLONASE).length !== 2) throw new Error('batch151 flonase');
if (ROWS.filter((r) => r.formulaId === ASTEPRO).length !== 3) throw new Error('batch151 astepro');
if (ROWS.some((r) => r.inactiveIngredients.length !== 7)) throw new Error('batch151 panel');
const UPC: Record<string, string | undefined> = {
  'flonase-b151-allergy-72': '353100228899',
  'flonase-b151-allergy-144': '353100229575',
  'astepro-b151-allergy-60': '041100589927',
  'astepro-b151-allergy-120': '041100589903',
  'astepro-b151-allergy-200': undefined,
};
for (const row of ROWS) {
  if (row.barcode !== UPC[row.id]) throw new Error(`batch151 upc ${row.id}`);
}
if (ROWS.some((r) => /nasacort|sensimist|store|equate|children/i.test(r.id))) {
  throw new Error('batch151 out of scope id');
}
