import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 });
    }

    await connectDB();

    const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();

    const formatted = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    }));

    return NextResponse.json({ users: formatted });
  } catch (error) {
    console.error("List users error:", error);
    return NextResponse.json({ message: "Failed to list users" }, { status: 500 });
  }
}

