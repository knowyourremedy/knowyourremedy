import type { T320uHit } from './t320uLocks';
import { t400uResolve } from './t400uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const CURCUMIN = 'Curcumin is a compound from turmeric. It is included for its plant compounds.';
const KONJAC = 'Konjac is a plant fiber. It is included for its fiber content.';
const LYSINE = 'L-lysine is an amino acid. It is included for its amino acid content.';
const MAG = 'Magnesium bisglycinate is magnesium bound to glycine. It is included as a source of magnesium.';
const ORANGE = 'Organic orange oil is oil from orange peel. It is included for its plant compounds.';
const RHODIOLA = 'Rhodiola rosea extract is an extract of rhodiola root. It is included for its plant compounds.';
const ROWAN = 'Rowanberry extract is an extract of the rowanberry. It is included for its plant compounds.';
const SPROUTED = 'Organic sprouted almond butter is ground sprouted almonds. It is included for its plant compounds.';
const ACEROLA = 'Acerola fruit extract is an extract of the acerola fruit. It is included for its plant compounds.';
const CHARCOAL = 'Activated charcoal is processed carbon. It is included for its absorbent properties.';
const ADENOSYL = 'Adenosylcobalamin is a form of vitamin B12. It is included as a source of vitamin B12.';
const ALMOND_OIL = 'Almond oil is oil from almonds. It is included for its plant compounds.';
const ALOE = 'Organic aloe vera extract is an extract of the aloe plant. It is included for its plant compounds.';
const ANDRO = 'Andrographolide is a compound from andrographis. It is included for its plant compounds.';
const ANTRODIA = 'Antrodia mushroom powder is dried antrodia mushroom. It is included for its plant compounds.';
const APIGENIN = 'Apigenin is a flavonoid. It is included for its plant compounds.';
const APPLE = 'Apple pectin is a plant fiber from apples. It is included for its fiber content.';
const OIL = '[Named oil]. It is used as a fill in the softgel. [Name] is graded Caution as a fill and Limited when it is the base of the product (EFSA and FDA treat refined oils as distinct from whole-food oils).';

const CLEARED: Array<[string, string]> = [
  ['Curcumin', CURCUMIN],
  ['Konjac', KONJAC],
  ['L-Lysine', LYSINE],
  ['Magnesium Bisglycinate', MAG],
  ['Organic Orange Oil', ORANGE],
  ['Rhodiola rosea Extract', RHODIOLA],
  ['Rowanberry Extract', ROWAN],
  ['organic sprouted Almond Butter', SPROUTED],
  ['Acerola Fruit Extract', ACEROLA],
  ['Activated Charcoal', CHARCOAL],
  ['Adenosylcobalamin', ADENOSYL],
  ['Almond Oil', ALMOND_OIL],
  ['organic Aloe Vera extract', ALOE],
  ['Andrographolide', ANDRO],
  ['Antrodia Mushroom powder', ANTRODIA],
  ['Apigenin', APIGENIN],
  ['Apple Pectin', APPLE],
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t402u duplicate ${name}`);
  const prior = t400uResolve(name, 'liquid') || t400uResolve(name, 'softgel') || t400uResolve(name, 'powder');
  if (prior) throw new Error(`t402u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}

function stripParens(name: string): string {
  let current = name.trim();
  for (let i = 0; i < 6; i += 1) {
    const next = current.replace(/\s*\(([^()]*)\)/g, (full, inner: string) => {
      const text = inner.trim();
      if (/^(?:as\s+)?curcuminoids$/i.test(text)) return ' ';
      if (/^(root|leaf|fruit|seed|bark|flower)$/i.test(text)) return ' ';
      if (/^malpighia glabra(?:\s+l\.?)?$/i.test(text)) return ' ';
      return full;
    }).replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function isOrangeOil(name: string): boolean {
  const key = keyOf(name);
  if (/\bpeel\b/.test(key)) return false;
  return key === 'organic orange oil' || key === 'orange oil organic' || key === 'orange oil';
}

function isRhodiolaRosea(name: string): boolean {
  return keyOf(stripParens(name)) === 'rhodiola rosea extract';
}

function isSproutedAlmond(name: string): boolean {
  const key = keyOf(name).replace(/\borganic\b/g, ' ').replace(/\s+/g, ' ').trim();
  return key === 'sprouted almond butter';
}

function isAloeExtract(name: string): boolean {
  const key = keyOf(name).replace(/\borganic\b/g, ' ').replace(/\s+/g, ' ').trim();
  return key === 'aloe vera extract';
}

function isMctOil(name: string): boolean {
  const key = keyOf(name);
  return key === 'mct oil' || key === 'organic mct oil' || key === 'mct oil organic';
}

function isSeaBuckthorn(name: string): boolean {
  const key = keyOf(name).replace(/seabuckthorn/g, 'sea buckthorn').replace(/\borganic\b/g, ' ').replace(/\s+/g, ' ').trim();
  return key === 'sea buckthorn oil';
}

function formOil(form: string | undefined): Lock | undefined {
  const text = (form ?? '').toLowerCase();
  if (/\bsoftgel\b/.test(text)) return { grade: 'moderate', counts: false, why: OIL };
  if (/\bbase\b/.test(text)) return { grade: 'limited', counts: true, why: OIL };
  return undefined;
}

/** Cleared locks, plus the softgel-fill oil rule. An unclear oil role does not resolve. */
export function t402uResolve(name: string, form?: string): T320uHit | undefined {
  if (isMctOil(name) || isSeaBuckthorn(name)) {
    const oil = formOil(form);
    return oil ? { lock: oil, mark: 't402u' } : undefined;
  }
  const peeled = stripParens(name);
  const exact = BY_KEY.get(keyOf(peeled)) ?? BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't402u' };
  if (isOrangeOil(name)) return { lock: BY_KEY.get(keyOf('Organic Orange Oil'))!, mark: 't402u' };
  if (isRhodiolaRosea(name)) return { lock: BY_KEY.get(keyOf('Rhodiola rosea Extract'))!, mark: 't402u' };
  if (isSproutedAlmond(name)) return { lock: BY_KEY.get(keyOf('organic sprouted Almond Butter'))!, mark: 't402u' };
  if (isAloeExtract(name)) return { lock: BY_KEY.get(keyOf('organic Aloe Vera extract'))!, mark: 't402u' };
  return t400uResolve(name, form);
}

if (OIL !== '[Named oil]. It is used as a fill in the softgel. [Name] is graded Caution as a fill and Limited when it is the base of the product (EFSA and FDA treat refined oils as distinct from whole-food oils).') {
  throw new Error('t402u oil why');
}
if (t402uResolve('Curcumin (as Curcuminoids)', 'capsule')?.lock.why !== CURCUMIN) throw new Error('t402u curcumin');
if (t402uResolve('Rhodiola rosea Extract (root)', 'liquid')?.lock.why !== RHODIOLA) throw new Error('t402u rhodiola root');
if (t402uResolve('Rhodiola rosea extract', 'liquid')?.lock.why !== RHODIOLA) throw new Error('t402u rhodiola case');
if (t402uResolve('Rhodiola extract', 'liquid')?.mark === 't402u') throw new Error('t402u bare rhodiola');
if (t402uResolve('Organic Orange Oil', 'liquid')?.lock.why !== ORANGE) throw new Error('t402u orange');
if (t402uResolve('organic Orange peel Oil', 'liquid')?.mark === 't402u') throw new Error('t402u peel');
if (t402uResolve('Rowanberry Fruit Extract', 'liquid')?.mark === 't402u') throw new Error('t402u rowan fruit');
if (t402uResolve('Rowanberry Extract', 'liquid')?.lock.why !== ROWAN) throw new Error('t402u rowan');
if (t402uResolve('organic sprouted Almond Butter', 'liquid')?.lock.why !== SPROUTED) throw new Error('t402u sprouted');
if (t402uResolve('Almond Butter', 'liquid')?.mark === 't402u') throw new Error('t402u almond butter');
if (t402uResolve('Acerola Fruit Extract (Malpighia glabra L)', 'liquid')?.lock.why !== ACEROLA) throw new Error('t402u acerola');
if (t402uResolve('Magnesium Bisglycinate', 'liquid')?.lock.why !== MAG) throw new Error('t402u mag');
if (t402uResolve('Magnesium Bisglycinate Chelate', 'capsule')?.mark === 't402u') throw new Error('t402u mag chelate');
if (t402uResolve('L-Lysine', 'capsule')?.lock.why !== LYSINE) throw new Error('t402u lysine');
if (t402uResolve('Lysine', 'capsule')?.mark === 't402u') throw new Error('t402u bare lysine');
if (t402uResolve('Apple Pectin', 'powder')?.lock.why !== APPLE) throw new Error('t402u apple');
if (t402uResolve('Pectin', 'powder')?.mark === 't402u') throw new Error('t402u pectin');
if (t402uResolve('Adipic Acid', 'tablet')?.mark === 't402u') throw new Error('t402u adipic');
const mctFill = t402uResolve('Organic MCT Oil', 'softgel');
if (mctFill?.lock.grade !== 'moderate' || mctFill.lock.counts || mctFill.lock.why !== OIL) throw new Error('t402u mct fill');
if (t402uResolve('Organic MCT Oil', 'liquid')) throw new Error('t402u mct liquid');
const mctBase = t402uResolve('MCT Oil (Organic)', 'base');
if (mctBase?.lock.grade !== 'limited' || !mctBase.lock.counts || mctBase.lock.why !== OIL) throw new Error('t402u mct base');
if (t402uResolve('Medium Chain Triglycerides (MCT) Oil', 'softgel')?.mark === 't402u') throw new Error('t402u long mct');
const seaFill = t402uResolve('Organic Seabuckthorn Oil', 'softgel');
if (seaFill?.lock.grade !== 'moderate' || seaFill.lock.counts || seaFill.lock.why !== OIL) throw new Error('t402u sea fill');
if (t402uResolve('Sea Buckthorn Oil', 'liquid')) throw new Error('t402u sea liquid');
if (t402uResolve('organic Aloe Vera extract', 'liquid')?.lock.why !== ALOE) throw new Error('t402u aloe');
