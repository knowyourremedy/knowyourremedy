// DRAFT / not verified / batch 150 KYR5-d Xyzal tablet UPC override.
// Barcode-only override. Copies selected batch148 rows and sets barcode.
// Does not mutate that array. previewCatalog places this array before
// batch148 so uniqueById (first wins) keeps these barcodes. batch148
// self-checks throw if any of its own rows has an unexpected barcode.
// Throws if any attached id is already in batch146 or batch147, or if
// a code is already on any other row in the catalog sources.
// batch70–149 were not edited.
// No new products, grades, panels, formulas, names, or oil-info.

import type { RatingRecord } from '../ratingRecord';
import { BATCH10_ADULT_DIGESTIVE } from './batch10-adult-digestive';
import { BATCH1_ADULT_APAP_IBU } from './batch1-adult-apap-ibu';
import { BATCH2_KIDS_APAP_IBU } from './batch2-kids-apap-ibu';
import { BATCH3_ADULT_COUGH_COLD } from './batch3-adult-cough-cold';
import { BATCH4_KIDS_COUGH_COLD } from './batch4-kids-cough-cold';
import { BATCH5_ADULT_ALLERGIES } from './batch5-adult-allergies';
import { BATCH6_KIDS_ALLERGIES } from './batch6-kids-allergies';
import { BATCH7_ADULT_SLEEP } from './batch7-adult-sleep';
import { BATCH8_KIDS_SLEEP } from './batch8-kids-sleep';
import { BATCH9_IMMUNE_SUPPORT } from './batch9-immune-support';
import { BATCH11_KIDS_DIGESTIVE } from './batch11-kids-digestive';
import { BATCH12_ADULT_FIRST_AID } from './batch12-adult-first-aid';
import { BATCH13_KIDS_FIRST_AID } from './batch13-kids-first-aid';
import { BATCH14_ADULT_VITAMINS } from './batch14-adult-vitamins';
import { BATCH15_PRENATALS } from './batch15-prenatals';
import { BATCH16_365_SPROUTS } from './batch16-365-sprouts';
import { BATCH17_KIDS_VITAMINS } from './batch17-kids-vitamins';
import { BATCH18_ADULT_SINGLES } from './batch18-adult-singles';
import { BATCH19_KIDS_SINGLES } from './batch19-kids-singles';
import { BATCH20_CLUB_LEFTOVERS } from './batch20-club-leftovers';
import { BATCH21_TOPCARE_SAVE_MART } from './batch21-topcare-save-mart';
import { BATCH22_EYE_EAR } from './batch22-eye-ear';
import { BATCH24_IHERB_FULLSCRIPT } from './batch24-iherb-fullscript';
import { BATCH25_IHERB_FULLSCRIPT_LEFTOVERS } from './batch25-iherb-fullscript-leftovers';
import { BATCH26_WE_HEART_NUTRITION } from './batch26-we-heart-nutrition';
import { BATCH27_THRIVE_WELLMADE } from './batch27-thrive-wellmade';
import { BATCH28_THORNE_COM } from './batch28-thorne-com';
import { BATCH29_DOLLAR_STORE } from './batch29-dollar-store';
import { BATCH30_AMAZON_BASIC_CARE } from './batch30-amazon-basic-care';
import { BATCH31_MEGAFOOD } from './batch31-megafood';
import { BATCH32_GENEXA } from './batch32-genexa';
import { BATCH33_HYLANDS } from './batch33-hylands';
import { BATCH34_BOIRON } from './batch34-boiron';
import { BATCH35_SPROUTS } from './batch35-sprouts';
import { BATCH140_KYR6B_SPROUTS_HELD_BOTTLES } from './batch140-kyr6b-sprouts-held-bottles';
import { BATCH36_SPROUTS_LEFTOVERS } from './batch36-sprouts-leftovers';
import { BATCH37_MEDINATURA_BT } from './batch37-medinatura-bt';
import { BATCH38_NATURES_WAY } from './batch38-natures-way';
import { BATCH39_TYLENOL_ADVIL_ALEVE_HOLES } from './batch39-tylenol-advil-aleve-holes';
import { BATCH40_BAYER_EXCEDRIN_MOTRIN } from './batch40-bayer-excedrin-motrin';
import { BATCH41_PAIN_RUBS } from './batch41-pain-rubs';
import { BATCH42_PAIN_GELS } from './batch42-pain-gels';
import { BATCH43_GOODYS_BC_ECOTRIN } from './batch43-goodys-bc-ecotrin';
import { BATCH44_PAIN_RUBS_LIST2 } from './batch44-pain-rubs-list2';
import { BATCH45_PAIN_RUBS_REMAINING } from './batch45-pain-rubs-remaining';
import { BATCH46_PAIN_RUB_REFUSED_UNLOCK } from './batch46-pain-rub-refused-unlock';
import { BATCH47_PAIN_RUB_EXACT_UNLOCK } from './batch47-pain-rub-exact-unlock';
import { BATCH48_SALONPAS_TIGER_BALM_WRITE } from './batch48-salonpas-tiger-balm-write';
import { BATCH49_PAIN_FEVER_LIST2 } from './batch49-pain-fever-list2';
import { BATCH50_PAIN_FEVER_LIST3 } from './batch50-pain-fever-list3';
import { BATCH51_PAIN_FEVER_REFUSED_UNLOCK } from './batch51-pain-fever-refused-unlock';
import { BATCH52_THRIVE_PF_HOLES } from './batch52-thrive-pf-holes';
import { BATCH53_ASUTRA_MELT_PAIN_AWAY } from './batch53-asutra-melt-pain-away';
import { BATCH54_AMAZON_PF_HOLES } from './batch54-amazon-pf-holes';
import { BATCH55_PF_REFUSED_UNLOCK } from './batch55-pf-refused-unlock';
import { BATCH56_AMAZON_LEFTOVER_GRADES } from './batch56-amazon-leftover-grades';
import { BATCH57_PF_REFUSED_UNLOCK } from './batch57-pf-refused-unlock';
import { BATCH58_PENETREX_CREAM } from './batch58-penetrex-cream';
import { BATCH59_THRIVE_HOLES } from './batch59-thrive-holes';
import { BATCH60_THRIVE_REFUSED_UNLOCK } from './batch60-thrive-refused-unlock';
import { BATCH61_AMAZON_HOUSE_PINNED } from './batch61-amazon-house-pinned';
import { BATCH62_MAMA_BEAR_CAROUSEL } from './batch62-mama-bear-carousel';
import { BATCH63_KYR6_ELEMENTS_BASICS } from './batch63-kyr6-elements-basics';
import { BATCH64_KYR6_THRIVE_NO_OI } from './batch64-kyr6-thrive-no-oi';
import { BATCH65_KYR6_STORE_GENERICS } from './batch65-kyr6-store-generics';
import { BATCH66_KYR6_HELD_ROWS } from './batch66-kyr6-held-rows';
import { BATCH67_KYR6_MEMBERS_MARK } from './batch67-kyr6-members-mark';
import { BATCH68_KYR6_FOUNDER_PANELS } from './batch68-kyr6-founder-panels';
import { BATCH69_KYR6_STORE_PANELS } from './batch69-kyr6-store-panels';
import { BATCH70_KYR6_AMAZON_3P_MICRO_INGREDIENTS } from './batch70-kyr6-amazon-3p-micro-ingredients';
import { BATCH71_KYR6_AMAZON_3P_NOW } from './batch71-kyr6-amazon-3p-now';
import { BATCH72_KYR6_NOW_REFUSE_BACKFILL } from './batch72-kyr6-now-refuse-backfill';
import { BATCH73_KYR6_NOW_EXACT_S5_BACKFILL } from './batch73-kyr6-now-exact-s5-backfill';
import { BATCH74_KYR6_NOW_TOKEN_STAMP_BACKFILL } from './batch74-kyr6-now-token-stamp-backfill';
import { BATCH75_KYR6_SPIRULINA_CAUTION } from './batch75-kyr6-spirulina-caution';
import { BATCH76_KYR6_AMAZON_3P_NUTRICOST } from './batch76-kyr6-amazon-3p-nutricost';
import { BATCH77_KYR6_NUTRICOST_TOKEN_BACKFILL } from './batch77-kyr6-nutricost-token-backfill';
import { BATCH78_KYR6_NUTRICOST_TOKEN_BACKFILL_2 } from './batch78-kyr6-nutricost-token-backfill-2';
import { BATCH79_KYR6_NUTRICOST_NO_OI } from './batch79-kyr6-nutricost-no-oi';
import { BATCH80_KYR6_NUTRICOST_79_REFUSE } from './batch80-kyr6-nutricost-79-refuse';
import { BATCH81_KYR6_NUTRICOST_UBIQUINOL_240 } from './batch81-kyr6-nutricost-ubiquinol-240';
import { BATCH82_KYR6_AMAZON_3P_NATUREWISE } from './batch82-kyr6-amazon-3p-naturewise';
import { BATCH83_KYR6_NATUREWISE_TOKEN_BACKFILL } from './batch83-kyr6-naturewise-token-backfill';
import { BATCH84_KYR6_NATUREWISE_FRUIT_FOAM } from './batch84-kyr6-naturewise-fruit-foam';
import { BATCH85_KYR6_NATUREWISE_NO_OI } from './batch85-kyr6-naturewise-no-oi';
import { BATCH86_KYR6_NATUREWISE_LAST_REFUSE } from './batch86-kyr6-naturewise-last-refuse';
import { BATCH87_KYR6_AMAZON_3P_WELMATE } from './batch87-kyr6-amazon-3p-welmate';
import { BATCH88_KYR6_WELMATE_TOKEN_BACKFILL } from './batch88-kyr6-welmate-token-backfill';
import { BATCH89_KYR6_WELMATE_CUCUMBER_SPRAY } from './batch89-kyr6-welmate-cucumber-spray';
import { BATCH90_KYR6_WELMATE_NO_OI } from './batch90-kyr6-welmate-no-oi';
import { BATCH91_KYR6_WELMATE_POLOXAMER } from './batch91-kyr6-welmate-poloxamer';
import { BATCH92_KYR6_MISSING_OI_RESCAN } from './batch92-kyr6-missing-oi-rescan';
import { BATCH93_KYR6_AMAZON_3P_APLUS_HEALTH } from './batch93-kyr6-amazon-3p-aplus-health';
import { BATCH94_KYR6_APLUS_TOKEN_BACKFILL } from './batch94-kyr6-aplus-token-backfill';
import { BATCH95_KYR6_APLUS_ITCH_GEL } from './batch95-kyr6-aplus-itch-gel';
import { BATCH96_KYR6_AMAZON_3P_HEALTHA2Z } from './batch96-kyr6-amazon-3p-healtha2z';
import { BATCH97_KYR6_HEALTHA2Z_TOKEN_BACKFILL } from './batch97-kyr6-healtha2z-token-backfill';
import { BATCH98_KYR6_HEALTHA2Z_NO_OI } from './batch98-kyr6-healtha2z-no-oi';
import { BATCH99_KYR6_HEALTHA2Z_TOKEN_BACKFILL_2 } from './batch99-kyr6-healtha2z-token-backfill-2';
import { BATCH100_KYR6_HEALTHA2Z_NO_OI_GOOGLE } from './batch100-kyr6-healtha2z-no-oi-google';
import { BATCH101_KYR6_HEALTHA2Z_TOKEN_BACKFILL_3 } from './batch101-kyr6-healtha2z-token-backfill-3';
import { BATCH102_KYR6_HEALTHA2Z_TOKEN_BACKFILL_4 } from './batch102-kyr6-healtha2z-token-backfill-4';
import { BATCH103_KYR6_HEALTHA2Z_TOKEN_BACKFILL_5 } from './batch103-kyr6-healtha2z-token-backfill-5';
import { BATCH104_KYR6_HEALTHA2Z_NO_OI_AIMODE } from './batch104-kyr6-healtha2z-no-oi-aimode';
import { BATCH105_KYR6_HEALTHA2Z_THREE_GUMMIES } from './batch105-kyr6-healtha2z-three-gummies';
import { BATCH106_KYR6B_AMAZON_3P_TIME_CAP } from './batch106-kyr6b-amazon-3p-time-cap';
import { BATCH107_KYR6B_TIMECAP_TOKEN_BACKFILL } from './batch107-kyr6b-timecap-token-backfill';
import { BATCH108_KYR6B_TIMECAP_FDC_ALIASES } from './batch108-kyr6b-timecap-fdc-aliases';
import { BATCH109_KYR6B_AMAZON_3P_GOODSENSE } from './batch109-kyr6b-amazon-3p-goodsense';
import { BATCH110_KYR6B_GOODSENSE_REMATCH } from './batch110-kyr6b-goodsense-rematch';
import { BATCH111_KYR6B_GOODSENSE_TOKEN_BACKFILL } from './batch111-kyr6b-goodsense-token-backfill';
import { BATCH112_KYR6B_GOODSENSE_TOKEN_BACKFILL_2 } from './batch112-kyr6b-goodsense-token-backfill-2';
import { BATCH113_KYR6B_GOODSENSE_TOKEN_BACKFILL_3 } from './batch113-kyr6b-goodsense-token-backfill-3';
import { BATCH114_KYR6B_NATUREWISE_NO_OI } from './batch114-kyr6b-naturewise-no-oi';
import { BATCH115_KYR6B_NATUREWISE_CLOSEOUT } from './batch115-kyr6b-naturewise-closeout';
import { BATCH116_KYR6B_SOLARAY_FIRST_SLICE } from './batch116-kyr6b-solaray-first-slice';
import { BATCH117_KYR6B_SOLARAY_STAMP_BACKFILL } from './batch117-kyr6b-solaray-stamp-backfill';
import { BATCH118_KYR6B_SOLARAY_CLEANUP } from './batch118-kyr6b-solaray-cleanup';
import { BATCH119_KYR6B_SOLARAY_ALIAS_NETTLE } from './batch119-kyr6b-solaray-alias-nettle';
import { BATCH120_KYR6B_SOLARAY_ALIAS2_NOOI } from './batch120-kyr6b-solaray-alias2-nooi';
import { BATCH121_KYR6B_SOLARAY_SOY_32 } from './batch121-kyr6b-solaray-soy-32';
import { BATCH122_KYR6B_SOLARAY_STERATE_PEPPERMINT_2 } from './batch122-kyr6b-solaray-sterate-peppermint-2';
import { BATCH123_KYR6B_SOLARAY_CLOSEOUT_NO_UPC } from './batch123-kyr6b-solaray-closeout-no-upc';
import { BATCH124_KYR6B_SOLARAY_FAT_CLOSEOUT } from './batch124-kyr6b-solaray-fat-closeout';
import { BATCH125_KYR6B_SOLARAY_LAST_FAMILY_CLOSEOUT } from './batch125-kyr6b-solaray-last-family-closeout';
import { BATCH126_KYR6B_SOLARAY_ONE_SHOT } from './batch126-kyr6b-solaray-one-shot';
import { BATCH127_KYR6B_SOLARAY_CA_ASCORBATE } from './batch127-kyr6b-solaray-ca-ascorbate';
import { BATCH128_KYR6B_SOLARAY_LAST_16 } from './batch128-kyr6b-solaray-last-16';
import { BATCH129_KYR6B_SOLARAY_OCR_NO_OI } from './batch129-kyr6b-solaray-ocr-no-oi';
import { BATCH130_KYR6B_SOLARAY_LAST_4_NO_OI } from './batch130-kyr6b-solaray-last-4-no-oi';
import { BATCH131_KYR6B_SOLARAY_LAST_TWO_PINNED } from './batch131-kyr6b-solaray-last-two-pinned';
import { BATCH133_KYR6B_ZYRTEC_FIX } from './batch133-kyr6b-zyrtec-fix';
import { BATCH132_KYR6B_ZYRTEC_FIRST_SLICE } from './batch132-kyr6b-zyrtec-first-slice';
import { BATCH135_KYR6B_ZYRTEC_8OZ_SYRUP } from './batch135-kyr6b-zyrtec-8oz-syrup';
import { BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3 } from './batch147-kyr5d-claritin-upc-override-3';
import { BATCH136_KYR6B_CLARITIN_FIRST_SLICE } from './batch136-kyr6b-claritin-first-slice';
import { BATCH137_KYR6B_ALLEGRA_FIRST_SLICE } from './batch137-kyr6b-allegra-first-slice';
import { BATCH138_KYR6B_ALLEGRA_D24 } from './batch138-kyr6b-allegra-d24';
import { BATCH139_KYR6B_SPROUTS_HOUSE_SCAN } from './batch139-kyr6b-sprouts-house-scan';
import { BATCH141_KYR6B_ZYRTEC_US_OTC } from './batch141-kyr6b-zyrtec-us-otc';
import { BATCH142_KYR6B_ZYRTEC_MISSING_UPC } from './batch142-kyr6b-zyrtec-missing-upc';
import { BATCH143_KYR6B_ZYRTEC_75CT } from './batch143-kyr6b-zyrtec-75ct';
import { BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE } from './batch146-kyr5d-claritin-upc-override';
import { BATCH144_KYR6B_CLARITIN_US_OTC } from './batch144-kyr6b-claritin-us-otc';
import { BATCH145_KYR6B_CLARITIN_HELD_UPC } from './batch145-kyr6b-claritin-held-upc';
import { BATCH148_KYR6B_XYZAL_US_OTC } from './batch148-kyr6b-xyzal-us-otc';
import { BATCH149_KYR6B_XYZAL_CHILDRENS_LIQUID } from './batch149-kyr6b-xyzal-childrens-liquid';

const ATTACH: { id: string; barcode: string }[] = [
  // DailyMed setid 8be45c2a carton, NDC 41167-3511-2, '0 41167 35112 3' printed under bars
  { id: 'xyzal-b148-tablets-20', barcode: '041167351123' },
  // Walmart ip/17902665379 product.upc and Amazon B0GXGV2TJG details UPC, 40-Count single
  { id: 'xyzal-b148-tablets-40', barcode: '041167351185' },
  // Amazon B0GXGWH9FH details UPC, 60-Count single, not a multipack
  { id: 'xyzal-b148-tablets-60', barcode: '041167351192' },
  // Amazon B0G21SW5KZ details UPC, 90-Count single
  { id: 'xyzal-b148-tablets-90', barcode: '041167351345' },
];

// Arrays spread into previewCatalog CATALOG, in that same order.
const CATALOG_SOURCES: readonly RatingRecord[][] = [
  BATCH10_ADULT_DIGESTIVE,
  BATCH1_ADULT_APAP_IBU,
  BATCH2_KIDS_APAP_IBU,
  BATCH3_ADULT_COUGH_COLD,
  BATCH4_KIDS_COUGH_COLD,
  BATCH5_ADULT_ALLERGIES,
  BATCH6_KIDS_ALLERGIES,
  BATCH7_ADULT_SLEEP,
  BATCH8_KIDS_SLEEP,
  BATCH9_IMMUNE_SUPPORT,
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
  BATCH140_KYR6B_SPROUTS_HELD_BOTTLES,
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
  BATCH94_KYR6_APLUS_TOKEN_BACKFILL,
  BATCH95_KYR6_APLUS_ITCH_GEL,
  BATCH96_KYR6_AMAZON_3P_HEALTHA2Z,
  BATCH97_KYR6_HEALTHA2Z_TOKEN_BACKFILL,
  BATCH98_KYR6_HEALTHA2Z_NO_OI,
  BATCH99_KYR6_HEALTHA2Z_TOKEN_BACKFILL_2,
  BATCH100_KYR6_HEALTHA2Z_NO_OI_GOOGLE,
  BATCH101_KYR6_HEALTHA2Z_TOKEN_BACKFILL_3,
  BATCH102_KYR6_HEALTHA2Z_TOKEN_BACKFILL_4,
  BATCH103_KYR6_HEALTHA2Z_TOKEN_BACKFILL_5,
  BATCH104_KYR6_HEALTHA2Z_NO_OI_AIMODE,
  BATCH105_KYR6_HEALTHA2Z_THREE_GUMMIES,
  BATCH106_KYR6B_AMAZON_3P_TIME_CAP,
  BATCH107_KYR6B_TIMECAP_TOKEN_BACKFILL,
  BATCH108_KYR6B_TIMECAP_FDC_ALIASES,
  BATCH109_KYR6B_AMAZON_3P_GOODSENSE,
  BATCH110_KYR6B_GOODSENSE_REMATCH,
  BATCH111_KYR6B_GOODSENSE_TOKEN_BACKFILL,
  BATCH112_KYR6B_GOODSENSE_TOKEN_BACKFILL_2,
  BATCH113_KYR6B_GOODSENSE_TOKEN_BACKFILL_3,
  BATCH114_KYR6B_NATUREWISE_NO_OI,
  BATCH115_KYR6B_NATUREWISE_CLOSEOUT,
  BATCH116_KYR6B_SOLARAY_FIRST_SLICE,
  BATCH117_KYR6B_SOLARAY_STAMP_BACKFILL,
  BATCH118_KYR6B_SOLARAY_CLEANUP,
  BATCH119_KYR6B_SOLARAY_ALIAS_NETTLE,
  BATCH120_KYR6B_SOLARAY_ALIAS2_NOOI,
  BATCH121_KYR6B_SOLARAY_SOY_32,
  BATCH122_KYR6B_SOLARAY_STERATE_PEPPERMINT_2,
  BATCH123_KYR6B_SOLARAY_CLOSEOUT_NO_UPC,
  BATCH124_KYR6B_SOLARAY_FAT_CLOSEOUT,
  BATCH125_KYR6B_SOLARAY_LAST_FAMILY_CLOSEOUT,
  BATCH126_KYR6B_SOLARAY_ONE_SHOT,
  BATCH127_KYR6B_SOLARAY_CA_ASCORBATE,
  BATCH128_KYR6B_SOLARAY_LAST_16,
  BATCH129_KYR6B_SOLARAY_OCR_NO_OI,
  BATCH130_KYR6B_SOLARAY_LAST_4_NO_OI,
  BATCH131_KYR6B_SOLARAY_LAST_TWO_PINNED,
  BATCH133_KYR6B_ZYRTEC_FIX,
  BATCH132_KYR6B_ZYRTEC_FIRST_SLICE,
  BATCH135_KYR6B_ZYRTEC_8OZ_SYRUP,
  BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3,
  BATCH136_KYR6B_CLARITIN_FIRST_SLICE,
  BATCH137_KYR6B_ALLEGRA_FIRST_SLICE,
  BATCH138_KYR6B_ALLEGRA_D24,
  BATCH139_KYR6B_SPROUTS_HOUSE_SCAN,
  BATCH141_KYR6B_ZYRTEC_US_OTC,
  BATCH142_KYR6B_ZYRTEC_MISSING_UPC,
  BATCH143_KYR6B_ZYRTEC_75CT,
  BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE,
  BATCH144_KYR6B_CLARITIN_US_OTC,
  BATCH145_KYR6B_CLARITIN_HELD_UPC,
  BATCH148_KYR6B_XYZAL_US_OTC,
  BATCH149_KYR6B_XYZAL_CHILDRENS_LIQUID,
];

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function selectSource(id: string): RatingRecord {
  if (
    BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE.some((record) => record.id === id) ||
    BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3.some((record) => record.id === id)
  ) {
    throw new Error(`batch150 id ${id} is already in batch146/147`);
  }
  const hits = BATCH148_KYR6B_XYZAL_US_OTC.filter((record) => record.id === id);
  if (hits.length === 0) throw new Error(`batch150 id not found in batch148: ${id}`);
  if (hits.length !== 1) throw new Error(`batch150 id ${id} found ${hits.length} times in batch148`);
  if (hits[0].barcode) throw new Error(`batch150 source ${id} already has a barcode`);
  return hits[0];
}

function assertCodeFree(barcode: string): void {
  for (const source of CATALOG_SOURCES) {
    for (const row of source) {
      if (row.barcode === barcode) {
        throw new Error(`batch150 barcode ${barcode} already on catalog source ${row.id}`);
      }
    }
  }
}

const seenIds = new Set<string>();
const seenCodes = new Set<string>();

export const BATCH150_KYR5D_XYZAL_UPC_OVERRIDE: RatingRecord[] = ATTACH.map(({ id, barcode }) => {
  if (seenIds.has(id)) throw new Error(`batch150 duplicate id ${id}`);
  seenIds.add(id);
  if (!upcOk(barcode)) throw new Error(`batch150 barcode failed UPC-A check on ${id}: ${barcode}`);
  if (seenCodes.has(barcode)) throw new Error(`batch150 duplicate barcode ${barcode}`);
  seenCodes.add(barcode);
  const record = selectSource(id);
  assertCodeFree(barcode);
  return { ...record, barcode };
});

if (BATCH150_KYR5D_XYZAL_UPC_OVERRIDE.length !== ATTACH.length) {
  throw new Error(`batch150 attach count ${BATCH150_KYR5D_XYZAL_UPC_OVERRIDE.length}`);
}

for (const row of BATCH150_KYR5D_XYZAL_UPC_OVERRIDE) {
  const source = selectSource(row.id);
  if (source === row) throw new Error(`batch150 did not copy ${row.id}`);
  if (source.barcode) throw new Error(`batch150 mutated source ${row.id}`);
  if (row.barcode !== ATTACH.find((item) => item.id === row.id)?.barcode) {
    throw new Error(`batch150 barcode drift on ${row.id}`);
  }
}
