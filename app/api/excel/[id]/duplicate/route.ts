import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ExcelFile from "@/lib/models/ExcelFile";
import { getAuthUser, requireManager } from "@/lib/auth";
import mongoose from "mongoose";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser(request);
    requireManager(user);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid file ID" }, { status: 400 });
    }

    await connectDB();

    const originalFile = await ExcelFile.findOne({
      _id: id,
      ownerId: new mongoose.Types.ObjectId(user.id),
    });

    if (!originalFile) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const duplicatedFile = await ExcelFile.create({
      ownerId: new mongoose.Types.ObjectId(user.id),
      name: `${originalFile.name} (Copy)`,
      headers: [...originalFile.headers],
      rows: JSON.parse(JSON.stringify(originalFile.rows)),
    });

    return NextResponse.json({
      message: "File duplicated successfully",
      file: {
        id: duplicatedFile._id.toString(),
        name: duplicatedFile.name,
        headers: duplicatedFile.headers,
        rowCount: duplicatedFile.rows.length,
        createdAt: duplicatedFile.createdAt,
        updatedAt: duplicatedFile.updatedAt,
      },
    });
  } catch (error) {
    console.error("Duplicate file error:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Manager access required") {
      return NextResponse.json({ message: "Manager access required" }, { status: 403 });
    }
    return NextResponse.json({ message: "Failed to duplicate file" }, { status: 500 });
  }
}

