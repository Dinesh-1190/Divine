"use client";

import { useEffect, useRef, useState } from "react";
import type { Ratio } from "@/lib/content";
import { useReducedMotion } from "@/lib/media-query";

const RATIO: Record<Ratio, string> = {
  "16:9": "16 / 9",
  "9:16": "9 / 16",
  "4:5": "4 / 5",
};

type Props = {
  hue: number;
  ratio?: Ratio;
  src?: { mp4?: string; webm?: string; poster?: string };
  /** Description used for the poster's alt text and the a11y label. */
  alt: string;
  active?: boolean;
  className?: string;
  replaceNote?: string;
  /** Let the parent own the box — used where the slot must fit a viewport. */
  fill?: boolean;
  children?: React.ReactNode;
};

/** Every image and video on the site goes through here. With `src` it is a
 *  lazy, muted preview video; without one it renders the studio's abstract
 *  light field so an asset-less build still looks authored. */
export default function MediaSlot({
  hue,
  ratio = "16:9",
  src,
  alt,
  active = false,
  className = "",
  replaceNote = "REPLACE: client footage",
  fill = false,
  children,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  // The footage is the visual, not a hover easter egg: it runs whenever the
  // slot is on screen and stops the moment it leaves.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !src?.mp4) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio > 0.25),
      { threshold: [0, 0.25, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src?.mp4]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if ((inView || active) && !reduced) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, active, reduced]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-elevated ${className}`}
      style={fill ? undefined : { aspectRatio: RATIO[ratio] }}
    >
      {/* Placeholder light field — replaced wholesale once footage exists */}
      {!src?.mp4 && (
        <div className="absolute inset-0" aria-label={alt} role="img">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 120% at 22% 18%, hsl(${hue} 34% 15% / 0.95), transparent 58%),
                 radial-gradient(90% 90% at 84% 82%, hsl(${(hue + 40) % 360} 26% 11% / 0.9), transparent 60%),
                 linear-gradient(160deg, #101015, #08080a 70%)`,
            }}
          />
          <div
            className="absolute -inset-[30%] opacity-70 blur-2xl"
            style={{
              background: `radial-gradient(40% 40% at 50% 50%, hsl(${hue} 70% 58% / 0.16), transparent 70%)`,
              animation: "slot-drift 18s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
            style={{
              backgroundImage: "var(--grain-url)",
              backgroundSize: "150px 150px",
            }}
          />
        </div>
      )}

      {src?.mp4 && (
        <>
          {src.poster && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src.poster}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            muted
            playsInline
            loop
            preload="none"
            poster={src.poster}
            aria-hidden
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            {src.webm && <source src={src.webm} type="video/webm" />}
            <source src={src.mp4} type="video/mp4" />
          </video>
        </>
      )}

      {/* Unifying grade — the reason mixed-source footage reads as one studio */}
      <div className="grade" aria-hidden />

      {!src?.mp4 && (
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-line px-2.5 py-1 text-[10px] leading-none text-dim">
          [{replaceNote}]
        </span>
      )}

      {children}
    </div>
  );
}
