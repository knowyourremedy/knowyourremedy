// DRAFT / not verified / batch 99 KYR6 HealthA2Z leftover-token backfill 2.
// Methodology v1.6 + MAIN §5 after c6270f6 (Sept 25, 2026 HealthA2Z leftover
// maps). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. HealthA2Z only. Unlocks batch96 / batch97 / batch98 REFUSED
// packs whose every previously refused string is now an exact MAIN token,
// and whose full inactive paragraph maps to locked MAIN tokens. A panel
// that still has one unmapped string stays REFUSED with that exact string.
// Near-miss spellings stay refused (iron oxide black is not black iron
// oxide; acacia gum is not acacia; FD&C yellow # 6 aluminum lake is not
// FD&C yellow #6 aluminum lake). Day/night dual-panel stays SKIPPED OUT.
// The batch98 no_OI 59 are not hunted here.
// The pin is the DailyMed inactive paragraph those refusals named (opened
// this pass). NDC is not a UPC. No GTIN-12 on these SPLs. Empty stays empty.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Packs with the same inactive
// line share formulaId. None of these lines is already a MAIN formula row.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch98. No house Amazon. No TIME-Cap. No GoodSense.
// No toothpaste. No Sprouts. No factory. Oil form split stays as it is on main.
//
// TALLY (unverified drafts in THIS file): 18 rows —
// Clean 0 / Caution 1 / Avoid 17.
// NEW 8 / REUSE-formula 10 /
// SKIPPED 1 (no_OI 0 / OUT 1) /
// REFUSED 42.
// Search grade: Clean 0 / Caution 1 / Avoid 17.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  citric:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers). Anhydrous citric acid sits on this row.',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name.',
  flavors:
    'Methodology §5 Caution (flavor / flavors). Flavors maps here (Sept 25, 2026). Not a new grade. Distinct from Limited natural flavors. Not Avoid.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC — hypromellose family).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  macrogol:
    'Methodology §5 Moderate (PEGs). Macrogol maps here (Sept 25, 2026). Not a new grade. Not the Avoid driver.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid — exact token; locked Sept 23, 2026). Not Avoid. Not methacrylic acid copolymer.',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  paraffin:
    'Methodology §5 Caution (light liquid paraffin — paraffin / mineral-oil; locked Sept 25, 2026). Distinct from Cleared paraffin + mineral oil as a topical ointment occlusive. Not Avoid.',
  peg:
    'Methodology §5 Moderate (PEGs / polyethylene glycol). Polyethylene glylcol maps here (Sept 25, 2026). Not a new grade. Not the Avoid driver.',
  pegSpaced: 'Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  pregelHyphen:
    'Methodology §5 Cleared (pregelatinized starch). Pre-gelatinized starch is this spelling (Sept 25, 2026). Same Cleared row. Not a new grade.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  ironColor:
    'Methodology §5 Caution (iron oxide as color). Red iron oxide and yellow iron oxide map here (Sept 24, 2026). Not Avoid.',
  pgOral: 'Methodology §5 Moderate (propylene glycol, oral).',
  shellacWax:
    'Methodology §5 Caution (shellac wax — exact token; locked Sept 25, 2026). Distinct from Cleared shellac and from Cleared shellac glaze. Not Avoid.',
  silica:
    'Methodology §5 Limited (silicon dioxide / silica — 0-pt nanoparticle Caution cap). Silica is that alias. Does not by itself make Avoid.',
  silicaAnhydrous:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Colloidal anhydrous silica maps here (Sept 24, 2026). Does not by itself make Avoid.',
  simethicone:
    'Methodology §5 Caution (simethicone as an Other Ingredient — exact token; locked Sept 24, 2026). Not Avoid.',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.',
  sodiumBicarb: 'Methodology §5 Cleared (sodium bicarbonate — saline/buffer salt).',
  sodiumBenzoate: 'Methodology §5 Limited (synthetic preservatives — sodium benzoate).',
  sorbitolSpecial:
    'Methodology §5 Caution (sorbitol special — exact token; locked Sept 25, 2026). Distinct from Limited oral sorbitol and from Caution sorbitol sorbitan solution. Not Avoid.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  sss:
    'Methodology §5 Caution (sorbitol sorbitan solution — exact token; locked Sept 24, 2026). Distinct from Limited oral sorbitol. Not Avoid.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  triacetin: 'Methodology §5 Cleared (triacetin — tablet/caplet coating plasticizer). Not a grade driver.',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
  water: 'Methodology §5 Cleared (purified water / water).',
  whiteEdible:
    'Methodology §5 Caution (white edible ink — exact token; locked Sept 18, 2026). Not white ink. Not Avoid.',
  whiteInk:
    'Methodology §5 Caution (pharmaceutical ink). White ink maps here (Sept 25, 2026). Not a new grade. Distinct from Caution white edible ink. Not Avoid.',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
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
  productType: typeof OTC;
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

const ASPIRIN_DYE_FREE = 'healtha2z-b99-aspirin-81-dye-free';
const ASPIRIN_430 = 'healtha2z-b99-aspirin-81-430';
const FEXO_PARAFFIN = 'healtha2z-b99-fexo-180-paraffin';
const TUSSIN = 'healtha2z-b99-tussin-dm-sf';
const FAMOTIDINE = 'healtha2z-b99-famotidine-20-443';
const APAP_PM = 'healtha2z-b99-apap-pm-es';
const DPH_25 = 'healtha2z-b99-dph-25-softgel';
const DPH_50 = 'healtha2z-b99-dph-50-softgel';

const SET_457 = '26ad090d-7193-45c2-82eb-a2bc81955fe6';
const SET_430 = 'd9abe780-7e58-43d8-848f-c6c8893aea2e';
const SET_450 = '89ece1b5-7604-4dce-a8a6-df5b948e3cff';
const SET_477 = '7a2f8d48-3123-4c37-b238-bd7cc4242bb7';
const SET_443 = 'adc2721d-2ca7-4a47-bae1-be298fa1c155';
const SET_267 = '91ba1618-1b2e-4281-a5e1-ba7acbae8346';
const SET_431 = '9746911a-36bc-45eb-adfd-e96439d7a865';
const SET_410 = 'ec57db48-0f3a-4b12-8633-b45a4366c269';

const ASPIRIN_DYE_FREE_FLAGS: Compact['flags'] = [
  ['colloidal anhydrous silica', 'limited', 'silicaAnhydrous'],
  ['corn starch', 'cleared', 'cornStarch'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['methacrylic acid', 'limited', 'methacrylic'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polydextrose', 'limited', 'polydextrose'],
  ['polyethylene glycol', 'moderate', 'pegSpaced'],
  ['shellac wax', 'limited', 'shellacWax'],
  ['simethicone', 'limited', 'simethicone'],
  ['sodium bicarbonate', 'cleared', 'sodiumBicarb'],
  ['sodium lauryl sulfate', 'limited', 'sls'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triacetin', 'cleared', 'triacetin'],
  ['triethyl citrate', 'cleared', 'triethyl'],
];

const ASPIRIN_430_FLAGS: Compact['flags'] = [
  ['corn starch', 'cleared', 'cornStarch'],
  ['D&C yellow #10', 'high', 'dye'],
  ['FD&C yellow #6', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['methacrylic acid', 'limited', 'methacrylic'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polydextrose', 'limited', 'polydextrose'],
  ['polyethylene glycol', 'moderate', 'pegSpaced'],
  ['shellac wax', 'limited', 'shellacWax'],
  ['silica', 'limited', 'silica'],
  ['simethicone', 'limited', 'simethicone'],
  ['sodium bicarbonate', 'cleared', 'sodiumBicarb'],
  ['sodium lauryl sulfate', 'limited', 'sls'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triacetin', 'cleared', 'triacetin'],
  ['triethyl citrate', 'cleared', 'triethyl'],
];

const FEXO_PARAFFIN_FLAGS: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'silica'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['light liquid paraffin', 'limited', 'paraffin'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'pegSpaced'],
  ['polysorbate 80', 'moderate', 'ps80'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['red iron oxide', 'limited', 'ironColor'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['yellow iron oxide', 'limited', 'ironColor'],
];

const TUSSIN_FLAGS: Compact['flags'] = [
  ['anhydrous citric acid', 'cleared', 'citric'],
  ['flavors', 'limited', 'flavors'],
  ['glycerin', 'cleared', 'glycerin'],
  ['propylene glycol', 'moderate', 'pgOral'],
  ['purified water', 'cleared', 'water'],
  ['sodium benzoate', 'limited', 'sodiumBenzoate'],
  ['sucralose', 'moderate', 'sucralose'],
  ['xanthan gum', 'cleared', 'xanthan'],
];

const FAMOTIDINE_FLAGS: Compact['flags'] = [
  ['hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['macrogol', 'moderate', 'macrogol'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['pre-gelatinized starch', 'cleared', 'pregelHyphen'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triacetin', 'cleared', 'triacetin'],
];

const APAP_PM_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['FD&C blue #1 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glylcol', 'moderate', 'peg'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['silicon dioxide', 'limited', 'silica'],
  ['stearic acid', 'cleared', 'stearic'],
  ['titanium dioxide', 'high', 'tio2'],
];

const DPH_25_FLAGS: Compact['flags'] = [
  ['FD&C blue #1', 'high', 'dye'],
  ['FD&C red #40', 'high', 'dye'],
  ['gelatin', 'cleared', 'gelatin'],
  ['glycerin', 'cleared', 'glycerin'],
  ['polyethylene glycol', 'moderate', 'pegSpaced'],
  ['purified water', 'cleared', 'water'],
  ['sorbitol special', 'limited', 'sorbitolSpecial'],
  ['white edible ink', 'limited', 'whiteEdible'],
];

const DPH_50_FLAGS: Compact['flags'] = [
  ['FD&C blue #1', 'high', 'dye'],
  ['gelatin', 'cleared', 'gelatin'],
  ['glycerin', 'cleared', 'glycerin'],
  ['polyethylene glycol', 'moderate', 'pegSpaced'],
  ['purified water', 'cleared', 'water'],
  ['sorbitol sorbitan solution', 'limited', 'sss'],
  ['white ink', 'limited', 'whiteInk'],
];

const ASPIRIN_DYE_FREE_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: talc, titanium dioxide. Shellac wax is the Sept 25 Caution stamp that unlocked this panel (c6270f6). It is not Cleared shellac and not Cleared shellac glaze. Colloidal anhydrous silica is the Sept 24 silica / SiO2 map. Methacrylic acid, polydextrose, polyethylene glycol, simethicone, and sodium lauryl sulfate are Caution and are not the Avoid drivers. Adults and children 12 years and over. Under 12: do not use unless directed by a doctor.';

const ASPIRIN_430_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10, FD&C yellow #6, talc, titanium dioxide. Shellac wax is the Sept 25 Caution stamp that unlocked this panel (c6270f6). It is not Cleared shellac. Silica is the locked silicon dioxide alias. Not the dye-free 457 formula. Adults and children 12 years and over. Under 12: do not use unless directed by a doctor.';

const FEXO_PARAFFIN_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: talc, titanium dioxide. Light liquid paraffin is the Sept 25 paraffin / mineral-oil Caution stamp that unlocked this panel (c6270f6). It is not the Cleared topical ointment occlusive. Red iron oxide and yellow iron oxide are the Sept 24 iron-oxide-as-color maps. Polysorbate 80 and polyethylene glycol are Moderate and are not the Avoid drivers. Adults and children 12 years and over. Adults 65 and older: ask a doctor. Not the batch97 416 formula.';

const TUSSIN_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers: flavors, propylene glycol, sodium benzoate, sucralose. Flavors is the Sept 25 map to Caution flavor (c6270f6). It is not the Limited natural-flavors row. No High. SPL strength is dextromethorphan HBr 10 mg and guaifenesin 100 mg per 5 mL. The labeled 10 mL dose is 20 mg and 200 mg. This adult-strength liquid is not for children under 12.';

const FAMOTIDINE_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: talc, titanium dioxide. Macrogol and pre-gelatinized starch are the Sept 25 maps that unlocked this panel (c6270f6). Macrogol is PEG Moderate, not the Avoid driver. Pre-gelatinized starch is Cleared pregelatinized starch. Adults and children 12 years and over. Under 12: ask a doctor.';

const APAP_PM_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C blue #1 aluminum lake, titanium dioxide. Polyethylene glylcol is the Sept 25 PEG map that unlocked this panel (c6270f6). Not a new grade. Adults and children 12 years and over. Under 12: do not use. Stay under 4 g/day acetaminophen.';

const DPH_25_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C blue #1, FD&C red #40. Sorbitol special is the Sept 25 Caution stamp that unlocked this panel (c6270f6). White edible ink is the locked Caution token. It is not white ink. Adults and children 12 years and over. One dose is two 25 mg softgels.';

const DPH_50_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver: FD&C blue #1. White ink is the Sept 25 map to Caution pharmaceutical ink (c6270f6). It is not white edible ink. Sorbitol sorbitan solution is the Sept 24 Caution token. Adults and children 12 years and over. One softgel is 50 mg.';

const OI_457 =
  'Inactive ingredients: colloidal anhydrous silica, corn starch, hypromellose, methacrylic acid, microcrystalline cellulose, polydextrose, polyethylene glycol, shellac wax, simethicone, sodium bicarbonate, sodium lauryl sulfate, talc, titanium dioxide, triacetin, triethyl citrate.';
const OI_430 =
  'Inactive ingredients: corn starch, D&C yellow #10, FD&C yellow #6, hypromellose, methacrylic acid, microcrystalline cellulose, polydextrose, polyethylene glycol, shellac wax, silica, simethicone, sodium bicarbonate, sodium lauryl sulfate, talc, titanium dioxide, triacetin, triethyl citrate.';
const OI_450 =
  'Inactive ingredients: colloidal silicon dioxide, hypromellose, light liquid paraffin, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, pregelatinized starch, red iron oxide, sodium starch glycolate, talc, titanium dioxide and yellow iron oxide.';
const OI_477 =
  'Inactive ingredients: Anhydrous citric acid, flavors, glycerin, propylene glycol, purified water, sodium benzoate, sucralose, xanthan gum.';
const OI_443 =
  'Inactive ingredients: Hydroxypropyl cellulose, hypromellose, macrogol, magnesium stearate, microcrystalline cellulose, pre-gelatinized starch, sodium starch glycolate, talc, titanium dioxide, triacetin.';
const OI_267 =
  'Inactive ingredients: croscarmellose sodium, FD&C blue #1 aluminum lake, hypromellose, microcrystalline cellulose, polyethylene glylcol, povidone, pregelatinized starch, silicon dioxide, stearic acid, titanium dioxide.';
const OI_431 =
  'Inactive ingredients: FD&C blue #1, FD&C red #40, gelatin, glycerin, polyethylene glycol, purified water, sorbitol special, white edible ink.';
const OI_410 =
  'Inactive ingredients: FD&C blue #1, gelatin, glycerin, polyethylene glycol, purified water, sorbitol sorbitan solution, white ink.';

const COMPACT: Compact[] = [
  {
    id: ASPIRIN_DYE_FREE,
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168457980',
    upcNote:
      'UPC-A 369168457980 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z aspirin 81 mg dye-free 200-tablet bottle (FPA154) (https://a2z-life.com/healtha2z-aspirin-81-mg-dye-free-low-strength-200-counts-pain-relief-reduces-minor-aches-muscle-pain-cramps-fever-reducer-reduces-headache-nsaid/).',
    productName: 'HealthA2Z Aspirin 81 mg dye-free, 200 tablets, NDC 69168-457-98 (FPA154)',
    category: 'Pain & Fever',
    formulaId: ASPIRIN_DYE_FREE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASPIRIN_DYE_FREE_FLAGS,
    verdict: 'avoid',
    note: ASPIRIN_DYE_FREE_NOTE,
    cite: `DailyMed SPL (${DM}${SET_457}; setid ${SET_457}; NDC 69168-457-98; 200). ${OI_457} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: ASPIRIN_430,
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168430990',
    upcNote:
      'UPC-A 369168430990 is printed beside HealthA2Z aspirin 81 mg enteric coated, code FPA069, 365 tablets per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Aspirin 81 mg enteric-coated, 365 tablets, NDC 69168-430-99 (FPA069)',
    category: 'Pain & Fever',
    formulaId: ASPIRIN_430,
    audience: ADULT,
    minAge: 12,
    form: 'enteric-coated tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASPIRIN_430_FLAGS,
    verdict: 'avoid',
    note: ASPIRIN_430_NOTE,
    cite: `DailyMed SPL (${DM}${SET_430}; setid ${SET_430}; NDC 69168-430-99; 365). ${OI_430} Ages 12+. No GTIN-12 on the SPL. The 300-count on this SPL (NDC 69168-430-17) was not a refused pack and is not added.`,
  },
  {
    id: FEXO_PARAFFIN,
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168450820',
    upcNote:
      'UPC-A 369168450820 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z fexofenadine HCl 180 mg 90-caplet bottle (FPA150) (https://a2z-life.com/healtha2z-fexofenadine-hydrochloride-180mg-antihistamine-for-allergy-relief-24-hour-antihistamine-for-allergy-relief-90-counts/).',
    productName: 'HealthA2Z Fexofenadine HCl 180 mg, 90 coated caplets, NDC 69168-450-82 (FPA150)',
    category: 'Allergies',
    formulaId: FEXO_PARAFFIN,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180 mg' }],
    flags: FEXO_PARAFFIN_FLAGS,
    verdict: 'avoid',
    note: FEXO_PARAFFIN_NOTE,
    cite: `DailyMed SPL (${DM}${SET_450}; setid ${SET_450}; NDC 69168-450-82; 90). ${OI_450} Ages 12+. Adults 65 and older: ask a doctor. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-fexo-180-paraffin-180',
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168450806',
    upcNote:
      'UPC-A 369168450806 is the UPC field on the a2z-life.com page for this exact pack, Fexofenadine HCl 180 mg, 180 caplets (https://a2z-life.com/healtha2z-allergy-relief-fexofenadine-hydrochloride-180mg-180-caplets-antihistamine/).',
    productName: 'HealthA2Z Fexofenadine HCl 180 mg, 180 caplets, NDC 69168-450-80 (FPA151)',
    category: 'Allergies',
    formulaId: FEXO_PARAFFIN,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180 mg' }],
    flags: FEXO_PARAFFIN_FLAGS,
    verdict: 'avoid',
    note: `${FEXO_PARAFFIN_NOTE} Same inactive list as the 90-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_450}; setid ${SET_450}; NDC 69168-450-80; 180). Same inactive list as the 90-count, including light liquid paraffin. Ages 12+. No GTIN-12 on the SPL. The 30-count and 120-count on this SPL were not refused packs and are not added.`,
  },
  {
    id: TUSSIN,
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168477667',
    upcNote:
      'UPC-A 369168477667 is the UPC field on the a2z-life.com page for this 8 fl oz sugar-free tussin, SKU FPA184 (https://a2z-life.com/healtha2z-tussin-dm-sugar-free-dextromethorphan-hbr-20mg-guaifenesin-200mg-cough-suppressant-expectorant-for-adults-with-high-blood-pressure-diabetes-8-fl-oz-raspberry-flavor/). The description states dextromethorphan HBr 10 mg and guaifenesin 100 mg.',
    productName:
      'HealthA2Z Tussin DM sugar-free, dextromethorphan HBr 10 mg and guaifenesin 100 mg per 5 mL, 8 fl oz (237 mL), NDC 69168-477-66 (FPA184)',
    category: 'Cold & Flu',
    formulaId: TUSSIN,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '10 mg/5 mL' },
      { name: 'Guaifenesin', strength: '100 mg/5 mL' },
    ],
    flags: TUSSIN_FLAGS,
    verdict: 'caution',
    note: TUSSIN_NOTE,
    cite: `DailyMed SPL (${DM}${SET_477}; setid ${SET_477}; NDC 69168-477-66; 237 mL). ${OI_477} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: FAMOTIDINE,
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168443327',
    upcNote:
      'UPC-A 369168443327 is the UPC field on the a2z-life.com page for this exact pack, Famotidine 20 mg, 100 tablets (https://a2z-life.com/healtha2z-acid-reducer-100-tablets-famotidine-20mg-maximum-strength-relief-from-heart-burn-due-to-acid-indigestion/).',
    productName: 'HealthA2Z Famotidine 20 mg, 100 tablets, NDC 69168-443-32 (FPA124)',
    category: 'Digestive',
    formulaId: FAMOTIDINE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '20 mg' }],
    flags: FAMOTIDINE_FLAGS,
    verdict: 'avoid',
    note: FAMOTIDINE_NOTE,
    cite: `DailyMed SPL (${DM}${SET_443}; setid ${SET_443}; NDC 69168-443-32; 100). ${OI_443} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-famotidine-20-443-225',
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168443525',
    upcNote:
      'UPC-A 369168443525 is the UPC field on the a2z-life.com page for this exact pack, Famotidine 20 mg, 225 tablets (https://a2z-life.com/healtha2z-acid-reducer-225-tablets-famotidine-20mg-maximum-strength-relief-from-heart-burn-due-to-acid-indigestion/).',
    productName: 'HealthA2Z Famotidine 20 mg, 225 tablets, NDC 69168-443-52 (FPA125)',
    category: 'Digestive',
    formulaId: FAMOTIDINE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '20 mg' }],
    flags: FAMOTIDINE_FLAGS,
    verdict: 'avoid',
    note: `${FAMOTIDINE_NOTE} Same inactive list as the 100-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_443}; setid ${SET_443}; NDC 69168-443-52; 225). Same inactive list as the 100-count, including macrogol and pre-gelatinized starch. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-famotidine-20-443-365',
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168443990',
    upcNote:
      'UPC-A 369168443990 is the UPC field on the a2z-life.com page for this exact pack, Famotidine 20 mg, 365 tablets (https://a2z-life.com/healtha2z-acid-reducer-famotidine-20mg-365-count-maximum-strength-relief-from-heart-burn-due-to-acid-indigestion/).',
    productName: 'HealthA2Z Famotidine 20 mg, 365 tablets, NDC 69168-443-99 (FPA161)',
    category: 'Digestive',
    formulaId: FAMOTIDINE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '20 mg' }],
    flags: FAMOTIDINE_FLAGS,
    verdict: 'avoid',
    note: `${FAMOTIDINE_NOTE} Same inactive list as the 100-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_443}; setid ${SET_443}; NDC 69168-443-99; 365). Same inactive list as the 100-count, including macrogol and pre-gelatinized starch. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-famotidine-20-443-50x24',
    productName: 'HealthA2Z Famotidine 20 mg, 24 packs of 50 tablets (1,200), NDC 69168-443-50 (FP1205)',
    category: 'Digestive',
    formulaId: FAMOTIDINE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '20 mg' }],
    flags: FAMOTIDINE_FLAGS,
    verdict: 'avoid',
    note: `${FAMOTIDINE_NOTE} Same inactive list as the 100-count, so they share formulaId. The 50-count bottle sits in carton NDC 69168-443-50.`,
    cite: `DailyMed SPL (${DM}${SET_443}; setid ${SET_443}; NDC 69168-443-50; carton of the 50-count). Same inactive list as the 100-count, including macrogol and pre-gelatinized starch. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-famotidine-20-443-10x24',
    productName: 'HealthA2Z Famotidine 20 mg, 24 packs of 10 tablets (240), NDC 69168-443-09 (FP1197)',
    category: 'Digestive',
    formulaId: FAMOTIDINE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '20 mg' }],
    flags: FAMOTIDINE_FLAGS,
    verdict: 'avoid',
    note: `${FAMOTIDINE_NOTE} Same inactive list as the 100-count, so they share formulaId. NDC 69168-443-09 is the 10-count blister.`,
    cite: `DailyMed SPL (${DM}${SET_443}; setid ${SET_443}; NDC 69168-443-09; 10). Same inactive list as the 100-count, including macrogol and pre-gelatinized starch. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: APAP_PM,
    // KYR5-d — zbar on DailyMed 267_393---health-a2z-pain-relief-pm-1.jpg.
    barcode: '369168267992',
    upcNote:
      'UPC-A 369168267992 is the code under the bars on DailyMed image 267_393---health-a2z-pain-relief-pm-1.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=423a8445-964c-4cdb-889a-f391ca5253e7&name=267_393---health-a2z-pain-relief-pm-1.jpg).',
    productName:
      'HealthA2Z Extra Strength Pain Relief PM, acetaminophen 500 mg and diphenhydramine HCl 25 mg, 365 caplets, NDC 69168-267-99 (FPA004)',
    category: 'Pain & Fever',
    formulaId: APAP_PM,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '500 mg' },
      { name: 'Diphenhydramine HCl', strength: '25 mg' },
    ],
    flags: APAP_PM_FLAGS,
    verdict: 'avoid',
    note: APAP_PM_NOTE,
    cite: `DailyMed SPL (${DM}${SET_267}; setid ${SET_267}; NDC 69168-267-99; 365). ${OI_267} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-apap-pm-es-150',
    productName:
      'HealthA2Z Extra Strength Pain Relief PM, acetaminophen 500 mg and diphenhydramine HCl 25 mg, 150 caplets, NDC 69168-267-02 (FPA061)',
    category: 'Pain & Fever',
    formulaId: APAP_PM,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '500 mg' },
      { name: 'Diphenhydramine HCl', strength: '25 mg' },
    ],
    flags: APAP_PM_FLAGS,
    verdict: 'avoid',
    note: `${APAP_PM_NOTE} Same inactive list as the 365-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_267}; setid ${SET_267}; NDC 69168-267-02; 150). Same inactive list as the 365-count, including polyethylene glylcol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: DPH_25,
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168431966',
    upcNote:
      'UPC-A 369168431966 is printed beside HealthA2Z diphenhydramine HCl 25 mg nighttime sleep aid, code FPA072, 96 softgels per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Diphenhydramine HCl 25 mg nighttime sleep softgels, 96 count, NDC 69168-431-96 (FPA072)',
    category: 'Sleep',
    formulaId: DPH_25,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_25_FLAGS,
    verdict: 'avoid',
    note: DPH_25_NOTE,
    cite: `DailyMed SPL (${DM}${SET_431}; setid ${SET_431}; NDC 69168-431-96; 96). ${OI_431} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-dph-25-softgel-250',
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168431034',
    upcNote:
      'UPC-A 369168431034 is the UPC field on the a2z-life.com page for this exact pack, Diphenhydramine HCl 25 mg nighttime sleep softgels, 250 count (https://a2z-life.com/healtha2z-nighttime-sleep-aid-250-softgels/).',
    productName: 'HealthA2Z Diphenhydramine HCl 25 mg nighttime sleep softgels, 250 count, NDC 69168-431-03 (FPA103)',
    category: 'Sleep',
    formulaId: DPH_25,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_25_FLAGS,
    verdict: 'avoid',
    note: `${DPH_25_NOTE} Same inactive list as the 96-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_431}; setid ${SET_431}; NDC 69168-431-03; 250). Same inactive list as the 96-count, including sorbitol special. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-dph-25-softgel-12x24',
    productName:
      'HealthA2Z Diphenhydramine HCl 25 mg nighttime sleep softgels, 24 packs of 12 (288), NDC 69168-431-86 (FP1081)',
    category: 'Sleep',
    formulaId: DPH_25,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_25_FLAGS,
    verdict: 'avoid',
    note: `${DPH_25_NOTE} Same inactive list as the 96-count, so they share formulaId. NDC 69168-431-86 is the 12-count blister carton.`,
    cite: `DailyMed SPL (${DM}${SET_431}; setid ${SET_431}; NDC 69168-431-86; 12). Same inactive list as the 96-count, including sorbitol special. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: DPH_50,
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168410985',
    upcNote:
      'UPC-A 369168410985 is the UPC field on the a2z-life.com page for this exact pack, Diphenhydramine HCl 50 mg sleep softgels, 200 count (https://a2z-life.com/healtha2z-sleep-aid-diphenhydramine-50mg-200-softgels-supports-deeper-restful-sleeping/).',
    productName: 'HealthA2Z Diphenhydramine HCl 50 mg sleep softgels, 200 count, NDC 69168-410-98 (FPA172)',
    category: 'Sleep',
    formulaId: DPH_50,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50 mg' }],
    flags: DPH_50_FLAGS,
    verdict: 'avoid',
    note: DPH_50_NOTE,
    cite: `DailyMed SPL (${DM}${SET_410}; setid ${SET_410}; NDC 69168-410-98; 200). ${OI_410} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b99-dph-50-softgel-250',
    productName: 'HealthA2Z Diphenhydramine HCl 50 mg sleep softgels, 250 count, NDC 69168-410-03 (FPA028/FP1082)',
    category: 'Sleep',
    formulaId: DPH_50,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50 mg' }],
    flags: DPH_50_FLAGS,
    verdict: 'avoid',
    note: `${DPH_50_NOTE} Same inactive list as the 200-count, so they share formulaId. The batch96 brand tile (SleepAid_50mg_250_Softgels_-_Drug_Facts) prints this same line. NDC 69168-410-03 is the 250-count on that SPL.`,
    cite: `DailyMed SPL (${DM}${SET_410}; setid ${SET_410}; NDC 69168-410-03; 250). Same inactive list as the 200-count, including white ink. The batch96 refusal named that brand drug-facts tile. The barcode that refusal called the naproxen carton is not attached. No GTIN-12 on the SPL. Ages 12+.`,
  },
  {
    id: 'healtha2z-b99-dph-50-softgel-10x24',
    productName:
      'HealthA2Z Diphenhydramine HCl 50 mg sleep softgels, 24 packs of 10 (240), NDC 69168-410-09 (FP0980)',
    category: 'Sleep',
    formulaId: DPH_50,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50 mg' }],
    flags: DPH_50_FLAGS,
    verdict: 'avoid',
    note: `${DPH_50_NOTE} Same inactive list as the 200-count, so they share formulaId. NDC 69168-410-09 is the 10-count carton.`,
    cite: `DailyMed SPL (${DM}${SET_410}; setid ${SET_410}; NDC 69168-410-09; 10). Same inactive list as the 200-count, including white ink. Ages 12+. No GTIN-12 on the SPL.`,
  },
];

export const BATCH99_KYR6_HEALTHA2Z_TOKEN_BACKFILL_2: RatingRecord[] = COMPACT.map(expand);

export const BATCH99_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH99_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'HealthA2Z® Daytime and Nighttime Combo Pack | Cold & Flu Medicine | Powerful Multi-Symptom Daytime and Nighttime Relief | 36 Count | 24 Daytime | 12 Nighttime Softgels (FPA106)',
    reason:
      'SKIPPED OUT. Dual panel. DailyMed setid fa7ed5db- prints two inactive lists on this one pack (daytime and nighttime). Not one pinned list. Day/night dual-panel stays no-row. Already SKIPPED OUT in batch97. NO Search row.',
  },
];

export const BATCH99_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH99_SKIPPED_NO_OI,
  ...BATCH99_SKIPPED_OUT,
];

export const BATCH99_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'HealthA2Z® Sleep Aid | Doxylamine Succinate 25mg | (200 Counts) (FPA122)',
    reason:
      'REFUSED exact panel string(s) `dibasic calcium phosphate dihydrate`, `microcrystallinecellulose`. Setid 3761182c-275b-40f3-a262-9ef5f5a80723. NDC 69168-439-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength,300 Tablets, Enteric Coated Compare to Bayer Active Ingredients (FPA013)',
    reason:
      'REFUSED exact panel string(s) `D&C Yellow 10`, `iron oxide ochre`, `starch`. `anhydrous lactose` already maps to Cleared lactose. Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-17. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength, 24*40 Tablets (960 Tablets Total) (FP1083)',
    reason:
      'REFUSED exact panel string(s) `D&C Yellow 10`, `iron oxide ochre`, `starch`. Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-50. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg NSAID, Compare to Bayer Active Ingredients, 36 Chewable Tablets, (1 Pack, 3 Packs & 6 Packs) (FPA035E)',
    reason:
      'REFUSED exact panel string(s) `orange flavor`, `saccharin sodium`. `dextrates` now maps to Caution dextrates (Sept 25). `orange flavor` is not `flavor` or `flavors`. `saccharin sodium` is not `sodium saccharin`. Setid 92b8637b-03a9-461f-b2f6-6eddaa214953. NDC 69168-288-36. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg NSAID, 24*36 Chewable Tablets (864 Tablets Total) (FP0545)',
    reason:
      'REFUSED exact panel string(s) `orange flavor`, `saccharin sodium`. Setid 92b8637b-03a9-461f-b2f6-6eddaa214953. NDC 69168-288-36. NO Search row.',
  },
  {
    sku: 'HealthA2Z Fexofenadine Hydrochloride 60mg | 200 Count Coated Caplets | 12-Hour Antihistamine for Allergy Relief (FPA086)',
    reason:
      'REFUSED exact panel string `iron oxide black`. `ironoxide yellow` now maps to Caution iron oxide as color (Sept 25). `polyethyleneglycol` already maps to PEG. `iron oxide black` is not `black iron oxide`. Setid 219606a8-9a3e-4c30-adb1-984f3f4e72c7. NDC 69168-437-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Fexofenadine Hydrochloride 60mg | Antihistamine | Allergy Relief | 120 Count Caplets | Indoor/Outdoor Relief | 12 Hours (FPA099)',
    reason:
      'REFUSED exact panel string `iron oxide black`. Setid 219606a8-9a3e-4c30-adb1-984f3f4e72c7. NDC 69168-437-06. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Azelastine HCl Nasal Spray, 24-Hr Allergy, 2 Pack 240 Spray (FP1282)',
    reason:
      'REFUSED exact panel string(s) `edetate disodium dihydrate`, `sodium citrate (dihydrate)`. Setid 3e2fdb0d-c2f5-41ab-b1cd-4fae80648112. NDC 69168-478-02. NO Search row.',
  },
  {
    sku: "HealthA2Z® Woman's Gentle Laxative | Bisacodyl Stimulant Laxative 5mg | (150 Tablets) (FPA129)",
    reason:
      'REFUSED exact panel string `FD&C yellow # 6 aluminum lake`. `lactose anhydrous` now maps to Cleared lactose (Sept 25). The spaced `# 6` spelling is not `FD&C yellow #6 aluminum lake`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-02. NO Search row.',
  },
  {
    sku: "HealthA2Z Woman's Gentle Laxative, Bisacodyl Stimulant Laxative 5mg, 1 Pack of 25 Tablets (1 Pack, 3 Packs& 6 Packs) (FP0886A)",
    reason:
      'REFUSED exact panel string `FD&C yellow # 6 aluminum lake`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-92. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Woman’s Gentle Laxative | Bisacodyl 5mg Stimulant Laxative | Gentle, Reliable Constipation Relief | Overnight Support | 24 Packs of 25 Tablets (600 Tablets Total) | Value Pack (FP0886)',
    reason:
      'REFUSED exact panel string `FD&C yellow # 6 aluminum lake`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-92. NO Search row.',
  },
  {
    sku: "HealthA2Z® Woman's Gentle Laxative | Bisacodyl Stimulant Laxative 5mg | 250 Tablets | Constipation Relief | Gentle and Reliable | Overnight Relief (FPA167)",
    reason:
      'REFUSED exact panel string `FD&C yellow # 6 aluminum lake`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-03. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief | 100 Chewable Tablets (FPA102)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `peppermint flavor`. `dextrates` now maps to Caution dextrates (Sept 25). `acacia gum` is not `acacia`. `peppermint flavor` is not `flavor` or `flavors`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-32. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief | (200 Count) (FP1345)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z Bismuth, Bismuth Subsalicylate 262mg, 24*12 Chewable Tablets (288 Tablets Total) (FP0528)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-69. NO Search row.',
  },
  {
    sku: "HealthA2Z® Children's Allergy Relief | DYE Free | Diphenhyrdramine 12.5 mg | 5ml Oral Solution | 8Fl Oz (237 mL) | Antihistamine | Clear Bubble Gum Flavored | Alcohol and Sugar Free (FPA164)",
    reason:
      'REFUSED exact panel string `sodium citrate dihydrate`. Setid cb6df361-b8e5-4e2f-945f-c20159d76c4f. NDC 69168-471-59. NO Search row.',
  },
  {
    sku: 'HealthA2Z Calcium Antacid 500mg, Regular Strength, 150 Tablets (FP0535)',
    reason:
      'REFUSED exact panel string `assorted flavors`. `assorted flavors` is not `flavors`. Setid 551d6135-2650-4c27-a20d-d56a9aba7b71. NDC 69168-219-02. NO Search row.',
  },
  {
    sku: 'HealthA2Z Anti-Diarrheal Loperamide HCI 2mg 12 Caplets (1 Pack, 3 Packs & 6 Packs) (FP0697)',
    reason:
      'REFUSED exact panel string(s) `dicalcium phosphate dihydrate`, `FD&C blue #1 brilliant blue lake`. Setid aca3742c-2a82-4e91-8aaf-2fce08487e56. NDC 69168-248-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z Stool Softener, Docusate Sodium 100mg, 100 capsules (FPA059)',
    reason:
      'REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`. `sorbitol special` now maps to Caution sorbitol special (Sept 25). `black edible ink` is not `white edible ink` or `pharmaceutical ink`. `FD&Cyellow #6` is not `FD&C yellow #6`. Setid 30c9ff75-cee4-4632-86fd-acfdf5ee85af. NDC 69168-420-01. NO Search row.',
  },
  {
    sku: 'HealthA2Z Motion Sickness Relief 50mg, 24*12 Tablets (288 Tablets Total) (FP0944)',
    reason:
      'REFUSED exact panel string `dibasic calcium phosphate dihydrate`. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z Motion Sickness Relief 50mg (1 Pack, 3 Packs & 6 Packs) (FPA027E)',
    reason:
      'REFUSED exact panel string `dibasic calcium phosphate dihydrate`. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Laxative Bisacodyl 5mg | 100 Counts | (FPA094)',
    reason:
      'REFUSED exact panel string `iron oxide black`. `lactose anhydrous` now maps to Cleared lactose (Sept 25). `iron oxide black` is not `black iron oxide`. Setid 51f1c6c0-770c-4426-820b-bc1f42e143fd. NDC 69168-404-32. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Cold Roll-On | Pain Relieving Gel | Menthol 4% External Analgesic | 2.5 OZ | 74 mL | Temporary Relieves Minor Aches and Pains of Muscle (FPA183)',
    reason:
      'REFUSED exact panel string(s) `blue 1`, `yellow 5`. Setid 36463acb-7c28-416f-a45f-a93f0be5692b. NDC 69168-483-67. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-356-23 (FP0999)',
    reason:
      'REFUSED exact panel string(s) `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`. The USP suffix is not the locked bare token. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 8 softgels (1, 3, and 6 packs)',
    reason:
      'REFUSED exact panel string(s) `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`. The option page is not one pinned count. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-357-29 (FP1003)',
    reason:
      'REFUSED exact panel string(s) `glycerin USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`, `sorbitol 70% solution USP`. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | Omeprazole 20mg | 14 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA173)',
    reason:
      'REFUSED exact panel string(s) `methacrylic acid and ethyl acrylate copolymer dispersion`, `silicified microcrystalline cellulose`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. `sodium stearyl fumarate` is the locked Sodium Stearyl Fumarate row. Brand PDP drug-facts tile on the 14-tablet omeprazole pack. The DailyMed 476 inactive paragraph is a different list and was not used. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | Omeprazole 20mg | 42 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA174)',
    reason:
      'REFUSED exact panel string(s) `methacrylic acid and ethyl acrylate copolymer dispersion`, `silicified microcrystalline cellulose`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. Same brand drug-facts tile as the 14-tablet pack. NO Search row.',
  },
  {
    sku: 'HealthA2Z Ibuprofen, 10 liquid filled capsules (1 Pack, 3 Packs & 6 Packs) (FP0660)',
    reason:
      'REFUSED exact panel string `sorbitol sorbitan`. `potassium hydroxide` and `sorbitan monooleate` now map (Sept 25). `sorbitol sorbitan` is not `sorbitol sorbitan solution`. Setid 8ba06ba0. NO Search row.',
  },
  {
    sku: 'HealthA2Z Apple Cider Vinegar 500mg Gummy 4g, 60 ct (FPHK1044)',
    reason:
      'REFUSED exact panel string(s) `natural apple flavor`, `unfiltered liquid apple cider vinegar`, `purple carrot concentrate`, `beta-carotene`. `pectin` on that tile is the gum row. Those four strings are not the Sept 25 stamps. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Calcium Antacid | 750mg Extra Strength | Relief from Sour & Upset Stomach, Acid Indigestion | 24 Packs of 96 Chewable Tablets (2,304 Tablets Total) | Value Pack | Assorted Berry Flavors (FP0938V)',
    reason:
      'REFUSED exact panel string `assorted flavors`. Setid 51dd53e8-22ff-4967-9124-f15c3986e4dd. NDC 69168-229-96. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Stool Softener, Docusate Sodium 100mg, 100 Capsules (FPA002)',
    reason:
      'REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`. Same line as refused FPA059. Setid 30c9ff75. NDC 69168-420-01. NO Search row.',
  },
  {
    sku: 'HealthA2Z Stool Softener | Docusate Sodium 100mg | 24 Pack of 30 Capsules | Value Package | 720 Softgels in Total (FP1024)',
    reason:
      'REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`. Setid 30c9ff75-cee4-4632-86fd-acfdf5ee85af. NDC 69168-420-30. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Cold-Flu Relief, 8 Softgels (1 Pack, 3 Packs & 6 Packs)',
    reason:
      'REFUSED exact panel string(s) `gelatin USP`, `glycerin USP`, `polyethylene glycol-400 USP`, `povidone USP`, `propylene glycol USP`, `purified water USP`, `sorbitol 70% solution USP`, `sorbitol sorbitan solution USP`. This option page is the 8-softgel inner unit, not one new locked list. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief for Nausea, Upset Stomach & Diarrhea | 24 Pack of 30 Chewable Tablets (720 Tablets Total) | Value Pack (FP0529V)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `peppermint flavor`. Setid 015ca07a. NDC 69168-046-88. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Ibuprofen Softgel 200mg | 24 Packs of 30 Softgels Each (720 Softgels Total) | Value Pack | NSAID Pain Reliever & Fever Reducer (FP0706)',
    reason:
      'REFUSED exact panel string `sorbitol sorbitan`. Setid 8ba06ba0-bfe9-4626-af65-dae4d6a3a2ad. NDC 69168-368-30. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Esomeprazole Magnesium | Acid Reducer | 20mg | Delayed-Released Capsules USP | 24 Hours | Treats Frequent Heartburn (FPA156a)',
    reason:
      'REFUSED exact panel string(s) `Methacrylic Acid and Ethyl Acrylate Copolymer Dispersion`, `Mono- and Di-Glycerides`, `Sugar Spheres`. `Pharmaceutical Ink` already maps to Caution pharmaceutical ink. The SKU title does not pin one count. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Ibuprofen Softgel 200mg | 24 Packs of 10 Softgels Each (240 Softgels Total) | Value Pack | NSAID Pain Reliever & Fever Reducer (FP0660V)',
    reason:
      'REFUSED exact panel string `sorbitol sorbitan`. Setid 8ba06ba0-bfe9-4626-af65-dae4d6a3a2ad. NDC 69168-368-07. NO Search row.',
  },
  {
    sku: 'HealthA2Z Stool Softener, Docusate Sodium 100mg, 30 Capsules (1 Pack, 3 Packs & 6 Packs) (FP1024/FP0567)',
    reason:
      'REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`. The 30-capsule option page is the inner unit of NDC 69168-420-30. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Blueberry Flavored Elderberry Gummies | 60 Pieces | With Vitamin C & Zinc | Supports Immune Function | Packed with Antioxidants (FP1066)',
    reason:
      'REFUSED exact panel string(s) `Malt syrup`, `citrus pectin`, `sodium hexametophosphate`, `artificial blueberry flavor`. `citrus pectin` is not `pectin`. `Malt syrup` is not barley malt syrup. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Anti-Diarrheal | Loperamide HCl 2mg | Controls Symptoms of Diarrhea, Including Travelers’ Diarrhea | 24 Packs of 12 Caplets (288 Caplets Total) | Value Pack (FP0697A)',
    reason:
      'REFUSED exact panel string(s) `dicalcium phosphate dihydrate`, `FD&C blue #1 brilliant blue lake`. Setid aca3742c-2a82-4e91-8aaf-2fce08487e56. NDC 69168-248-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z Bismuth Subsalicylate 262 mg, 30 Tablets (FP0529)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-88. NO Search row.',
  },
];

const _ROWS = BATCH99_KYR6_HEALTHA2Z_TOKEN_BACKFILL_2;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 18) throw new Error('batch99 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 1 || _grades.avoid !== 17) {
  throw new Error('batch99 Search grade drift');
}
if (_new !== 8 || _reuse !== 10) throw new Error('batch99 NEW/REUSE drift');
if (BATCH99_SKIPPED_NO_OI.length !== 0) throw new Error('batch99 no_OI drift');
if (BATCH99_SKIPPED_OUT.length !== 1) throw new Error('batch99 OUT drift');
if (BATCH99_SKIPPED.length !== 1) throw new Error('batch99 SKIPPED drift');
if (BATCH99_REFUSED.length !== 42) throw new Error('batch99 REFUSED drift');
if (BATCH99_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch99 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch99 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch99 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'healtha2z-b99-apap-pm-es': '369168267992',
  'healtha2z-b99-aspirin-81-430': '369168430990',
  'healtha2z-b99-aspirin-81-dye-free': '369168457980',
  'healtha2z-b99-dph-25-softgel': '369168431966',
  'healtha2z-b99-dph-25-softgel-250': '369168431034',
  'healtha2z-b99-dph-50-softgel': '369168410985',
  'healtha2z-b99-famotidine-20-443': '369168443327',
  'healtha2z-b99-famotidine-20-443-225': '369168443525',
  'healtha2z-b99-famotidine-20-443-365': '369168443990',
  'healtha2z-b99-fexo-180-paraffin': '369168450820',
  'healtha2z-b99-fexo-180-paraffin-180': '369168450806',
  'healtha2z-b99-tussin-dm-sf': '369168477667',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 12) throw new Error('batch99 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch99 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch99 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch99 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch99 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b99-'))) {
  throw new Error('batch99 ids must use healtha2z-b99-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch99 duplicate id');
if (_ROWS.some((r) => r.formulaId?.startsWith('healtha2z-b99-') && !_ids.has(r.formulaId))) {
  throw new Error('batch99 in-file formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch99 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch99 Clean row has a non-cleared inactive');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch99 Caution needs Limited or Moderate');
}
if (!BATCH99_SKIPPED_OUT.some((s) => s.sku.includes('FPA106'))) {
  throw new Error('batch99 day/night combo must stay OUT');
}
const _flagNames = new Set(_ROWS.flatMap((r) => r.inactiveIngredients?.map((f) => f.name) ?? []));
for (const blocked of [
  'iron oxide black',
  'D&C Yellow 10',
  'iron oxide ochre',
  'orange flavor',
  'saccharin sodium',
  'acacia gum',
  'peppermint flavor',
  'assorted flavors',
  'sorbitol sorbitan',
  'black edible ink',
  'FD&Cyellow #6',
  'FD&C yellow # 6 aluminum lake',
  'blue 1',
  'yellow 5',
  'glycerine USP',
  'citrus pectin',
]) {
  if (_flagNames.has(blocked)) throw new Error(`batch99 wrote a still-blocked token: ${blocked}`);
}
if (!_flagNames.has('shellac wax') || !_flagNames.has('light liquid paraffin') || !_flagNames.has('white ink')) {
  throw new Error('batch99 missing a Sept 25 unlock token');
}
if (!_flagNames.has('macrogol') || !_flagNames.has('pre-gelatinized starch') || !_flagNames.has('flavors')) {
  throw new Error('batch99 missing a Sept 25 map token');
}
if (!_flagNames.has('polyethylene glylcol') || !_flagNames.has('sorbitol special')) {
  throw new Error('batch99 missing a Sept 25 spelling');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH99_SKIPPED.map((s) => s.sku),
  ...BATCH99_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch99 excluded brand leaked');
}
