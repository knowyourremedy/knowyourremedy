import type { T320uHit } from './t320uLocks';
import { t383uResolve } from './t383uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const LOCKS: Array<[string, string]> = [
  ['Vanilla Extract Powder', 'Vanilla extract powder is dried vanilla extract. It is included for its flavor.'],
  ['Organic Cassia Cinnamon', 'Organic cassia cinnamon is dried cinnamon bark. It is included for its plant compounds.'],
  ['Tahitian Lemon Powder', 'Tahitian lemon powder is dried lemon. It is included for its plant compounds.'],
  ['Cacao Powder', 'Cacao powder is dried cacao. It is included for its plant compounds.'],
  ['Orange Fruit Powder', 'Orange fruit powder is dried orange. It is included for its plant compounds.'],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of LOCKS) {
  const key = name.toLowerCase();
  if (BY_KEY.has(key)) throw new Error(`t392u duplicate ${name}`);
  const prior = t383uResolve(name, 'powder');
  if (prior && (prior.lock.grade !== 'cleared' || prior.lock.counts || prior.lock.why !== why)) {
    throw new Error(`t392u conflict ${name}`);
  }
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}

/** Activity units are not a distinct ingredient word. */
function enzymeBase(name: string): 'Lactase' | 'Protease' | 'Lipase' | undefined {
  const match = name.trim().match(/^(Lactase|Protease|Lipase)\s+[\d,.]+\s*(ALU\/g|HUT\/g|FIP\/g)$/i);
  if (!match) return undefined;
  const base = match[1].toLowerCase();
  if (base === 'lactase' && /alu\/g/i.test(match[2])) return 'Lactase';
  if (base === 'protease' && /hut\/g/i.test(match[2])) return 'Protease';
  if (base === 'lipase' && /fip\/g/i.test(match[2])) return 'Lipase';
  return undefined;
}

/** Cleared, do not stack. Exact strings only. Enzyme activity units use the existing enzyme lock. */
export function t392uResolve(name: string, form?: string): T320uHit | undefined {
  const own = BY_KEY.get(name.trim().toLowerCase());
  if (own) return { lock: own, mark: 't392u' };
  const base = enzymeBase(name);
  if (base) {
    const hit = t383uResolve(base, form);
    if (hit) return hit;
  }
  return t383uResolve(name, form);
}

for (const [name, why] of LOCKS) {
  const hit = t392uResolve(name, 'powder');
  if (hit?.mark !== 't392u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t392u ${name}`);
  }
}
const lactase = t383uResolve('Lactase', 'powder');
const lactaseUnits = t392uResolve('Lactase 100,000 ALU/g', 'powder');
if (!lactase || lactase.lock.grade !== 'cleared' || lactase.lock.counts) throw new Error('t392u lactase base');
if (!lactaseUnits || lactaseUnits.mark !== lactase.mark || lactaseUnits.lock.why !== lactase.lock.why || lactaseUnits.lock.grade !== 'cleared' || lactaseUnits.lock.counts) {
  throw new Error('t392u lactase units');
}
const protease = t383uResolve('Protease', 'powder');
const proteaseUnits = t392uResolve('Protease 5,000 HUT/g', 'powder');
if (!proteaseUnits || proteaseUnits.lock.why !== protease?.lock.why || proteaseUnits.mark !== protease?.mark) {
  throw new Error('t392u protease units');
}
const lipase = t383uResolve('Lipase', 'powder');
const lipaseUnits = t392uResolve('Lipase 100,000 FIP/g', 'powder');
if (!lipaseUnits || lipaseUnits.lock.why !== lipase?.lock.why || lipaseUnits.mark !== lipase?.mark) {
  throw new Error('t392u lipase units');
}
if (t392uResolve('Lactase', 'powder')?.mark === 't392u') throw new Error('t392u bare lactase');
if (t392uResolve('Pacran Cranberry concentrate powder', 'gummy')?.mark !== 't383u') throw new Error('t392u pacran');
