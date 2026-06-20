'use client'

import Link from "next/link";
import { ChevronLeft, ChevronRight, Lock, Zap, X, Mail, Phone, User, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

const SITE_CONFIG = {
    brandName: "MOGWARD",
    brandInitials: "M",
    heroTitle: ["THE", "ARYAN", "METHOD"],
    heroSubtitle: "The only 4 systems you need to ascend and grow.",
    watermarkText: "ARYAN METHOD",
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
            {/* Brand */}
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
              <p className="text-neutral-400 text-sm leading-relaxed">
                {SITE_CONFIG.tagline}
              </p>
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
            
            {/* Support */}
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
            <p className="text-center text-neutral-500 text-xs tracking-[0.15em]">
              {SITE_CONFIG.copyright}
            </p>
            
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

export default function AboutPage() {
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
            The Origin
          </h1>
          
          {/* Divider */}
          <div className="w-full h-[1px] bg-foreground/40 mb-8 sm:mb-14" />
          
          {/* Content */}
          <div className="space-y-8 sm:space-y-12 text-base sm:text-[1.125rem] text-gray-300 leading-relaxed sm:leading-[1.7]">
            <p>
              I {"didn't"} start with the physique, the face, or the discipline. I started with <span className="text-white font-bold">tanning and complexion issues</span> I {"couldn't"} fix, a body I {"didn't"} recognize, and routines that promised everything and changed nothing.
            </p>

            <p>
              For <span className="text-white font-bold italic">3 years</span>, I tore apart everything I thought I knew and rebuilt it from scratch — what actually clears skin, what actually builds muscle, what actually sharpens a jawline. No shortcuts, no theory I {"hadn't"} tested on myself first. I cleared the acne. Gained <span className="text-white font-bold italic">30kg</span> through a lean bulk built on real numbers, not guesswork. Rebuilt my facial aesthetics from the ground up.
            </p>

            <p>
              Somewhere in that process, people started noticing. Thousands of messages asking the same question: <span className="italic text-white">how.</span> Today {"that's"} a community of over <span className="text-white font-bold italic">3,000</span>  and the answer to {'"how"'} became Mogward.
            </p>

            {/* Blockquote */}
            <blockquote className="border-l-[3px] border-white pl-6 py-1 my-8">
              <p className="text-[1.25rem] sm:text-[1.375rem] italic text-white leading-[1.5]">
                {'"Simplify physique, skin, and facial aesthetics into one system — so anyone can build the version of themselves they\'ve been chasing."'}
              </p>
            </blockquote>

            <p>
              THE TRAINING PROTOCOL. THE DIET PROTOCOL. THE FRAME PROTOCOL. THE SKIN PROTOCOL. Four systems, one standard — the exact one I used to get here. Not theory. Not recycled advice. The actual playbook, built so you start where I wish {"I'd"} started, skip the 3 years of trial and error, and get there faster.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}