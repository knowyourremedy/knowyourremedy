'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AuthModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmSent, setConfirmSent] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setConfirmSent(true)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        onSuccess()
      }
    }
    setLoading(false)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        {confirmSent ? (
          <>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📬</div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#2d4a3e',
              fontSize: '1.25rem',
              marginBottom: '0.75rem',
              marginTop: 0,
            }}>Check your email</h2>
            <p style={{ fontSize: '0.88rem', color: '#5a7a6e', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and you're all set.
            </p>
            <button onClick={onClose} style={{
              width: '100%',
              padding: '0.85rem',
              backgroundColor: '#2d4a3e',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              Got it
            </button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                color: '#2d4a3e',
                fontSize: '1.25rem',
                margin: 0,
              }}>
                {mode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h2>
              <button onClick={onClose} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1.25rem', color: '#9ca3af',
              }}>✕</button>
            </div>

            {mode === 'signup' && (
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                fontSize: '0.82rem',
                color: '#166534',
                lineHeight: '1.6',
                marginBottom: '1.25rem',
              }}>
                🎉 Sign up now and lock in <strong>$10/year forever</strong> — founding member pricing, guaranteed for life.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.35rem' }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-inter), sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.35rem' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-inter), sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.82rem',
                color: '#7f1d1d',
                marginBottom: '1rem',
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: loading || !email || !password ? '#9ca3af' : '#2d4a3e',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                marginBottom: '1rem',
              }}
            >
              {loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Log in'}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#6b7280' }}>
              {mode === 'signup' ? (
                <>Already have an account?{' '}
                  <button onClick={() => { setMode('login'); setError('') }} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#2d4a3e', fontWeight: '600', fontSize: '0.82rem',
                  }}>Log in</button>
                </>
              ) : (
                <>Don't have an account?{' '}
                  <button onClick={() => { setMode('signup'); setError('') }} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#2d4a3e', fontWeight: '600', fontSize: '0.82rem',
                  }}>Sign up free</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}