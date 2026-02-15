import API_URL from "./api";

export const getAllItems = async (from, page, limit) => {
    const URL = `${API_URL}/${from}?page=${page}&limit=${limit}`
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            console.log(response)
            throw new Error("Failed to fetch items")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}