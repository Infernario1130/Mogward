'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Zap } from "lucide-react";
import { League_Spartan } from "next/font/google";
import { PRODUCTS } from "@/lib/products";

const leagueSpartan = League_Spartan({ subsets: ["latin"], weight: ["400","500","600","700","800","900"] });

const SITE = {
  brandName: "MOGWARD",
  brandInitials: "M",
  watermarkText: "MY ARSENAL",
};


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

    const meta = PRODUCTS.find(p => p.id === purchase.id) || 
    (MAIN_PACKAGE.id === purchase.id ? MAIN_PACKAGE : {})

  return (
    <div className="relative group transition-transform duration-300 ease-out hover:scale-[1.01]">
      <div className="absolute -inset-[2px] bg-gradient-to-r from-[#9400D3] via-[#9400D3] to-[#9400D3] rounded-3xl animate-border-glow opacity-60" />
      <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl overflow-hidden text-white aspect-[3/4] flex flex-col border border-neutral-700">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-75 group-hover:brightness-110 transition-all duration-300"
          style={{ backgroundImage: meta.image ? `url(${meta.image})` : 'none' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-transparent group-hover:opacity-80 transition-all duration-300" />

        {/* Category top left */}
        <div className="relative z-10 px-8 pt-6">
          <p className="text-xs tracking-[0.2em] font-extrabold text-white/50">
            {meta.category || 'PROTOCOL'}
          </p>
        </div>

        {/* Title middle */}
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

        {/* Bottom row — features left, date+button right */}
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
            <button
              type="button"
              className={`flex items-center justify-center gap-2 bg-white text-neutral-950 font-bold tracking-[0.18em] text-xs px-4 py-2.5 rounded-full hover:bg-[#9400D3] hover:text-white transition-colors ${leagueSpartan.className}`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              VIEW
            </button>
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

export default function DashboardPage() {
  const router = useRouter()
  const [purchases, setPurchases] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

        setPurchases(data.purchases)
        setUser(data.user)
      } catch (err) {
        setError('Something went wrong please try again')
      } finally {
        setLoading(false)
      }
    }

    fetchPurchases()
  }, [])

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
          </div>
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
    </div>
  );
}