// C:\Users\User\Downloads\andy_portfolio\app\projects\_components\IdeunFindOutMoreFrame.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Rect = { x: number; y: number; w: number; h: number };

const FRAME_W = 1920;
const FRAME_H = 9046;
const FRAME_SHIFT_Y = 0;

const HACK_AND_ROLL_LOGO: Rect & { src: string; alt: string } = {
  x: 663,
  y: 225,
  w: 595,
  h: 615,
  src: "/assets/folder/ideun/hack_and_roll_logo_with_organiser.svg",
  alt: "Hack and Roll logo with organiser",
};

const EVENT_VIDEO_EMBED =
  "https://www.youtube.com/embed/-YaCkY33S9E?autoplay=1&playsinline=1&rel=0";

const HACK_AND_ROLL_CTA: Rect = {
  x: 663,
  y: 855,
  w: 595,
  h: 28,
};

const PABO_ANGRY: Rect = {
  x: 1530,
  y: 263,
  w: 683,
  h: 594,
};

const HACKATHON_OVERVIEW: Rect & { src: string; alt: string } = {
  x: 385,
  y: 964,
  w: 1144.66,
  h: 163,
  src: "/assets/folder/ideun/hackathon_overview_with_description.svg",
  alt: "Hackathon overview with description",
};

const IDEUN_LOGO: Rect & { src: string; alt: string } = {
  x: 674,
  y: 1232,
  w: 571,
  h: 182.86,
  src: "/assets/folder/ideun/ideun_logo.svg",
  alt: "Ideun logo",
};

const PROJECT_OVERVIEW: Rect & { src: string; alt: string } = {
  x: 371,
  y: 1475,
  w: 1164,
  h: 178,
  src: "/assets/folder/ideun/project_overview_with_description.svg",
  alt: "Project overview with description",
};

const THE_PROBLEM: Rect & { src: string; alt: string } = {
  x: 371,
  y: 1713,
  w: 1164,
  h: 173,
  src: "/assets/folder/ideun/the_problem_with_description.svg",
  alt: "The problem with description",
};

const THE_PROJECT_EVOLVED: Rect & { src: string; alt: string } = {
  x: 368,
  y: 1946,
  w: 1170,
  h: 307.78,
  src: "/assets/folder/ideun/the_project_evolved_with_description.svg",
  alt: "The project evolved with description",
};

const PUSHING_BEYOND: Rect & { src: string; alt: string } = {
  x: 365,
  y: 2314,
  w: 1177,
  h: 376.5,
  src: "/assets/folder/ideun/pushing_beyond_with_description.svg",
  alt: "Pushing beyond with description",
};

const MY_ROLE: Rect & { src: string; alt: string } = {
  x: 366,
  y: 2751,
  w: 1174,
  h: 292,
  src: "/assets/folder/ideun/my_role_with_description.svg",
  alt: "My role with description",
};

const DESIGNING_THE_CHARACTER: Rect & { src: string; alt: string } = {
  x: 364,
  y: 3103,
  w: 1198,
  h: 1164,
  src: "/assets/folder/ideun/designing_the_character_with_description_with_image_sketch.svg",
  alt: "Designing the character with description and image sketch",
};

const ANGEL_STATE: Rect = {
  x: 440,
  y: 4327,
  w: 484,
  h: 352,
};

const ANGEL_DESCRIPTION: Rect & { src: string; alt: string } = {
  x: 1001,
  y: 4368,
  w: 637,
  h: 214,
  src: "/assets/folder/ideun/angel_description.svg",
  alt: "Angel description",
};

const PABO_DESCRIPTION: Rect & { src: string; alt: string } = {
  x: 479,
  y: 4892,
  w: 544,
  h: 270,
  src: "/assets/folder/ideun/pabo_description.svg",
  alt: "Pabo description",
};

const PABO_STATE: Rect = {
  x: 1069,
  y: 4739,
  w: 537,
  h: 481,
};

const YAONG_STATE: Rect = {
  x: 506,
  y: 5280,
  w: 393,
  h: 449,
};

const YAONG_DESCRIPTION: Rect & { src: string; alt: string } = {
  x: 984,
  y: 5369,
  w: 674,
  h: 214,
  src: "/assets/folder/ideun/yaong_description.svg",
  alt: "Yaong description",
};

const WORKING_UNDER_PRESSURE: Rect & { src: string; alt: string } = {
  x: 366.5,
  y: 5789,
  w: 1175.5,
  h: 268,
  src: "/assets/folder/ideun/working_under_pressure_with_description.svg",
  alt: "Working under pressure with description",
};

const PITCHING_THE_IDEA: Rect & { src: string; alt: string } = {
  x: 366,
  y: 6117,
  w: 1176,
  h: 550,
  src: "/assets/folder/ideun/pitching_the_deas_with_description_and_pictire.svg",
  alt: "Pitching the idea with description and picture",
};

const LESSON_LEARNT: Rect & { src: string; alt: string } = {
  x: 366,
  y: 6727,
  w: 1279,
  h: 1096,
  src: "/assets/folder/ideun/lesson_learnt_with_description_with_pictures.svg",
  alt: "Lesson learnt with description and pictures",
};

const FOOTER_BLOCK: Rect & { src: string; alt: string } = {
  x: 4,
  y: 8054,
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

function ClickToWatchBlock({
  rect,
  captionRect,
  src,
  alt,
  embedSrc,
  showVideo,
  onOpenVideo,
}: {
  rect: Rect & { src: string; alt: string };
  captionRect: Rect;
  src: string;
  alt: string;
  embedSrc: string;
  showVideo: boolean;
  onOpenVideo: () => void;
}) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: rect.x,
          top: rect.y,
          width: rect.w,
          height: rect.h,
          zIndex: 6,
          pointerEvents: "auto",
          borderRadius: 14,
          overflow: "hidden",
          background: "#000",
          boxShadow: showVideo ? "0 0 42px rgba(255,255,255,0.18)" : "none",
        }}
      >
        {showVideo ? (
          <iframe
            src={embedSrc}
            title="What happened during the event"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              background: "#000",
            }}
          />
        ) : (
          <button
            type="button"
            onClick={onOpenVideo}
            aria-label="Watch what happened during the event"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              display: "block",
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={Math.max(1, Math.round(rect.w))}
              height={Math.max(1, Math.round(rect.h))}
              priority
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 999,
                  background: "rgba(0,0,0,0.50)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: 28,
                    lineHeight: 1,
                    transform: "translateX(2px)",
                  }}
                >
                  ▶
                </span>
              </div>
            </div>
          </button>
        )}
      </div>

      {!showVideo ? (
        <button
          type="button"
          onClick={onOpenVideo}
          aria-label="Click the logo to watch what happened during the event"
          style={{
            position: "absolute",
            left: captionRect.x,
            top: captionRect.y,
            width: captionRect.w,
            height: captionRect.h,
            zIndex: 6,
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
            color: "rgba(255,255,255,0.82)",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 0.2,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Click the logo to watch what happened during the event
        </button>
      ) : null}
    </>
  );
}

export default function IdeunFindOutMoreFrame({
  open,
  topY,
  onClose,
}: {
  open: boolean;
  topY: number;
  onClose: () => void;
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showEventVideo, setShowEventVideo] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({ top: 0, behavior: "auto" });
    setShowBackToTop(false);
    setShowEventVideo(false);
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
              aria-label="Close Ideun Find Out More"
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

            <ClickToWatchBlock
              rect={HACK_AND_ROLL_LOGO}
              captionRect={HACK_AND_ROLL_CTA}
              src={HACK_AND_ROLL_LOGO.src}
              alt={HACK_AND_ROLL_LOGO.alt}
              embedSrc={EVENT_VIDEO_EMBED}
              showVideo={showEventVideo}
              onOpenVideo={() => setShowEventVideo(true)}
            />

            <GifBlock
              rect={PABO_ANGRY}
              src="/assets/folder/ideun/pabo_angry.gif"
              alt="Pabo angry"
              zIndex={5}
            />

            <AbsImage rect={HACKATHON_OVERVIEW} priority zIndex={5} />
            <AbsImage rect={IDEUN_LOGO} priority zIndex={5} />
            <AbsImage rect={PROJECT_OVERVIEW} priority zIndex={5} />
            <AbsImage rect={THE_PROBLEM} priority zIndex={5} />
            <AbsImage rect={THE_PROJECT_EVOLVED} priority zIndex={5} />
            <AbsImage rect={PUSHING_BEYOND} priority zIndex={5} />
            <AbsImage rect={MY_ROLE} priority zIndex={5} />
            <AbsImage rect={DESIGNING_THE_CHARACTER} priority zIndex={5} />

            <GifBlock
              rect={ANGEL_STATE}
              src="/assets/folder/ideun/angel_state.gif"
              alt="Angel state"
              zIndex={5}
            />
            <AbsImage rect={ANGEL_DESCRIPTION} priority zIndex={5} />

            <AbsImage rect={PABO_DESCRIPTION} priority zIndex={5} />
            <GifBlock
              rect={PABO_STATE}
              src="/assets/folder/ideun/pabo_state.gif"
              alt="Pabo state"
              zIndex={5}
            />

            <GifBlock
              rect={YAONG_STATE}
              src="/assets/folder/ideun/yaong_state.gif"
              alt="Yaong state"
              zIndex={5}
            />
            <AbsImage rect={YAONG_DESCRIPTION} priority zIndex={5} />

            <AbsImage rect={WORKING_UNDER_PRESSURE} priority zIndex={5} />
            <AbsImage rect={PITCHING_THE_IDEA} priority zIndex={5} />
            <AbsImage rect={LESSON_LEARNT} priority zIndex={5} />
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