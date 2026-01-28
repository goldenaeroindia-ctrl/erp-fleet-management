"use client";

import Link from "next/link";

const mockRows = [
  { asset: "Truck 12", status: "Needs inspection", eta: "15 Dec" },
  { asset: "Van 07", status: "Ready", eta: "12 Dec" },
  { asset: "Trailer 03", status: "Repair", eta: "20 Dec" },
];

export default function ExcelEditPage() {
  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-8 py-8" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
            Manager tool
          </p>
          <h1 className="text-4xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}>
            Excel edit sandbox
          </h1>
          <p className="text-sm text-gray-600">
            Plug this view into your actual Excel parser later. For now it mirrors the spreadsheet vibe.
          </p>
          <Link href="/manager/dashboard" className="inline-flex items-center gap-2 text-xs text-green-700 mt-4">
            ← Back to Manager Dashboard
          </Link>
        </header>

        <div className="border-2 border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 text-xs tracking-widest uppercase text-gray-500 bg-gray-50 px-4 py-3" style={{ fontFamily: "Georgia, serif" }}>
            <span>Asset</span>
            <span>Status</span>
            <span>ETA</span>
          </div>
          {mockRows.map((row) => (
            <div key={row.asset} className="grid grid-cols-3 px-4 py-4 border-t border-gray-200 text-sm text-gray-700 bg-white">
              <span contentEditable suppressContentEditableWarning className="outline-none focus:text-green-800">
                {row.asset}
              </span>
              <span contentEditable suppressContentEditableWarning className="outline-none focus:text-green-800">
                {row.status}
              </span>
              <span contentEditable suppressContentEditableWarning className="outline-none focus:text-green-800">
                {row.eta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


