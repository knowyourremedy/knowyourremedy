// DRAFT / not verified / batch 184 KYR6-c.
// US OTC Advil, Motrin, Tylenol, and Excedrin counts whose panel was read
// and whose same count was for sale on a page that opened. Aleve is not in
// this file. A regular store page did not tie one Aleve inactive line to one
// count. UPCs stay empty. Opened pages did not print a 12-digit code for
// these counts. Kits, bonus boxes, and 2-packs are not rows.
// motrin-b184-infant-df-1 and tylenol-b184-infant-df-1 are removed.
// Same formula as motrin-infants-liquid-dyefree and
// tylenol-infants-liquid-dyefree. The new rows only added a count.
// Not stashed. The other 26 rows stay.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  appendLimitedStackHonestNote,
  computeVerdictFromInactiveIngredients,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const PAIN = 'Pain & Fever';

const METH = {
  ace: 'Methodology §5 Moderate-risk (acesulfame potassium).',
  acetic: 'Methodology §5 Cleared (acetic acid).',
  alginic: 'Methodology §5 Cleared (alginic acid).',
  aspartame: 'Methodology §5 High-risk (aspartame).',
  benzoate: 'Methodology §5 Limited (sodium benzoate / potassium sorbate / benzoic acid).',
  calciumCarb: 'Methodology §5 Cleared (calcium carbonate as an other-ingredient filler).',
  caramel: 'Methodology §5 High-risk (caramel color, undisclosed class). The label says caramel and does not name a class.',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  celluloseAcetate: 'Methodology §5 Caution (cellulose acetate). Not cellulose, MCC, or hypromellose.',
  citric: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dye: 'Methodology §5 High-risk (synthetic dyes).',
  ethylAcetate: 'Methodology §5 Caution (ethyl acetate). Flavor solvent.',
  flavor: 'Methodology §5 Limited (flavors). Unnamed flavor.',
  flavorMix: 'Methodology §5 Limited (natural and artificial flavors).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycyrrhizin: 'Methodology §5 Caution (ammonium glycyrrhizin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  glyceryl: 'Methodology §5 Cleared (glyceryl dibehenate).',
  hfcs: 'Methodology §5 Caution (high fructose corn syrup). Not the Limited fructose row.',
  hpmc: 'Methodology §5 Cleared (hypromellose).',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  koh: 'Methodology §5 Caution (potassium hydroxide).',
  lecithin: 'Methodology §5 Cleared (lecithin). Soy is an allergen disclosure, not a toxicity flag.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mct: 'Methodology §5 Limited (unlabeled medium-chain triglycerides). No plant is named.',
  modifiedStarch: 'Methodology §5 Limited (modified starch).',
  peg: 'Methodology §5 Moderate-risk (polyethylene glycol).',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  polysorbate: 'Methodology §5 Moderate-risk (polysorbate 80).',
  povidone: 'Methodology §5 Cleared (povidone / crospovidone).',
  silica: 'Methodology §5 Limited (silicon dioxide / colloidal silicon dioxide, oral).',
  sls: 'Methodology §5 Limited (sodium lauryl sulfate).',
  sorbitan: 'Methodology §5 Caution (sorbitol sorbitan solution). Not the sugar alcohol sorbitol.',
  sorbitol: 'Methodology §5 Limited (sorbitol / sorbitol solution).',
  soybeanChew: 'Methodology §5 High-risk (soybean oil in a chew). Same form rule as a gummy or a lozenge.',
  starch: 'Methodology §5 Cleared (pregelatinized starch).',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  stearate: 'Methodology §5 Cleared (magnesium stearate).',
  succinic: 'Methodology §5 Cleared (succinic acid).',
  sucralose: 'Methodology §5 Moderate-risk (sucralose).',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u; was Limited.',
  tio2: 'Methodology §5 High-risk (titanium dioxide).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const LIQUIGEL = 'Advil Liqui-Gels drug facts';
const MINI = 'Advil Liqui-Gels Minis drug facts';
const DUAL = 'Advil Dual Action drug facts';
const PM_LIQ = 'Advil PM Liqui-Gels drug facts';
const MOTRIN_DF = "Children's Motrin dye-free suspension drug facts";
const MOTRIN_BUBBLE = "Children's Motrin bubble gum suspension drug facts";
const MOTRIN_CHEW = "Children's Motrin dye-free grape chew drug facts";
const TYLENOL_DF = 'Tylenol dye-free suspension drug facts';
const TYLENOL_BUBBLE = "Children's Tylenol bubble gum suspension drug facts";
const TYLENOL_CHEW = "Children's Tylenol dye-free wild berry chew drug facts";
const RAPID = 'Excedrin Rapid Relief drug facts';

const LIQUIGEL_FLAGS: IngredientFlag[] = [
  flag(LIQUIGEL, 'FD&C green no. 3', 'high', METH.dye),
  flag(LIQUIGEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(LIQUIGEL, 'Lecithin (soybean)', 'cleared', METH.lecithin),
  flag(LIQUIGEL, 'Medium-chain triglycerides', 'limited', METH.mct),
  flag(LIQUIGEL, 'Pharmaceutical ink', 'limited', METH.ink),
  flag(LIQUIGEL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(LIQUIGEL, 'Potassium hydroxide', 'limited', METH.koh),
  flag(LIQUIGEL, 'Purified water', 'cleared', METH.water),
  flag(LIQUIGEL, 'Sorbitol sorbitan solution', 'limited', METH.sorbitan),
];

const MINI_FLAGS: IngredientFlag[] = [
  flag(MINI, 'FD&C green no. 3', 'high', METH.dye),
  flag(MINI, 'Gelatin', 'cleared', METH.gelatin),
  flag(MINI, 'Medium-chain triglycerides', 'limited', METH.mct),
  flag(MINI, 'Pharmaceutical ink', 'limited', METH.ink),
  flag(MINI, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(MINI, 'Potassium hydroxide', 'limited', METH.koh),
  flag(MINI, 'Purified water', 'cleared', METH.water),
  flag(MINI, 'Sorbitol sorbitan solution', 'limited', METH.sorbitan),
];

const DUAL_FLAGS: IngredientFlag[] = [
  flag(DUAL, 'Carnauba wax', 'cleared', METH.carnauba),
  flag(DUAL, 'Colloidal silicon dioxide', 'limited', METH.silica),
  flag(DUAL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(DUAL, 'Ferric oxides', 'limited', 'Methodology §5 Caution (iron oxides as color).'),
  flag(DUAL, 'Glyceryl dibehenate', 'cleared', METH.glyceryl),
  flag(DUAL, 'Hypromellose', 'cleared', METH.hpmc),
  flag(DUAL, 'Pharmaceutical ink', 'limited', METH.ink),
  flag(DUAL, 'Polydextrose', 'limited', METH.polydextrose),
  flag(DUAL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(DUAL, 'Pregelatinized starch', 'cleared', METH.starch),
  flag(DUAL, 'Titanium dioxide', 'high', METH.tio2),
];

const PM_FLAGS: IngredientFlag[] = [
  flag(PM_LIQ, 'D&C red no. 33', 'high', METH.dye),
  flag(PM_LIQ, 'FD&C blue no. 1', 'high', METH.dye),
  flag(PM_LIQ, 'Gelatin', 'cleared', METH.gelatin),
  flag(PM_LIQ, 'Medium-chain triglycerides', 'limited', METH.mct),
  flag(PM_LIQ, 'Pharmaceutical ink', 'limited', METH.ink),
  flag(PM_LIQ, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(PM_LIQ, 'Potassium hydroxide', 'limited', METH.koh),
  flag(PM_LIQ, 'Purified water', 'cleared', METH.water),
  flag(PM_LIQ, 'Sorbitol sorbitan solution', 'limited', METH.sorbitan),
];

const MOTRIN_DF_FLAGS: IngredientFlag[] = [
  flag(MOTRIN_DF, 'Acesulfame potassium', 'moderate', METH.ace),
  flag(MOTRIN_DF, 'Anhydrous citric acid', 'cleared', METH.citric),
  flag(MOTRIN_DF, 'Flavors', 'limited', METH.flavor),
  flag(MOTRIN_DF, 'Glycerin', 'cleared', METH.glycerin),
  flag(MOTRIN_DF, 'Polysorbate 80', 'moderate', METH.polysorbate),
  flag(MOTRIN_DF, 'Pregelatinized starch', 'cleared', METH.starch),
  flag(MOTRIN_DF, 'Purified water', 'cleared', METH.water),
  flag(MOTRIN_DF, 'Sodium benzoate', 'limited', METH.benzoate),
  flag(MOTRIN_DF, 'Sucrose', 'cleared', METH.sucrose),
  flag(MOTRIN_DF, 'Xanthan gum', 'cleared', METH.xanthan),
];

const MOTRIN_BUBBLE_FLAGS: IngredientFlag[] = [
  flag(MOTRIN_BUBBLE, 'Acesulfame potassium', 'moderate', METH.ace),
  flag(MOTRIN_BUBBLE, 'Anhydrous citric acid', 'cleared', METH.citric),
  flag(MOTRIN_BUBBLE, 'FD&C red no. 40', 'high', METH.dye),
  flag(MOTRIN_BUBBLE, 'Flavors', 'limited', METH.flavor),
  flag(MOTRIN_BUBBLE, 'Glycerin', 'cleared', METH.glycerin),
  flag(MOTRIN_BUBBLE, 'Polysorbate 80', 'moderate', METH.polysorbate),
  flag(MOTRIN_BUBBLE, 'Pregelatinized starch', 'cleared', METH.starch),
  flag(MOTRIN_BUBBLE, 'Purified water', 'cleared', METH.water),
  flag(MOTRIN_BUBBLE, 'Sodium benzoate', 'limited', METH.benzoate),
  flag(MOTRIN_BUBBLE, 'Sucrose', 'cleared', METH.sucrose),
  flag(MOTRIN_BUBBLE, 'Xanthan gum', 'cleared', METH.xanthan),
];

const MOTRIN_CHEW_FLAGS: IngredientFlag[] = [
  flag(MOTRIN_CHEW, 'Acesulfame potassium', 'moderate', METH.ace),
  flag(MOTRIN_CHEW, 'Ammonium glycyrrhizin', 'limited', METH.glycyrrhizin),
  flag(MOTRIN_CHEW, 'Aspartame', 'high', METH.aspartame),
  flag(MOTRIN_CHEW, 'Carnauba wax', 'cleared', METH.carnauba),
  flag(MOTRIN_CHEW, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(MOTRIN_CHEW, 'Hypromellose', 'cleared', METH.hpmc),
  flag(MOTRIN_CHEW, 'Magnesium stearate', 'cleared', METH.stearate),
  flag(MOTRIN_CHEW, 'Mannitol', 'limited', METH.mannitol),
  flag(MOTRIN_CHEW, 'Natural and artificial flavors', 'limited', METH.flavorMix),
  flag(MOTRIN_CHEW, 'Silicon dioxide', 'limited', METH.silica),
  flag(MOTRIN_CHEW, 'Sodium lauryl sulfate', 'limited', METH.sls),
  flag(MOTRIN_CHEW, 'Soybean oil', 'high', METH.soybeanChew),
  flag(MOTRIN_CHEW, 'Succinic acid', 'cleared', METH.succinic),
];

const TYLENOL_DF_FLAGS: IngredientFlag[] = [
  flag(TYLENOL_DF, 'Anhydrous citric acid', 'cleared', METH.citric),
  flag(TYLENOL_DF, 'Flavors', 'limited', METH.flavor),
  flag(TYLENOL_DF, 'Glycerin', 'cleared', METH.glycerin),
  flag(TYLENOL_DF, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(TYLENOL_DF, 'Carboxymethylcellulose sodium', 'cleared', METH.cmc),
  flag(TYLENOL_DF, 'Potassium sorbate', 'limited', METH.benzoate),
  flag(TYLENOL_DF, 'Purified water', 'cleared', METH.water),
  flag(TYLENOL_DF, 'Sorbitol solution', 'limited', METH.sorbitol),
  flag(TYLENOL_DF, 'Sucralose', 'moderate', METH.sucralose),
  flag(TYLENOL_DF, 'Sucrose', 'cleared', METH.sucrose),
  flag(TYLENOL_DF, 'Xanthan gum', 'cleared', METH.xanthan),
];

const TYLENOL_BUBBLE_FLAGS: IngredientFlag[] = [
  flag(TYLENOL_BUBBLE, 'Anhydrous citric acid', 'cleared', METH.citric),
  flag(TYLENOL_BUBBLE, 'D&C red no. 33', 'high', METH.dye),
  flag(TYLENOL_BUBBLE, 'FD&C red no. 40', 'high', METH.dye),
  flag(TYLENOL_BUBBLE, 'Flavors', 'limited', METH.flavor),
  flag(TYLENOL_BUBBLE, 'Glycerin', 'cleared', METH.glycerin),
  flag(TYLENOL_BUBBLE, 'High fructose corn syrup', 'limited', METH.hfcs),
  flag(TYLENOL_BUBBLE, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(TYLENOL_BUBBLE, 'Carboxymethylcellulose sodium', 'cleared', METH.cmc),
  flag(TYLENOL_BUBBLE, 'Purified water', 'cleared', METH.water),
  flag(TYLENOL_BUBBLE, 'Sodium benzoate', 'limited', METH.benzoate),
  flag(TYLENOL_BUBBLE, 'Sorbitol solution', 'limited', METH.sorbitol),
  flag(TYLENOL_BUBBLE, 'Sucralose', 'moderate', METH.sucralose),
  flag(TYLENOL_BUBBLE, 'Xanthan gum', 'cleared', METH.xanthan),
];

const TYLENOL_CHEW_FLAGS: IngredientFlag[] = [
  flag(TYLENOL_CHEW, 'Acesulfame potassium', 'moderate', METH.ace),
  flag(TYLENOL_CHEW, 'Acetic acid', 'cleared', METH.acetic),
  flag(TYLENOL_CHEW, 'Cellulose acetate', 'limited', METH.celluloseAcetate),
  flag(TYLENOL_CHEW, 'Ethyl acetate', 'limited', METH.ethylAcetate),
  flag(TYLENOL_CHEW, 'Flavor', 'limited', METH.flavor),
  flag(TYLENOL_CHEW, 'Magnesium stearate', 'cleared', METH.stearate),
  flag(TYLENOL_CHEW, 'Maltodextrin', 'limited', METH.maltodextrin),
  flag(TYLENOL_CHEW, 'Mannitol', 'limited', METH.mannitol),
  flag(TYLENOL_CHEW, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(TYLENOL_CHEW, 'Modified starch', 'limited', METH.modifiedStarch),
  flag(TYLENOL_CHEW, 'Povidone', 'cleared', METH.povidone),
  flag(TYLENOL_CHEW, 'Sodium starch glycolate', 'cleared', METH.ssg),
  flag(TYLENOL_CHEW, 'Sucralose', 'moderate', METH.sucralose),
];

const RAPID_FLAGS: IngredientFlag[] = [
  flag(RAPID, 'Alginic acid', 'cleared', METH.alginic),
  flag(RAPID, 'Calcium carbonate', 'cleared', METH.calciumCarb),
  flag(RAPID, 'Carnauba wax', 'cleared', METH.carnauba),
  flag(RAPID, 'Colloidal silicon dioxide', 'limited', METH.silica),
  flag(RAPID, 'Crospovidone', 'cleared', METH.povidone),
  flag(RAPID, 'Hypromellose', 'cleared', METH.hpmc),
  flag(RAPID, 'Magnesium stearate', 'cleared', METH.stearate),
  flag(RAPID, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(RAPID, 'Polysorbate 80', 'moderate', METH.polysorbate),
  flag(RAPID, 'Povidone', 'cleared', METH.povidone),
  flag(RAPID, 'Pregelatinized starch', 'cleared', METH.starch),
  flag(RAPID, 'Purified water', 'cleared', METH.water),
  flag(RAPID, 'Titanium dioxide', 'high', METH.tio2),
];

const IBU_200: ActiveIngredient[] = [{ name: 'Ibuprofen', strength: '200 mg' }];
const DUAL_ACTIVES: ActiveIngredient[] = [
  { name: 'Ibuprofen', strength: '125 mg' },
  { name: 'Acetaminophen', strength: '250 mg' },
];
const PM_ACTIVES: ActiveIngredient[] = [
  { name: 'Diphenhydramine hydrochloride', strength: '25 mg' },
  { name: 'Ibuprofen', strength: '200 mg' },
];
const MOTRIN_CHILD: ActiveIngredient[] = [{ name: 'Ibuprofen', strength: '100 mg / 5 mL' }];
const MOTRIN_CHEW_ACTIVE: ActiveIngredient[] = [{ name: 'Ibuprofen', strength: '100 mg' }];

const MOTRIN_GEL = 'Motrin IB liquid gels drug facts';
const MOTRIN_DUAL = 'Motrin Dual Action with Tylenol drug facts';

const MOTRIN_GEL_FLAGS: IngredientFlag[] = [
  flag(MOTRIN_GEL, 'Gelatin', 'cleared', METH.gelatin),
  flag(MOTRIN_GEL, 'Pharmaceutical ink', 'limited', METH.ink),
  flag(MOTRIN_GEL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(MOTRIN_GEL, 'Potassium hydroxide', 'limited', METH.koh),
  flag(MOTRIN_GEL, 'Purified water', 'cleared', METH.water),
  flag(MOTRIN_GEL, 'Sorbitan', 'limited', 'Methodology §5 Caution (sorbitan). Not the sugar alcohol sorbitol.'),
  flag(MOTRIN_GEL, 'Sorbitol', 'limited', METH.sorbitol),
];

const MOTRIN_DUAL_FLAGS: IngredientFlag[] = [
  flag(MOTRIN_DUAL, 'Colloidal silicon dioxide', 'limited', METH.silica),
  flag(MOTRIN_DUAL, 'Corn starch', 'cleared', 'Methodology §5 Cleared (corn starch).'),
  flag(MOTRIN_DUAL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
  flag(MOTRIN_DUAL, 'Crospovidone', 'cleared', METH.povidone),
  flag(MOTRIN_DUAL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
  flag(MOTRIN_DUAL, 'Polyethylene glycol', 'moderate', METH.peg),
  flag(MOTRIN_DUAL, 'Polyvinyl alcohol', 'cleared', 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).'),
  flag(MOTRIN_DUAL, 'Povidone', 'cleared', METH.povidone),
  flag(MOTRIN_DUAL, 'Pregelatinized starch', 'cleared', METH.starch),
  flag(MOTRIN_DUAL, 'Stearic acid', 'cleared', 'Methodology §5 Cleared (stearic acid).'),
  flag(MOTRIN_DUAL, 'Sucralose', 'moderate', METH.sucralose),
  flag(MOTRIN_DUAL, 'Talc', 'high', 'Methodology §5 High-risk (talc, oral).'),
  flag(MOTRIN_DUAL, 'Titanium dioxide', 'high', METH.tio2),
];
const APAP_160: ActiveIngredient[] = [{ name: 'Acetaminophen', strength: '160 mg / 5 mL' }];
const APAP_CHEW: ActiveIngredient[] = [{ name: 'Acetaminophen', strength: '160 mg' }];
const APAP_500: ActiveIngredient[] = [{ name: 'Acetaminophen', strength: '500 mg' }];

const AMAZON = ['Amazon'];

function row(input: {
  id: string;
  productName: string;
  brand: string;
  formulaId: string;
  audience: 'adult' | 'kids';
  minAge: number;
  form: string;
  actives: ActiveIngredient[];
  flags: IngredientFlag[];
  source: string;
  honestNote?: string;
}): RatingRecord {
  const rollup = computeVerdictFromInactiveIngredients(
    input.flags.map((item) => ({ name: item.name, riskLevel: item.riskLevel })),
  );
  let honestNote = input.honestNote;
  if (rollup.cause === 'limited_stack' && rollup.limitedStackTokens?.length) {
    honestNote = appendLimitedStackHonestNote(honestNote, rollup.limitedStackTokens);
  }
  return {
    id: input.id,
    productName: input.productName,
    brand: input.brand,
    category: PAIN,
    formulaId: input.formulaId,
    audience: input.audience,
    minAge: input.minAge,
    form: input.form,
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: input.actives,
    inactiveIngredients: input.flags,
    verdict: rollup.verdict,
    ...(honestNote ? { honestNote } : {}),
    retailers: AMAZON,
    sourcesGeneral: [input.source],
  };
}

const LIQUIGEL_SOURCE =
  'DailyMed setid 1f01c10a-9434-91a4-2ee4-352315a6b610 is Advil Liqui-Gels. Active ibuprofen 200 mg. Inactive ingredients: FD&C green no. 3, gelatin, lecithin (soybean), medium-chain triglycerides, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitol sorbitan solution. Adults and children 12 years and over. Amazon search opened Advil Liqui-Gels at a price for this count. The minis line on the same label omits lecithin and is a different formula. No 12-digit UPC was printed for this count.';

const MINI_SOURCE =
  'DailyMed setid 1f01c10a-9434-91a4-2ee4-352315a6b610 subsection Advil Liqui-Gels Minis. Active ibuprofen 200 mg. Inactive ingredients: FD&C green no. 3, gelatin, medium-chain triglycerides, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitol sorbitan solution. Lecithin is not on this line. Adults and children 12 years and over. Amazon search opened Advil Liqui-Gels minis or Advil Mini Liqui-Gels at a price for this count. No 12-digit UPC was printed for this count.';

const DUAL_SOURCE =
  'DailyMed setid f5ea858e-76d9-4777-b3dc-5d614f66d485 is Advil Dual Action. Active ibuprofen 125 mg and acetaminophen 250 mg. Inactive ingredients match Advil Dual Action Back Pain setid acaa9806-e552-44f2-a680-b8bb64c49e1f: carnauba wax, colloidal silicon dioxide, croscarmellose sodium, ferric oxides, glyceryl dibehenate, hypromellose, pharmaceutical ink, polydextrose, polyethylene glycol, pregelatinized starch, titanium dioxide. Amazon search opened this Advil count at a price. No 12-digit UPC was printed for this count.';

const PM_SOURCE =
  'DailyMed setid 405afdb4-c157-1d88-f232-848063ba4714 is Advil PM Liqui-Gels. Each capsule: diphenhydramine hydrochloride 25 mg and solubilized ibuprofen 200 mg. Inactive ingredients: D&C red no. 33, FD&C blue no. 1, gelatin, medium-chain triglycerides, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitol sorbitan solution. The label does not split a minis line. Amazon search opened Advil PM Liqui-Gels at a price for this count. No 12-digit UPC was printed for this count.';

export const BATCH184_KYR6C_PAIN_LINE: RatingRecord[] = [
  row({
    id: 'advil-b184-liquigel-20',
    productName: 'Advil Liqui-Gels (20 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: LIQUIGEL_FLAGS,
    source: `${LIQUIGEL_SOURCE} Amazon showed Advil Liqui-Gels, 20 capsules, at $4.28.`,
  }),
  row({
    id: 'advil-b184-liquigel-40',
    productName: 'Advil Liqui-Gels (40 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: LIQUIGEL_FLAGS,
    source: `${LIQUIGEL_SOURCE} Amazon showed Advil Liqui-Gels, 40 capsules, at $6.32.`,
  }),
  row({
    id: 'advil-b184-liquigel-80',
    productName: 'Advil Liqui-Gels (80 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: LIQUIGEL_FLAGS,
    source: `${LIQUIGEL_SOURCE} Amazon showed Advil Liqui-Gels, 80 capsules, at $10.99.`,
  }),
  row({
    id: 'advil-b184-liquigel-160',
    productName: 'Advil Liqui-Gels (160 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: LIQUIGEL_FLAGS,
    source: `${LIQUIGEL_SOURCE} Amazon showed Advil Liqui-Gels, 160 capsules, at $16.53. That card does not say minis.`,
  }),
  row({
    id: 'advil-b184-liquigel-180',
    productName: 'Advil Liqui-Gels (180 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: LIQUIGEL_FLAGS,
    source: `${LIQUIGEL_SOURCE} Amazon showed Advil Liqui-Gels, 180 capsules, at $15.95.`,
  }),
  row({
    id: 'advil-b184-mini-8',
    productName: 'Advil Liqui-Gels Minis (8 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-minis',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: MINI_FLAGS,
    source: `${MINI_SOURCE} Amazon showed Advil Mini Liqui-Gels, 8 count, at $3.00. The label lists an 8-count vial.`,
  }),
  row({
    id: 'advil-b184-mini-80',
    productName: 'Advil Liqui-Gels Minis (80 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-minis',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: MINI_FLAGS,
    source: `${MINI_SOURCE} Amazon showed Advil Mini Liqui-Gels, 80 capsules, at $9.95.`,
  }),
  row({
    id: 'advil-b184-mini-160',
    productName: 'Advil Liqui-Gels Minis (160 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-minis',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: MINI_FLAGS,
    source: `${MINI_SOURCE} Amazon showed Liqui-Gels Minis, 160 liquid filled capsules, at $16.53.`,
  }),
  row({
    id: 'advil-b184-mini-200',
    productName: 'Advil Liqui-Gels Minis (200 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-minis',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: MINI_FLAGS,
    source: `${MINI_SOURCE} Amazon showed Haleon Advil Liqui-Gels minis, 200 liquid filled capsules, at $23.47.`,
  }),
  row({
    id: 'advil-b184-dual-18',
    productName: 'Advil Dual Action (18 caplets)',
    brand: 'Advil',
    formulaId: 'advil-b184-dual',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    actives: DUAL_ACTIVES,
    flags: DUAL_FLAGS,
    source: `${DUAL_SOURCE} Amazon showed Advil Dual Action, ibuprofen 125 mg, 18 caplets, at $4.28.`,
  }),
  row({
    id: 'advil-b184-dual-72',
    productName: 'Advil Dual Action (72 caplets)',
    brand: 'Advil',
    formulaId: 'advil-b184-dual',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    actives: DUAL_ACTIVES,
    flags: DUAL_FLAGS,
    source: `${DUAL_SOURCE} Amazon showed Advil Dual Action coated caplets, 72 count, at $10.98.`,
  }),
  row({
    id: 'advil-b184-dual-216',
    productName: 'Advil Dual Action (216 caplets)',
    brand: 'Advil',
    formulaId: 'advil-b184-dual',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    actives: DUAL_ACTIVES,
    flags: DUAL_FLAGS,
    source: `${DUAL_SOURCE} Amazon showed Advil Dual Action coated caplets, 216 count, at $27.59.`,
  }),
  row({
    id: 'advil-b184-back-144',
    productName: 'Advil Dual Action Back Pain (144 caplets)',
    brand: 'Advil',
    formulaId: 'advil-b184-dual',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    actives: DUAL_ACTIVES,
    flags: DUAL_FLAGS,
    source: `${DUAL_SOURCE} Amazon showed Advil Dual Action Back Pain coated caplets, 144 count, at $17.98. The Back Pain label lists 144.`,
  }),
  row({
    id: 'advil-b184-pm-liq-40',
    productName: 'Advil PM Liqui-Gels (40 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-pm-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: PM_ACTIVES,
    flags: PM_FLAGS,
    source: `${PM_SOURCE} Amazon showed Advil PM Liqui-Gels, 40 capsules, at $10.98.`,
  }),
  row({
    id: 'advil-b184-pm-liq-80',
    productName: 'Advil PM Liqui-Gels (80 liquid gels)',
    brand: 'Advil',
    formulaId: 'advil-b184-pm-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: PM_ACTIVES,
    flags: PM_FLAGS,
    source: `${PM_SOURCE} Amazon showed Advil PM Liqui-Gels, 80 capsules, at $17.98. The same search also titled an 80-count as PM Mini Liqui-Gels. The label has one inactive line for this count.`,
  }),
  row({
    id: 'motrin-b184-df-berry-4',
    productName: "Children's Motrin Dye-Free Oral Suspension, Berry (4 fl oz)",
    brand: 'Motrin',
    formulaId: 'motrin-b184-df-susp',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    actives: MOTRIN_CHILD,
    flags: MOTRIN_DF_FLAGS,
    source:
      "DailyMed setid 9e1cdef7-921f-4163-869c-6c062e31c5bb is Children's Motrin suspension. The display panel says DYE-FREE, Original Berry Flavor, 4 fl oz (120 mL). Active ibuprofen 100 mg per 5 mL. Inactive ingredients: acesulfame potassium, anhydrous citric acid, flavors, glycerin, polysorbate 80, pregelatinized starch, purified water, sodium benzoate, sucrose, xanthan gum. Ages 2 to 11. Amazon search for Children's Motrin dye-free opened a berry 4 fl oz dye-free suspension at $7.68. No 12-digit UPC was printed.",
  }),
  row({
    id: 'motrin-b184-df-berry-8',
    productName: "Children's Motrin Dye-Free Oral Suspension, Berry (8 fl oz)",
    brand: 'Motrin',
    formulaId: 'motrin-b184-df-susp',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    actives: MOTRIN_CHILD,
    flags: MOTRIN_DF_FLAGS,
    source:
      "DailyMed setid 9e1cdef7-921f-4163-869c-6c062e31c5bb lists a 240 mL bottle on the same dye-free berry suspension. 240 mL is 8 fl oz. Amazon opened Children's Motrin Oral Suspension, dye-free, berry, 8 fl oz, at $11.97. No 12-digit UPC was printed.",
  }),
  row({
    id: 'motrin-b184-bubble-4',
    productName: "Children's Motrin Oral Suspension, Bubble Gum (4 fl oz)",
    brand: 'Motrin',
    formulaId: 'motrin-b184-bubble',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    actives: MOTRIN_CHILD,
    flags: MOTRIN_BUBBLE_FLAGS,
    source:
      "DailyMed setid 152189e5-391c-42d3-a03b-c8364e2de6bf is Children's Motrin suspension. The display panel says Bubble Gum Flavor, 4 fl oz (120 mL). Active ibuprofen 100 mg per 5 mL. Inactive ingredients: acesulfame potassium, anhydrous citric acid, FD&C red no. 40, flavors, glycerin, polysorbate 80, pregelatinized starch, purified water, sodium benzoate, sucrose, xanthan gum. Amazon opened Children's Motrin Oral Suspension, bubble gum, 4 fl oz, at $7.68. No 12-digit UPC was printed.",
  }),
  row({
    id: 'motrin-b184-df-grape-24',
    productName: "Children's Motrin Dye-Free Chewable Tablets, Grape (24 chewables)",
    brand: 'Motrin',
    formulaId: 'motrin-b184-df-chew',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    actives: MOTRIN_CHEW_ACTIVE,
    flags: MOTRIN_CHEW_FLAGS,
    source:
      "DailyMed setid 15b0b56d-6188-4937-b541-902022e35b24 is Children's Motrin dye-free chewable tablets. The display panel says Dye-Free and Grape, 24 tablets. Active ibuprofen 100 mg. Inactive ingredients: acesulfame potassium, ammonium glycyrrhizin, aspartame, carnauba wax, croscarmellose sodium, hypromellose, magnesium stearate, mannitol, natural and artificial flavors, silicon dioxide, sodium lauryl sulfate, soybean oil, succinic acid. Ages 2 to 11. Amazon opened Children's Motrin Dye-Free Chewable Tablets, grape, 24 ct, at $7.94. No 12-digit UPC was printed.",
  }),
  row({
    id: 'motrin-b184-ib-gel-120',
    productName: 'Motrin IB Liquid Gels (120 liquid gels)',
    brand: 'Motrin',
    formulaId: 'motrin-b184-ib-gels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    actives: IBU_200,
    flags: MOTRIN_GEL_FLAGS,
    source:
      'DailyMed setid d9fc716a-fba5-45f8-8024-52325799d1dd is Motrin IB liquid gels. Active ibuprofen 200 mg. Inactive ingredients: gelatin, pharmaceutical ink, polyethylene glycol, potassium hydroxide, purified water, sorbitan and sorbitol. The label lists a 120-count bottle. Amazon opened Motrin IB Liquid Gels, 200 mg ibuprofen, 120 count, at $15.58. No 12-digit UPC was printed.',
  }),
  row({
    id: 'motrin-b184-dual-80',
    productName: 'Motrin Dual Action with Tylenol (80 caplets)',
    brand: 'Motrin',
    formulaId: 'motrin-b184-dual',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    actives: DUAL_ACTIVES,
    flags: MOTRIN_DUAL_FLAGS,
    source:
      'DailyMed setid f2ee9cf5-02b7-6612-e053-2995a90a90c4 is Motrin Dual Action with Tylenol. Active ibuprofen 125 mg and acetaminophen 250 mg. Inactive ingredients: colloidal silicon dioxide, corn starch, croscarmellose sodium, crospovidone, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, povidone, pregelatinized starch, stearic acid, sucralose, talc, titanium dioxide. The label lists an 80-count bottle. Amazon opened Motrin Dual Action with Tylenol, 80 ct, at $13.97. No 12-digit UPC was printed.',
  }),
  row({
    id: 'motrin-b184-dual-120',
    productName: 'Motrin Dual Action with Tylenol (120 caplets)',
    brand: 'Motrin',
    formulaId: 'motrin-b184-dual',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    actives: DUAL_ACTIVES,
    flags: MOTRIN_DUAL_FLAGS,
    source:
      'DailyMed setid f2ee9cf5-02b7-6612-e053-2995a90a90c4 lists a 120-count bottle on the same Dual Action panel. Amazon opened Motrin Dual Action with Tylenol, 120 ct, at $15.97. No 12-digit UPC was printed.',
  }),
  row({
    id: 'tylenol-b184-df-cherry-8',
    productName: "Children's Tylenol Dye-Free Oral Suspension, Cherry (8 fl oz)",
    brand: 'Tylenol',
    formulaId: 'tylenol-b184-df-susp',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    actives: APAP_160,
    flags: TYLENOL_DF_FLAGS,
    source:
      "DailyMed setid 46ddbfde-54ab-4373-b832-b9c0620b1e9d is Children's Tylenol dye-free suspension. The display panel says DYE-FREE, Cherry Flavor, 8 fl oz (240 mL). Active acetaminophen 160 mg per 5 mL. Inactive ingredients: anhydrous citric acid, flavors, glycerin, microcrystalline cellulose and carboxymethylcellulose sodium, potassium sorbate, purified water, sorbitol solution, sucralose, sucrose, xanthan gum. The combo is the two Cleared cellulose locks. Ages 2 to 11. Amazon opened Children's Tylenol dye-free oral suspension, cherry, 8 fl oz, at $11.47. No 12-digit UPC was printed.",
  }),
  row({
    id: 'tylenol-b184-bubble-4',
    productName: "Children's Tylenol Oral Suspension, Bubble Gum (4 fl oz)",
    brand: 'Tylenol',
    formulaId: 'tylenol-b184-bubble',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    actives: APAP_160,
    flags: TYLENOL_BUBBLE_FLAGS,
    source:
      "DailyMed setid 333f6231-3778-4c1f-9558-2afddca22c86 is Children's Tylenol suspension. The display panel says Bubble Gum Flavor, 4 fl oz (120 mL). Active acetaminophen 160 mg per 5 mL. Inactive ingredients: anhydrous citric acid, D&C red no. 33, FD&C red no. 40, flavors, glycerin, high fructose corn syrup, microcrystalline cellulose and carboxymethylcellulose sodium, purified water, sodium benzoate, sorbitol solution, sucralose, xanthan gum. Amazon opened Children's Tylenol oral suspension, bubble gum, 4 fl oz, at $7.68. No 12-digit UPC was printed.",
  }),
  row({
    id: 'tylenol-b184-df-berry-24',
    productName: "Children's Tylenol Dye-Free Chewables, Wild Berry (24 chewables)",
    brand: 'Tylenol',
    formulaId: 'tylenol-b184-df-chew',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    actives: APAP_CHEW,
    flags: TYLENOL_CHEW_FLAGS,
    source:
      "DailyMed setid 3a935584-6045-0a58-e063-6394a90a40c4 is Children's Tylenol dye-free chewables. The display panel says Dye-Free, Wild Berry Flavor, 24 chewable tablets, 160 mg each. Inactive ingredients: acesulfame potassium, acetic acid, cellulose acetate, ethyl acetate, flavor, magnesium stearate, maltodextrin, mannitol, microcrystalline cellulose, modified starch, povidone, sodium starch glycolate, sucralose. Ages 2 to 11. Amazon opened Children's Tylenol dye-free chewables, wild berry, 24 ct, at $7.98. No 12-digit UPC was printed.",
  }),
  row({
    id: 'excedrin-b184-rapid-20',
    productName: 'Excedrin Rapid Relief (20 caplets)',
    brand: 'Excedrin',
    formulaId: 'excedrin-b184-rapid',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    actives: APAP_500,
    flags: RAPID_FLAGS,
    source:
      'DailyMed setid 3a36b7ca-396e-cfd8-e063-6294a90a76ab is Excedrin Rapid Relief. Active acetaminophen 500 mg. Inactive ingredients: alginic acid, calcium carbonate, carnauba wax, colloidal silicon dioxide, crospovidone, hypromellose, magnesium stearate, polyethylene glycol, polysorbate 80, povidone, pregelatinized starch, purified water, titanium dioxide. The label lists a 20-count bottle. Amazon search for Excedrin Extra Strength caplets opened Rapid Relief caplets, 500 mg acetaminophen, caffeine free, aspirin free, 20 count, at $4.98. No 12-digit UPC was printed.',
  }),
];

const ROWS = BATCH184_KYR6C_PAIN_LINE;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

if (ROWS.length !== 26) throw new Error(`batch184 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (ids.includes('motrin-b184-infant-df-1') || ids.includes('tylenol-b184-infant-df-1')) {
  throw new Error('batch184 infant count rows stay removed');
}
if (new Set(ids).size !== ids.length) throw new Error('batch184 duplicate id');
for (const record of ROWS) {
  if (record.barcode) throw new Error(`batch184 barcode ${record.id}`);
  const note = contradictionHonestNote(record);
  const stackHonest = record.honestNote?.includes('stacking rule (t137u)');
  if ((note || record.honestNote) && !stackHonest) {
    throw new Error(`batch184 unexpected note ${record.id}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch184 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch184 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch184 verdict ${record.id}`);
}
