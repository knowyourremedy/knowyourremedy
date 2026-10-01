// DRAFT / not verified / batch 137 KYR6-b Allegra US OTC first slice.
// Chattem DailyMed labels plus opened Target count tabs. batch70–136 were not edited.
// Already-on-MAIN Allegra rows were not rewritten. Exact inactive twins would reuse their formulaId.
// The current panels are not twins of those MAIN formulas, so every written row is a new formula.
// Allegra-D does not share the plain tablet formula. 12-hour D and 24-hour D do not share a formulaId.
// Allegra-D 24 Hour is not written. Cellulose acetate has no family on MAIN.
//
// TALLY: 21 written — Clean 0 / Caution 3 / Avoid 18.
// NEW 21 / REUSE 7 / SKIPPED no_OI 0 / SKIPPED OUT 26 / REFUSED 1.
// REUSE 7 = 0 written rows on an existing formula + 7 already-on-MAIN packs.

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
  peg: 'Methodology §5 Moderate (polyethylene glycol). PEG-135 is the UNII synonym of polyethylene glycol 6000. Not a new grade.',
  pg: 'Methodology §5 Moderate (oral propylene glycol).',
  sio2: 'Methodology §5 Caution (silicon dioxide, 0-point nanoparticle cap). Not Avoid.',
  iron: 'Methodology §5 Caution (iron oxide as color). Iron oxide blends sit on this row. Not Avoid.',
  flavor: 'Methodology §5 Caution (flavor / flavors). Exact “Natural flavors” stays Limited. Not Avoid.',
  ink: 'Methodology §5 Caution (pharmaceutical ink). Not Avoid.',
  carnauba: 'Methodology §5 Caution (carnauba wax). Not the old Cleared wax row. Not Avoid.',
  enteric: 'Methodology §5 Caution (methacrylic acid copolymer, enteric). Not Avoid.',
  poloxamer: 'Methodology §5 Caution (poloxamer 407, poloxamer family). Not High.',
  edetate: 'Methodology §5 Caution (edetate disodium, EDTA). Not the Cleared disodium EDTA trace row.',
  sorbate: 'Methodology §5 Limited (potassium sorbate, synthetic preservative).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  xylitol: 'Methodology §5 Limited (oral xylitol).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const FILM = 'allegra-b137-film-tablets';
const GEL = 'allegra-b137-gelcaps';
const ODT = 'allegra-b137-kids-odt';
const LIQ = 'allegra-b137-kids-liquid';
const D12 = 'allegra-b137-d12';

const TAB_SET = '81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173';
const HIVES_TAB_SET = '490b4c5f-448b-4563-928b-837117b59b9f';
const GEL_SET = 'f061d6b1-89f7-4d5f-ac59-9c73408517c1';
const ODT_SET = '06115cea-5a44-409d-85ed-bb71743491c1';
const LIQ_SET = 'e2bd23c7-dfba-463a-adbe-2183970da740';
const HIVES_LIQ_SET = 'ff50d9cd-d849-43e8-b32a-4dcde798d3eb';
const D12_SET = 'b32e172a-abf5-4c17-aa39-19e517952b91';

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

function filmFlags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(TAB_SET, METH.tio2)),
    flag('Polyethylene glycol', 'moderate', cite(TAB_SET, METH.peg)),
    flag('Iron oxide blends', 'limited', cite(TAB_SET, METH.iron)),
    flag('Colloidal silicon dioxide', 'limited', cite(TAB_SET, METH.sio2)),
    cleared(TAB_SET, 'Croscarmellose sodium'),
    cleared(TAB_SET, 'Hypromellose'),
    cleared(TAB_SET, 'Magnesium stearate'),
    cleared(TAB_SET, 'Microcrystalline cellulose'),
    cleared(TAB_SET, 'Povidone'),
    cleared(TAB_SET, 'Pregelatinized starch'),
  ];
}
function gelFlags(): IngredientFlag[] {
  return [
    flag('D&C red 28', 'high', cite(GEL_SET, METH.dyes)),
    flag('D&C red 33', 'high', cite(GEL_SET, METH.dyes)),
    flag('FD&C blue 1', 'high', cite(GEL_SET, METH.dyes)),
    flag('Titanium dioxide', 'high', cite(GEL_SET, METH.tio2)),
    flag('Polyethylene glycol', 'moderate', cite(GEL_SET, METH.peg)),
    flag('Pharmaceutical ink', 'limited', cite(GEL_SET, METH.ink)),
    cleared(GEL_SET, 'Croscarmellose sodium'),
    cleared(GEL_SET, 'Gelatin'),
    cleared(GEL_SET, 'Hydroxypropyl cellulose'),
    cleared(GEL_SET, 'Hypromellose'),
    cleared(GEL_SET, 'Magnesium stearate'),
    cleared(GEL_SET, 'Microcrystalline cellulose'),
    cleared(GEL_SET, 'Pregelatinized starch'),
  ];
}
function odtFlags(): IngredientFlag[] {
  return [
    flag('Aspartame', 'high', cite(ODT_SET, METH.aspartame)),
    flag('Flavors', 'limited', cite(ODT_SET, METH.flavor)),
    flag('Methacrylic acid copolymer', 'limited', cite(ODT_SET, METH.enteric)),
    flag('Silicon dioxide', 'limited', cite(ODT_SET, METH.sio2)),
    cleared(ODT_SET, 'Crospovidone'),
    cleared(ODT_SET, 'Lactose monohydrate'),
    cleared(ODT_SET, 'Magnesium stearate'),
    cleared(ODT_SET, 'Microcrystalline cellulose'),
    cleared(ODT_SET, 'Povidone'),
  ];
}
function liquidFlags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(LIQ_SET, METH.tio2)),
    flag('Propylene glycol', 'moderate', cite(LIQ_SET, METH.pg)),
    flag('Flavor', 'limited', cite(LIQ_SET, METH.flavor)),
    flag('Poloxamer 407', 'limited', cite(LIQ_SET, METH.poloxamer)),
    flag('Potassium sorbate', 'limited', cite(LIQ_SET, METH.sorbate)),
    flag('Sucrose', 'limited', cite(LIQ_SET, METH.sucrose)),
    flag('Xylitol', 'limited', cite(LIQ_SET, METH.xylitol)),
    flag('Edetate disodium', 'limited', cite(LIQ_SET, METH.edetate)),
    cleared(LIQ_SET, 'Purified water'),
    cleared(LIQ_SET, 'Sodium phosphate dibasic heptahydrate'),
    cleared(LIQ_SET, 'Sodium phosphate monobasic monohydrate'),
    cleared(LIQ_SET, 'Xanthan gum'),
  ];
}
function d12Flags(): IngredientFlag[] {
  return [
    flag('Polyethylene glycol', 'moderate', cite(D12_SET, METH.peg)),
    flag('Carnauba wax', 'limited', cite(D12_SET, METH.carnauba)),
    flag('Colloidal silicon dioxide', 'limited', cite(D12_SET, METH.sio2)),
    cleared(D12_SET, 'Croscarmellose sodium'),
    cleared(D12_SET, 'Hypromellose'),
    cleared(D12_SET, 'Magnesium stearate'),
    cleared(D12_SET, 'Microcrystalline cellulose'),
    cleared(D12_SET, 'Pregelatinized starch'),
    cleared(D12_SET, 'Stearic acid'),
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
    brand: 'Allegra',
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

const FEXO180 = [{ name: 'Fexofenadine HCl', strength: '180mg' }];
const FEXO60 = [{ name: 'Fexofenadine HCl', strength: '60mg' }];
const FEXO30 = [{ name: 'Fexofenadine HCl', strength: '30mg' }];
const FEXO_LIQ = [{ name: 'Fexofenadine HCl', strength: '30mg / 5mL' }];
const D12_ACTIVES = [
  { name: 'Fexofenadine HCl', strength: '60mg' },
  { name: 'Pseudoephedrine HCl', strength: '120mg' },
];

const FILM_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Iron oxide blends map to iron oxide as color and are not the Avoid driver. This list does not reuse allegra-allergy-24hr-tio2 because that MAIN formula omitted iron oxide blends and graded colloidal silicon dioxide Cleared. Ages 12+.';
const GEL_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C red 28, D&C red 33, FD&C blue 1, and titanium dioxide. PEG-135 maps to polyethylene glycol 6000. Hydroxypropylcellulose maps to hydroxypropyl cellulose. Hydroxypropyl methylcellulose maps to hypromellose. This list does not share the film-tablet formula. Ages 12+.';
const ODT_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is aspartame. Flavors, methacrylic acid copolymer, and silicon dioxide are Caution and are not the Avoid driver. This list does not reuse childrens-allegra-odt because that MAIN formula graded silicon dioxide and methacrylic acid copolymer Cleared. Phenylketonurics: contains phenylalanine. Ages 6+.';
const LIQ_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. The drug facts print flavor. Poloxamer 407 and edetate disodium are Caution and are not the Avoid driver. This list does not reuse childrens-allegra-liquid because that MAIN formula graded edetate disodium and sucrose Cleared and left poloxamer 407 ungraded. Ages 2+.';
const HIVES_LIQ_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Same inactive paragraph as the allergy suspension, so this row shares that formula. The carton says grape. The drug facts print flavor. Directions say children under 6 ask a doctor. Ages 6+.';
const D12_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Driver is polyethylene glycol (2 points). Carnauba wax and colloidal silicon dioxide are Caution and are not Avoid. No High flag. This formula does not share the plain tablet formula or the 24-hour D formula. Ages 12+.';

const EMPTY_HUNT =
  'UPC left empty: Walgreens search returned 405. Walmart returned a robot wall. CVS returned 403. Kroger did not open. Costco search HTML had no Allegra product. Amazon search did not print a Product UPC field. Target size tabs on the opened pages did not include this count. allegra.com shows one sku per product page, not one sku per count, so that sku was not assigned here. NDC is not a UPC (draft, not verified).';

const T_TAB = 'Target PDP A-94466528 primary_barcode field, size tab';
const T12 = 'Target PDP A-1005857946 primary_barcode field';
const T24 = 'Target PDP A-15116793 primary_barcode field';
const TGEL = 'Target gelcap PDP primary_barcode field';
const THIVES = 'Target PDP A-86271748 primary_barcode field';
const TODT = 'Target PDP A-50034070 primary_barcode field';
const TLIQ = 'Target PDP A-15068148 primary_barcode field';

export const BATCH137_KYR6B_ALLEGRA_FIRST_SLICE: RatingRecord[] = [
  expand({
    id: 'allegra-b137-tab-5',
    productName: 'Allegra Allergy 24 Hour Tablets (5ct)',
    formulaId: FILM,
    barcode: '041167412008',
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `${T_TAB} package quantity 5. Inactive ingredients match DailyMed setid ${TAB_SET}. That SPL package NDC 41167-4120-0 is one 5-tablet blister in one carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-tab-45',
    productName: 'Allegra Allergy 24 Hour Tablets (45ct)',
    formulaId: FILM,
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `DailyMed setid ${TAB_SET} package NDC 41167-4120-4 is one 45-tablet bottle in one carton. Same inactive paragraph as the 5ct. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-tab-40',
    productName: 'Allegra Allergy 24 Hour Tablets (40ct)',
    formulaId: FILM,
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `DailyMed setid ${TAB_SET} package NDC 41167-4121-4 is one 40-tablet bottle in one carton. Same inactive paragraph as the 5ct. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-tab-60',
    productName: 'Allegra Allergy 24 Hour Tablets (60ct)',
    formulaId: FILM,
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `DailyMed setid ${TAB_SET} package NDC 41167-4121-1 is one 60-tablet bottle in one carton. Same inactive paragraph as the 5ct. This is not the gelcap 60ct. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-tab-90',
    productName: 'Allegra Allergy 24 Hour Tablets (90ct)',
    formulaId: FILM,
    barcode: '041167412404',
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `${T_TAB} package quantity 90. DailyMed setid ${TAB_SET} package NDC 41167-4124-0 is one 90-tablet bottle in one carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-tab-100',
    productName: 'Allegra Allergy 24 Hour Tablets (100ct)',
    formulaId: FILM,
    barcode: '041167412480',
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `${T_TAB} package quantity 100. DailyMed setid ${TAB_SET} package NDC 41167-4124-8 is one 100-tablet bottle in one carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-tab12-12',
    productName: 'Allegra Allergy 12 Hour Tablets (12ct)',
    formulaId: FILM,
    barcode: '041167413128',
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO60,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `${T12}, title 12-ct. Other information prints NDC 41167-4131-2. Inactive ingredients match setid ${TAB_SET}, including iron oxide blends. That package is one 12-tablet blister in one carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-tab12-24',
    productName: 'Allegra Allergy 12 Hour Tablets (24ct)',
    formulaId: FILM,
    barcode: '041167413142',
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO60,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `${T24}, package quantity 24. Inactive ingredients match setid ${TAB_SET}. DailyMed package NDC 41167-4131-4 is two 12-tablet blisters in one carton, and the panel prints 24 TABLETS. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-tab12-36',
    productName: 'Allegra Allergy 12 Hour Tablets (36ct)',
    formulaId: FILM,
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO60,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `DailyMed setid ${TAB_SET} package NDC 41167-4131-6 is three 12-tablet blisters in one carton (36 tablets). Same inactive paragraph as the 12ct. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-hives-tab-5',
    productName: 'Allegra Hives 24 Hour Tablets (5ct)',
    formulaId: FILM,
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `DailyMed setid ${HIVES_TAB_SET} package NDC 41167-4126-8 is one 5-tablet blister in one carton. The inactive paragraph matches setid ${TAB_SET}, so this row shares the film-tablet formula. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-hives-tab-15',
    productName: 'Allegra Hives 24 Hour Tablets (15ct)',
    formulaId: FILM,
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `DailyMed setid ${HIVES_TAB_SET} package NDC 41167-4126-3 is one 15-tablet bottle in one carton. Same inactive paragraph as the 5ct hives carton. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-hives-tab-30',
    productName: 'Allegra Hives 24 Hour Tablets (30ct)',
    formulaId: FILM,
    barcode: '041167412640',
    audience: 'adult',
    minAge: 12,
    form: 'film-coated tablet',
    actives: FEXO180,
    flags: filmFlags(),
    verdict: 'avoid',
    note: FILM_NOTE,
    source: `${THIVES}, package quantity 30. Inactive ingredients match setid ${HIVES_TAB_SET} and setid ${TAB_SET}. Package NDC 41167-4126-4 is one 30-tablet bottle in one carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-gel-8',
    productName: 'Allegra Allergy 24 Hour Gelcaps (8ct)',
    formulaId: GEL,
    barcode: '041167412206',
    audience: 'adult',
    minAge: 12,
    form: 'gelcap',
    actives: FEXO180,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source: `DailyMed setid ${GEL_SET} principal display panel "8 GELCAPS" and package NDC 41167-4122-0 (one 8-gelcap blister in one carton). Inactive ingredients: croscarmellose sodium, D&C red 28, D&C red 33, FD&C blue 1, gelatin, hydroxypropylcellulose, hydroxypropyl methylcellulose, magnesium stearate, microcrystalline cellulose, PEG-135, pharmaceutical ink, pregelatinized starch, titanium dioxide. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-gel-24',
    productName: 'Allegra Allergy 24 Hour Gelcaps (24ct)',
    formulaId: GEL,
    barcode: '041167412213',
    audience: 'adult',
    minAge: 12,
    form: 'gelcap',
    actives: FEXO180,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source: `${TGEL}, package quantity 24, product form Gelcap. Inactive ingredients match setid ${GEL_SET}, including PEG-135 and pharmaceutical ink. Package NDC 41167-4122-5 is one 24-gelcap bottle in one carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-gel-60',
    productName: 'Allegra Allergy 24 Hour Gelcaps (60ct)',
    formulaId: GEL,
    barcode: '041167412220',
    audience: 'adult',
    minAge: 12,
    form: 'gelcap',
    actives: FEXO180,
    flags: gelFlags(),
    verdict: 'avoid',
    note: GEL_NOTE,
    source: `${TGEL}, package quantity 60, product form Gelcap. Inactive ingredients match setid ${GEL_SET}. Package NDC 41167-4122-2 is one 60-gelcap bottle in one carton. This is not the film-tablet 60ct. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-odt-24',
    productName: "Children's Allegra Allergy Orally Disintegrating Tablets, Orange Cream (24ct)",
    formulaId: ODT,
    barcode: '041167423264',
    audience: 'kids',
    minAge: 6,
    form: 'orally disintegrating tablet',
    actives: FEXO30,
    flags: odtFlags(),
    verdict: 'avoid',
    kids: true,
    note: ODT_NOTE,
    source: `${TODT}, package quantity 24, title orange cream 24ct. Inactive ingredients: aspartame, crospovidone, flavors, lactose monohydrate, magnesium stearate, methacrylic acid copolymer, microcrystalline cellulose, povidone, silicon dioxide. That list matches DailyMed setid ${ODT_SET}. Package NDC 41167-4232-6 is four 6-tablet blisters in one carton, and the panel prints 24 orally disintegrating tablets. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-liq-8oz',
    productName: "Children's Allegra Allergy Oral Suspension, Berry (8 fl oz)",
    formulaId: LIQ,
    barcode: '041167424414',
    audience: 'kids',
    minAge: 2,
    form: 'liquid',
    actives: FEXO_LIQ,
    flags: liquidFlags(),
    verdict: 'avoid',
    kids: true,
    note: LIQ_NOTE,
    source: `${TLIQ}, title berry 8 fl oz. Package quantity field is 1. Inactive ingredients match DailyMed setid ${LIQ_SET}. Package NDC 41167-4244-1 is one 240 mL bottle in one carton. UPC is the Target primary_barcode field (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-hives-liq-240',
    productName: "Children's Allegra Hives Oral Suspension, Grape (240 mL)",
    formulaId: LIQ,
    barcode: '041167422717',
    audience: 'kids',
    minAge: 6,
    form: 'liquid',
    actives: FEXO_LIQ,
    flags: liquidFlags(),
    verdict: 'avoid',
    kids: true,
    note: HIVES_LIQ_NOTE,
    source: `DailyMed setid ${HIVES_LIQ_SET} principal display panel "Grape" and "240 mL" (NDC 41167-4227-1, one 240 mL bottle in one carton). The inactive paragraph matches setid ${LIQ_SET}. UPC 041167422717 is the schema.org sku field 0-41167-42271-7 on allegra.com/en-us/products/hives-relief/childrens-hives, the only pack on that page. Check digit passes. The image filename is not the UPC (draft, not verified).`,
  }),
  expand({
    id: 'allegra-b137-d12-10',
    productName: 'Allegra-D 12 Hour (10ct)',
    formulaId: D12,
    barcode: '041167431023',
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D12_ACTIVES,
    flags: d12Flags(),
    verdict: 'caution',
    pharmacy: true,
    note: D12_NOTE,
    source: `DailyMed setid ${D12_SET} package NDC 41167-4310-2 is one 10-tablet blister in one carton. Inactive ingredients: carnauba wax, colloidal silicon dioxide, croscarmellose sodium, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, pregelatinized starch, stearic acid. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-d12-20',
    productName: 'Allegra-D 12 Hour (20ct)',
    formulaId: D12,
    barcode: '041167431047',
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D12_ACTIVES,
    flags: d12Flags(),
    verdict: 'caution',
    pharmacy: true,
    note: D12_NOTE,
    source: `DailyMed setid ${D12_SET} package NDC 41167-4310-4 is two 10-tablet blisters in one carton (20 tablets). Same inactive paragraph as the 10ct. ${EMPTY_HUNT}`,
  }),
  expand({
    id: 'allegra-b137-d12-30',
    productName: 'Allegra-D 12 Hour (30ct)',
    formulaId: D12,
    barcode: '041167431061',
    audience: 'adult',
    minAge: 12,
    form: 'ER tablet',
    actives: D12_ACTIVES,
    flags: d12Flags(),
    verdict: 'caution',
    pharmacy: true,
    note: D12_NOTE,
    source: `DailyMed setid ${D12_SET} principal display panel "30 Tablets" and package NDC 41167-4310-6 (three 10-tablet blisters in one carton). Same inactive paragraph as the 10ct. ${EMPTY_HUNT}`,
  }),
];

const ROWS = BATCH137_KYR6B_ALLEGRA_FIRST_SLICE;
if (ROWS.length !== 21) throw new Error('batch137 row count');
const ids = new Set(ROWS.map((r) => r.id));
if (ids.size !== ROWS.length) throw new Error('batch137 duplicate id');
const bars = ROWS.map((r) => r.barcode).filter((b): b is string => Boolean(b));
if (new Set(bars).size !== bars.length) throw new Error('batch137 duplicate barcode');
if (bars.some((b) => !/^\d{12}$/.test(b))) throw new Error('batch137 barcode width');
const MAIN_BARS = new Set([
  '041167412510',
  '041167412381',
  '041167412060',
  '041167412749',
  '041167432075',
  '041167423332',
  '041167424445',
]);
if (bars.some((b) => MAIN_BARS.has(b))) throw new Error('batch137 reused a MAIN barcode');
if (ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients.some((i) => i.riskLevel !== 'cleared'))) {
  throw new Error('batch137 Clean has a flag');
}
if (ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) {
  throw new Error('batch137 Avoid without High');
}
if (ROWS.some((r) => r.verdict === 'caution' && r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) {
  throw new Error('batch137 Caution has High');
}
if (ROWS.some((r) => r.productName.startsWith('Allegra-D') && r.formulaId === FILM)) {
  throw new Error('batch137 Allegra-D shared the plain tablet formula');
}
if (ROWS.some((r) => r.formulaId === 'allegra-allergy-24hr-tio2' || r.formulaId === 'allegra-d-24hr-tio2-talc')) {
  throw new Error('batch137 reused a stale Allegra formulaId');
}
if (ROWS.some((r) => r.formulaId === 'childrens-allegra-odt' || r.formulaId === 'childrens-allegra-liquid')) {
  throw new Error('batch137 reused a stale kids Allegra formulaId');
}
if (ROWS.filter((r) => r.formulaId === D12).length !== 3) throw new Error('batch137 D-12 count');
if (ROWS.some((r) => !r.form || !/\(|fl oz|mL/.test(r.productName))) {
  throw new Error('batch137 row missing count or form');
}
