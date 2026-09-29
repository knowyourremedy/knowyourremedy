// DRAFT / not verified / batch 136 KYR6-b Claritin US OTC first slice.
// Bayer DailyMed labels plus opened Target count tabs. batch70–135 were not edited.
// Already-on-MAIN Claritin rows were not rewritten. Exact inactive twins reuse their formulaId.
// Claritin-D 12-hour and 24-hour do not share the plain loratadine tablet formula.
// The two Claritin-D 24-hour SPLs do not share a formulaId.
//
// TALLY: 24 written — Clean 5 / Caution 1 / Avoid 18.
// NEW 16 / REUSE 15 / SKIPPED no_OI 0 / SKIPPED OUT 11 / REFUSED 0.
// REUSE 15 = 8 written rows on an existing formula + 7 already-on-MAIN Claritin rows.

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
const D_RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Pharmacy'] as const;

const METH = {
  dyes: 'Methodology §5 High (FD&C / D&C dyes, including lake forms). Avoid.',
  aspartame: 'Methodology §5 High (aspartame). Avoid.',
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  talc: 'Methodology §5 High (talc, oral). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  pg: 'Methodology §5 Moderate (oral propylene glycol).',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  maltitol: 'Methodology §5 Limited (maltitol).',
  flavor: 'Methodology §5 Limited (flavor / flavors). Menthol on an inactive line maps here.',
  benzoate: 'Methodology §5 Limited (sodium benzoate).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  mct: 'Methodology §5 Limited (unlabeled MCT). Caprylic/capric glycerides names no plant. Not Medium Chain Glycerides (Modified Coconut, Palm Oil).',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  carmine: 'Methodology §5 Caution (carmine). Not Avoid.',
  sio2: 'Methodology §5 Caution (silicon dioxide, 0-point nanoparticle cap).',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.',
  iron: 'Methodology §5 Caution (iron oxide as color). Black iron oxide sits on this row. Not Avoid.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const PLAIN = 'claritin-allergy-tablets-plain';
const REDITAB = 'claritin-reditabs';
const KIDS_LIQUID = 'childrens-claritin-liquid';
const D12 = 'claritin-d-12hr-tio2';
const MCC = 'claritin-b136-tablets-mcc';
const GEL = 'claritin-b136-liquigels';
const BUBBLE = 'claritin-b136-chew-bubblegum';
const DYE_FREE = 'claritin-b136-chew-dye-free';
const MINT = 'claritin-b136-chew-cool-mint';
const D24_EC = 'claritin-b136-d24-ethylcellulose';
const D24_TALC = 'claritin-b136-d24-talc';

const STARCH_SET = '660ac9df-f1b1-4c89-94dd-9fae0a013f3c';
const STARCH_70_SET = 'ac32d6f9-f553-4d5c-ad36-575af5ea56de';
const MCC_SET = 'dc65f7ec-bb83-7b29-e053-2995a90a99de';
const GEL_SET = '8e14b61f-faf6-43a8-a080-75f64514217a';
const BUBBLE_SET = '20938e05-bc3e-51aa-e054-00144ff88e88';
const MINT_SET = '98b99bb9-d499-9ab4-e053-2a95a90a6ae6';
const D12_SET = 'a7125705-01ff-4418-8c53-9209c2bbb484';
const D24_EC_SET = 'f046a807-ab8c-0620-e053-2a95a90a9d3c';
const D24_TALC_SET = '3ea6a90b-8cb1-46b0-9ff7-be7090245e53';
const REDI_SET = 'b681ea25-d00b-4c8a-8054-cc6f983ce337';
const KIDS_LIQ_SET = '170061e9-e529-4ff0-e054-00144ff8d46c';

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
  alt(PLAIN, 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
  alt('equate-loratadine-tablets-plain', 'Independently Clean store-brand plain loratadine already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];
const KIDS_ALTS: CleanAlternative[] = [
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
  alt('genexa-kids-allergy-dph-liquid', 'Independently Clean kids diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).'),
];

function starchFlags(): IngredientFlag[] {
  return [
    cleared(STARCH_SET, 'Corn starch'),
    cleared(STARCH_SET, 'Lactose monohydrate'),
    cleared(STARCH_SET, 'Magnesium stearate'),
  ];
}
function mccFlags(): IngredientFlag[] {
  return [
    cleared(MCC_SET, 'Lactose monohydrate'),
    cleared(MCC_SET, 'Magnesium stearate'),
    cleared(MCC_SET, 'Microcrystalline cellulose'),
    cleared(MCC_SET, 'Sodium starch glycolate'),
  ];
}
function gelFlags(): IngredientFlag[] {
  return [
    flag('FD&C Blue No. 1', 'high', cite(GEL_SET, METH.dyes)),
    flag('Polysorbate 80', 'moderate', cite(GEL_SET, METH.ps80)),
    flag('Caprylic/capric glycerides', 'limited', cite(GEL_SET, METH.mct)),
    flag('Sorbitol', 'limited', cite(GEL_SET, METH.sorbitol)),
    flag('Pharmaceutical ink', 'limited', cite(GEL_SET, METH.ink)),
    cleared(GEL_SET, 'Gelatin'),
    cleared(GEL_SET, 'Glycerin'),
    cleared(GEL_SET, 'Povidone'),
    cleared(GEL_SET, 'Purified water'),
  ];
}
function bubbleFlags(): IngredientFlag[] {
  return [
    flag('Aspartame', 'high', cite(BUBBLE_SET, METH.aspartame)),
    flag('Carmine', 'limited', cite(BUBBLE_SET, METH.carmine)),
    flag('Flavor', 'limited', cite(BUBBLE_SET, METH.flavor)),
    flag('Mannitol', 'limited', cite(BUBBLE_SET, METH.mannitol)),
    flag('Colloidal silicon dioxide', 'limited', cite(BUBBLE_SET, METH.sio2)),
    cleared(BUBBLE_SET, 'Citric acid'),
    cleared(BUBBLE_SET, 'Magnesium stearate'),
    cleared(BUBBLE_SET, 'Microcrystalline cellulose'),
    cleared(BUBBLE_SET, 'Sodium starch glycolate'),
    cleared(BUBBLE_SET, 'Stearic acid'),
  ];
}
const DYE_FREE_CITE = 'Target PDP A-14778667 and A-94965165 drug facts';
function dyeFreeFlags(): IngredientFlag[] {
  return [
    flag('Aspartame', 'high', `${DYE_FREE_CITE}; ${METH.aspartame}`),
    flag('Flavor', 'limited', `${DYE_FREE_CITE}; ${METH.flavor}`),
    flag('Mannitol', 'limited', `${DYE_FREE_CITE}; ${METH.mannitol}`),
    flag('Colloidal silicon dioxide', 'limited', `${DYE_FREE_CITE}; ${METH.sio2}`),
    flag('Anhydrous citric acid', 'cleared', `${DYE_FREE_CITE}; ${METH.cleared}`),
    flag('Magnesium stearate', 'cleared', `${DYE_FREE_CITE}; ${METH.cleared}`),
    flag('Microcrystalline cellulose', 'cleared', `${DYE_FREE_CITE}; ${METH.cleared}`),
    flag('Sodium starch glycolate', 'cleared', `${DYE_FREE_CITE}; ${METH.cleared}`),
    flag('Stearic acid', 'cleared', `${DYE_FREE_CITE}; ${METH.cleared}`),
  ];
}
function mintFlags(): IngredientFlag[] {
  return [
    flag('Aspartame', 'high', cite(MINT_SET, METH.aspartame)),
    flag('FD&C Blue No. 1 aluminum lake', 'high', cite(MINT_SET, METH.dyes)),
    flag('Menthol', 'limited', cite(MINT_SET, METH.flavor)),
    flag('Mannitol', 'limited', cite(MINT_SET, METH.mannitol)),
    flag('Silicon dioxide', 'limited', cite(MINT_SET, METH.sio2)),
    cleared(MINT_SET, 'Anhydrous citric acid'),
    cleared(MINT_SET, 'Magnesium stearate'),
    cleared(MINT_SET, 'Microcrystalline cellulose'),
    cleared(MINT_SET, 'Sodium starch glycolate'),
    cleared(MINT_SET, 'Stearic acid'),
  ];
}
function d12Flags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(D12_SET, METH.tio2)),
    cleared(D12_SET, 'Croscarmellose sodium'),
    cleared(D12_SET, 'Dibasic calcium phosphate'),
    cleared(D12_SET, 'Hypromellose'),
    cleared(D12_SET, 'Lactose monohydrate'),
    cleared(D12_SET, 'Magnesium stearate'),
    cleared(D12_SET, 'Povidone'),
  ];
}
function d24EcFlags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(D24_EC_SET, METH.tio2)),
    flag('Polyethylene glycol', 'moderate', cite(D24_EC_SET, METH.peg)),
    flag('Pharmaceutical ink', 'limited', cite(D24_EC_SET, METH.ink)),
    flag('Silicon dioxide', 'limited', cite(D24_EC_SET, METH.sio2)),
    flag('Sucrose', 'limited', cite(D24_EC_SET, METH.sucrose)),
    cleared(D24_EC_SET, 'Carnauba wax'),
    cleared(D24_EC_SET, 'Dibasic calcium phosphate dihydrate'),
    cleared(D24_EC_SET, 'Ethylcellulose'),
    cleared(D24_EC_SET, 'Hydroxypropyl cellulose'),
    cleared(D24_EC_SET, 'Hypromellose'),
    cleared(D24_EC_SET, 'Magnesium stearate'),
    cleared(D24_EC_SET, 'Povidone'),
  ];
}
function d24TalcFlags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(D24_TALC_SET, METH.tio2)),
    flag('Talc', 'high', cite(D24_TALC_SET, METH.talc)),
    flag('Polyethylene glycol', 'moderate', cite(D24_TALC_SET, METH.peg)),
    flag('Polysorbate 80', 'moderate', cite(D24_TALC_SET, METH.ps80)),
    flag('Propylene glycol', 'moderate', cite(D24_TALC_SET, METH.pg)),
    flag('Black iron oxide', 'limited', cite(D24_TALC_SET, METH.iron)),
    flag('Colloidal silicon dioxide', 'limited', cite(D24_TALC_SET, METH.sio2)),
    flag('Sodium lauryl sulfate', 'limited', cite(D24_TALC_SET, METH.sls)),
    cleared(D24_TALC_SET, 'Candelilla wax'),
    cleared(D24_TALC_SET, 'Glyceryl monostearate'),
    cleared(D24_TALC_SET, 'Hypromellose'),
    cleared(D24_TALC_SET, 'Lactose monohydrate'),
    cleared(D24_TALC_SET, 'Magnesium stearate'),
  ];
}
function rediFlags(): IngredientFlag[] {
  return [
    flag('Mannitol', 'limited', cite(REDI_SET, METH.mannitol)),
    flag('Mint flavor', 'limited', cite(REDI_SET, METH.flavor)),
    cleared(REDI_SET, 'Anhydrous citric acid'),
    cleared(REDI_SET, 'Gelatin'),
  ];
}
function kidsLiquidFlags(): IngredientFlag[] {
  return [
    flag('Sucralose', 'moderate', cite(KIDS_LIQ_SET, METH.sucralose)),
    flag('Propylene glycol', 'moderate', cite(KIDS_LIQ_SET, METH.pg)),
    flag('Flavor', 'limited', cite(KIDS_LIQ_SET, METH.flavor)),
    flag('Maltitol', 'limited', cite(KIDS_LIQ_SET, METH.maltitol)),
    flag('Sorbitol', 'limited', cite(KIDS_LIQ_SET, METH.sorbitol)),
    flag('Sodium benzoate', 'limited', cite(KIDS_LIQ_SET, METH.benzoate)),
    flag('Edetate disodium', 'cleared', cite(KIDS_LIQ_SET, METH.cleared)),
    cleared(KIDS_LIQ_SET, 'Glycerin'),
    cleared(KIDS_LIQ_SET, 'Monobasic sodium phosphate'),
    cleared(KIDS_LIQ_SET, 'Phosphoric acid'),
    cleared(KIDS_LIQ_SET, 'Purified water'),
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
  kids?: boolean;
  pharmacy?: boolean;
};

function expand(d: Spec): RatingRecord {
  return {
    id: d.id,
    productName: d.productName,
    brand: 'Claritin',
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
    retailers: [...(d.pharmacy ? D_RETAILERS : RETAILERS)],
    cleanAlternatives: d.verdict === 'clean' ? undefined : d.kids ? KIDS_ALTS : ADULT_ALTS,
    sourcesGeneral: [d.source],
  };
}

const LORA = [{ name: 'Loratadine', strength: '10mg' }];
const LORA5 = [{ name: 'Loratadine', strength: '5mg' }];
const D_ACTIVES = [
  { name: 'Loratadine', strength: '10mg' },
  { name: 'Pseudoephedrine sulfate', strength: '240mg' },
];
const D12_ACTIVES = [
  { name: 'Loratadine', strength: '5mg' },
  { name: 'Pseudoephedrine sulfate', strength: '120mg' },
];

const T30 = 'Target PDP A-11276157 primary_barcode field, package quantity 30';
const T70 = 'Target PDP A-14351285 primary_barcode field, size tab 70ct';
const T100 = 'Target PDP A-14351285 primary_barcode field, size tab 100ct';
const TG10 = 'Target PDP A-17353793 UPC field, package quantity 10';
const TG30 = 'Target PDP A-12271659 primary_barcode field, package quantity 30';
const TG60 = 'Target PDP A-75665737 primary_barcode field, package quantity 60';

export const BATCH136_KYR6B_CLARITIN_FIRST_SLICE: RatingRecord[] = [
  expand({
    id: 'claritin-b136-tablets-30',
    productName: 'Claritin 24-Hour Allergy Tablets (30ct)',
    formulaId: PLAIN,
    barcode: '041100810984',
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(),
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Corn starch, lactose monohydrate, and magnesium stearate match claritin-allergy-tablets-plain. This 30ct row reuses that formula. The uncounted MAIN tablet row was not rewritten. Ages 6+.',
    source: `${T30}. Inactive ingredients: corn starch, lactose monohydrate, magnesium stearate. DailyMed setid ${STARCH_70_SET} lists a 30-tablet bottle in one carton (NDC 11523-6655-8). UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-tablets-70',
    productName: 'Claritin 24-Hour Allergy Tablets (70ct)',
    formulaId: PLAIN,
    barcode: '041100809643',
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(),
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. The 70ct Target drug facts print the starch list, so this row reuses claritin-allergy-tablets-plain. Ages 6+.',
    source: `${T70}. Inactive ingredients: corn starch, lactose monohydrate, magnesium stearate. DailyMed setid ${STARCH_70_SET} prints 70 TABLETS on the bottle carton (NDC 11523-6655-2). UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-tablets-45',
    productName: 'Claritin 24-Hour Allergy Tablets (45ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(),
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. The 45-count window box is on the starch tablet SPL, so this row reuses claritin-allergy-tablets-plain. No retailer UPC was opened for this count. Ages 6+.',
    source: `DailyMed setid ${STARCH_SET} principal display panel "45 Count Window Box" and a 45-tablet bottle in one carton (NDC 11523-7237-1). Same inactives as setid ${STARCH_70_SET}. UPC left empty: Target size tabs on the opened tablet PDPs were 5, 10, 30, 70, and 100. claritin.com returned 403. Walmart was robot-blocked. CVS returned 403. No Product UPC field was opened for the 45ct (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-tablets-50',
    productName: 'Claritin 24-Hour Allergy Tablets (50ct)',
    formulaId: PLAIN,
    barcode: '041100808707',
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(),
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. The 50-tablet carton is on the starch tablet SPL, so this row reuses claritin-allergy-tablets-plain. No retailer UPC was opened for this count. Ages 6+.',
    source: `DailyMed setid ${STARCH_SET} principal display panel "50 Tablet Carton". Inactives: corn starch, lactose monohydrate, magnesium stearate. UPC left empty: no opened US retailer PDP printed a Product UPC for a 50-count Claritin tablet. NDC is not a UPC (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-tablets-100-mcc',
    productName: 'Claritin 24-Hour Allergy Tablets (100ct)',
    formulaId: MCC,
    barcode: '041100575678',
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(),
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. This 100ct panel is lactose monohydrate, magnesium stearate, microcrystalline cellulose, and sodium starch glycolate. It does not share claritin-allergy-tablets-plain. Ages 6+.',
    source: `${T100}. Inactive ingredients: lactose monohydrate, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. DailyMed setid dc65f7ec-bb83-7b29-e053-2995a90a99de is the Project Fortify tablet SPL with the same four inactives and a 100-tablet bottle (NDC 11523-0800-2). UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-liquigels-10',
    productName: 'Claritin Liqui-Gels (10ct)',
    formulaId: GEL,
    barcode: '041100806109',
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C Blue No. 1. Caprylic/capric glycerides is unlabeled MCT and is not the Avoid driver. Ages 6+.',
    source: `${TG10}. Inactive ingredients: caprylic/capric glycerides, FD&C blue no. 1, gelatin, glycerin, pharmaceutical ink, polysorbate 80, povidone, purified water, sorbitol. DailyMed setid ${GEL_SET} is the same list, with a 10-capsule blister in one carton (NDC 11523-7200-1). UPC is the Target UPC field (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-liquigels-30',
    productName: 'Claritin Liqui-Gels (30ct)',
    formulaId: GEL,
    barcode: '041100807984',
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C Blue No. 1. Same liqui-gel list as the 10ct. Ages 6+.',
    source: `${TG30}. Inactive ingredients match setid ${GEL_SET}. That SPL prints a 30-capsule carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-liquigels-60',
    productName: 'Claritin Liqui-Gels (60ct)',
    formulaId: GEL,
    barcode: '041100576859',
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C Blue No. 1. Same liqui-gel list as the 10ct and 30ct. Ages 6+.',
    source: `${TG60}. Inactive ingredients match setid ${GEL_SET}. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-chew-bubblegum-10',
    productName: "Children's Claritin Chewable Tablets, Bubblegum (10ct)",
    formulaId: BUBBLE,
    barcode: '041100811127',
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: bubbleFlags(),
    verdict: 'avoid',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. Carmine is Caution and is not the Avoid driver. This list is not the dyed grape formula. Ages 2+.',
    source: `DailyMed setid 20938e05-bc3e-51aa-e054-00144ff88e88 principal display panel "Bubblegum Flavored 10 Chewable" and one 10-tablet blister in one carton (NDC 11523-4330-1). Inactive ingredients: aspartame, carmine, citric acid, colloidal silicon dioxide, flavor, magnesium stearate, mannitol, microcrystalline cellulose, sodium starch glycolate, stearic acid. UPC left empty: the opened Target bubblegum PDP was the 30ct only (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-chew-bubblegum-30',
    productName: "Children's Claritin Chewable Tablets, Bubblegum (30ct)",
    formulaId: BUBBLE,
    barcode: '041100598714',
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: bubbleFlags(),
    verdict: 'avoid',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. The carton says dye-free and the drug facts still print carmine. Ages 2+.',
    source: 'Target PDP A-18794622 primary_barcode field, package quantity 30. Inactive ingredients: aspartame, carmine, citric acid, colloidal silicon dioxide, flavor, magnesium stearate, mannitol, microcrystalline cellulose, sodium starch glycolate, stearic acid. That list matches DailyMed setid 20938e05-bc3e-51aa-e054-00144ff88e88. UPC is the Target primary_barcode field (draft, not verified).',
  }),
  expand({
    id: 'claritin-b136-chew-dye-free-grape-10',
    productName: "Children's Claritin Chewable Tablets, Dye-Free Grape (10ct)",
    formulaId: DYE_FREE,
    barcode: '041100598776',
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: dyeFreeFlags(),
    verdict: 'avoid',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. Dye-free is not Clean. This panel has no lake dyes, so it does not reuse claritin-chewable-aspartame-dye. Ages 2+.',
    source: 'Target PDP A-14778667 primary_barcode field, size tab 10ct. Inactive ingredients: aspartame, citric acid anhydrous, colloidal silicon dioxide, flavor, magnesium stearate, mannitol, microcrystalline cellulose, sodium starch glycolate, stearic acid. UPC is the Target primary_barcode field (draft, not verified).',
  }),
  expand({
    id: 'claritin-b136-chew-dye-free-grape-30',
    productName: "Children's Claritin Chewable Tablets, Dye-Free Grape (30ct)",
    formulaId: DYE_FREE,
    barcode: '041100598790',
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: dyeFreeFlags(),
    verdict: 'avoid',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. Same dye-free grape list as the 10ct. The dyed grape row on MAIN was not rewritten. Ages 2+.',
    source: 'Target PDP A-14778667 primary_barcode field, size tab 30ct. Inactive ingredients match the 10ct dye-free grape tab. UPC is the Target primary_barcode field (draft, not verified).',
  }),
  expand({
    id: 'claritin-b136-chew-dye-free-grape-60',
    productName: "Children's Claritin Chewable Tablets, Dye-Free Grape (60ct)",
    formulaId: DYE_FREE,
    barcode: '041100598813',
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: dyeFreeFlags(),
    verdict: 'avoid',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. Same dye-free grape list as the 10ct and 30ct. Ages 2+.',
    source: 'Target PDP A-14778667 primary_barcode field, size tab 60ct. Inactive ingredients match the 10ct dye-free grape tab. UPC is the Target primary_barcode field (draft, not verified).',
  }),
  expand({
    id: 'claritin-b136-chew-max-grape-30',
    productName: "Children's Claritin Max Strength Chewable Tablets, Dye-Free Grape (30ct)",
    formulaId: DYE_FREE,
    barcode: '041100606303',
    audience: 'kids',
    minAge: 6,
    form: 'chewable tablet',
    actives: LORA,
    flags: dyeFreeFlags(),
    verdict: 'avoid',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. 10mg dye-free grape uses the same inactive list as the 5mg dye-free grape chews. Ages 6+.',
    source: 'Target PDP A-94965165 primary_barcode field, package quantity 30. Inactive ingredients: aspartame, citric acid anhydrous, colloidal silicon dioxide, flavor, magnesium stearate, mannitol, microcrystalline cellulose, sodium starch glycolate, stearic acid. UPC is the Target primary_barcode field (draft, not verified).',
  }),
  expand({
    id: 'claritin-b136-kids-reditab-30',
    productName: "Children's Claritin RediTabs (30ct)",
    formulaId: REDITAB,
    barcode: '041100593689',
    audience: 'kids',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: LORA,
    flags: rediFlags(),
    verdict: 'caution',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Caution. Mannitol and mint flavor are Limited. The title says grape and the drug facts print mint flavor. The list matches claritin-reditabs, so this row reuses that formula. Ages 6+.',
    source: 'Target PDP A-51806204 primary_barcode field, package quantity 30. Inactive ingredients: anhydrous citric acid, gelatin, mannitol, mint flavor. That list matches DailyMed setid b681ea25 (10mg RediTabs) and setid 7dc04b48 (5mg RediTabs). UPC is the Target primary_barcode field (draft, not verified).',
  }),
  expand({
    id: 'claritin-b136-kids-syrup-4oz',
    productName: "Children's Claritin Allergy Syrup, Grape (4 fl oz)",
    formulaId: KIDS_LIQUID,
    barcode: '041100811028',
    audience: 'kids',
    minAge: 2,
    form: 'liquid',
    actives: [{ name: 'Loratadine', strength: '5mg / 5mL' }],
    flags: kidsLiquidFlags(),
    verdict: 'avoid',
    kids: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are sucralose and oral propylene glycol. Dye-free is not Clean. The 4 fl oz list matches childrens-claritin-liquid. The 8 fl oz barcode on that MAIN row was not rewritten. Ages 2+.',
    source: 'Target PDP A-11199022 UPC field, count tab 4.0, title 4oz. Inactive ingredients: edetate disodium, flavor, glycerin, maltitol, monobasic sodium phosphate, phosphoric acid, propylene glycol, purified water, sodium benzoate, sorbitol, sucralose. That list matches DailyMed setid 170061e9. UPC is the Target UPC field (draft, not verified).',
  }),
  expand({
    id: 'claritin-b136-chew-cool-mint-8',
    productName: 'Claritin Chewable Tablets, Cool Mint (8ct)',
    formulaId: MINT,
    barcode: '041100580979',
    audience: 'adult',
    minAge: 6,
    form: 'chewable tablet',
    actives: LORA,
    flags: mintFlags(),
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are aspartame and FD&C Blue No. 1 aluminum lake. Menthol on the inactive line is the flavor row. Ages 6+.',
    source: `DailyMed setid 98b99bb9-d499-9ab4-e053-2a95a90a6ae6 panel "Carton 8 count" and one 8-tablet blister in one carton (NDC 11523-4364-6). Inactive ingredients: anhydrous citric acid, aspartame, FD&C blue no. 1 aluminum lake, magnesium stearate, mannitol, menthol, microcrystalline cellulose, silicon dioxide, sodium starch glycolate type A corn, stearic acid. UPC left empty: Target search for Cool Mint did not return a product page. claritin.com returned 403 (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-d24-ec-5',
    productName: 'Claritin-D 24 Hour (5ct)',
    formulaId: D24_EC,
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D_ACTIVES,
    flags: d24EcFlags(),
    verdict: 'avoid',
    pharmacy: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. This ethylcellulose panel does not share the plain tablet formula or the 12-hour formula. Ages 12+.',
    source: `DailyMed setid ${D24_EC_SET} prints "5 EXTENDED RELEASE TABLETS" on NDC 11523-4332-1 (5 tablets in one blister, one carton). Inactives: carnauba wax, dibasic calcium phosphate dihydrate, ethylcellulose, hydroxypropyl cellulose, hypromellose, magnesium stearate, pharmaceutical ink, polyethylene glycol, povidone, silicon dioxide, sucrose, titanium dioxide. UPC left empty: no opened US retailer PDP printed a 12-digit Product UPC for this 5ct. A directionsforme.org digit string matched the 12-hour barcode already on MAIN and was not used (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-d24-ec-10',
    productName: 'Claritin-D 24 Hour (10ct, ethylcellulose)',
    formulaId: D24_EC,
    barcode: '041100810861',
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D_ACTIVES,
    flags: d24EcFlags(),
    verdict: 'avoid',
    pharmacy: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Same ethylcellulose panel as the 5ct. The talc 10ct is a different formula. Ages 12+.',
    source: `DailyMed setid ${D24_EC_SET} package NDC 11523-4332-2 is 10 extended-release tablets in one blister in one carton. Same inactive paragraph as the 5ct panel. UPC left empty: no opened US retailer PDP printed a Product UPC for this carton (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-d24-ec-15',
    productName: 'Claritin-D 24 Hour (15ct, ethylcellulose)',
    formulaId: D24_EC,
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D_ACTIVES,
    flags: d24EcFlags(),
    verdict: 'avoid',
    pharmacy: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. One carton of three 5-count blister cards. Same ethylcellulose panel. Ages 12+.',
    source: `DailyMed setid ${D24_EC_SET} package NDC 11523-4332-3 is 3 blister packs of 5 extended-release tablets in one carton. Same inactive paragraph as the 5ct panel. UPC left empty: no opened US retailer PDP printed a Product UPC for this carton (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-d24-talc-10',
    productName: 'Claritin-D 24 Hour (10ct, talc)',
    formulaId: D24_TALC,
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D_ACTIVES,
    flags: d24TalcFlags(),
    verdict: 'avoid',
    pharmacy: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are titanium dioxide and talc. This panel does not share the ethylcellulose 24-hour formula. Ages 12+.',
    source: `DailyMed setid ${D24_TALC_SET} principal display panel "10 Tablet Blister Pack Carton" and package NDC 11523-0102-1 (10 tablets in one blister, one carton). Inactives: black iron oxide, candelilla wax, colloidal silicon dioxide, glyceryl monostearate, hypromellose, lactose monohydrate, magnesium stearate, polyethylene glycol, polysorbate 80, propylene glycol, sodium lauryl sulfate, talc, titanium dioxide. UPC left empty: no opened US retailer PDP printed a Product UPC for this carton (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-d24-talc-15',
    productName: 'Claritin-D 24 Hour (15ct, talc)',
    formulaId: D24_TALC,
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D_ACTIVES,
    flags: d24TalcFlags(),
    verdict: 'avoid',
    pharmacy: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are titanium dioxide and talc. Same talc panel as the 10ct. Ages 12+.',
    source: `DailyMed setid ${D24_TALC_SET} package NDC 11523-0102-2 is 15 extended-release tablets in one blister in one carton. Same inactive paragraph as the 10ct talc panel. UPC left empty: no opened US retailer PDP printed a Product UPC for this carton (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-d12-20',
    productName: 'Claritin-D 12 Hour (20ct)',
    formulaId: D12,
    barcode: '041100802170',
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D12_ACTIVES,
    flags: d12Flags(),
    verdict: 'avoid',
    pharmacy: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. This 20ct reuses claritin-d-12hr-tio2. It does not share the plain tablet formula. The uncounted 12-hour row on MAIN was not rewritten. Ages 12+.',
    source: `DailyMed setid ${D12_SET} package NDC 11523-7162-2 is two 10-tablet blister packs in one carton (20 extended-release tablets). Inactives match the MAIN 12-hour row: croscarmellose sodium, dibasic calcium phosphate, hypromellose, lactose monohydrate, magnesium stearate, povidone, titanium dioxide. UPC left empty: the Kroger 20ct URL did not open, and no second US page printed a Product UPC (draft, not verified).`,
  }),
  expand({
    id: 'claritin-b136-d12-30',
    productName: 'Claritin-D 12 Hour (30ct)',
    formulaId: D12,
    barcode: '041100803191',
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D12_ACTIVES,
    flags: d12Flags(),
    verdict: 'avoid',
    pharmacy: true,
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. This 30ct reuses claritin-d-12hr-tio2. Ages 12+.',
    source: `DailyMed setid ${D12_SET} package NDC 11523-7162-3 is three 10-tablet blister packs in one carton (30 extended-release tablets). Same inactive list as the MAIN 12-hour row. UPC left empty: no opened US retailer PDP printed a Product UPC for this carton (draft, not verified).`,
  }),
];

const ROWS = BATCH136_KYR6B_CLARITIN_FIRST_SLICE;
if (ROWS.length !== 24) throw new Error('batch136 row count');
const ids = new Set(ROWS.map((r) => r.id));
if (ids.size !== ROWS.length) throw new Error('batch136 duplicate id');
const bars = ROWS.map((r) => r.barcode).filter((b): b is string => Boolean(b));
if (new Set(bars).size !== bars.length) throw new Error('batch136 duplicate barcode');
if (bars.some((b) => !/^\d{12}$/.test(b))) throw new Error('batch136 barcode width');
if (ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch136 Clean has a flag');
}
if (ROWS.some((r) => r.formulaId === PLAIN && r.productName.includes('Liqui'))) {
  throw new Error('batch136 liqui-gel shared the plain tablet formula');
}
if (ROWS.some((r) => r.productName.startsWith('Claritin-D') && r.formulaId === PLAIN)) {
  throw new Error('batch136 Claritin-D shared the plain tablet formula');
}
if (ROWS.filter((r) => r.formulaId === D24_EC).some((r) => r.formulaId === D24_TALC)) {
  throw new Error('batch136 24-hour formulas collided');
}
