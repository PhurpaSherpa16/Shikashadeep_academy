import API_URL from "../api";
export default async function updateAlbumById(id, formData) {
    const url = `${API_URL}/gallery/post_update/${id}`;
    const data = new FormData();
    data.append('title', formData.title);
    data.append('caption', formData.caption);
    
    // Handle tags (send as JSON string)
    data.append('tags', JSON.stringify(formData.tags));
    
    // Handle images
    // 1. Identify existing images that were kept
    const keptImages = formData.previews
        ? formData.previews.filter(p => p.isExisting).map(p => p.url)
        : [];
    data.append('existingImages', JSON.stringify(keptImages));
    
    // 2. Append new image files
    if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
            data.append('images', file);
        });
    }

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: data,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error("Error in updateAlbumById:", error);
        throw error;
    }
}
