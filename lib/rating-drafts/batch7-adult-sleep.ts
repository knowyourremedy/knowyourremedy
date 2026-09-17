// DRAFT / not verified / batch 7 adult sleep
// Sleep · audience 'adult' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Sleep picks file is edited from this draft.
// Methodology.md / PROJECT_NOTES.md are untouched.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// - S1 Hyland's Calms Forte tablets = Clean (homeopathic). setid 63ce9942.
//   Inactives: lactose / magnesium stearate / MCC / starch (corn and tapioca).
//   Carlston-style note only — cleanliness + evidentiary framework, no efficacy.
// - S2 Unisom SleepTabs (doxylamine 25 mg) = Avoid. Blue #1 lake. setid 7ae32d74.
// - S3 Unisom SleepMelts (DPH 25) = Avoid. Red 7 + sucralose + flavor. setid 9105f4f1.
// - S4 Unisom SleepMinis (DPH 25) = Avoid. Blue 1 + Red 3 + TiO2 + PS80. setid a9a44c2f.
// - S5 Unisom PM Pain (APAP + DPH) = Avoid. Blue 1 lake. setid 451daeeb.
// - S6 ZzzQuil LiquiCaps (DPH) = Avoid. Dyes + TiO2 + PEG. setid 0b2777be.
// - S7 ZzzQuil liquid dyed = Avoid. Dyes + sucralose + saccharin. setid 05f77c69.
// - S8 ZzzQuil FREE OF artificial dyes liquid = Avoid (dye-free trap:
//   sucralose + PG + saccharin + flavor + benzoate). setid 01906eed.
// - S9 ZzzQuil Soothing Sleep = Avoid. Multi dyes + PG + saccharin + flavors.
//   setid 0f8a8291.
// - S10 Simply Sleep = Avoid. Blue 1 lake + TiO2 + PEG + PS80. setid 37c606b0.
// - S11 Sominex = Avoid. Blue 1 + TiO2 + talc. setid f70ce1a6. Sominex Max
//   (DPH 50 mg, setid e8f6991f) is the same demerit family — one row, notes cover Max.
// - S12 Tylenol PM Extra Strength = Avoid. Blue 1 lake + TiO2 + PEG + PS80.
//   setid 435b1a31.
// - S13 Advil PM Liqui-Gels = Avoid. Red 33 + Blue 1 + PEG. setid 405afdb4.
// - S14 Advil PM caplets = Avoid. Blue 2 lake (+ SiO2 caution cap). setid 52c67ae0.
// - S15 Genexa Acetaminophen PM Extra Strength = Caution (maltodextrin Limited).
//   APAP 500 + DPH 25. setid d82cf6f3. Do NOT apply the adult Genexa ES Clean
//   maltodextrin exception. Organic oils / lecithin Cleared; tablet sunflower
//   oil / lecithin is NOT the gummy seed-oil High rule.
// - S16 up&up Nighttime Sleep Aid doxylamine = Avoid. Blue #1 lake. setid 24a0144d.
// - S17 Equate Nighttime Sleep-Aid softgels = Avoid. Dyes + TiO2 + PEG. setid 3d3f2e0c.
// - S18 Equate Nighttime Sleep Aid tablets = Avoid. Dye lakes + PEG. setid 6e162152.
// - S19 up&up Nighttime Sleep Aid liquid = Avoid. Dyes + PG + saccharin;
//   HFCS notes-only. setid 0ab5a374.
// - S20 CVS Nighttime Sleep-Aid liquid dyed = Avoid. Dyes + sucralose + flavor.
//   setid 9f944edc.
// - S21 CVS Health Nighttime Sleep Aid no-FD&C = Avoid (founder: Avoid if
//   sucralose plus another Limited/Moderate). Sucralose + flavor + sodium
//   benzoate + sorbitol. setid 03f521f4. Not Caution.
//
// TALLY (unverified drafts): 21 rows — Clean 1 / Caution 1 / Avoid 19.
// Independently Clean in THIS batch only: Calms Forte. Caution / Avoid rows
// offer that homeopathic tablet as the §6 alternative (form labeled).
// Do not invent Clean for melatonin or anything not on the approved list.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - Boiron Quietude
// - Genexa adult Sleepology
// - All melatonin without an exact approved SKU
// - Pure Zzzs
// - Kids Sleepology (kids batch)
// - Club-store Kirkland / Member's Mark sleep SKUs
//
// Seed/industrial oils High Avoid applies to GUMMIES only. Genexa PM tablet
// sunflower oil / lecithin are Cleared (v1.6 lecithin lock + not-a-gummy).
// BKC = Caution standalone — N/A in this batch.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SLEEP = 'Sleep';
const ADULT = 'adult' as const;
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  ps20:
    'Methodology §5 Moderate-risk (polysorbate 20 — same 2023 gut-barrier signal as PS80; locked v1.6)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  lecithin: 'Methodology §5 Cleared (lecithin, soy or sunflower — locked v1.6)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar — locked v1.6)',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors)',
  riceBran:
    'Methodology §5 Cleared (organic rice bran extract — hull/concentrate family; locked Sept 14, 2026)',
  riceHull:
    'Methodology §5 Cleared (organic rice hull extract / rice concentrate / ground rice hulls — plant-fiber flow agent)',
  riceExtract:
    'Methodology §5 Limited-risk (unspecified rice extract — Caution/Limited opacity; label did not name hull, bran, or concentrate)',
  inulin: 'Methodology §5 Cleared (inulin — food fiber; locked Sept 14, 2026 housekeeping)',
  dibehenin:
    'Methodology §5 Cleared (dibehenin, vegetable — vegetable wax/lubricant; stearate / wax family; locked Sept 14, 2026)',
  cleared: 'Methodology §5 Cleared',
} as const;

const RICE_EXTRACT_TAP =
  'Label only says rice extract — it doesn’t name hull, bran, or concentrate. We mark that Caution because the form isn’t clear. Named organic rice hull extract, rice concentrate, ground rice hulls, or organic rice bran extract are Cleared.';

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const SEDATING =
  'Nighttime first-generation antihistamine — labeled drowsiness will occur; next-day drowsiness can linger. Cleanliness grade only; no efficacy claim.';

const CALMS_FORTE = 'hylands-calms-forte';

// Independently Clean rows in THIS batch only. Form is labeled, not a hard
// filter (§6). No conventional Clean sleep aid is approved here.
const SLEEP_ALTS: CleanAlternative[] = [
  {
    productId: CALMS_FORTE,
    rankReason:
      'Independently Clean adult Sleep analog in this batch (Hyland\'s Calms Forte, homeopathic tablets). Form: tablet — labeled, not a hard filter (§6). Conventional sedating-antihistamine sleep aids have no independently Clean match in this batch.',
  },
];

export const BATCH7_ADULT_SLEEP: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: CALMS_FORTE,
    productName: "Hyland's Calms Forte Tablets",
    brand: "Hyland's",
    category: SLEEP,
    barcode: '354973325722',
    formulaId: CALMS_FORTE,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Avena sativa', strength: '4X HPUS' },
      { name: 'Calcarea phosphorica', strength: '3X HPUS' },
      { name: 'Chamomilla', strength: '4X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '3X HPUS' },
      { name: 'Humulus lupulus', strength: '4X HPUS' },
      { name: 'Kali phosphoricum', strength: '3X HPUS' },
      { name: 'Magnesia phosphorica', strength: '3X HPUS' },
      { name: 'Natrum phosphoricum', strength: '3X HPUS' },
      { name: 'Passiflora', strength: '4X HPUS' },
    ],
    inactiveIngredients: [
      cleared('63ce9942-a299-4d9b-b63b-35b297472dc9', 'Lactose'),
      cleared('63ce9942-a299-4d9b-b63b-35b297472dc9', 'Magnesium stearate'),
      cleared('63ce9942-a299-4d9b-b63b-35b297472dc9', 'Microcrystalline cellulose'),
      cleared('63ce9942-a299-4d9b-b63b-35b297472dc9', 'Starch (corn and tapioca)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Hyland\'s Calms Forte tablets = Clean. Draft Clean on inactives (lactose, magnesium stearate, microcrystalline cellulose, corn and tapioca starch). Homeopathic tablets — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Contains lactose. Adult Sleep row; carton also has a 6–11 chart. Pack sizes share formulaId.',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      'DailyMed setid 63ce9942-a299-4d9b-b63b-35b297472dc9 (draft, not verified)',
      CARLSTON,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'genexa-acetaminophen-pm',
    productName: 'Genexa Acetaminophen PM Extra Strength',
    brand: 'Genexa',
    category: SLEEP,
    barcode: '850015736148',
    formulaId: 'genexa-acetaminophen-pm',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    inactiveIngredients: [
      flag(
        'Maltodextrin',
        'limited',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.maltodextrin),
      ),
      flag(
        'Sunflower oil',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.cleared),
      ),
      flag(
        'Sunflower lecithin (organic)',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.lecithin),
      ),
      flag(
        'Palm olein (organic)',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.cleared),
      ),
      flag(
        'Agave syrup (organic)',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.organicFlavor),
      ),
      flag(
        'Acacia (gum arabic)',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.gums),
      ),
      flag(
        'Guar gum',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.gums),
      ),
      cleared('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', 'Carnauba wax (organic)'),
      cleared('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', 'Calcium carbonate'),
      cleared('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', 'Cellulose'),
      cleared('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', 'Dextrose'),
      cleared('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', 'Glycerin'),
      cleared('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', 'Sodium bicarbonate'),
      flag(
        'Organic rice bran extract',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.riceBran),
      ),
      flag(
        'Rice hulls',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.riceHull),
      ),
      flag(
        'Rice extract',
        'limited',
        `${dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.riceExtract)} ${RICE_EXTRACT_TAP}`,
      ),
      flag(
        'Inulin',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.inulin),
      ),
      flag(
        'Dibehenin (vegetable source)',
        'cleared',
        dailymed('d82cf6f3-a291-ca2b-e053-2a95a90a6de1', METH.dibehenin),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Genexa Acetaminophen PM Extra Strength = Caution (maltodextrin Limited 1 pt + unspecified rice extract Limited opacity 1 pt → 2 pts). Do NOT apply the adult Genexa ES Clean maltodextrin exception. Organic sunflower oil / lecithin / palm olein are Cleared on this coated tablet (not a gummy). Rice hulls / organic rice bran extract / inulin / dibehenin (vegetable) are now §5 Cleared. Unspecified rice extract stays Limited opacity (not enough alone to Avoid). Stay under 4 g/day acetaminophen, same as any APAP. ' +
      SEDATING +
      ' Ages 12+ (under 12: ask a doctor).',
    retailers: ['CVS', 'Target', 'Walmart', 'Whole Foods', 'Sprouts'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid d82cf6f3-a291-ca2b-e053-2a95a90a6de1 (draft, not verified)',
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'unisom-sleeptabs-doxylamine',
    productName: 'Unisom SleepTabs',
    brand: 'Unisom',
    category: SLEEP,
    barcode: '041167006092',
    formulaId: 'unisom-sleeptabs-doxylamine',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Doxylamine succinate', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('7ae32d74-76a0-47e2-9e5c-812426413c4e', METH.dyes),
      ),
      cleared('7ae32d74-76a0-47e2-9e5c-812426413c4e', 'Dibasic calcium phosphate dihydrate'),
      cleared('7ae32d74-76a0-47e2-9e5c-812426413c4e', 'Magnesium stearate'),
      cleared('7ae32d74-76a0-47e2-9e5c-812426413c4e', 'Microcrystalline cellulose'),
      cleared('7ae32d74-76a0-47e2-9e5c-812426413c4e', 'Sodium starch glycolate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Unisom SleepTabs = Avoid. FD&C Blue #1 aluminum lake is High-tier. Dose is one 25 mg tablet at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 7ae32d74-76a0-47e2-9e5c-812426413c4e (draft, not verified)',
    ],
  },
  {
    id: 'unisom-sleepmelts',
    productName: 'Unisom SleepMelts',
    brand: 'Unisom',
    category: SLEEP,
    barcode: '041167001400',
    formulaId: 'unisom-sleepmelts',
    audience: ADULT,
    minAge: 12,
    form: 'melt tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 7',
        'high',
        dailymed('9105f4f1-7f94-408d-a025-83afb68dc9f0', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('9105f4f1-7f94-408d-a025-83afb68dc9f0', METH.sucralose),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('9105f4f1-7f94-408d-a025-83afb68dc9f0', METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('9105f4f1-7f94-408d-a025-83afb68dc9f0', METH.mannitol),
      ),
      cleared('9105f4f1-7f94-408d-a025-83afb68dc9f0', 'Citric acid'),
      cleared('9105f4f1-7f94-408d-a025-83afb68dc9f0', 'Microcrystalline cellulose'),
      cleared('9105f4f1-7f94-408d-a025-83afb68dc9f0', 'Povidone'),
      cleared('9105f4f1-7f94-408d-a025-83afb68dc9f0', 'Starch'),
      cleared('9105f4f1-7f94-408d-a025-83afb68dc9f0', 'Sucrose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Unisom SleepMelts = Avoid. Red 7 (High) plus sucralose (Moderate) and flavor (Limited). Mannitol is also Limited. Ethylcellulose / hydroxypropyl cellulose are on the SPL and are not in Methodology §5 (ungraded; not the Avoid drivers). Labeled 2 tablets (25 mg each) at bedtime. Ages 12+. Form: melt tablet vs Calms Forte swallowed tablet — labeled, not a hard filter (§6). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 9105f4f1-7f94-408d-a025-83afb68dc9f0 (draft, not verified)',
    ],
  },
  {
    id: 'unisom-sleepminis',
    productName: 'Unisom SleepMinis',
    brand: 'Unisom',
    category: SLEEP,
    barcode: '041167006702',
    formulaId: 'unisom-sleepminis',
    audience: ADULT,
    minAge: 12,
    form: 'mini-capsule',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', METH.dyes),
      ),
      flag(
        'FD&C Red No. 3',
        'high',
        dailymed('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', METH.tio2),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', METH.ps80),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', METH.sorbate),
      ),
      cleared('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', 'Citric acid'),
      cleared('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', 'Gelatin'),
      cleared('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', 'Lactose'),
      cleared('a9a44c2f-65eb-4a5a-9e72-43652dce57f7', 'Pregelatinized corn starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Unisom SleepMinis = Avoid. Blue #1 + Red #3 + titanium dioxide (High) and polysorbate 80 (Moderate). Red 3 remains High after the 2025 FDA revocation. Labeled 2 mini-capsules (50 mg) at bedtime. Ages 12+. ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid a9a44c2f-65eb-4a5a-9e72-43652dce57f7 (draft, not verified)',
    ],
  },
  {
    id: 'unisom-pm-pain',
    productName: 'Unisom PM Pain',
    brand: 'Unisom',
    category: SLEEP,
    barcode: '041167004043',
    formulaId: 'unisom-pm-pain',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg' },
      { name: 'Diphenhydramine HCl', strength: '50mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', METH.dyes),
      ),
      flag(
        'Magnesium silicate (talc)',
        'high',
        dailymed('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', METH.talc),
      ),
      flag(
        'Silica (silicon dioxide)',
        'cleared',
        dailymed('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', METH.sio2),
      ),
      cleared('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', 'Croscarmellose sodium'),
      cleared('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', 'Hypromellose'),
      cleared('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', 'Magnesium stearate'),
      cleared('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', 'Microcrystalline cellulose'),
      cleared('451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb', 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Unisom PM Pain = Avoid. Blue #1 lake is High-tier. Carton also lists magnesium silicate (talc — High; IARC 2A) and silica (SiO2 nanoparticle Caution cap, 0 pts). Mineral oil is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake) — not required to reach Avoid. One caplet at bedtime (APAP 325 mg + DPH 50 mg); do not exceed 1 caplet / 24 hours. Stay under 4 g/day acetaminophen from all sources. Ages 12+ (this adult product: do not use under 12). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 451daeeb-88a9-44b1-9a2d-1ff0b0ec41cb (draft, not verified)',
    ],
  },
  {
    id: 'zzzquil-liquicaps',
    productName: 'ZzzQuil LiquiCaps',
    brand: 'ZzzQuil',
    category: SLEEP,
    barcode: '323900014015',
    formulaId: 'zzzquil-liquicaps',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('0b2777be-85d4-443d-b65f-6750e0ba97ba', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('0b2777be-85d4-443d-b65f-6750e0ba97ba', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('0b2777be-85d4-443d-b65f-6750e0ba97ba', METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('0b2777be-85d4-443d-b65f-6750e0ba97ba', METH.peg),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('0b2777be-85d4-443d-b65f-6750e0ba97ba', METH.mannitol),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('0b2777be-85d4-443d-b65f-6750e0ba97ba', METH.sorbitol),
      ),
      cleared('0b2777be-85d4-443d-b65f-6750e0ba97ba', 'Gelatin'),
      cleared('0b2777be-85d4-443d-b65f-6750e0ba97ba', 'Glycerin'),
      cleared('0b2777be-85d4-443d-b65f-6750e0ba97ba', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: ZzzQuil LiquiCaps = Avoid. Dyes + titanium dioxide + PEG. Cited convenience-pack SPL 0b2777be (Lil\' Drug Store); P&G national LiquiCaps twin ad4babdb is the same dyes / TiO2 / PEG Avoid family. Shellac / simethicone / sorbitan are ungraded appearance / processing aids (not the Avoid drivers). Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 0b2777be-85d4-443d-b65f-6750e0ba97ba (draft, not verified)',
    ],
  },
  {
    id: 'zzzquil-liquid-dyed',
    productName: 'ZzzQuil Nighttime Sleep-Aid Liquid',
    brand: 'ZzzQuil',
    category: SLEEP,
    barcode: '323900038585',
    formulaId: 'zzzquil-liquid-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.sucralose),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.saccharin),
      ),
      flag(
        'Polysorbate 20',
        'moderate',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.ps20),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.sorbitol),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        dailymed('05f77c69-c8ea-f8ba-e063-6394a90aa60f', METH.gums),
      ),
      cleared('05f77c69-c8ea-f8ba-e063-6394a90aa60f', 'Glycerin'),
      cleared('05f77c69-c8ea-f8ba-e063-6394a90aa60f', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: ZzzQuil dyed liquid = Avoid. Blue #1 + Red #40 plus sucralose and saccharin. Alcohol is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake) — not the Avoid driver. One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 05f77c69-c8ea-f8ba-e063-6394a90aa60f (draft, not verified)',
    ],
  },
  {
    id: 'zzzquil-free-of-artificial',
    productName: 'ZzzQuil FREE OF Artificial Dyes Nighttime Sleep-Aid',
    brand: 'ZzzQuil',
    category: SLEEP,
    barcode: '323900033856',
    formulaId: 'zzzquil-free-of-artificial',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('01906eed-78ee-f2a1-e063-6294a90a809b', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('01906eed-78ee-f2a1-e063-6294a90a809b', METH.pg),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('01906eed-78ee-f2a1-e063-6294a90a809b', METH.saccharin),
      ),
      flag(
        'Polysorbate 20',
        'moderate',
        dailymed('01906eed-78ee-f2a1-e063-6294a90a809b', METH.ps20),
      ),
      flag(
        'Natural flavor',
        'limited',
        dailymed('01906eed-78ee-f2a1-e063-6294a90a809b', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('01906eed-78ee-f2a1-e063-6294a90a809b', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('01906eed-78ee-f2a1-e063-6294a90a809b', METH.sorbitol),
      ),
      cleared('01906eed-78ee-f2a1-e063-6294a90a809b', 'Citric acid'),
      cleared('01906eed-78ee-f2a1-e063-6294a90a809b', 'Glycerin'),
      cleared('01906eed-78ee-f2a1-e063-6294a90a809b', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: ZzzQuil FREE OF artificial dyes = Avoid (dye-free trap). Sucralose + oral PG + saccharin + flavor + benzoate. Dye-free is not Clean. Polysorbate 20 is also Moderate (v1.6, same gut-barrier signal as PS80). One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 01906eed-78ee-f2a1-e063-6294a90a809b (draft, not verified)',
    ],
  },
  {
    id: 'zzzquil-soothing-honey',
    productName: 'ZzzQuil Soothing Sleep Nighttime Sleep-Aid',
    brand: 'ZzzQuil',
    category: SLEEP,
    barcode: '323900033146',
    formulaId: 'zzzquil-soothing-honey',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10',
        'high',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.dyes),
      ),
      flag(
        'FD&C Green No. 3',
        'high',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.pg),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.saccharin),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.sucralose),
      ),
      flag(
        'Polysorbate 20',
        'moderate',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.ps20),
      ),
      flag(
        'Flavors (with chamomile and honey)',
        'limited',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('0f8a8291-7468-735e-e063-6394a90a6643', METH.sorbitol),
      ),
      cleared('0f8a8291-7468-735e-e063-6394a90a6643', 'Glycerin'),
      cleared('0f8a8291-7468-735e-e063-6394a90a6643', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: ZzzQuil Soothing Sleep = Avoid. Multi dyes (Yellow 10 / Green 3 / Red 40 / Yellow 6) plus oral PG, saccharin, and flavors. Honey / chamomile sit inside the flavor declaration (Limited opacity) — not a Clean honey syrup. One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 0f8a8291-7468-735e-e063-6394a90a6643 (draft, not verified)',
    ],
  },
  {
    id: 'simply-sleep',
    productName: 'Simply Sleep',
    brand: 'Simply Sleep',
    category: SLEEP,
    barcode: '300450843104',
    formulaId: 'simply-sleep',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', METH.peg),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', METH.ps80),
      ),
      cleared('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', 'Carnauba wax'),
      cleared('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', 'Croscarmellose sodium'),
      cleared('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', 'Hypromellose'),
      cleared('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', 'Magnesium stearate'),
      cleared('37c606b0-04d5-49f0-886a-3ee2c9b0e9cc', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Simply Sleep = Avoid. Blue #1 lake + titanium dioxide + PEG + polysorbate 80. Labeled 2 caplets at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 37c606b0-04d5-49f0-886a-3ee2c9b0e9cc (draft, not verified)',
    ],
  },
  {
    id: 'sominex',
    productName: 'Sominex',
    brand: 'Sominex',
    category: SLEEP,
    formulaId: 'sominex',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('f70ce1a6-c334-025e-e053-6294a90ae53f', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('f70ce1a6-c334-025e-e053-6294a90ae53f', METH.tio2),
      ),
      flag(
        'Talc',
        'high',
        dailymed('f70ce1a6-c334-025e-e053-6294a90ae53f', METH.talc),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed('f70ce1a6-c334-025e-e053-6294a90ae53f', METH.sio2),
      ),
      cleared('f70ce1a6-c334-025e-e053-6294a90ae53f', 'Croscarmellose sodium'),
      cleared('f70ce1a6-c334-025e-e053-6294a90ae53f', 'Hypromellose'),
      cleared('f70ce1a6-c334-025e-e053-6294a90ae53f', 'Lactose monohydrate'),
      cleared('f70ce1a6-c334-025e-e053-6294a90ae53f', 'Magnesium stearate'),
      cleared('f70ce1a6-c334-025e-e053-6294a90ae53f', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Sominex = Avoid. Blue #1 + titanium dioxide + talc. SiO2 is the nanoparticle Caution cap (0 pts), not the Avoid driver. Light mineral oil / triacetin are on the SPL and are not in Methodology §5 (ungraded; not the Avoid drivers). Sominex Max (DailyMed setid e8f6991f, diphenhydramine 50 mg) is the same Blue #1 / TiO2 / talc demerit family — not a second formulaId. Medtech original SPL f7858ecf shares the same inactives. Ages 12+. ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid f70ce1a6-c334-025e-e053-6294a90ae53f (draft, not verified)',
    ],
  },
  {
    id: 'tylenol-pm-es',
    productName: 'Tylenol PM Extra Strength',
    brand: 'Tylenol',
    category: SLEEP,
    barcode: '300450482112',
    formulaId: 'tylenol-pm-es',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('435b1a31-353d-af20-e063-6294a90aa907', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('435b1a31-353d-af20-e063-6294a90aa907', METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('435b1a31-353d-af20-e063-6294a90aa907', METH.peg),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('435b1a31-353d-af20-e063-6294a90aa907', METH.ps80),
      ),
      cleared('435b1a31-353d-af20-e063-6294a90aa907', 'Carnauba wax'),
      cleared('435b1a31-353d-af20-e063-6294a90aa907', 'Crospovidone'),
      cleared('435b1a31-353d-af20-e063-6294a90aa907', 'Hypromellose'),
      cleared('435b1a31-353d-af20-e063-6294a90aa907', 'Magnesium stearate'),
      cleared('435b1a31-353d-af20-e063-6294a90aa907', 'Microcrystalline cellulose'),
      cleared('435b1a31-353d-af20-e063-6294a90aa907', 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Tylenol PM Extra Strength = Avoid. Blue #1 lake + titanium dioxide + PEG + polysorbate 80. Labeled 2 caplets at bedtime; stay under 4 g/day acetaminophen from all sources. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 435b1a31-353d-af20-e063-6294a90aa907 (draft, not verified)',
    ],
  },
  {
    id: 'advil-pm-liquigels',
    productName: 'Advil PM Liqui-Gels',
    brand: 'Advil',
    category: SLEEP,
    formulaId: 'advil-pm-liquigels',
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Ibuprofen', strength: '200mg' },
      { name: 'Diphenhydramine HCl', strength: '25mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('405afdb4-c157-1d88-f232-848063ba4714', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('405afdb4-c157-1d88-f232-848063ba4714', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('405afdb4-c157-1d88-f232-848063ba4714', METH.peg),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('405afdb4-c157-1d88-f232-848063ba4714', METH.sorbitol),
      ),
      cleared('405afdb4-c157-1d88-f232-848063ba4714', 'Gelatin'),
      cleared('405afdb4-c157-1d88-f232-848063ba4714', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Advil PM Liqui-Gels = Avoid. Red #33 + Blue #1 + PEG. Medium-chain triglycerides are on the SPL (not a gummy; not the seed/industrial-oil High rule). Pharmaceutical ink is ungraded appearance ink. Ages 12+. NSAID — take with food or milk if stomach upset; cleanliness grade only. ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 405afdb4-c157-1d88-f232-848063ba4714 (draft, not verified)',
    ],
  },
  {
    id: 'advil-pm-caplets',
    productName: 'Advil PM Caplets',
    brand: 'Advil',
    category: SLEEP,
    barcode: '655708017845',
    formulaId: 'advil-pm-caplets',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Ibuprofen', strength: '200mg' },
      { name: 'Diphenhydramine citrate', strength: '38mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed('52c67ae0-707c-851b-e063-6294a90afda4', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('52c67ae0-707c-851b-e063-6294a90afda4', METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('52c67ae0-707c-851b-e063-6294a90afda4', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('52c67ae0-707c-851b-e063-6294a90afda4', METH.sio2),
      ),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed('52c67ae0-707c-851b-e063-6294a90afda4', METH.sls),
      ),
      cleared('52c67ae0-707c-851b-e063-6294a90afda4', 'Croscarmellose sodium'),
      cleared('52c67ae0-707c-851b-e063-6294a90afda4', 'Hypromellose'),
      cleared('52c67ae0-707c-851b-e063-6294a90afda4', 'Lactose monohydrate'),
      cleared('52c67ae0-707c-851b-e063-6294a90afda4', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Advil PM caplets = Avoid. Blue #2 aluminum lake is High-tier. SPL also lists titanium dioxide (High) and PEG (Moderate). Silicon dioxide is the nanoparticle Caution cap (0 pts) — not a sole-Caution product. SLS is standalone Caution (irritant class, not additive-scored) and is not the Avoid driver. Diphenhydramine citrate 38 mg is the labeled PM-citrate salt (about 25 mg DPH HCl equivalent). Labeled 2 caplets at bedtime. Ages 12+. ' +
      SEDATING,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 52c67ae0-707c-851b-e063-6294a90afda4 (draft, not verified)',
    ],
  },
  {
    id: 'upup-doxylamine-sleeptabs',
    productName: 'up&up Nighttime Sleep Aid (Doxylamine)',
    brand: 'up&up',
    category: SLEEP,
    barcode: '370030014965',
    formulaId: 'upup-doxylamine-sleeptabs',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Doxylamine succinate', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('24a0144d-cbfc-4d2f-873d-86adfa0468ca', METH.dyes),
      ),
      cleared('24a0144d-cbfc-4d2f-873d-86adfa0468ca', 'Anhydrous dibasic calcium phosphate'),
      cleared('24a0144d-cbfc-4d2f-873d-86adfa0468ca', 'Dibasic calcium phosphate dihydrate'),
      cleared('24a0144d-cbfc-4d2f-873d-86adfa0468ca', 'Magnesium stearate'),
      cleared('24a0144d-cbfc-4d2f-873d-86adfa0468ca', 'Microcrystalline cellulose'),
      cleared('24a0144d-cbfc-4d2f-873d-86adfa0468ca', 'Sodium starch glycolate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: up&up doxylamine SleepTabs analog = Avoid. Blue #1 aluminum lake — Unisom SleepTabs store twin, separate formulaId because the calcium-phosphate pair is listed both anhydrous and dihydrate. One tablet at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['Target'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 24a0144d-cbfc-4d2f-873d-86adfa0468ca (draft, not verified)',
    ],
  },
  {
    id: 'equate-sleep-aid-softgels',
    productName: 'Equate Nighttime Sleep-Aid Softgels',
    brand: 'Equate',
    category: SLEEP,
    formulaId: 'equate-sleep-aid-softgels',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('3d3f2e0c-e141-d49f-e063-6394a90ad0e6', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('3d3f2e0c-e141-d49f-e063-6394a90ad0e6', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('3d3f2e0c-e141-d49f-e063-6394a90ad0e6', METH.tio2),
      ),
      flag(
        'Polyethylene glycol 400',
        'moderate',
        dailymed('3d3f2e0c-e141-d49f-e063-6394a90ad0e6', METH.peg),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('3d3f2e0c-e141-d49f-e063-6394a90ad0e6', METH.sorbitol),
      ),
      cleared('3d3f2e0c-e141-d49f-e063-6394a90ad0e6', 'Gelatin'),
      cleared('3d3f2e0c-e141-d49f-e063-6394a90ad0e6', 'Glycerin'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate Nighttime Sleep-Aid softgels = Avoid. Dyes + titanium dioxide + PEG (ZzzQuil LiquiCaps store analog). Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['Walmart'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 3d3f2e0c-e141-d49f-e063-6394a90ad0e6 (draft, not verified)',
    ],
  },
  {
    id: 'equate-sleep-aid-tablets-dyed',
    productName: 'Equate Nighttime Sleep Aid Tablets',
    brand: 'Equate',
    category: SLEEP,
    barcode: '194346263615',
    formulaId: 'equate-sleep-aid-tablets-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed('6e162152-b414-470c-b146-649d99870577', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed('6e162152-b414-470c-b146-649d99870577', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('6e162152-b414-470c-b146-649d99870577', METH.tio2),
      ),
      flag(
        'Talc',
        'high',
        dailymed('6e162152-b414-470c-b146-649d99870577', METH.talc),
      ),
      flag(
        'Polyethylene glycol 3350',
        'moderate',
        dailymed('6e162152-b414-470c-b146-649d99870577', METH.peg),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed('6e162152-b414-470c-b146-649d99870577', METH.sio2),
      ),
      cleared('6e162152-b414-470c-b146-649d99870577', 'Croscarmellose sodium'),
      cleared('6e162152-b414-470c-b146-649d99870577', 'Lactose monohydrate'),
      cleared('6e162152-b414-470c-b146-649d99870577', 'Magnesium stearate'),
      cleared('6e162152-b414-470c-b146-649d99870577', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate Nighttime Sleep Aid tablets = Avoid. Dye lakes + PEG. Structured SPL also lists titanium dioxide and talc (both High) — same Avoid family, not a second grade. SiO2 is the Caution cap (0 pts). Labeled 2 caplets at bedtime. Ages 12+. ' +
      SEDATING,
    retailers: ['Walmart'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 6e162152-b414-470c-b146-649d99870577 (draft, not verified)',
    ],
  },
  {
    id: 'upup-sleep-aid-liquid-dyed',
    productName: 'up&up Nighttime Sleep Aid Liquid',
    brand: 'up&up',
    category: SLEEP,
    barcode: '370030275809',
    formulaId: 'upup-sleep-aid-liquid-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('0ab5a374-d565-4385-bee3-538a8f09b19e', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('0ab5a374-d565-4385-bee3-538a8f09b19e', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('0ab5a374-d565-4385-bee3-538a8f09b19e', METH.pg),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('0ab5a374-d565-4385-bee3-538a8f09b19e', METH.saccharin),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('0ab5a374-d565-4385-bee3-538a8f09b19e', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('0ab5a374-d565-4385-bee3-538a8f09b19e', METH.benzoate),
      ),
      cleared('0ab5a374-d565-4385-bee3-538a8f09b19e', 'Anhydrous citric acid'),
      cleared('0ab5a374-d565-4385-bee3-538a8f09b19e', 'Purified water'),
      cleared('0ab5a374-d565-4385-bee3-538a8f09b19e', 'Sodium citrate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: up&up Nighttime Sleep Aid liquid = Avoid. Dyes + oral PG + saccharin. High-fructose corn syrup is on the locked carton (setid 0ab5a374) and is parked per Methodology §5 — notes only, never graded, not an Avoid driver. Alcohol and poloxamer 407 are also on that label and are not in Methodology §5 (ungraded; not the Avoid drivers). DailyMed v2 XML for 0ab5a374 is no longer published; this row uses the DailyMed HTML label snapshot for that setid. A later Target liquid SPL 0d1771df is a different sucralose / no-PG formula — not this row. One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['Target'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 0ab5a374-d565-4385-bee3-538a8f09b19e (HTML label snapshot; draft, not verified)',
    ],
  },
  {
    id: 'cvs-sleep-aid-liquid-dyed',
    productName: 'CVS Health Nighttime Sleep-Aid Liquid',
    brand: 'CVS Health',
    category: SLEEP,
    barcode: '050428438015',
    formulaId: 'cvs-sleep-aid-liquid-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('9f944edc-a317-4967-ae54-67b5d183591b', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('9f944edc-a317-4967-ae54-67b5d183591b', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('9f944edc-a317-4967-ae54-67b5d183591b', METH.sucralose),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('9f944edc-a317-4967-ae54-67b5d183591b', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('9f944edc-a317-4967-ae54-67b5d183591b', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('9f944edc-a317-4967-ae54-67b5d183591b', METH.sorbitol),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        dailymed('9f944edc-a317-4967-ae54-67b5d183591b', METH.gums),
      ),
      cleared('9f944edc-a317-4967-ae54-67b5d183591b', 'Anhydrous citric acid'),
      cleared('9f944edc-a317-4967-ae54-67b5d183591b', 'Glycerin'),
      cleared('9f944edc-a317-4967-ae54-67b5d183591b', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: CVS Nighttime Sleep-Aid liquid dyed = Avoid. Blue #1 + Red #40 plus sucralose and flavor. One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 9f944edc-a317-4967-ae54-67b5d183591b (draft, not verified)',
    ],
  },
  {
    id: 'cvs-sleep-aid-liquid-dyefree',
    productName: 'CVS Health Nighttime Sleep Aid (No FD&C Dyes)',
    brand: 'CVS Health',
    category: SLEEP,
    barcode: '050428594568',
    formulaId: 'cvs-sleep-aid-liquid-dyefree',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('03f521f4-d35f-4f66-b3ad-7e58a244eb93', METH.sucralose),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('03f521f4-d35f-4f66-b3ad-7e58a244eb93', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('03f521f4-d35f-4f66-b3ad-7e58a244eb93', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('03f521f4-d35f-4f66-b3ad-7e58a244eb93', METH.sorbitol),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        dailymed('03f521f4-d35f-4f66-b3ad-7e58a244eb93', METH.gums),
      ),
      cleared('03f521f4-d35f-4f66-b3ad-7e58a244eb93', 'Anhydrous citric acid'),
      cleared('03f521f4-d35f-4f66-b3ad-7e58a244eb93', 'Glycerin'),
      cleared('03f521f4-d35f-4f66-b3ad-7e58a244eb93', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: CVS Health Nighttime Sleep Aid no-FD&C = Avoid, not Caution. Sucralose plus flavor / sodium benzoate / sorbitol (Moderate + Limited stack). Dye-free / no-FD&C is not Clean and is not parked at Caution. Berry-flavor alcohol-free liquid. One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ' +
      SEDATING,
    retailers: ['CVS'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      'DailyMed setid 03f521f4-d35f-4f66-b3ad-7e58a244eb93 (draft, not verified)',
    ],
  },
];
