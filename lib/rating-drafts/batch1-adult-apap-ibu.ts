// DRAFT / not verified / batch 1 adult APAP + IBU
// Pain & Fever · recordStatus is 'unverified' on every row — do not treat as verified.
// Founder exception: Genexa Acetaminophen Extra Strength stays Clean despite
// maltodextrin (Limited in Methodology §5) so there is a recommendable adult APAP.
// Homeopathic subtype omitted (none of these are homeopathic).
// Barcodes omitted — do not invent UPCs. Different pack sizes share formulaId.
// Not wired into Clean Picks UI. Do not convert painFeverPicks.ts from this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const PAIN_FEVER = 'Pain & Fever';
const ADULT = 'adult' as const;

const APAP_500 = [{ name: 'Acetaminophen', strength: '500mg' }];
const APAP_325 = [{ name: 'Acetaminophen', strength: '325mg' }];
const APAP_650 = [{ name: 'Acetaminophen', strength: '650mg' }];
const IBU_200 = [{ name: 'Ibuprofen', strength: '200mg' }];

const METH = {
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  parabens: 'Methodology §5 High-tier (parabens)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  propylGallate: 'Methodology §5 High-tier (propyl gallate — locked v1.6)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  castor: 'Methodology §5 Cleared (castor oil, oral/topical)',
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

const APAP_500_ALTS: CleanAlternative[] = [
  {
    productId: 'genexa-acetaminophen-es',
    rankReason:
      'Closest Clean adult acetaminophen 500 mg analog (founder-exception Clean)',
  },
  {
    productId: 'cvs-health-es-castor',
    rankReason:
      'Clean adult acetaminophen 500 mg; wider pharmacy availability than Genexa',
  },
];

const RS_COATED_ALTS: CleanAlternative[] = [
  {
    productId: 'tylenol-rs-tablets-plain',
    rankReason:
      'Same brand and 325 mg strength class; uncoated tablet without titanium dioxide or dyes',
  },
  {
    productId: 'genexa-acetaminophen-es',
    rankReason: 'Clean adult acetaminophen alternative in this batch',
  },
];

function ibuAlts(preferredId?: string): CleanAlternative[] {
  const rows: CleanAlternative[] = [
    {
      productId: 'equate-ibuprofen-dye-free',
      rankReason:
        'Best Caution adult ibuprofen in this batch (dye-free LNK 44-438; no Clean IBU)',
    },
    {
      productId: 'cvs-health-ibuprofen-dye-free',
      rankReason: 'Same dye-free 44-438 formula; CVS shelf',
    },
    {
      productId: 'walgreens-ibuprofen-dye-free',
      rankReason: 'Same dye-free 44-438 formula; Walgreens shelf',
    },
  ];
  if (!preferredId) return rows;
  const match = rows.find((row) => row.productId === preferredId);
  const rest = rows.filter((row) => row.productId !== preferredId);
  if (!match) return rows;
  return [
    {
      ...match,
      rankReason: `${match.rankReason}; same-store brand match`,
    },
    ...rest,
  ];
}

const DUAL_ACTION_ALTS: CleanAlternative[] = [
  {
    productId: 'equate-ibuprofen-dye-free',
    rankReason:
      'Best Caution ibuprofen analog in this batch — no Clean dual-action combo exists here',
  },
  {
    productId: 'genexa-acetaminophen-es',
    rankReason: 'Clean acetaminophen analog for the APAP half of the combo',
  },
];

const L484_INACTIVES: IngredientFlag[] = [
  flag(
    'Polyethylene glycol',
    'moderate',
    dailymed('2ea98f5b-6594-dafb-e063-6394a90a0e3f', METH.peg),
  ),
  flag('Hypromellose', 'cleared', METH.cleared),
  flag('Povidone', 'cleared', METH.cleared),
  flag('Stearic acid', 'cleared', METH.cleared),
  flag('Carnauba wax', 'cleared', METH.cleared),
];

const L484_NOTE =
  'LNK L484 extra-strength acetaminophen family — oral PEG is Moderate (2 pts) → Caution. These store brands share inactives and formulaId; pack sizes are not graded separately. Some of the same retailers also sell dyed / titanium-dioxide ES SKUs under similar names — confirm the L484 / PEG list on the bottle.';

function l484Record(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
  barcode?: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: PAIN_FEVER,
    ...(opts.barcode ? { barcode: opts.barcode } : {}),
    formulaId: 'apap-store-es-l484-peg',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: L484_INACTIVES.map((item) =>
      item.name === 'Polyethylene glycol'
        ? { ...item, source: dailymed(opts.setid, METH.peg) }
        : item,
    ),
    verdict: 'caution',
    honestNote: L484_NOTE,
    retailers: opts.retailers,
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (L484 PEG family; draft, not verified)`,
    ],
  };
}

const DYE_FREE_IBU_INACTIVES: IngredientFlag[] = [
  flag(
    'Silicon dioxide (colloidal)',
    'cleared',
    dailymed('23cb5001-6aeb-434a-b2e8-aaf8bbab9dc6', METH.sio2),
  ),
  flag(
    'Polyethylene glycol',
    'moderate',
    dailymed('23cb5001-6aeb-434a-b2e8-aaf8bbab9dc6', METH.peg),
  ),
  flag('Hypromellose', 'cleared', METH.cleared),
  flag('Microcrystalline cellulose', 'cleared', METH.cleared),
  flag('Povidone', 'cleared', METH.cleared),
  flag('Stearic acid', 'cleared', METH.cleared),
];

const DYE_FREE_IBU_NOTE =
  'Dye-free LNK 44-438 family. Silicon dioxide is a nanoparticle Caution cap (0 demerit points); oral PEG is Moderate (2 pts). Combined product verdict is Caution — there is no Clean adult ibuprofen in this batch. Polydextrose and triacetin appear on the label and are not in the Methodology §5 table — flagged for later intake, not graded on the spot (v1.6).';

function dyeFreeIbuRecord(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
  barcode?: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: PAIN_FEVER,
    ...(opts.barcode ? { barcode: opts.barcode } : {}),
    formulaId: 'ibu-dye-free-lnk-44438',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: DYE_FREE_IBU_INACTIVES.map((item) =>
      item.riskLevel === 'cleared' && item.name.startsWith('Silicon')
        ? { ...item, source: dailymed(opts.setid, METH.sio2) }
        : item.name === 'Polyethylene glycol'
          ? { ...item, source: dailymed(opts.setid, METH.peg) }
          : item,
    ),
    verdict: 'caution',
    honestNote: DYE_FREE_IBU_NOTE,
    retailers: opts.retailers,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (LNK 44-438 dye-free IBU; draft, not verified)`,
    ],
  };
}

export const BATCH1_ADULT_APAP_IBU: RatingRecord[] = [
  // ── Acetaminophen ──────────────────────────────────────────
  {
    id: 'tylenol-es-caplets',
    productName: 'Tylenol Extra Strength Caplets',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450449092 300450449054 300450449108 300450444271',
    formulaId: 'apap-tylenol-es-caplets',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('bb6533e5-e6a9-488c-b8ab-a6a06e87ede9', METH.tio2),
      ),
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed('bb6533e5-e6a9-488c-b8ab-a6a06e87ede9', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('bb6533e5-e6a9-488c-b8ab-a6a06e87ede9', METH.peg),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('bb6533e5-e6a9-488c-b8ab-a6a06e87ede9', METH.pg),
      ),
      flag(
        'Castor oil',
        'cleared',
        dailymed('bb6533e5-e6a9-488c-b8ab-a6a06e87ede9', METH.castor),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Coated Extra Strength caplets. Titanium dioxide and FD&C Red 40 lake are each High-tier. If the goal is a cleaner adult 500 mg acetaminophen, look at the Clean rows in this batch — not this coating.',
    retailers: [
      'Walmart',
      'Target',
      'CVS',
      'Walgreens',
      'Costco',
      "Sam's Club",
      'Safeway',
      'Whole Foods',
    ],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid bb6533e5-e6a9-488c-b8ab-a6a06e87ede9 (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-es-rapid-release-gels',
    productName: 'Tylenol Extra Strength Rapid Release Gels',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450488268 300450488282 300450488305',
    formulaId: 'apap-tylenol-es-rr-gels',
    audience: ADULT,
    minAge: 12,
    form: 'gelcap',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('201b860d-dc3c-4380-affa-e757bf2103cf', METH.tio2),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('201b860d-dc3c-4380-affa-e757bf2103cf', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('201b860d-dc3c-4380-affa-e757bf2103cf', METH.dyes),
      ),
      flag(
        'D&C Yellow No. 10',
        'high',
        dailymed('201b860d-dc3c-4380-affa-e757bf2103cf', METH.dyes),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('201b860d-dc3c-4380-affa-e757bf2103cf', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('201b860d-dc3c-4380-affa-e757bf2103cf', METH.parabens),
      ),
      flag(
        'Butylparaben',
        'high',
        dailymed('201b860d-dc3c-4380-affa-e757bf2103cf', METH.parabens),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Rapid-release gelcaps. Brand label lists synthetic dyes, parabens, and titanium dioxide — any one is High-tier. Dual-action / gel / rapid-release Avoid rows stay.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid 201b860d-dc3c-4380-affa-e757bf2103cf; Tylenol.com Rapid Release Gels inactive list (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-es-liquid-gels',
    productName: 'Tylenol Extra Strength Liquid Gels',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450439185 300450439406',
    formulaId: 'apap-tylenol-es-liquid-gels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('3bb7dc60-97b2-1291-e063-6294a90a26d9', METH.tio2),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('3bb7dc60-97b2-1291-e063-6294a90a26d9', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('3bb7dc60-97b2-1291-e063-6294a90a26d9', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('3bb7dc60-97b2-1291-e063-6294a90a26d9', METH.peg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Liquid gels. Titanium dioxide plus Red 40 / Yellow 6 — High-tier dyes. Gel / rapid-release Avoid rows stay.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid 3bb7dc60-97b2-1291-e063-6294a90a26d9 (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-rs-tablets-plain',
    productName: 'Tylenol Regular Strength Tablets',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450496607',
    formulaId: 'apap-tylenol-rs-plain',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_325,
    inactiveIngredients: [
      flag(
        'Magnesium stearate',
        'cleared',
        dailymed('1622f694-4d63-4c56-8737-fae31f0ecfb7', METH.cleared),
      ),
      flag(
        'Powdered cellulose',
        'cleared',
        dailymed('1622f694-4d63-4c56-8737-fae31f0ecfb7', METH.cleared),
      ),
      flag(
        'Pregelatinized / modified starch',
        'cleared',
        dailymed('1622f694-4d63-4c56-8737-fae31f0ecfb7', METH.cleared),
      ),
      flag(
        'Sodium starch glycolate',
        'cleared',
        dailymed('1622f694-4d63-4c56-8737-fae31f0ecfb7', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'Uncoated Regular Strength tablets — no titanium dioxide, dyes, or PEG on this SPL. Do not confuse with coated Regular Strength caplets (separate Avoid formula). DailyMed directions include ages 6 to under 12, so minAge is 6; this batch is still the adult SKU (audience remains adult).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens', 'Safeway'],
    sourcesGeneral: [
      'DailyMed setid 1622f694-4d63-4c56-8737-fae31f0ecfb7 (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-rs-caplets',
    productName: 'Tylenol Regular Strength Caplets (coated)',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: 'apap-tylenol-rs-coated',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_325,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('01f41fae-4abb-4b96-ab09-a7d3dfc286cd', METH.tio2),
      ),
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed('01f41fae-4abb-4b96-ab09-a7d3dfc286cd', METH.dyes),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Coated Regular Strength caplets — different formula from the uncoated RS tablets. Titanium dioxide and Red 40 lake are High-tier. If the bottle is the plain white tablet, that is the Clean RS row, not this one.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: RS_COATED_ALTS,
    sourcesGeneral: [
      'DailyMed setid 01f41fae-4abb-4b96-ab09-a7d3dfc286cd (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-8hr-peg',
    productName: 'Tylenol 8 HR Arthritis / Muscle Pain (PEG-only, no TiO2)',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450838216',
    formulaId: 'apap-tylenol-8hr-peg',
    audience: ADULT,
    minAge: 12,
    form: 'ER caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_650,
    inactiveIngredients: [
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('0391963c-022d-1433-e063-6294a90aac90', METH.peg),
      ),
      flag(
        'Hypromellose',
        'cleared',
        dailymed('0391963c-022d-1433-e063-6294a90aac90', METH.cleared),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        dailymed('0391963c-022d-1433-e063-6294a90aac90', METH.cleared),
      ),
      flag(
        'Povidone',
        'cleared',
        dailymed('0391963c-022d-1433-e063-6294a90aac90', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'PEG-only 8 HR formula — oral PEG is Moderate → Caution; no titanium dioxide on this SPL. Another 8 HR SPL contains titanium dioxide and is a separate Avoid formula (tylenol-8hr-tio2). Confirm the inactive list on the bottle before treating this as the PEG-only version.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens', 'Costco'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid 0391963c-022d-1433-e063-6294a90aac90 (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-8hr-tio2',
    productName: 'Tylenol 8 HR Arthritis Pain (titanium dioxide variant)',
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450838247 300450838377',
    formulaId: 'apap-tylenol-8hr-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'ER caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_650,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('3af22fc8-e4e0-4863-8696-6bc1257047cb', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Separate 8 HR formula from the PEG-only Caution row. Titanium dioxide is High-tier. Confirm the label — both 8 HR SPLs have been in circulation.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid 3af22fc8-e4e0-4863-8696-6bc1257047cb (draft, not verified)',
    ],
  },
  {
    id: 'genexa-acetaminophen-es',
    productName: 'Genexa Acetaminophen Extra Strength',
    brand: 'Genexa',
    category: PAIN_FEVER,
    barcode: '850015736124',
    formulaId: 'apap-genexa-es',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'Maltodextrin',
        'limited',
        dailymed('d6f968ca-719f-5a68-e053-2995a90a4afa', METH.maltodextrin),
      ),
      flag(
        'Sunflower lecithin (organic)',
        'cleared',
        dailymed('d6f968ca-719f-5a68-e053-2995a90a4afa', METH.cleared),
      ),
      flag(
        'Guar gum',
        'cleared',
        dailymed('d6f968ca-719f-5a68-e053-2995a90a4afa', METH.cleared),
      ),
      flag(
        'Acacia (gum arabic)',
        'cleared',
        dailymed('d6f968ca-719f-5a68-e053-2995a90a4afa', METH.cleared),
      ),
      flag(
        'Carnauba wax (organic)',
        'cleared',
        dailymed('d6f968ca-719f-5a68-e053-2995a90a4afa', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER EXCEPTION: maltodextrin is Limited in Methodology §5 (1 pt would normally be Caution). Founder keeps this Clean so there is a recommendable adult acetaminophen. Sunflower oil on this tablet is not the gummy High-tier seed-oil rule. Stay under 4 g/day acetaminophen, same as any APAP.',
    retailers: ['Whole Foods', 'Sprouts', 'Walmart'],
    sourcesGeneral: [
      'DailyMed setid d6f968ca-719f-5a68-e053-2995a90a4afa (draft, not verified)',
    ],
  },
  l484Record({
    id: 'equate-es-pain-reliever',
    productName: 'Equate Extra Strength Pain Reliever (100-ct white bottle)',
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: '2ea98f5b-6594-dafb-e063-6394a90a0e3f',
    // KYR5-c barcode-tile chunk 1 — founder lock white 100-ct bottle.
    // go-upc: Equate 500 mg Extra Strength Acetaminophen Caplets.
    barcode: '194346377084',
  }),
  l484Record({
    id: 'kirkland-acetaminophen-es',
    productName: 'Kirkland Signature Extra Strength Acetaminophen',
    brand: 'Kirkland Signature',
    retailers: ['Costco'],
    setid: 'a9979167-1a82-47d7-9602-2865f9bdd628',
    barcode: '096619383245',
  }),
  l484Record({
    id: 'members-mark-acetaminophen-es',
    productName: "Member's Mark Extra Strength Acetaminophen",
    brand: "Member's Mark",
    retailers: ["Sam's Club"],
    setid: '03e831d4-8060-4633-9d02-e77100063fb4',
  }),
  l484Record({
    id: 'wf-365-acetaminophen-es',
    productName: '365 Whole Foods Market Extra Strength Acetaminophen',
    brand: '365 Whole Foods Market',
    retailers: ['Whole Foods'],
    setid: '57f89574-98e5-40e5-8dd4-e868a668adaa',
    barcode: '099482470760',
  }),
  l484Record({
    id: 'signature-care-pain-relief-apap',
    productName: 'Signature Care Extra Strength Pain Relief',
    brand: 'Signature Care',
    retailers: ['Safeway'],
    setid: '917bcd06-6dc6-42b3-80b4-c6746b347261',
    barcode: '321130777434',
  }),
  {
    id: 'cvs-health-es-castor',
    productName: 'CVS Health Extra Strength Acetaminophen (LNK 44-175)',
    brand: 'CVS Health',
    category: PAIN_FEVER,
    barcode: '050428276136',
    formulaId: 'apap-cvs-es-castor-lnk-44175',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'Castor oil',
        'cleared',
        dailymed('afacdc0b-fb65-464e-91b8-e82ba7ecde44', METH.castor),
      ),
      flag(
        'Hypromellose',
        'cleared',
        dailymed('afacdc0b-fb65-464e-91b8-e82ba7ecde44', METH.cleared),
      ),
      flag(
        'Povidone',
        'cleared',
        dailymed('afacdc0b-fb65-464e-91b8-e82ba7ecde44', METH.cleared),
      ),
      flag(
        'Sodium starch glycolate',
        'cleared',
        dailymed('afacdc0b-fb65-464e-91b8-e82ba7ecde44', METH.cleared),
      ),
      flag(
        'Starch',
        'cleared',
        dailymed('afacdc0b-fb65-464e-91b8-e82ba7ecde44', METH.cleared),
      ),
      flag(
        'Stearic acid',
        'cleared',
        dailymed('afacdc0b-fb65-464e-91b8-e82ba7ecde44', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'LNK 44-175 film-coated caplet. Castor oil is Cleared. No titanium dioxide, dye, or PEG on this SPL. CVS also sells a Red 40 / titanium-dioxide Extra Strength SKU — that is a different formula and a different row (Avoid). Confirm imprint 44-175 / this inactive list.',
    retailers: ['CVS'],
    sourcesGeneral: [
      'DailyMed setid afacdc0b-fb65-464e-91b8-e82ba7ecde44 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-health-es-red40-tio2',
    productName: 'CVS Health Extra Strength Acetaminophen (coated red)',
    brand: 'CVS Health',
    category: PAIN_FEVER,
    formulaId: 'apap-cvs-es-red40-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed('1fde6487-6682-99a3-e063-6294a90a3670', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('1fde6487-6682-99a3-e063-6294a90a3670', METH.tio2),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('1fde6487-6682-99a3-e063-6294a90a3670', METH.sucralose),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Keep this SEPARATE from the CVS Health 44-175 castor-oil Clean row. Never one row. Red 40 lake and titanium dioxide are High-tier. Confirm the red coated bottle vs. the white 44-175 caplet.',
    retailers: ['CVS'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1fde6487-6682-99a3-e063-6294a90a3670 (draft, not verified)',
    ],
  },
  {
    id: 'walgreens-es-red40-tio2',
    productName: 'Walgreens Extra Strength Pain Reliever (coated, 50-ct)',
    brand: 'Walgreens',
    category: PAIN_FEVER,
    // KYR5-d founder-lock — coated caplets 50-ct. Founder 11-digit
    // 31191701535; go-upc UPC-A is 311917015354 (EAN 0311917015354).
    // 031191701535 is not a valid UPC-A. Not mineral-oil 311917047140 /
    // not gelcaps 31191715425 / not dyes+talc twin.
    barcode: '311917015354',
    formulaId: 'apap-walgreens-es-red40-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        `DailyMed Walgreens coated ES acetaminophen (Red 40 + TiO2 formula); ${METH.dyes}`,
      ),
      flag(
        'Titanium dioxide',
        'high',
        `DailyMed Walgreens coated ES acetaminophen (Red 40 + TiO2 formula); ${METH.tio2}`,
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Walgreens fields more than one Extra Strength coating. This row is the Red 40 + titanium dioxide formula only — different from the mineral-oil Caution SPL and from the multi-dye + talc Avoid SPL. Confirm the inactive list on the bottle.',
    retailers: ['Walgreens'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed Walgreens Extra Strength coated acetaminophen — Red 40 + TiO2 family (draft, not verified; confirm shelf SPL)',
    ],
  },
  {
    id: 'walgreens-es-mineral-oil',
    productName: 'Walgreens Pain Reliever (no-TiO2 mineral-oil SPL)',
    brand: 'Walgreens',
    category: PAIN_FEVER,
    barcode: '311917047140',
    formulaId: 'apap-walgreens-es-mineral-oil',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'Mineral oil',
        'limited',
        dailymed(
          '07d2e322-2465-79e5-e063-6294a90a5ea4',
          'not in Methodology §5 table — v1.6 intake rule: not graded on the spot. Founder hold: product stays Caution until mineral oil is graded. Not Clean.',
        ),
      ),
      flag(
        'Hypromellose',
        'cleared',
        dailymed('07d2e322-2465-79e5-e063-6294a90a5ea4', METH.cleared),
      ),
      flag(
        'Povidone',
        'cleared',
        dailymed('07d2e322-2465-79e5-e063-6294a90a5ea4', METH.cleared),
      ),
      flag(
        'Stearic acid',
        'cleared',
        dailymed('07d2e322-2465-79e5-e063-6294a90a5ea4', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'Founder call: mineral-oil, no-titanium-dioxide Walgreens SPL is Caution until mineral oil is graded — not Clean. Mineral oil is not in the §5 table and was not graded on the spot. Some Walgreens mineral-oil uploads still show titanium dioxide in the structured table; if the physical label lists TiO2, that is a different Avoid formula. Different formulaId from the Red 40 / TiO2 and dyes-talc rows.',
    retailers: ['Walgreens'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid 07d2e322-2465-79e5-e063-6294a90a5ea4 (narrative Drug Facts omit TiO2; draft, not verified — confirm bottle)',
    ],
  },
  {
    id: 'upup-es-red40-tio2',
    productName: 'up&up Extra Strength Acetaminophen',
    brand: 'up&up',
    category: PAIN_FEVER,
    formulaId: 'apap-upup-es-red40-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        `DailyMed / Target up&up Extra Strength coated acetaminophen; ${METH.dyes}`,
      ),
      flag(
        'Titanium dioxide',
        'high',
        `DailyMed / Target up&up Extra Strength coated acetaminophen; ${METH.tio2}`,
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Target up&up extra-strength coated red tablets. Red 40 lake and titanium dioxide are High-tier. Some older up&up ES listings also include talc — if talc is on the bottle, that is still Avoid (talc is High-tier). Not the L484 PEG family.',
    retailers: ['Target'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'Target / DailyMed up&up Extra Strength acetaminophen coated listings (draft, not verified)',
    ],
  },
  {
    id: 'walgreens-es-dyes-talc',
    productName: 'Walgreens Pain Reliever (multi-dye + talc SPL)',
    brand: 'Walgreens',
    category: PAIN_FEVER,
    formulaId: 'apap-walgreens-es-dyes-talc',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_500,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed('40a1b354-9b2e-1cf3-e063-6394a90af113', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed('40a1b354-9b2e-1cf3-e063-6394a90af113', METH.dyes),
      ),
      flag(
        'Talc',
        'high',
        dailymed('40a1b354-9b2e-1cf3-e063-6394a90af113', METH.talc),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('40a1b354-9b2e-1cf3-e063-6394a90af113', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Walgreens 679R / TCL341-style SPL: Red 40 + Yellow 6 + talc + titanium dioxide. Different formulaId from the Red 40 + TiO2-only row and from the mineral-oil Caution row. Confirm the bottle.',
    retailers: ['Walgreens'],
    cleanAlternatives: APAP_500_ALTS,
    sourcesGeneral: [
      'DailyMed setid 40a1b354-9b2e-1cf3-e063-6394a90af113 (draft, not verified)',
    ],
  },

  // ── Ibuprofen ──────────────────────────────────────────────
  {
    id: 'advil-tablets',
    productName: 'Advil Tablets',
    brand: 'Advil',
    category: PAIN_FEVER,
    barcode: '305730150200 305730150309 305730150408 305730154758 305730154895',
    formulaId: 'ibu-advil-tablets',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('3ca752d8-957c-21b4-e063-6294a90a5285', METH.tio2),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('3ca752d8-957c-21b4-e063-6294a90a5285', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('3ca752d8-957c-21b4-e063-6294a90a5285', METH.parabens),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Advil tablets. Titanium dioxide plus methylparaben / propylparaben — each High-tier. No Clean adult ibuprofen in this batch; dye-free store-brand 44-438 is the Caution analog.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens', 'Safeway'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed setid 3ca752d8-957c-21b4-e063-6294a90a5285 (draft, not verified)',
    ],
  },
  {
    id: 'advil-liqui-gels',
    productName: 'Advil Liqui-Gels / Minis',
    brand: 'Advil',
    category: PAIN_FEVER,
    barcode: '305730169400 305730169301 305730169202 305730169899',
    formulaId: 'ibu-advil-liqui-gels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'FD&C Green No. 3',
        'high',
        dailymed('c459ea1e-dabf-bba6-e053-2995a90af40f', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('c459ea1e-dabf-bba6-e053-2995a90af40f', METH.peg),
      ),
      flag(
        'Lecithin (soybean)',
        'cleared',
        dailymed(
          'c459ea1e-dabf-bba6-e053-2995a90af40f',
          `${METH.cleared} — soy-allergy disclosure, not a toxicity flag`,
        ),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Liqui-Gels / Minis. FD&C Green No. 3 is High-tier (PROJECT_NOTES discovery: Advil Liqui-Gels are not clean). Gel Avoid rows stay. Soy lecithin is Cleared with a soy-allergy note only.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed setid c459ea1e-dabf-bba6-e053-2995a90af40f (draft, not verified)',
    ],
  },
  {
    id: 'advil-gel-caplets',
    productName: 'Advil Gel Caplets',
    brand: 'Advil',
    category: PAIN_FEVER,
    barcode: '305730165402',
    formulaId: 'ibu-advil-gel-caplets',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('1a665e64-9f30-be37-4a83-38789f1f1e89', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('1a665e64-9f30-be37-4a83-38789f1f1e89', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('1a665e64-9f30-be37-4a83-38789f1f1e89', METH.propylGallate),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('1a665e64-9f30-be37-4a83-38789f1f1e89', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Gel caplets. Red 40, Yellow 6, propyl gallate, and titanium dioxide are each High-tier. Gel Avoid rows stay.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed setid 1a665e64-9f30-be37-4a83-38789f1f1e89 (draft, not verified)',
    ],
  },
  {
    id: 'motrin-ib-caplets',
    productName: 'Motrin IB',
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450481269 300450481023',
    formulaId: 'ibu-motrin-ib',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed('c2b99756-3e03-4d9f-9ce6-7db879afe3a1', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed('c2b99756-3e03-4d9f-9ce6-7db879afe3a1', METH.dyes),
      ),
      flag(
        'Talc',
        'high',
        dailymed('c2b99756-3e03-4d9f-9ce6-7db879afe3a1', METH.talc),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('c2b99756-3e03-4d9f-9ce6-7db879afe3a1', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Film-coated Motrin IB caplets. Red 40 / Yellow 6 lakes, talc, and titanium dioxide are High-tier.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens', 'Safeway'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed setid c2b99756-3e03-4d9f-9ce6-7db879afe3a1 (draft, not verified)',
    ],
  },
  dyeFreeIbuRecord({
    id: 'equate-ibuprofen-dye-free',
    productName: 'Equate Dye-Free Ibuprofen',
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: '23cb5001-6aeb-434a-b2e8-aaf8bbab9dc6',
    barcode: '681131280174',
  }),
  dyeFreeIbuRecord({
    id: 'cvs-health-ibuprofen-dye-free',
    productName: 'CVS Health Dye-Free Ibuprofen',
    brand: 'CVS Health',
    retailers: ['CVS'],
    setid: '00653b7c-7099-487e-9a01-e89781c21323',
    barcode: '050428164525',
  }),
  dyeFreeIbuRecord({
    id: 'walgreens-ibuprofen-dye-free',
    productName: 'Walgreens Dye-Free Ibuprofen',
    brand: 'Walgreens',
    retailers: ['Walgreens'],
    setid: '8944a0e8-2928-4494-915f-d1e0a6d4bf5c',
    barcode: '311917089324',
  }),
  {
    id: 'equate-ibuprofen-standard',
    productName: 'Equate Ibuprofen (standard, not dye-free)',
    brand: 'Equate',
    category: PAIN_FEVER,
    barcode: '681131700214',
    formulaId: 'ibu-equate-standard',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('307b0257-d636-416b-828a-f901782e9b10', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Standard Equate ibuprofen (not the dye-free 44-438 SKU). Titanium dioxide is High-tier. Prefer the Equate dye-free row in this batch if the goal is a closer store-brand analog.',
    retailers: ['Walmart'],
    cleanAlternatives: ibuAlts('equate-ibuprofen-dye-free'),
    sourcesGeneral: [
      'DailyMed setid 307b0257-d636-416b-828a-f901782e9b10 (draft, not verified)',
    ],
  },
  {
    id: 'kirkland-ibuprofen-tablets',
    productName: 'Kirkland Signature Ibuprofen Tablets',
    brand: 'Kirkland Signature',
    category: PAIN_FEVER,
    barcode: '096619355402',
    formulaId: 'ibu-kirkland-tablets',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('65d8d650-9afc-44f7-9409-a3aa3014d4ab', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Kirkland ibuprofen tablets. Titanium dioxide is High-tier. Different formula from Kirkland IB caplets (dyes + talc + TiO2). No Kirkland dye-free SKU in this batch — dye-free 44-438 store brands are the Caution analog.',
    retailers: ['Costco'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed setid 65d8d650-9afc-44f7-9409-a3aa3014d4ab (draft, not verified)',
    ],
  },
  {
    id: 'kirkland-ibuprofen-ib-caplets',
    productName: 'Kirkland Signature Ibuprofen IB Caplets',
    brand: 'Kirkland Signature',
    category: PAIN_FEVER,
    barcode: '096619621590',
    formulaId: 'ibu-kirkland-ib-caplets',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed('2fee0f32-0bc7-4d98-b5d4-5a7dad1c2a2c', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed('2fee0f32-0bc7-4d98-b5d4-5a7dad1c2a2c', METH.dyes),
      ),
      flag(
        'Talc',
        'high',
        dailymed('2fee0f32-0bc7-4d98-b5d4-5a7dad1c2a2c', METH.talc),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('2fee0f32-0bc7-4d98-b5d4-5a7dad1c2a2c', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Kirkland IB caplets — different formulaId from Kirkland tablets. Dyes + talc + titanium dioxide are High-tier.',
    retailers: ['Costco'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed setid 2fee0f32-0bc7-4d98-b5d4-5a7dad1c2a2c (draft, not verified)',
    ],
  },
  {
    id: 'upup-ibuprofen',
    productName: 'up&up Ibuprofen',
    brand: 'up&up',
    category: PAIN_FEVER,
    barcode: '370030620593',
    formulaId: 'ibu-upup',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('2919fe8b-9c76-4ef6-851e-3247782cef44', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Target up&up ibuprofen. Titanium dioxide is High-tier. No Target dye-free IBU in this batch — 44-438 store-brand dye-free is the Caution analog.',
    retailers: ['Target'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed setid 2919fe8b-9c76-4ef6-851e-3247782cef44 (draft, not verified)',
    ],
  },
  {
    id: 'signature-care-ibuprofen',
    productName: 'Signature Care Ibuprofen',
    brand: 'Signature Care',
    category: PAIN_FEVER,
    formulaId: 'ibu-signature-care',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        `DailyMed Signature Care Ibuprofen 200 mg; ${METH.tio2}`,
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Signature Care ibuprofen. Titanium dioxide is High-tier. No Safeway dye-free IBU in this batch — 44-438 store-brand dye-free is the Caution analog.',
    retailers: ['Safeway'],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      'DailyMed Signature Care Ibuprofen 200 mg (draft, not verified)',
    ],
  },
  {
    id: 'members-mark-ibuprofen',
    productName: "Member's Mark Ibuprofen",
    brand: "Member's Mark",
    category: PAIN_FEVER,
    formulaId: 'ibu-members-mark',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_200,
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        `DailyMed Member's Mark Ibuprofen 200 mg; ${METH.tio2}`,
      ),
    ],
    verdict: 'avoid',
    honestNote:
      "Member's Mark ibuprofen. Titanium dioxide is High-tier; some lots / related LNK brown tablets also list talc — if talc is on the bottle that is still Avoid. No Sam's Club dye-free IBU in this batch.",
    retailers: ["Sam's Club"],
    cleanAlternatives: ibuAlts(),
    sourcesGeneral: [
      "DailyMed Member's Mark Ibuprofen 200 mg (draft, not verified)",
    ],
  },
  {
    id: 'advil-dual-action',
    productName: 'Advil Dual Action with Acetaminophen',
    brand: 'Advil',
    category: PAIN_FEVER,
    barcode: '305730147361 305730147729 305730147187 305730147941',
    formulaId: 'apap-ibu-advil-dual-action',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Ibuprofen', strength: '125mg' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('bd0d7812-4e42-b533-e053-2995a90ae1f9', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dual-action Avoid row stays. Titanium dioxide is High-tier. This batch has no Clean combo product — listed swaps are single-active analogs only, not a 250/125 replacement.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: DUAL_ACTION_ALTS,
    sourcesGeneral: [
      'DailyMed setid bd0d7812-4e42-b533-e053-2995a90ae1f9 (draft, not verified)',
    ],
  },
];

// Verdict tally (33 records): Clean 3 · Caution 10 · Avoid 20
// APAP 19 (Clean 3 / Caution 7 / Avoid 9) · IBU 14 (Clean 0 / Caution 3 / Avoid 11)
