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
              href="/"
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

export default function TermsPage() {
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
            Terms & Conditions
          </h1>

          {/* Divider */}
          <div className="w-full h-[1px] bg-foreground/40 mb-8 sm:mb-14" />

          {/* Content */}
          <div className="space-y-8 sm:space-y-12 text-base sm:text-[1.125rem] text-gray-300 leading-relaxed sm:leading-[1.7]">

            {/* 1 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">1. Acceptance of Terms</h2>
              <p>
                By purchasing and accessing digital courses, materials, or programs (the &quot;Courses&quot;) from Aryan Method, you agree to these Terms and Conditions in their entirety. If you do not agree, you may not purchase or use the Courses.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">2. Course Access and Content</h2>
              <p className="mb-3 sm:mb-4">
                The Courses contain personal fitness routines, dietary plans, skincare regimens, and health advice based on personal experience. Access is granted immediately upon purchase and is non-transferable and for personal use only.
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">No Extraordinary Results Guaranteed:</span> Individual results vary greatly depending on body type, genetics, metabolism, and lifestyle. We make no guarantees of specific outcomes or transformations.</li>
                <li><span className="font-bold text-white">Testimonials:</span> Any before/after photos or testimonials represent individual experiences and are not guaranteed for other users.</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">3. Medical Disclaimer &amp; Health Liability Release</h2>
              <p className="mb-3 sm:mb-4">
                Course content is for educational and informational purposes only and does not constitute professional medical, fitness, dermatological, or nutritional advice. Content is based on personal experience and is not a substitute for professional medical guidance.
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Medical Consultation Required:</span> Before starting any fitness program, changing your diet, using new skincare products, or if you have pre-existing health conditions, allergies, injuries, or are taking medications, you MUST consult a qualified healthcare provider, physician, dermatologist, or nutritionist.</li>
                <li><span className="font-bold text-white">Health Risks:</span> Fitness activities, dietary changes, and skincare routines carry inherent risks of physical injury, muscle strain, allergic reactions, skin irritation, gastrointestinal issues, and exacerbation of pre-existing medical conditions.</li>
                <li><span className="font-bold text-white">Individual Variation:</span> Health outcomes are highly individual. What works for one person may not work for another and could potentially be harmful. Your body type, medical history, genetics, allergies, and current medications affect your response to fitness, diet, and skincare protocols.</li>
                <li><span className="font-bold text-white">Waiver of Liability:</span> By purchasing and using these Courses, you acknowledge full responsibility for your health and wellbeing. You waive any right to hold Aryan Method, its owner, or instructors liable for any injury, illness, allergic reaction, weight loss/gain, skin conditions, dietary complications, or any other health outcome resulting from your use of the Courses.</li>
                <li><span className="font-bold text-white">Emergency Situations:</span> If you experience chest pain, difficulty breathing, severe allergic reactions, or any medical emergency while following the Courses, stop immediately and seek emergency medical attention. We are not responsible for emergency situations.</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">4. Assumption of Risk</h2>
              <p className="mb-3">
                You acknowledge that fitness activities, dietary changes, and skincare routines carry inherent risks including physical injury, illness, allergic reactions, and aggravation of pre-existing conditions. You assume full responsibility for all risks and damages arising from your use of the Courses.
              </p>
              <p>
                By purchasing, you release Aryan Method and its owner from any liability for injuries, damages, or health complications resulting from your participation in the Courses.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">5. Refund and Cancellation Policy</h2>
              <p className="mb-3 sm:mb-4">
                All Course sales are final. Due to the immediate digital delivery and non-returnable nature of the content, we do not offer refunds, exchanges, or cancellations once payment is processed and access is granted.
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Technical Issues:</span> Problems accessing content due to forgotten passwords, device incompatibility, or internet issues do not qualify for refunds. Contact support immediately for assistance.</li>
                <li><span className="font-bold text-white">Duplicate Charges Exception:</span> If charged multiple times for a single purchase due to a technical error, notify support within 48 hours. We will verify and refund the duplicate amount within 5–7 business days.</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">6. Intellectual Property</h2>
              <p className="mb-3 sm:mb-4">
                All Course content (videos, text, PDFs, images) is proprietary and protected intellectual property. You receive a personal, non-transferable, non-exclusive license to view content for your own use only.
              </p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Prohibited:</span> You may not copy, share, distribute, resell, screen-record, or broadcast any Course content.</li>
                <li><span className="font-bold text-white">Violation Consequences:</span> Unauthorized distribution or account sharing results in immediate access termination without refund and may result in legal action.</li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">7. User Conduct &amp; Account Responsibilities</h2>
              <p className="mb-3 sm:mb-4">You agree to use the Courses lawfully and responsibly. Prohibited conduct includes:</p>
              <ul className="space-y-2 sm:space-y-3 list-disc list-outside ml-5">
                <li><span className="font-bold text-white">Illegal Activity:</span> You may not use the Courses for any illegal purpose or in violation of any local, state, or national law.</li>
                <li><span className="font-bold text-white">Harassment &amp; Abuse:</span> You may not harass, threaten, defame, or abuse other users or Aryan Method staff.</li>
                <li><span className="font-bold text-white">Misinformation:</span> You may not publicly misrepresent the Courses or spread false claims about their content or results.</li>
                <li><span className="font-bold text-white">Unauthorized Access:</span> You may not attempt to hack, bypass, or gain unauthorized access to platform systems or other users&apos; accounts.</li>
                <li><span className="font-bold text-white">Account Termination:</span> Aryan Method reserves the right to immediately suspend or terminate your access to the Courses without refund if you violate these terms, engage in prohibited conduct, or pose a risk to other users.</li>
                <li><span className="font-bold text-white">Your Responsibility:</span> You are responsible for maintaining the confidentiality of your login credentials. You are liable for all activity under your account.</li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">8. Chargeback and Fraud Prevention</h2>
              <p className="mb-3">
                We maintain detailed records of user access, IP addresses, and content usage. Any fraudulent chargeback or payment dispute will be contested with your bank using these records.
              </p>
              <p>
                Users filing illegitimate chargebacks will be permanently banned and may face legal action to recover disputed funds and associated fees.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Aryan Method and affiliates are not liable for direct, indirect, incidental, special, or consequential damages from your use of the Courses. Your total recovery is limited to the amount you paid.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India and subject to the exclusive jurisdiction of courts in New Delhi, India.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
