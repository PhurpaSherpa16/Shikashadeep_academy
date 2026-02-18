import API_URL from "../api";

export const postAdvisory = async (formData) => {
    const url = `${API_URL}/school/advisory/create`
    try {
        const advisoryData = new FormData()

        advisoryData.append("name", formData.name)
        advisoryData.append("designation", formData.designation)
        advisoryData.append("quotes", formData.quotes)
        advisoryData.append("isActive", formData.isActive)
        advisoryData.append("image_url", formData.image)

        const response = await fetch(url, {
            method: "POST",
            body: advisoryData
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        throw error.message || "Something went wrong while saving advisory";
    }
}
