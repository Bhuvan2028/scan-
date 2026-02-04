"use client"

import { motion } from "framer-motion"
import {
    Lock,
    Globe,
    RefreshCw,
    Cpu,
    AlertOctagon,
    FileText,
    Mail,
    Server,
    LucideIcon,
    Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TiltCard } from "@/components/ui/tilt-card"

interface Metric {
    name: string
    score: number
    icon: LucideIcon
    color: string
}

const metrics: Metric[] = [
    { name: "DNS Security", score: 92, icon: Globe, color: "blue" },
    { name: "Web Encryption", score: 88, icon: Lock, color: "indigo" },
    { name: "Network Security", score: 74, icon: Cpu, color: "emerald" },
    { name: "Patching Posture", score: 65, icon: RefreshCw, color: "amber" },
    { name: "Application Security", score: 95, icon: FileText, color: "violet" },
    { name: "Breach Events", score: 100, icon: AlertOctagon, color: "rose" },
    { name: "System Reputation", score: 82, icon: Shield, color: "sky" },
    { name: "Email Security", score: 71, icon: Mail, color: "blue" },
    { name: "System Hosting", score: 89, icon: Server, color: "slate" }
]


const colorMap: Record<string, { bg: string, text: string, bar: string }> = {
    blue: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    indigo: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    emerald: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    amber: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    violet: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    rose: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    sky: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    slate: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
}

import { Scan } from "@/lib/api"

interface MetricGridProps {
    scan?: Scan
}

export function MetricGrid({ scan }: MetricGridProps) {
    const results = scan?.results || {}
    const findings = scan?.findings || []

    const countHits = (keywords: string[]) =>
        findings.filter(f => new RegExp(keywords.join('|'), 'i').test(f.title || f.raw || "")).length

    // Define the structure of our metrics based on backend logic
    const runtimeMetrics: Metric[] = [
        {
            name: "DNS Security",
            score: Math.round(Math.max(0, 10 - (results.subdomains?.length || 0) * 0.05) * 10),
            icon: Globe,
            color: "blue"
        },
        {
            name: "Web Encryption",
            score: Math.round(Math.max(0, 10 - countHits(['ssl', 'tls', 'https', 'cert']) * 1.5) * 10),
            icon: Lock,
            color: "indigo"
        },
        {
            name: "Network Security",
            score: Math.round(Math.max(0, 10 - (results.openPorts?.length || 0) * 0.5) * 10),
            icon: Cpu,
            color: "emerald"
        },
        {
            name: "Software Patching",
            score: Math.round(Math.max(0, 10 - countHits(['version', 'outdated', 'cve', 'patch']) * 2) * 10),
            icon: RefreshCw,
            color: "amber"
        },
        {
            name: "Application Security",
            score: Math.round(Math.max(0, 10 - countHits(['sql', 'xss', 'injection', 'broken', 'auth', 'csrf', 'ssrf', 'rce', 'file']) * 1.5) * 10),
            icon: FileText,
            color: "violet"
        },
        {
            name: "Breach Events",
            score: Math.round(Math.max(0, 10 - countHits(['secret', 'key', 'leak', 'exposed', 'token', 'password', 'credential']) * 2.5) * 10),
            icon: AlertOctagon,
            color: "rose"
        },
        {
            name: "System Reputation",
            score: Math.round(Math.max(0, 10 - countHits(['blacklist', 'reputation', 'malicious', 'phishing']) * 3.0) * 10),
            icon: Shield,
            color: "sky"
        },
        {
            name: "Email Security",
            score: Math.round(Math.max(0, 10 - countHits(['spf', 'dkim', 'dmarc', 'email']) * 2.0) * 10),
            icon: Mail,
            color: "blue"
        },
        {
            name: "System Hosting",
            score: Math.round(Math.max(0, 10 - countHits(['cloud', 'bucket', 'aws', 'azure', 'gcp', 's3', 'storage', 'lambda', 'instance']) * 1.0) * 10),
            icon: Server,
            color: "slate"
        }
    ]

    const displayMetrics = scan ? runtimeMetrics : metrics

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMetrics.map((metric, index) => {
                const colors = colorMap[metric.color] || colorMap.blue
                return (
                    <TiltCard key={metric.name} degree={10}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all group hover:shadow-xl hover:shadow-slate-200/20 h-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={cn(
                                    "p-3 rounded-2xl transition-all duration-300",
                                    colors.bg,
                                    colors.text,
                                    "group-hover:scale-110"
                                )}>
                                    <metric.icon size={24} />
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 block">Rating</span>
                                    <span className={cn(
                                        "text-2xl font-bold",
                                        metric.score >= 90 ? "text-slate-900" : "text-slate-500"
                                    )}>
                                        {metric.score}%
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 mb-2 truncate">{metric.name}</h3>
                            <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric.score}%` }}
                                    transition={{ duration: 1.5, delay: 0.5 + index * 0.05 }}
                                    className={cn(
                                        "h-full rounded-full transition-colors",
                                        metric.score >= 70 ? "bg-slate-900" : "bg-slate-400"
                                    )}
                                />
                            </div>
                        </motion.div>
                    </TiltCard>
                )
            })}
        </div>
    )
}
