import { t240uNorm } from './t240uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

const LOCKS: Array<[string, string]> = [
  ['Zinc', 'Zinc is a mineral. It is included as a source of zinc.'],
  ['Magnesium', 'Magnesium is a mineral. It is included as a source of magnesium.'],
  ['Pregnenolone', 'Pregnenolone is a hormone precursor. It is included for its hormone-related compounds.'],
  ['Folate', 'Folate is a B vitamin. It is included as a source of folate.'],
  ['L-5-Methyltetrahydrofolate Calcium', 'L-5-methyltetrahydrofolate calcium is a form of folate. It is included as a source of folate.'],
  ['Phospholipid complex from Pea, Sunflower, Grape Seed', 'Phospholipid complex from pea, sunflower, and grape seed is a blend of plant phospholipids. It is included as an emulsifier and carrier.'],
  ['Indian Barberry extract', 'Indian barberry extract is an extract of the Indian barberry plant. It is included for its plant compounds.'],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, why]) => [t240uNorm(name), { grade: 'cleared', counts: false, why }]));

/** Exact strings. Variants are matched in t256uResolve, not stored as new locks. */
export function t310uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

function isLatinName(inner: string): boolean {
  const words = inner.replace(/\./g, '').split(/\s+/).filter(Boolean);
  if (words.length < 2 || words.length > 3) return false;
  if (!/^[A-Z]/.test(words[0])) return false;
  if (/extract|powder|fruit|root|leaf|oil|seed|complex|juice|acid|capsule/i.test(inner)) return false;
  return words.every((word) => /^[A-Za-z][A-Za-z-]{2,}$/.test(word));
}

function isSkippableParen(inner: string): boolean {
  const text = inner.trim();
  if (!text) return false;
  if (/%/.test(text) || /standardized\s+to/i.test(text)) return true;
  if (/[®™]/.test(text)) return true;
  if (/^(bionap|vitacholine)$/i.test(text.replace(/[®™]/g, '').trim())) return true;
  return isLatinName(text);
}

/**
 * Drop only a trailing Latin name, percentage, or brand parenthetical.
 * A dose, a ratio, Powder, or Buffered stays in the string.
 */
export function t310uPeel(name: string): string {
  let current = name.trim().replace(/\s+/g, ' ');
  for (let i = 0; i < 6; i += 1) {
    const match = current.match(/^(.*\S)\s*\(([^()]*)\)\s*$/);
    if (!match || !isSkippableParen(match[2])) break;
    current = match[1].trim();
  }
  return current;
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t310u duplicate');
for (const [name, why] of LOCKS) {
  const hit = t310uLock(name);
  if (hit?.why !== why || hit.grade !== 'cleared' || hit.counts !== false) throw new Error(`t310u ${name}`);
}
if (t310uLock('Zinc oxide')) throw new Error('t310u zinc oxide');
if (t310uLock('Magnesium Oxide')) throw new Error('t310u mag oxide');
if (t310uPeel('Organic Maca Root Powder (Lepidium meyenii)') !== 'Organic Maca Root Powder') throw new Error('t310u maca');
if (t310uPeel('Goji Berry Extract (fruit) (40% Polysaccharides) (Lycium barbarum)') !== 'Goji Berry Extract (fruit)') throw new Error('t310u goji');
if (t310uPeel('Resveratrol (Polygonum Cuspidatum - 50%)') !== 'Resveratrol') throw new Error('t310u resveratrol');
if (t310uPeel('Choline (as Choline L+Bitartrate) (VitaCholine®)') !== 'Choline (as Choline L+Bitartrate)') throw new Error('t310u choline');
if (t310uPeel("Vitamin D3 (from 2,500 IU's)") !== "Vitamin D3 (from 2,500 IU's)") throw new Error('t310u dose');
if (t310uPeel('Bitter Melon Fruit Extract (4:1) (Powder) (Momordica Charantia)') !== 'Bitter Melon Fruit Extract (4:1) (Powder)') throw new Error('t310u bitter');
if (t310uPeel('Albion® Magnesium Bisglycinate Chelate Buffered') !== 'Albion® Magnesium Bisglycinate Chelate Buffered') throw new Error('t310u buffered');
if (t310uPeel('Liposomal NMN™ (nicotinamide mononucleotide)') !== 'Liposomal NMN™ (nicotinamide mononucleotide)') throw new Error('t310u nmn expansion');
