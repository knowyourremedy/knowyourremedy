// DRAFT / not verified / batch 55 PR #102 refused-unlock WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only. Do NOT invent a Topical aisle.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes except
// KYR5-b catch-up allowlist. Pack
// sizes of the same name+form+inactives share formulaId. Same
// OI+actives share formulaId. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Search wiring only.
// Not wired into Clean Picks UI. No live Clean Picks file is
// edited. No photos. Letter tiles only on new ids. No fake Clean
// alts. No methodology rewrite. No Sprouts. Do NOT touch
// painFeverPicks.ts. Do NOT rewrite batch 54 or earlier
// Amazon / Thrive / pain-rub rows already on main.
//
// GATE: write a PR #102 refused SKU only when the refused token
// is now exact-§5 on MAIN and every current OI token matches an
// exact Additive / “also appears as” / locked exact-INCI line.
//
// TALLY (unverified drafts in THIS file): 6 rows — Clean 0 /
// Caution 2 / Avoid 4.
// Independently Clean turmeric analogs already on main:
// oregons-wild-harvest-turmeric / organic-india-turmeric-formula /
// sports-research-turmeric-curcumin / bioschwartz-turmeric-curcumin-1500 /
// nutricost-turmeric-curcumin-2300. No Clean conventional NSAID /
// dual-action combo invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Tylenol / Advil / Aleve / Motrin / Bayer / Excedrin / Goody’s /
// Icy Hot family / Voltaren / Biofreeze family / Thrive set /
// Boiron / Genexa / MegaFood / Hyland’s / MediNatura /
// Nature’s Way / Basic Care + Basics already on main (including
// amazon-basic-care-ibuprofen-tio2 / dyed-talc / liqui-gels /
// dual-action) / Asutra / batches 41–54.
//
// WRITTEN from the PR #102 refused list (current DailyMed / OI):
// - Amazon Basic Care Ibuprofen leftover NDC 72288-604 (3329f487)
//   + pouch twin 72288-311 (9bbbedb3) — iron oxide yellow is now
//   the locked Caution alias with ferric oxide yellow. Avoid
//   (TiO2 High). Own formulaId — do not reuse
//   amazon-basic-care-ibuprofen-tio2 (that already-on-main SPL
//   prints red iron oxide / yellow iron oxide and has no PS80).
// - Amazon Basics Ibuprofen leftover NDC 72288-080 (b5a47efe) —
//   same Drug Facts OI + actives as 604 / 311 → shares formulaId.
//   Separate Search row (Basics brand / pouches).
// - Qunol Extra Strength 1500 oleoresin + gellan carton
//   (HelloPharmacist snapshot) — oleoresin turmeric is now the
//   locked exact Caution token (distinct from Cleared
//   turmeric-as-color). Caution (oleoresin + SiO2 0-pt cap). Own
//   formulaId — do not reuse qunol-extra-strength-turmeric-1500
//   (current official OI does not print oleoresin / gellan).
// - A+Health Dual Action DailyMed 04ccc4b2 — glyceryl dibehenate
//   is now the locked exact Cleared token. Full current OI
//   exact-covered. Avoid (TiO2 High). Own formulaId.
// - A+Health Dual Action DailyMed 4834aa7f — same leftover unlock;
//   no ferric oxides on this SPL. Different OI → own formulaId.
//   Avoid (TiO2 High).
// - Qunol Zero Sugar Turmeric Gummies — isomalt is now the locked
//   Limited sugar-alcohol token and was the only leftover.
//   Fractionated coconut oil is coconut-named and is NOT the
//   gummy seed-oil High rule (no unpinned / High seed oil).
//   Caution (Limited-only stack).
//
// REFUSED (still missing an exact §5 row — quote the token):
// - Amazon Elements Turmeric Complex / Turmeric Root Extract →
//   "Vegetable Capsule" (do not invent a grade)
// - HealthA2Z Children’s APAP chew / Naproxen 300-ct /
//   TIME-Cap IBU → "setid/OI still not pinned to one Amazon carton"
// - Stopain / Blue-Emu / Sumifun / Teemofe / store movers →
//   "no OI"
// - Penetrex / JointFlex / Australian Dream / Mentholatum /
//   Flexall / Topricin → "botanical-blend cream not exact-§5"

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;
const PAIN_FEVER = 'Pain & Fever';
const UNVERIFIED_NOTE = 'draft, not verified';

const AMAZON = ['Amazon'] as const;

const COCONUT_GUMMY_TAP =
  'Seed/industrial oils are flagged in gummies (soybean, canola, vegetable oil, sunflower). Coconut oil / fractionated coconut oil alone in a gummy is NOT that High rule. Named coconut is the glaze / anti-stick, not an unpinned seed oil.';

const OLEORESIN_TAP =
  'Oleoresin turmeric is the locked exact Caution token. Distinct from Cleared turmeric / curcumin as a color only. Do not Clear this carton on the color row.';

const METH = {
  carnaubaT133u: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate; ethylene-oxide / 1,4-dioxane)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  xylitol:
    'Methodology §5 Limited-risk (xylitol / erythritol, oral/ingested — GI effects at volume; oral only)',
  isomalt:
    'Methodology §5 Limited-risk (isomalt — exact token; sugar-alcohol neighborhood; locked Sept 15, 2026)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; glycemic; minor)',
  polydextrose:
    'Methodology §5 Limited-risk (polydextrose — maltodextrin-like; locked Sept 14, 2026 housekeeping)',
  ironOxideYellow:
    'Methodology §5 Caution (iron oxide yellow / ferric oxide yellow — exact alias; same Caution; both strings written; distinct from iron oxide red / ferric oxide red; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ironOxideRed:
    'Methodology §5 Caution (iron oxide red — exact token; distinct from ferric oxide red and from ferric ferrocyanide; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ferricYellow:
    'Methodology §5 Caution (ferric oxide yellow — exact INCI; also written as iron oxide yellow; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ferricRed:
    'Methodology §5 Caution (ferric oxide red — exact INCI; distinct from ferric ferrocyanide; standalone Caution, not Avoid; locked Sept 15, 2026)',
  oleoresin: `Methodology §5 Caution (oleoresin turmeric — exact token; distinct from Cleared turmeric/curcumin as a color only; standalone Caution, not Avoid; locked Sept 15, 2026). ${OLEORESIN_TAP}`,
  sls: 'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid). Printed DF spelling sodium lauryl sulphate is the same locked SLS token (British spelling; same UNII).',
  glycerylDibehenate:
    'Methodology §5 Cleared (glyceryl dibehenate — exact words; stearate / dibehenin neighborhood; dibehenin already Cleared ≠ this string; locked Sept 15, 2026)',
  gammaCd:
    'Methodology §5 Cleared (gamma-cyclodextrin — exact token; locked Sept 15, 2026 leftover)',
  coconutGummy: `Methodology §5 Cleared (coconut oil / fractionated coconut oil alone in gummies/chews — NOT the gummy seed-oil High rule; locked Sept 14, 2026 housekeeping). ${COCONUT_GUMMY_TAP}`,
  monkFruit:
    'Methodology §5 Cleared (monk fruit / mogrosides, high-purity extract — locked v1.6; no crude/whole-fruit caveat typically used)',
  gellan:
    'Methodology §5 Cleared (gellan gum — xanthan/guar/pectin family; locked v1.6; gellan named Sept 14, 2026)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  stearate:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate — stearate-family lubricant)',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  pectin:
    'Methodology §5 Cleared (xanthan gum, guar gum, gum arabic / acacia, pectin, gellan gum — standard food gums)',
  citrate:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate / citrate salts as fillers/buffers)',
  citric: 'Methodology §5 Cleared (citric acid)',
  cleared: 'Methodology §5 Cleared',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(opts: RatingRecord): RatingRecord {
  return {
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

const SET = {
  bc604: '3329f487-675d-440c-b7c5-d17a2b024275',
  bc311: '9bbbedb3-e0b2-4645-8105-98800096cfed',
  basics080: 'b5a47efe-222f-4cbd-b649-caafd16a0829',
  aplusOxides: '04ccc4b2-0cfd-3012-e063-6394a90afa79',
  aplusPlain: '4834aa7f-cb0c-ec58-e063-6394a90ae2fc',
} as const;

const ID = {
  bcIbu: 'amazon-basic-care-ibuprofen-iron-oxide-yellow',
  basicsIbu: 'amazon-basics-ibuprofen-iron-oxide-yellow',
  qunolOleo: 'qunol-extra-strength-turmeric-1500-oleoresin',
  aplusOxides: 'aplus-health-dual-action-oxides',
  aplusPlain: 'aplus-health-dual-action',
  qunolGummies: 'qunol-zero-sugar-turmeric-gummies',
} as const;

const BATCH55_CATCHUP_BARCODES: Record<string, string> = {
  // KYR5-b in-store 1s/2s — Target / Vitacost 90-ct + 120-ct Zero Sugar
  // Turmeric Gummies (isomalt + coconut; do not steal oleoresin 1500).
  [ID.qunolGummies]: '850052593193 850052593209',
  // KYR5-b set-id-only chunk 18 — Amazon PDP 216-ct UPC-A for NDC 69452-394-64
  // (setid 04ccc4b2 ferric-oxide Dual Action). Do not steal 369452447222
  // (NDC 69452-447-22 / setid 1f2f8fcf) onto this row or the 469 plain twin.
  [ID.aplusOxides]: '369452394649',
  // KYR5-c barcode-tile chunk 3 — brown 200-ct iron-oxide coat (not dyed-talc
  // 370030146048 and not TiO2-only 195515004138).
  [ID.bcIbu]: '370030114177',
  // KYR5-d online leftover — Amazon Basics 100-ct B087D3H3WD Product
  // details field "UPC" 195515120173 842379190759 + "Global Trade
  // Identification Number" 00842379190759. Listing copy is 50
  // two-tablet pouches (72288-080). Same iron-oxide-yellow OI as
  // Basic Care 370030114177 — do not overwrite that 200-ct code.
  [ID.basicsIbu]: '195515120173 842379190759',
};

const IBU_FORMULA = ID.bcIbu;

const CITE = {
  qunolOleo:
    'HelloPharmacist Extra Strength Turmeric Curcumin Complex 1500 mg by Qunol (https://hellopharmacist.com/drug-supplement-interactions/supplements/extra-strength-turmeric-curcumin-complex-1500-mg-by-qunol-66278) other-ingredients: Gamma-Cyclodextrin, Vegetable Hypromellose, Oleoresin Turmeric, Magnesium Stearate, Gellan Gum, Silicon Dioxide. This is the leftover oleoresin + gellan carton — not the current official Swanson / qunol.com Extra Strength 1500 / 1000 OI that omits oleoresin.',
  qunolGummies:
    'qunol.com Sugar-Free Turmeric Gummies 500 mg (https://www.qunol.com/products/turmeric-gummies-sugar-free-500mg) other-ingredients: Maltitol Syrup, Isomalt, Maltodextrin, Xylitol, Pectin; less than 2% of: Carnauba Wax, Citric Acid, Fractionated Coconut Oil, Monk Fruit Extract, Natural Flavors, Sodium Citrate. Labeled active: Bioenhanced Turmeric Complex 500 mg (20% curcuminoids) — gamma-cyclodextrin (for absorption) + turmeric extract (Curcuma longa) (rhizome).',
} as const;

const GENEXA_ES = 'genexa-acetaminophen-es';
const EQUATE_IBU = 'equate-ibuprofen-dye-free';
const OWH = 'oregons-wild-harvest-turmeric';
const ORGANIC_INDIA = 'organic-india-turmeric-formula';
const SPORTS_RESEARCH = 'sports-research-turmeric-curcumin';

const IBU_ADULT_ALTS: CleanAlternative[] = [
  alt(
    EQUATE_IBU,
    'Best Caution adult ibuprofen analog already on main (dye-free LNK 44-438). No independently Clean adult ibuprofen or naproxen on this shelf. Form labeled, not a hard filter (§6).',
  ),
  alt(
    GENEXA_ES,
    'Independently Clean adult acetaminophen analog if a non-IBU / non-naproxen swap is acceptable. Form: caplet — labeled, not a hard filter (§6).',
  ),
];

const DUAL_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'No independently Clean dual-action combo. Closest Clean analog is Genexa Extra Strength acetaminophen for the APAP half — not a 250/125 replacement. Form labeled, not a hard filter (§6).',
  ),
  alt(
    EQUATE_IBU,
    'Best Caution ibuprofen analog for the IBU half. Not a 250/125 replacement.',
  ),
];

const TURMERIC_ALTS: CleanAlternative[] = [
  alt(
    OWH,
    'Independently Clean Oregon’s Wild Harvest Turmeric already on main (pullulan capsule only). Form: capsule — labeled, not a hard filter (§6). Same turmeric / curcumin shelf.',
  ),
  alt(
    ORGANIC_INDIA,
    'Independently Clean Organic India Turmeric Formula already on main (organic pullulan only). Form: capsule.',
  ),
  alt(
    SPORTS_RESEARCH,
    'Independently Clean Sports Research Turmeric Curcumin already on main (named coconut-oil softgel fill Cleared; ≠ gummy High). Form: softgel vs capsule / gummy — labeled, not a hard filter (§6).',
  ),
];

export const BATCH55_REFUSED: { sku: string; token: string }[] = [
  {
    sku: 'Amazon Elements Turmeric Complex / Turmeric Root Extract',
    token: 'Vegetable Capsule',
  },
  {
    sku: 'HealthA2Z Children’s APAP chew / Naproxen 300-ct / TIME-Cap IBU',
    token: 'setid/OI still not pinned to one Amazon carton',
  },
  {
    sku: 'Stopain / Blue-Emu / Sumifun / Teemofe / store movers',
    token: 'no OI',
  },
  {
    sku: 'Penetrex / JointFlex / Australian Dream / Mentholatum / Flexall / Topricin',
    token: 'botanical-blend cream not exact-§5',
  },
];

const IBU_INACTIVES = (setid: string): IngredientFlag[] => [
  flag('Titanium dioxide', 'high', dailymed(setid, METH.tio2)),
  flag('Polyethylene glycol', 'moderate', dailymed(setid, METH.peg)),
  flag('Polysorbate 80', 'moderate', dailymed(setid, METH.ps80)),
  flag('Iron oxide yellow', 'cleared', dailymed(setid, METH.ironOxideYellow)),
  flag('Iron oxide red', 'cleared', dailymed(setid, METH.ironOxideRed)),
  flag('Colloidal silicon dioxide', 'cleared', dailymed(setid, METH.sio2)),
  cleared(setid, 'Corn starch'),
  cleared(setid, 'Croscarmellose sodium'),
  cleared(setid, 'Hypromellose'),
  cleared(setid, 'Microcrystalline cellulose'),
  cleared(setid, 'Stearic acid'),
];

export const BATCH55_PF_REFUSED_UNLOCK: RatingRecord[] = [
  row({
    id: ID.bcIbu,
    productName: 'Amazon Basic Care Ibuprofen 200 mg (iron oxide yellow, 200-ct)',
    brand: 'Amazon Basic Care',
    category: PAIN_FEVER,
    barcode: BATCH55_CATCHUP_BARCODES[ID.bcIbu],
    formulaId: IBU_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: IBU_INACTIVES(SET.bc604),
    verdict: 'avoid',

    retailers: [...AMAZON],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.bc604} (Amazon Basic Care IBU NDC 72288-604); pouch twin ${SET.bc311} (NDC 72288-311) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.basicsIbu,
    productName: 'Amazon Basics Ibuprofen 200 mg (iron oxide yellow)',
    brand: 'Amazon Basics',
    category: PAIN_FEVER,
    barcode: BATCH55_CATCHUP_BARCODES[ID.basicsIbu],
    formulaId: IBU_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: IBU_INACTIVES(SET.basics080),
    verdict: 'avoid',

    retailers: [...AMAZON],
    cleanAlternatives: IBU_ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.basics080} (Amazon Basics IBU NDC 72288-080); shares formulaId ${IBU_FORMULA} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.qunolOleo,
    productName: 'Qunol Extra Strength Turmeric Curcumin Complex 1500 mg (oleoresin carton)',
    brand: 'Qunol',
    category: PAIN_FEVER,
    formulaId: ID.qunolOleo,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Bioenhanced turmeric complex (20% curcuminoids)',
        strength: '1500mg',
      },
    ],
    inactiveIngredients: [
      flag(
        'Oleoresin turmeric',
        'cleared',
        labelCite(CITE.qunolOleo, METH.oleoresin),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(CITE.qunolOleo, METH.sio2),
      ),
      flag(
        'Gamma-cyclodextrin',
        'cleared',
        labelCite(CITE.qunolOleo, METH.gammaCd),
      ),
      flag(
        'Vegetable hypromellose',
        'cleared',
        labelCite(CITE.qunolOleo, METH.hpmc),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(CITE.qunolOleo, METH.stearate),
      ),
      flag('Gellan gum', 'cleared', labelCite(CITE.qunolOleo, METH.gellan)),
    ],
    verdict: 'caution',

    retailers: [...AMAZON, 'Qunol'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.qunolOleo} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
  row({
    id: ID.aplusOxides,
    productName: 'A+Health Dual Action (ferric oxides)',
    brand: 'A+Health',
    category: PAIN_FEVER,
    barcode: BATCH55_CATCHUP_BARCODES[ID.aplusOxides],
    formulaId: ID.aplusOxides,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.aplusOxides, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.aplusOxides, METH.peg)),
      flag('Polydextrose', 'limited', dailymed(SET.aplusOxides, METH.polydextrose)),
      flag(
        'Ferric oxide yellow',
        'cleared',
        dailymed(SET.aplusOxides, METH.ferricYellow),
      ),
      flag(
        'Ferric oxide red',
        'cleared',
        dailymed(SET.aplusOxides, METH.ferricRed),
      ),
      flag(
        'Sodium lauryl sulphate',
        'cleared',
        dailymed(SET.aplusOxides, METH.sls),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.aplusOxides, METH.sio2),
      ),
      flag(
        'Glyceryl dibehenate',
        'cleared',
        dailymed(SET.aplusOxides, METH.glycerylDibehenate),
      ),
      flag('Carnauba wax', 'cleared', dailymed(SET.aplusOxides, METH.carnaubaT133u)),
      cleared(SET.aplusOxides, 'Croscarmellose sodium'),
      cleared(SET.aplusOxides, 'Crospovidone'),
      cleared(SET.aplusOxides, 'Hypromellose'),
      cleared(SET.aplusOxides, 'Microcrystalline cellulose'),
      cleared(SET.aplusOxides, 'Povidone'),
      cleared(SET.aplusOxides, 'Pregelatinized starch'),
      cleared(SET.aplusOxides, 'Stearic acid'),
    ],
    verdict: 'avoid',

    retailers: [...AMAZON],
    cleanAlternatives: DUAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.aplusOxides} (A+Health Dual Action NDC 69452-394) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.aplusPlain,
    productName: 'A+Health Dual Action',
    brand: 'A+Health',
    category: PAIN_FEVER,
    formulaId: ID.aplusPlain,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.aplusPlain, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.aplusPlain, METH.peg)),
      flag('Polydextrose', 'limited', dailymed(SET.aplusPlain, METH.polydextrose)),
      flag(
        'Sodium lauryl sulphate',
        'cleared',
        dailymed(SET.aplusPlain, METH.sls),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.aplusPlain, METH.sio2),
      ),
      flag(
        'Glyceryl dibehenate',
        'cleared',
        dailymed(SET.aplusPlain, METH.glycerylDibehenate),
      ),
      flag('Carnauba wax', 'cleared', dailymed(SET.aplusPlain, METH.carnaubaT133u)),
      cleared(SET.aplusPlain, 'Croscarmellose sodium'),
      cleared(SET.aplusPlain, 'Crospovidone'),
      cleared(SET.aplusPlain, 'Hypromellose'),
      cleared(SET.aplusPlain, 'Microcrystalline cellulose'),
      cleared(SET.aplusPlain, 'Povidone'),
      cleared(SET.aplusPlain, 'Pregelatinized starch'),
      cleared(SET.aplusPlain, 'Stearic acid'),
    ],
    verdict: 'avoid',

    retailers: [...AMAZON],
    cleanAlternatives: DUAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.aplusPlain} (A+Health Dual Action NDC 69452-469) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.qunolGummies,
    productName: 'Qunol Zero Sugar Turmeric Gummies',
    brand: 'Qunol',
    category: PAIN_FEVER,
    barcode: '850052593193 850052593209',
    formulaId: ID.qunolGummies,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Bioenhanced turmeric complex (20% curcuminoids)',
        strength: '500mg',
      },
    ],
    inactiveIngredients: [
      flag('Isomalt', 'limited', labelCite(CITE.qunolGummies, METH.isomalt)),
      flag(
        'Maltitol syrup',
        'limited',
        labelCite(CITE.qunolGummies, METH.maltitol),
      ),
      flag(
        'Maltodextrin',
        'limited',
        labelCite(CITE.qunolGummies, METH.maltodextrin),
      ),
      flag('Xylitol', 'limited', labelCite(CITE.qunolGummies, METH.xylitol)),
      flag(
        'Natural flavors',
        'limited',
        labelCite(CITE.qunolGummies, METH.flavors),
      ),
      flag(
        'Fractionated coconut oil',
        'cleared',
        labelCite(CITE.qunolGummies, METH.coconutGummy),
      ),
      flag(
        'Monk fruit extract',
        'cleared',
        labelCite(CITE.qunolGummies, METH.monkFruit),
      ),
      flag('Pectin', 'cleared', labelCite(CITE.qunolGummies, METH.pectin)),
      flag(
        'Carnauba wax',
        'cleared',
        labelCite(CITE.qunolGummies, METH.carnauba),
      ),
      flag('Citric acid', 'cleared', labelCite(CITE.qunolGummies, METH.citric)),
      flag(
        'Sodium citrate',
        'cleared',
        labelCite(CITE.qunolGummies, METH.citrate),
      ),
    ],
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Isomalt, Maltitol syrup, Maltodextrin, Xylitol, Natural flavors.',

    retailers: [...AMAZON, 'Qunol', 'Target'],
    cleanAlternatives: TURMERIC_ALTS,
    sourcesGeneral: [`${CITE.qunolGummies} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  }),
];

const BY_ID = Object.fromEntries(
  BATCH55_PF_REFUSED_UNLOCK.map((record) => [record.id, record]),
);

if (BATCH55_PF_REFUSED_UNLOCK.length !== 6) {
  throw new Error('batch 55 must write exactly 6 Search rows');
}
if (BATCH55_PF_REFUSED_UNLOCK.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 55 Clean tally is 0');
}
if (BATCH55_PF_REFUSED_UNLOCK.filter((r) => r.verdict === 'caution').length !== 1) {
  throw new Error('batch 55 Caution tally is 1');
}
if (BATCH55_PF_REFUSED_UNLOCK.filter((r) => r.verdict === 'avoid').length !== 5) {
  throw new Error('batch 55 Avoid tally is 5');
}
if (BATCH55_PF_REFUSED_UNLOCK.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 55 stays on Pain & Fever');
}
for (const record of BATCH55_PF_REFUSED_UNLOCK) {
  const expected = BATCH55_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 55 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 55 must not invent barcodes on ${record.id}`);
  }
}
if (BATCH55_PF_REFUSED_UNLOCK.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 55 recordStatus must stay unverified');
}

const BC_IBU = BY_ID[ID.bcIbu];
const BASICS_IBU = BY_ID[ID.basicsIbu];
const QUNOL_OLEO = BY_ID[ID.qunolOleo];
const APLUS_OX = BY_ID[ID.aplusOxides];
const APLUS_PLAIN = BY_ID[ID.aplusPlain];
const QUNOL_GUM = BY_ID[ID.qunolGummies];

if (BC_IBU?.formulaId !== IBU_FORMULA || BASICS_IBU?.formulaId !== IBU_FORMULA) {
  throw new Error('Basic Care 604/311 + Basics 080 must share one IBU formulaId');
}
if (QUNOL_OLEO?.formulaId === 'qunol-extra-strength-turmeric-1500') {
  throw new Error('oleoresin carton must not reuse the already-on-main 1500 formulaId');
}
if (QUNOL_OLEO?.formulaId === 'qunol-extra-strength-turmeric-1000') {
  throw new Error('oleoresin carton must not reuse the already-on-main 1000 formulaId');
}
if (APLUS_OX?.formulaId === APLUS_PLAIN?.formulaId) {
  throw new Error('A+Health oxide and plain Dual Action SPLs must not share formulaId');
}
if (APLUS_OX?.formulaId === 'amazon-basic-care-dual-action-tio2-talc') {
  throw new Error('A+Health Dual Action must not reuse Basic Care Dual Action formulaId');
}
if (
  !BC_IBU?.inactiveIngredients.some((item) => item.name === 'Iron oxide yellow')
  || !BASICS_IBU?.inactiveIngredients.some((item) => item.name === 'Iron oxide yellow')
) {
  throw new Error('leftover IBU twins must list exact iron oxide yellow');
}
if (!QUNOL_OLEO?.inactiveIngredients.some((item) => item.name === 'Oleoresin turmeric')) {
  throw new Error('oleoresin carton must list exact oleoresin turmeric');
}
if (
  !APLUS_OX?.inactiveIngredients.some((item) => item.name === 'Glyceryl dibehenate')
  || !APLUS_PLAIN?.inactiveIngredients.some((item) => item.name === 'Glyceryl dibehenate')
) {
  throw new Error('A+Health Dual Action must list exact glyceryl dibehenate');
}
if (!QUNOL_GUM?.inactiveIngredients.some((item) => item.name === 'Isomalt')) {
  throw new Error('Qunol Zero Sugar gummies must list exact isomalt');
}
if (
  QUNOL_GUM?.inactiveIngredients.some((item) =>
    /soybean|canola|sunflower|vegetable oil/i.test(item.name),
  )
) {
  throw new Error('Qunol gummies must not invent a High seed-oil flag');
}
if (BATCH55_REFUSED.some((item) => !item.token)) {
  throw new Error('every refused row must quote a token');
}

// Verdict tally (6 records): Clean 0 · Caution 2 · Avoid 4
// formulaId share: Basic Care 604/311 + Basics 080.
// A+Health oxide vs plain do not share. Oleoresin carton does not
// reuse already-on-main Qunol 1500 / 1000. Gummies own formulaId.
// Refused still-missing exact §5: Vegetable Capsule; unpinned
// HealthA2Z / TIME-Cap setids; no-OI movers; botanical-blend creams.
