"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import WingMark from "@/components/brand/WingMark";
import { MaskLines, FadeIn } from "@/components/ui/Reveal";

const ANSWERS = [
  {
    head: "We edit the story, not the footage.",
    body: "Retention is a structural problem before it is a cutting problem. Before anything gets trimmed we decide what the piece is arguing, in what order, and what the viewer is owed in the first eight seconds.",
  },
  {
    head: "Detail is the whole job.",
    body: "Frame-accurate cuts, sound that carries the transition, type that sits on the grid, a grade that holds across sources. None of it is visible on its own. All of it is why the piece feels finished.",
  },
  {
    head: "We know how the platform reads it.",
    body: "Packaging, pacing and the shape of an opening are platform behaviours, not preferences. We cut for how people actually watch — thumb hovering, sound off, decision made in a second.",
  },
];

export default function Why() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <section
      id="why"
      ref={ref}
      className="relative overflow-hidden border-t border-line py-24 lg:py-40"
      aria-labelledby="why-heading"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
        style={{ y: markY, opacity: markOpacity }}
        aria-hidden
      >
        <WingMark
          paired
          className="mx-auto h-auto w-[90vw] max-w-[1400px] text-glow"
          strokeWidth={1}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <MaskLines
          as="h2"
          id="why-heading"
          className="display max-w-[16ch] text-[clamp(2.5rem,7.4vw,7rem)]"
          lines={["How do we make", "people keep", "watching?"]}
        />

        <FadeIn delay={0.2}>
          <p className="prose-lede mt-10 max-w-[52ch] text-fg/75 lg:mt-14">
            It is the only question that matters, and almost nobody asks it
            before opening the timeline. Everything we do — the order, the
            pacing, the packaging, the restraint — is an answer to it.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-px border border-line bg-line lg:mt-24 lg:grid-cols-3">
          {ANSWERS.map((a, i) => (
            <motion.div
              key={a.head}
              className="bg-void px-6 py-10 lg:px-9 lg:py-14"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="display-tight max-w-[18ch] text-[clamp(1.35rem,2.1vw,1.85rem)]">
                {a.head}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{a.body}</p>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <p className="mt-14 max-w-[60ch] text-muted lg:mt-20">
            The rest is consistency and communication: the same standard on video
            forty as on video one, notes answered the same day, and a schedule
            that holds whether you upload weekly or daily.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
