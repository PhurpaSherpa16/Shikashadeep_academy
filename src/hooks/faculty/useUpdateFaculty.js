import { useState } from "react"
import { updateFaculty } from "../../api/faculty/updateFaculty"

export default function useUpdateFaculty() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const updateTeacher = async (id, formData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateFaculty(id, formData)
            setData(response?.data)
            return response
        } catch (error) {
            console.log('Error in useUpdateFaculty hook:', error)
            setError(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, updateTeacher }
}
