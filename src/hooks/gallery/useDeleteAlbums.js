import { useState } from "react"
import { deleteAlbumById } from "../../api/gallery/deleteAlbumById"

export const useDeleteAlbums = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [idDeleting, setIdDeleting] = useState(null)

    const deleteAlbum = async (id) => {
        try {
            setIdDeleting(id)
            setLoading(true)
            const response = await deleteAlbumById(id)
            setSuccess(true)
            return response
        } catch (error) {
            setError(error.message)
            throw error
        } finally {
            setIdDeleting(null)
            setLoading(false)
        }
    }

    return {deleteAlbum, loading, error, success, idDeleting}
}