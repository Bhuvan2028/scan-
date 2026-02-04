"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { AmbientBackground } from "@/components/ui/ambient-background"
import { ScanStats } from "@/components/dashboard/scan-stats"
import { ActiveScans } from "@/components/dashboard/active-scans"
import { ScanHistory } from "@/components/dashboard/scan-history"
import { NewScanTrigger } from "@/components/dashboard/new-scan-trigger"
import { api, Scan } from "@/lib/api"

export default function DashboardPage() {
    const [scans, setScans] = useState<Scan[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadScans = async () => {
            try {
                const data = await api.getAllScans()
                setScans(data)
            } catch (error) {
                console.error("Dashboard data fetch failed:", error)
            } finally {
                setLoading(false)
            }
        }

        loadScans()
        // Optional: Polling for active scans every 10 seconds
        const interval = setInterval(loadScans, 10000)
        return () => clearInterval(interval)
    }, [])

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <AmbientBackground />
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-4">
                            Security Dashboard
                        </h1>
                        <p className="text-slate-500 text-lg font-light max-w-2xl leading-relaxed">
                            Monitor your infrastructure, analyze recent scan results, and initiate new security assessments.
                        </p>
                    </div>
                    <NewScanTrigger />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Active Scans */}
                    <div className="lg:col-span-2 space-y-8">
                        <ScanStats scans={scans} />
                        <ActiveScans scans={scans.filter(s => s.status === 'running' || s.status === 'pending')} />
                    </div>

                    {/* Right Column: History */}
                    <div className="lg:col-span-1">
                        <ScanHistory scans={scans.filter(s => s.status === 'completed' || s.status === 'failed').slice(0, 5)} />
                    </div>
                </div>
            </div>

        </main>
    )
}
