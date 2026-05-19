'use client';

import { useState, useEffect } from 'react';
import { MEDS, CATEGORIES, REMEDY_TAGS, FORMAT_ICONS } from '@/lib/medsData';
import { createProfile, logDose, getLogs } from '@/lib/supabaseHelpers';
import DoseTrackerBadge from '@/components/DoseTrackerBadge';
import styles from './DosageCalculator.module.css';

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
    const keys = Object.keys(med.flatDose.child);
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

function physicalAmount(doseMg, conc) {
  if (conc.unitML) {
    const ml = (doseMg / conc.mgPerUnit) * conc.unitML;
    if (ml >= 5) {
      const tsp = ml / 5;
      const tspStr = tsp % 1 === 0 ? tsp.toFixed(0) : tsp.toFixed(1);
      return `${tspStr} tsp (${ml.toFixed(1)} mL)`;
    }
    return `${ml.toFixed(1)} mL`;
  }
  const count = doseMg / conc.mgPerUnit;
  const countStr = count % 1 === 0 ? count.toFixed(0) : count.toFixed(1);
  return `${countStr} ${conc.unitLabel || 'unit(s)'}`;
}

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

  // Sidebar filters
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeRemedy, setActiveRemedy] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Filter meds by sidebar selection
  const filteredMeds = Object.entries(MEDS).filter(([key, med]) => {
    if (activeCategory && med.category !== activeCategory) return false;
    if (activeRemedy && !med.tags.includes(activeRemedy)) return false;
    return true;
  });

  const med = medKey ? MEDS[medKey] : null;
  const formats = med ? Object.entries(med.formats) : [];
  const concentrations = (med && formatKey) ? med.formats[formatKey].concentrations : [];
  const canCalculate = who && weight && age !== '' && medKey && formatKey && concIndex !== null;

  function resetFormat() {
    setFormatKey(null);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);
  }

  function handleMedSelect(key) {
    setMedKey(key);
    resetFormat();
  }

  function handleFormatSelect(key) {
    setFormatKey(key);
    setConcIndex(null);
    setShowResult(false);
    setResult(null);
  }

  function handleCategoryFilter(cat) {
    setActiveCategory(prev => prev === cat ? null : cat);
    setActiveRemedy(null);
    setMedKey(null);
    resetFormat();
  }

  function handleRemedyFilter(tag) {
    setActiveRemedy(prev => prev === tag ? null : tag);
    setActiveCategory(null);
    setMedKey(null);
    resetFormat();
  }

  function calculate() {
    if (!canCalculate) return;
    const doseMg = calcDoseMg(med, wKg, ageMonths, isChild);
    const conc = concentrations[concIndex];
    const physical = physicalAmount(doseMg, conc);
    setResult({ doseMg, physical, med, medKey, conc, formatKey, concLabel: conc.label });
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

  return (
    <>
      <div className={styles.pageWrap}>

        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarTitle}>Browse by category</div>
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.sidebarBtn} ${activeCategory === key ? styles.sidebarBtnActive : ''}`}
                  onClick={() => handleCategoryFilter(key)}
                >
                  <span className={styles.sidebarIcon}>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className={styles.sidebarSection}>
              <div className={styles.sidebarTitle}>Browse by condition</div>
              {Object.entries(REMEDY_TAGS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.sidebarBtn} ${activeRemedy === key ? styles.sidebarBtnActive : ''}`}
                  onClick={() => handleRemedyFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {(activeCategory || activeRemedy) && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => { setActiveCategory(null); setActiveRemedy(null); setMedKey(null); resetFormat(); }}
              >
                Clear filter
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Dosage Calculator</h1>
            <p className={styles.heroSub}>
              Get the right dose for your specific product — OTC medications, supplements,
              herbal remedies, essential oils, and home remedies — based on FDA monograph
              guidelines, AAP recommendations, and NIH research.
            </p>
            <button
              type="button"
              className={styles.sidebarToggle}
              onClick={() => setSidebarOpen(o => !o)}
            >
              {sidebarOpen ? 'Hide filters' : 'Filter by category or condition'}
            </button>
          </div>

          {/* Active filter badge */}
          {(activeCategory || activeRemedy) && (
            <div className={styles.filterBadge}>
              Showing: {activeCategory ? CATEGORIES[activeCategory].label : REMEDY_TAGS[activeRemedy]}
              <button type="button" onClick={() => { setActiveCategory(null); setActiveRemedy(null); setMedKey(null); resetFormat(); }} className={styles.filterBadgeClose}>×</button>
            </div>
          )}

          {/* Step 1 */}
          <div className={styles.card}>
            <StepHeader num="1" label="Who is this for?" />
            <div className={styles.optGrid}>
              <OptionButton selected={who === 'child'} onClick={() => { setWho('child'); setMedKey(null); resetFormat(); }} title="Child" sub="Under 12 years old" />
              <OptionButton selected={who === 'adult'} onClick={() => { setWho('adult'); setMedKey(null); resetFormat(); }} title="Adult" sub="12 years and older" />
            </div>
          </div>

          {/* Step 2 */}
          {who && (
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
            </div>
          )}

          {/* Step 3 — Medication */}
          {who && (
            <div className={styles.card}>
              <StepHeader num="3" label="Select medication or remedy" sub={filteredMeds.length !== Object.keys(MEDS).length ? `${filteredMeds.length} results` : `${Object.keys(MEDS).length} options available`} />
              <div className={styles.medGrid}>
                {filteredMeds.map(([key, m]) => (
                  <OptionButton key={key} selected={medKey === key} onClick={() => handleMedSelect(key)} title={m.name} sub={`${CATEGORIES[m.category]?.icon} ${m.brand}`} />
                ))}
                {filteredMeds.length === 0 && (
                  <p className={styles.emptyLog}>No remedies found for this filter. <button type="button" className={styles.linkBtn} onClick={() => { setActiveCategory(null); setActiveRemedy(null); }}>Clear filter</button></p>
                )}
              </div>
            </div>
          )}

          {/* Step 4 — Format */}
          {medKey && (
            <div className={styles.card}>
              <StepHeader num="4" label="Select product format" />
              <div className={styles.optGrid}>
                {formats.map(([fkey, fmt]) => (
                  <OptionButton key={fkey} selected={formatKey === fkey} onClick={() => handleFormatSelect(fkey)} title={fmt.label} />
                ))}
              </div>
            </div>
          )}

          {/* Step 5 — Concentration */}
          {formatKey && (
            <div className={styles.card}>
              <StepHeader num="5" label="Select concentration" sub="Check your product label for the mg strength" />
              <div className={styles.optGrid}>
                {concentrations.map((c, i) => (
                  <OptionButton key={i} selected={concIndex === i} onClick={() => setConcIndex(i)} title={c.label} />
                ))}
              </div>
            </div>
          )}

          {/* Calculate */}
          {who && (
            <button type="button" className={styles.calcBtn} disabled={!canCalculate} onClick={calculate}>
              Calculate dose
            </button>
          )}

          {/* Result */}
          {showResult && result && (
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
                <div className={styles.sourceLabel}>Sources & references</div>
                <p className={styles.sourceText}>{result.med.source}</p>
              </div>

{/* Check Interactions Banner */}
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
                      ⚠️ Taking anything else?
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

              {/* Profile tabs */}
              <div className={styles.profileTab}>
                <div className={styles.profileTabHeader}>
                  <button type="button" className={`${styles.ptabBtn} ${activeTab === 'create' ? styles.ptabBtnActive : ''}`} onClick={() => setActiveTab('create')}>Save & track this dose</button>
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
                        <button type="button" className={styles.saveBtn} onClick={handleSaveProfile}>Save profile & log this dose</button>
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
      </div>

      {activeProfile && (
        <DoseTrackerBadge profile={activeProfile} logs={logs} onLogNext={handleLogNext} open={trackerOpen} onToggle={() => setTrackerOpen(o => !o)} />
      )}
    </>
  );
}
