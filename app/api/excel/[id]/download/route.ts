import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import * as XLSX from "xlsx";
import connectDB from "@/lib/db";
import ExcelFile from "@/lib/models/ExcelFile";
import { getAuthUser, requireAdminOrManager } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser(request);
    requireAdminOrManager(user);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid file ID" }, { status: 400 });
    }

    await connectDB();

    // Admin can download any file, Manager can only download their own
    const query: any = { _id: id };
    if (user.role !== "ADMIN") {
      query.ownerId = new mongoose.Types.ObjectId(user.id);
    }

    const file = await ExcelFile.findOne(query);

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const worksheetData: any[][] = [file.headers];

    file.rows.forEach((row) => {
      const rowData = file.headers.map((header) => row[header] || "");
      worksheetData.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    const fileName = `${file.name}.xlsx`.replace(/[^a-z0-9._-]/gi, "_");

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Download file error:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Manager access required") {
      return NextResponse.json({ message: "Manager access required" }, { status: 403 });
    }
    if (error instanceof Error && error.message === "Admin or Manager access required") {
      return NextResponse.json({ message: "Admin or Manager access required" }, { status: 403 });
    }
    return NextResponse.json({ message: "Failed to download file" }, { status: 500 });
  }
}

