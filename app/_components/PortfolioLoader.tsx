"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type PortfolioLoaderProps = {
  maxDurationMs?: number;
  onDone?: () => void;
};

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = document.createElement("img");
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadVideo(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    const done = () => {
      video.onloadeddata = null;
      video.onerror = null;
      resolve();
    };

    video.preload = "metadata";
    video.onloadeddata = done;
    video.onerror = done;
    video.src = src;
  });
}

function preloadModelViewerScript() {
  return new Promise<void>((resolve) => {
    const id = "model-viewer-script";

    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

function preloadGLB(src: string) {
  return fetch(src, { cache: "force-cache" })
    .then(() => {})
    .catch(() => {});
}

export default function PortfolioLoader({
  maxDurationMs = 10000,
  onDone,
}: PortfolioLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "fadeOut">("loading");

  const assets = useMemo(
    () => [
      "/assets/ND_Logo.svg",
      "/assets/Home.svg",
      "/assets/About.svg",
      "/assets/Experience.svg",
      "/assets/Projects.svg",
      "/assets/namecard.svg",
      "/assets/SIM WEI BIN ANDY.svg",
      "/assets/say_hi_button.svg",
      "/assets/kuro_waving.gif",
      "/assets/project_icon_with_description.svg",
      "/assets/personal_project.svg",
      "/assets/internships.svg",
      "/assets/hackathons.svg",
      "/assets/taedal_folder.svg",
      "/assets/ocbc_folder.svg",
      "/assets/ideun_folder.svg",
      "/assets/chingu_folder.svg",
      "/assets/about_me_icon.svg",
      "/assets/about_me.svg",
      "/assets/hard_skills_with_description.svg",
      "/assets/soft_skill_with_description.svg",
      "/assets/experience_icon.svg",
      "/assets/experience_with_description.svg",
      "/assets/taedal_deck.svg",
      "/assets/ocbc_deck.svg",
      "/assets/aucto_deck.svg",
      "/assets/uniqlo_deck.svg",
      "/assets/ait_deck.svg",
      "/assets/activ_deck.svg",
    ],
    []
  );

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      const tasks: Array<Promise<void>> = [
        preloadModelViewerScript(),
        preloadGLB("/assets/taedal-coin.glb"),
        preloadVideo("/assets/folder/taedal/taedal_video.mov"),
        preloadVideo("/assets/folder/ideun/ideun_video.mp4"),
      ];

      const total = assets.length + tasks.length;
      let doneCount = 0;

      const tick = () => {
        doneCount += 1;
        if (!mounted) return;
        setProgress(Math.min(95, Math.round((doneCount / total) * 95)));
      };

      const wrappedImageTasks = assets.map((src) =>
        preloadImage(src).then(tick).catch(tick)
      );

      const wrappedOtherTasks = tasks.map((p) =>
        p.then(tick).catch(tick)
      );

      const allPreloads = Promise.all([...wrappedImageTasks, ...wrappedOtherTasks]);

      const timeoutCap = new Promise<void>((resolve) => {
        window.setTimeout(resolve, maxDurationMs);
      });

      await Promise.race([allPreloads, timeoutCap]);

      if (!mounted) return;

      setProgress(100);
      setPhase("fadeOut");

      window.setTimeout(() => {
        if (mounted) onDone?.();
      }, 550);
    };

    run();

    return () => {
      mounted = false;
    };
  }, [assets, maxDurationMs, onDone]);

  return (
    <div
      aria-label="Loading portfolio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "fadeOut" ? 0 : 1,
        transition: "opacity 520ms ease",
        pointerEvents: "auto",
      }}
    >
      <style>{`
        @keyframes loaderPulse {
          0% { transform: scale(1); opacity: 0.88; }
          50% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 0.88; }
        }

        @keyframes loaderSweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }

        @keyframes dotsBlink {
          0%, 20% { opacity: 0.25; }
          50% { opacity: 1; }
          100% { opacity: 0.25; }
        }
      `}</style>

      <div
        style={{
          width: 520,
          maxWidth: "88vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 240,
            height: 70,
            animation: "loaderPulse 1.8s ease-in-out infinite",
          }}
        >
          <Image
            src="/assets/ND_Logo.svg"
            alt="ND Logo"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: 150,
            height: 150,
            borderRadius: "999px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.10)",
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(255,255,255,0.01) 65%, rgba(255,255,255,0) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
            }}
          >
            <model-viewer
              src="/assets/taedal-coin.glb"
              auto-rotate
              rotation-per-second="24deg"
              disable-zoom
              camera-controls={false}
              shadow-intensity="0"
              exposure="1"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />
          </div>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.9)",
            fontFamily: "THICCCBOI, system-ui, -apple-system, Segoe UI, Roboto, Arial",
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: 0.3,
          }}
        >
          Loading Portfolio
          <span style={{ animation: "dotsBlink 1s infinite", marginLeft: 2 }}>.</span>
          <span style={{ animation: "dotsBlink 1s infinite 0.2s", marginLeft: 2 }}>.</span>
          <span style={{ animation: "dotsBlink 1s infinite 0.4s", marginLeft: 2 }}>.</span>
        </div>

        <div
          style={{
            width: "100%",
            height: 10,
            borderRadius: 999,
            overflow: "hidden",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg, #09EFD6 0%, #1FAC94 100%)",
              transition: "width 240ms ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 50%, rgba(255,255,255,0) 100%)",
                animation: "loaderSweep 1.1s linear infinite",
              }}
            />
          </div>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.62)",
            fontFamily: "THICCCBOI, system-ui, -apple-system, Segoe UI, Roboto, Arial",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 0.2,
          }}
        >
          {progress}% loaded
        </div>
      </div>
    </div>
  );
}