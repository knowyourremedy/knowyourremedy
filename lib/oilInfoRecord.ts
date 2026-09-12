// ─── Oil Info Record — SCAN LOOKUP, NO VERDICT (PROJECT_NOTES §9) ─
// Essential oils are informational-only. They are NEVER graded
// Clean / Caution / Avoid. There is no standardized oil-safety
// database analogous to DailyMed, so there is no defensible
// basis for a product verdict on an oil.
//
// Content (what it's used for, topical dilution, diffusion) lives
// in lib/oilsData.js and is reused via oilsDataKey. This record
// is the barcode / SKU layer: brand, size, UPC, usage class.
//
// Usage classification (three-way, supersedes old External Only /
// Dilute First / Internal Only):
//   topical-only          — aromatherapy / dilute-with-carrier label;
//                           no Supplement Facts; no explicit internal-use
//                           directions on THIS SKU.
//   internal-confirmed    — THIS SKU's own label has a Supplement Facts
//                           panel OR explicit internal-use directions.
//                           "100% pure" / "therapeutic grade" alone ≠ this.
//   unknown-unconfirmed   — label not readable / not confirmed.
//
// Internal dosing from oilsData.js is shown ONLY when classification
// is internal-confirmed. Otherwise the §9 disclaimer is mandatory.

export type UsageClassification =
  | 'topical-only'
  | 'internal-confirmed'
  | 'unknown-unconfirmed';

export type OilRecordStatus =
  | 'unverified'
  | 'provisional-pending-review'
  | 'verified';

// Keys in lib/oilsData.js `OILS` — 22 content records. Reuse the same
// key across pack sizes of the same oil identity. Helichrysum and
// sandalwood are content-only this pass (no barcode rows).
export type OilsDataKey =
  | 'bergamotOil'
  | 'cedarwoodOil'
  | 'chamomileRomanOil'
  | 'clarySageOil'
  | 'cloveOil'
  | 'cypressOil'
  | 'eucalyptusOil'
  | 'frankincenseOil'
  | 'geraniumOil'
  | 'gingerOil'
  | 'helichrysumOil'
  | 'lavenderOil'
  | 'lemongrassOil'
  | 'lemonOil'
  | 'marjoramOil'
  | 'oreganoOil'
  | 'peppermintOil'
  | 'rosemaryOil'
  | 'sandalwoodOil'
  | 'sweetOrangeOil'
  | 'teaTreeOil'
  | 'ylangYlangOil';

export const OILS_DATA_KEYS: readonly OilsDataKey[] = [
  'bergamotOil',
  'cedarwoodOil',
  'chamomileRomanOil',
  'clarySageOil',
  'cloveOil',
  'cypressOil',
  'eucalyptusOil',
  'frankincenseOil',
  'geraniumOil',
  'gingerOil',
  'helichrysumOil',
  'lavenderOil',
  'lemongrassOil',
  'lemonOil',
  'marjoramOil',
  'oreganoOil',
  'peppermintOil',
  'rosemaryOil',
  'sandalwoodOil',
  'sweetOrangeOil',
  'teaTreeOil',
  'ylangYlangOil',
] as const;

// PROJECT_NOTES §9 — mandatory whenever internal use is not clearly
// confirmed on THIS SKU. Shown prominently, not buried.
export const INTERNAL_USE_NOT_CONFIRMED_DISCLAIMER =
  "This product's labeling does not confirm internal use. Always check the physical label for a Supplement Facts panel or explicit internal-use directions before consuming. When in doubt, treat as topical only.";

export function needsInternalUseDisclaimer(
  classification: UsageClassification,
): boolean {
  return classification !== 'internal-confirmed';
}

export type OilInfoRecord = {
  id: string;
  productName: string;
  brand: string;
  size: string;
  barcode: string;
  imageKey: string;
  oilsDataKey: OilsDataKey;
  usageClassification: UsageClassification;
  showInternalUseDisclaimer: boolean;
  retailers: string[];
  recordStatus: OilRecordStatus;
  botanicalName?: string;
  labelUsage?: string;
  sources?: string[];
  // NO verdict field — oils are never Clean / Caution / Avoid.
};

export function imageKeyForUpc(upc: string): string {
  return `upc-${upc}`;
}

// Oils never carry a Clean / Caution / Avoid verdict. If this errors,
// a verdict field was added to OilInfoRecord — remove it.
type _OilInfoRecordHasNoVerdict = 'verdict' extends keyof OilInfoRecord
  ? never
  : true;
const _oilInfoRecordHasNoVerdict: _OilInfoRecordHasNoVerdict = true;
void _oilInfoRecordHasNoVerdict;
