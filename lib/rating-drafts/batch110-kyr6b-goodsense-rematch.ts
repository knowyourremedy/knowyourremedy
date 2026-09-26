// DRAFT / not verified / batch 110 KYR6-b GoodSense rematch.
// Methodology v1.6 + MAIN §5 through the Sept 25, 2026 stamps,
// including FD-C / D-C / mica-based alias families. Harm-first.
// No invented grades. No invented OI. No invented UPCs. No new token stamps.
// Founder owns final Avoid vs Caution vs Clean.
//
// Scope is ONLY the 141 SKUs REFUSED in PR #339 (batch109).
// A row is written only when every inactive on that opened DailyMed
// panel maps to a lock already on main, after the split-junk fix.
// Exact pack is the outer SPL quantity already pinned for that setid.
// recordStatus is 'unverified'.
// Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch109. No house Amazon. No HealthA2Z.
// No A+Health. No TIME-Cap. No toothpaste. No Sprouts. No factory.
// Oil form split stays as it is on main. Dual-panel day/night stays no-row.
// Formaldehyde-releasers stay Avoid. Gummy vegetable oil and gummy
// coconut oil stay Avoid.
// No UPC attached. No GTIN-12 was read under barcode bars.
//
// TALLY (unverified drafts in THIS file): 12 rows —
// Clean 0 / Caution 4 / Avoid 8.
// NEW 9 / REUSE-formula 3 /
// SKIPPED 0 (no_OI 0 / OUT 0 / already-on-MAIN 0) /
// REFUSED 129.
// 12 of the 141 setids lock fully. Three of those are a second
// labeler of a count already written here (not a new count, not
// refused): 50090-7060 with the 4 mg peppermint 24 count,
// 50090-7061 with the 2 mg peppermint 24 count, and 50804-152
// with Stomach Relief 122 30 count.
// Search grade: Clean 0 / Caution 4 / Avoid 8.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'GoodSense';
const AMAZON = ['Amazon', 'GoodSense'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  cleared: 'Methodology §5 Cleared. The printed inactive is a locked Cleared excipient (housekeeping filler, coat, gum, salt, or named simple starch).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes, FD-C, D-C, and no. spellings). The printed spelling is the flag name.',
  tio2: 'Methodology §5 High (titanium dioxide). Split junk "and titanium dioxide" is this token.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  aspartame: 'Methodology §5 High (aspartame).',
  paraben: 'Methodology §5 High (parabens, including methyl, propyl, and butyl).',
  bht: 'Methodology §5 High (BHT / BHA / propyl gallate).',
  formaldehyde: 'Methodology §5 High (formaldehyde-releaser as an Other Ingredient). Avoid.',
  caramel: 'Methodology §5 High (undisclosed caramel color / plain caramel powder).',
  seedOil: 'Methodology §5 High (seed oil or coconut oil on a chew, lozenge, or gummy). Not the Cleared softgel-fill row.',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs, including polyethylene glycol 3350 and 400, and macrogol). Not the Avoid driver.',
  pg: 'Methodology §5 Moderate (propylene glycol, oral).',
  sucralose: 'Methodology §5 Moderate (sucralose). Split junk "sucralose and water" uses this row plus purified water.',
  acek: 'Methodology §5 Moderate (acesulfame potassium).',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  saccharin: 'Methodology §5 Moderate (saccharin). Distinct from Caution saccharin sodium.',
  sio2: 'Methodology §5 Limited (silicon dioxide / silica / colloidal silicon dioxide / colloidal anhydrous silica / colloidal silicone dioxide). Spacing "colloidal silicondioxide" sits on this same SiO2 cap. Not a new grade.',
  carnauba: 'Methodology §5 Caution (carnauba wax — Sept 25, 2026). Not the old Cleared wax row. Not Avoid.',
  iron: 'Methodology §5 Caution (iron oxide as color). Not Avoid.',
  benzoate: 'Methodology §5 Limited (sodium benzoate — synthetic preservative). Not Avoid.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.',
  sugarAlcohol: 'Methodology §5 Limited (oral sorbitol, mannitol, xylitol, or maltitol powder). Sorbitol solution is not this row.',
  sucrose: 'Methodology §5 Limited (sucrose). Distinct from Caution bare sugar. Split junk "sucrose and water" uses this row plus purified water.',
  natFlavor: 'Methodology §5 Limited (natural flavors / natural and artificial flavors / artificial flavors). Not the Caution named-flavor row.',
  flavor: 'Methodology §5 Caution (flavor family). Split junk "natural and artificial" maps here. Not Avoid.',
  ink: 'Methodology §5 Caution (pharmaceutical ink). Split junk "may contain pharmaceutical ink" is this token. Not Avoid.',
  koh: 'Methodology §5 Caution (potassium hydroxide — Sept 25, 2026). Not Avoid.',
  ammonium: 'Methodology §5 Caution (ammonium hydroxide). Not Avoid.',
  sss: 'Methodology §5 Caution (sorbitol sorbitan solution or sorbitan monooleate). Not Avoid.',
  mineralOil: 'Methodology §5 Caution (mineral oil / light liquid paraffin on an oral product). Not Avoid.',
  mct: 'Methodology §5 Limited (unlabeled medium chain triglycerides).',
  simethicone: 'Methodology §5 Caution (simethicone as an Other Ingredient). Not Avoid.',
  benzyl: 'Methodology §5 Caution (benzyl alcohol on a general oral OTC). Not the infant Avoid split.',
  saccharinNa: 'Methodology §5 Caution (saccharin sodium / sodium saccharin). Not Avoid.',
  sugarSpheres: 'Methodology §5 Caution (sugar spheres — bare sugar).',
  pvap: 'Methodology §5 Caution (polyvinyl acetate phthalate). Not Avoid.',
  glycyrrhizin: 'Methodology §5 Caution (ammonium glycyrrhizin). Not Avoid.',
  carmine: 'Methodology §5 Caution (carmine / cochineal). Not Avoid.',
  sulfite: 'Methodology §5 Caution (sulfites). Not Avoid.',
  benzoic: 'Methodology §5 Caution (benzoic acid). Not Avoid.',
  maltitolSol: 'Methodology §5 Caution (maltitol solution or isomalt).',
  dextrates: 'Methodology §5 Caution (bare dextrates).',
  shellacWax: 'Methodology §5 Caution (shellac wax). Distinct from Cleared shellac.',
  methacrylic: 'Methodology §5 Caution (methacrylic acid copolymer). Not Avoid.',
  alcohol: 'Methodology §5 Limited (alcohol as a vehicle). Not Avoid.',
  bkc: 'Methodology §5 Caution (benzalkonium chloride). Not Avoid.',
  pyruvate: 'Methodology §5 Caution (sodium pyruvate). Not Avoid.',
  milk: 'Methodology §5 Limited (nonfat dry milk). Not Avoid.',
  mica: 'Methodology §5 Caution (mica-based pearlescent pigment). Bare mica is not this row.',
  carrageenan: 'Methodology §5 Limited (carrageenan). Not Avoid.',
  modStarch: 'Methodology §5 Limited (modified food starch / modified starch).',
  limited: 'Methodology §5 Limited. The printed inactive sits on a locked Limited row. Not Avoid.',
  fattyAlc: 'Methodology §5 Cleared (stearyl / cetearyl alcohol; cetyl alcohol and cetostearyl alcohol sit on this same fatty-alcohol cream base, Sept 24). Not a new grade.',
  edtaTrace: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer). Distinct from Caution edetate disodium dihydrate and from Caution tetrasodium EDTA. Bare edetate disodium is not this row.',
  c3045: 'Methodology §5 Caution (C30-45 alkyl cetearyl dimethicone crosspolymer — Sept 24). Distinct from C30-45 alkyl dimethicone. Not Avoid.',
  bicarb: 'Methodology §5 Cleared (Mg / K / ammonium / Na carbonate or bicarbonate → bicarb / mineral-filler; NOW token lock). Sodium carbonate anhydrous is this Na carbonate lock. Not a new grade.',
  betaCar: 'Methodology §5 Caution (beta-carotene as color). Bare beta-carotene maps here (Sept 25). Not a new grade. Not Avoid.',
  tocAc: 'Methodology §5 Caution (tocopheryl acetate — Sept 15). Distinct from Cleared DL-alpha tocopheryl acetate and from Cleared mixed tocopherols. Not Avoid.',
  dimeth: 'Methodology §5 Cleared (dimethicone / dimethicone copolyol — Sept 14).',
  cocoaButter: 'Methodology §5 Cleared (cocoa butter / cocoa seed butter as the cream vehicle — Sept 15). Not cocoa powder. Not gummy High.',
  petrolatum: 'Methodology §5 Cleared (petrolatum topical / white petrolatum). Distinct from special petrolatum. Not a new grade.',
  namedOil: 'Methodology §5 Cleared (named single oil as ointment base or fill — Sept 15 form rule). Tap: fill is not gummy High.',
  ceteareth: 'Methodology §5 Caution (ceteareth-20 — Sept 15). Not Avoid.',
  ceteth: 'Methodology §5 Caution (ceteth-20 phosphate — Sept 15). Not Avoid.',
  capMeth: 'Methodology §5 Caution (caprylyl methicone — Sept 15). Not Avoid.',
  ehg: 'Methodology §5 Caution (ethylhexylglycerin — Sept 15). Not Avoid.',
  steareth: 'Methodology §5 Caution (steareth-2 / steareth-21 — Sept 15). Not Avoid.',
  amp: 'Methodology §5 Caution (aminomethyl propanol — Sept 15). Not Avoid.',
  ammoniaStrong: 'Methodology §5 Caution (strong ammonia solution — Sept 15). Distinct from ammonium hydroxide. Not Avoid.',
  dicetyl: 'Methodology §5 Caution (dicetyl phosphate — Sept 15). Not Avoid.',
  ipm: 'Methodology §5 Cleared (isopropyl myristate — topical emollient, Sept 15).',
  cetylPalm: 'Methodology §5 Cleared (cetyl palmitate — Sept 14).',
  cocoyl: 'Methodology §5 Cleared (cocoyl caprylocaprate — Sept 15). Distinct from coco-caprylate/caprate.',
  sorbate: 'Methodology §5 Limited (potassium sorbate — synthetic preservative, with sodium benzoate). Not Avoid.',
  sorbic: 'Methodology §5 Limited (sorbic acid — caprylyl glycol / hexanediol / sorbic acid). Not Avoid.',
  spearmint: 'Methodology §5 Caution (spearmint oil — fragrance/EO, Sept 15). Not Avoid.',
  aloe: 'Methodology §5 Caution (aloe barbadensis leaf extract → aloe as OI, Sept 23). Not Avoid.',
  acrylate: 'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — Sept 15). Not Avoid.',
  fragrance: 'Methodology §5 Caution (fragrance / parfum, topical OTC). Not Avoid.',
  honey: 'Methodology §5 Cleared (honey, oral sweetener — Sept 14). Tap: not for under 1. Not Avoid.',
  eucalyptus: 'Methodology §5 Caution (eucalyptus oil as a gel inactive — Sept 15). Not Avoid.',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof OTC;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Allergies: [
        'claritin-allergy-tablets-plain',
        'Independently Clean Claritin plain loratadine already on main. Form labeled, not a hard filter (§6).',
      ],
      Sleep: [
        'pure-encapsulations-melatonin-sr-3mg',
        'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already on main. Form labeled, not a hard filter (§6).',
      ],
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
      ],
      'Cold & Flu': [
        'coldcalm-meltaways',
        'Independently Clean Boiron ColdCalm already on main. Form labeled, not a hard filter (§6).',
      ],
      'Pain & Fever': [
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}`],
  });
}

const PACKS: Compact[] = [
  {
    id: 'goodsense-b110-nicotine-8be0',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 24 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-8be0',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial cherry flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 24 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid dd334b2c-bbae-48e7-8f3d-2706d325f600. Inactive ingredients: acesulfame potassium, magnesium stearate, mannitol, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dd334b2c-bbae-48e7-8f3d-2706d325f600; setid dd334b2c-bbae-48e7-8f3d-2706d325f600; NDC 0113-1125-24). Package quantity pinned on the opened SPL: 24 count. Active: Nicotine 2mg. Inactive ingredients: acesulfame potassium, magnesium stearate, mannitol, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-8be0-27',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-8be0',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial cherry flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 27 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid dd334b2c-bbae-48e7-8f3d-2706d325f600. Inactive ingredients: acesulfame potassium, magnesium stearate, mannitol, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dd334b2c-bbae-48e7-8f3d-2706d325f600; setid dd334b2c-bbae-48e7-8f3d-2706d325f600; NDC 0113-1125-09). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 2mg. Inactive ingredients: acesulfame potassium, magnesium stearate, mannitol, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-d940',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 24 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-d940',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['aspartame', 'high', 'aspartame'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural peppermint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 24 count = avoid. Drivers: aspartame. DailyMed setid ee345181-4999-4948-9589-7d70d61885ad. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee345181-4999-4948-9589-7d70d61885ad; setid ee345181-4999-4948-9589-7d70d61885ad; NDC 0113-0873-03). Same 24 count on the A-S Medication Solutions label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3e9a5f94-9db2-4cac-8ab9-50fcedfe0e05; setid 3e9a5f94-9db2-4cac-8ab9-50fcedfe0e05; NDC 50090-7060-0). Package quantity pinned on the opened SPL: 24 count. Active: Nicotine 4mg. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-d940-27',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-d940',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['aspartame', 'high', 'aspartame'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural peppermint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 27 count = avoid. Drivers: aspartame. DailyMed setid ee345181-4999-4948-9589-7d70d61885ad. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee345181-4999-4948-9589-7d70d61885ad; setid ee345181-4999-4948-9589-7d70d61885ad; NDC 0113-0873-09). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 4mg. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-first-aid-antibiotic-5acb',
    productName: 'GoodSense First Aid Antibiotic (Bacitracin Zinc 400 units / Neomycin Sulfate 3.5 mg / Polymyxin B 5000 units per gram), 28 g',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-first-aid-antibiotic-5acb',
    audience: ADULT,
    minAge: 12,
    form: 'ointment',
    productType: OTC,
    actives: [
      { name: 'Bacitracin zinc', strength: '400 units per gram' },
      { name: 'Neomycin sulfate', strength: '3.5 mg per gram' },
      { name: 'Polymyxin B', strength: '5000 units per gram' },
    ],
    flags: [['cocoa butter', 'cleared', 'cocoaButter'], ['cottonseed oil', 'cleared', 'namedOil'], ['olive oil', 'cleared', 'namedOil'], ['sodium pyruvate', 'limited', 'pyruvate'], ['tocopheryl acetate', 'limited', 'tocAc'], ['white petrolatum', 'cleared', 'petrolatum']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense First Aid Antibiotic, 28 g = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 29c223ff-3cb7-4578-a326-08516e89cd47. Active ingredients (in each gram): bacitracin zinc equivalent to 400 units bacitracin, neomycin sulfate equivalent to 3.5 mg neomycin base, polymyxin B 5,000 units as polymyxin B sulfate. Inactive ingredients: cocoa butter, cottonseed oil, olive oil, sodium pyruvate, tocopheryl acetate, white petrolatum. Rematch: `cocoa butter` → cocoa butter / cocoa seed butter Cleared cream vehicle (Sept 15); `cottonseed oil` → named single oil as ointment base Cleared (Sept 15 form rule; not gummy High); `olive oil` → named single oil as ointment base Cleared (Sept 15 form rule; pure olive oil as fill); `tocopheryl acetate` → tocopheryl acetate Caution (Sept 15; not the DL-alpha Cleared row); `white petrolatum` → white petrolatum Cleared (named beside petrolatum / ceresin).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=29c223ff-3cb7-4578-a326-08516e89cd47; setid 29c223ff-3cb7-4578-a326-08516e89cd47; NDC 50090-7259). Package quantity pinned on the opened SPL: 28 g. Active ingredients (in each gram): bacitracin zinc equivalent to 400 units bacitracin; neomycin sulfate equivalent to 3.5 mg of neomycin base; polymyxin B 5,000 units as polymyxin B sulfate. Inactive ingredients: cocoa butter, cottonseed oil, olive oil, sodium pyruvate, tocopheryl acetate, white petrolatum. Rematch of PR #339 refuse. `cocoa butter` → cocoa butter / cocoa seed butter Cleared cream vehicle (Sept 15) `cottonseed oil` → named single oil as ointment base Cleared (Sept 15 form rule; not gummy High) `olive oil` → named single oil as ointment base Cleared (Sept 15 form rule; pure olive oil as fill) `tocopheryl acetate` → tocopheryl acetate Caution (Sept 15; not the DL-alpha Cleared row) `white petrolatum` → white petrolatum Cleared (named beside petrolatum / ceresin) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-d940-b',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 24 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-d940-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['aspartame', 'high', 'aspartame'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural peppermint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 24 count = avoid. Drivers: aspartame. DailyMed setid c505dde1-2647-4c7b-99f5-9865e7c78e43. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c505dde1-2647-4c7b-99f5-9865e7c78e43; setid c505dde1-2647-4c7b-99f5-9865e7c78e43; NDC 0113-0344-05). Same 24 count on the A-S Medication Solutions label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d84f27e4-c63b-4d04-9e65-bdb1a3594f92; setid d84f27e4-c63b-4d04-9e65-bdb1a3594f92; NDC 50090-7061-0). Package quantity pinned on the opened SPL: 24 count. Active: Nicotine 2mg. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-d940-b-27',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-d940-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['aspartame', 'high', 'aspartame'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural peppermint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 27 count = avoid. Drivers: aspartame. DailyMed setid c505dde1-2647-4c7b-99f5-9865e7c78e43. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c505dde1-2647-4c7b-99f5-9865e7c78e43; setid c505dde1-2647-4c7b-99f5-9865e7c78e43; NDC 0113-0344-09). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 2mg. Inactive ingredients: aspartame, magnesium stearate, mannitol, natural peppermint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-8be0-b',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-8be0-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial cherry flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 27 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 69c7b6f8-7200-4b9e-ac85-2e2c5c5eeda7. Inactive ingredients: acesulfame potassium, magnesium stearate, mannitol, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=69c7b6f8-7200-4b9e-ac85-2e2c5c5eeda7; setid 69c7b6f8-7200-4b9e-ac85-2e2c5c5eeda7; NDC 0113-1190-10). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 4mg. Inactive ingredients: acesulfame potassium, magnesium stearate, mannitol, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-47c2',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 24 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-47c2',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['aspartame', 'high', 'aspartame'], ['flavor', 'limited', 'flavor'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 24 count = avoid. Drivers: aspartame. DailyMed setid 26bfbdad-d67a-41b9-803d-967d438a2672. Inactive ingredients: aspartame, flavor, magnesium stearate, mannitol, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=26bfbdad-d67a-41b9-803d-967d438a2672; setid 26bfbdad-d67a-41b9-803d-967d438a2672; NDC 68258-7992-7). Package quantity pinned on the opened SPL: 24 count. Active: Nicotine 4mg. Inactive ingredients: aspartame, flavor, magnesium stearate, mannitol, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-nicotine-47c2-b',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 24 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b110-nicotine-47c2-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['aspartame', 'high', 'aspartame'], ['flavor', 'limited', 'flavor'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 24 count = avoid. Drivers: aspartame. DailyMed setid 4bb7687d-3ee0-47a3-aa43-146dede4cf55. Inactive ingredients: aspartame, flavor, magnesium stearate, mannitol, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch: `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock); `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4bb7687d-3ee0-47a3-aa43-146dede4cf55; setid 4bb7687d-3ee0-47a3-aa43-146dede4cf55; NDC 68258-7991-7). Package quantity pinned on the opened SPL: 24 count. Active: Nicotine 2mg. Inactive ingredients: aspartame, flavor, magnesium stearate, mannitol, potassium bicarbonate, sodium alginate, sodium carbonate, xanthan gum. Rematch of PR #339 refuse. `potassium bicarbonate` → K bicarbonate → bicarb / mineral-filler Cleared (NOW token lock) `sodium carbonate` → Na carbonate → bicarb / mineral-filler Cleared (NOW token lock) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-regular-strength-stomach-relief-122-30f8',
    productName: 'GoodSense Regular strength Stomach Relief 122 (Bismuth Subsalicylate 262mg), 30 count',
    category: 'Digestive',
    formulaId: 'goodsense-b110-regular-strength-stomach-relief-122-30f8',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Bismuth Subsalicylate', strength: '262mg' }],
    flags: [['calcium carbonate', 'cleared', 'cleared'], ['d&c red 27 aluminum lake', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['pregelatinized starch', 'cleared', 'cleared'], ['saccharin sodium', 'limited', 'saccharinNa']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Regular strength Stomach Relief 122 (Bismuth Subsalicylate 262mg), 30 count = avoid. Drivers: d&c red 27 aluminum lake. DailyMed setid f0588ab8-d1fc-419a-8d68-bee42332d50f. Inactive ingredients: calcium carbonate, d&c red 27 aluminum lake, flavor, magnesium stearate, mannitol, pregelatinized starch, saccharin sodium. Rematch: `inactive ingradients calcium carbonate` → split junk → calcium carbonate Cleared (OI filler).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f0588ab8-d1fc-419a-8d68-bee42332d50f; setid f0588ab8-d1fc-419a-8d68-bee42332d50f; NDC 68788-4002-3). Same 30 count on the Good Sense (Geiss, Destin & Dunn) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=19a324bd-fa54-b899-e063-6394a90aaa73; setid 19a324bd-fa54-b899-e063-6394a90aaa73; NDC 50804-152-49). Package quantity pinned on the opened SPL: 30 count. Active: Bismuth Subsalicylate 262mg. Inactive ingredients: calcium carbonate, d&c red 27 aluminum lake, flavor, magnesium stearate, mannitol, pregelatinized starch, saccharin sodium. Rematch of PR #339 refuse. `inactive ingradients calcium carbonate` → split junk → calcium carbonate Cleared (OI filler) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b110-fiber-a65c',
    productName: 'GoodSense Fiber (Methylcellulose (4000 Cps) 500mg), 100 count',
    category: 'Digestive',
    formulaId: 'goodsense-b110-fiber-a65c',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Methylcellulose (4000 Cps)', strength: '500mg' }],
    flags: [['citric acid', 'cleared', 'cleared'], ['colloidal silicon dioxide', 'limited', 'sio2'], ['crospovidone', 'cleared', 'cleared'], ['fd&c yellow no.6 aluminum lake', 'high', 'dye'], ['magnesium stearate', 'cleared', 'cleared'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['sodium bicarbonate', 'cleared', 'cleared'], ['sodium chloride', 'cleared', 'cleared'], ['sodium lauryl sulfate', 'limited', 'sls']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Fiber (Methylcellulose (4000 Cps) 500mg), 100 count = avoid. Drivers: fd&c yellow no.6 aluminum lake. DailyMed setid 96ed1ba1-7f91-4912-a549-a4be2c3e0362. Inactive ingredients: citric acid, colloidal silicon dioxide, crospovidone, fd&c yellow no.6 aluminum lake, magnesium stearate, microcrystalline cellulose, sodium bicarbonate, sodium chloride, sodium lauryl sulfate. Rematch: `colloidal silicondioxide` → silica / SiO2 Caution (colloidal silicon dioxide spacing; colloidal silicone dioxide alias).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=96ed1ba1-7f91-4912-a549-a4be2c3e0362; setid 96ed1ba1-7f91-4912-a549-a4be2c3e0362; NDC 50804-364-16). Package quantity pinned on the opened SPL: 100 count. Active: Methylcellulose (4000 Cps) 500mg. Inactive ingredients: citric acid, colloidal silicon dioxide, crospovidone, fd&c yellow no.6 aluminum lake, magnesium stearate, microcrystalline cellulose, sodium bicarbonate, sodium chloride, sodium lauryl sulfate. Rematch of PR #339 refuse. `colloidal silicondioxide` → silica / SiO2 Caution (colloidal silicon dioxide spacing; colloidal silicone dioxide alias) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  }
];

export const BATCH110_KYR6B_GOODSENSE_REMATCH: RatingRecord[] = PACKS.map(expand);

export const BATCH110_SKIPPED_NO_OI: { sku: string; reason: string }[] = [

];

export const BATCH110_SKIPPED_OUT: { sku: string; reason: string }[] = [

];

export const BATCH110_SKIPPED_ALREADY: { sku: string; reason: string }[] = [

];

export const BATCH110_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH110_SKIPPED_NO_OI,
  ...BATCH110_SKIPPED_OUT,
  ...BATCH110_SKIPPED_ALREADY,
];

export const BATCH110_REFUSED: { sku: string; reason: string }[] = [
  { sku: 'good sense nicotine (0113-6305)', reason: 'REFUSED exact panel string `ethyl butyrate`, `menthol`, `mica`. Setid 0f55f79b-a5ab-4e9e-9219-a9b8f401b792. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0f55f79b-a5ab-4e9e-9219-a9b8f401b792.' },
  { sku: 'Good Sense Nicotine (0113-0170)', reason: 'REFUSED exact panel string `gum base`. Setid ae802de5-8e1b-439f-ab81-db4bd7241c91. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae802de5-8e1b-439f-ab81-db4bd7241c91.' },
  { sku: 'Good Sense Cough DM (0113-0958)', reason: 'REFUSED exact panel string `high fructose corn syrup`, `polyvinyl acetate`, `sodium polystyrene sulfonate`, `tragacanth gum`. Setid 5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea.' },
  { sku: 'Good Sense Tussin DM Max (0113-0927)', reason: 'REFUSED exact panel string `acetic acid`, `anhydrous citric acid`, `menthol`, `sorbitol solution`. Setid d2541ef0-a73c-43aa-91ff-fdbce2748c4f. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d2541ef0-a73c-43aa-91ff-fdbce2748c4f.' },
  { sku: 'good sense allergy (0113-0379)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `poloxamer 407`, `sorbitol solution`. Setid bf5039a0-2109-41a2-84a9-b5167d0a93da. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bf5039a0-2109-41a2-84a9-b5167d0a93da.' },
  { sku: 'good sense nicotine (0113-8600)', reason: 'REFUSED exact panel string `gum base`, `menthol`. Setid eefcb8f8-4334-4e75-8e52-ef1ffbf3f0a9. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eefcb8f8-4334-4e75-8e52-ef1ffbf3f0a9.' },
  { sku: 'GOOD SENSE INFANTS PAIN AND FEVER (0113-9523)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`, `tribasic sodium phosphate`. Setid a7cc3964-e8fa-41da-89ca-b0d2aa80f2a7. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a7cc3964-e8fa-41da-89ca-b0d2aa80f2a7.' },
  { sku: 'Good Sense Nicotine (0113-5023)', reason: 'REFUSED exact panel string `mica`. Setid 5c89061b-1452-4962-9f25-212f2ae8e41e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5c89061b-1452-4962-9f25-212f2ae8e41e.' },
  { sku: 'GOOD SENSE OMEPRAZOLE (0113-6010)', reason: 'REFUSED exact panel string `meglumine`. Setid b840439b-540b-465a-8faa-f7b1024c628e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b840439b-540b-465a-8faa-f7b1024c628e.' },
  { sku: 'Good Sense Nicotine (0113-0854)', reason: 'REFUSED exact panel string `gum base`. Setid b8cbb6a7-aeb4-48f3-a0ed-7ad803021752. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b8cbb6a7-aeb4-48f3-a0ed-7ad803021752.' },
  { sku: 'Good Sense childrens allergy relief (68788-8657)', reason: 'REFUSED exact panel string `edetate disodium`, `monobasic sodium phosphate`, `phosphoric acid`. Setid 27bb0a40-35ee-4c19-bd6f-fb054c8a2586. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=27bb0a40-35ee-4c19-bd6f-fb054c8a2586.' },
  { sku: 'GOOD SENSE DAYTIME (0113-5305)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 2597e84c-18b4-41a9-8e6a-ff0c4c1f0612. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2597e84c-18b4-41a9-8e6a-ff0c4c1f0612.' },
  { sku: 'Good Sense aspirin (0113-0274)', reason: 'REFUSED exact panel string `dextrose excipient`. Setid e150dd59-8db8-449f-9c9a-1aa6deb3be2e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e150dd59-8db8-449f-9c9a-1aa6deb3be2e.' },
  { sku: 'good sense esomeprazole magnesium (0113-2022)', reason: 'REFUSED exact panel string `meglumine`, `menthol`. Setid f13088de-6841-453e-acb0-08bbdf9529d1. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f13088de-6841-453e-acb0-08bbdf9529d1.' },
  { sku: 'Good Sense Infants Ibuprofen (0113-0040)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 3d2fa7ad-1574-4c79-959d-3ee284468a99. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3d2fa7ad-1574-4c79-959d-3ee284468a99.' },
  { sku: 'Good Sense Nicotine (0113-2502)', reason: 'REFUSED exact panel string `mica`. Setid 0ac7f87a-63f4-4d74-ba5b-d1444803b100. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0ac7f87a-63f4-4d74-ba5b-d1444803b100.' },
  { sku: 'GOOD SENSE NICOTINE (0113-6020)', reason: 'REFUSED exact panel string `gum base`, `menthol`. Setid 28843e89-9782-42bc-8afb-1059ef44d8f1. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=28843e89-9782-42bc-8afb-1059ef44d8f1.' },
  { sku: 'GOOD SENSE NICOTINE (0113-7969)', reason: 'REFUSED exact panel string `calcium polycarbophil`, `lime oil`. Setid 632283a5-c617-4759-8933-7dc015e551c7. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=632283a5-c617-4759-8933-7dc015e551c7.' },
  { sku: 'Good Sense Daytime (0113-0656)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `menthol`, `sorbitol solution`. Setid 0122cd34-5817-4af5-a51a-8d176dee0a30. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0122cd34-5817-4af5-a51a-8d176dee0a30.' },
  { sku: 'Good Sense Nicotine (0113-0456)', reason: 'REFUSED exact panel string `gum base`. Setid 74ce5bd9-98ad-4e41-80b0-5d7aaa122ac8. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=74ce5bd9-98ad-4e41-80b0-5d7aaa122ac8.' },
  { sku: 'Good Sense Childrens All Day Allergy (0113-0503)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid e56edd0e-4873-41bc-a727-05c02ec943ed. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e56edd0e-4873-41bc-a727-05c02ec943ed.' },
  { sku: 'good sense night time (0113-0335)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`. Setid 0c79357a-b79d-4952-8e6d-ef3d60dde2fa. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0c79357a-b79d-4952-8e6d-ef3d60dde2fa.' },
  { sku: 'Good Sense Severe Daytime Cold and Flu (0113-0603)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `menthol`, `sorbitol solution`. Setid d5faf89f-3641-4be1-8d43-35504f12fe8d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d5faf89f-3641-4be1-8d43-35504f12fe8d.' },
  { sku: 'Good Sense Nicotine (0113-0957)', reason: 'REFUSED exact panel string `calcium polycarbophil`. Setid 1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf.' },
  { sku: 'Good Sense ibuprofen (0113-0057)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid c79e65e7-149b-450f-b083-99e16ff71729. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c79e65e7-149b-450f-b083-99e16ff71729.' },
  { sku: 'good sense nicotine (0113-8100)', reason: 'REFUSED exact panel string `gum base`, `menthol`. Setid ba373c62-65eb-43ad-88e3-bb2c13df588c. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ba373c62-65eb-43ad-88e3-bb2c13df588c.' },
  { sku: 'Good Sense Pain and Fever (0113-8959)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`, `tribasic sodium phosphate`. Setid f7137fe6-582e-43a4-8302-90ca54cd1de3. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f7137fe6-582e-43a4-8302-90ca54cd1de3.' },
  { sku: 'good sense nicotine (0113-7999)', reason: 'REFUSED exact panel string `calcium polycarbophil`, `lime oil`. Setid 1e2631b6-b99e-4345-840e-9ddd0873a421. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1e2631b6-b99e-4345-840e-9ddd0873a421.' },
  { sku: 'GOOD SENSE TUSSIN (0113-2009)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid 5fb96638-a9bc-4be6-a624-da303a9e98a3. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5fb96638-a9bc-4be6-a624-da303a9e98a3.' },
  { sku: 'Good Sense Pain and Fever (68788-8646)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`, `tribasic sodium phosphate`. Setid 7dbd0a2d-8597-4010-bfe2-94a8d145ca57. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7dbd0a2d-8597-4010-bfe2-94a8d145ca57.' },
  { sku: 'Good Sense Childrens Pain and Fever (68788-8407)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid a00dc563-6611-46b8-ab5c-1b2c602f3c68. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a00dc563-6611-46b8-ab5c-1b2c602f3c68.' },
  { sku: 'GOOD SENSE DUAL ACTION COMPLETE (0113-7050)', reason: 'REFUSED exact panel string `polyacrylate dispersion`. Setid b5a36da3-7316-493c-b50f-fc5393d858c0. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5a36da3-7316-493c-b50f-fc5393d858c0.' },
  { sku: 'Good Sense Childrens Cold and Cough (68788-8331)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid 397fe51d-b548-4fbb-8246-5f7c3ae80e97. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=397fe51d-b548-4fbb-8246-5f7c3ae80e97.' },
  { sku: 'good sense childrens pain and fever (68788-8477)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid b5971407-2d95-4edb-88fe-0bd82d911683. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5971407-2d95-4edb-88fe-0bd82d911683.' },
  { sku: 'good sense childrens cold cough (68788-4094)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid a56d2fe4-5bea-4668-8e66-5a6f4279d461. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a56d2fe4-5bea-4668-8e66-5a6f4279d461.' },
  { sku: 'Good Sense Childrens All Day Allergy (68788-4093)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 8cf4615b-47f8-4b92-b0cd-16c380ad2320. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8cf4615b-47f8-4b92-b0cd-16c380ad2320.' },
  { sku: 'Good Sense Nicotine (0113-0029)', reason: 'REFUSED exact panel string `gum base`. Setid 7744ea8b-164a-4992-9874-a2b59bee585d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7744ea8b-164a-4992-9874-a2b59bee585d.' },
  { sku: 'Good Sense Childrens All Day Allergy (50090-7068)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 8c99c767-6b46-4819-89df-c02f478a45be. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c99c767-6b46-4819-89df-c02f478a45be.' },
  { sku: 'Good Sense Nicotine (0113-0532)', reason: 'REFUSED exact panel string `gum base`. Setid 788214db-3f78-4209-b3b6-d59cc9be3421. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=788214db-3f78-4209-b3b6-d59cc9be3421.' },
  { sku: 'good sense aspirin (0113-0467)', reason: 'REFUSED exact panel string `dextrose excipient`. Setid e9fddbc1-11fe-4cf6-8794-1650fa1b32ae. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e9fddbc1-11fe-4cf6-8794-1650fa1b32ae.' },
  { sku: 'GOOD SENSE NICOTINE (0113-4111)', reason: 'REFUSED exact panel string `gum base`, `menthol`. Setid 8823c7a9-22b3-492b-b72d-70e7cb1a3f47. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8823c7a9-22b3-492b-b72d-70e7cb1a3f47.' },
  { sku: 'GOOD SENSE NIGHT TIME (0113-6012)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid cd68289b-3850-40c6-9439-aae0e2d7637d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cd68289b-3850-40c6-9439-aae0e2d7637d.' },
  { sku: 'good sense nicotine (0113-1352)', reason: 'REFUSED exact panel string `gum base`. Setid 8647dca6-676b-4279-8e20-17153feb9974. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8647dca6-676b-4279-8e20-17153feb9974.' },
  { sku: 'good sense nighttime (0113-0459)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`. Setid f90bd64a-dd1a-4319-87cd-427d57f677ab. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f90bd64a-dd1a-4319-87cd-427d57f677ab.' },
  { sku: 'Good Sense antidiarrheal (68788-8796)', reason: 'REFUSED exact panel string `anhydrous citric acid`. Setid 672ca656-6abb-42d4-8dbc-9f3428c35058. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=672ca656-6abb-42d4-8dbc-9f3428c35058.' },
  { sku: 'GOOD SENSE NICOTINE (0113-7020)', reason: 'REFUSED exact panel string `benzaldehyde`, `calcium polycarbophil`, `menthol-dl`. Setid d1aa6f5c-3358-48f9-b0ac-5c91ea801a7a. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d1aa6f5c-3358-48f9-b0ac-5c91ea801a7a.' },
  { sku: 'GOOD SENSE NICOTINE (0113-7031)', reason: 'REFUSED exact panel string `benzaldehyde`, `calcium polycarbophil`, `menthol-dl`. Setid 357240fd-adc0-420a-bf79-8f2eef2bc5da. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=357240fd-adc0-420a-bf79-8f2eef2bc5da.' },
  { sku: 'good sense ibuprofen (68788-4036)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`. Setid 7ac61180-d668-4eec-b04f-d14f7b552a4d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7ac61180-d668-4eec-b04f-d14f7b552a4d.' },
  { sku: 'Good Sense Cherry Cough Drops (50804-014)', reason: 'REFUSED exact panel string `corn syrup`, `eucalyptus oil`. Setid c72db7f0-9324-8ed2-e053-2995a90a9868. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c72db7f0-9324-8ed2-e053-2995a90a9868.' },
  { sku: 'Good Sense Honey Lemon Cough Drops (50804-021)', reason: 'REFUSED exact panel string `corn syrup`, `eucalyptus oil`. Setid c72e557f-0211-81b9-e053-2995a90a1437. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c72e557f-0211-81b9-e053-2995a90a1437.' },
  { sku: 'Good Sense Cherry Benzocaine Lozenges (50804-025)', reason: 'REFUSED exact panel string `corn syrup`. Setid c7404c94-09eb-5cc5-e053-2995a90af021. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c7404c94-09eb-5cc5-e053-2995a90af021.' },
  { sku: 'Good Sense Antacid Soft Chew (50804-027)', reason: 'REFUSED exact panel string `confectioner\'s sugar`, `corn syrup`, `sorn syrup solids`, `hydrogenated coconut oil`. Setid c7420218-b20e-0f0d-e053-2995a90a2386. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c7420218-b20e-0f0d-e053-2995a90a2386.' },
  { sku: 'Good Sense SF Honey Lemon Cough Drops (50804-028)', reason: 'REFUSED exact panel string `eucalyptus oil`, `maltitol syrup`. Setid e11ed21f-6ceb-5908-e053-2995a90aea46. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e11ed21f-6ceb-5908-e053-2995a90aea46.' },
  { sku: 'Good sense sleep aid (0113-0441)', reason: 'REFUSED exact panel string `anhydrous dibasic calcium phosphate`. Setid f0a0eb93-96e0-432b-9b82-f0e891483be0. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f0a0eb93-96e0-432b-9b82-f0e891483be0.' },
  { sku: 'Good Sense Nicotine (0113-0734)', reason: 'REFUSED exact panel string `calcium polycarbophil`. Setid 477689fc-688a-4c76-8c02-35a7a15adc5e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=477689fc-688a-4c76-8c02-35a7a15adc5e.' },
  { sku: 'Good Sense Dual Action Complete (0113-0032)', reason: 'REFUSED exact panel string `polyacrylate dispersion`. Setid b7154648-8c8c-4ce6-88b7-5442a16143c5. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b7154648-8c8c-4ce6-88b7-5442a16143c5.' },
  { sku: 'good sense cough dm (0113-0384)', reason: 'REFUSED exact panel string `high fructose corn syrup`, `polyvinyl acetate`, `sodium polystyrene sulfonate`, `tragacanth gum`. Setid 1b11b25b-2716-45f9-830f-ddf622366e60. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1b11b25b-2716-45f9-830f-ddf622366e60.' },
  { sku: 'Good Sense childrens allergy relief (68071-3904)', reason: 'REFUSED exact panel string `edetate disodium`, `monobasic sodium phosphate`, `phosphoric acid`. Setid 40d25cdf-b63f-d5c9-e063-6394a90af509. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=40d25cdf-b63f-d5c9-e063-6394a90af509.' },
  { sku: 'Good Sense antidiarrheal (0113-1645)', reason: 'REFUSED exact panel string `anhydrous citric acid`. Setid 9928de7e-c148-4a19-a946-d4af911c2631. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9928de7e-c148-4a19-a946-d4af911c2631.' },
  { sku: 'Good Sense Pain Relief Roll On (50804-187)', reason: 'REFUSED exact panel string `glycerin stearate`. Setid 38e76fd6-e5fb-493c-e063-6294a90afed4. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38e76fd6-e5fb-493c-e063-6294a90afed4.' },
  { sku: 'good sense childrens cold cough (0113-6019)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid 2ffe0fbc-236d-417b-bbfd-5b9294f3c90a. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2ffe0fbc-236d-417b-bbfd-5b9294f3c90a.' },
  { sku: 'good sense childrens pain and fever (68071-3869)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid 3777f4fb-d279-199d-e063-6394a90acf36. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3777f4fb-d279-199d-e063-6394a90acf36.' },
  { sku: 'Good Sense Ibuprofen (0113-0660)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`. Setid 321d6b3a-3dff-4334-b6ee-6ac801b9907c. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=321d6b3a-3dff-4334-b6ee-6ac801b9907c.' },
  { sku: 'good sense ibuprofen (0113-0166)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`. Setid b8e3ad4f-3212-4674-bcdf-a60a6b23d7bb. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b8e3ad4f-3212-4674-bcdf-a60a6b23d7bb.' },
  { sku: 'good sense childrens allergy relief (0113-1719)', reason: 'REFUSED exact panel string `edetate disodium`, `monobasic sodium phosphate`, `phosphoric acid`. Setid 4ce244e2-9fbc-4371-8806-789fd3a61a09. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ce244e2-9fbc-4371-8806-789fd3a61a09.' },
  { sku: 'Good Sense childrens allergy relief (0113-0671)', reason: 'REFUSED exact panel string `edetate disodium`, `monobasic sodium phosphate`, `phosphoric acid`. Setid 637e309d-9846-45a1-ad11-f67ea85c87b8. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=637e309d-9846-45a1-ad11-f67ea85c87b8.' },
  { sku: 'good sense ibuprofen (0113-0897)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`. Setid 6127469c-143f-4dd2-bd37-6630291fcd5a. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6127469c-143f-4dd2-bd37-6630291fcd5a.' },
  { sku: 'good sense ibuprofen pm (0113-0050)', reason: 'REFUSED exact panel string `glyceryl behenate`. Setid 0488786f-9b6b-4935-bb57-bcb2565447f8. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0488786f-9b6b-4935-bb57-bcb2565447f8.' },
  { sku: 'Good Sense Ibuprofen (0113-0685)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`. Setid 1a6b42be-c0c2-48f8-9ba3-22d1f0c0b18d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1a6b42be-c0c2-48f8-9ba3-22d1f0c0b18d.' },
  { sku: 'good sense sleep aid ultra (0113-4032)', reason: 'REFUSED exact panel string `anhydrous dibasic calcium phosphate`. Setid 300826cf-6d0d-4efb-97aa-aa7dfff3add2. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=300826cf-6d0d-4efb-97aa-aa7dfff3add2.' },
  { sku: 'Good Sense Childrens All Day Allergy (0113-0189)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 19120ef7-e9ca-435d-beab-6278b5756d6b. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=19120ef7-e9ca-435d-beab-6278b5756d6b.' },
  { sku: 'good sense sleep aid ultra (0113-6044)', reason: 'REFUSED exact panel string `anhydrous dibasic calcium phosphate`. Setid 6907ffd1-39cb-4cc5-9c8a-bd975a5b06bd. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6907ffd1-39cb-4cc5-9c8a-bd975a5b06bd.' },
  { sku: 'good sense all day allergy d (0113-0147)', reason: 'REFUSED exact panel string `low-substituted hydroxypropyl cellulose`. Setid c7154370-5d91-4dc4-90ed-1d07d9bc5943. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c7154370-5d91-4dc4-90ed-1d07d9bc5943.' },
  { sku: 'Good Sense Lansoprazole (0113-0116)', reason: 'REFUSED exact panel string `hypromellose phthalate`, `meglumine`. Setid d86585b7-e146-4f04-9016-412b16e06f55. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d86585b7-e146-4f04-9016-412b16e06f55.' },
  { sku: 'good sense omeprazole (0113-0520)', reason: 'REFUSED exact panel string `amino methacrylate copolymer`, `hypromellose phthalate`, `sodium stearate`. Setid dcd93796-8904-415d-a379-c4ea590cf544. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dcd93796-8904-415d-a379-c4ea590cf544.' },
  { sku: 'Good Sense Childrens All Day Allergy (68788-8803)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 0be90b3d-be71-4d38-bbf7-bf89a647ca8e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0be90b3d-be71-4d38-bbf7-bf89a647ca8e.' },
  { sku: 'good sense tussin dm (68788-8300)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 15c8e177-a381-43b2-aed8-d917c7c4372e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=15c8e177-a381-43b2-aed8-d917c7c4372e.' },
  { sku: 'Good Sense Omeprazole (0113-0915)', reason: 'REFUSED exact panel string `hypromellose acetate succinate`, `monoethanolamine`, `sodium stearate`. Setid 11dfbf6c-59bf-4a30-b627-f49ccd31c0d0. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=11dfbf6c-59bf-4a30-b627-f49ccd31c0d0.' },
  { sku: 'good sense allergy (68071-3734)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `poloxamer 407`, `sorbitol solution`. Setid 2861b801-e778-822d-e063-6394a90aa1a8. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2861b801-e778-822d-e063-6394a90aa1a8.' },
  { sku: 'Good Sense Childrens Pain and Fever (0113-0212)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid c6b79501-d08b-4430-9545-70da5f545975. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c6b79501-d08b-4430-9545-70da5f545975.' },
  { sku: 'Good Sense Childrens Cold and Cough (0113-0987)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid 8a87104f-94a4-4585-afd5-d610eea32e39. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8a87104f-94a4-4585-afd5-d610eea32e39.' },
  { sku: 'Good Sense Effervescent Cold Relief (50804-873)', reason: 'REFUSED exact panel string `docusate sodium`. Setid cd25e250-bb8b-7e83-e053-2a95a90a2639. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cd25e250-bb8b-7e83-e053-2a95a90a2639.' },
  { sku: 'good sense night time cold and flu (0113-2501)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid 89dc1423-d097-47a8-9025-eab5381cca26. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=89dc1423-d097-47a8-9025-eab5381cca26.' },
  { sku: 'good sense day time cold and flu (0113-2299)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid 4ac6b64a-8214-4b03-8aa5-0d3199cf0b72. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ac6b64a-8214-4b03-8aa5-0d3199cf0b72.' },
  { sku: 'good sense tussin dm (0113-1725)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid cb8a1d81-b1a3-4217-b157-9e5d398f202d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cb8a1d81-b1a3-4217-b157-9e5d398f202d.' },
  { sku: 'Good Sense Severe NightTime (0113-0019)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid 0e3c36c9-d45b-41b9-891d-a42d854295f9. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0e3c36c9-d45b-41b9-891d-a42d854295f9.' },
  { sku: 'Good Sense Severe NightTime Cold and Flu (0113-0763)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `edetate disodium`, `sorbitol solution`. Setid f2b77bc3-ba1e-4c3f-bbbd-fa93b2c37dd2. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f2b77bc3-ba1e-4c3f-bbbd-fa93b2c37dd2.' },
  { sku: 'Good Sense Sleep Time (0113-0186)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `poloxamer 407`. Setid 164200a9-b1f8-44c9-8598-a7dff5020e9d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=164200a9-b1f8-44c9-8598-a7dff5020e9d.' },
  { sku: 'good sense anti itch (50090-7255)', reason: 'REFUSED exact panel string `isostearyl neopentanoate`, `aloe barbadensis leaf juice`. Setid 072dd455-24a5-4a44-aaef-d3e137d005a6. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=072dd455-24a5-4a44-aaef-d3e137d005a6.' },
  { sku: 'good sense tussin dm (50090-7257)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 19b3db33-86d1-48f3-9525-c7c87a4b6899. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=19b3db33-86d1-48f3-9525-c7c87a4b6899.' },
  { sku: 'good sense arthritis pain (50090-7250)', reason: 'REFUSED exact panel string `polyoxyl 20 cetostearyl ether`. Setid 5f1ca9c1-c7fe-4a91-af5e-dc22b175f083. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5f1ca9c1-c7fe-4a91-af5e-dc22b175f083.' },
  { sku: 'good sense childrens pain and fever (50090-7254)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid ce4ae43b-4ec2-42d1-b665-9114aaeb857e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ce4ae43b-4ec2-42d1-b665-9114aaeb857e.' },
  { sku: 'good sense childrens pain and fever (0113-0020)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid 61a88a72-cf4f-4ec9-bc24-e110adfb98ba. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=61a88a72-cf4f-4ec9-bc24-e110adfb98ba.' },
  { sku: 'Good Sense Esomeprazole Magnesium (0113-0898)', reason: 'REFUSED exact panel string `meglumine`. Setid 4a89b4b5-5c42-44ee-98a9-e26a237aaef7. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4a89b4b5-5c42-44ee-98a9-e26a237aaef7.' },
  { sku: 'Good Sense Effervescent Pain Relief (50804-422)', reason: 'REFUSED exact panel string `anhydrous citric acid`. Setid 103027a7-2f0e-8d8c-e063-6294a90aedc7. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=103027a7-2f0e-8d8c-e063-6294a90aedc7.' },
  { sku: 'good sense esomeprazole magnesium (0113-0651)', reason: 'REFUSED exact panel string `meglumine`. Setid e54f2cc9-1d5f-4f0a-8bcf-bd5b917d98ec. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e54f2cc9-1d5f-4f0a-8bcf-bd5b917d98ec.' },
  { sku: 'good sense omeprazole delayed release (0113-1803)', reason: 'REFUSED exact panel string `hypromellose acetate succinate`, `menthol`, `monoethanolamine`, `sodium stearate`. Setid 38082e59-c509-4be5-b29c-33a97565df1c. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38082e59-c509-4be5-b29c-33a97565df1c.' },
  { sku: 'good sense childrens pain and fever (0113-0608)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid ab96395c-a19e-40d6-b37e-7f988026fc95. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab96395c-a19e-40d6-b37e-7f988026fc95.' },
  { sku: 'Good Sense Lansoprazole (0113-1114)', reason: 'REFUSED exact panel string `low substituted hydroxypropyl cellulose`, `meglumine`. Setid 91d69826-df5c-47a2-b852-3083629d1893. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=91d69826-df5c-47a2-b852-3083629d1893.' },
  { sku: 'good sense pain and fever (0113-0946)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid 7b4c7e4c-1536-45ab-a59b-4d5dd8eb2eb4. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7b4c7e4c-1536-45ab-a59b-4d5dd8eb2eb4.' },
  { sku: 'good sense nicotine (50090-7063)', reason: 'REFUSED exact panel string `gum base`, `menthol`. Setid af4323b6-5240-4697-992a-512c4d098340. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af4323b6-5240-4697-992a-512c4d098340.' },
  { sku: 'Good Sense pain and fever (0113-0161)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid 48833e6a-db42-42b8-aa75-07103a1482a2. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=48833e6a-db42-42b8-aa75-07103a1482a2.' },
  { sku: 'Good Sense Omeprazole (0113-1723)', reason: 'REFUSED exact panel string `hypromellose acetate succinate`, `menthol`, `monoethanolamine`, `sodium stearate`. Setid db333c49-2c3e-4ade-a202-7d4499205fc4. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=db333c49-2c3e-4ade-a202-7d4499205fc4.' },
  { sku: 'good sense aspirin (71205-442)', reason: 'REFUSED exact panel string `dextrose excipient`. Setid 73013074-9c6e-43c7-acde-4d9d8ed0133d. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=73013074-9c6e-43c7-acde-4d9d8ed0133d.' },
  { sku: 'good sense nicotine (50090-6695)', reason: 'REFUSED exact panel string `gum base`, `menthol`. Setid 24cffa97-44fb-4b29-a876-b9c040b60748. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24cffa97-44fb-4b29-a876-b9c040b60748.' },
  { sku: 'Good Sense Childrens Pain and Fever (71205-601)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid 46527b1f-7515-44ce-b5cb-9d24223b9af1. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=46527b1f-7515-44ce-b5cb-9d24223b9af1.' },
  { sku: 'GOOD SENSE (50090-6240)', reason: 'REFUSED exact panel string `gum base`. Setid dece0a8d-a7df-446f-bfcf-9f96e8bfc4ae. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dece0a8d-a7df-446f-bfcf-9f96e8bfc4ae.' },
  { sku: 'Good Sense All Day Allergy (0113-0981)', reason: 'REFUSED exact panel string `sorbitan`. Setid 5b1203c7-9678-4cee-9d7b-6510da295561. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5b1203c7-9678-4cee-9d7b-6510da295561.' },
  { sku: 'good sense aspirin (50090-5533)', reason: 'REFUSED exact panel string `dextrose excipient`. Setid baff37ed-663a-45d3-8599-b935da7e5772. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=baff37ed-663a-45d3-8599-b935da7e5772.' },
  { sku: 'Good Sense Nicotine (0113-0053)', reason: 'REFUSED exact panel string `gum base`, `menthol`. Setid fac52e0d-7a02-451e-a36b-30d49e929d3e. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fac52e0d-7a02-451e-a36b-30d49e929d3e.' },
  { sku: 'good sense tussin dm (50090-2336)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `menthol`. Setid 6ff1e1c5-bd49-4661-b12a-05741981275f. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6ff1e1c5-bd49-4661-b12a-05741981275f.' },
  { sku: 'good sense antacid (50090-3401)', reason: 'REFUSED exact panel string `sorbitol solution`. Setid 60518af3-965f-4d00-853a-9551fc3c398c. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=60518af3-965f-4d00-853a-9551fc3c398c.' },
  { sku: 'Good Sense (50804-092)', reason: 'REFUSED exact panel string `masking agent`, `noncrystallizing sorbitol solution`, `phosphoric acid`, `sodium phosphate monobasic dihydrate`. Setid 1cd1d710-0c4d-49ef-8b7d-daac8597b2a9. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1cd1d710-0c4d-49ef-8b7d-daac8597b2a9.' },
  { sku: 'good sense pain reliefchildrens (33261-770)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`, `tribasic sodium phosphate`. Setid 45ddd71d-de6c-4e21-a22a-0b37afcc429b. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=45ddd71d-de6c-4e21-a22a-0b37afcc429b.' },
  { sku: 'Good Sense ibuprofen (68258-2994)', reason: 'REFUSED exact panel string `ammonium glycerrhizin`, `prosweet`. Setid 56cb55bf-3fd8-4613-bc45-73e53204dc97. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=56cb55bf-3fd8-4613-bc45-73e53204dc97.' },
  { sku: 'good sense ibuprofen (42254-117)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `high fructose corn syrup`, `sorbitol solution`. Setid cf785971-902f-4423-866e-6edf44706679. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cf785971-902f-4423-866e-6edf44706679.' },
  { sku: 'GoodSense Menthol Cough Drops (50804-013)', reason: 'REFUSED exact panel string `corn syrup`, `eucalyptus oil`. Setid c6b25d69-8930-6867-e053-2a95a90ad208. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c6b25d69-8930-6867-e053-2a95a90ad208.' },
  { sku: 'GoodSense Tussin CF Multi-Symptom Cold, Raspberry (50804-256)', reason: 'REFUSED exact panel string `anhydrous citric acid`, `sorbitol solution`. Setid 3f05cf84-d485-7688-e063-6394a90ae740. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3f05cf84-d485-7688-e063-6394a90ae740.' },
  { sku: 'GoodSense Extra Strength Antacid (50804-129)', reason: 'REFUSED exact panel string `dextrose`. Setid 2fcdeb06-17de-49d8-97bb-8d31e1c0c61f. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2fcdeb06-17de-49d8-97bb-8d31e1c0c61f.' },
  { sku: 'Goodsense Ultra Strength Antacid (50804-175)', reason: 'REFUSED exact panel string `dextrose`. Setid 492deace-7ea1-4fe3-a4c7-b2c6f195d68c. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=492deace-7ea1-4fe3-a4c7-b2c6f195d68c.' },
  { sku: 'GOODSENSE Ultra Strength Antacid Peppermint (50804-176)', reason: 'REFUSED exact panel string `dextrose`. Setid 04950b56-7760-4b6c-8110-86b6a3f795b4. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=04950b56-7760-4b6c-8110-86b6a3f795b4.' },
  { sku: 'Goodsense Regular Strength Antacid Peppermint (50804-113)', reason: 'REFUSED exact panel string `dextrose`. Setid 32c04f3e-59f3-44aa-ad92-672444982710. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32c04f3e-59f3-44aa-ad92-672444982710.' },
  { sku: 'GOODSENSE Ultra Strength Antacid Assorted Fruit (50804-171)', reason: 'REFUSED exact panel string `dextrose`. Setid ad4d51f6-b55b-45db-b034-fb3da54fbe99. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad4d51f6-b55b-45db-b034-fb3da54fbe99.' },
  { sku: 'Goodsense Extra Strength Antacid Assorted Fruit (50804-127)', reason: 'REFUSED exact panel string `dextrose`. Setid ae6270fc-0f8d-4bba-8f12-adba3f07f7c5. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae6270fc-0f8d-4bba-8f12-adba3f07f7c5.' },
  { sku: 'Goodsense maximum strength Stomach Relief 528 (50804-154)', reason: 'REFUSED exact panel string `salicylic acid`. Setid 19a4191a-6196-f8ac-e063-6394a90a47ab. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=19a4191a-6196-f8ac-e063-6394a90a47ab.' },
  { sku: 'Goodsense Extra Strength Antacid (50804-151)', reason: 'REFUSED exact panel string `dextrose`. Setid 193a1805-9f57-29cd-e063-6394a90ab99f. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=193a1805-9f57-29cd-e063-6394a90ab99f.' },
  { sku: 'GoodSense Regular Strength Antacid (50804-112)', reason: 'REFUSED exact panel string `dextrose`. Setid 53de9018-fbe4-425a-85f6-ebf08d108730. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=53de9018-fbe4-425a-85f6-ebf08d108730.' },
  { sku: 'GoodSense Cherry Zinc Lozenges (75981-011)', reason: 'REFUSED exact panel string `corn syrup`, `glycine`. Setid c5fe07e0-3a2b-adf5-e053-2995a90a99ae. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5fe07e0-3a2b-adf5-e053-2995a90a99ae.' },
  { sku: 'GoodSense Antacid Fruit Chews (75981-012)', reason: 'REFUSED exact panel string `corn syrup`, `ethyl acetate`, `hydrogenated coconut oil`, `phosphoric acid`. Setid c5ffaaee-0f78-4a13-e053-2995a90ad6ba. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5ffaaee-0f78-4a13-e053-2995a90ad6ba.' },
];

const _ROWS = BATCH110_KYR6B_GOODSENSE_REMATCH;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
if (_ROWS.length !== 12) throw new Error('batch110 row count drift');
if (_grades.clean !== 0) throw new Error('batch110 clean drift');
if (_grades.caution !== 4) throw new Error('batch110 caution drift');
if (_grades.avoid !== 8) throw new Error('batch110 avoid drift');
const _formulaFirst = new Set<string>();
let _new = 0;
let _reuse = 0;
for (const r of _ROWS) {
  const id = r.formulaId ?? r.id;
  if (_formulaFirst.has(id)) _reuse += 1;
  else {
    _formulaFirst.add(id);
    _new += 1;
  }
}
if (_new !== 9 || _reuse !== 3) throw new Error('batch110 NEW/REUSE drift');
if (BATCH110_SKIPPED_NO_OI.length !== 0) throw new Error('batch110 no_OI drift');
if (BATCH110_SKIPPED_OUT.length !== 0) throw new Error('batch110 OUT drift');
if (BATCH110_SKIPPED_ALREADY.length !== 0) throw new Error('batch110 already drift');
if (BATCH110_REFUSED.length !== 129) throw new Error('batch110 REFUSED drift');
if (_ROWS.some((r) => r.recordStatus !== 'unverified')) {
  throw new Error('batch110 recordStatus must stay unverified');
}
if (_ROWS.some((r) => r.barcode)) throw new Error('batch110 unexpected barcode');
if (_ROWS.some((r) => !r.id.startsWith('goodsense-b110-'))) {
  throw new Error('batch110 ids must use goodsense-b110-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch110 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch110 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch110 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && (r.inactiveIngredients ?? []).some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch110 Clean row has a non-cleared inactive');
}
if (_ROWS.some((r) => r.verdict !== 'clean' && !(r.inactiveIngredients?.length))) {
  throw new Error('batch110 non-clean row missing a printed inactive');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH110_SKIPPED.map((s) => s.sku),
  ...BATCH110_REFUSED.map((s) => s.sku),
].join('\n');
if (/HealthA2Z|A\+Health|\bTIME-Cap\b|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch110 excluded brand leaked');
}
