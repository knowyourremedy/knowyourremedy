// DRAFT / not verified / batch 176 KYR6-c.
// Gas-X Total Relief 30-count. ShopRite opened the count and printed the panel.
// The inactive line includes n-butyl alcohol.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const DIGESTIVE = 'Digestive';

const METH = {
  alcohol: 'Methodology §5 Caution (alcohol as a vehicle).',
  ammonium: 'Methodology §5 Caution (ammonium hydroxide).',
  beeswax: 'Methodology §5 Cleared (beeswax).',
  butyl: 'Methodology §5 Caution (n-butyl alcohol). Flavor solvent. Same as grain alcohol as a vehicle. Not tert-butyl alcohol.',
  carnauba: 'Methodology §5 Caution (carnauba wax).',
  citric: 'Methodology §5 Cleared (citric acid).',
  cornSyrup: 'Methodology §5 Caution (corn syrup).',
  dextrin: 'Methodology §5 Caution (bare dextrin).',
  dyes: 'Methodology §5 High-risk (FD&C dyes, including lakes).',
  ethyl: 'Methodology §5 Caution (ethyl acetate → flavor).',
  flavors: 'Methodology §5 Caution (flavors).',
  gum: 'Methodology §5 Cleared (gum arabic / acacia).',
  ink: 'Methodology §5 Caution (pharmaceutical ink).',
  isopropyl: 'Methodology §5 Caution (isopropyl alcohol).',
  lecithin: 'Methodology §5 Cleared (soy lecithin). The soy note stays on soy lecithin.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  paraben: 'Methodology §5 High-risk (parabens).',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral).',
  phosphoric: 'Methodology §5 Caution (phosphoric acid).',
  shellac: 'Methodology §5 Cleared (shellac).',
  sodiumBenzoate: 'Methodology §5 Caution (sodium benzoate).',
  sorbic: 'Methodology §5 Limited (sorbic acid).',
  sorbitol: 'Methodology §5 Limited (oral sorbitol).',
  sucrose: 'Methodology §5 Limited (sucrose).',
  tio2: 'Methodology §5 High-risk (titanium dioxide).',
  vegetableOil: 'Methodology §5 High-risk (vegetable oil in a chew). Same form as a gummy or a lozenge.',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

function flag(name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return {
    name,
    riskLevel,
    source: `ShopRite Gas-X Total Relief Maximum Strength Mixed Berries 30-count panel; ${meth}`,
  };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const DIGESTIVE_ALTS: CleanAlternative[] = [
  alt(
    'boiron-acidcalm',
    'No independently Clean conventional match for this active. Closest independently Clean Digestive peer is Boiron AcidCalm (homeopathic meltaway). Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
  alt(
    'phillips-mom-original',
    'Independently Clean adult conventional Digestive analog (Phillips Original Milk of Magnesia liquid). Form: liquid — labeled, not a hard filter (§6). Different active; cleanliness peer only.',
  ),
];

export const BATCH176_KYR6C_GASX_TOTAL: RatingRecord[] = [
  {
    id: 'gasx-b176-total-relief-30',
    productName: 'Gas-X Total Relief Maximum Strength Chewable Tablets, Mixed Berries (30 ct)',
    brand: 'Gas-X',
    category: DIGESTIVE,
    barcode: '300671328046',
    formulaId: 'gasx-b176-total-relief',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Simethicone', strength: '250 mg' },
      { name: 'Calcium carbonate', strength: '750 mg' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', METH.alcohol),
      flag('Ammonium hydroxide', 'limited', METH.ammonium),
      flag('Beeswax', 'cleared', METH.beeswax),
      flag('Carnauba wax', 'limited', METH.carnauba),
      flag('Citric acid', 'cleared', METH.citric),
      flag('Corn syrup', 'limited', METH.cornSyrup),
      flag('Dextrin', 'limited', METH.dextrin),
      flag('Ethyl acetate', 'limited', METH.ethyl),
      flag('FD&C Red 40', 'high', METH.dyes),
      flag('FD&C Red 40 Lake', 'high', METH.dyes),
      flag('FD&C Yellow 5 Lake (Tartrazine)', 'high', METH.dyes),
      flag('FD&C Yellow 6', 'high', METH.dyes),
      flag('FD&C Yellow 6 Lake', 'high', METH.dyes),
      flag('Flavors', 'limited', METH.flavors),
      flag('Gum arabic', 'cleared', METH.gum),
      flag('Isopropyl alcohol', 'limited', METH.isopropyl),
      flag('Maltodextrin', 'limited', METH.maltodextrin),
      flag('Methylparaben', 'high', METH.paraben),
      flag('N-butyl alcohol', 'limited', METH.butyl),
      flag('Pharmaceutical ink', 'limited', METH.ink),
      flag('Phosphoric acid', 'limited', METH.phosphoric),
      flag('Propylene glycol', 'moderate', METH.pg),
      flag('Propylparaben', 'high', METH.paraben),
      flag('Purified water', 'cleared', METH.water),
      flag('Shellac', 'cleared', METH.shellac),
      flag('Sodium benzoate', 'limited', METH.sodiumBenzoate),
      flag('Sorbic acid', 'limited', METH.sorbic),
      flag('Sorbitol', 'limited', METH.sorbitol),
      flag('Soy lecithin', 'cleared', METH.lecithin),
      flag('Sucrose', 'limited', METH.sucrose),
      flag('Titanium dioxide', 'high', METH.tio2),
      flag('Vegetable oil (coconut origin)', 'high', METH.vegetableOil),
    ],
    verdict: 'avoid',
    retailers: ['ShopRite'],
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      'ShopRite opened Gas-X Total Relief Maximum Strength Mixed Berries Chewable Tablets, 30 count, at $13.19. The product URL ties GTIN 00300671328046 to this 30-count, stored as UPC 300671328046. Inactive ingredients: alcohol, ammonium hydroxide, beeswax, carnauba wax, citric acid, corn syrup, dextrin, ethyl acetate, FD&C Red 40, FD&C Red 40 Lake, FD&C Yellow 5 Lake (tartrazine), FD&C Yellow 6, FD&C Yellow 6 Lake, flavors, gum arabic, isopropyl alcohol, maltodextrin, methylparaben, n-butyl alcohol, pharmaceutical ink, phosphoric acid, propylene glycol, propylparaben, purified water, shellac, sodium benzoate, sorbic acid, sorbitol, soy lecithin, sucrose, titanium dioxide, vegetable oil (coconut origin). Actives per tablet: simethicone 250 mg and calcium carbonate 750 mg. Adults and children 12 years of age and older: chew 1 or 2 tablets. Mixed Berries is the product name. The inactive line says Flavors.',
    ],
  },
];

const ROWS = BATCH176_KYR6C_GASX_TOTAL;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 1) throw new Error(`batch176 row count ${ROWS.length}`);
const row = ROWS[0];
if (!row.barcode || !upcOk(row.barcode)) throw new Error(`batch176 upc ${row.barcode}`);
if (row.verdict !== 'avoid') throw new Error('batch176 verdict');
if (row.honestNote) throw new Error('batch176 note');
if (row.formulaId === 'gasx-es-chewables' || row.formulaId === 'gasx-max-softgels') {
  throw new Error('batch176 formula reuse');
}
const butyl = row.inactiveIngredients.find((item) => item.name === 'N-butyl alcohol');
if (!butyl || butyl.riskLevel !== 'limited') throw new Error('batch176 butyl');
const oil = row.inactiveIngredients.find((item) => /vegetable oil/i.test(item.name));
if (!oil || oil.riskLevel !== 'high') throw new Error('batch176 oil');
for (const ingredient of row.inactiveIngredients) {
  if (!plainIngredientWhy(ingredient)) throw new Error(`batch176 blank why ${ingredient.name}`);
  if (/dailymed/i.test(ingredient.source ?? '')) throw new Error(`batch176 flag dailymed ${ingredient.name}`);
}
