import API_URL from "./api"

export const updateFormData = async(from, formData) =>{
    const url = `${API_URL}/${from}`
    try {
        const response = await fetch(url,{
            method : "PUT",
            body : formData
        })

        console.log('response', response)
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message || "Failed to post data")
        }
        return data
    } catch (error) {
        console.log('Post, ', error);
        throw new Error(error.message || "Failed to post data")
    }
    
}