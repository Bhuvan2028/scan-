"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Clock, ChevronRight, FileText, Activity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const history = [
    {
        id: "S-5042",
        date: "Jan 28, 2026",
        verdict: "Safe",
        status: "success",
        target: "production-main",
        type: "Full Penetration"
    },
    {
        id: "S-5041",
        date: "Jan 27, 2026",
        verdict: "Action Req.",
        status: "error",
        target: "legacy-v3-api",
        type: "Standard Audit"
    },
    {
        id: "S-5040",
        date: "Jan 27, 2026",
        verdict: "Safe",
        status: "success",
        target: "auth-gateway",
        type: "Passive Discovery"
    }
]

export function RecentAssessments() {
    return (
        <section className="mb-32">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Recent History</h2>
                    <p className="text-slate-500 font-light">Direct access to your most recent security assessment reports.</p>
                </div>
                <Link href="/dashboard/history">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-6 text-slate-600 hover:bg-white shadow-sm font-bold text-xs uppercase tracking-widest">
                        View All History
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {history.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/20 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl ${item.status === "success" ? "bg-slate-900 text-white shadow-sm shadow-slate-100" : "bg-slate-50 text-slate-400 shadow-sm shadow-slate-50"
                                }`}>
                                {item.status === "success" ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-lg font-bold text-slate-900">{item.target}</h4>
                                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md border border-slate-100">
                                        {item.id}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-500 text-xs font-light">
                                    <span className="flex items-center gap-1.5"><Activity size={14} className="text-slate-900" />{item.type}</span>
                                    <span className="size-1 bg-slate-200 rounded-full" />
                                    <span className="flex items-center gap-1.5"><Clock size={14} />{item.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 md:pt-0 pt-4 border-t border-slate-50 md:border-0">
                            <div className="text-right mr-4 hidden sm:block">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Verdict</p>
                                <p className={`text-sm font-bold ${item.status === "success" ? "text-slate-900" : "text-slate-500"}`}>
                                    {item.verdict}
                                </p>
                            </div>
                            <Link href={`/dashboard/result/${item.id}`}>
                                <Button variant="outline" size="sm" className="h-11 px-6 rounded-xl border-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <FileText size={16} />
                                    View Report
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
