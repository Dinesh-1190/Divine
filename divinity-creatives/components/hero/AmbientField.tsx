"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/media-query";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

type Nav = Navigator & { deviceMemory?: number };

let cachedQuality: number | null = null;

function detectQuality(): number {
  if (cachedQuality !== null) return cachedQuality;
  cachedQuality = measureQuality();
  return cachedQuality;
}

function measureQuality(): number {
  try {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2")) return 0;
  } catch {
    return 0;
  }
  // Phones and tablets get the static field: a full-screen WebGL loop is the
  // difference between a smooth scroll and a janky one on a touch device.
  if (window.matchMedia("(pointer: coarse)").matches) return 0;
  const nav = navigator as Nav;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  if (cores <= 4 || memory <= 4) return 0.45;
  return 1;
}

/** The static gradient the 3D layer degrades to — same palette, no GPU cost. */
function StaticField() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div
        className="absolute left-[58%] top-[38%] h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,167,255,0.20), rgba(143,123,216,0.10) 42%, rgba(8,8,10,0) 68%)",
        }}
      />
      <div
        className="absolute left-[18%] top-[76%] h-[42vmax] w-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,217,181,0.10), rgba(8,8,10,0) 66%)",
        }}
      />
    </div>
  );
}

export default function AmbientField() {
  const reduced = useReducedMotion();
  // Detected once per session; 0 on the server so nothing renders until hydration.
  const detected = useSyncExternalStore(
    () => () => {},
    detectQuality,
    () => 0,
  );
  const quality = reduced ? 0 : detected;
  const [active, setActive] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden>
      <StaticField />
      {quality > 0 && (
        <div className="absolute inset-0 opacity-0 [animation:field-in_2.4s_ease-out_0.2s_forwards]">
          <ParticleField quality={quality} active={active} />
        </div>
      )}
    </div>
  );
}
