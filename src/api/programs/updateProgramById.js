import API_URL from "../api";

export default async function updateProgramById(id, formData) {
    const url = `${API_URL}/programs/program_update/${id}`
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

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: body,
            })
            const result = await response.json()
            if(!response.ok){
                console.log('Error in updateProgramById: ', response)
                throw new Error(result.message || `HTTP error! status: ${response.status}`)
            }
            console.log('Success in updateProgramById: ', response)
            return result
        } catch (error) {
            console.error("Error in updateProgramById:", error)
            throw error
        }
    } catch (error) {
        console.error("Error in updateProgramById:", error)
        throw error
    }
}