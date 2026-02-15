import { useState } from "react"
import { updateBlogById } from "../../api/blogs/updateBlogById"

export const useUpdateBlog = () => {
    const [updatedBlog, setUpdatedBlog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleUpdateBlog = async ({id, formData}) =>{
        setLoading(true)
        setError(null)
        try {
            const response = await updateBlogById({id, formData})
            setUpdatedBlog(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { handleUpdateBlog, updatedBlog, loading, error }
}