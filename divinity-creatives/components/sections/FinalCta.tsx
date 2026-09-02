"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { MaskLines } from "@/components/ui/Reveal";

export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.85, 0.15]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["24%", "-24%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-line py-28 lg:py-44"
      aria-labelledby="cta-heading"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          opacity: glow,
          y: glowY,
          background:
            "radial-gradient(circle, rgba(201,167,255,0.18), rgba(232,217,181,0.06) 45%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <MaskLines
          as="h2"
          id="cta-heading"
          className="display max-w-[15ch] text-[clamp(2.6rem,8.4vw,8rem)]"
          lines={["Ready to make", "better content?"]}
        />
        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="prose-lede text-fg/78">
            Let&rsquo;s build content that doesn&rsquo;t just get watched. It gets
            remembered.
          </p>
          <MagneticButton href="#contact" className="self-start px-8 py-4">
            Start a project
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
