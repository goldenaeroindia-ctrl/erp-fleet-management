import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import ExcelFile from "@/lib/models/ExcelFile";
import { getAuthUser, requireManager } from "@/lib/auth";

const TEMPLATES: Record<string, { name: string; headers: string[] }> = {
  vehicle: {
    name: "Vehicle Register",
    headers: ["Vehicle ID", "Make", "Model", "Year", "Registration", "Status", "Last Service"],
  },
  driver: {
    name: "Driver Log",
    headers: ["Driver ID", "Name", "License Number", "Phone", "Email", "Status"],
  },
  expense: {
    name: "Expense Tracker",
    headers: ["Date", "Category", "Description", "Amount", "Vehicle ID", "Payment Method"],
  },
  blank: {
    name: "Blank Spreadsheet",
    headers: ["Column 1", "Column 2", "Column 3"],
  },
};

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    requireManager(user);

    const body = await request.json();
    const { template, name, headers } = body;

    await connectDB();

    let fileHeaders: string[] = [];
    let fileName = name || "New Spreadsheet";

    if (template && TEMPLATES[template]) {
      fileHeaders = [...TEMPLATES[template].headers];
      if (!name) {
        fileName = TEMPLATES[template].name;
      }
    } else if (headers && Array.isArray(headers)) {
      fileHeaders = headers.filter((h: any) => typeof h === "string" && h.trim()).map((h: string) => h.trim());
    } else {
      fileHeaders = ["Column 1", "Column 2", "Column 3"];
    }

    if (fileHeaders.length === 0) {
      return NextResponse.json({ message: "At least one header is required" }, { status: 400 });
    }

    const excelFile = await ExcelFile.create({
      ownerId: new mongoose.Types.ObjectId(user.id),
      name: fileName,
      headers: fileHeaders,
      rows: [],
    });

    return NextResponse.json({
      message: "File created successfully",
      file: {
        id: excelFile._id.toString(),
        name: excelFile.name,
        headers: excelFile.headers,
        rowCount: 0,
        createdAt: excelFile.createdAt,
        updatedAt: excelFile.updatedAt,
      },
    });
  } catch (error) {
    console.error("Create file error:", error);
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Manager access required") {
      return NextResponse.json({ message: "Manager access required" }, { status: 403 });
    }
    return NextResponse.json({ message: "Failed to create file" }, { status: 500 });
  }
}

