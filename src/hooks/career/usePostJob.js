import { useState } from "react";
import { postJob } from "../../api/career/postJob";

export default function usePostJob() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const postNewJob = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await postJob(formData)
            setData(response);
            return response;
        } catch (error) {
            setError(error.message || "Something went wrong");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, postNewJob };
}
