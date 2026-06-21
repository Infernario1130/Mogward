'use client'

import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock, Zap, X, Mail, Phone, User, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

const SITE_CONFIG = {
    brandName: "MOGWARD",
    brandInitials: "M",
    email: "ascend@mogward.com",
    address: {
      line1: "RAPTINAGAR PHASE-IV,",
      line2: "GORAKHPUR, 273013"
    },
    tagline: "Built for the version of you that's still ahead - physique, face and discipline, engineered together.",
    copyright: "© 2026 ARYANHEIS // ALL RIGHTS RESERVED."
  }

  function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  
    useEffect(() => {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => { if (data.success) setIsLoggedIn(true) })
        .catch(() => {})
    }, [])
  
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background text-xs font-bold">{SITE_CONFIG.brandInitials}</span>
              </div>
              <span className="font-black text-foreground tracking-tight text-lg">{SITE_CONFIG.brandName}</span>
            </Link>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors"
              >
                <Menu className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors"
              >
                LOGIN
                <Zap className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </header>
    )
  }

function Footer() {
    return (
      <footer className="bg-neutral-900 text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-neutral-900 text-sm font-bold">{SITE_CONFIG.brandInitials}</span>
                </div>
                <div className="font-black text-lg tracking-tight">
                  {SITE_CONFIG.brandName.split(' ').map((word, i) => (
                    <span key={i} className="block leading-tight">{word}</span>
                  ))}
                </div>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">{SITE_CONFIG.tagline}</p>
            </div>
            
            <div>
              <h4 className="text-xs tracking-[0.2em] text-neutral-500 mb-4">COMPANY</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs tracking-[0.2em] text-neutral-500 mb-4">LEGAL</h4>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-neutral-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-neutral-300 hover:text-white transition-colors">Refund & Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs tracking-[0.2em] text-neutral-500 mb-4">SUPPORT</h4>
              <div className="mb-4">
                <p className="text-xs text-neutral-500 mb-1">DIRECT HQ SUPPORT</p>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-white font-medium hover:underline">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-neutral-500 mb-1">HQ OFFICE</p>
                <p className="text-xs tracking-[0.2em] text-neutral-400">
                  {SITE_CONFIG.address.line1}<br />
                  {SITE_CONFIG.address.line2}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-8">
            <p className="text-center text-neutral-500 text-xs tracking-[0.15em]">{SITE_CONFIG.copyright}</p>
            <div className="text-center mt-8 pt-8 border-t border-neutral-800">
              <p className="text-xs tracking-[0.2em] text-neutral-600 mb-1">HQ OPERATIONS</p>
              <p className="text-xs tracking-[0.2em] text-neutral-500">
                {SITE_CONFIG.address.line1.replace(',', ', ')}<br />
                GORAKHPUR, 273013
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Title */}
          <h1
            className="text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-normal tracking-tight leading-[0.9] uppercase mb-4"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            REFUND & POLICY
          </h1>

          <p className="text-sm text-neutral-500 mb-8 sm:mb-10 tracking-wide">
            Last updated: 21 June 2026
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-foreground/40 mb-8 sm:mb-14" />

          {/* Content */}
          <div className="space-y-8 sm:space-y-12 text-base sm:text-[1.125rem] text-gray-300 leading-relaxed sm:leading-[1.7]">

            <p>
              This page explains exactly when a refund is and is not available for purchases made on mogward.com. Refund terms differ between our digital protocols and the 1:1 Coaching Program — please read the section relevant to your purchase carefully before buying.
            </p>

            {/* 1 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">1. Digital Protocols (Training, Diet, Frame, Skin, and the Mogward Bundle)</h2>
              <p className="mb-3 sm:mb-4">
                All digital protocols are sold as <span className="font-bold text-white">lifetime-access digital products</span>, delivered electronically upon successful payment.
              </p>
              <p className="mb-3 sm:mb-4">
                <span className="font-bold text-white">General policy: all sales are final.</span> Because these are digital products delivered instantly and accessible immediately upon purchase, we do not offer refunds for change of mind, dissatisfaction with content style, or failure to complete the program.
              </p>
              <p className="mb-3 sm:mb-4">
                <span className="font-bold text-white">Exception — technical or access issues.</span> If you are unable to access your purchased protocol due to a genuine technical fault (for example: payment was charged but content was never delivered, a broken download link, or a duplicate charge), you are entitled to a refund or replacement access, provided that:
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li>You contact us at <span className="font-bold text-white">{SITE_CONFIG.email}</span> within <span className="font-bold text-white">7 days</span> of your purchase date</li>
                <li>You provide your order/payment confirmation as proof of purchase</li>
                <li>The issue is verified as a genuine technical or access fault on our end, and not, for example, an issue with your own device, email spam filtering, or internet connection</li>
              </ul>
              <p>
                Refunds approved under this exception will be processed back to your original payment method via Razorpay within a reasonable timeframe.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">2. The Complete 1:1 Mogward Program</h2>
              <p className="mb-3 sm:mb-4">
                The 1:1 Coaching Program is sold as a <span className="font-bold text-white">fixed-term engagement</span> of either 3 months or 6 months, selected and paid for at enrollment.
              </p>
              <p className="mb-3 sm:mb-4">
                <span className="font-bold text-white">No mid-program cancellations or refunds.</span> Once you enroll, the full program fee for your selected duration is committed. We do not offer cancellations, pauses, partial refunds, or pro-rated refunds at any point during the program, for any reason, including loss of motivation, scheduling conflicts, or change of mind.
              </p>
              <p className="mb-3 sm:mb-4">
                <span className="font-bold text-white">The Results Guarantee — 100% Refund + 20% Bonus.</span> Separately from the above, the 1:1 Program is backed by a results guarantee:
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li>This guarantee is evaluated at a <span className="font-bold text-white">defined 60-day check-in point</span> within your program.</li>
                <li>To qualify, you must have <span className="font-bold text-white">completed the full 60 days</span> of the program as a participant (attending scheduled check-ins and engaging with the coaching process).</li>
                <li>If, at that 60-day check-in, you have not achieved the results promised to you at the start of your program, Mogward will refund 100% of your program fee and provide an additional 20% bonus, as agreed with you individually at enrollment.</li>
                <li>This guarantee evaluation is based on completion of the 60-day period itself; no separate proof-of-adherence documentation (such as logged workouts or photos) is required to qualify, beyond having participated in the program as instructed.</li>
              </ul>
              <p>
                This guarantee does not override the {"\"no mid-program cancellation\""} rule above — it is a distinct mechanism that activates specifically at the 60-day mark, not a general cancellation right.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">3. Support+ (Bundle Bonus)</h2>
              <p>
                Support+ (priority Instagram DM access for Bundle purchasers) is a bonus feature, not a paid service in itself, and is not eligible for separate refund or compensation if unused or if response times vary.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">4. How to Request a Refund</h2>
              <p className="mb-3 sm:mb-4">To request a refund under any of the conditions above:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li>Email <span className="font-bold text-white">{SITE_CONFIG.email}</span> with your order confirmation and a description of the issue.</li>
                <li>Allow us a reasonable period to review your request — we aim to respond within 2–3 business days.</li>
                <li>If approved, refunds are processed via Razorpay to your original payment method.</li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">5. Questions</h2>
              <p className="mb-3 sm:mb-4">If anything in this policy is unclear, contact us before purchasing:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Email:</span> {SITE_CONFIG.email}</li>
                <li><span className="font-bold text-white">Instagram:</span> @aryanheis</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}