import API_URL from "../api"

export const deleteBlogById = async (id) => {
    try {
        const url = `${API_URL}/blogs/blog_delete/${id}`
        const response = await fetch(url, {method: "DELETE",})
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}