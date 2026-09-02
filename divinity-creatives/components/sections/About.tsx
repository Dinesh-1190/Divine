"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MaskLines, FadeIn } from "@/components/ui/Reveal";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-line py-24 lg:py-36"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-y-12 px-5 sm:px-8 lg:gap-x-10">
        {/* portrait — treated as an editorial feature photo, not a headshot */}
        <motion.div
          className="col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-1 lg:mt-24"
          style={{ y: portraitY }}
        >
          <div className="vignette relative aspect-[4/5] overflow-hidden bg-elevated">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 70% at 30% 12%, rgba(201,167,255,0.16), transparent 60%), linear-gradient(168deg, #16161b, #08080a 72%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
              style={{
                backgroundImage: "var(--grain-url)",
                backgroundSize: "150px 150px",
              }}
            />
            <span className="absolute bottom-4 left-4 rounded-full border border-line px-2.5 py-1 text-[10px] leading-none text-dim">
              [REPLACE: founder portrait — low-key, single source, hard shadow]
            </span>
          </div>
          <p className="mt-4 text-sm text-dim">
            Founder, Divinity Creatives — working between the US and UK
          </p>
        </motion.div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <MaskLines
            as="h2"
            id="about-heading"
            className="display text-[clamp(2.2rem,5.4vw,4.6rem)]"
            lines={["I have been cutting", "video since before", "it was a job."]}
          />

          <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-fg/78 lg:mt-14">
            <FadeIn>
              <p>
                It started the way it does for most people who end up doing this
                properly — a laptop, a hobby, and far too many hours learning why
                one cut felt right and another did not. The difference is I never
                stopped asking the second half of that question.
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p>
                Seven years later that habit is a studio. I work with creators
                building an audience, founders who need their product to be
                understood in ninety seconds, and brands who are tired of assets
                that look like four different companies made them.
              </p>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p>
                What I care about has not changed: the piece should be worth
                someone&rsquo;s time. That means understanding the audience before
                the timeline, being honest when an idea is not working, and
                treating a deadline as part of the craft rather than a threat to
                it.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="text-fg">
                If you are the kind of person who cares how the third cut lands,
                we will get on.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {[
                ["Based", "Remote — US + UK hours"],
                ["Works with", "Creators, founders, brands"],
                ["Tools", "Premiere, After Effects, DaVinci"],
              ].map(([k, v]) => (
                <div key={k} className="bg-void px-5 py-5">
                  <dt className="text-sm text-dim">{k}</dt>
                  <dd className="mt-1 text-[15px] text-fg/85">{v}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
