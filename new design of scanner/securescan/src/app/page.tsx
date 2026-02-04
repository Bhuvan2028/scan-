"use client"

import React, { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { Hero } from "@/components/marketing/hero"
import { AnatomyOfScan } from "@/components/marketing/anatomy-of-scan"
import { PerformanceVisualizer } from "@/components/marketing/performance-visualizer"
import { OutcomeMetrics } from "@/components/marketing/outcome-metrics"
import { Footer } from "@/components/marketing/footer"
import { HolographicGlobe } from "@/components/marketing/holographic-globe"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Globe transitions:
  // Starts offset to the right (Hero position)
  // Transitions to center on scroll
  // Fades slightly on scroll to become a subtle anchor
  // Fades out before footer
  const globeOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.3, 0.3, 0])
  const globeX = useTransform(scrollYProgress, [0, 0.2], ["25vw", "0vw"])
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <main ref={containerRef} className="min-h-screen bg-white relative">
      <Navbar />

      {/* Global Persistent Globe Background */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            opacity: globeOpacity,
            x: globeX,
            y: globeY,
          }}
          className="relative"
        >
          <HolographicGlobe isActive={true} />
        </motion.div>
      </div>

      <div className="relative z-10">
        <Hero />
        <AnatomyOfScan />
        <PerformanceVisualizer />
        <OutcomeMetrics />
        <Footer />
      </div>
    </main>
  )
}
