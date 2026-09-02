"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import MediaSlot from "@/components/ui/MediaSlot";
import MagneticButton from "@/components/ui/MagneticButton";
import type { Project } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[130] overflow-y-auto overscroll-contain bg-void"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.client} case study`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      ref={panelRef}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-void/70 backdrop-blur transition-colors hover:border-glow hover:text-glow sm:right-8 sm:top-8"
        aria-label="Close case study"
      >
        <span className="relative block h-3 w-3">
          <span className="absolute left-0 top-1/2 block h-px w-full rotate-45 bg-current" />
          <span className="absolute left-0 top-1/2 block h-px w-full -rotate-45 bg-current" />
        </span>
      </button>

      <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-20 sm:px-8">
        {/* vertical work keeps its own frame instead of being cropped wide */}
        <motion.div
          layoutId={`media-${project.slug}`}
          className={`relative ${
            project.ratio === "9:16" ? "mx-auto w-full max-w-[420px]" : ""
          }`}
        >
          <MediaSlot
            hue={project.hue}
            ratio={project.ratio === "9:16" ? "9:16" : "16:9"}
            src={project.src}
            alt={`${project.client} — ${project.type}`}
            active
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.22 }}
          className="mt-10 grid grid-cols-12 gap-y-10 sm:gap-x-10"
        >
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display text-[clamp(2rem,5vw,4.2rem)]">{project.title}</h2>
            <p className="prose-lede mt-6 text-fg/75">{project.summary}</p>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-y-6 self-end border-t border-line pt-6 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:pt-0">
            {[
              { k: "Client", v: project.client },
              { k: "Discipline", v: project.type },
              { k: "Sector", v: project.niche },
              { k: "Year", v: project.year },
            ].map((row) => (
              <div key={row.k}>
                <div className="text-sm text-dim">{row.k}</div>
                <div className="mt-1 text-[15px] text-fg">{row.v}</div>
              </div>
            ))}
          </div>

          <div className="col-span-12 mt-4 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="display-tight text-[clamp(1.3rem,2.2vw,1.9rem)]">
                The problem
              </h3>
              <p className="prose-lede mt-4">{project.brief}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h3 className="display-tight text-[clamp(1.3rem,2.2vw,1.9rem)]">
                What we did
              </h3>
              <ol className="mt-5 space-y-4">
                {project.approach.map((a, i) => (
                  <li key={i} className="flex gap-5 border-b border-line pb-4">
                    <span className="pt-1 text-sm text-dim tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-relaxed text-fg/85">{a}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {project.outcome.map((o) => (
              <div key={o.label} className="bg-void px-6 py-8">
                <div className="display text-[clamp(2rem,3.6vw,3.2rem)] text-fg">
                  {o.value}
                </div>
                <div className="mt-2 text-sm text-muted">{o.label}</div>
              </div>
            ))}
          </div>

          <div className="col-span-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <p className="max-w-[40ch] text-muted">
              Numbers and footage are placeholders until the client assets land.
            </p>
            <MagneticButton
              href="#contact"
              onClick={onClose}
              className="px-6 py-3 text-sm"
            >
              Start a project like this
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
