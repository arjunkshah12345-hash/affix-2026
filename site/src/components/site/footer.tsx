import { asOf, study } from "@/data/content"

const downloads = [
  { href: "/affix-2026.json", label: "Score matrix (JSON)" },
  { href: "/affix-2026-failures.json", label: "Failure matrix" },
  { href: "/methodology.md", label: "Methodology" },
  { href: "/citations.md", label: "Citations" },
  { href: "/video/affix-launch.mp4", label: "Study film" },
]

export function Footer() {
  return (
    <footer className="border-t border-foreground/12 bg-[var(--paper-deep)]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10 px-5 py-14 md:flex-row md:items-start md:justify-between md:px-8 md:py-16">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">
            AFFIX
          </p>
          <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
            {study} · scores are EST from primary documentation as of {asOf}.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-data text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Downloads
          </p>
          {downloads.map((d) => (
            <a
              key={d.href}
              href={d.href}
              className="font-data text-[12px] text-foreground underline-offset-4 transition hover:text-accent hover:underline"
            >
              {d.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 font-data text-[11px] text-muted-foreground">
          <a
            href="https://github.com/arjunkshah12345-hash/affix-2026"
            className="transition hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  )
}
