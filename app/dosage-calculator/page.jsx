'use client';

import { useState, useEffect, useMemo } from 'react';
import { MEDS, CATEGORIES } from '@/lib/medsData';
import { createProfile, logDose, getLogs } from '@/lib/supabaseHelpers';
import DoseTrackerBadge from '@/components/DoseTrackerBadge';
import PrescriptionAcknowledgmentModal, { hasAcknowledgedRx } from '@/components/PrescriptionAcknowledgmentModal';
import styles from './DosageCalculator.module.css';

// ─── Helpers ─────────────────────────────────────────────────
function toKg(weight, unit) {
  return unit === 'lbs' ? weight / 2.205 : weight;
}

function calcDoseMg(med, wKg, ageMonths, isChild) {
  const ageYears = ageMonths / 12;
  if (med.mgPerKg) {
    const raw = Math.round(med.mgPerKg * wKg);
    return Math.min(raw, med.maxSingleDose[isChild ? 'child' : 'adult']);
  }
  if (med.flatDose) {
    if (!isChild) return med.flatDose.adult;
    if (ageYears < 1 && med.flatDose.child['0+']) return med.flatDose.child['0+'];
    if (ageYears < 1 && med.flatDose.child['0-12m']) return med.flatDose.child['0-12m'];
    if (ageYears < 2 && med.flatDose.child['0-2']) return med.flatDose.child['0-2'];
    if (ageYears < 2) return 0;
    if (ageYears < 4 && med.flatDose.child['1-3']) return med.flatDose.child['1-3'];
    if (ageYears < 4 && med.flatDose.child['3-5']) return med.flatDose.child['3-5'];
    if (ageYears < 6 && med.flatDose.child['2-5']) return med.flatDose.child['2-5'];
    if (ageYears < 6 && med.flatDose.child['4-8']) return med.flatDose.child['4-8'];
    if (ageYears < 9 && med.flatDose.child['4-8']) return med.flatDose.child['4-8'];
    if (ageYears < 9 && med.flatDose.child['6-8']) return med.flatDose.child['6-8'];
    if (ageYears < 12 && med.flatDose.child['6-11']) return med.flatDose.child['6-11'];
    if (ageYears < 12 && med.flatDose.child['9-13']) return med.flatDose.child['9-13'];
    if (ageYears < 12 && med.flatDose.child['2-12']) return med.flatDose.child['2-12'];
    if (med.flatDose.child['12+']) return med.flatDose.child['12+'];
    if (med.flatDose.child['14+']) return med.flatDose.child['14+'];
    return 0;
  }
  if (med.mgFixed) {
    if (!isChild) return med.mgFixed.adult;
    const f = med.mgFixed.child;
    if (f['6m-23m'] && ageMonths >= 6 && ageMonths < 24) return f['6m-23m'];
    if (f['2-5'] && ageYears >= 2 && ageYears < 6) return f['2-5'];
    if (f['6-11'] && ageYears >= 6 && ageYears < 12) return f['6-11'];
    if (f['6+'] && ageYears >= 6) return f['6+'];
    if (f['12+'] && ageYears >= 12) return f['12+'];
    return f['2-5'] || 0;
  }
  return 0;
}

function physicalAmount(doseMg, conc, splittable = true) {
  if (conc.unitML) {
    const ml = (doseMg / conc.mgPerUnit) * conc.unitML;
    if (ml >= 5) {
      const tsp = ml / 5;
      const tspStr = tsp % 1 === 0 ? tsp.toFixed(0) : tsp.toFixed(1);
      return { display: `${tspStr} tsp (${ml.toFixed(1)} mL)`, units: ml, rounded: false };
    }
    return { display: `${ml.toFixed(1)} mL`, units: ml, rounded: false };
  }

  const rawCount = doseMg / conc.mgPerUnit;

  if (splittable) {
    const halfCount = Math.round(rawCount * 2) / 2;
    if (halfCount === 0) {
      return { display: '0', units: 0, rounded: true, belowMinimum: true };
    }
    const countStr = halfCount % 1 === 0 ? halfCount.toFixed(0) : halfCount.toFixed(1);
    return { display: `${countStr} ${conc.unitLabel || 'unit(s)'}`, units: halfCount, rounded: halfCount !== rawCount };
  } else {
    const wholeCount = Math.round(rawCount);
    if (wholeCount === 0) {
      return { display: '0', units: 0, rounded: true, belowMinimum: true };
    }
    return { display: `${wholeCount} ${conc.unitLabel || 'unit(s)'}`, units: wholeCount, rounded: wholeCount !== rawCount };
  }
}

// ─── Step Chip ─────────────────────────────────────────────────
function StepChip({ num, label, value, onEdit, isActive }) {
  return (
    <button
      type="button"
      className={`${styles.stepChip} ${isActive ? styles.stepChipActive : ''}`}
      onClick={onEdit}
    >
      <div className={styles.stepChipNum}>{num}</div>
      <div className={styles.stepChipBody}>
        <div className={styles.stepChipLabel}>{label}</div>
        <div className={styles.stepChipValue}>{value}</div>
      </div>
      {!isActive && <div className={styles.stepChipEdit}>Edit</div>}
    </button>
  );
}

// ─── Step Header ───────────────────────────────────────────────
function StepHeader({ num, label, sub }) {
  return (
    <div className={styles.stepHeader}>
      <div className={styles.stepNum}>{num}</div>
      <div>
        <div className={styles.stepLabel}>{label}</div>
        {sub && <div className={styles.stepSub}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── Option Button ─────────────────────────────────────────────
function OptionButton({ selected, onClick, title, sub }) {
  return (
    <button
      type="button"
      className={`${styles.optBtn} ${selected ? styles.optBtnSelected : ''}`}
      onClick={onClick}
    >
      <span className={styles.optTitle}>{title}</span>
      {sub && <span className={styles.optSub}>{sub}</span>}
    </button>
  );
}

// ─── Medication Picker ─────────────────────────────────────────
function MedPicker({ value, onChange, isChild, onRxTabRequested }) {
  const firstCat = Object.keys(CATEGORIES)[0];
  const [activeCat, setActiveCat] = useState(firstCat);
  const [search, setSearch] = useState('');

  function handleCatClick(catKey) {
    if (catKey === 'prescription' && !hasAcknowledgedRx()) {
      onRxTabRequested(() => setActiveCat('prescription'));
      return;
    }
    setActiveCat(catKey);
  }

  const filtered = useMemo(() => {
    if (search.trim().length > 1) {
      return Object.entries(MEDS)
        .filter(([, m]) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.brand.toLowerCase().includes(search.toLowerCase())
        )
        .sort(([, a], [, b]) => a.name.localeCompare(b.name));
    }
    return Object.entries(MEDS)
      .filter(([, m]) => m.category === activeCat)
      .sort(([, a], [, b]) => a.name.localeCompare(b.name));
  }, [search, activeCat]);

  return (
    <div className={styles.dosagePicker}>
      <input
        type="text"
        placeholder="Search by name or brand…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.dosageSearchInput}
      />

      {search.trim().length < 2 && (
        <div className={styles.dosageCatTabs}>
          {Object.entries(CATEGORIES).map(([k, v]) => (
            <button
              key={k}
              type="button"
              className={`${styles.dosageCatTab} ${activeCat === k ? styles.dosageCatTabActive : ''}`}
              onClick={() => handleCatClick(k)}
            >
              {v.icon} {v.label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.dosageMedList}>
        {filtered.length === 0 && (
          <div className={styles.dosageEmptyMsg}>No medications found.</div>
        )}
        {filtered.map(([key, m]) => (
          <button
            key={key}
            type="button"
            className={`${styles.dosageMedOption} ${value === key ? styles.dosageMedOptionActive : ''}`}
            onClick={() => onChange(key)}
          >
            <div className={styles.dosageMedOptionMain}>
              <span className={styles.dosageMedOptionName}>{m.name}</span>
              <span className={styles.dosageMedOptionBrand}>{CATEGORIES[m.category]?.icon} {m.brand}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Individualized Result Card ────────────────────────────────
function IndividualizedResultCard({ med, medKey, onCalculateAnother, onStartOver }) {
  const isControlled = !!med.controlled;

  return (
    <div className={styles.resultCardIndividualized}>
      <div className={styles.individualizedHeader}>
        <span className={styles.individualizedIcon}>⚕️</span>
        <div>
          <div className={styles.individualizedTitle}>Prescription-individualized</div>
          <div className={styles.individualizedSubtitle}>Dose set by your prescriber</div>
        </div>
      </div>

      <p className={styles.individualizedPrimary}>
        <strong>{med.name}</strong> doses are set individually by a prescriber based on age, condition, response, and other medications. There is no universal calculation.
      </p>

      {med.standardRange && (
        <div className={styles.individualizedRange}>
          <div className={styles.individualizedRangeLabel}>Standard adult range</div>
          <div className={styles.individualizedRangeText}>{med.standardRange}</div>
        </div>
      )}

      {isControlled && (
        <div className={styles.individualizedControlled}>
          <div className={styles.individualizedControlledLabel}>
            {med.controlled} controlled substance
          </div>
          <div className={styles.individualizedControlledText}>
            {med.warnings.adult}
          </div>
        </div>
      )}

      {!isControlled && (
        <div className={styles.individualizedWhy}>
          <div className={styles.individualizedWhyLabel}>Why individualized</div>
          <div className={styles.individualizedWhyText}>
            {med.warnings.adult}
          </div>
        </div>
      )}

      <div className={styles.sourceBox}>
        <div className={styles.sourceLabel}>Sources &amp; references</div>
        <p className={styles.sourceText}>{med.source}</p>
      </div>

      <a
        href={`/interaction-checker?med=${medKey}`}
        className={styles.individualizedInteractionCta}
      >
        Check interactions with {med.name} →
      </a>

      <button
        type="button"
        onClick={onCalculateAnother}
        className={styles.individualizedCalcAnother}
      >
        Calculate another
      </button>
      <button
        type="button"
        onClick={onStartOver}
        className={styles.individualizedStartOver}
      >
        Start completely over
      </button>

      <div className={styles.disclaimerBox} style={{ marginTop: '1rem' }}>
        <p className={styles.disclaimerText}>
          <strong>Medical disclaimer:</strong> This information is for reference and education only. It does not replace your prescribing physician, pharmacist, or the label on your bottle. Never start, stop, or change a prescription dose without your prescriber.
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
export default function DosageCalculatorPage() {
  const [who, setWho] = useState(null);
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState('years');
  const [medKey, setMedKey] = useState(null);
  const [formatKey, setFormatKey] = useState(null);
  const [concIndex, setConcIndex] = useState(null);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [profileName, setProfileName] = useState('');
  const [profileDob, setProfileDob] = useState('');
  const [activeTab, setActiveTab] = useState('create');
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [trackingExpanded, setTrackingExpanded] = useState(false);

  // Rx modal state
  const [showRxModal, setShowRxModal] = useState(false);
  const [pendingRxAction, setPendingRxAction] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('kyr_active_profile');
    if (saved) {
      const p = JSON.parse(saved);
      setActiveProfile(p);
      fetchLogs(p.id);
    }
  }, []);

  async function fetchLogs(profileId) {
    try {
      const data = await getLogs(profileId);
      setLogs(data);
    } catch {
      const local = JSON.parse(localStorage.getItem('kyr_logs') || '[]');
      setLogs(local.filter(l => l.profile_id === profileId));
    }
  }

  const isChild = who === 'child';
  const ageMonths = age ? (ageUnit === 'months' ? Number(age) : Number(age) * 12) : null;
  const wKg = weight ? toKg(Number(weight), weightUnit) : null;

  const med = medKey ? MEDS[medKey] : null;
  const formats = med ? Object.entries(med.formats) : [];
  const concentrations = (med && formatKey) ? med.formats[formatKey].concentrations : [];

  const isIndividualized = !!(med && med.requiresIndividualization);

  const step1Complete = who !== null;
  const step2Complete = step1Complete && weight !== '' && age !== '';
  const step3Complete = step2Complete && medKey !== null;
  const step4Complete = step3Complete && (isIndividualized || formatKey !== null);
  const step5Complete = step4Complete && (isIndividualized || concIndex !== null);

  function handleRxTabRequested(action) {
    setPendingRxAction(() => action);
    setShowRxModal(true);
  }

  function handleRxAcknowledge() {
    setShowRxModal(false);
    if (pendingRxAction) {
      pendingRxAction();
      setPendingRxAction(null);
    }
  }

  function handleWhoChange(newWho) {
    setWho(newWho);
    setWeight('');
    setAge('');
    setMedKey(null);
    setFormatKey(null);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);
    setActiveStep(2);
  }

  function handleWeightAgeComplete() {
    setShowResult(false);
    setResult(null);

    if (medKey && med?.requiresIndividualization) {
      showIndividualizedResult();
      return;
    }

    if (medKey && formatKey && concIndex !== null) {
      calculate();
      setActiveStep(null);
    } else if (medKey && formatKey) {
      setActiveStep(5);
    } else if (medKey) {
      setActiveStep(4);
    } else {
      setActiveStep(3);
    }
  }

  function handleMedSelect(key) {
    const selectedMed = MEDS[key];
    setMedKey(key);
    setFormatKey(null);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);

    if (selectedMed?.requiresIndividualization) {
      setResult({ med: selectedMed, medKey: key });
      setShowResult(true);
      setActiveStep(null);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return;
    }

    setActiveStep(4);
  }

  function showIndividualizedResult() {
    setResult({ med, medKey });
    setShowResult(true);
    setActiveStep(null);
  }

  function handleFormatSelect(key) {
    setFormatKey(key);
    setShowResult(false);
    setResult(null);

    if (med && med.category === 'essential_oils') {
      const formatConcentrations = med.formats[key].concentrations;
      const ageYears = ageMonths / 12;

      let autoIndex = 0;
      if (!isChild) {
        const adultIdx = formatConcentrations.findIndex(c =>
          c.label.toLowerCase().includes('adult')
        );
        autoIndex = adultIdx >= 0 ? adultIdx : formatConcentrations.length - 1;
      } else if (ageYears < 6) {
        const youngIdx = formatConcentrations.findIndex(c =>
          c.label.toLowerCase().includes('2-6') ||
          c.label.toLowerCase().includes('0.5')
        );
        autoIndex = youngIdx >= 0 ? youngIdx : 0;
      } else {
        const kidIdx = formatConcentrations.findIndex(c =>
          (c.label.toLowerCase().includes('kids') || c.label.toLowerCase().includes('child')) &&
          !c.label.toLowerCase().includes('2-6')
        );
        autoIndex = kidIdx >= 0 ? kidIdx : 0;
      }

      setConcIndex(autoIndex);
      setActiveStep(null);
      setTimeout(() => {
        const conc = formatConcentrations[autoIndex];
        const doseMg = calcDoseMg(med, wKg, ageMonths, isChild);
        const formatInfo = med.formats[key];
        const splittable = formatInfo.splittable !== false;
        const physicalResult = physicalAmount(doseMg, conc, splittable);
        setResult({
          doseMg,
          physical: physicalResult.display,
          physicalUnits: physicalResult.units,
          physicalBelowMinimum: physicalResult.belowMinimum,
          physicalRounded: physicalResult.rounded,
          med,
          medKey,
          conc,
          formatKey: key,
          formatLabel: formatInfo.label,
          concLabel: conc.label,
          splittable,
        });
        setShowResult(true);
      }, 50);
      return;
    }

    setConcIndex(null);
    setActiveStep(5);
  }

  function handleCalculateAnother() {
    setMedKey(null);
    setFormatKey(null);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);
    setActiveStep(3);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  function handleStartOver() {
    setWho(null);
    setWeight('');
    setAge('');
    setMedKey(null);
    setFormatKey(null);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);
    setActiveStep(1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  function handleConcSelect(i) {
    setConcIndex(i);
    setShowResult(false);
    setResult(null);
  }

  function editStep(stepNum) {
    setActiveStep(stepNum);
  }

  function calculate() {
    if (!step5Complete) return;
    const doseMg = calcDoseMg(med, wKg, ageMonths, isChild);
    const conc = concentrations[concIndex];
    const formatInfo = med.formats[formatKey];
    const splittable = formatInfo.splittable !== false;
    const physicalResult = physicalAmount(doseMg, conc, splittable);
    setResult({
      doseMg,
      physical: physicalResult.display,
      physicalUnits: physicalResult.units,
      physicalBelowMinimum: physicalResult.belowMinimum,
      physicalRounded: physicalResult.rounded,
      med,
      medKey,
      conc,
      formatKey,
      formatLabel: formatInfo.label,
      concLabel: conc.label,
      splittable,
    });
    setShowResult(true);
    setActiveTab('create');
  }

  async function handleSaveProfile() {
    if (!profileName.trim()) return;
    const newProfile = { name: profileName.trim(), dob: profileDob || null, weight_kg: wKg };
    try {
      const saved = await createProfile(newProfile);
      setActiveProfile(saved);
      localStorage.setItem('kyr_active_profile', JSON.stringify(saved));
      if (result) await handleLogDose(saved.id);
      await fetchLogs(saved.id);
    } catch {
      const fallback = { id: Date.now().toString(), ...newProfile };
      setActiveProfile(fallback);
      localStorage.setItem('kyr_active_profile', JSON.stringify(fallback));
      if (result) handleLogDoseLocal(fallback.id);
    }
    setActiveTab('log');
  }

  async function handleLogDose(profileId) {
    if (!result) return;
    const entry = {
      profile_id: profileId,
      medication: result.med.name,
      dose_mg: result.doseMg,
      physical_amount: result.physical,
      format: result.formatKey,
      concentration_label: result.concLabel,
      interval_hours: result.med.intervalHours,
      max_doses_per_day: result.med.maxDosesPerDay,
    };
    try {
      await logDose(entry);
      await fetchLogs(profileId);
    } catch {
      handleLogDoseLocal(profileId);
    }
  }

  function handleLogDoseLocal(profileId) {
    if (!result) return;
    const entry = {
      id: Date.now().toString(),
      profile_id: profileId,
      medication: result.med.name,
      dose_mg: result.doseMg,
      physical_amount: result.physical,
      format: result.formatKey,
      concentration_label: result.concLabel,
      interval_hours: result.med.intervalHours,
      max_doses_per_day: result.med.maxDosesPerDay,
      administered_at: new Date().toISOString(),
    };
    const all = JSON.parse(localStorage.getItem('kyr_logs') || '[]');
    all.push(entry);
    localStorage.setItem('kyr_logs', JSON.stringify(all));
    setLogs(prev => [entry, ...prev]);
  }

  async function handleLogNext() {
    if (activeProfile) await handleLogDose(activeProfile.id);
  }

  const whoDisplay = who === 'child' ? 'Child (under 12)' : who === 'adult' ? 'Adult (12+)' : null;
  const weightAgeDisplay = (weight && age) ? `${age} ${ageUnit}, ${weight} ${weightUnit}` : null;
  const medDisplay = med ? `${CATEGORIES[med.category]?.icon} ${med.name}` : null;
  const formatDisplay = formatKey ? med.formats[formatKey].label : null;
  const concDisplay = concIndex !== null ? concentrations[concIndex].label : null;

  const showIndividualizedCard = showResult && result && result.med?.requiresIndividualization;
  const showWarningResult = showResult && result && !showIndividualizedCard && (result.doseMg === 0 || result.physicalBelowMinimum);
  const showNormalResult = showResult && result && !showIndividualizedCard && result.doseMg > 0 && !result.physicalBelowMinimum;

  return (
    <>
      <PrescriptionAcknowledgmentModal open={showRxModal} onAcknowledge={handleRxAcknowledge} />

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Dosage Calculator</h1>
          <p className={styles.heroSub}>
            Get the right dose for your specific product — OTC medications, supplements, herbal remedies, essential oils, and home remedies — based on FDA monograph guidelines, AAP recommendations, and NIH research.
          </p>
        </div>

        {/* Step 1 — Who */}
        {step1Complete && activeStep !== 1 ? (
          <StepChip num="1" label="Who is this for?" value={whoDisplay} onEdit={() => editStep(1)} isActive={false} />
        ) : (
          <div className={styles.card}>
            <StepHeader num="1" label="Who is this for?" />
            <div className={styles.optGrid}>
              <OptionButton selected={who === 'child'} onClick={() => handleWhoChange('child')} title="Child" sub="Under 12 years old" />
              <OptionButton selected={who === 'adult'} onClick={() => handleWhoChange('adult')} title="Adult" sub="12 years and older" />
            </div>
          </div>
        )}

        {/* Step 2 — Weight and Age */}
        {step1Complete && (
          step2Complete && activeStep !== 2 ? (
            <StepChip num="2" label="Age and weight" value={weightAgeDisplay} onEdit={() => editStep(2)} isActive={false} />
          ) : activeStep === 2 || (step1Complete && !step2Complete) ? (
            <div className={styles.card}>
             <StepHeader num="2" label="Enter age and weight" />
              <div className={styles.fieldWrap}>
                <label className={styles.fieldLabel} htmlFor="age">Age</label>
                <input id="age" type="number" min="0" max="120" placeholder={isChild ? 'e.g. 6' : 'e.g. 35'} value={age} onChange={e => setAge(e.target.value)} className={styles.input} />
              </div>
              {isChild && (
                <div className={styles.ageUnitRow}>
                  <label className={styles.radioLabel}><input type="radio" name="ageunit" value="years" checked={ageUnit === 'years'} onChange={() => setAgeUnit('years')} /> Years</label>
                  <label className={styles.radioLabel}><input type="radio" name="ageunit" value="months" checked={ageUnit === 'months'} onChange={() => setAgeUnit('months')} /> Months</label>
                </div>
              )}
              {isChild && ageMonths !== null && ageMonths < 2 && (
                <p className={styles.ageWarning}>Consult a doctor before giving any medication to infants under 2 months.</p>
              )}
              <div className={styles.inputRow} style={{ marginTop: '10px' }}>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel} htmlFor="weight">Weight</label>
                  <input id="weight" type="number" min="1" max="500" placeholder="e.g. 40" value={weight} onChange={e => setWeight(e.target.value)} className={styles.input} />
                </div>
                <div className={styles.unitToggle}>
                  <button type="button" className={`${styles.unitBtn} ${weightUnit === 'lbs' ? styles.unitBtnActive : ''}`} onClick={() => setWeightUnit('lbs')}>lbs</button>
                  <button type="button" className={`${styles.unitBtn} ${weightUnit === 'kg' ? styles.unitBtnActive : ''}`} onClick={() => setWeightUnit('kg')}>kg</button>
                </div>
              </div>
              {weight && age !== '' && (
                <button type="button" className={styles.nextStepBtn} onClick={handleWeightAgeComplete}>
                  Next: Choose medication →
                </button>
              )}
            </div>
          ) : null
        )}

       {/* Step 3 — Medication */}
       {step2Complete && activeStep >= 3 && (
          step3Complete && activeStep !== 3 ? (
            <StepChip num="3" label="Medication" value={medDisplay} onEdit={() => editStep(3)} isActive={false} />
          ) : activeStep === 3 ? (
            <div className={styles.card}>
              <StepHeader num="3" label="Select medication or remedy" />
              <MedPicker value={medKey} onChange={handleMedSelect} isChild={isChild} onRxTabRequested={handleRxTabRequested} />
            </div>
          ) : null
        )}

        {/* Step 4 — Format — skipped for individualized meds */}
        {step3Complete && !isIndividualized && activeStep >= 4 && (
          step4Complete && activeStep !== 4 ? (
            <StepChip num="4" label="Product format" value={formatDisplay} onEdit={() => editStep(4)} isActive={false} />
          ) : activeStep === 4 ? (
            <div className={styles.card}>
              <StepHeader num="4" label="Select product format" />
              <div className={styles.optGrid}>
                {formats.map(([fkey, fmt]) => (
                  <OptionButton key={fkey} selected={formatKey === fkey} onClick={() => handleFormatSelect(fkey)} title={fmt.label} />
                ))}
              </div>
            </div>
          ) : null
        )}

        {/* Step 5 — Concentration — skipped for individualized meds */}
        {step4Complete && !isIndividualized && activeStep >= 5 && (
          step5Complete && activeStep !== 5 && showResult ? (
            <StepChip num="5" label="Concentration" value={concDisplay} onEdit={() => editStep(5)} isActive={false} />
          ) : activeStep === 5 ? (
            <div className={styles.card}>
              <StepHeader num="5" label="Select concentration" sub="Check your product label for the mg strength" />
              <div className={styles.optGrid}>
                {concentrations.map((c, i) => (
                  <OptionButton key={i} selected={concIndex === i} onClick={() => handleConcSelect(i)} title={c.label} />
                ))}
              </div>
            </div>
          ) : null
        )}

        {/* Calculate button */}
        {step5Complete && !showResult && !isIndividualized && (
          <button type="button" className={styles.calcBtn} onClick={calculate}>
            Calculate dose
          </button>
        )}

        {/* Individualized result card */}
        {showIndividualizedCard && (
          <IndividualizedResultCard
            med={result.med}
            medKey={result.medKey}
            onCalculateAnother={handleCalculateAnother}
            onStartOver={handleStartOver}
          />
        )}

        {/* Warning result card */}
        {showWarningResult && (
          <div className={styles.resultCardWarning}>
            <div className={styles.warningHeader}>
              <span className={styles.warningIcon}>⚠️</span>
              <div className={styles.warningTitle}>NOT RECOMMENDED</div>
            </div>

            <div className={styles.warningBody}>
              <p className={styles.warningPrimary}>
                {result.physicalBelowMinimum ? (
                  <>
                    The calculated dose of <strong>{result.med.name}</strong> is less than 1 full {result.formatLabel?.toLowerCase().includes('gel') ? 'gel cap' : result.formatLabel?.toLowerCase().includes('cap') ? 'capsule' : result.formatLabel?.toLowerCase().includes('suppository') ? 'suppository' : 'unit'} at this concentration.
                  </>
                ) : (
                  <>
                    <strong>{result.med.name}</strong> is not recommended for this {isChild ? 'child' : 'person'} at this age or weight.
                  </>
                )}
              </p>

              {result.physicalBelowMinimum ? (
                <div className={styles.warningReason}>
                  <div className={styles.warningReasonLabel}>Why:</div>
                  <div className={styles.warningReasonText}>
                    {result.formatLabel} can&apos;t be split safely. Use a <strong>liquid form</strong> (suspension or drops) for accurate dosing at this weight, or pick a lower concentration if available.
                  </div>
                </div>
              ) : result.med.contraindication ? (
                <div className={styles.warningReason}>
                  <div className={styles.warningReasonLabel}>Why:</div>
                  <div className={styles.warningReasonText}>{result.med.contraindication}</div>
                </div>
              ) : isChild && ageMonths < 24 ? (
                <div className={styles.warningReason}>
                  <div className={styles.warningReasonLabel}>Why:</div>
                  <div className={styles.warningReasonText}>
                    {result.med.name} doesn&apos;t have established safe dosing data for this age. Many medications require special caution or are contraindicated for infants and very young children.
                  </div>
                </div>
              ) : null}

              <div className={styles.warningAction}>
                <div className={styles.warningActionIcon}>{result.physicalBelowMinimum ? '💧' : '👨‍⚕️'}</div>
                <div className={styles.warningActionText}>
                  {result.physicalBelowMinimum ? (
                    <>
                      <strong>Try a different format.</strong> Pick a liquid suspension or drops to dose accurately at this weight. You can change your format selection above.
                    </>
                  ) : (
                    <>
                      <strong>Speak with a pediatrician or pharmacist</strong> before giving this medication. They can recommend a safe alternative or different dose.
                    </>
                  )}
                </div>
              </div>

              <div className={styles.warningSourceBox}>
                <div className={styles.sourceLabel}>Sources &amp; references</div>
                <p className={styles.sourceText}>{result.med.source}</p>
              </div>
            </div>
          </div>
        )}

        {/* Normal result card */}
        {showNormalResult && (
          <div className={styles.resultCard}>
            <div className={styles.resultLabel}>Recommended dose</div>
            <div className={styles.resultDose}>{result.physical}</div>
            <div className={styles.resultMg}>{result.doseMg} mg</div>

            <div className={styles.scheduleRow}>
              <span className={styles.scheduleIcon}>⏱</span>
              <div className={styles.scheduleText}><strong>Every {result.med.intervalHours} hours</strong> as needed — wait a full {result.med.intervalHours} hours between doses</div>
            </div>
            <div className={styles.scheduleRow}>
              <span className={styles.scheduleIcon}>📅</span>
              <div className={styles.scheduleText}><strong>Maximum {result.med.maxDosesPerDay} dose{result.med.maxDosesPerDay > 1 ? 's' : ''} in any 24-hour period</strong></div>
            </div>
            <div className={styles.scheduleRow}>
              <span className={styles.scheduleIcon}>⚠️</span>
              <div className={styles.scheduleText}>{isChild ? result.med.warnings.child : result.med.warnings.adult}</div>
            </div>

            <div className={styles.sourceBox}>
              <div className={styles.sourceLabel}>Sources &amp; references</div>
              <p className={styles.sourceText}>{result.med.source}</p>
            </div>

            {result?.medKey && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#166534', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                    💊🌿 Taking anything else?
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.5 }}>
                    Check if {result.med.name} is safe to combine with your other medications, supplements, or herbal remedies.
                  </div>
                </div>
                <a
                  href={`/interaction-checker?med=${result.medKey}`}
                  style={{
                    background: '#2d4a3e',
                    color: '#fff',
                    padding: '0.55rem 1.1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                  }}
                >
                  Check Interactions →
                </a>
              </div>
            )}

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'center',
              margin: '1.5rem 0 1rem',
            }}>
              <button
                type="button"
                onClick={handleCalculateAnother}
                style={{
                  background: '#2d4a3e',
                  color: '#fff',
                  border: 'none',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  width: '100%',
                  maxWidth: '320px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1f3329' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2d4a3e' }}
              >
                Calculate another →
              </button>
              <button
                type="button"
                onClick={handleStartOver}
                style={{
                  background: 'transparent',
                  color: '#5a7a6e',
                  border: 'none',
                  padding: '0.4rem 1rem',
                  fontSize: '0.82rem',
                  textDecoration: 'underline',
                  textDecorationStyle: 'dotted',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#2d4a3e' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#5a7a6e' }}
              >
                Start completely over
              </button>
            </div>

{/* ⭐ Premium Track-This-Dose Callout — collapsed by default, expands on tap */}
{!trackingExpanded ? (
              <button
                type="button"
                onClick={() => setTrackingExpanded(true)}
                style={{
                  background: 'linear-gradient(135deg, #fef9e7 0%, #fdf6e3 100%)',
                  border: '2px solid #d4a017',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  margin: '1.5rem 0 1rem',
                  boxShadow: '0 2px 8px rgba(212, 160, 23, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  width: '100%',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 160, 23, 0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 160, 23, 0.12)'
                }}
              >
                <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.2rem',
                  }}>
                    <span style={{ fontSize: '1.15rem' }}>⭐</span>
                    <span style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#2d4a3e',
                    }}>
                      Save &amp; track this dose
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b5d2f',
                    lineHeight: 1.4,
                  }}>
                    Get smart reminders when the next dose is due
                  </div>
                </div>
                <div style={{
                  background: '#d4a017',
                  color: '#fff',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}>
                  Open tracker →
                </div>
              </button>
            ) : (
              <div style={{
                background: 'linear-gradient(135deg, #fef9e7 0%, #fdf6e3 100%)',
                border: '2px solid #d4a017',
                borderRadius: '12px',
                padding: '1.25rem',
                margin: '1.5rem 0 1rem',
                boxShadow: '0 2px 8px rgba(212, 160, 23, 0.12)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.85rem',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>⭐</span>
                    <div style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#2d4a3e',
                    }}>
                      Track this dose for your family
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTrackingExpanded(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#6b5d2f',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-inter), sans-serif',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '6px',
                      textDecoration: 'underline',
                      textDecorationStyle: 'dotted',
                    }}
                    aria-label="Close tracker"
                  >
                    ✕ Close
                  </button>
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#6b5d2f',
                  lineHeight: 1.5,
                  marginBottom: '1rem',
                }}>
                  Never wonder when the next dose is due. Save this calculation to a family profile and get smart reminders when it&apos;s time for the next dose.
                </div>
                <div className={styles.profileTab} style={{ margin: 0 }}>
                  <div className={styles.profileTabHeader}>
                    <button type="button" className={`${styles.ptabBtn} ${activeTab === 'create' ? styles.ptabBtnActive : ''}`} onClick={() => setActiveTab('create')}>💾 Save &amp; track this dose</button>
                    <button type="button" className={`${styles.ptabBtn} ${activeTab === 'log' ? styles.ptabBtnActive : ''}`} onClick={() => setActiveTab('log')}>📋 Dose history</button>
                  </div>
                  {activeTab === 'create' && (
                    <div className={styles.ptabContent}>
                      {activeProfile ? (
                        <div>
                          <p className={styles.ptabNote}>Logged for <strong>{activeProfile.name}</strong>.</p>
                          <button type="button" className={styles.saveBtn} onClick={() => handleLogDose(activeProfile.id)}>Log this dose for {activeProfile.name}</button>
                        </div>
                      ) : (
                        <>
                          <p className={styles.ptabNote}>Create a profile to track doses and see when the next dose is due.</p>
                          <div className={styles.formGrid}>
                            <div className={styles.formField}>
                              <label htmlFor="p-name">Profile name</label>
                              <input id="p-name" type="text" placeholder="e.g. Emma" value={profileName} onChange={e => setProfileName(e.target.value)} className={styles.input} />
                            </div>
                            <div className={styles.formField}>
                              <label htmlFor="p-dob">Date of birth</label>
                              <input id="p-dob" type="date" value={profileDob} onChange={e => setProfileDob(e.target.value)} className={styles.input} />
                            </div>
                          </div>
                          <button type="button" className={styles.saveBtn} onClick={handleSaveProfile}>Save profile &amp; log this dose</button>
                        </>
                      )}
                    </div>
                  )}
                  {activeTab === 'log' && (
                    <div className={styles.ptabContent}>
                      {logs.length === 0 ? (
                        <p className={styles.emptyLog}>No doses logged yet.</p>
                      ) : (
                        logs.slice(0, 10).map(log => {
                          const lastTime = new Date(log.administered_at);
                          const nextTime = new Date(lastTime.getTime() + log.interval_hours * 3600000);
                          const canTake = new Date() >= nextTime;
                          return (
                            <div key={log.id} className={styles.logItem}>
                              <div className={styles.logName}>{log.medication}</div>
                              <div className={styles.logAmount}>{log.physical_amount} · {lastTime.toLocaleString()}</div>
                              <div className={styles.logNext} style={{ color: canTake ? '#2d4a3e' : '#c0392b' }}>
                                {canTake ? 'Next dose eligible now' : `Next eligible: ${nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.disclaimerBox}>
              <p className={styles.disclaimerText}>
                <strong>Medical disclaimer:</strong> Dosage information is based on published FDA monographs, AAP guidelines, NIH Office of Dietary Supplements, and peer-reviewed herbal monographs, and is provided for reference only. Always verify the dose against the measuring device and label included with your specific product. This calculator does not replace advice from a licensed healthcare provider, pharmacist, or physician. If you are unsure, consult a medical professional before administering any medication or supplement.
              </p>
            </div>
          </div>
        )}
      </main>

      {activeProfile && (
        <DoseTrackerBadge profile={activeProfile} logs={logs} onLogNext={handleLogNext} open={trackerOpen} onToggle={() => setTrackerOpen(o => !o)} />
      )}
    </>
  );
}