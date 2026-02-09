"use client"

import { motion } from "framer-motion"
import { Shield, TrendingDown, TrendingUp } from "lucide-react"

interface SecurityScoreCardProps {
    score: number
    previousScore?: number
}

export function SecurityScoreCard({ score, previousScore = 78 }: SecurityScoreCardProps) {
    const isImproving = score > previousScore
    const diff = Math.abs(score - previousScore)

    return (
        <div className="bg-white rounded-none p-10 md:p-16 relative overflow-hidden group border border-slate-100 hover:border-slate-950 transition-colors duration-500">
            {/* Surgical Accents */}
            <div className="absolute top-0 left-0 w-24 h-[1px] bg-slate-100 group-hover:bg-slate-950 transition-colors" />
            <div className="absolute top-0 left-0 w-[1px] h-24 bg-slate-100 group-hover:bg-slate-950 transition-colors" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="text-center lg:text-left flex-1">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                        <div className="p-4 border border-slate-950 bg-slate-950 text-white transition-all">
                            <Shield className="size-6" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-1">GLOBAL_POSTURE_INDEX</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Health Monitoring</span>
                        </div>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter mb-8 uppercase">
                        Audit <span className="text-slate-400">Score</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-bold font-mono max-w-md leading-relaxed uppercase">
                        // CALCULATION_ENGINE::V4.0
                        <br />
                        // AGGREGATING_NINE_INFRA_BENCHMARKS...
                        <br />
                        // RESULT_ACCURACY::99.9%
                    </p>
                </div>

                <div className="relative flex items-center justify-center">
                    <svg className="size-64 md:size-80 transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="110"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        {/* Tick marks for technical feel */}
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="50%"
                                y1="12%"
                                x2="50%"
                                y2="16%"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-slate-200"
                                transform={`rotate(${i * 30}, 160, 160)`}
                            />
                        ))}
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="110"
                            stroke="currentColor"
                            strokeWidth="12"
                            strokeDasharray={691}
                            initial={{ strokeDashoffset: 691 }}
                            animate={{ strokeDashoffset: 691 - (score / 100) * 691 }}
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            fill="transparent"
                            className="text-slate-950"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-8xl md:text-9xl font-black text-slate-950 tracking-tighter tabular-nums"
                        >
                            {score}
                        </motion.span>
                        <div className={`flex items-center gap-2 mt-2 px-4 py-1 border font-black text-[9px] uppercase tracking-widest font-mono ${isImproving ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                            }`}>
                            {isImproving ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            VAR::{diff}%_DELTA
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
