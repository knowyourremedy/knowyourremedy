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
  BATCH67_KYR6_MEMBERS_MARK,
  BATCH68_KYR6_FOUNDER_PANELS,
  BATCH69_KYR6_STORE_PANELS,
  BATCH70_KYR6_AMAZON_3P_MICRO_INGREDIENTS,
  BATCH71_KYR6_AMAZON_3P_NOW,
  BATCH72_KYR6_NOW_REFUSE_BACKFILL,
  BATCH73_KYR6_NOW_EXACT_S5_BACKFILL,
  BATCH74_KYR6_NOW_TOKEN_STAMP_BACKFILL,
  BATCH75_KYR6_SPIRULINA_CAUTION,
  BATCH76_KYR6_AMAZON_3P_NUTRICOST,
  BATCH77_KYR6_NUTRICOST_TOKEN_BACKFILL,
  BATCH78_KYR6_NUTRICOST_TOKEN_BACKFILL_2,
  BATCH79_KYR6_NUTRICOST_NO_OI,
  BATCH80_KYR6_NUTRICOST_79_REFUSE,
  BATCH81_KYR6_NUTRICOST_UBIQUINOL_240,
  BATCH82_KYR6_AMAZON_3P_NATUREWISE,
  BATCH83_KYR6_NATUREWISE_TOKEN_BACKFILL,
  BATCH84_KYR6_NATUREWISE_FRUIT_FOAM,
  BATCH85_KYR6_NATUREWISE_NO_OI,
  BATCH86_KYR6_NATUREWISE_LAST_REFUSE,
  BATCH87_KYR6_AMAZON_3P_WELMATE,
  BATCH88_KYR6_WELMATE_TOKEN_BACKFILL,
  BATCH89_KYR6_WELMATE_CUCUMBER_SPRAY,
  BATCH90_KYR6_WELMATE_NO_OI,
  BATCH91_KYR6_WELMATE_POLOXAMER,
  BATCH92_KYR6_MISSING_OI_RESCAN,
  BATCH93_KYR6_AMAZON_3P_APLUS_HEALTH,
} from '@/lib/rating-drafts';
import { VERDICT_LABELS, type Verdict } from '@/lib/clean-picks/verdictLabels';
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
  ...BATCH67_KYR6_MEMBERS_MARK,
  ...BATCH68_KYR6_FOUNDER_PANELS,
  ...BATCH69_KYR6_STORE_PANELS,
  ...BATCH70_KYR6_AMAZON_3P_MICRO_INGREDIENTS,
  ...BATCH71_KYR6_AMAZON_3P_NOW,
  ...BATCH72_KYR6_NOW_REFUSE_BACKFILL,
  ...BATCH73_KYR6_NOW_EXACT_S5_BACKFILL,
  ...BATCH74_KYR6_NOW_TOKEN_STAMP_BACKFILL,
  ...BATCH75_KYR6_SPIRULINA_CAUTION,
  ...BATCH76_KYR6_AMAZON_3P_NUTRICOST,
  ...BATCH77_KYR6_NUTRICOST_TOKEN_BACKFILL,
  ...BATCH78_KYR6_NUTRICOST_TOKEN_BACKFILL_2,
  ...BATCH79_KYR6_NUTRICOST_NO_OI,
  ...BATCH80_KYR6_NUTRICOST_79_REFUSE,
  ...BATCH81_KYR6_NUTRICOST_UBIQUINOL_240,
  ...BATCH82_KYR6_AMAZON_3P_NATUREWISE,
  ...BATCH83_KYR6_NATUREWISE_TOKEN_BACKFILL,
  ...BATCH84_KYR6_NATUREWISE_FRUIT_FOAM,
  ...BATCH85_KYR6_NATUREWISE_NO_OI,
  ...BATCH86_KYR6_NATUREWISE_LAST_REFUSE,
  ...BATCH87_KYR6_AMAZON_3P_WELMATE,
  ...BATCH88_KYR6_WELMATE_TOKEN_BACKFILL,
  ...BATCH89_KYR6_WELMATE_CUCUMBER_SPRAY,
  ...BATCH90_KYR6_WELMATE_NO_OI,
  ...BATCH91_KYR6_WELMATE_POLOXAMER,
  ...BATCH92_KYR6_MISSING_OI_RESCAN,
  ...BATCH93_KYR6_AMAZON_3P_APLUS_HEALTH,
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
    'This Assorted Fruit chew is Not clean because of synthetic dye lakes and talc — both High-risk extras. The dyes are the family linked to hyperactivity warnings in the EU; flavors are a smaller listing. Labeled for ages 12 and up. Skip this bottle for everyday use and pick a cleaner chew if you want one without dyes or talc.',
  'absorbine-jr-pro-cream':
    'This cream is Not clean because of methylparaben. That one extra is why the whole product is Not clean. Other listings on this formula are not the grade driver. Distinct from PRO No-Mess, which has no paraben on that label.',
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
  // Icy Hot liquid / Performance / Revive: brand site has no matching carton
  // (roll-on ≠ liquid; Performance / Revive packs not on icyhot.com).
  // Per-id so other Icy Hot SKUs stay letters.
  'icy-hot-lidocaine-no-mess-liquid': brandMark('icy-hot-mark.png'),
  'icy-hot-performance-cream': brandMark('icy-hot-mark.png'),
  'icy-hot-performance-no-mess-cream': brandMark('icy-hot-mark.png'),
  'icy-hot-revive-recovery-roll-on': brandMark('icy-hot-mark.png'),
  // Tiger Balm Neck & Shoulder leftover is the non-vanishing row, not the
  // already-overlaid vanishing-scent pack. Per-id only.
  'tiger-balm-neck-shoulder-rub': brandMark('tiger-balm-mark.png'),
  // Batch 2 attempted leftovers — no matching carton. Per-id only.
  'tiger-balm-hydrogel-patch': brandMark('tiger-balm-mark.png'),
  'icy-hot-original-menthol-patch': brandMark('icy-hot-mark.png'),
  'icy-hot-pro-microbeads-cream': brandMark('icy-hot-mark.png'),
  'aspercreme-lidocaine-foot-2in1': brandMark('aspercreme-mark.png'),
  'salonpas-arthritis-pain-patch-large': brandMark('salonpas-mark.png'),
  // Batch 2 leftover — lifestyle 4-pack is not the plus knee carton.
  'absorbine-jr-plus-knee-patch': brandMark('absorbine-jr-mark.png'),
  'qunol-extra-strength-turmeric-1500-oleoresin': brandMark('qunol-mark.png'),
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
  // Batch 2 leftovers — Cool Patch / wider hydrogel have no distinct
  // official 3D carton (tigerbalm.com/us Cool Patch absent; wider hydrogel
  // is not the regular hydrogel carton). Per-id only.
  'tiger-balm-cool-patch': brandMark('tiger-balm-mark.png'),
  'tiger-balm-pain-relieving-patch-wider-hydrogel': brandMark(
    'tiger-balm-mark.png',
  ),
  // Batch 2 leftovers — biofreeze.com current catalog has no matching
  // 3.5% gel / green Professional 5% / 10% spray / Professional 13%.
  // Per-id only so already-overlaid Biofreeze cartons stay exact.
  'biofreeze-gel-3-5-paraben': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-gel-5': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-roll-on-5': brandMark('biofreeze-mark.png'),
  'biofreeze-pain-relief-spray-10': brandMark('biofreeze-mark.png'),
  'biofreeze-professional-spray-13': brandMark('biofreeze-mark.png'),
  // Batch leftovers — DailyMed faces are 2D dielines / minis, not 3D
  // packshots. Official GoodSense wordmark from goodsense.com (Perrigo).
  // Per-id only so other-aisle GoodSense rows stay letters.
  'goodsense-naproxen-220': brandMark('goodsense-mark.png'),
  'goodsense-dual-action': brandMark('goodsense-mark.png'),
  'goodsense-childrens-ibuprofen-chew': brandMark('goodsense-mark.png'),
  'goodsense-ibuprofen-liquid-gels': brandMark('goodsense-mark.png'),
  // Batch 2 leftover — DailyMed is a 2D dieline, not a 3D packshot.
  'goodsense-es-pain-relief-l484': brandMark('goodsense-mark.png'),
  // Cold & Flu leftover — draft name says Honey; cited boironusa URL is
  // Chestal Cold & Cough Original. Do not glue either syrup carton.
  'boiron-chestal-cold-cough-honey': brandMark('boiron-mark.png'),
  // Attempted Cold & Flu leftovers — official delsym.com kids combo URLs
  // redirect to the collection; current live packshots are adult 12-hour /
  // adult chest-DM / adult night. DailyMed faces are 2D dielines. Official
  // Delsym RGB mark from delsym.com. Per-id only.
  'delsym-childrens-cough-chest-dm': brandMark('delsym-mark.png'),
  'delsym-childrens-cough-cold-night': brandMark('delsym-mark.png'),
  // Attempted Cold & Flu leftover — draft name is grape OR orange (too
  // broad). Do not glue the official grape 5 oz carton. Official Delsym
  // RGB mark from delsym.com. Per-id only.
  'delsym-12hr-grape-or-orange': brandMark('delsym-mark.png'),
  // Attempted Cold & Flu leftover — draft UPC 323900031012 is
  // chlorpheniramine + DXM berry day/night. Live vicks.com combos are
  // fever (323900040045) or Free Of (32390003495). Do not glue. Official
  // Vicks shield from vicks.com. Per-id only.
  'dayquil-nyquil-kids-berry-cold-cough': brandMark('vicks-mark.png'),
  // Attempted Cold & Flu leftovers — live genexa.com PDPs are day+night
  // combo packs only. Do not glue the combo carton onto a night-only row.
  // Official Genexa mark already on disk. Per-id only.
  'genexa-kids-nighttime-cough': brandMark('genexa-mark.png'),
  'genexa-kids-nighttime-multi-cold-flu': brandMark('genexa-mark.png'),
  'genexa-nighttime-severe-cold-flu': brandMark('genexa-mark.png'),
  // Attempted Cold & Flu leftover — Save Mart / DailyMed faces are 2D
  // dielines. Official TopCare mark already on disk. Per-id only.
  'topcare-mucus-dm-er': brandMark('topcare-mark.png'),
  // Attempted Cold & Flu leftover — draft is Formula 44 DM Painful Cough
  // & Sore Throat (APAP + DXM). Live vicks.com Formula 44 pages are
  // DXM-only cough or DXM + guaifenesin cough & congestion. Do not glue.
  // Official Vicks shield already on disk. Per-id only.
  'vicks-formula-44-dm': brandMark('vicks-mark.png'),
  // Attempted Cold & Flu leftovers — walgreens.com PDPs not retrieved
  // from this environment. DailyMed faces are 2D dielines. Official
  // Walgreens mark already on disk. Per-id only.
  'walgreens-childrens-chest-rub': brandMark('walgreens-mark.png'),
  'walgreens-childrens-cold-cough-runny': brandMark('walgreens-mark.png'),
  'walgreens-childrens-cough-chest': brandMark('walgreens-mark.png'),
  'walgreens-childrens-night-cough': brandMark('walgreens-mark.png'),
  'walgreens-kids-honey-night-cold': brandMark('walgreens-mark.png'),
  // Pain & Fever brand-text cleanup — exact US carton hunt attempted;
  // leftover names are flavor-generic / too-broad / no matching 3D pack.
  // Parent brand marks only (per-id). DailyMed 2D dielines were refused.
  // Official files: HealthA2Z (a2z-life.com), Garden of Life header SVG,
  // Sprouts farmers-market SVG, Organic India USA logo, TIME-Cap Labs
  // wordmark (timecaplabs.com). Other parent marks use official US pack
  // wordmark colors after carton hunt failed.
  'aplus-health-dual-action': brandMark('aplus-health-mark.png'),
  'aleve-caplets-tablets': brandMark('aleve-mark.png'),
  'amazon-basic-care-aspirin-81-chew-l467': brandMark(
    'amazon-basic-care-mark.png',
  ),
  'amazon-basic-care-kids-apap-dyefree': brandMark(
    'amazon-basic-care-mark.png',
  ),
  'amazon-basic-care-ibuprofen-liqui-gels': brandMark(
    'amazon-basic-care-mark.png',
  ),
  'amazon-basic-care-infants-ibuprofen': brandMark(
    'amazon-basic-care-mark.png',
  ),
  'amazon-basic-care-apap-rs-aurohealth': brandMark(
    'amazon-basic-care-mark.png',
  ),
  'amazon-basics-ibuprofen-iron-oxide-yellow': brandMark(
    'amazon-basics-mark.png',
  ),
  'amazon-basics-lidocaine-4-patch': brandMark('amazon-basics-mark.png'),
  'amazon-elements-turmeric-complex': brandMark('amazon-elements-mark.png'),
  'amazon-elements-turmeric-root': brandMark('amazon-elements-mark.png'),
  'bayer-aspirin-regimen-enteric': brandMark('bayer-mark.png'),
  'bayer-back-body-aspirina-cafeina': brandMark('bayer-mark.png'),
  'bayer-es-500-aspirina': brandMark('bayer-mark.png'),
  'dg-health-ibuprofen-liquid-gels': brandMark('dg-health-mark.png'),
  'dg-health-infants-ibuprofen': brandMark('dg-health-mark.png'),
  'equate-children-apap-dyed': brandMark('equate-mark.png'),
  'equate-children-ibu-chew-dyed': brandMark('equate-mark.png'),
  'equate-children-ibu-dyed': brandMark('equate-mark.png'),
  'equate-infants-apap-dyefree': brandMark('equate-mark.png'),
  'family-wellness-childrens-apap': brandMark('family-wellness-mark.png'),
  'gol-mykind-turmeric-inflammatory-gummies': brandMark(
    'garden-of-life-mark.png',
  ),
  'healtha2z-childrens-apap-chew': brandMark('healtha2z-mark.png'),
  'healtha2z-ibuprofen-200-335': brandMark('healtha2z-mark.png'),
  'healtha2z-naproxen-220-300': brandMark('healtha2z-mark.png'),
  'now-turmeric-curcumin-bioperine': brandMark('now-mark.png'),
  'organic-india-turmeric-formula': brandMark('organic-india-mark.png'),
  'signature-care-children-apap-dyed': brandMark('signature-care-mark.png'),
  'signature-care-children-ibu-chew-dyed': brandMark(
    'signature-care-mark.png',
  ),
  'signature-care-children-ibu-dyed': brandMark('signature-care-mark.png'),
  'signature-care-infants-apap-dyefree': brandMark(
    'signature-care-mark.png',
  ),
  'sprouts-inflacalm-ache-relief': brandMark('sprouts-mark.png'),
  'sumifun-lidocaine-4-patch': brandMark('sumifun-mark.png'),
  'teemofe-lidocaine-4-patch': brandMark('teemofe-mark.png'),
  'timecap-ibuprofen-200': brandMark('timecap-mark.png'),
  'timecap-naproxen-220': brandMark('timecap-mark.png'),
  'upup-children-apap-dyed': brandMark('upup-mark.png'),
  'upup-children-apap-dyefree': brandMark('upup-mark.png'),
  'upup-children-ibu-dyefree-liquid': brandMark('upup-mark.png'),
  'upup-children-ibu-dyed': brandMark('upup-mark.png'),
  // Exact 73581-912 carton hunt failed: DailyMed face is a 2D dieline
  // for NDC 73581-111 (wrong SKU). wellspringmeds.com 15/30/40 live
  // PDPs print the 73581-911 ethylhexyl OI, already wired to the
  // other WELMATE row. Parent mark from official pack wordmark.
  'welmate-lidocaine-4-patch-parabens': brandMark('welmate-mark.png'),
  // Cold & Flu leftover night run — attempted, no matching official 3D
  // pack. Acerola 4:1 6 oz (SKU 0740) has no live nowfoods.com PDP /
  // CDN bottle. Oregano 450 mg 100 veg caps (SKU 4724) page exists but
  // no retrievable 3D pack file. NyQuil leftover name is flavor-generic;
  // UPC 323900045149 is Cherry 4 oz and vicks.com hero is Original.
  // Official NOW wordmark / Vicks shield already on disk. Per-id only.
  'now-acerola-4-1-extract-powder-6': brandMark('now-mark.png'),
  'now-oregano-450-mg-100': brandMark('now-mark.png'),
  'nyquil-cold-flu-liquid': brandMark('vicks-mark.png'),
  // Attempted Allergies leftovers — night run 2026-09-21 5:30 PT batch 1.
  // Boiron single-remedy tubes: boironusa.com 429 from this environment
  // after the official-site carton hunt. DailyMed class faces are 2D.
  // Official Boiron mark already on disk. Per-id only so the shared
  // formulaId `boiron-single-remedy-pellets` does not inherit.
  'boiron-ambrosiaartemisiaefolia-pellets': brandMark('boiron-mark.png'),
  'boiron-arundomauritanica-pellets': brandMark('boiron-mark.png'),
  'boiron-euphrasia-officinalis-pellets': brandMark('boiron-mark.png'),
  'boiron-galphimia-glauca-pellets': brandMark('boiron-mark.png'),
  'boiron-histaminum-hydrochloricum-pellets': brandMark('boiron-mark.png'),
  'boiron-luffaoperculata-pellets': brandMark('boiron-mark.png'),
  'boiron-sabadilla-pellets': brandMark('boiron-mark.png'),
  'boiron-solidagovirgaurea-pellets': brandMark('boiron-mark.png'),
  'boiron-wyethiahelenioides-pellets': brandMark('boiron-mark.png'),
  // Attempted Allergies leftovers — night run 2026-09-21 5:30 PT batch 2.
  // Family Wellness: familydollar.com / store PDPs not retrieved as 3D
  // cartons. Official Family Wellness mark already on disk. Per-id only.
  'family-wellness-loratadine-10': brandMark('family-wellness-mark.png'),
  'family-wellness-cetirizine-tablets': brandMark(
    'family-wellness-mark.png',
  ),
  // Attempted Allergies leftovers — night run 2026-09-22 12:30 PT batch 2.
  // Carton hunts failed (target.com / walgreens.com / albertsons blocked
  // or no matching 3D pack). Official marks already on disk, plus a new
  // Similasan wordmark from similasanusa.com. Per-id only.
  'signature-care-loratadine-mint-odt': brandMark(
    'signature-care-mark.png',
  ),
  'similasan-allergy-eye-multidose': brandMark('similasan-mark.png'),
  'similasan-allergy-eye-pf': brandMark('similasan-mark.png'),
  'topcare-all-day-allergy-cetirizine': brandMark('topcare-mark.png'),
  'topcare-allergy-congestion-loratadine-d': brandMark('topcare-mark.png'),
  'topcare-allergy-relief-loratadine': brandMark('topcare-mark.png'),
  'topcare-original-eye-drops': brandMark('topcare-mark.png'),
  'upup-loratadine-tablets-plain': brandMark('upup-mark.png'),
  'upup-kids-cetirizine-bubblegum': brandMark('upup-mark.png'),
  'upup-kids-cetirizine-grape': brandMark('upup-mark.png'),
  'upup-kids-loratadine-liquid': brandMark('upup-mark.png'),
  'upup-kids-dph-melts': brandMark('upup-mark.png'),
  'upup-pm-lubricant-ointment': brandMark('upup-mark.png'),
  'walgreens-allergy-relief-cetirizine': brandMark('walgreens-mark.png'),
  'walgreens-allergy-relief-loratadine': brandMark('walgreens-mark.png'),
  // Attempted Allergies leftover — night run 2026-09-22 3:00 PT.
  // NDC 0363-7274 (setid 6bb68dc4) DailyMed face is a 2D label flat,
  // not a 3D pack. walgreens.com has no live house-brand PDP for this
  // ointment. Do not glue Refresh / Systane. Official Walgreens mark
  // already on disk. Per-id only so formulaId
  // `store-pm-ointment-lanolin-alcohol` siblings stay on their own tiles.
  'walgreens-pm-lubricant-ointment': brandMark('walgreens-mark.png'),
  // Zyrtec leftovers span multiple count UPCs. Official zyrtec.com
  // faces are count-specific (40ct liquid gels / 30ct and 60ct tablets).
  // 30ct tablet face also carries a New Look badge. Do not glue one
  // count. Official 2025 mark from zyrtec.com. Per-id only so
  // formulaId `zyrtec-allergy-tablets-tio2` siblings do not inherit.
  'zyrtec-allergy-liquid-gels': brandMark('zyrtec-mark.png'),
  'zyrtec-allergy-tablets': brandMark('zyrtec-mark.png'),
  // Attempted Sleep leftovers — night run 2026-09-22 5:30 PT batch 1.
  // Tylenol PM / Advil PM leftovers span multiple count UPCs. Official
  // faces are count-specific. Do not glue one count. Marks already on
  // disk. Per-id only.
  'tylenol-pm-es': brandMark('tylenol-mark.png'),
  'advil-pm-liquigels': brandMark('advil-mark.png'),
  'advil-pm-caplets': brandMark('advil-mark.png'),
  // Equate Sleep leftovers — walmart.com / upcitemdb returned no live
  // 3D pack for these UPCs. Official Equate mark already on disk.
  // Per-id only.
  'equate-sleep-aid-softgels': brandMark('equate-mark.png'),
  'equate-sleep-aid-tablets-dyed': brandMark('equate-mark.png'),
  // Attempted Sleep leftovers — night run 2026-09-22 5:30 PT batch 2.
  'equate-childrens-melatonin-liquid': brandMark('equate-mark.png'),
  // Melatonin-SR leftover spans 30ct and 60ct UPCs. Official faces are
  // count-specific. Pure Encapsulations mark already on disk. Per-id only.
  'pure-encapsulations-melatonin-sr-3mg': brandMark(
    'pure-encapsulations-mark.png',
  ),
  // DG Health Sleep leftovers — upcitemdb returned no usable 3D pack.
  // Official DG Health mark already on disk. Per-id only.
  'dg-health-pain-relief-pm': brandMark('dg-health-mark.png'),
  'dg-health-sleep-aid-dph': brandMark('dg-health-mark.png'),
  // Attempted Sleep leftover — night run 2026-09-23 5:30 PT batch 1.
  // Sprouts Melatonin 3 mg 60ct (UPC 646670690303). shop.sprouts.com
  // served a flat label, not a 3D bottle. Do not glue the label.
  // Official Sprouts mark already on disk. Per-id only.
  'sprouts-melatonin-3mg-tablets': brandMark('sprouts-mark.png'),
  // Attempted Sleep leftovers — night run 2026-09-23 5:30 PT batch 2.
  // Aleve PM spans three count UPCs. Official faces are count-specific.
  // Do not glue one count. Aleve mark already on disk. Per-id only.
  'aleve-pm': brandMark('aleve-mark.png'),
  // Motrin PM spans two count UPCs. Official faces are count-specific.
  // Motrin mark already on disk. Per-id only.
  'motrin-pm': brandMark('motrin-mark.png'),
  // Attempted Sleep leftover — night run 2026-09-24 12:30 PT batch 1.
  // Dyed Berry liquid spans 6 fl oz (311917188188) and 12 fl oz
  // (311917047614). Official faces are count-specific. Do not glue
  // one size. Walgreens mark already on disk. Per-id only.
  'walgreens-sleep-aid-liquid-dyed': brandMark('walgreens-mark.png'),
  // Immune Support night run 2026-09-24 5:30 PT batch 1.
  // Kids Sambucus gummies: two count UPCs (033674123461 / 033674122853).
  // Faces are count-specific. Do not glue one count. Veg-oil twin has
  // no barcode — do not glue the kids bottles onto that oil split.
  // Official naturesway.com script wordmark. Per-id only.
  'natures-way-sambucus-kids-gummies-coconut': brandMark('natures-way-mark.png'),
  'natures-way-sambucus-kids-gummies-veg-oil': brandMark('natures-way-mark.png'),
  // Wellness Formula tablets span 021078000228 / 021078000211 / 021078019596.
  // Capsules span five count UPCs. Official faces are count-specific.
  // Do not glue one count. sourcenaturals.com wordmark. Per-id only.
  'source-naturals-wellness-formula-tabs': brandMark('source-naturals-mark.png'),
  'source-naturals-wellness-formula-caps': brandMark('source-naturals-mark.png'),
  // Complex C spans 30 / 60 / a third count (051494101322 / 051494101339 /
  // 051494101353). Official faces are count-specific. Do not glue one
  // count. megafood.com footer wordmark. Per-id only.
  'megafood-complex-c': brandMark('megafood-mark.png'),
  // Immune Support night run 2026-09-24 5:30 PT batch 2.
  // Count-specific megafood.com faces. Do not glue one count.
  // MegaFood mark already on disk. Per-id only.
  'megafood-ultra-c-400': brandMark('megafood-mark.png'),
  'megafood-vitamin-d3-1000': brandMark('megafood-mark.png'),
  'megafood-vitamin-d3-2000': brandMark('megafood-mark.png'),
  'megafood-c-defense-gummies': brandMark('megafood-mark.png'),
  'megafood-vitamin-d3-5000-k-k2': brandMark('megafood-mark.png'),
  'megafood-turmeric-whole-body-minis': brandMark('megafood-mark.png'),
};

// No standalone official 365 mark file on wholefoodsmarket.com (brand page
// is product photos only). Do not invent a logo. Do not use the first
// character "3". Same beige tile as the letter helper, brand name "365".
const PREVIEW_ID_BRAND_TEXT: Record<string, string> = {
  '365-probiotic-fiber-gummies-sunflower': '365',
  // Attempted Cold & Flu leftover — no 3D pack on wholefoodsmarket.com.
  // DailyMed is a 2D bottle wrap. Do not invent a logo. Do not stay on "3".
  '365-guaifenesin-er-600': '365',
  // Attempted Cold & Flu leftovers — amazon.com 3D packshots not retrieved
  // (Basic Care rows are also mid-rebrand to Amazon Basics). DailyMed hits
  // are 2D dielines / label flats / a day+night combo carton. No standalone
  // official Basic Care or Amazon Basics mark file. Do not stay letters.
  'amazon-basic-care-cherry-menthol-cough-drops': 'Basic Care',
  'amazon-basic-care-daytime-cold-flu-liquid': 'Basic Care',
  'amazon-basic-care-daytime-cold-flu-softgel': 'Basic Care',
  'amazon-basic-care-mucus-dm-er': 'Basic Care',
  'amazon-basic-care-mucus-dm-er-dye-free': 'Basic Care',
  'amazon-basic-care-mucus-er-600': 'Basic Care',
  'amazon-basic-care-mucus-er-max-blue1': 'Basic Care',
  'amazon-basic-care-mucus-er-max-dyefree': 'Basic Care',
  'amazon-basic-care-oxymetazoline-nasal': 'Basic Care',
  'amazon-basic-care-nighttime-cold-flu-liquid': 'Basic Care',
  'amazon-basic-care-nighttime-cold-flu-softgel': 'Basic Care',
  'amazon-basic-care-no-drip-nasal': 'Basic Care',
  'amazon-basic-care-sf-honey-lemon-cough-drops': 'Basic Care',
  'amazon-basic-care-sf-menthol-cough-drops': 'Basic Care',
  'amazon-basics-chest-rub': 'Amazon Basics',
  'amazon-basics-nighttime-severe-cold-flu-liquid': 'Amazon Basics',
  // Attempted Cold & Flu leftovers — no matching official 3D pack face.
  // robitussin.com 12-hour page is PDF-only; live children's long-acting
  // pack is Cough & Cold (chlorpheniramine), not the DXM-only leftover.
  // DailyMed faces are 2D dielines. Official header wordmark is white-on-
  // dark only — no standalone colored mark file. Do not stay letters.
  'robitussin-childrens-12hr': 'Robitussin',
  'robitussin-childrens-long-acting': 'Robitussin',
  // Attempted Cold & Flu leftovers — cvs.com PDPs 403 from this
  // environment. DailyMed faces are 2D dielines. No standalone official
  // CVS Health mark file. Do not stay letters.
  'cvs-adult-cough-chest-dm-dyefree': 'CVS Health',
  'cvs-childrens-cough-chest-dn': 'CVS Health',
  'cvs-childrens-cough-relief-dm': 'CVS Health',
  'cvs-childrens-multi-cold': 'CVS Health',
  'cvs-cough-chest-dm-liquid': 'CVS Health',
  'cvs-pharmacy-childrens-cold-allergy': 'CVS Health',
  // Attempted Cold & Flu leftovers — dollargeneral.com / walmart.com PDPs
  // not retrieved from this environment. DailyMed faces are 2D dielines.
  // No standalone official DG Health or Equate mark file (equate.com is
  // Kuwait petrochemical — refuse). Do not stay letters.
  'dg-health-cold-flu-day-softgels': 'DG Health',
  'dg-health-cold-flu-night-liquid': 'DG Health',
  'dg-health-guaifenesin-ir': 'DG Health',
  'dg-health-mucus-dm-er': 'DG Health',
  'dg-health-mucus-er': 'DG Health',
  'dg-health-mucus-er-max-dyefree': 'DG Health',
  'equate-childrens-cold-cough': 'Equate',
  'equate-childrens-cough-congestion-dn': 'Equate',
  'equate-childrens-multi-night': 'Equate',
  'equate-childrens-vaporizing-rub': 'Equate',
  // Attempted Cold & Flu leftovers — walmart.com / dollargeneral.com /
  // familydollar.com / costco.com / samsclub.com PDPs not retrieved from
  // this environment. DailyMed faces are 2D dielines. No standalone
  // official Equate / Family Wellness / Kirkland / Member's Mark mark
  // file (equate.com is Kuwait petrochemical — refuse). Do not stay letters.
  'equate-daytime-cold-flu': 'Equate',
  'equate-kids-dex-cough-gels': 'Equate',
  'equate-mucus-er-600': 'Equate',
  'family-wellness-guaifenesin-ir-400': 'Family Wellness',
  'family-wellness-guaifenesin-dm-ir': 'Family Wellness',
  'kirkland-mucus-dm-max-er': 'Kirkland',
  'members-mark-mucus-er-max-dyefree': "Member's Mark",
  'members-mark-mucus-dm-max-blue1': "Member's Mark",
  // Attempted Cold & Flu leftovers — hylands.com sells Baby Mucus + Cold
  // Night and Baby Tiny Cold Night only as combo packs. Do not glue the
  // combo carton. No standalone official Hyland's mark file. Do not stay
  // letters.
  'hylands-baby-mucus-cold-night': "Hyland's",
  'hylands-baby-tiny-cold-night': "Hyland's",
  // Attempted Cold & Flu leftovers — no matching official 3D pack face.
  // Member's Mark: samsclub.com blocked. Mucinex FreeFrom multi live PDP
  // is elderberry OR cherry (too broad). Signature Care Albertsons PDPs
  // not retrieved. Theraflu daytime powder is honey-lemon / honey-ginger /
  // berry-burst (too broad). Umcka ColdCare Alcohol-Free live PDP is
  // drops, not this liquid leftover. No standalone official mark files.
  // Do not stay letters.
  'members-mark-mucus-dm-max-yellow10': "Member's Mark",
  'mucinex-childrens-freefrom-multi': 'Mucinex',
  'signature-care-childrens-12hr-cough': 'Signature Care',
  'signature-care-childrens-multi-cold': 'Signature Care',
  'signature-care-daytime-severe': 'Signature Care',
  'theraflu-severe-cold-day-powder': 'Theraflu',
  'umcka-coldcare-alcohol-free': "Nature's Way",
  // Attempted Cold & Flu leftovers — live naturesway.com Cold&Flu
  // Chewables page is Orange OR Berry (too broad). Cold&Flu FastActives
  // live PDP is Berry SKU 15349 already wired to umcka-fastactives-berry.
  // Do not glue. No standalone official Nature's Way colored mark file.
  'umcka-cold-flu-chewables': "Nature's Way",
  'umcka-cold-flu-fastactives': "Nature's Way",
  // Attempted Cold & Flu leftovers — target.com / brand-site PDPs not
  // retrieved, or leftover is too-broad vs live SKUs. No standalone
  // official up&up / Wedderspoon / Zarbee's mark file. Do not stay letters.
  'upup-childrens-multi-cold': 'up&up',
  'upup-daytime-honey-cold-flu': 'up&up',
  'upup-mucus-relief-600-blue': 'up&up',
  'upup-mucus-relief-dm-yellow': 'up&up',
  'wedderspoon-manuka-honey-drops': 'Wedderspoon',
  'zarbees-childrens-cough-immune': "Zarbee's",
  // Attempted Allergies leftovers — no matching official 3D pack face.
  // 365: wholefoodsmarket.com is product photos / DailyMed 2D only.
  // Alaway: brand-site faces are marketing composites with badges.
  // Amazon Basic Care / Basics: amazon.com PDPs not retrieved; mid-rebrand.
  // Assured: Dollar Tree PDP not retrieved. No standalone official marks.
  '365-cetirizine-softgels-peg': '365',
  '365-diphenhydramine-softgels-peg': '365',
  'alaway-multidose-bak': 'Alaway',
  'amazon-basic-care-cetirizine-aurohealth': 'Basic Care',
  'amazon-basic-care-cetirizine-coated': 'Basic Care',
  'amazon-basic-care-dph-25-l479': 'Basic Care',
  'amazon-basic-care-fexofenadine-lakes': 'Basic Care',
  'amazon-basic-care-kids-cetirizine-liquid': 'Basic Care',
  'amazon-basic-care-kids-loratadine-chew': 'Basic Care',
  'amazon-basic-care-kids-loratadine-liquid': 'Basic Care',
  'amazon-basic-care-levocetirizine': 'Basic Care',
  'amazon-basic-care-loratadine-l612': 'Basic Care',
  'amazon-basic-care-loratadine-odt': 'Basic Care',
  'amazon-basics-fluticasone-nasal': 'Amazon Basics',
  'amazon-basics-mometasone-nasal': 'Amazon Basics',
  'assured-advanced-relief-eye': 'Assured',
  // Attempted Allergies leftovers — night run 2026-09-21 batch 1.
  // 365: wholefoodsmarket.com PDP not retrieved; DailyMed is 2D. Tile
  // text 365, never the letter 3.
  '365-loratadine-plain-ssg': '365',
  // Alaway PF: alaway.com / Bausch faces are the 10 mL BAK bottle, not
  // the single-use PF carton. Same as multidose leftover — no standalone
  // official Alaway mark file.
  'alaway-preservative-free': 'Alaway',
  // Amazon Basic Care Aurohealth loratadine: amazon.com 3D packshot not
  // retrieved (mid-rebrand). No standalone official Basic Care mark.
  'amazon-basic-care-loratadine-aurohealth': 'Basic Care',
  // Astepro: asteproallergy.com returned site-maintenance from this
  // environment. No standalone official Astepro mark file.
  'astepro-allergy': 'Astepro',
  // Adult Benadryl Allergy Liquid: no live benadryl.com PDP (kids cherry
  // is a different UPC). Children's chewables: no dedicated live pack
  // file. Children's Claritin grape liquid: claritin.com maintenance.
  // No standalone official Benadryl / Claritin mark files.
  'benadryl-allergy-liquid': 'Benadryl',
  'childrens-benadryl-chewables': 'Benadryl',
  'childrens-claritin-liquid': 'Claritin',
  // Attempted Allergies leftovers — night run 2026-09-21 batch 2.
  // Claritin: claritin.com still site-maintenance from this environment.
  // DailyMed 2D is not a carton. No standalone official Claritin mark.
  'childrens-claritin-chewable': 'Claritin',
  'claritin-allergy-liquid': 'Claritin',
  'claritin-allergy-tablets-plain': 'Claritin',
  'claritin-chewable': 'Claritin',
  'claritin-reditabs': 'Claritin',
  'claritin-d-12hr': 'Claritin',
  // CVS.com PDPs 403 from this environment. No standalone official
  // CVS Health mark file.
  'cvs-cetirizine-tablets': 'CVS Health',
  'cvs-kids-dph-chews': 'CVS Health',
  'cvs-kids-cetirizine-liquid': 'CVS Health',
  'cvs-kids-loratadine-liquid': 'CVS Health',
  'cvs-kids-dph-liquid': 'CVS Health',
  'cvs-kids-loratadine-chew': 'CVS Health',
  'cvs-loratadine-tablets-plain': 'CVS Health',
  'cvs-health-nighttime-dry-eye': 'CVS Health',
  // DG Health: no retrievable official 3D carton. No standalone mark.
  'dg-health-cetirizine-tablets': 'DG Health',
  // Attempted Allergies leftovers — night run 2026-09-21 5:30 PT batch 1.
  // Equate: walmart.com PDPs blocked from this environment. equate.com is
  // Kuwait petrochemical — refuse. No standalone official Equate mark
  // file. Do not stay letters.
  'equate-loratadine-d': 'Equate',
  'equate-cetirizine-tablets': 'Equate',
  'equate-fexofenadine-tablets': 'Equate',
  'equate-fluticasone-nasal': 'Equate',
  'equate-kids-fluticasone-nasal': 'Equate',
  // Attempted Allergies leftovers — night run 2026-09-21 5:30 PT batch 2.
  // Equate: walmart.com PDPs still blocked. equate.com is Kuwait
  // petrochemical — refuse. No standalone official Equate mark file.
  'equate-loratadine-tablets-plain': 'Equate',
  'equate-cetirizine-d': 'Equate',
  'equate-fexofenadine-d': 'Equate',
  'equate-kids-cetirizine-liquid': 'Equate',
  'equate-kids-loratadine-liquid': 'Equate',
  'equate-kids-dph-chews': 'Equate',
  'equate-loratadine-mint-odt': 'Equate',
  'equate-lubricant-eye-bkc': 'Equate',
  'equate-lubricant-eye-pf': 'Equate',
  'equate-nighttime-lubricant-ointment': 'Equate',
  // Attempted Allergies leftovers — night run 2026-09-22 12:30 PT batch 1.
  // Kirkland: costco.com product URLs 404 from this environment. No
  // standalone official Kirkland mark file. Do not stay letters.
  'kirkland-aller-tec-cetirizine': 'Kirkland',
  'kirkland-aller-tec-d-cetirizine-pse': 'Kirkland',
  'kirkland-allerclear-loratadine-plain': 'Kirkland',
  // Member's Mark: samsclub.com human-check wall. No standalone official
  // mark file. Do not stay letters.
  'members-mark-cetirizine-tablets': "Member's Mark",
  'members-mark-loratadine-tablets': "Member's Mark",
  // Nasacort: adult leftover spans 60 / 120 / twin UPCs. The live
  // nasacort.com 60ct face is a badge composite, not a clean carton.
  // Kids leftover barcode 041167580059 is the adult 120 spray, not the
  // Children's Nasacort NDC 41167-5900 carton. Nav wordmark is white on
  // transparent and would disappear on the tile. No colored mark file.
  'nasacort-allergy-24hr': 'Nasacort',
  'nasacort-allergy-24hr-kids': 'Nasacort',
  // Refresh: refresheyedrops.com returned a bot wall. No standalone
  // official Refresh mark file. Do not stay letters.
  'refresh-pm-ointment': 'Refresh',
  'refresh-tears-pf': 'Refresh',
  // Rexall: dollargeneral.com PDP for UPC 370030659432 served the
  // placeholder image, not a 3D carton. No standalone official mark.
  'rexall-cetirizine-tablets': 'Rexall',
  // Attempted Allergies leftover — night run 2026-09-22 12:30 PT batch 2.
  // Systane Ultra PF leftover lists both single-use vials and a PF bottle
  // twin. Do not glue one carton. No standalone official Systane mark file.
  'systane-ultra-pf': 'Systane',
  // Attempted Allergies leftover — night run 2026-09-22 3:00 PT.
  // zaditor.com redirects to systane.myalcon.com. Live hero is a 10 mL
  // carton+vial composite. Row UPC 300654011057 is the 5 mL / 0.17 fl oz
  // carton. Do not glue the 10 mL face. No standalone official Zaditor
  // mark file (Systane parent mark is not this product name).
  'zaditor': 'Zaditor',
  // Attempted Sleep leftovers — night run 2026-09-22 5:30 PT batch 1.
  // Unisom SleepTabs leftover spans 16 / 32 / larger count UPCs. Official
  // unisom.com hero is the 16ct face only. Do not glue one count. No
  // standalone Unisom mark file.
  'unisom-sleeptabs-doxylamine': 'Unisom',
  // ZzzQuil LiquiCaps leftover spans 12 / 24 / 48 count UPCs. Official
  // zzzquil.com hero is count-generic branding but live pack faces are
  // count-specific. Do not glue one count. No standalone ZzzQuil mark.
  'zzzquil-liquicaps': 'ZzzQuil',
  // FREE OF Artificial Dyes leftover UPC 323900033856 is not the live
  // zzzquil.com Alcohol Free / Free-Of hero (UPC 323900038561). Do not
  // glue the Alcohol Free bottle. No standalone ZzzQuil mark file.
  'zzzquil-free-of-artificial': 'ZzzQuil',
  // CVS Health Sleep liquid — cvs.com / upcitemdb returned no retrievable
  // 3D pack for UPC 050428438015. No standalone CVS Health mark file.
  'cvs-sleep-aid-liquid-dyed': 'CVS Health',
  // Attempted Sleep leftovers — night run 2026-09-22 5:30 PT batch 2.
  // Dye-free CVS Sleep liquid — upcitemdb title only, no image.
  'cvs-sleep-aid-liquid-dyefree': 'CVS Health',
  // OLLY Kids Sleep coconut-only oil listing — no barcode; draft name is
  // an oil-listing split, not a shoppable pack face. Do not glue the
  // canola SKU carton. No standalone OLLY mark file.
  'olly-kids-sleep-coconut-only': 'OLLY',
  // Assured Headache PM — no barcode on the draft row; no retrievable
  // exact US 3D pack. No standalone Assured mark file.
  'assured-headache-pm': 'Assured',
  // Attempted Sleep leftovers — night run 2026-09-23 5:30 PT batch 1.
  // Nature's Way faces are count-specific. Do not glue one count.
  // No standalone official Nature's Way colored mark file.
  'natures-way-calmaid': "Nature's Way",
  'natures-way-5-htp': "Nature's Way",
  'natures-way-cortisol-manager': "Nature's Way",
  // Attempted Sleep leftovers — night run 2026-09-23 5:30 PT batch 2.
  // Count-specific Nature's Way faces. Do not glue one count.
  'natures-way-st-johns-wort': "Nature's Way",
  'natures-way-valerian-root': "Nature's Way",
  // Excedrin PM Headache spans two count UPCs. No standalone official
  // Excedrin mark file. Do not glue one count. Do not stay a letter.
  'excedrin-pm-headache': 'Excedrin',
  // Hilma Sleep Support: hilma.co puts UPC 850023615077 on the 2-bottle
  // variant and leaves the 50ct single without a barcode. Do not glue
  // the single bottle. No standalone Hilma mark file.
  'hilma-sleep-support': 'Hilma',
  // Nordic Zero Sugar Melatonin gummies: nordic.com returned 403 from
  // this environment. No verified 3D pack for UPC 768990301889. No
  // standalone Nordic Naturals mark file.
  'nordic-zero-sugar-melatonin-gummies': 'Nordic Naturals',
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
  // Cold & Flu leftover pass — official naturesway.com 3D packshots.
  'natures-way-air-power': catalogShot('natures-way-air-power.jpg'),
  'bt-cough-bronchial-daytime': catalogShot('bt-cough-bronchial-daytime.jpg'),
  'bt-cough-bronchial-nighttime': catalogShot(
    'bt-cough-bronchial-nighttime.jpg',
  ),
  // Cold & Flu leftover batch 2 — official US 3D packshots.
  'badger-aromatic-chest-rub': catalogShot('badger-aromatic-chest-rub.jpg'),
  'beekeepers-propolis-throat-spray': catalogShot(
    'beekeepers-propolis-throat-spray.jpg',
  ),
  'medinatura-bhi-flu-cold': catalogShot('medinatura-bhi-flu-cold.jpg'),
  'medinatura-bhi-mucus': catalogShot('medinatura-bhi-mucus.jpg'),
  'medinatura-bhi-sinus-congestion': catalogShot(
    'medinatura-bhi-sinus-congestion.jpg',
  ),
  'boiron-aconitum-napellus-pellets': catalogShot(
    'boiron-aconitum-napellus-pellets.jpg',
  ),
  'boiron-allium-cepa-pellets': catalogShot('boiron-allium-cepa-pellets.jpg'),
  'boiron-alliumsativum-pellets': catalogShot(
    'boiron-alliumsativum-pellets.jpg',
  ),
  'boiron-antimonium-tartaricum-pellets': catalogShot(
    'boiron-antimonium-tartaricum-pellets.jpg',
  ),
  'boiron-baptisiatinctoria-pellets': catalogShot(
    'boiron-baptisiatinctoria-pellets.jpg',
  ),
  'boiron-bryonia-pellets': catalogShot('boiron-bryonia-pellets.jpg'),
  'boiron-causticum-pellets': catalogShot('boiron-causticum-pellets.jpg'),
  'boiron-chestal-cold-cough-pellets': catalogShot(
    'boiron-chestal-cold-cough-pellets.jpg',
  ),
  'boiron-chestal-cold-cough-tablets': catalogShot(
    'boiron-chestal-cold-cough-tablets.jpg',
  ),
  'boiron-chestal-cough-mucus-tablets': catalogShot(
    'boiron-chestal-cough-mucus-tablets.jpg',
  ),
  'chestal-adult-honey': catalogShot('chestal-adult-honey.jpg'),
  'boiron-chestal-kids-honey': catalogShot('boiron-chestal-kids-honey.jpg'),
  'boiron-chestal-kids-pellets': catalogShot('boiron-chestal-kids-pellets.jpg'),
  'boiron-chestal-kids-dry-cough-pellets': catalogShot(
    'boiron-chestal-kids-dry-cough-pellets.jpg',
  ),
  // Cold & Flu leftover batch 3 — official US 3D packshots.
  'boiron-chestal-kids-original': catalogShot(
    'boiron-chestal-kids-original.jpg',
  ),
  'boiron-chestal-meltaway-pellets': catalogShot(
    'boiron-chestal-meltaway-pellets.jpg',
  ),
  'boiron-chestal-original': catalogShot('boiron-chestal-original.jpg'),
  'boiron-coccuscacti-pellets': catalogShot('boiron-coccuscacti-pellets.jpg'),
  'boiron-coldcalm-baby': catalogShot('boiron-coldcalm-baby.jpg'),
  'boiron-coldcalm-kids-liquid': catalogShot(
    'boiron-coldcalm-kids-liquid.jpg',
  ),
  // 60-ct official carton matches kids-row UPC 306962607609 only.
  // Adult leftover `coldcalm-meltaways` (UPC 306969048290) must not inherit.
  'boiron-coldcalm-meltaways': catalogShot('boiron-coldcalm-meltaways.jpg'),
  'coldcalm-meltaways': brandMark('boiron-mark.png'),
  'boiron-coldcalm-pellets': catalogShot('boiron-coldcalm-pellets.jpg'),
  'boiron-drosera-pellets': catalogShot('boiron-drosera-pellets.jpg'),
  'boiron-dulcamara-pellets': catalogShot('boiron-dulcamara-pellets.jpg'),
  'boiron-eucalyptusglobulus-pellets': catalogShot(
    'boiron-eucalyptusglobulus-pellets.jpg',
  ),
  'boiron-eupatorium-perfoliatum-pellets': catalogShot(
    'boiron-eupatorium-perfoliatum-pellets.jpg',
  ),
  'boiron-ferrum-phosphoricum-pellets': catalogShot(
    'boiron-ferrum-phosphoricum-pellets.jpg',
  ),
  'boiron-gelsemium-sempervirens-pellets': catalogShot(
    'boiron-gelsemium-sempervirens-pellets.jpg',
  ),
  'boiron-grindelia-pellets': catalogShot('boiron-grindelia-pellets.jpg'),
  'boiron-hepar-sulphuris-calcareum-pellets': catalogShot(
    'boiron-hepar-sulphuris-calcareum-pellets.jpg',
  ),
  'boiron-hydrastis-canadensis-pellets': catalogShot(
    'boiron-hydrastis-canadensis-pellets.jpg',
  ),
  'boiron-ipecacuanha-pellets': catalogShot('boiron-ipecacuanha-pellets.jpg'),
  'boiron-kali-bichromicum-pellets': catalogShot(
    'boiron-kali-bichromicum-pellets.jpg',
  ),
  // Cold & Flu leftover batch 4 — official US 3D packshots.
  'boiron-kali-muriaticum-pellets': catalogShot(
    'boiron-kali-muriaticum-pellets.jpg',
  ),
  'boiron-kali-sulphuricum-pellets': catalogShot(
    'boiron-kali-sulphuricum-pellets.jpg',
  ),
  'oscillococcinum': catalogShot('oscillococcinum.jpg'),
  'boiron-phosphorus-pellets': catalogShot('boiron-phosphorus-pellets.jpg'),
  'boiron-phytolacca-decandra-pellets': catalogShot(
    'boiron-phytolacca-decandra-pellets.jpg',
  ),
  'boiron-pulsatilla-pellets': catalogShot('boiron-pulsatilla-pellets.jpg'),
  'boiron-rumex-crispus-pellets': catalogShot(
    'boiron-rumex-crispus-pellets.jpg',
  ),
  'boiron-sambucus-nigra-6c-cough-cold-relief-pellets': catalogShot(
    'boiron-sambucus-nigra-6c-cough-cold-relief-pellets.jpg',
  ),
  'boiron-sambucusnigra-pellets': catalogShot(
    'boiron-sambucusnigra-pellets.jpg',
  ),
  'boiron-scillamaritima-pellets': catalogShot(
    'boiron-scillamaritima-pellets.jpg',
  ),
  'boiron-senegaofficinalis-pellets': catalogShot(
    'boiron-senegaofficinalis-pellets.jpg',
  ),
  'boiron-sinuscalm-pellets': catalogShot('boiron-sinuscalm-pellets.jpg'),
  'boiron-sinuscalm-tablets': catalogShot('boiron-sinuscalm-tablets.jpg'),
  'boiron-spongia-tosta-pellets': catalogShot(
    'boiron-spongia-tosta-pellets.jpg',
  ),
  'boiron-stictapulmonaria-pellets': catalogShot(
    'boiron-stictapulmonaria-pellets.jpg',
  ),
  'boiron-throatcalm-pellets': catalogShot('boiron-throatcalm-pellets.jpg'),
  'boiron-throatcalm-spray': catalogShot('boiron-throatcalm-spray.jpg'),
  'boiron-throatcalm-tablets': catalogShot('boiron-throatcalm-tablets.jpg'),
  'boiron-verbascumthapsus-pellets': catalogShot(
    'boiron-verbascumthapsus-pellets.jpg',
  ),
  'boiron-voicecalm-tablets': catalogShot('boiron-voicecalm-tablets.jpg'),
  // Cold & Flu leftover batch 5 — official US 3D packshots.
  'natures-way-bronchial-soothe': catalogShot(
    'natures-way-bronchial-soothe.jpg',
  ),
  'dimetapp-cold-allergy-liquid': catalogShot(
    'dimetapp-cold-allergy-liquid.jpg',
  ),
  'dimetapp-cold-cough-liquid': catalogShot(
    'dimetapp-cold-cough-liquid.jpg',
  ),
  'dimetapp-night-cold-cough': catalogShot(
    'dimetapp-night-cold-cough.jpg',
  ),
  'mucinex-childrens-multi-cold-liquid': catalogShot(
    'mucinex-childrens-multi-cold-liquid.jpg',
  ),
  'mucinex-childrens-multi-daynight-kit': catalogShot(
    'mucinex-childrens-multi-daynight-kit.jpg',
  ),
  'robitussin-childrens-dm-liquid': catalogShot(
    'robitussin-childrens-dm-liquid.jpg',
  ),
  'robitussin-childrens-honey-night-dm': catalogShot(
    'robitussin-childrens-honey-night-dm.jpg',
  ),
  'robitussin-childrens-night-long-dm': catalogShot(
    'robitussin-childrens-night-long-dm.jpg',
  ),
  'sudafed-pe-childrens-cold-cough': catalogShot(
    'sudafed-pe-childrens-cold-cough.jpg',
  ),
  'sudafed-pe-childrens-nasal': catalogShot(
    'sudafed-pe-childrens-nasal.jpg',
  ),
  'sudafed-childrens-pseudo-liquid': catalogShot(
    'sudafed-childrens-pseudo-liquid.jpg',
  ),
  'fon-cold-flu-kids': catalogShot('fon-cold-flu-kids.jpg'),
  'fon-cold-flu-max': catalogShot('fon-cold-flu-max.jpg'),
  // Cold & Flu leftover batch 6 — official US 3D packshots.
  'dayquil-cold-flu-liquid': catalogShot('dayquil-cold-flu-liquid.jpg'),
  'dayquil-kids-cold-cough-fever-dyed': catalogShot(
    'dayquil-kids-cold-cough-fever-dyed.jpg',
  ),
  'dayquil-kids-dye-free-cold-cough-mucus': catalogShot(
    'dayquil-kids-dye-free-cold-cough-mucus.jpg',
  ),
  'delsym-12hr-grape': catalogShot('delsym-12hr-grape.jpg'),
  // Cold & Flu leftover daytime run — official US 3D packshots.
  'genexa-cold-crush': catalogShot('genexa-cold-crush.jpg'),
  'genexa-cough-chest-congestion': catalogShot('genexa-cough-chest-congestion.jpg'),
  'genexa-daytime-severe-cold-flu': catalogShot(
    'genexa-daytime-severe-cold-flu.jpg',
  ),
  'genexa-flu-fix': catalogShot('genexa-flu-fix.jpg'),
  'genexa-kids-cold-crush': catalogShot('genexa-kids-cold-crush.jpg'),
  'genexa-kids-cough-chest-congestion-liquid': catalogShot(
    'genexa-kids-cough-chest-congestion-liquid.jpg',
  ),
  'genexa-kids-honey-cough-syrup': catalogShot(
    'genexa-kids-honey-cough-syrup.jpg',
  ),
  'genexa-kids-multi-cold-flu-liquid': catalogShot(
    'genexa-kids-multi-cold-flu-liquid.jpg',
  ),
  'hylands-4kids-cold-n-cough': catalogShot('hylands-4kids-cold-n-cough.jpg'),
  'hylands-4kids-cold-n-cough-original': catalogShot(
    'hylands-4kids-cold-n-cough-original.jpg',
  ),
  'hylands-4kids-cold-n-cough-night-grape': catalogShot(
    'hylands-4kids-cold-n-cough-night-grape.jpg',
  ),
  'hylands-4kids-cold-n-cough-night-original': catalogShot(
    'hylands-4kids-cold-n-cough-night-original.jpg',
  ),
  'hylands-baby-mucus-cold-day': catalogShot('hylands-baby-mucus-cold-day.jpg'),
  'hylands-baby-tiny-cold-day': catalogShot('hylands-baby-tiny-cold-day.jpg'),
  'hylands-calc-fluor-6x': catalogShot('hylands-calc-fluor-6x.jpg'),
  'hylands-nat-mur-6x': catalogShot('hylands-nat-mur-6x.jpg'),
  'hylands-kids-cough-mucus-day': catalogShot(
    'hylands-kids-cough-mucus-day.jpg',
  ),
  'hylands-kids-cough-mucus-night': catalogShot(
    'hylands-kids-cough-mucus-night.jpg',
  ),
  'hylands-4kids-stuffy-nose-sinus': catalogShot(
    'hylands-4kids-stuffy-nose-sinus.jpg',
  ),
  'hylands-organic-baby-all-in-one-cough-day': catalogShot(
    'hylands-organic-baby-all-in-one-cough-day.jpg',
  ),
  'hylands-organic-baby-all-in-one-cough-night': catalogShot(
    'hylands-organic-baby-all-in-one-cough-night.jpg',
  ),
  'hylands-organic-baby-cough-immune-day': catalogShot(
    'hylands-organic-baby-cough-immune-day.jpg',
  ),
  'hylands-organic-baby-cough-immune-night': catalogShot(
    'hylands-organic-baby-cough-immune-night.jpg',
  ),
  'hylands-organic-kids-all-in-one-cough-day': catalogShot(
    'hylands-organic-kids-all-in-one-cough-day.jpg',
  ),
  'hylands-organic-kids-all-in-one-cough-night': catalogShot(
    'hylands-organic-kids-all-in-one-cough-night.jpg',
  ),
  'hylands-organic-kids-cough-immune-day': catalogShot(
    'hylands-organic-kids-cough-immune-day.jpg',
  ),
  'hylands-organic-kids-cough-immune-night': catalogShot(
    'hylands-organic-kids-cough-immune-night.jpg',
  ),
  // Cold & Flu leftover daytime run 2 — official US 3D packshots.
  'mucinex-er-600': catalogShot('mucinex-er-600.jpg'),
  'mucinex-childrens-fever-sore-cough': catalogShot(
    'mucinex-childrens-fever-sore-cough.jpg',
  ),
  'mucinex-childrens-freefrom-stuffy': catalogShot(
    'mucinex-childrens-freefrom-stuffy.jpg',
  ),
  'mucinex-childrens-mighty-chews-cold-flu': catalogShot(
    'mucinex-childrens-mighty-chews-cold-flu.jpg',
  ),
  'mucinex-childrens-mighty-chews-cough': catalogShot(
    'mucinex-childrens-mighty-chews-cough.jpg',
  ),
  'mucinex-childrens-mighty-chews-night': catalogShot(
    'mucinex-childrens-mighty-chews-night.jpg',
  ),
  'mucinex-dm-er': catalogShot('mucinex-dm-er.jpg'),
  'mucinex-fastmax-cold-flu-gels': catalogShot(
    'mucinex-fastmax-cold-flu-gels.jpg',
  ),
  'mucinex-fastmax-dm-max': catalogShot('mucinex-fastmax-dm-max.jpg'),
  'mucinex-sinusmax-severe-cong-pain': catalogShot(
    'mucinex-sinusmax-severe-cong-pain.jpg',
  ),
  'pediacare-cough-cold': catalogShot('pediacare-cough-cold.jpg'),
  'pediacare-cough-congestion': catalogShot(
    'pediacare-cough-congestion.jpg',
  ),
  'medinatura-reboost-cold-flu-zinc-lemon': catalogShot(
    'medinatura-reboost-cold-flu-zinc-lemon.jpg',
  ),
  'medinatura-reboost-sore-throat-spray-cherry': catalogShot(
    'medinatura-reboost-sore-throat-spray-cherry.jpg',
  ),
  'robitussin-dm-liquid': catalogShot('robitussin-dm-liquid.jpg'),
  'robitussin-coughgels': catalogShot('robitussin-coughgels.jpg'),
  'robitussin-dm-max-liquid': catalogShot('robitussin-dm-max-liquid.jpg'),
  'sambucol-original-syrup': catalogShot('sambucol-original-syrup.jpg'),
  'natures-way-sambucus-cold-flu-relief-chewables': catalogShot(
    'natures-way-sambucus-cold-flu-relief-chewables.jpg',
  ),
  'natures-way-sambucus-cold-flu-relief-syrup': catalogShot(
    'natures-way-sambucus-cold-flu-relief-syrup.jpg',
  ),
  'natures-way-sambucus-cough-immune-gummies': catalogShot(
    'natures-way-sambucus-cough-immune-gummies.jpg',
  ),
  'natures-way-sambucus-flu-relief-syrup': catalogShot(
    'natures-way-sambucus-flu-relief-syrup.jpg',
  ),
  'natures-way-sambucus-kids-cough-immune-gummies': catalogShot(
    'natures-way-sambucus-kids-cough-immune-gummies.jpg',
  ),
  'fon-sinus-max': catalogShot('fon-sinus-max.jpg'),
  'sprouts-bronchial-syrup': catalogShot('sprouts-bronchial-syrup.jpg'),
  'sprouts-ginger-wild-cherry-bronchial': catalogShot(
    'sprouts-ginger-wild-cherry-bronchial.jpg',
  ),
  'sprouts-original-herb-lozenges': catalogShot(
    'sprouts-original-herb-lozenges.jpg',
  ),
  'sudafed-pe-sinus-congestion': catalogShot(
    'sudafed-pe-sinus-congestion.jpg',
  ),
  'sudafed-12hr': catalogShot('sudafed-12hr.jpg'),
  'umcka-fastactives-berry': catalogShot('umcka-fastactives-berry.jpg'),
  'umcka-menthol-syrup': catalogShot('umcka-menthol-syrup.jpg'),
  'umcka-cold-flu-elderberry-syrup': catalogShot(
    'umcka-cold-flu-elderberry-syrup.jpg',
  ),
  // Cold & Flu leftover daytime run 3 — official US 3D packshots.
  'umcka-cold-flu-relief-syrup': catalogShot(
    'umcka-cold-flu-relief-syrup.jpg',
  ),
  'umcka-cold-relief-chewables': catalogShot(
    'umcka-cold-relief-chewables.jpg',
  ),
  'umcka-cold-relief-drops': catalogShot('umcka-cold-relief-drops.jpg'),
  'umcka-cold-relief-syrup': catalogShot('umcka-cold-relief-syrup.jpg'),
  'umcka-cough-relief-syrup': catalogShot('umcka-cough-relief-syrup.jpg'),
  'umcka-kids-cold-relief-chewables': catalogShot(
    'umcka-kids-cold-relief-chewables.jpg',
  ),
  'umcka-kids-cold-relief-syrup': catalogShot(
    'umcka-kids-cold-relief-syrup.jpg',
  ),
  'umcka-zero-sugar-cold-relief-syrup': catalogShot(
    'umcka-zero-sugar-cold-relief-syrup.jpg',
  ),
  // Cold & Flu leftover night run (12:30 PT) — official nowfoods.com
  // 3D bottle packshots. Per-id only so pack-size / formulaId siblings
  // do not inherit the wrong count face.
  'now-alphasorb-c-500-180': catalogShot('now-alphasorb-c-500-180.jpg'),
  'now-buffered-c-1000-complex-180': catalogShot(
    'now-buffered-c-1000-complex-180.jpg',
  ),
  // UPC 733739006806 is C-1000 Sustained Release 100 tablets (SKU 0680),
  // not the regular rose-hips + bioflavonoid tablet line.
  'now-c-1000-with-rose-hips-100': catalogShot(
    'now-c-1000-with-rose-hips-100.jpg',
  ),
  'now-c-1000-100': catalogShot('now-c-1000-100.jpg'),
  'now-c-1000-250': catalogShot('now-c-1000-250.jpg'),
  // UPC 733739006820 is C-1000 Sustained Release 250 (SKU 0682).
  'now-c-1000-250-733739006820': catalogShot(
    'now-c-1000-250-733739006820.jpg',
  ),
  'now-c-1000-500': catalogShot('now-c-1000-500.jpg'),
  'now-c-500-with-rose-hips-250': catalogShot(
    'now-c-500-with-rose-hips-250.jpg',
  ),
  'now-c-500-calcium-ascorbate-c-250': catalogShot(
    'now-c-500-calcium-ascorbate-c-250.jpg',
  ),
  'now-chewable-c-500-cherry-100': catalogShot(
    'now-chewable-c-500-cherry-100.jpg',
  ),
  'now-l-lysine-100-733739001139': catalogShot(
    'now-l-lysine-100-733739001139.jpg',
  ),
  'now-l-lysine-250-733739001238': catalogShot(
    'now-l-lysine-250-733739001238.jpg',
  ),
  'now-l-lysine-250-733739001023': catalogShot(
    'now-l-lysine-250-733739001023.jpg',
  ),
  'now-l-lysine-500-mg-250': catalogShot('now-l-lysine-500-mg-250.jpg'),
  'now-oralbiotic-60': catalogShot('now-oralbiotic-60.jpg'),
  'now-oregano-oil-90': catalogShot('now-oregano-oil-90.jpg'),
  'now-zinc-glycinate-120': catalogShot('now-zinc-glycinate-120.jpg'),
  // Cold & Flu leftover night run batch 2 — last 2 letter leftovers.
  // Per-id only: zinc 250 shares formulaId now-zinc-100 (Vitamins aisle).
  'now-zinc-picolinate-50-mg-120': catalogShot(
    'now-zinc-picolinate-50-mg-120.jpg',
  ),
  'now-zinc-250': catalogShot('now-zinc-250.jpg'),
  // Allergies leftover daytime run 3 — official US 3D packshots.
  'allegra-allergy-24hr': catalogShot('allegra-allergy-24hr.jpg'),
  'allegra-d-24hr': catalogShot('allegra-d-24hr.jpg'),
  // Allergies leftover night run 2026-09-21 batch 1 — official US 3D
  // packshots. Per-id only so formulaId siblings do not inherit.
  'fon-allergy-max': catalogShot('fon-allergy-max.jpg'),
  'natures-way-alleraide': catalogShot('natures-way-alleraide.jpg'),
  'beekeepers-nasal-spray': catalogShot('beekeepers-nasal-spray.jpg'),
  'benadryl-liqui-gels': catalogShot('benadryl-liqui-gels.jpg'),
  'benadryl-ultratabs': catalogShot('benadryl-ultratabs.jpg'),
  'boiron-allergycalm-pellets': catalogShot(
    'boiron-allergycalm-pellets.jpg',
  ),
  'boiron-allergycalm-meltaways': catalogShot(
    'boiron-allergycalm-meltaways.jpg',
  ),
  'boiron-sinuscalm-allergy-tablets': catalogShot(
    'boiron-sinuscalm-allergy-tablets.jpg',
  ),
  'childrens-allegra-liquid': catalogShot('childrens-allegra-liquid.jpg'),
  'childrens-allegra-odt': catalogShot('childrens-allegra-odt.jpg'),
  'childrens-benadryl-allergy-liquid': catalogShot(
    'childrens-benadryl-allergy-liquid.jpg',
  ),
  'childrens-benadryl-allergy-plus-congestion': catalogShot(
    'childrens-benadryl-allergy-plus-congestion.jpg',
  ),
  'childrens-benadryl-dyefree-liquid': catalogShot(
    'childrens-benadryl-dyefree-liquid.jpg',
  ),
  // Allergies leftover night run 2026-09-21 batch 2 — official US 3D
  // packshots. Per-id only so formulaId siblings do not inherit.
  'childrens-flonase-allergy-relief': catalogShot(
    'childrens-flonase-allergy-relief.jpg',
  ),
  'childrens-zyrtec-liquid': catalogShot('childrens-zyrtec-liquid.jpg'),
  'childrens-zyrtec-chewable': catalogShot(
    'childrens-zyrtec-chewable.jpg',
  ),
  'childrens-zyrtec-dissolve': catalogShot(
    'childrens-zyrtec-dissolve.jpg',
  ),
  'clear-eyes-redness-relief': catalogShot(
    'clear-eyes-redness-relief.jpg',
  ),
  // Allergies leftover night run 2026-09-21 5:30 PT batch 1 — official
  // US 3D packshots. Per-id only so formulaId siblings do not inherit.
  'medinatura-bhi-allergy': catalogShot('medinatura-bhi-allergy.jpg'),
  'medinatura-clearlife-allergy-tablets': catalogShot(
    'medinatura-clearlife-allergy-tablets.jpg',
  ),
  'dg-health-loratadine-tablets': catalogShot(
    'dg-health-loratadine-tablets.jpg',
  ),
  'dg-health-fluticasone-nasal': catalogShot(
    'dg-health-fluticasone-nasal.jpg',
  ),
  'dg-health-loratadine-odt': catalogShot('dg-health-loratadine-odt.jpg'),
  'dg-health-childrens-loratadine-chew': catalogShot(
    'dg-health-childrens-loratadine-chew.jpg',
  ),
  // Allergies leftover night run 2026-09-21 5:30 PT batch 2 — official
  // US 3D packshots. Per-id only so formulaId siblings do not inherit.
  'natures-way-eyebright': catalogShot('natures-way-eyebright.jpg'),
  'natures-way-herbal-eyebright': catalogShot(
    'natures-way-herbal-eyebright.jpg',
  ),
  'flonase-allergy-relief': catalogShot('flonase-allergy-relief.jpg'),
  'flonase-sensimist': catalogShot('flonase-sensimist.jpg'),
  'genexa-allergy-care': catalogShot('genexa-allergy-care.jpg'),
  'genexa-kids-allergy-dph-liquid': catalogShot(
    'genexa-kids-allergy-dph-liquid.jpg',
  ),
  'genexa-kids-allergy-care': catalogShot('genexa-kids-allergy-care.jpg'),
  'ollois-histaminum-30c': catalogShot('ollois-histaminum-30c.jpg'),
  // Allergies leftover night run 2026-09-22 12:30 PT batch 1 — official
  // US 3D packshots. Per-id only so formulaId siblings do not inherit.
  // Bromelain 240 shares formulaId now-quercetin-with-bromelain-120.
  'hylands-seasonal-allergy-relief': catalogShot(
    'hylands-seasonal-allergy-relief.jpg',
  ),
  'now-nac-quercetin-zinc-90': catalogShot('now-nac-quercetin-zinc-90.jpg'),
  'neilmed-sinus-rinse': catalogShot('neilmed-sinus-rinse.jpg'),
  'natures-way-nettle-leaf': catalogShot('natures-way-nettle-leaf.jpg'),
  'pataday-once-daily': catalogShot('pataday-once-daily.jpg'),
  'now-quercetin-phytosome-90': catalogShot(
    'now-quercetin-phytosome-90.jpg',
  ),
  'now-quercetin-with-bromelain-120': catalogShot(
    'now-quercetin-with-bromelain-120.jpg',
  ),
  'now-quercetin-with-bromelain-240': catalogShot(
    'now-quercetin-with-bromelain-240.jpg',
  ),
  'now-quercetin-500-mg-100': catalogShot('now-quercetin-500-mg-100.jpg'),
  'nasalcrom': catalogShot('nasalcrom.jpg'),
  // Allergies leftover night run 2026-09-22 12:30 PT batch 2 — official
  // US 3D packshots. Per-id only so formulaId siblings do not inherit.
  'now-stinging-nettle-root-extract-250-mg-90': catalogShot(
    'now-stinging-nettle-root-extract-250-mg-90.jpg',
  ),
  'umcka-allergy-sinus-chewables': catalogShot(
    'umcka-allergy-sinus-chewables.jpg',
  ),
  'visine-red-eye-comfort': catalogShot('visine-red-eye-comfort.jpg'),
  'theratears-pf': catalogShot('theratears-pf.jpg'),
  // Allergies leftover night run 2026-09-22 3:00 PT — official US 3D
  // packshots from xlear.com. Per-id only so the two Xlear formulaIds
  // do not inherit each other.
  // Decongestant: 12-hour oxymetazoline 0.5 fl oz, UPC 700596000209.
  // Not the drug-free saline.
  'xlear-nasal-spray-bkc': catalogShot('xlear-nasal-spray-bkc.jpg'),
  // Saline + xylitol 1.5 fl oz metered mist, UPC 700596000001.
  // Four-ingredient label (water, xylitol, USP sodium chloride,
  // grapefruit seed extract). Not the 0.75 oz squeeze bottle.
  'xlear-nasal-spray-no-bkc': catalogShot(
    'xlear-nasal-spray-no-bkc.jpg',
  ),
  // Sleep leftover night run 2026-09-22 5:30 PT batch 1 — official US
  // 3D packshots / exact-SKU store faces. Per-id only.
  // Hyland's Calms Forté 100ct, UPC 354973325722 (hylands.com).
  'hylands-calms-forte': catalogShot('hylands-calms-forte.jpg'),
  // Genexa Acetaminophen PM Extra Strength 100ct, UPC 850015736148
  // (Walmart ASR pack; not on live genexa.com catalog).
  'genexa-acetaminophen-pm': catalogShot('genexa-acetaminophen-pm.jpg'),
  // Unisom SleepMelts cherry 24ct, UPC 041167001400.
  'unisom-sleepmelts': catalogShot('unisom-sleepmelts.jpg'),
  // Unisom SleepMinis 60 mini-capsules, UPC 041167006702.
  'unisom-sleepminis': catalogShot('unisom-sleepminis.jpg'),
  // Unisom PM Pain 30 caplets, UPC 041167004043.
  'unisom-pm-pain': catalogShot('unisom-pm-pain.jpg'),
  // ZzzQuil Calming Vanilla Cherry 12 fl oz, UPC 323900038585
  // (zzzquil.com official hero).
  'zzzquil-liquid-dyed': catalogShot('zzzquil-liquid-dyed.jpg'),
  // ZzzQuil Soothing Sleep Chamomile Honey 12 fl oz, UPC 323900033146
  // (zzzquil.com UPC-named asset).
  'zzzquil-soothing-honey': catalogShot('zzzquil-soothing-honey.jpg'),
  // Simply Sleep 100 caplets, UPC 300450843104.
  'simply-sleep': catalogShot('simply-sleep.jpg'),
  // Sominex Original 72 tablets, UPC 042037103576.
  'sominex': catalogShot('sominex.jpg'),
  // up&up Doxylamine 25 mg 96ct, UPC 370030014965 (Target scene7).
  'upup-doxylamine-sleeptabs': catalogShot(
    'upup-doxylamine-sleeptabs.jpg',
  ),
  // up&up Nighttime Sleep Aid Liquid berry 12 fl oz, UPC 370030275809
  // (Target scene7).
  'upup-sleep-aid-liquid-dyed': catalogShot(
    'upup-sleep-aid-liquid-dyed.jpg',
  ),
  // Sleep leftover night run 2026-09-22 5:30 PT batch 2 — official US
  // 3D packshots / exact-SKU store faces. Per-id only.
  // Hyland's Sleep 100 quick-dissolving tablets, UPC 354973320611
  // (not on live hylands.com catalog; Walmart ASR pack).
  'hylands-sleep': catalogShot('hylands-sleep.jpg'),
  // Hyland's Rest 50 quick-dissolving tablets, UPC 354973333215.
  'hylands-rest': catalogShot('hylands-rest.jpg'),
  // Hyland's 4 Kids Calm 'n Restful 125 tablets, UPC 354973316119
  // (Target scene7).
  'hylands-4kids-calm-restful': catalogShot(
    'hylands-4kids-calm-restful.jpg',
  ),
  // Boiron SleepCalm Kids Meltaway Pellets, UPC 306969308424
  // (boironusa.com official).
  'boiron-sleepcalm-kids-pellets': catalogShot(
    'boiron-sleepcalm-kids-pellets.jpg',
  ),
  // Genexa Kids' Sleepology 60 chewables, UPC 857630006199
  // (genexa.com official).
  'genexa-kids-sleepology': catalogShot('genexa-kids-sleepology.jpg'),
  // Boiron SleepCalm Kids Liquid Doses 15ct, UPC 306969309094
  // (boironusa.com official).
  'boiron-sleepcalm-kids-liquid': catalogShot(
    'boiron-sleepcalm-kids-liquid.jpg',
  ),
  // Natrol Kids Melatonin 1 mg gummies 90ct, UPC 047469075309
  // (Target scene7).
  'natrol-kids-melatonin-gummies': catalogShot(
    'natrol-kids-melatonin-gummies.jpg',
  ),
  // Zarbee's Children's Sleep liquid with melatonin 1 fl oz,
  // UPC 858438005711 (Target scene7).
  'zarbees-kids-sleep-liquid': catalogShot(
    'zarbees-kids-sleep-liquid.jpg',
  ),
  // Zarbee's Children's Sleep melatonin gummies 50ct,
  // UPC 858438005438.
  'zarbees-kids-sleep-gummies': catalogShot(
    'zarbees-kids-sleep-gummies.jpg',
  ),
  // OLLY Kids Sleep (coconut + canola) 50ct, UPC 850004462065.
  'olly-kids-sleep-canola': catalogShot('olly-kids-sleep-canola.jpg'),
  // Thorne Melaton-3 60 capsules, UPC 693749788027 (thorne.com).
  'thorne-melaton-3': catalogShot('thorne-melaton-3.jpg'),
  // Thorne Melaton-5 60 capsules, UPC 693749780021 (thorne.com).
  'thorne-melaton-5': catalogShot('thorne-melaton-5.jpg'),
  // Amazon Elements Melatonin 5 mg 195 capsules, UPC 842379103650.
  'amazon-elements-melatonin-5': catalogShot(
    'amazon-elements-melatonin-5.jpg',
  ),
  // Sleep leftover night run 2026-09-23 12:30 PT batch 1 — official US
  // 3D packshots. Per-id only so shared formulaIds do not inherit.
  // Amazon Basic Care Acetaminophen PM 100 caplets, UPC 370030114054
  // (Walmart ASR pack; DailyMed image-01 is a flat label).
  'amazon-basic-care-acetaminophen-pm': catalogShot(
    'amazon-basic-care-acetaminophen-pm.jpg',
  ),
  // MegaFood Magtein 90 capsules, UPC 051494105801 (megafood.com).
  'megafood-magtein-magnesium-l-threonate': catalogShot(
    'megafood-magtein-magnesium-l-threonate.jpg',
  ),
  // Relax + Calm powder Raspberry Lemonade 50 servings, UPC 051494601716.
  'megafood-relax-calm-powder-raspberry': catalogShot(
    'megafood-relax-calm-powder-raspberry.jpg',
  ),
  // Relax + Calm powder Blackberry Hibiscus 50 servings, UPC 051494601709.
  'megafood-relax-calm-powder-blackberry': catalogShot(
    'megafood-relax-calm-powder-blackberry.jpg',
  ),
  // Melatonin Berry Good Sleep gummies 54ct / 3 mg, UPC 051494104156.
  'megafood-melatonin-sleep-gummies': catalogShot(
    'megafood-melatonin-sleep-gummies.jpg',
  ),
  // Grape soft chews 30ct (15-day), UPC 051494103999. Not the live 60ct
  // (UPC 051494105412).
  'megafood-relax-calm-soft-chews-grape': catalogShot(
    'megafood-relax-calm-soft-chews-grape.jpg',
  ),
  // Strawberry soft chews 30ct, UPC 051494105436 (megafood.com).
  'megafood-relax-calm-soft-chews-strawberry': catalogShot(
    'megafood-relax-calm-soft-chews-strawberry.jpg',
  ),
  // Genexa Sleepology 1-pack, UPC 857630006090 (genexa.com hero).
  'genexa-sleepology': catalogShot('genexa-sleepology.jpg'),
  // Genexa Kids' Calm Keeper 1-pack, UPC 857630006106.
  'genexa-kids-calm-keeper': catalogShot('genexa-kids-calm-keeper.jpg'),
  // Genexa Stress 1-pack, UPC 857630006007.
  'genexa-stress': catalogShot('genexa-stress.jpg'),
  // Hyland's Nerve Tonic 50 tablets, UPC 354973301443 (hylands.com).
  'hylands-nerve-tonic': catalogShot('hylands-nerve-tonic.jpg'),
  // Hyland's Cell Salt #6 Kali Phos 6X 100 tablets. Official hylands.com
  // carton for the draft product page. DailyMed NDC 54973-4092-1
  // (UPC 354973409217) is this 100-count; the flat DailyMed label is not
  // the pack shot.
  'hylands-kali-phos-6x': catalogShot('hylands-kali-phos-6x.jpg'),
  // Kids Sleep Calm + Immunity with melatonin 4 fl oz, UPC 810087820664.
  'hylands-kids-sleep-calm-immunity': catalogShot(
    'hylands-kids-sleep-calm-immunity.jpg',
  ),
  // Organic Kids Sleep Calm + Immunity melatonin-free 4 fl oz,
  // UPC 810087820657. Not the conventional melatonin bottle.
  'hylands-kids-sleep-calm-immunity-organic': catalogShot(
    'hylands-kids-sleep-calm-immunity-organic.jpg',
  ),
  // Boiron SleepCalm 60 tablets, UPC 306969310045 (boironusa.com).
  'boiron-sleepcalm-tablets': catalogShot('boiron-sleepcalm-tablets.jpg'),
  // Boiron StressCalm 60 tablets, UPC 306969333044.
  'boiron-stresscalm-tablets': catalogShot('boiron-stresscalm-tablets.jpg'),
  // SleepCalm On the Go pellets, UPC 306969311424.
  'boiron-sleepcalm-pellets': catalogShot('boiron-sleepcalm-pellets.jpg'),
  // StressCalm On the Go pellets, UPC 306969334423.
  'boiron-stresscalm-pellets': catalogShot('boiron-stresscalm-pellets.jpg'),
  // Camilia Bedtime 30 liquid doses, UPC 306969102091.
  'boiron-camilia-bedtime': catalogShot('boiron-camilia-bedtime.jpg'),
  // Avena sativa 30C tube, UPC 306960095132. Per-id only — shares
  // formulaId boiron-single-remedy-pellets.
  'boiron-avenasativa-pellets': catalogShot(
    'boiron-avenasativa-pellets.jpg',
  ),
  // Sleep leftover night run 2026-09-23 12:30 PT batch 2 — official US
  // 3D packshots. Per-id only. Boiron singles are the 30C tube that
  // matches each row UPC, not another dilution on the same page.
  // Coffea cruda 30C, UPC 306960224136 (boironusa.com).
  'boiron-coffea-cruda-pellets': catalogShot(
    'boiron-coffea-cruda-pellets.jpg',
  ),
  // Coffea tosta 30C, UPC 306961048137.
  'boiron-coffeatosta-pellets': catalogShot(
    'boiron-coffeatosta-pellets.jpg',
  ),
  // Hyoscyamus niger 30C, UPC 306960375135.
  'boiron-hyoscyamusniger-pellets': catalogShot(
    'boiron-hyoscyamusniger-pellets.jpg',
  ),
  // Ignatia amara 30C, UPC 306960384137.
  'boiron-ignatia-amara-pellets': catalogShot(
    'boiron-ignatia-amara-pellets.jpg',
  ),
  // Kali phosphoricum 30C, UPC 306960407133.
  'boiron-kali-phosphoricum-pellets': catalogShot(
    'boiron-kali-phosphoricum-pellets.jpg',
  ),
  // Nux moschata 30C, UPC 306960526131.
  'boiron-nuxmoschata-pellets': catalogShot(
    'boiron-nuxmoschata-pellets.jpg',
  ),
  // Passiflora incarnata 30C, UPC 306960562139.
  'boiron-passifloraincarnata-pellets': catalogShot(
    'boiron-passifloraincarnata-pellets.jpg',
  ),
  // Scutellaria lateriflora 30C, UPC 306960661139.
  'boiron-scutellarialateriflora-pellets': catalogShot(
    'boiron-scutellarialateriflora-pellets.jpg',
  ),
  // Stramonium 30C, UPC 306960705130 (not the 6C tube).
  'boiron-stramonium-2-pellets': catalogShot(
    'boiron-stramonium-2-pellets.jpg',
  ),
  // Valeriana officinalis 30C, UPC 306960772132.
  'boiron-valerianaofficinalis-pellets': catalogShot(
    'boiron-valerianaofficinalis-pellets.jpg',
  ),
  // Sprouts storefront 3D faces (shop.sprouts.com). Per-id only.
  // Sleep powder capsules 90ct, UPC 646670621123.
  'sprouts-sleep-powder-cap': catalogShot('sprouts-sleep-powder-cap.jpg'),
  // Relax-All Calm & Sleep 60 capsules, UPC 646670681806.
  'sprouts-relax-all-calm-sleep': catalogShot(
    'sprouts-relax-all-calm-sleep.jpg',
  ),
  // Ashwagandha powder capsules 90ct, UPC 646670621161.
  'sprouts-ashwagandha-powder-cap': catalogShot(
    'sprouts-ashwagandha-powder-cap.jpg',
  ),
  // Unflavored Relax-All Ease powder 8 oz, UPC 646670681783.
  // Not the dragonfruit tub.
  'sprouts-relax-all-ease-unflavored': catalogShot(
    'sprouts-relax-all-ease-unflavored.jpg',
  ),
  // Dragonfruit Relax-All Ease powder 8 oz, UPC 646670681790.
  'sprouts-relax-all-ease-dragonfruit': catalogShot(
    'sprouts-relax-all-ease-dragonfruit.jpg',
  ),
  // Melatonin 3 mg liquid 2 fl oz, UPC 646670130021.
  'sprouts-melatonin-3mg-liquid': catalogShot(
    'sprouts-melatonin-3mg-liquid.jpg',
  ),
  // Sleep liquid tincture 1 fl oz, UPC 646670631429.
  'sprouts-sleep-liquid': catalogShot('sprouts-sleep-liquid.jpg'),
  // Valerian liquid tincture 1 fl oz, UPC 646670631337.
  'sprouts-valerian-liquid': catalogShot('sprouts-valerian-liquid.jpg'),
  // Optimal Sleep 60 capsules, UPC 646670125805.
  'sprouts-optimal-sleep-mct': catalogShot('sprouts-optimal-sleep-mct.jpg'),
  // Holy Basil liquid 1 fl oz, UPC 646670157813.
  'sprouts-holy-basil-liquid': catalogShot('sprouts-holy-basil-liquid.jpg'),
  // Batch 1 formulaId inheritance fix — DG Health / Amazon Basics
  // doxylamine share formulaId `upup-doxylamine-sleeptabs`. Per-id
  // mark overlay must win so they do not inherit the up&up carton.
  // Not verifiedSku.
  'dg-health-sleep-aid-doxylamine': brandMark('dg-health-mark.png'),
  'amazon-basics-doxylamine': brandMark('amazon-basics-mark.png'),
  // Pain & Fever daytime photo run — exact US 3D packshots.
  // Letter-queue upgrades (20).
  'aleve-arthritis-pain-gel': catalogShot('aleve-arthritis-pain-gel.jpg'),
  'aleve-back-muscle-pain': catalogShot('aleve-back-muscle-pain.jpg'),
  'aleve-gelcaps': catalogShot('aleve-gelcaps.jpg'),
  'aleve-headache-pain': catalogShot('aleve-headache-pain.jpg'),
  'aleve-liquid-gels': catalogShot('aleve-liquid-gels.jpg'),
  'alevex-pain-relieving-lotion-roll-on': catalogShot(
    'alevex-pain-relieving-lotion-roll-on.jpg',
  ),
  'alevex-pain-relieving-lotion-tube': catalogShot(
    'alevex-pain-relieving-lotion-tube.jpg',
  ),
  'alevex-pain-relieving-spray': catalogShot(
    'alevex-pain-relieving-spray.jpg',
  ),
  'bayer-chewable-81-cherry': catalogShot('bayer-chewable-81-cherry.jpg'),
  'bayer-chewable-81-orange': catalogShot('bayer-chewable-81-orange.jpg'),
  'flexall-max-strength-gel': catalogShot('flexall-max-strength-gel.jpg'),
  'genuine-bayer-aspirin-325': catalogShot('genuine-bayer-aspirin-325.jpg'),
  'midol-complete': catalogShot('midol-complete.jpg'),
  'amazon-basic-care-apap-650-er-l544': catalogShot(
    'amazon-basic-care-apap-650-er-l544.jpg',
  ),
  'aplus-health-dual-action-oxides': catalogShot(
    'aplus-health-dual-action-oxides.jpg',
  ),
  'healtha2z-ibuprofen-200-382': catalogShot(
    'healtha2z-ibuprofen-200-382.jpg',
  ),
  'amazon-basic-care-ibuprofen-iron-oxide-yellow': catalogShot(
    'amazon-basic-care-ibuprofen-iron-oxide-yellow.jpg',
  ),
  // Shares formulaId with Basic Care iron-oxide-yellow — do not inherit
  // the Basic Care bottle carton. Basics leftover is a pouch pack.
  'amazon-basics-ibuprofen-iron-oxide-yellow': brandMark(
    'amazon-basics-mark.png',
  ),
  'healthwise-lidocaine-4-patch': catalogShot(
    'healthwise-lidocaine-4-patch.jpg',
  ),
  'upup-es-red40-tio2': catalogShot('upup-es-red40-tio2.jpg'),
  'welmate-lidocaine-4-patch-ethylhexyl': catalogShot(
    'welmate-lidocaine-4-patch-ethylhexyl.jpg',
  ),
  // Brand-mark → exact carton upgrades (20).
  'absorbine-jr-pro-spray': catalogShot('absorbine-jr-pro-spray.jpg'),
  'absorbine-jr-plus-ultra-patch': catalogShot(
    'absorbine-jr-plus-ultra-patch.jpg',
  ),
  'absorbine-jr-xl-back-patch': catalogShot(
    'absorbine-jr-xl-back-patch.jpg',
  ),
  'biofreeze-foam': catalogShot('biofreeze-foam.jpg'),
  'biofreeze-foot-cream': catalogShot('biofreeze-foot-cream.jpg'),
  'tiger-balm-active-muscle-rub': catalogShot(
    'tiger-balm-active-muscle-rub.jpg',
  ),
  'tiger-balm-active-muscle-gel': catalogShot(
    'tiger-balm-active-muscle-gel.jpg',
  ),
  'icy-hot-vanishing-scent-gel': catalogShot(
    'icy-hot-vanishing-scent-gel.jpg',
  ),
  'motrin-arthritis-pain-gel': catalogShot('motrin-arthritis-pain-gel.jpg'),
  'biofreeze-professional-colorless-gel-5': catalogShot(
    'biofreeze-professional-colorless-gel-5.jpg',
  ),
  'biofreeze-precision-relief-pen': catalogShot(
    'biofreeze-precision-relief-pen.jpg',
  ),
  'biofreeze-overnight-relief-cream': catalogShot(
    'biofreeze-overnight-relief-cream.jpg',
  ),
  'biofreeze-flexible-relief-strip': catalogShot(
    'biofreeze-flexible-relief-strip.jpg',
  ),
  'tiger-balm-pain-relieving-patch-regular-hydrogel': catalogShot(
    'tiger-balm-pain-relieving-patch-regular-hydrogel.jpg',
  ),
  // Shares formulaId with regular hydrogel — do not inherit the 4x2.75 carton.
  'tiger-balm-pain-relieving-patch-wider-hydrogel': brandMark(
    'tiger-balm-mark.png',
  ),
  'aspercreme-lidocaine-xl-patch': catalogShot(
    'aspercreme-lidocaine-xl-patch.jpg',
  ),
  'biofreeze-professional-colorless-roll-on-5': catalogShot(
    'biofreeze-professional-colorless-roll-on-5.jpg',
  ),
  'aspercreme-lidocaine-rosemary-mint': catalogShot(
    'aspercreme-lidocaine-rosemary-mint.jpg',
  ),
  'aspercreme-lidocaine-no-mess-lavender': catalogShot(
    'aspercreme-lidocaine-no-mess-lavender.jpg',
  ),
  'biofreeze-professional-spray-10-5': catalogShot(
    'biofreeze-professional-spray-10-5.jpg',
  ),
  'biofreeze-pain-relief-spray-10-5': catalogShot(
    'biofreeze-pain-relief-spray-10-5.jpg',
  ),
  // Pain & Fever close — last 4 brand-text tiles. Exact US 3D Target
  // cartons matched to the row barcode (grape chew 370030622429,
  // grape infants APAP 370030623631, berry infants IBU 370030118427).
  'upup-children-ibu-chew-dyed': catalogShot(
    'upup-children-ibu-chew-dyed.jpg',
  ),
  'upup-infants-apap-dyefree': catalogShot('upup-infants-apap-dyefree.jpg'),
  'upup-infants-ibu-dyefree': catalogShot('upup-infants-ibu-dyefree.jpg'),
  // Pain & Fever leftover night run 2026-09-23 3:00 PT batch 1.
  // Recount on MAIN: this aisle still had 48 letter tiles (NOW joint
  // drafts + Micro Ingredients 7-in-1). Sleep was not first unfinished.
  // Per-id only so a shared formulaId does not inherit the wrong count.
  // Micro Ingredients 7-in-1, 300 bisected tablets, UPC 850069023232
  // (microingredients.com).
  'micro-ingredients-glucosamine-7in1-300': catalogShot(
    'micro-ingredients-glucosamine-7in1-300.jpg',
  ),
  // Glucosamine & Chondroitin with MSM, 180 capsules, UPC 733739031723.
  'now-glucosamine-chondroitin-with-msm-180': catalogShot(
    'now-glucosamine-chondroitin-with-msm-180.jpg',
  ),
  // Turmeric Curcumin 665 mg, 120 veg capsules, UPC 733739046390.
  'now-turmeric-curcumin-120': catalogShot('now-turmeric-curcumin-120.jpg'),
  // MSM 1,000 mg, 240 veg capsules, UPC 733739021212.
  'now-msm-1-000-mg-240': catalogShot('now-msm-1-000-mg-240.jpg'),
  // Turmeric & Bromelain, 90 veg capsules, UPC 733739031105.
  'now-turmeric-bromelain-90': catalogShot('now-turmeric-bromelain-90.jpg'),
  // Vegetarian Glucosamine & MSM, 120 veg capsules, UPC 733739031303.
  'now-vegetarian-glucosamine-msm-120': catalogShot(
    'now-vegetarian-glucosamine-msm-120.jpg',
  ),
  // BioCell Collagen hydrolyzed type II, 120 capsules, UPC 733739030085.
  'now-biocell-collagen-hydrolyzed-type-ii-120': catalogShot(
    'now-biocell-collagen-hydrolyzed-type-ii-120.jpg',
  ),
  // Vegetarian Glucosamine & MSM, 240 veg capsules, UPC 733739031310.
  // Not the 120-count bottle.
  'now-vegetarian-glucosamine-msm-240': catalogShot(
    'now-vegetarian-glucosamine-msm-240.jpg',
  ),
  // Milk Thistle Extract with Turmeric, 120 veg capsules, UPC 733739047373.
  'now-milk-thistle-extract-with-turmeric-120': catalogShot(
    'now-milk-thistle-extract-with-turmeric-120.jpg',
  ),
  // Glucosamine & Chondroitin with MSM, 90 capsules, UPC 733739031709.
  // Not the 180-count bottle.
  'now-glucosamine-chondroitin-with-msm-90': catalogShot(
    'now-glucosamine-chondroitin-with-msm-90.jpg',
  ),
  // Boswellia Extract, 120 veg capsules, UPC 733739046147.
  'now-boswellia-extract-120': catalogShot('now-boswellia-extract-120.jpg'),
  // CurcuBrain 400 mg, 50 veg capsules, UPC 733739023957.
  'now-curcubrain-400-mg-50': catalogShot('now-curcubrain-400-mg-50.jpg'),
  // Shark Cartilage 750 mg, 300 capsules, UPC 733739032720.
  'now-shark-cartilage-750-mg-300': catalogShot(
    'now-shark-cartilage-750-mg-300.jpg',
  ),
  // MSM 1,000 mg, 120 veg capsules, UPC 733739021205.
  // Not the 240-count bottle.
  'now-msm-methylsulfonylmethane-120': catalogShot(
    'now-msm-methylsulfonylmethane-120.jpg',
  ),
  // Chondroitin Sulfate 600 mg, 120 capsules, UPC 733739032263.
  'now-chondroitin-sulfate-600-mg-120': catalogShot(
    'now-chondroitin-sulfate-600-mg-120.jpg',
  ),
  // CurcuFresh Curcumin 500 mg, 60 veg capsules, UPC 733739049377.
  'now-curcufresh-curcumin-500-mg-60': catalogShot(
    'now-curcufresh-curcumin-500-mg-60.jpg',
  ),
  // Eggshell Membrane 500 mg, 60 capsules, UPC 733739033857.
  'now-eggshell-membrane-500-mg-60': catalogShot(
    'now-eggshell-membrane-500-mg-60.jpg',
  ),
  // Turmeric Curcumin Phytosome with Meriva 500 mg, 60 veg capsules,
  // UPC 733739046420.
  'now-turmeric-curcumin-phytosome-with-meriva-60': catalogShot(
    'now-turmeric-curcumin-phytosome-with-meriva-60.jpg',
  ),
  // Glucosamine & MSM, 180 capsules, UPC 733739032799.
  'now-glucosamine-msm-180': catalogShot('now-glucosamine-msm-180.jpg'),
  // Milk Thistle Extract with Turmeric, 60 veg capsules, UPC 733739047359.
  // Not the 120-count bottle.
  'now-milk-thistle-extract-with-turmeric-60': catalogShot(
    'now-milk-thistle-extract-with-turmeric-60.jpg',
  ),
  // Pain & Fever leftover night run 2026-09-23 3:00 PT batch 2.
  // Next 20 letter tiles after batch 1. Per-id only so a shared
  // formulaId does not inherit the wrong count.
  // SAMe 200 mg, 60 veg capsules, UPC 733739001276.
  'now-same-200-mg-60': catalogShot('now-same-200-mg-60.jpg'),
  // Advanced UC-II Joint Relief, 60 capsules, UPC 733739031372.
  'now-advanced-uc-ii-joint-relief-60': catalogShot(
    'now-advanced-uc-ii-joint-relief-60.jpg',
  ),
  // Glucosamine Sulfate 750 mg, 240 capsules, UPC 733739032386.
  // Not the 120-count bottle.
  'now-glucosamine-sulfate-240': catalogShot('now-glucosamine-sulfate-240.jpg'),
  // Glucosamine '1000', 180 capsules, UPC 733739032393.
  // Not the 60-count bottle.
  'now-glucosamine-1000-180': catalogShot('now-glucosamine-1000-180.jpg'),
  // Vegetarian Glucosamine '1000', 90 veg capsules, UPC 733739031327.
  'now-vegetarian-glucosamine-1000-90': catalogShot(
    'now-vegetarian-glucosamine-1000-90.jpg',
  ),
  // Hyaluronic Acid with MSM, 60 veg capsules, UPC 733739031563.
  'now-hyaluronic-acid-with-msm-60': catalogShot(
    'now-hyaluronic-acid-with-msm-60.jpg',
  ),
  // Shark Cartilage 750 mg, 100 capsules, UPC 733739032706.
  // Not the 300-count bottle.
  'now-shark-cartilage-100': catalogShot('now-shark-cartilage-100.jpg'),
  // Cal-Mag DK, 180 capsules, UPC 733739012678.
  'now-cal-mag-dk-180': catalogShot('now-cal-mag-dk-180.jpg'),
  // Glucosamine & Chondroitin, 120 veg capsules, UPC 733739032287.
  // Not the 240-count bottle and not the tablet SKU.
  'now-glucosamine-chondroitin-120': catalogShot(
    'now-glucosamine-chondroitin-120.jpg',
  ),
  // Glucosamine & Chondroitin, 240 capsules, UPC 733739032294.
  'now-glucosamine-chondroitin-240': catalogShot(
    'now-glucosamine-chondroitin-240.jpg',
  ),
  // SAMe 200 mg, 120 veg capsules, UPC 733739001283.
  // Not the 60-count bottle.
  'now-same-200-mg-120': catalogShot('now-same-200-mg-120.jpg'),
  // Turmeric Curcumin 665 mg, 60 veg capsules, UPC 733739046383.
  // Not the 120-count bottle.
  'now-turmeric-curcumin-60': catalogShot('now-turmeric-curcumin-60.jpg'),
  // Glucosamine & MSM, 60 veg capsules, UPC 733739032782.
  // Not the 180-count bottle.
  'now-glucosamine-msm-60': catalogShot('now-glucosamine-msm-60.jpg'),
  // Certified Organic Turmeric Extract, 2 fl oz, UPC 733739048233.
  'now-certified-organic-turmeric-extract-2-fl-oz-59-ml': catalogShot(
    'now-certified-organic-turmeric-extract-2-fl-oz-59-ml.jpg',
  ),
  // Sports Advanced Joint Support, 60 capsules, UPC 733739022776.
  'now-sports-advanced-joint-support-60': catalogShot(
    'now-sports-advanced-joint-support-60.jpg',
  ),
  // Glucosamine Sulfate 750 mg, 120 capsules, UPC 733739032355.
  'now-glucosamine-sulfate-120': catalogShot('now-glucosamine-sulfate-120.jpg'),
  // Glucosamine & Chondroitin extra strength, 60 tablets, UPC 733739032423.
  // Not the veg-capsule bottles.
  'now-glucosamine-chondroitin-60': catalogShot(
    'now-glucosamine-chondroitin-60.jpg',
  ),
  // Celadrin & MSM, 120 capsules, UPC 733739030160.
  'now-celadrin-msm-120': catalogShot('now-celadrin-msm-120.jpg'),
  // Joint Support, 90 capsules, UPC 733739032904.
  'now-joint-support-90': catalogShot('now-joint-support-90.jpg'),
  // Turmeric Curcumin Gels 475 mg, 120 softgels, UPC 733739049391.
  // Not the 60-softgel bottle.
  'now-turmeric-curcumin-gels-475-mg-120': catalogShot(
    'now-turmeric-curcumin-gels-475-mg-120.jpg',
  ),
  // Sleep leftover night run 2026-09-23 5:30 PT batch 1 — official US
  // 3D packshots. Per-id only.
  // Lemon balm liquid tincture 1 fl oz, UPC 646670620621
  // (shop.sprouts.com).
  'sprouts-lemonbalm-liquid': catalogShot('sprouts-lemonbalm-liquid.jpg'),
  // Rhodiola liquid tincture 1 fl oz, UPC 646670620881.
  'sprouts-rhodiola-liquid': catalogShot('sprouts-rhodiola-liquid.jpg'),
  // Holy Basil powder capsules 60ct, UPC 646670621253.
  'sprouts-holy-basil-cap': catalogShot('sprouts-holy-basil-cap.jpg'),
  // Rhodiola powder capsules 60ct, UPC 646670621314.
  'sprouts-rhodiola-powder-cap': catalogShot('sprouts-rhodiola-powder-cap.jpg'),
  // Alcohol-free kava liquid 1 fl oz, UPC 646670631351.
  // Not the alcohol kava tincture.
  'sprouts-kava-liquid': catalogShot('sprouts-kava-liquid.jpg'),
  // Alcohol-free valerian liquid 1 fl oz, UPC 646670621055.
  // Not the grain-alcohol valerian tincture.
  'sprouts-valerian-alcohol-free': catalogShot(
    'sprouts-valerian-alcohol-free.jpg',
  ),
  // Kava powder capsules 90ct, UPC 646670155604.
  'sprouts-kava-powder-cap': catalogShot('sprouts-kava-powder-cap.jpg'),
  // WellMind Calming 100 tablets. medinatura.com SKU is UPC 787647704033.
  'medinatura-wellmind-calming-tablets': catalogShot(
    'medinatura-wellmind-calming-tablets.jpg',
  ),
  // BHI Calming Support 100 tablets. SKU is UPC 787647100101.
  'medinatura-bhi-calming-support': catalogShot(
    'medinatura-bhi-calming-support.jpg',
  ),
  // Sleep Tonight 28 tablets, UPC 763948004584 (naturesway.com).
  'natures-way-sleep-tonight': catalogShot('natures-way-sleep-tonight.jpg'),
  // Ashwagandha 60 capsules, UPC 033674153871.
  'natures-way-ashwagandha-silicate': catalogShot(
    'natures-way-ashwagandha-silicate.jpg',
  ),
  // Chamomile Flowers 100 capsules, UPC 033674116005.
  'natures-way-chamomile-flowers': catalogShot(
    'natures-way-chamomile-flowers.jpg',
  ),
  // Holy Basil standardized extract 60 capsules, UPC 033674154939.
  'natures-way-holy-basil': catalogShot('natures-way-holy-basil.jpg'),
  // Hops Flowers 100 capsules, UPC 033674141557.
  'natures-way-hops-flowers': catalogShot('natures-way-hops-flowers.jpg'),
  // Melissa-Lemon Balm Leaf 100 capsules, UPC 033674146507.
  'natures-way-melissa-lemon-balm': catalogShot(
    'natures-way-melissa-lemon-balm.jpg',
  ),
  // St. John's Wort standardized extract 90 capsules, UPC 033674630006.
  // Not the whole-herb capsule row.
  'natures-way-st-johns-wort-premium-extract': catalogShot(
    'natures-way-st-johns-wort-premium-extract.jpg',
  ),
  // Sleep leftover night run 2026-09-23 5:30 PT batch 2 — official US
  // 3D packshots. Per-id only.
  // Skullcap Herb 100 capsules, UPC 033674169001 (naturesway.com).
  'natures-way-skullcap-herb': catalogShot('natures-way-skullcap-herb.jpg'),
  // Valerian standardized extract 90 capsules, UPC 033674634004.
  // Not the whole-root row.
  'natures-way-valerian': catalogShot('natures-way-valerian.jpg'),
  // Goody's PM 16 powder packs, UPC 042037102951. Walmart 3D face
  // for that UPC. Not the 6-count carton.
  'goodys-pm-powder': catalogShot('goodys-pm-powder.jpg'),
  // CALM Sleep gummies Blueberry Pomegranate 120ct, UPC 183405043459
  // (naturalvitality.com). Not the 60ct sibling.
  'natural-vitality-calm-sleep-gummies': catalogShot(
    'natural-vitality-calm-sleep-gummies.jpg',
  ),
  // Kids Lemon Balm Calm alcohol-free 1 fl oz, UPC 090700015244
  // (herb-pharm.com).
  'herb-pharm-kids-lemon-balm-calm-af': catalogShot(
    'herb-pharm-kids-lemon-balm-calm-af.jpg',
  ),
  // Turmeric Force Nighttime 30-day, UPC 727783901224 (newchapter.com).
  'new-chapter-turmeric-force-nighttime': catalogShot(
    'new-chapter-turmeric-force-nighttime.jpg',
  ),
  // Kids Liquid Nighttime Multimineral Peaches and Cream 15.22 fl oz,
  // UPC 810104623520 (maryruthorganics.com).
  'maryruth-kids-nighttime-multimineral': catalogShot(
    'maryruth-kids-nighttime-multimineral.jpg',
  ),
  // Kids Sleep Zero Melatonin 60 gummies, UPC 817053024569
  // (smartypantsvitamins.com). Not the melatonin 0.5 mg kids bottle.
  'smartypants-kids-sleep-zero-melatonin': catalogShot(
    'smartypants-kids-sleep-zero-melatonin.jpg',
  ),
  // Adult Fast Acting Sleep 60 gummies, UPC 817053024545.
  'smartypants-adult-fast-acting-sleep': catalogShot(
    'smartypants-adult-fast-acting-sleep.jpg',
  ),
  // WonderSleep Wild Elderberry 60 gummies, UPC 860006835668
  // (plantpeople.co).
  'plant-people-wonder-sleep': catalogShot('plant-people-wonder-sleep.jpg'),
  // Liquid Nighttime Multimineral Coconut Dream 15.22 fl oz,
  // UPC 810104622066. Not the 32 oz sibling.
  'maryruth-nighttime-multimineral': catalogShot(
    'maryruth-nighttime-multimineral.jpg',
  ),
  // Amazon Elements Melatonin 3 mg 260 tablets, UPC 842379106576.
  // Not the 5 mg capsule bottle.
  'amazon-elements-melatonin-3-tablets': catalogShot(
    'amazon-elements-melatonin-3-tablets.jpg',
  ),
  // Amazon Basics Melatonin 5 mg strawberry gummies 120ct,
  // UPC 195515033381. Not the kids 1 mg gummies.
  'amazon-basics-melatonin-5-gummies': catalogShot(
    'amazon-basics-melatonin-5-gummies.jpg',
  ),
  // Sleep leftover night run 2026-09-24 12:30 PT batch 1 — official US
  // 3D packshots. Per-id only.
  // Kids Melatonin 1 mg mixed berry gummies 90ct, UPC 195515117661
  // (amazon.com ASIN B0F5W6C3PL). Not the adult 5 mg gummies.
  'amazon-basics-kids-melatonin-1-gummies': catalogShot(
    'amazon-basics-kids-melatonin-1-gummies.jpg',
  ),
  // Nighttime Sleep Aid 25 mg 100 caplets, UPC 036800327405
  // (hy-vee.com GTIN 0036800327405). Not the 24-count blister.
  'topcare-sleep-aid-dph': catalogShot('topcare-sleep-aid-dph.jpg'),
  // Dye-free Berry 12 fl oz, UPC 311917169149 (walgreens.com).
  // Not the dyed 6 / 12 fl oz pair.
  'walgreens-sleep-z-dyefree': catalogShot('walgreens-sleep-z-dyefree.jpg'),
  // Doxylamine 25 mg, 2 x 96 (192 tablets), UPC 096619857692.
  'kirkland-sleep-aid-doxylamine': catalogShot(
    'kirkland-sleep-aid-doxylamine.jpg',
  ),
  // Timed-release melatonin 10 mg 250 tablets, UPC 078742094632.
  // Not the later 300-count face.
  'members-mark-melatonin-10mg-tr': catalogShot(
    'members-mark-melatonin-10mg-tr.jpg',
  ),
  // Extra Strength Acetaminophen PM 100 caplets, UPC 359726863117
  // (target.com). Not a different count.
  'upup-es-acetaminophen-pm-100': catalogShot(
    'upup-es-acetaminophen-pm-100.jpg',
  ),
  // Melatonin 10 mg 100 veg capsules, UPC 733739035578 (NOW-03557).
  'now-melatonin-10-mg-100': catalogShot('now-melatonin-10-mg-100.jpg'),
  // Melatonin 5 mg 120 tablets, UPC 733739035547 (NOW-03554).
  // Not the 180-capsule bottle.
  'now-melatonin-5-mg-120': catalogShot('now-melatonin-5-mg-120.jpg'),
  // 5-HTP 100 mg 120 veg capsules, UPC 733739001061 (NOW-00106).
  'now-5-htp-100-mg-120': catalogShot('now-5-htp-100-mg-120.jpg'),
  // Melatonin 3 mg 180 veg capsules, UPC 733739032577 (NOW-03257).
  // Not the 60-capsule bottle.
  'now-melatonin-3-mg-180': catalogShot('now-melatonin-3-mg-180.jpg'),
  // Valerian root 500 mg 100 veg capsules, UPC 733739047700 (NOW-04770).
  // Not the 250-capsule bottle.
  'now-valerian-root-100': catalogShot('now-valerian-root-100.jpg'),
  // Melatonin 5 mg 180 veg capsules, UPC 733739035561 (NOW-03556).
  // Not the 120-tablet bottle.
  'now-melatonin-5-mg-180': catalogShot('now-melatonin-5-mg-180.jpg'),
  // Valerian root 500 mg 250 veg capsules, UPC 733739047717 (NOW-04771).
  'now-valerian-root-500-mg-250': catalogShot(
    'now-valerian-root-500-mg-250.jpg',
  ),
  // L-Tryptophan 500 mg 120 veg capsules, UPC 733739001672 (NOW-00167).
  'now-l-tryptophan-500-mg-120': catalogShot(
    'now-l-tryptophan-500-mg-120.jpg',
  ),
  // Melatonin 20 mg 90 veg capsules, UPC 733739035585 (NOW-03558).
  'now-melatonin-20-mg-90': catalogShot('now-melatonin-20-mg-90.jpg'),
  // Liquid melatonin 2 fl oz, UPC 733739032614 (NOW-03261).
  'now-liquid-melatonin-2-fl-oz-59-ml': catalogShot(
    'now-liquid-melatonin-2-fl-oz-59-ml.jpg',
  ),
  // Sleep 90 veg capsules, UPC 733739047687 (NOW-04768).
  'now-sleep-90': catalogShot('now-sleep-90.jpg'),
  // Valerian root extract 2 fl oz, UPC 733739049704 (NOW-04970).
  'now-valerian-root-extract-2-fl-oz-59-ml': catalogShot(
    'now-valerian-root-extract-2-fl-oz-59-ml.jpg',
  ),
  // Melatonin 3 mg 60 veg capsules, UPC 733739032553 (NOW-03255).
  // Not the 180-capsule bottle.
  'now-melatonin-3-mg-60': catalogShot('now-melatonin-3-mg-60.jpg'),
  // Sleep leftover night run 2026-09-24 12:30 PT batch 2 — official US
  // 3D packshots. Per-id only.
  // 5-HTP with glycine, taurine & inositol, 120 veg capsules,
  // UPC 733739001115 (NOW-00111). Not the 60-capsule bottle.
  'now-5-htp-with-glycine-taurine-inositol-120': catalogShot(
    'now-5-htp-with-glycine-taurine-inositol-120.jpg',
  ),
  // Melatonin 3 mg 180 lozenges, UPC 733739032591 (NOW-03259).
  // Not the 90-lozenge bottle.
  'now-melatonin-180': catalogShot('now-melatonin-180.jpg'),
  // Melatonin 5 mg 60 veg capsules, UPC 733739035554 (NOW-03555).
  // Not the 180-capsule bottle.
  'now-melatonin-5-mg-60': catalogShot('now-melatonin-5-mg-60.jpg'),
  // Melatonin 3 mg 90 lozenges, UPC 733739032584 (NOW-03258).
  // Not the 180-lozenge bottle.
  'now-melatonin-90': catalogShot('now-melatonin-90.jpg'),
  // L-Tryptophan 500 mg 60 veg capsules, UPC 733739001665 (NOW-00166).
  // Not the 120-capsule bottle.
  'now-l-tryptophan-500-mg-60': catalogShot(
    'now-l-tryptophan-500-mg-60.jpg',
  ),
  // 5-HTP 50 mg 90 veg capsules, UPC 733739000996 (NOW-00099).
  // Not the 30- or 180-capsule bottles.
  'now-5-htp-50-mg-90': catalogShot('now-5-htp-50-mg-90.jpg'),
  // 5-HTP 100 mg 60 veg capsules, UPC 733739001054 (NOW-00105).
  // Not the 120-capsule bottle.
  'now-5-htp-100-mg-60': catalogShot('now-5-htp-100-mg-60.jpg'),
  // Sleep Regimen 3-in-1 90 veg capsules, UPC 733739047694 (NOW-04769).
  'now-sleep-regimen-3-in-1-90': catalogShot(
    'now-sleep-regimen-3-in-1-90.jpg',
  ),
  // 5-HTP 50 mg 180 veg capsules, UPC 733739001016 (NOW-00101).
  'now-5-htp-50-mg-180': catalogShot('now-5-htp-50-mg-180.jpg'),
  // 5-HTP with glycine, taurine & inositol, 60 veg capsules,
  // UPC 733739001085 (NOW-00108). Not the 120-capsule bottle.
  'now-5-htp-with-glycine-taurine-inositol-60': catalogShot(
    'now-5-htp-with-glycine-taurine-inositol-60.jpg',
  ),
  // 5-HTP 50 mg 30 veg capsules, UPC 733739000972 (NOW-00097).
  'now-5-htp-50-mg-30': catalogShot('now-5-htp-50-mg-30.jpg'),
  // L-Tryptophan powder 2 oz, UPC 733739002631 (NOW-00263).
  // Not a capsule bottle.
  'now-l-tryptophan-powder-2': catalogShot('now-l-tryptophan-powder-2.jpg'),
  // 5-HTP citrus 100 mg 90 chewables, UPC 733739001092 (NOW-00109).
  'now-5-htp-citrus-100-mg-90-chewables': catalogShot(
    'now-5-htp-citrus-100-mg-90-chewables.jpg',
  ),
  // L-Tryptophan 1,000 mg 60 tablets, UPC 733739001696 (NOW-00169).
  // Not the 500 mg capsule bottles.
  'now-l-tryptophan-60': catalogShot('now-l-tryptophan-60.jpg'),
  // Melatonin 1 mg 100 tablets, UPC 733739032621 (NOW-03262).
  'now-melatonin-100-733739032621': catalogShot(
    'now-melatonin-100-733739032621.jpg',
  ),
  // Nutricost melatonin 5 mg 240 capsules, UPC 702669931335
  // (nutricost.com variant front). Not the 10 mg or 20 mg bottles.
  'nutricost-nutricost-melatonin-capsules-240-capsules': catalogShot(
    'nutricost-nutricost-melatonin-capsules-240-capsules.jpg',
  ),
  // Nutricost melatonin 10 mg 240 capsules, UPC 810014675787.
  // Not the 5 mg bottle and not UPC 810014672731.
  'nutricost-nutricost-melatonin-capsules-240-capsules-2': catalogShot(
    'nutricost-nutricost-melatonin-capsules-240-capsules-2.jpg',
  ),
  // Nutricost melatonin 20 mg 240 capsules, UPC 810014675794.
  'nutricost-nutricost-melatonin-capsules-240-capsules-3': catalogShot(
    'nutricost-nutricost-melatonin-capsules-240-capsules-3.jpg',
  ),
  // Fast-dissolve melatonin 5 mg 240 tablets, UPC 810014673141.
  // Not a capsule bottle.
  'nutricost-nutricost-melatonin-tablets-fast-dissolve-240-tablets':
    catalogShot(
      'nutricost-nutricost-melatonin-tablets-fast-dissolve-240-tablets.jpg',
    ),
  // nutricost.com variant barcode 810014672731 is the 10 mg 240-capsule
  // front (shopify title 10MG). Not the 3 mg tablet and not UPC 810014675787.
  'nutricost-nutricost-melatonin-tablets-240-capsules': catalogShot(
    'nutricost-nutricost-melatonin-tablets-240-capsules.jpg',
  ),
  // Sleep leftover night run 2026-09-24 3:00 PT — official US pack fronts.
  // Per-id only. This aisle finishes in this batch.
  // Unbarcoded 3 mg 240-tablet front from the pinned 3MG_240TAB gallery.
  // Draft name says capsules; the panel and bottle are tablets.
  // Not the barcoded 3 mg COMPAX tablet (UPC 810014672717).
  'nutricost-melatonin-capsules-240-tablets': catalogShot(
    'nutricost-melatonin-capsules-240-tablets.jpg',
  ),
  // Sleep Aid Complex 90 capsules, UPC 702669934145.
  'nutricost-sleep-aid-complex-capsules-90-capsules': catalogShot(
    'nutricost-sleep-aid-complex-capsules-90-capsules.jpg',
  ),
  // Barcode 810014672748 is the 12 mg 240-tablet front. Draft name omits
  // 12 mg. Not the 3 mg tablet that shares this formulaId.
  'nutricost-melatonin-tablets-240-tablets': catalogShot(
    'nutricost-melatonin-tablets-240-tablets.jpg',
  ),
  // Melatonin 5 mg 240 tablets, UPC 810014672724.
  // Not the 5 mg 240-capsule bottle.
  'nutricost-melatonin-tablets-5mg-240-tablets': catalogShot(
    'nutricost-melatonin-tablets-5mg-240-tablets.jpg',
  ),
  // Melatonin 3 mg 240 tablets, UPC 810014672717 (COMPAX front).
  // Not the unbarcoded 3 mg 240TAB bottle.
  'nutricost-melatonin-tablets-3mg-240-tablets': catalogShot(
    'nutricost-melatonin-tablets-3mg-240-tablets.jpg',
  ),
  // Extended-release melatonin 5 mg 240 capsules, UPC 810139577799.
  // Not an immediate-release capsule or tablet.
  'nutricost-melatonin-extended-release-capsules-5mg-240-capsules':
    catalogShot(
      'nutricost-melatonin-extended-release-capsules-5mg-240-capsules.jpg',
    ),
  // Chamomile 240 capsules, UPC 810014674063. Front reads 240 capsules.
  'nutricost-b79-chamomile-240-capsules': catalogShot(
    'nutricost-b79-chamomile-240-capsules.jpg',
  ),
  // Suntheanine 150 mg 60 capsules, UPC 810139578390.
  'nutricost-b80-suntheanine-60-capsules': catalogShot(
    'nutricost-b80-suntheanine-60-capsules.jpg',
  ),
  // L-Tryptophan 500 mg 120 capsules, UPC 702669933070.
  // Not a NOW tryptophan bottle.
  'nutricost-b80-l-tryptophan-120-capsules': catalogShot(
    'nutricost-b80-l-tryptophan-120-capsules.jpg',
  ),
  // Fast-dissolve melatonin 5 mg 150 tablets, UPC 850053810350.
  // Not the 10 mg / 100-tablet bottle.
  'naturewise-b82-melatonin': catalogShot('naturewise-b82-melatonin.jpg'),
  // Fast-dissolve melatonin 10 mg 100 tablets, UPC 810157852120.
  // Not the 5 mg bottle that shares this formulaId.
  'naturewise-b82-melatonin-10-mg-100-count': catalogShot(
    'naturewise-b82-melatonin-10-mg-100-count.jpg',
  ),
  // Sleep Complex 60 capsules, UPC 810157852601.
  'naturewise-b85-sleep-complex': catalogShot(
    'naturewise-b85-sleep-complex.jpg',
  ),
  // Magnesium Stress & Sleep 60 tablets, UPC 810157852823.
  'naturewise-b85-magnesium-stress-sleep': catalogShot(
    'naturewise-b85-magnesium-stress-sleep.jpg',
  ),
  // Doxylamine succinate 25 mg, 200 tablets. Wellspring carton.
  // Not the 100-count bottle.
  'welmate-b87-doxylamine': catalogShot('welmate-b87-doxylamine.jpg'),
  // Doxylamine succinate 25 mg, 100 tablets. Wellspring carton.
  // Not the 200-count bottle that shares this formulaId.
  'welmate-b87-doxylamine-100': catalogShot('welmate-b87-doxylamine-100.jpg'),
  // Immune Support night run 2026-09-24 5:30 PT batch 1 — exact US pack
  // faces. Per-id only.
  // Homeopathic Cold & Flu Relief tablets, 30 count, UPC 896116001501.
  'sambucol-cold-flu-relief-homeopathic': catalogShot(
    'sambucol-cold-flu-relief-homeopathic.jpg',
  ),
  // Natural Cherry lozenges, 25 count, UPC 091108320251.
  'cold-eeze-lozenge-classic': catalogShot('cold-eeze-lozenge-classic.jpg'),
  // Citrus chewable tablets, 96 count, UPC 647865962977.
  'airborne-chewable': catalogShot('airborne-chewable.jpg'),
  // Barcode 647865962991 is the Assorted Fruit Immune Support gummies,
  // 63 count. Not the chewable bottle.
  'airborne-gummies': catalogShot('airborne-gummies.jpg'),
  // Super Orange powder, 30 packets, UPC 885898330251.
  'emergenc-super-orange': catalogShot('emergenc-super-orange.jpg'),
  // Bio-Active Silver Hydrosol 10 ppm dropper, 2 fl oz, UPC 684088232364.
  'sovereign-silver-hydrosol': catalogShot('sovereign-silver-hydrosol.jpg'),
  // Children's Daily Immune Support syrup, 8 fl oz, UPC 850007424893.
  // Not the cough + mucus bottle.
  'zarbees-kids-immune-syrup': catalogShot('zarbees-kids-immune-syrup.jpg'),
  // Children's Elderberry Immune Support gummies, 42 count, UPC 898115002749.
  'zarbees-kids-immune-gummies': catalogShot('zarbees-kids-immune-gummies.jpg'),
  // Black Elderberry gummies with vitamin C and zinc, 30 count,
  // UPC 896116001228. Not the homeopathic tablet carton.
  'sambucol-elderberry-gummies': catalogShot('sambucol-elderberry-gummies.jpg'),
  // Sugar Free Wild Cherry lozenges, 25 count, UPC 091108324259.
  // Not the natural cherry box.
  'cold-eeze-lozenge-acek': catalogShot('cold-eeze-lozenge-acek.jpg'),
  // UltraMELT orange chewable tablets, 24 count, UPC 091108350241.
  'cold-eeze-ultramelt-dyed': catalogShot('cold-eeze-ultramelt-dyed.jpg'),
  // RapidMelts cherry quick-dissolve tablets, 25 count, UPC 732216300048.
  // Not the Ultra 18-count carton.
  'zicam-rapidmelts-dyed': catalogShot('zicam-rapidmelts-dyed.jpg'),
  // Ultra RapidMelts cherry, 18 count, UPC 732216300925.
  // Not the 25-count RapidMelts carton.
  'zicam-ultra-rapidmelts': catalogShot('zicam-ultra-rapidmelts.jpg'),
  // 365 by Whole Foods Market Elderberry Gummies, 60 count,
  // UPC 099482487591.
  '365-elderberry-gummies': catalogShot('365-elderberry-gummies.jpg'),
  // Wholesome Immunity capsules, UPC 850063728140. Official bottle front.
  'we-heart-wholesome-immunity': catalogShot('we-heart-wholesome-immunity.jpg'),
  // Immune Support night run 2026-09-24 5:30 PT batch 2 — exact US pack
  // faces from megafood.com / genexa.com. Per-id only. Single barcode
  // on each row, so the count on the face is that SKU.
  // Zinc bisglycinate 120 tablets, UPC 051494104408. Not the 60-count.
  'megafood-zinc-bisglycinate': catalogShot('megafood-zinc-bisglycinate.jpg'),
  // Selenium tablets, 60 count, UPC 051494101865.
  'megafood-selenium-tablet': catalogShot('megafood-selenium-tablet.jpg'),
  // Liposomal glutathione, 60 capsules, UPC 051494106044.
  'megafood-liposomal-glutathione': catalogShot(
    'megafood-liposomal-glutathione.jpg',
  ),
  // Quercetin with bromelain, 60 capsules, UPC 051494105627.
  'megafood-quercetin-bromelain': catalogShot(
    'megafood-quercetin-bromelain.jpg',
  ),
  // NAC, 120 capsules, UPC 051494105993.
  'megafood-nac': catalogShot('megafood-nac.jpg'),
  // Sea Moss Complex, 120 capsules, UPC 051494105832.
  'megafood-sea-moss-complex': catalogShot('megafood-sea-moss-complex.jpg'),
  // Vitamin D3 + K2 5000 IU gummies, 60 count, UPC 051494106037.
  'megafood-vitamin-d3-k2-5000-gummies': catalogShot(
    'megafood-vitamin-d3-k2-5000-gummies.jpg',
  ),
  // Elderberry Immune Support gummies, 54 count, UPC 051494104149.
  'megafood-elderberry-immune-gummies': catalogShot(
    'megafood-elderberry-immune-gummies.jpg',
  ),
  // D3 2000 IU gummies, 70 count, UPC 051494104125.
  'megafood-d3-2000-gummies': catalogShot('megafood-d3-2000-gummies.jpg'),
  // High-absorption selenium capsules, 120 count, UPC 051494106365.
  // Not the 60-count selenium tablet.
  'megafood-high-absorption-selenium-capsules': catalogShot(
    'megafood-high-absorption-selenium-capsules.jpg',
  ),
  // Liposomal vitamin C, 120 capsules, UPC 051494105863.
  'megafood-liposomal-vitamin-c': catalogShot(
    'megafood-liposomal-vitamin-c.jpg',
  ),
  // Turmeric Curcumin Extra Strength Joint, 60 tablets, UPC 051494103104.
  // Not the liver bottle.
  'megafood-turmeric-extra-strength-joint': catalogShot(
    'megafood-turmeric-extra-strength-joint.jpg',
  ),
  // Turmeric Curcumin Extra Strength Liver, 90 tablets, UPC 051494103074.
  // Not the 60-count liver bottle.
  'megafood-turmeric-extra-strength-liver': catalogShot(
    'megafood-turmeric-extra-strength-liver.jpg',
  ),
  // Infants' Daytime Cough & Immune Support, UPC 850015736933.
  // Official genexa.com hero. Not a kids acetaminophen bottle.
  'genexa-infants-daytime-cough-immune': catalogShot(
    'genexa-infants-daytime-cough-immune.jpg',
  ),
};

// Tile lookup: exact SKU overlay → per-id mark or brand-name text tile →
// brand-level mark → brand-initial tile. Exact pack shot always wins.
// Marks and text tiles are not cartons and are never verifiedSku.
// Same other-ingredients formulaId as Sleep Aid Complex, but these are
// different SKUs. Do not inherit that bottle. Stay letters until attempted.
const PREVIEW_NO_FORMULA_IMAGE = new Set([
  'nutricost-dong-quai-capsules-120-capsules',
  'nutricost-sage-extract-120-capsules',
]);

export function previewOverlayImage(
  record: Pick<RatingRecord, 'id' | 'formulaId' | 'brand'>,
): ProductImage | undefined {
  const fromId = PREVIEW_IMAGE_OVERLAY[record.id];
  if (fromId) return fromId;
  if (
    record.formulaId
    && record.formulaId !== record.id
    && !PREVIEW_NO_FORMULA_IMAGE.has(record.id)
  ) {
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

function formWord(record: Pick<RatingRecord, 'form'>): string {
  const form = (record.form ?? '').trim().toLowerCase();
  return form || 'product';
}

function flaggedNames(record: RatingRecord, level: RiskLevel): string[] {
  return (record.inactiveIngredients ?? [])
    .filter((ingredient) => ingredient.riskLevel === level)
    .map((ingredient) => ingredient.name.replace(/\.+$/, ''));
}

function joinDrivers(names: string[]): string {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names[0]}, ${names[1]}, and ${names[2]}`;
}

export const LABEL_NOT_FULLY_REVIEWED = 'This label is not fully reviewed.';

const DUMP_HONEST_NOTE =
  /FOUNDER-LOCK|FOUNDER CALL|FOUNDER-STYLE|Drug Facts:|DailyMed setid|formulaId|Draft, not verified|standalone Caution|Methodology §|pack sizes share|Inactive list left empty|do NOT invent Clean|carton-confirm|carton confirm/i;

const INCOMPLETE_LABEL_NOTE =
  /until the full label|carton-confirm|carton confirm|inactive list left empty on purpose|do NOT invent Clean|do not invent flags/i;

function isDumpHonestNote(note: string | undefined): boolean {
  if (!note) return true;
  if (DUMP_HONEST_NOTE.test(note)) return true;
  if ((note.match(/ \//g) ?? []).length >= 4) return true;
  return note.length > 420;
}

function hasFounderWhy(record: RatingRecord): boolean {
  return Boolean(record.honestNote?.trim());
}

function isIncompleteLabelRow(record: RatingRecord): boolean {
  if (!hasFounderWhy(record)) return true;
  const inactives = record.inactiveIngredients ?? [];
  // Missing-OI + founder said the carton is not matched. Confirmed
  // empty 100% powders / “inactives: none” keep their founder why.
  return inactives.length === 0 && INCOMPLETE_LABEL_NOTE.test(record.honestNote ?? '');
}

function generatedHonestNote(record: RatingRecord): string {
  const form = formWord(record);
  const high = flaggedNames(record, 'high');
  const moderate = flaggedNames(record, 'moderate');
  const limited = flaggedNames(record, 'limited');
  const inactives = record.inactiveIngredients ?? [];

  if (record.verdict === 'clean') {
    if (inactives.length === 0) {
      return `This ${form} is Clean. The carton has no Other Ingredients line.`;
    }
    return `This ${form} is Clean. The extras we reviewed on this formula stayed Clean.`;
  }

  if (record.verdict === 'avoid') {
    if (high.length === 1) {
      return `This ${form} is Not clean because of ${high[0]}. That one extra is why.`;
    }
    if (high.length > 1) {
      return `This ${form} is Not clean because of ${joinDrivers(high.slice(0, 3))}.`;
    }
    return `This ${form} is Not clean.`;
  }

  if (moderate.length === 1 && limited.length === 0) {
    return `This ${form} is Usable, not Clean, because of ${moderate[0]}.`;
  }
  if (moderate.length > 1) {
    return `This ${form} is Usable, not Clean, because of Moderate extras.`;
  }
  if (moderate.length === 1) {
    return `This ${form} is Usable, not Clean, because of ${moderate[0]}.`;
  }
  if (limited.length === 1) {
    return `This ${form} is Usable, not Clean, because of ${limited[0]}.`;
  }
  if (limited.length > 1) {
    return `This ${form} is Usable, not Clean, because of Limited extras. None of them is a High-list item.`;
  }
  return `This ${form} is ${VERDICT_LABELS[record.verdict]}, not Clean.`;
}

// Display fill only. Does not rewrite draft honestNotes or restage verdicts.
// Keep already-correct shopper copy. Replace label dumps / founder-lock essays.
export function displayHonestNote(record: RatingRecord): string {
  const overlay = PREVIEW_HONEST_NOTE_OVERLAY[record.id];
  if (overlay) return overlay;

  if (isIncompleteLabelRow(record)) {
    return LABEL_NOT_FULLY_REVIEWED;
  }

  const draft = record.honestNote;
  if (draft && !isDumpHonestNote(draft)) {
    return draft;
  }

  return generatedHonestNote(record);
}

function withPreviewHonestNote(record: RatingRecord): RatingRecord {
  const honestNote = displayHonestNote(record);
  const productImage = previewOverlayImage(record);
  if (honestNote === record.honestNote && !productImage) return record;
  return {
    ...record,
    honestNote,
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
assertBrandMark('tiger-balm-neck-shoulder-rub', 'Tiger Balm', 'tiger-balm-mark.png');
assertBrandMark('tiger-balm-hydrogel-patch', 'Tiger Balm', 'tiger-balm-mark.png');
assertBrandMark('icy-hot-original-menthol-patch', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('icy-hot-pro-microbeads-cream', 'Icy Hot', 'icy-hot-mark.png');
assertBrandMark('aspercreme-lidocaine-foot-2in1', 'Aspercreme', 'aspercreme-mark.png');
assertBrandMark('salonpas-arthritis-pain-patch-large', 'Salonpas', 'salonpas-mark.png');
assertBrandMark('absorbine-jr-plus-knee-patch', 'Absorbine Jr.', 'absorbine-jr-mark.png');
assertBrandMark(
  'boiron-chestal-cold-cough-honey',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark('coldcalm-meltaways', 'Boiron', 'boiron-mark.png');
assertBrandMark(
  'qunol-extra-strength-turmeric-1500-oleoresin',
  'Qunol',
  'qunol-mark.png',
);
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
  'biofreeze-professional-aerosol-10-5-denatonium',
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
assertBrandMark(
  'delsym-childrens-cough-chest-dm',
  'Delsym',
  'delsym-mark.png',
);
assertBrandMark(
  'delsym-childrens-cough-cold-night',
  'Delsym',
  'delsym-mark.png',
);
assertBrandMark(
  'delsym-12hr-grape-or-orange',
  'Delsym',
  'delsym-mark.png',
);
assertBrandMark(
  'dayquil-nyquil-kids-berry-cold-cough',
  'Vicks',
  'vicks-mark.png',
);
assertBrandMark(
  'genexa-kids-nighttime-cough',
  'Genexa',
  'genexa-mark.png',
);
assertBrandMark(
  'genexa-kids-nighttime-multi-cold-flu',
  'Genexa',
  'genexa-mark.png',
);
assertBrandMark(
  'genexa-nighttime-severe-cold-flu',
  'Genexa',
  'genexa-mark.png',
);
assertBrandMark(
  'topcare-mucus-dm-er',
  'TopCare',
  'topcare-mark.png',
);
assertBrandMark(
  'vicks-formula-44-dm',
  'Vicks',
  'vicks-mark.png',
);
assertBrandMark(
  'walgreens-childrens-chest-rub',
  'Walgreens',
  'walgreens-mark.png',
);
assertBrandMark(
  'walgreens-childrens-cold-cough-runny',
  'Walgreens',
  'walgreens-mark.png',
);
assertBrandMark(
  'walgreens-childrens-cough-chest',
  'Walgreens',
  'walgreens-mark.png',
);
assertBrandMark(
  'walgreens-childrens-night-cough',
  'Walgreens',
  'walgreens-mark.png',
);
assertBrandMark(
  'walgreens-kids-honey-night-cold',
  'Walgreens',
  'walgreens-mark.png',
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
  const equateChew = previewOverlayImage({
    id: 'equate-children-ibu-chew-dyed',
    formulaId: 'store-children-ibu-dyed-chew',
    brand: 'Equate',
  });
  if (
    !equateChew?.url.endsWith('/equate-mark.png') ||
    equateChew.verifiedSku
  ) {
    throw new Error('Equate chew must not inherit the up&up grape carton');
  }
  const equateInfantsApap = previewOverlayImage({
    id: 'equate-infants-apap-dyefree',
    formulaId: 'store-infants-apap-dyefree-liquid',
    brand: 'Equate',
  });
  if (
    !equateInfantsApap?.url.endsWith('/equate-mark.png') ||
    equateInfantsApap.verifiedSku
  ) {
    throw new Error(
      'Equate infants APAP must not inherit the up&up grape carton',
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
assertBrandTextTile(
  '365-guaifenesin-er-600',
  '365 Whole Foods Market',
  '365',
);
// Pain & Fever brand-text cleanup (40) — parent marks, not cartons.
assertBrandMark('aplus-health-dual-action', 'A+Health', 'aplus-health-mark.png');
assertBrandMark('aleve-caplets-tablets', 'Aleve', 'aleve-mark.png');
assertBrandMark(
  'amazon-basic-care-aspirin-81-chew-l467',
  'Amazon Basic Care',
  'amazon-basic-care-mark.png',
);
assertBrandMark(
  'amazon-basic-care-kids-apap-dyefree',
  'Amazon Basic Care',
  'amazon-basic-care-mark.png',
);
assertBrandMark(
  'amazon-basic-care-ibuprofen-liqui-gels',
  'Amazon Basic Care',
  'amazon-basic-care-mark.png',
);
assertBrandMark(
  'amazon-basic-care-infants-ibuprofen',
  'Amazon Basic Care',
  'amazon-basic-care-mark.png',
);
assertBrandMark(
  'amazon-basic-care-apap-rs-aurohealth',
  'Amazon Basic Care',
  'amazon-basic-care-mark.png',
);
assertBrandMark(
  'amazon-basics-ibuprofen-iron-oxide-yellow',
  'Amazon Basics',
  'amazon-basics-mark.png',
);
assertBrandMark(
  'amazon-basics-lidocaine-4-patch',
  'Amazon Basics',
  'amazon-basics-mark.png',
);
assertBrandMark(
  'amazon-elements-turmeric-complex',
  'Amazon Elements',
  'amazon-elements-mark.png',
);
assertBrandMark(
  'amazon-elements-turmeric-root',
  'Amazon Elements',
  'amazon-elements-mark.png',
);
assertBrandMark('bayer-aspirin-regimen-enteric', 'Bayer', 'bayer-mark.png');
assertBrandMark(
  'bayer-back-body-aspirina-cafeina',
  'Bayer',
  'bayer-mark.png',
);
assertBrandMark('bayer-es-500-aspirina', 'Bayer', 'bayer-mark.png');
assertBrandMark(
  'dg-health-ibuprofen-liquid-gels',
  'DG Health',
  'dg-health-mark.png',
);
assertBrandMark('dg-health-infants-ibuprofen', 'DG Health', 'dg-health-mark.png');
assertBrandMark('equate-children-apap-dyed', 'Equate', 'equate-mark.png');
assertBrandMark('equate-children-ibu-chew-dyed', 'Equate', 'equate-mark.png');
assertBrandMark('equate-children-ibu-dyed', 'Equate', 'equate-mark.png');
assertBrandMark('equate-infants-apap-dyefree', 'Equate', 'equate-mark.png');
assertBrandMark(
  'family-wellness-childrens-apap',
  'Family Wellness',
  'family-wellness-mark.png',
);
assertBrandMark(
  'gol-mykind-turmeric-inflammatory-gummies',
  'Garden of Life',
  'garden-of-life-mark.png',
);
assertBrandMark(
  'healtha2z-childrens-apap-chew',
  'HealthA2Z',
  'healtha2z-mark.png',
);
assertBrandMark(
  'healtha2z-ibuprofen-200-335',
  'HealthA2Z',
  'healtha2z-mark.png',
);
assertBrandMark(
  'healtha2z-naproxen-220-300',
  'HealthA2Z',
  'healtha2z-mark.png',
);
assertBrandMark(
  'now-turmeric-curcumin-bioperine',
  'NOW',
  'now-mark.png',
);
assertBrandMark(
  'organic-india-turmeric-formula',
  'Organic India',
  'organic-india-mark.png',
);
assertBrandMark(
  'signature-care-children-apap-dyed',
  'Signature Care',
  'signature-care-mark.png',
);
assertBrandMark(
  'signature-care-children-ibu-chew-dyed',
  'Signature Care',
  'signature-care-mark.png',
);
assertBrandMark(
  'signature-care-children-ibu-dyed',
  'Signature Care',
  'signature-care-mark.png',
);
assertBrandMark(
  'signature-care-infants-apap-dyefree',
  'Signature Care',
  'signature-care-mark.png',
);
assertBrandMark(
  'sprouts-inflacalm-ache-relief',
  'Sprouts',
  'sprouts-mark.png',
);
assertBrandMark('sumifun-lidocaine-4-patch', 'Sumifun', 'sumifun-mark.png');
assertBrandMark('teemofe-lidocaine-4-patch', 'Teemofe', 'teemofe-mark.png');
assertBrandMark(
  'timecap-ibuprofen-200',
  'TIME-Cap Labs',
  'timecap-mark.png',
);
assertBrandMark(
  'timecap-naproxen-220',
  'TIME-Cap Labs',
  'timecap-mark.png',
);
assertBrandMark('upup-children-apap-dyed', 'up&up', 'upup-mark.png');
assertBrandMark('upup-children-apap-dyefree', 'up&up', 'upup-mark.png');
assertBrandMark(
  'upup-children-ibu-dyefree-liquid',
  'up&up',
  'upup-mark.png',
);
assertBrandMark('upup-children-ibu-dyed', 'up&up', 'upup-mark.png');
assertBrandMark(
  'welmate-lidocaine-4-patch-parabens',
  'WELMATE',
  'welmate-mark.png',
);
assertBrandTextTile(
  'amazon-basic-care-cherry-menthol-cough-drops',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-daytime-cold-flu-liquid',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-daytime-cold-flu-softgel',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-mucus-dm-er',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-mucus-dm-er-dye-free',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-mucus-er-600',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-mucus-er-max-blue1',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-mucus-er-max-dyefree',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-oxymetazoline-nasal',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-nighttime-cold-flu-liquid',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-nighttime-cold-flu-softgel',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-no-drip-nasal',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-sf-honey-lemon-cough-drops',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-sf-menthol-cough-drops',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basics-chest-rub',
  'Amazon Basics',
  'Amazon Basics',
);
assertBrandTextTile(
  'amazon-basics-nighttime-severe-cold-flu-liquid',
  'Amazon Basics',
  'Amazon Basics',
);
assertBrandTextTile(
  'robitussin-childrens-12hr',
  'Robitussin',
  'Robitussin',
);
assertBrandTextTile(
  'robitussin-childrens-long-acting',
  'Robitussin',
  'Robitussin',
);
assertBrandTextTile(
  'cvs-adult-cough-chest-dm-dyefree',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-childrens-cough-chest-dn',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-childrens-cough-relief-dm',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-childrens-multi-cold',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-cough-chest-dm-liquid',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-pharmacy-childrens-cold-allergy',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'dg-health-cold-flu-day-softgels',
  'DG Health',
  'DG Health',
);
assertBrandTextTile(
  'dg-health-cold-flu-night-liquid',
  'DG Health',
  'DG Health',
);
assertBrandTextTile(
  'dg-health-guaifenesin-ir',
  'DG Health',
  'DG Health',
);
assertBrandTextTile(
  'dg-health-mucus-dm-er',
  'DG Health',
  'DG Health',
);
assertBrandTextTile(
  'dg-health-mucus-er',
  'DG Health',
  'DG Health',
);
assertBrandTextTile(
  'dg-health-mucus-er-max-dyefree',
  'DG Health',
  'DG Health',
);
assertBrandTextTile(
  'equate-childrens-cold-cough',
  'Equate',
  'Equate',
);
assertBrandTextTile(
  'equate-childrens-cough-congestion-dn',
  'Equate',
  'Equate',
);
assertBrandTextTile(
  'equate-childrens-multi-night',
  'Equate',
  'Equate',
);
assertBrandTextTile(
  'equate-childrens-vaporizing-rub',
  'Equate',
  'Equate',
);
assertBrandTextTile('equate-daytime-cold-flu', 'Equate', 'Equate');
assertBrandTextTile('equate-kids-dex-cough-gels', 'Equate', 'Equate');
assertBrandTextTile('equate-mucus-er-600', 'Equate', 'Equate');
assertBrandTextTile(
  'family-wellness-guaifenesin-ir-400',
  'Family Wellness',
  'Family Wellness',
);
assertBrandTextTile(
  'family-wellness-guaifenesin-dm-ir',
  'Family Wellness',
  'Family Wellness',
);
assertBrandTextTile(
  'kirkland-mucus-dm-max-er',
  'Kirkland Signature',
  'Kirkland',
);
assertBrandTextTile(
  'members-mark-mucus-er-max-dyefree',
  "Member's Mark",
  "Member's Mark",
);
assertBrandTextTile(
  'members-mark-mucus-dm-max-blue1',
  "Member's Mark",
  "Member's Mark",
);
assertBrandTextTile(
  'hylands-baby-mucus-cold-night',
  "Hyland's",
  "Hyland's",
);
assertBrandTextTile(
  'hylands-baby-tiny-cold-night',
  "Hyland's",
  "Hyland's",
);
assertBrandTextTile(
  'members-mark-mucus-dm-max-yellow10',
  "Member's Mark",
  "Member's Mark",
);
assertBrandTextTile(
  'mucinex-childrens-freefrom-multi',
  'Mucinex',
  'Mucinex',
);
assertBrandTextTile(
  'signature-care-childrens-12hr-cough',
  'Signature Care',
  'Signature Care',
);
assertBrandTextTile(
  'signature-care-childrens-multi-cold',
  'Signature Care',
  'Signature Care',
);
assertBrandTextTile(
  'signature-care-daytime-severe',
  'Signature Care',
  'Signature Care',
);
assertBrandTextTile(
  'theraflu-severe-cold-day-powder',
  'Theraflu',
  'Theraflu',
);
assertBrandTextTile(
  'umcka-coldcare-alcohol-free',
  "Nature's Way",
  "Nature's Way",
);
assertBrandTextTile(
  'umcka-cold-flu-chewables',
  "Nature's Way",
  "Nature's Way",
);
assertBrandTextTile(
  'umcka-cold-flu-fastactives',
  "Nature's Way",
  "Nature's Way",
);
assertBrandTextTile(
  'upup-childrens-multi-cold',
  'up & up',
  'up&up',
);
assertBrandTextTile(
  'upup-daytime-honey-cold-flu',
  'up&up',
  'up&up',
);
assertBrandTextTile(
  'upup-mucus-relief-600-blue',
  'up&up',
  'up&up',
);
assertBrandTextTile(
  'upup-mucus-relief-dm-yellow',
  'up&up',
  'up&up',
);
assertBrandTextTile(
  'wedderspoon-manuka-honey-drops',
  'Wedderspoon',
  'Wedderspoon',
);
assertBrandTextTile(
  'zarbees-childrens-cough-immune',
  "Zarbee's",
  "Zarbee's",
);
assertBrandTextTile(
  '365-cetirizine-softgels-peg',
  '365 Whole Foods Market',
  '365',
);
assertBrandTextTile(
  '365-diphenhydramine-softgels-peg',
  '365 Whole Foods Market',
  '365',
);
assertBrandTextTile('alaway-multidose-bak', 'Alaway', 'Alaway');
assertBrandTextTile(
  'amazon-basic-care-cetirizine-aurohealth',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-cetirizine-coated',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-dph-25-l479',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-fexofenadine-lakes',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-kids-cetirizine-liquid',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-kids-loratadine-chew',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-kids-loratadine-liquid',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-levocetirizine',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-loratadine-l612',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basic-care-loratadine-odt',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile(
  'amazon-basics-fluticasone-nasal',
  'Amazon Basics',
  'Amazon Basics',
);
assertBrandTextTile(
  'amazon-basics-mometasone-nasal',
  'Amazon Basics',
  'Amazon Basics',
);
assertBrandTextTile(
  'assured-advanced-relief-eye',
  'Assured',
  'Assured',
);
assertBrandTextTile(
  '365-loratadine-plain-ssg',
  '365 Whole Foods Market',
  '365',
);
assertBrandTextTile('alaway-preservative-free', 'Alaway', 'Alaway');
assertBrandTextTile(
  'amazon-basic-care-loratadine-aurohealth',
  'Amazon Basic Care',
  'Basic Care',
);
assertBrandTextTile('astepro-allergy', 'Astepro', 'Astepro');
assertBrandTextTile('benadryl-allergy-liquid', 'Benadryl', 'Benadryl');
assertBrandTextTile(
  'childrens-benadryl-chewables',
  'Benadryl',
  'Benadryl',
);
assertBrandTextTile(
  'childrens-claritin-liquid',
  'Claritin',
  'Claritin',
);
assertBrandTextTile(
  'childrens-claritin-chewable',
  'Claritin',
  'Claritin',
);
assertBrandTextTile('claritin-allergy-liquid', 'Claritin', 'Claritin');
assertBrandTextTile(
  'claritin-allergy-tablets-plain',
  'Claritin',
  'Claritin',
);
assertBrandTextTile('claritin-chewable', 'Claritin', 'Claritin');
assertBrandTextTile('claritin-reditabs', 'Claritin', 'Claritin');
assertBrandTextTile('claritin-d-12hr', 'Claritin', 'Claritin');
assertBrandTextTile('cvs-cetirizine-tablets', 'CVS Health', 'CVS Health');
assertBrandTextTile('cvs-kids-dph-chews', 'CVS Health', 'CVS Health');
assertBrandTextTile(
  'cvs-kids-cetirizine-liquid',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-kids-loratadine-liquid',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile('cvs-kids-dph-liquid', 'CVS Health', 'CVS Health');
assertBrandTextTile(
  'cvs-kids-loratadine-chew',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-loratadine-tablets-plain',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-health-nighttime-dry-eye',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'dg-health-cetirizine-tablets',
  'DG Health',
  'DG Health',
);
assertBrandTextTile('equate-loratadine-d', 'Equate', 'Equate');
assertBrandTextTile('equate-cetirizine-tablets', 'Equate', 'Equate');
assertBrandTextTile(
  'equate-fexofenadine-tablets',
  'Equate',
  'Equate',
);
assertBrandTextTile('equate-fluticasone-nasal', 'Equate', 'Equate');
assertBrandTextTile(
  'equate-kids-fluticasone-nasal',
  'Equate',
  'Equate',
);
assertBrandTextTile(
  'equate-loratadine-tablets-plain',
  'Equate',
  'Equate',
);
assertBrandTextTile('equate-cetirizine-d', 'Equate', 'Equate');
assertBrandTextTile('equate-fexofenadine-d', 'Equate', 'Equate');
assertBrandTextTile(
  'equate-kids-cetirizine-liquid',
  'Equate',
  'Equate',
);
assertBrandTextTile(
  'equate-kids-loratadine-liquid',
  'Equate',
  'Equate',
);
assertBrandTextTile('equate-kids-dph-chews', 'Equate', 'Equate');
assertBrandTextTile('equate-loratadine-mint-odt', 'Equate', 'Equate');
assertBrandTextTile('equate-lubricant-eye-bkc', 'Equate', 'Equate');
assertBrandTextTile('equate-lubricant-eye-pf', 'Equate', 'Equate');
assertBrandTextTile(
  'equate-nighttime-lubricant-ointment',
  'Equate',
  'Equate',
);
assertBrandTextTile(
  'kirkland-aller-tec-cetirizine',
  'Kirkland Signature',
  'Kirkland',
);
assertBrandTextTile(
  'kirkland-aller-tec-d-cetirizine-pse',
  'Kirkland Signature',
  'Kirkland',
);
assertBrandTextTile(
  'kirkland-allerclear-loratadine-plain',
  'Kirkland Signature',
  'Kirkland',
);
assertBrandTextTile(
  'members-mark-cetirizine-tablets',
  "Member's Mark",
  "Member's Mark",
);
assertBrandTextTile(
  'members-mark-loratadine-tablets',
  "Member's Mark",
  "Member's Mark",
);
assertBrandTextTile('nasacort-allergy-24hr', 'Nasacort', 'Nasacort');
assertBrandTextTile('nasacort-allergy-24hr-kids', 'Nasacort', 'Nasacort');
assertBrandTextTile('refresh-pm-ointment', 'Refresh', 'Refresh');
assertBrandTextTile('refresh-tears-pf', 'Refresh', 'Refresh');
assertBrandTextTile('rexall-cetirizine-tablets', 'Rexall', 'Rexall');
assertExactCarton(
  'hylands-seasonal-allergy-relief',
  "Hyland's",
  'hylands-seasonal-allergy-relief.jpg',
);
assertExactCarton(
  'now-nac-quercetin-zinc-90',
  'NOW',
  'now-nac-quercetin-zinc-90.jpg',
);
assertExactCarton(
  'neilmed-sinus-rinse',
  'NeilMed',
  'neilmed-sinus-rinse.jpg',
);
assertExactCarton(
  'natures-way-nettle-leaf',
  "Nature's Way",
  'natures-way-nettle-leaf.jpg',
);
assertExactCarton('pataday-once-daily', 'Pataday', 'pataday-once-daily.jpg');
assertExactCarton(
  'now-quercetin-phytosome-90',
  'NOW',
  'now-quercetin-phytosome-90.jpg',
);
assertExactCarton(
  'now-quercetin-with-bromelain-120',
  'NOW',
  'now-quercetin-with-bromelain-120.jpg',
);
assertExactCarton(
  'now-quercetin-with-bromelain-240',
  'NOW',
  'now-quercetin-with-bromelain-240.jpg',
);
assertExactCarton(
  'now-quercetin-500-mg-100',
  'NOW',
  'now-quercetin-500-mg-100.jpg',
);
assertExactCarton('nasalcrom', 'NasalCrom', 'nasalcrom.jpg');
{
  const bromelain240 = previewOverlayImage({
    id: 'now-quercetin-with-bromelain-240',
    formulaId: 'now-quercetin-with-bromelain-120',
    brand: 'NOW',
  });
  if (
    !bromelain240?.url.endsWith('/now-quercetin-with-bromelain-240.jpg') ||
    !bromelain240.verifiedSku
  ) {
    throw new Error('bromelain 240 must not inherit the 120-count carton');
  }
}
assertLetterOnly('thorne-basic-prenatal', 'Thorne');
assertLetterOnly('we-heart-wholesome-womens-multi', 'We Heart Nutrition');
// Unattempted other-aisle rows stay letters. Marks are per-id only.
// tylenol-pm-es / advil-pm-liquigels attempted in Sleep night batch 1
assertLetterOnly('walgreens-prenatal-coated', 'Walgreens');
assertBrandMark(
  'signature-care-loratadine-mint-odt',
  'Signature Care',
  'signature-care-mark.png',
);
assertBrandMark(
  'similasan-allergy-eye-multidose',
  'Similasan',
  'similasan-mark.png',
);
assertBrandMark(
  'similasan-allergy-eye-pf',
  'Similasan',
  'similasan-mark.png',
);
assertBrandTextTile('systane-ultra-pf', 'Systane', 'Systane');
assertBrandMark(
  'topcare-all-day-allergy-cetirizine',
  'TopCare',
  'topcare-mark.png',
);
assertBrandMark(
  'topcare-allergy-congestion-loratadine-d',
  'TopCare',
  'topcare-mark.png',
);
assertBrandMark(
  'topcare-allergy-relief-loratadine',
  'TopCare',
  'topcare-mark.png',
);
assertBrandMark(
  'topcare-original-eye-drops',
  'TopCare',
  'topcare-mark.png',
);
assertExactCarton(
  'now-stinging-nettle-root-extract-250-mg-90',
  'NOW',
  'now-stinging-nettle-root-extract-250-mg-90.jpg',
);
assertExactCarton(
  'umcka-allergy-sinus-chewables',
  "Nature's Way",
  'umcka-allergy-sinus-chewables.jpg',
);
assertExactCarton(
  'visine-red-eye-comfort',
  'Visine',
  'visine-red-eye-comfort.jpg',
);
assertExactCarton('theratears-pf', 'TheraTears', 'theratears-pf.jpg');
assertExactCarton(
  'xlear-nasal-spray-bkc',
  'Xlear',
  'xlear-nasal-spray-bkc.jpg',
);
assertExactCarton(
  'xlear-nasal-spray-no-bkc',
  'Xlear',
  'xlear-nasal-spray-no-bkc.jpg',
);
assertExactCarton(
  'hylands-calms-forte',
  "Hyland's",
  'hylands-calms-forte.jpg',
);
assertExactCarton(
  'genexa-acetaminophen-pm',
  'Genexa',
  'genexa-acetaminophen-pm.jpg',
);
assertExactCarton('unisom-sleepmelts', 'Unisom', 'unisom-sleepmelts.jpg');
assertExactCarton('unisom-sleepminis', 'Unisom', 'unisom-sleepminis.jpg');
assertExactCarton('unisom-pm-pain', 'Unisom', 'unisom-pm-pain.jpg');
assertExactCarton(
  'zzzquil-liquid-dyed',
  'ZzzQuil',
  'zzzquil-liquid-dyed.jpg',
);
assertExactCarton(
  'zzzquil-soothing-honey',
  'ZzzQuil',
  'zzzquil-soothing-honey.jpg',
);
assertExactCarton('simply-sleep', 'Simply Sleep', 'simply-sleep.jpg');
assertExactCarton('sominex', 'Sominex', 'sominex.jpg');
assertExactCarton(
  'upup-doxylamine-sleeptabs',
  'up&up',
  'upup-doxylamine-sleeptabs.jpg',
);
assertExactCarton(
  'upup-sleep-aid-liquid-dyed',
  'up&up',
  'upup-sleep-aid-liquid-dyed.jpg',
);
assertExactCarton('hylands-sleep', "Hyland's", 'hylands-sleep.jpg');
assertExactCarton('hylands-rest', "Hyland's", 'hylands-rest.jpg');
assertExactCarton(
  'hylands-4kids-calm-restful',
  "Hyland's",
  'hylands-4kids-calm-restful.jpg',
);
assertExactCarton(
  'boiron-sleepcalm-kids-pellets',
  'Boiron',
  'boiron-sleepcalm-kids-pellets.jpg',
);
assertExactCarton(
  'genexa-kids-sleepology',
  'Genexa',
  'genexa-kids-sleepology.jpg',
);
assertExactCarton(
  'boiron-sleepcalm-kids-liquid',
  'Boiron',
  'boiron-sleepcalm-kids-liquid.jpg',
);
assertExactCarton(
  'natrol-kids-melatonin-gummies',
  'Natrol',
  'natrol-kids-melatonin-gummies.jpg',
);
assertExactCarton(
  'zarbees-kids-sleep-liquid',
  "Zarbee's",
  'zarbees-kids-sleep-liquid.jpg',
);
assertExactCarton(
  'zarbees-kids-sleep-gummies',
  "Zarbee's",
  'zarbees-kids-sleep-gummies.jpg',
);
assertExactCarton(
  'olly-kids-sleep-canola',
  'OLLY',
  'olly-kids-sleep-canola.jpg',
);
assertExactCarton('thorne-melaton-3', 'Thorne', 'thorne-melaton-3.jpg');
assertExactCarton('thorne-melaton-5', 'Thorne', 'thorne-melaton-5.jpg');
assertExactCarton(
  'amazon-elements-melatonin-5',
  'Amazon Elements',
  'amazon-elements-melatonin-5.jpg',
);
assertExactCarton(
  'amazon-basic-care-acetaminophen-pm',
  'Amazon Basic Care',
  'amazon-basic-care-acetaminophen-pm.jpg',
);
assertExactCarton(
  'megafood-magtein-magnesium-l-threonate',
  'MegaFood',
  'megafood-magtein-magnesium-l-threonate.jpg',
);
assertExactCarton(
  'megafood-relax-calm-powder-raspberry',
  'MegaFood',
  'megafood-relax-calm-powder-raspberry.jpg',
);
assertExactCarton(
  'megafood-relax-calm-powder-blackberry',
  'MegaFood',
  'megafood-relax-calm-powder-blackberry.jpg',
);
assertExactCarton(
  'megafood-melatonin-sleep-gummies',
  'MegaFood',
  'megafood-melatonin-sleep-gummies.jpg',
);
assertExactCarton(
  'megafood-relax-calm-soft-chews-grape',
  'MegaFood',
  'megafood-relax-calm-soft-chews-grape.jpg',
);
assertExactCarton(
  'megafood-relax-calm-soft-chews-strawberry',
  'MegaFood',
  'megafood-relax-calm-soft-chews-strawberry.jpg',
);
assertExactCarton('genexa-sleepology', 'Genexa', 'genexa-sleepology.jpg');
assertExactCarton(
  'genexa-kids-calm-keeper',
  'Genexa',
  'genexa-kids-calm-keeper.jpg',
);
assertExactCarton('genexa-stress', 'Genexa', 'genexa-stress.jpg');
assertExactCarton('hylands-nerve-tonic', "Hyland's", 'hylands-nerve-tonic.jpg');
assertExactCarton('hylands-kali-phos-6x', "Hyland's", 'hylands-kali-phos-6x.jpg');
assertExactCarton(
  'hylands-kids-sleep-calm-immunity',
  "Hyland's",
  'hylands-kids-sleep-calm-immunity.jpg',
);
assertExactCarton(
  'hylands-kids-sleep-calm-immunity-organic',
  "Hyland's",
  'hylands-kids-sleep-calm-immunity-organic.jpg',
);
assertExactCarton(
  'boiron-sleepcalm-tablets',
  'Boiron',
  'boiron-sleepcalm-tablets.jpg',
);
assertExactCarton(
  'boiron-stresscalm-tablets',
  'Boiron',
  'boiron-stresscalm-tablets.jpg',
);
assertExactCarton(
  'boiron-sleepcalm-pellets',
  'Boiron',
  'boiron-sleepcalm-pellets.jpg',
);
assertExactCarton(
  'boiron-stresscalm-pellets',
  'Boiron',
  'boiron-stresscalm-pellets.jpg',
);
assertExactCarton(
  'boiron-camilia-bedtime',
  'Boiron',
  'boiron-camilia-bedtime.jpg',
);
assertExactCarton(
  'boiron-avenasativa-pellets',
  'Boiron',
  'boiron-avenasativa-pellets.jpg',
);
assertExactCarton(
  'boiron-coffea-cruda-pellets',
  'Boiron',
  'boiron-coffea-cruda-pellets.jpg',
);
assertExactCarton(
  'boiron-coffeatosta-pellets',
  'Boiron',
  'boiron-coffeatosta-pellets.jpg',
);
assertExactCarton(
  'boiron-hyoscyamusniger-pellets',
  'Boiron',
  'boiron-hyoscyamusniger-pellets.jpg',
);
assertExactCarton(
  'boiron-ignatia-amara-pellets',
  'Boiron',
  'boiron-ignatia-amara-pellets.jpg',
);
assertExactCarton(
  'boiron-kali-phosphoricum-pellets',
  'Boiron',
  'boiron-kali-phosphoricum-pellets.jpg',
);
assertExactCarton(
  'boiron-nuxmoschata-pellets',
  'Boiron',
  'boiron-nuxmoschata-pellets.jpg',
);
assertExactCarton(
  'boiron-passifloraincarnata-pellets',
  'Boiron',
  'boiron-passifloraincarnata-pellets.jpg',
);
assertExactCarton(
  'boiron-scutellarialateriflora-pellets',
  'Boiron',
  'boiron-scutellarialateriflora-pellets.jpg',
);
assertExactCarton(
  'boiron-stramonium-2-pellets',
  'Boiron',
  'boiron-stramonium-2-pellets.jpg',
);
assertExactCarton(
  'boiron-valerianaofficinalis-pellets',
  'Boiron',
  'boiron-valerianaofficinalis-pellets.jpg',
);
assertExactCarton(
  'sprouts-sleep-powder-cap',
  'Sprouts',
  'sprouts-sleep-powder-cap.jpg',
);
assertExactCarton(
  'sprouts-relax-all-calm-sleep',
  'Sprouts',
  'sprouts-relax-all-calm-sleep.jpg',
);
assertExactCarton(
  'sprouts-ashwagandha-powder-cap',
  'Sprouts',
  'sprouts-ashwagandha-powder-cap.jpg',
);
assertExactCarton(
  'sprouts-relax-all-ease-unflavored',
  'Sprouts',
  'sprouts-relax-all-ease-unflavored.jpg',
);
assertExactCarton(
  'sprouts-relax-all-ease-dragonfruit',
  'Sprouts',
  'sprouts-relax-all-ease-dragonfruit.jpg',
);
assertExactCarton(
  'sprouts-melatonin-3mg-liquid',
  'Sprouts',
  'sprouts-melatonin-3mg-liquid.jpg',
);
assertExactCarton('sprouts-sleep-liquid', 'Sprouts', 'sprouts-sleep-liquid.jpg');
assertExactCarton(
  'sprouts-valerian-liquid',
  'Sprouts',
  'sprouts-valerian-liquid.jpg',
);
assertExactCarton(
  'sprouts-optimal-sleep-mct',
  'Sprouts',
  'sprouts-optimal-sleep-mct.jpg',
);
assertExactCarton(
  'sprouts-holy-basil-liquid',
  'Sprouts',
  'sprouts-holy-basil-liquid.jpg',
);
assertExactCarton(
  'micro-ingredients-glucosamine-7in1-300',
  'Micro Ingredients',
  'micro-ingredients-glucosamine-7in1-300.jpg',
);
assertExactCarton(
  'now-glucosamine-chondroitin-with-msm-180',
  'NOW',
  'now-glucosamine-chondroitin-with-msm-180.jpg',
);
assertExactCarton(
  'now-turmeric-curcumin-120',
  'NOW',
  'now-turmeric-curcumin-120.jpg',
);
assertExactCarton('now-msm-1-000-mg-240', 'NOW', 'now-msm-1-000-mg-240.jpg');
assertExactCarton(
  'now-turmeric-bromelain-90',
  'NOW',
  'now-turmeric-bromelain-90.jpg',
);
assertExactCarton(
  'now-vegetarian-glucosamine-msm-120',
  'NOW',
  'now-vegetarian-glucosamine-msm-120.jpg',
);
assertExactCarton(
  'now-biocell-collagen-hydrolyzed-type-ii-120',
  'NOW',
  'now-biocell-collagen-hydrolyzed-type-ii-120.jpg',
);
assertExactCarton(
  'now-vegetarian-glucosamine-msm-240',
  'NOW',
  'now-vegetarian-glucosamine-msm-240.jpg',
);
assertExactCarton(
  'now-milk-thistle-extract-with-turmeric-120',
  'NOW',
  'now-milk-thistle-extract-with-turmeric-120.jpg',
);
assertExactCarton(
  'now-glucosamine-chondroitin-with-msm-90',
  'NOW',
  'now-glucosamine-chondroitin-with-msm-90.jpg',
);
assertExactCarton(
  'now-boswellia-extract-120',
  'NOW',
  'now-boswellia-extract-120.jpg',
);
assertExactCarton(
  'now-curcubrain-400-mg-50',
  'NOW',
  'now-curcubrain-400-mg-50.jpg',
);
assertExactCarton(
  'now-shark-cartilage-750-mg-300',
  'NOW',
  'now-shark-cartilage-750-mg-300.jpg',
);
assertExactCarton(
  'now-msm-methylsulfonylmethane-120',
  'NOW',
  'now-msm-methylsulfonylmethane-120.jpg',
);
assertExactCarton(
  'now-chondroitin-sulfate-600-mg-120',
  'NOW',
  'now-chondroitin-sulfate-600-mg-120.jpg',
);
assertExactCarton(
  'now-curcufresh-curcumin-500-mg-60',
  'NOW',
  'now-curcufresh-curcumin-500-mg-60.jpg',
);
assertExactCarton(
  'now-eggshell-membrane-500-mg-60',
  'NOW',
  'now-eggshell-membrane-500-mg-60.jpg',
);
assertExactCarton(
  'now-turmeric-curcumin-phytosome-with-meriva-60',
  'NOW',
  'now-turmeric-curcumin-phytosome-with-meriva-60.jpg',
);
assertExactCarton(
  'now-glucosamine-msm-180',
  'NOW',
  'now-glucosamine-msm-180.jpg',
);
assertExactCarton(
  'now-milk-thistle-extract-with-turmeric-60',
  'NOW',
  'now-milk-thistle-extract-with-turmeric-60.jpg',
);
assertExactCarton('now-same-200-mg-60', 'NOW', 'now-same-200-mg-60.jpg');
assertExactCarton(
  'now-advanced-uc-ii-joint-relief-60',
  'NOW',
  'now-advanced-uc-ii-joint-relief-60.jpg',
);
assertExactCarton(
  'now-glucosamine-sulfate-240',
  'NOW',
  'now-glucosamine-sulfate-240.jpg',
);
assertExactCarton(
  'now-glucosamine-1000-180',
  'NOW',
  'now-glucosamine-1000-180.jpg',
);
assertExactCarton(
  'now-vegetarian-glucosamine-1000-90',
  'NOW',
  'now-vegetarian-glucosamine-1000-90.jpg',
);
assertExactCarton(
  'now-hyaluronic-acid-with-msm-60',
  'NOW',
  'now-hyaluronic-acid-with-msm-60.jpg',
);
assertExactCarton(
  'now-shark-cartilage-100',
  'NOW',
  'now-shark-cartilage-100.jpg',
);
assertExactCarton('now-cal-mag-dk-180', 'NOW', 'now-cal-mag-dk-180.jpg');
assertExactCarton(
  'now-glucosamine-chondroitin-120',
  'NOW',
  'now-glucosamine-chondroitin-120.jpg',
);
assertExactCarton(
  'now-glucosamine-chondroitin-240',
  'NOW',
  'now-glucosamine-chondroitin-240.jpg',
);
assertExactCarton('now-same-200-mg-120', 'NOW', 'now-same-200-mg-120.jpg');
assertExactCarton(
  'now-turmeric-curcumin-60',
  'NOW',
  'now-turmeric-curcumin-60.jpg',
);
assertExactCarton(
  'now-glucosamine-msm-60',
  'NOW',
  'now-glucosamine-msm-60.jpg',
);
assertExactCarton(
  'now-certified-organic-turmeric-extract-2-fl-oz-59-ml',
  'NOW',
  'now-certified-organic-turmeric-extract-2-fl-oz-59-ml.jpg',
);
assertExactCarton(
  'now-sports-advanced-joint-support-60',
  'NOW',
  'now-sports-advanced-joint-support-60.jpg',
);
assertExactCarton(
  'now-glucosamine-sulfate-120',
  'NOW',
  'now-glucosamine-sulfate-120.jpg',
);
assertExactCarton(
  'now-glucosamine-chondroitin-60',
  'NOW',
  'now-glucosamine-chondroitin-60.jpg',
);
assertExactCarton('now-celadrin-msm-120', 'NOW', 'now-celadrin-msm-120.jpg');
assertExactCarton('now-joint-support-90', 'NOW', 'now-joint-support-90.jpg');
assertExactCarton(
  'now-turmeric-curcumin-gels-475-mg-120',
  'NOW',
  'now-turmeric-curcumin-gels-475-mg-120.jpg',
);
{
  const decongestant = previewOverlayImage({
    id: 'xlear-nasal-spray-bkc',
    formulaId: 'xlear-nasal-spray-bkc',
    brand: 'Xlear',
  });
  const saline = previewOverlayImage({
    id: 'xlear-nasal-spray-no-bkc',
    formulaId: 'xlear-nasal-spray-no-bkc',
    brand: 'Xlear',
  });
  if (decongestant?.url === saline?.url) {
    throw new Error('Xlear decongestant must not share the saline carton');
  }
}
assertBrandMark(
  'walgreens-pm-lubricant-ointment',
  'Walgreens',
  'walgreens-mark.png',
);
assertBrandMark(
  'zyrtec-allergy-liquid-gels',
  'Zyrtec',
  'zyrtec-mark.png',
);
assertBrandMark('zyrtec-allergy-tablets', 'Zyrtec', 'zyrtec-mark.png');
{
  const familyCet = previewOverlayImage({
    id: 'family-wellness-cetirizine-tablets',
    formulaId: 'zyrtec-allergy-tablets-tio2',
    brand: 'Family Wellness',
  });
  if (familyCet?.url.endsWith('/zyrtec-mark.png')) {
    throw new Error(
      'Family Wellness cetirizine must not inherit the Zyrtec mark',
    );
  }
}
assertBrandTextTile('zaditor', 'Zaditor', 'Zaditor');
assertBrandMark('tylenol-pm-es', 'Tylenol', 'tylenol-mark.png');
assertBrandMark('advil-pm-liquigels', 'Advil', 'advil-mark.png');
assertBrandMark('advil-pm-caplets', 'Advil', 'advil-mark.png');
assertBrandMark('equate-sleep-aid-softgels', 'Equate', 'equate-mark.png');
assertBrandMark(
  'equate-sleep-aid-tablets-dyed',
  'Equate',
  'equate-mark.png',
);
assertBrandTextTile(
  'unisom-sleeptabs-doxylamine',
  'Unisom',
  'Unisom',
);
assertBrandTextTile('zzzquil-liquicaps', 'ZzzQuil', 'ZzzQuil');
assertBrandTextTile(
  'zzzquil-free-of-artificial',
  'ZzzQuil',
  'ZzzQuil',
);
assertBrandTextTile(
  'cvs-sleep-aid-liquid-dyed',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile(
  'cvs-sleep-aid-liquid-dyefree',
  'CVS Health',
  'CVS Health',
);
assertBrandTextTile('olly-kids-sleep-coconut-only', 'OLLY', 'OLLY');
assertBrandTextTile('assured-headache-pm', 'Assured', 'Assured');
assertBrandMark(
  'equate-childrens-melatonin-liquid',
  'Equate',
  'equate-mark.png',
);
assertBrandMark(
  'pure-encapsulations-melatonin-sr-3mg',
  'Pure Encapsulations',
  'pure-encapsulations-mark.png',
);
assertBrandMark(
  'dg-health-pain-relief-pm',
  'DG Health',
  'dg-health-mark.png',
);
assertBrandMark(
  'dg-health-sleep-aid-dph',
  'DG Health',
  'dg-health-mark.png',
);
assertBrandMark(
  'dg-health-sleep-aid-doxylamine',
  'DG Health',
  'dg-health-mark.png',
);
assertBrandMark(
  'amazon-basics-doxylamine',
  'Amazon Basics',
  'amazon-basics-mark.png',
);
{
  const dgDox = previewOverlayImage({
    id: 'dg-health-sleep-aid-doxylamine',
    formulaId: 'upup-doxylamine-sleeptabs',
    brand: 'DG Health',
  });
  if (
    !dgDox?.url.endsWith('/dg-health-mark.png') ||
    dgDox.verifiedSku
  ) {
    throw new Error(
      'DG Health doxylamine must not inherit the up&up carton',
    );
  }
  const basicsDox = previewOverlayImage({
    id: 'amazon-basics-doxylamine',
    formulaId: 'upup-doxylamine-sleeptabs',
    brand: 'Amazon Basics',
  });
  if (
    !basicsDox?.url.endsWith('/amazon-basics-mark.png') ||
    basicsDox.verifiedSku
  ) {
    throw new Error(
      'Amazon Basics doxylamine must not inherit the up&up carton',
    );
  }
}
assertBrandMark(
  'upup-loratadine-tablets-plain',
  'up&up',
  'upup-mark.png',
);
assertBrandMark(
  'upup-kids-cetirizine-bubblegum',
  'up&up',
  'upup-mark.png',
);
assertBrandMark('upup-kids-cetirizine-grape', 'up&up', 'upup-mark.png');
assertBrandMark(
  'upup-kids-loratadine-liquid',
  'up&up',
  'upup-mark.png',
);
assertBrandMark('upup-kids-dph-melts', 'up&up', 'upup-mark.png');
assertBrandMark(
  'upup-pm-lubricant-ointment',
  'up&up',
  'upup-mark.png',
);
assertBrandMark(
  'walgreens-allergy-relief-cetirizine',
  'Walgreens',
  'walgreens-mark.png',
);
assertBrandMark(
  'walgreens-allergy-relief-loratadine',
  'Walgreens',
  'walgreens-mark.png',
);
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
  'natures-way-air-power',
  "Nature's Way",
  'natures-way-air-power.jpg',
);
assertExactCarton(
  'natures-way-bronchial-soothe',
  "Nature's Way",
  'natures-way-bronchial-soothe.jpg',
);
assertExactCarton(
  'dimetapp-cold-allergy-liquid',
  'Dimetapp',
  'dimetapp-cold-allergy-liquid.jpg',
);
assertExactCarton(
  'dimetapp-cold-cough-liquid',
  'Dimetapp',
  'dimetapp-cold-cough-liquid.jpg',
);
assertExactCarton(
  'dimetapp-night-cold-cough',
  'Dimetapp',
  'dimetapp-night-cold-cough.jpg',
);
assertExactCarton(
  'mucinex-childrens-multi-cold-liquid',
  'Mucinex',
  'mucinex-childrens-multi-cold-liquid.jpg',
);
assertExactCarton(
  'mucinex-childrens-multi-daynight-kit',
  'Mucinex',
  'mucinex-childrens-multi-daynight-kit.jpg',
);
assertExactCarton(
  'robitussin-childrens-dm-liquid',
  'Robitussin',
  'robitussin-childrens-dm-liquid.jpg',
);
assertExactCarton(
  'robitussin-childrens-honey-night-dm',
  'Robitussin',
  'robitussin-childrens-honey-night-dm.jpg',
);
assertExactCarton(
  'robitussin-childrens-night-long-dm',
  'Robitussin',
  'robitussin-childrens-night-long-dm.jpg',
);
assertExactCarton(
  'sudafed-pe-childrens-cold-cough',
  'Sudafed',
  'sudafed-pe-childrens-cold-cough.jpg',
);
assertExactCarton(
  'sudafed-pe-childrens-nasal',
  'Sudafed',
  'sudafed-pe-childrens-nasal.jpg',
);
assertExactCarton(
  'sudafed-childrens-pseudo-liquid',
  'Sudafed',
  'sudafed-childrens-pseudo-liquid.jpg',
);
assertExactCarton(
  'fon-cold-flu-kids',
  'Forces of Nature',
  'fon-cold-flu-kids.jpg',
);
assertExactCarton(
  'fon-cold-flu-max',
  'Forces of Nature',
  'fon-cold-flu-max.jpg',
);
assertExactCarton(
  'dayquil-cold-flu-liquid',
  'Vicks',
  'dayquil-cold-flu-liquid.jpg',
);
assertExactCarton(
  'dayquil-kids-cold-cough-fever-dyed',
  'Vicks',
  'dayquil-kids-cold-cough-fever-dyed.jpg',
);
assertExactCarton(
  'dayquil-kids-dye-free-cold-cough-mucus',
  'Vicks',
  'dayquil-kids-dye-free-cold-cough-mucus.jpg',
);
assertExactCarton(
  'delsym-12hr-grape',
  'Delsym',
  'delsym-12hr-grape.jpg',
);
assertExactCarton('genexa-cold-crush', 'Genexa', 'genexa-cold-crush.jpg');
assertExactCarton(
  'genexa-cough-chest-congestion',
  'Genexa',
  'genexa-cough-chest-congestion.jpg',
);
assertExactCarton(
  'genexa-daytime-severe-cold-flu',
  'Genexa',
  'genexa-daytime-severe-cold-flu.jpg',
);
assertExactCarton('genexa-flu-fix', 'Genexa', 'genexa-flu-fix.jpg');
assertExactCarton(
  'genexa-kids-cold-crush',
  'Genexa',
  'genexa-kids-cold-crush.jpg',
);
assertExactCarton(
  'genexa-kids-cough-chest-congestion-liquid',
  'Genexa',
  'genexa-kids-cough-chest-congestion-liquid.jpg',
);
assertExactCarton(
  'genexa-kids-honey-cough-syrup',
  'Genexa',
  'genexa-kids-honey-cough-syrup.jpg',
);
assertExactCarton(
  'genexa-kids-multi-cold-flu-liquid',
  'Genexa',
  'genexa-kids-multi-cold-flu-liquid.jpg',
);
assertExactCarton(
  'hylands-4kids-cold-n-cough',
  "Hyland's",
  'hylands-4kids-cold-n-cough.jpg',
);
assertExactCarton(
  'hylands-4kids-cold-n-cough-original',
  "Hyland's",
  'hylands-4kids-cold-n-cough-original.jpg',
);
assertExactCarton(
  'hylands-4kids-cold-n-cough-night-grape',
  "Hyland's",
  'hylands-4kids-cold-n-cough-night-grape.jpg',
);
assertExactCarton(
  'hylands-4kids-cold-n-cough-night-original',
  "Hyland's",
  'hylands-4kids-cold-n-cough-night-original.jpg',
);
assertExactCarton(
  'hylands-baby-mucus-cold-day',
  "Hyland's",
  'hylands-baby-mucus-cold-day.jpg',
);
assertExactCarton(
  'hylands-baby-tiny-cold-day',
  "Hyland's",
  'hylands-baby-tiny-cold-day.jpg',
);
assertExactCarton(
  'hylands-calc-fluor-6x',
  "Hyland's",
  'hylands-calc-fluor-6x.jpg',
);
assertExactCarton(
  'hylands-nat-mur-6x',
  "Hyland's",
  'hylands-nat-mur-6x.jpg',
);
assertExactCarton(
  'hylands-kids-cough-mucus-day',
  "Hyland's",
  'hylands-kids-cough-mucus-day.jpg',
);
assertExactCarton(
  'hylands-kids-cough-mucus-night',
  "Hyland's",
  'hylands-kids-cough-mucus-night.jpg',
);
assertExactCarton(
  'hylands-4kids-stuffy-nose-sinus',
  "Hyland's",
  'hylands-4kids-stuffy-nose-sinus.jpg',
);
assertExactCarton(
  'hylands-organic-baby-all-in-one-cough-day',
  "Hyland's",
  'hylands-organic-baby-all-in-one-cough-day.jpg',
);
assertExactCarton(
  'hylands-organic-baby-all-in-one-cough-night',
  "Hyland's",
  'hylands-organic-baby-all-in-one-cough-night.jpg',
);
assertExactCarton(
  'hylands-organic-baby-cough-immune-day',
  "Hyland's",
  'hylands-organic-baby-cough-immune-day.jpg',
);
assertExactCarton(
  'hylands-organic-baby-cough-immune-night',
  "Hyland's",
  'hylands-organic-baby-cough-immune-night.jpg',
);
assertExactCarton(
  'hylands-organic-kids-all-in-one-cough-day',
  "Hyland's",
  'hylands-organic-kids-all-in-one-cough-day.jpg',
);
assertExactCarton(
  'hylands-organic-kids-all-in-one-cough-night',
  "Hyland's",
  'hylands-organic-kids-all-in-one-cough-night.jpg',
);
assertExactCarton(
  'hylands-organic-kids-cough-immune-day',
  "Hyland's",
  'hylands-organic-kids-cough-immune-day.jpg',
);
assertExactCarton(
  'hylands-organic-kids-cough-immune-night',
  "Hyland's",
  'hylands-organic-kids-cough-immune-night.jpg',
);
assertExactCarton('mucinex-er-600', 'Mucinex', 'mucinex-er-600.jpg');
assertExactCarton(
  'mucinex-childrens-fever-sore-cough',
  'Mucinex',
  'mucinex-childrens-fever-sore-cough.jpg',
);
assertExactCarton(
  'mucinex-childrens-freefrom-stuffy',
  'Mucinex',
  'mucinex-childrens-freefrom-stuffy.jpg',
);
assertExactCarton(
  'mucinex-childrens-mighty-chews-cold-flu',
  'Mucinex',
  'mucinex-childrens-mighty-chews-cold-flu.jpg',
);
assertExactCarton(
  'mucinex-childrens-mighty-chews-cough',
  'Mucinex',
  'mucinex-childrens-mighty-chews-cough.jpg',
);
assertExactCarton(
  'mucinex-childrens-mighty-chews-night',
  'Mucinex',
  'mucinex-childrens-mighty-chews-night.jpg',
);
assertExactCarton('mucinex-dm-er', 'Mucinex', 'mucinex-dm-er.jpg');
assertExactCarton(
  'mucinex-fastmax-cold-flu-gels',
  'Mucinex',
  'mucinex-fastmax-cold-flu-gels.jpg',
);
assertExactCarton(
  'mucinex-fastmax-dm-max',
  'Mucinex',
  'mucinex-fastmax-dm-max.jpg',
);
assertExactCarton(
  'mucinex-sinusmax-severe-cong-pain',
  'Mucinex',
  'mucinex-sinusmax-severe-cong-pain.jpg',
);
assertExactCarton(
  'pediacare-cough-cold',
  'PediaCare',
  'pediacare-cough-cold.jpg',
);
assertExactCarton(
  'pediacare-cough-congestion',
  'PediaCare',
  'pediacare-cough-congestion.jpg',
);
assertExactCarton(
  'medinatura-reboost-cold-flu-zinc-lemon',
  'MediNatura',
  'medinatura-reboost-cold-flu-zinc-lemon.jpg',
);
assertExactCarton(
  'medinatura-reboost-sore-throat-spray-cherry',
  'MediNatura',
  'medinatura-reboost-sore-throat-spray-cherry.jpg',
);
assertExactCarton(
  'robitussin-dm-liquid',
  'Robitussin',
  'robitussin-dm-liquid.jpg',
);
assertExactCarton(
  'robitussin-coughgels',
  'Robitussin',
  'robitussin-coughgels.jpg',
);
assertExactCarton(
  'robitussin-dm-max-liquid',
  'Robitussin',
  'robitussin-dm-max-liquid.jpg',
);
assertExactCarton(
  'sambucol-original-syrup',
  'Sambucol',
  'sambucol-original-syrup.jpg',
);
assertExactCarton(
  'natures-way-sambucus-cold-flu-relief-chewables',
  "Nature's Way",
  'natures-way-sambucus-cold-flu-relief-chewables.jpg',
);
assertExactCarton(
  'natures-way-sambucus-cold-flu-relief-syrup',
  "Nature's Way",
  'natures-way-sambucus-cold-flu-relief-syrup.jpg',
);
assertExactCarton(
  'natures-way-sambucus-cough-immune-gummies',
  "Nature's Way",
  'natures-way-sambucus-cough-immune-gummies.jpg',
);
assertExactCarton(
  'natures-way-sambucus-flu-relief-syrup',
  "Nature's Way",
  'natures-way-sambucus-flu-relief-syrup.jpg',
);
assertExactCarton(
  'natures-way-sambucus-kids-cough-immune-gummies',
  "Nature's Way",
  'natures-way-sambucus-kids-cough-immune-gummies.jpg',
);
assertExactCarton(
  'fon-sinus-max',
  'Forces of Nature',
  'fon-sinus-max.jpg',
);
assertExactCarton(
  'sprouts-bronchial-syrup',
  'Sprouts',
  'sprouts-bronchial-syrup.jpg',
);
assertExactCarton(
  'sprouts-ginger-wild-cherry-bronchial',
  'Sprouts',
  'sprouts-ginger-wild-cherry-bronchial.jpg',
);
assertExactCarton(
  'sprouts-original-herb-lozenges',
  'Sprouts',
  'sprouts-original-herb-lozenges.jpg',
);
assertExactCarton(
  'sudafed-pe-sinus-congestion',
  'Sudafed',
  'sudafed-pe-sinus-congestion.jpg',
);
assertExactCarton('sudafed-12hr', 'Sudafed', 'sudafed-12hr.jpg');
assertExactCarton(
  'umcka-fastactives-berry',
  "Nature's Way",
  'umcka-fastactives-berry.jpg',
);
assertExactCarton(
  'umcka-menthol-syrup',
  "Nature's Way",
  'umcka-menthol-syrup.jpg',
);
assertExactCarton(
  'umcka-cold-flu-elderberry-syrup',
  "Nature's Way",
  'umcka-cold-flu-elderberry-syrup.jpg',
);
assertExactCarton(
  'umcka-cold-flu-relief-syrup',
  "Nature's Way",
  'umcka-cold-flu-relief-syrup.jpg',
);
assertExactCarton(
  'umcka-cold-relief-chewables',
  "Nature's Way",
  'umcka-cold-relief-chewables.jpg',
);
assertExactCarton(
  'umcka-cold-relief-drops',
  "Nature's Way",
  'umcka-cold-relief-drops.jpg',
);
assertExactCarton(
  'umcka-cold-relief-syrup',
  "Nature's Way",
  'umcka-cold-relief-syrup.jpg',
);
assertExactCarton(
  'umcka-cough-relief-syrup',
  "Nature's Way",
  'umcka-cough-relief-syrup.jpg',
);
assertExactCarton(
  'umcka-kids-cold-relief-chewables',
  "Nature's Way",
  'umcka-kids-cold-relief-chewables.jpg',
);
assertExactCarton(
  'umcka-kids-cold-relief-syrup',
  "Nature's Way",
  'umcka-kids-cold-relief-syrup.jpg',
);
assertExactCarton(
  'umcka-zero-sugar-cold-relief-syrup',
  "Nature's Way",
  'umcka-zero-sugar-cold-relief-syrup.jpg',
);
assertExactCarton('now-alphasorb-c-500-180', 'NOW', 'now-alphasorb-c-500-180.jpg');
assertExactCarton(
  'now-buffered-c-1000-complex-180',
  'NOW',
  'now-buffered-c-1000-complex-180.jpg',
);
assertExactCarton(
  'now-c-1000-with-rose-hips-100',
  'NOW',
  'now-c-1000-with-rose-hips-100.jpg',
);
assertExactCarton('now-c-1000-100', 'NOW', 'now-c-1000-100.jpg');
assertExactCarton('now-c-1000-250', 'NOW', 'now-c-1000-250.jpg');
assertExactCarton(
  'now-c-1000-250-733739006820',
  'NOW',
  'now-c-1000-250-733739006820.jpg',
);
assertExactCarton('now-c-1000-500', 'NOW', 'now-c-1000-500.jpg');
assertExactCarton(
  'now-c-500-with-rose-hips-250',
  'NOW',
  'now-c-500-with-rose-hips-250.jpg',
);
assertExactCarton(
  'now-c-500-calcium-ascorbate-c-250',
  'NOW',
  'now-c-500-calcium-ascorbate-c-250.jpg',
);
assertExactCarton(
  'now-chewable-c-500-cherry-100',
  'NOW',
  'now-chewable-c-500-cherry-100.jpg',
);
assertExactCarton(
  'now-l-lysine-100-733739001139',
  'NOW',
  'now-l-lysine-100-733739001139.jpg',
);
assertExactCarton(
  'now-l-lysine-250-733739001238',
  'NOW',
  'now-l-lysine-250-733739001238.jpg',
);
assertExactCarton(
  'now-l-lysine-250-733739001023',
  'NOW',
  'now-l-lysine-250-733739001023.jpg',
);
assertExactCarton('now-l-lysine-500-mg-250', 'NOW', 'now-l-lysine-500-mg-250.jpg');
assertExactCarton('now-oralbiotic-60', 'NOW', 'now-oralbiotic-60.jpg');
assertExactCarton('now-oregano-oil-90', 'NOW', 'now-oregano-oil-90.jpg');
assertExactCarton('now-zinc-glycinate-120', 'NOW', 'now-zinc-glycinate-120.jpg');
assertExactCarton(
  'now-zinc-picolinate-50-mg-120',
  'NOW',
  'now-zinc-picolinate-50-mg-120.jpg',
);
assertExactCarton('now-zinc-250', 'NOW', 'now-zinc-250.jpg');
assertBrandMark(
  'now-acerola-4-1-extract-powder-6',
  'NOW',
  'now-mark.png',
);
assertBrandMark('now-oregano-450-mg-100', 'NOW', 'now-mark.png');
assertBrandMark('nyquil-cold-flu-liquid', 'Vicks', 'vicks-mark.png');
assertExactCarton(
  'allegra-allergy-24hr',
  'Allegra',
  'allegra-allergy-24hr.jpg',
);
assertExactCarton('allegra-d-24hr', 'Allegra', 'allegra-d-24hr.jpg');
assertExactCarton(
  'fon-allergy-max',
  'Forces of Nature',
  'fon-allergy-max.jpg',
);
assertExactCarton(
  'natures-way-alleraide',
  "Nature's Way",
  'natures-way-alleraide.jpg',
);
assertExactCarton(
  'beekeepers-nasal-spray',
  "Beekeeper's Naturals",
  'beekeepers-nasal-spray.jpg',
);
assertExactCarton(
  'benadryl-liqui-gels',
  'Benadryl',
  'benadryl-liqui-gels.jpg',
);
assertExactCarton(
  'benadryl-ultratabs',
  'Benadryl',
  'benadryl-ultratabs.jpg',
);
assertExactCarton(
  'boiron-allergycalm-pellets',
  'Boiron',
  'boiron-allergycalm-pellets.jpg',
);
assertExactCarton(
  'boiron-allergycalm-meltaways',
  'Boiron',
  'boiron-allergycalm-meltaways.jpg',
);
assertExactCarton(
  'boiron-sinuscalm-allergy-tablets',
  'Boiron',
  'boiron-sinuscalm-allergy-tablets.jpg',
);
assertExactCarton(
  'childrens-allegra-liquid',
  'Allegra',
  'childrens-allegra-liquid.jpg',
);
assertExactCarton(
  'childrens-allegra-odt',
  'Allegra',
  'childrens-allegra-odt.jpg',
);
assertExactCarton(
  'childrens-benadryl-allergy-liquid',
  'Benadryl',
  'childrens-benadryl-allergy-liquid.jpg',
);
assertExactCarton(
  'childrens-benadryl-allergy-plus-congestion',
  'Benadryl',
  'childrens-benadryl-allergy-plus-congestion.jpg',
);
assertExactCarton(
  'childrens-benadryl-dyefree-liquid',
  'Benadryl',
  'childrens-benadryl-dyefree-liquid.jpg',
);
assertExactCarton(
  'childrens-flonase-allergy-relief',
  'Flonase',
  'childrens-flonase-allergy-relief.jpg',
);
assertExactCarton(
  'childrens-zyrtec-liquid',
  'Zyrtec',
  'childrens-zyrtec-liquid.jpg',
);
assertExactCarton(
  'childrens-zyrtec-chewable',
  'Zyrtec',
  'childrens-zyrtec-chewable.jpg',
);
assertExactCarton(
  'childrens-zyrtec-dissolve',
  'Zyrtec',
  'childrens-zyrtec-dissolve.jpg',
);
assertExactCarton(
  'clear-eyes-redness-relief',
  'Clear Eyes',
  'clear-eyes-redness-relief.jpg',
);
assertExactCarton(
  'medinatura-bhi-allergy',
  'MediNatura',
  'medinatura-bhi-allergy.jpg',
);
assertExactCarton(
  'medinatura-clearlife-allergy-tablets',
  'MediNatura',
  'medinatura-clearlife-allergy-tablets.jpg',
);
assertExactCarton(
  'dg-health-loratadine-tablets',
  'DG Health',
  'dg-health-loratadine-tablets.jpg',
);
assertExactCarton(
  'dg-health-fluticasone-nasal',
  'DG Health',
  'dg-health-fluticasone-nasal.jpg',
);
assertExactCarton(
  'dg-health-loratadine-odt',
  'DG Health',
  'dg-health-loratadine-odt.jpg',
);
assertExactCarton(
  'dg-health-childrens-loratadine-chew',
  'DG Health',
  'dg-health-childrens-loratadine-chew.jpg',
);
assertBrandMark(
  'boiron-ambrosiaartemisiaefolia-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-arundomauritanica-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-euphrasia-officinalis-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-galphimia-glauca-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-histaminum-hydrochloricum-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-luffaoperculata-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-sabadilla-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-solidagovirgaurea-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertBrandMark(
  'boiron-wyethiahelenioides-pellets',
  'Boiron',
  'boiron-mark.png',
);
assertExactCarton(
  'natures-way-eyebright',
  "Nature's Way",
  'natures-way-eyebright.jpg',
);
assertExactCarton(
  'natures-way-herbal-eyebright',
  "Nature's Way",
  'natures-way-herbal-eyebright.jpg',
);
assertExactCarton(
  'flonase-allergy-relief',
  'Flonase',
  'flonase-allergy-relief.jpg',
);
assertExactCarton('flonase-sensimist', 'Flonase', 'flonase-sensimist.jpg');
assertExactCarton(
  'genexa-allergy-care',
  'Genexa',
  'genexa-allergy-care.jpg',
);
assertExactCarton(
  'genexa-kids-allergy-dph-liquid',
  'Genexa',
  'genexa-kids-allergy-dph-liquid.jpg',
);
assertExactCarton(
  'genexa-kids-allergy-care',
  'Genexa',
  'genexa-kids-allergy-care.jpg',
);
assertExactCarton(
  'ollois-histaminum-30c',
  'Ollois',
  'ollois-histaminum-30c.jpg',
);
assertBrandMark(
  'family-wellness-loratadine-10',
  'Family Wellness',
  'family-wellness-mark.png',
);
assertBrandMark(
  'family-wellness-cetirizine-tablets',
  'Family Wellness',
  'family-wellness-mark.png',
);
// Pain & Fever daytime photo run — exact US 3D packshots (40).
assertExactCarton('aleve-arthritis-pain-gel', 'Aleve', 'aleve-arthritis-pain-gel.jpg');
assertExactCarton('aleve-back-muscle-pain', 'Aleve', 'aleve-back-muscle-pain.jpg');
assertExactCarton('aleve-gelcaps', 'Aleve', 'aleve-gelcaps.jpg');
assertExactCarton('aleve-headache-pain', 'Aleve', 'aleve-headache-pain.jpg');
assertExactCarton('aleve-liquid-gels', 'Aleve', 'aleve-liquid-gels.jpg');
assertExactCarton(
  'alevex-pain-relieving-lotion-roll-on',
  'Aleve',
  'alevex-pain-relieving-lotion-roll-on.jpg',
);
assertExactCarton(
  'alevex-pain-relieving-lotion-tube',
  'Aleve',
  'alevex-pain-relieving-lotion-tube.jpg',
);
assertExactCarton(
  'alevex-pain-relieving-spray',
  'Aleve',
  'alevex-pain-relieving-spray.jpg',
);
assertExactCarton('bayer-chewable-81-cherry', 'Bayer', 'bayer-chewable-81-cherry.jpg');
assertExactCarton('bayer-chewable-81-orange', 'Bayer', 'bayer-chewable-81-orange.jpg');
assertExactCarton('flexall-max-strength-gel', 'Flexall', 'flexall-max-strength-gel.jpg');
assertExactCarton('genuine-bayer-aspirin-325', 'Bayer', 'genuine-bayer-aspirin-325.jpg');
assertExactCarton('midol-complete', 'Midol', 'midol-complete.jpg');
assertExactCarton(
  'amazon-basic-care-apap-650-er-l544',
  'Amazon Basic Care',
  'amazon-basic-care-apap-650-er-l544.jpg',
);
assertExactCarton(
  'aplus-health-dual-action-oxides',
  'A+Health',
  'aplus-health-dual-action-oxides.jpg',
);
assertExactCarton(
  'healtha2z-ibuprofen-200-382',
  'HealthA2Z',
  'healtha2z-ibuprofen-200-382.jpg',
);
assertExactCarton(
  'amazon-basic-care-ibuprofen-iron-oxide-yellow',
  'Amazon Basic Care',
  'amazon-basic-care-ibuprofen-iron-oxide-yellow.jpg',
);
assertExactCarton(
  'healthwise-lidocaine-4-patch',
  'HealthWise',
  'healthwise-lidocaine-4-patch.jpg',
);
assertExactCarton('upup-es-red40-tio2', 'up&up', 'upup-es-red40-tio2.jpg');
assertExactCarton(
  'welmate-lidocaine-4-patch-ethylhexyl',
  'WELMATE',
  'welmate-lidocaine-4-patch-ethylhexyl.jpg',
);
assertExactCarton(
  'upup-children-ibu-chew-dyed',
  'up&up',
  'upup-children-ibu-chew-dyed.jpg',
);
assertExactCarton(
  'upup-infants-apap-dyefree',
  'up&up',
  'upup-infants-apap-dyefree.jpg',
);
assertExactCarton(
  'upup-infants-ibu-dyefree',
  'up&up',
  'upup-infants-ibu-dyefree.jpg',
);
assertExactCarton('absorbine-jr-pro-spray', 'Absorbine Jr.', 'absorbine-jr-pro-spray.jpg');
assertExactCarton(
  'absorbine-jr-plus-ultra-patch',
  'Absorbine Jr.',
  'absorbine-jr-plus-ultra-patch.jpg',
);
assertExactCarton(
  'absorbine-jr-xl-back-patch',
  'Absorbine Jr.',
  'absorbine-jr-xl-back-patch.jpg',
);
assertExactCarton('biofreeze-foam', 'Biofreeze', 'biofreeze-foam.jpg');
assertExactCarton('biofreeze-foot-cream', 'Biofreeze', 'biofreeze-foot-cream.jpg');
assertExactCarton(
  'tiger-balm-active-muscle-rub',
  'Tiger Balm',
  'tiger-balm-active-muscle-rub.jpg',
);
assertExactCarton(
  'tiger-balm-active-muscle-gel',
  'Tiger Balm',
  'tiger-balm-active-muscle-gel.jpg',
);
assertExactCarton(
  'icy-hot-vanishing-scent-gel',
  'Icy Hot',
  'icy-hot-vanishing-scent-gel.jpg',
);
assertExactCarton('motrin-arthritis-pain-gel', 'Motrin', 'motrin-arthritis-pain-gel.jpg');
assertExactCarton(
  'biofreeze-professional-colorless-gel-5',
  'Biofreeze',
  'biofreeze-professional-colorless-gel-5.jpg',
);
assertExactCarton(
  'biofreeze-precision-relief-pen',
  'Biofreeze',
  'biofreeze-precision-relief-pen.jpg',
);
assertExactCarton(
  'biofreeze-overnight-relief-cream',
  'Biofreeze',
  'biofreeze-overnight-relief-cream.jpg',
);
assertExactCarton(
  'biofreeze-flexible-relief-strip',
  'Biofreeze',
  'biofreeze-flexible-relief-strip.jpg',
);
assertExactCarton(
  'tiger-balm-pain-relieving-patch-regular-hydrogel',
  'Tiger Balm',
  'tiger-balm-pain-relieving-patch-regular-hydrogel.jpg',
);
assertExactCarton(
  'aspercreme-lidocaine-xl-patch',
  'Aspercreme',
  'aspercreme-lidocaine-xl-patch.jpg',
);
assertExactCarton(
  'biofreeze-professional-colorless-roll-on-5',
  'Biofreeze',
  'biofreeze-professional-colorless-roll-on-5.jpg',
);
assertExactCarton(
  'aspercreme-lidocaine-rosemary-mint',
  'Aspercreme',
  'aspercreme-lidocaine-rosemary-mint.jpg',
);
assertExactCarton(
  'aspercreme-lidocaine-no-mess-lavender',
  'Aspercreme',
  'aspercreme-lidocaine-no-mess-lavender.jpg',
);
assertExactCarton(
  'biofreeze-professional-spray-10-5',
  'Biofreeze',
  'biofreeze-professional-spray-10-5.jpg',
);
assertExactCarton(
  'biofreeze-pain-relief-spray-10-5',
  'Biofreeze',
  'biofreeze-pain-relief-spray-10-5.jpg',
);
assertExactCarton(
  'bt-cough-bronchial-daytime',
  'Boericke & Tafel',
  'bt-cough-bronchial-daytime.jpg',
);
assertExactCarton(
  'bt-cough-bronchial-nighttime',
  'Boericke & Tafel',
  'bt-cough-bronchial-nighttime.jpg',
);
assertExactCarton(
  'badger-aromatic-chest-rub',
  'Badger',
  'badger-aromatic-chest-rub.jpg',
);
assertExactCarton(
  'beekeepers-propolis-throat-spray',
  "Beekeeper's Naturals",
  'beekeepers-propolis-throat-spray.jpg',
);
assertExactCarton(
  'medinatura-bhi-flu-cold',
  'MediNatura',
  'medinatura-bhi-flu-cold.jpg',
);
assertExactCarton(
  'medinatura-bhi-mucus',
  'MediNatura',
  'medinatura-bhi-mucus.jpg',
);
assertExactCarton(
  'medinatura-bhi-sinus-congestion',
  'MediNatura',
  'medinatura-bhi-sinus-congestion.jpg',
);
assertExactCarton(
  'boiron-aconitum-napellus-pellets',
  'Boiron',
  'boiron-aconitum-napellus-pellets.jpg',
);
assertExactCarton(
  'boiron-allium-cepa-pellets',
  'Boiron',
  'boiron-allium-cepa-pellets.jpg',
);
assertExactCarton(
  'boiron-alliumsativum-pellets',
  'Boiron',
  'boiron-alliumsativum-pellets.jpg',
);
assertExactCarton(
  'boiron-antimonium-tartaricum-pellets',
  'Boiron',
  'boiron-antimonium-tartaricum-pellets.jpg',
);
assertExactCarton(
  'boiron-baptisiatinctoria-pellets',
  'Boiron',
  'boiron-baptisiatinctoria-pellets.jpg',
);
assertExactCarton(
  'boiron-bryonia-pellets',
  'Boiron',
  'boiron-bryonia-pellets.jpg',
);
assertExactCarton(
  'boiron-causticum-pellets',
  'Boiron',
  'boiron-causticum-pellets.jpg',
);
assertExactCarton(
  'boiron-chestal-cold-cough-pellets',
  'Boiron',
  'boiron-chestal-cold-cough-pellets.jpg',
);
assertExactCarton(
  'boiron-chestal-cold-cough-tablets',
  'Boiron',
  'boiron-chestal-cold-cough-tablets.jpg',
);
assertExactCarton(
  'boiron-chestal-cough-mucus-tablets',
  'Boiron',
  'boiron-chestal-cough-mucus-tablets.jpg',
);
assertExactCarton(
  'chestal-adult-honey',
  'Boiron',
  'chestal-adult-honey.jpg',
);
assertExactCarton(
  'boiron-chestal-kids-honey',
  'Boiron',
  'boiron-chestal-kids-honey.jpg',
);
assertExactCarton(
  'boiron-chestal-kids-pellets',
  'Boiron',
  'boiron-chestal-kids-pellets.jpg',
);
assertExactCarton(
  'boiron-chestal-kids-dry-cough-pellets',
  'Boiron',
  'boiron-chestal-kids-dry-cough-pellets.jpg',
);
assertExactCarton(
  'boiron-chestal-kids-original',
  'Boiron',
  'boiron-chestal-kids-original.jpg',
);
assertExactCarton(
  'boiron-chestal-meltaway-pellets',
  'Boiron',
  'boiron-chestal-meltaway-pellets.jpg',
);
assertExactCarton(
  'boiron-chestal-original',
  'Boiron',
  'boiron-chestal-original.jpg',
);
assertExactCarton(
  'boiron-coccuscacti-pellets',
  'Boiron',
  'boiron-coccuscacti-pellets.jpg',
);
assertExactCarton(
  'boiron-coldcalm-baby',
  'Boiron',
  'boiron-coldcalm-baby.jpg',
);
assertExactCarton(
  'boiron-coldcalm-kids-liquid',
  'Boiron',
  'boiron-coldcalm-kids-liquid.jpg',
);
assertExactCarton(
  'boiron-coldcalm-meltaways',
  'Boiron',
  'boiron-coldcalm-meltaways.jpg',
);
assertExactCarton(
  'boiron-coldcalm-pellets',
  'Boiron',
  'boiron-coldcalm-pellets.jpg',
);
assertExactCarton(
  'boiron-drosera-pellets',
  'Boiron',
  'boiron-drosera-pellets.jpg',
);
assertExactCarton(
  'boiron-dulcamara-pellets',
  'Boiron',
  'boiron-dulcamara-pellets.jpg',
);
assertExactCarton(
  'boiron-eucalyptusglobulus-pellets',
  'Boiron',
  'boiron-eucalyptusglobulus-pellets.jpg',
);
assertExactCarton(
  'boiron-eupatorium-perfoliatum-pellets',
  'Boiron',
  'boiron-eupatorium-perfoliatum-pellets.jpg',
);
assertExactCarton(
  'boiron-ferrum-phosphoricum-pellets',
  'Boiron',
  'boiron-ferrum-phosphoricum-pellets.jpg',
);
assertExactCarton(
  'boiron-gelsemium-sempervirens-pellets',
  'Boiron',
  'boiron-gelsemium-sempervirens-pellets.jpg',
);
assertExactCarton(
  'boiron-grindelia-pellets',
  'Boiron',
  'boiron-grindelia-pellets.jpg',
);
assertExactCarton(
  'boiron-hepar-sulphuris-calcareum-pellets',
  'Boiron',
  'boiron-hepar-sulphuris-calcareum-pellets.jpg',
);
assertExactCarton(
  'boiron-hydrastis-canadensis-pellets',
  'Boiron',
  'boiron-hydrastis-canadensis-pellets.jpg',
);
assertExactCarton(
  'boiron-ipecacuanha-pellets',
  'Boiron',
  'boiron-ipecacuanha-pellets.jpg',
);
assertExactCarton(
  'boiron-kali-bichromicum-pellets',
  'Boiron',
  'boiron-kali-bichromicum-pellets.jpg',
);
assertExactCarton(
  'boiron-kali-muriaticum-pellets',
  'Boiron',
  'boiron-kali-muriaticum-pellets.jpg',
);
assertExactCarton(
  'boiron-kali-sulphuricum-pellets',
  'Boiron',
  'boiron-kali-sulphuricum-pellets.jpg',
);
assertExactCarton(
  'oscillococcinum',
  'Boiron',
  'oscillococcinum.jpg',
);
assertExactCarton(
  'boiron-phosphorus-pellets',
  'Boiron',
  'boiron-phosphorus-pellets.jpg',
);
assertExactCarton(
  'boiron-phytolacca-decandra-pellets',
  'Boiron',
  'boiron-phytolacca-decandra-pellets.jpg',
);
assertExactCarton(
  'boiron-pulsatilla-pellets',
  'Boiron',
  'boiron-pulsatilla-pellets.jpg',
);
assertExactCarton(
  'boiron-rumex-crispus-pellets',
  'Boiron',
  'boiron-rumex-crispus-pellets.jpg',
);
assertExactCarton(
  'boiron-sambucus-nigra-6c-cough-cold-relief-pellets',
  'Boiron',
  'boiron-sambucus-nigra-6c-cough-cold-relief-pellets.jpg',
);
assertExactCarton(
  'boiron-sambucusnigra-pellets',
  'Boiron',
  'boiron-sambucusnigra-pellets.jpg',
);
assertExactCarton(
  'boiron-scillamaritima-pellets',
  'Boiron',
  'boiron-scillamaritima-pellets.jpg',
);
assertExactCarton(
  'boiron-senegaofficinalis-pellets',
  'Boiron',
  'boiron-senegaofficinalis-pellets.jpg',
);
assertExactCarton(
  'boiron-sinuscalm-pellets',
  'Boiron',
  'boiron-sinuscalm-pellets.jpg',
);
assertExactCarton(
  'boiron-sinuscalm-tablets',
  'Boiron',
  'boiron-sinuscalm-tablets.jpg',
);
assertExactCarton(
  'boiron-spongia-tosta-pellets',
  'Boiron',
  'boiron-spongia-tosta-pellets.jpg',
);
assertExactCarton(
  'boiron-stictapulmonaria-pellets',
  'Boiron',
  'boiron-stictapulmonaria-pellets.jpg',
);
assertExactCarton(
  'boiron-throatcalm-pellets',
  'Boiron',
  'boiron-throatcalm-pellets.jpg',
);
assertExactCarton(
  'boiron-throatcalm-spray',
  'Boiron',
  'boiron-throatcalm-spray.jpg',
);
assertExactCarton(
  'boiron-throatcalm-tablets',
  'Boiron',
  'boiron-throatcalm-tablets.jpg',
);
assertExactCarton(
  'boiron-verbascumthapsus-pellets',
  'Boiron',
  'boiron-verbascumthapsus-pellets.jpg',
);
assertExactCarton(
  'boiron-voicecalm-tablets',
  'Boiron',
  'boiron-voicecalm-tablets.jpg',
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
assertExactCarton(
  'nutricost-melatonin-capsules-240-tablets',
  'Nutricost',
  'nutricost-melatonin-capsules-240-tablets.jpg',
);
assertExactCarton(
  'nutricost-sleep-aid-complex-capsules-90-capsules',
  'Nutricost',
  'nutricost-sleep-aid-complex-capsules-90-capsules.jpg',
);
assertExactCarton(
  'nutricost-melatonin-tablets-240-tablets',
  'Nutricost',
  'nutricost-melatonin-tablets-240-tablets.jpg',
);
assertExactCarton(
  'nutricost-melatonin-tablets-5mg-240-tablets',
  'Nutricost',
  'nutricost-melatonin-tablets-5mg-240-tablets.jpg',
);
assertExactCarton(
  'nutricost-melatonin-tablets-3mg-240-tablets',
  'Nutricost',
  'nutricost-melatonin-tablets-3mg-240-tablets.jpg',
);
assertExactCarton(
  'nutricost-melatonin-extended-release-capsules-5mg-240-capsules',
  'Nutricost',
  'nutricost-melatonin-extended-release-capsules-5mg-240-capsules.jpg',
);
assertExactCarton(
  'nutricost-b79-chamomile-240-capsules',
  'Nutricost',
  'nutricost-b79-chamomile-240-capsules.jpg',
);
assertExactCarton(
  'nutricost-b80-suntheanine-60-capsules',
  'Nutricost',
  'nutricost-b80-suntheanine-60-capsules.jpg',
);
assertExactCarton(
  'nutricost-b80-l-tryptophan-120-capsules',
  'Nutricost',
  'nutricost-b80-l-tryptophan-120-capsules.jpg',
);
assertExactCarton(
  'naturewise-b82-melatonin',
  'NatureWise',
  'naturewise-b82-melatonin.jpg',
);
assertExactCarton(
  'naturewise-b82-melatonin-10-mg-100-count',
  'NatureWise',
  'naturewise-b82-melatonin-10-mg-100-count.jpg',
);
assertExactCarton(
  'naturewise-b85-sleep-complex',
  'NatureWise',
  'naturewise-b85-sleep-complex.jpg',
);
assertExactCarton(
  'naturewise-b85-magnesium-stress-sleep',
  'NatureWise',
  'naturewise-b85-magnesium-stress-sleep.jpg',
);
assertExactCarton(
  'welmate-b87-doxylamine',
  'WELMATE',
  'welmate-b87-doxylamine.jpg',
);
assertExactCarton(
  'welmate-b87-doxylamine-100',
  'WELMATE',
  'welmate-b87-doxylamine-100.jpg',
);
assertExactCarton(
  'sambucol-cold-flu-relief-homeopathic',
  'Sambucol',
  'sambucol-cold-flu-relief-homeopathic.jpg',
);
assertExactCarton(
  'cold-eeze-lozenge-classic',
  'Cold-EEZE',
  'cold-eeze-lozenge-classic.jpg',
);
assertExactCarton('airborne-chewable', 'Airborne', 'airborne-chewable.jpg');
assertExactCarton('airborne-gummies', 'Airborne', 'airborne-gummies.jpg');
assertExactCarton(
  'emergenc-super-orange',
  'Emergen-C',
  'emergenc-super-orange.jpg',
);
assertExactCarton(
  'sovereign-silver-hydrosol',
  'Sovereign Silver',
  'sovereign-silver-hydrosol.jpg',
);
assertExactCarton(
  'zarbees-kids-immune-syrup',
  "Zarbee's",
  'zarbees-kids-immune-syrup.jpg',
);
assertExactCarton(
  'zarbees-kids-immune-gummies',
  "Zarbee's",
  'zarbees-kids-immune-gummies.jpg',
);
assertExactCarton(
  'sambucol-elderberry-gummies',
  'Sambucol',
  'sambucol-elderberry-gummies.jpg',
);
assertExactCarton(
  'cold-eeze-lozenge-acek',
  'Cold-EEZE',
  'cold-eeze-lozenge-acek.jpg',
);
assertExactCarton(
  'cold-eeze-ultramelt-dyed',
  'Cold-EEZE',
  'cold-eeze-ultramelt-dyed.jpg',
);
assertExactCarton(
  'zicam-rapidmelts-dyed',
  'Zicam',
  'zicam-rapidmelts-dyed.jpg',
);
assertExactCarton(
  'zicam-ultra-rapidmelts',
  'Zicam',
  'zicam-ultra-rapidmelts.jpg',
);
assertExactCarton(
  '365-elderberry-gummies',
  '365 Whole Foods Market',
  '365-elderberry-gummies.jpg',
);
assertExactCarton(
  'we-heart-wholesome-immunity',
  'We Heart Nutrition',
  'we-heart-wholesome-immunity.jpg',
);
assertBrandMark(
  'natures-way-sambucus-kids-gummies-coconut',
  "Nature's Way",
  'natures-way-mark.png',
);
assertBrandMark(
  'natures-way-sambucus-kids-gummies-veg-oil',
  "Nature's Way",
  'natures-way-mark.png',
);
assertBrandMark(
  'source-naturals-wellness-formula-tabs',
  'Source Naturals',
  'source-naturals-mark.png',
);
assertBrandMark(
  'source-naturals-wellness-formula-caps',
  'Source Naturals',
  'source-naturals-mark.png',
);
assertBrandMark('megafood-complex-c', 'MegaFood', 'megafood-mark.png');
assertBrandMark('megafood-ultra-c-400', 'MegaFood', 'megafood-mark.png');
assertBrandMark('megafood-vitamin-d3-1000', 'MegaFood', 'megafood-mark.png');
assertBrandMark('megafood-vitamin-d3-2000', 'MegaFood', 'megafood-mark.png');
assertBrandMark('megafood-c-defense-gummies', 'MegaFood', 'megafood-mark.png');
assertBrandMark(
  'megafood-vitamin-d3-5000-k-k2',
  'MegaFood',
  'megafood-mark.png',
);
assertBrandMark(
  'megafood-turmeric-whole-body-minis',
  'MegaFood',
  'megafood-mark.png',
);
assertExactCarton(
  'megafood-zinc-bisglycinate',
  'MegaFood',
  'megafood-zinc-bisglycinate.jpg',
);
assertExactCarton(
  'megafood-selenium-tablet',
  'MegaFood',
  'megafood-selenium-tablet.jpg',
);
assertExactCarton(
  'megafood-liposomal-glutathione',
  'MegaFood',
  'megafood-liposomal-glutathione.jpg',
);
assertExactCarton(
  'megafood-quercetin-bromelain',
  'MegaFood',
  'megafood-quercetin-bromelain.jpg',
);
assertExactCarton('megafood-nac', 'MegaFood', 'megafood-nac.jpg');
assertExactCarton(
  'megafood-sea-moss-complex',
  'MegaFood',
  'megafood-sea-moss-complex.jpg',
);
assertExactCarton(
  'megafood-vitamin-d3-k2-5000-gummies',
  'MegaFood',
  'megafood-vitamin-d3-k2-5000-gummies.jpg',
);
assertExactCarton(
  'megafood-elderberry-immune-gummies',
  'MegaFood',
  'megafood-elderberry-immune-gummies.jpg',
);
assertExactCarton(
  'megafood-d3-2000-gummies',
  'MegaFood',
  'megafood-d3-2000-gummies.jpg',
);
assertExactCarton(
  'megafood-high-absorption-selenium-capsules',
  'MegaFood',
  'megafood-high-absorption-selenium-capsules.jpg',
);
assertExactCarton(
  'megafood-liposomal-vitamin-c',
  'MegaFood',
  'megafood-liposomal-vitamin-c.jpg',
);
assertExactCarton(
  'megafood-turmeric-extra-strength-joint',
  'MegaFood',
  'megafood-turmeric-extra-strength-joint.jpg',
);
assertExactCarton(
  'megafood-turmeric-extra-strength-liver',
  'MegaFood',
  'megafood-turmeric-extra-strength-liver.jpg',
);
assertExactCarton(
  'genexa-infants-daytime-cough-immune',
  'Genexa',
  'genexa-infants-daytime-cough-immune.jpg',
);
{
  const twelveMg = previewOverlayImage({
    id: 'nutricost-melatonin-tablets-240-tablets',
    formulaId: 'nutricost-melatonin-capsules-240-tablets',
    brand: 'Nutricost',
  });
  if (
    !twelveMg?.url.endsWith('/nutricost-melatonin-tablets-240-tablets.jpg') ||
    !twelveMg.verifiedSku
  ) {
    throw new Error('12 mg melatonin tablets must not inherit the 3 mg carton');
  }
  const tenMg = previewOverlayImage({
    id: 'naturewise-b82-melatonin-10-mg-100-count',
    formulaId: 'naturewise-b82-melatonin',
    brand: 'NatureWise',
  });
  if (
    !tenMg?.url.endsWith('/naturewise-b82-melatonin-10-mg-100-count.jpg') ||
    !tenMg.verifiedSku
  ) {
    throw new Error('NatureWise 10 mg melatonin must not inherit the 5 mg carton');
  }
  const welmate100 = previewOverlayImage({
    id: 'welmate-b87-doxylamine-100',
    formulaId: 'welmate-b87-doxylamine',
    brand: 'WELMATE',
  });
  if (
    !welmate100?.url.endsWith('/welmate-b87-doxylamine-100.jpg') ||
    !welmate100.verifiedSku
  ) {
    throw new Error('WELMATE 100-count must not inherit the 200-count carton');
  }
}
assertLetterOnly(
  'nutricost-dong-quai-capsules-120-capsules',
  'Nutricost',
);
assertLetterOnly('nutricost-sage-extract-120-capsules', 'Nutricost');

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

{
  const absorbineProCream = findDraftRecord('absorbine-jr-pro-cream');
  if (!absorbineProCream || absorbineProCream.verdict !== 'avoid') {
    throw new Error('absorbine-jr-pro-cream must stay verdict avoid');
  }
  if (!isDumpHonestNote(absorbineProCream.honestNote)) {
    throw new Error('absorbine-jr-pro-cream draft Honest stays the founder-lock dump');
  }
  const absorbineDisplay = displayHonestNote(absorbineProCream);
  if (/FOUNDER-LOCK|standalone Caution|cetearyl|glyceryl stearate/i.test(absorbineDisplay)) {
    throw new Error('absorbine-jr-pro-cream Honest display must not be the inactive dump');
  }
  if (!/methylparaben/i.test(absorbineDisplay)) {
    throw new Error('absorbine-jr-pro-cream Honest display must name methylparaben');
  }
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
const SEARCH_IMMUNE_LABEL = 'Immune Support';
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
  if (lowered === 'immune' || lowered === 'immune support') return SEARCH_IMMUNE_LABEL;
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
  const lowered = category.trim().toLowerCase();
  if (category === SEARCH_ALLERGIES_LABEL) {
    return record.category === 'Allergy' || record.category === 'Allergies';
  }
  if (lowered === 'immune' || lowered === 'immune support') {
    const raw = (record.category ?? '').trim().toLowerCase();
    return raw === 'immune' || raw === 'immune support';
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
    if (lowered === 'immune' || lowered === 'immune support') {
      names.add(SEARCH_IMMUNE_LABEL);
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

export const PENDING_DAILYMED_REVIEW = 'Pending DailyMed review';

function isIngredientReviewed(ingredient: IngredientFlag): boolean {
  const source = (ingredient.source ?? '').trim();
  if (!source) return false;
  const lower = source.toLowerCase();
  if (lower.includes('not in methodology') || lower.includes('ungraded')) return false;
  return true;
}

function reviewedWhyFallback(ingredient: IngredientFlag): string {
  if (ingredient.riskLevel === 'cleared') {
    return 'Reviewed on this label. It stayed Clean — no High or Caution flag on this token.';
  }
  if (ingredient.riskLevel === 'limited') {
    return 'Limited extra. Fact: it is an opacity or volume listing. It does not make a product Not clean by itself.';
  }
  if (ingredient.riskLevel === 'moderate') {
    return 'Moderate extra. Cleaner formulas leave it out. That is a fact about the listing, not a claim it is unsafe.';
  }
  return 'High-list extra. Cleaner formulas exclude it.';
}

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

  if (name.includes('paraben') || source.includes('paraben')) {
    return 'Paraben preservative. We score this family High in every form, including creams and patches. Cleaner formulas exclude it.';
  }

  if (
    name.includes('titanium dioxide')
    || source.includes('titanium dioxide')
    || source.includes('e171')
  ) {
    return 'Titanium dioxide (E171). The EU dropped it as a food additive after a genotoxicity data gap. We score it High.';
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

  if (name.includes('fragrance') || name.includes('parfum') || source.includes('fragrance / parfum')) {
    if (ingredient.riskLevel === 'cleared') {
      return 'Fragrance is listed on this label. On this formula it stayed Clean.';
    }
    return 'Fragrance / parfum. Population sensitization listing. That is a fact about the extra, not a claim it is unsafe.';
  }

  if (
    name.includes('sd alcohol')
    || name.includes('alcohol denat')
    || source.includes('alcohol / ethyl alcohol')
    || source.includes('isopropyl alcohol')
  ) {
    return 'Alcohol is the vehicle here, not a drinking-alcohol active and not the gummy seed-oil High rule.';
  }

  if (
    name.includes('polyethylene glycol')
    || /\bpeg(?:-|\s|\d)/.test(name)
    || source.includes('pegs —')
  ) {
    return 'PEG (polyethylene glycol). Moderate listing from processing leftovers. Cleaner formulas leave it out.';
  }

  if (name.includes('polysorbate') || source.includes('polysorbate')) {
    return 'Polysorbate emulsifier. Moderate listing. Cleaner formulas leave it out.';
  }

  if (name.includes('poloxamer 182') || source.includes('poloxamer 182')) {
    return 'Poloxamer 182 is a locked Caution PEG-style surfactant. Not High. It does not make a product Not clean by itself.';
  }

  if (
    name.includes('silicon dioxide')
    || name === 'silica'
    || name.startsWith('silica ')
    || source.includes('silicon dioxide')
  ) {
    return 'Silicon dioxide / silica is a Caution cap. It does not make a product Not clean by itself.';
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
      return PENDING_DAILYMED_REVIEW;
    }
    if (name.includes('magnesium stearate') || name.includes('stearic acid') || name.includes('calcium stearate')) {
      return 'Standard lubricant (stearate-family class). EFSA 2018 found no safety concern.';
    }
    if (name === 'water' || name.includes('purified water')) {
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
  if (body && body !== PENDING_DAILYMED_REVIEW) return { body, ...display };
  if (isIngredientReviewed(ingredient)) {
    return { body: reviewedWhyFallback(ingredient), ...display };
  }
  return {
    body: PENDING_DAILYMED_REVIEW,
    ...display,
  };
}

{
  const absorbineProCream = findDraftRecord('absorbine-jr-pro-cream');
  const methyl = absorbineProCream?.inactiveIngredients.find((ingredient) =>
    /methylparaben/i.test(ingredient.name),
  );
  if (!methyl) {
    throw new Error('absorbine-jr-pro-cream must keep methylparaben on the ingredient list');
  }
  const why = ingredientWhy(methyl);
  if (why.body === PENDING_DAILYMED_REVIEW) {
    throw new Error('absorbine-jr-pro-cream methylparaben why must not be pending');
  }
  if (!/paraben/i.test(why.body)) {
    throw new Error('absorbine-jr-pro-cream methylparaben why must be the paraben line');
  }
  const adapalene = findDraftRecord('welmate-b91-adapalene-01-gel');
  const poloxamer = adapalene?.inactiveIngredients.find((ingredient) =>
    ingredient.name === 'Poloxamer 182',
  );
  if (!poloxamer || poloxamer.riskLevel !== 'limited') {
    throw new Error('welmate adapalene must keep poloxamer 182 as Caution');
  }
  const poloxamerWhy = ingredientWhy(poloxamer);
  if (!/PEG-style surfactant/.test(poloxamerWhy.body) || /paraben/i.test(poloxamerWhy.body)) {
    throw new Error('poloxamer 182 why must be the Caution surfactant line, not the paraben line');
  }
}
