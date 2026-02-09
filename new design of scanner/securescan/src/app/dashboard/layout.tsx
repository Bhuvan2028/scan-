"use client"

import { Navbar } from "@/components/marketing/navbar"
import { SurgicalGrid } from "@/components/ui/surgical-grid"
import { PortalTransition } from "@/components/ui/portal-transition"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            <SurgicalGrid />
            <Navbar />
            <PortalTransition>
                {children}
            </PortalTransition>
        </main>
    )
}
