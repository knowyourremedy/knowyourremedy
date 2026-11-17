import type { RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t259uLock } from './t259uLocks';
import { t322uLock, t322uResolve } from './t322uLocks';
import type { T320uHit } from './t320uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const ASHWA = 'Ashwagandha powder is dried ashwagandha root. It is included for its plant compounds.';
const ARGININE = 'L-arginine hydrochloride is a salt form of the amino acid arginine. It is included for its amino acid content.';
const THIAMIN = 'Thiamine hydrochloride is a form of vitamin B1. It is included as a source of thiamin.';
const CALCIUM = 'Calcium is a mineral. It is included as a source of calcium.';
const BORON = 'Boron is a mineral. It is included as a source of boron.';
const TRIBUTYRIN = 'Tributyrin is a triglyceride of butyric acid. It is included for its metabolic compounds.';

const LOCKS: Array<[string, Lock]> = [
  ['Ashwagandha powder (root)', { grade: 'cleared', counts: false, why: ASHWA }],
  ['L-Arginine (as L-Arginine Hydrochloride)', { grade: 'cleared', counts: false, why: ARGININE }],
  ['Thiamin (as Thiamine Hydrochloride)', { grade: 'cleared', counts: false, why: THIAMIN }],
  ['Calcium', { grade: 'cleared', counts: false, why: CALCIUM }],
  ['Boron', { grade: 'cleared', counts: false, why: BORON }],
  ['Tributyrin', { grade: 'cleared', counts: false, why: TRIBUTYRIN }],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));

const ROLE = /\s*\((?:b\d{1,2}|color|colour|coating|for color|for coloring)\)/gi;

function stripRole(name: string): string {
  return name.replace(ROLE, ' ').replace(/\s+/g, ' ').trim();
}

function outsideParens(name: string): string {
  return name.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordKey(name: string): string {
  return t240uNorm(name)
    .split(' ')
    .map((word) => (word.length > 3 ? word.replace(/s$/, '') : word))
    .filter(Boolean)
    .sort()
    .join(' ');
}

const MCT_KEY = wordKey('Medium Chain Triglycerides (MCT) Oil');

function pumpkinOil(name: string): boolean {
  const key = t240uNorm(name);
  return key.includes('pumpkin') && key.includes('oil');
}

function hempBlend(name: string): boolean {
  return /full-spectrum hemp extract blend/i.test(name) || /broad-spectrum hemp extract blend/i.test(name);
}

/** New exact strings. Irwin rows only. */
export function t323uLock(name: string): Lock | undefined {
  if (pumpkinOil(name) || hempBlend(name)) return undefined;
  const stripped = stripRole(name);
  const direct = BY_KEY.get(t240uNorm(stripped));
  if (direct) return direct;
  const outside = t240uNorm(outsideParens(stripped));
  for (const [lockName, lock] of LOCKS) {
    if (outside === t240uNorm(outsideParens(lockName))) return lock;
  }
  return undefined;
}

function caramelAlias(name: string): T320uHit | undefined {
  if (t240uNorm(name) !== 'caramel') return undefined;
  const lock = t322uLock('caramel (color)');
  if (!lock) return undefined;
  return { lock, mark: 't322u', from: 'caramel (color)' };
}

function mctAlias(name: string, form?: string): T320uHit | undefined {
  if (wordKey(name) !== MCT_KEY) return undefined;
  const lock = t259uLock('Medium Chain Triglycerides (MCT) Oil', form);
  if (!lock?.why) return undefined;
  return { lock, mark: 't259u', from: 'Medium Chain Triglycerides (MCT) Oil' };
}

/** Irwin rows only. Other brands are not restamped. */
export function t323uResolve(name: string, form?: string): T320uHit | undefined {
  if (pumpkinOil(name) || hempBlend(name)) return undefined;
  const own = t323uLock(name);
  if (own) return { lock: own, mark: 't323u' };
  const caramel = caramelAlias(name);
  if (caramel) return caramel;
  const mct = mctAlias(name, form);
  if (mct) return mct;
  const direct = t322uResolve(name, form);
  if (direct) return direct;
  const stripped = stripRole(name);
  if (stripped !== name) {
    const hit = t322uResolve(stripped, form) ?? (t323uLock(stripped) ? { lock: t323uLock(stripped)!, mark: 't323u' as const } : undefined);
    if (hit) return hit;
  }
  const outside = outsideParens(stripped);
  if (outside && t240uNorm(outside) !== t240uNorm(stripped)) {
    const hit = t322uResolve(outside, form);
    if (hit && /^\s*(?:zinc|magnesium|folate|riboflavin)\b/i.test(outside)) return { ...hit, from: outside };
  }
  const older = t259uLock(stripped, form);
  if (older?.why) return { lock: older, mark: 't259u' };
  return undefined;
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t323u duplicate');
for (const [name, lock] of LOCKS) {
  const hit = t323uLock(name);
  if (hit?.why !== lock.why || hit.grade !== 'cleared' || hit.counts !== false) throw new Error(`t323u ${name}`);
}
if (t323uLock('Boron (as Boron Citrate)')?.why !== BORON) throw new Error('t323u boron citrate');
if (t323uLock('Boron (as Boron Chelate)')?.why !== BORON) throw new Error('t323u boron chelate');
if (t323uLock('Boron Citrate')) throw new Error('t323u boron citrate words');
if (t323uLock('Calcium (as Calcium Carbonate and Calcium Citrate)')?.why !== CALCIUM) throw new Error('t323u calcium forms');
if (t323uLock('calcium ascorbate')) throw new Error('t323u calcium ascorbate');
if (t323uLock('L-Arginine')?.why !== ARGININE) throw new Error('t323u bare arginine');
if (t323uResolve('Thiamin (as Thiamine Hydrochloride) (B1)')?.lock.why !== THIAMIN) throw new Error('t323u thiamin b1');
if (t323uResolve('Niacin (as Niacinamide) (B3)')?.lock.why !== 'Niacinamide is a form of vitamin B3. It is included as a source of niacin.') throw new Error('t323u niacin b3');
if (t323uResolve('Pantothenic Acid (as D-Calcium Pantothenate) (B5)')?.lock.why !== 'D-calcium pantothenate is a form of pantothenic acid. It is included as a source of vitamin B5.') throw new Error('t323u panto b5');
if (t323uResolve('MCT (Medium Chain Triglyceride) Oil', 'softgel')?.lock.grade !== 'limited') throw new Error('t323u mct');
if (t323uResolve('caramel')?.lock.grade !== 'limited' || t323uResolve('caramel')?.from !== 'caramel (color)') throw new Error('t323u caramel');
if (t323uResolve('Pumpkin Oil (seed)', 'softgel')) throw new Error('t323u pumpkin');
if (t323uResolve('Pumpkin Oil (Cucurbita pepo L.) (seed)', 'softgel')) throw new Error('t323u pumpkin latin');
if (t323uResolve('Full-Spectrum Hemp extract blend (aerial)')) throw new Error('t323u full spectrum');
if (t323uResolve('Chlorella powder')) throw new Error('t323u chlorella');
if (t323uResolve('Hydrolyzed Collagen (Type I & III)')) throw new Error('t323u collagen');
if (t323uLock('Ashwagandha extract (root)')) throw new Error('t323u extract is not powder');
if (t323uResolve('Ashwagandha extract (root)')?.mark !== 't322u') throw new Error('t323u extract stays t322');
