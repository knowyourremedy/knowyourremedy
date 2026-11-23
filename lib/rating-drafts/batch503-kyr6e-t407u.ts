// DRAFT / not verified / batch 503 KYR6-e (t407u).
// NAD+, Vitamin C, Super Greens, Beauty Peptide Complex, Coated Silver,
// and Magnesium L-Threonate.
// Avocado Oil on NAD+ is Caution because the product is a liquid and the oil is not the base.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t407uResolve } from '../scan-preview/t407uLocks';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const REB = 'Rebaudioside M is a high-purity stevia sweetener.';

function flag(panel: string, name: string, grade: RiskLevel, counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'high'
    ? 'Methodology §5 Avoid.'
    : grade === 'limited' && counts
      ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
      : grade === 'limited'
        ? 'Methodology §5 Limited. Does not count toward the t137u stack.'
        : grade === 'moderate'
          ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
          : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}`, ...(why ? { why } : {}) };
}

function gtin12(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i += 1) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function resolveName(name: string) {
  if (name === 'Rebaudioside M') return { lock: { grade: 'cleared' as const, counts: false, why: REB }, mark: 't146' };
  if (name === 'Vitamin C (as Sodium Ascorbate and Ascorbic Acid)') {
    const hit = t407uResolve('Vitamin C (as Ascorbic Acid, Sodium Ascorbate)', 'liquid');
    if (!hit) throw new Error('t407u vitamin c canonical');
    return hit;
  }
  const direct = t407uResolve(name, 'liquid');
  if (direct) return direct;
  const stripped = name.replace(/\b(?:certified\s+)?organic\b/ig, ' ').replace(/\s+/g, ' ').trim();
  if (stripped && stripped.toLowerCase() !== name.trim().toLowerCase()) {
    const hit = t407uResolve(stripped, 'liquid');
    if (hit) return hit;
  }
  throw new Error(`t407u unlocked ${name}`);
}

function stored(panel: string, name: string): IngredientFlag {
  const hit = resolveName(name);
  return flag(panel, name, hit.lock.grade, hit.lock.counts, hit.lock.why || undefined);
}

function row(args: {
  id: string;
  productName: string;
  barcode: string;
  panel: string;
  names: string[];
  source: string;
}): RatingRecord {
  return {
    id: args.id,
    productName: args.productName,
    brand: 'Cymbiotika',
    category: 'Vitamins',
    formulaId: args.id,
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Cymbiotika'],
    barcode: args.barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: args.names.map((name) => stored(args.panel, name)),
    verdict: 'caution',
    sourcesGeneral: [args.source],
  };
}

const nadNames = [
  'Niacin',
  'Trimethylglycine',
  'Nicotinamide Adenine Dinucleotide',
  'Phosphatidylcholine (from Sunflower Lecithin)',
  'Apigenin',
  'Caffeine (from Green Coffee Bean Extract)',
  'Lutein (from Lutemax 2020 Marigold Flower Extract)',
  'Zeaxanthin (from Lutemax 2020 Marigold Flower Extract)',
  'Organic Cassava Syrup',
  'Glycerin',
  'Water',
  'Avocado Oil',
  'Organic Cocoa Extract',
  'Sea Salt',
  'Organic Vanilla Extract',
  'Organic Vanilla Powder',
  'Organic Orange Extract',
  'Beta Pectin',
  'D-Alpha-Tocopherol',
  'Sodium Alginate',
  'Calcium Lactate',
];

function nad(count: string, barcode: string): RatingRecord {
  return row({
    id: `cymbiotika-b503-nad-${count.split(' ')[0]}`,
    productName: `NAD+ Orange Vanilla, ${count}`,
    barcode,
    panel: `Cymbiotika NAD+ Orange Vanilla, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: nadNames,
    source: `t407u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. NAD+ Orange Vanilla. Serving size 10 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Avocado Oil is Caution in this liquid and is not the base. Nicotinamide Adenine Dinucleotide is Cleared. Counted Limited tokens: Organic Cassava Syrup. That is one, so no 3+ note is stored.`,
  });
}

const vitaminCNames = [
  'Vitamin C (as Sodium Ascorbate and Ascorbic Acid)',
  'Biotin',
  'Potassium (as Potassium Bicarbonate)',
  'Phosphatidylcholine (from Sunflower Lecithin)',
  'Glycerin',
  'Water',
  'Organic Cassava Syrup',
  'Pectin',
  'Organic Vanilla Extract',
  'Organic Vanilla Powder',
  'Sodium Alginate',
  'Organic Orange Oil',
  'D-Alpha-Tocopherol',
  'Malic Acid',
  'Calcium Lactate',
  'Beta Carotene (color)',
  'Camu Camu Fruit Powder (Myrciaria Dubia)',
  'Rose Hip Fruit Extract (Rosa canina)',
  'Acerola Fruit Extract (Malpighia glabra L)',
  'Citrus Bioflavinoids',
];

function vitaminC(count: string, barcode: string): RatingRecord {
  return row({
    id: `cymbiotika-b503-vitamin-c-${count.split(' ')[0]}`,
    productName: `Vitamin C, ${count}`,
    barcode,
    panel: `Cymbiotika Vitamin C, ${count}. Brand site https://cymbiotika.com/en-us.`,
    names: vitaminCNames,
    source: `t407u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Vitamin C. Serving size 15 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. An iHerb title says 5 mL. The brand-site panel is the one stored. Walmart 850033146356 is not attached. No matching panel for that 30-count is on record. Citrus Bioflavinoids keeps that spelling. Counted Limited tokens: Organic Cassava Syrup and Beta Carotene (color). That is two, so no 3+ note is stored.`,
  });
}

export const BATCH503_KYR6E_T407U: RatingRecord[] = [
  nad('26 Count', '850025187916'),
  nad('12 Count', '850025187763'),
  vitaminC('28 Count', '850025187442'),
  vitaminC('12 Count', '850025187329'),
  row({
    id: 'cymbiotika-b503-super-greens-30',
    productName: 'Super Greens, 30 Count',
    barcode: '850025187152',
    panel: 'Cymbiotika Super Greens, REV03. Brand site https://cymbiotika.com/en-us.',
    names: [
      'Chlorophyll (Sodium Copper Chlorophyllin from Mulberry leaf)',
      'Organic Spinach Powder',
      'Organic Alfalfa Powder',
      'Organic Oat Grass Powder',
      'Organic Kale Powder',
      'Organic Spirulina',
      'Broccoli Seed Powder Extract (13% Glucoraphanin Powder)',
      'Purified Water',
      'Organic Glycerin',
      'Organic Cassava Syrup',
      'Malic Acid',
      'Lime Extract',
      'Apple Pectin',
      'Organic Lemon Oil',
      'Citrus Bioflavonoids',
    ],
    source: 't407u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Super Greens, REV03. Serving size 15 mL. 30 Count. iHerb barcode 850025187152. The check digit passes. Proprietary Super Greens Complex was split into its named parts. Citrus Bioflavonoids is the spelled lock, not Citrus Bioflavinoids. Counted Limited tokens: Organic Cassava Syrup. That is one, so no 3+ note is stored.',
  }),
  row({
    id: 'cymbiotika-b503-beauty-peptide-12',
    productName: 'Beauty Peptide Complex, 12 Count',
    barcode: '810214570080',
    panel: 'Cymbiotika Beauty Peptide Complex. Brand site https://cymbiotika.com/en-us.',
    names: [
      'Zinc (as Zinc Bisglycinate)',
      'Copper (as Copper Bisglycinate)',
      'Glycine',
      'Proline',
      'L-Lysine',
      'Bioactive Collagen Peptides (VERISOL)',
      'Wheat Seed Extract (Triticum vulgare) (Ceramosides)',
      'Hyaluronic Acid (as Sodium Hyaluronate)',
      'Silica (from Bamboo)',
      'Water',
      'Glycerin',
      'L-Malic Acid',
      'Organic Raspberry Powder',
      'Organic Vanilla Extract',
      'Organic Cacao Powder',
      'Organic Sunflower Lecithin',
      'Rowanberry Fruit Extract',
      'Fruit and Vegetable Juice (for Color)',
      'Rebaudioside M',
      'Vitamin E (d-alpha tocopheryl acetate)',
      'Calcium Lactate',
      'Sodium Alginate',
    ],
    source: 't407u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. Beauty Peptide Complex. Serving size 15 mL. 12 Count. Barcode 810214570080. The check digit passes. Tri-amino Acid Complex was split into Glycine, Proline, and L-Lysine. L-Malic Acid does not take Malic Acid. Silica (from Bamboo) is Caution and does not count. Counted Limited tokens: none. No 3+ note is stored.',
  }),
  row({
    id: 'cymbiotika-b503-coated-silver',
    productName: 'Coated Silver',
    barcode: '',
    panel: 'Cymbiotika Coated Silver. NIH DSLD label 253112.',
    names: [
      'Silver Nanoparticles',
      'Water',
      'Polysaccharides',
    ],
    source: 't407u. NIH DSLD label 253112 is the on-market panel. Coated Silver, liquid, oral, 1 drop. No verified UPC is on record, so none is attached. Silver Nanoparticles is Limited and counts. Polysaccharides is Cleared. Counted Limited tokens: Silver Nanoparticles. That is one, so no 3+ note is stored.',
  }),
  row({
    id: 'cymbiotika-b503-magnesium-l-threonate',
    productName: 'Magnesium L-Threonate Vanilla Cream',
    barcode: '',
    panel: 'Cymbiotika Magnesium L-Threonate Vanilla Cream. NIH DSLD label 336109.',
    names: [
      'Magnesium',
      'Magnesium L-Threonate',
      'Phosphatidylcholine',
      'Vitamin E',
      'D-Alpha-Tocopherol',
      'Glycerin',
      'Water, Purified',
      'Almond Butter',
      'Coconut Nectar',
      'Almond Oil',
      'Konjac',
      'Vanilla, Powder, Pure',
      'Vanilla Extract',
      'Celtic Sea Salt',
    ],
    source: 't407u. NIH DSLD label 336109 is the on-market panel. Magnesium L-Threonate Vanilla Cream. No verified UPC is on record, so none is attached. Magtein is the brand mark and is not a separate ingredient. Vanilla, Powder, Pure does not take Vanilla Extract or Vanilla Powder. Counted Limited tokens: Coconut Nectar. That is one, so no 3+ note is stored.',
  }),
];

if (BATCH503_KYR6E_T407U.length !== 8) throw new Error('t407u count');
const expect: Record<string, { barcode: string; limited: number; moderate: number }> = {
  'cymbiotika-b503-nad-26': { barcode: '850025187916', limited: 1, moderate: 2 },
  'cymbiotika-b503-nad-12': { barcode: '850025187763', limited: 1, moderate: 2 },
  'cymbiotika-b503-vitamin-c-28': { barcode: '850025187442', limited: 2, moderate: 0 },
  'cymbiotika-b503-vitamin-c-12': { barcode: '850025187329', limited: 2, moderate: 0 },
  'cymbiotika-b503-super-greens-30': { barcode: '850025187152', limited: 1, moderate: 0 },
  'cymbiotika-b503-beauty-peptide-12': { barcode: '810214570080', limited: 0, moderate: 1 },
  'cymbiotika-b503-coated-silver': { barcode: '', limited: 1, moderate: 0 },
  'cymbiotika-b503-magnesium-l-threonate': { barcode: '', limited: 1, moderate: 0 },
};
for (const item of BATCH503_KYR6E_T407U) {
  const spec = expect[item.id];
  if (!spec || item.verdict !== 'caution' || item.honestNote || item.barcode !== spec.barcode) throw new Error(`t407u row ${item.id}`);
  if (item.barcode && !gtin12(item.barcode)) throw new Error(`t407u gtin ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) throw new Error(`t407u avoid ${item.id}`);
  const limited = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt);
  const moderate = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'moderate');
  if (limited.length !== spec.limited || moderate.length !== spec.moderate) throw new Error(`t407u counts ${item.id}`);
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (rollup.verdict !== 'caution') throw new Error(`t407u rollup ${item.id} ${rollup.verdict}`);
  if (item.honestNote || (item.sourcesGeneral ?? []).some((line) => line.includes('three or more'))) {
    throw new Error(`t407u note ${item.id}`);
  }
}
const nadRow = BATCH503_KYR6E_T407U[0];
const avocado = nadRow.inactiveIngredients.find((ingredient) => ingredient.name === 'Avocado Oil');
if (avocado?.riskLevel !== 'moderate' || !avocado.why?.includes('not the base of the product')) throw new Error('t407u nad avocado');
const bio = BATCH503_KYR6E_T407U[2].inactiveIngredients.find((ingredient) => ingredient.name === 'Citrus Bioflavinoids');
if (bio?.riskLevel !== 'cleared' || !bio.why?.includes('are compounds')) throw new Error('t407u flavinoids');
