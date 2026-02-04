/**
 * API service for interacting with the security scan backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3330/api";

export interface Scan {
    _id: string;
    domain: string;
    mode: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    progressPct: number;
    currentModule?: string;
    score?: number;
    grade?: string;
    results?: any;
    findings?: any[];
    error?: string;
    createdAt: string;
    completedAt?: string;
}

export const api = {
    /**
     * Fetch all scans from the backend.
     */
    async getAllScans(): Promise<Scan[]> {
        const response = await fetch(`${API_URL}/scans`);
        if (!response.ok) throw new Error("Failed to fetch scans");
        return response.json();
    },

    /**
     * Start a new scan.
     */
    async startScan(domain: string, mode: string): Promise<{ success: boolean; scanId: string; message: string }> {
        const response = await fetch(`${API_URL}/scans/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ domain, mode }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to start scan");
        }
        return response.json();
    },

    /**
     * Get status of a specific scan.
     */
    async getScanStatus(scanId: string): Promise<Scan> {
        const response = await fetch(`${API_URL}/scans/status/${scanId}`);
        if (!response.ok) throw new Error("Failed to fetch scan status");
        return response.json();
    },

    /**
     * Get full results of a completed scan.
     */
    async getScanResults(scanId: string): Promise<Scan> {
        const response = await fetch(`${API_URL}/scans/results/${scanId}`);
        if (!response.ok) throw new Error("Failed to fetch scan results");
        return response.json();
    },

    /**
     * Get the URL for a PDF report.
     */
    getReportUrl(scanId: string): string {
        return `${API_URL}/scans/report/${scanId}`;
    },

    /**
     * Stop a running scan.
     */
    async stopScan(scanId: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${API_URL}/scans/stop/${scanId}`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Failed to stop scan");
        return response.json();
    }
};
