import API_URL from "./api";

export const getAllItem = async (from) => {
    const URL = `${API_URL}/${from}`
    console.log(URL)
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error("Failed to fetch items")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}