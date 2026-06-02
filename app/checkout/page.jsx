'use client'

import { ArrowLeft, Target, Zap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function CheckoutContent() {
  const searchParams = useSearchParams()
  
  // Dynamic values from URL params (e.g., ?id=ALOK&protocol=HAIR%20CARE)
  const userId = searchParams.get('id') || 'ALOK'
  const selectedProtocol = searchParams.get('protocol') || 'HAIR CARE'

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Back Button */}
      <button 
        className="absolute top-8 left-8 p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Go back"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-card rounded-[24px] shadow-[0_4px_60px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_60px_-12px_rgba(0,0,0,0.3)] p-8 sm:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] bg-foreground dark:bg-zinc-900 flex items-center justify-center">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={2} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center font-[var(--font-playfair)] text-3xl sm:text-4xl font-black italic text-foreground tracking-tight mb-2">
              REGISTERED
            </h1>

            {/* Subtitle - Dynamic ID */}
            <p className="text-center text-xs text-muted-foreground tracking-[0.2em] uppercase font-bold mb-8">
              ID: {userId}
            </p>

            {/* Protocol Card */}
            <div className="bg-secondary/50 dark:bg-secondary rounded-2xl p-6 mb-6 border border-border/50 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.2)]">
              {/* Protocol Header - Dynamic Protocol */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
                <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-bold">
                  Selected Protocol
                </span>
                <span className="text-xs text-primary tracking-[0.05em] uppercase font-bold">
                  {selectedProtocol}
                </span>
              </div>

              {/* Protocol Message */}
              <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4 font-medium">
                Your secure connection is established. Complete the checkout to get immediate access to the protocol.
              </p>

              {/* Urgency Message */}
              <p className="text-xs text-primary text-center tracking-[0.1em] uppercase font-bold">
                Only limited seats are available. Join quick.
              </p>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              className="w-full h-16 bg-foreground dark:bg-zinc-900 rounded-full text-background dark:text-foreground text-sm tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]"
            >
              Complete Checkout
              <Zap className="w-5 h-5 text-primary fill-primary" strokeWidth={0} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
