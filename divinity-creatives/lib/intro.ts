"use client";

import { useSyncExternalStore } from "react";

let ready = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** True once the load choreography has handed control to the page. */
export function useIntroReady() {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
