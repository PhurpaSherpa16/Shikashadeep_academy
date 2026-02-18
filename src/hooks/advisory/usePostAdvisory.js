import { useState } from "react"
import { postAdvisory } from "../../api/advisory/postAdvisory"

export default function usePostAdvisory() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const postNewAdvisory = async (formData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await postAdvisory(formData)
            setData(response?.data)
            return response
        } catch (error) {
            setError(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, postNewAdvisory}
}
