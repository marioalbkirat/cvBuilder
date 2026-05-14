import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET() {
  const plans = await prisma.plan.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(plans);
}
