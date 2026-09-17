// DRAFT / not verified / batch 2 kids APAP + IBU
// Pain & Fever · audience 'kids' · recordStatus is 'unverified' on every row.
// Founder calls (locked): Genexa Kids liquid + Genexa Infants liquid = Clean;
// Genexa Kids chewables = Caution (maltodextrin) — do NOT extend the adult
// Genexa ES Clean exception. Dye-free traps and dyed nationals/store brands = Avoid.
// No Clean kids ibuprofen in this batch — that is expected.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Homeopathic subtype omitted. Barcodes omitted — do not invent UPCs.
// Pack sizes share formulaId / same verdict. Not wired into Clean Picks UI.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const PAIN_FEVER = 'Pain & Fever';
const KIDS = 'kids' as const;

const APAP_160_5 = [{ name: 'Acetaminophen', strength: '160mg / 5mL' }];
const APAP_80 = [{ name: 'Acetaminophen', strength: '80mg' }];
const APAP_160_CHEW = [{ name: 'Acetaminophen', strength: '160mg' }];
const IBU_100_5 = [{ name: 'Ibuprofen', strength: '100mg / 5mL' }];
const IBU_100 = [{ name: 'Ibuprofen', strength: '100mg' }];
const IBU_50_125 = [{ name: 'Ibuprofen', strength: '50mg / 1.25mL' }];

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B; locked Avoid, §0 override)',
  caramel:
    'Methodology §5 High-tier (caramel color, undisclosed class — treated as Class III/IV)',
  bht: 'Methodology §5 High-tier (BHT — locked v1.6)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  carrageenan: 'Methodology §5 Limited-risk (carrageenan)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  cleared: 'Methodology §5 Cleared',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors)',
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

const KIDS_APAP_LIQUID_ALT: CleanAlternative[] = [
  {
    productId: 'genexa-kids-apap-liquid',
    rankReason:
      'Closest independently Clean kids acetaminophen liquid (ages 2+); same Pain & Fever use-category. Form: liquid.',
  },
];

const KIDS_APAP_LIQUID_FROM_CHEW: CleanAlternative[] = [
  {
    productId: 'genexa-kids-apap-liquid',
    rankReason:
      'Closest independently Clean kids acetaminophen (ages 2+). Form is liquid, not chewable — form is labeled, not a hard filter (§6).',
  },
];

const INFANTS_APAP_LIQUID_ALT: CleanAlternative[] = [
  {
    productId: 'genexa-infants-apap-liquid',
    rankReason:
      'Closest independently Clean infant-labeled acetaminophen liquid; age-matched infant swap. Form: liquid.',
  },
];

const KIDS_IBU_TO_APAP_ALT: CleanAlternative[] = [
  {
    productId: 'genexa-kids-apap-liquid',
    rankReason:
      'No Clean kids ibuprofen in this batch. Closest Clean Pain & Fever option is acetaminophen (ibuprofen → acetaminophen), ages 2+, liquid. Different active — same use-category, age-matched.',
  },
];

const INFANTS_IBU_TO_APAP_ALT: CleanAlternative[] = [
  {
    productId: 'genexa-infants-apap-liquid',
    rankReason:
      'No Clean infant ibuprofen in this batch. Closest Clean Pain & Fever option is acetaminophen (ibuprofen → acetaminophen), infant-labeled liquid. Different active — same use-category, age-matched.',
  },
];

const JUNIOR_IBU_TO_APAP_ALT: CleanAlternative[] = [
  {
    productId: 'genexa-kids-apap-liquid',
    rankReason:
      'No Clean kids ibuprofen. Closest Clean Pain & Fever analog is Genexa Kids acetaminophen liquid (minAge 2 — allowed as a lower-minimum swap for this 6+ junior product). Different active (ibuprofen → acetaminophen). Form: liquid, not chewable.',
  },
];

function storeChildrenApapDyed(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
  dyeNames: string[];
  barcode?: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: PAIN_FEVER,
    ...(opts.barcode ? { barcode: opts.barcode } : {}),
    formulaId: 'store-children-apap-dyed-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      ...opts.dyeNames.map((name) =>
        flag(name, 'high', dailymed(opts.setid, METH.dyes)),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed(opts.setid, METH.pg),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(opts.setid, METH.benzoate),
      ),
      flag('Sorbitol', 'limited', dailymed(opts.setid, METH.sorbitol)),
      flag('Flavor', 'limited', dailymed(opts.setid, METH.flavors)),
    ],
    verdict: 'avoid',
    honestNote:
      'Store-brand children dyed APAP family (Perrigo-style). Synthetic dyes are High-tier; oral PG is Moderate. High-fructose corn syrup appears on these labels and is mentioned only as present — HFCS is parked / ungraded (Methodology §5). Do not treat this note as a new HFCS lock. Pack sizes share this formulaId.',
    retailers: opts.retailers,
    cleanAlternatives: KIDS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (store children dyed APAP liquid family; draft, not verified)`,
    ],
  };
}

function storeInfantsApapDyefree(opts: {
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
    formulaId: 'store-infants-apap-dyefree-liquid',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(opts.setid, METH.sucralose)),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed(opts.setid, METH.pg),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(opts.setid, METH.benzoate),
      ),
      flag('Sorbitol', 'limited', dailymed(opts.setid, METH.sorbitol)),
      flag('Flavor', 'limited', dailymed(opts.setid, METH.flavors)),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — infant store-brand APAP. Removing the dye does not clear sucralose + oral PG (2+2 → Avoid). Infant-labeled; dosing charts often start at ages 2–3 / ask a doctor under 2. Prefer Genexa Infants liquid, not the 2+ Kids bottle.',
    retailers: opts.retailers,
    cleanAlternatives: INFANTS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (store infants dye-free APAP liquid family; draft, not verified)`,
    ],
  };
}

function storeChildrenIbuDyedLiquid(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
  dyeNames: string[];
  barcode?: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: PAIN_FEVER,
    ...(opts.barcode ? { barcode: opts.barcode } : {}),
    formulaId: 'store-children-ibu-dyed-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100_5,
    inactiveIngredients: [
      ...opts.dyeNames.map((name) =>
        flag(name, 'high', dailymed(opts.setid, METH.dyes)),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed(opts.setid, METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(opts.setid, METH.benzoate),
      ),
      flag('Sorbitol', 'limited', dailymed(opts.setid, METH.sorbitol)),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed(opts.setid, METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Store-brand children dyed IBU suspension family. Dyes are High-tier. HFCS is on these labels and is parked / ungraded — Avoid already stands on dyes + PS80 + benzoate + sorbitol. No Clean kids IBU; listed swap is acetaminophen.',
    retailers: opts.retailers,
    cleanAlternatives: KIDS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (store children dyed IBU liquid family; draft, not verified)`,
    ],
  };
}

function storeChildrenIbuDyedChew(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: PAIN_FEVER,
    formulaId: 'store-children-ibu-dyed-chew',
    audience: KIDS,
    minAge: 2,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100,
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(opts.setid, METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(opts.setid, METH.dyes),
      ),
      flag('Aspartame', 'high', dailymed(opts.setid, METH.aspartame)),
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed(opts.setid, METH.acek),
      ),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed(opts.setid, METH.flavors),
      ),
      flag('Mannitol', 'limited', dailymed(opts.setid, METH.mannitol)),
    ],
    verdict: 'avoid',
    honestNote:
      'Store-brand children dyed IBU chewable family (grape L521-style). Aspartame and lake dyes are each High-tier. Soybean oil here is a chewable tablet excipient, not the gummy High-tier seed-oil rule. Form of the Clean swap is liquid.',
    retailers: opts.retailers,
    cleanAlternatives: [
      {
        productId: 'genexa-kids-apap-liquid',
        rankReason:
          'No Clean kids ibuprofen. Closest Clean Pain & Fever analog is Genexa Kids acetaminophen liquid (ibuprofen → acetaminophen). Form: liquid, not chewable.',
      },
    ],
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (store children dyed IBU chew family; draft, not verified)`,
    ],
  };
}

export const BATCH2_KIDS_APAP_IBU: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: 'genexa-kids-apap-liquid',
    productName: "Genexa Kids' Pain & Fever",
    brand: 'Genexa',
    category: PAIN_FEVER,
    barcode: '857630006878',
    formulaId: 'genexa-kids-apap-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        dailymed('5130c695-a80e-2dd3-e063-6294a90a404f', METH.organicFlavor),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        dailymed('5130c695-a80e-2dd3-e063-6294a90a404f', METH.organicFlavor),
      ),
      flag(
        'Natural flavors',
        'cleared',
        dailymed(
          '5130c695-a80e-2dd3-e063-6294a90a404f',
          'Founder call: this liquid stays Clean. Organic flavors / agave are Cleared; do not demerit the accompanying "natural flavors" line on this SKU.',
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('5130c695-a80e-2dd3-e063-6294a90a404f', METH.cleared),
      ),
      flag(
        'Sodium bicarbonate (may contain)',
        'cleared',
        dailymed('5130c695-a80e-2dd3-e063-6294a90a404f', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: draft Clean. Organic agave + organic flavors. Cherry and blueberry flavor SPLs share this clean inactive pattern (same formulaId; pack sizes not graded separately). Ages 2+. Always dose by weight.',
    retailers: ['Whole Foods', 'Sprouts', 'Walmart'],
    sourcesGeneral: [
      'DailyMed setid 5130c695-a80e-2dd3-e063-6294a90a404f (blueberry); 5a615118-33c9-1520-e063-6394a90a21a6 (cherry) — draft, not verified',
    ],
  },
  {
    id: 'genexa-infants-apap-liquid',
    productName: "Genexa Infants' Pain & Fever",
    brand: 'Genexa',
    category: PAIN_FEVER,
    barcode: '850015736216',
    formulaId: 'genexa-infants-apap-liquid',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        dailymed('4fd048c3-70bc-2ea7-e063-6394a90a55f2', METH.organicFlavor),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        dailymed('4fd048c3-70bc-2ea7-e063-6394a90a55f2', METH.organicFlavor),
      ),
      flag(
        'Natural flavors',
        'cleared',
        dailymed(
          '4fd048c3-70bc-2ea7-e063-6394a90a55f2',
          'Founder call: this infant liquid stays Clean, same inactive pattern as Kids liquid.',
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('4fd048c3-70bc-2ea7-e063-6394a90a55f2', METH.cleared),
      ),
      flag(
        'Sodium bicarbonate (may contain)',
        'cleared',
        dailymed('4fd048c3-70bc-2ea7-e063-6394a90a55f2', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: draft Clean. Infant-labeled acetaminophen liquid (minAge 0 — marketed for infants; confirm the dosing chart / ask-a-doctor under 2 on the bottle). Not a swap for 2+ kids products. Same organic agave / organic flavor pattern as the Kids liquid.',
    retailers: ['Whole Foods', 'Sprouts', 'Walmart'],
    sourcesGeneral: [
      'DailyMed setid 4fd048c3-70bc-2ea7-e063-6394a90a55f2 (draft, not verified)',
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'genexa-kids-apap-chewable',
    productName: "Genexa Kids' / Children's Acetaminophen Chewables",
    brand: 'Genexa',
    category: PAIN_FEVER,
    barcode: '850015736100',
    formulaId: 'genexa-kids-apap-chewable',
    audience: KIDS,
    minAge: 2,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_80,
    inactiveIngredients: [
      flag(
        'Maltodextrin',
        'limited',
        dailymed('091dd1e7-2484-cdbf-e063-6394a90a2189', METH.maltodextrin),
      ),
      flag(
        'Xylitol',
        'limited',
        dailymed('091dd1e7-2484-cdbf-e063-6394a90a2189', METH.xylitol),
      ),
      flag(
        'Organic stevia rebaudiana leaf extract',
        'cleared',
        dailymed('091dd1e7-2484-cdbf-e063-6394a90a2189', METH.cleared),
      ),
      flag(
        'Organic sunflower lecithin',
        'cleared',
        dailymed('091dd1e7-2484-cdbf-e063-6394a90a2189', METH.cleared),
      ),
      flag(
        'Organic guar gum / acacia',
        'cleared',
        dailymed('091dd1e7-2484-cdbf-e063-6394a90a2189', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: draft Caution for maltodextrin (Limited). The adult Genexa Extra Strength Clean founder exception does NOT apply to this chewable. Xylitol is also Limited (oral) — still Caution, not Avoid. Palm olein / dibehenin / glycerin are not in the §5 table and were not graded on the spot (v1.6 intake).',
    retailers: ['Whole Foods', 'Sprouts', 'Walmart'],
    cleanAlternatives: KIDS_APAP_LIQUID_FROM_CHEW,
    sourcesGeneral: [
      'DailyMed setid 091dd1e7-2484-cdbf-e063-6394a90a2189; d89fd9d8-d88e-3968-e053-2a95a90afc5f (draft, not verified)',
    ],
  },

  // ── Avoid APAP — nationals ───────────────────────────────
  {
    id: 'tylenol-children-liquid-dyed',
    productName: "Children's Tylenol Oral Suspension (dyed)",
    brand: 'Tylenol',
    category: PAIN_FEVER,
    formulaId: 'tylenol-children-liquid-dyed',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('a51c2deb-c703-4dc8-9255-8ac9fe635170', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('a51c2deb-c703-4dc8-9255-8ac9fe635170', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('a51c2deb-c703-4dc8-9255-8ac9fe635170', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('a51c2deb-c703-4dc8-9255-8ac9fe635170', METH.sorbitol),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('a51c2deb-c703-4dc8-9255-8ac9fe635170', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Standard dyed Children\'s Tylenol suspension (cherry SPL cited; grape / bubblegum / strawberry use other FD&C/D&C dyes on the same sucralose + benzoate + sorbitol pattern). HFCS is on the dyed liquids and is parked / ungraded. Ages 2–11.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens', 'Safeway'],
    cleanAlternatives: KIDS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      'DailyMed setid a51c2deb-c703-4dc8-9255-8ac9fe635170; Tylenol.com Children\'s Oral Suspension inactive lists (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-children-liquid-dyefree',
    productName: "Children's Tylenol Dye-Free Oral Suspension",
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450166081',
    formulaId: 'tylenol-children-liquid-dyefree',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('46ddbfde-54ab-4373-b832-b9c0620b1e9d', METH.sucralose),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('46ddbfde-54ab-4373-b832-b9c0620b1e9d', METH.sorbitol),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed('46ddbfde-54ab-4373-b832-b9c0620b1e9d', METH.sorbate),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('46ddbfde-54ab-4373-b832-b9c0620b1e9d', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap. No FD&C dye — still Avoid on sucralose + sorbitol + potassium sorbate. Cherry and apple dye-free SPLs share this inactive list.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: KIDS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      'DailyMed setid 46ddbfde-54ab-4373-b832-b9c0620b1e9d (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-infants-liquid-dyed',
    productName: "Infants' Tylenol Oral Suspension (dyed)",
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450186607',
    formulaId: 'tylenol-infants-liquid-dyed',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('997b9551-c222-4a9c-8ba1-09a5f97495fa', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('997b9551-c222-4a9c-8ba1-09a5f97495fa', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('997b9551-c222-4a9c-8ba1-09a5f97495fa', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('997b9551-c222-4a9c-8ba1-09a5f97495fa', METH.sorbitol),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('997b9551-c222-4a9c-8ba1-09a5f97495fa', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Infant-labeled dyed suspension (cherry Red 40 SPL cited; grape uses D&C Red 33 + Blue 1 on the same sucralose pattern). HFCS present, parked / ungraded. Prefer Genexa Infants liquid, not the 2+ Kids bottle.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: INFANTS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      'DailyMed setid 997b9551-c222-4a9c-8ba1-09a5f97495fa; 2143cc16-86db-4060-96da-5c228ae9207b grape (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-infants-liquid-dyefree',
    productName: "Infants' Tylenol Dye-Free Oral Suspension",
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450146021',
    formulaId: 'tylenol-infants-liquid-dyefree',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('4a121a53-dbae-05c7-e063-6294a90aed89', METH.sucralose),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('4a121a53-dbae-05c7-e063-6294a90aed89', METH.sorbitol),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed('4a121a53-dbae-05c7-e063-6294a90aed89', METH.sorbate),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('4a121a53-dbae-05c7-e063-6294a90aed89', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — same sucralose + sorbitol + potassium sorbate stack as Children\'s dye-free, infant-labeled. Prefer Genexa Infants liquid.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: INFANTS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      'DailyMed setid 4a121a53-dbae-05c7-e063-6294a90aed89 (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-children-chew-dyefree',
    productName: "Children's Tylenol Dye-Free Chewables / Meltaways",
    brand: 'Tylenol',
    category: PAIN_FEVER,
    barcode: '300450156242',
    formulaId: 'tylenol-children-chew-dyefree',
    audience: KIDS,
    minAge: 2,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_CHEW,
    inactiveIngredients: [
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed('3a935584-6045-0a58-e063-6394a90a40c4', METH.acek),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('3a935584-6045-0a58-e063-6394a90a40c4', METH.sucralose),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('3a935584-6045-0a58-e063-6394a90a40c4', METH.mannitol),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('3a935584-6045-0a58-e063-6394a90a40c4', METH.maltodextrin),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('3a935584-6045-0a58-e063-6394a90a40c4', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — Ace-K + sucralose chewable / meltaway formula. Clean swap is Genexa Kids liquid (form labeled).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: KIDS_APAP_LIQUID_FROM_CHEW,
    sourcesGeneral: [
      'DailyMed setid 3a935584-6045-0a58-e063-6394a90a40c4; Tylenol.com Dye-Free Chewables (draft, not verified)',
    ],
  },

  // ── Avoid APAP — store families ──────────────────────────
  storeChildrenApapDyed({
    id: 'equate-children-apap-dyed',
    productName: "Equate Children's Pain & Fever (dyed liquid)",
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: '40eedfe9-54e1-40a2-b4a2-55ff708b89cd',
    dyeNames: ['D&C Red No. 33', 'FD&C Red No. 40'],
    barcode: '681131699723',
  }),
  storeChildrenApapDyed({
    id: 'upup-children-apap-dyed',
    productName: 'up&up Children\'s Acetaminophen (dyed liquid)',
    brand: 'up&up',
    retailers: ['Target'],
    setid: '9c3ba4dd-f51b-46ce-91b8-8b617c7b78da',
    dyeNames: ['D&C Red No. 33', 'FD&C Red No. 40'],
  }),
  storeChildrenApapDyed({
    id: 'signature-care-children-apap-dyed',
    productName: "Signature Care Children's Pain Relief (dyed liquid)",
    brand: 'Signature Care',
    retailers: ['Safeway'],
    setid: 'fccb5aca-5707-491f-beb4-08f568919169',
    dyeNames: ['FD&C Red No. 40'],
  }),
  storeInfantsApapDyefree({
    id: 'equate-infants-apap-dyefree',
    productName: "Equate Infants' Pain & Fever Dye-Free",
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: '34b2512e-743b-45db-92cb-ea05e2f47b3d',
  }),
  storeInfantsApapDyefree({
    id: 'upup-infants-apap-dyefree',
    productName: 'up&up Infants\' Acetaminophen Dye-Free',
    brand: 'up&up',
    retailers: ['Target'],
    setid: 'c1dd8330-fb6b-4d1f-9484-c199dc69214d',
    barcode: '370030623631',
  }),
  storeInfantsApapDyefree({
    id: 'signature-care-infants-apap-dyefree',
    productName: "Signature Care Infants' Pain Relief Dye-Free",
    brand: 'Signature Care',
    retailers: ['Safeway'],
    setid: '236df05a-cf11-42f3-a347-b54f5113680c',
    barcode: '321130076834',
  }),
  {
    id: 'upup-children-apap-dyefree',
    productName: 'up&up Children\'s Acetaminophen Dye-Free Liquid',
    brand: 'up&up',
    category: PAIN_FEVER,
    formulaId: 'upup-children-apap-dyefree-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('e2989ead-7fdc-4295-bf94-423195775670', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('e2989ead-7fdc-4295-bf94-423195775670', METH.pg),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('e2989ead-7fdc-4295-bf94-423195775670', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('e2989ead-7fdc-4295-bf94-423195775670', METH.sorbitol),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('e2989ead-7fdc-4295-bf94-423195775670', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — children\'s (2+) up&up APAP liquid. Distinct formulaId from the dyed store family and from the infant dye-free family even though inactives look similar. Sucralose + PG. Prefer Genexa Kids liquid, not the infant bottle.',
    retailers: ['Target'],
    cleanAlternatives: KIDS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      'DailyMed setid e2989ead-7fdc-4295-bf94-423195775670 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-children-apap-dyed',
    productName: 'CVS Children\'s Pain + Fever (dyed liquid)',
    brand: 'CVS Health',
    category: PAIN_FEVER,
    formulaId: 'cvs-children-apap-dyed',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: APAP_160_5,
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('22a48a33-995b-481e-9e4e-1ad7ec346f44', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('22a48a33-995b-481e-9e4e-1ad7ec346f44', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('22a48a33-995b-481e-9e4e-1ad7ec346f44', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('22a48a33-995b-481e-9e4e-1ad7ec346f44', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('22a48a33-995b-481e-9e4e-1ad7ec346f44', METH.sorbitol),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('22a48a33-995b-481e-9e4e-1ad7ec346f44', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'CVS Children\'s Pain + Fever dyed grape-style liquid (Red 33 + Blue 1). Separate from the Equate/up&up/Signature Care Perrigo dyed family. CVS also fields other children APAP SPLs (including paraben variants) — confirm the bottle; those would still be Avoid.',
    retailers: ['CVS'],
    cleanAlternatives: KIDS_APAP_LIQUID_ALT,
    sourcesGeneral: [
      'DailyMed setid 22a48a33-995b-481e-9e4e-1ad7ec346f44 (draft, not verified)',
    ],
  },

  // ── Avoid IBU — Motrin nationals ─────────────────────────
  {
    id: 'motrin-children-liquid-dyed',
    productName: "Children's Motrin Oral Suspension (dyed)",
    brand: 'Motrin',
    category: PAIN_FEVER,
    formulaId: 'motrin-children-liquid-dyed',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100_5,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('152189e5-391c-42d3-a03b-c8364e2de6bf', METH.dyes),
      ),
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed('152189e5-391c-42d3-a03b-c8364e2de6bf', METH.acek),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('152189e5-391c-42d3-a03b-c8364e2de6bf', METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('152189e5-391c-42d3-a03b-c8364e2de6bf', METH.benzoate),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('152189e5-391c-42d3-a03b-c8364e2de6bf', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dyed Children\'s Motrin suspension (Red 40 berry SPL cited; grape / bubblegum add other dyes on the same Ace-K + PS80 + benzoate pattern). No Clean kids IBU.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens', 'Safeway'],
    cleanAlternatives: KIDS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid 152189e5-391c-42d3-a03b-c8364e2de6bf (draft, not verified)',
    ],
  },
  {
    id: 'motrin-children-liquid-dyefree',
    productName: "Children's Motrin Dye-Free Oral Suspension",
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450184047',
    formulaId: 'motrin-children-liquid-dyefree',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100_5,
    inactiveIngredients: [
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed('9e1cdef7-921f-4163-869c-6c062e31c5bb', METH.acek),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('9e1cdef7-921f-4163-869c-6c062e31c5bb', METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('9e1cdef7-921f-4163-869c-6c062e31c5bb', METH.benzoate),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('9e1cdef7-921f-4163-869c-6c062e31c5bb', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — Ace-K + PS80 + benzoate. Removing the dye does not clear this liquid.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: KIDS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid 9e1cdef7-921f-4163-869c-6c062e31c5bb (draft, not verified)',
    ],
  },
  {
    id: 'motrin-children-chew-dyefree',
    productName: "Children's Motrin Dye-Free Chewables",
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450932266',
    formulaId: 'motrin-children-chew-dyefree',
    audience: KIDS,
    minAge: 2,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100,
    inactiveIngredients: [
      flag(
        'Aspartame',
        'high',
        dailymed('15b0b56d-6188-4937-b541-902022e35b24', METH.aspartame),
      ),
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed('15b0b56d-6188-4937-b541-902022e35b24', METH.acek),
      ),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed('15b0b56d-6188-4937-b541-902022e35b24', METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('15b0b56d-6188-4937-b541-902022e35b24', METH.mannitol),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed('15b0b56d-6188-4937-b541-902022e35b24', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — aspartame + Ace-K grape chewable. SLS is also on the label (population-specific Caution class, not additive-scored); verdict is already Avoid. Soybean oil is not the gummy seed-oil High-tier rule.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: [
      {
        productId: 'genexa-kids-apap-liquid',
        rankReason:
          'No Clean kids ibuprofen. Closest Clean Pain & Fever analog is Genexa Kids acetaminophen liquid (ibuprofen → acetaminophen). Form: liquid, not chewable.',
      },
    ],
    sourcesGeneral: [
      'DailyMed setid 15b0b56d-6188-4937-b541-902022e35b24 (draft, not verified)',
    ],
  },
  {
    id: 'motrin-children-chew-dyed',
    productName: "Children's Motrin Chewables (dyed)",
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450909268',
    formulaId: 'motrin-children-chew-dyed',
    audience: KIDS,
    minAge: 2,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100,
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed('63ec7636-bf2a-4d52-ab88-fb93d41661ec', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('63ec7636-bf2a-4d52-ab88-fb93d41661ec', METH.dyes),
      ),
      flag(
        'Aspartame',
        'high',
        dailymed('63ec7636-bf2a-4d52-ab88-fb93d41661ec', METH.aspartame),
      ),
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed('63ec7636-bf2a-4d52-ab88-fb93d41661ec', METH.acek),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dyed Children\'s Motrin chewables — lake dyes + aspartame. Same Clean swap as the dye-free chew (liquid acetaminophen).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: [
      {
        productId: 'genexa-kids-apap-liquid',
        rankReason:
          'No Clean kids ibuprofen. Closest Clean Pain & Fever analog is Genexa Kids acetaminophen liquid (ibuprofen → acetaminophen). Form: liquid, not chewable.',
      },
    ],
    sourcesGeneral: [
      'DailyMed setid 63ec7636-bf2a-4d52-ab88-fb93d41661ec (draft, not verified)',
    ],
  },
  {
    id: 'motrin-infants-liquid-dyed',
    productName: "Infants' Motrin Concentrated Drops",
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450524157',
    formulaId: 'motrin-infants-liquid-dyed',
    audience: KIDS,
    minAge: 0,
    form: 'concentrated drops',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_50_125,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('c2302bfe-b367-4867-b803-29f066a42dc7', METH.dyes),
      ),
      flag(
        'Caramel color (undisclosed class)',
        'high',
        dailymed('c2302bfe-b367-4867-b803-29f066a42dc7', METH.caramel),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('c2302bfe-b367-4867-b803-29f066a42dc7', METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('c2302bfe-b367-4867-b803-29f066a42dc7', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('c2302bfe-b367-4867-b803-29f066a42dc7', METH.sorbitol),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('c2302bfe-b367-4867-b803-29f066a42dc7', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Infant-labeled concentrated drops (typically 6–23 months). Red 40 plus undisclosed-class caramel are each High-tier. No Clean infant IBU — listed swap is Genexa Infants acetaminophen (different active, same use-category, age-matched).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: INFANTS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid c2302bfe-b367-4867-b803-29f066a42dc7 (draft, not verified)',
    ],
  },

  // ── Avoid IBU — store families ───────────────────────────
  storeChildrenIbuDyedLiquid({
    id: 'equate-children-ibu-dyed',
    productName: "Equate Children's Ibuprofen (dyed liquid)",
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: '7817923f-4c21-4943-a7e2-dad4e2915fc4',
    dyeNames: ['FD&C Red No. 40'],
    barcode: '681131699686',
  }),
  storeChildrenIbuDyedLiquid({
    id: 'upup-children-ibu-dyed',
    productName: 'up&up Children\'s Ibuprofen (dyed liquid)',
    brand: 'up&up',
    retailers: ['Target'],
    setid: '28911692-882b-4e30-ba1d-5c10f847be80',
    dyeNames: ['FD&C Red No. 40'],
  }),
  storeChildrenIbuDyedLiquid({
    id: 'signature-care-children-ibu-dyed',
    productName: "Signature Care Children's Ibuprofen (dyed liquid)",
    brand: 'Signature Care',
    retailers: ['Safeway'],
    setid: '1f1fadb3-e74c-411a-a116-08cb541e8921',
    dyeNames: ['FD&C Red No. 40'],
  }),
  storeChildrenIbuDyedChew({
    id: 'equate-children-ibu-chew-dyed',
    productName: "Equate Children's Ibuprofen Chewables (dyed)",
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: 'abef43bc-ee9b-4a9c-9cf9-36c323213909',
  }),
  storeChildrenIbuDyedChew({
    id: 'upup-children-ibu-chew-dyed',
    productName: 'up&up Children\'s Ibuprofen Chewables (dyed)',
    brand: 'up&up',
    retailers: ['Target'],
    setid: '17b3ca97-1bd6-4e76-a47f-2e35ef36b707',
  }),
  storeChildrenIbuDyedChew({
    id: 'signature-care-children-ibu-chew-dyed',
    productName: "Signature Care Children's Ibuprofen Chewables (dyed)",
    brand: 'Signature Care',
    retailers: ['Safeway'],
    setid: 'c30fbb8f-a293-4f6e-9495-11402548fe2d',
  }),
  {
    id: 'upup-infants-ibu-dyefree',
    productName: 'up&up Dye-Free Infants\' Concentrated Ibuprofen',
    brand: 'up&up',
    category: PAIN_FEVER,
    formulaId: 'upup-infants-ibu-dyefree',
    audience: KIDS,
    minAge: 0,
    form: 'concentrated drops',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_50_125,
    inactiveIngredients: [
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('6cfdcd94-95cb-4447-a14b-cdb49a1e3114', METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('6cfdcd94-95cb-4447-a14b-cdb49a1e3114', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('6cfdcd94-95cb-4447-a14b-cdb49a1e3114', METH.sorbitol),
      ),
      flag(
        'Natural and artificial berry flavor',
        'limited',
        dailymed('6cfdcd94-95cb-4447-a14b-cdb49a1e3114', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — infant concentrated IBU. Avoid stands on PS80 + benzoate + sorbitol + flavors. This SPL uses sucrose, not HFCS; do not add an HFCS grade row. Labeled about 6–23 months. No Clean infant IBU.',
    retailers: ['Target'],
    cleanAlternatives: INFANTS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid 6cfdcd94-95cb-4447-a14b-cdb49a1e3114 (draft, not verified)',
    ],
  },
  {
    id: 'upup-children-ibu-dyefree-liquid',
    productName: 'up&up Children\'s Dye-Free Ibuprofen Liquid',
    brand: 'up&up',
    category: PAIN_FEVER,
    formulaId: 'upup-children-ibu-dyefree-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100_5,
    inactiveIngredients: [
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('6e0330ac-a111-4574-9197-d7aab33b8608', METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('6e0330ac-a111-4574-9197-d7aab33b8608', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('6e0330ac-a111-4574-9197-d7aab33b8608', METH.sorbitol),
      ),
      flag(
        'Artificial mixed berry flavor',
        'limited',
        dailymed('6e0330ac-a111-4574-9197-d7aab33b8608', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — children\'s IBU liquid. Avoid already stands on PS80 + benzoate + sorbitol + flavors. HFCS appears on this label and is parked / ungraded per the methodology park list — do not read this as a new HFCS lock. Confirm the dye-free children\'s bottle vs. dyed grape/bubblegum SKUs.',
    retailers: ['Target'],
    cleanAlternatives: KIDS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid 6e0330ac-a111-4574-9197-d7aab33b8608 (draft, not verified — confirm children\'s dye-free shelf SPL)',
    ],
  },

  // ── Avoid IBU — Advil nationals ──────────────────────────
  {
    id: 'junior-strength-advil',
    productName: 'Junior Strength Advil Chewables',
    brand: 'Advil',
    category: PAIN_FEVER,
    formulaId: 'junior-strength-advil-chewable',
    audience: KIDS,
    minAge: 6,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100,
    inactiveIngredients: [
      flag(
        'Aspartame',
        'high',
        dailymed('07d4c400-b182-92f7-7574-9e0e94c39cce', METH.aspartame),
      ),
      flag(
        'D&C Red No. 30 aluminum lake',
        'high',
        dailymed('07d4c400-b182-92f7-7574-9e0e94c39cce', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed('07d4c400-b182-92f7-7574-9e0e94c39cce', METH.dyes),
      ),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed('07d4c400-b182-92f7-7574-9e0e94c39cce', METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('07d4c400-b182-92f7-7574-9e0e94c39cce', METH.mannitol),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('07d4c400-b182-92f7-7574-9e0e94c39cce', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Widely stocked Junior Strength chewable (aspartame + Red 30 / Blue 2 lakes), typically ages 6–11. A separate coated junior tablet SPL (setid 5ed0d404) uses methylparaben — not given its own row; if the bottle is the coated tablet, that is still Avoid (parabens are High-tier). Clean swap is 2+ Genexa Kids liquid (lower-minimum, different active).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: JUNIOR_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid 07d4c400-b182-92f7-7574-9e0e94c39cce (chewable); coated tablet variant 5ed0d404-c54d-b05f-578a-d2730e8a78ee noted only (draft, not verified)',
    ],
  },
  {
    id: 'childrens-advil-suspension',
    productName: "Children's Advil Suspension (dyed fruit)",
    brand: 'Advil',
    category: PAIN_FEVER,
    formulaId: 'childrens-advil-suspension-dyed',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100_5,
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('3079d932-afb2-94fe-f4ba-a3d8b5198fce', METH.dyes),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('3079d932-afb2-94fe-f4ba-a3d8b5198fce', METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('3079d932-afb2-94fe-f4ba-a3d8b5198fce', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('3079d932-afb2-94fe-f4ba-a3d8b5198fce', METH.sorbitol),
      ),
      flag(
        'Artificial flavor',
        'limited',
        dailymed('3079d932-afb2-94fe-f4ba-a3d8b5198fce', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dyed fruit Children\'s Advil suspension. Grape / other flavor SPLs on the same label add Blue 1 and sometimes BHT — still Avoid. Dye-free blue raspberry is a separate row.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: KIDS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid 3079d932-afb2-94fe-f4ba-a3d8b5198fce (draft, not verified)',
    ],
  },
  {
    id: 'childrens-advil-suspension-dyefree',
    productName: "Children's Advil Suspension Dye-Free",
    brand: 'Advil',
    category: PAIN_FEVER,
    formulaId: 'childrens-advil-suspension-dyefree',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    activeIngredients: IBU_100_5,
    inactiveIngredients: [
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('4eba2795-e826-480d-afdc-d62004e95f36', METH.pg),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('4eba2795-e826-480d-afdc-d62004e95f36', METH.ps80),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('4eba2795-e826-480d-afdc-d62004e95f36', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('4eba2795-e826-480d-afdc-d62004e95f36', METH.sorbitol),
      ),
      flag(
        'Artificial and natural flavors',
        'limited',
        dailymed('4eba2795-e826-480d-afdc-d62004e95f36', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free trap — DailyMed-backed blue raspberry Children\'s Advil ("Now Dye-Free"). PG + PS80 + benzoate. Separate formulaId from the dyed fruit suspension.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: KIDS_IBU_TO_APAP_ALT,
    sourcesGeneral: [
      'DailyMed setid 4eba2795-e826-480d-afdc-d62004e95f36 (draft, not verified)',
    ],
  },
];

// Verdict tally (32 records): Clean 2 · Caution 1 · Avoid 29
// APAP 16 (Clean 2 / Caution 1 / Avoid 13) · IBU 16 (Clean 0 / Caution 0 / Avoid 16)
