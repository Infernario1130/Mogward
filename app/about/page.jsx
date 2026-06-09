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
                <li><Link href="#" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
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
              {"I'm"} <span className="text-white font-bold">Aryan</span>, and I {"didn't"} start with perfect skin, a strong physique, or a clear roadmap. Like many, I struggled with severe acne, endless confusion, and routines that simply {"didn't"} work.
            </p>
            
            <p>
              Over <span className="text-white font-bold italic">3 years of trial, learning, and personal transformation</span>, I completely re-engineered my approach. I cleared my acne, gained <span className="text-white font-bold italic">30kgs</span>, built my dream physique through strict lean bulking, and completely transformed my skin and facial aesthetics.
            </p>
            
            <p>
              What started as a solitary personal journey turned into a larger mission when thousands began following the progress and asking how to achieve the exact same results. Today, with a community of over <span className="text-white font-bold italic">100,000 people</span>, my goal is simple:
            </p>
            
            {/* Blockquote */}
            <blockquote className="border-l-[3px] border-white pl-6 py-1 my-8">
              <p className="text-[1.25rem] sm:text-[1.375rem] italic text-white leading-[1.5]">
                {'"Simplify health, skincare, fitness, and nutrition so anyone can build an aesthetic physique and a confident lifestyle."'}
              </p>
            </blockquote>
            
            <p>
              These courses {"aren't"} just theory. They are the exact systems and strategies that helped me transform over those 3 years—purpose-built to help you start smarter, avoid my mistakes, and achieve your results faster.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}