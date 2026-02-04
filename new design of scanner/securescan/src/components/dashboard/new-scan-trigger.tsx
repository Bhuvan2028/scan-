"use client"

import { Plus, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function NewScanTrigger() {
    return (
        <Link href="/dashboard/assessments">
            <Button
                className="h-14 px-8 bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-lg shadow-slate-900/10 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] group"
                onClick={() => console.log("Initiating new scan...")}
            >
                <div className="mr-3 p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Plus size={18} />
                </div>
                Initiate New Scan
                <Zap className="ml-3 size-4 text-slate-400" />
            </Button>
        </Link>
    )
}
