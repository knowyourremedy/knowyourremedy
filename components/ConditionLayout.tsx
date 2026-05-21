import Footer from './Footer'

export default function ConditionLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#faf7f2',
    }}>
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {children}
      </div>
      <Footer />
    </main>
  )
}