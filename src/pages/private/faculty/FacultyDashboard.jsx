import { useEffect, useState, useMemo } from "react";
import { Users, UserPlus, GraduationCap } from "lucide-react";
import DashboardHeader from "../../../components/DashboardHeader";
import { useGetAllItem } from "../../../hooks/useGetAllItem";
import FacultyInsights from "./components/FacultyInsights";
import useDeleteById from "../../../hooks/useDeleteById";
import SubmitActionButton from "../../../components/SubmitActionButton";
import Teachers from "./components/Teachers";
import Advisory from "./components/Advisory";

export default function FacultyDashboard() {
    // advisory fetching
    const { loading: advisoryLoading, error: advisoryError, data: advisoryData, getAllItemResponse: getAllAdvisoryResponse } = useGetAllItem("school/advisory")

    // teacher fetching
    const { loading: facultyLoading, error: facultyError, data: facultyData, getAllItemResponse: getAllFacultyResponse } = useGetAllItem("school/teachers")
    const { deleteByIdHook, loading: deleteLoading, error: deleteError, setError } = useDeleteById();
    const [deletingId, setDeletingId] = useState(null);

    const headerProps = {
        title: "Faculty Dashboard",
        description: "Manage your academic staff and department heads",
        icon: <Users className="text-blue-dark size-4" />,
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this faculty member?")) {
            setDeletingId(id);
            try {
                await deleteByIdHook(id, "school/teacher/delete");
                getAllFacultyResponse()
                setDeletingId(null);
            } catch (error) {
                setError(error.message)
            }
        }
    }

    const advisoryHandleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this advisory member?")) {
            setDeletingId(id);
            try {
                await deleteByIdHook(id, "school/advisory/delete")
                getAllAdvisoryResponse()
                setDeletingId(null)
            } catch (error) {
                setError(error.message)
            }
        }
    }

    useEffect(() => {
        if (deleteError) {
            const timer = setTimeout(() => {
                setError(null)
                setDeletingId(null)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [deleteError, setError])

    const facultyProps = {
        facultyLoading, facultyError, facultyData, getAllFacultyResponse, handleDelete, deleteLoading, deletingId, deleteError
    }

    const advisoryProps = {
        advisoryLoading, advisoryError, advisoryData, getAllAdvisoryResponse, advisoryHandleDelete, deleteLoading, deletingId, deleteError
    }

    return (
        <div className="dashboard_layout animate_in">
            {/* Dashboard Header */}
            <DashboardHeader {...headerProps} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Right Column: Advisory */}
                <div className="col-span-2 space-y-8">
                    <Advisory {...advisoryProps} />

                    {/* Left Column: Teachers List (Grouped by Tag) */}
                    <Teachers {...facultyProps} />
                </div>

                {/* Right Column: Insights */}
                <div className="xl:col-span-1">
                    <FacultyInsights facultyProps={facultyProps} advisoryProps={advisoryProps}/>
                </div>
            </div>

        </div>
    );
}