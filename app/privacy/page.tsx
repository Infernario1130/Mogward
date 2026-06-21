'use client'

import Link from "next/link";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lock, Zap, X, Mail, Phone, User, Menu } from 'lucide-react'

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

export default function Privacy() {
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
            PRIVACY POLICY
          </h1>

          <p className="text-sm text-neutral-500 mb-8 sm:mb-10 tracking-wide">
            Last updated: 21 June 2026
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-foreground/40 mb-8 sm:mb-14" />

          {/* Content */}
          <div className="space-y-8 sm:space-y-12 text-base sm:text-[1.125rem] text-gray-300 leading-relaxed sm:leading-[1.7]">

            <p>
              This Privacy Policy explains how Aryan, a sole proprietorship registered in India, operating as Mogward ({'"'}Mogward,{'"'} {'"'}we,{'"'} {'"'}us,{'"'} {'"'}our{'"'}), collects, uses, and protects your information when you visit mogward.com (the {'"'}Site{'"'}) or purchase any product or service from us.
            </p>

            {/* 1 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">1. Information We Collect</h2>
              <p className="mb-3 sm:mb-4">
                We collect only the information necessary to process your purchase and provide our products and services to you:
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li><span className="font-bold text-white">Name</span> — to identify your purchase and personalize your access</li>
                <li><span className="font-bold text-white">Email address</span> — to deliver digital products, send order confirmations, and respond to support requests</li>
                <li><span className="font-bold text-white">Payment information</span> — processed entirely by Razorpay (see Section 3 below); Mogward does not store your card, UPI, or banking details</li>
              </ul>
              <p>
                We do <span className="font-bold text-white">not</span> currently collect health data, photos, body measurements, WhatsApp numbers, or any other personal data beyond the above, even for the 1:1 Coaching Program. If this changes in the future — for example, if the 1:1 Program begins collecting progress photos or health information as part of coaching — this Privacy Policy will be updated in advance, and your consent will be requested separately for that data.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">2. How We Use Your Information</h2>
              <p className="mb-3 sm:mb-4">We use the information we collect to:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li>Process and fulfil your purchase</li>
                <li>Deliver digital protocols to the email address provided</li>
                <li>Communicate with you about your order, including confirmations and support</li>
                <li>Provide 1:1 coaching services if you have enrolled in that program</li>
                <li>Maintain records as required for tax, accounting, and legal compliance in India</li>
              </ul>
              <p>
                We do not use your information for any purpose beyond what is necessary to provide our products and services, and we do not currently use third-party analytics or advertising tracking tools on the Site.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">3. Payment Processing</h2>
              <p>
                All payments are processed securely by <span className="font-bold text-white">Razorpay</span>, a third-party payment gateway. When you make a purchase, your payment details are submitted directly to Razorpay and are subject to {"Razorpay's"} own privacy policy and security practices. Mogward does not receive, store, or have access to your full card number, CVV, or banking credentials.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">4. How We Share Your Information</h2>
              <p className="mb-3 sm:mb-4">
                We do not sell, rent, or trade your personal information to any third party.
              </p>
              <p className="mb-3 sm:mb-4">We may share limited information only in the following circumstances:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li>With <span className="font-bold text-white">Razorpay</span>, solely to process your payment</li>
                <li>If required by <span className="font-bold text-white">law</span>, court order, or governmental request</li>
                <li>With a <span className="font-bold text-white">successor entity</span> in the event of a business transfer, merger, or acquisition, in which case you will be notified</li>
              </ul>
              <p>
                We do not share your data with advertisers, data brokers, or marketing platforms.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">5. Data Storage and Security</h2>
              <p>
                Your information is stored securely and is accessed only as needed to fulfil your order or provide support. While we take reasonable measures to protect your data, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">6. Data Retention</h2>
              <p>
                We retain your name, email, and order information for as long as necessary to provide our services and to comply with applicable tax and legal record-keeping obligations in India. If you would like your data deleted and it is not otherwise required to be retained by law, contact us using the details in Section 9.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">7. Your Rights</h2>
              <p className="mb-3 sm:mb-4">You may, at any time:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5 mb-3 sm:mb-4">
                <li>Request a copy of the personal data we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data, subject to our legal and tax record-keeping obligations</li>
                <li>Unsubscribe from any non-essential email communication</li>
              </ul>
              <p>
                To exercise any of these rights, email <span className="font-bold text-white">{SITE_CONFIG.email}</span>.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">8. {"Children's"} Privacy</h2>
              <p>
                This Site is not directed at children under 16. We do not knowingly collect personal information from anyone under 16. If you believe a child has provided us with personal information, contact us and we will delete it.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">9. Cookies</h2>
              <p>
                The Site may use essential cookies required for basic functionality (such as keeping you logged in or processing a checkout). We do not currently use cookies for advertising or third-party tracking purposes.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The {'"'}Last updated{'"'} date at the top of this page will reflect the most recent revision. We encourage you to review this page periodically.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">11. Contact Us</h2>
              <p className="mb-3 sm:mb-4">If you have any questions about this Privacy Policy or how your data is handled, contact us at:</p>
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