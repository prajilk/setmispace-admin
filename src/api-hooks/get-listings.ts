import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";
import { Business } from "../lib/types";

async function getListings() {
    const { data } = await axios.get("/api/business");

    if (data && data.businesses) return data.businesses as Business[] | null;
    return null;
}

export function useListings() {
    return useQuery({
        queryKey: ["listings"],
        queryFn: getListings,
    });
}
