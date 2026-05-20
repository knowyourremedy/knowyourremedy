'use client';

import { useState, useEffect, useMemo } from 'react';
import { MEDS, CATEGORIES } from '@/lib/medsData';
import { createProfile, logDose, getLogs } from '@/lib/supabaseHelpers';
import DoseTrackerBadge from '@/components/DoseTrackerBadge';
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
  // Liquid measurements — always allow decimals
  if (conc.unitML) {
    const ml = (doseMg / conc.mgPerUnit) * conc.unitML;
    if (ml >= 5) {
      const tsp = ml / 5;
      const tspStr = tsp % 1 === 0 ? tsp.toFixed(0) : tsp.toFixed(1);
      return { display: `${tspStr} tsp (${ml.toFixed(1)} mL)`, units: ml, rounded: false };
    }
    return { display: `${ml.toFixed(1)} mL`, units: ml, rounded: false };
  }

  // Solid forms — round based on whether splittable
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

// ─── Step Chip (compact summary for completed steps) ────────────
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

// ─── Step Header (for the active expanded step) ─────────────────
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

// ─── Option Button ──────────────────────────────────────────────
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

// ─── Medication Picker (search + category tabs) ─────────────────
function MedPicker({ value, onChange, isChild }) {
  const firstCat = Object.keys(CATEGORIES)[0];
  const [activeCat, setActiveCat] = useState(firstCat);
  const [search, setSearch] = useState('');

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
              onClick={() => setActiveCat(k)}
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

// ─── Main Page ───────────────────────────────────────────────────
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

  const step1Complete = who !== null;
  const step2Complete = step1Complete && weight !== '' && age !== '';
  const step3Complete = step2Complete && medKey !== null;
  const step4Complete = step3Complete && formatKey !== null;
  const step5Complete = step4Complete && concIndex !== null;

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
    // If user has already picked a medication, KEEP it.
    // The "Who" choice (child/adult) determines med validity, not weight or age.
    // Only the result needs recalculating with the new weight/age.
    setShowResult(false);
    setResult(null);

    // Skip directly to whichever step is the next un-completed one
    if (medKey && formatKey && concIndex !== null) {
      // All downstream steps already complete — auto-recalculate and show result
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
    setMedKey(key);
    setFormatKey(null);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);
    setActiveStep(4);
  }

  function handleFormatSelect(key) {
    setFormatKey(key);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);
    setActiveStep(5);
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
  const weightAgeDisplay = (weight && age) ? `${weight} ${weightUnit}, ${age} ${ageUnit}` : null;
  const medDisplay = med ? `${CATEGORIES[med.category]?.icon} ${med.name}` : null;
  const formatDisplay = formatKey ? med.formats[formatKey].label : null;
  const concDisplay = concIndex !== null ? concentrations[concIndex].label : null;

  // Determine if we should show the warning card vs normal result
  const showWarningResult = showResult && result && (result.doseMg === 0 || result.physicalBelowMinimum);
  const showNormalResult = showResult && result && result.doseMg > 0 && !result.physicalBelowMinimum;

  return (
    <>
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
            <StepChip num="2" label="Weight and age" value={weightAgeDisplay} onEdit={() => editStep(2)} isActive={false} />
          ) : activeStep === 2 || (step1Complete && !step2Complete) ? (
            <div className={styles.card}>
              <StepHeader num="2" label="Enter weight and age" />
              <div className={styles.inputRow}>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel} htmlFor="weight">Weight</label>
                  <input id="weight" type="number" min="1" max="500" placeholder="e.g. 40" value={weight} onChange={e => setWeight(e.target.value)} className={styles.input} />
                </div>
                <div className={styles.unitToggle}>
                  <button type="button" className={`${styles.unitBtn} ${weightUnit === 'lbs' ? styles.unitBtnActive : ''}`} onClick={() => setWeightUnit('lbs')}>lbs</button>
                  <button type="button" className={`${styles.unitBtn} ${weightUnit === 'kg' ? styles.unitBtnActive : ''}`} onClick={() => setWeightUnit('kg')}>kg</button>
                </div>
              </div>
              <div className={styles.fieldWrap} style={{ marginTop: '10px' }}>
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
              <MedPicker value={medKey} onChange={handleMedSelect} isChild={isChild} />
            </div>
          ) : null
        )}

        {/* Step 4 — Format */}
        {step3Complete && activeStep >= 4 && (
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

        {/* Step 5 — Concentration */}
        {step4Complete && activeStep >= 5 && (
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
        {step5Complete && !showResult && (
          <button type="button" className={styles.calcBtn} onClick={calculate}>
            Calculate dose
          </button>
        )}

        {/* Warning result card (zero-mg OR below-minimum) */}
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

            <div className={styles.disclaimerBox}>
              <p className={styles.disclaimerText}>
                <strong>Medical disclaimer:</strong> Dosage information is based on published FDA monographs, AAP guidelines, NIH Office of Dietary Supplements, and peer-reviewed herbal monographs, and is provided for reference only. Always verify the dose against the measuring device and label included with your specific product. This calculator does not replace advice from a licensed healthcare provider, pharmacist, or physician. If you are unsure, consult a medical professional before administering any medication or supplement.
              </p>
            </div>

            <div className={styles.profileTab}>
              <div className={styles.profileTabHeader}>
                <button type="button" className={`${styles.ptabBtn} ${activeTab === 'create' ? styles.ptabBtnActive : ''}`} onClick={() => setActiveTab('create')}>Save &amp; track this dose</button>
                <button type="button" className={`${styles.ptabBtn} ${activeTab === 'log' ? styles.ptabBtnActive : ''}`} onClick={() => setActiveTab('log')}>Dose history</button>
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
      </main>

      {activeProfile && (
        <DoseTrackerBadge profile={activeProfile} logs={logs} onLogNext={handleLogNext} open={trackerOpen} onToggle={() => setTrackerOpen(o => !o)} />
      )}
    </>
  );
}