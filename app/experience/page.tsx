"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import OcbcFindOutMoreFrame from "./_components/OcbcFindOutMoreFrame";
import AuctoFindOutMoreFrame from "./_components/AuctoFindOutMoreFrame";
import TaedalFindOutMoreFrame from "./_components/TaedalFindOutMoreFrame";
import ActivHealthFindOutMoreFrame from "./_components/ActivHealthFindOutMoreFrame";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export {};

type Size = { w: number; h: number };
type Rect = { x: number; y: number; w: number; h: number };

const DESIGN: Size = { w: 1920, h: 1080 };

const CONTENT_DY = -130;

const NAV_GLASS = {
  height: 120,
  bg: "rgba(0,0,0,0.100)",
  border: "rgba(255,255,255,0.08)",
  blurPx: 14,
};

const NAV_POS = {
  ndLogo: { x: 36, y: 15, w: 357.24, h: 97 },

  navItems: {
    home: { x: 406, y: 55, w: 44, h: 18 },
    about: { x: 497, y: 55, w: 46, h: 18 },
    experience: { x: 593, y: 55, w: 82, h: 18 },
    projects: { x: 722, y: 55, w: 60, h: 18 },
  },

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

const DECK_EXPANDED = { w: 454, h: 711.44 };

const DECK_DOCK = {
  x: 180,
  y: 100,
  gap: 44,
};

const FINAL_DETAIL_DOCK = {
  x: -380,
  y: 100,
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

type DeckConfig = {
  id: string;
  src: string;
  alt: string;
  rect: Rect;
  videoSrc?: string;
  youtubeEmbedSrc?: string;
  findOutMoreBtnSrc?: string;
};

function DeckOverlay({
  scale,
  deck,
  onClose,
}: {
  scale: number;
  deck: DeckConfig;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"from" | "center" | "dock">("from");
  const [showPanel, setShowPanel] = useState(false);
  const [ocbcDetailOpen, setOcbcDetailOpen] = useState(false);
  const [auctoDetailOpen, setAuctoDetailOpen] = useState(false);
  const [taedalDetailOpen, setTaedalDetailOpen] = useState(false);
  const [activDetailOpen, setActivDetailOpen] = useState(false);

  const CONTENT_PAD_TOP = 100;

  const fromRect: Rect = {
    x: deck.rect.x,
    y: deck.rect.y + CONTENT_DY + CONTENT_PAD_TOP,
    w: deck.rect.w,
    h: deck.rect.h,
  };

  const centerRect: Rect = {
    x: (DESIGN.w - DECK_EXPANDED.w) / 2,
    y: (DESIGN.h - DECK_EXPANDED.h) / 2 + 40,
    w: DECK_EXPANDED.w,
    h: DECK_EXPANDED.h,
  };

  const dockRectDefault: Rect = {
    x: DECK_DOCK.x,
    y: DECK_DOCK.y + CONTENT_PAD_TOP,
    w: DECK_EXPANDED.w,
    h: DECK_EXPANDED.h,
  };

  const dockRectFinalDetail: Rect = {
    x: FINAL_DETAIL_DOCK.x,
    y: FINAL_DETAIL_DOCK.y + CONTENT_PAD_TOP,
    w: DECK_EXPANDED.w,
    h: DECK_EXPANDED.h,
  };

  const isFinalDetailDock =
    (deck.id === "ocbc" && ocbcDetailOpen) ||
    (deck.id === "aucto" && auctoDetailOpen) ||
    (deck.id === "taedal" && taedalDetailOpen) ||
    (deck.id === "activ" && activDetailOpen);

  const dockRect = isFinalDetailDock ? dockRectFinalDetail : dockRectDefault;

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("center"), 40);
    return () => window.clearTimeout(t1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rect = phase === "from" ? fromRect : phase === "center" ? centerRect : dockRect;
  const rightPanelX = dockRect.x + dockRect.w + DECK_DOCK.gap;

  const closeAll = () => {
    setOcbcDetailOpen(false);
    setAuctoDetailOpen(false);
    setTaedalDetailOpen(false);
    setActivDetailOpen(false);
    onClose();
  };

  const detailTakeoverOpen =
    (deck.id === "ocbc" && ocbcDetailOpen) ||
    (deck.id === "aucto" && auctoDetailOpen) ||
    (deck.id === "taedal" && taedalDetailOpen) ||
    (deck.id === "activ" && activDetailOpen);

  const showRightPanel = !detailTakeoverOpen;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        animation: "deckOverlayIn 220ms ease-out both",
      }}
    >
      <style>{`
        @keyframes deckOverlayIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>

      <div
        onClick={closeAll}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
          width: DESIGN.w,
          height: `calc(100vh / ${scale})`,
          pointerEvents: "none",
        }}
      >
        {deck.id === "ocbc" && ocbcDetailOpen ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: DESIGN.w,
              height: `calc(100vh / ${scale})`,
              pointerEvents: "auto",
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <OcbcFindOutMoreFrame open={true} topY={0} onClose={() => setOcbcDetailOpen(false)} />
          </div>
        ) : null}

        {deck.id === "aucto" && auctoDetailOpen ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: DESIGN.w,
              height: `calc(100vh / ${scale})`,
              pointerEvents: "auto",
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AuctoFindOutMoreFrame
              open={true}
              topY={0}
              onClose={() => setAuctoDetailOpen(false)}
            />
          </div>
        ) : null}

        {deck.id === "taedal" && taedalDetailOpen ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: DESIGN.w,
              height: `calc(100vh / ${scale})`,
              pointerEvents: "auto",
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TaedalFindOutMoreFrame
              open={true}
              topY={0}
              onClose={() => setTaedalDetailOpen(false)}
            />
          </div>
        ) : null}

        {deck.id === "activ" && activDetailOpen ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: DESIGN.w,
              height: `calc(100vh / ${scale})`,
              pointerEvents: "auto",
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ActivHealthFindOutMoreFrame
              open={true}
              topY={0}
              onClose={() => setActivDetailOpen(false)}
            />
          </div>
        ) : null}

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
            zIndex: 2,
            transition:
              "left 520ms cubic-bezier(.2,.9,.2,1), top 520ms cubic-bezier(.2,.9,.2,1), width 520ms cubic-bezier(.2,.9,.2,1), height 520ms cubic-bezier(.2,.9,.2,1), box-shadow 520ms ease",
            boxShadow:
              phase === "from" ? "0 0 0 rgba(0,0,0,0)" : "0 28px 80px rgba(0,0,0,0.55)",
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
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />

          <Image
            src={deck.src}
            alt={`${deck.alt} expanded`}
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

          <button
            type="button"
            onClick={closeAll}
            aria-label="Close popup"
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

        {showRightPanel && (
          <div
            style={{
              position: "absolute",
              left: rightPanelX,
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
              zIndex: 2,
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {deck.youtubeEmbedSrc ? (
                  <iframe
                    src={deck.youtubeEmbedSrc}
                    title={`${deck.alt} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      display: "block",
                    }}
                  />
                ) : deck.videoSrc ? (
                  <video
                    src={deck.videoSrc}
                    controls
                    playsInline
                    preload="metadata"
                    autoPlay
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "0 72px",
                      color: "rgba(255,255,255,0.78)",
                      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
                      fontSize: 24,
                      lineHeight: 1.6,
                      letterSpacing: 0.2,
                    }}
                  >
                    {deck.findOutMoreBtnSrc
                      ? 'No video has been published by the organiser yet, please click the "Find Out More" button to read my experience here.'
                      : "No video has been published by the organiser yet."}
                  </div>
                )}
              </div>

              {deck.findOutMoreBtnSrc ? (
                <button
                  type="button"
                  onClick={() => {
                    if (deck.id === "ocbc") {
                      setOcbcDetailOpen(true);
                      if (phase !== "dock") setPhase("dock");
                    }

                    if (deck.id === "aucto") {
                      setAuctoDetailOpen(true);
                      if (phase !== "dock") setPhase("dock");
                    }

                    if (deck.id === "taedal") {
                      setTaedalDetailOpen(true);
                      if (phase !== "dock") setPhase("dock");
                    }

                    if (deck.id === "activ") {
                      setActivDetailOpen(true);
                      if (phase !== "dock") setPhase("dock");
                    }
                  }}
                  aria-label="Find out more"
                  style={{
                    width: "fit-content",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor:
                      deck.id === "ocbc" ||
                      deck.id === "aucto" ||
                      deck.id === "taedal" ||
                      deck.id === "activ"
                        ? "pointer"
                        : "default",
                    alignSelf: "flex-start",
                    opacity:
                      deck.id === "ocbc" ||
                      deck.id === "aucto" ||
                      deck.id === "taedal" ||
                      deck.id === "activ"
                        ? 1
                        : 0.6,
                  }}
                >
                  <Image
                    src={deck.findOutMoreBtnSrc}
                    alt="Find out more"
                    width={220}
                    height={56}
                    priority
                    style={{ width: 220, height: "auto", objectFit: "contain" }}
                  />
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const { stageRef, scale } = useFitScale(DESIGN);
  const [activeDeck, setActiveDeck] = useState<DeckConfig | null>(null);

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
      {
        src: "/assets/Home.svg",
        alt: "Home",
        href: "/",
        x: NAV_POS.navItems.home.x,
        y: NAV_POS.navItems.home.y,
        w: NAV_POS.navItems.home.w,
        h: NAV_POS.navItems.home.h,
      },
      {
        src: "/assets/About.svg",
        alt: "About",
        href: "/about",
        x: NAV_POS.navItems.about.x,
        y: NAV_POS.navItems.about.y,
        w: NAV_POS.navItems.about.w,
        h: NAV_POS.navItems.about.h,
      },
      {
        src: "/assets/Experience.svg",
        alt: "Experience",
        href: "/experience",
        x: NAV_POS.navItems.experience.x,
        y: NAV_POS.navItems.experience.y,
        w: NAV_POS.navItems.experience.w,
        h: NAV_POS.navItems.experience.h,
      },
      {
        src: "/assets/Projects.svg",
        alt: "Projects",
        href: "/projects",
        x: NAV_POS.navItems.projects.x,
        y: NAV_POS.navItems.projects.y,
        w: NAV_POS.navItems.projects.w,
        h: NAV_POS.navItems.projects.h,
      },
    ],
    []
  );

  const iconItems = useMemo(
    () => [
      {
        src: "/assets/email_icon.svg",
        alt: "Email",
        href: "mailto:andynilessim05@gmail.com",
      },
      {
        src: "/assets/linkedin_icon.svg",
        alt: "LinkedIn",
        href: "https://www.linkedin.com/in/andy-sim-61b261287/",
      },
      {
        src: "/assets/telegram_icon.svg",
        alt: "Telegram",
        href: "https://t.me/kombuchaddict",
      },
    ],
    []
  );

  const decks: DeckConfig[] = useMemo(
    () => [
      {
        id: "taedal",
        src: "/assets/taedal_deck.svg",
        alt: "Taedal deck",
        rect: { x: DECK.x1, y: DECK.y1, w: DECK.w, h: DECK.h },
        youtubeEmbedSrc:
          "https://www.youtube.com/embed/K6o_OwgvwIw?autoplay=1&playsinline=1&rel=0",
        findOutMoreBtnSrc: "/assets/find_out_more.svg",
      },
      {
        id: "ocbc",
        src: "/assets/ocbc_deck.svg",
        alt: "OCBC deck",
        rect: { x: DECK.x2, y: DECK.y1, w: DECK.w, h: DECK.h },
        youtubeEmbedSrc:
          "https://www.youtube.com/embed/TRokrwZoiW4?autoplay=1&playsinline=1&rel=0",
        findOutMoreBtnSrc: "/assets/find_out_more.svg",
      },
      {
        id: "aucto",
        src: "/assets/aucto_deck.svg",
        alt: "Aucto deck",
        rect: { x: DECK.x3, y: DECK.y1, w: DECK.w, h: DECK.h },
        findOutMoreBtnSrc: "/assets/find_out_more.svg",
      },
      {
        id: "uniqlo",
        src: "/assets/uniqlo_deck.svg",
        alt: "Uniqlo deck",
        rect: { x: DECK_POS.uniqloX, y: DECK.y1, w: DECK.w, h: DECK.h },
        youtubeEmbedSrc:
          "https://www.youtube.com/embed/HgJPtRzLF_0?autoplay=1&playsinline=1&rel=0",
        findOutMoreBtnSrc: "/assets/find_out_more.svg",
      },
      {
        id: "ait",
        src: "/assets/ait_deck.svg",
        alt: "AIT deck",
        rect: { x: DECK_POS.aitX, y: DECK_POS.row2Y, w: DECK.w, h: DECK.h },
      },
      {
        id: "activ",
        src: "/assets/activ_deck.svg",
        alt: "Activ deck",
        rect: { x: DECK.x2, y: DECK_POS.row2Y, w: DECK.w, h: DECK.h },
        findOutMoreBtnSrc: "/assets/find_out_more.svg",
      },
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
      {activeDeck && (
        <DeckOverlay scale={scale} deck={activeDeck} onClose={() => setActiveDeck(null)} />
      )}

      <div style={{ position: "relative", minHeight: "140vh" }}>
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

        <div
          style={{
            position: "fixed",
            left: "50%",
            top: 0,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            width: DESIGN.w,
            height: NAV_GLASS.height,
            zIndex: 80,
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
              <div
                style={{
                  position: "absolute",
                  left: NAV_POS.ndLogo.x,
                  top: NAV_POS.ndLogo.y,
                  width: NAV_POS.ndLogo.w,
                  height: NAV_POS.ndLogo.h,
                  userSelect: "none",
                  zIndex: 10,
                }}
              >
                <IconButton href="/" ariaLabel="Home">
                  <Image
                    src="/assets/ND_Logo.svg"
                    alt="ND Logo"
                    width={Math.round(NAV_POS.ndLogo.w)}
                    height={Math.round(NAV_POS.ndLogo.h)}
                    priority
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </IconButton>
              </div>

              {navItems.map((item) => (
                <div
                  key={item.alt}
                  style={{
                    position: "absolute",
                    left: item.x,
                    top: item.y,
                    width: item.w,
                    height: item.h,
                    userSelect: "none",
                  }}
                >
                  <IconButton href={item.href} ariaLabel={item.alt}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.w}
                      height={item.h}
                      priority={item.alt === "Experience"}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </IconButton>
                </div>
              ))}

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

              {decks.map((d) => (
                <ClickableAsset
                  key={d.id}
                  src={d.src}
                  alt={d.alt}
                  x={d.rect.x}
                  y={d.rect.y + CONTENT_DY}
                  w={d.rect.w}
                  h={d.rect.h}
                  priority={d.id === "taedal"}
                  onClick={() => setActiveDeck(d)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}