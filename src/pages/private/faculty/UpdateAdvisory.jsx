import { useParams, useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import FacultyAdvisoryForm from "../../../components/forms/FacultyAdvisoryForm";
import HeaderForForms from "../../../components/HeaderForForms";
import Loading from "../../../components/Loading";
import useGetItemById from "../../../hooks/useGetItemById";
import { useEffect } from "react";
import useUpdateAdvisory from "../../../hooks/advisory/useUpdateAdvisory";


export default function UpdateAdvisory() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { getItemById, loading: loadingAdvisory, error: errorAdvisory, data: advisoryResponse } = useGetItemById(id, "school/advisory")
    const { updateAdvisory, error: updateError } = useUpdateAdvisory()

    useEffect(() => {
        if (id) getItemById()
    }, [id])

    const advisoryPostSubmit = async (formData) => {
        try {
            const result = await updateAdvisory(id, formData)
            if (result) {
                setTimeout(() => {
                    navigate("/admin/faculty")
                }, 3000)
                return true
            }
            return false
        } catch (err) {
            console.error("Error updating advisory:", err)
            return false
        }
    }

    const advisoryProps = {
        advisoryData: advisoryResponse?.data,
        error: updateError,
        advisoryPostSubmit
    }

    return (
        <div className="dashboard_layout animate_in">
            <HeaderForForms title={<>Update <span className="text-blue-dark">Advisory</span></>}
                description="Keep your Advisory up to date. Review the information and make the necessary changes below." />

            {loadingAdvisory ? (
                <div className="mt-20">
                    <Loading container={true} text="Fetching advisory..." />
                </div>
            ) : errorAdvisory ? (
                <Error error={errorAdvisory} message="Failed to load advisory data" height="h-96" />
            ) : (
                <FacultyAdvisoryForm {...advisoryProps} />
            )}
        </div>
    )
}