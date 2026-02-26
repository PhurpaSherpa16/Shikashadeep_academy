import API_URL from "../api";

export const postFaculty = async (formData) => {
    const url = `${API_URL}/school/teacher/create`
    try {
        const teacherData = new FormData()

        teacherData.append("name", formData.name)
        teacherData.append("designation", formData.designation)
        teacherData.append("experience", formData.experience)
        teacherData.append("qualification", formData.qualification)
        teacherData.append("quotes", formData.quotes)
        teacherData.append("isActive", formData.isActive)
        teacherData.append("tag", formData.tag)
        teacherData.append("image_url", formData.image)

        const response = await fetch(url,{
            method: "POST",
            body: teacherData
        })

        console.log(response)

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message)
        }
        return data

    } catch (error) {
        console.log(error)
        throw error.response?.data || error.message || "Failed to post faculty";
    }
};
