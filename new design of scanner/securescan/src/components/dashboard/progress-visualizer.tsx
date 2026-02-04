"use client"

import { motion } from "framer-motion"

interface ProgressVisualizerProps {
    progress: number
    status: string
}

export function ProgressVisualizer({ progress, status }: ProgressVisualizerProps) {
    const radius = 80
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="relative flex items-center justify-center">
            <svg className="size-48 md:size-56 transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                />
                {/* Progress Circle */}
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    fill="transparent"
                    strokeLinecap="round"
                    className="text-slate-900"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-5xl font-bold text-slate-900 tabular-nums"
                >
                    {progress}%
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs font-bold text-slate-900 uppercase tracking-widest mt-1"
                >
                    {status}
                </motion.span>
            </div>

            <div className="absolute -inset-4 bg-slate-900/5 rounded-full blur-3xl -z-10" />
        </div>
    )
}
