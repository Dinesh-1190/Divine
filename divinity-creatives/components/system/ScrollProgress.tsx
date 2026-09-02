"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const CHAPTERS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why Divinity" },
  { id: "results", label: "Results" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

/** A right-edge hairline with a luminous travelling segment, plus the
 *  current chapter name. Wayfinding, not a gamified progress bar. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const y = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const top = useTransform(y, [0, 1], ["0%", "82%"]);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const found = CHAPTERS.find((c) => c.id === e.target.id);
            if (found) setCurrent(found.label);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-6 top-1/2 z-[90] hidden h-[36vh] -translate-y-1/2 lg:block"
      aria-hidden
    >
      <div className="relative h-full w-px bg-line">
        <motion.span
          className="absolute right-0 block h-[18%] w-px"
          style={{
            top,
            background:
              "linear-gradient(180deg, transparent, #c9a7ff 40%, #e8d9b5 100%)",
            boxShadow: "0 0 12px 1px rgba(201,167,255,0.5)",
          }}
        />
      </div>
      <motion.span
        key={current ?? "none"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: current ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute right-5 top-1/2 origin-right -translate-y-1/2 rotate-180 whitespace-nowrap text-[11px] text-muted [writing-mode:vertical-rl]"
      >
        {current}
      </motion.span>
    </div>
  );
}
