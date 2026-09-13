// ─── Verdict labels & colors — SINGLE SOURCE OF TRUTH ──────
// Internal keys stay 'clean' | 'caution' | 'avoid'.
// Display lock: Clean / Usable / Not clean.
// Do not rewrite draft files to a new verdict key.

export type Verdict = 'clean' | 'caution' | 'avoid';

export const VERDICT_LABELS: Record<Verdict, string> = {
  clean: 'Clean',
  caution: 'Usable',
  avoid: 'Not clean',
};

export const VERDICT_SUBLINES: Record<Verdict, string | null> = {
  clean: null,
  caution: 'Fine in moderation',
  avoid: null,
};

export const VERDICT_COLORS: Record<Verdict, string> = {
  clean: '#27ae60',
  caution: '#d97706',
  avoid: '#c0392b',
};
