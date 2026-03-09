"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Rect = { x: number; y: number; w: number; h: number };

const FRAME_W = 1920;
const FRAME_H = 6188;
const FRAME_SHIFT_Y = 0;

const TAEDAL_URL = "https://taedal-v7.vercel.app";

const WEBSITE_PREVIEW: Rect = {
  x: 404,
  y: 184,
  w: 1125,
  h: 661,
};

const ARROW_TO_WEBSITE: Rect & { src: string; alt: string } = {
  x: 794,
  y: 799,
  w: 332,
  h: 99,
  src: "/assets/taedal-deck/find_out_more/arrow_to_the_website.svg",
  alt: "Arrow to Taedal website",
};

const TAEDAL_LOGO_TITLE: Rect & { src: string; alt: string } = {
  x: 376,
  y: 962,
  w: 1153.66,
  h: 165,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_title_with_description.svg",
  alt: "Taedal logo title with description",
};

const TAEDAL_BACKGROUND: Rect & { src: string; alt: string } = {
  x: 371,
  y: 1172,
  w: 1164,
  h: 200,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_background_with_description.svg",
  alt: "Taedal background with description",
};

const TAEDAL_WHY_EXIST: Rect & { src: string; alt: string } = {
  x: 371,
  y: 1417,
  w: 1164,
  h: 195,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_why_taedal_with_description.svg",
  alt: "Why Taedal needed to exist",
};

const TAEDAL_DIFFERENT: Rect & { src: string; alt: string } = {
  x: 368,
  y: 1666.22,
  w: 1170,
  h: 197.78,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_what_makes_taedal_with_description.svg",
  alt: "What makes Taedal different",
};

const TAEDAL_MY_ROLE: Rect & { src: string; alt: string } = {
  x: 366,
  y: 1910,
  w: 1174,
  h: 198,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_my_roles_with_description.svg",
  alt: "Taedal my role",
};

const TAEDAL_DESIGN_EXP: Rect & { src: string; alt: string } = {
  x: 364,
  y: 2145,
  w: 1178,
  h: 225,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_designing_experience_with_description.svg",
  alt: "Designing the Taedal experience",
};

const FIRST_VIDEO: Rect = {
  x: 413,
  y: 2479,
  w: 1094,
  h: 610,
};

const TAEDAL_GIVING_FACE: Rect & { src: string; alt: string } = {
  x: 366,
  y: 3189.5,
  w: 1176,
  h: 223.5,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_giving_taedal_with_description.svg",
  alt: "Giving Taedal a Face",
};

const KURO_WAVING: Rect = {
  x: 447,
  y: 3431,
  w: 303,
  h: 454,
};

const KURO_DESCRIPTION: Rect & { src: string; alt: string } = {
  x: 871,
  y: 3506,
  w: 674,
  h: 270,
  src: "/assets/taedal-deck/find_out_more/kuro_with_description.svg",
  alt: "Kuro with description",
};

const KURO_BLUEPRINT: Rect & { src: string; alt: string } = {
  x: 405,
  y: 3885,
  w: 1235,
  h: 499,
  src: "/assets/taedal-deck/find_out_more/kuro_blueprint.svg",
  alt: "Kuro blueprint",
};

const TAEDAL_WHERE_HEADING: Rect & { src: string; alt: string } = {
  x: 365,
  y: 4460.5,
  w: 1177,
  h: 201,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_where_taedal_is_heading_with_description.svg",
  alt: "Where Taedal is Heading",
};

const TAEDAL_LESSON_LEARNT: Rect & { src: string; alt: string } = {
  x: 366.5,
  y: 4738,
  w: 1175.5,
  h: 180,
  src: "/assets/taedal-deck/find_out_more/taedal_logo_lesson_learnt_with_description.svg",
  alt: "Lesson learnt",
};

const FOOTER_BLOCK: Rect & { src: string; alt: string } = {
  x: -3,
  y: 5196,
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

function GifBlock({
  rect,
  src,
  alt,
  zIndex = 5,
}: {
  rect: Rect;
  src: string;
  alt: string;
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
        zIndex,
        pointerEvents: "auto",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={Math.max(1, Math.round(rect.w))}
        height={Math.max(1, Math.round(rect.h))}
        priority
        unoptimized
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

function WebsitePreview({
  rect,
  href,
}: {
  rect: Rect;
  href: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        zIndex: 5,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(255,255,255,0.08)",
        background: "#000",
      }}
    >
      <iframe
        src={href}
        title="Taedal live website preview"
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          pointerEvents: "none",
          background: "#000",
        }}
      />

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Taedal website"
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          cursor: "pointer",
          background: "transparent",
        }}
      />
    </div>
  );
}

function ArrowHotspot({
  rect,
  href,
}: {
  rect: Rect & { src: string; alt: string };
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open Taedal website"
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        display: "block",
        zIndex: 8,
        cursor: "pointer",
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
  );
}

function VideoBlock({
  rect,
  src,
}: {
  rect: Rect;
  src: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        zIndex: 5,
        overflow: "hidden",
        borderRadius: 8,
        boxShadow: "0 0 42px rgba(255,255,255,0.18)",
        background: "#000",
      }}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          background: "#000",
        }}
      />
    </div>
  );
}

export default function TaedalFindOutMoreFrame({
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
              aria-label="Close Taedal Find Out More"
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

            <WebsitePreview rect={WEBSITE_PREVIEW} href={TAEDAL_URL} />
            <ArrowHotspot rect={ARROW_TO_WEBSITE} href={TAEDAL_URL} />

            <AbsImage rect={TAEDAL_LOGO_TITLE} priority zIndex={5} />
            <AbsImage rect={TAEDAL_BACKGROUND} priority zIndex={5} />
            <AbsImage rect={TAEDAL_WHY_EXIST} priority zIndex={5} />
            <AbsImage rect={TAEDAL_DIFFERENT} priority zIndex={5} />
            <AbsImage rect={TAEDAL_MY_ROLE} priority zIndex={5} />
            <AbsImage rect={TAEDAL_DESIGN_EXP} priority zIndex={5} />

            <VideoBlock
              rect={FIRST_VIDEO}
              src="/assets/taedal-deck/find_out_more/first_video.mp4"
            />

            <AbsImage rect={TAEDAL_GIVING_FACE} priority zIndex={5} />

            <GifBlock
              rect={KURO_WAVING}
              src="/assets/taedal-deck/find_out_more/kuro_waving.gif"
              alt="Kuro waving"
              zIndex={5}
            />

            <AbsImage rect={KURO_DESCRIPTION} priority zIndex={5} />
            <AbsImage rect={KURO_BLUEPRINT} priority zIndex={5} />
            <AbsImage rect={TAEDAL_WHERE_HEADING} priority zIndex={5} />
            <AbsImage rect={TAEDAL_LESSON_LEARNT} priority zIndex={5} />
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