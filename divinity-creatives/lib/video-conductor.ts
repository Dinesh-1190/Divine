"use client";

/** Six project clips plus the showreel share one page. Decoding them all at
 *  once is what makes a video-heavy site stutter, so playback is rationed:
 *  only the most-visible one or two ever run, everything else is paused. */

type Entry = { el: HTMLVideoElement; ratio: number; priority: number };

const entries = new Map<symbol, Entry>();
let queued = false;

function budget() {
  if (typeof window === "undefined") return 1;
  return window.matchMedia("(pointer: coarse)").matches ? 1 : 2;
}

function reconcile() {
  queued = false;
  const ranked = [...entries.values()]
    .filter((e) => e.ratio > 0.3)
    .sort((a, b) => b.ratio + b.priority - (a.ratio + a.priority));

  const winners = new Set(ranked.slice(0, budget()).map((e) => e.el));

  entries.forEach(({ el }) => {
    if (winners.has(el)) {
      if (el.paused) el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  });
}

function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(reconcile);
}

export function updateVideo(
  id: symbol,
  el: HTMLVideoElement,
  ratio: number,
  priority = 0,
) {
  entries.set(id, { el, ratio, priority });
  schedule();
}

export function dropVideo(id: symbol) {
  entries.delete(id);
  schedule();
}

// Browsers pause media in a background tab; pick the right one back up on return.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) schedule();
  });
}
