"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useFinePointer, useReducedMotion } from "@/lib/media-query";

type Mode = { label: string; kind: "dot" | "label" | "hover" };

const DEFAULT: Mode = { label: "", kind: "dot" };

export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const [mode, setMode] = useState<Mode>(DEFAULT);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], a, button",
      ) as HTMLElement | null;
      if (!el) return setMode(DEFAULT);
      const label = el.dataset?.cursor;
      setMode(label ? { label, kind: "label" } : { label: "", kind: "hover" });
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    const pressOn = () => setDown(true);
    const pressOff = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", pressOn);
    window.addEventListener("pointerup", pressOff);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", pressOn);
      window.removeEventListener("pointerup", pressOff);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const labelled = mode.kind === "label";

  return (
    /* Above every overlay — the page hides the native cursor, so this layer
       must never be covered by the case study, the menu or the preloader. */
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      {/* trailing ring — carries the contextual label */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border backdrop-blur-[1px]"
          animate={{
            width: labelled ? 92 : mode.kind === "hover" ? 46 : 30,
            height: labelled ? 92 : mode.kind === "hover" ? 46 : 30,
            backgroundColor: labelled
              ? "rgba(201,167,255,0.92)"
              : "rgba(201,167,255,0)",
            borderColor: labelled
              ? "rgba(201,167,255,0)"
              : "rgba(245,244,241,0.28)",
            scale: down ? 0.86 : 1,
            boxShadow: labelled
              ? "0 0 44px 8px rgba(201,167,255,0.35)"
              : "0 0 0px 0px rgba(201,167,255,0)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.6 }}
        >
          <AnimatePresence>
            {labelled && (
              <motion.span
                key={mode.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="font-display text-[11px] font-semibold tracking-[0.06em] text-void"
              >
                {mode.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* precise dot */}
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-fg"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: labelled ? 0 : 5,
          height: labelled ? 0 : 5,
          opacity: labelled ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
