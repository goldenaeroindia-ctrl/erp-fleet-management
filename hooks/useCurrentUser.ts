"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { UserProfile } from "@/types/user";

export function useCurrentUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch<{ user: UserProfile }>("/api/auth/me");
      setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load profile");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refresh: fetchUser };
}


