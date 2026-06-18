'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lock, X, ChevronRight as ChevronRightIcon, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { League_Spartan } from 'next/font/google'

const leagueSpartan = League_Spartan({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] })

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

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      <BookingSection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
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

function BookingModal({ selectedDate, onClose }) {
  const [selectedSession, setSelectedSession] = useState(SESSION_OPTIONS.find(s => s.isPriority) || SESSION_OPTIONS[0])
  const [step, setStep] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [agreed, setAgreed] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [authMode, setAuthMode] = useState('register')
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
                      ? 'border-2 border-[#9400D3] bg-[#9400D3] shadow-[0_0_25px_rgba(148,0,211,0.4)] scale-105'
                      : 'border-2 border-neutral-200 bg-white hover:border-[#9400D3] hover:shadow-[0_0_20px_rgba(148,0,211,0.2)]'
                  }`}
                >
                  <p className={`font-black text-sm italic tracking-tight ${selectedSlot === slot.id ? 'text-[#9400D3]' : 'text-neutral-800'} ${leagueSpartan.className}`}>
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
                  className="text-xs font-bold text-[#9400D3] hover:text-[#9400D3] tracking-[0.1em] transition-colors"
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
                  className="text-xs font-bold text-[#9400D3] hover:text-[#9400D3] tracking-[0.1em] transition-colors"
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
                  <p className={`text-2xl font-black text-neutral-900 tracking-tight ${leagueSpartan.className}`}>
                    ₹{selectedSession.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs tracking-[0.15em] text-neutral-500 font-medium mb-1">DURATION</p>
                  <p className={`text-2xl font-black text-neutral-900 tracking-tight ${leagueSpartan.className}`}>
                    {selectedSession.durationLabel.split(' ')[0]} <span className="text-sm font-bold">MIN</span>
                  </p>
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