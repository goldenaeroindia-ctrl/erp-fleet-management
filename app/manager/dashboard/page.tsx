"use client";

import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const managerActions = [
  {
    title: "Upload Excel",
    description: "Send fleet update spreadsheets to HQ.",
    href: "/upload",
  },
  {
    title: "Excel Editor",
    description: "Clean and validate upcoming manifests.",
    href: "/excel-edit",
  },
  {
    title: "Dashboard",
    description: "Track approvals and import history.",
    href: "/manager/dashboard",
  },
];

export default function ManagerDashboardPage() {
  const { user, loading } = useCurrentUser();

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header className="border-b-2 border-gray-300 px-4 sm:px-8 py-4 bg-linear-to-b from-gray-50 to-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.5em] text-gray-500 uppercase" style={{ fontFamily: "Georgia, serif" }}>
            Manager Suite
          </p>
          <h1 className="text-3xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}>
            Hello{user?.name ? `, ${user.name}` : ""} 🚚
          </h1>
          <p className="text-sm text-gray-600">
            {loading ? "Fetching your workspace..." : "You can manage Excel uploads and prep manifests."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Back home
          </Link>
          <SignOutButton />
        </div>
      </header>

      <main className="px-4 sm:px-8 py-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {managerActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="border-2 border-gray-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-md transition bg-gray-50"
            >
              <h2
                className="text-xl text-green-800 mb-2"
                style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 400 }}
              >
                {action.title}
              </h2>
              <p className="text-sm text-gray-600">{action.description}</p>
              <span className="inline-flex items-center gap-2 text-xs text-green-700 mt-4 font-semibold tracking-wide">
                OPEN TOOL →
              </span>
            </Link>
          ))}
        </section>

        <section className="border-2 border-gray-200 rounded-3xl p-6 bg-gray-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs text-gray-500 tracking-[0.4em] uppercase mb-2">YOUR ROLE</p>
              <h3
                className="text-3xl text-green-900 mb-4"
                style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}
              >
                Excel pipeline specialist
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Upload manifests for approval</li>
                <li>• Edit Excel sheets before import</li>
                <li>• Track transfer status in real time</li>
              </ul>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-2xl p-4 bg-white">
                <p className="text-xs text-gray-500 uppercase">Uploads this week</p>
                <p className="text-3xl text-green-800 font-light mt-2">—</p>
                <p className="text-xs text-gray-500 mt-1">Data will sync once backend analytics exist</p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-4 bg-white">
                <p className="text-xs text-gray-500 uppercase">Pending approvals</p>
                <p className="text-3xl text-green-800 font-light mt-2">—</p>
                <p className="text-xs text-gray-500 mt-1">Admins finalize each upload</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


