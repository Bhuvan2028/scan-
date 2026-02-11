import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AssessmentHistory.css";
import { useNavigate } from "react-router-dom";

// FINAL WORKING API URL
const API_HISTORY = "http://localhost/backend/api/get-assessment-history.php";

export default function AssessmentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await axios.get(API_HISTORY);

      if (res.data.success && res.data.assessments) {
        setHistory(res.data.assessments);
      } else {
        setError("Failed to load assessment history");
      }
    } catch (err) {
      console.error("Error loading assessment history:", err);
      setError("Failed to load assessment history");
    }
    setLoading(false);
  };

  const getGradeClass = (grade) => {
    if (!grade) return "grade-f";
    grade = grade.toUpperCase();
    if (grade === "A+" || grade === "A") return "grade-a";
    if (grade === "B") return "grade-b";
    if (grade === "C") return "grade-c";
    if (grade === "D") return "grade-d";
    return "grade-f";
  };

  return (
    <div className="assessment-history">
      <div className="history-header">
        <div className="header-content">
          <h1>Assessment History</h1>
          <p>Review all completed assessments</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">Loading assessments...</div>
      ) : error ? (
        <div className="error-container">{error}</div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h2>No assessments yet</h2>
        </div>
      ) : (
        <div className="assessment-grid">
          {history.map((item) => (
            <div className="assessment-card" key={item.id}>
              <div className="card-header">
                <div className="assessment-info">
                  <h3>Assessment #{item.id}</h3>
                  <p className="assessment-date">{item.completedAt}</p>
                </div>

                <div className="assessment-score">
                  <div
                    className="mini-score-circle"
                    style={{ "--score": item.overallScore }}
                  >
                    <span>{item.overallScore}%</span>
                  </div>
                  <div className={`grade-badge ${getGradeClass(item.overallGrade)}`}>
                    {item.overallGrade}
                  </div>
                </div>
              </div>

              <div className="card-content">
                <p>Sections: {Object.keys(item.sections || {}).length}</p>
              </div>

              <div className="card-actions">
                <button
                  className="view-btn"
                  onClick={() => navigate(`/assessment-detail/${item.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
