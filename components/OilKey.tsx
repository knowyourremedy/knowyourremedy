export default function OilKey() {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e8e0d0',
        borderRadius: '8px',
        padding: '1rem 1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Essential Oil Safety Key</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.85rem' }}>
          <span style={{ backgroundColor: '#27ae60', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>🟢 Internal Only</span>
          <span style={{ backgroundColor: '#f39c12', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>🟡 Dilute First</span>
          <span style={{ backgroundColor: '#2980b9', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>🔵 External Only</span>
          <span style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>⚫ Avoid</span>
        </div>
      </div>
    )
  }