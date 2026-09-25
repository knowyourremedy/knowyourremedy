// DRAFT / not verified / batch 96 KYR6 Amazon 3P HealthA2Z.
// Methodology v1.6 + MAIN §5 after the Sept 24, 2026 formaldehyde-releaser
// stamp and the batch94 maps. Harm-first. No invented grades. No invented OI.
// No invented UPCs. Founder owns final Avoid vs Caution vs Clean.
//
// HealthA2Z only. DailyMed labeler is Allegiant Health (NDC 69168).
// Brand site is a2z-life.com. Exact pack only. Canada/EU listings stay out.
// recordStatus is 'unverified'. Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// Hunt: NDC packs are pinned to the DailyMed inactive paragraph.
// The menstrual 90-count is pinned to setid d197b886 (NDC printed on the
// brand carton and confirmed on DailyMed). Brand-site BigCommerce upc
// fields are not attached. Several pages copy another product's barcode.
// An NDC is not a UPC. HTML bullets are not OI.
//
// Already-on-MAIN twins left alone: healtha2z-childrens-apap-chew,
// healtha2z-ibuprofen-200-382, healtha2z-ibuprofen-200-335,
// healtha2z-naproxen-220-300.
//
// Do NOT edit batch70–batch95. No house Amazon. No TIME-Cap. No GoodSense.
// No toothpaste. No Sprouts. No factory. Oil form split stays as it is on main.
//
// TALLY (unverified drafts in THIS file): 59 rows —
// Clean 11 / Caution 20 / Avoid 28.
// NEW 25 / REUSE-formula 34 /
// SKIPPED 102 (no_OI 93 / OUT 9) /
// REFUSED 52.
// Search grade: Clean 11 / Caution 20 / Avoid 28.
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
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  sio2: "Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica gel — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.",
  croscarmellose: "Methodology §5 Cleared (croscarmellose sodium).",
  hpmc: "Methodology §5 Cleared (hypromellose / HPMC).",
  lactoseMh: "Methodology §5 Cleared (lactose monohydrate).",
  lactose: "Methodology §5 Cleared (lactose / lactose monohydrate).",
  mgStearate: "Methodology §5 Cleared (magnesium stearate).",
  mcc: "Methodology §5 Cleared (microcrystalline cellulose).",
  cmc: "Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum). The printed MCC + CMC combo is these two Cleared locks.",
  peg: "Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.",
  tio2: "Methodology §5 High (titanium dioxide).",
  cornStarch: "Methodology §5 Cleared (corn starch — named simple starch).",
  carbomerB: "Methodology §5 Cleared (carbomer / carbomer homopolymer, including type B).",
  carbomer: "Methodology §5 Cleared (carbomer / carbomer homopolymer).",
  ssg: "Methodology §5 Cleared (sodium starch glycolate).",
  dical: "Methodology §5 Cleared (dicalcium phosphate / dibasic calcium phosphate — mineral filler). Not the dihydrate string.",
  dye: "Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name.",
  gelatin: "Methodology §5 Cleared (gelatin).",
  glycerin: "Methodology §5 Cleared (glycerin).",
  peppermint: "Methodology §5 Limited (peppermint oil as flavor). Not gummy High. Not an oil-bottle grade.",
  water: "Methodology §5 Cleared (purified water / water).",
  whiteInk: "Methodology §5 Caution (white edible ink — exact token; locked Sept 18, 2026). Same class as edible ink. Not Avoid.",
  citric: "Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers). Anhydrous citric acid sits on this row.",
  pgOral: "Methodology §5 Moderate (propylene glycol, oral).",
  pgTopical: "Methodology §5 Cleared (propylene glycol, topical). Oral propylene glycol is the Moderate row. This product is topical.",
  sss: "Methodology §5 Caution (sorbitol sorbitan solution — exact token; locked Sept 24, 2026). Distinct from Limited oral sorbitol and from Caution sorbitan esters. Not Avoid.",
  sodiumCitrate: "Methodology §5 Cleared (sodium citrate — citrate-salt filler/buffer with citric acid).",
  sls: "Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.",
  tartaric: "Methodology §5 Cleared (tartaric acid).",
  povidone: "Methodology §5 Cleared (povidone).",
  pregel: "Methodology §5 Cleared (pregelatinized starch). Pregelatinized starch (maize) is that token.",
  stearic: "Methodology §5 Cleared (stearic acid).",
  dextrose: "Methodology §5 Cleared (dextrose as a sweetener). Distinct from Caution organic cultured dextrose.",
  bkc: "Methodology §5 Caution (benzalkonium chloride). Standalone Caution. Not Avoid.",
  pea: "Methodology §5 Caution (phenylethyl alcohol — exact token; locked Sept 18, 2026). Twin of phenethyl alcohol. Not Avoid.",
  ps80: "Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.",
  carnauba: "Methodology §5 Cleared (carnauba wax).",
  crospovidone: "Methodology §5 Cleared (crospovidone).",
  ferric: "Methodology §5 Caution (ferric oxide red / ferric oxide yellow). Not Avoid. Not a dye High.",
  polydextrose: "Methodology §5 Limited (polydextrose).",
  hec: "Methodology §5 Cleared (hydroxyethyl cellulose / hydroxyethylcellulose).",
  ironColor: "Methodology §5 Caution (iron oxide as color). Ferrosoferric oxide and black iron oxide and iron oxide black sit on this row (Sept 23, 2026). Not Avoid.",
  ironRed: "Methodology §5 Caution (iron oxide red). Not Avoid. Not a dye High. Do not alias red iron oxide.",
  ironYellow: "Methodology §5 Caution (iron oxide yellow / ferric oxide yellow). Not Avoid. Do not alias yellow iron oxide.",
  benzyl: "Methodology §5 Caution (benzyl alcohol as a topical inactive on an adult product). Not the under-3 Avoid split.",
  cholesterol: "Methodology §5 Caution (cholesterol as an inactive — exact token; locked Sept 23, 2026). Not Avoid.",
  hLecithin: "Methodology §5 Caution (hydrogenated lecithin — exact token; locked Sept 23, 2026). Not Cleared lecithin. Not Avoid.",
  ipm: "Methodology §5 Cleared (isopropyl myristate — topical emollient).",
  tocopheryl: "Methodology §5 Caution (tocopheryl acetate). Distinct from Cleared mixed tocopherols and from Cleared DL-alpha tocopheryl acetate. Not Avoid.",
  tea: "Methodology §5 Caution (TEA / trolamine as inactive). Triethanolamine is that token. Not Avoid.",
  triacetin: "Methodology §5 Cleared (triacetin — tablet/caplet coating plasticizer). Not a grade driver.",
  simethicone: "Methodology §5 Caution (simethicone / simethicone emulsion as an inactive — exact token; locked Sept 24, 2026). Not Avoid.",
  methacrylicCopolymer: "Methodology §5 Caution (methacrylic acid copolymer). Not Avoid.",
  sorbitol: "Methodology §5 Limited (sorbitol — sugar alcohol, oral).",
  methacrylic: "Methodology §5 Caution (methacrylic acid — exact token; locked Sept 23, 2026). Not Avoid.",
  naoh: "Methodology §5 Cleared (sodium hydroxide — pH adjuster, trace).",
  mgSulfate: "Methodology §5 Cleared (magnesium sulfate).",
  ipa: "Methodology §5 Limited (isopropyl alcohol — alcohol vehicle family). Not Avoid.",
  lecithin: "Methodology §5 Cleared (lecithin).",
  pvaOral: "Methodology §5 Cleared (polyvinyl alcohol as an oral coating).",
  talcOral: "Methodology §5 High (talc in an oral / swallow product).",
  sodiumBicarb: "Methodology §5 Cleared (sodium bicarbonate — saline/buffer salt).",
  triethyl: "Methodology §5 Cleared (triethyl citrate).",
  paraben: "Methodology §5 High (parabens — methylparaben and propylparaben, every form).",
  sodiumBenzoate: "Methodology §5 Caution (sodium benzoate). Not Avoid.",
  sucralose: "Methodology §5 Moderate (sucralose). Not the Avoid driver.",
  xanthan: "Methodology §5 Cleared (xanthan gum).",
  nacl: "Methodology §5 Cleared (sodium chloride — saline base).",
  flavor: "Methodology §5 Caution (flavor — exact token; locked Sept 24, 2026). Distinct from Limited natural flavors. Not Avoid.",
  maltodextrin: "Methodology §5 Limited (maltodextrin).",
  calciumCarbonate: "Methodology §5 Cleared (calcium carbonate — mineral filler).",
  aspartame: "Methodology §5 High (aspartame). Locked Avoid.",
  acacia: "Methodology §5 Cleared (acacia / gum arabic).",
  ammoniumHydroxide: "Methodology §5 Caution (ammonium hydroxide — exact token). Not Avoid.",
  pvap: "Methodology §5 Caution (polyvinyl acetate phthalate). Not Avoid.",
  sodiumAlginate: "Methodology §5 Cleared (sodium alginate — alginic family).",
  sucrose: "Methodology §5 Limited (sucrose).",
  ethylcellulose: "Methodology §5 Cleared (ethylcellulose).",
  mannitol: "Methodology §5 Limited (mannitol — sugar alcohol).",
  polyethylene: "Methodology §5 Cleared (polyethylene as a chew binder).",
  dextratesHydrated: "Methodology §5 Cleared (dextrates hydrated). Not bare dextrates.",
  hpc: "Methodology §5 Cleared (hydroxypropyl cellulose / HPC).",
  polyacrylic: "Methodology §5 Caution (polyacrylic acid — topical gel polymer). Not Avoid.",
  sodiumPolyacrylate: "Methodology §5 Caution (sodium polyacrylate — topical gel polymer). Not Avoid.",
  edta: "Methodology §5 Cleared (disodium EDTA / edetate disodium, trace). Distinct from Caution tetrasodium EDTA.",
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

const CETIRIZINE_10_FLAGS: Compact['flags'] = [
  ["colloidal silicon dioxide", "limited", "sio2"],
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["hypromellose", "cleared", "hpmc"],
  ["lactose monohydrate", "cleared", "lactoseMh"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polyethylene glycol", "moderate", "peg"],
  ["titanium dioxide", "high", "tio2"],
];

const ASPIRIN_325_FLAGS: Compact['flags'] = [
  ["corn starch", "cleared", "cornStarch"],
];

const GUAIFENESIN_600_FLAGS: Compact['flags'] = [
  ["carbomer homopolymer type B", "cleared", "carbomerB"],
  ["hypromellose", "cleared", "hpmc"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["sodium starch glycolate", "cleared", "ssg"],
];

const SENNA_8_6_FLAGS: Compact['flags'] = [
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["dibasic calcium phosphate", "cleared", "dical"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["silicon dioxide", "limited", "sio2"],
];

const SIMETHICONE_125_FLAGS: Compact['flags'] = [
  ["D&C yellow #10", "high", "dye"],
  ["FD&C blue #1", "high", "dye"],
  ["FD&C red #40", "high", "dye"],
  ["gelatin", "cleared", "gelatin"],
  ["glycerin", "cleared", "glycerin"],
  ["peppermint oil", "limited", "peppermint"],
  ["purified water", "cleared", "water"],
  ["white edible ink", "limited", "whiteInk"],
];

const DOCUSATE_100_SINGLE_FLAGS: Compact['flags'] = [
  ["Anhydrous citric acid", "cleared", "citric"],
  ["FD&C Red #40", "high", "dye"],
  ["FD&C Yellow #6", "high", "dye"],
  ["gelatin", "cleared", "gelatin"],
  ["glycerin", "cleared", "glycerin"],
  ["polyethylene glycol", "moderate", "peg"],
  ["propylene glycol", "moderate", "pgOral"],
  ["purified water", "cleared", "water"],
  ["sorbitol sorbitan solution", "limited", "sss"],
  ["white edible ink", "limited", "whiteInk"],
];

const SIMETHICONE_250_FLAGS: Compact['flags'] = [
  ["D&C red #33", "high", "dye"],
  ["FD&C blue #1", "high", "dye"],
  ["gelatin", "cleared", "gelatin"],
  ["glycerin", "cleared", "glycerin"],
  ["purified water", "cleared", "water"],
  ["white edible ink", "limited", "whiteInk"],
];

const EARWAX_6_5_FLAGS: Compact['flags'] = [
  ["citric acid", "cleared", "citric"],
  ["glycerin", "cleared", "glycerin"],
  ["propylene glycol", "cleared", "pgTopical"],
  ["sodium citrate", "cleared", "sodiumCitrate"],
  ["sodium lauryl sulfate", "limited", "sls"],
  ["tartaric acid", "cleared", "tartaric"],
];

const APAP_325_FLAGS: Compact['flags'] = [
  ["corn starch", "cleared", "cornStarch"],
  ["povidone", "cleared", "povidone"],
  ["pregelatinized starch", "cleared", "pregel"],
  ["sodium starch glycolate", "cleared", "ssg"],
  ["stearic acid", "cleared", "stearic"],
];

const FLUTICASONE_50_FLAGS: Compact['flags'] = [
  ["0.02% w/w benzalkonium chloride", "limited", "bkc"],
  ["dextrose", "cleared", "dextrose"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["carboxymethylcellulose sodium", "cleared", "cmc"],
  ["0.25% w/w phenylethyl alcohol", "limited", "pea"],
  ["polysorbate 80", "moderate", "ps80"],
  ["purified water", "cleared", "water"],
];

const DUAL_ACTION_FLAGS: Compact['flags'] = [
  ["carnauba wax", "cleared", "carnauba"],
  ["colloidal silicon dioxide", "limited", "sio2"],
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["crospovidone", "cleared", "crospovidone"],
  ["ferric oxide red", "limited", "ferric"],
  ["ferric oxide yellow", "limited", "ferric"],
  ["hypromellose", "cleared", "hpmc"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polydextrose", "limited", "polydextrose"],
  ["polyethylene glycol", "moderate", "peg"],
  ["povidone", "cleared", "povidone"],
  ["pregelatinized starch", "cleared", "pregel"],
  ["sodium lauryl sulfate", "limited", "sls"],
  ["stearic acid", "cleared", "stearic"],
  ["titanium dioxide", "high", "tio2"],
];

const GUAIFENESIN_1200_FLAGS: Compact['flags'] = [
  ["carbomer homopolymer type B", "cleared", "carbomerB"],
  ["hypromellose", "cleared", "hpmc"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["sodium starch glycolate", "cleared", "ssg"],
];

const DPH_25_CAPLET_FLAGS: Compact['flags'] = [
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["D&C red #27 aluminum lake", "high", "dye"],
  ["hypromellose", "cleared", "hpmc"],
  ["lactose", "cleared", "lactose"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polyethylene glycol", "moderate", "peg"],
  ["silicon dioxide", "limited", "sio2"],
  ["titanium dioxide", "high", "tio2"],
];

const LORATADINE_10_FLAGS: Compact['flags'] = [
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["lactose monohydrate", "cleared", "lactoseMh"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["silicon dioxide", "limited", "sio2"],
];

const SIMETHICONE_180_FLAGS: Compact['flags'] = [
  ["FD&C yellow # 6", "high", "dye"],
  ["gelatin", "cleared", "gelatin"],
  ["glycerin", "cleared", "glycerin"],
  ["purified water", "cleared", "water"],
  ["white edible ink", "limited", "whiteInk"],
];

const TENSION_FLAGS: Compact['flags'] = [
  ["corn starch", "cleared", "cornStarch"],
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["crospovidone", "cleared", "crospovidone"],
  ["D&C red #27 aluminum lake", "high", "dye"],
  ["FD&C red #40 aluminum lake", "high", "dye"],
  ["FD&C yellow #6 aluminum lake", "high", "dye"],
  ["hypromellose", "cleared", "hpmc"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polyethylene glycol", "moderate", "peg"],
  ["povidone", "cleared", "povidone"],
  ["pregelatinized starch", "cleared", "pregel"],
  ["silicon dioxide", "limited", "sio2"],
  ["stearic acid", "cleared", "stearic"],
  ["titanium dioxide", "high", "tio2"],
];

const PHENYLEPHRINE_10_FLAGS: Compact['flags'] = [
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["FD&C red #40 aluminum lake", "high", "dye"],
  ["FD&C yellow #6 aluminum lake", "high", "dye"],
  ["hypromellose", "cleared", "hpmc"],
  ["lactose", "cleared", "lactose"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polyethylene glycol", "moderate", "peg"],
  ["silicon dioxide", "limited", "sio2"],
  ["titanium dioxide", "high", "tio2"],
];

const APAP_500_FLAGS: Compact['flags'] = [
  ["corn starch", "cleared", "cornStarch"],
  ["povidone", "cleared", "povidone"],
  ["pregelatinized starch", "cleared", "pregel"],
  ["sodium starch glycolate", "cleared", "ssg"],
  ["stearic acid", "cleared", "stearic"],
];

const APAP_650_ER_FLAGS: Compact['flags'] = [
  ["hydroxyethyl cellulose", "cleared", "hec"],
  ["hypromellose", "cleared", "hpmc"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polyethylene glycol", "moderate", "peg"],
  ["povidone", "cleared", "povidone"],
  ["pregelatinized starch", "cleared", "pregel"],
  ["sodium starch glycolate", "cleared", "ssg"],
  ["stearic acid", "cleared", "stearic"],
];

const CHLORPHENIRAMINE_4_FLAGS: Compact['flags'] = [
  ["D&C yellow #10 aluminum lake", "high", "dye"],
  ["lactose", "cleared", "lactose"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["stearic acid", "cleared", "stearic"],
];

const PEG_3350_FLAGS: Compact['flags'] = [
];

const LEVOCETIRIZINE_5_FLAGS: Compact['flags'] = [
  ["colloidal silicon dioxide", "limited", "sio2"],
  ["hypromellose", "cleared", "hpmc"],
  ["lactose monohydrate", "cleared", "lactoseMh"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polyethylene glycol", "moderate", "peg"],
  ["polysorbate 80", "moderate", "ps80"],
  ["titanium dioxide", "high", "tio2"],
];

const FEXOFENADINE_180_413_FLAGS: Compact['flags'] = [
  ["colloidal silicon dioxide", "limited", "sio2"],
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["ferrosoferric oxide (black iron oxide)", "limited", "ironColor"],
  ["hypromellose", "cleared", "hpmc"],
  ["iron oxide red", "limited", "ironRed"],
  ["iron oxide yellow", "limited", "ironYellow"],
  ["lactose monohydrate", "cleared", "lactoseMh"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polyethylene glycol", "moderate", "peg"],
  ["pregelatinized starch", "cleared", "pregel"],
  ["titanium dioxide", "high", "tio2"],
];

const LIDOCAINE_RECTAL_5_FLAGS: Compact['flags'] = [
  ["benzyl alcohol", "limited", "benzyl"],
  ["carbomer", "cleared", "carbomer"],
  ["cholesterol", "limited", "cholesterol"],
  ["hydrogenated lecithin", "limited", "hLecithin"],
  ["isopropyl myristate", "cleared", "ipm"],
  ["polysorbate 80", "moderate", "ps80"],
  ["propylene glycol", "cleared", "pgTopical"],
  ["tocopheryl acetate", "limited", "tocopheryl"],
  ["triethanolamine", "limited", "tea"],
  ["water", "cleared", "water"],
];

const MENSTRUAL_FLAGS: Compact['flags'] = [
  ["corn starch", "cleared", "cornStarch"],
  ["croscarmellose sodium", "cleared", "croscarmellose"],
  ["crospovidone", "cleared", "crospovidone"],
  ["hypromellose", "cleared", "hpmc"],
  ["magnesium stearate", "cleared", "mgStearate"],
  ["microcrystalline cellulose", "cleared", "mcc"],
  ["polydextrose", "limited", "polydextrose"],
  ["polyethylene glycol", "moderate", "peg"],
  ["povidone", "cleared", "povidone"],
  ["silicon dioxide", "limited", "sio2"],
  ["stearic acid", "cleared", "stearic"],
  ["titanium dioxide", "high", "tio2"],
  ["triacetin", "cleared", "triacetin"],
];

const COMPACT: Compact[] = [
  {
    id: "healtha2z-b96-cetirizine-10",
    productName: "HealthA2Z Cetirizine HCl 10 mg, 500 tablets, NDC 69168-396-05 (FPA187)",
    category: "Allergies",
    formulaId: "healtha2z-b96-cetirizine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Cetirizine HCl", strength: "10 mg" },
    ],
    flags: CETIRIZINE_10_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide. Under 6: ask a doctor. Adults 65 and over: ask a doctor.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bef9e980-37b4-430d-8635-3354d578b3b8; setid bef9e980-37b4-430d-8635-3354d578b3b8; NDC 69168-396-05). Active: Cetirizine HCl 10 mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-cetirizine-10mg-500-tablets-all-day-allergy-relief-indoor-outdoor-relief-from-itchy-throat-sneezing-runny-noses/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-cetirizine-10-60",
    productName: "HealthA2Z Cetirizine HCl 10 mg, 60 tablets, NDC 69168-396-60 (FPA085)",
    category: "Allergies",
    formulaId: "healtha2z-b96-cetirizine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Cetirizine HCl", strength: "10 mg" },
    ],
    flags: CETIRIZINE_10_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide. Under 6: ask a doctor. Adults 65 and over: ask a doctor.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bef9e980-37b4-430d-8635-3354d578b3b8; setid bef9e980-37b4-430d-8635-3354d578b3b8; NDC 69168-396-60). Active: Cetirizine HCl 10 mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-60-tablets-relief-from-itchy-throat-sneezing-and-runny-nose/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-cetirizine-10-396-03",
    productName: "HealthA2Z Cetirizine HCl 10 mg tablets, NDC 69168-396-03 (FPA017)",
    category: "Allergies",
    formulaId: "healtha2z-b96-cetirizine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Cetirizine HCl", strength: "10 mg" },
    ],
    flags: CETIRIZINE_10_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide. Under 6: ask a doctor. Adults 65 and over: ask a doctor.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bef9e980-37b4-430d-8635-3354d578b3b8; setid bef9e980-37b4-430d-8635-3354d578b3b8; NDC 69168-396-03). Active: Cetirizine HCl 10 mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-all-day-allergy. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-cetirizine-10-1080",
    productName: "HealthA2Z Cetirizine HCl 10 mg, 24 packs of 45 tablets (1080), NDC 69168-396-43 (FP1178)",
    category: "Allergies",
    formulaId: "healtha2z-b96-cetirizine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Cetirizine HCl", strength: "10 mg" },
    ],
    flags: CETIRIZINE_10_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide. Under 6: ask a doctor. Adults 65 and over: ask a doctor.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bef9e980-37b4-430d-8635-3354d578b3b8; setid bef9e980-37b4-430d-8635-3354d578b3b8; NDC 69168-396-43). Active: Cetirizine HCl 10 mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-cetirizine-10mg-24-packs-of-45-tablets-each-1080-tablets-all-day-allergy-relief-indoor-outdoor-relief-from-itchy-throat-sneezing-runny-noses-value-pack/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-aspirin-325",
    productName: "HealthA2Z Aspirin 325 mg uncoated tablets, 300 count, NDC 69168-312-17 (FPA001)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-aspirin-325",
    audience: ADULT,
    minAge: 12,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Aspirin", strength: "325 mg" },
    ],
    flags: ASPIRIN_325_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Adults and children 12 years and over.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=88b54062-8b3d-4024-a957-62b3255184b9; setid 88b54062-8b3d-4024-a957-62b3255184b9; NDC 69168-312-17). Active: Aspirin 325 mg. Inactive ingredients: corn starch Brand PDP https://a2z-life.com/healtha2z-aspirin-325mg-300-count-uncoated-compare-to-bayer-active-ingredients/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-aspirin-325-312-06",
    productName: "HealthA2Z Aspirin 325 mg uncoated tablets, NDC 69168-312-06 (FPA114)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-aspirin-325",
    audience: ADULT,
    minAge: 12,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Aspirin", strength: "325 mg" },
    ],
    flags: ASPIRIN_325_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Adults and children 12 years and over.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=88b54062-8b3d-4024-a957-62b3255184b9; setid 88b54062-8b3d-4024-a957-62b3255184b9; NDC 69168-312-06). Active: Aspirin 325 mg. Inactive ingredients: corn starch Brand PDP https://a2z-life.com/healtha2z-aspirin-325mg-uncoated-tablets-original-strength-pain-reliver-fever-reducer-compare-to-bayer-active-ingredients/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-guaifenesin-600",
    productName: "HealthA2Z Guaifenesin 600 mg extended-release tablets, 150 count, NDC 69168-459-02 (FPA147)",
    category: "Cold & Flu",
    formulaId: "healtha2z-b96-guaifenesin-600",
    audience: ADULT,
    minAge: 12,
    form: "extended-release tablet",
    productType: OTC,
    actives: [
      { name: "Guaifenesin", strength: "600 mg" },
    ],
    flags: GUAIFENESIN_600_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Do not use for children under 12. Different strength from the 1200 mg extended-release, so it does not share that formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3ed75cff-ee25-4105-b0a0-afbe5bc93b62; setid 3ed75cff-ee25-4105-b0a0-afbe5bc93b62; NDC 69168-459-02). Active: Guaifenesin 600 mg. Inactive ingredients: carbomer homopolymer type B; hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate Brand PDP https://a2z-life.com/healtha2z-mucus-relief-guaifenesin-600-mg-no-benzene-extended-release-150-tablets-12-hour-expectorant-relieves-chest-congestion-thins-and-loosens-mucus/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-guaifenesin-600-300",
    productName: "HealthA2Z Guaifenesin 600 mg extended-release tablets, 300 count, NDC 69168-459-17 (FPA169)",
    category: "Cold & Flu",
    formulaId: "healtha2z-b96-guaifenesin-600",
    audience: ADULT,
    minAge: 12,
    form: "extended-release tablet",
    productType: OTC,
    actives: [
      { name: "Guaifenesin", strength: "600 mg" },
    ],
    flags: GUAIFENESIN_600_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Do not use for children under 12. Different strength from the 1200 mg extended-release, so it does not share that formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3ed75cff-ee25-4105-b0a0-afbe5bc93b62; setid 3ed75cff-ee25-4105-b0a0-afbe5bc93b62; NDC 69168-459-17). Active: Guaifenesin 600 mg. Inactive ingredients: carbomer homopolymer type B; hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate Brand PDP https://a2z-life.com/healtha2z-mucus-relief-guaifenesin-600-mg-12-hour-300-counts-no-benzene-expectorant-relieves-chest-congestion-thins-and-loosens-mucus-extended-release/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-guaifenesin-600-75",
    productName: "HealthA2Z Guaifenesin 600 mg extended-release tablets, 75 count, NDC 69168-459-75 (FPA146)",
    category: "Cold & Flu",
    formulaId: "healtha2z-b96-guaifenesin-600",
    audience: ADULT,
    minAge: 12,
    form: "extended-release tablet",
    productType: OTC,
    actives: [
      { name: "Guaifenesin", strength: "600 mg" },
    ],
    flags: GUAIFENESIN_600_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Do not use for children under 12. Different strength from the 1200 mg extended-release, so it does not share that formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3ed75cff-ee25-4105-b0a0-afbe5bc93b62; setid 3ed75cff-ee25-4105-b0a0-afbe5bc93b62; NDC 69168-459-75). Active: Guaifenesin 600 mg. Inactive ingredients: carbomer homopolymer type B; hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate Brand PDP https://a2z-life.com/healtha2z-mucus-relief-guaifenesin-600-mg-75-tablets-12-hour-no-benzene-expectorant-relieves-chest-congestion-thins-and-loosens-mucus-extended-release/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-senna-8-6",
    productName: "HealthA2Z Sennosides 8.6 mg, 24 packs of 30 tablets (720), NDC 69168-371-30 (FP0921A)",
    category: "Digestive",
    formulaId: "healtha2z-b96-senna-8-6",
    audience: ADULT,
    minAge: 12,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Sennosides", strength: "8.6 mg" },
    ],
    flags: SENNA_8_6_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 12 years and over. Driver is silicon dioxide.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=94a9c24a-07c3-4535-b810-b7abc9fc5ad5; setid 94a9c24a-07c3-4535-b810-b7abc9fc5ad5; NDC 69168-371-30). Active: Sennosides 8.6 mg. Inactive ingredients: croscarmellose sodium, dibasic calcium phosphate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-senna-laxative-sennoside-8-6mg-compare-to-senokot-active-ingredient-24-packs-of-30-tablets-720-tablets-total-value-package/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-senna-8-6-300",
    productName: "HealthA2Z Sennosides 8.6 mg, 300 tablets, NDC 69168-371-17 (FPA091)",
    category: "Digestive",
    formulaId: "healtha2z-b96-senna-8-6",
    audience: ADULT,
    minAge: 12,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Sennosides", strength: "8.6 mg" },
    ],
    flags: SENNA_8_6_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 12 years and over. Driver is silicon dioxide.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=94a9c24a-07c3-4535-b810-b7abc9fc5ad5; setid 94a9c24a-07c3-4535-b810-b7abc9fc5ad5; NDC 69168-371-17). Active: Sennosides 8.6 mg. Inactive ingredients: croscarmellose sodium, dibasic calcium phosphate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-senna-laxative-300-count/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-125",
    productName: "HealthA2Z Simethicone 125 mg softgels, 150 count, NDC 69168-419-06 (FPA058)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-125",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "125 mg" },
    ],
    flags: SIMETHICONE_125_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10, FD&C blue #1, FD&C red #40, peppermint oil, white edible ink. Drug Facts active is Simethicone. The structured UNII name Dimethicone is not the label active. Adults and children 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7731bd63-667e-4fed-b446-92a4a83b66d6; setid 7731bd63-667e-4fed-b446-92a4a83b66d6; NDC 69168-419-06). Active: Simethicone 125 mg. Inactive ingredients: D&C yellow #10, FD&C blue #1, FD&C red #40, gelatin, glycerin, peppermint oil, purified water, white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-125mg-softgel-150-count/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-125-365",
    productName: "HealthA2Z Simethicone 125 mg softgels, 365 count, NDC 69168-419-99 (FPA111)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-125",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "125 mg" },
    ],
    flags: SIMETHICONE_125_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10, FD&C blue #1, FD&C red #40, peppermint oil, white edible ink. Drug Facts active is Simethicone. The structured UNII name Dimethicone is not the label active. Adults and children 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7731bd63-667e-4fed-b446-92a4a83b66d6; setid 7731bd63-667e-4fed-b446-92a4a83b66d6; NDC 69168-419-99). Active: Simethicone 125 mg. Inactive ingredients: D&C yellow #10, FD&C blue #1, FD&C red #40, gelatin, glycerin, peppermint oil, purified water, white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-simethicone-125mg-relieves-gas-fast-and-bloating-365-counts/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-125-72",
    productName: "HealthA2Z Simethicone 125 mg softgels, 72 count, NDC 69168-419-72 (FPA110)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-125",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "125 mg" },
    ],
    flags: SIMETHICONE_125_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10, FD&C blue #1, FD&C red #40, peppermint oil, white edible ink. Drug Facts active is Simethicone. The structured UNII name Dimethicone is not the label active. Adults and children 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7731bd63-667e-4fed-b446-92a4a83b66d6; setid 7731bd63-667e-4fed-b446-92a4a83b66d6; NDC 69168-419-72). Active: Simethicone 125 mg. Inactive ingredients: D&C yellow #10, FD&C blue #1, FD&C red #40, gelatin, glycerin, peppermint oil, purified water, white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-simethicone-125mg-72-counts/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-docusate-100-single",
    productName: "HealthA2Z Docusate sodium 100 mg softgels, single tone, 400 count, NDC 69168-424-81 (FPA065)",
    category: "Digestive",
    formulaId: "healtha2z-b96-docusate-100-single",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Docusate sodium", strength: "100 mg" },
    ],
    flags: DOCUSATE_100_SINGLE_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C Red #40, FD&C Yellow #6, polyethylene glycol, propylene glycol, sorbitol sorbitan solution, white edible ink. Single-tone softgel. Adults and children 12 years and over. Oral propylene glycol is Moderate.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9fbe783e-ddd9-445a-852a-00f4ad754880; setid 9fbe783e-ddd9-445a-852a-00f4ad754880; NDC 69168-424-81). Active: Docusate sodium 100 mg. Inactive ingredients: Anhydrous citric acid, FD&C Red #40, FD&C Yellow #6, gelatin, glycerin, polyethylene glycol, propylene glycol, purified water, sorbitol sorbitan solution and white edible ink. Brand PDP https://a2z-life.com/healtha2z-stool-softener-docusate-sodium-100mg-400-counts-single-tone/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-250",
    productName: "HealthA2Z Simethicone 250 mg softgels, 50 count, NDC 69168-434-50 (FPA113)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-250",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "250 mg" },
    ],
    flags: SIMETHICONE_250_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #33, FD&C blue #1, white edible ink. Drug Facts active is Simethicone. Directions on this SPL omit a years line. The same-brand 125 mg label is 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae98861e-6a26-4e0e-a66a-b2738d3cbddd; setid ae98861e-6a26-4e0e-a66a-b2738d3cbddd; NDC 69168-434-50). Active: Simethicone 250 mg. Inactive ingredients: D&C red #33, FD&C blue #1, gelatin, glycerin, purified water and white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-simethicone-250mg-50-counts/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-250-200",
    productName: "HealthA2Z Simethicone 250 mg softgels, 200 count, NDC 69168-434-98 (FPA083)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-250",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "250 mg" },
    ],
    flags: SIMETHICONE_250_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #33, FD&C blue #1, white edible ink. Drug Facts active is Simethicone. Directions on this SPL omit a years line. The same-brand 125 mg label is 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae98861e-6a26-4e0e-a66a-b2738d3cbddd; setid ae98861e-6a26-4e0e-a66a-b2738d3cbddd; NDC 69168-434-98). Active: Simethicone 250 mg. Inactive ingredients: D&C red #33, FD&C blue #1, gelatin, glycerin, purified water and white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-simethicone-250mg-200-softgels-relieves-from-stomach-discomfort-and-gas/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-250-100",
    productName: "HealthA2Z Simethicone 250 mg softgels, 100 count, NDC 69168-434-01 (FPA076)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-250",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "250 mg" },
    ],
    flags: SIMETHICONE_250_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #33, FD&C blue #1, white edible ink. Drug Facts active is Simethicone. Directions on this SPL omit a years line. The same-brand 125 mg label is 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae98861e-6a26-4e0e-a66a-b2738d3cbddd; setid ae98861e-6a26-4e0e-a66a-b2738d3cbddd; NDC 69168-434-01). Active: Simethicone 250 mg. Inactive ingredients: D&C red #33, FD&C blue #1, gelatin, glycerin, purified water and white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-100-counts-simethicone-250mg-relieve-symptoms-naturally/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-earwax-6-5",
    productName: "HealthA2Z Ear wax removal drops, carbamide peroxide 6.5%, 0.5 fl oz (15 mL), NDC 69168-488-68 (FPA189)",
    category: "First Aid",
    formulaId: "healtha2z-b96-earwax-6-5",
    audience: ADULT,
    minAge: 12,
    form: "drops",
    productType: OTC,
    actives: [
      { name: "Carbamide peroxide", strength: "6.5%" },
    ],
    flags: EARWAX_6_5_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: sodium lauryl sulfate. The structured strength 65 mg is the 6.5% drops. Children under 12: consult a doctor. Topical propylene glycol stays Cleared.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=54515e9d-2225-4875-a1cf-a24a823300dd; setid 54515e9d-2225-4875-a1cf-a24a823300dd; NDC 69168-488-68). Active: Carbamide peroxide 6.5%. Inactive ingredients: citric acid, glycerin, propylene glycol, sodium citrate, sodium lauryl sulfate, tartaric acid Brand PDP https://a2z-life.com/healtha2z-ear-wax-removal-kit-carbamide-peroxide-6-5-microfoam-cleansing-action-alcohol-free-includes-rubber-bulb-dropper-0-5-fl-oz-15ml/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-apap-325",
    productName: "HealthA2Z Acetaminophen 325 mg, 24 packs of 30 tablets (720), NDC 69168-010-30 (FP1089)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-apap-325",
    audience: ADULT,
    minAge: 12,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "325 mg" },
    ],
    flags: APAP_325_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Adults and children 12 years and over. The 40-count aspirin page whose barcode decodes to NDC 69168-010-50 is not this formula.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=61c6d281-e59b-4277-bbce-f71c12c2a56d; setid 61c6d281-e59b-4277-bbce-f71c12c2a56d; NDC 69168-010-30). Active: Acetaminophen 325 mg. Inactive ingredients: corn starch, povidone, pregelatinized starch, sodium starch glycolate, stearic acid Brand PDP https://a2z-life.com/healtha2z-regular-strength-pain-relief-acetaminophen-325mg-pain-reliever-fever-reducer-24-packs-of-30-tablets-each-720-tablets-total-value-pack-contains-no-aspirin/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-fluticasone-50",
    productName: "HealthA2Z Fluticasone propionate 50 mcg nasal spray, 72 sprays, 0.38 fl oz, NDC 69168-448-01 (FPA126)",
    category: "Allergies",
    formulaId: "healtha2z-b96-fluticasone-50",
    audience: ADULT,
    minAge: 4,
    form: "nasal spray",
    productType: OTC,
    actives: [
      { name: "Fluticasone propionate", strength: "50 mcg" },
    ],
    flags: FLUTICASONE_50_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: 0.02% w/w benzalkonium chloride, 0.25% w/w phenylethyl alcohol, polysorbate 80. Do not use in children under 4. The children's 72-spray, the 144-spray family, and the 120-spray 2-pack print this same inactive line and the same active, so they share formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a4e1c265-5205-4089-8190-0755ede83896; setid a4e1c265-5205-4089-8190-0755ede83896; NDC 69168-448-01). Active: Fluticasone propionate 50 mcg. Inactive ingredients: 0.02% w/w benzalkonium chloride, dextrose, microcrystalline cellulose and carboxymethylcellulose sodium, 0.25% w/w phenylethyl alcohol, polysorbate 80, purified water Brand PDP https://a2z-life.com/healtha2z-fluticasone-propionate-nasal-spray-50-mcg-per-spray-24-hour-allergy-relief-72-sprays-0-38-fl-oz-11-1ml-relief-from-nasal-congestion-runny-nose-sneezing/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-fluticasone-50-kids-72",
    productName: "HealthA2Z Children's fluticasone propionate 50 mcg nasal spray, 72 sprays, NDC 69168-014-01 (FP1340)",
    category: "Allergies",
    formulaId: "healtha2z-b96-fluticasone-50",
    audience: KIDS,
    minAge: 4,
    form: "nasal spray",
    productType: OTC,
    actives: [
      { name: "Fluticasone propionate", strength: "50 mcg" },
    ],
    flags: FLUTICASONE_50_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: 0.02% w/w benzalkonium chloride, 0.25% w/w phenylethyl alcohol, polysorbate 80. Do not use in children under 4. The children's 72-spray, the 144-spray family, and the 120-spray 2-pack print this same inactive line and the same active, so they share formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4b9fcfc-f3f7-4ce0-8f97-3d475081aa67; setid f4b9fcfc-f3f7-4ce0-8f97-3d475081aa67; NDC 69168-014-01). Active: Fluticasone propionate 50 mcg. Inactive ingredients: 0.02% w/w benzalkonium chloride, dextrose, microcrystalline cellulose and carboxymethylcellulose sodium, 0.25% w/w phenylethyl alcohol, polysorbate 80, purified water Brand PDP https://a2z-life.com/healtha2z-children-s-fluticasone-50mcg-nasal-spray-24-hr-allergy-72-spray/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-fluticasone-50-144",
    productName: "HealthA2Z Fluticasone propionate 50 mcg nasal spray, 144-spray product, NDC 69168-452-01 (FPA127-14)",
    category: "Allergies",
    formulaId: "healtha2z-b96-fluticasone-50",
    audience: ADULT,
    minAge: 4,
    form: "nasal spray",
    productType: OTC,
    actives: [
      { name: "Fluticasone propionate", strength: "50 mcg" },
    ],
    flags: FLUTICASONE_50_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: 0.02% w/w benzalkonium chloride, 0.25% w/w phenylethyl alcohol, polysorbate 80. Do not use in children under 4. The children's 72-spray, the 144-spray family, and the 120-spray 2-pack print this same inactive line and the same active, so they share formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4250d331-17b0-46be-a779-fb4f09bade16; setid 4250d331-17b0-46be-a779-fb4f09bade16; NDC 69168-452-01). Active: Fluticasone propionate 50 mcg. Inactive ingredients: 0.02% w/w benzalkonium chloride, dextrose, microcrystalline cellulose and carboxymethylcellulose sodium, 0.25% w/w phenylethyl alcohol, polysorbate 80, purified water Brand PDP https://a2z-life.com/healtha2z-fluticasone-propionate-nasal-spray-50-mcg-per-spray-24-hour-allergy-relief-relief-from-nasal-congestion-runny-nose-sneezing/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-fluticasone-50-144-2pk",
    productName: "HealthA2Z Fluticasone propionate 50 mcg nasal spray, 144 sprays, pack of 2, NDC 69168-452-02 (FPN014)",
    category: "Allergies",
    formulaId: "healtha2z-b96-fluticasone-50",
    audience: ADULT,
    minAge: 4,
    form: "nasal spray",
    productType: OTC,
    actives: [
      { name: "Fluticasone propionate", strength: "50 mcg" },
    ],
    flags: FLUTICASONE_50_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: 0.02% w/w benzalkonium chloride, 0.25% w/w phenylethyl alcohol, polysorbate 80. Do not use in children under 4. The children's 72-spray, the 144-spray family, and the 120-spray 2-pack print this same inactive line and the same active, so they share formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4250d331-17b0-46be-a779-fb4f09bade16; setid 4250d331-17b0-46be-a779-fb4f09bade16; NDC 69168-452-02). Active: Fluticasone propionate 50 mcg. Inactive ingredients: 0.02% w/w benzalkonium chloride, dextrose, microcrystalline cellulose and carboxymethylcellulose sodium, 0.25% w/w phenylethyl alcohol, polysorbate 80, purified water Brand PDP https://a2z-life.com/healtha2z-fluticasone-propionate-nasal-spray-50-mcg-per-spray-24-hour-allergy-relief-144-sprays-0-62-fl-oz-18-2ml-0-62-fl-oz-pack-of-2/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-fluticasone-50-380-01",
    productName: "HealthA2Z Fluticasone propionate 50 mcg nasal spray, NDC 69168-380-01 (FPA006)",
    category: "Allergies",
    formulaId: "healtha2z-b96-fluticasone-50",
    audience: ADULT,
    minAge: 4,
    form: "nasal spray",
    productType: OTC,
    actives: [
      { name: "Fluticasone propionate", strength: "50 mcg" },
    ],
    flags: FLUTICASONE_50_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: 0.02% w/w benzalkonium chloride, 0.25% w/w phenylethyl alcohol, polysorbate 80. Do not use in children under 4. The children's 72-spray, the 144-spray family, and the 120-spray 2-pack print this same inactive line and the same active, so they share formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4e1cd546-4598-115b-0357-5d0c22731faa; setid 4e1cd546-4598-115b-0357-5d0c22731faa; NDC 69168-380-01). Active: Fluticasone propionate 50 mcg. Inactive ingredients: 0.02% w/w benzalkonium chloride, dextrose, microcrystalline cellulose and carboxymethylcellulose sodium, 0.25% w/w phenylethyl alcohol, polysorbate 80, purified water Brand PDP https://a2z-life.com/healtha2z-fluticasone-propionate-nasal-sprays-24-hour-allergy-relief-120-sprays-0-54-fl-oz/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-fluticasone-50-120-2pk",
    productName: "HealthA2Z Fluticasone propionate 50 mcg nasal spray, 2 pack of 120 sprays, NDC 69168-380-02 (FPA025)",
    category: "Allergies",
    formulaId: "healtha2z-b96-fluticasone-50",
    audience: ADULT,
    minAge: 4,
    form: "nasal spray",
    productType: OTC,
    actives: [
      { name: "Fluticasone propionate", strength: "50 mcg" },
    ],
    flags: FLUTICASONE_50_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: 0.02% w/w benzalkonium chloride, 0.25% w/w phenylethyl alcohol, polysorbate 80. Do not use in children under 4. The children's 72-spray, the 144-spray family, and the 120-spray 2-pack print this same inactive line and the same active, so they share formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4e1cd546-4598-115b-0357-5d0c22731faa; setid 4e1cd546-4598-115b-0357-5d0c22731faa; NDC 69168-380-02). Active: Fluticasone propionate 50 mcg. Inactive ingredients: 0.02% w/w benzalkonium chloride, dextrose, microcrystalline cellulose and carboxymethylcellulose sodium, 0.25% w/w phenylethyl alcohol, polysorbate 80, purified water Brand PDP https://a2z-life.com/healtha2z-fluticasone-nasal-spray-2-pack-120-sprays/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-dual-action",
    productName: "HealthA2Z Dual action acetaminophen 250 mg and ibuprofen 125 mg, 80 caplets, NDC 69168-462-35 (FPA142)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-dual-action",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "250 mg" },
      { name: "Ibuprofen", strength: "125 mg" },
    ],
    flags: DUAL_ACTION_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, ferric oxide red, ferric oxide yellow, polydextrose, polyethylene glycol, sodium lauryl sulfate, titanium dioxide. Adults and children 12 years and over. Ferric oxides are Caution. Titanium dioxide is the Avoid driver.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fb4fc347-0f90-429f-9ca8-903e736f5496; setid fb4fc347-0f90-429f-9ca8-903e736f5496; NDC 69168-462-35). Active: Acetaminophen 250 mg, Ibuprofen 125 mg. Inactive ingredients: carnauba wax, colloidal silicon dioxide, croscarmellose sodium, crospovidone, ferric oxide red, ferric oxide yellow, hypromellose, magnesium stearate, microcrystalline cellulose, polydextrose, polyethylene glycol, povidone, pregelatinized starch, sodium lauryl sulfate, stearic acid and titanium dioxide. Brand PDP https://a2z-life.com/healtha2z-dual-action-pain-relief-80-caplets-acetaminophen-250mg-ibuprofen-nsaid-125mg-contains-two-medicines-relief-from-headache-fever-backache/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-dual-action-150",
    productName: "HealthA2Z Dual action acetaminophen 250 mg and ibuprofen 125 mg, 150 caplets, NDC 69168-462-02 (FPA143)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-dual-action",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "250 mg" },
      { name: "Ibuprofen", strength: "125 mg" },
    ],
    flags: DUAL_ACTION_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, ferric oxide red, ferric oxide yellow, polydextrose, polyethylene glycol, sodium lauryl sulfate, titanium dioxide. Adults and children 12 years and over. Ferric oxides are Caution. Titanium dioxide is the Avoid driver.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fb4fc347-0f90-429f-9ca8-903e736f5496; setid fb4fc347-0f90-429f-9ca8-903e736f5496; NDC 69168-462-02). Active: Acetaminophen 250 mg, Ibuprofen 125 mg. Inactive ingredients: carnauba wax, colloidal silicon dioxide, croscarmellose sodium, crospovidone, ferric oxide red, ferric oxide yellow, hypromellose, magnesium stearate, microcrystalline cellulose, polydextrose, polyethylene glycol, povidone, pregelatinized starch, sodium lauryl sulfate, stearic acid and titanium dioxide. Brand PDP https://a2z-life.com/healtha2z-dual-action-pain-relief-150-caplets-acetaminophen-250mg-ibuprofen-nsaid-125mg-contains-two-medicines-relief-from-headache-fever-backache/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-dual-action-300",
    productName: "HealthA2Z Dual action acetaminophen 250 mg and ibuprofen 125 mg, 300 caplets, NDC 69168-462-17 (FPA171)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-dual-action",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "250 mg" },
      { name: "Ibuprofen", strength: "125 mg" },
    ],
    flags: DUAL_ACTION_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, ferric oxide red, ferric oxide yellow, polydextrose, polyethylene glycol, sodium lauryl sulfate, titanium dioxide. Adults and children 12 years and over. Ferric oxides are Caution. Titanium dioxide is the Avoid driver.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fb4fc347-0f90-429f-9ca8-903e736f5496; setid fb4fc347-0f90-429f-9ca8-903e736f5496; NDC 69168-462-17). Active: Acetaminophen 250 mg, Ibuprofen 125 mg. Inactive ingredients: carnauba wax, colloidal silicon dioxide, croscarmellose sodium, crospovidone, ferric oxide red, ferric oxide yellow, hypromellose, magnesium stearate, microcrystalline cellulose, polydextrose, polyethylene glycol, povidone, pregelatinized starch, sodium lauryl sulfate, stearic acid and titanium dioxide. Brand PDP https://a2z-life.com/healtha2z-dual-action-pain-relief-300-caplets-acetaminophen-250mg-ibuprofen-nsaid-125mg-contains-two-medicines-relief-from-headache-fever-backache/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-guaifenesin-1200",
    productName: "HealthA2Z Guaifenesin 1200 mg extended-release tablets, 200 count, NDC 69168-460-98 (FPA170)",
    category: "Cold & Flu",
    formulaId: "healtha2z-b96-guaifenesin-1200",
    audience: ADULT,
    minAge: 12,
    form: "extended-release tablet",
    productType: OTC,
    actives: [
      { name: "Guaifenesin", strength: "1200 mg" },
    ],
    flags: GUAIFENESIN_1200_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Do not use for children under 12. Same inactive tokens as the 600 mg extended-release, different strength, own formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3d6c30d7-cd02-44a2-b48e-cd65f2896bfd; setid 3d6c30d7-cd02-44a2-b48e-cd65f2896bfd; NDC 69168-460-98). Active: Guaifenesin 1200 mg. Inactive ingredients: carbomer homopolymer type B; hypromellose; magnesium stearate; microcrystalline cellulose; sodium starch glycolate Brand PDP https://a2z-life.com/healtha2z-mucus-relief-guaifenesin-1200-mg-no-benzene-200-tablets-maximum-strength-12-hour-expectorant-relieves-chest-congestion-thins-and-loosens-mucus/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-guaifenesin-1200-100",
    productName: "HealthA2Z Guaifenesin 1200 mg extended-release tablets, 100 count, NDC 69168-460-32 (FPA145)",
    category: "Cold & Flu",
    formulaId: "healtha2z-b96-guaifenesin-1200",
    audience: ADULT,
    minAge: 12,
    form: "extended-release tablet",
    productType: OTC,
    actives: [
      { name: "Guaifenesin", strength: "1200 mg" },
    ],
    flags: GUAIFENESIN_1200_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Do not use for children under 12. Same inactive tokens as the 600 mg extended-release, different strength, own formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3d6c30d7-cd02-44a2-b48e-cd65f2896bfd; setid 3d6c30d7-cd02-44a2-b48e-cd65f2896bfd; NDC 69168-460-32). Active: Guaifenesin 1200 mg. Inactive ingredients: carbomer homopolymer type B; hypromellose; magnesium stearate; microcrystalline cellulose; sodium starch glycolate Brand PDP https://a2z-life.com/healtha2z-mucus-relief-guaifenesin-1200-mg-no-benzene-100-tablets-maximum-strength-12-hour-expectorant-relieves-chest-congestion-thins-and-loosens-mucus/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-dph-25-caplet",
    productName: "HealthA2Z Diphenhydramine HCl 25 mg caplets, 24 packs of 24 (576), NDC 69168-048-93 (FP0533)",
    category: "Allergies",
    formulaId: "healtha2z-b96-dph-25-caplet",
    audience: ADULT,
    minAge: 6,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Diphenhydramine HCl", strength: "25 mg" },
    ],
    flags: DPH_25_CAPLET_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #27 aluminum lake, polyethylene glycol, silicon dioxide, titanium dioxide. Children under 6: do not use. Children 6 to under 12: 1 caplet.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c2823bad-540f-4662-8dcc-58e9f0d94efb; setid c2823bad-540f-4662-8dcc-58e9f0d94efb; NDC 69168-048-93). Active: Diphenhydramine HCl 25 mg. Inactive ingredients: croscarmellose sodium, D&C red #27 aluminum lake, hypromellose, lactose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, silicon dioxide, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-diphenhydramine-25mg-compare-to-benadryl-active-ingredient-24-packs-of-24-caplets-576-tablets-total-value-package/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-dph-25-caplet-600",
    productName: "HealthA2Z Diphenhydramine HCl 25 mg, 600 caplets, NDC 69168-048-20 (FPA063)",
    category: "Allergies",
    formulaId: "healtha2z-b96-dph-25-caplet",
    audience: ADULT,
    minAge: 6,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Diphenhydramine HCl", strength: "25 mg" },
    ],
    flags: DPH_25_CAPLET_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #27 aluminum lake, polyethylene glycol, silicon dioxide, titanium dioxide. Children under 6: do not use. Children 6 to under 12: 1 caplet.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c2823bad-540f-4662-8dcc-58e9f0d94efb; setid c2823bad-540f-4662-8dcc-58e9f0d94efb; NDC 69168-048-20). Active: Diphenhydramine HCl 25 mg. Inactive ingredients: croscarmellose sodium, D&C red #27 aluminum lake, hypromellose, lactose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, silicon dioxide, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-compare-to-benadryl-active-ingredients-600-count-capsules/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10",
    productName: "HealthA2Z Loratadine 10 mg, 30 tablets, NDC 69168-309-30 (FP0930)",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-30). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-loratadine-tablet-10mg-antihistamine-non-drowsy-30-counts-24-hour-allergy-medicine/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10-240",
    productName: "HealthA2Z Loratadine 10 mg, 24 packs of 10 tablets (240), NDC 69168-309-09 (FP1010)",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-09). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-non-drowsy-loratadine-10mg-antihistamine-24-packs-of-10-tablets-240-tablets-total-value-package/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10-5",
    productName: "HealthA2Z Loratadine 10 mg, 5 tablets, NDC 69168-309-08 (FP0552)",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-08). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-loratadine-10mg-antihistamine-5-tablets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10-15",
    productName: "HealthA2Z Loratadine 10 mg, 3 packs of 5 tablets (15), NDC 69168-309-08 (FP0552)",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-08). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-loratadine-10mg-antihistamine-5-tablets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10-30-blister",
    productName: "HealthA2Z Loratadine 10 mg, 6 packs of 5 tablets (30), NDC 69168-309-08 (FP0552)",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-08). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-loratadine-10mg-antihistamine-5-tablets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10-10",
    productName: "HealthA2Z Loratadine 10 mg, 10 tablets, NDC 69168-309-09",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-09). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-loratadine-10mg-antihistamine-10-tablets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10-30-tens",
    productName: "HealthA2Z Loratadine 10 mg, 3 packs of 10 tablets (30), NDC 69168-309-09",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-09). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-loratadine-10mg-antihistamine-10-tablets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-loratadine-10-60",
    productName: "HealthA2Z Loratadine 10 mg, 6 packs of 10 tablets (60), NDC 69168-309-09",
    category: "Allergies",
    formulaId: "healtha2z-b96-loratadine-10",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Loratadine", strength: "10 mg" },
    ],
    flags: LORATADINE_10_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: silicon dioxide. Adults and children 6 years and over. The other loratadine setid that prints pregelantinized starch is refused and does not share this formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a; NDC 69168-309-09). Active: Loratadine 10 mg. Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-loratadine-10mg-antihistamine-10-tablets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-180",
    productName: "HealthA2Z Simethicone 180 mg softgels, 300 count, NDC 69168-433-17 (FPA084)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-180",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "180 mg" },
    ],
    flags: SIMETHICONE_180_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C yellow # 6, white edible ink. The dye is printed FD&C yellow # 6, with the space. Directions omit a years line. The same-brand 125 mg label is 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c79535c-4372-4fd4-a91a-d93617cd581b; setid 4c79535c-4372-4fd4-a91a-d93617cd581b; NDC 69168-433-17). Active: Simethicone 180 mg. Inactive ingredients: FD&C yellow # 6, gelatin, glycerin,purified water and white edible ink Brand PDP https://a2z-life.com/healtha2z-anti-gas-300-counts. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-180-120",
    productName: "HealthA2Z Simethicone 180 mg softgels, 120 count, NDC 69168-433-06 (FPA075)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-180",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "180 mg" },
    ],
    flags: SIMETHICONE_180_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C yellow # 6, white edible ink. The dye is printed FD&C yellow # 6, with the space. Directions omit a years line. The same-brand 125 mg label is 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c79535c-4372-4fd4-a91a-d93617cd581b; setid 4c79535c-4372-4fd4-a91a-d93617cd581b; NDC 69168-433-06). Active: Simethicone 180 mg. Inactive ingredients: FD&C yellow # 6, gelatin, glycerin,purified water and white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-120-count-simethicone-180mg-softgel/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-simethicone-180-60",
    productName: "HealthA2Z Simethicone 180 mg softgels, 60 count, NDC 69168-433-60 (FPA112)",
    category: "Digestive",
    formulaId: "healtha2z-b96-simethicone-180",
    audience: ADULT,
    minAge: 12,
    form: "softgel",
    productType: OTC,
    actives: [
      { name: "Simethicone", strength: "180 mg" },
    ],
    flags: SIMETHICONE_180_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C yellow # 6, white edible ink. The dye is printed FD&C yellow # 6, with the space. Directions omit a years line. The same-brand 125 mg label is 12 years and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c79535c-4372-4fd4-a91a-d93617cd581b; setid 4c79535c-4372-4fd4-a91a-d93617cd581b; NDC 69168-433-60). Active: Simethicone 180 mg. Inactive ingredients: FD&C yellow # 6, gelatin, glycerin,purified water and white edible ink Brand PDP https://a2z-life.com/healtha2z-gas-relief-60-counts-simethicone-180mg/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-tension",
    productName: "HealthA2Z Tension headache acetaminophen 500 mg and caffeine 65 mg, 200 caplets, NDC 69168-029-98 (FPA005)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-tension",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "500 mg" },
      { name: "Caffeine", strength: "65 mg" },
    ],
    flags: TENSION_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, polyethylene glycol, silicon dioxide, titanium dioxide. Adults and children 12 years and over.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b431a1a3-39c4-4d6c-afdc-c8b017ad89da; setid b431a1a3-39c4-4d6c-afdc-c8b017ad89da; NDC 69168-029-98). Active: Acetaminophen 500 mg, Caffeine 65 mg. Inactive ingredients: corn starch, croscarmellose sodium, crospovidone, D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch, silicon dioxide, stearic acid, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-tension-headache-relief-aspirin-free-compare-to-excedrin-active-ingredient-200-caplets/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-tension-16",
    productName: "HealthA2Z Tension headache acetaminophen 500 mg and caffeine 65 mg, 16 caplets, NDC 69168-029-26 (FP1088)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-tension",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "500 mg" },
      { name: "Caffeine", strength: "65 mg" },
    ],
    flags: TENSION_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, polyethylene glycol, silicon dioxide, titanium dioxide. Adults and children 12 years and over.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b431a1a3-39c4-4d6c-afdc-c8b017ad89da; setid b431a1a3-39c4-4d6c-afdc-c8b017ad89da; NDC 69168-029-26). Active: Acetaminophen 500 mg, Caffeine 65 mg. Inactive ingredients: corn starch, croscarmellose sodium, crospovidone, D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch, silicon dioxide, stearic acid, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-tension-headache-relief-16-caplets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-tension-48",
    productName: "HealthA2Z Tension headache acetaminophen 500 mg and caffeine 65 mg, 3 packs of 16 caplets (48), NDC 69168-029-26 (FP1088)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-tension",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "500 mg" },
      { name: "Caffeine", strength: "65 mg" },
    ],
    flags: TENSION_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, polyethylene glycol, silicon dioxide, titanium dioxide. Adults and children 12 years and over.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b431a1a3-39c4-4d6c-afdc-c8b017ad89da; setid b431a1a3-39c4-4d6c-afdc-c8b017ad89da; NDC 69168-029-26). Active: Acetaminophen 500 mg, Caffeine 65 mg. Inactive ingredients: corn starch, croscarmellose sodium, crospovidone, D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch, silicon dioxide, stearic acid, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-tension-headache-relief-16-caplets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-tension-96",
    productName: "HealthA2Z Tension headache acetaminophen 500 mg and caffeine 65 mg, 6 packs of 16 caplets (96), NDC 69168-029-26 (FP1088)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-tension",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "500 mg" },
      { name: "Caffeine", strength: "65 mg" },
    ],
    flags: TENSION_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, polyethylene glycol, silicon dioxide, titanium dioxide. Adults and children 12 years and over.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b431a1a3-39c4-4d6c-afdc-c8b017ad89da; setid b431a1a3-39c4-4d6c-afdc-c8b017ad89da; NDC 69168-029-26). Active: Acetaminophen 500 mg, Caffeine 65 mg. Inactive ingredients: corn starch, croscarmellose sodium, crospovidone, D&C red #27 aluminum lake, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch, silicon dioxide, stearic acid, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-tension-headache-relief-16-caplets-1-pack-3-packs-6-packs/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-phenylephrine-10",
    productName: "HealthA2Z Phenylephrine HCl 10 mg, 300 tablets, NDC 69168-272-17 (FPA066)",
    category: "Cold & Flu",
    formulaId: "healtha2z-b96-phenylephrine-10",
    audience: ADULT,
    minAge: 12,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Phenylephrine HCl", strength: "10 mg" },
    ],
    flags: PHENYLEPHRINE_10_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, polyethylene glycol, silicon dioxide, titanium dioxide. Adults and children 12 years of age and older.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7aef00df-816a-4ea2-a2ad-beed66dd2fe4; setid 7aef00df-816a-4ea2-a2ad-beed66dd2fe4; NDC 69168-272-17). Active: Phenylephrine HCl 10 mg. Inactive ingredients: croscarmellose sodium, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, lactose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, silicon dioxide, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-decongestant-pe-300-count-maximum-strength/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-apap-500",
    productName: "HealthA2Z Acetaminophen 500 mg caplets, 100 count, NDC 69168-328-01 (FP0568)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-apap-500",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "500 mg" },
    ],
    flags: APAP_500_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Adults and children 12 years and over. Same inactive line as the 325 mg caplets, different strength, own formulaId.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8e60b78e-ef3c-4d44-b8d4-37cb8608a5c7; setid 8e60b78e-ef3c-4d44-b8d4-37cb8608a5c7; NDC 69168-328-01). Active: Acetaminophen 500 mg. Inactive ingredients: corn starch, povidone, pregelatinized starch, sodium starch glycolate, stearic acid Brand PDP https://a2z-life.com/healtha2z-pain-relief-extra-strength-acetaminophen-500mg-compare-to-tylenol-active-ingredient-100-caplets-uncoated-value-package/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-apap-650-er",
    productName: "HealthA2Z Acetaminophen 650 mg extended-release caplets, 250 count, NDC 69168-461-03 (FPA149)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-apap-650-er",
    audience: ADULT,
    minAge: 18,
    form: "extended-release caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "650 mg" },
    ],
    flags: APAP_650_ER_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: polyethylene glycol. Under 18: ask a doctor.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4720346-c3e0-4707-b007-1bf1f5e05707; setid f4720346-c3e0-4707-b007-1bf1f5e05707; NDC 69168-461-03). Active: Acetaminophen 650 mg. Inactive ingredients: hydroxyethyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch, sodium starch glycolate, stearic acid Brand PDP https://a2z-life.com/healtha2z-pain-relief-extended-release-acetaminophen-650mg-250-caplets-8-hours-arthiritis-pain-pain-reliever-fever-reducer-contains-no-aspirin/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-apap-650-er-100",
    productName: "HealthA2Z Acetaminophen 650 mg extended-release caplets, 100 count, NDC 69168-461-32 (FPA148)",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-apap-650-er",
    audience: ADULT,
    minAge: 18,
    form: "extended-release caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "650 mg" },
    ],
    flags: APAP_650_ER_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: polyethylene glycol. Under 18: ask a doctor.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4720346-c3e0-4707-b007-1bf1f5e05707; setid f4720346-c3e0-4707-b007-1bf1f5e05707; NDC 69168-461-32). Active: Acetaminophen 650 mg. Inactive ingredients: hydroxyethyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch, sodium starch glycolate, stearic acid Brand PDP https://a2z-life.com/healtha2z-pain-relief-extended-release-acetaminophen-650mg-100-caplets-8-hours-arthiritis-pain-pain-reliever-fever-reducer-contains-no-aspirin/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-chlorpheniramine-4",
    productName: "HealthA2Z Chlorpheniramine maleate 4 mg, 24 packs of 24 caplets (576), NDC 69168-277-93 (FP0550)",
    category: "Allergies",
    formulaId: "healtha2z-b96-chlorpheniramine-4",
    audience: ADULT,
    minAge: 6,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Chlorpheniramine maleate", strength: "4 mg" },
    ],
    flags: CHLORPHENIRAMINE_4_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: D&C yellow #10 aluminum lake. Children under 6: consult a doctor.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4305ad50-d2a5-4d3e-9d92-cbf26e856a16; setid 4305ad50-d2a5-4d3e-9d92-cbf26e856a16; NDC 69168-277-93). Active: Chlorpheniramine maleate 4 mg. Inactive ingredients: D&C yellow #10 aluminum lake, lactose, magnesium stearate, microcrystalline cellulose, stearic acid Brand PDP https://a2z-life.com/healtha2z-allergy-relief-chlorpheniramine-maleate-4mg-24-packs-of-24-caplets-576-total-value-pack-antihistamine-for-sneezing-runny-nose-itchy-eyes/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-peg-3350",
    productName: "HealthA2Z Polyethylene glycol 3350 powder, 17 g, 8.3 oz (238 g), NDC 69168-473-56 (FPA162)",
    category: "Digestive",
    formulaId: "healtha2z-b96-peg-3350",
    audience: ADULT,
    minAge: 17,
    form: "powder",
    productType: OTC,
    actives: [
      { name: "Polyethylene glycol 3350", strength: "17 g" },
    ],
    flags: PEG_3350_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. The inactive paragraph prints None. Adults and children 17 years of age and older. The inactive paragraph prints None. Polyethylene glycol 3350 is the active, not an inactive.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13851c9a-a226-481b-9db5-bc7053997df7; setid 13851c9a-a226-481b-9db5-bc7053997df7; NDC 69168-473-56). Active: Polyethylene glycol 3350 17 g. Inactive ingredients: None Brand PDP https://a2z-life.com/healtha2z-lax-relief-unflavored-powder-grit-free-8-3-oz-238-g-polyethlene-glycol-3350-17g-powder-for-oral-solution-osmotic-laxative-constipational-relief-softens-stool/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-peg-3350-473-55",
    productName: "HealthA2Z Polyethylene glycol 3350 powder, 17 g, NDC 69168-473-55 (FPA162-1)",
    category: "Digestive",
    formulaId: "healtha2z-b96-peg-3350",
    audience: ADULT,
    minAge: 17,
    form: "powder",
    productType: OTC,
    actives: [
      { name: "Polyethylene glycol 3350", strength: "17 g" },
    ],
    flags: PEG_3350_FLAGS,
    verdict: "clean",
    note: "FOUNDER-LOCK DRAFT: Clean. The inactive paragraph prints None. Adults and children 17 years of age and older. The inactive paragraph prints None. Polyethylene glycol 3350 is the active, not an inactive.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13851c9a-a226-481b-9db5-bc7053997df7; setid 13851c9a-a226-481b-9db5-bc7053997df7; NDC 69168-473-55). Active: Polyethylene glycol 3350 17 g. Inactive ingredients: None Brand PDP https://a2z-life.com/healtha2z-lax-relief-unflavored-powder-grit-free-polyethlene-glycol-3350-17g-powder-for-oral-solution-osmotic-laxative-constipation-relief-softens-stool/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-levocetirizine-5",
    productName: "HealthA2Z Levocetirizine dihydrochloride 5 mg tablets, NDC 69168-451-06",
    category: "Allergies",
    formulaId: "healtha2z-b96-levocetirizine-5",
    audience: ADULT,
    minAge: 6,
    form: "tablet",
    productType: OTC,
    actives: [
      { name: "Levocetirizine dihydrochloride", strength: "5 mg" },
    ],
    flags: LEVOCETIRIZINE_5_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, polysorbate 80, titanium dioxide. Children under 6: do not use. Children 6 to 11: half tablet. The brand H1 does not print a count. The row is NDC 69168-451-06.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c523c210-b1c4-4049-9c72-2b31c9c93137; setid c523c210-b1c4-4049-9c72-2b31c9c93137; NDC 69168-451-06). Active: Levocetirizine dihydrochloride 5 mg. Inactive ingredients: colloidal silicon dioxide, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-levocetirizine-dihydrochloride-5mg-24-hours-antihistamine/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-fexofenadine-180-413",
    productName: "HealthA2Z Fexofenadine HCl 180 mg, 250 caplets, NDC 69168-413-03 (FPA190)",
    category: "Allergies",
    formulaId: "healtha2z-b96-fexofenadine-180-413",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Fexofenadine HCl", strength: "180 mg" },
    ],
    flags: FEXOFENADINE_180_413_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, ferrosoferric oxide (black iron oxide), iron oxide red, iron oxide yellow, polyethylene glycol, titanium dioxide. Adults and children 12 years and over. Ferrosoferric oxide (black iron oxide) is the iron-oxide-as-color Caution row. Titanium dioxide is the Avoid driver. Other fexofenadine setids that print red iron oxide or yellow iron oxide stay refused.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=25e72bd3-25c6-4943-92bb-27f9543e2d8a; setid 25e72bd3-25c6-4943-92bb-27f9543e2d8a; NDC 69168-413-03). Active: Fexofenadine HCl 180 mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, ferrosoferric oxide (black iron oxide),hypromellose, iron oxide red, iron oxide yellow, lactose monohydrate, magnesium stearate,microcrystalline cellulose, polyethylene glycol, pregelatinized starch, titanium dioxide Brand PDP https://a2z-life.com/healtha2z-allergy-relief-fexofenadine-hydrochloride-180mg-24-hour-antihistamine-indoor-outdoor-allergy-relief-250-counts/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-lidocaine-rectal-5",
    productName: "HealthA2Z Lidocaine 5% rectal cream, 28 g, NDC 69168-484-02 (FPA182)",
    category: "First Aid",
    formulaId: "healtha2z-b96-lidocaine-rectal-5",
    audience: ADULT,
    minAge: 12,
    form: "cream",
    productType: OTC,
    actives: [
      { name: "Lidocaine", strength: "5%" },
    ],
    flags: LIDOCAINE_RECTAL_5_FLAGS,
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Drivers: benzyl alcohol, cholesterol, hydrogenated lecithin, polysorbate 80, tocopheryl acetate, triethanolamine. The structured strength 5 g is this 5% cream. Adults and children 12 years and older. Topical propylene glycol stays Cleared. Benzyl alcohol on this adult topical is Caution. This is not the refused 4% patch.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ce585082-ad39-4b6f-a756-0d9a81a13eb8; setid ce585082-ad39-4b6f-a756-0d9a81a13eb8; NDC 69168-484-02). Active: Lidocaine 5%. Inactive ingredients: benzyl alcohol, carbomer, cholesterol, hydrogenated lecithin, isopropyl myristate, polysorbate 80, propylene glycol, tocopheryl acetate, triethanolamine, water Brand PDP https://a2z-life.com/healtha2z-rectal-care-cream-lidocaine-5-local-anesthetic-28g-tube-topical-numbing-cream-other-anorectal-disorders-relieves-pain-itching-burning/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
  {
    id: "healtha2z-b96-menstrual",
    productName: "HealthA2Z Menstrual Complete, acetaminophen 500 mg, caffeine 60 mg, pyrilamine maleate 15 mg, 90 caplets, NDC 69168-470-82",
    category: "Pain & Fever",
    formulaId: "healtha2z-b96-menstrual",
    audience: ADULT,
    minAge: 12,
    form: "caplet",
    productType: OTC,
    actives: [
      { name: "Acetaminophen", strength: "500 mg" },
      { name: "Caffeine", strength: "60 mg" },
      { name: "Pyrilamine maleate", strength: "15 mg" },
    ],
    flags: MENSTRUAL_FLAGS,
    verdict: "avoid",
    note: "FOUNDER-LOCK DRAFT: Avoid. Drivers: polydextrose, polyethylene glycol, silicon dioxide, titanium dioxide. Adults and children 12 years and over. Children under 12: ask a doctor. Carton front prints NDC 69168-470-82, the 90-count bottle. The 120-count NDC 69168-470-06 is not this PDP.",
    cite: "DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d197b886-67e4-4aba-8582-305576c07604; setid d197b886-67e4-4aba-8582-305576c07604; NDC 69168-470-82). Active: Acetaminophen 500 mg, Caffeine 60 mg, Pyrilamine maleate 15 mg. Inactive ingredients: corn starch, croscarmellose sodium, crospovidone, hypromellose, magnesium stearate, microcrystalline cellulose, polydextrose, polyethylene glycol, povidone, silicon dioxide, stearic acid, titanium dioxide, triacetin Brand PDP https://a2z-life.com/healtha2z-menstrual-complete-pain-relief-tablets-relieves-cramps-bloating-fatigue-backache-headache/. No GTIN-12 attached. The BigCommerce upc field is not a printed barcode pin.",
  },
];

export const BATCH96_KYR6_AMAZON_3P_HEALTHA2Z: RatingRecord[] = COMPACT.map(expand);

export const BATCH96_SKIPPED_NO_OI: { sku: string; reason: string }[] = [
  { sku: "HealthA2Z® Acid Reducer | Omeprazole 20mg | 14 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA173)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Aspirin 325mg | Original Strength | Uncoated Tablets | Pain Reliever & Fever Reducer | 24 Packs of 40 Uncoated Tablets (960 Tablets Total) | Value Pack | NSAID (FP1165)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Allergy Relief, All Day Allergy, Cetirizine HCL 10mg, 10 Tablets (1 Pack, 3 Packs & 6 Packs) (FP0895)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Allergy Relief | Diphenhydramine 25mg | 24 Packs of 12 Sofgels (288 Total) | Value Pack | Antihistamine for Sneezing, Runny Nose & Itchy Eyes (FP1043)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Blackberry Flavored Melatonin | 5 mg | 60 Pieces | With Melatonin | Improves Sleep Quality, Helps You Fall Asleep Faster & Stay Asleep Longer (FP1062)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Wellness Magnesium Oxide 420mg | Bone & Muscle Support | Dietary Supplement | Value Pack – 24 Packs of 90 Tablets Each (2,160 Tablets Total) (FP1069)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Sleep Aid | Diphenhydramine HCl 50mg | Nighttime Sleep Softgels | 10 Counts (Pack of 24) | 240 Softgels Total | Value Pack (FP0980)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Men's Vitality Boost | 30 Capsules | With Maca, Oyster & Saw Palmetto | Supports Health, Vitality & Endurance (FP1221)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Mucus Relief DM | Dextromethorphan HBr 20mg & Guaifenesin 400mg | Cough & Chest Congestion Relief | 24 Packs of 30 Caplets (720 Total) | Value Pack (FP1125)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Allergy Relief | Loratadine 10mg | Antihistamine | Relief from Itchy Throat, Sneezing, Runny Noses | 24-Hours Allergy Medicine | 30 Tablets (Pack of 24) | 720 Tablets Total | Value Pack (FP1011)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Sleep Aid, Diphenhydramine HCl 25mg, Compare to Simply Sleep, 24 Caplets in a Pack (1 Pack, 3 Pack, 6 Pack)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Multi Collagen Pills | 1735 mg | 270 Collagen Capsules | Types I, II, III, V & X | for Healthy Skin, Hair, Nails & Joint Support (FPA104)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Laxative (BISACODYL 5MG) 250 Count (FPA015)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® CoQ-10 98% Potency | Fast Release 1000 mg | 80 Softgels | Antioxidant Form | Supports Overall Health (FP1186)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Senna Laxative, Sennoside 8.6mg, Compare to Senokot Active Ingredient (FP0921)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Aspirin 81mg Low Strength, 40 Tablets, Compare to Bayer Active Ingredients ( 1 Pack, 3 Packs& 6 Packs)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin D3 + K2 | 5000 IU + 100 mcg | 90 Softgels | Bone & Immune Support | Supports Bone, Muscle & Immune Health (FPHK1222)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Cold & Allergy | Chlorpheniramine Maleate & Phenylephrine HCl | 24 Tablets (Pack of 24) | 576 Total Tablets | Value Pack (FP0943V)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Acid Reducer | Omeprazole 20mg | 42 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA174)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Fish oil regular protency, 200 ct (FP1119)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Allergy Relief, Cetirizine HCl 10mg, 30 Tablets (FP0896)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Decongestant PE, Phenylephrine 10 mg, 24*24 Tablets (576 Tablets Total) (FP0514)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Ibuprofen, 10 liquid filled capsules (1 Pack, 3 Packs & 6 Packs) (FP0660)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z - Ayuda para dormir, 250 cápsulas blandas (FPA028S)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Apple Cider Vinegar 500mg Gummy 4g, 60 ct (FPHK1044)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Allergy Relief | Loratadine 10mg | Antihistamine | 24-Hour Allergy Medicine | 5 Tablets (Pack of 24) | 120 Tablets Total | Value Pack (FP1009)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Magnesium Glycinate(100% Chelated) 240 mg - 180 Capsules, Supports Daytime Energy, Nighttime Restful Sleep, Stress Relief, Mood Balance, Bone & Muscle Health, and Natural Beauty - High Absorption Formula (FPHK1313)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Calcium Antacid | 750mg Extra Strength | Relief from Sour & Upset Stomach, Acid Indigestion | 24 Packs of 96 Chewable Tablets (2,304 Tablets Total) | Value Pack | Assorted Berry Flavors (FP0938V)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Stool Softener, Docusate Sodium 100mg, 100 Capsules (FPA002)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Ashwagandha - 120 Capsules - 7,000mg Ashwagandha Root Powder per serving with Magnesium Glycinate and Ergothioneine (FPHK1252)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Allergy Relief, Diphenhydramine 25mg ( 1 Pack, 3 Packs& 6 Packs)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin D3 | 2000 IU | 90 Mini Softgels | From Premium Lanolin Extract | Immune Support | Enhances Calcium Absorption | Supports Bones, Muscles, Teeth & Energy (FP1068)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Strawberry Flavored B-Complex | 60 Pieces | With Vitamin C | Supports Energy Health & Nervous System Function (FP1126)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Emulsified Calcium | 600 mg Per Serving | 100 Softgels | With 5 mcg (200 IU) Vitamin D3 | Supports Healthy Bones & Teeth | Superior Absorption (FP1190)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Multi Collagen pills 1735mg -180 collagen capsules (60 servings) - Types I, II, III, V & X for Healthy Skin, Hair, Nails & Joint Support (FPN002)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Mucus Relief DM | Dextromethorphan HBr 20mg & Guaifenesin 400mg | Cough & Chest Congestion Relief | 24 Packs of 20 Caplets (480 Total) | Value Pack (FP0585)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z CoQ10 200mg Heart Power - 90 Softgels - with Shilajit & Black Pepper Extract (FPHK1255)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Stool Softener | Docusate Sodium 100mg | 24 Pack of 30 Capsules | Value Package | 720 Softgels in Total (FP1024)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Liquid Vitamin B-Complex | 16 oz (473 mL) | Supports Healthy Energy Levels | Promotes Healthy Nerve Function** (FPN016)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Acid Reducer | Famotidine 20mg | Maximum Strength | Relief from Heartburn & Acid Indigestion | 24 Packs of 50 Tablets (1,200 Tablets Total) | Value Pack (FP1205)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin D3 | 25 mcg (1,000 IU) | 90 Softgels | Bone & Immune Support | Supports Immune Health (FP1148)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Mucus Relief DM, Compare to Mucinex DM Dextromethorphan HBr 20mg, Guaifenesin 400mg, 10 Caplets (1 Pack, 3 Packs & 6 Packs) (FPA049E)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Nighttime Cold-Flu Relief, 8 Softgels (1 Pack, 3 Packs & 6 Packs)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin D3 2000IU (25 mcg) | 360 Softgels (FPHK1153)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Fexofenadine Hydrochloride 180mg | Antihistamine | Value Pack | 24-Hour Antihistamine for Allergy Relief | 30 Count (Pack of 24) | 720 Total Capelets (FP1179)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Acid Reducer | Famotidine 20mg | Maximum Strength | Relief from Heartburn & Acid Indigestion | 24 Packs of 10 Tablets (240 Tablets Total) | Value Pack (FP1197)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® 9 in 1 Joint Health for Women | 90 Tablets, 30-Day Supply | Glucosamine, Chondroitin, MSM, Soy Isoflavones & Turmeric | (FPHK1253)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Eye Health - 60 Softgels (Pack of 1) - ARED 2 FORMULA - Macular, Retinal & Photoreceptor - Support for Aging Eyes - Quick Release (FPHK1256)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Decongestant PE | 300 Ct | Relives Sinus Pressure & Congestion (FPA067)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Mag Oxide 420mg Tablets, 90 ct (FPHK1069)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Naproxen Sodium 220mg | 24 Pack of 10 Caplets Each | Value Package | 240 Caplets in Total | Pain Relief (FP0940)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Pain Relief Extra Strength | 500 Caplets | (FPA080)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin C Gummies | Orange Flavored | 250 mg | 60 Pieces | Immune Support & Antioxidant Support (FPHK1065)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Milk Thistle | Concentrated Extract 300 mg | 60 Tablets | With Milk Thistle Extract | Supports Liver Health & Promotes Healthy Liver Function (FPHK1302)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief for Nausea, Upset Stomach & Diarrhea | 24 Pack of 30 Chewable Tablets (720 Tablets Total) | Value Pack (FP0529V)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Pain Relief Extended Release | Acetaminophen 650mg | 300 Caplets | 8 Hours | Arthritis Pain | Pain Reliever - Fever Reducer | Contains no Aspirin (FPN013)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Anti-Gas, 125mg ( 1 Pack, 3 Packs& 6 Packs) (FP1032)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin D3 (2,000 IU) + K2 (MK-7) Made with Virgin Coconut Oil (Natural MCTs) - 90 Softgels (Pack of 1) - Helps Calcium Absorption for Bones, Teeth, Mood & Immune Health (FPHK1290)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Antarctic Krill Oil | 1000 mg Per Serving | 60 Softgels | With Omega-3 & Astaxanthin | Supports Heart Health | Greater Absorption (FPHK1294)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Extra Strength Pain Relief PM, 20*24 Caplets (480 Caplets Total) (FP1085)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Ovarian Support, Saffron 88.5mg, Inositol, Vitamin D3, 60 Caps (FPHK1318)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Glucosamine Chondroitin MSM | 120 Caplets (FP1138)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Ibuprofen Softgel 200mg | 24 Packs of 30 Softgels Each (720 Softgels Total) | Value Pack | NSAID Pain Reliever & Fever Reducer (FP0706)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Extra Strength Pain Relief | Acetaminophen 500mg | Pain Reliever & Fever Reducer | 24 Packs of 24 Tablets Each (576 Tablets Total) | Value Pack | Contains No Aspirin (FP1090)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Daytime and Nighttime | Cold & Flu Medicine | Decongestant-Free | Powerful Multi-Symptom Daytime and Nighttime Relief | Suitable for Adults with High Blood Pressure (36 Softgels) (FPA192 (FP1317))", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Laxative, 25 Tablets ( 1 Pack, 3 Packs& 6 Packs)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Sugar Free Melatonin Gummies | Blackberry Flavored | 5 mg | 60 Pieces | With Melatonin | Improves Sleep Quality, Helps You Fall Asleep Faster & Stay Asleep Longer (FP1127)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Liquid Vitamin B-Complex Supports Healthy Energy Levels* | Promotes Healthy Nerve Function* | 16oz (473ml) (FPN015)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Esomeprazole Magnesium | Acid Reducer | 20mg | Delayed-Released Capsules USP | 24 Hours | Treats Frequent Heartburn (FPA156a)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Laxative, Bisacodyl 5mg, 24*25 Tablets ( 600 Tablets Total) (FP0917)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Bone Support | Algae Calcium Complex | 90 Capsules (FPHK1248)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Ibuprofen Softgel 200mg | 24 Packs of 10 Softgels Each (240 Softgels Total) | Value Pack | NSAID Pain Reliever & Fever Reducer (FP0660V)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Mucus Relief DM, Dextromethorphan HBr 20mg, Guaifenesin 400mg, 24*10 Caplets (240 Caplets Total) (FP0575)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Stool Softener, Docusate Sodium 100mg, 30 Capsules (1 Pack, 3 Packs & 6 Packs) (FP1024/FP0567)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Cold & Allergy Relief, Chlorpheniramine Maleate 4mg, Phenylephrine HCl 10mg, Antihistamine & Nasal Decongestant, Dye Free, 24 Tablets (FP0943)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Magnesium Glycinate = DHA 120mg - 120 Chewable Tablets - Sugar Free, Aid in Stress Management & Focus, Kids Friendly (FPHK1277)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Women's Multivitamin Gummies | Peach, Orange & Strawberry Flavored | 60 Pieces | For Daily Health & Wellness | Supports Women's Overall Health (FPHK1130)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Sleep Aid | Diphenhydramine HCl 25mg | 24 Pack of 30 Caplets Each | Regular Strength Sleeping Pills | Value Pack | 720 Caplets Total (FP0549)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Sleep Aid, Diphenhydramine HCl 25mg, 24*24 Caplets (576 Caplets Total) (FP0508)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Blueberry Flavored Elderberry Gummies | 60 Pieces | With Vitamin C & Zinc | Supports Immune Function | Packed with Antioxidants (FP1066)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Sleep Aid | Diphenhydramine HCl 25mg | Nighttime Sleep Softgels | 12 Counts (Pack of 24) | 288 Softgels Total | Value Pack (FP1081)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin D3 (5,000 IU) + K2 (MK-7) Made with Virgin Coconut Oil (Natural MCTs) - 90 Softgels (Pack of 1) - Helps Calcium Absorption for Bones, Teeth, Mood & Immune Health (FPHK1287)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Mucus Relief DM, 200 Tablets (FPA016)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Allergy Relief | Cetirizine 10mg | 24 Packs of 45 Tablets Each (1080 Tablets) | All Day Allergy Relief | Indoor & Outdoor | Relief from Itchy Throat, Sneezing, Runny Noses | Value Pack (FP1178V)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Antarctic Krill Oil | 1000 mg Per Serving | 60 Softgels | With Omega-3 & Astaxanthin | Supports Heart Health | Greater Absorption (FPHK1188)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Magnesium Glycinate,180 ct (FP1019)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Anti-Diarrheal | Loperamide HCl 2mg | Controls Symptoms of Diarrhea, Including Travelers’ Diarrhea | 24 Packs of 12 Caplets (288 Caplets Total) | Value Pack (FP0697A)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Magnesium Glycinate(100% Chelated) 240 mg - 60 Capsules, Supports Daytime Energy, Nighttime Restful Sleep, Stress Relief, Mood Balance, Bone & Muscle Health, and Natural Beauty - High Absorption Formula (FPHK1312)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Sugar Free Probiotics Gummies | Raspberry & Watermelon Flavored | 2.5 Billion CFUs | 60 Pieces | Supports Digestive Health | Contains Over 2.5 Billion CFUs of Good Bacteria (FPHK1128)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Fish Oil | 900 mg EPA / 600 mg DHA | 180 Softgels | Triple Strength Omega-3 | Supports Heart & Brain Health | Helps Support Optimal Wellness (FPHK1218)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Kids' & Teens' Chewable Vitamin D3 + K2 20 mcg (800IU) + 50mcg - 60 Tablets (Pack of 1) - Bone & Immune Health Support - Sugar Free, Dye Free, Creme and Cocoa Flavor (FPHK1319)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z® Vitamin D3 + K2 | 2000 IU + 100 mcg | 90 Softgels | Bone & Immune Support | Supports Bone, Muscle & Immune Health (FPHK1226)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
  { sku: "HealthA2Z Bismuth Subsalicylate 262 mg, 30 Tablets (FP0529)", reason: "SKIPPED no_OI. The a2z-life.com PDP carousel was opened. HTML does not print a Drug Facts or Supplement Facts paragraph. Back-panel tiles that were present were read. No complete printed inactive line was pinned for this exact pack. Target, Walmart, iHerb, Vitacost, and Amazon were not used as a pin. An AI blurb is not OI. The BigCommerce upc field was not attached. NDC is not a UPC. OI not invented." },
];

export const BATCH96_SKIPPED_OUT: { sku: string; reason: string }[] = [
  { sku: "HealthA2Z Aspirina 81mg de baja resistencia, con revestimiento entérico, 300 comprimidos (FPA013S)", reason: "OUT. Spanish-language duplicate of the English HealthA2Z pack on the same NDC 69168-318-17. Not a second Search row." },
  { sku: "HealthA2Z® Children's Chewable Pain Relief | Acetaminophen 160mg | 150 Chewable Tablets | Grape Flavor Chewables | Aspirin & Ibuprofen Free (FPA158)", reason: "OUT. already on MAIN as healtha2z-childrens-apap-chew. NDC 69168-440-02. Not rewritten." },
  { sku: "HealthA2Z® Children's Chewable Pain Relief | Acetaminophen 160mg | 60 Chewable Tablets | Grape Flavor Chewables | Aspirin & Ibuprofen Free (FPA101)", reason: "OUT. already on MAIN as healtha2z-childrens-apap-chew. NDC 69168-440-60. Not rewritten." },
  { sku: "HealthA2Z aerosoles nasales de propionato de fluticasona, paquete de 2 120 aerosoles (FPA025S)", reason: "OUT. Spanish-language duplicate of the English HealthA2Z pack on the same NDC 69168-380-02. Not a second Search row." },
  { sku: "HealthA2Z® Orange Ibuprofen 200mg | 500 Coated Tablets | Pain Relief | Body Aches | Headache | Arthritis | Cramps | Back Pain | Fever Reducer | NSAID (FPA175)", reason: "OUT. already on MAIN as healtha2z-ibuprofen-200-382 (500-count orange coated). The current 466 SPL is a longer inactive list and is not a rewrite of batch54. NDC 69168-466-05. Not rewritten." },
  { sku: "HealthA2Z Ibuprofen Tablets 200mg, 24*30 Tablets (720 Tablets Total) (FP0785)", reason: "OUT. already on MAIN as healtha2z-ibuprofen-200-335. NDC 69168-335-30. Not rewritten." },
  { sku: "HealthA2Z 100% darkness Sleep Mask, a better sleep guaranteed (FPA082)", reason: "OUT. Sleep mask. Not an OTC drug, vitamin, or supplement." },
  { sku: "HealthA2Z Naproxen Sodium 220mg (NSAID) | 300 Count | Fast Pain Relief/Fever Reducer | (FPA021)", reason: "OUT. Already on MAIN as healtha2z-naproxen-220-300. Page barcode 369168394179 is that row. Not rewritten. URL https://a2z-life.com/healtha2z-naproxen-sodium-220mg-300count-nsaid/." },
  { sku: "HealthA2Z Pill Box, Easy to Open Pill Case 7 Day Medicine Organizer for OTC Medicine, Supplement (FPA000)", reason: "OUT. Pill organizer. Not an OTC drug, vitamin, or supplement." },
];

export const BATCH96_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH96_SKIPPED_NO_OI,
  ...BATCH96_SKIPPED_OUT,
];

export const BATCH96_REFUSED: { sku: string; reason: string }[] = [
  { sku: "HealthA2Z® Sleep Aid | Doxylamine Succinate 25mg | (200 Counts) (FPA122)", reason: "REFUSED exact panel string(s) `dibasic calcium phosphate dihydrate`, `microcrystallinecellulose`. Setid 3761182c-275b-40f3-a262-9ef5f5a80723. NDC 69168-439-98. NO Search row." },
  { sku: "HealthA2Z Aspirin 81mg Low Strength,300 Tablets, Enteric Coated Compare to Bayer Active Ingredients (FPA013)", reason: "REFUSED exact panel string(s) `anhydrous lactose`, `D&C Yellow 10`, `iron oxide ochre`, `starch`. Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-17. NO Search row." },
  { sku: "HealthA2Z Aspirin 81mg Low Strength, 24*40 Tablets (960 Tablets Total) (FP1083)", reason: "REFUSED exact panel string(s) `anhydrous lactose`, `D&C Yellow 10`, `iron oxide ochre`, `starch`. Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-50. NO Search row." },
  { sku: "HealthA2Z Aspirin 81mg NSAID, Compare to Bayer Active Ingredients, 36 Chewable Tablets, (1 Pack, 3 Packs & 6 Packs) (FPA035E)", reason: "REFUSED exact panel string(s) `dextrates`, `orange flavor`, `saccharin sodium`. Setid 92b8637b-03a9-461f-b2f6-6eddaa214953. NDC 69168-288-36. NO Search row." },
  { sku: "HealthA2Z Aspirin 81mg NSAID, 24*36 Chewable Tablets (864 Tablets Total) (FP0545)", reason: "REFUSED exact panel string(s) `dextrates`, `orange flavor`, `saccharin sodium`. Setid 92b8637b-03a9-461f-b2f6-6eddaa214953. NDC 69168-288-36. NO Search row." },
  { sku: "HealthA2Z Fexofenadine Hydrochloride 60mg | 200 Count Coated Caplets | 12-Hour Antihistamine for Allergy Relief (FPA086)", reason: "REFUSED exact panel string(s) `ironoxide yellow`, `polyethyleneglycol`. Setid 219606a8-9a3e-4c30-adb1-984f3f4e72c7. NDC 69168-437-98. NO Search row." },
  { sku: "HealthA2Z® Fexofenadine Hydrochloride 60mg | Antihistamine | Allergy Relief | 120 Count Caplets | Indoor/Outdoor Relief | 12 Hours (FPA099)", reason: "REFUSED exact panel string(s) `ironoxide yellow`, `polyethyleneglycol`. Setid 219606a8-9a3e-4c30-adb1-984f3f4e72c7. NDC 69168-437-06. NO Search row." },
  { sku: "HealthA2Z® Aspirin 81 mg | DYE Free | Low Strength | 200 Counts | Pain Relief | Reduces Minor Aches Muscle Pain & Cramps | Fever Reducer | Reduces Headache | (NSAID) (FPA154)", reason: "REFUSED exact panel string(s) `colloidal anhydrous silica`, `shellac wax`. Setid 26ad090d-7193-45c2-82eb-a2bc81955fe6. NDC 69168-457-98. NO Search row." },
  { sku: "HealthA2Z® Fexofenadine Hydrochloride 180mg | Antihistamine for Allergy Relief | 24-Hour Allergy Medicine | 3 Tablets Each in (Pack of 24) | 72 Caplets Total | Value Pack (FP1030)", reason: "REFUSED exact panel string(s) `anhydrous lactose`, `red iron oxide`, `yellow iron oxide`. Setid 61eebc8a-8d1e-48a2-afb1-eda9cb00ff97. NDC 69168-416-03. NO Search row." },
  { sku: "HealthA2Z Fexofenadine Hydrochloride 180mg, 30 Coated Caplets (FPA062)", reason: "REFUSED exact panel string(s) `anhydrous lactose`, `red iron oxide`, `yellow iron oxide`. Setid 61eebc8a-8d1e-48a2-afb1-eda9cb00ff97. NDC 69168-416-30. NO Search row." },
  { sku: "HealthA2Z Allergy Relief, 120 Count Coated Caplets (FPA056)", reason: "REFUSED exact panel string(s) `anhydrous lactose`, `red iron oxide`, `yellow iron oxide`. Setid 61eebc8a-8d1e-48a2-afb1-eda9cb00ff97. NDC 69168-416-06. NO Search row." },
  { sku: "HealthA2Z Aspirin 81mg Low Strength, 365 Tablets, Enteric Coated Compare to Bayer Active Ingredients (FPA069)", reason: "REFUSED exact panel string(s) `shellac wax`, `silica`. Setid d9abe780-7e58-43d8-848f-c6c8893aea2e. NDC 69168-430-99. NO Search row." },
  { sku: "HealthA2Z® Allergy Relief | Loratadine 10mg | Antihistamine | 500 Tablets | Relief from Itchy Throat, Sneezing, Runny Noses | 24-Hours Allergy Medicine (FPA188)", reason: "REFUSED exact panel string(s) `pregelantinized starch`. Setid f0db3a13-43e6-4243-9a3a-7808ddd005e1. NDC 69168-475-05. NO Search row." },
  { sku: "HealthA2Z® Allergy Relief | Loratadine 10mg | 150 Counts | 24-Hours Allergy Medicine (FPA117)", reason: "REFUSED exact panel string(s) `pregelantinized starch`. Setid f0db3a13-43e6-4243-9a3a-7808ddd005e1. NDC 69168-414-02. NO Search row." },
  { sku: "HealthA2Z® Allergy Relief | Loratadine 10mg | Antihistamine | Relief from Itchy Throat, Sneezing, Runny Noses |24-Hours Allergy Medicine (60 Tablets) (FPA087)", reason: "REFUSED exact panel string(s) `pregelantinized starch`. Setid f0db3a13-43e6-4243-9a3a-7808ddd005e1. NDC 69168-414-60. NO Search row." },
  { sku: "HealthA2Z Allergy Relief, 300 Tablets (FPA057)", reason: "REFUSED exact panel string(s) `pregelantinized starch`. Setid f0db3a13-43e6-4243-9a3a-7808ddd005e1. NDC 69168-414-17. NO Search row." },
  { sku: "HealthA2Z® Azelastine HCl Nasal Spray, 24-Hr Allergy, 2 Pack 240 Spray (FP1282)", reason: "REFUSED exact panel string(s) `edetate disodium dihydrate`, `sodium citrate (dihydrate)`. Setid 3e2fdb0d-c2f5-41ab-b1cd-4fae80648112. NDC 69168-478-02. NO Search row." },
  { sku: "HealthA2Z® Ibuprofen 200mg | Pain Relief | (250 Count) (FPA116)", reason: "REFUSED exact panel string(s) `polyethyleneglycol`. Setid f3f12b86-89dc-427e-a26f-728be6f73e7b. NDC 69168-381-03. NO Search row." },
  { sku: "HealthA2Z® Ibuprofen 200mg | 100 Counts | (FPA092)", reason: "REFUSED exact panel string(s) `polyethyleneglycol`. Setid f3f12b86-89dc-427e-a26f-728be6f73e7b. NDC 69168-381-32. NO Search row." },
  { sku: "HealthA2Z Ibuprofen Tablets | 200mg | 500counts | (FPA081/FP1298/FP1053)", reason: "REFUSED exact panel string(s) `polyethyleneglycol`. Setid f3f12b86-89dc-427e-a26f-728be6f73e7b. NDC 69168-381-05. NO Search row." },
  { sku: "HealthA2Z Fexofenadine Hydrochloride 180mg, Antihistamine for Allergy Relief, 24-Hour Antihistamine for Allergy Relief (90 Counts) (FPA150)", reason: "REFUSED exact panel string(s) `light liquid paraffin`, `red iron oxide`, `yellow iron oxide`. Setid 89ece1b5-7604-4dce-a8a6-df5b948e3cff. NDC 69168-450-82. NO Search row." },
  { sku: "HealthA2Z® Allergy Relief | Fexofenadine Hydrochloride 180mg | 180 Caplets | Antihistamine (FPA151)", reason: "REFUSED exact panel string(s) `light liquid paraffin`, `red iron oxide`, `yellow iron oxide`. Setid 89ece1b5-7604-4dce-a8a6-df5b948e3cff. NDC 69168-450-80. NO Search row." },
  { sku: "HealthA2Z® Woman's Gentle Laxative | Bisacodyl Stimulant Laxative 5mg | (150 Tablets) (FPA129)", reason: "REFUSED exact panel string(s) `colloidal anhydrous silica`, `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`, `polyvinyl acetate pthalate`, `shellac glaze`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-02. NO Search row." },
  { sku: "HealthA2Z Woman's Gentle Laxative, Bisacodyl Stimulant Laxative 5mg, 1 Pack of 25 Tablets (1 Pack, 3 Packs& 6 Packs) (FP0886A)", reason: "REFUSED exact panel string(s) `colloidal anhydrous silica`, `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`, `polyvinyl acetate pthalate`, `shellac glaze`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-92. NO Search row." },
  { sku: "HealthA2Z® Woman’s Gentle Laxative | Bisacodyl 5mg Stimulant Laxative | Gentle, Reliable Constipation Relief | Overnight Support | 24 Packs of 25 Tablets (600 Tablets Total) | Value Pack (FP0886)", reason: "REFUSED exact panel string(s) `colloidal anhydrous silica`, `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`, `polyvinyl acetate pthalate`, `shellac glaze`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-92. NO Search row." },
  { sku: "HealthA2Z® Woman's Gentle Laxative | Bisacodyl Stimulant Laxative 5mg | 250 Tablets | Constipation Relief | Gentle and Reliable | Overnight Relief (FPA167)", reason: "REFUSED exact panel string(s) `colloidal anhydrous silica`, `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`, `polyvinyl acetate pthalate`, `shellac glaze`. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-03. NO Search row." },
  { sku: "HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief | 100 Chewable Tablets (FPA102)", reason: "REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-32. NO Search row." },
  { sku: "HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief | (200 Count) (FP1345)", reason: "REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-98. NO Search row." },
  { sku: "HealthA2Z Bismuth, Bismuth Subsalicylate 262mg, 24*12 Chewable Tablets (288 Tablets Total) (FP0528)", reason: "REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-69. NO Search row." },
  { sku: "HealthA2Z® Tussin DM Sugar Free | Dextromethorphan HBr 20mg, Guaifenesin 200mg | Cough Suppressant & Expectorant | for Adults with High Blood Pressure & Diabetes | 8 FL Oz, Raspberry Flavor (FPA184)", reason: "REFUSED exact panel string(s) `flavors`. Setid 7a2f8d48-3123-4c37-b238-bd7cc4242bb7. NDC 69168-477-66. NO Search row." },
  { sku: "HealthA2Z® Children's Allergy Relief | DYE Free | Diphenhyrdramine 12.5 mg | 5ml Oral Solution | 8Fl Oz (237 mL) | Antihistamine | Clear Bubble Gum Flavored | Alcohol and Sugar Free (FPA164)", reason: "REFUSED exact panel string(s) `sodium citrate dihydrate`. Setid cb6df361-b8e5-4e2f-945f-c20159d76c4f. NDC 69168-471-59. NO Search row." },
  { sku: "HealthA2Z Calcium Antacid 500mg, Regular Strength, 150 Tablets (FP0535)", reason: "REFUSED exact panel string(s) `assorted flavors`. Setid 551d6135-2650-4c27-a20d-d56a9aba7b71. NDC 69168-219-02. NO Search row." },
  { sku: "HealthA2Z® Acid Reducer | 225 Tablets | Famotidine 20mg | Maximum Strength | Relief from Heart Burn Due to Acid Indigestion (FPA125)", reason: "REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. Setid adc2721d-2ca7-4a47-bae1-be298fa1c155. NDC 69168-443-52. NO Search row." },
  { sku: "HealthA2Z® Acid Reducer | Famotidine 20mg | 365 Count | Maximum Strength | Relief from Heart Burn Due to Acid Indigestion (FPA161)", reason: "REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. Setid adc2721d-2ca7-4a47-bae1-be298fa1c155. NDC 69168-443-99. NO Search row." },
  { sku: "HealthA2Z® Acid Reducer | 100 Tablets | Famotidine 20mg | Maximum Strength | Relief from Heart Burn Due to Acid Indigestion (FPA124)", reason: "REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. Setid adc2721d-2ca7-4a47-bae1-be298fa1c155. NDC 69168-443-32. NO Search row." },
  { sku: "HealthA2Z Extra Strength Pain Relief PM, 365 Caplets (FPA004)", reason: "REFUSED exact panel string(s) `polyethylene glylcol`. Setid 91ba1618-1b2e-4281-a5e1-ba7acbae8346. NDC 69168-267-99. NO Search row." },
  { sku: "HealthA2Z Extra Strength Pain Relief PM, 150 Caplets (FPA061)", reason: "REFUSED exact panel string(s) `polyethylene glylcol`. Setid 91ba1618-1b2e-4281-a5e1-ba7acbae8346. NDC 69168-267-02. NO Search row." },
  { sku: "HealthA2Z Anti-Diarrheal Loperamide HCI 2mg 12 Caplets (1 Pack, 3 Packs & 6 Packs) (FP0697)", reason: "REFUSED exact panel string(s) `dicalcium phosphate dihydrate`, `FD&C blue #1 brilliant blue lake`. Setid aca3742c-2a82-4e91-8aaf-2fce08487e56. NDC 69168-248-86. NO Search row." },
  { sku: "HealthA2Z Stool Softener, Docusate Sodium 100mg, 100 capsules (FPA059)", reason: "REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`, `sorbitol special`. Setid 30c9ff75-cee4-4632-86fd-acfdf5ee85af. NDC 69168-420-01. NO Search row." },
  { sku: "HealthA2Z Motion Sickness Relief 50mg, 24*12 Tablets (288 Tablets Total) (FP0944)", reason: "REFUSED exact panel string(s) `dibasic calcium phosphate dihydrate`. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row." },
  { sku: "HealthA2Z Motion Sickness Relief 50mg (1 Pack, 3 Packs & 6 Packs) (FPA027E)", reason: "REFUSED exact panel string(s) `dibasic calcium phosphate dihydrate`. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row." },
  { sku: "HealthA2Z® Laxative Bisacodyl 5mg | 100 Counts | (FPA094)", reason: "REFUSED exact panel string(s) `colloidal anhydrous silica`, `lactose anhydrous`, `shellac glaze`. Setid 51f1c6c0-770c-4426-820b-bc1f42e143fd. NDC 69168-404-32. NO Search row." },
  { sku: "HealthA2Z® Nighttime Sleep Aid 250 Softgels | (FPA103)", reason: "REFUSED exact panel string(s) `sorbitol special`. Setid 9746911a-36bc-45eb-adfd-e96439d7a865. NDC 69168-431-03. NO Search row." },
  { sku: "HealthA2Z Nighttime Sleep Aid 96 Softgels (FPA072)", reason: "REFUSED exact panel string(s) `sorbitol special`. Setid 9746911a-36bc-45eb-adfd-e96439d7a865. NDC 69168-431-96. NO Search row." },
  { sku: "HealthA2Z® Pain Relief Patch, Lidocaine 4%, Topical Anesthetic, Flexible Adhesive Patch, Unscented, Single Use, 30 Patches (FPA181)", reason: "REFUSED exact panel string(s) `dihydroxy aluminium aminoacetate`, `methyl paraben`, `propyl paraben`, `sodium carboxy methyl cellulose`. Setid 7f715144-f0c8-48fc-a22d-eac85759c66a. NDC 69168-481-07. NO Search row." },
  { sku: "HealthA2Z® Sleep Aid | Diphenhydramine 50mg | 200 Softgels | Supports Deeper | Restful Sleeping (FPA172)", reason: "REFUSED exact panel string(s) `white ink`. Setid ec57db48-0f3a-4b12-8633-b45a4366c269. NDC 69168-410-98. NO Search row." },
  { sku: "HealthA2Z® Daytime and Nighttime Combo Pack | Cold & Flu Medicine | Powerful Multi-Symptom Daytime and Nighttime Relief | 36 Count | 24 Daytime | 12 Nighttime Softgels (FPA106)", reason: "REFUSED. DailyMed setid fa7ed5db- prints two inactive lists on this one pack (daytime and nighttime). Not one pinned list. Blocking strings include `propyleneglycol`, `DAYTIME ONLY FD&C red #40`, and `NIGHTTIME ONLY D&C yellow #10`. NO Search row." },
  { sku: "HealthA2Z® Cold Roll-On | Pain Relieving Gel | Menthol 4% External Analgesic | 2.5 OZ | 74 mL | Temporary Relieves Minor Aches and Pains of Muscle (FPA183)", reason: "REFUSED exact panel string(s) `blue 1`, `yellow 5`. Setid 36463acb-7c28-416f-a45f-a93f0be5692b. NDC 69168-483-67. NO Search row." },
  { sku: "HealthA2Z Sleep Aid, Diphenhydramine HCl 50 mg, 250 softgels (FPA028/FP1082)", reason: "REFUSED exact panel string `white ink`. Brand PDP drug-facts tile (SleepAid_50mg_250_Softgels_-_Drug_Facts) inactive ingredients: FD&C blue #1, gelatin, glycerin, polyethylene glycol, purified water, sorbitol sorbitan solution, white ink. `white ink` is not the locked `white edible ink` token. The page barcode 369168394179 is the naproxen carton and was not attached. NO Search row." },
  { sku: "HealthA2Z Daytime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-356-23 (FP0999)", reason: "REFUSED exact panel string(s) `gelatin USP`, `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `propylene glycol USP`, `purified water USP`, `sorbitol sorbitan solution USP`. Brand PDP drug-facts tile on the 24×8 daytime softgels. The USP suffix is not the locked bare token. Actives on that tile: acetaminophen 325 mg, dextromethorphan HBr 10 mg, phenylephrine HCl 5 mg. NO Search row." },
  { sku: "HealthA2Z Daytime Cold & Flu Relief, 8 softgels (1, 3, and 6 packs)", reason: "REFUSED exact panel string(s) `gelatin USP`, `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `propylene glycol USP`, `purified water USP`, `sorbitol sorbitan solution USP`. Same drug-facts tile as the 24×8 daytime value pack. The option page is not one pinned count with a locked inactive line. NO Search row." },
  { sku: "HealthA2Z Nighttime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-357-29 (FP1003)", reason: "REFUSED exact panel string(s) `gelatin USP`, `glycerin USP`, `polyethylene glycol-400 USP`, `povidone USP`, `propylene glycol USP`, `purified water USP`, `sorbitol 70% solution USP`, `sorbitol sorbitan solution USP`. Brand PDP drug-facts tile. Actives on that tile: acetaminophen 325 mg, dextromethorphan HBr 15 mg, doxylamine succinate 6.25 mg. NO Search row." },
];

const _ROWS = BATCH96_KYR6_AMAZON_3P_HEALTHA2Z;
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
if (_ROWS.length !== 59) throw new Error('batch96 row tally drift');
if (_grades.clean !== 11 || _grades.caution !== 20 || _grades.avoid !== 28) {
  throw new Error('batch96 Search grade drift');
}
if (_new !== 25 || _reuse !== 34) throw new Error('batch96 NEW/REUSE drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 25) {
  throw new Error('batch96 canonical formula drift');
}
if (BATCH96_SKIPPED_NO_OI.length !== 93) throw new Error('batch96 no_OI drift');
if (BATCH96_SKIPPED_OUT.length !== 9) throw new Error('batch96 OUT drift');
if (BATCH96_SKIPPED.length !== 102) throw new Error('batch96 SKIPPED drift');
if (BATCH96_REFUSED.length !== 52) throw new Error('batch96 REFUSED drift');
if (BATCH96_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch96 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch96 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch96 recordStatus must stay unverified');
}
if (_ROWS.some((r) => r.barcode)) throw new Error('batch96 must not invent a UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b96-'))) {
  throw new Error('batch96 ids must use healtha2z-b96-');
}
if (_ROWS.some((r) => !r.formulaId?.startsWith('healtha2z-b96-'))) {
  throw new Error('batch96 formula ids must use healtha2z-b96-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch96 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch96 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch96 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch96 Clean row has a non-cleared inactive');
}
const _peg = _ROWS.filter((r) => r.formulaId === 'healtha2z-b96-peg-3350');
if (_peg.length !== 2 || _peg.some((r) => (r.inactiveIngredients?.length ?? 0) !== 0)) {
  throw new Error('batch96 PEG 3350 must keep the printed None inactive list');
}
if (_ROWS.some((r) => r.formulaId !== 'healtha2z-b96-peg-3350' && !(r.inactiveIngredients?.length))) {
  throw new Error('batch96 missing a printed inactive');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH96_SKIPPED.map((s) => s.sku),
  ...BATCH96_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch96 excluded brand leaked');
}
