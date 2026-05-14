import { Resume } from "@/types/resume"; 
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
const ENDPOINT = "/api/resume";
export async function GET() {
    try {
        type ResumeType = Omit<Resume, "plan" | "resumeUsers">;
        const resumes: ResumeType[] | null = await prisma.resume.findMany();
        return NextResponse.json(resumes);
    } catch (error) {
        try {
            await prisma.errorLog.create({ data: { type: "GET_RESUMES", message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : null, endpoint: ENDPOINT } });
        } catch { }
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}