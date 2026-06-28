'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Zap, X, ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";
import { League_Spartan } from "next/font/google";
import { PRODUCTS, MAIN_PACKAGE } from "@/lib/products";

const leagueSpartan = League_Spartan({ subsets: ["latin"], weight: ["400","500","600","700","800","900"] });

const SITE = {
  brandName: "MOGWARD",
  brandInitials: "M",
  watermarkText: "MY ARSENAL",
};

const SLOTS = [
  { id: 'slot1', name: 'SLOT 1', time: '10:00 AM - 10:30 AM', hour: 10, minute: 0 },
  { id: 'slot2', name: 'SLOT 2', time: '12:00 PM - 12:30 PM',  hour: 12, minute: 0 },
  { id: 'slot3', name: 'SLOT 3', time: '2:00 PM - 2:30 PM',   hour: 14, minute: 0 },
  { id: 'slot4', name: 'SLOT 4', time: '4:00 PM - 4:30 PM',   hour: 16, minute: 0 },
  { id: 'slot5', name: 'SLOT 5', time: '6:00 PM - 6:30 PM',   hour: 18, minute: 0 },
  { id: 'slot6', name: 'SLOT 6', time: '8:00 PM - 8:30 PM',   hour: 20, minute: 0 },
]

function WatermarkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 flex flex-col justify-center opacity-[0.06]">
        {SITE.watermarkText.split(" ").map((word, i) => (
          <span
            key={i}
            className={`text-[22vw] font-black tracking-tighter leading-[0.8] text-foreground whitespace-nowrap ${leagueSpartan.className}`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

function PulsingGlow() {
  return (
    <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{
          width: "120%",
          height: "600px",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(148,0,211,0.95) 0%, rgba(148,0,211,0.55) 35%, rgba(148,0,211,0.15) 65%, transparent 85%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{
          width: "80%",
          height: "500px",
          background:
            "radial-gradient(ellipse 60% 55% at 50% 15%, rgba(244, 8, 165, 0.8) 0%, rgba(216, 60, 185, 0.4) 40%, transparent 75%)",
          filter: "blur(20px)",
          animationDelay: "0.3s",
        }}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background text-xs font-bold">{SITE.brandInitials}</span>
            </div>
            <span className={`font-black text-foreground tracking-tight text-lg ${leagueSpartan.className}`}>
              {SITE.brandName}
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={leagueSpartan.className}>HOME</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function PurchaseCard({ purchase }) {
  const meta = PRODUCTS.find(p => p.id === purchase.id) || {}

  return (
    <div className="relative group transition-transform duration-300 ease-out hover:scale-[1.01]">
      <div className="absolute -inset-[2px] bg-gradient-to-r from-[#9400D3] via-[#9400D3] to-[#9400D3] rounded-3xl animate-border-glow opacity-60" />
      <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden text-white aspect-[3/4] flex flex-col border border-neutral-700">

        <div
          className="absolute inset-0 bg-cover bg-center brightness-75 group-hover:brightness-110 transition-all duration-300"
          style={{ backgroundImage: meta.image ? `url(${meta.image})` : 'none' }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-transparent group-hover:opacity-80 transition-all duration-300" />

        <div className="relative z-10 px-8 pt-6">
          <p className="text-xs tracking-[0.2em] font-extrabold text-white/50">
            {meta.category || 'PROTOCOL'}
          </p>
        </div>

        <div className="relative z-10 px-8 mt-auto">
          {meta.subtitle && (
            <p className="text-[#9400D3] font-bold text-xs tracking-[0.1em] mb-2">
              {meta.subtitle}
            </p>
          )}
          <h3 className={`font-black text-3xl sm:text-4xl tracking-tight leading-[0.9] mb-6 ${leagueSpartan.className}`}>
            {Array.isArray(purchase.title)
              ? purchase.title.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))
              : <span>{purchase.title}</span>
            }
          </h3>
        </div>

        <div className="relative z-10 px-8 pb-8 flex items-end justify-between gap-4">
          <ul className="space-y-2">
            {meta.features && meta.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9400D3] flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="text-right flex-shrink-0 flex flex-col items-end gap-3">
            <p className={`text-[10px] tracking-[0.18em] font-semibold text-neutral-500 ${leagueSpartan.className}`}>
              PURCHASED<br />{purchase.purchasedOn}
            </p>
                <Link
                  href={`/dashboard/products/${purchase.id}`}
                  className={`flex items-center justify-center gap-2 bg-white text-neutral-950 font-bold tracking-[0.18em] text-xs px-4 py-2.5 rounded-full hover:bg-[#9400D3] hover:text-white transition-colors ${leagueSpartan.className}`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  VIEW
                </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="relative">
          <div className="absolute -inset-[2px] bg-neutral-800 rounded-3xl" />
          <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden aspect-[3/4]">
            <div className="p-8 space-y-4">
              <div className="h-3 w-20 bg-neutral-800 rounded-full animate-pulse" />
              <div className="h-8 w-48 bg-neutral-800 rounded-full animate-pulse" />
              <div className="h-8 w-32 bg-neutral-800 rounded-full animate-pulse" />
              <div className="h-3 w-28 bg-neutral-800 rounded-full animate-pulse mt-6" />
              <div className="h-12 w-full bg-neutral-800 rounded-full animate-pulse mt-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- CALL BOOKING MODAL (Calendar -> Slot -> Confirm) ----------

function CallBookingModal({ open, onClose, creditsRemaining, onBooked }) {
  const today = new Date()
  const [view, setView] = useState('calendar') // 'calendar' | 'slot' | 'success'
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookedSlots, setBookedSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    if (!open) return
    setView('calendar')
    setSelectedDate(null)
    setSelectedSlot(null)
    setError('')
    setBookedSlots([])
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const dateForBackend = selectedDate
    ? selectedDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  // ── Fetch booked slots whenever we land on the slot view for a date ──
  useEffect(() => {
    if (view !== 'slot' || !selectedDate) return
    let isMounted = true
    setLoadingSlots(true)
    setBookedSlots([])

    fetch(`/api/booking/call-slots?date=${encodeURIComponent(dateForBackend)}`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return
        if (data.success) setBookedSlots(data.bookedSlots || [])
      })
      .catch(err => console.error('Failed to fetch booked slots:', err))
      .finally(() => { if (isMounted) setLoadingSlots(false) })

    return () => { isMounted = false }
  }, [view, selectedDate, dateForBackend])

  if (!open) return null

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
  const isDateToday = (day) => (
    day === today.getDate() &&
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear()
  )
  const isDateFuture = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return checkDate > todayStart
  }

  const handleDateSelect = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    setSelectedSlot(null)
    setView('slot')
  }

  const dateStr = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()
    : ''

  // ── Time-based slot status (only relevant when selectedDate is today) ──
  const now = new Date()
  const isSelectedToday = selectedDate &&
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate()

  const slotsWithTimeStatus = selectedDate
    ? SLOTS.map(slot => {
        const slotStart = new Date(
          selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
          slot.hour, slot.minute
        )
        const isPast = isSelectedToday && slotStart.getTime() <= now.getTime()
        return { ...slot, isPast }
      })
    : SLOTS.map(slot => ({ ...slot, isPast: false }))

  // Buffer rule: when booking for today, the next slot that hasn't passed
  // yet is held back and shown as unavailable like it's booked.
  let bufferSlotId = null
  if (isSelectedToday) {
    const nextUpcoming = slotsWithTimeStatus.find(
      s => !s.isPast && !bookedSlots.includes(s.id)
    )
    if (nextUpcoming) bufferSlotId = nextUpcoming.id
  }

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return
    setError('')
    setLoading(true)
    try {
      const slotMeta = SLOTS.find(s => s.id === selectedSlot)
      const res = await fetch('/api/booking/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateForBackend,
          slot: selectedSlot,
          slotLabel: slotMeta.time,
        }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.message || 'Something went wrong please try again')
        setLoading(false)
        return
      }
      setView('success')
      onBooked(data.creditsRemaining)
    } catch (err) {
      setError('Something went wrong please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-neutral-200">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-neutral-700">BOOK A FREE CALL</p>
            <p className="text-xs text-neutral-500 mt-1">
              {view === 'calendar' && 'Select a date to continue'}
              {view === 'slot' && dateStr}
              {view === 'success' && 'Booking confirmed'}
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded transition-colors">
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* CALENDAR VIEW */}
        {view === 'calendar' && (
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
                    onClick={() => handleDateSelect(day)}
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
        )}

        {/* SLOT VIEW */}
        {view === 'slot' && (
          <>
            <div className="px-6 pt-6 pb-4 space-y-3">
              <button
                onClick={() => { setSelectedSlot(null); setView('calendar') }}
                className="flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition-colors tracking-[0.1em]"
              >
                <ChevronLeft className="w-4 h-4" />
                BACK TO CALENDAR
              </button>
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
              {error && <p className="text-red-500 text-xs text-center tracking-wide mt-4">{error}</p>}
            </div>
            <div className="px-6 pb-8">
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot || loading}
                className={`w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedSlot && !loading
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'BOOKING...' : 'CONFIRM BOOKING'}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </>
        )}

        {/* SUCCESS VIEW */}
        {view === 'success' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#9400D3]/10 flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6 text-[#9400D3]" />
            </div>
            <p className={`font-black text-xl text-neutral-900 ${leagueSpartan.className}`}>CALL BOOKED</p>
            <p className="text-sm text-neutral-500">
              {dateStr} • {SLOTS.find(s => s.id === selectedSlot)?.time}
            </p>
            <p className="text-xs text-neutral-400 tracking-[0.1em]">
              A confirmation has been sent to your email.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg font-bold text-xs tracking-[0.15em] bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-200 mt-4"
            >
              DONE
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [purchases, setPurchases] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [callModalOpen, setCallModalOpen] = useState(false)

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('/api/dashboard/purchases')
        const data = await res.json()

        if (!data.success) {
          if (res.status === 401) {
            router.push('/login')
            return
          }
          setError(data.message)
          return
        }

        // If bundle is purchased, expand it to show all 4 individual product
        const hasBundle = data.purchases.some(p => p.id === MAIN_PACKAGE.id)

        if (hasBundle) {
          const bundlePurchase = data.purchases.find(p => p.id === MAIN_PACKAGE.id)
          const individualProducts = PRODUCTS.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            purchasedOn: bundlePurchase.purchasedOn,
            orderId: bundlePurchase.orderId,
            razorpayPaymentId: bundlePurchase.razorpayPaymentId,
          }))
          setPurchases(individualProducts)
        } else {
          setPurchases(data.purchases)
        }

        setUser(data.user)
      } catch (err) {
        setError('Something went wrong please try again')
      } finally {
        setLoading(false)
      }
    }

    fetchPurchases()
  }, [])

  const creditsRemaining = user?.callCreditsRemaining || 0

  const handleBooked = (newCreditsRemaining) => {
    setUser(prev => prev ? { ...prev, callCreditsRemaining: newCreditsRemaining } : prev)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative pt-32 pb-12 overflow-hidden">
        <WatermarkBackground />
        <PulsingGlow />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <p className={`text-xs font-bold tracking-[0.2em] text-muted-foreground mb-6 ${leagueSpartan.className}`}>
            WELCOME BACK • ASCEND
          </p>
          <h1 className={`font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.85] mb-6 ${leagueSpartan.className}`}>
            <span className="block">MY</span>
            <span className="block">ARSENAL</span>
          </h1>
          {user && (
            <p className={`text-muted-foreground text-sm max-w-md mx-auto mb-4 tracking-[0.15em] ${leagueSpartan.className}`}>
              {user.name.toUpperCase()}
            </p>
          )}
          <p className="text-muted-foreground text-sm text-lg max-w-md mx-auto mb-10">
            Your unlocked systems. Train, eat, refine — every day.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs tracking-[0.18em] ${leagueSpartan.className}`}>
              <Zap className="w-3.5 h-3.5 text-[#9400D3]" />
              {purchases.length} ACTIVE {purchases.length === 1 ? "PROTOCOL" : "PROTOCOLS"}
            </div>
            {!loading && user && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/40 backdrop-blur-sm text-xs tracking-[0.18em] ${leagueSpartan.className}`}>
                <PhoneCall className="w-3.5 h-3.5 text-[#9400D3]" />
                {creditsRemaining} FREE {creditsRemaining === 1 ? "CALL" : "CALLS"}
              </div>
            )}
          </div>

          {!loading && user && (
            <div className="mt-6">
              <button
                onClick={() => creditsRemaining > 0 && setCallModalOpen(true)}
                disabled={creditsRemaining <= 0}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-[0.15em] transition-all duration-200 ${leagueSpartan.className} ${
                  creditsRemaining > 0
                    ? 'bg-[#9400D3] text-white hover:bg-[#7e00b3] hover:scale-105 active:scale-95'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-muted-foreground/50 cursor-not-allowed'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                {creditsRemaining > 0 ? 'BOOK A CALL' : 'NO FREE CALLS AVAILABLE'}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="relative pb-24 overflow-hidden">
        <WatermarkBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className={`font-black text-2xl sm:text-3xl tracking-tight ${leagueSpartan.className}`}>
              YOUR PRODUCTS
            </h2>
            <span className={`text-xs tracking-[0.2em] font-semibold text-muted-foreground ${leagueSpartan.className}`}>
              {loading ? '...' : `${purchases.length} ITEMS`}
            </span>
          </div>

          {loading && <LoadingSkeleton />}

          {!loading && error && (
            <div className="text-center py-20">
              <p className={`text-sm text-muted-foreground tracking-[0.15em] ${leagueSpartan.className}`}>
                {error.toUpperCase()}
              </p>
            </div>
          )}

          {!loading && !error && purchases.length === 0 && (
            <div className="text-center py-20">
              <p className={`text-sm text-muted-foreground tracking-[0.15em] mb-2 ${leagueSpartan.className}`}>
                NO PURCHASES YET
              </p>
              <p className={`text-xs text-muted-foreground/60 tracking-[0.1em] ${leagueSpartan.className}`}>
                UNLOCK YOUR FIRST PROTOCOL BELOW
              </p>
            </div>
          )}

          {!loading && !error && purchases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchases.map((p) => (
                <PurchaseCard key={p.id} purchase={p} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className={`text-xs tracking-[0.2em] text-muted-foreground mb-4 ${leagueSpartan.className}`}>
              — WANT MORE? UNLOCK THE FULL METHOD
            </p>
            <Link
              href="/"
              className={`inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-bold tracking-[0.15em] hover:bg-foreground/90 transition-colors ${leagueSpartan.className}`}
            >
              EXPLORE PRODUCTS
              <Zap className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center">
        <p className={`text-[10px] tracking-[0.25em] text-muted-foreground ${leagueSpartan.className}`}>
          © 2026 MOGWARDS // ALL RIGHTS RESERVED.
        </p>
      </footer>

      <CallBookingModal
        open={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        creditsRemaining={creditsRemaining}
        onBooked={handleBooked}
      />
    </div>
  );
}