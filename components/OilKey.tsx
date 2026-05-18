export default function OilKey() {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e8e0d0',
      borderRadius: '12px',
      padding: '1.25rem 1.5rem',
      marginBottom: '2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontWeight: '700',
        color: '#2d4a3e',
        marginBottom: '0.875rem',
        fontSize: '1rem'
      }}>
        Essential Oil Safety Key
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {[
          { badge: '🟢 Internal Only', color: '#27ae60' },
          { badge: '🟡 Dilute First', color: '#f39c12' },
          { badge: '🔵 External Only', color: '#2980b9' },
          { badge: '🏠 Home Remedy', color: '#7f8c8d' },
          { badge: '⚫ Avoid', color: '#2c3e50' },
        ].map((item) => (
          <span key={item.badge} style={{
            backgroundColor: item.color,
            color: '#fff',
            padding: '4px 14px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: '600',
            fontFamily: 'var(--font-inter), sans-serif'
          }}>
            {item.badge}
          </span>
        ))}
      </div>
    </div>
  )
}