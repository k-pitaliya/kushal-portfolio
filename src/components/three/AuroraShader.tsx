"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Mouse influence
    vec2 mouseOffset = (uMouse - 0.5) * 0.15;
    uv += mouseOffset * 0.3;

    // Multiple noise layers for aurora bands
    float n1 = snoise(vec2(uv.x * 2.0 + t, uv.y * 1.5 - t * 0.5));
    float n2 = snoise(vec2(uv.x * 1.5 - t * 0.7, uv.y * 2.0 + t * 0.3));
    float n3 = snoise(vec2(uv.x * 3.0 + t * 0.4, uv.y * 0.8 - t * 0.6));

    // Aurora band shapes
    float band1 = smoothstep(0.0, 0.5, sin(uv.y * 3.14159 + n1 * 1.5 + t) * 0.5 + 0.5);
    float band2 = smoothstep(0.0, 0.6, sin(uv.y * 2.5 + n2 * 2.0 - t * 0.8) * 0.5 + 0.5);
    float band3 = smoothstep(0.0, 0.4, sin(uv.y * 4.0 + n3 * 1.0 + t * 0.5) * 0.5 + 0.5);

    // Colors
    vec3 accentBlue = vec3(0.0, 0.749, 1.0);   // #00BFFF
    vec3 purple     = vec3(0.482, 0.408, 0.933); // #7B68EE
    vec3 deepBlue   = vec3(0.102, 0.02, 0.2);    // #1a0533
    vec3 subtlePink = vec3(1.0, 0.42, 0.42);     // subtle pink

    vec3 col = deepBlue;
    col = mix(col, accentBlue, band1 * 0.35 * (0.5 + n1 * 0.5));
    col = mix(col, purple, band2 * 0.3 * (0.5 + n2 * 0.5));
    col = mix(col, subtlePink, band3 * 0.1 * (0.3 + n3 * 0.3));

    // Fade edges
    float edgeFade = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
    edgeFade *= smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);

    float alpha = edgeFade * 0.35;

    gl_FragColor = vec4(col, alpha);
  }
`;

export default function AuroraShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  // Track mouse for uniform — useEffect for proper cleanup
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uMouse.value.copy(mouse.current);
    mat.uniforms.uResolution.value.set(viewport.width, viewport.height);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
