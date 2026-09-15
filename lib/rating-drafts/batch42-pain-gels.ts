// DRAFT / not verified / batch 42 Advil Targeted Relief + Motrin /
// Aleve arthritis gels / methodology v1.6 + Sept 15 isocetyl stearate
// Cleared + isopropyl alcohol Limited locks on main.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent Clean. Do NOT invent UPCs /
// barcodes. Pack sizes of the same name+form+inactives share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6). Not
// wired into Clean Picks UI. No live Clean Picks file is edited. No
// photos. Letter tiles only on new ids. No fake Clean alts. No
// methodology rewrite.
//
// TALLY (unverified drafts in THIS file): 3 rows — Clean 0 /
// Caution 3 / Avoid 0.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / menthol cream
// invented.
//
// REUSE ONLY (do not rewrite / do not clone) — existing ids:
// Batch 41: tylenol-precise-pain-relieving-cream,
//   tylenol-precise-cooling-cream, tylenol-precise-warming-cream,
//   tylenol-precise-nighttime-cream, tylenol-precise-lidocaine-4-patch,
//   alevex-pain-relieving-lotion-roll-on,
//   alevex-pain-relieving-lotion-tube, alevex-pain-relieving-spray
// Batch 37: medinatura-t-relief-pain-gel, medinatura-t-relief-xs-gel,
//   medinatura-t-relief-pain-cream, medinatura-t-relief-xs-cream,
//   medinatura-t-relief-arthritis-xs-cream,
//   medinatura-t-relief-lidocaine-4-cream, medinatura-traumeel-ointment,
//   bt-triflora-arthritis-gel
//   bt-arniflora-arnica-gel stays First Aid — do not move or rewrite.
// Batch 33: hylands-leg-cramps-arnica-cream,
//   hylands-leg-cramps-arnica-pm-cream
// Batch 38: natures-way-sports-gel already Caution — leave alone.
//
// LIST 3 written (3 formula rows) under current §5 locks:
// - Isocetyl stearate = Cleared (topical emollient / stearate cousin).
// - Isopropyl alcohol = Limited (alcohol vehicle family). Distinct
//   from the ethyl alcohol / alcohol vehicle row. Not Avoid.
// - Oleth-3-phosphate = Caution (standalone).
// - Polyoxyl 20 cetostearyl ether = Caution (PEG-ether family).
//   Not the Moderate PEG row.
// - Strong ammonia solution = Caution (standalone).
// - Fragrance / parfum stays Caution if present.
// - Cetyl esters wax / emulsifying wax / cocoyl caprylocaprate /
//   carbomer / mineral oil topical / PG topical stay as already locked.
// Menthol / camphor / lidocaine / capsaicin / methyl salicylate /
// diclofenac actives stay parked.
//
// REFUSED (still missing from §5 — do not invent): none.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const PAIN_FEVER = 'Pain & Fever';
const UNVERIFIED_NOTE = 'draft, not verified';

const PF_RETAILERS = [
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
  'Safeway',
] as const;

const CREAM_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this cream / gel they are not that High rule.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / capsaicin / methyl salicylate / diclofenac actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const IPA_TAP =
  'Isopropyl alcohol is the locked Limited alcohol-vehicle family row (IPA / isopropanol). Distinct from the ethyl alcohol / alcohol vehicle row. Alcohol is the vehicle, not the gummy seed-oil High rule. Not Avoid.';

const MINERAL_OIL_TAP =
  'Paraffin + mineral oil as a topical occlusive is Cleared (petrolatum neighborhood). Tap: not an oral oil.';

const METH = {
  ipa: `Methodology §5 Limited-risk (isopropyl alcohol — IPA / isopropanol; alcohol vehicle family; locked Sept 15, 2026). ${IPA_TAP}`,
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid)',
  oleth:
    'Methodology §5 Caution (oleth-3-phosphate — standalone Caution, not additive-scored, not Avoid; locked Sept 15, 2026)',
  polyoxyl:
    'Methodology §5 Caution (polyoxyl 20 cetostearyl ether — PEG-ether family; standalone Caution, not additive-scored, not Avoid, not the Moderate PEG row; locked Sept 15, 2026)',
  ammonia:
    'Methodology §5 Caution (strong ammonia solution — standalone Caution, not additive-scored, not Avoid; locked Sept 15, 2026)',
  isocetyl:
    'Methodology §5 Cleared (isocetyl stearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  waxFamily:
    'Methodology §5 Cleared (cetyl esters wax / emulsifying wax — wax family; locked Sept 15, 2026)',
  cocoyl:
    'Methodology §5 Cleared (cocoyl caprylocaprate — topical emollient ester; locked Sept 15, 2026)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family)',
  mineralOil: `Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP} ${CREAM_OIL_LINE}`,
  pgTopical: `Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this topical. ${PG_TOPICAL_TAP}`,
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster)',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant)',
  carnauba: 'Methodology §5 Cleared (carnauba wax)',
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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ARNICARE_GEL = 'boiron-arnicare-gel';

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / menthol cream invented.',
  ),
];

const SET = {
  advil: '16e6be21-7b43-443a-89ec-3bdf0ec0dfc1',
  motrin: 'db5b4288-13ec-826b-e053-2995a90a275e',
  aleve: 'bad675d1-1204-0136-e053-2995a90a994e',
} as const;

const ID = {
  advil: 'advil-targeted-relief-cream',
  motrin: 'motrin-arthritis-pain-gel',
  aleve: 'aleve-arthritis-pain-gel',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function motrinAleveBase(setid: string): IngredientFlag[] {
  return [
    flag('Isopropyl alcohol', 'limited', dailymed(setid, METH.ipa)),
    flag(
      'Polyoxyl 20 cetostearyl ether',
      'cleared',
      dailymed(setid, METH.polyoxyl),
    ),
    flag('Strong ammonia solution', 'cleared', dailymed(setid, METH.ammonia)),
    flag('Propylene glycol', 'cleared', dailymed(setid, METH.pgTopical)),
    flag('Mineral oil', 'cleared', dailymed(setid, METH.mineralOil)),
    flag(
      'Carbomer homopolymer Type C',
      'cleared',
      dailymed(setid, METH.carbomer),
    ),
    flag('Cocoyl caprylocaprate', 'cleared', dailymed(setid, METH.cocoyl)),
    cleared(setid, 'Purified water'),
  ];
}

export const BATCH42_PAIN_GELS: RatingRecord[] = [
  row({
    id: ID.advil,
    productName: 'Advil Targeted Relief Cream',
    brand: 'Advil',
    category: PAIN_FEVER,
    formulaId: ID.advil,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor', strength: '3.1%' },
      { name: 'Capsaicin', strength: '0.025%' },
      { name: 'Menthol', strength: '10%' },
      { name: 'Methyl salicylate', strength: '15%' },
    ],
    inactiveIngredients: [
      flag('Oleth-3-phosphate', 'cleared', dailymed(SET.advil, METH.oleth)),
      flag('Isocetyl stearate', 'cleared', dailymed(SET.advil, METH.isocetyl)),
      flag('Cetyl esters wax', 'cleared', dailymed(SET.advil, METH.waxFamily)),
      flag('Emulsifying wax', 'cleared', dailymed(SET.advil, METH.waxFamily)),
      flag('Carnauba wax', 'cleared', dailymed(SET.advil, METH.carnauba)),
      flag('Cetyl alcohol', 'cleared', dailymed(SET.advil, METH.fattyAlcohol)),
      flag(
        'Carbomer homopolymer',
        'cleared',
        dailymed(SET.advil, METH.carbomer),
      ),
      flag('Stearic acid', 'cleared', dailymed(SET.advil, METH.stearic)),
      flag('Sodium hydroxide', 'cleared', dailymed(SET.advil, METH.naoh)),
      cleared(SET.advil, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Advil Targeted Relief Cream = Caution. Driver is oleth-3-phosphate (standalone Caution-table, not Avoid). Isocetyl stearate is Cleared (Sept 15 lock — topical emollient / stearate cousin). Cetyl esters wax / emulsifying wax are the locked wax-family Cleared row (Drug Facts names emulsifying wax; structured table also lists isocetyl stearate + carnauba wax). NDC 0573-6555 pack sizes (65 g / 71 g applicator / 3 g pouch / 113.4 g) share this formulaId. Fragrance-free carton. ${PARKED_ACTIVES} Ages 12+. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'advil.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.advil} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.motrin,
    productName: 'Motrin Arthritis Pain Gel',
    brand: 'Motrin',
    category: PAIN_FEVER,
    formulaId: ID.motrin,
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    activeIngredients: [{ name: 'Diclofenac sodium', strength: '1%' }],
    inactiveIngredients: motrinAleveBase(SET.motrin),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Motrin Arthritis Pain Gel = Caution. Drivers are isopropyl alcohol (Limited — distinct from the ethyl alcohol vehicle row) plus polyoxyl 20 cetostearyl ether + strong ammonia solution (standalone Caution, not Avoid). Fragrance-free carton — do not merge with Aleve Arthritis Pain Gel (that SPL names fragrance). ${IPA_TAP} ${PG_TOPICAL_TAP} ${MINERAL_OIL_TAP} ${CREAM_OIL_LINE} 50 g / 100 g (NDC 50580-574) share this formulaId. ${PARKED_ACTIVES} Ask a doctor under 18. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'motrin.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.motrin} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.aleve,
    productName: 'Aleve Arthritis Pain Gel',
    brand: 'Aleve',
    category: PAIN_FEVER,
    formulaId: ID.aleve,
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    activeIngredients: [{ name: 'Diclofenac sodium', strength: '1%' }],
    inactiveIngredients: [
      flag('Fragrance', 'cleared', dailymed(SET.aleve, METH.fragrance)),
      ...motrinAleveBase(SET.aleve),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Aleve Arthritis Pain Gel = Caution. Own formulaId vs Motrin Arthritis Pain Gel — Drug Facts names fragrance (Caution; structured UNII table omits it; fragrance stays Caution). Same remaining locked stack as Motrin (isopropyl alcohol Limited, distinct from ethyl alcohol; polyoxyl 20 cetostearyl ether + strong ammonia standalone Caution). ${IPA_TAP} ${PG_TOPICAL_TAP} ${MINERAL_OIL_TAP} ${CREAM_OIL_LINE} 50 g / 100 g (NDC 0280-0039) share this formulaId. ${PARKED_ACTIVES} Ask a doctor under 18. ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'aleve.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.aleve} — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

// Verdict tally (3 records): Clean 0 · Caution 3 · Avoid 0
// Written: Advil Targeted Relief Cream + Motrin Arthritis Pain Gel +
//   Aleve Arthritis Pain Gel
// Refused: none
