"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute float aSpeed;
  attribute float aPhase;
  varying float vGlow;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * aSpeed * 0.42 + aPhase) * 0.42;
    p.x += cos(uTime * aSpeed * 0.31 + aPhase * 1.7) * 0.32;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (40.0 / -mv.z);
    vGlow = 0.28 + 0.72 * abs(sin(uTime * 0.5 * aSpeed + aPhase));
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float halo = pow(smoothstep(0.5, 0.02, d), 4.5);
    float core = smoothstep(0.16, 0.0, d);
    float a = clamp(halo * 0.55 + core, 0.0, 1.0);
    vec3 col = mix(uColorA, uColorB, vGlow);
    gl_FragColor = vec4(col, a * vGlow * uOpacity);
  }
`;

const RIBBON_VERT = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += sin(p.x * 0.55 + uTime * 0.22) * 0.85;
    p.z += cos(p.y * 0.9 - uTime * 0.16) * 0.35;
    p.y += sin(p.x * 0.3 + uTime * 0.12) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const RIBBON_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float edge = smoothstep(0.0, 0.42, vUv.y) * smoothstep(1.0, 0.58, vUv.y);
    float sweep = 0.5 + 0.5 * sin(vUv.x * 5.5 - uTime * 0.42);
    float fade = smoothstep(0.0, 0.28, vUv.x) * smoothstep(1.0, 0.72, vUv.x);
    float a = edge * fade * (0.05 + 0.14 * sweep);
    gl_FragColor = vec4(uColor, a);
  }
`;

/** Deterministic noise — the field is identical on every render and on
 *  the server, which keeps the geometry stable across React re-renders. */
function makeRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Layer({
  count,
  depth,
  spread,
  size,
  opacity,
  colorA,
  colorB,
  drift,
  seed,
}: {
  count: number;
  depth: number;
  spread: number;
  size: number;
  opacity: number;
  colorA: string;
  colorB: string;
  drift: number;
  seed: number;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const random = makeRandom(seed);
    const pos = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const speed = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // biased outward so the centre stays readable behind the type
      const r = Math.pow(random(), 0.62) * spread;
      const t = random() * Math.PI * 2;
      pos[i * 3] = Math.cos(t) * r * 1.55;
      pos[i * 3 + 1] = Math.sin(t) * r * 0.82;
      pos[i * 3 + 2] = depth + (random() - 0.5) * 2.2;
      scale[i] = 0.3 + random() * random() * 1.6;
      speed[i] = 0.35 + random() * 1.25;
      phase[i] = random() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    return g;
  }, [count, depth, spread, seed]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uOpacity: { value: opacity },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [size, opacity, colorA, colorB],
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (group.current)
      group.current.rotation.z = state.clock.elapsedTime * drift * 0.01;
  });

  return (
    <points ref={group} geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** One abstracted ribbon of light — the wing motif, reduced to a drifting
 *  plane that catches light. Never a literal feather. */
function Ribbon() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color("#c9a7ff") } }),
    [],
  );
  useFrame((s) => {
    if (mat.current) mat.current.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh position={[1.2, -0.4, -4.5]} rotation={[0.42, -0.5, 0.32]}>
      <planeGeometry args={[26, 8, 90, 24]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={RIBBON_VERT}
        fragmentShader={RIBBON_FRAG}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Damped pointer parallax — the field leans, it never tracks 1:1. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const px = (state.pointer.x || 0) * 0.5;
    const py = (state.pointer.y || 0) * 0.32;
    target.current.x += (px - target.current.x) * Math.min(1, delta * 1.6);
    target.current.y += (py - target.current.y) * Math.min(1, delta * 1.6);
    if (group.current) {
      group.current.position.x = target.current.x * 0.9;
      group.current.position.y = target.current.y * 0.75;
      group.current.rotation.y = target.current.x * 0.09;
      group.current.rotation.x = -target.current.y * 0.07;
    }
  });

  const mobile = size.width < 760;
  return (
    <group ref={group}>
      {/* weighted toward the reel side so the headline column stays clean */}
      <group scale={mobile ? 1.25 : 1} position-x={mobile ? 0 : 1.5}>
        {children}
      </group>
    </group>
  );
}

export default function ParticleField({
  quality = 1,
  active = true,
}: {
  quality?: number;
  active?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      frameloop={active ? "always" : "never"}
      dpr={[1, quality > 0.7 ? 1.5 : 1.2]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ParallaxRig>
        <Layer
          count={Math.round(240 * quality)}
          depth={-1}
          spread={5.4}
          size={1.35}
          opacity={0.85}
          colorA="#c9a7ff"
          colorB="#ffffff"
          drift={1}
          seed={11}
        />
        <Layer
          count={Math.round(340 * quality)}
          depth={-4}
          spread={7.4}
          size={1.15}
          opacity={0.5}
          colorA="#8f7bd8"
          colorB="#e8d9b5"
          drift={-0.6}
          seed={523}
        />
        <Layer
          count={Math.round(420 * quality)}
          depth={-8}
          spread={10}
          size={0.95}
          opacity={0.3}
          colorA="#5b4f86"
          colorB="#c9a7ff"
          drift={0.35}
          seed={7919}
        />
        <Ribbon />
      </ParallaxRig>
      {quality > 0.7 && (
        <EffectComposer>
          <Bloom
            intensity={0.42}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.35}
            mipmapBlur
            radius={0.32}
          />
          <Vignette eskil={false} offset={0.22} darkness={0.72} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
