import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function Migraines() {
  return (
    <RemedyPageLayout
      title="Migraines"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if you experience the worst headache of your life, sudden severe headache, headache with fever and stiff neck, headache after head injury, or headache with vision loss, confusion, or weakness on one side of the body."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium deficiency is one of the most common underlying factors in migraine. IV magnesium is used in emergency rooms for severe migraines. Oral glycinate form is the most bioavailable for prevention.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Feverfew',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Parthenolide in feverfew inhibits platelet aggregation and serotonin release that trigger migraines. Clinical evidence supports regular use for reducing migraine frequency.',
          warning: 'Do not stop abruptly — may cause rebound headache. Avoid in pregnancy. May interact with blood thinners.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Butterbur (PA-Free)',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'One of the strongest natural evidence based interventions for migraine prevention. Reduces frequency and severity when taken regularly. Use only PA-free extracts.',
          warning: 'Use only certified PA-free (pyrrolizidine alkaloid free) products. Not for use in pregnancy or with liver disease.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Applied diluted to the temples and forehead at migraine onset. Menthol activates cold receptors and reduces pain signal transmission. Clinical evidence for reducing migraine pain intensity.',
          warning: 'Always dilute before skin application. Never apply near eyes. Not for children under 6.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Clinical study showed ginger powder was as effective as sumatriptan for acute migraine treatment. Also helps with associated nausea.',
          pregnancySafe: 'safe',
        },
        {
          name: 'CoQ10',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Coenzyme Q10 supports mitochondrial energy production in brain cells. Clinical evidence for reducing migraine frequency with regular use over 3 months.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Inhaling lavender oil at migraine onset has clinical evidence for reducing pain severity. Can also be applied diluted to temples.',
          warning: 'Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Dark Room and Cold Compress',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Migraine sensitivity to light and sound makes a dark quiet room essential. A cold compress on the forehead or back of neck reduces pain through vasoconstriction.',
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
        },
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory NSAID effective for mild to moderate migraines when taken at onset. Most effective when taken early.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for migraine pain when NSAIDs cannot be used. Less effective than NSAIDs for most migraines.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'safe',
        },
        {
          name: 'Imitrex (Sumatriptan)',
          desc: 'Triptan medication specifically designed for migraines. Constricts blood vessels and blocks pain pathways. Most effective migraine specific treatment available.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
        },
        {
          name: 'Nurtec (Rimegepant)',
          desc: 'CGRP receptor antagonist for acute migraine treatment and prevention. Newer class of migraine specific medication with fewer side effects than triptans.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen or acetaminophen',
          desc: 'Take at the very first sign of a migraine — effectiveness drops significantly if you wait until pain is severe.',
          note: 'Caffeine from coffee or an energy drink taken with the pain reliever can enhance its effectiveness.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Dark quiet room and cold compress',
          desc: 'Remove yourself from light and noise immediately. Apply a cold pack wrapped in cloth to the forehead or back of neck.',
          note: 'Free and always available. One of the most effective immediate interventions for migraine.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Caffeine',
          desc: 'A cup of strong coffee or caffeinated beverage at migraine onset can abort a mild migraine or enhance the effectiveness of pain relievers.',
          note: 'Only effective if you are not a regular caffeine user. Regular caffeine use can itself trigger migraines upon withdrawal.',
          pregnancySafe: 'ask',
        },
      ]}
    />
  )
}