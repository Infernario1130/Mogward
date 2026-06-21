'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Lock, Zap, X, Mail, Phone, User, Menu, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { League_Spartan } from 'next/font/google'
import { PRODUCTS, MAIN_PACKAGE } from '@/lib/products'
import CoachingCard from "../components/CoachingCard.jsx"
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
    id: '40min',
    duration: '30-MINUTE SESSION',
    durationLabel: "Use this call to get your questions answered, clear any doubts about the program, and discuss anything that's holding you back.",
    price: 999,
    isPriority: true,
    badge: 'PRIORITY COMMS',
  },
]

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

function HeroSection({ selectedItem, setSelectedItem, setIsDetailOpen }) {
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
    if (isSelected) return
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
      return newItems.length === 0
        ? [{ type: 'main', id: MAIN_PACKAGE.id, price: MAIN_PACKAGE.price }]
        : newItems
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

function BookingModal({ selectedDate, onClose }) {
  const [selectedSession, setSelectedSession] = useState(SESSION_OPTIONS.find(s => s.isPriority) || SESSION_OPTIONS[0])
  const [step, setStep] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [agreed, setAgreed] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [authMode, setAuthMode] = useState('register')
  const [registerData, setRegisterData] = useState({ fullName: '', email: '', phone: '', password: '' })
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const router = useRouter()

  if (!selectedDate) return null

  const dateStr = selectedDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).toUpperCase()

  const dateForBackend = selectedDate.toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  const slots = [
    { id: 'slot1', name: 'SLOT 1', time: '9:00 AM - 9:30 AM' },
    { id: 'slot2', name: 'SLOT 2', time: '11:00 AM - 11:30 AM' },
    { id: 'slot3', name: 'SLOT 3', time: '1:00 PM - 1:30 PM' },
    { id: 'slot4', name: 'SLOT 4', time: '3:00 PM - 3:30 PM' },
    { id: 'slot5', name: 'SLOT 5', time: '5:00 PM - 5:30 PM' },
    { id: 'slot6', name: 'SLOT 6', time: '7:00 PM - 7:30 PM' },
  ]

  const handleProceedFromRegister = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.fullName,
          email: registerData.email,
          phone: registerData.phone,
          password: registerData.password,
        }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.message); return }
      setAuthMode('register')
      setStep(4)
    } catch (err) {
      setError('Something went wrong please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleProceedFromLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginData.email, password: loginData.password }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.message); return }
      setAuthMode('login')
      setStep(4)
    } catch (err) {
      setError('Something went wrong please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlockAccess = async () => {
    if (!agreed) return
    setError('')
    setLoading(true)
    try {
      const orderRes = await fetch('/api/booking/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: selectedSession.id, date: dateForBackend, slot: selectedSlot }),
      })
      const orderData = await orderRes.json()
      if (!orderData.success) { setError(orderData.message); setLoading(false); return }

      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'ARYANHEIS',
        description: `1:1 Call — ${selectedSession.duration}`,
        order_id: orderData.order.id,
        prefill: { name: orderData.user.name, email: orderData.user.email, contact: orderData.user.phone },
        theme: { color: '#000000' },
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/booking/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                sessionId: selectedSession.id,
                date: dateForBackend,
                slot: selectedSlot,
              }),
            })
            const verifyData = await verifyRes.json()
            if (!verifyData.success) { setError(verifyData.message); return }
            localStorage.setItem('bookingDetails', JSON.stringify({
              date: dateForBackend,
              slot: selectedSlot,
              duration: selectedSession.duration,
              price: selectedSession.price,
              bookingId: verifyData.booking.id,
              razorpayPaymentId: verifyData.booking.razorpayPaymentId,
            }))
            onClose()
            router.push('/booking-success')
          } catch (err) {
            setError('Payment verification failed please contact support')
          }
        },
      }

      const razorpay = new window.Razorpay(razorpayOptions)
      razorpay.on('payment.failed', () => { setError('Payment failed please try again'); setLoading(false) })
      razorpay.open()
    } catch (err) {
      setError('Something went wrong please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
        <div className="flex items-start justify-between p-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-700">1:1 CALL</p>
            <p className="text-xs font-medium tracking-[0.1em] text-neutral-500 mt-1">{dateStr}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded transition-colors">
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
        <div className="h-px bg-neutral-900 mx-6" />

        {step === 0 && (
          <>
            <div className="p-6 space-y-4">
            <p className="text-xs text-green-600 font-semibold text-center px-6 py-4">
            The call is effectively free if you decide to move forward with the program.
</p>
              {SESSION_OPTIONS.map(session => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                    selectedSession.id === session.id
                      ? 'border-2 border-red-500 bg-red-50 shadow-[0_0_20px_rgba(239,68,68,0.3)] scale-105'
                      : 'border-2 border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-black text-sm tracking-tight ${selectedSession.id === session.id ? 'text-neutral-900' : 'text-neutral-800'} ${leagueSpartan.className}`}>
                      {session.duration}
                    </span>
                    <span className={`font-black text-lg tracking-tight text-neutral-900 ${leagueSpartan.className}`}>₹{session.price}</span>
                  </div>
                  <p className="text-xs text-neutral-500 tracking-[0.05em]">{session.durationLabel}</p>
                  {session.badge && selectedSession.id === session.id && (
                    <div className="mt-3 inline-block">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-[0.1em]">{session.badge}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={() => setStep(1)}
                className="w-full bg-neutral-900 text-white py-3 rounded-lg font-bold text-xs tracking-[0.15em] hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                BOOK SESSION
              </button>
            </div>
          </>
        )}

{step === 1 && (
  <>
    <div className="px-6 pt-6 pb-4 space-y-3">
      <button onClick={() => setStep(0)} className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]">
        <ChevronLeft className="w-4 h-4" />
        BACK TO TIERS
      </button>
      <p className="text-xs font-bold tracking-[0.15em] text-neutral-500">SCHEDULING WINDOW</p>
    </div>
    <div className="px-6 pb-6">
      <div className="grid grid-cols-2 gap-4">
        {slots.map(slot => (
          <button
            key={slot.id}
            onClick={() => setSelectedSlot(slot.id)}
            className={`text-left p-5 rounded-2xl transition-all duration-300 ${
              selectedSlot === slot.id
                ? 'border-2 border-[#9400D3] bg-white shadow-[0_0_20px_rgba(148,0,211,0.5),inset_0_0_12px_rgba(148,0,211,0.08)]'
                : 'border-2 border-neutral-200 bg-white hover:border-[#9400D3] hover:shadow-[0_0_14px_rgba(148,0,211,0.25)]'
            }`}
          >
            <p className={`font-black text-sm tracking-tight ${selectedSlot === slot.id ? 'text-[#9400D3]' : 'text-neutral-800'} ${leagueSpartan.className}`}>
              {slot.name}
            </p>
            <p className={`text-xs mt-2 ${selectedSlot === slot.id ? 'text-[#9400D3]/70' : 'text-neutral-400'}`}>
              {slot.time}
            </p>
          </button>
        ))}
      </div>
    </div>
    <div className="px-6 pb-8">
      <button
        onClick={() => setStep(2)}
        disabled={!selectedSlot}
        className={`w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] transition-all duration-200 ${
          selectedSlot
            ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
            : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
        }`}
      >
        CONFIRM BOOKING
      </button>
    </div>
  </>
)}

        {step === 2 && (
          <>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]">
                  <ChevronLeft className="w-4 h-4" />
                  BACK TO SLOTS
                </button>
                <button onClick={() => { setError(''); setStep(3) }} className="text-xs font-bold text-[#9400D3] tracking-[0.1em] transition-colors">
                  ALREADY REGISTERED?
                </button>
              </div>
              <p className="text-xs font-bold tracking-[0.15em] text-neutral-500">PERSONNEL DETAILS</p>
            </div>
            <div className="px-6 pb-6 space-y-3">
              {[
                { field: 'fullName', type: 'text', placeholder: 'Full Name', icon: <User className="w-5 h-5 text-neutral-400" /> },
                { field: 'email', type: 'email', placeholder: 'Email Address', icon: <Mail className="w-5 h-5 text-neutral-400" /> },
                { field: 'phone', type: 'tel', placeholder: 'Phone Number', icon: <Phone className="w-5 h-5 text-neutral-400" /> },
                { field: 'password', type: 'password', placeholder: 'Create Password', icon: <Lock className="w-5 h-5 text-neutral-400" /> },
              ].map(({ field, type, placeholder, icon }) => (
                <div
                  key={field}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                    focusedField === field
                      ? 'border-2 border-[#9400D3] bg-[#9400D3] shadow-[0_0_20px_rgba(148,0,211,0.3)]'
                      : 'border-2 border-neutral-200 bg-white'
                  }`}
                >
                  {icon}
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={registerData[field]}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, [field]: e.target.value }))}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 bg-transparent outline-none text-sm text-neutral-800 placeholder-neutral-400"
                  />
                </div>
              ))}
              {error && <p className="text-red-500 text-xs text-center tracking-wide">{error}</p>}
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={handleProceedFromRegister}
                disabled={
                  loading ||
                  !registerData.fullName || registerData.fullName.length < 2 ||
                  !registerData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email) ||
                  !registerData.phone || !/^\d{10}$/.test(registerData.phone) ||
                  !registerData.password || registerData.password.length < 8
                }
                className={`w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] transition-all duration-200 ${
                  !loading && registerData.fullName?.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email) && /^\d{10}$/.test(registerData.phone) && registerData.password?.length >= 8
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'REGISTERING...' : 'PROCEED'}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button onClick={() => { setError(''); setStep(2) }} className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]">
                  <ChevronLeft className="w-4 h-4" />
                  BACK
                </button>
                <button onClick={() => { setError(''); setStep(2) }} className="text-xs font-bold text-[#9400D3] tracking-[0.1em] transition-colors">
                  NOT REGISTERED?
                </button>
              </div>
              <p className="text-xs font-bold tracking-[0.15em] text-neutral-500">AUTHENTICATE</p>
            </div>
            <div className="px-6 pb-6 space-y-3">
              {[
                { field: 'email', type: 'email', placeholder: 'Email Address', icon: <Mail className="w-5 h-5 text-neutral-400" /> },
                { field: 'password', type: 'password', placeholder: 'Password', icon: <Lock className="w-5 h-5 text-neutral-400" /> },
              ].map(({ field, type, placeholder, icon }) => (
                <div
                  key={field}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                    focusedField === field
                      ? 'border-2 border-[#9400D3] bg-[#9400D3] shadow-[0_0_20px_rgba(148,0,211,0.3)]'
                      : 'border-2 border-neutral-200 bg-white'
                  }`}
                >
                  {icon}
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={loginData[field]}
                    onChange={(e) => setLoginData(prev => ({ ...prev, [field]: e.target.value }))}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 bg-transparent outline-none text-sm text-neutral-800 placeholder-neutral-400"
                  />
                </div>
              ))}
              {error && <p className="text-red-500 text-xs text-center tracking-wide">{error}</p>}
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={handleProceedFromLogin}
                disabled={
                  loading ||
                  !loginData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email) ||
                  !loginData.password || loginData.password.length < 8
                }
                className={`w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] transition-all duration-200 ${
                  !loading && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email) && loginData.password?.length >= 8
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & START'}
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="px-6 pt-6 pb-2">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 h-[3px] rounded-full bg-neutral-900" />
                ))}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]">
                <ChevronLeft className="w-4 h-4" />
                BACK TO DETAILS
              </button>
              <p className="text-xs font-bold tracking-[0.15em] text-neutral-500">AUTHORIZATION</p>
            </div>
            <div className="px-6 pb-6 space-y-4">
              <div className="border-2 border-neutral-200 rounded-2xl p-4 flex items-center gap-3">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 ${agreed ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-300'}`}
                >
                  {agreed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-neutral-600 tracking-wide">
                  I agree to the{' '}
                  <Link href="/terms" className="underline text-neutral-800 font-semibold">Terms</Link>,{' '}
                  <Link href="/refund" className="underline text-neutral-800 font-semibold">Refund</Link>{' '}
                  &{' '}
                  <Link href="/privacy" className="underline text-neutral-800 font-semibold">Privacy Policy</Link>.
                </p>
              </div>
              <div className="border-2 border-neutral-100 bg-neutral-50 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.15em] text-neutral-500 font-medium mb-1">INVESTMENT</p>
                  <p className={`text-2xl font-black text-neutral-900 tracking-tight ${leagueSpartan.className}`}>₹{selectedSession.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs tracking-[0.15em] text-neutral-500 font-medium mb-1">DURATION</p>
                  <p className={`text-2xl font-black text-neutral-900 tracking-tight ${leagueSpartan.className}`}>{selectedSession.durationLabel.split(' ')[0]} <span className="text-sm font-bold">MIN</span></p>
                </div>
              </div>
              {error && <p className="text-red-500 text-xs text-center tracking-wide">{error}</p>}
            </div>
            <div className="px-6 pb-6">
              <button
                disabled={!agreed || loading}
                onClick={handleUnlockAccess}
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-200 ${
                  agreed && !loading
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'PROCESSING...' : 'UNLOCK ACCESS'}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </>
        )}
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
      <BookingModal selectedDate={selectedDate} onClose={() => setSelectedDate(null)} />
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

function StickyBottomBar({ selectedItem, setSelectedItem, selectedDate, isDetailOpen, calendarOpen }) {
  const [agreed, setAgreed] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const total = selectedItem.reduce((sum, i) => sum + i.price, 0)
  const showBestValue = selectedItem.some(i => i.type === 'product') && !selectedItem.some(i => i.type === 'main')
  const router = useRouter()

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
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${selectedDate || isDetailOpen || calendarOpen ? 'hidden' : ''}`}>
      <div className="max-w-[480px] mx-auto px-5 pb-4 pt-2">
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
      </div>
    </div>
  )
}

export default function AryanMethodPage() {
  const [selectedItem, setSelectedItem] = useState([{ type: 'main', id: MAIN_PACKAGE.id, price: MAIN_PACKAGE.price }])
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
      <HeroSection selectedItem={selectedItem} setSelectedItem={setSelectedItem} setIsDetailOpen={setIsDetailOpen} />
      <ProductsSection selectedItem={selectedItem} setSelectedItem={setSelectedItem} setIsDetailOpen={setIsDetailOpen} />
      <CoachingCard onBookCall={() => setCalendarOpen(true)} />
      <Footer />
      <StickyBottomBar
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        selectedDate={selectedDate}
        isDetailOpen={isDetailOpen}
        calendarOpen={calendarOpen}
      />
      {calendarOpen && (
        <CalendarModal
          onClose={() => setCalendarOpen(false)}
          onDateSelect={handleDateSelected}
        />
      )}
      <BookingModal
        selectedDate={selectedDate}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  )
}

// 