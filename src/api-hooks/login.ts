import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import axios from "../config/axios";
import { ZodAuthSchema } from "../lib/zod-schemas/schema";

async function handleLogin(values: z.infer<typeof ZodAuthSchema>) {
    const { data } = await axios.post("/api/admin/login", values);
    return data;
}

export function useLogin(onSuccess: () => void) {
    return useMutation({
        mutationFn: handleLogin,
        onSuccess,
        onError: (error: any) => {
            toast.error(
                error.response.data.error.message || "Something went wrong!"
            );
        },
    });
}
