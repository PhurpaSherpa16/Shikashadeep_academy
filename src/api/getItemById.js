import API_URL from "./api"

export default async function getById(id, from) {
    const url = `${API_URL}/${from}/${id}`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Error in getById: ", error)
        throw new Error("Unable to get the data, please try again later.")
    }
}