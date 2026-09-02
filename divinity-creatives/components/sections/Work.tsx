"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/lib/content";
import { MaskLines } from "@/components/ui/Reveal";
import ProjectCard from "./work/ProjectCard";
import CaseStudy from "./work/CaseStudy";
import { lockScroll } from "@/components/system/SmoothScroll";

/** Vertical offsets that break the rail out of a uniform row. */
const OFFSETS = [0, 56, 16, 72, 4, 40];

export default function Work() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Project | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop: the rail travels sideways while the section is pinned.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const el = rail.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth + 64;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, section);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    lockScroll(!!open);
  }, [open]);

  return (
    <>
      <section
        id="work"
        ref={section}
        className="relative overflow-hidden border-t border-line py-20 lg:h-[100svh] lg:py-0"
        aria-labelledby="work-heading"
      >
        <div className="flex h-full flex-col lg:pb-8 lg:pt-[calc(var(--nav-h)+1.5rem)]">
          <div className="mx-auto flex w-full max-w-[1600px] shrink-0 items-end justify-between gap-8 px-5 pb-10 sm:px-8">
            <MaskLines
              as="h2"
              id="work-heading"
              className="display text-[clamp(2.4rem,6vw,5.4rem)]"
              lines={["Selected work"]}
            />
            <p className="hidden max-w-[34ch] pb-2 text-sm text-muted sm:block">
              Six pieces that show how we think. Open one to see the problem, the
              decisions and what changed.
            </p>
          </div>

          {/* the rail: pinned + scrubbed on desktop, swipeable on touch */}
          <div
            ref={rail}
            className="flex w-max flex-1 items-center gap-6 px-5 sm:gap-10 sm:px-8 max-lg:w-full max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:pb-4 lg:will-change-transform"
          >
            {projects.map((p, i) => (
              <div key={p.slug} className="max-lg:snap-start">
                <ProjectCard
                  project={p}
                  index={i}
                  offset={OFFSETS[i % OFFSETS.length]}
                  onOpen={setOpen}
                />
              </div>
            ))}
            <div className="flex w-[38vw] shrink-0 items-center max-lg:hidden">
              <a
                href="#contact"
                className="display-tight max-w-[14ch] text-[clamp(1.6rem,2.6vw,2.6rem)] text-muted transition-colors duration-500 hover:text-fg"
              >
                Your project could be the seventh.
              </a>
            </div>
          </div>

          <div className="mx-auto mt-10 w-full max-w-[1600px] shrink-0 px-5 text-sm text-dim sm:px-8 lg:mt-6">
            <span className="lg:hidden">Swipe to browse</span>
            <span className="max-lg:hidden">Scroll to travel the rail</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
