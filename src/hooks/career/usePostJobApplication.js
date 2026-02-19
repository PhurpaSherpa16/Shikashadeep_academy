import { useState } from "react";
import { postJobApplication } from "../../api/career/postJobApplication";

export default function usePostJobApplication(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const jobApplicationPosting = async (id, formData) => {
        setLoading(true)
        setError(null)
        try {
            const data = await postJobApplication(id, formData)
            setData(data)
            return data
        } catch (error) {
            console.log('Error', error);
            setError(error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {loading, error, data, jobApplicationPosting}
}