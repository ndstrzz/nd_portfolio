// C:\Users\User\Downloads\andy_portfolio\app\experience\page.tsx
"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export {};

type Size = { w: number; h: number };
const DESIGN: Size = { w: 1920, h: 1080 };

// ✅ Move everything (icon + title + decks) up by this amount
const CONTENT_DY = -130;

// ✅ NAV BAR GLASS BACKDROP so scrolling content won't visually overlap
const NAV_GLASS = {
  height: 120, // must match navbar container height
  bg: "rgba(0,0,0,0.100)", // transparent black
  border: "rgba(255,255,255,0.08)",
  blurPx: 14,
};

const NAV_POS = {
  ndLogo: { x: 36, y: 15, w: 357.24, h: 97 },
  nav: { x: 406, y: 55, h: 18, gap: 47 },
  navItem: { w: 44, h: 18 },
  topIcons: { x: 1669, y: 51, w: 31, h: 26, gap: 27 },
};

const EXP_POS = {
  icon: { x: 180, y: 168, w: 55.67, h: 45.55 },
  header: { x: 266, y: 164, w: 738.35, h: 87 },
};

const DECK = {
  w: 296.32,
  h: 464.35,
  y1: 327,
  x1: 258,
  x2: 637,
  x3: 1004,
  gapX: 82.68,
};

const DECK_POS = {
  uniqloX: DECK.x3 + DECK.w + DECK.gapX,
  row2Y: 850,
  aitX: 258,
};

// Overlay target size for expanded Taedal
const TAEDAL_EXPANDED = { w: 454, h: 711.44 };

// Dock-left position (in DESIGN coordinates)
const TAEDAL_DOCK = {
  x: 180, // aligns nicely with your left-side rhythm
  y: 220, // visually comfortable under nav
  gap: 44,
};

function useFitScale(design: Size) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const sx = rect.width / design.w;
      const sy = rect.height / design.h;
      const next = Math.max(0.35, Math.min(2.5, Math.min(sx, sy)));
      setScale(next);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [design.w, design.h]);

  return { stageRef, scale };
}

function IconButton({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: 10,
        transition: "transform 120ms ease, opacity 120ms ease",
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.96)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
      }}
    >
      {children}
    </a>
  );
}

function Asset({
  src,
  alt,
  x,
  y,
  w,
  h,
  priority,
}: {
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  priority?: boolean;
}) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <Image
        src={src}
        alt={alt}
        width={Math.round(w)}
        height={Math.round(h)}
        priority={priority}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

function ClickableAsset({
  src,
  alt,
  x,
  y,
  w,
  h,
  priority,
  onClick,
}: {
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  priority?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        width={Math.round(w)}
        height={Math.round(h)}
        priority={priority}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transition: "transform 140ms ease, filter 140ms ease",
        }}
      />
    </button>
  );
}

/**
 * TaedalOverlay (two-step animation)
 * Step A: from deck -> center + expand to 454x711.44
 * Step B: slide left + show right-side "inside" panel
 */
function TaedalOverlay({
  scale,
  onClose,
}: {
  scale: number;
  onClose: () => void;
}) {
  // Phase controls what the animated card's target is
  // "from" -> "center" -> "dock"
  const [phase, setPhase] = useState<"from" | "center" | "dock">("from");
  const [showPanel, setShowPanel] = useState(false);

  // Use the same paddingTop you used for scrolling content so coordinates match
  const CONTENT_PAD_TOP = 140;

  // Starting position (where the deck is in your DESIGN coordinates)
  const fromRect = {
    x: DECK.x1,
    y: DECK.y1 + CONTENT_DY + CONTENT_PAD_TOP,
    w: DECK.w,
    h: DECK.h,
  };

  // Center target
  const centerRect = {
    x: (DESIGN.w - TAEDAL_EXPANDED.w) / 2,
    y: (DESIGN.h - TAEDAL_EXPANDED.h) / 2 + 40, // slight down so it feels like "drops in"
    w: TAEDAL_EXPANDED.w,
    h: TAEDAL_EXPANDED.h,
  };

  // Dock-left target
  const dockRect = {
    x: TAEDAL_DOCK.x,
    y: TAEDAL_DOCK.y + CONTENT_PAD_TOP,
    w: TAEDAL_EXPANDED.w,
    h: TAEDAL_EXPANDED.h,
  };

  // Drive the 2-step animation
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("center"), 40);
    return () => window.clearTimeout(t1);
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rect =
    phase === "from" ? fromRect : phase === "center" ? centerRect : dockRect;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        animation: "taedalOverlayIn 220ms ease-out both",
      }}
    >
      <style>{`
        @keyframes taedalOverlayIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />

      {/* Scaled stage layer (matches your layout scale) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
          width: DESIGN.w,
          height: "100vh",
          pointerEvents: "none",
        }}
      >
        {/* Animated deck card */}
        <div
          style={{
            position: "absolute",
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h,
            pointerEvents: "auto",
            borderRadius: 18,
            overflow: "hidden",
            transition:
              "left 520ms cubic-bezier(.2,.9,.2,1), top 520ms cubic-bezier(.2,.9,.2,1), width 520ms cubic-bezier(.2,.9,.2,1), height 520ms cubic-bezier(.2,.9,.2,1), box-shadow 520ms ease",
            boxShadow:
              phase === "from"
                ? "0 0 0 rgba(0,0,0,0)"
                : "0 28px 80px rgba(0,0,0,0.55)",
          }}
          onClick={(e) => e.stopPropagation()}
          onTransitionEnd={(e) => {
            if (e.propertyName !== "left" && e.propertyName !== "width") return;

            if (phase === "center") {
              setPhase("dock");
              window.setTimeout(() => setShowPanel(true), 140);
            }
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.02)",
            }}
          />
          <Image
            src="/assets/taedal_deck.svg"
            alt="Taedal deck expanded"
            width={Math.round(rect.w)}
            height={Math.round(rect.h)}
            priority
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: "scale(1.02)",
            }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Taedal popup"
            style={{
              position: "absolute",
              right: 14,
              top: 14,
              width: 36,
              height: 36,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.35)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>

        {/* Right-side "inside" panel */}
        <div
          style={{
            position: "absolute",
            left: dockRect.x + dockRect.w + TAEDAL_DOCK.gap,
            top: dockRect.y,
            width: 900,
            height: dockRect.h,
            pointerEvents: "auto",
            opacity: showPanel ? 1 : 0,
            transform: showPanel ? "translateX(0px)" : "translateX(14px)",
            transition: "opacity 360ms ease, transform 360ms ease",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(0,0,0,0.30)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ✅ Video + Find out more button */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <video
                src="/assets/taedal-deck/taedal_video.mp4"
                controls
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                // You can change this later to route to a Taedal detail page
                // window.location.href = "/projects/taedal";
              }}
              aria-label="Find out more"
              style={{
                width: "fit-content",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              <Image
                src="/assets/taedal-deck/find_out_more.svg"
                alt="Find out more"
                width={220}
                height={56}
                priority
                style={{ width: 220, height: "auto", objectFit: "contain" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const { stageRef, scale } = useFitScale(DESIGN);
  const [taedalOpen, setTaedalOpen] = useState(false);

  useEffect(() => {
    const id = "model-viewer-script";
    if (document.getElementById(id)) return;

    const s = document.createElement("script");
    s.id = id;
    s.type = "module";
    s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(s);
  }, []);

  const navItems = useMemo(
    () => [
      { src: "/assets/Home.svg", alt: "Home", href: "/" },
      { src: "/assets/About.svg", alt: "About", href: "/about" },
      { src: "/assets/Experience.svg", alt: "Experience", href: "/experience" },
      { src: "/assets/Projects.svg", alt: "Projects", href: "/projects" },
    ],
    []
  );

  const iconItems = useMemo(
    () => [
      { src: "/assets/email_icon.svg", alt: "Email", href: "mailto:you@example.com" },
      { src: "/assets/linkedin_icon.svg", alt: "LinkedIn", href: "#" },
      { src: "/assets/telegram_icon.svg", alt: "Telegram", href: "#" },
    ],
    []
  );

  return (
    <main
      ref={stageRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        background: "#000000",
        margin: 0,
        padding: 0,
        position: "relative",
      }}
    >
      {/* Overlay (popup) */}
      {taedalOpen && <TaedalOverlay scale={scale} onClose={() => setTaedalOpen(false)} />}

      <div style={{ position: "relative", minHeight: "140vh" }}>
        {/* Fixed background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "#000000",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 860,
              height: 860,
            }}
          >
            <model-viewer
              src="/assets/taedal-coin.glb"
              camera-controls
              auto-rotate
              rotation-per-second="20deg"
              disable-zoom
              shadow-intensity="0"
              exposure="1"
              style={{ width: "100%", height: "100%", background: "transparent" }}
            />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
        </div>

        {/* Fixed navbar */}
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: 0,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            width: DESIGN.w,
            height: NAV_GLASS.height,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", width: DESIGN.w, height: NAV_GLASS.height }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: NAV_GLASS.bg,
                backdropFilter: `blur(${NAV_GLASS.blurPx}px)`,
                WebkitBackdropFilter: `blur(${NAV_GLASS.blurPx}px)`,
                borderBottom: `1px solid ${NAV_GLASS.border}`,
              }}
            />

            <div style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}>
              <Asset
                src="/assets/ND_Logo.svg"
                alt="ND Logo"
                x={NAV_POS.ndLogo.x}
                y={NAV_POS.ndLogo.y}
                w={NAV_POS.ndLogo.w}
                h={NAV_POS.ndLogo.h}
                priority
              />

              <div
                style={{
                  position: "absolute",
                  left: NAV_POS.nav.x,
                  top: NAV_POS.nav.y,
                  height: NAV_POS.nav.h,
                  display: "flex",
                  alignItems: "center",
                  gap: NAV_POS.nav.gap,
                  userSelect: "none",
                }}
              >
                {navItems.map((item) => (
                  <IconButton key={item.alt} href={item.href} ariaLabel={item.alt}>
                    <div style={{ width: NAV_POS.navItem.w, height: NAV_POS.navItem.h }}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={NAV_POS.navItem.w}
                        height={NAV_POS.navItem.h}
                        priority={item.alt === "Experience"}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </IconButton>
                ))}
              </div>

              <div
                style={{
                  position: "absolute",
                  left: NAV_POS.topIcons.x,
                  top: NAV_POS.topIcons.y,
                  display: "flex",
                  alignItems: "center",
                  gap: NAV_POS.topIcons.gap,
                }}
              >
                {iconItems.map((item) => (
                  <IconButton key={item.alt} href={item.href} ariaLabel={item.alt}>
                    <div style={{ width: NAV_POS.topIcons.w, height: NAV_POS.topIcons.h }}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={NAV_POS.topIcons.w}
                        height={NAV_POS.topIcons.h}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </IconButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div
            style={{
              position: "relative",
              left: "50%",
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "top center",
              width: DESIGN.w,
              paddingTop: 140,
            }}
          >
            <div style={{ position: "relative", width: DESIGN.w, minHeight: 1400 }}>
              <Asset
                src="/assets/experience_icon.svg"
                alt="Experience icon"
                x={EXP_POS.icon.x}
                y={EXP_POS.icon.y + CONTENT_DY}
                w={EXP_POS.icon.w}
                h={EXP_POS.icon.h}
                priority
              />
              <Asset
                src="/assets/experience_with_description.svg"
                alt="Experience title and description"
                x={EXP_POS.header.x}
                y={EXP_POS.header.y + CONTENT_DY}
                w={EXP_POS.header.w}
                h={EXP_POS.header.h}
                priority
              />

              {/* Row 1 */}
              <ClickableAsset
                src="/assets/taedal_deck.svg"
                alt="Taedal deck"
                x={DECK.x1}
                y={DECK.y1 + CONTENT_DY}
                w={DECK.w}
                h={DECK.h}
                priority
                onClick={() => setTaedalOpen(true)}
              />

              <Asset
                src="/assets/ocbc_deck.svg"
                alt="OCBC deck"
                x={DECK.x2}
                y={DECK.y1 + CONTENT_DY}
                w={DECK.w}
                h={DECK.h}
                priority
              />
              <Asset
                src="/assets/aucto_deck.svg"
                alt="Aucto deck"
                x={DECK.x3}
                y={DECK.y1 + CONTENT_DY}
                w={DECK.w}
                h={DECK.h}
                priority
              />
              <Asset
                src="/assets/uniqlo_deck.svg"
                alt="Uniqlo deck"
                x={DECK_POS.uniqloX}
                y={DECK.y1 + CONTENT_DY}
                w={DECK.w}
                h={DECK.h}
                priority
              />

              {/* Row 2 */}
              <Asset
                src="/assets/ait_deck.svg"
                alt="AIT deck"
                x={DECK_POS.aitX}
                y={DECK_POS.row2Y + CONTENT_DY}
                w={DECK.w}
                h={DECK.h}
                priority
              />
              <Asset
                src="/assets/activ_deck.svg"
                alt="Activ deck"
                x={DECK.x2}
                y={DECK_POS.row2Y + CONTENT_DY}
                w={DECK.w}
                h={DECK.h}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}