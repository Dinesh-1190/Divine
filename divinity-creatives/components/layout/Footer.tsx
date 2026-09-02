import WingMark from "@/components/brand/WingMark";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@divinitycreatives.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-5 pb-8 pt-14 sm:px-8">
      <WingMark
        paired
        className="pointer-events-none absolute -bottom-10 left-1/2 h-auto w-[70vw] -translate-x-1/2 text-glow/[0.07]"
        strokeWidth={1}
      />
      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
            <WingMark className="h-5 w-6 text-glow" strokeWidth={1.3} />
            <span className="display-tight text-[15px]">
              Divinity <span className="text-muted">Creatives</span>
            </span>
          </a>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-draw text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="link-draw text-muted transition-colors hover:text-fg"
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Divinity Creatives</span>
          <span>Video editing, motion design and content systems — US + UK</span>
        </div>
      </div>
    </footer>
  );
}
