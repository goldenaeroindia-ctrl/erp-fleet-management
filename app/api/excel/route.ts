import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import ExcelFile from "@/lib/models/ExcelFile";
import { getAuthUser, requireManager } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    requireManager(user);

    await connectDB();

    const files = await ExcelFile.find({ ownerId: new mongoose.Types.ObjectId(user.id) })
      .sort({ updatedAt: -1 })
      .select("-rows")
      .lean();

    return NextResponse.json({
      files: files.map((file) => ({
        id: file._id.toString(),
        name: file.name,
        headers: file.headers,
        rowCount: file.rows?.length || 0,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      })),
    });
  } catch (error) {
    console.error("List Excel files error:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Manager access required") {
      return NextResponse.json({ message: "Manager access required" }, { status: 403 });
    }
    return NextResponse.json({ message: "Failed to list files" }, { status: 500 });
  }
}

