import API_URL from "../api";

export const updateBlogById = async ({id, formData}) => {
    try {
        const url = `${API_URL}/blogs/blog_update/${id}`
        const body = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            body.append(key, value)
        })
        const response = await fetch(url, {
            method: "PUT",
            body: body,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Failed to update blog:", error);
        throw new Error("Unable to update blog. Please try again later.");
    }
}