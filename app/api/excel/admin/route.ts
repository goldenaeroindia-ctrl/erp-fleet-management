import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import ExcelFile from "@/lib/models/ExcelFile";
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

    const files = await ExcelFile.find().sort({ updatedAt: -1 }).lean();
    const userIds = [...new Set(files.map((f) => f.ownerId.toString()))];
    const users = await User.find({ _id: { $in: userIds } })
      .select("name email role")
      .lean();

    const userMap = new Map(users.map((u) => [u._id.toString(), u]));

    const formatted = files.map((file) => {
      const ownerIdStr = file.ownerId.toString();
      const owner = userMap.get(ownerIdStr);

      return {
        id: file._id.toString(),
        name: file.name,
        headers: file.headers,
        rowCount: file.rows?.length || 0,
        owner: owner
          ? {
              id: owner._id.toString(),
              name: owner.name,
              email: owner.email,
              role: owner.role,
            }
          : null,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      };
    });

    return NextResponse.json({ files: formatted });
  } catch (error) {
    console.error("Admin list files error:", error);
    return NextResponse.json({ message: "Failed to list files" }, { status: 500 });
  }
}

