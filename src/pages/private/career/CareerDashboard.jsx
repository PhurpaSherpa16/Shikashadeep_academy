import { IdCard, Plus } from "lucide-react";
import DashboardHeader from "../../../components/DashboardHeader";
import { useGetAllItem } from "../../../hooks/useGetAllItem";
import VacanciesTable from "./components/VacanciesTable";
import CareerInsights from "./components/CareerInsights";
import { useNavigate } from "react-router-dom";
import useDeleteById from "../../../hooks/useDeleteById";
import { toast } from "sonner";
import { useState } from "react";

export default function CareerDashboard() {
    const navigate = useNavigate()
    const [deletingId, setDeletingId] = useState(null)
    const { loading: jobsLoading, error: jobsError, data, getAllItemResponse, page, setPage } = useGetAllItem('school/jobs');
    const { deleteByIdHook, loading: deleteLoading } = useDeleteById();

    const jobs = data?.result || [];
    const total_items = data?.total_items;
    const total_pages = data?.total_pages;
    const current_page = data?.current_page_number;
    const handleView = (id) => navigate(`/admin/career/job/${id}`);
    const handleEdit = (id) => navigate(`/admin/career/job/edit/${id}`);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this job vacancy?")) {
            try {
                setDeletingId(id)
                await deleteByIdHook(id, 'school/job/delete');
                toast.success("Job vacancy deleted successfully");
                getAllItemResponse()
            } catch (error) {
                toast.error("Failed to delete job vacancy");
            }
        }
    };

    const tableProps = {
        jobs,
        loading: jobsLoading,
        handleView,
        handleEdit,
        handleDelete,
        jobsError, 
        setPage,
        total_items,
        total_pages,
        current_page,
        deleteLoading,
        deletingId
    }

    const headerProps = {
        title: "Talent Acquisition Dashboard",
        description: "Manage job postings and review incoming applications efficiently.",
        icon: <IdCard className="size-4" />
    }

    return (
        <div className="dashboard_layout animate_in space-y-6">
            <div className="flex justify-between items-center bg-white/40 p-1 pr-4 rounded-2xl backdrop-blur-sm border border-white/20">
                <DashboardHeader {...headerProps} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Vacancies Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-xl font-bold text-gray-800">Active Openings</h3>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {jobs.length} roles posted
                        </span>
                    </div>
                    <VacanciesTable {...tableProps}/>
                </div>

                {/* Career Insights */}
                <div className="lg:col-span-1">
                    <CareerInsights jobs={jobs} />
                </div>
            </div>
        </div>
    )
}