"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    Map,
    Search,
    Zap,
    ArrowRight,
    ChevronRight,
    Globe,
    Database,
    Lock
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { RecentAssessments } from "@/components/dashboard/assessments/recent-assessments"

const features = [
    {
        icon: Map,
        title: "Perimeter Mapping",
        description: "Our autonomous agents perform deep discovery of subdomains, hidden assets, and exposed infrastructure to build a complete visual map of your attack surface.",
        color: "blue"
    },
    {
        icon: Search,
        title: "Intelligence Gathering",
        description: "We leverage OSINT techniques and specialized web crawlers to identify leaked credentials, sensitive metadata, and leaked repository references.",
        color: "indigo"
    },
    {
        icon: Zap,
        title: "Attack Simulation",
        description: "Safe, non-destructive testing of common vulnerabilities (E.g. SQLi, XSS, Broken Auth) using high-fidelity agents that mimic real-world adversary behavior.",
        color: "emerald"
    }
]

const methodologies = [
    {
        name: "Passive Discovery",
        duration: "2-5 Mins",
        focus: "DNS, OSINT, WHOIS",
        description: "Lightweight sweep of public records and metadata without touching your servers.",
        tier: "Starter"
    },
    {
        name: "Standard Audit",
        duration: "10-20 Mins",
        focus: "Ports, Services, SSL",
        description: "Direct infrastructure analysis and service identification for common endpoints.",
        tier: "Professional"
    },
    {
        name: "Full Penetration",
        duration: "45-60 Mins",
        focus: "Full Stack Simulation",
        description: "Comprehensive vulnerability testing including application-layer logic and breach paths.",
        tier: "Enterprise"
    }
]

const colorMap: Record<string, { bg: string, text: string, shadow: string }> = {
    blue: { bg: "bg-slate-100", text: "text-slate-900", shadow: "shadow-slate-100" },
    indigo: { bg: "bg-slate-100", text: "text-slate-900", shadow: "shadow-slate-100" },
    emerald: { bg: "bg-slate-100", text: "text-slate-900", shadow: "shadow-slate-100" },
}

export default function AssessmentsHubPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
                {/* Header Section */}
                <div className="max-w-3xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 block mb-6">Security Intelligence</span>
                        <h1 className="text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-8">
                            Autonomous Infrastructure <span className="text-slate-500">Assessments</span>
                        </h1>
                        <p className="text-slate-500 text-xl font-light leading-relaxed mb-10">
                            Go beyond simple scanning. Our autonomous agents perform multi-layered analysis of your digital footprint to find gaps before adversaries do.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/dashboard/new">
                                <Button size="lg" className="h-14 px-10 bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 text-white font-bold text-xs uppercase tracking-widest transition-all group">
                                    Initiate Now
                                    <ArrowRight className="ml-3 size-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="h-14 px-10 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 hover:border-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
                                Download Methodology
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {features.map((feature, index) => {
                        const colors = colorMap[feature.color] || colorMap.blue
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-slate-200 transition-all group shadow-sm hover:shadow-xl hover:shadow-slate-200/20"
                            >
                                <div className={cn(
                                    "p-4 rounded-2xl inline-block mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm",
                                    colors.bg,
                                    colors.text,
                                    colors.shadow
                                )}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-slate-500 font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Methodology Tiers */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-xl text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Assessment Tiers</h2>
                            <p className="text-slate-500 font-light">Choose the depth and intensity that matches your technical requirements.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {methodologies.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white border border-slate-100 rounded-3xl p-8 hover:ring-2 hover:ring-slate-900/10 transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                                            {tier.tier}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                                            <Zap size={14} className="text-slate-900" />
                                            {tier.duration}
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{tier.name}</h4>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-6">
                                        {tier.description}
                                    </p>
                                    <div className="space-y-3 pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                                            <ChevronRight size={14} className="text-slate-300" />
                                            {tier.focus}
                                        </div>
                                    </div>
                                </div>
                                <Link href="/dashboard/new" className="mt-8">
                                    <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest border border-slate-100 group-hover:border-slate-900">
                                        Select Plan
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* History Section */}
                <RecentAssessments />

                {/* Technical Stack / Assurance */}
                <div className="bg-white border border-slate-100 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center shadow-sm">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Enterprise-Grade Assurance</h2>
                        <p className="text-slate-500 font-light mb-12 text-lg">
                            Our autonomous scanning engine utilizes industry-standard vulnerability signatures and behavioral analysis to provide high-precision results for modern cloud infrastructure.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale">
                            <Globe size={32} className="text-slate-400" />
                            <Database size={32} className="text-slate-400" />
                            <ShieldCheck size={32} className="text-slate-400" />
                            <Lock size={32} className="text-slate-400" />
                        </div>
                    </div>
                    <div className="absolute -top-24 -right-24 size-96 bg-slate-50 rounded-full blur-3xl -z-0" />
                    <div className="absolute -bottom-24 -left-24 size-96 bg-slate-100/30 rounded-full blur-3xl -z-0" />
                </div>
            </div>
        </main>
    )
}
