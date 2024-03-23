import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

export async function handleDelete(id: string) {
    const { data: result } = await axios.delete(`/api/business/${id}`);
    return result;
}

export function useDeleteListing(onSuccess: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: handleDelete,
        onSuccess,
        onError: () => {
            toast.error("Error in deleting the business!");
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["listings"] }),
    });
}
