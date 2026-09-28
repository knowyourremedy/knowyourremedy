// DRAFT / not verified / batch 131 KYR6-b Solaray last two pinned packs.
// Founder-pinned panels only. Mapped onto families already on MAIN.
// The 4 mg astaxanthin panel (SKU 076280325966) was not copied.
// 140ct was not written for UPC 076280008074. batch70-batch130 were not edited.
//
// TALLY: 2 rows — Clean 1 / Caution 1 / Avoid 0.
// NEW 2 / REUSE 0 / SKIPPED no_OI leftover 1 / SKIPPED OUT 0 / REFUSED 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';
const BRAND = 'Solaray';
const RETAILERS = ['Amazon', 'solaray.com'] as const;
const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  riceBranOil:
    'Methodology §5 Cleared (rice bran oil as softgel/capsule fill). NOT gummy High. NOT organic rice bran extract.',
  gelatin: 'Methodology §5 Cleared (gelatin / gelatin capsule). Softgel (Gelatin and Glycerin) splits here.',
  glycerin: 'Methodology §5 Cleared (glycerin). Softgel (Gelatin and Glycerin) splits here.',
  carob:
    'Methodology §5 Caution (carob extract). Plain Carob inside Gelatin Softgel (Gelatin, Glycerin, Carob) is this row, not powder-as-food (Sept 28, 2026).',
  ascorbic: 'Methodology §5 Cleared (ascorbic acid).',
  flavor:
    'Methodology §5 Caution (named flavor). Natural Flavor maps here. Exact “Natural flavors” opacity stays Limited and is not flipped.',
  oilfill:
    'Methodology §5 Cleared (soybean oil / soy oil as non-gummy softgel fill). Highly refined soy oil is this family. Gummy and lozenge soybean oil stay High.',
} as const;

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}
function row(opts: Omit<RatingRecord, 'recordStatus'> & { recordStatus?: RatingRecord['recordStatus'] }): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}
type Compact = {
  id: string;
  productName: string;
  formulaId: string;
  form: string;
  barcode: string;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
};
function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    alts.push(alt('amazon-elements-vitamin-d3-5000-softgels', 'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).'));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: 'Vitamins',
    formulaId: d.formulaId,
    barcode: d.barcode,
    audience: ADULT,
    minAge: 18,
    form: d.form,
    productType: SUPPLEMENT,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) => flag(n, risk, labelCite(d.cite, METH[meth]))),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults. No dosing or medical advice. Draft, not verified.`,
    retailers: [...RETAILERS],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const COMPACT: Compact[] = [
  {
    id: 'solaray-b131-076280041026',
    productName: 'Solaray Astaxanthin 1mg (60ct)',
    formulaId: 'solaray-b131-076280041026',
    form: 'softgel',
    barcode: '076280041026',
    actives: [
      { name: 'Astaxanthin (from Haematococcus pluvialis extract)', strength: '1 mg' },
    ],
    flags: [
      ['Rice Bran Oil', 'cleared', 'riceBranOil'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Rice Bran Oil is softgel fill Cleared. Softgel (Gelatin and Glycerin) splits to gelatin Cleared and glycerin Cleared. No Limited or High flag. The 4 mg SKU 076280325966 panel was not copied.',
    cite: 'vitanetonline.com exact-UPC listing https://vitanetonline.com/description/4102/vitamins/Astaxanthin/ opened capture https://web.archive.org/web/20260420095436/https://vitanetonline.com/description/4102/vitamins/Astaxanthin/ UPC 076280041026, Astaxanthin 60ct 1mg. other-ingredients: Rice Bran Oil, Softgel (Gelatin and Glycerin). Exact pack Solaray Astaxanthin 1mg (60ct). The live URL on 2026-09-28 served a different product, so the citation is that opened capture of the same URL.',
  },
  {
    id: 'solaray-b131-076280008074',
    productName: 'Solaray Flaxseed Oil 1000mg (240ct)',
    formulaId: 'solaray-b131-076280008074',
    form: 'softgel',
    barcode: '076280008074',
    actives: [
      { name: 'Organic Flaxseed Oil', strength: '3 g' },
    ],
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Carob', 'limited', 'carob'],
      ['Ascorbic Acid', 'cleared', 'ascorbic'],
      ['Natural Flavor', 'limited', 'flavor'],
      ['Highly Refined Soy Oil', 'cleared', 'oilfill'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver families: Carob, Natural Flavor. Duralox splits to ascorbic acid Cleared, natural flavor Caution, and highly refined soy oil as non-gummy soybean-oil fill Cleared. Count is 240ct. 140ct was not written. No High.',
    cite: 'vitanetonline.com opened listing https://vitanetonline.com/description/807/vitamins/Flaxseed-Oil-1000mg/ UPC 076280008074, Flaxseed Oil 1000mg 240ct. other-ingredients: Gelatin Softgel (Gelatin, Glycerin, Carob), Duralox Proprietary Blend (Ascorbic Acid, Natural Flavor and Highly Refined Soy Oil). Exact pack Solaray Flaxseed Oil 1000mg (240ct).',
  },
];

export const BATCH131_KYR6B_SOLARAY_LAST_TWO_PINNED: RatingRecord[] = COMPACT.map(expand);

export const BATCH131_SKIPPED_NO_OI: { sku: string; name: string; count: string; why: string }[] = [
  {
    sku: '076280830385',
    name: 'Liposomal Multivitamin Universal',
    count: '60ct',
    why: 'Retailer panels conflict and none print this SKU with its own Other Ingredients line. solaray.com facts tiles are named 076280640168. That panel was not copied. Stays no_OI.',
  },
];

export const BATCH131_SKIPPED_OUT: { sku: string; name: string; why: string }[] = [];

export const BATCH131_REFUSED: { sku: string; name: string; token: string }[] = [];

export const BATCH131_LEFTOVER_REAL_TOKENS: string[] = [];
