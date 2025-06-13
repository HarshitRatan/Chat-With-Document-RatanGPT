import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log("formData :: ", formData);
  const file = formData.get("file") as File;
  console.log("File :: ", file);
  const arrayBuffer = await file.arrayBuffer();
  console.log("arrayBuffer :: ", arrayBuffer);
  return NextResponse.json({ message: "done!" });
}
