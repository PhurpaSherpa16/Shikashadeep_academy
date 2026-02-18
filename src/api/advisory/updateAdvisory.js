import API_URL from "../api";

export const updateAdvisory = async (id, formData) => {
    const url = `${API_URL}/school/advisory/update/${id}`
    try {
        const advisoryData = new FormData()

        advisoryData.append("name", formData.name)
        advisoryData.append("designation", formData.designation)
        advisoryData.append("quotes", formData.quotes)
        advisoryData.append("isActive", formData.isActive)
        
        // Only append image if it's a new file (not a URL string)
        if (formData.image && typeof formData.image !== 'string') {
            advisoryData.append("image_url", formData.image)
        }

        const response = await fetch(url, {
            method: "PUT",
            body: advisoryData
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        throw error.message || "Something went wrong while updating advisory";
    }
}
