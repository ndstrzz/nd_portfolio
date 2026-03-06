"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Rect = { x: number; y: number; w: number; h: number };

// ✅ Fixed Figma frame
const FRAME_W = 1920;
const FRAME_H = 3365;

// ✅ Shift the whole frame if needed later
const FRAME_SHIFT_Y = 0;

// ✅ Assets from your Figma measurements
const AUCTO_LOGO_BLOCK: Rect & { src: string; alt: string } = {
  x: 623,
  y: 328,
  w: 674,
  h: 539,
  src: "/assets/aucto_deck/find_out_more/aucto_logo_with_title_description.svg",
  alt: "Aucto logo with title and description",
};

const AUCTO_BACKGROUND_BLOCK: Rect & { src: string; alt: string } = {
  x: 372.66,
  y: 916,
  w: 1164,
  h: 148.32,
  src: "/assets/aucto_deck/find_out_more/aucto_background_with_description.svg",
  alt: "Aucto background with description",
};

const AUCTO_ROLE_BLOCK: Rect & { src: string; alt: string } = {
  x: 387.15,
  y: 1087,
  w: 1149.51,
  h: 80.54,
  src: "/assets/aucto_deck/find_out_more/aucto_role_with_description.svg",
  alt: "Aucto role with description",
};

const AUCTO_TASK_BLOCK: Rect & { src: string; alt: string } = {
  x: 385.92,
  y: 1217,
  w: 1153.58,
  h: 101.1,
  src: "/assets/aucto_deck/find_out_more/aucto_task_assigned_with_description.svg",
  alt: "Aucto task assigned with description",
};

const AUCTO_FIRST_PHOTOS: Rect & { src: string; alt: string } = {
  x: 445,
  y: 1403,
  w: 1016,
  h: 710,
  src: "/assets/aucto_deck/find_out_more/first_photos.svg",
  alt: "Aucto first photos",
};

// ✅ Using an in-frame corrected X so the image visually matches the screenshot.
// The -691 value from Figma looks like it came from a nested group measurement.
const AUCTO_SECOND_PHOTOS: Rect & { src: string; alt: string } = {
  x: 380,
  y: 2185,
  w: 1159,
  h: 745,
  src: "/assets/aucto_deck/find_out_more/second_photos.svg",
  alt: "Aucto second photos",
};

const FOOTER_BLOCK: Rect & { src: string; alt: string } = {
  x: -3,
  y: 3095,
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

export default function AuctoFindOutMoreFrame({
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
              height: FRAME_H,
              background: "#000000",
              overflowX: "hidden",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Aucto Find Out More"
              style={{
                position: "sticky",
                top: 16,
                marginLeft: FRAME_W - 16 - 44,
                zIndex: 99999,
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

            <AbsImage rect={AUCTO_LOGO_BLOCK} priority zIndex={5} />
            <AbsImage rect={AUCTO_BACKGROUND_BLOCK} priority zIndex={5} />
            <AbsImage rect={AUCTO_ROLE_BLOCK} priority zIndex={5} />
            <AbsImage rect={AUCTO_TASK_BLOCK} priority zIndex={5} />
            <AbsImage rect={AUCTO_FIRST_PHOTOS} priority zIndex={5} />
            <AbsImage rect={AUCTO_SECOND_PHOTOS} priority zIndex={5} />
            <AbsImage rect={FOOTER_BLOCK} priority zIndex={999999} />
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
            zIndex: 100000,
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