"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { markIntroDone } from "@/lib/intro";
import { useReducedMotion } from "@/lib/media-query";
import { lockScroll } from "./SmoothScroll";

const FEATHERS = [
  "M4 34 C 20 33.4, 33 28.2, 42 15.8",
  "M4 34 C 22 30.6, 34.5 23.6, 41 9.4",
  "M4 34 C 23.5 27.4, 33.6 18.6, 37.2 4.6",
  "M4 34 C 22.4 24.6, 28.8 14.4, 30.4 2",
];

export default function Preloader() {
  const reduced = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const open = !reduced && !dismissed;

  useEffect(() => {
    if (reduced) {
      markIntroDone();
      return;
    }
    lockScroll(true);
    const minimum = new Promise((r) => setTimeout(r, 1500));
    const fonts =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve();

    let cancelled = false;
    Promise.all([minimum, fonts]).then(() => {
      if (cancelled) return;
      setDismissed(true);
      lockScroll(false);
      window.scrollTo(0, 0);
      setTimeout(markIntroDone, 180);
    });
    return () => {
      cancelled = true;
      lockScroll(false);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-void"
          /* stops the fading overlay from swallowing a click on its way out */
          style={{ pointerEvents: open ? "auto" : "none" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,167,255,0.16), rgba(8,8,10,0) 62%)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <svg viewBox="0 0 92 40" className="h-14 w-32 text-fg" fill="none" aria-hidden>
              <g stroke="currentColor" strokeWidth={1.2} strokeLinecap="round">
                {FEATHERS.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    opacity={1 - i * 0.16}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.05,
                      delay: 0.08 * i,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
                {FEATHERS.map((d, i) => (
                  <motion.path
                    key={`m${i}`}
                    d={d}
                    opacity={1 - i * 0.16}
                    transform="translate(92 0) scale(-1 1)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 1.05,
                      delay: 0.08 * i,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </g>
            </svg>
            <motion.span
              className="display-tight text-[15px] text-fg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Divinity <span className="text-muted">Creatives</span>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
