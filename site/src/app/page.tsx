import { Brief } from "@/components/site/brief"
import { Charts } from "@/components/site/charts"
import { Compare } from "@/components/site/compare"
import { Contrast } from "@/components/site/contrast"
import { Failures } from "@/components/site/failures"
import { Findings } from "@/components/site/findings"
import { Footer } from "@/components/site/footer"
import { FrameworkDetailProvider } from "@/components/site/framework-detail"
import { Frameworks } from "@/components/site/frameworks"
import { Hero } from "@/components/site/hero"
import { LaunchVideo } from "@/components/site/launch-video"
import { Leaderboard } from "@/components/site/leaderboard"
import { Limitations } from "@/components/site/limitations"
import { Methodology } from "@/components/site/methodology"
import { Personas } from "@/components/site/personas"
import { Roster } from "@/components/site/roster"
import { Scatter } from "@/components/site/scatter"
import { Shell } from "@/components/site/shell"

export default function Home() {
  return (
    <FrameworkDetailProvider>
      <Shell>
        <main>
          <Hero />
          <Roster />
          <Contrast />
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
      </Shell>
    </FrameworkDetailProvider>
  )
}
