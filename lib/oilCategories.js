// lib/oilCategories.js
// Display-layer categorization for the Oil Library.
// Keeps medsData.js as the source of truth for raw oil data.
// This file ONLY controls how oils are sorted/filtered/described in the UI.

// Filter chips shown on the Oil Library hub page, in display order.
// "all" is always first. The rest match the displayCategories tags below.
export const OIL_FILTERS = [
    { key: 'all',         label: 'All' },
    { key: 'calming',     label: 'Calming' },
    { key: 'pain_relief', label: 'Pain relief' },
    { key: 'digestive',   label: 'Digestive' },
    { key: 'respiratory', label: 'Respiratory' },
    { key: 'skin',        label: 'Skin' },
    { key: 'kid_safe',    label: 'Kid-safe (age 2+)' },
  ];
  
  // Per-oil display data. Keys MUST match the keys in MEDS exactly.
  // scentProfile: short 1-3 word description shown on cards.
  // categories: which filter chips this oil appears under.
  //   "kid_safe" auto-applies if minAge.years <= 2 — not listed here.
  export const OIL_DISPLAY = {
    bergamotOil:        { scentProfile: 'Citrus · Floral',     categories: ['calming'] },
    cedarwoodOil:       { scentProfile: 'Woody · Earthy',      categories: ['calming'] },
    chamomileRomanOil:  { scentProfile: 'Gentle · Apple-like', categories: ['calming', 'skin'] },
    clarySageOil:       { scentProfile: 'Herbal · Earthy',     categories: ['calming'] },
    cloveOil:           { scentProfile: 'Spicy · Warm',        categories: ['pain_relief'] },
    cypressOil:         { scentProfile: 'Crisp · Pine',        categories: ['respiratory', 'pain_relief'] },
    eucalyptusOil:      { scentProfile: 'Cooling · Camphor',   categories: ['respiratory', 'pain_relief'] },
    frankincenseOil:    { scentProfile: 'Woody · Resinous',    categories: ['calming', 'pain_relief'] },
    geraniumOil:        { scentProfile: 'Floral · Rosy',       categories: ['calming', 'skin'] },
    gingerOil:          { scentProfile: 'Warm · Spicy',        categories: ['digestive', 'pain_relief'] },
    helichrysumOil:     { scentProfile: 'Earthy · Honey-like', categories: ['skin', 'pain_relief'] },
    lavenderOil:        { scentProfile: 'Floral · Herbal',     categories: ['calming', 'skin'] },
    lemongrassOil:      { scentProfile: 'Bright · Grassy',     categories: ['skin', 'calming'] },
    lemonOil:           { scentProfile: 'Citrus · Bright',     categories: ['calming', 'digestive'] },
    marjoramOil:        { scentProfile: 'Herbal · Warm',       categories: ['pain_relief', 'calming'] },
    oreganoOil:         { scentProfile: 'Sharp · Medicinal',   categories: ['respiratory'] },
    peppermintOil:      { scentProfile: 'Cooling · Minty',     categories: ['pain_relief', 'digestive', 'respiratory'] },
    rosemaryOil:        { scentProfile: 'Herbal · Camphor',    categories: ['pain_relief', 'respiratory'] },
    sandalwoodOil:      { scentProfile: 'Rich · Woody',        categories: ['calming', 'skin'] },
    sweetOrangeOil:     { scentProfile: 'Citrus · Sweet',      categories: ['calming', 'digestive'] },
    teaTreeOil:         { scentProfile: 'Medicinal · Sharp',   categories: ['skin'] },
    ylangYlangOil:      { scentProfile: 'Floral · Sweet',      categories: ['calming'] },
  };
  
  // Helper: given a med key from MEDS, return its display data or sensible defaults.
  export function getOilDisplay(key, med) {
    const entry = OIL_DISPLAY[key];
    const minYears = med?.minAge?.years ?? 0;
    const minMonths = med?.minAge?.months ?? 0;
    const kidSafe = minYears <= 2 && minMonths <= 24;
  
    return {
      scentProfile: entry?.scentProfile || '',
      categories: [
        ...(entry?.categories || []),
        ...(kidSafe ? ['kid_safe'] : []),
      ],
    };
  }
  
  // Helper: format minAge into a short badge string like "2+", "6+", "12+".
  // Returns "All ages" for oils with no real minimum (rare).
  export function formatAgeBadge(med) {
    if (!med?.minAge) return 'All ages';
    if (med.minAge.years) return `${med.minAge.years}+`;
    if (med.minAge.months) {
      if (med.minAge.months >= 12) return `${Math.floor(med.minAge.months / 12)}+`;
      return `${med.minAge.months}mo+`;
    }
    return 'All ages';
  }