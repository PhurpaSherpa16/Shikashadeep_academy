import API_URL from "../api.js";

export const getAllBlogs = async (page=1, limit=10) => {
    const url = `${API_URL}/blogs?page=${page}&limit=${limit}`
    
    try {
        const controller = new AbortController()
        const response = await fetch(url, {signal: controller.signal});
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (error) {
        if(error.name !== 'AbortError'){
            console.error("Failed to fetch blogs:", error);
            throw new Error("Unable to load blogs. Please try again later.");
        }
    }
}