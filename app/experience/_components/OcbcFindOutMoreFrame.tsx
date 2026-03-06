"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Rect = { x: number; y: number; w: number; h: number };

type LinkHotspot = Rect & {
  href: string;
  ariaLabel?: string;
};

type EventBlock = {
  key: string;
  title: Rect & { src: string; alt: string };
  chunk: Rect & { src: string; alt: string };
  links?: LinkHotspot[];
};

// ✅ Fixed width, dynamic height per term
const FRAME_W = 1920;
const FRAME_H_TERM1 = 30800;
const FRAME_H_TERM2 = 36680;

// ✅ Shift the whole frame UP by this amount (edit anytime)
const FRAME_SHIFT_Y = 0;

// Introduction.svg placement
const INTRO = {
  x: 157,
  y: 205,
  w: 1606,
  h: 669,
  src: "/assets/ocbc_deck/find_out_more/introduction.svg",
};

// Term buttons
const TERM_BTN = {
  y: 900,
  w: 330,
  h: 58,
  x1: 270,
  gap: 23,
  x2ShiftLeft: 14,
};
const TERM_X2_BASE = TERM_BTN.x1 + TERM_BTN.w + TERM_BTN.gap;
const TERM_X2 = TERM_X2_BASE - TERM_BTN.x2ShiftLeft;

const TERM_ASSETS = {
  first: {
    active: "/assets/ocbc_deck/find_out_more/first_term%20activated.svg",
    inactive: "/assets/ocbc_deck/find_out_more/first_term_deactivated.svg",
  },
  second: {
    active: "/assets/ocbc_deck/find_out_more/second_term_activated.svg",
    inactive: "/assets/ocbc_deck/find_out_more/second_term_deactivated.svg",
  },
};

/**
 * ✅ TERM GROUP ORIGINS (ABSOLUTE)
 */
const TERM1_ORIGIN = { x: 230, y: 980 };
const TERM2_ORIGIN = { x: 230, y: 980 };

/** Convert a group-relative rect into an absolute rect on the full canvas */
function absRect(origin: { x: number; y: number }, r: Rect): Rect {
  return { x: origin.x + r.x, y: origin.y + r.y, w: r.w, h: r.h };
}

/**
 * ✅ TERM LINES (CODE-BASED, SHINING)
 */
const TERM1_DIVIDER = {
  x: 264.9,
  y: 1009,
  h: 27977,
  thickness: 8,
  baseColor: "rgba(255,255,255,0.55)",
  glowColor: "rgba(255,255,255,0.95)",
};

const TERM2_DIVIDER = {
  x: 264.9,
  y: 1009,
  h: 33647,
  thickness: 8,
  baseColor: "rgba(255,255,255,0.55)",
  glowColor: "rgba(255,255,255,0.95)",
};

/**
 * ✅ FOOTER
 */
const FOOTER_SRC = "/assets/ocbc_deck/find_out_more/footer.svg";
const FOOTER_ALT = "Footer";

// Term 1 footer
const FOOTER_TERM1: Rect = {
  x: 0,
  y: 28000,
  w: 1916.01,
  h: 992,
};

// Term 2 footer
const FOOTER_TERM2: Rect = {
  x: 0,
  y: 33800,
  w: 1916.01,
  h: 992,
};

/**
 * ✅ TERM 1 EVENTS
 */
const TERM1_EVENTS: EventBlock[] = [
  {
    key: "red_conference",
    title: {
      ...absRect(TERM1_ORIGIN, { x: 0, y: 0, w: 594, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/red_conference_with_logo.svg",
      alt: "The OCBC RED Conference (with logo)",
    },
    chunk: {
      ...absRect(TERM1_ORIGIN, { x: 90.4, y: 115, w: 1328, h: 1571.52 }),
      src: "/assets/ocbc_deck/find_out_more/red_conference_chunk.svg",
      alt: "OCBC RED Conference content",
    },
    links: [
      {
        x: 0,
        y: 735,
        w: 689,
        h: 28,
        href: "https://www.youtube.com/watch?si=9xuGdkKatqZPWzUq&v=KAxDgDfIajs&feature=youtu.be",
        ariaLabel: "Watch the RED Conference video",
      },
    ],
  },
  {
    key: "wall_decal",
    title: {
      ...absRect(TERM1_ORIGIN, { x: 0, y: 1761.52, w: 436, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/wall_decal_design_with_logo.svg",
      alt: "Wall Decal Design (with logo)",
    },
    chunk: {
      ...absRect(TERM1_ORIGIN, { x: 90.42, y: 1876, w: 1329, h: 7901.71 }),
      src: "/assets/ocbc_deck/find_out_more/wall_decal_chunk.svg",
      alt: "Wall Decal Design content",
    },
  },
  {
    key: "avatar_background_design",
    title: {
      ...absRect(TERM1_ORIGIN, { x: 0, y: 9852.71, w: 597, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/avatar_background_design_with_logo.svg",
      alt: "Avatar Background Design (with logo)",
    },
    chunk: {
      ...absRect(TERM1_ORIGIN, { x: 90, y: 9967.55, w: 1293, h: 1720.43 }),
      src: "/assets/ocbc_deck/find_out_more/avatar_background_design_chunk.svg",
      alt: "Avatar Background Design content",
    },
  },
  {
    key: "edm_tv_signages",
    title: {
      ...absRect(TERM1_ORIGIN, { x: 0, y: 11762.98, w: 907, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/electronic_direct_mail_TV_Signage_with_logo.svg",
      alt: "Electronic Direct Mail (EDM) on TV Signages (with logo)",
    },
    chunk: {
      ...absRect(TERM1_ORIGIN, { x: 90, y: 11877.82, w: 1327.58, h: 1523 }),
      src: "/assets/ocbc_deck/find_out_more/electronic_direct_mail_TV_Signage_chunk.svg",
      alt: "Electronic Direct Mail (EDM) on TV Signages content",
    },
  },
  {
    key: "edm_comm_productivity",
    title: {
      ...absRect(TERM1_ORIGIN, { x: 0, y: 13475.82, w: 994, h: 104 }),
      src: "/assets/ocbc_deck/find_out_more/electronic_direct_mail_with_logo.svg",
      alt: "Electronic Direct Mail (EDM) on Communication and Productivity (with logo)",
    },
    chunk: {
      ...absRect(TERM1_ORIGIN, { x: 90.42, y: 13625, w: 1327, h: 1724.39 }),
      src: "/assets/ocbc_deck/find_out_more/electronic_direct_mail_chunk.svg",
      alt: "Electronic Direct Mail (EDM) on Communication and Productivity content",
    },
  },
  {
    key: "getting_featured_ocbc",
    title: {
      ...absRect(TERM1_ORIGIN, { x: 0, y: 15514.23, w: 994, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/getting_featured_OCBC_with_logo.svg",
      alt: "Getting featured on the OCBC website (with logo)",
    },
    chunk: {
      ...absRect(TERM1_ORIGIN, { x: 96.42, y: 15629.07, w: 1321, h: 11216 }),
      src: "/assets/ocbc_deck/find_out_more/getting_featured_OCBC_chunk.svg",
      alt: "Getting featured on the OCBC website content",
    },
  },
];

/**
 * ✅ TERM 2 EVENTS
 */
const TERM2_EVENTS: EventBlock[] = [
  {
    key: "nft_selft_mint_automation",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 0, w: 1093.42, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/nft_selft_mint_automation_with_logo.svg",
      alt: "NFT Self Mint Automation Workflow (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 80, y: 127, w: 1326.49, h: 3045 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/nft_selft_mint_automation_chunk.svg",
      alt: "NFT Self Mint Automation Workflow content",
    },
  },
  {
    key: "deal_or_no_deal_summer",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 3337, w: 1144, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/deal_or_no_deal_with_logo.svg",
      alt: "Deal Or No Deal (DOND) - Summer Cohort Event Support (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 110, y: 3451, w: 1377.42, h: 1689 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/deal_or_no_deal_chunk.svg",
      alt: "Deal Or No Deal (DOND) - Summer Cohort Event Support content",
    },
  },
  {
    key: "food_explorer_features",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 5215, w: 1139, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/food_explorer_features_with_logo.svg",
      alt: "Food Explorer Feature Proposal (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 115, y: 5288, w: 1328, h: 1262 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/food_explorer_features_chunk.svg",
      alt: "Food Explorer Feature Proposal content",
    },
  },
  {
    key: "ocbc_ignite_internship",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 6625, w: 1051, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/ocbc_ignite_internship_with_logo.svg",
      alt: "OCBC Ignite Internship Sharing (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 90.39, y: 6758.42, w: 1328, h: 3308.58 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/ocbc_ignite_internship_chunk.svg",
      alt: "OCBC Ignite Internship Sharing content",
    },
  },
  {
    key: "goat_connect",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 10142, w: 967, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/GO%26T_connect_with_logo.svg",
      alt: "GO&T Connect Mascot Design (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 90.42, y: 10249, w: 1411.58, h: 3592 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/GO%26T_connect_chunk.svg",
      alt: "GO&T Connect Mascot Design content",
    },
  },
  {
    key: "ignite_2025",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 13977, w: 1199, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/ignite_2025_with_logo.svg",
      alt: "Ignite 2025 Hackathon Promotional Video — Video Director (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 90.39, y: 14092, w: 1380.61, h: 3777 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/ignite_2025_chunk.svg",
      alt: "Ignite 2025 Hackathon Promotional Video content",
    },
  },
  {
    key: "deal_or_no_deal_winter",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 17944, w: 1114, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/deal_or_no_deal_winter_with_logo.svg",
      alt: "Deal Or No Deal (DOND) - Winter Cohort Event Support (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 90, y: 18063, w: 1215, h: 1220 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/deal_or_no_deal_winter_chunk.svg",
      alt: "Deal Or No Deal (DOND) - Winter Cohort Event Support content",
    },
  },
  {
    key: "christmas_2025",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 19358, w: 874, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/christmas_2025_with_logo.svg",
      alt: "Christmas 2025 TV Signage (3D Concept) (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 88, y: 19453, w: 1439, h: 2530 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/christmas_2025_chunk.svg",
      alt: "Christmas 2025 TV Signage (3D Concept) content",
    },
  },
  {
    key: "designing_concept_kids_avatar",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 22100, w: 750.42, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/designing_concept_with_logo.svg",
      alt: "Designing Concept for Kid's Avatar (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 88, y: 22195, w: 1378.42, h: 3316 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/designing_concept_chunk.svg",
      alt: "Designing Concept for Kid's Avatar content",
    },
  },
  {
    key: "beautifying_department",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 25604, w: 1443.42, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/beautifying_department_with_logo.svg",
      alt: "Beautifying the Department's Project Plan Showcase (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 88, y: 25704, w: 1322, h: 1301 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/beautifying_department_chunk.svg",
      alt: "Beautifying the Department's Project Plan Showcase content",
    },
  },
  {
    key: "getting_featured_term2",
    title: {
      ...absRect(TERM2_ORIGIN, { x: 0, y: 27111, w: 816.42, h: 69.84 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/getting_featured_with_logo.svg",
      alt: "Getting featured on the OCBC website (with logo)",
    },
    chunk: {
      ...absRect(TERM2_ORIGIN, { x: 88, y: 27210, w: 1420, h: 5493.3 }),
      src: "/assets/ocbc_deck/find_out_more/term_2/getting_featured_chunk.svg",
      alt: "Getting featured on the OCBC website content",
    },
  },
];

function AbsImage({
  rect,
  priority,
  zIndex,
}: {
  rect: Rect & { src: string; alt: string };
  priority?: boolean;
  zIndex?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        zIndex: zIndex ?? "auto",
        pointerEvents: "auto",
      }}
    >
      <Image
        src={rect.src}
        alt={rect.alt}
        width={Math.max(1, Math.round(rect.w))}
        height={Math.max(1, Math.round(rect.h))}
        priority={priority}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

function RevealLayer({
  rect,
  visible,
  zIndex,
  children,
  delayMs = 0,
}: {
  rect: Rect;
  visible: boolean;
  zIndex?: number;
  children: React.ReactNode;
  delayMs?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        zIndex: zIndex ?? "auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(26px)",
        transition: `opacity 420ms ease ${delayMs}ms, transform 420ms ease ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function ShiningLine({
  x,
  y,
  h,
  thickness = 4,
  baseColor = "rgba(255,255,255,0.55)",
  glowColor = "rgba(255,255,255,0.95)",
  zIndex = 2,
  sparkleSize = 1220,
  durationMs = 200000,
  blurPx = 20,
}: {
  x: number;
  y: number;
  h: number;
  thickness?: number;
  baseColor?: string;
  glowColor?: string;
  zIndex?: number;
  sparkleSize?: number;
  durationMs?: number;
  blurPx?: number;
}) {
  return (
    <>
      <style>{`
        @keyframes ocbc-line-spark {
          0%   { transform: translateY(-${sparkleSize}px); opacity: 0; }
          8%   { opacity: 1; }
          50%  { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(${h + sparkleSize}px); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: thickness,
          height: h,
          zIndex,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: baseColor,
            borderRadius: 999,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: baseColor,
            filter: `blur(${Math.max(2, Math.round(blurPx / 2))}px)`,
            opacity: 0.55,
            borderRadius: 999,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: -Math.max(6, thickness * 2),
            width: thickness + Math.max(12, thickness * 4),
            height: sparkleSize,
            background: `linear-gradient(to bottom,
              rgba(255,255,255,0) 0%,
              ${glowColor} 45%,
              rgba(255,255,255,0) 100%)
            `,
            filter: `blur(${blurPx}px)`,
            opacity: 0.9,
            animation: `ocbc-line-spark ${durationMs}ms linear infinite`,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            width: thickness,
            height: sparkleSize,
            background: `linear-gradient(to bottom,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,1) 45%,
              rgba(255,255,255,0) 100%)
            `,
            opacity: 0.85,
            animation: `ocbc-line-spark ${durationMs}ms linear infinite`,
          }}
        />
      </div>
    </>
  );
}

export default function OcbcFindOutMoreFrame({
  open,
  topY,
  onClose,
}: {
  open: boolean;
  topY: number;
  onClose: () => void;
}) {
  const [term, setTerm] = useState<"first" | "second">("first");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportH, setViewportH] = useState(0);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const frameH = term === "first" ? FRAME_H_TERM1 : FRAME_H_TERM2;

  const activeEvents = useMemo(() => {
    return term === "first" ? TERM1_EVENTS : TERM2_EVENTS;
  }, [term]);

  const footerRect: Rect & { src: string; alt: string } =
    term === "first"
      ? { ...FOOTER_TERM1, src: FOOTER_SRC, alt: FOOTER_ALT }
      : { ...FOOTER_TERM2, src: FOOTER_SRC, alt: FOOTER_ALT };

  const line = term === "first" ? TERM1_DIVIDER : TERM2_DIVIDER;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({ top: 0, behavior: "auto" });
    setShowBackToTop(false);
    setScrollTop(0);
    setViewportH(el.clientHeight);
    setRevealedIds(new Set());
  }, [term, open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onResize = () => setViewportH(el.clientHeight);
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const triggerBottom = scrollTop + viewportH - 120;
    if (triggerBottom <= 0) return;

    setRevealedIds((prev) => {
      const next = new Set(prev);

      for (const ev of activeEvents) {
        if (ev.title.y <= triggerBottom) next.add(`${ev.key}-title`);
        if (ev.chunk.y <= triggerBottom) next.add(`${ev.key}-chunk`);
      }

      return next;
    });
  }, [scrollTop, viewportH, activeEvents]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollTop(el.scrollTop);
    setShowBackToTop(el.scrollTop > 900);
  };

  const scrollToTop = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: topY + FRAME_SHIFT_Y,
        width: FRAME_W,
        height: "100%",
        pointerEvents: open ? "auto" : "none",
        zIndex: 1,
        overflowX: "hidden",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: FRAME_W,
          height: "100%",
          overflow: "hidden",
          borderRadius: 0,
          background: "rgba(0,0,0,0.0)",
          transform: open ? "translateY(0px)" : "translateY(100%)",
          transition: "transform 520ms cubic-bezier(.2,.9,.2,1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            position: "absolute",
            inset: 0,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          <div
            style={{
              position: "relative",
              width: FRAME_W,
              minHeight: "100%",
              height: frameH,
              background: "#000000",
              overflowX: "hidden",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close OCBC Find Out More"
              style={{
                position: "sticky",
                top: 16,
                marginLeft: FRAME_W - 16 - 44,
                zIndex: 99999999,
                width: 44,
                height: 44,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.35)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              ✕
            </button>

            <AbsImage
              rect={{
                x: INTRO.x,
                y: INTRO.y,
                w: INTRO.w,
                h: INTRO.h,
                src: INTRO.src,
                alt: "OCBC introduction",
              }}
              priority
              zIndex={5}
            />

            <button
              type="button"
              onClick={() => setTerm("first")}
              aria-label="First term"
              style={{
                position: "absolute",
                left: TERM_BTN.x1,
                top: TERM_BTN.y,
                width: TERM_BTN.w,
                height: TERM_BTN.h,
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <Image
                src={term === "first" ? TERM_ASSETS.first.active : TERM_ASSETS.first.inactive}
                alt="First term button"
                width={TERM_BTN.w}
                height={TERM_BTN.h}
                priority
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </button>

            <button
              type="button"
              onClick={() => setTerm("second")}
              aria-label="Second term"
              style={{
                position: "absolute",
                left: TERM_X2,
                top: TERM_BTN.y,
                width: TERM_BTN.w,
                height: TERM_BTN.h,
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <Image
                src={term === "second" ? TERM_ASSETS.second.active : TERM_ASSETS.second.inactive}
                alt="Second term button"
                width={TERM_BTN.w}
                height={TERM_BTN.h}
                priority
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </button>

            <ShiningLine
              x={line.x}
              y={line.y}
              h={line.h}
              thickness={line.thickness}
              baseColor={line.baseColor}
              glowColor={line.glowColor}
              zIndex={2}
              sparkleSize={220}
              durationMs={2600}
              blurPx={10}
            />

            {activeEvents.map((ev) => {
              const titleVisible = revealedIds.has(`${ev.key}-title`);
              const chunkVisible = revealedIds.has(`${ev.key}-chunk`);

              return (
                <React.Fragment key={ev.key}>
                  <RevealLayer rect={ev.title} visible={titleVisible} zIndex={5}>
                    <Image
                      src={ev.title.src}
                      alt={ev.title.alt}
                      width={Math.max(1, Math.round(ev.title.w))}
                      height={Math.max(1, Math.round(ev.title.h))}
                      priority
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </RevealLayer>

                  <RevealLayer rect={ev.chunk} visible={chunkVisible} zIndex={3} delayMs={60}>
                    <Image
                      src={ev.chunk.src}
                      alt={ev.chunk.alt}
                      width={Math.max(1, Math.round(ev.chunk.w))}
                      height={Math.max(1, Math.round(ev.chunk.h))}
                      priority
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />

                    {ev.links?.map((lnk, idx) => (
                      <a
                        key={`${ev.key}-lnk-${idx}`}
                        href={lnk.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={lnk.ariaLabel ?? "Open link"}
                        style={{
                          position: "absolute",
                          left: lnk.x,
                          top: lnk.y,
                          width: lnk.w,
                          height: lnk.h,
                          display: "block",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </RevealLayer>
                </React.Fragment>
              );
            })}

            <AbsImage rect={footerRect} priority zIndex={9999} />
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: "absolute",
            right: 28,
            bottom: 28,
            zIndex: 2147483647,
            width: 58,
            height: 58,
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "rgba(255,255,255,0.96)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 14px 36px rgba(0,0,0,0.28)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            opacity: showBackToTop ? 1 : 0,
            transform: showBackToTop ? "translateY(0px)" : "translateY(12px)",
            pointerEvents: showBackToTop ? "auto" : "none",
            transition: "opacity 180ms ease, transform 180ms ease",
            padding: 0,
          }}
        >
          <Image
            src="/assets/arrow_up_button.svg"
            alt="Back to top"
            width={24}
            height={24}
            priority
            style={{
              width: 168,
              height: 168,
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        </button>
      </div>
    </div>
  );
}