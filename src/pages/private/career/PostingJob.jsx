import JobApplicationForm from "./components/JobApplicationForm";
import HeaderForForms from "../../../components/HeaderForForms";
import useJobForm from "../../../hooks/career/useJobForm";

export default function PostingJob() {
    const { formData, errors, submitState, handleChange, handleSubmit, handleReset } = useJobForm()

    const jobApplicationProps = {formData,errors,submitState,handleChange,handleSubmit,handleReset}

    return (
        <div className="dashboard_layout animate_in max-w-5xl mx-auto pb-12">
            <HeaderForForms title="Post New Job" description="Fill in the details below to create a new job vacancy posting."/>
            <JobApplicationForm {...jobApplicationProps}/>
        </div>
    );
}