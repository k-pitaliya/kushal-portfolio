"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DEFAULT_COUNT = 2500;
const SPHERE_RADIUS = 3;

export default function ParticleField({ count = DEFAULT_COUNT }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Track pointer in normalized device coordinates via passive listener
  useFrame(() => {}); // ensure hook order
  useMemo(() => {}, []); // placeholder for hook order

  const onPointerMove = useMemo(() => {
    return (e: { clientX: number; clientY: number }) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
  }, []);

  // Use useEffect (not useMemo) for side effects
  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  const [particleData] = useState(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a spherical cloud
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPHERE_RADIUS * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      sizes[i] = 0.02 + Math.random() * 0.02;
      opacities[i] = 0.2 + Math.random() * 0.6;
    }

    return { positions, basePositions, sizes, opacities };
  });

  const { positions, basePositions, sizes, opacities } = particleData;

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const positionAttr = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;
    const time = clock.getElapsedTime();

    // Convert mouse to world-space approximate
    const mouseX = mouse.current.x * (viewport.width / 2);
    const mouseY = mouse.current.y * (viewport.height / 2);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // Floating drift
      const driftX = Math.sin(time * 0.3 + i * 0.01) * 0.05;
      const driftY = Math.cos(time * 0.2 + i * 0.015) * 0.05;
      const driftZ = Math.sin(time * 0.25 + i * 0.02) * 0.03;

      // Mouse repulsion
      const dx = bx + driftX - mouseX;
      const dy = by + driftY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsionRadius = 1.5;
      let repX = 0;
      let repY = 0;

      if (dist < repulsionRadius && dist > 0.01) {
        const force = (1 - dist / repulsionRadius) * 0.8;
        repX = (dx / dist) * force;
        repY = (dy / dist) * force;
      }

      posArray[i3] = bx + driftX + repX;
      posArray[i3 + 1] = by + driftY + repY;
      posArray[i3 + 2] = bz + driftZ;
    }

    positionAttr.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          args={[opacities, 1]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float aSize;
          attribute float aOpacity;
          varying float vOpacity;
          void main() {
            vOpacity = aOpacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vOpacity;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
            gl_FragColor = vec4(0.0, 0.749, 1.0, alpha);
          }
        `}
      />
    </points>
  );
}
