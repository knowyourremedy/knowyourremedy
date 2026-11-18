import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t355uResolve } from './t355uLocks';

const TRIBULUS = 'Tribulus terrestris fruit extract is an extract of the tribulus fruit. It is included for its plant compounds.';
const COD_BASE = 'Norwegian cod liver oil is oil from cod liver. It is the base of this softgel. Cod liver oil is graded Caution when it is the base of a softgel and Limited or Avoid when it is the base of a chewable or liquid product (EFSA and FDA treat refined fish oils as distinct from whole-food oils).';

export function t356uResolve(name: string, form?: string): T320uHit | undefined {
  if (t240uNorm(name) === 'tribulus terrestris fruit extract as saponins') {
    return { lock: { grade: 'cleared', counts: false, why: TRIBULUS }, mark: 't356u' };
  }
  if (t240uNorm(name) === 'norwegian cod liver oil') {
    const text = (form ?? '').toLowerCase();
    if (/\bsoftgel\b/.test(text) && /\bbase\b/.test(text)) {
      return { lock: { grade: 'moderate', counts: false, why: COD_BASE }, mark: 't356u' };
    }
  }
  return t355uResolve(name, form);
}

const tribulus = t356uResolve('Tribulus terrestris Fruit Extract (as Saponins)', 'capsule');
if (tribulus?.mark !== 't356u' || tribulus.lock.grade !== 'cleared' || tribulus.lock.counts || tribulus.lock.why !== TRIBULUS) {
  throw new Error('t356u tribulus');
}
if (t356uResolve('Tribulus terrestris Fruit Extract', 'capsule')?.mark === 't356u') throw new Error('t356u bare tribulus');
const base = t356uResolve('Norwegian Cod Liver Oil', 'softgel base');
if (base?.mark !== 't356u' || base.lock.grade !== 'moderate' || base.lock.counts || base.lock.why !== COD_BASE) {
  throw new Error('t356u cod base');
}
const fill = t356uResolve('Norwegian Cod Liver Oil', 'softgel');
if (fill?.mark !== 't355u' || fill.lock.grade !== 'cleared' || fill.lock.counts) throw new Error('t356u cod fill');
if (t356uResolve('Norwegian Cod Liver Oil', 'capsule')?.mark === 't356u') throw new Error('t356u cod capsule');
if (t356uResolve('Norwegian Cod Liver Oil', 'liquid')?.mark === 't356u') throw new Error('t356u cod liquid');
if (t356uResolve('Cod Liver Oil', 'softgel base')?.mark === 't356u') throw new Error('t356u cod liver oil');
