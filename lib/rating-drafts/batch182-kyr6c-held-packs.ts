// DRAFT / not verified / batch 182 KYR6-c.
// Preparation H, Orajel, and Abreva packs whose panel was read and whose count was for sale.
// Orajel 4X gel, 4X cream, and the Rescue Relief pen are not rows. Menthol is under Active.
// Ocean saline is not a row. No opened consumer page showed a single count with a price.
// Anbesol gel and liquid stay in batch181. Do not rewrite them.
// UPCs stay empty. Opened pages did not tie a 12-digit code to these counts.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const PAIN = 'Pain & Fever';

const METH = {
  aloe: 'Methodology §5 Caution (aloe as an other ingredient).',
  alcohol: 'Methodology §5 Limited (alcohol as a vehicle).',
  benzoate: 'Methodology §5 Caution (sodium benzoate / benzoic acid).',
  benzyl: 'Methodology §5 Caution (benzyl alcohol, general oral use).',
  bha: 'Methodology §5 High (BHA).',
  citrate: 'Methodology §5 Cleared (citric acid / citrate salt).',
  cocoa: 'Methodology §5 Cleared (cocoa butter as an ointment base).',
  cornOil: 'Methodology §5 Cleared (corn oil, not the gummy base).',
  decyl: 'Methodology §5 Caution (decyl glucoside). CIR says safe when the formula is non-irritating. This app does not have that formula. One level.',
  dye: 'Methodology §5 High (synthetic dyes).',
  edta: 'Methodology §5 Caution (edetate disodium). Not the Cleared trace disodium EDTA row.',
  gallate: 'Methodology §5 High (propyl gallate).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  gum: 'Methodology §5 Cleared (cellulose gum / xanthan gum).',
  hec: 'Methodology §5 Cleared (hydroxyethyl cellulose).',
  isobutane: 'Methodology §5 Caution (isobutane, spray propellant).',
  lanolin: 'Methodology §5 Caution (lanolin / lanolin alcohols).',
  malic: 'Methodology §5 Cleared (malic acid).',
  menthol: 'Methodology §5 Caution (menthol, inactive in a spray, a rinse, or a gel).',
  methylSal: 'Methodology §5 Caution (methyl salicylate, inactive). Named chemical.',
  mineralCaution: 'Methodology §5 Caution (mineral oil). Not the Cleared ointment occlusive.',
  mineralClear: 'Methodology §5 Cleared (paraffin + mineral oil as a topical ointment occlusive).',
  panthenol: 'Methodology §5 Cleared (panthenol). Dexpanthenol maps here.',
  paraben: 'Methodology §5 High (parabens).',
  phenoxy: 'Methodology §5 Caution (phenoxyethanol).',
  pgTopical: 'Methodology §5 Cleared (propylene glycol, topical).',
  poloxamer: 'Methodology §5 Caution (poloxamer 182 / 407). Poloxamer 338 maps here. Alias.',
  polysorbate: 'Methodology §5 Moderate (polysorbate).',
  polyoxyl: 'Methodology §5 Caution (polyoxyl lauryl ether / polyoxyl stearyl ether). Polyoxyl family.',
  pyro: 'Methodology §5 Caution (disodium pyrophosphate / tetrasodium pyrophosphate). Not the Cleared sodium phosphate filler.',
  saccharin: 'Methodology §5 Caution (sodium saccharin).',
  silica: 'Methodology §5 Limited (hydrated silica).',
  sorbitol: 'Methodology §5 Limited (sorbitol, oral).',
  starch: 'Methodology §5 Cleared (corn starch).',
  stearate: 'Methodology §5 Cleared (glyceryl monostearate).',
  stevia: 'Methodology §5 Caution (stevia leaf extract). Not the high-purity glycoside.',
  sucrose: 'Methodology §5 Caution (sucrose stearate / sucrose distearate).',
  tocopherol: 'Methodology §5 Cleared (tocopherols excipient).',
  tocopheryl: 'Methodology §5 Caution (tocopheryl acetate). Vitamin E acetate is this ester.',
  water: 'Methodology §5 Cleared (water / purified water).',
  wax: 'Methodology §5 Caution (white wax). Not beeswax.',
  thyme: 'Methodology §5 Caution (thyme oil as an other ingredient).',
  fatty: 'Methodology §5 Cleared (cetyl alcohol / stearyl alcohol).',
  betaine: 'Methodology §5 Caution (cocamidopropyl betaine). CIR says safe when the formula is non-irritating. This app does not have that formula. One level.',
  flavor: 'Methodology §5 Limited (natural flavor). Unnamed flavor.',
  sorbate: 'Methodology §5 Caution (potassium sorbate).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const PAIN_ALTS: CleanAlternative[] = [
  alt(
    'boiron-throatcalm-tablets',
    'No independently Clean conventional oral-pain match. Closest independently Clean oral peer is Boiron ThroatCalm (homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Different use; cleanliness peer only.',
  ),
];

const WIPES = 'Preparation H medicated wipes drug facts';
const OINTMENT = 'Preparation H ointment drug facts';
const CREAM = 'Preparation H Maximum Strength cream drug facts';
const SPRAY = 'Preparation H Rapid Relief spray drug facts';
const SUPP = 'Preparation H suppository drug facts';
const RINSE = 'Orajel Toothache Rinse drug facts';
const PASTE = 'Orajel kids anticavity toothpaste drug facts';
const ABREVA = 'Abreva docosanol cream drug facts';
const RAPID = 'Abreva Rapid Pain Relief drug facts';

const WIPE_FLAGS: IngredientFlag[] = [
  flag(WIPES, 'Aloe barbadensis leaf juice', 'limited', METH.aloe),
  flag(WIPES, 'Anhydrous citric acid', 'cleared', METH.citrate),
  flag(WIPES, 'Decyl glucoside', 'limited', METH.decyl),
  flag(WIPES, 'Glycerin', 'cleared', METH.glycerin),
  flag(WIPES, 'Phenoxyethanol', 'limited', METH.phenoxy),
  flag(WIPES, 'Potassium sorbate', 'limited', METH.sorbate),
  flag(WIPES, 'Propylene glycol', 'cleared', METH.pgTopical),
  flag(WIPES, 'Purified water', 'cleared', METH.water),
  flag(WIPES, 'Sodium benzoate', 'limited', METH.benzoate),
];

const OINTMENT_FLAGS: IngredientFlag[] = [
  flag(OINTMENT, 'Benzoic acid', 'limited', METH.benzoate),
  flag(OINTMENT, 'Butylated hydroxyanisole', 'high', METH.bha),
  flag(OINTMENT, 'Corn oil', 'cleared', METH.cornOil),
  flag(OINTMENT, 'Glycerin', 'cleared', METH.glycerin),
  flag(OINTMENT, 'Lanolin', 'limited', METH.lanolin),
  flag(OINTMENT, 'Lanolin alcohols', 'limited', METH.lanolin),
  flag(OINTMENT, 'Methylparaben', 'high', METH.paraben),
  flag(OINTMENT, 'Mineral oil', 'cleared', METH.mineralClear),
  flag(OINTMENT, 'Paraffin', 'cleared', METH.mineralClear),
  flag(OINTMENT, 'Propylparaben', 'high', METH.paraben),
  flag(OINTMENT, 'Purified water', 'cleared', METH.water),
  flag(OINTMENT, 'Thymus vulgaris (thyme) flower/leaf oil', 'limited', METH.thyme),
  flag(OINTMENT, 'Tocopherols excipient', 'cleared', METH.tocopherol),
  flag(OINTMENT, 'White wax', 'limited', METH.wax),
];

const CREAM_FLAGS: IngredientFlag[] = [
  flag(CREAM, 'Aloe barbadensis leaf extract', 'limited', METH.aloe),
  flag(CREAM, 'Anhydrous citric acid', 'cleared', METH.citrate),
  flag(CREAM, 'Butylated hydroxyanisole', 'high', METH.bha),
  flag(CREAM, 'Carboxymethylcellulose sodium', 'cleared', METH.gum),
  flag(CREAM, 'Cetyl alcohol', 'cleared', METH.fatty),
  flag(CREAM, 'Citric acid monohydrate', 'cleared', METH.citrate),
  flag(CREAM, 'Dexpanthenol', 'cleared', METH.panthenol),
  flag(CREAM, 'Edetate disodium', 'limited', METH.edta),
  flag(CREAM, 'Glyceryl monostearate', 'cleared', METH.stearate),
  flag(CREAM, 'Methylparaben', 'high', METH.paraben),
  flag(CREAM, 'Mineral oil', 'limited', METH.mineralCaution),
  flag(CREAM, 'Polyoxyl lauryl ether', 'limited', METH.polyoxyl),
  flag(CREAM, 'Polyoxyl stearyl ether', 'limited', METH.polyoxyl),
  flag(CREAM, 'Propyl gallate', 'high', METH.gallate),
  flag(CREAM, 'Propylene glycol', 'cleared', METH.pgTopical),
  flag(CREAM, 'Propylparaben', 'high', METH.paraben),
  flag(CREAM, 'Purified water', 'cleared', METH.water),
  flag(CREAM, 'Sodium benzoate', 'limited', METH.benzoate),
  flag(CREAM, 'Stearyl alcohol', 'cleared', METH.fatty),
  flag(CREAM, 'Tocopherols excipient', 'cleared', METH.tocopherol),
  flag(CREAM, 'Vitamin E acetate', 'limited', METH.tocopheryl),
  flag(CREAM, 'Xanthan gum', 'cleared', METH.gum),
];

const SPRAY_FLAGS: IngredientFlag[] = [
  flag(SPRAY, 'Aloe barbadensis leaf juice', 'limited', METH.aloe),
  flag(SPRAY, 'Citric acid', 'cleared', METH.citrate),
  flag(SPRAY, 'Disodium EDTA', 'limited', METH.edta),
  flag(SPRAY, 'Glycerin', 'cleared', METH.glycerin),
  flag(SPRAY, 'Isobutane', 'limited', METH.isobutane),
  flag(SPRAY, 'Malic acid', 'cleared', METH.malic),
  flag(SPRAY, 'Menthol', 'limited', METH.menthol),
  flag(SPRAY, 'Propyl gallate', 'high', METH.gallate),
  flag(SPRAY, 'Propylene glycol', 'cleared', METH.pgTopical),
  flag(SPRAY, 'SD alcohol 40-B', 'limited', METH.alcohol),
  flag(SPRAY, 'Sodium benzoate', 'limited', METH.benzoate),
  flag(SPRAY, 'Water', 'cleared', METH.water),
];

const SUPP_FLAGS: IngredientFlag[] = [
  flag(SUPP, 'Cocoa butter', 'cleared', METH.cocoa),
  flag(SUPP, 'Corn starch', 'cleared', METH.starch),
  flag(SUPP, 'Methylparaben', 'high', METH.paraben),
  flag(SUPP, 'Propylparaben', 'high', METH.paraben),
];

const RINSE_FLAGS: IngredientFlag[] = [
  flag(RINSE, 'Alcohol (4.1% by volume)', 'limited', METH.alcohol),
  flag(RINSE, 'Blue 1', 'high', METH.dye),
  flag(RINSE, 'Disodium pyrophosphate', 'limited', METH.pyro),
  flag(RINSE, 'Menthol', 'limited', METH.menthol),
  flag(RINSE, 'Methyl salicylate', 'limited', METH.methylSal),
  flag(RINSE, 'Poloxamer 338', 'limited', METH.poloxamer),
  flag(RINSE, 'Polysorbate 20', 'moderate', METH.polysorbate),
  flag(RINSE, 'Sodium benzoate', 'limited', METH.benzoate),
  flag(RINSE, 'Sodium saccharin', 'limited', METH.saccharin),
  flag(RINSE, 'Sorbitol', 'limited', METH.sorbitol),
  flag(RINSE, 'Tetrasodium pyrophosphate', 'limited', METH.pyro),
  flag(RINSE, 'Water', 'cleared', METH.water),
];

const PASTE_FLAGS: IngredientFlag[] = [
  flag(PASTE, 'Sorbitol', 'limited', METH.sorbitol),
  flag(PASTE, 'Water', 'cleared', METH.water),
  flag(PASTE, 'Hydrated silica', 'limited', METH.silica),
  flag(PASTE, 'Glycerin', 'cleared', METH.glycerin),
  flag(PASTE, 'Cellulose gum', 'cleared', METH.gum),
  flag(PASTE, 'Cocamidopropyl betaine', 'limited', METH.betaine),
  flag(PASTE, 'Stevia rebaudiana leaf extract', 'limited', METH.stevia),
  flag(PASTE, 'Natural flavor', 'limited', METH.flavor),
];

const ABREVA_FLAGS: IngredientFlag[] = [
  flag(ABREVA, 'Benzyl alcohol', 'limited', METH.benzyl),
  flag(ABREVA, 'Light mineral oil', 'limited', METH.mineralCaution),
  flag(ABREVA, 'Propylene glycol', 'cleared', METH.pgTopical),
  flag(ABREVA, 'Purified water', 'cleared', METH.water),
  flag(ABREVA, 'Sucrose distearate', 'limited', METH.sucrose),
  flag(ABREVA, 'Sucrose stearate', 'limited', METH.sucrose),
];

const RAPID_FLAGS: IngredientFlag[] = [
  flag(RAPID, 'Edetate disodium', 'limited', METH.edta),
  flag(RAPID, 'Hydroxyethyl cellulose', 'cleared', METH.hec),
  flag(RAPID, 'Menthol', 'limited', METH.menthol),
  flag(RAPID, 'Methylparaben', 'high', METH.paraben),
  flag(RAPID, 'Polysorbate 80', 'moderate', METH.polysorbate),
  flag(RAPID, 'Propylene glycol', 'cleared', METH.pgTopical),
  flag(RAPID, 'Propylparaben', 'high', METH.paraben),
  flag(RAPID, 'Trisodium citrate dihydrate', 'cleared', METH.citrate),
  flag(RAPID, 'Water', 'cleared', METH.water),
];

const OINTMENT_ACTIVES = [
  { name: 'Mineral oil', strength: '14%' },
  { name: 'Petrolatum', strength: '74.9%' },
  { name: 'Phenylephrine HCl', strength: '0.25%' },
];

const CREAM_ACTIVES = [
  { name: 'Glycerin', strength: '14.4%' },
  { name: 'Phenylephrine HCl', strength: '0.25%' },
  { name: 'Pramoxine HCl', strength: '1%' },
  { name: 'White petrolatum', strength: '15%' },
];

const FLUORIDE = [{ name: 'Sodium fluoride', strength: '0.24%' }];
const DOCOSANOL = [{ name: 'Docosanol', strength: '10%' }];

export const BATCH182_KYR6C_HELD_PACKS: RatingRecord[] = [
  {
    id: 'preph-b182-wipes-48',
    productName: 'Preparation H Medicated Wipes (48 count)',
    brand: 'Preparation H',
    category: PAIN,
    formulaId: 'preph-b182-wipes',
    audience: ADULT,
    minAge: 12,
    form: 'wipe',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Witch hazel', strength: '50%' }],
    inactiveIngredients: WIPE_FLAGS,
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Aloe barbadensis leaf juice, Decyl glucoside, Phenoxyethanol, Potassium sorbate, Sodium benzoate.',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid 8d9961f0-1ecf-d7fb-b6b4-856d636d68e1 is Preparation H Medicated Wipes. Active: witch hazel 50%. Inactive ingredients: aloe barbadensis leaf juice, anhydrous citric acid, decyl glucoside, glycerin, phenoxyethanol, potassium sorbate, propylene glycol, purified water, sodium benzoate. Adults use the wipe. Children under 12: ask a doctor. The package list includes 48 in one pouch. Target purchasable search listed Preparation H Maximum Strength formula Medicated Wipes, 48ct, tcin 14080245. No 12-digit UPC was printed on the pages that opened for this count.',
    ],
  },
  {
    id: 'preph-b182-ointment-1',
    productName: 'Preparation H Hemorrhoidal Ointment (1 oz)',
    brand: 'Preparation H',
    category: PAIN,
    formulaId: 'preph-b182-ointment',
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OINTMENT_ACTIVES,
    inactiveIngredients: OINTMENT_FLAGS,
    verdict: 'avoid',
    honestNote:
      'Corn oil is Not clean when it is the base of a gummy. That is the form this app flags. This product is a cream. The oil is in the cream, not in a gummy you chew, so it did not pull this grade down.',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid 507c08ab-a98b-33fe-e2ac-eb9b9a810d5a is Preparation H ointment. Actives: mineral oil 14%, petrolatum 74.9%, phenylephrine HCl 0.25%. Inactive ingredients: benzoic acid, butylated hydroxyanisole, corn oil, glycerin, lanolin, lanolin alcohols, methylparaben, mineral oil, paraffin, propylparaben, purified water, thymus vulgaris (thyme) flower/leaf oil, tocopherols excipient, white wax. The inactive line lists mineral oil on this ointment, so that line stays the Cleared ointment occlusive. Children under 12: ask a doctor. Package quantities include 28 g and 57 g. 28 g is 1 oz. Target purchasable search listed Preparation H Hemorrhoidal Ointment, 1oz, tcin 89790960. No 12-digit UPC was printed on the pages that opened for this count.',
    ],
  },
  {
    id: 'preph-b182-ointment-2',
    productName: 'Preparation H Hemorrhoidal Ointment (2 oz)',
    brand: 'Preparation H',
    category: PAIN,
    formulaId: 'preph-b182-ointment',
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OINTMENT_ACTIVES,
    inactiveIngredients: OINTMENT_FLAGS,
    verdict: 'avoid',
    honestNote:
      'Corn oil is Not clean when it is the base of a gummy. That is the form this app flags. This product is a cream. The oil is in the cream, not in a gummy you chew, so it did not pull this grade down.',
    retailers: ['Target'],
    sourcesGeneral: [
      'Same DailyMed ointment panel as the 1 oz. Package quantity 57 g is 2 oz. Target purchasable search listed Preparation H Hemorrhoidal Ointment, 2oz, tcin 15087998. The inactive line matches the 1 oz, so the formula is shared. No 12-digit UPC was printed on the pages that opened for this count.',
    ],
  },
  {
    id: 'preph-b182-cream-09',
    productName: 'Preparation H Maximum Strength Cream (0.9 oz)',
    brand: 'Preparation H',
    category: PAIN,
    formulaId: 'preph-b182-maxcream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: CREAM_ACTIVES,
    inactiveIngredients: CREAM_FLAGS,
    verdict: 'avoid',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid 7cc03d2e-e708-589a-d9bb-58ebbda989c0 is Preparation H Maximum Strength cream. Actives: glycerin 14.4%, phenylephrine HCl 0.25%, pramoxine HCl 1%, white petrolatum 15%. Inactive ingredients: aloe barbadensis leaf extract, anhydrous citric acid, butylated hydroxyanisole, carboxymethylcellulose sodium, cetyl alcohol, citric acid monohydrate, dexpanthenol, edetate disodium, glyceryl monostearate, methylparaben, mineral oil, polyoxyl lauryl ether, polyoxyl stearyl ether, propyl gallate, propylene glycol, propylparaben, purified water, sodium benzoate, stearyl alcohol, tocopherols excipient, vitamin E acetate, xanthan gum. Children under 12: ask a doctor. Package quantity 26 g is 0.9 oz. Target purchasable search listed Preparation H Multi-Symptom Relief Hemorrhoidal Cream with Aloe, 0.9oz, tcin 15087996. No 12-digit UPC was printed on the pages that opened for this count.',
    ],
  },
  {
    id: 'preph-b182-cream-18',
    productName: 'Preparation H Maximum Strength Cream (1.8 oz)',
    brand: 'Preparation H',
    category: PAIN,
    formulaId: 'preph-b182-maxcream',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: CREAM_ACTIVES,
    inactiveIngredients: CREAM_FLAGS,
    verdict: 'avoid',
    retailers: ['Target'],
    sourcesGeneral: [
      'Same DailyMed Maximum Strength cream panel as the 0.9 oz. Package quantity 51 g is 1.8 oz. Target purchasable search listed Preparation H Hemorrhoid Symptom Treatment Cream, 1.8 Oz, tcin 1006232839. The inactive line matches the 0.9 oz, so the formula is shared. No 12-digit UPC was printed on the pages that opened for this count.',
    ],
  },
  {
    id: 'preph-b182-spray-38',
    productName: 'Preparation H Rapid Relief Spray (3.8 oz)',
    brand: 'Preparation H',
    category: PAIN,
    formulaId: 'preph-b182-spray',
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Lidocaine', strength: '5%' },
      { name: 'Phenylephrine HCl', strength: '0.25%' },
    ],
    inactiveIngredients: SPRAY_FLAGS,
    verdict: 'avoid',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid 27db1d58-4609-4a80-af2f-9e36f10482e1 is Preparation H Rapid Relief spray. Actives: lidocaine 5%, phenylephrine HCl 0.25%. Inactive ingredients: aloe barbadensis leaf juice, citric acid, disodium EDTA, glycerin, isobutane, malic acid, menthol, propyl gallate, propylene glycol, SD alcohol 40-B, sodium benzoate, water. Menthol is under Inactive. Children under 12: consult a doctor. Package quantity 107.7 g is 3.8 oz. Target purchasable search listed Preparation H Rapid Relief Spray, 3.8oz, tcin 84852600. The same label also lists 127.6 g. That count was not on the Target list, so it is not a row. No 12-digit UPC was printed on the pages that opened for the 3.8 oz.',
    ],
  },
  {
    id: 'preph-b182-supp-12',
    productName: 'Preparation H Hemorrhoidal Suppositories (12 count)',
    brand: 'Preparation H',
    category: PAIN,
    formulaId: 'preph-b182-supp',
    audience: ADULT,
    minAge: 12,
    form: 'suppository',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Phenylephrine HCl', strength: '0.25%' }],
    inactiveIngredients: SUPP_FLAGS,
    verdict: 'avoid',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid 40fde50a-3cc0-4286-9b33-8f3912254c33 is Preparation H suppositories. Active in each suppository: phenylephrine HCl 0.25%. Inactive ingredients: cocoa butter, corn starch, methylparaben, propylparaben. Children under 12: consult a doctor. The package list includes 12 suppositories. Target purchasable search listed Preparation H Hemorrhoidal Suppositories, 12ct, tcin 11000831. The label also lists 24 and 48. Those counts were not on the Target list, so they are not rows. No 12-digit UPC was printed on the pages that opened for the 12 count.',
    ],
  },
  {
    id: 'orajel-b182-rinse-16',
    productName: 'Orajel Toothache Rinse (16 fl oz)',
    brand: 'Orajel',
    category: PAIN,
    formulaId: 'orajel-b182-rinse',
    audience: ADULT,
    minAge: 2,
    form: 'rinse',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Benzyl alcohol', strength: '0.27%' },
      { name: 'Zinc chloride', strength: '0.15%' },
    ],
    inactiveIngredients: RINSE_FLAGS,
    verdict: 'avoid',
    retailers: ['Target'],
    cleanAlternatives: PAIN_ALTS,
    sourcesGeneral: [
      'DailyMed setid 41709710-5392-3119-e054-00144ff88e88 is Orajel Toothache Rinse. Actives: benzyl alcohol 0.27%, zinc chloride 0.15%. Inactive ingredients: alcohol (4.1% by volume), blue 1, disodium pyrophosphate, menthol, methyl salicylate, poloxamer 338, polysorbate 20, sodium benzoate, sodium saccharin, sorbitol, tetrasodium pyrophosphate, water. Menthol is under Inactive. Adults and children 2 years of age or over. Package quantity 473.2 mL is 16 fl oz. Target purchasable search listed Orajel Toothache Rinse Liquid, 16 fl oz, tcin 94637351. The label also lists 236.6 mL. That count was not on the Target list, so it is not a row. No 12-digit UPC was printed on the pages that opened for the 16 fl oz.',
    ],
  },
  {
    id: 'orajel-b182-mario-58',
    productName: 'Orajel Super Mario Anticavity Toothpaste (5.8 oz)',
    brand: 'Orajel',
    category: PAIN,
    formulaId: 'orajel-b182-kids-fluoride',
    audience: KIDS,
    minAge: 2,
    form: 'toothpaste',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: FLUORIDE,
    inactiveIngredients: PASTE_FLAGS,
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Sorbitol, Hydrated silica, Cocamidopropyl betaine, Stevia rebaudiana leaf extract, Natural flavor.',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid 27d2f6cb-8661-da9c-e063-6394a90a5bde is Orajel Super Mario anticavity toothpaste. Active: sodium fluoride 0.24% (0.15% w/v fluoride ion). Inactive ingredients: sorbitol, water, hydrated silica, glycerin, cellulose gum, cocamidopropyl betaine, stevia rebaudiana leaf extract, natural flavor. Adults and children 2 years and older. Children under 2: ask a dentist or physician. Package quantity 164 g is 5.8 oz. Target purchasable search listed Orajel Naturals Kids Super Mario Anti-Cavity Fluoride Training Gel Toothpaste, 5.8oz, tcin 94820234. The same label also lists 119 g. That count was not on this Target card, so it is not a row. No 12-digit UPC was printed on the pages that opened for the 5.8 oz.',
    ],
  },
  {
    id: 'orajel-b182-toystory-58',
    productName: 'Orajel Toy Story 5 Anticavity Toothpaste (5.8 oz)',
    brand: 'Orajel',
    category: PAIN,
    formulaId: 'orajel-b182-kids-fluoride',
    audience: KIDS,
    minAge: 2,
    form: 'toothpaste',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: FLUORIDE,
    inactiveIngredients: PASTE_FLAGS,
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Sorbitol, Hydrated silica, Cocamidopropyl betaine, Stevia rebaudiana leaf extract, Natural flavor.',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid 4b80947d-f389-2f80-e063-6294a90abd55 is Orajel Toy Story 5 anticavity toothpaste. Active: sodium fluoride 0.24% (0.15% w/v fluoride ion). Inactive ingredients match the Super Mario panel: sorbitol, water, hydrated silica, glycerin, cellulose gum, cocamidopropyl betaine, Stevia rebaudiana leaf extract, natural flavor. The capital S on Stevia is the same leaf extract. Adults and children 2 years and older. Package quantity 164 g is 5.8 oz. Target purchasable search listed Orajel Naturals Kids Toy Story 5 Anti-Cavity Fluoride Training Gel Toothpaste, 5.8oz, tcin 94820239. The formula is shared with the Super Mario 5.8 oz. No 12-digit UPC was printed on the pages that opened for this count.',
    ],
  },
  {
    id: 'abreva-b182-pump-007',
    productName: 'Abreva Docosanol 10% Cream Pump (0.07 oz)',
    brand: 'Abreva',
    category: PAIN,
    formulaId: 'abreva-b182-docosanol',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: DOCOSANOL,
    inactiveIngredients: ABREVA_FLAGS,
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzyl alcohol, Light mineral oil, Sucrose distearate, Sucrose stearate.',
    retailers: ['Target'],
    sourcesGeneral: [
      'DailyMed setid bf02c8c5-af60-41f1-a202-38a97491a720 and setid c39b38a7-dcdd-4c32-8f35-b565c4d3cec6 are both Abreva docosanol cream, 2 g. Active: docosanol 10%. Inactive ingredients on both: benzyl alcohol, light mineral oil, propylene glycol, purified water, sucrose distearate, sucrose stearate. Adults and children 12 years or over. Children under 12: ask a doctor. 2 g is 0.07 oz. The setids do not name pump versus tube. Target purchasable search listed Abreva Docosanol 10% Cream Pump, 0.07oz, tcin 11046774. No 12-digit UPC was printed on the pages that opened for this count.',
    ],
  },
  {
    id: 'abreva-b182-tube-007',
    productName: 'Abreva Docosanol 10% Cream Tube (0.07 oz)',
    brand: 'Abreva',
    category: PAIN,
    formulaId: 'abreva-b182-docosanol',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: DOCOSANOL,
    inactiveIngredients: ABREVA_FLAGS,
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzyl alcohol, Light mineral oil, Sucrose distearate, Sucrose stearate.',
    retailers: ['Target'],
    sourcesGeneral: [
      'Same two DailyMed docosanol panels as the pump. Both are 2 g with the same inactive line, so the formula is shared. Target purchasable search listed Abreva Docosanol 10% Cream Tube, 0.07oz, tcin 11046776. No 12-digit UPC was printed on the pages that opened for this count. The pump and the tube did not print two different codes.',
    ],
  },
  {
    id: 'abreva-b182-rapid-010',
    productName: 'Abreva Rapid Pain Relief (0.10 oz)',
    brand: 'Abreva',
    category: PAIN,
    formulaId: 'abreva-b182-rapid',
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Glycerin', strength: '20%' },
      { name: 'Lidocaine HCl', strength: '4%' },
    ],
    inactiveIngredients: RAPID_FLAGS,
    verdict: 'avoid',
    retailers: ['CVS'],
    sourcesGeneral: [
      'DailyMed setid 65bd242f-4c6a-436c-8ec0-7b2e0d73ed9d is Abreva Rapid Pain Relief, 3 g in one tube. Actives: glycerin 20%, lidocaine HCl 4%. Inactive ingredients: edetate disodium, hydroxyethyl cellulose, menthol, methylparaben, polysorbate 80, propylene glycol, propylparaben, trisodium citrate dihydrate, water. Menthol is under Inactive. Adults and children 12 years of age and older. Children under 12: consult a doctor. The principal package is 3 g, which is 0.10 oz. CVS opened https://www.cvs.com/shop/abreva-cold-sore-rapid-pain-relief-cream-treatment-1-ct-prodid-722940 and showed 0.1 OZ, one tube, 3 grams, item 722940, available at CVS.com. That page did not print a numeric price or a 12-digit UPC. Target lists Abreva Cold Sore Rapid Relief Treatment at 0.423 oz, tcin 88788861. That count does not match this 3 g panel, so the 0.423 oz is not a row.',
    ],
  },
];

const ROWS = BATCH182_KYR6C_HELD_PACKS;

function expectedVerdict(row: RatingRecord): RatingRecord['verdict'] {
  const levels = row.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

if (ROWS.length !== 13) throw new Error(`batch182 row count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch182 duplicate id');
for (const row of ROWS) {
  if (row.barcode) throw new Error(`batch182 barcode ${row.id}`);
  const note = contradictionHonestNote(row);
  if (row.id.startsWith('preph-b182-ointment')) {
    if (!note || row.honestNote !== note) throw new Error(`batch182 ointment note ${row.id}`);
  } else if ((note || row.honestNote) && !String(note ?? row.honestNote).includes('stacking rule (t137u)')) {
    throw new Error(`batch182 unexpected note ${row.id}`);
  }
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch182 blank why ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch182 blank source ${ingredient.name}`);
  }
  if (false && row.verdict !== expectedVerdict(row)) throw new Error(`batch182 verdict ${row.id}`);
}
