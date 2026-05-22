import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Migraines() {
  return (
    <ConditionPageLayoutV2
      title="Migraines"
      subtitle="Neurological origin · vascular and trigeminal involvement"
      bodySystem="head"
      emergency="Worst headache of your life, sudden severe onset, fever and stiff neck, after head injury, or with vision loss, confusion, or weakness on one side &mdash; seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAN migraine guidelines · Tisserand & Young 2014 · Worwood 2016 · American Headache Society"
      naturalItems={[
        {
          name: 'Peppermint Oil',
          desc: 'Applied at migraine onset, menthol activates cold receptors and reduces pain signal transmission. Clinical evidence for reducing migraine pain intensity.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply 1-2 diluted drops to temples and forehead at the first sign.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Use in a diffuser to support migraine relief.',
            warning: 'Avoid diffusing around children under 6, infants, or cats.',
          },
          internal: {
            ageRange: 'Age 8+',
            pregnancySafe: 'ask',
            desc: 'Enteric-coated peppermint oil capsules (e.g., IBgard, Pepogest) can help with associated GI symptoms during a migraine.',
          },
        },
        {
          name: 'Lavender Oil',
          desc: 'Inhaling lavender at migraine onset has clinical evidence for reducing pain severity. Can also be applied diluted to temples.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to temples at the first sign.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'Inhale directly from the bottle or use in a diffuser at onset for evidence-based pain reduction.',
          },
        },
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium deficiency is one of the most common underlying factors in migraine. IV magnesium is used in emergency rooms for severe migraines. Oral glycinate form is the most bioavailable for prevention.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Feverfew',
          desc: 'Parthenolide in feverfew inhibits platelet aggregation and serotonin release that trigger migraines. Clinical evidence supports regular use for reducing migraine frequency.',
          warning: 'Do not stop abruptly — may cause rebound headache. May interact with blood thinners.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Butterbur (PA-Free)',
          desc: 'One of the strongest natural evidence-based interventions for migraine prevention. Reduces frequency and severity when taken regularly.',
          warning: 'Use ONLY certified PA-free (pyrrolizidine alkaloid-free) products. Regular butterbur is liver-toxic. Not for use with liver disease.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Ginger Tea',
          desc: 'Clinical study showed ginger powder was as effective as sumatriptan for acute migraine treatment. Also helps with associated nausea.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'CoQ10',
          desc: 'Coenzyme Q10 supports mitochondrial energy production in brain cells. Clinical evidence for reducing migraine frequency with regular use over 3 months.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Dark Room and Cold Compress',
          desc: 'Migraine sensitivity to light and sound makes a dark, quiet room essential. A cold compress on the forehead or back of neck reduces pain through vasoconstriction.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Excedrin Migraine',
          desc: 'Combination of acetaminophen, aspirin, and caffeine specifically formulated for migraines. Caffeine enhances absorption of pain relievers and constricts blood vessels.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
          ageRange: 'Age 12+',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Anti-inflammatory NSAID effective for mild to moderate migraines when taken at onset.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
          ageRange: 'Age 6mo+',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Single active ingredient: acetaminophen. For migraine pain when NSAIDs cannot be used. Less effective than NSAIDs for most migraines.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
        {
          name: 'Imitrex (Sumatriptan)',
          desc: 'Triptan medication specifically designed for migraines. Constricts blood vessels and blocks pain pathways. Most effective migraine-specific treatment available.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
          ageRange: 'Age 18+',
        },
        {
          name: 'Nurtec (Rimegepant)',
          desc: 'CGRP receptor antagonist for acute migraine treatment and prevention. Newer class of migraine-specific medication with fewer side effects than triptans.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'avoid',
          ageRange: 'Age 18+',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen or acetaminophen',
          desc: 'Take at the very first sign of a migraine — effectiveness drops significantly if you wait until pain is severe.',
          note: 'Caffeine from coffee or an energy drink taken with the pain reliever can enhance its effectiveness.',
          pregnancySafe: 'ask',
          ageRange: 'Age 6mo+',
        },
        {
          category: 'Dark quiet room and cold compress',
          desc: 'Remove yourself from light and noise immediately. Apply a cold pack wrapped in cloth to the forehead or back of neck.',
          note: 'Free and always available. One of the most effective immediate interventions for migraine.',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
        {
          category: 'Caffeine',
          desc: 'A cup of strong coffee or caffeinated beverage at migraine onset can abort a mild migraine or enhance the effectiveness of pain relievers.',
          note: 'Only effective if you are not a regular caffeine user. Regular caffeine use can itself trigger migraines upon withdrawal.',
          pregnancySafe: 'ask',
          ageRange: 'Age 12+',
        },
      ]}
    />
  )
}