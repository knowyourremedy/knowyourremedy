// ─── Verdict labels & colors — SINGLE SOURCE OF TRUTH ──────
// Every badge, card, and page should import from here instead
// of typing "Clean" / "Caution" / "Avoid" directly.
// If the wording ever needs to change (e.g. legal review),
// change it ONCE here and it updates everywhere.

export type Verdict = 'clean' | 'caution' | 'avoid';

export const VERDICT_LABELS: Record<Verdict, string> = {
  clean: 'Clean',
  caution: 'Caution',
  avoid: 'Avoid',
};

export const VERDICT_COLORS: Record<Verdict, string> = {
  clean: '#27ae60',
  caution: '#d97706',
  avoid: '#c0392b',
};
