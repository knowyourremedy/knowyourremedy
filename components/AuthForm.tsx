'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

// =====================================================
// FOUNDING MEMBER CONFIG
// Set FOUNDING_MEMBER_DEADLINE to null to hide the date.
// When the founding member period ends, change this to null
// and the offer card will automatically swap to standard pricing.
// =====================================================
const FOUNDING_MEMBER_DEADLINE: Date | null = new Date('2027-06-30T23:59:59')

const formatDeadline = (date: Date | null): string | null => {
  if (!date) return null
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const isFoundingMemberPeriodActive = (): boolean => {
  if (!FOUNDING_MEMBER_DEADLINE) return false
  return new Date() < FOUNDING_MEMBER_DEADLINE
}

type Mode = 'signup' | 'login'
type Tier = 'free' | 'premium'

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [isGuardian, setIsGuardian] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)

  const calculateAge = (dob: string): number => {
    if (!dob) return 0
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const age = calculateAge(dateOfBirth)
  const isMinor = dateOfBirth !== '' && age < 18
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPassword = password.length >= 8

  const canSubmitSignup =
    isValidEmail &&
    isValidPassword &&
    dateOfBirth !== '' &&
    (isMinor ? isGuardian : true) &&
    agreedToTerms &&
    selectedTier !== null &&
    !loading

  const canSubmitLogin = isValidEmail && password.length > 0 && !loading

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setLoading(true)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) throw signUpError

      if (data.user) {
        const now = new Date().toISOString()

        // Build the update payload and log it so we can see what's being sent
        const updatePayload = {
          date_of_birth: dateOfBirth,
          is_guardian: isMinor ? false : isGuardian,
          terms_agreed_at: now,
          terms_version: 1,
          privacy_agreed_at: now,
          privacy_version: 1,
          is_founding_member: true,
          subscription_tier: 'free',
          selected_tier_at_signup: selectedTier,
        }
        console.log('🟢 Signup payload:', updatePayload)
        console.log('🟢 User ID:', data.user.id)
        console.log('🟢 selectedTier value at write time:', selectedTier)
        console.log('🟢 dateOfBirth value at write time:', dateOfBirth)

       // Use upsert to handle race condition with the auto-create trigger.
        // If the trigger has already created the profile row, this updates it.
        // If the trigger hasn't fired yet, this creates the row.
        const upsertPayload = {
            id: data.user.id,
            email: data.user.email,
            ...updatePayload,
          }
  
          const { data: updateData, error: profileError } = await supabase
            .from('profiles')
            .upsert(upsertPayload, { onConflict: 'id' })
            .select()

        console.log('🟢 Update returned data:', updateData)
        console.log('🟢 Update returned error:', profileError)

        if (profileError) {
          console.error('❌ Profile update error:', profileError)
        }
      }

      const successText = selectedTier === 'premium'
        ? "Account created. Check your email to confirm, then we'll walk you through upgrading to Premium."
        : "Account created. Check your email for a confirmation link to finish signing in."

      setSuccessMessage(successText)
      setEmail('')
      setPassword('')
      setDateOfBirth('')
      setIsGuardian(false)
      setAgreedToTerms(false)
      setSelectedTier(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      window.location.reload()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid email or password.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fafaf7]">
      <div className="max-w-md mx-auto px-6 py-12 sm:py-20">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#2d4a3e] hover:text-[#1f3329] mb-10 transition-colors"
        >
          ← Back to KnowYourRemedy
        </Link>

        {/* Card */}
        <div className="bg-white rounded-xl border border-[#e5e3dc] shadow-sm overflow-hidden">

          {/* Tab toggle */}
          <div className="flex border-b border-[#e5e3dc]">
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null) }}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-[#2d4a3e] text-white'
                  : 'bg-white text-[#6b6b6b] hover:text-[#2d4a3e]'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); setSuccessMessage(null) }}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-[#2d4a3e] text-white'
                  : 'bg-white text-[#6b6b6b] hover:text-[#2d4a3e]'
              }`}
            >
              Log In
            </button>
          </div>

          <div className="p-8">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-serif text-[#1a1a1a] mb-2">
                {mode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-[#6b6b6b]">
                {mode === 'signup'
                  ? 'Track your family\'s health and unlock premium features.'
                  : 'Log in to your KnowYourRemedy account.'}
              </p>
            </div>

            {/* Tier comparison — only on signup */}
            {mode === 'signup' && (
              <div className="mb-6">

                {/* Header */}
                <div className="text-center mb-3">
                  <p className="text-[11px] text-[#6b6b6b] uppercase tracking-wide font-medium">
                    Pick where to start
                  </p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">
                    You can upgrade or downgrade anytime
                  </p>
                </div>

                {/* Founding member headline banner */}
                {isFoundingMemberPeriodActive() && (
                  <div className="mb-3 px-4 py-2.5 bg-[#2d4a3e] rounded-md text-center">
                    <p className="text-sm font-semibold text-white">
                      🌿 Founding Member — Lock in $10/year for life
                    </p>
                  </div>
                )}

                {/* Two-column grid */}
                <div className="grid grid-cols-2 gap-2">

                  {/* Free column — clickable */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier('free')}
                    className={`text-left rounded-md p-3.5 transition-all ${
                      selectedTier === 'free'
                        ? 'bg-white border-2 border-[#2d4a3e] shadow-sm'
                        : 'bg-white border border-[#d9d4c5] hover:border-[#2d4a3e] hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] text-[#6b6b6b] uppercase tracking-wide font-medium">
                        Free Forever
                      </p>
                      {selectedTier === 'free' && (
                        <span className="text-[#2d4a3e] text-sm font-bold">✓</span>
                      )}
                    </div>
                    <p className="text-lg font-medium text-[#1a1a1a] mb-3">
                      $0
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#2a2a2a]">
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">✓</span><span>All 31 remedy pages</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">✓</span><span>Dosage calculator</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">✓</span><span>Interaction checker</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">✓</span><span>Pregnancy indicators</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">✓</span><span>Personal profile</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">✓</span><span>Basic dose tracking</span></li>
                    </ul>
                  </button>

                  {/* Premium column — clickable */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier('premium')}
                    className={`text-left rounded-md p-3.5 transition-all ${
                      selectedTier === 'premium'
                        ? 'bg-[#f4f1ea] border-2 border-[#2d4a3e] shadow-sm'
                        : isFoundingMemberPeriodActive()
                          ? 'bg-[#f4f1ea] border-2 border-[#2d4a3e] hover:shadow-sm'
                          : 'bg-[#f4f1ea] border border-[#d9d4c5] hover:border-[#2d4a3e] hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] text-[#2d4a3e] uppercase tracking-wide font-medium">
                        Premium
                      </p>
                      {selectedTier === 'premium' && (
                        <span className="text-[#2d4a3e] text-sm font-bold">✓</span>
                      )}
                    </div>
                    <p className="text-lg font-medium text-[#1a1a1a] mb-3">
                      $10<span className="text-xs text-[#6b6b6b] font-normal">/year{isFoundingMemberPeriodActive() ? ' for life' : ''}</span>
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#2a2a2a]">
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">✓</span><span>Everything in Free</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">+</span><span>Family profiles</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">+</span><span>Dose reminders & alerts</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">+</span><span>Medicine cabinet tracker</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">+</span><span>Medication journal</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">+</span><span>Refill reminders</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">+</span><span>Caregiver sharing</span></li>
                      <li className="flex items-start gap-1.5"><span className="text-[#2d4a3e] mt-0.5">+</span><span>Early app access</span></li>
                    </ul>
                  </button>

                </div>

                {/* Selection hint */}
                {selectedTier === null && (
                  <p className="text-[11px] text-[#8b8b8b] text-center mt-2">
                    ↑ Click one to choose where to start
                  </p>
                )}

                {/* Founding member footnote */}
                {isFoundingMemberPeriodActive() && (
                  <p className="text-xs text-[#5c5c5c] text-center mt-3 leading-relaxed">
                    If we ever raise our price, <strong className="font-semibold text-[#2d4a3e]">founding members keep their original rate forever</strong>.
                    {formatDeadline(FOUNDING_MEMBER_DEADLINE) && (
                      <span className="block text-[11px] text-[#8b8b8b] mt-1">
                        Available through {formatDeadline(FOUNDING_MEMBER_DEADLINE)}.
                      </span>
                    )}
                  </p>
                )}

              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-[#fdecea] border border-[#f5c6c1] rounded-md">
                <p className="text-sm text-[#8a2a1f]">{error}</p>
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-[#e8f3ec] border border-[#b8d9c2] rounded-md">
                <p className="text-sm text-[#1f5132]">{successMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={mode === 'signup' ? handleSignUp : handleLogIn} className="space-y-4">

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#3a3a3a] mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#d4d1c5] rounded-md text-sm focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-colors"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-[#3a3a3a] mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#d4d1c5] rounded-md text-sm focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-colors"
                  placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required
                />
                {mode === 'signup' && password.length > 0 && password.length < 8 && (
                  <p className="text-xs text-[#a04545] mt-1">Password must be at least 8 characters.</p>
                )}
              </div>

              {/* Signup-only fields */}
              {mode === 'signup' && (
                <>
                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dob" className="block text-xs font-semibold text-[#3a3a3a] mb-1.5 uppercase tracking-wide">
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2.5 border border-[#d4d1c5] rounded-md text-sm focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-colors"
                      required
                    />
                  </div>

                  {/* Guardian checkbox — only appears if user is under 18 */}
                  {isMinor && (
                    <div className="p-3 bg-[#fef7e6] border border-[#f0d99a] rounded-md">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isGuardian}
                          onChange={(e) => setIsGuardian(e.target.checked)}
                          className="mt-0.5 w-4 h-4 accent-[#2d4a3e]"
                        />
                        <span className="text-xs text-[#5c4a1f] leading-relaxed">
                          I confirm that my parent or legal guardian is present and has agreed to these Terms on my behalf.
                        </span>
                      </label>
                    </div>
                  )}

                  {/* ToS + Privacy checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#2d4a3e]"
                      />
                      <span className="text-xs text-[#3a3a3a] leading-relaxed">
                        I am 18 years of age or older, or a parent/legal guardian creating this account on behalf of a minor. I have read and agree to the{' '}
                        <Link href="/terms" target="_blank" className="text-[#2d4a3e] underline hover:text-[#1f3329]">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" target="_blank" className="text-[#2d4a3e] underline hover:text-[#1f3329]">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                </>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={mode === 'signup' ? !canSubmitSignup : !canSubmitLogin}
                className="w-full py-3 bg-[#2d4a3e] text-white text-sm font-semibold rounded-md hover:bg-[#1f3329] disabled:bg-[#c0bdb1] disabled:cursor-not-allowed transition-colors"
              >
                {loading
                  ? (mode === 'signup' ? 'Creating account...' : 'Logging in...')
                  : (mode === 'signup' ? 'Create Account' : 'Log In')}
              </button>

              {/* Forgot password — only on login */}
              {mode === 'login' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!email) {
                        setError('Enter your email above first, then click Forgot password.')
                        return
                      }
                      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: `${window.location.origin}/account`,
                      })
                      if (resetError) {
                        setError(resetError.message)
                      } else {
                        setSuccessMessage('Password reset email sent. Check your inbox.')
                      }
                    }}
                    className="text-xs text-[#2d4a3e] underline hover:text-[#1f3329]"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Helper text below card */}
        <p className="text-xs text-[#8b8b8b] text-center mt-6">
          By using KnowYourRemedy you agree that the information on this site is for reference only and is not a substitute for professional medical advice.
        </p>

      </div>
    </main>
  )
}