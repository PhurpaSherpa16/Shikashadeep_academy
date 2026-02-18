import API_URL from "./api";

export const updatePatch = async (id, from) => {
    const URL = `${API_URL}/${from}/${id}`
    try {
        const response = await fetch(URL, {method: "PATCH"})
        if (!response.ok) {
            console.log(response);
            throw new Error("Failed to update items")
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}
