import { useState } from "react";
import { updateProfile } from "../../api/user/updateProfile";

export default function useUpdateProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const updateUserProfile = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateProfile(id, formData);
            setData(response?.data);
            return response;
        } catch (err) {
            console.log("Error in useUpdateProfile hook:", err);
            setError(err?.message || err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, data, updateProfile: updateUserProfile };
}
