// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import scanService from '../services/scanService';
import assessmentService from '../services/assessmentService';
import './Dashboard.css';
import useCountUp from "../hooks/useCountUp";


const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    activeScans: 0,
    completedScans: 0,
    totalAssessments: 0,
    avgScore: 0
  });
  const [recentScans, setRecentScans] = useState([]);
  const [recentAssessments, setRecentAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch scan data
        const scans = await scanService.getAllScans();
        const activeScans = scans.filter(s => s.status === 'running').length;
        const completedScans = scans.filter(s => s.status === 'completed').length;
        
        // Fetch assessment data
        const assessments = await assessmentService.getAssessmentHistory();
        const avgScore = assessments.length > 0 
          ? Math.round(
              assessments.reduce((sum, a) => sum + a.overallScore, 0) /
                assessments.length
            )
          : 0;
        
        setStats({
          totalScans: scans.length,
          activeScans,
          completedScans,
          totalAssessments: assessments.length,
          avgScore
        });
        
        setRecentScans(scans.slice(0, 5));
        setRecentAssessments(assessments.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ icon, title, value, color, trend, link }) => {
  const animatedValue = useCountUp(value, 600); // 👈 short, smooth

  return (
    <Link to={link} className="stat-card">
      <div className="stat-icon" style={{ background: color }}>
        <i className={icon}></i>
      </div>

      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{animatedValue}</p>

        {trend !== undefined && (
          <span
            className={`stat-trend ${trend > 0 ? "positive" : "negative"}`}
          >
            <i
              className={`fas fa-arrow-${trend > 0 ? "up" : "down"}`}
            ></i>
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </Link>
  );
};



  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
  <div className="dashboard-page">

    {/* Page Header */}
    <div className="dashboard-header">
      <h1>Security Overview</h1>
      <p>Monitor your security posture and scan activities</p>
    </div>

    {/* Stats */}
    <div className="dashboard-stats">
      <StatCard
        icon="fas fa-radar"
        title="Total Scans"
        value={stats.totalScans}
        color="#7c3aed"
        trend={12}
        link="/scans"
      />
      <StatCard
        icon="fas fa-play-circle"
        title="Active Scans"
        value={stats.activeScans}
        color="#ec4899"
        trend={-5}
        link="/scans"
      />
      <StatCard
        icon="fas fa-check-circle"
        title="Completed"
        value={stats.completedScans}
        color="#3b82f6"
        trend={8}
        link="/scans"
      />
      <StatCard
        icon="fas fa-clipboard-check"
        title="Assessments"
        value={stats.totalAssessments}
        color="#10b981"
        trend={15}
        link="/assessment-history"
      />
    </div>

    {/* Main Sections */}
    <div className="dashboard-sections">

      {/* Recent Scans */}
      <div className="section-card">
        <div className="section-header">
          <h3>Recent Scans</h3>
          <Link to="/scans" className="btn btn-outline btn-sm">View All</Link>
        </div>

        <div className="recent-scans">
          {recentScans.length > 0 ? (
            recentScans.map((scan) => (
              <div key={scan._id} className="scan-item">
                <div>
                  <strong>{scan.domain}</strong>
                  <p>{new Date(scan.createdAt).toLocaleString()}</p>
                </div>
                <span className={`status-badge ${scan.status}`}>
                  {scan.status}
                </span>
              </div>
            ))
          ) : (
            <p>No scans yet</p>
          )}
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="section-card">
        <div className="section-header">
          <h3>Recent Assessments</h3>
          <Link to="/assessment-history" className="btn btn-outline btn-sm">
            View All
          </Link>
        </div>

        <div className="recent-assessments">
          {recentAssessments.length > 0 ? (
            recentAssessments.map((a) => (
              <div key={a.id} className="assessment-item">
                <div>
                  <strong>Security Assessment</strong>
                  <p>{new Date(a.completedAt).toLocaleDateString()}</p>
                </div>
                <span className="score-badge">{a.overallScore}</span>
              </div>
            ))
          ) : (
            <p>No assessments yet</p>
          )}
        </div>
      </div>

    </div>

    {/* Quick Actions */}
    <div className="section-card">
      <div className="section-header">
        <h3>Quick Actions</h3>
      </div>

      <div className="quick-actions">
        <Link to="/scan" className="action-card">Start New Scan</Link>
        <Link to="/assessment" className="action-card">Security Assessment</Link>
        <Link to="/scans" className="action-card">View Analytics</Link>
        <Link to="/settings" className="action-card">Settings</Link>
      </div>
    </div>

  </div>
);

};

const getGradeColor = (grade) => {
  switch (grade) {
    case 'A+':
    case 'A':
      return '#10b981';
    case 'B':
      return '#3b82f6';
    case 'C':
      return '#f59e0b';
    case 'D':
      return '#f97316';
    case 'F':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

export default Dashboard;
