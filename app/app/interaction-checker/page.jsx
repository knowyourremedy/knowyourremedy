'use client';
// app/interaction-checker/page.jsx
// Drop this file at: app/interaction-checker/page.jsx
// CSS module at:     app/interaction-checker/InteractionChecker.module.css
// Data files:        lib/medsData.js  +  lib/interactionData.js

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MEDS, CATEGORIES } from '../../lib/medsData';
import {
  INTERACTIONS,
  getInteractionsFor,
  getInteractionBetween,
  statusConfig,
} from '../../lib/interactionData';
import styles from './InteractionChecker.module.css';

// ─── helpers ────────────────────────────────────────────────
function buildMedList() {
  // Group meds by category, sorted alphabetically within each group
  const grouped = {};
  Object.entries(CATEGORIES).forEach(([catKey, catMeta]) => {
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
function MedPicker({ label, value, onChange, exclude }) {
  const grouped = useMemo(() => buildMedList(), []);
  const [activeCat, setActiveCat] = useState(Object.keys(CATEGORIES)[0]);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (search.trim().length > 1) {
      return ALL_MEDS_FLAT.filter(
        m =>
          m.key !== exclude &&
          (m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.brand.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return (grouped[activeCat] || []).filter(m => m.key !== exclude);
  }, [search, activeCat, grouped, exclude]);

  const selectedMed = value ? MEDS[value] : null;

  return (
    <div className={styles.pickerWrap}>
      <div className={styles.pickerLabel}>{label}</div>

      {selectedMed ? (
        <div className={styles.selectedBadge}>
          <span>{CATEGORIES[selectedMed.category]?.icon} {selectedMed.name}</span>
          <span className={styles.selectedBrand}>{selectedMed.brand}</span>
          <button className={styles.clearBtn} onClick={() => onChange(null)}>✕</button>
        </div>
      ) : (
        <div className={styles.pickerInner}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or brand…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />

          {/* Category tabs — hide when searching */}
          {search.trim().length < 2 && (
            <div className={styles.catTabs}>
              {Object.entries(CATEGORIES).map(([k, v]) => (
                <button
                  key={k}
                  className={`${styles.catTab} ${activeCat === k ? styles.catTabActive : ''}`}
                  onClick={() => setActiveCat(k)}
                >
                  {v.icon} {v.label}
                </button>
              ))}
            </div>
          )}

          {/* Med list */}
          <div className={styles.medList}>
            {filtered.length === 0 && (
              <div className={styles.emptyMsg}>No medications found.</div>
            )}
            {filtered.map(m => (
              <button
                key={m.key}
                className={styles.medOption}
                onClick={() => { onChange(m.key); setSearch(''); }}
              >
                <span className={styles.medOptionName}>{m.name}</span>
                <span className={styles.medOptionBrand}>{m.brand}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── InteractionResult ────────────────────────────────────────
function InteractionResult({ medA, medB }) {
  if (!medA || !medB) return null;

  const interaction = getInteractionBetween(medA, medB);
  const medAData = MEDS[medA];
  const medBData = MEDS[medB];
  const cfg = interaction ? statusConfig(interaction.status) : null;

  return (
    <div className={styles.resultWrap}>
      <div className={styles.resultPair}>
        <span>{CATEGORIES[medAData.category]?.icon} {medAData.name}</span>
        <span className={styles.plusSign}>+</span>
        <span>{CATEGORIES[medBData.category]?.icon} {medBData.name}</span>
      </div>

      {!interaction ? (
        <div className={styles.noDataCard}>
          <div className={styles.noDataIcon}>🔍</div>
          <div className={styles.noDataTitle}>No specific interaction data found</div>
          <div className={styles.noDataText}>
            We don't have a documented interaction entry for this combination in our database.
            This does not mean the combination is safe — it may mean it hasn't been well-studied,
            or these two medications are unlikely to be used together. Always consult a pharmacist
            or physician before combining medications, supplements, or herbal remedies.
          </div>
        </div>
      ) : (
        <div className={styles.interactionCard}>
          {/* Status badge */}
          <div
            className={styles.statusBadge}
            style={{ backgroundColor: cfg.bg, color: cfg.color, borderColor: cfg.color }}
          >
            <span className={styles.statusIcon}>{cfg.icon}</span>
            <span className={styles.statusLabel}>{cfg.label}</span>
          </div>

          {/* Summary */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Summary</div>
            <div className={styles.sectionText}>{interaction.summary}</div>
          </div>

          {/* Mechanism */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>How the Interaction Works</div>
            <div className={styles.sectionText}>{interaction.mechanism}</div>
          </div>

          {/* Safe limits */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Safe Quantity & Frequency Guidelines</div>
            <div className={`${styles.sectionText} ${styles.limitsBox}`}>{interaction.safeLimits}</div>
          </div>

          {/* Special populations */}
          {interaction.populations && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Special Populations</div>
              <div className={styles.populationGrid}>
                {Object.entries(interaction.populations).map(([pop, text]) => (
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

          {/* Sources */}
          {interaction.sources && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Sources</div>
              <ul className={styles.sourceList}>
                {interaction.sources.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <div className={styles.disclaimer}>
            ⚕️ This information is for reference only and is not a substitute for professional
            medical advice. Always consult a pharmacist or physician before combining medications,
            especially if you have health conditions or take prescription medications.
          </div>
        </div>
      )}
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
                <span
                  className={styles.miniStatus}
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}
                >
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
  const [medA, setMedA] = useState(null);
  const [medB, setMedB] = useState(null);
  const [showAllA, setShowAllA] = useState(false);

  // Support URL params for pre-fill from calculator
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pre = params.get('med');
    if (pre && MEDS[pre]) setMedA(pre);
  }, []);

  const handleCheckAnother = () => {
    setMedA(medB);
    setMedB(null);
  };

  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/dosage-calculator">Dosage Calculator</Link>
          <span> / </span>
          <span>Interaction Checker</span>
        </div>
        <h1 className={styles.title}>Drug & Remedy Interaction Checker</h1>
        <p className={styles.subtitle}>
          Select two medications, supplements, or herbal remedies to check if they are
          safe to use together — including at what doses and how many times per day.
        </p>
      </div>

      {/* Pickers */}
      <div className={styles.pickerRow}>
        <MedPicker
          label="First medication / remedy"
          value={medA}
          onChange={key => { setMedA(key); setShowAllA(false); }}
          exclude={medB}
        />

        <div className={styles.vsBlock}>
          <div className={styles.vsCircle}>VS</div>
        </div>

        <MedPicker
          label="Second medication / remedy"
          value={medB}
          onChange={setMedB}
          exclude={medA}
        />
      </div>

      {/* Result */}
      {medA && medB && (
        <>
          <InteractionResult medA={medA} medB={medB} />
          <div className={styles.actionRow}>
            <button className={styles.checkAnotherBtn} onClick={handleCheckAnother}>
              Check Another Combination
            </button>
            <button className={styles.clearAllBtn} onClick={() => { setMedA(null); setMedB(null); }}>
              Clear All
            </button>
          </div>
        </>
      )}

      {/* All interactions for first med */}
      {medA && !medB && (
        <div className={styles.singleMedSection}>
          <p className={styles.singleMedHint}>
            Select a second medication above to check compatibility, or view all known
            interactions for <strong>{MEDS[medA]?.name}</strong>:
          </p>
          <button
            className={styles.showAllBtn}
            onClick={() => setShowAllA(v => !v)}
          >
            {showAllA ? 'Hide' : 'Show'} all interactions for {MEDS[medA]?.name}
          </button>
          {showAllA && <AllInteractionsForMed medKey={medA} />}
        </div>
      )}

      {/* Info panel */}
      <div className={styles.infoPanel}>
        <div className={styles.infoPanelTitle}>About this tool</div>
        <div className={styles.infoPanelGrid}>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>📚</div>
            <div>
              <strong>Clinical Sources</strong>
              <div>Interactions sourced from FDA databases, Lexi-Interact (Wolters Kluwer),
              Stockley's Drug Interactions, NIH NCCIH, and Natural Medicines Database (2024).</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>⚖️</div>
            <div>
              <strong>Status Levels</strong>
              <div>✅ Safe — generally safe at standard doses. ⚠️ Caution — combine with
              awareness of limits. 🚫 Avoid — do not combine; significant risk.</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>🔍</div>
            <div>
              <strong>Missing combinations</strong>
              <div>Not all pairs are in our database. No entry doesn't mean "safe" — it may
              mean insufficient study data. Always consult a pharmacist.</div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoItemIcon}>💊</div>
            <div>
              <strong>Go to Dosage Calculator</strong>
              <div>Need weight-based dosing for a specific medication?{' '}
              <Link href="/dosage-calculator" className={styles.calcLink}>
                Use the Dosage Calculator
              </Link>.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
