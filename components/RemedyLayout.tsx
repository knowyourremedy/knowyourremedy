import Nav from './Nav'
import Footer from './Footer'

export default function RemedyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#faf7f2',
    }}>
      <Nav />
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