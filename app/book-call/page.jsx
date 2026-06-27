// book coaching-call typeform page

"use client";

import { ArrowLeft, Lock, User, Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { League_Spartan } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { MAIN_PACKAGE } from "@/lib/products";

const leagueSpartan = League_Spartan({ subsets: ["latin"], weight: ["400","500","600","700","800","900"] });

const SITE_CONFIG = { brandName: "MOGWARD", brandInitials: "M" };
const ACCENT = "#9400D3";
const VALID_SLOTS = ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6"];
const NOT_NOW = "Not right now, but I want to stay in the loop";

function PulsingGlow() {
  return (
    <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{ width: "120%", height: "600px", background: "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(148,0,211,0.95) 0%, rgba(148,0,211,0.55) 35%, rgba(148,0,211,0.15) 65%, transparent 85%)", filter: "blur(30px)" }}
      />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 animate-pulse-glow"
        style={{ width: "80%", height: "500px", background: "radial-gradient(ellipse 60% 55% at 50% 15%, rgba(244, 8, 165, 0.8) 0%, rgba(216, 60, 185, 0.4) 40%, transparent 75%)", filter: "blur(20px)", animationDelay: "0.3s" }}
      />
    </div>
  );
}

function Watermark() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none select-none">
      <div className="flex flex-col justify-center opacity-[0.06]">
        {["BOOK", "CALL"].map((w) => (
          <span key={w} className={`text-[25vw] font-black tracking-tighter leading-[0.8] text-foreground whitespace-nowrap ${leagueSpartan.className}`}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    setLoggingOut(false); setMenuOpen(false); setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
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
              <button type="button" onClick={() => setMenuOpen(v => !v)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors">
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent" onClick={() => setMenuOpen(false)} />
                  <div role="menu" className="fixed sm:absolute z-50 left-3 right-3 top-[68px] sm:left-auto sm:right-0 sm:top-12 sm:w-60 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
                    <button type="button" onClick={() => { setMenuOpen(false); router.push("/dashboard"); }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                      <User className="w-4 h-4" /> MY PURCHASES
                    </button>
                    <div className="h-px bg-border" />
                    <button type="button" onClick={handleLogout} disabled={loggingOut}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-60">
                      <Lock className="w-4 h-4" /> {loggingOut ? "LOGGING OUT…" : "LOGOUT"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors">
              LOGIN <Zap className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

/* ── FORM INTERNALS ── */

const QUESTIONS = [
  { id: "name", type: "text", title: "What's your name?", subtext: "So I can make this feel less like a form and more like a conversation.", placeholder: "Your first name", inputType: "text", required: true },
  { id: "whatsapp", type: "text", title: "Your WhatsApp number", subtext: "I'll only reach out if you're a good fit — this isn't a spam list.", placeholder: "+91 98765 43210", inputType: "tel", required: true },
  { id: "instagram", type: "text", title: "Your Instagram username", subtext: "Will help me connect with you through Instagram.", placeholder: "@username", inputType: "text", required: true },
  { id: "goal", type: "single", title: "What's your main goal right now?", subtext: "Pick the one that matters most to you today.", options: ["Fat loss","Muscle gain","Body recomposition (lose fat + gain muscle)","Strength (SBD)","Aesthetic physique + looksmax"], required: true },
  { id: "blockers", type: "multi", title: "What's currently stopping you from achieving this?", subtext: "Be honest — the more specific you are, the better I can help.", options: ["I don't have a plan that actually works for me","I don't know what to eat or how to track it","I start strong but always fall off","I have no idea how to improve my face / appearance","I've tried things — nothing sticks"], required: true },
  { id: "appearanceRating", type: "rating", title: "How satisfied are you with your appearance overall?", subtext: "Be honest — this helps me understand where to focus first.", required: true },
  { id: "faceConcerns", type: "multi", title: "What part of your face bothers you most when you look in the mirror?", subtext: "Select all that apply.", options: ["Sharper jawline","Leaner face","Better skin texture","Glow / complexion improvement","Eye area (dark circles, tired look)"], required: true },
  { id: "commitment", type: "single", title: "How committed are you to improving BOTH physique and appearance?", options: ["Just exploring options","Somewhat committed","Very committed","100% ready to start now"], required: true },
  { id: "startWhen", type: "single", title: "If accepted into the program, when could you realistically start?", subtext: "Presumes acceptance — answers tell us how serious the intent is.", options: ["ASAP","Within 1–2 weeks","Within a month","3–6 months from now","Just exploring"], required: true },
  { id: "trainingDays", type: "single", title: "How many days per week can you comfortably train?", subtext: "This helps me build a schedule around your life, not the other way around.", options: ["2 days","3 days","4 days","5 days","6 days"], required: true },
  { id: "diet", type: "single-with-followup", title: "Are you currently following any diet?", subtext: "Counting calories, macros, intuitive eating — anything counts.", options: ["Yes","No"], followupOn: "Yes", followupLabel: "What are you currently doing? (Brief description)", required: true },
  { id: "basics", type: "basics", title: "Age, Gender & Location", subtext: "Quick basics — almost done with the data.", required: true },
  { id: "stats", type: "stats", title: "Current weight & height", subtext: "Accept both metric and imperial.", required: true },
  { id: "experience", type: "single", title: "How long have you been training seriously?", subtext: "No wrong answer — the program adapts to where you're starting from.", options: ["Never trained seriously","0–6 months","6–12 months","1–2 years","2+ years"], required: true },
  { id: "interstitial", type: "interstitial" },
  { id: "investment", type: "single", title: "Are you financially ready to invest in coaching if accepted?", subtext: "Investment starts from Rs9,999.", options: ["Yes — I'm ready to invest in this","I need a few more details before deciding","Not right now, but I want to stay in the loop"], required: true },
];

const TOTAL_STEPS = QUESTIONS.length + 1;

const inputCls = "w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3.5 text-base font-medium text-white placeholder:text-neutral-600 outline-none transition focus:border-[#9400D3] focus:ring-2 focus:ring-[#9400D3]/40";

function ChoiceButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        `text-left rounded-2xl border px-5 py-5 font-black tracking-tight transition-all duration-200 ${leagueSpartan.className} ` +
        (selected
          ? "border-[#9400D3] bg-[#9400D3]/10 text-white shadow-[0_0_24px_rgba(148,0,211,0.4)]"
          : "border-neutral-700 bg-neutral-900/50 text-neutral-300 hover:border-neutral-500 hover:text-white hover:scale-[1.02]")
      }
    >
      {selected && (
        <span className="mb-3 block h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} />
      )}
      <span className="text-base sm:text-lg leading-tight">{children}</span>
    </button>
  );
}

function ProgressBar({ step, total }) {
  const pct = Math.min(100, ((step + 1) / total) * 100);
  return (
    <div className="mb-10">
      <div className="relative h-[3px] w-full rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full overflow-hidden transition-all duration-500 ease-out animate-progress-breathe"
          style={{ width: `${pct}%`, backgroundColor: ACCENT }}
        >
          <div className="absolute inset-0 animate-progress-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)`,
            }}
          />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className={`text-[10px] font-extrabold tracking-[0.3em] text-neutral-600 ${leagueSpartan.className}`}>APPLICATION FORM</span>
        <span className="text-[10px] font-medium tracking-[0.25em] text-neutral-500">
          {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function QuestionHeader({ index, title, subtext }) {
  return (
    <div className="mb-8">
      <p className={`mb-2 text-sm font-extrabold tracking-[0.3em] ${leagueSpartan.className}`} style={{ color: ACCENT }}>
        Q{String(index + 1).padStart(2, "0")}
      </p>
      <h2 className={`text-3xl sm:text-4xl font-black text-white leading-[0.9] tracking-tight ${leagueSpartan.className}`}>
        {title}
      </h2>
      {subtext && <p className="mt-3 text-sm text-neutral-500 italic">{subtext}</p>}
    </div>
  );
}

function Interstitial({ onNext }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 450);
    setTimeout(() => onNext(), 150);
  };

  const rows = [
    ["Custom training program","Built around your body type, strength baseline, and exact goals. Not a template. Not a PPL from YouTube. Every exercise, set, and progression rule is specific to you."],
    ["Custom diet plan","Built around what you actually eat, your schedule, and your food availability. No chicken-and-rice nonsense unless that's genuinely your preference. A system that fits your life, not the other way around."],
    ["Daily 15-minute video check-ins — mandatory","Every single day. This is the accountability layer that makes everything else stick. Most programs give you a plan and disappear. This one doesn't. You show up, I show up."],
    ["24/7 WhatsApp access","Questions, adjustments, bad days, breakthroughs. You won't be waiting 3 days for a reply. Direct line, always on."],
    ["Full facial aesthetics guidance","Jawline, skin, structure — applied specifically to your face. The Frame Protocol and Skin Protocol, personalised. Most coaches ignore this entirely. This program doesn't."],
    ["Weekly structured progress calls","Beyond the daily check-ins — a dedicated weekly call to review metrics, adjust the plan, and map the next 7 days with precision."],
    ["Complete looksmax & lifestyle guidance","Hair, posture, style, confidence, grooming — the full picture. Because a transformation isn't just what you lift or what you eat."],
    ["Results guarantee","100% refund + 20% extra if you haven't hit the results we agreed on at onboarding by the 60-day checkpoint. The condition: you show up every day as instructed. If you do, the risk is entirely mine."],
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className={`text-xs font-extrabold tracking-[0.3em] mb-2 ${leagueSpartan.className}`} style={{ color: ACCENT }}>
          THIS IS WHAT YOU'RE APPLYING FOR
        </p>
        <h3 className={`text-3xl sm:text-4xl font-black text-white leading-[0.9] tracking-tight ${leagueSpartan.className}`}>
          A full-system<br />transformation program.
        </h3>
        <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
          Not a generic plan. Not auto-generated advice. Built around you, tracked daily, and backed by a guarantee most coaches won't touch.
        </p>
      </div>

      <div>
        <p className={`text-xs font-extrabold tracking-[0.3em] mb-3 ${leagueSpartan.className}`} style={{ color: ACCENT }}>WHAT'S INCLUDED</p>
        <div className="divide-y divide-neutral-800 rounded-2xl border border-neutral-800 overflow-hidden">
          {rows.map(([label, desc]) => (
            <div key={label} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[160px_1fr] sm:gap-6 bg-neutral-900/40">
              <div className={`text-sm font-bold ${leagueSpartan.className}`} style={{ color: ACCENT }}>{label}</div>
              <div className="text-sm text-neutral-400 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className={`text-xs font-extrabold tracking-[0.3em] mb-2 ${leagueSpartan.className}`} style={{ color: ACCENT }}>THE INVESTMENT</p>
        <p className="text-sm text-neutral-500">Investment starts from Rs9,999. Spots are limited. Not everyone who applies is accepted.</p>
      </div>

      <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: ACCENT }}>
        <p className={`font-black text-white text-lg tracking-tight leading-tight ${leagueSpartan.className}`}>
          The next question determines<br />whether we move forward.
        </p>
      </div>

      <div className="flex justify-center pb-2">
        <button
          type="button"
          onClick={handleClick}
          className={`rounded-full border-2 px-8 py-3.5 font-black tracking-widest text-sm bg-transparent transition-all duration-200 ${leagueSpartan.className} ${
            clicked ? "scale-110" : "hover:scale-[1.02]"
          }`}
          style={{
            borderColor: ACCENT,
            color: ACCENT,
            boxShadow: clicked
              ? `0 0 16px ${ACCENT}, 0 0 32px ${ACCENT}`
              : `0 0 8px rgba(148,0,211,0.3)`,
          }}
        >
          One last question →
        </button>
      </div>
    </div>
  );
}

function FinalScreen({ name, status, error, onRetry }) {
  if (status === "submitting") {
    return (
      <div className="text-center py-12">
        <span className="mx-auto mb-8 block h-4 w-4 rounded-full animate-pulse"
          style={{ backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}` }} />
        <h2 className={`text-3xl font-black text-white ${leagueSpartan.className}`}>SUBMITTING…</h2>
        <p className="mt-4 text-sm text-neutral-500">Locking in your application.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-12">
        <h2 className={`text-3xl font-black text-white ${leagueSpartan.className}`}>SOMETHING WENT WRONG</h2>
        <p className="mt-4 text-sm text-neutral-500">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className={`mt-6 rounded-full border-2 px-8 py-3 font-black text-sm tracking-widest ${leagueSpartan.className}`}
          style={{ borderColor: ACCENT, color: ACCENT }}
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <span className="mx-auto mb-8 block h-4 w-4 rounded-full animate-pulse"
        style={{ backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}` }}
      />
      <h2 className={`text-4xl sm:text-5xl font-black text-white leading-[0.9] tracking-tight ${leagueSpartan.className}`}>
        YOU'RE IN<br />THE QUEUE.
      </h2>
      <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
        We'll review your application and reach out on WhatsApp within 24 hours.
      </p>
      <p className={`mt-4 text-lg font-black text-white ${leagueSpartan.className}`}>
        Talk soon, {name || "friend"}.
      </p>
    </div>
  );
}

const BUNDLE_PROTOCOLS = [
  { name: "Frame Protocol", desc: "The complete facial aesthetics system. Fat loss hierarchy, mewing, de-bloating, nose breathing, and skincare — in the exact order that produces visible results." },
  { name: "Skin Protocol", desc: "Full CTP skincare framework. Concern-to-ingredient mapping for acne, pigmentation, texture, and dullness. Built for men who've never had a routine." },
  { name: "Diet Protocol", desc: "The two-number system. Calories and protein — nothing else. A 1-week process to find your real maintenance, then a deficit that actually holds." },
  { name: "Training Protocol", desc: "Hypertrophy science applied. Full programmes for 2–6 training days, any equipment. Set targets, frequency guidelines, and progression rules — not a generic split." },
  { name: "1:1 Assessment Call (x2 included)", desc: "Full 30-min assessment covering all four protocols. Plus a progress check call minimum 1 week later. Direct access — the same calls bundle buyers get." },
];

function NotRightNowScreen({ name }) {
  const router = useRouter();
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleGetBundle = async () => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      const bundleItem = [{ type: "main", id: MAIN_PACKAGE.id, price: MAIN_PACKAGE.price }];
      localStorage.setItem("selectedItems", JSON.stringify(bundleItem));
      if (!data.success) {
        localStorage.setItem("redirectAfterAuth", "/checkout");
        router.push("/login");
        return;
      }
      router.push("/checkout");
    } catch (err) {
      console.error("Get bundle error:", err);
      setIsUnlocking(false);
    }
  };

  return (
    <div className="py-4">
      <p className={`text-xs font-bold tracking-[0.25em] text-[#9400D3] mb-3 ${leagueSpartan.className}`}>
        NOT READY FOR 1:1? THAT'S FINE.
      </p>
      <h2 className={`text-3xl sm:text-4xl font-black text-white leading-[0.9] tracking-tight mb-6 ${leagueSpartan.className}`}>
        The system is<br />still yours.
      </h2>
      <p className="text-sm text-neutral-400 leading-relaxed mb-2">
        The 1:1 program is built for people who want to move fast with daily accountability. But every protocol inside it — training, diet, facial aesthetics, skincare — is available right now, as a self-guided system.
      </p>
      <p className="text-sm text-neutral-400 leading-relaxed mb-8">
        The Mogward Bundle is how most people start. Four complete protocols. One price. Lifetime access.
      </p>

      <p className={`text-xs font-extrabold tracking-[0.25em] text-[#9400D3] mb-3 ${leagueSpartan.className}`}>
        WHAT'S IN THE BUNDLE
      </p>
      <div className="divide-y divide-neutral-800 rounded-2xl border border-neutral-800 overflow-hidden mb-8">
        {BUNDLE_PROTOCOLS.map((item) => (
          <div key={item.name} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[160px_1fr] sm:gap-6 bg-neutral-900/40">
            <div className={`text-sm font-bold text-[#9400D3] ${leagueSpartan.className}`}>{item.name}</div>
            <div className="text-sm text-neutral-400 leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex items-center justify-between mb-4">
  <span className={`text-3xl font-black text-white ${leagueSpartan.className}`}>₹{MAIN_PACKAGE.price}</span>
  <span className="text-xs text-neutral-500 text-right max-w-[55%]">
    was Rs{MAIN_PACKAGE.originalPrice} — saves Rs{MAIN_PACKAGE.originalPrice - MAIN_PACKAGE.price} vs buying individually
  </span>
</div>

      <button
        type="button"
        onClick={handleGetBundle}
        disabled={isUnlocking}
        className={`w-full py-3.5 rounded-lg font-black text-sm tracking-widest text-white transition-all duration-200 ${leagueSpartan.className} ${
          isUnlocking ? "bg-[#9400D3]/60 scale-[0.98]" : "bg-[#9400D3] hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        {isUnlocking ? "CHECKING…" : "GET THE BUNDLE →"}
      </button>
      <p className="mt-3 text-center text-xs italic text-neutral-600">
        Lifetime access. Instant delivery via My Purchases after checkout.
      </p>
    </div>
  );
}

function FormInner({ date, slot }) {
  const [step, setStep] = useState(0);
  const [nextGlow, setNextGlow] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");
  const [answers, setAnswers] = useState({
    name: "", whatsapp: "", instagram: "",
    goal: "", blockers: [], appearanceRating: 0,
    faceConcerns: [], commitment: "", startWhen: "",
    trainingDays: "", diet: "", dietDetail: "",
    age: "", gender: "", city: "",
    weight: "", height: "", experience: "", investment: "",
  });

  const isFinal = step === QUESTIONS.length;
  const q = QUESTIONS[step];
  const setA = (k, v) => setAnswers(s => ({ ...s, [k]: v }));

  const canProceed = useMemo(() => {
    if (isFinal) return false;
    if (q.type === "interstitial") return true;
    if (!q.required) return true;
    switch (q.type) {
      case "text": return String(answers[q.id] || "").trim().length > 0;
      case "single": return !!answers[q.id];
      case "single-with-followup": return !!answers[q.id];
      case "multi": return (answers[q.id] || []).length > 0;
      case "rating": return answers[q.id] > 0;
      case "basics": return answers.age && answers.gender && answers.city.trim();
      case "stats": return answers.weight.trim() && answers.height.trim();
      default: return true;
    }
  }, [q, answers, isFinal]);

  const goNext = () => {
    if (!canProceed) return;
    setNextGlow(true);
    setTimeout(() => setNextGlow(false), 450);
    setStep(s => Math.min(s + 1, QUESTIONS.length));
  };
  const goBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSingleSelect = (qid, value) => {
    setA(qid, value);
    setNextGlow(true);
    setTimeout(() => setNextGlow(false), 450);
    setTimeout(() => setStep(s => s + 1), 280);
  };

  const toggleMulti = (qid, value) => {
    setAnswers(s => {
      const arr = s[qid] || [];
      return { ...s, [qid]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const submitApplication = async () => {
    setSubmitStatus("submitting");
    setSubmitError("");
    try {
      const res = await fetch("/api/booking/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name,
          whatsapp: answers.whatsapp,
          instagram: answers.instagram,
          date,
          slot,
          goal: answers.goal,
          blockers: answers.blockers,
          appearanceRating: answers.appearanceRating,
          faceConcerns: answers.faceConcerns,
          commitment: answers.commitment,
          startWhen: answers.startWhen,
          trainingDays: answers.trainingDays,
          diet: answers.diet,
          dietDetail: answers.dietDetail,
          age: answers.age,
          gender: answers.gender,
          city: answers.city,
          weight: answers.weight,
          height: answers.height,
          experience: answers.experience,
          investment: answers.investment,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.message || "Something went wrong. Please try again.");
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("success");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
      setSubmitStatus("error");
    }
  };

  // Fire submission only for the two "qualified" paths, once, on reaching the final step.
  useEffect(() => {
    if (!isFinal) return;
    if (answers.investment === NOT_NOW) return; // handled by NotRightNowScreen / bundle upsell flow
    if (submitStatus !== "idle") return; // guard against double-fire on re-render
    submitApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinal]);

  const renderQuestion = () => {
    if (isFinal) {
      if (answers.investment === NOT_NOW) {
        return <NotRightNowScreen name={answers.name} />;
      }
      return (
        <FinalScreen
          name={answers.name}
          status={submitStatus}
          error={submitError}
          onRetry={submitApplication}
        />
      );
    }
    if (q.type === "interstitial") return <Interstitial onNext={() => setStep(s => s + 1)} />;

    return (
      <>
        <QuestionHeader index={step} title={q.title} subtext={q.subtext} />

        {q.type === "text" && (
          <div>
            <input
              type={q.inputType}
              value={answers[q.id]}
              onChange={e => setA(q.id, e.target.value)}
              placeholder={q.placeholder}
              className={inputCls}
              onKeyDown={e => { if (e.key === "Enter") goNext(); }}
            />
            <p className="mt-2 text-xs text-neutral-700 tracking-widest">Press Enter ↵</p>
          </div>
        )}

        {q.type === "single" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(opt => (
                <ChoiceButton key={opt} selected={answers[q.id] === opt} onClick={() => handleSingleSelect(q.id, opt)}>
                  {opt}
                </ChoiceButton>
              ))}
            </div>
            {q.id === "commitment" && answers.commitment === "Just exploring options" && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
                className="text-sm italic text-neutral-500"
              >
                That's okay — most people start here. The call usually changes that.
              </motion.p>
            )}
          </div>
        )}

        {q.type === "single-with-followup" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(opt => (
                <ChoiceButton key={opt} selected={answers[q.id] === opt} onClick={() => setA(q.id, opt)}>
                  {opt}
                </ChoiceButton>
              ))}
            </div>
            <AnimatePresence>
              {answers[q.id] === q.followupOn && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                >
                  <label className="block pt-2">
                    <span className="mb-2 block text-xs font-bold tracking-[0.2em] text-neutral-500">{q.followupLabel}</span>
                    <input type="text" value={answers.dietDetail}
                      onChange={e => setA("dietDetail", e.target.value)} className={inputCls} />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {q.type === "multi" && (
          <div className="grid grid-cols-2 gap-3">
            {q.options.map(opt => (
              <ChoiceButton key={opt} selected={(answers[q.id] || []).includes(opt)} onClick={() => toggleMulti(q.id, opt)}>
                {opt}
              </ChoiceButton>
            ))}
          </div>
        )}

        {q.type === "rating" && (
          <div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[1,2,3,4,5].map(n => {
                const sel = answers[q.id] === n;
                return (
                  <button
                    key={n} type="button"
                    onClick={() => handleSingleSelect(q.id, n)}
                    className={`rounded-2xl py-8 font-black text-2xl transition-all duration-200 ${leagueSpartan.className} ` +
                      (sel
                        ? "text-white shadow-[0_0_24px_rgba(148,0,211,0.6)]"
                        : "bg-neutral-900/50 text-neutral-400 border border-neutral-700 hover:border-neutral-500 hover:text-white hover:scale-[1.02]")}
                    style={sel ? { backgroundColor: ACCENT } : {}}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex justify-between text-[11px] font-bold tracking-widest text-neutral-600">
              <span>VERY DISSATISFIED</span><span>VERY SATISFIED</span>
            </div>
          </div>
        )}

        {q.type === "basics" && (
          <div className="space-y-5">
            <div>
              <span className={`mb-2 block text-xs font-extrabold tracking-[0.2em] text-neutral-500 ${leagueSpartan.className}`}>AGE</span>
              <input type="number" placeholder="23" value={answers.age}
                onChange={e => setA("age", e.target.value)} className={inputCls} />
            </div>
            <div>
              <span className={`mb-3 block text-xs font-extrabold tracking-[0.2em] text-neutral-500 ${leagueSpartan.className}`}>GENDER</span>
              <div className="grid grid-cols-3 gap-3">
                {["Male","Female","Prefer not to say"].map(g => {
                  const sel = answers.gender === g;
                  return (
                    <button key={g} type="button" onClick={() => setA("gender", g)}
                      className={`rounded-2xl border py-6 text-sm font-black tracking-tight transition-all duration-200 ${leagueSpartan.className} ` +
                        (sel
                          ? "border-[#9400D3] bg-[#9400D3]/10 text-white shadow-[0_0_20px_rgba(148,0,211,0.35)]"
                          : "border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-500 hover:text-white")}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <span className={`mb-2 block text-xs font-extrabold tracking-[0.2em] text-neutral-500 ${leagueSpartan.className}`}>CITY</span>
              <input type="text" placeholder="Eg: Mumbai, India" value={answers.city}
                onChange={e => setA("city", e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        {q.type === "stats" && (
          <div className="space-y-5">
            <div>
              <span className={`mb-2 block text-xs font-extrabold tracking-[0.2em] text-neutral-500 ${leagueSpartan.className}`}>WEIGHT</span>
              <input type="text" placeholder="72 kg or 158 lbs" value={answers.weight}
                onChange={e => setA("weight", e.target.value)} className={inputCls} />
            </div>
            <div>
              <span className={`mb-2 block text-xs font-extrabold tracking-[0.2em] text-neutral-500 ${leagueSpartan.className}`}>HEIGHT</span>
              <input type="text" placeholder="175 cm or 5'9''" value={answers.height}
                onChange={e => setA("height", e.target.value)} className={inputCls} />
            </div>
          </div>
        )}
      </>
    );
  };

  const showNext = !isFinal && q.type !== "interstitial" && q.type !== "single" && q.type !== "rating";

  return (
    <div className="flex flex-col h-full">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div className="mb-6">
        {step > 0 && !isFinal ? (
          <button type="button" onClick={goBack}
            className={`inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-neutral-600 transition hover:text-white ${leagueSpartan.className}`}>
            <ArrowLeft className="h-4 w-4" /> BACK
          </button>
        ) : <span />}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
      </div>

      {showNext && (
        <div className="mt-8 flex justify-end">
          <button type="button" onClick={goNext} disabled={!canProceed}
            className={`inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-black tracking-widest text-background transition ${leagueSpartan.className} ${
              canProceed ? "hover:scale-[1.02] hover:opacity-90" : "opacity-30 cursor-not-allowed"
            }`}>
            NEXT
            <Zap
              className={`h-4 w-4 transition-all duration-200 ${nextGlow ? "scale-125" : ""}`}
              style={{
                color: nextGlow ? ACCENT : undefined,
                filter: nextGlow
                  ? `drop-shadow(0 0 6px ${ACCENT}) drop-shadow(0 0 14px ${ACCENT})`
                  : "none",
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── FULLSCREEN FORM (true fullscreen takeover, not a dialog) ── */
function FullscreenForm({ onClose, date, slot }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[999] bg-black"
      style={{
        height: "100dvh",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed top-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-500 hover:text-white hover:border-neutral-500 transition-colors"
        style={{ top: "calc(env(safe-area-inset-top) + 1.25rem)" }}
      >
        <X className="w-4 h-4" />
      </button>

      <div className="h-full w-full overflow-y-auto px-5 sm:px-10 pt-20 pb-10 max-w-2xl mx-auto">
        <FormInner date={date} slot={slot} />
      </div>
    </motion.div>,
    document.body
  );
}


/* ── PAGE ── */
function BookPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formOpen, setFormOpen] = useState(false);

  const date = searchParams.get("date");
  const slot = searchParams.get("slot");
  const hasValidParams = !!date && VALID_SLOTS.includes(slot);

  // Guard: if someone lands here without a valid date/slot (direct nav, stale link,
  // tampered URL, etc.), bounce them back to the homepage to pick a slot properly.
  useEffect(() => {
    if (!hasValidParams) {
      router.replace("/");
    }
  }, [hasValidParams, router]);

  if (!hasValidParams) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-sm text-neutral-500">Redirecting you to pick a slot…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="relative overflow-hidden pb-24 pt-24">
        <PulsingGlow />
        <Watermark />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/"
            className={`mb-10 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-neutral-500 transition hover:text-[#9400D3] ${leagueSpartan.className}`}>
            <ArrowLeft className="h-4 w-4" /> BACK
          </Link>

          <div className="mb-14 max-w-3xl">
            <p className={`mb-5 flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-neutral-500 ${leagueSpartan.className}`}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9400D3] animate-pulse" />
              STEP 03 — YOUR DETAILS
            </p>
            <h1 className={`text-6xl font-black leading-[0.85] tracking-tighter text-foreground sm:text-7xl md:text-8xl ${leagueSpartan.className}`}>
              LOCK IN<br />
              <span className="text-[#9400D3]">YOUR CALL</span>
            </h1>
            <p className="mt-6 max-w-md text-sm font-medium text-neutral-500">
              Final step. Share a few details so we can prep your session and send the call link straight to your inbox.
            </p>
          </div>

          <div className="mx-auto max-w-sm">
            <div className="w-full aspect-[3/4] text-left flex flex-col rounded-3xl border border-[#9400D3]/50 bg-neutral-900 p-8 sm:p-10 transition-all duration-300 shadow-[0_0_40px_rgba(148,0,211,0.15)]">
              <div className="flex items-center justify-between mb-6">
                <p className={`text-xs font-extrabold tracking-[0.3em] ${leagueSpartan.className}`} style={{ color: ACCENT }}>
                  APPLICATION FORM
                </p>
                <span className={`text-xs font-medium tracking-widest text-neutral-600 ${leagueSpartan.className}`}>15 QUESTIONS</span>
              </div>
              <h2 className={`text-3xl font-black text-white leading-[0.9] tracking-tight mb-4 ${leagueSpartan.className}`}>
                Tell us about<br />yourself.
              </h2>
              <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                Takes about 3 minutes. One question at a time. We use your answers to prep the call so every minute counts.
              </p>

              <div className="mt-auto flex">
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className={`inline-flex items-center gap-3 rounded-full px-6 py-3 font-black text-sm tracking-widest text-white bg-transparent border-2 transition-all duration-200 hover:scale-[1.02] ${leagueSpartan.className}`}
                  style={{
                    borderColor: ACCENT,
                    boxShadow: `0 0 12px rgba(148,0,211,0.6), 0 0 28px rgba(148,0,211,0.35), inset 0 0 12px rgba(148,0,211,0.15)`,
                  }}
                >
                  START APPLICATION <Zap className="h-4 w-4" style={{ color: ACCENT, filter: `drop-shadow(0 0 6px ${ACCENT})` }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-800 bg-neutral-900 py-8 text-center">
        <p className={`text-[10px] font-bold tracking-[0.3em] text-neutral-600 ${leagueSpartan.className}`}>
          © 2026 MOGWARD // ALL RIGHTS RESERVED
        </p>
      </footer>

      <AnimatePresence>
        {formOpen && <FullscreenForm onClose={() => setFormOpen(false)} date={date} slot={slot} />}
      </AnimatePresence>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookPageInner />
    </Suspense>
  );
}