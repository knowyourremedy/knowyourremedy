// DRAFT / not verified / batch 132 KYR6-b Zyrtec US OTC first slice.
// Kenvue DailyMed labels + zyrtec.com count tabs. batch70–131 were not edited.
// Already-on-MAIN Zyrtec rows were not rewritten. Exact twins reuse their formulaId.
//
// TALLY: 18 written — Clean 0 / Caution 7 / Avoid 11.
// NEW 3 / REUSE 20 / SKIPPED no_OI 1 / SKIPPED OUT 12 / REFUSED 0.
// REUSE 20 = 15 written rows on an existing formula + 5 packs already on MAIN.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  bht: 'Methodology §5 High (butylated hydroxytoluene). Avoid.',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  pg: 'Methodology §5 Moderate (oral propylene glycol).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  sorbitol: 'Methodology §5 Limited (sorbitol / sorbitol solution).',
  flavor: 'Methodology §5 Limited (flavor / flavors).',
  benzoate: 'Methodology §5 Limited (sodium benzoate).',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  sorbitan: 'Methodology §5 Caution (bare sorbitan). Not sorbitol.',
  methacrylic: 'Methodology §5 Caution (amino methacrylate copolymer).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const TABLET_SET = 'b165db38-b302-4220-8627-77cb07bb078c';
const TABLET_5_SET = '2c1ecee3-c2c1-25a2-e063-6294a90aad54';
const D_SET = 'f1ecf9ba-1c03-7fb7-e053-2a95a90a875a';
const HIVES_TAB_SET = '31136e3a-94fa-0860-e063-6394a90a008d';
const HIVES_SYRUP_SET = '31400cb2-fe85-ef74-e063-6294a90a11fb';
const CHEW_SET = '0fe77356-d945-46a0-882e-b3bbab784556';
const ADULT_CHEW_SET = 'dc613bd5-70fd-1d9b-e053-2995a90a41cd';
const DISSOLVE_SET = 'a1edc2e6-3661-4d7a-884c-709d73cb89e0';
const ADULT_DISSOLVE_SET = '6a962a1c-c197-492b-bfa6-e0c28eda1533';
const GEL_SET = '0face45c-af24-3559-e063-6294a90abde5';

const TABLET_FORMULA = 'zyrtec-allergy-tablets-tio2';
const SYRUP_FORMULA = 'childrens-zyrtec-liquid';
const CHEW_FORMULA = 'childrens-zyrtec-chewable';
const DISSOLVE_FORMULA = 'zyrtec-b132-dissolve-10mg';
const GEL_FORMULA = 'zyrtec-b132-liquid-gels';
const ADULT_CHEW_FORMULA = 'zyrtec-b132-dye-free-chewable';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}
function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', cite(setid, METH.cleared));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ADULT_ALTS: CleanAlternative[] = [
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
  alt('equate-loratadine-tablets-plain', 'Independently Clean store-brand plain loratadine already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];
const KIDS_ALTS: CleanAlternative[] = [
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
  alt('genexa-kids-allergy-dph-liquid', 'Independently Clean kids diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).'),
];

function tabletFlags(setid: string): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(setid, METH.tio2)),
    flag('Polyethylene glycol', 'moderate', cite(setid, METH.peg)),
    cleared(setid, 'Colloidal silicon dioxide'),
    cleared(setid, 'Croscarmellose sodium'),
    cleared(setid, 'Hypromellose'),
    cleared(setid, 'Lactose monohydrate'),
    cleared(setid, 'Magnesium stearate'),
    cleared(setid, 'Microcrystalline cellulose'),
  ];
}
function syrupFlags(setid: string): IngredientFlag[] {
  return [
    flag('Sucralose', 'moderate', cite(setid, METH.sucralose)),
    flag('Propylene glycol', 'moderate', cite(setid, METH.pg)),
    flag('Flavors', 'limited', cite(setid, METH.flavor)),
    flag('Sorbitol Solution', 'limited', cite(setid, METH.sorbitol)),
    flag('Sodium benzoate', 'limited', cite(setid, METH.benzoate)),
    cleared(setid, 'Anhydrous citric acid'),
    cleared(setid, 'Purified water'),
  ];
}
function chewFlags(setid: string, withFlavor: boolean): IngredientFlag[] {
  const rows: IngredientFlag[] = [
    flag('Sucralose', 'moderate', cite(setid, METH.sucralose)),
    flag('Mannitol', 'limited', cite(setid, METH.mannitol)),
  ];
  if (withFlavor) rows.push(flag('Flavor', 'limited', cite(setid, METH.flavor)));
  rows.push(
    cleared(setid, 'Betadex'),
    cleared(setid, 'Corn starch'),
    cleared(setid, 'Lactose monohydrate'),
    cleared(setid, 'Magnesium stearate'),
    cleared(setid, 'Silicified microcrystalline cellulose'),
  );
  return rows;
}
function dissolveFlags(setid: string): IngredientFlag[] {
  return [
    flag('Sucralose', 'moderate', cite(setid, METH.sucralose)),
    flag('Amino methacrylate copolymer', 'limited', cite(setid, METH.methacrylic)),
    flag('Flavors', 'limited', cite(setid, METH.flavor)),
    flag('Mannitol', 'limited', cite(setid, METH.mannitol)),
    cleared(setid, 'Anhydrous citric acid'),
    cleared(setid, 'Colloidal silicon dioxide'),
    cleared(setid, 'Crospovidone'),
    cleared(setid, 'Hydroxypropyl cellulose'),
    cleared(setid, 'Magnesium stearate'),
    cleared(setid, 'Microcrystalline cellulose'),
    cleared(setid, 'Sodium bicarbonate'),
    cleared(setid, 'Sodium starch glycolate'),
  ];
}
function gelFlags(setid: string): IngredientFlag[] {
  return [
    flag('Butylated hydroxytoluene', 'high', cite(setid, METH.bht)),
    flag('Polyethylene glycol 400', 'moderate', cite(setid, METH.peg)),
    flag('Sorbitol', 'limited', cite(setid, METH.sorbitol)),
    flag('Pharmaceutical ink', 'limited', cite(setid, METH.ink)),
    flag('Sorbitan', 'limited', cite(setid, METH.sorbitan)),
    cleared(setid, 'Gelatin'),
    cleared(setid, 'Glycerin'),
    cleared(setid, 'Purified water'),
    cleared(setid, 'Sodium hydroxide'),
  ];
}

type Spec = {
  id: string;
  productName: string;
  formulaId: string;
  barcode?: string;
  audience: 'adult' | 'kids';
  minAge: number;
  form: string;
  actives: RatingRecord['activeIngredients'];
  flags: IngredientFlag[];
  verdict: RatingRecord['verdict'];
  note: string;
  source: string;
  kidsAlts?: boolean;
};

function expand(d: Spec): RatingRecord {
  return {
    id: d.id,
    productName: d.productName,
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: d.barcode,
    formulaId: d.formulaId,
    audience: d.audience === 'kids' ? KIDS : ADULT,
    minAge: d.minAge,
    form: d.form,
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags,
    verdict: d.verdict,
    honestNote: d.note,
    retailers: [...RETAILERS],
    cleanAlternatives: d.kidsAlts ? KIDS_ALTS : ADULT_ALTS,
    sourcesGeneral: [`${d.source} (draft, not verified)`],
  };
}

const CET10 = [{ name: 'Cetirizine HCl', strength: '10 mg' }];
const CET5 = [{ name: 'Cetirizine HCl', strength: '5 mg' }];
const CET_SYRUP = [{ name: 'Cetirizine HCl', strength: '5 mg / 5 mL' }];
const ZYRTEC_D = [
  { name: 'Cetirizine HCl', strength: '5 mg' },
  { name: 'Pseudoephedrine HCl', strength: '120 mg' },
];

const AVOID_TAB =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Polyethylene glycol is Moderate and is not the Avoid driver. Same inactive line as zyrtec-allergy-tablets on MAIN. REUSE formula zyrtec-allergy-tablets-tio2. That row was not rewritten.';
const AVOID_SYRUP =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers are sucralose and oral propylene glycol. Dye-free is not Clean. Same inactive line as childrens-zyrtec-liquid on MAIN. REUSE that formula. That row was not rewritten.';
const CAUTION_CHEW =
  'FOUNDER-LOCK DRAFT: Caution. Drivers are sucralose and mannitol. Same inactive line as childrens-zyrtec-chewable on MAIN, including flavor. REUSE that formula. The locked Caution call stands. That row was not rewritten.';

const COMPACT: Spec[] = [
  {
    id: 'zyrtec-b132-10mg-45ct',
    productName: 'Zyrtec Allergy Tablets 10mg (45ct)',
    formulaId: TABLET_FORMULA,
    barcode: '300450204653',
    audience: 'adult',
    minAge: 6,
    form: 'film-coated tablet',
    actives: CET10,
    flags: tabletFlags(TABLET_SET),
    verdict: 'avoid',
    note: AVOID_TAB,
    source: `DailyMed setid ${TABLET_SET}. zyrtec.com/products/zyrtec-tablets 45 count. UPC 300450204653.`,
  },
  {
    id: 'zyrtec-b132-10mg-90ct',
    productName: 'Zyrtec Allergy Tablets 10mg (90ct)',
    formulaId: TABLET_FORMULA,
    barcode: '300450206909',
    audience: 'adult',
    minAge: 6,
    form: 'film-coated tablet',
    actives: CET10,
    flags: tabletFlags(TABLET_SET),
    verdict: 'avoid',
    note: AVOID_TAB,
    source: `DailyMed setid ${TABLET_SET}. zyrtec.com/products/zyrtec-tablets 90 count. UPC 300450206909.`,
  },
  {
    id: 'zyrtec-b132-10mg-120ct',
    productName: 'Zyrtec Allergy Tablets 10mg (120ct)',
    formulaId: TABLET_FORMULA,
    barcode: '300450206121',
    audience: 'adult',
    minAge: 6,
    form: 'film-coated tablet',
    actives: CET10,
    flags: tabletFlags(TABLET_SET),
    verdict: 'avoid',
    note: AVOID_TAB,
    source: `DailyMed setid ${TABLET_SET}. zyrtec.com/products/zyrtec-tablets 120 count. UPC 300450206121.`,
  },
  {
    id: 'zyrtec-b132-5mg-15ct',
    productName: 'Zyrtec Allergy Tablets 5mg (15ct)',
    formulaId: TABLET_FORMULA,
    barcode: '300450256157',
    audience: 'adult',
    minAge: 6,
    form: 'film-coated tablet',
    actives: CET5,
    flags: tabletFlags(TABLET_5_SET),
    verdict: 'avoid',
    note: AVOID_TAB + ' Count tab is 15. No GTIN printed on that variant, so UPC is blank.',
    source: `DailyMed setid ${TABLET_5_SET} prints 15 tablets. zyrtec.com/products/zyrtec-low-dose-tablets 15 count. UPC blank.`,
  },
  {
    id: 'zyrtec-b132-5mg-35ct',
    productName: 'Zyrtec Allergy Tablets 5mg (35ct)',
    formulaId: TABLET_FORMULA,
    barcode: '300450256355',
    audience: 'adult',
    minAge: 6,
    form: 'film-coated tablet',
    actives: CET5,
    flags: tabletFlags(TABLET_5_SET),
    verdict: 'avoid',
    note: AVOID_TAB,
    source: `DailyMed setid ${TABLET_5_SET}. zyrtec.com/products/zyrtec-low-dose-tablets 35 count. GTIN 00300450256355.`,
  },
  {
    id: 'zyrtec-b132-d-12ct',
    productName: 'Zyrtec-D Allergy + Congestion Extended-Release Tablets (12ct)',
    formulaId: TABLET_FORMULA,
    audience: 'adult',
    minAge: 12,
    form: 'extended-release tablet',
    actives: ZYRTEC_D,
    flags: tabletFlags(D_SET),
    verdict: 'avoid',
    note: AVOID_TAB + ' Actives are cetirizine 5 mg and pseudoephedrine 120 mg. Ages 12+.',
    source: `DailyMed setid ${D_SET}. zyrtec.com/products/zyrtec-d 12 count. UPC 300450204271.`,
  },
  {
    id: 'zyrtec-b132-d-24ct',
    productName: 'Zyrtec-D Allergy + Congestion Extended-Release Tablets (24ct)',
    formulaId: TABLET_FORMULA,
    barcode: '300450204240',
    audience: 'adult',
    minAge: 12,
    form: 'extended-release tablet',
    actives: ZYRTEC_D,
    flags: tabletFlags(D_SET),
    verdict: 'avoid',
    note: AVOID_TAB + ' Actives are cetirizine 5 mg and pseudoephedrine 120 mg. Ages 12+.',
    source: `DailyMed setid ${D_SET}. zyrtec.com/products/zyrtec-d 24 count. UPC 300450204240.`,
  },
  {
    id: 'zyrtec-b132-hives-tab-30ct',
    productName: 'Zyrtec Hives Tablets 10mg (30ct)',
    formulaId: TABLET_FORMULA,
    barcode: '300450138323',
    audience: 'adult',
    minAge: 6,
    form: 'film-coated tablet',
    actives: CET10,
    flags: tabletFlags(HIVES_TAB_SET),
    verdict: 'avoid',
    note: AVOID_TAB,
    source: `DailyMed setid ${HIVES_TAB_SET} prints 30 tablets. zyrtec.com/products/zyrtec-hives-tablets. UPC 300450138323.`,
  },
  {
    id: 'zyrtec-b132-hives-syrup-4oz',
    productName: "Children's Zyrtec Hives Syrup (4 fl oz)",
    formulaId: SYRUP_FORMULA,
    barcode: '300450139146',
    audience: 'kids',
    minAge: 6,
    form: 'liquid',
    actives: CET_SYRUP,
    flags: syrupFlags(HIVES_SYRUP_SET),
    verdict: 'avoid',
    note: AVOID_SYRUP + ' Label ages are 6 years and over.',
    source: `DailyMed setid ${HIVES_SYRUP_SET} prints 4 fl oz (118 mL). zyrtec.com/products/zyrtec-children-hives-syrup. UPC 300450139146.`,
    kidsAlts: true,
  },
  {
    id: 'zyrtec-b132-kids-chew-10mg-24ct',
    productName: "Children's Zyrtec Chewable Tablets 10mg (24ct)",
    formulaId: CHEW_FORMULA,
    barcode: '300450241245',
    audience: 'kids',
    minAge: 6,
    form: 'chewable tablet',
    actives: CET10,
    flags: chewFlags(CHEW_SET, true),
    verdict: 'caution',
    note: CAUTION_CHEW,
    source: `DailyMed setid ${CHEW_SET}. zyrtec.com/products/zyrtec-chewables-children-6-plus 24 count. UPC 300450241245.`,
    kidsAlts: true,
  },
  {
    id: 'zyrtec-b132-kids-chew-10mg-48ct',
    productName: "Children's Zyrtec Chewable Tablets 10mg (48ct)",
    formulaId: CHEW_FORMULA,
    barcode: '300450241481',
    audience: 'kids',
    minAge: 6,
    form: 'chewable tablet',
    actives: CET10,
    flags: chewFlags(CHEW_SET, true),
    verdict: 'caution',
    note: CAUTION_CHEW,
    source: `DailyMed setid ${CHEW_SET}. zyrtec.com/products/zyrtec-chewables-children-6-plus 48 count. UPC 300450241481.`,
    kidsAlts: true,
  },
  {
    id: 'zyrtec-b132-kids-chew-10mg-72ct',
    productName: "Children's Zyrtec Dye-Free Chewable Tablets 10mg (72ct)",
    formulaId: CHEW_FORMULA,
    barcode: '300450241283',
    audience: 'kids',
    minAge: 6,
    form: 'chewable tablet',
    actives: CET10,
    flags: chewFlags(CHEW_SET, true),
    verdict: 'caution',
    note: CAUTION_CHEW + ' Carton is dye-free grape. The inactive line still prints flavor.',
    source: `DailyMed setid ${CHEW_SET}. zyrtec.com chewables ages 6+ 72 count image UPC 300450241283.`,
    kidsAlts: true,
  },
  {
    id: 'zyrtec-b132-dye-free-chew-24ct',
    productName: 'Zyrtec Dye-Free Chewable Tablets 10mg (24ct)',
    formulaId: ADULT_CHEW_FORMULA,
    barcode: '300450250247',
    audience: 'adult',
    minAge: 6,
    form: 'chewable tablet',
    actives: CET10,
    flags: chewFlags(ADULT_CHEW_SET, false),
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are sucralose and mannitol. This panel does not print flavor. It is not the children\'s chewable formula. No High flag.',
    source: `DailyMed setid ${ADULT_CHEW_SET} prints 24 chewable tablets. zyrtec.com/products/zyrtec-chewables. UPC 300450250247.`,
  },
  {
    id: 'zyrtec-b132-kids-dissolve-24ct',
    productName: "Children's Zyrtec Dissolve Tabs 10mg (24ct)",
    formulaId: DISSOLVE_FORMULA,
    barcode: '300450242259',
    audience: 'kids',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: CET10,
    flags: dissolveFlags(DISSOLVE_SET),
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers are sucralose, amino methacrylate copolymer, flavors, and mannitol. Amino methacrylate copolymer is the stamped methacrylic enteric row. No High flag. The 12ct children\'s dissolve row on MAIN was not rewritten.',
    source: `DailyMed setid ${DISSOLVE_SET}. zyrtec.com/products/zyrtec-children-dissolve-tabs 24 count. UPC 300450242259.`,
    kidsAlts: true,
  },
  {
    id: 'zyrtec-b132-adult-dissolve-24ct',
    productName: 'Zyrtec Allergy Dissolve Tabs 10mg (24ct)',
    formulaId: DISSOLVE_FORMULA,
    barcode: '300450242242',
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: CET10,
    flags: dissolveFlags(ADULT_DISSOLVE_SET),
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same inactive line as the children\'s 24ct dissolve in this file. REUSE formula zyrtec-b132-dissolve-10mg. No High flag.',
    source: `DailyMed setid ${ADULT_DISSOLVE_SET}. zyrtec.com/products/zyrtec-adult-dissolve-tabs 24 count. UPC 300450242242.`,
  },
  {
    id: 'zyrtec-b132-adult-dissolve-12ct',
    productName: 'Zyrtec Allergy Dissolve Tabs 10mg (12ct)',
    formulaId: DISSOLVE_FORMULA,
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: CET10,
    flags: dissolveFlags(ADULT_DISSOLVE_SET),
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Same inactive line as the 24ct adult dissolve. REUSE formula zyrtec-b132-dissolve-10mg. The 12 count tab is on zyrtec.com. No GTIN opened for that tab, so UPC is blank.',
    source: `DailyMed setid ${ADULT_DISSOLVE_SET}. zyrtec.com/products/zyrtec-adult-dissolve-tabs 12 count. UPC blank.`,
  },
  {
    id: 'zyrtec-b132-gels-25ct',
    productName: 'Zyrtec Allergy Liquid Gels 10mg (25ct)',
    formulaId: GEL_FORMULA,
    barcode: '300450204257',
    audience: 'adult',
    minAge: 6,
    form: 'liquid gel',
    actives: CET10,
    flags: gelFlags(GEL_SET),
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is butylated hydroxytoluene. Current DailyMed also prints pharmaceutical ink and sorbitan. The zyrtec.com ingredient list omits BHT and was not copied. The 40ct liquid-gel row on MAIN was not rewritten.',
    source: `DailyMed setid ${GEL_SET}. zyrtec.com/products/zyrtec-liquid-gels 25 count. UPC 300450204257.`,
  },
  {
    id: 'zyrtec-b132-gels-65ct',
    productName: 'Zyrtec Allergy Liquid Gels 10mg (65ct)',
    formulaId: GEL_FORMULA,
    audience: 'adult',
    minAge: 6,
    form: 'liquid gel',
    actives: CET10,
    flags: gelFlags(GEL_SET),
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same current liquid-gel panel as the 25ct. REUSE formula zyrtec-b132-liquid-gels. Driver is butylated hydroxytoluene.',
    source: `DailyMed setid ${GEL_SET}. zyrtec.com/products/zyrtec-liquid-gels 65 count. UPC 300450204677.`,
  },
];

export const BATCH132_KYR6B_ZYRTEC_FIRST_SLICE: RatingRecord[] = COMPACT.map(expand);

export const BATCH132_REUSE_ALREADY_ON_MAIN: { id: string; why: string }[] = [
  { id: 'zyrtec-allergy-tablets', why: '10mg film-coated tablets already on MAIN, including UPC 312547204361 (30ct) and 300450206602 (60ct). Not rewritten.' },
  { id: 'zyrtec-allergy-liquid-gels', why: 'Liquid gels already on MAIN, including UPC 300450204448 (40ct). Not rewritten.' },
  { id: 'childrens-zyrtec-chewable', why: 'Children\'s chewable already on MAIN, UPC 300450239129 (12ct, 2.5 mg). Not rewritten.' },
  { id: 'childrens-zyrtec-dissolve', why: 'Children\'s dissolve tabs already on MAIN, UPC 300450242136 (12ct). Not rewritten.' },
  { id: 'childrens-zyrtec-liquid', why: 'Children\'s allergy syrup already on MAIN, including UPC 300450209047 (4 fl oz). Not rewritten.' },
];

export const BATCH132_SKIPPED_NO_OI: { sku: string; name: string; why: string }[] = [
  {
    sku: '',
    name: "Children's Zyrtec Allergy Syrup 8 fl oz",
    why: 'zyrtec.com says 4 fl oz and 8 fl oz. Only the 4 fl oz pack opened a GTIN, and that pack is already on MAIN. No 8 fl oz variant object or panel opened, so no 8 fl oz row.',
  },
];

export const BATCH132_SKIPPED_OUT: { name: string; why: string }[] = [
  { name: 'Zyrtec Allergen Shield Spray', why: 'Drug-free nasal mist. Not a cetirizine OTC drug.' },
  { name: 'Zyrtec Allergy kit', why: 'DailyMed setid 6685a843 is a kit.' },
  { name: 'Jones Healthcare Zyrtec capsule repacks', why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'Select Consumer Group Zyrtec tablets', why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'Savings Distributors Zyrtec tablets', why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'Morning Star OTC Zyrtec tablets', why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'A-S Medication Solutions children\'s chewable', why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'Redpharm Zyrtec tablets', why: 'Repack, not a zyrtec.com count tab.' },
  { name: "Lil' Drug Store Zyrtec tablets", why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'Navajo Manufacturing Zyrtec tablets', why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'Select Corporation Zyrtec tablets', why: 'Repack, not a zyrtec.com count tab.' },
  { name: 'Bryant Ranch Prepack and Physicians Total Care Zyrtec / Zyrtec-D', why: 'Repack, not a zyrtec.com count tab.' },
];

export const BATCH132_REFUSED: { name: string; token: string }[] = [];
export const BATCH132_LEFTOVER_REAL_TOKENS: string[] = [];
