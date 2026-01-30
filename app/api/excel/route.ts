import { NextRequest, NextResponse } from "next/server";
import XLSX from "xlsx";
import connectDB from "@/lib/db";
import ExcelFile from "@/lib/models/ExcelFile";
import { getAuthUser, requireManager } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Auth
    const user = await getAuthUser(request);
    requireManager(user);

    // 2️⃣ Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // 3️⃣ Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 4️⃣ Parse Excel
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      return NextResponse.json(
        { message: "Invalid Excel file" },
        { status: 400 }
      );
    }

    // ✅ THIS IS THE CRITICAL FIX
    const jsonData = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
    }) as any[][];

    if (jsonData.length === 0) {
      return NextResponse.json(
        { message: "Excel file is empty" },
        { status: 400 }
      );
    }

    // 5️⃣ Headers
    const headers = (jsonData[0] as any[])
      .map((h) => String(h || "").trim())
      .filter(Boolean);

    if (headers.length === 0) {
      return NextResponse.json(
        { message: "No valid headers found" },
        { status: 400 }
      );
    }

    // 6️⃣ Rows
    const rows = jsonData.slice(1).map((row) => {
      const rowObj: Record<string, any> = {};
      headers.forEach((header, index) => {
        rowObj[header] =
          row[index] !== undefined ? String(row[index]) : "";
      });
      return rowObj;
    });

    // 7️⃣ Save to DB
    await connectDB();

    const excelFile = await ExcelFile.create({
      ownerId: user.id,
      name: file.name.replace(/\.(xlsx|xls)$/i, ""),
      headers,
      rows,
    });

    return NextResponse.json({
      id: excelFile._id.toString(),
      name: excelFile.name,
    });
  } catch (error) {
    console.error("Excel upload error:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }

      if (error.message === "Manager access required") {
        return NextResponse.json(
          { message: "Manager access required" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { message: "Failed to upload Excel file" },
      { status: 500 }
    );
  }
}
