"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { services } from "@/lib/content";
import { MaskLines } from "@/components/ui/Reveal";

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative border-t border-line py-24 lg:py-36"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-y-6">
          <MaskLines
            as="h2"
            id="services-heading"
            className="col-span-12 display text-[clamp(2.4rem,6vw,5.4rem)] lg:col-span-7"
            lines={["What we make"]}
          />
          <p className="col-span-12 max-w-[40ch] self-end text-muted lg:col-span-4 lg:col-start-9">
            Five disciplines, one standard. Most channels need two of them; the
            best ones eventually need all five.
          </p>
        </div>

        <ul className="mt-14 lg:mt-20">
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <li key={s.n} className="border-t border-line last:border-b">
                <button
                  type="button"
                  className="group relative grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 text-left lg:py-9"
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(isActive ? null : i)}
                  aria-expanded={isActive}
                >
                  {/* a light bleed that rises out of the hairline on approach */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-full origin-top opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(201,167,255,0.10), transparent 62%)",
                    }}
                  />
                  <span className="relative col-span-2 text-sm text-dim tnum sm:col-span-1">
                    {s.n}
                  </span>
                  <motion.span
                    className="relative col-span-10 display-tight text-[clamp(1.9rem,4.6vw,3.6rem)] sm:col-span-6"
                    animate={{ x: isActive ? 14 : 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {s.title}
                  </motion.span>
                  <span className="relative col-span-12 max-w-[46ch] text-[15px] leading-relaxed text-muted sm:col-span-5">
                    {s.line}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-4 pb-8">
                        <div className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 sm:col-span-11 sm:col-start-2">
                          {s.detail.map((d) => (
                            <span key={d} className="text-sm text-fg/70">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
