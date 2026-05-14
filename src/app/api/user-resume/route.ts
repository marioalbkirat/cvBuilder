
import { Draft } from "@/types/draft";
import { ResumeUser } from "@/types/resumeUser";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
const ENDPOINT = "/api/aanewApi/user-resume";
export async function GET() {
    try {
        const session = {
            user:{
                id:"a603e37c-7604-4088-86be-e1d9307fc789"
            }
        }
        type ResumeUserType = Omit<ResumeUser, "user" | "resume">
        type DraftType = Omit<Draft, "user">
        const userResume: ResumeUserType | null = await prisma.resumeUser.findUnique({ where: { userId: session.user.id } });
        const draft: DraftType | null = await prisma.draft.findFirst({ where: { userId: session.user.id, entity: "RESUME" } });
        let resume: ResumeUserType | DraftType | null = null;
        if (!userResume && !draft) return NextResponse.json(resume, { status: 404 });
        if (draft && userResume) resume = draft.createdAt >= userResume.updatedAt ? draft : userResume;
        else resume = draft || userResume;
        return NextResponse.json(resume);
    } catch (error) {
        try {
            await prisma.errorLog.create({ data: { type: "GET_USER_RESUME", message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : null, endpoint: ENDPOINT } });
        } catch { }
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}