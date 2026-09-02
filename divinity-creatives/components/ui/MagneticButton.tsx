"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { prefersReducedMotion } from "@/lib/intro";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
  strength?: number;
  type?: "button" | "submit";
  disabled?: boolean;
};

/** Pulls toward the pointer inside its own bounds, springs back on exit.
 *  Keyboard users get the identical focus/press states without the pull. */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  strength = 0.28,
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength * 0.8);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-medium transition-colors duration-500 will-change-transform";
  const skin =
    variant === "solid"
      ? "bg-fg text-void hover:bg-glow"
      : "border border-line-strong text-fg hover:border-glow/70 hover:text-glow";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "solid" && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: "rgba(201,167,255,0.55)" }}
        />
      )}
    </>
  );

  const props = {
    ref: ref as never,
    className: `${base} ${skin} ${className}`,
    style: { x: sx, y: sy },
    onPointerMove: onMove,
    onPointerLeave: reset,
    onBlur: reset,
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} {...props}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...props}>
      {inner}
    </motion.button>
  );
}
