import { useState } from "react"
import { postGallery } from "../../api/gallery/postGallery"

export const usePostGallery = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const handlePostGallery = async (formData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await postGallery(formData)
            setData(response?.data)
            console.log(response);
            return response
        } catch (error) {
            console.log('error in usePostGallery: ', error);
            setError("Failed to create new story, please try again later.")
            return false
        } finally {
            setLoading(false)
        }
    }

    return { handlePostGallery, loading, error, data }
}
