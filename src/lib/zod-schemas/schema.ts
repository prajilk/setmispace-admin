import { z } from "zod";

export const ZodAuthSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
});

export const ZodListingSchema = z.object({
    business: z
        .string()
        .min(3, "Value must be 3 or more characters long")
        .max(100, "Value must be less than 100 characters long"),
    description: z
        .string()
        .min(10, "Value must be 10 or more characters long")
        .max(1000, "Value must be less than 1000 characters long"),
    address: z.string(),
    phone: z.string().optional(),
    mail: z.union([z.literal(""), z.string().email()]),
    website: z.string().optional(),
    mapLink: z.string().optional(),
    features: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    category: z.string(),
    tags: z.string().refine(
        (data) => {
            const values = data.split(",").map((value) => value.trim());
            return values.length <= 10;
        },
        {
            message: "Maximum 10 keywords!",
        }
    ),
});
