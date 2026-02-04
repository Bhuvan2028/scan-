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
        <div className="bg-white rounded-3xl p-10 md:p-14 relative overflow-hidden group ring-1 ring-slate-100 shadow-sm">
            {/* Background Decor - Subtle for Minimalism */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 size-96 bg-slate-50 rounded-full blur-3xl group-hover:bg-slate-100 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-900/10">
                            <Shield className="size-8" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Total Security Posture</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">Security Health</h2>
                    <p className="text-slate-500 text-lg font-light max-w-md leading-relaxed">
                        Global security score calculated from 9 critical infrastructure benchmarks.
                    </p>
                </div>

                <div className="relative flex items-center justify-center">
                    <svg className="size-56 md:size-64 transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-slate-50"
                        />
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="14"
                            strokeDasharray={502.6}
                            initial={{ strokeDashoffset: 502.6 }}
                            animate={{ strokeDashoffset: 502.6 - (score / 100) * 502.6 }}
                            transition={{ duration: 2, ease: "circOut" }}
                            fill="transparent"
                            strokeLinecap="round"
                            className="text-slate-900"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-7xl md:text-8xl font-bold text-slate-900 tracking-tighter tabular-nums"
                        >
                            {score}
                        </motion.span>
                        <div className={`flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isImproving ? "bg-slate-900 text-white" : "bg-white text-slate-400 border border-slate-100"
                            }`}>
                            {isImproving ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {diff}% vs Last
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
