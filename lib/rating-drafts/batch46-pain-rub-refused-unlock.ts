// DRAFT / not verified / batch 46 PR #93 refused-unlock WRITE /
// methodology v1.6 + current main §5 only. No invented grades.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes. Pack sizes
// of the same name+form+inactives share formulaId. Form is labeled
// on cleanAlternatives, not a hard filter (§6). Not wired into Clean
// Picks UI. No live Clean Picks file is edited. No photos. Letter
// tiles only on new ids. No fake Clean alts. No methodology rewrite.
//
// GATE: write a PR #93 refused SKU only when every DailyMed OI string
// maps to an existing §5 row via exact name, “also appears as”, or an
// explicit locked family synonym already in Methodology. Do not invent
// grades or stretch synonyms.
//
// TALLY (unverified drafts in THIS file): 3 rows — Clean 0 /
// Caution 2 / Avoid 1.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batch 41: Precise creams/patch + AleveX
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel
// Batch 44 list-2 (13 rows)
// Batch 45 remaining (18 rows, including tiger-balm-neck-shoulder-rub)
// Batch 37 / 33 / 38 reuse from batch 41 still stands.
//
// WRITTEN from the PR #93 refused list (current DailyMed OI):
// - Tiger Balm Pain Relieving Patch (440e97bc) + Hydrogel Patch
//   (cb60037f): mentha oil is NOT on the current SPL. Remaining OI
//   (CMC / eucalyptus / glycerin / water / P80 / SiO2 / sorbitan
//   monooleate / sorbitol / tartaric acid) all map. Same OI + actives
//   — shared formulaId, two Search rows.
// - Tiger Balm Neck & Shoulder vanishing scent (2f272d12): PVM/MA
//   Decadiene Crosspolymer is NOT on the current SPL. PEG-120 methyl
//   glucose dioleate maps to the PEG Moderate family row (not the
//   Cleared plain methyl glucose dioleate row). Avoid (Blue 1 +
//   parabens). Own formulaId — do not clone tiger-balm-neck-shoulder-rub.
//
// REFUSED (still missing from §5 — do not invent): see
// BATCH46_PAIN_RUB_REFUSED at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const PAIN_FEVER = 'Pain & Fever';
const UNVERIFIED_NOTE = 'draft, not verified';

const PF_RETAILERS = [
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
  'Safeway',
] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / capsicum / benzyl alcohol / trolamine salicylate actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const PEG120_TAP =
  'PEG-120 methyl glucose dioleate sits on the existing PEG Moderate family row (ethylene-oxide / 1,4-dioxane). It is not the Cleared plain methyl glucose dioleate row.';

const METH = {
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate, pegoxol-7 stearate, lauroyl macrogolglycerides; ethylene-oxide / 1,4-dioxane contamination risk). PEG-120 methyl glucose dioleate sits on this same Moderate family row. Not the Cleared plain methyl glucose dioleate row.',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as a gel / liniment / ointment / patch inactive — fragrance/EO line; standalone Caution, not Avoid)',
  sorbitanOleate:
    'Methodology §5 Caution (sorbitan oleate / sorbitan monooleate, topical — standalone Caution, not additive-scored, not Avoid)',
  dmdm:
    'Methodology §5 Caution (DMDM hydantoin / diazolidinyl urea — formaldehyde-donor; standalone Caution, not Avoid unless founder later bumps; locked Sept 15, 2026)',
  tea:
    'Methodology §5 Caution (TEA / trolamine / triethanolamine as inactive — not the salicylate active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  tartaric: 'Methodology §5 Cleared (tartaric acid — organic acid with citric; locked Sept 15, 2026)',
  cellulose:
    'Methodology §5 Cleared (cellulose gum / carboxymethylcellulose sodium — MCC / cellulose-family filler)',
  pgTopical: `Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this topical. ${PG_TOPICAL_TAP}`,
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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ARNICARE_GEL = 'boiron-arnicare-gel';

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / balm / ointment / roll-on / spray / patch — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine cream invented.',
  ),
];

const SET = {
  tbPatch: '440e97bc-bd97-4733-9955-643b18e7fb18',
  tbHydro: 'cb60037f-bceb-4090-a5e4-bdda0cbf9f5c',
  tbVanish: '2f272d12-7b34-430e-817e-1005f57ed9e9',
} as const;

const ID = {
  tbPatch: 'tiger-balm-pain-relieving-patch',
  tbHydro: 'tiger-balm-hydrogel-patch',
  tbVanish: 'tiger-balm-neck-shoulder-vanishing-scent',
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function hydrogelPatchInactives(setid: string): IngredientFlag[] {
  return [
    flag(
      'Carboxymethylcellulose sodium (cellulose gum)',
      'cleared',
      dailymed(setid, METH.cellulose),
    ),
    flag('Eucalyptus oil', 'cleared', dailymed(setid, METH.eucalyptus)),
    cleared(setid, 'Glycerin'),
    flag('Polysorbate 80', 'moderate', dailymed(setid, METH.ps80)),
    flag('Silicon dioxide', 'cleared', dailymed(setid, METH.sio2)),
    flag(
      'Sorbitan monooleate',
      'cleared',
      dailymed(setid, METH.sorbitanOleate),
    ),
    flag('Sorbitol', 'limited', dailymed(setid, METH.sorbitol)),
    flag('Tartaric acid', 'cleared', dailymed(setid, METH.tartaric)),
    cleared(setid, 'Purified water'),
  ];
}

export const BATCH46_PAIN_RUB_REFUSED_UNLOCK: RatingRecord[] = [
  row({
    id: ID.tbPatch,
    productName: 'Tiger Balm Pain Relieving Patch',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '110 mg/patch' },
      { name: 'Levomenthol (L-menthol)', strength: '33 mg/patch' },
      { name: 'Capsicum extract', strength: '22 mg/patch' },
    ],
    inactiveIngredients: hydrogelPatchInactives(SET.tbPatch),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Pain Relieving Patch = Caution. Polysorbate 80 is Moderate; sorbitol is Limited; eucalyptus oil / sorbitan monooleate are standalone Caution; silicon dioxide is the 0-pt Caution cap. CMC / glycerin / tartaric acid / water Cleared. No High. Mentha oil is not on the current DailyMed OI (setid ${SET.tbPatch}) — that was the PR #93 refuse string. DailyMed OI + actives match Tiger Balm Pain Relieving Hydrogel Patch (setid ${SET.tbHydro}) — shared formulaId ${ID.tbPatch}, two Search rows. Pack sizes share this formulaId. Ages 12+ (under 12: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbPatch} (NDC 66761-329); Hydrogel Patch twin ${SET.tbHydro} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbHydro,
    productName: 'Tiger Balm Pain Relieving Hydrogel Patch',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '110 mg/patch' },
      { name: 'Levomenthol (L-menthol)', strength: '33 mg/patch' },
      { name: 'Capsicum extract', strength: '22 mg/patch' },
    ],
    inactiveIngredients: hydrogelPatchInactives(SET.tbHydro),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Pain Relieving Hydrogel Patch = Caution. OI + actives match Tiger Balm Pain Relieving Patch (setid ${SET.tbPatch}) — one formulaId, two Search rows. Mentha oil is not on the current DailyMed OI. Distinct from Hydrogel Large (setid 064d04ca — refused; methyl acrylate still missing from §5) and from the Cool / regular / wider hydrogel SPLs (Mentha arvensis leaf oil + dihydroxyaluminum aminoacetate still missing). Pack sizes share this formulaId. Ages 12+ (under 12: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbHydro} (NDC 66761-323); Pain Relieving Patch twin ${SET.tbPatch} — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tbVanish,
    productName: 'Tiger Balm Neck & Shoulder Rub (vanishing scent)',
    brand: 'Tiger Balm',
    category: PAIN_FEVER,
    formulaId: ID.tbVanish,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor (synthetic)', strength: '11%' },
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      flag('Diazolidinyl urea', 'cleared', dailymed(SET.tbVanish, METH.dmdm)),
      flag('Eucalyptus oil', 'cleared', dailymed(SET.tbVanish, METH.eucalyptus)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET.tbVanish, METH.dyes)),
      cleared(SET.tbVanish, 'Glycerin'),
      flag(
        'PEG-120 methyl glucose dioleate',
        'moderate',
        dailymed(SET.tbVanish, METH.peg),
      ),
      flag('Methylparaben', 'high', dailymed(SET.tbVanish, METH.parabens)),
      flag('Propylene glycol', 'cleared', dailymed(SET.tbVanish, METH.pgTopical)),
      flag('Propylparaben', 'high', dailymed(SET.tbVanish, METH.parabens)),
      flag('Trolamine', 'cleared', dailymed(SET.tbVanish, METH.tea)),
      cleared(SET.tbVanish, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Tiger Balm Neck & Shoulder Rub (vanishing scent) = Avoid. Drivers are FD&C Blue No. 1 + methylparaben + propylparaben (High). PEG-120 methyl glucose dioleate is Moderate (PEG family — not Cleared plain methyl glucose dioleate). ${PEG120_TAP} Diazolidinyl urea / eucalyptus / trolamine are standalone Caution. PVM/MA Decadiene Crosspolymer is not on the current DailyMed OI (setid ${SET.tbVanish}) — that was the PR #93 refuse string. Own formulaId — do not clone tiger-balm-neck-shoulder-rub (carbomer / dementholised mint / lavender / plain methyl glucose dioleate SPL). Pack sizes (NDC 66761-341) share this formulaId. Ages 12+ (12 or younger: ask a doctor). ${PARKED_ACTIVES} ${PG_TOPICAL_TAP} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tbVanish} (NDC 66761-341) — ${UNVERIFIED_NOTE}`,
    ],
  }),
];

export const BATCH46_PAIN_RUB_REFUSED = [
  {
    sku: 'Icy Hot Pro Pain Massaging Balm',
    setid: '09e2b0cb-5186-4f9c-b256-edaced4ca014',
    missing: ['theobroma cacao (cocoa) seed butter'],
  },
  {
    sku: 'Icy Hot with Lidocaine Large Patch',
    setid: '267c0070-f65e-4faf-b10e-9f7f2393b9e2',
    missing: ['aluminum hydroxide (patch inactive)'],
  },
  {
    sku: 'Icy Hot Pro Pain Relief Patch',
    setid: '27099a18-5b1c-45dd-93ba-e8d0457ea63c',
    missing: [
      'aluminum hydroxide (patch inactive)',
      'methyl acrylate',
      'ethylhexyl acetate',
    ],
  },
  {
    sku: 'Icy Hot Lidocaine No-Mess Roll On',
    setid: '347f9a18-8ab6-47d3-9610-5b4e9ca5d53a',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Icy Hot Original No-Mess Roll On (16% menthol applicator)',
    setid: '4ce2b823-7ef5-4cca-a2d8-2fe781bc958e',
    missing: ['capsaicin (listed as inactive)'],
  },
  {
    sku: 'Icy Hot Max Lidocaine Pain Relief Cream',
    setid: '75b28b06-77ea-4fea-b516-2e8a0dac7037',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Icy Hot Original Arm/Neck/Leg + Back/XL/Value patches',
    setid: '941de921-c1f5-4293-973e-d3b786c78511',
    missing: [
      'aluminum hydroxide (patch inactive)',
      'methyl acrylate',
      'acrylic acid (monomer)',
    ],
  },
  {
    sku: 'Icy Hot Pro Pain Relief Cream with microbeads',
    setid: 'df5fd485-f583-46b7-a869-16ca2e17185c',
    missing: [
      'glyceryl dilaurate',
      'glycine soja (soybean) sterols',
      'ferric ferrocyanide',
    ],
  },
  {
    sku: 'Aspercreme Lidocaine with Eucalyptus Essential Oil cream',
    setid: '03e247b4-a2e2-4354-a018-880f1bc987fd',
    missing: ['C15-19 alkane'],
  },
  {
    sku: 'Aspercreme Lidocaine Foot (2-in-1) cream',
    setid: '2c33d15e-5032-46d9-bd98-5abc7df3bbe5',
    missing: [
      'dicetyl phosphate',
      'panthenol',
      'magnesium ascorbyl phosphate',
    ],
  },
  {
    sku: 'Aspercreme Lidocaine No-Mess plus Lavender',
    setid: '3948a3d2-ce04-4703-8709-211e75c9c38d',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme with Lidocaine Pain Relieving Patch',
    setid: '7ad8efa9-7031-4cd0-be1d-6dee63091fd1',
    missing: ['aluminum hydroxide (patch inactive)'],
  },
  {
    sku: 'Aspercreme Lidocaine No-Mess Applicator / fragrance-free roll-on',
    setid: '8092cde7-28d0-4755-b5c0-5765934e572f',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme Original Pain Relief Cream (trolamine salicylate)',
    setid: '97dd587b-ecc3-4b4b-a116-6355d3c6ea6d',
    missing: ['potassium phosphate'],
  },
  {
    sku: 'Aspercreme Lidocaine Rosemary Mint liquid',
    setid: '9c81d5eb-fa9b-47fb-8924-6ebf6a5c6bab',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme Lidocaine with Rosemary and Mint',
    setid: '9d40bfea-85d0-4943-83e9-0c16e79a011c',
    missing: [
      'dicetyl phosphate',
      'triethyl citrate',
      'panthenol',
      'magnesium ascorbyl phosphate',
    ],
  },
  {
    sku: 'Aspercreme with Lidocaine XL Patch',
    setid: 'b0859b10-539e-4905-ab52-af78b778d6a4',
    missing: [
      'aluminum hydroxide (patch inactive)',
      'dihydroxyaluminum aminoacetate',
      'polygalic acid',
    ],
  },
  {
    sku: 'Aspercreme with Lidocaine Odor-Free Cream',
    setid: 'd5da67c3-c2ec-4e3e-abe9-cc862dcfc8bd',
    missing: ['dicetyl phosphate'],
  },
  {
    sku: 'Aspercreme Lidocaine Foot Pain Cream',
    setid: 'da82cc0e-cc39-408e-87e1-c35bb6f9f51e',
    missing: [
      'dicetyl phosphate',
      'panthenol',
      'magnesium ascorbyl phosphate',
    ],
  },
  {
    sku: 'Aspercreme Professional Cream',
    setid: 'ef297864-5917-4645-8ec7-f2bc49e037e8',
    missing: [
      'dicetyl phosphate',
      'panthenol',
      'magnesium ascorbyl phosphate',
      'triethyl citrate',
    ],
  },
  {
    sku: 'Salonpas Arthritis Pain Patch',
    setid: '2e88c933-89e6-4a48-be7a-dc6a36e5c8f8',
    missing: ['aluminum silicate / synthetic aluminum silicate'],
  },
  {
    sku: 'Salonpas Lidocaine Plus Pain Relieving Cream',
    setid: '364924d3-fac3-4f4e-9b40-decd4ec48245',
    missing: [
      'butylene glycol',
      'dicetyl phosphate (dihexadecyl phosphate)',
      'squalane',
      'tert-butyl alcohol',
      'denatonium benzoate',
    ],
  },
  {
    sku: 'Salonpas Lidocaine 4% Pain Relieving Gel-Patch',
    setid: '4f3a438c-f378-4d2a-a95c-58e56cf1e797',
    missing: ['aluminum silicate', 'dihydroxyaluminum aminoacetate'],
  },
  {
    sku: 'Salonpas Pain Relieving Patch LARGE',
    setid: '5bb6c6a3-7dc0-463d-ab2c-9f3bd3f3eff5',
    missing: ['aluminum silicate'],
  },
  {
    sku: 'Salonpas Lidocaine 4% Pain Relieving Gel-Patch (Hisamitsu America)',
    setid: '63911880-8194-4c7d-a72f-cab94761b2d7',
    missing: ['aluminum silicate', 'dihydroxyaluminum aminoacetate'],
  },
  {
    sku: 'Salonpas Pain Relief Patch',
    setid: '724bc4d3-0bc1-4275-a23b-4bbc62fbc0d2',
    missing: ['synthetic aluminum silicate / aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relieving FLEX Patch Lidocaine 4%',
    setid: '9507f727-c49f-4de4-9d64-b6d977d568ab',
    missing: ['aluminum silicate'],
  },
  {
    sku: 'Salonpas Arthritis Pain Patch LARGE',
    setid: 'a6518167-fe32-43b2-b736-ba01ac69c12d',
    missing: ['synthetic aluminum silicate / aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relief Patch LARGE',
    setid: 'acd7ba91-221a-485a-ad1f-dd41ed155656',
    missing: ['synthetic aluminum silicate / aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relieving Patch',
    setid: 'acdd5622-a9a7-4cc3-877e-57efea23303f',
    missing: ['aluminum silicate / synthetic aluminum silicate'],
  },
  {
    sku: 'Salonpas Pain Relieving Gel-Patch HOT',
    setid: 'd2aa8820-a947-404b-b617-e692fbd16502',
    missing: ['magnesium aluminometasilicate (silodrate)', 'oleyl alcohol'],
  },
  {
    sku: 'Salonpas-HOT Capsicum Patch',
    setid: 'ef5373aa-9857-4d01-95af-2d7716e54ae4',
    missing: ['zinc oxide (as inactive)'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Hydrogel Patch Large',
    setid: '064d04ca-184d-492b-867c-beaa165ab3e0',
    missing: ['methyl acrylate'],
  },
  {
    sku: 'Tiger Balm Pain Relieving Cool Patch',
    setid: '41590ba1-32bb-4352-97ba-d6a3cc9d0546',
    missing: [
      'dihydroxyaluminum aminoacetate',
      'mentha arvensis leaf oil (mentha oil)',
    ],
  },
  {
    sku: 'Tiger Balm Pain Relieving Patch (regular hydrogel)',
    setid: '5066dc10-e4d5-49e9-9a5f-0ac220cfbf28',
    missing: [
      'dihydroxyaluminum aminoacetate',
      'mentha arvensis leaf oil (mentha oil)',
    ],
  },
  {
    sku: 'Tiger Balm Arthritis Rub',
    setid: '80932288-4797-40d3-aa8a-6af686fb67ad',
    missing: [
      'cinnamon oil',
      'glucosamine sulfate',
      'methylsulfonylmethane (MSM)',
    ],
  },
  {
    sku: 'Tiger Balm Pain Relieving Patch (wider hydrogel)',
    setid: 'ca601b02-e9be-4d8d-a384-c62553302ceb',
    missing: [
      'dihydroxyaluminum aminoacetate',
      'mentha arvensis leaf oil (mentha oil)',
    ],
  },
] as const;

const TB_PATCH = BATCH46_PAIN_RUB_REFUSED_UNLOCK.find((r) => r.id === ID.tbPatch);
const TB_HYDRO = BATCH46_PAIN_RUB_REFUSED_UNLOCK.find((r) => r.id === ID.tbHydro);
const TB_VANISH = BATCH46_PAIN_RUB_REFUSED_UNLOCK.find(
  (r) => r.id === ID.tbVanish,
);

if (BATCH46_PAIN_RUB_REFUSED_UNLOCK.length !== 3) {
  throw new Error('batch 46 must write exactly 3 newly-unlocked Search rows');
}
if (BATCH46_PAIN_RUB_REFUSED_UNLOCK.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 46 Clean tally is 0');
}
if (BATCH46_PAIN_RUB_REFUSED_UNLOCK.filter((r) => r.verdict === 'caution').length !== 2) {
  throw new Error('batch 46 Caution tally is 2');
}
if (BATCH46_PAIN_RUB_REFUSED_UNLOCK.filter((r) => r.verdict === 'avoid').length !== 1) {
  throw new Error('batch 46 Avoid tally is 1');
}
if (BATCH46_PAIN_RUB_REFUSED_UNLOCK.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 46 stays on Pain & Fever');
}
if (BATCH46_PAIN_RUB_REFUSED_UNLOCK.some((record) => record.barcode)) {
  throw new Error('batch 46 must not invent barcodes');
}
if (TB_PATCH?.formulaId !== TB_HYDRO?.formulaId) {
  throw new Error('Pain Relieving Patch and Hydrogel Patch must share formulaId');
}
if (TB_VANISH?.formulaId === 'tiger-balm-neck-shoulder-rub') {
  throw new Error('vanishing scent must not clone the batch 45 neck-shoulder formulaId');
}
if (TB_PATCH?.verdict !== 'caution' || TB_HYDRO?.verdict !== 'caution') {
  throw new Error('the two matching hydrogel patches must stay Caution');
}
if (TB_VANISH?.verdict !== 'avoid') {
  throw new Error('vanishing scent must stay Avoid (Blue 1 + parabens)');
}
if (BATCH46_PAIN_RUB_REFUSED.length !== 37) {
  throw new Error('batch 46 refused list must stay 37 still-missing SKUs');
}

// Verdict tally (3 records): Clean 0 · Caution 2 · Avoid 1
// Written: Tiger Balm Pain Relieving Patch + Hydrogel Patch (shared
//   formulaId; Caution) + Neck & Shoulder vanishing scent (Avoid)
// Reuse: batches 41 / 42 / 44 / 45 untouched
// Refused still-missing §5: see BATCH46_PAIN_RUB_REFUSED
