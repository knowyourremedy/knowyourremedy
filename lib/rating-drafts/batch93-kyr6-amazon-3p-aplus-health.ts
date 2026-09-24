// DRAFT / not verified / batch 93 KYR6 Amazon 3P A+Health.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades. No invented OI.
// No invented UPCs. Founder owns final Avoid vs Caution vs Clean.
//
// A+Health only. The carton word is a+health. DailyMed labeler is Bionpharma
// Inc. (NDC 69452), not the TIME-Cap leftover. TIME-Cap-branded, HealthA2Z,
// and GoodSense stay out. No toothpaste. No house Amazon. No Sprouts.
// No factory. No graded oil pour bottles.
// recordStatus is 'unverified'. Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI. Letter tiles only.
//
// Hunt: every row below has an NDC, so the pin is the DailyMed SPL inactive
// paragraph plus the principal-display count (exact pack). bionpharma.com
// timed out in this environment. Amazon US PDP fetch was not used as a pin.
// No separate A+Health vitamin / supplement PDP with an Other Ingredients
// panel turned up under the a+health mark. An AI blurb is not OI or a UPC.
// NDC is not a UPC. No GTIN-12 was printed on the SPL, so no barcode is attached.
//
// Already-on-MAIN twins left alone: aplus-health-dual-action-oxides
// (setid 04ccc4b2 / NDC 69452-394, 216-ct and 400-ct) and
// aplus-health-dual-action (setid 4834aa7f / NDC 69452-469).
// The 144-ct (69452-446) and 120-ct (69452-447) oxide cartons are different
// setids. They reuse that existing formulaId. They are not the 216-ct row.
//
// batch70–92 are not edited.
// Leftover Amazon 3P after this slice: 3 (HealthA2Z, TIME-Cap, GoodSense).
//
// TALLY (unverified drafts in THIS file): 12 rows —
// Clean 1 / Caution 2 / Avoid 9.
// NEW 9 / REUSE-formula 3 /
// SKIPPED 3 (no_OI 0 / OUT 1 / already-on-MAIN 2) /
// REFUSED 30.
// Search grade: Clean 1 / Caution 2 / Avoid 9.
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

const BRAND = 'A+Health';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const OXIDE_FORMULA = 'aplus-health-dual-action-oxides';

const METH = {
  acrylate:
    'Methodology §5 Caution (acrylate/C10-30 alkyl acrylate crosspolymer — exact INCI; the carton prints Acrylates plural). Not Avoid.',
  alcoholVehicle:
    'Methodology §5 Limited (alcohol / SD alcohol as a vehicle — SD Alcohol 40 sits on this row; do not invent a second alcohol class). Not Avoid.',
  bha: 'Methodology §5 High (BHA / butylated hydroxyanisole).',
  capsaicin:
    'Methodology §5 Caution (capsaicin when listed as inactive). Menthol on this carton is the active, not this row.',
  carnauba: 'Methodology §5 Cleared (carnauba wax).',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate — mineral filler).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including D&C red no. 27 and FD&C Blue #1).',
  edibleInk:
    'Methodology §5 Caution (edible ink — unspecified ink). Not Avoid. Not a dye High.',
  ferric:
    'Methodology §5 Caution (ferric oxide red / ferric oxide yellow). Not Avoid. Not a dye High.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  glycerylCaprylate: 'Methodology §5 Cleared (glyceryl caprylate — exact INCI).',
  glycerylDibehenate:
    'Methodology §5 Cleared (glyceryl dibehenate — exact words). Dibehenin already Cleared is not this string.',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  ipm: 'Methodology §5 Cleared (isopropyl myristate — topical emollient).',
  koh: 'Methodology §5 Cleared (potassium hydroxide — pH adjuster, trace). Not a grade driver.',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
  lecithin: 'Methodology §5 Cleared (lecithin).',
  mctFill:
    'Methodology §5 Cleared (medium chain triglycerides named as softgel fill). Not unlabeled MCT. Not an oil-bottle grade. Not gummy High.',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  pgOral: 'Methodology §5 Moderate (propylene glycol, oral).',
  pgTopical:
    'Methodology §5 Cleared (propylene glycol, topical). Oral propylene glycol is the Moderate row. This liquid is topical.',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  polyoxylCastor:
    'Methodology §5 Cleared (polyoxyl 40 hydrogenated castor oil — polyoxyl-castor family). Not an oil-bottle grade.',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  sio2:
    'Methodology §5 Limited (colloidal silicon dioxide — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate). Sodium lauryl sulphate is the printed British spelling of that token. Not Avoid.',
  sorbitan:
    'Methodology §5 Caution (sorbitan — plain / sorbitan esters as emulsifier). Not Avoid. Not the sorbitol row.',
  sorbitol: 'Methodology §5 Limited (sorbitol — sugar alcohol, oral).',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tea:
    'Methodology §5 Caution (TEA / trolamine as inactive). Triethanolamine is that token. Not Avoid.',
  tio2: 'Methodology §5 High (titanium dioxide).',
  water: 'Methodology §5 Cleared (purified water).',
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
      'Pain & Fever': [
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ],
      'First Aid': [
        'boiron-arnicare-gel',
        'Independently Clean Boiron Arnicare Gel already on main. Form labeled, not a hard filter (§6).',
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
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}`],
  });
}

const COMPACT: Compact[] = [
  {
    id: 'aplushealth-b93-dph-25-600',
    productName: 'A+Health Allergy Relief Diphenhydramine HCl 25 mg, 600 Tablets',
    category: 'Allergies',
    formulaId: 'aplushealth-b93-dph-25',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    flags: [
      ['D&C red no. 27', 'high', 'dye'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Polysorbate 80', 'moderate', 'ps80'],
      ['Carnauba wax', 'cleared', 'carnauba'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Dibasic calcium phosphate', 'cleared', 'dical'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C red no. 27 and titanium dioxide. Polyethylene glycol and polysorbate 80 are Moderate, not the Avoid drivers. Children 6 to under 12: 1 tablet. Under 6: do not use.',
    cite: `DailyMed SPL (${DM}23750ea1-18a4-bfa7-e063-6394a90afd09; setid 23750ea1-18a4-bfa7-e063-6394a90afd09; NDC 69452-444-31; 600-count panel). Inactive ingredients: carnauba wax, croscarmellose sodium, D&C red no. 27, dibasic calcium phosphate, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, titanium dioxide. Ages 6+ (under 6: do not use).`,
  },
  {
    id: 'aplushealth-b93-dph-50-150',
    productName:
      'A+Health Extra Strength Allergy Relief Diphenhydramine HCl 50 mg, 150 Tablets',
    category: 'Allergies',
    formulaId: 'aplushealth-b93-dph-50',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: [
      ['Talc', 'high', 'talc'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Dibasic calcium phosphate', 'cleared', 'dical'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are talc (oral) and titanium dioxide. The 150-count panel prints dye free. Dye free is not a grade. Under 12: do not use.',
    cite: `DailyMed SPL (${DM}3c1953a1-32e9-6c81-e063-6294a90a9fa2; setid 3c1953a1-32e9-6c81-e063-6294a90a9fa2; NDC 69452-445-24; 150 tablets in 1 bottle). Inactive ingredients: croscarmellose sodium, dibasic calcium phosphate, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, talc, titanium dioxide. Ages 12+.`,
  },
  {
    id: 'aplushealth-b93-dph-50-48',
    productName:
      'A+Health Extra Strength Allergy Relief Diphenhydramine HCl 50 mg, 48 Tablets',
    category: 'Allergies',
    formulaId: 'aplushealth-b93-dph-50',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: [
      ['Talc', 'high', 'talc'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Dibasic calcium phosphate', 'cleared', 'dical'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are talc (oral) and titanium dioxide. Same inactive list as the 150-count bottle. This carton is 4 blister packs of 12 (48 tablets), one NDC, not a multipack of four retail bottles. Under 12: do not use.',
    cite: `DailyMed SPL (${DM}3c1953a1-32e9-6c81-e063-6294a90a9fa2; setid 3c1953a1-32e9-6c81-e063-6294a90a9fa2; NDC 69452-445-77; 12 tablets in 1 blister, 4 blisters in 1 carton). Inactive ingredients: croscarmellose sodium, dibasic calcium phosphate, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, talc, titanium dioxide. Ages 12+.`,
  },
  {
    id: 'aplushealth-b93-ibu-200-300-india',
    productName: 'A+Health Pain Relief Ibuprofen 200 mg, 300 Softgels',
    category: 'Pain & Fever',
    formulaId: 'aplushealth-b93-ibu-200-blue-india',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200mg' }],
    flags: [
      ['FD&C Blue #1', 'high', 'dye'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Sorbitan', 'limited', 'sorbitan'],
      ['Sorbitol', 'limited', 'sorbitol'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Potassium hydroxide', 'cleared', 'koh'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C Blue #1. Polyethylene glycol is Moderate, not the Avoid driver. Sorbitan is the locked Caution emulsifier, not Avoid. This row is the Made in India 300-count panel only (NDC 69452-260-83). That panel does not print pharmaceutical ink. The 160-count and 240-count panels on this same SPL do, and those packs are refused.',
    cite: `DailyMed SPL (${DM}2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8; setid 2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8; NDC 69452-260-83; 300 softgels, Made in India panel). India-site inactive ingredients: FD&C Blue #1, gelatin, polyethylene glycol, potassium hydroxide, purified water, sorbitan and sorbitol. Ages 12+ (under 12: ask a doctor).`,
  },
  {
    id: 'aplushealth-b93-ibu-dyefree-400',
    productName: 'A+Health Dye-Free Pain Relief Ibuprofen 200 mg, 400 Mini Softgels',
    category: 'Pain & Fever',
    formulaId: 'aplushealth-b93-ibu-dyefree',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200mg' }],
    flags: [
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Sorbitan', 'limited', 'sorbitan'],
      ['Sorbitol', 'limited', 'sorbitol'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Potassium hydroxide', 'cleared', 'koh'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Polyethylene glycol is Moderate. Sorbitan is the locked Caution emulsifier. No dye and no titanium dioxide on this panel. Dye-free is the carton word. Avoid needs High.',
    cite: `DailyMed SPL (${DM}4227d0b7-846a-dcb0-e063-6294a90af7d7; setid 4227d0b7-846a-dcb0-e063-6294a90af7d7; NDC 69452-513-81; 400 mini capsules). Inactive ingredients: gelatin, polyethylene glycol, potassium hydroxide, purified water, sorbitan and sorbitol. Ages 12+ (under 12: ask a doctor).`,
  },
  {
    id: 'aplushealth-b93-cetirizine-10-400',
    productName: 'A+Health Allergy Relief Cetirizine HCl 10 mg, 400 Tablets',
    category: 'Allergies',
    formulaId: 'aplushealth-b93-cetirizine-10-tab',
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Corn starch', 'cleared', 'cornStarch'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Povidone', 'cleared', 'povidone'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Polyethylene glycol is Moderate, not the Avoid driver. Adults 65 and over, and children under 6: ask a doctor.',
    cite: `DailyMed SPL (${DM}831d4141-b3be-4d98-a372-9c4d57ad296c; setid 831d4141-b3be-4d98-a372-9c4d57ad296c; NDC 69452-465-81; 400 tablets). Inactive ingredients: corn starch, hypromellose, lactose monohydrate, magnesium stearate, polyethylene glycol, povidone, titanium dioxide. Ages 6+ (under 6: ask a doctor).`,
  },
  {
    id: 'aplushealth-b93-iodine-tincture-30',
    productName: 'A+Health Mild Iodine Tincture 2%, 1 fl oz (30 mL)',
    category: 'First Aid',
    formulaId: 'aplushealth-b93-iodine-tincture',
    audience: ADULT,
    minAge: 0,
    form: 'liquid',
    productType: OTC,
    actives: [
      { name: 'Iodine', strength: '2%' },
      { name: 'Alcohol', strength: '47%' },
      { name: 'Sodium iodide', strength: '20.4 mg/mL' },
    ],
    flags: [['Purified water', 'cleared', 'water']],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. The only inactive is purified water. Iodine, alcohol 47%, and sodium iodide are the labeled actives, not inactives. The label does not print a minimum age.',
    cite: `DailyMed SPL (${DM}3ed930e0-0e73-277b-e063-6394a90a1b31; setid 3ed930e0-0e73-277b-e063-6394a90a1b31; NDC 69452-484-36; 1 fl oz / 30 mL). Inactive ingredient: purified water. Actives on the carton: iodine 2%, alcohol 47%, sodium iodide.`,
  },
  {
    id: 'aplushealth-b93-cool-heat-74',
    productName:
      'A+Health Maximum Strength Cool & Heat Pain Relieving Liquid, Menthol 16%, 2.5 fl oz (74 mL)',
    category: 'Pain & Fever',
    formulaId: 'aplushealth-b93-cool-heat',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Menthol', strength: '16%' }],
    flags: [
      ['Acrylates/C10-30 alkyl acrylate crosspolymer', 'limited', 'acrylate'],
      ['Capsaicin', 'limited', 'capsaicin'],
      ['Triethanolamine', 'limited', 'tea'],
      ['SD Alcohol 40', 'limited', 'alcoholVehicle'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Isopropyl myristate', 'cleared', 'ipm'],
      ['Propylene glycol', 'cleared', 'pgTopical'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Capsaicin is listed as inactive (menthol 16% is the active). Triethanolamine sits on the locked TEA / trolamine Caution row. Acrylates/C10-30 alkyl acrylate crosspolymer is the locked crosspolymer Caution row. SD Alcohol 40 is the Limited alcohol vehicle. Topical propylene glycol stays Cleared. No High on this panel. Children 12 or younger: ask a doctor.',
    cite: `DailyMed SPL (${DM}ec6f59d8-45c5-46a0-e053-2995a90a239f; setid ec6f59d8-45c5-46a0-e053-2995a90a239f; NDC 69452-375-96; 2.5 fl oz / 74 mL roll-on). Inactive ingredients: Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Capsaicin, Glycerin, Isopropyl Myristate, Propylene Glycol, Purified Water, SD Alcohol 40 (30%), Triethanolamine. Ages 12+ (12 or younger: ask a doctor).`,
  },
  {
    id: 'aplushealth-b93-loperamide-24',
    productName: 'A+Health Anti-Diarrheal Loperamide HCl 2 mg, 24 Softgels',
    category: 'Digestive',
    formulaId: 'aplushealth-b93-loperamide-softgel',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Loperamide HCl', strength: '2mg' }],
    flags: [
      ['Butylated hydroxyanisole', 'high', 'bha'],
      ['FD&C Blue #1', 'high', 'dye'],
      ['Edible ink', 'limited', 'edibleInk'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Glyceryl caprylate', 'cleared', 'glycerylCaprylate'],
      ['Polyoxyl 40 hydrogenated castor oil', 'cleared', 'polyoxylCastor'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are butylated hydroxyanisole and FD&C Blue #1. Edible ink is Caution, not the Avoid driver. Polyoxyl 40 hydrogenated castor oil is the Cleared polyoxyl-castor row, not an oil-bottle grade. Under 12: do not use.',
    cite: `DailyMed SPL (${DM}a14bd404-cc79-06e0-e053-2a95a90a6841; setid a14bd404-cc79-06e0-e053-2a95a90a6841; NDC 69452-266-12; 24 softgels). Inactive ingredients: butylated hydroxyanisole, edible ink, FD&C Blue #1, gelatin, glycerin, glyceryl caprylate, polyoxyl 40 hydrogenated castor oil, purified water. Ages 12+.`,
  },
  {
    id: 'aplushealth-b93-sleep-50-160',
    productName:
      'A+Health Maximum Strength Nighttime Sleep-Aid Diphenhydramine HCl 50 mg, 160 Softgels',
    category: 'Sleep',
    formulaId: 'aplushealth-b93-sleep-50-mct',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: [
      ['FD&C Blue #1', 'high', 'dye'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Propylene glycol', 'moderate', 'pgOral'],
      ['Sorbitan', 'limited', 'sorbitan'],
      ['Sorbitol', 'limited', 'sorbitol'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Medium chain triglycerides', 'cleared', 'mctFill'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C Blue #1 and titanium dioxide. Medium chain triglycerides are named softgel fill, Cleared, not an oil-bottle grade and not unlabeled MCT. Oral propylene glycol is Moderate. Sorbitan is Caution, not Avoid. One softgel at bedtime. Ages 12+.',
    cite: `DailyMed SPL (${DM}c0074c77-287e-6c26-e053-2995a90a4d31; setid c0074c77-287e-6c26-e053-2995a90a4d31; NDC 69452-322-79; 160 softgels). Inactive ingredients: FD&C blue #1, gelatin, glycerin, hypromellose, lecithin, medium chain triglycerides, polyethylene glycol, propylene glycol, purified water, sorbitan, sorbitol, titanium dioxide. Ages 12+.`,
  },
  {
    id: 'aplushealth-b93-dual-oxides-144',
    productName:
      'A+Health Dual Action Acetaminophen 250 mg and Ibuprofen 125 mg, 144 Caplets',
    category: 'Pain & Fever',
    formulaId: OXIDE_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Polydextrose', 'limited', 'polydextrose'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Ferric oxide red', 'limited', 'ferric'],
      ['Ferric oxide yellow', 'limited', 'ferric'],
      ['Sodium lauryl sulphate', 'limited', 'sls'],
      ['Carnauba wax', 'cleared', 'carnauba'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Crospovidone', 'cleared', 'crospovidone'],
      ['Glyceryl dibehenate', 'cleared', 'glycerylDibehenate'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone', 'cleared', 'povidone'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Ferric oxide red and ferric oxide yellow are Caution, not the Avoid driver. Sodium lauryl sulphate is the British spelling of the locked SLS Caution token. This 144-caplet carton (NDC 69452-446-23) reuses formulaId `aplus-health-dual-action-oxides`. It is not the already-written 216-count NDC 69452-394 row. Stay under 4 g/day acetaminophen. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}1f470b1b-81a9-e59c-e063-6394a90a4055; setid 1f470b1b-81a9-e59c-e063-6394a90a4055; NDC 69452-446-23; 144 caplets). Inactive ingredients: carnauba wax, colloidal silicon dioxide, croscarmellose sodium, crospovidone, ferric oxide red, ferric oxide yellow, glyceryl dibehenate, hypromellose, microcrystalline cellulose, polydextrose, polyethylene glycol, povidone, pregelatinized starch, sodium lauryl sulphate, stearic acid, titanium dioxide. Ages 12+.`,
  },
  {
    id: 'aplushealth-b93-dual-oxides-120',
    productName:
      'A+Health Dual Action Acetaminophen 250 mg and Ibuprofen 125 mg, 120 Caplets',
    category: 'Pain & Fever',
    formulaId: OXIDE_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    actives: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Polydextrose', 'limited', 'polydextrose'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Ferric oxide red', 'limited', 'ferric'],
      ['Ferric oxide yellow', 'limited', 'ferric'],
      ['Sodium lauryl sulphate', 'limited', 'sls'],
      ['Carnauba wax', 'cleared', 'carnauba'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Crospovidone', 'cleared', 'crospovidone'],
      ['Glyceryl dibehenate', 'cleared', 'glycerylDibehenate'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone', 'cleared', 'povidone'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Same inactive list as the 144-caplet carton. This 120-caplet carton is NDC 69452-447-22 (setid 1f2f8fcf), not the already-written 216-count NDC 69452-394 row. Stay under 4 g/day acetaminophen. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}1f2f8fcf-bf08-2a21-e063-6394a90a9e71; setid 1f2f8fcf-bf08-2a21-e063-6394a90a9e71; NDC 69452-447-22; 120 caplets). Inactive ingredients: carnauba wax, colloidal silicon dioxide, croscarmellose sodium, crospovidone, ferric oxide red, ferric oxide yellow, glyceryl dibehenate, hypromellose, microcrystalline cellulose, polydextrose, polyethylene glycol, povidone, pregelatinized starch, sodium lauryl sulphate, stearic acid, titanium dioxide. Ages 12+.`,
  },
];

export const BATCH93_KYR6_AMAZON_3P_APLUS_HEALTH: RatingRecord[] = COMPACT.map(expand);

export const BATCH93_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH93_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'A+Health Castor Oil, 6 fl oz (177 mL), NDC 69452-487-97',
    reason:
      'SKIPPED OUT. Graded oil pour bottle. DailyMed setid 3f9728e8-c7a2-6cfb-e063-6394a90a8f1d prints Inactive ingredients: None. Castor oil is the active. Oil pour bottles stay ungraded. Not a no_OI leftover. NO Search row.',
  },
];

export const BATCH93_SKIPPED_ON_MAIN: { sku: string; reason: string }[] = [
  {
    sku: 'A+Health Dual Action (ferric oxides), NDC 69452-394',
    reason:
      'SKIPPED already-on-MAIN. Twin of `aplus-health-dual-action-oxides` (batch55, setid 04ccc4b2-0cfd-3012-e063-6394a90afa79, UPC-A 369452394649 on the 216-count). The 400-count package NDC 69452-394-81 is the same setid. Not rewritten. The 144-count and 120-count oxide cartons are different setids and are written above.',
  },
  {
    sku: 'A+Health Dual Action, NDC 69452-469',
    reason:
      'SKIPPED already-on-MAIN. Twin of `aplus-health-dual-action` (batch55, setid 4834aa7f-cb0c-ec58-e063-6394a90ae2fc). Plain SPL, no ferric oxides. Not rewritten.',
  },
];

export const BATCH93_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH93_SKIPPED_NO_OI,
  ...BATCH93_SKIPPED_OUT,
  ...BATCH93_SKIPPED_ON_MAIN,
];

export const BATCH93_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'A+Health Dextromethorphan HBr 15 mg, 60 softgels, NDC 69452-573-17',
    reason:
      'REFUSED exact panel string(s) `pharmaceutical imprinting ink`, `sorbitol sorbitan solution`. DailyMed setid 5a5dde85-8785-8149-e063-6294a90a4d57. NO Search row.',
  },
  {
    sku: 'A+Health Ibuprofen 200 mg, 160 softgels, NDC 69452-260-79',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. US-site inactive list on setid 2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8. The Made in India 300-count (69452-260-83) is a different panel and is written. NO Search row.',
  },
  {
    sku: 'A+Health Ibuprofen 200 mg, 240 softgels, NDC 69452-260-82',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. US-site inactive list on setid 2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8. NO Search row.',
  },
  {
    sku: 'A+Health Ibuprofen 200 mg minis, 240 softgels, NDC 69452-262-82',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid a14ca126-fada-c903-e053-2995a90ae72d prints that string and a second India-site list without it on the same NDC. The pack is not one pinned list. NO Search row.',
  },
  {
    sku: 'A+Health Ibuprofen 200 mg minis, 500 softgels, NDC 69452-262-30',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid a14ca126-fada-c903-e053-2995a90ae72d. No panel pins this count to the India-site list. NO Search row.',
  },
  {
    sku: 'A+Health Dye-Free Ibuprofen 200 mg, 180 mini capsules, NDC 69452-302-25',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid c46c9c36-8844-7b50-e053-2a95a90aa0e9 prints that string and a second India-site list without it on the same NDC. NO Search row.',
  },
  {
    sku: 'A+Health Cetirizine HCl 10 mg dye-free, 65 softgels, NDC 69452-479-88',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid 4fe8f764-a8e2-a432-e063-6294a90a33b0. NO Search row.',
  },
  {
    sku: 'A+Health Cetirizine HCl 10 mg, 65 softgels, NDC 69452-265-88',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid 2c2c4828-0479-4ff3-b2b0-dde5fa74efaf also prints FD&C yellow #6, which is locked, but `pharmaceutical ink` is not. Sibling carton codes 69452-265-15 and 69452-265-86 are the same SPL. NO Search row.',
  },
  {
    sku: 'A+Health Dye-Free Pain Relief PM, 80 softgels, NDC 69452-507-78',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid 51037299-37dd-ca57-e063-6394a90a12c7. Ibuprofen 200 mg / diphenhydramine HCl 25 mg. NO Search row.',
  },
  {
    sku: 'A+Health Pain Relief PM, 120 softgels, NDC 69452-264-22',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid 58666a5c-fc92-4c8d-9c04-f0c98dc05c56. NO Search row.',
  },
  {
    sku: 'A+Health Naproxen Sodium 220 mg liquid gels',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setids 9343c79f-9994-4599-bcfe-0a93e49d726e (NDC 69452-259, 120-count and 180-count) and ba4f927a-4bbe-0d87-e053-2995a90a8c20 (NDC 69452-284-25, 180-count). NO Search row.',
  },
  {
    sku: 'A+Health Migraine Relief Ibuprofen 200 mg, 160 softgels, NDC 69452-263-79',
    reason:
      'REFUSED exact panel string `pharmaceutical ink`. Setid 662ae0e0-bd44-4db4-8083-fc2e11d49abe. NO Search row.',
  },
  {
    sku: 'A+Health Ear Drops Carbamide Peroxide 6.5%',
    reason:
      'REFUSED exact panel string(s) `Flavor`, `Sodium Lauroyl Sarcosinate`, `Sodium Stannate`. Setid e8bcf92c-ad32-49d5-e053-2995a90ae0c6 (NDC 69452-377). NO Search row.',
  },
  {
    sku: 'A+Health Gas Relief Simethicone 125 mg, 250 softgels, NDC 69452-542-28',
    reason:
      'REFUSED exact panel string `pharmaceutical imprinting ink`. Setid 4d7a9507-6f3c-6d15-e063-6294a90a0160. NO Search row.',
  },
  {
    sku: 'A+Health Ultra Strength Gas Relief Simethicone 180 mg, 300 softgels, NDC 69452-543-83',
    reason:
      'REFUSED exact panel string `pharmaceutical imprinting ink`. Setid 4e6ac834-9ce3-1b54-e063-6294a90a9dff. NO Search row.',
  },
  {
    sku: 'A+Health Allergy Relief Diphenhydramine HCl 50 mg softgels, 300, NDC 69452-452-83',
    reason:
      'REFUSED exact panel string `sorbitol sorbitan solution`. Setid 1f737b76-14b5-618a-e063-6294a90a19c2. NO Search row.',
  },
  {
    sku: 'A+Health Allergy Relief Diphenhydramine HCl 25 mg softgels, NDC 69452-453-09',
    reason:
      'REFUSED exact panel string `sorbitol sorbitan solution`. Setid 323347c3-d51a-4976-e063-6294a90a952e. NO Search row.',
  },
  {
    sku: 'A+Health Nighttime Sleep-Aid Diphenhydramine HCl 50 mg softgels (blue), NDC 69452-427',
    reason:
      'REFUSED exact panel string `sorbitol sorbitan solution`. Setid 141b00b7-a283-40ab-e063-6294a90aec77. Packs 32 (69452-427-10), 60 (69452-427-17), and 160 (69452-427-79). NO Search row.',
  },
  {
    sku: 'A+Health Nighttime Sleep-Aid Diphenhydramine HCl 50 mg, 120 softgels, NDC 69452-451-22',
    reason:
      'REFUSED exact panel string `sorbitol sorbitan solution`. Setid 1f74e760-9ba9-ac47-e063-6394a90acdff. NO Search row.',
  },
  {
    sku: 'A+Health Loperamide HCl oral solution, 120 mL and 240 mL, NDC 69452-405',
    reason:
      'REFUSED exact panel string(s) `flavadew coolmint`, `microcrystalline cellulose and carboxymethylcellulose sodium`, `plain caramel powder`, `simethicone emulsion`. Setid 4bd0939e-c172-d962-e063-6394a90a44b5. NO Search row.',
  },
  {
    sku: 'A+Health Stimulant Laxative Bisacodyl 5 mg, 300 tablets, NDC 69452-541-83',
    reason:
      'REFUSED exact panel string `pharmaceutical imprinting ink`. Setid 4b1f7db3-c6a8-7f6a-e063-6394a90a5829. NO Search row.',
  },
  {
    sku: 'A+Health Pinworm Treatment Pyrantel Pamoate suspension, NDC 69452-515',
    reason:
      'REFUSED exact panel string(s) `banana flavor`, `gylcerin`, `magnesium aluminum silicate`, `simethicone`, `sodium saccharin`. Setid 3cf96d04-e8bc-31af-e063-6294a90a0db8. `gylcerin` is the printed spelling and is not the locked glycerin token. NO Search row.',
  },
  {
    sku: 'A+Health Itch Relief Gel, 118 mL, NDC 69452-376-55 and 69452-496-55',
    reason:
      'REFUSED exact panel string `Diazolidnyl Urea`. Setids ecf5decb-c98b-7739-e053-2995a90a5541 and 38040732-48c9-3533-e063-6394a90af10a. That spelling is not the locked `diazolidinyl urea` token. NO Search row.',
  },
  {
    sku: 'A+Health Povidone-Iodine 10%, 237 mL, NDC 69452-483-93',
    reason:
      'REFUSED exact panel string(s) `dibasic sodium phosphate`, `nonoxynol-9`. Setid 3e63514a-dbb8-5bef-e063-6294a90a4008. `nonoxynol-9` is not bare nonoxynol, nonoxynol-10, or nonoxynol-30. NO Search row.',
  },
  {
    sku: 'A+Health Magnesium Citrate oral solution, 296 mL, NDC 69452-398-98',
    reason:
      'REFUSED exact panel string(s) `benzoic acid`, `flavor`. Setid 4019fbd0-fcf9-77a6-e063-6294a90a5ae7. Bare `flavor` is not the locked natural flavors token. NO Search row.',
  },
  {
    sku: 'A+Health Hemorrhoidal ointment, NDC 69452-448-38',
    reason:
      'REFUSED exact panel string(s) `benzoic acid`, `lanolin alcohols`, `thyme oil`, `vitamin E`, `white wax`. Setid 1790da99-2a22-e2a2-e063-6394a90ac36f. `lanolin alcohols` is not the locked `lanolin alcohol` token. `white wax` is not yellow beeswax. NO Search row.',
  },
  {
    sku: 'A+Health Lidocaine 4% roll-on, NDC 69452-393-63',
    reason:
      'REFUSED exact panel string `C30-45 Alkyl Cetearyl Dimethicone Crosspolymer`. Setid f607b6dc-8d13-604a-e053-2995a90a59ab. Not the locked `C30-45 alkyl dimethicone` / `C30-45 crosspolymer` strings. NO Search row.',
  },
  {
    sku: 'A+Health Lidocaine 4% patch, 6 count, NDC 69452-409-04',
    reason:
      'REFUSED exact panel string(s) `alicyclic hydrocarbon resin`, `styrene isoprene`, `styrene block copolymer`. Setid 19c69983-4e78-8ec5-e063-6394a90a84be. `alicyclic hydrocarbon resin` is not the locked `alicyclic saturated hydrocarbon resin`. Polyester film and silicone-coated polyester film are backing and are not the block. NO Search row.',
  },
  {
    sku: 'A+Health Itch Relief cream, NDC 69452-449-37',
    reason:
      'REFUSED exact panel string `cetyl alcohol`. Setid 178ed513-4f22-8f11-e063-6294a90a109b. Cetyl alcohol is not the locked cetearyl alcohol / stearyl alcohol token. NO Search row.',
  },
  {
    sku: 'A+Health Zinc Oxide 20% ointment, 425 g, NDC 69452-450-58',
    reason:
      'REFUSED exact panel string `cetostearyl alcohol`. Setid 1549500a-0941-0fba-e063-6394a90a564e. Not the locked `cetearyl alcohol` token. NO Search row.',
  },
];

const _ROWS = BATCH93_KYR6_AMAZON_3P_APLUS_HEALTH;
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
  if (id === OXIDE_FORMULA || _formulaFirst.has(id)) _reuse += 1;
  else {
    _formulaFirst.add(id);
    _new += 1;
  }
}

if (_ROWS.length !== 12) throw new Error('batch93 row tally drift');
if (_grades.clean !== 1 || _grades.caution !== 2 || _grades.avoid !== 9) {
  throw new Error('batch93 Search grade drift');
}
if (_new !== 9 || _reuse !== 3) throw new Error('batch93 NEW/REUSE drift');
if (BATCH93_SKIPPED_NO_OI.length !== 0) throw new Error('batch93 no_OI drift');
if (BATCH93_SKIPPED_OUT.length !== 1) throw new Error('batch93 OUT drift');
if (BATCH93_SKIPPED_ON_MAIN.length !== 2) throw new Error('batch93 already-on-MAIN drift');
if (BATCH93_SKIPPED.length !== 3) throw new Error('batch93 SKIPPED drift');
if (BATCH93_REFUSED.length !== 30) throw new Error('batch93 REFUSED drift');
if (BATCH93_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch93 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'A+Health')) throw new Error('batch93 brand drift');
if (_ROWS.some((r) => r.barcode)) throw new Error('batch93 must not invent a UPC');
if (new Set(_ROWS.map((r) => r.id)).size !== _ROWS.length) throw new Error('batch93 duplicate id');
const _blob = [
  ..._ROWS.map((r) => `${r.brand} ${r.productName} ${r.id}`),
  ...BATCH93_SKIPPED.map((s) => s.sku),
  ...BATCH93_REFUSED.map((s) => s.sku),
].join('\n');
if (/healtha2z|goodsense|toothpaste|sprouts/i.test(_blob)) {
  throw new Error('batch93 must not write HealthA2Z, GoodSense, toothpaste, or Sprouts');
}
if (/\bTIME-Cap\b/.test(_blob)) throw new Error('batch93 must not write TIME-Cap');
