import { useState } from "react"
import { deleteBlogById } from "../../api/blogs/deleteBlogById"

export const useDeleteBlog = () => {
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState("")
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [idDeleting, setIdDeleting] = useState(null)

    const deleteBlog = async (id) => {
        try {
            setIdDeleting(id)
            setDeleteLoading(true)
            const response = await deleteBlogById(id)
            setDeleteSuccess(true)
            return response
        } catch (error) {
            setDeleteError(error.message)
            throw error
        } finally {
            setIdDeleting(null)
            setDeleteLoading(false)
        }
    }


    return {deleteBlog, deleteLoading, deleteError, deleteSuccess, idDeleting}
}