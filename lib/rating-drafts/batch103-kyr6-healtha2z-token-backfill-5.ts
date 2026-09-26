// DRAFT / not verified / batch 103 KYR6 HealthA2Z leftover-token backfill 5.
// Methodology v1.6 + MAIN §5 after f7d58d6 (Sept 25, 2026 HealthA2Z exact
// leftovers). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. HealthA2Z only. Unlocks the 8 batch102 REFUSED packs whose
// blocking string is now an exact f7d58d6 spelling, and whose full inactive
// paragraph maps to locked MAIN tokens. Near-miss spellings stay refused.
// Pack-mismatch OUTs (FP1083, FPA156a) stay OUT and are not written.
// Day/night dual-panel stays no-row. The batch100 no_OI 46 are not hunted.
// The pin is the DailyMed inactive paragraph or the brand tile those refusals
// already named (re-opened this pass). NDC is not a UPC. No GTIN-12 printed
// on these SPLs or tiles. The BigCommerce upc field is not a printed barcode.
// Empty stays empty. recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Packs with the same inactive
// line share formulaId. None of these lines is already a MAIN formula row.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch102. No house Amazon. No TIME-Cap. No GoodSense.
// No toothpaste. No Sprouts. No factory. Oil form split stays as it is on main.
//
// TALLY (unverified drafts in THIS file): 8 rows —
// Clean 0 / Caution 1 / Avoid 7.
// NEW 5 / REUSE-formula 3 /
// SKIPPED 0 (no_OI 0 / OUT 0) /
// REFUSED 0.
// Search grade: Clean 0 / Caution 1 / Avoid 7.
// UPCs attached: none.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  bareGlucose:
    'Methodology §5 Caution (bare glucose — exact token; locked Sept 22, 2026). Distinct from Cleared glucose syrup. Not Avoid.',
  bareSugar:
    'Methodology §5 Caution (bare sugar). Sugar spheres [...] maps here (Sept 25, 2026, f7d58d6). Same Caution lock. Not a new grade. Distinct from Cleared cane sugar and from Limited sucrose.',
  betaCarotene:
    'Methodology §5 Caution (beta-carotene as a color additive). Bare beta-carotene maps here (Sept 25, 2026, f7d58d6). Same Caution lock. Not a new grade. Not Avoid.',
  bkc:
    'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name.',
  edtaDihydrate:
    'Methodology §5 Caution (edetate disodium dihydrate — EDTA). Distinct from Cleared disodium EDTA trace use. Not Avoid.',
  gelatin: 'Methodology §5 Cleared (gelatin). Gelatin USP maps here (Sept 24, 2026). Not a new grade.',
  glucoseSyrup:
    'Methodology §5 Cleared (glucose syrup — acceptable sweetener). Distinct from Caution bare glucose.',
  glycerin:
    'Methodology §5 Cleared (glycerin). Glycerin USP and glycerine USP map here (Sept 25, 2026, a761f55). Not a new grade.',
  gms: 'Methodology §5 Cleared (glyceryl monostearate / Glycerol Monostearate / GMS).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  ironOxide:
    'Methodology §5 Caution (iron oxide as color). Red iron oxide and yellow iron oxide map here (Sept 24, 2026). Alias the family. Not Avoid.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mccSilicified:
    'Methodology §5 Cleared (microcrystalline cellulose). Silicified microcrystalline cellulose maps here (Sept 25, 2026, f7d58d6). Same MCC lock. Not a new grade.',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid copolymer — exact locked polymer name). Methacrylic acid and ethyl acrylate copolymer dispersion maps here (Sept 25, 2026, a761f55). Not a new grade. Not Avoid.',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as a pH adjuster).',
  naturalApple: 'Methodology §5 Caution (flavor). Natural apple flavor maps here (Sept 25, 2026, a761f55). Not Avoid.',
  pectin: 'Methodology §5 Cleared (pectin / gum).',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.',
  peg400:
    'Methodology §5 Moderate (polyethylene glycol / PEGs). Polyethylene glycol-400 USP maps here (Sept 25, 2026, f7d58d6). Same PEG lock as PEG-400 USP. Not a new grade. Not the Avoid driver.',
  pgOral: 'Methodology §5 Moderate (propylene glycol, oral). Propylene glycol USP maps here (Sept 24, 2026). Not a new grade. Not the Avoid driver.',
  polysorbate80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  povidone:
    'Methodology §5 Cleared (povidone). Povidone USP maps here (Sept 25, 2026, a761f55). Not a new grade.',
  purpleCarrot:
    'Methodology §5 Caution (purple carrot concentrate — exact token; locked Sept 25, 2026, a761f55). Purple carrot for color stays Cleared. Not Avoid.',
  sodiumCitrate:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers). Sodium citrate is this citrate-salt lock.',
  sodiumCitrateParen:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers). Sodium citrate (dihydrate) maps here (Sept 25, 2026, f7d58d6). Same Cleared lock as sodium citrate dihydrate. Not a new grade.',
  sodiumStearyl:
    'Methodology §5 Cleared (Sodium Stearyl Fumarate — stearate-family lubricant).',
  sorbitol: 'Methodology §5 Limited (sorbitol — other sugar alcohols). Not Avoid.',
  sorbitol70:
    'Methodology §5 Limited (sorbitol — other sugar alcohols). Sorbitol 70% solution USP maps here (Sept 25, 2026, a761f55). Same Limited lock. Not Caution. Not Avoid.',
  sorbitolSorbitan:
    'Methodology §5 Caution (sorbitol sorbitan solution). Sorbitol sorbitan solution USP maps here (Sept 24, 2026). Distinct from Limited oral sorbitol. Not Avoid.',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  sugar:
    'Methodology §5 Caution (bare sugar — exact token; locked Sept 22, 2026). Distinct from Cleared cane sugar and from Limited sucrose. Not Avoid.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
  unfilteredAcv:
    'Methodology §5 Caution (unfiltered liquid apple cider vinegar — exact token; locked Sept 25, 2026, a761f55). Not Avoid.',
  vegOilGummy:
    'Methodology §5 High (seed/industrial oils in gummies — vegetable oil). Seed/industrial oils are flagged in gummies. In a softgel or cream fill they are not that High rule. Not an oil-bottle grade.',
  water:
    'Methodology §5 Cleared (purified water / water). Purified water USP maps here (Sept 25, 2026, a761f55). Not a new grade.',
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

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof OTC | typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  barcode?: string;
  upcNote?: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Allergies: [
        'claritin-allergy-tablets-plain',
        'Independently Clean Claritin plain loratadine already on main. Form labeled, not a hard filter (§6).',
      ],
      Sleep: [
        'pure-encapsulations-melatonin-sr-3mg',
        'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already on main. Form labeled, not a hard filter (§6).',
      ],
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
      ],
      'Cold & Flu': [
        'coldcalm-meltaways',
        'Independently Clean Boiron ColdCalm already on main. Form labeled, not a hard filter (§6).',
      ],
      'Pain & Fever': [
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Packs with this OI list share formulaId \`${d.formulaId}\`. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

const AZEL = 'healtha2z-b103-azelastine-240';
const DAY = 'healtha2z-b103-day-cold-192';
const NIGHT = 'healtha2z-b103-night-cold-192';
const OMEP = 'healtha2z-b103-omeprazole-14';
const ACV = 'healtha2z-b103-acv-gummy-60';

const SET_478 = '3e2fdb0d-c2f5-41ab-b1cd-4fae80648112';

const AZEL_FLAGS: Compact['flags'] = [
  ['benzalkonium chloride', 'limited', 'bkc'],
  ['edetate disodium dihydrate', 'limited', 'edtaDihydrate'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['purified water', 'cleared', 'water'],
  ['sodium citrate (dihydrate)', 'cleared', 'sodiumCitrateParen'],
  ['sorbitol', 'limited', 'sorbitol'],
  ['sucralose', 'moderate', 'sucralose'],
];

const DAY_FLAGS: Compact['flags'] = [
  ['FD&C red #40', 'high', 'dye'],
  ['FD&C yellow #6', 'high', 'dye'],
  ['gelatin USP', 'cleared', 'gelatin'],
  ['glycerine USP', 'cleared', 'glycerin'],
  ['polyethylene glycol-400 USP', 'moderate', 'peg400'],
  ['povidone USP', 'cleared', 'povidone'],
  ['propylene glycol USP', 'moderate', 'pgOral'],
  ['purified water USP', 'cleared', 'water'],
  ['sorbitol sorbitan solution USP', 'limited', 'sorbitolSorbitan'],
  ['titanium dioxide', 'high', 'tio2'],
];

const NIGHT_FLAGS: Compact['flags'] = [
  ['D&C yellow #10', 'high', 'dye'],
  ['FD&C blue #1', 'high', 'dye'],
  ['gelatin USP', 'cleared', 'gelatin'],
  ['glycerin USP', 'cleared', 'glycerin'],
  ['polyethylene glycol-400 USP', 'moderate', 'peg400'],
  ['povidone USP', 'cleared', 'povidone'],
  ['propylene glycol USP', 'moderate', 'pgOral'],
  ['purified water USP', 'cleared', 'water'],
  ['sorbitol 70% solution USP', 'limited', 'sorbitol70'],
  ['sorbitol sorbitan solution USP', 'limited', 'sorbitolSorbitan'],
  ['titanium dioxide', 'high', 'tio2'],
];

const OMEP_FLAGS: Compact['flags'] = [
  ['crospovidone', 'cleared', 'crospovidone'],
  ['glyceryl monostearate', 'cleared', 'gms'],
  ['hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['methacrylic acid and ethyl acrylate copolymer dispersion', 'limited', 'methacrylic'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['polysorbate 80', 'moderate', 'polysorbate80'],
  ['red iron oxide', 'limited', 'ironOxide'],
  ['silicified microcrystalline cellulose', 'cleared', 'mccSilicified'],
  ['sodium hydroxide', 'cleared', 'naoh'],
  ['sodium stearyl fumarate', 'cleared', 'sodiumStearyl'],
  [
    'sugar spheres [which contains liquid glucose, starch (maize) and sucrose]',
    'limited',
    'bareSugar',
  ],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triethyl citrate', 'cleared', 'triethyl'],
  ['yellow iron oxide', 'limited', 'ironOxide'],
];

const ACV_FLAGS: Compact['flags'] = [
  ['Glucose syrup', 'cleared', 'glucoseSyrup'],
  ['sugar', 'limited', 'sugar'],
  ['glucose', 'limited', 'bareGlucose'],
  ['pectin', 'cleared', 'pectin'],
  ['sodium citrate', 'cleared', 'sodiumCitrate'],
  ['citric acid', 'cleared', 'citric'],
  ['natural apple flavor', 'limited', 'naturalApple'],
  ['vegetable oil', 'high', 'vegOilGummy'],
  ['unfiltered liquid apple cider vinegar', 'limited', 'unfilteredAcv'],
  ['purple carrot concentrate', 'limited', 'purpleCarrot'],
  ['beta-carotene', 'limited', 'betaCarotene'],
];

const AZEL_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers: sucralose, sorbitol, benzalkonium chloride, edetate disodium dihydrate. Sodium citrate (dihydrate) is the f7d58d6 spelling that unlocked this panel. It maps to Cleared citrate salts, the same lock as sodium citrate dihydrate. Edetate disodium dihydrate is Caution EDTA and is not Cleared trace disodium EDTA. Benzalkonium chloride is standalone Caution and is not Avoid. Sucralose is Moderate and is not an Avoid driver. Sorbitol is Limited. Hypromellose and purified water are Cleared. No High inactive, so this is not Avoid. Adults and children 12 years and older, and children 6 to 11 years under adult supervision, have a labeled nasal dose. Under 6: do not use.';

const DAY_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C red #40, FD&C yellow #6, titanium dioxide. Polyethylene glycol-400 USP is the f7d58d6 spelling that unlocked this panel. It maps to Moderate PEG, the same lock as PEG-400 USP, and is not the Avoid driver. Glycerine USP, povidone USP, and purified water USP map to those Cleared locks. Gelatin USP is Cleared. Propylene glycol USP is oral Moderate. Sorbitol sorbitan solution USP is Caution and is not Limited sorbitol. Adults and children 12 years and over: 2 softgels every 4 hours. Children 4 to under 12: ask a doctor. Under 4: do not use.';

const NIGHT_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10, FD&C blue #1, titanium dioxide. Polyethylene glycol-400 USP is the f7d58d6 spelling that unlocked this panel. It maps to Moderate PEG, the same lock as PEG-400 USP, and is not the Avoid driver. Glycerin USP, povidone USP, and purified water USP map to those Cleared locks. Gelatin USP is Cleared. Propylene glycol USP is oral Moderate. Sorbitol 70% solution USP is Limited oral sorbitol. Sorbitol sorbitan solution USP is Caution and is not that Limited sorbitol row. Adults and children 12 years and over: 2 softgels with water every 6 hours. Children 4 to under 12: ask a doctor. Under 4: do not use.';

const OMEP_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: talc, titanium dioxide. Silicified microcrystalline cellulose and sugar spheres [which contains liquid glucose, starch (maize) and sucrose] are the f7d58d6 spellings that unlocked this panel. Silicified microcrystalline cellulose maps to Cleared MCC. The bracketed sugar-spheres clause maps to Caution bare sugar. Methacrylic acid and ethyl acrylate copolymer dispersion is the locked copolymer Caution name. Red iron oxide and yellow iron oxide are Caution iron oxide as color. Polyethylene glycol and polysorbate 80 are Moderate and are not the Avoid drivers. Crospovidone, glyceryl monostearate, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, sodium hydroxide, sodium stearyl fumarate, and triethyl citrate are Cleared. Adults 18 years and older: 1 tablet daily for 14 days. Under 18: ask a doctor.';

const ACV_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver: vegetable oil in a gummy. Bare beta-carotene is the f7d58d6 spelling that unlocked this panel. It maps to Caution beta-carotene as color and is not the Avoid driver. Natural apple flavor maps to Caution flavor. Unfiltered liquid apple cider vinegar and purple carrot concentrate are the a761f55 Caution locks. Sugar and glucose are Caution. Glucose syrup is Cleared and is not bare glucose. Pectin is Cleared. Sodium citrate and citric acid are Cleared citrate salts. The supplement-facts amounts (apple cider vinegar powder, pomegranate juice powder, beet juice powder, and the B vitamins and iodine) are labeled actives, not this other-ingredients grade. Seed/industrial oils are flagged in gummies. The tile does not print a minimum age. Serving size is 2 gummies. Not an oil-bottle grade.';

const OI_478 =
  'Inactive ingredients: benzalkonium chloride, edetate disodium dihydrate, hypromellose, purified water, sodium citrate (dihydrate), sorbitol, sucralose.';
const OI_DAY =
  'Inactive ingredients: FD&C red #40, FD&C yellow #6, gelatin USP, glycerine USP, polyethylene glycol-400 USP, povidone USP, propylene glycol USP, purified water USP, sorbitol sorbitan solution USP, titanium dioxide.';
const OI_NIGHT =
  'Inactive ingredients: D&C yellow #10, FD&C blue #1, gelatin USP, glycerin USP, polyethylene glycol-400 USP, povidone USP, propylene glycol USP, purified water USP, sorbitol 70% solution USP, sorbitol sorbitan solution USP, titanium dioxide.';
const OI_OMEP =
  'Inactive ingredients: crospovidone, glyceryl monostearate, hydroxypropyl cellulose, hypromellose, magnesium stearate, methacrylic acid and ethyl acrylate copolymer dispersion, microcrystalline cellulose, polyethylene glycol, polysorbate 80, red iron oxide, silicified microcrystalline cellulose, sodium hydroxide, sodium stearyl fumarate, sugar spheres [which contains liquid glucose, starch (maize) and sucrose], talc, titanium dioxide, triethyl citrate and yellow iron oxide.';
const OI_ACV =
  'Other ingredients: Glucose syrup, sugar, glucose, pectin, sodium citrate, citric acid, natural apple flavor, vegetable oil, unfiltered liquid apple cider vinegar, purple carrot concentrate, and beta-carotene.';

const DAY_URL = 'https://a2z-life.com/healtha2z-daytime-cold-flu-relief/';
const DAY8_URL =
  'https://a2z-life.com/healtha2z-daytime-cold-flu-relief-compare-to-dayquil-active-ingredient-packs-of-8-softgels/';
const NIGHT_URL =
  'https://a2z-life.com/healtha2z-nighttime-cold-flu-relief-compare-to-nyquil-active-ingredient-24-packs-of-8-softgels-192-softgels-total-value-package/';
const NIGHT8_URL =
  'https://a2z-life.com/healtha2z-nighttime-cold-flu-relief-8-softgels-1-pack-3-packs-6-packs/';
const OMEP_URL =
  'https://a2z-life.com/healtha2z-acid-reducer-omeprazole-20mg-14-tablets-delayed-release-tablets-24-hours-treats-frequent-heartburn-occuring-2-or-more-days-a-week/';
const OMEP42_URL =
  'https://a2z-life.com/healtha2z-acid-reducer-omeprazole-20mg-42-tablets-delayed-release-tablets-24-hours-treats-frequent-heartburn-occuring-2-or-more-days-a-week/';
const ACV_URL = 'https://a2z-life.com/healtha2z-apple-cider-vinegar-500mg-gummy-4g-60-ct/';

const COMPACT: Compact[] = [
  {
    id: AZEL,
    productName:
      'HealthA2Z Azelastine HCl nasal spray, 2×120 sprays (240), NDC 69168-478-02 (FP1282)',
    category: 'Allergies',
    formulaId: AZEL,
    audience: ADULT,
    minAge: 6,
    form: 'spray',
    productType: OTC,
    actives: [{ name: 'Azelastine hydrochloride', strength: '205.5 mcg' }],
    flags: AZEL_FLAGS,
    verdict: 'caution',
    note: AZEL_NOTE,
    cite: `DailyMed SPL (${DM}${SET_478}; setid ${SET_478}; NDC 69168-478-02; 2 bottles of 120 sprays). ${OI_478} Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: DAY,
    productName:
      'HealthA2Z Daytime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-356-23 (FP0999)',
    category: 'Cold & Flu',
    formulaId: DAY,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Dextromethorphan HBr', strength: '10 mg' },
      { name: 'Phenylephrine HCl', strength: '5 mg' },
    ],
    flags: DAY_FLAGS,
    verdict: 'avoid',
    note: DAY_NOTE,
    cite: `Brand drug-facts tile Day_Time_Cold_Flu_Softgels_24x8_Softgels_-_Drug_Facts on ${DAY_URL}. ${OI_DAY} Ages 12+. No GTIN-12 printed on the tile. The BigCommerce upc field is not a printed barcode pin.`,
  },
  {
    id: 'healtha2z-b103-day-cold-8',
    productName: 'HealthA2Z Daytime Cold & Flu Relief, 8 softgels (1, 3, and 6 packs)',
    category: 'Cold & Flu',
    formulaId: DAY,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Dextromethorphan HBr', strength: '10 mg' },
      { name: 'Phenylephrine HCl', strength: '5 mg' },
    ],
    flags: DAY_FLAGS,
    verdict: 'avoid',
    note: `${DAY_NOTE} Same inactive list as the 24×8, so they share formulaId. The 1, 3, and 6 options are this 8-softgel panel.`,
    cite: `Brand drug-facts tile Day_Time_Cold_Flu_Softgels_24x8_Softgels_-_Drug_Facts on ${DAY8_URL}. Same inactive list as FP0999, including polyethylene glycol-400 USP. Ages 12+. No GTIN-12 printed on the tile.`,
  },
  {
    id: NIGHT,
    productName:
      'HealthA2Z Nighttime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-357-29 (FP1003)',
    category: 'Cold & Flu',
    formulaId: NIGHT,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Dextromethorphan HBr', strength: '15 mg' },
      { name: 'Doxylamine succinate', strength: '6.25 mg' },
    ],
    flags: NIGHT_FLAGS,
    verdict: 'avoid',
    note: NIGHT_NOTE,
    cite: `Brand drug-facts tile detail03 on ${NIGHT_URL}. ${OI_NIGHT} Ages 12+. No GTIN-12 printed on the tile. The BigCommerce upc field is not a printed barcode pin.`,
  },
  {
    id: 'healtha2z-b103-night-cold-8',
    productName: 'HealthA2Z Nighttime Cold-Flu Relief, 8 Softgels (1 Pack, 3 Packs & 6 Packs)',
    category: 'Cold & Flu',
    formulaId: NIGHT,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Dextromethorphan HBr', strength: '15 mg' },
      { name: 'Doxylamine succinate', strength: '6.25 mg' },
    ],
    flags: NIGHT_FLAGS,
    verdict: 'avoid',
    note: `${NIGHT_NOTE} Same inactive list as the 24×8, so they share formulaId. The 1, 3, and 6 options are this 8-softgel panel.`,
    cite: `Brand drug-facts tile 003 on ${NIGHT8_URL}. Same inactive list as FP1003, including polyethylene glycol-400 USP. Ages 12+. No GTIN-12 printed on the tile.`,
  },
  {
    id: OMEP,
    productName:
      'HealthA2Z Omeprazole 20 mg delayed-release, 14 tablets (FPA173)',
    category: 'Digestive',
    formulaId: OMEP,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Omeprazole', strength: '20 mg' }],
    flags: OMEP_FLAGS,
    verdict: 'avoid',
    note: OMEP_NOTE,
    cite: `Brand drug-facts image on ${OMEP_URL}. ${OI_OMEP} Ages 18+. No GTIN-12 printed on the tile. The DailyMed 476 inactive paragraph is a different list and was not used.`,
  },
  {
    id: 'healtha2z-b103-omeprazole-42',
    productName: 'HealthA2Z Omeprazole 20 mg delayed-release, 42 tablets (FPA174)',
    category: 'Digestive',
    formulaId: OMEP,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Omeprazole', strength: '20 mg' }],
    flags: OMEP_FLAGS,
    verdict: 'avoid',
    note: `${OMEP_NOTE} Same inactive list as the 14-tablet pack, so they share formulaId.`,
    cite: `Brand drug-facts image on ${OMEP42_URL}. Same inactive list as the 14-tablet pack, including silicified microcrystalline cellulose and sugar spheres [which contains liquid glucose, starch (maize) and sucrose]. Ages 18+. No GTIN-12 printed on the tile.`,
  },
  {
    id: ACV,
    productName: 'HealthA2Z Apple Cider Vinegar 500 mg gummy, 60 ct (FPHK1044)',
    category: 'Vitamins',
    formulaId: ACV,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin B-6 (as pyridoxine HCl)', strength: '1 mg' },
      { name: 'Folate (as folic acid)', strength: '400 mcg DFE' },
      { name: 'Vitamin B-12 (as cyanocobalamin)', strength: '2.4 mcg' },
      { name: 'Iodine (as potassium iodide)', strength: '100 mcg' },
      { name: 'Apple cider vinegar powder (fruit)', strength: '1000 mg' },
      { name: 'Pomegranate juice powder (fruit)', strength: '80 mcg' },
      { name: 'Beet juice powder (root)', strength: '80 mcg' },
    ],
    flags: ACV_FLAGS,
    verdict: 'avoid',
    note: ACV_NOTE,
    cite: `Brand supplement-facts tile Apple_Cider_Ingredients on ${ACV_URL}. ${OI_ACV} Supplement facts per 2 gummies. No GTIN-12 printed on the tile. The BigCommerce upc field is not a printed barcode pin.`,
  },
];

export const BATCH103_KYR6_HEALTHA2Z_TOKEN_BACKFILL_5: RatingRecord[] = COMPACT.map(expand);

export const BATCH103_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH103_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH103_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH103_SKIPPED_NO_OI,
  ...BATCH103_SKIPPED_OUT,
];

export const BATCH103_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH103_KYR6_HEALTHA2Z_TOKEN_BACKFILL_5;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 8) throw new Error('batch103 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 1 || _grades.avoid !== 7) {
  throw new Error('batch103 Search grade drift');
}
if (_new !== 5 || _reuse !== 3) throw new Error('batch103 NEW/REUSE drift');
if (BATCH103_SKIPPED_NO_OI.length !== 0) throw new Error('batch103 no_OI drift');
if (BATCH103_SKIPPED_OUT.length !== 0) throw new Error('batch103 OUT drift');
if (BATCH103_SKIPPED.length !== 0) throw new Error('batch103 SKIPPED drift');
if (BATCH103_REFUSED.length !== 0) throw new Error('batch103 REFUSED drift');
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch103 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch103 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 0) throw new Error('batch103 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch103 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch103 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch103 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch103 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b103-'))) {
  throw new Error('batch103 ids must use healtha2z-b103-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch103 duplicate id');
if (_ROWS.some((r) => r.formulaId?.startsWith('healtha2z-b103-') && !_ids.has(r.formulaId))) {
  throw new Error('batch103 in-file formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch103 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch103 Clean row has a non-cleared inactive');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch103 Caution needs Limited or Moderate');
}
const _flagNames = new Set(_ROWS.flatMap((r) => r.inactiveIngredients?.map((f) => f.name) ?? []));
for (const unlocked of [
  'sodium citrate (dihydrate)',
  'polyethylene glycol-400 USP',
  'silicified microcrystalline cellulose',
  'sugar spheres [which contains liquid glucose, starch (maize) and sucrose]',
  'beta-carotene',
]) {
  if (!_flagNames.has(unlocked)) throw new Error(`batch103 missing an f7d58d6 unlock token: ${unlocked}`);
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH103_SKIPPED.map((s) => s.sku),
  ...BATCH103_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch103 excluded brand leaked');
}
if (/FP1083|FPA156a/.test(_blob)) {
  throw new Error('batch103 wrote a pack-mismatch OUT');
}
