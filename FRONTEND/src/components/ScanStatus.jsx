import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import scanService from "../services/scanService";

export default function ScanStatus() {
  const { scanId } = useParams();

  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchStatus() {
      try {
        const data = await scanService.getScanStatus(scanId);
        if (active) setScan(data);
      } catch (err) {
        console.error("ScanStatus error:", err);
        if (active) setError("Failed to load scan status");
      } finally {
        if (active) setLoading(false);
      }
    }

    if (scanId) fetchStatus();
    else {
      setError("Invalid scan ID");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [scanId]);

  if (loading) return <div className="loading">Loading…</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!scan) return <div className="alert alert-warning">No scan found</div>;

  return (
    <div className="scan-status-page">
      <div className="scan-status-card">

        {/* Header */}
        <div className="scan-header">
          <div>
            <h1>Scan Status</h1>
            <p className="domain">{scan.domain}</p>
          </div>

          <span className={`status-badge ${scan.status}`}>
            {scan.status.toUpperCase()}
          </span>
        </div>

        {/* Meta */}
        <div className="scan-meta">
          <div>
            <span>Mode</span>
            <strong>{scan.mode || "—"}</strong>
          </div>
          <div>
            <span>Progress</span>
            <strong>{scan.progressPct ?? 0}%</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${scan.progressPct ?? 0}%` }}
            />
          </div>
        </div>

        {/* Current Module */}
        {scan.currentModule && (
          <p className="muted">
            <b>Current Module:</b> {scan.currentModule}
          </p>
        )}

        {/* Error */}
        {scan.error && (
          <div className="alert alert-danger">
            <b>Error:</b> {scan.error}
          </div>
        )}

        {/* Actions */}
        {scan.status === "completed" && (
          <div className="scan-actions">
            <Link
              to={`/scans/${scanId}/results`}
              className="btn btn-primary"
            >
              View Results
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
