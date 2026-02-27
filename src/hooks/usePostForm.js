import { useState } from "react";
import { postFormData } from "../api/postFomData";
import { updateFormData } from "../api/updateFormData";

export default function usePostForm(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const postForm = async (from, formData, action='post') => {
        setLoading(true);
        setError(null);
        try {
            let response
            if(action === 'post'){
                response = await postFormData(from, formData)
            }
            else if(action === 'put'){
                response = await updateFormData (from, formData)
            }
            setData(response);
            return response;
        } catch (error) {
            setError(error.message || "Something went wrong");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, postForm};
}