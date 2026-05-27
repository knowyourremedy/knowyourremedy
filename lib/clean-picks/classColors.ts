// ─── Active-ingredient class color mapping ─────────────────
// Used to color-code Clean Picks cards by drug class.
// Each entry: { bar, label, tagBg, tagText }
//   bar     = top-of-card color band
//   label   = small-caps "ACTIVE INGREDIENT" line color
//   tagBg   = class tag chip background
//   tagText = class tag chip text color

export const CLASS_COLORS = {
  // ─── Pain & Fever classes ───
  nsaidOral: {
    bar: '#185FA5',
    label: '#185FA5',
    tagBg: '#E6F1FB',
    tagText: '#0C447C',
  },
  acetaminophen: {
    bar: '#3B6D11',
    label: '#3B6D11',
    tagBg: '#EAF3DE',
    tagText: '#173404',
  },
  pediatricNsaid: {
    bar: '#1D9E75',
    label: '#0F6E56',
    tagBg: '#E1F5EE',
    tagText: '#04342C',
  },
  topicalNsaid: {
    bar: '#7F77DD',
    label: '#534AB7',
    tagBg: '#EEEDFE',
    tagText: '#26215C',
  },
  topicalDrugFree: {
    bar: '#D4537E',
    label: '#993556',
    tagBg: '#FBEAF0',
    tagText: '#4B1528',
  },
  homeopathic: {
    bar: '#BA7517',
    label: '#854F0B',
    tagBg: '#FAEEDA',
    tagText: '#412402',
  },

  // ─── Cold & Flu classes ───
  expectorant: {
    bar: '#0E7490',
    label: '#0E7490',
    tagBg: '#E0F2FE',
    tagText: '#0C4A6E',
  },
  homeopathicLow: {
    bar: '#9333EA',
    label: '#7E22CE',
    tagBg: '#F3E8FF',
    tagText: '#581C87',
  },
  immuneHerbal: {
    bar: '#15803D',
    label: '#15803D',
    tagBg: '#DCFCE7',
    tagText: '#14532D',
  },
  propolis: {
    bar: '#CA8A04',
    label: '#A16207',
    tagBg: '#FEF3C7',
    tagText: '#713F12',
  },
  pediatricCombo: {
    bar: '#0891B2',
    label: '#0E7490',
    tagBg: '#CFFAFE',
    tagText: '#164E63',
  },
  elderberry: {
    bar: '#7C2D12',
    label: '#7C2D12',
    tagBg: '#FED7AA',
    tagText: '#431407',
  },
  topicalChestRub: {
    bar: '#0F766E',
    label: '#115E59',
    tagBg: '#CCFBF1',
    tagText: '#134E4A',
  },
};

// ─── Top Pick badge labels ────────────────────────────────
export const TOP_PICK_LABELS = {
  oral: '⭐ ORAL PICK',
  kids: '⭐ KIDS PICK',
  topical: '⭐ TOPICAL PICK',
};