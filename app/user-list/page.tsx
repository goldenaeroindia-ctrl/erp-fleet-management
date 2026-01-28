"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";
import type { UserProfile } from "@/types/user";

export default function UserListPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/users`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch users");
        }
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-8 py-8" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
            Admin view
          </p>
          <h1 className="text-4xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}>
            User directory
          </h1>
          <p className="text-sm text-gray-600">
            Review every Admin and Manager account currently in the platform.
          </p>
          <div className="flex gap-4 text-xs text-green-700 mt-4">
            <Link href="/admin/dashboard">← Dashboard</Link>
            <Link href="/create-user">Create new user</Link>
          </div>
        </header>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 text-xs tracking-widest uppercase text-gray-500 bg-white px-4 py-3" style={{ fontFamily: "Georgia, serif" }}>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
          </div>

          {loading && <p className="px-4 py-6 text-sm text-gray-600">Loading users...</p>}
          {error && <p className="px-4 py-6 text-sm text-red-600">{error}</p>}
          {!loading && !error && users.length === 0 && (
            <p className="px-4 py-6 text-sm text-gray-600">No users found yet.</p>
          )}

          {!loading &&
            !error &&
            users.map((user) => (
              <div key={user.id} className="grid grid-cols-3 px-4 py-4 border-t border-gray-200 text-sm text-gray-700">
                <span>{user.name}</span>
                <span className="truncate">{user.email}</span>
                <span className="font-semibold text-green-700">{user.role}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}


