'use client'
import { useRouter } from 'next/navigation'
import { League_Spartan } from 'next/font/google'

const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] })

export default function PaymentSuccessPage() {
  const router = useRouter()
  return (
    <div className={`min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16 relative ${leagueSpartan.className}`}>
      <div className="w-full max-w-md text-center">
        <div className="bg-card rounded-[24px] shadow-[0_4px_60px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_60px_-12px_rgba(0,0,0,0.3)] p-8 sm:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] bg-foreground dark:bg-zinc-900 flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="18" stroke="#9400D3" strokeWidth="2"/>
                <path d="M13 22.5L19.5 29L31 16" stroke="#9400D3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* Title */}
          <h1 className="text-center text-3xl sm:text-4xl font-black italic text-foreground tracking-tight mb-2">
            UNLOCKED
          </h1>
          <p className="text-center text-xs text-muted-foreground tracking-[0.2em] uppercase font-bold mb-8">
            ACCESS GRANTED
          </p>
          {/* Info Card */}
          <div className="bg-secondary/50 dark:bg-secondary rounded-2xl p-6 mb-6 border border-border/50 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
              <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-bold">
                Status
              </span>
              <span className="text-xs text-[#9400D3] tracking-[0.05em] uppercase font-bold">
                Payment Successful
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4 font-medium">
              Your have successfully completed the payment. You can access the product from your dashboard within a few minutes.
            </p>
            <p className="text-xs text-[#9400D3] text-center tracking-[0.1em] uppercase font-bold">
              // Session Authenticated
            </p>
          </div>
          {/* Back Button */}
          <button
            onClick={() => router.push('/')}
            className="w-full h-16 bg-foreground dark:bg-zinc-900 rounded-full text-background dark:text-foreground text-sm tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]"
          >
            Back to Home
          </button>
        </div>
      </div>
      {/* Footer */}
      <footer className="pb-8 pt-6 text-center">
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
