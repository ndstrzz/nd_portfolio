"use client";

import { useEffect, useState } from "react";
import PortfolioLoader from "./PortfolioLoader";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("portfolio_loader_seen");
    if (alreadyLoaded === "1") {
      setShowLoader(false);
    }
  }, []);

  const handleDone = () => {
    sessionStorage.setItem("portfolio_loader_seen", "1");
    setShowLoader(false);
  };

  return (
    <>
      {showLoader ? <PortfolioLoader minDurationMs={1800} onDone={handleDone} /> : null}
      <div
        style={{
          opacity: showLoader ? 0 : 1,
          transition: "opacity 320ms ease",
        }}
      >
        {children}
      </div>
    </>
  );
}