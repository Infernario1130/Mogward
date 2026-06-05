'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, Lock, ShieldCheck, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthenticatePage() {
  const [email, setEmail] = useState('')
  const [clearanceCode, setClearanceCode] = useState('')
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: clearanceCode,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.message)
        return
      }

      setSuccess('Access granted. Redirecting...')

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

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
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
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center font-[var(--font-playfair)] text-3xl sm:text-4xl font-black italic text-foreground tracking-tight mb-2">
              AUTHENTICATE
            </h1>

            {/* Subtitle */}
            <p className="text-center text-xs text-muted-foreground tracking-[0.2em] uppercase mb-8">
              Protocol ID: Operative
            </p>

            {/* Form Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-medium">
                Personnel Details
              </span>
              <Link
                href="/register"
                className="text-xs text-primary hover:text-primary/80 tracking-[0.05em] uppercase font-semibold transition-colors"
              >
                Not Registered?
              </Link>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-500 text-xs tracking-wide text-center">{error}</p>
              </div>
            )}

            {/* Success Notification */}
            {success && (
              <div className="mb-4 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-500 text-xs tracking-wide text-center">{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-14 pl-12 pr-4 bg-input rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <input
                  type="password"
                  value={clearanceCode}
                  onChange={(e) => setClearanceCode(e.target.value)}
                  placeholder="Clearance Code"
                  className="w-full h-14 pl-12 pr-4 bg-input rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-2 bg-gradient-to-r from-primary/90 to-primary rounded-xl text-primary-foreground text-xs tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2 hover:from-primary hover:to-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Request Secure Clearance'}
                {!loading && <ChevronRight className="w-4 h-4" strokeWidth={2} />}
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-6 text-center">
              <Link
                href="/register"
                className="text-xs text-muted-foreground/70 hover:text-muted-foreground tracking-[0.1em] uppercase transition-colors"
              >
                Existing Operative: <span className="font-medium">Resume Protocol</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="pb-8 text-center">
        <p className="text-[11px] text-muted-foreground/50 tracking-[0.2em] uppercase mb-1">
          Encrypted Session Active
        </p>
        <p className="text-[11px] text-muted-foreground/40 tracking-[0.15em] uppercase">
          // Access Level: Priority
        </p>
      </footer>
    </div>
  )
}