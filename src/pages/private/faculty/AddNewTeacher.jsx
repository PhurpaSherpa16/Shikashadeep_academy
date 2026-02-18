import FacultyTeacherForm from "../../../components/forms/FacultyTeacherForm";
import HeaderForForms from "../../../components/HeaderForForms";
import usePostFaculty from "../../../hooks/faculty/usePostFaculty";

export default function AddNewTeacher() {
    const { postNewTeacher, loading, error } = usePostFaculty();

    const handleSubmit = async (formData) => {
        try {
            const result = await postNewTeacher(formData);
            return result
        } catch (err) {
            console.log('Error in handleSubmit', err)
            return false
        }
    }

    return (
        <div className="dashboard_layout animate_in">
            {/* Dashboard Header */}
            <HeaderForForms
                title={<>Add a <span className="text-blue-dark">New Teacher</span></>}
                description="Expand our academic offerings. Fill in the details below to register a new teacher in the system."
            />
            <FacultyTeacherForm onSubmit={handleSubmit} loading={loading} error={error}/>
        </div>
    );
}