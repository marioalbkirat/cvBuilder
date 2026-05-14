import { z } from "zod";
import { toast } from "react-toastify";

type ValidatorParams = {
    min?: number;
    max?: number;
    required?: boolean;
    field?: string;
    type?: "text" | "link" | "email" | "phone" | "image";
    messages?: {
        required?: string;
        min?: string;
        max?: string;
        invalid?: string;
    };
};

export const createValidator = ({
    min = 1,
    max = 255,
    required = true,
    type = "text",
    field = "",
    messages = {},
}: ValidatorParams) => {
    let schema: z.ZodType<unknown> = z.any();

    switch (type) {
        case "email":
            schema = z.string().email(messages.invalid || "Invalid email address");
            break;
        case "link":
            schema = z.string().url(messages.invalid || "Invalid link");
            break;
        case "phone":
            schema = z
                .string()
                .regex(/^[0-9+\-() ]+$/, messages.invalid || "Invalid phone number");
            break;
        case "image":
            schema = z
                .instanceof(File)
                .refine(
                    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                    messages.invalid || "Only JPG, PNG, or WEBP images are allowed"
                )
                .refine(
                    (file) => file.size <= 2 * 1024 * 1024,
                    messages.max || "Image size must not exceed 2MB"
                );
            break;
        default:
            schema = z.string();
            break;
    }

    if (type !== "image") {
        if (min)
            schema = (schema as z.ZodString).min(
                min,
                messages.min || `The minimum length for the ${field} is ${min}`
            );
        if (max)
            schema = (schema as z.ZodString).max(
                max,
                messages.max || `The maximum length for the ${field} is ${max}`
            );
        if (required)
            schema = (schema as z.ZodString).nonempty(
                messages.required || `The ${field} field is required`
            );
        else schema = (schema as z.ZodString).optional();
    }

    return (value: unknown) => {
        const parsed = schema.safeParse(value);
        if (!parsed.success) {
            toast.error(parsed.error.issues[0].message);
        }
        return parsed.success;
    };
};