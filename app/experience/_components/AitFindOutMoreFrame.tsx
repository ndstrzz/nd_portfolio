"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Rect = { x: number; y: number; w: number; h: number };

const FRAME_W = 1920;
const FRAME_H = 2460;
const FRAME_SHIFT_Y = 0;

const AIT_CONTENT_BLOCK: Rect & { src: string; alt: string } = {
  x: 379,
  y: 328,
  w: 1233,
  h: 952.87,
  src: "/assets/ait_deck/AI_T_CONTENT.svg",
  alt: "AIT Software content",
};

const FOOTER_BLOCK: Rect & { src: string; alt: string } = {
  x: -3,
  y: 1468,
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

export default function AitFindOutMoreFrame({
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
              aria-label="Close AIT Find Out More"
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

            <AbsImage rect={AIT_CONTENT_BLOCK} priority zIndex={5} />
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