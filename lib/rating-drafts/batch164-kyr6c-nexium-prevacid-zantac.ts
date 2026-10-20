// DRAFT / not verified / batch 164 KYR6-c Nexium, Prevacid, Zantac.
// US branded OTC only. A row exists only when that pack's panel was
// read and a page that opened showed that same count for sale.
// No Canada. No EU. No store brand. No bonus box, 2-pack, or kit.
// Maalox is not in this file. No US brand pack opened for sale.
//
// Not written, and not a hunt:
// Nexium 24HR tablets 14 and 42. Amazon was unavailable. Kroger 42
// said the selection was unavailable. Walmart 42 was out of stock.
// Target results that opened were capsules and ClearMinis.
// Zantac 360 original 10 mg 30. Marketing ended April 30, 2024.
// Zantac 360 Cool Mint 50. Marketing ended September 30, 2025.
// Zantac 360 70. DailyMed is a 2-bottle cello pack, not its own row.
// Zantac 360 1-count blister. Not a sold count that opened.
// Zantac 360 90. The shop page that opened was sold out.
// Zantac 360 100. The NDC is listed. No sale page opened.
//
// TALLY: 10 written — Clean 0 / Caution 0 / Avoid 10.
// Nexium 4 (Avoid 4). Prevacid 2 (Avoid 2). Zantac 4 (Avoid 4). Maalox 0.
// UPC attached 10 / empty 0.
// Written-row ungraded tokens: 0.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const DIGESTIVE = 'Digestive';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  carmine: 'Methodology §5 Caution (carmine). Not the Avoid driver.',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution). Not the Avoid driver.',
  cornStarch: 'Methodology §5 Cleared (corn starch).',
  dye: 'Methodology §5 High (synthetic FD&C / D&C dye, including the lake form). Avoid.',
  flavors: 'Methodology §5 Caution (artificial flavors). Not the Avoid driver.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  gms: 'Methodology §5 Cleared (glyceryl monostearate).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose). Low substituted hydroxypropyl cellulose is this HPC row.',
  hpmc: 'Methodology §5 Cleared (hypromellose).',
  ink: 'Methodology §5 Caution (pharmaceutical ink). Not the Avoid driver.',
  iron: 'Methodology §5 Caution (iron oxide as color). Ferric oxide, red iron oxide, and yellow iron oxide are this color. Not a synthetic dye. Not the Avoid driver.',
  mannitol: 'Methodology §5 Limited (mannitol, sugar alcohol). Not the Avoid driver.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  meglumine: 'Methodology §5 Caution (meglumine). Not High. Not the Avoid driver.',
  meth: 'Methodology §5 Caution (methacrylic acid copolymer). Not plain hypromellose. Not the Avoid driver.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not the Avoid driver.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  stearate: 'Methodology §5 Cleared (magnesium stearate).',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  sucrose: 'Methodology §5 Limited (sucrose, sugar). Not the Avoid driver.',
  sugarSpheres: 'Methodology §5 Caution (sugar spheres → bare sugar). Not the Avoid driver.',
  talc: 'Methodology §5 High (talc). Avoid.',
  tec: 'Methodology §5 Cleared (triethyl citrate).',
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ALTS: CleanAlternative[] = [
  alt('phillips-mom-original', 'Independently Clean liquid antacid already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-acidcalm', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

const CAP = 'Target Nexium 24HR capsule drug facts (14-count TCIN 15087727 and 42-count TCIN 15087729)';
const MINI = 'Target Nexium 24HR ClearMinis drug facts (14-count TCIN 51599654 and 42-count TCIN 51599705)';
const PREV = 'Target Prevacid 24HR drug facts (14-count TCIN 11692534 and 42-count TCIN 11740868)';
const MAX = 'DailyMed setid 89f60eb1-359b-40e8-ae8b-65aec9cd5b1f 20 mg drug facts, printed again on Target 25-count and 50-count';
const MINT = 'Target Cool Mint 25-count drug facts and DailyMed setid 19fe7c6e-243c-4005-a63a-f8cac1ce55c8';

function capsuleLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'D&C Red No. 28', 'high', METH.dye),
    flag(panel, 'FD&C Blue No. 1', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 40', 'high', METH.dye),
    flag(panel, 'Ferric oxide', 'limited', METH.iron),
    flag(panel, 'Gelatin', 'cleared', METH.gelatin),
    flag(panel, 'Glyceryl monostearate', 'cleared', METH.gms),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Methacrylic acid copolymer', 'limited', METH.meth),
    flag(panel, 'Pharmaceutical ink', 'limited', METH.ink),
    flag(panel, 'Polysorbate 80', 'moderate', METH.ps80),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
    flag(panel, 'Triethyl citrate', 'cleared', METH.tec),
  ];
}

function miniLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Carmine', 'limited', METH.carmine),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Blue No. 2', 'high', METH.dye),
    flag(panel, 'FD&C Blue No. 2 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 3', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 40', 'high', METH.dye),
    flag(panel, 'Ferric oxide', 'limited', METH.iron),
    flag(panel, 'Gelatin', 'cleared', METH.gelatin),
    flag(panel, 'Glyceryl monostearate', 'cleared', METH.gms),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Methacrylic acid copolymer', 'limited', METH.meth),
    flag(panel, 'Pharmaceutical ink', 'limited', METH.ink),
    flag(panel, 'Polysorbate 80', 'moderate', METH.ps80),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
    flag(panel, 'Triethyl citrate', 'cleared', METH.tec),
  ];
}

function prevacidLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'D&C Red No. 28', 'high', METH.dye),
    flag(panel, 'D&C Yellow No. 10', 'high', METH.dye),
    flag(panel, 'FD&C Blue No. 1', 'high', METH.dye),
    flag(panel, 'FD&C Red No. 40', 'high', METH.dye),
    flag(panel, 'Gelatin', 'cleared', METH.gelatin),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Low substituted hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Mannitol', 'limited', METH.mannitol),
    flag(panel, 'Meglumine', 'limited', METH.meglumine),
    flag(panel, 'Methacrylic acid copolymer', 'limited', METH.meth),
    flag(panel, 'Pharmaceutical ink', 'limited', METH.ink),
    flag(panel, 'Polyethylene glycol', 'moderate', METH.peg),
    flag(panel, 'Polysorbate 80', 'moderate', METH.ps80),
    flag(panel, 'Sodium lauryl sulfate', 'limited', METH.sls),
    flag(panel, 'Sugar spheres', 'limited', METH.sugarSpheres),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
  ];
}

function maxLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Carnauba wax', 'cleared', METH.carnauba),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Red iron oxide', 'limited', METH.iron),
    flag(panel, 'Sodium starch glycolate', 'cleared', METH.ssg),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
    flag(panel, 'Yellow iron oxide', 'limited', METH.iron),
  ];
}

function mintLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Artificial flavors', 'limited', METH.flavors),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Blue No. 1 aluminum lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow No. 5 aluminum lake', 'high', METH.dye),
    flag(panel, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
    flag(panel, 'Hypromellose', 'cleared', METH.hpmc),
    flag(panel, 'Magnesium stearate', 'cleared', METH.stearate),
    flag(panel, 'Microcrystalline cellulose', 'cleared', METH.mcc),
    flag(panel, 'Sodium starch glycolate', 'cleared', METH.ssg),
    flag(panel, 'Sucralose', 'moderate', METH.sucralose),
    flag(panel, 'Talc', 'high', METH.talc),
    flag(panel, 'Titanium dioxide', 'high', METH.tio2),
  ];
}

const ESO = [{ name: 'Esomeprazole', strength: '20 mg' }];
const LAN = [{ name: 'Lansoprazole', strength: '15 mg' }];
const FAM = [{ name: 'Famotidine', strength: '20 mg' }];

function row(partial: Omit<RatingRecord, 'category' | 'audience' | 'recordStatus' | 'retailers' | 'cleanAlternatives'>): RatingRecord {
  return {
    category: DIGESTIVE,
    audience: ADULT,
    recordStatus: UNVERIFIED,
    retailers: [...RETAILERS],
    cleanAlternatives: ALTS,
    ...partial,
  };
}

export const BATCH164_KYR6C_NEXIUM_PREVACID_ZANTAC: RatingRecord[] = [
  row({
    id: 'nexium-b164-capsules-14',
    productName: 'Nexium 24HR (14 delayed-release capsules)',
    brand: 'Nexium',
    barcode: '305732450148',
    formulaId: 'nexium-b164-capsules',
    minAge: 18,
    form: 'delayed-release capsule',
    productType: OTC,
    activeIngredients: ESO,
    inactiveIngredients: capsuleLine(CAP),
    verdict: 'avoid',
    sourcesGeneral: [
      'The Nexium 24HR capsules page lists a 14-count size and a 42-count size. Target TCIN 15087727 opened the 14-count, priced at $10.19 at store 3991, barcode 305732450148. Active: esomeprazole 20 mg. Each delayed-release capsule corresponds to 22.3 mg esomeprazole magnesium trihydrate. Directions: adults 18 years of age and older. Inactive ingredients on that page: corn starch, D&C red no. 28, FD&C blue no. 1, FD&C red no. 40, ferric oxide, gelatin, glyceryl monostearate, hydroxypropyl cellulose, hypromellose, magnesium stearate, methacrylic acid copolymer, pharmaceutical ink, polysorbate 80, sucrose, talc, titanium dioxide, triethyl citrate. Target prints “Blue No.1” without a space. That is FD&C Blue No. 1. The same line is on the brand capsule carton PDF and on DailyMed setid d56b330a-4355-4636-9d26-c592f67cea56, a repack of NDC 0573-2450. This code stays on the 14-count. The 42-count code 305732450421 was not copied here.',
    ],
  }),
  row({
    id: 'nexium-b164-capsules-42',
    productName: 'Nexium 24HR (42 delayed-release capsules)',
    brand: 'Nexium',
    barcode: '305732450421',
    formulaId: 'nexium-b164-capsules',
    minAge: 18,
    form: 'delayed-release capsule',
    productType: OTC,
    activeIngredients: ESO,
    inactiveIngredients: capsuleLine(CAP),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 15087729 opened Nexium 24HR delayed-release capsules, 42 ct, priced at $25.99 at store 3991, barcode 305732450421. The page says contents are 42 capsules. The inactive line matches the 14-count, so this row reuses formula nexium-b164-capsules. The 14-count code 305732450148 was not copied onto this 42-count.',
    ],
  }),
  row({
    id: 'nexium-b164-clearminis-14',
    productName: 'Nexium 24HR ClearMinis (14 delayed-release capsules)',
    brand: 'Nexium',
    barcode: '305732452142',
    formulaId: 'nexium-b164-clearminis',
    minAge: 18,
    form: 'delayed-release capsule',
    productType: OTC,
    activeIngredients: ESO,
    inactiveIngredients: miniLine(MINI),
    verdict: 'avoid',
    sourcesGeneral: [
      'The Nexium 24HR ClearMinis page lists a 14-count size and a 42-count size. Target TCIN 51599654 opened the 14-count, priced at $10.19 at store 3991, barcode 305732452142. Active: esomeprazole 20 mg. Directions: adults 18 years of age and older. Inactive ingredients: carmine, corn starch, FD&C blue no. 2, FD&C blue no. 2 aluminum lake, FD&C red no. 3, FD&C red no. 40, ferric oxide, gelatin, glyceryl monostearate, hydroxypropyl cellulose, hypromellose, magnesium stearate, methacrylic acid copolymer, pharmaceutical ink, polysorbate 80, sucrose, talc, titanium dioxide, triethyl citrate. That line is the ClearMinis section on DailyMed setid d56b330a-4355-4636-9d26-c592f67cea56. It does not match the regular capsule line, so this is formula nexium-b164-clearminis. This code stays on the 14-count.',
    ],
  }),
  row({
    id: 'nexium-b164-clearminis-42',
    productName: 'Nexium 24HR ClearMinis (42 delayed-release capsules)',
    brand: 'Nexium',
    barcode: '305732452425',
    formulaId: 'nexium-b164-clearminis',
    minAge: 18,
    form: 'delayed-release capsule',
    productType: OTC,
    activeIngredients: ESO,
    inactiveIngredients: miniLine(MINI),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 51599705 opened Nexium 24HR ClearMinis, 42 ct, priced at $25.99 at store 3991, barcode 305732452425. The inactive line matches the ClearMinis 14-count, so this row reuses formula nexium-b164-clearminis. The 14-count code 305732452142 was not copied onto this 42-count.',
    ],
  }),
  row({
    id: 'prevacid-b164-capsules-14',
    productName: 'Prevacid 24HR (14 delayed-release capsules)',
    brand: 'Prevacid',
    barcode: '370030165179',
    formulaId: 'prevacid-b164-capsules',
    minAge: 18,
    form: 'delayed-release capsule',
    productType: OTC,
    activeIngredients: LAN,
    inactiveIngredients: prevacidLine(PREV),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target search for Prevacid 24HR showed the 14-count and the 42-count with Add to cart. Target TCIN 11692534 opened the 14-count, priced at $9.99 at store 3991, barcode 370030165179. Active: lansoprazole 15 mg. Directions label: adults 18 years of age and older. Inactive ingredients: D&C red no. 28, D&C yellow no. 10, FD&C blue no. 1, FD&C red no. 40, gelatin, hypromellose, low substituted hydroxypropyl cellulose, mannitol, meglumine, methacrylic acid copolymer, pharmaceutical ink, polyethylene glycol, polysorbate 80, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide. The words “Inactive Ingredients” in front of that list are not an ingredient. This code stays on the 14-count.',
    ],
  }),
  row({
    id: 'prevacid-b164-capsules-42',
    productName: 'Prevacid 24HR (42 delayed-release capsules)',
    brand: 'Prevacid',
    barcode: '370030165186',
    formulaId: 'prevacid-b164-capsules',
    minAge: 18,
    form: 'delayed-release capsule',
    productType: OTC,
    activeIngredients: LAN,
    inactiveIngredients: prevacidLine(PREV),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 11740868 opened Prevacid 24HR, 42 capsules, priced at $23.99 at store 3991, barcode 370030165186. The inactive line matches the 14-count, so this row reuses formula prevacid-b164-capsules. The 14-count code 370030165179 was not copied onto this 42-count.',
    ],
  }),
  row({
    id: 'zantac-b164-max-8',
    productName: 'Zantac 360 Maximum Strength (8 tablets)',
    brand: 'Zantac',
    barcode: '681421036108',
    formulaId: 'zantac-b164-max',
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    activeIngredients: FAM,
    inactiveIngredients: maxLine(MAX),
    verdict: 'avoid',
    sourcesGeneral: [
      'Amazon opened Zantac 360 Maximum Strength 8-count tablets, ASIN B091BH3NWG, in stock at $11.90. The page says one 8-count blister pack, famotidine 20 mg, manufacturer Chattem. That page did not print the inactive line. DailyMed setid 89f60eb1-359b-40e8-ae8b-65aec9cd5b1f lists the 8-count blister (NDC 41167-0361-0) on the 20 mg product. Inactive ingredients on that 20 mg drug facts: carnauba wax, corn starch, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, red iron oxide, sodium starch glycolate, talc, titanium dioxide, yellow iron oxide. Directions: adults and children 12 years and over. Target printed that same line on the 25-count and the 50-count, so this row uses formula zantac-b164-max. Amazon lists manufacturer part number 681421036108 on this 8-count. That 12-digit code is attached only here. The 25-count code 681421036122 was not copied here.',
    ],
  }),
  row({
    id: 'zantac-b164-max-25',
    productName: 'Zantac 360 Maximum Strength (25 tablets)',
    brand: 'Zantac',
    barcode: '681421036122',
    formulaId: 'zantac-b164-max',
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    activeIngredients: FAM,
    inactiveIngredients: maxLine(MAX),
    verdict: 'avoid',
    sourcesGeneral: [
      'The Zantac brand page at Target showed the 25-count with Add to cart. Target TCIN 82560060 opened Zantac 360 Maximum Strength, 25 ct, priced at $9.19 at store 3991, barcode 681421036122. Active: famotidine USP 20 mg. Inactive ingredients: carnauba wax, corn starch, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, red iron oxide, sodium starch glycolate, talc, titanium dioxide, yellow iron oxide. That line matches the 20 mg drug facts, so this row reuses formula zantac-b164-max. This code stays on the 25-count.',
    ],
  }),
  row({
    id: 'zantac-b164-max-50',
    productName: 'Zantac 360 Maximum Strength (50 tablets)',
    brand: 'Zantac',
    barcode: '681421036146',
    formulaId: 'zantac-b164-max',
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    activeIngredients: FAM,
    inactiveIngredients: maxLine(MAX),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 1009020876 opened Zantac 360 Maximum Strength 20 mg, 50 count, priced at $24.97 at store 3991, barcode 681421036146. The record is a marketplace listing. Directions on that page: adults and children 12 years and over. Inactive ingredients match the 25-count, so this row reuses formula zantac-b164-max. The 25-count code 681421036122 was not copied onto this 50-count.',
    ],
  }),
  row({
    id: 'zantac-b164-cool-mint-25',
    productName: 'Zantac 360 Maximum Strength Cool Mint (25 tablets)',
    brand: 'Zantac',
    barcode: '681421036405',
    formulaId: 'zantac-b164-cool-mint',
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    activeIngredients: FAM,
    inactiveIngredients: mintLine(MINT),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 1009075325 opened Zantac 360 Maximum Strength Cool Mint 20 mg, 25 count, priced at $16.54 at store 3991, barcode 681421036405. Active: famotidine USP 20 mg. Directions: adults and children 12 years and over. Inactive ingredients: artificial flavors, corn starch, FD&C blue no. 1 aluminum lake, FD&C yellow no. 5 aluminum lake, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate, sucralose, talc, titanium dioxide. Other information on DailyMed setid 19fe7c6e-243c-4005-a63a-f8cac1ce55c8 says the tablet contains FD&C yellow no. 5 (tartrazine) as a color additive. That sentence names the yellow 5 lake already on the inactive line. It is not a second ingredient. This line does not match the unflavored 20 mg tablets, so this is formula zantac-b164-cool-mint. The Cool Mint 50-count marketing end date is September 30, 2025, and that count is not a row.',
    ],
  }),
];

const ROWS = BATCH164_KYR6C_NEXIUM_PREVACID_ZANTAC;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function lineKey(record: RatingRecord): string {
  return record.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
}

if (ROWS.length !== 10) throw new Error(`batch164 row count ${ROWS.length}`);
const expected = [
  ['nexium-b164-capsules-14', 'avoid', '305732450148', 'nexium-b164-capsules', 18],
  ['nexium-b164-capsules-42', 'avoid', '305732450421', 'nexium-b164-capsules', 18],
  ['nexium-b164-clearminis-14', 'avoid', '305732452142', 'nexium-b164-clearminis', 18],
  ['nexium-b164-clearminis-42', 'avoid', '305732452425', 'nexium-b164-clearminis', 18],
  ['prevacid-b164-capsules-14', 'avoid', '370030165179', 'prevacid-b164-capsules', 18],
  ['prevacid-b164-capsules-42', 'avoid', '370030165186', 'prevacid-b164-capsules', 18],
  ['zantac-b164-max-8', 'avoid', '681421036108', 'zantac-b164-max', 12],
  ['zantac-b164-max-25', 'avoid', '681421036122', 'zantac-b164-max', 12],
  ['zantac-b164-max-50', 'avoid', '681421036146', 'zantac-b164-max', 12],
  ['zantac-b164-cool-mint-25', 'avoid', '681421036405', 'zantac-b164-cool-mint', 12],
] as const;
for (const [id, verdict, barcode, formulaId, minAge] of expected) {
  const record = ROWS.find((item) => item.id === id);
  if (!record) throw new Error(`batch164 missing ${id}`);
  if (record.verdict !== verdict || record.barcode !== barcode || record.formulaId !== formulaId || record.minAge !== minAge) {
    throw new Error(`batch164 mismatch ${id}`);
  }
  if (!upcOk(barcode)) throw new Error(`batch164 bad upc ${barcode}`);
  if (record.honestNote) throw new Error(`batch164 note ${record.id}`);
  if (!record.inactiveIngredients.some((item) => item.riskLevel === 'high')) throw new Error(`batch164 high ${id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch164 blank why ${id} ${ingredient.name}`);
  }
}
if (new Set(ROWS.map((item) => item.barcode)).size !== 10) throw new Error('batch164 upc copy');
const pairs = [
  ['nexium-b164-capsules-14', 'nexium-b164-capsules-42'],
  ['nexium-b164-clearminis-14', 'nexium-b164-clearminis-42'],
  ['prevacid-b164-capsules-14', 'prevacid-b164-capsules-42'],
  ['zantac-b164-max-8', 'zantac-b164-max-25'],
  ['zantac-b164-max-25', 'zantac-b164-max-50'],
] as const;
for (const [a, b] of pairs) {
  const left = ROWS.find((item) => item.id === a)!;
  const right = ROWS.find((item) => item.id === b)!;
  if (lineKey(left) !== lineKey(right) || left.formulaId !== right.formulaId) throw new Error(`batch164 pair ${a}`);
}
const capsules = lineKey(ROWS.find((item) => item.id === 'nexium-b164-capsules-14')!);
const minis = lineKey(ROWS.find((item) => item.id === 'nexium-b164-clearminis-14')!);
const mint = lineKey(ROWS.find((item) => item.id === 'zantac-b164-cool-mint-25')!);
const max = lineKey(ROWS.find((item) => item.id === 'zantac-b164-max-25')!);
if (capsules === minis) throw new Error('batch164 clearminis should not match capsules');
if (mint === max) throw new Error('batch164 cool mint should not match the unflavored tablets');
if (ROWS.some((item) => item.brand === 'Maalox')) throw new Error('batch164 wrote Maalox');
