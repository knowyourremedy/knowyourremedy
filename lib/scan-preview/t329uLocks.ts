import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t328uResolve } from './t328uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function named(name: string): string {
  return `${name}. It is included for its plant or nutrient compounds.`;
}

const NAMES = [
  'Eleuthero extract (5:1)',
  'Marshmallow extract (10:1)',
  '5-HTP',
  'Acetyl-L-Carnitine',
  'Fennel extract (4:1)',
  'GABA',
  'Indian Frankincense (Boswellia) extract',
  'Licorice powder',
  'LJ100 Tongkat Ali extract',
  'Maté extract',
  'Phosphatidylserine',
  'Sweet Orange extract',
  'Blood Orange extract',
  'Velvet Bean extract',
  'White Tea extract',
] as const;

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare);
}

function stripParens(name: string): string {
  let current = name.replace(/[®™]/g, ' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\([^()]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function core(name: string): string {
  return fold(stripParens(name))
    .replace(/\b(purpurea|serrata|cassia)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const BY_KEY = new Map<string, Lock>();
function add(key: string, lock: Lock) {
  if (!BY_KEY.has(key)) BY_KEY.set(key, lock);
}

for (const name of NAMES) {
  const lock: Lock = { grade: 'cleared', counts: false, why: named(name) };
  const key = core(name);
  add(key, lock);
  if (key === '5 htp') {
    add('5 hydroxytryptophan', lock);
    add('l 5 hydroxytryptophan', lock);
  }
  if (key === 'gaba') {
    add('gamma aminobutyric acid', lock);
    add('gamma aminobutyric acid gaba', lock);
  }
  if (key === 'indian frankincense extract') add('boswellia extract', lock);
  if (key === 'lj100 tongkat ali extract') add('tongkat ali extract', lock);
  if (key === 'mate extract') add('yerba mate extract', lock);
  if (key === 'acetyl l carnitine') add('acetyl l carnitine hydrochloride', lock);
}

function formAlias(name: string, form?: string): T320uHit | undefined {
  const key = core(name);
  if (key === 'dandelion powder') return t328uResolve('Dandelion extract', form);
  if (key === 'stinging nettle powder' || key === 'nettle extract') return t328uResolve('Stinging Nettle extract', form);
  return undefined;
}

export function t329uLock(name: string): Lock | undefined {
  if (/sweet orange and blood orange/i.test(name)) return undefined;
  const key = core(name).replace(/\s+(?:extract|powder)$/ , (suffix, offset, text) => {
    const stem = text.slice(0, offset).trim();
    if (stem === '5 hydroxytryptophan' || stem === 'l 5 hydroxytryptophan' || stem === '5 htp') return '';
    return suffix;
  }).replace(/\s+/g, ' ').trim();
  return BY_KEY.get(key) ?? BY_KEY.get(core(name));
}

export function t329uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  if (/sweet orange and blood orange/i.test(name)) return undefined;
  const own = t329uLock(name);
  if (own) return { lock: own, mark: 't329u' };
  const alias = formAlias(name, form);
  if (alias) return alias;
  return t328uResolve(name, form);
}

if (t329uLock('Eleuthero extract (5:1)')?.why !== named('Eleuthero extract (5:1)')) throw new Error('t329u eleuthero why');
if (t329uResolve('Eleuthero (Eleutherococcus senticosus) extract (4:1)(root)', 'softgel')?.lock.why !== named('Eleuthero extract (5:1)')) throw new Error('t329u eleuthero ratio');
if (t329uResolve('Marshmallow extract (4:1)(root)', 'softgel')?.lock.why !== named('Marshmallow extract (10:1)')) throw new Error('t329u marshmallow');
if (t329uResolve('5-Hydroxytryptophan (5-HTP) (from Griffonia simplicifolia) extract (seed)', 'softgel')?.lock.why !== named('5-HTP')) throw new Error('t329u 5htp');
if (t329uResolve('5-Hydroxytryptophan (5-HTP)(from Griffonia simplicifolia) powder (seed)', 'softgel')?.lock.why !== named('5-HTP')) throw new Error('t329u 5htp powder');
if (t329uResolve('L-5-Hydroxytryptophan', 'softgel')?.lock.why !== named('5-HTP')) throw new Error('t329u l5');
if (t329uResolve('Gamma-Aminobutyric Acid (GABA)', 'softgel')?.lock.why !== named('GABA')) throw new Error('t329u gaba');
if (t329uResolve('Acetyl-L-Carnitine (as Acetyl-L-Carnitine Hydrochloride)', 'softgel')?.lock.why !== named('Acetyl-L-Carnitine')) throw new Error('t329u carnitine');
if (t329uResolve('L-Carnitine', 'softgel')) throw new Error('t329u plain carnitine');
if (t329uResolve('Indian Frankincense (Boswellia serrata) extract (65% boswellic acids, 52 mg)(resin)', 'softgel')?.lock.why !== named('Indian Frankincense (Boswellia) extract')) throw new Error('t329u boswellia');
if (t329uResolve('Licorice (Glycyrrhiza glabra) powder (root)', 'softgel')?.lock.why !== named('Licorice powder')) throw new Error('t329u licorice powder');
if (t329uResolve('LJ100® Tongkat Ali (Eurycoma longifolia) extract (40% glycosaponins, 40 mg and 22% eurypeptides, 22 mg)(root)', 'softgel')?.lock.why !== named('LJ100 Tongkat Ali extract')) throw new Error('t329u tongkat');
if (t329uResolve('Tongkat Ali (Long Jack)(Eurycoma longifolia) powder (100:1)(root)', 'softgel')) throw new Error('t329u tongkat powder');
if (t329uResolve('Maté (Yerba Maté) extract (20% caffeine, 75 mg)(leaf)', 'softgel')?.lock.why !== named('Maté extract')) throw new Error('t329u mate');
if (t329uResolve('Maté (Yerba Maté) powder (leaf)', 'softgel')) throw new Error('t329u mate powder');
if (t329uResolve('Phosphatidylserine', 'softgel')?.lock.why !== named('Phosphatidylserine')) throw new Error('t329u ps');
if (t329uResolve('Sweet Orange and Blood Orange (Citrus sinensis)(fruit) extracts', 'softgel')) throw new Error('t329u orange pair');
if (t329uResolve('Sweet Orange extract', 'softgel')?.lock.why !== named('Sweet Orange extract')) throw new Error('t329u sweet');
if (t329uResolve('Blood Orange extract', 'softgel')?.lock.why !== named('Blood Orange extract')) throw new Error('t329u blood');
if (t329uResolve('Velvet Bean (Mucuna pruriens) extract (seed)', 'softgel')?.lock.why !== named('Velvet Bean extract')) throw new Error('t329u velvet');
if (t329uResolve('White Tea extract (90% polyphenols)(leaf)', 'softgel')?.lock.why !== named('White Tea extract')) throw new Error('t329u white tea');
if (t329uResolve('Green Tea extract (leaf)', 'softgel')?.mark === 't329u') throw new Error('t329u green tea stays');
if (t329uResolve('Dandelion (Taraxacum officinale) powder (leaf)', 'softgel')?.lock.why !== 'Dandelion extract. It is included for its plant or nutrient compounds.') throw new Error('t329u dandelion powder');
if (t329uResolve('Stinging Nettle powder (leaf)', 'softgel')?.lock.why !== 'Stinging Nettle extract. It is included for its plant or nutrient compounds.') throw new Error('t329u nettle powder');
if (t329uResolve('Nettle (Urtica dioica) extract (4:1)(root)', 'softgel')?.lock.why !== 'Stinging Nettle extract. It is included for its plant or nutrient compounds.') throw new Error('t329u bare nettle');
if (t329uResolve('Fennel extract (4:1)(seed)', 'softgel')?.lock.why !== named('Fennel extract (4:1)')) throw new Error('t329u fennel');
if (t329uResolve('Fennel powder (seed)', 'softgel')) throw new Error('t329u fennel powder');
if (t329uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t329u blend');
