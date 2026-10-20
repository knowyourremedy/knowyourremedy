// DRAFT / not verified / batch 175 KYR6-c.
// Packs held for the Oct 15 tokens whose panels were read and whose counts
// were for sale. Gas-X Total Relief is not in this file. The sale page that
// opened prints n-butyl alcohol, and that token is not graded.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const COLD = 'Cold & Flu';
const PAIN = 'Pain & Fever';

const METH = {
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
  citric: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  citrate: 'Methodology §5 Cleared (citrate salts as buffers). Sodium citrate sits on that row.',
  cmcCalcium: 'Methodology §5 Caution (carboxymethylcellulose calcium). Same family as cellulose gum. Cellulose gum stays Cleared.',
  cmcSodium: 'Methodology §5 Cleared (cellulose gum / sodium carboxymethyl cellulose).',
  cornSyrup: 'Methodology §5 Caution (corn syrup solids).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  dyes: 'Methodology §5 High-risk (FD&C and D&C dyes, including aluminum lakes).',
  edetate: 'Methodology §5 Caution (edetate disodium).',
  flavors: 'Methodology §5 Limited (natural and artificial flavors). Not the Caution flavor row.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  gluconate: 'Methodology §5 Cleared (calcium gluconate). Calcium gluconate monohydrate maps here.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  honey: 'Methodology §5 Cleared (honey, oral sweetener).',
  hpmc: 'Methodology §5 Cleared (hypromellose).',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  iron: 'Methodology §5 Caution (iron oxide as color). Iron oxide black and brown iron oxide sit on that row.',
  lecithin: 'Methodology §5 Cleared (lecithin with no source named). Same as soy lecithin and sunflower lecithin. The soy note stays on soy lecithin only.',
  mag: 'Methodology §5 Cleared (magnesium stearate).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mct: 'Methodology §5 Limited (unlabeled medium-chain triglycerides). No plant is named.',
  milk: 'Methodology §5 Cleared (whole dry milk). It is milk.',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol).',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol as an oral coating).',
  shellac: 'Methodology §5 Cleared (shellac).',
  silicate: 'Methodology §5 Caution (potassium aluminum silicate). Aluminum salt.',
  simethicone: 'Methodology §5 Caution (simethicone as an other ingredient).',
  sodiumBenzoate: 'Methodology §5 Caution (sodium benzoate).',
  sodiumGluconate: 'Methodology §5 Cleared (sodium gluconate). Same gluconate family as calcium gluconate.',
  sodiumHydroxide: 'Methodology §5 Cleared (sodium hydroxide).',
  sorbitan: 'Methodology §5 Caution (sorbitol sorbitan solution).',
  sorbitol: 'Methodology §5 Limited (oral sorbitol). Sorbitol solution sits on that row.',
  starch: 'Methodology §5 Cleared (pregelatinized starch).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sucralose: 'Methodology §5 Moderate-risk (sucralose).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  talc: 'Methodology §5 High-risk (talc, oral).',
  tio2: 'Methodology §5 High-risk (titanium dioxide).',
  triacetin: 'Methodology §5 Cleared (triacetin).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xanthan: 'Methodology §5 Cleared (xanthan gum).',
  zincGluconate: 'Methodology §5 Cleared (zinc gluconate). Same gluconate family as calcium gluconate.',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const COLD_ALTS: CleanAlternative[] = [
  alt(
    'coldcalm-meltaways',
    'Independently Clean homeopathic meltaway tablets already on main. Minimum age 4. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'oscillococcinum',
    'Independently Clean homeopathic flu pellets already on main. Minimum age 12. Form labeled, not a hard filter (§6).',
  ),
];

const PAIN_ALTS: CleanAlternative[] = [
  alt(
    'genexa-acetaminophen-es',
    'Independently Clean adult acetaminophen Extra Strength already on main. Same Pain & Fever shelf. Form labeled, not a hard filter (§6).',
  ),
];

const MULTI_PANEL = 'Thrifty White Coricidin HBP Maximum Strength Multi-Symptom Flu 24-count panel';
const GELS_PANEL = 'Thrifty White Coricidin HBP Cold, Cough and Flu Maximum Strength liquid gels 24-count panel';
const DAY_SYRUP_PANEL =
  'DailyMed setid 0324195f-506d-4747-990e-ad44e2a117d9 Theraflu Flu Relief Max Strength Daytime syrup panel';
const DAY_CHEW_PANEL =
  'DailyMed setid 91dbb541-6a86-4803-a1fe-1bf61b457c34 Theraflu Severe Cold Relief Daytime soft chews panel';
const NIGHT_CHEW_PANEL =
  'DailyMed setid 6ba64bbe-7599-406a-9187-737c0f8c1c2a Theraflu Severe Cold Relief Nighttime soft chews panel';
const GELCAP_PANEL = 'The Fresh Grocer Midol Complete Gelcaps 24-count panel';

export const BATCH175_KYR6C_HELD_TOKENS: RatingRecord[] = [
  {
    id: 'coricidin-b175-multi-flu-24',
    productName: 'Coricidin HBP Maximum Strength Multi-Symptom Flu Tablets (24 ct)',
    brand: 'Coricidin',
    category: COLD,
    barcode: '041100589644',
    formulaId: 'coricidin-b175-multi-flu',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Chlorpheniramine maleate', strength: '2 mg' },
      { name: 'Dextromethorphan hydrobromide', strength: '10 mg' },
    ],
    inactiveIngredients: [
      flag(MULTI_PANEL, 'FD&C Red No. 40 aluminum lake', 'high', METH.dyes),
      flag(MULTI_PANEL, 'Lecithin', 'cleared', METH.lecithin),
      flag(MULTI_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      flag(MULTI_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(MULTI_PANEL, 'Polyvinyl alcohol', 'cleared', METH.pva),
      flag(MULTI_PANEL, 'Povidone', 'cleared', METH.povidone),
      flag(MULTI_PANEL, 'Pregelatinized starch', 'cleared', METH.starch),
      flag(MULTI_PANEL, 'Stearic acid', 'cleared', METH.stearic),
      flag(MULTI_PANEL, 'Talc', 'high', METH.talc),
      flag(MULTI_PANEL, 'Titanium dioxide', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'Thrifty White opened Coricidin HBP Multi-Symptom Flu Maximum Strength Tablets, 24 ct, in stock at $8.87, stock 25. UPC on that page: 041100589644. Inactive ingredients: FD&C Red #40 aluminum lake, lecithin, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, povidone, pregelatinized starch, stearic acid, talc, titanium dioxide. Actives in each tablet: acetaminophen 325 mg, chlorpheniramine maleate 2 mg, dextromethorphan hydrobromide 10 mg. Adults and children 12 years and over: 2 tablets every 4 hours. Under 12, ask a doctor.',
    ],
  },
  {
    id: 'coricidin-b175-cold-cough-gels-24',
    productName: 'Coricidin HBP Cold, Cough & Flu Maximum Strength Liquid Gels (24 ct)',
    brand: 'Coricidin',
    category: COLD,
    barcode: '041100597885',
    formulaId: 'coricidin-b175-cold-cough-gels',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Dextromethorphan hydrobromide', strength: '10 mg' },
      { name: 'Guaifenesin', strength: '200 mg' },
    ],
    inactiveIngredients: [
      flag(GELS_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
      flag(GELS_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(GELS_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(GELS_PANEL, 'Iron oxide black', 'limited', METH.iron),
      flag(GELS_PANEL, 'Lecithin', 'cleared', METH.lecithin),
      flag(GELS_PANEL, 'Medium-chain triglycerides', 'limited', METH.mct),
      flag(GELS_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(GELS_PANEL, 'Potassium aluminum silicate', 'limited', METH.silicate),
      flag(GELS_PANEL, 'Povidone', 'cleared', METH.povidone),
      flag(GELS_PANEL, 'Propylene glycol', 'moderate', METH.pg),
      flag(GELS_PANEL, 'Purified water', 'cleared', METH.water),
      flag(GELS_PANEL, 'Shellac', 'cleared', METH.shellac),
      flag(GELS_PANEL, 'Sodium hydroxide', 'cleared', METH.sodiumHydroxide),
      flag(GELS_PANEL, 'Sorbitol sorbitan solution', 'limited', METH.sorbitan),
      flag(GELS_PANEL, 'Titanium dioxide', 'high', METH.tio2),
    ],
    verdict: 'avoid',
    retailers: ['Thrifty White'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'Thrifty White opened Coricidin HBP Cold, Cough & Flue Max Strength Liquid Gels, 24 cap, in stock at $9.60, stock 10. The page title spells Flue. UPC on that page: 041100597885. Inactive ingredients: FD&C Red No. 40, gelatin, glycerin, iron oxide black, lecithin, medium-chain triglycerides, polyethylene glycol, potassium aluminum silicate, povidone, propylene glycol, purified water, shellac, sodium hydroxide, sorbitol sorbitan solution, titanium dioxide. Actives in each capsule: acetaminophen 325 mg, dextromethorphan hydrobromide 10 mg, guaifenesin 200 mg. Adults and children 12 years and over: 2 capsules with water every 4 hours. Under 12, do not use.',
    ],
  },
  {
    id: 'theraflu-b175-flu-day-syrup-83',
    productName: 'Theraflu Flu Relief Max Strength Daytime Syrup, Honey & Elderberry (8.3 fl oz)',
    brand: 'Theraflu',
    category: COLD,
    formulaId: 'theraflu-b175-flu-day-syrup',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '1000 mg / 30 mL' },
      { name: 'Dextromethorphan hydrobromide', strength: '30 mg / 30 mL' },
    ],
    inactiveIngredients: [
      flag(DAY_SYRUP_PANEL, 'Anhydrous citric acid', 'cleared', METH.citric),
      flag(DAY_SYRUP_PANEL, 'Carboxymethylcellulose sodium', 'cleared', METH.cmcSodium),
      flag(DAY_SYRUP_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(DAY_SYRUP_PANEL, 'Natural and artificial flavors', 'limited', METH.flavors),
      flag(DAY_SYRUP_PANEL, 'Natural grade A honey', 'cleared', METH.honey),
      flag(DAY_SYRUP_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(DAY_SYRUP_PANEL, 'Propylene glycol', 'moderate', METH.pg),
      flag(DAY_SYRUP_PANEL, 'Purified water', 'cleared', METH.water),
      flag(DAY_SYRUP_PANEL, 'Sodium benzoate', 'limited', METH.sodiumBenzoate),
      flag(DAY_SYRUP_PANEL, 'Sodium citrate', 'cleared', METH.citrate),
      flag(DAY_SYRUP_PANEL, 'Sodium gluconate', 'cleared', METH.sodiumGluconate),
      flag(DAY_SYRUP_PANEL, 'Sucralose', 'moderate', METH.sucralose),
      flag(DAY_SYRUP_PANEL, 'Xanthan gum', 'cleared', METH.xanthan),
      flag(DAY_SYRUP_PANEL, 'Zinc gluconate', 'cleared', METH.zincGluconate),
    ],
    verdict: 'caution',
    retailers: ['Instacart', 'Walgreens'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'Instacart opened Theraflu Daytime Medicine for Flu Symptom Relief, Max strength, 8.3 oz, at Walgreens, current price $16.99. No barcode was printed on that page. DailyMed setid 0324195f-506d-4747-990e-ad44e2a117d9 is the panel for Theraflu Flu Relief Max Strength Daytime syrup, Honey & Elderberry, 8.3 fl oz. Inactive ingredients: anhydrous citric acid, carboxymethylcellulose sodium, glycerin, natural and artificial flavors, natural grade A honey, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium citrate, sodium gluconate, sucralose, xanthan gum, zinc gluconate. Actives in each 30 mL: acetaminophen 1000 mg and dextromethorphan hydrobromide 30 mg. Adults and children 12 years of age and over. Under 12, do not use.',
    ],
  },
  {
    id: 'theraflu-b175-severe-day-chews-20',
    productName: 'Theraflu Severe Cold Relief Daytime Soft Chews, Apple Cinnamon (20 ct)',
    brand: 'Theraflu',
    category: COLD,
    formulaId: 'theraflu-b175-severe-day-chews',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Dextromethorphan hydrobromide', strength: '10 mg' },
    ],
    inactiveIngredients: [
      flag(DAY_CHEW_PANEL, 'Calcium gluconate monohydrate', 'cleared', METH.gluconate),
      flag(DAY_CHEW_PANEL, 'Carboxymethylcellulose calcium', 'limited', METH.cmcCalcium),
      flag(DAY_CHEW_PANEL, 'Carnauba wax', 'cleared', METH.carnauba),
      flag(DAY_CHEW_PANEL, 'Corn syrup solids', 'limited', METH.cornSyrup),
      flag(DAY_CHEW_PANEL, 'Crospovidone', 'cleared', METH.crospovidone),
      flag(DAY_CHEW_PANEL, 'FD&C Red No. 40 aluminum lake', 'high', METH.dyes),
      flag(DAY_CHEW_PANEL, 'FD&C Yellow No. 6 aluminum lake', 'high', METH.dyes),
      flag(DAY_CHEW_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(DAY_CHEW_PANEL, 'Mannitol', 'limited', METH.mannitol),
      flag(DAY_CHEW_PANEL, 'Natural and artificial flavors', 'limited', METH.flavors),
      flag(DAY_CHEW_PANEL, 'Pregelatinized starch', 'cleared', METH.starch),
      flag(DAY_CHEW_PANEL, 'Simethicone', 'limited', METH.simethicone),
      flag(DAY_CHEW_PANEL, 'Sodium gluconate', 'cleared', METH.sodiumGluconate),
      flag(DAY_CHEW_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
      flag(DAY_CHEW_PANEL, 'Sorbitol solution', 'limited', METH.sorbitol),
      flag(DAY_CHEW_PANEL, 'Sucralose', 'moderate', METH.sucralose),
      flag(DAY_CHEW_PANEL, 'Sucrose', 'limited', METH.sucrose),
      flag(DAY_CHEW_PANEL, 'Whole dry milk', 'cleared', METH.milk),
    ],
    verdict: 'avoid',
    retailers: ['FSA Store', 'Instacart'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'FSA Store opened Theraflu Severe Cold Relief Daytime Soft Chews, Apple Cinnamon, 20 ct, at $12.95, for adults and children 12 years and over. Instacart opened the same 20-count daytime soft chews at $19.99. No barcode was printed on those pages. DailyMed setid 91dbb541-6a86-4803-a1fe-1bf61b457c34 prints the 20-count daytime soft chew panel. Inactive ingredients: calcium gluconate monohydrate, carboxymethylcellulose calcium, carnauba wax, corn syrup solids, crospovidone, FD&C red no. 40 aluminum lake, FD&C yellow no. 6 aluminum lake, glycerin, mannitol, natural and artificial flavors, pregelatinized starch, simethicone, sodium gluconate, sorbitol, sorbitol solution, sucralose, sucrose, whole dry milk. Actives in each chewable tablet: acetaminophen 325 mg and dextromethorphan hydrobromide 10 mg. Under 12, do not use. Apple cinnamon is the product name. The inactive line says natural and artificial flavors.',
    ],
  },
  {
    id: 'theraflu-b175-severe-night-chews-20',
    productName: 'Theraflu Severe Cold Relief Nighttime Soft Chews, Apple Cinnamon (20 ct)',
    brand: 'Theraflu',
    category: COLD,
    formulaId: 'theraflu-b175-severe-night-chews',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325 mg' },
      { name: 'Diphenhydramine hydrochloride', strength: '12.5 mg' },
    ],
    inactiveIngredients: [
      flag(NIGHT_CHEW_PANEL, 'Brown iron oxide', 'limited', METH.iron),
      flag(NIGHT_CHEW_PANEL, 'Calcium gluconate monohydrate', 'cleared', METH.gluconate),
      flag(NIGHT_CHEW_PANEL, 'Carboxymethylcellulose calcium', 'limited', METH.cmcCalcium),
      flag(NIGHT_CHEW_PANEL, 'Carnauba wax', 'cleared', METH.carnauba),
      flag(NIGHT_CHEW_PANEL, 'Corn syrup solids', 'limited', METH.cornSyrup),
      flag(NIGHT_CHEW_PANEL, 'Crospovidone', 'cleared', METH.crospovidone),
      flag(NIGHT_CHEW_PANEL, 'FD&C Red No. 40', 'high', METH.dyes),
      flag(NIGHT_CHEW_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(NIGHT_CHEW_PANEL, 'Mannitol', 'limited', METH.mannitol),
      flag(NIGHT_CHEW_PANEL, 'Natural and artificial flavors', 'limited', METH.flavors),
      flag(NIGHT_CHEW_PANEL, 'Pregelatinized starch', 'cleared', METH.starch),
      flag(NIGHT_CHEW_PANEL, 'Simethicone', 'limited', METH.simethicone),
      flag(NIGHT_CHEW_PANEL, 'Sodium gluconate', 'cleared', METH.sodiumGluconate),
      flag(NIGHT_CHEW_PANEL, 'Sorbitol', 'limited', METH.sorbitol),
      flag(NIGHT_CHEW_PANEL, 'Sorbitol solution', 'limited', METH.sorbitol),
      flag(NIGHT_CHEW_PANEL, 'Sucralose', 'moderate', METH.sucralose),
      flag(NIGHT_CHEW_PANEL, 'Sucrose', 'limited', METH.sucrose),
      flag(NIGHT_CHEW_PANEL, 'Whole dry milk', 'cleared', METH.milk),
    ],
    verdict: 'avoid',
    retailers: ['Instacart'],
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      'Instacart opened Theraflu Severe Cold Relief Nighttime Soft Chews, Apple Cinnamon, 20 ct, at $14.99. No barcode was printed on that page. DailyMed setid 6ba64bbe-7599-406a-9187-737c0f8c1c2a prints the 20-count nighttime soft chew panel. Inactive ingredients: brown iron oxide, calcium gluconate monohydrate, carboxymethylcellulose calcium, carnauba wax, corn syrup solids, crospovidone, FD&C red no. 40, glycerin, mannitol, natural and artificial flavors, pregelatinized starch, simethicone, sodium gluconate, sorbitol, sorbitol solution, sucralose, sucrose, whole dry milk. Actives in each chewable tablet: acetaminophen 325 mg and diphenhydramine hydrochloride 12.5 mg. Adults and children 12 years of age and over. Under 12, do not use.',
    ],
  },
  {
    id: 'midol-b175-complete-gelcaps-24',
    productName: 'Midol Complete Gelcaps (24 ct)',
    brand: 'Midol',
    category: PAIN,
    barcode: '312843172531',
    formulaId: 'midol-b175-complete-gelcaps',
    audience: ADULT,
    minAge: 12,
    form: 'gelcap',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500 mg' },
      { name: 'Caffeine', strength: '60 mg' },
      { name: 'Pyrilamine maleate', strength: '15 mg' },
    ],
    inactiveIngredients: [
      flag(GELCAP_PANEL, 'Black iron oxide', 'limited', METH.iron),
      flag(GELCAP_PANEL, 'Carnauba wax', 'cleared', METH.carnauba),
      flag(GELCAP_PANEL, 'Croscarmellose sodium', 'cleared', METH.croscarmellose),
      flag(GELCAP_PANEL, 'D&C Red No. 33 aluminum lake', 'high', METH.dyes),
      flag(GELCAP_PANEL, 'Edetate disodium', 'limited', METH.edetate),
      flag(GELCAP_PANEL, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dyes),
      flag(GELCAP_PANEL, 'Gelatin', 'cleared', METH.gelatin),
      flag(GELCAP_PANEL, 'Glycerin', 'cleared', METH.glycerin),
      flag(GELCAP_PANEL, 'Hypromellose', 'cleared', METH.hpmc),
      flag(GELCAP_PANEL, 'Lecithin', 'cleared', METH.lecithin),
      flag(GELCAP_PANEL, 'Magnesium stearate', 'cleared', METH.mag),
      flag(GELCAP_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      flag(GELCAP_PANEL, 'Pregelatinized starch', 'cleared', METH.starch),
      flag(GELCAP_PANEL, 'Propylene glycol', 'moderate', METH.pg),
      flag(GELCAP_PANEL, 'Shellac', 'cleared', METH.shellac),
      flag(GELCAP_PANEL, 'Simethicone', 'limited', METH.simethicone),
      flag(GELCAP_PANEL, 'Stearic acid', 'cleared', METH.stearic),
      flag(GELCAP_PANEL, 'Titanium dioxide', 'high', METH.tio2),
      flag(GELCAP_PANEL, 'Triacetin', 'cleared', METH.triacetin),
    ],
    verdict: 'avoid',
    retailers: ['The Fresh Grocer'],
    cleanAlternatives: PAIN_ALTS,
    sourcesGeneral: [
      'The Fresh Grocer opened Midol Complete Gelcaps, 24 count, at $7.99. The product URL ties GTIN 00312843172531 to this 24-count, stored as UPC 312843172531. Inactive ingredients on that page: black iron oxide, carnauba wax, croscarmellose sodium, D&C red #33 aluminum lake, edetate disodium, FD&C blue #1 aluminum lake, gelatin, glycerin, hypromellose, lecithin, magnesium stearate, microcrystalline cellulose, pregelatinized starch, propylene glycol, shellac, simethicone, stearic acid, titanium dioxide, triacetin. Actives in each gelcap: acetaminophen 500 mg, caffeine 60 mg, pyrilamine maleate 15 mg. DailyMed setid 0a4477ce-0a02-197d-e054-00144ff88e88 prints that same inactive line and says adults and children 12 years and older. Under 12, consult a doctor.',
    ],
  },
];

const ROWS = BATCH175_KYR6C_HELD_TOKENS;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 6) throw new Error(`batch175 row count ${ROWS.length}`);

const codes = ROWS.map((row) => row.barcode).filter((code): code is string => Boolean(code));
if (new Set(codes).size !== codes.length) throw new Error('batch175 shared upc');
for (const code of codes) {
  if (!upcOk(code)) throw new Error(`batch175 upc ${code}`);
}

const byId = Object.fromEntries(ROWS.map((row) => [row.id, row]));
const counts = { Coricidin: 0, Theraflu: 0, 'Gas-X': 0, Midol: 0 };
for (const row of ROWS) {
  counts[row.brand as keyof typeof counts] += 1;
  if (row.honestNote) throw new Error(`batch175 note ${row.id}`);
  if (row.brand !== 'Theraflu' && !row.barcode) throw new Error(`batch175 missing upc ${row.id}`);
  if (row.brand === 'Theraflu' && row.barcode) throw new Error(`batch175 invented upc ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch175 blank why ${row.id} ${ingredient.name}`);
    const tagged = /dailymed/i.test(ingredient.source ?? '');
    if (row.brand === 'Theraflu' && !tagged) throw new Error(`batch175 panel source ${ingredient.name}`);
    if (row.brand !== 'Theraflu' && tagged) throw new Error(`batch175 flag dailymed ${ingredient.name}`);
  }
}

if (counts.Coricidin !== 2 || counts.Theraflu !== 3 || counts['Gas-X'] !== 0 || counts.Midol !== 1) {
  throw new Error(`batch175 brand counts ${JSON.stringify(counts)}`);
}
if (byId['theraflu-b175-flu-day-syrup-83'].verdict !== 'caution') throw new Error('batch175 syrup verdict');
if (byId['theraflu-b175-severe-day-chews-20'].formulaId === byId['theraflu-b175-severe-night-chews-20'].formulaId) {
  throw new Error('batch175 chew formula reuse');
}
if (byId['coricidin-b175-multi-flu-24'].verdict !== 'avoid') throw new Error('batch175 multi verdict');
if (byId['midol-b175-complete-gelcaps-24'].verdict !== 'avoid') throw new Error('batch175 midol verdict');
