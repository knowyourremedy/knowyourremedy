// DRAFT / not verified / batch 100 KYR6 HealthA2Z no_OI Google rung.
// Methodology v1.6 + MAIN §5 as of 4234f60 (Sept 25, 2026 stamps).
// Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. The 59 SKUs in BATCH98_SKIPPED_NO_OI only. No TIME-Cap.
// No GoodSense. DailyMed and a2z-life.com were not re-walked. A DailyMed
// page was opened only when this Google pass cited it and batch98 had not
// pinned that setid. An AI blurb is not OI. A search snippet is not OI.
// HTML marketing bullets are not OI. NDC is not a UPC. No GTIN-12 printed
// on the panels pinned here. BigCommerce schema UPC fields were not copied.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. A pack that shares an
// inactive line already on MAIN, or written above in this file, reuses
// that formulaId. Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch99. No house Amazon. No toothpaste. No Sprouts.
// No factory. Oil form split stays as it is on main.
//
// TALLY (unverified drafts in THIS file): 14 rows —
// Clean 0 / Caution 8 / Avoid 6.
// NEW 4 / REUSE-formula 10 /
// SKIPPED 46 (no_OI leftover 46 / OUT 0) /
// REFUSED 3.
// Search grade: Clean 0 / Caution 8 / Avoid 6.
// WebSearch calls issued this pass: 150 (119 returned results, 31 tool
// errors). Every SKU had at least two distinct query attempts.
// Panels that yielded rows: DailyMed setids dbbc535f, 731f8608, 7af63769,
// 423a8445. The bisacodyl refuse is DailyMed setid 46a377f5.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';
import { BATCH98_SKIPPED_NO_OI } from './batch98-kyr6-healtha2z-no-oi';

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
  carnauba: 'Methodology §5 Cleared (carnauba wax).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name.',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
  lactoseAnhydrous:
    'Methodology §5 Cleared (lactose / lactose monohydrate). Lactose anhydrous is that spelling (Sept 25, 2026). Not a new grade.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.',
  pegTypo:
    'Methodology §5 Moderate (PEGs / polyethylene glycol). Polyethylene glylcol maps here (Sept 25, 2026). Not a new grade. Not the Avoid driver.',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  sio2: 'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  tio2: 'Methodology §5 High (titanium dioxide).',
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

const SET_DPH = 'dbbc535f-515a-4d9b-b799-34e60f5230bb';
const SET_MUCUS = '731f8608-ad5b-491e-a4d4-2bb0c423fed5';
const SET_COLD = '7af63769-fa56-4f1f-a2ad-5b4c108c8e4f';
const SET_PM = '423a8445-964c-4cdb-889a-f391ca5253e7';

const DPH_ID = 'healtha2z-b100-dph-25-24';
const MUCUS_ID = 'healtha2z-b100-mucus-dm-30x24';
const COLD_ID = 'healtha2z-b100-cold-allergy-24';
const PM_ID = 'healtha2z-b100-apap-pm-20x24';

const DPH_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['FD&C blue #1 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['lactose', 'cleared', 'lactose'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['titanium dioxide', 'high', 'tio2'],
];

const MUCUS_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['maltodextrin', 'limited', 'maltodextrin'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['povidone', 'cleared', 'povidone'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['stearic acid', 'cleared', 'stearic'],
];

const COLD_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['lactose anhydrous', 'cleared', 'lactoseAnhydrous'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['stearic acid', 'cleared', 'stearic'],
];

const PM_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['FD&C blue #1 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glylcol', 'moderate', 'pegTypo'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['stearic acid', 'cleared', 'stearic'],
  ['titanium dioxide', 'high', 'tio2'],
  ['carnauba wax', 'cleared', 'carnauba'],
  ['FD&C blue #2 aluminum lake', 'high', 'dye'],
  ['polysorbate 80', 'moderate', 'ps80'],
];

const CITE_DPH = `DailyMed SPL (${DM}${SET_DPH}; setid ${SET_DPH}; Allegiant Health). Inactive ingredients: croscarmellose sodium, FD&C blue #1 aluminum lake, hypromellose, lactose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, silicon dioxide, titanium dioxide. Not the 25 mg softgel setid 9746911a. No GTIN-12.`;
const CITE_MUCUS = `DailyMed SPL (${DM}${SET_MUCUS}; setid ${SET_MUCUS}; Allegiant Health). Inactive ingredients: croscarmellose sodium, magnesium stearate, maltodextrin, microcrystalline cellulose, povidone, silicon dioxide, stearic acid. This paragraph includes magnesium stearate, so it is not healtha2z-b98-mucus-dm-200. A Target search snippet for a 10-count listed extra may-contain words; the opened Target page did not render a second panel, and that snippet was not used. No GTIN-12.`;
const CITE_COLD = `DailyMed SPL (${DM}${SET_COLD}; setid ${SET_COLD}; Allegiant Health; NDC 69168-406-93 is 24 tablets in a blister). Inactive ingredients: croscarmellose sodium, lactose anhydrous, magnesium stearate, microcrystalline cellulose, silicon dioxide, stearic acid. The principal display reads Cold and Allergy. The inactive paragraph has no dye. No GTIN-12.`;
const CITE_PM = `DailyMed SPL (${DM}${SET_PM}; setid ${SET_PM}; Allegiant Health; NDC 69168-393-26 is 20 caplets). Inactive ingredients: croscarmellose sodium, FD&C blue #1 aluminum lake, hypromellose, microcrystalline cellulose, polyethylene glylcol, povidone, pregelatinized starch, silicon dioxide, stearic acid, titanium dioxide. May contain: carnauba wax, FD&C blue #2 aluminum lake, polysorbate 80. Not healtha2z-b99-apap-pm-es (setid 91ba1618), which does not print the may-contain line. No GTIN-12.`;

const DPH_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C blue #1 aluminum lake, titanium dioxide. Polyethylene glycol is Moderate and is not the Avoid driver. Silicon dioxide is Limited and is not the Avoid driver. Adults and children 12 years and over. Under 12: do not use.';
const MUCUS_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Drivers: maltodextrin, silicon dioxide. Magnesium stearate is on this SPL and is Cleared. Limited-only. Adults and children 12 years and older. Under 12: do not use.';
const COLD_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Driver: silicon dioxide. Lactose anhydrous is the Sept 25 lactose map. No dye on this paragraph. Adults and children 12 years and older. Under 12: consult a doctor.';
const PM_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C blue #1 aluminum lake, FD&C blue #2 aluminum lake, titanium dioxide. Polyethylene glylcol is the Sept 25 PEG map. Polysorbate 80 is Moderate and is not an Avoid driver. The may-contain line is part of this Drug Facts paragraph. Adults and children 12 years and over. Under 12: do not use. Stay under 4 g/day acetaminophen.';

const COMPACT: Compact[] = [
  {
    id: DPH_ID,
    productName:
      'HealthA2Z Sleep Aid, diphenhydramine HCl 25 mg, 24 caplets, NDC 69168-263-93 (1 pack)',
    category: 'Sleep',
    formulaId: DPH_ID,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_FLAGS,
    verdict: 'avoid',
    note: DPH_NOTE,
    cite: CITE_DPH + ' NDC 69168-263-93 is 24 in 1 box.',
  },
  {
    id: 'healtha2z-b100-dph-25-24x3',
    productName:
      'HealthA2Z Sleep Aid, diphenhydramine HCl 25 mg, 3 packs of 24 caplets (72), NDC 69168-263-93',
    category: 'Sleep',
    formulaId: DPH_ID,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_FLAGS,
    verdict: 'avoid',
    note: DPH_NOTE + ' Three packs on the 24-caplet option page.',
    cite: CITE_DPH + ' NDC 69168-263-93 is the 24-count box.',
  },
  {
    id: 'healtha2z-b100-dph-25-24x6',
    productName:
      'HealthA2Z Sleep Aid, diphenhydramine HCl 25 mg, 6 packs of 24 caplets (144), NDC 69168-263-93',
    category: 'Sleep',
    formulaId: DPH_ID,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_FLAGS,
    verdict: 'avoid',
    note: DPH_NOTE + ' Six packs on the 24-caplet option page.',
    cite: CITE_DPH + ' NDC 69168-263-93 is the 24-count box.',
  },
  {
    id: 'healtha2z-b100-dph-25-30x24',
    productName:
      'HealthA2Z Sleep Aid, diphenhydramine HCl 25 mg, 24 packs of 30 caplets (720), NDC 69168-263-30 (FP0549)',
    category: 'Sleep',
    formulaId: DPH_ID,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_FLAGS,
    verdict: 'avoid',
    note: DPH_NOTE + ' The inner bottle is the 30-count on this setid.',
    cite: CITE_DPH + ' NDC 69168-263-30 is 30 in 1 bottle.',
  },
  {
    id: 'healtha2z-b100-dph-25-24x24',
    productName:
      'HealthA2Z Sleep Aid, diphenhydramine HCl 25 mg, 24 packs of 24 caplets (576), NDC 69168-263-93 (FP0508)',
    category: 'Sleep',
    formulaId: DPH_ID,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    flags: DPH_FLAGS,
    verdict: 'avoid',
    note: DPH_NOTE + ' The inner box is the 24-count on this setid.',
    cite: CITE_DPH + ' NDC 69168-263-93 is 24 in 1 box.',
  },
  {
    id: MUCUS_ID,
    productName:
      'HealthA2Z Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 24 packs of 30 tablets (720), NDC 69168-432-30 (FP1125)',
    category: 'Cold & Flu',
    formulaId: MUCUS_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
      { name: 'Guaifenesin', strength: '400 mg' },
    ],
    flags: MUCUS_FLAGS,
    verdict: 'caution',
    note: MUCUS_NOTE + ' The inner bottle is the 30-count on this setid.',
    cite: CITE_MUCUS + ' NDC 69168-432-30 is 30 in 1 bottle.',
  },
  {
    id: 'healtha2z-b100-mucus-dm-20x24',
    productName:
      'HealthA2Z Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 24 packs of 20 tablets (480), NDC 69168-432-26 (FP0585)',
    category: 'Cold & Flu',
    formulaId: MUCUS_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
      { name: 'Guaifenesin', strength: '400 mg' },
    ],
    flags: MUCUS_FLAGS,
    verdict: 'caution',
    note: MUCUS_NOTE + ' The inner bottle is the 20-count on this setid.',
    cite: CITE_MUCUS + ' NDC 69168-432-26 is 20 in 1 bottle.',
  },
  {
    id: 'healtha2z-b100-mucus-dm-10',
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168345072',
    upcNote:
      'UPC-A 369168345072 is the UPC field on the a2z-life.com page for Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 10 tablets. The page chooser also lists a 3-pack and a 6-pack, so the code is attached only to the single pack (https://a2z-life.com/healtha2z-mucus-relief-dm-dextromethorphan-hbr-20mg-guaifenesin-400mg-10-caplets/). Founder-confirmed.',
    productName:
      'HealthA2Z Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 10 tablets, NDC 69168-432-07 (FPA049E, 1 pack)',
    category: 'Cold & Flu',
    formulaId: MUCUS_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
      { name: 'Guaifenesin', strength: '400 mg' },
    ],
    flags: MUCUS_FLAGS,
    verdict: 'caution',
    note: MUCUS_NOTE + ' One pack on the 10-count option page.',
    cite: CITE_MUCUS + ' NDC 69168-432-07 is 10 in 1 bottle.',
  },
  {
    id: 'healtha2z-b100-mucus-dm-10x3',
    productName:
      'HealthA2Z Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 3 packs of 10 tablets (30), NDC 69168-432-07 (FPA049E)',
    category: 'Cold & Flu',
    formulaId: MUCUS_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
      { name: 'Guaifenesin', strength: '400 mg' },
    ],
    flags: MUCUS_FLAGS,
    verdict: 'caution',
    note: MUCUS_NOTE + ' Three packs on the 10-count option page.',
    cite: CITE_MUCUS + ' NDC 69168-432-07 is the 10-count.',
  },
  {
    id: 'healtha2z-b100-mucus-dm-10x6',
    productName:
      'HealthA2Z Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 6 packs of 10 tablets (60), NDC 69168-432-07 (FPA049E)',
    category: 'Cold & Flu',
    formulaId: MUCUS_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
      { name: 'Guaifenesin', strength: '400 mg' },
    ],
    flags: MUCUS_FLAGS,
    verdict: 'caution',
    note: MUCUS_NOTE + ' Six packs on the 10-count option page.',
    cite: CITE_MUCUS + ' NDC 69168-432-07 is the 10-count.',
  },
  {
    id: 'healtha2z-b100-mucus-dm-10x24',
    productName:
      'HealthA2Z Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 24 packs of 10 tablets (240), NDC 69168-432-07 (FP0575)',
    category: 'Cold & Flu',
    formulaId: MUCUS_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
      { name: 'Guaifenesin', strength: '400 mg' },
    ],
    flags: MUCUS_FLAGS,
    verdict: 'caution',
    note: MUCUS_NOTE + ' The inner carton is the 10-count on this setid.',
    cite: CITE_MUCUS + ' NDC 69168-432-07 is 10 in 1 bottle.',
  },
  {
    id: COLD_ID,
    // KYR5-d spec text — brand-site UPC field.
    barcode: '369168302938',
    upcNote:
      'UPC-A 369168302938 is the UPC field on the a2z-life.com page for this exact pack, Cold & Allergy, chlorpheniramine maleate 4 mg and phenylephrine HCl 10 mg, 24 tablets (https://a2z-life.com/healtha2z-cold-allergy-relief-chlorpheniramine-maleate-4mg-phenylephrine-hcl-10mg-antihistamine-nasal-decongestant-dye-free-24-tablets/). Founder-confirmed.',
    productName:
      'HealthA2Z Cold & Allergy, chlorpheniramine maleate 4 mg and phenylephrine HCl 10 mg, 24 tablets, NDC 69168-406-93 (FP0943)',
    category: 'Cold & Flu',
    formulaId: COLD_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Chlorpheniramine maleate', strength: '4 mg' },
      { name: 'Phenylephrine HCl', strength: '10 mg' },
    ],
    flags: COLD_FLAGS,
    verdict: 'caution',
    note: COLD_NOTE,
    cite: CITE_COLD,
  },
  {
    id: 'healtha2z-b100-cold-allergy-24x24',
    productName:
      'HealthA2Z Cold & Allergy, chlorpheniramine maleate 4 mg and phenylephrine HCl 10 mg, 24 packs of 24 tablets (576), NDC 69168-406-93 (FP0943V)',
    category: 'Cold & Flu',
    formulaId: COLD_ID,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Chlorpheniramine maleate', strength: '4 mg' },
      { name: 'Phenylephrine HCl', strength: '10 mg' },
    ],
    flags: COLD_FLAGS,
    verdict: 'caution',
    note: COLD_NOTE + ' The inner blister is the 24-count on this setid.',
    cite: CITE_COLD,
  },
  {
    id: PM_ID,
    productName:
      'HealthA2Z Extra Strength Pain Relief PM, acetaminophen 500 mg and diphenhydramine HCl 25 mg, 24 packs of 20 caplets (480), NDC 69168-393-26 (FP1085)',
    category: 'Pain & Fever',
    formulaId: PM_ID,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '500 mg' },
      { name: 'Diphenhydramine HCl', strength: '25 mg' },
    ],
    flags: PM_FLAGS,
    verdict: 'avoid',
    note: PM_NOTE + ' The inner carton is the 20-count on this setid.',
    cite: CITE_PM,
  },
];

export const BATCH100_KYR6_HEALTHA2Z_NO_OI_GOOGLE: RatingRecord[] = COMPACT.map(expand);

const WRITTEN_SKUS = [
  'HealthA2Z Sleep Aid, Diphenhydramine HCl 25mg, Compare to Simply Sleep, 24 Caplets in a Pack (1 Pack, 3 Pack, 6 Pack)',
  'HealthA2Z® Sleep Aid | Diphenhydramine HCl 25mg | 24 Pack of 30 Caplets Each | Regular Strength Sleeping Pills | Value Pack | 720 Caplets Total (FP0549)',
  'HealthA2Z Sleep Aid, Diphenhydramine HCl 25mg, 24*24 Caplets (576 Caplets Total) (FP0508)',
  'HealthA2Z® Mucus Relief DM | Dextromethorphan HBr 20mg & Guaifenesin 400mg | Cough & Chest Congestion Relief | 24 Packs of 30 Caplets (720 Total) | Value Pack (FP1125)',
  'HealthA2Z® Mucus Relief DM | Dextromethorphan HBr 20mg & Guaifenesin 400mg | Cough & Chest Congestion Relief | 24 Packs of 20 Caplets (480 Total) | Value Pack (FP0585)',
  'HealthA2Z Mucus Relief DM, Compare to Mucinex DM Dextromethorphan HBr 20mg, Guaifenesin 400mg, 10 Caplets (1 Pack, 3 Packs & 6 Packs) (FPA049E)',
  'HealthA2Z Mucus Relief DM, Dextromethorphan HBr 20mg, Guaifenesin 400mg, 24*10 Caplets (240 Caplets Total) (FP0575)',
  'HealthA2Z® Cold & Allergy Relief, Chlorpheniramine Maleate 4mg, Phenylephrine HCl 10mg, Antihistamine & Nasal Decongestant, Dye Free, 24 Tablets (FP0943)',
  'HealthA2Z® Cold & Allergy | Chlorpheniramine Maleate & Phenylephrine HCl | 24 Tablets (Pack of 24) | 576 Total Tablets | Value Pack (FP0943V)',
  'HealthA2Z Extra Strength Pain Relief PM, 20*24 Caplets (480 Caplets Total) (FP1085)',
] as const;

const REFUSED_SKUS = [
  'HealthA2Z Laxative (BISACODYL 5MG) 250 Count (FPA015)',
  'HealthA2Z Laxative, 25 Tablets ( 1 Pack, 3 Packs& 6 Packs)',
  'HealthA2Z Laxative, Bisacodyl 5mg, 24*25 Tablets ( 600 Tablets Total) (FP0917)',
] as const;

const BISA_REFUSE =
  'REFUSED exact panel string(s) `FD&C yellow # 6 aluminum lake`, `iron oxide black`. DailyMed setid 46a377f5-822b-496f-a73b-66d8f902680a (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=46a377f5-822b-496f-a73b-66d8f902680a). The spaced `# 6` spelling is not `FD&C yellow #6 aluminum lake`. `iron oxide black` is not `black iron oxide`. Lactose anhydrous maps and was not the block. NO Search row.';

export const BATCH100_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: REFUSED_SKUS[0],
    reason: `${BISA_REFUSE} NDC 69168-398-03 is the 250-count bottle.`,
  },
  {
    sku: REFUSED_SKUS[1],
    reason: `${BISA_REFUSE} NDC 69168-398-92 is 25 in 1 blister pack.`,
  },
  {
    sku: REFUSED_SKUS[2],
    reason: `${BISA_REFUSE} The inner blister is NDC 69168-398-92, 25 tablets.`,
  },
];

const NO_OI =
  'SKIPPED no_OI leftover. Google rung found no printed inactive panel for this exact strength, form, and count. Cited US pages that were not this pack, or brand pages whose fetched text had no Drug Facts / Supplement Facts inactive line, were not pinned. A search snippet is not OI. An AI blurb is not OI. No GTIN-12. NDC is not a UPC.';

export const BATCH100_SKIPPED_NO_OI: { sku: string; reason: string }[] =
  BATCH98_SKIPPED_NO_OI.filter(
    (s) =>
      !WRITTEN_SKUS.includes(s.sku as (typeof WRITTEN_SKUS)[number]) &&
      !REFUSED_SKUS.includes(s.sku as (typeof REFUSED_SKUS)[number]),
  ).map((s) => ({ sku: s.sku, reason: NO_OI }));

export const BATCH100_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH100_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH100_SKIPPED_NO_OI,
  ...BATCH100_SKIPPED_OUT,
];

type Log = { q1: string; q2: string; opened: string };

const LOG_BY_NEEDLE: [string, Log][] = [
  ['(FP1043)', { q1: '"HealthA2Z" diphenhydramine 25mg 12 softgels inactive ingredients FP1043', q2: 'FP1043 HealthA2Z allergy relief label "inactive ingredients"', opened: 'no US panel found. Cited a2z PDP has no inactive sentence. DailyMed hits were cetirizine or other brands. up&up softgels are not HealthA2Z.' }],
  ['(FP1062)', { q1: '"HealthA2Z" blackberry melatonin 5 mg 60 inactive ingredients FP1062', q2: 'FP1062 "other ingredients" OR "supplement facts" melatonin gummy HealthA2Z', opened: 'no US panel found. a2z PDP and Amazon listings have no other-ingredients sentence. One extra query errored before the retry.' }],
  ['(FP1069)', { q1: '"HealthA2Z" magnesium oxide 420mg 90 tablets inactive ingredients FP1069', q2: '"FP1069" HealthA2Z "24 packs" magnesium oxide 90 "other ingredients" OR "inactive"', opened: 'no US panel found. Opened DailyMed setid 894af54a (Nationwide, 100 tablets) and setid dc57893c (Marlex, 100 tablets). Neither is HealthA2Z and neither is 90 or 24x90.' }],
  ['(FP1221)', { q1: '"HealthA2Z" "men\'s vitality" maca oyster "other ingredients" FP1221', q2: 'FP1221 HealthA2Z supplement facts label', opened: 'no US panel found. Retailer copy names the six actives. No other-ingredients line.' }],
  ['(FP1125)', { q1: '"HealthA2Z" "Mucus Relief DM" 30 caplets "inactive ingredients" FP1125', q2: 'HealthA2Z guaifenesin 400 dextromethorphan 20 label "inactive" 69168', opened: 'Opened DailyMed setid 731f8608. NDC 69168-432-30 is the 30-count. Panel pinned.' }],
  ['Simply Sleep', { q1: '"HealthA2Z" "diphenhydramine" 25mg 24 caplets "inactive ingredients" Simply Sleep', q2: 'site:dailymed.nlm.nih.gov HealthA2Z diphenhydramine 25 mg caplet Allegiant 69168 inactive', opened: 'Opened DailyMed setid dbbc535f. NDC 69168-263-93 is 24 caplets. Target 24-count page was fetched; the label accordion did not render, so the snippet was not used.' }],
  ['(FPA104)', { q1: '"HealthA2Z" collagen 1735 270 capsules "other ingredients" FPA104', q2: 'FPA104 HealthA2Z "supplement facts" collagen label', opened: 'no US panel found. Target gallery describes a supplement-facts image and no separate other-ingredients line. Collagen-peptide DailyMed is a powder, wrong product.' }],
  ['(FPA015)', { q1: '"HealthA2Z" bisacodyl 5 mg 250 "inactive ingredients" FPA015', q2: '69168 bisacodyl 5 mg HealthA2Z label inactive ingredients 250', opened: 'Opened DailyMed setid 46a377f5. NDC 69168-398-03 is the 250-count. Refused.' }],
  ['(FP1186)', { q1: '"HealthA2Z" CoQ-10 1000 mg 80 Softgels inactive ingredients FP1186', q2: 'FP1186 HealthA2Z CoQ-10 label "other ingredients" OR "inactive ingredients" 80 softgels', opened: 'no US panel found. A Target label-info snippet quotes CoQ10 100 mg, not this 1000 mg pack, and the page was not treated as this SKU.' }],
  ['(FP0921)', { q1: '"HealthA2Z" Senna Laxative Sennoside 8.6mg inactive ingredients FP0921', q2: 'site:dailymed.nlm.nih.gov Allegiant 69168 sennosides 8.6 inactive ingredients', opened: 'no US panel found. Count is not pinned. DailyMed senna hits were not Allegiant 69168. The 24x30 and 300-count senna rows already on MAIN were not rewritten.' }],
  ['Aspirin 81mg Low Strength, 40 Tablets', { q1: '"HealthA2Z" Aspirin 81mg 40 Tablets inactive ingredients', q2: 'site:dailymed.nlm.nih.gov "Allegiant" aspirin 81 mg "inactive ingredients"', opened: 'no US panel found for this 40-tablet option page. Chewable and dye-free DailyMed snippets are other counts or forms already handled on MAIN.' }],
  ['(FPHK1222)', { q1: '"HealthA2Z" Vitamin D3 K2 5000 IU 100 mcg 90 Softgels inactive ingredients FPHK1222', q2: 'HealthA2Z "Vitamin D3" "5000" K2 90 Target "ingredients" softgels', opened: 'no US panel found. Hits were the coconut-oil SKU FPHK1287 or non-US shops.' }],
  ['(FP0943V)', { q1: 'site:dailymed.nlm.nih.gov Allegiant 69168 chlorpheniramine phenylephrine inactive ingredients', q2: 'FP0943V HealthA2Z "Cold" Chlorpheniramine "24 Tablets" "inactive ingredients"', opened: 'Opened DailyMed setid 7af63769. NDC 69168-406-93 is the 24-count blister inside this value pack. Panel pinned.' }],
  ['(FP1119)', { q1: '"HealthA2Z" Fish oil 200 ct inactive ingredients FP1119', q2: 'FP1119 HealthA2Z fish oil "other ingredients" OR "supplement facts" 200 softgels', opened: 'no US panel found. The 180-softgel triple-strength listing is a different count.' }],
  ['(FPHK1313)', { q1: 'HealthA2Z "Magnesium Glycinate" "180" capsules Target ingredients FPHK1313', q2: '"FPHK1313" OR "magnesium glycinate 240" HealthA2Z "other ingredients" 180', opened: 'no US panel found. a2z PDP and a Target 180-count page had no ingredient sentence. Estonia shop is not a US panel.' }],
  ['(FPHK1252)', { q1: '"HealthA2Z" Ashwagandha 120 Capsules 7000mg inactive ingredients FPHK1252', q2: 'site:target.com HealthA2Z Ashwagandha 7000 120 capsules ingredients', opened: 'no US panel found. A Target snippet lists a 700 mg extract panel that does not match this 7,000 mg root-powder SKU, so it was not pinned.' }],
  ['Allergy Relief, Diphenhydramine 25mg ( 1 Pack', { q1: '"HealthA2Z" Allergy Relief Diphenhydramine 25mg caplets inactive ingredients', q2: 'site:dailymed.nlm.nih.gov 69168 diphenhydramine HCl 25 mg "inactive ingredients" allergy', opened: 'no US panel found for these allergy caplets. The sleep-aid caplet SPL is a different use and was not copied onto this SKU. Other DailyMed 25 mg tablets were not labeler 69168.' }],
  ['(FP1068)', { q1: '"HealthA2Z" Vitamin D3 2000 IU 90 Mini Softgels inactive ingredients FP1068', q2: 'FP1068 HealthA2Z vitamin D3 2000 IU "other ingredients" 90 mini softgels', opened: 'no US panel found. A Target 90-count 2000 IU snippet does not say mini, so it was not pinned to this pack.' }],
  ['(FP1126)', { q1: '"HealthA2Z" strawberry "B-Complex" 60 supplement facts other ingredients', q2: '"Strawberry Flavored B-Complex" HealthA2Z 60 "other ingredients" OR "supplement facts"', opened: 'no US panel found. Women\'s multivitamin gummies are a different product.' }],
  ['(FP1190)', { q1: '"HealthA2Z" "Emulsified Calcium" 600 "100" softgels "Vitamin D3" other ingredients', q2: 'FP1190 HealthA2Z emulsified calcium 600 mg 100 softgels other ingredients', opened: 'no US panel found. Non-US shops list actives only. Rugby calcium is another brand.' }],
  ['(FPN002)', { q1: 'HealthA2Z Multi Collagen 1735mg 180 capsules "other ingredients" FPN002', q2: 'FPN002 HealthA2Z multi collagen 1735 mg 180 capsules gelatin other ingredients', opened: 'no US panel found. A NutraA2Z / Estonia ingredient line was not pinned (wrong brand or wrong country).' }],
  ['(FP0585)', { q1: '"HealthA2Z" "Mucus Relief DM" 30 caplets "inactive ingredients" FP1125', q2: 'HealthA2Z guaifenesin 400 dextromethorphan 20 label "inactive" 69168', opened: 'Opened DailyMed setid 731f8608. NDC 69168-432-26 is the 20-count. Panel pinned. The drug-level queries cover this count on the same label.' }],
  ['(FPHK1255)', { q1: 'HealthA2Z CoQ10 200mg Heart Power 90 Softgels Shilajit "other ingredients" FPHK1255', q2: '"HealthA2Z" CoQ10 200mg 90 softgels shilajit supplement facts other ingredients', opened: 'no US panel found. Target and brand pages match the name and do not quote an other-ingredients sentence.' }],
  ['(FPN016)', { q1: '"HealthA2Z" "Liquid Vitamin B-Complex" "16 oz" supplement facts ingredients', q2: 'FPN016 HealthA2Z liquid vitamin B-complex 16 oz other ingredients supplement facts', opened: 'no US panel found. The brand URL tagged FPN016 does not quote an other-ingredients line.' }],
  ['(FP1148)', { q1: '"HealthA2Z" "Vitamin D3" "1000 IU" 90 softgels supplement facts other ingredients', q2: 'FP1148 HealthA2Z vitamin D3 25 mcg 1000 IU 90 softgels other ingredients', opened: 'no US panel found. The 2000 IU Target snippet is a different strength.' }],
  ['(FPA049E)', { q1: '"HealthA2Z" "Mucus Relief DM" 30 caplets "inactive ingredients" FP1125', q2: 'HealthA2Z guaifenesin 400 dextromethorphan 20 label "inactive" 69168', opened: 'Opened DailyMed setid 731f8608. NDC 69168-432-07 is the 10-count. Panel pinned. Target 10-count page was fetched and the label accordion did not render.' }],
  ['(FPHK1153)', { q1: 'FPHK1153 HealthA2Z vitamin D3 2000 IU 360 softgels other ingredients', q2: 'HealthA2Z "Vitamin D3" "360" softgels 2000 IU supplement facts', opened: 'no US panel found. The 90-count Target line is a different count. A Canada 360-count is Healthy Origins.' }],
  ['(FPHK1253)', { q1: '"HealthA2Z" "Joint Health" women 90 tablets supplement facts other ingredients', q2: 'FPHK1253 HealthA2Z 9 in 1 joint health women 90 tablets other ingredients', opened: 'no US panel found. Brand page lists active amounts only.' }],
  ['(FPHK1256)', { q1: 'FPHK1256 HealthA2Z eye health 60 softgels ARED other ingredients', q2: '"HealthA2Z" "Eye Health" "60 Softgels" AREDS supplement facts other ingredients', opened: 'no US panel found. A DailyMed AREDS 2 label is 120 mini softgels and not HealthA2Z.' }],
  ['(FPHK1069)', { q1: 'FPHK1069 HealthA2Z "magnesium oxide" "other ingredients"', q2: '"HealthA2Z" "magnesium oxide" 420 "90" "other ingredients" colloidal silicon dioxide', opened: 'no US panel found. Opened Marlex setid dc57893c (100 tablets, not HealthA2Z) and Nationwide setid 894af54a (100 tablets).' }],
  ['(FPA080)', { q1: 'FPA080 HealthA2Z pain relief extra strength acetaminophen 500 caplets inactive ingredients', q2: 'site:dailymed.nlm.nih.gov Allegiant acetaminophen 500 NDC 69168 inactive ingredients', opened: 'Opened DailyMed setid 8e60b78e (Health A2Z, NDC 69168-328). Packages are 40, 100, 175, and 250. No 500-count on that label. Not pinned.' }],
  ['(FPHK1065)', { q1: '"HealthA2Z" "Vitamin C" gummies 250 mg 60 "other ingredients" OR "inactive ingredients"', q2: 'HealthA2Z Vitamin C Gummies Orange 250 mg 60 FPHK1065 "Ingredients" Target', opened: 'no US panel found. Target page was fetched; the label accordion did not render. The search snippet was not used as OI.' }],
  ['(FPHK1302)', { q1: '"HealthA2Z" "Milk Thistle" 300 mg 60 tablets "other ingredients"', q2: 'HealthA2Z Milk Thistle 300mg 60 tablets FPHK1302 Supplement Facts', opened: 'no US panel found. A Target 90-count is the wrong count.' }],
  ['(FP1032)', { q1: 'site:dailymed.nlm.nih.gov Allegiant 69168 simethicone inactive ingredients', q2: 'HealthA2Z Anti-Gas 125mg simethicone "inactive ingredients" Drug Facts', opened: 'no US panel found for this 1/3/6 pack. DailyMed setid 7731bd63 lists 15, 72, 150, and 365, not this option page.' }],
  ['(FPHK1290)', { q1: '"HealthA2Z" "Vitamin D3" "K2" "coconut oil" 90 softgels "other ingredients"', q2: '"HealthA2Z" "Vitamin D3" "2000" "coconut oil" 90 softgels FPHK1290 "other ingredients" OR "Ingredients:"', opened: 'no US panel found. Estonia shop and sunflower-oil Target listings were not pinned.' }],
  ['(FPHK1294)', { q1: '"HealthA2Z" "Krill Oil" 1000 mg 60 "other ingredients"', q2: 'HealthA2Z Antarctic Krill Oil 1000 mg 60 softgels FPHK1294 "other ingredients" OR Supplement Facts', opened: 'no US panel found for this SKU. Target 60-count page was fetched and the label accordion did not render. Its UPC in the snippet is not this SKU\'s brand-page UPC.' }],
  ['(FP1085)', { q1: 'site:dailymed.nlm.nih.gov Allegiant 69168 acetaminophen diphenhydramine inactive ingredients', q2: 'HealthA2Z Extra Strength Pain Relief PM acetaminophen diphenhydramine 480 "inactive ingredients" FP1085', opened: 'Opened DailyMed setid 423a8445. NDC 69168-393-26 is the 20-count. Panel pinned, including the may-contain line.' }],
  ['(FPHK1318)', { q1: '"HealthA2Z" "Ovarian Support" saffron 88.5 60 "other ingredients"', q2: 'HealthA2Z Ovarian Support Saffron 88.5mg 60 capsules FPHK1318 Supplement Facts', opened: 'no US panel found. Marketing names organic MCT oil and does not print an other-ingredients line.' }],
  ['(FP1138)', { q1: '"HealthA2Z" Glucosamine Chondroitin MSM 120 caplets "other ingredients"', q2: 'HealthA2Z Glucosamine Chondroitin MSM 120 caplets FP1138 Supplement Facts', opened: 'no US panel found.' }],
  ['(FP1090)', { q1: 'site:dailymed.nlm.nih.gov Allegiant 69168 acetaminophen 500 inactive ingredients', q2: 'HealthA2Z Extra Strength Pain Relief Acetaminophen 500mg "24 Packs" 576 FP1090 "inactive ingredients"', opened: 'Opened DailyMed setid 91acc132 (24 tablets, NDC 69168-011-24). The extracted principal display does not print HealthA2Z, so it was not pinned. Setid 8e60b78e is Health A2Z caplets and has no 24-count.' }],
  ['(FPA192 (FP1317))', { q1: 'site:dailymed.nlm.nih.gov Allegiant 69168 daytime nighttime cold flu inactive ingredients', q2: 'HealthA2Z Daytime Nighttime Cold Flu decongestant-free 36 softgels FPA192 FP1317 "inactive ingredients"', opened: 'no US panel found for this decongestant-free 36-softgel pack. A phenylephrine day/night label with two inactive lists is a different product and was not pinned. Left no_OI, not OUT.' }],
  ['25 Tablets ( 1 Pack, 3 Packs& 6 Packs)', { q1: '"HealthA2Z" bisacodyl 5 mg 250 "inactive ingredients" FPA015', q2: '69168 bisacodyl 5 mg HealthA2Z label inactive ingredients 250', opened: 'Opened DailyMed setid 46a377f5. NDC 69168-398-92 is the 25-count blister. Refused. The drug-level queries cover this count on the same label.' }],
  ['(FP1127)', { q1: 'HealthA2Z Sugar Free Melatonin Gummies Blackberry 5 mg 60 Pieces FP1127 other ingredients', q2: '"FP1127" OR "369168778603" melatonin gummies "other ingredients" OR pectin sugar-free', opened: 'no US panel found. A sugared Allegiant melatonin label is the wrong formula.' }],
  ['(FPN015)', { q1: 'HealthA2Z Liquid Vitamin B-Complex 16 oz FPN015 other ingredients Supplement Facts', q2: '"FPN015" OR "369168809574" "liquid vitamin B" "other ingredients" OR glycerin', opened: 'no US panel found. FPN016 is a different SKU.' }],
  ['(FP0917)', { q1: '"HealthA2Z" bisacodyl 5 mg 250 "inactive ingredients" FPA015', q2: '69168 bisacodyl 5 mg HealthA2Z label inactive ingredients 250', opened: 'Opened DailyMed setid 46a377f5. The inner unit is NDC 69168-398-92, 25 tablets. Refused.' }],
  ['(FP0575)', { q1: '"HealthA2Z" "Mucus Relief DM" 30 caplets "inactive ingredients" FP1125', q2: 'HealthA2Z guaifenesin 400 dextromethorphan 20 label "inactive" 69168', opened: 'Opened DailyMed setid 731f8608. NDC 69168-432-07 is the 10-count inside this 24-pack. Panel pinned.' }],
  ['(FP0943)', { q1: 'HealthA2Z Cold Allergy Relief Chlorpheniramine Maleate 4mg Phenylephrine 10mg 24 Tablets FP0943 inactive ingredients', q2: 'site:dailymed.nlm.nih.gov Allegiant chlorpheniramine phenylephrine inactive', opened: 'Opened DailyMed setid 7af63769. NDC 69168-406-93 is this 24-count. Panel pinned.' }],
  ['(FPHK1277)', { q1: 'HealthA2Z Magnesium Glycinate DHA 120mg 120 Chewable Tablets sugar free FPHK1277 other ingredients', q2: '"FPHK1277" OR "magnesium glycinate" DHA 120 mg chewable "other ingredients" HealthA2Z', opened: 'no US panel found.' }],
  ['(FPHK1130)', { q1: 'HealthA2Z Women\'s Multivitamin Gummies Peach Orange Strawberry 60 Pieces FPHK1130 other ingredients', q2: '"FPHK1130" OR HealthA2Z women multivitamin gummies "other ingredients" peach 60', opened: 'no US panel found. Target page text in search quotes an ingredients line; the fetched page did not render that accordion, so the snippet was not pinned.' }],
  ['(FP0549)', { q1: '"HealthA2Z" "diphenhydramine" 25mg 24 caplets "inactive ingredients" Simply Sleep', q2: 'site:dailymed.nlm.nih.gov HealthA2Z diphenhydramine 25 mg caplet Allegiant 69168 inactive', opened: 'Opened DailyMed setid dbbc535f. NDC 69168-263-30 is the 30-count inside this value pack. Panel pinned.' }],
  ['(FP0508)', { q1: '"HealthA2Z" "diphenhydramine" 25mg 24 caplets "inactive ingredients" Simply Sleep', q2: 'site:dailymed.nlm.nih.gov HealthA2Z diphenhydramine 25 mg caplet Allegiant 69168 inactive', opened: 'Opened DailyMed setid dbbc535f. NDC 69168-263-93 is the 24-count inside this value pack. Panel pinned. a2z schema UPC was not copied.' }],
  ['(FPHK1287)', { q1: 'HealthA2Z Vitamin D3 5000 IU K2 coconut oil 90 Softgels FPHK1287 other ingredients', q2: '"FPHK1287" OR "369168815605" "coconut oil" "other ingredients" gelatin D3 K2', opened: 'no US panel found. A Target 5000 IU page quotes sunflower oil, a different carrier.' }],
  ['(FPHK1188)', { q1: 'HealthA2Z Antarctic Krill Oil 1000 mg 60 Softgels FPHK1188 other ingredients', q2: 'site:target.com HealthA2Z Antarctic Krill Oil 60 gelatin glycerin vanillin', opened: 'no US panel found for this SKU. Target 60-count page was fetched and the label accordion did not render. Snippet UPC does not match the brand-page UPC for FPHK1188.' }],
  ['(FP1019)', { q1: 'HealthA2Z Magnesium Glycinate 180 ct FP1019 other ingredients Target', q2: '"FP1019" OR "369168745186" magnesium glycinate "other ingredients"', opened: 'no US panel found. Target 180-count page has no ingredient sentence. FPHK1313 is the 240 mg 180-capsule SKU, not this one.' }],
  ['(FPHK1312)', { q1: '"FPHK1312" magnesium glycinate 240 mg 60 capsules', q2: '"369168827608" magnesium glycinate 60 "vegetable capsule" OR "other ingredients"', opened: 'no US panel found. An earlier query errored and was retried.' }],
  ['(FPHK1128)', { q1: 'HealthA2Z Sugar Free Probiotics Gummies Raspberry Watermelon 60 FPHK1128 other ingredients', q2: '"369168779600" probiotics gummies maltitol isomalt ingredients', opened: 'no US panel found. Target search text quotes an ingredients line; that accordion did not render on fetch, so the snippet was not pinned.' }],
  ['(FPHK1218)', { q1: 'HealthA2Z Fish Oil 900 mg EPA 600 mg DHA 180 Softgels FPHK1218 other ingredients', q2: '"FPHK1218" OR "369168795808" fish oil "other ingredients" gelatin', opened: 'no US panel found. Other fish-oil DailyMed labels are the wrong strength and count.' }],
  ['(FPHK1319)', { q1: 'HealthA2Z Kids Chewable Vitamin D3 K2 20 mcg 60 Tablets sugar free FPHK1319 other ingredients', q2: '"FPHK1319" kids chewable D3 K2 creme cocoa ingredients', opened: 'no US panel found. Adult softgel listings are the wrong form.' }],
  ['(FPHK1226)', { q1: '"FPHK1226" vitamin D3 K2 2000 IU 90 softgels ingredients', q2: 'site:target.com HealthA2Z Vitamin D3 K2 2000 IU 90 sunflower gelatin titanium', opened: 'no US panel found. Target page was fetched; the label accordion did not render. The search snippet was not used as OI. An earlier query errored and was retried.' }],
];

function logFor(sku: string): Log {
  const hits = LOG_BY_NEEDLE.filter(([needle]) => sku.includes(needle));
  if (hits.length !== 1) {
    throw new Error(`batch100 search-log needle drift: ${hits.length} for ${sku}`);
  }
  return hits[0][1];
}

export const BATCH100_SEARCH_LOG: {
  sku: string;
  queries: [string, string];
  opened: string;
}[] = BATCH98_SKIPPED_NO_OI.map((s) => {
  const log = logFor(s.sku);
  return { sku: s.sku, queries: [log.q1, log.q2], opened: log.opened };
});

const _ROWS = BATCH100_KYR6_HEALTHA2Z_NO_OI_GOOGLE;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 14) throw new Error('batch100 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 8 || _grades.avoid !== 6) {
  throw new Error('batch100 Search grade drift');
}
if (_new !== 4 || _reuse !== 10) throw new Error('batch100 NEW/REUSE drift');
if (BATCH100_SKIPPED_NO_OI.length !== 46) throw new Error('batch100 no_OI drift');
if (BATCH100_SKIPPED_OUT.length !== 0) throw new Error('batch100 OUT drift');
if (BATCH100_SKIPPED.length !== 46) throw new Error('batch100 SKIPPED drift');
if (BATCH100_REFUSED.length !== 3) throw new Error('batch100 REFUSED drift');
if (BATCH100_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch100 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch100 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch100 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'healtha2z-b100-cold-allergy-24': '369168302938',
  'healtha2z-b100-mucus-dm-10': '369168345072',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 2) throw new Error('batch100 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch100 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch100 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch100 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch100 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b100-'))) {
  throw new Error('batch100 ids must use healtha2z-b100-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch100 duplicate id');
if (_ROWS.some((r) => r.formulaId?.startsWith('healtha2z-b100-') && !_ids.has(r.formulaId))) {
  throw new Error('batch100 in-file formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch100 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch100 Clean row has a non-cleared inactive');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch100 Caution needs Limited or Moderate');
}
const _covered = new Set<string>([
  ...WRITTEN_SKUS,
  ...REFUSED_SKUS,
  ...BATCH100_SKIPPED_NO_OI.map((s) => s.sku),
  ...BATCH100_SKIPPED_OUT.map((s) => s.sku),
]);
if (_covered.size !== 59) throw new Error('batch100 SKU coverage drift');
for (const s of BATCH98_SKIPPED_NO_OI) {
  if (!_covered.has(s.sku)) throw new Error(`batch100 missing SKU: ${s.sku}`);
}
if (BATCH100_SEARCH_LOG.length !== 59) throw new Error('batch100 search log drift');
if (BATCH100_SEARCH_LOG.some((s, i) => s.sku !== BATCH98_SKIPPED_NO_OI[i].sku)) {
  throw new Error('batch100 search log order drift');
}
if (BATCH100_SEARCH_LOG.some((s) => s.queries.length !== 2 || !s.queries[0] || !s.queries[1])) {
  throw new Error('batch100 search log needs two queries');
}
if (LOG_BY_NEEDLE.length !== 59) throw new Error('batch100 needle count drift');
const _flagNames = new Set(_ROWS.flatMap((r) => r.inactiveIngredients?.map((f) => f.name) ?? []));
for (const blocked of [
  'iron oxide black',
  'FD&C yellow # 6 aluminum lake',
  'FD&C yellow #6 aluminum lake',
]) {
  if (_flagNames.has(blocked)) throw new Error(`batch100 wrote a still-blocked token: ${blocked}`);
}
if (!_flagNames.has('lactose anhydrous') || !_flagNames.has('polyethylene glylcol')) {
  throw new Error('batch100 missing a mapped spelling');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH100_SKIPPED.map((s) => s.sku),
  ...BATCH100_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch100 excluded brand leaked');
}
