// DRAFT / not verified / batch 94 KYR6 A+Health leftover-token backfill.
// Methodology v1.6 + MAIN §5 after the Sept 24, 2026 A+Health stamp
// (5a59bf7). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. A+Health only. Unlocks batch93 REFUSED rows whose blocking
// tokens are now stamped on MAIN, and whose other inactive tokens already
// sit on a locked §5 row. A panel that still has one unmapped token stays
// REFUSED with that exact string. A pack that is still not one pinned list
// stays REFUSED.
// The pin is the DailyMed inactive paragraph batch93 named, plus the
// principal-display count. NDC is not a UPC. KYR5-d attaches a UPC-A only
// where the carton bars on the DailyMed image matched this exact pack.
// Empty stays empty. The itch gel and the dual-panel ibuprofen minis stay refused.
// Diazolidnyl Urea stays no row (parked formaldehyde-releaser). Castor oil
// 177 mL stays OUT. Toothpaste stays out. HealthA2Z, TIME-Cap, and
// GoodSense stay out.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Packs with the same inactive
// line share formulaId. Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch93. No house Amazon. No Sprouts. No factory.
// No graded oil pour bottles.
// Leftover Amazon 3P stays 3 (HealthA2Z, TIME-Cap, GoodSense).
//
// TALLY (unverified drafts in THIS file): 38 rows —
// Clean 0 / Caution 11 / Avoid 27.
// NEW 24 / REUSE-formula 14 /
// SKIPPED 1 (no_OI 0 / OUT 1) /
// REFUSED 4.
// Search grade: Clean 0 / Caution 11 / Avoid 27.
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
const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';
const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this ointment they are not that High rule. Named corn oil as the topical base is Cleared fill. Not an oil-bottle grade.';
const PEG600_TAP =
  'Polyethylene glycol 600 sits on the locked PEGs row with polyethylene glycol 400. Not a new grade.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  acrylate:
    'Methodology §5 Caution (acrylate/C10-30 alkyl acrylate crosspolymer — exact INCI). Not Avoid.',
  alcoholVehicle:
    'Methodology §5 Limited (alcohol / SD alcohol as a vehicle — SD Alcohol 40 sits on this row). Not Avoid.',
  alicyclic:
    'Methodology §5 Caution (alicyclic hydrocarbon resin — exact token; locked Sept 24, 2026). Distinct from Caution alicyclic saturated hydrocarbon resin. Not Avoid.',
  aloe:
    'Methodology §5 Caution (aloe barbadensis leaf extract as an Other Ingredient — maps to the Sept 23 aloe-as-OI row). Not a new grade. Not Avoid.',
  aminomethyl:
    'Methodology §5 Caution (aminomethyl propanol — locked Sept 15, 2026). Not Avoid.',
  bha: 'Methodology §5 High (BHA / butylated hydroxyanisole).',
  banana:
    'Methodology §5 Caution (banana flavor — exact token; locked Sept 24, 2026). Distinct from Limited natural flavors. Not Avoid.',
  benzoic:
    'Methodology §5 Caution (benzoic acid — exact token; locked Sept 24, 2026). Not Avoid.',
  caprylyl:
    'Methodology §5 Caution (caprylyl methicone — locked Sept 15, 2026). Not Avoid.',
  caramel:
    'Methodology §5 High (caramel color, undisclosed class). Plain caramel powder sits on this same Avoid row (Sept 24, 2026). Not caramel sugar syrup.',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer, including type C).',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium).',
  celluloseGum:
    'Methodology §5 Cleared (cellulose gum / carboxymethylcellulose sodium — MCC family). The printed MCC + CMC combo maps to this lock and to microcrystalline cellulose (Sept 24, 2026). Not a new grade.',
  ceteareth:
    'Methodology §5 Caution (ceteareth-20 — exact INCI; locked Sept 15, 2026). The inactive paragraph prints ceteareth 20. Not Avoid.',
  cetearyl:
    'Methodology §5 Cleared (cetearyl alcohol — fatty-alcohol family).',
  ceteth20p:
    'Methodology §5 Caution (ceteth-20 phosphate — exact INCI; locked Sept 15, 2026). Distinct from ceteth phosphate. Not Avoid.',
  cetostearyl:
    'Methodology §5 Cleared (cetostearyl alcohol — fatty-alcohol cream base with stearyl / cetearyl alcohol; locked Sept 24, 2026). Not a new grade.',
  cetyl:
    'Methodology §5 Cleared (cetyl alcohol — fatty-alcohol cream base with stearyl / cetearyl alcohol; locked Sept 24, 2026). Not a new grade.',
  citric:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers). Anhydrous citric acid sits on the citric acid row.',
  cornOilTopical: `Methodology §5 Cleared (corn oil as non-gummy fill). ${CREAM_OIL_TAP}`,
  crosspolymer:
    'Methodology §5 Caution (C30-45 alkyl cetearyl dimethicone crosspolymer — exact token; locked Sept 24, 2026). Distinct from Caution C30-45 alkyl dimethicone / C30-45 crosspolymer. Not Avoid.',
  dicalNa:
    'Methodology §5 Cleared (dibasic sodium phosphate — phosphate-salt filler with dicalcium / tricalcium phosphate; locked Sept 24, 2026). Not phosphoric acid.',
  dicetyl:
    'Methodology §5 Caution (dicetyl phosphate — exact INCI; locked Sept 15, 2026). Not Avoid.',
  dimethicone:
    'Methodology §5 Cleared (dimethicone / dimethicone copolyol).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye).',
  edta:
    'Methodology §5 Cleared (disodium EDTA / edetate disodium, trace preservative/stabilizer). Distinct from Caution tetrasodium EDTA.',
  ethylhexyl:
    'Methodology §5 Caution (ethylhexylglycerin — locked Sept 15, 2026). Not Avoid.',
  flavor:
    'Methodology §5 Caution (flavor — exact token; locked Sept 24, 2026). Distinct from Limited natural flavors. Not Avoid.',
  flavadew:
    'Methodology §5 Caution (flavadew coolmint — exact token; locked Sept 24, 2026). Distinct from Limited natural flavors. Not Avoid.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin:
    'Methodology §5 Cleared (glycerin). gylcerin is the Sept 24, 2026 typo alias of this same row. Not a new grade.',
  gms:
    'Methodology §5 Cleared (glyceryl monostearate / GMS). Distinct from glyceryl monostearate SE.',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate — exact token). Distinct from glyceryl stearate SE.',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  imprint:
    'Methodology §5 Caution (pharmaceutical imprinting ink — exact token; locked Sept 24, 2026). Distinct from Caution edible ink. Not Avoid.',
  ink:
    'Methodology §5 Caution (pharmaceutical ink — exact token; locked Sept 24, 2026). Distinct from Caution edible ink. Not Avoid.',
  koh: 'Methodology §5 Cleared (potassium hydroxide — pH adjuster, trace). Not a grade driver.',
  lactic: 'Methodology §5 Cleared (lactic acid — organic acid with citric).',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate).',
  lanolin:
    'Methodology §5 Caution (lanolin — wool-alcohol family). Not Avoid.',
  lanolinAlcohols:
    'Methodology §5 Caution (lanolin alcohol). Lanolin alcohols maps here (Sept 24, 2026). Not a new grade. Not Avoid.',
  lecithin: 'Methodology §5 Cleared (lecithin).',
  lightMineral:
    'Methodology §5 Cleared (light mineral oil as a topical occlusive — petrolatum / mineral-oil neighborhood). Not an oil-bottle grade.',
  magAlum:
    'Methodology §5 Caution (magnesium aluminum silicate — exact token; locked Sept 24, 2026). Distinct from Caution aluminum silicate and from Caution magnesium aluminometasilicate. Not Avoid.',
  mannitol:
    'Methodology §5 Limited (mannitol — sugar alcohol, oral).',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid copolymer / delayed-release coat). The panel string methacrylic acid and methyl methacrylate copolymer sits on this coat row. Distinct from Caution methacrylic acid. Not Avoid.',
  methylcellulose:
    'Methodology §5 Cleared (methylcellulose — named cellulose with hypromellose). Not unlabeled modified cellulose.',
  mineralOil:
    'Methodology §5 Cleared (paraffin + mineral oil as a topical ointment occlusive). Not an oral oil. Not an oil-bottle grade.',
  naoh: 'Methodology §5 Cleared (sodium hydroxide — pH adjuster, trace). Not a grade driver.',
  nonoxynol9:
    'Methodology §5 Caution (nonoxynol-9 — exact token; locked Sept 24, 2026). Distinct from Caution nonoxynol-30, nonoxynol-10, and bare nonoxynol. Not Avoid.',
  paraben:
    'Methodology §5 High (parabens — methylparaben and propylparaben, every form).',
  paraffin:
    'Methodology §5 Cleared (paraffin + mineral oil as a topical ointment occlusive). Not an oral oil. Not an oil-bottle grade.',
  peg: `Methodology §5 Moderate (PEGs / polyethylene glycol, including polyethylene glycol 400). ${PEG600_TAP}`,
  peppermint:
    'Methodology §5 Limited (peppermint oil as flavor). Not gummy High. Not an oil-bottle grade.',
  petrolatum: 'Methodology §5 Cleared (white petrolatum / petrolatum).',
  pgOral: 'Methodology §5 Moderate (propylene glycol, oral).',
  pgTopical: `Methodology §5 Cleared (propylene glycol, topical). ${PG_TOPICAL_TAP}`,
  povidone: 'Methodology §5 Cleared (povidone).',
  propylGallate: 'Methodology §5 High (propyl gallate).',
  ps60:
    'Methodology §5 Moderate (polysorbate 60 — same family as polysorbate 80 / 20). Not a new class.',
  saccharinNa:
    'Methodology §5 Caution (sodium saccharin — exact token; locked Sept 24, 2026). Not Avoid.',
  sarcosinate:
    'Methodology §5 Caution (sodium lauroyl sarcosinate — exact token; locked Sept 24, 2026). Not High. Distinct from Caution sodium lauryl sulfate.',
  simethicone:
    'Methodology §5 Caution (simethicone as an Other Ingredient — exact token; locked Sept 24, 2026). Not Avoid.',
  simethiconeEmulsion:
    'Methodology §5 Caution (simethicone emulsion as an Other Ingredient — exact token; locked Sept 24, 2026). Not Avoid.',
  sio2:
    'Methodology §5 Limited (colloidal silicon dioxide — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  sodiumBenzoate:
    'Methodology §5 Limited (synthetic preservatives — sodium benzoate).',
  sodiumCitrate:
    'Methodology §5 Cleared (sodium citrate — citrate-salt filler/buffer with citric acid).',
  sorbitan:
    'Methodology §5 Caution (sorbitan — plain / sorbitan esters as emulsifier). Not Avoid. Not the sorbitol row. Not sorbitol sorbitan solution.',
  sorbitol: 'Methodology §5 Limited (sorbitol — sugar alcohol, oral).',
  sorbitolSorbitan:
    'Methodology §5 Caution (sorbitol sorbitan solution — exact token; locked Sept 24, 2026). Distinct from Limited oral sorbitol and from Caution sorbitan esters. Not Avoid.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  stannate:
    'Methodology §5 Caution (sodium stannate — exact token; locked Sept 24, 2026). Not Avoid.',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  steareth21:
    'Methodology §5 Caution (steareth-21 — locked Sept 15, 2026). Not Avoid.',
  styreneBlock:
    'Methodology §5 Caution (styrene block copolymer — exact token; locked Sept 24, 2026). Distinct from Caution styrene isoprene and from Caution SIS. Not Avoid.',
  styreneIsoprene:
    'Methodology §5 Caution (styrene isoprene — exact token; locked Sept 24, 2026). Distinct from Caution SIS / polyisobutylene patch adhesives. Not Avoid.',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  thyme:
    'Methodology §5 Caution (thyme oil as an Other Ingredient — exact token; locked Sept 24, 2026). Not Avoid.',
  tio2: 'Methodology §5 High (titanium dioxide).',
  tocopherol:
    'Methodology §5 Cleared (tocopherol / mixed tocopherols as an antioxidant). Vitamin E maps here (Sept 24, 2026). Not Caution tocopheryl acetate.',
  triacetin:
    'Methodology §5 Cleared (triacetin — tablet coating plasticizer). Not a grade driver.',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
  water: 'Methodology §5 Cleared (purified water / water).',
  whiteWax:
    'Methodology §5 Caution (white wax — exact token; locked Sept 24, 2026). Distinct from Cleared beeswax / yellow beeswax and from Caution synthetic beeswax. Not Avoid.',
  xanthan:
    'Methodology §5 Cleared (xanthan gum — gum family).',
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
      'First Aid': [
        'boiron-arnicare-gel',
        'Independently Clean Boiron Arnicare Gel already on main. Form labeled, not a hard filter (§6).',
      ],
      'Eye & Ear': [
        'refresh-tears-pf',
        'Independently Clean Refresh Tears PF already on main. Form labeled, not a hard filter (§6).',
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

const DXM = 'aplushealth-b94-dxm-15';
const IBU_US = 'aplushealth-b94-ibu-200-us-ink';
const CET_DF = 'aplushealth-b94-cetirizine-dyefree';
const CET = 'aplushealth-b94-cetirizine-yellow6';
const PM_DF = 'aplushealth-b94-pm-dyefree';
const PM = 'aplushealth-b94-pm-dyes';
const NAP = 'aplushealth-b94-naproxen-220';
const MIG = 'aplushealth-b94-migraine-160';
const EAR = 'aplushealth-b94-ear-drops';
const GAS125 = 'aplushealth-b94-gas-125';
const GAS180 = 'aplushealth-b94-gas-180';
const DPH50 = 'aplushealth-b94-dph-50-peg600';
const SLEEP_BLUE = 'aplushealth-b94-sleep-blue';
const DPH25 = 'aplushealth-b94-dph-25';
const LOP = 'aplushealth-b94-loperamide-sol';
const BISA = 'aplushealth-b94-bisacodyl';
const PIN = 'aplushealth-b94-pinworm';
const PVP = 'aplushealth-b94-povidone-iodine';
const MAG = 'aplushealth-b94-mag-citrate';
const HEM = 'aplushealth-b94-hemorrhoidal';
const ROLL = 'aplushealth-b94-lidocaine-roll';
const PATCH = 'aplushealth-b94-lidocaine-patch';
const ITCH = 'aplushealth-b94-itch-cream';
const ZINC = 'aplushealth-b94-zinc-oxide';

const DXM_FLAGS: Compact['flags'] = [
  ['FD&C Blue No. 1', 'high', 'dye'],
  ['FD&C Red No. 40', 'high', 'dye'],
  ['Propyl gallate', 'high', 'propylGallate'],
  ['Polyethylene glycol 400', 'moderate', 'peg'],
  ['Propylene glycol', 'moderate', 'pgOral'],
  ['Pharmaceutical imprinting ink', 'limited', 'imprint'],
  ['Sorbitol sorbitan solution', 'limited', 'sorbitolSorbitan'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Povidone', 'cleared', 'povidone'],
  ['Purified water', 'cleared', 'water'],
];

const IBU_US_FLAGS: Compact['flags'] = [
  ['FD&C Blue #1', 'high', 'dye'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Pharmaceutical ink', 'limited', 'ink'],
  ['Sorbitan', 'limited', 'sorbitan'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Potassium hydroxide', 'cleared', 'koh'],
  ['Purified water', 'cleared', 'water'],
];

const CET_DF_FLAGS: Compact['flags'] = [
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Mannitol', 'limited', 'mannitol'],
  ['Pharmaceutical ink', 'limited', 'ink'],
  ['Sorbitan', 'limited', 'sorbitan'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
  ['Sodium hydroxide', 'cleared', 'naoh'],
];

const CET_FLAGS: Compact['flags'] = [
  ['FD&C yellow #6', 'high', 'dye'],
  ...CET_DF_FLAGS,
];

const PM_DF_FLAGS: Compact['flags'] = [
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Pharmaceutical ink', 'limited', 'ink'],
  ['Sorbitan', 'limited', 'sorbitan'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Potassium hydroxide', 'cleared', 'koh'],
  ['Purified water', 'cleared', 'water'],
];

const PM_FLAGS: Compact['flags'] = [
  ['FD&C blue #1', 'high', 'dye'],
  ['FD&C red #40', 'high', 'dye'],
  ...PM_DF_FLAGS,
];

const NAP_FLAGS: Compact['flags'] = [
  ['FD&C blue #1', 'high', 'dye'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Propylene glycol', 'moderate', 'pgOral'],
  ['Mannitol', 'limited', 'mannitol'],
  ['Pharmaceutical ink', 'limited', 'ink'],
  ['Sorbitan', 'limited', 'sorbitan'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Lactic acid', 'cleared', 'lactic'],
  ['Povidone', 'cleared', 'povidone'],
  ['Purified water', 'cleared', 'water'],
];

const MIG_FLAGS: Compact['flags'] = [
  ['FD&C Red #40', 'high', 'dye'],
  ['FD&C Yellow #6', 'high', 'dye'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['Pharmaceutical ink', 'limited', 'ink'],
  ['Sorbitan', 'limited', 'sorbitan'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Potassium hydroxide', 'cleared', 'koh'],
  ['Purified water', 'cleared', 'water'],
];

const EAR_FLAGS: Compact['flags'] = [
  ['Flavor', 'limited', 'flavor'],
  ['Sodium lauroyl sarcosinate', 'limited', 'sarcosinate'],
  ['Sodium stannate', 'limited', 'stannate'],
  ['Citric acid', 'cleared', 'citric'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Propylene glycol', 'cleared', 'pgTopical'],
  ['Purified water', 'cleared', 'water'],
];

const GAS125_FLAGS: Compact['flags'] = [
  ['D&C yellow no. 10', 'high', 'dye'],
  ['FD&C blue no. 1', 'high', 'dye'],
  ['FD&C red no. 40', 'high', 'dye'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Peppermint oil', 'limited', 'peppermint'],
  ['Pharmaceutical imprinting ink', 'limited', 'imprint'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
];

const GAS180_FLAGS: Compact['flags'] = [
  ['FD&C yellow no. 6', 'high', 'dye'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Peppermint oil', 'limited', 'peppermint'],
  ['Pharmaceutical imprinting ink', 'limited', 'imprint'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
];

const DPH50_FLAGS: Compact['flags'] = [
  ['Polyethylene glycol 400', 'moderate', 'peg'],
  ['Polyethylene glycol 600', 'moderate', 'peg'],
  ['Propylene glycol', 'moderate', 'pgOral'],
  ['Sorbitol sorbitan solution', 'limited', 'sorbitolSorbitan'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
];

const SLEEP_BLUE_FLAGS: Compact['flags'] = [
  ['FD&C blue #1', 'high', 'dye'],
  ...DPH50_FLAGS,
];

const DPH25_FLAGS: Compact['flags'] = [
  ['Polyethylene glycol 400', 'moderate', 'peg'],
  ['Propylene glycol', 'moderate', 'pgOral'],
  ['Sorbitol sorbitan solution', 'limited', 'sorbitolSorbitan'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
];

const LOP_FLAGS: Compact['flags'] = [
  ['D&C yellow no. 10', 'high', 'dye'],
  ['FD&C blue no. 1', 'high', 'dye'],
  ['Plain caramel powder', 'high', 'caramel'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Propylene glycol', 'moderate', 'pgOral'],
  ['Sucralose', 'moderate', 'sucralose'],
  ['Flavadew coolmint', 'limited', 'flavadew'],
  ['Simethicone emulsion', 'limited', 'simethiconeEmulsion'],
  ['Sodium benzoate', 'limited', 'sodiumBenzoate'],
  ['Anhydrous citric acid', 'cleared', 'citric'],
  ['Carboxymethylcellulose sodium', 'cleared', 'celluloseGum'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Purified water', 'cleared', 'water'],
  ['Xanthan gum', 'cleared', 'xanthan'],
];

const BISA_FLAGS: Compact['flags'] = [
  ['FD&C yellow #5 (tartrazine)', 'high', 'dye'],
  ['FD&C yellow #6', 'high', 'dye'],
  ['Talc', 'high', 'talc'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Colloidal silicon dioxide', 'limited', 'sio2'],
  ['Methacrylic acid and methyl methacrylate copolymer', 'limited', 'methacrylic'],
  ['Pharmaceutical imprinting ink', 'limited', 'imprint'],
  ['Hypromellose', 'cleared', 'hpmc'],
  ['Lactose monohydrate', 'cleared', 'lactose'],
  ['Magnesium stearate', 'cleared', 'stearate'],
  ['Microcrystalline cellulose', 'cleared', 'cellulose'],
  ['Sodium starch glycolate', 'cleared', 'ssg'],
  ['Triacetin', 'cleared', 'triacetin'],
  ['Triethyl citrate', 'cleared', 'triethyl'],
];

const PIN_FLAGS: Compact['flags'] = [
  ['Methylparaben', 'high', 'paraben'],
  ['Propylparaben', 'high', 'paraben'],
  ['Propylene glycol', 'moderate', 'pgOral'],
  ['Banana flavor', 'limited', 'banana'],
  ['Magnesium aluminum silicate', 'limited', 'magAlum'],
  ['Simethicone', 'limited', 'simethicone'],
  ['Sodium benzoate', 'limited', 'sodiumBenzoate'],
  ['Sodium saccharin', 'limited', 'saccharinNa'],
  ['Sorbitol', 'limited', 'sorbitol'],
  ['Citric acid', 'cleared', 'citric'],
  ['Gylcerin', 'cleared', 'glycerin'],
  ['Lecithin', 'cleared', 'lecithin'],
  ['Methylcellulose', 'cleared', 'methylcellulose'],
  ['Povidone', 'cleared', 'povidone'],
  ['Purified water', 'cleared', 'water'],
  ['Sodium citrate', 'cleared', 'sodiumCitrate'],
];

const PVP_FLAGS: Compact['flags'] = [
  ['Nonoxynol-9', 'limited', 'nonoxynol9'],
  ['Citric acid', 'cleared', 'citric'],
  ['Dibasic sodium phosphate', 'cleared', 'dicalNa'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
  ['Sodium hydroxide', 'cleared', 'naoh'],
];

const MAG_FLAGS: Compact['flags'] = [
  ['Sucralose', 'moderate', 'sucralose'],
  ['Benzoic acid', 'limited', 'benzoic'],
  ['Flavor', 'limited', 'flavor'],
  ['Citric acid', 'cleared', 'citric'],
  ['Disodium EDTA', 'cleared', 'edta'],
  ['Water', 'cleared', 'water'],
];

const HEM_FLAGS: Compact['flags'] = [
  ['Butylated hydroxyanisole', 'high', 'bha'],
  ['Methylparaben', 'high', 'paraben'],
  ['Propylparaben', 'high', 'paraben'],
  ['Benzoic acid', 'limited', 'benzoic'],
  ['Lanolin', 'limited', 'lanolin'],
  ['Lanolin alcohols', 'limited', 'lanolinAlcohols'],
  ['Thyme oil', 'limited', 'thyme'],
  ['White wax', 'limited', 'whiteWax'],
  ['Corn oil', 'cleared', 'cornOilTopical'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Mineral oil', 'cleared', 'mineralOil'],
  ['Paraffin', 'cleared', 'paraffin'],
  ['Purified water', 'cleared', 'water'],
  ['Vitamin E', 'cleared', 'tocopherol'],
];

const ROLL_FLAGS: Compact['flags'] = [
  ['Methylparaben', 'high', 'paraben'],
  ['Polysorbate 60', 'moderate', 'ps60'],
  ['Acrylates/C10-30 alkyl acrylate crosspolymer', 'limited', 'acrylate'],
  ['Aloe barbadensis leaf extract', 'limited', 'aloe'],
  ['Aminomethyl propanol', 'limited', 'aminomethyl'],
  ['C30-45 alkyl cetearyl dimethicone crosspolymer', 'limited', 'crosspolymer'],
  ['Caprylyl methicone', 'limited', 'caprylyl'],
  ['Ceteth-20 phosphate', 'limited', 'ceteth20p'],
  ['Dicetyl phosphate', 'limited', 'dicetyl'],
  ['Ethylhexylglycerin', 'limited', 'ethylhexyl'],
  ['SD Alcohol 40', 'limited', 'alcoholVehicle'],
  ['Steareth-21', 'limited', 'steareth21'],
  ['Cetearyl alcohol', 'cleared', 'cetearyl'],
  ['Dimethicone', 'cleared', 'dimethicone'],
  ['Disodium EDTA', 'cleared', 'edta'],
  ['Glyceryl stearate', 'cleared', 'glycerylStearate'],
  ['Purified water', 'cleared', 'water'],
];

const PATCH_FLAGS: Compact['flags'] = [
  ['Alicyclic hydrocarbon resin', 'limited', 'alicyclic'],
  ['Styrene isoprene', 'limited', 'styreneIsoprene'],
  ['Styrene block copolymer', 'limited', 'styreneBlock'],
  ['Mineral oil', 'cleared', 'mineralOil'],
];

const ITCH_FLAGS: Compact['flags'] = [
  ['Methylparaben', 'high', 'paraben'],
  ['Propylparaben', 'high', 'paraben'],
  ['Polysorbate 60', 'moderate', 'ps60'],
  ['Carbomer homopolymer type C', 'cleared', 'carbomer'],
  ['Cetyl alcohol', 'cleared', 'cetyl'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Glyceryl monostearate', 'cleared', 'gms'],
  ['Light mineral oil', 'cleared', 'lightMineral'],
  ['Purified water', 'cleared', 'water'],
  ['Stearic acid', 'cleared', 'stearate'],
];

const ZINC_FLAGS: Compact['flags'] = [
  ['Ceteareth 20', 'limited', 'ceteareth'],
  ['Cetostearyl alcohol', 'cleared', 'cetostearyl'],
  ['Light mineral oil', 'cleared', 'lightMineral'],
  ['White petrolatum', 'cleared', 'petrolatum'],
];

const COMPACT: Compact[] = [
  {
    id: DXM,
    productName: 'A+Health Dextromethorphan HBr 15 mg, 60 Softgels',
    category: 'Cold & Flu',
    formulaId: DXM,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Dextromethorphan HBr', strength: '15mg' }],
    flags: DXM_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C Blue No. 1, FD&C Red No. 40, and propyl gallate. Pharmaceutical imprinting ink and sorbitol sorbitan solution are the Sept 24 Caution stamps that unlocked this panel. They are not the Avoid drivers. Sorbitol sorbitan solution is not Limited sorbitol and not Caution sorbitan esters. Oral propylene glycol is Moderate. Under 12: do not use.',
    cite: `DailyMed SPL (${DM}5a5dde85-8785-8149-e063-6294a90a4d57; setid 5a5dde85-8785-8149-e063-6294a90a4d57; NDC 69452-573-17; 60 softgels). Inactive ingredients: FD&C Blue No. 1, FD&C Red No. 40, gelatin, glycerin, pharmaceutical imprinting ink, polyethylene glycol 400, povidone, propylene glycol, propyl gallate, purified water, sorbitol sorbitan solution. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: IBU_US,
    productName: 'A+Health Pain Relief Ibuprofen 200 mg, 160 Softgels',
    category: 'Pain & Fever',
    formulaId: IBU_US,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200mg' }],
    flags: IBU_US_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C Blue #1. Pharmaceutical ink is the Sept 24 Caution stamp that unlocked the US-site list. It is not the Avoid driver. Polyethylene glycol is Moderate. Sorbitan is Caution, not Avoid. This row is the US-site list on NDC 69452-260-79 only. The Made in India 300-count (69452-260-83) is already written and does not print pharmaceutical ink. Cartons 69452-260-11 (20) and 69452-260-78 (80) were not named in the batch93 refuse line and are not added. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8; setid 2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8; NDC 69452-260-79; 160 softgels). US-site inactive ingredients: FD&C Blue #1, gelatin, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitan and sorbitol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-ibu-200-240',
    productName: 'A+Health Pain Relief Ibuprofen 200 mg, 240 Softgels',
    category: 'Pain & Fever',
    formulaId: IBU_US,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200mg' }],
    flags: IBU_US_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same US-site inactive list as the 160-count, so they share formulaId. Driver is FD&C Blue #1. Pharmaceutical ink is the Sept 24 Caution stamp. Not the India 300-count panel. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8; setid 2b4ecdd8-627a-445f-8ddc-f2b6c832c1e8; NDC 69452-260-82; 240 softgels). US-site inactive ingredients match the 160-count: FD&C Blue #1, gelatin, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitan and sorbitol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: CET_DF,
    productName: 'A+Health Allergy Relief Cetirizine HCl 10 mg Dye-Free, 65 Softgels',
    category: 'Allergies',
    formulaId: CET_DF,
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    flags: CET_DF_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are polyethylene glycol, mannitol, pharmaceutical ink, sorbitan, and sorbitol. Pharmaceutical ink is the Sept 24 Caution stamp that unlocked this panel. Dye-free is the carton word. No dye and no titanium dioxide. Avoid needs High. Adults 65 and over, and children under 6: ask a doctor.',
    cite: `DailyMed SPL (${DM}4fe8f764-a8e2-a432-e063-6294a90a33b0; setid 4fe8f764-a8e2-a432-e063-6294a90a33b0; NDC 69452-479-88; 65 softgels). Inactive ingredients: gelatin, glycerin, mannitol, pharmaceutical ink, polyethylene glycol, purified water, sodium hydroxide, sorbitan, sorbitol. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: CET,
    productName: 'A+Health Allergy Relief Cetirizine HCl 10 mg, 25 Softgels',
    category: 'Allergies',
    formulaId: CET,
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    flags: CET_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C yellow #6. Pharmaceutical ink is the Sept 24 Caution stamp that unlocked this SPL. The 25-count (69452-265-86), 40-count (69452-265-15), and 65-count (69452-265-88) share this inactive list. Not the dye-free 65-count. Adults 65 and over, and children under 6: ask a doctor.',
    cite: `DailyMed SPL (${DM}2c2c4828-0479-4ff3-b2b0-dde5fa74efaf; setid 2c2c4828-0479-4ff3-b2b0-dde5fa74efaf; NDC 69452-265-86; 25 softgels). Inactive ingredients: FD&C yellow #6, gelatin, glycerin, mannitol, pharmaceutical ink, polyethylene glycol, purified water, sodium hydroxide, sorbitan, sorbitol. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-cetirizine-40',
    productName: 'A+Health Allergy Relief Cetirizine HCl 10 mg, 40 Softgels',
    category: 'Allergies',
    formulaId: CET,
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    flags: CET_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 25-count, so they share formulaId. Driver is FD&C yellow #6. Pharmaceutical ink is the Sept 24 Caution stamp. NDC 69452-265-15. Adults 65 and over, and children under 6: ask a doctor.',
    cite: `DailyMed SPL (${DM}2c2c4828-0479-4ff3-b2b0-dde5fa74efaf; setid 2c2c4828-0479-4ff3-b2b0-dde5fa74efaf; NDC 69452-265-15; 40 softgels). Same inactive list as the 25-count and 65-count. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-cetirizine-65',
    productName: 'A+Health Allergy Relief Cetirizine HCl 10 mg, 65 Softgels',
    category: 'Allergies',
    formulaId: CET,
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    flags: CET_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 25-count and 40-count, so they share formulaId. Driver is FD&C yellow #6. Pharmaceutical ink is the Sept 24 Caution stamp. NDC 69452-265-88. Not the dye-free 65-count. Adults 65 and over, and children under 6: ask a doctor.',
    cite: `DailyMed SPL (${DM}2c2c4828-0479-4ff3-b2b0-dde5fa74efaf; setid 2c2c4828-0479-4ff3-b2b0-dde5fa74efaf; NDC 69452-265-88; 65 softgels). Inactive ingredients: FD&C yellow #6, gelatin, glycerin, mannitol, pharmaceutical ink, polyethylene glycol, purified water, sodium hydroxide, sorbitan, sorbitol. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: PM_DF,
    productName:
      'A+Health Dye-Free Pain Relief PM Ibuprofen 200 mg and Diphenhydramine HCl 25 mg, 80 Softgels',
    category: 'Pain & Fever',
    formulaId: PM_DF,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [
      { name: 'Ibuprofen', strength: '200mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    flags: PM_DF_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are polyethylene glycol, pharmaceutical ink, sorbitan, and sorbitol. Pharmaceutical ink is the Sept 24 Caution stamp that unlocked this panel. Dye-free is the carton word. No High. Take 2 softgels at bedtime. Ages 12+.',
    cite: `DailyMed SPL (${DM}51037299-37dd-ca57-e063-6394a90a12c7; setid 51037299-37dd-ca57-e063-6394a90a12c7; NDC 69452-507-78; 80 softgels). Inactive ingredients: gelatin, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitan, sorbitol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: PM,
    productName:
      'A+Health Pain Relief PM Ibuprofen 200 mg and Diphenhydramine HCl 25 mg, 120 Softgels',
    category: 'Pain & Fever',
    formulaId: PM,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [
      { name: 'Ibuprofen', strength: '200mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    flags: PM_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C blue #1 and FD&C red #40. Pharmaceutical ink is the Sept 24 Caution stamp that unlocked this panel. It is not the Avoid driver. Not the dye-free 80-count. Take 2 softgels at bedtime. Ages 12+.',
    cite: `DailyMed SPL (${DM}58666a5c-fc92-4c8d-9c04-f0c98dc05c56; setid 58666a5c-fc92-4c8d-9c04-f0c98dc05c56; NDC 69452-264-22; 120 softgels). Inactive ingredients: FD&C blue #1, FD&C red #40, gelatin, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitan, sorbitol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: NAP,
    productName: 'A+Health Naproxen Sodium 220 mg, 120 Liquid Gels',
    category: 'Pain & Fever',
    formulaId: NAP,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Naproxen sodium', strength: '220mg' }],
    flags: NAP_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C blue #1. Pharmaceutical ink is the Sept 24 Caution stamp that unlocked this panel. Both 120-count bottles (69452-259-21 and 69452-259-22), the 180-count bottle (69452-259-25), and the other 180-count bottle (69452-284-25) print this same inactive list. The 80-count carton 69452-259-78 was not named in the batch93 refuse line and is not added. Oral propylene glycol is Moderate. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}9343c79f-9994-4599-bcfe-0a93e49d726e; setid 9343c79f-9994-4599-bcfe-0a93e49d726e; NDC 69452-259-21; 120 liquid gels). Inactive ingredients: FD&C blue #1, gelatin, glycerin, lactic acid, mannitol, pharmaceutical ink, polyethylene glycol, povidone, propylene glycol, purified water, sorbitan, sorbitol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-naproxen-120-22',
    productName: 'A+Health Naproxen Sodium 220 mg, 120 Liquid Gels, NDC 69452-259-22',
    category: 'Pain & Fever',
    formulaId: NAP,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Naproxen sodium', strength: '220mg' }],
    flags: NAP_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the other 120-count bottle, so they share formulaId. Driver is FD&C blue #1. Pharmaceutical ink is the Sept 24 Caution stamp. This package NDC is 69452-259-22. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}9343c79f-9994-4599-bcfe-0a93e49d726e; setid 9343c79f-9994-4599-bcfe-0a93e49d726e; NDC 69452-259-22; 120 liquid gels). Same inactive list as NDC 69452-259-21. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-naproxen-180-259',
    productName: 'A+Health Naproxen Sodium 220 mg, 180 Liquid Gels',
    category: 'Pain & Fever',
    formulaId: NAP,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Naproxen sodium', strength: '220mg' }],
    flags: NAP_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 120-count bottles, so they share formulaId. Driver is FD&C blue #1. Pharmaceutical ink is the Sept 24 Caution stamp. NDC 69452-259-25. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}9343c79f-9994-4599-bcfe-0a93e49d726e; setid 9343c79f-9994-4599-bcfe-0a93e49d726e; NDC 69452-259-25; 180 liquid gels). Same inactive list as the 120-count bottles on this setid. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-naproxen-180-284',
    productName: 'A+Health Naproxen Sodium 220 mg, 180 Liquid Gels, NDC 69452-284-25',
    category: 'Pain & Fever',
    formulaId: NAP,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Naproxen sodium', strength: '220mg' }],
    flags: NAP_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the NDC 69452-259 bottles, so they share formulaId. Driver is FD&C blue #1. Pharmaceutical ink is the Sept 24 Caution stamp. This is setid ba4f927a, package 69452-284-25, not the 259-25 bottle. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}ba4f927a-4bbe-0d87-e053-2995a90a8c20; setid ba4f927a-4bbe-0d87-e053-2995a90a8c20; NDC 69452-284-25; 180 liquid gels). Inactive ingredients: FD&C blue #1, gelatin, glycerin, lactic acid, mannitol, pharmaceutical ink, polyethylene glycol, povidone, propylene glycol, purified water, sorbitan, sorbitol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: MIG,
    productName: 'A+Health Migraine Relief Ibuprofen 200 mg, 160 Softgels',
    category: 'Pain & Fever',
    formulaId: MIG,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200mg' }],
    flags: MIG_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C Red #40 and FD&C Yellow #6. Pharmaceutical ink is the Sept 24 Caution stamp that unlocked this panel. Cartons 69452-263-11 (20) and 69452-263-78 (80) print this same list and were not named in the batch93 refuse line, so they are not added. Under 12: ask a doctor.',
    cite: `DailyMed SPL (${DM}662ae0e0-bd44-4db4-8083-fc2e11d49abe; setid 662ae0e0-bd44-4db4-8083-fc2e11d49abe; NDC 69452-263-79; 160 softgels). Inactive ingredients: FD&C Red #40, FD&C Yellow #6, gelatin, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitan and sorbitol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: EAR,
    productName: 'A+Health Ear Drops Carbamide Peroxide 6.5%, 0.5 fl oz (15 mL)',
    category: 'Eye & Ear',
    formulaId: EAR,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Carbamide peroxide', strength: '6.5%' }],
    flags: EAR_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are Flavor, sodium lauroyl sarcosinate, and sodium stannate. Those three are the Sept 24 Caution stamps that unlocked this panel. Flavor is not the Limited natural-flavors token. This drop is otic, so propylene glycol stays the topical Cleared row. No High. The twin carton is the same list. Ages 12+.',
    cite: `DailyMed SPL (${DM}e8bcf92c-ad32-49d5-e053-2995a90ae0c6; setid e8bcf92c-ad32-49d5-e053-2995a90ae0c6; NDC 69452-377-75; 15 mL dropper in a carton). Inactive ingredients: citric acid, Flavor, glycerin, propylene glycol, sodium lauroyl sarcosinate, sodium stannate, purified water. ${PG_TOPICAL_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-ear-twin',
    productName:
      'A+Health Ear Drops Carbamide Peroxide 6.5%, 1 fl oz (30 mL) Twin Pack',
    category: 'Eye & Ear',
    formulaId: EAR,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Carbamide peroxide', strength: '6.5%' }],
    flags: EAR_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same inactive list as the 15 mL single, so they share formulaId. Drivers are Flavor, sodium lauroyl sarcosinate, and sodium stannate. This carton is two 0.5 fl oz (15 mL) bottles. No High. Ages 12+.',
    cite: `DailyMed SPL (${DM}e8bcf92c-ad32-49d5-e053-2995a90ae0c6; setid e8bcf92c-ad32-49d5-e053-2995a90ae0c6; NDC 69452-377-95; two 15 mL droppers, 1 fl oz / 30 mL carton). Same inactive list as the single. ${PG_TOPICAL_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: GAS125,
    productName: 'A+Health Gas Relief Simethicone 125 mg, 250 Softgels',
    category: 'Digestive',
    formulaId: GAS125,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Simethicone', strength: '125mg' }],
    flags: GAS125_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C yellow no. 10, FD&C blue no. 1, FD&C red no. 40, and titanium dioxide. Pharmaceutical imprinting ink is the Sept 24 Caution stamp that unlocked this panel. It is not the Avoid driver. Simethicone is the active, not an inactive. Peppermint oil is the Limited flavor row. Ages 12+.',
    cite: `DailyMed SPL (${DM}4d7a9507-6f3c-6d15-e063-6294a90a0160; setid 4d7a9507-6f3c-6d15-e063-6294a90a0160; NDC 69452-542-28; 250 softgels). Inactive ingredients: D&C yellow no. 10, FD&C blue no. 1, FD&C red no. 40, gelatin, glycerin, peppermint oil, pharmaceutical imprinting ink, purified water, sorbitol, and titanium dioxide. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: GAS180,
    productName: 'A+Health Ultra Strength Gas Relief Simethicone 180 mg, 300 Softgels',
    category: 'Digestive',
    formulaId: GAS180,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Simethicone', strength: '180mg' }],
    flags: GAS180_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C yellow no. 6 and titanium dioxide. Pharmaceutical imprinting ink is the Sept 24 Caution stamp that unlocked this panel. Not the 125 mg formula. Simethicone is the active. The directions address adults and do not print a child dose. Peppermint oil is the Limited flavor row.',
    cite: `DailyMed SPL (${DM}4e6ac834-9ce3-1b54-e063-6294a90a9dff; setid 4e6ac834-9ce3-1b54-e063-6294a90a9dff; NDC 69452-543-83; 300 softgels). Inactive ingredients: FD&C yellow no. 6, gelatin, glycerin, peppermint oil, pharmaceutical imprinting ink, purified water, sorbitol, and titanium dioxide. Directions address adults. No GTIN-12 on the SPL.`,
  },
  {
    id: DPH50,
    productName: 'A+Health Allergy Relief Diphenhydramine HCl 50 mg, 300 Softgels',
    category: 'Allergies',
    formulaId: DPH50,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: DPH50_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are polyethylene glycol 400, polyethylene glycol 600, oral propylene glycol, and sorbitol sorbitan solution. Sorbitol sorbitan solution is the Sept 24 Caution stamp that unlocked this panel. It is not split into sorbitol plus sorbitan. No dye and no High. The dye-free sleep-aid 120-count prints this same inactive line and shares formulaId. The 100-count carton 69452-452-20 was not the named batch93 refuse line and is not added. Ages 12+.',
    cite: `DailyMed SPL (${DM}1f737b76-14b5-618a-e063-6294a90a19c2; setid 1f737b76-14b5-618a-e063-6294a90a19c2; NDC 69452-452-83; 300 softgels). Inactive ingredients: gelatin, glycerin, polyethylene glycol 400, polyethylene glycol 600, propylene glycol, purified water, sorbitol sorbitan solution. ${PEG600_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-sleep-dyefree-120',
    // KYR5-d — zbar on DailyMed front.jpg, NDC 69452-451-22, 120 softgels.
    barcode: '369452451229',
    upcNote:
      'UPC-A 369452451229 is the code under the bars on the DailyMed front image for NDC 69452-451-22 (120 dye-free softgels).',
    productName:
      'A+Health Nighttime Sleep-Aid Diphenhydramine HCl 50 mg Dye-Free, 120 Softgels',
    category: 'Sleep',
    formulaId: DPH50,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: DPH50_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same inactive line as the 50 mg allergy 300-count, so they share formulaId. Drivers are polyethylene glycol 400, polyethylene glycol 600, oral propylene glycol, and sorbitol sorbitan solution. Sorbitol sorbitan solution is the Sept 24 Caution stamp. Not the blue sleep-aid. One softgel at bedtime. Ages 12+.',
    cite: `DailyMed SPL (${DM}1f74e760-9ba9-ac47-e063-6394a90acdff; setid 1f74e760-9ba9-ac47-e063-6394a90acdff; NDC 69452-451-22; 120 softgels). Inactive ingredients: gelatin, glycerin, polyethylene glycol 400, polyethylene glycol 600, propylene glycol, purified water, sorbitol sorbitan solution. ${PEG600_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: SLEEP_BLUE,
    productName:
      'A+Health Nighttime Sleep-Aid Diphenhydramine HCl 50 mg, 32 Softgels',
    category: 'Sleep',
    formulaId: SLEEP_BLUE,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: SLEEP_BLUE_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C blue #1. Sorbitol sorbitan solution is the Sept 24 Caution stamp that unlocked this panel. It is not split into sorbitol plus sorbitan. The 32-count (69452-427-10), 60-count (69452-427-17), and 160-count (69452-427-79) share this list. Not the dye-free 120-count. One softgel at bedtime. Ages 12+.',
    cite: `DailyMed SPL (${DM}141b00b7-a283-40ab-e063-6294a90aec77; setid 141b00b7-a283-40ab-e063-6294a90aec77; NDC 69452-427-10; 32 softgels). Inactive ingredients: FD&C blue #1, gelatin, glycerin, polyethylene glycol 400, polyethylene glycol 600, propylene glycol, purified water, sorbitol sorbitan solution. ${PEG600_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-sleep-blue-60',
    productName:
      'A+Health Nighttime Sleep-Aid Diphenhydramine HCl 50 mg, 60 Softgels',
    category: 'Sleep',
    formulaId: SLEEP_BLUE,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: SLEEP_BLUE_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 32-count, so they share formulaId. Driver is FD&C blue #1. Sorbitol sorbitan solution is the Sept 24 Caution stamp. NDC 69452-427-17. Ages 12+.',
    cite: `DailyMed SPL (${DM}141b00b7-a283-40ab-e063-6294a90aec77; setid 141b00b7-a283-40ab-e063-6294a90aec77; NDC 69452-427-17; 60 softgels). Same inactive list as the 32-count and 160-count. ${PEG600_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-sleep-blue-160',
    productName:
      'A+Health Nighttime Sleep-Aid Diphenhydramine HCl 50 mg, 160 Softgels',
    category: 'Sleep',
    formulaId: SLEEP_BLUE,
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '50mg' }],
    flags: SLEEP_BLUE_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 32-count and 60-count, so they share formulaId. Driver is FD&C blue #1. Sorbitol sorbitan solution is the Sept 24 Caution stamp. NDC 69452-427-79. Ages 12+.',
    cite: `DailyMed SPL (${DM}141b00b7-a283-40ab-e063-6294a90aec77; setid 141b00b7-a283-40ab-e063-6294a90aec77; NDC 69452-427-79; 160 softgels). Same inactive list as the 32-count and 60-count. ${PEG600_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: DPH25,
    productName: 'A+Health Allergy Relief Diphenhydramine HCl 25 mg Dye-Free, 48 Softgels',
    category: 'Allergies',
    formulaId: DPH25,
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    flags: DPH25_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are polyethylene glycol 400, oral propylene glycol, and sorbitol sorbitan solution. Sorbitol sorbitan solution is the Sept 24 Caution stamp that unlocked this panel. This list does not print polyethylene glycol 600, so it does not share the 50 mg formula. The carton is 4 blister packs of 12. Children 6 to under 12: 1 softgel. Under 6: do not use.',
    cite: `DailyMed SPL (${DM}323347c3-d51a-4976-e063-6294a90a952e; setid 323347c3-d51a-4976-e063-6294a90a952e; NDC 69452-453-09; 48 softgels, 4 blister packs of 12). Inactive ingredients: gelatin, glycerin, polyethylene glycol 400, propylene glycol, purified water, sorbitol sorbitan solution. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: LOP,
    // KYR5-d — zbar on DailyMed image001-ch.jpg, label prints 4 fl oz (120 mL), NDC 69452-405-55.
    barcode: '369452405550',
    upcNote:
      'UPC-A 369452405550 is the code under the bars on the DailyMed 4 fl oz (120 mL) label for NDC 69452-405-55.',
    productName: 'A+Health Loperamide HCl Oral Solution, 4 fl oz (120 mL)',
    category: 'Digestive',
    formulaId: LOP,
    audience: ADULT,
    minAge: 6,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Loperamide HCl', strength: '1mg/7.5mL' }],
    flags: LOP_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C yellow no. 10, FD&C blue no. 1, plain caramel powder, and titanium dioxide. Plain caramel powder is the Sept 24 undisclosed-caramel Avoid row. Flavadew coolmint and simethicone emulsion are the Sept 24 Caution stamps. The printed MCC + CMC combo maps to the two Cleared cellulose locks, not a new grade. The 240 mL bottle is the same list. Children 2 to 5: ask a doctor. Under 2: do not use. Ages 6+ have a printed dose.',
    cite: `DailyMed SPL (${DM}4bd0939e-c172-d962-e063-6394a90a44b5; setid 4bd0939e-c172-d962-e063-6394a90a44b5; NDC 69452-405-55; 120 mL). Inactive ingredients: anhydrous citric acid, D&C yellow no. 10, FD&C blue no. 1, flavadew coolmint, glycerin, microcrystalline cellulose and carboxymethylcellulose sodium, plain caramel powder, propylene glycol, purified water, simethicone emulsion, sodium benzoate, sucralose, titanium dioxide, xanthan gum. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-loperamide-240',
    // KYR5-d — zbar on DailyMed image001-ad.jpg, label prints 8 fl oz (240 mL), NDC 69452-405-93.
    barcode: '369452405932',
    upcNote:
      'UPC-A 369452405932 is the code under the bars on the DailyMed 8 fl oz (240 mL) label for NDC 69452-405-93.',
    productName: 'A+Health Loperamide HCl Oral Solution, 8 fl oz (240 mL)',
    category: 'Digestive',
    formulaId: LOP,
    audience: ADULT,
    minAge: 6,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Loperamide HCl', strength: '1mg/7.5mL' }],
    flags: LOP_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 120 mL bottle, so they share formulaId. Drivers include plain caramel powder (Sept 24 undisclosed-caramel Avoid) plus the dyes and titanium dioxide. NDC 69452-405-93. Under 2: do not use.',
    cite: `DailyMed SPL (${DM}4bd0939e-c172-d962-e063-6394a90a44b5; setid 4bd0939e-c172-d962-e063-6394a90a44b5; NDC 69452-405-93; 240 mL). Same inactive list as the 120 mL bottle, including plain caramel powder, flavadew coolmint, the MCC + CMC combo, and simethicone emulsion. No GTIN-12 on the SPL.`,
  },
  {
    id: BISA,
    productName: 'A+Health Stimulant Laxative Bisacodyl 5 mg, 300 Tablets',
    category: 'Digestive',
    formulaId: BISA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Bisacodyl', strength: '5mg' }],
    flags: BISA_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C yellow #5 (tartrazine), FD&C yellow #6, oral talc, and titanium dioxide. Pharmaceutical imprinting ink is the Sept 24 Caution stamp that unlocked this panel. Methacrylic acid and methyl methacrylate copolymer sits on the locked methacrylic-acid-copolymer Caution row. It is not bare methacrylic acid. Children 6 to under 12: 1 tablet. Under 6: ask a doctor.',
    cite: `DailyMed SPL (${DM}4b1f7db3-c6a8-7f6a-e063-6394a90a5829; setid 4b1f7db3-c6a8-7f6a-e063-6394a90a5829; NDC 69452-541-83; 300 tablets). Inactive ingredients: colloidal silicon dioxide, FD&C yellow #5 (tartrazine), FD&C yellow #6, hypromellose, lactose monohydrate, magnesium stearate, methacrylic acid and methyl methacrylate copolymer, microcrystalline cellulose, pharmaceutical imprinting ink, sodium starch glycolate, talc, titanium dioxide, triacetin, triethyl citrate. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: PIN,
    productName: 'A+Health Pinworm Treatment Pyrantel Pamoate, 30 mL',
    category: 'Digestive',
    formulaId: PIN,
    audience: ADULT,
    minAge: 2,
    form: 'suspension',
    productType: OTC,
    actives: [{ name: 'Pyrantel pamoate', strength: '144mg/mL' }],
    flags: PIN_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are methylparaben and propylparaben. Banana flavor, magnesium aluminum silicate, simethicone, and sodium saccharin are the Sept 24 Caution stamps. gylcerin is the printed spelling and maps to Cleared glycerin (Sept 24). It is not a new grade. The 30 mL carton, the two-bottle carton, and the 473 mL bottle share this list. Under 2: consult a doctor. Ages 2+.',
    cite: `DailyMed SPL (${DM}3cf96d04-e8bc-31af-e063-6294a90a0db8; setid 3cf96d04-e8bc-31af-e063-6294a90a0db8; NDC 69452-515-36; 30 mL bottle). Inactive ingredients: banana flavor, citric acid, gylcerin, lecithin, magnesium aluminum silicate, methylcellulose, methylparaben, povidone, propylene glycol, propylparaben, purified water, simethicone, sodium benzoate, sodium citrate, sodium saccharin and sorbitol. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-pinworm-30-carton',
    productName: 'A+Health Pinworm Treatment Pyrantel Pamoate, 30 mL Carton',
    category: 'Digestive',
    formulaId: PIN,
    audience: ADULT,
    minAge: 2,
    form: 'suspension',
    productType: OTC,
    actives: [{ name: 'Pyrantel pamoate', strength: '144mg/mL' }],
    flags: PIN_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 30 mL bottle, so they share formulaId. Drivers are methylparaben and propylparaben. gylcerin maps to Cleared glycerin. NDC 69452-515-49 is one 30 mL bottle in a carton. Ages 2+.',
    cite: `DailyMed SPL (${DM}3cf96d04-e8bc-31af-e063-6294a90a0db8; setid 3cf96d04-e8bc-31af-e063-6294a90a0db8; NDC 69452-515-49; 30 mL bottle in a carton). Same inactive list as the 30 mL bottle, including gylcerin, banana flavor, magnesium aluminum silicate, simethicone, and sodium saccharin. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-pinworm-twin',
    productName: 'A+Health Pinworm Treatment Pyrantel Pamoate, 2 fl oz (60 mL) Twin Pack',
    category: 'Digestive',
    formulaId: PIN,
    audience: ADULT,
    minAge: 2,
    form: 'suspension',
    productType: OTC,
    actives: [{ name: 'Pyrantel pamoate', strength: '144mg/mL' }],
    flags: PIN_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 30 mL bottle, so they share formulaId. Drivers are methylparaben and propylparaben. The carton is two 1 oz bottles (2 fl oz / 60 mL). NDC 69452-515-38. gylcerin maps to Cleared glycerin. Ages 2+.',
    cite: `DailyMed SPL (${DM}3cf96d04-e8bc-31af-e063-6294a90a0db8; setid 3cf96d04-e8bc-31af-e063-6294a90a0db8; NDC 69452-515-38; carton of 2). Principal display: 2 fl oz (60 mL), two 1 oz bottles. Same inactive list, including gylcerin. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'aplushealth-b94-pinworm-473',
    // KYR5-d — zbar on DailyMed bottle-front.jpg; the same label prints 16 fl oz (473 mL).
    barcode: '369452409886',
    upcNote:
      'UPC-A 369452409886 is the code under the bars on the DailyMed bottle-front image that prints 16 fl oz (473 mL).',
    productName: 'A+Health Pinworm Treatment Pyrantel Pamoate, 16 fl oz (473 mL)',
    category: 'Digestive',
    formulaId: PIN,
    audience: ADULT,
    minAge: 2,
    form: 'suspension',
    productType: OTC,
    actives: [{ name: 'Pyrantel pamoate', strength: '144mg/mL' }],
    flags: PIN_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive list as the 30 mL bottle, so they share formulaId. Drivers are methylparaben and propylparaben. NDC 69452-515-88. gylcerin maps to Cleared glycerin. Ages 2+.',
    cite: `DailyMed SPL (${DM}3cf96d04-e8bc-31af-e063-6294a90a0db8; setid 3cf96d04-e8bc-31af-e063-6294a90a0db8; NDC 69452-515-88; 473 mL). Principal display: 16 fl oz (473 mL). Same inactive list, including gylcerin. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: PVP,
    // KYR5-d — zbar on DailyMed bottle-label.jpg, NDC 69452-483-93.
    barcode: '369452483930',
    upcNote:
      'UPC-A 369452483930 is the code under the bars on the DailyMed bottle label for NDC 69452-483-93 (8 fl oz / 237 mL).',
    productName: 'A+Health Povidone-Iodine 10%, 8 fl oz (237 mL)',
    category: 'First Aid',
    formulaId: PVP,
    audience: ADULT,
    minAge: 0,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Povidone-iodine', strength: '10%' }],
    flags: PVP_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is nonoxynol-9. Nonoxynol-9 and dibasic sodium phosphate are the Sept 24 stamps that unlocked this panel. Nonoxynol-9 is not bare nonoxynol, nonoxynol-10, or nonoxynol-30. Dibasic sodium phosphate is Cleared phosphate salt, not phosphoric acid. No High. The label does not print a minimum age.',
    cite: `DailyMed SPL (${DM}3e63514a-dbb8-5bef-e063-6294a90a4008; setid 3e63514a-dbb8-5bef-e063-6294a90a4008; NDC 69452-483-93; 237 mL). Inactive ingredients: citric acid, dibasic sodium phosphate, glycerin, nonoxynol-9, purified water and sodium hydroxide. No numeric age floor on the directions. No GTIN-12 on the SPL.`,
  },
  {
    id: MAG,
    // KYR5-d — zbar on DailyMed bottle.jpg, label prints 10 oz, NDC 69452-398-98.
    barcode: '369452398982',
    upcNote:
      'UPC-A 369452398982 is the code under the bars on the DailyMed 10 fl oz bottle image for NDC 69452-398-98.',
    productName: 'A+Health Magnesium Citrate Oral Solution, Lemon, 10 fl oz (296 mL)',
    category: 'Digestive',
    formulaId: MAG,
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Magnesium citrate', strength: '1.745g/fl oz' }],
    flags: MAG_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are sucralose, benzoic acid, and flavor. Benzoic acid and bare flavor are the Sept 24 Caution stamps that unlocked this panel. Bare flavor is not the Limited natural-flavors token. Disodium EDTA stays Cleared, not tetrasodium EDTA. No High. Children 2 to under 6 have a printed dose. Under 2: ask a doctor.',
    cite: `DailyMed SPL (${DM}4019fbd0-fcf9-77a6-e063-6294a90a5ae7; setid 4019fbd0-fcf9-77a6-e063-6294a90a5ae7; NDC 69452-398-98; 296 mL). Inactive ingredients: benzoic acid, citric acid, disodium EDTA, flavor, sucralose, water. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: HEM,
    productName: 'A+Health Hemorrhoidal Ointment, 2 oz (56 g)',
    category: 'First Aid',
    formulaId: HEM,
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    productType: OTC,
    actives: [
      { name: 'Phenylephrine HCl', strength: '0.25%' },
      { name: 'Mineral oil', strength: '14%' },
      { name: 'Petrolatum', strength: '74.9%' },
    ],
    flags: HEM_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are butylated hydroxyanisole, methylparaben, and propylparaben. Lanolin alcohols, thyme oil, vitamin E, white wax, and benzoic acid are the Sept 24 stamps that unlocked this panel. Lanolin alcohols maps to Caution lanolin alcohol. Vitamin E maps to Cleared tocopherol, not Caution tocopheryl acetate. White wax is not yellow beeswax. Corn oil in this ointment is Cleared non-gummy fill, not an oil-bottle grade. Mineral oil and petrolatum are also labeled actives. The inactive paragraph still prints mineral oil, graded as the topical occlusive. Under 12: consult a doctor.',
    cite: `DailyMed SPL (${DM}1790da99-2a22-e2a2-e063-6394a90ac36f; setid 1790da99-2a22-e2a2-e063-6394a90ac36f; NDC 69452-448-38; net wt 2 oz / 56 g). Inactive ingredients: benzoic acid, butylated hydroxyanisole, corn oil, glycerin, lanolin, lanolin alcohols, methylparaben, mineral oil, paraffin, propylparaben, purified water, thyme oil, vitamin E, white wax. ${CREAM_OIL_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: ROLL,
    productName: 'A+Health Lidocaine 4% Roll-On, 2.5 fl oz (74 mL)',
    category: 'Pain & Fever',
    formulaId: ROLL,
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Lidocaine HCl', strength: '4%' }],
    flags: ROLL_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is methylparaben. C30-45 alkyl cetearyl dimethicone crosspolymer is the Sept 24 Caution stamp that unlocked this panel. It is not the Avoid driver and not the older C30-45 alkyl dimethicone row. The grade follows the Drug Facts inactive paragraph, which is the batch93 pin. Topical propylene glycol is not on this paragraph. Children under 2: consult a doctor.',
    cite: `DailyMed SPL (${DM}f607b6dc-8d13-604a-e053-2995a90a59ab; setid f607b6dc-8d13-604a-e053-2995a90a59ab; NDC 69452-393-63; 74 mL roll-on). Inactive ingredients: Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Aloe Barbadensis Leaf Extract, Aminomethyl Propanol, C30-45 Alkyl Cetearyl Dimethicone Crosspolymer, Caprylyl Methicone, Cetearyl Alcohol, Ceteth-20 Phosphate, Dicetyl Phosphate, Dimethicone, Disodium EDTA, Ethylhexylglycerin, Glyceryl Stearate, Methylparaben, polysorbate 60, SD Alcohol 40, Steareth-21, Purified Water. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: PATCH,
    productName: 'A+Health Lidocaine 4% Patch, 6 Count',
    category: 'Pain & Fever',
    formulaId: PATCH,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    actives: [{ name: 'Lidocaine', strength: '4%' }],
    flags: PATCH_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are alicyclic hydrocarbon resin, styrene isoprene, and styrene block copolymer. Those three are the Sept 24 Caution stamps that unlocked this panel. Alicyclic hydrocarbon resin is not the locked alicyclic saturated hydrocarbon resin. Polyester film and silicone-coated polyester film are backing and are not flagged. No High. Under 12: consult a doctor.',
    cite: `DailyMed SPL (${DM}19c69983-4e78-8ec5-e063-6394a90a84be; setid 19c69983-4e78-8ec5-e063-6394a90a84be; NDC 69452-409-04; 6 patches). Inactive ingredients: alicyclic hydrocarbon resin, mineral oil, polyester film, silicone-coated polyester film, styrene isoprene, styrene block copolymer. Polyester film and silicone-coated polyester film are backing and are not the block. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: ITCH,
    productName: 'A+Health Itch Relief Cream, Diphenhydramine HCl 2% and Zinc Acetate 0.1%, 1.25 oz (35.4 g)',
    category: 'First Aid',
    formulaId: ITCH,
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    productType: OTC,
    actives: [
      { name: 'Diphenhydramine HCl', strength: '2%' },
      { name: 'Zinc acetate', strength: '0.1%' },
    ],
    flags: ITCH_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are methylparaben and propylparaben. Cetyl alcohol is the Sept 24 Cleared fatty-alcohol stamp that unlocked this panel. It sits with cetearyl / stearyl alcohol. It is not a new grade. Light mineral oil is the topical occlusive, not an oil-bottle grade. Under 2: ask a doctor.',
    cite: `DailyMed SPL (${DM}178ed513-4f22-8f11-e063-6294a90a109b; setid 178ed513-4f22-8f11-e063-6294a90a109b; NDC 69452-449-37; net wt 1.25 oz / 35.4 g). Inactive ingredients: carbomer homopolymer type C, cetyl alcohol, glycerin, glyceryl monostearate, light mineral oil, methylparaben, polysorbate 60, propylparaben, purified water, stearic acid. Ages 2+. No GTIN-12 on the SPL.`,
  },
  {
    id: ZINC,
    productName: 'A+Health Zinc Oxide 20% Ointment, 15 oz (425 g)',
    category: 'First Aid',
    formulaId: ZINC,
    audience: ADULT,
    minAge: 0,
    form: 'ointment',
    productType: OTC,
    actives: [{ name: 'Zinc oxide', strength: '20%' }],
    flags: ZINC_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is ceteareth 20, the printed inactive-paragraph spelling of locked ceteareth-20. Cetostearyl alcohol is the Sept 24 Cleared fatty-alcohol stamp that unlocked this panel. It is not a new grade. Light mineral oil and white petrolatum are topical occlusives, not an oil-bottle grade. No High. The label covers diaper rash and does not print a numeric age floor. The SPL product-data element codes CETETH-20; the grade follows the inactive paragraph batch93 pinned.',
    cite: `DailyMed SPL (${DM}1549500a-0941-0fba-e063-6394a90a564e; setid 1549500a-0941-0fba-e063-6394a90a564e; NDC 69452-450-58; net wt 15 oz / 425 g). Inactive ingredients: ceteareth 20, cetostearyl alcohol, light mineral oil, white petrolatum. No numeric age floor on the directions. No GTIN-12 on the SPL.`,
  },
];

export const BATCH94_KYR6_APLUS_TOKEN_BACKFILL: RatingRecord[] = COMPACT.map(expand);

export const BATCH94_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH94_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'A+Health Castor Oil, 6 fl oz (177 mL), NDC 69452-487-97',
    reason:
      'SKIPPED OUT. Graded oil pour bottle. Stays the batch93 OUT. DailyMed setid 3f9728e8-c7a2-6cfb-e063-6394a90a8f1d prints Inactive ingredients: None. Castor oil is the active. Oil pour bottles stay ungraded. Not a no_OI leftover. Not reopened. NO Search row.',
  },
];

export const BATCH94_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH94_SKIPPED_NO_OI,
  ...BATCH94_SKIPPED_OUT,
];

export const BATCH94_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'A+Health Ibuprofen 200 mg minis, 240 softgels, NDC 69452-262-82',
    reason:
      'REFUSED. `pharmaceutical ink` now maps to the Sept 24 Caution stamp, and the other strings on both lists already map. Setid a14ca126-fada-c903-e053-2995a90ae72d still prints two inactive lists on this NDC (a US list with pharmaceutical ink, and an India list without it). The pack is not one pinned list. NO Search row.',
  },
  {
    sku: 'A+Health Ibuprofen 200 mg minis, 500 softgels, NDC 69452-262-30',
    reason:
      'REFUSED. `pharmaceutical ink` now maps to the Sept 24 Caution stamp. Setid a14ca126-fada-c903-e053-2995a90ae72d still prints two inactive lists, and no panel pins this count to one of them. The pack is not one pinned list. NO Search row.',
  },
  {
    sku: 'A+Health Dye-Free Ibuprofen 200 mg, 180 mini capsules, NDC 69452-302-25',
    reason:
      'REFUSED. `pharmaceutical ink` now maps to the Sept 24 Caution stamp. Setid c46c9c36-8844-7b50-e053-2a95a90aa0e9 still prints that string on one list and a second India-site list without it on the same NDC. The pack is not one pinned list. NO Search row.',
  },
  {
    sku: 'A+Health Itch Relief Gel, 118 mL, NDC 69452-376-55 and 69452-496-55',
    reason:
      'REFUSED exact panel string `Diazolidnyl Urea`. The Sept 24 stamp parks that spelling on diazolidinyl urea and says no new row. This job does not write it. Setids ecf5decb-c98b-7739-e053-2995a90a5541 and 38040732-48c9-3533-e063-6394a90af10a. NO Search row.',
  },
];

const _ROWS = BATCH94_KYR6_APLUS_TOKEN_BACKFILL;
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

if (_ROWS.length !== 38) throw new Error('batch94 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 11 || _grades.avoid !== 27) {
  throw new Error('batch94 Search grade drift');
}
if (_new !== 24 || _reuse !== 14) throw new Error('batch94 NEW/REUSE drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 24) {
  throw new Error('batch94 canonical formula drift');
}
if (BATCH94_SKIPPED_NO_OI.length !== 0) throw new Error('batch94 no_OI drift');
if (BATCH94_SKIPPED_OUT.length !== 1) throw new Error('batch94 OUT drift');
if (BATCH94_SKIPPED.length !== 1) throw new Error('batch94 SKIPPED drift');
if (BATCH94_REFUSED.length !== 4) throw new Error('batch94 REFUSED drift');
if (BATCH94_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch94 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'A+Health')) throw new Error('batch94 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch94 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'aplushealth-b94-sleep-dyefree-120': '369452451229',
  'aplushealth-b94-loperamide-sol': '369452405550',
  'aplushealth-b94-loperamide-240': '369452405932',
  'aplushealth-b94-pinworm-473': '369452409886',
  'aplushealth-b94-povidone-iodine': '369452483930',
  'aplushealth-b94-mag-citrate': '369452398982',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 6) throw new Error('batch94 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch94 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch94 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch94 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch94 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('aplushealth-b94-'))) {
  throw new Error('batch94 ids must use aplushealth-b94-');
}
if (_ROWS.some((r) => !r.formulaId?.startsWith('aplushealth-b94-'))) {
  throw new Error('batch94 formula ids must use aplushealth-b94-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch94 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch94 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch94 Avoid without High');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch94 Caution without Limited or Moderate');
}
if (
  _ROWS.some((r) =>
    r.verdict === 'clean' &&
    r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'),
  )
) {
  throw new Error('batch94 Clean row has a non-cleared flag');
}
const _lop = _ROWS.find((r) => r.id === LOP);
if (!_lop?.inactiveIngredients?.some((f) => f.name === 'Plain caramel powder' && f.riskLevel === 'high')) {
  throw new Error('batch94 plain caramel powder must be Avoid');
}
const _pin = _ROWS.find((r) => r.id === PIN);
if (!_pin?.inactiveIngredients?.some((f) => f.name === 'Gylcerin' && f.riskLevel === 'cleared')) {
  throw new Error('batch94 gylcerin must map to Cleared glycerin');
}
if (_ROWS.some((r) => /diazolidin/i.test(`${r.productName} ${r.id}`))) {
  throw new Error('batch94 must not write diazolidinyl urea');
}
if (!BATCH94_REFUSED.some((s) => /Diazolidnyl Urea/.test(s.reason))) {
  throw new Error('batch94 Diazolidnyl Urea must stay refused');
}
if (!BATCH94_SKIPPED_OUT.some((s) => /Castor Oil/.test(s.sku))) {
  throw new Error('batch94 castor oil must stay OUT');
}
const _blob = [
  ..._ROWS.map((r) => `${r.brand} ${r.productName} ${r.id}`),
  ...BATCH94_SKIPPED.map((s) => s.sku),
  ...BATCH94_REFUSED.map((s) => s.sku),
].join('\n');
if (/healtha2z|goodsense|toothpaste|sprouts/i.test(_blob)) {
  throw new Error('batch94 must not write HealthA2Z, GoodSense, toothpaste, or Sprouts');
}
if (/\bTIME-Cap\b/.test(_blob)) throw new Error('batch94 must not write TIME-Cap');
