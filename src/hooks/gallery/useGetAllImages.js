import { useCallback, useEffect, useState } from "react"
import { getAllImages } from "../../api/gallery/getAllImages"
import { getAllAlbums } from "../../api/gallery/getAllAlbums"


export const useGetAllImages = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)

    
    // getting all the images
    const response = useCallback(async (page, limit) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAllImages(page, limit)
            setData(response?.data)
        } catch (error) {
            setError(error.message || "Something went wrong")
            throw error
        } finally {
            setLoading(false)
        }
    },[page, limit])

    useEffect(()=>{
        response(page, limit)
    },[page, limit])

    return { loading, error, data, response, page, limit, setPage, setLimit}
}