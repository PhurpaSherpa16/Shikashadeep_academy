import { useEffect, useState, useCallback } from "react"
import { getAllBlogs } from "../../api/blogs/getAllBlogs"

export const useBlogs = (page = 1, limit = 10) => {
    const [responseFromBlog, setResponseFromBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchBlogs = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAllBlogs(page, limit)
            setResponseFromBlog(response?.data || [])
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [page, limit])

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs])

    return { responseFromBlog, loading, error, fetchBlogs }
}