import { User } from "./user";
import { Resume } from "./resume";
import { Prisma } from "@prisma/client";
export interface ResumeUser {
    id: string;
    userId: string;
    resumeId: string;
    content: Prisma.JsonValue;
    isDownloaded: boolean;
    isLinkedWithPortfolio: boolean;
    updatedAt: Date;
    createdAt: Date;
    user?: User;
    resume?: Resume;
}
