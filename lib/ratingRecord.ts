// ─── Rating Record — THE APP'S BRAIN (Section 5) ────────────
// This is the canonical shape for every rated product. It is
// designed to copy-paste into a Supabase table later without
// restructuring. Clean Picks data files (lib/clean-picks/*)
// are a lighter-weight display layer for now — this is the
// full record shape they will eventually be generated from.

import type { Verdict } from './clean-picks/verdictLabels';

// ─── Per-ingredient risk (Methodology v1.3 four-tier scale) ─
export type RiskLevel = 'cleared' | 'limited' | 'moderate' | 'high';

export type IngredientFlag = {
  name: string;
  riskLevel: RiskLevel;
  source?: string;       // citation for this specific flag (omit only if cleared)
};

// ─── Active ingredient + strength (supports combo products) ─
export type ActiveIngredient = {
  name: string;
  strength: string;      // e.g. "500mg", "160mg / 5mL"
};

// ─── Active-safety cap (Methodology v1.3 §4) ────────────────
export type ActiveSafetyFlag = {
  description: string;   // e.g. "Argyria risk — cumulative, no safe threshold"
  cappedAt: 'caution' | 'avoid';
  source: string;
};

// ─── Product images (Section 6 — catalog-first, hard requirement) ─
export type ProductImage = {
  url: string;
  source: 'catalog' | 'user';
  verifiedSku: boolean;  // true only if image is confirmed matched to exact barcode/SKU
};

// ─── Clean alternative reference (Section 6 — ranked swaps) ─
export type CleanAlternative = {
  productId: string;     // id of the swap-to product's RatingRecord
  rankReason: string;    // e.g. "Same active ingredient, same-store availability"
};

// ─── THE RECORD ──────────────────────────────────────────────
export type RatingRecord = {
  id: string;             // stable unique id (slug-style, e.g. "genexa-acetaminophen-es")
  productName: string;
  brand: string;
  category: string;       // e.g. "Pain & Fever", "Cold & Flu"
  barcode?: string;       // UPC — added later, Phase 2 scanner target

  activeIngredients: ActiveIngredient[];
  inactiveIngredients: IngredientFlag[];
  activeSafetyFlag?: ActiveSafetyFlag;

  verdict: Verdict;       // 'clean' | 'caution' | 'avoid' — from verdictLabels.ts
  honestNote?: string;

  retailers: string[];

  productImage?: ProductImage;
  userPhotos?: ProductImage[];
  cleanAlternatives?: CleanAlternative[];

  sourcesGeneral?: string[]; // any additional citations not tied to a specific ingredient
};