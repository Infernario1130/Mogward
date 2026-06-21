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
            
             {/* Company */}
            <div>
              <h4 className="text-xs tracking-[0.2em] text-neutral-500 mb-4">COMPANY</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
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

export default function TermsPage() {
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
            Terms & Conditions
          </h1>

          <p className="text-sm text-neutral-500 mb-8 sm:mb-10 tracking-wide">
            Last updated: 21 June 2026
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-foreground/40 mb-8 sm:mb-14" />

          {/* Content */}
          <div className="space-y-8 sm:space-y-12 text-base sm:text-[1.125rem] text-gray-300 leading-relaxed sm:leading-[1.7]">

            <p>
              Please read these Terms & Conditions ({'"'}Terms{'"'}) carefully before using mogward.com (the {'"'}Site{'"'}) or purchasing any product or service from Mogward.
            </p>

            <p>
              These Terms constitute a legally binding agreement between you ({'"'}you,{'"'} {'"'}user,{'"'} {'"'}customer{'"'}) and Aryan, a sole proprietorship registered in India, operating as Mogward ({'"'}Mogward,{'"'} {'"'}we,{'"'} {'"'}us,{'"'} {'"'}our{'"'}), with its registered office at Raptinagar Phase-IV, Gorakhpur, Uttar Pradesh, 273013, India.
            </p>

            <p>
              By accessing the Site, creating an account, or purchasing any product, you agree to be bound by these Terms. If you do not agree, do not use the Site or purchase any product.
            </p>

            {/* 1 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">1. Who We Are and What We Offer</h2>
              <p className="mb-3 sm:mb-4">
                Mogward provides digital educational content and personal coaching services related to fitness, nutrition, skincare, and facial aesthetics, including but not limited to:
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li>The Training Protocol (digital guide)</li>
                <li>The Diet Protocol (digital guide)</li>
                <li>The Frame Protocol (digital guide)</li>
                <li>The Skin Protocol (digital guide)</li>
                <li>The Mogward Bundle (combined digital guide package)</li>
                <li>The Complete 1:1 Mogward Program (personal coaching service)</li>
              </ul>
              <p>
                All digital protocols are delivered electronically upon successful payment. The 1:1 Coaching Program is a personal service delivered over a 3-month or 6-month engagement period, as selected at the time of purchase.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">2. Eligibility</h2>
              <p>
                You must be at least 18 years old to purchase any product or service on this Site. If you are between 16 and 18, you may use informational content on the Site with the involvement and consent of a parent or legal guardian, but purchases must be made by an adult.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">3. Not Medical Advice</h2>
              <p className="mb-3 sm:mb-4 font-bold text-white">
                This is the most important section of these Terms. Please read it carefully.
              </p>
              <p className="mb-3 sm:mb-4">
                All content provided by Mogward — including the Training Protocol, Diet Protocol, Frame Protocol, Skin Protocol, and the 1:1 Coaching Program — is provided for general educational and informational purposes only. It is <span className="font-bold text-white">not medical advice</span>, and Mogward is not a medical, dental, dietetic, or healthcare provider.
              </p>
              <p className="mb-3 sm:mb-4">
                You should consult a qualified healthcare professional before beginning any new diet, exercise, breathing practice (including mouth taping or nasal breathing techniques), or skincare routine — particularly if you have any underlying health condition, including but not limited to sleep apnea or other breathing disorders, dental or jaw issues (including TMJ), skin conditions, cardiovascular conditions, or any condition affecting your ability to safely engage in physical exercise or caloric restriction.
              </p>
              <p>
                You assume full responsibility for any decision you make based on {"Mogward's"} content, and Mogward is not liable for any injury, health complication, or adverse outcome resulting from your use of this content.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">4. Purchases, Pricing, and Payment</h2>
              <p className="mb-3 sm:mb-4">
                All payments on this Site are processed securely through Razorpay. Mogward does not directly store or process your card or payment credentials.
              </p>
              <p className="mb-3 sm:mb-4">
                Prices are listed in Indian Rupees (₹) for digital protocols and in US Dollars ($) for the 1:1 Coaching Program, and are subject to change without prior notice. The price applicable to your purchase is the price displayed at the time payment is completed.
              </p>
              <p>
                You agree to provide accurate billing information and authorize Mogward, via Razorpay, to charge the listed price for your selected product or service.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">5. Digital Products — License to Use</h2>
              <p className="mb-3 sm:mb-4">
                When you purchase a digital protocol (Training, Diet, Frame, Skin, or the Bundle), you are granted a <span className="font-bold text-white">personal, non-transferable, non-exclusive, lifetime license</span> to access and use that content for your own personal use.
              </p>
              <p className="mb-3 sm:mb-4">You may <span className="font-bold text-white">not</span>:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li>Resell, redistribute, share, or publicly post the content of any protocol</li>
                <li>Reproduce the content, in whole or in part, for commercial purposes</li>
                <li>Share your account access or downloaded materials with any third party</li>
              </ul>
              <p>
                Mogward retains full ownership of all intellectual property in its protocols, frameworks, and materials. See Section 9 (Intellectual Property) for further detail.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">6. The 1:1 Coaching Program — Specific Terms</h2>
              <p className="mb-3 sm:mb-4">
                The Complete 1:1 Mogward Program is sold as a fixed-duration personal coaching engagement of either 3 months or 6 months, as selected and paid for at the time of enrollment.
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">No mid-program cancellations.</span> Once enrolled, the program fee is committed in full for the selected duration. There are no cancellations, pauses, or partial refunds during the program.</li>
                <li><span className="font-bold text-white">Results guarantee.</span> Mogward offers a 100% refund plus a 20% bonus if you do not achieve the results promised, subject to the conditions set out in our <Link href="/refund" className="text-white underline hover:text-neutral-300">Refund & Policy</Link> page, including the defined 60-day check-in point.</li>
                <li><span className="font-bold text-white">Your responsibility.</span> The 1:1 Program requires your active participation, including attending scheduled check-ins and following the guidance provided. {"Mogward's"} guarantee is contingent on the terms described in the Refund & Policy page.</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">7. Support+ (Bundle Bonus)</h2>
              <p>
                Customers who purchase the complete Mogward Bundle receive Support+: priority placement in {"Mogward's"} direct Instagram inbox, maintained personally by the founder. Support+ is a best-effort personal commitment from the founder, not an automated platform feature or a guaranteed response time, and is provided at {"Mogward's"} discretion as part of the Bundle purchase.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">8. Refunds</h2>
              <p className="mb-3 sm:mb-4">
                Refunds are governed entirely by our <Link href="/refund" className="text-white underline hover:text-neutral-300">Refund & Policy</Link> page, which forms part of these Terms by reference. In summary:
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li>Digital protocols are refundable only in cases of genuine technical or access issues, reported within 7 days of purchase.</li>
                <li>The 1:1 Coaching Program is non-cancellable mid-program, and is covered separately by the results guarantee described in the Refund & Policy page.</li>
              </ul>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">9. Intellectual Property</h2>
              <p>
                All content on this Site — including but not limited to the Training Protocol, Diet Protocol, Frame Protocol, Skin Protocol, the CTP framework, the 5-step Frame hierarchy, all written guides, graphics, logos, and the Mogward brand name and assets — is the exclusive property of Mogward and is protected by applicable copyright and intellectual property laws. Unauthorized use, reproduction, or distribution is strictly prohibited and may result in legal action.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">10. Limitation of Liability</h2>
              <p className="mb-3 sm:mb-4">
                To the fullest extent permitted by law, Mogward and its founder shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or any product, including but not limited to loss of results, injury, or dissatisfaction with outcomes, except where such liability cannot be excluded under applicable Indian law.
              </p>
              <p>
                Nothing in these Terms limits {"Mogward's"} liability for fraud, willful misconduct, or any liability that cannot be excluded by law.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">11. Changes to These Terms</h2>
              <p>
                Mogward may update these Terms from time to time. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">12. Governing Law and Jurisdiction</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of Gorakhpur, Uttar Pradesh, India.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">13. Contact</h2>
              <p className="mb-3 sm:mb-4">For any questions about these Terms, contact us at:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Email:</span> {SITE_CONFIG.email}</li>
                <li><span className="font-bold text-white">Instagram:</span> @aryanheis</li>
                <li><span className="font-bold text-white">Registered Office:</span> Raptinagar Phase-IV, Gorakhpur, Uttar Pradesh, 273013, India</li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}