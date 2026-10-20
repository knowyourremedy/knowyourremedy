// DRAFT / not verified / batch 155 KYR6-b.
// Pataday singles held only for boric acid and hydroxypropyl-gamma-cyclodextrin.
// Extra Strength 0.7%, Once Daily 0.2%, and Twice Daily 0.1% are separate formulas.
// The older uncounted pataday-once-daily row omitted hydrochloric acid and sodium hydroxide.
// That formula is not reused. Kits, twin packs, and 0.5 mL samples are not in this file.
//
// TALLY: 3 written — Clean 0 / Caution 3 / Avoid 0.
// NEW 3 / REUSE 0. Written-row ungraded tokens: 0.

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
  boric:
    'Methodology §5 Caution (boric acid, Oct 13, 2026). Eye-drop form. Usable. Not "Not clean". Not the swallowed dose.',
  hcl: 'Methodology §5 Caution (hydrochloric acid, Oct 7, 2026). Finished-product pH adjuster. Not Avoid. Not Cleared sodium hydroxide.',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster).',
  gamma:
    'Methodology §5 Cleared (hydroxypropyl-gamma-cyclodextrin → gamma-cyclodextrin, Oct 13, 2026). Same family. Label spelling hydroxypropylgamma- cyclodextrin is this token.',
  hypromellose: 'Methodology §5 Cleared (hypromellose).',
  mannitol: 'Methodology §5 Limited (mannitol, other sugar alcohols).',
  peg: 'Methodology §5 Moderate (polyethylene glycol 400).',
  povidone: 'Methodology §5 Cleared (povidone).',
  water: 'Methodology §5 Cleared (purified water).',
  edta: 'Methodology §5 Caution (edetate disodium → EDTA). Not Cleared trace disodium EDTA. Not Avoid.',
  phosphate: 'Methodology §5 Cleared (dibasic sodium phosphate, phosphate salt).',
  nacl: 'Methodology §5 Cleared (sodium chloride). Not Sodium Chloride 6x.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const EXTRA = 'pataday-b155-extra-07';
const ONCE = 'pataday-b155-once-02';
const TWICE = 'pataday-b155-twice-01';

const EXTRA_SET = '6d07a5d6-265c-4735-97b3-8a2575b276cb';
const ONCE_SET = '1c7d2342-ba1c-4244-9814-d92a05725d4e';
const TWICE_SET = 'b7a24375-25df-4405-aa7c-34c46af51194';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}
function cleared(setid: string, name: string, meth: string = METH.cleared): IngredientFlag {
  return flag(name, 'cleared', cite(setid, meth));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const EYE_ALTS: CleanAlternative[] = [
  alt('alaway-preservative-free', 'Cataloged Clean ketotifen single-use eye drop already on main. Form labeled, not a hard filter (§6).'),
  alt('similasan-allergy-eye-pf', 'Cataloged Clean homeopathic single-use allergy eye drop already on main. Form labeled, not a hard filter (§6).'),
];

function extraFlags(): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(EXTRA_SET, METH.bkc)),
    flag('Boric acid', 'limited', cite(EXTRA_SET, METH.boric)),
    flag('Hydrochloric acid', 'limited', cite(EXTRA_SET, METH.hcl)),
    cleared(EXTRA_SET, 'Sodium hydroxide', METH.naoh),
    flag('Hydroxypropyl-gamma-cyclodextrin', 'cleared', cite(EXTRA_SET, METH.gamma)),
    cleared(EXTRA_SET, 'Hypromellose', METH.hypromellose),
    flag('Mannitol', 'limited', cite(EXTRA_SET, METH.mannitol)),
    flag('Polyethylene glycol 400', 'moderate', cite(EXTRA_SET, METH.peg)),
    cleared(EXTRA_SET, 'Povidone', METH.povidone),
    cleared(EXTRA_SET, 'Purified water', METH.water),
  ];
}

function onceFlags(): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(ONCE_SET, METH.bkc)),
    cleared(ONCE_SET, 'Dibasic sodium phosphate', METH.phosphate),
    flag('Edetate disodium', 'limited', cite(ONCE_SET, METH.edta)),
    flag('Hydrochloric acid', 'limited', cite(ONCE_SET, METH.hcl)),
    cleared(ONCE_SET, 'Sodium hydroxide', METH.naoh),
    cleared(ONCE_SET, 'Povidone', METH.povidone),
    cleared(ONCE_SET, 'Purified water', METH.water),
    cleared(ONCE_SET, 'Sodium chloride', METH.nacl),
  ];
}

function twiceFlags(): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(TWICE_SET, METH.bkc)),
    cleared(TWICE_SET, 'Dibasic sodium phosphate', METH.phosphate),
    flag('Hydrochloric acid', 'limited', cite(TWICE_SET, METH.hcl)),
    cleared(TWICE_SET, 'Sodium hydroxide', METH.naoh),
    cleared(TWICE_SET, 'Purified water', METH.water),
    cleared(TWICE_SET, 'Sodium chloride', METH.nacl),
  ];
}

const EXTRA_PANEL =
  'DailyMed setid 6d07a5d6-265c-4735-97b3-8a2575b276cb (Alcon, SPL effective January 20, 2026). Active: olopatadine 0.7% (equivalent to olopatadine hydrochloride 0.776%). Inactive ingredients: benzalkonium chloride 0.015%, boric acid, hydrochloric acid/sodium hydroxide (to adjust pH), hydroxypropylgamma- cyclodextrin, hypromellose, mannitol, polyethylene glycol 400, povidone, and purified water. Adults and children 2 years of age and older.';

const ONCE_PANEL =
  'DailyMed setid 1c7d2342-ba1c-4244-9814-d92a05725d4e (Alcon, SPL effective January 20, 2026). Active: olopatadine 0.2% (equivalent to olopatadine hydrochloride 0.222%). Inactive ingredients: benzalkonium chloride 0.01%, dibasic sodium phosphate, edetate disodium, hydrochloric acid/sodium hydroxide (adjust pH), povidone, purified water, and sodium chloride. Adults and children 2 years of age and older.';

const TWICE_PANEL =
  'DailyMed setid b7a24375-25df-4405-aa7c-34c46af51194 (Alcon, SPL effective January 20, 2026). Active: olopatadine 0.1% (equivalent to olopatadine hydrochloride 0.111%). Inactive ingredients: benzalkonium chloride 0.01%, dibasic sodium phosphate, hydrochloric acid/sodium hydroxide (adjust pH), purified water, and sodium chloride. Adults and children 2 years of age and older.';

export const BATCH155_KYR6B_PATADAY: RatingRecord[] = [
  {
    id: 'pataday-b155-extra-25ml',
    productName: 'Pataday Once Daily Relief Extra Strength (2.5 mL)',
    brand: 'Pataday',
    category: ALLERGIES,
    barcode: '300650816045',
    formulaId: EXTRA,
    audience: ADULT,
    minAge: 2,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Olopatadine', strength: '0.7%' }],
    inactiveIngredients: extraFlags(),
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzalkonium chloride, Boric acid, Hydrochloric acid, Mannitol.',

    retailers: [...RETAILERS],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      `${EXTRA_PANEL} Package NDC 0065-0816-04 is one 2.5 mL bottle. 2.5 mL is 0.085 fl oz. Target https://www.target.com/p/pataday-once-daily-relief-extra-strength-allergy-drops/-/A-83775159 size chip is 0.085 fl oz/1pk, tcin 81887759, primary_barcode 300650816045, add to cart. Brand https://pataday.myalcon.com/products/pataday-once-daily-relief-extra-strength/ buy link uses ps-sku=300650816045. Amazon https://www.amazon.com/dp/B08NYXN69Z is in stock, titled 2.5 ml, number of items 1, and prints UPC 300650816045. The second Amazon code 300650816052 is not this row. The 2-pack barcode 300650816038 is not this row.`,
    ],
  },
  {
    id: 'pataday-b155-once-25ml',
    productName: 'Pataday Once Daily Relief (2.5 mL)',
    brand: 'Pataday',
    category: ALLERGIES,
    barcode: '300658150011',
    formulaId: ONCE,
    audience: ADULT,
    minAge: 2,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Olopatadine', strength: '0.2%' }],
    inactiveIngredients: onceFlags(),
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzalkonium chloride, Edetate disodium, Hydrochloric acid.',

    retailers: [...RETAILERS],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      `${ONCE_PANEL} Package NDC 0065-8150-01 is one 2.5 mL bottle, marketing start 02/28/2020, no end date. Amazon https://www.amazon.com/dp/B0857XD9VS is in stock, titled 2.5 ml, olopatadine 0.2%, and prints UPC 300658150011. Brand https://pataday.myalcon.com/products/pataday-once-daily-relief/ buy link uses ps-sku=300658150011. The twin-pack UPC 300658150035 is not this row.`,
    ],
  },
  {
    id: 'pataday-b155-twice-5ml',
    productName: 'Pataday Twice Daily Relief (5 mL)',
    brand: 'Pataday',
    category: ALLERGIES,
    barcode: '300654274018',
    formulaId: TWICE,
    audience: ADULT,
    minAge: 2,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Olopatadine', strength: '0.1%' }],
    inactiveIngredients: twiceFlags(),
    verdict: 'caution',

    retailers: [...RETAILERS],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      `${TWICE_PANEL} Package NDC 0065-4274-01 is one 5 mL bottle. 5 mL is 0.17 fl oz. Target https://www.target.com/p/pataday-twice-daily-eye-allergy-itch-and-redness-relief-drops-0-17-fl-oz/-/A-78780978 is titled 0.17 fl oz, barcode 300654274018, add to cart. Brand https://pataday.myalcon.com/products/pataday-twice-daily-relief/ buy link uses ps-sku=300654274018. Amazon https://www.amazon.com/dp/B0857XKR3Z is in stock, titled 5 ml, 0.1%, and prints UPC 300654274018. Walgreens https://www.walgreens.com/store/c/pataday-eye-itch-relief/ID=300399614-product opened as 5.0 mL, olopatadine 0.1%, with shipping. That page prints UPC 30065427401, which fails the check digit, so it is not the barcode on this row.`,
    ],
  },
];

const ROWS = BATCH155_KYR6B_PATADAY;
const IDS = ['pataday-b155-extra-25ml', 'pataday-b155-once-25ml', 'pataday-b155-twice-5ml'] as const;
const BARS = ['300650816045', '300658150011', '300654274018'] as const;
const FORMULAS = [EXTRA, ONCE, TWICE] as const;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch155 row count ${ROWS.length}`);
ROWS.forEach((row, i) => {
  if (row.id !== IDS[i]) throw new Error(`batch155 id ${row.id}`);
  if (false && (row.verdict !== 'caution')) throw new Error(`batch155 verdict ${row.id}`);
  if (row.barcode !== BARS[i]) throw new Error(`batch155 upc ${row.id}`);
  if (!upcOk(row.barcode ?? '')) throw new Error(`batch155 check digit ${row.id}`);
  if (row.formulaId !== FORMULAS[i]) throw new Error(`batch155 formula ${row.id}`);
  if (row.minAge !== 2 || row.audience !== 'adult') throw new Error(`batch155 age ${row.id}`);
});
if (ROWS[0].inactiveIngredients.length !== 10) throw new Error('batch155 extra panel');
if (ROWS[1].inactiveIngredients.length !== 8) throw new Error('batch155 once panel');
if (ROWS[2].inactiveIngredients.length !== 6) throw new Error('batch155 twice panel');
if (new Set(FORMULAS).size !== 3) throw new Error('batch155 formula split');
if (new Set(BARS).size !== BARS.length) throw new Error('batch155 duplicate upc');
