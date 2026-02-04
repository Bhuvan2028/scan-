import { Navbar } from "@/components/marketing/navbar"
import { Hero } from "@/components/marketing/hero"
import { AnatomyOfScan } from "@/components/marketing/anatomy-of-scan"
import { PerformanceVisualizer } from "@/components/marketing/performance-visualizer"
import { OutcomeMetrics } from "@/components/marketing/outcome-metrics"
import { Footer } from "@/components/marketing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AnatomyOfScan />
      <PerformanceVisualizer />
      <OutcomeMetrics />
      <Footer />
    </main>
  )
}
