import { Brief } from "@/components/site/brief"
import { Charts } from "@/components/site/charts"
import { Compare } from "@/components/site/compare"
import { Failures } from "@/components/site/failures"
import { Findings } from "@/components/site/findings"
import { Footer } from "@/components/site/footer"
import { FrameworkDetailProvider } from "@/components/site/framework-detail"
import { Frameworks } from "@/components/site/frameworks"
import { Hero } from "@/components/site/hero"
import { Kpis } from "@/components/site/kpis"
import { LaunchVideo } from "@/components/site/launch-video"
import { Leaderboard } from "@/components/site/leaderboard"
import { Limitations } from "@/components/site/limitations"
import { Methodology } from "@/components/site/methodology"
import { Nav } from "@/components/site/nav"
import { Personas } from "@/components/site/personas"
import { Scatter } from "@/components/site/scatter"

export default function Home() {
  return (
    <FrameworkDetailProvider>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Kpis />
        <Brief />
        <Leaderboard />
        <Methodology />
        <Frameworks />
        <Charts />
        <Failures />
        <Compare />
        <Scatter />
        <Findings />
        <Personas />
        <LaunchVideo />
        <Limitations />
      </main>
      <Footer />
    </FrameworkDetailProvider>
  )
}
