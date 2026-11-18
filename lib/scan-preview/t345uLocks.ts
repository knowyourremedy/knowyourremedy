import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t344uResolve } from './t344uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function plant(name: string): Lock {
  return { grade: 'cleared', counts: false, why: `${name}. It is included for its plant compounds.` };
}
function blanket(name: string): Lock {
  return { grade: 'cleared', counts: false, why: `${name}. It is included for its plant or nutrient compounds.` };
}

const VEGETABLES: Array<[string, Lock]> = [
  ['Cauliflower', plant('Cauliflower')],
  ['Cucumber', plant('Cucumber')],
  ['Orange', plant('Orange')],
  ['Pea', plant('Pea')],
  ['Pear', plant('Pear')],
  ['Plum', plant('Plum')],
  ['Strawberry', plant('Strawberry')],
];

const BLANKET: Array<[string, Lock]> = [
  ['Black Cohosh root extract', blanket('Black Cohosh root extract')],
  ['Black Elderberry Fruit Extract (as Sambucus nigra L. Fruit Extract)', blanket('Black Elderberry Fruit Extract (as Sambucus nigra L. Fruit Extract)')],
  ['Boswellia Resin Extract', blanket('Boswellia Resin Extract')],
  ['Boswellia serrata resin extract', blanket('Boswellia serrata resin extract')],
  ['Boswellia serrata Resin Extract', blanket('Boswellia serrata Resin Extract')],
  ['Coffee fruit extract', blanket('Coffee fruit extract')],
  ['Cranberry Berry Extract (as Vaccinium oxycoccus Berry Extract)', blanket('Cranberry Berry Extract (as Vaccinium oxycoccus Berry Extract)')],
  ['Cranberry extract (as Vaccinium oxycoccus)', blanket('Cranberry extract (as Vaccinium oxycoccus)')],
  ['Ginkgo biloba extract', blanket('Ginkgo biloba extract')],
  ['Horse Chestnut extract (as Aesculus hippocastanum)', blanket('Horse Chestnut extract (as Aesculus hippocastanum)')],
  ['Korean Ginseng extract', blanket('Korean Ginseng extract')],
  ['Magnolia bark extract', blanket('Magnolia bark extract')],
  ['Milk Thistle powdered extract (as Silybum marianum)', blanket('Milk Thistle powdered extract (as Silybum marianum)')],
  ['Milk Thistle Seed Extract Concentrate, Powder (as Silybum marianum Seed Extract Concentrate, Powder)', blanket('Milk Thistle Seed Extract Concentrate, Powder (as Silybum marianum Seed Extract Concentrate, Powder)')],
  ['Pomegranate Fruit Extract (as Ellagic Acid)', blanket('Pomegranate Fruit Extract (as Ellagic Acid)')],
  ['Pygeum bark extract', blanket('Pygeum bark extract')],
  ['Red Wine Extract (as Grape Skin Extract)', blanket('Red Wine Extract (as Grape Skin Extract)')],
  ['Soy Isoflavones Extract, Powder (as Soy Seed Extract, Powder)', blanket('Soy Isoflavones Extract, Powder (as Soy Seed Extract, Powder)')],
  ['White Willow Bark Extract', blanket('White Willow Bark Extract')],
  ['White Willow Bark Extract (as Salix alba Bark Extract)', blanket('White Willow Bark Extract (as Salix alba Bark Extract)')],
  ['Yerba Mate leaf extract', blanket('Yerba Mate leaf extract')],
  ['Bee Pollen powder', blanket('Bee Pollen powder')],
  ['Fenugreek seed powder', blanket('Fenugreek seed powder')],
  ['Horsetail, Powder', blanket('Horsetail, Powder')],
  ['Saw Palmetto powder', blanket('Saw Palmetto powder')],
  ['Alanine', blanket('Alanine')],
  ['Arginine', blanket('Arginine')],
  ['Aspartic Acid', blanket('Aspartic Acid')],
  ['Betaine HCl', blanket('Betaine HCl')],
  ['Boron Glycinate', blanket('Boron Glycinate')],
  ['Chloride (as Potassium Chloride, Vitamin B6 Hydrochloride)', blanket('Chloride (as Potassium Chloride, Vitamin B6 Hydrochloride)')],
  ['Chondroitin Sulfate Sodium', blanket('Chondroitin Sulfate Sodium')],
  ['Chromium (as Chromium Amino Acid Chelate)', blanket('Chromium (as Chromium Amino Acid Chelate)')],
  ['Coral Calcium', blanket('Coral Calcium')],
  ['Crystalline Lutein (as Lutein, Zeaxanthin)', blanket('Crystalline Lutein (as Lutein, Zeaxanthin)')],
  ['Cysteine Hydrochloride', blanket('Cysteine Hydrochloride')],
  ['DL-Alpha Tocopherol', blanket('DL-Alpha Tocopherol')],
  ['Glucosamine Sulfate Potassium Chloride', blanket('Glucosamine Sulfate Potassium Chloride')],
  ['Glutamic Acid', blanket('Glutamic Acid')],
  ['Histidine', blanket('Histidine')],
  ['Iodine (as Kelp)', blanket('Iodine (as Kelp)')],
  ['Isoleucine', blanket('Isoleucine')],
  ['L-Cysteine (as L-Cysteine Hydrochloride)', blanket('L-Cysteine (as L-Cysteine Hydrochloride)')],
  ['L-Cysteine Hydrochloride', blanket('L-Cysteine Hydrochloride')],
  ['L-Glutathione', blanket('L-Glutathione')],
  ['Leucine', blanket('Leucine')],
  ['Lysine', blanket('Lysine')],
  ['Niacin (as Inositol Hexanicotinate)', blanket('Niacin (as Inositol Hexanicotinate)')],
  ['Niacin (as Niacinamide, Vitamin B3)', blanket('Niacin (as Niacinamide, Vitamin B3)')],
  ['Niacinamide', blanket('Niacinamide')],
  ['Ornithine Hydrochloride', blanket('Ornithine Hydrochloride')],
  ['Potassium Gluconate', blanket('Potassium Gluconate')],
  ['Selenium (as Selenium Amino Acid Chelate)', blanket('Selenium (as Selenium Amino Acid Chelate)')],
  ['Serine', blanket('Serine')],
  ['Thiamine (as Thiamine Hydrochloride)', blanket('Thiamine (as Thiamine Hydrochloride)')],
  ['Threonine', blanket('Threonine')],
  ['Valine', blanket('Valine')],
  ['Vitamin A (as Acetate, Beta-Carotene)', blanket('Vitamin A (as Acetate, Beta-Carotene)')],
  ['Vitamin A (as Beta-Carotene, Vitamin A Palmitate)', blanket('Vitamin A (as Beta-Carotene, Vitamin A Palmitate)')],
  ['Vitamin A (as Betatene)', blanket('Vitamin A (as Betatene)')],
  ['Vitamin C', blanket('Vitamin C')],
  ['Invertase', blanket('Invertase')],
  ['Maltase', blanket('Maltase')],
];

const EXACT = new Map<string, Lock>();
const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of [...VEGETABLES, ...BLANKET]) {
  if (EXACT.has(name)) throw new Error(`t345u duplicate ${name}`);
  EXACT.set(name, lock);
  const key = t240uNorm(name);
  const prior = BY_KEY.get(key);
  if (prior && prior.why !== lock.why) {
    // Same words with different printed capitalization keep their own exact why.
  } else {
    BY_KEY.set(key, lock);
  }
}

export function t345uResolve(name: string, form?: string): T320uHit | undefined {
  const exact = EXACT.get(name);
  if (exact) return { lock: exact, mark: 't345u' };
  const own = BY_KEY.get(t240uNorm(name));
  if (own) return { lock: own, mark: 't345u' };
  return t344uResolve(name, form);
}

for (const [name, lock] of [...VEGETABLES, ...BLANKET]) {
  const hit = t345uResolve(name, 'tablet');
  if (hit?.mark !== 't345u' || hit.lock.why !== lock.why || hit.lock.grade !== 'cleared' || hit.lock.counts) {
    throw new Error(`t345u ${name}`);
  }
}
const kept = [
  'Allicin',
  'Benzyl Benzoate',
  'Bifidobacterium animalis lactis',
  'Bifidobacterium longum',
  'Black Catechu',
  'Carrot Concentrate',
  'Chinese skullcap',
  'Citrus Bioflavonoid',
  'Damiana',
  'Dehydroepiandrosterone, Pure',
  'deodorized Garlic',
  'DNA',
  'Dong Quai',
  'Docosahexaenoic Acid (as Omega-3 Fatty Acids)',
  'Eicosapentaenoic Acid (as Omega-3 Fatty Acids)',
  'Horsetail',
  'Lactobacillus casei',
  'Lactobacillus delbrueckii',
  'Lactobacillus rhamnosus',
  'Maltodextrain',
  'Medium Chain Triglyceride',
  'Mono/Diglycerides',
  'Nettle',
  'Oat Straw',
  'Oyster extract',
  'Palmitoleic Acid Copolymer',
  'Parsley',
  'Phospholipids',
  'Polyethylene Glycol Copolymer',
  'Psyllium',
  'PVA Copolymer',
  'Red Raspberry',
  'Red Wine Matrix (as Polygonum cuspidatum, Vitis vinifera)',
  'Red Yeast Rice, Powder',
  'RNA',
  'Rose Hip',
  'Sodium Carboxymethycellulose',
  'Sodium Carboxymethylcellulose',
  'Soluble Fiber',
  'Soy Protein',
  'Vegetable and Fruit Juice',
  'Watercress',
];
for (const name of kept) {
  if (t345uResolve(name, 'tablet')?.mark === 't345u') throw new Error(`t345u stretched ${name}`);
}
if (t345uResolve('Saw Palmetto', 'tablet')?.mark === 't345u') throw new Error('t345u saw');
if (t345uResolve('Medium Chain Triglyceride', 'tablet')?.mark === 't345u') throw new Error('t345u mct');
if (t345uResolve('Triple Omega Complex 3-6-9')) throw new Error('t345u blend');
if (t345uResolve('Cauliflower', 'tablet')?.lock.why !== plant('Cauliflower').why) throw new Error('t345u cauliflower why');
