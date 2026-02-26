import { CloudCog, Mails } from "lucide-react";
import DashboardHeader from "../../../components/DashboardHeader";
import { useGetAllItem } from "../../../hooks/useGetAllItem";
import SubscriberTable from "./components/SubscriberTable";
import SubscriberInsights from "./components/SubscriberInsights";
import useDeleteById from "../../../hooks/useDeleteById";
import { toast } from "sonner";
import { useState } from "react";

export default function SubscriberDashboard(){
    const [deletingId, setDeletingId] = useState(null)
    // subscriber fetching
    const {loading: subscriberLoading, error: subscriberError, data: subscriberData, getAllItemResponse: subscriberGetAllItemResponse, setPage} = useGetAllItem('subscriber')
    const total_items = subscriberData?.totalSubscriber
    const total_pages = subscriberData?.totalPages
    const current_page = subscriberData?.currentPage
    const subscribers = subscriberData?.result

    // delete hook
    const { deleteByIdHook, loading: deleteLoading } = useDeleteById()

    const headerProps = {
        title : "Subscriber Management Panel",
        description : "View, organize, and communicate with your subscribers. Send targeted updates and grow your audience effectively.",
        icon : <Mails className="size-4 text-blue-dark"/>
    }
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this subscriber?")
        if (!confirmed) return
        try {
            setDeletingId(id)
            await deleteByIdHook(id, 'subscriber/remove')
            subscriberGetAllItemResponse()
            toast.success("Subscriber deleted successfully")
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Failed to delete subscriber/")
        }finally{
            setDeletingId(null)
        }
    }

    const subscriberProps = {subscriberLoading, subscriberError, subscribers, subscriberGetAllItemResponse, setPage, total_items, total_pages, current_page, deleteLoading, handleDelete, deletingId}

    return(
        <div className="dashboard_layout animate_in">
            <DashboardHeader {...headerProps}/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <SubscriberTable {...subscriberProps}/>
                </div>
                <div className="lg:col-span-1">
                    <SubscriberInsights totalItems={total_items}/>
                </div>
            </div>
        </div>
    )
}