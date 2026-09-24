// DRAFT / not verified / batch 88 KYR6 WELMATE leftover-token backfill.
// Methodology v1.6 + MAIN §5 after the Sept 23, 2026 WELMATE refuse stamp
// (c2a448a). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. WELMATE only. Unlocks batch87 REFUSED rows whose blocking
// tokens are now stamped on MAIN, and whose other inactive tokens already
// sit on a locked §5 row. A panel that still has one unmapped token stays
// REFUSED with that exact string.
// wellspringmeds.com pages and the DailyMed NDCs named in batch87 are the
// pins. HTML bullets were not treated as a panel when a carton list was
// already transcribed. KYR5-d attaches a UPC-A only where the carton barcode
// matched this exact pack. Empty stays empty. NDC is not a UPC.
// OCR `chonüoitin sulfate` stays refused. The Latin cucumber fruit-extract
// string is not the locked token `cucumber extract`, so the spray stays refused.
// batch87 no_OI 6 was not hunted. OUT multipacks that were not in the
// refused list were not reopened.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Pack sizes of the same
// OI+form share formulaId. Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch87. No A+Health / HealthA2Z / TIME-Cap / GoodSense.
// No toothpaste. No house Amazon. No Sprouts. No graded oil pour bottles.
// Leftover Amazon 3P stays N=4.
//
// TALLY (unverified drafts in THIS file): 13 rows —
// Clean 0 / Caution 8 / Avoid 5.
// NEW 8 / REUSE-formula 5 / SKIPPED 0 (no_OI 0 / OUT 0) /
// REFUSED 2.
// Search grade: Clean 0 / Caution 8 / Avoid 5.
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

const BRAND = 'WELMATE';
const AMAZON = ['Amazon', 'wellspringmeds.com'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';
const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';
const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this cream they are not that High rule. Named single oil as the cream base is Cleared. Not an oil-bottle grade.';
const FILL_TAP =
  'Named fill on a capsule or softgel is not the gummy seed-oil High rule. Not an oil-bottle grade.';

const SHOP = 'https://wellspringmeds.com/products';

const METH = {
  aceK: 'Methodology §5 Moderate-risk (acesulfame potassium).',
  benzylTopical:
    'Methodology §5 Caution (benzyl alcohol as a topical inactive — locked Sept 15, 2026). Not the oral population-split row. Not Avoid.',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer, including type C and carbomer 940).',
  carmine:
    'Methodology §5 Caution (cochineal / carmine / carminic acid). Not Avoid.',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium).',
  cetyl:
    'Methodology §5 Cleared (cetyl alcohol — fatty-alcohol family with stearyl / cetearyl alcohol).',
  cetearyl:
    'Methodology §5 Cleared (cetearyl alcohol — fatty-alcohol family).',
  cholesterol:
    'Methodology §5 Caution (cholesterol as an Other Ingredient — exact token; locked Sept 23, 2026). Not High.',
  copperOxide:
    'Methodology §5 Caution (copper oxide — exact token; locked Sept 23, 2026). Distinct from Caution iron oxide as color. Not Avoid.',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate as filler). Anhydrous dicalcium phosphate sits on this filler row.',
  dlAlpha:
    'Methodology §5 Cleared (DL-alpha tocopheryl acetate — exact token; locked Sept 23, 2026). Distinct from Caution tocopheryl acetate and from Cleared D-Alpha-Tocopherol / mixed tocopherols. Do not flip the Caution tocopheryl acetate row.',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate — exact token). Distinct from glyceryl stearate SE.',
  gmsSe:
    'Methodology §5 Cleared (glyceryl stearate SE / glyceryl monostearate SE — exact INCI). Distinct from glyceryl stearate.',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  hydrogenatedLecithin:
    'Methodology §5 Caution (hydrogenated lecithin — exact token; locked Sept 23, 2026). Distinct from Cleared canola / soy / sunflower lecithin. Do not flip that Cleared row. Not Avoid.',
  ipm: 'Methodology §5 Cleared (isopropyl myristate — topical emollient).',
  ironOxide:
    'Methodology §5 Caution (iron oxide as color). Ferrosoferric oxide and black iron oxide map here (Sept 23, 2026). Not a new grade. Not Avoid. Not a dye High.',
  koh: 'Methodology §5 Cleared (potassium hydroxide — pH adjuster, trace; locked Sept 15, 2026). Not a grade driver.',
  lactose: 'Methodology §5 Cleared (lactose monohydrate).',
  lightMineral:
    'Methodology §5 Cleared (light mineral oil as a topical occlusive — petrolatum / mineral-oil neighborhood). Not an oil-bottle grade.',
  marigold:
    'Methodology §5 Caution (marigold extract (Tagetes erecta) — exact token; locked Sept 23, 2026). Extract. Both strings written. Not a named-color pass. Not Avoid.',
  mctUnlabeled:
    'Methodology §5 Limited-risk (unlabeled MCT — medium chain triglycerides when the token does not name coconut or palm kernel). Not an oil-bottle grade. Not gummy High.',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid copolymer / unnamed delayed-release composites — locked Sept 14, 2026). Panel string methacrylic acid copolymer dispersion sits on this row. Distinct from Caution methacrylic acid. Not Avoid.',
  monoDi:
    'Methodology §5 Caution (Mono- and Diglycerides, unspecified blend — locked Sept 16, 2026). Panel string mono and di glycerides sits on this row. Not named GMS. Not Avoid.',
  peg100:
    'Methodology §5 Caution (PEG-100 stearate — exact INCI; locked Sept 15, 2026). Distinct from the Moderate polyethylene glycol row. Not Avoid.',
  pegEther:
    'Methodology §5 Caution (polyoxyethylene (23) cetyl ether — exact token; PEG-ether; locked Sept 23, 2026). Not High. Distinct from Caution polyoxyl 20 cetostearyl ether. Do not flip that row.',
  petrolatum: 'Methodology §5 Cleared (white petrolatum / petrolatum).',
  pgOral: 'Methodology §5 Moderate-risk (propylene glycol, oral).',
  pgDicaprylate:
    'Methodology §5 Caution (propylene glycol dicaprylate — exact token; locked Sept 23, 2026). Distinct from Moderate propylene glycol (oral). Not High.',
  pgTopical: `Methodology §5 Cleared (propylene glycol, topical). ${PG_TOPICAL_TAP}`,
  polysorbate: 'Methodology §5 Moderate-risk (polysorbate 80).',
  safflowerFill:
    'Methodology §5 Cleared (safflower oil as softgel fill — locked Sept 16, 2026). Not gummy High. Not an oil-bottle grade.',
  shellac: 'Methodology §5 Cleared (shellac).',
  sio2:
    'Methodology §5 Limited-risk (silicon dioxide / colloidal silicon dioxide — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid).',
  sodiumBenzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate).',
  soybeanCream: `Methodology §5 Cleared (soybean oil / glycine soja oil as a cream base — locked Sept 15, 2026). ${CREAM_OIL_TAP} Soy disclosure only. Not gummy High.`,
  starch:
    'Methodology §5 Cleared (named corn starch). Not Limited modified starch. The parenthetical in sugar spheres (corn starch and sucrose) is this named starch.',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  sucrose:
    'Methodology §5 Limited-risk (sucrose — existing Limited sugar; Sept 20, 2026 NOW #261 alias). Distinct from Caution bare sugar and from Cleared cane sugar.',
  sucroseEster:
    'Methodology §5 Caution (sucrose stearate / sucrose distearate — exact tokens; both strings written; locked Sept 23, 2026). Sucrose-ester neighborhood with Caution sucrose fatty acid esters. Not High.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  tocopherol:
    'Methodology §5 Cleared (tocopherol / mixed tocopherols as an antioxidant). Not Caution tocopheryl acetate. Not Cleared DL-alpha tocopheryl acetate.',
  tocopherylAcetate:
    'Methodology §5 Caution (tocopheryl acetate — exact INCI; locked Sept 15, 2026). Panel string vitamin E acetate sits on this Caution row. Not Cleared DL-alpha tocopheryl acetate. Do not flip this Caution row.',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
  triglycerides:
    'Methodology §5 Cleared (C10-18 triglycerides as fill — exact token; locked Sept 23, 2026). Not gummy seed-oil High. This cream vehicle is that fill row. Not an oil-bottle grade.',
  trolamine:
    'Methodology §5 Caution (TEA / trolamine / triethanolamine as an inactive — locked Sept 15, 2026). Not Avoid.',
  vanilla:
    'Methodology §5 Caution (vanilla flavor — exact token; locked Sept 23, 2026). Distinct from Limited natural flavors. Not Avoid.',
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
  productType: typeof OTC | typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  barcode?: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Allergies: [
        'claritin-allergy-tablets-plain',
        'Independently Clean Claritin plain loratadine already on main. Form labeled, not a hard filter (§6).',
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
      Vitamins: [
        'amazon-elements-vitamin-d3-5000-softgels',
        'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).',
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
    sourcesGeneral: [
      `${d.cite}${d.barcode ? ` UPC-A ${d.barcode} is the GTIN-12 for this exact pack.` : ''} — ${UNVERIFIED_NOTE}`,
    ],
  });
}

const ESOME = 'welmate-b88-esomeprazole';
const LIDO_CHOL = 'welmate-b88-lidocaine-5-cholesterol';
const LIDO_C10 = 'welmate-b88-lidocaine-5-c10';
const BUTEN = 'welmate-b88-butenafine';
const AREDS = 'welmate-b88-areds2';

const ESOME_FLAGS: Compact['flags'] = [
  ['FD&C blue no 1', 'high', 'dye'],
  ['FD&C red no 3', 'high', 'dye'],
  ['Ferrosoferric oxide', 'limited', 'ironOxide'],
  ['Talc', 'high', 'talc'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Polysorbate 80', 'moderate', 'polysorbate'],
  ['Propylene glycol', 'moderate', 'pgOral'],
  ['Methacrylic acid copolymer dispersion', 'limited', 'methacrylic'],
  ['Mono- and diglycerides', 'limited', 'monoDi'],
  ['Sucrose', 'limited', 'sucrose'],
  ['Corn starch', 'cleared', 'starch'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['Hypromellose', 'cleared', 'hpmc'],
  ['Magnesium stearate', 'cleared', 'stearate'],
  ['Potassium hydroxide', 'cleared', 'koh'],
  ['Shellac', 'cleared', 'shellac'],
  ['Triethyl citrate', 'cleared', 'triethyl'],
];

const LIDO_CHOL_FLAGS: Compact['flags'] = [
  ['Benzyl alcohol', 'limited', 'benzylTopical'],
  ['Cholesterol', 'limited', 'cholesterol'],
  ['Hydrogenated lecithin', 'limited', 'hydrogenatedLecithin'],
  ['Polysorbate 80', 'moderate', 'polysorbate'],
  ['Trolamine', 'limited', 'trolamine'],
  ['Vitamin E acetate', 'limited', 'tocopherylAcetate'],
  ['Carbomer 940', 'cleared', 'carbomer'],
  ['Isopropyl myristate', 'cleared', 'ipm'],
  ['Propylene glycol', 'cleared', 'pgTopical'],
  ['Purified water', 'cleared', 'water'],
];

const LIDO_C10_FLAGS: Compact['flags'] = [
  ['Benzyl alcohol', 'limited', 'benzylTopical'],
  ['PEG-100 stearate', 'limited', 'peg100'],
  ['Triethanolamine', 'limited', 'trolamine'],
  ['Carbomer', 'cleared', 'carbomer'],
  ['C10-18 triglycerides', 'cleared', 'triglycerides'],
  ['Cetearyl alcohol', 'cleared', 'cetearyl'],
  ['Glyceryl stearate', 'cleared', 'glycerylStearate'],
  ['Glycine soja (soybean) oil', 'cleared', 'soybeanCream'],
  ['Isopropyl myristate', 'cleared', 'ipm'],
  ['Propylene glycol', 'cleared', 'pgTopical'],
  ['Stearic acid', 'cleared', 'stearate'],
  ['Tocopherol', 'cleared', 'tocopherol'],
  ['Water', 'cleared', 'water'],
];

const BUTEN_FLAGS: Compact['flags'] = [
  ['Benzyl alcohol', 'limited', 'benzylTopical'],
  ['Polyoxyethylene (23) cetyl ether', 'limited', 'pegEther'],
  ['Propylene glycol dicaprylate', 'limited', 'pgDicaprylate'],
  ['Sodium benzoate', 'limited', 'sodiumBenzoate'],
  ['Trolamine', 'limited', 'trolamine'],
  ['Cetyl alcohol', 'cleared', 'cetyl'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Glyceryl monostearate SE', 'cleared', 'gmsSe'],
  ['Purified water', 'cleared', 'water'],
  ['Stearic acid', 'cleared', 'stearate'],
  ['White petrolatum', 'cleared', 'petrolatum'],
];

const AREDS_FLAGS: Compact['flags'] = [
  ['Titanium dioxide', 'high', 'tio2'],
  ['Marigold extract (tagetes erecta)', 'limited', 'marigold'],
  ['Copper oxide', 'limited', 'copperOxide'],
  ['Carmine', 'limited', 'carmine'],
  ['Medium chain triglycerides', 'limited', 'mctUnlabeled'],
  ['dl-alpha tocopheryl acetate', 'cleared', 'dlAlpha'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Safflower oil', 'cleared', 'safflowerFill'],
  ['Purified water', 'cleared', 'water'],
];

const COMPACT: Compact[] = [
  {
    id: ESOME,
    productName: 'WELMATE Esomeprazole Magnesium 20 mg, 42 Delayed-Release Capsules',
    category: 'Digestive',
    formulaId: ESOME,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Esomeprazole magnesium', strength: '20mg' }],
    flags: ESOME_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C blue no 1, FD&C red no 3, talc, and titanium dioxide. Ferrosoferric oxide maps to the locked Caution iron oxide-as-color row. It is not a new grade and not a dye High. Sugar spheres (corn starch and sucrose) splits into named corn starch (Cleared) and sucrose (Limited sugar). Mono- and diglycerides stay the unspecified-blend Caution row. Methacrylic acid copolymer dispersion stays the Caution copolymer row. Potassium hydroxide is the Cleared pH adjuster. Oral propylene glycol stays Moderate. The pack of 2 prints the same inactive line.',
    cite: `Wellspring inactive line (${SHOP}/welmate-esomeprazole-magnesium-20mg-delayed-release-capsules-24-hour-acid-reducer-42-count) and the pack-of-2 page print: fd & c blue no 1, fd & c red no 3, ferrosoferric oxide, gelatin, hydroxypropyl cellulose, hypromellose, magnesium stearate, methacrylic acid copolymer dispersion, mono and di glycerides, polysorbate 80, potassium hydroxide, propylene glycol, shellac, sugar spheres (corn starch and sucrose), talc, titanium dioxide and triethyl citrate. Matches DailyMed NDC 73581-013 (setid 0912d311-e26c-479d-9f13-ef0ac403e9b8), not the 73581-014 list. No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-esomeprazole-2pack',
    productName: 'WELMATE Esomeprazole Magnesium 20 mg, 42 Delayed-Release Capsules, Pack of 2',
    category: 'Digestive',
    formulaId: ESOME,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Esomeprazole magnesium', strength: '20mg' }],
    flags: ESOME_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive line as the 42-count single, so they share formulaId. Drivers are FD&C blue no 1, FD&C red no 3, talc, and titanium dioxide. Ferrosoferric oxide maps to Caution iron oxide as color. This pack is two 42-count bottles, not a second formula.',
    cite: `Wellspring pack-of-2 inactive line (${SHOP}/welmate-esomeprazole-magnesium-20-mg-heartburn-medicine-acid-reducer-delayed-release-heartburn-relief-24hr-protection-over-the-counter-medication-for-men-women-84-capsules-2-pack) matches the 42-count single and DailyMed NDC 73581-013. No GTIN-12 on the page.`,
  },
  {
    id: LIDO_CHOL,
    productName: 'WELMATE Lidocaine 5% Cream, 5.5 oz Jar',
    category: 'Pain & Fever',
    formulaId: LIDO_CHOL,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Lidocaine', strength: '5%' }],
    flags: LIDO_CHOL_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are benzyl alcohol, cholesterol, hydrogenated lecithin, polysorbate 80, trolamine, and vitamin E acetate. Cholesterol is the Sept 23 Other Ingredient Caution row, not High. Hydrogenated lecithin is its own Caution row, not Cleared lecithin. Vitamin E acetate sits on Caution tocopheryl acetate, not Cleared DL-alpha tocopheryl acetate. Topical propylene glycol stays Cleared. The 5.5 oz page spells Propylene Gylcol; that is the same propylene glycol token, not a new inactive. The 1 oz tube prints the same list with propylene glycol spelled out. No High. The pin does not print a numeric age floor; this draft uses 12+.',
    cite: `Wellspring 5.5 oz inactive line (${SHOP}/welmate-lidocaine-5-numbing-cream-maximum-strength-value-size-5-5-oz-jar): Benzyl Alcohol, Carbomer 940, Cholesterol, Hydrogenated Lecithin, Isopropyl Myristate, Polysorbate 80, Propylene Gylcol, Purified Water, Trolamine and Vitamin E Acetate. The 1 oz tube (${SHOP}/welmate-5-numbing-cream-maximum-strength-topical-anesthetic-1-oz-tube) prints the same list with propylene glycol spelled out. ${PG_TOPICAL_TAP} No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-lidocaine-5-cholesterol-1oz',
    productName: 'WELMATE Lidocaine 5% Cream, 1 oz Tube',
    category: 'Pain & Fever',
    formulaId: LIDO_CHOL,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Lidocaine', strength: '5%' }],
    flags: LIDO_CHOL_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same inactive line as the 5.5 oz jar, so they share formulaId. Drivers are benzyl alcohol, cholesterol, hydrogenated lecithin, polysorbate 80, trolamine, and vitamin E acetate. Not the C10-18 triglyceride cream. No High.',
    cite: `Wellspring 1 oz inactive line (${SHOP}/welmate-5-numbing-cream-maximum-strength-topical-anesthetic-1-oz-tube): benzyl alcohol, carbomer 940, cholesterol, hydrogenated lecithin, isopropyl myristate, polysorbate 80, propylene glycol, purified water, trolamine, vitamin E acetate. ${PG_TOPICAL_TAP} No GTIN-12 on the page.`,
  },
  {
    id: LIDO_C10,
    productName: 'WELMATE Lidocaine 5% Cream, 2 oz',
    category: 'Pain & Fever',
    formulaId: LIDO_C10,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Lidocaine', strength: '5%' }],
    flags: LIDO_C10_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are benzyl alcohol, PEG-100 stearate, and triethanolamine. C10-18 triglycerides is the Sept 23 Cleared fill row on this cream, not gummy seed-oil High and not an oil-bottle grade. Glycine soja (soybean) oil is Cleared cream-base soybean oil. Soy disclosure only. Tocopherol is Cleared mixed-tocopherol antioxidant, not Caution tocopheryl acetate. PEG-100 stearate stays Caution, not the Moderate PEG row. Not the cholesterol / hydrogenated-lecithin cream. The current 2 oz HTML bullets print that cholesterol list and were not treated as the panel. No High.',
    cite: `Batch87 carton pin for the 2 oz: benzyl alcohol, carbomer, C10-18 triglycerides, cetearyl alcohol, glyceryl stearate, glycine soja (soybean) oil, isopropyl myristate, PEG-100 stearate, propylene glycol, stearic acid, tocopherol, triethanolamine, water. The 6 oz page (${SHOP}/welmate-lidocaine-cream-6oz-jar) prints that same list, spelling glycine soja (soyabean) oil and water (aqua). Current HTML bullets on the 2 oz URL (${SHOP}/welmate-5-lidocaine-numbing-cream-maximum-strength-topical-anesthetic-aches-back-pain-itching-soreness-burning-bruises-unscented-child-resistant-packaging-2-oz-60-g) print the cholesterol cream and were not the panel. ${CREAM_OIL_TAP} ${PG_TOPICAL_TAP} No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-lidocaine-5-c10-6oz',
    productName: 'WELMATE Lidocaine 5% Cream, 6 oz',
    category: 'Pain & Fever',
    formulaId: LIDO_C10,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Lidocaine', strength: '5%' }],
    flags: LIDO_C10_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same inactive line as the 2 oz carton, so they share formulaId. The 6 oz page spells soyabean and water (aqua). Drivers are benzyl alcohol, PEG-100 stearate, and triethanolamine. C10-18 triglycerides stays Cleared fill. Not the cholesterol cream. No High.',
    cite: `Wellspring 6 oz inactive line (${SHOP}/welmate-lidocaine-cream-6oz-jar): benzyl alcohol, carbomer, C10-18 triglycerides, cetearyl alcohol, glyceryl stearate, glycine soja (soyabean) oil, isopropyl myristate, PEG-100 stearate, propylene glycol, stearic acid, tocopherol, triethanolamine, water (aqua). ${CREAM_OIL_TAP} No GTIN-12 on the page.`,
  },
  {
    id: BUTEN,
    productName: 'WELMATE Butenafine HCl 1% Cream, 1 oz',
    category: 'First Aid',
    formulaId: BUTEN,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Butenafine HCl', strength: '1%' }],
    flags: BUTEN_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are benzyl alcohol, polyoxyethylene (23) cetyl ether, propylene glycol dicaprylate, sodium benzoate, and trolamine. Polyoxyethylene (23) cetyl ether is the Sept 23 PEG-ether Caution row, not High, and not polyoxyl 20 cetostearyl ether. Propylene glycol dicaprylate is its own Caution row, not oral Moderate propylene glycol. Glyceryl monostearate SE stays Cleared. The pack of 3 is the same carton formula. No High.',
    cite: `Wellspring 1 oz (${SHOP}/welmate-athletes-foot-treatment-extra-strength-antifungal-cream-butenafine-hydrochloride-relief-from-ringworm-athletes-foot-jock-itch-foot-care-nail-fungus-treatment-for-toenail-1oz). DailyMed NDC 73581-210 (setid e650d8aa-c809-42ee-a1d9-a6321d5364f5) inactive ingredients: benzyl alcohol, cetyl alcohol, glycerin, glyceryl monostearate SE, polyoxyethylene (23) cetyl ether, propylene glycol dicaprylate, purified water, sodium benzoate, stearic acid, trolamine, white petrolatum. No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-butenafine-3pack',
    productName: 'WELMATE Butenafine HCl 1% Cream, 1 oz, Pack of 3',
    category: 'First Aid',
    formulaId: BUTEN,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Butenafine HCl', strength: '1%' }],
    flags: BUTEN_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same inactive line as the 1 oz single, so they share formulaId. Not a second formula. Drivers are benzyl alcohol, polyoxyethylene (23) cetyl ether, propylene glycol dicaprylate, sodium benzoate, and trolamine. No High.',
    cite: `Wellspring pack of 3 (${SHOP}/welmate-athletes-foot-treatment-extra-strength-antifungal-cream-butenafine-hydrochloride-relief-from-ringworm-athletes-foot-jock-itch-foot-care-nail-fungus-treatment-for-toenail-3-pk) is the 1 oz cream. DailyMed NDC 73581-210 inactive line is the pin. No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-docosanol',
    productName: 'WELMATE Docosanol 10%, 2 g, Pack of 2',
    category: 'First Aid',
    formulaId: 'welmate-b88-docosanol',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Docosanol', strength: '10%' }],
    flags: [
      ['Benzyl alcohol', 'limited', 'benzylTopical'],
      ['Sucrose distearate', 'limited', 'sucroseEster'],
      ['Sucrose stearate', 'limited', 'sucroseEster'],
      ['Light mineral oil', 'cleared', 'lightMineral'],
      ['Propylene glycol', 'cleared', 'pgTopical'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are benzyl alcohol, sucrose distearate, and sucrose stearate. Both sucrose esters are the Sept 23 Caution row, not High, and not a flip of sucrose fatty acid esters. Light mineral oil is the topical occlusive, not an oil-bottle grade. Topical propylene glycol stays Cleared. No High.',
    cite: `Wellspring pack of 2 (${SHOP}/welmate-docosanol-cold-sore-treatment-products-generic-abreva-2-pack). DailyMed NDC 73581-004 (setid 289e5003-7d08-c141-e063-6394a90abca3) inactive ingredients: benzyl alcohol, light mineral oil, propylene glycol, purified water, sucrose distearate and sucrose stearate. ${PG_TOPICAL_TAP} No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-diphenhydramine-1000',
    barcode: '373581000302',
    productName: 'WELMATE Diphenhydramine HCl 50 mg, 1000 Capsules',
    category: 'Allergies',
    formulaId: 'welmate-b88-diphenhydramine-1000',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: [
      ['D&C red #28', 'high', 'dye'],
      ['FD&C blue #1', 'high', 'dye'],
      ['FD&C red #40', 'high', 'dye'],
      ['Black iron oxide', 'limited', 'ironOxide'],
      ['Silicon dioxide', 'limited', 'sio2'],
      ['Sodium lauryl sulfate', 'limited', 'sls'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C red #28, FD&C blue #1, and FD&C red #40. Black iron oxide maps to the locked Caution iron oxide-as-color row. It is not a new grade and not a dye High. Sodium lauryl sulfate is standalone Caution and is not an Avoid driver. Contains lactose. The 50-count package on the same NDC was not a separate batch87 refuse and was not added.',
    cite: `Wellspring inactive line (${SHOP}/welmate-allergy-relief-diphenhydramine-50-mg-1000-count-capsules-antihistamine): black iron oxide, d&c red #28, fd&c blue #1, fd&c red #40, gelatin, lactose monohydrate, magnesium stearate, silicon dioxide, sodium lauryl sulfate. Matches DailyMed NDC 73581-020 (setid 4b012549-3958-43c1-9de7-897c5d8b20d3), package 73581-020-10.`,
  },
  {
    id: AREDS,
    productName: 'WELMATE AREDS 2 Mini Softgels, 120 Count',
    category: 'Vitamins',
    formulaId: AREDS,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '250mg' },
      { name: 'Vitamin E (as dl-alpha tocopheryl acetate)', strength: '90mg' },
      { name: 'Zinc (as zinc oxide)', strength: '40mg' },
      { name: 'Copper (as copper oxide)', strength: '1mg' },
      { name: 'Lutein', strength: '5mg' },
      { name: 'Zeaxanthin', strength: '1mg' },
    ],
    flags: AREDS_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Marigold extract (tagetes erecta), copper oxide, and carmine are Caution. Medium chain triglycerides do not name a plant source, so they stay Limited unlabeled MCT. dl-alpha tocopheryl acetate is the Sept 23 Cleared token and the labeled vitamin E source. It is not Caution tocopheryl acetate. Copper oxide on the other-ingredients line is the Sept 23 Caution token and the labeled copper source. Marigold extract is the lutein source printed on that same other-ingredients line. Ascorbic acid and zinc oxide on that line are the labeled vitamin C and zinc sources, not a second inactive grade. Zinc oxide as OI Caution is not applied to the labeled zinc active. Safflower oil on this softgel is Cleared fill. Not an oil-bottle grade. Not gummy High. The 240-count page prints the same other-ingredients line. No GTIN-12.',
    cite: `Wellspring other-ingredients (${SHOP}/welmate-areds-2-60-servings-eye-vitamin-and-mineral-supplement-vitamin-c-zinc-lutein-macular-health-doctor-formulated-clinically-tested-eye-care-gluten-free-120-mini-softgels): Ascorbic acid, dl-alpha tocopheryl acetate, gelatin, zinc oxide, glycerin, medium chain triglycerides, marigold extract (tagetes erecta), copper oxide, safflower oil, purified water, carmine, and titanium dioxide. Serving amounts on that page: Vitamin C 250 mg, Vitamin E 90 mg, Zinc 40 mg, Copper 1 mg, Lutein 5 mg, Zeaxanthin 1 mg. The 240-count page prints the same other-ingredients line. ${FILL_TAP} No DailyMed WELMATE drug SPL for this supplement. No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-areds2-240',
    productName: 'WELMATE AREDS 2 Mini Softgels, 240 Count',
    category: 'Vitamins',
    formulaId: AREDS,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '250mg' },
      { name: 'Vitamin E (as dl-alpha tocopheryl acetate)', strength: '90mg' },
      { name: 'Zinc (as zinc oxide)', strength: '40mg' },
      { name: 'Copper (as copper oxide)', strength: '1mg' },
      { name: 'Lutein', strength: '5mg' },
      { name: 'Zeaxanthin', strength: '1mg' },
    ],
    flags: AREDS_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same other-ingredients line as the 120-count, so they share formulaId. Driver is titanium dioxide. dl-alpha tocopheryl acetate stays the Cleared token. Marigold extract and copper oxide stay Caution. Not an oil-bottle grade.',
    cite: `Wellspring 240-count other-ingredients (${SHOP}/welmate-areds-2-120-servings-eye-vitamin-and-mineral-supplement-vitamin-c-zinc-lutein-macular-health-doctor-formulated-clinically-tested-eye-care-gluten-free-240-mini-softgels) match the 120-count line, including dl-alpha tocopheryl acetate, marigold extract (tagetes erecta), copper oxide, safflower oil, carmine, and titanium dioxide. ${FILL_TAP} No GTIN-12 on the page.`,
  },
  {
    id: 'welmate-b88-loperamide-simethicone',
    barcode: '373581000722',
    productName: 'WELMATE Loperamide 2 mg + Simethicone 125 mg, 24 Caplets',
    category: 'Digestive',
    formulaId: 'welmate-b88-loperamide-simethicone',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    actives: [
      { name: 'Loperamide HCl', strength: '2mg' },
      { name: 'Simethicone', strength: '125mg' },
    ],
    flags: [
      ['Acesulfame potassium', 'moderate', 'aceK'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Vanilla flavor', 'limited', 'vanilla'],
      ['Anhydrous dicalcium phosphate', 'cleared', 'dical'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are acesulfame potassium, colloidal silicon dioxide, and vanilla flavor. Vanilla flavor is the Sept 23 Caution flavor row, not Limited natural flavors. Anhydrous dicalcium phosphate is Cleared filler. No High.',
    cite: `Wellspring inactive line (${SHOP}/welmate-anti-diarrheal-anti-gas-loperamide-2mg-simethicone-125mg-24-caplets-generic-immodium-multi-symptom-relief): acesulfame potassium, anhydrous dicalcium phosphate, colloidal silicon dioxide, croscarmellose sodium, microcrystalline cellulose, stearic acid, vanilla flavor. Matches DailyMed NDC 73581-178 (setid 46f5c653-eec2-4729-8aaa-79f2e188eac3).`,
  },
];

export const BATCH88_KYR6_WELMATE_TOKEN_BACKFILL: RatingRecord[] = COMPACT.map(expand);

export const BATCH88_SKIPPED: { sku: string; reason: string }[] = [];

export const BATCH88_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'WELMATE Numbing Relief Lidocaine 5% Spray',
    reason:
      'REFUSED exact panel string `cucumis sativus (cucumber) fruit extract`. DailyMed WELMATE NDC 73581-920 (setid 562162c0-7a85-f83c-e063-6294a90a8fc5) still prints that string. MAIN locked `cucumber extract`, not this Latin fruit-extract string. Aloe barbadensis leaf extract and disodium cocoamphodipropionate on the same panel are now locked, and the rest of that panel maps, but one unmapped token keeps the SKU refused. Not on the Wellspring catalog. NO Search row.',
  },
  {
    sku: 'WelAhead by Welmate Lidocaine 5% Roll-on',
    reason:
      'REFUSED exact panel string `chonüoitin sulfate`. DailyMed NDC 83833-101 prints that OCR string. MAIN says it stays refuse until a clean chondroitin panel. Not corrected and not aliased. NO Search row.',
  },
];

const _ROWS = BATCH88_KYR6_WELMATE_TOKEN_BACKFILL;
if (_ROWS.length !== 13) throw new Error('batch88 tally drift: expected 13 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) throw new Error('batch88 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 8) throw new Error('batch88 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 5) throw new Error('batch88 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch88 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.id.startsWith('welmate-b88-'))) throw new Error('batch88 ids must use welmate-b88-');
if (_ROWS.some((r) => !r.formulaId?.startsWith('welmate-b88-'))) throw new Error('batch88 formula ids must use welmate-b88-');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch88 duplicate ids');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 8) throw new Error('batch88 NEW formula drift');
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 5) throw new Error('batch88 REUSE formula drift');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) throw new Error('batch88 formulaId must point at a row in this file');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch88 writes WELMATE only');
const _UPC: Record<string, string> = {
  'welmate-b88-diphenhydramine-1000': '373581000302',
  'welmate-b88-loperamide-simethicone': '373581000722',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 2) throw new Error('batch88 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch88 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch88 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch88 unexpected barcode on ${record.id}`);
  }
}
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|naturewise|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch88 other 3P / Sprouts / toothpaste / NOW / Nutricost / NatureWise must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/softgel|capsule|tablet|gel|ointment|cream/i.test(r.productName + (r.form ?? '')))) {
  throw new Error('batch88 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch88 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch88 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch88 Clean row has a non-cleared flag on ${record.id}`);
  }
}
if (BATCH88_SKIPPED.length !== 0) throw new Error('batch88 SKIPPED drift');
if (BATCH88_REFUSED.length !== 2) throw new Error('batch88 REFUSED drift');
if (BATCH88_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) throw new Error('batch88 REFUSED must quote an exact panel string');
const _blob = _ROWS.map((r) => `${r.productName} ${r.inactiveIngredients.map((i) => i.name).join(' | ')}`).join('\n');
for (const token of [
  'Ferrosoferric oxide',
  'Cholesterol',
  'Hydrogenated lecithin',
  'C10-18 triglycerides',
  'Polyoxyethylene (23) cetyl ether',
  'Propylene glycol dicaprylate',
  'Sucrose distearate',
  'Sucrose stearate',
  'Black iron oxide',
  'dl-alpha tocopheryl acetate',
  'Marigold extract (tagetes erecta)',
  'Copper oxide',
  'Vanilla flavor',
]) {
  if (!_blob.includes(token)) throw new Error(`batch88 missing unlocked token ${token}`);
}
if (/cucumis sativus|chonüoitin|disodium cocoamphodipropionate|aloe barbadensis/i.test(_blob)) {
  throw new Error('batch88 must not write the still-refused spray or OCR panel');
}
if (BATCH88_REFUSED.some((s) => /no_OI/.test(s.reason))) throw new Error('batch88 no_OI is not this job');
