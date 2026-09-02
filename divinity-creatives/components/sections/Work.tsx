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
            scrub: 0.4,
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
          <div className="mx-auto flex w-full max-w-[1600px] shrink-0 flex-col items-start gap-4 px-5 pb-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pb-10">
            <MaskLines
              as="h2"
              id="work-heading"
              className="display text-[clamp(2.4rem,10vw,5.4rem)]"
              lines={["Selected work"]}
            />
            <p className="max-w-[34ch] text-sm text-muted lg:pb-2">
              Six pieces that show how we think. Open one to see the problem, the
              decisions and what changed.
            </p>
          </div>

          {/* Mobile-first: a snapping swipe carousel. From lg it becomes the
              single wide rail that the pinned ScrollTrigger drives sideways. */}
          <div
            ref={rail}
            className="flex w-full snap-x snap-mandatory items-start gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 sm:gap-8 sm:px-8 lg:w-max lg:flex-1 lg:snap-none lg:items-center lg:gap-10 lg:overflow-x-visible lg:pb-0 lg:will-change-transform"
          >
            {projects.map((p, i) => (
              <div key={p.slug} className="shrink-0 snap-start">
                <ProjectCard
                  project={p}
                  index={i}
                  offset={OFFSETS[i % OFFSETS.length]}
                  onOpen={setOpen}
                />
              </div>
            ))}
            <div className="hidden w-[38vw] shrink-0 items-center lg:flex">
              <a
                href="#contact"
                className="display-tight max-w-[14ch] text-[clamp(1.6rem,2.6vw,2.6rem)] text-muted transition-colors duration-500 hover:text-fg"
              >
                Your project could be the seventh.
              </a>
            </div>
          </div>

          <div className="mx-auto mt-6 w-full max-w-[1600px] shrink-0 px-5 text-sm text-dim sm:px-8">
            <span className="lg:hidden">Swipe to browse</span>
            <span className="hidden lg:inline">Scroll to travel the rail</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
