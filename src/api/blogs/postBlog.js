import API_URL from "../api.js";

export const postBlog = async (formData) => {
    try {
        const url = `${API_URL}/blogs/blog_post`
        const body = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            body.append(key, value)
        })
        const response = await fetch(url, {
            method: "POST",
            body: body
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        throw error
    }
}