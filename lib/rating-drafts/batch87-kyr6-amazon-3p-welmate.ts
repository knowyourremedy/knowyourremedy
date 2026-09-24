// DRAFT / not verified / batch 87 KYR6 Amazon 3P WELMATE.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades. No invented OI.
// Founder owns final Avoid vs Caution vs Clean.
//
// WELMATE only. US wellspringmeds.com WELMATE collection is the seller pin
// (every carousel tile downloaded). Amazon.com search/PDP fetch in this
// environment returned HTTP 503 automated-access block, so no row is pinned
// from an Amazon carousel. No Canada/EU. No iHerb pin.
// TIME-Cap-branded (non-WELMATE) catalog stays out. A+Health, HealthA2Z,
// and GoodSense stay out. No toothpaste. No house Amazon. No Sprouts.
// No graded oil pour bottles. No factory.
// recordStatus is 'unverified'. Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI. Letter tiles only.
// No GTIN-12 printed on these cartons — no barcode attached.
//
// Leftover Amazon 3P after this slice: 4 (A+Health, HealthA2Z, TIME-Cap, GoodSense).
// NatureWise leftovers stay parked. batch70–86 are not edited.
//
// TALLY (unverified drafts in THIS file): 34 rows —
// Clean 4 / Caution 12 / Avoid 18.
// NEW 19 / REUSE-formula 15 /
// SKIPPED 12 (no_OI 6 / OUT 3 / already-on-MAIN 3) /
// REFUSED 10.
// Search grade: Clean 4 / Caution 12 / Avoid 18.
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

const SHOP = 'https://wellspringmeds.com/products';

const METH = {
  ammonia:
    'Methodology §5 Caution (strong ammonia solution — standalone Caution, not Avoid; locked Sept 15, 2026).',
  bha: 'Methodology §5 High (BHA / butylated hydroxyanisole).',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer, including type B and type C).',
  carnauba: 'Methodology §5 Cleared (carnauba wax).',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum / sodium carboxymethylcellulose).',
  citrate:
    'Methodology §5 Cleared (citrate salts as fillers/buffers — sodium citrate dihydrate).',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate dihydrate as filler).',
  dextrose: 'Methodology §5 Cleared (dextrose / dextrose monohydrate).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including aluminum lake and brilliant blue lake).',
  edibleInk:
    'Methodology §5 Caution (edible ink unspecified — exact token; standalone Caution, not Avoid; locked Sept 16, 2026).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  glycerylCaprylate:
    'Methodology §5 Cleared (glyceryl caprylate — exact INCI; locked Sept 15, 2026).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose).',
  ipa: 'Methodology §5 Limited (isopropyl alcohol — alcohol vehicle family; locked Sept 15, 2026). Not Avoid.',
  ironOxide:
    'Methodology §5 Caution (red iron oxide / yellow iron oxide). Not Avoid. Not a dye High.',
  lactose: 'Methodology §5 Cleared (lactose monohydrate / anhydrous lactose).',
  lanolin:
    'Methodology §5 Caution (lanolin, topical — wool-alcohol hypersensitivity). Not Avoid.',
  lecithin: 'Methodology §5 Cleared (lecithin).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mineralOil:
    'Methodology §5 Cleared (mineral oil as a topical ointment occlusive — petrolatum neighborhood). Not an oil-bottle grade.',
  peg: 'Methodology §5 Moderate (polyethylene glycol, including polyethylene glycol 400).',
  petrolatum: 'Methodology §5 Cleared (white petrolatum / petrolatum).',
  polyoxyl20:
    'Methodology §5 Caution (polyoxyl 20 cetostearyl ether — PEG-ether family; standalone Caution, not the Moderate PEG row, not Avoid; locked Sept 15, 2026).',
  polyoxylCastor:
    'Methodology §5 Cleared (polyoxyl 40 hydrogenated castor oil — polyoxyl-castor family). Not gummy seed-oil High.',
  povidone: 'Methodology §5 Cleared (povidone, including povidone K-30).',
  pregel:
    'Methodology §5 Cleared (pregelatinized starch / pregelatinized starch (maize)).',
  riceFlour:
    'Methodology §5 Caution (rice flour — exact token). Distinct from Cleared rice hull.',
  sio2: 'Methodology §5 Limited (silicon dioxide / colloidal silicon dioxide / silica gel — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  starch:
    'Methodology §5 Cleared (named corn starch / maize (corn) starch). Not Limited modified starch.',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  triacetin: 'Methodology §5 Cleared (triacetin).',
  water: 'Methodology §5 Cleared (purified water).',
  cocoyl:
    'Methodology §5 Cleared (cocoyl caprylocaprate). Distinct from coco-caprylate/caprate.',
  pgTopical:
    'Methodology §5 Cleared (propylene glycol, topical). Topical PG is not the oral Moderate row.',
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
  retailers?: string[];
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
      'Immune Support': [
        'natures-way-alive-max6',
        "Independently Clean Nature's Way Alive! Max6 already on main. Form labeled, not a hard filter (§6).",
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
    retailers: d.retailers ?? [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}`],
  });
}

const COMPACT: Compact[] = [
  {
    id: 'welmate-b87-famotidine',
    productName: 'WELMATE Acid Reducer Famotidine 20 mg, 100 Tablets',
    category: 'Digestive',
    formulaId: 'welmate-b87-famotidine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '20mg' }],
    flags: [
      ['Talc', 'high', 'talc'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
      ['Triacetin', 'cleared', 'triacetin'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are talc (oral) and titanium dioxide. Polyethylene glycol is Moderate, not the Avoid driver.',
    cite: `Wellspring carton Drug Facts (${SHOP}/famotidine-20-mg-100-count-tablets-acid-reducer) inactive ingredients: hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, pregelatinized starch, sodium starch glycolate, talc, titanium dioxide, triacetin. DailyMed NDC 73581-109 prints Macrogol where this carton prints polyethylene glycol — the carton word is the pin. Ages 12+.`,
  },
  {
    id: 'welmate-b87-famotidine-20-300',
    productName: 'WELMATE Acid Reducer Famotidine 20 mg, 300 Tablets',
    category: 'Digestive',
    formulaId: 'welmate-b87-famotidine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '20mg' }],
    flags: [
      ['Talc', 'high', 'talc'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
      ['Triacetin', 'cleared', 'triacetin'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are talc (oral) and titanium dioxide. Same inactive line as the 20 mg 100-count carton.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-famotidine-acid-reducer-20mg-maximum-strength-heartburn-relief-acid-indigestion-stomach-relief-works-in-15-minutes-12-hour-relief-generic-medication-value-size-300-tablets) prints the same inactive line as the 20 mg 100-count carton. DailyMed NDC 73581-109. Ages 12+.`,
  },
  {
    id: 'welmate-b87-famotidine-10-90',
    productName: 'WELMATE Acid Reducer Famotidine 10 mg, 90 Tablets',
    category: 'Digestive',
    formulaId: 'welmate-b87-famotidine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '10mg' }],
    flags: [
      ['Talc', 'high', 'talc'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
      ['Triacetin', 'cleared', 'triacetin'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are talc (oral) and titanium dioxide. 10 mg carton prints the same inactive line as 20 mg.',
    cite: `Wellspring carton Drug Facts (${SHOP}/famotidine-10-mg-90-count-tablets-acid-reducer) prints the same inactive line as the 20 mg carton, including polyethylene glycol. DailyMed NDC 73581-108 prints Macrogol for this 10 mg family — the carton word is the pin. Ages 12+.`,
  },
  {
    id: 'welmate-b87-famotidine-10-300',
    productName: 'WELMATE Acid Reducer Famotidine 10 mg, 300 Tablets',
    category: 'Digestive',
    formulaId: 'welmate-b87-famotidine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '10mg' }],
    flags: [
      ['Talc', 'high', 'talc'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
      ['Triacetin', 'cleared', 'triacetin'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are talc (oral) and titanium dioxide. Same inactive line as the 10 mg 90-count carton.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-famotidine-acid-reducer-10mg-original-strength-heartburn-relief-acid-indigestion-stomach-relief-works-in-15-minutes-generic-medication-value-size-300-tablets) prints the same inactive line as the 10 mg 90-count carton. DailyMed NDC 73581-108. Ages 12+.`,
  },
  {
    id: 'welmate-b87-cetirizine',
    productName: 'WELMATE Allergy Relief Cetirizine HCl 10 mg, 100 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-cetirizine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Colloidal silicon dioxide is the nanoparticle Caution cap, not the Avoid driver.',
    cite: `Wellspring 100-count front prints NDC 73581-202-01 (${SHOP}/welmate-allergy-relief-cetirizine-hcl-10-mg-100-count-tablets-24-hour). Drug-facts thumbnails on this carousel did not resolve an inactive line. DailyMed NDC 73581-202 inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide. Package 73581-202-01 is this 100-count.`,
  },
  {
    id: 'welmate-b87-cetirizine-500',
    productName: 'WELMATE Allergy Relief Cetirizine HCl 10 mg, 500 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-cetirizine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Same NDC family as the 100-count.',
    cite: `Wellspring 500-count (${SHOP}/welmate-allergy-relief-cetirizine-hcl-10-mg-500-count-tablets-24-hour). Drug-facts thumbnails did not resolve an inactive line. DailyMed NDC 73581-202 package 73581-202-05 is this count and prints the same inactive list as the 100-count.`,
  },
  {
    id: 'welmate-b87-doxylamine',
    productName: 'WELMATE Sleep Aid Doxylamine Succinate 25 mg, 200 Tablets',
    category: 'Sleep',
    formulaId: 'welmate-b87-doxylamine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Doxylamine succinate', strength: '25mg' }],
    flags: [
      ['FD&C blue #1 aluminum lake', 'high', 'dye'],
      ['Dicalcium phosphate dihydrate', 'cleared', 'dical'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C blue #1 aluminum lake.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-sleep-aid-doxylamine-succinate-25-mg-200-count-tablets) inactive ingredients: dicalcium phosphate dihydrate, FD&C blue #1 aluminum lake, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. Matches DailyMed NDC 73581-205. Ages 12+.`,
  },
  {
    id: 'welmate-b87-doxylamine-100',
    productName: 'WELMATE Sleep Aid Doxylamine Succinate 25 mg, 100 Tablets',
    category: 'Sleep',
    formulaId: 'welmate-b87-doxylamine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Doxylamine succinate', strength: '25mg' }],
    flags: [
      ['FD&C blue #1 aluminum lake', 'high', 'dye'],
      ['Dicalcium phosphate dihydrate', 'cleared', 'dical'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C blue #1 aluminum lake. Shop title says extended-release; the Drug Facts line is a 25 mg tablet, not an ER claim.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-sleep-aid-doxylamine-succinate-25mg-100-count-extended-release-tablets) prints the same inactive line as the 200-count. DailyMed NDC 73581-205. Ages 12+.`,
  },
  {
    id: 'welmate-b87-fexofenadine',
    productName: 'WELMATE Allergy Relief Fexofenadine HCl 180 mg, 100 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-fexofenadine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Red iron oxide', 'limited', 'ironOxide'],
      ['Yellow iron oxide', 'limited', 'ironOxide'],
      ['Anhydrous lactose', 'cleared', 'lactose'],
      ['Corn starch', 'cleared', 'starch'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Red and yellow iron oxide are Caution, not the Avoid driver. Other YYBA fexofenadine SPLs (iron oxide black / povidone / macrogol) are a different list and are not this row.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-allergy-relief-fexofenadine-hcl-180-mg-non-drowsy-antihistamine-100-count-tablets) inactive ingredients: anhydrous lactose, colloidal silicon dioxide, corn starch, croscarmellose sodium, hypromellose, lactose monohydrate, polyethylene glycol, pregelatinized starch (maize), red iron oxide, stearic acid, titanium dioxide, yellow iron oxide. Ages 12+.`,
  },
  {
    id: 'welmate-b87-fexofenadine-180-200',
    productName: 'WELMATE Allergy Relief Fexofenadine HCl 180 mg, 200 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-fexofenadine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Red iron oxide', 'limited', 'ironOxide'],
      ['Yellow iron oxide', 'limited', 'ironOxide'],
      ['Anhydrous lactose', 'cleared', 'lactose'],
      ['Corn starch', 'cleared', 'starch'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. 200-count carousel had no inactive line; same 180 mg strength as the printed 100-count carton.',
    cite: `Wellspring 200-count (${SHOP}/welmate-allergy-relief-fexofenadine-hcl-180-mg-non-drowsy-antihistamine-200-count-tablets) carousel tiles did not print an inactive line. Same 180 mg strength as the 100-count carton that prints this list. Shop title says extended-release; the sibling Drug Facts line is a tablet.`,
  },
  {
    id: 'welmate-b87-fexofenadine-180-40',
    productName: 'WELMATE Allergy Relief Fexofenadine HCl 180 mg, 40 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-fexofenadine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Red iron oxide', 'limited', 'ironOxide'],
      ['Yellow iron oxide', 'limited', 'ironOxide'],
      ['Anhydrous lactose', 'cleared', 'lactose'],
      ['Corn starch', 'cleared', 'starch'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. 40-count carton prints the same inactive line as the 180 mg 100-count.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-allergy-relief-fexofenadine-180mg-12-hour-40-count-extended-release-tablets) prints the same inactive line as the 180 mg 100-count. Shop title says extended-release; the Drug Facts line is a tablet.`,
  },
  {
    id: 'welmate-b87-fexofenadine-60-100',
    productName: 'WELMATE Allergy Relief Fexofenadine HCl 60 mg, 100 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-fexofenadine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '60mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Red iron oxide', 'limited', 'ironOxide'],
      ['Yellow iron oxide', 'limited', 'ironOxide'],
      ['Anhydrous lactose', 'cleared', 'lactose'],
      ['Corn starch', 'cleared', 'starch'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. 60 mg carton prints the same inactive line as the 180 mg carton.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-allergy-relief-fexofenadine-hydrochloride-60-mg-100-count-tablets) inactive ingredients match the 180 mg list: anhydrous lactose, colloidal silicon dioxide, corn starch, croscarmellose sodium, hypromellose, lactose monohydrate, polyethylene glycol, pregelatinized starch (maize), red iron oxide, stearic acid, titanium dioxide, yellow iron oxide.`,
  },
  {
    id: 'welmate-b87-fexofenadine-60-200',
    productName: 'WELMATE Allergy Relief Fexofenadine HCl 60 mg, 200 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-fexofenadine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '60mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Red iron oxide', 'limited', 'ironOxide'],
      ['Yellow iron oxide', 'limited', 'ironOxide'],
      ['Anhydrous lactose', 'cleared', 'lactose'],
      ['Corn starch', 'cleared', 'starch'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. 60 mg 200-count carton prints the same inactive line.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-allergy-relief-fexofenadine-60mg-200-count-tablets) prints the same inactive line as the 60 mg 100-count.`,
  },
  {
    id: 'welmate-b87-fexofenadine-60-60',
    productName: 'WELMATE Allergy Relief Fexofenadine HCl 60 mg, 60 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-fexofenadine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '60mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Red iron oxide', 'limited', 'ironOxide'],
      ['Yellow iron oxide', 'limited', 'ironOxide'],
      ['Anhydrous lactose', 'cleared', 'lactose'],
      ['Corn starch', 'cleared', 'starch'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. 60-count carousel had no inactive line; same 60 mg strength as the printed 100-count and 200-count cartons.',
    cite: `Wellspring 60-count (${SHOP}/welmate-allergy-relief-fexofenadine-60mg-12-hour-60-count-extended-release-tablets) carousel tiles did not print an inactive line. Same 60 mg strength as the 100-count and 200-count cartons that print this list.`,
  },
  {
    id: 'welmate-b87-phenylephrine',
    productName: 'WELMATE Nasal Decongestant Phenylephrine HCl 10 mg, 200 Tablets',
    category: 'Cold & Flu',
    formulaId: 'welmate-b87-phenylephrine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Phenylephrine HCl', strength: '10mg' }],
    flags: [
      ['FD&C red #40', 'high', 'dye'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Silicon dioxide', 'limited', 'sio2'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Dextrose monohydrate', 'cleared', 'dextrose'],
      ['Dicalcium phosphate dihydrate', 'cleared', 'dical'],
      ['Lecithin', 'cleared', 'lecithin'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Sodium carboxymethylcellulose', 'cleared', 'cellulose'],
      ['Sodium citrate dihydrate', 'cleared', 'citrate'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C red #40 and titanium dioxide. Carton prints maltodextrin; the matching DailyMed line spells maltrodextrin — the carton spelling is the pin.',
    cite: `Wellspring front prints NDC 73581-204-02 (${SHOP}/welmate-phenylephrine-hcl-10-mg-maximum-strength-nasal-decongestant-pe-and-sinus-relief-200-count). Carton inactive ingredients: croscarmellose sodium, dextrose monohydrate, dicalcium phosphate dihydrate, FD&C red #40, lecithin, magnesium stearate, maltodextrin, microcrystalline cellulose, silicon dioxide, sodium carboxymethylcellulose, sodium citrate dihydrate, titanium dioxide.`,
  },
  {
    id: 'welmate-b87-loperamide-softgel',
    productName: 'WELMATE Anti-Diarrheal Loperamide HCl 2 mg, 24 Softgels',
    category: 'Digestive',
    formulaId: 'welmate-b87-loperamide-softgel',
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
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are butylated hydroxyanisole and FD&C Blue #1. Edible ink is Caution, not the Avoid driver. Softgel fill is not gummy seed-oil High.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-anti-diarrheal-sotfgels-loperamide-hcl-2-mg-24-count-blister-pack) inactive ingredients: butylated hydroxyanisole, edible ink, FD&C Blue #1, gelatin, glycerin, glyceryl caprylate, polyoxyl 40 hydrogenated castor oil, purified water. Matches DailyMed NDC 73581-102. Ages 12+. Own formula — not the 73581-171 caplet and not the 73581-101 tablet.`,
  },
  {
    id: 'welmate-b87-loperamide-caplet',
    productName: 'WELMATE Anti-Diarrheal Loperamide HCl 2 mg, 24 Caplets',
    category: 'Digestive',
    formulaId: 'welmate-b87-loperamide-caplet',
    audience: ADULT,
    minAge: 6,
    form: 'caplet',
    productType: OTC,
    actives: [{ name: 'Loperamide HCl', strength: '2mg' }],
    flags: [
      ['D&C yellow #10 aluminum lake', 'high', 'dye'],
      ['FD&C blue #1 aluminum lake', 'high', 'dye'],
      ['Silicon dioxide', 'limited', 'sio2'],
      ['Corn starch', 'cleared', 'starch'],
      ['Dibasic calcium phosphate dihydrate', 'cleared', 'dical'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C yellow #10 aluminum lake and FD&C blue #1 aluminum lake. Carton dose chart includes ages 6–8. Not the softgel and not the 73581-101 tablet (that one prints brilliant blue lake and silica gel).',
    cite: `Wellspring carton prints NDC 73581-171-24 (${SHOP}/welmate-anti-diarrheal-caplets-loperamide-hcl-2-mg-diarrhea-symptom-relief-upset-stomach-reliever-anti-gas-anti-diarrhea-pills-travel-essentials-made-in-usa-24-count-blister-pack). DailyMed NDC 73581-171 inactive ingredients: corn starch, D&C yellow #10 aluminum lake, dibasic calcium phosphate dihydrate, FD&C blue #1 aluminum lake, magnesium stearate, microcrystalline cellulose, silicon dioxide. Dose chart on the carton starts at 6 years.`,
  },
  {
    id: 'welmate-b87-loperamide-tablet-101',
    productName: 'WELMATE Anti-Diarrheal Loperamide HCl 2 mg, 24 Tablets',
    category: 'Digestive',
    formulaId: 'welmate-b87-loperamide-tablet-101',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loperamide HCl', strength: '2mg' }],
    flags: [
      ['D&C yellow #10 aluminum lake', 'high', 'dye'],
      ['FD&C blue #1 brilliant blue lake', 'high', 'dye'],
      ['Silica gel', 'limited', 'sio2'],
      ['Corn starch', 'cleared', 'starch'],
      ['Dicalcium phosphate dihydrate', 'cleared', 'dical'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C yellow #10 aluminum lake and FD&C blue #1 brilliant blue lake. Not on the Wellspring catalog. Not the 73581-171 caplet.',
    cite: `DailyMed WELMATE Anti Diarrheal Loperamide HCl, NDC 73581-101 package 73581-101-24. Inactive ingredients: corn starch, D&C yellow #10 aluminum lake, dicalcium phosphate dihydrate, FD&C blue #1 brilliant blue lake, magnesium stearate, microcrystalline cellulose, silica gel. Not a Wellspring offer.`,
    retailers: ['Amazon'],
  },
  {
    id: 'welmate-b87-loratadine',
    productName: 'WELMATE Allergy Relief Loratadine 10 mg, 365 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-loratadine',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10mg' }],
    flags: [
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Every inactive token on this carton sits on an existing Cleared row. No titanium dioxide.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-allergy-relief-loratadine-10mg-antihistamine-24-hour-relief-365-count-tablets) inactive ingredients: lactose monohydrate, magnesium stearate, pregelatinized starch (maize), sodium starch glycolate. DailyMed NDC 73581-203 splits “sodium starch, glycolate” — the carton has no comma. Ages 6+.`,
  },
  {
    id: 'welmate-b87-loratadine-100',
    productName: 'WELMATE Allergy Relief Loratadine 10 mg, 100 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b87-loratadine',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10mg' }],
    flags: [
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. 100-count carousel did not print a readable inactive line; DailyMed NDC 73581-203 matches the 365-count carton list.',
    cite: `Wellspring 100-count (${SHOP}/welmate-allergy-relief-loratadine-10mg-antihistamine-24-hour-relief-100-count-tablets) carousel did not print a readable inactive line. DailyMed NDC 73581-203 (packages 73581-203-01 and 73581-203-36) prints lactose monohydrate, magnesium stearate, pregelatinized starch (maize), sodium starch glycolate — the same list as the 365-count carton.`,
  },
  {
    id: 'welmate-b87-guaifenesin-er',
    productName: 'WELMATE Mucus Relief Guaifenesin 600 mg, 200 Extended-Release Tablets',
    category: 'Cold & Flu',
    formulaId: 'welmate-b87-guaifenesin-er',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    actives: [{ name: 'Guaifenesin', strength: '600mg' }],
    flags: [
      ['Carbomer homopolymer type B', 'cleared', 'carbomer'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Every inactive token on this carton sits on an existing Cleared row. 1200 mg counts are not this row.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-mucus-relief-guaifenesin-600mg-12-hour-200-count-extended-release-tablets) inactive ingredients: carbomer homopolymer type B, hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. Matches DailyMed NDC 73581-401. Ages 12+.`,
  },
  {
    id: 'welmate-b87-guaifenesin-er-70',
    productName: 'WELMATE Mucus Relief Guaifenesin 600 mg, 70 Extended-Release Tablets',
    category: 'Cold & Flu',
    formulaId: 'welmate-b87-guaifenesin-er',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    actives: [{ name: 'Guaifenesin', strength: '600mg' }],
    flags: [
      ['Carbomer homopolymer type B', 'cleared', 'carbomer'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. 70-count carton prints the same inactive line as the 200-count.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-mucus-relief-guaifenesin-600-mg-12-hour-70-count-extended-release-tablets) prints the same inactive line as the 200-count. DailyMed NDC 73581-401 package includes the 70-count. Ages 12+.`,
  },
  {
    id: 'welmate-b87-mucus-dm-405',
    productName: 'WELMATE Maximum Strength Mucus DM, 98 Extended-Release Tablets',
    category: 'Cold & Flu',
    formulaId: 'welmate-b87-mucus-dm-405',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    actives: [
      { name: 'Guaifenesin', strength: '1200mg' },
      { name: 'Dextromethorphan HBr', strength: '60mg' },
    ],
    flags: [
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Carbomer homopolymer', 'cleared', 'carbomer'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone (K-30)', 'cleared', 'povidone'],
      ['Stearic acid', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are colloidal silicon dioxide and maltodextrin. Not the 50-count / 100-count formula (that list has no maltodextrin and no carbomer).',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-maximum-strength-mucus-dm-expectorant-cough-suppressant-extended-release-98-count-tablets) inactive ingredients: carbomer homopolymer, colloidal silicon dioxide, hypromellose, magnesium stearate, maltodextrin, microcrystalline cellulose, povidone (K-30), stearic acid. Matches DailyMed NDC 73581-405-98. Ages 12+.`,
  },
  {
    id: 'welmate-b87-mucus-dm-406',
    productName: 'WELMATE Maximum Strength Mucus DM, 50 Extended-Release Tablets',
    category: 'Cold & Flu',
    formulaId: 'welmate-b87-mucus-dm-406',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    actives: [
      { name: 'Guaifenesin', strength: '1200mg' },
      { name: 'Dextromethorphan HBr', strength: '60mg' },
    ],
    flags: [
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone', 'cleared', 'povidone'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is colloidal silicon dioxide. Different inactive list from the 98-count.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-maximum-strength-mucus-dm-expectorant-cough-suppressant-extended-release-50-count-tablets) inactive ingredients: colloidal silicon dioxide, hypromellose, magnesium stearate, microcrystalline cellulose, povidone, pregelatinized starch (maize). Matches DailyMed NDC 73581-406. Ages 12+.`,
  },
  {
    id: 'welmate-b87-mucus-dm-406-100',
    productName: 'WELMATE Maximum Strength Mucus DM, 100 Extended-Release Tablets',
    category: 'Cold & Flu',
    formulaId: 'welmate-b87-mucus-dm-406',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    actives: [
      { name: 'Guaifenesin', strength: '1200mg' },
      { name: 'Dextromethorphan HBr', strength: '60mg' },
    ],
    flags: [
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone', 'cleared', 'povidone'],
      ['Pregelatinized starch (maize)', 'cleared', 'pregel'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is colloidal silicon dioxide. Same inactive line as the 50-count, not the 98-count.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-maximum-strength-mucus-dm-expectorant-cough-suppressant-extended-release-100-count-tablets) prints the same inactive line as the 50-count. DailyMed NDC 73581-406. Ages 12+.`,
  },
  {
    id: 'welmate-b87-diclofenac-gel',
    productName: 'WELMATE Diclofenac Sodium Topical Gel 1%, 150 g',
    category: 'Pain & Fever',
    formulaId: 'welmate-b87-diclofenac-gel',
    audience: ADULT,
    minAge: 18,
    form: 'gel',
    productType: OTC,
    actives: [{ name: 'Diclofenac sodium', strength: '1%' }],
    flags: [
      ['Isopropyl alcohol', 'limited', 'ipa'],
      ['Polyoxyl 20 cetostearyl ether', 'limited', 'polyoxyl20'],
      ['Strong ammonia solution', 'limited', 'ammonia'],
      ['Carbomer homopolymer type C', 'cleared', 'carbomer'],
      ['Cocoyl caprylocaprate', 'cleared', 'cocoyl'],
      ['Mineral oil', 'cleared', 'mineralOil'],
      ['Propylene glycol', 'cleared', 'pgTopical'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are isopropyl alcohol, polyoxyl 20 cetostearyl ether, and strong ammonia solution. Topical propylene glycol and mineral oil stay Cleared. 3-pack is not a second formula.',
    cite: `Wellspring front prints NDC 73581-104-15 (${SHOP}/welmate-arthritis-pain-reliever-diclofenac-sodium-topical-gel-1-arthritis-relief-over-the-counter-medication-fsa-hsa-approved-pain-relief-cream-gel-mobility-aids-5-29-oz-150g). DailyMed NDC 73581-104 inactive ingredients: carbomer homopolymer type C, cocoyl caprylocaprate, isopropyl alcohol, mineral oil, polyoxyl 20 cetostearyl ether, propylene glycol, purified water, strong ammonia solution. OTC diclofenac gel 1% age line is 18+.`,
  },
  {
    id: 'welmate-b87-clotrimazole-solution',
    productName: 'WELMATE Clotrimazole Topical Solution 1%, 0.33 fl oz',
    category: 'First Aid',
    formulaId: 'welmate-b87-clotrimazole-solution',
    audience: ADULT,
    minAge: 2,
    form: 'solution',
    productType: OTC,
    actives: [{ name: 'Clotrimazole', strength: '1%' }],
    flags: [['Polyethylene glycol 400', 'moderate', 'peg']],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is polyethylene glycol 400. Seller drug-facts tile says see carton and does not print the inactive line.',
    cite: `Wellspring offer (${SHOP}/welmate-clotrimazole-1-antifungal-topical-solution-0-33-fluid-ounce) drug-facts tile says SEE CARTON FOR FULL and does not print inactives. Directions on that tile include children under 2 years ask a doctor. DailyMed WELMATE Clotrimazole Topical Solution NDC 73581-449 inactive ingredient: polyethylene glycol 400.`,
  },
  {
    id: 'welmate-b87-sodium-chloride-ointment',
    productName: 'WELMATE Sodium Chloride Hypertonicity Ophthalmic Ointment 5%, 1/8 oz',
    category: 'Eye & Ear',
    formulaId: 'welmate-b87-sodium-chloride-ointment',
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    actives: [{ name: 'Sodium chloride', strength: '5%' }],
    flags: [
      ['Lanolin', 'limited', 'lanolin'],
      ['Mineral oil', 'cleared', 'mineralOil'],
      ['Purified water', 'cleared', 'water'],
      ['White petrolatum', 'cleared', 'petrolatum'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is lanolin. Mineral oil here is the topical ointment occlusive, not an oil-bottle grade. 3-pack is not a second formula. Carton does not print a numeric age floor.',
    cite: `Wellspring carton (${SHOP}/welmate-sodium-chloride-hypertonicity-ophthalmic-ointment-5-3-5-gm-compare-to-muro-128) inactive ingredients: lanolin, mineral oil, purified water, white petrolatum. Matches DailyMed NDC 73581-708. Single 1/8 oz (3.5 g).`,
  },
  {
    id: 'welmate-b87-bifidobacterium',
    productName: 'WELMATE Bifidobacterium Probiotic, 200 Capsules',
    category: 'Digestive',
    formulaId: 'welmate-b87-bifidobacterium',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Bifidobacterium longum', strength: '1 billion CFU' }],
    flags: [
      ['Silicon dioxide', 'limited', 'sio2'],
      ['Rice flour', 'limited', 'riceFlour'],
      ['Hypromellose (capsule)', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide and rice flour.',
    cite: `Wellspring supplement-facts panel (${SHOP}/welmate-bifidobacterium-probiotic-supplement-value-size-200-count-capsules-24-7-digestive-support) other ingredients: hypromellose (capsule), magnesium stearate, silicon dioxide, rice flour. No GTIN-12. No DailyMed drug SPL.`,
  },
  {
    id: 'welmate-b87-saccharomyces-boulardii',
    productName: 'WELMATE Saccharomyces Boulardii 500 mg, 200 Veg Capsules',
    category: 'Digestive',
    formulaId: 'welmate-b87-saccharomyces-boulardii',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Saccharomyces boulardii', strength: '500mg' }],
    flags: [
      ['Silicon dioxide', 'limited', 'sio2'],
      ['Hypromellose (capsule)', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide. Label serving is 2 capsules, 10 billion CFU per serving, 500 mg Saccharomyces boulardii.',
    cite: `Wellspring supplement-facts panel (${SHOP}/daily-probiotic-supplement-saccharomyces-boulardii-200-veg-capsules-10-billion-cfu) other ingredients: hypromellose (capsule), magnesium stearate, silicon dioxide, microcrystalline cellulose. No DailyMed drug SPL.`,
  },
  {
    id: 'welmate-b87-zinc-sulfate',
    productName: 'WELMATE Zinc Sulfate 220 mg, 200 Tablets',
    category: 'Immune Support',
    formulaId: 'welmate-b87-zinc-sulfate',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Zinc (as zinc sulfate)', strength: '50mg' }],
    flags: [
      ['Silicon dioxide', 'limited', 'sio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Hydroxypropyl cellulose', 'cleared', 'hpc'],
      ['Carnauba wax', 'cleared', 'carnauba'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are silicon dioxide and polyethylene glycol. The less-than-2% line does not print titanium dioxide. Zinc sulfate is the labeled active, not an inactive flag.',
    cite: `Wellspring supplement-facts panel (${SHOP}/welmate-zinc-sulfate-220mg-supplement-immune-health-support-200-count-tablets) other ingredients: microcrystalline cellulose. Contains less than 2% of: magnesium stearate, silicon dioxide, hypromellose, polyethylene glycol, hydroxypropyl cellulose, carnauba wax. Active line is zinc (as zinc sulfate) 50 mg from zinc sulfate 220 mg. No DailyMed drug SPL.`,
  },
  {
    id: 'welmate-b87-phenazopyridine',
    productName: 'WELMATE Urinary Pain Relief Phenazopyridine HCl 99.5 mg, 36 Tablets',
    category: 'Pain & Fever',
    formulaId: 'welmate-b87-phenazopyridine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Phenazopyridine HCl', strength: '99.5mg' }],
    flags: [
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Maize (corn) starch', 'cleared', 'starch'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone', 'cleared', 'povidone'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are polyethylene glycol and colloidal silicon dioxide. Carton prints silicon dioxide; the matching DailyMed line spells silicone — the carton word is the pin.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-uti-relief-phenazopyridine-hydrochloride-99-5mg-36-count-extended-release-tablets) inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hydroxypropyl methylcellulose, magnesium stearate, maize (corn) starch, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch. DailyMed NDC 73581-919. Shop title says extended-release; the Drug Facts line is a tablet. Ages 12+.`,
  },
  {
    id: 'welmate-b87-phenazopyridine-72',
    productName: 'WELMATE Urinary Pain Relief Phenazopyridine HCl 99.5 mg, 72 Tablets',
    category: 'Pain & Fever',
    formulaId: 'welmate-b87-phenazopyridine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Phenazopyridine HCl', strength: '99.5mg' }],
    flags: [
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Maize (corn) starch', 'cleared', 'starch'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone', 'cleared', 'povidone'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are polyethylene glycol and colloidal silicon dioxide. 72-count drug-facts tile did not resolve; 36-count and 120-count cartons and DailyMed NDC 73581-919 package 73581-919-72 print this list.',
    cite: `Wellspring 72-count (${SHOP}/welmate-urinary-pain-relief-phenazopyridine-hydrochloride-99-5-mg-72-count-tablets-1) drug-facts tile did not resolve an inactive line. DailyMed NDC 73581-919 package 73581-919-72 is this count. The 36-count and 120-count cartons print colloidal silicon dioxide (not the SPL spelling silicone).`,
  },
  {
    id: 'welmate-b87-phenazopyridine-120',
    productName: 'WELMATE Urinary Pain Relief Phenazopyridine HCl 99.5 mg, 120 Tablets',
    category: 'Pain & Fever',
    formulaId: 'welmate-b87-phenazopyridine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Phenazopyridine HCl', strength: '99.5mg' }],
    flags: [
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Croscarmellose sodium', 'cleared', 'cellulose'],
      ['Hydroxypropyl methylcellulose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Maize (corn) starch', 'cleared', 'starch'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Povidone', 'cleared', 'povidone'],
      ['Pregelatinized starch', 'cleared', 'pregel'],
    ],
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are polyethylene glycol and colloidal silicon dioxide. 120-count carton prints the same inactive line as the 36-count.',
    cite: `Wellspring carton Drug Facts (${SHOP}/welmate-uti-relief-phenazopyridine-hydrochloride-99-5mg-120-count-extended-release-tablets) prints the same inactive line as the 36-count, including colloidal silicon dioxide. DailyMed NDC 73581-919 lists 72/36/12 packages; the 120-count carton is the seller pin for this count.`,
  },
];

export const BATCH87_KYR6_AMAZON_3P_WELMATE: RatingRecord[] = COMPACT.map(expand);

export const BATCH87_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'WELMATE Simethicone 125 mg, 365 Softgels',
    reason:
      'SKIPPED no_OI — wellspringmeds.com carousel tiles did not yield a reliable Other Ingredients line. HTML bullets were not treated as a panel. Two different YYBA simethicone SPLs were not bound (no NDC on the WELMATE tile). NO Search row.',
  },
  {
    sku: 'WELMATE Levocetirizine 5 mg, 180 Tablets',
    reason:
      'SKIPPED no_OI — drug-facts thumbnails did not yield a reliable inactive line. HTML bullets were not treated as a panel. NO Search row.',
  },
  {
    sku: 'WELMATE Levocetirizine 5 mg, 360 Tablets',
    reason:
      'SKIPPED no_OI — drug-facts thumbnails did not yield a reliable inactive line. HTML bullets were not treated as a panel. NO Search row.',
  },
  {
    sku: 'WELMATE Guaifenesin 1200 mg, 100 Extended-Release Tablets',
    reason:
      'SKIPPED no_OI — front and lifestyle tiles only. No NDC on the photos, so the 600 mg inactive list was not copied onto this count. NO Search row.',
  },
  {
    sku: 'WELMATE Guaifenesin 1200 mg, 35 Extended-Release Tablets',
    reason:
      'SKIPPED no_OI — front and lifestyle tiles only. No NDC on the photos, so the 600 mg inactive list was not copied onto this count. NO Search row.',
  },
  {
    sku: 'WELMATE Adapalene Gel 0.1%, 1.6 oz',
    reason:
      'SKIPPED no_OI — drug-facts tile did not yield an inactive line. HTML bullets were not treated as a panel. NO Search row.',
  },
  {
    sku: 'WELMATE Diclofenac Sodium Topical Gel 1%, 150 g, Pack of 3',
    reason:
      'SKIPPED OUT — multipack of the written 150 g single (NDC 73581-104-15). Not a second formula. NO Search row.',
  },
  {
    sku: 'WELMATE Sodium Chloride Hypertonicity Ophthalmic Ointment 5%, Pack of 3',
    reason:
      'SKIPPED OUT — multipack of the written 1/8 oz single. Not a second formula. NO Search row.',
  },
  {
    sku: 'WELMATE Adapalene Gel 0.1%, 1.6 oz, Pack of 2',
    reason:
      'SKIPPED OUT — multipack of the single adapalene gel. Not a second formula. NO Search row.',
  },
  {
    sku: 'WELMATE Lidocaine 4% Patch, 15 Count',
    reason:
      'SKIPPED already-on-MAIN. Ethylhexyl patch panel is welmate-lidocaine-4-patch-ethylhexyl (formula amazon-basics-lidocaine-4-patch) in batch54. Not rewritten.',
  },
  {
    sku: 'WELMATE Lidocaine 4% Patch, 30 Count',
    reason:
      'SKIPPED already-on-MAIN. Carton inactive line matches welmate-lidocaine-4-patch-ethylhexyl (formula amazon-basics-lidocaine-4-patch) in batch54. Not rewritten.',
  },
  {
    sku: 'WELMATE Lidocaine 4% Patch, 40 Count',
    reason:
      'SKIPPED already-on-MAIN. Paraben patch panel is welmate-lidocaine-4-patch-parabens in batch54. Not rewritten.',
  },
];

export const BATCH87_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'WELMATE Esomeprazole Magnesium 20 mg, 42 Capsules and Pack of 2',
    reason:
      'REFUSED exact panel string `ferrosoferric oxide`. Carton matches DailyMed NDC 73581-013 (not the 73581-014 list). New inactive — no grade invented. NO Search row.',
  },
  {
    sku: 'WELMATE Lidocaine 5% Cream, 5.5 oz Jar and 1 oz Tube',
    reason:
      'REFUSED exact panel strings `cholesterol`, `hydrogenated lecithin`. Carton matches the hemorrhoid-cream list (benzyl alcohol, carbomer 940, isopropyl myristate, polysorbate 80, propylene glycol, trolamine, vitamin E acetate). New inactives — no grade invented. NO Search row.',
  },
  {
    sku: 'WELMATE Lidocaine 5% Cream, 2 oz and 6 oz',
    reason:
      'REFUSED exact panel string `C10-18 triglycerides`. 2 oz carton prints the full list (benzyl alcohol, carbomer, cetearyl alcohol, glyceryl stearate, glycine soja (soybean) oil, isopropyl myristate, PEG-100 stearate, propylene glycol, stearic acid, tocopherol, triethanolamine, water). 6 oz tile starts with the same string. Not the cholesterol cream. NO Search row.',
  },
  {
    sku: 'WELMATE Butenafine HCl 1% Cream, 1 oz and Pack of 3',
    reason:
      'REFUSED exact panel strings `polyoxyethylene (23) cetyl ether`, `propylene glycol dicaprylate`. Carton start matches DailyMed NDC 73581-210. New inactives — no grade invented. NO Search row.',
  },
  {
    sku: 'WELMATE Docosanol 10%, 2 g, Pack of 2',
    reason:
      'REFUSED exact panel strings `sucrose distearate`, `sucrose stearate`. Carton matches DailyMed NDC 73581-004. New inactives — no grade invented. NO Search row.',
  },
  {
    sku: 'WELMATE Diphenhydramine HCl 50 mg, 1000 Capsules',
    reason:
      'REFUSED exact panel string `black iron oxide`. Carton matches DailyMed NDC 73581-020. New inactive — no grade invented. NO Search row.',
  },
  {
    sku: 'WELMATE AREDS 2 Mini Softgels, 120 and 240',
    reason:
      'REFUSED exact panel strings `dl-alpha tocopheryl acetate`, `marigold extract (tagetes erecta)`, `copper oxide`. Both counts print the same other-ingredients line. New inactives — no grade invented. NO Search row.',
  },
  {
    sku: 'WELMATE Loperamide 2 mg + Simethicone 125 mg, 24 Caplets',
    reason:
      'REFUSED exact panel string `vanilla flavor`. Carton matches DailyMed NDC 73581-178. New inactive — no grade invented. NO Search row.',
  },
  {
    sku: 'WELMATE Numbing Relief Lidocaine 5% Spray',
    reason:
      'REFUSED exact panel strings `aloe barbadensis leaf extract`, `cucumis sativus (cucumber) fruit extract`, `disodium cocoamphodipropionate`. DailyMed WELMATE NDC 73581-920. Not on the Wellspring catalog. New inactives — no grade invented. NO Search row.',
  },
  {
    sku: 'WelAhead by Welmate Lidocaine 5% Roll-on',
    reason:
      'REFUSED exact panel string `chonüoitin sulfate`. DailyMed NDC 83833-101 prints that string. Not corrected and not aliased. NO Search row.',
  },
];

const _ROWS = BATCH87_KYR6_AMAZON_3P_WELMATE;
if (_ROWS.length !== 34) throw new Error('batch87 tally drift: expected 34 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 4) throw new Error('batch87 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 12) throw new Error('batch87 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 18) throw new Error('batch87 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch87 recordStatus must stay unverified');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 19) throw new Error('batch87 NEW formula drift');
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 15) throw new Error('batch87 REUSE formula drift');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch87 duplicate ids');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) throw new Error('batch87 formulaId must point at a row in this file');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch87 writes WELMATE only');
if (_ROWS.some((r) => r.barcode)) throw new Error('batch87 must not attach a barcode');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|naturewise|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch87 other 3P / Sprouts / toothpaste / NOW / Nutricost / NatureWise must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/softgel|capsule|tablet|gel|ointment/i.test(r.productName + (r.form ?? '')))) {
  throw new Error('batch87 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch87 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch87 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch87 Clean row has a non-cleared flag on ${record.id}`);
  }
}
if (BATCH87_SKIPPED.length !== 12) throw new Error('batch87 SKIPPED drift');
if (BATCH87_SKIPPED.filter((s) => /no_OI/.test(s.reason)).length !== 6) throw new Error('batch87 no_OI drift');
if (BATCH87_SKIPPED.filter((s) => /\bOUT\b/.test(s.reason)).length !== 3) throw new Error('batch87 OUT drift');
if (BATCH87_SKIPPED.filter((s) => /already-on-MAIN/.test(s.reason)).length !== 3) throw new Error('batch87 already-on-MAIN drift');
if (BATCH87_REFUSED.length !== 10) throw new Error('batch87 REFUSED drift');
if (BATCH87_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) throw new Error('batch87 REFUSED must quote an exact panel string');
