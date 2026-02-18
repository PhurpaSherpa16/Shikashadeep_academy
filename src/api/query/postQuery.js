import API_URL from "../api"

export const postQuery = async (formData) =>{
    const url = `${API_URL}/query/post`
    try {
        const queryData = new FormData()
        queryData.append('full_name', formData.name)
        queryData.append('email', formData.email)
        queryData.append('phone', formData.phone)
        queryData.append('subject', formData.subject)
        queryData.append('message', formData.message)

        const response = await fetch(url, {
            method: "POST",
            body: queryData
        })
        console.log('api response: ', response);
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        console.log('error in api,', error)
        throw error
    }
}