/** Next rewrites URLs for next/link and next/image, but not for raw `src`
 *  attributes on <video>/<img>. Every file we serve out of /public goes
 *  through here so it still resolves under a GitHub Pages base path. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string;
export function asset(path: undefined): undefined;
export function asset(path?: string): string | undefined;
export function asset(path?: string) {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${BASE_PATH}${path}`;
}
