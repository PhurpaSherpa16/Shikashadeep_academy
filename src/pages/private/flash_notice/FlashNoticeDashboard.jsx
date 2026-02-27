import DashboardHeader from "../../../components/DashboardHeader";
import { Megaphone, Plus, ArrowLeft } from "lucide-react";
import { useGetAllItemsCache } from "../../../hooks/useGetAllItemsCache";
import { useState } from "react";
import FlashNoticeTable from "./components/FlashNoticeTable";
import FlashNoticeInsight from "./components/FlashNoticeInsight";
import IconPagination from "../../../components/pagination/IconPagination";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteById from "../../../hooks/useDeleteById";
import { toast } from "sonner";
import FlashNoticeForm from "./components/FlashNoticeForm";
import useNoticeForm from "../../../hooks/flash_notice/useNoticeForm";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

export default function FlashNoticeDashboard() {
    const [page, setPage] = useState(1)
    const [editingNotice, setEditingNotice] = useState(null)
    const from = `school/flash-notice?page=${page}`

    // Data fetching
    const { data, isLoading: loading, error } = useGetAllItemsCache(from)
    const flashNoticesData = data?.data
    const flashNotices = flashNoticesData?.notices || []
    const total_pages = flashNoticesData?.total_pages
    const total_items = flashNoticesData?.total_items
    const activeNotices = flashNotices.filter(n => n.isActive).length

    const queryClient = useQueryClient()
    const { deleteByIdHook } = useDeleteById()
    const [deletingId, setDeletingId] = useState(null)

    // Form logic for editing
    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: [from] })
    }

    const {formData, errors, setFormData, setUpdatingId, handleChange, handleUpdate, handleReset, loading: formLoading} = useNoticeForm()

    const handleEdit = (notice) => {
        setEditingNotice(notice)
        console.log(notice)
        setUpdatingId(notice.id)
        setFormData({
            title: notice.title || "",
            content: notice.content || "",
            isActive: notice.isActive || false,
            startDate: notice.startDate ? new Date(notice.startDate).toISOString().split('T')[0] : "",
            endDate: notice.endDate ? new Date(notice.endDate).toISOString().split('T')[0] : "",
            image_url: notice.image_url || null
        })
    }


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this flash notice?")) {
            setDeletingId(id)
            try {
                await deleteByIdHook(id, "school/flash-notice/delete")
                toast.success("Notice deleted successfully")
                handleRefresh()
            } catch (err) {
                toast.error(err.message || "Failed to delete notice")
            } finally {
                setDeletingId(null)
            }
        }
    }

    const headerProps = {
        title: "Flash Notice Dashboard",
        description: "Manage your flash notices and announcements",
        icon: <Megaphone className="text-blue-dark size-4" />,
    }

    if (error) return <Error error={error} />

    return (
        <div className="dashboard_layout animate_in max-w-7xl mx-auto px-4 md:px-6 pb-12">
            <DashboardHeader {...headerProps}>
                {!editingNotice && (
                    <a href="/dashboard/flash-notice/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 font-medium text-sm active:scale-95">
                        <Plus size={18} />
                        Add New Notice
                    </a>
                )}
            </DashboardHeader>

            {editingNotice ? (
                <div className="space-y-6">
                    <div>
                        <button onClick={() => setEditingNotice(null)} className="flex items-center gap-2 px-4 py-2 text-sm active:scale-95">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </button>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Notice</h2>
                            <p className="text-gray-500">Update the details of your announcement</p>
                        </div>
                        <FlashNoticeForm formData={formData} errors={errors} handleChange={handleChange} handleUpdate={handleUpdate} handleReset={handleReset} loading={formLoading} isUpdate={true}/>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Table Grid */}
                    <div className="lg:col-span-3 space-y-6">
                        {loading ? (
                            <div className="h-64 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-gray-800">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <FlashNoticeTable notices={flashNotices} onEdit={handleEdit} onDelete={handleDelete} deletingId={deletingId}/>
                                <IconPagination page={page} setPage={setPage} totalPages={total_pages} totalItems={total_items} itemLabel="notices"/>
                            </>
                        )}
                    </div>

                    {/* Insights Grid */}
                    <div className="lg:col-span-1">
                        <FlashNoticeInsight totalNotices={total_items} activeNotices={activeNotices}/>
                    </div>
                </div>
            )}
        </div>
    )
}