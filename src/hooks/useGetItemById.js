import { useState } from "react"
import getById from "../api/getItemById"

export default function useGetItemById(id, from) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState(null)

    const getItemById = async () => {
        try {
            setLoading(true)
            const response = await getById(id, from)
            setData(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {getItemById, loading, error, data}
}