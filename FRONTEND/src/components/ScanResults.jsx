import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import scanService from "../services/scanService";
import "./ScanResults.css";

export default function ScanResults() {
  const { scanId } = useParams();

  const [data, setData] = useState(null);
  const [tab, setTab] = useState("findings");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchResults() {
      try {
        const res = await scanService.getScanResults(scanId);

        // 🔴 BACKEND RETURNS PARTIAL OBJECT — USE IT DIRECTLY
        if (!res || typeof res !== "object") {
          throw new Error("Invalid results response");
        }

        if (active) setData(res);
      } catch (err) {
        console.error("ScanResults error:", err);
        if (active) setError("Failed to load scan results");
      } finally {
        if (active) setLoading(false);
      }
    }

    if (scanId) fetchResults();
    else {
      setError("Invalid scan ID");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [scanId]);

  if (loading) return <div className="loading">Loading results…</div>;
  if (error) return <div className="error-text">{error}</div>;
  if (!data) return <div className="error-text">No scan data found</div>;

  const {
    results = {},
    findings = [],
    score = 0,
    grade = "N/A"
  } = data;

  const tabs = [
    { id: "findings", label: "Findings" },
    { id: "subdomains", label: "Subdomains" },
    { id: "ports", label: "Open Ports" },
    { id: "hosts", label: "Hosts" },
    { id: "osint", label: "OSINT" },
    { id: "web", label: "Web Data" }
  ];

  return (
    <div className="results-page">
      <div className="header-bar">
        <h1>Scan Results</h1>

        <Link
          to={`/scans/${scanId}`}
          className="btn-primary"
          style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
        >
          ← Back to Status
        </Link>
      </div>

      <div className="summary-card">
        <div className="score-ring">{score}</div>

        <div className="scan-meta">
          <p><b>Scan ID:</b> {scanId}</p>
          <p>
            <b>Grade:</b>{" "}
            <span className={`grade ${grade}`}>{grade}</span>
          </p>
        </div>
      </div>

      <div className="tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
            style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tab === "findings" && renderFindings(findings)}
        {tab === "subdomains" && renderList(results.subdomains)}
        {tab === "ports" && renderPorts(results.openPorts)}
        {tab === "hosts" && renderList(results.hosts)}
        {tab === "osint" && renderList(results.osint)}
        {tab === "web" && renderList(results.webData)}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function renderFindings(findings = []) {
  if (!Array.isArray(findings) || findings.length === 0) {
    return <p className="ok-text">✔ No findings detected</p>;
  }

  return (
    <div className="findings-list">
      {findings.map((f, i) => (
        <div key={i} className={`finding ${f.severity || "low"}`}>
          <h4>{f.title || "Security Finding"}</h4>
          <span className="badge">
            {(f.severity || "low").toUpperCase()}
          </span>
          {f.raw && <p className="finding-raw">{f.raw}</p>}
        </div>
      ))}
    </div>
  );
}

function renderList(list = []) {
  if (!Array.isArray(list) || !list.length) {
    return <p>No data found</p>;
  }

  return (
    <ul className="simple-list">
      {list.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function renderPorts(ports = []) {
  if (!Array.isArray(ports) || !ports.length) {
    return <p>No ports discovered</p>;
  }

  return (
    <table className="ports-table">
      <thead>
        <tr>
          <th>Port</th>
          <th>Service</th>
        </tr>
      </thead>
      <tbody>
        {ports.map((p, i) => (
          <tr key={i}>
            <td>{p.port}</td>
            <td>{p.service || "unknown"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
