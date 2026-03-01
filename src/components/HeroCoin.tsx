"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function CoinModel() {
  const { scene } = useGLTF("/assets/taedal-coin.glb");
  return (
    <primitive
      object={scene}
      scale={1.25}
      rotation={[0.15, 0.6, 0]}
      position={[0, 0, 0]}
    />
  );
}

export default function HeroCoin() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Coin position/size from your earlier Figma: X 672, Y 251, W/H 577 */}
      <div className="absolute left-[672px] top-[251px] w-[577px] h-[577px]">
        <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <CoinModel />
            <Environment preset="studio" />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Black overlay on top of coin (approx 81%) */}
      <div className="absolute left-[672px] top-[251px] w-[577px] h-[577px] bg-black/80" />
    </div>
  );
}

useGLTF.preload("/assets/taedal-coin.glb");