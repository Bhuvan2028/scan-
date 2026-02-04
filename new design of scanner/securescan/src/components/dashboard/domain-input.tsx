"use client"

import { Globe, Search } from "lucide-react"

interface DomainInputProps {
    value: string
    onChange: (val: string) => void
}

export function DomainInput({ value, onChange }: DomainInputProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Globe className="size-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            </div>
            <input
                type="text"
                placeholder="example.com or https://api.yourdomain.io"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-16 pl-16 pr-6 bg-white border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-lg font-light shadow-sm"
            />
            <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest hidden sm:block">Target URI</span>
            </div>
        </div>
    )
}
