import API_URL from "../api";

export const postJob = async (formData) => {
    const url = `${API_URL}/school/job/create`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to post job");
        }
        return data;
    } catch (error) {
        throw new Error(error.message || "Failed to post job");
    }
};
