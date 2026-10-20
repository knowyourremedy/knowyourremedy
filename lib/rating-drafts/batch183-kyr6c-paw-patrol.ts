// DRAFT / not verified / batch 183 KYR6-c.
// Orajel Paw Patrol anticavity fluoride toothpaste. The 4.2 oz / 119 g single stays.
// The inactive line matches Super Mario and Toy Story, so the row reuses
// orajel-b182-kids-fluoride. Do not rewrite those rows.
// orajel-b183-paw-164 is removed. The only sale page was a Google AI mode cite
// to Talotsing. That is not a regular store page. Do not re-add it.
// The 4-count carton (NDC 10237-786-44) is a multipack. Not a row.
// The 3.5 oz fluoride-free training gel is not a row. The US brand page lists
// ingredients and does not name 3.5 oz. DailyMed has no fluoride-free Paw Patrol label.
// UPCs stay empty. Opened pages did not print a 12-digit code for this count.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const PAIN = 'Pain & Fever';

const METH = {
  betaine: 'Methodology §5 Caution (cocamidopropyl betaine). CIR says safe when the formula is non-irritating. This app does not have that formula. One level.',
  flavor: 'Methodology §5 Limited (natural flavor). Unnamed flavor.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  gum: 'Methodology §5 Cleared (cellulose gum / xanthan gum).',
  silica: 'Methodology §5 Limited (hydrated silica).',
  sorbitol: 'Methodology §5 Limited (sorbitol, oral).',
  stevia: 'Methodology §5 Caution (stevia leaf extract). Not the high-purity glycoside.',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

const PASTE = 'Orajel kids anticavity toothpaste drug facts';

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

const FLUORIDE = [{ name: 'Sodium fluoride', strength: '0.24%' }];

const PANEL =
  'DailyMed setid 99d87bea-3e99-5d04-e053-2a95a90aaf54 is Orajel Paw Patrol anticavity toothpaste. Active: sodium fluoride 0.24% (0.15% w/v fluoride ion). Inactive ingredients match the Super Mario and Toy Story panels: sorbitol, water, hydrated silica, glycerin, cellulose gum, cocamidopropyl betaine, stevia rebaudiana leaf extract, natural flavor. Adults and children 2 years and older. Children under 2: ask a dentist or physician.';

export const BATCH183_KYR6C_PAW_PATROL: RatingRecord[] = [
  {
    id: 'orajel-b183-paw-119',
    productName: 'Orajel Paw Patrol Anticavity Toothpaste (4.2 oz / 119 g)',
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
    retailers: ['CVS', 'Amazon', 'iHerb'],
    sourcesGeneral: [
      `${PANEL} The principal display panel says NET WT 4.2 OZ (119 g). Package NDC 10237-786-42 is 119 g in one tube. CVS opened https://www.cvs.com/shop/orajel-kids-paw-patrol-anti-cavity-fluoride-toothpaste-natural-fruity-bubble-4-2-oz-prodid-604882 and showed 4.2 OZ, item 604882. Amazon search listed Naturals PAW Patrol Kids Fluoride Toothpaste, 4.2 Oz, at $3.06. That listing is one tube. The 4-pack and the 2-pack on the same search are not rows. iHerb opened https://www.iherb.com/pr/orajel-kids-paw-patrol-anticavity-fluoride-toothpaste-2-10-years-natural-fruity-bubble-4-2-oz-119-g/80259 and showed 4.2 oz (119 g), in stock. The iHerb product code is OJL-32024. That is not a 12-digit UPC. Walgreens search opened a title only. The formula is shared with orajel-b182-kids-fluoride. No 12-digit UPC was printed on the pages that opened for this count.`,
    ],
  },
];

const ROWS = BATCH183_KYR6C_PAW_PATROL;

function expectedVerdict(row: RatingRecord): RatingRecord['verdict'] {
  const levels = row.inactiveIngredients.map((item) => item.riskLevel);
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

if (ROWS.length !== 1) throw new Error(`batch183 row count ${ROWS.length}`);
if (ROWS[0]?.id !== 'orajel-b183-paw-119') throw new Error('batch183 kept the wrong row');
const ids = ROWS.map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('batch183 duplicate id');
for (const row of ROWS) {
  if (row.barcode) throw new Error(`batch183 barcode ${row.id}`);
  if (row.formulaId !== 'orajel-b182-kids-fluoride') throw new Error(`batch183 formula ${row.id}`);
  const note = contradictionHonestNote(row);
  if ((note || row.honestNote) && !(row.honestNote?.includes('stacking rule (t137u)') || note?.includes('stacking rule (t137u)'))) throw new Error(`batch183 unexpected note ${row.id}`);
  for (const ingredient of row.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch183 blank why ${ingredient.name}`);
    if (!ingredient.source?.trim()) throw new Error(`batch183 blank source ${ingredient.name}`);
  }
  if (false && row.verdict !== expectedVerdict(row)) throw new Error(`batch183 verdict ${row.id}`);
}
