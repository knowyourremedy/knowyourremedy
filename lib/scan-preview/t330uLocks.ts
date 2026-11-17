import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t329uResolve } from './t329uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function named(name: string): string {
  return `${name}. It is included for its plant or nutrient compounds.`;
}

const NAMES = [
  'Alfalfa',
  'Alfalfa powder',
  'American Ginseng powder',
  'Asian Ginseng powder',
  'Asparagus',
  'Astragalus powder',
  'Bacopa extract (10:1)',
  'Barley Grass powder',
  'Black Elder extract',
  'Broccoli',
  'Broccoli powder',
  'Brussels Sprouts',
  'Bupleurum powder',
  'Cabbage',
  'California Poppy extract (4:1)',
  "Cat's Claw powder",
  'Chaste Tree extract',
  'Chasteberry extract (10:1)',
  'Citrus extract',
  'Collards',
  'Dong Quai extract (10:1)',
  'English Lavender extract (4:1)',
  'Garlic',
  'Grains of Paradise extract',
  'Gymnema extract (20:1)',
  'Hops extract (4:1)',
  'Horsetail extract',
  'Kale powder',
  'L-Histidine Hydrochloride',
  'L-Isoleucine',
  'L-Leucine',
  'L-Lysine Hydrochloride',
  'L-Methionine',
  'L-Phenylalanine',
  'L-Threonine',
  'L-Valine',
  'Muira Puama extract',
  'Onion',
  'Pygeum extract',
  'Red Spinach extract',
  'Rugose Rose extract',
  'Saffron extract',
  'Schisandra extract',
  'Shatavari extract',
  'Spinach',
  'Uva Ursi extract',
] as const;

const PART = new Set(['root', 'leaf', 'fruit', 'seed', 'aerial', 'bulb', 'bark', 'herb', 'flower', 'stigma']);

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare).replace(/uvaursi/g, 'uva ursi').replace(/cornsilk/g, 'corn silk');
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

function stripBrands(text: string): string {
  let tokens = text.split(/\s+/).filter(Boolean);
  const brand = (token: string) => /[®™]/.test(token)
    || /[a-z][A-Z]/.test(token)
    || /^(?:oxystorm|thermogp|saffractiv|saffserene|primavie|aqtiv)$/.test(fold(token));
  while (tokens.length > 1 && brand(tokens[0])) tokens = tokens.slice(1);
  if (tokens[0] && fold(tokens[0]) === 'saffr' && tokens[1] && fold(tokens[1]) === 'activ') tokens = tokens.slice(2);
  if (tokens[0] && fold(tokens[0]) === 'saff' && tokens[1] && fold(tokens[1]) === 'serene') tokens = tokens.slice(2);
  if (tokens[0] && fold(tokens[0]) === 'calori' && tokens[1] && /^burn$/i.test(tokens[1])) tokens = tokens.slice(2);
  if (tokens[0] && /^gp$/i.test(tokens[0])) tokens = tokens.slice(1);
  return tokens.join(' ');
}

const BY_KEY = new Map<string, Lock>();
function add(key: string, lock: Lock) {
  if (key && !BY_KEY.has(key)) BY_KEY.set(key, lock);
}

for (const name of NAMES) {
  const lock: Lock = { grade: 'cleared', counts: false, why: named(name) };
  add(fold(stripParens(name)), lock);
}
add('black elderberry extract', BY_KEY.get('black elder extract')!);
add('rose hip extract', BY_KEY.get('rugose rose extract')!);
add('lysine hydrochloride', BY_KEY.get('l lysine hydrochloride')!);
add('histidine hydrochloride', BY_KEY.get('l histidine hydrochloride')!);

function core(name: string): string {
  const asInner = name.match(/\(\s*as\s+([^)]+)\)/i);
  const base = stripBrands(stripParens(asInner ? asInner[1] : name));
  let key = fold(base);
  const words = key.split(' ').filter(Boolean);
  if (words.length > 1 && PART.has(words[words.length - 1]) && BY_KEY.has(words.slice(0, -1).join(' '))) {
    key = words.slice(0, -1).join(' ');
  }
  return key;
}

function founderAlias(name: string, form?: string): T320uHit | undefined {
  const key = fold(stripBrands(stripParens(name)));
  if (key === 'mate powder' || key === 'yerba mate powder') return t329uResolve('Maté extract', form);
  if (key === 'tongkat ali powder' || key === 'long jack powder') return t329uResolve('LJ100 Tongkat Ali extract', form);
  if (key === 'fennel powder') return t329uResolve('Fennel extract (4:1)', form);
  if (key === 'beet') return t329uResolve('Beet powder', form);
  if (key === 'licorice extract') return t329uResolve('Licorice powder', form);
  return undefined;
}

export function t330uLock(name: string): Lock | undefined {
  return BY_KEY.get(core(name));
}

export function t330uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  const alias = founderAlias(name, form);
  if (alias) return alias;
  const prior = t329uResolve(name, form);
  if (prior) return prior;
  const own = t330uLock(name);
  return own ? { lock: own, mark: 't330u' } : undefined;
}

if (BY_KEY.get('alfalfa')?.why !== named('Alfalfa')) throw new Error('t330u alfalfa why');
if (t330uResolve('Alfalfa (aerial)', 'softgel')?.lock.why !== named('Alfalfa')) throw new Error('t330u alfalfa');
if (t330uResolve('Alfalfa powder (aerial)', 'softgel')?.lock.why !== named('Alfalfa powder')) throw new Error('t330u alfalfa powder');
if (t330uResolve('Alfalfa extract', 'softgel')) throw new Error('t330u alfalfa extract');
if (t330uResolve('Bacopa extract (40% bacosides, 150 mg)(whole plant)', 'softgel')?.lock.why !== named('Bacopa extract (10:1)')) throw new Error('t330u bacopa');
if (t330uResolve('Citrus (Citrus spp.) extract (50% bioflavonoids, 50 mg)(fruit)', 'softgel')?.lock.why !== named('Citrus extract')) throw new Error('t330u citrus');
if (t330uResolve("Cat's Claw powder (bark)", 'softgel')?.lock.why !== named("Cat's Claw powder")) throw new Error('t330u cats');
if (t330uResolve('L-Histidine (as L-Histidine Hydrochloride)', 'softgel')?.lock.why !== named('L-Histidine Hydrochloride')) throw new Error('t330u histidine');
if (t330uResolve('Lysine (as Lysine Hydrochloride)', 'softgel')?.lock.why !== named('L-Lysine Hydrochloride')) throw new Error('t330u lysine');
if (t330uResolve('L-Isoleucine', 'softgel')?.lock.why !== named('L-Isoleucine')) throw new Error('t330u ile');
if (t330uResolve('Oxystorm® Red Spinach (Amaranthus spp.) extract (9% nitrates, 1.8 mg)(leaf)', 'softgel')?.lock.why !== named('Red Spinach extract')) throw new Error('t330u spinach extract');
if (t330uResolve('ThermoGP™ Grains of Paradise extract (seed)', 'softgel')?.lock.why !== named('Grains of Paradise extract')) throw new Error('t330u grains');
if (t330uResolve("Saffr'Activ® Saffron extract (0.3% safranal, 0.015 mg) (stigma and flower)", 'softgel')?.lock.why !== named('Saffron extract')) throw new Error('t330u saffron brand');
if (t330uResolve('Black Elderberry (European Elder)(Sambucus nigra) extract (10:1)(fruit)', 'softgel')?.lock.why !== named('Black Elder extract')) throw new Error('t330u elderberry');
if (t330uResolve('European Elder (Elderberry) extract (4:1)(fruit)', 'softgel')) throw new Error('t330u european elder');
if (t330uResolve('Maté (Yerba Maté) powder (leaf)', 'softgel')?.lock.why !== 'Maté extract. It is included for its plant or nutrient compounds.') throw new Error('t330u mate powder');
if (t330uResolve('Tongkat Ali (Long Jack)(Eurycoma longifolia) powder (100:1)(root)', 'softgel')?.lock.why !== 'LJ100 Tongkat Ali extract. It is included for its plant or nutrient compounds.') throw new Error('t330u tongkat powder');
if (t330uResolve('Fennel powder (seed)', 'softgel')?.lock.why !== 'Fennel extract (4:1). It is included for its plant or nutrient compounds.') throw new Error('t330u fennel powder');
if (t330uResolve('Beet (root)', 'softgel')?.lock.why !== 'Beet powder. It is included for its plant compounds.') throw new Error('t330u beet');
if (t330uResolve('Beet juice powder', 'softgel')) throw new Error('t330u beet juice');
if (t330uResolve('Licorice (Glycyrrhiza glabra) extract (4:1)(root)', 'softgel')?.lock.why !== 'Licorice powder. It is included for its plant or nutrient compounds.') throw new Error('t330u licorice extract');
if (t330uResolve('CDP-Choline', 'softgel')) throw new Error('t330u cdp');
if (t330uResolve('Choline (as Choline Bitartrate)', 'softgel')) throw new Error('t330u choline');
if (t330uResolve('Cordyceps (Cordyceps sinensis) extract (mycelium)', 'softgel')) throw new Error('t330u cordyceps');
if (t330uResolve("Lion's Mane Mushroom powder (fruiting body)", 'softgel')) throw new Error('t330u lions');
if (t330uResolve('Grape (fruit)', 'softgel')) throw new Error('t330u grape');
if (t330uResolve('Lemon (fruit)', 'softgel')) throw new Error('t330u lemon');
if (t330uResolve('Tomato (fruit)', 'softgel')) throw new Error('t330u tomato');
if (t330uResolve('Montmorillonite', 'softgel')) throw new Error('t330u clay');
if (t330uResolve('NADH (Nicotinamide Adenine Dinucleotide)', 'softgel')) throw new Error('t330u nadh');
if (t330uResolve('Quercetin', 'softgel')) throw new Error('t330u quercetin');
if (t330uResolve('Vitamin D', 'softgel')) throw new Error('t330u vitamin d');
if (t330uResolve('Siliphos® Silybin Phospholipid (Milk Thistle extract (fruit) and Sunflower Lecithin)', 'softgel')) throw new Error('t330u siliphos');
if (t330uResolve('Theobromine', 'softgel')) throw new Error('t330u theobromine');
if (t330uResolve('English Lavender (Lavandula angustifolia) Essential Oil (flower)', 'softgel')) throw new Error('t330u lavender oil');
if (t330uResolve('PrimaVie® Shilajit extract', 'softgel')) throw new Error('t330u shilajit');
if (t330uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t330u blend');
