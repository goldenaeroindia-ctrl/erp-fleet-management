"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MANAGER",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to create user");
      }
      setMessage(`${data.user.role} created for ${data.user.email}`);
      setFormData({ name: "", email: "", password: "", role: "MANAGER" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-8 py-8" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500" style={{ fontFamily: "Georgia, serif" }}>
            Admin action
          </p>
          <h1 className="text-4xl text-green-800" style={{ fontFamily: "Garamond, serif", fontStyle: "italic", fontWeight: 300 }}>
            Create user accounts
          </h1>
          <p className="text-sm text-gray-600">
            Managers can sign up on their own. Admins are created from this dashboard only.
          </p>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-xs text-green-700 mt-4">
            ← Back to Admin Dashboard
          </Link>
        </header>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs text-gray-600 mb-1" htmlFor="name">
                FULL NAME
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm bg-white"
                placeholder="Priya Mehta"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1" htmlFor="email">
                WORK EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm bg-white"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1" htmlFor="password">
                TEMP PASSWORD
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm bg-white"
                placeholder="Minimum 6 characters"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1" htmlFor="role">
                ROLE
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-sm bg-white"
              >
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 px-6 py-3 bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed font-medium tracking-wider text-sm rounded-lg"
            >
              {loading ? "Creating..." : "Create user"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}


