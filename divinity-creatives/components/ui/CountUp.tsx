"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useMotionValueEvent } from "motion/react";
import { useReducedMotion } from "@/lib/media-query";

/** Counts once, on first entry, with a spring settle — never re-runs. */
export default function CountUp({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [counted, setCounted] = useState(0);
  const spring = useSpring(0, { stiffness: 55, damping: 22, mass: 1 });
  const display = reduced ? (inView ? to : 0) : counted;

  useEffect(() => {
    if (!inView || reduced) return;
    spring.set(to);
  }, [inView, to, spring, reduced]);

  useMotionValueEvent(spring, "change", (v) => setCounted(Math.round(v)));

  return (
    <span ref={ref} className="tnum">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
