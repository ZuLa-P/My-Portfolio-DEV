import { z } from "zod";

export const createContactSchema = (t) =>
    z.object({
        name: z
            .string()
            .min(1, t("validation.nameRequired"))
            .min(2, t("validation.nameMin")),
        email: z
            .string()
            .min(1, t("validation.emailRequired"))
            .refine(
                (val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val),
                t("validation.emailInvalid")
            ),
        message: z
            .string()
            .min(1, t("validation.messageRequired"))
    });
