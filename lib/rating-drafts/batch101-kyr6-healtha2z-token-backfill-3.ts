// DRAFT / not verified / batch 101 KYR6 HealthA2Z leftover-token backfill 3.
// Methodology v1.6 + MAIN §5 after 8e480c3 (Sept 25, 2026 HealthA2Z alias
// families). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. HealthA2Z only. Unlocks batch96 / batch97 / batch98 / batch99 /
// batch100 REFUSED packs whose blocking string is now an exact alias on
// 8e480c3, and whose full inactive paragraph maps to locked MAIN tokens.
// A panel that still has one unmapped string stays REFUSED with that exact
// string. Near-miss spellings stay refused. Day/night dual-panel stays
// no-row (already SKIPPED OUT in batch99; not re-listed). The batch100
// no_OI 46 are not hunted here.
// The pin is the DailyMed inactive paragraph those refusals named (re-opened
// this pass). NDC is not a UPC. No GTIN-12 on these SPLs. A section-id
// fragment on setid 51dd53e8 is not a barcode. Empty stays empty.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Packs with the same inactive
// line share formulaId. None of these lines is already a MAIN formula row.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch100. No house Amazon. No TIME-Cap. No GoodSense.
// No toothpaste. No Sprouts. No factory. Oil form split stays as it is on main.
//
// TALLY (unverified drafts in THIS file): 26 rows —
// Clean 0 / Caution 0 / Avoid 26.
// NEW 9 / REUSE-formula 17 /
// SKIPPED 0 (no_OI 0 / OUT 0) /
// REFUSED 19.
// Search grade: Clean 0 / Caution 0 / Avoid 26.
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
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  acacia: 'Methodology §5 Cleared (acacia / gum arabic).',
  acaciaGum:
    'Methodology §5 Cleared (acacia / gum arabic). Acacia gum maps here (Sept 25, 2026, 8e480c3). Same Cleared lock. Not Caution. Not a new grade.',
  ammonium:
    'Methodology §5 Caution (ammonium hydroxide — exact token). Not Avoid.',
  aspartame: 'Methodology §5 High (aspartame). Locked Avoid.',
  blackInk:
    'Methodology §5 Caution (pharmaceutical ink). Black edible ink maps here (Sept 25, 2026, 8e480c3). Not a new grade. Distinct from Caution edible ink and white edible ink. Not Avoid.',
  calciumCarb: 'Methodology §5 Cleared (calcium carbonate — mineral filler).',
  carnauba: 'Methodology §5 Cleared (carnauba wax).',
  citric:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dextrates:
    'Methodology §5 Caution (dextrates — bare token; locked Sept 25, 2026). Distinct from Cleared dextrates hydrated. Not Avoid.',
  dextrose:
    'Methodology §5 Cleared (dextrose as a sweetener). Distinct from Caution organic cultured dextrose.',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name. Green 3 sits on this row.',
  dyeYellow6Spaced:
    'Methodology §5 High (Yellow 6 / synthetic dyes). FD&C yellow # 6 aluminum lake maps here (Sept 25, 2026, 8e480c3). Not a new grade.',
  dyeYellow6Join:
    'Methodology §5 High (Yellow 6 / synthetic dyes). FD&Cyellow #6 maps here (Sept 25, 2026, 8e480c3). Not a new grade. The SPL line break joins FD&C and yellow #6.',
  flavorOrange:
    'Methodology §5 Caution (flavor). Orange flavor maps here (Sept 25, 2026, 8e480c3). Alias the family. Distinct from Limited natural flavors. Not Avoid.',
  flavorPeppermint:
    'Methodology §5 Caution (flavor). Peppermint flavor maps here (Sept 25, 2026, 8e480c3). Alias the family. Distinct from Limited natural flavors. Not Avoid.',
  flavorAssorted:
    'Methodology §5 Caution (flavor). Assorted flavors maps here (Sept 25, 2026, 8e480c3). Alias the family. Distinct from Limited natural flavors. Not Avoid.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  ironBlack:
    'Methodology §5 Caution (iron oxide as color). Iron oxide black maps here (Sept 25, 2026, 8e480c3). Alias the family. Not Avoid.',
  ironRed:
    'Methodology §5 Caution (iron oxide red — exact token; locked Sept 15, 2026). Not Avoid.',
  ironoxideYellow:
    'Methodology §5 Caution (iron oxide yellow / ferric oxide yellow). Ironoxide yellow maps here (Sept 25, 2026). Not a new grade. The SPL line break joins iron and oxide yellow. Not Avoid.',
  koh:
    'Methodology §5 Caution (potassium hydroxide — exact token; locked Sept 25, 2026). Distinct from Cleared sodium hydroxide. Not Avoid.',
  lactoseAnh:
    'Methodology §5 Cleared (lactose / lactose monohydrate). Lactose anhydrous is that spelling (Sept 25, 2026). Not a new grade.',
  lactoseMh: 'Methodology §5 Cleared (lactose monohydrate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mct:
    'Methodology §5 Cleared (medium chain triglycerides named as softgel fill). Not unlabeled MCT. Not an oil-bottle grade. Not gummy High. Seed/industrial oils are flagged in gummies. In this softgel fill they are not that High rule.',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  paraben:
    'Methodology §5 High (parabens — methylparaben and propylparaben, every form).',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.',
  pegJoin:
    'Methodology §5 Moderate (PEGs). Polyethyleneglycol maps here (Sept 24, 2026). Not a new grade. The SPL line break joins polyethylene and glycol. Not the Avoid driver.',
  pgOral: 'Methodology §5 Moderate (propylene glycol, oral). Not the Avoid driver.',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  pvap:
    'Methodology §5 Caution (polyvinyl acetate phthalate). Polyvinyl acetate pthalate is that spelling (Sept 24, 2026). Same Caution. Not a new grade. Not Avoid.',
  saccharin:
    'Methodology §5 Caution (sodium saccharin). Saccharin sodium maps here (Sept 25, 2026, 8e480c3). Same token. Not a new grade. Not Avoid.',
  shellac: 'Methodology §5 Cleared (shellac). Distinct from Caution shellac wax.',
  shellacGlaze:
    'Methodology §5 Cleared (shellac). Shellac glaze maps here (Sept 24, 2026). Not a new grade. Distinct from Caution shellac wax.',
  silica:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  silicaAnhydrous:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Colloidal anhydrous silica maps here (Sept 24, 2026). Does not by itself make Avoid.',
  simethicone:
    'Methodology §5 Caution (simethicone as an Other Ingredient — exact token; locked Sept 24, 2026). Not Avoid.',
  sodiumAlginate: 'Methodology §5 Cleared (sodium alginate — alginic family).',
  sodiumBenzoate: 'Methodology §5 Limited (synthetic preservatives — sodium benzoate).',
  sodiumBicarb: 'Methodology §5 Cleared (sodium bicarbonate — saline/buffer salt).',
  sorbitan:
    'Methodology §5 Caution (sorbitan oleate). Sorbitan monooleate maps here (Sept 25, 2026). Same Caution. Not a new grade. Not Avoid.',
  sorbitolSpecial:
    'Methodology §5 Caution (sorbitol special — exact token; locked Sept 25, 2026). Distinct from Limited oral sorbitol and from Caution sorbitol sorbitan solution. Not Avoid.',
  sss:
    'Methodology §5 Caution (sorbitol sorbitan solution). Sorbitol sorbitan maps here (Sept 25, 2026, 8e480c3). Alias the family. Not a new grade. Not Avoid.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  triacetin: 'Methodology §5 Cleared (triacetin — tablet/caplet coating plasticizer). Not a grade driver.',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
  water: 'Methodology §5 Cleared (purified water / water).',
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

const ASPIRIN = 'healtha2z-b101-aspirin-81-chew';
const FEXO = 'healtha2z-b101-fexo-60';
const BISA398 = 'healtha2z-b101-bisacodyl-398';
const BISA404 = 'healtha2z-b101-bisacodyl-404';
const BISMUTH = 'healtha2z-b101-bismuth-262';
const CAL500 = 'healtha2z-b101-calcium-500';
const CAL750 = 'healtha2z-b101-calcium-750';
const DOCUSATE = 'healtha2z-b101-docusate-420';
const IBU = 'healtha2z-b101-ibu-368';

const SET_288 = '92b8637b-03a9-461f-b2f6-6eddaa214953';
const SET_437 = '219606a8-9a3e-4c30-adb1-984f3f4e72c7';
const SET_398 = '46a377f5-822b-496f-a73b-66d8f902680a';
const SET_404 = '51f1c6c0-770c-4426-820b-bc1f42e143fd';
const SET_046 = '015ca07a-f6b5-4741-a7b0-821cf6d4e418';
const SET_219 = '551d6135-2650-4c27-a20d-d56a9aba7b71';
const SET_229 = '51dd53e8-22ff-4967-9124-f15c3986e4dd';
const SET_420 = '30c9ff75-cee4-4632-86fd-acfdf5ee85af';
const SET_368 = '8ba06ba0-bfe9-4626-af65-dae4d6a3a2ad';

const ASPIRIN_FLAGS: Compact['flags'] = [
  ['corn starch', 'cleared', 'cornStarch'],
  ['dextrates', 'limited', 'dextrates'],
  ['FD&C yellow #6 aluminum lake', 'high', 'dye'],
  ['orange flavor', 'limited', 'flavorOrange'],
  ['saccharin sodium', 'limited', 'saccharin'],
];

const FEXO_FLAGS: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'silica'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['iron oxide black', 'limited', 'ironBlack'],
  ['iron oxide red', 'limited', 'ironRed'],
  ['ironoxide yellow', 'limited', 'ironoxideYellow'],
  ['lactose monohydrate', 'cleared', 'lactoseMh'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethyleneglycol', 'moderate', 'pegJoin'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['purified water', 'cleared', 'water'],
  ['titanium dioxide', 'high', 'tio2'],
];

const BISA398_FLAGS: Compact['flags'] = [
  ['acacia', 'cleared', 'acacia'],
  ['ammonium hydroxide', 'limited', 'ammonium'],
  ['calcium carbonate', 'cleared', 'calciumCarb'],
  ['carnauba wax', 'cleared', 'carnauba'],
  ['colloidal anhydrous silica', 'limited', 'silicaAnhydrous'],
  ['corn starch', 'cleared', 'cornStarch'],
  ['D&C red #27 aluminum lake', 'high', 'dye'],
  ['FD&C blue #2 aluminum lake', 'high', 'dye'],
  ['FD&C yellow # 6 aluminum lake', 'high', 'dyeYellow6Spaced'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['iron oxide black', 'limited', 'ironBlack'],
  ['lactose anhydrous', 'cleared', 'lactoseAnh'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['methylparaben', 'high', 'paraben'],
  ['polyvinyl acetate pthalate', 'limited', 'pvap'],
  ['polydextrose', 'limited', 'polydextrose'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['propylparaben', 'high', 'paraben'],
  ['propylene glycol', 'moderate', 'pgOral'],
  ['povidone', 'cleared', 'povidone'],
  ['shellac glaze', 'cleared', 'shellacGlaze'],
  ['simethicone', 'limited', 'simethicone'],
  ['sodium alginate', 'cleared', 'sodiumAlginate'],
  ['sodium benzoate', 'limited', 'sodiumBenzoate'],
  ['sodium bicarbonate', 'cleared', 'sodiumBicarb'],
  ['stearic acid', 'cleared', 'stearic'],
  ['sucrose', 'limited', 'sucrose'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triacetin', 'cleared', 'triacetin'],
  ['triethyl citrate', 'cleared', 'triethyl'],
];

const BISA404_FLAGS: Compact['flags'] = [
  ['acacia', 'cleared', 'acacia'],
  ['ammonium hydroxide', 'limited', 'ammonium'],
  ['calcium carbonate', 'cleared', 'calciumCarb'],
  ['carnauba wax', 'cleared', 'carnauba'],
  ['colloidal anhydrous silica', 'limited', 'silicaAnhydrous'],
  ['corn starch', 'cleared', 'cornStarch'],
  ['D&C yellow #10 aluminum lake', 'high', 'dye'],
  ['FD&C yellow #6 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['iron oxide black', 'limited', 'ironBlack'],
  ['lactose anhydrous', 'cleared', 'lactoseAnh'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['methylparaben', 'high', 'paraben'],
  ['polydextrose', 'limited', 'polydextrose'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['polyvinyl acetate phthalate', 'limited', 'pvap'],
  ['propylparaben', 'high', 'paraben'],
  ['propylene glycol', 'moderate', 'pgOral'],
  ['povidone', 'cleared', 'povidone'],
  ['shellac glaze', 'cleared', 'shellacGlaze'],
  ['simethicone', 'limited', 'simethicone'],
  ['sodium alginate', 'cleared', 'sodiumAlginate'],
  ['sodium benzoate', 'limited', 'sodiumBenzoate'],
  ['sodium bicarbonate', 'cleared', 'sodiumBicarb'],
  ['stearic acid', 'cleared', 'stearic'],
  ['sucrose', 'limited', 'sucrose'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triacetin', 'cleared', 'triacetin'],
  ['triethyl citrate', 'cleared', 'triethyl'],
];

const BISMUTH_FLAGS: Compact['flags'] = [
  ['acacia gum', 'cleared', 'acaciaGum'],
  ['aspartame', 'high', 'aspartame'],
  ['calcium carbonate', 'cleared', 'calciumCarb'],
  ['D&C red #27 aluminum lake', 'high', 'dye'],
  ['dextrates', 'limited', 'dextrates'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['maltodextrin', 'limited', 'maltodextrin'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['peppermint flavor', 'limited', 'flavorPeppermint'],
  ['silicon dioxide', 'limited', 'silica'],
];

const CAL500_FLAGS: Compact['flags'] = [
  ['assorted flavors', 'limited', 'flavorAssorted'],
  ['D&C yellow #10 aluminum lake', 'high', 'dye'],
  ['dextrose', 'cleared', 'dextrose'],
  ['FD&C blue #1 aluminum lake', 'high', 'dye'],
  ['FD&C red #40 aluminum lake', 'high', 'dye'],
  ['FD&C yellow #6 aluminum lake', 'high', 'dye'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['maltodextrin', 'limited', 'maltodextrin'],
];

const CAL750_FLAGS: Compact['flags'] = [
  ['assorted flavors', 'limited', 'flavorAssorted'],
  ['dextrose', 'cleared', 'dextrose'],
  ['FD&C blue #1 aluminum lake', 'high', 'dye'],
  ['FD&C red #40 aluminum lake', 'high', 'dye'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['maltodextrin', 'limited', 'maltodextrin'],
];

const DOCUSATE_FLAGS: Compact['flags'] = [
  ['black edible ink', 'limited', 'blackInk'],
  ['citric acid', 'cleared', 'citric'],
  ['D&C red #33', 'high', 'dye'],
  ['FD&C blue #1', 'high', 'dye'],
  ['FD&C red #40', 'high', 'dye'],
  ['FD&Cyellow #6', 'high', 'dyeYellow6Join'],
  ['gelatin', 'cleared', 'gelatin'],
  ['glycerin', 'cleared', 'glycerin'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['propylene glycol', 'moderate', 'pgOral'],
  ['purified water', 'cleared', 'water'],
  ['sorbitol special', 'limited', 'sorbitolSpecial'],
];

const IBU_FLAGS: Compact['flags'] = [
  ['ammonium hydroxide', 'limited', 'ammonium'],
  ['FD&C green #3 aluminum lake', 'high', 'dye'],
  ['gelatin', 'cleared', 'gelatin'],
  ['iron oxide black', 'limited', 'ironBlack'],
  ['medium chain triglycerides', 'cleared', 'mct'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['potassium hydroxide', 'limited', 'koh'],
  ['propylene glycol', 'moderate', 'pgOral'],
  ['purified water', 'cleared', 'water'],
  ['shellac', 'cleared', 'shellac'],
  ['sorbitan monooleate', 'limited', 'sorbitan'],
  ['sorbitol sorbitan', 'limited', 'sss'],
];

const ASPIRIN_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver: FD&C yellow #6 aluminum lake. Orange flavor and saccharin sodium are the 8e480c3 alias maps that unlocked this panel. Orange flavor maps to Caution flavor. Saccharin sodium maps to Caution sodium saccharin. Dextrates is the Sept 25 Caution stamp and is not the Avoid driver. Corn starch is Cleared. Adults and children 12 years and over. Under 12: consult a doctor.';

const FEXO_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver: titanium dioxide. Iron oxide black is the 8e480c3 alias that unlocked this panel. It maps to Caution iron oxide as color. Ironoxide yellow and polyethyleneglycol are the line-break joins already mapped (Sept 25 and Sept 24). Iron oxide red is the locked Caution token. Colloidal silicon dioxide is the 0-pt Caution cap. Polyethyleneglycol is PEG Moderate, not the Avoid driver. Adults and children 12 years of age and over. Under 12: do not use. Adults 65 and older: ask a doctor.';

const BISA398_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #27 aluminum lake, FD&C blue #2 aluminum lake, FD&C yellow # 6 aluminum lake, methylparaben, propylparaben, talc, titanium dioxide. FD&C yellow # 6 aluminum lake and iron oxide black are the 8e480c3 aliases that unlocked this panel. The spaced # 6 spelling maps to Yellow 6 Avoid. Iron oxide black maps to Caution iron oxide as color. Lactose anhydrous is Cleared. Polyvinyl acetate pthalate is Caution. Not the 404 bisacodyl formula. Adults and children 12 years of age and older: 1 to 3 tablets once daily. Children 6 to 12 years of age: 1 tablet once a day. Under 6: consult a doctor.';

const BISA404_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10 aluminum lake, FD&C yellow #6 aluminum lake, methylparaben, propylparaben, talc, titanium dioxide. Iron oxide black is the 8e480c3 alias that unlocked this panel. It maps to Caution iron oxide as color. FD&C yellow #6 aluminum lake is the unspaced lake already on the Yellow 6 Avoid row. Not the spaced spelling and not the 398 formula. Adults and children 12 years of age and over: 1 to 3 tablets in a single daily dose. Children 6 to under 12 years of age: 1 tablet. Under 6: ask a doctor.';

const BISMUTH_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: aspartame, D&C red #27 aluminum lake. Acacia gum and peppermint flavor are the 8e480c3 aliases that unlocked this panel. Acacia gum stays on the Cleared acacia / gum arabic lock. Peppermint flavor maps to Caution flavor. Dextrates is Caution and is not the Avoid driver. Adults and children over 12 years. Under 12: ask a doctor.';

const CAL500_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10 aluminum lake, FD&C blue #1 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake. Assorted flavors is the 8e480c3 alias that unlocked this panel. It maps to Caution flavor. Maltodextrin is Limited and is not the Avoid driver. Dextrose is Cleared. Adults and children 12 years of age and over.';

const CAL750_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C blue #1 aluminum lake, FD&C red #40 aluminum lake. Assorted flavors is the 8e480c3 alias that unlocked this panel. It maps to Caution flavor. Not the 500 mg formula (that panel also prints yellow lakes). Maltodextrin is Limited and is not the Avoid driver. Adults and children 12 years of age and over.';

const DOCUSATE_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #33, FD&C blue #1, FD&C red #40, FD&Cyellow #6. Black edible ink and FD&Cyellow #6 are the 8e480c3 aliases that unlocked this panel. Black edible ink maps to Caution pharmaceutical ink. FD&Cyellow #6 is the line-break join of FD&C and yellow #6 and maps to Yellow 6 Avoid. Sorbitol special is Caution and is not the Avoid driver. Not the single-tone 424 formula. Adults and children 12 years and over: 1 to 3 softgels daily. Children 2 to under 12 years of age: 1 softgel daily. Under 2: ask a doctor.';

const IBU_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver: FD&C green #3 aluminum lake. Sorbitol sorbitan and iron oxide black are the 8e480c3 aliases that unlocked this panel. Sorbitol sorbitan maps to Caution sorbitol sorbitan solution. Iron oxide black maps to Caution iron oxide as color. Potassium hydroxide and sorbitan monooleate are the Sept 25 Caution maps and are not the Avoid driver. Medium chain triglycerides are the Cleared named softgel fill. Seed/industrial oils are flagged in gummies. In this softgel fill they are not that High rule. Not an oil-bottle grade. Adults and children 12 years and over. Under 12: ask a doctor.';

const OI_288 =
  'Inactive ingredients: corn starch, dextrates, FD&C yellow #6 aluminum lake, orange flavor, saccharin sodium.';
const OI_437 =
  'Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hypromellose, iron oxide black, iron oxide red, ironoxide yellow, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethyleneglycol, pregelatinized starch, purified water, titanium dioxide. Ironoxide yellow and polyethyleneglycol are the SPL line-break joins.';
const OI_398 =
  'Inactive ingredients: acacia, ammonium hydroxide, calcium carbonate, carnauba wax, colloidal anhydrous silica, corn starch, D&C red #27 aluminum lake, FD&C blue #2 aluminum lake, FD&C yellow # 6 aluminum lake, hypromellose, iron oxide black, lactose anhydrous, magnesium stearate, methylparaben, polyvinyl acetate pthalate, polydextrose, polyethylene glycol, propylparaben, propylene glycol, povidone, shellac glaze, simethicone, sodium alginate, sodium benzoate, sodium bicarbonate, stearic acid, sucrose, talc, titanium dioxide, triacetin, triethyl citrate.';
const OI_404 =
  'Inactive ingredients: acacia, ammonium hydroxide, calcium carbonate, carnauba wax, colloidal anhydrous silica, corn starch, D&C yellow #10 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, iron oxide black, lactose anhydrous, magnesium stearate, methylparaben, polydextrose, polyethylene glycol, polyvinyl acetate phthalate, propylparaben, propylene glycol, povidone, shellac glaze, simethicone, sodium alginate, sodium benzoate, sodium bicarbonate, stearic acid, sucrose, talc, titanium dioxide, triacetin, triethyl citrate.';
const OI_046 =
  'Inactive ingredients: acacia gum, aspartame, calcium carbonate, D&C red #27 aluminum lake, dextrates, magnesium stearate, maltodextrin, microcrystalline cellulose, peppermint flavor, silicon dioxide.';
const OI_219 =
  'Inactive ingredients: assorted flavors, D&C yellow #10 aluminum lake, dextrose, FD&C blue #1 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, magnesium stearate, maltodextrin.';
const OI_229 =
  'Inactive ingredients: assorted flavors, dextrose, FD&C blue #1 aluminum lake, FD&C red #40 aluminum lake, magnesium stearate, maltodextrin.';
const OI_420 =
  'Inactive ingredients: black edible ink, citric acid, D&C red #33, FD&C blue #1, FD&C red #40, FD&Cyellow #6, gelatin, glycerin, polyethylene glycol, propylene glycol, purified water, sorbitol special. FD&Cyellow #6 is the SPL line-break join.';
const OI_368 =
  'Inactive ingredients: ammonium hydroxide, FD&C green #3 aluminum lake, gelatin, iron oxide black, medium chain triglycerides, polyethylene glycol, propylene glycol, potassium hydroxide, purified water, shellac, sorbitol sorbitan, sorbitan monooleate.';

const COMPACT: Compact[] = [
  {
    id: ASPIRIN,
    // KYR5-d — zbar on DailyMed 288---health-a2z-aspirin-81mg-chewable-orange-1.jpg.
    barcode: '369168288362',
    upcNote:
      'UPC-A 369168288362 is the code under the bars on DailyMed image 288---health-a2z-aspirin-81mg-chewable-orange-1.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=92b8637b-03a9-461f-b2f6-6eddaa214953&name=288---health-a2z-aspirin-81mg-chewable-orange-1.jpg).',
    productName: 'HealthA2Z Aspirin 81 mg chewable, 36 tablets, NDC 69168-288-36 (FPA035E)',
    category: 'Pain & Fever',
    formulaId: ASPIRIN,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASPIRIN_FLAGS,
    verdict: 'avoid',
    note: ASPIRIN_NOTE,
    cite: `DailyMed SPL (${DM}${SET_288}; setid ${SET_288}; NDC 69168-288-36; 36). ${OI_288} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-aspirin-81-chew-864',
    productName: 'HealthA2Z Aspirin 81 mg chewable, 24×36 tablets (864), NDC 69168-288-36 (FP0545)',
    category: 'Pain & Fever',
    formulaId: ASPIRIN,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASPIRIN_FLAGS,
    verdict: 'avoid',
    note: `${ASPIRIN_NOTE} Same inactive list as the 36-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_288}; setid ${SET_288}; NDC 69168-288-36; 36 inside the 24-pack). Same inactive list as the 36-count. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: FEXO,
    productName: 'HealthA2Z Fexofenadine HCl 60 mg, 200 coated caplets, NDC 69168-437-98 (FPA086)',
    category: 'Allergies',
    formulaId: FEXO,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '60 mg' }],
    flags: FEXO_FLAGS,
    verdict: 'avoid',
    note: FEXO_NOTE,
    cite: `DailyMed SPL (${DM}${SET_437}; setid ${SET_437}; NDC 69168-437-98; 200). ${OI_437} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-fexo-60-120',
    productName: 'HealthA2Z Fexofenadine HCl 60 mg, 120 caplets, NDC 69168-437-06 (FPA099)',
    category: 'Allergies',
    formulaId: FEXO,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '60 mg' }],
    flags: FEXO_FLAGS,
    verdict: 'avoid',
    note: `${FEXO_NOTE} Same inactive list as the 200-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_437}; setid ${SET_437}; NDC 69168-437-06; 120). Same inactive list as the 200-count, including iron oxide black. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: BISA398,
    productName: 'HealthA2Z Bisacodyl 5 mg, 150 tablets, NDC 69168-398-02 (FPA129)',
    category: 'Digestive',
    formulaId: BISA398,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA398_FLAGS,
    verdict: 'avoid',
    note: BISA398_NOTE,
    cite: `DailyMed SPL (${DM}${SET_398}; setid ${SET_398}; NDC 69168-398-02; 150). ${OI_398} Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bisacodyl-398-25',
    productName: 'HealthA2Z Bisacodyl 5 mg, 25 tablets, NDC 69168-398-92 (FP0886A)',
    category: 'Digestive',
    formulaId: BISA398,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA398_FLAGS,
    verdict: 'avoid',
    note: `${BISA398_NOTE} Same inactive list as the 150-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_398}; setid ${SET_398}; NDC 69168-398-92; 25). Same inactive list as the 150-count, including FD&C yellow # 6 aluminum lake and iron oxide black. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bisacodyl-398-600',
    productName: 'HealthA2Z Bisacodyl 5 mg, 24×25 tablets (600), NDC 69168-398-92 (FP0886)',
    category: 'Digestive',
    formulaId: BISA398,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA398_FLAGS,
    verdict: 'avoid',
    note: `${BISA398_NOTE} Same inactive list as the 25-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_398}; setid ${SET_398}; NDC 69168-398-92; 25 inside the 24-pack). Same inactive list as the 25-count. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bisacodyl-398-250',
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168398030',
    upcNote:
      'UPC-A 369168398030 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z bisacodyl 5 mg 250-tablet bottle (FPA167) (https://a2z-life.com/healtha2z-woman-s-gentle-laxative-bisacodyl-stimulant-laxative-5mg-250-tablets-constipation-relief-gentle-and-reliable-overnight-relief/).',
    productName: 'HealthA2Z Bisacodyl 5 mg, 250 tablets, NDC 69168-398-03 (FPA167)',
    category: 'Digestive',
    formulaId: BISA398,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA398_FLAGS,
    verdict: 'avoid',
    note: `${BISA398_NOTE} Same inactive list as the 150-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_398}; setid ${SET_398}; NDC 69168-398-03; 250). Same inactive list as the 150-count. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bisacodyl-398-250-fpa015',
    productName: 'HealthA2Z Bisacodyl 5 mg, 250 count, NDC 69168-398-03 (FPA015)',
    category: 'Digestive',
    formulaId: BISA398,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA398_FLAGS,
    verdict: 'avoid',
    note: `${BISA398_NOTE} Same NDC and inactive list as the 250-count woman's pack, so they share formulaId. Not a second formula.`,
    cite: `DailyMed SPL (${DM}${SET_398}; setid ${SET_398}; NDC 69168-398-03; 250). Same inactive list as FPA167, including FD&C yellow # 6 aluminum lake and iron oxide black. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bisacodyl-398-25-option',
    productName: 'HealthA2Z Bisacodyl 5 mg, 25 tablets, NDC 69168-398-92 (1/3/6 pack option)',
    category: 'Digestive',
    formulaId: BISA398,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA398_FLAGS,
    verdict: 'avoid',
    note: `${BISA398_NOTE} The option page is the 25-count blister NDC 69168-398-92. Same inactive list, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_398}; setid ${SET_398}; NDC 69168-398-92; 25). Same inactive list as FP0886A. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bisacodyl-398-600-fp0917',
    productName: 'HealthA2Z Bisacodyl 5 mg, 24×25 tablets (600), NDC 69168-398-92 (FP0917)',
    category: 'Digestive',
    formulaId: BISA398,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA398_FLAGS,
    verdict: 'avoid',
    note: `${BISA398_NOTE} The inner blister is NDC 69168-398-92. Same inactive list, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_398}; setid ${SET_398}; NDC 69168-398-92; 25 inside the 24-pack). Same inactive list as FP0886. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: BISA404,
    productName: 'HealthA2Z Bisacodyl 5 mg, 100 tablets, NDC 69168-404-32 (FPA094)',
    category: 'Digestive',
    formulaId: BISA404,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA404_FLAGS,
    verdict: 'avoid',
    note: BISA404_NOTE,
    cite: `DailyMed SPL (${DM}${SET_404}; setid ${SET_404}; NDC 69168-404-32; 100). ${OI_404} Ages 6+. No GTIN-12 on the SPL. The 25-count and 250-count on this SPL were not refused packs and are not added.`,
  },
  {
    id: BISMUTH,
    productName: 'HealthA2Z Bismuth subsalicylate 262 mg, 100 chewable tablets, NDC 69168-046-32 (FPA102)',
    category: 'Digestive',
    formulaId: BISMUTH,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Bismuth subsalicylate', strength: '262 mg' }],
    flags: BISMUTH_FLAGS,
    verdict: 'avoid',
    note: BISMUTH_NOTE,
    cite: `DailyMed SPL (${DM}${SET_046}; setid ${SET_046}; NDC 69168-046-32; 100). ${OI_046} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bismuth-262-200',
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168046986',
    upcNote:
      'UPC-A 369168046986 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z bismuth subsalicylate 262 mg 200-tablet bottle (FP1345) (https://a2z-life.com/healtha2z-bismuth-bismuth-subsalicylate-262mg-multi-symptom-relief-200-count/).',
    productName: 'HealthA2Z Bismuth subsalicylate 262 mg, 200 chewable tablets, NDC 69168-046-98 (FP1345)',
    category: 'Digestive',
    formulaId: BISMUTH,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Bismuth subsalicylate', strength: '262 mg' }],
    flags: BISMUTH_FLAGS,
    verdict: 'avoid',
    note: `${BISMUTH_NOTE} Same inactive list as the 100-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_046}; setid ${SET_046}; NDC 69168-046-98; 200). Same inactive list as the 100-count, including acacia gum and peppermint flavor. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bismuth-262-288',
    productName: 'HealthA2Z Bismuth subsalicylate 262 mg, 24×12 chewable tablets (288), NDC 69168-046-69 (FP0528)',
    category: 'Digestive',
    formulaId: BISMUTH,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Bismuth subsalicylate', strength: '262 mg' }],
    flags: BISMUTH_FLAGS,
    verdict: 'avoid',
    note: `${BISMUTH_NOTE} Same inactive list as the 100-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_046}; setid ${SET_046}; NDC 69168-046-69; 12 inside the 24-pack). Same inactive list as the 100-count. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bismuth-262-720',
    productName: 'HealthA2Z Bismuth subsalicylate 262 mg, 24×30 chewable tablets (720), NDC 69168-046-88 (FP0529V)',
    category: 'Digestive',
    formulaId: BISMUTH,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Bismuth subsalicylate', strength: '262 mg' }],
    flags: BISMUTH_FLAGS,
    verdict: 'avoid',
    note: `${BISMUTH_NOTE} Same inactive list as the 30-count cello, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_046}; setid ${SET_046}; NDC 69168-046-88; 30 inside the 24-pack). Same inactive list as the 100-count. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-bismuth-262-30',
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168046313',
    upcNote:
      'UPC-A 369168046313 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z bismuth subsalicylate 262 mg 30-tablet bottle (https://a2z-life.com/healtha2z-bismuth-subsalicylate-262-mg-30-tablets/).',
    productName: 'HealthA2Z Bismuth subsalicylate 262 mg, 30 chewable tablets, NDC 69168-046-88 (FP0529)',
    category: 'Digestive',
    formulaId: BISMUTH,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Bismuth subsalicylate', strength: '262 mg' }],
    flags: BISMUTH_FLAGS,
    verdict: 'avoid',
    note: `${BISMUTH_NOTE} Same inactive list as the 100-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_046}; setid ${SET_046}; NDC 69168-046-88; 30). Same inactive list as the 100-count. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: CAL500,
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168219021',
    upcNote:
      'UPC-A 369168219021 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z calcium carbonate 500 mg 150-tablet assorted-fruit bottle (https://a2z-life.com/healtha2z-calcium-antacid-500mg-regular-strength-150-tablets/).',
    productName: 'HealthA2Z Calcium antacid, calcium carbonate 500 mg, 150 chewable tablets, NDC 69168-219-02 (FP0535)',
    category: 'Digestive',
    formulaId: CAL500,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium carbonate', strength: '500 mg' }],
    flags: CAL500_FLAGS,
    verdict: 'avoid',
    note: CAL500_NOTE,
    cite: `DailyMed SPL (${DM}${SET_219}; setid ${SET_219}; NDC 69168-219-02; 150). ${OI_219} Ages 12+. No GTIN-12 on the SPL. The 50-count on this SPL was not a refused pack and is not added.`,
  },
  {
    id: CAL750,
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168229969',
    upcNote:
      'UPC-A 369168229969 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z calcium carbonate 750 mg bottle labeled 96 chewable tablets (https://a2z-life.com/healtha2z-calcium-antacid-750mg-extra-strength-relief-from-sour-upset-stomach-acid-indigestion-24-packs-of-96-chewable-tablets-2304-tablets-total-value-pack/).',
    productName: 'HealthA2Z Calcium antacid, calcium carbonate 750 mg, 96 chewable tablets, NDC 69168-229-96 (FP0938V)',
    category: 'Digestive',
    formulaId: CAL750,
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium carbonate', strength: '750 mg' }],
    flags: CAL750_FLAGS,
    verdict: 'avoid',
    note: CAL750_NOTE,
    cite: `DailyMed SPL (${DM}${SET_229}; setid ${SET_229}; NDC 69168-229-96; 96 inside the 24-pack). ${OI_229} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: DOCUSATE,
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168420014',
    upcNote:
      'UPC-A 369168420014 is printed beside HealthA2Z docusate sodium 100 mg single-tone, code FPA059, 100 softgels per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Docusate sodium 100 mg, 100 softgels, NDC 69168-420-01 (FPA059)',
    category: 'Digestive',
    formulaId: DOCUSATE,
    audience: ADULT,
    minAge: 2,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Docusate sodium', strength: '100 mg' }],
    flags: DOCUSATE_FLAGS,
    verdict: 'avoid',
    note: DOCUSATE_NOTE,
    cite: `DailyMed SPL (${DM}${SET_420}; setid ${SET_420}; NDC 69168-420-01; 100). ${OI_420} Ages 2+. No GTIN-12 on the SPL. The 400-count on this SPL was not a refused pack and is not added.`,
  },
  {
    id: 'healtha2z-b101-docusate-420-fpa002',
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168314016',
    upcNote:
      'UPC-A 369168314016 is printed beside HealthA2Z docusate sodium 100 mg two-tone, code FPA002, 100 softgels per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Docusate sodium 100 mg, 100 softgels, NDC 69168-420-01 (FPA002)',
    category: 'Digestive',
    formulaId: DOCUSATE,
    audience: ADULT,
    minAge: 2,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Docusate sodium', strength: '100 mg' }],
    flags: DOCUSATE_FLAGS,
    verdict: 'avoid',
    note: `${DOCUSATE_NOTE} Same NDC and inactive list as FPA059, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_420}; setid ${SET_420}; NDC 69168-420-01; 100). Same inactive list as FPA059, including black edible ink and FD&Cyellow #6. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-docusate-420-720',
    productName: 'HealthA2Z Docusate sodium 100 mg, 24×30 softgels (720), NDC 69168-420-30 (FP1024)',
    category: 'Digestive',
    formulaId: DOCUSATE,
    audience: ADULT,
    minAge: 2,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Docusate sodium', strength: '100 mg' }],
    flags: DOCUSATE_FLAGS,
    verdict: 'avoid',
    note: `${DOCUSATE_NOTE} Same inactive list as the 100-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_420}; setid ${SET_420}; NDC 69168-420-30; 30 inside the 24-pack). Same inactive list as the 100-count. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-docusate-420-30',
    productName: 'HealthA2Z Docusate sodium 100 mg, 30 softgels, NDC 69168-420-30 (FP1024/FP0567)',
    category: 'Digestive',
    formulaId: DOCUSATE,
    audience: ADULT,
    minAge: 2,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Docusate sodium', strength: '100 mg' }],
    flags: DOCUSATE_FLAGS,
    verdict: 'avoid',
    note: `${DOCUSATE_NOTE} The option page is the 30-count bottle NDC 69168-420-30. Same inactive list, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_420}; setid ${SET_420}; NDC 69168-420-30; 30). Same inactive list as the 100-count. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: IBU,
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168363076',
    upcNote:
      'UPC-A 369168363076 is printed beside HealthA2Z ibuprofen 200 mg, code FP0660, 10 softgels per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Ibuprofen 200 mg liquid-filled capsules, 10 softgels, NDC 69168-368-07 (FP0660)',
    category: 'Pain & Fever',
    formulaId: IBU,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_FLAGS,
    verdict: 'avoid',
    note: IBU_NOTE,
    cite: `DailyMed SPL (${DM}${SET_368}; setid ${SET_368}; NDC 69168-368-07; 10). ${OI_368} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-ibu-368-720',
    productName: 'HealthA2Z Ibuprofen 200 mg, 24×30 softgels (720), NDC 69168-368-30 (FP0706)',
    category: 'Pain & Fever',
    formulaId: IBU,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_FLAGS,
    verdict: 'avoid',
    note: `${IBU_NOTE} Same inactive list as the 10-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_368}; setid ${SET_368}; NDC 69168-368-30; 30 inside the 24-pack). Same inactive list as the 10-count, including sorbitol sorbitan. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b101-ibu-368-240',
    productName: 'HealthA2Z Ibuprofen 200 mg, 24×10 softgels (240), NDC 69168-368-07 (FP0660V)',
    category: 'Pain & Fever',
    formulaId: IBU,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_FLAGS,
    verdict: 'avoid',
    note: `${IBU_NOTE} Same inactive list as the 10-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${SET_368}; setid ${SET_368}; NDC 69168-368-07; 10 inside the 24-pack). Same inactive list as the 10-count. Ages 12+. No GTIN-12 on the SPL.`,
  },
];

export const BATCH101_KYR6_HEALTHA2Z_TOKEN_BACKFILL_3: RatingRecord[] = COMPACT.map(expand);

export const BATCH101_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH101_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH101_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH101_SKIPPED_NO_OI,
  ...BATCH101_SKIPPED_OUT,
];

export const BATCH101_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'HealthA2Z® Sleep Aid | Doxylamine Succinate 25mg | (200 Counts) (FPA122)',
    reason:
      'REFUSED exact panel string(s) `dibasic calcium phosphate dihydrate`, `microcrystallinecellulose`. Not an 8e480c3 alias. Setid 3761182c-275b-40f3-a262-9ef5f5a80723. NDC 69168-439-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength,300 Tablets, Enteric Coated Compare to Bayer Active Ingredients (FPA013)',
    reason:
      'REFUSED exact panel string(s) `D&C Yellow 10`, `iron oxide ochre`, `starch`. Not an 8e480c3 alias. Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-17. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength, 24*40 Tablets (960 Tablets Total) (FP1083)',
    reason:
      'REFUSED exact panel string(s) `D&C Yellow 10`, `iron oxide ochre`, `starch`. Not an 8e480c3 alias. Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-50. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Azelastine HCl Nasal Spray, 24-Hr Allergy, 2 Pack 240 Spray (FP1282)',
    reason:
      'REFUSED exact panel string(s) `edetate disodium dihydrate`, `sodium citrate (dihydrate)`. Not an 8e480c3 alias. Setid 3e2fdb0d-c2f5-41ab-b1cd-4fae80648112. NDC 69168-478-02. NO Search row.',
  },
  {
    sku: "HealthA2Z® Children's Allergy Relief | DYE Free | Diphenhyrdramine 12.5 mg | 5ml Oral Solution | 8Fl Oz (237 mL) | Antihistamine | Clear Bubble Gum Flavored | Alcohol and Sugar Free (FPA164)",
    reason:
      'REFUSED exact panel string `sodium citrate dihydrate`. Not an 8e480c3 alias. Setid cb6df361-b8e5-4e2f-945f-c20159d76c4f. NDC 69168-471-59. NO Search row.',
  },
  {
    sku: 'HealthA2Z Anti-Diarrheal Loperamide HCI 2mg 12 Caplets (1 Pack, 3 Packs & 6 Packs) (FP0697)',
    reason:
      'REFUSED exact panel string(s) `dicalcium phosphate dihydrate`, `FD&C blue #1 brilliant blue lake`. Not an 8e480c3 alias. Setid aca3742c-2a82-4e91-8aaf-2fce08487e56. NDC 69168-248-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z Motion Sickness Relief 50mg, 24*12 Tablets (288 Tablets Total) (FP0944)',
    reason:
      'REFUSED exact panel string `dibasic calcium phosphate dihydrate`. Not an 8e480c3 alias. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z Motion Sickness Relief 50mg (1 Pack, 3 Packs & 6 Packs) (FPA027E)',
    reason:
      'REFUSED exact panel string `dibasic calcium phosphate dihydrate`. Not an 8e480c3 alias. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Cold Roll-On | Pain Relieving Gel | Menthol 4% External Analgesic | 2.5 OZ | 74 mL | Temporary Relieves Minor Aches and Pains of Muscle (FPA183)',
    reason:
      'REFUSED exact panel string(s) `blue 1`, `yellow 5`. Not an 8e480c3 alias. Setid 36463acb-7c28-416f-a45f-a93f0be5692b. NDC 69168-483-67. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-356-23 (FP0999)',
    reason:
      'REFUSED exact panel string(s) `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`. The USP suffix is not an 8e480c3 alias. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 8 softgels (1, 3, and 6 packs)',
    reason:
      'REFUSED exact panel string(s) `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`. The USP suffix is not an 8e480c3 alias. The option page is not one pinned count. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-357-29 (FP1003)',
    reason:
      'REFUSED exact panel string(s) `glycerin USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`, `sorbitol 70% solution USP`. The USP suffix is not an 8e480c3 alias. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | Omeprazole 20mg | 14 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA173)',
    reason:
      'REFUSED exact panel string(s) `methacrylic acid and ethyl acrylate copolymer dispersion`, `silicified microcrystalline cellulose`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. Omeprazole coating maps only exact locked polymer names. These leftover coating strings stay refused. Brand PDP drug-facts tile on the 14-tablet pack. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | Omeprazole 20mg | 42 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA174)',
    reason:
      'REFUSED exact panel string(s) `methacrylic acid and ethyl acrylate copolymer dispersion`, `silicified microcrystalline cellulose`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. Same brand drug-facts tile as the 14-tablet pack. Leftover coating strings stay refused. NO Search row.',
  },
  {
    sku: 'HealthA2Z Apple Cider Vinegar 500mg Gummy 4g, 60 ct (FPHK1044)',
    reason:
      'REFUSED exact panel string(s) `natural apple flavor`, `unfiltered liquid apple cider vinegar`, `purple carrot concentrate`, `beta-carotene`. Not an 8e480c3 alias. `natural apple flavor` is not `orange flavor` or `flavors`. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Cold-Flu Relief, 8 Softgels (1 Pack, 3 Packs & 6 Packs)',
    reason:
      'REFUSED exact panel string(s) `glycerin USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`, `sorbitol 70% solution USP`. `gelatin USP`, `propylene glycol USP`, and `sorbitol sorbitan solution USP` already map and are not the block. The USP suffix is not an 8e480c3 alias. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Esomeprazole Magnesium | Acid Reducer | 20mg | Delayed-Released Capsules USP | 24 Hours | Treats Frequent Heartburn (FPA156a)',
    reason:
      'REFUSED exact panel string(s) `Methacrylic Acid and Ethyl Acrylate Copolymer Dispersion`, `Mono- and Di-Glycerides`, `Sugar Spheres`. Omeprazole coating maps only exact locked polymer names. These leftover coating strings stay refused. The SKU title does not pin one count. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Blueberry Flavored Elderberry Gummies | 60 Pieces | With Vitamin C & Zinc | Supports Immune Function | Packed with Antioxidants (FP1066)',
    reason:
      'REFUSED exact panel string(s) `Malt syrup`, `citrus pectin`, `sodium hexametophosphate`, `artificial blueberry flavor`. Not an 8e480c3 alias. `artificial blueberry flavor` is not `flavors` or `assorted flavors`. `citrus pectin` is not `pectin`. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Anti-Diarrheal | Loperamide HCl 2mg | Controls Symptoms of Diarrhea, Including Travelers’ Diarrhea | 24 Packs of 12 Caplets (288 Caplets Total) | Value Pack (FP0697A)',
    reason:
      'REFUSED exact panel string(s) `dicalcium phosphate dihydrate`, `FD&C blue #1 brilliant blue lake`. Not an 8e480c3 alias. Setid aca3742c-2a82-4e91-8aaf-2fce08487e56. NDC 69168-248-86. NO Search row.',
  },
];

const _ROWS = BATCH101_KYR6_HEALTHA2Z_TOKEN_BACKFILL_3;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 26) throw new Error('batch101 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 0 || _grades.avoid !== 26) {
  throw new Error('batch101 Search grade drift');
}
if (_new !== 9 || _reuse !== 17) throw new Error('batch101 NEW/REUSE drift');
if (BATCH101_SKIPPED_NO_OI.length !== 0) throw new Error('batch101 no_OI drift');
if (BATCH101_SKIPPED_OUT.length !== 0) throw new Error('batch101 OUT drift');
if (BATCH101_SKIPPED.length !== 0) throw new Error('batch101 SKIPPED drift');
if (BATCH101_REFUSED.length !== 19) throw new Error('batch101 REFUSED drift');
if (BATCH101_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch101 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch101 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch101 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'healtha2z-b101-aspirin-81-chew': '369168288362',
  'healtha2z-b101-bisacodyl-398-250': '369168398030',
  'healtha2z-b101-bismuth-262-200': '369168046986',
  'healtha2z-b101-bismuth-262-30': '369168046313',
  'healtha2z-b101-calcium-500': '369168219021',
  'healtha2z-b101-calcium-750': '369168229969',
  'healtha2z-b101-docusate-420': '369168420014',
  'healtha2z-b101-docusate-420-fpa002': '369168314016',
  'healtha2z-b101-ibu-368': '369168363076',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 9) throw new Error('batch101 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch101 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch101 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch101 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch101 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b101-'))) {
  throw new Error('batch101 ids must use healtha2z-b101-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch101 duplicate id');
if (_ROWS.some((r) => r.formulaId?.startsWith('healtha2z-b101-') && !_ids.has(r.formulaId))) {
  throw new Error('batch101 in-file formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch101 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch101 Clean row has a non-cleared inactive');
}
const _flagNames = new Set(_ROWS.flatMap((r) => r.inactiveIngredients?.map((f) => f.name) ?? []));
for (const unlocked of [
  'iron oxide black',
  'FD&C yellow # 6 aluminum lake',
  'FD&Cyellow #6',
  'orange flavor',
  'peppermint flavor',
  'assorted flavors',
  'acacia gum',
  'saccharin sodium',
  'sorbitol sorbitan',
  'black edible ink',
]) {
  if (!_flagNames.has(unlocked)) throw new Error(`batch101 missing an 8e480c3 unlock token: ${unlocked}`);
}
for (const blocked of [
  'dibasic calcium phosphate dihydrate',
  'microcrystallinecellulose',
  'D&C Yellow 10',
  'iron oxide ochre',
  'starch',
  'glycerine USP',
  'glycerin USP',
  'polyethylene glycol-400 USP',
  'natural apple flavor',
  'methacrylic acid and ethyl acrylate copolymer dispersion',
  'Methacrylic Acid and Ethyl Acrylate Copolymer Dispersion',
  'artificial blueberry flavor',
  'FD&C blue #1 brilliant blue lake',
]) {
  if (_flagNames.has(blocked)) throw new Error(`batch101 wrote a still-blocked token: ${blocked}`);
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH101_SKIPPED.map((s) => s.sku),
  ...BATCH101_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch101 excluded brand leaked');
}
