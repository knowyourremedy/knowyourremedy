// DRAFT / not verified / batch 34 Boiron US catalog / methodology
// v1.6 + Sept 14 locks + Sept 15 Boiron write locks.
// Founder owns final Avoid vs Caution vs Clean.
//
// Boiron in-scope OTC / homeopathic drafts. Whole in-scope line — not one
// aisle. Mixed categories · recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Do NOT invent Clean. Do NOT
// invent UPCs / barcodes. Pack sizes share formulaId. formulaId == id on
// every NEW branded row. Single-remedy tubes share formulaId
// `boiron-single-remedy-pellets`. Form is labeled on cleanAlternatives, not
// a hard filter (§6). Not wired into Clean Picks UI. No live Clean Picks
// file is edited. No photos. Letter tiles only on new ids. No fake Clean
// alts. No MegaFood / Genexa / Hyland’s rewrites.
//
// REUSE ONLY (comment only — do NOT rewrite / clone these 17 formulaIds):
// - boiron-coldcalm-meltaways
// - boiron-oscillococcinum-200ck
// - boiron-chestal-adult-honey
// - boiron-chestal-kids-pellets
// - boiron-chestal-kids-honey
// - boiron-coldcalm-kids-liquid
// - boiron-allergycalm-meltaways
// - boiron-acidcalm
// - boiron-nauseacalm
// - boiron-motioncalm
// - boiron-gasalia-meltaways
// - boiron-gasalia-pellets
// - boiron-calendula-cream
// - boiron-calendula-ointment
// - boiron-arnicare-gel
// - boiron-sleepcalm-kids-pellets
// - boiron-sleepcalm-kids-liquid
//
// SHOP REUSE NOTES (no new rows):
// - GasCalm → `boiron-gasalia-meltaways`
// - OTG pellets for Gasalia / NauseaCalm / MotionCalm → existing pellet
//   formulaIds (`boiron-gasalia-pellets`, `boiron-nauseacalm`,
//   `boiron-motioncalm`)
// - AllergyCalm tablets / kids tablets → `boiron-allergycalm-meltaways`
// - ColdCalm tablets → `boiron-coldcalm-meltaways`
// - children's ColdCalm carton names → `boiron-coldcalm-meltaways` /
//   `boiron-coldcalm-kids-liquid` (no new children's ColdCalm id)
// - Calendula Burn → `boiron-calendula-ointment`
// - Arnicare Roll-On → `boiron-arnicare-gel`
// - Oscillo packs → `boiron-oscillococcinum-200ck`
// - Chestal Honey / Children's Chestal Honey → `boiron-chestal-adult-honey`
//   / `boiron-chestal-kids-honey`
// - Chestal Kids C&C pellets → `boiron-chestal-kids-pellets`
// - ColdCalm Kids Liquid Doses → `boiron-coldcalm-kids-liquid`
// - SleepCalm Kids pellets / liquid → `boiron-sleepcalm-kids-pellets` /
//   `boiron-sleepcalm-kids-liquid`
//
// DO NOT WRITE: kits, ColicComfort, dead lemon SPL 6b658f98,
// Quietude as its own id, children's ColdCalm as a new id, GasCalm as a
// new id. Arnica 30C Tablets share `boiron-arnicare-tablets` (same SPL /
// actives / OI). Named Clean Picks tube is `boiron-arnica-30c-pellets`
// (shop arnica-montana) — do not also emit arnica-montana in the tube
// factory. Dead lemon Arnicare Leg Cramps SPL is discontinued comment
// only; current unflavored meltaway is setid 051a4e17 (shop slugs
// arnicare-leg-cramps + arnicare-leg-cramps-pm-meltaway-tablets share
// that formulaId).
//
// TUBE COUNT: 365 shop slugs in this factory + 1 named Arnica 30C Pellets
// row = 366 class pellet tubes from the 15 Sep 2026 BoironUSA product
// sitemap (552 slugs − kits − gemmo − branded). Gemmo is written below
// (17 herbal-liquid rows), not in the pellet factory.
//
// TALLY (unverified drafts in THIS file): 436 rows — Clean 402 / Caution 34 /
// Avoid 0. Single-remedy tube factory: 365. Gemmo herbal liquids: 17.
// Arnicare Cream is TWO rows (shea shop OI vs DailyMed PEG panel).
// Reuse formulaIds (not in this file): 17.
// Independently Clean in THIS batch: croscarmellose+lactose+stearate
// tablets, lactose+sucrose pellets, gelatin/glycerin/water YeastCalm
// suppositories, and hard-fat HemCalm suppositories. Caution is Limited-
// only (alcohol vehicle / benzoate / caprylyl-sorbic-hexanediol),
// standalone Caution-table inactives (ferment / acrylamide copolymer /
// chlorhexidine / isohexadecane / sorbitan oleate), PS80 Moderate, and
// PEG-family Moderate (cream PEG panel). Limited-only never Avoid.
//
// STILL BLOCKED (do not invent): none on this follow-up. Gemmo OI is
// alcohol + glycerin + water (all in §5 after the alcohol-vehicle Limited
// lock). Cream PEG panel (setid 542b41dd) is now writable — PEG / pegoxol-7
// stearate / lauroyl macrogolglycerides = existing PEG Moderate; cetyl
// palmitate = Cleared wax. ColicComfort is not on the US shop (Camilia
// Tummy replaced it) — list 4 / PR comment only, not a missing-row. Dead
// lemon Leg Cramps SPL 6b658f98 = discontinued comment only.
//
// SEPT 15 BOIRON WRITE LOCKS APPLIED
// - Alcohol / ethyl alcohol as a VEHICLE = Limited. Tap: it is the
//   vehicle, not the gummy High. Distinct from drinking alcohol as an
//   active. Not Avoid.
// - Lactobacillus ferment (topical) = standalone Caution-table (riskLevel
//   'cleared', §5 Caution source — same pattern as batch32 cultured
//   dextrose / batch33 lavender). Product verdict still Caution.
// - Acrylamide / sodium acryloyldimethyltaurate copolymer, chlorhexidine,
//   isohexadecane, sorbitan oleate = standalone Caution-table (cleared +
//   §5 Caution source). Not Avoid.
// - PS80 = Moderate.
// - Shea / coconut / almond in cream = Cleared + form tap: "Seed/industrial
//   oils are flagged in gummies. In this cream/topical they are not that
//   High rule."
// - Arachidyl alcohol / glucoside / behenyl = Cleared fatty-alcohol family.
// - Caprylyl glycol / hexanediol / sorbic acid = Limited.
// - L-carvone = Limited.
// - Hard fat / NaOH / dimethicone copolyol / petrolatum / EDTA / carbomer
//   / glycerin / water / honey / sucrose / citric = Cleared as locked.
// - Gemmotherapy IN (full current US BoironUSA shop, 17 bud/shoot SKUs).
//   Alcohol as extract vehicle = Limited, not Avoid. Same tap as the
//   oral-homeopathic / topical vehicle lock: alcohol is the vehicle, not
//   the gummy High. Glycerin + water Cleared. Limited-only = Caution.
// - Cetyl palmitate = Cleared wax (fatty-alcohol / wax family).
// - PEG / pegoxol-7 stearate / lauroyl macrogolglycerides = existing
//   PEG Moderate/Caution family. Arnicare Cream setid 542b41dd writes a
//   second row for that PEG panel because OI differs from the shea shop
//   cream. Dead lemon Leg Cramps SPL = comment only.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const COLD_FLU = 'Cold & Flu';
const PAIN_FEVER = 'Pain & Fever';
const ALLERGIES = 'Allergies';
const SLEEP = 'Sleep';
const IMMUNE = 'Immune Support';
const DIGESTIVE = 'Digestive';
const FIRST_AID = 'First Aid';
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const BRAND = 'Boiron';
const UNVERIFIED_NOTE = 'draft, not verified';
const SINGLE_REMEDY_FORMULA = 'boiron-single-remedy-pellets';
const PELLET_CLASS_SETID = '0682b0ee-eebb-c149-e063-6294a90a6293';

const CREAM_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this cream/topical they are not that High rule.';

const ALCOHOL_VEHICLE_LINE =
  'Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid.';

const METH = {
  cleared: 'Methodology §5 Cleared',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE — oral homeopathic liquid or topical first-aid). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  carvone: 'Methodology §5 Limited-risk (L-carvone — flavor isolate)',
  caprylyl:
    'Methodology §5 Limited-risk (caprylyl glycol / hexanediol / sorbic acid — preservative family)',
  hexanediol:
    'Methodology §5 Limited-risk (caprylyl glycol / hexanediol / sorbic acid — preservative family)',
  sorbic:
    'Methodology §5 Limited-risk (caprylyl glycol / hexanediol / sorbic acid — preservative family)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  petrolatum: 'Methodology §5 Cleared (petrolatum, topical — first-aid ointment base)',
  fattyAlcohol:
    'Methodology §5 Cleared (arachidyl alcohol / arachidyl glucoside / behenyl alcohol — fatty-alcohol family)',
  hardFat: 'Methodology §5 Cleared (hard fat — suppository base)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster)',
  dimethicone: 'Methodology §5 Cleared (dimethicone / dimethicone copolyol)',
  carbomer: 'Methodology §5 Cleared (carbomer homopolymer)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / acacia / pectin — locked v1.6)',
  honey:
    'Methodology §5 Cleared-class (honey — sweetener; locked Sept 14, 2026). Honest note only: not for under 1. No dosing.',
  creamOil: `Methodology §5 Cleared (shea butter / coconut oil / sweet almond oil in cream or topical — not the gummy seed-oil High rule). ${CREAM_OIL_LINE}`,
  ferment:
    'Methodology §5 Caution (lactobacillus ferment, topical — ferment system; standalone Caution, not additive-scored, not Avoid).',
  acrylamide:
    'Methodology §5 Caution (acrylamide / sodium acryloyldimethyltaurate copolymer, topical — standalone Caution, not additive-scored, not Avoid).',
  chlorhexidine:
    'Methodology §5 Caution (chlorhexidine digluconate, topical — standalone Caution, not additive-scored, not Avoid).',
  isohexadecane:
    'Methodology §5 Caution (isohexadecane, topical — standalone Caution, not additive-scored, not Avoid).',
  sorbitanOleate:
    'Methodology §5 Caution (sorbitan oleate, topical — standalone Caution, not additive-scored, not Avoid).',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol / PEG-stearate / pegoxol-7 stearate / lauroyl macrogolglycerides). Ethylene-oxide/1,4-dioxane contamination risk. Same Moderate/Caution family row. Not Avoid.',
  cetylPalmitate:
    'Methodology §5 Cleared (cetyl palmitate — wax ester; fatty-alcohol / wax family).',
} as const;

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const BOIRON_RETAILERS = [
  'BoironUSA.com',
  'CVS',
  'Walgreens',
  'Walmart',
  'Whole Foods',
  'Sprouts',
  'Amazon',
  'Thrive',
] as const;

const COLDCALM = 'coldcalm-meltaways';
const CHESTAL_KIDS_PELLETS = 'boiron-chestal-kids-pellets';
const ARNICARE_GEL = 'boiron-arnicare-gel';
const CALENDULA_OINT = 'boiron-calendula-ointment';
const TINY_COLD_DAY = 'hylands-baby-tiny-cold-day';
const HEMCALM_TABS = 'boiron-hemcalm-tablets';
const THROATCALM_TABS = 'boiron-throatcalm-tablets';
const ARNICARE_TABS = 'boiron-arnicare-tablets';
const CHESTAL_CC_TABS = 'boiron-chestal-cold-cough-tablets';

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

function shop(slug: string): string {
  return `https://www.boironusa.com/product/${slug}/`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

function tabletBase(setid: string): IngredientFlag[] {
  return [
    flag('Croscarmellose sodium', 'cleared', dailymed(setid, METH.cleared)),
    flag('Lactose', 'cleared', dailymed(setid, METH.cleared)),
    flag('Magnesium stearate', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function tabletBaseShop(url: string): IngredientFlag[] {
  return [
    flag('Croscarmellose sodium', 'cleared', labelCite(url, METH.cleared)),
    flag('Lactose', 'cleared', labelCite(url, METH.cleared)),
    flag('Magnesium stearate', 'cleared', labelCite(url, METH.cleared)),
  ];
}

function pelletBase(setid: string): IngredientFlag[] {
  return [
    flag('Lactose', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sucrose', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function pelletClassOi(slug: string): IngredientFlag[] {
  const cite = `DailyMed class example setid ${PELLET_CLASS_SETID} siblings + ${shop(slug)}`;
  return [
    flag('Lactose', 'cleared', labelCite(cite, METH.cleared)),
    flag('Sucrose', 'cleared', labelCite(cite, METH.cleared)),
  ];
}

function menopauseOi(setid: string): IngredientFlag[] {
  return [
    flag('Lactose', 'cleared', dailymed(setid, METH.cleared)),
    flag('Magnesium stearate', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sucrose', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function yeastSuppOi(setid: string): IngredientFlag[] {
  return [
    flag('Gelatin', 'cleared', dailymed(setid, METH.cleared)),
    flag('Glycerin', 'cleared', dailymed(setid, METH.cleared)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function hemSuppOi(setid: string): IngredientFlag[] {
  return [flag('Hard fat', 'cleared', dailymed(setid, METH.hardFat))];
}

function ointmentBase(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Petrolatum', 'cleared', dailymed(setid, METH.petrolatum)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function honeySyrupOi(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Sodium benzoate', 'limited', dailymed(setid, METH.benzoate)),
    flag('Citric acid', 'cleared', dailymed(setid, METH.cleared)),
    flag('Honey', 'cleared', dailymed(setid, METH.honey)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sucrose', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function originalSyrupOi(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Sodium benzoate', 'limited', dailymed(setid, METH.benzoate)),
    flag('Citric acid', 'cleared', dailymed(setid, METH.cleared)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sucrose', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function alcoholWaterOi(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function sprayOi(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('L-carvone', 'limited', dailymed(setid, METH.carvone)),
    flag('Glycerin', 'cleared', dailymed(setid, METH.cleared)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function sheaPanel(setid: string): IngredientFlag[] {
  return [
    flag('Arachidyl alcohol', 'cleared', dailymed(setid, METH.fattyAlcohol)),
    flag('Arachidyl glucoside', 'cleared', dailymed(setid, METH.fattyAlcohol)),
    flag('Behenyl alcohol', 'cleared', dailymed(setid, METH.fattyAlcohol)),
    flag('Butyrospermum parkii (shea) butter', 'cleared', dailymed(setid, METH.creamOil)),
    flag('Coconut oil', 'cleared', dailymed(setid, METH.creamOil)),
    flag('Glycerin', 'cleared', dailymed(setid, METH.cleared)),
    flag('Lactobacillus ferment', 'cleared', dailymed(setid, METH.ferment)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Xanthan gum', 'cleared', dailymed(setid, METH.gums)),
  ];
}

function arthritisCreamOi(setid: string): IngredientFlag[] {
  return [
    flag(
      'Sodium acryloyldimethyltaurate / acrylamide copolymer',
      'cleared',
      dailymed(setid, METH.acrylamide),
    ),
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Chlorhexidine digluconate', 'cleared', dailymed(setid, METH.chlorhexidine)),
    flag('Glycerin', 'cleared', dailymed(setid, METH.cleared)),
    flag('Isohexadecane', 'cleared', dailymed(setid, METH.isohexadecane)),
    flag('Polysorbate 80', 'moderate', dailymed(setid, METH.ps80)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sorbitan oleate', 'cleared', dailymed(setid, METH.sorbitanOleate)),
    flag('Sweet almond oil', 'cleared', dailymed(setid, METH.creamOil)),
  ];
}

function calendulaGelOi(setid: string): IngredientFlag[] {
  return [
    flag('Caprylyl glycol', 'limited', dailymed(setid, METH.caprylyl)),
    flag('Carbomer', 'cleared', dailymed(setid, METH.carbomer)),
    flag('Dimethicone copolyol', 'cleared', dailymed(setid, METH.dimethicone)),
    flag('Disodium EDTA', 'cleared', dailymed(setid, METH.edta)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sodium hydroxide', 'cleared', dailymed(setid, METH.naoh)),
    flag('Sorbic acid', 'limited', dailymed(setid, METH.sorbic)),
    flag('1,2-Hexanediol', 'limited', dailymed(setid, METH.hexanediol)),
  ];
}

function bruiseGelOi(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Carbomer', 'cleared', dailymed(setid, METH.carbomer)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sodium hydroxide', 'cleared', dailymed(setid, METH.naoh)),
  ];
}

const CREAM_PEG_SETID = '542b41dd-f285-4e48-a67b-8e69523b143a';

function creamPegPanel(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Caprylyl glycol', 'limited', dailymed(setid, METH.caprylyl)),
    flag('Carbomer', 'cleared', dailymed(setid, METH.carbomer)),
    flag('Cetyl palmitate', 'cleared', dailymed(setid, METH.cetylPalmitate)),
    flag('Glycerin', 'cleared', dailymed(setid, METH.cleared)),
    flag('Lauroyl macrogolglycerides', 'moderate', dailymed(setid, METH.peg)),
    flag('Pegoxol-7 stearate', 'moderate', dailymed(setid, METH.peg)),
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sodium hydroxide', 'cleared', dailymed(setid, METH.naoh)),
    flag('Sorbic acid', 'limited', dailymed(setid, METH.sorbic)),
    flag('1,2-Hexanediol', 'limited', dailymed(setid, METH.hexanediol)),
  ];
}

function gemmoOi(slug: string): IngredientFlag[] {
  const cite = shop(slug);
  return [
    flag('Alcohol', 'limited', labelCite(cite, METH.alcoholVehicle)),
    flag('Glycerin', 'cleared', labelCite(cite, METH.cleared)),
    flag('Purified water', 'cleared', labelCite(cite, METH.cleared)),
  ];
}

function homeoNote(lead: string): string {
  return `${lead} Homeopathic — cleanliness only, no efficacy claim. ${CARLSTON} Contains lactose. Pack sizes share formulaId.`;
}

function homeoNoteNoLac(lead: string): string {
  return `${lead} Homeopathic — cleanliness only, no efficacy claim. ${CARLSTON} Pack sizes share formulaId.`;
}

const COLD_ALTS: CleanAlternative[] = [
  alt(
    COLDCALM,
    'Independently Clean homeopathic meltaway already on main (Boiron ColdCalm, formulaId boiron-coldcalm-meltaways, minAge 4). Form: meltaway tablet vs liquid / syrup — labeled, not a hard filter (§6).',
  ),
];

const KIDS_CHESTAL_ALTS: CleanAlternative[] = [
  alt(
    CHESTAL_KIDS_PELLETS,
    'Independently Clean kids cough pellet already on main (Chestal Kids C&C pellets, minAge 4). Form: pellet vs syrup — labeled, not a hard filter (§6). Different actives from this original-syrup row.',
  ),
  alt(
    COLDCALM,
    'Independently Clean kids-usable homeopathic meltaway already on main (minAge 4). Form: meltaway tablet vs syrup — labeled, not a hard filter (§6).',
  ),
];

const BABY_COLD_ALTS: CleanAlternative[] = [
  alt(
    TINY_COLD_DAY,
    "Independently Clean baby homeopathic tablet already on main (Hyland's Baby Tiny Cold Daytime, minAge 0). Form: meltaway tablet vs liquid doses — labeled, not a hard filter (§6). Cleanliness only.",
  ),
];

const ARNICARE_GEL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean adult first-aid / topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs ointment / cream — labeled, not a hard filter (§6).',
  ),
];

const CALENDULA_ALTS: CleanAlternative[] = [
  alt(
    CALENDULA_OINT,
    'Independently Clean adult First Aid analog already on main (Boiron Calendula Ointment). Form: ointment vs gel — labeled, not a hard filter (§6).',
  ),
];

const HEMCALM_ALTS: CleanAlternative[] = [
  alt(
    HEMCALM_TABS,
    'Independently Clean HemCalm analog in this batch (HemCalm Tablets, croscarmellose + lactose + magnesium stearate). Form: meltaway tablet vs ointment — labeled, not a hard filter (§6).',
  ),
];

const THROAT_ALTS: CleanAlternative[] = [
  alt(
    THROATCALM_TABS,
    'Independently Clean ThroatCalm analog in this batch (ThroatCalm Tablets). Form: meltaway tablet vs spray — labeled, not a hard filter (§6).',
  ),
];

const ARTHRITIS_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_TABS,
    'Independently Clean Arnica analog in this batch (Arnicare / Arnica 30C Tablets). Form: meltaway tablet vs cream — labeled, not a hard filter (§6).',
  ),
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream — labeled, not a hard filter (§6).',
  ),
];

const CHESTAL_ORIG_ALTS: CleanAlternative[] = [
  alt(
    CHESTAL_CC_TABS,
    'Independently Clean Dulcamara-family analog in this batch (Chestal Cold & Cough Meltaway Tablets, minAge 4). Form: meltaway tablet vs syrup — labeled, not a hard filter (§6).',
  ),
  alt(
    COLDCALM,
    'Independently Clean homeopathic meltaway already on main (minAge 4). Form: meltaway tablet vs syrup — labeled, not a hard filter (§6).',
  ),
];

const TUBE_NOTE =
  'FOUNDER-STYLE DRAFT: single-remedy pellet tube = Clean. Class OI lactose+sucrose = 0 pt. Potencies/pack sizes share the class formulaId `boiron-single-remedy-pellets`. Do not invent a unique grade per tube. Carton has the use and age chart. Homeopathic — cleanliness only, no efficacy claim. ' +
  CARLSTON +
  ' Contains lactose.';

function singleTube(
  slug: string,
  remedyName: string,
  category: string,
): RatingRecord {
  return {
    id: `boiron-${slug}-pellets`,
    productName: `Boiron ${remedyName} Pellets`,
    brand: BRAND,
    category,
    formulaId: SINGLE_REMEDY_FORMULA,
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: remedyName, strength: 'potency on tube' }],
    inactiveIngredients: pelletClassOi(slug),
    verdict: 'clean',
    honestNote: TUBE_NOTE,
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      `${shop(slug)} — ${UNVERIFIED_NOTE}`,
      `DailyMed class example setid ${PELLET_CLASS_SETID} (siblings) — ${UNVERIFIED_NOTE}`,
      CARLSTON,
    ],
  };
}

const SINGLE_TUBES: RatingRecord[] = [
  singleTube('abelmoschus', 'Abelmoschus', PAIN_FEVER),
  singleTube('abiescanadensis', 'Abies Canadensis', PAIN_FEVER),
  singleTube('abiesnigra', 'Abies Nigra', DIGESTIVE),
  singleTube('abrotanum', 'Abrotanum', PAIN_FEVER),
  singleTube('aconitum-napellus', 'Aconitum Napellus', COLD_FLU),
  singleTube('aesculus-hippocastanum', 'Aesculus Hippocastanum', PAIN_FEVER),
  singleTube('aethusacynapium', 'Aethusa Cynapium', PAIN_FEVER),
  singleTube('agaricusmuscarius', 'Agaricus Muscarius', PAIN_FEVER),
  singleTube('agraphisnutans', 'Agraphis Nutans', PAIN_FEVER),
  singleTube('ailanthusglandulosus', 'Ailanthus Glandulosus', PAIN_FEVER),
  singleTube('alfalfa', 'Alfalfa', PAIN_FEVER),
  singleTube('allium-cepa', 'Allium Cepa', COLD_FLU),
  singleTube('alliumsativum', 'Allium Sativum', COLD_FLU),
  singleTube('aloe', 'Aloe', DIGESTIVE),
  singleTube('alumen', 'Alumen', PAIN_FEVER),
  singleTube('alumina', 'Alumina', PAIN_FEVER),
  singleTube('aluminasilicata', 'Alumina Silicata', PAIN_FEVER),
  singleTube('aluminiummetallicum', 'Aluminium Metallicum', PAIN_FEVER),
  singleTube('ambrosiaartemisiaefolia', 'Ambrosia Artemisiaefolia', ALLERGIES),
  singleTube('ammoniumcarbonicum', 'Ammonium Carbonicum', PAIN_FEVER),
  singleTube('ammoniummuriaticum', 'Ammonium Muriaticum', PAIN_FEVER),
  singleTube('ammoniumphosphoricum', 'Ammonium Phosphoricum', PAIN_FEVER),
  singleTube('amylnitrosum', 'Amyl Nitrosum', PAIN_FEVER),
  singleTube('anacardiumoccidentale', 'Anacardium Occidentale', PAIN_FEVER),
  singleTube('anacardiumorientale', 'Anacardium Orientale', PAIN_FEVER),
  singleTube('anagallisarvensis', 'Anagallis Arvensis', PAIN_FEVER),
  singleTube('anatherummuricatum', 'Anatherum Muricatum', PAIN_FEVER),
  singleTube('antimonium-crudum', 'Antimonium Crudum', PAIN_FEVER),
  singleTube('antimonium-tartaricum', 'Antimonium Tartaricum', COLD_FLU),
  singleTube('antimoniumiodatum', 'Antimonium Iodatum', PAIN_FEVER),
  singleTube('apis-mellifica', 'Apis Mellifica', FIRST_AID),
  singleTube('apisvenenumpurum', 'Apis Venenum Purum', PAIN_FEVER),
  singleTube('aquamarina', 'Aqua Marina', PAIN_FEVER),
  singleTube('araliaracemosa', 'Aralia Racemosa', PAIN_FEVER),
  singleTube('argentum-nitricum', 'Argentum Nitricum', PAIN_FEVER),
  singleTube('argentummetallicum', 'Argentum Metallicum', PAIN_FEVER),
  singleTube('aristolochiaclematitis', 'Aristolochia Clematitis', PAIN_FEVER),
  singleTube('arnicamontanaradix', 'Arnica montana radix', PAIN_FEVER),
  singleTube('arsenicum-album', 'Arsenicum Album', DIGESTIVE),
  singleTube('arsenicumbromatum', 'Arsenicum Bromatum', PAIN_FEVER),
  singleTube('arsenicumiodatum', 'Arsenicum Iodatum', PAIN_FEVER),
  singleTube('arsenicummetallicum', 'Arsenicum Metallicum', PAIN_FEVER),
  singleTube('arssulphflav', 'Ars Sulph Flav', PAIN_FEVER),
  singleTube('arssulphrubrum', 'Ars Sulph Rubrum', PAIN_FEVER),
  singleTube('artemisiavulgaris', 'Artemisia Vulgaris', PAIN_FEVER),
  singleTube('arum-triphyllum', 'Arum Triphyllum', PAIN_FEVER),
  singleTube('arummaculatum', 'Arum Maculatum', PAIN_FEVER),
  singleTube('arundomauritanica', 'Arundo Mauritanica', ALLERGIES),
  singleTube('asafoetida', 'Asafoetida', PAIN_FEVER),
  singleTube('asarumeuropaeum3c', 'Asarum europaeum', PAIN_FEVER),
  singleTube('asteriasrubens', 'Asterias Rubens', PAIN_FEVER),
  singleTube('aurumiodatum', 'Aurum Iodatum', PAIN_FEVER),
  singleTube('aurummetallicum', 'Aurum Metallicum', PAIN_FEVER),
  singleTube('aurummuriaticum', 'Aurum Muriaticum', PAIN_FEVER),
  singleTube('aurummuriatnatronatum', 'Aurum Muriat Natronatum', PAIN_FEVER),
  singleTube('avenasativa', 'Avena Sativa', SLEEP),
  singleTube('baptisiatinctoria', 'Baptisia Tinctoria', COLD_FLU),
  singleTube('barytacarbonica', 'Baryta Carbonica', PAIN_FEVER),
  singleTube('barytaiodata', 'Baryta Iodata', PAIN_FEVER),
  singleTube('barytamuriatica', 'Baryta Muriatica', PAIN_FEVER),
  singleTube('belladonna', 'Belladonna', PAIN_FEVER),
  singleTube('bellisperennis', 'Bellis Perennis', FIRST_AID),
  singleTube('benzinum', 'Benzinum', PAIN_FEVER),
  singleTube('benzoicumacidum', 'Benzoicum Acidum', PAIN_FEVER),
  singleTube('berberisaquifolium', 'Berberis Aquifolium', PAIN_FEVER),
  singleTube('berberisvulgaris', 'Berberis Vulgaris', PAIN_FEVER),
  singleTube('berylliummetallicum', 'Beryllium Metallicum', PAIN_FEVER),
  singleTube('bismuthummetallicum', 'Bismuthum Metallicum', PAIN_FEVER),
  singleTube('bismuthumsubnitricum', 'Bismuthum Subnitricum', PAIN_FEVER),
  singleTube('blattaorientalis', 'Blatta Orientalis', PAIN_FEVER),
  singleTube('borax', 'Borax', PAIN_FEVER),
  singleTube('bovista', 'Bovista', PAIN_FEVER),
  singleTube('bromium', 'Bromium', PAIN_FEVER),
  singleTube('bryonia', 'Bryonia', COLD_FLU),
  singleTube('cadmiummetallicum', 'Cadmium Metallicum', PAIN_FEVER),
  singleTube('cadmiumsulphuratum', 'Cadmium Sulphuratum', PAIN_FEVER),
  singleTube('cadmiumsulphuricum', 'Cadmium Sulphuricum', PAIN_FEVER),
  singleTube('cajuputum', 'Cajuputum', PAIN_FEVER),
  singleTube('caladiumseguinum', 'Caladium Seguinum', PAIN_FEVER),
  singleTube('calcarea-carbonica', 'Calcarea Carbonica', PAIN_FEVER),
  singleTube('calcarea-fluorica', 'Calcarea Fluorica', PAIN_FEVER),
  singleTube('calcarea-phosphorica', 'Calcarea Phosphorica', PAIN_FEVER),
  singleTube('calcarea-sulphurica', 'Calcarea Sulphurica', PAIN_FEVER),
  singleTube('calcareaiodata', 'Calcarea Iodata', PAIN_FEVER),
  singleTube('calcareasilicata', 'Calcarea Silicata', PAIN_FEVER),
  singleTube('calendulaofficinalis', 'Calendula officinalis', FIRST_AID),
  singleTube('camphora', 'Camphora', PAIN_FEVER),
  singleTube('candidaalbicans', 'Candida Albicans', PAIN_FEVER),
  singleTube('cantharis', 'Cantharis', FIRST_AID),
  singleTube('capsicumannuum', 'Capsicum Annuum', PAIN_FEVER),
  singleTube('carbo-vegetabilis', 'Carbo Vegetabilis', DIGESTIVE),
  singleTube('carboanimalis', 'Carbo Animalis', PAIN_FEVER),
  singleTube('carbolicumacidum', 'Carbolicum Acidum', PAIN_FEVER),
  singleTube('carboneumsulphuratum', 'Carboneum Sulphuratum', PAIN_FEVER),
  singleTube('carduusmarianus', 'Carduus Marianus', PAIN_FEVER),
  singleTube('caulophyllum-thalictroides', 'Caulophyllum Thalictroides', PAIN_FEVER),
  singleTube('causticum', 'Causticum', COLD_FLU),
  singleTube('cedron', 'Cedron', PAIN_FEVER),
  singleTube('cenchriscontortrix', 'Cenchris Contortrix', PAIN_FEVER),
  singleTube('chamomilla', 'Chamomilla', PAIN_FEVER),
  singleTube('cheiranthuscheiri', 'Cheiranthus Cheiri', PAIN_FEVER),
  singleTube('chelidonium-majus', 'Chelidonium Majus', PAIN_FEVER),
  singleTube('chenopodium-anthelminticum', 'Chenopodium Anthelminticum', PAIN_FEVER),
  singleTube('chininumarsenicosum', 'Chininum Arsenicosum', PAIN_FEVER),
  singleTube('chininumsalicylicum', 'Chininum Salicylicum', PAIN_FEVER),
  singleTube('chininumsulphuricum', 'Chininum Sulphuricum', PAIN_FEVER),
  singleTube('chionanthus-virginica', 'Chionanthus Virginica', PAIN_FEVER),
  singleTube('chlorinum', 'Chlorinum', PAIN_FEVER),
  singleTube('cicutavirosa', 'Cicuta Virosa', PAIN_FEVER),
  singleTube('cimicifuga-racemosa', 'Cimicifuga Racemosa', PAIN_FEVER),
  singleTube('cina', 'Cina', PAIN_FEVER),
  singleTube('cinchona-officinalis', 'Cinchona Officinalis', DIGESTIVE),
  singleTube('cinerariamaritima', 'Cineraria Maritima', PAIN_FEVER),
  singleTube('cinnamomum', 'Cinnamomum', PAIN_FEVER),
  singleTube('cobaltummetallicum', 'Cobaltum Metallicum', PAIN_FEVER),
  singleTube('cocculus-indicus', 'Cocculus Indicus', DIGESTIVE),
  singleTube('coccuscacti', 'Coccus Cacti', COLD_FLU),
  singleTube('coffea-cruda', 'Coffea Cruda', SLEEP),
  singleTube('coffeatosta', 'Coffea Tosta', SLEEP),
  singleTube('colchicumautumnale', 'Colchicum Autumnale', PAIN_FEVER),
  singleTube('collinsoniacanadensis', 'Collinsonia Canadensis', DIGESTIVE),
  singleTube('colocynthis', 'Colocynthis', DIGESTIVE),
  singleTube('condurango', 'Condurango', PAIN_FEVER),
  singleTube('coniummaculatum', 'Conium Maculatum', PAIN_FEVER),
  singleTube('coralliumrubrum', 'Corallium Rubrum', PAIN_FEVER),
  singleTube('cortisoneaceticum', 'Cortisone Aceticum', PAIN_FEVER),
  singleTube('crocussativus', 'Crocus Sativus', PAIN_FEVER),
  singleTube('croton-tiglium', 'Croton Tiglium', PAIN_FEVER),
  singleTube('cuprum-metallicum', 'Cuprum Metallicum', PAIN_FEVER),
  singleTube('cuprumaceticum', 'Cuprum Aceticum', PAIN_FEVER),
  singleTube('cuprumarsenicosum', 'Cuprum Arsenicosum', PAIN_FEVER),
  singleTube('cuprumoxydatumnigrum', 'Cuprum Oxydatum Nigrum', PAIN_FEVER),
  singleTube('curare', 'Curare', PAIN_FEVER),
  singleTube('cyclamen-europaeum', 'Cyclamen Europaeum', PAIN_FEVER),
  singleTube('cyclameneur', 'Cyclameneur', PAIN_FEVER),
  singleTube('dioscoreavillosa', 'Dioscorea Villosa', PAIN_FEVER),
  singleTube('dolichospruriens', 'Dolichos Pruriens', PAIN_FEVER),
  singleTube('drosera', 'Drosera', COLD_FLU),
  singleTube('dulcamara', 'Dulcamara', COLD_FLU),
  singleTube('echinacea', 'Echinacea', PAIN_FEVER),
  singleTube('echinaceapurpurea', 'Echinacea Purpurea', PAIN_FEVER),
  singleTube('elapscorallinus', 'Elaps Corallinus', PAIN_FEVER),
  singleTube('equisetumarvense', 'Equisetum Arvense', PAIN_FEVER),
  singleTube('equisetumhyemale', 'Equisetum Hyemale', PAIN_FEVER),
  singleTube('erigeroncanadensis', 'Erigeron Canadensis', PAIN_FEVER),
  singleTube('eucalyptusglobulus', 'Eucalyptus Globulus', COLD_FLU),
  singleTube('eugeniajambosa', 'Eugenia Jambosa', PAIN_FEVER),
  singleTube('eupatorium-perfoliatum', 'Eupatorium Perfoliatum', COLD_FLU),
  singleTube('euphrasia-officinalis', 'Euphrasia Officinalis', ALLERGIES),
  singleTube('fagopyrumesculentum', 'Fagopyrum Esculentum', PAIN_FEVER),
  singleTube('ferrum-phosphoricum', 'Ferrum Phosphoricum', COLD_FLU),
  singleTube('ferrummetallicum', 'Ferrum Metallicum', PAIN_FEVER),
  singleTube('ferrumpicricum', 'Ferrum Picricum', PAIN_FEVER),
  singleTube('ferrumsulphuricum', 'Ferrum Sulphuricum', PAIN_FEVER),
  singleTube('filixmas', 'Filix Mas', PAIN_FEVER),
  singleTube('folliculinum', 'Folliculinum', PAIN_FEVER),
  singleTube('formicarufa', 'Formica Rufa', PAIN_FEVER),
  singleTube('fragariavesca', 'Fragaria Vesca', PAIN_FEVER),
  singleTube('fucusvesiculosus', 'Fucus Vesiculosus', PAIN_FEVER),
  singleTube('fumariaofficinalis', 'Fumaria Officinalis', PAIN_FEVER),
  singleTube('gallicumacidum', 'Gallicum Acidum', PAIN_FEVER),
  singleTube('galphimia-glauca', 'Galphimia Glauca', ALLERGIES),
  singleTube('gelsemium-sempervirens', 'Gelsemium Sempervirens', COLD_FLU),
  singleTube('geraniummaculatum', 'Geranium Maculatum', PAIN_FEVER),
  singleTube('glonoinum', 'Glonoinum', PAIN_FEVER),
  singleTube('gnaphalium-polycephalum', 'Gnaphalium Polycephalum', PAIN_FEVER),
  singleTube('gossypiumherbaceum', 'Gossypium Herbaceum', PAIN_FEVER),
  singleTube('granatum', 'Granatum', PAIN_FEVER),
  singleTube('graphites', 'Graphites', PAIN_FEVER),
  singleTube('gratiolaofficinalis', 'Gratiola Officinalis', PAIN_FEVER),
  singleTube('grindelia', 'Grindelia', COLD_FLU),
  singleTube('gunpowder', 'Gunpowder', PAIN_FEVER),
  singleTube('hamamelis-virginiana', 'Hamamelis Virginiana', FIRST_AID),
  singleTube('harpagophytum', 'Harpagophytum', PAIN_FEVER),
  singleTube('heklalava', 'Hekla Lava', FIRST_AID),
  singleTube('helleborusniger', 'Helleborus Niger', PAIN_FEVER),
  singleTube('heloniasdioica', 'Helonias Dioica', PAIN_FEVER),
  singleTube('hepar-sulphuris-calcareum', 'Hepar Sulphuris Calcareum', COLD_FLU),
  singleTube('hepaticatriloba', 'Hepatica Triloba', PAIN_FEVER),
  singleTube('histaminum-hydrochloricum', 'Histaminum Hydrochloricum', ALLERGIES),
  singleTube('hurabrasiliensis', 'Hura Brasiliensis', PAIN_FEVER),
  singleTube('hydrastis-canadensis', 'Hydrastis Canadensis', COLD_FLU),
  singleTube('hydrocotyleasiatica', 'Hydrocotyle Asiatica', PAIN_FEVER),
  singleTube('hydrocyanicumacidum', 'Hydrocyanicum Acidum', PAIN_FEVER),
  singleTube('hydrofluoricumacidum', 'Hydrofluoricum Acidum', PAIN_FEVER),
  singleTube('hyoscyamusniger', 'Hyoscyamus Niger', SLEEP),
  singleTube('hypericum-perforatum', 'Hypericum Perforatum', FIRST_AID),
  singleTube('iberisamara', 'Iberis Amara', PAIN_FEVER),
  singleTube('ignatia-amara', 'Ignatia Amara', SLEEP),
  singleTube('iodium', 'Iodium', PAIN_FEVER),
  singleTube('ipecacuanha', 'Ipecacuanha', COLD_FLU),
  singleTube('irisversicolor', 'Iris Versicolor', PAIN_FEVER),
  singleTube('jalapa', 'Jalapa', DIGESTIVE),
  singleTube('juglansregia', 'Juglans Regia', PAIN_FEVER),
  singleTube('kali-bichromicum', 'Kali Bichromicum', COLD_FLU),
  singleTube('kali-carbonicum', 'Kali Carbonicum', PAIN_FEVER),
  singleTube('kali-iodatum', 'Kali Iodatum', PAIN_FEVER),
  singleTube('kali-muriaticum', 'Kali Muriaticum', COLD_FLU),
  singleTube('kali-phosphoricum', 'Kali Phosphoricum', SLEEP),
  singleTube('kali-sulphuricum', 'Kali Sulphuricum', COLD_FLU),
  singleTube('kaliarsenicosum', 'Kali Arsenicosum', PAIN_FEVER),
  singleTube('kalibromatum', 'Kali Bromatum', PAIN_FEVER),
  singleTube('kalichloricum', 'Kali Chloricum', PAIN_FEVER),
  singleTube('kalmialatifolia', 'Kalmia Latifolia', PAIN_FEVER),
  singleTube('kreosotum', 'Kreosotum', PAIN_FEVER),
  singleTube('laccaninum', 'Lac Caninum', PAIN_FEVER),
  singleTube('lacdefloratum', 'Lac Defloratum', PAIN_FEVER),
  singleTube('lachesis-mutus', 'Lachesis Mutus', PAIN_FEVER),
  singleTube('lachnanthestinctoria', 'Lachnanthes Tinctoria', PAIN_FEVER),
  singleTube('lacticumacidum', 'Lacticum Acidum', PAIN_FEVER),
  singleTube('lactucavirosa', 'Lactuca Virosa', PAIN_FEVER),
  singleTube('lathyrussativus', 'Lathyrus Sativus', PAIN_FEVER),
  singleTube('laurocerasus', 'Laurocerasus', PAIN_FEVER),
  singleTube('ledum-palustre', 'Ledum Palustre', FIRST_AID),
  singleTube('lemnaminor', 'Lemna Minor', PAIN_FEVER),
  singleTube('liliumtigrinum', 'Lilium Tigrinum', PAIN_FEVER),
  singleTube('lithiumcarbonicum', 'Lithium Carbonicum', PAIN_FEVER),
  singleTube('lobelia-inflata', 'Lobelia Inflata', PAIN_FEVER),
  singleTube('luffaoperculata', 'Luffa Operculata', ALLERGIES),
  singleTube('lycopodium-clavatum', 'Lycopodium Clavatum', DIGESTIVE),
  singleTube('magnesia-phosphorica', 'Magnesia Phosphorica', PAIN_FEVER),
  singleTube('magnesiacarbonica', 'Magnesia Carbonica', PAIN_FEVER),
  singleTube('magnesiamuriatica', 'Magnesia Muriatica', PAIN_FEVER),
  singleTube('magnesiasulphurica', 'Magnesia Sulphurica', PAIN_FEVER),
  singleTube('manganumaceticum', 'Manganum Aceticum', PAIN_FEVER),
  singleTube('manganummetallicum', 'Manganum Metallicum', PAIN_FEVER),
  singleTube('melilotusofficinalis', 'Melilotus Officinalis', PAIN_FEVER),
  singleTube('melissa-officinalis', 'Melissa Officinalis', PAIN_FEVER),
  singleTube('menyanthestrifoliata', 'Menyanthes Trifoliata', PAIN_FEVER),
  singleTube('mercurius-solubilis', 'Mercurius Solubilis', PAIN_FEVER),
  singleTube('mercuriuscorrosivus', 'Mercurius Corrosivus', PAIN_FEVER),
  singleTube('mercuriuscyanatus', 'Mercurius Cyanatus', PAIN_FEVER),
  singleTube('mercuriusdulcis', 'Mercurius Dulcis', PAIN_FEVER),
  singleTube('mercuriusiodatusruber', 'Mercurius Iodatus Ruber', PAIN_FEVER),
  singleTube('mercuriussulphruber', 'Mercurius Sulph Ruber', PAIN_FEVER),
  singleTube('mercuriusvivus', 'Mercurius Vivus', PAIN_FEVER),
  singleTube('mezereum', 'Mezereum', PAIN_FEVER),
  singleTube('millefolium', 'Millefolium', PAIN_FEVER),
  singleTube('momordicabalsamina', 'Momordica Balsamina', PAIN_FEVER),
  singleTube('murexpurpurea', 'Murex Purpurea', PAIN_FEVER),
  singleTube('muriaticumacidum', 'Muriaticum Acidum', PAIN_FEVER),
  singleTube('mygale', 'Mygale', PAIN_FEVER),
  singleTube('myristicasebifera', 'Myristica Sebifera', PAIN_FEVER),
  singleTube('najatripudians', 'Naja Tripudians', PAIN_FEVER),
  singleTube('naphthalinum', 'Naphthalinum', PAIN_FEVER),
  singleTube('natrum-muriaticum', 'Natrum Muriaticum', PAIN_FEVER),
  singleTube('natrum-sulphuricum', 'Natrum Sulphuricum', PAIN_FEVER),
  singleTube('natrumcarbonicum', 'Natrum Carbonicum', PAIN_FEVER),
  singleTube('natrumphosphoricum', 'Natrum Phosphoricum', PAIN_FEVER),
  singleTube('niccolummetallicum', 'Niccolum Metallicum', PAIN_FEVER),
  singleTube('nitricumacidum', 'Nitricum Acidum', PAIN_FEVER),
  singleTube('nux-vomica', 'Nux Vomica', DIGESTIVE),
  singleTube('nuxmoschata', 'Nux Moschata', SLEEP),
  singleTube('ocimumcanum', 'Ocimum Canum', PAIN_FEVER),
  singleTube('oenanthecrocata', 'Oenanthe Crocata', PAIN_FEVER),
  singleTube('oleander', 'Oleander', PAIN_FEVER),
  singleTube('onosmodiumvirginianum', 'Onosmodium Virginianum', PAIN_FEVER),
  singleTube('ornithogalumumbellatum', 'Ornithogalum Umbellatum', PAIN_FEVER),
  singleTube('oxalicumacidum', 'Oxalicum Acidum', PAIN_FEVER),
  singleTube('paeoniaofficinalis', 'Paeonia Officinalis', DIGESTIVE),
  singleTube('palladiummetallicum', 'Palladium Metallicum', PAIN_FEVER),
  singleTube('pareirabrava', 'Pareira Brava', PAIN_FEVER),
  singleTube('parisquadrifolia', 'Paris Quadrifolia', PAIN_FEVER),
  singleTube('passifloraincarnata', 'Passiflora Incarnata', SLEEP),
  singleTube('petroleum', 'Petroleum', DIGESTIVE),
  singleTube('phellandriumaquaticum', 'Phellandrium Aquaticum', PAIN_FEVER),
  singleTube('phosphoricum-acidum', 'Phosphoricum Acidum', PAIN_FEVER),
  singleTube('phosphorus', 'Phosphorus', COLD_FLU),
  singleTube('physostigmavenenosum', 'Physostigma Venenosum', PAIN_FEVER),
  singleTube('phytolacca-decandra', 'Phytolacca Decandra', COLD_FLU),
  singleTube('picricumacidum', 'Picricum Acidum', PAIN_FEVER),
  singleTube('pilocarpus', 'Pilocarpus', PAIN_FEVER),
  singleTube('pipermethysticum', 'Piper Methysticum', PAIN_FEVER),
  singleTube('plantagomajor', 'Plantago Major', PAIN_FEVER),
  singleTube('platinummetallicum', 'Platinum Metallicum', PAIN_FEVER),
  singleTube('plumbummetallicum', 'Plumbum Metallicum', PAIN_FEVER),
  singleTube('podophyllum-peltatum', 'Podophyllum Peltatum', DIGESTIVE),
  singleTube('polygonumpunctatum', 'Polygonum Punctatum', PAIN_FEVER),
  singleTube('pteleatrifoliata', 'Ptelea Trifoliata', PAIN_FEVER),
  singleTube('pulsatilla', 'Pulsatilla', COLD_FLU),
  singleTube('pyrogenium', 'Pyrogenium', PAIN_FEVER),
  singleTube('quebracho', 'Quebracho', PAIN_FEVER),
  singleTube('radiumbromatum', 'Radium Bromatum', PAIN_FEVER),
  singleTube('ranunculusbulbosus', 'Ranunculus Bulbosus', PAIN_FEVER),
  singleTube('raphanussativus', 'Raphanus Sativus', PAIN_FEVER),
  singleTube('ratanhia', 'Ratanhia', DIGESTIVE),
  singleTube('rheumofficinale', 'Rheum Officinale', DIGESTIVE),
  singleTube('rhododendronchrysanthum', 'Rhododendron Chrysanthum', PAIN_FEVER),
  singleTube('rhus-tox', 'Rhus Tox', PAIN_FEVER),
  singleTube('rhusvenenata', 'Rhus Venenata', PAIN_FEVER),
  singleTube('ricinuscommunis', 'Ricinus Communis', PAIN_FEVER),
  singleTube('robiniapseudoacacia', 'Robinia Pseudoacacia', DIGESTIVE),
  singleTube('rumex-crispus', 'Rumex Crispus', COLD_FLU),
  singleTube('ruta-graveolens', 'Ruta Graveolens', PAIN_FEVER),
  singleTube('sabadilla', 'Sabadilla', ALLERGIES),
  singleTube('sabal-serrulata', 'Sabal Serrulata', PAIN_FEVER),
  singleTube('sabina', 'Sabina', PAIN_FEVER),
  singleTube('saccharumofficinale', 'Saccharum Officinale', PAIN_FEVER),
  singleTube('salicylicumacidum', 'Salicylicum Acidum', PAIN_FEVER),
  singleTube('sambucus-nigra-6c-cough-cold-relief', 'Sambucus nigra 6C', COLD_FLU),
  singleTube('sambucusnigra', 'Sambucus nigra', COLD_FLU),
  singleTube('sanguinariacanadensis', 'Sanguinaria Canadensis', PAIN_FEVER),
  singleTube('sanguinarinumnitricum', 'Sanguinarinum Nitricum', PAIN_FEVER),
  singleTube('saponariaofficinalis', 'Saponaria Officinalis', PAIN_FEVER),
  singleTube('sarcolacticum-acidum', 'Sarcolacticum Acidum', PAIN_FEVER),
  singleTube('sarsaparilla', 'Sarsaparilla', PAIN_FEVER),
  singleTube('scillamaritima', 'Scilla Maritima', COLD_FLU),
  singleTube('scrophularianodosa', 'Scrophularia Nodosa', PAIN_FEVER),
  singleTube('scutellarialateriflora', 'Scutellaria Lateriflora', SLEEP),
  singleTube('secalecornutum', 'Secale Cornutum', PAIN_FEVER),
  singleTube('seleniummetallicum', 'Selenium Metallicum', PAIN_FEVER),
  singleTube('sempervivumtectorum', 'Sempervivum Tectorum', PAIN_FEVER),
  singleTube('senegaofficinalis', 'Senega Officinalis', COLD_FLU),
  singleTube('senna', 'Senna', PAIN_FEVER),
  singleTube('sepia', 'Sepia', PAIN_FEVER),
  singleTube('silicamarina', 'Silica Marina', PAIN_FEVER),
  singleTube('silicea', 'Silicea', FIRST_AID),
  singleTube('sinapisnigra', 'Sinapis Nigra', PAIN_FEVER),
  singleTube('solidagovirgaurea', 'Solidago Virgaurea', ALLERGIES),
  singleTube('spigeliaanthelmia', 'Spigelia Anthelmia', PAIN_FEVER),
  singleTube('spongia-tosta', 'Spongia Tosta', COLD_FLU),
  singleTube('stannummetallicum', 'Stannum Metallicum', PAIN_FEVER),
  singleTube('staphysagria', 'Staphysagria', FIRST_AID),
  singleTube('stictapulmonaria', 'Sticta Pulmonaria', COLD_FLU),
  singleTube('stramonium-2', 'Stramonium', SLEEP),
  singleTube('strontiumcarbonicum', 'Strontium Carbonicum', PAIN_FEVER),
  singleTube('sulphur', 'Sulphur', PAIN_FEVER),
  singleTube('sulphur-iodatum', 'Sulphur Iodatum', PAIN_FEVER),
  singleTube('sulphuricumacidum', 'Sulphuricum Acidum', PAIN_FEVER),
  singleTube('symphoricarpusracemosus', 'Symphoricarpus Racemosus', PAIN_FEVER),
  singleTube('symphytum-officinale', 'Symphytum Officinale', FIRST_AID),
  singleTube('tabacum', 'Tabacum', DIGESTIVE),
  singleTube('taraxacumofficinale', 'Taraxacum Officinale', PAIN_FEVER),
  singleTube('tarentulacubensis', 'Tarentula Cubensis', PAIN_FEVER),
  singleTube('tarentulahispana', 'Tarentula Hispana', PAIN_FEVER),
  singleTube('telluriummetallicum', 'Tellurium Metallicum', PAIN_FEVER),
  singleTube('terebinthina', 'Terebinthina', PAIN_FEVER),
  singleTube('teucriummarum', 'Teucrium Marum', PAIN_FEVER),
  singleTube('theasinensis', 'Thea Sinensis', PAIN_FEVER),
  singleTube('theridion', 'Theridion', PAIN_FEVER),
  singleTube('thiosinaminum', 'Thiosinaminum', PAIN_FEVER),
  singleTube('thlaspibursapastoris', 'Thlaspi Bursa Pastoris', PAIN_FEVER),
  singleTube('thuja-occidentalis', 'Thuja Occidentalis', FIRST_AID),
  singleTube('thyroidinum', 'Thyroidinum', PAIN_FEVER),
  singleTube('titaniummetallicum', 'Titanium Metallicum', PAIN_FEVER),
  singleTube('trilliumpendulum', 'Trillium Pendulum', PAIN_FEVER),
  singleTube('tuberculinum-residuum', 'Tuberculinum Residuum', PAIN_FEVER),
  singleTube('urtica-urens', 'Urtica Urens', FIRST_AID),
  singleTube('ustilagomaidis', 'Ustilago Maidis', PAIN_FEVER),
  singleTube('uvaursi', 'Uva Ursi', PAIN_FEVER),
  singleTube('valerianaofficinalis', 'Valeriana Officinalis', SLEEP),
  singleTube('venusmercenaria', 'Venus Mercenaria', PAIN_FEVER),
  singleTube('veratrumalbum', 'Veratrum Album', DIGESTIVE),
  singleTube('veratrumviride', 'Veratrum Viride', PAIN_FEVER),
  singleTube('verbascumthapsus', 'Verbascum Thapsus', COLD_FLU),
  singleTube('vespacrabro', 'Vespa Crabro', PAIN_FEVER),
  singleTube('viburnumopulus', 'Viburnum Opulus', PAIN_FEVER),
  singleTube('violaodorata', 'Viola Odorata', PAIN_FEVER),
  singleTube('violatricolor', 'Viola Tricolor', PAIN_FEVER),
  singleTube('viperaberus', 'Vipera Berus', PAIN_FEVER),
  singleTube('viscumalbum', 'Viscum Album', PAIN_FEVER),
  singleTube('wyethiahelenioides', 'Wyethia Helenioides', ALLERGIES),
  singleTube('xanthoxylumfraxineum', 'Xanthoxylum Fraxineum', PAIN_FEVER),
  singleTube('zincum-metallicum', 'Zincum Metallicum', PAIN_FEVER),
  singleTube('zincumsulphuricum', 'Zincum Sulphuricum', PAIN_FEVER),
];

const GEMMO_NOTE =
  'FOUNDER-STYLE DRAFT: Boiron Gemmotherapy herbal liquid = Caution. Driver is alcohol as the extract vehicle (Limited). Glycerin + purified water Cleared. Other Ingredients from the current BoironUSA shop page. ' +
  ALCOHOL_VEHICLE_LINE +
  ' ' +
  LIMITED_STACK +
  ' Herbal supplement (not a homeopathic drug SPL). Ages 12+. Shop does not name a use aisle — filed under Vitamins, not as a homeopathic shelf. formulaId == id. No independently Clean same-shelf gemmo swap listed (do not invent one).';

function gemmoRow(
  slug: string,
  productName: string,
  botanical: string,
): RatingRecord {
  const id = `boiron-gemmo-${slug}`;
  return {
    id,
    productName: `Boiron ${productName}`,
    brand: BRAND,
    category: VITAMINS,
    formulaId: id,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: botanical, strength: 'herbal extract (shop; not a drug SPL)' },
    ],
    inactiveIngredients: gemmoOi(slug),
    verdict: 'caution',
    honestNote: GEMMO_NOTE,
    retailers: ['BoironUSA.com'],
    sourcesGeneral: [`${shop(slug)} — ${UNVERIFIED_NOTE}`],
  };
}

// Current US BoironUSA gemmotherapy SKUs (17 bud/shoot). Shop pages all
// list the same Other Ingredients: glycerin, alcohol, purified water.
const GEMMO_ROWS: RatingRecord[] = [
  gemmoRow(
    'black-currant-buds',
    'Black Currant, Buds',
    'Ribes nigrum (black currant) buds',
  ),
  gemmoRow(
    'briar-rose-young-shoots',
    'Briar Rose, Young Shoots',
    'Rosa canina (briar rose) young shoots',
  ),
  gemmoRow(
    'common-birch-buds',
    'Common Birch, Buds',
    'Betula pubescens (common birch) buds',
  ),
  gemmoRow(
    'common-juniper-young-shoots',
    'Common Juniper, Young Shoots',
    'Juniperus communis (common juniper) young shoots',
  ),
  gemmoRow(
    'cowberry-young-shoots',
    'Cowberry, Young Shoots',
    'Vaccinium vitis idaea (cowberry) young shoots',
  ),
  gemmoRow(
    'english-hawthorn-young-shoots',
    'English Hawthorn, Young Shoots',
    'Crataegus oxyacantha (English hawthorn) young shoots',
  ),
  gemmoRow(
    'european-grapevine-buds',
    'European Grapevine, Buds',
    'Vitis vinifera (European grapevine) buds',
  ),
  gemmoRow(
    'european-hornbeam-buds',
    'European Hornbeam, Buds',
    'Carpinus betulus (European hornbeam) buds',
  ),
  gemmoRow(
    'european-olive-young-shoots',
    'European Olive, Young Shoots',
    'Olea europaea (European olive) young shoots',
  ),
  gemmoRow(
    'european-walnut-buds',
    'European Walnut, Buds',
    'Juglans regia (European walnut) buds',
  ),
  gemmoRow(
    'fig-tree-buds',
    'Fig Tree, Buds',
    'Ficus carica (fig tree) buds',
  ),
  gemmoRow(
    'giant-redwood-young-shoots',
    'Giant Redwood, Young Shoots',
    'Sequoia gigantea (giant redwood) young shoots',
  ),
  gemmoRow(
    'horse-chestnut-buds',
    'Horse Chestnut, Buds',
    'Aesculus hippocastanum (horse chestnut) buds',
  ),
  gemmoRow(
    'lime-tree-buds',
    'Lime Tree, Buds',
    'Tilia tomentosa (lime tree) buds',
  ),
  gemmoRow(
    'lithy-tree-buds',
    'Lithy Tree, Buds',
    'Viburnum lantana (lithy tree) buds',
  ),
  gemmoRow(
    'mountain-pine-buds',
    'Mountain Pine, Buds',
    'Pinus montana (mountain pine) buds',
  ),
  gemmoRow(
    'rosemary-young-shoots',
    'Rosemary, Young Shoots',
    'Rosmarinus officinalis (rosemary) young shoots',
  ),
];

export const BATCH34_BOIRON: RatingRecord[] = [
  // ── Clean tablets (croscarmellose + lactose + stearate) ──

  {
    id: 'boiron-sinuscalm-tablets',
    productName: 'Boiron SinusCalm Tablets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969338049',
    formulaId: 'boiron-sinuscalm-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Belladonna', strength: '3C HPUS' },
      { name: 'Sanguinaria canadensis', strength: '3C HPUS' },
      { name: 'Spigelia anthelmia', strength: '3C HPUS' },
    ],
    inactiveIngredients: tabletBase('4ae58d81-3952-b372-e063-6394a90a8499'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: SinusCalm Tablets = Clean. Croscarmellose sodium + lactose + magnesium stearate = 0 pt. Adult 18+ carton. Separate from SinusCalm Allergy (same actives, allergy aisle) and from SinusCalm pellets (lactose + sucrose).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('sinuscalm-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ae58d81-3952-b372-e063-6394a90a8499 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-sinuscalm-allergy-tablets',
    productName: 'Boiron SinusCalm Allergy Tablets',
    brand: BRAND,
    category: ALLERGIES,
    barcode: '306969339046',
    formulaId: 'boiron-sinuscalm-allergy-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Belladonna', strength: '3C HPUS' },
      { name: 'Sanguinaria canadensis', strength: '3C HPUS' },
      { name: 'Spigelia anthelmia', strength: '3C HPUS' },
    ],
    inactiveIngredients: tabletBase('4d3f554a-c8b2-3121-e063-6394a90a1598'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: SinusCalm Allergy Tablets = Clean. Same three actives as SinusCalm Tablets; allergy-aisle carton / setid 4d3f554a. Croscarmellose + lactose + magnesium stearate = 0 pt. Adult 18+. Do not merge into the Cold & Flu SinusCalm row.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('sinuscalm-allergy-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4d3f554a-c8b2-3121-e063-6394a90a1598 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-voicecalm-tablets',
    productName: 'Boiron VoiceCalm Tablets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969330043',
    formulaId: 'boiron-voicecalm-tablets',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '9C HPUS' },
      { name: 'Arum triphyllum', strength: '9C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hepar sulphuris calcareum', strength: '30C HPUS' },
      { name: 'Rhus toxicodendron', strength: '9C HPUS' },
      { name: 'Spongia tosta', strength: '9C HPUS' },
    ],
    inactiveIngredients: tabletBase('4af6bc5b-7924-cb9f-e063-6394a90a7864'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: VoiceCalm Tablets = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 6+ (under 6: ask a doctor).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('voicecalm-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4af6bc5b-7924-cb9f-e063-6394a90a7864 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-throatcalm-tablets',
    productName: 'Boiron ThroatCalm Tablets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969325049',
    formulaId: 'boiron-throatcalm-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '3C HPUS' },
      { name: 'Arum triphyllum', strength: '3C HPUS' },
      { name: 'Belladonna', strength: '3C HPUS' },
      { name: 'Bromium', strength: '3C HPUS' },
      { name: 'Bryonia', strength: '3C HPUS' },
      { name: 'Mercurius solubilis', strength: '4C HPUS' },
      { name: 'Phytolacca decandra', strength: '3C HPUS' },
      { name: 'Pulsatilla', strength: '3C HPUS' },
      { name: 'Spongia tosta', strength: '3C HPUS' },
    ],
    inactiveIngredients: tabletBase('4ae45fc7-c0f4-3770-e063-6394a90ac80e'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: ThroatCalm Tablets = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Adult 18+ carton. Separate from ThroatCalm OTG pellets (minAge 3) and ThroatCalm Spray (alcohol + L-carvone Caution).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('throatcalm') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ae45fc7-c0f4-3770-e063-6394a90ac80e — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-cold-cough-tablets',
    productName: 'Boiron Chestal Cold & Cough Meltaway Tablets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969111048',
    formulaId: 'boiron-chestal-cold-cough-tablets',
    audience: ADULT,
    minAge: 4,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Dulcamara', strength: '5C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hydrastis canadensis', strength: '9C HPUS' },
      { name: 'Kali bichromicum', strength: '9C HPUS' },
      { name: 'Nux vomica', strength: '9C HPUS' },
    ],
    inactiveIngredients: tabletBase('4d7a3143-ec9d-310b-e063-6394a90ac46e'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Chestal Cold & Cough Meltaway Tablets = Clean. Dulcamara family. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 4+ (4–under 6 dissolve in water; under 4: ask a doctor). Separate from Chestal Cough & Mucus tablets (Antimonium/Bryonia family) and from reuse Chestal honey / kids C&C pellets.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('chestal-cold-cough-meltaway-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4d7a3143-ec9d-310b-e063-6394a90ac46e — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-cough-mucus-tablets',
    productName: 'Boiron Chestal Cough & Mucus Meltaway Tablets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969115046',
    formulaId: 'boiron-chestal-cough-mucus-tablets',
    audience: ADULT,
    minAge: 4,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Antimonium tartaricum', strength: '6C HPUS' },
      { name: 'Bryonia', strength: '3C HPUS' },
      { name: 'Coccus cacti', strength: '3C HPUS' },
      { name: 'Drosera', strength: '3C HPUS' },
      { name: 'Ipecacuanha', strength: '3C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
      { name: 'Rumex crispus', strength: '6C HPUS' },
      { name: 'Spongia tosta', strength: '3C HPUS' },
      { name: 'Sticta pulmonaria', strength: '3C HPUS' },
    ],
    inactiveIngredients: tabletBase('4d77a058-e6c8-2af5-e063-6394a90afe1a'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Chestal Cough & Mucus Meltaway Tablets = Clean. Antimonium/Bryonia family (includes Rumex crispus 6C). Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 4+. Separate from the Dulcamara Cold & Cough tablet / pellet / honey rows.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('chestal-cough-mucus-meltaway-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4d77a058-e6c8-2af5-e063-6394a90afe1a — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-diarrheacalm-tablets',
    productName: 'Boiron DiarrheaCalm Tablets',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969095041',
    formulaId: 'boiron-diarrheacalm-tablets',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arsenicum album', strength: '9C HPUS' },
      { name: 'Cinchona officinalis', strength: '5C HPUS' },
      { name: 'Podophyllum peltatum', strength: '9C HPUS' },
    ],
    inactiveIngredients: tabletBase('302786a1-c6a2-f7ea-e063-6394a90a327b'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: DiarrheaCalm Tablets = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 6+ (under 6: ask a doctor). Separate from DiarrheaCalm / Diaralia OTG pellets (lactose + sucrose).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('diarrheacalm-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=302786a1-c6a2-f7ea-e063-6394a90a327b — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-wartcalm-tablets',
    productName: 'Boiron WartCalm Meltaway Tablets',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306969372043',
    formulaId: 'boiron-wartcalm-tablets',
    audience: ADULT,
    minAge: 2,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Antimonium crudum', strength: '9C HPUS' },
      { name: 'Nitricum acidum', strength: '9C HPUS' },
      { name: 'Thuja occidentalis', strength: '9C HPUS' },
    ],
    inactiveIngredients: tabletBase('cd88e215-55e6-3c9d-e053-2a95a90ab8e7'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: WartCalm Meltaway Tablets = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 2+ (2–5 dissolve in water; under 2: ask a doctor).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('wartcalm-meltaway-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cd88e215-55e6-3c9d-e053-2a95a90ab8e7 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-sleepcalm-tablets',
    productName: 'Boiron SleepCalm Tablets',
    brand: BRAND,
    category: SLEEP,
    barcode: '306969310045',
    formulaId: 'boiron-sleepcalm-tablets',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Hyoscyamus niger', strength: '3C HPUS' },
      { name: 'Nux moschata', strength: '4C HPUS' },
      { name: 'Passiflora incarnata', strength: '3X HPUS' },
      { name: 'Stramonium', strength: '6X HPUS' },
    ],
    inactiveIngredients: tabletBase('a1db8417-baea-6914-e053-2a95a90a2fd3'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: SleepCalm Tablets = Clean. Quietude rename — do not write Quietude as its own id. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 12+. Separate from SleepCalm Kids pellets / liquid (reuse) and from SleepCalm OTG pellets in this file (same actives, lactose + sucrose).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('sleepcalm') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a1db8417-baea-6914-e053-2a95a90a2fd3 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-stresscalm-tablets',
    productName: 'Boiron StressCalm Tablets',
    brand: BRAND,
    category: SLEEP,
    barcode: '306969333044',
    formulaId: 'boiron-stresscalm-tablets',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '6C HPUS' },
      { name: 'Belladonna', strength: '6C HPUS' },
      { name: 'Calendula officinalis', strength: '6C HPUS' },
      { name: 'Chelidonium majus', strength: '6C HPUS' },
      { name: 'Jequirity', strength: '6C HPUS' },
      { name: 'Viburnum opulus', strength: '6C HPUS' },
    ],
    inactiveIngredients: tabletBase('af489aa8-9737-33e1-e053-2995a90ad280'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: StressCalm Tablets = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 12+ (under 12: ask a doctor). Separate from StressCalm OTG pellets.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('stresscalm') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af489aa8-9737-33e1-e053-2995a90ad280 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-cyclease-cramps',
    productName: 'Boiron Cyclease Cramps',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969078044',
    formulaId: 'boiron-cyclease-cramps',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Cimicifuga racemosa', strength: '6C HPUS' },
      { name: 'Colocynthis', strength: '6C HPUS' },
      { name: 'Magnesia phosphorica', strength: '6C HPUS' },
    ],
    inactiveIngredients: tabletBase('39c20cb2-79c4-4775-b3a9-55cfa67fb743'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Cyclease Cramps = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 12+. DailyMed prints Colcynthis — written as Colocynthis (HPUS name). Separate from Cyclease PMS / Menopause.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('cyclease-cramp') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=39c20cb2-79c4-4775-b3a9-55cfa67fb743 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-cyclease-pms',
    productName: 'Boiron Cyclease PMS',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306962615604',
    formulaId: 'boiron-cyclease-pms',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Folliculinum', strength: '15C HPUS' },
      { name: 'Natrum muriaticum', strength: '12C HPUS' },
      { name: 'Sepia', strength: '12C HPUS' },
    ],
    inactiveIngredients: tabletBase('09ff0633-2992-4aba-96ed-45a69f3ee589'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Cyclease PMS = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 12+ (under 12: not recommended). Separate from Cyclease Cramps / Menopause.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('cyclease-pms') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=09ff0633-2992-4aba-96ed-45a69f3ee589 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-cyclease-menopause',
    productName: 'Boiron Cyclease Menopause Tablets',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969082041',
    formulaId: 'boiron-cyclease-menopause',
    audience: ADULT,
    minAge: 18,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '4C HPUS' },
      { name: 'Cimicifuga racemosa', strength: '4C HPUS' },
      { name: 'Glonoinum', strength: '4C HPUS' },
      { name: 'Lachesis mutus', strength: '5C HPUS' },
      { name: 'Sanguinaria canadensis', strength: '4C HPUS' },
    ],
    inactiveIngredients: menopauseOi('a227e8d8-27a3-592f-e053-2a95a90ab31c'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Cyclease Menopause Tablets = Clean. Inactives are lactose + magnesium stearate + sucrose — NOT the croscarmellose trio. Still 0 pt. Adult 18+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('cyclease-menopause-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a227e8d8-27a3-592f-e053-2a95a90ab31c — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-hemcalm-tablets',
    productName: 'Boiron HemCalm Tablets',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969122044',
    formulaId: 'boiron-hemcalm-tablets',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aesculus hippocastanum', strength: '6X HPUS' },
      { name: 'Hamamelis virginiana', strength: '6X HPUS' },
      { name: 'Nux vomica', strength: '12X HPUS' },
    ],
    inactiveIngredients: tabletBase('8f8c295f-b6ec-6c6f-e053-2995a90aad9e'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: HemCalm Tablets = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 12+. Separate from HemCalm OTG pellets, ointment (alcohol Caution), and suppositories (hard fat Clean).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('hemcalmtablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8f8c295f-b6ec-6c6f-e053-2995a90aad9e — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-motioncalm-meltaway-tablets',
    productName: 'Boiron MotionCalm Meltaway Tablets',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969234044',
    formulaId: 'boiron-motioncalm-meltaway-tablets',
    audience: ADULT,
    minAge: 7,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Cocculus indicus', strength: '4C HPUS' },
      { name: 'Ipecacuanha', strength: '4C HPUS' },
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Tabacum', strength: '4C HPUS' },
      { name: 'Petroleum', strength: '4C HPUS' },
    ],
    inactiveIngredients: tabletBase('c77c3c90-0168-f7aa-e053-2995a90a9171'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: MotionCalm Meltaway Tablets = Clean. NEW FORM vs reuse `boiron-motioncalm` pellets (lactose + sucrose). Same five actives; croscarmellose + lactose + magnesium stearate = 0 pt. Ages 7+. Do not clone the pellet formulaId.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('motioncalm-meltaway-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c77c3c90-0168-f7aa-e053-2995a90a9171 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-nauseacalm-meltaway-tablets',
    productName: 'Boiron NauseaCalm Meltaway Tablets',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969244043',
    formulaId: 'boiron-nauseacalm-meltaway-tablets',
    audience: ADULT,
    minAge: 2,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Cocculus indicus', strength: '4C HPUS' },
      { name: 'Ipecacuanha', strength: '4C HPUS' },
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Petroleum', strength: '4C HPUS' },
      { name: 'Tabacum', strength: '4C HPUS' },
    ],
    inactiveIngredients: tabletBase('c846971d-fcf8-2cf4-e053-2995a90aaec8'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: NauseaCalm Meltaway Tablets = Clean. NEW FORM vs reuse `boiron-nauseacalm` pellets. Same five actives; croscarmellose + lactose + magnesium stearate = 0 pt. Ages 2+. Do not clone the pellet formulaId.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('nauseacalm-meltaway-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c846971d-fcf8-2cf4-e053-2995a90aaec8 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-tablets',
    productName: 'Boiron Arnicare Tablets / Arnica 30C Tablets',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969059043',
    formulaId: 'boiron-arnicare-tablets',
    audience: ADULT,
    minAge: 2,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '30C HPUS' },
    ],
    inactiveIngredients: tabletBase('0671385c-7370-03ac-e063-6394a90afc1c'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Arnicare Tablets / Arnica 30C Tablets = Clean. Same DailyMed setid 0671385c, same Arnica montana 30C, same croscarmellose + lactose + magnesium stearate — ONE row, no separate boiron-arnica-30c-tablets id. Ages 2+ (2–5 dissolve in water). Separate from Arnica 30X Tablets and from the named Arnica 30C Pellets tube.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('arnicare-tablets') + ' — ' + UNVERIFIED_NOTE,
      shop('arnica-30c-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0671385c-7370-03ac-e063-6394a90afc1c — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnica-30x-tablets',
    productName: 'Boiron Arnica 30X Tablets',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969089040',
    formulaId: 'boiron-arnica-30x-tablets',
    audience: ADULT,
    minAge: 2,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '30X HPUS' },
    ],
    inactiveIngredients: tabletBaseShop('https://www.boironusa.com/product/arnica-30x-tablets/'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Arnica 30X Tablets = Clean. Class tablet OI (croscarmellose + lactose + magnesium stearate) cited from the shop page — do not invent a unique grade. Different potency from Arnicare / Arnica 30C Tablets (30C). Ages 2+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('arnica-30x-tablets') + ' — ' + UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-arthritis-tablets',
    productName: 'Boiron Arnicare Arthritis Tablets',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969044049',
    formulaId: 'boiron-arnicare-arthritis-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '3C HPUS' },
      { name: 'Benzoicum acidum', strength: '6C HPUS' },
      { name: 'Bryonia', strength: '6C HPUS' },
      { name: 'Chamomilla', strength: '12C HPUS' },
      { name: 'Dulcamara', strength: '6C HPUS' },
      { name: 'Kali iodatum', strength: '12C HPUS' },
      { name: 'Pulsatilla', strength: '3C HPUS' },
      { name: 'Rhododendron chrysanthum', strength: '12C HPUS' },
      { name: 'Rhus toxicodendron', strength: '6C HPUS' },
    ],
    inactiveIngredients: tabletBase('cb02378b-617d-4268-b565-4136e50009f4'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Arnicare Arthritis Tablets = Clean. Croscarmellose + lactose + magnesium stearate = 0 pt. Adult 18+ (under 18: ask a doctor). Separate from Arnicare Arthritis Cream (Caution — Caution-table inactives + PS80).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('arnicare-arthritis') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cb02378b-617d-4268-b565-4136e50009f4 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-leg-cramps',
    productName: 'Boiron Arnicare Leg Cramps Meltaway Tablets',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969073902',
    formulaId: 'boiron-arnicare-leg-cramps',
    audience: ADULT,
    minAge: 18,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '6C HPUS' },
      { name: 'Cuprum metallicum', strength: '4C HPUS' },
      { name: 'Magnesia phosphorica', strength: '6C HPUS' },
      { name: 'Nux vomica', strength: '6C HPUS' },
      { name: 'Passiflora incarnata', strength: '3X HPUS' },
      { name: 'Secale cornutum', strength: '9C HPUS' },
    ],
    inactiveIngredients: tabletBase('051a4e17-c665-ec4d-e063-6294a90aabe6'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Arnicare Leg Cramps Meltaway Tablets = Clean. Current UNFLAVORED carton (setid 051a4e17). Shop slugs arnicare-leg-cramps + arnicare-leg-cramps-pm-meltaway-tablets share this formulaId. Dead lemon SPL 6b658f98 is discontinued — NOT this row. Croscarmellose + lactose + magnesium stearate = 0 pt. Adult 18+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('arnicare-leg-cramps') + ' — ' + UNVERIFIED_NOTE,
      shop('arnicare-leg-cramps-pm-meltaway-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=051a4e17-c665-ec4d-e063-6294a90aabe6 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-bruise-tablets',
    productName: 'Boiron Arnicare Bruise Tablets',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306969083048',
    formulaId: 'boiron-arnicare-bruise-tablets',
    audience: ADULT,
    minAge: 2,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '9C HPUS' },
    ],
    inactiveIngredients: tabletBase('d5e1a96c-4a19-c58c-e053-2a95a90aca9e'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Arnicare Bruise Tablets = Clean. Arnica montana 9C. Croscarmellose + lactose + magnesium stearate = 0 pt. Ages 2+. Separate from Arnicare Bruise Cream (shea / ferment Caution) and Bruise Gel (alcohol Caution).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('arnicare-bruise-tablets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d5e1a96c-4a19-c58c-e053-2a95a90aca9e — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  // ── Clean pellets (lactose + sucrose) ────────────────

  {
    id: 'boiron-allergycalm-pellets',
    productName: 'Boiron AllergyCalm Kids / OTG Pellets',
    brand: BRAND,
    category: ALLERGIES,
    barcode: '306969303429 306969305430',
    formulaId: 'boiron-allergycalm-pellets',
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '5C HPUS' },
      { name: 'Ambrosia artemisiaefolia', strength: '5C HPUS' },
      { name: 'Euphrasia officinalis', strength: '5C HPUS' },
      { name: 'Histaminum hydrochloricum', strength: '9C HPUS' },
      { name: 'Sabadilla', strength: '5C HPUS' },
      { name: 'Solidago virgaurea', strength: '5C HPUS' },
    ],
    inactiveIngredients: pelletBase('da48192b-f3fc-5d6e-e053-2995a90a43fa'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: AllergyCalm Kids / OTG Pellets = Clean. ONE formula for kids + on-the-go. Lactose + sucrose = 0 pt. Ages 2+ (under 2: ask a doctor). Separate from reuse AllergyCalm meltaways (croscarmellose trio).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('allergycalm-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      shop('allergycalm-kids-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=da48192b-f3fc-5d6e-e053-2995a90a43fa — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-coldcalm-pellets',
    productName: 'Boiron ColdCalm On the Go Pellets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969098424',
    formulaId: 'boiron-coldcalm-pellets',
    audience: ADULT,
    minAge: 4,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '3C HPUS' },
      { name: 'Apis mellifica', strength: '6C HPUS' },
      { name: 'Belladonna', strength: '6C HPUS' },
      { name: 'Eupatorium perfoliatum', strength: '3C HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6C HPUS' },
      { name: 'Kali bichromicum', strength: '6C HPUS' },
      { name: 'Nux vomica', strength: '3C HPUS' },
      { name: 'Phytolacca decandra', strength: '6C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
    ],
    inactiveIngredients: pelletBase('da32d4e3-f049-e7c8-e053-2a95a90a5790'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: ColdCalm On the Go Pellets = Clean. Same ColdCalm actives as reuse meltaways; lactose + sucrose = 0 pt. Ages 4+. Do not clone `boiron-coldcalm-meltaways` or `boiron-coldcalm-kids-liquid`.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('coldcalm-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=da32d4e3-f049-e7c8-e053-2a95a90a5790 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-cold-cough-pellets',
    productName: 'Boiron Chestal Cold & Cough Meltaway Pellets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969113424',
    formulaId: 'boiron-chestal-cold-cough-pellets',
    audience: ADULT,
    minAge: 4,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Dulcamara', strength: '5C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hydrastis canadensis', strength: '9C HPUS' },
      { name: 'Kali bichromicum', strength: '9C HPUS' },
      { name: 'Nux vomica', strength: '9C HPUS' },
    ],
    inactiveIngredients: pelletBase('2bd2f6ce-ce54-1945-e063-6294a90ad051'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Chestal Cold & Cough Meltaway Pellets = Clean. Dulcamara family. Lactose + sucrose = 0 pt. Ages 4+. Separate from reuse Chestal Kids C&C pellets (same actives, kids carton / different setid) — do not clone that formulaId.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('chestal-cold-cough-meltaway-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2bd2f6ce-ce54-1945-e063-6294a90ad051 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-meltaway-pellets',
    productName: 'Boiron Chestal Meltaway Pellets',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'boiron-chestal-meltaway-pellets',
    audience: ADULT,
    minAge: 4,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Antimonium tartaricum', strength: '6C HPUS' },
      { name: 'Bryonia', strength: '3C HPUS' },
      { name: 'Coccus cacti', strength: '3C HPUS' },
      { name: 'Drosera', strength: '3C HPUS' },
      { name: 'Ipecacuanha', strength: '3C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
      { name: 'Spongia tosta', strength: '3C HPUS' },
      { name: 'Sticta pulmonaria', strength: '3C HPUS' },
    ],
    inactiveIngredients: pelletBase('a84e27cd-8e21-0fce-e053-2a95a90af2cf'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Chestal Meltaway Pellets (adult dry-cough) = Clean. Antimonium/Bryonia family on setid a84e27cd — Rumex crispus is on the Cough & Mucus tablet / adult honey reuse row, not this pellet SPL. Lactose + sucrose = 0 pt. Ages 4+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('chestal-meltaway-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a84e27cd-8e21-0fce-e053-2a95a90af2cf — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-kids-dry-cough-pellets',
    productName: 'Boiron Chestal Kids Meltaway Pellets (dry-cough)',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'boiron-chestal-kids-dry-cough-pellets',
    audience: KIDS,
    minAge: 4,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Antimonium tartaricum', strength: '6C HPUS' },
      { name: 'Bryonia', strength: '3C HPUS' },
      { name: 'Coccus cacti', strength: '3C HPUS' },
      { name: 'Drosera', strength: '3C HPUS' },
      { name: 'Ipecacuanha', strength: '3C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
      { name: 'Spongia tosta', strength: '3C HPUS' },
      { name: 'Sticta pulmonaria', strength: '3C HPUS' },
    ],
    inactiveIngredients: pelletBase('ab6f3c39-7841-92cc-e053-2995a90a7943'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Chestal Kids Meltaway Pellets (dry-cough) = Clean. SAME actives as adult dry-cough pellets; DIFFERENT from reuse `boiron-chestal-kids-pellets` (C&C / Dulcamara family). New row — do not clone the C&C kids formulaId. Lactose + sucrose = 0 pt. Kids 4+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('chestal-kids-meltaway-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab6f3c39-7841-92cc-e053-2995a90a7943 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-sinuscalm-pellets',
    productName: 'Boiron SinusCalm Pellets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969347423',
    formulaId: 'boiron-sinuscalm-pellets',
    audience: ADULT,
    minAge: 6,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Belladonna', strength: '3C HPUS' },
      { name: 'Sanguinaria canadensis', strength: '3C HPUS' },
      { name: 'Spigelia anthelmia', strength: '3C HPUS' },
    ],
    inactiveIngredients: pelletBase('95872748-6d70-5c80-e053-2995a90a570c'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: SinusCalm Pellets = Clean. Same three actives as SinusCalm Tablets; lactose + sucrose = 0 pt. Ages 6+ (under 6: ask a doctor).',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('sinuscalm-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=95872748-6d70-5c80-e053-2995a90a570c — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-sleepcalm-pellets',
    productName: 'Boiron SleepCalm On the Go Pellets',
    brand: BRAND,
    category: SLEEP,
    barcode: '306969311424',
    formulaId: 'boiron-sleepcalm-pellets',
    audience: ADULT,
    minAge: 12,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Hyoscyamus niger', strength: '3C HPUS' },
      { name: 'Nux moschata', strength: '4C HPUS' },
      { name: 'Passiflora incarnata', strength: '3X HPUS' },
      { name: 'Stramonium', strength: '6X HPUS' },
    ],
    inactiveIngredients: pelletBase('dda7a51d-7c2c-67f4-e053-2a95a90a8e72'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: SleepCalm On the Go Pellets = Clean. NEW vs reuse SleepCalm Kids pellets (different actives). Same four actives as SleepCalm Tablets; lactose + sucrose = 0 pt. Ages 12+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('sleepcalm-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dda7a51d-7c2c-67f4-e053-2a95a90a8e72 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-stresscalm-pellets',
    productName: 'Boiron StressCalm On the Go Pellets',
    brand: BRAND,
    category: SLEEP,
    barcode: '306969334423',
    formulaId: 'boiron-stresscalm-pellets',
    audience: ADULT,
    minAge: 12,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '6C HPUS' },
      { name: 'Belladonna', strength: '6C HPUS' },
      { name: 'Calendula officinalis', strength: '6C HPUS' },
      { name: 'Chelidonium majus', strength: '6C HPUS' },
      { name: 'Jequirity', strength: '6C HPUS' },
      { name: 'Viburnum opulus', strength: '6C HPUS' },
    ],
    inactiveIngredients: pelletBase('ddcbbaae-ca20-9e18-e053-2a95a90a267f'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: StressCalm On the Go Pellets = Clean. Same actives as StressCalm Tablets; lactose + sucrose = 0 pt. Ages 12+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('stresscalm-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ddcbbaae-ca20-9e18-e053-2a95a90a267f — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-acidcalm-pellets',
    productName: 'Boiron AcidCalm On the Go Pellets',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969010426',
    formulaId: 'boiron-acidcalm-pellets',
    audience: ADULT,
    minAge: 12,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Abies nigra', strength: '4C HPUS' },
      { name: 'Carbo vegetabilis', strength: '4C HPUS' },
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Robinia pseudoacacia', strength: '4C HPUS' },
    ],
    inactiveIngredients: pelletBase('2df8a63e-0933-c0dc-e063-6394a90a8263'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: AcidCalm On the Go Pellets = Clean. NEW FORM vs reuse `boiron-acidcalm` tablets. Same four actives; lactose + sucrose = 0 pt. Ages 12+. Do not clone the tablet formulaId.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('acidcalm-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2df8a63e-0933-c0dc-e063-6394a90a8263 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-hemcalm-pellets',
    productName: 'Boiron HemCalm On the Go Pellets',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969123423',
    formulaId: 'boiron-hemcalm-pellets',
    audience: ADULT,
    minAge: 12,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aesculus hippocastanum', strength: '6X HPUS' },
      { name: 'Hamamelis virginiana', strength: '6X HPUS' },
      { name: 'Nux vomica', strength: '12X HPUS' },
    ],
    inactiveIngredients: pelletBase('dea9bd55-8e08-2165-e053-2995a90a8e81'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: HemCalm On the Go Pellets = Clean. Same actives as HemCalm Tablets; lactose + sucrose = 0 pt. Ages 12+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('hemcalm-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dea9bd55-8e08-2165-e053-2995a90a8e81 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-throatcalm-pellets',
    productName: 'Boiron ThroatCalm On the Go Pellets',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969325421',
    formulaId: 'boiron-throatcalm-pellets',
    audience: ADULT,
    minAge: 3,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '3C HPUS' },
      { name: 'Arum triphyllum', strength: '3C HPUS' },
      { name: 'Belladonna', strength: '3C HPUS' },
      { name: 'Bromium', strength: '3C HPUS' },
      { name: 'Bryonia', strength: '3C HPUS' },
      { name: 'Mercurius solubilis', strength: '4C HPUS' },
      { name: 'Phytolacca decandra', strength: '3C HPUS' },
      { name: 'Pulsatilla', strength: '3C HPUS' },
      { name: 'Spongia tosta', strength: '3C HPUS' },
    ],
    inactiveIngredients: pelletBase('de97d002-de84-bcef-e053-2995a90a319b'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: ThroatCalm On the Go Pellets = Clean. Same actives as ThroatCalm Tablets; lactose + sucrose = 0 pt. Ages 3+ (under 3: ask a doctor if sore throat is severe). Separate from the 18+ tablet carton and the spray.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('throatcalm-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=de97d002-de84-bcef-e053-2995a90a319b — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-diarrheacalm-pellets',
    productName: 'Boiron DiarrheaCalm / Diaralia On the Go Pellets',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969097427',
    formulaId: 'boiron-diarrheacalm-pellets',
    audience: ADULT,
    minAge: 6,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arsenicum album', strength: '9C HPUS' },
      { name: 'Cinchona officinalis', strength: '5C HPUS' },
      { name: 'Podophyllum peltatum', strength: '9C HPUS' },
    ],
    inactiveIngredients: pelletBase('30293788-e30b-d650-e063-6394a90a9517'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: DiarrheaCalm / Diaralia On the Go Pellets = Clean. Same actives as DiarrheaCalm Tablets; lactose + sucrose = 0 pt. Ages 6+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('diaralia-on-the-go-pellets') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=30293788-e30b-d650-e063-6394a90a9517 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnica-30c-pellets',
    productName: 'Boiron Arnica 30C Pellets',
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'boiron-arnica-30c-pellets',
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '30C HPUS' },
    ],
    inactiveIngredients: pelletClassOi('arnica-montana'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Arnica 30C Pellets = Clean. Named Clean Picks tube. Class pellet OI lactose+sucrose cited from shop https://www.boironusa.com/product/arnica-montana/ + DailyMed class example setid 0682b0ee. Do not also emit arnica-montana in the single-remedy tube factory. Potencies/pack sizes share the class pellet cleanliness; this named row keeps its own formulaId. Ages 2+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('arnica-montana') + ' — ' + UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-influenzinum',
    productName: 'Boiron Influenzinum Pellets',
    brand: BRAND,
    category: IMMUNE,
    formulaId: 'boiron-influenzinum',
    audience: ADULT,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Influenzinum', strength: '12C HPUS' },
    ],
    inactiveIngredients: pelletBase('0590e5fd-6216-b75a-e063-6294a90acb86'),
    verdict: 'clean',
    honestNote: homeoNote(
      'FOUNDER-STYLE DRAFT: Influenzinum Pellets = Clean. Influenzinum 12C. Lactose + sucrose = 0 pt. Unit-dose packs share this formulaId. Ages 2+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('influenzinum') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0590e5fd-6216-b75a-e063-6294a90acb86 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  // ── Clean suppositories ─────────────────────────────

  {
    id: 'boiron-yeastcalm-suppositories',
    productName: 'Boiron YeastCalm Suppositories',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306969376621',
    formulaId: 'boiron-yeastcalm-suppositories',
    audience: ADULT,
    minAge: 12,
    form: 'suppository',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Borax', strength: '14X HPUS' },
      { name: 'Calendula officinalis', strength: '1X HPUS' },
      { name: 'Candida albicans', strength: '30X HPUS' },
      { name: 'Hydrastis canadensis', strength: '5X HPUS' },
    ],
    inactiveIngredients: yeastSuppOi('cd384b93-b803-8810-e053-2a95a90acdf0'),
    verdict: 'clean',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: YeastCalm Suppositories = Clean. Gelatin + glycerin + purified water = 0 pt.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('yeastcalm-suppositories') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cd384b93-b803-8810-e053-2a95a90acdf0 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-hemcalm-suppositories',
    productName: 'Boiron HemCalm Suppositories',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969121672',
    formulaId: 'boiron-hemcalm-suppositories',
    audience: ADULT,
    minAge: 12,
    form: 'suppository',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aesculus hippocastanum', strength: '7X HPUS' },
      { name: 'Hamamelis virginiana', strength: '2X HPUS' },
      { name: 'Paeonia officinalis', strength: '2X HPUS' },
      { name: 'Ratanhia', strength: '7X HPUS' },
    ],
    inactiveIngredients: hemSuppOi('91ce4f52-d761-a3b5-e053-2995a90a45df'),
    verdict: 'clean',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: HemCalm Suppositories = Clean. Hard fat = 0 pt.',
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      'DailyMed setid 91ce4f52-d761-a3b5-e053-2995a90a45df — US SPL; not a current BoironUSA.com shop slug — ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=91ce4f52-d761-a3b5-e053-2995a90a45df — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  // ── Caution ─────────────────────────────────────────

  {
    id: 'boiron-arnicare-ointment',
    productName: 'Boiron Arnicare Ointment',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306960229506',
    formulaId: 'boiron-arnicare-ointment',
    audience: ADULT,
    minAge: 1,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS 4%' },
    ],
    inactiveIngredients: ointmentBase('9d03bd9c-ab1e-4414-afd2-8f9c80000164'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Arnicare Ointment = Caution. Driver is alcohol as the topical vehicle (Limited). Petrolatum and water are Cleared. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE +
        ' Ages 1+ (under 1: not recommended). Separate from reuse Arnicare Gel (Clean).',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: ARNICARE_GEL_ALTS,
    sourcesGeneral: [
      shop('arnicare-ointment') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9d03bd9c-ab1e-4414-afd2-8f9c80000164 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-hemcalm-ointment',
    productName: 'Boiron HemCalm Ointment',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969120514',
    formulaId: 'boiron-hemcalm-ointment',
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aesculus hippocastanum', strength: '1X HPUS 1.3%' },
      { name: 'Collinsonia canadensis', strength: '1X HPUS 1.3%' },
      { name: 'Hamamelis virginiana', strength: '1X HPUS 1.3%' },
    ],
    inactiveIngredients: ointmentBase('8ff1a5fc-93f6-5782-e053-2a95a90a1785'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: HemCalm Ointment = Caution. Same ointment base as Arnicare Ointment — alcohol Limited, petrolatum Cleared, water Cleared. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE +
        ' Ages 12+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: HEMCALM_ALTS,
    sourcesGeneral: [
      shop('hemcalm-ointment') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8ff1a5fc-93f6-5782-e053-2a95a90a1785 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-cold-cough-honey',
    productName: 'Boiron Chestal Cold & Cough Honey',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'boiron-chestal-cold-cough-honey',
    audience: ADULT,
    minAge: 4,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Dulcamara', strength: '5C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hydrastis canadensis', strength: '9C HPUS' },
      { name: 'Kali bichromicum', strength: '9C HPUS' },
      { name: 'Nux vomica', strength: '9C HPUS' },
    ],
    inactiveIngredients: honeySyrupOi('4ecd2dcf-7664-00b9-e063-6394a90a9686'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Chestal Cold & Cough Honey = Caution. NEW vs reuse `boiron-chestal-adult-honey` (different actives: Dulcamara family here; Antimonium/Bryonia on the reuse honey). Alcohol Limited + sodium benzoate Limited. Citric / honey / water / sucrose Cleared. Adult chart 12+; kids chart 4+ — minAge 4. Honey is not for under 1. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      shop('chestal-cold-cough') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ecd2dcf-7664-00b9-e063-6394a90a9686 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-original',
    productName: 'Boiron Chestal Original Cold Syrup',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969067284',
    formulaId: 'boiron-chestal-original',
    audience: ADULT,
    minAge: 4,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Dulcamara', strength: '5C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hydrastis canadensis', strength: '9C HPUS' },
      { name: 'Kali bichromicum', strength: '9C HPUS' },
      { name: 'Nux vomica', strength: '9C HPUS' },
    ],
    inactiveIngredients: originalSyrupOi('b347fb77-a46d-4c1e-ad40-c69e89387618'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Chestal Original Cold Syrup (no honey) = Caution. Dulcamara family. Alcohol Limited + sodium benzoate Limited. Citric / water / sucrose Cleared. Adult chart 12+; kids chart lists 4+ — minAge 4. Separate from Chestal Cold & Cough Honey and from reuse Chestal Honey. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: CHESTAL_ORIG_ALTS,
    sourcesGeneral: [
      'DailyMed setid b347fb77-a46d-4c1e-ad40-c69e89387618 — adult no-honey original; not a current BoironUSA.com shop slug — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b347fb77-a46d-4c1e-ad40-c69e89387618 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-chestal-kids-original',
    productName: 'Boiron Chestal Kids Original Cold Syrup',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'boiron-chestal-kids-original',
    audience: KIDS,
    minAge: 4,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Dulcamara', strength: '5C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hydrastis canadensis', strength: '9C HPUS' },
      { name: 'Kali bichromicum', strength: '9C HPUS' },
      { name: 'Nux vomica', strength: '9C HPUS' },
    ],
    inactiveIngredients: originalSyrupOi('cc5d12f6-9d39-48ff-b295-59bd592c84df'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Chestal Kids Original Cold Syrup = Caution. Same OI as adult Original (alcohol Limited + benzoate Limited; citric / water / sucrose Cleared). Kids 4+. Separate from reuse Chestal Kids Honey and Chestal Kids C&C pellets. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: KIDS_CHESTAL_ALTS,
    sourcesGeneral: [
      shop('childrens-chestal-cold-cough') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc5d12f6-9d39-48ff-b295-59bd592c84df — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-camilia',
    productName: 'Boiron Camilia Original Liquid Doses',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969054086 306969054093',
    formulaId: 'boiron-camilia',
    audience: KIDS,
    minAge: 0,
    form: 'liquid doses',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Chamomilla', strength: '9C HPUS' },
      { name: 'Phytolacca decandra', strength: '5C HPUS' },
      { name: 'Rheum', strength: '5C HPUS' },
    ],
    inactiveIngredients: alcoholWaterOi('24246729-2d45-4d83-bc25-39db03e266d4'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Camilia Original Liquid Doses = Caution. Alcohol + water vehicle. Carton is 1 month+ (minAge 0). ColicComfort is not on the US shop — not written. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: BABY_COLD_ALTS,
    sourcesGeneral: [
      shop('camilia') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24246729-2d45-4d83-bc25-39db03e266d4 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-camilia-bedtime',
    productName: 'Boiron Camilia Bedtime',
    brand: BRAND,
    category: SLEEP,
    barcode: '306969102091',
    formulaId: 'boiron-camilia-bedtime',
    audience: KIDS,
    minAge: 0,
    form: 'liquid doses',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Chamomilla', strength: '9C HPUS' },
      { name: 'Coffea cruda', strength: '15C HPUS' },
      { name: 'Phytolacca decandra', strength: '5C HPUS' },
      { name: 'Rheum', strength: '5C HPUS' },
    ],
    inactiveIngredients: alcoholWaterOi('200c2af6-b457-b8bc-e063-6294a90a3800'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Camilia Bedtime = Caution. Alcohol + water vehicle. Kids minAge 0 (1 month+ chart). Separate from Camilia Original and Camilia Tummy. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: BABY_COLD_ALTS,
    sourcesGeneral: [
      shop('camilia-bedtime-liquid-doses') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=200c2af6-b457-b8bc-e063-6294a90a3800 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-camilia-tummy',
    productName: 'Boiron Camilia Tummy',
    brand: BRAND,
    category: DIGESTIVE,
    barcode: '306969099094',
    formulaId: 'boiron-camilia-tummy',
    audience: KIDS,
    minAge: 0,
    form: 'liquid doses',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Carbo vegetabilis', strength: '6C HPUS' },
      { name: 'Chamomilla', strength: '15C HPUS' },
      { name: 'Colocynthis', strength: '9C HPUS' },
      { name: 'Cuprum metallicum', strength: '6C HPUS' },
    ],
    inactiveIngredients: alcoholWaterOi('06c011fd-2814-2a57-e063-6394a90a8099'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Camilia Tummy = Caution. Alcohol + water vehicle. Kids minAge 0 (1 month+). Replaces ColicComfort on the US shop — ColicComfort is not written. No age-matched independently Clean baby digestive swap is listed (do not invent one). ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    sourcesGeneral: [
      shop('camilia-tummy-liquid-doses') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=06c011fd-2814-2a57-e063-6394a90a8099 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-coldcalm-baby',
    productName: 'Boiron ColdCalm Baby / Liquid Doses',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '306969057094',
    formulaId: 'boiron-coldcalm-baby',
    audience: KIDS,
    minAge: 0,
    form: 'liquid doses',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '3C HPUS' },
      { name: 'Apis mellifica', strength: '15C HPUS' },
      { name: 'Eupatorium perfoliatum', strength: '3C HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6C HPUS' },
      { name: 'Kali bichromicum', strength: '6C HPUS' },
      { name: 'Nux vomica', strength: '3C HPUS' },
      { name: 'Phytolacca decandra', strength: '6C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
    ],
    inactiveIngredients: alcoholWaterOi('94afe9a0-2d11-11e7-818f-424c58303031'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: ColdCalm Baby / Liquid Doses = Caution. Alcohol + water vehicle. Carton is 6 months+ (under 6 months: ask a doctor). minAge is 0 because 0.5 is not allowed — honest note carries the 6-month chart. Separate from reuse ColdCalm Kids liquid (4+) and ColdCalm meltaways. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: BABY_COLD_ALTS,
    sourcesGeneral: [
      shop('coldcalm-liquid-doses') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=94afe9a0-2d11-11e7-818f-424c58303031 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-throatcalm-spray',
    barcode: '306969329771',
    productName: 'Boiron ThroatCalm Spray',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'boiron-throatcalm-spray',
    audience: ADULT,
    minAge: 12,
    form: 'throat spray',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Echinacea', strength: '1X HPUS' },
      { name: 'Plantago major', strength: '1X HPUS' },
    ],
    inactiveIngredients: sprayOi('f5788da2-f60b-d0b8-e053-2995a90a11c7'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: ThroatCalm Spray = Caution. Alcohol Limited + L-carvone Limited. Glycerin + water Cleared. Ages 12+. Separate from ThroatCalm Tablets (Clean). ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: THROAT_ALTS,
    sourcesGeneral: [
      shop('throatcalm-spray') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f5788da2-f60b-d0b8-e053-2995a90a11c7 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-cream',
    productName: 'Boiron Arnicare Cream',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306969046562 306962032555 306969022825',
    formulaId: 'boiron-arnicare-cream',
    audience: ADULT,
    minAge: 1,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS 7%' },
    ],
    inactiveIngredients: sheaPanel('542b41dd-f285-4e48-a67b-8e69523b143a'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Arnicare Cream = Caution. Driver is lactobacillus ferment (standalone Caution-table, not additive-scored, not Avoid). This row is the SHEA SHOP PANEL (arachidyl alcohol / glucoside, behenyl, shea, coconut, glycerin, ferment, water, xanthan) — current BoironUSA arnicare-cream. DailyMed setid 542b41dd also concatenates a PEG / cetyl palmitate panel; that OI differs, so it is a second row (`boiron-arnicare-cream-peg-panel`), not a clone of this shea formula. ' +
        CREAM_OIL_LINE +
        ' Ages 1+ (under 1: not recommended). Separate from reuse Arnicare Gel (Clean).',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: ARNICARE_GEL_ALTS,
    sourcesGeneral: [
      shop('arnicare-cream') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=542b41dd-f285-4e48-a67b-8e69523b143a — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-cream-peg-panel',
    productName: 'Boiron Arnicare Cream (DailyMed PEG panel)',
    brand: BRAND,
    category: FIRST_AID,
    formulaId: 'boiron-arnicare-cream-peg-panel',
    audience: ADULT,
    minAge: 1,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS 7%' },
    ],
    inactiveIngredients: creamPegPanel(CREAM_PEG_SETID),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Arnicare Cream DailyMed PEG panel = Caution. Same setid 542b41dd as the shea shop cream, but OI differs — second row, not a clone. Driver is PEG-family Moderate (pegoxol-7 stearate + lauroyl macrogolglycerides; existing §5 PEG row). Alcohol Limited (topical vehicle). Caprylyl glycol + sorbic acid + 1,2-hexanediol Limited. Cetyl palmitate Cleared wax. Carbomer / glycerin / water / NaOH Cleared. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE +
        ' Not the current shea shop cream (`boiron-arnicare-cream`). Ages 1+ (under 1: not recommended). Separate from reuse Arnicare Gel (Clean).',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: ARNICARE_GEL_ALTS,
    sourcesGeneral: [
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=542b41dd-f285-4e48-a67b-8e69523b143a — PEG / cetyl palmitate panel concatenated on this SPL — ' +
        UNVERIFIED_NOTE,
      shop('arnicare-cream') + ' — current shop cream is the shea panel, not this OI — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-bruise-cream',
    productName: 'Boiron Arnicare Bruise Cream',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306969085127',
    formulaId: 'boiron-arnicare-bruise-cream',
    audience: ADULT,
    minAge: 1,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS 7%' },
    ],
    inactiveIngredients: sheaPanel('b957a592-e51b-61fc-e053-2995a90aaabd'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Arnicare Bruise Cream = Caution. Same shea panel as Arnicare Cream. Driver is lactobacillus ferment (standalone Caution-table). Arnica montana 1X 7%. ' +
        CREAM_OIL_LINE +
        ' Ages 1+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: ARNICARE_GEL_ALTS,
    sourcesGeneral: [
      shop('arnicare-bruise-cream') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b957a592-e51b-61fc-e053-2995a90aaabd — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-foot-care',
    productName: 'Boiron Arnicare Foot Care',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306969055823',
    formulaId: 'boiron-arnicare-foot-care',
    audience: ADULT,
    minAge: 1,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS 7%' },
    ],
    inactiveIngredients: sheaPanel('6b3c511c-7b11-203f-e053-2991aa0a6e01'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Arnicare Foot Care = Caution. Same shea panel. US DailyMed SPL 6b3c511c (not a current BoironUSA.com shop slug as of the 15 Sep 2026 sitemap). Driver is lactobacillus ferment (standalone Caution-table). ' +
        CREAM_OIL_LINE +
        ' Ages 1+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: ARNICARE_GEL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 6b3c511c-7b11-203f-e053-2991aa0a6e01 — US SPL; not a current BoironUSA.com shop slug — ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6b3c511c-7b11-203f-e053-2991aa0a6e01 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-arthritis-cream',
    productName: 'Boiron Arnicare Arthritis Cream',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '306969077634 306969077832',
    formulaId: 'boiron-arnicare-arthritis-cream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS 7%' },
      { name: 'Harpagophytum', strength: '1X HPUS 3%' },
    ],
    inactiveIngredients: arthritisCreamOi('da6c81e6-2c76-56de-e053-2a95a90a0397'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Arnicare Arthritis Cream = Caution. Standalone Caution-table inactives: acrylamide copolymer, chlorhexidine, isohexadecane, sorbitan oleate (riskLevel cleared + §5 Caution source, not additive-scored). Alcohol Limited. Polysorbate 80 Moderate. Sweet almond oil Cleared with cream form tap. Pump pack shares this formulaId. Ages 12+. ' +
        CREAM_OIL_LINE +
        ' ' +
        ALCOHOL_VEHICLE_LINE,
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: ARTHRITIS_ALTS,
    sourcesGeneral: [
      shop('arnicare-arthritis-cream') + ' — ' + UNVERIFIED_NOTE,
      shop('arnicare-arthritis-cream-pump') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=da6c81e6-2c76-56de-e053-2a95a90a0397 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-calendula-gel',
    productName: 'Boiron Calendula Gel',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306961105540 306962046590',
    formulaId: 'boiron-calendula-gel',
    audience: ADULT,
    minAge: 1,
    form: 'gel',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Calendula officinalis', strength: '1X HPUS' },
    ],
    inactiveIngredients: calendulaGelOi('25764f5a-378b-4103-81a1-2a6309e3e8e1'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Calendula Gel = Caution. Caprylyl glycol + sorbic acid + 1,2-hexanediol are Limited (preservative family). Carbomer / dimethicone copolyol / EDTA / water / NaOH are Cleared. ' +
        LIMITED_STACK +
        ' Ages 1+. Separate from reuse Calendula Ointment (Clean).',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: CALENDULA_ALTS,
    sourcesGeneral: [
      shop('calendula-gel') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=25764f5a-378b-4103-81a1-2a6309e3e8e1 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  {
    id: 'boiron-arnicare-bruise-gel',
    productName: 'Boiron Arnicare Bruise Gel',
    brand: BRAND,
    category: FIRST_AID,
    barcode: '306969084540',
    formulaId: 'boiron-arnicare-bruise-gel',
    audience: ADULT,
    minAge: 1,
    form: 'gel',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '1X HPUS 7%' },
    ],
    inactiveIngredients: bruiseGelOi('9d86cfb0-e155-4b0f-8bd0-ad5e8a335707'),
    verdict: 'caution',
    honestNote: homeoNoteNoLac(
      'FOUNDER-STYLE DRAFT: Arnicare Bruise Gel = Caution. Alcohol Limited + carbomer / water / NaOH Cleared. DO NOT reuse `boiron-arnicare-gel` Clean — different shop slug (arnicare-bruise) and a bruise-labeled gel. ' +
        LIMITED_STACK +
        ' ' +
        ALCOHOL_VEHICLE_LINE +
        ' Ages 1+.',
    ),
    retailers: [...BOIRON_RETAILERS],
    cleanAlternatives: ARNICARE_GEL_ALTS,
    sourcesGeneral: [
      shop('arnicare-bruise') + ' — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9d86cfb0-e155-4b0f-8bd0-ad5e8a335707 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  ...GEMMO_ROWS,
  ...SINGLE_TUBES,
];
