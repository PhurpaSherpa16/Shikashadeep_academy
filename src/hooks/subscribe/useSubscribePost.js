import { useState } from "react"
import postSubscribe from "../../api/subscription/postSubscribe"

export default function useSubscribePost(){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const subscribePost = async(subscribeData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await postSubscribe(subscribeData)
            setData(response?.data)
            return response?.data
        } catch (error) {
            setError(error.message)
            throw error
        }finally{
            setLoading(false)
        }
    }

    return {loading, error, data, subscribePost }
}