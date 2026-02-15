import { useState } from "react"
import updateAlbumById from "../../api/gallery/updateAlbum"

export function useUpdateAlbum() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleUpdateAlbum = async (id, formData) => {
        try {
            setLoading(true)
            setError("")
            setSuccess(false)
            const result = await updateAlbumById(id, formData)
            if (result.success) {
                setSuccess(true)
                return result
            } else {
                throw new Error(result.message || "Update failed")
            }
        } catch (err) {
            console.error("useUpdateAlbum Error:", err)
            setError(err.message || "An unexpected error occurred while updating.")
            return false
        } finally {
            setLoading(false)
        }
    }
    return { handleUpdateAlbum, loading, error, success, setSuccess}
}
