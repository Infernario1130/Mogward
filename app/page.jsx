'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const SITE_CONFIG = {
  brandName: "ARYANHEIS",
  brandInitials: "AH",
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

const MAIN_PACKAGE = {
  id: "6a2160af38cf5aec331a473f",
  badge: "LIMITED OFFER",
  label: "LEVEL UP",
  title: ["THE ARYAN", "METHOD"],
  description: "Full access to everything. Peak performance guaranteed.",
  features: ["THE SUMMER SPLIT", "MUSCLE KITCHEN", "SKIN CARE", "HAIR CARE"],
  price: 2799,
  originalPrice: 4999,
  duration: "3 MONTHS FULL ACCESS",
  perMonth: "₹933 PER MONTH"
}

const PRODUCTS = [
  {
    id: "6a2160af38cf5aec331a473b",
    category: "WORKOUTS",
    title: ["THE SUMMER", "SPLIT"],
    features: ["MY WORKOUT SPLIT", "WORKOUT LOGGER", "PERFORMANCE ANALYTICS"],
    price: 1199,
    originalPrice: 1800,
    duration: "1 MONTH ACCESS",
    image: "/images/workouts.png",
    subtitle: "FITNESS TRANSFORMATION"
  },
  {
    id: "6a2160af38cf5aec331a473c",
    category: "NUTRITION",
    title: ["MUSCLE", "KITCHEN"],
    subtitle: "(SUMMER EDITION)",
    features: ["6 NEW MEALS EVERYDAY", "VEG/NON-VEG", "EASY TO FOLLOW RECIPES", "MACROS BREAKDOWN"],
    price: 999,
    originalPrice: 1799,
    duration: "1 MONTH ACCESS",
    image: "/images/nutrition.png"
  },
  {
    id: "6a2160af38cf5aec331a473d",
    category: "AESTHETICS",
    title: ["HAIR", "CARE"],
    features: ["GET CURLY HAIR NATURALLY", "FIX DAMAGED HAIR", "PRODUCTS GUIDE", "HAIR STYLING GUIDE"],
    price: 799,
    originalPrice: 1299,
    duration: "1 MONTH ACCESS",
    subtitle: "HAIR OPTIMISATION",
    image: "/images/haircare.png"
  },
  {
    id: "6a2160af38cf5aec331a473e",
    category: "AESTHETICS",
    title: ["SKIN", "CARE"],
    features: ["SKIN TYPE DIAGNOSTICS", "PERSONALISED AM/PM ROUTINE", "PRODUCTS GUIDE", "DE-TAN", "MISTAKES TO AVOID"],
    price: 599,
    originalPrice: 999,
    duration: "1 MONTH ACCESS",
    subtitle: "SKIN CARE MASTERY",
    image: "/images/skincare.png"
  }
]

const BOOKING_CONFIG = {
  title: ["BOOK A", "1:1 CALL"],
  subtitle: "Secure your priority slot for a high-performance consultation."
}



function PulsingGlow() {
  return (
    <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{
          width: '120%',
          height: '600px',
          background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(249,115,22,0.95) 0%, rgba(249,115,22,0.55) 35%, rgba(249,115,22,0.15) 65%, transparent 85%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{
          width: '80%',
          height: '500px',
          background: 'radial-gradient(ellipse 60% 55% at 50% 15%, rgba(220,50,30,0.8) 0%, rgba(220,50,30,0.4) 40%, transparent 75%)',
          filter: 'blur(20px)',
          animationDelay: '0.3s',
        }}
      />
    </div>
  )
}

function Header() {
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
          <Link 
            href="/login"
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors"
          >
            LOGIN
            <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}

function WatermarkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 flex flex-col justify-center opacity-[0.06] dark:opacity-[0.09]">
        {SITE_CONFIG.watermarkText.split(' ').map((word, i) => (
          <span 
            key={i} 
            className="text-[25vw] font-black tracking-tighter leading-[0.8] text-foreground whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}



function HeroSection({ selectedItem, setSelectedItem }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <WatermarkBackground />
      <PulsingGlow />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.85] mb-6">
          {SITE_CONFIG.heroTitle.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-12">
          {SITE_CONFIG.heroSubtitle}
        </p>
        <p className="text-xs tracking-[0.2em] text-muted-foreground mb-8">
          BEST VALUE • UNLOCK EVERYTHING
        </p>
        <MainPackageCard selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </div>
    </section>
  )
}

function MainPackageCard({ selectedItem, setSelectedItem }) {
  const isSelected = selectedItem.some(i => i.type === 'main')
  const handleSelect = () => {
    setSelectedItem(prev =>
      isSelected ? prev.filter(i => i.type !== 'main') : [{ type: 'main', id: MAIN_PACKAGE.id, price: MAIN_PACKAGE.price }]
    )
  }

  return (
    <div
      className="relative max-w-md mx-auto cursor-pointer"
      onClick={handleSelect}
    >
      {/* Animated border glow */}
      {isSelected && (
        <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl animate-border-glow" />
      )}
      <div className={`relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl p-8 text-white ${!isSelected ? 'border border-neutral-700' : ''}`}>
        {/* Selection indicator */}
        <div className="absolute top-6 left-6">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-white/30' : 'border-neutral-600'}`}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
          </div>
        </div>
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
            {MAIN_PACKAGE.badge}
          </span>
        </div>
        <div className="pt-8">
          <p className="text-orange-400 text-xs tracking-[0.2em] mb-3">{MAIN_PACKAGE.label}</p>
          <h2 className="font-black text-3xl sm:text-4xl tracking-tight leading-tight mb-4">
            {MAIN_PACKAGE.title.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="text-neutral-400 text-sm mb-6">{MAIN_PACKAGE.description}</p>
          <ul className="space-y-2 mb-8">
            {MAIN_PACKAGE.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-black">₹{MAIN_PACKAGE.price}</span>
            <span className="text-neutral-500 line-through">₹{MAIN_PACKAGE.originalPrice}</span>
          </div>
          <p className="text-orange-400 text-xs tracking-[0.15em] mb-1">{MAIN_PACKAGE.duration}</p>
          <p className="text-neutral-500 text-xs tracking-[0.1em]">{MAIN_PACKAGE.perMonth}</p>
        </div>
      </div>
    </div>
  )
}

function ProductsSection({ selectedItem, setSelectedItem }) {
  return (
    <section className="relative py-20 overflow-hidden">
      <WatermarkBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <p className="text-center text-xs tracking-[0.2em] text-muted-foreground mb-12">
          — OR — SELECT AN INDIVIDUAL EXPERIENCE
        </p>
        <div className="space-y-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, selectedItem, setSelectedItem }) {
  const isSelected = selectedItem.some(i => i.type === 'product' && i.id === product.id)
  const handleSelect = () => {
    setSelectedItem(prev => {
      const withoutMain = prev.filter(i => i.type !== 'main')
      return isSelected ? withoutMain.filter(i => i.id !== product.id) : [...withoutMain, { type: 'product', id: product.id, price: product.price }]
    })
  }

  return (
    <div
      className={`relative max-w-md mx-auto cursor-pointer group transition-transform duration-300 ease-out ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
      onClick={handleSelect}
    >
      {/* Animated border glow */}
      {isSelected && (
        <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl animate-border-glow" />
      )}
      <div className={`relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden text-white transition-all duration-300 ${!isSelected ? 'border border-neutral-700' : ''} ${isSelected ? 'shadow-2xl shadow-orange-500/20' : ''}`}>
        {/* Background Image - visible by default, brighter on hover */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${isSelected ? 'brightness-125' : 'brightness-75 group-hover:brightness-110'}`}
          style={{
            backgroundImage: `url(${product.image})`,
          }}
        />
        {/* Subtle dark overlay for text readability - lightens on hover */}
        <div className={`absolute inset-0 transition-all duration-300 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-transparent ${isSelected ? 'opacity-70' : 'group-hover:opacity-50'}`} />
        {/* Selection indicator */}
        <div className="absolute top-6 right-6 z-10">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-orange-400 bg-orange-500/20 scale-110' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />}
          </div>
        </div>
        {/* Content */}
        <div className="relative p-8">
          <p className={`text-xs tracking-[0.2em] mb-6 transition-colors duration-300 ${isSelected ? 'text-orange-400/70' : 'text-white/50'}`}>{product.category}</p>
          <h3 className="font-black text-3xl sm:text-4xl tracking-tight leading-tight mb-2">
            {product.title.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h3>
          {product.subtitle && (
            <p className="text-orange-400 text-xs tracking-[0.1em] mb-4">• {product.subtitle}</p>
          )}
          <ul className="space-y-2 mb-8">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isSelected ? 'bg-orange-400 scale-125' : 'bg-orange-500'}`} />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex items-baseline gap-3 mb-2">
            <span className={`text-4xl font-black transition-colors duration-300 ${isSelected ? 'text-orange-50' : 'text-white'}`}>₹{product.price}</span>
            <span className="text-neutral-500 line-through">₹{product.originalPrice}</span>
          </div>
          <p className="text-orange-400 text-xs tracking-[0.15em]">{product.duration}</p>
        </div>
      </div>
    </div>
  )
}

function BookingSection() {
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
  
  
  const isDateToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }
  

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
  
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-black text-5xl sm:text-7xl tracking-tighter leading-[0.85] mb-4">
          {BOOKING_CONFIG.title.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto mb-12">
          {BOOKING_CONFIG.subtitle}
        </p>
        
       
        <div className="max-w-md mx-auto bg-neutral-900 rounded-3xl p-6 text-white">
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
              <div key={day} className="text-xs text-neutral-500 py-2">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const isTodayDate = isDateToday(day)
              const isPast = isDatePast(day)
              const isFuture = isDateFuture(day)
              
              return (
                <button
                  key={day}
                  disabled={isPast}
                  className={`
                    relative aspect-square flex items-center justify-center text-sm rounded-full
                    transition-colors
                    ${isTodayDate ? 'ring-2 ring-orange-500 bg-orange-500/20 text-white font-semibold' : ''}
                    ${isPast ? 'text-neutral-600 cursor-not-allowed' : 'hover:bg-white/10'}
                    ${isFuture ? 'text-white' : ''}
                  `}
                >
                  {day}
                  {isFuture && (
                    <span className="absolute bottom-1 left-1/2 w-1 h-1 rounded-full bg-orange-500 animate-blink-dot" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
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
        </div>``
      </div>
    </footer>
  )
}

function StickyBottomBar({ selectedItem, setSelectedItem }) {
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
      // Check if user is logged in
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      // Save selected items to localStorage regardless
      localStorage.setItem('selectedItems', JSON.stringify(selectedItem))

      if (!data.success) {
        // Not logged in — save redirect destination and go to login
        localStorage.setItem('redirectAfterAuth', '/checkout')
        router.push('/login')
        return
      }

      // Logged in — go straight to checkout
      router.push('/checkout')

    } catch (err) {
      console.error('Unlock error:', err)
    } finally {
      setIsUnlocking(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-[480px] mx-auto px-5 pb-4 pt-2">

        {showBestValue && (
          <div className="bg-neutral-900 rounded-xl mb-3 cursor-pointer shadow-[0_2px_16px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_4px_24px_-4px_rgba(249,115,22,0.4)] hover:bg-neutral-800">
            <div className="px-5 py-2.5">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs tracking-[0.2em] text-orange-400 font-semibold">BEST VALUE</p>
                  <p className="text-sm text-white">Get the Full Bundle – Just ₹933/mo</p>
                </div>
                <button
                  onClick={handleUpgrade}
                  className="bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                >
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
              <p className="text-3xl font-black leading-tight tracking-tight">₹{total}</p>
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

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      <HeroSection selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <ProductsSection selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <BookingSection />
      <Footer />
      <StickyBottomBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    </div>
  )
}
