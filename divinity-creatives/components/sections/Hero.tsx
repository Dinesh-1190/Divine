"use client";

import { motion } from "motion/react";
import AmbientField from "@/components/hero/AmbientField";
import MediaSlot from "@/components/ui/MediaSlot";
import MagneticButton from "@/components/ui/MagneticButton";
import { useIntroReady } from "@/lib/intro";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINES = ["Content that", "demands", "attention"];

export default function Hero() {
  const ready = useIntroReady();
  const state = ready ? "show" : "hidden";

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-[var(--nav-h)]">
      <AmbientField />

      {/* keeps the type legible no matter how bright the field gets */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(8,8,10,0.97) 0%, rgba(8,8,10,0.88) 30%, rgba(8,8,10,0.42) 58%, rgba(8,8,10,0.72) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-var(--nav-h))] w-full max-w-[1600px] grid-cols-12 items-end gap-y-8 px-5 pb-7 pt-10 sm:px-8 lg:pb-9 lg:pt-12">
        {/* headline block */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-7">
          <motion.h1
            className="display text-[clamp(2.75rem,7.6vw,7.4rem)]"
            initial="hidden"
            animate={state}
            transition={{ staggerChildren: 0.085, delayChildren: 0.05 }}
          >
            {LINES.map((line, i) => (
              <span className="mask-line" key={line}>
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: "112%", opacity: 0.4 },
                    show: {
                      y: "0%",
                      opacity: 1,
                      transition: { duration: 1.25, ease: EASE },
                    },
                  }}
                  style={
                    i === 2
                      ? {
                          backgroundImage:
                            "linear-gradient(96deg, #f5f4f1 22%, #c9a7ff 74%, #e8d9b5 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }
                      : undefined
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            className="mt-7 max-w-[46ch]"
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            <p className="prose-lede text-fg/72">
A video studio for creators, founders and brands. We cut for retention — story order, pacing and packaging built so the next second always feels earned.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 22 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            <MagneticButton href="#work">View our work</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Work with us
            </MagneticButton>
          </motion.div>
        </div>

        {/* reel — bleeds off the right edge, hairline framed only */}
        <motion.div
          className="col-span-12 lg:col-span-5 lg:-mr-8 lg:pl-10 xl:-mr-[max(0px,calc((100vw-1600px)/2+2rem))]"
          initial={{ opacity: 0, clipPath: "inset(14% 0% 0% 0%)", scale: 1.06 }}
          animate={
            ready
              ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
              : {}
          }
          transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
        >
          <div className="relative border-t border-line lg:border-l lg:border-t-0">
            <MediaSlot
              hue={272}
              ratio="16:9"
              alt="Divinity Creatives showreel"
              active
              src={{ mp4: "/work/showreel.mp4", poster: "/work/showreel.jpg" }}
              replaceNote="REPLACE: studio showreel"
              className="h-[62vw] sm:h-[44vw] lg:h-[min(60vh,540px)]"
              fill
            >
              <button
                type="button"
                data-cursor="PLAY"
                aria-label="Play the Divinity Creatives showreel"
                className="absolute inset-0 z-10 flex items-end justify-start p-5 text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-fg/25 backdrop-blur-sm transition-colors duration-500 hover:border-glow">
                    <span className="ml-[3px] block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-fg" />
                  </span>
                  <span className="text-sm text-fg/80">Showreel 2026</span>
                </span>
              </button>

              {/* a playhead, not a fake player chrome */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-fg/10"
              >
                <motion.span
                  className="absolute left-0 top-0 block h-px w-1/4 bg-glow"
                  style={{ boxShadow: "0 0 10px 1px rgba(201,167,255,0.55)" }}
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                />
              </span>
            </MediaSlot>
          </div>
        </motion.div>

        {/* editorial footer strip — hairlines, not middle dots */}
        <motion.div
          className="col-span-12 mt-4 grid grid-cols-2 border-t border-line pt-4 text-sm text-muted sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.95 }}
        >
          <div className="border-line pr-4 sm:border-r">Video editing studio</div>
          <div className="border-line px-0 sm:border-r sm:px-4">
            Working US + UK
          </div>
          <div className="border-line pr-4 pt-3 sm:border-r sm:px-4 sm:pt-0">
            Longform, vertical, brand
          </div>
          <div className="pt-3 sm:pl-4 sm:pt-0">
            <a href="#contact" className="link-draw text-fg">
              Taking projects for Q4
            </a>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-line lg:block"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        aria-hidden
      >
        <motion.span
          className="absolute left-0 top-0 block h-6 w-px bg-glow"
          animate={{ y: ["-100%", "260%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
