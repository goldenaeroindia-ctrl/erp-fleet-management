"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

interface SignOutButtonProps {
  className?: string;
}

export default function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Unable to logout");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      router.push("/login");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={`px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition text-sm ${className ?? ""}`}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}


