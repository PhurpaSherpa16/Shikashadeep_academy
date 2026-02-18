import { useState } from "react";
import { updateAdvisory as updateAdvisoryAPI } from "../../api/advisory/updateAdvisory";

export default function useUpdateAdvisory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAdvisory = async (id, formData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await updateAdvisoryAPI(id, formData);
            return response;
        } catch (err) {
            setError(err.message || "Failed to update advisory");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateAdvisory, loading, error };
}
