// KnowYourRemedy — Essential Oils Data
// Split out from medsData.js (which also held cut Dosage Calculator /
// Interaction Checker data for OTC, prescription, and supplement meds).
// This file is now the sole source of truth for the Oil Library.
// Sources: Tisserand R, Young R: Essential Oil Safety 2nd ed. Churchill Livingstone 2014
// Worwood VA: Complete Book of Essential Oils 2nd ed. 2016 · NIH NCCIH fact sheets

export const REMEDY_TAGS = {
    allergies:        'Allergies',
    anxiety:          'Anxiety & Stress',
    back_pain:        'Back Pain',
    bloating:         'Bloating & Gas',
    burns:            'Burns & Sunburn',
    cold_flu:         'Cold & Flu',
    colic:            'Colic',
    constipation:     'Constipation',
    dental_pain:      'Dental Pain',
    diaper_rash:      'Diaper Rash',
    diarrhea:         'Diarrhea',
    ear_pain:         'Ear Pain',
    fever:            'Fever',
    growing_pains:    'Growing Pains',
    headache:         'Headache',
    heartburn:        'Heartburn',
    insect_bites:     'Insect Bites',
    insomnia:         'Insomnia',
    itchy_eyes:       'Itchy Eyes',
    joint_pain:       'Joint Pain',
    menstrual_cramps: 'Menstrual Cramps',
    migraines:        'Migraines',
    minor_cuts:       'Minor Cuts',
    muscle_pain:      'Muscle Pain',
    nausea:           'Nausea',
    rashes:           'Rashes',
    sinus_congestion: 'Sinus Congestion',
    sore_throat:      'Sore Throat',
    teething_pain:    'Teething Pain',
    tension_headaches:'Tension Headaches',
    upset_stomach:    'Upset Stomach',
  };
  
  export const OILS = {
  
    bergamotOil: {
      name:'Bergamot Oil', brand:'Various', category:'essential_oils',
      tags:['anxiety','insomnia'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser (30 min) — kids 6+',mgPerUnit:3,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Use FCF (furanocoumarin-free) bergamot to avoid photosensitivity.',adult:'Regular bergamot is strongly phototoxic — do not apply before sun exposure. Use FCF bergamot for skin use.'},
    },
  
    cedarwoodOil: {
      name:'Cedarwood Oil', brand:'Various', category:'essential_oils',
      tags:['anxiety','insomnia'],
      flatDose:{child:{'2+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 2+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser (30 min) — kids 2+',mgPerUnit:3,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Avoid near face of infants under 2. Do not ingest.',adult:'Do not ingest.'},
    },
  
    chamomileRomanOil: {
      name:'Chamomile (Roman) Oil', brand:'Various', category:'essential_oils',
      tags:['anxiety','insomnia','colic','teething_pain','rashes','menstrual_cramps'],
      flatDose:{child:{'2+':0.5},adult:2}, maxSingleDose:{child:1,adult:4}, maxDailyDose:{child:3,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 0.5% of essential oil per 2 tsp of carrier oil — kids 2-6',mgPerUnit:0.5,unitML:5},{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'2-4 drops in diffuser (30 min) — all ages',mgPerUnit:2,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016 · NIH NCCIH — Chamomile.',
      warnings:{child:'Avoid with ragweed/daisy allergy. Distinct from German chamomile (Matricaria recutita).',adult:'Avoid if allergic to ragweed, daisies, or chrysanthemums. Use Roman (Chamaemelum nobile) for skin/calming; German chamomile is darker blue and better for inflammation.'},
    },
  
    clarySageOil: {
      name:'Clary Sage Oil', brand:'Various', category:'essential_oils',
      tags:['menstrual_cramps','anxiety','insomnia'],
      flatDose:{child:{'12+':2},adult:3}, maxSingleDose:{child:3,adult:5}, maxDailyDose:{child:6,adult:15},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:12},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser — adults only',mgPerUnit:3,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016 · Ou MC et al. J Obstet Gynaecol Res 2012.',
      warnings:{child:'Not for use during pregnancy.',adult:'Do not use during pregnancy. Avoid with estrogen-sensitive conditions. May cause drowsiness.'},
    },
  
    cloveOil: {
      name:'Clove Oil', brand:'Various', category:'essential_oils',
      tags:['dental_pain','teething_pain'],
      flatDose:{child:{'2+':0.5},adult:1}, maxSingleDose:{child:1,adult:2}, maxDailyDose:{child:3,adult:6},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Topical on gums (heavily diluted in carrier oil)',concentrations:[{label:'1 drop or 0.5% of essential oil per 4 tsp of carrier oil — kids 2+',mgPerUnit:0.5,unitML:20},{label:'1 drop or 1% of essential oil per 2 tsp of carrier oil — adults',mgPerUnit:1,unitML:10}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · American Dental Association position on eugenol.',
      warnings:{child:'Apply sparingly to gums only.',adult:'Undiluted clove oil can burn tissue. Do not ingest.'},
    },
  
    cypressOil: {
      name:'Cypress Oil', brand:'Various', category:'essential_oils',
      tags:['sinus_congestion','cold_flu','muscle_pain'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion / Steam inhalation',concentrations:[{label:'3-5 drops in diffuser — kids 6+',mgPerUnit:3,unitML:1},{label:'2-3 drops in steam bowl — adults only',mgPerUnit:2,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Avoid near face of infants.',adult:'Avoid in pregnancy (may stimulate circulation). Do not ingest.'},
    },
  
    eucalyptusOil: {
      name:'Eucalyptus Oil', brand:'Various', category:'essential_oils',
      tags:['sinus_congestion','cold_flu','muscle_pain'],
      flatDose:{child:{'10+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:10},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 10+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion / Steam inhalation',concentrations:[{label:'3-5 drops in diffuser — kids 6+',mgPerUnit:3,unitML:1},{label:'2-3 drops in steam bowl — adults only',mgPerUnit:2,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016 · American Association of Poison Control Centers.',
      warnings:{child:'NEVER use on skin of children under 10 — can cause serious breathing problems and seizures.',adult:'Do not ingest.'},
    },
  
    frankincenseOil: {
      name:'Frankincense Oil', brand:'Various', category:'essential_oils',
      tags:['joint_pain','anxiety','headache'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser — kids 6+',mgPerUnit:3,unitML:1}]},
        internal:{label:'Internal (Supplement Facts panel required) — boswellic acid capsules',concentrations:[{label:'300-500 mg boswellic acid capsule with food — adults only',mgPerUnit:300,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Not well studied under 6.',adult:'Do not ingest neat oil. May interact with blood-thinning medications.'},
    },
  
    geraniumOil: {
      name:'Geranium Oil', brand:'Various', category:'essential_oils',
      tags:['menstrual_cramps','anxiety','rashes','insect_bites'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser (30 min) — kids 6+',mgPerUnit:3,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Avoid near face of young children.',adult:'Avoid in pregnancy (especially first trimester) — may stimulate uterine activity. May affect blood sugar — caution with diabetes medications.'},
    },
  
    gingerOil: {
      name:'Ginger Essential Oil', brand:'Various', category:'essential_oils',
      pharmClasses:['antiplatelet'],
      tags:['nausea','muscle_pain','back_pain'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion / Inhalation',concentrations:[{label:'3-4 drops in diffuser — kids 6+',mgPerUnit:3,unitML:1}]},
        internal:{label:'Internal (Supplement Facts panel required)',concentrations:[{label:'1 capsule (250-500 mg) with food — adults & kids 6+',mgPerUnit:250,unitML:1},{label:'1 drop in honey or tea — adults only, FDA-cleared oils only',mgPerUnit:1,unitML:5}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Patch test first.',adult:'May cause mild skin sensitization. Patch test first.'},
    },
  
    helichrysumOil: {
      name:'Helichrysum Oil', brand:'Various', category:'essential_oils',
      tags:['minor_cuts','muscle_pain','back_pain','rashes'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'2-4 drops in diffuser (potent scent) — kids 6+',mgPerUnit:2,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Patch test first.',adult:'Premium specialty oil — among the most expensive essential oils. Traditionally used for bruising and wound healing (sometimes called "immortelle"). Avoid in pregnancy. May interact with blood-thinning medications due to anti-coagulant compounds.'},
    },
  
    lavenderOil: {
      name:'Lavender Oil', brand:'Various', category:'essential_oils',
      tags:['anxiety','insomnia','burns','insect_bites','tension_headaches','headache'],
      flatDose:{child:{'2+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 0.5-1% of essential oil per tsp of carrier oil — kids 2-6',mgPerUnit:0.5,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser (30 min sessions) — all ages',mgPerUnit:3,unitML:1}]},
      },
      source:'NIH NCCIH — Lavender (2024) · Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Avoid near face of infants. Do not ingest.',adult:'Generally safe for topical and aromatherapy use.'},
    },
  
    lemongrassOil: {
      name:'Lemongrass Oil', brand:'Various', category:'essential_oils',
      tags:['insect_bites','muscle_pain','anxiety'],
      flatDose:{child:{'6+':0.5},adult:1}, maxSingleDose:{child:1,adult:2}, maxDailyDose:{child:3,adult:6},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (heavily diluted in carrier oil)',concentrations:[{label:'1 drop or 0.5% of essential oil per 2 tsp of carrier oil — kids 6+',mgPerUnit:0.5,unitML:10},{label:'1 drop or 1% of essential oil per tsp of carrier oil — adults (Tisserand max)',mgPerUnit:1,unitML:5}]},
        liquid2:{label:'Diffusion / Bug repellent',concentrations:[{label:'4-6 drops in diffuser — kids 6+',mgPerUnit:4,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 (dermal max 0.7%) · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Highly skin-sensitizing — Tisserand & Young recommend strict dermal max of 0.7%. Common in natural bug-repellent products but use sparingly on skin.',adult:'Strong skin sensitizer — patch-test first. Avoid in pregnancy. Effective natural mosquito repellent (citronellal/geranial content).'},
    },
  
    lemonOil: {
      name:'Lemon Oil', brand:'Various', category:'essential_oils',
      tags:['nausea','anxiety'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion / Inhalation',concentrations:[{label:'3-5 drops in diffuser — kids 2+',mgPerUnit:3,unitML:1}]},
        internal:{label:'Internal (Supplement Facts panel required) — culinary use',concentrations:[{label:'1-2 drops in baking (8 servings) — adults & kids 6+, FDA-cleared culinary oils only',mgPerUnit:1,unitML:1},{label:'1 drop in 8 oz water or salad dressing — adults only',mgPerUnit:1,unitML:240}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Phototoxic — do not apply before sun exposure.',adult:'Phototoxic — avoid skin application before sun exposure. Use steam-distilled lemon oil (less phototoxic than cold-pressed).'},
    },
  
    marjoramOil: {
      name:'Marjoram (Sweet) Oil', brand:'Various', category:'essential_oils',
      tags:['muscle_pain','back_pain','tension_headaches','insomnia','menstrual_cramps'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser (30 min) — kids 6+',mgPerUnit:3,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Sweet marjoram (Origanum majorana) — NOT oregano oil. Distinct plants.',adult:'Confused often with oregano oil — they are different. Sweet marjoram is gentler. Avoid in pregnancy. May cause drowsiness at high doses — do not drive after heavy use.'},
    },
  
    oreganoOil: {
      name:'Oregano Oil', brand:'Various', category:'essential_oils',
      tags:['cold_flu','sore_throat','sinus_congestion'],
      flatDose:{child:{'12+':1},adult:2}, maxSingleDose:{child:1,adult:3}, maxDailyDose:{child:3,adult:9},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:12},
      formats:{
        liquid:{label:'Topical (heavily diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per 2 tsp of carrier oil — adults only',mgPerUnit:1,unitML:10}]},
        internal:{label:'Internal (Supplement Facts panel required)',concentrations:[{label:'50 mg enteric-coated softgel (10:1 extract) — adults only',mgPerUnit:50},{label:'150 mg enteric-coated softgel — adults only',mgPerUnit:150},{label:'1 drop in 1 tsp olive oil (or honey) — adults only, short-term use (max 5-7 days) for acute infections',mgPerUnit:1,unitML:5},{label:'⚠️ Never use neat (undiluted) — oregano oil can cause chemical burns to skin and mucous membranes',mgPerUnit:0}]},
      },
      source:'Worwood VA: Complete Book of Essential Oils 2nd ed. 2016 · Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Preuss HG et al. Phytother Res 2005.',
      warnings:{child:'Very potent — can cause chemical burns if undiluted.',adult:'Highly potent. Oral oil of oregano can interact with blood thinners and lithium.'},
    },
  
    peppermintOil: {
      name:'Peppermint Oil', brand:'Various', category:'essential_oils',
      tags:['headache','migraines','tension_headaches','nausea','sinus_congestion','muscle_pain','back_pain','bloating'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser (30 min sessions) — kids 6+',mgPerUnit:3,unitML:1}]},
        internal:{label:'Internal (Supplement Facts panel required)',concentrations:[{label:'1 enteric-coated capsule (IBgard, Pepogest) 30 min before meals — adults & kids 8+',mgPerUnit:90,unitML:1},{label:'1 drop in 1 tsp honey or warm tea — adults only, FDA-cleared oils only',mgPerUnit:1,unitML:5}]},
      },
      source:'NIH NCCIH — Peppermint Oil (2024) · Gobel H et al. Cephalalgia 1994 · Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Never apply near face or mouth. Do not use on infants.',adult:'Avoid contact with eyes. Do not ingest neat oil.'},
    },
  
    rosemaryOil: {
      name:'Rosemary Oil', brand:'Various', category:'essential_oils',
      tags:['muscle_pain','headache','sinus_congestion'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser — kids 6+',mgPerUnit:3,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Avoid near face.',adult:'Avoid with epilepsy or high blood pressure. Do not ingest.'},
    },
  
    sandalwoodOil: {
      name:'Sandalwood Oil', brand:'Various', category:'essential_oils',
      tags:['anxiety','insomnia','rashes'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'2-4 drops in diffuser (rich grounding scent) — kids 2+',mgPerUnit:2,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Patch test first.',adult:'Sustainability note: Indian sandalwood (Santalum album) is CITES-protected and overharvested — buy only certified sustainable Indian, OR choose Australian sandalwood (Santalum spicatum) which is a sustainable alternative with similar therapeutic properties. Generally very well tolerated topically. Premium specialty oil — expect high prices for authentic Australian or certified Indian.'},
    },
  
    sweetOrangeOil: {
      name:'Sweet Orange Oil', brand:'Various', category:'essential_oils',
      tags:['anxiety','nausea','insomnia'],
      flatDose:{child:{'2+':1},adult:2}, maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:12},
      intervalHours:6, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 2+',mgPerUnit:1,unitML:5},{label:'2 drops or 2% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'3-5 drops in diffuser (30 min) — all ages',mgPerUnit:3,unitML:1}]},
        internal:{label:'Internal (Supplement Facts panel required) — culinary use',concentrations:[{label:'1-2 drops in baking (8 servings) — adults & kids 6+, FDA-cleared culinary oils only',mgPerUnit:1,unitML:1},{label:'1 drop in 8 oz water or beverage — adults only',mgPerUnit:1,unitML:240}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Unlike most citrus oils, sweet orange (Citrus sinensis) is NOT phototoxic — safer for daytime use. Do not confuse with bitter orange (Citrus aurantium) which IS phototoxic.',adult:'Sweet orange is one of the few citrus oils that is NOT phototoxic — safe to apply before sun exposure. Shelf life shorter than most oils (~1 year) — oxidized citrus oils can cause skin sensitization.'},
    },
  
    teaTreeOil: {
      name:'Tea Tree Oil', brand:'Various', category:'essential_oils',
      tags:['minor_cuts','insect_bites','diaper_rash','rashes'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:1,adult:2}, maxDailyDose:{child:3,adult:6},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 1% of essential oil per tsp of carrier oil — kids 6+',mgPerUnit:1,unitML:5},{label:'2-5 drops or 2-5% of essential oil per tsp of carrier oil — adults',mgPerUnit:2,unitML:5}]},
      },
      source:'NIH NCCIH — Tea Tree Oil (2024) · Tisserand R, Young R: Essential Oil Safety, 2nd ed. 2014 · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Never ingest — toxic if swallowed. Keep out of reach of children.',adult:'Never ingest — toxic if swallowed.'},
    },
  
    ylangYlangOil: {
      name:'Ylang Ylang Oil', brand:'Various', category:'essential_oils',
      tags:['anxiety','insomnia','tension_headaches'],
      flatDose:{child:{'12+':1},adult:2}, maxSingleDose:{child:1,adult:3}, maxDailyDose:{child:3,adult:9},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:12},
      formats:{
        liquid:{label:'Topical (diluted in carrier oil)',concentrations:[{label:'1 drop or 0.8% of essential oil per 1¼ tsp of carrier oil — adults (Tisserand max)',mgPerUnit:0.8,unitML:5}]},
        liquid2:{label:'Diffusion',concentrations:[{label:'2-3 drops in diffuser (30 min) — adults only',mgPerUnit:2,unitML:1}]},
      },
      source:'Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 (dermal max 0.8%) · Worwood VA: Complete Book of Essential Oils 2nd ed. 2016.',
      warnings:{child:'Moderate skin sensitization risk. Strong scent can cause headaches/nausea in children even via diffusion.',adult:'Tisserand & Young set a strict dermal maximum of 0.8% due to skin sensitization risk — significantly lower than most oils. Strong scent — start with 1-2 diffuser drops. May cause headaches or nausea at high concentrations. Avoid in pregnancy.'},
    },
  
  };
  
  export const FORMAT_ICONS = {
    liquid:'droplet', liquid2:'droplet', internal:'capsule',
  };