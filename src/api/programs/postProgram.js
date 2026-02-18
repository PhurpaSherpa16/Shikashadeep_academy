import API_URL from "../api";

export const postProgram = async (formData) => {
    const url = `${API_URL}/programs/program_post`
    try {
        const body = new FormData()
        body.append('title', formData.title)
        body.append('grade', formData.grade)
        body.append('description', formData.description)
        body.append('image', formData.image)

        // append features
        formData.features.forEach(feature => {
            body.append('features[]', feature)
        })

        const response = await fetch(url,{
            method : "POST",
            body : body
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        return data  
    } catch (error) {
        throw new Error(error.message)
    }
};