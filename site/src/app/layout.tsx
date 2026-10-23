import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://affix-2026.vercel.app"),
  title: "AFFIX-2026 — Agent Framework Fitness Index",
  description:
    "Sixteen production AI frameworks ranked on AFFIX and rewrite hazard (RHS). PydanticAI leads at 87.6 AFFIX / RHS 17.3.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "AFFIX-2026 — Agent Framework Fitness Index",
    description:
      "PydanticAI #1 of 16 frameworks (AFFIX 87.6, RHS 17.3). Fitness today, rewrite risk within twelve months.",
    type: "website",
    siteName: "AFFIX-2026",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AFFIX-2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFFIX-2026 — Agent Framework Fitness Index",
    description: "16 frameworks. PydanticAI leads AFFIX. RHS scores rewrite risk.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${display.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#050505] text-ink">
        {children}
      </body>
    </html>
  )
}
