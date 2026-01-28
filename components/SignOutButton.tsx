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
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
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
      className={`px-4 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-600 hover:text-white transition text-sm ${className ?? ""}`}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}


