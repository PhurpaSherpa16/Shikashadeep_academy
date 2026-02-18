import { useState } from "react"
import { updatePatch } from "../api/updatePatch"

export default function usePatchUpdate() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const patchUpdate = async (id, from) => {
        try {
            setLoading(true)
            setError(null)
            const response = await updatePatch(id, from)
            setData(response)
            return response
        } catch (error) {
            setError(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, patchUpdate }
}