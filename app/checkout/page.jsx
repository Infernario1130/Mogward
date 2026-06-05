'use client'

import { ArrowLeft, Target, Zap } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

const PRODUCTS_MAP = {
  "6a2160af38cf5aec331a473f": "THE ARYAN METHOD",
  "6a2160af38cf5aec331a473b": "THE SUMMER SPLIT",
  "6a2160af38cf5aec331a473c": "MUSCLE KITCHEN",
  "6a2160af38cf5aec331a473d": "HAIR CARE",
  "6a2160af38cf5aec331a473e": "SKIN CARE",
}

function CheckoutContent() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState([])
  const [userName, setUserName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Read selected items from localStorage
    const stored = localStorage.getItem('selectedItems')
    if (!stored) {
      router.replace('/')
      return
    }
    const parsed = JSON.parse(stored)
    if (!parsed || parsed.length === 0) {
      router.replace('/')
      return
    }
    setSelectedItems(parsed)

    // Get user name from /api/auth/me
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (!data.success) {
          router.replace('/login')
        } else {
          setUserName(data.user?.name?.toUpperCase() || 'USER')
        }
      })
      .catch(() => router.replace('/login'))
  }, [router])

  const loadRazorpay = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }, [])

  const handleCheckout = useCallback(async () => {
    setError('')
    setIsProcessing(true)

    try {
      const loaded = await loadRazorpay()
      if (!loaded) {
        setError('Failed to load payment gateway. Please check your connection.')
        setIsProcessing(false)
        return
      }

      const productIds = selectedItems.map(i => i.id)

      // Step 1: Create Razorpay order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds }),
      })
      const orderData = await orderRes.json()

      if (!orderData.success) {
        setError(orderData.message || 'Failed to create order. Please try again.')
        setIsProcessing(false)
        return
      }

      // Step 2: Open Razorpay popup
      const options = {
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'ARYANHEIS',
        description: orderData.products.map(p => p.title.join(' ')).join(', '),
        order_id: orderData.order.id,
        prefill: {
          name: orderData.user.name,
          email: orderData.user.email,
          contact: orderData.user.phone,
        },
        theme: { color: '#f97316' },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
        handler: async (response) => {
          // Step 3: Verify payment
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                productIds,
              }),
            })
            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              localStorage.removeItem('selectedItems')
              localStorage.removeItem('redirectAfterAuth')
              router.push('/payment-success')
            } else {
              setError(verifyData.message || 'Payment verification failed. Contact support.')
              setIsProcessing(false)
            }
          } catch {
            setError('Something went wrong during verification. Contact support.')
            setIsProcessing(false)
          }
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', (response) => {
        setError(response.error?.description || 'Payment failed. Please try again.')
        setIsProcessing(false)
      })
      razorpay.open()

    } catch {
      setError('Something went wrong. Please try again.')
      setIsProcessing(false)
    }
  }, [selectedItems, loadRazorpay, router])

  // Derive display values
  const selectedProtocol = selectedItems.length === 1
    ? PRODUCTS_MAP[selectedItems[0].id] || 'SELECTED PROTOCOL'
    : `${selectedItems.length} PROTOCOLS`

  const total = selectedItems.reduce((sum, i) => sum + i.price, 0)

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Back Button */}
      <button
        className="absolute top-8 left-8 p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Go back"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-card rounded-[24px] shadow-[0_4px_60px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_60px_-12px_rgba(0,0,0,0.3)] p-8 sm:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] bg-foreground dark:bg-zinc-900 flex items-center justify-center">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={2} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center font-[var(--font-playfair)] text-3xl sm:text-4xl font-black italic text-foreground tracking-tight mb-2">
              REGISTERED
            </h1>

            {/* Subtitle - Dynamic user name */}
            <p className="text-center text-xs text-muted-foreground tracking-[0.2em] uppercase font-bold mb-8">
              ID: {userName}
            </p>

            {/* Protocol Card */}
            <div className="bg-secondary/50 dark:bg-secondary rounded-2xl p-6 mb-6 border border-border/50 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.2)]">
              {/* Protocol Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
                <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-bold">
                  Selected Protocol
                </span>
                <span className="text-xs text-primary tracking-[0.05em] uppercase font-bold">
                  {selectedProtocol}
                </span>
              </div>

              {/* Protocol Message */}
              <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4 font-medium">
                Your secure connection is established. Complete the checkout to get immediate access to the protocol.
              </p>

              {/* Total */}
              <p className="text-xs text-primary text-center tracking-[0.1em] uppercase font-bold">
                Total: ₹{total} — Only limited seats available. Join quick.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-xs text-red-500 text-center mb-4 tracking-[0.05em]">
                {error}
              </p>
            )}

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isProcessing || selectedItems.length === 0}
              className={`w-full h-16 bg-foreground dark:bg-zinc-900 rounded-full text-background dark:text-foreground text-sm tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] ${
                isProcessing || selectedItems.length === 0
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]'
              }`}
            >
              {isProcessing ? 'PROCESSING...' : 'Complete Checkout'}
              <Zap className="w-5 h-5 text-primary fill-primary" strokeWidth={0} />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 text-center">
        <p className="text-[11px] text-muted-foreground/50 tracking-[0.2em] uppercase mb-1">
          Encrypted Session Active
        </p>
        <p className="text-[11px] text-muted-foreground/40 tracking-[0.15em] uppercase">
          // Access Level: Priority
        </p>
      </footer>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}