// DRAFT / not verified / batch 280 KYR6-d (t48u Sprouts stack, continued).
// Brand page is the single source. A pack is here only when that page shows it for sale
// and every other-ingredient token is already locked. Missing UPCs stay empty.
// Not in this file: BiOptimizers Magnesium Breakthrough 60 (goMCT® unlocked).
// Not the Lemme multipacks. Not the Grüns 84-count bags.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const METH = {
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose / cellulose family).',
  leucine: 'Methodology §5 Cleared (leucine / L-leucine).',
  hpmc: 'Methodology §5 Cleared (hypromellose / hydroxypropyl methylcellulose — HPMC family).',
  magStearate: 'Methodology §5 Cleared (magnesium stearate / stearate-family lubricant).',
  silica:
    'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap; does not count toward the t137u stack).',
  modifiedStarch:
    'Methodology §5 Limited (modified food starch / modified starch). Counts toward the t137u stack.',
  water: 'Methodology §5 Cleared (purified water / distilled water).',
  alcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol as a VEHICLE — oral homeopathic liquid or topical first-aid). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  riceFlour: 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.',
  gelatin: 'Methodology §5 Cleared (gelatin / Gelatin Capsule).',
  riceHull: 'Methodology §5 Cleared (rice hulls — rice-hull family; t120u).',
} as const;

type MethKey = keyof typeof METH;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${METH[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  brand: string,
  retailers: string[],
  productType: 'OTC' | 'Supplement',
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
    productSubtype?: string;
    homeopathicSubtype?: string;
  },
): RatingRecord {
  const audience = partial.audience ?? ADULT;
  const minAge = partial.minAge ?? (audience === 'kids' ? undefined : 18);
  const next: RatingRecord = {
    ...partial,
    brand,
    audience,
    recordStatus: UNVERIFIED,
    productType,
    retailers,
    barcode: partial.barcode ?? '',
  };
  if (minAge === undefined) delete next.minAge;
  else next.minAge = minAge;
  return finish(next);
}

const PHA =
  'Hyalogic brand page. Serving 1 capsule. The bottle is 30 capsules. Hyaluronic acid, N-acetyl glucosamine, MSM, and grape seed extract are the actives and are not graded. t48u brand-page single source.';
const PZINC =
  'Quantum Health brand page. Serving 1 capsule. The bottle is 100 capsules. Zinc gluconate is the active and is not graded. t48u brand-page single source.';
const PCDZ =
  'Quantum Health brand page. Serving 1 capsule. The bottle is 60 capsules. Vitamin C, vitamin D, and zinc are the actives and are not graded. t48u brand-page single source.';
const PELD_LIQ =
  'Quantum Health brand page. Serving 1 dropper (0.7 mL). The bottle is 2 oz, about 84 servings. Elderberry extract is the active and is not graded. The 30% on the alcohol line is the strength of the vehicle, not a new token. t48u brand-page single source.';
const PELD_CAP =
  'Quantum Health brand page. Serving 2 capsules. The bottle is 60 capsules. Elderberry extract is the active and is not graded. t48u brand-page single source.';
const PBURN =
  'Lemme brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. The B vitamins, Actiponin, and green tea extract are the actives and are not graded. t48u brand-page single source. The 3-pack and the 6-pack are multipacks and are not this row.';
const PGLP =
  'Lemme brand page. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Morosil, Eriomin, and Supresa are the actives and are not graded. t48u brand-page single source. The 2-pack, 3-pack, and 6-pack are multipacks and are not this row.';
const PMET =
  'Lemme brand page. Serving 1 capsule. The bottle is 30 capsules. Chromium, Akkermansia, and black ginger are the actives and are not graded. The page spells the ginger as Kaemperifa parviflora. t48u brand-page single source. The 2-pack and the 3-pack are multipacks and are not this row.';
const PRESCUE =
  'Nelsons US brand page https://www.nelsons.com/en-us/products/rescue-remedy-dropper-20ml. The 10 mL variant is for sale. Each flower is 5X HPUS and is an active. Inactive ingredient: Alcohol. Children under 12: ask a doctor. t48u brand-page single source. The 20 mL variant on this page has a price of 0 and is not this row.';

export const BATCH280_KYR6D_T48U: RatingRecord[] = [
  row('Hyalogic', ['Hyalogic'], 'Supplement', {
    id: 'hyalogic-b280-optimize-ha-30',
    productName: 'Hyalogic Optimize HA Capsules (30 capsules)',
    category: 'Vitamins',
    formulaId: 'hyalogic-b280-optimize-ha-30',
    form: 'capsule',
    barcode: '858259000995',
    activeIngredients: [
      { name: 'N-Acetyl Glucosamine', strength: '250 mg per capsule' },
      { name: 'Hyaluronic Acid', strength: '60 mg per capsule' },
      { name: 'MSM (Methyl Sulfonyl Methane)', strength: '100 mg per capsule' },
      { name: 'Grape Seed Extract', strength: '25 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(PHA, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PHA, 'L-Leucine', 'cleared', 'leucine'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't48u. Hyalogic brand page is the single source. https://www.hyalogic.com/products/optimize-ha-capsule is in stock. Serving 1 capsule. Servings per container 30. The page title says 120 mg. The panel says hyaluronic acid 60 mg per capsule. The panel was graded. Counted Limited tokens: none. No honest note. UPC 858259000995.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], 'Supplement', {
    id: 'quantum-b280-zinc-22-100',
    productName: 'Quantum Health Zinc 22 mg (100 capsules)',
    category: 'Vitamins',
    formulaId: 'quantum-b280-zinc-22-100',
    form: 'capsule',
    activeIngredients: [{ name: 'Zinc (as zinc gluconate)', strength: '22 mg per capsule' }],
    inactiveIngredients: [
      flag(PZINC, 'Hypromellose (Capsule)', 'cleared', 'hpmc'),
      flag(PZINC, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PZINC, 'Silicon Dioxide', 'limited', 'silica'),
      flag(PZINC, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't48u. Quantum Health brand page is the single source. https://www.quantumhealth.com/products/zinc is in stock. Serving 1 capsule. The bottle is 100 capsules. Zinc is the active and is not graded. Silicon dioxide is the 0-pt cap. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], 'Supplement', {
    id: 'quantum-b280-cdz-60',
    productName: 'Quantum Health CDZ Vitamin C, Vitamin D, and Zinc (60 capsules)',
    category: 'Immune Support',
    formulaId: 'quantum-b280-cdz-60',
    form: 'capsule',
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '500 mg per capsule' },
      { name: 'Vitamin D (as cholecalciferol)', strength: '25 mcg (1,000 IU) per capsule' },
      { name: 'Zinc (as zinc gluconate)', strength: '15 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(PCDZ, 'Hypromellose', 'cleared', 'hpmc'),
      flag(PCDZ, 'Microcrystalline Cellulose', 'cleared', 'mcc'),
      flag(PCDZ, 'Magnesium Stearate', 'cleared', 'magStearate'),
      flag(PCDZ, 'Modified Food Starch', 'limited', 'modifiedStarch'),
      flag(PCDZ, 'Silicon Dioxide', 'limited', 'silica'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't48u. Quantum Health brand page is the single source. https://www.quantumhealth.com/products/cdz is in stock. Serving 1 capsule. The bottle is 60 capsules. Vitamin C, vitamin D, and zinc are the actives and are not graded. Counted Limited token: modified food starch. That is one, so this is not a 3+ stack. Silicon dioxide is the 0-pt cap and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], 'Supplement', {
    id: 'quantum-b280-elderberry-liquid-2',
    productName: 'Quantum Health Elderberry 700 mg Immune Liquid Extract (2 oz)',
    category: 'Immune Support',
    formulaId: 'quantum-b280-elderberry-liquid-2',
    form: 'liquid',
    activeIngredients: [
      { name: 'Elderberry extract (Sambucus nigra)', strength: '700 mg per dropper (0.7 mL)' },
    ],
    inactiveIngredients: [
      flag(PELD_LIQ, 'Distilled Water', 'cleared', 'water'),
      flag(PELD_LIQ, 'Alcohol', 'limited', 'alcohol'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't48u. Quantum Health brand page is the single source. https://www.quantumhealth.com/products/elderberry-liquid-extract is in stock. Serving 1 dropper (0.7 mL). About 84 servings in 2 oz. Elderberry extract is the active and is not graded. Counted Limited token: alcohol. The 30% is the vehicle strength, not a new token. That is one, so this is not a 3+ stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('Quantum Health', ['Quantum Health'], 'Supplement', {
    id: 'quantum-b280-elderberry-cap-60',
    productName: 'Quantum Health Elderberry 400 mg Immune Support Capsules (60 capsules)',
    category: 'Immune Support',
    formulaId: 'quantum-b280-elderberry-cap-60',
    form: 'capsule',
    activeIngredients: [
      {
        name: 'Elderberry fruit standardized extract (Sambucus nigra)',
        strength: '400 mg per 2 capsules',
      },
    ],
    inactiveIngredients: [
      flag(PELD_CAP, 'Rice Flour', 'moderate', 'riceFlour'),
      flag(PELD_CAP, 'Purified Gelatin', 'cleared', 'gelatin'),
      flag(PELD_CAP, 'Water', 'cleared', 'water'),
      flag(PELD_CAP, 'Magnesium Stearate', 'cleared', 'magStearate'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't48u. Quantum Health brand page is the single source. https://www.quantumhealth.com/products/elderberry-standardized-extract-capsules is in stock. Serving 2 capsules. The bottle is 60 capsules. Elderberry extract is the active and is not graded. Counted Limited tokens: none. Rice flour is Caution and does not stack. No honest note. Missing UPC. No code was invented.',
    ],
  }),
  row('Lemme', ['Lemme'], 'Supplement', {
    id: 'lemme-b280-burn-60',
    productName: 'Lemme Burn Capsules (60 capsules)',
    category: 'Herbs',
    formulaId: 'lemme-b280-burn-60',
    form: 'capsule',
    barcode: '850037549436',
    activeIngredients: [
      { name: 'Vitamin B6 (as pyridoxal 5-phosphate)', strength: '5 mg per 2 capsules' },
      { name: 'Vitamin B12 (as methylcobalamin)', strength: '500 mcg per 2 capsules' },
      { name: 'Actiponin Gynostemma pentaphyllum extract (leaf)', strength: '450 mg per 2 capsules' },
      { name: 'Green tea extract (leaf)', strength: '250 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag(PBURN, 'Organic Brown Rice Flour', 'moderate', 'riceFlour'),
      flag(PBURN, 'Hypromellose Capsule', 'cleared', 'hpmc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't48u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-burn 1-pack is in stock. Serving 2 capsules. The bottle is 60 capsules, 30 servings. The B vitamins, Actiponin, and green tea extract are the actives and are not graded. Counted Limited tokens: none. Organic brown rice flour is Caution rice flour and does not stack. No honest note. UPC 850037549436 is the 1-pack. The 3-pack and the 6-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', ['Lemme'], 'Supplement', {
    id: 'lemme-b280-reset-glp1-60',
    productName: 'Lemme Reset GLP-1 Production Support Capsules (60 capsules)',
    category: 'Herbs',
    formulaId: 'lemme-b280-reset-glp1-60',
    form: 'capsule',
    barcode: '850058077871',
    activeIngredients: [
      { name: 'Morosil red orange fruit extract', strength: '400 mg per 2 capsules' },
      { name: 'Eriomin lemon fruit extract', strength: '200 mg per 2 capsules' },
      { name: 'Supresa saffron extract (stigma)', strength: '176.5 mg per 2 capsules' },
    ],
    inactiveIngredients: [
      flag(PGLP, 'Organic Rice Hulls', 'cleared', 'riceHull'),
      flag(PGLP, 'Hypromellose Capsule', 'cleared', 'hpmc'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't48u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-glp-1 1-pack is in stock. Serving 2 capsules. The bottle is 60 capsules, 30 servings. Morosil, Eriomin, and Supresa are the actives and are not graded. Counted Limited tokens: none. Organic rice hulls are the named rice-hull form, and that form is the honest note. UPC 850058077871 is the 1-pack. The 2-pack, 3-pack, and 6-pack are multipacks and are not this row.',
    ],
  }),
  row('Lemme', ['Lemme'], 'Supplement', {
    id: 'lemme-b280-metabolism-30',
    productName: 'Lemme Metabolism Akkermansia Capsules (30 capsules)',
    category: 'Digestive',
    formulaId: 'lemme-b280-metabolism-30',
    form: 'capsule',
    activeIngredients: [
      { name: 'Chromium (as chromium picolinate)', strength: '200 mcg per capsule' },
      { name: 'Akkermansia muciniphila MucT', strength: '50 mg per capsule' },
      { name: 'Black ginger root extract (Kaemperifa parviflora)', strength: '150 mg per capsule' },
    ],
    inactiveIngredients: [
      flag(PMET, 'Organic Rice Flour', 'moderate', 'riceFlour'),
      flag(PMET, 'Hypromellose Capsule', 'cleared', 'hpmc'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't48u. Lemme brand page is the single source. https://lemmelive.com/products/lemme-metabolism-capsules 1-pack is in stock. Serving 1 capsule. The bottle is 30 capsules. Chromium, Akkermansia, and black ginger are the actives and are not graded. The page spells the ginger Kaemperifa parviflora. Counted Limited tokens: none. Organic rice flour is Caution and does not stack. No honest note. Missing UPC. No code was invented. The 2-pack and the 3-pack are multipacks and are not this row.',
    ],
  }),
  row('Bach', ['Nelsons'], 'OTC', {
    id: 'bach-b280-rescue-dropper-10',
    productName: 'Bach RESCUE Remedy Dropper (10 mL)',
    category: 'Sleep',
    formulaId: 'bach-b280-rescue-dropper-10',
    form: 'liquid drops',
    minAge: 12,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    activeIngredients: [
      { name: 'Cherry Plum (Prunus cerasifera)', strength: '5X HPUS' },
      { name: 'Clematis (Clematis vitalba)', strength: '5X HPUS' },
      { name: 'Impatiens (Impatiens glandulifera)', strength: '5X HPUS' },
      { name: 'Rock Rose (Helianthemum nummularium)', strength: '5X HPUS' },
      { name: 'Star of Bethlehem (Ornithogalum umbellatum)', strength: '5X HPUS' },
    ],
    inactiveIngredients: [flag(PRESCUE, 'Alcohol', 'limited', 'alcohol')],
    verdict: 'caution',
    sourcesGeneral: [
      't48u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-remedy-dropper-20ml lists the 10 mL at $12.58 and in stock. The five flowers are the actives, each 5X HPUS, and are not graded. Counted Limited token: alcohol. That is one, so this is not a 3+ stack. No honest note. Children under 12: ask a doctor. Missing UPC. No code was invented. The 20 mL variant on this same page has a price of 0 and is not this row.',
    ],
  }),
];

const ROWS = BATCH280_KYR6D_T48U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string }> = {
  'hyalogic-b280-optimize-ha-30': { verdict: 'clean', cause: 'clean', counted: '' },
  'quantum-b280-zinc-22-100': { verdict: 'caution', cause: 'silicon_dioxide_cap', counted: '' },
  'quantum-b280-cdz-60': { verdict: 'caution', cause: 'limited_1_2', counted: 'Modified Food Starch' },
  'quantum-b280-elderberry-liquid-2': { verdict: 'caution', cause: 'limited_1_2', counted: 'Alcohol' },
  'quantum-b280-elderberry-cap-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b280-burn-60': { verdict: 'caution', cause: 'moderate', counted: '' },
  'lemme-b280-reset-glp1-60': { verdict: 'clean', cause: 'clean', counted: '' },
  'lemme-b280-metabolism-30': { verdict: 'caution', cause: 'moderate', counted: '' },
  'bach-b280-rescue-dropper-10': { verdict: 'caution', cause: 'limited_1_2', counted: 'Alcohol' },
};

const NOTE_IDS = new Set(['lemme-b280-reset-glp1-60']);

if (ROWS.length !== 9) throw new Error(`batch280 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch280 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (
    rollup.verdict !== expected.verdict ||
    rollup.cause !== expected.cause ||
    record.verdict !== expected.verdict
  ) {
    throw new Error(`batch280 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch280 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch280 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (Boolean(record.honestNote) !== NOTE_IDS.has(record.id)) {
    throw new Error(`batch280 note presence ${record.id} ${JSON.stringify(record.honestNote)}`);
  }
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch280 blank why ${record.id} ${ingredient.name}`);
    if (/pending dailymed review/i.test(why) || /pending dailymed review/i.test(ingredient.source ?? '')) {
      throw new Error(`batch280 pending ${ingredient.name}`);
    }
  }
}
