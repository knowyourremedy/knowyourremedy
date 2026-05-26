// ─── Active-ingredient class color mapping ─────────────────
// Used to color-code Clean Picks cards by drug class.
// Each entry: { bar, label, tagBg, tagText }
//   bar     = top-of-card color band
//   label   = small-caps "ACTIVE INGREDIENT" line color
//   tagBg   = class tag chip background
//   tagText = class tag chip text color

export const CLASS_COLORS = {
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
  };
  
  // ─── Top Pick badge labels ────────────────────────────────
  export const TOP_PICK_LABELS = {
    oral: '⭐ ORAL PICK',
    kids: '⭐ KIDS PICK',
    topical: '⭐ TOPICAL PICK',
  };