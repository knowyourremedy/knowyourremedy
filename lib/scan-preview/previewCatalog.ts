// Preview wiring only. Imports existing draft rows — does not copy
// product data or change verdicts / recordStatus.

import {
  BATCH1_ADULT_APAP_IBU,
  BATCH2_KIDS_APAP_IBU,
  BATCH3_ADULT_COUGH_COLD,
  BATCH4_KIDS_COUGH_COLD,
  BATCH5_ADULT_ALLERGIES,
  BATCH6_KIDS_ALLERGIES,
  BATCH7_ADULT_SLEEP,
  BATCH8_KIDS_SLEEP,
  BATCH9_IMMUNE_SUPPORT,
  BATCH10_ADULT_DIGESTIVE,
  BATCH11_KIDS_DIGESTIVE,
  BATCH12_ADULT_FIRST_AID,
  BATCH13_KIDS_FIRST_AID,
  BATCH14_ADULT_VITAMINS,
  BATCH15_PRENATALS,
  BATCH16_365_SPROUTS,
  BATCH17_KIDS_VITAMINS,
  BATCH18_ADULT_SINGLES,
  BATCH19_KIDS_SINGLES,
  BATCH20_CLUB_LEFTOVERS,
  BATCH21_TOPCARE_SAVE_MART,
  BATCH22_EYE_EAR,
  BATCH24_IHERB_FULLSCRIPT,
  BATCH25_IHERB_FULLSCRIPT_LEFTOVERS,
  BATCH26_WE_HEART_NUTRITION,
  BATCH27_THRIVE_WELLMADE,
  BATCH28_THORNE_COM,
  BATCH29_DOLLAR_STORE,
  BATCH30_AMAZON_BASIC_CARE,
  BATCH31_MEGAFOOD,
  BATCH32_GENEXA,
  BATCH33_HYLANDS,
  BATCH34_BOIRON,
  BATCH35_SPROUTS,
} from '@/lib/rating-drafts';
import type { Verdict } from '@/lib/clean-picks/verdictLabels';
import type { IngredientFlag, ProductImage, RatingRecord, RiskLevel } from '@/lib/ratingRecord';
import {
  PARKED_PEDIALYTE_BROWSE_IDS,
  isParkedBrowseId,
  isParkedBrowseRecord,
} from '@/lib/scan-preview/parkedBrowseIds';

function uniqueById(records: RatingRecord[]): RatingRecord[] {
  const seen = new Set<string>();
  const out: RatingRecord[] = [];
  for (const record of records) {
    if (seen.has(record.id)) continue;
    seen.add(record.id);
    out.push(record);
  }
  return out;
}

// Batch 10 first so the three fixture rows win any id collision.
const CATALOG: RatingRecord[] = uniqueById([
  ...BATCH10_ADULT_DIGESTIVE,
  ...BATCH1_ADULT_APAP_IBU,
  ...BATCH2_KIDS_APAP_IBU,
  ...BATCH3_ADULT_COUGH_COLD,
  ...BATCH4_KIDS_COUGH_COLD,
  ...BATCH5_ADULT_ALLERGIES,
  ...BATCH6_KIDS_ALLERGIES,
  ...BATCH7_ADULT_SLEEP,
  ...BATCH8_KIDS_SLEEP,
  ...BATCH9_IMMUNE_SUPPORT,
  ...BATCH11_KIDS_DIGESTIVE,
  ...BATCH12_ADULT_FIRST_AID,
  ...BATCH13_KIDS_FIRST_AID,
  ...BATCH14_ADULT_VITAMINS,
  ...BATCH15_PRENATALS,
  ...BATCH16_365_SPROUTS,
  ...BATCH17_KIDS_VITAMINS,
  ...BATCH18_ADULT_SINGLES,
  ...BATCH19_KIDS_SINGLES,
  ...BATCH20_CLUB_LEFTOVERS,
  ...BATCH21_TOPCARE_SAVE_MART,
  ...BATCH22_EYE_EAR,
  ...BATCH24_IHERB_FULLSCRIPT,
  ...BATCH25_IHERB_FULLSCRIPT_LEFTOVERS,
  ...BATCH26_WE_HEART_NUTRITION,
  ...BATCH27_THRIVE_WELLMADE,
  ...BATCH28_THORNE_COM,
  ...BATCH29_DOLLAR_STORE,
  ...BATCH30_AMAZON_BASIC_CARE,
  ...BATCH31_MEGAFOOD,
  ...BATCH32_GENEXA,
  ...BATCH33_HYLANDS,
  ...BATCH34_BOIRON,
  ...BATCH35_SPROUTS,
]);

// Full draft catalog stays on disk. Browse / Search / Home / Cabinet /
// night-photo queues use the filtered list so parked Pedialyte rows
// are not shoppable and are not night-photo candidates.
const BROWSE_CATALOG: RatingRecord[] = CATALOG.filter(
  (record) => !isParkedBrowseRecord(record),
);

for (const parkedId of PARKED_PEDIALYTE_BROWSE_IDS) {
  if (!CATALOG.some((record) => record.id === parkedId)) {
    throw new Error(`Parked Pedialyte draft "${parkedId}" is missing — do not delete draft files`);
  }
  if (BROWSE_CATALOG.some((record) => record.id === parkedId)) {
    throw new Error(`Parked Pedialyte "${parkedId}" leaked into browse catalog`);
  }
}

function mustFind(id: string): RatingRecord {
  const row = CATALOG.find((record) => record.id === id);
  if (!row) {
    throw new Error(`Scan preview is missing draft row "${id}"`);
  }
  return row;
}

// Real Batch 10 rows — existing ids / formulaIds / verdict keys unchanged.
export const PREVIEW_CLEAN_ID = 'phillips-mom-original';
export const PREVIEW_USABLE_ID = 'alka-seltzer-gold';
export const PREVIEW_AVOID_ID = 'tums-ultra-fruit-dyed';

export const PREVIEW_SWITCHER: { id: string; verdict: Verdict }[] = [
  { id: PREVIEW_CLEAN_ID, verdict: 'clean' },
  { id: PREVIEW_USABLE_ID, verdict: 'caution' },
  { id: PREVIEW_AVOID_ID, verdict: 'avoid' },
];

export const PREVIEW_SWITCHER_IDS = PREVIEW_SWITCHER.map((item) => item.id);

export const PREVIEW_CLEAN = mustFind(PREVIEW_CLEAN_ID);
export const PREVIEW_USABLE = mustFind(PREVIEW_USABLE_ID);
export const PREVIEW_AVOID = mustFind(PREVIEW_AVOID_ID);

// Preview-only shopper copy. Does not edit draft rows or verdict keys.
const PREVIEW_HONEST_NOTE_OVERLAY: Record<string, string> = {
  [PREVIEW_CLEAN_ID]:
    'This Original liquid is Clean. The bottle is magnesium hydroxide in purified water, plus a residual sanitizer that does not change the rating. Labeled for ages 12 and up. Fine for occasional digestive use; mint and cherry Phillips bottles are different formulas.',
  [PREVIEW_USABLE_ID]:
    'This Gold tablet is Usable, not Clean, because it uses mannitol — a sugar alcohol that can bother the gut at volume. Magnesium stearate is cleared, and the formula is aspirin-free. Labeled for ages 12 and up. Fine in moderation for occasional heartburn; pause if sugar alcohols upset your stomach.',
  [PREVIEW_AVOID_ID]:
    'This Assorted Fruit chew is Avoid because of synthetic dye lakes and talc — both High-risk extras. The dyes are the family linked to hyperactivity warnings in the EU; flavors are a smaller listing. Labeled for ages 12 and up. Skip this bottle for everyday use and pick a cleaner chew if you want one without dyes or talc.',
};

// Preview-only catalog pack shots. Does not edit draft rows.
// verifiedSku is true only when the DailyMed file is the exact SKU.
function catalogShot(file: string): ProductImage {
  return { url: `/scan-preview/${file}`, source: 'catalog', verifiedSku: true };
}

// Official brand marks — not pack shots, never verifiedSku.
// Brand-level map is for brands whose leftover drafts were all attempted.
// Per-id map is for attempted Digestive leftovers on brands that still have
// unattempted SKUs in other aisles (do not treat those as attempted).
function brandMark(file: string): ProductImage {
  return { url: `/scan-preview/${file}`, source: 'catalog', verifiedSku: false };
}

function brandKey(brand: string): string {
  return brand.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

const PREVIEW_BRAND_MARK: Record<string, ProductImage> = {
  tums: brandMark('tums-mark.png'),
  emetrol: brandMark('emetrol-mark.png'),
  nauzene: brandMark('nauzene-mark.png'),
};

// Attempted leftovers with no matching carton. Not verifiedSku.
// Per-id only — do not brand-level Culturelle / Pedialyte / 365 / Tylenol / Genexa
// (other aisles or unattempted SKUs must stay on the letter tile).
const PREVIEW_ID_BRAND_MARK: Record<string, ProductImage> = {
  'culturelle-kids-packets': brandMark('culturelle-mark.png'),
  'culturelle-kids-gummies-coconut': brandMark('culturelle-mark.png'),
  'pedialyte-classic-flavored': brandMark('pedialyte-mark.png'),
  'pure-encapsulations-probiotic-gi': brandMark('pure-encapsulations-mark.png'),
  'pure-encapsulations-probiotic-5': brandMark('pure-encapsulations-mark.png'),
  'thorne-floramend-prime-probiotic': brandMark('thorne-mark.png'),
  'we-heart-wholesome-probiotic': brandMark('we-heart-mark.png'),
  'thrive-wellmade-womens-daily-probiotic': brandMark('wellmade-mark.png'),
  'thrive-wellmade-mens-daily-probiotic': brandMark('wellmade-mark.png'),
  'thrive-wellmade-kids-chewable-probiotic': brandMark('wellmade-mark.png'),
  'tylenol-rs-caplets': brandMark('tylenol-mark.png'),
  // Kids Tylenol drafts are flavor-generic. Cherry/apple cartons exist — do not glue.
  'tylenol-children-liquid-dyed': brandMark('tylenol-mark.png'),
  'tylenol-children-liquid-dyefree': brandMark('tylenol-mark.png'),
  'tylenol-infants-liquid-dyed': brandMark('tylenol-mark.png'),
  'tylenol-infants-liquid-dyefree': brandMark('tylenol-mark.png'),
  'tylenol-children-chew-dyefree': brandMark('tylenol-mark.png'),
  // Genexa kids/infants drafts name no flavor. Blueberry/cherry/grape cartons exist.
  'genexa-kids-apap-liquid': brandMark('genexa-mark.png'),
  'genexa-infants-apap-liquid': brandMark('genexa-mark.png'),
  'genexa-kids-apap-chewable': brandMark('genexa-mark.png'),
  // Attempted P&F leftovers — no matching pack face. Per-id only.
  'walgreens-es-red40-tio2': brandMark('walgreens-mark.png'),
  'walgreens-es-dyes-talc': brandMark('walgreens-mark.png'),
  'advil-liqui-gels': brandMark('advil-mark.png'),
  // Flavor-generic kids Motrin — DailyMed cartons are bubblegum / berry / grape.
  'motrin-children-liquid-dyed': brandMark('motrin-mark.png'),
  'motrin-children-liquid-dyefree': brandMark('motrin-mark.png'),
  'motrin-children-chew-dyefree': brandMark('motrin-mark.png'),
  'motrin-children-chew-dyed': brandMark('motrin-mark.png'),
  'motrin-infants-liquid-dyed': brandMark('motrin-mark.png'),
  // Too-broad P&F leftover — DailyMed faces are minis, draft says gels/minis.
  'topcare-ibuprofen-liquid-gels': brandMark('topcare-mark.png'),
  // Official boironusa pack is lemon chewable tubes; draft is the
  // unflavored meltaway. DailyMed faces for this setid are PM / foil.
  'boiron-arnicare-leg-cramps': brandMark('boiron-mark.png'),
};

// No standalone official 365 mark file on wholefoodsmarket.com (brand page
// is product photos only). Do not invent a logo. Do not use the first
// character "3". Same beige tile as the letter helper, brand name "365".
const PREVIEW_ID_BRAND_TEXT: Record<string, string> = {
  '365-probiotic-fiber-gummies-sunflower': '365',
  // Attempted P&F leftovers / flavor-generic kids. Target media kit is
  // product photos only — no standalone official up&up mark file.
  // Do not invent a logo. Do not stay on the letter "U".
  'upup-es-red40-tio2': 'up&up',
  'upup-children-apap-dyed': 'up&up',
  'upup-infants-apap-dyefree': 'up&up',
  'upup-children-apap-dyefree': 'up&up',
  'upup-children-ibu-dyed': 'up&up',
  'upup-children-ibu-chew-dyed': 'up&up',
  'upup-infants-ibu-dyefree': 'up&up',
  'upup-children-ibu-dyefree-liquid': 'up&up',
  // Flavor-generic kids / too-broad leftover. No standalone official
  // Walmart Equate mark (equate.com is Kuwait petrochemical — refuse).
  'equate-children-apap-dyed': 'Equate',
  'equate-infants-apap-dyefree': 'Equate',
  'equate-children-ibu-dyed': 'Equate',
  'equate-children-ibu-chew-dyed': 'Equate',
  // Flavor-generic kids. No standalone official Albertsons/Safeway mark.
  'signature-care-children-apap-dyed': 'Signature Care',
  'signature-care-infants-apap-dyefree': 'Signature Care',
  'signature-care-children-ibu-dyed': 'Signature Care',
  'signature-care-children-ibu-chew-dyed': 'Signature Care',
  // Flavor-generic cherry carton. No standalone Family Dollar mark file.
  'family-wellness-childrens-apap': 'Family Wellness',
  // Infants carton is berry (flavor-generic). Liquid gels DailyMed face is minis.
  'dg-health-infants-ibuprofen': 'DG Health',
  'dg-health-ibuprofen-liquid-gels': 'DG Health',
  // Brand-mismatch carton (Amazon Basics) / flavor-generic kids / liqui-gel minis.
  'amazon-basic-care-apap-rs-aurohealth': 'Basic Care',
  'amazon-basic-care-ibuprofen-liqui-gels': 'Basic Care',
  'amazon-basic-care-infants-ibuprofen': 'Basic Care',
  'amazon-basic-care-kids-apap-dyefree': 'Basic Care',
  // Shop PDP photo is Joint Support + Turmeric — not Inflacalm Ache Relief.
  'sprouts-inflacalm-ache-relief': 'Sprouts',
};

function brandMarkImage(brand: string | undefined): ProductImage | undefined {
  if (!brand) return undefined;
  return PREVIEW_BRAND_MARK[brandKey(brand)];
}

// Letter tile when there is no exact SKU overlay and no brand-mark file.
// Not "Image coming". Not a carton. Not verifiedSku.
function brandInitialTile(brand: string | undefined): ProductImage | undefined {
  const letter = (brand ?? '').trim().match(/[A-Za-z0-9]/)?.[0]?.toUpperCase();
  if (!letter) return undefined;
  return brandTextTile(letter);
}

// Same tile language as the letter helper, but the visible string is the
// brand name (or a founder-chosen short form), not the first character.
function brandTextTile(text: string): ProductImage {
  const label = text.trim();
  const svgLabel = label
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const fontSize = label.length <= 1 ? 56 : label.length <= 3 ? 42 : 28;
  // Single-letter baseline stays 72 so unattempted letter tiles do not shift.
  const baseline = label.length <= 1 ? 72 : 76;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">` +
    `<rect width="128" height="128" rx="18" fill="#f4f1ea"/>` +
    `<text x="64" y="${baseline}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" ` +
    `font-size="${fontSize}" font-weight="700" fill="#2d4a3e">${svgLabel}</text>` +
    `</svg>`;
  return {
    url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    source: 'catalog',
    verifiedSku: false,
  };
}

const PREVIEW_IMAGE_OVERLAY: Record<string, ProductImage> = {
  [PREVIEW_CLEAN_ID]: catalogShot('phillips-mom-original.jpg'),
  [PREVIEW_USABLE_ID]: catalogShot('alka-seltzer-gold.jpg'),
  [PREVIEW_AVOID_ID]: catalogShot('tums-ultra-fruit-dyed.jpg'),
  'boiron-acidcalm': catalogShot('boiron-acidcalm.jpg'),
  'boiron-nauseacalm': catalogShot('boiron-nauseacalm.jpg'),
  'boiron-motioncalm': catalogShot('boiron-motioncalm.jpg'),
  'rolaids-ultra-mint': catalogShot('rolaids-ultra-mint.jpg'),
  'phillips-mom-mint': catalogShot('phillips-mom-mint.jpg'),
  'phillips-mom-cherry': catalogShot('phillips-mom-cherry.jpg'),
  'gaviscon-es-cool-mint': catalogShot('gaviscon-es-cool-mint.jpg'),
  'gaviscon-es-tablets': catalogShot('gaviscon-es-tablets.jpg'),
  'gaviscon-rs-liquid-dyed': catalogShot('gaviscon-rs-liquid-dyed.jpg'),
  'gaviscon-es-tablets-cherry': catalogShot('gaviscon-es-tablets-cherry.jpg'),
  'rolaids-assorted-dyed': catalogShot('rolaids-assorted-dyed.jpg'),
  'tums-smoothies': catalogShot('tums-smoothies.jpg'),
  'imodium-ad-caplets': catalogShot('imodium-ad-caplets.jpg'),
  'pepcid-ac': catalogShot('pepcid-ac.jpg'),
  'pepcid-max': catalogShot('pepcid-max.jpg'),
  'imodium-ad-softgels': catalogShot('imodium-ad-softgels.jpg'),
  'imodium-ad-liquid': catalogShot('imodium-ad-liquid.jpg'),
  'imodium-multi-symptom': catalogShot('imodium-multi-symptom.jpg'),
  'pepcid-icy-cool-mint': catalogShot('pepcid-icy-cool-mint.jpg'),
  'equate-famotidine': catalogShot('equate-famotidine.jpg'),
  'prilosec-otc': catalogShot('prilosec-otc.jpg'),
  'gasx-max-softgels': catalogShot('gasx-max-softgels.jpg'),
  'gasx-ultimate-softgels': catalogShot('gasx-ultimate-softgels.jpg'),
  'phazyme-fast-gels': catalogShot('phazyme-fast-gels.jpg'),
  'dramamine-less-drowsy': catalogShot('dramamine-less-drowsy.jpg'),
  'dramamine-chewable-orange': catalogShot('dramamine-chewable-orange.jpg'),
  'bonine': catalogShot('bonine.jpg'),
  'emetrol-liquid-cherry': catalogShot('emetrol-liquid-cherry.jpg'),
  'pepto-bismol-caplets': catalogShot('pepto-bismol-caplets.jpg'),
  'mylanta-gas-minis': catalogShot('mylanta-gas-minis.jpg'),
  'upup-digestive-relief': catalogShot('upup-digestive-relief.jpg'),
  'boiron-gasalia-meltaways': catalogShot('boiron-gasalia-meltaways.jpg'),
  'boiron-gasalia-pellets': catalogShot('boiron-gasalia-pellets.jpg'),
  'genexa-kids-tummy-relief': catalogShot('genexa-kids-tummy-relief.jpg'),
  'little-remedies-gas-drops': catalogShot('little-remedies-gas-drops.jpg'),
  'pepto-kids': catalogShot('pepto-kids.jpg'),
  'mylicon-tummy-relief-chew': catalogShot('mylicon-tummy-relief-chew.jpg'),
  'mylicon-all-in-one-liquid': catalogShot('mylicon-all-in-one-liquid.jpg'),
  'mylicon-infants-original': catalogShot('mylicon-infants-original.jpg'),
  'mylicon-infants-dyefree': catalogShot('mylicon-infants-dyefree.jpg'),
  'cvs-infants-gas-dyefree': catalogShot('cvs-infants-gas-dyefree.jpg'),
  'walgreens-infants-gas-dyefree': catalogShot('walgreens-infants-gas-dyefree.jpg'),
  'dramamine-for-kids': catalogShot('dramamine-for-kids.jpg'),
  '365-antacid-peppermint-ultra': catalogShot('365-antacid-peppermint-ultra.jpg'),
  'amazon-basics-clearlax-unflavored': catalogShot('amazon-basics-clearlax-unflavored.jpg'),
  'pedialyte-classic-unflavored': catalogShot('pedialyte-classic-unflavored.jpg'),
  'topcare-esomeprazole-20': catalogShot('topcare-esomeprazole-20.jpg'),
  'assured-gas-relief-es': catalogShot('assured-gas-relief-es.jpg'),
  'dg-health-omeprazole-dr': catalogShot('dg-health-omeprazole-dr.jpg'),
  'amazon-basic-care-omeprazole': catalogShot('amazon-basic-care-omeprazole.jpg'),
  'amazon-basic-care-famotidine': catalogShot('amazon-basic-care-famotidine.jpg'),
  'amazon-basic-care-esomeprazole': catalogShot('amazon-basic-care-esomeprazole.jpg'),
  'amazon-basics-clearlax-orange': catalogShot('amazon-basics-clearlax-orange.jpg'),
  'gasx-es-chewables': catalogShot('gasx-es-chewables.jpg'),
  'pepto-bismol-liquid': catalogShot('pepto-bismol-liquid.jpg'),
  'pepto-bismol-chewables': catalogShot('pepto-bismol-chewables.jpg'),
  'pedialyte-freezer-pops': catalogShot('pedialyte-freezer-pops.jpg'),
  'culturelle-digestive-daily': catalogShot('culturelle-digestive-daily.jpg'),
  'align-daily-probiotic': catalogShot('align-daily-probiotic.jpg'),
  'tylenol-es-caplets': catalogShot('tylenol-es-caplets.jpg'),
  'tylenol-es-rapid-release-gels': catalogShot('tylenol-es-rapid-release-gels.jpg'),
  'tylenol-es-liquid-gels': catalogShot('tylenol-es-liquid-gels.jpg'),
  'tylenol-rs-tablets-plain': catalogShot('tylenol-rs-tablets-plain.jpg'),
  'tylenol-8hr-peg': catalogShot('tylenol-8hr-peg.jpg'),
  'tylenol-8hr-tio2': catalogShot('tylenol-8hr-tio2.jpg'),
  'genexa-acetaminophen-es': catalogShot('genexa-acetaminophen-es.jpg'),
  'kirkland-acetaminophen-es': catalogShot('kirkland-acetaminophen-es.jpg'),
  'wf-365-acetaminophen-es': catalogShot('wf-365-acetaminophen-es.jpg'),
  'cvs-health-es-castor': catalogShot('cvs-health-es-castor.jpg'),
  'cvs-health-es-red40-tio2': catalogShot('cvs-health-es-red40-tio2.jpg'),
  'walgreens-es-mineral-oil': catalogShot('walgreens-es-mineral-oil.jpg'),
  'advil-tablets': catalogShot('advil-tablets.jpg'),
  'advil-gel-caplets': catalogShot('advil-gel-caplets.jpg'),
  'advil-dual-action': catalogShot('advil-dual-action.jpg'),
  'motrin-ib-caplets': catalogShot('motrin-ib-caplets.jpg'),
  'equate-ibuprofen-dye-free': catalogShot('equate-ibuprofen-dye-free.jpg'),
  'cvs-health-ibuprofen-dye-free': catalogShot('cvs-health-ibuprofen-dye-free.jpg'),
  'walgreens-ibuprofen-dye-free': catalogShot('walgreens-ibuprofen-dye-free.jpg'),
  'equate-es-pain-reliever': catalogShot('equate-es-pain-reliever.jpg'),
  'members-mark-acetaminophen-es': catalogShot('members-mark-acetaminophen-es.jpg'),
  'signature-care-pain-relief-apap': catalogShot('signature-care-pain-relief-apap.jpg'),
  'equate-ibuprofen-standard': catalogShot('equate-ibuprofen-standard.jpg'),
  'kirkland-ibuprofen-tablets': catalogShot('kirkland-ibuprofen-tablets.jpg'),
  'kirkland-ibuprofen-ib-caplets': catalogShot('kirkland-ibuprofen-ib-caplets.jpg'),
  'upup-ibuprofen': catalogShot('upup-ibuprofen.jpg'),
  'signature-care-ibuprofen': catalogShot('signature-care-ibuprofen.jpg'),
  'members-mark-ibuprofen': catalogShot('members-mark-ibuprofen.jpg'),
  'junior-strength-advil': catalogShot('junior-strength-advil.jpg'),
  'childrens-advil-suspension': catalogShot('childrens-advil-suspension.jpg'),
  'childrens-advil-suspension-dyefree': catalogShot('childrens-advil-suspension-dyefree.jpg'),
  'cvs-children-apap-dyed': catalogShot('cvs-children-apap-dyed.jpg'),
  '365-ibuprofen-200-tio2': catalogShot('365-ibuprofen-200-tio2.jpg'),
  'topcare-es-pain-relief-softgels': catalogShot('topcare-es-pain-relief-softgels.jpg'),
  'topcare-es-pain-relief-tablets': catalogShot('topcare-es-pain-relief-tablets.jpg'),
  'topcare-ibuprofen-caplets': catalogShot('topcare-ibuprofen-caplets.jpg'),
  'topcare-dual-action': catalogShot('topcare-dual-action.jpg'),
  'family-wellness-es-apap-caplets': catalogShot('family-wellness-es-apap-caplets.jpg'),
  'rexall-pain-relief-apap': catalogShot('rexall-pain-relief-apap.jpg'),
  'assured-ibuprofen-200': catalogShot('assured-ibuprofen-200.jpg'),
  'dg-health-ibuprofen-tablets': catalogShot('dg-health-ibuprofen-tablets.jpg'),
  'dg-health-apap-dyed': catalogShot('dg-health-apap-dyed.jpg'),
  'basic-care-apap-rs-l403': catalogShot('basic-care-apap-rs-l403.jpg'),
  'amazon-basic-care-apap-es-aurohealth': catalogShot('amazon-basic-care-apap-es-aurohealth.jpg'),
  'amazon-basic-care-ibuprofen-tio2': catalogShot('amazon-basic-care-ibuprofen-tio2.jpg'),
  'amazon-basic-care-ibuprofen-dyed-talc': catalogShot('amazon-basic-care-ibuprofen-dyed-talc.jpg'),
  'amazon-basic-care-dual-action': catalogShot('amazon-basic-care-dual-action.jpg'),
  'amazon-basics-apap-rapid-release': catalogShot('amazon-basics-apap-rapid-release.jpg'),
  'amazon-basic-care-es-apap-l484': catalogShot('amazon-basic-care-es-apap-l484.jpg'),
  'hylands-arnica-30x': catalogShot('hylands-arnica-30x.jpg'),
  'hylands-ferrum-phos-6x': catalogShot('hylands-ferrum-phos-6x.jpg'),
  'hylands-leg-cramps': catalogShot('hylands-leg-cramps.jpg'),
  'boiron-cyclease-cramps': catalogShot('boiron-cyclease-cramps.jpg'),
  'genexa-arnica-pain': catalogShot('genexa-arnica-pain.jpg'),
  'amazon-basic-care-naproxen-blue2-tio2': catalogShot('amazon-basic-care-naproxen-blue2-tio2.jpg'),
  'boiron-cyclease-pms': catalogShot('boiron-cyclease-pms.jpg'),
  'boiron-cyclease-menopause': catalogShot('boiron-cyclease-menopause.jpg'),
  'boiron-arnicare-tablets': catalogShot('boiron-arnicare-tablets.jpg'),
  'boiron-arnicare-arthritis-tablets': catalogShot('boiron-arnicare-arthritis-tablets.jpg'),
  'boiron-camilia': catalogShot('boiron-camilia.jpg'),
  'boiron-arnicare-arthritis-cream': catalogShot('boiron-arnicare-arthritis-cream.jpg'),
  'boiron-arnica-30x-tablets': catalogShot('boiron-arnica-30x-tablets.jpg'),
  'boiron-arnica-30c-pellets': catalogShot('boiron-arnica-30c-pellets.jpg'),
  'hylands-mag-phos-6x': catalogShot('hylands-mag-phos-6x.jpg'),
  'hylands-calc-phos-6x': catalogShot('hylands-calc-phos-6x.jpg'),
  'hylands-leg-cramps-pm': catalogShot('hylands-leg-cramps-pm.jpg'),
  'hylands-leg-cramps-arnica-caplets': catalogShot('hylands-leg-cramps-arnica-caplets.jpg'),
  'hylands-restful-legs': catalogShot('hylands-restful-legs.jpg'),
  'hylands-restful-legs-pm': catalogShot('hylands-restful-legs-pm.jpg'),
  'hylands-baby-oral-pain-day': catalogShot('hylands-baby-oral-pain-day.jpg'),
  'hylands-baby-oral-pain-night': catalogShot('hylands-baby-oral-pain-night.jpg'),
  'sprouts-inflacalm-powder-cap': catalogShot('sprouts-inflacalm-powder-cap.jpg'),
  'hylands-leg-cramps-arnica-cream': catalogShot('hylands-leg-cramps-arnica-cream.jpg'),
  'hylands-leg-cramps-arnica-pm-cream': catalogShot('hylands-leg-cramps-arnica-pm-cream.jpg'),
  'hylands-organic-baby-soothing-gel-day': catalogShot('hylands-organic-baby-soothing-gel-day.jpg'),
  'hylands-organic-baby-soothing-gel-night': catalogShot('hylands-organic-baby-soothing-gel-night.jpg'),
  'hylands-organic-baby-soothing-drops-day': catalogShot('hylands-organic-baby-soothing-drops-day.jpg'),
  'hylands-organic-baby-soothing-drops-night': catalogShot('hylands-organic-baby-soothing-drops-night.jpg'),
  'boiron-belladonna-pellets': catalogShot('boiron-belladonna-pellets.jpg'),
  'boiron-chamomilla-pellets': catalogShot('boiron-chamomilla-pellets.jpg'),
  'boiron-calcarea-carbonica-pellets': catalogShot('boiron-calcarea-carbonica-pellets.jpg'),
  'boiron-cuprum-metallicum-pellets': catalogShot('boiron-cuprum-metallicum-pellets.jpg'),
  'boiron-natrum-muriaticum-pellets': catalogShot('boiron-natrum-muriaticum-pellets.jpg'),
  'boiron-arnicamontanaradix-pellets': catalogShot('boiron-arnicamontanaradix-pellets.jpg'),
  'boiron-antimonium-crudum-pellets': catalogShot('boiron-antimonium-crudum-pellets.jpg'),
  'boiron-argentum-nitricum-pellets': catalogShot('boiron-argentum-nitricum-pellets.jpg'),
  'boiron-colchicumautumnale-pellets': catalogShot('boiron-colchicumautumnale-pellets.jpg'),
  'boiron-calcarea-fluorica-pellets': catalogShot('boiron-calcarea-fluorica-pellets.jpg'),
  'boiron-kali-carbonicum-pellets': catalogShot('boiron-kali-carbonicum-pellets.jpg'),
  'boiron-borax-pellets': catalogShot('boiron-borax-pellets.jpg'),
  'boiron-cina-pellets': catalogShot('boiron-cina-pellets.jpg'),
  'boiron-ferrummetallicum-pellets': catalogShot('boiron-ferrummetallicum-pellets.jpg'),
};

// Tile lookup: exact SKU overlay → per-id mark or brand-name text tile →
// brand-level mark → brand-initial tile. Exact pack shot always wins.
// Marks and text tiles are not cartons and are never verifiedSku.
export function previewOverlayImage(
  record: Pick<RatingRecord, 'id' | 'formulaId' | 'brand'>,
): ProductImage | undefined {
  const fromId = PREVIEW_IMAGE_OVERLAY[record.id];
  if (fromId) return fromId;
  if (record.formulaId && record.formulaId !== record.id) {
    const fromFormula = PREVIEW_IMAGE_OVERLAY[record.formulaId];
    if (fromFormula) return fromFormula;
  }
  const idText = PREVIEW_ID_BRAND_TEXT[record.id];
  if (idText) return brandTextTile(idText);
  return (
    PREVIEW_ID_BRAND_MARK[record.id]
    ?? brandMarkImage(record.brand)
    ?? brandInitialTile(record.brand)
  );
}

function withPreviewHonestNote(record: RatingRecord): RatingRecord {
  const honestNote = PREVIEW_HONEST_NOTE_OVERLAY[record.id];
  const productImage = previewOverlayImage(record);
  if (!honestNote && !productImage) return record;
  return {
    ...record,
    ...(honestNote ? { honestNote } : {}),
    ...(productImage ? { productImage } : {}),
  };
}

if (PREVIEW_CLEAN.verdict !== 'clean') {
  throw new Error('phillips-mom-original must stay verdict clean');
}
if (PREVIEW_USABLE.verdict !== 'caution') {
  throw new Error('alka-seltzer-gold must stay verdict caution');
}
if (PREVIEW_AVOID.verdict !== 'avoid') {
  throw new Error('tums-ultra-fruit-dyed must stay verdict avoid');
}

function assertBrandMark(id: string, brand: string, file: string) {
  const image = previewOverlayImage({ id, formulaId: id, brand });
  if (!image?.url.endsWith(`/${file}`)) {
    throw new Error(`${id} must fall back to brand mark ${file}`);
  }
  if (image.verifiedSku) {
    throw new Error(`${id} brand mark must not set verifiedSku`);
  }
}

assertBrandMark('tums-chewy-bites', 'Tums', 'tums-mark.png');
assertBrandMark('emetrol-chewables', 'Emetrol', 'emetrol-mark.png');
assertBrandMark('nauzene-chewables', 'Nauzene', 'nauzene-mark.png');
assertBrandMark('culturelle-kids-packets', 'Culturelle', 'culturelle-mark.png');
assertBrandMark('culturelle-kids-gummies-coconut', 'Culturelle', 'culturelle-mark.png');
assertBrandMark('pedialyte-classic-flavored', 'Pedialyte', 'pedialyte-mark.png');
assertBrandMark('pure-encapsulations-probiotic-gi', 'Pure Encapsulations', 'pure-encapsulations-mark.png');
assertBrandMark('pure-encapsulations-probiotic-5', 'Pure Encapsulations', 'pure-encapsulations-mark.png');
assertBrandMark('thorne-floramend-prime-probiotic', 'Thorne', 'thorne-mark.png');
assertBrandMark('we-heart-wholesome-probiotic', 'We Heart Nutrition', 'we-heart-mark.png');
assertBrandMark('thrive-wellmade-womens-daily-probiotic', 'wellmade by Thrive Market', 'wellmade-mark.png');
assertBrandMark('thrive-wellmade-mens-daily-probiotic', 'wellmade by Thrive Market', 'wellmade-mark.png');
assertBrandMark('thrive-wellmade-kids-chewable-probiotic', 'wellmade by Thrive Market', 'wellmade-mark.png');
assertBrandMark('tylenol-rs-caplets', 'Tylenol', 'tylenol-mark.png');
assertBrandMark('tylenol-children-liquid-dyed', 'Tylenol', 'tylenol-mark.png');
assertBrandMark('tylenol-children-liquid-dyefree', 'Tylenol', 'tylenol-mark.png');
assertBrandMark('tylenol-infants-liquid-dyed', 'Tylenol', 'tylenol-mark.png');
assertBrandMark('tylenol-infants-liquid-dyefree', 'Tylenol', 'tylenol-mark.png');
assertBrandMark('tylenol-children-chew-dyefree', 'Tylenol', 'tylenol-mark.png');
assertBrandMark('genexa-kids-apap-liquid', 'Genexa', 'genexa-mark.png');
assertBrandMark('genexa-infants-apap-liquid', 'Genexa', 'genexa-mark.png');
assertBrandMark('genexa-kids-apap-chewable', 'Genexa', 'genexa-mark.png');
assertBrandMark('walgreens-es-red40-tio2', 'Walgreens', 'walgreens-mark.png');
assertBrandMark('walgreens-es-dyes-talc', 'Walgreens', 'walgreens-mark.png');
assertBrandMark('advil-liqui-gels', 'Advil', 'advil-mark.png');
assertBrandMark('motrin-children-liquid-dyed', 'Motrin', 'motrin-mark.png');
assertBrandMark('motrin-children-liquid-dyefree', 'Motrin', 'motrin-mark.png');
assertBrandMark('motrin-children-chew-dyefree', 'Motrin', 'motrin-mark.png');
assertBrandMark('motrin-children-chew-dyed', 'Motrin', 'motrin-mark.png');
assertBrandMark('motrin-infants-liquid-dyed', 'Motrin', 'motrin-mark.png');
assertBrandMark('topcare-ibuprofen-liquid-gels', 'TopCare', 'topcare-mark.png');
assertBrandMark('boiron-arnicare-leg-cramps', 'Boiron', 'boiron-mark.png');

function assertLetterOnly(id: string, brand: string) {
  const image = previewOverlayImage({ id, formulaId: id, brand });
  if (!image?.url.startsWith('data:image/svg+xml')) {
    throw new Error(`${id} must stay on the letter tile`);
  }
  const letter = brand.trim().match(/[A-Za-z0-9]/)?.[0]?.toUpperCase();
  const decoded = decodeURIComponent(
    image.url.replace('data:image/svg+xml;charset=utf-8,', ''),
  );
  if (letter && !decoded.includes(`>${letter}</text>`)) {
    throw new Error(`${id} must stay on the single-letter "${letter}" tile`);
  }
  if (image.verifiedSku) {
    throw new Error(`${id} letter tile must not set verifiedSku`);
  }
}

function assertBrandTextTile(id: string, brand: string, text: string) {
  const image = previewOverlayImage({ id, formulaId: id, brand });
  if (!image?.url.startsWith('data:image/svg+xml')) {
    throw new Error(`${id} must use a brand-name text tile`);
  }
  const encoded = image.url.replace('data:image/svg+xml;charset=utf-8,', '');
  const decoded = decodeURIComponent(encoded);
  const svgText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  if (!decoded.includes(`>${svgText}</text>`)) {
    throw new Error(`${id} text tile must show "${text}", not a single letter`);
  }
  if (image.verifiedSku) {
    throw new Error(`${id} text tile must not set verifiedSku`);
  }
}

assertBrandTextTile(
  '365-probiotic-fiber-gummies-sunflower',
  '365 Whole Foods Market',
  '365',
);
assertBrandTextTile('upup-es-red40-tio2', 'up&up', 'up&up');
assertBrandTextTile('upup-children-apap-dyed', 'up&up', 'up&up');
assertBrandTextTile('upup-infants-apap-dyefree', 'up&up', 'up&up');
assertBrandTextTile('upup-children-apap-dyefree', 'up&up', 'up&up');
assertBrandTextTile('upup-children-ibu-dyed', 'up&up', 'up&up');
assertBrandTextTile('upup-children-ibu-chew-dyed', 'up&up', 'up&up');
assertBrandTextTile('upup-infants-ibu-dyefree', 'up&up', 'up&up');
assertBrandTextTile('upup-children-ibu-dyefree-liquid', 'up&up', 'up&up');
assertBrandTextTile('equate-children-apap-dyed', 'Equate', 'Equate');
assertBrandTextTile('equate-infants-apap-dyefree', 'Equate', 'Equate');
assertBrandTextTile('equate-children-ibu-dyed', 'Equate', 'Equate');
assertBrandTextTile('equate-children-ibu-chew-dyed', 'Equate', 'Equate');
assertBrandTextTile('signature-care-children-apap-dyed', 'Signature Care', 'Signature Care');
assertBrandTextTile('signature-care-infants-apap-dyefree', 'Signature Care', 'Signature Care');
assertBrandTextTile('signature-care-children-ibu-dyed', 'Signature Care', 'Signature Care');
assertBrandTextTile('signature-care-children-ibu-chew-dyed', 'Signature Care', 'Signature Care');
assertBrandTextTile('family-wellness-childrens-apap', 'Family Wellness', 'Family Wellness');
assertBrandTextTile('dg-health-infants-ibuprofen', 'DG Health', 'DG Health');
assertBrandTextTile('dg-health-ibuprofen-liquid-gels', 'DG Health', 'DG Health');
assertBrandTextTile('amazon-basic-care-apap-rs-aurohealth', 'Amazon Basic Care', 'Basic Care');
assertBrandTextTile('amazon-basic-care-ibuprofen-liqui-gels', 'Amazon Basic Care', 'Basic Care');
assertBrandTextTile('amazon-basic-care-infants-ibuprofen', 'Amazon Basic Care', 'Basic Care');
assertBrandTextTile('amazon-basic-care-kids-apap-dyefree', 'Amazon Basic Care', 'Basic Care');
assertBrandTextTile('sprouts-inflacalm-ache-relief', 'Sprouts', 'Sprouts');
assertLetterOnly('365-elderberry-gummies', '365 Whole Foods Market');
assertLetterOnly('thorne-basic-prenatal', 'Thorne');
assertLetterOnly('we-heart-wholesome-womens-multi', 'We Heart Nutrition');
// Unattempted other-aisle rows stay letters. Marks are per-id only.
assertLetterOnly('tylenol-pm-es', 'Tylenol');
assertLetterOnly('advil-pm-liquigels', 'Advil');
assertLetterOnly('walgreens-prenatal-coated', 'Walgreens');
assertLetterOnly('upup-mucus-relief-600-blue', 'up&up');
assertLetterOnly('equate-mucus-er-600', 'Equate');
assertLetterOnly('signature-care-daytime-severe', 'Signature Care');
assertLetterOnly('family-wellness-loratadine-10', 'Family Wellness');
assertLetterOnly('dg-health-loratadine-tablets', 'DG Health');
assertLetterOnly('amazon-basic-care-loratadine-l612', 'Amazon Basic Care');
assertLetterOnly('topcare-allergy-relief-loratadine', 'TopCare');
assertLetterOnly('coldcalm-meltaways', 'Boiron');
assertLetterOnly('sprouts-bronchial-syrup', 'Sprouts');

function assertExactCarton(id: string, brand: string, file: string) {
  const image = previewOverlayImage({ id, formulaId: id, brand });
  if (!image?.url.endsWith(`/${file}`) || !image.verifiedSku) {
    throw new Error(`${id} founder-link carton ${file} must stay the exact overlay`);
  }
}

assertExactCarton('gasx-es-chewables', 'Gas-X', 'gasx-es-chewables.jpg');
assertExactCarton('pepto-bismol-liquid', 'Pepto-Bismol', 'pepto-bismol-liquid.jpg');
assertExactCarton('pepto-bismol-chewables', 'Pepto-Bismol', 'pepto-bismol-chewables.jpg');
assertExactCarton('pedialyte-freezer-pops', 'Pedialyte', 'pedialyte-freezer-pops.jpg');
assertExactCarton('culturelle-digestive-daily', 'Culturelle', 'culturelle-digestive-daily.jpg');
assertExactCarton('align-daily-probiotic', 'Align', 'align-daily-probiotic.jpg');
assertExactCarton('tylenol-es-caplets', 'Tylenol', 'tylenol-es-caplets.jpg');
assertExactCarton('tylenol-es-rapid-release-gels', 'Tylenol', 'tylenol-es-rapid-release-gels.jpg');
assertExactCarton('tylenol-es-liquid-gels', 'Tylenol', 'tylenol-es-liquid-gels.jpg');
assertExactCarton('tylenol-rs-tablets-plain', 'Tylenol', 'tylenol-rs-tablets-plain.jpg');
assertExactCarton('tylenol-8hr-peg', 'Tylenol', 'tylenol-8hr-peg.jpg');
assertExactCarton('tylenol-8hr-tio2', 'Tylenol', 'tylenol-8hr-tio2.jpg');
assertExactCarton('genexa-acetaminophen-es', 'Genexa', 'genexa-acetaminophen-es.jpg');
assertExactCarton('kirkland-acetaminophen-es', 'Kirkland Signature', 'kirkland-acetaminophen-es.jpg');
assertExactCarton('wf-365-acetaminophen-es', '365 Whole Foods Market', 'wf-365-acetaminophen-es.jpg');
assertExactCarton('cvs-health-es-castor', 'CVS Health', 'cvs-health-es-castor.jpg');
assertExactCarton('cvs-health-es-red40-tio2', 'CVS Health', 'cvs-health-es-red40-tio2.jpg');
assertExactCarton('walgreens-es-mineral-oil', 'Walgreens', 'walgreens-es-mineral-oil.jpg');
assertExactCarton('advil-tablets', 'Advil', 'advil-tablets.jpg');
assertExactCarton('advil-gel-caplets', 'Advil', 'advil-gel-caplets.jpg');
assertExactCarton('advil-dual-action', 'Advil', 'advil-dual-action.jpg');
assertExactCarton('motrin-ib-caplets', 'Motrin', 'motrin-ib-caplets.jpg');
assertExactCarton('equate-ibuprofen-dye-free', 'Equate', 'equate-ibuprofen-dye-free.jpg');
assertExactCarton('cvs-health-ibuprofen-dye-free', 'CVS Health', 'cvs-health-ibuprofen-dye-free.jpg');
assertExactCarton('walgreens-ibuprofen-dye-free', 'Walgreens', 'walgreens-ibuprofen-dye-free.jpg');
assertExactCarton('equate-es-pain-reliever', 'Equate', 'equate-es-pain-reliever.jpg');
assertExactCarton('members-mark-acetaminophen-es', "Member's Mark", 'members-mark-acetaminophen-es.jpg');
assertExactCarton('signature-care-pain-relief-apap', 'Signature Care', 'signature-care-pain-relief-apap.jpg');
assertExactCarton('equate-ibuprofen-standard', 'Equate', 'equate-ibuprofen-standard.jpg');
assertExactCarton('kirkland-ibuprofen-tablets', 'Kirkland Signature', 'kirkland-ibuprofen-tablets.jpg');
assertExactCarton('kirkland-ibuprofen-ib-caplets', 'Kirkland Signature', 'kirkland-ibuprofen-ib-caplets.jpg');
assertExactCarton('upup-ibuprofen', 'up&up', 'upup-ibuprofen.jpg');
assertExactCarton('signature-care-ibuprofen', 'Signature Care', 'signature-care-ibuprofen.jpg');
assertExactCarton('members-mark-ibuprofen', "Member's Mark", 'members-mark-ibuprofen.jpg');
assertExactCarton('junior-strength-advil', 'Advil', 'junior-strength-advil.jpg');
assertExactCarton('childrens-advil-suspension', 'Advil', 'childrens-advil-suspension.jpg');
assertExactCarton('childrens-advil-suspension-dyefree', 'Advil', 'childrens-advil-suspension-dyefree.jpg');
assertExactCarton('cvs-children-apap-dyed', 'CVS Health', 'cvs-children-apap-dyed.jpg');
assertExactCarton('365-ibuprofen-200-tio2', '365 Whole Foods Market', '365-ibuprofen-200-tio2.jpg');
assertExactCarton('topcare-es-pain-relief-softgels', 'TopCare', 'topcare-es-pain-relief-softgels.jpg');
assertExactCarton('topcare-es-pain-relief-tablets', 'TopCare', 'topcare-es-pain-relief-tablets.jpg');
assertExactCarton('topcare-ibuprofen-caplets', 'TopCare', 'topcare-ibuprofen-caplets.jpg');
assertExactCarton('topcare-dual-action', 'TopCare', 'topcare-dual-action.jpg');
assertExactCarton('family-wellness-es-apap-caplets', 'Family Wellness', 'family-wellness-es-apap-caplets.jpg');
assertExactCarton('rexall-pain-relief-apap', 'Rexall', 'rexall-pain-relief-apap.jpg');
assertExactCarton('assured-ibuprofen-200', 'Assured', 'assured-ibuprofen-200.jpg');
assertExactCarton('dg-health-ibuprofen-tablets', 'DG Health', 'dg-health-ibuprofen-tablets.jpg');
assertExactCarton('dg-health-apap-dyed', 'DG Health', 'dg-health-apap-dyed.jpg');
assertExactCarton('basic-care-apap-rs-l403', 'Amazon Basic Care', 'basic-care-apap-rs-l403.jpg');
assertExactCarton('amazon-basic-care-apap-es-aurohealth', 'Amazon Basic Care', 'amazon-basic-care-apap-es-aurohealth.jpg');
assertExactCarton('amazon-basic-care-ibuprofen-tio2', 'Amazon Basic Care', 'amazon-basic-care-ibuprofen-tio2.jpg');
assertExactCarton('amazon-basic-care-ibuprofen-dyed-talc', 'Amazon Basic Care', 'amazon-basic-care-ibuprofen-dyed-talc.jpg');
assertExactCarton('amazon-basic-care-dual-action', 'Amazon Basic Care', 'amazon-basic-care-dual-action.jpg');
assertExactCarton('amazon-basics-apap-rapid-release', 'Amazon Basics', 'amazon-basics-apap-rapid-release.jpg');
assertExactCarton('amazon-basic-care-es-apap-l484', 'Amazon Basic Care', 'amazon-basic-care-es-apap-l484.jpg');
assertExactCarton('hylands-arnica-30x', "Hyland's", 'hylands-arnica-30x.jpg');
assertExactCarton('hylands-ferrum-phos-6x', "Hyland's", 'hylands-ferrum-phos-6x.jpg');
assertExactCarton('hylands-leg-cramps', "Hyland's", 'hylands-leg-cramps.jpg');
assertExactCarton('boiron-cyclease-cramps', 'Boiron', 'boiron-cyclease-cramps.jpg');
assertExactCarton('genexa-arnica-pain', 'Genexa', 'genexa-arnica-pain.jpg');
assertExactCarton('amazon-basic-care-naproxen-blue2-tio2', 'Amazon Basic Care', 'amazon-basic-care-naproxen-blue2-tio2.jpg');
assertExactCarton('boiron-cyclease-pms', 'Boiron', 'boiron-cyclease-pms.jpg');
assertExactCarton('boiron-cyclease-menopause', 'Boiron', 'boiron-cyclease-menopause.jpg');
assertExactCarton('boiron-arnicare-tablets', 'Boiron', 'boiron-arnicare-tablets.jpg');
assertExactCarton('boiron-arnicare-arthritis-tablets', 'Boiron', 'boiron-arnicare-arthritis-tablets.jpg');
assertExactCarton('boiron-camilia', 'Boiron', 'boiron-camilia.jpg');
assertExactCarton('boiron-arnicare-arthritis-cream', 'Boiron', 'boiron-arnicare-arthritis-cream.jpg');
assertExactCarton('boiron-arnica-30x-tablets', 'Boiron', 'boiron-arnica-30x-tablets.jpg');
assertExactCarton('boiron-arnica-30c-pellets', 'Boiron', 'boiron-arnica-30c-pellets.jpg');
assertExactCarton('hylands-mag-phos-6x', "Hyland's", 'hylands-mag-phos-6x.jpg');
assertExactCarton('hylands-calc-phos-6x', "Hyland's", 'hylands-calc-phos-6x.jpg');
assertExactCarton('hylands-leg-cramps-pm', "Hyland's", 'hylands-leg-cramps-pm.jpg');
assertExactCarton('hylands-leg-cramps-arnica-caplets', "Hyland's", 'hylands-leg-cramps-arnica-caplets.jpg');
assertExactCarton('hylands-restful-legs', "Hyland's", 'hylands-restful-legs.jpg');
assertExactCarton('hylands-restful-legs-pm', "Hyland's", 'hylands-restful-legs-pm.jpg');
assertExactCarton('hylands-baby-oral-pain-day', "Hyland's", 'hylands-baby-oral-pain-day.jpg');
assertExactCarton('hylands-baby-oral-pain-night', "Hyland's", 'hylands-baby-oral-pain-night.jpg');
assertExactCarton('sprouts-inflacalm-powder-cap', 'Sprouts', 'sprouts-inflacalm-powder-cap.jpg');
assertExactCarton('hylands-leg-cramps-arnica-cream', "Hyland's", 'hylands-leg-cramps-arnica-cream.jpg');
assertExactCarton('hylands-leg-cramps-arnica-pm-cream', "Hyland's", 'hylands-leg-cramps-arnica-pm-cream.jpg');
assertExactCarton('hylands-organic-baby-soothing-gel-day', "Hyland's", 'hylands-organic-baby-soothing-gel-day.jpg');
assertExactCarton('hylands-organic-baby-soothing-gel-night', "Hyland's", 'hylands-organic-baby-soothing-gel-night.jpg');
assertExactCarton('hylands-organic-baby-soothing-drops-day', "Hyland's", 'hylands-organic-baby-soothing-drops-day.jpg');
assertExactCarton('hylands-organic-baby-soothing-drops-night', "Hyland's", 'hylands-organic-baby-soothing-drops-night.jpg');
assertExactCarton('boiron-belladonna-pellets', 'Boiron', 'boiron-belladonna-pellets.jpg');
assertExactCarton('boiron-chamomilla-pellets', 'Boiron', 'boiron-chamomilla-pellets.jpg');
assertExactCarton('boiron-calcarea-carbonica-pellets', 'Boiron', 'boiron-calcarea-carbonica-pellets.jpg');
assertExactCarton('boiron-cuprum-metallicum-pellets', 'Boiron', 'boiron-cuprum-metallicum-pellets.jpg');
assertExactCarton('boiron-natrum-muriaticum-pellets', 'Boiron', 'boiron-natrum-muriaticum-pellets.jpg');
assertExactCarton('boiron-arnicamontanaradix-pellets', 'Boiron', 'boiron-arnicamontanaradix-pellets.jpg');
assertExactCarton('boiron-antimonium-crudum-pellets', 'Boiron', 'boiron-antimonium-crudum-pellets.jpg');
assertExactCarton('boiron-argentum-nitricum-pellets', 'Boiron', 'boiron-argentum-nitricum-pellets.jpg');
assertExactCarton('boiron-colchicumautumnale-pellets', 'Boiron', 'boiron-colchicumautumnale-pellets.jpg');
assertExactCarton('boiron-calcarea-fluorica-pellets', 'Boiron', 'boiron-calcarea-fluorica-pellets.jpg');
assertExactCarton('boiron-kali-carbonicum-pellets', 'Boiron', 'boiron-kali-carbonicum-pellets.jpg');
assertExactCarton('boiron-borax-pellets', 'Boiron', 'boiron-borax-pellets.jpg');
assertExactCarton('boiron-cina-pellets', 'Boiron', 'boiron-cina-pellets.jpg');
assertExactCarton('boiron-ferrummetallicum-pellets', 'Boiron', 'boiron-ferrummetallicum-pellets.jpg');
// Unattempted leftover P&F pellet factory stays letters.
assertLetterOnly('boiron-abelmoschus-pellets', 'Boiron');

const exactWins = previewOverlayImage({
  id: PREVIEW_AVOID_ID,
  formulaId: PREVIEW_AVOID_ID,
  brand: 'Tums',
});
if (!exactWins?.verifiedSku || !exactWins.url.endsWith('/tums-ultra-fruit-dyed.jpg')) {
  throw new Error('exact SKU overlay must win over a brand mark');
}

export type MatchedCleanAlternative = {
  record: RatingRecord;
  rankReason: string;
};

export function findDraftRecord(id: string): RatingRecord | undefined {
  return CATALOG.find((record) => record.id === id)
    ?? CATALOG.find((record) => record.formulaId === id);
}

export function isParkedFromBrowse(id: string | undefined): boolean {
  return isParkedBrowseId(id);
}

// Night-photo jobs: skip parked ids. Do not image this aisle.
export function nightPhotoEligibleDrafts(): RatingRecord[] {
  return BROWSE_CATALOG.map(withPreviewHonestNote);
}

export function loadedPreviewDrafts(): RatingRecord[] {
  return BROWSE_CATALOG.map(withPreviewHonestNote);
}

// Display-side Search tiles/chips only. Do not rewrite draft category strings.
const SEARCH_ALLERGIES_LABEL = 'Allergies';
const SEARCH_PRENATAL_LABEL = 'Prenatal';
const PRENATAL_BATCH_IDS = new Set(BATCH15_PRENATALS.map((record) => record.id));

function prenatalHaystack(record: Pick<RatingRecord, 'id' | 'formulaId' | 'productName' | 'category'>): string {
  return `${record.category} ${record.productName} ${record.id} ${record.formulaId ?? ''}`.toLowerCase();
}

export function isPrenatalDraft(
  record: Pick<RatingRecord, 'id' | 'formulaId' | 'productName' | 'category'>,
): boolean {
  if (PRENATAL_BATCH_IDS.has(record.id)) return true;
  if ((record.category ?? '').trim().toLowerCase() === 'prenatal') return true;
  return prenatalHaystack(record).includes('prenatal');
}

export function displayCategoryForRecord(
  record: Pick<RatingRecord, 'id' | 'formulaId' | 'productName' | 'category'>,
): string | null {
  if (isPrenatalDraft(record)) return SEARCH_PRENATAL_LABEL;
  const raw = record.category?.trim();
  if (!raw) return null;
  const lowered = raw.toLowerCase();
  if (lowered === 'homeopathic') return null;
  if (lowered === 'allergy' || lowered === 'allergies') return SEARCH_ALLERGIES_LABEL;
  if (lowered === 'prenatal') return SEARCH_PRENATAL_LABEL;
  return raw;
}

export type DisplayCategoryGroup = {
  category: string | null;
  records: RatingRecord[];
};

export function groupRecordsByDisplayCategory(records: RatingRecord[]): DisplayCategoryGroup[] {
  const map = new Map<string, RatingRecord[]>();
  const ungrouped: RatingRecord[] = [];
  for (const record of records) {
    const category = displayCategoryForRecord(record);
    if (!category) {
      ungrouped.push(record);
      continue;
    }
    const list = map.get(category) ?? [];
    list.push(record);
    map.set(category, list);
  }
  const groups: DisplayCategoryGroup[] = [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, grouped]) => ({ category, records: grouped }));
  if (ungrouped.length > 0) groups.push({ category: null, records: ungrouped });
  return groups;
}

export function matchesSearchCategory(
  record: Pick<RatingRecord, 'id' | 'formulaId' | 'productName' | 'category'>,
  category: string,
): boolean {
  if (category === SEARCH_ALLERGIES_LABEL) {
    return record.category === 'Allergy' || record.category === 'Allergies';
  }
  if (category === SEARCH_PRENATAL_LABEL) {
    return isPrenatalDraft(record);
  }
  return record.category === category;
}

export function loadedPreviewCategories(): string[] {
  const names = new Set<string>();
  let hasPrenatal = false;
  for (const record of BROWSE_CATALOG) {
    if (isPrenatalDraft(record)) hasPrenatal = true;
    const raw = record.category?.trim();
    if (!raw) continue;
    const lowered = raw.toLowerCase();
    if (lowered === 'homeopathic') continue;
    if (lowered === 'allergy' || lowered === 'allergies') {
      names.add(SEARCH_ALLERGIES_LABEL);
      continue;
    }
    if (lowered === 'prenatal') {
      names.add(SEARCH_PRENATAL_LABEL);
      continue;
    }
    names.add(raw);
  }
  if (hasPrenatal) names.add(SEARCH_PRENATAL_LABEL);
  return [...names].sort((a, b) => a.localeCompare(b));
}

export function getPreviewRecord(id: string | undefined): RatingRecord {
  if (id) {
    const found = findDraftRecord(id);
    if (found) return withPreviewHonestNote(found);
  }
  return withPreviewHonestNote(PREVIEW_CLEAN);
}

export const PREVIEW_CABINET_KEY = 'kyr-scan-preview-cabinet';

type CabinetListener = () => void;
const cabinetListeners = new Set<CabinetListener>();

function emitCabinetChange() {
  cabinetListeners.forEach((listener) => listener());
}

export function loadPreviewCabinetIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PREVIEW_CABINET_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function getPreviewCabinetSnapshot(): string {
  return JSON.stringify(loadPreviewCabinetIds());
}

export function getPreviewCabinetServerSnapshot(): string {
  return '[]';
}

export function subscribePreviewCabinet(listener: CabinetListener): () => void {
  cabinetListeners.add(listener);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', listener);
  }
  return () => {
    cabinetListeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', listener);
    }
  };
}

export function togglePreviewCabinetId(id: string): { ids: string[]; saved: boolean } {
  const current = new Set(loadPreviewCabinetIds());
  const saved = !current.has(id);
  if (saved) current.add(id);
  else current.delete(id);
  const ids = [...current];
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PREVIEW_CABINET_KEY, JSON.stringify(ids));
  }
  emitCabinetChange();
  return { ids, saved };
}

export function recordsForCabinet(ids: string[]): RatingRecord[] {
  const seen = new Set<string>();
  const records: RatingRecord[] = [];
  for (const id of ids) {
    const record = findDraftRecord(id);
    if (!record || seen.has(record.id)) continue;
    if (isParkedBrowseRecord(record)) continue;
    seen.add(record.id);
    records.push(record);
  }
  return records;
}

export const PREVIEW_VIEWED_KEY = 'kyr-scan-preview-viewed';
export const PREVIEW_VIEWED_CAP = 40;

type ViewedListener = () => void;
const viewedListeners = new Set<ViewedListener>();

function emitViewedChange() {
  viewedListeners.forEach((listener) => listener());
}

export function loadPreviewViewedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PREVIEW_VIEWED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function getPreviewViewedSnapshot(): string {
  return JSON.stringify(loadPreviewViewedIds());
}

export function getPreviewViewedServerSnapshot(): string {
  return '[]';
}

export function subscribePreviewViewed(listener: ViewedListener): () => void {
  viewedListeners.add(listener);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', listener);
  }
  return () => {
    viewedListeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', listener);
    }
  };
}

export function rememberPreviewViewedId(id: string): string[] {
  const next = [id, ...loadPreviewViewedIds().filter((existing) => existing !== id)]
    .slice(0, PREVIEW_VIEWED_CAP);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PREVIEW_VIEWED_KEY, JSON.stringify(next));
  }
  emitViewedChange();
  return next;
}

function ageMatches(scanned: RatingRecord, alt: RatingRecord): boolean {
  if (scanned.minAge == null || alt.minAge == null) return true;
  // Required: never recommend a higher minimum-age swap.
  return alt.minAge <= scanned.minAge;
}

export function matchCleanAlternatives(
  scanned: RatingRecord,
): MatchedCleanAlternative[] {
  const refs = scanned.cleanAlternatives ?? [];
  const matched: MatchedCleanAlternative[] = [];

  for (const ref of refs) {
    const alt = findDraftRecord(ref.productId);
    if (!alt) continue;
    if (isParkedBrowseRecord(alt)) continue;
    // Independently Clean only. Do not invent a Clean. Do not pad with Usable.
    if (alt.verdict !== 'clean') continue;
    if (!ageMatches(scanned, alt)) continue;
    matched.push({ record: alt, rankReason: ref.rankReason });
  }

  // Form is labeled, not a hard filter — same-form first, then draft rank.
  // Audience: kids products prioritize other kids products.
  return matched
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (scanned.audience === 'kids') {
        const kidsA = a.item.record.audience === 'kids' ? 0 : 1;
        const kidsB = b.item.record.audience === 'kids' ? 0 : 1;
        if (kidsA !== kidsB) return kidsA - kidsB;
      }
      const formA =
        scanned.form && a.item.record.form === scanned.form ? 0 : 1;
      const formB =
        scanned.form && b.item.record.form === scanned.form ? 0 : 1;
      if (formA !== formB) return formA - formB;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}

export const NO_CLEANER_MATCH_COPY = 'No cleaner match on this shelf yet';

// Resting gray line — never the word "High" alone.
export function restingRiskLabel(level: RiskLevel): string {
  if (level === 'high') return 'High risk';
  if (level === 'moderate') return 'Moderate risk';
  if (level === 'limited') return 'Limited risk';
  return 'Cleared';
}

// Five flagged-row types only. Short gray labels, not paragraphs.
export type FlagIconKind =
  | 'dye'
  | 'preservative'
  | 'sweetener'
  | 'additive'
  | 'active-safety';

export function ingredientTypeKind(ingredient: IngredientFlag): FlagIconKind {
  const name = normalizeName(ingredient.name);
  const source = (ingredient.source ?? '').toLowerCase();

  if (
    source.includes('synthetic dyes')
    || /fd c|d c|aluminum lake|blue no|red no|yellow no|green no/.test(name)
    || name.includes('dye')
  ) {
    return 'dye';
  }

  if (
    /sorbate|benzoate|paraben/.test(name)
    || source.includes('paraben')
    || source.includes('benzoate')
    || source.includes('sorbate')
  ) {
    return 'preservative';
  }

  if (
    /aspartame|sucralose|saccharin|acesulfame|ace k|mannitol|sorbitol|xylitol|erythritol|maltitol|isomalt/.test(name)
    || source.includes('sugar alcohol')
    || source.includes('mannitol')
    || source.includes('sorbitol')
    || source.includes('sucralose')
    || source.includes('aspartame')
    || source.includes('saccharin')
  ) {
    return 'sweetener';
  }

  return 'additive';
}

export function ingredientTypeLabel(kind: FlagIconKind): string {
  if (kind === 'dye') return 'Synthetic dye';
  if (kind === 'preservative') return 'Preservative';
  if (kind === 'sweetener') return 'Sweetener';
  if (kind === 'active-safety') return 'Active-safety cap';
  return 'Additive';
}

export function restingTypeLine(ingredient: IngredientFlag): string {
  return `${ingredientTypeLabel(ingredientTypeKind(ingredient))} · ${restingRiskLabel(ingredient.riskLevel)}`;
}

export function dailyMedHref(source?: string): string | null {
  if (!source) return null;
  const match = source.match(/DailyMed setid\s+([0-9a-f-]+)/i);
  if (!match) return null;
  return `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${match[1]}`;
}

export type IngredientWhy = {
  body: string;
  sourceName: string | null;
  sourceHref: string | null;
};

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function sourceDisplay(source?: string): Pick<IngredientWhy, 'sourceName' | 'sourceHref'> {
  if (!source) return { sourceName: null, sourceHref: null };
  const sourceHref = dailyMedHref(source);
  if (sourceHref) return { sourceName: 'DailyMed', sourceHref };
  const first = source.split(';').map((part) => part.trim()).find(Boolean);
  return { sourceName: first ?? source, sourceHref: null };
}

// Locked §5 wording + the draft source field. Do not invent studies, %, or grades.
function lockedWhyBody(ingredient: IngredientFlag): string | null {
  const name = normalizeName(ingredient.name);
  const source = (ingredient.source ?? '').toLowerCase();

  if (
    source.includes('synthetic dyes')
    || /fd c|d c|aluminum lake|blue no|red no|yellow no|green no/.test(name)
  ) {
    return 'Synthetic color. Independent reviews link this dye family to hyperactivity warnings in the EU; we score the family High risk, and cleaner formulas exclude it.';
  }

  if (name.includes('talc') || source.includes('talc')) {
    return 'Contains talc (magnesium silicate). IARC classifies talc Group 2A, with a separate asbestos-contamination pathway; we score it High risk, and cleaner formulas exclude it.';
  }

  if (
    name.includes('glycyrrhiza')
    || name.includes('licorice extract')
    || source.includes('that is not this syrup dose')
  ) {
    return 'Licorice extract. Very high intakes of glycyrrhizin can affect blood pressure and potassium — that is not this syrup dose.';
  }

  if (
    ingredient.riskLevel === 'high'
    && (
      name.includes('sunflower oil')
      || source.includes('seed/industrial oils in gummies')
    )
  ) {
    return 'Seed/industrial oils are flagged in gummies. Organic sunflower oil in this gummy is that High rule.';
  }

  if (
    name.includes('mannitol')
    || name.includes('sorbitol')
    || source.includes('mannitol')
    || source.includes('sorbitol')
    || source.includes('sugar alcohols')
  ) {
    return 'Sugar alcohol. Limited risk from GI effects at volume; cleaner formulas exclude it.';
  }

  if (
    (name.includes('rice extract') && !name.includes('bran') && !name.includes('hull') && !name.includes('concentrate'))
    || source.includes('unspecified rice extract')
  ) {
    return 'Label only says rice extract — it doesn’t name hull, bran, or concentrate. We mark that Caution because the form isn’t clear. Named organic rice hull extract, rice concentrate, ground rice hulls, or organic rice bran extract are Cleared.';
  }

  if (
    ingredient.riskLevel === 'limited'
    && (
      (name.includes('citrus') && name.includes('extract'))
      || source.includes('citrus fruit extract')
      || source.includes('natural citrus extract')
    )
  ) {
    return 'Label and DailyMed only say citrus fruit extract. They don’t name lemon, orange, or lime, or juice vs peel. We mark that Caution because the form isn’t clear.';
  }

  if (name.includes('flavor') || source.includes('flavors — opacity') || source.includes('natural / artificial flavors')) {
    return 'Undisclosed flavor mixture. Limited risk for opacity, not a known hazard; cleaner formulas exclude it.';
  }

  if (
    source.includes('flagged in gummies')
    || source.includes('capsule/softgel')
    || source.includes('capsule / softgel')
    || source.includes('in this liquid drop they are not that high rule')
  ) {
    return 'Seed/industrial oils are flagged in gummies. In this capsule/softgel/drop fill they are not that High rule.';
  }

  if (ingredient.riskLevel === 'cleared') {
    if (source.includes('not in methodology') || source.includes('ungraded')) {
      return 'Why pending review';
    }
    if (name.includes('magnesium stearate') || name.includes('stearic acid') || name.includes('calcium stearate')) {
      return 'Standard lubricant (stearate-family class). EFSA 2018 found no safety concern.';
    }
    if (name.includes('purified water')) {
      return 'Purified water. Methodology §5 lists it among cleared bases.';
    }
    if (name.includes('corn starch') || name.includes('pregelatinized starch')) {
      return 'Simple starch. Methodology §5 treats corn starch and similar starches as well-established, with no concern found.';
    }
    if (name === 'sucrose' || name.includes('cane sugar')) {
      return 'Acceptable sweetener. Methodology §5 lists cane sugar among cleared sweeteners.';
    }
    if (name.includes('croscarmellose')) {
      return 'Standard disintegrant. EFSA 2017: no carcinogenicity, no ADI needed.';
    }
    if (name.includes('lactose')) {
      return 'Lactose. Methodology §5 lists it among cleared inactives.';
    }
  }

  return null;
}

export function ingredientWhy(ingredient: IngredientFlag): IngredientWhy {
  const display = sourceDisplay(ingredient.source);
  const body = lockedWhyBody(ingredient);
  if (body) return { body, ...display };
  return {
    body: 'Why pending review',
    ...display,
  };
}
