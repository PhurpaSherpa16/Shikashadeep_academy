import API_URL from "../api"

export const postJobApplication = async (id, formData) => {
    const url = `${API_URL}/school/job/apply/${id}`
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        })
        console.log('response: ', response)
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to apply for job.")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Post, ', error);
        throw new Error(error.message || "Failed to apply for job.")
    }
}