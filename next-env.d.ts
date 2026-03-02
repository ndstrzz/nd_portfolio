/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export {};