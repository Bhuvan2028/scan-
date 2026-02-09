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
        <main className="min-h-screen bg-white selection:bg-purple-50 selection:text-primary">
            <SurgicalGrid />
            <Navbar />
            <PortalTransition>
                {children}
            </PortalTransition>
        </main>
    )
}
