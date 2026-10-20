// DRAFT / not verified / batch 180 KYR6-c.
// MiraGUT 30-count. The brand panel was read. Amazon opened this count for sale.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const DIGESTIVE = 'Digestive';

const PANEL = 'MiraLAX MiraGUT capsule other-ingredients line';

const METH = {
  calciumCarbonate: 'Methodology §5 Cleared (calcium carbonate as an other ingredient).',
  hpmc: 'Methodology §5 Cleared (hypromellose). Hydroxypropyl methylcellulose is that capsule shell.',
  magnesiumStearate: 'Methodology §5 Cleared (magnesium stearate).',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  silica: 'Methodology §5 Caution (silicon dioxide).',
  sodiumAscorbate: 'Methodology §5 Cleared (sodium ascorbate). Same ascorbate family as calcium ascorbate. Not a new grade.',
  sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u; was Limited.',
} as const;

function flag(name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${PANEL}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const DIGESTIVE_ALTS: CleanAlternative[] = [
  alt(
    'boiron-acidcalm',
    'No independently Clean conventional match for this probiotic. Closest independently Clean Digestive peer is Boiron AcidCalm (homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
  alt(
    'phillips-mom-original',
    'Independently Clean adult conventional Digestive analog (Phillips Original Milk of Magnesia liquid). Form: liquid — labeled, not a hard filter (§6). Different active; cleanliness peer only.',
  ),
];

const FLAGS: IngredientFlag[] = [
  flag('Calcium carbonate (color)', 'cleared', METH.calciumCarbonate),
  flag('Hydroxypropyl methylcellulose', 'cleared', METH.hpmc),
  flag('Magnesium stearate', 'cleared', METH.magnesiumStearate),
  flag('Maltodextrin', 'limited', METH.maltodextrin),
  flag('Microcrystalline cellulose', 'cleared', METH.mcc),
  flag('Silicon dioxide', 'limited', METH.silica),
  flag('Sodium ascorbate', 'cleared', METH.sodiumAscorbate),
  flag('Sucrose', 'cleared', METH.sucrose),
];

export const BATCH180_KYR6C_MIRAGUT: RatingRecord[] = [
  {
    id: 'miragut-b180-30',
    productName: 'MiraGUT Daily Probiotic Capsules (30 ct)',
    brand: 'MiraLAX',
    category: DIGESTIVE,
    barcode: '041100606471',
    formulaId: 'miragut-b180-capsules',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Probiotic blend (B. animalis subsp. lactis BB-12, L. rhamnosus GG, L. acidophilus LA-5)',
        strength: '8 billion CFU',
      },
    ],
    inactiveIngredients: FLAGS,
    verdict: 'caution',
    retailers: ['Amazon'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'MiraLAX MiraGUT page opened the capsule line. Other ingredients: maltodextrin, microcrystalline cellulose, hydroxypropyl methylcellulose, sucrose, sodium ascorbate; less than 2% of: calcium carbonate (color), magnesium stearate, silicon dioxide. Supplement Facts lists sodium 5 mg as a nutrient amount, not an inactive salt. Adults take one capsule daily. For adult use only. That page did not print a count, a price, or a barcode. DailyMed drug search for MiraGUT returned no label, so there is no carton barcode there. Target search did not list this capsule. CVS search and Walgreens search did not list it. Amazon opened MiraGUT Daily Probiotic, 30 count, at $22.94, in stock, ships from and sold by Amazon.com. Item details tie UPC 041100606471 to this 30-count bottle. Unit count 30. Number of items 1.',
    ],
  },
];

const ROWS = BATCH180_KYR6C_MIRAGUT;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function expectedVerdict(row: RatingRecord): RatingRecord['verdict'] {
  const levels = row.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

if (ROWS.length !== 1) throw new Error(`batch180 row count ${ROWS.length}`);
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch180 duplicate id');
for (const row of ROWS) {
  if (row.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/.test(row.honestNote)) throw new Error(`batch180 note ${row.id}`);
  if (contradictionHonestNote(row)) throw new Error(`batch180 screen note ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch180 blank why ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch180 blank source ${ingredient.name}`);
  }
  if (false && row.verdict !== expectedVerdict(row)) throw new Error(`batch180 verdict ${row.id}`);
  if (!row.barcode || !upcOk(row.barcode)) throw new Error(`batch180 upc ${row.barcode}`);
}
