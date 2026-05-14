import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { ResumeType } from "@prisma/client";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resume = await prisma.resume.findUnique({ where: { id }, include: { plan: true } });
  if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  return NextResponse.json(resume);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, type, target, image, features, description, css, planId } = body ?? {};

    if (!name || !type || !Array.isArray(target) || !image || !Array.isArray(features) || !description || !css || !planId) {
      return NextResponse.json({ error: "All Resume fields are required" }, { status: 400 });
    }
    if (!Object.values(ResumeType).includes(type)) {
      return NextResponse.json({ error: "Invalid resume type" }, { status: 400 });
    }

    const updated = await prisma.resume.update({
      where: { id },
      data: { name, type, target, image, features, description, css, planId },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Update failed" }, { status: 500 });
  }
}
