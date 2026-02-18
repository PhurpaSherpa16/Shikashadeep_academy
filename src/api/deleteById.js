import API_URL from "./api"

export default async function deleteById(id, from) {
    const url = `${API_URL}/${from}/${id}`
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`Failed to delete ${from} with id ${id}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error.message || "Failed to delete, please try again later.")
    }
}