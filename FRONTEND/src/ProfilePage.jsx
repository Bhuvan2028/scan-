import { useState } from "react";

export default function Profile() {
  const [tab, setTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your account and customize your experience
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Tabs */}
        <div className="flex gap-8 border-b pb-4 mb-8">
          {[
            { id: "personal", label: "Personal" },
            { id: "security", label: "Security" },
            { id: "preferences", label: "Preferences" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-2 font-medium ${
                tab === t.id
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* PERSONAL TAB */}
        {tab === "personal" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 14c3.866 0 7 1.343 7 3v3H5v-3c0-1.657 3.134-3 7-3z" />
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <button className="mt-4 text-sm text-indigo-600 hover:underline">
                Change photo
              </button>
            </div>

            {/* Form */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["First Name", "Alex"],
                ["Last Name", "Johnson"],
                ["Email", "alex@company.com"],
                ["Role", "Security Analyst"],
                ["Department", "IT Security"],
                ["Location", "San Francisco, CA"],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    defaultValue={value}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  rows="4"
                  defaultValue="Experienced security analyst with expertise in vulnerability assessment and penetration testing."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  Cancel
                </button>
                <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {tab === "security" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Change Password",
                desc: "Update your password regularly",
                btn: "Update Password",
              },
              {
                title: "Two-Factor Authentication",
                desc: "Add an extra layer of security",
                btn: "Enable 2FA",
              },
              {
                title: "Active Sessions",
                desc: "Manage your active login sessions",
                btn: "View Sessions",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-slate-50 p-6 shadow-md"
              >
                <h3 className="font-semibold text-lg">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {card.desc}
                </p>
                <button className="mt-4 w-full rounded-lg bg-indigo-100 text-indigo-600 py-2 hover:bg-indigo-200">
                  {card.btn}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PREFERENCES TAB */}
        {tab === "preferences" && (
          <div className="space-y-6">
            {[
              ["Email Notifications", "Receive updates via email"],
              ["Theme & Display", "Customize your interface"],
              ["Data & Privacy", "Manage your data preferences"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-6 shadow-md"
              >
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
