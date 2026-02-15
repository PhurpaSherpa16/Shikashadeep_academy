import API_URL from "../api.js";

export const postGallery = async (formData) => {
    const url = `${API_URL}/gallery/post`
    try {
        const body = new FormData()
        
        body.append('title', formData.title)
        body.append('caption', formData.caption)
        
        // Append tags
        formData.tags.forEach(tag => {
            body.append('tags[]', tag)
        })
        
        // Append images
        formData.images.forEach(image => {
            body.append('images', image)
        })

        const response = await fetch(url, {
            method: "POST",
            body: body
        })
        
        const data = await response.json()
        if (!response.ok) {
            console.log('error in postGallery: ', response, data.message);
            throw new Error("Failed to create new story, please try again later.")
        }
        console.log('success in postGallery: ', response, data.message);
        return data
    } catch (error) {
        console.log('error in postGallery: ', error);
        throw new Error("Failed to create new story, please try again later.")
    }
}
