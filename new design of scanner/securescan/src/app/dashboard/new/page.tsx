"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { DomainInput } from "@/components/dashboard/domain-input"
import { ScanTypeSelector } from "@/components/dashboard/scan-type-selector"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Rocket, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { useEffect } from "react"

export default function NewScanPage() {
    const [domain, setDomain] = useState("")
    const [scanType, setScanType] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const prefilledDomain = searchParams.get("domain")
        if (prefilledDomain) {
            setDomain(prefilledDomain)
        }
    }, [searchParams])

    const handleStartScan = async () => {
        if (!domain || !scanType) return;

        setLoading(true);
        setError(null);

        try {
            // Map the scan types from UI to backend modes if necessary
            // Backend expects: ["passive", "subdomain", "web", "full"]
            // Assuming UI provides these or needs mapping.
            const mode = scanType.toLowerCase();

            await api.startScan(domain, mode);
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Failed to start scan:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
                    >
                        <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-4">
                        New Security Assessment
                    </h1>
                    <p className="text-slate-500 text-lg font-light max-w-xl mx-auto leading-relaxed">
                        Specify your target domain and choose the assessment depth required for your infrastructure.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Step 1: Target Domain */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="flex items-center justify-center size-8 rounded-full bg-slate-900 text-white text-xs font-bold">1</span>
                            <h2 className="text-lg font-semibold text-slate-900">Define Target Destination</h2>
                        </div>
                        <DomainInput value={domain} onChange={setDomain} />
                    </section>

                    {/* Step 2: Scan Type Selection */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="flex items-center justify-center size-8 rounded-full bg-slate-900 text-white text-xs font-bold">2</span>
                            <h2 className="text-lg font-semibold text-slate-900">Select Assessment Intensity</h2>
                        </div>
                        <ScanTypeSelector selected={scanType} onSelect={setScanType} />
                    </section>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {/* Action Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pt-8 border-t border-slate-100 flex items-center justify-end"
                    >
                        <Button
                            size="lg"
                            disabled={!domain || !scanType || loading}
                            onClick={handleStartScan}
                            className="h-14 px-10 bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 text-white font-semibold transition-all disabled:opacity-50 disabled:grayscale group"
                        >
                            {loading ? (
                                <>
                                    Initiating...
                                    <Loader2 className="ml-3 size-4 animate-spin" />
                                </>
                            ) : (
                                <>
                                    Start Security Assessment
                                    <Rocket className="ml-3 size-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
