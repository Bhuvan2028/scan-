"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Target, TrendingDown, ShieldCheck, Globe, Lock, Cpu, Activity, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const Counter = ({ value, suffix = "", duration = 2, delay = 0, oscillation = false }: { value: number | string, suffix?: string, duration?: number, delay?: number, oscillation?: boolean }) => {
    const [count, setCount] = useState(0)
    const [isLocked, setIsLocked] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const numericValue = typeof value === "number" ? value : parseFloat(value.toString())

    useEffect(() => {
        if (isInView) {
            if (oscillation) {
                // Oscillation logic: 98.5 -> 99.1 -> 99.99 -> final
                const sequence = [98.5, 99.1, 99.99, numericValue]
                let step = 0
                const runSequence = () => {
                    if (step < sequence.length) {
                        setCount(sequence[step])
                        step++
                        setTimeout(runSequence, 400)
                    } else {
                        setIsLocked(true)
                    }
                }
                setTimeout(runSequence, delay * 1000)
            } else {
                let start = 0
                const end = numericValue
                const increment = end / (duration * 60)
                const timer = setInterval(() => {
                    start += increment
                    if (start >= end) {
                        setCount(end)
                        clearInterval(timer)
                        setIsLocked(true)
                    } else {
                        setCount(start)
                    }
                }, 1000 / 60)
                return () => clearInterval(timer)
            }
        }
    }, [isInView, numericValue, duration, oscillation, delay])

    return (
        <motion.span
            ref={ref}
            animate={{ color: isLocked && oscillation ? "#3b82f6" : "inherit" }}
            className="transition-colors duration-500"
        >
            {count.toFixed(2)}{suffix}
        </motion.span>
    )
}

const MetricCard = ({
    title,
    value,
    subtitle,
    description,
    icon: Icon,
    children,
    color = "blue",
    valueLabel
}: {
    title: string,
    value: React.ReactNode,
    subtitle: string,
    description: string,
    icon: LucideIcon,
    children?: React.ReactNode,
    color?: "blue" | "emerald" | "indigo",
    valueLabel?: string
}) => {
    const colors = {
        blue: "text-blue-600 bg-blue-50 border-blue-100",
        emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
        indigo: "text-indigo-600 bg-indigo-50 border-indigo-100"
    }

    const shadows = {
        blue: "hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.15)]",
        emerald: "hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)]",
        indigo: "hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.15)]"
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={cn(
                "flex-1 bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm relative overflow-hidden group transition-all duration-500",
                shadows[color]
            )}
        >
            <div className="relative z-10">
                <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 border", colors[color])}>
                    <Icon size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
                </div>

                <div className="mb-6">
                    <h3 className="text-6xl font-black tracking-tighter text-slate-900 mb-2 leading-none">
                        {value}
                    </h3>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{subtitle}</p>
                        {valueLabel && (
                            <span className="text-[9px] font-bold text-blue-500/60 font-mono tracking-tighter">{valueLabel}</span>
                        )}
                    </div>
                </div>

                <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm">
                    {description}
                </p>

                <div className="min-h-[140px] flex items-center justify-center">
                    {children}
                </div>
            </div>

            {/* Glass Border Effect */}
            <div className="absolute inset-0 border border-white/20 rounded-[32px] pointer-events-none" />

            {/* Background Shimmer */}
            <div className={cn(
                "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            )} />
        </motion.div>
    )
}

const PrecisionDialWidget = () => (
    <div className="relative size-40 flex items-center justify-center">
        {/* Scope Rings */}
        {[0, 1].map((i) => (
            <motion.div
                key={i}
                className="absolute border border-blue-200/50 rounded-full"
                style={{ width: `${60 + i * 30}%`, height: `${60 + i * 30}%` }}
                animate={{ rotate: i === 0 ? 360 : -360 }}
                transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
            >
                {/* Dial Notches */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-blue-400/40" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-blue-400/40" />
            </motion.div>
        ))}

        {/* Rotating Dial */}
        <motion.div
            className="absolute size-[80%] border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central Lock-on Core */}
        <motion.div
            animate={{
                scale: [1, 1.05, 1],
                backgroundColor: ["rgba(37, 99, 235, 1)", "rgba(59, 130, 246, 1)", "rgba(37, 99, 235, 1)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="size-10 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] z-10"
        >
            <div className="size-2.5 rounded-full bg-white animate-pulse" />
        </motion.div>

        {/* Dynamic Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-blue-500/10" />
            <div className="h-full w-px bg-blue-500/10 absolute" />
        </div>
    </div>
)

const TimeCompressionWidget = () => {
    const [isFinished, setIsFinished] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <div ref={ref} className="w-full max-w-[240px] flex flex-col gap-6 py-4">
            {/* Manual Line */}
            <div className="space-y-2">
                <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Manual_Audit</span>
                    <span>Processing...</span>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "20%" } : { width: 0 }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-slate-300"
                    />
                </div>
            </div>

            {/* iSecurity Line */}
            <div className="space-y-2 relative">
                <div className="flex justify-between text-[8px] font-black text-blue-600 uppercase tracking-widest">
                    <span>iSecurity_Scan</span>
                    <span>100%_Locked</span>
                </div>
                <div className="h-1.5 w-full bg-blue-50 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0, left: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        onAnimationComplete={() => setIsFinished(true)}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-blue-500 relative"
                    >
                        <motion.div
                            className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/50 skew-x-12"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    </motion.div>
                </div>

                {/* Laser Tip effect */}
                <motion.div
                    initial={{ left: 0 }}
                    animate={isInView ? { left: "100%" } : { left: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-1 size-2 bg-blue-600 rounded-full blur-[2px] z-10"
                />
            </div>

            {/* Time Saving Visualizer */}
            <AnimatePresence>
                {isFinished && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="flex flex-col items-center justify-center border-t border-emerald-500/20 pt-4"
                    >
                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">
                            85%_TIME_SAVED
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-[8px] font-bold text-emerald-400"
                        >
                            PROCESS_OPTIMIZED
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const HolographicShieldWidget = () => (
    <div className="relative size-40 flex items-center justify-center group/shield mt-4">
        {/* Layered Glass Stack */}
        <div className="relative w-24 h-24">
            {/* ISO 27001 - Bottom */}
            <motion.div
                initial={{ y: 0, rotateX: 45, rotateZ: 45, scale: 0.8 }}
                whileHover={{ y: 40, opacity: 0.5 }}
                className="absolute inset-0 bg-indigo-500/5 backdrop-blur-md border border-indigo-500/20 rounded-2xl flex flex-col items-center justify-center"
            >
                <span className="text-[8px] font-black text-indigo-400 rotate-[-45deg]">ISO_27001</span>
            </motion.div>

            {/* SOC 2 - Middle */}
            <motion.div
                initial={{ y: 0, rotateX: 45, rotateZ: 45, scale: 0.9 }}
                whileHover={{ y: 0, scale: 1 }}
                className="absolute inset-0 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/30 rounded-2xl flex flex-col items-center justify-center z-10"
            >
                <span className="text-[8px] font-black text-indigo-500 rotate-[-45deg]">SOC2_TYPE_II</span>
            </motion.div>

            {/* Logo/Core - Top */}
            <motion.div
                initial={{ y: 0, rotateX: 45, rotateZ: 45, scale: 1 }}
                whileHover={{ y: -40, scale: 1.1 }}
                className="absolute inset-0 bg-indigo-600 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col items-center justify-center z-20 shadow-2xl shadow-indigo-500/30"
            >
                <div className="rotate-[-45deg]">
                    <Lock size={20} className="text-white" />
                </div>
            </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] rounded-full -z-10" />
    </div>
)

export function OutcomeMetrics() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 shadow-2xl text-white mb-6"
                    >
                        <ShieldCheck size={12} className="text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Performance Lab</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.85] mb-8"
                    >
                        Precision Grade. <br />
                        <span className="text-blue-600 italic">Sovereign Proof.</span>
                    </motion.h2>
                    <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto leading-relaxed">
                        Processing millions of asynchronous security signals to deliver <br className="hidden md:block" />
                        one singular truth: <span className="text-slate-900 font-bold">absolute system integrity.</span>
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    <MetricCard
                        title="Detection Precision"
                        value={<Counter value={99.98} oscillation suffix="%" />}
                        valueLabel="FALSE_POSITIVE: <0.02%"
                        subtitle="Accuracy Index"
                        description="Eliminating protocol noise with proprietary AI logic, ensuring every security alert is actionable and high-fidelity."
                        icon={Target}
                        color="blue"
                    >
                        <PrecisionDialWidget />
                    </MetricCard>

                    <MetricCard
                        title="Time-to-Verdict"
                        value={<Counter value={85} suffix="%" />}
                        subtitle="Auditing Overhead"
                        description="Drastically reducing manual burden through autonomous dissection of infrastructure health and threat vectors."
                        icon={TrendingDown}
                        color="emerald"
                    >
                        <TimeCompressionWidget />
                    </MetricCard>

                    <MetricCard
                        title="Integrity Standard"
                        value="Sovereign"
                        subtitle="Compliance Layer"
                        description="Built on ISO/SOC2 hardened protocols to ensure your organizational data remains sovereign and logically protected."
                        icon={ShieldCheck}
                        color="indigo"
                    >
                        <HolographicShieldWidget />
                    </MetricCard>
                </div>
            </div>

            {/* Live Audit Ticker */}
            <div className="mt-32 w-full bg-slate-50 border-y border-slate-100 py-4 flex overflow-hidden whitespace-nowrap relative">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex gap-20 items-center px-10"
                >
                    {[0, 1].map((n) => (
                        <div key={n} className="flex gap-20 items-center">
                            <div className="flex items-center gap-3">
                                <Activity size={12} className="text-blue-500" />
                                <span className="text-[10px] font-black font-mono text-slate-400">
                                    [AUDIT_LOG]: <span className="text-slate-900">14,203 threats neutralized in last hour</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Cpu size={12} className="text-blue-500" />
                                <span className="text-[10px] font-black font-mono text-slate-400">
                                    [SYS_HEALTH]: <span className="text-blue-900">100% OPERATIONAL</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe size={12} className="text-blue-500" />
                                <span className="text-[10px] font-black font-mono text-slate-400">
                                    [AVG_LATENCY]: <span className="text-slate-900">42ms_GLOBAL_CDN</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-black font-mono text-slate-400 uppercase">
                                    [PROTOCOL_SIG]: <span className="text-emerald-600">VERIFIED_BLOCK_782394</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Fades */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        </section>
    )
}
