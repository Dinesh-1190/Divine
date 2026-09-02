"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import MediaSlot from "@/components/ui/MediaSlot";
import type { Project } from "@/lib/content";

const WIDTH: Record<string, string> = {
  "16:9": "w-[82vw] sm:w-[60vw] lg:w-[42vw] xl:w-[38vw]",
  "9:16": "w-[52vw] sm:w-[34vw] lg:w-[18vw] xl:w-[15vw]",
  "4:5": "w-[66vw] sm:w-[42vw] lg:w-[22vw] xl:w-[19vw]",
};

export default function ProjectCard({
  project,
  onOpen,
  offset = 0,
  index,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  offset?: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [inFocusZone, setInFocusZone] = useState(false);

  // Touch has no hover: a card previews once it is the one you are looking at.
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: coarse)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => setInFocusZone(entry.intersectionRatio > 0.6),
      { threshold: [0, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      className={`shrink-0 lg:mt-[var(--rail-offset)] ${WIDTH[project.ratio]}`}
      style={{ "--rail-offset": `${offset}px` } as React.CSSProperties}
    >
      <motion.div
        ref={ref}
        className="group relative"
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        animate={{ scale: hover ? 1.03 : 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          data-cursor="VIEW"
          className="block w-full text-left"
          aria-label={`Open case study: ${project.client} — ${project.title}`}
        >
          <motion.div layoutId={`media-${project.slug}`} className="relative">
            <MediaSlot
              hue={project.hue}
              ratio={project.ratio}
              src={project.src}
              alt={`${project.client} — ${project.type}`}
              active={hover || inFocusZone}
            >
              {/* directional sheen following the pointer */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(38% 44% at var(--mx,50%) var(--my,50%), rgba(201,167,255,0.20), transparent 70%)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-warm/35"
              />
              {/* client / type label slides in from the bottom edge */}
              <span
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 ${
                  inFocusZone ? "translate-y-0" : "translate-y-full"
                } bg-gradient-to-t from-void/90 to-transparent px-4 pb-3 pt-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0`}
              >
                <span className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-fg">{project.client}</span>
                  <span className="text-muted">{project.type}</span>
                </span>
              </span>
            </MediaSlot>
          </motion.div>

          <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-line pt-3">
            <h3 className="display-tight max-w-[22ch] text-[clamp(1.05rem,1.5vw,1.5rem)]">
              {project.title}
            </h3>
            <span className="shrink-0 text-sm text-dim tnum">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-muted">{project.niche}</p>
        </button>
      </motion.div>
    </div>
  );
}
