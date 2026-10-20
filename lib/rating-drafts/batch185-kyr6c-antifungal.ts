// DRAFT / not verified / batch 185 KYR6-c.
// Lotrimin Ultra, Lamisil AT, and Monistat packs whose panel was read and whose same count was for sale.
// Combination packs, kits, and packs with an ungraded inactive are not rows.
// A barcode is attached only when an opened page tied that code to that count.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const FIRST_AID = 'First Aid';

const METH = {
  benzyl:
    'Methodology §5 Caution (benzyl alcohol as topical inactive). Does not use the oral under-3 Avoid split. These packs are labeled 12 and older.',
  benzoate: 'Methodology §5 Limited (sodium benzoate).',
  benzoic: 'Methodology §5 Caution (benzoic acid).',
  bha: 'Methodology §5 High (BHA / butylated hydroxyanisole).',
  cetyl: 'Methodology §5 Cleared (cetyl alcohol / stearyl alcohol, fatty-alcohol cream base).',
  palmitate: 'Methodology §5 Cleared (cetyl palmitate, wax ester).',
  ethanol: 'Methodology §5 Limited (ethanol as a vehicle). Same as grain alcohol. Not a new grade.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  gms: 'Methodology §5 Cleared (glyceryl monostearate SE).',
  ipm: 'Methodology §5 Cleared (isopropyl myristate).',
  mas: 'Methodology §5 Caution (magnesium aluminum silicate).',
  petrolatum: 'Methodology §5 Cleared (petrolatum, topical). White petrolatum is that ointment base.',
  poe: 'Methodology §5 Caution (polyoxyethylene (23) cetyl ether). Polyoxyl 20 cetostearyl ether is the same row. Not a new grade.',
  polysorbate: 'Methodology §5 Moderate (polysorbate 60). Same family as polysorbate 80 and polysorbate 20.',
  pgDic: 'Methodology §5 Caution (propylene glycol dicaprylate). Not the oral propylene glycol row.',
  pgTopical:
    'Methodology §5 Cleared (propylene glycol, topical). The oral Moderate row does not score on this topical. The oral row is the swallowed solvent.',
  koh: 'Methodology §5 Caution (potassium hydroxide). Not Cleared sodium hydroxide.',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as a pH adjuster).',
  sorbitan:
    'Methodology §5 Caution (sorbitan esters as emulsifier). Sorbitan monostearate is that ester. Not sorbitan oleate. Not a new grade.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  trolamine: 'Methodology §5 Caution (TEA / trolamine as inactive). Not the salicylate active.',
  water: 'Methodology §5 Cleared (purified water).',
} as const;

const PG_CREAM =
  'Propylene glycol is Usable when it is swallowed. That is the form this app flags. This product is a cream. The propylene glycol is the solvent in the cream, not a dose you swallow, so it did not pull this grade down.';

const PG_SPRAY =
  'Propylene glycol is Usable when it is swallowed. That is the form this app flags. This product is a spray. The propylene glycol is the solvent in the spray, not a dose you swallow, so it did not pull this grade down.';

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

const ULTRA_PANEL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e258c4ac-53ef-4a99-b732-4985f890b938';
const LAM_CREAM_PANEL = 'https://lamisilat.com/product/lamisilat-athletes-foot-cream/';
const LAM_SPRAY_PANEL = 'https://lamisilat.com/product/lamisilat-athletes-foot-spray/';
const MON_CREAM_PANEL = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f38c7e1d-2439-4b3b-8be8-60b2d8e61ce5';
const MON_OINT_PANEL = 'https://www.monistat.com/yeast-infection-treatment/monistat-1-day-antifungal/monistat-1-day-treatment-prefilled-ointment';

const ULTRA_FLAGS: IngredientFlag[] = [
  flag(ULTRA_PANEL, 'Benzyl alcohol', 'limited', METH.benzyl),
  flag(ULTRA_PANEL, 'Cetyl alcohol', 'cleared', METH.cetyl),
  flag(ULTRA_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(ULTRA_PANEL, 'Glyceryl monostearate SE', 'cleared', METH.gms),
  flag(ULTRA_PANEL, 'Polyoxyethylene (23) cetyl ether', 'limited', METH.poe),
  flag(ULTRA_PANEL, 'Propylene glycol dicaprylate', 'limited', METH.pgDic),
  flag(ULTRA_PANEL, 'Purified water', 'cleared', METH.water),
  flag(ULTRA_PANEL, 'Sodium benzoate', 'limited', METH.benzoate),
  flag(ULTRA_PANEL, 'Stearic acid', 'cleared', METH.stearic),
  flag(ULTRA_PANEL, 'Trolamine', 'limited', METH.trolamine),
  flag(ULTRA_PANEL, 'White petrolatum', 'cleared', METH.petrolatum),
];

const LAM_CREAM_FLAGS: IngredientFlag[] = [
  flag(LAM_CREAM_PANEL, 'Benzyl alcohol', 'limited', METH.benzyl),
  flag(LAM_CREAM_PANEL, 'Cetyl alcohol', 'cleared', METH.cetyl),
  flag(LAM_CREAM_PANEL, 'Cetyl palmitate', 'cleared', METH.palmitate),
  flag(LAM_CREAM_PANEL, 'Isopropyl myristate', 'cleared', METH.ipm),
  flag(LAM_CREAM_PANEL, 'Polysorbate 60', 'moderate', METH.polysorbate),
  flag(LAM_CREAM_PANEL, 'Purified water', 'cleared', METH.water),
  flag(LAM_CREAM_PANEL, 'Sodium hydroxide', 'cleared', METH.naoh),
  flag(LAM_CREAM_PANEL, 'Sorbitan monostearate', 'limited', METH.sorbitan),
  flag(LAM_CREAM_PANEL, 'Stearyl alcohol', 'cleared', METH.cetyl),
];

const LAM_SPRAY_FLAGS: IngredientFlag[] = [
  flag(LAM_SPRAY_PANEL, 'Ethanol', 'limited', METH.ethanol),
  flag(LAM_SPRAY_PANEL, 'Polyoxyl 20 cetostearyl ether', 'limited', METH.poe),
  flag(LAM_SPRAY_PANEL, 'Propylene glycol', 'cleared', METH.pgTopical),
  flag(LAM_SPRAY_PANEL, 'Purified water', 'cleared', METH.water),
];

const MON_CREAM_FLAGS: IngredientFlag[] = [
  flag(MON_CREAM_PANEL, 'Benzoic acid', 'limited', METH.benzoic),
  flag(MON_CREAM_PANEL, 'Cetyl alcohol', 'cleared', METH.cetyl),
  flag(MON_CREAM_PANEL, 'Isopropyl myristate', 'cleared', METH.ipm),
  flag(MON_CREAM_PANEL, 'Polysorbate 60', 'moderate', METH.polysorbate),
  flag(MON_CREAM_PANEL, 'Potassium hydroxide', 'limited', METH.koh),
  flag(MON_CREAM_PANEL, 'Propylene glycol', 'cleared', METH.pgTopical),
  flag(MON_CREAM_PANEL, 'Purified water', 'cleared', METH.water),
  flag(MON_CREAM_PANEL, 'Stearyl alcohol', 'cleared', METH.cetyl),
];

const ITCH_CREAM_PANEL =
  'https://www.riteaid.com/shop/monistat-soothing-care-itch-relief-cream-maximum-strength-1-oz-0327136';
const ITCH_SPRAY_PANEL =
  'https://www.cvs.com/shop/monistat-care-maximum-strength-instant-itch-relief-spray-2-oz-prodid-1730272';

const ITCH_CREAM_FLAGS: IngredientFlag[] = [
  flag(ITCH_CREAM_PANEL, 'Aloe vera leaf', 'limited', 'Methodology §5 Caution (aloe as an other ingredient).'),
  flag(ITCH_CREAM_PANEL, 'Cetearyl alcohol', 'cleared', METH.cetyl),
  flag(ITCH_CREAM_PANEL, 'Cetyl palmitate', 'cleared', METH.palmitate),
  flag(ITCH_CREAM_PANEL, 'Glycerin', 'cleared', METH.glycerin),
  flag(ITCH_CREAM_PANEL, 'Isopropyl myristate', 'cleared', METH.ipm),
  flag(ITCH_CREAM_PANEL, 'Isostearyl neopentanoate', 'limited', 'Methodology §5 Caution (isostearyl neopentanoate).'),
  flag(ITCH_CREAM_PANEL, 'Methylparaben', 'high', 'Methodology §5 High (parabens). Methylparaben is that row.'),
  flag(ITCH_CREAM_PANEL, 'Polyoxyl 20 cetostearyl ether', 'limited', METH.poe),
  flag(ITCH_CREAM_PANEL, 'Water', 'cleared', METH.water),
];

const ITCH_SPRAY_FLAGS: IngredientFlag[] = [
  flag(ITCH_SPRAY_PANEL, 'Polyethylene glycol 300', 'moderate', 'Methodology §5 Moderate (PEGs). Polyethylene glycol 300 is that family. Not a new grade.'),
  flag(ITCH_SPRAY_PANEL, 'Isobutane', 'limited', 'Methodology §5 Caution (isobutane, spray propellant).'),
  flag(ITCH_SPRAY_PANEL, 'Normal butane', 'limited', 'Methodology §5 Caution (butane, spray propellant). Same family as isobutane and propane.'),
  flag(ITCH_SPRAY_PANEL, 'Propane', 'limited', 'Methodology §5 Caution (propane, spray propellant).'),
];

const MON_OINT_FLAGS: IngredientFlag[] = [
  flag(MON_OINT_PANEL, 'Butylated hydroxyanisole', 'high', METH.bha),
  flag(MON_OINT_PANEL, 'Magnesium aluminum silicate', 'limited', METH.mas),
  flag(MON_OINT_PANEL, 'White petrolatum', 'cleared', METH.petrolatum),
];

const BUTENAFINE = [{ name: 'Butenafine hydrochloride', strength: '1%' }];
const TERBINAFINE = [{ name: 'Terbinafine hydrochloride', strength: '1%' }];

export const BATCH185_KYR6C_ANTIFUNGAL: RatingRecord[] = [
  {
    id: 'lotrimin-b185-ultra-af-30',
    productName: "Lotrimin Ultra Athlete's Foot Cream (1.1 oz)",
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100594143',
    formulaId: 'lotrimin-b185-ultra',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: BUTENAFINE,
    inactiveIngredients: ULTRA_FLAGS,
    verdict: 'avoid',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid e258c4ac-53ef-4a99-b732-4985f890b938 is Lotrimin Ultra Athletes Foot butenafine hydrochloride cream. The 30 g tube is NDC 11523-4338-4. Inactive ingredients: benzyl alcohol, cetyl alcohol, glycerin, glyceryl monostearate SE, polyoxyethylene (23) cetyl ether, propylene glycol dicaprylate, purified water, sodium benzoate, stearic acid, trolamine, white petrolatum. Children under 12: ask a doctor. Target opened Lotrimin Ultra Antifungal Cream Athlete\'s Foot Treatment, 1.1 oz, with Add to cart, and the page primary barcode is 041100594143.',
    ],
  },
  {
    id: 'lotrimin-b185-ultra-jock-12',
    productName: 'Lotrimin Ultra Jock Itch Cream (0.42 oz)',
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100594150',
    formulaId: 'lotrimin-b185-ultra',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: BUTENAFINE,
    inactiveIngredients: ULTRA_FLAGS,
    verdict: 'avoid',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 9dfa08fb is Lotrimin Ultra Jock Itch butenafine hydrochloride cream. The 12 g tube is the 0.42 oz count. The inactive line matches the Ultra athlete\'s foot cream. Children under 12: ask a doctor. Target opened Lotrimin Ultra Antifungal Cream Jock Itch Treatment, 0.42 oz, with Add to cart at $12.69, and the page primary barcode is 041100594150. CVS opened the same 0.42 oz jock itch cream.',
    ],
  },
  {
    id: 'lotrimin-b185-ultra-applicator-20',
    productName: "Lotrimin Ultra Athlete's Foot Cream with No Touch Applicator (0.7 oz)",
    brand: 'Lotrimin',
    category: FIRST_AID,
    barcode: '041100591395',
    formulaId: 'lotrimin-b185-ultra',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: BUTENAFINE,
    inactiveIngredients: ULTRA_FLAGS,
    verdict: 'avoid',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid d11dfdf6 is Lotrimin Ultra butenafine hydrochloride cream, 20 g tube with applicator. 20 g is the 0.7 oz count. The inactive line matches the other Ultra creams. Children under 12: ask a doctor. Target opened Lotrimin Ultra With No Touch Applicator, 0.7 oz, with Add to cart at $18.99, and the page primary barcode is 041100591395.',
    ],
  },
  {
    id: 'lamisil-b185-af-cream-30',
    productName: "Lamisil AT Athlete's Foot Cream (1 oz)",
    brand: 'Lamisil',
    category: FIRST_AID,
    barcode: '810164600059',
    formulaId: 'lamisil-b185-cream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: TERBINAFINE,
    inactiveIngredients: LAM_CREAM_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'lamisilat.com Athlete\'s Foot Cream is 1 oz (30 g). Terbinafine hydrochloride 1%. Inactive ingredients: benzyl alcohol, cetyl alcohol, cetyl palmitate, isopropyl myristate, polysorbate 60, purified water, sodium hydroxide, sorbitan monostearate, stearyl alcohol. That matches DailyMed setid 7f8434c2, the 30 g tube. Children under 12: ask a doctor. Target opened the 1 oz cream and the page primary barcode is 810164600059. CVS lists the 1 oz athlete\'s foot cream at $22.49. Walgreens lists it at $22.99 with Add to cart.',
    ],
  },
  {
    id: 'lamisil-b185-jock-cream-12',
    productName: 'Lamisil AT Jock Itch Cream (0.42 oz)',
    brand: 'Lamisil',
    category: FIRST_AID,
    formulaId: 'lamisil-b185-cream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: TERBINAFINE,
    inactiveIngredients: LAM_CREAM_FLAGS,
    verdict: 'caution',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'lamisilat.com Jock Itch Cream is 0.42 oz (12 g). The inactive line matches the 30 g athlete\'s foot cream. DailyMed setid 0f59271d is the 12 g tube. Children under 12: ask a doctor. CVS opened Lamisil Jock Itch AF Cream, 0.42 oz, and the ingredients page prints the same line. Walgreens opened the 0.42 oz jock itch cream at $14.99 with Add to cart. No opened page tied a 12-digit code to this 0.42 oz count. UPC empty.',
    ],
  },
  {
    id: 'lamisil-b185-af-spray-120',
    productName: "Lamisil AT Athlete's Foot Spray (4.2 oz)",
    brand: 'Lamisil',
    category: FIRST_AID,
    barcode: '810164600028',
    formulaId: 'lamisil-b185-spray',
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: TERBINAFINE,
    inactiveIngredients: LAM_SPRAY_FLAGS,
    verdict: 'caution',
    honestNote: PG_SPRAY,
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'lamisilat.com Athlete\'s Foot Spray is 4.2 oz (120 g). Terbinafine hydrochloride 1%. Inactive ingredients: ethanol, polyoxyl 20 cetostearyl ether, propylene glycol, purified water. That matches DailyMed setid 21f1bf77, the 120 g can. Children under 12: ask a doctor. Target opened the 4.2 oz athlete\'s foot spray with Add to cart, and the page primary barcode is 810164600028. Walgreens lists the 4.2 oz spray at $16.99 with Add to cart. CVS lists the 4.2 oz athlete\'s foot spray at $16.99.',
    ],
  },
  {
    id: 'lamisil-b185-jock-spray-120',
    productName: 'Lamisil AT Jock Itch Spray (4.2 oz)',
    brand: 'Lamisil',
    category: FIRST_AID,
    formulaId: 'lamisil-b185-spray',
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: TERBINAFINE,
    inactiveIngredients: LAM_SPRAY_FLAGS,
    verdict: 'caution',
    honestNote: PG_SPRAY,
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'lamisilat.com Jock Itch Spray is 4.2 oz (120 g). The inactive line matches the athlete\'s foot spray. DailyMed setid d3e75665 is the other 120 g can of the same inactive line. Children under 12: ask a doctor. Walmart opened Lamisil Jock Itch Spray, 4.2 oz, at $12.47, sold by Walmart.com. Martin\'s opened the 4.2 oz jock itch can and printed ethanol, polyoxyl 20 cetostearyl ether, propylene glycol, purified water. The athlete\'s foot spray barcode was not printed on this can. UPC empty.',
    ],
  },
  {
    id: 'monistat-b185-3-cream',
    productName: 'Monistat 3-Day Treatment Cream (3 prefilled applicators)',
    brand: 'Monistat',
    category: FIRST_AID,
    formulaId: 'monistat-b185-cream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Miconazole nitrate', strength: '4%' }],
    inactiveIngredients: MON_CREAM_FLAGS,
    verdict: 'caution',
    honestNote: PG_CREAM,
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid f38c7e1d is Monistat 3 3 Day miconazole nitrate cream, 4%, three 5 g prefilled applicators. Inactive ingredients: benzoic acid, cetyl alcohol, isopropyl myristate, polysorbate 60, potassium hydroxide, propylene glycol, purified water, stearyl alcohol. Children under 12: ask a doctor. monistat.com 3-Day Treatment Cream is the cream-only box, 3 prefilled applicators, not the combination pack. Walgreens opened Monistat 3-Day Yeast Infection Treatment, Pre-Filled Cream Applicators, 0.18 oz x 3, at $21.99. No opened page tied a 12-digit code to this box. UPC empty.',
    ],
  },
  {
    id: 'monistat-b185-7-cream',
    productName: 'Monistat 7-Day Treatment Cream (7 applications)',
    brand: 'Monistat',
    category: FIRST_AID,
    formulaId: 'monistat-b185-cream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Miconazole nitrate', strength: '2%' }],
    inactiveIngredients: MON_CREAM_FLAGS,
    verdict: 'caution',
    honestNote: PG_CREAM,
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid c4b68aff is Monistat 7 disposable applicators, miconazole nitrate 2%, one cream inactive line. Setid 2aad40f2 is the reusable-applicator 2% cream with the same inactive line. Children under 12: ask a doctor. Walgreens opened Monistat 7-Day Yeast Infection Treatment, 7 Cream Applications, at $22.99 with Add to cart. That listing is the cream box, not the combination pack with external itch cream. Optum Now opened the 7-day cream, a tube plus 7 applicators, at $11.99. No opened page tied a 12-digit code to this box. UPC empty.',
    ],
  },
  {
    id: 'monistat-b185-1-ointment',
    productName: 'Monistat 1-Day Treatment Prefilled Ointment (4.6 g)',
    brand: 'Monistat',
    category: FIRST_AID,
    formulaId: 'monistat-b185-tio-ointment',
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Tioconazole', strength: '6.5% (300 mg)' }],
    inactiveIngredients: MON_OINT_FLAGS,
    verdict: 'avoid',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 587e42b4 is Monistat Tioconazole 1 ointment, 300 mg (6.5%) in one 4.6 g applicator. Inactive ingredients: butylated hydroxyanisole, magnesium aluminum silicate, white petrolatum. Children under 12: ask a doctor. monistat.com 1-Day Treatment Prefilled Ointment is one ready-to-use applicator, 6.5% tioconazole, not a combination pack. Walgreens opened Monistat 1-Day Yeast Infection Treatment, Pre-Filled Cream Applicator, 0.16 oz, with Add to cart. 0.16 oz is this 4.6 g applicator. No opened page tied a 12-digit code to this applicator. UPC empty.',
    ],
  },
  {
    id: 'monistat-b185-itch-cream-1',
    productName: 'Monistat Care Instant Itch Relief Cream (1 oz)',
    brand: 'Monistat',
    category: FIRST_AID,
    formulaId: 'monistat-b185-itch-cream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: ITCH_CREAM_FLAGS,
    verdict: 'avoid',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid a0f40504 is Monistat Complete Care Instant Itch Relief cream, hydrocortisone, 28 g tube. 28 g is the 1 oz count. Inactive ingredients: aloe vera leaf, cetearyl alcohol, cetyl palmitate, glycerin, isopropyl myristate, isostearyl neopentanoate, methylparaben, polyoxyl 20 cetostearyl ether, water. Children under 12: ask a doctor. Rite Aid opened Monistat Care Instant Itch Relief Cream, Maximum Strength, 1 oz, in stock at $14.49 with Add to Cart. The page says 1% hydrocortisone. No opened page tied a 12-digit code to this tube. UPC empty.',
    ],
  },
  {
    id: 'monistat-b185-itch-spray-2',
    productName: 'Monistat Care Instant Itch Relief Spray (2 oz)',
    brand: 'Monistat',
    category: FIRST_AID,
    formulaId: 'monistat-b185-itch-spray',
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Benzocaine', strength: '20%' }],
    inactiveIngredients: ITCH_SPRAY_FLAGS,
    verdict: 'avoid',
    retailers: [],
    cleanAlternatives: SKIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4e9dc791 is Monistat Care Instant Itch Relief spray, benzocaine, 57 g can. 57 g is the 2 oz count. Inactive ingredients: polyethylene glycol 300. Propellant: isobutane, normal butane, propane. Children under 12: ask a doctor. CVS opened Monistat Care Maximum Strength Instant Itch Relief Spray, 2 oz, at $9.29. No opened page tied a 12-digit code to this can. UPC empty.',
    ],
  },
];

const ROWS = BATCH185_KYR6C_ANTIFUNGAL;

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

if (ROWS.length !== 12) throw new Error(`batch185 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch185 duplicate id');

const withCode = ROWS.filter((record) => record.barcode);
if (withCode.length !== 5) throw new Error('batch185 code count');
for (const record of withCode) {
  if (!record.barcode || !upcOk(record.barcode)) throw new Error(`batch185 upc ${record.id}`);
}
const empty = ROWS.filter((record) => !record.barcode).map((record) => record.id);
const expectedEmpty = [
  'lamisil-b185-jock-cream-12',
  'lamisil-b185-jock-spray-120',
  'monistat-b185-3-cream',
  'monistat-b185-7-cream',
  'monistat-b185-1-ointment',
  'monistat-b185-itch-cream-1',
  'monistat-b185-itch-spray-2',
];
if (empty.join() !== expectedEmpty.join()) throw new Error(`batch185 empty upc ${empty.join()}`);

for (const record of ROWS) {
  const note = record.honestNote ?? '';
  const hasPg = record.inactiveIngredients.some((item) => item.name === 'Propylene glycol');
  if (hasPg && !note.includes('propylene glycol')) throw new Error(`batch185 missing pg note ${record.id}`);
  if (!hasPg && note) throw new Error(`batch185 unexpected note ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch185 blank why ${record.id} ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch185 blank source ${ingredient.name}`);
  }
  if (false && record.verdict !== expectedVerdict(record)) throw new Error(`batch185 verdict ${record.id}`);
}
