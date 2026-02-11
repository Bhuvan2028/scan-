import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import "./ScanForm.css";
import LoadingSpinner from "./LoadingSpinner";



const SCAN_MODES = [
  {
    id: "passive",
    title: "Passive Scan",
    description: "Gather information without directly interacting with the target.",
    eta: "~5 minutes",
  },
  {
    id: "subdomain",
    title: "Subdomain Discovery",
    description: "Discover subdomains associated with the target domain.",
    eta: "~10 minutes",
  },
  {
    id: "web",
    title: "Web Application Scan",
    description: "Analyze web applications for vulnerabilities and technologies.",
    eta: "~15 minutes",
  },
  {
    id: "full",
    title: "Comprehensive Scan",
    description: "Run all scan types for a complete security assessment.",
    eta: "~30+ minutes",
  },
];

export default function ScanForm() {
  const [domain, setDomain] = useState("");
  const [selectedMode, setSelectedMode] = useState("web");
  const [scanId, setScanId] = useState(null);
  const [scanStatus, setScanStatus] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const pollingRef = useRef(null);

  const hasActiveScan =
    scanStatus &&
    (scanStatus.status === "running" || scanStatus.status === "pending");

  /* -------------------------------------------------------
     POLLING
  ------------------------------------------------------- */
  useEffect(() => {
    if (!scanId) return;

    const checkStatus = async () => {
      try {
        const res = await api.get(`/scans/status/${scanId}`);


        setScanStatus(res.data);

        if (
          ["completed", "failed", "stopped"].includes(res.data.status)
        ) {
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }
      } catch (e) {
        console.error("Status poll failed");
      }
    };

    checkStatus();
    pollingRef.current = setInterval(checkStatus, 5000);

    return () => {
      clearInterval(pollingRef.current);
    };

  }, [scanId]);

  /* -------------------------------------------------------
     START SCAN
  ------------------------------------------------------- */
  const handleStartScan = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!domain.trim()) {
      setError("Enter a valid domain.");
      return;
    }

    if (hasActiveScan) {
      setError("A scan is already running.");
      return;
    }

    try {
      setIsStarting(true);

const res = await api.post("/scans/start", {
  domain: domain.trim(),
  mode: selectedMode,
});



      setScanId(res.data.scanId);

      setScanStatus({
        status: "pending",
        progressPct: 0,
        currentModule: "Queued",
      });

      setSuccessMsg("✅ Scan started successfully!");

    } catch (err) {
      setError("❌ Failed to start scan");
    }
    finally {
      setIsStarting(false);
    }
  };

  /* -------------------------------------------------------
     STOP SCAN
  ------------------------------------------------------- */
  const handleStopScan = async () => {
  if (!scanId) return;

  try {
    setIsStopping(true);

    await api.post(`/scans/stop/${scanId}`);

    setSuccessMsg("Scan stopped");

    const res = await api.get(`/scans/status/${scanId}`);
    setScanStatus(res.data);

    clearInterval(pollingRef.current);

  } catch (err) {
    setError("Failed to stop scan");
  } finally {
    setIsStopping(false);
  }
};


  const currentMeta =
    SCAN_MODES.find(m => m.id === selectedMode) || SCAN_MODES[0];

  return (
    <div className="scan-page">

      <h1 className="scan-title">New Scan</h1>

      <form className="scan-form" onSubmit={handleStartScan}>

        {/* DOMAIN INPUT */}
        <div className="scan-target-card">
          <label className="scan-label">Target Domain</label>

          <div className="scan-target-input-row">
            <input
              className="scan-target-input"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="example.com"
            />

<button
  type="submit"
  disabled={isStarting}
  className="scan-start-button"
>
  {isStarting ? (
    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <LoadingSpinner size="small" />
      Starting...
    </span>
  ) : (
    "Start Scan"
  )}
</button>
          </div>

          {error && <div className="scan-alert scan-alert-error">{error}</div>}
          {successMsg && (
            <div className="scan-alert scan-alert-success">{successMsg}</div>
          )}

        </div>

        {/* MODES */}
        <div className="scan-mode-section">

          <div className="scan-mode-header">
            <h2>Scan Mode</h2>
            <p>Choose how deep you want to scan</p>
          </div>

          <div className="scan-mode-grid">

            {SCAN_MODES.map(mode => (

              <button
                type="button"
                key={mode.id}
                className={
                  "scan-mode-card " +
                  (selectedMode === mode.id
                    ? "scan-mode-card-active"
                    : "")
                }
                onClick={() => setSelectedMode(mode.id)}
              >

                <div className="scan-mode-radio-row">
                  <div
                    className={
                      "scan-mode-radio " +
                      (selectedMode === mode.id
                        ? "scan-mode-radio-selected"
                        : "")
                    }
                  />
                  <span className="scan-mode-title">{mode.title}</span>
                </div>

                <p className="scan-mode-description">
                  {mode.description}
                </p>

                <span className="scan-mode-meta">{mode.eta}</span>

              </button>

            ))}

          </div>

        </div>

      </form>

      {/* LIVE STATUS */}
      {scanStatus && (
        <div className="scan-status-card">

          <div className="scan-status-header-row">
            <h3>Scan Status</h3>

            {scanStatus.status === "running" && (
              <button
                className="scan-stop-button"
                onClick={handleStopScan}
                disabled={isStopping}
              >
                Stop Scan
              </button>
            )}
          </div>

          <div className="scan-status-row">
            <div className="scan-status-pill">
              <span className={`status-dot status-${scanStatus.status}`} />
              {scanStatus.status}
            </div>

            <div>
              Phase: <strong>{scanStatus.currentModule}</strong>
            </div>

            <div>
              Mode: <strong>{currentMeta.title}</strong>
            </div>
          </div>

          <div className="scan-progress">
            <div className="scan-progress-bar">
              <div
                className="scan-progress-fill"
                style={{
                  width: `${scanStatus.progressPct || 0}%`
                }}
              />
            </div>

            <div className="scan-progress-meta">
              <span>{scanStatus.progressPct || 0}% done</span>
              <span>{currentMeta.eta}</span>
            </div>
          </div>

        </div>
      )}



    </div>
  );
}
