import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";
import { Category } from "../lib/types";

async function getCategories() {
    const { data } = await axios.get("/api/business/categories");
    if (data && data.categories) return data.categories as Category[] | null;
    return null;
}

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
}
