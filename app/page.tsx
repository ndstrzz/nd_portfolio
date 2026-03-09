// C:\Users\User\Downloads\andy_portfolio\app\page.tsx
"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

type Size = { w: number; h: number };
const DESIGN: Size = { w: 1920, h: 1080 };

const POS = {
  ndLogo: { x: 36, y: 15, w: 357.24, h: 97 },

  // ✅ exact per-item navbar positions from your Figma
  navItems: {
    home: { x: 406, y: 55, w: 44, h: 18 },
    about: { x: 497, y: 55, w: 46, h: 18 },
    experience: { x: 593, y: 55, w: 82, h: 18 },
    projects: { x: 722, y: 55, w: 60, h: 18 },
  },

  topIcons: { x: 1669, y: 51, w: 31, h: 26, gap: 27 },
  namecard: { x: 205, y: 224.65, w: 407.36, h: 638.35 },
  heroText: { x: 719.65, y: 261, w: 735.35, h: 387.06 },
  sayHi: { x: 720, y: 680, w: 299, h: 65 },
  kuro: { x: 1455, y: 371, w: 600, h: 900 },
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

function IconButton({
  href,
  ariaLabel,
  children,
  newTab,
}: {
  href: string;
  ariaLabel: string;
  children: ReactNode;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
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

export default function Page() {
  const { stageRef, scale } = useFitScale(DESIGN);

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
        x: POS.navItems.home.x,
        y: POS.navItems.home.y,
        w: POS.navItems.home.w,
        h: POS.navItems.home.h,
      },
      {
        src: "/assets/About.svg",
        alt: "About",
        href: "/about",
        x: POS.navItems.about.x,
        y: POS.navItems.about.y,
        w: POS.navItems.about.w,
        h: POS.navItems.about.h,
      },
      {
        src: "/assets/Experience.svg",
        alt: "Experience",
        href: "/experience",
        x: POS.navItems.experience.x,
        y: POS.navItems.experience.y,
        w: POS.navItems.experience.w,
        h: POS.navItems.experience.h,
      },
      {
        src: "/assets/Projects.svg",
        alt: "Projects",
        href: "/projects",
        x: POS.navItems.projects.x,
        y: POS.navItems.projects.y,
        w: POS.navItems.projects.w,
        h: POS.navItems.projects.h,
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
        newTab: false,
      },
      {
        src: "/assets/linkedin_icon.svg",
        alt: "LinkedIn",
        href: "https://www.linkedin.com/in/andy-sim-61b261287/",
        newTab: true,
      },
      {
        src: "/assets/telegram_icon.svg",
        alt: "Telegram",
        href: "https://t.me/kombuchaddict",
        newTab: true,
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
        overflow: "hidden",
        background: "#000000",
        margin: 0,
        padding: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: DESIGN.w,
          height: DESIGN.h,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            background: "#000000",
          }}
        >
          {/* BACK LAYER */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 560,
                height: 560,
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
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                }}
              />
            </div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.65)",
              }}
            />
          </div>

          {/* FRONT LAYER */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
            <div
              style={{
                position: "absolute",
                left: POS.ndLogo.x,
                top: POS.ndLogo.y,
                width: POS.ndLogo.w,
                height: POS.ndLogo.h,
                userSelect: "none",
                zIndex: 10,
              }}
            >
              <IconButton href="/" ariaLabel="Home">
                <Image
                  src="/assets/ND_Logo.svg"
                  alt="ND Logo"
                  width={Math.round(POS.ndLogo.w)}
                  height={Math.round(POS.ndLogo.h)}
                  priority
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </IconButton>
            </div>

            {/* ✅ exact nav item positions */}
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
                    priority={item.alt === "Home"}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </IconButton>
              </div>
            ))}

            <div
              style={{
                position: "absolute",
                left: POS.topIcons.x,
                top: POS.topIcons.y,
                display: "flex",
                alignItems: "center",
                gap: POS.topIcons.gap,
              }}
            >
              {iconItems.map((item) => (
                <IconButton
                  key={item.alt}
                  href={item.href}
                  ariaLabel={item.alt}
                  newTab={item.newTab}
                >
                  <div style={{ width: POS.topIcons.w, height: POS.topIcons.h }}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={POS.topIcons.w}
                      height={POS.topIcons.h}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                </IconButton>
              ))}
            </div>

            <Asset
              src="/assets/namecard.svg"
              alt="Name Card"
              x={POS.namecard.x}
              y={POS.namecard.y}
              w={POS.namecard.w}
              h={POS.namecard.h}
              priority
            />

            <Asset
              src="/assets/SIM WEI BIN ANDY.svg"
              alt="Hero Title and Description"
              x={POS.heroText.x}
              y={POS.heroText.y}
              w={POS.heroText.w}
              h={POS.heroText.h}
              priority
            />

            <a
              href="mailto:andynilessim05@gmail.com"
              aria-label="Say hi"
              style={{
                position: "absolute",
                left: POS.sayHi.x,
                top: POS.sayHi.y,
                width: POS.sayHi.w,
                height: POS.sayHi.h,
                display: "block",
                cursor: "pointer",
                borderRadius: 12,
                transition: "transform 120ms ease, opacity 120ms ease",
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              <Image
                src="/assets/say_hi_button.svg"
                alt="Say hi button"
                width={POS.sayHi.w}
                height={POS.sayHi.h}
                priority
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </a>

            <Asset
              src="/assets/kuro_waving.gif"
              alt="Kuro waving"
              x={POS.kuro.x}
              y={POS.kuro.y}
              w={POS.kuro.w}
              h={POS.kuro.h}
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}