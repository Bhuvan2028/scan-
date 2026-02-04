"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { SecurityScoreCard } from "@/components/dashboard/result/security-score-card"
import { MetricGrid } from "@/components/dashboard/result/metric-grid"
import { ReportDeepDive } from "@/components/dashboard/result/report-deep-dive"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2, Printer, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { api, Scan } from "@/lib/api"

export default function ScanResultPage() {
    const params = useParams()
    const id = params.id as string
    const [scan, setScan] = useState<Scan | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await api.getScanResults(id)
                setScan(data)
            } catch (err: any) {
                console.error("Failed to fetch scan results:", err)
                setError(err.message || "Failed to load report")
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchResults()
    }, [id])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FAF9F6]">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="size-12 animate-spin text-slate-900 mb-4" />
                    <p className="text-slate-500 font-medium">Synthesizing intelligence report...</p>
                </div>
            </main>
        )
    }

    if (error || !scan) {
        return (
            <main className="min-h-screen bg-[#FAF9F6]">
                <Navbar />
                <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Report Not Found</h1>
                    <p className="text-slate-500 mb-8">{error || "The requested assessment report could not be retrieved."}</p>
                    <Link href="/dashboard/history">
                        <Button className="bg-slate-900 text-white rounded-xl h-12 px-8">
                            Back to History
                        </Button>
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
                {/* Navigation & Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            href="/dashboard/history"
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group mb-4"
                        >
                            <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
                            Back to History
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                            Assessment Report <span className="text-slate-500 font-mono">#{id.slice(-8).toUpperCase()}</span>
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">{scan.domain}</p>
                    </motion.div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-6 text-slate-600 hover:bg-white shadow-sm font-bold text-xs uppercase tracking-widest">
                            <Printer size={16} className="mr-2" /> Print
                        </Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-6 text-slate-600 hover:bg-white shadow-sm font-bold text-xs uppercase tracking-widest">
                            <Share2 size={16} className="mr-2" /> Share
                        </Button>
                        <Button
                            onClick={() => window.open(api.getReportUrl(id), '_blank')}
                            className="rounded-2xl bg-slate-900 hover:bg-slate-800 h-12 px-8 text-white shadow-xl shadow-slate-900/10 font-bold text-xs uppercase tracking-widest"
                        >
                            <Download size={16} className="mr-2" /> Download PDF
                        </Button>
                    </div>
                </div>

                {/* Global Posture */}
                <div className="mb-12">
                    <SecurityScoreCard score={scan.score || 0} />
                </div>

                {/* 9-Category Grid */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Security Benchmarks</h2>
                            <p className="text-slate-400 text-sm font-light mt-1 text-left">Detailed scores across critical infrastructure layers.</p>
                        </div>
                    </div>
                    <MetricGrid scan={scan} />
                </div>

                {/* Deep Dive Section */}
                <div>
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Technical Analysis</h2>
                            <p className="text-slate-400 text-sm font-light mt-1 text-left">Granular intelligence logs and vulnerability discovery.</p>
                        </div>
                    </div>
                    <ReportDeepDive scan={scan} />
                </div>

                {/* Expert Reminders / Footer */}
                <div className="mt-24 p-12 bg-white rounded-3xl text-center relative overflow-hidden ring-1 ring-slate-100 shadow-sm">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Want a deeper analysis?</h3>
                        <p className="text-slate-500 font-light mb-8 italic">
                            Schedule a manual walkthrough with our security architects to deep-dive into these findings and build a custom remediation roadmap.
                        </p>
                        <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl h-14 px-10 font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-200">
                            Contact SecOps Team
                        </Button>
                    </div>
                    <div className="absolute top-0 right-0 -mr-24 -mt-24 size-96 bg-slate-50 rounded-full blur-3xl -z-0" />
                </div>
            </div>
        </main>
    )
}
