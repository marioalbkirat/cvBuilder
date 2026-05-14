import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "File is required" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name) || ".png";
    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "")}`;
    const fileName = safeName.endsWith(ext) ? safeName : `${safeName}${ext}`;
    const targetPath = path.join(process.cwd(), "public", "resumes", fileName);

    await writeFile(targetPath, buffer);
    return NextResponse.json({ image: `/resumes/${fileName}` });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
