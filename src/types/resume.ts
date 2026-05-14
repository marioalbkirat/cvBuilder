import { ResumeType } from "@prisma/client";
import { Plan } from "./plan";
import { ResumeUser } from "./resumeUser";

export interface Resume {
    id: string;
    name: string;
    type: ResumeType;
    target: string[];
    image: string;
    features: string[];
    description: string;
    css: string;
    planId: string;
    plan?: Plan;
    resumeUsers?: ResumeUser[];
}