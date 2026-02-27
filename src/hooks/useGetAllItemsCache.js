import { useQuery } from "@tanstack/react-query"
import { getAllItem } from "../api/getAllItem"

export const useGetAllItemsCache = (from) => {
    return useQuery({
        queryKey: [from],
        queryFn: () => getAllItem(from),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
}