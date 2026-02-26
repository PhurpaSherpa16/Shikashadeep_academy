import { useQuery } from "@tanstack/react-query"
import { getAllItems } from "../api/getAllItems"

export const useGetAllItems = (from, page) => {
    return useQuery({
        queryKey: [from, page],
        queryFn: () => getAllItems(from, page),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
}