import type { Metadata } from "next"
import { Bricolage_Grotesque, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
})

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://affix-2026.vercel.app"),
  title: "AFFIX-2026 — Agent Framework Fitness Index",
  description:
    "Sixteen production AI frameworks ranked on AFFIX and rewrite hazard (RHS). PydanticAI leads at 87.6 AFFIX / RHS 17.3. Ten dimensions, twelve failure modes, seven proprietary indices.",
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
      "PydanticAI #1 of 16 frameworks (AFFIX 87.6, RHS 17.3). Comparative fitness and rewrite-hazard estimates from primary documentation.",
    type: "website",
    siteName: "AFFIX-2026",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AFFIX-2026 — Agent Framework Fitness Index. PydanticAI leads at 87.6.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFFIX-2026 — Agent Framework Fitness Index",
    description:
      "16 frameworks ranked on fitness today and rewrite risk within twelve months.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
