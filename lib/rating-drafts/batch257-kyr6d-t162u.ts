// DRAFT / not verified / batch 257 KYR6-d (t162u). Founder-verified panels. Second source waived.
// Does not repeat rows from 796, 805, 806, or 811 through 818. Missing UPCs stay off the barcode field.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients, limitedStackHonestNoteIfAny } from '../scan-preview/verdictFromFlags';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  carnauba:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium — cellulose-family disintegrant).',
  hpmc: 'Methodology §5 Cleared (hypromellose — cellulose-family coating).',
  magStearate:
    'Methodology §5 Cleared (magnesium stearate — stearate-family lubricant; EFSA 2018 no safety concern).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose — cellulose-family filler).',
  peg: 'Methodology §5 Limited (PEGs / polyethylene glycol — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized corn starch — named starch).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named starch).',
  gelatin: 'Methodology §5 Cleared (gelatin — capsule base).',
  tio2: 'Methodology §5 High-risk (titanium dioxide — EU food-additive ban 2022; EFSA could not rule out genotoxicity).',
  caramel:
    'Methodology §5 High-risk (caramel color, class unnamed — ammonia-process 4-MEI; IARC possibly carcinogenic).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin — generic starch sweetener; counts toward the t137u stack).',
  dicalcium: 'Methodology §5 Cleared (dicalcium phosphate — phosphate-salt filler).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — zero-point Caution cap; does not count toward the Limited stack).',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u.',
  citric: 'Methodology §5 Cleared (citric acid — organic acid).',
  natArt:
    'Methodology §5 Limited (natural and artificial flavors — undisclosed mixture; a named taste does not clear the artificial half).',
  yellow6:
    'Methodology §5 High-risk (FD&C Yellow No. 6 / sunset yellow — synthetic dye; EU activity-and-attention warning).',
  aspartame: 'Methodology §5 High-risk (aspartame — IARC 2023 Group 2B).',
  natOrange:
    'Methodology §5 Cleared (named Natural Orange Flavor — t132u named Natural [fruit] Flavor; not Limited natural flavors).',
  stevia:
    'Methodology §5 Limited (Stevia — founder lock t158u Oct 21, 2026; exact token; counts toward the t137u stack; organic Rebaudioside A stays Cleared).',
  steviaExtract:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.',
  steviol:
    'Methodology §5 Cleared (high-purity steviol glycosides — EFSA ADI; not the Limited stevia extract row).',
  steviolBare:
    'Methodology §5 Limited (Steviol glycosides printed without high-purity — founder lock t16u Oct 22, 2026; counts toward the t137u stack). Not the Cleared high-purity steviol glycosides row.',
  paprika:
    'Methodology §5 Cleared (Paprika extract (color) — founder lock t158u Oct 21, 2026; exact named plant color).',
  turmeric: 'Methodology §5 Cleared (turmeric (color) — named plant color).',
  natFlavors: 'Methodology §5 Limited (natural flavors — unnamed mixture; counts toward the t137u stack).',
  water: 'Methodology §5 Cleared (water / purified water).',
  xylitol:
    'Methodology §5 Limited-risk (xylitol, oral — GI effects at volume; sugar-alcohol row; does not count toward the t137u stack).',
  pectin: 'Methodology §5 Cleared (pectin — gum family).',
  sodiumCitrate: 'Methodology §5 Cleared (sodium citrate — citrate-salt buffer).',
  blackCarrot:
    'Methodology §5 Cleared (Black carrot — named plant color in a color listing; t150u Black Carrot Extract Color family).',
  watermelonExtract:
    'Methodology §5 Cleared (Watermelon extract — founder lock t150u Oct 21, 2026; named plant color).',
  huito:
    'Methodology §5 Caution (Huito extract — founder lock t150u Oct 21, 2026; plant color; does not count toward the t137u stack).',
  mctGummy:
    'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named).',
  juice:
    'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.',
  annatto:
    'Methodology §5 Caution (Annatto — plant color; condition rule; does not count toward the t137u stack).',
  coconut:
    'Methodology §5 Cleared (coconut oil, named, any form). Founder override Oct 17, 2026 t111u; the Sept 25, 2026 gummy-Avoid restamp is struck.',
  guar: 'Methodology §5 Cleared (guar gum — gum family).',
  malic: 'Methodology §5 Cleared (malic acid — organic acid, same family as citric acid).',
  xanthan: 'Methodology §5 Cleared (xanthan gum — gum family).',
  dextrose: 'Methodology §5 Caution (bare dextrose — glucose-family sugar; not a named syrup).',
  natFlavorSingular:
    'Methodology §5 Caution (Natural Flavor, singular — unnamed natural flavor; not the Limited natural flavors mixture).',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant).',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose — cellulose-family coating).',
  sucralose:
    'Methodology §5 Limited (sucralose — founder lock t138u Oct 20, 2026; counts toward the t137u stack).',
  spirulina:
    'Methodology §5 Caution (spirulina extract (color) — algae color; not the t121u Cleared spirulina (color) row).',
  ceteth20:
    'Methodology §5 Limited (Ceteth-20 — founder lock t150u Oct 21, 2026; exact token; not ceteth-20 phosphate or cetostearyl alcohol).',
  chlorocresol:
    'Methodology §5 Limited (Chlorocresol — founder lock t150u Oct 21, 2026; exact token; not chloroxylenol).',
  cetostearyl: 'Methodology §5 Cleared (cetostearyl alcohol — fatty alcohol in a cream base).',
  mineralOilCream:
    'Methodology §5 Cleared (Paraffin + mineral oil as topical ointment occlusive — this cream lists mineral oil with white petrolatum; not the Caution light liquid paraffin row).',
  pgTopical:
    'Methodology §5 Cleared (propylene glycol, topical form — not the t138u oral Limited row).',
  phosphate: 'Methodology §5 Cleared (sodium phosphate monobasic — phosphate-salt class).',
  petrolatum: 'Methodology §5 Cleared (white petrolatum — topical ointment base).',
  bht: 'Methodology §5 High-risk (BHT / butylated hydroxytoluene — EU 2022 restriction; hormone disruption).',
  isobutane: 'Methodology §5 Cleared (isobutane — spray propellant).',
  ppg: 'Methodology §5 Caution (PPG-12-Buteth-16 — condition rule; one-level drop because the non-irritating condition cannot be confirmed).',
  sdAlcohol: 'Methodology §5 Limited (SD alcohol 40-B — alcohol vehicle; not Avoid).',
  kaolin: 'Methodology §5 Cleared (kaolin — clay absorbent).',
  zea: 'Methodology §5 Cleared (Zea mays (corn) starch — named starch).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

const PANEL_URINARY =
  'Founder-verified panel t162u (Save Mart). No silicone dioxide. Thrifty White is the outlier on that token';
const PANEL_BLADDER =
  'Founder-verified panel t162u (Amazon). Contains: Soy is a disclosure for the soy germ active, not an inactive token. UPC 787651760148 was not confirmed on a viewed 48-count page';
const PANEL_RS_PACKETS =
  'Founder-verified panel t162u. Real-sugar orange packets, 30 count. UPC 037000740872 stays on this row';
const PANEL_RS_30 =
  'Founder-verified panel t162u. Real-sugar orange 30 canister. The given code 037000740872 is the packets code and is not attached here';
const PANEL_SF_30 = 'Founder-verified panel t162u (Walmart). Sugar-free orange 30 canister. No UPC was given';
const PANEL_PREM_23 =
  'Founder-verified panel t162u (Walgreens). Given code 03077204763 is 11 digits. Earlier Kroger/SmartLabel code 037000963691 is a different code. Neither is attached';
const PANEL_PREM_149 =
  'Founder-verified panel t162u (Walgreens). Given code 03077204760 is 11 digits and is not attached';
const PANEL_GUMMY_60 =
  'Founder-verified panel t162u (Target). 60 count. The Target 60-count page that is a 2-pack is not this row. Not the 90-count';
const PANEL_BENE_GUMMY = 'Founder-verified panel t162u (Amazon). Benefiber probiotic gummies, 50 count';
const PANEL_STICKS = 'Founder-verified panel t162u (Target). Wheat dextrin only';
const PANEL_LEM_24 =
  'Founder-verified panel t162u. Strawberry lemonade sticks, 24 count. Given code 88679032670 is 11 digits and is not attached. Not the written 36-count';
const PANEL_SUPERFRUIT =
  'Founder-verified panel t162u. Superfruits, Strawberry Dragon Fruit. Given code 88679032718 is 11 digits and is not attached';
const PANEL_SUPERGREEN =
  'Founder-verified panel t162u. Supergreens. Given code 88679032715 is 11 digits and is not attached';
const PANEL_MIND =
  'Founder-verified panel t162u (Target), used for the 30 because it matches the brand 30 panel. The Target 60 is a 2-pack and is not a row';
const PANEL_JOCK =
  'Founder-verified panel t162u. Jock itch cream 0.5 oz. Given code 0300850934051 is 13 digits and was earlier a 3-pack code. It is not attached';
const PANEL_SPRAY =
  'Founder-verified panel t162u. Talc-free powder spray. This panel supersedes the Thrifty White talc line';

const PREM_149: IngredientFlag[] = [
  flag(PANEL_PREM_149, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(PANEL_PREM_149, 'Citric acid', 'cleared', 'citric'),
  flag(PANEL_PREM_149, 'Natural flavors', 'limited', 'natFlavors'),
  flag(PANEL_PREM_149, 'Stevia', 'limited', 'stevia'),
  flag(PANEL_PREM_149, 'Paprika extract (color)', 'cleared', 'paprika'),
  flag(PANEL_PREM_149, 'Turmeric (color)', 'cleared', 'turmeric'),
];

const LEM_24: IngredientFlag[] = [
  flag(PANEL_LEM_24, 'Natural flavors', 'limited', 'natFlavors'),
  flag(PANEL_LEM_24, 'Maltodextrin', 'limited', 'maltodextrin'),
  flag(PANEL_LEM_24, 'Beet juice concentrate', 'cleared', 'juice'),
  flag(PANEL_LEM_24, 'Stevia Extract', 'limited', 'steviaExtract'),
  flag(PANEL_LEM_24, 'Silica', 'moderate', 'silica'),
];

const PREM_149_NOTE = limitedStackHonestNoteIfAny(PREM_149);
const LEM_24_NOTE = limitedStackHonestNoteIfAny(LEM_24);

const SPRAY_FLAGS: IngredientFlag[] = [
  flag(PANEL_SPRAY, 'Butylated Hydroxytoluene', 'high', 'bht'),
  flag(PANEL_SPRAY, 'Hydroxypropyl Cellulose', 'cleared', 'hpc'),
  flag(PANEL_SPRAY, 'Isobutane', 'cleared', 'isobutane'),
  flag(PANEL_SPRAY, 'Kaolin', 'cleared', 'kaolin'),
  flag(PANEL_SPRAY, 'Magnesium Stearate', 'cleared', 'magStearate'),
  flag(PANEL_SPRAY, 'PPG-12-Buteth-16', 'moderate', 'ppg'),
  flag(PANEL_SPRAY, 'SD Alcohol 40-B', 'limited', 'sdAlcohol'),
  flag(PANEL_SPRAY, 'Zea Mays (Corn) Starch', 'cleared', 'zea'),
];

export const BATCH257_KYR6D_T162U: RatingRecord[] = [
  {
    id: 'azo-b257-urinary-pain-30',
    productName: 'AZO Urinary Pain Relief (30 tablets)',
    brand: 'AZO',
    category: 'Pain & Fever',
    formulaId: 'azo-b257-urinary-pain-30',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '787651301525',
    activeIngredients: [{ name: 'Phenazopyridine hydrochloride', strength: '95 mg' }],
    inactiveIngredients: [
      flag(PANEL_URINARY, 'Carnauba wax', 'cleared', 'carnauba'),
      flag(PANEL_URINARY, 'Croscarmellose sodium', 'cleared', 'croscarmellose'),
      flag(PANEL_URINARY, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PANEL_URINARY, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_URINARY, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_URINARY, 'Polyethylene glycol', 'limited', 'peg'),
      flag(PANEL_URINARY, 'Povidone', 'cleared', 'povidone'),
      flag(PANEL_URINARY, 'Pregelatinized corn starch', 'cleared', 'pregel'),
      flag(PANEL_URINARY, 'Corn starch', 'cleared', 'cornStarch'),
    ],
    verdict: 'caution',
    retailers: ['Save Mart'],
    sourcesGeneral: [
      'Phenazopyridine hydrochloride is the active and is not graded. Polyethylene glycol is the one Limited token (t138u), so the row is Caution. Corn starch on the “may also contain” line is Cleared. No silicone dioxide is on this row. Thrifty White prints silicone dioxide under the same UPC 787651301525. That line is the outlier. Founder-verified Save Mart panel (t162u); second source waived. UPC check digit OK. This is not the 99.5 mg Maximum Strength 24-count.',
    ],
  },
  {
    id: 'azo-b257-bladder-weight-48',
    productName: 'AZO Bladder Control & Weight Management (48 capsules)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b257-bladder-weight-48',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Go-Less blend (pumpkin seed extract and soy germ extract)', strength: '300 mg' },
      { name: 'CQR-300 (Cissus quadrangularis)', strength: '150 mg' },
    ],
    inactiveIngredients: [
      flag(PANEL_BLADDER, 'Gelatin', 'cleared', 'gelatin'),
      flag(PANEL_BLADDER, 'Titanium dioxide (color)', 'high', 'tio2'),
      flag(PANEL_BLADDER, 'Caramel (color)', 'high', 'caramel'),
      flag(PANEL_BLADDER, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_BLADDER, 'Dicalcium phosphate', 'cleared', 'dicalcium'),
      flag(PANEL_BLADDER, 'Microcrystalline cellulose', 'cleared', 'mcc'),
      flag(PANEL_BLADDER, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_BLADDER, 'Silicon dioxide', 'moderate', 'silica'),
    ],
    verdict: 'avoid',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Go-Less and CQR-300 are the supplement-facts actives and are not graded. Titanium dioxide and unnamed caramel color are Avoid, so the row is Avoid. That high sets the row. This is not a 3+ Limited stack. Maltodextrin is one Limited token. Silicon dioxide is the zero-point Caution cap and does not stack. Contains: Soy is the allergen disclosure for the soy germ in Go-Less, not an inactive token. Founder-verified Amazon panel (t162u); second source waived. UPC 787651760148 was not confirmed on a viewed 48-count page, so the barcode is omitted. This is not the Go-Less 54-count or 72-count.',
    ],
  },
  {
    id: 'metamucil-b257-real-sugar-orange-packets-30',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Real Sugar Orange (30 packets)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b252-real-sugar-orange-72',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '037000740872',
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per packet' }],
    inactiveIngredients: [
      flag(PANEL_RS_PACKETS, 'Sucrose', 'cleared', 'sucrose'),
      flag(PANEL_RS_PACKETS, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_RS_PACKETS, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_RS_PACKETS, 'Yellow 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Yellow 6 is Avoid (synthetic dye; EU activity-and-attention warning). That high sets the row. Natural and artificial orange flavor is one Limited token and does not change it. This is not a 3+ Limited stack. Sucrose is Cleared (t118u). This is the 30-packet box, not the 30-count canister and not the 72-count. Founder-verified panel (t162u); second source waived. UPC 037000740872 check digit OK. The same code was also given for the 30-count canister and stays on this packets row only.',
    ],
  },
  {
    id: 'metamucil-b257-real-sugar-orange-30',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Real Sugar Orange (30 count canister)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b252-real-sugar-orange-72',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per rounded tablespoon' }],
    inactiveIngredients: [
      flag(PANEL_RS_30, 'Sucrose', 'cleared', 'sucrose'),
      flag(PANEL_RS_30, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_RS_30, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_RS_30, 'Yellow 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Yellow 6 is Avoid (synthetic dye; EU activity-and-attention warning). That high sets the row. Natural and artificial orange flavor is one Limited token and does not change it. This is not a 3+ Limited stack. Sucrose is Cleared (t118u). This is the 30-count canister. The founder gave 037000740872, the same code as the 30 packets. That code stays on the packets row. The canister barcode is omitted. Founder-verified panel (t162u); second source waived.',
    ],
  },
  {
    id: 'metamucil-b257-sf-orange-30',
    productName: 'Metamucil 4-in-1 Psyllium Fiber Powder, Sugar-Free Orange (30 count canister)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-sf-orange-powder',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Psyllium husk', strength: '3 g dietary fiber per rounded teaspoon' }],
    inactiveIngredients: [
      flag(PANEL_SF_30, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_SF_30, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_SF_30, 'Natural and artificial orange flavor', 'limited', 'natArt'),
      flag(PANEL_SF_30, 'Aspartame', 'high', 'aspartame'),
      flag(PANEL_SF_30, 'Yellow 6', 'high', 'yellow6'),
    ],
    verdict: 'avoid',
    retailers: ['Walmart'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Aspartame is Avoid (IARC 2023 Group 2B). Yellow 6 is also Avoid. Those highs set the row. Maltodextrin and natural and artificial orange flavor are two Limited tokens. This is not a 3+ Limited stack. This is the 30-count canister. No UPC was given, so the barcode is omitted. Founder-verified Walmart panel (t162u); second source waived. The 72, 114, and 180 sugar-free canisters are already written on this formula.',
    ],
  },
  {
    id: 'metamucil-b257-premium-blend-23',
    productName: 'Metamucil Premium Blend Fiber Powder (23.1 oz / 23.5 oz)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b257-premium-blend-orange',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Psyllium husk', strength: 'dietary fiber per serving' }],
    inactiveIngredients: [
      flag(PANEL_PREM_23, 'Maltodextrin', 'limited', 'maltodextrin'),
      flag(PANEL_PREM_23, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_PREM_23, 'Natural Orange Flavor', 'cleared', 'natOrange'),
      flag(PANEL_PREM_23, 'Stevia', 'limited', 'stevia'),
      flag(PANEL_PREM_23, 'Paprika extract (color)', 'cleared', 'paprika'),
      flag(PANEL_PREM_23, 'Turmeric (color)', 'cleared', 'turmeric'),
    ],
    verdict: 'caution',
    retailers: ['Walgreens'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Maltodextrin and Stevia are two Limited tokens, so the row is Caution. Natural Orange Flavor names the fruit (t132u) and is Cleared. It is not Limited natural flavors and it does not make a third Limited token. Paprika extract (color) and turmeric (color) are Cleared. This is not a 3+ Limited stack. Founder-verified Walgreens panel (t162u); second source waived. Given code 03077204763 is 11 digits. No viewed source confirmed a 12-digit pad, so it was not padded. Earlier Kroger/SmartLabel code 037000963691 checks as a different 12-digit code and was not re-confirmed against this given code. Neither code is attached. This is not the 14.9 oz can.',
    ],
  },
  {
    id: 'metamucil-b257-premium-blend-14-9',
    productName: 'Metamucil Premium Blend Fiber Powder (14.9 oz)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b257-premium-blend-14-9',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Psyllium husk', strength: 'dietary fiber per serving' }],
    inactiveIngredients: PREM_149,
    verdict: 'avoid',
    honestNote: PREM_149_NOTE,
    retailers: ['Walgreens'],
    sourcesGeneral: [
      'Psyllium husk is the active and is not graded. Maltodextrin, natural flavors, and stevia are the three stack-eligible Limited tokens. That 3+ Limited stack is the Avoid. Paprika extract (color) and turmeric (color) are Cleared and do not count. Founder-verified Walgreens panel (t162u); second source waived. Given code 03077204760 is 11 digits. No viewed source confirmed a 12-digit pad, and a leading-zero trial does not pass the check digit, so the barcode is omitted. The 14.6 oz size was the other half of the same hunt line and was not a separate opened pack. This is not the 23.1 oz can.',
    ],
  },
  {
    id: 'metamucil-b257-fiber-probiotic-gummy-60',
    productName: 'Metamucil Fiber + Probiotics Gummies (60 gummies)',
    brand: 'Metamucil',
    category: 'Digestive',
    formulaId: 'metamucil-b247-fiber-probiotic-gummy-90',
    audience: ADULT,
    minAge: 12,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '030772144596',
    activeIngredients: [
      { name: 'Inulin', strength: 'part of 5 g fiber per 3 gummies' },
      { name: 'Soluble corn fiber (Fibersol)', strength: 'part of 5 g fiber per 3 gummies' },
    ],
    inactiveIngredients: [
      flag(PANEL_GUMMY_60, 'Water', 'cleared', 'water'),
      flag(PANEL_GUMMY_60, 'Xylitol', 'limited', 'xylitol'),
      flag(PANEL_GUMMY_60, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_GUMMY_60, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_GUMMY_60, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
      flag(PANEL_GUMMY_60, 'Black carrot extract', 'cleared', 'blackCarrot'),
      flag(PANEL_GUMMY_60, 'Watermelon extract', 'cleared', 'watermelonExtract'),
      flag(PANEL_GUMMY_60, 'Huito extract', 'moderate', 'huito'),
      flag(PANEL_GUMMY_60, 'Natural flavors', 'limited', 'natFlavors'),
      flag(PANEL_GUMMY_60, 'Carnauba wax', 'cleared', 'carnauba'),
      flag(PANEL_GUMMY_60, 'Corn starch', 'cleared', 'cornStarch'),
      flag(PANEL_GUMMY_60, 'Medium chain triglyceride oil', 'limited', 'mctGummy'),
    ],
    verdict: 'caution',
    retailers: ['Target'],
    sourcesGeneral: [
      'Inulin and soluble corn fiber (Fibersol) are the labeled fiber actives and are not graded. Stack-eligible Limited tokens are natural flavors and medium chain triglyceride oil (no plant named, t132u). That is two, so the row is Caution. Xylitol is the oral sugar-alcohol row and does not count toward the t137u stack. Huito extract is Caution (t150u) and does not stack. Black carrot extract and watermelon extract are Cleared. This is not a 3+ Limited stack. Founder-verified Target panel (t162u); second source waived. UPC 030772144596 check digit OK. This is not the 90-count (030772144589). A Target 60 that is a 2-pack is not this row.',
    ],
  },
  {
    id: 'benefiber-b257-probiotic-gummy-50',
    productName: 'Benefiber Prebiotic Fiber + Probiotics Gummies (50 gummies)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b257-probiotic-gummy-50',
    audience: ADULT,
    minAge: 12,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790121701',
    activeIngredients: [
      { name: 'Inulin', strength: 'prebiotic fiber' },
      { name: 'Bacillus coagulans MTCC 5856', strength: 'probiotic' },
    ],
    inactiveIngredients: [
      flag(PANEL_BENE_GUMMY, 'Water', 'cleared', 'water'),
      flag(PANEL_BENE_GUMMY, 'Sucrose', 'cleared', 'sucrose'),
      flag(PANEL_BENE_GUMMY, 'Pectin', 'cleared', 'pectin'),
      flag(PANEL_BENE_GUMMY, 'Natural flavors', 'limited', 'natFlavors'),
      flag(PANEL_BENE_GUMMY, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_BENE_GUMMY, 'Sodium citrate', 'cleared', 'sodiumCitrate'),
      flag(PANEL_BENE_GUMMY, 'Black carrot', 'cleared', 'blackCarrot'),
      flag(PANEL_BENE_GUMMY, 'Annatto', 'moderate', 'annatto'),
      flag(PANEL_BENE_GUMMY, 'Genipap juice concentrate', 'cleared', 'juice'),
      flag(PANEL_BENE_GUMMY, 'Watermelon juice concentrate', 'cleared', 'juice'),
      flag(PANEL_BENE_GUMMY, 'Coconut oil', 'cleared', 'coconut'),
      flag(PANEL_BENE_GUMMY, 'Carnauba wax', 'cleared', 'carnauba'),
      flag(PANEL_BENE_GUMMY, 'Corn starch', 'cleared', 'cornStarch'),
    ],
    verdict: 'caution',
    retailers: ['Amazon'],
    sourcesGeneral: [
      'Inulin and the probiotic culture are the supplement-facts actives and are not graded. Natural flavors is the one stack-eligible Limited token, so the row is Caution. Sucrose is Cleared (t118u). Annatto is Caution and does not stack. Genipap juice concentrate and watermelon juice concentrate are Cleared on the Oct 15 fruit and vegetable juice lock. Black carrot in the color listing is Cleared. Coconut oil is Cleared in a gummy (t111u). This is not a 3+ Limited stack. Founder-verified Amazon panel (t162u); second source waived. UPC 886790121701 check digit OK.',
    ],
  },
  {
    id: 'benefiber-b257-sticks-unflavored-48',
    productName: 'Benefiber Prebiotic Fiber Sticks, Unflavored (48 count)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b254-sticks-unflavored-28',
    audience: ADULT,
    minAge: 6,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '886790121763',
    activeIngredients: [{ name: 'Wheat dextrin', strength: '3 g dietary fiber per stick' }],
    inactiveIngredients: [],
    verdict: 'clean',
    retailers: ['Target'],
    sourcesGeneral: [
      'Wheat dextrin is the only ingredient and it is the fiber active, so there is no other-ingredient token and the row is Clean. The label notes it is processed to meet FDA gluten-free requirements. That is a process note, not an inactive token. Founder-verified Target panel (t162u); second source waived. UPC 886790121763 check digit OK. This is not the 28-count stick. Ages 6 and up; a full stick is the 12-and-older serving.',
    ],
  },
  {
    id: 'benefiber-b257-lemonade-24',
    productName: 'Benefiber Prebiotic Fiber Sticks, Strawberry Lemonade (24 count)',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b257-lemonade-24',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Inulin', strength: 'fiber per stick' }],
    inactiveIngredients: LEM_24,
    verdict: 'avoid',
    honestNote: LEM_24_NOTE,
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Inulin is the fiber active and is not graded. Natural flavors, maltodextrin, and stevia extract are the three stack-eligible Limited tokens. That 3+ Limited stack is the Avoid. Beet juice concentrate is Cleared on the Oct 15 juice lock. Silica is the zero-point Caution cap and does not stack. Founder-verified panel (t162u); second source waived. Given code 88679032670 is 11 digits. A 12-digit pad does not pass the check digit, so the barcode is omitted. This is not the written 36-count, which uses rebaudioside A and still has no UPC.',
    ],
  },
  {
    id: 'benefiber-b257-superfruits',
    productName: 'Benefiber Prebiotic Fiber + Superfruits, Strawberry Dragon Fruit',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b257-superfruits',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Plant-based fiber', strength: '6 g per serving' }],
    inactiveIngredients: [
      flag(PANEL_SUPERFRUIT, 'Natural flavors', 'limited', 'natFlavors'),
      flag(PANEL_SUPERFRUIT, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_SUPERFRUIT, 'Guar gum', 'cleared', 'guar'),
      flag(PANEL_SUPERFRUIT, 'Malic acid', 'cleared', 'malic'),
      flag(PANEL_SUPERFRUIT, 'Steviol glycosides', 'limited', 'steviolBare'),
      flag(PANEL_SUPERFRUIT, 'Xanthan gum', 'cleared', 'xanthan'),
    ],
    verdict: 'caution',
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Plant-based fiber is the fiber active and is not graded. Natural flavors and bare Steviol glycosides are the two stack-eligible Limited tokens, so the row is Caution. t16u regrade: the printing is Steviol glycosides without high-purity, so that token is Limited and it counts. Citric acid, guar gum, malic acid, and xanthan gum are Cleared. This is not a 3+ Limited stack. Founder-verified panel (t162u); second source waived. Given code 88679032718 is 11 digits. A 12-digit pad does not pass the check digit, so the barcode is omitted.',
    ],
  },
  {
    id: 'benefiber-b257-supergreens',
    productName: 'Benefiber Prebiotic Fiber + Supergreens',
    brand: 'Benefiber',
    category: 'Digestive',
    formulaId: 'benefiber-b257-supergreens',
    audience: ADULT,
    minAge: 12,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Plant-based fiber', strength: '6 g per serving' }],
    inactiveIngredients: [
      flag(PANEL_SUPERGREEN, 'Natural flavors', 'limited', 'natFlavors'),
      flag(PANEL_SUPERGREEN, 'Citric acid', 'cleared', 'citric'),
      flag(PANEL_SUPERGREEN, 'Guar gum', 'cleared', 'guar'),
      flag(PANEL_SUPERGREEN, 'Malic acid', 'cleared', 'malic'),
      flag(PANEL_SUPERGREEN, 'Steviol glycosides', 'limited', 'steviolBare'),
      flag(PANEL_SUPERGREEN, 'Xanthan gum', 'cleared', 'xanthan'),
      flag(PANEL_SUPERGREEN, 'Beet juice concentrate', 'cleared', 'juice'),
      flag(PANEL_SUPERGREEN, 'Silicon dioxide', 'moderate', 'silica'),
    ],
    verdict: 'caution',
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Plant-based fiber is the fiber active and is not graded. Natural flavors and bare Steviol glycosides are the two stack-eligible Limited tokens, so the row is Caution. t16u regrade: the printing is Steviol glycosides without high-purity, so that token is Limited and it counts. Citric acid, guar gum, malic acid, and xanthan gum are Cleared. Beet juice concentrate is Cleared on the Oct 15 juice lock. Silicon dioxide is the zero-point Caution cap and does not stack. This is not a 3+ Limited stack. Founder-verified panel (t162u); second source waived. Given code 88679032715 is 11 digits. A 12-digit pad does not pass the check digit, so the barcode is omitted.',
    ],
  },
  {
    id: 'azo-b257-clear-mind-30',
    productName: 'AZO Clear Mind Energy Mints (30 mints)',
    brand: 'AZO',
    category: 'Vitamins',
    formulaId: 'azo-b257-clear-mind-30',
    audience: ADULT,
    minAge: 18,
    form: 'mint',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    barcode: '787651760759',
    activeIngredients: [
      { name: 'Caffeine (from green coffee beans)', strength: '50 mg per 2 pieces' },
      { name: 'L-theanine', strength: '100 mg per 2 pieces' },
      { name: 'Vitamin B6', strength: '1.7 mg per 2 pieces' },
      { name: 'Vitamin B12', strength: '4.8 mcg per 2 pieces' },
    ],
    inactiveIngredients: [
      flag(PANEL_MIND, 'Dextrose', 'moderate', 'dextrose'),
      flag(PANEL_MIND, 'Natural Flavor', 'moderate', 'natFlavorSingular'),
      flag(PANEL_MIND, 'Stearic acid', 'cleared', 'stearic'),
      flag(PANEL_MIND, 'Hydroxypropyl cellulose', 'cleared', 'hpc'),
      flag(PANEL_MIND, 'Sucralose', 'limited', 'sucralose'),
      flag(PANEL_MIND, 'Magnesium stearate', 'cleared', 'magStearate'),
      flag(PANEL_MIND, 'Spirulina extract (color)', 'moderate', 'spirulina'),
    ],
    verdict: 'caution',
    retailers: ['Target'],
    sourcesGeneral: [
      'Caffeine, L-theanine, vitamin B6, and vitamin B12 are the supplement-facts actives and are not graded. Sucralose is the one stack-eligible Limited token (t138u), so the row is Caution. Natural Flavor, singular, is Caution and is not the Limited natural flavors mixture. Dextrose is Caution. Spirulina extract (color) is Caution and is not the Cleared spirulina (color) row. None of those Caution tokens stack. This is not a 3+ Limited stack. Founder-verified Target panel (t162u), used for the 30 because it matches the brand 30 panel. The Target 60 is a 2-pack and is not written. Second source waived. UPC 787651760759 check digit OK.',
    ],
  },
  {
    id: 'tinactin-b257-jock-cream-15g',
    productName: 'Tinactin Jock Itch Cream (0.5 oz / 15 g)',
    brand: 'Tinactin',
    category: 'First Aid',
    formulaId: 'tinactin-b247-af-cream',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Tolnaftate', strength: '1%' }],
    inactiveIngredients: [
      flag(PANEL_JOCK, 'Ceteth-20', 'limited', 'ceteth20'),
      flag(PANEL_JOCK, 'Cetostearyl alcohol', 'cleared', 'cetostearyl'),
      flag(PANEL_JOCK, 'Chlorocresol', 'limited', 'chlorocresol'),
      flag(PANEL_JOCK, 'Mineral oil', 'cleared', 'mineralOilCream'),
      flag(PANEL_JOCK, 'Propylene glycol', 'cleared', 'pgTopical'),
      flag(PANEL_JOCK, 'Purified water', 'cleared', 'water'),
      flag(PANEL_JOCK, 'Sodium phosphate monobasic', 'cleared', 'phosphate'),
      flag(PANEL_JOCK, 'White petrolatum', 'cleared', 'petrolatum'),
    ],
    verdict: 'caution',
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Tolnaftate is the active and is not graded. Ceteth-20 and chlorocresol are Limited (t150u). Those are the only two Limited tokens. No third Limited token applies, so this is not a 3+ Limited stack and the row is Caution. Mineral oil sits with white petrolatum, so it uses the Cleared topical ointment occlusive. Propylene glycol is the topical form, not the oral t138u row. Founder-verified panel (t162u); second source waived. Given code 0300850934051 is 13 digits and was earlier recorded as a 3-pack code. It is not verified as this single, so the barcode is omitted. This is the jock-itch indication, not the athlete’s foot cream row.',
    ],
  },
  {
    id: 'tinactin-b257-powder-spray-jock',
    productName: 'Tinactin Jock Itch Powder Spray, Talc-Free (4.6 oz)',
    brand: 'Tinactin',
    category: 'First Aid',
    formulaId: 'tinactin-b257-powder-spray',
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '041100599841',
    activeIngredients: [{ name: 'Tolnaftate', strength: '1%' }],
    inactiveIngredients: SPRAY_FLAGS,
    verdict: 'avoid',
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Tolnaftate is the active and is not graded. BHT is Avoid (EU 2022 hormone restriction). That high sets the row. This is not a 3+ Limited stack. SD alcohol 40-B (9% w/w) is one Limited token. PPG-12-Buteth-16 is Caution on the condition rule. The founder panel is talc-free and supersedes the Thrifty White talc line. Founder-verified panel (t162u); second source waived. UPC 041100599841 check digit OK. This is the jock-itch can, not the athlete’s foot can.',
    ],
  },
  {
    id: 'tinactin-b257-powder-spray-af',
    productName: 'Tinactin Athlete’s Foot and Ringworm Powder Spray, Talc-Free (4.6 oz)',
    brand: 'Tinactin',
    category: 'First Aid',
    formulaId: 'tinactin-b257-powder-spray',
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    barcode: '041100599858',
    activeIngredients: [{ name: 'Tolnaftate', strength: '1%' }],
    inactiveIngredients: SPRAY_FLAGS,
    verdict: 'avoid',
    retailers: ['founder-verified'],
    sourcesGeneral: [
      'Tolnaftate is the active and is not graded. Same talc-free panel as the jock-itch powder spray. BHT is Avoid (EU 2022 hormone restriction). That high sets the row. This is not a 3+ Limited stack. SD alcohol 40-B (9% w/w) is one Limited token. PPG-12-Buteth-16 is Caution on the condition rule. The founder panel supersedes the Thrifty White talc line. Founder-verified panel (t162u); second source waived. UPC 041100599858 check digit OK. This is the athlete’s foot and ringworm can, not the jock-itch can.',
    ],
  },
];

const ROWS = BATCH257_KYR6D_T162U;

const MISSING_UPC = new Set([
  'azo-b257-bladder-weight-48',
  'metamucil-b257-real-sugar-orange-30',
  'metamucil-b257-sf-orange-30',
  'metamucil-b257-premium-blend-23',
  'metamucil-b257-premium-blend-14-9',
  'benefiber-b257-lemonade-24',
  'benefiber-b257-superfruits',
  'benefiber-b257-supergreens',
  'tinactin-b257-jock-cream-15g',
]);

const STACK_IDS = new Set(['metamucil-b257-premium-blend-14-9', 'benefiber-b257-lemonade-24']);

const HIGH_IDS = new Set([
  'azo-b257-bladder-weight-48',
  'metamucil-b257-real-sugar-orange-packets-30',
  'metamucil-b257-real-sugar-orange-30',
  'metamucil-b257-sf-orange-30',
  'tinactin-b257-powder-spray-jock',
  'tinactin-b257-powder-spray-af',
]);

function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;
}

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 17) throw new Error(`batch257 row count ${ROWS.length}`);
const ids = ROWS.map((record) => record.id);
if (new Set(ids).size !== ids.length) throw new Error('batch257 duplicate id');
const barcodes = ROWS.map((record) => record.barcode).filter((code): code is string => Boolean(code));
if (new Set(barcodes).size !== barcodes.length) throw new Error('batch257 duplicate barcode');

for (const record of ROWS) {
  if (record.barcode && !upcOk(record.barcode)) throw new Error(`batch257 upc ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  if (MISSING_UPC.has(record.id)) {
    if (record.barcode) throw new Error(`batch257 barcode should stay blank ${record.id}`);
  } else if (!record.barcode || !upcOk(record.barcode)) {
    throw new Error(`batch257 missing upc ${record.id}`);
  }
  if (STACK_IDS.has(record.id)) {
    if (rollup.cause !== 'limited_stack') throw new Error(`batch257 ${record.id} cause ${rollup.cause}`);
    const expected = limitedStackHonestNoteIfAny(record.inactiveIngredients);
    if (!expected || record.honestNote !== expected) {
      throw new Error(`batch257 ${record.id} note ${record.honestNote} vs ${expected}`);
    }
  } else if (record.honestNote) {
    throw new Error(`batch257 unexpected honest note ${record.id}`);
  }
  if (HIGH_IDS.has(record.id) && rollup.cause !== 'high') {
    throw new Error(`batch257 ${record.id} cause ${rollup.cause}`);
  }
  if (record.id === 'benefiber-b257-sticks-unflavored-48' && rollup.cause !== 'clean') {
    throw new Error(`batch257 sticks cause ${rollup.cause}`);
  }
  if (record.id === 'tinactin-b257-jock-cream-15g') {
    const limited = rollup.cause === 'limited_1_2' ? rollup.driver : '';
    if (!limited.includes('Ceteth-20') || !limited.includes('Chlorocresol')) {
      throw new Error(`batch257 jock limited ${rollup.cause} ${rollup.driver}`);
    }
    if ((rollup.limitedStackTokens?.length ?? 0) >= 3) throw new Error('batch257 jock third limited');
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch257 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source)) {
      throw new Error(`batch257 pending ${ingredient.name}`);
    }
  }
  if (record.verdict !== expectedVerdict(record)) {
    throw new Error(`batch257 verdict ${record.id}: wrote ${record.verdict}, expected ${expectedVerdict(record)}`);
  }
}
