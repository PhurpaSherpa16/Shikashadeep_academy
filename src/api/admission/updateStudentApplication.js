import API_URL from "../api";

export const updateStudentApplication = async (id, data) => {
    const URL = `${API_URL}/admission/update/${id}`
    try {
        const response = await fetch(URL, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            console.log(response)
            throw new Error("Failed to update items")
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}
