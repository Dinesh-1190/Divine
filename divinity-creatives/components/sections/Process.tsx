"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/content";
import { MaskLines } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      setPinned(true);
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section.current,
          start: "top top",
          end: () => `+=${window.innerHeight * processSteps.length}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length),
            );
            setIndex(i);
            if (progress.current) {
              gsap.set(progress.current, { scaleX: self.progress });
            }
          },
        });
      }, section);
      return () => {
        ctx.revert();
        setPinned(false);
      };
    });

    return () => mm.revert();
  }, []);

  const step = processSteps[index];

  return (
    <section
      id="process"
      ref={section}
      className="relative border-t border-line py-24 lg:flex lg:h-[100svh] lg:items-center lg:py-0"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-8">
          <MaskLines
            as="h2"
            id="process-heading"
            className="display text-[clamp(2.4rem,6vw,5.4rem)]"
            lines={["How it runs"]}
          />
          <span className="hidden pb-3 text-sm text-muted lg:block">
            Four steps, in this order, every time.
          </span>
        </div>

        {/* pinned: one step at a time, replacing the last */}
        {pinned ? (
          <div className="mt-16">
            <div className="relative h-px w-full bg-line">
              <span
                ref={progress}
                className="absolute left-0 top-0 block h-px w-full origin-left scale-x-0 bg-glow"
                style={{ boxShadow: "0 0 14px 1px rgba(201,167,255,0.6)" }}
              />
            </div>

            <div className="mt-4 flex gap-8">
              {processSteps.map((s, i) => (
                <span
                  key={s.n}
                  className={`text-sm transition-colors duration-500 tnum ${
                    i === index ? "text-fg" : "text-dim"
                  }`}
                >
                  {s.n} {s.title}
                </span>
              ))}
            </div>

            <div className="relative mt-14 h-[42vh]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={step.n}
                  className="absolute inset-0 grid grid-cols-12 gap-x-10"
                  initial={{ opacity: 0, y: 54 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
                  exit={{ opacity: 0, y: -40, transition: { duration: 0.25 } }}
                >
                  <div className="col-span-5 self-center">
                    <div
                      className="display text-[clamp(6rem,18vw,17rem)] leading-[0.78] text-transparent"
                      style={{
                        WebkitTextStroke: "1px rgba(245,244,241,0.16)",
                      }}
                    >
                      {step.n}
                    </div>
                  </div>
                  <div className="col-span-7 self-center">
                    <h3 className="display text-[clamp(2rem,4.4vw,3.8rem)]">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-[28ch] text-[clamp(1.1rem,1.6vw,1.5rem)] leading-snug text-glow/90">
                      {step.line}
                    </p>
                    <p className="prose-lede mt-6">{step.body}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <ol className="mt-12 space-y-px bg-line">
            {processSteps.map((s, i) => (
              <motion.li
                key={s.n}
                className="bg-void py-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-sm text-dim tnum">{s.n}</span>
                  <h3 className="display text-[clamp(2rem,9vw,3rem)]">{s.title}</h3>
                </div>
                <p className="mt-3 text-[17px] leading-snug text-glow/90">{s.line}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
