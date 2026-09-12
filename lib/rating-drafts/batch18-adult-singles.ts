// DRAFT / not verified / batch 18 adult singles / founder calls locked /
// softgel soybean fill ≠ gummy High / clear softgels Clean / TiO2 shells
// Avoid / no Nordic without shelf confirm / no OLLY without canola confirm /
// methodology untouched.
//
// Adult vitamin singles only (D3, C, B12, fish oil / omega-3).
// Vitamins · audience 'adult' · minAge 18 · recordStatus is 'unverified' on
// every row. Founder calls (locked): see notes below. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from
// this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// SOFTGEL SOYBEAN-OIL FILL (LOCKED): soybean oil as a D3 / B12 softgel
// carrier is NOT the gummy seed/industrial-oil High rule. Do not Avoid
// clear D3 / B12 / fish-oil softgels for soybean oil fill alone.
//
// CLEAR vs TiO2 (LOCKED): clear gelatin / glycerin / water (± tocopherols)
// shells with no TiO2 / FD&C = Clean. Colored / TiO2 shells are a separate
// formulaId (`*-d3-softgels-tio2` family) = Avoid. Do not merge twins.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// CLEAN — clear softgels (oil + gelatin + glycerin + water only; no TiO2/FD&C)
// - S1 Nature Made Vitamin D3 2000 IU softgels = Clean.
//   HelloPharmacist / Raley's: Soybean Oil, Gelatin, Glycerin, Water.
//   No color added.
// - S2 Kirkland Signature Vitamin D3 softgels = Clean. Same clear stack.
//   Open Food Facts / Costco: Soybean Oil, Gelatin (Porcine), Glycerin,
//   Water, Vitamin D3 (Cholecalciferol).
// - S11 Nature Made B12 softgels (1000 mcg and/or Max 5000 mcg share the
//   clear “no color added” shell) = Clean. One formulaId when inactives
//   match (yellow beeswax + lecithin Cleared-class; no TiO2). Confirm
//   gelatin / glycerin / no TiO2. Cartons that list “colors added
//   (including carmine)” are a different formula — not this row.
// - S15 Kirkland Signature Fish Oil = Clean. Fish Oil, Gelatin, Glycerin,
//   Water, Tocopherols — no TiO2 / FD&C. Cite OFF / Costco.
// - S16 Nature Made Fish Oil 1200 mg standard (no color added) = Clean
//   if no TiO2 / color. HelloPharmacist: Gelatin, Glycerin, Water,
//   Tocopherols.
// CAUTION
// - S5 Nature Made Vitamin C 1000 mg tablets = Caution. PEG + SiO2; no
//   TiO2. Cite Fig / ThriftyWhite.
// - S6 Emergen-C Original packet = Caution (flavors / maltodextrin
//   Limited). If sucralose is on a carton, still Caution unless another
//   Moderate / Limited pushes 3 points — do not Avoid for sucralose
//   alone here. Cite retailer / brand Original Formula label.
// - S7 vitafusion Power C gummies (no seed oil) = Caution. Giant Extra
//   Strength Tropical Citrus: glucose syrup, sugar, water, gelatin;
//   citric acid, annatto, flavor, fumaric acid — no palm. Natural flavor
//   + annatto. Separate Avoid formulaId ONLY if a palm / coconut-and/or-
//   palm Power C carton is matched — skipped (no cite).
// - S12 Nature Made B12 tablets = Caution. Matched HelloPharmacist
//   1000 mcg tablet: cellulose gel / hypromellose / stearic acid / SiO2
//   / magnesium stearate / croscarmellose — no TiO2. PEG is not on that
//   list; SiO2 is the nanoparticle Caution cap.
// - S16 twin Nature Made Fish Oil 1200 burpless = Caution. Enteric
//   polymers / polysorbate 80 / oral PG only (no TiO2 / color). Separate
//   formulaId `nature-made-fish-oil-1200-burpless`.
// AVOID — colored softgels / seed-oil gummies
// - S3 store / national D3 softgels WITH TiO2 — SKIPPED. No reliable
//   Equate / CVS / grocery D3 softgel TiO2 cite (those listings are
//   soybean oil / gelatin / glycerin ± corn oil, no TiO2). Prefer skip
//   over invent.
// - S13 B12 softgels with TiO2 — SKIPPED (no cite).
// - S18 Fish oil softgels with TiO2 / FD&C — SKIPPED (no cite).
// - Seed-oil gummies (C / B12 / omega) — SKIPPED. No matched palm /
//   canola / sunflower / veg-oil carton for this singles set. OLLY C
//   skipped (canola unconfirmed). Nature Made C / D / B12 / omega
//   gummies skipped without oil confirmation. Coconut-only Clean /
//   Caution gummies not invented.
//
// TALLY (unverified drafts): 10 rows — Clean 5 / Caution 5 / Avoid 0.
// Independently Clean in THIS batch: clear Nature Made + Kirkland D3;
// Nature Made B12 clear softgels; Kirkland + Nature Made standard fish
// oil. cleanAlternatives on Caution / Avoid singles point at in-batch
// Clean clear softgels of the SAME active when available. Omitted on C
// rows (Nature Made C is Caution, not Clean).
//
// SKIPPED (founder skip — do not invent / do not write):
// - S2b Equate / Member's Mark clear D3 twin (Member's Mark HelloPharmacist
//   adds corn oil — not the identical clear stack; Equate D3 inactives
//   not confirmed identical — do not invent)
// - S3 / S13 / S18 TiO2 / FD&C softgels without a reliable cite
// - Nordic Naturals Ultimate Omega (not confirmed on these shelves)
// - OLLY C gummies (canola unconfirmed)
// - Invented coconut-only gummies
// - Nature Made C / D / B12 / omega gummies without oil confirmation
// - Protein powder, Amazon-only, multis, prenatals, kids
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Emergen-C zinc ascorbate honestNote says zinc is
// parked. Silicon dioxide / silica = Caution cap, not Avoid alone.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  annatto:
    'Methodology §5 Caution (annatto — allergenic; standalone Caution, not additive-scored, not Avoid)',
  betaCaroteneColor:
    'Methodology §5 Caution (beta-carotene as a color additive — standalone Caution, not additive-scored, not Avoid)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  lecithin:
    'Methodology §5 Cleared (lecithin — soy or sunflower — locked v1.6)',
  beeswax: 'Methodology §5 Cleared (beeswax)',
  softgelSoy:
    'Methodology §5 — soybean oil FILL in a softgel is NOT the gummy seed/industrial-oil High rule',
  cleared: 'Methodology §5 Cleared',
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

function labelCleared(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.cleared));
}

const ZINC_PARKED =
  'Zinc (oxide / citrate / ascorbate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const NO_CLEAN_C =
  'No independently Clean vitamin C exists in this draft set (Nature Made C 1000 tablets are Caution, not Clean) — cleanAlternatives omitted (honest empty; form cannot be labeled on a nonexistent same-active §6 swap).';

const NM_D3_CITE =
  'Nature Made Vitamin D3 2000 IU (50 mcg) softgels HelloPharmacist / Raley\'s other-ingredients (Soybean Oil, Gelatin, Glycerin, Water; no color added)';
const KIRKLAND_D3_CITE =
  'Kirkland Signature Extra Strength Vitamin D3 Open Food Facts 0096619393916 / Costco (Soybean Oil, Gelatin (Porcine), Glycerin, Water, Vitamin D3 (Cholecalciferol))';
const NM_B12_SG_CITE =
  'Nature Made Vitamin B12 1000 mcg softgels Target / Stop & Shop / brand “no color added” other-ingredients (Soybean Oil, Gelatin, Glycerin, Yellow Beeswax, Lecithin; B12 is red in color)';
const KIRKLAND_FO_CITE =
  'Kirkland Signature Fish Oil 1000 mg Open Food Facts 0096619926626 / Costco (Fish Oil, Gelatin (Porcine), Glycerin, Water, Tocopherols; no artificial colors)';
const NM_FO_CLEAR_CITE =
  'Nature Made Fish Oil 1200 mg standard HelloPharmacist / brand “no color added” (Gelatin, Glycerin, Water, Tocopherols; no TiO2 / color)';
const NM_FO_BURPLESS_CITE =
  'Nature Made Burp-Less / Burpless Fish Oil 1200 mg Giant / CVS other-ingredients (Gelatin, Glycerin, Methacrylic Acid Copolymer, Triethyl Citrate, Polysorbate 80, Glyceryl Monostearate, Propylene Glycol, Tocopherols; no color added)';
const NM_C_CITE =
  'Nature Made Vitamin C 1000 mg tablets Fig / ThriftyWhite / Raley\'s other-ingredients (Cellulose Gel, Hypromellose, Croscarmellose Sodium, Stearic Acid, Magnesium Stearate, Silicon Dioxide, Polyethylene Glycol; no TiO2 / no color added)';
const EMERGENC_ORIG_CITE =
  'Emergen-C Original Formula Super Orange brand PDF lbl-00000524 / Target other-ingredients (fructose, maltodextrin, citric acid, malic acid; <2% acacia, beta-carotene color, glycine, L-aspartic acid, natural flavors, orange juice concentrate, orange oil, silicon dioxide, tartaric acid, tocopherols)';
const POWER_C_CITE =
  'vitafusion Power C Extra Strength Tropical Citrus Giant / CVS / iHerb other-ingredients (Glucose Syrup, Sugar, Water, Gelatin; less than 2% citric acid, color (annatto extract), flavor, fumaric acid — no palm)';
const NM_B12_TAB_CITE =
  'Nature Made Vitamin B12 1000 mcg tablets HelloPharmacist other-ingredients (Cellulose Gel, Hypromellose, Stearic Acid, Silicon Dioxide, Magnesium Stearate, Croscarmellose Sodium; no TiO2 / no PEG on that list)';

const NM_D3_ID = 'nature-made-d3-softgels-clear';
const KIRKLAND_D3_ID = 'kirkland-d3-softgels-clear';
const NM_B12_SG_ID = 'nature-made-b12-softgels-clear';
const KIRKLAND_FO_ID = 'kirkland-fish-oil-softgels-clear';
const NM_FO_CLEAR_ID = 'nature-made-fish-oil-1200-clear';

const B12_ALTS: CleanAlternative[] = [
  {
    productId: NM_B12_SG_ID,
    rankReason:
      'Independently Clean in-batch Nature Made B12 clear “no color added” softgels (gelatin / glycerin / beeswax / lecithin; no TiO2). Form: softgel — labeled, not a hard filter (§6). Same active (cyanocobalamin).',
  },
];

const FISH_OIL_ALTS: CleanAlternative[] = [
  {
    productId: KIRKLAND_FO_ID,
    rankReason:
      'Independently Clean in-batch Kirkland Signature Fish Oil clear softgels (fish oil / gelatin / glycerin / water / tocopherols; no TiO2 / FD&C). Form: softgel — labeled, not a hard filter (§6).',
  },
  {
    productId: NM_FO_CLEAR_ID,
    rankReason:
      'Independently Clean in-batch Nature Made Fish Oil 1200 mg standard (no color added; no enteric coat). Form: softgel. Same-brand clear twin of the burpless Caution row.',
  },
];

export const BATCH18_ADULT_SINGLES: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: NM_D3_ID,
    productName: 'Nature Made Vitamin D3 2000 IU Softgels (clear)',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: NM_D3_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '50mcg (2000 IU)' },
    ],
    inactiveIngredients: [
      flag('Soybean oil', 'cleared', labelCite(NM_D3_CITE, METH.softgelSoy)),
      labelCleared(NM_D3_CITE, 'Gelatin'),
      labelCleared(NM_D3_CITE, 'Glycerin'),
      labelCleared(NM_D3_CITE, 'Water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Nature Made Vitamin D3 2000 IU softgels = Clean. HelloPharmacist / Raley\'s other-ingredients are Soybean Oil, Gelatin, Glycerin, Water — no color added, no TiO2 / FD&C. Softgel soybean-oil FILL is NOT the gummy seed/industrial-oil High rule; do not Avoid this clear shell for the carrier oil. Other Nature Made D3 softgel strengths share this formulaId only when the other-ingredients list holds. Contains soy. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_D3_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: KIRKLAND_D3_ID,
    productName: 'Kirkland Signature Vitamin D3 Softgels (clear)',
    brand: 'Kirkland Signature',
    category: VITAMINS,
    formulaId: KIRKLAND_D3_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '50mcg (2000 IU)' },
    ],
    inactiveIngredients: [
      flag('Soybean oil', 'cleared', labelCite(KIRKLAND_D3_CITE, METH.softgelSoy)),
      labelCleared(KIRKLAND_D3_CITE, 'Gelatin (porcine)'),
      labelCleared(KIRKLAND_D3_CITE, 'Glycerin'),
      labelCleared(KIRKLAND_D3_CITE, 'Water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Kirkland Signature Vitamin D3 softgels = Clean. Open Food Facts / Costco Extra Strength 50 mcg (2000 IU) list Soybean Oil, Gelatin (Porcine), Glycerin, Water — same clear stack as Nature Made; no TiO2 / FD&C. Softgel soybean-oil FILL is NOT the gummy seed-oil High rule. Some Costco snapshots omit water on the short list — confirm the bottle still has no color / TiO2. Equate / Member\'s Mark clear twins were NOT written (Member\'s Mark HelloPharmacist adds corn oil; Equate D3 not confirmed identical). Contains soy. No DailyMed drug SPL. Adults.',
    retailers: ['Costco'],
    sourcesGeneral: [
      `${KIRKLAND_D3_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: NM_B12_SG_ID,
    productName: 'Nature Made Vitamin B12 Softgels (clear, no color added)',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: NM_B12_SG_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Vitamin B12 (cyanocobalamin)',
        strength: '1000mcg (Max 5000 mcg when the no-color-added shell matches)',
      },
    ],
    inactiveIngredients: [
      flag('Soybean oil', 'cleared', labelCite(NM_B12_SG_CITE, METH.softgelSoy)),
      labelCleared(NM_B12_SG_CITE, 'Gelatin'),
      labelCleared(NM_B12_SG_CITE, 'Glycerin'),
      flag('Yellow beeswax', 'cleared', labelCite(NM_B12_SG_CITE, METH.beeswax)),
      flag('Lecithin', 'cleared', labelCite(NM_B12_SG_CITE, METH.lecithin)),
      labelCleared(NM_B12_SG_CITE, 'Water (when listed)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Nature Made B12 softgels = Clean when the carton is the clear “no color added” shell (gelatin / glycerin; no TiO2). Target / Stop & Shop / brand 1000 mcg lists Soybean Oil, Gelatin, Glycerin, Yellow Beeswax, Lecithin — B12 itself is red in color. Yellow beeswax and lecithin are Cleared-class. Softgel soybean-oil FILL is NOT gummy seed-oil High. 1000 mcg and Maximum Strength 5000 mcg share this formulaId ONLY when inactives match that no-color-added shell (strength differs in active amount only). Older / other retailer snapshots (Walgreens / some 5000 mcg lists) that say “colors added (including carmine)” are a different formula — not this Clean row; carmine would be a standalone Caution, and a TiO2 shell would be a separate Avoid formulaId (no reliable TiO2 B12 cite this batch — S13 skipped). Contains soy (soybean oil / lecithin). No DailyMed drug SPL. Adults.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_B12_SG_CITE} — draft, not verified; carton must be no-color-added; no DailyMed drug SPL`,
    ],
  },
  {
    id: KIRKLAND_FO_ID,
    productName: 'Kirkland Signature Fish Oil Softgels (clear)',
    brand: 'Kirkland Signature',
    category: VITAMINS,
    formulaId: KIRKLAND_FO_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Fish oil', strength: '1000mg' },
      { name: 'Omega-3 fatty acids (EPA + DHA)', strength: '300mg per softgel (typical Costco 400-ct)' },
    ],
    inactiveIngredients: [
      labelCleared(KIRKLAND_FO_CITE, 'Fish oil (active / fill)'),
      labelCleared(KIRKLAND_FO_CITE, 'Gelatin (porcine)'),
      labelCleared(KIRKLAND_FO_CITE, 'Glycerin'),
      labelCleared(KIRKLAND_FO_CITE, 'Water'),
      flag('Tocopherols', 'cleared', labelCite(KIRKLAND_FO_CITE, METH.tocopherols)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Kirkland Signature Fish Oil = Clean. Open Food Facts / Costco 1000 mg 400-ct: Fish Oil, Gelatin (Porcine), Glycerin, Water, Tocopherols — no TiO2 / FD&C. Tocopherols are Cleared-class antioxidants. This is the standard clear Costco fish oil, not the Wild Alaskan / enteric-coated Kirkland twins (different formulaIds; not written). Contains fish. No DailyMed drug SPL. Adults. Nordic Naturals Ultimate Omega was skipped (not confirmed on these shelves).',
    retailers: ['Costco'],
    sourcesGeneral: [
      `${KIRKLAND_FO_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: NM_FO_CLEAR_ID,
    productName: 'Nature Made Fish Oil 1200 mg Softgels (standard, no color added)',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: NM_FO_CLEAR_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Fish oil', strength: '1200mg per softgel (2400mg per 2-softgel serving when labeled)' },
      { name: 'Omega-3 fatty acids (EPA + DHA)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      labelCleared(NM_FO_CLEAR_CITE, 'Gelatin'),
      labelCleared(NM_FO_CLEAR_CITE, 'Glycerin'),
      labelCleared(NM_FO_CLEAR_CITE, 'Water'),
      flag('Tocopherols', 'cleared', labelCite(NM_FO_CLEAR_CITE, METH.tocopherols)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Nature Made Fish Oil 1200 mg standard (no color added) = Clean if no TiO2 / color. HelloPharmacist other-ingredients: Gelatin, Glycerin, Water, Tocopherols. Brand page states no color added. Separate formulaId from the burpless / enteric-coated Caution twin (`nature-made-fish-oil-1200-burpless`) — do not merge them. Confirm the carton: a bottle that lists methacrylic acid copolymer / polysorbate 80 / propylene glycol is the burpless row, not this one. Contains fish. No DailyMed drug SPL. Adults.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_FO_CLEAR_CITE} — draft, not verified; carton-confirm vs burpless twin; no DailyMed drug SPL`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'nature-made-vitamin-c-1000-tablets',
    productName: 'Nature Made Vitamin C 1000 mg Tablets',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: 'nature-made-vitamin-c-1000-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [{ name: 'Vitamin C (ascorbic acid)', strength: '1000mg' }],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', labelCite(NM_C_CITE, METH.peg)),
      flag('Silicon dioxide', 'cleared', labelCite(NM_C_CITE, METH.sio2)),
      labelCleared(NM_C_CITE, 'Cellulose gel'),
      labelCleared(NM_C_CITE, 'Hypromellose'),
      labelCleared(NM_C_CITE, 'Croscarmellose sodium'),
      labelCleared(NM_C_CITE, 'Stearic acid'),
      labelCleared(NM_C_CITE, 'Magnesium stearate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nature Made Vitamin C 1000 mg tablets = Caution (PEG + SiO2; no TiO2). Fig / ThriftyWhite / Raley\'s other-ingredients: cellulose gel, hypromellose, croscarmellose sodium, stearic acid, magnesium stearate, silicon dioxide, polyethylene glycol. PEG is Moderate (2 pts). Silicon dioxide is the nanoparticle Caution cap (0 demerit points). No titanium dioxide / synthetic dye on those lists. Nature Made C gummies were skipped (oil not confirmed). ' +
      NO_CLEAN_C +
      ' No DailyMed drug SPL. Adults.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NM_C_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'emergen-c-original',
    productName: 'Emergen-C Original Formula',
    brand: 'Emergen-C',
    category: VITAMINS,
    formulaId: 'emergen-c-original',
    audience: ADULT,
    minAge: 18,
    form: 'powder packet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin C', strength: '1000mg' },
      { name: 'Zinc (as zinc ascorbate)', strength: '2mg' },
      { name: 'B vitamins', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Maltodextrin', 'limited', labelCite(EMERGENC_ORIG_CITE, METH.maltodextrin)),
      flag('Natural flavors', 'limited', labelCite(EMERGENC_ORIG_CITE, METH.flavors)),
      flag('Silicon dioxide', 'cleared', labelCite(EMERGENC_ORIG_CITE, METH.sio2)),
      flag(
        'Beta-carotene (color)',
        'cleared',
        labelCite(EMERGENC_ORIG_CITE, METH.betaCaroteneColor),
      ),
      labelCleared(EMERGENC_ORIG_CITE, 'Fructose'),
      labelCleared(EMERGENC_ORIG_CITE, 'Citric acid'),
      flag('Acacia', 'cleared', labelCite(EMERGENC_ORIG_CITE, METH.gums)),
      flag(
        'Tocopherols (to preserve freshness)',
        'cleared',
        labelCite(EMERGENC_ORIG_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Emergen-C Original packet = Caution (flavors / maltodextrin Limited). Matched Original Formula Super Orange brand PDF lbl-00000524 / Target: fructose, maltodextrin, citric acid, malic acid; <2% acacia, beta-carotene (color), glycine, L-aspartic acid, natural flavors, orange juice concentrate, orange oil, silicon dioxide, tartaric acid, tocopherols. Maltodextrin + natural flavors are Limited. Silicon dioxide is the 0-pt Caution cap. Beta-carotene as a color additive is standalone Caution class (not additive-scored, not Avoid). Current Original Super Orange PDF does NOT list sucralose — if a later Original carton lists sucralose, still Caution unless another Moderate / Limited pushes 3 points; do not Avoid for sucralose alone here. Malic acid, tartaric acid, glycine, L-aspartic acid, orange oil, and orange juice concentrate are not in Methodology §5 (ungraded; v1.6 intake) — not required to reach Caution. Separate product id from batch 9 `emergenc-super-orange` (Immune aisle); this is the Vitamins-aisle Original Formula singles row. Carton ages 14+; this draft is adult / minAge 18. Zinc ascorbate is an active. ' +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_C,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${EMERGENC_ORIG_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'vitafusion-power-c-gummies-no-seed-oil',
    productName: 'vitafusion Power C Extra Strength Gummies (no seed oil)',
    brand: 'vitafusion',
    category: VITAMINS,
    formulaId: 'vitafusion-power-c-gummies-no-seed-oil',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Vitamin C (as ascorbic acid and sodium ascorbate)',
        strength: '500mg per serving (Extra Strength Tropical Citrus)',
      },
    ],
    inactiveIngredients: [
      flag('Natural flavor', 'limited', labelCite(POWER_C_CITE, METH.flavors)),
      flag('Annatto extract (color)', 'cleared', labelCite(POWER_C_CITE, METH.annatto)),
      labelCleared(POWER_C_CITE, 'Glucose syrup'),
      labelCleared(POWER_C_CITE, 'Sugar'),
      labelCleared(POWER_C_CITE, 'Water'),
      labelCleared(POWER_C_CITE, 'Gelatin'),
      labelCleared(POWER_C_CITE, 'Citric acid'),
      labelCleared(POWER_C_CITE, 'Fumaric acid'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: vitafusion Power C (Extra Strength Tropical Citrus Giant listing) = Caution. Matched other-ingredients: glucose syrup, sugar, water, gelatin; less than 2% citric acid, color (annatto extract), flavor, fumaric acid — no palm / canola / sunflower / vegetable oil on that carton. Drivers are natural flavor (Limited) + annatto (standalone Caution, not Avoid, not additive-scored). A palm / coconut-and/or-palm Power C carton would be a separate Avoid formulaId — SKIPPED this batch; no matched seed-oil Power C cite. Do not invent a coconut-only Clean / Caution twin. OLLY C gummies skipped (canola unconfirmed). Confirm the carton. No DailyMed drug SPL. Adults. ' +
      NO_CLEAN_C,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${POWER_C_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'nature-made-b12-tablets',
    productName: 'Nature Made Vitamin B12 Tablets',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: 'nature-made-b12-tablets',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin B12 (cyanocobalamin)', strength: '1000mcg (other tablet strengths share formulaId when inactives match)' },
    ],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', labelCite(NM_B12_TAB_CITE, METH.sio2)),
      labelCleared(NM_B12_TAB_CITE, 'Cellulose gel'),
      labelCleared(NM_B12_TAB_CITE, 'Hypromellose'),
      labelCleared(NM_B12_TAB_CITE, 'Stearic acid'),
      labelCleared(NM_B12_TAB_CITE, 'Magnesium stearate'),
      labelCleared(NM_B12_TAB_CITE, 'Croscarmellose sodium'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nature Made B12 tablets = Caution (SiO2 / no TiO2). HelloPharmacist 1000 mcg tablet other-ingredients: cellulose gel, hypromellose, stearic acid, silicon dioxide, magnesium stearate, croscarmellose sodium. PEG is NOT on that matched list — do not invent PEG. Silicon dioxide is the nanoparticle Caution cap (0 demerit points); that cap is enough for Caution and is not Avoid alone. No titanium dioxide / dye on the matched list. Time-release 1000 mcg cartons that also list calcium (dibasic calcium phosphate) as a Supplement Facts mineral share this formulaId when the other-ingredients list holds. Separate formulaId from the Clean clear softgel (`nature-made-b12-softgels-clear`). B12 gummies skipped (oil not confirmed). No DailyMed drug SPL. Adults.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: B12_ALTS,
    sourcesGeneral: [
      `${NM_B12_TAB_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'nature-made-fish-oil-1200-burpless',
    productName: 'Nature Made Burp-Less Fish Oil 1200 mg Softgels',
    brand: 'Nature Made',
    category: VITAMINS,
    formulaId: 'nature-made-fish-oil-1200-burpless',
    audience: ADULT,
    minAge: 18,
    form: 'enteric-coated softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Fish oil', strength: '1200mg per softgel' },
      { name: 'Omega-3 fatty acids (EPA + DHA)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Polysorbate 80', 'moderate', labelCite(NM_FO_BURPLESS_CITE, METH.ps80)),
      flag('Propylene glycol', 'moderate', labelCite(NM_FO_BURPLESS_CITE, METH.pg)),
      labelCleared(NM_FO_BURPLESS_CITE, 'Gelatin'),
      labelCleared(NM_FO_BURPLESS_CITE, 'Glycerin'),
      flag('Tocopherols', 'cleared', labelCite(NM_FO_BURPLESS_CITE, METH.tocopherols)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nature Made Fish Oil 1200 burpless coated twin = Caution (extra coat / flavor only; no TiO2). Giant / CVS Burp-Less listings: gelatin, glycerin, methacrylic acid copolymer, triethyl citrate, polysorbate 80, glyceryl monostearate, propylene glycol, tocopherols — no color added. Polysorbate 80 and oral propylene glycol are Moderate. Raw demerit math is PS80 2 + oral PG 2 → 4 pts Avoid — draft follows the locked Caution call (extra enteric coat only; no color / TiO2). Methacrylic acid copolymer, triethyl citrate, and glyceryl monostearate are not in Methodology §5 (ungraded; v1.6 intake; not a second grade). Separate formulaId from the Clean standard 1200 (`nature-made-fish-oil-1200-clear`) — do not merge them. Confirm the carton. Contains fish. No DailyMed drug SPL. Adults.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: FISH_OIL_ALTS,
    sourcesGeneral: [
      `${NM_FO_BURPLESS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];
