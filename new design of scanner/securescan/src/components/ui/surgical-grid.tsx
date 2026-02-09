"use client"

import { motion } from "framer-motion"

export function SurgicalGrid() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
            {/* Base Coordinate Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(226 232 240) 1px, transparent 0)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Subtle Gradient Overlay to fade grid at edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 opacity-60" />

            {/* Decorative Corner Accents (Surgical Brackets) */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-slate-200" />
            <div className="absolute top-12 right-12 w-8 h-8 border-t-2 border-r-2 border-slate-200" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-b-2 border-l-2 border-slate-200" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-slate-200" />

            {/* Faint Horizontal Scanning Line (Very slow, 20s loop) */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2
                }}
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent z-10"
            />
        </div>
    )
}
