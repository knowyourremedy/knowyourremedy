import Nav from './Nav'
import Footer from './Footer'

export default function RemedyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#faf7f2',
      fontFamily: 'Georgia, serif'
    }}>
      <Nav />
      {children}
      <Footer />
    </main>
  )
}