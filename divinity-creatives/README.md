# Divinity Creatives

Studio site for Divinity Creatives — video editing, motion design and content systems.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion · GSAP ScrollTrigger · Lenis · React Three Fiber.

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Design tokens

All tokens live in the `@theme` block at the top of `app/globals.css` — colour, the two
type families, and the shared easing curves. Change them there, not in components.

## Swapping in real assets

Everything currently marked `[REPLACE: …]` on the page is a placeholder. Nothing else
needs to change when the real assets land.

**1. Project footage** — `public/work/*.mp4` + matching `.jpg` posters.

The seven clips currently in there are **placeholder stock** (Pexels, free licence, no
attribution required), trimmed to ~8s, cropped to the site's ratio system, graded to one
look and compressed. They are there so the layout reads correctly, not because they are
the studio's work — swap every one of them for real client footage before launch.

Each project points at its files in `lib/content.ts`:

```ts
src: {
  mp4: "/work/atlas-longform.mp4",
  poster: "/work/atlas-longform.jpg",  // first frame — shows before the video plays
  webm: "/work/atlas-longform.webm",   // optional
}
```

Keep replacements short (6–10s), muted and silent-cut, since every slot autoplays on
loop while it is on screen. The `ratio` field (`16:9`, `9:16`, `4:5`) drives the card
size in the work rail and the frame in the case study, so match it to the real footage.
To re-encode a new clip to the same spec:

```bash
ffmpeg -i source.mov -t 9 -an \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,\
eq=saturation=0.80:contrast=1.03,colorbalance=rs=-0.03:bs=0.05,fps=24" \
  -c:v libx264 -crf 32 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4
```

**2. The hero showreel** — `public/work/showreel.mp4` / `.jpg`, wired in
`components/sections/Hero.tsx`. Same spec, exported at 1280×960 so it survives the
crop on both the tall desktop frame and the wide mobile one.

**3. Founder portrait** — `components/sections/About.tsx`. Replace the gradient block
with an `<Image>`; keep the `vignette` class on the wrapper so the grade still applies.
Art direction: low-key, single source, hard shadow — editorial, not a corporate headshot.

**4. Testimonials** — `lib/content.ts` → `testimonials[]`. Quotes and attributions are
placeholders and are visibly marked as such on the page until replaced.

**5. Stats** — `lib/content.ts` → `stats[]`. Numbers came from the brief; confirm them
before launch. `value` animates, `display` (optional) overrides with a literal string.

**6. Contact form submission** — `components/sections/Contact.tsx`, the `submit`
handler. It currently resolves a stub. Point the `TODO(backend)` line at your endpoint
or email service; the whole qualified lead is in the single `form` object.

**7. Real links** — social URLs in `components/layout/Footer.tsx`, the email address
(`hello@divinitycreatives.com`) in the footer, nav menu and contact section, and the
production domain in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts`.

**8. Social share image** — add `app/opengraph-image.png` (1200×630). The OG and
Twitter meta already reference it by convention once the file exists.

## Motion and accessibility notes

- Every scroll effect (pinned work rail, pinned process, parallax) is registered through
  `gsap.matchMedia` at `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`,
  so touch and reduced-motion users get the static, fully readable layout instead.
- `MotionConfig reducedMotion="user"` in `components/system/SmoothScroll.tsx` makes every
  Motion animation respect the OS preference; Lenis, the custom cursor and the preloader
  all opt out under the same preference.
- The 3D hero field feature-detects WebGL2, core count and device memory
  (`components/hero/AmbientField.tsx`) and degrades to a static gradient. It also stops
  rendering when the hero scrolls out of view or the tab is hidden.
