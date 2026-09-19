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
  BATCH36_SPROUTS_LEFTOVERS,
  BATCH37_MEDINATURA_BT,
  BATCH38_NATURES_WAY,
  BATCH39_TYLENOL_ADVIL_ALEVE_HOLES,
  BATCH40_BAYER_EXCEDRIN_MOTRIN,
  BATCH41_PAIN_RUBS,
  BATCH42_PAIN_GELS,
  BATCH43_GOODYS_BC_ECOTRIN,
  BATCH44_PAIN_RUBS_LIST2,
  BATCH45_PAIN_RUBS_REMAINING,
  BATCH46_PAIN_RUB_REFUSED_UNLOCK,
  BATCH47_PAIN_RUB_EXACT_UNLOCK,
  BATCH48_SALONPAS_TIGER_BALM_WRITE,
  BATCH49_PAIN_FEVER_LIST2,
  BATCH50_PAIN_FEVER_LIST3,
  BATCH51_PAIN_FEVER_REFUSED_UNLOCK,
  BATCH52_THRIVE_PF_HOLES,
  BATCH53_ASUTRA_MELT_PAIN_AWAY,
  BATCH54_AMAZON_PF_HOLES,
  BATCH55_PF_REFUSED_UNLOCK,
  BATCH56_AMAZON_LEFTOVER_GRADES,
  BATCH57_PF_REFUSED_UNLOCK,
  BATCH58_PENETREX_CREAM,
  BATCH59_THRIVE_HOLES,
  BATCH60_THRIVE_REFUSED_UNLOCK,
  BATCH61_AMAZON_HOUSE_PINNED,
  BATCH62_MAMA_BEAR_CAROUSEL,
  BATCH63_KYR6_ELEMENTS_BASICS,
  BATCH64_KYR6_THRIVE_NO_OI,
  BATCH65_KYR6_STORE_GENERICS,
  BATCH66_KYR6_HELD_ROWS,
  BATCH68_KYR6_FOUNDER_PANELS,
  BATCH69_KYR6_STORE_PANELS,
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
  ...BATCH36_SPROUTS_LEFTOVERS,
  ...BATCH37_MEDINATURA_BT,
  ...BATCH38_NATURES_WAY,
  ...BATCH39_TYLENOL_ADVIL_ALEVE_HOLES,
  ...BATCH40_BAYER_EXCEDRIN_MOTRIN,
  ...BATCH41_PAIN_RUBS,
  ...BATCH42_PAIN_GELS,
  ...BATCH43_GOODYS_BC_ECOTRIN,
  ...BATCH44_PAIN_RUBS_LIST2,
  ...BATCH45_PAIN_RUBS_REMAINING,
  ...BATCH46_PAIN_RUB_REFUSED_UNLOCK,
  ...BATCH47_PAIN_RUB_EXACT_UNLOCK,
  ...BATCH48_SALONPAS_TIGER_BALM_WRITE,
  ...BATCH49_PAIN_FEVER_LIST2,
  ...BATCH50_PAIN_FEVER_LIST3,
  ...BATCH51_PAIN_FEVER_REFUSED_UNLOCK,
  ...BATCH52_THRIVE_PF_HOLES,
  ...BATCH53_ASUTRA_MELT_PAIN_AWAY,
  ...BATCH54_AMAZON_PF_HOLES,
  ...BATCH55_PF_REFUSED_UNLOCK,
  ...BATCH56_AMAZON_LEFTOVER_GRADES,
  ...BATCH57_PF_REFUSED_UNLOCK,
  ...BATCH58_PENETREX_CREAM,
  ...BATCH59_THRIVE_HOLES,
  ...BATCH60_THRIVE_REFUSED_UNLOCK,
  ...BATCH61_AMAZON_HOUSE_PINNED,
  ...BATCH62_MAMA_BEAR_CAROUSEL,
  ...BATCH63_KYR6_ELEMENTS_BASICS,
  ...BATCH64_KYR6_THRIVE_NO_OI,
  ...BATCH65_KYR6_STORE_GENERICS,
  ...BATCH66_KYR6_HELD_ROWS,
  ...BATCH68_KYR6_FOUNDER_PANELS,
  ...BATCH69_KYR6_STORE_PANELS,
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
  // Attempted P&F leftovers — no matching pack face. Per-id only.
  // Aspercreme NF: brand-site 05742 carton already wired to the fragrance SKU;
  // 100 g PDP carton does not name NF vs fragrance.
  'aspercreme-arthritis-pain-gel': brandMark('aspercreme-mark.png'),
  // Salonpas diclofenac gel: not on salonpas.us; DailyMed is instructional art.
  'salonpas-diclofenac-arthritis-pain-gel': brandMark('salonpas-mark.png'),
  // Icy Hot liquid / Performance / Revive / vanishing: brand site has no
  // matching carton (roll-on ≠ liquid; Performance / vanishing / Revive
  // packs not on icyhot.com). Per-id so other Icy Hot SKUs stay letters.
  'icy-hot-lidocaine-no-mess-liquid': brandMark('icy-hot-mark.png'),
  'icy-hot-performance-cream': brandMark('icy-hot-mark.png'),
  'icy-hot-performance-no-mess-cream': brandMark('icy-hot-mark.png'),
  'icy-hot-revive-recovery-roll-on': brandMark('icy-hot-mark.png'),
  'icy-hot-vanishing-scent-gel': brandMark('icy-hot-mark.png'),
  // Tiger Balm siblings: Active rub/gel have no distinct official carton;
  // Neck & Shoulder non-vanishing row is not the current vanishing-scent pack.
  'tiger-balm-active-muscle-rub': brandMark('tiger-balm-mark.png'),
  'tiger-balm-active-muscle-gel': brandMark('tiger-balm-mark.png'),
  'tiger-balm-neck-shoulder-rub': brandMark('tiger-balm-mark.png'),
  // Batch 2 attempted leftovers — no matching carton. Per-id only.
  'tiger-balm-hydrogel-patch': brandMark('tiger-balm-mark.png'),
  'icy-hot-original-menthol-patch': brandMark('icy-hot-mark.png'),
  'icy-hot-pro-microbeads-cream': brandMark('icy-hot-mark.png'),
  'aspercreme-lidocaine-foot-2in1': brandMark('aspercreme-mark.png'),
  'aspercreme-lidocaine-no-mess-lavender': brandMark('aspercreme-mark.png'),
  'aspercreme-lidocaine-rosemary-mint': brandMark('aspercreme-mark.png'),
  'aspercreme-lidocaine-xl-patch': brandMark('aspercreme-mark.png'),
  'salonpas-arthritis-pain-patch-large': brandMark('salonpas-mark.png'),
  // Batch 2 attempted leftovers — no matching carton. Per-id only.
  'absorbine-jr-pro-spray': brandMark('absorbine-jr-mark.png'),
  'absorbine-jr-plus-ultra-patch': brandMark('absorbine-jr-mark.png'),
  'absorbine-jr-xl-back-patch': brandMark('absorbine-jr-mark.png'),
  'absorbine-jr-plus-knee-patch': brandMark('absorbine-jr-mark.png'),
  'qunol-extra-strength-turmeric-1500-oleoresin': brandMark('qunol-mark.png'),
  'motrin-arthritis-pain-gel': brandMark('motrin-mark.png'),
  // Batch 3 attempted leftovers — no matching official 3D pack face.
  // Flavor-generic dyed chew (grape / bubblegum cartons exist — do not glue).
  'tylenol-children-chew-dyed': brandMark('tylenol-mark.png'),
  // tylenol.com "family oral suspension" URL is Extra Strength Adult Liquid
  // (already overlaid). Multi-SKU lineup art is not an exact carton.
  'tylenol-for-children-plus-adults': brandMark('tylenol-mark.png'),
  // advil.com current Junior Strength face is chewables, not this coated 24-ct.
  'junior-strength-advil-coated': brandMark('advil-mark.png'),
  // Too-broad leftover (film-coated / menstrual named as one row).
  'advil-film-coated-menstrual': brandMark('advil-mark.png'),
  // Batch 2 leftovers — Cool Patch / regular+wider hydrogel have no distinct
  // official 3D carton (tigerbalm.com/us Cool Patch absent; hydrogel twins
  // are not the already-overlaid cloth patch or Large hydrogel). Per-id only.
  'tiger-balm-cool-patch': brandMark('tiger-balm-mark.png'),
  'tiger-balm-pain-relieving-patch-regular-hydrogel': brandMark(
    'tiger-balm-mark.png',
  ),
  'tiger-balm-pain-relieving-patch-wider-hydrogel': brandMark(
    'tiger-balm-mark.png',
  ),
  // Batch 2 leftovers — biofreeze.com current catalog has no matching
  // 3.5% gel / Professional 5% / 10.5% alcohol spray / 10% spray /
  // Professional 13% / overnight cream / foam / pen / strip / foot cream.
  // Per-id only so already-overlaid Biofreeze cartons stay exact.
  'biofreeze-gel-3-5-paraben': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-gel-5': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-roll-on-5': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-colorless-gel-5': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-colorless-roll-on-5': brandMark(
    'biofreeze-mark.png',
  ),
  'biofreeze-pain-relief-spray-10-5': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-spray-10-5': brandMark('biofreeze-mark.png'),
  'biofreeze-precision-relief-pen': brandMark('biofreeze-mark.png'),
  'biofreeze-pain-relief-spray-10': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-spray-13': brandMark('biofreeze-mark.png'),
  'biofreeze-overnight-relief-cream': brandMark('biofreeze-mark.png'),
  'biofreeze-foam': brandMark('biofreeze-mark.png'),
  'biofreeze-flexible-relief-strip': brandMark('biofreeze-mark.png'),
  'biofreeze-foot-cream': brandMark('biofreeze-mark.png'),
  // Batch leftovers — DailyMed faces are 2D dielines / minis, not 3D
  // packshots. Official GoodSense wordmark from goodsense.com (Perrigo).
  // Per-id only so other-aisle GoodSense rows stay letters.
  'goodsense-naproxen-220': brandMark('goodsense-mark.png'),
  'goodsense-dual-action': brandMark('goodsense-mark.png'),
  'goodsense-childrens-ibuprofen-chew': brandMark('goodsense-mark.png'),
  'goodsense-ibuprofen-liquid-gels': brandMark('goodsense-mark.png'),
  // Batch 2 leftover — DailyMed is a 2D dieline, not a 3D packshot.
  'goodsense-es-pain-relief-l484': brandMark('goodsense-mark.png'),
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
  // Attempted P&F leftovers — no official US carton / no standalone mark file.
  'flexall-max-strength-gel': 'Flexall',
  'midol-complete': 'Midol',
  'now-turmeric-curcumin-bioperine': 'NOW',
  'gol-mykind-turmeric-inflammatory-gummies': 'Garden of Life',
  'organic-india-turmeric-formula': 'Organic India',
  // Attempted P&F leftovers — aleve.com / bayeraspirin.com 403 from this
  // environment; DailyMed hits are 2D dielines / label flats, not 3D
  // packshots. No standalone official mark file. Do not stay letters.
  // Caplets/Tablets, ES 500/Aspirina, Back & Body/Aspirina Cafeína, and
  // enteric 81+325 are too-broad combined names — parent text tile.
  'aleve-caplets-tablets': 'Aleve',
  'aleve-gelcaps': 'Aleve',
  'aleve-liquid-gels': 'Aleve',
  'aleve-back-muscle-pain': 'Aleve',
  'aleve-headache-pain': 'Aleve',
  'bayer-es-500-aspirina': 'Bayer',
  'bayer-back-body-aspirina-cafeina': 'Bayer',
  'bayer-aspirin-regimen-enteric': 'Bayer',
  'bayer-chewable-81-orange': 'Bayer',
  'bayer-chewable-81-cherry': 'Bayer',
  'genuine-bayer-aspirin-325': 'Bayer',
  'alevex-pain-relieving-lotion-roll-on': 'AleveX',
  'alevex-pain-relieving-lotion-tube': 'AleveX',
  'alevex-pain-relieving-spray': 'AleveX',
  // Attempted leftover — aleve.com 403; DailyMed arthritis gel faces are
  // 2D dielines, not a 3D packshot. No standalone official mark file.
  'aleve-arthritis-pain-gel': 'Aleve',
  // Attempted P&F leftovers — DailyMed hits are 2D dielines / label flats,
  // not 3D packshots. No standalone official mark file on a brand site.
  'timecap-naproxen-220': 'TIME-Cap',
  'healtha2z-ibuprofen-200-382': 'HealthA2Z',
  'healthwise-lidocaine-4-patch': 'HealthWise',
  'welmate-lidocaine-4-patch-parabens': 'WELMATE',
  'healtha2z-ibuprofen-200-335': 'HealthA2Z',
  'amazon-basics-lidocaine-4-patch': 'Amazon Basics',
  'welmate-lidocaine-4-patch-ethylhexyl': 'WELMATE',
  'amazon-basic-care-ibuprofen-iron-oxide-yellow': 'Basic Care',
  'amazon-basics-ibuprofen-iron-oxide-yellow': 'Amazon Basics',
  'aplus-health-dual-action-oxides': 'A+Health',
  'aplus-health-dual-action': 'A+Health',
  // Batch 2 leftovers — DailyMed / brand-site hits are 2D dielines,
  // wrong-brand faces, or a different NDC. No standalone official mark.
  'healtha2z-childrens-apap-chew': 'HealthA2Z',
  'timecap-ibuprofen-200': 'TIME-Cap',
  'sumifun-lidocaine-4-patch': 'Sumifun',
  'amazon-elements-turmeric-complex': 'Amazon Elements',
  'teemofe-lidocaine-4-patch': 'Teemofe',
  'healtha2z-naproxen-220-300': 'HealthA2Z',
  'amazon-basic-care-apap-650-er-l544': 'Basic Care',
  'amazon-basic-care-aspirin-81-chew-l467': 'Basic Care',
  'amazon-elements-turmeric-root': 'Amazon Elements',
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
  'boiron-kali-iodatum-pellets': catalogShot('boiron-kali-iodatum-pellets.jpg'),
  'boiron-pyrogenium-pellets': catalogShot('boiron-pyrogenium-pellets.jpg'),
  'boiron-stannummetallicum-pellets': catalogShot('boiron-stannummetallicum-pellets.jpg'),
  'boiron-barytacarbonica-pellets': catalogShot('boiron-barytacarbonica-pellets.jpg'),
  'boiron-coniummaculatum-pellets': catalogShot('boiron-coniummaculatum-pellets.jpg'),
  'boiron-kalmialatifolia-pellets': catalogShot('boiron-kalmialatifolia-pellets.jpg'),
  'boiron-liliumtigrinum-pellets': catalogShot('boiron-liliumtigrinum-pellets.jpg'),
  'boiron-lobelia-inflata-pellets': catalogShot('boiron-lobelia-inflata-pellets.jpg'),
  'boiron-mezereum-pellets': catalogShot('boiron-mezereum-pellets.jpg'),
  'boiron-nitricumacidum-pellets': catalogShot('boiron-nitricumacidum-pellets.jpg'),
  'boiron-plantagomajor-pellets': catalogShot('boiron-plantagomajor-pellets.jpg'),
  'boiron-spigeliaanthelmia-pellets': catalogShot('boiron-spigeliaanthelmia-pellets.jpg'),
  'boiron-alfalfa-pellets': catalogShot('boiron-alfalfa-pellets.jpg'),
  'boiron-alumina-pellets': catalogShot('boiron-alumina-pellets.jpg'),
  'boiron-formicarufa-pellets': catalogShot('boiron-formicarufa-pellets.jpg'),
  'boiron-calcarea-sulphurica-pellets': catalogShot('boiron-calcarea-sulphurica-pellets.jpg'),
  'boiron-zincum-metallicum-pellets': catalogShot('boiron-zincum-metallicum-pellets.jpg'),
  'boiron-natrum-sulphuricum-pellets': catalogShot('boiron-natrum-sulphuricum-pellets.jpg'),
  'boiron-calcarea-phosphorica-pellets': catalogShot('boiron-calcarea-phosphorica-pellets.jpg'),
  'boiron-rhus-tox-pellets': catalogShot('boiron-rhus-tox-pellets.jpg'),
  'boiron-abelmoschus-pellets': catalogShot('boiron-abelmoschus-pellets.jpg'),
  'boiron-abiescanadensis-pellets': catalogShot('boiron-abiescanadensis-pellets.jpg'),
  'boiron-abrotanum-pellets': catalogShot('boiron-abrotanum-pellets.jpg'),
  'boiron-aesculus-hippocastanum-pellets': catalogShot('boiron-aesculus-hippocastanum-pellets.jpg'),
  'boiron-aethusacynapium-pellets': catalogShot('boiron-aethusacynapium-pellets.jpg'),
  'boiron-agaricusmuscarius-pellets': catalogShot('boiron-agaricusmuscarius-pellets.jpg'),
  'boiron-agraphisnutans-pellets': catalogShot('boiron-agraphisnutans-pellets.jpg'),
  'boiron-ailanthusglandulosus-pellets': catalogShot('boiron-ailanthusglandulosus-pellets.jpg'),
  'boiron-alumen-pellets': catalogShot('boiron-alumen-pellets.jpg'),
  'boiron-aluminasilicata-pellets': catalogShot('boiron-aluminasilicata-pellets.jpg'),
  'boiron-aluminiummetallicum-pellets': catalogShot('boiron-aluminiummetallicum-pellets.jpg'),
  'boiron-ammoniumcarbonicum-pellets': catalogShot('boiron-ammoniumcarbonicum-pellets.jpg'),
  'boiron-ammoniummuriaticum-pellets': catalogShot('boiron-ammoniummuriaticum-pellets.jpg'),
  'boiron-ammoniumphosphoricum-pellets': catalogShot('boiron-ammoniumphosphoricum-pellets.jpg'),
  'boiron-amylnitrosum-pellets': catalogShot('boiron-amylnitrosum-pellets.jpg'),
  'boiron-anacardiumoccidentale-pellets': catalogShot('boiron-anacardiumoccidentale-pellets.jpg'),
  'boiron-anacardiumorientale-pellets': catalogShot('boiron-anacardiumorientale-pellets.jpg'),
  'boiron-anagallisarvensis-pellets': catalogShot('boiron-anagallisarvensis-pellets.jpg'),
  'boiron-anatherummuricatum-pellets': catalogShot('boiron-anatherummuricatum-pellets.jpg'),
  'boiron-antimoniumiodatum-pellets': catalogShot('boiron-antimoniumiodatum-pellets.jpg'),
  'boiron-apisvenenumpurum-pellets': catalogShot('boiron-apisvenenumpurum-pellets.jpg'),
  'boiron-aquamarina-pellets': catalogShot('boiron-aquamarina-pellets.jpg'),
  'boiron-araliaracemosa-pellets': catalogShot('boiron-araliaracemosa-pellets.jpg'),
  'boiron-argentummetallicum-pellets': catalogShot('boiron-argentummetallicum-pellets.jpg'),
  'boiron-aristolochiaclematitis-pellets': catalogShot('boiron-aristolochiaclematitis-pellets.jpg'),
  'boiron-arsenicumbromatum-pellets': catalogShot('boiron-arsenicumbromatum-pellets.jpg'),
  'boiron-arsenicumiodatum-pellets': catalogShot('boiron-arsenicumiodatum-pellets.jpg'),
  'boiron-arsenicummetallicum-pellets': catalogShot('boiron-arsenicummetallicum-pellets.jpg'),
  'boiron-arssulphflav-pellets': catalogShot('boiron-arssulphflav-pellets.jpg'),
  'boiron-arssulphrubrum-pellets': catalogShot('boiron-arssulphrubrum-pellets.jpg'),
  'boiron-artemisiavulgaris-pellets': catalogShot('boiron-artemisiavulgaris-pellets.jpg'),
  'boiron-arum-triphyllum-pellets': catalogShot('boiron-arum-triphyllum-pellets.jpg'),
  'boiron-arummaculatum-pellets': catalogShot('boiron-arummaculatum-pellets.jpg'),
  'boiron-asafoetida-pellets': catalogShot('boiron-asafoetida-pellets.jpg'),
  'boiron-asarumeuropaeum3c-pellets': catalogShot('boiron-asarumeuropaeum3c-pellets.jpg'),
  'boiron-asteriasrubens-pellets': catalogShot('boiron-asteriasrubens-pellets.jpg'),
  'boiron-aurumiodatum-pellets': catalogShot('boiron-aurumiodatum-pellets.jpg'),
  'boiron-aurummetallicum-pellets': catalogShot('boiron-aurummetallicum-pellets.jpg'),
  'boiron-aurummuriaticum-pellets': catalogShot('boiron-aurummuriaticum-pellets.jpg'),
  'boiron-aurummuriatnatronatum-pellets': catalogShot('boiron-aurummuriatnatronatum-pellets.jpg'),
  'boiron-barytaiodata-pellets': catalogShot('boiron-barytaiodata-pellets.jpg'),
  'boiron-barytamuriatica-pellets': catalogShot('boiron-barytamuriatica-pellets.jpg'),
  'boiron-benzinum-pellets': catalogShot('boiron-benzinum-pellets.jpg'),
  'boiron-benzoicumacidum-pellets': catalogShot('boiron-benzoicumacidum-pellets.jpg'),
  'boiron-berberisaquifolium-pellets': catalogShot('boiron-berberisaquifolium-pellets.jpg'),
  'boiron-berberisvulgaris-pellets': catalogShot('boiron-berberisvulgaris-pellets.jpg'),
  'boiron-berylliummetallicum-pellets': catalogShot('boiron-berylliummetallicum-pellets.jpg'),
  'boiron-bismuthummetallicum-pellets': catalogShot('boiron-bismuthummetallicum-pellets.jpg'),
  'boiron-bismuthumsubnitricum-pellets': catalogShot('boiron-bismuthumsubnitricum-pellets.jpg'),
  'boiron-blattaorientalis-pellets': catalogShot('boiron-blattaorientalis-pellets.jpg'),
  'boiron-bovista-pellets': catalogShot('boiron-bovista-pellets.jpg'),
  'boiron-bromium-pellets': catalogShot('boiron-bromium-pellets.jpg'),
  'boiron-cadmiummetallicum-pellets': catalogShot('boiron-cadmiummetallicum-pellets.jpg'),
  'boiron-cadmiumsulphuratum-pellets': catalogShot('boiron-cadmiumsulphuratum-pellets.jpg'),
  'boiron-cadmiumsulphuricum-pellets': catalogShot('boiron-cadmiumsulphuricum-pellets.jpg'),
  'boiron-cajuputum-pellets': catalogShot('boiron-cajuputum-pellets.jpg'),
  'boiron-caladiumseguinum-pellets': catalogShot('boiron-caladiumseguinum-pellets.jpg'),
  'boiron-calcareaiodata-pellets': catalogShot('boiron-calcareaiodata-pellets.jpg'),
  'boiron-calcareasilicata-pellets': catalogShot('boiron-calcareasilicata-pellets.jpg'),
  'boiron-camphora-pellets': catalogShot('boiron-camphora-pellets.jpg'),
  'boiron-candidaalbicans-pellets': catalogShot('boiron-candidaalbicans-pellets.jpg'),
  'boiron-capsicumannuum-pellets': catalogShot('boiron-capsicumannuum-pellets.jpg'),
  'boiron-carboanimalis-pellets': catalogShot('boiron-carboanimalis-pellets.jpg'),
  'boiron-carbolicumacidum-pellets': catalogShot('boiron-carbolicumacidum-pellets.jpg'),
  'boiron-carboneumsulphuratum-pellets': catalogShot('boiron-carboneumsulphuratum-pellets.jpg'),
  'boiron-carduusmarianus-pellets': catalogShot('boiron-carduusmarianus-pellets.jpg'),
  'boiron-caulophyllum-thalictroides-pellets': catalogShot('boiron-caulophyllum-thalictroides-pellets.jpg'),
  'boiron-cedron-pellets': catalogShot('boiron-cedron-pellets.jpg'),
  'boiron-cenchriscontortrix-pellets': catalogShot('boiron-cenchriscontortrix-pellets.jpg'),
  'boiron-cheiranthuscheiri-pellets': catalogShot('boiron-cheiranthuscheiri-pellets.jpg'),
  'boiron-chelidonium-majus-pellets': catalogShot('boiron-chelidonium-majus-pellets.jpg'),
  'boiron-chenopodium-anthelminticum-pellets': catalogShot('boiron-chenopodium-anthelminticum-pellets.jpg'),
  'boiron-chininumarsenicosum-pellets': catalogShot('boiron-chininumarsenicosum-pellets.jpg'),
  'boiron-chininumsalicylicum-pellets': catalogShot('boiron-chininumsalicylicum-pellets.jpg'),
  'boiron-chininumsulphuricum-pellets': catalogShot('boiron-chininumsulphuricum-pellets.jpg'),
  'boiron-chionanthus-virginica-pellets': catalogShot('boiron-chionanthus-virginica-pellets.jpg'),
  'boiron-chlorinum-pellets': catalogShot('boiron-chlorinum-pellets.jpg'),
  'boiron-cicutavirosa-pellets': catalogShot('boiron-cicutavirosa-pellets.jpg'),
  'boiron-cimicifuga-racemosa-pellets': catalogShot('boiron-cimicifuga-racemosa-pellets.jpg'),
  'boiron-cinerariamaritima-pellets': catalogShot('boiron-cinerariamaritima-pellets.jpg'),
  'boiron-cinnamomum-pellets': catalogShot('boiron-cinnamomum-pellets.jpg'),
  'boiron-cobaltummetallicum-pellets': catalogShot('boiron-cobaltummetallicum-pellets.jpg'),
  'boiron-condurango-pellets': catalogShot('boiron-condurango-pellets.jpg'),
  'boiron-coralliumrubrum-pellets': catalogShot('boiron-coralliumrubrum-pellets.jpg'),
  'boiron-cortisoneaceticum-pellets': catalogShot('boiron-cortisoneaceticum-pellets.jpg'),
  'boiron-crocussativus-pellets': catalogShot('boiron-crocussativus-pellets.jpg'),
  'boiron-croton-tiglium-pellets': catalogShot('boiron-croton-tiglium-pellets.jpg'),
  'boiron-cuprumaceticum-pellets': catalogShot('boiron-cuprumaceticum-pellets.jpg'),
  'boiron-cuprumarsenicosum-pellets': catalogShot('boiron-cuprumarsenicosum-pellets.jpg'),
  'boiron-cuprumoxydatumnigrum-pellets': catalogShot('boiron-cuprumoxydatumnigrum-pellets.jpg'),
  'boiron-curare-pellets': catalogShot('boiron-curare-pellets.jpg'),
  'boiron-cyclamen-europaeum-pellets': catalogShot('boiron-cyclamen-europaeum-pellets.jpg'),
  'boiron-cyclameneur-pellets': catalogShot('boiron-cyclameneur-pellets.jpg'),
  'boiron-dioscoreavillosa-pellets': catalogShot('boiron-dioscoreavillosa-pellets.jpg'),
  'boiron-dolichospruriens-pellets': catalogShot('boiron-dolichospruriens-pellets.jpg'),
  'boiron-echinacea-pellets': catalogShot('boiron-echinacea-pellets.jpg'),
  'boiron-echinaceapurpurea-pellets': catalogShot('boiron-echinaceapurpurea-pellets.jpg'),
  'boiron-elapscorallinus-pellets': catalogShot('boiron-elapscorallinus-pellets.jpg'),
  'boiron-equisetumarvense-pellets': catalogShot('boiron-equisetumarvense-pellets.jpg'),
  'boiron-equisetumhyemale-pellets': catalogShot('boiron-equisetumhyemale-pellets.jpg'),
  'boiron-erigeroncanadensis-pellets': catalogShot('boiron-erigeroncanadensis-pellets.jpg'),
  'boiron-eugeniajambosa-pellets': catalogShot('boiron-eugeniajambosa-pellets.jpg'),
  'boiron-fagopyrumesculentum-pellets': catalogShot('boiron-fagopyrumesculentum-pellets.jpg'),
  'boiron-ferrumpicricum-pellets': catalogShot('boiron-ferrumpicricum-pellets.jpg'),
  'boiron-ferrumsulphuricum-pellets': catalogShot('boiron-ferrumsulphuricum-pellets.jpg'),
  'boiron-filixmas-pellets': catalogShot('boiron-filixmas-pellets.jpg'),
  'boiron-folliculinum-pellets': catalogShot('boiron-folliculinum-pellets.jpg'),
  'boiron-fragariavesca-pellets': catalogShot('boiron-fragariavesca-pellets.jpg'),
  'boiron-fucusvesiculosus-pellets': catalogShot('boiron-fucusvesiculosus-pellets.jpg'),
  'boiron-fumariaofficinalis-pellets': catalogShot('boiron-fumariaofficinalis-pellets.jpg'),
  'boiron-gallicumacidum-pellets': catalogShot('boiron-gallicumacidum-pellets.jpg'),
  'boiron-geraniummaculatum-pellets': catalogShot('boiron-geraniummaculatum-pellets.jpg'),
  'boiron-glonoinum-pellets': catalogShot('boiron-glonoinum-pellets.jpg'),
  'boiron-gnaphalium-polycephalum-pellets': catalogShot('boiron-gnaphalium-polycephalum-pellets.jpg'),
  'boiron-gossypiumherbaceum-pellets': catalogShot('boiron-gossypiumherbaceum-pellets.jpg'),
  'boiron-granatum-pellets': catalogShot('boiron-granatum-pellets.jpg'),
  'boiron-graphites-pellets': catalogShot('boiron-graphites-pellets.jpg'),
  'boiron-gratiolaofficinalis-pellets': catalogShot('boiron-gratiolaofficinalis-pellets.jpg'),
  'boiron-gunpowder-pellets': catalogShot('boiron-gunpowder-pellets.jpg'),
  'boiron-harpagophytum-pellets': catalogShot('boiron-harpagophytum-pellets.jpg'),
  'boiron-helleborusniger-pellets': catalogShot('boiron-helleborusniger-pellets.jpg'),
  'boiron-heloniasdioica-pellets': catalogShot('boiron-heloniasdioica-pellets.jpg'),
  'boiron-hepaticatriloba-pellets': catalogShot('boiron-hepaticatriloba-pellets.jpg'),
  'boiron-hurabrasiliensis-pellets': catalogShot('boiron-hurabrasiliensis-pellets.jpg'),
  'boiron-hydrocotyleasiatica-pellets': catalogShot('boiron-hydrocotyleasiatica-pellets.jpg'),
  'boiron-hydrocyanicumacidum-pellets': catalogShot('boiron-hydrocyanicumacidum-pellets.jpg'),
  'boiron-hydrofluoricumacidum-pellets': catalogShot('boiron-hydrofluoricumacidum-pellets.jpg'),
  'boiron-iberisamara-pellets': catalogShot('boiron-iberisamara-pellets.jpg'),
  'boiron-iodium-pellets': catalogShot('boiron-iodium-pellets.jpg'),
  'boiron-irisversicolor-pellets': catalogShot('boiron-irisversicolor-pellets.jpg'),
  'boiron-juglansregia-pellets': catalogShot('boiron-juglansregia-pellets.jpg'),
  'boiron-kaliarsenicosum-pellets': catalogShot('boiron-kaliarsenicosum-pellets.jpg'),
  'boiron-kalibromatum-pellets': catalogShot('boiron-kalibromatum-pellets.jpg'),
  'boiron-kalichloricum-pellets': catalogShot('boiron-kalichloricum-pellets.jpg'),
  'boiron-kreosotum-pellets': catalogShot('boiron-kreosotum-pellets.jpg'),
  'boiron-laccaninum-pellets': catalogShot('boiron-laccaninum-pellets.jpg'),
  'boiron-lacdefloratum-pellets': catalogShot('boiron-lacdefloratum-pellets.jpg'),
  'boiron-lachesis-mutus-pellets': catalogShot('boiron-lachesis-mutus-pellets.jpg'),
  'boiron-lachnanthestinctoria-pellets': catalogShot('boiron-lachnanthestinctoria-pellets.jpg'),
  'boiron-lacticumacidum-pellets': catalogShot('boiron-lacticumacidum-pellets.jpg'),
  'boiron-lactucavirosa-pellets': catalogShot('boiron-lactucavirosa-pellets.jpg'),
  'boiron-lathyrussativus-pellets': catalogShot('boiron-lathyrussativus-pellets.jpg'),
  'boiron-laurocerasus-pellets': catalogShot('boiron-laurocerasus-pellets.jpg'),
  'boiron-lemnaminor-pellets': catalogShot('boiron-lemnaminor-pellets.jpg'),
  'boiron-lithiumcarbonicum-pellets': catalogShot('boiron-lithiumcarbonicum-pellets.jpg'),
  'boiron-magnesia-phosphorica-pellets': catalogShot('boiron-magnesia-phosphorica-pellets.jpg'),
  'boiron-magnesiacarbonica-pellets': catalogShot('boiron-magnesiacarbonica-pellets.jpg'),
  'boiron-magnesiamuriatica-pellets': catalogShot('boiron-magnesiamuriatica-pellets.jpg'),
  'boiron-magnesiasulphurica-pellets': catalogShot('boiron-magnesiasulphurica-pellets.jpg'),
  'boiron-manganumaceticum-pellets': catalogShot('boiron-manganumaceticum-pellets.jpg'),
  'boiron-manganummetallicum-pellets': catalogShot('boiron-manganummetallicum-pellets.jpg'),
  'boiron-melilotusofficinalis-pellets': catalogShot('boiron-melilotusofficinalis-pellets.jpg'),
  'boiron-melissa-officinalis-pellets': catalogShot('boiron-melissa-officinalis-pellets.jpg'),
  'boiron-menyanthestrifoliata-pellets': catalogShot('boiron-menyanthestrifoliata-pellets.jpg'),
  'boiron-mercurius-solubilis-pellets': catalogShot('boiron-mercurius-solubilis-pellets.jpg'),
  'boiron-mercuriuscorrosivus-pellets': catalogShot('boiron-mercuriuscorrosivus-pellets.jpg'),
  'boiron-mercuriuscyanatus-pellets': catalogShot('boiron-mercuriuscyanatus-pellets.jpg'),
  'boiron-mercuriusdulcis-pellets': catalogShot('boiron-mercuriusdulcis-pellets.jpg'),
  'boiron-mercuriusiodatusruber-pellets': catalogShot('boiron-mercuriusiodatusruber-pellets.jpg'),
  'boiron-mercuriussulphruber-pellets': catalogShot('boiron-mercuriussulphruber-pellets.jpg'),
  'boiron-mercuriusvivus-pellets': catalogShot('boiron-mercuriusvivus-pellets.jpg'),
  'boiron-millefolium-pellets': catalogShot('boiron-millefolium-pellets.jpg'),
  'boiron-momordicabalsamina-pellets': catalogShot('boiron-momordicabalsamina-pellets.jpg'),
  'boiron-murexpurpurea-pellets': catalogShot('boiron-murexpurpurea-pellets.jpg'),
  'boiron-muriaticumacidum-pellets': catalogShot('boiron-muriaticumacidum-pellets.jpg'),
  'boiron-mygale-pellets': catalogShot('boiron-mygale-pellets.jpg'),
  'boiron-myristicasebifera-pellets': catalogShot('boiron-myristicasebifera-pellets.jpg'),
  'boiron-najatripudians-pellets': catalogShot('boiron-najatripudians-pellets.jpg'),
  'boiron-naphthalinum-pellets': catalogShot('boiron-naphthalinum-pellets.jpg'),
  'boiron-natrumcarbonicum-pellets': catalogShot('boiron-natrumcarbonicum-pellets.jpg'),
  'boiron-natrumphosphoricum-pellets': catalogShot('boiron-natrumphosphoricum-pellets.jpg'),
  'boiron-niccolummetallicum-pellets': catalogShot('boiron-niccolummetallicum-pellets.jpg'),
  'boiron-ocimumcanum-pellets': catalogShot('boiron-ocimumcanum-pellets.jpg'),
  'boiron-oenanthecrocata-pellets': catalogShot('boiron-oenanthecrocata-pellets.jpg'),
  'boiron-oleander-pellets': catalogShot('boiron-oleander-pellets.jpg'),
  'boiron-onosmodiumvirginianum-pellets': catalogShot('boiron-onosmodiumvirginianum-pellets.jpg'),
  'boiron-ornithogalumumbellatum-pellets': catalogShot('boiron-ornithogalumumbellatum-pellets.jpg'),
  'boiron-oxalicumacidum-pellets': catalogShot('boiron-oxalicumacidum-pellets.jpg'),
  'boiron-palladiummetallicum-pellets': catalogShot('boiron-palladiummetallicum-pellets.jpg'),
  'boiron-pareirabrava-pellets': catalogShot('boiron-pareirabrava-pellets.jpg'),
  'boiron-parisquadrifolia-pellets': catalogShot('boiron-parisquadrifolia-pellets.jpg'),
  'boiron-phellandriumaquaticum-pellets': catalogShot('boiron-phellandriumaquaticum-pellets.jpg'),
  'boiron-phosphoricum-acidum-pellets': catalogShot('boiron-phosphoricum-acidum-pellets.jpg'),
  'boiron-physostigmavenenosum-pellets': catalogShot('boiron-physostigmavenenosum-pellets.jpg'),
  'boiron-picricumacidum-pellets': catalogShot('boiron-picricumacidum-pellets.jpg'),
  'boiron-pilocarpus-pellets': catalogShot('boiron-pilocarpus-pellets.jpg'),
  'boiron-pipermethysticum-pellets': catalogShot('boiron-pipermethysticum-pellets.jpg'),
  'boiron-platinummetallicum-pellets': catalogShot('boiron-platinummetallicum-pellets.jpg'),
  'boiron-plumbummetallicum-pellets': catalogShot('boiron-plumbummetallicum-pellets.jpg'),
  'boiron-polygonumpunctatum-pellets': catalogShot('boiron-polygonumpunctatum-pellets.jpg'),
  'boiron-pteleatrifoliata-pellets': catalogShot('boiron-pteleatrifoliata-pellets.jpg'),
  'boiron-quebracho-pellets': catalogShot('boiron-quebracho-pellets.jpg'),
  'boiron-radiumbromatum-pellets': catalogShot('boiron-radiumbromatum-pellets.jpg'),
  'boiron-ranunculusbulbosus-pellets': catalogShot('boiron-ranunculusbulbosus-pellets.jpg'),
  'boiron-raphanussativus-pellets': catalogShot('boiron-raphanussativus-pellets.jpg'),
  'boiron-rhododendronchrysanthum-pellets': catalogShot('boiron-rhododendronchrysanthum-pellets.jpg'),
  'boiron-rhusvenenata-pellets': catalogShot('boiron-rhusvenenata-pellets.jpg'),
  'boiron-ricinuscommunis-pellets': catalogShot('boiron-ricinuscommunis-pellets.jpg'),
  'boiron-ruta-graveolens-pellets': catalogShot('boiron-ruta-graveolens-pellets.jpg'),
  'boiron-sabal-serrulata-pellets': catalogShot('boiron-sabal-serrulata-pellets.jpg'),
  'boiron-sabina-pellets': catalogShot('boiron-sabina-pellets.jpg'),
  'boiron-saccharumofficinale-pellets': catalogShot('boiron-saccharumofficinale-pellets.jpg'),
  'boiron-salicylicumacidum-pellets': catalogShot('boiron-salicylicumacidum-pellets.jpg'),
  'boiron-sanguinariacanadensis-pellets': catalogShot('boiron-sanguinariacanadensis-pellets.jpg'),
  'boiron-sanguinarinumnitricum-pellets': catalogShot('boiron-sanguinarinumnitricum-pellets.jpg'),
  'boiron-saponariaofficinalis-pellets': catalogShot('boiron-saponariaofficinalis-pellets.jpg'),
  'boiron-sarcolacticum-acidum-pellets': catalogShot('boiron-sarcolacticum-acidum-pellets.jpg'),
  'boiron-sarsaparilla-pellets': catalogShot('boiron-sarsaparilla-pellets.jpg'),
  'boiron-scrophularianodosa-pellets': catalogShot('boiron-scrophularianodosa-pellets.jpg'),
  'boiron-secalecornutum-pellets': catalogShot('boiron-secalecornutum-pellets.jpg'),
  'boiron-seleniummetallicum-pellets': catalogShot('boiron-seleniummetallicum-pellets.jpg'),
  'boiron-sempervivumtectorum-pellets': catalogShot('boiron-sempervivumtectorum-pellets.jpg'),
  'boiron-senna-pellets': catalogShot('boiron-senna-pellets.jpg'),
  'boiron-sepia-pellets': catalogShot('boiron-sepia-pellets.jpg'),
  'boiron-silicamarina-pellets': catalogShot('boiron-silicamarina-pellets.jpg'),
  'boiron-sinapisnigra-pellets': catalogShot('boiron-sinapisnigra-pellets.jpg'),
  'boiron-strontiumcarbonicum-pellets': catalogShot('boiron-strontiumcarbonicum-pellets.jpg'),
  'boiron-sulphur-pellets': catalogShot('boiron-sulphur-pellets.jpg'),
  'boiron-sulphur-iodatum-pellets': catalogShot('boiron-sulphur-iodatum-pellets.jpg'),
  'boiron-sulphuricumacidum-pellets': catalogShot('boiron-sulphuricumacidum-pellets.jpg'),
  'boiron-symphoricarpusracemosus-pellets': catalogShot('boiron-symphoricarpusracemosus-pellets.jpg'),
  'boiron-taraxacumofficinale-pellets': catalogShot('boiron-taraxacumofficinale-pellets.jpg'),
  'boiron-tarentulacubensis-pellets': catalogShot('boiron-tarentulacubensis-pellets.jpg'),
  'boiron-tarentulahispana-pellets': catalogShot('boiron-tarentulahispana-pellets.jpg'),
  'boiron-telluriummetallicum-pellets': catalogShot('boiron-telluriummetallicum-pellets.jpg'),
  'boiron-terebinthina-pellets': catalogShot('boiron-terebinthina-pellets.jpg'),
  'boiron-teucriummarum-pellets': catalogShot('boiron-teucriummarum-pellets.jpg'),
  'boiron-theasinensis-pellets': catalogShot('boiron-theasinensis-pellets.jpg'),
  'boiron-theridion-pellets': catalogShot('boiron-theridion-pellets.jpg'),
  'boiron-thiosinaminum-pellets': catalogShot('boiron-thiosinaminum-pellets.jpg'),
  'boiron-thlaspibursapastoris-pellets': catalogShot('boiron-thlaspibursapastoris-pellets.jpg'),
  'boiron-thyroidinum-pellets': catalogShot('boiron-thyroidinum-pellets.jpg'),
  'boiron-titaniummetallicum-pellets': catalogShot('boiron-titaniummetallicum-pellets.jpg'),
  'boiron-trilliumpendulum-pellets': catalogShot('boiron-trilliumpendulum-pellets.jpg'),
  'boiron-tuberculinum-residuum-pellets': catalogShot('boiron-tuberculinum-residuum-pellets.jpg'),
  'boiron-ustilagomaidis-pellets': catalogShot('boiron-ustilagomaidis-pellets.jpg'),
  'boiron-uvaursi-pellets': catalogShot('boiron-uvaursi-pellets.jpg'),
  'boiron-venusmercenaria-pellets': catalogShot('boiron-venusmercenaria-pellets.jpg'),
  'boiron-veratrumviride-pellets': catalogShot('boiron-veratrumviride-pellets.jpg'),
  'boiron-vespacrabro-pellets': catalogShot('boiron-vespacrabro-pellets.jpg'),
  'boiron-viburnumopulus-pellets': catalogShot('boiron-viburnumopulus-pellets.jpg'),
  'boiron-violaodorata-pellets': catalogShot('boiron-violaodorata-pellets.jpg'),
  'boiron-violatricolor-pellets': catalogShot('boiron-violatricolor-pellets.jpg'),
  'boiron-viperaberus-pellets': catalogShot('boiron-viperaberus-pellets.jpg'),
  'boiron-viscumalbum-pellets': catalogShot('boiron-viscumalbum-pellets.jpg'),
  'boiron-xanthoxylumfraxineum-pellets': catalogShot('boiron-xanthoxylumfraxineum-pellets.jpg'),
  'boiron-zincumsulphuricum-pellets': catalogShot('boiron-zincumsulphuricum-pellets.jpg'),
  'voltaren-arthritis-pain-gel': catalogShot('voltaren-arthritis-pain-gel.jpg'),
  'aspercreme-arthritis-pain-gel-fragrance': catalogShot('aspercreme-arthritis-pain-gel-fragrance.jpg'),
  'salonpas-pain-relieving-jet-spray': catalogShot('salonpas-pain-relieving-jet-spray.jpg'),
  'icy-hot-performance-dry-spray': catalogShot('icy-hot-performance-dry-spray.jpg'),
  'icy-hot-dry-spray-original': catalogShot('icy-hot-dry-spray-original.jpg'),
  'icy-hot-pro-dry-spray': catalogShot('icy-hot-pro-dry-spray.jpg'),
  'icy-hot-lidocaine-dry-spray': catalogShot('icy-hot-lidocaine-dry-spray.jpg'),
  'aspercreme-lidocaine-dry-spray': catalogShot('aspercreme-lidocaine-dry-spray.jpg'),
  'salonpas-deep-relieving-gel': catalogShot('salonpas-deep-relieving-gel.jpg'),
  'icy-hot-original-balm': catalogShot('icy-hot-original-balm.jpg'),
  'salonpas-lidocaine-plus-liquid': catalogShot('salonpas-lidocaine-plus-liquid.jpg'),
  'aspercreme-original-cream': catalogShot('aspercreme-original-cream.jpg'),
  'aspercreme-professional-cream': catalogShot('aspercreme-professional-cream.jpg'),
  'tiger-balm-liniment': catalogShot('tiger-balm-liniment.jpg'),
  'icy-hot-original-cream': catalogShot('icy-hot-original-cream.jpg'),
  'icy-hot-advanced-pain-relief-cream': catalogShot('icy-hot-advanced-pain-relief-cream.jpg'),
  'icy-hot-pro-no-mess': catalogShot('icy-hot-pro-no-mess.jpg'),
  'icy-hot-nighttime-recovery-roll-on': catalogShot('icy-hot-nighttime-recovery-roll-on.jpg'),
  'tiger-balm-muscle-rub': catalogShot('tiger-balm-muscle-rub.jpg'),
  'tiger-balm-pain-relieving-muscle-spray': catalogShot('tiger-balm-pain-relieving-muscle-spray.jpg'),
  'tiger-balm-red-extra-strength': catalogShot('tiger-balm-red-extra-strength.jpg'),
  'tiger-balm-ultra-strength': catalogShot('tiger-balm-ultra-strength.jpg'),
  'tiger-balm-white-regular-strength': catalogShot('tiger-balm-white-regular-strength.jpg'),
  'tiger-balm-neck-shoulder-vanishing-scent': catalogShot('tiger-balm-neck-shoulder-vanishing-scent.jpg'),
  'icy-hot-pro-massaging-balm': catalogShot('icy-hot-pro-massaging-balm.jpg'),
  'icy-hot-lidocaine-no-mess-roll-on': catalogShot('icy-hot-lidocaine-no-mess-roll-on.jpg'),
  'icy-hot-original-no-mess-roll-on': catalogShot('icy-hot-original-no-mess-roll-on.jpg'),
  'icy-hot-max-lidocaine-cream': catalogShot('icy-hot-max-lidocaine-cream.jpg'),
  'aspercreme-lidocaine-eucalyptus-cream': catalogShot('aspercreme-lidocaine-eucalyptus-cream.jpg'),
  'tiger-balm-pain-relieving-patch': catalogShot('tiger-balm-pain-relieving-patch.jpg'),
  'icy-hot-lidocaine-large-patch': catalogShot('icy-hot-lidocaine-large-patch.jpg'),
  'icy-hot-pro-pain-relief-patch': catalogShot('icy-hot-pro-pain-relief-patch.jpg'),
  'aspercreme-lidocaine-patch': catalogShot('aspercreme-lidocaine-patch.jpg'),
  'aspercreme-lidocaine-no-mess-applicator': catalogShot('aspercreme-lidocaine-no-mess-applicator.jpg'),
  'aspercreme-lidocaine-rosemary-mint-cream': catalogShot('aspercreme-lidocaine-rosemary-mint-cream.jpg'),
  'aspercreme-lidocaine-odor-free': catalogShot('aspercreme-lidocaine-odor-free.jpg'),
  'aspercreme-lidocaine-foot-pain-cream': catalogShot('aspercreme-lidocaine-foot-pain-cream.jpg'),
  'salonpas-lidocaine-gel-patch': catalogShot('salonpas-lidocaine-gel-patch.jpg'),
  'salonpas-lidocaine-gel-patch-hisamitsu': catalogShot('salonpas-lidocaine-gel-patch.jpg'),
  'salonpas-pain-relieving-patch-large': catalogShot('salonpas-pain-relieving-patch-large.jpg'),
  'salonpas-lidocaine-flex-patch': catalogShot('salonpas-lidocaine-flex-patch.jpg'),
  'salonpas-pain-relieving-patch': catalogShot('salonpas-pain-relieving-patch.jpg'),
  'salonpas-lidocaine-plus-cream': catalogShot('salonpas-lidocaine-plus-cream.jpg'),
  'salonpas-arthritis-pain-patch': catalogShot('salonpas-arthritis-pain-patch.jpg'),
  'salonpas-pain-relief-patch': catalogShot('salonpas-pain-relief-patch.jpg'),
  'salonpas-pain-relief-patch-large': catalogShot('salonpas-pain-relief-patch-large.jpg'),
  'salonpas-gel-patch-hot': catalogShot('salonpas-gel-patch-hot.jpg'),
  'salonpas-hot-capsicum-patch': catalogShot('salonpas-hot-capsicum-patch.jpg'),
  'tiger-balm-hydrogel-patch-large': catalogShot('tiger-balm-hydrogel-patch-large.jpg'),
  'tiger-balm-arthritis-rub': catalogShot('tiger-balm-arthritis-rub.jpg'),
  'biofreeze-ultraflex-lidocaine-4-patch': catalogShot('biofreeze-ultraflex-lidocaine-4-patch.jpg'),
  'biofreeze-ultraflex-plus-lidocaine-menthol-patch': catalogShot(
    'biofreeze-ultraflex-plus-lidocaine-menthol-patch.jpg',
  ),
  'capzasin-quick-relief-gel': catalogShot('capzasin-quick-relief-gel.jpg'),
  'biofreeze-pain-relief-gel-4': catalogShot('biofreeze-pain-relief-gel-4.jpg'),
  'biofreeze-pain-relief-roll-on-4': catalogShot('biofreeze-pain-relief-roll-on-4.jpg'),
  'biofreeze-overnight-gel-4': catalogShot('biofreeze-overnight-gel-4.jpg'),
  'biofreeze-overnight-roll-on-4': catalogShot('biofreeze-overnight-roll-on-4.jpg'),
  'biofreeze-pain-relief-cream': catalogShot('biofreeze-pain-relief-cream.jpg'),
  'biofreeze-dry-stick': catalogShot('biofreeze-dry-stick.jpg'),
  'biofreeze-triple-target-roll-on': catalogShot('biofreeze-triple-target-roll-on.jpg'),
  'biofreeze-triple-target-gel': catalogShot('biofreeze-triple-target-gel.jpg'),
  'biofreeze-overnight-relief-patches': catalogShot('biofreeze-overnight-relief-patches.jpg'),
  'bengay-ultra-strength-nongreasy': catalogShot('bengay-ultra-strength-nongreasy.jpg'),
  'bengay-vanishing-scent-gel': catalogShot('bengay-vanishing-scent-gel.jpg'),
  'bengay-lidocaine-tropical-jasmine': catalogShot('bengay-lidocaine-tropical-jasmine.jpg'),
  'absorbine-jr-pro-cream': catalogShot('absorbine-jr-pro-cream.jpg'),
  'absorbine-jr-pro-no-mess': catalogShot('absorbine-jr-pro-no-mess.jpg'),
  'absorbine-jr-neck-patch': catalogShot('absorbine-jr-neck-patch.jpg'),
  'absorbine-jr-back-patch': catalogShot('absorbine-jr-back-patch.jpg'),
  'absorbine-jr-knee-patch': catalogShot('absorbine-jr-knee-patch.jpg'),
  'capzasin-hp-arthritis-cream': catalogShot('capzasin-hp-arthritis-cream.jpg'),
  'bengay-ultra-strength-patch-5': catalogShot('bengay-ultra-strength-patch-5.jpg'),
  'medinatura-t-relief-xs-oral-drops': catalogShot('medinatura-t-relief-xs-oral-drops.jpg'),
  'medinatura-t-relief-xs-gel': catalogShot('medinatura-t-relief-xs-gel.jpg'),
  'medinatura-t-relief-pain-gel': catalogShot('medinatura-t-relief-pain-gel.jpg'),
  'medinatura-t-relief-xs-tablets': catalogShot('medinatura-t-relief-xs-tablets.jpg'),
  'medinatura-t-relief-pain-tablets': catalogShot('medinatura-t-relief-pain-tablets.jpg'),
  'medinatura-t-relief-arthritis-xs-tablets': catalogShot(
    'medinatura-t-relief-arthritis-xs-tablets.jpg',
  ),
  'medinatura-bhi-arthritis': catalogShot('medinatura-bhi-arthritis.jpg'),
  'medinatura-bhi-back': catalogShot('medinatura-bhi-back.jpg'),
  'medinatura-bhi-migraine': catalogShot('medinatura-bhi-migraine.jpg'),
  'medinatura-bhi-spasm-cramp': catalogShot('medinatura-bhi-spasm-cramp.jpg'),
  'medinatura-t-relief-pain-cream': catalogShot('medinatura-t-relief-pain-cream.jpg'),
  'medinatura-t-relief-xs-cream': catalogShot('medinatura-t-relief-xs-cream.jpg'),
  'medinatura-t-relief-arthritis-xs-cream': catalogShot(
    'medinatura-t-relief-arthritis-xs-cream.jpg',
  ),
  'medinatura-t-relief-lidocaine-4-cream': catalogShot(
    'medinatura-t-relief-lidocaine-4-cream.jpg',
  ),
  'medinatura-traumeel-ointment': catalogShot('medinatura-traumeel-ointment.jpg'),
  'bt-triflora-arthritis-gel': catalogShot('bt-triflora-arthritis-gel.jpg'),
  'natures-way-sports-gel': catalogShot('natures-way-sports-gel.jpg'),
  'tylenol-precise-cooling-cream': catalogShot('tylenol-precise-cooling-cream.jpg'),
  'tylenol-precise-pain-relieving-cream': catalogShot(
    'tylenol-precise-pain-relieving-cream.jpg',
  ),
  'tylenol-precise-warming-cream': catalogShot('tylenol-precise-warming-cream.jpg'),
  'tylenol-precise-nighttime-cream': catalogShot('tylenol-precise-nighttime-cream.jpg'),
  'tylenol-precise-lidocaine-4-patch': catalogShot(
    'tylenol-precise-lidocaine-4-patch.jpg',
  ),
  'advil-targeted-relief-cream': catalogShot('advil-targeted-relief-cream.jpg'),
  'mommys-bliss-infants-pain-fever': catalogShot('mommys-bliss-infants-pain-fever.jpg'),
  'advil-migraine-liqui-gels': catalogShot('advil-migraine-liqui-gels.jpg'),
  'advil-dual-action-back-pain': catalogShot('advil-dual-action-back-pain.jpg'),
  'motrin-ib-liquid-gels': catalogShot('motrin-ib-liquid-gels.jpg'),
  'motrin-ib-migraine-liquid-gels': catalogShot('motrin-ib-migraine-liquid-gels.jpg'),
  'motrin-dual-action': catalogShot('motrin-dual-action.jpg'),
  'topricin-pain-relief-cream': catalogShot('topricin-pain-relief-cream.jpg'),
  'tylenol-es-dissolve-packs': catalogShot('tylenol-es-dissolve-packs.jpg'),
  'tylenol-children-dissolve-packs': catalogShot('tylenol-children-dissolve-packs.jpg'),
  'motrin-infants-liquid-dyefree': catalogShot('motrin-infants-liquid-dyefree.jpg'),
  'medinatura-traumeel-tablets': catalogShot('medinatura-traumeel-tablets.jpg'),
  'excedrin-tension-headache': catalogShot('excedrin-tension-headache.jpg'),
  'excedrin-migraine-es-blue': catalogShot('excedrin-migraine-es-blue.jpg'),
  'excedrin-rapid-relief-apap': catalogShot('excedrin-rapid-relief-apap.jpg'),
  'tylenol-es-liquid': catalogShot('tylenol-es-liquid.jpg'),
  'infants-advil-drops': catalogShot('infants-advil-drops.jpg'),
  'excedrin-es-tio2': catalogShot('excedrin-es-tio2.jpg'),
  'goodys-max-triple-flavored': catalogShot('goodys-max-triple-flavored.jpg'),
  'goodys-extra-strength': catalogShot('goodys-extra-strength.jpg'),
  'goodys-back-body': catalogShot('goodys-back-body.jpg'),
  'goodys-plus-alert-hangover': catalogShot('goodys-plus-alert-hangover.jpg'),
  'ecotrin-rs-325-enteric': catalogShot('ecotrin-rs-325-enteric.jpg'),
  'ecotrin-81-enteric-dye': catalogShot('ecotrin-81-enteric-dye.jpg'),
  'anacin-aspirin-caffeine': catalogShot('anacin-aspirin-caffeine.jpg'),
  'st-joseph-81-enteric': catalogShot('st-joseph-81-enteric.jpg'),
  'st-joseph-81-chewable': catalogShot('st-joseph-81-chewable.jpg'),
  'bufferin-rs-325': catalogShot('bufferin-rs-325.jpg'),
  'bc-original-arthritis': catalogShot('bc-original-arthritis.jpg'),
  'bc-cherry': catalogShot('bc-cherry.jpg'),
  'bc-max': catalogShot('bc-max.jpg'),
  'jointflex-pain-relief-cream': catalogShot('jointflex-pain-relief-cream.jpg'),
  'mentholatum-original': catalogShot('mentholatum-original.jpg'),
  'biofreeze-menthol-patches': catalogShot('biofreeze-menthol-patches.jpg'),
  'fon-headache': catalogShot('fon-headache.jpg'),
  'fon-nerve': catalogShot('fon-nerve.jpg'),
  'fon-muscle': catalogShot('fon-muscle.jpg'),
  'fon-arniblend': catalogShot('fon-arniblend.jpg'),
  'fon-migraine': catalogShot('fon-migraine.jpg'),
  'blue-emu-original': catalogShot('blue-emu-original.jpg'),
  'stopain-extra-strength-roll-on': catalogShot(
    'stopain-extra-strength-roll-on.jpg',
  ),
  'penetrex-pain-relief-cream': catalogShot('penetrex-pain-relief-cream.jpg'),
  'medinatura-bhi-traumex': catalogShot('medinatura-bhi-traumex.jpg'),
  'qunol-extra-strength-turmeric-1000': catalogShot(
    'qunol-extra-strength-turmeric-1000.jpg',
  ),
  'qunol-extra-strength-turmeric-1500': catalogShot(
    'qunol-extra-strength-turmeric-1500.jpg',
  ),
  'qunol-zero-sugar-turmeric-gummies': catalogShot(
    'qunol-zero-sugar-turmeric-gummies.jpg',
  ),
  'ollois-arnica-montana-12c': catalogShot('ollois-arnica-montana-12c.jpg'),
  'new-chapter-turmeric-force': catalogShot('new-chapter-turmeric-force.jpg'),
  'gaia-turmeric-supreme-extra-strength': catalogShot(
    'gaia-turmeric-supreme-extra-strength.jpg',
  ),
  'natures-way-feverfew': catalogShot('natures-way-feverfew.jpg'),
  'natures-way-willow-bark': catalogShot('natures-way-willow-bark.jpg'),
  'natures-way-joint-movement-glucosamine': catalogShot(
    'natures-way-joint-movement-glucosamine.jpg',
  ),
  'natures-way-turmeric-max-potency': catalogShot(
    'natures-way-turmeric-max-potency.jpg',
  ),
  'natures-way-tart-cherry-ultra-gummies': catalogShot(
    'natures-way-tart-cherry-ultra-gummies.jpg',
  ),
  'natures-way-petadolex-pro-active': catalogShot(
    'natures-way-petadolex-pro-active.jpg',
  ),
  'natures-way-devils-claw-secondary-root': catalogShot(
    'natures-way-devils-claw-secondary-root.jpg',
  ),
  'biofreeze-colorless-gel-4': catalogShot('biofreeze-colorless-gel-4.jpg'),
  // Shares formulaId with the colorless gel — do not inherit the tube face.
  'biofreeze-colorless-roll-on-4': brandMark('biofreeze-mark.png'),
  'naturewise-curcumin-turmeric-2250': catalogShot(
    'naturewise-curcumin-turmeric-2250.jpg',
  ),
  'oregons-wild-harvest-turmeric': catalogShot(
    'oregons-wild-harvest-turmeric.jpg',
  ),
  'life-flo-pure-magnesium-oil': catalogShot('life-flo-pure-magnesium-oil.jpg'),
  'absorbine-jr-plus-es-liquid': catalogShot(
    'absorbine-jr-plus-es-liquid.jpg',
  ),
  // Shares formulaId with Plus ES liquid (menthol 4%). Current absorbinejr.com
  // PRO roll-on is lidocaine + phenol — do not glue.
  'absorbine-jr-pro-roll-on-liquid': brandMark('absorbine-jr-mark.png'),
  'mineral-ice-extreme-gel': catalogShot('mineral-ice-extreme-gel.jpg'),
  'mineral-ice-extreme-menthol-spray': catalogShot(
    'mineral-ice-extreme-menthol-spray.jpg',
  ),
  'mineral-ice-extreme-dry-stick': catalogShot(
    'mineral-ice-extreme-dry-stick.jpg',
  ),
  'codeage-liposomal-turmeric': catalogShot('codeage-liposomal-turmeric.jpg'),
  'asutra-melt-pain-away': catalogShot('asutra-melt-pain-away.jpg'),
  'life-flo-magnesium-lotion-vanilla': catalogShot(
    'life-flo-magnesium-lotion-vanilla.jpg',
  ),
  'life-flo-magnesium-lotion-unscented': catalogShot(
    'life-flo-magnesium-lotion-unscented.jpg',
  ),
  'doctors-best-high-absorption-curcumin-1000': catalogShot(
    'doctors-best-high-absorption-curcumin-1000.jpg',
  ),
  'sports-research-turmeric-curcumin': catalogShot(
    'sports-research-turmeric-curcumin.jpg',
  ),
  'australian-dream-arthritis-cream': catalogShot(
    'australian-dream-arthritis-cream.jpg',
  ),
  'mineral-ice-original-gel-2': catalogShot('mineral-ice-original-gel-2.jpg'),
  'nutricost-turmeric-curcumin-2300': catalogShot(
    'nutricost-turmeric-curcumin-2300.jpg',
  ),
  // Official shop.sprouts.com house PDP bottles (same source style as
  // sprouts-inflacalm-powder-cap). Exact leftover SKUs.
  'sprouts-tart-cherry-turmeric': catalogShot(
    'sprouts-tart-cherry-turmeric.jpg',
  ),
  'sprouts-turmeric-capsules': catalogShot('sprouts-turmeric-capsules.jpg'),
  // Official biofreeze.com retail aerosol packshot (3 fl oz, 10.5% menthol
  // + denatonium). Consumer spray id = formulaId.
  'biofreeze-pain-relief-spray-10-5-denatonium': catalogShot(
    'biofreeze-pain-relief-spray-10-5-denatonium.jpg',
  ),
  // Shares formulaId with the consumer denatonium spray — do not inherit
  // the retail aerosol can (Professional NDC 59316-834).
  'biofreeze-professional-aerosol-10-5-denatonium': brandMark(
    'biofreeze-mark.png',
  ),
  // Official brand / store PDP 3D packshots for attempted leftovers.
  'thrive-wellmade-turmeric': catalogShot('thrive-wellmade-turmeric.jpg'),
  'thorne-curcumin-phytosome-500': catalogShot(
    'thorne-curcumin-phytosome-500.jpg',
  ),
  'thorne-curcumin-phytosome-1000': catalogShot(
    'thorne-curcumin-phytosome-1000.jpg',
  ),
  'asutra-melt-pain-away-thrive': catalogShot(
    'asutra-melt-pain-away-thrive.jpg',
  ),
  'bioschwartz-turmeric-curcumin-1500': catalogShot(
    'bioschwartz-turmeric-curcumin-1500.jpg',
  ),
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
assertBrandMark('aspercreme-arthritis-pain-gel', 'Aspercreme', 'aspercreme-mark.png');
assertBrandMark('salonpas-diclofenac-arthritis-pain-gel', 'Salonpas', 'salonpas-mark.png');
assertBrandMark('icy-hot-lidocaine-no-mess-liquid', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('icy-hot-performance-cream', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('icy-hot-performance-no-mess-cream', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('icy-hot-revive-recovery-roll-on', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('icy-hot-vanishing-scent-gel', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('tiger-balm-active-muscle-rub', 'Tiger Balm', 'tiger-balm-mark.png');
assertBrandMark('tiger-balm-active-muscle-gel', 'Tiger Balm', 'tiger-balm-mark.png');
assertBrandMark('tiger-balm-neck-shoulder-rub', 'Tiger Balm', 'tiger-balm-mark.png');
assertBrandMark('tiger-balm-hydrogel-patch', 'Tiger Balm', 'tiger-balm-mark.png');
assertBrandMark('icy-hot-original-menthol-patch', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('icy-hot-pro-microbeads-cream', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('aspercreme-lidocaine-foot-2in1', 'Aspercreme', 'aspercreme-mark.png');
assertBrandMark('aspercreme-lidocaine-no-mess-lavender', 'Aspercreme', 'aspercreme-mark.png');
assertBrandMark('aspercreme-lidocaine-rosemary-mint', 'Aspercreme', 'aspercreme-mark.png');
assertBrandMark('aspercreme-lidocaine-xl-patch', 'Aspercreme', 'aspercreme-mark.png');
assertBrandMark('salonpas-arthritis-pain-patch-large', 'Salonpas', 'salonpas-mark.png');
assertBrandMark('absorbine-jr-pro-spray', 'Absorbine Jr.', 'absorbine-jr-mark.png');
assertBrandMark('absorbine-jr-plus-ultra-patch', 'Absorbine Jr.', 'absorbine-jr-mark.png');
assertBrandMark('absorbine-jr-xl-back-patch', 'Absorbine Jr.', 'absorbine-jr-mark.png');
assertBrandMark('absorbine-jr-plus-knee-patch', 'Absorbine Jr.', 'absorbine-jr-mark.png');
assertBrandMark(
  'qunol-extra-strength-turmeric-1500-oleoresin',
  'Qunol',
  'qunol-mark.png',
);
assertBrandMark('motrin-arthritis-pain-gel', 'Motrin', 'motrin-mark.png');
assertBrandMark('biofreeze-colorless-roll-on-4', 'Biofreeze', 'biofreeze-mark.png');
assertBrandMark(
  'absorbine-jr-pro-roll-on-liquid',
  'Absorbine Jr.',
  'absorbine-jr-mark.png',
);
assertBrandMark(
  'tylenol-children-chew-dyed',
  'Tylenol',
  'tylenol-mark.png',
);
assertBrandMark(
  'tylenol-for-children-plus-adults',
  'Tylenol',
  'tylenol-mark.png',
);
assertBrandMark(
  'junior-strength-advil-coated',
  'Advil',
  'advil-mark.png',
);
assertBrandMark(
  'advil-film-coated-menstrual',
  'Advil',
  'advil-mark.png',
);
assertBrandMark('tiger-balm-cool-patch', 'Tiger Balm', 'tiger-balm-mark.png');
assertBrandMark(
  'tiger-balm-pain-relieving-patch-regular-hydrogel',
  'Tiger Balm',
  'tiger-balm-mark.png',
);
assertBrandMark(
  'tiger-balm-pain-relieving-patch-wider-hydrogel',
  'Tiger Balm',
  'tiger-balm-mark.png',
);
assertBrandMark(
  'biofreeze-gel-3-5-paraben',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-professional-gel-5',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-professional-roll-on-5',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-professional-colorless-gel-5',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-professional-colorless-roll-on-5',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-professional-aerosol-10-5-denatonium',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-pain-relief-spray-10-5',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-professional-spray-10-5',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-precision-relief-pen',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-pain-relief-spray-10',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-professional-spray-13',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark(
  'biofreeze-overnight-relief-cream',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark('biofreeze-foam', 'Biofreeze', 'biofreeze-mark.png');
assertBrandMark(
  'biofreeze-flexible-relief-strip',
  'Biofreeze',
  'biofreeze-mark.png',
);
assertBrandMark('biofreeze-foot-cream', 'Biofreeze', 'biofreeze-mark.png');
assertBrandMark(
  'goodsense-naproxen-220',
  'GoodSense',
  'goodsense-mark.png',
);
assertBrandMark('goodsense-dual-action', 'GoodSense', 'goodsense-mark.png');
assertBrandMark(
  'goodsense-childrens-ibuprofen-chew',
  'GoodSense',
  'goodsense-mark.png',
);
assertBrandMark(
  'goodsense-ibuprofen-liquid-gels',
  'GoodSense',
  'goodsense-mark.png',
);
assertBrandMark(
  'goodsense-es-pain-relief-l484',
  'GoodSense',
  'goodsense-mark.png',
);

{
  const colorlessRoll = previewOverlayImage({
    id: 'biofreeze-colorless-roll-on-4',
    formulaId: 'biofreeze-colorless-gel-4',
    brand: 'Biofreeze',
  });
  if (
    !colorlessRoll?.url.endsWith('/biofreeze-mark.png') ||
    colorlessRoll.verifiedSku
  ) {
    throw new Error('colorless roll-on must not inherit the gel carton');
  }
  const proRoll = previewOverlayImage({
    id: 'absorbine-jr-pro-roll-on-liquid',
    formulaId: 'absorbine-jr-plus-es-liquid',
    brand: 'Absorbine Jr.',
  });
  if (
    !proRoll?.url.endsWith('/absorbine-jr-mark.png') ||
    proRoll.verifiedSku
  ) {
    throw new Error('PRO roll-on must not inherit the Plus ES liquid carton');
  }
  const proAerosol = previewOverlayImage({
    id: 'biofreeze-professional-aerosol-10-5-denatonium',
    formulaId: 'biofreeze-pain-relief-spray-10-5-denatonium',
    brand: 'Biofreeze',
  });
  if (
    !proAerosol?.url.endsWith('/biofreeze-mark.png') ||
    proAerosol.verifiedSku
  ) {
    throw new Error(
      'Professional aerosol must not inherit the consumer denatonium spray carton',
    );
  }
}

// Remaining later-catalog P&F leftovers stay letters until attempted.

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
assertBrandTextTile('flexall-max-strength-gel', 'Flexall', 'Flexall');
assertBrandTextTile('midol-complete', 'Midol', 'Midol');
assertBrandTextTile('now-turmeric-curcumin-bioperine', 'NOW', 'NOW');
assertBrandTextTile(
  'gol-mykind-turmeric-inflammatory-gummies',
  'Garden of Life',
  'Garden of Life',
);
assertBrandTextTile(
  'organic-india-turmeric-formula',
  'Organic India',
  'Organic India',
);
assertBrandTextTile('aleve-caplets-tablets', 'Aleve', 'Aleve');
assertBrandTextTile('aleve-gelcaps', 'Aleve', 'Aleve');
assertBrandTextTile('aleve-liquid-gels', 'Aleve', 'Aleve');
assertBrandTextTile('aleve-back-muscle-pain', 'Aleve', 'Aleve');
assertBrandTextTile('aleve-headache-pain', 'Aleve', 'Aleve');
assertBrandTextTile('bayer-es-500-aspirina', 'Bayer', 'Bayer');
assertBrandTextTile(
  'bayer-back-body-aspirina-cafeina',
  'Bayer',
  'Bayer',
);
assertBrandTextTile('bayer-aspirin-regimen-enteric', 'Bayer', 'Bayer');
assertBrandTextTile('bayer-chewable-81-orange', 'Bayer', 'Bayer');
assertBrandTextTile('bayer-chewable-81-cherry', 'Bayer', 'Bayer');
assertBrandTextTile('genuine-bayer-aspirin-325', 'Bayer', 'Bayer');
assertBrandTextTile(
  'alevex-pain-relieving-lotion-roll-on',
  'AleveX',
  'AleveX',
);
assertBrandTextTile(
  'alevex-pain-relieving-lotion-tube',
  'AleveX',
  'AleveX',
);
assertBrandTextTile('alevex-pain-relieving-spray', 'AleveX', 'AleveX');
assertBrandTextTile('aleve-arthritis-pain-gel', 'Aleve', 'Aleve');
assertBrandTextTile('timecap-naproxen-220', 'TIME-Cap Labs', 'TIME-Cap');
assertBrandTextTile(
  'healtha2z-ibuprofen-200-382',
  'HealthA2Z',
  'HealthA2Z',
);
assertBrandTextTile(
  'healthwise-lidocaine-4-patch',
  'HealthWise',
  'HealthWise',
);
assertBrandTextTile(
  'welmate-lidocaine-4-patch-parabens',
  'WELMATE',
  'WELMATE',
);
assertBrandTextTile(
  'healtha2z-ibuprofen-200-335',
  'HealthA2Z',
  'HealthA2Z',
);
assertBrandTextTile(
  'amazon-basics-lidocaine-4-patch',
  'Amazon Basics',
  'Amazon Basics',
);
assertBrandTextTile(
  'welmate-lidocaine-4-patch-ethylhexyl',
  'WELMATE',
  'WELMATE',
);
assertBrandTextTile(
  'amazon-basic-care-ibuprofen-iron-oxide-yellow',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basics-ibuprofen-iron-oxide-yellow',
  'Amazon Basics',
  'Amazon Basics',
);
assertBrandTextTile(
  'aplus-health-dual-action-oxides',
  'A+Health',
  'A+Health',
);
assertBrandTextTile('aplus-health-dual-action', 'A+Health', 'A+Health');
assertBrandTextTile(
  'healtha2z-childrens-apap-chew',
  'HealthA2Z',
  'HealthA2Z',
);
assertBrandTextTile('timecap-ibuprofen-200', 'TIME-Cap Labs', 'TIME-Cap');
assertBrandTextTile(
  'sumifun-lidocaine-4-patch',
  'Sumifun',
  'Sumifun',
);
assertBrandTextTile(
  'amazon-elements-turmeric-complex',
  'Amazon Elements',
  'Amazon Elements',
);
assertBrandTextTile(
  'teemofe-lidocaine-4-patch',
  'Teemofe',
  'Teemofe',
);
assertBrandTextTile(
  'healtha2z-naproxen-220-300',
  'HealthA2Z',
  'HealthA2Z',
);
assertBrandTextTile(
  'amazon-basic-care-apap-650-er-l544',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-aspirin-81-chew-l467',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-elements-turmeric-root',
  'Amazon Elements',
  'Amazon Elements',
);
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
assertExactCarton(
  'biofreeze-menthol-patches',
  'Biofreeze',
  'biofreeze-menthol-patches.jpg',
);
assertExactCarton(
  'biofreeze-pain-relief-spray-10-5-denatonium',
  'Biofreeze',
  'biofreeze-pain-relief-spray-10-5-denatonium.jpg',
);
assertExactCarton(
  'capzasin-hp-arthritis-cream',
  'Capzasin',
  'capzasin-hp-arthritis-cream.jpg',
);
assertExactCarton(
  'bengay-ultra-strength-patch-5',
  'Bengay',
  'bengay-ultra-strength-patch-5.jpg',
);
assertExactCarton(
  'ollois-arnica-montana-12c',
  'Ollois',
  'ollois-arnica-montana-12c.jpg',
);
assertExactCarton(
  'thrive-wellmade-turmeric',
  'wellmade by Thrive Market',
  'thrive-wellmade-turmeric.jpg',
);
assertExactCarton(
  'new-chapter-turmeric-force',
  'New Chapter',
  'new-chapter-turmeric-force.jpg',
);
assertExactCarton(
  'gaia-turmeric-supreme-extra-strength',
  'Gaia Herbs',
  'gaia-turmeric-supreme-extra-strength.jpg',
);
assertExactCarton(
  'thorne-curcumin-phytosome-500',
  'Thorne',
  'thorne-curcumin-phytosome-500.jpg',
);
assertExactCarton(
  'thorne-curcumin-phytosome-1000',
  'Thorne',
  'thorne-curcumin-phytosome-1000.jpg',
);
assertExactCarton(
  'asutra-melt-pain-away-thrive',
  'Asutra',
  'asutra-melt-pain-away-thrive.jpg',
);
assertExactCarton(
  'mommys-bliss-infants-pain-fever',
  "Mommy's Bliss",
  'mommys-bliss-infants-pain-fever.jpg',
);
assertExactCarton(
  'bioschwartz-turmeric-curcumin-1500',
  'BioSchwartz',
  'bioschwartz-turmeric-curcumin-1500.jpg',
);
assertExactCarton(
  'qunol-extra-strength-turmeric-1500',
  'Qunol',
  'qunol-extra-strength-turmeric-1500.jpg',
);
assertExactCarton(
  'qunol-extra-strength-turmeric-1000',
  'Qunol',
  'qunol-extra-strength-turmeric-1000.jpg',
);
assertExactCarton(
  'qunol-zero-sugar-turmeric-gummies',
  'Qunol',
  'qunol-zero-sugar-turmeric-gummies.jpg',
);
assertExactCarton(
  'stopain-extra-strength-roll-on',
  'Stopain',
  'stopain-extra-strength-roll-on.jpg',
);
assertExactCarton(
  'mentholatum-original',
  'Mentholatum',
  'mentholatum-original.jpg',
);
assertExactCarton(
  'jointflex-pain-relief-cream',
  'JointFlex',
  'jointflex-pain-relief-cream.jpg',
);
assertExactCarton(
  'topricin-pain-relief-cream',
  'Topricin',
  'topricin-pain-relief-cream.jpg',
);
assertExactCarton(
  'blue-emu-original',
  'Blue-Emu',
  'blue-emu-original.jpg',
);
assertExactCarton(
  'penetrex-pain-relief-cream',
  'Penetrex',
  'penetrex-pain-relief-cream.jpg',
);
assertExactCarton(
  'sprouts-tart-cherry-turmeric',
  'Sprouts',
  'sprouts-tart-cherry-turmeric.jpg',
);
assertExactCarton(
  'sprouts-turmeric-capsules',
  'Sprouts',
  'sprouts-turmeric-capsules.jpg',
);

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
assertExactCarton('boiron-kali-iodatum-pellets', 'Boiron', 'boiron-kali-iodatum-pellets.jpg');
assertExactCarton('boiron-pyrogenium-pellets', 'Boiron', 'boiron-pyrogenium-pellets.jpg');
assertExactCarton('boiron-stannummetallicum-pellets', 'Boiron', 'boiron-stannummetallicum-pellets.jpg');
assertExactCarton('boiron-barytacarbonica-pellets', 'Boiron', 'boiron-barytacarbonica-pellets.jpg');
assertExactCarton('boiron-coniummaculatum-pellets', 'Boiron', 'boiron-coniummaculatum-pellets.jpg');
assertExactCarton('boiron-kalmialatifolia-pellets', 'Boiron', 'boiron-kalmialatifolia-pellets.jpg');
assertExactCarton('boiron-liliumtigrinum-pellets', 'Boiron', 'boiron-liliumtigrinum-pellets.jpg');
assertExactCarton('boiron-lobelia-inflata-pellets', 'Boiron', 'boiron-lobelia-inflata-pellets.jpg');
assertExactCarton('boiron-mezereum-pellets', 'Boiron', 'boiron-mezereum-pellets.jpg');
assertExactCarton('boiron-nitricumacidum-pellets', 'Boiron', 'boiron-nitricumacidum-pellets.jpg');
assertExactCarton('boiron-plantagomajor-pellets', 'Boiron', 'boiron-plantagomajor-pellets.jpg');
assertExactCarton('boiron-spigeliaanthelmia-pellets', 'Boiron', 'boiron-spigeliaanthelmia-pellets.jpg');
assertExactCarton('boiron-alfalfa-pellets', 'Boiron', 'boiron-alfalfa-pellets.jpg');
assertExactCarton('boiron-alumina-pellets', 'Boiron', 'boiron-alumina-pellets.jpg');
assertExactCarton('boiron-formicarufa-pellets', 'Boiron', 'boiron-formicarufa-pellets.jpg');
assertExactCarton('boiron-calcarea-sulphurica-pellets', 'Boiron', 'boiron-calcarea-sulphurica-pellets.jpg');
assertExactCarton('boiron-zincum-metallicum-pellets', 'Boiron', 'boiron-zincum-metallicum-pellets.jpg');
assertExactCarton('boiron-natrum-sulphuricum-pellets', 'Boiron', 'boiron-natrum-sulphuricum-pellets.jpg');
assertExactCarton('boiron-calcarea-phosphorica-pellets', 'Boiron', 'boiron-calcarea-phosphorica-pellets.jpg');
assertExactCarton('boiron-rhus-tox-pellets', 'Boiron', 'boiron-rhus-tox-pellets.jpg');
assertExactCarton('boiron-abelmoschus-pellets', 'Boiron', 'boiron-abelmoschus-pellets.jpg');
assertExactCarton('boiron-abiescanadensis-pellets', 'Boiron', 'boiron-abiescanadensis-pellets.jpg');
assertExactCarton('boiron-abrotanum-pellets', 'Boiron', 'boiron-abrotanum-pellets.jpg');
assertExactCarton('boiron-aesculus-hippocastanum-pellets', 'Boiron', 'boiron-aesculus-hippocastanum-pellets.jpg');
assertExactCarton('boiron-aethusacynapium-pellets', 'Boiron', 'boiron-aethusacynapium-pellets.jpg');
assertExactCarton('boiron-agaricusmuscarius-pellets', 'Boiron', 'boiron-agaricusmuscarius-pellets.jpg');
assertExactCarton('boiron-agraphisnutans-pellets', 'Boiron', 'boiron-agraphisnutans-pellets.jpg');
assertExactCarton('boiron-ailanthusglandulosus-pellets', 'Boiron', 'boiron-ailanthusglandulosus-pellets.jpg');
assertExactCarton('boiron-alumen-pellets', 'Boiron', 'boiron-alumen-pellets.jpg');
assertExactCarton('boiron-aluminasilicata-pellets', 'Boiron', 'boiron-aluminasilicata-pellets.jpg');
assertExactCarton('boiron-aluminiummetallicum-pellets', 'Boiron', 'boiron-aluminiummetallicum-pellets.jpg');
assertExactCarton('boiron-ammoniumcarbonicum-pellets', 'Boiron', 'boiron-ammoniumcarbonicum-pellets.jpg');
assertExactCarton('boiron-ammoniummuriaticum-pellets', 'Boiron', 'boiron-ammoniummuriaticum-pellets.jpg');
assertExactCarton('boiron-ammoniumphosphoricum-pellets', 'Boiron', 'boiron-ammoniumphosphoricum-pellets.jpg');
assertExactCarton('boiron-amylnitrosum-pellets', 'Boiron', 'boiron-amylnitrosum-pellets.jpg');
assertExactCarton('boiron-anacardiumoccidentale-pellets', 'Boiron', 'boiron-anacardiumoccidentale-pellets.jpg');
assertExactCarton('boiron-anacardiumorientale-pellets', 'Boiron', 'boiron-anacardiumorientale-pellets.jpg');
assertExactCarton('boiron-anagallisarvensis-pellets', 'Boiron', 'boiron-anagallisarvensis-pellets.jpg');
assertExactCarton('boiron-anatherummuricatum-pellets', 'Boiron', 'boiron-anatherummuricatum-pellets.jpg');
assertExactCarton('boiron-antimoniumiodatum-pellets', 'Boiron', 'boiron-antimoniumiodatum-pellets.jpg');
assertExactCarton('boiron-apisvenenumpurum-pellets', 'Boiron', 'boiron-apisvenenumpurum-pellets.jpg');
assertExactCarton('boiron-aquamarina-pellets', 'Boiron', 'boiron-aquamarina-pellets.jpg');
assertExactCarton('boiron-araliaracemosa-pellets', 'Boiron', 'boiron-araliaracemosa-pellets.jpg');
assertExactCarton('boiron-argentummetallicum-pellets', 'Boiron', 'boiron-argentummetallicum-pellets.jpg');
assertExactCarton('boiron-aristolochiaclematitis-pellets', 'Boiron', 'boiron-aristolochiaclematitis-pellets.jpg');
assertExactCarton('boiron-arsenicumbromatum-pellets', 'Boiron', 'boiron-arsenicumbromatum-pellets.jpg');
assertExactCarton('boiron-arsenicumiodatum-pellets', 'Boiron', 'boiron-arsenicumiodatum-pellets.jpg');
assertExactCarton('boiron-arsenicummetallicum-pellets', 'Boiron', 'boiron-arsenicummetallicum-pellets.jpg');
assertExactCarton('boiron-arssulphflav-pellets', 'Boiron', 'boiron-arssulphflav-pellets.jpg');
assertExactCarton('boiron-arssulphrubrum-pellets', 'Boiron', 'boiron-arssulphrubrum-pellets.jpg');
assertExactCarton('boiron-artemisiavulgaris-pellets', 'Boiron', 'boiron-artemisiavulgaris-pellets.jpg');
assertExactCarton('boiron-arum-triphyllum-pellets', 'Boiron', 'boiron-arum-triphyllum-pellets.jpg');
assertExactCarton('boiron-arummaculatum-pellets', 'Boiron', 'boiron-arummaculatum-pellets.jpg');
assertExactCarton('boiron-asafoetida-pellets', 'Boiron', 'boiron-asafoetida-pellets.jpg');
assertExactCarton('boiron-asarumeuropaeum3c-pellets', 'Boiron', 'boiron-asarumeuropaeum3c-pellets.jpg');
assertExactCarton('boiron-asteriasrubens-pellets', 'Boiron', 'boiron-asteriasrubens-pellets.jpg');
assertExactCarton('boiron-aurumiodatum-pellets', 'Boiron', 'boiron-aurumiodatum-pellets.jpg');
assertExactCarton('boiron-aurummetallicum-pellets', 'Boiron', 'boiron-aurummetallicum-pellets.jpg');
assertExactCarton('boiron-aurummuriaticum-pellets', 'Boiron', 'boiron-aurummuriaticum-pellets.jpg');
assertExactCarton('boiron-aurummuriatnatronatum-pellets', 'Boiron', 'boiron-aurummuriatnatronatum-pellets.jpg');
assertExactCarton('boiron-barytaiodata-pellets', 'Boiron', 'boiron-barytaiodata-pellets.jpg');
assertExactCarton('boiron-barytamuriatica-pellets', 'Boiron', 'boiron-barytamuriatica-pellets.jpg');
assertExactCarton('boiron-benzinum-pellets', 'Boiron', 'boiron-benzinum-pellets.jpg');
assertExactCarton('boiron-benzoicumacidum-pellets', 'Boiron', 'boiron-benzoicumacidum-pellets.jpg');
assertExactCarton('boiron-berberisaquifolium-pellets', 'Boiron', 'boiron-berberisaquifolium-pellets.jpg');
assertExactCarton('boiron-berberisvulgaris-pellets', 'Boiron', 'boiron-berberisvulgaris-pellets.jpg');
assertExactCarton('boiron-berylliummetallicum-pellets', 'Boiron', 'boiron-berylliummetallicum-pellets.jpg');
assertExactCarton('boiron-bismuthummetallicum-pellets', 'Boiron', 'boiron-bismuthummetallicum-pellets.jpg');
assertExactCarton('boiron-bismuthumsubnitricum-pellets', 'Boiron', 'boiron-bismuthumsubnitricum-pellets.jpg');
assertExactCarton('boiron-blattaorientalis-pellets', 'Boiron', 'boiron-blattaorientalis-pellets.jpg');
assertExactCarton('boiron-bovista-pellets', 'Boiron', 'boiron-bovista-pellets.jpg');
assertExactCarton('boiron-bromium-pellets', 'Boiron', 'boiron-bromium-pellets.jpg');
assertExactCarton('boiron-cadmiummetallicum-pellets', 'Boiron', 'boiron-cadmiummetallicum-pellets.jpg');
assertExactCarton('boiron-cadmiumsulphuratum-pellets', 'Boiron', 'boiron-cadmiumsulphuratum-pellets.jpg');
assertExactCarton('boiron-cadmiumsulphuricum-pellets', 'Boiron', 'boiron-cadmiumsulphuricum-pellets.jpg');
assertExactCarton('boiron-cajuputum-pellets', 'Boiron', 'boiron-cajuputum-pellets.jpg');
assertExactCarton('boiron-caladiumseguinum-pellets', 'Boiron', 'boiron-caladiumseguinum-pellets.jpg');
assertExactCarton('boiron-calcareaiodata-pellets', 'Boiron', 'boiron-calcareaiodata-pellets.jpg');
assertExactCarton('boiron-calcareasilicata-pellets', 'Boiron', 'boiron-calcareasilicata-pellets.jpg');
assertExactCarton('boiron-camphora-pellets', 'Boiron', 'boiron-camphora-pellets.jpg');
assertExactCarton('boiron-candidaalbicans-pellets', 'Boiron', 'boiron-candidaalbicans-pellets.jpg');
assertExactCarton('boiron-capsicumannuum-pellets', 'Boiron', 'boiron-capsicumannuum-pellets.jpg');
assertExactCarton('boiron-carboanimalis-pellets', 'Boiron', 'boiron-carboanimalis-pellets.jpg');
assertExactCarton('boiron-carbolicumacidum-pellets', 'Boiron', 'boiron-carbolicumacidum-pellets.jpg');
assertExactCarton('boiron-carboneumsulphuratum-pellets', 'Boiron', 'boiron-carboneumsulphuratum-pellets.jpg');
assertExactCarton('boiron-carduusmarianus-pellets', 'Boiron', 'boiron-carduusmarianus-pellets.jpg');
assertExactCarton('boiron-caulophyllum-thalictroides-pellets', 'Boiron', 'boiron-caulophyllum-thalictroides-pellets.jpg');
assertExactCarton('boiron-cedron-pellets', 'Boiron', 'boiron-cedron-pellets.jpg');
assertExactCarton('boiron-cenchriscontortrix-pellets', 'Boiron', 'boiron-cenchriscontortrix-pellets.jpg');
assertExactCarton('boiron-cheiranthuscheiri-pellets', 'Boiron', 'boiron-cheiranthuscheiri-pellets.jpg');
assertExactCarton('boiron-chelidonium-majus-pellets', 'Boiron', 'boiron-chelidonium-majus-pellets.jpg');
assertExactCarton('boiron-chenopodium-anthelminticum-pellets', 'Boiron', 'boiron-chenopodium-anthelminticum-pellets.jpg');
assertExactCarton('boiron-chininumarsenicosum-pellets', 'Boiron', 'boiron-chininumarsenicosum-pellets.jpg');
assertExactCarton('boiron-chininumsalicylicum-pellets', 'Boiron', 'boiron-chininumsalicylicum-pellets.jpg');
assertExactCarton('boiron-chininumsulphuricum-pellets', 'Boiron', 'boiron-chininumsulphuricum-pellets.jpg');
assertExactCarton('boiron-chionanthus-virginica-pellets', 'Boiron', 'boiron-chionanthus-virginica-pellets.jpg');
assertExactCarton('boiron-chlorinum-pellets', 'Boiron', 'boiron-chlorinum-pellets.jpg');
assertExactCarton('boiron-cicutavirosa-pellets', 'Boiron', 'boiron-cicutavirosa-pellets.jpg');
assertExactCarton('boiron-cimicifuga-racemosa-pellets', 'Boiron', 'boiron-cimicifuga-racemosa-pellets.jpg');
assertExactCarton('boiron-cinerariamaritima-pellets', 'Boiron', 'boiron-cinerariamaritima-pellets.jpg');
assertExactCarton('boiron-cinnamomum-pellets', 'Boiron', 'boiron-cinnamomum-pellets.jpg');
assertExactCarton('boiron-cobaltummetallicum-pellets', 'Boiron', 'boiron-cobaltummetallicum-pellets.jpg');
assertExactCarton('boiron-condurango-pellets', 'Boiron', 'boiron-condurango-pellets.jpg');
assertExactCarton('boiron-coralliumrubrum-pellets', 'Boiron', 'boiron-coralliumrubrum-pellets.jpg');
assertExactCarton('boiron-cortisoneaceticum-pellets', 'Boiron', 'boiron-cortisoneaceticum-pellets.jpg');
assertExactCarton('boiron-crocussativus-pellets', 'Boiron', 'boiron-crocussativus-pellets.jpg');
assertExactCarton('boiron-croton-tiglium-pellets', 'Boiron', 'boiron-croton-tiglium-pellets.jpg');
assertExactCarton('boiron-cuprumaceticum-pellets', 'Boiron', 'boiron-cuprumaceticum-pellets.jpg');
assertExactCarton('boiron-cuprumarsenicosum-pellets', 'Boiron', 'boiron-cuprumarsenicosum-pellets.jpg');
assertExactCarton('boiron-cuprumoxydatumnigrum-pellets', 'Boiron', 'boiron-cuprumoxydatumnigrum-pellets.jpg');
assertExactCarton('boiron-curare-pellets', 'Boiron', 'boiron-curare-pellets.jpg');
assertExactCarton('boiron-cyclamen-europaeum-pellets', 'Boiron', 'boiron-cyclamen-europaeum-pellets.jpg');
assertExactCarton('boiron-cyclameneur-pellets', 'Boiron', 'boiron-cyclameneur-pellets.jpg');
assertExactCarton('boiron-dioscoreavillosa-pellets', 'Boiron', 'boiron-dioscoreavillosa-pellets.jpg');
assertExactCarton('boiron-dolichospruriens-pellets', 'Boiron', 'boiron-dolichospruriens-pellets.jpg');
assertExactCarton('boiron-echinacea-pellets', 'Boiron', 'boiron-echinacea-pellets.jpg');
assertExactCarton('boiron-echinaceapurpurea-pellets', 'Boiron', 'boiron-echinaceapurpurea-pellets.jpg');
assertExactCarton('boiron-elapscorallinus-pellets', 'Boiron', 'boiron-elapscorallinus-pellets.jpg');
assertExactCarton('boiron-equisetumarvense-pellets', 'Boiron', 'boiron-equisetumarvense-pellets.jpg');
assertExactCarton('boiron-equisetumhyemale-pellets', 'Boiron', 'boiron-equisetumhyemale-pellets.jpg');
assertExactCarton('boiron-erigeroncanadensis-pellets', 'Boiron', 'boiron-erigeroncanadensis-pellets.jpg');
assertExactCarton('boiron-eugeniajambosa-pellets', 'Boiron', 'boiron-eugeniajambosa-pellets.jpg');
assertExactCarton('boiron-fagopyrumesculentum-pellets', 'Boiron', 'boiron-fagopyrumesculentum-pellets.jpg');
assertExactCarton('boiron-ferrumpicricum-pellets', 'Boiron', 'boiron-ferrumpicricum-pellets.jpg');
assertExactCarton('boiron-ferrumsulphuricum-pellets', 'Boiron', 'boiron-ferrumsulphuricum-pellets.jpg');
assertExactCarton('boiron-filixmas-pellets', 'Boiron', 'boiron-filixmas-pellets.jpg');
assertExactCarton('boiron-folliculinum-pellets', 'Boiron', 'boiron-folliculinum-pellets.jpg');
assertExactCarton('boiron-fragariavesca-pellets', 'Boiron', 'boiron-fragariavesca-pellets.jpg');
assertExactCarton('boiron-fucusvesiculosus-pellets', 'Boiron', 'boiron-fucusvesiculosus-pellets.jpg');
assertExactCarton('boiron-fumariaofficinalis-pellets', 'Boiron', 'boiron-fumariaofficinalis-pellets.jpg');
assertExactCarton('boiron-gallicumacidum-pellets', 'Boiron', 'boiron-gallicumacidum-pellets.jpg');
assertExactCarton('boiron-geraniummaculatum-pellets', 'Boiron', 'boiron-geraniummaculatum-pellets.jpg');
assertExactCarton('boiron-glonoinum-pellets', 'Boiron', 'boiron-glonoinum-pellets.jpg');
assertExactCarton('boiron-gnaphalium-polycephalum-pellets', 'Boiron', 'boiron-gnaphalium-polycephalum-pellets.jpg');
assertExactCarton('boiron-gossypiumherbaceum-pellets', 'Boiron', 'boiron-gossypiumherbaceum-pellets.jpg');
assertExactCarton('boiron-granatum-pellets', 'Boiron', 'boiron-granatum-pellets.jpg');
assertExactCarton('boiron-graphites-pellets', 'Boiron', 'boiron-graphites-pellets.jpg');
assertExactCarton('boiron-gratiolaofficinalis-pellets', 'Boiron', 'boiron-gratiolaofficinalis-pellets.jpg');
assertExactCarton('boiron-gunpowder-pellets', 'Boiron', 'boiron-gunpowder-pellets.jpg');
assertExactCarton('boiron-harpagophytum-pellets', 'Boiron', 'boiron-harpagophytum-pellets.jpg');
assertExactCarton('boiron-helleborusniger-pellets', 'Boiron', 'boiron-helleborusniger-pellets.jpg');
assertExactCarton('boiron-heloniasdioica-pellets', 'Boiron', 'boiron-heloniasdioica-pellets.jpg');
assertExactCarton('boiron-hepaticatriloba-pellets', 'Boiron', 'boiron-hepaticatriloba-pellets.jpg');
assertExactCarton('boiron-hurabrasiliensis-pellets', 'Boiron', 'boiron-hurabrasiliensis-pellets.jpg');
assertExactCarton('boiron-hydrocotyleasiatica-pellets', 'Boiron', 'boiron-hydrocotyleasiatica-pellets.jpg');
assertExactCarton('boiron-hydrocyanicumacidum-pellets', 'Boiron', 'boiron-hydrocyanicumacidum-pellets.jpg');
assertExactCarton('boiron-hydrofluoricumacidum-pellets', 'Boiron', 'boiron-hydrofluoricumacidum-pellets.jpg');
assertExactCarton('boiron-iberisamara-pellets', 'Boiron', 'boiron-iberisamara-pellets.jpg');
assertExactCarton('boiron-iodium-pellets', 'Boiron', 'boiron-iodium-pellets.jpg');
assertExactCarton('boiron-irisversicolor-pellets', 'Boiron', 'boiron-irisversicolor-pellets.jpg');
assertExactCarton('boiron-juglansregia-pellets', 'Boiron', 'boiron-juglansregia-pellets.jpg');
assertExactCarton('boiron-kaliarsenicosum-pellets', 'Boiron', 'boiron-kaliarsenicosum-pellets.jpg');
assertExactCarton('boiron-kalibromatum-pellets', 'Boiron', 'boiron-kalibromatum-pellets.jpg');
assertExactCarton('boiron-kalichloricum-pellets', 'Boiron', 'boiron-kalichloricum-pellets.jpg');
assertExactCarton('boiron-kreosotum-pellets', 'Boiron', 'boiron-kreosotum-pellets.jpg');
assertExactCarton('boiron-laccaninum-pellets', 'Boiron', 'boiron-laccaninum-pellets.jpg');
assertExactCarton('boiron-lacdefloratum-pellets', 'Boiron', 'boiron-lacdefloratum-pellets.jpg');
assertExactCarton('boiron-lachesis-mutus-pellets', 'Boiron', 'boiron-lachesis-mutus-pellets.jpg');
assertExactCarton('boiron-lachnanthestinctoria-pellets', 'Boiron', 'boiron-lachnanthestinctoria-pellets.jpg');
assertExactCarton('boiron-lacticumacidum-pellets', 'Boiron', 'boiron-lacticumacidum-pellets.jpg');
assertExactCarton('boiron-lactucavirosa-pellets', 'Boiron', 'boiron-lactucavirosa-pellets.jpg');
assertExactCarton('boiron-lathyrussativus-pellets', 'Boiron', 'boiron-lathyrussativus-pellets.jpg');
assertExactCarton('boiron-laurocerasus-pellets', 'Boiron', 'boiron-laurocerasus-pellets.jpg');
assertExactCarton('boiron-lemnaminor-pellets', 'Boiron', 'boiron-lemnaminor-pellets.jpg');
assertExactCarton('boiron-lithiumcarbonicum-pellets', 'Boiron', 'boiron-lithiumcarbonicum-pellets.jpg');
assertExactCarton('boiron-magnesia-phosphorica-pellets', 'Boiron', 'boiron-magnesia-phosphorica-pellets.jpg');
assertExactCarton('boiron-magnesiacarbonica-pellets', 'Boiron', 'boiron-magnesiacarbonica-pellets.jpg');
assertExactCarton('boiron-magnesiamuriatica-pellets', 'Boiron', 'boiron-magnesiamuriatica-pellets.jpg');
assertExactCarton('boiron-magnesiasulphurica-pellets', 'Boiron', 'boiron-magnesiasulphurica-pellets.jpg');
assertExactCarton('boiron-manganumaceticum-pellets', 'Boiron', 'boiron-manganumaceticum-pellets.jpg');
assertExactCarton('boiron-manganummetallicum-pellets', 'Boiron', 'boiron-manganummetallicum-pellets.jpg');
assertExactCarton('boiron-melilotusofficinalis-pellets', 'Boiron', 'boiron-melilotusofficinalis-pellets.jpg');
assertExactCarton('boiron-melissa-officinalis-pellets', 'Boiron', 'boiron-melissa-officinalis-pellets.jpg');
assertExactCarton('boiron-menyanthestrifoliata-pellets', 'Boiron', 'boiron-menyanthestrifoliata-pellets.jpg');
assertExactCarton('boiron-mercurius-solubilis-pellets', 'Boiron', 'boiron-mercurius-solubilis-pellets.jpg');
assertExactCarton('boiron-mercuriuscorrosivus-pellets', 'Boiron', 'boiron-mercuriuscorrosivus-pellets.jpg');
assertExactCarton('boiron-mercuriuscyanatus-pellets', 'Boiron', 'boiron-mercuriuscyanatus-pellets.jpg');
assertExactCarton('boiron-mercuriusdulcis-pellets', 'Boiron', 'boiron-mercuriusdulcis-pellets.jpg');
assertExactCarton('boiron-mercuriusiodatusruber-pellets', 'Boiron', 'boiron-mercuriusiodatusruber-pellets.jpg');
assertExactCarton('boiron-mercuriussulphruber-pellets', 'Boiron', 'boiron-mercuriussulphruber-pellets.jpg');
assertExactCarton('boiron-mercuriusvivus-pellets', 'Boiron', 'boiron-mercuriusvivus-pellets.jpg');
assertExactCarton('boiron-millefolium-pellets', 'Boiron', 'boiron-millefolium-pellets.jpg');
assertExactCarton('boiron-momordicabalsamina-pellets', 'Boiron', 'boiron-momordicabalsamina-pellets.jpg');
assertExactCarton('boiron-murexpurpurea-pellets', 'Boiron', 'boiron-murexpurpurea-pellets.jpg');
assertExactCarton('boiron-muriaticumacidum-pellets', 'Boiron', 'boiron-muriaticumacidum-pellets.jpg');
assertExactCarton('boiron-mygale-pellets', 'Boiron', 'boiron-mygale-pellets.jpg');
assertExactCarton('boiron-myristicasebifera-pellets', 'Boiron', 'boiron-myristicasebifera-pellets.jpg');
assertExactCarton('boiron-najatripudians-pellets', 'Boiron', 'boiron-najatripudians-pellets.jpg');
assertExactCarton('boiron-naphthalinum-pellets', 'Boiron', 'boiron-naphthalinum-pellets.jpg');
assertExactCarton('boiron-natrumcarbonicum-pellets', 'Boiron', 'boiron-natrumcarbonicum-pellets.jpg');
assertExactCarton('boiron-natrumphosphoricum-pellets', 'Boiron', 'boiron-natrumphosphoricum-pellets.jpg');
assertExactCarton('boiron-niccolummetallicum-pellets', 'Boiron', 'boiron-niccolummetallicum-pellets.jpg');
assertExactCarton('boiron-ocimumcanum-pellets', 'Boiron', 'boiron-ocimumcanum-pellets.jpg');
assertExactCarton('boiron-oenanthecrocata-pellets', 'Boiron', 'boiron-oenanthecrocata-pellets.jpg');
assertExactCarton('boiron-oleander-pellets', 'Boiron', 'boiron-oleander-pellets.jpg');
assertExactCarton('boiron-onosmodiumvirginianum-pellets', 'Boiron', 'boiron-onosmodiumvirginianum-pellets.jpg');
assertExactCarton('boiron-ornithogalumumbellatum-pellets', 'Boiron', 'boiron-ornithogalumumbellatum-pellets.jpg');
assertExactCarton('boiron-oxalicumacidum-pellets', 'Boiron', 'boiron-oxalicumacidum-pellets.jpg');
assertExactCarton('boiron-palladiummetallicum-pellets', 'Boiron', 'boiron-palladiummetallicum-pellets.jpg');
assertExactCarton('boiron-pareirabrava-pellets', 'Boiron', 'boiron-pareirabrava-pellets.jpg');
assertExactCarton('boiron-parisquadrifolia-pellets', 'Boiron', 'boiron-parisquadrifolia-pellets.jpg');
assertExactCarton('boiron-phellandriumaquaticum-pellets', 'Boiron', 'boiron-phellandriumaquaticum-pellets.jpg');
assertExactCarton('boiron-phosphoricum-acidum-pellets', 'Boiron', 'boiron-phosphoricum-acidum-pellets.jpg');
assertExactCarton('boiron-physostigmavenenosum-pellets', 'Boiron', 'boiron-physostigmavenenosum-pellets.jpg');
assertExactCarton('boiron-picricumacidum-pellets', 'Boiron', 'boiron-picricumacidum-pellets.jpg');
assertExactCarton('boiron-pilocarpus-pellets', 'Boiron', 'boiron-pilocarpus-pellets.jpg');
assertExactCarton('boiron-pipermethysticum-pellets', 'Boiron', 'boiron-pipermethysticum-pellets.jpg');
assertExactCarton('boiron-platinummetallicum-pellets', 'Boiron', 'boiron-platinummetallicum-pellets.jpg');
assertExactCarton('boiron-plumbummetallicum-pellets', 'Boiron', 'boiron-plumbummetallicum-pellets.jpg');
assertExactCarton('boiron-polygonumpunctatum-pellets', 'Boiron', 'boiron-polygonumpunctatum-pellets.jpg');
assertExactCarton('boiron-pteleatrifoliata-pellets', 'Boiron', 'boiron-pteleatrifoliata-pellets.jpg');
assertExactCarton('boiron-quebracho-pellets', 'Boiron', 'boiron-quebracho-pellets.jpg');
assertExactCarton('boiron-radiumbromatum-pellets', 'Boiron', 'boiron-radiumbromatum-pellets.jpg');
assertExactCarton('boiron-ranunculusbulbosus-pellets', 'Boiron', 'boiron-ranunculusbulbosus-pellets.jpg');
assertExactCarton('boiron-raphanussativus-pellets', 'Boiron', 'boiron-raphanussativus-pellets.jpg');
assertExactCarton('boiron-rhododendronchrysanthum-pellets', 'Boiron', 'boiron-rhododendronchrysanthum-pellets.jpg');
assertExactCarton('boiron-rhusvenenata-pellets', 'Boiron', 'boiron-rhusvenenata-pellets.jpg');
assertExactCarton('boiron-ricinuscommunis-pellets', 'Boiron', 'boiron-ricinuscommunis-pellets.jpg');
assertExactCarton('boiron-ruta-graveolens-pellets', 'Boiron', 'boiron-ruta-graveolens-pellets.jpg');
assertExactCarton('boiron-sabal-serrulata-pellets', 'Boiron', 'boiron-sabal-serrulata-pellets.jpg');
assertExactCarton('boiron-sabina-pellets', 'Boiron', 'boiron-sabina-pellets.jpg');
assertExactCarton('boiron-saccharumofficinale-pellets', 'Boiron', 'boiron-saccharumofficinale-pellets.jpg');
assertExactCarton('boiron-salicylicumacidum-pellets', 'Boiron', 'boiron-salicylicumacidum-pellets.jpg');
assertExactCarton('boiron-sanguinariacanadensis-pellets', 'Boiron', 'boiron-sanguinariacanadensis-pellets.jpg');
assertExactCarton('boiron-sanguinarinumnitricum-pellets', 'Boiron', 'boiron-sanguinarinumnitricum-pellets.jpg');
assertExactCarton('boiron-saponariaofficinalis-pellets', 'Boiron', 'boiron-saponariaofficinalis-pellets.jpg');
assertExactCarton('boiron-sarcolacticum-acidum-pellets', 'Boiron', 'boiron-sarcolacticum-acidum-pellets.jpg');
assertExactCarton('boiron-sarsaparilla-pellets', 'Boiron', 'boiron-sarsaparilla-pellets.jpg');
assertExactCarton('boiron-scrophularianodosa-pellets', 'Boiron', 'boiron-scrophularianodosa-pellets.jpg');
assertExactCarton('boiron-secalecornutum-pellets', 'Boiron', 'boiron-secalecornutum-pellets.jpg');
assertExactCarton('boiron-seleniummetallicum-pellets', 'Boiron', 'boiron-seleniummetallicum-pellets.jpg');
assertExactCarton('boiron-sempervivumtectorum-pellets', 'Boiron', 'boiron-sempervivumtectorum-pellets.jpg');
assertExactCarton('boiron-senna-pellets', 'Boiron', 'boiron-senna-pellets.jpg');
assertExactCarton('boiron-sepia-pellets', 'Boiron', 'boiron-sepia-pellets.jpg');
assertExactCarton('boiron-silicamarina-pellets', 'Boiron', 'boiron-silicamarina-pellets.jpg');
assertExactCarton('boiron-sinapisnigra-pellets', 'Boiron', 'boiron-sinapisnigra-pellets.jpg');
assertExactCarton('boiron-strontiumcarbonicum-pellets', 'Boiron', 'boiron-strontiumcarbonicum-pellets.jpg');
assertExactCarton('boiron-sulphur-pellets', 'Boiron', 'boiron-sulphur-pellets.jpg');
assertExactCarton('boiron-sulphur-iodatum-pellets', 'Boiron', 'boiron-sulphur-iodatum-pellets.jpg');
assertExactCarton('boiron-sulphuricumacidum-pellets', 'Boiron', 'boiron-sulphuricumacidum-pellets.jpg');
assertExactCarton('boiron-symphoricarpusracemosus-pellets', 'Boiron', 'boiron-symphoricarpusracemosus-pellets.jpg');
assertExactCarton('boiron-taraxacumofficinale-pellets', 'Boiron', 'boiron-taraxacumofficinale-pellets.jpg');
assertExactCarton('boiron-tarentulacubensis-pellets', 'Boiron', 'boiron-tarentulacubensis-pellets.jpg');
assertExactCarton('boiron-tarentulahispana-pellets', 'Boiron', 'boiron-tarentulahispana-pellets.jpg');
assertExactCarton('boiron-telluriummetallicum-pellets', 'Boiron', 'boiron-telluriummetallicum-pellets.jpg');
assertExactCarton('boiron-terebinthina-pellets', 'Boiron', 'boiron-terebinthina-pellets.jpg');
assertExactCarton('boiron-teucriummarum-pellets', 'Boiron', 'boiron-teucriummarum-pellets.jpg');
assertExactCarton('boiron-theasinensis-pellets', 'Boiron', 'boiron-theasinensis-pellets.jpg');
assertExactCarton('boiron-theridion-pellets', 'Boiron', 'boiron-theridion-pellets.jpg');
assertExactCarton('boiron-thiosinaminum-pellets', 'Boiron', 'boiron-thiosinaminum-pellets.jpg');
assertExactCarton('boiron-thlaspibursapastoris-pellets', 'Boiron', 'boiron-thlaspibursapastoris-pellets.jpg');
assertExactCarton('boiron-thyroidinum-pellets', 'Boiron', 'boiron-thyroidinum-pellets.jpg');
assertExactCarton('boiron-titaniummetallicum-pellets', 'Boiron', 'boiron-titaniummetallicum-pellets.jpg');
assertExactCarton('boiron-trilliumpendulum-pellets', 'Boiron', 'boiron-trilliumpendulum-pellets.jpg');
assertExactCarton('boiron-tuberculinum-residuum-pellets', 'Boiron', 'boiron-tuberculinum-residuum-pellets.jpg');
assertExactCarton('boiron-ustilagomaidis-pellets', 'Boiron', 'boiron-ustilagomaidis-pellets.jpg');
assertExactCarton('boiron-uvaursi-pellets', 'Boiron', 'boiron-uvaursi-pellets.jpg');
assertExactCarton('boiron-venusmercenaria-pellets', 'Boiron', 'boiron-venusmercenaria-pellets.jpg');
assertExactCarton('boiron-veratrumviride-pellets', 'Boiron', 'boiron-veratrumviride-pellets.jpg');
assertExactCarton('boiron-vespacrabro-pellets', 'Boiron', 'boiron-vespacrabro-pellets.jpg');
assertExactCarton('boiron-viburnumopulus-pellets', 'Boiron', 'boiron-viburnumopulus-pellets.jpg');
assertExactCarton('boiron-violaodorata-pellets', 'Boiron', 'boiron-violaodorata-pellets.jpg');
assertExactCarton('boiron-violatricolor-pellets', 'Boiron', 'boiron-violatricolor-pellets.jpg');
assertExactCarton('boiron-viperaberus-pellets', 'Boiron', 'boiron-viperaberus-pellets.jpg');
assertExactCarton('boiron-viscumalbum-pellets', 'Boiron', 'boiron-viscumalbum-pellets.jpg');
assertExactCarton('boiron-xanthoxylumfraxineum-pellets', 'Boiron', 'boiron-xanthoxylumfraxineum-pellets.jpg');
assertExactCarton('boiron-zincumsulphuricum-pellets', 'Boiron', 'boiron-zincumsulphuricum-pellets.jpg');
assertExactCarton('voltaren-arthritis-pain-gel', 'Voltaren', 'voltaren-arthritis-pain-gel.jpg');
assertExactCarton('aspercreme-arthritis-pain-gel-fragrance', 'Aspercreme', 'aspercreme-arthritis-pain-gel-fragrance.jpg');
assertExactCarton('salonpas-pain-relieving-jet-spray', 'Salonpas', 'salonpas-pain-relieving-jet-spray.jpg');
assertExactCarton('icy-hot-performance-dry-spray', 'Icy Hot', 'icy-hot-performance-dry-spray.jpg');
assertExactCarton('icy-hot-dry-spray-original', 'Icy Hot', 'icy-hot-dry-spray-original.jpg');
assertExactCarton('icy-hot-pro-dry-spray', 'Icy Hot', 'icy-hot-pro-dry-spray.jpg');
assertExactCarton('icy-hot-lidocaine-dry-spray', 'Icy Hot', 'icy-hot-lidocaine-dry-spray.jpg');
assertExactCarton('aspercreme-lidocaine-dry-spray', 'Aspercreme', 'aspercreme-lidocaine-dry-spray.jpg');
assertExactCarton('salonpas-deep-relieving-gel', 'Salonpas', 'salonpas-deep-relieving-gel.jpg');
assertExactCarton('icy-hot-original-balm', 'Icy Hot', 'icy-hot-original-balm.jpg');
assertExactCarton('salonpas-lidocaine-plus-liquid', 'Salonpas', 'salonpas-lidocaine-plus-liquid.jpg');
assertExactCarton('aspercreme-original-cream', 'Aspercreme', 'aspercreme-original-cream.jpg');
assertExactCarton('aspercreme-professional-cream', 'Aspercreme', 'aspercreme-professional-cream.jpg');
assertExactCarton('tiger-balm-liniment', 'Tiger Balm', 'tiger-balm-liniment.jpg');
assertExactCarton('icy-hot-original-cream', 'Icy Hot', 'icy-hot-original-cream.jpg');
assertExactCarton('icy-hot-advanced-pain-relief-cream', 'Icy Hot', 'icy-hot-advanced-pain-relief-cream.jpg');
assertExactCarton('icy-hot-pro-no-mess', 'Icy Hot', 'icy-hot-pro-no-mess.jpg');
assertExactCarton('icy-hot-nighttime-recovery-roll-on', 'Icy Hot', 'icy-hot-nighttime-recovery-roll-on.jpg');
assertExactCarton('tiger-balm-muscle-rub', 'Tiger Balm', 'tiger-balm-muscle-rub.jpg');
assertExactCarton(
  'tiger-balm-pain-relieving-muscle-spray',
  'Tiger Balm',
  'tiger-balm-pain-relieving-muscle-spray.jpg',
);
assertExactCarton('tiger-balm-red-extra-strength', 'Tiger Balm', 'tiger-balm-red-extra-strength.jpg');
assertExactCarton('tiger-balm-ultra-strength', 'Tiger Balm', 'tiger-balm-ultra-strength.jpg');
assertExactCarton(
  'tiger-balm-white-regular-strength',
  'Tiger Balm',
  'tiger-balm-white-regular-strength.jpg',
);
assertExactCarton(
  'tiger-balm-neck-shoulder-vanishing-scent',
  'Tiger Balm',
  'tiger-balm-neck-shoulder-vanishing-scent.jpg',
);
assertExactCarton('icy-hot-pro-massaging-balm', 'Icy Hot', 'icy-hot-pro-massaging-balm.jpg');
assertExactCarton('icy-hot-lidocaine-no-mess-roll-on', 'Icy Hot', 'icy-hot-lidocaine-no-mess-roll-on.jpg');
assertExactCarton('icy-hot-original-no-mess-roll-on', 'Icy Hot', 'icy-hot-original-no-mess-roll-on.jpg');
assertExactCarton('icy-hot-max-lidocaine-cream', 'Icy Hot', 'icy-hot-max-lidocaine-cream.jpg');
assertExactCarton(
  'aspercreme-lidocaine-eucalyptus-cream',
  'Aspercreme',
  'aspercreme-lidocaine-eucalyptus-cream.jpg',
);
assertExactCarton('tiger-balm-pain-relieving-patch', 'Tiger Balm', 'tiger-balm-pain-relieving-patch.jpg');
assertExactCarton('icy-hot-lidocaine-large-patch', 'Icy Hot', 'icy-hot-lidocaine-large-patch.jpg');
assertExactCarton('icy-hot-pro-pain-relief-patch', 'Icy Hot', 'icy-hot-pro-pain-relief-patch.jpg');
assertExactCarton('aspercreme-lidocaine-patch', 'Aspercreme', 'aspercreme-lidocaine-patch.jpg');
assertExactCarton(
  'aspercreme-lidocaine-no-mess-applicator',
  'Aspercreme',
  'aspercreme-lidocaine-no-mess-applicator.jpg',
);
assertExactCarton(
  'aspercreme-lidocaine-rosemary-mint-cream',
  'Aspercreme',
  'aspercreme-lidocaine-rosemary-mint-cream.jpg',
);
assertExactCarton('aspercreme-lidocaine-odor-free', 'Aspercreme', 'aspercreme-lidocaine-odor-free.jpg');
assertExactCarton(
  'aspercreme-lidocaine-foot-pain-cream',
  'Aspercreme',
  'aspercreme-lidocaine-foot-pain-cream.jpg',
);
assertExactCarton('salonpas-lidocaine-gel-patch', 'Salonpas', 'salonpas-lidocaine-gel-patch.jpg');
assertExactCarton(
  'salonpas-lidocaine-gel-patch-hisamitsu',
  'Salonpas',
  'salonpas-lidocaine-gel-patch.jpg',
);
assertExactCarton(
  'salonpas-pain-relieving-patch-large',
  'Salonpas',
  'salonpas-pain-relieving-patch-large.jpg',
);
assertExactCarton('salonpas-lidocaine-flex-patch', 'Salonpas', 'salonpas-lidocaine-flex-patch.jpg');
assertExactCarton('salonpas-pain-relieving-patch', 'Salonpas', 'salonpas-pain-relieving-patch.jpg');
assertExactCarton('salonpas-lidocaine-plus-cream', 'Salonpas', 'salonpas-lidocaine-plus-cream.jpg');
assertExactCarton('salonpas-arthritis-pain-patch', 'Salonpas', 'salonpas-arthritis-pain-patch.jpg');
assertExactCarton('salonpas-pain-relief-patch', 'Salonpas', 'salonpas-pain-relief-patch.jpg');
assertExactCarton(
  'salonpas-pain-relief-patch-large',
  'Salonpas',
  'salonpas-pain-relief-patch-large.jpg',
);
assertExactCarton('salonpas-gel-patch-hot', 'Salonpas', 'salonpas-gel-patch-hot.jpg');
assertExactCarton('salonpas-hot-capsicum-patch', 'Salonpas', 'salonpas-hot-capsicum-patch.jpg');
assertExactCarton(
  'tiger-balm-hydrogel-patch-large',
  'Tiger Balm',
  'tiger-balm-hydrogel-patch-large.jpg',
);
assertExactCarton('tiger-balm-arthritis-rub', 'Tiger Balm', 'tiger-balm-arthritis-rub.jpg');
assertExactCarton(
  'biofreeze-ultraflex-lidocaine-4-patch',
  'Biofreeze',
  'biofreeze-ultraflex-lidocaine-4-patch.jpg',
);
assertExactCarton(
  'biofreeze-ultraflex-plus-lidocaine-menthol-patch',
  'Biofreeze',
  'biofreeze-ultraflex-plus-lidocaine-menthol-patch.jpg',
);
assertExactCarton('capzasin-quick-relief-gel', 'Capzasin', 'capzasin-quick-relief-gel.jpg');
assertExactCarton('biofreeze-pain-relief-gel-4', 'Biofreeze', 'biofreeze-pain-relief-gel-4.jpg');
assertExactCarton(
  'biofreeze-pain-relief-roll-on-4',
  'Biofreeze',
  'biofreeze-pain-relief-roll-on-4.jpg',
);
assertExactCarton('biofreeze-overnight-gel-4', 'Biofreeze', 'biofreeze-overnight-gel-4.jpg');
assertExactCarton(
  'biofreeze-overnight-roll-on-4',
  'Biofreeze',
  'biofreeze-overnight-roll-on-4.jpg',
);
assertExactCarton('biofreeze-pain-relief-cream', 'Biofreeze', 'biofreeze-pain-relief-cream.jpg');
assertExactCarton('biofreeze-dry-stick', 'Biofreeze', 'biofreeze-dry-stick.jpg');
assertExactCarton(
  'biofreeze-triple-target-roll-on',
  'Biofreeze',
  'biofreeze-triple-target-roll-on.jpg',
);
assertExactCarton('biofreeze-triple-target-gel', 'Biofreeze', 'biofreeze-triple-target-gel.jpg');
assertExactCarton(
  'biofreeze-overnight-relief-patches',
  'Biofreeze',
  'biofreeze-overnight-relief-patches.jpg',
);
assertExactCarton(
  'bengay-ultra-strength-nongreasy',
  'Bengay',
  'bengay-ultra-strength-nongreasy.jpg',
);
assertExactCarton('bengay-vanishing-scent-gel', 'Bengay', 'bengay-vanishing-scent-gel.jpg');
assertExactCarton(
  'bengay-lidocaine-tropical-jasmine',
  'Bengay',
  'bengay-lidocaine-tropical-jasmine.jpg',
);
assertExactCarton('absorbine-jr-pro-cream', 'Absorbine Jr.', 'absorbine-jr-pro-cream.jpg');
assertExactCarton('absorbine-jr-pro-no-mess', 'Absorbine Jr.', 'absorbine-jr-pro-no-mess.jpg');
assertExactCarton('absorbine-jr-neck-patch', 'Absorbine Jr.', 'absorbine-jr-neck-patch.jpg');
assertExactCarton('absorbine-jr-back-patch', 'Absorbine Jr.', 'absorbine-jr-back-patch.jpg');
assertExactCarton('absorbine-jr-knee-patch', 'Absorbine Jr.', 'absorbine-jr-knee-patch.jpg');
assertExactCarton(
  'medinatura-t-relief-xs-oral-drops',
  'MediNatura',
  'medinatura-t-relief-xs-oral-drops.jpg',
);
assertExactCarton('medinatura-t-relief-xs-gel', 'MediNatura', 'medinatura-t-relief-xs-gel.jpg');
assertExactCarton('medinatura-t-relief-pain-gel', 'MediNatura', 'medinatura-t-relief-pain-gel.jpg');
assertExactCarton(
  'medinatura-t-relief-xs-tablets',
  'MediNatura',
  'medinatura-t-relief-xs-tablets.jpg',
);
assertExactCarton(
  'medinatura-t-relief-pain-tablets',
  'MediNatura',
  'medinatura-t-relief-pain-tablets.jpg',
);
assertExactCarton(
  'medinatura-t-relief-arthritis-xs-tablets',
  'MediNatura',
  'medinatura-t-relief-arthritis-xs-tablets.jpg',
);
assertExactCarton('medinatura-bhi-arthritis', 'MediNatura', 'medinatura-bhi-arthritis.jpg');
assertExactCarton('medinatura-bhi-back', 'MediNatura', 'medinatura-bhi-back.jpg');
assertExactCarton('medinatura-bhi-migraine', 'MediNatura', 'medinatura-bhi-migraine.jpg');
assertExactCarton('medinatura-bhi-spasm-cramp', 'MediNatura', 'medinatura-bhi-spasm-cramp.jpg');
assertExactCarton(
  'medinatura-t-relief-pain-cream',
  'MediNatura',
  'medinatura-t-relief-pain-cream.jpg',
);
assertExactCarton('medinatura-t-relief-xs-cream', 'MediNatura', 'medinatura-t-relief-xs-cream.jpg');
assertExactCarton(
  'medinatura-t-relief-arthritis-xs-cream',
  'MediNatura',
  'medinatura-t-relief-arthritis-xs-cream.jpg',
);
assertExactCarton(
  'medinatura-t-relief-lidocaine-4-cream',
  'MediNatura',
  'medinatura-t-relief-lidocaine-4-cream.jpg',
);
assertExactCarton('medinatura-traumeel-ointment', 'MediNatura', 'medinatura-traumeel-ointment.jpg');
assertExactCarton(
  'bt-triflora-arthritis-gel',
  'Boericke & Tafel',
  'bt-triflora-arthritis-gel.jpg',
);
assertExactCarton('natures-way-sports-gel', "Nature's Way", 'natures-way-sports-gel.jpg');
// Leftover Boiron single-remedy P&F pellet factory is cleared on this aisle.
assertExactCarton(
  'tylenol-precise-pain-relieving-cream',
  'Tylenol',
  'tylenol-precise-pain-relieving-cream.jpg',
);
assertExactCarton(
  'tylenol-precise-cooling-cream',
  'Tylenol',
  'tylenol-precise-cooling-cream.jpg',
);
assertExactCarton(
  'tylenol-precise-warming-cream',
  'Tylenol',
  'tylenol-precise-warming-cream.jpg',
);
assertExactCarton(
  'tylenol-precise-nighttime-cream',
  'Tylenol',
  'tylenol-precise-nighttime-cream.jpg',
);
assertExactCarton(
  'tylenol-precise-lidocaine-4-patch',
  'Tylenol',
  'tylenol-precise-lidocaine-4-patch.jpg',
);
assertExactCarton(
  'advil-targeted-relief-cream',
  'Advil',
  'advil-targeted-relief-cream.jpg',
);
assertExactCarton('advil-migraine-liqui-gels', 'Advil', 'advil-migraine-liqui-gels.jpg');
assertExactCarton(
  'advil-dual-action-back-pain',
  'Advil',
  'advil-dual-action-back-pain.jpg',
);
assertExactCarton('motrin-ib-liquid-gels', 'Motrin', 'motrin-ib-liquid-gels.jpg');
assertExactCarton(
  'motrin-ib-migraine-liquid-gels',
  'Motrin',
  'motrin-ib-migraine-liquid-gels.jpg',
);
assertExactCarton('motrin-dual-action', 'Motrin', 'motrin-dual-action.jpg');
assertExactCarton(
  'tylenol-es-dissolve-packs',
  'Tylenol',
  'tylenol-es-dissolve-packs.jpg',
);
assertExactCarton(
  'tylenol-children-dissolve-packs',
  'Tylenol',
  'tylenol-children-dissolve-packs.jpg',
);
assertExactCarton(
  'motrin-infants-liquid-dyefree',
  'Motrin',
  'motrin-infants-liquid-dyefree.jpg',
);
assertExactCarton(
  'medinatura-traumeel-tablets',
  'MediNatura',
  'medinatura-traumeel-tablets.jpg',
);
assertExactCarton(
  'excedrin-tension-headache',
  'Excedrin',
  'excedrin-tension-headache.jpg',
);
assertExactCarton(
  'excedrin-migraine-es-blue',
  'Excedrin',
  'excedrin-migraine-es-blue.jpg',
);
assertExactCarton(
  'excedrin-rapid-relief-apap',
  'Excedrin',
  'excedrin-rapid-relief-apap.jpg',
);
assertExactCarton('tylenol-es-liquid', 'Tylenol', 'tylenol-es-liquid.jpg');
assertExactCarton('infants-advil-drops', 'Advil', 'infants-advil-drops.jpg');
assertExactCarton('excedrin-es-tio2', 'Excedrin', 'excedrin-es-tio2.jpg');
assertExactCarton(
  'goodys-max-triple-flavored',
  "Goody's",
  'goodys-max-triple-flavored.jpg',
);
assertExactCarton('goodys-extra-strength', "Goody's", 'goodys-extra-strength.jpg');
assertExactCarton('goodys-back-body', "Goody's", 'goodys-back-body.jpg');
assertExactCarton(
  'goodys-plus-alert-hangover',
  "Goody's",
  'goodys-plus-alert-hangover.jpg',
);
assertExactCarton(
  'ecotrin-rs-325-enteric',
  'Ecotrin',
  'ecotrin-rs-325-enteric.jpg',
);
assertExactCarton('ecotrin-81-enteric-dye', 'Ecotrin', 'ecotrin-81-enteric-dye.jpg');
assertExactCarton('anacin-aspirin-caffeine', 'Anacin', 'anacin-aspirin-caffeine.jpg');
assertExactCarton('st-joseph-81-enteric', 'St. Joseph', 'st-joseph-81-enteric.jpg');
assertExactCarton('st-joseph-81-chewable', 'St. Joseph', 'st-joseph-81-chewable.jpg');
assertExactCarton('bufferin-rs-325', 'Bufferin', 'bufferin-rs-325.jpg');
assertExactCarton('bc-original-arthritis', 'BC', 'bc-original-arthritis.jpg');
assertExactCarton('bc-cherry', 'BC', 'bc-cherry.jpg');
assertExactCarton('bc-max', 'BC', 'bc-max.jpg');
assertExactCarton('fon-headache', 'Forces of Nature', 'fon-headache.jpg');
assertExactCarton('fon-nerve', 'Forces of Nature', 'fon-nerve.jpg');
assertExactCarton('fon-muscle', 'Forces of Nature', 'fon-muscle.jpg');
assertExactCarton('fon-arniblend', 'Forces of Nature', 'fon-arniblend.jpg');
assertExactCarton('fon-migraine', 'Forces of Nature', 'fon-migraine.jpg');
assertExactCarton(
  'medinatura-bhi-traumex',
  'MediNatura',
  'medinatura-bhi-traumex.jpg',
);
assertExactCarton('natures-way-feverfew', "Nature's Way", 'natures-way-feverfew.jpg');
assertExactCarton(
  'natures-way-willow-bark',
  "Nature's Way",
  'natures-way-willow-bark.jpg',
);
assertExactCarton(
  'natures-way-joint-movement-glucosamine',
  "Nature's Way",
  'natures-way-joint-movement-glucosamine.jpg',
);
assertExactCarton(
  'natures-way-turmeric-max-potency',
  "Nature's Way",
  'natures-way-turmeric-max-potency.jpg',
);
assertExactCarton(
  'natures-way-tart-cherry-ultra-gummies',
  "Nature's Way",
  'natures-way-tart-cherry-ultra-gummies.jpg',
);
assertExactCarton(
  'natures-way-petadolex-pro-active',
  "Nature's Way",
  'natures-way-petadolex-pro-active.jpg',
);
assertExactCarton(
  'natures-way-devils-claw-secondary-root',
  "Nature's Way",
  'natures-way-devils-claw-secondary-root.jpg',
);
assertExactCarton(
  'biofreeze-colorless-gel-4',
  'Biofreeze',
  'biofreeze-colorless-gel-4.jpg',
);
assertExactCarton(
  'naturewise-curcumin-turmeric-2250',
  'NatureWise',
  'naturewise-curcumin-turmeric-2250.jpg',
);
assertExactCarton(
  'oregons-wild-harvest-turmeric',
  "Oregon's Wild Harvest",
  'oregons-wild-harvest-turmeric.jpg',
);
assertExactCarton(
  'life-flo-pure-magnesium-oil',
  'Life-flo',
  'life-flo-pure-magnesium-oil.jpg',
);
assertExactCarton(
  'absorbine-jr-plus-es-liquid',
  'Absorbine Jr.',
  'absorbine-jr-plus-es-liquid.jpg',
);
assertExactCarton(
  'mineral-ice-extreme-gel',
  'Mineral Ice',
  'mineral-ice-extreme-gel.jpg',
);
assertExactCarton(
  'mineral-ice-extreme-menthol-spray',
  'Mineral Ice',
  'mineral-ice-extreme-menthol-spray.jpg',
);
assertExactCarton(
  'mineral-ice-extreme-dry-stick',
  'Mineral Ice',
  'mineral-ice-extreme-dry-stick.jpg',
);
assertExactCarton(
  'codeage-liposomal-turmeric',
  'Codeage',
  'codeage-liposomal-turmeric.jpg',
);
assertExactCarton(
  'asutra-melt-pain-away',
  'Asutra',
  'asutra-melt-pain-away.jpg',
);
assertExactCarton(
  'life-flo-magnesium-lotion-vanilla',
  'Life-flo',
  'life-flo-magnesium-lotion-vanilla.jpg',
);
assertExactCarton(
  'life-flo-magnesium-lotion-unscented',
  'Life-flo',
  'life-flo-magnesium-lotion-unscented.jpg',
);
assertExactCarton(
  'doctors-best-high-absorption-curcumin-1000',
  "Doctor's Best",
  'doctors-best-high-absorption-curcumin-1000.jpg',
);
assertExactCarton(
  'sports-research-turmeric-curcumin',
  'Sports Research',
  'sports-research-turmeric-curcumin.jpg',
);
assertExactCarton(
  'australian-dream-arthritis-cream',
  'Australian Dream',
  'australian-dream-arthritis-cream.jpg',
);
assertExactCarton(
  'mineral-ice-original-gel-2',
  'Mineral Ice',
  'mineral-ice-original-gel-2.jpg',
);
assertExactCarton(
  'nutricost-turmeric-curcumin-2300',
  'Nutricost',
  'nutricost-turmeric-curcumin-2300.jpg',
);

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
    name.includes('sorbitan')
    || source.includes('sorbitan, plain')
    || source.includes('sorbitan esters')
  ) {
    return 'Sorbitan (plain / sorbitan esters) is a locked Caution emulsifier — same neighborhood as polysorbate, not Avoid. It is not the sugar-alcohol Limited row.';
  }

  if (
    name.includes('potassium hydroxide')
    || source.includes('potassium hydroxide — pH adjuster')
  ) {
    return 'Potassium hydroxide is a locked Cleared pH adjuster (trace). Not a grade driver. Same job as sodium hydroxide as pH adjuster.';
  }

  if (
    name.includes('potassium chloride')
    || source.includes('potassium chloride — salt')
  ) {
    return 'Potassium chloride is a locked Cleared salt / electrolyte. Not a grade driver.';
  }

  if (name.includes('triacetin') || source.includes('triacetin')) {
    return 'Triacetin is a locked Cleared tablet/caplet coating plasticizer. Not a grade driver.';
  }

  if (
    ingredient.riskLevel === 'high'
    && (name.includes('caramel') || source.includes('caramel color'))
  ) {
    return 'Label says caramel color and does not name Class I/II vs III/IV. Undisclosed class is treated as Class III/IV — High / Avoid.';
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
