"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Search, Layout, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const scanTypes = [
    {
        id: "passive",
        title: "Passive Scan",
        duration: "5 min",
        icon: Search,
        description: "External inspection without active probes. Minimal footprint."
    },
    {
        id: "subdomain",
        title: "Subdomain Discovery",
        duration: "10 min",
        icon: Layout,
        description: "Deep crawl of infrastructure to find hidden assets and endpoints."
    },
    {
        id: "web-app",
        title: "Web App Scan",
        duration: "15 min",
        icon: Zap,
        description: "Active assessment for OWASP vulnerabilities (SQLi, XSS, etc.)"
    },
    {
        id: "comprehensive",
        title: "Comprehensive Scan",
        duration: "30+ min",
        icon: Shield,
        description: "Complete full-stack audit including infrastructure and logic."
    }
]

interface ScanTypeSelectorProps {
    selected: string | null
    onSelect: (id: string) => void
}

export function ScanTypeSelector({ selected, onSelect }: ScanTypeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scanTypes.map((type) => {
                const isSelected = selected === type.id
                return (
                    <motion.div
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                            "p-6 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden",
                            isSelected
                                ? "border-slate-900 bg-slate-50/30 shadow-md shadow-slate-900/5"
                                : "border-slate-100 bg-white hover:border-slate-200"
                        )}
                    >
                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className={cn(
                                "p-3 rounded-xl transition-colors",
                                isSelected ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500 group-hover:bg-slate-100"
                            )}>
                                <type.icon size={20} />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">
                                <Clock size={12} />
                                {type.duration}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{type.title}</h3>
                            <p className="text-sm text-slate-500 font-light leading-relaxed">
                                {type.description}
                            </p>
                        </div>

                        {isSelected && (
                            <motion.div
                                layoutId="active-bg"
                                className="absolute inset-0 bg-slate-900/5 z-0"
                            />
                        )}
                    </motion.div>
                )
            })}
        </div>
    )
}
