import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { ResumeType } from "@prisma/client";

const IMAGE_PATH = "/resumes/127.0.0.1_5500_resumes_template3_html.html.png";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      css,
      type = ResumeType.REGULAR,
      target = ["general"],
      features = ["autoresume"],
      planName = "freemium",
    } = body ?? {};

    if (!name || !description || !css) {
      return NextResponse.json({ error: "name, description and css are required" }, { status: 400 });
    }

    const plan = await prisma.plan.findUnique({ where: { name: planName } });
    if (!plan) {
      return NextResponse.json({ error: `Plan '${planName}' not found` }, { status: 404 });
    }

    const resume = await prisma.resume.create({
      data: {
        name,
        type,
        target,
        image: IMAGE_PATH,
        features,
        description,
        css,
        planId: plan.id,
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "failed to create autoresume" },
      { status: 500 }
    );
  }
}
