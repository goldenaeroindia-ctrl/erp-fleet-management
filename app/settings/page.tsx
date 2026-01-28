"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-8 py-8" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
            Admin settings
          </p>
          <h1 className="text-4xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}>
            Control center
          </h1>
          <p className="text-sm text-gray-600">
            Update platform level preferences, Excel policies, and fleet automation rules.
          </p>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-xs text-green-700 mt-4">
            ← Back to Admin Dashboard
          </Link>
        </header>

        <section className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-6 space-y-6">
          <div>
            <h2 className="text-xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 400 }}>
              Excel import policy
            </h2>
            <p className="text-sm text-gray-600">
              Toggle validations, column mappings, or upload windows. (Connect to backend when ready.)
            </p>
          </div>

          <div>
            <h2 className="text-xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 400 }}>
              Notification matrix
            </h2>
            <p className="text-sm text-gray-600">
              Control which roles receive alerts for uploads, approvals, or incidents.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 400 }}>
              Security
            </h2>
            <p className="text-sm text-gray-600">
              Configure MFA requirements, password rotation, and session expiry. (Wire into backend auth when needed.)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}


