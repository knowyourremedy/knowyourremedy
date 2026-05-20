'use client'

import { useEffect, useState } from 'react'
import AuthForm from '@/components/AuthForm'
import AccountDashboard from '@/components/AccountDashboard'
import { supabase } from '@/lib/supabase'

export default function AccountPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{
    id: string
    email: string
    emailVerified: boolean
  } | null>(null)

  useEffect(() => {
    // Check current auth state on mount
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          emailVerified: session.user.email_confirmed_at !== null && session.user.email_confirmed_at !== undefined,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    }

    checkAuth()

    // Listen for auth state changes (login, logout, etc.) so the page updates instantly
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          emailVerified: session.user.email_confirmed_at !== null && session.user.email_confirmed_at !== undefined,
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafaf7] flex items-center justify-center">
        <p className="text-sm text-[#6b6b6b]">Loading...</p>
      </main>
    )
  }

  if (user) {
    return (
      <AccountDashboard
        userId={user.id}
        userEmail={user.email}
        emailVerified={user.emailVerified}
      />
    )
  }

  return <AuthForm />
}