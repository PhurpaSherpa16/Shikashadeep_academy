import API_URL from "../api";

export default async function updateJobDetails(id, formData){
    const url = `${API_URL}/school/job/update/${id}`
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: formData,
        });
        const data = await response.json();
        return data
    } catch (error) {
        throw error
    }
}