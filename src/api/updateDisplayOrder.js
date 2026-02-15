import API_URL from "./api";

export const updateDisplayOrder = async (items) => {
    const URL = `${API_URL}/programs/program_update_display_order`
    try {
        const response = await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to update display order")
        }

        return await response.json()
    } catch (error) {
        console.error('Error in updateDisplayOrder API:', error)
        throw error
    }
}
