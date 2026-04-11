"use client";

import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import dynamic from "next/dynamic";

function SceneContent() {
  return (
    <Canvas
      className="!absolute inset-0"
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ fov: 75, position: [0, 0, 5], near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%", position: "absolute" }}
    >
      <ParticleField />
    </Canvas>
  );
}

const Scene = dynamic(() => Promise.resolve(SceneContent), { ssr: false });

export default Scene;
