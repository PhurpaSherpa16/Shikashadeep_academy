import { useState } from "react"
import deleteById from "@/api/deleteById"

export default function useDeleteById() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState(null)

    const deleteByIdHook = async (id, from) => {
        try {
            setLoading(true)
            setError("")
            const response = await deleteById(id, from)
            setData(response)
            return response
        } catch (error) {
            const msg = error.message || 'Failed to delete, please try later.'
            setError(msg)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { deleteByIdHook, loading, error, data, setError }
}