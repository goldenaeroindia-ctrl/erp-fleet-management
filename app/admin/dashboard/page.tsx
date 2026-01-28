"use client";

import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const quickActions = [
  {
    title: "Create Team Member",
    description: "Provision Admin or Manager accounts instantly.",
    href: "/create-user",
  },
  {
    title: "User Directory",
    description: "Review roles, reset access, or disable accounts.",
    href: "/user-list",
  },
  {
    title: "Control Center",
    description: "Update platform settings and security policies.",
    href: "/settings",
  },
];

export default function AdminDashboardPage() {
  const { user, loading } = useCurrentUser();

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header className="border-b-2 border-gray-300 px-4 sm:px-8 py-4 bg-linear-to-b from-gray-50 to-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase" style={{ fontFamily: "Georgia, serif" }}>
            Admin Control
          </p>
          <h1 className="text-3xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}>
            Welcome{user?.name ? `, ${user.name}` : ""} 👑
          </h1>
          <p className="text-sm text-gray-600">
            {loading ? "Loading your access..." : "You can create admins, managers, and oversee all operations."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Back to site
          </Link>
          <SignOutButton />
        </div>
      </header>

      <main className="px-4 sm:px-8 py-10">
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
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
                  OPEN PANEL →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-2 border-gray-200 rounded-3xl p-6 bg-gray-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs text-gray-500 tracking-[0.4em] uppercase mb-2">ROLE MATRIX</p>
              <h3
                className="text-3xl text-green-900 mb-4"
                style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}
              >
                Admin superpowers unlocked
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Create Admin & Manager accounts</li>
                <li>• Configure Excel + logistics workflows</li>
                <li>• Access every dashboard and report</li>
              </ul>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-2xl p-4 bg-white">
                <p className="text-xs text-gray-500 uppercase">Active Admins</p>
                <p className="text-3xl text-green-800 font-light mt-2">—</p>
                <p className="text-xs text-gray-500 mt-1">Data will populate from /user-list</p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-4 bg-white">
                <p className="text-xs text-gray-500 uppercase">Active Managers</p>
                <p className="text-3xl text-green-800 font-light mt-2">—</p>
                <p className="text-xs text-gray-500 mt-1">Manage uploads & Excel edits</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


