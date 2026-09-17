// DRAFT / not verified / batch 60 Thrive refused-unlock WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only (Sept 16 Thrive refused-unlock
// stamps). No invented grades. No cousin-match. Founder owns
// final Avoid vs Caution vs Clean.
//
// ONE write. Mixed aisles. recordStatus is 'unverified' on every
// row. Internal keys only: clean | caution | avoid. UPC attached
// only when carton / brand site / Thrive PDP / DailyMed has a real
// code — no invented codes. Missing code ≠ no row. Pack sizes of
// the same name+form+inactives share formulaId. Form is labeled
// on cleanAlternatives, not a hard filter (§6). Search wiring
// only. Not wired into Clean Picks UI. No live Clean Picks file
// is edited. No photos. Letter tiles only on new ids. No fake
// Clean alts. No methodology rewrite. No PROJECT_NOTES rewrite
// in this file. No Sprouts. No Amazon. No new Thrive crawl.
//
// DO NOT TOUCH / DO NOT CLONE: batch59 241 rows · batch27
// wellmade · batch52 Thrive P&F · batch37–58 already on main.
// Reuse existing ids when a row already exists. New ids only
// for previously refused SKUs that were never written.
//
// GATE: write a batch59 refused SKU only when the refused token
// is now exact-§5 on MAIN and every current OI token matches an
// exact Additive / “also appears as” / locked exact-INCI line.
//
// NEW §5 locks that unlock these (already on MAIN): Psyllium
// Husk Cleared; Oat Fiber Cleared; Medium Chain Triglycerides
// (derived from palm kernel oil) Cleared named MCT fill; Organic
// Myceliated Oats Cleared food-state; Calcium Hydroxide /
// Magnesium Hydroxide as pH adjuster Cleared; Vegetable Juice
// Extract (Color) / Furit And Vegetable Juice Extract (Color)
// named juice-as-color Cleared; Vegetable-Based Tablet Coating
// Caution unnamed coat; seaweed extract Caution unspecified;
// Ginger Oil Caution EO; Irish Moss as inactive Caution;
// Evaporated Sea Water as inactive Caution; Non-GMO corn zein
// (beadlets) Caution coating polymer; oral hydrated silica =
// same SiO2 nanoparticle Caution cap (tap vs topical). Unlabeled
// MCT stays Limited (already locked; tap vs named-MCT Cleared).
//
// TALLY (unverified drafts in THIS file): 36 rows — Clean 4 /
// Caution 32 / Avoid 0.
//
// Independently Clean analogs already on main (not cloned):
// ritual-natal-choline · motherlove rows in this file ·
// bodybio-liposomal-glutathione · jarrow-vitamin-d3-5000 ·
// maryruth-oregano-oil-drops · new-chapter-elderberry-syrup ·
// gol-vitamin-code-womens / mens / raw-calcium ·
// nordic-prenatal-dha · wellmade-organic-acacia-fiber ·
// new-chapter-turmeric-force-nighttime · om-lions-mane-capsules.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const PRENATAL = 'Prenatal';
const SLEEP = 'Sleep';
const IMMUNE = 'Immune';
const COLD_FLU = 'Cold & Flu';

const THRIVE = ['Thrive Market'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. In this capsule / softgel / drop fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. Sunflower / palm / safflower / vegetable oil used as a gummy coating or fill is that High rule. Capsule / softgel / drop fill of the same oil is not.';

const PALM_COAT_TAP =
  'Seed/industrial oils are flagged in gummies. Organic Palm Oil as a tablet / capsule coating is not that High rule. Gummy print of palm stays High.';

const MCT_NAMED_TAP =
  'Named Medium Chain Triglycerides (derived from palm kernel oil) is Cleared capsule / liquid fill. Distinct from Limited unlabeled MCT / MCT with no plant named. Not the gummy seed-oil High rule.';

const MCT_UNLABELED_TAP =
  'Label says MCT / medium chain triglycerides and does not name coconut on that token. We mark that Limited because the source isn’t clear. This fill is not the gummy seed-oil High rule. Distinct from Cleared named Medium Chain Triglycerides (derived from palm kernel oil).';

const MCT_COCONUT_TAP =
  'MCT oil labeled coconut is Cleared as capsule / softgel / drop / gummy fill. Distinct from Limited unlabeled MCT. Not the gummy seed-oil High rule.';

const RICE_EXTRACT_TAP =
  'Unspecified rice extract / rice extract blend is Limited opacity. The label did not name hull, bran, or concentrate as the standalone token. Distinct from Cleared rice-hull / rice-concentrate / brown-rice food-state.';

const SUNFLOWER_FILL_TAP =
  'Sunflower oil as tablet / capsule / softgel fill or rice-extract-blend flow agent is not the gummy seed-oil High rule. Gummy print of sunflower stays High.';

const COLOR_NAMED_TAP =
  'Named plant color / Vegetable Juice Extract (Color) / Fruit And Vegetable Juice Extract (Color) / Furit And Vegetable Juice Extract (Color) is Cleared juice-as-color. Furit is the label typo. Unspecified Natural Colors is the Limited opacity row. Unnamed color added stays Caution.';

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const ORAL_HYDRATED_SILICA_TAP =
  'Oral hydrated silica sits on the same nanoparticle Caution cap as silicon dioxide / silica. Distinct from topical hydrated silica (separate Caution row — not this oral cap). It does not push Avoid.';

const ZEIN_TAP =
  'Non-GMO corn zein (beadlets) is a coating polymer. Distinct from Cleared pea-protein isolate / named food protein. Named twin / specified protein is cleaner.';

const COAT_TAP =
  'Vegetable-Based Tablet Coating is an unnamed coat. Named wax / GMS stays Cleared. The label is not specific.';

const SEAWEED_TAP =
  'Unspecified seaweed extract is Caution. Named plant-color / named kelp is not this row. The label is not specific.';

const ALCOHOL_TAP =
  'Alcohol as the oral-homeopathic or topical vehicle is Limited, not Avoid. Tap: alcohol is the vehicle, not the gummy High.';

const METH = {
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  oralHydratedSilica: `Methodology §5 Precautionary (oral hydrated silica — same nanoparticle Caution cap as silicon dioxide; locked Sept 16, 2026). ${ORAL_HYDRATED_SILICA_TAP}`,
  zein: `Methodology §5 Caution (Non-GMO corn zein (beadlets) — coating polymer, not pea-protein isolate; standalone Caution, not Avoid; locked Sept 16, 2026). ${ZEIN_TAP}`,
  unnamedCoat: `Methodology §5 Caution (Vegetable-Based Tablet Coating — unnamed coat; named wax / GMS stays Cleared; standalone Caution, not Avoid; locked Sept 16, 2026). ${COAT_TAP}`,
  seaweed: `Methodology §5 Caution (seaweed extract — unspecified; named plant-color / named kelp is not this row; standalone Caution, not Avoid; locked Sept 16, 2026). ${SEAWEED_TAP}`,
  gingerOil:
    'Methodology §5 Caution (Ginger Oil — exact token; EO / scent line; distinct from ginger extract; standalone Caution, not Avoid; locked Sept 16, 2026)',
  irishMoss:
    'Methodology §5 Caution (Irish Moss as inactive — unspecified seaweed / extract, not a named-color pass; standalone Caution, not Avoid; locked Sept 16, 2026)',
  evaporatedSeaWater:
    'Methodology §5 Caution (Evaporated Sea Water as inactive — vague mineral-water line; distinct from Trace Minerals (From Seawater); standalone Caution, not Avoid; locked Sept 16, 2026)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster — exact token)',
  caoh:
    'Methodology §5 Cleared (Calcium Hydroxide as pH adjuster — same job as NaOH; distinct from the aluminum-hydroxide antacid active-safety cap; locked Sept 16, 2026)',
  mgoh:
    'Methodology §5 Cleared (Magnesium Hydroxide as pH adjuster — same job as NaOH; distinct from the aluminum-hydroxide antacid active-safety cap; locked Sept 16, 2026)',
  psyllium:
    'Methodology §5 Cleared (Psyllium Husk — fiber; inulin neighborhood; locked Sept 16, 2026)',
  oatFiber:
    'Methodology §5 Cleared (Oat Fiber — fiber; inulin / oat neighborhood; locked Sept 16, 2026)',
  mctNamed: `Methodology §5 Cleared (Medium Chain Triglycerides (derived from palm kernel oil) as capsule/liquid fill — named MCT; NOT gummy High; locked Sept 16, 2026). ${MCT_NAMED_TAP}`,
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  mctCoconut: `Methodology §5 Cleared (MCT oil labeled coconut — oral capsule/softgel/liquid/gummy fill; not a cooking-oil bottle). ${MCT_COCONUT_TAP}`,
  myceliatedOats:
    'Methodology §5 Cleared (Organic Myceliated Oats — food-state oat / ferment as inactive; if it is the mushroom active it is not an Other Ingredient; locked Sept 16, 2026)',
  namedColor: `Methodology §5 Cleared (Vegetable Juice Extract (Color) / Fruit And Vegetable Juice Extract (Color) / Furit And Vegetable Juice Extract (Color) / Vegetable Juice (Color) — named juice-as-color). ${COLOR_NAMED_TAP}`,
  palmCoat: `Methodology §5 Cleared (Organic Palm Oil as tablet / capsule coating or fill — NOT gummy High; locked Sept 16, 2026). ${PALM_COAT_TAP}`,
  oliveFill: `Methodology §5 Cleared (extra-virgin olive oil capsule / drop / softgel fill; tap fill ≠ gummy High). ${OIL_FILL_TAP}`,
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  sugarAlcohol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol, maltitol, mannitol — GI effects at volume)',
  isomalt: 'Methodology §5 Limited-risk (isomalt — sugar-alcohol neighborhood; locked Sept 15, 2026)',
  alcohol: `Methodology §5 Limited-risk (alcohol / ethyl alcohol / grain alcohol as a VEHICLE — Limited, not Avoid). ${ALCOHOL_TAP}`,
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  riceExtract: `Methodology §5 Limited-risk (unspecified “rice extract” / rice extract blend — opacity). ${RICE_EXTRACT_TAP}`,
  sunflowerFill: `Methodology §5 Cleared (sunflower oil capsule / softgel / tablet fill; tap fill ≠ gummy High). ${SUNFLOWER_FILL_TAP}`,
  modifiedStarch:
    'Methodology §5 Limited-risk (modified starch / Organic Rice Starch / Non-GMO Maize Starch — unspecified/modified-starch row)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose / modified cellulose)',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC — HPMC family)',
  cellulose:
    'Methodology §5 Cleared (vegetable cellulose / capsule cellulose / MCC — cellulose-family filler)',
  pullulan:
    'Methodology §5 Cleared (organic pullulan — starch capsule polymer; HPMC-family vegan cap)',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / distilled water)',
  pectin:
    'Methodology §5 Cleared (xanthan gum, guar gum, gum arabic / acacia, pectin, gellan gum / locust bean gum)',
  alginate:
    'Methodology §5 Cleared (Sodium Alginate — alginic family; locked Sept 16, 2026)',
  starch:
    'Methodology §5 Cleared (pregelatinized / corn / potato / tapioca starch / pea starch / similar simple starches)',
  beeswax: 'Methodology §5 Cleared (beeswax / yellow beeswax / organic yellow beeswax / carnauba wax)',
  lecithin:
    'Methodology §5 Cleared (lecithin — canola, soy, or sunflower; phospholipids from sunflower lecithin sit here)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate / D-Alpha-Tocopherol as inactive — not tocopheryl acetate)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts / malic / lactic / fumaric / adipic / tartaric / butyric / sodium acetate anhydrous)',
  ferment: 'Methodology §5 Cleared (ferment media / organic-brown rice / Saccharomyces food-state)',
  riceHull:
    'Methodology §5 Cleared (organic rice hull extract / rice concentrate / ground rice hulls / rice hull — plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide)',
  agave: 'Methodology §5 Cleared (organic agave / inulin family)',
  gellan:
    'Methodology §5 Cleared (gellan gum — xanthan/guar/pectin family; locked v1.6; gellan named Sept 14, 2026)',
  seedOilGummies: `Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, safflower, sunflower, vegetable oil). ${GUMMY_OIL_TAP}`,
  cleared: 'Methodology §5 Cleared',
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

function row(opts: RatingRecord): RatingRecord {
  return {
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function f(
  cite: string,
  name: string,
  risk: IngredientFlag['riskLevel'],
  meth: string,
): IngredientFlag {
  return flag(name, risk, labelCite(cite, meth));
}

const CITE = {
  ritual_womens_18:
    'ritual.com Essential for Women 18+ https://ritual.com/products/essential-for-women-multivitamin UPC 850031975002 (iHerb) other-ingredients: Beadlets (cellulose, NON-GMO corn zein), stomach acid-resistant vegan capsule (hypromellose, gellan gum), silica',
  ritual_mens_18:
    'ritual.com / Target Essential for Men 18+ https://ritual.com/products/essential-multivitamin-for-men UPC 850031975026 other-ingredients: Beadlets (cellulose, non-gmo corn zein), stomach acid-resistant vegan capsule (hypromellose, gellan gum), silica',
  ritual_womens_50:
    'ritual.com / Target Essential for Women 50+ https://ritual.com/products/essential-multivitamin-for-women-over-50 UPC 850031975019 other-ingredients: beadlets (cellulose, non-gmo corn zein), stomach acid-resistant vegan capsule (hypromellose, gellan gum), silica',
  ritual_stress:
    'ritual.com Stress Relief BioSeries https://ritual.com/products/stress-relief-bioseries UPC 850031975330 other-ingredients: Hypromellose, cellulose, ascorbyl palmitate, hydroxypropyl cellulose, silica, psyllium husk, vegetable-based tablet coating, oat fiber',
  motherlove_moringa:
    'motherlove.com Moringa (Malunggay) capsules https://motherlove.com/products/malunggay-capsules other-ingredients: sunflower lecithin, modified vegetable cellulose, medium-chain triglycerides (derived from palm kernel oil)',
  motherlove_more_milk_moringa:
    'motherlove.com More Milk Moringa https://motherlove.com/products/more-milk-moringa UPC 759160520025 (120 ct) other-ingredients: sunflower lecithin, modified vegetable cellulose, medium chain triglycerides (derived from palm kernel oil)',
  motherlove_more_milk_plus:
    'motherlove.com More Milk Plus capsules https://motherlove.com/products/more-milk-plus-capsules UPC 759160510019 (60 ct) other-ingredients: sunflower lecithin, modified vegetable cellulose, medium-chain triglycerides (derived from palm kernel oil)',
  plant_people_wonder_sleep:
    'iHerb Plant People WonderSleep Wild Elderberry https://www.iherb.com/pr/plant-people-wondersleep-mushroom-gummies-wild-elderberry-60-gummies/146545 other-ingredients: Maltitol, isomalt, purified water, pectin, citric acid, sodium citrate, malic acid, fruit and vegetable juice extract (color), organic elderberry flavor, carnauba wax, coconut MCT oil',
  plant_people_wonder_beauty:
    'plantpeople.co Wonder Beauty https://www.plantpeople.co/products/wonder-beauty-gummies other-ingredients: Maltitol, Purified Water, Pectin, Organic Fruit and Vegetable Juice Extract (Color), Organic Watermelon Flavor, Citric Acid, Sodium Citrate',
  plant_people_wonder_calm:
    'iHerb / Vitacost Plant People WonderCalm Summer Peach UPC 860218000885 other-ingredients: Maltitol, isomalt, purified water, pectin, citric acid, sodium citrate, malic acid, fruit and vegetable juice extract (color), organic peach flavor, carnauba wax',
  plant_people_wonder_focus:
    'plantpeople.co WonderFocus https://www.plantpeople.co/products/wonderfocus-mushroom-gummies other-ingredients: Organic Citrus Flavor, Maltitol, Isomalt, Coconut MCT Oil, Pectin, Citric Acid, Sodium Citrate, Water, Vegetable Juice Extract (color), Carnauba Wax',
  plant_people_wonder_greens:
    'iHerb / plantpeople.co WonderGreens adult Green Apple UPC 860002142456 other-ingredients: Maltitol, Isomalt, Water, Pectin, Organic Apple Flavor, Citric Acid, Sodium Citrate, Coconut MCT Oil. Current brand/iHerb print no juice-extract color and no sunflower oil',
  bodybio_sodium_butyrate:
    'bodybio.com / PureFormulas Sodium Butyrate https://bodybio.com/products/butyrate UPC 743474999929 (60) / 743474999905 (100) ingredients: Butyric acid, sodium hydroxide, medium chain triglycerides (MCT), hydroxypropyl methylcellulose and purified water. Brand: Na buffers the pH of butyric acid',
  bodybio_ca_mg_butyrate:
    'bodybio.com / iHerb Calcium Magnesium Butyrate https://bodybio.com/products/butyrate UPC 743474993200 (100) other-ingredients: Hypromellose (capsule), medium chain triglycerides, purified water. SF minerals: Calcium (as calcium hydroxide), Magnesium (as magnesium hydroxide). Brand also lists the hydroxides as pH buffers',
  pluscbd_daily_balance:
    'pluscbdoil.com Daily Balance / Extra Strength 15 mg Gold Formula 60 ct https://www.pluscbdoil.com/plus-cbd-oil-softgels-15-mg-60-ct-gold-formula.html UPC 850684006634 ingredients: Hemp Extract (Aerial Plant Parts); Extra Virgin Olive Oil; Vegetarian Softgel (Modified Corn Starch, Glycerin, Irish Moss, Sorbitol & Purified Water). Irish Moss carton — not the retailer carrageenan Daily Balance harvest',
  maryruth_nighttime:
    'iHerb MaryRuth Liquid Nighttime Multimineral Coconut Dream 15.22 fl oz https://www.iherb.com/pr/maryruth-s-liquid-nighttime-multimineral-coconut-dream-15-22-fl-oz-450-ml/141578 UPC 810104622066 other-ingredients: Purified water, vegetable glycerin, natural flavors, citric acid, xanthan gum, potassium sorbate (to preserve freshness), and evaporated sea water. 32 oz 850036700517 shares formulaId when OI holds',
  maryruth_prenatal_postnatal:
    'iHerb / Instacart MaryRuth Prenatal & Postnatal Liquid Berry 32 fl oz UPC 856645008686 other-ingredients: Purified water, vegetable glycerin, natural flavor, citric acid, xanthan gum, potassium sorbate (to preserve freshness), and evaporated sea water. 15.2 oz 810104623537 shares formulaId when OI holds',
  fon_cold_flu_max:
    'DailyMed setid f46dbd8c-a9c0-4069-94dc-4c700dda8643 + brand/retailer Cold & Flu Maximum Strength UPC 830743013001 NDC 51393-5000 inactive: Distilled Water, Ginger Oil*, Grain Alcohol*',
  fon_sinus_max:
    'forcesofnaturemedicine.com Sinus Maximum Strength https://forcesofnaturemedicine.com/products/sinus-maximum-strength UPC 830743013025 inactive: Distilled Water, Ginger Oil*, Grain Alcohol*. Brand carton used (DailyMed SPL inactive list omits Ginger Oil — not a conflicting extra ingredient)',
  nc_ewod_40:
    'newchapter.com Every Woman\'s One Daily 40+ https://newchapter.com/products/every-womans-one-daily-multivitamin-40 other-ingredients: Ferment media (organic soy flour, organic Saccharomyces cerevisiae, organic orange peel powder, organic alfalfa powder, bromelain [deactivated], papain [deactivated], organic carrot powder, lactic acid bacteria), organic gum acacia, organic maltodextrin, hydrated silica; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_emod_40:
    'newchapter.com Every Man\'s One Daily 40+ https://newchapter.com/products/every-mans-one-daily-40-multivitamin other-ingredients: Ferment media (same family), organic maltodextrin, organic gum acacia, hydrated silica; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_ewod_55:
    'newchapter.com Every Woman\'s One Daily 55+ https://newchapter.com/products/every-womans-one-daily-multivitamin-55 other-ingredients: Organic maltodextrin, ferment media (same family), hydrated silica; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum), organic psyllium husk, organic oat fiber, organic guar gum, organic agave fiber',
  nc_emod_55:
    'newchapter.com Every Man\'s One Daily 55+ https://newchapter.com/products/every-mans-one-daily-55-multivitamin other-ingredients: Ferment media (same family), organic gum acacia, organic maltodextrin, hydrated silica; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum), organic psyllium husk, organic oat fiber, organic guar gum, organic agave fiber',
  nc_perfect_prenatal:
    'newchapter.com Advanced Perfect Prenatal https://newchapter.com/products/perfect-prenatal-multivitamin UPC 727783003164 other-ingredients: Ferment media (same family), organic gum acacia, organic maltodextrin, hydrated silica; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_perfect_postnatal:
    'newchapter.com Perfect Postnatal https://newchapter.com/products/perfect-postnatal-multivitamin other-ingredients: Ferment media (same family), organic gum acacia, organic maltodextrin, hydrated silica; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_womens_advanced:
    'newchapter.com Women\'s Advanced https://newchapter.com/products/womens-advanced-multivitamin other-ingredients: Ferment media (same family), organic maltodextrin; Less than 2% of: hydrated silica, organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_mens_advanced:
    'newchapter.com Men\'s Advanced https://newchapter.com/products/mens-advanced-multivitamin other-ingredients: Ferment media (same family), organic maltodextrin; Less than 2% of: hydrated silica, organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_fermented_b:
    'newchapter.com Fermented Coenzyme B Complex https://newchapter.com/products/coenzyme-b-complex UPC 727783901149 (90 ct Vitacost) other-ingredients: Ferment media (organic soy flour, organic Saccharomyces cerevisiae, lactic acid bacteria, bromelain [deactivated], papain [deactivated], organic orange peel powder, organic alfalfa powder), organic maltodextrin; Less than 2% of: hydrated silica, organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_fermented_b12:
    'newchapter.com Fermented Vitamin B12 https://newchapter.com/products/vitamin-b12 UPC 727783902597 (60 ct iHerb) other-ingredients: Organic maltodextrin, ferment media (same family), hydrated silica; Less than 2% of: rice extract blend (organic rice extract, organic rice hulls, organic gum arabic, organic sunflower oil), organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_fermented_c:
    'newchapter.com Fermented Vitamin C https://newchapter.com/products/fermented-vitamin-c-supplement UPC 727783902573 (60 ct iHerb) other-ingredients: Ferment media (same family), organic maltodextrin; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum), hydrated silica, rice extract blend (organic rice extract, organic rice hulls, organic gum arabic, organic sunflower oil)',
  nc_fermented_d3:
    'newchapter.com Fermented Vitamin D3 https://newchapter.com/products/vitamin-d3 UPC 727783903587 (90 ct Swanson GTIN) other-ingredients: Organic maltodextrin, ferment media (same family), hydrated silica, less than 2% of: organic MCT oil, organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_fermented_zinc:
    'newchapter.com Fermented Zinc Complex https://newchapter.com/products/zinc-complex UPC 727783903563 (90 ct iHerb) other-ingredients: Ferment media (same family), organic gum acacia, organic maltodextrin, hydrated silica; Less than 2% of: organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  nc_all_flora_multi_fiber:
    'newchapter.com All-Flora Multi-Fiber Blend https://newchapter.com/products/multi-fiber-blend UPC 727783904331 other-ingredients: Organic capsule (organic pullulan, purified water, seaweed extract), organic ground rice hull. Psyllium husk is under Supplement Facts (active), not OI',
  nc_bone_strength:
    'newchapter.com Bone Strength Take Care https://newchapter.com/products/bone-strength-take-care-slim-tablets UPC 727783004086 (120) / 727783004079 (60) other-ingredients: Organic gum acacia; Less than 2% of: ferment media, organic coating (organic maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum), organic MCT oil, organic psyllium husk, organic oat fiber, organic guar gum, organic agave fiber',
  nc_daily_skin:
    'newchapter.com Daily Skin Renewal https://newchapter.com/products/daily-skin-renewal-astaxanthin UPC 727783904577 other-ingredients: Organic capsule (organic pullulan, purified water, sodium alginate), ferment media, organic ground rice hulls, organic MCT oil, silica. Current brand panel does not print psyllium / oat fiber',
  om_lions_mane_powder:
    'OM Lion\'s Mane powder retailer SF (AllStarHealth / PureFormulas) UPC 892392002096 other-ingredients: Organic Myceliated Oats. Certified Organic Mushroom Powder Blend (Lion\'s Mane mycelial biomass & fruit body) is the Supplement Facts active — not OI. Distinct from batch59 om-lions-mane-capsules (vegetable cellulose only)',
} as const;

function ncSilicaBase(
  cite: string,
  extras: IngredientFlag[] = [],
): IngredientFlag[] {
  return [
    f(cite, 'Ferment media', 'cleared', METH.ferment),
    f(cite, 'Organic maltodextrin', 'limited', METH.maltodextrin),
    f(cite, 'Hydrated silica', 'cleared', METH.oralHydratedSilica),
    f(cite, 'Organic palm oil', 'cleared', METH.palmCoat),
    f(cite, 'Organic sunflower lecithin', 'cleared', METH.lecithin),
    f(cite, 'Organic guar gum', 'cleared', METH.pectin),
    ...extras,
  ];
}

export const BATCH60_THRIVE_REFUSED_UNLOCK: RatingRecord[] = [
  row({
    id: 'ritual-womens-18-multi',
    productName: 'Essential for Women Multivitamin 18+',
    brand: 'Ritual',
    category: VITAMINS,
    barcode: '850031975002',
    formulaId: 'ritual-womens-18-multi',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Women\'s 18+ multi + algae DHA', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.ritual_womens_18, 'Non-GMO corn zein (beadlets)', 'cleared', METH.zein),
      f(CITE.ritual_womens_18, 'Cellulose (beadlets)', 'cleared', METH.cellulose),
      f(CITE.ritual_womens_18, 'Stomach acid-resistant vegan capsule (hypromellose, gellan gum)', 'cleared', METH.hpmc),
      f(CITE.ritual_womens_18, 'Silica', 'cleared', METH.sio2),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Ritual Women's 18+ Multi = Caution. Driver is Non-GMO corn zein (beadlets) coating polymer plus the silica / SiO2 0-pt cap. Distinct from Cleared pea-protein isolate. Own formulaId vs Men's 18+ / Women's 50+ (actives differ; OI family matches). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ZEIN_TAP} ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Ritual'],
    cleanAlternatives: [
      alt('ritual-natal-choline', 'Independently Clean Ritual Natal Choline already on main (glycerin / HPMC / water only). Form labeled, not a hard filter (§6). Do not invent a Clean that is not on main.'),
    ],
    sourcesGeneral: [`${CITE.ritual_womens_18} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'ritual-mens-18-multi',
    productName: 'Essential for Men Multivitamin 18+',
    brand: 'Ritual',
    category: VITAMINS,
    barcode: '850031975026',
    formulaId: 'ritual-mens-18-multi',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Men\'s 18+ multi + algae DHA', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.ritual_mens_18, 'Non-GMO corn zein (beadlets)', 'cleared', METH.zein),
      f(CITE.ritual_mens_18, 'Cellulose (beadlets)', 'cleared', METH.cellulose),
      f(CITE.ritual_mens_18, 'Stomach acid-resistant vegan capsule (hypromellose, gellan gum)', 'cleared', METH.hpmc),
      f(CITE.ritual_mens_18, 'Silica', 'cleared', METH.sio2),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Ritual Men's 18+ Multi = Caution. Same zein + silica math as Women's 18+; labeled men's actives — own formulaId. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ZEIN_TAP} ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Ritual'],
    cleanAlternatives: [
      alt('ritual-natal-choline', 'Independently Clean Ritual Natal Choline already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.ritual_mens_18} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'ritual-womens-50-multi',
    productName: 'Essential for Women Multivitamin 50+',
    brand: 'Ritual',
    category: VITAMINS,
    barcode: '850031975019',
    formulaId: 'ritual-womens-50-multi',
    audience: ADULT,
    minAge: 50,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Women\'s 50+ multi + algae DHA', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.ritual_womens_50, 'Non-GMO corn zein (beadlets)', 'cleared', METH.zein),
      f(CITE.ritual_womens_50, 'Cellulose (beadlets)', 'cleared', METH.cellulose),
      f(CITE.ritual_womens_50, 'Stomach acid-resistant vegan capsule (hypromellose, gellan gum)', 'cleared', METH.hpmc),
      f(CITE.ritual_womens_50, 'Silica', 'cleared', METH.sio2),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Ritual Women's 50+ Multi = Caution. Same zein + silica math; labeled 50+ actives (no iron) — own formulaId. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ZEIN_TAP} ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Ritual'],
    cleanAlternatives: [
      alt('ritual-natal-choline', 'Independently Clean Ritual Natal Choline already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.ritual_womens_50} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'ritual-stress-relief',
    productName: 'Stress Relief BioSeries',
    brand: 'Ritual',
    category: VITAMINS,
    barcode: '850031975330',
    formulaId: 'ritual-stress-relief',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Saffron + ashwagandha + L-theanine', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.ritual_stress, 'Hypromellose', 'cleared', METH.hpmc),
      f(CITE.ritual_stress, 'Cellulose', 'cleared', METH.cellulose),
      f(CITE.ritual_stress, 'Ascorbyl palmitate', 'cleared', METH.tocopherols),
      f(CITE.ritual_stress, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
      f(CITE.ritual_stress, 'Silica', 'cleared', METH.sio2),
      f(CITE.ritual_stress, 'Psyllium husk', 'cleared', METH.psyllium),
      f(CITE.ritual_stress, 'Vegetable-based tablet coating', 'cleared', METH.unnamedCoat),
      f(CITE.ritual_stress, 'Oat fiber', 'cleared', METH.oatFiber),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Ritual Stress Relief = Caution. Driver is Vegetable-Based Tablet Coating (unnamed coat) plus the silica cap. Psyllium Husk and Oat Fiber are now Cleared fiber. Named wax / GMS would be cleaner than the unnamed coat. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${COAT_TAP} ${SIO2_TAP}`,
    retailers: [...THRIVE, 'Ritual'],
    cleanAlternatives: [
      alt('ritual-natal-choline', 'Independently Clean Ritual Natal Choline already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.ritual_stress} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'motherlove-moringa',
    productName: 'Moringa (Malunggay) Capsules',
    brand: 'Motherlove',
    category: PRENATAL,
    barcode: '759160650012 759160650029',
    formulaId: 'motherlove-moringa',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic moringa leaf extract', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.motherlove_moringa, 'Sunflower lecithin', 'cleared', METH.lecithin),
      f(CITE.motherlove_moringa, 'Modified vegetable cellulose', 'cleared', METH.hpmc),
      f(CITE.motherlove_moringa, 'Medium chain triglycerides (derived from palm kernel oil)', 'cleared', METH.mctNamed),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Motherlove Moringa capsules = Clean. Named Medium Chain Triglycerides (derived from palm kernel oil) is Cleared fill. Distinct from Limited unlabeled MCT. Softgel / capsule fill ≠ gummy High. Own formulaId vs More Milk Moringa / More Milk Plus (actives differ; OI family matches). Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_NAMED_TAP} ${OIL_FILL_TAP}`,
    retailers: [...THRIVE, 'Motherlove'],
    sourcesGeneral: [`${CITE.motherlove_moringa} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'motherlove-more-milk-moringa',
    productName: 'More Milk Moringa Capsules',
    brand: 'Motherlove',
    category: PRENATAL,
    barcode: '759160520025',
    formulaId: 'motherlove-more-milk-moringa',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Moringa + blessed thistle + nettle + fennel', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.motherlove_more_milk_moringa, 'Sunflower lecithin', 'cleared', METH.lecithin),
      f(CITE.motherlove_more_milk_moringa, 'Modified vegetable cellulose', 'cleared', METH.hpmc),
      f(CITE.motherlove_more_milk_moringa, 'Medium chain triglycerides (derived from palm kernel oil)', 'cleared', METH.mctNamed),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Motherlove More Milk Moringa = Clean. Same named-MCT fill as standalone Moringa; blend actives — own formulaId. 60 ct shares formulaId when OI holds. Draft, not verified. No dosing or medical advice. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_NAMED_TAP} ${OIL_FILL_TAP}`,
    retailers: [...THRIVE, 'Motherlove'],
    sourcesGeneral: [`${CITE.motherlove_more_milk_moringa} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'motherlove-more-milk-plus',
    productName: 'More Milk Plus Capsules',
    brand: 'Motherlove',
    category: PRENATAL,
    barcode: '759160510019',
    formulaId: 'motherlove-more-milk-plus',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Fenugreek + blessed thistle + nettle + fennel', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.motherlove_more_milk_plus, 'Sunflower lecithin', 'cleared', METH.lecithin),
      f(CITE.motherlove_more_milk_plus, 'Modified vegetable cellulose', 'cleared', METH.hpmc),
      f(CITE.motherlove_more_milk_plus, 'Medium chain triglycerides (derived from palm kernel oil)', 'cleared', METH.mctNamed),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Motherlove More Milk Plus = Clean. Same named-MCT fill; fenugreek blend actives — own formulaId. 120 ct shares formulaId when OI holds. Draft, not verified. No dosing or medical advice. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_NAMED_TAP} ${OIL_FILL_TAP}`,
    retailers: [...THRIVE, 'Motherlove'],
    sourcesGeneral: [`${CITE.motherlove_more_milk_plus} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'plant-people-wonder-sleep',
    productName: 'WonderSleep Mushroom Gummies Wild Elderberry',
    brand: 'Plant People',
    category: SLEEP,
    formulaId: 'plant-people-wonder-sleep',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Reishi + GABA + saffron + passionflower + chamomile', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.plant_people_wonder_sleep, 'Maltitol', 'limited', METH.sugarAlcohol),
      f(CITE.plant_people_wonder_sleep, 'Isomalt', 'limited', METH.isomalt),
      f(CITE.plant_people_wonder_sleep, 'Purified water', 'cleared', METH.water),
      f(CITE.plant_people_wonder_sleep, 'Pectin', 'cleared', METH.pectin),
      f(CITE.plant_people_wonder_sleep, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_sleep, 'Sodium citrate', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_sleep, 'Malic acid', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_sleep, 'Fruit and vegetable juice extract (color)', 'cleared', METH.namedColor),
      f(CITE.plant_people_wonder_sleep, 'Organic elderberry flavor', 'limited', METH.flavors),
      f(CITE.plant_people_wonder_sleep, 'Carnauba wax', 'cleared', METH.beeswax),
      f(CITE.plant_people_wonder_sleep, 'Coconut MCT oil', 'cleared', METH.mctCoconut),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Plant People Wonder Sleep = Caution. Maltitol + isomalt + flavor Limited. Fruit And Vegetable Juice Extract (Color) is now the locked named juice-as-color alias (Furit typo sibling). Coconut MCT labeled coconut Cleared. No sunflower oil on this carton — gummy seed-oil High not triggered. Distinct from batch59 Wonder Day (Vegetable Juice (Color) spelling). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${COLOR_NAMED_TAP} ${MCT_COCONUT_TAP}`,
    retailers: [...THRIVE, 'Plant People'],
    cleanAlternatives: [
      alt('new-chapter-turmeric-force-nighttime', 'Independently Clean New Chapter Turmeric Force Nighttime already on main. Form: capsule vs gummy — labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.plant_people_wonder_sleep} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'plant-people-wonder-beauty',
    productName: 'Wonder Beauty Gummies',
    brand: 'Plant People',
    category: VITAMINS,
    barcode: '860011717928',
    formulaId: 'plant-people-wonder-beauty',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Biotin + keratin + collagen + tremella', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.plant_people_wonder_beauty, 'Maltitol', 'limited', METH.sugarAlcohol),
      f(CITE.plant_people_wonder_beauty, 'Purified water', 'cleared', METH.water),
      f(CITE.plant_people_wonder_beauty, 'Pectin', 'cleared', METH.pectin),
      f(CITE.plant_people_wonder_beauty, 'Organic fruit and vegetable juice extract (color)', 'cleared', METH.namedColor),
      f(CITE.plant_people_wonder_beauty, 'Organic watermelon flavor', 'limited', METH.flavors),
      f(CITE.plant_people_wonder_beauty, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_beauty, 'Sodium citrate', 'cleared', METH.citrate),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Plant People Wonder Beauty = Caution. Maltitol + flavor Limited. Organic Fruit And Vegetable Juice Extract (Color) is the locked named juice-as-color alias. No sunflower oil on the current brand panel. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${COLOR_NAMED_TAP}`,
    retailers: [...THRIVE, 'Plant People'],
    cleanAlternatives: [
      alt('gol-mood-plus', 'Independently Clean Garden of Life Mood+ already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.plant_people_wonder_beauty} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'plant-people-wonder-calm',
    productName: 'WonderCalm Mushroom Gummies Summer Peach',
    brand: 'Plant People',
    category: VITAMINS,
    barcode: '860218000885',
    formulaId: 'plant-people-wonder-calm',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Ashwagandha + L-theanine + reishi + rhodiola', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.plant_people_wonder_calm, 'Maltitol', 'limited', METH.sugarAlcohol),
      f(CITE.plant_people_wonder_calm, 'Isomalt', 'limited', METH.isomalt),
      f(CITE.plant_people_wonder_calm, 'Purified water', 'cleared', METH.water),
      f(CITE.plant_people_wonder_calm, 'Pectin', 'cleared', METH.pectin),
      f(CITE.plant_people_wonder_calm, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_calm, 'Sodium citrate', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_calm, 'Malic acid', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_calm, 'Fruit and vegetable juice extract (color)', 'cleared', METH.namedColor),
      f(CITE.plant_people_wonder_calm, 'Organic peach flavor', 'limited', METH.flavors),
      f(CITE.plant_people_wonder_calm, 'Carnauba wax', 'cleared', METH.beeswax),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Plant People Wonder Calm = Caution. Sugar-alcohol + flavor Limited. Fruit And Vegetable Juice Extract (Color) now Cleared named juice-as-color. No sunflower oil on this carton. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${COLOR_NAMED_TAP}`,
    retailers: [...THRIVE, 'Plant People'],
    cleanAlternatives: [
      alt('gol-mood-plus', 'Independently Clean Garden of Life Mood+ already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.plant_people_wonder_calm} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'plant-people-wonder-focus',
    productName: 'WonderFocus Mushroom Gummies',
    brand: 'Plant People',
    category: VITAMINS,
    formulaId: 'plant-people-wonder-focus',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Lion\'s mane + cordyceps + green tea + B6/B12', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.plant_people_wonder_focus, 'Organic citrus flavor', 'limited', METH.flavors),
      f(CITE.plant_people_wonder_focus, 'Maltitol', 'limited', METH.sugarAlcohol),
      f(CITE.plant_people_wonder_focus, 'Isomalt', 'limited', METH.isomalt),
      f(CITE.plant_people_wonder_focus, 'Coconut MCT oil', 'cleared', METH.mctCoconut),
      f(CITE.plant_people_wonder_focus, 'Pectin', 'cleared', METH.pectin),
      f(CITE.plant_people_wonder_focus, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_focus, 'Sodium citrate', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_focus, 'Water', 'cleared', METH.water),
      f(CITE.plant_people_wonder_focus, 'Vegetable juice extract (color)', 'cleared', METH.namedColor),
      f(CITE.plant_people_wonder_focus, 'Carnauba wax', 'cleared', METH.beeswax),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Plant People Wonder Focus = Caution. Sugar-alcohol + flavor Limited. Vegetable Juice Extract (Color) is the locked named juice-as-color alias. Coconut MCT labeled coconut Cleared. No sunflower oil on the current brand panel. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${COLOR_NAMED_TAP} ${MCT_COCONUT_TAP}`,
    retailers: [...THRIVE, 'Plant People'],
    cleanAlternatives: [
      alt('gol-mood-plus', 'Independently Clean Garden of Life Mood+ already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.plant_people_wonder_focus} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'plant-people-wonder-greens',
    productName: 'WonderGreens Super Veggie Gummies Green Apple',
    brand: 'Plant People',
    category: VITAMINS,
    barcode: '860002142456',
    formulaId: 'plant-people-wonder-greens',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Supergreens extract + probiotics + vitamin D3', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.plant_people_wonder_greens, 'Maltitol', 'limited', METH.sugarAlcohol),
      f(CITE.plant_people_wonder_greens, 'Isomalt', 'limited', METH.isomalt),
      f(CITE.plant_people_wonder_greens, 'Water', 'cleared', METH.water),
      f(CITE.plant_people_wonder_greens, 'Pectin', 'cleared', METH.pectin),
      f(CITE.plant_people_wonder_greens, 'Organic apple flavor', 'limited', METH.flavors),
      f(CITE.plant_people_wonder_greens, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_greens, 'Sodium citrate', 'cleared', METH.citrate),
      f(CITE.plant_people_wonder_greens, 'Coconut MCT oil', 'cleared', METH.mctCoconut),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Plant People Wonder Greens (adult) = Caution. Sugar-alcohol + flavor Limited. Current brand/iHerb panel prints no juice-extract color and no sunflower oil. Distinct from batch59 Wonder Greens Kids (own formulaId). Coconut MCT labeled coconut Cleared. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_COCONUT_TAP}`,
    retailers: [...THRIVE, 'Plant People'],
    cleanAlternatives: [
      alt('ancient-super-greens-unflavored', 'Independently Clean Ancient Nutrition Super Greens Unflavored already on main. Form: powder vs gummy — labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.plant_people_wonder_greens} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'bodybio-sodium-butyrate',
    productName: 'Sodium Butyrate',
    brand: 'BodyBio',
    category: DIGESTIVE,
    barcode: '743474999929',
    formulaId: 'bodybio-sodium-butyrate',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Butyric acid (sodium butyrate)', strength: '1.2 g per 2 capsules' },
    ],
    inactiveIngredients: [
      f(CITE.bodybio_sodium_butyrate, 'Sodium hydroxide', 'cleared', METH.naoh),
      f(CITE.bodybio_sodium_butyrate, 'Medium chain triglycerides (MCT)', 'limited', METH.mctUnlabeled),
      f(CITE.bodybio_sodium_butyrate, 'Hydroxypropyl methylcellulose', 'cleared', METH.hpmc),
      f(CITE.bodybio_sodium_butyrate, 'Purified water', 'cleared', METH.water),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: BodyBio Sodium Butyrate = Caution. Unlabeled MCT is Limited (source not named coconut). Sodium hydroxide as pH buffer is Cleared (same job as NaOH). Distinct from Cleared named Medium Chain Triglycerides (derived from palm kernel oil). 100 ct 743474999905 shares formulaId. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_UNLABELED_TAP}`,
    retailers: [...THRIVE, 'BodyBio'],
    cleanAlternatives: [
      alt('bodybio-liposomal-glutathione', 'Independently Clean BodyBio Liposomal Glutathione already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.bodybio_sodium_butyrate} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'bodybio-calcium-magnesium-butyrate',
    productName: 'Calcium Magnesium Butyrate',
    brand: 'BodyBio',
    category: DIGESTIVE,
    barcode: '743474993200',
    formulaId: 'bodybio-calcium-magnesium-butyrate',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Butyric acid + calcium + magnesium', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.bodybio_ca_mg_butyrate, 'Calcium hydroxide', 'cleared', METH.caoh),
      f(CITE.bodybio_ca_mg_butyrate, 'Magnesium hydroxide', 'cleared', METH.mgoh),
      f(CITE.bodybio_ca_mg_butyrate, 'Medium chain triglycerides', 'limited', METH.mctUnlabeled),
      f(CITE.bodybio_ca_mg_butyrate, 'Hypromellose (capsule)', 'cleared', METH.hpmc),
      f(CITE.bodybio_ca_mg_butyrate, 'Purified water', 'cleared', METH.water),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: BodyBio Calcium-Magnesium Butyrate = Caution. Unlabeled MCT Limited. Calcium Hydroxide / Magnesium Hydroxide as pH adjuster now Cleared (same job as NaOH). SF also prints Calcium / Magnesium as those hydroxides — minerals under Supplement Facts are actives; the hydroxide tokens are listed because the brand prints them as buffers. Own formulaId vs Sodium Butyrate. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_UNLABELED_TAP}`,
    retailers: [...THRIVE, 'BodyBio'],
    cleanAlternatives: [
      alt('bodybio-liposomal-glutathione', 'Independently Clean BodyBio Liposomal Glutathione already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.bodybio_ca_mg_butyrate} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'pluscbd-daily-balance-15',
    productName: 'Daily Balance 15 mg Softgels',
    brand: 'PlusCBD',
    category: VITAMINS,
    barcode: '850684006634',
    formulaId: 'pluscbd-daily-balance-15',
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Hemp extract (CBD 15 mg)', strength: '15 mg CBD' },
    ],
    inactiveIngredients: [
      f(CITE.pluscbd_daily_balance, 'Extra virgin olive oil', 'cleared', METH.oliveFill),
      f(CITE.pluscbd_daily_balance, 'Modified corn starch', 'limited', METH.modifiedStarch),
      f(CITE.pluscbd_daily_balance, 'Glycerin', 'cleared', METH.glycerin),
      f(CITE.pluscbd_daily_balance, 'Irish Moss', 'cleared', METH.irishMoss),
      f(CITE.pluscbd_daily_balance, 'Sorbitol', 'limited', METH.sugarAlcohol),
      f(CITE.pluscbd_daily_balance, 'Purified water', 'cleared', METH.water),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: PlusCBD Daily Balance 15 mg = Caution. Irish Moss as inactive is the locked unspecified-seaweed Caution token (not a named-color pass). Sorbitol + modified corn starch Limited. Olive-oil fill Cleared, ≠ gummy High. Official Gold Formula Irish Moss carton — do not write the retailer Daily Balance harvest that swaps in carrageenan. 30/90 ct share formulaId when OI holds. Distinct from batch59 Men's Ignite (unlabeled MCT gelatin). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Labeled actives listed neutrally — this draft grades inactives only. ${OIL_FILL_TAP}`,
    retailers: [...THRIVE, 'PlusCBD'],
    cleanAlternatives: [
      alt('jarrow-vitamin-d3-5000', 'Independently Clean Jarrow D3 5000 already on main (olive-oil softgel). Form labeled, not a hard filter (§6). Not a CBD swap.'),
    ],
    sourcesGeneral: [`${CITE.pluscbd_daily_balance} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'maryruth-nighttime-multimineral',
    productName: 'Liquid Nighttime Multimineral Coconut Dream',
    brand: 'MaryRuth\'s',
    category: SLEEP,
    barcode: '810104622066',
    formulaId: 'maryruth-nighttime-multimineral',
    audience: ADULT,
    minAge: 1,
    form: 'liquid',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Nighttime multimineral (Ca/Mg/Zn + D3)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.maryruth_nighttime, 'Purified water', 'cleared', METH.water),
      f(CITE.maryruth_nighttime, 'Vegetable glycerin', 'cleared', METH.glycerin),
      f(CITE.maryruth_nighttime, 'Natural flavors', 'limited', METH.flavors),
      f(CITE.maryruth_nighttime, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.maryruth_nighttime, 'Xanthan gum', 'cleared', METH.pectin),
      f(CITE.maryruth_nighttime, 'Potassium sorbate', 'limited', METH.benzoate),
      f(CITE.maryruth_nighttime, 'Evaporated sea water', 'cleared', METH.evaporatedSeaWater),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: MaryRuth Nighttime Multimineral = Caution. Evaporated Sea Water as inactive is the locked vague mineral-water Caution token — distinct from Trace Minerals (From Seawater) and from minerals under Supplement Facts. Flavors + potassium sorbate Limited. Distinct from batch59 kids nighttime (no evaporated seawater). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'MaryRuth\'s'],
    cleanAlternatives: [
      alt('maryruth-oregano-oil-drops', 'Independently Clean MaryRuth Oregano Oil Drops already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.maryruth_nighttime} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'maryruth-prenatal-postnatal-liquid',
    productName: 'Prenatal & Postnatal Liquid Multivitamin Berry',
    brand: 'MaryRuth\'s',
    category: PRENATAL,
    barcode: '856645008686',
    formulaId: 'maryruth-prenatal-postnatal-liquid',
    audience: ADULT,
    minAge: 18,
    form: 'liquid',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal / postnatal multi', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.maryruth_prenatal_postnatal, 'Purified water', 'cleared', METH.water),
      f(CITE.maryruth_prenatal_postnatal, 'Vegetable glycerin', 'cleared', METH.glycerin),
      f(CITE.maryruth_prenatal_postnatal, 'Natural flavor', 'limited', METH.flavors),
      f(CITE.maryruth_prenatal_postnatal, 'Citric acid', 'cleared', METH.citrate),
      f(CITE.maryruth_prenatal_postnatal, 'Xanthan gum', 'cleared', METH.pectin),
      f(CITE.maryruth_prenatal_postnatal, 'Potassium sorbate', 'limited', METH.benzoate),
      f(CITE.maryruth_prenatal_postnatal, 'Evaporated sea water', 'cleared', METH.evaporatedSeaWater),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: MaryRuth Prenatal-Postnatal liquid = Caution. Evaporated Sea Water as inactive Caution (vague mineral-water line). Flavors + sorbate Limited. 15.2 oz shares formulaId when OI holds. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'MaryRuth\'s'],
    cleanAlternatives: [
      alt('nordic-prenatal-dha', 'Independently Clean Nordic Prenatal DHA already on main. Form: softgel vs liquid — labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.maryruth_prenatal_postnatal} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'fon-cold-flu-max',
    productName: 'Cold & Flu Maximum Strength',
    brand: 'Forces of Nature',
    category: COLD_FLU,
    barcode: '830743013001',
    formulaId: 'fon-cold-flu-max',
    audience: ADULT,
    minAge: 2,
    form: 'drops',
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
    activeIngredients: [
      { name: 'Homeopathic cold/flu blend', strength: 'HPUS as labeled' },
    ],
    inactiveIngredients: [
      f(CITE.fon_cold_flu_max, 'Distilled water', 'cleared', METH.water),
      f(CITE.fon_cold_flu_max, 'Ginger Oil', 'cleared', METH.gingerOil),
      f(CITE.fon_cold_flu_max, 'Grain alcohol', 'limited', METH.alcohol),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Forces of Nature Cold & Flu Max = Caution. Ginger Oil is the locked EO / scent Caution token (distinct from ginger extract). Grain alcohol vehicle Limited. Homeopathic — cleanliness only, no efficacy claim. Distinct from batch59 Cold & Flu Kids (lemon oil, no Ginger Oil). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Forces of Nature'],
    cleanAlternatives: [
      alt('new-chapter-elderberry-syrup', 'Independently Clean New Chapter Elderberry Syrup already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.fon_cold_flu_max} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'fon-sinus-max',
    productName: 'Sinus Maximum Strength',
    brand: 'Forces of Nature',
    category: COLD_FLU,
    barcode: '830743013025',
    formulaId: 'fon-sinus-max',
    audience: ADULT,
    minAge: 2,
    form: 'drops',
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
    activeIngredients: [
      { name: 'Homeopathic sinus blend', strength: 'HPUS as labeled' },
    ],
    inactiveIngredients: [
      f(CITE.fon_sinus_max, 'Distilled water', 'cleared', METH.water),
      f(CITE.fon_sinus_max, 'Ginger Oil', 'cleared', METH.gingerOil),
      f(CITE.fon_sinus_max, 'Grain alcohol', 'limited', METH.alcohol),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Forces of Nature Sinus Max = Caution. Brand carton Ginger Oil + grain alcohol. DailyMed SPL inactive list omits Ginger Oil — brand/carton used; that is not a Wart-style conflicting extra ingredient. Own formulaId vs Cold & Flu Max (actives differ). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'Forces of Nature'],
    cleanAlternatives: [
      alt('new-chapter-elderberry-syrup', 'Independently Clean New Chapter Elderberry Syrup already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.fon_sinus_max} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-every-womans-one-daily-40',
    productName: 'Every Woman\'s One Daily 40+',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783903396 727783003669 727783003676 727783003645',
    formulaId: 'new-chapter-every-womans-one-daily-40',
    audience: ADULT,
    minAge: 40,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Women\'s 40+ fermented multi', strength: 'label serving' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_ewod_40, [
        f(CITE.nc_ewod_40, 'Organic gum acacia', 'cleared', METH.pectin),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Every Woman's One Daily 40+ = Caution. Oral hydrated silica is the same SiO2 nanoparticle Caution cap (tap vs topical hydrated silica). Organic maltodextrin Limited. Organic Palm Oil coating Cleared + tap. Distinct from batch59 Every Woman's One Daily (no hydrated silica). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-vitamin-code-womens', 'Independently Clean Garden of Life Vitamin Code for Women already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_ewod_40} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-every-mans-one-daily-40',
    productName: 'Every Man\'s One Daily 40+',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783903402 727783003706 727783003713 727783003737',
    formulaId: 'new-chapter-every-mans-one-daily-40',
    audience: ADULT,
    minAge: 40,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Men\'s 40+ fermented multi', strength: 'label serving' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_emod_40, [
        f(CITE.nc_emod_40, 'Organic gum acacia', 'cleared', METH.pectin),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Every Man's One Daily 40+ = Caution. Oral hydrated silica = SiO2 cap. Distinct from batch59 Every Man's One Daily (silica, not hydrated silica). Own formulaId vs 40+ women's. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-vitamin-code-mens', 'Independently Clean Garden of Life Vitamin Code for Men already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_emod_40} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-every-womans-one-daily-55',
    productName: 'Every Woman\'s One Daily 55+',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783903419 727783901248 727783901255 727783901767',
    formulaId: 'new-chapter-every-womans-one-daily-55',
    audience: ADULT,
    minAge: 55,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Women\'s 55+ fermented multi', strength: 'label serving' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_ewod_55, [
        f(CITE.nc_ewod_55, 'Organic psyllium husk', 'cleared', METH.psyllium),
        f(CITE.nc_ewod_55, 'Organic oat fiber', 'cleared', METH.oatFiber),
        f(CITE.nc_ewod_55, 'Organic agave fiber', 'cleared', METH.agave),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Every Woman's One Daily 55+ = Caution. Oral hydrated silica cap + maltodextrin Limited. Psyllium Husk / Oat Fiber now Cleared. No gum acacia on this carton (own OI vs 40+). Palm coating Cleared. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-vitamin-code-womens-50', 'Independently Clean Garden of Life Vitamin Code 50 & Wiser Women already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_ewod_55} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-every-mans-one-daily-55',
    productName: 'Every Man\'s One Daily 55+',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783903426 727783901279 727783901286 727783901484',
    formulaId: 'new-chapter-every-mans-one-daily-55',
    audience: ADULT,
    minAge: 55,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Men\'s 55+ fermented multi', strength: 'label serving' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_emod_55, [
        f(CITE.nc_emod_55, 'Organic gum acacia', 'cleared', METH.pectin),
        f(CITE.nc_emod_55, 'Organic psyllium husk', 'cleared', METH.psyllium),
        f(CITE.nc_emod_55, 'Organic oat fiber', 'cleared', METH.oatFiber),
        f(CITE.nc_emod_55, 'Organic agave fiber', 'cleared', METH.agave),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Every Man's One Daily 55+ = Caution. Oral hydrated silica cap. Psyllium / oat fiber Cleared. Own formulaId vs 40+ / women's 55+. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-vitamin-code-mens', 'Independently Clean Garden of Life Vitamin Code for Men already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_emod_55} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-perfect-prenatal',
    productName: 'Advanced Perfect Prenatal',
    brand: 'New Chapter',
    category: PRENATAL,
    barcode: '727783003164',
    formulaId: 'new-chapter-perfect-prenatal',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal fermented multi + iron + ginger', strength: 'label serving' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_perfect_prenatal, [
        f(CITE.nc_perfect_prenatal, 'Organic gum acacia', 'cleared', METH.pectin),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Perfect Prenatal = Caution. Oral hydrated silica = SiO2 cap. Palm coating Cleared. Own formulaId vs Perfect Postnatal (actives differ; OI family matches). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('nordic-prenatal-dha', 'Independently Clean Nordic Prenatal DHA already on main. Form: softgel vs tablet — labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_perfect_prenatal} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-perfect-postnatal',
    productName: 'Perfect Postnatal',
    brand: 'New Chapter',
    category: PRENATAL,
    barcode: '727783900579 727783900586',
    formulaId: 'new-chapter-perfect-postnatal',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Postnatal fermented multi', strength: 'label serving' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_perfect_postnatal, [
        f(CITE.nc_perfect_postnatal, 'Organic gum acacia', 'cleared', METH.pectin),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Perfect Postnatal = Caution. Oral hydrated silica = SiO2 cap. Same OI family as Perfect Prenatal; labeled postnatal actives — own formulaId. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('nordic-prenatal-dha', 'Independently Clean Nordic Prenatal DHA already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_perfect_postnatal} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-womens-advanced',
    productName: 'Women\'s Advanced Multivitamin',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783003027 727783003034 727783003041',
    formulaId: 'new-chapter-womens-advanced',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Women\'s advanced fermented multi', strength: 'label serving' },
    ],
    inactiveIngredients: ncSilicaBase(CITE.nc_womens_advanced),
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Women's Advanced = Caution. Oral hydrated silica = SiO2 cap. No gum acacia on this carton. Distinct from Every Woman's One Daily / 40+ / 55+. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-vitamin-code-womens', 'Independently Clean Garden of Life Vitamin Code for Women already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_womens_advanced} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-mens-advanced',
    productName: 'Men\'s Advanced Multivitamin',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783003225 727783003232 727783003249',
    formulaId: 'new-chapter-mens-advanced',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Men\'s advanced fermented multi', strength: 'label serving' },
    ],
    inactiveIngredients: ncSilicaBase(CITE.nc_mens_advanced),
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Men's Advanced = Caution. Oral hydrated silica = SiO2 cap. Own formulaId vs Women's Advanced (actives differ). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-vitamin-code-mens', 'Independently Clean Garden of Life Vitamin Code for Men already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_mens_advanced} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-fermented-coenzyme-b-complex',
    productName: 'Fermented Coenzyme B Complex',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783901149',
    formulaId: 'new-chapter-fermented-coenzyme-b-complex',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Fermented B-complex + stress/cardio/immune blends', strength: 'label serving' },
    ],
    inactiveIngredients: ncSilicaBase(CITE.nc_fermented_b),
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Fermented Coenzyme B Complex = Caution. Official newchapter.com OI now pinned. Oral hydrated silica = SiO2 cap. Maltodextrin Limited. Palm coating Cleared. Distinct from the newer Fermented Vitamin B Complex SKU (not this write). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-mood-plus', 'Independently Clean Garden of Life Mood+ already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_fermented_b} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-fermented-b12',
    productName: 'Fermented Vitamin B12',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783902597',
    formulaId: 'new-chapter-fermented-b12',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin B12 (cyanocobalamin + methylcobalamin)', strength: '1000 mcg' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_fermented_b12, [
        f(CITE.nc_fermented_b12, 'Rice extract blend', 'limited', METH.riceExtract),
        f(CITE.nc_fermented_b12, 'Organic sunflower oil', 'cleared', METH.sunflowerFill),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Fermented Vitamin B12 = Caution. Official brand OI pinned. Oral hydrated silica = SiO2 cap. Unspecified rice extract blend Limited. Organic sunflower oil sits inside that blend as tablet flow agent — tap ≠ gummy High. Palm coating Cleared. Own formulaId vs Coenzyme B Complex. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${RICE_EXTRACT_TAP} ${SUNFLOWER_FILL_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('jarrow-vitamin-d3-5000', 'Independently Clean Jarrow D3 5000 already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_fermented_b12} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-fermented-c',
    productName: 'Fermented Vitamin C',
    brand: 'New Chapter',
    category: IMMUNE,
    barcode: '727783902573',
    formulaId: 'new-chapter-fermented-c',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin C from ferment media', strength: '250 mg' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_fermented_c, [
        f(CITE.nc_fermented_c, 'Rice extract blend', 'limited', METH.riceExtract),
        f(CITE.nc_fermented_c, 'Organic sunflower oil', 'cleared', METH.sunflowerFill),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Fermented Vitamin C = Caution. Official brand OI pinned. Oral hydrated silica = SiO2 cap. Rice extract blend Limited. Sunflower oil in that blend is tablet fill, not gummy High. Palm coating Cleared. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${RICE_EXTRACT_TAP} ${SUNFLOWER_FILL_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('new-chapter-elderberry-syrup', 'Independently Clean New Chapter Elderberry Syrup already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_fermented_c} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-fermented-d3',
    productName: 'Fermented Vitamin D3',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783903587',
    formulaId: 'new-chapter-fermented-d3',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 from ferment media', strength: '2000 IU' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_fermented_d3, [
        f(CITE.nc_fermented_d3, 'Organic MCT oil', 'limited', METH.mctUnlabeled),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Fermented Vitamin D3 = Caution. Official brand OI pinned. Oral hydrated silica = SiO2 cap. Organic MCT oil is unlabeled MCT Limited (coconut not named) — tap vs named palm-kernel MCT Cleared. Palm coating Cleared. 3× Limited ≠ Avoid. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${MCT_UNLABELED_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('jarrow-vitamin-d3-5000', 'Independently Clean Jarrow D3 5000 already on main. Form: softgel vs tablet — labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_fermented_d3} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-fermented-zinc-complex',
    productName: 'Fermented Zinc Complex',
    brand: 'New Chapter',
    category: IMMUNE,
    barcode: '727783903563',
    formulaId: 'new-chapter-fermented-zinc-complex',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Zinc + copper from ferment media', strength: '15 mg zinc' },
    ],
    inactiveIngredients: [
      ...ncSilicaBase(CITE.nc_fermented_zinc, [
        f(CITE.nc_fermented_zinc, 'Organic gum acacia', 'cleared', METH.pectin),
      ]),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Fermented Zinc Complex = Caution. Official brand OI pinned. Oral hydrated silica = SiO2 cap. Maltodextrin Limited. Palm coating Cleared. 60 ct shares formulaId when OI holds. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${ORAL_HYDRATED_SILICA_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('new-chapter-elderberry-syrup', 'Independently Clean New Chapter Elderberry Syrup already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_fermented_zinc} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-all-flora-multi-fiber',
    productName: 'All-Flora Multi-Fiber Blend',
    brand: 'New Chapter',
    category: DIGESTIVE,
    barcode: '727783904331',
    formulaId: 'new-chapter-all-flora-multi-fiber',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic inulin + psyllium husk + fermented prune', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.nc_all_flora_multi_fiber, 'Organic pullulan', 'cleared', METH.pullulan),
      f(CITE.nc_all_flora_multi_fiber, 'Purified water', 'cleared', METH.water),
      f(CITE.nc_all_flora_multi_fiber, 'Seaweed extract', 'cleared', METH.seaweed),
      f(CITE.nc_all_flora_multi_fiber, 'Organic ground rice hull', 'cleared', METH.riceHull),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter All-Flora Multi-Fiber = Caution. Unspecified seaweed extract is the locked Caution token (named kelp / named plant-color is not this row). Psyllium husk is under Supplement Facts (active), not OI. Distinct from batch59 All-Flora Probiotic gummy. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${SEAWEED_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('wellmade-organic-acacia-fiber', 'Independently Clean wellmade Organic Acacia Fiber already on main. Form: powder vs capsule — labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_all_flora_multi_fiber} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-bone-strength',
    productName: 'Bone Strength Take Care',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783004086',
    formulaId: 'new-chapter-bone-strength',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Plant calcium + D3 + K2', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.nc_bone_strength, 'Organic gum acacia', 'cleared', METH.pectin),
      f(CITE.nc_bone_strength, 'Ferment media', 'cleared', METH.ferment),
      f(CITE.nc_bone_strength, 'Organic maltodextrin', 'limited', METH.maltodextrin),
      f(CITE.nc_bone_strength, 'Organic palm oil', 'cleared', METH.palmCoat),
      f(CITE.nc_bone_strength, 'Organic sunflower lecithin', 'cleared', METH.lecithin),
      f(CITE.nc_bone_strength, 'Organic guar gum', 'cleared', METH.pectin),
      f(CITE.nc_bone_strength, 'Organic MCT oil', 'limited', METH.mctUnlabeled),
      f(CITE.nc_bone_strength, 'Organic psyllium husk', 'cleared', METH.psyllium),
      f(CITE.nc_bone_strength, 'Organic oat fiber', 'cleared', METH.oatFiber),
      f(CITE.nc_bone_strength, 'Organic agave fiber', 'cleared', METH.agave),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Bone Strength = Caution. Organic MCT oil is unlabeled MCT Limited (coconut not named) — tap vs Cleared named Medium Chain Triglycerides (derived from palm kernel oil). Psyllium Husk and Oat Fiber now Cleared. Maltodextrin Limited. 3× Limited ≠ Avoid. 60 ct 727783004079 shares formulaId. Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_UNLABELED_TAP} ${PALM_COAT_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('gol-vitamin-code-raw-calcium', 'Independently Clean Garden of Life Vitamin Code RAW Calcium already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_bone_strength} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'new-chapter-daily-skin',
    productName: 'Daily Skin Renewal',
    brand: 'New Chapter',
    category: VITAMINS,
    barcode: '727783904577',
    formulaId: 'new-chapter-daily-skin',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Astaxanthin + ceramide peptide blend', strength: 'label serving' },
    ],
    inactiveIngredients: [
      f(CITE.nc_daily_skin, 'Organic pullulan', 'cleared', METH.pullulan),
      f(CITE.nc_daily_skin, 'Purified water', 'cleared', METH.water),
      f(CITE.nc_daily_skin, 'Sodium alginate', 'cleared', METH.alginate),
      f(CITE.nc_daily_skin, 'Ferment media', 'cleared', METH.ferment),
      f(CITE.nc_daily_skin, 'Organic ground rice hulls', 'cleared', METH.riceHull),
      f(CITE.nc_daily_skin, 'Organic MCT oil', 'limited', METH.mctUnlabeled),
      f(CITE.nc_daily_skin, 'Silica', 'cleared', METH.sio2),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: New Chapter Daily Skin = Caution. Unlabeled MCT Limited + silica 0-pt cap. Current brand panel does not print psyllium / oat fiber — those tokens are not invented. Distinct from Bone Strength (tablet; psyllium + oat fiber present). Draft, not verified. ${LIMITED_STACK} No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only. ${MCT_UNLABELED_TAP} ${SIO2_TAP}`,
    retailers: [...THRIVE, 'New Chapter'],
    cleanAlternatives: [
      alt('new-chapter-estrotone', 'Independently Clean New Chapter Estrotone already on main. Form labeled, not a hard filter (§6).'),
    ],
    sourcesGeneral: [`${CITE.nc_daily_skin} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'om-lions-mane-powder',
    productName: 'Lion\'s Mane Mushroom Superfood Powder',
    brand: 'OM',
    category: VITAMINS,
    barcode: '892392002096',
    formulaId: 'om-lions-mane-powder',
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Organic lion\'s mane mycelial biomass & fruit body', strength: '2 g' },
    ],
    inactiveIngredients: [
      f(CITE.om_lions_mane_powder, 'Organic myceliated oats', 'cleared', METH.myceliatedOats),
    ],
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: OM Lion's Mane powder = Clean. Organic Myceliated Oats is printed as Other Ingredients on a real SF panel and is now the locked food-state oat/ferment Cleared token. The mushroom blend is the Supplement Facts active — not graded as OI. Distinct from batch59 om-lions-mane-capsules (vegetable cellulose only; own formulaId). Master Blend / Reishi / Turkey Tail powders stay refused (still no_OI). Draft, not verified. No dosing or medical advice. Pack sizes share this formulaId when the other-ingredients list holds. Labeled actives listed neutrally — this draft grades inactives only.`,
    retailers: [...THRIVE, 'OM'],
    sourcesGeneral: [`${CITE.om_lions_mane_powder} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH60_REFUSED: { sku: string; token: string }[] = [
  {
    sku: 'OM Master Blend powder / Reishi powder / Turkey Tail powder',
    token: 'no_OI — still no printed Other Ingredients line on a real label this pass. Organic Myceliated Oats unlock applies only when that string is on a real label (Lion\'s Mane powder written).',
  },
  {
    sku: 'Trace Blue Hawaiian / Mixed Berry / Shilajit',
    token: 'no_OI',
  },
  {
    sku: 'Forces of Nature Wart Extra Strength',
    token: 'DailyMed vs brand conflict (cedar leaf / Thuja oil) — do not invent OI',
  },
  {
    sku: '21 scan no_OI pile',
    token: 'Trace Shilajit · OM Lion\'s Mane/Reishi/Turkey Tail powders (Reishi / Turkey Tail / Master Blend still no_OI) · Anima Mundi Butterfly Pea / Liver Vitality / Happiness Tonic · Codeage Multi Collagen / Platinum / Teens Fermented Multi · GOL Kids+ Strawberry Banana · GOL Unflavored Organic Fiber · Thrive Multi-Collagen · Himalaya Organic Psyllium · All Terrain Fabric Bandages · Ollois Histaminum · Thorne Creatine (one tub) · Active Skin Repair hydrogels · shopping-list bundles',
  },
];

const _ROWS = BATCH60_THRIVE_REFUSED_UNLOCK;
if (_ROWS.length !== 36) throw new Error('batch60 tally drift: expected 36 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 4) throw new Error('batch60 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 32) throw new Error('batch60 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch60 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch60 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.formulaId)) throw new Error('batch60 every row needs formulaId');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch60 duplicate ids');

const FORBIDDEN_IDS = [
  'ritual-natal-choline',
  'ritual-womens-prenatal-multi',
  'ritual-womens-postnatal-multi',
  'ritual-omega-3-dha-epa',
  'om-master-blend-capsules',
  'om-lions-mane-capsules',
  'plant-people-wonder-day',
  'plant-people-wonder-burn',
  'plant-people-wonder-greens-kids',
  'bodybio-liposomal-glutathione',
  'bodybio-liposomal-vitamin-c',
  'bodybio-tudca',
  'bodybio-remineralize',
  'pluscbd-mens-performance-ignite',
  'maryruth-kids-nighttime-multimineral',
  'new-chapter-every-womans-one-daily',
  'new-chapter-every-mans-one-daily',
  'new-chapter-turmeric-force-nighttime',
  'new-chapter-all-flora-probiotic-gummy',
  'fon-cold-flu-kids',
  'fon-allergy-max',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch60 must not clone batch27/52/59 ids');
}
if (_ids.has('new-chapter-turmeric-force')) {
  throw new Error('do not clone batch52 Turmeric Force');
}
if (!_ids.has('om-lions-mane-powder')) {
  throw new Error('OM Lion\'s Mane powder with Organic Myceliated Oats is a write');
}
for (const id of [
  'new-chapter-fermented-coenzyme-b-complex',
  'new-chapter-fermented-b12',
  'new-chapter-fermented-c',
  'new-chapter-fermented-d3',
  'new-chapter-fermented-zinc-complex',
]) {
  if (!_ids.has(id)) throw new Error(`batch60 missing official-OI write ${id}`);
}
if (_ROWS.some((r) => r.inactiveIngredients.some((i) => i.name.toLowerCase() === 'vegetable capsule'))) {
  throw new Error('do not invent a grade for unlabeled Vegetable Capsule');
}
