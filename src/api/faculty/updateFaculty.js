import API_URL from "../api";

export const updateFaculty = async (id, formData) => {
    const url = `${API_URL}/school/teacher/update/${id}`
    try {
        const teacherData = new FormData()

        teacherData.append("name", formData.name)
        teacherData.append("designation", formData.designation)
        teacherData.append("experience", formData.experience)
        teacherData.append("qualification", formData.qualification)
        teacherData.append("quotes", formData.quotes)
        teacherData.append("isActive", formData.isActive)
        teacherData.append("tag", formData.tag)
        
        // Only append image if it's a new file (not a URL string)
        if (formData.image && typeof formData.image !== 'string') {
            teacherData.append("image_url", formData.image)
        }

        const response = await fetch(url, {
            method: "PUT",
            body: teacherData
        })
        console.log(response)
        const data = await response.json()

        if (!response.ok) {
            console.log('error in updateFaculty', response)
            throw new Error(data.message || "Failed to update faculty")
        }
        return data

    } catch (error) {
        console.log('Error in updateFaculty', error)
        throw error.message || "Failed to update faculty";
    }
};
