"use client";

import { motion } from "motion/react";
import { stats, testimonials } from "@/lib/content";
import CountUp from "@/components/ui/CountUp";
import { MaskLines } from "@/components/ui/Reveal";

export default function Results() {
  return (
    <section
      id="results"
      className="relative border-t border-line py-24 lg:py-36"
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid grid-cols-12 items-end gap-y-6">
          <MaskLines
            as="h2"
            id="results-heading"
            className="col-span-12 display text-[clamp(2.4rem,6vw,5.4rem)] lg:col-span-6"
            lines={["The record"]}
          />
          <p className="col-span-12 max-w-[38ch] text-muted lg:col-span-4 lg:col-start-9">
            Seven years of edits, from first freelance timeline to a studio
            working across two continents.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px border border-line bg-line lg:mt-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-void px-5 py-8 sm:px-7 sm:py-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="display text-[clamp(2.6rem,5.6vw,4.6rem)] leading-none">
                {s.display ?? <CountUp to={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-4 text-[15px] text-fg/85">{s.label}</div>
              <div className="mt-1 text-sm text-dim">{s.note}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              className="border-t border-line pt-6"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="display-tight text-[clamp(1.1rem,1.6vw,1.4rem)] leading-snug text-fg/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted">
                <span className="text-fg/80">{t.name}</span>
                <span className="block text-dim">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
