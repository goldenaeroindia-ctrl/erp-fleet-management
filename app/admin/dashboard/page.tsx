"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { API_BASE_URL } from "@/lib/config";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER";
}

interface ExcelFile {
  id: string;
  name: string;
  headers: string[];
  rowCount: number;
  owner: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboardPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [files, setFiles] = useState<ExcelFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, filesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/users`, { credentials: "include" }),
        fetch(`${API_BASE_URL}/api/excel/admin`, { credentials: "include" }),
      ]);

      if (!usersRes.ok || !filesRes.ok) {
        if (usersRes.status === 401 || filesRes.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch data");
      }

      const usersData = await usersRes.json();
      const filesData = await filesRes.json();

      setUsers(usersData.users || []);
      setFiles(filesData.files || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/excel/${fileId}/download`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download file");
    }
  };

  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const managerCount = users.filter((u) => u.role === "MANAGER").length;
  const totalFiles = files.length;
  const totalRows = files.reduce((sum, f) => sum + f.rowCount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              {userLoading ? "Loading..." : `Welcome, ${user?.name || "Admin"}`}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition"
            >
              Home
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400 mb-2">Total Admins</p>
            <p className="text-3xl font-bold text-cyan-400">{adminCount}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400 mb-2">Total Managers</p>
            <p className="text-3xl font-bold text-indigo-400">{managerCount}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400 mb-2">Total Files</p>
            <p className="text-3xl font-bold text-purple-400">{totalFiles}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400 mb-2">Total Rows</p>
            <p className="text-3xl font-bold text-pink-400">{totalRows}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/create-user"
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl p-6 hover:from-cyan-600 hover:to-indigo-600 transition"
          >
            <h3 className="text-xl font-semibold mb-2">➕ Create User</h3>
            <p className="text-sm text-slate-100/80">Create new Admin or Manager accounts</p>
          </Link>
          <Link
            href="/user-list"
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:bg-slate-800 transition"
          >
            <h3 className="text-xl font-semibold mb-2">👥 User Directory</h3>
            <p className="text-sm text-slate-400">View and manage all users</p>
          </Link>
          <Link
            href="/settings"
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:bg-slate-800 transition"
          >
            <h3 className="text-xl font-semibold mb-2">⚙️ Settings</h3>
            <p className="text-sm text-slate-400">Platform configuration</p>
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-xl font-semibold text-slate-100">All Excel Files</h2>
            <p className="text-sm text-slate-400 mt-1">View all files created by managers</p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading files...</div>
          ) : files.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p>No files yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Columns
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Rows
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {files.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-800/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-200">{file.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {file.owner ? (
                          <div>
                            <div className="text-sm text-slate-200">{file.owner.name}</div>
                            <div className="text-xs text-slate-400">{file.owner.email}</div>
                            <div className="text-xs text-slate-500 mt-1">
                              {file.owner.role === "ADMIN" ? "👑 Admin" : "📊 Manager"}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-slate-400">Unknown</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-400">{file.headers.length}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-400">{file.rowCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-400">
                          {new Date(file.updatedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDownload(file.id, file.name)}
                          className="text-indigo-400 hover:text-indigo-300 transition"
                          title="Download"
                        >
                          ⬇️ Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
