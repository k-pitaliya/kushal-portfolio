"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import AuroraShader from "./AuroraShader";
import dynamic from "next/dynamic";

function SceneContent() {
  const [isMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches
      : false
  );
  const [prefersReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  if (prefersReduced) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ fov: 75, position: [0, 0, 5], near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%", position: "absolute" }}
      frameloop="always"
    >
      {!isMobile && <AuroraShader />}
      <ParticleField count={isMobile ? 600 : 2000} />
    </Canvas>
  );
}

const Scene = dynamic(() => Promise.resolve(SceneContent), { ssr: false });

export default Scene;
