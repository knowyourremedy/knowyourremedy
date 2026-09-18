// DRAFT / not verified / batch 63 KYR6 Amazon Elements / Basics
// founder-carousel + DailyMed OTC WRITE / methodology v1.6 +
// current main §5 exact Additive / “also appears as” / locked
// exact-INCI rows only. KYR6 §5 stamps used where MAIN was
// missing (lozenge soybean High; safflower softgel fill Cleared;
// special petrolatum Cleared; lanolin alcohol / cedarleaf /
// nutmeg / spirits of turpentine Caution). bisabolol stays
// Cleared (already locked Sept 15 — not flipped). No invented
// grades. No cousin-match. Founder owns final Avoid vs Caution
// vs Clean.
//
// ONE write. These 35 founder-carousel / DailyMed OTC rows
// ONLY. recordStatus is 'unverified' on every row. Internal
// keys only: clean | caution | avoid. UPC attached only when
// DailyMed / NDC / NIH DSLD has a real barcode — no invented
// codes. Missing code ≠ no row (omit barcode). Pack sizes of
// the same name+form+inactives share formulaId. Form is
// labeled on cleanAlternatives, not a hard filter (§6). Search
// wiring only. Not wired into Clean Picks UI. No photos.
// Letter tiles only on new ids. No fake Clean alts. No
// methodology wipe. PROJECT_NOTES tally-only (do not wipe
// LIVE NOW).
//
// Rebrands: Revly = Elements. Solimo = Basics. Basics
// previously Elements = one row unless form/OI differs.
// Gummy ≠ tablet. Softgel fill oils ≠ gummy seed-oil High
// when founder says so.
//
// DO NOT REOPEN: PR #118 / batch61 Amazon house pinned ·
// PR #119 / batch62 Mama Bear four. Do not write Micro
// Ingredients / 3P / WELMATE / A+Health / HealthA2Z /
// TIME-Cap / GoodSense full lines. Do not write pour-bottle
// oils, saline, or PROJECT_NOTES dead / off-house SKUs
// (Solimo Fish Oil 1000 / Solimo Iron / Solimo prebiotic
// gummies / Solimo D3 5000 page / Elements Organic Whole
// Food D3 tablets / Elements Mg lemon powder / Elements
// Glucosamine / Basics Saline Nasal).
//
// LOCKS used (exact §5 + founder grades): gummy sunflower
// oil = High / Avoid. Fractionated coconut in a gummy = NOT
// High (coconut exception). Safflower softgel fill = Cleared
// (NOT gummy High). Lozenge soybean oil = High / Avoid.
// Natural flavors = Limited → product Caution (Limited-only
// never Avoid). Annatto = standalone Caution, encoded
// cleared + METH.annatto. SiO2 / silica = 0-pt Caution cap.
// Rice flour = Caution. ceresin Cleared. lanolin alcohol
// Caution. bisabolol stays Cleared. special petrolatum
// Cleared. cedarleaf / nutmeg / spirits of turpentine /
// thymol / eucalyptus Caution. Display keys stay
// clean / caution / avoid.
//
// TALLY (unverified drafts in THIS file): 35 rows — Clean 4 /
// Caution 21 / Avoid 10. NEW 35 / REUSE 0 / SKIPPED-DEAD 8.
//
// Independently Clean analogs already on main (not cloned):
// pure-encapsulations-one-multivitamin ·
// we-heart-wholesome-prenatal · wellmade-elderberry ·
// thrive-wellmade-real-food-vitamin-c ·
// thrive-wellmade-womens-daily-probiotic ·
// wellmade-organic-acacia-fiber · thrive-wellmade-fish-oil ·
// kirkland-fish-oil-softgels-clear ·
// nature-made-d3-softgels-clear ·
// pure-encapsulations-melatonin-sr-3mg ·
// nature-made-b12-softgels-clear ·
// megafood-magnesium-300-capsules ·
// oregons-wild-harvest-turmeric ·
// amazon-basic-care-triple-pain-ointment ·
// coldcalm-meltaways · hylands-4kids-calm-restful.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const PRENATAL = 'Prenatal';
const IMMUNE = 'Immune Support';
const DIGESTIVE = 'Digestive';
const SLEEP = 'Sleep';
const FIRST_AID = 'First Aid';
const COLD_FLU = 'Cold & Flu';
const PAIN_FEVER = 'Pain & Fever';

const ELEMENTS = 'Amazon Elements';
const BASICS = 'Amazon Basics';
const BASIC_CARE = 'Amazon Basic Care';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. Sunflower / palm / safflower / vegetable oil used as a gummy coating or fill is that High rule. Capsule / softgel / drop fill of the same oil is not.';

const LOZENGE_OIL_TAP =
  'Seed/industrial oils are flagged in gummies and in lozenges / cough drops. Soybean oil in this lozenge is that High rule. Capsule / softgel fill of a named oil is not.';

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. In this capsule / softgel / ointment fill they are not that High rule.';

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const ZINC_PARKED =
  'Zinc (citrate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only.';

const PARKED_RUB =
  'Menthol / camphor / eucalyptus oil as labeled actives stay parked (Methodology §2 / §5). This draft grades inactives only.';

// KYR5-b online-only chunk 1 — Amazon PDP / HelloPharmacist label
// UPC-A. Exact pack + exact OI only. Do not steal softgel / tablet /
// soybean-D3 twins.
const BATCH63_CATCHUP_BARCODES: Record<string, string> = {
  'amazon-elements-omega-3-6-9': '842379150586 195515040402',
  'amazon-elements-womens-probiotic': '195515041393',
  'amazon-elements-collagen-complex': '842379150630 195515041409',
  'amazon-elements-melatonin-3-tablets': '842379106576',
  'amazon-elements-calcium-magnesium': '842379199394',
  'amazon-elements-womens-multi-gummies': '842379149566',
  'amazon-basics-fish-oil-gummies': '195515033374',
  'amazon-basics-probiotic-5b': '195515008112',
  'amazon-basics-fiber-gummies': '195515034500',
  'amazon-basics-melatonin-5-gummies': '195515033381',
  // KYR5-c barcode-tile chunk 2 — 14 oz jar (72288-247-41), not the
  // 1.76 oz tube and not petroleum jelly 195515026147.
  'amazon-basics-advanced-healing-ointment': '195515026093',
};

const SET = {
  heal: 'cdf1bd12-ac59-4f06-be0f-ef6eb3caeeff',
  chest: '673996ab-6e57-4feb-8af3-d8b474741a8d',
  honey: 'cf82fb0b-1b4d-def1-e053-2995a90a6fd9',
  cherry: 'c0588221-0c84-66d8-e053-2995a90a874f',
  sfMenthol: 'c0946295-7cf0-1bd8-e053-2a95a90af5af',
} as const;

const CITE = {
  mensGummy:
    'Founder carousel OI (pinned label truth) Amazon Elements Men’s Multi Gummies (previously Revly) other-ingredients include Organic Sunflower Oil. Organic gummy base harvested with the carousel / house organic-gummy panel: Organic Tapioca Syrup, Organic Cane Sugar, Pectin, Organic Lemon Juice Concentrate, Organic Flavors, Sodium Citrate, Colors Added (Organic Black Carrot Juice Concentrate, Organic Maqui Berry Juice Concentrate), Organic Carnauba Wax. No carton UPC harvested.',
  womensGummy:
    'Founder carousel OI (pinned label truth) Amazon Elements Women’s Multi Gummies (previously Revly) other-ingredients include Organic Sunflower Oil. Same organic gummy-base family as the men’s twin. No carton UPC harvested.',
  prenatalGummy:
    'Founder carousel OI (pinned label truth) Amazon Elements Prenatal DHA+D3 gummies (previously Revly) — no seed oil; natural flavors. Distinct from DSLD 300218 Prenatal DHA + D3 SOFTGEL (Gelatin, Glycerine, Water; barcode 842379150562) — gummy ≠ softgel; do not reuse that barcode or OI. No gummy UPC harvested.',
  sambucus:
    'Founder carousel OI (pinned label truth) Amazon Elements Sambucus gummies (previously Revly) — sunflower oil. HelloPharmacist / NIH DSLD 273234 Sambucus Complex Elderberry Flavor also prints Sugar, Tapioca Syrup, Pectin, Citric Acid, Sodium Citrate (Na Citrate), Natural Flavors; barcode 842379151743 (60 ct). Carousel sunflower oil is the Avoid driver.',
  biotinGummy:
    'Founder carousel OI (pinned label truth) Amazon Elements Biotin gummies (previously Revly) — sunflower oil. HelloPharmacist / NIH DSLD 300220 Vegan Biotin Complex Strawberry Flavor other-ingredients: Cane Sugar, Tapioca Syrup, Pectin, Citric Acid, Sodium Citrate, Natural Flavors, Black Carrot Juice Concentrate, Sunflower Oil, Carnauba Wax. Barcode 842379149535 (60 ct). Distinct from amazon-elements-biotin-5000 capsules.',
  vitCGummy:
    'Founder carousel OI (pinned label truth) Amazon Elements Vitamin C gummies (previously Revly) — no seed oil; annatto + flavors. HelloPharmacist / NIH DSLD 300222 Vegan Vitamin C 250 mg Orange Flavor also printed Sunflower Oil on an older Revly panel — carousel lock is Caution (annatto + flavors), not that High. Written OI follows the carousel (no sunflower). Barcode 842379149641 (70 ct).',
  womensPro:
    'Founder carousel OI (pinned label truth) Amazon Elements Women’s Probiotic caps (previously Revly) — silica. HelloPharmacist / NIH DSLD 319251 Vegetarian Women’s Probiotic 50 Billion CFU other-ingredients: Modified Cellulose, Water, Cellulose, Magnesium Stearate (Mg Stearate), Silica, Calcium Silicate (Ca Silicate). No carton UPC harvested.',
  collagen:
    'Founder carousel OI (pinned label truth) Amazon Elements Collagen Complex (previously Revly) — rice flour + SiO2. HelloPharmacist / NIH DSLD 319236 other-ingredients: Gelatin, Rice Flour, Cellulose, Silicon Dioxide (SiO2), Magnesium Stearate (Mg Stearate). No carton UPC harvested.',
  acacia:
    'Founder carousel OI (pinned label truth) Amazon Elements Acacia Fiber 100% powder (previously Revly) — no Other Ingredients. HelloPharmacist / NIH DSLD 300221 Vegan Acacia Fiber prints Other Ingredients: NP (none / not provided). Acacia gum is the labeled fiber active, not an inactive. No carton UPC harvested.',
  omega369:
    'Founder carousel OI (pinned label truth) Amazon Elements Omega 3-6-9 softgels (previously Revly): gelatin, glycerin, water, mixed tocopherols. No natural flavor on this panel. Distinct from Basics Super Omega-3 (natural flavor Caution) and from DSLD 300219. No carton UPC harvested.',
  fiberGummy:
    'Founder carousel OI (pinned label truth) Amazon Basics Fiber gummies (previously Solimo) — sunflower oil. HelloPharmacist / NIH DSLD 298942 Fiber 4 g other-ingredients: Chicory Root Fiber (Inulin), Cane Sugar, Citric Acid, Lo Han fruit concentrate, Natural Flavors, Annatto Extract, Black Carrot Juice Concentrate, Carnauba Wax, Sunflower Oil, Turmeric Extract, Pectin, Sodium Citrate (Na Citrate). No carton UPC harvested.',
  fishGummy:
    'Founder carousel OI (pinned label truth) Amazon Basics Fish Oil gummies (previously Solimo) — fractionated coconut (NOT High) + annatto / flavors. HelloPharmacist / NIH DSLD 318718 Fish Oil 303 mg other-ingredients: Glucose Syrup, Sucrose, Gelatin, Pectin, Annatto extract, Carnauba Wax, Citric Acid, Coconut Oil, Fractionated, Natural Flavors, Purple Carrot Juice Concentrate, Turmeric Extract. Not Solimo Fish Oil 1000 (dead / off-house). No carton UPC harvested.',
  mel5Gummy:
    'Founder carousel OI (pinned label truth) Amazon Basics Melatonin 5 mg gummies (previously Solimo) — sunflower oil. HelloPharmacist / NIH DSLD 318722 Melatonin 5 mg Strawberry Flavor other-ingredients: Tapioca Syrup, Sugar, Pectin, Citric Acid, Natural Flavors, Black Carrot Juice Concentrate, Carnauba Wax, Sunflower Oil, Sodium Citrate (Na Citrate). No carton UPC harvested. Distinct from amazon-elements-melatonin-5 capsules.',
  kidsMel:
    'Founder carousel OI (pinned label truth) Amazon Basics Kids Melatonin 1 mg gummies — sunflower oil. No public DSLD / HelloPharmacist OI page harvested; do not invent the rest of the panel. No carton UPC harvested.',
  womensGummyDaily:
    'Founder carousel OI (pinned label truth) Amazon Basics Women’s One Daily gummies (previously Solimo) — fractionated coconut + annatto / flavors. HelloPharmacist / NIH DSLD 300224 Solimo Women’s Multivitamin other-ingredients: Tapioca Syrup, Sucrose, Pectin, Citric Acid, Purple Carrot Juice Concentrate, Annatto, Maqui berry juice concentrate, Natural Flavors, Coconut Oil, Fractionated, Sodium Citrate (Na Citrate), Carnauba Wax. No carton UPC harvested.',
  adultGummyDaily:
    'Founder carousel OI (pinned label truth) Amazon Basics Adult One Daily gummies (previously Solimo) — fractionated coconut + flavors. HelloPharmacist / NIH DSLD 300223 Solimo Adult Multivitamin other-ingredients: Tapioca Syrup, Sucrose, Pectin, Citric Acid, Natural Flavors, Sodium Citrate, Purple Carrot Juice Concentrate, Maqui berry juice concentrate, fractionated Coconut Oil, Carnauba wax, Choline Bitartrate. No carton UPC harvested.',
  pro5b:
    'Founder carousel OI (pinned label truth) Amazon Basics Probiotic 5B caps (previously Solimo) — silica. No standalone Basics / Solimo probiotic DSLD label harvested; do not invent the rest of the panel. No carton UPC harvested.',
  d3soft:
    'Founder carousel OI (pinned label truth) Amazon Elements Vitamin D3 5000 IU softgels — safflower fill (NOT gummy High). Softgel carrier: gelatin, glycerin, water. Distinct from the dead Solimo D3 5000 page and from off-market DSLD 203856 (soybean / corn oil — not this row). No carton UPC harvested.',
  superO3:
    'Founder carousel OI (pinned label truth) Amazon Basics Super Omega-3 softgels (previously Elements / Revly) — natural flavor. HelloPharmacist / NIH DSLD 300219 Super Omega-3 Natural Lemon Flavor other-ingredients: Gelatin, Glycerin, Water, natural Lemon flavor, D-Alpha Tocopherol. Barcode 842379150678 (90 ct). Distinct from Elements Omega 3-6-9 (no flavor; Clean).',
  womensTab:
    'Founder carousel OI (pinned label truth) Amazon Basics Women’s One Daily tablets (previously Elements) — SiO2. HelloPharmacist / NIH DSLD 300212 Organic Whole Food Women’s Multi other-ingredients: Agave Inulin, Powder, Pea Starch, Tapioca Dextrose, Medium Chain Triglyceride (MCT), Tapioca Maltodextrin, Sunflower Lecithin, Palm Oil, Guar Gum, Silica. Gummy ≠ tablet. No carton UPC harvested.',
  mensTab:
    'Founder carousel OI (pinned label truth) Amazon Basics Men’s One Daily tablets (previously Elements) — SiO2. HelloPharmacist / NIH DSLD 300210 Organic Whole Food Men’s Multi other-ingredients: Agave Inulin, Powder, Pea Starch, Tapioca Dextrose, Medium Chain Triglyceride (MCT), Tapioca Maltodextrin, Sunflower Lecithin, Palm Oil, Guar Gum, Silica. Gummy ≠ tablet. No carton UPC harvested.',
  prenatalTab:
    'Founder carousel OI (pinned label truth) Amazon Basics Prenatal tablets (previously Elements) — SiO2. HelloPharmacist / NIH DSLD 300211 Organic Whole Food Prenatal other-ingredients: Pea Starch, Agave Inulin, Powder, Medium Chain Triglyceride (MCT), Tapioca Maltodextrin, Sunflower Lecithin, Palm Oil, Guar Gum, Silica, Tapioca Dextrose. Distinct from the prenatal DHA+D3 gummy row. No carton UPC harvested.',
  bComplex:
    'Founder carousel OI (pinned label truth) Amazon Basics B Complex (previously Elements) — HPMC + rice hull. HelloPharmacist / NIH DSLD 203786 cultured B Complex other-ingredients: cultured Yeast (Molasses, Saccharomyces cerevisiae), Vegetable Capsule (Hydroxypropyl Methylcellulose), organic Rice hull concentrate. Barcode 842379103612 (65 ct). Do not use DSLD 300208 Organic Whole Food B Complex tablet (silica / palm — different OI).',
  b12:
    'Founder carousel OI (pinned label truth) Amazon Elements B12 5000 mcg lozenges — flavors + sugar alcohols. HelloPharmacist / NIH DSLD 203788 B12 Berry 5000 mcg other-ingredients: Xylitol, Mannitol, Stearic Acid (C18:0), Citric Acid, natural Raspberry flavor, natural Berry flavor, Magnesium Stearate. Barcode 842379103674 (65 ct).',
  mel3:
    'Founder carousel OI (pinned label truth) Amazon Elements Melatonin 3 mg tablets — SiO2. HelloPharmacist / NIH DSLD 337373 other-ingredients: Microcrystalline Cellulose, Dicalcium Phosphate (DCP), Stearic Acid, Magnesium Stearate (Mg Stearate), Silicon Dioxide (SiO2). Distinct from amazon-elements-melatonin-5 capsules and from Basics Melatonin 5 mg gummies. No carton UPC harvested.',
  mag:
    'Founder carousel OI (pinned label truth) Amazon Elements Chelated Magnesium — SiO2. HelloPharmacist / NIH DSLD 203803 Chelated Magnesium 270 other-ingredients: Microcrystalline Cellulose, Stearic Acid (C18:0), Vegetable Coating (Glycerin, Hydroxypropyl Methylcellulose), Croscarmellose Sodium, Magnesium Stearate, Silicon Dioxide (SiO2). No carton UPC harvested.',
  turmericRoot:
    'Founder carousel OI (pinned label truth) Amazon Elements Turmeric Root — SiO2. HelloPharmacist / NIH DSLD 173065 Turmeric Root Powder 500 other-ingredients: Vegetable Capsule (Hydroxypropyl Methylcellulose), Microcrystalline Cellulose, organic Rice hull concentrate, Magnesium Stearate, Silicon Dioxide (SiO2). Distinct from amazon-elements-turmeric-complex already on main. No carton UPC harvested.',
  vitC1000:
    'Founder carousel OI (pinned label truth) Amazon Elements Vitamin C 1000 mg tablets — SiO2. HelloPharmacist / NIH DSLD 203855 other-ingredients: Microcrystalline Cellulose, Stearic Acid (C18:0), Vegetable Coating (Glycerin, Hydroxypropyl Methylcellulose), Magnesium Stearate, Silicon Dioxide (SiO2), Croscarmellose Sodium. Barcode 842379103643 (300 ct). Distinct from amazon-elements-whole-food-vitamin-c-500.',
  iron:
    'Founder carousel OI (pinned label truth) Amazon Elements Iron — rice flour. HelloPharmacist / NIH DSLD 203822 Iron 18 mg other-ingredients: Rice Flour, Vegetable Capsule (Hydroxypropyl Methylcellulose), Magnesium Stearate. Do not write Solimo Iron (dead / off-house; same as Elements Iron). No carton UPC harvested.',
  camg:
    'Founder carousel OI (pinned label truth) Amazon Elements Calcium + Magnesium — named palm / MCT coating (NOT gummy High) + silica. Distinct from off-market DSLD 173068 Calcium Complex capsule (rice hull + SiO2 — not this coating panel). No carton UPC harvested.',
} as const;

const METH = {
  seedOilGummies: `Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, safflower, sunflower, vegetable oil). ${GUMMY_OIL_TAP}`,
  seedOilLozenge: `Methodology §5 High-tier (soybean oil in lozenges / cough drops — same seed-oil High as gummies; locked Sept 16, 2026). ${LOZENGE_OIL_TAP}`,
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity). Product display key is caution when this is the worst inactive (Limited-only never Avoid).',
  juiceBase:
    'Methodology §5 Limited-risk (fruit puree / juice concentrate as gummy base — not the Cleared named juice-as-color row)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol, maltitol, mannitol, xylitol oral — GI effects at volume)',
  isomalt: 'Methodology §5 Limited-risk (isomalt — sugar-alcohol neighborhood; locked Sept 15, 2026)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  tapiocaDextrose:
    'Methodology §5 Limited-risk (Tapioca Dextrose / Organic Tapioca Dextrose — sugar / dextrin neighborhood; distinct from Cleared tapioca syrup; locked Sept 16, 2026)',
  peaStarch:
    'Methodology §5 Limited-risk (Pea Starch — unspecified/modified starch neighborhood; locked Sept 16, 2026; distinct from Cleared pea protein isolate)',
  unlabeledMct:
    'Methodology §5 Limited-risk (unlabeled MCT / medium chain triglycerides with no coconut or plant named — opacity; not the Cleared named-MCT coating/fill row)',
  modifiedCellulose:
    'Methodology §5 Limited-risk (unlabeled modified cellulose — unspecified modified cellulose/starch neighborhood; named MCC / HPMC stay Cleared; locked Sept 16, 2026)',
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica / Silica (oral) — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  riceFlour:
    'Methodology §5 Caution (rice flour — exact token; distinct from Cleared rice hull / rice bran; locked Sept 15, 2026)',
  annatto:
    'Methodology §5 Caution (annatto / Organic Annatto Extract (Color) — allergenic; standalone Caution, not additive-scored, not Avoid)',
  betaCarotene:
    'Methodology §5 Caution (beta-carotene as a color additive — exact token; standalone Caution, not Avoid)',
  lanolinAlcohol:
    'Methodology §5 Caution (lanolin alcohol — exact token; same Caution as lanolin / wool-alcohol family; locked Sept 16, 2026; not Avoid)',
  calciumSilicate:
    'Methodology §5 Caution (calcium silicate — silicate anti-caking; not the SiO2 0-pt cap; locked Sept 15, 2026)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as gel / lozenge inactive — fragrance/EO line; locked Sept 15, 2026; not Avoid)',
  cedarleaf:
    'Methodology §5 Caution (cedarleaf oil — exact token; EO / scent line; locked Sept 16, 2026; not Avoid)',
  nutmeg:
    'Methodology §5 Caution (nutmeg oil — exact token; EO / scent line; locked Sept 16, 2026; not Avoid)',
  turpentine:
    'Methodology §5 Caution (spirits of turpentine — exact token; EO / solvent line; locked Sept 16, 2026; not Avoid)',
  thymol:
    'Methodology §5 Caution (thymol — exact INCI; locked Sept 15, 2026; not Avoid)',
  namedColor:
    'Methodology §5 Cleared (black carrot / named fruit-or-vegetable juice as color / maqui / turmeric-as-color)',
  organicFlavor:
    'Methodology §5 Cleared (organic flavors / organic colors — whole-food-derived; not Limited natural flavors)',
  loHan:
    'Methodology §5 Cleared (Lo Han Fruit Concentrate — monk fruit / luo han sibling; locked Sept 16, 2026)',
  inulin:
    'Methodology §5 Cleared (inulin / Chicory Root Fiber / Agave Inulin, Powder — same family; locked Sept 16, 2026)',
  fracCoconut: `Methodology §5 Cleared (Fractionated Coconut Oil / Coconut Oil, Fractionated in a GUMMY — coconut-in-gummy exception, NOT seed-oil High; locked Sept 16, 2026). ${OIL_FILL_TAP}`,
  palmCoat: `Methodology §5 Cleared (Organic Palm Oil / Palm Oil as tablet coating — NOT gummy High; locked Sept 16, 2026). ${OIL_FILL_TAP}`,
  namedMct: `Methodology §5 Cleared (Organic Medium Chain Triglycerides / Medium Chain Triglyceride (MCT) named as tablet/softgel coating or fill — NOT gummy High; locked Sept 16, 2026). ${OIL_FILL_TAP}`,
  safflowerFill: `Methodology §5 Cleared (safflower oil as softgel fill — NOT gummy High; locked Sept 16, 2026). ${OIL_FILL_TAP}`,
  namedCoat:
    'Methodology §5 Cleared (Vegetable Coating NAMED as (HPMC, glycerin) — named-coat row; not the blank Vegetable Coating Caution; locked Sept 16, 2026)',
  oilFill: `Methodology §5 Cleared (named single oil / butter as the topical BASE or FILL — mineral oil / petrolatum neighborhood; tap fill ≠ gummy High). ${OIL_FILL_TAP}`,
  petrolatum:
    'Methodology §5 Cleared (petrolatum / white petrolatum / special petrolatum — topical occlusive; special petrolatum locked Sept 16, 2026)',
  ceresin:
    'Methodology §5 Cleared (ceresin — wax / petrolatum neighborhood; locked Sept 16, 2026)',
  bisabolol:
    'Methodology §5 Cleared (bisabolol — exact INCI; locked Sept 15, 2026 — not flipped to Caution)',
  panthenol: 'Methodology §5 Cleared (panthenol — exact INCI; locked Sept 15, 2026)',
  gums: 'Methodology §5 Cleared (xanthan gum, guar gum, gum arabic / acacia, pectin, gellan gum)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  riceHull:
    'Methodology §5 Cleared (organic rice hull extract / organic Rice hull concentrate — plant-fiber flow agent; distinct from rice flour / SiO2)',
  culture:
    'Methodology §5 Cleared (Culture Media / Cultured Yeast (Molasses, Saccharomyces cerevisiae) — ferment-media family; locked Sept 16, 2026)',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate / vegetable stearate)',
  starch:
    'Methodology §5 Cleared (pregelatinized / corn / potato / tapioca starch / similar simple starches)',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum / powdered cellulose)',
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / glycerine / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / distilled water)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts / malic / lactic / fumaric / adipic / tartaric)',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate / dibasic calcium phosphate — mineral fillers / buffers)',
  sugar:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup / dextrose / sucrose / evaporated cane sugar)',
  lecithin: 'Methodology §5 Cleared (lecithin — canola, soy, or sunflower)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / D-Alpha-Tocopherol as inactive — not tocopheryl acetate)',
  choline: 'Methodology §5 Cleared (choline bitartrate — exact INCI; locked Sept 15, 2026)',
  mineralOil:
    'Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026)',
  cleared: 'Methodology §5 Cleared',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'retailers' | 'recordStatus'> & {
    retailers?: string[];
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return {
    ...opts,
    recordStatus: opts.recordStatus ?? UNVERIFIED,
    retailers: opts.retailers ?? [...AMAZON],
  };
}

const MULTI_ALTS: CleanAlternative[] = [
  alt(
    'pure-encapsulations-one-multivitamin',
    'Independently Clean adult multi analog already on main. Form: capsule vs gummy / tablet — labeled, not a hard filter (§6). Do not invent a Clean Amazon Elements / Basics multi.',
  ),
];

const PRENATAL_ALTS: CleanAlternative[] = [
  alt(
    'we-heart-wholesome-prenatal',
    'Independently Clean prenatal analog already on main. Form: capsule vs gummy / tablet — labeled, not a hard filter (§6). Do not invent a Clean Amazon prenatal.',
  ),
];

const ELDER_ALTS: CleanAlternative[] = [
  alt(
    'wellmade-elderberry',
    'Independently Clean elderberry analog already on main (wellmade Elderberry Plus — HPMC capsule). Form: capsule vs gummy — labeled, not a hard filter (§6). Do not invent a Clean Amazon sambucus gummy.',
  ),
];

const VITAMIN_C_ALTS: CleanAlternative[] = [
  alt(
    'thrive-wellmade-real-food-vitamin-c',
    'Independently Clean whole-food vitamin C analog already on main (named HPMC capsule + rice hull). Form: capsule vs gummy / tablet — labeled, not a hard filter (§6). Do not invent a Clean Amazon Elements C.',
  ),
  alt(
    'pure-encapsulations-ascorbic-acid-1000',
    'Independently Clean ascorbic-acid analog already on main. Form: capsule — labeled, not a hard filter (§6).',
  ),
];

const WOMENS_PRO_ALTS: CleanAlternative[] = [
  alt(
    'thrive-wellmade-womens-daily-probiotic',
    "Independently Clean women's probiotic analog already on main (named cellulose capsule; no SiO2). Form: capsule. Do not invent a Clean Amazon Elements women's probiotic.",
  ),
];

const FIBER_ALTS: CleanAlternative[] = [
  alt(
    'wellmade-organic-acacia-fiber',
    'Independently Clean fiber analog already on main. Form: powder vs gummy — labeled, not a hard filter (§6). Do not invent a Clean Amazon Basics fiber gummy.',
  ),
];

const OMEGA_ALTS: CleanAlternative[] = [
  alt(
    'thrive-wellmade-fish-oil',
    'Independently Clean fish-oil analog already on main (gelatin / glycerin / water / vitamin E; no natural flavor). Form: softgel. Do not invent a Clean Amazon omega gummy.',
  ),
  alt(
    'kirkland-fish-oil-softgels-clear',
    'Independently Clean fish-oil analog already on main (clear softgel). Form: softgel — labeled, not a hard filter (§6).',
  ),
];

const MELATONIN_ALTS: CleanAlternative[] = [
  alt(
    'pure-encapsulations-melatonin-sr-3mg',
    'Independently Clean adult melatonin analog already on main (vegetarian capsule; no SiO2). Form: capsule vs gummy / tablet — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim.',
  ),
];

const KIDS_SLEEP_ALTS: CleanAlternative[] = [
  alt(
    'hylands-4kids-calm-restful',
    "Independently Clean kids Sleep analog already on main (Hyland's 4 Kids Calm / Restful; minAge 2). Form: meltaway tablet vs gummy — labeled, not a hard filter (§6). Different active (homeopathic vs melatonin); cleanliness peer only. Do not invent a Clean Amazon kids melatonin gummy.",
  ),
];

const B12_ALTS: CleanAlternative[] = [
  alt(
    'nature-made-b12-softgels-clear',
    'Independently Clean B12 analog already on main (clear softgel; no flavor). Form: softgel vs lozenge — labeled, not a hard filter (§6).',
  ),
];

const MAG_ALTS: CleanAlternative[] = [
  alt(
    'megafood-magnesium-300-capsules',
    'Independently Clean magnesium analog already on main (HPMC + rice hull + ascorbyl palmitate). Form: capsule. Do not invent a Clean Amazon Elements magnesium.',
  ),
  alt(
    'pure-encapsulations-magnesium-glycinate',
    'Independently Clean magnesium glycinate analog already on main (vegetarian capsule; no SiO2). Form: capsule.',
  ),
];

const TURMERIC_ALTS: CleanAlternative[] = [
  alt(
    'oregons-wild-harvest-turmeric',
    'Independently Clean turmeric analog already on main. Form: capsule. Distinct from amazon-elements-turmeric-complex (Caution). Do not invent a Clean Amazon Elements turmeric root.',
  ),
];

const FIRST_AID_ALTS: CleanAlternative[] = [
  alt(
    'amazon-basic-care-triple-pain-ointment',
    'Independently Clean Amazon Basic Care Triple + Pain (petrolatum only) already on main. Same-store analog. Form: ointment. Distinct from this lanolin-alcohol / chest-rub row.',
  ),
];

const COLD_ALTS: CleanAlternative[] = [
  alt(
    'coldcalm-meltaways',
    'Independently Clean adult Cold & Flu analog already on main (Boiron ColdCalm meltaways). Form labeled, not a hard filter (§6). Cleanliness peer only; not a menthol-lozenge replacement.',
  ),
];

function gummyBaseOrganic(cite: string): IngredientFlag[] {
  return [
    flag('Organic flavors', 'cleared', labelCite(cite, METH.organicFlavor)),
    flag('Organic lemon juice concentrate', 'limited', labelCite(cite, METH.juiceBase)),
    flag(
      'Organic black carrot juice concentrate (color)',
      'cleared',
      labelCite(cite, METH.namedColor),
    ),
    flag(
      'Organic maqui berry juice concentrate (color)',
      'cleared',
      labelCite(cite, METH.namedColor),
    ),
    flag('Organic tapioca syrup', 'cleared', labelCite(cite, METH.sugar)),
    flag('Organic cane sugar', 'cleared', labelCite(cite, METH.sugar)),
    flag('Pectin', 'cleared', labelCite(cite, METH.gums)),
    flag('Sodium citrate', 'cleared', labelCite(cite, METH.citrate)),
    flag('Organic carnauba wax', 'cleared', labelCite(cite, METH.gelatin)),
  ];
}

function tabletWholeFood(cite: string): IngredientFlag[] {
  return [
    flag('Silica', 'cleared', labelCite(cite, METH.sio2)),
    flag('Pea starch', 'limited', labelCite(cite, METH.peaStarch)),
    flag('Tapioca dextrose', 'limited', labelCite(cite, METH.tapiocaDextrose)),
    flag('Tapioca maltodextrin', 'limited', labelCite(cite, METH.maltodextrin)),
    flag(
      'Medium chain triglyceride (MCT)',
      'cleared',
      labelCite(cite, METH.namedMct),
    ),
    flag('Palm oil (tablet coating)', 'cleared', labelCite(cite, METH.palmCoat)),
    flag('Agave inulin, powder', 'cleared', labelCite(cite, METH.inulin)),
    flag('Sunflower lecithin', 'cleared', labelCite(cite, METH.lecithin)),
    flag('Guar gum', 'cleared', labelCite(cite, METH.gums)),
  ];
}

export const BATCH63_KYR6_ELEMENTS_BASICS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: 'amazon-elements-acacia-fiber',
    productName: 'Amazon Elements Acacia Fiber 100% Powder (Previously Revly)',
    brand: ELEMENTS,
    category: DIGESTIVE,
    formulaId: 'amazon-elements-acacia-fiber',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Organic acacia gum (fiber)', strength: '6.5g per tbsp' }],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Acacia Fiber 100% powder (previously Revly) = Clean. No Other Ingredients on the pinned founder-carousel panel. DSLD 300221 prints Other Ingredients: NP (none / not provided) — not an ingredient token. Acacia gum is the labeled fiber active. Pack sizes share this formulaId. Confirm carton. No DailyMed drug SPL. No UPC harvested. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.acacia} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-omega-3-6-9',
    productName: 'Amazon Elements Omega 3-6-9 Softgels (Previously Revly)',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-elements-omega-3-6-9'],
    formulaId: 'amazon-elements-omega-3-6-9',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Omega 3-6-9 (fish / plant oils)', strength: 'label serving' }],
    inactiveIngredients: [
      flag('Gelatin', 'cleared', labelCite(CITE.omega369, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.omega369, METH.glycerin)),
      flag('Water', 'cleared', labelCite(CITE.omega369, METH.water)),
      flag('Mixed tocopherols', 'cleared', labelCite(CITE.omega369, METH.tocopherols)),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Omega 3-6-9 softgels (previously Revly) = Clean. Pinned carousel OI: gelatin, glycerin, water, mixed tocopherols. No natural flavor. Softgel carrier ≠ gummy seed-oil High. ${OIL_FILL_TAP} Distinct from Basics Super Omega-3 (natural lemon flavor Caution; \`amazon-basics-super-omega-3\`). Pack sizes share this formulaId. Confirm carton. No DailyMed drug SPL. No UPC harvested. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.omega369} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-vitamin-d3-5000-softgels',
    productName: 'Amazon Elements Vitamin D3 5000 IU Softgels',
    brand: ELEMENTS,
    category: VITAMINS,
    formulaId: 'amazon-elements-vitamin-d3-5000-softgels',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '125mcg (5000 IU)' },
    ],
    inactiveIngredients: [
      flag('Safflower oil (softgel fill)', 'cleared', labelCite(CITE.d3soft, METH.safflowerFill)),
      flag('Gelatin', 'cleared', labelCite(CITE.d3soft, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.d3soft, METH.glycerin)),
      flag('Water', 'cleared', labelCite(CITE.d3soft, METH.water)),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Vitamin D3 5000 IU softgels = Clean. Safflower fill is Cleared (NOT gummy High; Sept 16 lock). ${OIL_FILL_TAP} Do not write the dead Solimo D3 5000 page. Do not reuse off-market DSLD 203856 (soybean / corn oil — different OI). Pack sizes share this formulaId. Confirm carton. No DailyMed drug SPL. No UPC harvested. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.d3soft} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-b-complex',
    productName: 'Amazon Basics B Complex (Previously Elements)',
    brand: BASICS,
    category: VITAMINS,
    barcode: '842379103612',
    formulaId: 'amazon-basics-b-complex',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [{ name: 'B-complex (cultured yeast)', strength: 'label serving' }],
    inactiveIngredients: [
      flag(
        'Cultured yeast (molasses, Saccharomyces cerevisiae)',
        'cleared',
        labelCite(CITE.bComplex, METH.culture),
      ),
      flag(
        'Vegetable capsule (hydroxypropyl methylcellulose)',
        'cleared',
        labelCite(CITE.bComplex, METH.hpmc),
      ),
      flag(
        'Organic rice hull concentrate',
        'cleared',
        labelCite(CITE.bComplex, METH.riceHull),
      ),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics B Complex (previously Elements) = Clean. Drivers are named HPMC vegetable capsule + organic rice hull concentrate. Cultured yeast / molasses ferment media is Cleared (Sept 16 lock). Do not use DSLD 300208 Organic Whole Food B Complex tablet (silica / palm — different OI / form). Basics previously Elements = one row. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 203786 barcode 842379103612 (65 ct). Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.bComplex} — ${UNVERIFIED_NOTE}`],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: 'amazon-elements-prenatal-dha-d3-gummies',
    productName: 'Amazon Elements Prenatal DHA+D3 Gummies (Previously Revly)',
    brand: ELEMENTS,
    category: PRENATAL,
    formulaId: 'amazon-elements-prenatal-dha-d3-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'DHA (fish oil)', strength: 'label serving' },
      { name: 'Vitamin D3', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(CITE.prenatalGummy, METH.flavors)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Prenatal DHA+D3 gummies (previously Revly) = Caution. No seed oil on the pinned founder-carousel panel. Driver is natural flavors (Limited opacity). ${LIMITED_STACK} Gummy ≠ the DSLD 300218 Prenatal DHA + D3 SOFTGEL (gelatin / glycerine / water; barcode 842379150562) — do not reuse that barcode or OI. Pack sizes share this formulaId. Confirm carton. No DailyMed drug SPL. No gummy UPC harvested. Adults. Draft, not verified.`,
    cleanAlternatives: PRENATAL_ALTS,
    sourcesGeneral: [`${CITE.prenatalGummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-vitamin-c-gummies',
    productName: 'Amazon Elements Vitamin C Gummies (Previously Revly)',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: '842379149641',
    formulaId: 'amazon-elements-vitamin-c-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Vitamin C', strength: '250mg per 2-gummy serving' }],
    inactiveIngredients: [
      flag('Annatto', 'cleared', labelCite(CITE.vitCGummy, METH.annatto)),
      flag('Natural flavors', 'limited', labelCite(CITE.vitCGummy, METH.flavors)),
      flag('Cane sugar', 'cleared', labelCite(CITE.vitCGummy, METH.sugar)),
      flag('Tapioca syrup', 'cleared', labelCite(CITE.vitCGummy, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.vitCGummy, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.vitCGummy, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.vitCGummy, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.vitCGummy, METH.gelatin)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Vitamin C gummies (previously Revly) = Caution. Founder carousel lock is annatto + flavors (no seed-oil High on the carousel panel). Annatto is standalone Caution — not Avoid. Natural flavors are Limited. ${LIMITED_STACK} DSLD 300222 older Revly panel also printed sunflower oil — carousel grade stays Caution; sunflower is not scored on this row. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300222 barcode 842379149641 (70 ct). Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: VITAMIN_C_ALTS,
    sourcesGeneral: [`${CITE.vitCGummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-womens-probiotic',
    productName: "Amazon Elements Women's Probiotic Capsules (Previously Revly)",
    brand: ELEMENTS,
    category: DIGESTIVE,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-elements-womens-probiotic'],
    formulaId: 'amazon-elements-womens-probiotic',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: "Women's probiotic blend", strength: '50 billion CFU' },
    ],
    inactiveIngredients: [
      flag('Silica', 'cleared', labelCite(CITE.womensPro, METH.sio2)),
      flag('Calcium silicate', 'cleared', labelCite(CITE.womensPro, METH.calciumSilicate)),
      flag(
        'Modified cellulose',
        'limited',
        labelCite(CITE.womensPro, METH.modifiedCellulose),
      ),
      flag('Cellulose', 'cleared', labelCite(CITE.womensPro, METH.cellulose)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.womensPro, METH.stearic)),
      flag('Water', 'cleared', labelCite(CITE.womensPro, METH.water)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Women's Probiotic caps (previously Revly) = Caution. Driver is silica (0-pt Caution cap). ${SIO2_TAP} Calcium silicate is standalone Caution (not the Avoid driver). Unlabeled modified cellulose is Limited. ${LIMITED_STACK} Avoid needs High — none on this harvest. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 319251. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: WOMENS_PRO_ALTS,
    sourcesGeneral: [`${CITE.womensPro} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-collagen-complex',
    productName: 'Amazon Elements Collagen Complex (Previously Revly)',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-elements-collagen-complex'],
    formulaId: 'amazon-elements-collagen-complex',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Collagen complex (type II / chondroitin / HA)', strength: '400mg' },
    ],
    inactiveIngredients: [
      flag('Rice flour', 'cleared', labelCite(CITE.collagen, METH.riceFlour)),
      flag('Silicon dioxide (SiO2)', 'cleared', labelCite(CITE.collagen, METH.sio2)),
      flag('Gelatin', 'cleared', labelCite(CITE.collagen, METH.gelatin)),
      flag('Cellulose', 'cleared', labelCite(CITE.collagen, METH.cellulose)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.collagen, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Collagen Complex (previously Revly) = Caution. Drivers are rice flour (Caution) + SiO2 (0-pt Caution cap). ${SIO2_TAP} No High. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 319236. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.collagen} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-fish-oil-gummies',
    productName: 'Amazon Basics Fish Oil Gummies (Previously Solimo)',
    brand: BASICS,
    category: VITAMINS,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-basics-fish-oil-gummies'],
    formulaId: 'amazon-basics-fish-oil-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Fish oil (tuna)', strength: '303mg per 2-gummy serving' },
    ],
    inactiveIngredients: [
      flag(
        'Coconut oil, fractionated',
        'cleared',
        labelCite(CITE.fishGummy, METH.fracCoconut),
      ),
      flag('Annatto extract', 'cleared', labelCite(CITE.fishGummy, METH.annatto)),
      flag('Natural flavors', 'limited', labelCite(CITE.fishGummy, METH.flavors)),
      flag(
        'Purple carrot juice concentrate',
        'cleared',
        labelCite(CITE.fishGummy, METH.namedColor),
      ),
      flag('Turmeric extract (color)', 'cleared', labelCite(CITE.fishGummy, METH.namedColor)),
      flag('Glucose syrup', 'cleared', labelCite(CITE.fishGummy, METH.sugar)),
      flag('Sucrose', 'cleared', labelCite(CITE.fishGummy, METH.sugar)),
      flag('Gelatin', 'cleared', labelCite(CITE.fishGummy, METH.gelatin)),
      flag('Pectin', 'cleared', labelCite(CITE.fishGummy, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.fishGummy, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.fishGummy, METH.gelatin)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Fish Oil gummies (previously Solimo) = Caution. Fractionated coconut in a gummy is NOT seed-oil High (Sept 16 coconut-in-gummy exception). Drivers are annatto (standalone Caution) + natural flavors (Limited). ${LIMITED_STACK} Do not write Solimo Fish Oil 1000 (dead / off-house). Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 318718. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Contains fish (tuna). Draft, not verified.`,
    cleanAlternatives: OMEGA_ALTS,
    sourcesGeneral: [`${CITE.fishGummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-womens-one-daily-gummies',
    productName: "Amazon Basics Women's One Daily Gummies (Previously Solimo)",
    brand: BASICS,
    category: VITAMINS,
    barcode: '842379157097',
    formulaId: 'amazon-basics-womens-one-daily-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [{ name: "Women's multivitamin", strength: 'label serving' }],
    inactiveIngredients: [
      flag(
        'Coconut oil, fractionated',
        'cleared',
        labelCite(CITE.womensGummyDaily, METH.fracCoconut),
      ),
      flag('Annatto', 'cleared', labelCite(CITE.womensGummyDaily, METH.annatto)),
      flag('Natural flavors', 'limited', labelCite(CITE.womensGummyDaily, METH.flavors)),
      flag(
        'Purple carrot juice concentrate',
        'cleared',
        labelCite(CITE.womensGummyDaily, METH.namedColor),
      ),
      flag(
        'Maqui berry juice concentrate',
        'cleared',
        labelCite(CITE.womensGummyDaily, METH.namedColor),
      ),
      flag('Tapioca syrup', 'cleared', labelCite(CITE.womensGummyDaily, METH.sugar)),
      flag('Sucrose', 'cleared', labelCite(CITE.womensGummyDaily, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.womensGummyDaily, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.womensGummyDaily, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.womensGummyDaily, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.womensGummyDaily, METH.gelatin)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Women's One Daily gummies (previously Solimo) = Caution. Fractionated coconut in a gummy is NOT High. Drivers are annatto + natural flavors. ${LIMITED_STACK} Gummy ≠ Basics Women's One Daily tablets. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300224. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [`${CITE.womensGummyDaily} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-adult-one-daily-gummies',
    productName: 'Amazon Basics Adult One Daily Gummies (Previously Solimo)',
    brand: BASICS,
    category: VITAMINS,
    barcode: '195515034494',
    formulaId: 'amazon-basics-adult-one-daily-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Adult multivitamin', strength: 'label serving' }],
    inactiveIngredients: [
      flag(
        'Fractionated coconut oil',
        'cleared',
        labelCite(CITE.adultGummyDaily, METH.fracCoconut),
      ),
      flag('Natural flavors', 'limited', labelCite(CITE.adultGummyDaily, METH.flavors)),
      flag(
        'Purple carrot juice concentrate',
        'cleared',
        labelCite(CITE.adultGummyDaily, METH.namedColor),
      ),
      flag(
        'Maqui berry juice concentrate',
        'cleared',
        labelCite(CITE.adultGummyDaily, METH.namedColor),
      ),
      flag('Tapioca syrup', 'cleared', labelCite(CITE.adultGummyDaily, METH.sugar)),
      flag('Sucrose', 'cleared', labelCite(CITE.adultGummyDaily, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.adultGummyDaily, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.adultGummyDaily, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.adultGummyDaily, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.adultGummyDaily, METH.gelatin)),
      flag('Choline bitartrate', 'cleared', labelCite(CITE.adultGummyDaily, METH.choline)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Adult One Daily gummies (previously Solimo) = Caution. Fractionated coconut in a gummy is NOT High. Driver is natural flavors (Limited). ${LIMITED_STACK} Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300223. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [`${CITE.adultGummyDaily} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-probiotic-5b',
    productName: 'Amazon Basics Probiotic 5 Billion Capsules (Previously Solimo)',
    brand: BASICS,
    category: DIGESTIVE,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-basics-probiotic-5b'],
    formulaId: 'amazon-basics-probiotic-5b',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Probiotic blend', strength: '5 billion CFU' }],
    inactiveIngredients: [
      flag('Silica', 'cleared', labelCite(CITE.pro5b, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Probiotic 5B caps (previously Solimo) = Caution. Driver is silica (0-pt Caution cap). ${SIO2_TAP} No standalone Basics / Solimo probiotic DSLD label harvested — remaining OI not invented. Pack sizes share this formulaId. Confirm carton. No DailyMed drug SPL. No UPC harvested. Adults. Draft, not verified.`,
    cleanAlternatives: WOMENS_PRO_ALTS,
    sourcesGeneral: [`${CITE.pro5b} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-super-omega-3',
    productName: 'Amazon Basics Super Omega-3 Softgels (Previously Elements)',
    brand: BASICS,
    category: VITAMINS,
    barcode: '842379150678',
    formulaId: 'amazon-basics-super-omega-3',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Fish oil omega-3 (EPA / DHA)', strength: '1280mg omega-3s per 2 softgels' },
    ],
    inactiveIngredients: [
      flag('Natural lemon flavor', 'limited', labelCite(CITE.superO3, METH.flavors)),
      flag('Gelatin', 'cleared', labelCite(CITE.superO3, METH.gelatin)),
      flag('Glycerin', 'cleared', labelCite(CITE.superO3, METH.glycerin)),
      flag('Water', 'cleared', labelCite(CITE.superO3, METH.water)),
      flag('D-Alpha tocopherol', 'cleared', labelCite(CITE.superO3, METH.tocopherols)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Super Omega-3 softgels (previously Elements / Revly) = Caution. Driver is natural lemon flavor (Limited opacity). ${LIMITED_STACK} Softgel carrier / D-Alpha-Tocopherol ≠ gummy High. Distinct from Elements Omega 3-6-9 (no flavor; Clean). Basics previously Elements = one row. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300219 barcode 842379150678 (90 ct). Confirm carton. No DailyMed drug SPL. Adults. Contains fish. Draft, not verified.`,
    cleanAlternatives: OMEGA_ALTS,
    sourcesGeneral: [`${CITE.superO3} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-womens-one-daily-tablets',
    productName: "Amazon Basics Women's One Daily Tablets (Previously Elements)",
    brand: BASICS,
    category: VITAMINS,
    formulaId: 'amazon-basics-womens-one-daily-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [{ name: "Women's whole-food multivitamin", strength: 'label serving' }],
    inactiveIngredients: tabletWholeFood(CITE.womensTab),
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Women's One Daily tablets (previously Elements) = Caution. Driver is silica (0-pt Caution cap). ${SIO2_TAP} Palm oil as tablet coating + named MCT coating are Cleared (NOT gummy High). ${OIL_FILL_TAP} Pea starch / tapioca dextrose / tapioca maltodextrin are Limited — not needed to reach Caution. ${LIMITED_STACK} Gummy ≠ tablet. Basics previously Elements = one row. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300212. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [`${CITE.womensTab} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-mens-one-daily-tablets',
    productName: "Amazon Basics Men's One Daily Tablets (Previously Elements)",
    brand: BASICS,
    category: VITAMINS,
    formulaId: 'amazon-basics-mens-one-daily-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [{ name: "Men's whole-food multivitamin", strength: 'label serving' }],
    inactiveIngredients: tabletWholeFood(CITE.mensTab),
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Men's One Daily tablets (previously Elements) = Caution. Driver is silica (0-pt Caution cap). ${SIO2_TAP} Palm / named MCT tablet coating ≠ gummy High. Gummy ≠ tablet. Basics previously Elements = one row. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300210. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [`${CITE.mensTab} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-prenatal-tablets',
    productName: 'Amazon Basics Prenatal Tablets (Previously Elements)',
    brand: BASICS,
    category: PRENATAL,
    formulaId: 'amazon-basics-prenatal-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Prenatal whole-food multivitamin', strength: 'label serving' }],
    inactiveIngredients: tabletWholeFood(CITE.prenatalTab),
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Prenatal tablets (previously Elements) = Caution. Driver is silica (0-pt Caution cap). ${SIO2_TAP} Palm / named MCT tablet coating ≠ gummy High. Distinct from Prenatal DHA+D3 gummies. Basics previously Elements = one row. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300211. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: PRENATAL_ALTS,
    sourcesGeneral: [`${CITE.prenatalTab} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-b12-5000-lozenges',
    productName: 'Amazon Elements B12 5000 mcg Lozenges',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: '842379103674',
    formulaId: 'amazon-elements-b12-5000-lozenges',
    audience: ADULT,
    minAge: 18,
    form: 'lozenge',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin B12 (methylcobalamin)', strength: '5000mcg' },
    ],
    inactiveIngredients: [
      flag('Natural raspberry flavor', 'limited', labelCite(CITE.b12, METH.flavors)),
      flag('Natural berry flavor', 'limited', labelCite(CITE.b12, METH.flavors)),
      flag('Xylitol', 'limited', labelCite(CITE.b12, METH.sorbitol)),
      flag('Mannitol', 'limited', labelCite(CITE.b12, METH.sorbitol)),
      flag('Stearic acid (C18:0)', 'cleared', labelCite(CITE.b12, METH.stearic)),
      flag('Citric acid', 'cleared', labelCite(CITE.b12, METH.citrate)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.b12, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements B12 5000 mcg lozenges = Caution. Drivers are natural raspberry / berry flavors (Limited) + xylitol / mannitol (Limited sugar alcohols). ${LIMITED_STACK} Avoid needs High — none on this harvest. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 203788 barcode 842379103674 (65 ct). Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: B12_ALTS,
    sourcesGeneral: [`${CITE.b12} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-melatonin-3-tablets',
    productName: 'Amazon Elements Melatonin 3 mg Tablets',
    brand: ELEMENTS,
    category: SLEEP,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-elements-melatonin-3-tablets'],
    formulaId: 'amazon-elements-melatonin-3-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '3mg' }],
    inactiveIngredients: [
      flag('Silicon dioxide (SiO2)', 'cleared', labelCite(CITE.mel3, METH.sio2)),
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.mel3, METH.cellulose)),
      flag('Dicalcium phosphate (DCP)', 'cleared', labelCite(CITE.mel3, METH.dical)),
      flag('Stearic acid', 'cleared', labelCite(CITE.mel3, METH.stearic)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.mel3, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Melatonin 3 mg tablets = Caution. Driver is SiO2 (0-pt Caution cap). ${SIO2_TAP} Distinct from amazon-elements-melatonin-5 capsules and from Basics Melatonin 5 mg gummies (gummy ≠ tablet). Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 337373. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Cleanliness only; no efficacy claim. Draft, not verified.`,
    cleanAlternatives: MELATONIN_ALTS,
    sourcesGeneral: [`${CITE.mel3} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-chelated-magnesium',
    productName: 'Amazon Elements Chelated Magnesium',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: '842379146244',
    formulaId: 'amazon-elements-chelated-magnesium',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Chelated magnesium', strength: '270mg' }],
    inactiveIngredients: [
      flag('Silicon dioxide (SiO2)', 'cleared', labelCite(CITE.mag, METH.sio2)),
      flag(
        'Vegetable coating (glycerin, hydroxypropyl methylcellulose)',
        'cleared',
        labelCite(CITE.mag, METH.namedCoat),
      ),
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.mag, METH.cellulose)),
      flag('Stearic acid (C18:0)', 'cleared', labelCite(CITE.mag, METH.stearic)),
      flag('Croscarmellose sodium', 'cleared', labelCite(CITE.mag, METH.cellulose)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.mag, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Chelated Magnesium = Caution. Driver is SiO2 (0-pt Caution cap). ${SIO2_TAP} Named vegetable coating (HPMC, glycerin) is Cleared (Sept 16 named-coat row). Do not write Elements Mg lemon powder (Micro Ingredients / off-house). Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 203803. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: MAG_ALTS,
    sourcesGeneral: [`${CITE.mag} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-turmeric-root',
    productName: 'Amazon Elements Turmeric Root',
    brand: ELEMENTS,
    category: PAIN_FEVER,
    formulaId: 'amazon-elements-turmeric-root',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Turmeric root powder', strength: '500mg' }],
    inactiveIngredients: [
      flag('Silicon dioxide (SiO2)', 'cleared', labelCite(CITE.turmericRoot, METH.sio2)),
      flag(
        'Vegetable capsule (hydroxypropyl methylcellulose)',
        'cleared',
        labelCite(CITE.turmericRoot, METH.hpmc),
      ),
      flag(
        'Organic rice hull concentrate',
        'cleared',
        labelCite(CITE.turmericRoot, METH.riceHull),
      ),
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.turmericRoot, METH.cellulose)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.turmericRoot, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Turmeric Root = Caution. Driver is SiO2 (0-pt Caution cap). ${SIO2_TAP} Distinct from amazon-elements-turmeric-complex already on main (different actives / OI). Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 173065. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.turmericRoot} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-vitamin-c-1000-tablets',
    productName: 'Amazon Elements Vitamin C 1000 mg Tablets',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: '842379103643',
    formulaId: 'amazon-elements-vitamin-c-1000-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Vitamin C (ascorbic acid)', strength: '1000mg' }],
    inactiveIngredients: [
      flag('Silicon dioxide (SiO2)', 'cleared', labelCite(CITE.vitC1000, METH.sio2)),
      flag(
        'Vegetable coating (glycerin, hydroxypropyl methylcellulose)',
        'cleared',
        labelCite(CITE.vitC1000, METH.namedCoat),
      ),
      flag('Microcrystalline cellulose', 'cleared', labelCite(CITE.vitC1000, METH.cellulose)),
      flag('Stearic acid (C18:0)', 'cleared', labelCite(CITE.vitC1000, METH.stearic)),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.vitC1000, METH.stearic)),
      flag('Croscarmellose sodium', 'cleared', labelCite(CITE.vitC1000, METH.cellulose)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Vitamin C 1000 mg tablets = Caution. Driver is SiO2 (0-pt Caution cap). ${SIO2_TAP} Distinct from amazon-elements-whole-food-vitamin-c-500 (modified cellulose + rice powder) already on main. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 203855 barcode 842379103643 (300 ct). Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: VITAMIN_C_ALTS,
    sourcesGeneral: [`${CITE.vitC1000} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-iron',
    productName: 'Amazon Elements Iron',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: '842379103094',
    formulaId: 'amazon-elements-iron',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Iron', strength: '18mg' }],
    inactiveIngredients: [
      flag('Rice flour', 'cleared', labelCite(CITE.iron, METH.riceFlour)),
      flag(
        'Vegetable capsule (hydroxypropyl methylcellulose)',
        'cleared',
        labelCite(CITE.iron, METH.hpmc),
      ),
      flag('Magnesium stearate', 'cleared', labelCite(CITE.iron, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Iron = Caution. Driver is rice flour (Caution; distinct from Cleared rice hull). Do not write Solimo Iron (dead / off-house; same as Elements Iron). Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 203822 (18 mg label). No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.iron} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-calcium-magnesium',
    productName: 'Amazon Elements Calcium + Magnesium',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-elements-calcium-magnesium'],
    formulaId: 'amazon-elements-calcium-magnesium',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Calcium', strength: 'label serving' },
      { name: 'Magnesium', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Silica', 'cleared', labelCite(CITE.camg, METH.sio2)),
      flag('Palm oil (tablet coating)', 'cleared', labelCite(CITE.camg, METH.palmCoat)),
      flag(
        'Medium chain triglyceride (MCT) (coating)',
        'cleared',
        labelCite(CITE.camg, METH.namedMct),
      ),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Calcium + Magnesium = Caution. Driver is silica (0-pt Caution cap). ${SIO2_TAP} Named palm / MCT coating is Cleared (NOT gummy High). ${OIL_FILL_TAP} Distinct from off-market DSLD 173068 Calcium Complex capsule (rice hull + SiO2 — different panel). Pack sizes share this formulaId. Confirm carton. No DailyMed drug SPL. No UPC harvested. Adults. Draft, not verified.`,
    cleanAlternatives: MAG_ALTS,
    sourcesGeneral: [`${CITE.camg} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-advanced-healing-ointment',
    productName: 'Amazon Basics Advanced Healing Ointment (72288-247, 14 oz)',
    brand: BASICS,
    category: FIRST_AID,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-basics-advanced-healing-ointment'],
    formulaId: 'amazon-basics-advanced-healing-ointment',
    audience: ADULT,
    minAge: 0,
    form: 'ointment',
    productType: OTC,
    activeIngredients: [{ name: 'Petrolatum', strength: '41%' }],
    inactiveIngredients: [
      flag('Lanolin alcohol', 'cleared', dailymed(SET.heal, METH.lanolinAlcohol)),
      flag('Mineral oil', 'cleared', dailymed(SET.heal, METH.mineralOil)),
      flag('Ceresin', 'cleared', dailymed(SET.heal, METH.ceresin)),
      flag('Panthenol', 'cleared', dailymed(SET.heal, METH.panthenol)),
      flag('Glycerin', 'cleared', dailymed(SET.heal, METH.glycerin)),
      flag('Bisabolol', 'cleared', dailymed(SET.heal, METH.bisabolol)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Advanced Healing Ointment NDC 72288-247 = Caution. Driver is lanolin alcohol (Caution; wool-alcohol family; Sept 16 lock). Ceresin is Cleared. Bisabolol stays Cleared (already locked Sept 15 — not flipped). DailyMed setid cdf1bd12 Drug Facts: mineral oil, ceresin, lanolin alcohol, panthenol, glycerin, bisabolol. Structured SPL calls bisabolol LEVOMENOL / lanolin alcohol LANOLIN ALCOHOLS — Drug Facts wording is the authority. Pack sizes 72288-247-17 / 72288-247-41 share this formulaId. Solimo / Amazon Essentials cartons on this setid are the same formula (Basics previously Solimo = one row). Skin-protectant / diaper-rash directions have no lower-age floor (minAge 0). Draft, not verified.`,
    cleanAlternatives: FIRST_AID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.heal} (Amazon Basics Advanced Healing Ointment NDC 72288-247; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basics-chest-rub',
    productName: 'Amazon Basics Chest Rub (72288-248)',
    brand: BASICS,
    category: COLD_FLU,
    barcode: '195515034692',
    formulaId: 'amazon-basics-chest-rub',
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    activeIngredients: [
      { name: 'Camphor', strength: '4.8%' },
      { name: 'Eucalyptus oil', strength: '1.2%' },
      { name: 'Menthol', strength: '2.6%' },
    ],
    inactiveIngredients: [
      flag('Cedarleaf oil', 'cleared', dailymed(SET.chest, METH.cedarleaf)),
      flag('Nutmeg oil', 'cleared', dailymed(SET.chest, METH.nutmeg)),
      flag('Spirits of turpentine', 'cleared', dailymed(SET.chest, METH.turpentine)),
      flag('Thymol', 'cleared', dailymed(SET.chest, METH.thymol)),
      flag('Special petrolatum', 'cleared', dailymed(SET.chest, METH.petrolatum)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Chest Rub NDC 72288-248 = Caution. Drivers are cedarleaf oil / nutmeg oil / spirits of turpentine / thymol (EO / scent / solvent Caution; Sept 16 / Sept 15 locks). Special petrolatum is Cleared (petrolatum neighborhood). No High. DailyMed setid 673996ab Drug Facts: cedarleaf oil, nutmeg oil, special petrolatum, spirits of turpentine, thymol. Camphor / eucalyptus oil / menthol are labeled actives — ${PARKED_RUB} Pack sizes 72288-248-17 / 72288-248-75 share this formulaId. Solimo carton on this setid is the same formula (Basics previously Solimo = one row). Ages 2+ (under 2: ask a doctor). Draft, not verified.`,
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.chest} (Amazon Basics Chest Rub NDC 72288-248; ${UNVERIFIED_NOTE})`,
    ],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: 'amazon-elements-mens-multi-gummies',
    productName: "Amazon Elements Men's Multi Gummies (Previously Revly)",
    brand: ELEMENTS,
    category: VITAMINS,
    formulaId: 'amazon-elements-mens-multi-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [{ name: "Men's multivitamin", strength: '3 gummies' }],
    inactiveIngredients: [
      flag('Organic sunflower oil', 'high', labelCite(CITE.mensGummy, METH.seedOilGummies)),
      ...gummyBaseOrganic(CITE.mensGummy),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Men's Multi Gummies (previously Revly) = Avoid. Organic sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} Organic flavors are Cleared. Lemon juice concentrate is the Limited gummy-base row — not needed to reach Avoid. Gummy ≠ Basics Men's One Daily tablets. Pack sizes share this formulaId. No carton UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. ${ZINC_PARKED} Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [`${CITE.mensGummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-womens-multi-gummies',
    productName: "Amazon Elements Women's Multi Gummies (Previously Revly)",
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-elements-womens-multi-gummies'],
    formulaId: 'amazon-elements-womens-multi-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [{ name: "Women's multivitamin", strength: '3 gummies' }],
    inactiveIngredients: [
      flag('Organic sunflower oil', 'high', labelCite(CITE.womensGummy, METH.seedOilGummies)),
      ...gummyBaseOrganic(CITE.womensGummy),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Women's Multi Gummies (previously Revly) = Avoid. Organic sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} Gummy ≠ Basics Women's One Daily tablets / gummies. Pack sizes share this formulaId. No carton UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. ${ZINC_PARKED} Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [`${CITE.womensGummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-sambucus-gummies',
    productName: 'Amazon Elements Sambucus Gummies (Previously Revly)',
    brand: ELEMENTS,
    category: IMMUNE,
    barcode: '842379151743',
    formulaId: 'amazon-elements-sambucus-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Elderberry powder blend', strength: '300mg per 2-gummy serving' },
      { name: 'Vitamin C', strength: '180mg' },
      { name: 'Zinc', strength: '2mg' },
    ],
    inactiveIngredients: [
      flag('Sunflower oil', 'high', labelCite(CITE.sambucus, METH.seedOilGummies)),
      flag('Natural flavors', 'limited', labelCite(CITE.sambucus, METH.flavors)),
      flag('Sugar', 'cleared', labelCite(CITE.sambucus, METH.sugar)),
      flag('Tapioca syrup', 'cleared', labelCite(CITE.sambucus, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.sambucus, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.sambucus, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.sambucus, METH.citrate)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Sambucus gummies (previously Revly) = Avoid. Sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} DSLD 273234 omitted sunflower oil; founder carousel is the authority. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 273234 barcode 842379151743 (60 ct). Confirm carton. No DailyMed drug SPL. Adults. ${ZINC_PARKED} Draft, not verified.`,
    cleanAlternatives: ELDER_ALTS,
    sourcesGeneral: [`${CITE.sambucus} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-elements-biotin-gummies',
    productName: 'Amazon Elements Biotin Gummies (Previously Revly)',
    brand: ELEMENTS,
    category: VITAMINS,
    barcode: '842379149535',
    formulaId: 'amazon-elements-biotin-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Biotin', strength: '2500mcg per 2-gummy serving' }],
    inactiveIngredients: [
      flag('Sunflower oil', 'high', labelCite(CITE.biotinGummy, METH.seedOilGummies)),
      flag('Natural flavors', 'limited', labelCite(CITE.biotinGummy, METH.flavors)),
      flag(
        'Black carrot juice concentrate',
        'cleared',
        labelCite(CITE.biotinGummy, METH.namedColor),
      ),
      flag('Cane sugar', 'cleared', labelCite(CITE.biotinGummy, METH.sugar)),
      flag('Tapioca syrup', 'cleared', labelCite(CITE.biotinGummy, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.biotinGummy, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.biotinGummy, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.biotinGummy, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.biotinGummy, METH.gelatin)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Elements Biotin gummies (previously Revly) = Avoid. Sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} Distinct from amazon-elements-biotin-5000 capsules (gummy ≠ capsule). Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300220 barcode 842379149535 (60 ct). Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.biotinGummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-fiber-gummies',
    productName: 'Amazon Basics Fiber Gummies (Previously Solimo)',
    brand: BASICS,
    category: DIGESTIVE,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-basics-fiber-gummies'],
    formulaId: 'amazon-basics-fiber-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Chicory root fiber (inulin)', strength: '4g per 2-gummy serving' },
    ],
    inactiveIngredients: [
      flag('Sunflower oil', 'high', labelCite(CITE.fiberGummy, METH.seedOilGummies)),
      flag('Annatto extract', 'cleared', labelCite(CITE.fiberGummy, METH.annatto)),
      flag('Natural flavors', 'limited', labelCite(CITE.fiberGummy, METH.flavors)),
      flag('Lo Han fruit concentrate', 'cleared', labelCite(CITE.fiberGummy, METH.loHan)),
      flag(
        'Black carrot juice concentrate',
        'cleared',
        labelCite(CITE.fiberGummy, METH.namedColor),
      ),
      flag('Turmeric extract (color)', 'cleared', labelCite(CITE.fiberGummy, METH.namedColor)),
      flag('Cane sugar', 'cleared', labelCite(CITE.fiberGummy, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.fiberGummy, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.fiberGummy, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.fiberGummy, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.fiberGummy, METH.gelatin)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Fiber gummies (previously Solimo) = Avoid. Sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} Lo Han Fruit Concentrate is Cleared. Annatto is standalone Caution — not the Avoid driver. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 298942. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    cleanAlternatives: FIBER_ALTS,
    sourcesGeneral: [`${CITE.fiberGummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-melatonin-5-gummies',
    productName: 'Amazon Basics Melatonin 5 mg Gummies (Previously Solimo)',
    brand: BASICS,
    category: SLEEP,
    barcode: BATCH63_CATCHUP_BARCODES['amazon-basics-melatonin-5-gummies'],
    formulaId: 'amazon-basics-melatonin-5-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '5mg per 2-gummy serving' }],
    inactiveIngredients: [
      flag('Sunflower oil', 'high', labelCite(CITE.mel5Gummy, METH.seedOilGummies)),
      flag('Natural flavors', 'limited', labelCite(CITE.mel5Gummy, METH.flavors)),
      flag(
        'Black carrot juice concentrate',
        'cleared',
        labelCite(CITE.mel5Gummy, METH.namedColor),
      ),
      flag('Tapioca syrup', 'cleared', labelCite(CITE.mel5Gummy, METH.sugar)),
      flag('Sugar', 'cleared', labelCite(CITE.mel5Gummy, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.mel5Gummy, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.mel5Gummy, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.mel5Gummy, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.mel5Gummy, METH.gelatin)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Melatonin 5 mg gummies (previously Solimo) = Avoid. Sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} Distinct from amazon-elements-melatonin-5 capsules and from Elements Melatonin 3 mg tablets (gummy ≠ tablet / capsule). Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 318722. No UPC harvested. Confirm carton. No DailyMed drug SPL. Adults (carton: not for under 18). Cleanliness only; no efficacy claim. Draft, not verified.`,
    cleanAlternatives: MELATONIN_ALTS,
    sourcesGeneral: [`${CITE.mel5Gummy} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basics-kids-melatonin-1-gummies',
    productName: 'Amazon Basics Kids Melatonin 1 mg Gummies',
    brand: BASICS,
    category: SLEEP,
    formulaId: 'amazon-basics-kids-melatonin-1-gummies',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '1mg' }],
    inactiveIngredients: [
      flag('Sunflower oil', 'high', labelCite(CITE.kidsMel, METH.seedOilGummies)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basics Kids Melatonin 1 mg gummies = Avoid. Sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} No public DSLD OI page harvested — remaining panel not invented. Distinct from adult Basics Melatonin 5 mg gummies (own formulaId; kids ≠ adult). Pack sizes share this formulaId. No UPC harvested. Confirm carton. No DailyMed drug SPL. Ages 4+ typical kids-melatonin chart (confirm carton). Cleanliness only; no efficacy claim. Draft, not verified.`,
    cleanAlternatives: KIDS_SLEEP_ALTS,
    sourcesGeneral: [`${CITE.kidsMel} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'amazon-basic-care-sf-honey-lemon-cough-drops',
    productName: 'Amazon Basic Care Sugar-Free Honey Lemon Cough Drops',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: '195515027212',
    formulaId: 'amazon-basic-care-sf-honey-lemon-cough-drops',
    audience: ADULT,
    minAge: 5,
    form: 'lozenge',
    productType: OTC,
    activeIngredients: [{ name: 'Menthol', strength: '7.6mg' }],
    inactiveIngredients: [
      flag('Soybean oil', 'high', dailymed(SET.honey, METH.seedOilLozenge)),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.honey, METH.eucalyptus)),
      flag('Beta carotene', 'cleared', dailymed(SET.honey, METH.betaCarotene)),
      flag('Acesulfame potassium', 'moderate', dailymed(SET.honey, METH.acek)),
      flag('Sucralose', 'moderate', dailymed(SET.honey, METH.sucralose)),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed(SET.honey, METH.flavors),
      ),
      flag('Isomalt', 'limited', dailymed(SET.honey, METH.isomalt)),
      flag('Maltitol syrup', 'limited', dailymed(SET.honey, METH.sorbitol)),
      flag(
        'Medium chain triglycerides',
        'limited',
        dailymed(SET.honey, METH.unlabeledMct),
      ),
      flag('Corn starch', 'cleared', dailymed(SET.honey, METH.starch)),
      flag('Glycerine', 'cleared', dailymed(SET.honey, METH.glycerin)),
      flag('Water', 'cleared', dailymed(SET.honey, METH.water)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basic Care Sugar-Free Honey Lemon Cough Drops NDC 72288-236 = Avoid. Lozenge soybean oil is High (Sept 16 founder lock). ${LOZENGE_OIL_TAP} Eucalyptus oil is standalone Caution — not the Avoid driver. Menthol is a parked active. DailyMed setid cf82fb0b Drug Facts: Acesulfame potassium, beta carotene, corn starch, eucalyptus oil, glycerine, isomalt, maltitol syrup, medium chain triglycerides, natural and artificial flavors, soybean oil, sucralose and water. Unlabeled MCT is Limited. Pack sizes share this formulaId. Ages 5+ (under 5: ask a doctor). Draft, not verified.`,
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.honey} (Amazon Basic Care SF Honey Lemon Cough Drops NDC 72288-236; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-cherry-menthol-cough-drops',
    productName: 'Amazon Basic Care Cherry Menthol Cough Drops',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: '195515006408',
    formulaId: 'amazon-basic-care-cherry-menthol-cough-drops',
    audience: ADULT,
    minAge: 5,
    form: 'lozenge',
    productType: OTC,
    activeIngredients: [{ name: 'Menthol', strength: '5.8mg' }],
    inactiveIngredients: [
      flag('Soybean oil', 'high', dailymed(SET.cherry, METH.seedOilLozenge)),
      flag('FD&C Red No. 40', 'high', dailymed(SET.cherry, METH.dyes)),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.cherry, METH.eucalyptus)),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed(SET.cherry, METH.flavors),
      ),
      flag(
        'Medium chain triglycerides',
        'limited',
        dailymed(SET.cherry, METH.unlabeledMct),
      ),
      flag('Corn starch', 'cleared', dailymed(SET.cherry, METH.starch)),
      flag('Corn syrup', 'cleared', dailymed(SET.cherry, METH.sugar)),
      flag('Glycerin', 'cleared', dailymed(SET.cherry, METH.glycerin)),
      flag('Sucrose', 'cleared', dailymed(SET.cherry, METH.sugar)),
      flag('Water', 'cleared', dailymed(SET.cherry, METH.water)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basic Care Cherry Menthol Cough Drops NDC 72288-231 = Avoid. Lozenge soybean oil + Red 40 are High. ${LOZENGE_OIL_TAP} Eucalyptus oil is standalone Caution — not needed to reach Avoid. DailyMed setid c0588221 Drug Facts: Corn starch, corn syrup, eucalyptus oil, FD&C red no. 40, glycerin, medium chain triglycerides, natural and artificial flavors, soybean oil, sucrose and water. Own formulaId — do not merge with the sugar-free twins. Pack sizes share this formulaId. Ages 5+. Draft, not verified.`,
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.cherry} (Amazon Basic Care Cherry Menthol Cough Drops NDC 72288-231; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-sf-menthol-cough-drops',
    productName: 'Amazon Basic Care Sugar-Free Menthol Cough Drops',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: '195515006422',
    formulaId: 'amazon-basic-care-sf-menthol-cough-drops',
    audience: ADULT,
    minAge: 5,
    form: 'lozenge',
    productType: OTC,
    activeIngredients: [{ name: 'Menthol', strength: '5.8mg' }],
    inactiveIngredients: [
      flag('Soybean oil', 'high', dailymed(SET.sfMenthol, METH.seedOilLozenge)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET.sfMenthol, METH.dyes)),
      flag('FD&C Red No. 40', 'high', dailymed(SET.sfMenthol, METH.dyes)),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.sfMenthol, METH.eucalyptus)),
      flag('Acesulfame potassium', 'moderate', dailymed(SET.sfMenthol, METH.acek)),
      flag('Sucralose', 'moderate', dailymed(SET.sfMenthol, METH.sucralose)),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed(SET.sfMenthol, METH.flavors),
      ),
      flag('Isomalt', 'limited', dailymed(SET.sfMenthol, METH.isomalt)),
      flag('Maltitol syrup', 'limited', dailymed(SET.sfMenthol, METH.sorbitol)),
      flag(
        'Medium chain triglycerides',
        'limited',
        dailymed(SET.sfMenthol, METH.unlabeledMct),
      ),
      flag('Potassium sorbate', 'limited', dailymed(SET.sfMenthol, METH.benzoate)),
      flag('Corn starch', 'cleared', dailymed(SET.sfMenthol, METH.starch)),
      flag('Gum arabic', 'cleared', dailymed(SET.sfMenthol, METH.gums)),
      flag('Glycerin', 'cleared', dailymed(SET.sfMenthol, METH.glycerin)),
      flag('Water', 'cleared', dailymed(SET.sfMenthol, METH.water)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Amazon Basic Care Sugar-Free Menthol Cough Drops NDC 72288-233 = Avoid. Lozenge soybean oil + Blue 1 + Red 40 are High. ${LOZENGE_OIL_TAP} Eucalyptus oil is standalone Caution — not needed to reach Avoid. DailyMed setid c0946295 Drug Facts: Acesulfame potassium, corn starch, eucalyptus oil, FD&C blue no. 1, FD&C red no. 40, glycerin, gum arabic, isomalt, maltitol syrup, medium chain triglycerides, natural and artificial flavors, potassium sorbate, soybean oil, sucralose and water. Own formulaId — do not merge with honey-lemon SF or cherry. Pack sizes share this formulaId. Ages 5+. Draft, not verified.`,
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.sfMenthol} (Amazon Basic Care SF Menthol Cough Drops NDC 72288-233; ${UNVERIFIED_NOTE})`,
    ],
  }),
];

export const BATCH63_REFUSED_NOT_WRITTEN: { sku: string; reason: string }[] = [
  {
    sku: 'Solimo Fish Oil 1000; Solimo Iron; Solimo prebiotic gummies; Solimo D3 5000 page',
    reason: 'PROJECT_NOTES dead / off-house — do not write as Amazon house',
  },
  {
    sku: 'Elements Organic Whole Food D3 tablets; Elements Mg lemon powder; Elements Glucosamine',
    reason: 'dead / Micro Ingredients 3P — out of house punch',
  },
  {
    sku: 'Basics Saline Nasal; pour-bottle oils',
    reason: 'saline missing-OI / hunt-list only; never grade bottles',
  },
  {
    sku: 'Micro Ingredients / 3P / WELMATE / A+Health / HealthA2Z / TIME-Cap / GoodSense full lines',
    reason: 'out of file scope this pass',
  },
];

const _ROWS = BATCH63_KYR6_ELEMENTS_BASICS;
if (_ROWS.length !== 35) throw new Error('batch63 tally drift: expected 35 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 4) {
  throw new Error('batch63 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 21) {
  throw new Error('batch63 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 10) {
  throw new Error('batch63 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch63 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch63 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch63 duplicate ids');

const FORBIDDEN_IDS = [
  'amazon-elements-whole-food-vitamin-c-500',
  'amazon-elements-biotin-5000',
  'amazon-elements-melatonin-5',
  'amazon-elements-turmeric-complex',
  'mama-bear-organic-kids-multivitamin-gummies',
  'mama-bear-kids-fiber-gummies',
  'mama-bear-organic-kids-vitamin-d3-gummies',
  'mama-bear-vegan-kids-vitamin-c-gummies',
  'mama-bear-kids-black-elderberry-gummies',
  'mama-bear-vegan-kids-probiotic-gummies',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch63 must not clone batch30 / 57 / 61 / 62 ids');
}

const vitCGummy = _ROWS.find((r) => r.id === 'amazon-elements-vitamin-c-gummies');
if (vitCGummy?.verdict !== 'caution') {
  throw new Error('Vitamin C gummies founder lock is Caution (annatto + flavors)');
}
if (vitCGummy?.inactiveIngredients.some((i) => /sunflower/i.test(i.name))) {
  throw new Error('Vitamin C gummies carousel lock has no seed oil — do not score DSLD sunflower');
}

const d3 = _ROWS.find((r) => r.id === 'amazon-elements-vitamin-d3-5000-softgels');
if (d3?.verdict !== 'clean') {
  throw new Error('D3 5000 safflower fill must stay Clean (NOT gummy High)');
}
if (d3?.inactiveIngredients.some((i) => /safflower/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('softgel safflower fill must not be High');
}

const fish = _ROWS.find((r) => r.id === 'amazon-basics-fish-oil-gummies');
if (fish?.verdict !== 'caution') {
  throw new Error('Fish oil gummies (fractionated coconut NOT High) must stay Caution');
}
if (fish?.inactiveIngredients.some((i) => /coconut/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('fractionated coconut in a gummy is NOT High');
}

const honey = _ROWS.find((r) => r.id === 'amazon-basic-care-sf-honey-lemon-cough-drops');
if (honey?.inactiveIngredients.find((i) => /soybean/i.test(i.name))?.riskLevel !== 'high') {
  throw new Error('lozenge soybean oil must be High');
}

const heal = _ROWS.find((r) => r.id === 'amazon-basics-advanced-healing-ointment');
if (heal?.verdict !== 'caution') {
  throw new Error('Advanced Healing Ointment must stay Caution (lanolin alcohol)');
}
if (heal?.inactiveIngredients.find((i) => /bisabolol/i.test(i.name))?.riskLevel !== 'cleared') {
  throw new Error('bisabolol stays Cleared — do not flip');
}

if (_ROWS.some((r) => /solimo fish oil 1000|saline nasal|glucosamine|lemon powder/i.test(r.id))) {
  throw new Error('do not write PROJECT_NOTES dead / off-house SKUs');
}

for (const record of BATCH63_KYR6_ELEMENTS_BASICS) {
  const expected = BATCH63_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 63 catch-up UPC drift on ${record.id}`);
  }
}
