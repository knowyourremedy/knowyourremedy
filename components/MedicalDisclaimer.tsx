export default function MedicalDisclaimer() {
  return (
    <div style={{
      backgroundColor: '#fffbeb',
      border: '1px solid #f0c040',
      borderLeft: '4px solid #f0c040',
      borderRadius: '8px',
      padding: '1rem 1.5rem',
      marginBottom: '2rem',
      fontSize: '0.8rem',
      color: '#5a4a00',
      lineHeight: '1.6',
      fontFamily: 'var(--font-inter), sans-serif'
    }}>
      <strong style={{ fontWeight: '600' }}>Medical Disclaimer:</strong> The statements on this page have not been evaluated by the Food and Drug Administration. The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease or health condition. Always consult a qualified healthcare professional before starting any new treatment, supplement, or health regimen. KnowYourRemedy.com is not responsible for any adverse effects or consequences resulting from the use of any suggestions described on this website.
    </div>
  )
}