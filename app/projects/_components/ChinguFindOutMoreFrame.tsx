// C:\Users\User\Downloads\andy_portfolio\app\projects\_components\ChinguFindOutMoreFrame.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Rect = { x: number; y: number; w: number; h: number };

const FRAME_W = 1920;
const FRAME_H = 7287;
const FRAME_SHIFT_Y = 0;

const CHINGU_ARTICLE_URL =
  "https://www.synapxe.sg/news/artificial-intelligence/ai-innovation-challenge-2026";

const FIRST_WALLPAPER: Rect & { src: string; alt: string } = {
  x: 385,
  y: 225,
  w: 1160,
  h: 652,
  src: "/assets/folder/chingu/first_wallpaper.svg",
  alt: "NUS Synapxe IMDA AI Innovation Challenge 2026 wallpaper",
};

const FIRST_WALLPAPER_CTA: Rect = {
  x: 385,
  y: 892,
  w: 1160,
  h: 28,
};

const HACKATHON_OVERVIEW: Rect & { src: string; alt: string } = {
  x: 377.46,
  y: 916.84,
  w: 1152.2,
  h: 276.16,
  src: "/assets/folder/chingu/hackathon_overview_with_description.svg",
  alt: "Hackathon overview with description",
};

const CHINGU_LOGO_WITH_DESCRIPTION: Rect & { src: string; alt: string } = {
  x: 462,
  y: 1276,
  w: 996.15,
  h: 181.79,
  src: "/assets/folder/chingu/chingu_logo_with_description.svg",
  alt: "Chingu logo with description",
};

const REMAINING_POINTS: Rect & { src: string; alt: string } = {
  x: 366,
  y: 1535,
  w: 1245,
  h: 4647,
  src: "/assets/folder/chingu/the_remaining_points_descriptions.svg",
  alt: "Remaining points descriptions",
};

const FOOTER_BLOCK: Rect & { src: string; alt: string } = {
  x: 4,
  y: 6295,
  w: 1916.01,
  h: 992,
  src: "/assets/footer.svg",
  alt: "Footer",
};

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

function ClickableImageBlock({
  rect,
  href,
  captionRect,
  caption,
}: {
  rect: Rect & { src: string; alt: string };
  href: string;
  captionRect: Rect;
  caption: string;
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={rect.alt}
        style={{
          position: "absolute",
          left: rect.x,
          top: rect.y,
          width: rect.w,
          height: rect.h,
          display: "block",
          zIndex: 6,
          borderRadius: 14,
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 0 42px rgba(255,255,255,0.10)",
        }}
      >
        <Image
          src={rect.src}
          alt={rect.alt}
          width={Math.max(1, Math.round(rect.w))}
          height={Math.max(1, Math.round(rect.h))}
          priority
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </a>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Click here to find out more"
        style={{
          position: "absolute",
          left: captionRect.x,
          top: captionRect.y,
          width: captionRect.w,
          height: captionRect.h,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          color: "rgba(255,255,255,0.82)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 0.2,
          textAlign: "center",
        }}
      >
        {caption}
      </a>
    </>
  );
}

export default function ChinguFindOutMoreFrame({
  open,
  topY,
  onClose,
}: {
  open: boolean;
  topY: number;
  onClose: () => void;
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({ top: 0, behavior: "auto" });
    setShowBackToTop(false);
  }, [open]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowBackToTop(el.scrollTop > 700);
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
          background: "rgba(0,0,0,0)",
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
              height: FRAME_H,
              background: "#000000",
              overflowX: "hidden",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Chingu Find Out More"
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

            <ClickableImageBlock
              rect={FIRST_WALLPAPER}
              href={CHINGU_ARTICLE_URL}
              captionRect={FIRST_WALLPAPER_CTA}
              caption="Click here to find out more"
            />

            <AbsImage rect={HACKATHON_OVERVIEW} priority zIndex={5} />
            <AbsImage rect={CHINGU_LOGO_WITH_DESCRIPTION} priority zIndex={5} />
            <AbsImage rect={REMAINING_POINTS} priority zIndex={5} />
            <AbsImage rect={FOOTER_BLOCK} priority zIndex={9999} />
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