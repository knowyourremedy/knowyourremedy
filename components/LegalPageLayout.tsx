'use client'

import Link from 'next/link'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#fafaf7]">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        
        {/* Back link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-[#2d4a3e] hover:text-[#1f3329] mb-12 transition-colors"
        >
          ← Back to KnowYourRemedy
        </Link>

        {/* Header */}
        <header className="mb-12 pb-8 border-b border-[#e5e3dc]">
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1a1a1a] mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-[#6b6b6b]">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Draft notice */}
        <div className="mb-12 p-5 bg-[#fef7e6] border-l-4 border-[#e67e22] rounded-r-md">
          <p className="text-sm text-[#5c4a1f] leading-relaxed">
            <strong className="font-semibold">Draft notice:</strong> This document is currently in draft form pending review by a licensed healthcare attorney prior to public launch. The substance of the agreement is in effect, but specific language may be refined.
          </p>
        </div>

        {/* Content */}
        <article className="legal-content text-[#2a2a2a] leading-[1.75]">
          {children}
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#e5e3dc] text-sm text-[#6b6b6b]">
          <p className="mb-2">
            Questions about this document? Contact us at{' '}
            <a 
              href="mailto:hello@knowyourremedy.com" 
              className="text-[#2d4a3e] underline hover:text-[#1f3329]"
            >
              hello@knowyourremedy.com
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} KnowYourRemedy. All rights reserved.
          </p>
        </footer>

      </div>

      <style jsx global>{`
        .legal-content h2 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 1.625rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-top: 3rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .legal-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .legal-content p {
          margin-bottom: 1.25rem;
        }
        .legal-content ul {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .legal-content li {
          margin-bottom: 0.5rem;
        }
        .legal-content strong {
          color: #1a1a1a;
          font-weight: 600;
        }
        .legal-content a {
          color: #2d4a3e;
          text-decoration: underline;
        }
        .legal-content a:hover {
          color: #1f3329;
        }
      `}</style>
    </main>
  )
}