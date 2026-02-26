import API_URL from "../api"

export default async function postSubscribe(subscribeData){
    const url = `${API_URL}/subscriber/post`
    try {
        const response = await fetch(url, {
            method : 'POST',
            body : subscribeData
        })
        console.log('response', response)
        if(!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to subscribe')
        }
        const data = await response.json()
        return data

    } catch (error) {
        throw error.message || 'Failed to subscribe'
    }   
}