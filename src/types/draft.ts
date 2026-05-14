import { User } from "./user";
import { DraftType } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface Draft {
    id: string;
    userId: string;
    entity: DraftType;
    content: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
}
