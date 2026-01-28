"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function UploadPage() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(`Pretending to upload ${fileName || "fleet-data.xlsx"} … connect to backend when ready.`);
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-8 py-8" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
            Manager tool
          </p>
          <h1 className="text-4xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}>
            Upload Excel manifests
          </h1>
          <p className="text-sm text-gray-600">
            Managers can send new manifests for admin approval. Wire this form to a storage endpoint later.
          </p>
          <Link href="/manager/dashboard" className="inline-flex items-center gap-2 text-xs text-green-700 mt-4">
            ← Back to Manager Dashboard
          </Link>
        </header>

        <form className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs text-gray-600 mb-1">FILE NAME</label>
            <input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm bg-white"
              placeholder="fleet-data.xlsx"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">NOTES FOR ADMIN</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm bg-white"
              rows={4}
              placeholder="Describe what changed in this upload."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white hover:bg-green-700 font-medium tracking-wider text-sm rounded-lg"
          >
            Upload file (mock)
          </button>
        </form>

        {status && <p className="mt-4 text-sm text-green-700">{status}</p>}
      </div>
    </div>
  );
}


