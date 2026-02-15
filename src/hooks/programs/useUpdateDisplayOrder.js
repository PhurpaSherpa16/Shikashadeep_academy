import { useState } from "react"
import { updateDisplayOrder } from "../../api/updateDisplayOrder"

export const useUpdateDisplayOrder = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const reorderItems = async (itemsData) => {
        setLoading(true)
        setError(null)
        try {
            // Transform items to only include what's needed for the reorder API
            const payload = itemsData.map((item, index) => ({
                id: item.id,
                displayOrder: index + 1
            }))

            const response = await updateDisplayOrder(payload)
            setSuccess(true)
            return response
        } catch (error) {
            console.error('Error in useUpdateDisplayOrder hook:', error)
            setError(error.message || "Failed to update display order")
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { reorderLoading: loading, reorderError: error, reorderItems, reorderSuccess: success }
}
