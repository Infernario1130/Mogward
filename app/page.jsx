'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Lock, Zap, X, Mail, Phone, User, Menu, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { League_Spartan } from 'next/font/google'
import { PRODUCTS, MAIN_PACKAGE } from '@/lib/products'
import CoachingCard from "../components/CoachingCard.jsx"
import { PremiumGallery } from "../components/PremiumGallery/PremiumGallery.jsx";
import { createPortal } from 'react-dom'

const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] })

const SITE_CONFIG = {
  brandName: "MOGWARD",
  brandInitials: "M",
  heroTitle: ["THE", "MOGWARD", "PROGRAM"],
  heroSubtitle: "The only 4 systems you need to ascend & max out your true potential.",
  watermarkText: "MOGWARD PROGRAM",
  email: "ascend@mogward.com",
  address: {
    line1: "RAPTINAGAR PHASE-IV,",
    line2: "GORAKHPUR, 273013"
  },
  tagline: "Built for the version of you that's still ahead - physique, face and discipline, engineered together.",
  copyright: "© 2026 ARYANHEIS // ALL RIGHTS RESERVED."
}

const BOOKING_CONFIG = {
  title: ["BOOK A", "1:1 CALL"],
  subtitle: "Secure your priority slot for a high-performance consultation."
}

const SESSION_OPTIONS = [
  {
    id: '30min',
    duration: '30-MINUTE SESSION',
    durationLabel: "Use this call to get your questions answered, clear any doubts about the program, and discuss anything that's holding you back.",
    minutes: 30,
    price: 999,
    isPriority: true,
    badge: 'PRIORITY COMMS',
  },
]

const pairs = [
  {
    images: ["/images/1.png", "/images/2.png"],
    name: "ARYAN,21",
    founderCard: 1,
    tags: "Full Muscle Rebuild · 45 Days",
    stats: "64KG → 69KG · 45 DAYS",
    quote: "Lost 3 years of progress in 3 months. Built it all back in 45 days. This is why the system exists."
  },
  {
    images: ["/images/3.png", "/images/4.png"],
    name: "RAVEESH, 42",
    tags: "Fat Loss · Confidence",
    stats: "77KG → 70KG · 2 MONTHS",
    quote: `7kg down in 2 months. Started with no training experience — now runs
           his own programme. Walks into every room differently.`
  },
  {
    images: ["/images/5.png", "/images/6.png"],
    name: "LAKSHAY, 19",
    tags: "Recomposition · Lean Aesthetic ",
    stats: "69KG → 65KG · 2 MONTHs",
    quote: `4kg down, visibly more muscle. The lean aesthetic look most guys
           spend years chasing — built in 60 days.`
  },
  {
    images: ["/images/7.png", "/images/8.png"],
    name: "RISHU, 17",
    tags: "Muscle Gain · Lean Aesthetic",
    stats: "69KG → 78KG · 6 MONTHS",
    quote: `Came in at 17 with zero structure to his training. Left with 9kg of
           muscle, a physique that turns heads, and a programme he actually
           understands.`
  },
  {
    images: ["/images/9.png", "/images/10.png"],
    name: "ROSHNI,19",
    tags: "Fat Loss · Toned",
    stats: "62KG → 54KG · 1 MONTH",
    quote: `8kg down in 30 days. Came in wanting to feel confident in her own
           skin left with the body and the routine to keep it.`
  },
  {
    images: ["/images/11.png", "/images/12.png"],
    name: "VIVEK, 33",
    tags: "Fat Loss · Strength · Masculine Structure",
    stats: "96KG → 86KG · 45 DAYS",
    quote: `10kg of fat gone in 45 days — and got stronger doing it. Benches
           3 plates, squats 180kg, pulls 200kg. The body changed. The numbers
           went up.`
  },
  {
    images: ["/images/13.png", "/images/14.png"],
    name: "DIVJOT, 19",
    tags: "Recomposition · Lean Bulk · Strength",
    stats: "59kg → 58kg · 1 month",
    quote: `The scale barely moved. His body completely changed. Lost fat, built
           muscle, and went from struggling with weights to full-stacking
           machines — in 30 days.`
  },
];

function PulsingGlow() {
  return (
    <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{
          width: '120%',
          height: '600px',
          background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(148,0,211,0.95) 0%, rgba(148,0,211,0.55) 35%, rgba(148,0,211,0.15) 65%, transparent 85%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{
          width: '80%',
          height: '500px',
          background: 'radial-gradient(ellipse 60% 55% at 50% 15%, rgba(244, 8, 165, 0.8) 0%, rgba(216, 60, 185, 0.4) 40%, transparent 75%)',
          filter: 'blur(20px)',
          animationDelay: '0.3s',
        }}
      />
    </div>
  )
}

function Header({ isDetailOpen }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => { if (data.success) setIsLoggedIn(true) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    setLoggingOut(false)
    setMenuOpen(false)
    setIsLoggedIn(false)
    router.push('/')
  }

  const handleMyPurchases = () => {
    setMenuOpen(false)
    router.push('/dashboard')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-transform duration-300 ${
        isDetailOpen ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background text-xs font-bold">{SITE_CONFIG.brandInitials}</span>
            </div>
            <span className={`font-black text-foreground tracking-tight text-lg ${leagueSpartan.className}`}>{SITE_CONFIG.brandName}</span>
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="menu"
                    className="fixed sm:absolute z-50 left-3 right-3 top-[68px] sm:left-auto sm:right-0 sm:top-12 sm:w-60 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleMyPurchases}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="w-4 h-4" />
                      MY PURCHASES
                    </button>
                    <div className="h-px bg-border" />
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-60"
                    >
                      <Lock className="w-4 h-4" />
                      {loggingOut ? 'LOGGING OUT…' : 'LOGOUT'}
                    </button>
                  </div>
                </>
              )}
            </div>
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

function WatermarkBackground({ anchor = 'center' }) {
  const justify = anchor === 'title' ? 'justify-start' : 'justify-center'
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none select-none">
      <div className={`flex flex-col ${justify} opacity-[0.06] dark:opacity-[0.09]`}>
        {SITE_CONFIG.watermarkText.split(' ').map((word, i) => (
          <span
            key={i}
            className={`text-[25vw] font-black tracking-tighter leading-[0.8] text-foreground whitespace-nowrap ${leagueSpartan.className}`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}

function HeroSection({ selectedItem, setSelectedItem, setIsDetailOpen, onBookCall }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <PulsingGlow />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="relative">
          <WatermarkBackground anchor="title" />
          <h1 className={`relative z-10 font-black text-7xl sm:text-9xl md:text-10xl tracking-tighter leading-[0.85] mb-6 ${leagueSpartan.className}`}>
            {SITE_CONFIG.heroTitle.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
        </div>
      </div>

      {/* Break out of the max-w-4xl wrapper so CoachingCard gets full width on desktop */}
      <div className="relative z-10 w-full mb-12">
        <CoachingCard onBookCall={onBookCall} />
      </div>

      <div className="relative z-10 w-full mb-12 bg-black">
      <PremiumGallery pairs={pairs} eyebrow="RESULTS" heading="Real clients. Real numbers." />
      </div>


      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <p className="text-muted-foreground font-medium text-sm max-w-3xs mx-auto mb-12">
          {SITE_CONFIG.heroSubtitle}
        </p>
        <div className={`max-w-3xl mx-auto mb-12 py-4 pl-12 sm:pl-16 pr-4 ${leagueSpartan.className}`}>
          <div className="grid grid-cols-3 divide-x divide-foreground/15">
            {[
              { idx: "01", value: "04", label: "SYSTEMS" },
              { idx: "02", value: "01", label: "FRAMEWORK" },
              { idx: "03", value: "∞",  label: "LEVERAGE" },
            ].map((s) => (
              <div key={s.idx} className="flex flex-col px-6 sm:px-8">
                <span className="text-[10px] sm:text-xs tracking-[0.25em] text-muted-foreground/70 mb-2 sm:mb-3">{s.idx}</span>
                <span className="font-black leading-none text-6xl sm:text-10xl md:text-7xl text-foreground mb-2 sm:mb-3">{s.value}</span>
                <span className="text-[10px] sm:text-xs tracking-[0.25em] text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-8">
          COMPLETE BUNDLE • BEST VALUE
        </p>
        <MainPackageCard selectedItem={selectedItem} setSelectedItem={setSelectedItem} setIsDetailOpen={setIsDetailOpen} />
      </div>
    </section>
  )
}

function MainPackageCard({ selectedItem, setSelectedItem, setIsDetailOpen }) {
  const isSelected = selectedItem.some(i => i.type === 'main')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const handleSelect = (e) => {
    e.stopPropagation()
    if (isSelected) {
      setSelectedItem([])   // deselect → empty, triggers "Book a Free Call"
      return
    }
    setSelectedItem([{ type: 'main', id: MAIN_PACKAGE.id, price: MAIN_PACKAGE.price }])
  }

  const handleOpenDetails = () => {
    setDetailsOpen(true)
    setIsDetailOpen(true)
  }
  const handleCloseDetails = () => {
    setDetailsOpen(false)
    setIsDetailOpen(false)
  }
  useEffect(() => {
    if (!detailsOpen) return
    const onKey = (e) => { if (e.key === 'Escape') handleCloseDetails() }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [detailsOpen])
  return (
    <>
      <div className="relative max-w-md mx-auto cursor-pointer group" onClick={handleOpenDetails}>
        {isSelected && (
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#9400D3] via-[#9400D3] to-[#9400D3] rounded-3xl animate-border-glow" />
        )}
        <div className={`relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden text-white aspect-[3/4] flex flex-col ${!isSelected ? 'border border-neutral-700' : ''}`}>
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${isSelected ? 'brightness-125' : 'brightness-75 group-hover:brightness-110'}`}
            style={{ backgroundImage: `url(${MAIN_PACKAGE.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-transparent" />
          <button
            type="button"
            onClick={handleSelect}
            aria-label={isSelected ? 'Selected' : 'Select package'}
            aria-pressed={isSelected}
            className="absolute top-6 left-6 z-20 p-1 rounded-full cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-white/30' : 'border-neutral-600'}`}>
              {isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
          </button>
          <div className="absolute top-4 right-4 z-20">
            <span className="bg-[#9400D3] text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
              {MAIN_PACKAGE.badge}
            </span>
          </div>
          <div className="relative mt-auto p-8">
            <p className="text-[#9400D3] font-extrabold text-xs tracking-[0.2em] mb-4">{MAIN_PACKAGE.label}</p>
            <h2 className={`font-black text-3xl sm:text-4xl tracking-[0.01em] leading-[0.9] mb-20 ${leagueSpartan.className}`}>
              {MAIN_PACKAGE.title.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-neutral-400 text-sm mb-6 font-bold">{MAIN_PACKAGE.summary}</p>
            <ul className="space-y-2 mb-8">
              {MAIN_PACKAGE.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3]" />
                  {feature}
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm font-bold text-[#9400D3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3]" />
                SUPPORT+
              </li>
            </ul>
            <div className="flex items-baseline gap-3 mb-2">
              <span className={`text-4xl font-black ${leagueSpartan.className}`}>₹{MAIN_PACKAGE.price}</span>
              <span className="text-neutral-500 line-through">₹{MAIN_PACKAGE.originalPrice}</span>
              {MAIN_PACKAGE.discount && (
                <span className="text-[12px] font-bold text-[#9400D3] bg-[#9400D3]/15 px-1.5 py-0.5 rounded-md tracking-wide whitespace-nowrap">
                  {MAIN_PACKAGE.discount}
                </span>
              )}
            </div>
            <p className="text-[#9400D3] text-xs tracking-[0.15em] font-extrabold mb-1">{MAIN_PACKAGE.duration}</p>
            <p className="text-neutral-500 text-xs font-extrabold tracking-[0.1em]">{MAIN_PACKAGE.perMonth}</p>
          </div>
        </div>
      </div>
      {detailsOpen && createPortal(
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={handleCloseDetails}
          role="dialog"
          aria-modal="true"
          aria-label={`${MAIN_PACKAGE.title.join(' ')} details`}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] rounded-3xl overflow-hidden border border-neutral-700 shadow-2xl shadow-[#9400D3]/10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: `url(${MAIN_PACKAGE.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/50 to-neutral-950/80" />

            <div className="relative z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 sm:px-8 pt-6">
                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] text-white/60 hover:text-[#9400D3] transition-colors cursor-pointer"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                  BACK
                </button>
                <span className="text-xs tracking-[0.2em] text-[#9400D3]/70">{MAIN_PACKAGE.label}</span>
              </div>
              <div className="px-6 sm:px-8 pb-8 pt-6">
                <h3 className={`font-black text-3xl sm:text-4xl tracking-tight leading-[0.9] mb-6 ${leagueSpartan.className}`}>
                  {MAIN_PACKAGE.title.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h3>
                <div className="mb-8">
                  <p className="text-xs tracking-[0.2em] text-white/50 mb-2">{MAIN_PACKAGE.description.framework}</p>
                  <p className={`font-black text-lg tracking-tight leading-tight mb-3 ${leagueSpartan.className}`}>
                    {MAIN_PACKAGE.description.hook}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {MAIN_PACKAGE.description.body}
                  </p>
                  <p className="text-xs tracking-[0.2em] text-white/50 mb-3">WHAT'S INCLUDED</p>
                  <ul className="space-y-2 mb-6">
                    {MAIN_PACKAGE.description.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-2xl border border-[#9400D3]/40 bg-[#9400D3]/10 p-4 mb-6 animate-glow-pulse">
                    <p className={`text-sm tracking-[0.15em] text-[#9400D3] font-extrabold mb-2 ${leagueSpartan.className}`}>
                      {MAIN_PACKAGE.description.bonusTitle}
                    </p>
                    <p className="text-sm text-neutral-200 leading-relaxed">
                      {MAIN_PACKAGE.description.bonusBody}
                    </p>
                  </div>

                  <p className="text-xs tracking-[0.2em] text-white/50 mb-2">{MAIN_PACKAGE.description.whyTitle}</p>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {MAIN_PACKAGE.description.whyBody}
                  </p>

                  {MAIN_PACKAGE.description.afterPurchase && (
                    <div className="mb-6">
                      <p className="text-xs tracking-[0.2em] text-white/50 mb-3">
                        {MAIN_PACKAGE.description.afterPurchase.title}
                      </p>
                      <ol className="space-y-2 mb-4">
                        {MAIN_PACKAGE.description.afterPurchase.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3] mt-1.5 shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ol>

                      <div className="space-y-3 mb-4">
                        {MAIN_PACKAGE.description.afterPurchase.calls.map((call, i) => (
                          <div key={i} className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-3">
                            <p className={`text-sm font-bold text-[#9400D3] mb-1 ${leagueSpartan.className}`}>
                              {call.title}
                            </p>
                            <p className="text-sm text-neutral-300 leading-relaxed">
                              {call.body}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p className="flex items-start gap-2 text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3] mt-1.5 shrink-0" />
                        {MAIN_PACKAGE.description.afterPurchase.closingStep}
                      </p>
                    </div>
                  )}

                  <p className="text-xs tracking-[0.2em] text-white/50 mb-2">WHO THIS IS FOR</p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {MAIN_PACKAGE.description.whoFor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

function ProductsSection({ selectedItem, setSelectedItem, setIsDetailOpen }) {
  return (
    <section className="relative py-20 overflow-hidden">
      <WatermarkBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <p className="text-center text-xs tracking-[0.2em] font-bold text-muted-foreground mb-12">
          — OR — SELECT AN INDIVIDUAL EXPERIENCE
        </p>
        <div className="space-y-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              setIsDetailOpen={setIsDetailOpen}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, selectedItem, setSelectedItem, setIsDetailOpen }) {
  const isSelected = selectedItem.some(i => i.type === 'product' && i.id === product.id)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleSelect = (e) => {
    e.stopPropagation()
    setSelectedItem(prev => {
      const withoutMain = prev.filter(i => i.type !== 'main')
      const newItems = isSelected
        ? withoutMain.filter(i => i.id !== product.id)
        : [...withoutMain, { type: 'product', id: product.id, price: product.price }]
      const allProductIds = PRODUCTS.map(p => p.id)
      const selectedProductIds = newItems.filter(i => i.type === 'product').map(i => i.id)
      const allSelected = allProductIds.every(id => selectedProductIds.includes(id))
      if (allSelected) {
        return [{ type: 'main', id: MAIN_PACKAGE.id, price: MAIN_PACKAGE.price }]
      }
      return newItems   // ← no more fallback to main when newItems.length === 0
    })
  }

  const handleOpenDetails = () => {
    setDetailsOpen(true)
    setIsDetailOpen(true)
  }

  const handleCloseDetails = () => {
    setDetailsOpen(false)
    setIsDetailOpen(false)
  }

  useEffect(() => {
    if (!detailsOpen) return
    const onKey = (e) => { if (e.key === 'Escape') handleCloseDetails() }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [detailsOpen])

  return (
    <>
      <div
        className={`relative max-w-md mx-auto cursor-pointer group transition-transform duration-300 ease-out ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
        onClick={handleOpenDetails}
      >
        {isSelected && (
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#9400D3] via-[#9400D3] to-[#9400D3] rounded-3xl animate-border-glow" />
        )}
        <div className={`relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden text-white aspect-[3/4] flex flex-col transition-all duration-300 ${!isSelected ? 'border border-neutral-700' : ''} ${isSelected ? 'shadow-2xl shadow-[#9400D3]/20' : ''}`}>
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${isSelected ? 'brightness-125' : 'brightness-75 group-hover:brightness-110'}`}
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className={`absolute inset-0 transition-all duration-300 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-transparent ${isSelected ? 'opacity-70' : 'group-hover:opacity-50'}`} />
          <button
            type="button"
            onClick={handleSelect}
            aria-label={isSelected ? 'Deselect product' : 'Select product'}
            aria-pressed={isSelected}
            className="absolute top-6 right-6 z-20 p-1 rounded-full cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-[#9400D3] bg-[#9400D3]/20 scale-110' : 'border-neutral-600 group-hover:border-neutral-500 bg-neutral-950/40'}`}>
              {isSelected && <div className="w-3 h-3 rounded-full bg-[#9400D3] animate-pulse" />}
            </div>
          </button>
          <div className="relative z-10 px-8 pt-6">
            <p className={`text-xs tracking-[0.2em] font-extrabold transition-colors duration-300 ${isSelected ? 'text-[#9400D3]/70' : 'text-white/50'}`}>
              {product.category}
            </p>
          </div>
          <div className="relative z-10 px-8 mt-auto">
            {product.subtitle && (
              <p className="text-[#9400D3] font-bold text-xs tracking-[0.1em] mb-2">{product.subtitle}</p>
            )}
            <h3 className={`font-black text-3xl sm:text-4xl tracking-tight leading-[0.9] mb-6 ${leagueSpartan.className}`}>
              {product.title.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h3>
          </div>
          <div className="relative z-10 px-8 pb-8 flex items-end justify-between gap-4">
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${isSelected ? 'bg-[#9400D3] scale-125' : 'bg-[#9400D3]'}`} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center justify-end gap-2 mb-0.5">
                <span className="text-neutral-500 line-through text-sm">₹{product.originalPrice}</span>
                {product.discount && (
                  <span className="text-[12px] font-bold text-[#9400D3] bg-[#9400D3]/15 px-1.5 py-0.5 rounded-md tracking-wide whitespace-nowrap">
                    {product.discount}
                  </span>
                )}
              </div>
              <span className={`text-4xl font-black transition-colors duration-300 ${isSelected ? 'text-[#9400D3]' : 'text-white'} ${leagueSpartan.className}`}>
                ₹{product.price}
              </span>
              <p className="text-[#9400D3] text-xs font-bold tracking-[0.15em] mt-1">{product.duration}</p>
            </div>
          </div>
        </div>
      </div>

      {detailsOpen && createPortal(
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={handleCloseDetails}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title.join(' ')} details`}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-700 rounded-3xl text-white shadow-2xl shadow-[#9400D3]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 sm:px-8 pt-6">
              <button
                type="button"
                onClick={handleCloseDetails}
                className="flex items-center gap-2 text-xs tracking-[0.2em] text-white/60 hover:text-[#9400D3] transition-colors cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft className="w-4 h-4" />
                BACK
              </button>
              <p className="text-xs tracking-[0.2em] text-[#9400D3]/70">{product.category}</p>
            </div>
            <div className="px-6 sm:px-8 pb-8 pt-6">
              <h3 className={`font-black text-3xl sm:text-4xl tracking-tight leading-[0.9] mb-2 ${leagueSpartan.className}`}>
                {product.title.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h3>
              {product.subtitle && (
                <p className="text-[#9400D3] text-xs tracking-[0.1em] mb-6">• {product.subtitle}</p>
              )}

              {product.description && (
                <div className="mb-8">
                  <p className="text-xs tracking-[0.2em] text-white/50 mb-2">{product.description.framework}</p>
                  <p className={`font-black text-lg tracking-tight leading-tight mb-3 ${leagueSpartan.className}`}>
                    {product.description.hook}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {product.description.body}
                  </p>

                  <p className="text-xs tracking-[0.2em] text-white/50 mb-3">WHAT'S INCLUDED</p>
                  <ul className="space-y-2 mb-6">
                    {product.description.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {product.description.afterPurchase && (
                    <div className="mb-6">
                      <p className="text-xs tracking-[0.2em] text-white/50 mb-3">
                        {product.description.afterPurchase.title}
                      </p>
                      <ol className="space-y-2">
                        {product.description.afterPurchase.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3] mt-1.5 shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <p className="text-xs tracking-[0.2em] text-white/50 mb-2">WHO THIS IS FOR</p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {product.description.whoFor}
                  </p>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-1">
                <span className={`text-4xl font-black text-white ${leagueSpartan.className}`}>₹{product.price}</span>
                <span className="text-neutral-500 line-through">₹{product.originalPrice}</span>
              </div>
              <p className="text-[#9400D3] text-xs tracking-[0.15em]">{product.duration}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

function CalendarModal({ onClose, onDateSelect }) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const isDatePast = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return checkDate < todayStart
  }

  const isDateToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const isDateFuture = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return checkDate > todayStart
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-700">BOOK A FREE CALL</p>
            <p className="text-xs text-neutral-500 mt-1">Select a date to continue</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded transition-colors">
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <div className="p-6 bg-neutral-900 text-white">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm tracking-[0.1em]">{monthName}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map(day => (
              <div key={day} className="text-xs text-neutral-500 text-center py-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const isPast = isDatePast(day)
              const isTodayDate = isDateToday(day)
              const isFuture = isDateFuture(day)
              return (
                <button
                  key={day}
                  disabled={isPast}
                  onClick={() => onDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                  className={`
                    relative aspect-square flex items-center justify-center text-sm rounded-full transition-colors
                    ${isTodayDate ? 'ring-2 ring-[#9400D3] bg-[#9400D3]/20 text-white font-semibold' : ''}
                    ${isPast ? 'text-neutral-600 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}
                    ${isFuture ? 'text-white' : ''}
                  `}
                >
                  {day}
                  {isFuture && (
  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#9400D3] animate-blink-dot" />
)}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const SLOT_DEFINITIONS = [
  { id: 'slot1', name: 'SLOT 1', time: '9:00 AM - 9:30 AM',   hour: 9,  minute: 0 },
  { id: 'slot2', name: 'SLOT 2', time: '11:00 AM - 11:30 AM', hour: 11, minute: 0 },
  { id: 'slot3', name: 'SLOT 3', time: '1:00 PM - 1:30 PM',   hour: 13, minute: 0 },
  { id: 'slot4', name: 'SLOT 4', time: '3:00 PM - 3:30 PM',   hour: 15, minute: 0 },
  { id: 'slot5', name: 'SLOT 5', time: '5:00 PM - 5:30 PM',   hour: 17, minute: 0 },
  { id: 'slot6', name: 'SLOT 6', time: '7:00 PM - 7:30 PM',   hour: 19, minute: 0 },
]

function SlotModal({ selectedDate, onClose }) {
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const router = useRouter()

  const dateForBackend = selectedDate
    ? selectedDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  useEffect(() => {
    if (!selectedDate) return
    let isMounted = true
    setSelectedSlot(null)
    setLoadingSlots(true)
    setBookedSlots([])

    fetch(`/api/booking/slots?date=${encodeURIComponent(dateForBackend)}`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return
        if (data.success) {
          setBookedSlots(data.bookedSlots || [])
        }
      })
      .catch(err => {
        console.error('Failed to fetch booked slots:', err)
      })
      .finally(() => { if (isMounted) setLoadingSlots(false) })

    return () => { isMounted = false }
  }, [selectedDate, dateForBackend])

  if (!selectedDate) return null

  const dateStr = selectedDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).toUpperCase()

  // ── Time-based slot status (only relevant when selectedDate is today) ──
  const now = new Date()
  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate()

  // Build each slot's actual start Date for today, so we can compare against "now".
  const slotsWithTimeStatus = SLOT_DEFINITIONS.map(slot => {
    const slotStart = new Date(
      selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
      slot.hour, slot.minute
    )
    const isPast = isToday && slotStart.getTime() <= now.getTime()
    return { ...slot, isPast }
  })

  // Buffer rule: when booking for today, the next slot that hasn't passed yet
  // is held back as a buffer — shown as unavailable like it's booked, even
  // though it technically isn't, so nobody can lock in a call minutes away.
  let bufferSlotId = null
  if (isToday) {
    const nextUpcoming = slotsWithTimeStatus.find(
      s => !s.isPast && !bookedSlots.includes(s.id)
    )
    if (nextUpcoming) bufferSlotId = nextUpcoming.id
  }

  const handleConfirm = () => {
    if (!selectedSlot) return
    const params = new URLSearchParams({
      date: dateForBackend,
      slot: selectedSlot,
    })
    onClose()
    router.push(`/book-call?${params.toString()}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
        <div className="flex items-start justify-between p-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-700">FREE 1:1 CALL</p>
            <p className="text-xs font-medium tracking-[0.1em] text-neutral-500 mt-1">{dateStr}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded transition-colors">
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
        <div className="h-px bg-neutral-900 mx-6" />

        <div className="px-6 pt-6 pb-4 space-y-3">
          <p className="text-xs font-bold tracking-[0.15em] text-neutral-500">
            {loadingSlots ? 'CHECKING AVAILABILITY…' : 'SCHEDULING WINDOW'}
          </p>
        </div>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {slotsWithTimeStatus.map(slot => {
              const isBooked = bookedSlots.includes(slot.id)
              const isBuffer = bufferSlotId === slot.id
              const isSelected = selectedSlot === slot.id

              // Already passed today — grayed out, distinct from "booked"
              if (slot.isPast) {
                return (
                  <div
                    key={slot.id}
                    className="text-left p-5 rounded-2xl border-2 border-neutral-200 bg-neutral-100 cursor-not-allowed opacity-60"
                  >
                    <p className={`font-black text-sm tracking-tight text-neutral-400 ${leagueSpartan.className}`}>
                      {slot.name}
                    </p>
                    <p className="text-xs mt-2 font-bold tracking-[0.1em] text-neutral-400">
                      TIME PASSED
                    </p>
                  </div>
                )
              }

              // Genuinely booked, or held back as the buffer slot — both shown
              // identically as "BOOKED" so the buffer isn't distinguishable
              // (and therefore can't be reasoned around) from outside.
              if (isBooked || isBuffer) {
                return (
                  <div
                    key={slot.id}
                    className="text-left p-5 rounded-2xl border-2 border-red-500/60 bg-red-50 cursor-not-allowed opacity-80"
                  >
                    <p className={`font-black text-sm tracking-tight text-red-500 ${leagueSpartan.className}`}>
                      {slot.name}
                    </p>
                    <p className="text-xs mt-2 font-bold tracking-[0.1em] text-red-500">
                      BOOKED
                    </p>
                  </div>
                )
              }

              return (
                <button
                  key={slot.id}
                  disabled={loadingSlots}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 ${
                    isSelected
                      ? 'border-2 border-[#9400D3] bg-white shadow-[0_0_20px_rgba(148,0,211,0.5),inset_0_0_12px_rgba(148,0,211,0.08)]'
                      : 'border-2 border-neutral-200 bg-white hover:border-[#9400D3] hover:shadow-[0_0_14px_rgba(148,0,211,0.25)]'
                  } ${loadingSlots ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <p className={`font-black text-sm tracking-tight ${isSelected ? 'text-[#9400D3]' : 'text-neutral-800'} ${leagueSpartan.className}`}>
                    {slot.name}
                  </p>
                  <p className={`text-xs mt-2 ${isSelected ? 'text-[#9400D3]/70' : 'text-neutral-400'}`}>
                    {slot.time}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
        <div className="px-6 pb-8">
          <button
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className={`w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] transition-all duration-200 ${
              selectedSlot
                ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  )
}

function BookingSection({ selectedDate, setSelectedDate }) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const isDateToday = (day) => (
    day === today.getDate() &&
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear()
  )

  const isDatePast = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return checkDate < todayStart
  }

  const isDateFuture = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return checkDate > todayStart
  }

  const handleDateClick = (day) => {
    if (!isDatePast(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    }
  }

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className={`font-black text-5xl sm:text-7xl tracking-tighter leading-[0.85] mb-4 ${leagueSpartan.className}`}>
            {BOOKING_CONFIG.title.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="text-muted-foreground font-semibold max-w-sm mx-auto mb-12">
            {BOOKING_CONFIG.subtitle}
          </p>
          <div className="max-w-md mx-auto bg-neutral-900 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm tracking-[0.1em]">{monthName}</span>
              <div className="flex gap-2">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1 hover:bg-white/10 rounded transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1 hover:bg-white/10 rounded transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {days.map(day => (
                <div key={day} className="text-xs text-neutral-500 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const isTodayDate = isDateToday(day)
                const isPast = isDatePast(day)
                const isFuture = isDateFuture(day)
                return (
                  <button
                    key={day}
                    disabled={isPast}
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative aspect-square flex items-center justify-center text-sm rounded-full transition-colors
                      ${isTodayDate ? 'ring-2 ring-[#9400D3] bg-[#9400D3]/20 text-white font-semibold' : ''}
                      ${isPast ? 'text-neutral-600 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}
                      ${isFuture ? 'text-white' : ''}
                    `}
                  >
                    {day}
                    {isFuture && (
                      <span className="absolute bottom-1 left-1/2 w-1 h-1 rounded-full bg-[#9400D3] animate-blink-dot" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <SelectedModal selectedDate={selectedDate} onClose={() => setSelectedDate(null)} />
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-neutral-900 text-sm font-bold">{SITE_CONFIG.brandInitials}</span>
              </div>
              <div className={`font-black text-lg tracking-tight ${leagueSpartan.className}`}>
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
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-white font-medium hover:underline">{SITE_CONFIG.email}</a>
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

function StickyBottomBar({ selectedItem, setSelectedItem, selectedDate, isDetailOpen, calendarOpen, onBookCall }) {
  const [agreed, setAgreed] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const total = selectedItem.reduce((sum, i) => sum + i.price, 0)
  const showBestValue = selectedItem.some(i => i.type === 'product') && !selectedItem.some(i => i.type === 'main')
  const router = useRouter()
  const hasSelection = selectedItem.length > 0

  const handleUpgrade = () => {
    setSelectedItem(prev => prev.filter(i => i.type !== 'product').concat({ type: 'main', id: MAIN_PACKAGE.id, price: MAIN_PACKAGE.price }))
  }

  const handleUnlock = async () => {
    if (!agreed) return
    if (selectedItem.length === 0) return
    setIsUnlocking(true)
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      localStorage.setItem('selectedItems', JSON.stringify(selectedItem))
      if (!data.success) {
        localStorage.setItem('redirectAfterAuth', '/checkout')
        router.push('/login')
        return
      }
      router.push('/checkout')
    } catch (err) {
      console.error('Unlock error:', err)
    } finally {
      setIsUnlocking(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes sticky-glow-pulse {
          0%, 100% {
            box-shadow: 0 0 25px rgba(192,90,235,0.45), inset 0 0 10px rgba(192,90,235,0.12);
          }
          50% {
            box-shadow: 0 0 45px rgba(192,90,235,0.75), inset 0 0 20px rgba(192,90,235,0.25);
          }
        }
        .sticky-book-btn {
          background-color: #000000;
          color: #ffffff;
          border: 1.5px solid rgb(192,90,235);
          animation: sticky-glow-pulse 2.5s ease-in-out infinite;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .sticky-book-btn:hover {
          background-color: #1a1a1a;
          transform: scale(1.02);
        }
        .sticky-book-btn:active {
          transform: scale(0.98);
        }
      `}</style>
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${selectedDate || isDetailOpen || calendarOpen ? 'hidden' : ''}`}>
        <div className="max-w-[480px] mx-auto px-5 pb-4 pt-2">
          {!hasSelection ? (
            <button
              onClick={onBookCall}
              className="sticky-book-btn w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em]"
            >
              BOOK A FREE CALL
            </button>
          ) : (
            <>
              {showBestValue && (
                <div className="bg-neutral-900 rounded-xl mb-3 cursor-pointer shadow-[0_2px_16px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_4px_24px_-4px_rgba(148,0,211,0.4)] hover:bg-neutral-800">
                  <div className="px-5 py-2.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs tracking-[0.2em] text-[#9400D3] font-semibold">BEST VALUE</p>
                        <p className="text-sm text-white">Get the Full Bundle – Lifetime Access</p>
                      </div>
                      <button onClick={handleUpgrade} className="bg-[#9400D3] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] transition-all duration-200 hover:scale-105 active:scale-95 shrink-0">
                        UPGRADE
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-muted-foreground font-medium">TOTAL INVESTMENT</p>
                    <p className={`text-3xl font-black leading-tight tracking-tight ${leagueSpartan.className}`}>₹{total}</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setAgreed(!agreed)}
                      className={`w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-200 shrink-0 ${
                        agreed ? 'border-foreground bg-foreground' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                      }`}
                    >
                      {agreed && <div className="w-1 h-1 rounded-full bg-background" />}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      I agree to <Link href="#" className="text-foreground hover:underline">Terms</Link> & <Link href="#" className="text-foreground hover:underline">Refunds</Link>
                    </span>
                  </label>
                </div>
                <button
                  disabled={!agreed || isUnlocking}
                  onClick={handleUnlock}
                  className={`w-full py-3 rounded-lg font-semibold text-xs tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-200 ${
                    agreed
                      ? isUnlocking
                        ? 'bg-neutral-700 text-white scale-[0.98]'
                        : 'bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80 active:scale-[0.98]'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-muted-foreground/50 cursor-not-allowed'
                  }`}
                >
                  {isUnlocking ? 'CHECKING...' : 'UNLOCK ACCESS'}
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default function AryanMethodPage() {
  const [selectedItem, setSelectedItem] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const handleDateSelected = (date) => {
    setCalendarOpen(false)
    setSelectedDate(date)
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header isDetailOpen={isDetailOpen} />
      <HeroSection
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setIsDetailOpen={setIsDetailOpen}
        onBookCall={() => setCalendarOpen(true)}
      />
        <ProductsSection selectedItem={selectedItem} setSelectedItem={setSelectedItem} setIsDetailOpen={setIsDetailOpen} />
      <Footer />
      <StickyBottomBar
  selectedItem={selectedItem}
  setSelectedItem={setSelectedItem}
  selectedDate={selectedDate}
  isDetailOpen={isDetailOpen}
  calendarOpen={calendarOpen}
  onBookCall={() => setCalendarOpen(true)}
/><StickyBottomBar
  selectedItem={selectedItem}
  setSelectedItem={setSelectedItem}
  selectedDate={selectedDate}
  isDetailOpen={isDetailOpen}
  calendarOpen={calendarOpen}
  onBookCall={() => setCalendarOpen(true)}
/>
      {calendarOpen && (
        <CalendarModal
          onClose={() => setCalendarOpen(false)}
          onDateSelect={handleDateSelected}
        />
      )}
      <SlotModal
        selectedDate={selectedDate}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  )
}

// 