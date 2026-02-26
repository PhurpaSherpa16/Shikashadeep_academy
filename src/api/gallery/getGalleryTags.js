import API_URL from "../api"

export const getGalleryTags = async (tag, page) => {
    const url = `${API_URL}/gallery/images/tag?q=${tag}&page=${page}`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Failed to fetch tags")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}
