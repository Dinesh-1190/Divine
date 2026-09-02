"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A line that arrives from behind its own mask — the base reveal for
 *  every headline on the site. Lines stagger; nothing else fades up. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = "h2",
  once = true,
  id,
}: {
  lines: ReactNode[];
  className?: string;
  id?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  once?: boolean;
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span className={`mask-line ${lineClassName ?? ""}`} key={i}>
          <motion.span
            className="block"
            variants={
              {
                hidden: { y: "108%", rotate: 1.5 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 1.05, ease: EASE },
                },
              } as Variants
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 18,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself across the viewport — used as the
 *  section divider so chapter breaks feel authored, not decorative. */
export function DrawLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-line-strong ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}
