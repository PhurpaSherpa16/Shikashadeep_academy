import API_URL from "../api"

export const getAllAlbums = async (page = 1, limit = 10) => {
    try {
        const url = `${API_URL}/gallery?page=${page}&limit=${limit}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Failed to fetch images")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}