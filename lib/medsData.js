// KnowYourRemedy — Full Medication & Remedy Dosage Data
// Sources: FDA OTC Drug Monographs · AAP Weight-Based Dosing Guidelines
// Taketomo CK et al. Pediatric & Neonatal Dosage Handbook 29th ed. Wolters Kluwer
// NIH Office of Dietary Supplements Fact Sheets (2024)
// European Medicines Agency (EMA) Herbal Monographs
// Tisserand R, Young R: Essential Oil Safety 2nd ed. Churchill Livingstone 2014

// Max items the user can select TOTAL across all categories
export const TOTAL_SELECTION_CAP = 10;

export const CATEGORIES = {
  otc:            { label: 'OTC Medications',        icon: '🏪', maxSelections: 2, sharedCapGroup: 'pharma' },
  prescription:   { label: 'Prescription',           icon: '⚕️', maxSelections: 2, sharedCapGroup: 'pharma' },
  herbal:         { label: 'Herbal Remedies',        icon: '🌿' },
  supplements:    { label: 'Vitamins & Supps',       icon: '💪' },
  essential_oils: { label: 'Essential Oils',         icon: '🌱' },
  home:           { label: 'Home Remedies',          icon: '🏠' },
};

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

export const MEDS = {
  
    // ═══════════════════════════════════════════════════
    // OTC MEDICATIONS — alphabetical
    // ═══════════════════════════════════════════════════
  
    acetaminophen: {
      name:'Acetaminophen', brand:'Tylenol', category:'otc',
      pharmClasses:['hepatotoxic'],
      tags:['fever','headache','cold_flu','back_pain','muscle_pain','dental_pain','ear_pain','growing_pains','migraines','sore_throat','teething_pain','tension_headaches'],
      mgPerKg:15, maxSingleDose:{child:1000,adult:1000}, maxDailyDoseMgPerKg:75, maxDailyDose:{adult:4000},
      intervalHours:4, maxDosesPerDay:5, minAge:{months:0},
      formats:{
        liquid:{label:'Liquid suspension',concentrations:[{label:"160 mg/5 mL (Children's standard)",mgPerUnit:160,unitML:5},{label:'500 mg/5 mL (Adult liquid)',mgPerUnit:500,unitML:5}]},
        chewable:{label:'Chewable tablet',concentrations:[{label:'80 mg tablet',mgPerUnit:80},{label:'160 mg tablet',mgPerUnit:160}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'325 mg Regular Strength',mgPerUnit:325},{label:'500 mg Extra Strength',mgPerUnit:500}]},
        gelcap:{label:'Gel cap / Capsule',concentrations:[{label:'500 mg capsule',mgPerUnit:500},{label:'650 mg extended release',mgPerUnit:650}]},
      },
      source:'FDA OTC Monograph (acetaminophen) · AAP 10-15 mg/kg/dose guideline · Lexi-Drugs Wolters Kluwer · Tylenol Professional Info, Kenvue 2024.',
      warnings:{child:'Do not give under 2 months without physician guidance. Max 5 doses/24 hr. Check all products for hidden acetaminophen.',adult:'Do not exceed 4,000 mg/24 hr. Alcohol greatly increases liver toxicity risk.'},
    },
  
    benzoylPeroxide: {
      name:'Benzoyl Peroxide (Topical)', brand:'Clearasil / PanOxyl', category:'otc',
      tags:['rashes'],
      flatDose:{child:{'12+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:2,adult:2},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        liquid:{label:'Gel / Cream / Wash (thin layer)',concentrations:[{label:'2.5% gel',mgPerUnit:2.5},{label:'5% gel',mgPerUnit:5},{label:'10% gel',mgPerUnit:10}]},
      },
      source:'FDA OTC Monograph (benzoyl peroxide topical) · PanOxyl prescribing information, Chattem 2024.',
      warnings:{child:'Not under 12 without physician guidance. May bleach fabric and hair.',adult:'Avoid eyes, mouth, and broken skin. Start with lower strength to avoid dryness or peeling.'},
    },
  
    bismuthSubsalicylate: {
      name:'Bismuth Subsalicylate', brand:'Pepto-Bismol', category:'otc',
      tags:['diarrhea','upset_stomach','nausea','heartburn'],
      flatDose:{child:{'12+':524},adult:524}, maxSingleDose:{child:524,adult:1048}, maxDailyDose:{child:4192,adult:4192},
      intervalHours:1, maxDosesPerDay:8, minAge:{years:12},
      formats:{
        liquid:{label:'Liquid suspension',concentrations:[{label:'262 mg/15 mL standard',mgPerUnit:262,unitML:15},{label:'525 mg/15 mL Max Strength',mgPerUnit:525,unitML:15}]},
        chewable:{label:'Chewable tablet',concentrations:[{label:'262 mg tablet',mgPerUnit:262}]},
        tablet:{label:'Coated tablet',concentrations:[{label:'262 mg tablet',mgPerUnit:262}]},
      },
      source:'FDA OTC Monograph (bismuth subsalicylate) · Pepto-Bismol prescribing info, P&G 2024.',
      warnings:{child:'Not under 12 — contains salicylate (Reye syndrome risk). Do not use if recovering from chickenpox or flu.',adult:'May cause black tongue/stool (harmless). Do not use with blood thinners. Max 2 days without physician guidance.'},
    },
  
    calciumCarbonate: {
      name:'Calcium Carbonate', brand:'Tums', category:'otc',
      pharmClasses:['absorption_blocker_mineral'],
      tags:['heartburn','upset_stomach'],
      flatDose:{child:{'12+':500},adult:500}, maxSingleDose:{child:500,adult:1000}, maxDailyDose:{child:1500,adult:7500},
      intervalHours:2, maxDosesPerDay:6, minAge:{years:12},
      formats:{
        chewable:{label:'Chewable tablet',concentrations:[{label:'500 mg regular',mgPerUnit:500},{label:'750 mg extra strength',mgPerUnit:750},{label:'1000 mg ultra strength',mgPerUnit:1000}]},
      },
      source:'FDA OTC Monograph (calcium carbonate antacid) · Tums prescribing info, Haleon 2024.',
      warnings:{child:'Not under 12 without physician guidance.',adult:'Max 7,500 mg/24 hr. Excessive use may cause constipation or kidney stones.'},
    },
  
    cetirizine: {
      name:'Cetirizine', brand:'Zyrtec', category:'otc',
      tags:['allergies','itchy_eyes','insect_bites','rashes'],
      mgFixed:{child:{'6m-23m':2.5,'2-5':5,'6+':10},adult:10},
      maxSingleDose:{child:10,adult:10}, maxDailyDose:{child:10,adult:10},
      intervalHours:24, maxDosesPerDay:1, minAge:{months:6},
      formats:{
        liquid:{label:'Liquid / Syrup',concentrations:[{label:"5 mg/5 mL (Children's)",mgPerUnit:5,unitML:5},{label:'1 mg/1 mL (Infant drops)',mgPerUnit:1,unitML:1}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'10 mg tablet',mgPerUnit:10}]},
        gelcap:{label:'Liquid gel cap',concentrations:[{label:'10 mg gel cap',mgPerUnit:10}]},
        strip:{label:'Dissolvable strip',concentrations:[{label:'10 mg strip',mgPerUnit:10}]},
      },
      source:'FDA OTC Monograph (cetirizine HCl) · AAP · Zyrtec prescribing info, Kenvue 2024.',
      warnings:{child:'6-23 months: consult doctor before use. Once daily only.',adult:'May cause drowsiness. Once daily only.'},
    },
  
    clotrimazole: {
      name:'Clotrimazole (Topical)', brand:'Lotrimin', category:'otc',
      tags:['rashes','diaper_rash'],
      flatDose:{child:{'2+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:3,adult:3},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Cream / Lotion (thin layer)',concentrations:[{label:'1% cream',mgPerUnit:1},{label:'1% lotion',mgPerUnit:1}]},
      },
      source:'FDA OTC Monograph (clotrimazole topical) · Lotrimin prescribing info, Bayer Consumer Health 2024.',
      warnings:{child:'Not under 2 without physician guidance. For external use only.',adult:'Apply 2-3 times daily. Continue full recommended course even if symptoms resolve.'},
    },
  
    dextromethorphan: {
      name:'Dextromethorphan', brand:'Robitussin / Delsym', category:'otc',
      tags:['cold_flu','sinus_congestion'],
      flatDose:{child:{'2-5':2.5,'6-11':5,'12+':10},adult:10},
      maxSingleDose:{child:5,adult:30}, maxDailyDose:{child:30,adult:120},
      intervalHours:4, maxDosesPerDay:6, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid / Syrup',concentrations:[{label:"5 mg/5 mL (Children's)",mgPerUnit:5,unitML:5},{label:'7.5 mg/5 mL standard',mgPerUnit:7.5,unitML:5},{label:'15 mg/5 mL Adult',mgPerUnit:15,unitML:5}]},
        gelcap:{label:'Liquid gel cap',concentrations:[{label:'15 mg gel cap',mgPerUnit:15},{label:'30 mg gel cap',mgPerUnit:30}]},
      },
      source:'FDA OTC Monograph (dextromethorphan) · Robitussin prescribing info, Haleon 2024.',
      warnings:{child:'Not under 2. Do not use with MAOIs.',adult:'Max 120 mg/24 hr. Do not combine with MAOIs or alcohol.'},
    },
  
    diphenhydramine: {
      name:'Diphenhydramine', brand:'Benadryl', category:'otc',
      pharmClasses:['antihistamine_1st_gen','cns_depressant','anticholinergic'],
      tags:['allergies','insomnia','insect_bites','itchy_eyes','rashes','cold_flu'],
      mgFixed:{child:{'2-5':6.25,'6-11':12.5,'12+':25},adult:25},
      maxSingleDose:{child:25,adult:50}, maxDailyDose:{child:150,adult:300},
      intervalHours:4, maxDosesPerDay:6, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid suspension',concentrations:[{label:"12.5 mg/5 mL (Children's)",mgPerUnit:12.5,unitML:5}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'25 mg tablet',mgPerUnit:25},{label:'50 mg tablet',mgPerUnit:50}]},
        gelcap:{label:'Liquid gel cap',concentrations:[{label:'25 mg gel cap',mgPerUnit:25}]},
        strip:{label:'Dissolvable strip',concentrations:[{label:'25 mg strip',mgPerUnit:25}]},
      },
      source:'FDA OTC Monograph (diphenhydramine HCl) · AAP Clinical Practice Guidelines · Benadryl prescribing info, Kenvue 2024.',
      warnings:{child:'Not under 2. Max 6 doses/24 hr. Causes drowsiness.',adult:'Avoid in elderly patients. Do not combine with alcohol or other sedatives.'},
    },
  
    doxylamine: {
      name:'Doxylamine', brand:'Unisom / Diclegis', category:'otc',
      pharmClasses:['antihistamine_1st_gen','cns_depressant','anticholinergic'],
      tags:['insomnia','nausea'],
      flatDose:{child:{'12+':12.5},adult:25}, maxSingleDose:{child:12.5,adult:25}, maxDailyDose:{child:25,adult:50},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:12},
      formats:{
        tablet:{label:'Standard tablet',concentrations:[{label:'12.5 mg tablet',mgPerUnit:12.5},{label:'25 mg tablet',mgPerUnit:25}]},
      },
      source:'FDA OTC Monograph (doxylamine succinate) · Unisom prescribing info, Chattem 2024.',
      warnings:{child:'Not under 12.',adult:'Take 30 min before bedtime. Do not drive. Do not combine with alcohol or sedatives.'},
    },
  
    famotidine: {
      name:'Famotidine', brand:'Pepcid', category:'otc',
      pharmClasses:['h2_blocker','acid_reducer'],
      tags:['heartburn','upset_stomach'],
      flatDose:{child:{'12+':10},adult:20}, maxSingleDose:{child:10,adult:20}, maxDailyDose:{child:20,adult:40},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        tablet:{label:'Standard tablet',concentrations:[{label:'10 mg tablet',mgPerUnit:10},{label:'20 mg tablet',mgPerUnit:20}]},
        gelcap:{label:'Gel cap',concentrations:[{label:'10 mg gel cap',mgPerUnit:10},{label:'20 mg gel cap',mgPerUnit:20}]},
      },
      source:'FDA OTC Monograph (famotidine) · Pepcid prescribing info, J&J 2024.',
      warnings:{child:'Not under 12 without physician guidance.',adult:'Max 14 days without consulting a doctor. Take 15-60 min before eating.'},
    },
  
    fexofenadine: {
      name:'Fexofenadine', brand:'Allegra', category:'otc',
      tags:['allergies','itchy_eyes','rashes','insect_bites'],
      mgFixed:{child:{'2-11':30,'12+':60},adult:180},
      maxSingleDose:{child:60,adult:180}, maxDailyDose:{child:120,adult:180},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid suspension',concentrations:[{label:"30 mg/5 mL (Children's)",mgPerUnit:30,unitML:5}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'60 mg tablet',mgPerUnit:60},{label:'180 mg tablet',mgPerUnit:180}]},
        gelcap:{label:'Gel cap',concentrations:[{label:'60 mg gel cap',mgPerUnit:60}]},
      },
      source:'FDA OTC Monograph (fexofenadine HCl) · Allegra prescribing info, Chattem 2024.',
      warnings:{child:'Not under 2. Do not take with fruit juice — reduces absorption.',adult:'Do not take with orange, apple, or grapefruit juice — reduces absorption up to 36%.'},
    },
  
    guaifenesin: {
      name:'Guaifenesin', brand:'Mucinex', category:'otc',
      tags:['cold_flu','sinus_congestion'],
      flatDose:{child:{'2-5':50,'6-11':100,'12+':200},adult:400},
      maxSingleDose:{child:100,adult:400}, maxDailyDose:{child:600,adult:2400},
      intervalHours:4, maxDosesPerDay:6, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid / Syrup',concentrations:[{label:"100 mg/5 mL (Children's)",mgPerUnit:100,unitML:5}]},
        tablet:{label:'Immediate release tablet',concentrations:[{label:'200 mg tablet',mgPerUnit:200},{label:'400 mg tablet',mgPerUnit:400}]},
        gelcap:{label:'Extended release tablet',concentrations:[{label:'600 mg ER (every 12 hr)',mgPerUnit:600},{label:'1200 mg ER (every 12 hr)',mgPerUnit:1200}]},
      },
      source:'FDA OTC Monograph (guaifenesin) · Mucinex prescribing info, Reckitt 2024.',
      warnings:{child:'Not under 2. Do not crush ER tablets.',adult:'ER tablets every 12 hr. Drink plenty of fluids.'},
    },
  
    hydrocortisone: {
      name:'Hydrocortisone (Topical)', brand:'Cortizone-10', category:'otc',
      tags:['rashes','insect_bites','diaper_rash'],
      flatDose:{child:{'2+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:2},
      formats:{
        liquid:{label:'Cream / Ointment (thin layer)',concentrations:[{label:'0.5% cream',mgPerUnit:0.5},{label:'1% cream',mgPerUnit:1}]},
      },
      source:'FDA OTC Monograph (hydrocortisone topical) · Cortizone-10 prescribing info, Chattem 2024.',
      warnings:{child:'Not under 2 without physician guidance. Avoid face, groin, underarms without direction.',adult:'Max 7 days without consulting a doctor. Avoid broken skin.'},
    },
  
    ibuprofen: {
      name:'Ibuprofen', brand:'Advil / Motrin', category:'otc',
      pharmClasses:['nsaid','antiplatelet','liver_metabolized'],
      tags:['fever','headache','cold_flu','back_pain','muscle_pain','dental_pain','ear_pain','growing_pains','joint_pain','menstrual_cramps','migraines','sinus_congestion','tension_headaches'],
      mgPerKg:10, maxSingleDose:{child:400,adult:800}, maxDailyDoseMgPerKg:40, maxDailyDose:{adult:3200},
      intervalHours:6, maxDosesPerDay:4, minAge:{months:6},
      formats:{
        liquid:{label:'Liquid suspension', splittable:true, concentrations:[{label:"100 mg/5 mL (Children's)",mgPerUnit:100,unitML:5},{label:'50 mg/1.25 mL (Infant drops)',mgPerUnit:50,unitML:1.25}]},
        chewable:{label:'Chewable tablet', splittable:true, concentrations:[{label:'100 mg tablet',mgPerUnit:100}]},
        tablet:{label:'Standard tablet', splittable:true, concentrations:[{label:'200 mg OTC standard',mgPerUnit:200},{label:'400 mg Rx strength',mgPerUnit:400}]},
        gelcap:{label:'Liquid-filled gel cap', splittable:false, concentrations:[{label:'200 mg gel cap',mgPerUnit:200},{label:'400 mg gel cap',mgPerUnit:400}]},
      },
      source:'FDA OTC Monograph (ibuprofen) · AAP 5-10 mg/kg/dose · Advil/Motrin prescribing info, Haleon/J&J 2024.',
      warnings:{child:'Not under 6 months. Max 4 doses/24 hr. Avoid if dehydrated or has kidney problems.',adult:'OTC max 1,200 mg/day without physician direction. Avoid with other NSAIDs or blood thinners.'},
    },
  
    ketotifenEye: {
      name:'Ketotifen Eye Drops', brand:'Zaditor / Alaway', category:'otc',
      tags:['itchy_eyes','allergies'],
      flatDose:{child:{'3+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:2,adult:2},
      intervalHours:8, maxDosesPerDay:2, minAge:{years:3},
      formats:{
        liquid:{label:'Eye drops (1 drop per eye)',concentrations:[{label:'0.025% solution',mgPerUnit:0.025,unitML:0.05}]},
      },
      source:'FDA OTC Monograph (ketotifen fumarate ophthalmic) · Zaditor/Alaway prescribing info, Alcon 2024.',
      warnings:{child:'Not under 3. Remove contact lenses first; wait 10 min before reinserting.',adult:'Remove contacts before use. Do not touch dropper tip to eye surface.'},
    },
  
    loratadine: {
      name:'Loratadine', brand:'Claritin', category:'otc',
      tags:['allergies','itchy_eyes','insect_bites','rashes'],
      mgFixed:{child:{'2-5':5,'6+':10},adult:10},
      maxSingleDose:{child:10,adult:10}, maxDailyDose:{child:10,adult:10},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid / Syrup',concentrations:[{label:"5 mg/5 mL (Children's)",mgPerUnit:5,unitML:5}]},
        chewable:{label:'Chewable tablet',concentrations:[{label:'5 mg chewable',mgPerUnit:5}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'10 mg tablet',mgPerUnit:10}]},
        gelcap:{label:'Liquid gel cap',concentrations:[{label:'10 mg gel cap',mgPerUnit:10}]},
      },
      source:'FDA OTC Monograph (loratadine) · Claritin prescribing info, Bayer Healthcare 2024.',
      warnings:{child:'Not under 2. Once daily only.',adult:'Reduce dose in liver/kidney impairment. Once daily only.'},
    },
  
    loperamide: {
      name:'Loperamide', brand:'Imodium', category:'otc',
      tags:['diarrhea'],
      flatDose:{child:{'2-5':1,'6-8':2,'9-11':2,'12+':4},adult:4},
      maxSingleDose:{child:2,adult:4}, maxDailyDose:{child:6,adult:16},
      intervalHours:4, maxDosesPerDay:4, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid / Syrup',concentrations:[{label:"1 mg/5 mL (Children's)",mgPerUnit:1,unitML:5}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'2 mg tablet',mgPerUnit:2}]},
        gelcap:{label:'Liquid gel cap',concentrations:[{label:'2 mg gel cap',mgPerUnit:2}]},
      },
      source:'FDA OTC Monograph (loperamide) · Imodium prescribing info, Kenvue 2024.',
      warnings:{child:'Not under 2. Consult doctor if diarrhea lasts more than 24 hr in children.',adult:'Max 16 mg/24 hr. Discontinue if no improvement in 48 hr.'},
    },
  
    meclizine: {
      name:'Meclizine', brand:'Dramamine / Bonine', category:'otc',
      pharmClasses:['antihistamine_1st_gen','cns_depressant','anticholinergic'],
      tags:['nausea'],
      flatDose:{child:{'12+':25},adult:25}, maxSingleDose:{child:25,adult:50}, maxDailyDose:{child:50,adult:100},
      intervalHours:24, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        tablet:{label:'Standard tablet',concentrations:[{label:'12.5 mg tablet',mgPerUnit:12.5},{label:'25 mg tablet',mgPerUnit:25}]},
        chewable:{label:'Chewable tablet',concentrations:[{label:'25 mg chewable',mgPerUnit:25}]},
      },
      source:'FDA OTC Monograph (meclizine HCl) · Dramamine prescribing info, Prestige Consumer Healthcare 2024.',
      warnings:{child:'Not under 12.',adult:'Causes drowsiness. Do not drive. Avoid alcohol.'},
    },
  
    miconazole: {
      name:'Miconazole (Topical)', brand:'Monistat / Micatin', category:'otc',
      tags:['rashes','diaper_rash'],
      flatDose:{child:{'2+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:2,adult:2},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:2},
      formats:{
        liquid:{label:'Cream / Powder (thin layer)',concentrations:[{label:'2% cream',mgPerUnit:2},{label:'2% powder',mgPerUnit:2}]},
      },
      source:'FDA OTC Monograph (miconazole nitrate topical) · Monistat prescribing info, Kenvue 2024.',
      warnings:{child:'Not under 2 without guidance. For external use only.',adult:'For vaginal yeast: use full 7-day course. Consult doctor if symptoms do not improve within 3 days.'},
    },
  
    naproxen: {
      name:'Naproxen', brand:'Aleve', category:'otc',
      pharmClasses:['nsaid','antiplatelet','liver_metabolized'],
      tags:['headache','back_pain','muscle_pain','joint_pain','menstrual_cramps','migraines','tension_headaches','growing_pains'],
      flatDose:{child:{'12+':220},adult:220}, maxSingleDose:{child:220,adult:440}, maxDailyDose:{child:660,adult:660},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:12},
      formats:{
        tablet:{label:'Standard tablet',concentrations:[{label:'220 mg tablet',mgPerUnit:220}]},
        gelcap:{label:'Liquid gel cap',concentrations:[{label:'220 mg gel cap',mgPerUnit:220}]},
      },
      source:'FDA OTC Monograph (naproxen sodium) · Aleve prescribing info, Bayer Healthcare 2024.',
      warnings:{child:'Not under 12 without physician direction.',adult:'OTC max 660 mg/day. Max 10 days for pain or 3 days for fever without physician guidance. Avoid with other NSAIDs.'},
    },
  
    oxymetazoline: {
      name:'Oxymetazoline Nasal Spray', brand:'Afrin', category:'otc',
      pharmClasses:['sympathomimetic','bp_raiser'],
      tags:['sinus_congestion','cold_flu'],
      flatDose:{child:{'6-11':2,'12+':2},adult:2}, maxSingleDose:{child:2,adult:3}, maxDailyDose:{child:4,adult:6},
      intervalHours:10, maxDosesPerDay:2, minAge:{years:6},
      formats:{
        liquid:{label:'Nasal spray (sprays per nostril)',concentrations:[{label:"0.05% solution — children's (6-11)",mgPerUnit:0.05,unitML:0.1},{label:'0.05% solution — adult/12+',mgPerUnit:0.05,unitML:0.1}]},
      },
      source:'FDA OTC Monograph (oxymetazoline HCl) · Afrin prescribing info, Bayer Consumer Health 2024.',
      warnings:{child:'Not under 6. Max 3 consecutive days — rebound congestion risk.',adult:'Max 3 consecutive days — rebound congestion (rhinitis medicamentosa) can occur.'},
    },
  
    permethrin: {
      name:'Permethrin (Topical)', brand:'Nix / Elimite', category:'otc',
      tags:['insect_bites','rashes'],
      flatDose:{child:{'2m+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:1,adult:1},
      intervalHours:168, maxDosesPerDay:1, minAge:{months:2},
      formats:{
        liquid:{label:'Cream / Lotion (full application)',concentrations:[{label:'1% cream rinse (lice)',mgPerUnit:1},{label:'5% cream (scabies)',mgPerUnit:5}]},
      },
      source:'FDA OTC Monograph (permethrin topical) · Nix/Elimite prescribing info 2024.',
      warnings:{child:'Infants 2-6 months: use only under physician guidance. Avoid eyes and mouth.',adult:'Apply to clean dry skin. Rinse after recommended contact time. May repeat in 7-14 days if needed.'},
    },
  
    phenylephrine: {
      name:'Phenylephrine', brand:'Sudafed PE', category:'otc',
      pharmClasses:['sympathomimetic','bp_raiser'],
      tags:['sinus_congestion','cold_flu'],
      flatDose:{child:{'6-11':5,'12+':10},adult:10}, maxSingleDose:{child:5,adult:10}, maxDailyDose:{child:30,adult:60},
      intervalHours:4, maxDosesPerDay:6, minAge:{years:6},
      formats:{
        liquid:{label:'Liquid / Syrup',concentrations:[{label:"2.5 mg/5 mL (Children's)",mgPerUnit:2.5,unitML:5}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'5 mg tablet',mgPerUnit:5},{label:'10 mg tablet',mgPerUnit:10}]},
      },
      source:'FDA OTC Monograph (phenylephrine HCl) · Sudafed PE prescribing info, Kenvue 2024.',
      warnings:{child:'Not under 6. Do not use with MAOIs.',adult:'Avoid with heart disease, high blood pressure, thyroid disease, or diabetes.'},
    },
  
    polyethyleneGlycol: {
      name:'Polyethylene Glycol 3350', brand:'MiraLax', category:'otc',
      tags:['constipation'],
      flatDose:{child:{'6m+':8,'6-11':17},adult:17},
      maxSingleDose:{child:17,adult:34}, maxDailyDose:{child:34,adult:34},
      intervalHours:24, maxDosesPerDay:1, minAge:{months:6},
      formats:{
        liquid:{label:'Powder dissolved in 4-8 oz liquid',concentrations:[{label:'8.5 g (half cap) — children 6 mo-5 yr',mgPerUnit:8500,unitML:120},{label:'17 g (full cap) — 6+ yr and adults',mgPerUnit:17000,unitML:240}]},
      },
      source:'FDA OTC Monograph (PEG 3350) · MiraLax prescribing info, Bayer Consumer Health 2024 · AAP constipation guideline.',
      warnings:{child:'Infants/young children: use only under physician guidance. Mix completely until dissolved.',adult:'Max 7 days of self-care; consult doctor for chronic constipation. Mix completely before drinking.'},
    },
  
    pseudoephedrine: {
      name:'Pseudoephedrine', brand:'Sudafed', category:'otc',
      pharmClasses:['sympathomimetic','bp_raiser'],
      tags:['sinus_congestion','cold_flu','ear_pain'],
      flatDose:{child:{'6-11':30,'12+':60},adult:60},
      maxSingleDose:{child:30,adult:60}, maxDailyDose:{child:120,adult:240},
      intervalHours:4, maxDosesPerDay:4, minAge:{years:6},
      formats:{
        tablet:{label:'Standard tablet',concentrations:[{label:'30 mg tablet',mgPerUnit:30},{label:'60 mg tablet',mgPerUnit:60}]},
        gelcap:{label:'Extended release caplet',concentrations:[{label:'120 mg 12-hour',mgPerUnit:120},{label:'240 mg 24-hour',mgPerUnit:240}]},
      },
      source:'FDA OTC Monograph (pseudoephedrine) · Sudafed prescribing info, Kenvue 2024. Requires pharmacist ID verification.',
      warnings:{child:'Not under 6. Do not use with MAOIs.',adult:'Avoid with heart disease, high blood pressure, thyroid disease, or diabetes. Do not use with MAOIs.'},
    },
  
    salicylicAcid: {
      name:'Salicylic Acid (Topical)', brand:'Compound W / Clearasil', category:'otc',
      tags:['rashes','minor_cuts'],
      flatDose:{child:{'6+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:2,adult:2},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:6},
      formats:{
        liquid:{label:'Gel / Liquid / Pad (thin layer)',concentrations:[{label:'0.5% gel (sensitive)',mgPerUnit:0.5},{label:'2% gel (standard)',mgPerUnit:2},{label:'17% solution (wart treatment)',mgPerUnit:17}]},
      },
      source:'FDA OTC Monograph (salicylic acid topical) · Compound W prescribing info, Prestige Brands 2024.',
      warnings:{child:'Not under 6. Avoid on large skin areas. Do not use near eyes or mucous membranes.',adult:'High concentrations (17%) for warts only. May cause skin irritation.'},
    },
  
    sennosides: {
      name:'Sennosides', brand:'Senokot / Ex-Lax', category:'otc',
      tags:['constipation'],
      flatDose:{child:{'2-5':4.3,'6-11':8.6,'12+':17.2},adult:17.2},
      maxSingleDose:{child:8.6,adult:34.4}, maxDailyDose:{child:17.2,adult:68.8},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:2},
      formats:{
        tablet:{label:'Standard tablet',concentrations:[{label:'8.6 mg tablet',mgPerUnit:8.6},{label:'17.2 mg tablet',mgPerUnit:17.2}]},
        liquid:{label:'Liquid / Syrup',concentrations:[{label:"8.8 mg/5 mL (Children's)",mgPerUnit:8.8,unitML:5}]},
      },
      source:'FDA OTC Monograph (sennosides) · Senokot prescribing info, Reckitt 2024.',
      warnings:{child:'Not under 2 without physician guidance. Generally produces a bowel movement in 6-12 hours.',adult:'Max 1 week without physician direction. May cause cramping.'},
    },
  
    simethicone: {
      name:'Simethicone', brand:'Gas-X / Mylicon', category:'otc',
      tags:['bloating','colic','upset_stomach'],
      flatDose:{child:{'0-2':20,'2-11':40,'12+':80},adult:125},
      maxSingleDose:{child:40,adult:250}, maxDailyDose:{child:240,adult:500},
      intervalHours:4, maxDosesPerDay:4, minAge:{months:0},
      formats:{
        liquid:{label:'Infant drops',concentrations:[{label:'20 mg/0.3 mL (Infant Mylicon)',mgPerUnit:20,unitML:0.3}]},
        chewable:{label:'Chewable tablet',concentrations:[{label:'40 mg chewable',mgPerUnit:40},{label:'80 mg chewable',mgPerUnit:80}]},
        gelcap:{label:'Softgel',concentrations:[{label:'125 mg softgel',mgPerUnit:125},{label:'250 mg softgel',mgPerUnit:250}]},
      },
      source:'FDA OTC Monograph (simethicone) · Gas-X/Mylicon prescribing info, Haleon 2024.',
      warnings:{child:'Generally safe for all ages. Max 12 doses/24 hr for infants.',adult:'Max 500 mg/24 hr.'},
    },
  
    witchHazel: {
      name:'Witch Hazel (Topical)', brand:'Thayers / T.N. Dickinson', category:'otc',
      tags:['insect_bites','rashes','minor_cuts','diaper_rash'],
      flatDose:{child:{'2+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid / Toner (applied with cotton pad)',concentrations:[{label:'14% witch hazel liquid',mgPerUnit:14},{label:'50% witch hazel liquid',mgPerUnit:50}]},
      },
      source:'FDA OTC Monograph (witch hazel topical/astringent) · Thayers prescribing info 2024.',
      warnings:{child:'For external use only. Avoid eyes. Not for deep wounds.',adult:'For external use only. Avoid contact with eyes. Not for internal use.'},
    },
  
    zincOxide: {
      name:'Zinc Oxide (Topical)', brand:'Desitin / Balmex', category:'otc',
      tags:['diaper_rash','burns','rashes','minor_cuts'],
      flatDose:{child:{'0+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{months:0},
      formats:{
        liquid:{label:'Cream / Paste / Ointment (thin layer)',concentrations:[{label:'10% cream',mgPerUnit:10},{label:'20% paste Maximum Strength',mgPerUnit:20},{label:'40% paste Maximum Strength',mgPerUnit:40}]},
      },
      source:'FDA OTC Monograph (zinc oxide topical) · Desitin prescribing info, Kenvue 2024.',
      warnings:{child:'Generally safe for all ages including newborns. Clean and dry skin thoroughly before each application.',adult:'For external use only. Avoid inhalation of powder forms.'},
    },
  
   // ═══════════════════════════════════════════════════
    // PRESCRIPTION MEDICATIONS — alphabetical
    // Adult-only unless noted. Doses are typical starting/maintenance
    // ranges. Individual prescriptions vary — always follow your
    // prescription label and pharmacist guidance.
    //
    // Flags used in this section:
    //   controlled: 'Schedule II' | 'Schedule IV' — DEA scheduling
    //   requiresIndividualization: true — calculator shows
    //     "Prescription-Individualized" reference card instead of
    //     computing a numeric dose
    // ═══════════════════════════════════════════════════

    albuterol: {
        name:'Albuterol Inhaler', brand:'ProAir / Ventolin / Proventil', category:'prescription',
        tags:['cold_flu'],
        flatDose:{child:{'4+':2},adult:2}, maxSingleDose:{child:2,adult:2}, maxDailyDose:{child:8,adult:12},
        intervalHours:4, maxDosesPerDay:4, minAge:{years:4},
        formats:{
          liquid:{label:'Metered-dose inhaler (puffs)',concentrations:[{label:'90 mcg/actuation (2 puffs as needed)',mgPerUnit:0.09,unitML:1}]},
        },
        source:'FDA Prescribing Information — ProAir HFA (Teva 2024) · Ventolin HFA (GSK 2024) · GINA Asthma Guidelines 2024.',
        warnings:{child:'Not under 4. Use spacer chamber for children. More than 4 doses/day signals worsening asthma — call doctor.',adult:'More than 2 puffs/day on a regular basis indicates poor asthma control. Rinse mouth after use. May cause tremor or rapid heartbeat.'},
      },
  
      alprazolam: {
        name:'Alprazolam', brand:'Xanax', category:'prescription',
        pharmClasses:['benzodiazepine','cns_depressant'],
        controlled:'Schedule IV', requiresIndividualization:true,
        tags:['anxiety','insomnia'],
        standardRange:'0.25–0.5 mg, three times daily as needed. Maximum 4 mg/day in divided doses. Elderly start at 0.25 mg twice daily.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:8, maxDosesPerDay:3, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'0.25 mg tablet',mgPerUnit:0.25},{label:'0.5 mg tablet',mgPerUnit:0.5},{label:'1 mg tablet',mgPerUnit:1},{label:'2 mg tablet',mgPerUnit:2}]},
          liquid:{label:'Oral concentrate',concentrations:[{label:'1 mg/mL concentrate',mgPerUnit:1,unitML:1}]},
        },
        source:'FDA Prescribing Information — Xanax (Pfizer 2024) · APA Practice Guidelines for Anxiety Disorders 2024 · DEA Schedule IV.',
        warnings:{child:'Not approved for use in children.',adult:'Schedule IV controlled substance — habit-forming. Do NOT stop suddenly: tapering required to avoid severe withdrawal, including seizure risk. Combining with opioids, alcohol, or other CNS depressants can be fatal (FDA black box warning). Significant impairment of driving and memory. Avoid in pregnancy.'},
      },
  
      amlodipine: {
        name:'Amlodipine', brand:'Norvasc', category:'prescription',
        tags:[],
        flatDose:{adult:5}, maxSingleDose:{adult:10}, maxDailyDose:{adult:10},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'2.5 mg tablet',mgPerUnit:2.5},{label:'5 mg tablet',mgPerUnit:5},{label:'10 mg tablet',mgPerUnit:10}]},
        },
        source:'FDA Prescribing Information — Norvasc (Pfizer 2024) · ACC/AHA Hypertension Guidelines 2024.',
        warnings:{child:'Use only under pediatric cardiology guidance.',adult:'Common side effect: ankle swelling (peripheral edema). May cause flushing or dizziness. Avoid grapefruit juice — increases blood levels.'},
      },
  
      amoxicillin: {
        name:'Amoxicillin', brand:'Amoxil / Trimox', category:'prescription',
        pharmClasses:['antibiotic_beta_lactam'],
        tags:['sore_throat','ear_pain','sinus_congestion','cold_flu','dental_pain'],
        mgPerKg:25, maxSingleDose:{child:500,adult:1000}, maxDailyDoseMgPerKg:90, maxDailyDose:{adult:3000},
        intervalHours:8, maxDosesPerDay:3, minAge:{months:0},
        formats:{
          liquid:{label:'Oral suspension',concentrations:[{label:'125 mg/5 mL (pediatric)',mgPerUnit:125,unitML:5},{label:'250 mg/5 mL',mgPerUnit:250,unitML:5},{label:'400 mg/5 mL',mgPerUnit:400,unitML:5}]},
          tablet:{label:'Tablet',concentrations:[{label:'500 mg tablet',mgPerUnit:500},{label:'875 mg tablet',mgPerUnit:875}]},
          gelcap:{label:'Capsule',concentrations:[{label:'250 mg capsule',mgPerUnit:250},{label:'500 mg capsule',mgPerUnit:500}]},
        },
        source:'FDA Prescribing Information — Amoxil (GSK 2024) · IDSA antimicrobial guidelines · AAP Red Book 2024.',
        warnings:{child:'Generally safe from infancy. Complete the FULL prescribed course even if symptoms resolve. Stop and call doctor if rash develops.',adult:'Complete the FULL course. Discontinue and seek care immediately if rash, hives, difficulty breathing (possible allergic reaction). May reduce effectiveness of oral contraceptives.'},
      },
  
      apixaban: {
        name:'Apixaban', brand:'Eliquis', category:'prescription',
        pharmClasses:['anticoagulant'],
        tags:[],
        flatDose:{adult:5}, maxSingleDose:{adult:5}, maxDailyDose:{adult:10},
        intervalHours:12, maxDosesPerDay:2, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'2.5 mg tablet',mgPerUnit:2.5},{label:'5 mg tablet',mgPerUnit:5}]},
        },
        source:'FDA Prescribing Information — Eliquis (BMS/Pfizer 2024) · CHEST Antithrombotic Guidelines 2024.',
        warnings:{child:'Not used in children.',adult:'Blood thinner — significant bleeding risk. Avoid combining with NSAIDs, aspirin, or other anticoagulants. Report any unusual bruising, blood in urine/stool, or prolonged bleeding immediately. Do not stop suddenly without physician guidance.'},
      },
  
      atorvastatin: {
        name:'Atorvastatin', brand:'Lipitor', category:'prescription',
        pharmClasses:['statin','liver_metabolized'],
        tags:[],
        flatDose:{adult:20}, maxSingleDose:{adult:80}, maxDailyDose:{adult:80},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'10 mg tablet',mgPerUnit:10},{label:'20 mg tablet',mgPerUnit:20},{label:'40 mg tablet',mgPerUnit:40},{label:'80 mg tablet',mgPerUnit:80}]},
        },
        source:'FDA Prescribing Information — Lipitor (Pfizer 2024) · ACC/AHA Cholesterol Guidelines 2018 (updated 2024).',
        warnings:{child:'Use only under pediatric cardiology/lipidology guidance for familial hypercholesterolemia.',adult:'Avoid grapefruit juice — significantly increases blood levels and side effect risk. Report unexplained muscle pain or weakness (rare risk of rhabdomyolysis). May elevate liver enzymes — periodic monitoring needed.'},
      },
  
      azithromycin: {
        name:'Azithromycin', brand:'Zithromax (Z-Pack)', category:'prescription',
        pharmClasses:['antibiotic_macrolide','qt_prolonging'],
        tags:['sore_throat','sinus_congestion','cold_flu','ear_pain'],
        mgPerKg:10, maxSingleDose:{child:500,adult:500}, maxDailyDose:{child:500,adult:500},
        intervalHours:24, maxDosesPerDay:1, minAge:{months:6},
        formats:{
          liquid:{label:'Oral suspension',concentrations:[{label:'100 mg/5 mL',mgPerUnit:100,unitML:5},{label:'200 mg/5 mL',mgPerUnit:200,unitML:5}]},
          tablet:{label:'Tablet',concentrations:[{label:'250 mg tablet',mgPerUnit:250},{label:'500 mg tablet',mgPerUnit:500}]},
        },
        source:'FDA Prescribing Information — Zithromax (Pfizer 2024) · IDSA antimicrobial guidelines.',
        warnings:{child:'Generally safe from 6 months. Complete the FULL prescribed course. Take 1 hour before or 2 hours after antacids.',adult:'May prolong QT interval — caution with heart rhythm conditions. Avoid combining with other QT-prolonging drugs. Take 1 hour before or 2 hours after antacids containing aluminum or magnesium.'},
      },
  
      bupropion: {
        name:'Bupropion', brand:'Wellbutrin / Zyban', category:'prescription',
        pharmClasses:['atypical_antidepressant'],
        tags:['anxiety'],
        flatDose:{adult:150}, maxSingleDose:{adult:300}, maxDailyDose:{adult:450},
        intervalHours:12, maxDosesPerDay:2, minAge:{years:18},
        formats:{
          tablet:{label:'Immediate release tablet',concentrations:[{label:'75 mg IR tablet',mgPerUnit:75},{label:'100 mg IR tablet',mgPerUnit:100}]},
          gelcap:{label:'Sustained/Extended release',concentrations:[{label:'150 mg SR (twice daily)',mgPerUnit:150},{label:'200 mg SR (twice daily)',mgPerUnit:200},{label:'150 mg XL (once daily)',mgPerUnit:150},{label:'300 mg XL (once daily)',mgPerUnit:300}]},
        },
        source:'FDA Prescribing Information — Wellbutrin XL (GSK 2024) · APA Practice Guidelines for Depression 2024.',
        warnings:{child:'Not approved for use in children. FDA black box warning: increased risk of suicidal thoughts in young adults under 25.',adult:'Lowers seizure threshold — do not exceed daily limits, avoid in patients with seizure disorders, bulimia, anorexia, or abrupt alcohol/sedative withdrawal. Do NOT combine with MAOIs (14-day washout). May cause insomnia — avoid evening dosing. Less sexual side effects than SSRIs.'},
      },
  
      cephalexin: {
        name:'Cephalexin', brand:'Keflex', category:'prescription',
        pharmClasses:['antibiotic_beta_lactam'],
        tags:['sore_throat','ear_pain','minor_cuts'],
        mgPerKg:25, maxSingleDose:{child:500,adult:1000}, maxDailyDoseMgPerKg:100, maxDailyDose:{adult:4000},
        intervalHours:6, maxDosesPerDay:4, minAge:{months:0},
        formats:{
          liquid:{label:'Oral suspension',concentrations:[{label:'125 mg/5 mL',mgPerUnit:125,unitML:5},{label:'250 mg/5 mL',mgPerUnit:250,unitML:5}]},
          gelcap:{label:'Capsule',concentrations:[{label:'250 mg capsule',mgPerUnit:250},{label:'500 mg capsule',mgPerUnit:500},{label:'750 mg capsule',mgPerUnit:750}]},
          tablet:{label:'Tablet',concentrations:[{label:'250 mg tablet',mgPerUnit:250},{label:'500 mg tablet',mgPerUnit:500}]},
        },
        source:'FDA Prescribing Information — Keflex (Pragma 2024) · IDSA antimicrobial guidelines · AAP Red Book 2024.',
        warnings:{child:'Generally safe from infancy. Complete the FULL prescribed course. Take with food if stomach upset.',adult:'Complete the FULL course. Cross-reactivity with penicillin allergies in approximately 1-3% — caution if severe penicillin reaction history. May cause GI upset, yeast infections.'},
      },
  
      ciprofloxacin: {
        name:'Ciprofloxacin', brand:'Cipro', category:'prescription',
        pharmClasses:['antibiotic_fluoroquinolone','qt_prolonging'],
        tags:['ear_pain'],
        flatDose:{adult:500}, maxSingleDose:{adult:750}, maxDailyDose:{adult:1500},
        intervalHours:12, maxDosesPerDay:2, minAge:{years:18},
        formats:{
          liquid:{label:'Oral suspension',concentrations:[{label:'250 mg/5 mL',mgPerUnit:250,unitML:5},{label:'500 mg/5 mL',mgPerUnit:500,unitML:5}]},
          tablet:{label:'Standard tablet',concentrations:[{label:'250 mg tablet',mgPerUnit:250},{label:'500 mg tablet',mgPerUnit:500},{label:'750 mg tablet',mgPerUnit:750}]},
        },
        source:'FDA Prescribing Information — Cipro (Bayer 2024) · IDSA antimicrobial guidelines.',
        warnings:{child:'Reserved for serious infections under specialist guidance — fluoroquinolones can affect developing joints/tendons.',adult:'FDA black box warning: tendon rupture risk (especially Achilles, higher with steroids and in patients over 60). Stop and seek care for any tendon pain. May cause peripheral neuropathy, prolonged QT, severe hypoglycemia in diabetics. Avoid dairy, calcium, iron, antacids within 2 hours — reduces absorption. Avoid in pregnancy.'},
      },
  
      clonazepam: {
        name:'Clonazepam', brand:'Klonopin', category:'prescription',
        pharmClasses:['benzodiazepine','cns_depressant'],
        controlled:'Schedule IV', requiresIndividualization:true,
        tags:['anxiety','insomnia'],
        standardRange:'0.25–0.5 mg, twice daily for panic disorder. Up to 4 mg/day in divided doses. Elderly start at 0.25 mg.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:12, maxDosesPerDay:2, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'0.5 mg tablet',mgPerUnit:0.5},{label:'1 mg tablet',mgPerUnit:1},{label:'2 mg tablet',mgPerUnit:2}]},
          chewable:{label:'Orally disintegrating tablet',concentrations:[{label:'0.125 mg ODT',mgPerUnit:0.125},{label:'0.25 mg ODT',mgPerUnit:0.25},{label:'0.5 mg ODT',mgPerUnit:0.5},{label:'1 mg ODT',mgPerUnit:1},{label:'2 mg ODT',mgPerUnit:2}]},
        },
        source:'FDA Prescribing Information — Klonopin (Genentech 2024) · APA Practice Guidelines for Anxiety Disorders 2024 · DEA Schedule IV.',
        warnings:{child:'Pediatric use for seizure disorders only, under specialist guidance.',adult:'Schedule IV controlled substance — habit-forming. Long half-life — accumulates over days. Do NOT stop suddenly: tapering required to avoid severe withdrawal, including seizure risk. Combining with opioids, alcohol, or other CNS depressants can be fatal (FDA black box warning). Significant impairment of driving and memory. Avoid in pregnancy.'},
      },
  
      doxycycline: {
        name:'Doxycycline', brand:'Vibramycin / Doryx', category:'prescription',
        pharmClasses:['antibiotic_tetracycline'],
        tags:['sinus_congestion'],
        flatDose:{adult:100}, maxSingleDose:{adult:200}, maxDailyDose:{adult:200},
        intervalHours:12, maxDosesPerDay:2, minAge:{years:8},
        formats:{
          liquid:{label:'Oral suspension / Syrup',concentrations:[{label:'25 mg/5 mL',mgPerUnit:25,unitML:5},{label:'50 mg/5 mL',mgPerUnit:50,unitML:5}]},
          tablet:{label:'Tablet',concentrations:[{label:'50 mg tablet',mgPerUnit:50},{label:'100 mg tablet',mgPerUnit:100},{label:'150 mg tablet',mgPerUnit:150}]},
          gelcap:{label:'Capsule',concentrations:[{label:'50 mg capsule',mgPerUnit:50},{label:'100 mg capsule',mgPerUnit:100}]},
        },
        source:'FDA Prescribing Information — Vibramycin (Pfizer 2024) · IDSA antimicrobial guidelines · AAP Red Book 2024.',
        warnings:{child:'Approved for ages 8+. Under 8: significant risk of permanent tooth discoloration — reserved for serious infections (e.g. anthrax, Rocky Mountain spotted fever) under specialist guidance.',adult:'Take with full glass of water, sit upright for 30 minutes — esophageal irritation risk. Avoid dairy, calcium, iron, antacids within 2 hours — reduces absorption. Causes severe photosensitivity — use sunscreen. Avoid in pregnancy.'},
      },
  
      empagliflozin: {
        name:'Empagliflozin', brand:'Jardiance', category:'prescription',
        pharmClasses:['diabetes_med','sglt2'],
        tags:[],
        flatDose:{adult:10}, maxSingleDose:{adult:25}, maxDailyDose:{adult:25},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'10 mg tablet',mgPerUnit:10},{label:'25 mg tablet',mgPerUnit:25}]},
        },
        source:'FDA Prescribing Information — Jardiance (Boehringer Ingelheim/Lilly 2024) · ADA Standards of Care 2024.',
        warnings:{child:'Not approved for use in children.',adult:'SGLT2 inhibitor. Increases urination, may cause genital yeast infections and urinary tract infections. Rare but serious: ketoacidosis (can occur even with normal blood sugar) — seek care for nausea, vomiting, abdominal pain. Stay well hydrated.'},
      },
  
      escitalopram: {
        name:'Escitalopram', brand:'Lexapro', category:'prescription',
        pharmClasses:['ssri','serotonergic'],
        tags:['anxiety','insomnia'],
        flatDose:{adult:10}, maxSingleDose:{adult:20}, maxDailyDose:{adult:20},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:12},
        formats:{
          liquid:{label:'Oral solution',concentrations:[{label:'5 mg/5 mL',mgPerUnit:5,unitML:5}]},
          tablet:{label:'Standard tablet',concentrations:[{label:'5 mg tablet',mgPerUnit:5},{label:'10 mg tablet',mgPerUnit:10},{label:'20 mg tablet',mgPerUnit:20}]},
        },
        source:'FDA Prescribing Information — Lexapro (AbbVie 2024) · APA Practice Guidelines for Depression 2024.',
        warnings:{child:'Approved for ages 12+ for depression. FDA black box warning: increased risk of suicidal thoughts in children and young adults — monitor closely especially in first weeks.',adult:'Do NOT combine with MAOIs (14-day washout). Do not combine with other serotonergic drugs without physician guidance (serotonin syndrome risk). Discontinuation should be gradual — abrupt stopping causes withdrawal. Avoid St. John\'s Wort.'},
      },
  
      fluoxetine: {
        name:'Fluoxetine', brand:'Prozac / Sarafem', category:'prescription',
        pharmClasses:['ssri','serotonergic'],
        tags:['anxiety'],
        flatDose:{adult:20}, maxSingleDose:{adult:80}, maxDailyDose:{adult:80},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:8},
        formats:{
          liquid:{label:'Oral solution',concentrations:[{label:'20 mg/5 mL',mgPerUnit:20,unitML:5}]},
          gelcap:{label:'Capsule',concentrations:[{label:'10 mg capsule',mgPerUnit:10},{label:'20 mg capsule',mgPerUnit:20},{label:'40 mg capsule',mgPerUnit:40}]},
          tablet:{label:'Tablet',concentrations:[{label:'10 mg tablet',mgPerUnit:10},{label:'20 mg tablet',mgPerUnit:20}]},
        },
        source:'FDA Prescribing Information — Prozac (Lilly 2024) · APA Practice Guidelines for Depression 2024.',
        warnings:{child:'Approved for ages 8+ for depression. FDA black box warning: increased risk of suicidal thoughts in children and young adults.',adult:'Long half-life (~5-7 days) — withdrawal less common but interactions persist after stopping. Do NOT combine with MAOIs (5-week washout required). Avoid combining with other serotonergic drugs. Avoid St. John\'s Wort.'},
      },
  
      gabapentin: {
        name:'Gabapentin', brand:'Neurontin', category:'prescription',
        pharmClasses:['cns_depressant'],
        tags:['back_pain','migraines','tension_headaches'],
        flatDose:{adult:300}, maxSingleDose:{adult:1200}, maxDailyDose:{adult:3600},
        intervalHours:8, maxDosesPerDay:3, minAge:{years:3},
        formats:{
          liquid:{label:'Oral solution',concentrations:[{label:'250 mg/5 mL',mgPerUnit:250,unitML:5}]},
          gelcap:{label:'Capsule',concentrations:[{label:'100 mg capsule',mgPerUnit:100},{label:'300 mg capsule',mgPerUnit:300},{label:'400 mg capsule',mgPerUnit:400}]},
          tablet:{label:'Tablet',concentrations:[{label:'600 mg tablet',mgPerUnit:600},{label:'800 mg tablet',mgPerUnit:800}]},
        },
        source:'FDA Prescribing Information — Neurontin (Pfizer 2024) · AAN Neuropathic Pain Guidelines.',
        warnings:{child:'Approved for ages 3+ for seizures only. Pain use is off-label in children.',adult:'May cause significant drowsiness and dizziness. Do not stop abruptly — taper to avoid withdrawal. Caution combining with opioids (respiratory depression risk). Dose adjustment needed with kidney impairment.'},
      },
  
      hydrochlorothiazide: {
        name:'Hydrochlorothiazide', brand:'Microzide / HCTZ', category:'prescription',
        pharmClasses:['diuretic','electrolyte_loss'],
        tags:[],
        flatDose:{adult:12.5}, maxSingleDose:{adult:50}, maxDailyDose:{adult:50},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'12.5 mg tablet',mgPerUnit:12.5},{label:'25 mg tablet',mgPerUnit:25},{label:'50 mg tablet',mgPerUnit:50}]},
        },
        source:'FDA Prescribing Information — Microzide (Watson 2024) · ACC/AHA Hypertension Guidelines 2024.',
        warnings:{child:'Use only under pediatric guidance.',adult:'Diuretic — may cause potassium loss, dehydration, and electrolyte imbalances. Periodic blood tests required. May increase blood sugar and uric acid. Take in the morning to avoid nighttime urination.'},
      },
  
      hydrocodoneAcetaminophen: {
        name:'Hydrocodone/Acetaminophen', brand:'Norco / Vicodin / Lortab', category:'prescription',
        pharmClasses:['opioid','cns_depressant','hepatotoxic'],
        controlled:'Schedule II', requiresIndividualization:true,
        tags:['back_pain','dental_pain','muscle_pain'],
        standardRange:'5/325 mg every 4–6 hours as needed. Maximum 8 tablets (40 mg hydrocodone / 2,600 mg acetaminophen) per day. Adjusted by prescriber based on pain severity and tolerance.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:4, maxDosesPerDay:6, minAge:{years:18},
        formats:{
          tablet:{label:'Combination tablet',concentrations:[{label:'5 mg / 325 mg tablet',mgPerUnit:5},{label:'7.5 mg / 325 mg tablet',mgPerUnit:7.5},{label:'10 mg / 325 mg tablet',mgPerUnit:10}]},
          liquid:{label:'Oral solution',concentrations:[{label:'7.5 mg / 325 mg per 15 mL',mgPerUnit:7.5,unitML:15}]},
        },
        source:'FDA Prescribing Information — Norco (Allergan 2024) · CDC Opioid Prescribing Guidelines 2022 · DEA Schedule II.',
        warnings:{child:'Not approved for use in children.',adult:'Schedule II opioid — high abuse potential. FDA black box warning: respiratory depression, addiction, overdose risk, and fatal interaction with benzodiazepines or alcohol. Acetaminophen component: never exceed 4,000 mg/day from ALL sources (check OTC products). Do not stop suddenly after extended use — taper to avoid withdrawal. Significant driving impairment. Avoid in pregnancy.'},
      },
  
      insulinLongActing: {
        name:'Insulin (Long-Acting)', brand:'Lantus / Tresiba / Basaglar', category:'prescription',
        pharmClasses:['diabetes_med','insulin'],
        requiresIndividualization:true,
        tags:[],
        standardRange:'Dose is unique to each patient. Typical starting dose is 0.1–0.2 units/kg once daily, then adjusted by your prescriber based on blood glucose patterns, weight, and insulin sensitivity.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:24, maxDosesPerDay:1, minAge:{months:0},
        formats:{
          liquid:{label:'Injectable pen or vial — DOSE IS HIGHLY INDIVIDUALIZED',concentrations:[{label:'100 units/mL standard concentration',mgPerUnit:0,unitML:1},{label:'300 units/mL concentrated (Tresiba U-300)',mgPerUnit:0,unitML:1}]},
        },
        source:'FDA Prescribing Information — Lantus (Sanofi 2024) · Tresiba (Novo Nordisk 2024) · ADA Standards of Care 2024.',
        warnings:{child:'Pediatric insulin dosing is highly individualized. Follow endocrinologist guidance precisely.',adult:'INSULIN DOSE IS INDIVIDUALIZED — there is no standard dose. Your prescriber determines units based on your weight, blood sugar patterns, and insulin sensitivity. Hypoglycemia (low blood sugar) is the primary risk: sweating, shaking, confusion, fast heartbeat. Always carry fast-acting glucose. Rotate injection sites.'},
      },
  
      insulinRapidActing: {
        name:'Insulin (Rapid-Acting)', brand:'Humalog / NovoLog / Apidra', category:'prescription',
        pharmClasses:['diabetes_med','insulin'],
        requiresIndividualization:true,
        tags:[],
        standardRange:'Dose is unique to each patient and meal. Typically calculated using your prescriber-set insulin-to-carb ratio and correction factor. Taken with meals.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:3, maxDosesPerDay:8, minAge:{months:0},
        formats:{
          liquid:{label:'Injectable pen or vial — DOSE IS HIGHLY INDIVIDUALIZED',concentrations:[{label:'100 units/mL standard',mgPerUnit:0,unitML:1},{label:'200 units/mL concentrated (Humalog U-200)',mgPerUnit:0,unitML:1}]},
        },
        source:'FDA Prescribing Information — Humalog (Lilly 2024) · NovoLog (Novo Nordisk 2024) · ADA Standards of Care 2024.',
        warnings:{child:'Pediatric insulin dosing is highly individualized. Follow endocrinologist guidance precisely.',adult:'INSULIN DOSE IS INDIVIDUALIZED — there is no standard dose. Mealtime insulin: dose based on carbs eaten and current blood sugar. Hypoglycemia is the primary risk: take immediately before or with meals. Always carry fast-acting glucose.'},
      },
  
      levothyroxine: {
        name:'Levothyroxine', brand:'Synthroid / Levoxyl', category:'prescription',
        pharmClasses:['absorption_sensitive'],
        tags:[],
        flatDose:{adult:75}, maxSingleDose:{adult:300}, maxDailyDose:{adult:300},
        intervalHours:24, maxDosesPerDay:1, minAge:{months:0},
        formats:{
          tablet:{label:'Standard tablet (many strengths)',concentrations:[{label:'25 mcg tablet',mgPerUnit:0.025},{label:'50 mcg tablet',mgPerUnit:0.05},{label:'75 mcg tablet',mgPerUnit:0.075},{label:'100 mcg tablet',mgPerUnit:0.1},{label:'150 mcg tablet',mgPerUnit:0.15},{label:'200 mcg tablet',mgPerUnit:0.2}]},
        },
        source:'FDA Prescribing Information — Synthroid (AbbVie 2024) · American Thyroid Association Guidelines 2024.',
        warnings:{child:'Safe from infancy under endocrinologist guidance. Critical for congenital hypothyroidism.',adult:'Take on empty stomach, 30-60 min before breakfast. Avoid taking with calcium, iron, antacids, or coffee within 4 hours — reduces absorption. Dose changes only by physician — periodic TSH testing required. Same brand is preferred — switching brands can affect levels.'},
      },
  
      lisinopril: {
        name:'Lisinopril', brand:'Prinivil / Zestril', category:'prescription',
        tags:[],
        flatDose:{adult:10}, maxSingleDose:{adult:40}, maxDailyDose:{adult:80},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:6},
        formats:{
          liquid:{label:'Oral solution',concentrations:[{label:'1 mg/mL',mgPerUnit:1,unitML:1}]},
          tablet:{label:'Standard tablet',concentrations:[{label:'5 mg tablet',mgPerUnit:5},{label:'10 mg tablet',mgPerUnit:10},{label:'20 mg tablet',mgPerUnit:20},{label:'40 mg tablet',mgPerUnit:40}]},
        },
        source:'FDA Prescribing Information — Prinivil (Merck 2024) · ACC/AHA Hypertension Guidelines 2024.',
        warnings:{child:'Use under pediatric guidance for hypertension.',adult:'Common side effect: dry persistent cough (about 10% of users). Do NOT use in pregnancy — can harm fetus. Periodic blood tests for kidney function and potassium needed. Avoid potassium supplements unless directed.'},
      },
  
      lorazepam: {
        name:'Lorazepam', brand:'Ativan', category:'prescription',
        pharmClasses:['benzodiazepine','cns_depressant'],
        controlled:'Schedule IV', requiresIndividualization:true,
        tags:['anxiety','insomnia'],
        standardRange:'0.5–1 mg, two to three times daily for anxiety. Up to 10 mg/day in divided doses. Elderly start at 0.5 mg twice daily.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:8, maxDosesPerDay:3, minAge:{years:12},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'0.5 mg tablet',mgPerUnit:0.5},{label:'1 mg tablet',mgPerUnit:1},{label:'2 mg tablet',mgPerUnit:2}]},
          liquid:{label:'Oral concentrate',concentrations:[{label:'2 mg/mL concentrate',mgPerUnit:2,unitML:1}]},
        },
        source:'FDA Prescribing Information — Ativan (Bausch Health 2024) · APA Practice Guidelines for Anxiety Disorders 2024 · DEA Schedule IV.',
        warnings:{child:'Limited pediatric use — under specialist guidance only.',adult:'Schedule IV controlled substance — habit-forming. Do NOT stop suddenly: tapering required to avoid severe withdrawal, including seizure risk. Combining with opioids, alcohol, or other CNS depressants can be fatal (FDA black box warning). Significant impairment of driving and memory. Caution in elderly. Avoid in pregnancy.'},
      },
  
      losartan: {
        name:'Losartan', brand:'Cozaar', category:'prescription',
        tags:[],
        flatDose:{adult:50}, maxSingleDose:{adult:100}, maxDailyDose:{adult:100},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:6},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'25 mg tablet',mgPerUnit:25},{label:'50 mg tablet',mgPerUnit:50},{label:'100 mg tablet',mgPerUnit:100}]},
        },
        source:'FDA Prescribing Information — Cozaar (Merck 2024) · ACC/AHA Hypertension Guidelines 2024.',
        warnings:{child:'Approved for ages 6+ for hypertension.',adult:'Do NOT use in pregnancy — can harm fetus. ARB alternative for those who develop cough on ACE inhibitors (lisinopril). Periodic blood tests for kidney function and potassium needed. Avoid potassium supplements unless directed.'},
      },
  
      metformin: {
        name:'Metformin', brand:'Glucophage / Fortamet', category:'prescription',
        pharmClasses:['diabetes_med'],
        tags:[],
        flatDose:{adult:500}, maxSingleDose:{adult:1000}, maxDailyDose:{adult:2000},
        intervalHours:12, maxDosesPerDay:2, minAge:{years:10},
        formats:{
          liquid:{label:'Oral solution',concentrations:[{label:'500 mg/5 mL',mgPerUnit:500,unitML:5}]},
          tablet:{label:'Immediate release tablet',concentrations:[{label:'500 mg tablet',mgPerUnit:500},{label:'850 mg tablet',mgPerUnit:850},{label:'1000 mg tablet',mgPerUnit:1000}]},
          gelcap:{label:'Extended release (once daily)',concentrations:[{label:'500 mg ER',mgPerUnit:500},{label:'750 mg ER',mgPerUnit:750},{label:'1000 mg ER',mgPerUnit:1000}]},
        },
        source:'FDA Prescribing Information — Glucophage (Bristol-Myers Squibb 2024) · ADA Standards of Care 2024.',
        warnings:{child:'Approved for ages 10+ for type 2 diabetes.',adult:'Take WITH food to reduce GI side effects (nausea, diarrhea, stomach upset). Hold dose 48 hours before/after IV contrast imaging. Rare but serious: lactic acidosis — seek care for unusual weakness, muscle pain, trouble breathing. Do not use with severe kidney disease.'},
      },
  
      metoprolol: {
        name:'Metoprolol', brand:'Lopressor / Toprol XL', category:'prescription',
        tags:[],
        flatDose:{adult:50}, maxSingleDose:{adult:200}, maxDailyDose:{adult:400},
        intervalHours:12, maxDosesPerDay:2, minAge:{years:18},
        formats:{
          tablet:{label:'Immediate release (twice daily)',concentrations:[{label:'25 mg tablet',mgPerUnit:25},{label:'50 mg tablet',mgPerUnit:50},{label:'100 mg tablet',mgPerUnit:100}]},
          gelcap:{label:'Extended release (once daily)',concentrations:[{label:'25 mg ER',mgPerUnit:25},{label:'50 mg ER',mgPerUnit:50},{label:'100 mg ER',mgPerUnit:100},{label:'200 mg ER',mgPerUnit:200}]},
        },
        source:'FDA Prescribing Information — Lopressor (Novartis 2024) · Toprol XL (AstraZeneca 2024) · ACC/AHA Heart Failure Guidelines 2024.',
        warnings:{child:'Use under pediatric cardiology guidance only.',adult:'Beta blocker. Do NOT stop abruptly — can cause rebound high blood pressure or chest pain. May mask symptoms of low blood sugar in diabetics. May cause fatigue, cold hands/feet, slow heart rate. Avoid with asthma when possible.'},
      },
  
      omeprazole: {
        name:'Omeprazole (Prescription)', brand:'Prilosec Rx', category:'prescription',
        pharmClasses:['ppi','acid_reducer'],
        tags:['heartburn','upset_stomach'],
        flatDose:{adult:20}, maxSingleDose:{adult:40}, maxDailyDose:{adult:40},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:1},
        formats:{
          gelcap:{label:'Delayed-release capsule',concentrations:[{label:'10 mg capsule',mgPerUnit:10},{label:'20 mg capsule',mgPerUnit:20},{label:'40 mg capsule',mgPerUnit:40}]},
          tablet:{label:'Delayed-release tablet',concentrations:[{label:'20 mg tablet',mgPerUnit:20}]},
        },
        source:'FDA Prescribing Information — Prilosec (AstraZeneca 2024) · ACG GERD Guidelines 2022.',
        warnings:{child:'Approved for ages 1+ for GERD. Use under physician guidance.',adult:'Take 30-60 minutes BEFORE first meal of the day. Long-term use (>1 year) associated with B12 deficiency, magnesium loss, and increased fracture risk. Do not stop abruptly — taper to avoid rebound acid. May reduce effectiveness of clopidogrel (Plavix).'},
      },
  
      prednisone: {
        name:'Prednisone', brand:'Deltasone / Rayos', category:'prescription',
        tags:[],
        flatDose:{adult:20}, maxSingleDose:{adult:80}, maxDailyDose:{adult:80},
        intervalHours:24, maxDosesPerDay:1, minAge:{months:0},
        formats:{
          liquid:{label:'Oral solution',concentrations:[{label:'5 mg/5 mL',mgPerUnit:5,unitML:5},{label:'5 mg/mL concentrate',mgPerUnit:5,unitML:1}]},
          tablet:{label:'Standard tablet',concentrations:[{label:'1 mg tablet',mgPerUnit:1},{label:'2.5 mg tablet',mgPerUnit:2.5},{label:'5 mg tablet',mgPerUnit:5},{label:'10 mg tablet',mgPerUnit:10},{label:'20 mg tablet',mgPerUnit:20},{label:'50 mg tablet',mgPerUnit:50}]},
        },
        source:'FDA Prescribing Information — Deltasone (Pfizer 2024) · ACR Glucocorticoid-Induced Osteoporosis Guidelines 2024.',
        warnings:{child:'Safe under physician guidance. Use lowest effective dose for shortest duration. May suppress growth with prolonged use.',adult:'Take WITH food to reduce stomach irritation. Do NOT stop abruptly if used more than 7-10 days — must taper to avoid adrenal crisis. Increases infection risk, blood sugar, blood pressure, fluid retention. Long-term use causes bone loss — discuss calcium/vitamin D with doctor. Avoid live vaccines.'},
      },
  
      semaglutide: {
        name:'Semaglutide', brand:'Ozempic / Wegovy / Rybelsus', category:'prescription',
        pharmClasses:['diabetes_med','glp1'],
        tags:[],
        flatDose:{adult:0.25}, maxSingleDose:{adult:2}, maxDailyDose:{adult:2},
        intervalHours:168, maxDosesPerDay:1, minAge:{years:12},
        formats:{
          liquid:{label:'Injectable pen (weekly subcutaneous)',concentrations:[{label:'0.25 mg starter dose',mgPerUnit:0.25,unitML:1},{label:'0.5 mg maintenance',mgPerUnit:0.5,unitML:1},{label:'1 mg maintenance',mgPerUnit:1,unitML:1},{label:'2 mg maximum',mgPerUnit:2,unitML:1}]},
          tablet:{label:'Oral tablet (Rybelsus, daily)',concentrations:[{label:'3 mg tablet',mgPerUnit:3},{label:'7 mg tablet',mgPerUnit:7},{label:'14 mg tablet',mgPerUnit:14}]},
        },
        source:'FDA Prescribing Information — Ozempic (Novo Nordisk 2024) · Wegovy (Novo Nordisk 2024) · ADA Standards of Care 2024.',
        warnings:{child:'Approved for ages 12+ (Wegovy for obesity). Diabetes use is adult-only.',adult:'GLP-1 agonist. Weekly injection (Ozempic/Wegovy) or daily tablet (Rybelsus). Common side effects: nausea, vomiting, diarrhea (often improve over time — start at low dose). Rare but serious: pancreatitis, gallbladder issues, kidney injury from dehydration. Black box warning for thyroid C-cell tumors (seen in rodents). For oral Rybelsus: take on empty stomach with sip of plain water, wait 30 min before food or other meds.'},
      },
  
      sertraline: {
        name:'Sertraline', brand:'Zoloft', category:'prescription',
        pharmClasses:['ssri','serotonergic'],
        tags:['anxiety','insomnia'],
        flatDose:{adult:50}, maxSingleDose:{adult:200}, maxDailyDose:{adult:200},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:6},
        formats:{
          liquid:{label:'Oral concentrate',concentrations:[{label:'20 mg/mL concentrate',mgPerUnit:20,unitML:1}]},
          tablet:{label:'Standard tablet',concentrations:[{label:'25 mg tablet',mgPerUnit:25},{label:'50 mg tablet',mgPerUnit:50},{label:'100 mg tablet',mgPerUnit:100}]},
        },
        source:'FDA Prescribing Information — Zoloft (Pfizer 2024) · APA Practice Guidelines for Depression 2024.',
        warnings:{child:'Approved for OCD ages 6+. Other uses are adult only. FDA black box warning: increased risk of suicidal thoughts in children and young adults — monitor closely especially in first weeks.',adult:'Do NOT combine with MAOIs (14-day washout). Do not combine with other serotonergic drugs without physician guidance (serotonin syndrome risk). Discontinuation should be gradual — abrupt stopping causes withdrawal (dizziness, brain zaps, irritability). Avoid St. John\'s Wort. Take with food to reduce GI upset.'},
      },
  
      tramadol: {
        name:'Tramadol', brand:'Ultram / ConZip', category:'prescription',
        pharmClasses:['opioid','cns_depressant','serotonergic'],
        controlled:'Schedule IV', requiresIndividualization:true,
        tags:['back_pain','muscle_pain','joint_pain'],
        standardRange:'50–100 mg every 4–6 hours as needed. Maximum 400 mg/day (300 mg in elderly). Extended-release: 100–300 mg once daily.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:6, maxDosesPerDay:4, minAge:{years:18},
        formats:{
          tablet:{label:'Immediate release tablet',concentrations:[{label:'50 mg tablet',mgPerUnit:50}]},
          gelcap:{label:'Extended release',concentrations:[{label:'100 mg ER',mgPerUnit:100},{label:'200 mg ER',mgPerUnit:200},{label:'300 mg ER',mgPerUnit:300}]},
        },
        source:'FDA Prescribing Information — Ultram (Janssen 2024) · CDC Opioid Prescribing Guidelines 2022 · DEA Schedule IV.',
        warnings:{child:'Not approved under 18 — FDA black box warning for ages under 12 (death risk from ultra-rapid metabolism).',adult:'Schedule IV opioid — habit-forming. FDA black box warning: respiratory depression, addiction, seizure risk (especially at high doses or with other seizure-lowering drugs), and fatal interaction with benzodiazepines or alcohol. Serotonin syndrome risk — do not combine with SSRIs, SNRIs, MAOIs, or triptans without physician guidance. Do not stop suddenly after extended use — taper to avoid withdrawal. Significant driving impairment.'},
      },
  
      trazodone: {
        name:'Trazodone', brand:'Desyrel / Oleptro', category:'prescription',
        pharmClasses:['cns_depressant','serotonergic'],
        tags:['insomnia','anxiety'],
        flatDose:{adult:50}, maxSingleDose:{adult:300}, maxDailyDose:{adult:400},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:18},
        formats:{
          tablet:{label:'Standard tablet',concentrations:[{label:'50 mg tablet',mgPerUnit:50},{label:'100 mg tablet',mgPerUnit:100},{label:'150 mg tablet',mgPerUnit:150},{label:'300 mg tablet',mgPerUnit:300}]},
        },
        source:'FDA Prescribing Information — Desyrel (Pragma Pharmaceuticals 2024) · AASM Clinical Practice Guidelines for Insomnia 2024.',
        warnings:{child:'Not approved in children — adult use only.',adult:'Most commonly used off-label for insomnia at lower doses (25-100 mg at bedtime). Causes significant drowsiness — take 30 min before bed. Do not combine with alcohol or sedatives. Rare but serious: priapism (painful prolonged erection) — seek emergency care if occurs. Do NOT combine with MAOIs. May cause dizziness on standing.'},
      },
  
      warfarin: {
        name:'Warfarin', brand:'Coumadin / Jantoven', category:'prescription',
        pharmClasses:['anticoagulant'],
        requiresIndividualization:true,
        tags:[],
        standardRange:'Dose is unique to each patient and adjusted continuously based on INR blood testing. Typical maintenance ranges from 2 to 10 mg daily. Target INR is 2.0–3.0 for most conditions.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:24, maxDosesPerDay:1, minAge:{months:0},
        formats:{
          tablet:{label:'Standard tablet — DOSE IS HIGHLY INDIVIDUALIZED via INR monitoring',concentrations:[{label:'1 mg tablet',mgPerUnit:1},{label:'2 mg tablet',mgPerUnit:2},{label:'2.5 mg tablet',mgPerUnit:2.5},{label:'3 mg tablet',mgPerUnit:3},{label:'4 mg tablet',mgPerUnit:4},{label:'5 mg tablet',mgPerUnit:5},{label:'6 mg tablet',mgPerUnit:6},{label:'7.5 mg tablet',mgPerUnit:7.5},{label:'10 mg tablet',mgPerUnit:10}]},
        },
        source:'FDA Prescribing Information — Coumadin (Bristol-Myers Squibb 2024) · CHEST Antithrombotic Guidelines 2024.',
        warnings:{child:'Pediatric dosing is highly individualized. Follow hematologist guidance precisely.',adult:'WARFARIN DOSE IS INDIVIDUALIZED via INR blood testing — there is no standard dose. Target INR is condition-specific (usually 2.0-3.0). Many food and drug interactions affect levels: vitamin K (leafy greens) reduces effect, antibiotics often increase effect. Significant bleeding risk: report unusual bruising, blood in urine/stool, severe headache. Do NOT combine with NSAIDs, aspirin, or other anticoagulants without physician guidance. Avoid grapefruit juice. Maintain consistent diet — sudden changes in vitamin K affect INR.'},
      },
  
      zolpidem: {
        name:'Zolpidem', brand:'Ambien', category:'prescription',
        pharmClasses:['z_drug','cns_depressant'],
        controlled:'Schedule IV', requiresIndividualization:true,
        tags:['insomnia'],
        standardRange:'5 mg (women) or 5–10 mg (men) immediately before bed. Maximum 10 mg/day. Elderly start at 5 mg.',
        flatDose:{adult:0}, maxSingleDose:{adult:0}, maxDailyDose:{adult:0},
        intervalHours:24, maxDosesPerDay:1, minAge:{years:18},
        formats:{
          tablet:{label:'Immediate release tablet',concentrations:[{label:'5 mg tablet',mgPerUnit:5},{label:'10 mg tablet',mgPerUnit:10}]},
          gelcap:{label:'Controlled release',concentrations:[{label:'6.25 mg CR',mgPerUnit:6.25},{label:'12.5 mg CR',mgPerUnit:12.5}]},
          strip:{label:'Sublingual / Oral spray',concentrations:[{label:'1.75 mg SL (Intermezzo)',mgPerUnit:1.75},{label:'5 mg sublingual (Edluar)',mgPerUnit:5},{label:'10 mg sublingual (Edluar)',mgPerUnit:10}]},
        },
        source:'FDA Prescribing Information — Ambien (Sanofi 2024) · AASM Clinical Practice Guidelines for Insomnia 2024 · DEA Schedule IV.',
        warnings:{child:'Not approved in children — adult use only.',adult:'Schedule IV controlled substance. FDA black box warning: complex sleep behaviors (sleep-driving, sleep-eating, sleep-walking) — discontinue if these occur. Take only when ready for full 7-8 hour sleep. Do not drive next morning if 12.5 mg CR taken. Combining with opioids, alcohol, or other CNS depressants can be fatal. Habit-forming — do not use long-term without physician review.'},
      },

    // ═══════════════════════════════════════════════════
    // VITAMINS & SUPPLEMENTS — alphabetical
    // ═══════════════════════════════════════════════════
  
    coenzymeQ10: {
      name:'CoQ10 (Ubiquinol)', brand:'Various', category:'supplements',
      tags:['migraines','headache'],
      flatDose:{child:{'12+':100},adult:200},
      maxSingleDose:{child:100,adult:300}, maxDailyDose:{child:200,adult:600},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        gelcap:{label:'Softgel / Capsule',concentrations:[{label:'100 mg softgel',mgPerUnit:100},{label:'200 mg softgel',mgPerUnit:200}]},
        tablet:{label:'Tablet',concentrations:[{label:'100 mg tablet',mgPerUnit:100}]},
      },
      source:'NIH NCCIH — CoQ10 (2024) · Hershey AD et al. Headache 2007 (CoQ10 for pediatric migraine).',
      warnings:{child:'Not well studied under 12. Consult a pediatrician.',adult:'Generally safe. May lower blood pressure. May interact with blood thinners and chemotherapy.'},
    },
  
    eveningPrimroseOil: {
      name:'Evening Primrose Oil', brand:'Various', category:'supplements',
      tags:['menstrual_cramps','rashes'],
      flatDose:{child:{'12+':500},adult:1000},
      maxSingleDose:{child:500,adult:1500}, maxDailyDose:{child:1000,adult:3000},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        gelcap:{label:'Softgel / Capsule',concentrations:[{label:'500 mg softgel',mgPerUnit:500},{label:'1000 mg softgel',mgPerUnit:1000}]},
      },
      source:'NIH NCCIH — Evening Primrose Oil (2024) · Khayat S et al. Iran J Nurs Midwifery Res 2015.',
      warnings:{child:'Not recommended under 12.',adult:'May interact with blood thinners. May lower seizure threshold — avoid with epilepsy medications.'},
    },
  
    fishOil: {
      name:'Fish Oil (Omega-3)', brand:'Various', category:'supplements',
      pharmClasses:['antiplatelet'],
      tags:['joint_pain','anxiety','migraines'],
      flatDose:{child:{'4-12':500,'12+':1000},adult:2000},
      maxSingleDose:{child:1000,adult:3000}, maxDailyDose:{child:2000,adult:5000},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:4},
      formats:{
        gelcap:{label:'Softgel / Capsule',concentrations:[{label:'500 mg EPA+DHA softgel',mgPerUnit:500},{label:'1000 mg EPA+DHA softgel',mgPerUnit:1000}]},
        liquid:{label:'Liquid oil',concentrations:[{label:'1500 mg EPA+DHA per tsp',mgPerUnit:1500,unitML:5}]},
      },
      source:'NIH ODS — Omega-3 Fatty Acids Fact Sheet (2024) · American Heart Association guidelines.',
      warnings:{child:'Generally safe. May cause fishy aftertaste or burping.',adult:'High doses may increase bleeding risk. May lower blood pressure. Take with meals to reduce fishy aftertaste.'},
    },
  
    folicAcid: {
      name:'Folic Acid (Vitamin B9)', brand:'Various', category:'supplements',
      tags:['menstrual_cramps'],
      flatDose:{child:{'1-3':150,'4-8':200,'9-13':300,'14+':400},adult:400},
      maxSingleDose:{child:400,adult:800}, maxDailyDose:{child:400,adult:1000},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:1},
      formats:{
        tablet:{label:'Tablet',concentrations:[{label:'400 mcg tablet',mgPerUnit:400},{label:'800 mcg tablet',mgPerUnit:800}]},
        liquid:{label:'Liquid drops',concentrations:[{label:'200 mcg per mL',mgPerUnit:200,unitML:1}]},
      },
      source:'NIH ODS — Folate Fact Sheet (2024) · USPSTF Recommendation: Folic Acid supplementation.',
      warnings:{child:'Generally safe at recommended amounts.',adult:'High doses may mask vitamin B12 deficiency. Recommended 400-800 mcg/day for women of childbearing age.'},
    },
  
    iron: {
      name:'Iron (Ferrous Sulfate)', brand:'Slow Fe / Various', category:'supplements',
      pharmClasses:['absorption_blocker_mineral'],
      tags:['growing_pains'],
      mgPerKg:3, maxSingleDose:{child:60,adult:65}, maxDailyDoseMgPerKg:6, maxDailyDose:{adult:195},
      intervalHours:8, maxDosesPerDay:3, minAge:{months:6},
      formats:{
        liquid:{label:'Liquid drops / Syrup',concentrations:[{label:'15 mg/1.5 mL (infant drops)',mgPerUnit:15,unitML:1.5},{label:'15 mg/5 mL (children syrup)',mgPerUnit:15,unitML:5}]},
        tablet:{label:'Tablet',concentrations:[{label:'65 mg elemental iron (ferrous sulfate 325 mg)',mgPerUnit:65}]},
      },
      source:'NIH ODS — Iron Fact Sheet (2024) · AAP Clinical Report: Diagnosis and Prevention of Iron Deficiency 2024.',
      warnings:{child:'Iron overdose is the leading cause of pediatric poisoning deaths — keep locked away. Take with vitamin C to improve absorption.',adult:'Take on empty stomach if tolerated. May cause constipation or dark stools. Take with vitamin C to improve absorption.'},
    },
  
    lTheanine: {
      name:'L-Theanine', brand:'Various', category:'supplements',
      tags:['anxiety','insomnia'],
      flatDose:{child:{'6-12':50,'12+':100},adult:200},
      maxSingleDose:{child:100,adult:400}, maxDailyDose:{child:200,adult:800},
      intervalHours:8, maxDosesPerDay:2, minAge:{years:6},
      formats:{
        tablet:{label:'Tablet / Capsule',concentrations:[{label:'50 mg capsule',mgPerUnit:50},{label:'100 mg capsule',mgPerUnit:100},{label:'200 mg capsule',mgPerUnit:200}]},
      },
      source:'NIH NCCIH — L-Theanine (2024) · Lyon MR et al. Altern Med Rev 2011 · Hidese S et al. Nutrients 2019.',
      warnings:{child:'Limited safety data in young children. Consult a pediatrician.',adult:'Generally safe. May enhance effects of sedatives. Take with or without food.'},
    },
  
    magnesium: {
      name:'Magnesium (Glycinate / Citrate)', brand:'Various', category:'supplements',
      tags:['insomnia','anxiety','headache','migraines','muscle_pain','growing_pains','constipation','menstrual_cramps','tension_headaches'],
      flatDose:{child:{'1-3':80,'4-8':130,'9-13':240,'14+':360},adult:400},
      maxSingleDose:{child:240,adult:400}, maxDailyDose:{child:240,adult:420},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:1},
      formats:{
        tablet:{label:'Tablet / Capsule',concentrations:[{label:'100 mg tablet',mgPerUnit:100},{label:'200 mg tablet',mgPerUnit:200},{label:'400 mg tablet',mgPerUnit:400}]},
        liquid:{label:'Liquid citrate',concentrations:[{label:'290 mg/5 mL citrate liquid',mgPerUnit:290,unitML:5}]},
        gelcap:{label:'Softgel (Glycinate)',concentrations:[{label:'200 mg glycinate softgel',mgPerUnit:200},{label:'400 mg glycinate softgel',mgPerUnit:400}]},
      },
      source:'NIH ODS — Magnesium Fact Sheet (2024) · Institute of Medicine Dietary Reference Intakes.',
      warnings:{child:'Do not exceed RDA for age. High doses may cause diarrhea.',adult:'Max 420 mg/day from supplements. High doses may cause diarrhea, nausea, or cramping.'},
    },
  
    melatonin: {
      name:'Melatonin', brand:'Various', category:'supplements',
      pharmClasses:['cns_depressant'],
      tags:['insomnia'],
      flatDose:{child:{'3-5':0.5,'6-12':1,'12+':2.5},adult:5},
      maxSingleDose:{child:3,adult:10}, maxDailyDose:{child:3,adult:10},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:3},
      formats:{
        tablet:{label:'Tablet',concentrations:[{label:'0.5 mg',mgPerUnit:0.5},{label:'1 mg',mgPerUnit:1},{label:'2.5 mg',mgPerUnit:2.5},{label:'5 mg',mgPerUnit:5},{label:'10 mg',mgPerUnit:10}]},
        liquid:{label:'Liquid drops',concentrations:[{label:'1 mg/mL drops',mgPerUnit:1,unitML:1}]},
        strip:{label:'Dissolvable strip',concentrations:[{label:'2.5 mg strip',mgPerUnit:2.5},{label:'5 mg strip',mgPerUnit:5}]},
      },
      source:'NIH ODS — Melatonin Fact Sheet (2024) · American Academy of Sleep Medicine guidelines.',
      warnings:{child:'Not under 3. Start with lowest effective dose. Short-term use only. Consult a pediatrician.',adult:'Take 30-60 min before bedtime. Start with lowest dose.'},
    },
  
    nac: {
      name:'NAC (N-Acetyl Cysteine)', brand:'Various', category:'supplements',
      tags:['sinus_congestion','cold_flu','anxiety'],
      flatDose:{child:{'12+':300},adult:600},
      maxSingleDose:{child:300,adult:1200}, maxDailyDose:{child:600,adult:1800},
      intervalHours:8, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'300 mg capsule',mgPerUnit:300},{label:'600 mg capsule',mgPerUnit:600}]},
      },
      source:'NIH NCCIH — NAC (2024) · Millea PJ. Am Fam Physician 2009.',
      warnings:{child:'Not well studied under 12. Consult a pediatrician.',adult:'May interact with nitroglycerin and blood thinners. High doses may cause nausea.'},
    },
  
    probiotics: {
      name:'Probiotics', brand:'Various', category:'supplements',
      tags:['diarrhea','bloating','upset_stomach'],
      flatDose:{child:{'0+':5},adult:10},
      maxSingleDose:{child:10,adult:20}, maxDailyDose:{child:10,adult:20},
      intervalHours:24, maxDosesPerDay:1, minAge:{months:0},
      formats:{
        liquid:{label:'Liquid / Drops',concentrations:[{label:'5 billion CFU per 5 drops',mgPerUnit:5,unitML:0.5}]},
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'5 billion CFU',mgPerUnit:5},{label:'10 billion CFU',mgPerUnit:10},{label:'50 billion CFU',mgPerUnit:50}]},
      },
      source:'NIH NCCIH — Probiotics (2024) · Cochrane Review: Probiotics for acute infectious diarrhea.',
      warnings:{child:'Generally safe. Consult a pediatrician before use in premature infants or immunocompromised children.',adult:'Generally safe. Consult a doctor if immunocompromised.'},
    },
  
    quercetin: {
      name:'Quercetin', brand:'Various', category:'supplements',
      tags:['allergies','joint_pain'],
      flatDose:{child:{'12+':250},adult:500},
      maxSingleDose:{child:250,adult:1000}, maxDailyDose:{child:500,adult:2000},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'250 mg capsule',mgPerUnit:250},{label:'500 mg capsule',mgPerUnit:500}]},
      },
      source:'NIH NCCIH — Quercetin (2024) · Mlcek J et al. Molecules 2016.',
      warnings:{child:'Not well studied under 12. Consult a pediatrician.',adult:'Generally safe. May interact with certain antibiotics and blood thinners. Take with food.'},
    },
  
    vitaminB6: {
      name:'Vitamin B6 (Pyridoxine)', brand:'Various', category:'supplements',
      tags:['nausea','anxiety','menstrual_cramps'],
      flatDose:{child:{'1-3':5,'4-8':6,'9-13':8,'14+':25},adult:25},
      maxSingleDose:{child:25,adult:100}, maxDailyDose:{child:50,adult:200},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:1},
      formats:{
        tablet:{label:'Tablet / Capsule',concentrations:[{label:'10 mg tablet',mgPerUnit:10},{label:'25 mg tablet',mgPerUnit:25},{label:'50 mg tablet',mgPerUnit:50},{label:'100 mg tablet',mgPerUnit:100}]},
      },
      source:'NIH ODS — Vitamin B6 Fact Sheet (2024) · ACOG Committee Opinion: B6 for nausea of pregnancy.',
      warnings:{child:'Do not exceed tolerable upper intake for age.',adult:'Long-term doses above 100 mg/day may cause peripheral neuropathy. Use lowest effective dose.'},
    },
  
    vitaminB12: {
      name:'Vitamin B12 (Cobalamin)', brand:'Various', category:'supplements',
      tags:['anxiety','cold_flu'],
      flatDose:{child:{'1-3':0.9,'4-8':1.2,'9-13':1.8,'14+':2.4},adult:1000},
      maxSingleDose:{child:500,adult:2000}, maxDailyDose:{child:1000,adult:2000},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:1},
      formats:{
        tablet:{label:'Tablet / Sublingual',concentrations:[{label:'500 mcg sublingual',mgPerUnit:500},{label:'1000 mcg sublingual',mgPerUnit:1000}]},
        liquid:{label:'Liquid drops',concentrations:[{label:'1000 mcg/mL drops',mgPerUnit:1000,unitML:1}]},
      },
      source:'NIH ODS — Vitamin B12 Fact Sheet (2024) · Institute of Medicine Dietary Reference Intakes.',
      warnings:{child:'Generally safe at recommended amounts.',adult:'Generally safe at high doses — excess is excreted in urine. Sublingual preferred for absorption issues.'},
    },
  
    vitaminC: {
      name:'Vitamin C (Ascorbic Acid)', brand:'Various', category:'supplements',
      tags:['cold_flu','minor_cuts'],
      flatDose:{child:{'1-3':15,'4-8':25,'9-13':45,'14+':65},adult:500},
      maxSingleDose:{child:500,adult:1000}, maxDailyDose:{child:500,adult:2000},
      intervalHours:24, maxDosesPerDay:2, minAge:{years:1},
      formats:{
        chewable:{label:'Chewable tablet',concentrations:[{label:'250 mg chewable',mgPerUnit:250},{label:'500 mg chewable',mgPerUnit:500}]},
        tablet:{label:'Standard tablet',concentrations:[{label:'500 mg tablet',mgPerUnit:500},{label:'1000 mg tablet',mgPerUnit:1000}]},
        liquid:{label:'Liquid drops',concentrations:[{label:'35 mg/mL infant drops',mgPerUnit:35,unitML:1}]},
      },
      source:'NIH ODS — Vitamin C Fact Sheet (2024) · Institute of Medicine Dietary Reference Intakes.',
      warnings:{child:'Do not exceed tolerable upper intake for age. High doses may cause diarrhea.',adult:'Max 2,000 mg/day. High doses may increase kidney stone risk.'},
    },
  
    vitaminD: {
      name:'Vitamin D3 (Cholecalciferol)', brand:'Various', category:'supplements',
      tags:['cold_flu'],
      flatDose:{child:{'0-12m':400,'1-12':600,'12+':1000},adult:2000},
      maxSingleDose:{child:1000,adult:4000}, maxDailyDose:{child:2500,adult:4000},
      intervalHours:24, maxDosesPerDay:1, minAge:{months:0},
      formats:{
        liquid:{label:'Liquid drops',concentrations:[{label:'400 IU per drop',mgPerUnit:400,unitML:0.03},{label:'1000 IU per mL',mgPerUnit:1000,unitML:1}]},
        tablet:{label:'Tablet / Capsule',concentrations:[{label:'1000 IU',mgPerUnit:1000},{label:'2000 IU',mgPerUnit:2000},{label:'5000 IU',mgPerUnit:5000}]},
        gelcap:{label:'Softgel',concentrations:[{label:'1000 IU softgel',mgPerUnit:1000},{label:'2000 IU softgel',mgPerUnit:2000}]},
      },
      source:'NIH ODS — Vitamin D Fact Sheet (2024) · Endocrine Society Clinical Practice Guideline 2024.',
      warnings:{child:'Infants: 400 IU/day recommended. Do not exceed upper limits without lab testing.',adult:'Max 4,000 IU/day without physician guidance and blood level monitoring.'},
    },
  
    vitaminE: {
      name:'Vitamin E (Tocopherol)', brand:'Various', category:'supplements',
      pharmClasses:['antiplatelet'],
      tags:['burns','rashes','minor_cuts'],
      flatDose:{child:{'1-3':6,'4-8':7,'9-13':11,'14+':15},adult:400},
      maxSingleDose:{child:200,adult:1000}, maxDailyDose:{child:300,adult:1000},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:1},
      formats:{
        gelcap:{label:'Softgel / Capsule',concentrations:[{label:'200 IU softgel',mgPerUnit:200},{label:'400 IU softgel',mgPerUnit:400},{label:'1000 IU softgel',mgPerUnit:1000}]},
        liquid:{label:'Liquid / Oil (topical)',concentrations:[{label:'Vitamin E oil (topical application)',mgPerUnit:1,unitML:1}]},
      },
      source:'NIH ODS — Vitamin E Fact Sheet (2024) · Institute of Medicine Dietary Reference Intakes.',
      warnings:{child:'Do not exceed tolerable upper intake for age.',adult:'High doses may increase bleeding risk with blood thinners. Max 1,000 mg/day.'},
    },
  
    zinc: {
      name:'Zinc', brand:'Various', category:'supplements',
      tags:['cold_flu','minor_cuts','diaper_rash'],
      flatDose:{child:{'1-3':3,'4-8':5,'9-13':8,'14+':9},adult:15},
      maxSingleDose:{child:10,adult:40}, maxDailyDose:{child:10,adult:40},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:1},
      formats:{
        tablet:{label:'Tablet / Lozenge',concentrations:[{label:'5 mg tablet',mgPerUnit:5},{label:'10 mg lozenge',mgPerUnit:10},{label:'15 mg tablet',mgPerUnit:15}]},
        liquid:{label:'Liquid drops',concentrations:[{label:'5 mg/mL drops',mgPerUnit:5,unitML:1}]},
      },
      source:'NIH ODS — Zinc Fact Sheet (2024) · Cochrane Review: Zinc for the common cold (2024).',
      warnings:{child:'Do not exceed tolerable upper intake for age. Long-term high doses may interfere with copper absorption.',adult:'Max 40 mg/day long-term. Take with food to reduce nausea.'},
    },
  
    // ═══════════════════════════════════════════════════
    // HERBAL REMEDIES — alphabetical
    // ═══════════════════════════════════════════════════
  
    arnica: {
      name:'Arnica (Topical)', brand:'Arnicare / Various', category:'herbal',
      tags:['muscle_pain','back_pain','joint_pain'],
      flatDose:{child:{'2+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:2},
      formats:{
        liquid:{label:'Cream / Gel (thin layer)',concentrations:[{label:'Arnica montana 1x gel',mgPerUnit:1},{label:'Arnica montana 30C cream (homeopathic)',mgPerUnit:1}]},
      },
      source:'NIH NCCIH — Arnica (2024) · EMA Community Herbal Monograph on Arnica montana.',
      warnings:{child:'Topical use only — never for internal use. Do not apply to broken skin or open wounds.',adult:'Topical only. Do not ingest. Avoid on broken skin. May cause contact dermatitis.'},
    },
  
    ashwagandha: {
      name:'Ashwagandha (KSM-66)', brand:'Various', category:'herbal',
      tags:['anxiety','insomnia'],
      flatDose:{child:{'12+':150},adult:300},
      maxSingleDose:{child:150,adult:600}, maxDailyDose:{child:300,adult:1200},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'150 mg capsule',mgPerUnit:150},{label:'300 mg capsule',mgPerUnit:300},{label:'600 mg capsule',mgPerUnit:600}]},
      },
      source:'NIH NCCIH — Ashwagandha (2024) · Chandrasekhar K et al. Indian J Psychol Med 2012.',
      warnings:{child:'Not under 12.',adult:'Avoid in pregnancy. May interact with thyroid medications and immunosuppressants.'},
    },
  
    blackCohosh: {
      name:'Black Cohosh', brand:'Remifemin / Various', category:'herbal',
      tags:['menstrual_cramps'],
      flatDose:{child:{},adult:20},
      maxSingleDose:{adult:40}, maxDailyDose:{adult:80},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:18},
      formats:{
        tablet:{label:'Tablet / Capsule',concentrations:[{label:'20 mg standardized extract tablet',mgPerUnit:20}]},
      },
      source:'NIH NCCIH — Black Cohosh (2024) · EMA Community Herbal Monograph on Actaea racemosa.',
      warnings:{child:'Not for anyone under 18.',adult:'Do not use in pregnancy. Avoid with liver disease. Limit use to 6 months.'},
    },
  
    calendula: {
      name:'Calendula (Topical)', brand:'Various', category:'herbal',
      tags:['diaper_rash','rashes','minor_cuts','burns'],
      flatDose:{child:{'0+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{months:0},
      formats:{
        liquid:{label:'Cream / Salve (thin layer)',concentrations:[{label:'Calendula officinalis cream 5%',mgPerUnit:5},{label:'Calendula salve',mgPerUnit:1}]},
      },
      source:'NIH NCCIH — Calendula (2024) · EMA Community Herbal Monograph on Calendula officinalis.',
      warnings:{child:'Generally safe for all ages topically. Avoid with ragweed allergy.',adult:'Topical use well-tolerated. Avoid if allergic to daisies, ragweed, or chrysanthemums.'},
    },
  
    chamomile: {
      name:'Chamomile', brand:'Various', category:'herbal',
      tags:['colic','insomnia','anxiety','upset_stomach','teething_pain','nausea'],
      flatDose:{child:{'0+':1,'2-12':2,'12+':3},adult:3},
      maxSingleDose:{child:3,adult:4}, maxDailyDose:{child:9,adult:12},
      intervalHours:8, maxDosesPerDay:3, minAge:{months:0},
      formats:{
        liquid:{label:'Tea',concentrations:[{label:'1 tsp flowers / 8 oz water (weak)',mgPerUnit:1,unitML:240},{label:'2 tsp flowers / 8 oz water (standard)',mgPerUnit:2,unitML:240}]},
      },
      source:'NIH NCCIH — Chamomile (2024) · EMA Community Herbal Monograph on Matricaria recutita.',
      warnings:{child:'Avoid under 6 months without pediatrician guidance. Avoid if ragweed allergy.',adult:'Avoid with blood thinners. May cause allergic reaction with ragweed or daisy allergies.'},
    },
  
    cranberry: {
      name:'Cranberry', brand:'AZO / Various', category:'herbal',
      tags:['upset_stomach'],
      flatDose:{child:{'12+':300},adult:500},
      maxSingleDose:{child:300,adult:500}, maxDailyDose:{child:600,adult:1500},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'300 mg capsule',mgPerUnit:300},{label:'500 mg capsule',mgPerUnit:500}]},
        liquid:{label:'Juice (unsweetened)',concentrations:[{label:'8 oz unsweetened cranberry juice',mgPerUnit:300,unitML:240}]},
      },
      source:'NIH NCCIH — Cranberry (2024) · Jepson RG, Craig JC. Cochrane Review 2023.',
      warnings:{child:'Not under 12 for supplement doses.',adult:'May interact with blood thinners (warfarin). High doses may increase kidney stone risk.'},
    },
  
    echinacea: {
      name:'Echinacea', brand:'Various', category:'herbal',
      tags:['cold_flu','sore_throat'],
      flatDose:{child:{'2-12':300,'12+':500},adult:1000},
      maxSingleDose:{child:300,adult:1000}, maxDailyDose:{child:900,adult:3000},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Tincture / Tea',concentrations:[{label:'300 mg/mL tincture',mgPerUnit:300,unitML:1}]},
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'300 mg capsule',mgPerUnit:300},{label:'500 mg capsule',mgPerUnit:500}]},
      },
      source:'NIH NCCIH — Echinacea (2024) · Karsch-Volk M et al. Cochrane Review 2015.',
      warnings:{child:'Not under 2. Max 10 consecutive days.',adult:'Avoid with autoimmune conditions. Max 8 continuous weeks.'},
    },
  
    elderberry: {
      name:'Elderberry (Sambucus nigra)', brand:'Sambucol / Various', category:'herbal',
      tags:['cold_flu','fever'],
      flatDose:{child:{'1-3':5,'4-12':10,'12+':15},adult:15},
      maxSingleDose:{child:10,adult:15}, maxDailyDose:{child:40,adult:60},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:1},
      formats:{
        liquid:{label:'Syrup',concentrations:[{label:'500 mg/5 mL syrup',mgPerUnit:500,unitML:5}]},
        tablet:{label:'Gummy / Capsule',concentrations:[{label:"50 mg gummy (children's)",mgPerUnit:50},{label:'200 mg capsule',mgPerUnit:200}]},
      },
      source:'NIH NCCIH — Elderberry (2024) · Zakay-Rones Z et al. J Int Med Res 2004.',
      warnings:{child:'Raw elderberries are toxic — prepared supplements only. Not under 1 year.',adult:'Avoid with autoimmune conditions or immunosuppressant medications.'},
    },
  
    fennel: {
      name:'Fennel Seed', brand:'Various', category:'herbal',
      tags:['colic','bloating','upset_stomach'],
      flatDose:{child:{'0+':1,'2+':2},adult:3},
      maxSingleDose:{child:2,adult:3}, maxDailyDose:{child:6,adult:9},
      intervalHours:8, maxDosesPerDay:3, minAge:{months:0},
      formats:{
        liquid:{label:'Tea / Gripe water',concentrations:[{label:'1 tsp seeds / 8 oz water (tea)',mgPerUnit:1,unitML:240},{label:'Gripe water formulation',mgPerUnit:1,unitML:5}]},
      },
      source:'NIH NCCIH — Fennel (2024) · Alexandrovich I et al. Altern Ther Health Med 2003.',
      warnings:{child:'Diluted fennel tea generally safe for infants. Avoid fennel oil concentrate in infants.',adult:'Generally safe at food/tea amounts. High doses may have estrogen-like effects.'},
    },
  
    feverfew: {
      name:'Feverfew', brand:'Various', category:'herbal',
      pharmClasses:['antiplatelet'],
      tags:['migraines','headache'],
      flatDose:{child:{'12+':50},adult:100},
      maxSingleDose:{child:50,adult:150}, maxDailyDose:{child:100,adult:300},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:12},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'50 mg capsule (0.2% parthenolide)',mgPerUnit:50},{label:'100 mg capsule',mgPerUnit:100}]},
      },
      source:'NIH NCCIH — Feverfew (2024) · EMA Community Herbal Monograph on Tanacetum parthenium.',
      warnings:{child:'Not under 12.',adult:'Do not stop abruptly — may cause rebound headache. Avoid in pregnancy. May interact with blood thinners.'},
    },
  
    garlic: {
      name:'Garlic (Allium sativum)', brand:'Kyolic / Various', category:'herbal',
      pharmClasses:['antiplatelet'],
      tags:['cold_flu','ear_pain','sinus_congestion'],
      flatDose:{child:{'2+':200},adult:600},
      maxSingleDose:{child:200,adult:1200}, maxDailyDose:{child:600,adult:2400},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'200 mg capsule',mgPerUnit:200},{label:'600 mg capsule',mgPerUnit:600}]},
        liquid:{label:'Aged garlic extract',concentrations:[{label:'300 mg/mL extract',mgPerUnit:300,unitML:1}]},
      },
      source:'NIH NCCIH — Garlic (2024) · EMA Community Herbal Monograph on Allium sativum.',
      warnings:{child:'Culinary amounts safe. Supplement doses not well studied in young children.',adult:'May interact with blood thinners and HIV medications. Discontinue 2 weeks before surgery.'},
    },
  
    ginger: {
      name:'Ginger Root (Zingiber officinale)', brand:'Various', category:'herbal',
      pharmClasses:['antiplatelet'],
      tags:['nausea','bloating','upset_stomach','heartburn','cold_flu'],
      flatDose:{child:{'2-12':250,'12+':500},adult:1000},
      maxSingleDose:{child:500,adult:1000}, maxDailyDose:{child:1000,adult:4000},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:2},
      formats:{
        liquid:{label:'Tea / Tincture',concentrations:[{label:'250 mg/cup (tea)',mgPerUnit:250,unitML:240},{label:'500 mg/mL tincture 1:1',mgPerUnit:500,unitML:1}]},
        tablet:{label:'Capsule',concentrations:[{label:'250 mg capsule',mgPerUnit:250},{label:'500 mg capsule',mgPerUnit:500},{label:'1000 mg capsule',mgPerUnit:1000}]},
      },
      source:'NIH NCCIH — Ginger (2024) · EMA Community Herbal Monograph on Zingiber officinale.',
      warnings:{child:'Generally safe over 2. Consult pediatrician for young children.',adult:'May interact with blood thinners. Max 4 g/day in pregnancy.'},
    },
  
    ginkgoBiloba: {
      name:'Ginkgo Biloba', brand:'Various', category:'herbal',
      pharmClasses:['antiplatelet'],
      tags:['headache','anxiety'],
      flatDose:{child:{},adult:120},
      maxSingleDose:{adult:240}, maxDailyDose:{adult:480},
      intervalHours:12, maxDosesPerDay:2, minAge:{years:18},
      formats:{
        tablet:{label:'Tablet / Capsule',concentrations:[{label:'60 mg standardized extract',mgPerUnit:60},{label:'120 mg standardized extract',mgPerUnit:120}]},
      },
      source:'NIH NCCIH — Ginkgo (2024) · EMA Assessment Report on Ginkgo biloba.',
      warnings:{child:'Not for anyone under 18.',adult:'May increase bleeding risk — avoid with blood thinners. Raw ginkgo seeds are toxic. Discontinue 2 weeks before surgery.'},
    },
  
    honey: {
      name:'Honey (Raw / Manuka)', brand:'Various', category:'herbal',
      tags:['sore_throat','cold_flu','minor_cuts','burns'],
      flatDose:{child:{'1-5':2.5,'6-11':5,'12+':10},adult:15},
      maxSingleDose:{child:5,adult:15}, maxDailyDose:{child:20,adult:60},
      intervalHours:4, maxDosesPerDay:4, minAge:{years:1},
      formats:{
        liquid:{label:'Raw / Manuka honey',concentrations:[{label:'1 tsp (5 mL)',mgPerUnit:5,unitML:5},{label:'1 tbsp (15 mL)',mgPerUnit:15,unitML:15}]},
      },
      source:'NIH NCCIH — Honey (2024) · Paul IM et al. Arch Pediatr Adolesc Med 2007.',
      warnings:{child:'NEVER give to infants under 12 months — risk of infant botulism. Safe for 1 year and older.',adult:'Safe for adults. Monitor blood sugar if diabetic.'},
    },
  
    licorice: {
      name:'Licorice Root (DGL)', brand:'Various', category:'herbal',
      tags:['sore_throat','heartburn','upset_stomach'],
      flatDose:{child:{'12+':380},adult:760},
      maxSingleDose:{child:380,adult:760}, maxDailyDose:{child:760,adult:1520},
      intervalHours:8, maxDosesPerDay:2, minAge:{years:12},
      formats:{
        chewable:{label:'Chewable DGL tablet',concentrations:[{label:'380 mg DGL chewable',mgPerUnit:380},{label:'760 mg DGL chewable',mgPerUnit:760}]},
      },
      source:'NIH NCCIH — Licorice Root (2024) · EMA Community Herbal Monograph on Glycyrrhiza glabra.',
      warnings:{child:'Not under 12. Use DGL (deglycyrrhizinated) form to avoid blood pressure effects.',adult:'Use DGL form for GI use. Regular licorice root can raise blood pressure. Avoid with heart/kidney/liver disease.'},
    },
  
    milkThistle: {
      name:'Milk Thistle (Silymarin)', brand:'Various', category:'herbal',
      tags:['upset_stomach','heartburn'],
      flatDose:{child:{'12+':140},adult:140},
      maxSingleDose:{child:140,adult:420}, maxDailyDose:{child:280,adult:420},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:12},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'140 mg silymarin capsule',mgPerUnit:140}]},
      },
      source:'NIH NCCIH — Milk Thistle (2024) · EMA Community Herbal Monograph on Silybum marianum.',
      warnings:{child:'Not under 12 without physician guidance.',adult:'Generally well tolerated. May have mild laxative effect. Avoid if allergic to ragweed.'},
    },
  
    mullein: {
      name:'Mullein Leaf', brand:'Various', category:'herbal',
      tags:['sore_throat','cold_flu','ear_pain'],
      flatDose:{child:{'2-12':250,'12+':500},adult:1000},
      maxSingleDose:{child:250,adult:1000}, maxDailyDose:{child:750,adult:3000},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Tea / Tincture / Ear drops',concentrations:[{label:'250 mg/cup (tea)',mgPerUnit:250,unitML:240},{label:'Mullein ear drops (2-3 drops per ear)',mgPerUnit:2,unitML:0.1}]},
        tablet:{label:'Capsule',concentrations:[{label:'500 mg capsule',mgPerUnit:500}]},
      },
      source:'NIH NCCIH — Mullein (2024) · Sarrell EM et al. Arch Pediatr Adolesc Med 2001.',
      warnings:{child:'Tea or ear drops generally safe over 2. Strain tea well to remove leaf hairs.',adult:'Generally well tolerated. Strain tea carefully. Ear drops: do not use if eardrum is perforated.'},
    },
  
    passionflower: {
      name:'Passionflower (Passiflora)', brand:'Various', category:'herbal',
      pharmClasses:['cns_depressant'],
      tags:['anxiety','insomnia'],
      flatDose:{child:{'6-12':65,'12+':130},adult:300},
      maxSingleDose:{child:130,adult:300}, maxDailyDose:{child:260,adult:900},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Tea / Tincture',concentrations:[{label:'1 tsp dried herb / 8 oz water (tea)',mgPerUnit:65,unitML:240}]},
        tablet:{label:'Capsule',concentrations:[{label:'300 mg capsule',mgPerUnit:300}]},
      },
      source:'NIH NCCIH — Passionflower (2024) · EMA Community Herbal Monograph on Passiflora incarnata.',
      warnings:{child:'Limited data under 6. Consult a pediatrician.',adult:'May enhance sedatives. Do not drive after use. Avoid in pregnancy.'},
    },
  
    slipperyElm: {
      name:'Slippery Elm', brand:'Various', category:'herbal',
      tags:['sore_throat','heartburn','upset_stomach'],
      flatDose:{child:{'2-12':300,'12+':600},adult:1200},
      maxSingleDose:{child:600,adult:1200}, maxDailyDose:{child:1800,adult:4800},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:2},
      formats:{
        liquid:{label:'Tea / Powder in water',concentrations:[{label:'300 mg/tsp powder in 8 oz water',mgPerUnit:300,unitML:5}]},
        tablet:{label:'Lozenge / Capsule',concentrations:[{label:'400 mg capsule',mgPerUnit:400}]},
      },
      source:'NIH NCCIH — Slippery Elm (2024) · EMA Assessment Report on Ulmus rubra.',
      warnings:{child:'Generally safe for children over 2.',adult:'May slow absorption of other medications — take 1-2 hours apart from other drugs.'},
    },
  
    stJohnsWort: {
      name:"St. John's Wort", brand:'Various', category:'herbal',
      pharmClasses:['serotonergic','cyp_inducer'],
      tags:['anxiety','insomnia'],
      flatDose:{child:{'12+':300},adult:300},
      maxSingleDose:{child:300,adult:600}, maxDailyDose:{child:900,adult:1800},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:12},
      formats:{
        tablet:{label:'Tablet / Capsule',concentrations:[{label:'300 mg tablet (0.3% hypericin)',mgPerUnit:300},{label:'600 mg tablet',mgPerUnit:600}]},
      },
      source:"NIH NCCIH — St. John's Wort (2024) · Linde K et al. Cochrane Review: SJW for depression.",
      warnings:{child:'Not under 12.',adult:'MAJOR INTERACTIONS: significantly reduces effectiveness of birth control, HIV medications, cyclosporine, and warfarin. Causes photosensitivity. Do not combine with antidepressants.'},
    },
  
    turmeric: {
      name:'Turmeric / Curcumin', brand:'Various', category:'herbal',
      pharmClasses:['antiplatelet','liver_metabolized'],
      tags:['joint_pain','back_pain','muscle_pain','headache'],
      flatDose:{child:{'4-12':250,'12+':500},adult:1000},
      maxSingleDose:{child:500,adult:2000}, maxDailyDose:{child:1000,adult:8000},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:4},
      formats:{
        tablet:{label:'Capsule (95% curcumin extract)',concentrations:[{label:'250 mg capsule',mgPerUnit:250},{label:'500 mg capsule',mgPerUnit:500},{label:'1000 mg capsule',mgPerUnit:1000}]},
        liquid:{label:'Golden milk / Paste',concentrations:[{label:'~200 mg/tsp turmeric powder',mgPerUnit:200,unitML:5}]},
      },
      source:'NIH NCCIH — Turmeric (2024) · Hewlings SJ, Kalman DS. Foods 2017.',
      warnings:{child:'Culinary amounts safe. High supplement doses not well studied in children.',adult:'May interact with blood thinners. Take with black pepper (piperine) to improve absorption up to 2000%.'},
    },
  
    valerian: {
      name:'Valerian Root', brand:'Various', category:'herbal',
      pharmClasses:['cns_depressant'],
      tags:['insomnia','anxiety'],
      flatDose:{child:{'3-12':150,'12+':300},adult:600},
      maxSingleDose:{child:300,adult:900}, maxDailyDose:{child:300,adult:900},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:3},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'150 mg capsule',mgPerUnit:150},{label:'300 mg capsule',mgPerUnit:300},{label:'600 mg capsule',mgPerUnit:600}]},
        liquid:{label:'Tincture',concentrations:[{label:'300 mg/mL tincture',mgPerUnit:300,unitML:1}]},
      },
      source:'NIH NCCIH — Valerian (2024) · EMA Community Herbal Monograph on Valeriana officinalis.',
      warnings:{child:'Not under 3. Take 30-60 min before bedtime. Do not combine with sedatives.',adult:'May cause drowsiness. Do not drive. Do not combine with alcohol or sedatives.'},
    },
  
  // ═══════════════════════════════════════════════════
    // ESSENTIAL OILS — alphabetical
    // ═══════════════════════════════════════════════════
  
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

    // ═══════════════════════════════════════════════════
    // HOME REMEDIES — alphabetical
    // ═══════════════════════════════════════════════════
  
    activatedCharcoal: {
      name:'Activated Charcoal', brand:'Various', category:'home',
      tags:['bloating','upset_stomach','diarrhea'],
      flatDose:{child:{'12+':250},adult:500}, maxSingleDose:{child:250,adult:1000}, maxDailyDose:{child:750,adult:2000},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:12},
      formats:{
        tablet:{label:'Capsule / Tablet',concentrations:[{label:'250 mg capsule',mgPerUnit:250},{label:'500 mg capsule',mgPerUnit:500}]},
        liquid:{label:'Powder in water',concentrations:[{label:'500 mg / 8 oz water',mgPerUnit:500,unitML:240}]},
      },
      source:'NIH NCCIH — Activated Charcoal (2024) · American Academy of Clinical Toxicology position statement.',
      warnings:{child:'Not under 12 for self-care. Not a substitute for emergency poison treatment — call Poison Control 1-800-222-1222 first.',adult:'Can adsorb other medications — do not take within 2 hours of any other medication. May cause black stools.'},
    },
  
    aloeVera: {
      name:'Aloe Vera (Topical)', brand:'Various', category:'home',
      tags:['burns','diaper_rash','minor_cuts','rashes','insect_bites'],
      flatDose:{child:{'0+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{months:0},
      formats:{
        liquid:{label:'Gel (topical, thin layer)',concentrations:[{label:'Pure aloe vera gel (99-100%)',mgPerUnit:1,unitML:1}]},
      },
      source:'NIH NCCIH — Aloe Vera (2024) · Dat AD et al. Cochrane Review: Aloe vera for treating wounds.',
      warnings:{child:'Topical use generally safe for all ages. Do not use on deep wounds. Avoid ingestion.',adult:'Topical use generally safe. Avoid on deep wounds. Do not ingest aloe latex.'},
    },
  
    appleCiderVinegar: {
      name:'Apple Cider Vinegar', brand:'Bragg / Various', category:'home',
      tags:['heartburn','sore_throat','upset_stomach'],
      flatDose:{child:{'6+':5},adult:15}, maxSingleDose:{child:5,adult:30}, maxDailyDose:{child:15,adult:90},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:6},
      formats:{
        liquid:{label:'Diluted in water (always dilute)',concentrations:[{label:'1 tsp / 8 oz water (mild)',mgPerUnit:5,unitML:5},{label:'1 tbsp / 8 oz water (standard)',mgPerUnit:15,unitML:15}]},
      },
      source:'NIH NCCIH — Apple Cider Vinegar (2024) · Johnston CS et al. J Am Diet Assoc 2004.',
      warnings:{child:'Always dilute — never give undiluted to children. Rinse mouth after use.',adult:'Always dilute before drinking. Can erode tooth enamel. May interact with diuretics and insulin.'},
    },
  
    bakingSoda: {
      name:'Baking Soda (Sodium Bicarbonate)', brand:'Arm & Hammer', category:'home',
      tags:['heartburn','insect_bites','rashes'],
      flatDose:{child:{'6+':1.25},adult:2.5}, maxSingleDose:{child:1.25,adult:2.5}, maxDailyDose:{child:5,adult:10},
      intervalHours:4, maxDosesPerDay:4, minAge:{years:6},
      formats:{
        liquid:{label:'Dissolved in water (oral) or paste (topical)',concentrations:[{label:'1/4 tsp in 4 oz water (oral/rinse)',mgPerUnit:1.25,unitML:120},{label:'1/2 tsp in 4 oz water (oral/rinse)',mgPerUnit:2.5,unitML:120}]},
      },
      source:'FDA OTC Monograph (sodium bicarbonate antacid) · MedlinePlus — Sodium Bicarbonate 2024.',
      warnings:{child:'Not under 6 for oral use without physician guidance. External paste use generally safe.',adult:'Do not use as antacid for more than 2 weeks. Avoid with sodium-restricted diets.'},
    },
  
    castorOil: {
      name:'Castor Oil', brand:'Various', category:'home',
      tags:['constipation','rashes'],
      flatDose:{child:{'2-5':5,'6-12':10,'12+':15},adult:30},
      maxSingleDose:{child:15,adult:30}, maxDailyDose:{child:15,adult:30},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:2},
      formats:{
        liquid:{label:'Oil (oral for constipation / topical for skin)',concentrations:[{label:'1 tsp (5 mL) — children',mgPerUnit:5,unitML:5},{label:'1-2 tbsp (15-30 mL) — adults',mgPerUnit:30,unitML:30}]},
      },
      source:'FDA OTC Monograph (castor oil laxative) · MedlinePlus — Castor Oil 2024.',
      warnings:{child:'Not under 2. Produces bowel movement in 2-6 hours. Do not use if appendicitis suspected.',adult:'Results in 2-6 hours. Do not use during pregnancy (may stimulate labor). Max 1 week use.'},
    },
  
    coconutOil: {
      name:'Coconut Oil (Topical)', brand:'Various', category:'home',
      tags:['diaper_rash','rashes','minor_cuts','burns','insect_bites'],
      flatDose:{child:{'0+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{months:0},
      formats:{
        liquid:{label:'Virgin coconut oil (thin layer)',concentrations:[{label:'Pure virgin coconut oil (topical)',mgPerUnit:1,unitML:1}]},
      },
      source:'NIH NCCIH — Coconut Oil (2024) · Evangelista MT et al. Pediatr Dermatol 2014.',
      warnings:{child:'Generally safe topically for all ages. May clog pores — use sparingly on face.',adult:'Generally safe topically. May cause skin breakouts on acne-prone skin.'},
    },
  
    epsomsalt: {
      name:'Epsom Salt (Magnesium Sulfate)', brand:'Various', category:'home',
      tags:['muscle_pain','back_pain','joint_pain','growing_pains'],
      flatDose:{child:{'6+':1},adult:2}, maxSingleDose:{child:1,adult:2}, maxDailyDose:{child:1,adult:2},
      intervalHours:24, maxDosesPerDay:1, minAge:{years:6},
      formats:{
        liquid:{label:'Bath soak (cups per bath)',concentrations:[{label:'1 cup / standard bath (children)',mgPerUnit:1,unitML:240},{label:'2 cups / standard bath (adult)',mgPerUnit:2,unitML:480}]},
      },
      source:'NIH NCCIH — Magnesium Sulfate (2024).',
      warnings:{child:'Do not use on broken skin. Supervise children in bath. Do not ingest bath water.',adult:'For external use only. Do not ingest bath water.'},
    },
  
    hydrogenPeroxide: {
      name:'Hydrogen Peroxide (Topical)', brand:'Various', category:'home',
      tags:['minor_cuts','dental_pain'],
      flatDose:{child:{'2+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:2,adult:3},
      intervalHours:8, maxDosesPerDay:3, minAge:{years:2},
      formats:{
        liquid:{label:'Topical solution',concentrations:[{label:'1.5% mouthwash solution',mgPerUnit:1.5,unitML:15},{label:'3% topical solution (first aid)',mgPerUnit:3,unitML:10}]},
      },
      source:'FDA OTC Monograph (hydrogen peroxide topical/oral antiseptic) 2024.',
      warnings:{child:'For topical use only. Do not ingest. Avoid eyes. May delay wound healing with repeated use.',adult:'Current evidence suggests saline rinse preferred for wound care. 3% solution may delay healing. Diluted solution safe for mouthwash.'},
    },
  
    oatmealBath: {
      name:'Colloidal Oatmeal Bath', brand:'Aveeno / Various', category:'home',
      tags:['rashes','insect_bites','burns','diaper_rash'],
      flatDose:{child:{'0+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:2,adult:2},
      intervalHours:12, maxDosesPerDay:2, minAge:{months:0},
      formats:{
        liquid:{label:'Bath soak (packets per tub)',concentrations:[{label:'1 packet (infant tub)',mgPerUnit:1,unitML:1},{label:'1-2 packets (standard tub)',mgPerUnit:1,unitML:1}]},
      },
      source:'FDA OTC Monograph (colloidal oatmeal skin protectant) · Lisante TA et al. J Drugs Dermatol 2017.',
      warnings:{child:'Generally safe for all ages. Supervise infants/children. Rinse tub after — slippery.',adult:'Generally safe. Rinse tub after use — tub is slippery with oatmeal residue.'},
    },
  
    salineRinse: {
      name:'Saline Nasal Rinse / Spray', brand:'NeilMed / Simply Saline', category:'home',
      tags:['sinus_congestion','cold_flu','ear_pain'],
      flatDose:{child:{'0+':1},adult:2}, maxSingleDose:{child:1,adult:2}, maxDailyDose:{child:4,adult:6},
      intervalHours:4, maxDosesPerDay:4, minAge:{months:0},
      formats:{
        liquid:{label:'Nasal spray / Rinse',concentrations:[{label:'0.9% isotonic saline spray (1-2 sprays per nostril)',mgPerUnit:0.9,unitML:2},{label:'Neti pot rinse (240 mL isotonic solution)',mgPerUnit:0.9,unitML:240}]},
      },
      source:'AAP Clinical Practice Guideline: Sinusitis (updated 2024) · American Rhinologic Society — Nasal Saline guidelines.',
      warnings:{child:'Safe for all ages. Use infant nasal drops or saline aspirator for babies. Always use distilled or previously boiled water for neti pot.',adult:'Always use distilled, sterile, or previously boiled water for neti pot — tap water can harbor organisms. Clean and dry the device after each use.'},
    },
  
    steamInhalation: {
      name:'Steam Inhalation', brand:'N/A', category:'home',
      tags:['sinus_congestion','cold_flu','sore_throat'],
      flatDose:{child:{'5+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:3,adult:4},
      intervalHours:4, maxDosesPerDay:4, minAge:{years:5},
      formats:{
        liquid:{label:'Steam sessions (minutes per session)',concentrations:[{label:'5-10 min (children 5-12)',mgPerUnit:1,unitML:1},{label:'10-15 min (adults)',mgPerUnit:1,unitML:1}]},
      },
      source:'NIH NCCIH — Steam Inhalation (2024) · Singh M, Singh M. Cochrane Review: Heated, humidified air for the common cold.',
      warnings:{child:'Supervise closely — hot steam can cause serious burns. Use a bowl of hot (not boiling) water. Do not use for children under 5.',adult:'Do not lean too close to boiling water. Use a towel tent cautiously. Consult physician if you have asthma.'},
    },
  
    witchHazel: {
      name:'Witch Hazel (Topical)', brand:'Thayers / T.N. Dickinson', category:'home',
      tags:['insect_bites','rashes','minor_cuts','diaper_rash'],
      flatDose:{child:{'2+':1},adult:1}, maxSingleDose:{child:1,adult:1}, maxDailyDose:{child:4,adult:4},
      intervalHours:6, maxDosesPerDay:4, minAge:{years:2},
      formats:{
        liquid:{label:'Liquid / Toner (applied with cotton pad)',concentrations:[{label:'14% witch hazel liquid',mgPerUnit:14},{label:'50% witch hazel liquid',mgPerUnit:50}]},
      },
      source:'FDA OTC Monograph (witch hazel topical/astringent) · Thayers prescribing info 2024.',
      warnings:{child:'For external use only. Avoid eyes. Not for deep wounds.',adult:'For external use only. Avoid contact with eyes. Not for internal use.'},
    },
  
  };
  
  export const FORMAT_ICONS = {
    liquid:'droplet', liquid2:'droplet', chewable:'circle',
    tablet:'pill', gelcap:'capsule', strip:'file-text',
  };
  