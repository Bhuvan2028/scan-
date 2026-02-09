"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { ProgressVisualizer } from "@/components/dashboard/progress-visualizer"
import { StatusTimeline } from "@/components/dashboard/status-timeline"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Globe, ExternalLink, AlertTriangle, Loader2, Activity, Cpu } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { api, Scan } from "@/lib/api"

export default function ScanStatusPage() {
    const params = useParams()
    const id = params.id as string
    const [scan, setScan] = useState<Scan | null>(null)
    const [loading, setLoading] = useState(true)

    // Mock state for visualization
    const progress = 65
    const phaseIndex = 2 // Vulnerability Analysis
    const target = scan?.domain || "production-gateway.isecurify.io"

    const telemetryLogs = [
        { timestamp: "14:22:01", message: "NODE_INITIALIZATION_SUCCESSFUL", type: "info" },
        { timestamp: "14:22:05", message: "TARGET_HANDSHAKE_ESTABLISHED", type: "info" },
        { timestamp: "14:22:12", message: "PORT_SCAN_SEQUENCE_STARTED", type: "info" },
        { timestamp: "14:23:45", message: "POTENTIAL_OPEN_RDP_DETECTED_V3", type: "warning" },
        { timestamp: "14:24:10", message: "VULN_DB_LOOKUP_NOMINAL", type: "info" },
        { timestamp: "14:25:33", message: "INJECTING_PAYLOAD_V2_TEST_VECTOR", type: "info" },
        { timestamp: "14:26:12", message: "BUFFER_OVERFLOW_CHECK_PENDING", type: "info" }
    ]

    useEffect(() => {
        const fetchScan = async () => {
            try {
                const data = await api.getScanResults(id)
                setScan(data)
            } catch (err) {
                console.error("Failed to fetch scan status:", err)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchScan()
    }, [id])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-32">
                <Loader2 className="size-16 animate-spin text-slate-950 mb-8 stroke-[1px]" />
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] font-mono animate-pulse">
                    Synchronizing_node_telemetry...
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-32">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12"
            >
                <Link
                    href="/dashboard"
                    className="inline-flex items-center text-[10px] font-black text-slate-400 hover:text-slate-950 transition-colors group uppercase tracking-widest font-mono"
                >
                    <ArrowLeft className="mr-3 size-4 group-hover:-translate-x-1 transition-transform" />
                    Abort_Session_Return
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
                <div className="lg:col-span-4 bg-white border border-slate-200 p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]">
                    <div className="mb-12 pb-8 border-b border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-2 bg-slate-950" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-950">Phase_Execution</h3>
                        </div>
                        <p className="text-slate-500 font-mono text-[10px] font-bold uppercase tracking-widest">
                            // STEP_BY_STEP_DIAGNOSTICS
                        </p>
                    </div>
                    <StatusTimeline currentPhaseIndex={phaseIndex} />
                </div>

                <div className="lg:col-span-8 bg-white border border-slate-200 p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center relative min-h-[500px] overflow-hidden">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-slate-100" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-slate-100" />

                    <div className="relative z-10 text-center w-full">
                        <ProgressVisualizer progress={progress} status={scan?.status || 'initializing'} />
                    </div>
                </div>
            </div>

            {/* Node Telemetry Log */}
            <div className="bg-slate-950 border border-slate-800 p-12 rounded-none shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-6">
                        <div className="size-10 border border-white/20 flex items-center justify-center text-white/40">
                            <Activity size={18} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter">Node_Telemetry_Log</h3>
                            <p className="text-white/40 font-mono text-[9px] font-bold uppercase tracking-[0.3em]">
                                // SYSTEM_OUTPUT_BUFFER_V4.0
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-black text-emerald-400 font-mono uppercase tracking-widest">ENCRYPTED_STREAM::ACTIVE</span>
                    </div>
                </div>

                <div className="space-y-4 font-mono text-[11px] uppercase tracking-tighter max-h-60 overflow-y-auto pr-6 custom-scrollbar">
                    {telemetryLogs.map((log, i) => (
                        <div key={i} className="flex gap-6 group hover:translate-x-1 transition-transform">
                            <span className={`shrink-0 font-black ${log.type === 'error' ? 'text-red-500' : log.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`}>
                                [{log.timestamp}]
                            </span>
                            <span className="text-white/40 font-black shrink-0">::</span>
                            <span className={`font-bold ${log.type === 'error' ? 'text-red-400' : 'text-white/80'}`}>
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
