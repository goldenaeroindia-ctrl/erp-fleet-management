"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setError("Only .xlsx and .xls files are allowed");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/api/excel/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setSuccess("File uploaded successfully!");
      setTimeout(() => {
        router.push(`/excel-edit?id=${data.file.id}`);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 px-4 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/manager/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 mb-4 transition"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Upload Excel File
          </h1>
          <p className="text-slate-400 mt-2">Upload and parse your Excel files (.xlsx or .xls)</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Excel File</label>
              <div className="mt-2">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 file:cursor-pointer cursor-pointer"
                />
              </div>
              {file && (
                <p className="mt-2 text-sm text-slate-400">
                  Selected: <span className="text-slate-300">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-3">How it works</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>• Select an Excel file (.xlsx or .xls format)</li>
            <li>• The file will be parsed and stored in your account</li>
            <li>• You can edit, download, or duplicate it later</li>
            <li>• Only you can access your uploaded files</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
