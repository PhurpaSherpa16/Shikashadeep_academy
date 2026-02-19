import HeaderForForms from "../../../components/HeaderForForms";
import { useParams, useNavigate } from "react-router-dom";
import useGetJobAndItsApplicants from "../../../hooks/career/useGetJobAndItsApplicants";
import Loading from "../../../components/Loading";
import ViewVacancy from "./components/ViewVacancy";
import Error from "../../../components/Error";
import useDeleteById from "../../../hooks/useDeleteById";
import { toast } from "sonner";

export default function ViewApplication() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { refetchJobAndItsApplicantsData, loading, error, data, page, setPage } = useGetJobAndItsApplicants(id)
    const { deleteByIdHook } = useDeleteById()

    const jobDetails = data?.data?.job
    const applicantsDetails = data?.data?.applicants
    const total_items = data?.data?.total_items || 0
    const total_pages = data?.data?.total_pages || 0
    const current_page = data?.data?.current_page_number || 0

    const handleEdit = (jobId) => navigate(`/admin/career/update/${jobId}`)

    const handleDelete = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job vacancy?")
        if (confirmDelete) {
            try {
                await deleteByIdHook(jobId, "school/job")
                toast.success("Job deleted successfully")
                navigate("/admin/career")
            } catch (error) {
                toast.error("Failed to delete job")
            }
        }
    }

    const jobAndVacancyProps = {
        jobDetails,
        applicantsDetails,
        total_items,
        total_pages,
        current_page,
        setPage,
        handleEdit,
        handleDelete
    }
    console.log(applicantsDetails)

    return (
        <div className="dashboard_layout animate_in max-w-7xl mx-auto pb-12">
            <HeaderForForms title="View Vacancy Details" description="Detailed overview of the job vacancy and current applicants." />
            {loading && !data ?
                <div className="py-42">
                    <Loading text={'Loading details'} />
                </div>
                : error ? <Error error={error} /> 
                : <ViewVacancy {...jobAndVacancyProps} />
            }
        </div>
    )
}