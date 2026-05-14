import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { ResumeType } from "@prisma/client";

const DEFAULT_IMAGE = "/resumes/127.0.0.1_5500_resumes_template3_html.html.png";

export async function GET() {
  const resumes = await prisma.resume.findMany({ orderBy: { name: "asc" }, include: { plan: true } });
  return NextResponse.json(resumes);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, target, image, features, description, css, planId } = body ?? {};

    if (!name || !type || !Array.isArray(target) || !image || !Array.isArray(features) || !description || !css || !planId) {
      return NextResponse.json({ error: "All Resume fields are required" }, { status: 400 });
    }

    if (!Object.values(ResumeType).includes(type)) {
      return NextResponse.json({ error: "Invalid resume type" }, { status: 400 });
    }

    const resume = await prisma.resume.create({
      data: { name, type, target, image, features, description, css, planId },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Create failed" }, { status: 500 });
  }
}

export { DEFAULT_IMAGE };
