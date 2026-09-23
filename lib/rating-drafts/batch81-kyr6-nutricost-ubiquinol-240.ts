// DRAFT / not verified / batch 81 KYR6 Nutricost Ubiquinol 240-count only.
// Methodology v1.6 + MAIN §5 after the Sept 23, 2026 founder split
// (e5ed602). Harm-first. No invented grades. No invented OI.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Nutricost Ubiquinol Softgels 240-count tab only. The count
// batch80 refused on the exact string `annatto suspension in sunflower oil`.
// batch76–80 were not edited. The 120-count tab stays the batch80 row.
// No NatureWise / WELMATE / A+Health / HealthA2Z / TIME-Cap / GoodSense.
// No toothpaste. No house Amazon. No Sprouts. No graded oil pour bottles.
// Leftover Amazon 3P stays N=6. no_OI leftover stays 79. OUT 135 stays dead.
// Gummy sunflower oil and gummy vegetable oil stay Avoid.
//
// Pin = current nutricost.com 240-count supplement-facts image, re-read
// this pass (NTC_Ubiquinol_100MG_240SFG_500CC_SFP_Square.jpg).
// Printed other ingredients:
// MCT oil (medium chain triglycerides), gelatin, glycerine, ascorbyl
// palmitate, purified water, beeswax, sunflower lecithin, annatto
// suspension in sunflower oil.
// That last clause is not a new token. Founder split (Sept 23, 2026):
// annatto half → existing annatto / annatto extract (for color) Caution;
// sunflower-oil half → existing non-gummy softgel fill Cleared.
// The 120-count list is not identical (it prints sunflower oil and
// annatto extract (for color) as two tokens), so this row is NEW.
// recordStatus is 'unverified'. Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// TALLY (unverified drafts in THIS file): 1 row —
// Clean 0 / Caution 1 / Avoid 0.
// NEW 1 / REUSE-formula 0 / SKIPPED 0 / REFUSED 0.
// Search grade: Caution.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'Nutricost';
const AMAZON = ['Amazon', 'nutricost.com'] as const;
const CDN = 'https://cdn.shopify.com/s/files/1/0222/4128/0074/files/';
const UBI_120 = 'nutricost-b80-ubiquinol-120-softgels';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PRINTED_OI =
  'MCT oil (medium chain triglycerides), gelatin, glycerine, ascorbyl palmitate, purified water, beeswax, sunflower lecithin, annatto suspension in sunflower oil';

const METH = {
  annatto:
    'Methodology §5 Caution (annatto / annatto extract (for color) — same Caution row; locked Sept 22, 2026). The annatto half of the printed clause annatto suspension in sunflower oil sits on this row (Sept 23, 2026). Not a new combined token. Not Avoid.',
  ascorbyl:
    'Methodology §5 Cleared (ascorbyl palmitate / mixed tocopherols as antioxidants). Distinct from Caution tocopheryl acetate.',
  beeswax: 'Methodology §5 Cleared (beeswax / yellow beeswax).',
  gelatin: 'Methodology §5 Cleared (gelatin / gelatin capsule).',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin). Also written glycerol (Sept 22, 2026). Label spelling glycerine is this same Cleared row. Distinct from Glycerol Monostearate / GMS.',
  lecithin:
    'Methodology §5 Cleared (lecithin — soy / sunflower). Sunflower lecithin sits on this same row (Sept 22, 2026). Sunflower lecithin is not an allergen flag. Not bare soy.',
  mctUnlabeled:
    'Methodology §5 Limited-risk (unlabeled MCT — medium chain triglycerides when the token does not name coconut or palm kernel). Not an oil-bottle grade. Not gummy High.',
  sunflowerFill:
    'Methodology §5 Cleared as non-gummy fill (sunflower oil as capsule / softgel / tablet fill — locked Sept 22, 2026). The sunflower-oil half of the printed clause annatto suspension in sunflower oil sits on this named-fill row (Sept 23, 2026). Not a new combined token. Gummy sunflower oil stays High. Tap both sides.',
  water:
    'Methodology §5 Cleared (purified water). Water / bare water sit on this same row (Sept 22, 2026).',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

const cite =
  `Current nutricost.com supplement-facts panel (https://nutricost.com/products/nutricost-ubiquinol-softgels; image ${CDN}NTC_Ubiquinol_100MG_240SFG_500CC_SFP_Square.jpg) other-ingredients: ${PRINTED_OI}. Brand-site 240-count supplement-facts image is the pin (re-read this pass). The printed clause annatto suspension in sunflower oil is split into existing annatto and existing sunflower-oil softgel fill. Not a new token. UPC-A 810014679044 is printed on the 240-count front label on that same PDP (image ${CDN}NTC_Ubiquinol_100MG_240SFG_500CC_Front_Square.jpg). Live Amazon US exact pack when this Nutricost name is listed. No DailyMed drug SPL.`;

export const BATCH81_KYR6_NUTRICOST_UBIQUINOL_240: RatingRecord[] = [
  row({
    id: 'nutricost-b81-ubiquinol-240-softgels',
    productName: 'Nutricost Ubiquinol Softgels (240 softgels)',
    brand: BRAND,
    category: 'Vitamins',
    barcode: '810014679044',
    formulaId: 'nutricost-b81-ubiquinol-240-softgels',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Ubiquinol (Kaneka Ubiquinol)', strength: '100mg' }],
    inactiveIngredients: (
      [
        ['MCT oil (medium chain triglycerides)', 'limited', 'mctUnlabeled'],
        ['Gelatin', 'cleared', 'gelatin'],
        ['Glycerine', 'cleared', 'glycerin'],
        ['Ascorbyl palmitate', 'cleared', 'ascorbyl'],
        ['Purified water', 'cleared', 'water'],
        ['Beeswax', 'cleared', 'beeswax'],
        ['Sunflower lecithin', 'cleared', 'lecithin'],
        ['Annatto', 'limited', 'annatto'],
        ['Sunflower oil', 'cleared', 'sunflowerFill'],
      ] as [string, IngredientFlag['riskLevel'], keyof typeof METH][]
    ).map(([name, risk, meth]) => flag(name, risk, labelCite(cite, METH[meth]))),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Caution. Grade follows annatto. The 240-count panel prints one clause, annatto suspension in sunflower oil. That clause splits to Annatto on the existing Caution row and Sunflower oil as softgel fill on the existing Cleared named-fill row. Not a new token. Unlabeled MCT oil (medium chain triglycerides) is also Limited. Gummy sunflower oil stays High. The 120-count tab prints annatto extract (for color) plus a separate sunflower oil and keeps formulaId \`${UBI_120}\`. This printed list is not that list. ${LIMITED_STACK} Pack sizes share formulaId \`nutricost-b81-ubiquinol-240-softgels\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: [
      alt(
        'amazon-elements-vitamin-d3-5000-softgels',
        'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).',
      ),
    ],
    sourcesGeneral: [`${cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
];

export const BATCH81_SKIPPED: { sku: string; reason: string }[] = [];

export const BATCH81_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH81_KYR6_NUTRICOST_UBIQUINOL_240;
if (_ROWS.length !== 1) throw new Error('batch81 tally drift: expected 1 row');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) throw new Error('batch81 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 1) throw new Error('batch81 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch81 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch81 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.formulaId || r.formulaId !== r.id)) throw new Error('batch81 NEW formula drift');
if (_ROWS.some((r) => r.formulaId === UBI_120)) throw new Error('batch81 must not reuse the 120 formula');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch81 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch81 writes Nutricost only');
if (_ROWS.some((r) => r.barcode && !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch81 barcode must be a 12-digit UPC-A');
}
if (_ROWS.some((r) => {
  if (!r.barcode) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
})) {
  throw new Error('batch81 barcode failed UPC-A check digit');
}
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|naturewise|welmate|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch81 leftover 3P / Sprouts / toothpaste / NOW must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/softgel|capsule|gumm|tablet/i.test(r.productName))) {
  throw new Error('batch81 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch81 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.inactiveIngredients.some((i) => /annatto suspension in sunflower oil/i.test(i.name))) {
    throw new Error('batch81 must not grade the combined clause as its own token');
  }
  const annatto = record.inactiveIngredients.find((i) => i.name === 'Annatto');
  const oil = record.inactiveIngredients.find((i) => i.name === 'Sunflower oil');
  if (!annatto || annatto.riskLevel !== 'limited') throw new Error('batch81 annatto half must be the Caution row');
  if (!oil || oil.riskLevel !== 'cleared') {
    throw new Error('batch81 softgel sunflower oil must stay named-fill Cleared');
  }
  if (!record.sourcesGeneral?.some((s) => s.includes(PRINTED_OI))) {
    throw new Error('batch81 cite must quote the printed other-ingredients list');
  }
  if (record.form === 'gummy') throw new Error('batch81 is a softgel, not a gummy');
}
if (BATCH81_SKIPPED.length !== 0) throw new Error('batch81 skip tally drift');
if (BATCH81_REFUSED.length !== 0) throw new Error('batch81 refuse tally drift');
