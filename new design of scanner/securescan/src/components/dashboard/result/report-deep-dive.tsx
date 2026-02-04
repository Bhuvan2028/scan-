"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Layout,
    Hash,
    Terminal,
    Search,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    HardDrive,
    Code2
} from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
    {
        id: "summary",
        name: "Findings Summary",
        icon: Layout,
        data: [
            { type: "Critical", count: 0, color: "bg-black" },
            { type: "High", count: 2, color: "bg-slate-700" },
            { type: "Medium", count: 5, color: "bg-slate-400" },
            { type: "Low", count: 12, color: "bg-slate-200" }
        ]
    },
    {
        id: "subdomains",
        name: "Subdomains",
        icon: Hash,
        data: ["api.isecurify.io", "auth.isecurify.io", "cdn.isecurify.io", "vpn.isecurify.io"]
    },
    {
        id: "ports",
        name: "Open Ports",
        icon: Terminal,
        data: ["80/TCP (HTTP)", "443/TCP (HTTPS)", "22/TCP (SSH - Restricted)", "5432/TCP (PostgreSQL)"]
    },
    {
        id: "hosts",
        name: "Active Hosts",
        icon: HardDrive,
        data: ["104.26.10.12 (Cloudflare)", "104.26.11.12 (Cloudflare)", "172.64.32.74 (Edge)"]
    },
    {
        id: "osint",
        name: "OSINT & Web Data",
        icon: Search,
        data: ["Leaked Credentials: 0", "GitHub References: 12", "WHOIS Privacy: Active", "S3 Buckets: Secure"]
    }
]

import { Scan } from "@/lib/api"

interface ReportDeepDiveProps {
    scan?: Scan
}

export function ReportDeepDive({ scan }: ReportDeepDiveProps) {
    const [activeTab, setActiveTab] = useState(sections[0].id)
    const [showJson, setShowJson] = useState(false)
    const results = scan?.results || {}
    const findings = scan?.findings || []

    const criticalCount = findings.filter((f: any) => f.severity === "critical").length
    const highCount = findings.filter((f: any) => f.severity === "high").length
    const mediumCount = findings.filter((f: any) => f.severity === "medium").length
    const lowCount = findings.filter((f: any) => f.severity === "low").length

    // Map real data if available
    const dynamicSections = [
        {
            id: "summary",
            name: "Findings Summary",
            icon: Layout,
            data: [
                { type: "Critical", count: criticalCount, color: "bg-black" },
                { type: "High", count: highCount, color: "bg-slate-700" },
                { type: "Medium", count: mediumCount, color: "bg-slate-400" },
                { type: "Low", count: lowCount, color: "bg-slate-200" }
            ]
        },
        {
            id: "subdomains",
            name: "Subdomains",
            icon: Hash,
            data: results.subdomains || []
        },
        {
            id: "ports",
            name: "Open Ports",
            icon: Terminal,
            data: results.openPorts?.map((p: any) => `${p.port}/TCP (${p.service || "Unknown"})`) || []
        },
        {
            id: "hosts",
            name: "Active Hosts",
            icon: HardDrive,
            data: results.hosts || []
        },
        {
            id: "osint",
            name: "OSINT & Web Data",
            icon: Search,
            data: [
                `Technologies identified: ${results.technologies?.length || 0}`,
                `OSINT records found: ${results.osint?.length || 0}`,
                `Web endpoints discovered: ${results.webData?.length || 0}`,
                `Cloud footprint: ${results.hosts?.some((h: string) => h.includes("amazon") || h.includes("google") || h.includes("azure")) ? "Multi-Cloud Detected" : "On-Premise / Hidden"}`
            ]
        }
    ]

    const activeSection = dynamicSections.find(s => s.id === activeTab) || dynamicSections[0]

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
                {/* Navigation Sidebar */}
                <div className="md:col-span-4 lg:col-span-3 border-r border-slate-100 bg-slate-50/40 backdrop-blur-xl p-6 md:p-8 space-y-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-transparent pointer-events-none" />
                    <div className="mb-8 relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-4">Report explorer</span>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Intelligence Log</h3>
                    </div>

                    {dynamicSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm relative z-10",
                                activeTab === section.id
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200 ring-4 ring-slate-900/5 translate-x-1"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-white/60 hover:translate-x-1"
                            )}
                        >
                            <section.icon size={18} className={cn("transition-transform", activeTab === section.id ? "scale-110" : "group-hover:scale-110")} />
                            {section.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-8 lg:col-span-9 p-8 md:p-12 bg-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full flex flex-col"
                        >
                            {activeTab === "summary" ? (
                                <div className="space-y-12">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {activeSection.data.map((item: any) => (
                                            <div key={item.type} className="p-6 rounded-3xl bg-slate-50 border border-slate-100/50">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">{item.type}</span>
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("size-2 rounded-full", item.color)} />
                                                    <span className="text-3xl font-black text-slate-900">{item.count}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-lg font-bold text-slate-900">Security Verdict</h4>
                                        <div className={cn(
                                            "p-8 rounded-3xl border flex gap-6 items-start text-white shadow-xl shadow-slate-200/50",
                                            (criticalCount > 0 || highCount > 0)
                                                ? "bg-rose-950 border-rose-900"
                                                : "bg-slate-900 border-slate-900"
                                        )}>
                                            <div className="p-3 bg-white/10 rounded-2xl text-white backdrop-blur-md">
                                                {(criticalCount > 0 || highCount > 0)
                                                    ? <AlertCircle size={24} />
                                                    : <CheckCircle2 size={24} />
                                                }
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold mb-2 text-lg">
                                                    {(criticalCount > 0 || highCount > 0)
                                                        ? "Vulnerabilities Detected"
                                                        : "Infrastructure is Stable"
                                                    }
                                                </p>
                                                <p className="text-white/70 leading-relaxed font-light">
                                                    {(criticalCount > 0 || highCount > 0)
                                                        ? `Our audit discovered ${criticalCount} critical and ${highCount} high-level entry points. Immediate remediation is recommended to ensure perimeter integrity.`
                                                        : "Our autonomous agents found no critical entry points. The overall perimeter security surpasses industry benchmarks for this infrastructure tier."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                                                {activeSection.name}
                                            </h4>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                {activeSection.data.length} Total Items
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setShowJson(!showJson)}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                                showJson
                                                    ? "bg-slate-900 text-white shadow-lg"
                                                    : "bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100"
                                            )}
                                        >
                                            <Code2 size={14} />
                                            {showJson ? "Back to UI" : "View as JSON"}
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        <AnimatePresence mode="wait">
                                            {showJson ? (
                                                <motion.div
                                                    key="json-view"
                                                    initial={{ opacity: 0, scale: 0.98 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    className="bg-slate-900 rounded-3xl p-8 font-mono text-sm text-blue-400 overflow-auto max-h-[400px] border border-slate-800 shadow-2xl"
                                                >
                                                    <pre>{JSON.stringify(activeSection.data, null, 2)}</pre>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="ui-view"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="grid gap-4"
                                                >
                                                    {activeSection.data.length > 0 ? (
                                                        activeSection.data.map((item: any, i: number) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: i * 0.05 }}
                                                                className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-default group border border-transparent hover:border-slate-200"
                                                            >
                                                                <span className="text-slate-700 font-mono text-sm">{item}</span>
                                                                <div className="px-3 py-1 rounded-lg bg-white text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-sm">Verified</div>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        <p className="text-slate-400 font-light italic py-12 text-center">No data discoverable for this segment.</p>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
