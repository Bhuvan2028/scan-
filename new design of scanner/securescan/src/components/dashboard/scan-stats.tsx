"use client"

import { motion } from "framer-motion"
import { Shield, Activity, BarChart3 } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { Scan } from "@/lib/api"

interface ScanStatsProps {
    scans: Scan[];
}

export function ScanStats({ scans }: ScanStatsProps) {
    const totalScans = scans.length;
    const activeScansCount = scans.filter(s => s.status === 'running' || s.status === 'pending').length;

    // Calculate average risk score (0-100 to 0-10 scale)
    const completedWithScore = scans.filter(s => s.score !== undefined && s.score !== null);
    const avgScore = completedWithScore.length > 0
        ? (completedWithScore.reduce((acc, s) => acc + (s.score || 0), 0) / completedWithScore.length / 10).toFixed(1)
        : "0.0";

    const stats = [
        {
            label: "Total Scans",
            value: totalScans.toLocaleString(),
            icon: Shield,
            change: scans.length > 0 ? "Active" : "None",
            trend: "up"
        },
        {
            label: "Active Nodes",
            value: activeScansCount.toString(),
            icon: Activity,
            change: "Live",
            trend: "neutral"
        },
        {
            label: "Risk Score",
            value: avgScore,
            icon: BarChart3,
            change: "Avg",
            trend: "down"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <TiltCard key={stat.label} degree={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-8 bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm hover:shadow-md transition-shadow group h-full"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors text-slate-600">
                                <stat.icon size={24} />
                            </div>
                            {stat.trend !== "neutral" && (
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.trend === "up" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400"
                                    }`}>
                                    {stat.change}
                                </span>
                            )}
                            {stat.trend === "neutral" && (
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 animate-pulse border border-slate-100">
                                    {stat.change}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-semibold text-slate-900 tracking-tight">{stat.value}</h3>
                        </div>
                    </motion.div>
                </TiltCard>
            ))}
        </div>
    )
}
