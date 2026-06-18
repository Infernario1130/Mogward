import React, { useState, useEffect } from "react";

const FACE_IMAGE_URL = "/images/mogward-face.png";

const FEATURES = [
  "FULL MOGWARD PROTOCOL ACCESS",
  "CUSTOM WORKOUT PLAN",
  "CUSTOM DIET PLAN",
  "DAILY VIDEO CHECK-INS",
  "24/7 SUPPORT",
  "LOOKSMAX & PERSONALITY GUIDANCE",
];

const mogwardStyles = `
  .mogward-root {
    --radius: 0.625rem;
    --background: oklch(1 0 0);
    --foreground: oklch(0.129 0.042 264.695);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.129 0.042 264.695);
    --primary: oklch(0.208 0.042 265.755);
    --primary-foreground: oklch(0.984 0.003 247.858);
    --secondary: oklch(0.968 0.007 247.896);
    --secondary-foreground: oklch(0.208 0.042 265.755);
    --muted: oklch(0.968 0.007 247.896);
    --muted-foreground: oklch(0.554 0.046 257.417);
    --accent: oklch(0.968 0.007 247.896);
    --accent-foreground: oklch(0.208 0.042 265.755);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.929 0.013 255.508);
    --input: oklch(0.929 0.013 255.508);
    --ring: oklch(0.704 0.04 256.788);
  }

  .mogward-root.dark {
    --background: oklch(0.129 0.042 264.695);
    --foreground: oklch(0.984 0.003 247.858);
    --card: oklch(0.208 0.042 265.755);
    --primary: oklch(0.929 0.013 255.508);
    --secondary: oklch(0.279 0.041 260.031);
    --muted: oklch(0.279 0.041 260.031);
    --muted-foreground: oklch(0.704 0.04 256.788);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.551 0.027 264.364);
  }

  .mogward-root * {
    box-sizing: border-box;
  }

  @keyframes mogward-pulse-dot {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 8px rgba(168,85,247,0.9);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.6);
      box-shadow: 0 0 18px rgba(168,85,247,0.5);
    }
  }

  @keyframes mogward-glow-pulse {
    0%, 100% {
      box-shadow: 0 0 25px rgba(192,90,235,0.45), inset 0 0 10px rgba(192,90,235,0.12);
    }
    50% {
      box-shadow: 0 0 45px rgba(192,90,235,0.75), inset 0 0 20px rgba(192,90,235,0.25);
    }
  }

  .mogward-pulse-dot {
    display: inline-block;
    animation: mogward-pulse-dot 2.5s ease-in-out infinite;
  }

  .mogward-book-btn {
    width: 100%;
    border-radius: 1rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: white;
    background-color: transparent;
    border: 1.5px solid rgb(192,90,235);
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
    animation: mogward-glow-pulse 2.5s ease-in-out infinite;
  }

  .mogward-book-btn:hover {
    background-color: rgba(168,85,247,0.15);
    transform: scale(1.03);
  }

  .mogward-face-wrap {
    position: relative;
  }

  .mogward-face-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(ellipse at center, transparent 40%, #0a060d 80%);
    pointer-events: none;
  }

  .mogward-face-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: screen;
    display: block;
    filter: brightness(1.6) contrast(1.15);
  }
`;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isDesktop;
}

export default function MogwardLanding() {
  const isDesktop = useIsDesktop();

  return (
    <>
      <style>{mogwardStyles}</style>
      <div
        className="mogward-root"
        style={{ minHeight: "100vh", backgroundColor: "#f5f4ef", color: "white" }}
      >
        <main style={{ padding: "clamp(1rem, 4vw, 2.5rem) clamp(1rem, 5vw, 2.5rem)" }}>
          <article
            style={{
              position: "relative",
              margin: "0 auto",
              maxWidth: "72rem",
              borderRadius: "28px",
              overflow: "hidden",
              border: "1px solid #3a1a4a",
              background:
                "radial-gradient(120% 80% at 80% 10%, rgba(120,30,160,0.35) 0%, rgba(20,8,28,0.0) 55%), linear-gradient(180deg, #120914 0%, #0a060d 100%)",
              boxShadow:
                "0 0 0 1px rgba(168,85,247,0.15), 0 30px 80px -20px rgba(120,30,160,0.45)",
            }}
          >
            {isDesktop ? <DesktopLayout /> : <MobileLayout />}
          </article>
        </main>
      </div>
    </>
  );
}

function MobileLayout() {
  return (
    <div style={{ padding: "1.75rem 1.5rem 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.18em", fontWeight: 600, color: "rgba(233,213,255,0.9)", margin: 0 }}>
          1:1 COACHING · PREMIUM TIER
        </p>
        <span style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
          padding: "6px 12px", borderRadius: "9999px",
          backgroundColor: "rgb(147,51,234)", color: "white",
          boxShadow: "0 0 20px rgba(168,85,247,0.6)",
        }}>
          LIMITED SLOTS
        </span>
      </div>

      <div className="mogward-face-wrap" style={{ aspectRatio: "1/1", margin: "0 -0.5rem 0.5rem" }}>
        <img src={FACE_IMAGE_URL} alt="Mogward avatar" className="mogward-face-img" />
      </div>

      <h1 style={{
        fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.02,
        fontWeight: 900, letterSpacing: "-0.02em", color: "white",
        marginBottom: "1.25rem",
      }}>
        THE COMPLETE 1:1<br />MOGWARD PROGRAM
      </h1>

      <FeatureList />

      <RefundBadge style={{ width: "100%", marginBottom: "2rem", marginTop: "1.5rem" }} />

      <div style={{ textAlign: "right", marginBottom: "1.25rem" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.7)", fontWeight: 500, margin: 0 }}>STARTING FROM</p>
        <p style={{ color: "white", margin: 0 }}>
          <span style={{ fontSize: "clamp(40px, 10vw, 52px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>$99</span>
          <span style={{ fontSize: "14px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.8)" }}>/MONTH</span>
        </p>
      </div>

      <BookButton />
    </div>
  );
}

function DesktopLayout() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1.25fr)",
      gap: "2rem", padding: "2.5rem", alignItems: "center",
    }}>
      <div className="mogward-face-wrap">
        <img src={FACE_IMAGE_URL} alt="Mogward avatar" className="mogward-face-img" style={{ height: "auto" }} />
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: "12px", letterSpacing: "0.22em", fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: 0 }}>
            1:1 COACHING - PREMIUM TIER
          </p>
          <span style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
            padding: "4px 12px", borderRadius: "9999px",
            border: "1px solid rgb(192,132,252)", color: "white",
          }}>
            LIMITED SLOTS
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.02,
          fontWeight: 900, letterSpacing: "-0.02em", color: "white",
          marginBottom: "1.75rem",
        }}>
          THE COMPLETE 1:1<br />MOGWARD PROGRAM
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "start" }}>
          <FeatureList />

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
            <RefundBadge />
            <div style={{
              borderRadius: "1rem", padding: "1rem 1.25rem",
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.7)", fontWeight: 500, textAlign: "right", margin: "0 0 4px" }}>STARTING FROM</p>
              <p style={{ color: "white", textAlign: "right", margin: "0 0 12px" }}>
                <span style={{ fontSize: "clamp(32px, 3vw, 44px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>$99</span>
                <span style={{ fontSize: "13px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.8)" }}> /MONTH</span>
              </p>
              <BookButton compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureList() {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
      {FEATURES.map((f, i) => (
        <li key={f} style={{
          display: "flex", alignItems: "center", gap: "12px",
          fontSize: "clamp(12px, 1.5vw, 14px)", fontWeight: 600,
          letterSpacing: "0.05em", color: "rgba(255,255,255,0.95)",
        }}>
          <span
            className="mogward-pulse-dot"
            style={{
              width: "7px", height: "7px", borderRadius: "50%",
              backgroundColor: "rgb(168,85,247)", flexShrink: 0,
              animationDelay: `${i * 0.3}s`,
            }}
          />
          {f}
        </li>
      ))}
    </ul>
  );
}

function RefundBadge({ style = {} }) {
  return (
    <div style={{
      borderRadius: "1rem", padding: "14px 20px", textAlign: "center",
      border: "1.5px solid rgb(192,90,235)",
      boxShadow: "0 0 25px rgba(192,90,235,0.45), inset 0 0 12px rgba(192,90,235,0.15)",
      ...style,
    }}>
      <p style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.05em", color: "white", margin: 0 }}>
        100% REFUND + 20% EXTRA BONUS
      </p>
      <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.85)", margin: "2px 0 0" }}>
        if you don't get results
      </p>
    </div>
  );
}

function BookButton({ compact = false }) {
  return (
    <button
      className="mogward-book-btn"
      style={{ padding: compact ? "12px 0" : "16px 0", fontSize: compact ? "13px" : "15px" }}
    >
      BOOK A FREE CALL
    </button>
  );
}

//