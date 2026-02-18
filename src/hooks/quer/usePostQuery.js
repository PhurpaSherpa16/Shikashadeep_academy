import { useState } from "react";
import { postQuery } from "../../api/query/postQuery";

export default function usePostQuery(){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const postQueryfromHook = async(formData) =>{
        try {
            setLoading(true)
            const response = await postQuery(formData)
            setData(response?.data)
            return response?.data
        } catch (error) {
            setError(error.message)
            throw error
        }finally{
            setLoading(false)
        }
    }
    return { loading, error, data, postQueryfromHook }
}