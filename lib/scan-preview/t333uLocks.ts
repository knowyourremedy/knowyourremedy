import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t332uResolve } from './t332uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function named(name: string): string {
  return `${name}. It is included for its plant, enzyme, or nutrient compounds.`;
}

const NAMES = [
  'Black Ginger extract',
  'Boldo extract',
  'Brown Kelp powder',
  'Buchu powder',
  'Burdock extract',
  'Cape Aloe extract',
  'Caralluma Fimbriata extract',
  'Cardamom extract',
  "Cat's Claw extract",
  'Cellulase',
  'Chymotrypsin',
  'Common Bean extract',
  'Conjugated Linoleic Acid',
  'Coriander extract',
  'Corn Silk extract',
  'Corn Silk powder',
  'Cranberry powder',
  'Cumin extract',
  'Devil\'s Claw extract',
  'Dihydroberberine',
  'Dimethylaminoethanol',
  'Dimethylglycine',
  'DIOSVEIN',
  'Fo-Ti extract',
  'Forskohlii extract',
  'Gamma Oryzanol',
  'Garcinia extract',
  'Garlic extract',
  'Hesperidin',
  'Hibiscus extract',
  'Hydrolyzed Collagen',
  'Isoflavones',
  'Juniper berry powder',
  'L-Glutamine',
  'L-Glycine',
  'L-Ornithine',
  'Alpha-GPC',
  'Lactase',
  'Lemon Peel powder',
  'Lipase',
  'Lyc-O-Mato',
  'Magnolia extract',
  'Maritime Pine extract',
  'Melatonin',
  'Moringa powder',
  'Muira Puama powder',
  'N-Acetyl-Cysteine',
  'Orange Peel powder',
  'Pancreatin',
  'Parsley extract',
  'Peppermint powder',
  'Pine Bark extract',
  'Pomegranate peel extract',
  'Pomegranate powder',
  'Proline',
  'Protease',
  'Psyllium powder',
  'Pyrroloquinoline Quinone',
  'Red Clover extract',
  'Red Clover powder',
  'Red Raspberry extract',
  'Red Raspberry powder',
  'Rose extract',
  'Skullcap extract',
  'Slippery Elm powder',
  'Spermidine',
  'Spinach powder',
  "St. John's Wort extract",
  'Superoxide Dismutase',
  'Tangerine Peel powder',
  'Theobroma cacao seed extract',
  'Toothed Clubmoss extract',
  'Trypsin',
  'Valerian extract',
  'Wheat extract',
  'Wild Blueberry extract',
] as const;

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare).replace(/cornsilk/g, 'corn silk').replace(/uvaursi/g, 'uva ursi');
}

function stripParens(name: string): string {
  let current = name.replace(/[®™]/g, ' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current
      .replace(/\s*\([^()]*\)/g, ' ')
      .replace(/\b\d[\d,]*(?:\.\d+)?\s*(?:du|gdu|hut|alu|cu|lu|usp(?:\s+units)?|units)\b/ig, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function stripBrands(text: string): string {
  let tokens = text.split(/\s+/).filter(Boolean);
  const brand = (token: string) => /[®™]/.test(token) || /[a-z][A-Z]/.test(token) || /^(?:verisol|pacran|zeal|geniuspure|glucovantage|diosvein|cordiart|enovita|lyc|greenselect)$/i.test(token);
  while (tokens.length > 1 && brand(tokens[0])) tokens = tokens.slice(1);
  if (/^sp$/i.test(tokens[0] ?? '') ) tokens = tokens.slice(1);
  if (/^technology$/i.test(tokens[0] ?? '')) tokens = tokens.slice(1);
  if (/^o$/i.test(tokens[0] ?? '') && /^mato$/i.test(tokens[1] ?? '')) tokens = tokens.slice(2);
  return tokens.join(' ');
}

const BY_KEY = new Map<string, Lock>();
function add(key: string, lock: Lock) {
  if (key && !BY_KEY.has(key)) BY_KEY.set(key, lock);
}
for (const name of NAMES) {
  const lock: Lock = { grade: 'cleared', counts: false, why: named(name) };
  add(fold(name), lock);
}
const silk = BY_KEY.get('corn silk powder')!;
add('cornsilk powder', silk);
const dmg = BY_KEY.get('dimethylglycine')!;
add('dmg', dmg);
add('dimethylglycine hydrochloride', dmg);
add('n n dimethylglycine', dmg);
const agpc = BY_KEY.get('alpha gpc')!;
add('l alpha glycerylphosphorylcholine', agpc);
const pqq = BY_KEY.get('pyrroloquinoline quinone')!;
add('pqq', pqq);
const nac = BY_KEY.get('n acetyl cysteine')!;
add('nac', nac);
const cla = BY_KEY.get('conjugated linoleic acid')!;
add('cla', cla);
const dmae = BY_KEY.get('dimethylaminoethanol')!;
add('dmae', dmae);
const lyc = BY_KEY.get('lyc o mato')!;
add('tomato extract', lyc);
const peel = BY_KEY.get('pomegranate peel extract')!;
add('punica granatum fruit peel extract', peel);
const bean = BY_KEY.get('common bean extract')!;
add('white kidney bean extract', bean);
add('hesperidin complex', BY_KEY.get('hesperidin')!);

function core(name: string): string {
  const asInner = name.match(/\(\s*as\s+([^)]+)\)/i);
  if (asInner && BY_KEY.has(fold(stripParens(asInner[1])))) return fold(stripParens(asInner[1]));
  return fold(stripBrands(stripParens(name)));
}

function existingAlias(name: string, form?: string): T320uHit | undefined {
  const key = core(name);
  if (/\bmelatonin\b/.test(key)) return { lock: BY_KEY.get('melatonin')!, mark: 't333u' };
  if (/\bcollagen\b/.test(key)) return { lock: BY_KEY.get('hydrolyzed collagen')!, mark: 't333u' };
  if (/curcumin/.test(key) && /turmeric extract/.test(key)) return t332uResolve('Turmeric extract', form);
  if (/grape extract/.test(key) && /\bseed\b/.test(fold(name))) return t332uResolve('Grape extract (seed)', form);
  if (key === 'trimethylglycine' || key === 'trimethylglycine hydrochloride' || key === 'tmg') return t332uResolve('Betaine', form);
  if (/\bshilajit\b/.test(key)) return t332uResolve('PrimaVie Shilajit', form);
  if (key === 'orange extract' || key === 'citrus sinensis extract') return t332uResolve('Sweet Orange extract', form);
  return undefined;
}

export function t333uLock(name: string): Lock | undefined {
  if (/lyc-?o-?mato/i.test(name)) return BY_KEY.get('lyc o mato');
  return BY_KEY.get(core(name));
}

export function t333uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  const alias = existingAlias(name, form);
  if (alias) return alias;
  const own = t333uLock(name);
  if (own) return { lock: own, mark: 't333u' };
  return t332uResolve(name, form);
}

if (t333uLock('Boldo extract (4:1)(leaf)')?.why !== named('Boldo extract')) throw new Error('t333u boldo');
if (t333uResolve('Cornsilk powder (stigma)', 'softgel')?.lock.why !== named('Corn Silk powder')) throw new Error('t333u cornsilk');
if (t333uResolve('Corn Silk powder', 'softgel')?.lock.why !== named('Corn Silk powder')) throw new Error('t333u corn silk');
if (t333uResolve('DMG (Dimethylglycine)', 'softgel')?.lock.why !== named('Dimethylglycine')) throw new Error('t333u dmg');
if (t333uResolve('Dimethylglycine (DMG) (as Dimethylglycine Hydrochloride)', 'softgel')?.lock.why !== named('Dimethylglycine')) throw new Error('t333u dmg as');
if (t333uResolve('Dimethylglycine (DMG) Hydrochloride', 'softgel')?.lock.why !== named('Dimethylglycine')) throw new Error('t333u dmg hcl');
if (!t333uResolve('Curcumin C3 Complex® Turmeric extract (95% curcuminoids, 142.5 mg)(rhizome)', 'softgel')?.lock.why.includes('Turmeric extract')) throw new Error('t333u curcumin');
if (!t333uResolve('Enovita® Grape extract (seed)', 'softgel')?.lock.why.includes('Grape Seed')) throw new Error('t333u enovita');
if (!t333uResolve('Trimethylglycine (as Trimethylglycine (TMG) Hydrochloride)', 'softgel')?.lock.why.startsWith('Betaine')) throw new Error('t333u tmg');
if (!t333uResolve('Shilajit (Asphaltum punjabinum) extract powder (6:1)(rock exudate)', 'softgel')?.lock.why.startsWith('PrimaVie Shilajit')) throw new Error('t333u shilajit');
if (!t333uResolve('Cordiart® Orange (Citrus sinensis) extract (whole fruit)', 'softgel')?.lock.why.startsWith('Sweet Orange extract')) throw new Error('t333u cordiart');
if (t333uResolve('Cellulase 773 CU', 'softgel')?.lock.why !== named('Cellulase')) throw new Error('t333u cellulase');
if (t333uResolve('Trypsin 750 USP Units', 'softgel')?.lock.why !== named('Trypsin')) throw new Error('t333u trypsin');
if (t333uResolve('GlucoVantage® (as DihydroBerberine)', 'softgel')?.lock.why !== named('Dihydroberberine')) throw new Error('t333u dhb');
if (t333uResolve('GeniusPure® L-Alpha-Glycerylphosphorylcholine (Alpha-GPC)', 'softgel')?.lock.why !== named('Alpha-GPC')) throw new Error('t333u gpc');
if (t333uResolve('Zeal Technology® Melatonin (sustained-release)', 'softgel')?.lock.why !== named('Melatonin')) throw new Error('t333u melatonin');
if (t333uResolve('VERISOL® Collagen Type I and III', 'softgel')?.lock.why !== named('Hydrolyzed Collagen')) throw new Error('t333u verisol');
if (t333uResolve('Lyc-O-Mato® Tomato extract (6% lycopene, 1.2 mg)(fruit)', 'softgel')?.lock.why !== named('Lyc-O-Mato')) throw new Error('t333u lyco');
if (t333uResolve('Lyc-O-Mato™ (15% lycopene, 5.2 mg)', 'softgel')?.lock.why !== named('Lyc-O-Mato')) throw new Error('t333u lyco bare');
if (t333uResolve('DIOSVEIN® (90% diosmin, 600 mg) (from Sweet Orange (Citrus sinensis) extract (peel))', 'softgel')?.lock.why !== named('DIOSVEIN')) throw new Error('t333u diosvein');
if (t333uResolve('Grape Oil (seed)', 'softgel')) throw new Error('t333u grape oil');
if (t333uResolve('English Lavender (Lavandula angustifolia) Essential Oil (flower)', 'softgel')) throw new Error('t333u lavender oil');
if (t333uResolve('agar (organic)', 'gummy')) throw new Error('t333u agar');
if (t333uResolve('Deep Ocean Minerals™', 'softgel')) throw new Error('t333u minerals');
if (t333uResolve('elevATP® Ancient Peat and Apple extract', 'softgel')) throw new Error('t333u elevatp');
if (t333uResolve('DNF-10® (from Yeast Hydrolysate (Saccharomyces cerevisiae))', 'softgel')) throw new Error('t333u dnf');
if (t333uResolve('Unique IS-2™ Bacillus Coagulans (providing 4.5 Billion organisms )', 'softgel')) throw new Error('t333u probiotic');
if (t333uResolve('GreenSelect® Phytosome Green Tea (Camellia sinensis) extract (1:2)(leaf)', 'softgel')) throw new Error('t333u phytosome');
if (t333uResolve('red cabbage powder (color)', 'softgel')) throw new Error('t333u cabbage color');
if (t333uResolve('vegetable gum', 'softgel')) throw new Error('t333u gum');
if (t333uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t333u blend');
if (t333uResolve('Hesperidin Complex (45% hesperidin, 49.5 mg)', 'softgel')?.lock.why !== named('Hesperidin')) throw new Error('t333u hesperidin');
