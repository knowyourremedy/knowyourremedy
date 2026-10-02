// DRAFT / not verified / batch 142 KYR6-b Zyrtec missing-UPC write.
// A row is written only when that exact pack has a 12-digit UPC from
// carton bars or an opened retailer spec. 11-digit Walgreens spec text
// is stored only after the check digit is restored and checked.
// Exact twins reuse the formula already on MAIN. batch70–141 were not edited.
// The 10 mg 40-count and the dye-free 2.5 mg 24-count were not reopened.
//
// TALLY: 2 written — Clean 0 / Caution 0 / Avoid 2.
// NEW 0 / REUSE 2 / missing UPC 9.

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
  sucralose: 'Methodology §5 Moderate (sucralose).',
  pg: 'Methodology §5 Moderate (propylene glycol, oral).',
  flavor: 'Methodology §5 Limited (flavor / flavors).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  sorbitol: 'Methodology §5 Limited (sorbitol).',
  benzoate: 'Methodology §5 Limited (sodium benzoate).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const TABLET_SET = 'b165db38-b302-4220-8627-77cb07bb078c';
const SYRUP_SET = '9d8e78ea-af98-4f7c-8db5-044b49582f80';
const TABLET_FORMULA = 'zyrtec-allergy-tablets-tio2';
const SYRUP_FORMULA = 'childrens-zyrtec-liquid';

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

const WG3 =
  'Walgreens Product Specifications https://www.walgreens.com/store/c/zyrtec-allergy-24-hour-10mg-tablets,-travel-size/ID=prod6063537-product Size/Count 3.0 Each, UPC 30045020443. Check digit restored to 300450204431.';

export const BATCH142_KYR6B_ZYRTEC_MISSING_UPC: RatingRecord[] = [
  {
    id: 'zyrtec-b142-10mg-3ct',
    productName: 'Zyrtec Allergy Tablets 10mg (3ct)',
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450204431',
    formulaId: TABLET_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', cite(TABLET_SET, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', cite(TABLET_SET, METH.peg)),
      cleared(TABLET_SET, 'Colloidal silicon dioxide'),
      cleared(TABLET_SET, 'Croscarmellose sodium'),
      cleared(TABLET_SET, 'Hypromellose'),
      cleared(TABLET_SET, 'Lactose monohydrate'),
      cleared(TABLET_SET, 'Magnesium stearate'),
      cleared(TABLET_SET, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Polyethylene glycol is Moderate and is not the Avoid driver. Same inactive line as zyrtec-allergy-tablets on MAIN. REUSE formula zyrtec-allergy-tablets-tio2. The 5-count and 14-count specs restore to codes already on that no-count row and were not copied here. Ages 6+.',
    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${WG3} DailyMed setid ${TABLET_SET} package NDC 50580-726-93 is 3 in 1 carton and 1 in 1 pouch, marketing start 07/27/2018, no end date on that row. NDC 50580-726-13 is an earlier 3 in 1 carton that ended 01/31/2021. The opened carton image on that setid is the 30-count (NDC 50580-726-71, bars 312547204361) and was not used. Check digit verified. Draft, not verified.`,
    ],
  },
  {
    id: 'zyrtec-b142-kids-syrup-bubblegum-4oz',
    productName: "Children's Zyrtec Allergy Syrup Bubble Gum (4 fl oz)",
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450205049',
    formulaId: SYRUP_FORMULA,
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '5 mg / 5 mL' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', cite(SYRUP_SET, METH.sucralose)),
      flag('Propylene glycol', 'moderate', cite(SYRUP_SET, METH.pg)),
      flag('Flavors', 'limited', cite(SYRUP_SET, METH.flavor)),
      flag('Sorbitol', 'limited', cite(SYRUP_SET, METH.sorbitol)),
      flag('Sodium benzoate', 'limited', cite(SYRUP_SET, METH.benzoate)),
      cleared(SYRUP_SET, 'Anhydrous citric acid'),
      cleared(SYRUP_SET, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER-LOCK DRAFT: Avoid. Drivers are sucralose and propylene glycol. Flavors stay Limited. Same inactive line as childrens-zyrtec-liquid on MAIN. REUSE that formula. This is the bubble gum 4 fl oz, not the grape 4 fl oz and not the grape 3-pack. Dye-free is not Clean. Ages 2+.",
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      'Walgreens Product Specifications https://www.walgreens.com/store/c/childrens-zyrtec-allergy-syrup-bubble-gum/ID=prod4414788-product Size/Count 4.0 fl oz, UPC 30045020504. Check digit restored to 300450205049. The page names Allergy Syrup Bubble Gum and says dye-free, sugar-free, and alcohol-free. DailyMed setid 9d8e78ea-af98-4f7c-8db5-044b49582f80 inactive line is the syrup twin (flavors, not a grape dye). The carton image on that setid is grape 4 fl oz NDC 50580-730-05 and its bars 300450209269 were not used. zyrtec.com/products/zyrtec-children-allergy-syrup has a 4 ounces Bubble Gum tab; its eanUpc is empty. Check digit verified. Draft, not verified.',
    ],
  },
];

function upcCheck(upc: string): boolean {
  if (!/^\d{12}$/.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(upc[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(upc[11]);
}

const ROWS = BATCH142_KYR6B_ZYRTEC_MISSING_UPC;
const ALREADY = new Set([
  '312547204361',
  '312547204323',
  '312547204309',
  '300450206602',
  '300450204318',
  '300450204448',
  '300450204462',
  '300450239129',
  '300450239242',
  '300450242136',
  '300450209269',
  '300450209047',
  '300450204653',
  '300450206909',
  '300450206121',
  '300450256157',
  '300450256355',
  '300450204271',
  '300450204240',
  '300450138323',
  '300450139146',
  '300450241245',
  '300450241481',
  '300450241283',
  '300450250247',
  '300450242259',
  '300450242242',
  '300450204257',
  '300450209146',
]);
if (ROWS.length !== 2) throw new Error('batch142 row count');
if (new Set(ROWS.map((r) => r.id)).size !== 2) throw new Error('batch142 duplicate id');
if (ROWS.some((r) => !r.barcode || !upcCheck(r.barcode))) throw new Error('batch142 bad upc');
if (ROWS.some((r) => r.barcode && ALREADY.has(r.barcode))) throw new Error('batch142 upc already on MAIN');
if (ROWS.filter((r) => r.verdict === 'avoid').length !== 2) throw new Error('batch142 verdict tally');
if (ROWS[0]?.formulaId !== TABLET_FORMULA || ROWS[0].barcode !== '300450204431') throw new Error('batch142 3ct');
if (ROWS[1]?.formulaId !== SYRUP_FORMULA || ROWS[1].barcode !== '300450205049') throw new Error('batch142 bubble gum');
if (ROWS[1].inactiveIngredients.some((i) => i.riskLevel === 'high')) throw new Error('batch142 syrup has High');
