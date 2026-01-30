"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/manager/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-950 text-slate-50">
      {/* NAVBAR - aligned with home */}
      <nav className="border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-xs font-semibold text-slate-950">
              FM
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide text-slate-100">
                Fleet Management
              </span>
              <span className="text-[11px] text-slate-400">
                Operations Control Platform
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-3 text-xs font-medium">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-50 border border-slate-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-semibold shadow-sm hover:shadow-cyan-500/20 transition-all"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-center">
          {/* Left side - headline */}
          <section className="space-y-5 text-center md:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(34,197,94,0.25)]" />
              Secure sign‑in for admins & managers
            </p>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
                Welcome back
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  to your fleet workspace
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300/90 max-w-md md:max-w-lg mx-auto md:mx-0 leading-relaxed">
                Log in to access your live dashboards, Excel imports, and role‑based views
                tailored for how your operations team actually works.
              </p>
            </div>

            <ul className="mt-3 space-y-2 text-[12px] text-slate-300/90">
              <li className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] text-cyan-300">
                  ✓
                </span>
                SSO‑ready email + password authentication
              </li>
              <li className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] text-cyan-300">
                  ✓
                </span>
                Session handled securely via HTTP‑only cookies
              </li>
            </ul>
          </section>

          {/* Right side - login card */}
          <section
            aria-label="Login form"
            className="relative rounded-2xl border border-slate-800 bg-slate-950/80 shadow-[0_18px_40px_rgba(15,23,42,0.85)] p-6 sm:p-7"
          >
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent pointer-events-none" />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">
                    Sign in to your account
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Use your work email to continue
                  </p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  Admin / Manager
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-medium text-slate-200"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-medium text-slate-200"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span>Remember this device</span>
                  </label>
                  <button
                    type="button"
                    className="text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:shadow-cyan-500/30 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {error && (
                <p
                  className="mt-3 text-center text-xs text-red-400 bg-red-500/5 border border-red-500/30 rounded-md px-3 py-2"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <div className="mt-5 text-center text-[11px] text-slate-400">
                No account yet?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-cyan-300 hover:text-cyan-200"
                >
                  Create a workspace
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} Fleet Management. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


