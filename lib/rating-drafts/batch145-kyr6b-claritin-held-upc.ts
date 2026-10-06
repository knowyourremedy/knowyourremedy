// DRAFT / not verified / batch 145 KYR6-b Claritin held packs.
// New formulas only. The founder grape rows and the founder adult-liquid
// row were not reused and were not edited. batch70–144 were not edited.
// No UPC override: every code read this pass already sits on another row.
//
// TALLY: 4 written — Clean 0 / Caution 2 / Avoid 2.
// 6 counts removed: no buyable pack on a page that opened.
// NEW 6 / REUSE 0. Ungraded tokens: 0.

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
  pg: 'Methodology §5 Moderate (oral propylene glycol). Not the Avoid driver on this panel.',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver on this panel.',
  mannitol: 'Methodology §5 Limited (mannitol).',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  maltitol: 'Methodology §5 Limited (maltitol).',
  flavor: 'Methodology §5 Caution (bare flavor / flavors). Exact “Natural flavors” stays Limited. This panel prints flavor.',
  flavors: 'Methodology §5 Caution (flavors). Exact “Natural flavors” stays Limited.',
  benzoate: 'Methodology §5 Limited (sodium benzoate).',
  menthol: 'Founder instruction for this panel: menthol printed in the inactive list = Caution. Not copied from the parked topical-active note on claritin-allergy-liquid.',
  phosphoric: 'Methodology §5 Caution (phosphoric acid, Sept 26). Not a phosphate salt.',
  edta: 'Methodology §5 Caution (edetate disodium = EDTA, Sept 26). Not the Cleared trace row.',
  sio2: 'Methodology §5 Caution (silicon dioxide, nanoparticle cap). Not the Avoid driver.',
  phosphate: 'Methodology §5 Cleared (phosphate salts). Sodium phosphate is this family. Not phosphoric acid.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const GRAPE = 'claritin-b145-chew-grape-dye';
const LIQUID = 'claritin-b145-adult-liquid';
const GRAPE_SET = '37732ca2-b454-4215-91a2-c62e0f7a56af';
const LIQ_SET = '19afd658-8c67-af44-e063-6394a90abada';

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

function grapeFlags(): IngredientFlag[] {
  return [
    flag('Aspartame', 'high', cite(GRAPE_SET, METH.aspartame)),
    flag('D&C Red No. 27 aluminum lake', 'high', cite(GRAPE_SET, METH.dyes)),
    flag('FD&C Blue No. 2 aluminum lake', 'high', cite(GRAPE_SET, METH.dyes)),
    flag('Flavor', 'limited', cite(GRAPE_SET, METH.flavor)),
    flag('Mannitol', 'limited', cite(GRAPE_SET, METH.mannitol)),
    flag('Colloidal silicon dioxide', 'limited', cite(GRAPE_SET, METH.sio2)),
    cleared(GRAPE_SET, 'Citric acid anhydrous'),
    cleared(GRAPE_SET, 'Magnesium stearate'),
    cleared(GRAPE_SET, 'Microcrystalline cellulose'),
    cleared(GRAPE_SET, 'Sodium starch glycolate'),
    cleared(GRAPE_SET, 'Stearic acid'),
  ];
}
function liquidFlags(): IngredientFlag[] {
  return [
    flag('Sucralose', 'moderate', cite(LIQ_SET, METH.sucralose)),
    flag('Propylene glycol', 'moderate', cite(LIQ_SET, METH.pg)),
    flag('Phosphoric acid', 'limited', cite(LIQ_SET, METH.phosphoric)),
    flag('Menthol', 'limited', cite(LIQ_SET, METH.menthol)),
    flag('Edetate disodium', 'limited', cite(LIQ_SET, METH.edta)),
    flag('Flavors', 'limited', cite(LIQ_SET, METH.flavors)),
    flag('Maltitol', 'limited', cite(LIQ_SET, METH.maltitol)),
    flag('Sorbitol', 'limited', cite(LIQ_SET, METH.sorbitol)),
    flag('Sodium benzoate', 'limited', cite(LIQ_SET, METH.benzoate)),
    flag('Sodium phosphate', 'cleared', cite(LIQ_SET, METH.phosphate)),
    cleared(LIQ_SET, 'Glycerin'),
    cleared(LIQ_SET, 'Purified water'),
  ];
}

const LORA5 = [{ name: 'Loratadine', strength: '5 mg' }];
const SYRUP_ACTIVE = [{ name: 'Loratadine', strength: '5 mg / 5 mL' }];

const GRAPE_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers are D&C Red No. 27 aluminum lake, FD&C Blue No. 2 aluminum lake, and aspartame. Citric acid anhydrous, magnesium stearate, microcrystalline cellulose, sodium starch glycolate, and stearic acid are Cleared and are not the driver. This is a new formulaId. claritin-chewable and childrens-claritin-chewable were not rewritten. Ages 2+.';
const LIQUID_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Phosphoric acid is Caution. No High-tier inactive is on this panel, so the row is not Avoid. Sucralose and oral propylene glycol stay Moderate and are not the Avoid driver. Menthol is printed in the inactive list and is Caution. Sodium phosphate is the phosphate-salt Cleared family, not phosphoric acid. New formulaId. claritin-allergy-liquid was not rewritten. Ages 2+.';

const GRAPE_SRC =
  'DailyMed setid 37732ca2-b454-4215-91a2-c62e0f7a56af. Inactive ingredients: aspartame, citric acid anhydrous, colloidal silicon dioxide, D&C red No. 27 aluminum lake, FD&C blue No. 2 aluminum lake, flavor, magnesium stearate, mannitol, microcrystalline cellulose, sodium starch glycolate, stearic acid. UPC left empty. The drug-facts image decoded to 041100810748, already on claritin-chewable and childrens-claritin-chewable, and was not copied.';
const LIQUID_SRC =
  'DailyMed setid 19afd658-8c67-af44-e063-6394a90abada. Inactive ingredients: edetate disodium, flavors, glycerin, maltitol, menthol, phosphoric acid, propylene glycol, purified water, sodium benzoate, sodium phosphate, sorbitol, sucralose. claritin.com Liquid 24 Hour prints the same inactive line and no UPC. UPC left empty.';

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
    cleanAlternatives: d.audience === 'kids' ? KIDS_ALTS : ADULT_ALTS,
    sourcesGeneral: [d.source],
  };
}

export const BATCH145_KYR6B_CLARITIN_HELD_UPC: RatingRecord[] = [
    expand({
    id: 'claritin-b145-chew-grape-10',
    productName: "Children's Claritin Chewable Tablets, Grape (10ct)",
    formulaId: GRAPE,
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: grapeFlags(),
    verdict: 'avoid',
    note: GRAPE_NOTE,
    source: `${GRAPE_SRC} Package NDC 11523-4328-1 is 10 chewable tablets in 1 blister in 1 carton. The front image prints 10 CHEWABLE TABLETS.`,
  }),
  expand({
    id: 'claritin-b145-chew-grape-30',
    productName: "Children's Claritin Chewable Tablets, Grape (30ct)",
    formulaId: GRAPE,
    audience: 'kids',
    minAge: 2,
    form: 'chewable tablet',
    actives: LORA5,
    flags: grapeFlags(),
    verdict: 'avoid',
    note: GRAPE_NOTE,
    source: `${GRAPE_SRC} Package NDC 11523-4328-3 is 3 blisters of 10 in 1 carton.`,
  }),
        expand({
    id: 'claritin-b145-adult-liquid-80ml',
    productName: 'Claritin Allergy Liquid (80 mL)',
    formulaId: LIQUID,
    audience: 'adult',
    minAge: 2,
    form: 'liquid',
    actives: SYRUP_ACTIVE,
    flags: liquidFlags(),
    verdict: 'caution',
    note: LIQUID_NOTE,
    source: `${LIQUID_SRC} Package NDC 11523-0101-2 is 80 mL in 1 bottle in 1 carton. Marketing status active. No size-specific carton image.`,
  }),
  expand({
    id: 'claritin-b145-adult-liquid-240ml',
    productName: 'Claritin Allergy Liquid (240 mL)',
    formulaId: LIQUID,
    audience: 'adult',
    minAge: 2,
    form: 'liquid',
    actives: SYRUP_ACTIVE,
    flags: liquidFlags(),
    verdict: 'caution',
    note: LIQUID_NOTE,
    source: `${LIQUID_SRC} Package NDC 11523-0101-3 is 240 mL in 1 bottle in 1 carton. The Cooling Honey carton image prints 8 FL OZ (240 mL) and the bars read 041100595416, already on claritin-allergy-liquid. That code was not copied here.`,
  }),
];

const ROWS = BATCH145_KYR6B_CLARITIN_HELD_UPC;
if (ROWS.length !== 4) throw new Error(`batch145 row count ${ROWS.length}`);
if (new Set(ROWS.map((r) => r.id)).size !== 4) throw new Error('batch145 duplicate id');
if (ROWS.some((r) => r.barcode)) throw new Error('batch145 unexpected upc');
if (ROWS.some((r) => r.formulaId === 'claritin-chewable-aspartame-dye' || r.formulaId === 'claritin-allergy-liquid')) {
  throw new Error('batch145 reused founder formula');
}
const avoid = ROWS.filter((r) => r.verdict === 'avoid');
const caution = ROWS.filter((r) => r.verdict === 'caution');
if (avoid.length !== 2 || caution.length !== 2) throw new Error('batch145 verdicts');
if (avoid.some((r) => r.formulaId !== GRAPE)) throw new Error('batch145 grape');
if (caution.some((r) => r.formulaId !== LIQUID)) throw new Error('batch145 liquid');
if (caution.some((r) => r.inactiveIngredients.some((i) => i.name === 'Phosphoric acid' && i.riskLevel === 'high'))) {
  throw new Error('batch145 phosphoric high');
}
if (caution.some((r) => !r.inactiveIngredients.some((i) => i.name === 'Sodium phosphate' && i.riskLevel === 'cleared'))) {
  throw new Error('batch145 phosphate');
}
