'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, Lock, ShieldCheck, ChevronRight, User, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { League_Spartan } from 'next/font/google'

const leagueSpartan = League_Spartan({ 
  subsets: ['latin'], 
  weight: ['400','500','600','700','800','900'],
  variable: '--font-league-spartan'
})

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          password,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.message)
        return
      }

      setSuccess('Registered successfully. Redirecting...')

      setTimeout(() => {
        const redirectTo = localStorage.getItem('redirectAfterAuth')
        if (redirectTo) {
          localStorage.removeItem('redirectAfterAuth')
          router.push(redirectTo)
        } else {
          router.push('/')
        }
      }, 1500)

    } catch (err) {
      setError('Something went wrong please try again')
    } finally {
      setLoading(false)
    }
  }

  const font = { fontFamily: 'var(--font-league-spartan), sans-serif' }

  return (
    <div
      className={`min-h-screen bg-background flex flex-col relative ${leagueSpartan.variable}`}
      style={font}
    >
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
      </Link>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-[24px] shadow-[0_4px_60px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_60px_-12px_rgba(0,0,0,0.3)] p-8 sm:p-12">

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#9400D3]/10 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#9400D3]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-2" style={font}>
              REGISTER
            </h1>

            {/* Form Header */}
            <div className="flex items-center justify-between mb-4 mt-8">
              <span className="text-xs text-muted-foreground tracking-[0.15em] font-medium" style={font}>
                PERSONNEL DETAILS
              </span>
              <Link
                href="/login"
                className="text-xs text-[#9400D3] hover:text-[#9400D3]/80 tracking-[0.05em] font-semibold transition-colors"
                style={font}
              >
                ALREADY REGISTERED?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-500 text-xs tracking-wide text-center" style={font}>{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-4 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-500 text-xs tracking-wide text-center" style={font}>{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full h-14 pl-12 pr-4 bg-input rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#9400D3]/30 transition-all"
                  style={font}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-14 pl-12 pr-4 bg-input rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#9400D3]/30 transition-all"
                  style={font}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full h-14 pl-12 pr-4 bg-input rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#9400D3]/30 transition-all"
                  style={font}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-14 pl-12 pr-4 bg-input rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#9400D3]/30 transition-all"
                  style={font}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-2 bg-gradient-to-r from-[#9400D3]/90 to-[#9400D3] rounded-xl text-white text-xs tracking-[0.15em] font-semibold flex items-center justify-center gap-2 hover:from-[#9400D3] hover:to-[#9400D3]/90 transition-all shadow-lg shadow-[#9400D3]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                style={font}
              >
                {loading ? 'REGISTERING...' : 'REGISTER NOW'}
                {!loading && <ChevronRight className="w-4 h-4" strokeWidth={2} />}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground/70 tracking-[0.1em] font-semibold" style={font}>
                INITIAL REGISTRATION REQUEST
              </p>
            </div>

          </div>
        </div>
      </main>

      <footer className="pb-8 text-center">
        <p className="text-[11px] text-muted-foreground/50 tracking-[0.2em]" style={font}>
          ENCRYPTED SESSION ACTIVE
        </p>
        <p className="text-[11px] text-muted-foreground/40 tracking-[0.15em]" style={font}>
          // ACCESS LEVEL: PRIORITY
        </p>
      </footer>

    </div>
  )
}