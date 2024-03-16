import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";
import { Feature } from "../lib/types";

async function getFeatures() {
    const { data } = await axios.get("/api/business/features");
    if (data && data.features) return data.features as Feature[] | null;
    return null;
}

export function useFeatures() {
    return useQuery({
        queryKey: ["features"],
        queryFn: getFeatures,
    });
}
