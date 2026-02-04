"use client"

import { motion } from "framer-motion"
import { Activity, FileText, Trash2, ShieldCheck, ShieldAlert, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Scan } from "@/lib/api"

interface ScanLogItemProps {
    scan: Scan
    index: number
}

export function ScanLogItem({ scan, index }: ScanLogItemProps) {
    const isSuccess = scan.status === "completed"
    const date = new Date(scan.createdAt).toLocaleDateString()
    const time = new Date(scan.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-lg hover:shadow-slate-200/20 transition-all group"
        >
            <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl ${isSuccess ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400"
                    }`}>
                    {isSuccess ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900 tracking-tight">{scan.domain}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${isSuccess ? "bg-slate-100 text-slate-900" : "bg-slate-50 text-slate-500"
                            }`}>
                            {isSuccess ? (scan.grade || "Secured") : (scan.status === "failed" ? "Failed" : "Running")}
                        </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                            <span className="text-slate-900 font-bold">{scan._id.slice(-8).toUpperCase()}</span>
                        </p>
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                            <span className="size-1 bg-slate-200 rounded-full" />
                            {scan.mode?.toUpperCase()}
                        </p>
                        <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                            <Clock size={12} />
                            {date} • {time}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 ml-auto lg:ml-0">
                <Link href={`/dashboard/status/${scan._id}`}>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-11 px-4 rounded-xl border-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-medium flex items-center gap-2"
                    >
                        <Activity size={16} />
                        <span className="hidden sm:inline">View Status</span>
                    </Button>
                </Link>
                <Link href={`/dashboard/result/${scan._id}`}>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-11 px-4 rounded-xl border-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-medium flex items-center gap-2"
                    >
                        <FileText size={16} />
                        <span className="hidden sm:inline">View Result</span>
                    </Button>
                </Link>
                <div className="w-px h-6 bg-slate-100 mx-1 hidden sm:block" />
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-11 w-11 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all p-0"
                    title="Delete Assessment"
                >
                    <Trash2 size={18} />
                </Button>
            </div>
        </motion.div>
    )
}
