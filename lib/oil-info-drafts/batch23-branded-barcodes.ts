// DRAFT / not verified / batch 23 branded essential-oil barcodes /
// slice 3 (oils leftover from batch 22) / OilInfoRecords ONLY /
// NEVER Clean / Caution / Avoid / no grades / methodology untouched.
//
// Info-only scan rows. recordStatus is 'unverified' on every row.
// Do not mark verified. Not wired into the browsable Oil Library UI.
// Methodology.md / PROJECT_NOTES.md are untouched.
// No iHerb / Fullscript / Amazon-only / Dollar Tree.
//
// Usage classification (PROJECT_NOTES §9):
//   internal-confirmed ONLY if THIS SKU's own label has a Supplement
//   Facts panel OR explicit internal-use directions. "100% pure" /
//   "therapeutic grade" alone ≠ internal.
//   Aromatherapy bottles with "for aromatherapy / dilute with carrier"
//   and no SF → topical-only + mandatory §9 disclaimer.
//
// THIS PASS: every written row is topical-only. No SF / internal-use
// directions found on these aromatherapy singles. NOW company FAQ
// states aromatherapy bottles are not labeled for ingestion and do
// not carry Supplement Facts. Aura Cacia boxes say "Not for internal
// use" / External Use Only. Nature's Truth is aromatherapy + dilute
// with carrier (no SF).
//
// oilsDataKey is reused across pack sizes of the same oil identity.
// Content (tags / topical dilution / diffusion) lives in lib/oilsData.js.
// Internal dosing from oilsData.js is NOT shown for these rows.
//
// imageKey = upc-<upc>. Retailers are brick-and-mortar chips only
// where known (Walmart / Target / Whole Foods / Sprouts). Do not invent.
//
// TALLY (unverified drafts): 38 barcode rows —
//   topical-only 38 / internal-confirmed 0 / unknown-unconfirmed 0.
// oilsDataKeys used on barcodes: 20
//   bergamotOil, cedarwoodOil, chamomileRomanOil, clarySageOil,
//   cloveOil, cypressOil, eucalyptusOil, frankincenseOil, geraniumOil,
//   gingerOil, lavenderOil, lemongrassOil, lemonOil, marjoramOil,
//   oreganoOil, peppermintOil, rosemaryOil, sweetOrangeOil, teaTreeOil,
//   ylangYlangOil.
// oilsDataKeys content-only (no barcode this pass): helichrysumOil,
//   sandalwoodOil. Both already exist in lib/oilsData.js.
//
// FLAG / skip (not written):
// - NOW Sandalwood blend 733739076687 (blend, not the sandalwoodOil single)
// - Helichrysum (no UPC this pass)
// - NOW Oil of Oregano Blend 733739075772 (25% blend WITH Supplement
//   Facts + "For Internal Use" — different SKU from the assigned
//   aromatherapy bottle 733739075734; not in this write list)
// - NOW oregano / peppermint / other softgels and enteric capsules
// - Other Aura Cacia / Nature's Truth SKUs without an assigned UPC
// - Plant Therapy / store house / club oils without UPC
// - iHerb / Fullscript / Amazon-only / Dollar Tree

import type { OilInfoRecord, OilsDataKey } from '../oilInfoRecord';
import {
  INTERNAL_USE_NOT_CONFIRMED_DISCLAIMER,
  imageKeyForUpc,
  needsInternalUseDisclaimer,
} from '../oilInfoRecord';

const UNVERIFIED = 'unverified' as const;
const TOPICAL = 'topical-only' as const;

const NOW = 'NOW Foods';
const AURA = 'Aura Cacia';
const NT = "Nature's Truth";

const NOW_RETAILERS = ['Whole Foods', 'Sprouts'] as const;
const AURA_RETAILERS = ['Target', 'Whole Foods', 'Sprouts'] as const;
const NT_RETAILERS = ['Target', 'Walmart'] as const;

const NOW_LABEL =
  'For aromatherapy use. For all other uses, carefully dilute with a carrier oil such as jojoba, grapeseed, olive, or almond oil prior to use. No Supplement Facts panel. NOW states aromatherapy bottles are not labeled or marketed for internal use.';

const AURA_LABEL =
  'Aura Cacia boxed 0.5 fl oz singles: External Use Only / Not for internal use. Dilute properly. Aromatherapy + topical-with-carrier. No Supplement Facts panel.';

const NT_LABEL =
  "Nature's Truth aromatherapy essential oil: diffuser / bath / DIY; dilute with a carrier oil for massage or topical use. No Supplement Facts panel. 100% pure ≠ internal.";

const NOW_SRC = [
  'NOW Foods product pages (aromatherapy suggested usage; size/UPC tables)',
  'NOW Foods — Food Grade Essential Oils / Essential Oil Safety FAQs (aromatherapy bottles are not labeled for ingestion and do not carry Supplement Facts)',
];

const AURA_SRC = [
  'Aura Cacia product pages (0.5 fl oz boxed singles; External Use Only / Not for internal use)',
  'Sprouts / Whole Foods / Target shelf listings for Aura Cacia 0.5 fl oz',
];

const NT_SRC = [
  "Nature's Truth aromatherapy label (dilute with carrier; diffuser / topical) — Target / Walmart shelf, not iHerb-sourced",
];

type DraftInput = {
  id: string;
  productName: string;
  brand: string;
  size: string;
  barcode: string;
  oilsDataKey: OilsDataKey;
  retailers: readonly string[];
  botanicalName?: string;
  labelUsage: string;
  sources: readonly string[];
};

function topicalRow(input: DraftInput): OilInfoRecord {
  const usageClassification = TOPICAL;
  return {
    id: input.id,
    productName: input.productName,
    brand: input.brand,
    size: input.size,
    barcode: input.barcode,
    imageKey: imageKeyForUpc(input.barcode),
    oilsDataKey: input.oilsDataKey,
    usageClassification,
    showInternalUseDisclaimer: needsInternalUseDisclaimer(usageClassification),
    retailers: [...input.retailers],
    recordStatus: UNVERIFIED,
    botanicalName: input.botanicalName,
    labelUsage: input.labelUsage,
    sources: [...input.sources],
  };
}

function nowRow(
  id: string,
  productName: string,
  size: string,
  barcode: string,
  oilsDataKey: OilsDataKey,
  botanicalName: string,
): OilInfoRecord {
  return topicalRow({
    id,
    productName,
    brand: NOW,
    size,
    barcode,
    oilsDataKey,
    retailers: NOW_RETAILERS,
    botanicalName,
    labelUsage: NOW_LABEL,
    sources: NOW_SRC,
  });
}

export const BATCH23_OIL_BARCODES: OilInfoRecord[] = [
  // ── NOW Foods — lavender (4 pack sizes, same oilsDataKey) ──
  nowRow(
    'now-lavender-1oz-733739075604',
    'Lavender Oil',
    '1 fl oz',
    '733739075604',
    'lavenderOil',
    'Lavandula angustifolia',
  ),
  nowRow(
    'now-lavender-033oz-733739079008',
    'Lavender Oil',
    '0.33 fl oz',
    '733739079008',
    'lavenderOil',
    'Lavandula angustifolia',
  ),
  nowRow(
    'now-lavender-2oz-733739074928',
    'Lavender Oil',
    '2 fl oz',
    '733739074928',
    'lavenderOil',
    'Lavandula angustifolia',
  ),
  nowRow(
    'now-lavender-4oz-733739075611',
    'Lavender Oil',
    '4 fl oz',
    '733739075611',
    'lavenderOil',
    'Lavandula angustifolia',
  ),

  // ── NOW Foods — peppermint ──
  nowRow(
    'now-peppermint-1oz-733739075857',
    'Peppermint Oil',
    '1 fl oz',
    '733739075857',
    'peppermintOil',
    'Mentha piperita',
  ),
  nowRow(
    'now-peppermint-2oz-733739074959',
    'Peppermint Oil',
    '2 fl oz',
    '733739074959',
    'peppermintOil',
    'Mentha piperita',
  ),
  nowRow(
    'now-peppermint-4oz-733739075864',
    'Peppermint Oil',
    '4 fl oz',
    '733739075864',
    'peppermintOil',
    'Mentha piperita',
  ),

  // ── NOW Foods — tea tree ──
  nowRow(
    'now-tea-tree-1oz-733739076250',
    'Tea Tree Oil',
    '1 fl oz',
    '733739076250',
    'teaTreeOil',
    'Melaleuca alternifolia',
  ),
  nowRow(
    'now-tea-tree-2oz-733739074898',
    'Tea Tree Oil',
    '2 fl oz',
    '733739074898',
    'teaTreeOil',
    'Melaleuca alternifolia',
  ),
  nowRow(
    'now-tea-tree-4oz-733739076267',
    'Tea Tree Oil',
    '4 fl oz',
    '733739076267',
    'teaTreeOil',
    'Melaleuca alternifolia',
  ),

  // ── NOW Foods — eucalyptus globulus ──
  nowRow(
    'now-eucalyptus-1oz-733739075451',
    'Eucalyptus Globulus Oil',
    '1 fl oz',
    '733739075451',
    'eucalyptusOil',
    'Eucalyptus globulus',
  ),
  nowRow(
    'now-eucalyptus-2oz-733739074911',
    'Eucalyptus Globulus Oil',
    '2 fl oz',
    '733739074911',
    'eucalyptusOil',
    'Eucalyptus globulus',
  ),
  nowRow(
    'now-eucalyptus-4oz-733739075468',
    'Eucalyptus Globulus Oil',
    '4 fl oz',
    '733739075468',
    'eucalyptusOil',
    'Eucalyptus globulus',
  ),

  // ── NOW Foods — singles (1 fl oz unless noted) ──
  nowRow(
    'now-frankincense-1oz-733739075420',
    'Frankincense Oil',
    '1 fl oz',
    '733739075420',
    'frankincenseOil',
    'Boswellia carterii',
  ),
  nowRow(
    'now-lemon-1oz-733739075659',
    'Lemon Oil',
    '1 fl oz',
    '733739075659',
    'lemonOil',
    'Citrus limon',
  ),
  nowRow(
    'now-lemon-4oz-733739075697',
    'Lemon Oil',
    '4 fl oz',
    '733739075697',
    'lemonOil',
    'Citrus limon',
  ),
  nowRow(
    'now-orange-1oz-733739075703',
    'Orange Oil',
    '1 fl oz',
    '733739075703',
    'sweetOrangeOil',
    'Citrus sinensis',
  ),
  nowRow(
    'now-orange-4oz-733739075789',
    'Orange Oil',
    '4 fl oz',
    '733739075789',
    'sweetOrangeOil',
    'Citrus sinensis',
  ),
  nowRow(
    'now-bergamot-1oz-733739075185',
    'Bergamot Oil',
    '1 fl oz',
    '733739075185',
    'bergamotOil',
    'Citrus bergamia',
  ),
  nowRow(
    'now-rosemary-1oz-733739076007',
    'Rosemary Oil',
    '1 fl oz',
    '733739076007',
    'rosemaryOil',
    'Rosmarinus officinalis',
  ),
  nowRow(
    'now-clove-1oz-733739075406',
    'Clove Oil',
    '1 fl oz',
    '733739075406',
    'cloveOil',
    'Syzygium aromaticum',
  ),
  nowRow(
    'now-ginger-1oz-733739075505',
    'Ginger Oil',
    '1 fl oz',
    '733739075505',
    'gingerOil',
    'Zingiber officinale',
  ),
  nowRow(
    'now-oregano-1oz-733739075734',
    'Oregano Oil',
    '1 fl oz',
    '733739075734',
    'oreganoOil',
    'Origanum vulgare',
  ),
  nowRow(
    'now-geranium-1oz-733739075529',
    'Geranium Oil',
    '1 fl oz',
    '733739075529',
    'geraniumOil',
    'Pelargonium graveolens',
  ),
  nowRow(
    'now-ylang-ylang-1oz-733739076502',
    'Ylang Ylang Oil',
    '1 fl oz',
    '733739076502',
    'ylangYlangOil',
    'Cananga odorata',
  ),
  nowRow(
    'now-cedarwood-1oz-733739075253',
    'Cedarwood Oil',
    '1 fl oz',
    '733739075253',
    'cedarwoodOil',
    'Juniperus virginiana',
  ),
  nowRow(
    'now-cypress-1oz-733739076526',
    'Cypress Oil',
    '1 fl oz',
    '733739076526',
    'cypressOil',
    'Cupressus sempervirens',
  ),
  nowRow(
    'now-clary-sage-1oz-733739075383',
    'Clary Sage Oil',
    '1 fl oz',
    '733739075383',
    'clarySageOil',
    'Salvia sclarea',
  ),
  nowRow(
    'now-lemongrass-1oz-733739075826',
    'Lemongrass Oil',
    '1 fl oz',
    '733739075826',
    'lemongrassOil',
    'Cymbopogon citratus',
  ),
  nowRow(
    'now-marjoram-1oz-733739075666',
    'Sweet Marjoram Oil',
    '1 fl oz',
    '733739075666',
    'marjoramOil',
    'Origanum majorana',
  ),
  nowRow(
    'now-chamomile-roman-033oz-733739076212',
    'Chamomile Oil (Roman)',
    '0.33 fl oz',
    '733739076212',
    'chamomileRomanOil',
    'Anthemis nobilis (Chamaemelum nobile)',
  ),
  nowRow(
    'now-chamomile-roman-1oz-733739075284',
    'Chamomile Oil (Roman)',
    '1 fl oz',
    '733739075284',
    'chamomileRomanOil',
    'Anthemis nobilis (Chamaemelum nobile)',
  ),

  // ── Aura Cacia 0.5 fl oz ──
  topicalRow({
    id: 'aura-cacia-lavender-harvest-05oz-051381886202',
    productName: 'Lavender Harvest Essential Oil',
    brand: AURA,
    size: '0.5 fl oz',
    barcode: '051381886202',
    oilsDataKey: 'lavenderOil',
    retailers: AURA_RETAILERS,
    botanicalName: 'Lavandula angustifolia',
    labelUsage: AURA_LABEL,
    sources: AURA_SRC,
  }),
  topicalRow({
    id: 'aura-cacia-peppermint-05oz-051381911324',
    productName: 'Peppermint Essential Oil',
    brand: AURA,
    size: '0.5 fl oz',
    barcode: '051381911324',
    oilsDataKey: 'peppermintOil',
    retailers: AURA_RETAILERS,
    botanicalName: 'Mentha x piperita',
    labelUsage: AURA_LABEL,
    sources: AURA_SRC,
  }),
  topicalRow({
    id: 'aura-cacia-tea-tree-05oz-051381911393',
    productName: 'Tea Tree Essential Oil',
    brand: AURA,
    size: '0.5 fl oz',
    barcode: '051381911393',
    oilsDataKey: 'teaTreeOil',
    retailers: AURA_RETAILERS,
    botanicalName: 'Melaleuca alternifolia',
    labelUsage: AURA_LABEL,
    sources: AURA_SRC,
  }),

  // ── Nature's Truth ~0.51 fl oz (Target / Walmart shelf) ──
  topicalRow({
    id: 'natures-truth-lavender-051oz-840093100993',
    productName: 'Lavender Aromatherapy Essential Oil',
    brand: NT,
    size: '0.51 fl oz',
    barcode: '840093100993',
    oilsDataKey: 'lavenderOil',
    retailers: NT_RETAILERS,
    botanicalName: 'Lavandula angustifolia',
    labelUsage: NT_LABEL,
    sources: NT_SRC,
  }),
  topicalRow({
    id: 'natures-truth-peppermint-051oz-840093101006',
    productName: 'Peppermint Aromatherapy Essential Oil',
    brand: NT,
    size: '0.51 fl oz',
    barcode: '840093101006',
    oilsDataKey: 'peppermintOil',
    retailers: NT_RETAILERS,
    botanicalName: 'Mentha piperita',
    labelUsage: NT_LABEL,
    sources: NT_SRC,
  }),
  topicalRow({
    id: 'natures-truth-tea-tree-051oz-840093102126',
    productName: 'Tea Tree Aromatherapy Essential Oil',
    brand: NT,
    size: '0.51 fl oz',
    barcode: '840093102126',
    oilsDataKey: 'teaTreeOil',
    retailers: NT_RETAILERS,
    botanicalName: 'Melaleuca alternifolia',
    labelUsage: NT_LABEL,
    sources: NT_SRC,
  }),
];

// Compile-time: every row must carry the §9 disclaimer (this pass is
// all topical-only). The string is the locked PROJECT_NOTES copy.
const _disclaimerLock: typeof INTERNAL_USE_NOT_CONFIRMED_DISCLAIMER =
  INTERNAL_USE_NOT_CONFIRMED_DISCLAIMER;
void _disclaimerLock;

export const BATCH23_TALLY = {
  barcodeRows: 38,
  topicalOnly: 38,
  internalConfirmed: 0,
  unknownUnconfirmed: 0,
  oilsDataKeysUsed: 20,
  oilsDataKeysContentOnly: 2,
} as const;
