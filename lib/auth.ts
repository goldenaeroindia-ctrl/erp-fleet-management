import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "./db";
import User from "./models/User";

const encoder = new TextEncoder();

export interface AuthUser {
  id: string;
  role: "ADMIN" | "MANAGER";
  email: string;
  name: string;
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET));
    const userId = (payload as { id?: string }).id;

    if (!userId) {
      return null;
    }

    await connectDB();
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      role: user.role as "ADMIN" | "MANAGER",
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export function requireAuth(user: AuthUser | null): asserts user is AuthUser {
  if (!user) {
    throw new Error("Unauthorized");
  }
}

export function requireManager(user: AuthUser | null): asserts user is AuthUser {
  requireAuth(user);
  if (user.role !== "MANAGER") {
    throw new Error("Manager access required");
  }
}

export function requireAdminOrManager(user: AuthUser | null): asserts user is AuthUser {
  requireAuth(user);
  if (user.role !== "ADMIN" && user.role !== "MANAGER") {
    throw new Error("Admin or Manager access required");
  }
}

