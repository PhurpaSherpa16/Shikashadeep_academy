import { useState } from "react"
import { postBlog } from "../../api/blogs/postBlog"

export const usePostBlog = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const handlePostBlog = async (formData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await postBlog(formData)
            setData(response?.data)
            return response
        } catch (error) {
            setError(error.message || "Something went wrong")
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { handlePostBlog, loading, error, data }
}