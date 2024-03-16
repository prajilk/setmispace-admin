import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import axios from "../config/axios";
import { ZodListingSchema } from "../lib/zod-schemas/schema";
import { Images } from "../lib/types";

type HandleNewListingProps = z.infer<typeof ZodListingSchema> & {
    images: Images;
    plan: "free" | "paid";
};

async function handleNewListing(values: HandleNewListingProps) {
    const { data } = await axios.post("/api/business/new", values);
    return data;
}

export function useNewListing(onSuccess: () => void) {
    return useMutation({
        mutationFn: handleNewListing,
        onSuccess,
        onError: (error: any) => {
            toast.error(
                error.response.data.error.message || "Something went wrong!"
            );
        },
    });
}
