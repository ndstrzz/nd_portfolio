// C:\Users\User\Downloads\andy_portfolio\app\about\page.tsx
"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Size = { w: number; h: number };
const DESIGN: Size = { w: 1920, h: 1080 };

// NAV positions (same as homepage)
const NAV_POS = {
  ndLogo: { x: 36, y: 15, w: 357.24, h: 97 },
  nav: { x: 406, y: 55, h: 18, gap: 47 },
  navItem: { w: 44, h: 18 },
  topIcons: { x: 1669, y: 51, w: 31, h: 26, gap: 27 },
};

// ABOUT positions
const ABOUT_POS = {
  aboutIcon: { x: 200, y: 233, w: 46, h: 46 },
  aboutTitle: { x: 266, y: 229, w: 231, h: 55 },
  aboutDesc: { x: 266, y: 297.53, w: 735.35, h: 132 },
};

// HARD SKILLS positions
const HARD_POS = {
  header: { x: 266, y: 471, w: 735.35, h: 73.53 }, // hard_skills_with_description.svg
  list: { x: 266, y: 567 },
  bullet: { w: 26, h: 26 },
  fontSize: 20,
  color: "#AAAAAA",
  gapBulletToText: 15,
  rowGap: 17,
  colGap12: 35,
  colGap23: 40,
  colW: 155,
  colH: 284,
};

// SOFT SKILLS positions
const SOFT_POS = {
  header: { x: 1063, y: 471, w: 735.35, h: 73.53 }, // soft_skill_with_description.svg
  leftList: { x: 1063, y: 567, w: 302, h: 328 },
  rightList: { x: 1063 + 302 + 66, y: 567, w: 302, h: 328 }, // gap 66
  bullet: { w: 27, h: 27 }, // soft_skill_bullet.svg
  line: { x: 1077, y: 616, w: 3, h: 142 }, // line_vertical.svg
  gapBulletToText: 14,
  rowGap: 20,
  fontSize: 20,
  color: "#AAAAAA",
};

// KURO on About page
const KURO_ABOUT = { x: -464, y: 370, w: 600, h: 900 };

const COLORS = {
  accent1: "#09EFD6",
  accent2: "#1FAC94",
  gray: "#AAAAAA",
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

function BulletRow({
  label,
  bulletSrc,
  bulletW,
  bulletH,
  gap,
  fontSize,
  color,
}: {
  label: string;
  bulletSrc: string;
  bulletW: number;
  bulletH: number;
  gap: number;
  fontSize: number;
  color: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap, height: bulletH }}>
      <Image
        src={bulletSrc}
        alt="bullet"
        width={bulletW}
        height={bulletH}
        style={{ width: bulletW, height: bulletH, objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily: "THICCCBOI, system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontWeight: 800,
          fontSize,
          color,
          lineHeight: `${bulletH}px`,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Same styling but without bullet
function TextRow({
  label,
  fontSize,
  color,
  height,
}: {
  label: string;
  fontSize: number;
  color: string;
  height: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", height }}>
      <span
        style={{
          fontFamily: "THICCCBOI, system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontWeight: 800,
          fontSize,
          color,
          lineHeight: `${height}px`,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
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

  const hardCol1 = ["Python", "React.js", "Javascript", "Typescript", "Solidity", "HTML + CSS", "Dart"];
  const hardCol2 = ["Tailwind CSS", "Blender", "Framer Option", "Adobe Illustrator", "Adobe Photoshop", "Figma", "Powerpoint"];
  const hardCol3 = ["Procreate", "Electron", "ExpoGo", "Sepolia testnet", "AWS", "Docker", "Kubernetes"];

  // Soft skills
  const softRight = [
    "Commitment to Excellence",
    "Self-Directed Initiative",
    "Relentless Work Ethic",
    "High Ambition & Drive",
    "Resilient Learner",
    "Active Listener",
    "Open-Minded Perspective",
    "Meticulous Attention to Detail",
  ];

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
          {/* BACK */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
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

          {/* FRONT */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            {/* ✅ Kuro waving gif */}
            <img
              src="/assets/kuro_waving.gif"
              alt="Kuro waving"
              style={{
                position: "absolute",
                left: KURO_ABOUT.x,
                top: KURO_ABOUT.y,
                width: KURO_ABOUT.w,
                height: KURO_ABOUT.h,
                objectFit: "contain",
                zIndex: 5,
                pointerEvents: "none",
              }}
            />

            {/* Navbar */}
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
                      priority={item.alt === "About"}
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

            {/* About */}
            <Asset
              src="/assets/about_me_icon.svg"
              alt="About icon"
              x={ABOUT_POS.aboutIcon.x}
              y={ABOUT_POS.aboutIcon.y}
              w={ABOUT_POS.aboutIcon.w}
              h={ABOUT_POS.aboutIcon.h}
              priority
            />
            <Asset
              src="/assets/about_me.svg"
              alt="About title"
              x={ABOUT_POS.aboutTitle.x}
              y={ABOUT_POS.aboutTitle.y}
              w={ABOUT_POS.aboutTitle.w}
              h={ABOUT_POS.aboutTitle.h}
              priority
            />

            <div
              style={{
                position: "absolute",
                left: ABOUT_POS.aboutDesc.x,
                top: ABOUT_POS.aboutDesc.y,
                width: ABOUT_POS.aboutDesc.w,
                height: ABOUT_POS.aboutDesc.h,
                fontFamily: "THICCCBOI, system-ui, -apple-system, Segoe UI, Roboto, Arial",
                fontWeight: 800,
                color: COLORS.gray,
                fontSize: 19.49,
                lineHeight: "1.25",
                whiteSpace: "pre-wrap",
              }}
            >
              <span>I am currently a Founder of </span>
              <span style={{ color: COLORS.accent1 }}>Taedal</span>
              <span>
                {" "}
                where I designed and built this Blockchain art provenance website all on my own from scratch within 3 months. Previously, I was at{" "}
              </span>
              <span style={{ color: COLORS.accent1 }}>OCBC</span>
              <span>
                {" "}
                as a UI/UX Designer which i manage to get selected from participating in an{" "}
              </span>
              <span style={{ color: COLORS.accent2 }}>OCBC Ignite Hackathon</span>
              <span>
                {" "}
                competing with 168 students. At the same time, I am participating in multiple upcoming Hackathon to expand my creativity and innovation cells while waiting for my enlistment.
              </span>
            </div>

            {/* Hard skills header */}
            <Asset
              src="/assets/hard_skills_with_description.svg"
              alt="Hard skills header"
              x={HARD_POS.header.x}
              y={HARD_POS.header.y}
              w={HARD_POS.header.w}
              h={HARD_POS.header.h}
              priority
            />

            {/* Hard skills columns */}
            <div style={{ position: "absolute", left: HARD_POS.list.x, top: HARD_POS.list.y, display: "flex", alignItems: "flex-start" }}>
              <div style={{ width: HARD_POS.colW, height: HARD_POS.colH, display: "flex", flexDirection: "column", gap: HARD_POS.rowGap }}>
                {hardCol1.map((t) => (
                  <BulletRow
                    key={t}
                    label={t}
                    bulletSrc="/assets/hard_skill_bullet.svg"
                    bulletW={HARD_POS.bullet.w}
                    bulletH={HARD_POS.bullet.h}
                    gap={HARD_POS.gapBulletToText}
                    fontSize={HARD_POS.fontSize}
                    color={HARD_POS.color}
                  />
                ))}
              </div>

              <div style={{ width: HARD_POS.colGap12 }} />

              <div style={{ width: HARD_POS.colW, height: HARD_POS.colH, display: "flex", flexDirection: "column", gap: HARD_POS.rowGap }}>
                {hardCol2.map((t) => (
                  <BulletRow
                    key={t}
                    label={t}
                    bulletSrc="/assets/hard_skill_bullet.svg"
                    bulletW={HARD_POS.bullet.w}
                    bulletH={HARD_POS.bullet.h}
                    gap={HARD_POS.gapBulletToText}
                    fontSize={HARD_POS.fontSize}
                    color={HARD_POS.color}
                  />
                ))}
              </div>

              <div style={{ width: HARD_POS.colGap23 }} />

              <div style={{ width: HARD_POS.colW, height: HARD_POS.colH, display: "flex", flexDirection: "column", gap: HARD_POS.rowGap }}>
                {hardCol3.map((t) => (
                  <BulletRow
                    key={t}
                    label={t}
                    bulletSrc="/assets/hard_skill_bullet.svg"
                    bulletW={HARD_POS.bullet.w}
                    bulletH={HARD_POS.bullet.h}
                    gap={HARD_POS.gapBulletToText}
                    fontSize={HARD_POS.fontSize}
                    color={HARD_POS.color}
                  />
                ))}
              </div>
            </div>

            {/* Soft skills header */}
            <Asset
              src="/assets/soft_skill_with_description.svg"
              alt="Soft skills header"
              x={SOFT_POS.header.x}
              y={SOFT_POS.header.y}
              w={SOFT_POS.header.w}
              h={SOFT_POS.header.h}
              priority
            />

            {/* Soft skills left column (languages = NO bullets) */}
            <div
              style={{
                position: "absolute",
                left: SOFT_POS.leftList.x,
                top: SOFT_POS.leftList.y,
                width: SOFT_POS.leftList.w,
                height: SOFT_POS.leftList.h,
                display: "flex",
                flexDirection: "column",
                gap: SOFT_POS.rowGap,
              }}
            >
              <BulletRow
                label="Multilingual"
                bulletSrc="/assets/soft_skill_bullet.svg"
                bulletW={SOFT_POS.bullet.w}
                bulletH={SOFT_POS.bullet.h}
                gap={SOFT_POS.gapBulletToText}
                fontSize={SOFT_POS.fontSize}
                color={SOFT_POS.color}
              />

              <div style={{ paddingLeft: SOFT_POS.bullet.w + SOFT_POS.gapBulletToText }}>
                <div style={{ display: "flex", flexDirection: "column", gap: SOFT_POS.rowGap }}>
                  {["English", "Chinese", "Bahasa Indonesia", "Korean"].map((t) => (
                    <TextRow key={t} label={t} fontSize={SOFT_POS.fontSize} color={SOFT_POS.color} height={SOFT_POS.bullet.h} />
                  ))}
                </div>
              </div>

              {["Global Adaptability", "High-Pressure Performance", "Strategic & Detail-Oriented"].map((t) => (
                <BulletRow
                  key={t}
                  label={t}
                  bulletSrc="/assets/soft_skill_bullet.svg"
                  bulletW={SOFT_POS.bullet.w}
                  bulletH={SOFT_POS.bullet.h}
                  gap={SOFT_POS.gapBulletToText}
                  fontSize={SOFT_POS.fontSize}
                  color={SOFT_POS.color}
                />
              ))}
            </div>

            {/* Vertical line */}
            <Asset
              src="/assets/line_vertical.svg"
              alt="Vertical line"
              x={SOFT_POS.line.x}
              y={SOFT_POS.line.y}
              w={SOFT_POS.line.w}
              h={SOFT_POS.line.h}
              priority
            />

            {/* Soft skills right column */}
            <div
              style={{
                position: "absolute",
                left: SOFT_POS.rightList.x,
                top: SOFT_POS.rightList.y,
                width: SOFT_POS.rightList.w,
                height: SOFT_POS.rightList.h,
                display: "flex",
                flexDirection: "column",
                gap: SOFT_POS.rowGap,
              }}
            >
              {softRight.map((t) => (
                <BulletRow
                  key={t}
                  label={t}
                  bulletSrc="/assets/soft_skill_bullet.svg"
                  bulletW={SOFT_POS.bullet.w}
                  bulletH={SOFT_POS.bullet.h}
                  gap={SOFT_POS.gapBulletToText}
                  fontSize={SOFT_POS.fontSize}
                  color={SOFT_POS.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}