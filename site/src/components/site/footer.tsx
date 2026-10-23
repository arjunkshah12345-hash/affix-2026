import { asOf, study } from "@/data/content"
import { FooterSimple } from "@/components/ui/footer-simple"

const links = [
  { label: "Scores", href: "/affix-2026.json" },
  { label: "Failures", href: "/affix-2026-failures.json" },
  { label: "Method", href: "/methodology.md" },
  { label: "Source", href: "https://github.com/arjunkshah12345-hash/affix-2026" },
]

export function Footer() {
  return (
    <FooterSimple
      brand={<span className="font-display text-xl tracking-tight">AFFIX</span>}
      links={links}
      note={`${study} · EST · ${asOf}`}
      className="border-t border-line"
    />
  )
}
