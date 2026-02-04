"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { Button } from "@/components/ui/button"
import {
    Settings,
    Bell,
    Shield,
    Code,
    Monitor,
    Globe,
    Clock,
    Calendar,
    Check,
    RotateCcw,
    Save
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API & Integrations", icon: Code }
]

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("general")
    const [theme, setTheme] = useState("auto")

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 space-y-2">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
                            <p className="text-slate-500 text-xs font-light mt-1 uppercase tracking-widest">Global Configuration</p>
                        </div>
                        <nav className="space-y-1">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                        activeSection === item.id
                                            ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                                    )}
                                >
                                    <item.icon size={18} className={cn(activeSection === item.id ? "text-white" : "text-slate-400")} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 max-w-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                {activeSection === "general" && (
                                    <>
                                        {/* Site Configuration */}
                                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                            <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Site Configuration</h3>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Name</label>
                                                    <input
                                                        type="text"
                                                        defaultValue="Security Dashboard"
                                                        className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Description</label>
                                                    <textarea
                                                        rows={2}
                                                        defaultValue="Comprehensive security scanning and assessment platform"
                                                        className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium resize-none"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                            <Globe size={12} /> Default Language
                                                        </label>
                                                        <select className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all text-sm font-medium appearance-none">
                                                            <option>English</option>
                                                            <option>Spanish</option>
                                                            <option>German</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                            <Clock size={12} /> Timezone
                                                        </label>
                                                        <select className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all text-sm font-medium appearance-none">
                                                            <option>UTC (Coordinated Universal Time)</option>
                                                            <option>PST (Pacific Standard Time)</option>
                                                            <option>IST (India Standard Time)</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                        <Calendar size={12} /> Date Format
                                                    </label>
                                                    <select className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all text-sm font-medium appearance-none">
                                                        <option>MM/DD/YYYY</option>
                                                        <option>DD/MM/YYYY</option>
                                                        <option>YYYY-MM-DD</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Theme Selection */}
                                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                            <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Display Theme</h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {[
                                                    { id: "light", label: "Light", desc: "Default Workspace", color: "bg-white border-slate-200" },
                                                    { id: "dark", label: "Dark", desc: "Low Light Mode", color: "bg-slate-900 border-slate-800" },
                                                    { id: "auto", label: "Auto", desc: "System Sync", color: "bg-gradient-to-br from-white to-slate-900 border-slate-200" }
                                                ].map((t) => (
                                                    <button
                                                        key={t.id}
                                                        onClick={() => setTheme(t.id)}
                                                        className={cn(
                                                            "p-4 rounded-[1.5rem] border-2 text-left transition-all relative group",
                                                            theme === t.id ? "border-slate-900 bg-slate-50/50" : "border-slate-50 hover:border-slate-100"
                                                        )}
                                                    >
                                                        {theme === t.id && (
                                                            <div className="absolute top-4 right-4 text-slate-900">
                                                                <Check size={16} />
                                                            </div>
                                                        )}
                                                        <div className={cn("size-10 rounded-xl mb-4 shadow-sm", t.color)} />
                                                        <p className="text-sm font-bold text-slate-900">{t.label}</p>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{t.desc}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                                            <Button className="w-full sm:w-auto h-12 px-10 bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                                <Save size={16} /> Save Settings
                                            </Button>
                                            <Button variant="ghost" className="w-full sm:w-auto h-12 px-10 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                                <RotateCcw size={16} /> Reset to Defaults
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {activeSection !== "general" && (
                                    <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 border-dashed text-center">
                                        <div className="p-4 bg-slate-50 text-slate-300 rounded-full w-fit mx-auto mb-6">
                                            <Monitor size={48} strokeWidth={1} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{navigation.find(n => n.id === activeSection)?.label} Settings</h3>
                                        <p className="text-slate-400 font-light text-sm">Experimental modules currently under maintenance.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    )
}
