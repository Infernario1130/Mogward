import Link from "next/link";
import { Zap } from "lucide-react";

const SITE_CONFIG = {
    brandName: "ARYANHEIS",
    brandInitials: "AH",
    email: "ascend@aryanmethod.in",
    address: {
      line1: "RAPTINAGAR PHASE-IV,",
      line2: "GORAKHPUR, 273013"
    },
    tagline: "Where elite conditioning meets unwavering determination in the pursuit of victory.",
    copyright: "© 2026 ARYANHEIS // ALL RIGHTS RESERVED."
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

function Footer() {
    return (
      <footer className="bg-neutral-900 text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">
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
                <li><Link href="#" className="text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-neutral-300 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs tracking-[0.2em] text-neutral-500 mb-4">LEGAL</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-neutral-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="#" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-neutral-300 hover:text-white transition-colors">Refund & Policy</Link></li>
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

export default function RefundPage() {
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
            REFUND & CANCELLATION POLICY
          </h1>

          {/* Divider */}
          <div className="w-full h-[1px] bg-foreground/40 mb-8 sm:mb-14" />

          {/* Content */}
          <div className="space-y-8 sm:space-y-12 text-base sm:text-[1.125rem] text-gray-300 leading-relaxed sm:leading-[1.7]">

            {/* 1 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">1. General Overview</h2>
              <p>
              This Refund and Cancellation Policy governs the purchase of all digital products, courses, fitness routines, dietary plans, and related materials (collectively, the "Digital Content") from Devansh Method, independently owned and operated by Devansh Pathak. By completing a purchase on our platform, you explicitly agree to the terms outlined below.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">2. Strict No-Refund Policy</h2>
              <p className="mb-3 sm:mb-4">
              Due to the immediate, digital nature of the products sold, and the fact that access to the proprietary Course content is granted instantly upon successful payment, all sales are strictly final.
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">No Returns or Exchanges:</span> We do not offer refunds, partial refunds, exchanges, or credits for any reason once a transaction is successfully processed and access to the Digital Content is delivered.</li>
                <li><span className="font-bold text-white">No Result-Based Refunds:</span> As outlined in our Terms & Conditions, individual results regarding fitness, skincare, and diet vary greatly. We do not issue refunds based on a user's subjective dissatisfaction with the content, personal inability to adhere to the programs, or failure to achieve specific physical results.
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">3. Cancellation Policy </h2>
              
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Post-Purchase:</span> Once a user initiates a transaction and the payment is successfully captured by our payment gateway, the order cannot be canceled under any circumstances.</li>
                <li><span className="font-bold text-white">Pre-Purchase/Checkout:</span> You may abandon the checkout process at any time prior to confirming the payment without any charge or penalty.</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">4. Technical Issues & Access</h2>
              <p className="mb-3">
              Your inability to access the Digital Content due to user-end technical issues (e.g., forgotten passwords, device incompatibility, or poor internet connection) does not constitute grounds for a refund.
              </p>
              <p>
              If you experience any technical difficulties accessing your purchased courses on the platform, please contact our support team immediately. We will work diligently to restore your functional access.ß
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">5. Exceptional Circumstances (Duplicate Payments)</h2>
              <p className="mb-3 sm:mb-4">
              We recognize that technical errors with banking networks or payment gateways can occasionally occur. The only exception to our No-Refund policy is in the event of a verifiable duplicate transaction.
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Duplicate Charges:</span> If your bank account or credit card is charged multiple times for a single course purchase due to a technical glitch or network timeout, you must notify us within 48 hours of the transaction.
                </li>
                <li><span className="font-bold text-white">Resolution Timeline:</span>  Upon verification of the duplicate charge on our payment gateway dashboard, we will initiate a refund for the erroneous duplicate amount. The refunded amount will be credited back to your original method of payment within 5 to 7 business days, depending on your bank's processing times.</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">6.Chargeback Abuse & Friendly Fraud</h2>
              <p className="mb-3 sm:mb-4">
              We maintain meticulous logs of user access, IP addresses, and content consumption.

In the event that a user successfully consumes the Digital Content and subsequently files a fraudulent chargeback or payment dispute with their bank or credit card issuer, we will submit all necessary access logs, IP tracking data, and this agreed-upon policy to the payment gateway and the issuing bank to contest the dispute.

Users who file illegitimate chargebacks will be permanently banned from the platform and may face legal action to recover the disputed funds and associated gateway penalty fees.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">7. Contact for Payment Support</h2>
              <p className="mb-3 sm:mb-4">If you believe you have been subjected to a duplicate charge, please contact our support team with your transaction ID, date of purchase, and the email address associated with your account:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Email:</span> </li>
                <li><span className="font-bold text-white">Operating Hours:</span> Monday to Friday, 10:00 AM - 6:00 PM IST.</li>
              </ul>
            </section>

            

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
