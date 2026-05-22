'use client';
// app/interaction-checker/page.jsx

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MEDS, CATEGORIES, TOTAL_SELECTION_CAP } from '@/lib/medsData';
import {
  getInteractionsFor,
  getInteractionBetween,
  statusConfig,
} from '@/lib/interactionData';
import styles from './InteractionChecker.module.css';
import DosageCalculatorIcon from '@/components/icons/DosageCalculatorIcon';

// ─── helpers ────────────────────────────────────────────────
function buildMedList() {
  const grouped = {};
  Object.entries(CATEGORIES).forEach(([catKey]) => {
    grouped[catKey] = Object.entries(MEDS)
      .filter(([, m]) => m.category === catKey)
      .sort(([, a], [, b]) => a.name.localeCompare(b.name))
      .map(([key, m]) => ({ key, name: m.name, brand: m.brand, category: catKey }));
  });
  return grouped;
}

const ALL_MEDS_FLAT = Object.entries(MEDS)
  .sort(([, a], [, b]) => a.name.localeCompare(b.name))
  .map(([key, m]) => ({ key, name: m.name, brand: m.brand, category: m.category }));

// ─── MedPicker ────────────────────────────────────────────────
function MedPicker({ selectedKeys, onAdd, pharmaCount, totalCount }) {
  const grouped = useMemo(() => buildMedList(), []);
  const firstCat = Object.keys(CATEGORIES)[0];
  const [activeCat, setActiveCat] = useState(firstCat);
  const [search, setSearch] = useState('');

  const pharmaCapReached = pharmaCount >= 2;
  const totalCapReached = totalCount >= TOTAL_SELECTION_CAP;

  // Auto-switch active tab off pharma when pharma cap is reached
  useEffect(() => {
    if (!pharmaCapReached) return;
    const activeIsPharma = CATEGORIES[activeCat]?.sharedCapGroup === 'pharma';
    if (!activeIsPharma) return;
    // Find first non-pharma category and switch to it
    const nextCat = Object.entries(CATEGORIES).find(
      ([, v]) => v.sharedCapGroup !== 'pharma'
    );
    if (nextCat) setActiveCat(nextCat[0]);
  }, [pharmaCapReached, activeCat]);

  const filtered = useMemo(() => {
    let source;
    if (search.trim().length > 1) {
      source = ALL_MEDS_FLAT.filter(
        m =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.brand.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      source = grouped[activeCat] || [];
    }
    return source.map(m => {
      const med = MEDS[m.key];
      const isSelected = selectedKeys.includes(m.key);
      let duplicateOf = null;
      if (!isSelected && med?.activeIngredient) {
        const existing = selectedKeys.find(k => {
          const other = MEDS[k];
          return other && other.activeIngredient === med.activeIngredient && k !== m.key;
        });
        if (existing) duplicateOf = MEDS[existing]?.name;
      }
      const cat = CATEGORIES[m.category];
      const isPharma = cat?.sharedCapGroup === 'pharma';
      const blockedByPharmaCap = isPharma && pharmaCapReached;
      const blockedByTotalCap = totalCapReached;
      return {
        ...m,
        isSelected,
        duplicateOf,
        blocked: isSelected || !!duplicateOf || blockedByPharmaCap || blockedByTotalCap,
        blockReason: duplicateOf
          ? `Already added: ${duplicateOf}`
          : blockedByPharmaCap
          ? 'Pharmaceutical limit reached'
          : blockedByTotalCap
          ? 'Maximum 10 items'
          : null,
      };
    }).filter(m => !m.isSelected);
  }, [search, activeCat, grouped, selectedKeys, pharmaCapReached, totalCapReached]);

  const handlePick = (medKey) => {
    const added = onAdd(medKey);
    if (added) setSearch('');
  };

  return (
    <div className={styles.pickerWrap}>
      <div className={styles.pickerLabelRow}>
        <div className={styles.pickerLabel}>Pick medications</div>
        <div className={styles.pickerCount}>{totalCount} of {TOTAL_SELECTION_CAP} selected</div>
      </div>

      <div className={styles.pickerHint}>
      Stack up to {TOTAL_SELECTION_CAP} — only 2 OTC or prescription medications
      </div>

      <div className={styles.pickerInner}>
        <input
          type="text"
          placeholder="Search by name or brand…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        {search.trim().length < 2 && (
          <div className={styles.catTabs}>
            {Object.entries(CATEGORIES).map(([k, v]) => {
              const isPharma = v.sharedCapGroup === 'pharma';
              const isDimmed = isPharma && pharmaCapReached;
              const isActive = activeCat === k;
              return (
                <button
                  key={k}
                  className={`${styles.catTab} ${isActive ? styles.catTabActive : ''} ${isDimmed ? styles.catTabDimmed : ''}`}
                  onClick={() => setActiveCat(k)}
                >
                  <div className={styles.catTabIcon}>{v.icon} {v.label}</div>
                  <div className={styles.catTabHint}>
                    {isPharma ? (pharmaCapReached ? 'limit reached' : `${pharmaCount}/2 pharma`) : 'no limit'}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {pharmaCapReached && CATEGORIES[activeCat]?.sharedCapGroup === 'pharma' && (
          <div className={styles.capMessage}>
            Pharmaceutical limit reached. You can still add supplements, herbs, oils, and home remedies.
          </div>
        )}

        <div className={styles.medList}>
          {filtered.length === 0 && (
            <div className={styles.emptyMsg}>No medications found.</div>
          )}
          {filtered.map(m => (
            <button
              key={m.key}
              className={`${styles.medOption} ${m.blocked ? styles.medOptionBlocked : ''}`}
              onClick={() => !m.blocked && handlePick(m.key)}
              disabled={m.blocked}
              title={m.blockReason || ''}
            >
              <div className={styles.medOptionMain}>
                <span className={styles.medOptionName}>{m.name}</span>
                <span className={styles.medOptionBrand}>{m.brand}</span>
              </div>
              {m.blockReason && (
                <span className={styles.medOptionReason}>{m.blockReason}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SelectedStack ────────────────────────────────────────────
function SelectedStack({ selectedKeys, onRemove, onClear, verdictLevel = 'neutral', singleMedSlot = null }) {
  if (selectedKeys.length === 0) {
    return (
      <div className={styles.stackWrap}>
        <div className={styles.stackLabel}>Your selection</div>
        <div className={styles.stackEmpty}>
          <div className={styles.stackEmptyIcon}>← Pick from the list</div>
          <div className={styles.stackEmptyText}>
            Choose any medication, supplement, herb, or essential oil to begin. Add up to {TOTAL_SELECTION_CAP}.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stackWrap}>
      <div className={styles.stackLabelRow}>
        <div className={styles.stackLabel}>Your selection ({selectedKeys.length})</div>
        <button className={styles.stackClearBtn} onClick={onClear}>Clear all</button>
      </div>

      {singleMedSlot}

      <div className={styles.chipColumn}>
        {selectedKeys.map((key, i) => {
          const med = MEDS[key];
          if (!med) return null;
          const cat = CATEGORIES[med.category];
          return (
            <div key={key} className={styles.chipWithSep}>
              <div className={`${styles.selectedChip} ${styles[`chip${verdictLevel.charAt(0).toUpperCase() + verdictLevel.slice(1)}`]}`}>
                <div className={styles.chipBody}>
                  <div className={styles.chipName}>{cat?.icon} {med.name}</div>
                  <div className={styles.chipBrand}>{med.brand}</div>
                </div>
                <button
                  className={styles.chipRemove}
                  onClick={() => onRemove(key)}
                  aria-label={`Remove ${med.name}`}
                >
                  ✕
                </button>
              </div>
              {i < selectedKeys.length - 1 && (
                <div className={styles.chipPlus}>+</div>
              )}
            </div>
          );
        })}
      </div>

      {selectedKeys.length < TOTAL_SELECTION_CAP && (
        <div className={styles.chipPlaceholder}>← Add another from the list</div>
      )}
    </div>
  );
}

// ─── VerdictBanner ────────────────────────────────────────────
function VerdictBanner({ selectedKeys }) {
  if (selectedKeys.length < 2) return null;

  const pairs = [];
  for (let i = 0; i < selectedKeys.length; i++) {
    for (let j = i + 1; j < selectedKeys.length; j++) {
      pairs.push([selectedKeys[i], selectedKeys[j]]);
    }
  }

  let avoidCount = 0, cautionCount = 0, safeCount = 0, noDataCount = 0;
  pairs.forEach(([a, b]) => {
    const ix = getInteractionBetween(a, b);
    if (!ix) noDataCount++;
    else if (ix.status === 'avoid') avoidCount++;
    else if (ix.status === 'caution') cautionCount++;
    else if (ix.status === 'safe') safeCount++;
  });

  let verdict;
  if (avoidCount > 0) {
    verdict = { icon: '🚫', label: `Do not combine all ${selectedKeys.length} together`, summary: `${avoidCount} pair${avoidCount > 1 ? 's' : ''} should not be combined.`, bg: '#fdecea', border: '#c0392b', textColor: '#7a1c1c', level: 'avoid' };
  } else if (cautionCount > 0) {
    verdict = { icon: '⚠️', label: `Use caution combining all ${selectedKeys.length}`, summary: `${cautionCount} pair${cautionCount > 1 ? 's' : ''} need${cautionCount > 1 ? '' : 's'} attention.`, bg: '#fef7e6', border: '#d97706', textColor: '#5c4a1f', level: 'caution' };
  } else if (noDataCount > 0 && safeCount === 0) {
    verdict = { icon: '🔍', label: 'Limited data available', summary: `We don't have interaction data for these specific combinations. Consult a pharmacist before combining.`, bg: '#fafaf7', border: '#6b6b6b', textColor: '#3a3a3a', level: 'unknown' };
  } else {
    verdict = { icon: '✅', label: `All ${selectedKeys.length} likely safe together`, summary: noDataCount > 0 ? `No known interactions found between the pairs we have data on. ${noDataCount} pair${noDataCount > 1 ? 's are' : ' is'} not yet in our database.` : 'No known interactions between any pair in this combination.', bg: '#e8f3ec', border: '#27ae60', textColor: '#1f5132', level: 'safe' };
  }

  const hasPharma = selectedKeys.some(k => {
    const m = MEDS[k];
    return m && CATEGORIES[m.category]?.sharedCapGroup === 'pharma';
  });
  const showDisclaimer = selectedKeys.length >= 3 && hasPharma && verdict.level !== 'avoid';

  return (
    <div className={styles.verdictWrap}>
      <div className={styles.verdictBanner} style={{ backgroundColor: verdict.bg, borderLeftColor: verdict.border, color: verdict.textColor }}>
        <div className={styles.verdictIcon}>{verdict.icon}</div>
        <div className={styles.verdictBody}>
          <div className={styles.verdictLabel}>{verdict.label}</div>
          <div className={styles.verdictSummary}>{verdict.summary}</div>
        </div>
      </div>

      {showDisclaimer && (
        <div className={styles.cumulativeDisclaimer}>
          <strong>Pair-wise check only:</strong> We compared each pair of your {selectedKeys.length} items. For cumulative pharmaceutical safety, a pharmacist review is recommended.
        </div>
      )}

      <div className={styles.verdictCounts}>
        {avoidCount > 0 && <span className={styles.countPill} style={{ background: '#fdecea', color: '#7a1c1c' }}>🚫 {avoidCount} avoid</span>}
        {cautionCount > 0 && <span className={styles.countPill} style={{ background: '#fef7e6', color: '#5c4a1f' }}>⚠️ {cautionCount} caution</span>}
        {safeCount > 0 && <span className={styles.countPill} style={{ background: '#e8f3ec', color: '#1f5132' }}>✅ {safeCount} safe</span>}
        {noDataCount > 0 && <span className={styles.countPill} style={{ background: '#f4f1ea', color: '#5c5c5c' }}>🔍 {noDataCount} no data</span>}
      </div>
    </div>
  );
}

// ─── MultiPairResults ────────────────────────────────────────
function MultiPairResults({ selectedKeys }) {
  const [showSafe, setShowSafe] = useState(false);
  const [showNoData, setShowNoData] = useState(false);

  if (selectedKeys.length < 2) return null;

  const pairs = [];
  for (let i = 0; i < selectedKeys.length; i++) {
    for (let j = i + 1; j < selectedKeys.length; j++) {
      pairs.push([selectedKeys[i], selectedKeys[j]]);
    }
  }

  const grouped = { avoid: [], caution: [], safe: [], nodata: [] };
  pairs.forEach(([a, b]) => {
    const ix = getInteractionBetween(a, b);
    if (!ix) grouped.nodata.push({ a, b, ix: null });
    else grouped[ix.status]?.push({ a, b, ix });
  });

  const renderPair = ({ a, b, ix }) => {
    const medA = MEDS[a];
    const medB = MEDS[b];
    if (!medA || !medB) return null;
    const cfg = ix ? statusConfig(ix.status) : null;
    return (
      <details key={`${a}-${b}`} className={styles.pairDetails}>
        <summary className={styles.pairSummary} style={{ borderLeftColor: cfg?.color || '#9ca3af', backgroundColor: cfg?.bg || '#fafaf7' }}>
          <span className={styles.pairNames}>
            <span>{CATEGORIES[medA.category]?.icon} {medA.name}</span>
            <span className={styles.pairPlus}>+</span>
            <span>{CATEGORIES[medB.category]?.icon} {medB.name}</span>
          </span>
          <span className={styles.pairStatus} style={{ color: cfg?.color || '#6b7280' }}>
            {cfg ? `${cfg.icon} ${cfg.label}` : '🔍 No data'}
          </span>
        </summary>
        {ix ? (
          <div className={styles.pairDetailBody}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Summary</div>
              <div className={styles.sectionText}>{ix.summary}</div>
            </div>
            {ix.mechanism && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>How the Interaction Works</div>
                <div className={styles.sectionText}>{ix.mechanism}</div>
              </div>
            )}
            {ix.safeLimits && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Safe Quantity &amp; Frequency Guidelines</div>
                <div className={`${styles.sectionText} ${styles.limitsBox}`}>{ix.safeLimits}</div>
              </div>
            )}
            {ix.populations && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Special Populations</div>
                <div className={styles.populationGrid}>
                  {Object.entries(ix.populations).map(([pop, text]) => (
                    <div key={pop} className={styles.popCard}>
                      <div className={styles.popLabel}>
                        {pop === 'children' ? '👶 Children' : pop === 'elderly' ? '🧓 Elderly' : '🤰 Pregnancy'}
                      </div>
                      <div className={styles.popText}>{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {ix.sources && (
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Sources</div>
                <ul className={styles.sourceList}>
                  {ix.sources.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.pairDetailBody}>
            <div className={styles.sectionText}>
              We don&apos;t have a documented interaction entry for this combination in our database. This does NOT mean the combination is safe — it may mean it hasn&apos;t been well studied, or these items are unlikely to be used together. Consult a pharmacist before combining.
            </div>
          </div>
        )}
      </details>
    );
  };

  return (
    <div className={styles.multiResultsWrap}>
      {grouped.avoid.length > 0 && (
        <div className={styles.severityGroup}>
          <div className={styles.severityHeader}>🚫 Do Not Combine ({grouped.avoid.length})</div>
          {grouped.avoid.map(renderPair)}
        </div>
      )}

      {grouped.caution.length > 0 && (
        <div className={styles.severityGroup}>
          <div className={styles.severityHeader}>⚠️ Use Caution ({grouped.caution.length})</div>
          {grouped.caution.map(renderPair)}
        </div>
      )}

      {grouped.safe.length > 0 && (
        <div className={styles.severityGroup}>
          <button className={styles.severityToggle} onClick={() => setShowSafe(v => !v)}>
            <span>✅ Safe Combinations ({grouped.safe.length})</span>
            <span>{showSafe ? '↑ Hide' : '↓ Show'}</span>
          </button>
          {showSafe && grouped.safe.map(renderPair)}
        </div>
      )}

      {grouped.nodata.length > 0 && (
        <div className={styles.severityGroup}>
          <button className={styles.severityToggle} onClick={() => setShowNoData(v => !v)}>
            <span>🔍 No Data Available ({grouped.nodata.length})</span>
            <span>{showNoData ? '↑ Hide' : '↓ Show'}</span>
          </button>
          {showNoData && grouped.nodata.map(renderPair)}
        </div>
      )}

      <div className={styles.disclaimer}>
        ⚕️ This information is for reference only and is not a substitute for professional medical advice. Always consult a pharmacist or physician before combining medications, especially if you have health conditions, take prescription medications, are pregnant, breastfeeding, or are administering to a child or older adult.
      </div>
    </div>
  );
}

// ─── AllInteractionsForMed ────────────────────────────────────
function AllInteractionsForMed({ medKey }) {
  const interactions = getInteractionsFor(medKey);
  if (interactions.length === 0) return null;

  return (
    <div className={styles.allInteractionsWrap}>
      <div className={styles.allInteractionsTitle}>
        All known interactions for {MEDS[medKey]?.name}
      </div>
      <div className={styles.allInteractionsList}>
        {interactions.map((ix, i) => {
          const otherKey = ix.drugs.find(d => d !== medKey);
          const otherMed = MEDS[otherKey];
          if (!otherMed) return null;
          const cfg = statusConfig(ix.status);
          return (
            <div key={i} className={styles.allInteractionRow} style={{ borderLeftColor: cfg.color }}>
              <div className={styles.allInteractionHeader}>
                <span className={styles.allInteractionName}>
                  {CATEGORIES[otherMed.category]?.icon} {otherMed.name}
                </span>
                <span className={styles.miniStatus} style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                  {cfg.icon} {cfg.label}
                </span>
              </div>
              <div className={styles.allInteractionSummary}>{ix.summary}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function InteractionCheckerPage() {
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [showAllInteractions, setShowAllInteractions] = useState(false);

  const pharmaCount = selectedMeds.filter(key => {
    const med = MEDS[key];
    if (!med) return false;
    const cat = CATEGORIES[med.category];
    return cat?.sharedCapGroup === 'pharma';
  }).length;

  const pharmaCapReached = pharmaCount >= 2;
  const totalCapReached = selectedMeds.length >= TOTAL_SELECTION_CAP;

  const addMed = (medKey) => {
    if (totalCapReached) return false;
    if (selectedMeds.includes(medKey)) return false;
    const med = MEDS[medKey];
    if (!med) return false;
    const cat = CATEGORIES[med.category];
    if (cat?.sharedCapGroup === 'pharma' && pharmaCapReached) return false;
    setSelectedMeds(prev => [...prev, medKey]);
    return true;
  };

  const removeMed = (medKey) => {
    setSelectedMeds(prev => prev.filter(k => k !== medKey));
  };

  const clearAll = () => {
    setSelectedMeds([]);
    setShowAllInteractions(false);
  };

  // Calculate the overall verdict level so the chips can color themselves
  const verdictLevel = useMemo(() => {
    if (selectedMeds.length < 2) return 'neutral';
    let hasAvoid = false, hasCaution = false, hasSafe = false, hasUnknown = false;
    for (let i = 0; i < selectedMeds.length; i++) {
      for (let j = i + 1; j < selectedMeds.length; j++) {
        const ix = getInteractionBetween(selectedMeds[i], selectedMeds[j]);
        if (!ix) hasUnknown = true;
        else if (ix.status === 'avoid') hasAvoid = true;
        else if (ix.status === 'caution') hasCaution = true;
        else if (ix.status === 'safe') hasSafe = true;
      }
    }
    if (hasAvoid) return 'avoid';
    if (hasCaution) return 'caution';
    if (hasSafe) return 'safe';
    if (hasUnknown) return 'unknown';
    return 'neutral';
  }, [selectedMeds]);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const single = params.get('med');
    if (single && MEDS[single]) {
      setSelectedMeds([single]);
      return;
    }
    const multi = params.get('meds');
    if (multi) {
      const keys = multi.split(',').map(k => k.trim()).filter(k => MEDS[k]);
      if (keys.length > 0) setSelectedMeds(keys.slice(0, TOTAL_SELECTION_CAP));
    }
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/dosage-calculator">Dosage Calculator</Link>
          <span> / </span>
          <span>Interaction Checker</span>
        </div>
        <h1 className={styles.title}>Interaction Checker</h1>
        <p className={styles.subtitle}>
          Check up to {TOTAL_SELECTION_CAP} medications, supplements, herbs, or oils for interactions.
        </p>
      </div>

  

      <div className={styles.layoutRow}>
        <div className={styles.pickerColumn}>
          <MedPicker
            selectedKeys={selectedMeds}
            onAdd={addMed}
            pharmaCount={pharmaCount}
            totalCount={selectedMeds.length}
          />
        </div>
        <div className={styles.stackColumn}>
          {selectedMeds.length >= 2 && (
            <VerdictBanner selectedKeys={selectedMeds} />
          )}
          <SelectedStack
            selectedKeys={selectedMeds}
            onRemove={removeMed}
            onClear={clearAll}
            verdictLevel={verdictLevel}
            singleMedSlot={
              selectedMeds.length === 1 && (
                <div className={styles.singleMedInColumn}>
                  <p className={styles.singleMedHintCompact}>
                    Add a second item above to compare, or:
                  </p>
                  <button
                    className={styles.showAllBtnCompact}
                    onClick={() => setShowAllInteractions(v => !v)}
                  >
                    {showAllInteractions ? '↑ Hide' : '↓ Show'} all interactions for {MEDS[selectedMeds[0]]?.name}
                  </button>
                </div>
              )
            }
          />
          {selectedMeds.length === 1 && showAllInteractions && (
            <AllInteractionsForMed medKey={selectedMeds[0]} />
          )}
        </div>
      </div>

      {selectedMeds.length >= 2 && (
        <MultiPairResults selectedKeys={selectedMeds} />
      )}

      {/* Database expansion banner */}
     <div style={{
        background: '#f5efe7',
        borderLeft: '4px solid #d6a456',
        borderRadius: '0 8px 8px 0',
        padding: '0.7rem 0.95rem',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '0.65rem',
        alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '1rem', lineHeight: 1.4, flexShrink: 0 }}>⏳</span>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#7a5a25', marginBottom: '0.2rem' }}>
            Database actively expanding
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6a5a3a', lineHeight: 1.5 }}>
            We&apos;re growing our catalog of medications, supplements, herbs, and essential oils — plus the interactions between them. Check back as coverage expands.
          </div>
        </div>
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.infoPanelTitle}>About this tool</div>
        <div className={styles.infoPanelGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>📚</div>
            <div>
              <strong>Clinical Sources</strong>
              <div>Interactions sourced from FDA databases, Lexi-Interact (Wolters Kluwer), Stockley&apos;s Drug Interactions, NIH NCCIH, and Natural Medicines Database (2024).</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>⚖️</div>
            <div>
              <strong>Status Levels</strong>
              <div>✅ Safe — generally safe at standard doses. ⚠️ Caution — combine with awareness of limits. 🚫 Avoid — do not combine; significant risk.</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>🔍</div>
            <div>
              <strong>Missing combinations</strong>
              <div>Not all pairs are in our database. No entry doesn&apos;t mean &quot;safe&quot; — it may mean insufficient study data. Always consult a pharmacist.</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}><DosageCalculatorIcon size={24} /></div>
            <div>
              <strong>Go to Dosage Calculator</strong>
              <div>Need weight-based dosing for a specific medication?{' '}
                <Link href="/dosage-calculator" className={styles.calcLink}>Use the Dosage Calculator</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}