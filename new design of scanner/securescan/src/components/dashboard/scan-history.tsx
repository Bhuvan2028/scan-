"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Scan } from "@/lib/api"

interface ScanHistoryProps {
    scans: Scan[];
}

export function ScanHistory({ scans }: ScanHistoryProps) {
    return (
        <div className="p-8 bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Last 5 Scans</h2>
                <Link href="/dashboard/history">
                    <button className="text-xs font-bold text-slate-900 hover:text-black uppercase tracking-widest transition-colors">
                        Full Log
                    </button>
                </Link>
            </div>

            <div className="space-y-4">
                {scans.map((item, index) => (
                    <Link key={item._id} href={`/dashboard/result?id=${item._id}`}>
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer mb-2"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${item.status === "completed" ? "bg-slate-100 text-slate-900" : "bg-slate-50 text-slate-400"
                                    }`}>
                                    {item.status === "completed" ? <CheckCircle2 size={18} /> : (item.status === "failed" ? <XCircle size={18} /> : <Clock size={18} />)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-slate-900 truncate max-w-[120px]">
                                        {item.domain}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                        {item._id.slice(-8).toUpperCase()} • {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${item.status === "completed" ? "text-slate-900" : "text-slate-500"
                                    }`}>
                                    {item.status === "completed" ? (item.grade || "A") : (item.status === "failed" ? "Failed" : "Running")}
                                </span>
                                <ChevronRight className="size-4 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                            </div>
                        </motion.div>
                    </Link>
                ))}

                {scans.length === 0 && (
                    <p className="text-center text-slate-400 py-8 text-sm font-light">No scan history available.</p>
                )}
            </div>
        </div>
    )
}
