import { useQuery } from "@tanstack/react-query"
import { getGalleryTags } from "../api/gallery/getGalleryTags"


export const useFilterItemsWithCache = (tag, page) => {
    return useQuery({
        queryKey: [tag, page],
        queryFn: () => getGalleryTags(tag, page),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    })
}