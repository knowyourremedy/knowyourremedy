import { t240uNorm } from './t240uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

const LOCKS: Array<[string, string]> = [
  ['Tocotriene Complex', 'Tocotrienols are a form of vitamin E. They are included as a source of vitamin E.'],
  ['MSM (Methylsulfonylmethane)', 'MSM is a sulfur compound also called methylsulfonylmethane. It is included as a source of sulfur.'],
  ['N-Acetyl-L-Cysteine', 'N-acetyl-L-cysteine is a form of the amino acid cysteine. It is included for its amino acid content.'],
  ['Setria® Glutathione (L-Glutathione)', 'Glutathione is a tripeptide made from three amino acids. It is included for its antioxidant activity.'],
  ['Melatonin', 'Melatonin is a hormone the body produces. It is included for its hormone content.'],
  ['DHEA (Dehydroepiandrosterone)', 'DHEA is a hormone. It is included for its hormone content.'],
  ['Albion® Zinc Bisglycinate Chelate', 'Zinc bisglycinate chelate is zinc bound to the amino acid glycine. It is included as a source of zinc.'],
  ['Magnesium Bisglycinate Chelate', 'Magnesium bisglycinate chelate is magnesium bound to the amino acid glycine. It is included as a source of magnesium.'],
  ['Cholecalciferol', 'Cholecalciferol is vitamin D3. It is included as a source of vitamin D.'],
  ['Magnesium Oxide', 'Magnesium oxide is a mineral form of magnesium. It is included as a source of magnesium.'],
  ['Choline (as Choline L+Bitartrate)', 'Choline bitartrate is a salt form of choline. It is included as a source of choline.'],
  ['Vitamin C (as Ascorbic Acid from PureWay-C®)', 'Ascorbic acid is vitamin C. It is included as a source of vitamin C.'],
  ['R-Alpha Lipoic Acid', 'R-alpha lipoic acid is a form of lipoic acid. It is included for its antioxidant activity.'],
  ['Resveratrol', 'Resveratrol is a plant polyphenol found in grapes. It is included for its plant compounds.'],
  ['Liposomal NMN™', 'Liposomal NMN is nicotinamide mononucleotide in a liposomal delivery form. It is included for its metabolic role.'],
  ['RedOrange Complex™', 'RedOrange Complex is a plant extract blend. It is included for its plant compounds.'],
  ['Berberine HCl', 'Berberine HCl is a salt form of the plant alkaloid berberine. It is included for its plant compounds.'],
  ['Berberine Phytosome', 'Berberine phytosome is berberine complexed with phospholipids. It is included for its plant compounds.'],
  ['Organic Maca Root Powder', 'Organic maca root powder is dried and powdered maca root. It is included for its plant compounds.'],
  ['Organic Noni Fruit Powder', 'Organic noni fruit powder is dried and powdered noni fruit. It is included for its plant compounds.'],
  ['Goji Berry Extract (fruit)', 'Goji berry extract is an extract of the goji berry fruit. It is included for its plant compounds.'],
  ['Olive Leaf Extract (Standardized to 18% Oleuropein)', 'Olive leaf extract is an extract of olive leaves standardized to oleuropein. It is included for its plant compounds.'],
  ['Bitter Melon Fruit Extract', 'Bitter melon fruit extract is an extract of bitter melon fruit. It is included for its plant compounds.'],
  ['Pomegranate Juice Powder', 'Pomegranate juice powder is dried pomegranate juice. It is included for its plant compounds.'],
  ['Pomegranate Standardized Extract', 'Pomegranate standardized extract is a concentrated extract of pomegranate. It is included for its plant compounds.'],
  ['Sophora japonica L. extract (flower)', 'Sophora japonica flower extract is an extract of the flowers of Sophora japonica. It is included for its plant compounds.'],
  ['Berberis aristata extract (root)', 'Berberis aristata root extract is an extract of the root of Berberis aristata. It is included for its plant compounds.'],
  ['Sea Buckthorn Fruit Powder', 'Sea buckthorn fruit powder is dried and powdered sea buckthorn fruit. It is included for its plant compounds.'],
  ['Nettle Leaf Powder', 'Nettle leaf powder is dried and powdered nettle leaves. It is included for its plant compounds.'],
  ['Eyebright Herb Powder', 'Eyebright herb powder is dried and powdered eyebright herb. It is included for its plant compounds.'],
  ['Bromelain', 'Bromelain is a proteolytic enzyme from pineapple. It is included for its enzyme activity.'],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, why]) => [t240uNorm(name), { grade: 'cleared', counts: false, why }]));

/** Exact strings. A shorter or longer string stays unlocked. */
export function t308uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t308u duplicate');
for (const [name, why] of LOCKS) {
  const hit = t308uLock(name);
  if (hit?.why !== why || hit.grade !== 'cleared' || hit.counts !== false) throw new Error(`t308u ${name}`);
}
if (t308uLock('hypromellose')) throw new Error('t308u shell');
if (t308uLock('Tocotrienols')) throw new Error('t308u tocotrienols');
if (t308uLock('MSM')) throw new Error('t308u msm');
if (t308uLock('Methylsulfonylmethane')) throw new Error('t308u methyl');
if (t308uLock('N-Acetyl-L-Cysteine Vegan')) throw new Error('t308u nac vegan');
if (t308uLock('Zinc')) throw new Error('t308u zinc');
if (t308uLock('Magnesium')) throw new Error('t308u magnesium');
if (t308uLock('Vitamin D3')) throw new Error('t308u d3');
if (t308uLock('Vitamin C')) throw new Error('t308u vitamin c');
if (t308uLock('Ascorbic Acid')) throw new Error('t308u ascorbic');
if (t308uLock('Choline')) throw new Error('t308u choline');
if (t308uLock('Olive Leaf Extract')) throw new Error('t308u olive bare');
if (t308uLock('Goji Berry Extract')) throw new Error('t308u goji bare');
if (t308uLock('Pregnenolone')) throw new Error('t308u pregnenolone');
if (t308uLock('Bromelain (2,400 GDU)')) throw new Error('t308u gdu');
