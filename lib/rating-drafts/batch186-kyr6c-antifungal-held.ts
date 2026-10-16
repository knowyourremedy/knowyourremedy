// DRAFT / not verified / batch 186 KYR6-c.
// Lotrimin and Monistat packs held for the Oct 15 token stamp.
// A row is written only when the panel was read and a page that opened shows that count for sale.
// Combination packs, kits, and 2-packs are not rows.
// A barcode is attached only when an opened page tied that code to that count.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const FIRST_AID = 'First Aid';

const METH = {
  benzyl:
    'Methodology §5 Caution (benzyl alcohol as topical inactive). Does not use the oral under-3 Avoid split. These packs are labeled do not use on children under 2.',
  benzethonium:
    'Methodology §5 Caution (benzethonium chloride). CIR says safe at 0.5% on skin. Same job as benzalkonium. That percent is how it is used. Not a new grade.',
  cetyl: 'Methodology §5 Cleared (cetyl alcohol / stearyl alcohol, fatty-alcohol cream base).',
  cetylWax: 'Methodology §5 Cleared (cetyl esters wax, emulsifying wax — wax family).',
  corn: 'Methodology §5 Cleared (corn starch). Zea mays (corn) starch is that starch.',
  cyclo:
    'Methodology §5 Caution (cyclomethicone). CIR says safe as used. EU restricts the D4 impurity. Not a new grade.',
  dimethyl: 'Methodology §5 Caution (dimethyl ether). Propellant. Low toxicity. Not a new grade.',
  dimethicone: 'Methodology §5 Cleared (dimethicone).',
  crosspolymer:
    'Methodology §5 Caution (dimethicone/vinyl dimethicone crosspolymer). CIR says safe as used. Not a new grade.',
  silsesquioxane:
    'Methodology §5 Caution (vinyl dimethicone/methicone silsesquioxane crosspolymer). CIR says safe as used. Not a new grade.',
  fragrance: 'Methodology §5 Caution (fragrance / parfum).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose).',
  isobutane: 'Methodology §5 Caution (isobutane, spray propellant).',
  kaolin: 'Methodology §5 Cleared (kaolin). Not calcined kaolin.',
  magStearate: 'Methodology §5 Cleared (magnesium stearate).',
  octyl:
    'Methodology §5 Caution (octyldodecanol). CIR says safe as used. EWG low. Not a new grade.',
  polyoxyl15:
    'Methodology §5 Caution (polyoxyl 15 hydroxystearate). Hydroxystearic acid is CIR-safe when non-irritating. Clean call. One level. Not a new grade.',
  polysorbate: 'Methodology §5 Moderate (polysorbate 60). Same family as polysorbate 80 and polysorbate 20.',
  sd: 'Methodology §5 Limited (SD alcohol 40-B). Same as the alcohol-vehicle row. Not a new grade.',
  silicaSilylate:
    'Methodology §5 Caution (silica dimethyl silylate). CIR says when the final product is not irritating or sensitizing to the respiratory tract. Clean call. One level. Not a new grade.',
  bicarb: 'Methodology §5 Cleared (sodium bicarbonate).',
  sorbitan:
    'Methodology §5 Caution (sorbitan esters as emulsifier). Sorbitan monostearate is that ester. Not a new grade.',
  hectorite:
    'Methodology §5 Caution (stearalkonium hectorite). CIR says safe as used. Not a new grade.',
  water: 'Methodology §5 Cleared (water / purified water).',
  zinc: 'Methodology §5 Cleared (zinc oxide, inactive topical). Not zinc oxide as an other ingredient.',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const SKIN_ALTS: CleanAlternative[] = [
  alt(
    'family-wellness-triple-antibiotic',
    'Independently Clean petrolatum ointment already on main. Minimum age 2. Form: ointment vs this pack — labeled, not a hard filter (§6). Cleanliness peer only.',
  ),
];

const CLOT_PANEL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=da948ef3-3709-4bfc-9d17-f6f1ea325343';
const POWDER_SPRAY_PANEL =
  'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=163996c6-af54-21ac-e063-6394a90ac05c';
const DEO_PANEL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0bee54eb-df2f-15fe-e063-6294a90a2fd2';
const LIQUID_PANEL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d6eb3b78-405b-43e5-9db5-da671465eda1';
const DAILY_PANEL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9e8f9211-e85d-725a-e053-2995a90a09b3';
const JOCK_POWDER_PANEL =
  'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1300d84f-d7ff-ec57-e063-6294a90ae0de';
const CHAFING_PANEL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=07d7c883-1fa3-4786-905c-a1fab649765e';

const CLOT_FLAGS: IngredientFlag[] = [
  flag(CLOT_PANEL, 'Benzyl alcohol', 'limited', METH.benzyl),
  flag(CLOT_PANEL, 'Cetyl alcohol', 'cleared', METH.cetyl),
  flag(CLOT_PANEL, 'Cetyl esters wax', 'cleared', METH.cetylWax),
  flag(CLOT_PANEL, 'Octyldodecanol', 'limited', METH.octyl),
  flag(CLOT_PANEL, 'Polysorbate 60', 'moderate', METH.polysorbate),
  flag(CLOT_PANEL, 'Sorbitan monostearate', 'limited', METH.sorbitan),
  flag(CLOT_PANEL, 'Stearyl alcohol', 'cleared', METH.cetyl),
  flag(CLOT_PANEL, 'Water', 'cleared', METH.water),
];

const POWDER_SPRAY_FLAGS: IngredientFlag[] = [
  flag(POWDER_SPRAY_PANEL, 'Hydroxypropyl cellulose', 'cleared', METH.hpc),
  flag(POWDER_SPRAY_PANEL, 'Isobutane', 'limited', METH.isobutane),
  flag(POWDER_SPRAY_PANEL, 'Kaolin', 'cleared', METH.kaolin),
  flag(POWDER_SPRAY_PANEL, 'Magnesium stearate', 'cleared', METH.magStearate),
  flag(POWDER_SPRAY_PANEL, 'SD alcohol 40-B', 'limited', METH.sd),
  flag(POWDER_SPRAY_PANEL, 'Stearalkonium hectorite', 'limited', METH.hectorite),
  flag(POWDER_SPRAY_PANEL, 'Zea mays (corn) starch', 'cleared', METH.corn),
];

const DEO_FLAGS: IngredientFlag[] = [
  flag(DEO_PANEL, 'Fragrance', 'limited', METH.fragrance),
  ...POWDER_SPRAY_FLAGS.map((item) =>
    flag(DEO_PANEL, item.name, item.riskLevel, (item.source ?? '').split('; ').slice(1).join('; ')),
  ),
];

const LIQUID_FLAGS: IngredientFlag[] = [
  flag(LIQUID_PANEL, 'Dimethyl ether', 'limited', METH.dimethyl),
  flag(LIQUID_PANEL, 'Polyoxyl 15 hydroxystearate', 'limited', METH.polyoxyl15),
  flag(LIQUID_PANEL, 'SD alcohol 40-B', 'limited', METH.sd),
];

const DAILY_FLAGS: IngredientFlag[] = [
  flag(DAILY_PANEL, 'Benzethonium chloride', 'limited', METH.benzethonium),
  flag(DAILY_PANEL, 'Corn starch', 'cleared', METH.corn),
  flag(DAILY_PANEL, 'Kaolin', 'cleared', METH.kaolin),
  flag(DAILY_PANEL, 'Sodium bicarbonate', 'cleared', METH.bicarb),
];

const JOCK_POWDER_FLAGS: IngredientFlag[] = [
  flag(JOCK_POWDER_PANEL, 'Benzethonium chloride', 'limited', METH.benzethonium),
  flag(JOCK_POWDER_PANEL, 'Corn starch', 'cleared', METH.corn),
  flag(JOCK_POWDER_PANEL, 'Kaolin', 'cleared', METH.kaolin),
  flag(JOCK_POWDER_PANEL, 'Sodium bicarbonate', 'cleared', METH.bicarb),
  flag(JOCK_POWDER_PANEL, 'Zinc oxide', 'cleared', METH.zinc),
];

const CHAFING_FLAGS: IngredientFlag[] = [
  flag(CHAFING_PANEL, 'Cyclomethicone', 'limited', METH.cyclo),
  flag(CHAFING_PANEL, 'Dimethicone', 'cleared', METH.dimethicone),
  flag(CHAFING_PANEL, 'Dimethicone/vinyl dimethicone crosspolymer', 'limited', METH.crosspolymer),
  flag(CHAFING_PANEL, 'Silica dimethyl silylate', 'limited', METH.silicaSilylate),
  flag(CHAFING_PANEL, 'Vinyl dimethicone/methicone silsesquioxane crosspolymer', 'limited', METH.silsesquioxane),
];

const CLOTRIMAZOLE = [{ name: 'Clotrimazole', strength: '1%' }];
const MICONAZOLE = [{ name: 'Miconazole nitrate', strength: '2%' }];

export const BATCH186_KYR6C_ANTIFUNGAL_HELD: RatingRecord[] = [
  {
    id: 'lotrimin-b186-af-cream-30',
    productName: "Lotrimin AF Athlete's Foot Cream (1.1 oz)",
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100594198',
    formulaId: 'lotrimin-b186-clotrimazole',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: CLOTRIMAZOLE,
    inactiveIngredients: CLOT_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid da948ef3 is Lotrimin clotrimazole cream. The 30 g tube is NDC 11523-0963-1. Inactive ingredients: benzyl alcohol, cetyl alcohol, cetyl esters wax, octyldodecanol, polysorbate 60, sorbitan monostearate, stearyl alcohol, water. Do not use on children under 2 years of age unless directed by a doctor. 30 g is the 1.1 oz tube. Target opened Lotrimin Antifungal Cream Athletes Foot Treatment, 1.1 oz, clotrimazole 1%, with the page primary barcode 041100594198. This is not the Ultra 1.1 oz cream.',
    ],
  },
  {
    id: 'lotrimin-b186-jock-cream-12',
    productName: 'Lotrimin AF Jock Itch Cream (0.42 oz)',
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100594167',
    formulaId: 'lotrimin-b186-clotrimazole',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: CLOTRIMAZOLE,
    inactiveIngredients: CLOT_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid f9536683 is Lotrimin AF Jock Itch clotrimazole cream. The carton says NET WT 12 g (0.42 oz). The inactive line matches the athlete\'s foot clotrimazole cream. Do not use on children under 2 years of age unless directed by a doctor. Target opened Lotrimin Antifungal Cream Jock Itch Antifungal Treatment, 0.42 oz, and the page prints the same inactive line. The page primary barcode is 041100594167.',
    ],
  },
  {
    id: 'lotrimin-b186-ringworm-cream-12',
    productName: 'Lotrimin AF Ringworm Cream (0.42 oz)',
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100594174',
    formulaId: 'lotrimin-b186-clotrimazole',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: CLOTRIMAZOLE,
    inactiveIngredients: CLOT_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid b584e17f is Lotrimin AF ringworm clotrimazole cream. The carton says NET WT 12 g (0.42 oz). The inactive line matches the athlete\'s foot clotrimazole cream. Do not use on children under 2 years of age unless directed by a doctor. Target opened Lotrimin Antifungal Cream for Ringworm Care, 0.42 oz, clotrimazole 1%, and the page primary barcode is 041100594174.',
    ],
  },
  {
    id: 'lotrimin-b186-liquid-spray-133',
    productName: "Lotrimin AF Athlete's Foot Liquid Spray (4.6 oz)",
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100407887',
    formulaId: 'lotrimin-b186-liquid-spray',
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: MICONAZOLE,
    inactiveIngredients: LIQUID_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid d6eb3b78 is Lotrimin AF antifungal liquid spray, miconazole nitrate 2%. The 133 g can is NET WT 133 g (4.6 oz), NDC 11523-4327-1. Inactive ingredients: dimethyl ether, polyoxyl 15 hydroxystearate, SD alcohol 40-B (16.5% v/v). Do not use on children under 2 years of age unless directed by a doctor. Target opened Lotrimin Antifungal Athlete\'s Foot Liquid Spray with 2% Miconazole Nitrate, 4.6 oz, and the page primary barcode is 041100407887.',
    ],
  },
  {
    id: 'lotrimin-b186-af-powder-spray-133',
    productName: "Lotrimin AF Athlete's Foot Powder Spray (4.6 oz)",
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100599827',
    formulaId: 'lotrimin-b186-powder-spray',
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: MICONAZOLE,
    inactiveIngredients: POWDER_SPRAY_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 163996c6 is Lotrimin AF antifungal powder spray, talc free, miconazole nitrate 2%. The 133 g can is NET WT 133 g (4.6 oz), NDC 11523-0134-1. Inactive ingredients: hydroxypropyl cellulose, isobutane, kaolin, magnesium stearate, SD alcohol 40-B (8% w/w), stearalkonium hectorite, zea mays (corn) starch. Do not use on children under 2 years of age unless directed by a doctor. Target opened Lotrimin Spray Powder, 4.6 oz. The page title and bullets are the powder spray, and the page primary barcode is 041100599827. The liquid spray is a different Target page and a different barcode.',
    ],
  },
  {
    id: 'lotrimin-b186-jock-powder-spray-133',
    productName: 'Lotrimin AF Jock Itch Powder Spray (4.6 oz)',
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100599834',
    formulaId: 'lotrimin-b186-powder-spray',
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: MICONAZOLE,
    inactiveIngredients: POWDER_SPRAY_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 0c53cf0f is Lotrimin AF jock itch powder spray, talc free, miconazole nitrate 2%. The 133 g can is NET WT 133 g (4.6 oz), NDC 11523-0133-1. The inactive line matches the athlete\'s foot powder spray. The panel spelling magnseium stearate is magnesium stearate. Do not use on children under 2 years of age unless directed by a doctor. Target opened Lotrimin AF Jock Itch Antifungal Powder Spray, 4.6 oz, miconazole nitrate, and the page primary barcode is 041100599834.',
    ],
  },
  {
    id: 'lotrimin-b186-deo-powder-spray-133',
    productName: 'Lotrimin AF Deodorant Powder Spray (4.6 oz)',
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100600004',
    formulaId: 'lotrimin-b186-deo-spray',
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: MICONAZOLE,
    inactiveIngredients: DEO_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 0bee54eb is Lotrimin AF deodorant powder spray, talc free, miconazole nitrate 2%. The 133 g can is NET WT 133 g (4.6 oz), NDC 11523-0135-1. Inactive ingredients: fragrance, hydroxypropyl cellulose, isobutane, kaolin, magnesium stearate, SD alcohol 40-B (8% v/v), stearalkonium hectorite, zea mays (corn) starch. Do not use on children under 2 years of age unless directed by a doctor. Target opened Lotrimin Deodorant Spray Powder, 4.6 oz, miconazole nitrate 2%, and the page primary barcode is 041100600004.',
    ],
  },
  {
    id: 'lotrimin-b186-daily-powder-90',
    productName: 'Lotrimin AF Daily Prevention Powder (3 oz)',
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100587299',
    formulaId: 'lotrimin-b186-daily-powder',
    audience: ADULT,
    minAge: 2,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Tolnaftate', strength: '1%' }],
    inactiveIngredients: DAILY_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 9e8f9211 is Lotrimin Daily Prevention medicated foot powder, tolnaftate 1%. The 90 g bottle is NET WT 90 g (3 oz), NDC 11523-0011-1. Inactive ingredients: benzethonium chloride, corn starch, kaolin, sodium bicarbonate. Do not use on children under 2 years of age unless directed by a doctor. Target opened Lotrimin Daily Prevention Antifungal Treatment Powder, 3 oz. The page title says Miconazole. The drug facts on that same page say tolnaftate 1%. The page primary barcode is 041100587299.',
    ],
  },
  {
    id: 'lotrimin-b186-jock-powder-177',
    productName: 'Lotrimin AF Jock Itch Powder (6.25 oz)',
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100600462',
    formulaId: 'lotrimin-b186-jock-powder',
    audience: ADULT,
    minAge: 2,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: MICONAZOLE,
    inactiveIngredients: JOCK_POWDER_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1300d84f is Lotrimin AF jock itch medicated powder, miconazole nitrate 2%. The bottle is NET WT 177 g (6.25 oz), NDC 11523-0150-1. Inactive ingredients: benzethonium chloride, corn starch, kaolin, sodium bicarbonate, zinc oxide. Do not use on children under 2 years of age unless directed by a doctor. Amazon opened Lotrimin Antifungal Jock Itch Medicated Powder, 6.25 oz bottle, at $12.61 with Add to cart. Product details on that page label UPC 041100600462.',
    ],
  },
  {
    id: 'monistat-b186-chafing-42',
    productName: 'Monistat Care Chafing Relief Powder Gel (1.5 oz)',
    brand: 'Monistat',
    category: FIRST_AID,
    barcode: '363736447205',
    formulaId: 'monistat-b186-chafing',
    audience: ADULT,
    form: 'gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Dimethicone', strength: '1.2%' }],
    inactiveIngredients: CHAFING_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 07d7c883 is Monistat Care Chafing Relief Powder Gel, dimethicone 1.2% skin protectant. The tube is NET WT 1.5 oz (42 g), NDC 63736-031-01. Inactive ingredients: cyclomethicone, dimethicone, dimethicone/vinyl dimethicone crosspolymer, silica dimethyl silylate, vinyl dimethicone/methicone silsesquioxane crosspolymer. The panel does not name a minimum age. Target opened Monistat Care Feminine Chafing Relief Powder Gel, 1.5 oz, dimethicone 1.2%, and the page primary barcode is 363736447205.',
    ],
  },
];

const ROWS = BATCH186_KYR6C_ANTIFUNGAL_HELD;

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  const levels = record.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 10) throw new Error(`batch186 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch186 duplicate id');

for (const record of ROWS) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch186 upc ${record.id}`);
  if (record.honestNote) throw new Error(`batch186 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch186 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch186 blank source ${ingredient.name}`);
  }
  if (record.verdict !== expectedVerdict(record)) throw new Error(`batch186 verdict ${record.id}`);
}
