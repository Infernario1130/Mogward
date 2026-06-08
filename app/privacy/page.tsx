import Link from "next/link";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lock, Zap, X, Mail, Phone, User, Menu } from 'lucide-react'

const SITE_CONFIG = {
    brandName: "ARYANHEIS",
    brandInitials: "AH",
    email: "ascend@aryanmethod.in",
    address: {
      line1: "RAPTINAGAR PHASE-IV,",
      line2: "GORAKHPUR, 273013"
    },
    tagline: "Where elite conditioning meets unwavering determination in the pursuit of victory.",
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

          {/* Divider */}
          <div className="w-full h-[1px] bg-foreground/40 mb-8 sm:mb-14" />

          {/* Content */}
          <div className="space-y-8 sm:space-y-12 text-base sm:text-[1.125rem] text-gray-300 leading-relaxed sm:leading-[1.7]">

            {/* 1 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">1. Overview</h2>
              <p>
              We collect minimal personal information necessary to deliver our Courses and process payments. By using our services, you agree to our data practices.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">2. What We Collect</h2>
  
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Account Information:</span> Name, email, phone number, and login credentials (encrypted).</li>
                <li><span className="font-bold text-white">Usage Data:</span> IP address, browser type, device information, pages visited, and access timestamps.
                </li>
                <li><span className="font-bold text-white">Payment:</span> We do not store credit card numbers. Payments are processed by PCI-DSS compliant third parties (Cashfree, Stripe). We receive only payment confirmation and transaction ID.
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">3. How We Use Your Data </h2>
              
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white"></span> Course access and account management
                </li>
                <li><span className="font-bold text-white"></span> Payment processing and order fulfillment
                </li>
                <li><span className="font-bold text-white"></span> Security and fraud prevention
                </li>
                <li><span className="font-bold text-white"></span> Platform analytics and improvements
                </li>
                
              </ul>
            </section>

            {/* 4 */}
            <section>
            <p>
              We collect minimal personal information necessary to deliver our Courses and process payments. By using our services, you agree to our data practices.
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">4. Data Sharing</h2>
              <li><span className="font-bold text-white"></span> Third-party payment processors (for transactions)
                </li>
                <li><span className="font-bold text-white"></span> Hosting and email service providers

                </li>
                <li><span className="font-bold text-white"></span> Government or courts if legally required
                </li>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">5. Cookies</h2>
              <p>
              We use cookies to keep you logged in and understand platform usage. You can disable cookies in your browser, though some features may not work properly.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">6. Data Security</h2>
              <p>
              We use industry-standard security measures to protect your data. However, no internet transmission is 100% secure. Keep your password confidential and notify us of any unauthorized access.
              </p>
            </section>

           
            {/* 7 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">7. Governing Law</h2>
              <p>
              This Privacy Policy is governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in New Delhi, India.
              </p>
            </section>
            

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
