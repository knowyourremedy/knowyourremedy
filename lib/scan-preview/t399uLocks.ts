import type { T320uHit } from './t320uLocks';
import { t398uResolve } from './t398uLocks';

const ALMOND = 'Almond butter is ground almonds. It is included for its plant compounds.';
const COCOA =
  'Cocoa extract is not Cleared cocoa powder. The cocoa powder lock says the powder is distinct from the extract. A named food extract that is not the powder stays Caution, the same posture as Carob Extract. It does not count toward the three-or-more Limited stack.';

const ALMOND_LOCK = { grade: 'cleared' as const, counts: false, why: ALMOND };
const COCOA_LOCK = { grade: 'moderate' as const, counts: false, why: COCOA };

function core(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Existing locks. Organic is an alias. Grades and the cocoa and Rebaudioside M whys stay. */
export function t399uResolve(name: string, form?: string): T320uHit | undefined {
  const key = core(name);
  if (key === 'almond butter' || key === 'organic almond butter' || key === 'non gmo almond butter') {
    return { lock: ALMOND_LOCK, mark: 't51u' };
  }
  if (key === 'cocoa extract' || key === 'organic cocoa extract') {
    return { lock: COCOA_LOCK, mark: 't399u' };
  }
  return t398uResolve(name, form);
}

if (t399uResolve('Almond Butter', 'liquid')?.lock.why !== ALMOND) throw new Error('t399u almond');
if (t399uResolve('Organic Almond Butter', 'liquid')?.lock.why !== ALMOND) throw new Error('t399u organic almond');
if (t399uResolve('Organic Almond Butter', 'liquid')?.lock.grade !== 'cleared') throw new Error('t399u almond grade');
if (t399uResolve('Organic Almond Butter', 'liquid')?.lock.counts) throw new Error('t399u almond stack');
if (t399uResolve('organic sprouted Almond Butter', 'liquid')?.mark === 't51u') throw new Error('t399u sprouted');
const cocoa = t399uResolve('Cocoa Extract', 'liquid');
const organicCocoa = t399uResolve('Organic Cocoa Extract', 'liquid');
if (cocoa?.lock.why !== COCOA || cocoa.lock.grade !== 'moderate' || cocoa.lock.counts) throw new Error('t399u cocoa');
if (organicCocoa?.lock.why !== cocoa?.lock.why || organicCocoa?.lock.grade !== 'moderate' || organicCocoa?.lock.counts) {
  throw new Error('t399u organic cocoa');
}
if (t399uResolve('organic Cacao extract', 'liquid')?.mark === 't399u') throw new Error('t399u cacao');
if (t399uResolve('Rebaudioside M', 'liquid')?.mark === 't399u' || t399uResolve('Rebaudioside M', 'liquid')?.mark === 't51u') {
  throw new Error('t399u reb');
}
if (t399uResolve('Vanilla Extract', 'liquid')?.mark !== 't398u') throw new Error('t399u vanilla');
