import type { RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t320uResolve, type T320uHit } from './t320uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const B6 = 'Pyridoxine hydrochloride is a form of vitamin B6. It is included as a source of vitamin B6.';
const THEANINE = 'L-theanine is an amino acid found in tea. It is included for its amino acid compounds.';
const CHROMIUM = 'Chromium picolinate is chromium bound to picolinic acid. It is included as a source of chromium.';
const SELENIUM = 'L-selenomethionine is selenium bound to the amino acid methionine. It is included as a source of selenium.';
const ASHWA = 'KSM-66 ashwagandha extract is a standardized extract of ashwagandha root. It is included for its plant compounds.';
const NIACIN = 'Niacinamide is a form of vitamin B3. It is included as a source of niacin.';
const CAYENNE = 'Cayenne powder is dried cayenne fruit. It is included for its plant compounds.';
const PANTO = 'D-calcium pantothenate is a form of pantothenic acid. It is included as a source of vitamin B5.';
const GINSENG = 'Asian ginseng extract is an extract of Asian ginseng root. It is included for its plant compounds.';
const GREEN = 'Green tea extract is an extract of green tea leaf standardized to EGCG. It is included for its plant compounds.';
const GINKGO = 'Ginkgo extract is an extract of ginkgo leaf. It is included for its plant compounds.';
const COPPER = 'Copper citrate is copper bound to citric acid. It is included as a source of copper.';
const CARAMEL = 'Caramel (color) is a processed color. It is used to color the product. Caramel color is graded Limited as a processed color (EFSA 2011 re-evaluation of caramel colours).';
const HEMP_BASE = 'Cold-pressed hemp seed oil is oil from hemp seeds. It is the base of this liquid. Hemp oil is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

function b12(formName: string): string {
  return `${formName} is a form of vitamin B12. It is included as a source of vitamin B12.`;
}

const LOCKS: Array<[string, Lock]> = [
  ['Vitamin B6 (as Pyridoxine Hydrochloride)', { grade: 'cleared', counts: false, why: B6 }],
  ['L-Theanine', { grade: 'cleared', counts: false, why: THEANINE }],
  ['Chromium (as Chromium Picolinate)', { grade: 'cleared', counts: false, why: CHROMIUM }],
  ['Selenium (as L-Selenomethionine)', { grade: 'cleared', counts: false, why: SELENIUM }],
  ['KSM-66® Ashwagandha extract (root)', { grade: 'cleared', counts: false, why: ASHWA }],
  ['Niacin (as Niacinamide)', { grade: 'cleared', counts: false, why: NIACIN }],
  ['Cayenne powder (30,000 HU)(fruit)', { grade: 'cleared', counts: false, why: CAYENNE }],
  ['Pantothenic Acid (as D-Calcium Pantothenate)', { grade: 'cleared', counts: false, why: PANTO }],
  ['Asian Ginseng extract (root)', { grade: 'cleared', counts: false, why: GINSENG }],
  ['Green Tea extract (50% EGCG, 135 mg)(leaf)', { grade: 'cleared', counts: false, why: GREEN }],
  ['Ginkgo extract (leaf)', { grade: 'cleared', counts: false, why: GINKGO }],
  ['Copper (as Copper Citrate)', { grade: 'cleared', counts: false, why: COPPER }],
  ['Vitamin B12 (as Methylcobalamin)', { grade: 'cleared', counts: false, why: b12('Methylcobalamin') }],
  ['Vitamin B12 (as Cyanocobalamin)', { grade: 'cleared', counts: false, why: b12('Cyanocobalamin') }],
  ['caramel (color)', { grade: 'limited', counts: true, why: CARAMEL }],
];

function isLatin(inner: string): boolean {
  const words = inner.replace(/\./g, '').split(/\s+/).filter(Boolean);
  if (words.length < 2 || words.length > 3) return false;
  if (!/^[A-Z]/.test(words[0])) return false;
  if (/\b(?:extract|powder|fruit|root|leaf|oil|seed|as)\b/i.test(inner)) return false;
  return words.every((word) => /^[A-Za-z][A-Za-z-]{2,}$/.test(word));
}

function isAmountParen(inner: string): boolean {
  if (/%/.test(inner)) return true;
  if (/\d/.test(inner) && /\b(?:mg|mcg|µg|g|iu|hu)\b/i.test(inner)) return true;
  if (/^\d[\d,\s]*hu$/i.test(inner.trim())) return true;
  return false;
}

/** Drop brand marks, percentage or amount parentheses, and Latin names. Plant parts stay. */
export function t322uCore(name: string): string {
  let current = name.replace(/[®™]/g, ' ').replace(/\s+/g, ' ').trim();
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\(([^()]*)\)/g, (full, inner: string) => (
      isAmountParen(inner) || isLatin(inner) ? ' ' : full
    )).replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function bare(name: string): string {
  const core = t322uCore(name);
  const first = name.trim().split(/\s+/)[0] ?? '';
  if (/[®™]/.test(first)) return core.split(/\s+/).slice(1).join(' ');
  return core;
}

function coreKey(name: string): string {
  return t240uNorm(bare(name));
}

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [coreKey(name), lock]));
const CARAMEL_KEY = coreKey('caramel (color)');
const HEMP_KEY = t240uNorm('Cold-pressed hemp seed oil');

function lookup(name: string): Lock | undefined {
  return BY_KEY.get(coreKey(name));
}

/** Irwin rows only. Bare caramel is not this lock. Hemp oil is Limited only as a liquid base. */
export function t322uLock(name: string, form?: string): Lock | undefined {
  if (t240uNorm(name) === HEMP_KEY) {
    if (/\bliquid\b/.test((form ?? '').toLowerCase())) {
      return { grade: 'limited', counts: true, why: HEMP_BASE };
    }
    return undefined;
  }
  const hit = lookup(name);
  if (!hit) return undefined;
  if (hit.why === CARAMEL && !/\bcolor\b/i.test(name)) return undefined;
  return hit;
}

export function t322uResolve(name: string, form?: string): T320uHit | undefined {
  const own = t322uLock(name, form);
  if (own) return { lock: own, mark: 't322u' };
  return t320uResolve(name, form);
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t322u duplicate key');
for (const [name, lock] of LOCKS) {
  const hit = t322uLock(name, 'softgel');
  if (hit?.why !== lock.why || hit.grade !== lock.grade || hit.counts !== lock.counts) throw new Error(`t322u ${name}`);
}
if (t322uLock('AlphaWave® L-Theanine')?.why !== THEANINE) throw new Error('t322u alphawave');
if (t322uLock('Ashwagandha extract (root)')?.why !== ASHWA) throw new Error('t322u ashwagandha');
if (t322uLock('KSM-66® Ashwagandha extract (5% withanolides, 15 mg)(root)')?.why !== ASHWA) throw new Error('t322u ashwagandha percent');
if (t322uLock('KSM-66® Ashwagandha extract (root)(Organic)')) throw new Error('t322u organic ashwagandha');
if (t322uLock('Shoden® Ashwagandha extract (root, leaf)')) throw new Error('t322u shoden');
if (t322uLock('Green Tea extract (98% polyphenols, 264.6 mg, 50% EGCG, 135 mg)(leaf)')?.why !== GREEN) throw new Error('t322u green');
if (t322uLock('Ginkgo (Ginkgo biloba) extract (leaf)')?.why !== GINKGO) throw new Error('t322u ginkgo latin');
if (t322uLock('Ginkgo powder (leaf)')) throw new Error('t322u ginkgo powder');
if (t322uLock('Cayenne powder (fruit)')?.why !== CAYENNE) throw new Error('t322u cayenne fruit');
if (t322uLock('Cayenne (Capsicum annuum) extract (5% capsaicin, 1.5 mg)(fruit)')) throw new Error('t322u cayenne extract');
if (t322uLock('Asian Ginseng (Panax ginseng) extract (root)')?.why !== GINSENG) throw new Error('t322u ginseng latin');
if (t322uLock('Asian Ginseng extract (4% ginsenosides, 1.2 mg)(root)')?.why !== GINSENG) throw new Error('t322u ginseng percent');
if (t322uLock('Asian Ginseng (Panax notoginseng) extract (50:1)(root)')) throw new Error('t322u notoginseng');
if (t322uLock('Pantothenic Acid (as d-Calcium Pantothenate)')?.why !== PANTO) throw new Error('t322u panto case');
if (t322uLock('Pantothenic Acid (as D-Calcium Pantothenate) (B5)')) throw new Error('t322u panto b5');
if (t322uLock('caramel (color)')?.grade !== 'limited' || t322uLock('caramel (color)')?.counts !== true) throw new Error('t322u caramel');
if (t322uLock('caramel color')) throw new Error('t322u caramel color words');
if (t322uLock('caramel')) throw new Error('t322u bare caramel');
if (t322uLock('Cold-pressed hemp seed oil', 'liquid')?.grade !== 'limited') throw new Error('t322u hemp base');
if (t322uLock('Cold-pressed hemp seed oil', 'softgel')) throw new Error('t322u hemp fill stays t320');
if (t322uResolve('Cold-pressed hemp seed oil', 'softgel')?.lock.grade !== 'moderate') throw new Error('t322u hemp fill');
if (t322uLock('Vitamin B12 (as Methylcobalamin)')?.why !== b12('Methylcobalamin')) throw new Error('t322u methyl');
if (t322uLock('Vitamin B12 (as Cyanocobalamin)')?.why !== b12('Cyanocobalamin')) throw new Error('t322u cyano');
if (CARAMEL_KEY !== 'caramel') throw new Error('t322u caramel key');
