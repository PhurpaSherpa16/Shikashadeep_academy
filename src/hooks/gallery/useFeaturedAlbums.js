import { useCallback, useEffect, useState } from "react"
import { getAllAlbums } from "../../api/gallery/getAllAlbums"

export const useFeaturedAlbums = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(6)
    

    // getting all the post
    const albumsResponse = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAllAlbums(page, limit)
            setData(response?.data)
        } catch (error) {
            setError(error.message || "Something went wrong")
            throw error
        } finally {
            setLoading(false)
        }
    },[page, limit])

    useEffect(()=>{
        albumsResponse()
    },[])

    return { featuredLoading: loading, featuredError: error, featuredData: data, albumsResponse }
}