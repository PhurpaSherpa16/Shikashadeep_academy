import { useState, useCallback } from "react"
import getById from "../api/getItemById"

export default function useGetItemById(id, from) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState(null)

    const getItemById = useCallback(async () => {
        try {
            setLoading(true)
            setError("") 
            const response = await getById(id, from)
            setData(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [id, from]) 

    return { getItemById, loading, error, data }
}