import { useState } from "react"
import { postProgram } from "../../api/programs/postProgram"

export default function usePostProgram(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const postNewProgram = async (formData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await postProgram(formData)
            setData(response?.data)
            return response?.data
        } catch (error) {
            setError(error.message || "Something went wrong")
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, postNewProgram }
}