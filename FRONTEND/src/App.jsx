// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ScanForm from "./components/ScanForm.jsx";
import ScanStatus from "./components/ScanStatus.jsx";
import ScanResults from "./components/ScanResults.jsx";
import ScanList from "./components/ScanList.jsx";
import Assessment from "./components/Assessment.jsx";
import AssessmentHistory from "./components/AssessmentHistory.jsx";
import AssessmentDetail from "./components/AssessmentDetail.jsx";
import ProfilePage from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

import "./App.css";

/* ================= DASHBOARD LAYOUT ================= */
function DashboardLayout({ sidebarCollapsed, toggleSidebar }) {
  return (
    <div
      className={`app-container ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <Header
        toggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="main-content">
 
      <Outlet />
  </div>
</div>
  
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Router>
      <Routes>
        {/* ===== STANDALONE PAGES (NO LAYOUT) ===== */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />

        {/* ===== DASHBOARD LAYOUT ===== */}
        <Route
          path="/"
          element={
            <DashboardLayout
              sidebarCollapsed={sidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<ScanForm />} />
          <Route path="scans" element={<ScanList />} />
          <Route path="scans/:scanId" element={<ScanStatus />} />
          <Route
            path="scans/:scanId/results"
            element={<ScanResults />}
          />
          <Route path="assessment" element={<Assessment />} />
          <Route
            path="assessment-history"
            element={<AssessmentHistory />}
          />
          <Route
            path="assessment/:id"
            element={<AssessmentDetail />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
