import { UserPlus } from "lucide-react"
import DashboardHeader from "../../../components/DashboardHeader"
import { useGetAllItem } from "../../../hooks/useGetAllItem"
import StudentTable from "./components/StudentTable"
import StudentInsights from "./components/StudentInsights"
import { useState, useEffect } from "react"
import Application from "./Application"
import useGetItemById from "../../../hooks/useGetItemById"
import usePatchUpdate from "../../../hooks/usePatchUpdate"
import Loading from "../../../components/Loading"
import Error from "../../../components/Error"
import useDeleteById from "../../../hooks/useDeleteById"

export default function AdmissionDashBoard() {
    const [selectedStudentId, setSelectedStudentId] = useState(null)
    const [isdetailsOpen, setIsDetailsOpen] = useState(false)
    const [isDeletingId, setIsDeletingId] = useState(null)
    // Fetch single application data
    const { loading: applicationLoading, error: applicationError, data: applicationData, getItemById } = useGetItemById(selectedStudentId, 'admission/application')
    // Fetch all application data
    const { loading: studentApplicationsLoading, error: studentApplicationsError, data, getAllItemResponse: getAllStudentApplicationsResponse, 
        page: studentApplicationsPage, limit: studentApplicationsLimit, setPage: setStudentApplicationsPage } = useGetAllItem('admission/applications')
    
    // Delete application data
    const { loading: deleteLoading, error: deleteError, deleteByIdHook } = useDeleteById()

    const {patchUpdate} = usePatchUpdate()
    
    // Fetch application data when selectedStudentId changes
    useEffect(() => {
        if (selectedStudentId) {
            getItemById()
        }
    }, [selectedStudentId, getItemById])

    const headerProps = {
        title: "Admission Dashboard",
        description: "Manage your admissions",
        icon: <UserPlus className="text-blue-dark size-4" />,
    }

    const studentApplicationsData = data?.result
    const total_page = data?.total_pages
    const total_items = data?.total
    const current_page = data?.current_page_number

    
    const handleViewApplication = async (id) => {
        const result = await patchUpdate(id, 'admission/update')
        if (result) {
            setSelectedStudentId(id)
            setIsDetailsOpen(true)
        }
    }
    
    const handleBackToList = async () => {
        await getAllStudentApplicationsResponse()
        setIsDetailsOpen(false)
        setSelectedStudentId(null)
    }
    
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this application?")
        if (!confirmed) return
        setIsDeletingId(id)
        const result = await deleteByIdHook(id, 'admission/remove')
        if (result) {
            await getAllStudentApplicationsResponse()
        }
        setIsDeletingId(null)
    }
    
    const studentApplicationsProps = {
        studentApplicationsLoading, studentApplicationsError, studentApplicationsData,
        getAllStudentApplicationsResponse, studentApplicationsPage, studentApplicationsLimit,
        setStudentApplicationsPage, total_page, total_items, current_page, deleteLoading, deleteError, handleDelete,
        isDeletingId
    }

    return (
        <div className='dashboard_layout animate_in'>
            <DashboardHeader {...headerProps} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Table */}
                <div className="lg:col-span-2">
                    {isdetailsOpen ? 
                    (applicationLoading ? <Loading />
                    : applicationError || !applicationData ? <Error error={applicationError} />
                    : <Application applicationData={applicationData?.data} handleBackToList={handleBackToList} />
                    ) 
                    : 
                        (<StudentTable {...studentApplicationsProps} handleViewApplication={handleViewApplication} />)}
                </div>

                {/* Student Insights */}
                <div className="lg:col-span-1">
                    <StudentInsights studentApplicationsData={studentApplicationsData} />
                </div>
            </div>
        </div>
    )
}