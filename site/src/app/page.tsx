import { Charts } from "@/components/site/charts"
import { Contrast } from "@/components/site/contrast"
import { Findings } from "@/components/site/findings"
import { Footer } from "@/components/site/footer"
import { FrameworkDetailProvider } from "@/components/site/framework-detail"
import { Hero } from "@/components/site/hero"
import { LaunchVideo } from "@/components/site/launch-video"
import { Leaderboard } from "@/components/site/leaderboard"
import { Methodology } from "@/components/site/methodology"
import { Shell } from "@/components/site/shell"

export default function Home() {
  return (
    <FrameworkDetailProvider>
      <Shell>
        <main>
          <Hero />
          <Leaderboard />
          <Contrast />
          <Charts />
          <Findings />
          <Methodology />
          <LaunchVideo />
        </main>
        <Footer />
      </Shell>
    </FrameworkDetailProvider>
  )
}
