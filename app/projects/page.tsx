// C:\Users\User\Downloads\andy_portfolio\app\projects\page.tsx
"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";


type Size = { w: number; h: number };
const DESIGN: Size = { w: 1920, h: 1080 };

const CONTENT_PAD_TOP = 140;

const NAV_POS = {
  ndLogo: { x: 36, y: 15, w: 357.24, h: 97 },
  nav: { x: 406, y: 55, h: 18, gap: 47 },
  navItem: { w: 44, h: 18 },
  topIcons: { x: 1669, y: 51, w: 31, h: 26, gap: 27 },
};

// From your screenshots (Frame 14)
const PROJ_POS = {
  header: { x: 192, y: 39, w: 812.35, h: 132 }, // project_icon_with_description.svg
  personalTitle: { x: 62, y: 200, w: 735.35, h: 37 }, // personal_project.svg

  taedalFolder: { x: 243, y: 237, w: 179, h: 167 }, // taedal_folder.svg

  internshipsTitle: { x: 2, y: 440, w: 735.35, h: 37 }, // internships.svg
  ocbcFolder: { x: 243, y: 469, w: 181, h: 167 }, // ocbc_folder.svg

  hackathonsTitle: { x: 32, y: 672, w: 735.35, h: 37 }, // hackathons.svg
  ideunFolder: { x: 243, y: 701, w: 179, h: 167 }, // ideun_folder.svg
  chinguFolder: { x: 458, y: 701, w: 179, h: 167 }, // chingu_folder.svg
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

/**
 * FolderButton
 * - keeps your hover glow/sweep
 * - if onClick is provided: prevents navigation + triggers overlay
 */
function FolderButton({
  href,
  ariaLabel,
  src,
  alt,
  x,
  y,
  w,
  h,
  priority,
  onClick,
}: {
  href: string;
  ariaLabel: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  priority?: boolean;
  onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        display: "block",
        textDecoration: "none",
        cursor: "pointer",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        transform: hover ? "translateY(-8px)" : "translateY(0px)",
        transition: "transform 220ms cubic-bezier(0.2, 0.9, 0.2, 1)",
      }}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div style={{ position: "absolute", inset: 0 }}>
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
            animation: hover ? "edgeFlicker 1.05s infinite" : "none",
            willChange: "filter",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: hover ? 1 : 0,
          transition: "opacity 180ms ease",
          WebkitMaskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          maskImage: `url(${src})`,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.28) 40%, rgba(255,255,255,0.00) 70%)",
          mixBlendMode: "screen",
          filter: "blur(2px)",
          animation: hover ? "edgeSweep 700ms infinite" : "none",
        }}
      />
    </a>
  );
}

/**
 * VideoCard
 * - autoplay (muted) when it appears (browser policy)
 * - when user clicks play, it UNMUTES and plays with sound
 * - center play/pause only shows on hover (or when paused)
 */
function VideoCard({
  src,
  autoPlay,
}: {
  src: string;
  autoPlay?: boolean;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [muted, setMuted] = React.useState(true);

  const playWithSound = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    setMuted(false);
    try {
      await v.play();
    } catch {}
  };

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      await playWithSound();
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.volume = 1;
  };

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !autoPlay) return;

    const t = window.setTimeout(async () => {
      try {
        v.muted = true;
        setMuted(true);
        await v.play();
      } catch {}
    }, 180);

    return () => window.clearTimeout(t);
  }, [autoPlay]);

  const showCenterBtn = ready && (hover || !playing);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        muted
        onCanPlay={() => setReady(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          cursor: "pointer",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: showCenterBtn ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.08)",
          transition: "background 180ms ease",
          pointerEvents: "none",
        }}
      />

      <button
        type="button"
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        style={{
          position: "absolute",
          right: 14,
          top: 14,
          width: 44,
          height: 44,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(0,0,0,0.35)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0px)" : "translateY(-6px)",
          transition: "opacity 160ms ease, transform 160ms ease",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: showCenterBtn
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.96)",
          width: 82,
          height: 82,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.22)",
          background: "rgba(0,0,0,0.42)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: showCenterBtn ? 1 : 0,
          transition: "opacity 160ms ease, transform 160ms ease",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 26,
            lineHeight: 1,
            transform: playing ? "translateX(0px)" : "translateX(1px)",
          }}
        >
          {playing ? "❚❚" : "▶"}
        </span>
      </button>
    </div>
  );
}

type FolderKey = "taedal" | "ocbc" | "ideun" | "chingu";

type FolderOverlayConfig = {
  key: FolderKey;
  folderSrc: string;
  from: { x: number; y: number; w: number; h: number };
  expanded: { w: number; h: number };
  dock: { x: number; y: number };
  panel: { w: number; h: number; gap: number; dy?: number };
};

const FIND_OUT_MORE_SRC = "/assets/taedal-deck/find_out_more.svg";

// ✅ Your requested video panel dimensions
const VIDEO_DIM = { w: 1380, h: 920 };

// ✅ Video source per folder (you can add ideun/chingu later)
const VIDEO_BY_FOLDER: Record<FolderKey, string> = {
  ocbc: "/assets/folder/ocbc/ideun_video.mp4",
  taedal: "/assets/folder/taedal/taedal_video.mp4",
  ideun: "/assets/folder/ideun/ideun_video.mp4",
  chingu: "/assets/folder/ideun/ideun_video.mp4", // placeholder for now
};

const FOLDERS: Record<FolderKey, FolderOverlayConfig> = {
  taedal: {
    key: "taedal",
    folderSrc: "/assets/taedal_folder.svg",
    from: PROJ_POS.taedalFolder,
    expanded: { w: 355, h: 328.4 },
    dock: { x: 70, y: -10 },
    panel: { w: VIDEO_DIM.w, h: VIDEO_DIM.h, gap: 42, dy: -10 },
  },
  ocbc: {
    key: "ocbc",
    folderSrc: "/assets/ocbc_folder.svg",
    from: PROJ_POS.ocbcFolder,
    expanded: { w: 355, h: 328.4 },
    dock: { x: 70, y: -10 },
    panel: { w: VIDEO_DIM.w, h: VIDEO_DIM.h, gap: 42, dy: -10 },
  },
  ideun: {
    key: "ideun",
    folderSrc: "/assets/ideun_folder.svg",
    from: PROJ_POS.ideunFolder,
    expanded: { w: 355, h: 328.4 },
    dock: { x: 70, y: -10 },
    panel: { w: VIDEO_DIM.w, h: VIDEO_DIM.h, gap: 42, dy: -10 },
  },
  chingu: {
    key: "chingu",
    folderSrc: "/assets/chingu_folder.svg",
    from: PROJ_POS.chinguFolder,
    expanded: { w: 355, h: 328.4 },
    dock: { x: 70, y: -10 },
    panel: { w: VIDEO_DIM.w, h: VIDEO_DIM.h, gap: 42, dy: -10 },
  },
};

function FolderOverlay({
  cfg,
  scale,
  onClose,
}: {
  cfg: FolderOverlayConfig;
  scale: number;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"from" | "center" | "dock">("from");
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("center"), 40);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const fromRect = {
    x: cfg.from.x,
    y: cfg.from.y + CONTENT_PAD_TOP,
    w: cfg.from.w,
    h: cfg.from.h,
  };

  const centerRect = {
    x: (DESIGN.w - cfg.expanded.w) / 2,
    y: (DESIGN.h - cfg.expanded.h) / 2 + 10,
    w: cfg.expanded.w,
    h: cfg.expanded.h,
  };

  const dockRect = {
    x: cfg.dock.x,
    y: cfg.dock.y + CONTENT_PAD_TOP,
    w: cfg.expanded.w,
    h: cfg.expanded.h,
  };

  const rect = phase === "from" ? fromRect : phase === "center" ? centerRect : dockRect;
  const panelTop = dockRect.y + (cfg.panel.dy ?? 0);

  const videoSrc = VIDEO_BY_FOLDER[cfg.key];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        animation: "folderOverlayIn 220ms ease-out both",
      }}
    >
      <style>{`
        @keyframes edgeFlicker {
          0%   { filter: drop-shadow(0 0 0px rgba(255,255,255,0.0))
                         drop-shadow(0 0 0px rgba(255,255,255,0.0))
                         brightness(1); }
          8%   { filter: drop-shadow(0 0 6px rgba(255,255,255,0.20))
                         drop-shadow(0 0 14px rgba(255,255,255,0.12))
                         brightness(1.04); }
          14%  { filter: drop-shadow(0 0 2px rgba(255,255,255,0.08))
                         drop-shadow(0 0 8px rgba(255,255,255,0.06))
                         brightness(1.01); }
          22%  { filter: drop-shadow(0 0 9px rgba(255,255,255,0.26))
                         drop-shadow(0 0 22px rgba(255,255,255,0.14))
                         brightness(1.06); }
          38%  { filter: drop-shadow(0 0 3px rgba(255,255,255,0.10))
                         drop-shadow(0 0 10px rgba(255,255,255,0.08))
                         brightness(1.02); }
          55%  { filter: drop-shadow(0 0 10px rgba(255,255,255,0.30))
                         drop-shadow(0 0 26px rgba(255,255,255,0.16))
                         brightness(1.07); }
          70%  { filter: drop-shadow(0 0 4px rgba(255,255,255,0.12))
                         drop-shadow(0 0 12px rgba(255,255,255,0.09))
                         brightness(1.03); }
          100% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.22))
                         drop-shadow(0 0 18px rgba(255,255,255,0.12))
                         brightness(1.05); }
        }

        @keyframes edgeSweep {
          0%   { opacity: 0.0; transform: translateX(-18px) translateY(8px) rotate(-8deg); }
          35%  { opacity: 0.55; }
          55%  { opacity: 0.18; }
          100% { opacity: 0.0; transform: translateX(18px) translateY(-8px) rotate(-8deg); }
        }

        @keyframes folderOverlayIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>

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
        {/* Animated folder */}
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
              window.setTimeout(() => setShowPanel(true), 160);
            }
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />
          <Image
            src={cfg.folderSrc}
            alt={`${cfg.key} folder enlarged`}
            width={Math.round(rect.w)}
            height={Math.round(rect.h)}
            priority
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close folder popup"
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

        {/* Right-side panel */}
        <div
          style={{
            position: "absolute",
            left: dockRect.x + dockRect.w + cfg.panel.gap,
            top: panelTop,
            width: cfg.panel.w,
            height: cfg.panel.h,
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ flex: 1 }}>
              <VideoCard src={videoSrc} autoPlay />
            </div>

            <button
              type="button"
              aria-label="Find out more"
              onClick={() => {
                // later:
                // window.location.href = `/projects/${cfg.key}`;
              }}
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
                src={FIND_OUT_MORE_SRC}
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

export default function ProjectsPage() {
  const { stageRef, scale } = useFitScale(DESIGN);
  const [openKey, setOpenKey] = useState<FolderKey | null>(null);

  // Load model-viewer once
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

  const cfg = openKey ? FOLDERS[openKey] : null;

  return (
    <main
      ref={stageRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000000",
        margin: 0,
        padding: 0,
        position: "relative",
      }}
    >
      {/* Overlay */}
      {cfg && <FolderOverlay cfg={cfg} scale={scale} onClose={() => setOpenKey(null)} />}

      {/* Keyframes for hover effects */}
      <style>{`
        @keyframes edgeFlicker {
          0%   { filter: drop-shadow(0 0 0px rgba(255,255,255,0.0))
                         drop-shadow(0 0 0px rgba(255,255,255,0.0))
                         brightness(1); }
          8%   { filter: drop-shadow(0 0 6px rgba(255,255,255,0.20))
                         drop-shadow(0 0 14px rgba(255,255,255,0.12))
                         brightness(1.04); }
          14%  { filter: drop-shadow(0 0 2px rgba(255,255,255,0.08))
                         drop-shadow(0 0 8px rgba(255,255,255,0.06))
                         brightness(1.01); }
          22%  { filter: drop-shadow(0 0 9px rgba(255,255,255,0.26))
                         drop-shadow(0 0 22px rgba(255,255,255,0.14))
                         brightness(1.06); }
          38%  { filter: drop-shadow(0 0 3px rgba(255,255,255,0.10))
                         drop-shadow(0 0 10px rgba(255,255,255,0.08))
                         brightness(1.02); }
          55%  { filter: drop-shadow(0 0 10px rgba(255,255,255,0.30))
                         drop-shadow(0 0 26px rgba(255,255,255,0.16))
                         brightness(1.07); }
          70%  { filter: drop-shadow(0 0 4px rgba(255,255,255,0.12))
                         drop-shadow(0 0 12px rgba(255,255,255,0.09))
                         brightness(1.03); }
          100% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.22))
                         drop-shadow(0 0 18px rgba(255,255,255,0.12))
                         brightness(1.05); }
        }

        @keyframes edgeSweep {
          0%   { opacity: 0.0; transform: translateX(-18px) translateY(8px) rotate(-8deg); }
          35%  { opacity: 0.55; }
          55%  { opacity: 0.18; }
          100% { opacity: 0.0; transform: translateX(18px) translateY(-8px) rotate(-8deg); }
        }
      `}</style>

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
          height: 120,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "relative", width: DESIGN.w, height: 120 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,1)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                      priority={item.alt === "Projects"}
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

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            width: DESIGN.w,
            height: DESIGN.h,
            paddingTop: CONTENT_PAD_TOP,
          }}
        >
          <div style={{ position: "relative", width: DESIGN.w, height: DESIGN.h }}>
            <Asset
              src="/assets/project_icon_with_description.svg"
              alt="Projects header"
              x={PROJ_POS.header.x}
              y={PROJ_POS.header.y}
              w={PROJ_POS.header.w}
              h={PROJ_POS.header.h}
              priority
            />

            <Asset
              src="/assets/personal_project.svg"
              alt="Personal Projects"
              x={PROJ_POS.personalTitle.x}
              y={PROJ_POS.personalTitle.y}
              w={PROJ_POS.personalTitle.w}
              h={PROJ_POS.personalTitle.h}
              priority
            />

            <FolderButton
              href="/projects/taedal"
              ariaLabel="Open Taedal project"
              src="/assets/taedal_folder.svg"
              alt="Taedal folder"
              x={PROJ_POS.taedalFolder.x}
              y={PROJ_POS.taedalFolder.y}
              w={PROJ_POS.taedalFolder.w}
              h={PROJ_POS.taedalFolder.h}
              priority
              onClick={() => setOpenKey("taedal")}
            />

            <Asset
              src="/assets/internships.svg"
              alt="Internships"
              x={PROJ_POS.internshipsTitle.x}
              y={PROJ_POS.internshipsTitle.y}
              w={PROJ_POS.internshipsTitle.w}
              h={PROJ_POS.internshipsTitle.h}
              priority
            />

            <FolderButton
              href="/projects/ocbc"
              ariaLabel="Open OCBC project"
              src="/assets/ocbc_folder.svg"
              alt="OCBC folder"
              x={PROJ_POS.ocbcFolder.x}
              y={PROJ_POS.ocbcFolder.y}
              w={PROJ_POS.ocbcFolder.w}
              h={PROJ_POS.ocbcFolder.h}
              priority
              onClick={() => setOpenKey("ocbc")}
            />

            <Asset
              src="/assets/hackathons.svg"
              alt="Hackathons"
              x={PROJ_POS.hackathonsTitle.x}
              y={PROJ_POS.hackathonsTitle.y}
              w={PROJ_POS.hackathonsTitle.w}
              h={PROJ_POS.hackathonsTitle.h}
              priority
            />

            <FolderButton
              href="/projects/ideun"
              ariaLabel="Open Ideun project"
              src="/assets/ideun_folder.svg"
              alt="Ideun folder"
              x={PROJ_POS.ideunFolder.x}
              y={PROJ_POS.ideunFolder.y}
              w={PROJ_POS.ideunFolder.w}
              h={PROJ_POS.ideunFolder.h}
              priority
              onClick={() => setOpenKey("ideun")}
            />

            <FolderButton
              href="/projects/chingu"
              ariaLabel="Open Chingu project"
              src="/assets/chingu_folder.svg"
              alt="Chingu folder"
              x={PROJ_POS.chinguFolder.x}
              y={PROJ_POS.chinguFolder.y}
              w={PROJ_POS.chinguFolder.w}
              h={PROJ_POS.chinguFolder.h}
              priority
              onClick={() => setOpenKey("chingu")}
            />
          </div>
        </div>
      </div>
    </main>
  );
}