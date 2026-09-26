// DRAFT / not verified / batch 106 KYR6-b Amazon 3P TIME-Cap.
// Methodology v1.6 + MAIN §5 through the Sept 25, 2026 alias-family
// stamps. Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// TIME-Cap Labs / Timely only. Labeler NDC 49483. Pin is the DailyMed
// inactive paragraph when an SPL exists. Brand pages opened:
// timecaplabs.com analgesic, cold-allergy, laxative, supplements.
// Exact pack only. Canada/EU stays out. recordStatus is 'unverified'.
// Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// Already-on-MAIN twins left alone: timecap-ibuprofen-200 (setid 82aad715)
// and timecap-naproxen-220 (same inactive list as setids 17ecaee0 and
// ab7b7b8e). No UPC attached. An NDC is not a UPC. HTML bullets are not OI.
//
// Do NOT edit batch70–batch105. No house Amazon. No HealthA2Z. No A+Health.
// No GoodSense. No toothpaste. No Sprouts. No factory. Oil form split stays
// as it is on main. Dual-panel day/night stays no-row.
//
// Leftover Amazon 3P after this slice: 1 (GoodSense). A+Health (batch93–95)
// and HealthA2Z (batch96–105) are already on main.
//
// TALLY (unverified drafts in THIS file): 43 rows —
// Clean 1 / Caution 6 / Avoid 36.
// NEW 17 / REUSE-formula 26 /
// SKIPPED 44 (no_OI 24 / OUT 20) /
// REFUSED 10.
// Search grade: Clean 1 / Caution 6 / Avoid 36.
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

const BRAND = 'TIME-Cap Labs';
const AMAZON = ['Amazon', 'timecaplabs.com'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  sio2: 'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / colloidal anhydrous silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC).',
  hec: 'Methodology §5 Cleared (hydroxyethyl cellulose).',
  lactose: 'Methodology §5 Cleared (lactose monohydrate).',
  dical: 'Methodology §5 Cleared (dibasic calcium phosphate dihydrate — calcium phosphate filler).',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs, including polyethylene glycol 400). Not the Avoid driver.',
  tio2: 'Methodology §5 High (titanium dioxide).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes and Green 3). The printed spelling is the flag name.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  water: 'Methodology §5 Cleared (purified water).',
  povidone: 'Methodology §5 Cleared (povidone). Povidone (K-30) is that token.',
  copovidone: 'Methodology §5 Cleared (copovidone — povidone family).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  corn: 'Methodology §5 Cleared (corn starch — named simple starch).',
  shellac: 'Methodology §5 Cleared (shellac). Shellac wax is not this row.',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol as an oral coating).',
  triacetin: 'Methodology §5 Cleared (triacetin — tablet coating plasticizer).',
  gms: 'Methodology §5 Cleared (glyceryl monostearate / GMS). Distinct from Caution mono- and diglycerides.',
  pg: 'Methodology §5 Moderate (propylene glycol, oral).',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  carnauba: 'Methodology §5 Caution (carnauba wax — Sept 25, 2026). Not the old Cleared wax row. Not Avoid.',
  iron: 'Methodology §5 Caution (iron oxide as color). Iron oxide black, iron oxide red, ferric oxide red, ferric oxide yellow, and ferrosoferric oxide sit on this row. Not Avoid.',
  koh: 'Methodology §5 Caution (potassium hydroxide — Sept 25, 2026). Distinct from Cleared sodium hydroxide. Not Avoid.',
  ammonium: 'Methodology §5 Caution (ammonium hydroxide). Distinct from strong ammonia solution. Not Avoid.',
  sss: 'Methodology §5 Caution (sorbitol sorbitan / sorbitol sorbitan solution). Distinct from Limited oral sorbitol. Not Avoid.',
  sorbitan: 'Methodology §5 Caution (sorbitan monooleate — sorbitan oleate). Not Avoid.',
  mct: 'Methodology §5 Limited (unlabeled medium chain triglycerides). Not the Cleared named MCT fill that names palm kernel or coconut. Not gummy High.',
  mineralOil: 'Methodology §5 Caution (mineral oil — light liquid paraffin / mineral-oil row). Distinct from Cleared paraffin + mineral oil as a topical ointment occlusive. Not Avoid.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  benzoate: 'Methodology §5 Limited (sodium benzoate — synthetic preservative). Not Avoid.',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.',
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
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

function dm(
  setid: string,
  ndc: string,
  extra: string,
  active: string,
  inactive: string,
): string {
  return `DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}; setid ${setid}; NDC ${ndc}). ${extra} Active: ${active}. Inactive ingredients: ${inactive}. No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.`;
}

const IBU_SOFT: Compact['flags'] = [
  ['ammonium hydroxide', 'limited', 'ammonium'],
  ['FD&C green #3', 'high', 'dye'],
  ['gelatin', 'cleared', 'gelatin'],
  ['iron oxide black', 'limited', 'iron'],
  ['medium chain triglycerides', 'limited', 'mct'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['potassium hydroxide', 'limited', 'koh'],
  ['propylene glycol', 'moderate', 'pg'],
  ['purified water', 'cleared', 'water'],
  ['shellac', 'cleared', 'shellac'],
  ['sorbitan monooleate', 'limited', 'sorbitan'],
  ['sorbitol sorbitan', 'limited', 'sss'],
];

const LORATADINE: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['lactose monohydrate', 'cleared', 'lactose'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
];

const CETIRIZINE: Compact['flags'] = [
  ['corn starch', 'cleared', 'corn'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['lactose monohydrate', 'cleared', 'lactose'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['povidone', 'cleared', 'povidone'],
  ['titanium dioxide', 'high', 'tio2'],
];

const APAP_500: Compact['flags'] = [
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['stearic acid', 'cleared', 'stearic'],
];

const APAP_DYE_FREE: Compact['flags'] = [
  ['hypromellose', 'cleared', 'hpmc'],
  ['mineral oil', 'limited', 'mineralOil'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['stearic acid', 'cleared', 'stearic'],
];

const APAP_ER: Compact['flags'] = [
  ['carnauba wax', 'limited', 'carnauba'],
  ['hydroxyethyl cellulose', 'cleared', 'hec'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triacetin', 'cleared', 'triacetin'],
];

const DAY_COLD: Compact['flags'] = [
  ['FD&C red #40', 'high', 'dye'],
  ['FD&C yellow #6', 'high', 'dye'],
  ['gelatin', 'cleared', 'gelatin'],
  ['glycerin', 'cleared', 'glycerin'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['povidone', 'cleared', 'povidone'],
  ['propylene glycol', 'moderate', 'pg'],
  ['purified water', 'cleared', 'water'],
  ['shellac', 'cleared', 'shellac'],
  ['sorbitol sorbitan solution', 'limited', 'sss'],
  ['titanium dioxide', 'high', 'tio2'],
];

const FAMOTIDINE: Compact['flags'] = [
  ['carnauba wax', 'limited', 'carnauba'],
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
];

const MUCOSA: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['maltodextrin', 'limited', 'maltodextrin'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['povidone', 'cleared', 'povidone'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['stearic acid', 'cleared', 'stearic'],
];

const DPH: Compact['flags'] = [
  ['carnauba wax', 'limited', 'carnauba'],
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['D&C red no 27 aluminum lake', 'high', 'dye'],
  ['dibasic calcium phosphate dihydrate', 'cleared', 'dical'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol 400', 'moderate', 'peg'],
  ['polysorbate 80', 'moderate', 'ps80'],
  ['titanium dioxide', 'high', 'tio2'],
];

const GUAIF_ER: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['copovidone', 'cleared', 'copovidone'],
  ['FD&C blue No. 1 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['maltodextrin', 'limited', 'maltodextrin'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['povidone (K-30)', 'cleared', 'povidone'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['stearic acid', 'cleared', 'stearic'],
];

const IBU_BROWN: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['iron oxide red', 'limited', 'iron'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['polyvinyl alcohol', 'cleared', 'pva'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
];

const GELCAP: Compact['flags'] = [
  ['colloidal anhydrous silica', 'limited', 'sio2'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['D&C red #33', 'high', 'dye'],
  ['FD&C blue #1', 'high', 'dye'],
  ['FD&C red #40', 'high', 'dye'],
  ['FD&C yellow #6', 'high', 'dye'],
  ['ferric oxide red', 'limited', 'iron'],
  ['ferric oxide yellow', 'limited', 'iron'],
  ['ferrosoferric oxide', 'limited', 'iron'],
  ['gelatin', 'cleared', 'gelatin'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['stearic acid', 'cleared', 'stearic'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
];

const SENNA_86: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['dibasic calcium phosphate dihydrate', 'cleared', 'dical'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['mineral oil', 'limited', 'mineralOil'],
];

const SENNA_S: Compact['flags'] = [
  ['carnauba wax', 'limited', 'carnauba'],
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['dibasic calcium phosphate dihydrate', 'cleared', 'dical'],
  ['D&C yellow #10 aluminum lake', 'high', 'dye'],
  ['FD&C yellow #6 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['sodium benzoate', 'limited', 'benzoate'],
  ['stearic acid', 'cleared', 'stearic'],
  ['titanium dioxide', 'high', 'tio2'],
];

const IBU_SOFT_OI =
  'ammonium hydroxide, FD&C green #3 (mini label prints FD&C green no.3), gelatin, iron oxide black, medium chain triglycerides, polyethylene glycol, potassium hydroxide, propylene glycol, purified water, shellac, sorbitan monooleate, sorbitol sorbitan';
const IBU_SOFT_NOTE =
  'Avoid. Driver is FD&C green #3 (High). Medium chain triglycerides is unlabeled MCT (Limited), not named palm-kernel or coconut fill. Ages 12+.';
const SET_SOFT = 'c7c51cf3-9e95-f8d0-e053-2995a90a7371';
const SET_MINI = '059cb22f-f6db-5d03-e063-6294a90a9ec1';

const CET_OI =
  'corn starch, hypromellose, lactose monohydrate, magnesium stearate, polyethylene glycol, povidone, titanium dioxide';
const CET_NOTE = 'Avoid. Driver is titanium dioxide (High). Polyethylene glycol is Moderate and is not required to reach Avoid.';

const ER_OI =
  'carnauba wax, hydroxyethyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, povidone, pregelatinized starch, sodium starch glycolate, titanium dioxide, triacetin';
const ER_NOTE =
  'Avoid. Driver is titanium dioxide (High). Carnauba wax is the Sept 25 Caution wax, not the old Cleared wax row.';
const SET_ER = 'cd4d0ad4-7206-94c8-e053-2a95a90aaa14';

const BROWN_OI =
  'colloidal silicon dioxide, croscarmellose sodium, iron oxide red, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide';
const BROWN_NOTE =
  'Avoid. Drivers are talc and titanium dioxide (High). Iron oxide red is Caution and is not the Avoid driver. Distinct from timecap-ibuprofen-200 (FD&C yellow #6 aluminum lake panel). Ages 12+.';
const SET_BROWN = 'f58d35f9-e44b-417b-98ce-0766b537cd2f';

const DPH_OI =
  'carnauba wax, colloidal silicon dioxide, croscarmellose sodium, D&C red no 27 aluminum lake, dibasic calcium phosphate dihydrate, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol (PEG) 400, polysorbate 80, titanium dioxide';
const DPH_NOTE =
  'Avoid. Drivers are D&C red no 27 aluminum lake and titanium dioxide (High). Ages 6+.';
const SET_DPH = '7aee34b5-1583-4a8a-8ffb-b17ef2722ac1';

function pack(
  partial: Omit<Compact, 'audience' | 'productType'>,
): Compact {
  return { ...partial, audience: ADULT, productType: OTC };
}

const COMPACT: Compact[] = [
  pack({
    id: 'timecap-b106-ibu-200-softgel',
    // KYR5-d — zbar on DailyMed 700T-Ibuprofen-240ct-label.jpg.
    barcode: '349483700398',
    upcNote:
      'UPC-A 349483700398 is the code under the bars on DailyMed image 700T-Ibuprofen-240ct-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=059cb22f-f6db-5d03-e063-6294a90a9ec1&name=700T-Ibuprofen-240ct-label.jpg).',
    productName: 'Timely Ibuprofen 200 mg mini liquid-filled capsules, 240 count, NDC 49483-700',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-softgel',
    minAge: 12,
    form: 'mini liquid-filled capsule',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_SOFT,
    verdict: 'avoid',
    note: IBU_SOFT_NOTE,
    cite: dm(SET_MINI, '49483-700', 'Label image 700T-Ibuprofen-240ct-label.jpg. Same inactive list as setid c7c51cf3.', 'Ibuprofen 200 mg', IBU_SOFT_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-softgel-20',
    productName: 'Timely Ibuprofen 200 mg liquid-filled capsules, 20 count, NDC 49483-133',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-softgel',
    minAge: 12,
    form: 'liquid-filled capsule',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_SOFT,
    verdict: 'avoid',
    note: IBU_SOFT_NOTE,
    cite: dm(SET_SOFT, '49483-133', 'Label image 610T-timely-ibusgc-label-20s.jpg. Brand code 610T.', 'Ibuprofen 200 mg', IBU_SOFT_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-softgel-80',
    // KYR5-d — zbar on DailyMed 610T-timely-ibusgc-label-80s.jpg.
    barcode: '349483133806',
    upcNote:
      'UPC-A 349483133806 is the code under the bars on DailyMed image 610T-timely-ibusgc-label-80s.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c7c51cf3-9e95-f8d0-e053-2995a90a7371&name=610T-timely-ibusgc-label-80s.jpg).',
    productName: 'Timely Ibuprofen 200 mg liquid-filled capsules, 80 count, NDC 49483-133',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-softgel',
    minAge: 12,
    form: 'liquid-filled capsule',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_SOFT,
    verdict: 'avoid',
    note: IBU_SOFT_NOTE,
    cite: dm(SET_SOFT, '49483-133', 'Label image 610T-timely-ibusgc-label-80s.jpg. Brand code 610T.', 'Ibuprofen 200 mg', IBU_SOFT_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-softgel-120',
    // KYR5-d — zbar on DailyMed 610T-timely-ibusgc-label-120s.jpg.
    barcode: '349483133127',
    upcNote:
      'UPC-A 349483133127 is the code under the bars on DailyMed image 610T-timely-ibusgc-label-120s.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c7c51cf3-9e95-f8d0-e053-2995a90a7371&name=610T-timely-ibusgc-label-120s.jpg).',
    productName: 'Timely Ibuprofen 200 mg liquid-filled capsules, 120 count, NDC 49483-133',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-softgel',
    minAge: 12,
    form: 'liquid-filled capsule',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_SOFT,
    verdict: 'avoid',
    note: IBU_SOFT_NOTE,
    cite: dm(SET_SOFT, '49483-133', 'Label image 610T-timely-ibusgc-label-120s.jpg. Brand code 610T.', 'Ibuprofen 200 mg', IBU_SOFT_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-softgel-160',
    // KYR5-d — zbar on DailyMed 610T-timely-160ct-label.jpg.
    barcode: '349483133370',
    upcNote:
      'UPC-A 349483133370 is the code under the bars on DailyMed image 610T-timely-160ct-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c7c51cf3-9e95-f8d0-e053-2995a90a7371&name=610T-timely-160ct-label.jpg).',
    productName: 'Timely Ibuprofen 200 mg liquid-filled capsules, 160 count, NDC 49483-133',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-softgel',
    minAge: 12,
    form: 'liquid-filled capsule',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_SOFT,
    verdict: 'avoid',
    note: IBU_SOFT_NOTE,
    cite: dm(SET_SOFT, '49483-133', 'Label image 610T-timely-160ct-label.jpg. Brand code 610T.', 'Ibuprofen 200 mg', IBU_SOFT_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-softgel-200',
    // KYR5-d — zbar on DailyMed 610T-timely-ibusgc-200s.jpg.
    barcode: '349483133202',
    upcNote:
      'UPC-A 349483133202 is the code under the bars on DailyMed image 610T-timely-ibusgc-200s.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c7c51cf3-9e95-f8d0-e053-2995a90a7371&name=610T-timely-ibusgc-200s.jpg).',
    productName: 'Timely Ibuprofen 200 mg liquid-filled capsules, 200 count, NDC 49483-133',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-softgel',
    minAge: 12,
    form: 'liquid-filled capsule',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_SOFT,
    verdict: 'avoid',
    note: IBU_SOFT_NOTE,
    cite: dm(SET_SOFT, '49483-133', 'Label image 610T-timely-ibusgc-200s.jpg. Brand code 610T.', 'Ibuprofen 200 mg', IBU_SOFT_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-softgel-300',
    // KYR5-d — zbar on DailyMed 610T-TCL-Ibuprofen 300mg-bottle label-ct300.jpg.
    barcode: '349483133318',
    upcNote:
      'UPC-A 349483133318 is the code under the bars on DailyMed image 610T-TCL-Ibuprofen 300mg-bottle label-ct300.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c7c51cf3-9e95-f8d0-e053-2995a90a7371&name=610T-TCL-Ibuprofen+300mg-bottle+label-ct300.jpg).',
    productName: 'Timely Ibuprofen 200 mg liquid-filled capsules, 300 count, NDC 49483-133',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-softgel',
    minAge: 12,
    form: 'liquid-filled capsule',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_SOFT,
    verdict: 'avoid',
    note: IBU_SOFT_NOTE,
    cite: dm(SET_SOFT, '49483-133', 'Observation text 610T-TCL-Ibuprofen 300mg-bottle label-ct300 on the 200 mg capsule SPL. The ct300 suffix is the count pin. Brand code 610T.', 'Ibuprofen 200 mg', IBU_SOFT_OI),
  }),
  pack({
    id: 'timecap-b106-loratadine-10',
    // KYR5-d — zbar on DailyMed loratadine-label-365s.jpg.
    barcode: '349483732658',
    upcNote:
      'UPC-A 349483732658 is the code under the bars on DailyMed image loratadine-label-365s.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=2c80ea14-8490-4d26-e063-6294a90aecf0&name=loratadine-label-365s.jpg).',
    productName: 'Timely Loratadine tablets USP 10 mg, 365 count, NDC 49483-732',
    category: 'Allergies',
    formulaId: 'timecap-b106-loratadine-10',
    minAge: 6,
    form: 'tablet',
    actives: [{ name: 'Loratadine', strength: '10 mg' }],
    flags: LORATADINE,
    verdict: 'caution',
    note: 'Caution. Driver is colloidal silicon dioxide (Limited nanoparticle cap). No High inactive on this panel. Ages 6+.',
    cite: dm(
      '2c80ea14-8490-4d26-e063-6294a90aecf0',
      '49483-732',
      'Label image loratadine-label-365s.jpg.',
      'Loratadine 10 mg',
      'colloidal silicon dioxide, lactose monohydrate, magnesium stearate, microcrystalline cellulose, sodium starch glycolate',
    ),
  }),
  pack({
    id: 'timecap-b106-cetirizine-10',
    // KYR5-d — zbar on DailyMed cetirizine-hcl-100s-label.jpg.
    barcode: '349483692013',
    upcNote:
      'UPC-A 349483692013 is the code under the bars on DailyMed image cetirizine-hcl-100s-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=d78223ba-80d5-47f8-e053-2a95a90aebdb&name=cetirizine-hcl-100s-label.jpg).',
    productName: 'Timely Cetirizine hydrochloride tablets USP 10 mg, 100 count, NDC 49483-692',
    category: 'Allergies',
    formulaId: 'timecap-b106-cetirizine-10',
    minAge: 6,
    form: 'tablet',
    actives: [{ name: 'Cetirizine hydrochloride', strength: '10 mg' }],
    flags: CETIRIZINE,
    verdict: 'avoid',
    note: CET_NOTE,
    cite: dm('d78223ba-80d5-47f8-e053-2a95a90aebdb', '49483-692', 'Label image cetirizine-hcl-100s-label.jpg.', 'Cetirizine hydrochloride 10 mg', CET_OI),
  }),
  pack({
    id: 'timecap-b106-cetirizine-10-200',
    productName: 'Timely Cetirizine hydrochloride tablets USP 10 mg, 200 count, NDC 49483-692',
    category: 'Allergies',
    formulaId: 'timecap-b106-cetirizine-10',
    minAge: 6,
    form: 'tablet',
    actives: [{ name: 'Cetirizine hydrochloride', strength: '10 mg' }],
    flags: CETIRIZINE,
    verdict: 'avoid',
    note: CET_NOTE,
    cite: dm('d78223ba-80d5-47f8-e053-2a95a90aebdb', '49483-692', 'Label image cetirizine-hcl-200s-label.jpg.', 'Cetirizine hydrochloride 10 mg', CET_OI),
  }),
  pack({
    id: 'timecap-b106-cetirizine-10-365',
    // KYR5-d — zbar on DailyMed 692R-Timely-Cetirizine-bottle-label-365s.jpg.
    barcode: '349483692655',
    upcNote:
      'UPC-A 349483692655 is the code under the bars on DailyMed image 692R-Timely-Cetirizine-bottle-label-365s.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=d78223ba-80d5-47f8-e053-2a95a90aebdb&name=692R-Timely-Cetirizine-bottle-label-365s.jpg).',
    productName: 'Timely Cetirizine hydrochloride tablets USP 10 mg, 365 count, NDC 49483-692',
    category: 'Allergies',
    formulaId: 'timecap-b106-cetirizine-10',
    minAge: 6,
    form: 'tablet',
    actives: [{ name: 'Cetirizine hydrochloride', strength: '10 mg' }],
    flags: CETIRIZINE,
    verdict: 'avoid',
    note: CET_NOTE,
    cite: dm('d78223ba-80d5-47f8-e053-2a95a90aebdb', '49483-692', 'Label image 692R-Timely-Cetirizine-bottle-label-365s.jpg.', 'Cetirizine hydrochloride 10 mg', CET_OI),
  }),
  pack({
    id: 'timecap-b106-cetirizine-10-500',
    // KYR5-d — zbar on DailyMed 692R-timely-cetirizine10mg-500ct-label.jpg.
    barcode: '349483692501',
    upcNote:
      'UPC-A 349483692501 is the code under the bars on DailyMed image 692R-timely-cetirizine10mg-500ct-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=d78223ba-80d5-47f8-e053-2a95a90aebdb&name=692R-timely-cetirizine10mg-500ct-label.jpg).',
    productName: 'Timely Cetirizine hydrochloride tablets USP 10 mg, 500 count, NDC 49483-692',
    category: 'Allergies',
    formulaId: 'timecap-b106-cetirizine-10',
    minAge: 6,
    form: 'tablet',
    actives: [{ name: 'Cetirizine hydrochloride', strength: '10 mg' }],
    flags: CETIRIZINE,
    verdict: 'avoid',
    note: CET_NOTE,
    cite: dm('d78223ba-80d5-47f8-e053-2a95a90aebdb', '49483-692', 'Label image 692R-timely-cetirizine10mg-500ct-label.jpg.', 'Cetirizine hydrochloride 10 mg', CET_OI),
  }),
  pack({
    id: 'timecap-b106-cetirizine-5',
    // KYR5-d — zbar on DailyMed 682R-timely-cetirizine10mg-100ct-label.jpg.
    barcode: '349483682014',
    upcNote:
      'UPC-A 349483682014 is the code under the bars on DailyMed image 682R-timely-cetirizine10mg-100ct-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=dfbddafb-9455-5805-e053-2a95a90ad0d9&name=682R-timely-cetirizine10mg-100ct-label.jpg).',
    productName: 'Timely Cetirizine hydrochloride tablets USP 5 mg, 100 count, NDC 49483-682',
    category: 'Allergies',
    formulaId: 'timecap-b106-cetirizine-5',
    minAge: 6,
    form: 'tablet',
    actives: [{ name: 'Cetirizine hydrochloride', strength: '5 mg' }],
    flags: CETIRIZINE,
    verdict: 'avoid',
    note: `${CET_NOTE} The 5 mg panel prints the same inactive list as the 10 mg panel and does not share that formulaId.`,
    cite: dm('dfbddafb-9455-5805-e053-2a95a90ad0d9', '49483-682', 'Label image 682R-timely-cetirizine10mg-100ct-label.jpg is the 5 mg SPL image name as printed.', 'Cetirizine hydrochloride 5 mg', CET_OI),
  }),
  pack({
    id: 'timecap-b106-apap-500',
    // KYR5-d — zbar on DailyMed 252R 100 CT LABEL.jpg.
    barcode: '349483252019',
    upcNote:
      'UPC-A 349483252019 is the code under the bars on DailyMed image 252R 100 CT LABEL.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=eb4f7437-7fd8-4083-b50f-80b0d115bec9&name=252R+100+CT+LABEL.jpg).',
    productName: 'Timely Extra Strength Acetaminophen tablets 500 mg, 100 count, NDC 49483-252',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-500',
    minAge: 12,
    form: 'tablet',
    actives: [{ name: 'Acetaminophen', strength: '500 mg' }],
    flags: APAP_500,
    verdict: 'clean',
    note: 'Clean. Printed inactives are povidone, pregelatinized starch, sodium starch glycolate (may contain), and stearic acid. All Cleared. Ages 12+.',
    cite: dm(
      'eb4f7437-7fd8-4083-b50f-80b0d115bec9',
      '49483-252',
      'Label text 100ct. Brand code 252R on https://www.timecaplabs.com/analgesic. The SPL title string Allergy Time is not the active.',
      'Acetaminophen 500 mg',
      'povidone, pregelatinized starch, sodium starch glycolate (may contain), stearic acid',
    ),
  }),
  pack({
    id: 'timecap-b106-apap-500-dyefree',
    productName: 'Timely Acetaminophen caplets 500 mg dye free, 100 count, NDC 49483-479',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-500-dyefree',
    minAge: 12,
    form: 'caplet',
    actives: [{ name: 'Acetaminophen', strength: '500 mg' }],
    flags: APAP_DYE_FREE,
    verdict: 'caution',
    note: 'Caution. Driver is mineral oil (paraffin / mineral-oil Caution, not the topical ointment Cleared row). Sodium starch glycolate is printed as may contain. Ages 12+.',
    cite: dm(
      '42c4f0b2-6483-0f3c-e063-6294a90a140f',
      '49483-479',
      'Label image 479R_100s_PDP.jpg.',
      'Acetaminophen 500 mg',
      'hypromellose, mineral oil, povidone, pregelatinized starch, sodium starch glycolate (may contain), stearic acid',
    ),
  }),
  pack({
    id: 'timecap-b106-apap-650-er',
    // KYR5-d — zbar on DailyMed apap-100s-label.jpg.
    barcode: '349483699012',
    upcNote:
      'UPC-A 349483699012 is the code under the bars on DailyMed image apap-100s-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=cd4d0ad4-7206-94c8-e053-2a95a90aaa14&name=apap-100s-label.jpg).',
    productName: 'Timely Acetaminophen extended-release caplets 650 mg, 100 count, NDC 49483-699',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-650-er',
    minAge: 18,
    form: 'extended-release caplet',
    actives: [{ name: 'Acetaminophen', strength: '650 mg' }],
    flags: APAP_ER,
    verdict: 'avoid',
    note: ER_NOTE,
    cite: dm(SET_ER, '49483-699', 'Label image apap-100s-label.jpg. Brand codes 699R and 704R share this inactive paragraph.', 'Acetaminophen 650 mg', ER_OI),
  }),
  pack({
    id: 'timecap-b106-apap-650-er-24',
    // KYR5-d — zbar on DailyMed 699R-Timely-APAPArthritis-24s-IFC.jpg.
    barcode: '349483699425',
    upcNote:
      'UPC-A 349483699425 is the code under the bars on DailyMed image 699R-Timely-APAPArthritis-24s-IFC.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=cd4d0ad4-7206-94c8-e053-2a95a90aaa14&name=699R-Timely-APAPArthritis-24s-IFC.jpg).',
    productName: 'Timely Acetaminophen extended-release caplets 650 mg, 24 count, NDC 49483-699',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-650-er',
    minAge: 18,
    form: 'extended-release caplet',
    actives: [{ name: 'Acetaminophen', strength: '650 mg' }],
    flags: APAP_ER,
    verdict: 'avoid',
    note: ER_NOTE,
    cite: dm(SET_ER, '49483-699', 'Label image 699R-Timely-APAPArthritis-24s-Label.jpg.', 'Acetaminophen 650 mg', ER_OI),
  }),
  pack({
    id: 'timecap-b106-apap-650-er-50',
    productName: 'Timely Acetaminophen extended-release caplets 650 mg, 50 count, NDC 49483-699',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-650-er',
    minAge: 18,
    form: 'extended-release caplet',
    actives: [{ name: 'Acetaminophen', strength: '650 mg' }],
    flags: APAP_ER,
    verdict: 'avoid',
    note: ER_NOTE,
    cite: dm(SET_ER, '49483-699', 'Label image 699-50ct.jpg. The IFC on the same SPL is 699-50ct-IFC.jpg.', 'Acetaminophen 650 mg', ER_OI),
  }),
  pack({
    id: 'timecap-b106-apap-650-er-400',
    // KYR5-d — zbar on DailyMed apap-400s-label.jpg.
    barcode: '349483699401',
    upcNote:
      'UPC-A 349483699401 is the code under the bars on DailyMed image apap-400s-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=cd4d0ad4-7206-94c8-e053-2a95a90aaa14&name=apap-400s-label.jpg).',
    productName: 'Timely Acetaminophen extended-release caplets 650 mg, 400 count, NDC 49483-699',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-650-er',
    minAge: 18,
    form: 'extended-release caplet',
    actives: [{ name: 'Acetaminophen', strength: '650 mg' }],
    flags: APAP_ER,
    verdict: 'avoid',
    note: ER_NOTE,
    cite: dm(SET_ER, '49483-699', 'Label image apap-400s-label.jpg.', 'Acetaminophen 650 mg', ER_OI),
  }),
  pack({
    id: 'timecap-b106-apap-650-er-muscle-50',
    // KYR5-d — zbar on DailyMed 704R-Timely-APAPMuscle-50s-IFC.jpg.
    barcode: '349483704051',
    upcNote:
      'UPC-A 349483704051 is the code under the bars on DailyMed image 704R-Timely-APAPMuscle-50s-IFC.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=cd4d0ad4-7206-94c8-e053-2a95a90aaa14&name=704R-Timely-APAPMuscle-50s-IFC.jpg).',
    productName: 'Timely Acetaminophen extended-release caplets 650 mg, 50 count, NDC 49483-704',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-650-er',
    minAge: 18,
    form: 'extended-release caplet',
    actives: [{ name: 'Acetaminophen', strength: '650 mg' }],
    flags: APAP_ER,
    verdict: 'avoid',
    note: ER_NOTE,
    cite: dm(SET_ER, '49483-704', 'Label image 704R-Timely-APAPMuscle-50s-Label.jpg. Brand code 704R. Same inactive paragraph as 699R.', 'Acetaminophen 650 mg', ER_OI),
  }),
  pack({
    id: 'timecap-b106-apap-650-er-225',
    // KYR5-d — zbar on DailyMed 699R-Timely-APAPArthritis-225s-Label.jpg.
    barcode: '349483699265',
    upcNote:
      'UPC-A 349483699265 is the code under the bars on DailyMed image 699R-Timely-APAPArthritis-225s-Label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=cd4d0ad4-7206-94c8-e053-2a95a90aaa14&name=699R-Timely-APAPArthritis-225s-Label.jpg).',
    productName: 'Timely Acetaminophen extended-release caplets 650 mg, 225 count, NDC 49483-699',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-650-er',
    minAge: 18,
    form: 'extended-release caplet',
    actives: [{ name: 'Acetaminophen', strength: '650 mg' }],
    flags: APAP_ER,
    verdict: 'avoid',
    note: ER_NOTE,
    cite: dm(SET_ER, '49483-699', 'Label image 699R-Timely-APAPArthritis-225s-Label.jpg.', 'Acetaminophen 650 mg', ER_OI),
  }),
  pack({
    id: 'timecap-b106-day-cold-48',
    productName: 'Timely Daytime cold and flu softgels, acetaminophen 325 mg / dextromethorphan HBr 10 mg / phenylephrine HCl 5 mg, 48 count, NDC 49483-693',
    category: 'Cold & Flu',
    formulaId: 'timecap-b106-day-cold-48',
    minAge: 4,
    form: 'softgel',
    actives: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Dextromethorphan HBr', strength: '10 mg' },
      { name: 'Phenylephrine HCl', strength: '5 mg' },
    ],
    flags: DAY_COLD,
    verdict: 'avoid',
    note: 'Avoid. Drivers are FD&C red #40, FD&C yellow #6, and titanium dioxide (High). One daytime panel. Not the day/night kit. Label directions include children 4 years and older.',
    cite: dm(
      'fd24653e-c4fa-3c09-e053-6394a90aaa9e',
      '49483-693',
      'Label image 693T_49483-693_48ct_IFC.jpg.',
      'Acetaminophen 325 mg, dextromethorphan HBr 10 mg, phenylephrine HCl 5 mg',
      'FD&C red #40, FD&C yellow #6, gelatin, glycerin, polyethylene glycol, povidone, propylene glycol, purified water, shellac, sorbitol sorbitan solution, titanium dioxide',
    ),
  }),
  pack({
    id: 'timecap-b106-famotidine-20',
    productName: 'Timely Famotidine tablets USP 20 mg, 200 count, NDC 49483-720',
    category: 'Digestive',
    formulaId: 'timecap-b106-famotidine-20',
    minAge: 12,
    form: 'tablet',
    actives: [{ name: 'Famotidine', strength: '20 mg' }],
    flags: FAMOTIDINE,
    verdict: 'avoid',
    note: 'Avoid. Drivers are talc and titanium dioxide (High). Carnauba wax and colloidal silicon dioxide are not the Avoid drivers. Ages 12+.',
    cite: dm(
      'fe25e1e2-7158-6fe0-e053-6394a90a3bb1',
      '49483-720',
      'Label image 720R_49483-720_200ct_LBL.jpg.',
      'Famotidine 20 mg',
      'carnauba wax, colloidal silicon dioxide, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, pregelatinized starch, talc, titanium dioxide',
    ),
  }),
  pack({
    id: 'timecap-b106-famotidine-20-100',
    // KYR5-d — zbar on DailyMed timely-famo-100.jpg.
    barcode: '349483720013',
    upcNote:
      'UPC-A 349483720013 is the code under the bars on DailyMed image timely-famo-100.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=fe25e1e2-7158-6fe0-e053-6394a90a3bb1&name=timely-famo-100.jpg).',
    productName: 'Timely Famotidine tablets USP 20 mg, 100 count, NDC 49483-720',
    category: 'Digestive',
    formulaId: 'timecap-b106-famotidine-20',
    minAge: 12,
    form: 'tablet',
    actives: [{ name: 'Famotidine', strength: '20 mg' }],
    flags: FAMOTIDINE,
    verdict: 'avoid',
    note: 'Avoid. Drivers are talc and titanium dioxide (High). Carnauba wax and colloidal silicon dioxide are not the Avoid drivers. Ages 12+.',
    cite: dm(
      'fe25e1e2-7158-6fe0-e053-6394a90a3bb1',
      '49483-720',
      'Label image timely-famo-100.jpg.',
      'Famotidine 20 mg',
      'carnauba wax, colloidal silicon dioxide, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, pregelatinized starch, talc, titanium dioxide',
    ),
  }),
  pack({
    id: 'timecap-b106-mucosa-dm',
    productName: 'Timely Mucosa DM tablets, guaifenesin 400 mg / dextromethorphan HBr 20 mg, 200 count, NDC 49483-280',
    category: 'Cold & Flu',
    formulaId: 'timecap-b106-mucosa-dm',
    minAge: 12,
    form: 'tablet',
    actives: [
      { name: 'Guaifenesin', strength: '400 mg' },
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
    ],
    flags: MUCOSA,
    verdict: 'caution',
    note: 'Caution. Drivers are colloidal silicon dioxide, silicon dioxide, and maltodextrin (Limited). No High inactive. The guaifenesin-only 400 mg panel is a separate formulaId.',
    cite: dm(
      '62c1f4aa-6571-414c-9a58-31e107b7db97',
      '49483-280',
      'Label image 280R-200ct. Brand code 280R.',
      'Guaifenesin 400 mg, dextromethorphan HBr 20 mg',
      'colloidal silicon dioxide, magnesium stearate, maltodextrin, microcrystalline cellulose, povidone, silicon dioxide, sodium starch glycolate, stearic acid',
    ),
  }),
  pack({
    id: 'timecap-b106-guaifenesin-400',
    productName: 'Timely Mucosa tablets, guaifenesin 400 mg, 200 count, NDC 49483-272',
    category: 'Cold & Flu',
    formulaId: 'timecap-b106-guaifenesin-400',
    minAge: 12,
    form: 'tablet',
    actives: [{ name: 'Guaifenesin', strength: '400 mg' }],
    flags: MUCOSA,
    verdict: 'caution',
    note: 'Caution. Drivers are colloidal silicon dioxide, silicon dioxide, and maltodextrin (Limited). No High inactive. Same printed inactive list as Mucosa DM. Different active, so a separate formulaId.',
    cite: dm(
      'd34ef2e8-adc2-48e5-a572-e354937daec6',
      '49483-272',
      'Label image 272R-Timely-200s-label.jpg. Brand code 272R.',
      'Guaifenesin 400 mg',
      'colloidal silicon dioxide, magnesium stearate, maltodextrin, microcrystalline cellulose, povidone, silicon dioxide, sodium starch glycolate, stearic acid',
    ),
  }),
  pack({
    id: 'timecap-b106-dph-25',
    productName: 'Timely Diphenhydramine HCl 25 mg caplets, 100 count, NDC 49483-061',
    category: 'Allergies',
    formulaId: 'timecap-b106-dph-25',
    minAge: 6,
    form: 'caplet',
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH,
    verdict: 'avoid',
    note: DPH_NOTE,
    cite: dm(SET_DPH, '49483-061', 'Label image 160R-100ct. Brand code 160R.', 'Diphenhydramine HCl 25 mg', DPH_OI),
  }),
  pack({
    id: 'timecap-b106-dph-25-24',
    productName: 'Timely Diphenhydramine HCl 25 mg caplets, 24 count, NDC 49483-061',
    category: 'Allergies',
    formulaId: 'timecap-b106-dph-25',
    minAge: 6,
    form: 'caplet',
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH,
    verdict: 'avoid',
    note: DPH_NOTE,
    cite: dm(SET_DPH, '49483-061', 'Label image 160R-24ct. Brand code 160R.', 'Diphenhydramine HCl 25 mg', DPH_OI),
  }),
  pack({
    id: 'timecap-b106-dph-25-365',
    productName: 'Timely Diphenhydramine HCl 25 mg caplets, 365 count, NDC 49483-061',
    category: 'Allergies',
    formulaId: 'timecap-b106-dph-25',
    minAge: 6,
    form: 'caplet',
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH,
    verdict: 'avoid',
    note: DPH_NOTE,
    cite: dm(SET_DPH, '49483-061', 'Label image 160R-365ct. Brand code 160R.', 'Diphenhydramine HCl 25 mg', DPH_OI),
  }),
  pack({
    id: 'timecap-b106-guaif-er-600',
    // KYR5-d — zbar on DailyMed guaifenesin-600mg-500ct-label.jpg.
    barcode: '349483723502',
    upcNote:
      'UPC-A 349483723502 is the code under the bars on DailyMed image guaifenesin-600mg-500ct-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=10c42869-7df0-3046-e063-6394a90aa679&name=guaifenesin-600mg-500ct-label.jpg).',
    productName: 'TIME-Cap Labs Guaifenesin extended-release tablets 600 mg, 500 count, NDC 49483-723',
    category: 'Cold & Flu',
    formulaId: 'timecap-b106-guaif-er-600',
    minAge: 12,
    form: 'extended-release tablet',
    actives: [{ name: 'Guaifenesin', strength: '600 mg' }],
    flags: GUAIF_ER,
    verdict: 'avoid',
    note: 'Avoid. Driver is FD&C blue No. 1 aluminum lake (High). The 1200 mg strength on this SPL prints the same inactive paragraph.',
    cite: dm(
      '10c42869-7df0-3046-e063-6394a90aa679',
      '49483-723',
      'Label image guaifenesin-600mg-500ct-label.jpg.',
      'Guaifenesin 600 mg',
      'colloidal silicon dioxide, copovidone, FD&C blue No. 1 aluminum lake, hypromellose, magnesium stearate, maltodextrin, microcrystalline cellulose, povidone (K-30), sodium starch glycolate, stearic acid',
    ),
  }),
  pack({
    id: 'timecap-b106-guaif-er-1200',
    // KYR5-d — zbar on DailyMed guaifenesin-1200mg-70ct-label.jpg.
    barcode: '349483724707',
    upcNote:
      'UPC-A 349483724707 is the code under the bars on DailyMed image guaifenesin-1200mg-70ct-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=10c42869-7df0-3046-e063-6394a90aa679&name=guaifenesin-1200mg-70ct-label.jpg).',
    productName: 'TIME-Cap Labs Guaifenesin extended-release tablets 1200 mg, 70 count, NDC 49483-724',
    category: 'Cold & Flu',
    formulaId: 'timecap-b106-guaif-er-600',
    minAge: 12,
    form: 'extended-release tablet',
    actives: [{ name: 'Guaifenesin', strength: '1200 mg' }],
    flags: GUAIF_ER,
    verdict: 'avoid',
    note: 'Avoid. Driver is FD&C blue No. 1 aluminum lake (High). Same inactive paragraph as the 600 mg strength.',
    cite: dm(
      '10c42869-7df0-3046-e063-6394a90aa679',
      '49483-724',
      'Label image guaifenesin-1200mg-70ct-label.jpg.',
      'Guaifenesin 1200 mg',
      'colloidal silicon dioxide, copovidone, FD&C blue No. 1 aluminum lake, hypromellose, magnesium stearate, maltodextrin, microcrystalline cellulose, povidone (K-30), sodium starch glycolate, stearic acid',
    ),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown',
    // KYR5-d — zbar on DailyMed 601R-Timely-Ibuprofen Tablet-100s-Label.jpg.
    barcode: '349483601015',
    upcNote:
      'UPC-A 349483601015 is the code under the bars on DailyMed image 601R-Timely-Ibuprofen Tablet-100s-Label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=f58d35f9-e44b-417b-98ce-0766b537cd2f&name=601R-Timely-Ibuprofen+Tablet-100s-Label.jpg).',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated tablets, 100 count, NDC 49483-601',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated tablet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-601', 'Label image Tablets-100s-Label.jpg. Brand code 601R round brown. One inactive paragraph covers 49483-114, 49483-600, and 49483-601.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown-tab-50',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated tablets, 50 count, NDC 49483-601',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated tablet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-601', 'Label image Tablet-50s-Label.jpg.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown-tab-200',
    // KYR5-d — zbar on DailyMed 601R-Timely-Ibuprofen Tablets-200s-Label.jpg.
    barcode: '349483114171',
    upcNote:
      'UPC-A 349483114171 is the code under the bars on DailyMed image 601R-Timely-Ibuprofen Tablets-200s-Label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=f58d35f9-e44b-417b-98ce-0766b537cd2f&name=601R-Timely-Ibuprofen+Tablets-200s-Label.jpg).',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated tablets, 200 count, NDC 49483-601',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated tablet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-601', 'Label image Tablets-200s-Label.jpg.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown-tab-500',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated tablets, 500 count, NDC 49483-601',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated tablet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-601', 'Label image Tablets-500s-Label.jpg.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown-tab-1000',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated tablets, 1000 count, NDC 49483-601',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated tablet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-601', 'Label image Tablets-1000s-Label.jpg.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown-cap-50',
    // KYR5-d — zbar on DailyMed 600R-Timely-Ibuprofen Caplet-50s-Label.jpg.
    barcode: '349483600056',
    upcNote:
      'UPC-A 349483600056 is the code under the bars on DailyMed image 600R-Timely-Ibuprofen Caplet-50s-Label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=f58d35f9-e44b-417b-98ce-0766b537cd2f&name=600R-Timely-Ibuprofen+Caplet-50s-Label.jpg).',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated caplets, 50 count, NDC 49483-600',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated caplet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-600', 'Label image Caplet-50s-Label.jpg. Brand code 600R capsule-shaped brown.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown-cap-100',
    // KYR5-d — zbar on DailyMed 600R-Timely-Ibuprofen Caplet-100s-Label.jpg.
    barcode: '349483600018',
    upcNote:
      'UPC-A 349483600018 is the code under the bars on DailyMed image 600R-Timely-Ibuprofen Caplet-100s-Label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=f58d35f9-e44b-417b-98ce-0766b537cd2f&name=600R-Timely-Ibuprofen+Caplet-100s-Label.jpg).',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated caplets, 100 count, NDC 49483-600',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated caplet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-600', 'Label image Caplet-100s-Label.jpg. Brand code 600R.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-ibu-200-brown-cap-500',
    // KYR5-d — zbar on DailyMed 600R-Timely-Ibuprofen Caplet-500s-Label.jpg.
    barcode: '349483600506',
    upcNote:
      'UPC-A 349483600506 is the code under the bars on DailyMed image 600R-Timely-Ibuprofen Caplet-500s-Label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=f58d35f9-e44b-417b-98ce-0766b537cd2f&name=600R-Timely-Ibuprofen+Caplet-500s-Label.jpg).',
    productName: 'TIME-Cap Labs Ibuprofen 200 mg brown film-coated caplets, 500 count, NDC 49483-600',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-ibu-200-brown',
    minAge: 12,
    form: 'film-coated caplet',
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_BROWN,
    verdict: 'avoid',
    note: BROWN_NOTE,
    cite: dm(SET_BROWN, '49483-600', 'Label image Caplet-500s-Label.jpg. Brand code 600R.', 'Ibuprofen 200 mg', BROWN_OI),
  }),
  pack({
    id: 'timecap-b106-apap-500-gelcap',
    productName: 'Timely Extra Strength Acetaminophen 500 mg gelcaps, 100 count, NDC 49483-673',
    category: 'Pain & Fever',
    formulaId: 'timecap-b106-apap-500-gelcap',
    minAge: 12,
    form: 'gelcap',
    actives: [{ name: 'Acetaminophen', strength: '500 mg' }],
    flags: GELCAP,
    verdict: 'avoid',
    note: 'Avoid. Drivers are D&C red #33, FD&C blue #1, FD&C red #40, FD&C yellow #6, talc, and titanium dioxide (High). Ages 12+.',
    cite: dm(
      '58840cf4-aceb-c7cf-e063-6294a90a5ff4',
      '49483-673',
      'Label text 100 count. Setid 48912649 prints the same inactive list and is not a second row.',
      'Acetaminophen 500 mg',
      'colloidal anhydrous silica, croscarmellose sodium, D&C red #33, FD&C blue #1, FD&C red #40, FD&C yellow #6, ferric oxide red, ferric oxide yellow, ferrosoferric oxide, gelatin, hypromellose, polyethylene glycol, povidone, pregelatinized starch, stearic acid, talc, titanium dioxide',
    ),
  }),
  pack({
    id: 'timecap-b106-senna-8-6',
    productName: 'Timely Senna-Time tablets, sennosides 8.6 mg, 100 count, NDC 49483-080',
    category: 'Digestive',
    formulaId: 'timecap-b106-senna-8-6',
    minAge: 2,
    form: 'coated tablet',
    actives: [{ name: 'Sennosides', strength: '8.6 mg' }],
    flags: SENNA_86,
    verdict: 'caution',
    note: 'Caution. Driver is mineral oil (paraffin / mineral-oil Caution, not the topical ointment Cleared row). Label directions include children 2 years and older. Brand code 191R.',
    cite: dm(
      '18ec8127-422c-4c1a-8331-58dabce69969',
      '49483-080',
      'Label image 191R-100ct. https://www.timecaplabs.com/laxative.',
      'Sennosides 8.6 mg',
      'croscarmellose sodium, dibasic calcium phosphate dihydrate, hypromellose, magnesium stearate, microcrystalline cellulose, mineral oil',
    ),
  }),
  pack({
    id: 'timecap-b106-senna-8-6-1000',
    productName: 'Timely Senna-Time tablets, sennosides 8.6 mg, 1000 count, NDC 49483-080',
    category: 'Digestive',
    formulaId: 'timecap-b106-senna-8-6',
    minAge: 2,
    form: 'coated tablet',
    actives: [{ name: 'Sennosides', strength: '8.6 mg' }],
    flags: SENNA_86,
    verdict: 'caution',
    note: 'Caution. Driver is mineral oil (paraffin / mineral-oil Caution, not the topical ointment Cleared row). Label directions include children 2 years and older. Brand code 191R.',
    cite: dm(
      '18ec8127-422c-4c1a-8331-58dabce69969',
      '49483-080',
      'Label image 191R-1000ct. https://www.timecaplabs.com/laxative.',
      'Sennosides 8.6 mg',
      'croscarmellose sodium, dibasic calcium phosphate dihydrate, hypromellose, magnesium stearate, microcrystalline cellulose, mineral oil',
    ),
  }),
  pack({
    id: 'timecap-b106-senna-s',
    // KYR5-d — zbar on DailyMed 192R-Timely-SennaS-1000-bottle-label.jpg.
    barcode: '349483081107',
    upcNote:
      'UPC-A 349483081107 is the code under the bars on DailyMed image 192R-Timely-SennaS-1000-bottle-label.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=dc491692-8d3a-4ccd-a17d-4c630f122595&name=192R-Timely-SennaS-1000-bottle-label.jpg).',
    productName: 'Timely Senna-Time S tablets, docusate sodium 50 mg / sennosides 8.6 mg, 1000 count, NDC 49483-081',
    category: 'Digestive',
    formulaId: 'timecap-b106-senna-s',
    minAge: 2,
    form: 'film-coated tablet',
    actives: [
      { name: 'Docusate sodium', strength: '50 mg' },
      { name: 'Sennosides', strength: '8.6 mg' },
    ],
    flags: SENNA_S,
    verdict: 'avoid',
    note: 'Avoid. Drivers are D&C yellow #10 aluminum lake, FD&C yellow #6 aluminum lake, and titanium dioxide (High). Brand code 192R.',
    cite: dm(
      'dc491692-8d3a-4ccd-a17d-4c630f122595',
      '49483-081',
      'Label image 192R-Timely-SennaS-1000-bottle-label.jpg. https://www.timecaplabs.com/laxative.',
      'Docusate sodium 50 mg, sennosides 8.6 mg',
      'carnauba wax, colloidal silicon dioxide, croscarmellose sodium, dibasic calcium phosphate dihydrate, D&C yellow #10 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, sodium benzoate, stearic acid, titanium dioxide',
    ),
  }),
];

export const BATCH106_KYR6B_AMAZON_3P_TIME_CAP: RatingRecord[] = COMPACT.map(expand);

const NO_OI =
  'SKIPPED no_OI. The brand category page was opened. Page text does not print an inactive line. No DailyMed SPL for this NDC was in the TIME CAP LABORATORIES labeler set. Carousel image files on that page were not a readable Drug Facts paragraph. HTML product blurbs are not Other Ingredients. OI not invented. NDC is not a UPC.';

export const BATCH106_SKIPPED_NO_OI: { sku: string; reason: string }[] = [
  { sku: '011R Aspirin 325 mg FC tablets, NDC 49483-011-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '328R Aspirin 81 mg EC peach tablets, NDC 49483-328-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '331R Aspirin 325 mg EC orange tablets, NDC 49483-331-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '334R Aspirin 81 mg chewable orange tablets, NDC 49483-334-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '340R Acetaminophen 325 mg tablets, NDC 49483-340-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '341R Extra Strength Acetaminophen caplets, NDC 49483-341-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '347R Comfort-Time caplets, NDC 49483-347-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '356R Time-Gesic tablets, NDC 49483-356-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '370R Extra Pain Relief tablets, NDC 49483-370-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '382R Aspirin 500 mg FC tablets, NDC 49483-382-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '387R Aspirin 81 mg EC yellow heart tablets, NDC 49483-387-00', reason: `${NO_OI} URL https://www.timecaplabs.com/analgesic.` },
  { sku: '151R Bisacodyl 5 mg delayed-release pink tablets, NDC 49483-151-00', reason: `${NO_OI} URL https://www.timecaplabs.com/laxative.` },
  { sku: '246R Correct bisacodyl 5 mg tablets, NDC 49483-046-00', reason: `${NO_OI} URL https://www.timecaplabs.com/laxative.` },
  { sku: '239R Cold Time PE tablets, NDC 49483-127-00', reason: `${NO_OI} URL https://www.timecaplabs.com/cold-allergy.` },
  { sku: '242R Allergy-Time chlorpheniramine maleate 4 mg tablets, NDC 49483-242-00', reason: `${NO_OI} URL https://www.timecaplabs.com/cold-allergy.` },
  { sku: '034T C-500 SR ascorbic acid 500 mg capsules, NDC 49483-007-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '053T Niacin 250 mg ER capsules, NDC 49483-014-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '069T Niacin 500 mg ER capsules, NDC 49483-018-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '127R Ferrous sulfate 325 mg FC red tablets, NDC 49483-064-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '128R Ferrous sulfate 325 mg FC green tablets, NDC 49483-063-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '133R Ferrous sulfate 325 mg EC red tablets, NDC 49483-066-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '355R Slo Iron tablets, NDC 49483-355-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '415R Vitamin C tablets, ascorbic acid 500 mg, NDC 49483-415-00', reason: `${NO_OI} URL https://www.timecaplabs.com/supplements.` },
  { sku: '142T Timely Timosome Fe liposomal iron capsules, NDC 49483-142', reason: 'SKIPPED no_OI. DailyMed setid 33b7e4e2-ee88-4002-af2b-e56090066701 has no inactive paragraph. Brand supplements page does not print one. OI not invented. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=33b7e4e2-ee88-4002-af2b-e56090066701.' },
];

export const BATCH106_SKIPPED_OUT: { sku: string; reason: string }[] = [
  { sku: '612R Timely ibuprofen 200 mg tablets, setid 82aad715, NDC 49483-611 / 49483-612', reason: 'OUT. Already on MAIN as timecap-ibuprofen-200. Not rewritten.' },
  { sku: '609R Naproxen sodium 220 mg, setid 17ecaee0, NDC 49483-609', reason: 'OUT. Same inactive list as timecap-naproxen-220 already on MAIN. Not rewritten.' },
  { sku: '608R Timely naproxen sodium 220 mg, setid ab7b7b8e, NDC 49483-608', reason: 'OUT. Same inactive list as timecap-naproxen-220 already on MAIN. Not rewritten.' },
  { sku: '695T Timely daytime and nighttime cold and flu softgels, NDC 49483-695', reason: 'OUT. Dual-panel day/night. Two inactive lists on one pack. No-row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fd81dd4b-9617-f4c1-e053-6394a90a5e72.' },
  { sku: 'Timely maximum strength day cold and flu and night severe cold and flu tablets, NDC 49483-726', reason: 'OUT. Dual-panel day/night. Two inactive lists on one pack. No-row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fff69901-965c-5372-e053-6394a90a29c2.' },
  { sku: 'Albertsons acetaminophen and ibuprofen tablets, NDC 49483-716', reason: 'OUT. Store-brand private label, not a TIME-Cap / Timely consumer pack. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=08acd3bf-ad0c-f693-e063-6394a90ad8c2.' },
  { sku: '610 Ibuprofen soft gelatin capsules, setid e0a8315a, NDC 49483-610', reason: 'OUT. Same softgel inactive list as the 610T rows pinned to setid c7c51cf3. The space in the ammonium line on this SPL is not a second formula.' },
  { sku: '673T Timely acetaminophen gelcaps, setid 48912649', reason: 'OUT. Same gelcap inactive list as NDC 49483-673 on setid 58840cf4. Not a second row.' },
  { sku: '209R Peri-Time tablets, NDC 49483-097', reason: 'OUT. Inactive list is on setid 0ad617e0, but the opened label tile is the bulk code and the 100ct string on that SPL belongs to 195R. Consumer count not pinned. Count not invented. URL https://www.timecaplabs.com/laxative.' },
  { sku: '234R Pseudo-Time PE phenylephrine HCl 10 mg, NDC 49483-234', reason: 'OUT. Inactive list is on setid 3116f273. Brand page is the bulk code 49483-234-00. No consumer count was printed on the opened label tile. Count not invented. URL https://www.timecaplabs.com/cold-allergy.' },
  { sku: 'Gabapentin capsules, NDC 49483-605 / 49483-606 / 49483-607', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Metformin hydrochloride extended-release tablets, NDC 49483-623 / 49483-624', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Metformin HCl tablets, NDC 49483-620 / 49483-621', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Nitro-Time nitroglycerin capsules, NDC 49483-221 / 49483-222 / 49483-223', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Fluoxetine capsules, NDC 49483-701 / 49483-702 / 49483-703', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Valacyclovir tablets, NDC 49483-690 / 49483-691', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Paricalcitol capsules, NDC 49483-687 / 49483-688 / 49483-689', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Benzonatate capsules, NDC 49483-946 / 49483-947', reason: 'OUT. Prescription. Not an OTC, vitamin, or supplement row.' },
  { sku: 'Ibuprofen 400 mg, 600 mg, and 800 mg tablets, NDC 49483-602 / 49483-603 / 49483-604', reason: 'OUT. Prescription strengths. Not the OTC 200 mg line.' },
  { sku: 'Naproxen 250 mg, 375 mg, and 500 mg tablets, NDC 49483-617 / 49483-618 / 49483-619', reason: 'OUT. Prescription strengths. Not the OTC 220 mg line already on MAIN.' },
];

export const BATCH106_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH106_SKIPPED_NO_OI,
  ...BATCH106_SKIPPED_OUT,
];

export const BATCH106_REFUSED: { sku: string; reason: string }[] = [
  { sku: 'Esomeprazole magnesium delayed-release capsules 20 mg, NDC 49483-718', reason: 'REFUSED exact panel string `eudragit`. Setid 08acf79f-f50d-8416-e063-6294a90a2704. Omeprazole-class coating maps only exact locked polymer names. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=08acf79f-f50d-8416-e063-6294a90a2704.' },
  { sku: '481R Aspirin 81 mg delayed-release tablets, NDC 49483-481', reason: 'REFUSED exact panel string `methacrylic acid and ethyl acrylate copolymer`. Setid 1acc8c1a-c746-4635-800c-de1ad758fce0. The locked string is the dispersion. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1acc8c1a-c746-4635-800c-de1ad758fce0.' },
  { sku: '342R Extra Strength Acetaminophen easy-swallow tablets, NDC 49483-342', reason: 'REFUSED exact panel string `polyethylene glycol (peg) 8000`. Setid 2569383a-4a05-4ddb-852e-b37e487ffcde. PEG 400 on that panel is locked. PEG 8000 is not. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2569383a-4a05-4ddb-852e-b37e487ffcde.' },
  { sku: 'Timely omeprazole 20 mg tablets, NDC 49483-731', reason: 'REFUSED exact panel strings `colloidal silicone dioxide`, `polyethylene glycol 6000`, `methacrylic acid and ethyl acrylate copolymer`. Setid 40906798-cd84-fbd0-e063-6294a90a1d29. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=40906798-cd84-fbd0-e063-6294a90a1d29.' },
  { sku: '697R Timely Extra Strength Acetaminophen 500 mg rapid release, 400 count, NDC 49483-697', reason: 'REFUSED exact panel string `polyethylene glycol 6000`. Setid c9f80d24-bd05-e1ce-e053-2995a90aa646. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c9f80d24-bd05-e1ce-e053-2995a90aa646.' },
  { sku: '686T Loratadine liquid-filled capsules, NDC 49483-686', reason: 'REFUSED exact panel string `mono and diglyceride of caprylic/capric acid`. Setid 85b26cf3-448c-4d4f-93a2-aa89530ec1f1. Not the locked mono- and diglycerides row. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=85b26cf3-448c-4d4f-93a2-aa89530ec1f1.' },
  { sku: '190R Sennosides 15 mg sugar-coated tablets, NDC 49483-079', reason: 'REFUSED exact panel string `calcium sulfate anhydrous`. Setid 7498f5fa-1739-bb6e-e053-2a91aa0a5404. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7498f5fa-1739-bb6e-e053-2a91aa0a5404.' },
  { sku: '195R Sennosides 25 mg sugar-coated tablets, NDC 49483-083', reason: 'REFUSED exact panel string `calcium sulfate anhydrous`. Setid 74a627fc-00e5-eb78-e053-2991aa0abacc. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=74a627fc-00e5-eb78-e053-2991aa0abacc.' },
  { sku: 'Pseudo-Time pseudoephedrine HCl 30 mg tablets, NDC 49483-016', reason: 'REFUSED exact panel string `calcium sulfate`. Setid d8dace20-752e-4686-8026-c8fc97591fa8. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d8dace20-752e-4686-8026-c8fc97591fa8.' },
  { sku: '014R Bisacodyl 5 mg delayed-release tablets, NDC 49483-003', reason: 'REFUSED exact panel strings `Acadia`, `Anhydrous Calcium Sulfate`, `Polyvinyl Acetate Phthalates`. Setid e0a9f8d9-660b-431c-8043-6d8ec81f98e5. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e0a9f8d9-660b-431c-8043-6d8ec81f98e5.' },
];

const _ROWS = BATCH106_KYR6B_AMAZON_3P_TIME_CAP;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _formulaFirst = new Set<string>();
let _new = 0;
let _reuse = 0;
for (const r of _ROWS) {
  const id = r.formulaId ?? r.id;
  if (_formulaFirst.has(id)) _reuse += 1;
  else {
    _formulaFirst.add(id);
    _new += 1;
  }
}
if (_ROWS.length !== 43) throw new Error('batch106 row tally drift');
if (_grades.clean !== 1 || _grades.caution !== 6 || _grades.avoid !== 36) {
  throw new Error('batch106 Search grade drift');
}
if (_new !== 17 || _reuse !== 26) throw new Error('batch106 NEW/REUSE drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 17) {
  throw new Error('batch106 canonical formula drift');
}
if (BATCH106_SKIPPED_NO_OI.length !== 24) throw new Error('batch106 no_OI drift');
if (BATCH106_SKIPPED_OUT.length !== 20) throw new Error('batch106 OUT drift');
if (BATCH106_SKIPPED.length !== 44) throw new Error('batch106 SKIPPED drift');
if (BATCH106_REFUSED.length !== 10) throw new Error('batch106 REFUSED drift');
if (BATCH106_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch106 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'TIME-Cap Labs')) throw new Error('batch106 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch106 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'timecap-b106-apap-500': '349483252019',
  'timecap-b106-apap-650-er': '349483699012',
  'timecap-b106-apap-650-er-225': '349483699265',
  'timecap-b106-apap-650-er-24': '349483699425',
  'timecap-b106-apap-650-er-400': '349483699401',
  'timecap-b106-apap-650-er-muscle-50': '349483704051',
  'timecap-b106-cetirizine-10': '349483692013',
  'timecap-b106-cetirizine-10-365': '349483692655',
  'timecap-b106-cetirizine-10-500': '349483692501',
  'timecap-b106-cetirizine-5': '349483682014',
  'timecap-b106-famotidine-20-100': '349483720013',
  'timecap-b106-guaif-er-1200': '349483724707',
  'timecap-b106-guaif-er-600': '349483723502',
  'timecap-b106-ibu-200-brown': '349483601015',
  'timecap-b106-ibu-200-brown-cap-100': '349483600018',
  'timecap-b106-ibu-200-brown-cap-50': '349483600056',
  'timecap-b106-ibu-200-brown-cap-500': '349483600506',
  'timecap-b106-ibu-200-brown-tab-200': '349483114171',
  'timecap-b106-ibu-200-softgel': '349483700398',
  'timecap-b106-ibu-200-softgel-120': '349483133127',
  'timecap-b106-ibu-200-softgel-160': '349483133370',
  'timecap-b106-ibu-200-softgel-200': '349483133202',
  'timecap-b106-ibu-200-softgel-300': '349483133318',
  'timecap-b106-ibu-200-softgel-80': '349483133806',
  'timecap-b106-loratadine-10': '349483732658',
  'timecap-b106-senna-s': '349483081107',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 26) throw new Error('batch106 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch106 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch106 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch106 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch106 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('timecap-b106-'))) {
  throw new Error('batch106 ids must use timecap-b106-');
}
if (_ROWS.some((r) => r.id === 'timecap-ibuprofen-200' || r.id === 'timecap-naproxen-220')) {
  throw new Error('batch106 must not rewrite the rows already on main');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch106 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch106 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch106 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch106 Clean row has a non-cleared inactive');
}
if (_ROWS.some((r) => !(r.inactiveIngredients?.length))) {
  throw new Error('batch106 missing a printed inactive');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH106_SKIPPED.map((s) => s.sku),
  ...BATCH106_REFUSED.map((s) => s.sku),
].join('\n');
if (/GoodSense|HealthA2Z|A\+Health|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch106 excluded brand leaked');
}
