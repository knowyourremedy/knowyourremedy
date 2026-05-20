'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Profile = {
  id: string
  email: string
  date_of_birth: string | null
  is_guardian: boolean | null
  terms_agreed_at: string | null
  privacy_agreed_at: string | null
  is_founding_member: boolean | null
  subscription_tier: 'free' | 'premium' | null
  selected_tier_at_signup: 'free' | 'premium' | null
  subscription_started_at: string | null
  created_at: string
}

type FamilyProfile = {
  id: string
  user_id: string
  name: string
  date_of_birth: string | null
  weight_lbs: number | null
  relationship: string | null
  notes: string | null
  is_pregnant: boolean | null
  created_at: string
}

type DoseLog = {
  id: string
  user_id: string
  family_profile_id: string | null
  medication_name: string
  dose_amount: string | null
  taken_at: string
  notes: string | null
}

type SavedRemedy = {
  id: string
  user_id: string
  remedy_slug: string
  remedy_title: string | null
  saved_at: string
}

interface AccountDashboardProps {
  userId: string
  userEmail: string
  emailVerified: boolean
}

export default function AccountDashboard({ userId, userEmail, emailVerified }: AccountDashboardProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [familyProfiles, setFamilyProfiles] = useState<FamilyProfile[]>([])
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([])
  const [savedRemedies, setSavedRemedies] = useState<SavedRemedy[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddProfile, setShowAddProfile] = useState(false)
  const [showVerifyBanner, setShowVerifyBanner] = useState(!emailVerified)

  // Load all data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      const [profileRes, familyRes, dosesRes, remediesRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('family_profiles').select('*').eq('user_id', userId).order('created_at', { ascending: true }),
        supabase.from('dose_logs').select('*').eq('user_id', userId).order('taken_at', { ascending: false }).limit(5),
        supabase.from('saved_remedies').select('*').eq('user_id', userId).order('saved_at', { ascending: false }).limit(6),
      ])

      if (profileRes.data) setProfile(profileRes.data)
      if (familyRes.data) setFamilyProfiles(familyRes.data)
      if (dosesRes.data) setDoseLogs(dosesRes.data)
      if (remediesRes.data) setSavedRemedies(remediesRes.data)

      setLoading(false)
    }

    loadData()
  }, [userId])

  const handleLogOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handleSendVerification = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: userEmail,
    })
    if (error) {
      alert('Could not send verification email. ' + error.message)
    } else {
      alert('Verification email sent. Check your inbox.')
    }
  }

  const isPremium = profile?.subscription_tier === 'premium'
  const wantedPremium = profile?.selected_tier_at_signup === 'premium' && !isPremium
  const isFoundingMember = profile?.is_founding_member === true
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : ''

  // FREE TIER LIMITS
  const FREE_TIER_PROFILE_LIMIT = 1
  const hasReachedProfileLimit = !isPremium && familyProfiles.length >= FREE_TIER_PROFILE_LIMIT

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafaf7] flex items-center justify-center">
        <p className="text-sm text-[#6b6b6b]">Loading your account...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fafaf7]">
      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-14">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#2d4a3e] hover:text-[#1f3329] mb-6 transition-colors"
        >
          ← Back to KnowYourRemedy
        </Link>

        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1a1a1a] mb-1 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-[#6b6b6b]">
            {userEmail} · Member since {memberSince}
            {isFoundingMember && (
              <span className="ml-2 inline-block px-2 py-0.5 text-[10px] bg-[#2d4a3e] text-white rounded-md uppercase tracking-wide font-medium">
                Founding Member
              </span>
            )}
          </p>
        </div>

        {/* Email verification banner */}
        {showVerifyBanner && (
          <div className="mb-6 p-4 bg-[#fef7e6] border-l-4 border-[#e67e22] rounded-r-md flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#5c4a1f] mb-1">
                📧 Verify your email
              </p>
              <p className="text-xs text-[#5c4a1f] leading-relaxed">
                Verify your email so we can help you recover your account if you forget your password.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleSendVerification}
                className="text-xs px-3 py-1.5 bg-[#2d4a3e] text-white rounded-md hover:bg-[#1f3329] transition-colors font-medium"
              >
                Send link
              </button>
              <button
                onClick={() => setShowVerifyBanner(false)}
                className="text-xs text-[#8b8b8b] hover:text-[#5c4a1f] transition-colors"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Premium status card */}
        {isPremium ? (
          <div className="mb-8 p-5 bg-[#2d4a3e] rounded-xl text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🌿</span>
              <p className="text-sm font-semibold uppercase tracking-wide">
                Premium Member
              </p>
              {isFoundingMember && (
                <span className="px-2 py-0.5 text-[10px] bg-white text-[#2d4a3e] rounded-md uppercase tracking-wide font-semibold">
                  Founding
                </span>
              )}
            </div>
            <p className="text-sm text-[#e5e3dc] leading-relaxed">
              Thanks for supporting KnowYourRemedy. All premium features are unlocked below.
            </p>
          </div>
        ) : wantedPremium ? (
          <div className="mb-8 p-5 bg-[#f4f1ea] border-2 border-[#2d4a3e] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌿</span>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#2d4a3e]">
                Finish your Premium upgrade
              </p>
            </div>
            <p className="text-sm text-[#3a3a3a] leading-relaxed mb-3">
              You chose Premium at signup. Payments aren&apos;t live yet — we&apos;ll email you the moment they are so you can lock in <strong className="text-[#2d4a3e]">$10/year for life</strong> as a founding member.
            </p>
            <button
              disabled
              className="text-xs px-4 py-2 bg-[#c0bdb1] text-white rounded-md cursor-not-allowed font-medium"
            >
              Upgrade — Coming Soon
            </button>
          </div>
        ) : (
          <div className="mb-8 p-5 bg-[#f4f1ea] border border-[#d9d4c5] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌿</span>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#2d4a3e]">
                Upgrade to Premium
              </p>
            </div>
            <p className="text-sm text-[#3a3a3a] leading-relaxed mb-3">
              Unlock unlimited family profiles, dose reminders, your medicine cabinet tracker, and more for <strong className="text-[#2d4a3e]">$10/year</strong>.
            </p>
            <button
              disabled
              className="text-xs px-4 py-2 bg-[#c0bdb1] text-white rounded-md cursor-not-allowed font-medium"
            >
              Upgrade — Coming Soon
            </button>
          </div>
        )}

        {/* Family profiles section */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h2 className="text-xl font-serif text-[#1a1a1a]">
                {isPremium ? 'Family Profiles' : 'Your Profile'}
              </h2>
              <p className="text-xs text-[#6b6b6b] mt-0.5">
                {isPremium
                  ? `${familyProfiles.length} of unlimited profiles`
                  : `${familyProfiles.length} of ${FREE_TIER_PROFILE_LIMIT} on free tier`}
              </p>
            </div>
            <button
              onClick={() => setShowAddProfile(true)}
              disabled={hasReachedProfileLimit}
              className="text-xs px-3 py-2 bg-[#2d4a3e] text-white rounded-md hover:bg-[#1f3329] disabled:bg-[#c0bdb1] disabled:cursor-not-allowed transition-colors font-medium"
            >
              + Add Profile
            </button>
          </div>

          {familyProfiles.length === 0 ? (
            <div className="p-6 bg-white border border-dashed border-[#d9d4c5] rounded-lg text-center">
              <p className="text-sm text-[#6b6b6b] mb-1">No profiles yet</p>
              <p className="text-xs text-[#8b8b8b]">
                Add yourself or a family member to start tracking doses and getting personalized dosage calculations.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {familyProfiles.map((fp) => (
                <FamilyProfileCard
                  key={fp.id}
                  profile={fp}
                  onUpdate={() => {
                    // Reload family profiles
                    supabase
                      .from('family_profiles')
                      .select('*')
                      .eq('user_id', userId)
                      .order('created_at', { ascending: true })
                      .then(({ data }) => {
                        if (data) setFamilyProfiles(data)
                      })
                  }}
                />
              ))}
            </div>
          )}

          {hasReachedProfileLimit && (
            <p className="text-xs text-[#8b8b8b] text-center mt-3">
              You&apos;ve reached the free tier limit. <button className="text-[#2d4a3e] underline">Upgrade to Premium</button> for unlimited profiles.
            </p>
          )}
        </section>

        {/* Recent dose logs section */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-[#1a1a1a]">
              Recent Doses
            </h2>
            {doseLogs.length > 0 && (
              <Link href="/dose-history" className="text-xs text-[#2d4a3e] hover:text-[#1f3329] underline">
                View all
              </Link>
            )}
          </div>

          {doseLogs.length === 0 ? (
            <div className="p-6 bg-white border border-dashed border-[#d9d4c5] rounded-lg text-center">
              <p className="text-sm text-[#6b6b6b] mb-1">No doses logged yet</p>
              <p className="text-xs text-[#8b8b8b]">
                Use the dosage calculator or any remedy page to log when you take something.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[#e5e3dc] rounded-lg divide-y divide-[#e5e3dc]">
              {doseLogs.map((log) => (
                <div key={log.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">{log.medication_name}</p>
                    <p className="text-xs text-[#6b6b6b]">
                      {log.dose_amount && `${log.dose_amount} · `}
                      {new Date(log.taken_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved remedies / Medicine cabinet section */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h2 className="text-xl font-serif text-[#1a1a1a]">
                Medicine Cabinet
              </h2>
              <p className="text-xs text-[#6b6b6b] mt-0.5">
                Favorites, used, and owned items
              </p>
            </div>
            {!isPremium && (
              <span className="text-[10px] px-2 py-0.5 bg-[#f4f1ea] border border-[#d9d4c5] text-[#2d4a3e] rounded-md uppercase tracking-wide font-medium">
                Premium
              </span>
            )}
          </div>

          {!isPremium ? (
            <div className="p-6 bg-[#f4f1ea] border border-[#d9d4c5] rounded-lg text-center">
              <p className="text-sm text-[#3a3a3a] mb-1 font-medium">
                🔒 Unlock your Medicine Cabinet
              </p>
              <p className="text-xs text-[#6b6b6b] leading-relaxed max-w-md mx-auto">
                Track favorites, items you&apos;ve tried, what&apos;s in your cabinet, what&apos;s running low, and get cleaner-alternative recommendations.
              </p>
            </div>
          ) : savedRemedies.length === 0 ? (
            <div className="p-6 bg-white border border-dashed border-[#d9d4c5] rounded-lg text-center">
              <p className="text-sm text-[#6b6b6b] mb-1">Your cabinet is empty</p>
              <p className="text-xs text-[#8b8b8b]">
                Save remedies you use, own, or want to try by tapping the heart icon on any remedy page.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedRemedies.map((remedy) => (
                <Link
                  key={remedy.id}
                  href={`/remedies/${remedy.remedy_slug}`}
                  className="block p-3 bg-white border border-[#e5e3dc] rounded-lg hover:border-[#2d4a3e] hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-[#1a1a1a]">{remedy.remedy_title || remedy.remedy_slug}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Account settings */}
        <section className="mb-10 pt-8 border-t border-[#e5e3dc]">
          <h2 className="text-xl font-serif text-[#1a1a1a] mb-4">
            Account Settings
          </h2>
          <div className="bg-white border border-[#e5e3dc] rounded-lg divide-y divide-[#e5e3dc]">

            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#1a1a1a]">Email</p>
                <p className="text-xs text-[#6b6b6b]">{userEmail}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wide font-medium ${
                emailVerified
                  ? 'bg-[#e8f3ec] text-[#1f5132] border border-[#b8d9c2]'
                  : 'bg-[#fef7e6] text-[#5c4a1f] border border-[#f0d99a]'
              }`}>
                {emailVerified ? 'Verified' : 'Not verified'}
              </span>
            </div>

            <button className="w-full px-4 py-3 text-left text-sm text-[#1a1a1a] hover:bg-[#fafaf7] transition-colors">
              Change password
            </button>

            <button className="w-full px-4 py-3 text-left text-sm text-[#c0392b] hover:bg-[#fdecea] transition-colors">
              Delete account
            </button>

          </div>

          <button
            onClick={handleLogOut}
            className="mt-4 w-full sm:w-auto px-5 py-2.5 bg-white border border-[#d4d1c5] text-[#3a3a3a] text-sm font-medium rounded-md hover:bg-[#fafaf7] hover:border-[#2d4a3e] transition-colors"
          >
            Log out
          </button>
        </section>

        {/* Add Profile Modal */}
        {showAddProfile && (
          <AddProfileModal
            userId={userId}
            onClose={() => setShowAddProfile(false)}
            onSaved={() => {
              setShowAddProfile(false)
              supabase
                .from('family_profiles')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: true })
                .then(({ data }) => {
                  if (data) setFamilyProfiles(data)
                })
            }}
          />
        )}

      </div>
    </main>
  )
}

// ===========================================================================
// FamilyProfileCard — displays a single family member
// ===========================================================================

function FamilyProfileCard({ profile, onUpdate }: { profile: FamilyProfile; onUpdate: () => void }) {
  const [showMenu, setShowMenu] = useState(false)

  const age = profile.date_of_birth
    ? Math.floor((new Date().getTime() - new Date(profile.date_of_birth).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : null

  const handleDelete = async () => {
    if (!confirm(`Delete profile for ${profile.name}? This cannot be undone.`)) return
    await supabase.from('family_profiles').delete().eq('id', profile.id)
    onUpdate()
  }

  return (
    <div className="bg-white border border-[#e5e3dc] rounded-lg p-4 relative">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-base font-medium text-[#1a1a1a]">{profile.name}</p>
          {profile.relationship && (
            <p className="text-xs text-[#6b6b6b] capitalize">{profile.relationship}</p>
          )}
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-[#8b8b8b] hover:text-[#3a3a3a] text-lg leading-none"
          aria-label="Profile options"
        >
          ⋯
        </button>
      </div>

      <div className="text-xs text-[#6b6b6b] space-y-0.5">
        {age !== null && <p>Age: {age}</p>}
        {profile.weight_lbs && <p>Weight: {profile.weight_lbs} lbs</p>}
        {profile.is_pregnant && (
          <p className="text-[#2d4a3e] font-medium">🤰 Currently pregnant</p>
        )}
      </div>

      {showMenu && (
        <div className="absolute top-10 right-3 bg-white border border-[#e5e3dc] rounded-md shadow-md z-10 min-w-[120px]">
          <button
            onClick={handleDelete}
            className="w-full px-3 py-2 text-left text-xs text-[#c0392b] hover:bg-[#fdecea] transition-colors"
          >
            Delete profile
          </button>
        </div>
      )}
    </div>
  )
}

// ===========================================================================
// AddProfileModal — popup form for adding a new family member
// ===========================================================================

function AddProfileModal({
  userId,
  onClose,
  onSaved,
}: {
  userId: string
  onClose: () => void
  onSaved: () => void
}) {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [weight, setWeight] = useState('')
  const [relationship, setRelationship] = useState('')
  const [isPregnant, setIsPregnant] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const { error: insertError } = await supabase
      .from('family_profiles')
      .insert({
        user_id: userId,
        name: name.trim(),
        date_of_birth: dob || null,
        weight_lbs: weight ? parseFloat(weight) : null,
        relationship: relationship || null,
        is_pregnant: isPregnant,
      })

    setSaving(false)

    if (insertError) {
      setError(insertError.message)
    } else {
      onSaved()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#e5e3dc]">
          <h3 className="text-lg font-serif text-[#1a1a1a]">Add a profile</h3>
          <p className="text-xs text-[#6b6b6b] mt-1">For yourself or a family member.</p>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">

          {error && (
            <div className="p-3 bg-[#fdecea] border border-[#f5c6c1] rounded-md">
              <p className="text-xs text-[#8a2a1f]">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#3a3a3a] mb-1.5 uppercase tracking-wide">
              Name <span className="text-[#c0392b]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#d4d1c5] rounded-md text-sm focus:outline-none focus:border-[#2d4a3e]"
              placeholder="e.g. Sarah, Dad, Emma"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3a3a3a] mb-1.5 uppercase tracking-wide">
              Relationship
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#d4d1c5] rounded-md text-sm focus:outline-none focus:border-[#2d4a3e] bg-white"
            >
              <option value="">Select...</option>
              <option value="self">Self</option>
              <option value="spouse">Spouse / partner</option>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
              <option value="sibling">Sibling</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3a3a3a] mb-1.5 uppercase tracking-wide">
              Date of birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2.5 border border-[#d4d1c5] rounded-md text-sm focus:outline-none focus:border-[#2d4a3e]"
            />
            <p className="text-xs text-[#8b8b8b] mt-1">Used for age-based dosing.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3a3a3a] mb-1.5 uppercase tracking-wide">
              Weight (lbs)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#d4d1c5] rounded-md text-sm focus:outline-none focus:border-[#2d4a3e]"
              placeholder="e.g. 35"
            />
            <p className="text-xs text-[#8b8b8b] mt-1">Used for weight-based pediatric dosing.</p>
          </div>

          <div className="p-3 bg-[#fafaf7] border border-[#e5e3dc] rounded-md">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#2d4a3e]"
              />
              <span className="text-xs text-[#3a3a3a] leading-relaxed">
                Currently pregnant — flag pregnancy-unsafe remedies for this profile.
              </span>
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-[#d4d1c5] text-[#3a3a3a] text-sm font-medium rounded-md hover:bg-[#fafaf7] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || saving}
              className="flex-1 py-2.5 bg-[#2d4a3e] text-white text-sm font-semibold rounded-md hover:bg-[#1f3329] disabled:bg-[#c0bdb1] disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}