// DRAFT / not verified / batch 173 KYR6-c.
// Three singles whose panels were already read and whose sale counts Brandon opened.
// Neo-Synephrine Severe is not in this file.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const COLD = 'Cold & Flu';
const ALLERGIES = 'Allergies';

const METH = {
  bkc: 'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid).',
  benzyl: 'Methodology §5 Caution (benzyl alcohol as topical inactive). Does not use the oral under-3 Avoid split. These sprays are not labeled for under 3.',
  camphor: 'Methodology §5 Caution (camphor as inactive). Not parked camphor as an active.',
  citric: 'Methodology §5 Cleared (citric acid). Anhydrous citric acid is the same acid.',
  citrate: 'Methodology §5 Cleared (citrate salts as buffers). Sodium citrate sits on that row.',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum).',
  edetate: 'Methodology §5 Caution (edetate disodium — EDTA Caution with edetate disodium dihydrate). Not the Cleared disodium EDTA trace row.',
  eucalyptol: 'Methodology §5 Caution (eucalyptol, when Inactive). Named chemical. Not a hidden flavor blend. Not the drug.',
  fragrance: 'Methodology §5 Caution (fragrance / parfum). Unnamed. Already the rule. Nasal spray uses that same Caution.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  menthol: 'Methodology §5 Caution (menthol, when Inactive in a spray). Named chemical. Not a hidden flavor blend. Not the drug.',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol).',
  pgNasal: 'Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this nasal spray. The oral row is the swallowed solvent. This is the topical form.',
  phosphate: 'Methodology §5 Cleared (phosphate salts — sodium phosphate dibasic and monobasic). Not phosphoric acid.',
  polysorbate: 'Methodology §5 Moderate-risk (polysorbate 80).',
  povidone: 'Methodology §5 Cleared (povidone).',
  seawater: 'Methodology §5 Cleared (seawater as the saline in a nasal spray). Not Evaporated Sea Water. Not Trace Minerals (From Seawater).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

const PG_NOTE =
  'Propylene glycol is Usable when it is swallowed. That is the form this app flags. This product is a nasal spray. The propylene glycol is the solvent in the spray, not a dose you swallow, so it did not pull this grade down.';

const SINEX_SEVERE_STACK_NOTE =
  ' Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzalkonium chloride, Benzyl alcohol, Edetate disodium, Fragrance.';

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const NASAL_ALTS: CleanAlternative[] = [
  alt(
    'xlear-nasal-spray-no-bkc',
    'Independently Clean saline nasal spray already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
  alt(
    'neilmed-sinus-rinse',
    'Independently Clean saline rinse packets already on main. Minimum age 2. Form labeled, not a hard filter (§6).',
  ),
];

const ALLERGY_PANEL = 'Afrin No Drip Allergy Sinus 0.5 oz panel';
const CHILD_PANEL = "Children's Afrin Saline Moisturizing 5 oz panel";
const SINEX_PANEL = 'Vicks Sinex Severe Original 15 mL panel';

const OXY = [{ name: 'Oxymetazoline hydrochloride', strength: '0.05%' }];

export const BATCH173_KYR6C_THREE_SINGLES: RatingRecord[] = [
  {
    id: 'afrin-b173-no-drip-allergy-05',
    productName: 'Afrin No Drip Allergy Sinus Nasal Spray (0.5 oz)',
    brand: 'Afrin',
    category: COLD,
    barcode: '041100015099',
    formulaId: 'afrin-b173-no-drip-allergy',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: [
      flag(ALLERGY_PANEL, 'Benzalkonium chloride solution', 'limited', METH.bkc),
      flag(ALLERGY_PANEL, 'Benzyl alcohol', 'limited', METH.benzyl),
      flag(ALLERGY_PANEL, 'Camphor', 'limited', METH.camphor),
      flag(ALLERGY_PANEL, 'Edetate disodium', 'limited', METH.edetate),
      flag(ALLERGY_PANEL, 'Eucalyptol', 'limited', METH.eucalyptol),
      flag(ALLERGY_PANEL, 'Menthol', 'limited', METH.menthol),
      flag(ALLERGY_PANEL, 'Microcrystalline cellulose', 'cleared', METH.mcc),
      flag(ALLERGY_PANEL, 'Carboxymethylcellulose sodium', 'cleared', METH.cmc),
      flag(ALLERGY_PANEL, 'Polyethylene glycol', 'moderate', METH.peg),
      flag(ALLERGY_PANEL, 'Povidone', 'cleared', METH.povidone),
      flag(ALLERGY_PANEL, 'Purified water', 'cleared', METH.water),
      flag(ALLERGY_PANEL, 'Sodium phosphate dibasic', 'cleared', METH.phosphate),
      flag(ALLERGY_PANEL, 'Sodium phosphate monobasic', 'cleared', METH.phosphate),
    ],
    verdict: 'avoid',
    honestNote:
      'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Benzalkonium chloride solution, Benzyl alcohol, Camphor, Edetate disodium, Eucalyptol, Menthol.',
    retailers: [],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'Afrin.com No Drip Allergy Sinus is a 0.5 oz (15 mL) pump mist. Oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride solution, benzyl alcohol, camphor, edetate disodium, eucalyptol, menthol, microcrystalline cellulose and carboxymethylcellulose sodium, polyethylene glycol, povidone, purified water, sodium phosphate dibasic, sodium phosphate monobasic. No propylene glycol. Menthol and eucalyptol are under Inactive. Ages 6 to under 12 with an adult. Under 6, ask a doctor. UPC 041100015099 is this 0.5 oz single.',
    ],
  },
  {
    id: 'afrin-b173-childrens-saline-5',
    productName: "Children's Afrin Saline Moisturizing Daily Nasal Mist (5 oz)",
    brand: 'Afrin',
    category: ALLERGIES,
    barcode: '041100603869',
    formulaId: 'afrin-b172-seawater-09',
    audience: KIDS,
    minAge: 0.5,
    form: 'nasal mist',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Seawater', strength: 'diluted to 0.9% w/v sodium chloride' }],
    inactiveIngredients: [
      flag(CHILD_PANEL, 'Purified water', 'cleared', METH.water),
      flag(CHILD_PANEL, 'Seawater', 'cleared', METH.seawater),
    ],
    verdict: 'clean',
    retailers: [],
    sourcesGeneral: [
      "Afrin.com Children's Saline Moisturizing is a 5.0 oz drug-free mist. Ingredients: purified water, seawater diluted to 0.9% w/v sodium chloride. That is the same inactive line as Afrin Saline Burst Moisturizing. Infants under 6 months, ask a pediatrician. Directions start at 6 months. UPC 041100603869 is this 5 oz single.",
    ],
  },
  {
    id: 'sinex-b173-severe-original-15',
    productName: 'Vicks Sinex Severe Original Nasal Spray (15 mL)',
    brand: 'Vicks',
    category: COLD,
    barcode: '323900012523',
    formulaId: 'sinex-b172-vapocool',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: OXY,
    inactiveIngredients: [
      flag(SINEX_PANEL, 'Benzalkonium chloride', 'limited', METH.bkc),
      flag(SINEX_PANEL, 'Benzyl alcohol', 'limited', METH.benzyl),
      flag(SINEX_PANEL, 'Citric acid anhydrous', 'cleared', METH.citric),
      flag(SINEX_PANEL, 'Edetate disodium', 'limited', METH.edetate),
      flag(SINEX_PANEL, 'Fragrance', 'limited', METH.fragrance),
      flag(SINEX_PANEL, 'Polysorbate 80', 'moderate', METH.polysorbate),
      flag(SINEX_PANEL, 'Propylene glycol', 'cleared', METH.pgNasal),
      flag(SINEX_PANEL, 'Purified water', 'cleared', METH.water),
      flag(SINEX_PANEL, 'Sodium citrate', 'cleared', METH.citrate),
    ],
    verdict: 'avoid',
    honestNote: `${PG_NOTE}${SINEX_SEVERE_STACK_NOTE}`,
    retailers: [],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4644c4ae-9607-d404-e063-6294a90aca24. Vicks Sinex Severe, 15 mL single, not the ultra fine mist. Oxymetazoline hydrochloride 0.05%. Inactive ingredients: benzalkonium chloride, benzyl alcohol, citric acid anhydrous, edetate disodium, fragrance, polysorbate 80, propylene glycol, purified water, sodium citrate. That is the same inactive line as Vicks Sinex Severe VapoCool Ultra Fine Mist. No menthol and no eucalyptol. Adults and children 6 and older. The box bars on this 15 mL single read UPC 323900012523.',
    ],
  },
];

const ROWS = BATCH173_KYR6C_THREE_SINGLES;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 3) throw new Error(`batch173 row count ${ROWS.length}`);

const codes = ROWS.map((row) => row.barcode);
if (new Set(codes).size !== codes.length) throw new Error('batch173 shared upc');
for (const code of codes) {
  if (!code || !upcOk(code)) throw new Error(`batch173 upc ${code}`);
}

const byId = Object.fromEntries(ROWS.map((row) => [row.id, row]));

if (byId['afrin-b173-no-drip-allergy-05'].formulaId === 'afrin-b172-no-drip-severe') {
  throw new Error('batch173 allergy reused severe');
}
if (byId['afrin-b173-childrens-saline-5'].formulaId !== 'afrin-b172-seawater-09') {
  throw new Error('batch173 saline formula');
}
if (byId['sinex-b173-severe-original-15'].formulaId !== 'sinex-b172-vapocool') {
  throw new Error('batch173 sinex formula');
}

const MENTHOL_WHY =
  'Menthol is a named chemical, not a hidden flavor blend. On this label it is the cooling inactive, not the drug. That is why it is Usable.';
const EUCALYPTOL_WHY =
  'Eucalyptol is a named chemical, not a hidden flavor blend. In this spray it is the scent inactive, not the drug. That is why it is Usable.';
const FRAGRANCE_WHY =
  'This is an unnamed fragrance. The word hides the mixture, so you cannot see the solvents or the carriers. That is why it is Usable.';

for (const row of ROWS) {
  const note = row.honestNote ?? '';
  const hasPg = row.inactiveIngredients.some((item) => item.name === 'Propylene glycol');
  if (hasPg) {
    if (!note.startsWith(PG_NOTE)) throw new Error(`batch173 note ${row.id}`);
  } else if (note && !note.includes('stacking rule (t137u)')) {
    throw new Error(`batch173 extra note ${row.id}`);
  }
  if (row.verdict === 'clean' && row.inactiveIngredients.some((item) => item.riskLevel !== 'cleared')) {
    throw new Error(`batch173 clean grade ${row.id}`);
  }
  const joined = (row.sourcesGeneral ?? []).join(' ');
  if (row.brand === 'Afrin' && /dailymed/i.test(joined)) throw new Error(`batch173 dailymed ${row.id}`);
  if (row.brand === 'Vicks' && !/dailymed/i.test(joined)) throw new Error(`batch173 sinex panel ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch173 blank why ${row.id} ${ingredient.name}`);
    if (ingredient.name === 'Menthol' && why !== MENTHOL_WHY) throw new Error('batch173 menthol why');
    if (ingredient.name === 'Eucalyptol' && why !== EUCALYPTOL_WHY) throw new Error('batch173 eucalyptol why');
    if (ingredient.name === 'Fragrance' && why !== FRAGRANCE_WHY) throw new Error('batch173 fragrance why');
    if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch173 flag dailymed ${ingredient.name}`);
  }
}
