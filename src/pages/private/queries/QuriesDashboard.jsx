import { Mails } from "lucide-react";
import { useState, useEffect } from "react";
import DashboardHeader from "../../../components/DashboardHeader";
import { useGetAllItem } from "../../../hooks/useGetAllItem";
import useGetItemById from "../../../hooks/useGetItemById";
import usePatchUpdate from "../../../hooks/usePatchUpdate";
import QueryTable from "./components/QueryTable";
import QueryDetails from "./components/QueryDetails";
import QueryInsights from "./components/QueryInsights";
import useDeleteById from "../../../hooks/useDeleteById";

export default function QueriesDashboard() {
    const [selectedQueryId, setSelectedQueryId] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeletingId, setIsDeletingId] = useState(null)

    // Fetch all queries
    const {loading: queriesLoading, data, getAllItemResponse, page, setPage} = useGetAllItem('query');

    // Fetch single query by id
    const {loading: queryLoading, error: queryError, data: queryData, getItemById} = useGetItemById(selectedQueryId, 'query');

    // Update query data read status
    const { patchUpdate } = usePatchUpdate()

    // Delete application data
    const { loading: deleteLoading, error: deleteError, deleteByIdHook } = useDeleteById()

    // Fetch query detail when selectedQueryId changes
    useEffect(() => {if (selectedQueryId) {getItemById();}}, [selectedQueryId, getItemById]);

    const headerProps = {
        title: "Queries Dashboard",
        description: "Manage your queries",
        icon: <Mails className="text-blue-dark size-4" />,
    }
    
    // Backend returns a flat array (no pagination wrapper)
    const queriesData = Array.isArray(data) ? data : data?.data ?? []
    const total_page = data?.total_pages ?? 1
    const total_items = data?.total_items ?? 0

    const handleViewQuery = async (id) => {
        await patchUpdate(id, 'query/update')
        setSelectedQueryId(id);
        setIsDetailsOpen(true);
    };

    const handleBackToList = async () => {
        await getAllItemResponse();
        setIsDetailsOpen(false);
        setSelectedQueryId(null);
    }
    const handleDelete = async(id) =>{
        const confirmed = window.confirm("Are you sure you want to delete this query?")
        if (!confirmed) return
        setIsDeletingId(id)
        const result = await deleteByIdHook(id, 'query/remove')
        if (result) {
            await getAllItemResponse();
        }
        setIsDeletingId(null)
    }

    const queryTableProps = {isDeletingId, deleteLoading, deleteError, handleDelete, queriesLoading, queriesData, handleViewQuery, page, setPage, total_page, total_items}

    return (
        <div className="dashboard_layout animate_in">
            <DashboardHeader {...headerProps} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Table or Detail View */}
                <div className="lg:col-span-2">
                    {isDetailsOpen ? (
                        <QueryDetails
                            queryData={queryData?.data}
                            queryLoading={queryLoading}
                            queryError={queryError}
                            handleBackToList={handleBackToList}/>
                    ) : (
                        <QueryTable {...queryTableProps}/>
                    )}
                </div>

                {/* Right: Insights */}
                <div className="lg:col-span-1">
                    <QueryInsights queriesData={queriesData} />
                </div>
            </div>
        </div>
    );
}