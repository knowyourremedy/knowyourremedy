// DRAFT / not verified / batch 102 KYR6 HealthA2Z leftover-token backfill 4.
// Methodology v1.6 + MAIN §5 after a761f55 (Sept 25, 2026 HealthA2Z alias
// families 2). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. HealthA2Z only. Unlocks batch101 REFUSED packs whose blocking
// string is now an exact alias on a761f55, and whose full inactive paragraph
// maps to locked MAIN tokens. A panel that still has one unmapped string stays
// REFUSED with that exact string. Near-miss spellings stay refused.
// Day/night dual-panel stays no-row. The batch100 no_OI 46 are not hunted.
// The pin is the DailyMed inactive paragraph or the brand tile those refusals
// already named (re-opened this pass). NDC is not a UPC. No GTIN-12 printed
// on these SPLs or tiles. The BigCommerce upc field is not a printed barcode.
// Empty stays empty. recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Packs with the same inactive
// line share formulaId. None of these lines is already a MAIN formula row.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch101. No house Amazon. No TIME-Cap. No GoodSense.
// No toothpaste. No Sprouts. No factory. Oil form split stays as it is on main.
//
// TALLY (unverified drafts in THIS file): 9 rows —
// Clean 0 / Caution 3 / Avoid 6.
// NEW 7 / REUSE-formula 2 /
// SKIPPED 2 (no_OI 0 / OUT 2) /
// REFUSED 8.
// Search grade: Clean 0 / Caution 3 / Avoid 6.
// UPCs attached: none.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  artificialBlueberry:
    'Methodology §5 Caution (flavor). Artificial blueberry flavor maps here (Sept 25, 2026, a761f55). Alias the family. Distinct from Limited artificial flavors and from Limited natural flavors. Not Avoid.',
  bareTurmeric:
    'Methodology §5 Caution (bare turmeric as an Other Ingredient — exact token; locked Sept 23, 2026). Curcumin-as-color stays Cleared. Oleoresin turmeric stays its own Caution row. Not Avoid.',
  blue1:
    'Methodology §5 High (Blue 1 / synthetic dyes). blue 1 maps here (Sept 25, 2026, a761f55). Not a new grade.',
  brilliantBlue:
    'Methodology §5 High (Blue 1 / synthetic dyes). FD&C blue #1 brilliant blue lake maps here (Sept 25, 2026, a761f55). Not a new grade.',
  calciumPhos:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate — mineral filler). Dibasic calcium phosphate dihydrate and dicalcium phosphate dihydrate sit here (Sept 25, 2026, a761f55). Not a new grade. Not phosphoric acid.',
  caramel:
    'Methodology §5 High (caramel color, undisclosed class). The label prints caramel color and does not name Class I or II. Not caramel sugar syrup.',
  carbomer: 'Methodology §5 Cleared (carbomer).',
  carnauba: 'Methodology §5 Cleared (carnauba wax).',
  carrageenan: 'Methodology §5 Limited (carrageenan).',
  citric: 'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers).',
  citrusPectin:
    'Methodology §5 Cleared (pectin / gum). Citrus pectin maps here (Sept 25, 2026, a761f55). Same Cleared lock. Not a new grade. Gummy seed-oils stay Avoid.',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dyeLake:
    'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name.',
  dyeYellow10:
    'Methodology §5 High (synthetic dyes). D&C Yellow 10 maps here (Sept 25, 2026, a761f55). Not a new grade. Not the hashed D&C yellow #10 aluminum lake spelling.',
  flavor:
    'Methodology §5 Caution (flavor — exact token; locked Sept 24, 2026). Distinct from Limited natural flavors. Not Avoid.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  ipa: 'Methodology §5 Limited (isopropyl alcohol — alcohol vehicle). Not Avoid.',
  ironOchre:
    'Methodology §5 Caution (iron oxide as color). Iron oxide ochre maps here (Sept 25, 2026, a761f55). Alias the family. Not Avoid.',
  lactoseAnh:
    'Methodology §5 Cleared (lactose / lactose monohydrate). Anhydrous lactose maps to lactose (Sept 24, 2026). Not a new grade.',
  maltSyrup:
    'Methodology §5 Caution (malt syrup — exact token; locked Sept 25, 2026, a761f55). Distinct from Limited barley malt syrup. Not Avoid.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mccJoin:
    'Methodology §5 Cleared (microcrystalline cellulose). Microcrystallinecellulose maps here (Sept 25, 2026, a761f55). Not a new grade. The SPL joins microcrystalline and cellulose.',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid copolymer — exact locked polymer name). Not Avoid.',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  mgSulfate: 'Methodology §5 Cleared (magnesium sulfate — exact token; locked Sept 15, 2026).',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as a pH adjuster).',
  nacl: 'Methodology §5 Cleared (sodium chloride — saline base).',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.',
  pgOral: 'Methodology §5 Moderate (propylene glycol, oral). Not the Avoid driver.',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  polysorbate80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  silica:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  silicaGel:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica gel — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  simethicone:
    'Methodology §5 Caution (simethicone as an Other Ingredient — exact token; locked Sept 24, 2026). Not Avoid.',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.',
  sodiumBenzoate: 'Methodology §5 Limited (synthetic preservatives — sodium benzoate).',
  sodiumCitrate2:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers). Sodium citrate dihydrate maps here (Sept 25, 2026, a761f55). Not a new grade.',
  sodiumHex:
    'Methodology §5 Caution (sodium hexametaphosphate). Sodium hexametophosphate is this spelling (Sept 25, 2026, a761f55). Not a new grade. Not Avoid.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  starchBare:
    'Methodology §5 Cleared (simple starch filler). Bare starch as a filler maps here (Sept 25, 2026, a761f55). The panel prints starch. Caution unspecified starch stays Caution. Not a new grade.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  sucrose: 'Methodology §5 Limited (sucrose).',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
  trisodium:
    'Methodology §5 Cleared (trisodium citrate — exact token; locked Sept 22, 2026). Citrate-salt filler with citric acid.',
  vegOilGummy:
    'Methodology §5 High (seed/industrial oils in gummies — vegetable oil). Seed/industrial oils are flagged in gummies. In a softgel or cream fill they are not that High rule. Not an oil-bottle grade.',
  water: 'Methodology §5 Cleared (purified water / water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
  yellow5:
    'Methodology §5 High (Yellow 5 / synthetic dyes). yellow 5 maps here (Sept 25, 2026, a761f55). Not a new grade.',
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
  audience: typeof ADULT | typeof KIDS;
  minAge: number;
  form: string;
  productType: typeof OTC | typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
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
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}`],
  });
}

const DOXY = 'healtha2z-b102-doxylamine-25';
const ASPIRIN = 'healtha2z-b102-aspirin-81-ec-318';
const KIDS_ALLERGY = 'healtha2z-b102-kids-diphen-liquid';
const LOPERAMIDE = 'healtha2z-b102-loperamide-2';
const MOTION = 'healtha2z-b102-dimenhydrinate-50';
const ROLL = 'healtha2z-b102-menthol-roll-on';
const ELDER = 'healtha2z-b102-elderberry-gummy-60';

const SET_439 = '3761182c-275b-40f3-a262-9ef5f5a80723';
const SET_318 = '3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5';
const SET_471 = 'cb6df361-b8e5-4e2f-945f-c20159d76c4f';
const SET_248 = 'aca3742c-2a82-4e91-8aaf-2fce08487e56';
const SET_408 = '7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1';
const SET_483 = '36463acb-7c28-416f-a45f-a93f0be5692b';

const DOXY_FLAGS: Compact['flags'] = [
  ['dibasic calcium phosphate dihydrate', 'cleared', 'calciumPhos'],
  ['FD&C blue #1 aluminum lake', 'high', 'dyeLake'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystallinecellulose', 'cleared', 'mccJoin'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
];

const ASPIRIN_FLAGS: Compact['flags'] = [
  ['anhydrous lactose', 'cleared', 'lactoseAnh'],
  ['carnauba wax', 'cleared', 'carnauba'],
  ['colloidal silicon dioxide', 'limited', 'silica'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['D&C Yellow 10', 'high', 'dyeYellow10'],
  ['iron oxide ochre', 'limited', 'ironOchre'],
  ['methacrylic acid copolymer', 'limited', 'methacrylic'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polysorbate 80', 'moderate', 'polysorbate80'],
  ['simethicone', 'limited', 'simethicone'],
  ['sodium hydroxide', 'cleared', 'naoh'],
  ['sodium lauryl sulfate', 'limited', 'sls'],
  ['starch', 'cleared', 'starchBare'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triethyl citrate', 'cleared', 'triethyl'],
];

const KIDS_FLAGS: Compact['flags'] = [
  ['anhydrous citric acid', 'cleared', 'citric'],
  ['flavor', 'limited', 'flavor'],
  ['glycerin', 'cleared', 'glycerin'],
  ['propylene glycol', 'moderate', 'pgOral'],
  ['purified water', 'cleared', 'water'],
  ['sodium benzoate', 'limited', 'sodiumBenzoate'],
  ['sodium chloride', 'cleared', 'nacl'],
  ['sodium citrate dihydrate', 'cleared', 'sodiumCitrate2'],
  ['sucralose', 'moderate', 'sucralose'],
  ['xanthan gum', 'cleared', 'xanthan'],
];

const LOPERAMIDE_FLAGS: Compact['flags'] = [
  ['corn starch', 'cleared', 'cornStarch'],
  ['D&C yellow #10 aluminum lake', 'high', 'dyeLake'],
  ['dicalcium phosphate dihydrate', 'cleared', 'calciumPhos'],
  ['FD&C blue #1 brilliant blue lake', 'high', 'brilliantBlue'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['silica gel', 'limited', 'silicaGel'],
];

const MOTION_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['dibasic calcium phosphate dihydrate', 'cleared', 'calciumPhos'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['silicon dioxide', 'limited', 'silica'],
  ['stearic acid', 'cleared', 'stearic'],
];

const ROLL_FLAGS: Compact['flags'] = [
  ['blue 1', 'high', 'blue1'],
  ['carbomer', 'cleared', 'carbomer'],
  ['isopropyl alcohol', 'limited', 'ipa'],
  ['magnesium sulfate', 'cleared', 'mgSulfate'],
  ['sodium hydroxide', 'cleared', 'naoh'],
  ['water', 'cleared', 'water'],
  ['yellow 5', 'high', 'yellow5'],
];

const ELDER_FLAGS: Compact['flags'] = [
  ['artificial blueberry flavor', 'limited', 'artificialBlueberry'],
  ['caramel color', 'high', 'caramel'],
  ['carnauba wax', 'cleared', 'carnauba'],
  ['carrageenan', 'limited', 'carrageenan'],
  ['citrus pectin', 'cleared', 'citrusPectin'],
  ['Malt syrup', 'limited', 'maltSyrup'],
  ['polydextrose', 'limited', 'polydextrose'],
  ['purified water', 'cleared', 'water'],
  ['sodium hexametophosphate', 'limited', 'sodiumHex'],
  ['sucrose', 'limited', 'sucrose'],
  ['trisodium citrate', 'cleared', 'trisodium'],
  ['turmeric', 'limited', 'bareTurmeric'],
  ['vegetable oil', 'high', 'vegOilGummy'],
];

const DOXY_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver: FD&C blue #1 aluminum lake. Dibasic calcium phosphate dihydrate and microcrystallinecellulose are the a761f55 aliases that unlocked this panel. Dibasic calcium phosphate dihydrate maps to Cleared calcium phosphate. Microcrystallinecellulose maps to Cleared MCC. Magnesium stearate and sodium starch glycolate are Cleared. Adults and children 12 years and over: one tablet at bedtime. Under 12: do not use.';

const ASPIRIN_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C Yellow 10, talc, titanium dioxide. D&C Yellow 10, iron oxide ochre, and starch are the a761f55 aliases that unlocked this panel. D&C Yellow 10 maps to the synthetic-dye Avoid row. Iron oxide ochre maps to Caution iron oxide as color. Starch is the bare-starch filler and maps to Cleared simple starch. Caution unspecified starch stays Caution. Methacrylic acid copolymer is the locked Caution polymer name. Anhydrous lactose is Cleared. Colloidal silicon dioxide is the 0-pt Caution cap. Polysorbate 80 is Moderate and is not the Avoid driver. Simethicone and sodium lauryl sulfate are Caution and are not the Avoid drivers. Starch is the may-contain line on this SPL. Adults and children 12 years and over. Under 12: consult a doctor. Not the 365-count enteric formula and not the dye-free 200-count.';

const KIDS_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers: sucralose, propylene glycol, flavor, sodium benzoate. Sodium citrate dihydrate is the a761f55 alias that unlocked this panel. It maps to Cleared citrate salts. Sucralose is Moderate and is not an Avoid driver. Flavor is the locked Caution token. Propylene glycol is oral Moderate. Sodium benzoate is Limited. Anhydrous citric acid is Cleared citric acid. Children 6 to 11 years: 5 mL to 10 mL. Children 2 to 5 years: do not use unless directed by a doctor. Under 2: do not use.';

const LOPERAMIDE_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10 aluminum lake, FD&C blue #1 brilliant blue lake. Dicalcium phosphate dihydrate and FD&C blue #1 brilliant blue lake are the a761f55 aliases that unlocked this panel. Dicalcium phosphate dihydrate maps to Cleared calcium phosphate. FD&C blue #1 brilliant blue lake maps to the Blue 1 Avoid row. Silica gel is the 0-pt Caution cap and is not the Avoid driver. Corn starch, magnesium stearate, and microcrystalline cellulose are Cleared. Adults and children 12 years and over, and children 6 to 8 years, have a labeled caplet dose. Children 2 to 5 years: ask a doctor. Under 2: do not use.';

const MOTION_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Driver: silicon dioxide. Dibasic calcium phosphate dihydrate is the a761f55 alias that unlocked this panel. It maps to Cleared calcium phosphate. Silicon dioxide is the 0-pt Caution cap. Croscarmellose sodium, magnesium stearate, microcrystalline cellulose, and stearic acid are Cleared. No High inactive, so this is not Avoid. Adults and children 2 years and over. Under 2: do not use unless directed by a doctor.';

const ROLL_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: blue 1, yellow 5. Blue 1 and yellow 5 are the a761f55 aliases that unlocked this panel. Both map to the synthetic-dye Avoid row. Isopropyl alcohol is the Limited alcohol vehicle and is not Avoid. Carbomer, magnesium sulfate, sodium hydroxide, and water are Cleared. Pain rubs stay Pain & Fever. Adults and children over 2 years. Under 2: ask a doctor. External use only.';

const ELDER_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: vegetable oil in a gummy, caramel color with no class named. Malt syrup, citrus pectin, sodium hexametophosphate, and artificial blueberry flavor are the a761f55 aliases that unlocked this panel. Malt syrup maps to Caution malt syrup and is not Limited barley malt syrup. Citrus pectin maps to Cleared pectin. Sodium hexametophosphate maps to Caution sodium hexametaphosphate. Artificial blueberry flavor maps to Caution flavor and is not Limited artificial flavors. Turmeric is Caution bare turmeric as an Other Ingredient. Carrageenan, polydextrose, and sucrose are Limited and are not the Avoid drivers. The contains-tree-nut line is allergen copy and is not an inactive grade. Seed/industrial oils are flagged in gummies. Adults and children 4 years and older: chew 2 gummies daily. Not an oil-bottle grade.';

const OI_439 =
  'Inactive ingredients: dibasic calcium phosphate dihydrate, FD&C blue #1 aluminum lake, magnesium stearate, microcrystallinecellulose, sodium starch glycolate.';
const OI_318 =
  'Inactive ingredients: anhydrous lactose, carnauba wax, colloidal silicon dioxide, croscarmellose sodium, D&C Yellow 10, iron oxide ochre, methacrylic acid copolymer, microcrystalline cellulose, polysorbate 80, simethicone, sodium hydroxide, sodium lauryl sulfate, talc, titanium dioxide, triethyl citrate. May contain: starch.';
const OI_471 =
  'Inactive ingredients: anhydrous citric acid, flavor, glycerin, propylene glycol, purified water, sodium benzoate, sodium chloride, sodium citrate dihydrate, sucralose, xanthan gum.';
const OI_248 =
  'Inactive ingredients: corn starch, D&C yellow #10 aluminum lake, dicalcium phosphate dihydrate, FD&C blue #1 brilliant blue lake, magnesium stearate, microcrystalline cellulose, silica gel.';
const OI_408 =
  'Inactive ingredients: croscarmellose sodium, dibasic calcium phosphate dihydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide, stearic acid.';
const OI_483 =
  'Inactive ingredients: blue 1, carbomer, isopropyl alcohol, magnesium sulfate, sodium hydroxide, water, yellow 5.';
const OI_ELDER =
  'Other ingredients: Malt syrup, purified water, sucrose, polydextrose, carrageenan, citrus pectin, sodium hexametophosphate, artificial blueberry flavor, carnauba wax, vegetable oil, trisodium citrate, caramel color and turmeric.';

const COMPACT: Compact[] = [
  {
    id: DOXY,
    productName: 'HealthA2Z Doxylamine succinate 25 mg, 200 tablets, NDC 69168-439-98 (FPA122)',
    category: 'Sleep',
    formulaId: DOXY,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Doxylamine succinate', strength: '25 mg' }],
    flags: DOXY_FLAGS,
    verdict: 'avoid',
    note: DOXY_NOTE,
    cite: `DailyMed SPL (${DM}${SET_439}; setid ${SET_439}; NDC 69168-439-98; 200). ${OI_439} Ages 12+. No GTIN-12 on the SPL. The 40-count, 120-count, and 16-count on this SPL were not refused packs and are not added.`,
  },
  {
    id: ASPIRIN,
    productName: 'HealthA2Z Aspirin 81 mg enteric-coated, 300 tablets, NDC 69168-318-17 (FPA013)',
    category: 'Pain & Fever',
    formulaId: ASPIRIN,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASPIRIN_FLAGS,
    verdict: 'avoid',
    note: ASPIRIN_NOTE,
    cite: `DailyMed SPL (${DM}${SET_318}; setid ${SET_318}; NDC 69168-318-17; 300). ${OI_318} Ages 12+. No GTIN-12 on the SPL. The 50-count carton NDC 69168-318-50 and the 120-count carton NDC 69168-318-06 were not the refused 300-count pack.`,
  },
  {
    id: KIDS_ALLERGY,
    productName:
      'HealthA2Z Children\u2019s diphenhydramine HCl 12.5 mg/5 mL, 237 mL, NDC 69168-471-59 (FPA164)',
    category: 'Allergies',
    formulaId: KIDS_ALLERGY,
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '12.5 mg/5 mL' }],
    flags: KIDS_FLAGS,
    verdict: 'caution',
    note: KIDS_NOTE,
    cite: `DailyMed SPL (${DM}${SET_471}; setid ${SET_471}; NDC 69168-471-59; 237 mL). ${OI_471} Ages 6 to 11 have a labeled dose. No GTIN-12 on the SPL.`,
  },
  {
    id: LOPERAMIDE,
    productName: 'HealthA2Z Loperamide HCl 2 mg, 12 caplets, NDC 69168-248-86 (FP0697)',
    category: 'Digestive',
    formulaId: LOPERAMIDE,
    audience: ADULT,
    minAge: 6,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Loperamide HCl', strength: '2 mg' }],
    flags: LOPERAMIDE_FLAGS,
    verdict: 'avoid',
    note: LOPERAMIDE_NOTE,
    cite: `DailyMed SPL (${DM}${SET_248}; setid ${SET_248}; NDC 69168-248-86; 12, two blister packs of 6). ${OI_248} The 1/3/6 option page is this 12-count carton. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b102-loperamide-2-288',
    productName: 'HealthA2Z Loperamide HCl 2 mg, 24×12 caplets (288), NDC 69168-248-86 (FP0697A)',
    category: 'Digestive',
    formulaId: LOPERAMIDE,
    audience: ADULT,
    minAge: 6,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Loperamide HCl', strength: '2 mg' }],
    flags: LOPERAMIDE_FLAGS,
    verdict: 'avoid',
    note: `${LOPERAMIDE_NOTE} Same inactive list as the 12-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_248}; setid ${SET_248}; NDC 69168-248-86; 12 inside the 24-pack). Same inactive list as the 12-count, including dicalcium phosphate dihydrate and FD&C blue #1 brilliant blue lake. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: MOTION,
    productName:
      'HealthA2Z Motion Sickness Relief, dimenhydrinate 50 mg, 12 tablets, NDC 69168-408-86 (FPA027E)',
    category: 'Digestive',
    formulaId: MOTION,
    audience: ADULT,
    minAge: 2,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Dimenhydrinate', strength: '50 mg' }],
    flags: MOTION_FLAGS,
    verdict: 'caution',
    note: MOTION_NOTE,
    cite: `DailyMed SPL (${DM}${SET_408}; setid ${SET_408}; NDC 69168-408-86; 12). ${OI_408} The 1/3/6 option page is this 12-count carton. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b102-dimenhydrinate-50-288',
    productName:
      'HealthA2Z Motion Sickness Relief, dimenhydrinate 50 mg, 24×12 tablets (288), NDC 69168-408-86 (FP0944)',
    category: 'Digestive',
    formulaId: MOTION,
    audience: ADULT,
    minAge: 2,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Dimenhydrinate', strength: '50 mg' }],
    flags: MOTION_FLAGS,
    verdict: 'caution',
    note: `${MOTION_NOTE} Same inactive list as the 12-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_408}; setid ${SET_408}; NDC 69168-408-86; 12 inside the 24-pack). Same inactive list as the 12-count, including dibasic calcium phosphate dihydrate. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: ROLL,
    productName: 'HealthA2Z Cold Therapy roll-on, menthol 4%, 74 mL, NDC 69168-483-67 (FPA183)',
    category: 'Pain & Fever',
    formulaId: ROLL,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    productType: OTC,
    actives: [{ name: 'Menthol', strength: '4%' }],
    flags: ROLL_FLAGS,
    verdict: 'avoid',
    note: ROLL_NOTE,
    cite: `DailyMed SPL (${DM}${SET_483}; setid ${SET_483}; NDC 69168-483-67; 74 mL). ${OI_483} Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: ELDER,
    productName: 'HealthA2Z Elderberry gummies, blueberry, vitamin C and zinc, 60 pieces (FP1066)',
    category: 'Vitamins',
    formulaId: ELDER,
    audience: ADULT,
    minAge: 4,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Elderberry fruit extract 30:1 (Sambucus nigra)', strength: '150 mg' },
      { name: 'Vitamin C (as ascorbic acid)', strength: '100 mg' },
      { name: 'Zinc (as zinc gluconate)', strength: '10 mg' },
    ],
    flags: ELDER_FLAGS,
    verdict: 'avoid',
    note: ELDER_NOTE,
    cite: `Brand supplement-facts tiles Elderberry_Gummy_60_ct_Back and Elderberry_Gummy_60_ct_Side on https://a2z-life.com/healtha2z-elderberry-gummy-60-ct/. ${OI_ELDER} Supplement facts per 2 gummies: elderberry fruit extract 30:1 150 mg, vitamin C 100 mg, zinc 10 mg. Ages 4+. No GTIN-12 printed on the tiles. The BigCommerce upc field is not a printed barcode pin.`,
  },
];

export const BATCH102_KYR6_HEALTHA2Z_TOKEN_BACKFILL_4: RatingRecord[] = COMPACT.map(expand);

export const BATCH102_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH102_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength, 24*40 Tablets (960 Tablets Total) (FP1083)',
    reason:
      'SKIPPED OUT. Exact pack only. The setid 3ca60fa3 inactive paragraph now maps, including `D&C Yellow 10`, `iron oxide ochre`, and `starch`. NDC 69168-318-50 on that SPL is a 50-count bottle in a carton, not 24×40 (960). The 300-count bottle is NDC 69168-318-17 and is the FPA013 row. This 960 listing is not that package. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Esomeprazole Magnesium | Acid Reducer | 20mg | Delayed-Released Capsules USP | 24 Hours | Treats Frequent Heartburn (FPA156a)',
    reason:
      'SKIPPED OUT. Exact pack only. Brand PDP drug-facts tile FPA155_FPA156_-drug_Facts now maps. `Methacrylic Acid and Ethyl Acrylate Copolymer Dispersion` is the a761f55 copolymer Caution lock. `Mono- and Di-Glycerides` is the a761f55 Caution lock. `Sugar Spheres` is the a761f55 sugar-spheres / bare-sugar Caution lock. `Pharmaceutical Ink` was already Caution pharmaceutical ink. Gelatin, hydroxypropyl cellulose, hypromellose, magnesium stearate, and triethyl citrate are Cleared. Polysorbate 80 is Moderate. Talc is High in a swallow capsule. The SKU title does not pin one count. NO Search row.',
  },
];

export const BATCH102_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH102_SKIPPED_NO_OI,
  ...BATCH102_SKIPPED_OUT,
];

export const BATCH102_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'HealthA2Z® Azelastine HCl Nasal Spray, 24-Hr Allergy, 2 Pack 240 Spray (FP1282)',
    reason:
      'REFUSED exact panel string `sodium citrate (dihydrate)`. `edetate disodium dihydrate` now maps to Caution EDTA (a761f55) and is not the block. The parentheses spelling is not `sodium citrate dihydrate`. Setid 3e2fdb0d-c2f5-41ab-b1cd-4fae80648112. NDC 69168-478-02. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-356-23 (FP0999)',
    reason:
      'REFUSED exact panel string `polyethylene glycol-400 USP`. `glycerine USP`, `povidone USP`, and `purified water USP` now map (a761f55) and are not the block. `polyethylene glycol-400 USP` is not `PEG-400 USP`. Brand drug-facts tile Day_Time_Cold_Flu_Softgels_24x8_Softgels_-_Drug_Facts. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 8 softgels (1, 3, and 6 packs)',
    reason:
      'REFUSED exact panel string `polyethylene glycol-400 USP`. Same daytime drug-facts tile as FP0999. `glycerine USP`, `povidone USP`, and `purified water USP` now map (a761f55) and are not the block. `polyethylene glycol-400 USP` is not `PEG-400 USP`. The option page is not one pinned count. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-357-29 (FP1003)',
    reason:
      'REFUSED exact panel string `polyethylene glycol-400 USP`. `glycerin USP`, `povidone USP`, `purified water USP`, and `sorbitol 70% solution USP` now map (a761f55) and are not the block. `polyethylene glycol-400 USP` is not `PEG-400 USP`. Brand nighttime drug-facts tile. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Cold-Flu Relief, 8 Softgels (1 Pack, 3 Packs & 6 Packs)',
    reason:
      'REFUSED exact panel string `polyethylene glycol-400 USP`. Same nighttime drug-facts tile as FP1003. `glycerin USP`, `povidone USP`, `purified water USP`, and `sorbitol 70% solution USP` now map (a761f55) and are not the block. `polyethylene glycol-400 USP` is not `PEG-400 USP`. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | Omeprazole 20mg | 14 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA173)',
    reason:
      'REFUSED exact panel string(s) `silicified microcrystalline cellulose`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. `methacrylic acid and ethyl acrylate copolymer dispersion` now maps to the locked copolymer Caution (a761f55) and is not the block. `silicified microcrystalline cellulose` is not `silicified MCC`. The bracketed sugar-spheres string is not `sugar spheres`. Brand drug-facts tile on the 14-tablet pack. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | Omeprazole 20mg | 42 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA174)',
    reason:
      'REFUSED exact panel string(s) `silicified microcrystalline cellulose`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. Same brand drug-facts tile as the 14-tablet pack. `methacrylic acid and ethyl acrylate copolymer dispersion` now maps and is not the block. `silicified microcrystalline cellulose` is not `silicified MCC`. The bracketed sugar-spheres string is not `sugar spheres`. NO Search row.',
  },
  {
    sku: 'HealthA2Z Apple Cider Vinegar 500mg Gummy 4g, 60 ct (FPHK1044)',
    reason:
      'REFUSED exact panel string `beta-carotene`. `natural apple flavor`, `unfiltered liquid apple cider vinegar`, and `purple carrot concentrate` now map (a761f55) and are not the block. `beta-carotene` is not `beta-carotene as color` and is not `Beta Carotene (For Color)`. Brand supplement-facts tile Apple_Cider_Ingredients. NO Search row.',
  },
];

const _ROWS = BATCH102_KYR6_HEALTHA2Z_TOKEN_BACKFILL_4;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 9) throw new Error('batch102 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 3 || _grades.avoid !== 6) {
  throw new Error('batch102 Search grade drift');
}
if (_new !== 7 || _reuse !== 2) throw new Error('batch102 NEW/REUSE drift');
if (BATCH102_SKIPPED_NO_OI.length !== 0) throw new Error('batch102 no_OI drift');
if (BATCH102_SKIPPED_OUT.length !== 2) throw new Error('batch102 OUT drift');
if (BATCH102_SKIPPED.length !== 2) throw new Error('batch102 SKIPPED drift');
if (BATCH102_REFUSED.length !== 8) throw new Error('batch102 REFUSED drift');
if (BATCH102_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch102 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch102 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch102 recordStatus must stay unverified');
}
if (_ROWS.some((r) => r.barcode)) throw new Error('batch102 must not invent a UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b102-'))) {
  throw new Error('batch102 ids must use healtha2z-b102-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch102 duplicate id');
if (_ROWS.some((r) => r.formulaId?.startsWith('healtha2z-b102-') && !_ids.has(r.formulaId))) {
  throw new Error('batch102 in-file formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch102 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch102 Clean row has a non-cleared inactive');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch102 Caution needs Limited or Moderate');
}
const _flagNames = new Set(_ROWS.flatMap((r) => r.inactiveIngredients?.map((f) => f.name) ?? []));
for (const unlocked of [
  'dibasic calcium phosphate dihydrate',
  'dicalcium phosphate dihydrate',
  'microcrystallinecellulose',
  'D&C Yellow 10',
  'iron oxide ochre',
  'starch',
  'sodium citrate dihydrate',
  'FD&C blue #1 brilliant blue lake',
  'blue 1',
  'yellow 5',
  'Malt syrup',
  'citrus pectin',
  'sodium hexametophosphate',
  'artificial blueberry flavor',
]) {
  if (!_flagNames.has(unlocked)) throw new Error(`batch102 missing an a761f55 unlock token: ${unlocked}`);
}
for (const blocked of [
  'sodium citrate (dihydrate)',
  'polyethylene glycol-400 USP',
  'silicified microcrystalline cellulose',
  'sugar spheres [which contains liquid glucose, starch (maize) and sucrose]',
  'beta-carotene',
  'glycerine USP',
  'glycerin USP',
]) {
  if (_flagNames.has(blocked)) throw new Error(`batch102 wrote a still-blocked token: ${blocked}`);
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH102_SKIPPED.map((s) => s.sku),
  ...BATCH102_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch102 excluded brand leaked');
}
