import React, { useEffect, useState } from "react";
import "./ScanList.css";
import { Link } from "react-router-dom";
import api from "../api";

export default function ScanList() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const loadScans = async () => {
      try {
        const res = await api.get("/scans");
        setScans(res.data);
      } catch {
        setErr("Failed to load scans");
      } finally {
        setLoading(false);
      }
    };

    loadScans();
  }, []);

  if (loading) return <div className="loading">Loading scans...</div>;
  if (err) return <div className="error-text">{err}</div>;

  return (
    <div className="scans-page">
      <h1 className="title">All Scans</h1>
      <p className="subtitle">Security Dashboard → History</p>

      <div className="list">
        {scans.map((scan) => (
          <div className="card" key={scan._id}>
            <div className="top">
              <div>
                <h2 className="domain">{scan.domain}</h2>
                <p className="scan-id">ID: {scan._id}</p>
              </div>

              <span className={`badge ${scan.status}`}>
                {scan.status}
              </span>
            </div>

            <div className="info-grid">
              <Info label="Mode" value={scan.mode || "N/A"} />
              <Info label="Score" value={scan.score ?? "N/A"} />
              <Info label="Grade" value={scan.grade ?? "N/A"} />
              <Info
                label="Started"
                value={
                  scan.startedAt
                    ? new Date(scan.startedAt).toLocaleString()
                    : "N/A"
                }
              />
            </div>

            <div className="actions">

              {/* ✅ FIXED STATUS ROUTE */}
              <Link
                className="btn-primary"
                to={`/scans/${scan._id}`}
              >
                View Status
              </Link>

              {/* ✅ FIXED RESULTS ROUTE */}
              {scan.status === "completed" && (
                <Link
                  className="btn-secondary"
                  to={`/scans/${scan._id}/results`}
                >
                  View Results
                </Link>
              )}

              <button
                className="btn-danger"
                onClick={() => handleDelete(scan._id, setScans)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="info-box">
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
}

async function handleDelete(id, setScans) {
  if (!confirm("Delete scan?")) return;
  await api.delete(`/scans/${id}`);
  setScans((prev) => prev.filter((s) => s._id !== id));
}
