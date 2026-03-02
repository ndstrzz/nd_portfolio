/// <reference types="next" />
/// <reference types="next/image-types/global" />

import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "rotation-per-second"?: string;
        "disable-zoom"?: boolean;
        "shadow-intensity"?: string;
        exposure?: string;
      };
    }
  }
}

export {};