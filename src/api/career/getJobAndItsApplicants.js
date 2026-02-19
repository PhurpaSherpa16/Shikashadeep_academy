import API_URL from "../api"

export const getJobAndItsApplicants = async (id, page = 1) => {
    const url = `${API_URL}/school/job-applications/${id}?page=${page}`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Failed to fetch job and its applicants, please try again later.")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw new Error('Unable to fetch job and its applicants, please try again later.')
    }
}