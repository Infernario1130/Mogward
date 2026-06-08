'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lock, Zap, X, Mail, Phone, User } from 'lucide-react'
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

const SESSION_OPTIONS = [
  {
    id: '40min',
    duration: '40-MINUTE SESSION',
    durationLabel: '40 MIN SESSION',
    price: 1999,
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
    <div className="relative max-w-md mx-auto cursor-pointer" onClick={handleSelect}>
      {isSelected && (
        <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl animate-border-glow" />
      )}
      <div className={`relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl p-8 text-white ${!isSelected ? 'border border-neutral-700' : ''}`}>
        <div className="absolute top-6 left-6">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-white/30' : 'border-neutral-600'}`}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
          </div>
        </div>
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
      {isSelected && (
        <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl animate-border-glow" />
      )}
      <div className={`relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden text-white transition-all duration-300 ${!isSelected ? 'border border-neutral-700' : ''} ${isSelected ? 'shadow-2xl shadow-orange-500/20' : ''}`}>
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${isSelected ? 'brightness-125' : 'brightness-75 group-hover:brightness-110'}`}
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className={`absolute inset-0 transition-all duration-300 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-transparent ${isSelected ? 'opacity-70' : 'group-hover:opacity-50'}`} />
        <div className="absolute top-6 right-6 z-10">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-orange-400 bg-orange-500/20 scale-110' : 'border-neutral-600 group-hover:border-neutral-500'}`}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />}
          </div>
        </div>
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

function BookingModal({ selectedDate, onClose }) {
  const [selectedSession, setSelectedSession] = useState(SESSION_OPTIONS.find(s => s.isPriority) || SESSION_OPTIONS[0])
  const [step, setStep] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [agreed, setAgreed] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [authMode, setAuthMode] = useState('register') // 'register' or 'login'
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  })
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  if (!selectedDate) return null

  const dateStr = selectedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase()

  const dateForBackend = selectedDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const slots = [
    { id: 'slot1', name: 'SLOT 1' },
    { id: 'slot2', name: 'SLOT 2' },
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
      if (!data.success) {
        setError(data.message)
        return
      }
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
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.message)
        return
      }
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
      // Step 1 — Create booking order
      const orderRes = await fetch('/api/booking/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          date: dateForBackend,
          slot: selectedSlot,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderData.success) {
        setError(orderData.message)
        setLoading(false)
        return
      }

      // Step 2 — Open Razorpay popup
      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'ARYANHEIS',
        description: `1:1 Call — ${selectedSession.duration}`,
        order_id: orderData.order.id,
        prefill: {
          name: orderData.user.name,
          email: orderData.user.email,
          contact: orderData.user.phone,
        },
        theme: {
          color: '#000000',
        },
        handler: async (response) => {
          // Step 3 — Verify payment
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

            if (!verifyData.success) {
              setError(verifyData.message)
              return
            }

            // Step 4 — Save booking details and redirect
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

      razorpay.on('payment.failed', () => {
        setError('Payment failed please try again')
        setLoading(false)
      })

      razorpay.open()

    } catch (err) {
      setError('Something went wrong please try again')
    } finally {
      setLoading(false)
    }
  }

  const totalSteps = 4
  const progressSteps = [0, 1, 2, 4]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">

        {/* Header */}
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

        {/* Step 0: Session Selection */}
        {step === 0 && (
          <>
            <div className="p-6 space-y-4">
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
                    <span className={`font-black text-sm tracking-tight ${selectedSession.id === session.id ? 'text-neutral-900' : 'text-neutral-800'}`}>
                      {session.duration}
                    </span>
                    <span className="font-black text-lg tracking-tight text-neutral-900">₹{session.price}</span>
                  </div>
                  <p className="text-xs text-neutral-500 tracking-[0.05em]">{session.durationLabel}</p>
                  {session.badge && selectedSession.id === session.id && (
                    <div className="mt-3 inline-block">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-[0.1em]">
                        {session.badge}
                      </span>
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

        {/* Step 1: Slot Selection */}
        {step === 1 && (
          <>
            <div className="p-6 space-y-4">
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]"
              >
                <ChevronLeft className="w-4 h-4" />
                BACK TO TIERS
              </button>
              <p className="text-xs font-bold tracking-[0.15em] text-neutral-500">SCHEDULING WINDOW</p>
            </div>
            <div className="px-6 pb-6 space-y-3">
              {slots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                    selectedSlot === slot.id
                      ? 'border-2 border-orange-500 bg-orange-50 shadow-[0_0_25px_rgba(249,115,22,0.4)] scale-105'
                      : 'border-2 border-neutral-200 bg-white hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]'
                  }`}
                >
                  <p className={`font-black text-sm italic tracking-tight ${selectedSlot === slot.id ? 'text-orange-600' : 'text-neutral-800'}`}>
                    {slot.name}
                  </p>
                </button>
              ))}
            </div>
            <div className="px-6 pb-6">
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

        {/* Step 2: Register Form */}
        {step === 2 && (
          <>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  BACK TO SLOTS
                </button>
                <button
                  onClick={() => { setError(''); setStep(3) }}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 tracking-[0.1em] transition-colors"
                >
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
                      ? 'border-2 border-orange-500 bg-orange-50 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
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
              {error && (
                <p className="text-red-500 text-xs text-center tracking-wide">{error}</p>
              )}
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={handleProceedFromRegister}
                disabled={
                  loading ||
                  !registerData.fullName ||
                  registerData.fullName.length < 2 ||
                  !registerData.email ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email) ||
                  !registerData.phone ||
                  !/^\d{10}$/.test(registerData.phone) ||
                  !registerData.password ||
                  registerData.password.length < 8
                }
                className={`w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] transition-all duration-200 ${
                  !loading &&
                  registerData.fullName?.length >= 2 &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email) &&
                  /^\d{10}$/.test(registerData.phone) &&
                  registerData.password?.length >= 8
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'REGISTERING...' : 'PROCEED'}
              </button>
            </div>
          </>
        )}

        {/* Step 3: Login Form */}
        {step === 3 && (
          <>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => { setError(''); setStep(2) }}
                  className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  BACK
                </button>
                <button
                  onClick={() => { setError(''); setStep(2) }}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 tracking-[0.1em] transition-colors"
                >
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
                      ? 'border-2 border-orange-500 bg-orange-50 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
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
              {error && (
                <p className="text-red-500 text-xs text-center tracking-wide">{error}</p>
              )}
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={handleProceedFromLogin}
                disabled={
                  loading ||
                  !loginData.email ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email) ||
                  !loginData.password ||
                  loginData.password.length < 8
                }
                className={`w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] transition-all duration-200 ${
                  !loading &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email) &&
                  loginData.password?.length >= 8
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & START'}
              </button>
            </div>
          </>
        )}

        {/* Step 4: Authorization */}
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
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]"
              >
                <ChevronLeft className="w-4 h-4" />
                BACK TO DETAILS
              </button>
              <p className="text-xs font-bold tracking-[0.15em] text-neutral-500">AUTHORIZATION</p>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div className="border-2 border-neutral-200 rounded-2xl p-4 flex items-center gap-3">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 ${
                    agreed ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-300'
                  }`}
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
                  <p className="text-2xl font-black text-neutral-900 tracking-tight">
                    ₹{selectedSession.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs tracking-[0.15em] text-neutral-500 font-medium mb-1">DURATION</p>
                  <p className="text-2xl font-black text-neutral-900 tracking-tight">{selectedSession.durationLabel.split(' ')[0]} <span className="text-sm font-bold">MIN</span></p>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs text-center tracking-wide">{error}</p>
              )}
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

  const handleDateClick = (day) => {
    if (!isDatePast(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    }
  }

  return (
    <>
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
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative aspect-square flex items-center justify-center text-sm rounded-full
                      transition-colors
                      ${isTodayDate ? 'ring-2 ring-orange-500 bg-orange-500/20 text-white font-semibold' : ''}
                      ${isPast ? 'text-neutral-600 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}
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

function StickyBottomBar({ selectedItem, setSelectedItem, selectedDate }) {
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
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-background transition-all duration-200 ${selectedDate ? 'hidden' : ''}`}>
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
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      <HeroSection selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <ProductsSection selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <BookingSection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Footer />
      <StickyBottomBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedDate={selectedDate} />
    </div>
  )
}