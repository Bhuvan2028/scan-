"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { ProgressVisualizer } from "@/components/dashboard/progress-visualizer"
import { StatusTimeline } from "@/components/dashboard/status-timeline"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Globe, ExternalLink, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ScanStatusPage() {
    const params = useParams()
    const id = params.id as string

    // Mock state for visualization
    const progress = 65
    const phaseIndex = 2 // Vulnerability Analysis
    const target = "production-gateway.isecurify.io"

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
                    >
                        <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Header & Meta */}
                    <div className="lg:col-span-12">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-900/10">
                                    <Shield size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Assessment in Progress</h1>
                                        <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Active</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-500 text-sm font-light">
                                        <span className="flex items-center gap-1.5"><Globe size={14} />{target}</span>
                                        <span className="size-1 bg-slate-200 rounded-full" />
                                        <span>ID: {id}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="rounded-xl border-slate-100 hover:bg-slate-50 text-slate-600">
                                    Cancel Scan
                                </Button>
                                <Button className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200">
                                    Prioritize Scan
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Left: Progress Visualization */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white border border-slate-100 rounded-3xl p-12 flex flex-col items-center justify-center shadow-sm">
                            <ProgressVisualizer progress={progress} status="Analyzing Vulnerabilities" />

                            <div className="mt-12 w-full pt-8 border-t border-slate-50 text-center">
                                <p className="text-slate-400 text-sm font-light mb-2">Estimated completion</p>
                                <p className="text-slate-900 font-semibold tracking-tight">Approximately 12 minutes remaining</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex gap-4">
                            <div className="p-2 bg-white rounded-lg text-slate-900 h-fit shadow-sm">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <h4 className="text-slate-900 font-semibold text-sm mb-1">Initial Findings Detected</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Our agents have identified 3 potential low-criticality endpoints. Complete report will follow.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Timeline & Phases */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Assessment Phases</h2>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    Step {phaseIndex + 1} of 4
                                </div>
                            </div>

                            <StatusTimeline currentPhaseIndex={phaseIndex} />
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group border border-slate-800">
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Technical Engine Log</h3>
                                    <p className="text-white/50 text-sm font-light">Real-time telemetry from autonomous security agents.</p>
                                </div>
                                <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl px-4">
                                    View Raw Log <ExternalLink size={14} className="ml-2" />
                                </Button>
                            </div>
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 bg-slate-100 rounded-full blur-3xl opacity-20" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
