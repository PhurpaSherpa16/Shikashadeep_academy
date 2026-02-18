import { useState } from "react"
import { postFaculty } from "../../api/faculty/postFaculty"

export default function usePostFaculty() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const postNewTeacher = async (formData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await postFaculty(formData)
            setData(response?.data)
            return response
        } catch (error) {
            setError(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, postNewTeacher}
}
