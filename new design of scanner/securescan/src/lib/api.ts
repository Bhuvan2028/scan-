/**
 * API service for interacting with the security scan backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3330/api";

export interface Scan {
    _id: string;
    domain: string;
    mode: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'stopped';
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

export interface AssessmentItem {
    id: number;
    category: string;
    questions: {
        id: number;
        text: string;
        options: {
            key: string;
            text: string;
            score: number;
        }[];
    }[];
}

export interface AssessmentResult {
    _id: string;
    userId?: string;
    domain?: string;
    responses: Record<string, string>;
    score: number;
    grade: string;
    createdAt: string;
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
    },

    /**
     * Assessment: Fetch questions.
     */
    async getAssessmentQuestions(): Promise<AssessmentItem[]> {
        const response = await fetch(`${API_URL}/assessments/questions`);
        if (!response.ok) throw new Error("Failed to fetch assessment questions");
        return response.json();
    },

    /**
     * Assessment: Submit responses.
     */
    async submitAssessment(responses: Record<string, string>, domain?: string): Promise<{ success: boolean; assessmentId: string; score: number; grade: string }> {
        const response = await fetch(`${API_URL}/assessments/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ responses, domain }),
        });
        if (!response.ok) throw new Error("Failed to submit assessment");
        return response.json();
    },

    /**
     * Assessment: Get history.
     */
    async getAssessmentHistory(): Promise<AssessmentResult[]> {
        const response = await fetch(`${API_URL}/assessments/history`);
        if (!response.ok) throw new Error("Failed to fetch assessment history");
        return response.json();
    },

    /**
     * Assessment: Get details.
     */
    async getAssessmentDetails(id: string): Promise<AssessmentResult> {
        const response = await fetch(`${API_URL}/assessments/${id}`);
        if (!response.ok) throw new Error("Failed to fetch assessment details");
        return response.json();
    }
};
