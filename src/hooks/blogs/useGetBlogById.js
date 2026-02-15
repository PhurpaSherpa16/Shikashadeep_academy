import { useEffect, useState } from "react"
import { getBlogById } from "../../api/blogs/getBlogById"

export const useGetBlogById = (blogId) => {
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchBlogs = async () =>{
        setLoading(true)
        setError(null)
        try {
            const response = await getBlogById(blogId)
            setBlog(response?.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    
    return { fetchBlogs, blog, loading, error }
}