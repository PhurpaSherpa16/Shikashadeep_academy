import API_URL from "../api"

export const getAllImages = async (page = 1, limit = 9) => {
    try {
        const url = `${API_URL}/gallery/images?page=${page}&limit=${limit}`
        const response = await fetch(url)
        if (!response.ok) {
            console.log(response);
            throw new Error("Failed to fetch images")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}