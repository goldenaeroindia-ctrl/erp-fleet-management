export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-slate-950 text-slate-50">
      {/* NAVBAR - clean, professional */}
      <nav className="border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-slate-50 transition-colors">
              Features
            </a>
            <a href="#roles" className="hover:text-slate-50 transition-colors">
              Roles
            </a>
            <a href="#security" className="hover:text-slate-50 transition-colors">
              Security
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/70 transition-colors"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 shadow-sm hover:shadow-cyan-500/20 hover:brightness-110 transition-all"
            >
              Get started
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          {/* background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[28rem] bg-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 bg-indigo-500/20 blur-3xl" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
            {/* Hero copy */}
            <section className="space-y-6 sm:space-y-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-300 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(34,197,94,0.25)]" />
                Live visibility across fleet, teams & costs
              </p>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50">
                  A single, modern hub
                  <br className="hidden sm:block" />
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                    for fleet operations
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300/90 max-w-xl leading-relaxed">
                  Import data from Excel, control access by role, and give managers and admins a
                  real‑time view of every vehicle, route, and team—all in one focused workspace.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:shadow-cyan-500/30 hover:brightness-110 transition-all"
                >
                  Create free workspace
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700/80 bg-slate-950/60 px-6 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-900/80 hover:border-slate-500 transition-colors"
                >
                  Log in to existing account
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-[9px] text-emerald-300">
                    ✓
                  </span>
                  <span>Role-based access (Admin & Manager)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-[9px] text-cyan-300">
                    ✓
                  </span>
                  <span>Secure session management</span>
                </div>
              </div>
            </section>

            {/* Right side card: high-level overview */}
            <section
              aria-labelledby="overview-title"
              className="relative rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-[0_18px_40px_rgba(15,23,42,0.85)] overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2
                      id="overview-title"
                      className="text-xs font-semibold tracking-wide text-slate-200"
                    >
                      Fleet overview
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Snapshot for today&apos;s operations
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Healthy
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                    <p className="text-slate-400 mb-1">Active vehicles</p>
                    <p className="text-lg font-semibold text-slate-50">128</p>
                    <p className="text-[10px] text-emerald-300 mt-0.5">+8 vs last week</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                    <p className="text-slate-400 mb-1">On‑time rate</p>
                    <p className="text-lg font-semibold text-slate-50">96%</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">SLA across all regions</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                    <p className="text-slate-400 mb-1">Open issues</p>
                    <p className="text-lg font-semibold text-amber-300">12</p>
                    <p className="text-[10px] text-amber-300/80 mt-0.5">
                      Prioritized for operations
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                    <p className="text-slate-400 mb-1">Managers online</p>
                    <p className="text-lg font-semibold text-slate-50">6</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Reviewing live data</p>
                  </div>
                </div>

                <div
                  id="features"
                  className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-slate-100">Excel import</p>
                    <p className="text-slate-400">
                      Clean CSV / Excel uploads with validation and clear error feedback.
                    </p>
                  </div>
                  <div id="roles" className="space-y-1">
                    <p className="font-medium text-slate-100">Role control</p>
                    <p className="text-slate-400">
                      Dedicated views for admins and managers with the right permissions.
                    </p>
                  </div>
                  <div id="security" className="space-y-1">
                    <p className="font-medium text-slate-100">Secure by default</p>
                    <p className="text-slate-400">
                      Server‑side auth, protected routes, and cookies handled for you.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
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