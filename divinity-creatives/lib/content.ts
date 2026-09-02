export type Ratio = "16:9" | "9:16" | "4:5";

export type Project = {
  slug: string;
  client: string;
  title: string;
  type: string;
  niche: string;
  year: string;
  ratio: Ratio;
  /** Drop real footage here when it lands — MediaSlot switches from the
   *  placeholder field to <video> the moment `src` is present. */
  src?: { mp4?: string; webm?: string; poster?: string };
  hue: number;
  summary: string;
  brief: string;
  approach: string[];
  outcome: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "atlas-longform",
    src: { mp4: "/work/atlas-longform.mp4", poster: "/work/atlas-longform.jpg" },
    client: "Atlas Reid",
    title: "The 40-minute video people finished",
    type: "YouTube Longform",
    niche: "Business / Documentary",
    year: "2025",
    ratio: "16:9",
    hue: 268,
    summary:
      "A documentary-style business channel rebuilt around retention — pacing mapped to the story beat, not the script line.",
    brief:
      "Atlas had the research and the access, but a 38% average view duration. Long stretches of talking head with nothing carrying the viewer between arguments.",
    approach: [
      "Rebuilt the edit around five story beats and cut every line that did not move one forward.",
      "Designed a restrained motion system — typographic callouts, archival stills, no stock B-roll.",
      "Re-scored transitions so each act break lands on a sound cue rather than a hard cut.",
    ],
    outcome: [
      { label: "Avg. view duration", value: "+61%" },
      { label: "Videos delivered", value: "24" },
      { label: "Turnaround", value: "72h" },
    ],
  },
  {
    slug: "kestrel-shorts",
    src: { mp4: "/work/kestrel-shorts.mp4", poster: "/work/kestrel-shorts.jpg" },
    client: "Kestrel",
    title: "Shorts that don't look like shorts",
    type: "Short Form System",
    niche: "Fitness / Creator",
    year: "2025",
    ratio: "9:16",
    hue: 282,
    summary:
      "A repeatable vertical format with a signature look — built as a system so volume never cost quality.",
    brief:
      "Kestrel needed twelve verticals a week across three platforms without the edits collapsing into the same jump-cut template everyone else uses.",
    approach: [
      "Built a typographic kit with three states so captions read as design, not subtitles.",
      "Locked a grade and a sound bed that make any camera source feel like one channel.",
      "Documented the system so the in-house team can ship between our drops.",
    ],
    outcome: [
      { label: "Weekly output", value: "12" },
      { label: "Saves per post", value: "+3.4×" },
      { label: "Platforms", value: "3" },
    ],
  },
  {
    slug: "meridian-launch",
    src: { mp4: "/work/meridian-launch.mp4", poster: "/work/meridian-launch.jpg" },
    client: "Meridian Studio",
    title: "A launch film with no voiceover",
    type: "Brand Film",
    niche: "Product / SaaS",
    year: "2024",
    ratio: "16:9",
    hue: 45,
    summary:
      "Ninety seconds of product, motion and silence — carrying a launch without a single line of narration.",
    brief:
      "A crowded launch week. Every competitor shipped the same explainer with the same friendly VO.",
    approach: [
      "Cut to rhythm rather than to script — the interface does the explaining.",
      "Built the motion design in the product's own geometry instead of a template pack.",
      "Delivered nine derivative cuts from the same master for paid and social.",
    ],
    outcome: [
      { label: "Derivative cuts", value: "9" },
      { label: "Completion rate", value: "74%" },
      { label: "Delivery", value: "11 days" },
    ],
  },
  {
    slug: "north-packaging",
    src: { mp4: "/work/north-packaging.mp4", poster: "/work/north-packaging.jpg" },
    client: "North & Co.",
    title: "Packaging that earned the click",
    type: "Thumbnails & Packaging",
    niche: "Education",
    year: "2025",
    ratio: "4:5",
    hue: 300,
    summary:
      "Title, thumbnail and first eight seconds treated as one design problem instead of three separate jobs.",
    brief:
      "Strong library, weak entry point. Good videos were being judged on packaging made in ten minutes.",
    approach: [
      "Tested title and frame together in pairs — never one without the other.",
      "Built a face-and-type system that stays legible at 210px wide.",
      "Rewrote the opening eight seconds to pay off the promise on the thumbnail.",
    ],
    outcome: [
      { label: "CTR", value: "+2.1pt" },
      { label: "Packages shipped", value: "40+" },
      { label: "Iterations", value: "3 per title" },
    ],
  },
  {
    slug: "vela-motion",
    src: { mp4: "/work/vela-motion.mp4", poster: "/work/vela-motion.jpg" },
    client: "Vela",
    title: "Motion design with an accent",
    type: "Motion Design",
    niche: "Fintech",
    year: "2024",
    ratio: "16:9",
    hue: 210,
    summary:
      "A motion language derived from the brand's own curve — used across product, social and event screens.",
    brief:
      "Every asset came from a different freelancer. Nothing looked related.",
    approach: [
      "Extracted a single easing curve and grid from the identity and made everything obey it.",
      "Built a component library in After Effects the team can re-time without breaking.",
      "Set a hard rule: no effect that cannot be justified by the story beat.",
    ],
    outcome: [
      { label: "Assets unified", value: "60+" },
      { label: "Handover", value: "Full AE kit" },
      { label: "Regions", value: "US + UK" },
    ],
  },
  {
    slug: "orchard-system",
    src: { mp4: "/work/orchard-system.mp4", poster: "/work/orchard-system.jpg" },
    client: "Orchard",
    title: "One channel, four editors, one voice",
    type: "Content System",
    niche: "Creator Business",
    year: "2025",
    ratio: "9:16",
    hue: 255,
    summary:
      "An operating system for a channel publishing daily — briefs, grade, sound, review, all standardised.",
    brief:
      "Scaling from two uploads a week to daily meant either quality dropped or the founder stopped sleeping.",
    approach: [
      "Wrote a brief template that captures intent in six lines, so nothing gets re-cut twice.",
      "Standardised the grade, the sound bed and the caption kit across every editor.",
      "Built a review loop with timestamped notes and a single revision pass.",
    ],
    outcome: [
      { label: "Cadence", value: "Daily" },
      { label: "Revision rounds", value: "1" },
      { label: "Editors aligned", value: "4" },
    ],
  },
];

export const services = [
  {
    n: "01",
    title: "YouTube Editing",
    line: "Longform cut for retention — pacing, story order and restraint, not effects.",
    detail: ["Story-beat pass", "Retention edit", "Grade + sound", "Chapter design"],
  },
  {
    n: "02",
    title: "Short Form Content",
    line: "Vertical built as a system, so volume never turns into sameness.",
    detail: ["Hook testing", "Caption kit", "Multi-platform masters", "Weekly cadence"],
  },
  {
    n: "03",
    title: "Motion Design",
    line: "Motion derived from your brand's geometry — never a template pack.",
    detail: ["Type in motion", "Data + UI animation", "AE component kits", "Sound design"],
  },
  {
    n: "04",
    title: "Thumbnails & Packaging",
    line: "Title, frame and first eight seconds solved as one problem.",
    detail: ["Title pairing", "Frame design", "A/B variants", "Open rewrite"],
  },
  {
    n: "05",
    title: "Content Systems",
    line: "The operating layer — briefs, review loops and standards that hold at scale.",
    detail: ["Brief templates", "Grade + sound standards", "Review loop", "Team onboarding"],
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    line: "We start with the audience, not the footage.",
    body: "Who is watching, where they drop off, and what the channel is actually for. You get a point of view on your content before we touch a timeline.",
  },
  {
    n: "02",
    title: "Create",
    line: "The first cut is a decision, not a draft.",
    body: "Story order, pacing and packaging built together. Every choice traces back to a reason we can say out loud — no effect for the sake of an effect.",
  },
  {
    n: "03",
    title: "Refine",
    line: "One considered pass beats five reactive ones.",
    body: "Timestamped notes, a single structured revision round, and a grade and sound pass that make the piece feel finished rather than exported.",
  },
  {
    n: "04",
    title: "Deliver",
    line: "Masters, derivatives and the system behind them.",
    body: "Platform-ready masters, cutdowns from the same source of truth, and documented standards so the next video starts further ahead than the last.",
  },
];

export const stats: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  display?: string;
}[] = [
  { value: 225, suffix: "K+", label: "Creator audience reached", note: "Combined across channels we cut for" },
  { value: 7, suffix: "+", label: "Years editing", note: "From first timeline to studio" },
  { value: 2, suffix: "", label: "Continents served", note: "US + UK clients, remote-first", display: "US + UK" },
  { value: 100, suffix: "s", label: "Videos produced", note: "Longform, vertical and brand" },
];

export const testimonials = [
  {
    quote:
      "[REPLACE] The first cut came back better than the version I had in my head. That has never happened with an editor before.",
    name: "[REPLACE: Client name]",
    role: "[REPLACE: Channel / Company]",
  },
  {
    quote:
      "[REPLACE] We went from two uploads a week to daily without the quality slipping. The system is the reason.",
    name: "[REPLACE: Client name]",
    role: "[REPLACE: Channel / Company]",
  },
  {
    quote:
      "[REPLACE] They understand why people keep watching. That is a different skill to knowing the software.",
    name: "[REPLACE: Client name]",
    role: "[REPLACE: Channel / Company]",
  },
];
