import { t240uNorm } from './t240uLocks';
import type { RiskLevel } from '../ratingRecord';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const CARBONATED = 'Carbonated water. It is the liquid base of the drink.';
const TAURINE = 'Taurine, an amino acid. It is added for its amino acid compounds.';
const CAFFEINE = 'Caffeine anhydrous. It is added for its stimulant compounds.';
const GLUCURONOLACTONE = 'D-glucuronolactone. It is added for its metabolic compounds.';
const GINSENG = 'Ginseng root extract. It is added for its plant compounds.';
const GUARANA = 'Guarana seed extract. It is added for its plant compounds.';
const INOSITOL = 'Inositol. It is added for its metabolic compounds.';
const CARNITINE = 'L-carnitine L-tartrate. It is added for its amino acid compounds.';
const COMPRESSIBLE =
  'Compressible sugar. It is used as a sweetener and binder. Compressible sugar is graded Limited as a refined sugar (FDA and EFSA treat refined sugars as processed sweeteners).';
const PURE_CANE =
  'Pure cane sugar. It is used as a sweetener. Pure cane sugar is graded Limited as a refined sugar (FDA and EFSA treat refined cane sugar as a processed sweetener).';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('Carbonated Water'), { grade: 'cleared', counts: false, why: CARBONATED }],
  [t240uNorm('Taurine'), { grade: 'cleared', counts: false, why: TAURINE }],
  [t240uNorm('Caffeine Anhydrous'), { grade: 'cleared', counts: false, why: CAFFEINE }],
  [t240uNorm('D-Glucuronolactone'), { grade: 'cleared', counts: false, why: GLUCURONOLACTONE }],
  [t240uNorm('Ginseng Root Extract'), { grade: 'cleared', counts: false, why: GINSENG }],
  [t240uNorm('Guarana Seed Extract'), { grade: 'cleared', counts: false, why: GUARANA }],
  [t240uNorm('Inositol'), { grade: 'cleared', counts: false, why: INOSITOL }],
  [t240uNorm('L-Carnitine L-Tartrate'), { grade: 'cleared', counts: false, why: CARNITINE }],
  [t240uNorm('Compressible Sugar'), { grade: 'limited', counts: true, why: COMPRESSIBLE }],
  [t240uNorm('Pure Cane Sugar'), { grade: 'limited', counts: true, why: PURE_CANE }],
]);

/** Exact strings. Cleared locks do not count. Compressible sugar and pure cane sugar do. */
export function t286uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

if (t286uLock('Carbonated Water')?.why !== CARBONATED) throw new Error('t286u water');
if (t286uLock('Taurine')?.why !== TAURINE) throw new Error('t286u taurine');
if (t286uLock('Caffeine Anhydrous')?.why !== CAFFEINE) throw new Error('t286u caffeine');
if (t286uLock('D-Glucuronolactone')?.why !== GLUCURONOLACTONE) throw new Error('t286u glucuronolactone');
if (t286uLock('Ginseng Root Extract')?.why !== GINSENG) throw new Error('t286u ginseng');
if (t286uLock('Guarana Seed Extract')?.why !== GUARANA) throw new Error('t286u guarana');
if (t286uLock('Inositol')?.why !== INOSITOL) throw new Error('t286u inositol');
if (t286uLock('L-Carnitine L-Tartrate')?.why !== CARNITINE) throw new Error('t286u carnitine');
if (t286uLock('Compressible Sugar')?.why !== COMPRESSIBLE) throw new Error('t286u compressible');
if (t286uLock('Pure Cane Sugar')?.why !== PURE_CANE) throw new Error('t286u pure cane');
if (t286uLock('Carbonated Water')?.counts !== false) throw new Error('t286u water count');
if (t286uLock('Compressible Sugar')?.counts !== true) throw new Error('t286u compressible count');
if (t286uLock('Pure Cane Sugar')?.grade !== 'limited') throw new Error('t286u pure cane grade');
if (t286uLock('Taurine')?.grade !== 'cleared') throw new Error('t286u taurine grade');
