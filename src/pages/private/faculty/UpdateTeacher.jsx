import HeaderForForms from "../../../components/HeaderForForms";
import { useParams, useNavigate } from "react-router-dom";
import useGetItemById from "../../../hooks/useGetItemById";
import { useEffect } from "react";
import FacultyTeacherForm from "../../../components/forms/FacultyTeacherForm";
import useUpdateFaculty from "../../../hooks/faculty/useUpdateFaculty";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

export default function UpdateTeacher() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: teacherData, loading: teacherLoading, error: teacherError, getItemById } = useGetItemById(id, "school/teacher")
    const { updateTeacher, loading: updateLoading, error: updateError } = useUpdateFaculty()

    useEffect(() => {
        if (id) getItemById()
    }, [id])

    const handleSubmit = async (formData) => {
        try {
            const result = await updateTeacher(id, formData)
            if (result) {
                setTimeout(() => {
                    navigate("/admin/faculty")
                },3000)
                return true
            }
            return false
        } catch (err) {
            console.error("Error updating teacher:", err)
            return false
        }
    }

    return (
        <div className="dashboard_layout animate_in">
            <HeaderForForms title={<>Update <span className="text-blue-dark">Teacher</span></>}
                description="Keep your Teacher up to date. Review the information and make the necessary changes below." />

            {teacherLoading ? (
                <div className="mt-20">
                    <Loading container={true} text="Fetching teacher profile..." />
                </div>
            ) : teacherError ? (
                <Error error={teacherError} message="Failed to load teacher data" height="h-96" />
            ) : (
                <FacultyTeacherForm
                    onSubmit={handleSubmit}
                    error={updateError}
                    facultyData={teacherData?.data}
                />
            )}
        </div>
    )
}