"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { Button } from "@/components/ui/button"
import {
    User,
    Shield,
    CreditCard,
    Camera,
    Mail,
    Building,
    ChevronRight,
    Lock,
    Key,
    Fingerprint,
    Zap
} from "lucide-react"

const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "subscription", label: "Subscription", icon: CreditCard }
]

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("account")

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
                {/* Profile Header */}
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div className="flex items-center gap-8">
                            <div className="relative group">
                                <div className="size-24 md:size-32 rounded-[2rem] bg-slate-200 overflow-hidden border-4 border-white shadow-xl">
                                    <ImagePlaceholder />
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-slate-800 transition-all group-hover:scale-110">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">Alex Rivera</h1>
                                <p className="text-slate-500 font-light flex items-center gap-2">
                                    <Mail size={16} /> alex@isecurify.io
                                </p>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-900">
                                        Enterprise
                                    </span>
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200">
                                        Admin
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Tab Navigation */}
                <div className="flex items-center gap-1 p-1 bg-slate-100/50 rounded-2xl w-fit mb-12 border border-slate-200/60 backdrop-blur-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                                : "text-slate-500 hover:text-slate-800"
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === "account" && <AccountTab />}
                            {activeTab === "security" && <SecurityTab />}
                            {activeTab === "subscription" && <SubscriptionTab />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}

function ImagePlaceholder() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-400 to-slate-900">
            <User className="text-white opacity-20" size={64} />
        </div>
    )
}

function AccountTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <User size={20} className="text-slate-900" /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                            <input type="text" defaultValue="Alex Rivera" className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                            <input type="email" defaultValue="alex@isecurify.io" className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title</label>
                            <input type="text" defaultValue="Security Specialist" className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timezone</label>
                            <select className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium appearance-none">
                                <option>GMT +05:30 (India Standard Time)</option>
                                <option>GMT -08:00 (Pacific Time)</option>
                            </select>
                        </div>
                    </div>
                    <Button className="mt-10 h-11 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/10 text-white font-bold text-xs uppercase tracking-widest">
                        Save Changes
                    </Button>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Building size={20} className="text-slate-900" /> Organization Setting
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Name</label>
                            <input type="text" defaultValue="iSecurify Autonomous Inc." className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Identity Verified</h4>
                        <p className="text-slate-500 text-xs font-light leading-relaxed mb-6">
                            Your account is secured with biometric verification and encrypted sessions.
                        </p>
                        <Button variant="outline" className="w-full h-11 rounded-xl border-slate-100 text-slate-600 hover:bg-slate-50 text-[10px] font-bold uppercase tracking-widest">
                            Manage Identity
                        </Button>
                    </div>
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 bg-slate-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    )
}

function SecurityTab() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="p-4 bg-slate-900 text-white rounded-2xl w-fit mb-6 shadow-sm shadow-slate-100">
                        <Fingerprint size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-Factor Authentication</h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
                        Secure your account by requiring an additional layer of verification on login.
                    </p>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="size-2 bg-slate-900 rounded-full shadow-lg shadow-slate-900/50" />
                            <span className="text-sm font-bold text-slate-900">MFA is Active</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase border-slate-200">
                            Configure
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="p-4 bg-slate-50 text-slate-900 rounded-2xl w-fit mb-6 shadow-sm shadow-slate-100">
                        <Key size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">API Security</h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
                        Manage tokens for autonomous engine integration and automated reporting.
                    </p>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-900">4 Active Tokens</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase border-slate-200">
                            Manage
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <Lock size={20} className="text-slate-900" /> Password Management
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Password</label>
                        <input type="password" placeholder="••••••••••••" className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">New Password</label>
                        <input type="password" placeholder="••••••••••••" className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all text-sm font-medium" />
                    </div>
                </div>
                <Button className="h-11 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest">
                    Update Password
                </Button>
            </div>
        </div>
    )
}

function SubscriptionTab() {
    return (
        <div className="space-y-8">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6 border border-slate-900">
                            <Zap size={14} className="fill-white" /> Current Plan
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Enterprise Infrastructure</h2>
                        <p className="text-slate-500 font-light max-w-md text-lg leading-relaxed mb-8">
                            Complete autonomy with unlimited assessments and priority agent scheduling.
                        </p>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-2xl font-bold text-slate-900 tracking-tight">$499<span className="text-sm font-medium text-slate-400">/mo</span></p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Billed Yearly</p>
                            </div>
                            <div className="w-px h-10 bg-slate-100" />
                            <div>
                                <p className="text-2xl font-bold text-slate-900 tracking-tight">Unlimited</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Assessment Capacity</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Button className="w-full h-14 px-10 bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 text-white font-bold text-xs uppercase tracking-widest transition-all">
                            Manage Subscription
                        </Button>
                        <Button variant="outline" className="w-full h-14 px-10 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
                            View Invoices
                        </Button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 -mr-24 -mt-24 size-[500px] bg-slate-100 rounded-full blur-3xl -z-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Usage Summary</p>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-700">Monthly Scans</span>
                                <span className="text-xs font-bold text-slate-900">42/100</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-[42%] bg-slate-900 rounded-full" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-700">API Calls</span>
                                <span className="text-xs font-bold text-slate-500">8.4k/50k</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-[17%] bg-slate-400 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
