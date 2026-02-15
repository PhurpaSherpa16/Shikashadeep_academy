import API_URL from "../api.js"

export const getBlogById = async (blogId) => {
    const url = `${API_URL}/blogs/${blogId}`
    try {
        const controller = new AbortController()
        const response = await fetch(url, {signal: controller.signal})

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`);
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        if(error.name !== 'AbortError'){
            console.log("Error in getBlogById: ", error)
            throw new Error("Unable to load blog, please try again later.")
        }
    }
}