import HeaderForForms from "../../../components/HeaderForForms";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetItemById from "../../../hooks/useGetItemById";
import ManageProfileForm from "../../../components/forms/ManageProfileForm";
import useUpdateProfile from "../../../hooks/user/useUpdateProfile";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { toast } from "sonner";

export default function ManageProfile() {
    const { id } = useParams();
    const { getItemById, loading, error, data } = useGetItemById(id, "user");
    const { updateProfile, error: updateError } = useUpdateProfile();

    useEffect(() => {
        if (id) getItemById();
    }, [id, getItemById]);

    const handleSubmit = async (formData) => {
        try {
            const result = await updateProfile(id, formData);
            console.log("Profile update result:", result)
            if (result) {
                const storedUser = localStorage.getItem("user")
                const updatedUser = {
                    ...storedUser,
                    ...result.data
                }
                localStorage.setItem("user", JSON.stringify(updatedUser))
            }
            toast.success("Profile updated successfully")
            return
        } catch (err) {
            console.error("Error updating profile:", err);
            return false;
        }
    };

    const userData = data?.data ?? data;

    return (
        <div className="dashboard_layout animate_in">
            <HeaderForForms title="Manage Profile" description="Update your personal information and profile settings."/>
            {loading ? (
                <div className="mt-20">
                    <Loading container={true} text="Fetching profile..." />
                </div>
            ) : error ? (
                <Error error={error} message="Failed to load profile" height="h-96" />
            ) : (
                <ManageProfileForm userData={userData} onSubmit={handleSubmit} error={updateError} />
            )}
        </div>
    );
}
