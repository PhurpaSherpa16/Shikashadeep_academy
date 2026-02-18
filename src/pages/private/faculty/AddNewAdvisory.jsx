import FacultyAdvisoryForm from "../../../components/forms/FacultyAdvisoryForm";
import HeaderForForms from "../../../components/HeaderForForms";
import usePostAdvisory from "../../../hooks/advisory/usePostAdvisory";

export default function AddNewAdvisory() {
    const { postNewAdvisory, loading: isAdvisoryPostingLoading, error: isAdvisoryPostingError } = usePostAdvisory();

    const advisoryPostSubmit = async (formData) => {
        try {
            const result = await postNewAdvisory(formData)
            return result
        } catch (err) {
            return false
        }
    }

    const AdvisoryProps = { advisoryPostSubmit, isAdvisoryPostingLoading, error: isAdvisoryPostingError }

    return (
        <div className="dashboard_layout animate_in">
            {/* Dashboard Header */}
            <HeaderForForms title={<>Add a <span className="text-blue-dark">New Advisory</span></>} description="Expand our academic offerings. Fill in the details below to register a new advisory in the system." />

            {/* Advisory Form */}
            <FacultyAdvisoryForm {...AdvisoryProps} />
        </div>
    )
}