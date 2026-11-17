import { t240uNorm } from './t240uLocks';
import { t315uLock } from './t315uLocks';

type Lock = { grade: 'limited' | 'moderate'; counts: boolean; why: string };

const LOCKS: Array<[string, Lock]> = [
  ['Phytosterol Complex', {
    grade: 'limited',
    counts: true,
    why: 'Phytosterol complex is a plant sterol concentrate. It is included for its plant compounds. Phytosterols are graded Limited as a processed plant extract (EFSA and FDA treat refined sterol fractions as distinct from whole plants; matches existing Plant Sterols lock).',
  }],
  ['Alpha Lipoic Acid', {
    grade: 'limited',
    counts: true,
    why: 'Alpha lipoic acid is a sulfur-containing compound. It is included for its antioxidant activity. Alpha lipoic acid is graded Limited when used as an other ingredient (matches existing Limited lock on Solaray).',
  }],
  ['Organic Chlorella Powder', {
    grade: 'limited',
    counts: true,
    why: 'Organic chlorella powder is dried chlorella algae. It is included for its plant compounds. Organic chlorella powder is graded Limited (matches existing Limited locks on NOW rows).',
  }],
  ['Hydrolyzed Collagen Type I & III (bovine-sourced)', {
    grade: 'limited',
    counts: true,
    why: 'Hydrolyzed collagen type I and III is bovine collagen that has been broken down. It is included as a protein source. Hydrolyzed collagen is graded Limited as a processed animal-derived protein (FDA and EFSA treat hydrolyzed collagen as a refined ingredient).',
  }],
  ['Chondroitin Sulfate (bovine-sourced)', {
    grade: 'limited',
    counts: true,
    why: 'Chondroitin sulfate is a compound from bovine cartilage. It is included for its cartilage compounds. Chondroitin sulfate is graded Limited as a processed animal-derived ingredient (FDA guidance on cartilage extracts).',
  }],
  ['BioCell Collagen II ® (chicken-sourced)', {
    grade: 'limited',
    counts: true,
    why: 'BioCell Collagen II is a chicken-sourced collagen extract. It is included as a source of collagen. BioCell Collagen is graded Limited as a processed animal-derived protein (FDA and EFSA treat collagen extracts as refined ingredients).',
  }],
  ['UC-II® Standardized Cartilage (non-GMO chicken-sourced)', {
    grade: 'limited',
    counts: true,
    why: 'UC-II is standardized chicken cartilage. It is included for its cartilage compounds. UC-II is graded Limited as a processed animal-derived ingredient (FDA guidance on cartilage extracts).',
  }],
  ['Royal Jelly (6% 10-HDA)', {
    grade: 'limited',
    counts: true,
    why: 'Royal jelly is a secretion from honeybees. It is included for its bee compounds. Royal jelly is graded Limited as an animal-derived ingredient (FDA guidance on bee products).',
  }],
  ['Bioperine', {
    grade: 'moderate',
    counts: false,
    why: 'Bioperine is a standardized extract of black pepper. It is included to increase absorption. Bioperine is graded Caution as a concentrated piperine extract (matches existing Caution stamps).',
  }],
  ['Diindolylmethane (DIM)', {
    grade: 'moderate',
    counts: false,
    why: 'Diindolylmethane is a compound derived from cruciferous vegetables. It is included for its plant compounds. DIM is graded Caution as a concentrated extract (matches existing Caution stamps).',
  }],
  ['Silicon', {
    grade: 'moderate',
    counts: false,
    why: 'Silicon is a mineral. It is included as a source of silicon. Silicon is graded Caution when used as an other ingredient (matches existing Caution on naproxen).',
  }],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));

/** Supersedes the t315u Cleared locks for these exact strings. */
export function t316uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t316u duplicate');
for (const [name, lock] of LOCKS) {
  const hit = t316uLock(name);
  if (!hit || hit.why !== lock.why || hit.grade !== lock.grade || hit.counts !== lock.counts) throw new Error(`t316u ${name}`);
  if (lock.grade === 'limited' && lock.counts !== true) throw new Error(`t316u count ${name}`);
  if (lock.grade === 'moderate' && lock.counts !== false) throw new Error(`t316u caution ${name}`);
  if (t315uLock(name)) throw new Error(`t315u still locks ${name}`);
}
if (t315uLock('Delta, Gamma Tocotrienols')) throw new Error('t315u tocotrienol');
if (t316uLock('Delta, Gamma Tocotrienols')) throw new Error('t316u tocotrienol');
