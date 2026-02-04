"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { ScanLogItem } from "@/components/dashboard/scan-log-item"
import { ArrowLeft, Search, Filter, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { api, Scan } from "@/lib/api"

export default function HistoryPage() {
    const [scans, setScans] = useState<Scan[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await api.getAllScans()
                // Show completed or failed scans in history
                setScans(data.filter(s => s.status === 'completed' || s.status === 'failed'))
            } catch (error) {
                console.error("Failed to load history:", error)
            } finally {
                setLoading(false)
            }
        }
        loadHistory()
    }, [])

    const filteredHistory = useMemo(() => {
        return scans.filter(scan => {
            return scan.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scan._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (scan.mode || "").toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [scans, searchQuery])

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

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-4">
                            Scan History
                        </h1>
                        <p className="text-slate-500 text-lg font-light max-w-xl leading-relaxed">
                            Browse and manage your historical security assessments and detailed audit reports.
                        </p>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="relative group w-full sm:w-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all w-full sm:w-64 shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="py-24 flex justify-center">
                            <Loader2 className="size-8 animate-spin text-slate-400" />
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredHistory.map((scan, index) => (
                                <ScanLogItem key={scan._id} scan={scan} index={index} />
                            ))}
                        </AnimatePresence>
                    )}

                    {!loading && filteredHistory.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-24 text-center"
                        >
                            <p className="text-slate-400 font-light italic">No assessments found matching your search.</p>
                            <button
                                onClick={() => { setSearchQuery(""); }}
                                className="mt-4 text-sm font-semibold text-slate-900 hover:text-black underline underline-offset-4"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </main>
    )
}
