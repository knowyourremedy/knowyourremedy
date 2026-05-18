export default function RemedyDisclaimer({ message }: { message?: string }) {
  return (
    <div style={{
      backgroundColor: '#fffbeb',
      border: '1px solid #f0c040',
      borderLeft: '4px solid #f0c040',
      borderRadius: '8px',
      padding: '1.25rem 1.5rem',
      margin: '2rem 0',
      fontSize: '0.875rem',
      color: '#5a4a00',
      lineHeight: '1.7',
      fontFamily: 'var(--font-inter), sans-serif'
    }}>
      <strong style={{ fontWeight: '600' }}>⚠️ Important Disclaimer:</strong> {message || 'The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor or qualified health provider before starting any new treatment. Never disregard professional medical advice or delay seeking it because of something you read on this website.'}
    </div>
  )
}