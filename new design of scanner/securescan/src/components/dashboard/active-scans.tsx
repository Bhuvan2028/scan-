"use client"

import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { Scan } from "@/lib/api"

interface ActiveScansProps {
    scans: Scan[];
}

export function ActiveScans({ scans }: ActiveScansProps) {
    return (
        <div className="p-8 bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Active Assessments</h2>
                {scans.length > 0 && (
                    <span className="flex items-center gap-2 text-xs font-semibold text-slate-900 bg-slate-50 px-3 py-1.5 rounded-full uppercase tracking-wider border border-slate-100">
                        <Loader2 className="size-3 animate-spin text-slate-900" />
                        {scans.length} Running
                    </span>
                )}
            </div>

            <div className="space-y-6">
                {scans.map((scan) => (
                    <div key={scan._id} className="group cursor-default">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 mb-0.5">{scan.domain}</p>
                                <p className="text-xs text-slate-500 font-medium">{scan.mode?.toUpperCase()} • {scan._id.slice(-8).toUpperCase()}</p>
                            </div>
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                                {scan.status === 'pending' ? 'Queued' : scan.currentModule || 'Analyzing'}...
                            </span>
                        </div>

                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${scan.progressPct}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-slate-900"
                            />
                        </div>
                    </div>
                ))}

                {scans.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="size-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle size={32} className="text-slate-300" />
                        </div>
                        <p className="text-slate-900 font-medium mb-1">No active scans</p>
                        <p className="text-slate-500 text-sm font-light">Initiate a new scan to monitor real-time activity.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
