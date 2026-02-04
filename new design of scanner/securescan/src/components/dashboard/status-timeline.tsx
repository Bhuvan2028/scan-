"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const phases = [
    { id: "init", title: "Initialization", description: "Configuring assessment parameters and secure handshake." },
    { id: "recon", title: "Infrastructure Recon", description: "Mapping target infrastructure and endpoint discovery." },
    { id: "vuln", title: "Vulnerability Analysis", description: "Deep inspection for SQLi, XSS, and logic flaws." },
    { id: "report", title: "Report Generation", description: "Consolidating findings into an actionable audit log." }
]

interface StatusTimelineProps {
    currentPhaseIndex: number
}

export function StatusTimeline({ currentPhaseIndex }: StatusTimelineProps) {
    return (
        <div className="space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-100" />

            {phases.map((phase, index) => {
                const isCompleted = index < currentPhaseIndex
                const isActive = index === currentPhaseIndex

                return (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-6 relative"
                    >
                        <div className={cn(
                            "relative z-10 size-8 rounded-full flex items-center justify-center transition-all duration-500",
                            isCompleted ? "bg-slate-900 text-white" :
                                isActive ? "bg-white border-2 border-slate-900 text-slate-900 shadow-lg shadow-slate-200" :
                                    "bg-white border-2 border-slate-100 text-slate-300"
                        )}>
                            {isCompleted ? <CheckCircle2 size={16} /> :
                                isActive ? <Loader2 size={16} className="animate-spin" /> :
                                    <Circle size={16} />}
                        </div>

                        <div className="space-y-1 py-0.5">
                            <h3 className={cn(
                                "text-base font-semibold transition-colors",
                                isActive ? "text-slate-900" : isCompleted ? "text-slate-700" : "text-slate-400"
                            )}>
                                {phase.title}
                            </h3>
                            <p className={cn(
                                "text-sm font-light leading-relaxed transition-colors",
                                isActive ? "text-slate-500" : "text-slate-400"
                            )}>
                                {phase.description}
                            </p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
