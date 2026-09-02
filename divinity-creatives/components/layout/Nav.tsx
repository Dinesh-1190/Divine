"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import WingMark from "@/components/brand/WingMark";
import MagneticButton from "@/components/ui/MagneticButton";
import { lockScroll } from "@/components/system/SmoothScroll";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color] duration-500 ${
          solid && !open
            ? "border-b border-line bg-void/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="Divinity Creatives — home"
          >
            <WingMark
              className="h-5 w-6 text-glow transition-colors duration-500 group-hover:text-warm"
              strokeWidth={1.3}
            />
            <span className="display-tight text-[15px] leading-none">
              Divinity <span className="text-muted">Creatives</span>
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-8 text-[15px] text-muted">
              {LINKS.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-draw transition-colors duration-300 hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <MagneticButton href="#contact" className="px-6 py-3 text-sm">
              Start a project
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[110] flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3 w-6">
              <motion.span
                className="absolute left-0 block h-px w-full bg-fg"
                animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-0 block h-px w-full bg-fg"
                animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[105] bg-void md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 50% at 20% 90%, rgba(201,167,255,0.16), transparent 70%)",
              }}
            />
            <div className="relative flex h-full flex-col justify-between px-5 pb-10 pt-[calc(var(--nav-h)+2rem)]">
              <ul className="flex flex-col gap-1">
                {LINKS.map((l, i) => (
                  <li key={l.href} className="mask-line">
                    <motion.a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display block text-[15vw] leading-[1.02] text-fg"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.9,
                        delay: 0.12 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="mailto:hello@divinitycreatives.com" className="text-fg">
                  hello@divinitycreatives.com
                </a>
                <span>Video editing studio — working US + UK</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
