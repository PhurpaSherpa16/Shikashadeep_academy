import { useParams } from "react-router-dom";
import HeaderForForms from "../../../components/HeaderForForms";
import useGetItemById from "../../../hooks/useGetItemById";
import { useEffect } from "react";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import JobApplicationForm from "./components/JobApplicationForm";
import useJobForm from "../../../hooks/career/useJobForm";

export default function UpdateJob() {
    const { id } = useParams()
    // fetching data with id
    const { getItemById, loading, error, data } = useGetItemById(id, "school/job")
    const jobDetails = data?.data

    // after update refreshing the jobDetails
    const handleRefresh = async () =>{
        const updated = await getItemById()
        console.log(updated)
        console.log('updated')
    }

    // form validation and submit hook
    const { formData, errors, submitState, handleChange, handleUpdate, handleReset, setUpdatingId, setFormData } = useJobForm(handleRefresh)


    useEffect(() => {
        getItemById()
        setUpdatingId(id)
    }, [getItemById, id, setUpdatingId])

    useEffect(() => {
        if (jobDetails) {
            setFormData({
                title: jobDetails.title || "",
                description: jobDetails.description || "",
                requirements: jobDetails.requirements || "",
                qualification: jobDetails.qualification || "",
                experience: jobDetails.experience || "",
                jobType: jobDetails.jobType || "Full Time",
                salary: jobDetails.salary || "",
                location: jobDetails.location || "",
                startDate: jobDetails.startDate ? new Date(jobDetails.startDate).toISOString().split('T')[0] : "",
                endDate: jobDetails.endDate ? new Date(jobDetails.endDate).toISOString().split('T')[0] : "",
                remarks: jobDetails.remarks || "",
                isActive: jobDetails.isActive || false,
                document_url: jobDetails.document_url || null,
                no_of_applicants : jobDetails.no_of_applicants || 0
            })
        }
    }, [jobDetails, setFormData])

    const jobApplicationProps = { jobDetails, formData, errors, submitState, handleChange, handleUpdate, handleReset }


    return (
        <div className="dashboard_layout animate_in max-w-5xl mx-auto pb-12">
            <HeaderForForms title="Update Job" description="Fill in the details below to update the job vacancy." />

            <>
                {loading ? <Loading /> : error ? <Error error={error} /> : (
                    <JobApplicationForm {...jobApplicationProps} />
                )}
            </>

        </div>
    )
}