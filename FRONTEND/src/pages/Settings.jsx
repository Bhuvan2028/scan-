// src/pages/Settings.jsx
import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState({
    general: {
      siteName: "Security Dashboard",
      siteDescription:
        "Comprehensive security scanning and assessment platform",
      defaultLanguage: "English",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      theme: "light",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      scanCompleted: true,
      vulnerabilityFound: true,
      assessmentReminder: true,
      systemUpdates: true,
    },
    security: {
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      twoFactorAuth: true,
      loginAttempts: 5,
    },
    api: {
      scanInterval: 24,
      maxConcurrentScans: 3,
      assessmentRetention: 90,
      scanRetention: 30,
    },
  });

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page settings-theme">
      <div className="settings-container">
        {/* HEADER */}
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Configure your security dashboard preferences</p>
        </div>

        {/* TABS */}
        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === "general" ? "active" : ""}`}
            onClick={() => handleTabChange("general")}
          >
            General
          </button>
          <button
            className={`tab-btn ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => handleTabChange("notifications")}
          >
            Notifications
          </button>
          <button
            className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => handleTabChange("security")}
          >
            Security
          </button>
          <button
            className={`tab-btn ${activeTab === "api" ? "active" : ""}`}
            onClick={() => handleTabChange("api")}
          >
            API
          </button>
        </div>

        {/* CARD */}
        <div className="settings-card">
          <div className="settings-content">
            {/* ================= GENERAL ================= */}
            {activeTab === "general" && (
              <div className="settings-section">
                <div className="setting-group">
                  <h3>Site Configuration</h3>

                  <div className="setting-item">
                    <label>Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="setting-item">
                    <label>Site Description</label>
                    <textarea
                      rows="3"
                      value={settings.general.siteDescription}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteDescription",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-item">
                      <label>Default Language</label>
                      <select
                        value={settings.general.defaultLanguage}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "defaultLanguage",
                            e.target.value
                          )
                        }
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div className="setting-item">
                      <label>Timezone</label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "timezone",
                            e.target.value
                          )
                        }
                      >
                        <option>UTC</option>
                        <option>EST (UTC-5)</option>
                        <option>PST (UTC-8)</option>
                        <option>CST (UTC-6)</option>
                      </select>
                    </div>
                  </div>

                  <div className="setting-row">
                    <div className="setting-item">
                      <label>Date Format</label>
                      <select
                        value={settings.general.dateFormat}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "dateFormat",
                            e.target.value
                          )
                        }
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div className="setting-item">
                      <label>Theme</label>
                      <div className="theme-options">
                        {["light", "dark", "auto"].map((t) => (
                          <button
                            key={t}
                            className={`theme-btn ${
                              settings.general.theme === t ? "active" : ""
                            }`}
                            onClick={() =>
                              handleSettingChange("general", "theme", t)
                            }
                          >
                            <div className={`theme-preview ${t}`}></div>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= NOTIFICATIONS ================= */}
            {activeTab === "notifications" && (
              <div className="settings-section">
                <div className="setting-group">
                  <h3>Notification Preferences</h3>

                  {Object.entries(settings.notifications).map(
                    ([key, value]) => (
                      <div className="setting-item" key={key}>
                        <div className="toggle-setting">
                          <label>
                            {key.replace(/([A-Z])/g, " $1")}
                          </label>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) =>
                                handleSettingChange(
                                  "notifications",
                                  key,
                                  e.target.checked
                                )
                              }
                            />
                            <span></span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ================= SECURITY ================= */}
            {activeTab === "security" && (
              <div className="settings-section">
                <div className="setting-group">
                  <h3>Security Settings</h3>

                  <div className="setting-item">
                    <label>Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "sessionTimeout",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="setting-item">
                    <label>Minimum Password Length</label>
                    <input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "passwordMinLength",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  {[
                    "requireSpecialChars",
                    "requireNumbers",
                    "twoFactorAuth",
                  ].map((key) => (
                    <div className="setting-item" key={key}>
                      <div className="toggle-setting">
                        <label>{key.replace(/([A-Z])/g, " $1")}</label>
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={settings.security[key]}
                            onChange={(e) =>
                              handleSettingChange(
                                "security",
                                key,
                                e.target.checked
                              )
                            }
                          />
                          <span></span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="setting-item">
                    <label>Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "loginAttempts",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= API ================= */}
            {activeTab === "api" && (
              <div className="settings-section">
                <div className="setting-group">
                  <h3>API Configuration</h3>

                  {Object.entries(settings.api).map(([key, value]) => (
                    <div className="setting-item" key={key}>
                      <label>{key.replace(/([A-Z])/g, " $1")}</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleSettingChange(
                            "api",
                            key,
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="settings-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
          <button className="btn btn-outline">Reset to Defaults</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
