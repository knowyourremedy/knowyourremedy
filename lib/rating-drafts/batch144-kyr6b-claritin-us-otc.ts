// DRAFT / not verified / batch 144 KYR6-b Claritin US OTC.
// New packs only. batch70–143 were not edited. A row is written only
// when that pack's inactive line was read on its DailyMed SPL and the
// exact count/form is not already a row on MAIN. Exact twins reuse the
// formulaId. UPC stays empty when the bars or a count-specific spec were
// not read for that pack. Multipacks and kits are not rows.
//
// TALLY: 45 written — Clean 24 / Caution 6 / Avoid 15.
// NEW 0 / REUSE 45. Ungraded tokens: 0.

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
  dyes: 'Methodology §5 High (FD&C / D&C dyes, including lake forms). Avoid.',
  aspartame: 'Methodology §5 High (aspartame). Avoid.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  pg: 'Methodology §5 Moderate (oral propylene glycol).',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  maltitol: 'Methodology §5 Limited (maltitol).',
  flavor: 'Methodology §5 Limited (flavor / flavors). Menthol on an inactive line maps here.',
  benzoate: 'Methodology §5 Limited (sodium benzoate).',
  mct: 'Methodology §5 Limited (unlabeled MCT). Caprylic/capric glycerides names no plant.',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  carmine: 'Methodology §5 Caution (carmine). Not Avoid.',
  sio2: 'Methodology §5 Caution (silicon dioxide, 0-point nanoparticle cap).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const PLAIN = 'claritin-allergy-tablets-plain';
const MCC = 'claritin-b136-tablets-mcc';
const GEL = 'claritin-b136-liquigels';
const REDITAB = 'claritin-reditabs';
const KIDS_LIQUID = 'childrens-claritin-liquid';
const BUBBLE = 'claritin-b136-chew-bubblegum';
const MINT = 'claritin-b136-chew-cool-mint';

const STARCH_SET = '660ac9df-f1b1-4c89-94dd-9fae0a013f3c';
const STARCH_70_SET = 'ac32d6f9-f553-4d5c-ad36-575af5ea56de';
const MCC_100_SET = 'dc65f7ec-bb83-7b29-e053-2995a90a99de';
const MCC_SET = 'acf2d393-53d7-062f-e053-2995a90a0d60';
const GEL_SET = '8e14b61f-faf6-43a8-a080-75f64514217a';
const REDI_SET = 'b681ea25-d00b-4c8a-8054-cc6f983ce337';
const KIDS_LIQ_SET = '170061e9-e529-4ff0-e054-00144ff8d46c';
const BUBBLE_SET = '20938e05-bc3e-51aa-e054-00144ff88e88';
const MINT_SET = '98b99bb9-d499-9ab4-e053-2a95a90a6ae6';

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

function starchFlags(setid: string): IngredientFlag[] {
  return [
    cleared(setid, 'Corn starch'),
    cleared(setid, 'Lactose monohydrate'),
    cleared(setid, 'Magnesium stearate'),
  ];
}
function mccFlags(setid: string): IngredientFlag[] {
  return [
    cleared(setid, 'Lactose monohydrate'),
    cleared(setid, 'Magnesium stearate'),
    cleared(setid, 'Microcrystalline cellulose'),
    cleared(setid, 'Sodium starch glycolate'),
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

const LORA = [{ name: 'Loratadine', strength: '10 mg' }];
const LORA5 = [{ name: 'Loratadine', strength: '5 mg' }];
const SYRUP_ACTIVE = [{ name: 'Loratadine', strength: '5 mg / 5 mL' }];

const STARCH_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Corn starch, lactose monohydrate, and magnesium stearate are Cleared. Same inactive line as claritin-allergy-tablets-plain. The starch counts already on MAIN were not rewritten. Ages 6+.';
const MCC_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Lactose monohydrate, magnesium stearate, microcrystalline cellulose, and sodium starch glycolate are Cleared. Same inactive line as claritin-b136-tablets-mcc. The starch-tablet counts were not rewritten. Ages 6+.';
const GEL_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is FD&C Blue No. 1. Polysorbate 80 is Moderate and is not the Avoid driver. Caprylic/capric glycerides stay the unlabeled MCT row. Same inactive line as claritin-b136-liquigels. The 10, 30, and 60 count rows were not rewritten. Ages 6+.';
const REDI_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Mannitol and mint flavor are Limited. Same inactive line as claritin-reditabs. This is the 10 mg RediTabs count. The 30-count kids row and the 5 mg codes on the no-count row were not rewritten. Ages 6+.';
const BUBBLE_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. Carmine is Caution and is not the Avoid driver. Same inactive line as claritin-b136-chew-bubblegum. Ages 2+.';
const MINT_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers are aspartame and FD&C Blue No. 1 aluminum lake. Menthol on the inactive line is the flavor row. Same inactive line as claritin-b136-chew-cool-mint. The 8-count was not rewritten. Ages 6+.';
const SYRUP_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers are sucralose and oral propylene glycol. Dye-free is not Clean. Same inactive line as childrens-claritin-liquid. The 4 fl oz row and the 8 fl oz code on that MAIN row were not rewritten. Ages 2+.';

type Spec = {
  id: string;
  productName: string;
  formulaId: string;
  audience: 'adult' | 'kids';
  minAge: number;
  form: string;
  actives: RatingRecord['activeIngredients'];
  flags: IngredientFlag[];
  verdict: RatingRecord['verdict'];
  note: string;
  source: string;
};

function expand(d: Spec): RatingRecord {
  return {
    id: d.id,
    productName: d.productName,
    brand: 'Claritin',
    category: ALLERGIES,
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
    cleanAlternatives: d.verdict === 'clean' ? undefined : d.audience === 'kids' ? KIDS_ALTS : ADULT_ALTS,
    sourcesGeneral: [d.source],
  };
}

const STARCH_SRC =
  'DailyMed setid 660ac9df-f1b1-4c89-94dd-9fae0a013f3c and setid ac32d6f9-f553-4d5c-ad36-575af5ea56de. Inactive ingredients: corn starch, lactose monohydrate, magnesium stearate. UPC left empty. Carton images already decoded for counts on MAIN were not copied.';
const MCC_SRC =
  'DailyMed setid acf2d393-53d7-062f-e053-2995a90a0d60. Inactive ingredients: lactose monohydrate, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. UPC left empty: the only carton image on this setid is the 10-count, and zbar did not return a UPC-A. That image was not used as a code for any other count.';

export const BATCH144_KYR6B_CLARITIN_US_OTC: RatingRecord[] = [
  expand({
    id: 'claritin-b144-tablets-mcc-5',
    productName: 'Claritin 24-Hour Allergy Tablets (5ct MCC)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_100_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source:
      'DailyMed setid dc65f7ec-bb83-7b29-e053-2995a90a99de. Inactive ingredients: lactose monohydrate, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. Package NDC 11523-0800-1 is 5 tablets in 1 blister in 1 carton. This is not the starch 5-count code on claritin-allergy-tablets-plain. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-10',
    productName: 'Claritin 24-Hour Allergy Tablets (10ct MCC)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-1 is 10 tablets in 1 blister in 1 carton. This is not the starch 10-count code on claritin-allergy-tablets-plain.`,
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-20',
    productName: 'Claritin 24-Hour Allergy Tablets (20ct MCC)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-2 is 2 blisters of 10 in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-30',
    productName: 'Claritin 24-Hour Allergy Tablets (30ct MCC bottle)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-3 is 30 tablets in 1 bottle. The starch 30-count row claritin-b136-tablets-30 was not rewritten.`,
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-40',
    productName: 'Claritin 24-Hour Allergy Tablets (40ct MCC bottle)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-4 is 40 tablets in 1 bottle.`,
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-45',
    productName: 'Claritin 24-Hour Allergy Tablets (45ct MCC bottle)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-5 is 45 tablets in 1 bottle. The starch 45-count row claritin-b136-tablets-45 was not rewritten.`,
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-60',
    productName: 'Claritin 24-Hour Allergy Tablets (60ct MCC bottle)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-9 is 60 tablets in 1 bottle.`,
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-70',
    productName: 'Claritin 24-Hour Allergy Tablets (70ct MCC bottle)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-6 is 70 tablets in 1 bottle. The starch 70-count row claritin-b136-tablets-70 was not rewritten.`,
  }),
  expand({
    id: 'claritin-b144-tablets-mcc-85',
    productName: 'Claritin 24-Hour Allergy Tablets (85ct MCC bottle)',
    formulaId: MCC,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: mccFlags(MCC_SET),
    verdict: 'clean',
    note: MCC_NOTE,
    source: `${MCC_SRC} Package NDC 11523-0007-7 is 85 tablets in 1 bottle.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-15',
    productName: 'Claritin 24-Hour Allergy Tablets (15ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-7237-6 is 3 blisters of 5 in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-20',
    productName: 'Claritin 24-Hour Allergy Tablets (20ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-7160-3 is 2 blisters of 10 in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-25',
    productName: 'Claritin 24-Hour Allergy Tablets (25ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_70_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-6655-7 is 25 one-count pouches in 1 box. The 50-count pouch box already on MAIN was not rewritten.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-35',
    productName: 'Claritin 24-Hour Allergy Tablets (35ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-4359-9 is 35 tablets in 1 bottle in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-40',
    productName: 'Claritin 24-Hour Allergy Tablets (40ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-7237-7 is 4 blisters of 10 in 1 carton. Package NDC 11523-4359-1 is 40 tablets in 1 bottle in 1 carton. Same starch line, one 40-count row. The MCC 40-count bottle is a separate row.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-55',
    productName: 'Claritin 24-Hour Allergy Tablets (55ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-4359-4 is 55 tablets in 1 bottle in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-60',
    productName: 'Claritin 24-Hour Allergy Tablets (60ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDCs 11523-7160-8 and 11523-7160-9 are 60 tablets in 1 bottle in 1 carton. Setid ac32d6f9 package NDC 11523-6655-5 is the same 60-count bottle. The 2-bottle pack NDC 11523-4359-8 is not this row.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-80',
    productName: 'Claritin 24-Hour Allergy Tablets (80ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_70_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-6655-9 is 80 tablets in 1 bottle in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-85',
    productName: 'Claritin 24-Hour Allergy Tablets (85ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-4359-5 is 85 tablets in 1 bottle in 1 carton. The MCC 85-count bottle is a separate row.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-90',
    productName: 'Claritin 24-Hour Allergy Tablets (90ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-7237-9 is 90 tablets in 1 bottle in 1 carton. Package NDC 11523-7237-5 is the same 90-count bottle.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-100',
    productName: 'Claritin 24-Hour Allergy Tablets (100ct starch)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-4359-2 is 100 tablets in 1 bottle in 1 carton. The MCC 100-count row claritin-b136-tablets-100-mcc was not rewritten.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-105',
    productName: 'Claritin 24-Hour Allergy Tablets (105ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_70_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDCs 11523-6655-4 and 11523-6655-6 are 105 tablets in 1 bottle.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-108',
    productName: 'Claritin 24-Hour Allergy Tablets (108ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-7237-8 is 108 tablets in 1 bottle in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-110',
    productName: 'Claritin 24-Hour Allergy Tablets (110ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-4359-6 is 110 tablets in 1 bottle in 1 carton.`,
  }),
  expand({
    id: 'claritin-b144-tablets-starch-115',
    productName: 'Claritin 24-Hour Allergy Tablets (115ct)',
    formulaId: PLAIN,
    audience: 'adult',
    minAge: 6,
    form: 'tablet',
    actives: LORA,
    flags: starchFlags(STARCH_SET),
    verdict: 'clean',
    note: STARCH_NOTE,
    source: `${STARCH_SRC} Package NDC 11523-4359-7 is 115 tablets in 1 bottle. The MCC 2-bottle carton NDC 11523-0007-8 is not this row.`,
  }),
  expand({
    id: 'claritin-b144-liquigels-5',
    productName: 'Claritin Liqui-Gels (5ct)',
    formulaId: GEL,
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source:
      'DailyMed setid 8e14b61f-faf6-43a8-a080-75f64514217a. Inactive ingredients: caprylic/capric glycerides, FD&C blue no. 1, gelatin, glycerin, pharmaceutical ink, polysorbate 80, povidone, purified water, sorbitol. Package NDC 11523-7333-1 is 5 capsules in 1 blister in 1 carton. Marketing status active. The carton images on this setid are the 30-count and were not used. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-liquigels-36',
    productName: 'Claritin Liqui-Gels (36ct)',
    formulaId: GEL,
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source:
      'DailyMed setid 8e14b61f-faf6-43a8-a080-75f64514217a, same liqui-gel inactive line. Package NDC 11523-7333-3 is 4 blisters of 9 in 1 carton. Marketing status active. UPC left empty. The 30-count carton image was not used.',
  }),
  expand({
    id: 'claritin-b144-liquigels-40',
    productName: 'Claritin Liqui-Gels (40ct)',
    formulaId: GEL,
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source:
      'DailyMed setid 8e14b61f-faf6-43a8-a080-75f64514217a, same liqui-gel inactive line. Package NDC 11523-7200-8 is 4 blisters of 10 in 1 carton, marketing status active. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-liquigels-70',
    productName: 'Claritin Liqui-Gels (70ct)',
    formulaId: GEL,
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source:
      'DailyMed setid 8e14b61f-faf6-43a8-a080-75f64514217a, same liqui-gel inactive line. Package NDC 11523-7333-4 is 7 blisters of 10 in 1 carton. Marketing status active. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-liquigels-100',
    productName: 'Claritin Liqui-Gels (100ct)',
    formulaId: GEL,
    audience: 'adult',
    minAge: 6,
    form: 'liquid-filled capsule',
    actives: LORA,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source:
      'DailyMed setid 8e14b61f-faf6-43a8-a080-75f64514217a, same liqui-gel inactive line. Package NDC 11523-7333-5 is 10 blisters of 10 in 1 carton. Marketing status active. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-reditabs-10',
    productName: 'Claritin RediTabs (10ct)',
    formulaId: REDITAB,
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: LORA,
    flags: rediFlags(),
    verdict: 'caution',
    note: REDI_NOTE,
    source:
      'DailyMed setid b681ea25-d00b-4c8a-8054-cc6f983ce337. Active loratadine 10 mg. Inactive ingredients: anhydrous citric acid, gelatin, mannitol, mint flavor. Package NDC 11523-7157-2 is 10 orally disintegrating tablets in 1 blister in 1 carton. UPC left empty. The 5 mg codes on claritin-reditabs were not copied.',
  }),
  expand({
    id: 'claritin-b144-reditabs-20',
    productName: 'Claritin RediTabs (20ct)',
    formulaId: REDITAB,
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: LORA,
    flags: rediFlags(),
    verdict: 'caution',
    note: REDI_NOTE,
    source:
      'DailyMed setid b681ea25-d00b-4c8a-8054-cc6f983ce337, same RediTabs inactive line. Package NDC 11523-7157-4 is 2 blisters of 10 in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-reditabs-40',
    productName: 'Claritin RediTabs (40ct)',
    formulaId: REDITAB,
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: LORA,
    flags: rediFlags(),
    verdict: 'caution',
    note: REDI_NOTE,
    source:
      'DailyMed setid b681ea25-d00b-4c8a-8054-cc6f983ce337, same RediTabs inactive line. Package NDC 11523-7157-7 is 4 blisters of 10 in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-reditabs-50',
    productName: 'Claritin RediTabs (50ct)',
    formulaId: REDITAB,
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: LORA,
    flags: rediFlags(),
    verdict: 'caution',
    note: REDI_NOTE,
    source:
      'DailyMed setid b681ea25-d00b-4c8a-8054-cc6f983ce337, same RediTabs inactive line. Package NDC 11523-7157-8 is 5 blisters of 10 in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-reditabs-60',
    productName: 'Claritin RediTabs (60ct)',
    formulaId: REDITAB,
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: LORA,
    flags: rediFlags(),
    verdict: 'caution',
    note: REDI_NOTE,
    source:
      'DailyMed setid b681ea25-d00b-4c8a-8054-cc6f983ce337, same RediTabs inactive line. Package NDC 11523-4329-2 is 6 blisters of 10 in 1 carton. This is one carton, not the twin pack NDC 11523-4329-1. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-reditabs-70',
    productName: 'Claritin RediTabs (70ct)',
    formulaId: REDITAB,
    audience: 'adult',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: LORA,
    flags: rediFlags(),
    verdict: 'caution',
    note: REDI_NOTE,
    source:
      'DailyMed setid b681ea25-d00b-4c8a-8054-cc6f983ce337, same RediTabs inactive line. Package NDC 11523-7157-9 is 7 blisters of 10 in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-chew-bubblegum-40',
    productName: "Children's Claritin Chewable Tablets, Bubblegum (40ct)",
    formulaId: BUBBLE,
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: bubbleFlags(),
    verdict: 'avoid',
    note: BUBBLE_NOTE,
    source:
      'DailyMed setid 20938e05-bc3e-51aa-e054-00144ff88e88. Inactive ingredients: aspartame, carmine, citric acid, colloidal silicon dioxide, flavor, magnesium stearate, mannitol, microcrystalline cellulose, sodium starch glycolate, stearic acid. Package NDC 11523-4330-4 is 4 blisters of 10 in 1 carton. The 10-count and 30-count rows were not rewritten. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-chew-cool-mint-2',
    productName: 'Claritin Chewable Tablets, Cool Mint (2ct)',
    formulaId: MINT,
    audience: 'adult',
    minAge: 6,
    form: 'chewable tablet',
    actives: LORA,
    flags: mintFlags(),
    verdict: 'avoid',
    note: MINT_NOTE,
    source:
      'DailyMed setid 98b99bb9-d499-9ab4-e053-2a95a90a6ae6. Inactive ingredients: anhydrous citric acid, aspartame, FD&C blue no. 1 aluminum lake, magnesium stearate, mannitol, menthol, microcrystalline cellulose, silicon dioxide, sodium starch glycolate, stearic acid. Package NDC 11523-4364-2 is 2 chewable tablets in 1 blister in 1 carton. UPC left empty. The 8-count code 041100580979 was not copied.',
  }),
  expand({
    id: 'claritin-b144-chew-cool-mint-4',
    productName: 'Claritin Chewable Tablets, Cool Mint (4ct)',
    formulaId: MINT,
    audience: 'adult',
    minAge: 6,
    form: 'chewable tablet',
    actives: LORA,
    flags: mintFlags(),
    verdict: 'avoid',
    note: MINT_NOTE,
    source:
      'DailyMed setid 98b99bb9-d499-9ab4-e053-2a95a90a6ae6, same cool-mint inactive line. Package NDC 11523-4364-3 is 4 chewable tablets in 1 blister in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-chew-cool-mint-24',
    productName: 'Claritin Chewable Tablets, Cool Mint (24ct)',
    formulaId: MINT,
    audience: 'adult',
    minAge: 6,
    form: 'chewable tablet',
    actives: LORA,
    flags: mintFlags(),
    verdict: 'avoid',
    note: MINT_NOTE,
    source:
      'DailyMed setid 98b99bb9-d499-9ab4-e053-2a95a90a6ae6, same cool-mint inactive line. Package NDC 11523-4364-1 is 3 blisters of 8 in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-chew-cool-mint-56',
    productName: 'Claritin Chewable Tablets, Cool Mint (56ct)',
    formulaId: MINT,
    audience: 'adult',
    minAge: 6,
    form: 'chewable tablet',
    actives: LORA,
    flags: mintFlags(),
    verdict: 'avoid',
    note: MINT_NOTE,
    source:
      'DailyMed setid 98b99bb9-d499-9ab4-e053-2a95a90a6ae6, same cool-mint inactive line. Package NDC 11523-4364-4 is 7 blisters of 8 in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-chew-cool-mint-64',
    productName: 'Claritin Chewable Tablets, Cool Mint (64ct)',
    formulaId: MINT,
    audience: 'adult',
    minAge: 6,
    form: 'chewable tablet',
    actives: LORA,
    flags: mintFlags(),
    verdict: 'avoid',
    note: MINT_NOTE,
    source:
      'DailyMed setid 98b99bb9-d499-9ab4-e053-2a95a90a6ae6, same cool-mint inactive line. Package NDC 11523-4364-5 is 8 blisters of 8 in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-kids-syrup-1oz',
    productName: "Children's Claritin Allergy Syrup, Grape (1 fl oz)",
    formulaId: KIDS_LIQUID,
    audience: 'kids',
    minAge: 2,
    form: 'liquid',
    actives: SYRUP_ACTIVE,
    flags: kidsLiquidFlags(),
    verdict: 'avoid',
    note: SYRUP_NOTE,
    source:
      'DailyMed setid 170061e9-e529-4ff0-e054-00144ff8d46c. Inactive ingredients: edetate disodium, flavor, glycerin, maltitol, monobasic sodium phosphate, phosphoric acid, propylene glycol, purified water, sodium benzoate, sorbitol, sucralose. Package NDC 11523-4360-4 is 30 mL in 1 bottle in 1 carton. The grape carton image on this setid decoded to 041100810991, already on childrens-claritin-liquid, and was not copied here. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-kids-syrup-2oz',
    productName: "Children's Claritin Allergy Syrup, Grape (2 fl oz)",
    formulaId: KIDS_LIQUID,
    audience: 'kids',
    minAge: 2,
    form: 'liquid',
    actives: SYRUP_ACTIVE,
    flags: kidsLiquidFlags(),
    verdict: 'avoid',
    note: SYRUP_NOTE,
    source:
      'DailyMed setid 170061e9-e529-4ff0-e054-00144ff8d46c, same grape syrup inactive line. Package NDC 11523-4360-1 is 60 mL in 1 bottle in 1 carton. UPC left empty. The carton image code 041100810991 was not copied.',
  }),
  expand({
    id: 'claritin-b144-kids-syrup-5oz',
    productName: "Children's Claritin Allergy Syrup, Grape (5 fl oz)",
    formulaId: KIDS_LIQUID,
    audience: 'kids',
    minAge: 2,
    form: 'liquid',
    actives: SYRUP_ACTIVE,
    flags: kidsLiquidFlags(),
    verdict: 'avoid',
    note: SYRUP_NOTE,
    source:
      'DailyMed setid 170061e9-e529-4ff0-e054-00144ff8d46c, same grape syrup inactive line. Package NDC 11523-4360-3 is 150 mL in 1 bottle in 1 carton. UPC left empty.',
  }),
  expand({
    id: 'claritin-b144-kids-syrup-6oz',
    productName: "Children's Claritin Allergy Syrup, Grape (6 fl oz)",
    formulaId: KIDS_LIQUID,
    audience: 'kids',
    minAge: 2,
    form: 'liquid',
    actives: SYRUP_ACTIVE,
    flags: kidsLiquidFlags(),
    verdict: 'avoid',
    note: SYRUP_NOTE,
    source:
      'DailyMed setid 170061e9-e529-4ff0-e054-00144ff8d46c, same grape syrup inactive line. Package NDC 11523-4360-6 is 180 mL in 1 bottle in 1 carton. This is the single bottle, not the 2-pack NDC 11523-4360-7. UPC left empty.',
  }),
];

const ROWS = BATCH144_KYR6B_CLARITIN_US_OTC;
if (ROWS.length !== 45) throw new Error(`batch144 row count ${ROWS.length}`);
if (new Set(ROWS.map((r) => r.id)).size !== 45) throw new Error('batch144 duplicate id');
if (ROWS.some((r) => r.barcode)) throw new Error('batch144 unexpected upc');
const clean = ROWS.filter((r) => r.verdict === 'clean');
const caution = ROWS.filter((r) => r.verdict === 'caution');
const avoid = ROWS.filter((r) => r.verdict === 'avoid');
if (clean.length !== 24 || caution.length !== 6 || avoid.length !== 15) {
  throw new Error(`batch144 verdicts ${clean.length}/${caution.length}/${avoid.length}`);
}
if (clean.some((r) => r.formulaId !== MCC && r.formulaId !== PLAIN)) throw new Error('batch144 clean formula');
if (caution.some((r) => r.formulaId !== REDITAB)) throw new Error('batch144 redi');
if (ROWS.some((r) => r.inactiveIngredients.length === 0)) throw new Error('batch144 empty panel');
