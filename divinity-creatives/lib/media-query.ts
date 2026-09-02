"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a media query so preference changes take effect live,
 *  and reports the server-safe default during SSR. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");
