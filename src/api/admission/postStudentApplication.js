import API_URL from "../api"

export const postStudentApplication = async (formData) => {
    const URL = `${API_URL}/admission/new`
    
    try {
        console.log('formData', formData)
        const admissionData = new FormData()
        admissionData.append("full_name", formData.full_name)
        admissionData.append("father_name", formData.father_name)
        admissionData.append("mother_name", formData.mother_name)
        admissionData.append("contact_no", formData.contact_no)
        admissionData.append("address", formData.address)
        admissionData.append("previous_school_name", formData.previous_school_name)
        admissionData.append("academic_results", formData.academic_results)
        admissionData.append("current_grade", formData.current_grade)
        admissionData.append("remarks", formData.remarks)

        const response = await fetch(URL, {
            method: "POST",
            body: admissionData
        });
        console.log('response ', response)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to submit application");
        }

        return await response.json();
    } catch (error) {
        console.error("Error submitting application:", error)
        throw error
    }
};
