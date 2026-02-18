import { useGetAllItem } from "../../../hooks/useGetAllItem"
import { useState, useMemo } from "react"
import ProgramInsights from "@/components/program/ProgramInsights"
import LivePreview from "./components/LivePreview"
import ArrangeProgram from "@/components/program/ArrangeProgram"
import useDeleteById from "../../../hooks/useDeleteById"
import DashboardHeader from "../../../components/DashboardHeader"
import { Sparkles } from "lucide-react"


export default function ProgramDashboard() {
    const { loading:itemLoading, error:itemError, data:itemsData, getAllItemResponse} = useGetAllItem("programs")
    const [searchQuery, setSearchQuery] = useState("")
    const programs = itemsData?.programs || []
    const [deletingId, setDeletingId] = useState(null)

    const filteredPrograms = useMemo(() => {
        return programs.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [programs, searchQuery])

    // refresh
    const handleRefresh = () =>{
        getAllItemResponse()
    }

    // delete hook
    const { deleteByIdHook, loading, error, data } = useDeleteById()

    const handleDelete = async (id) => {
       try {
             setDeletingId(id)
            const confirmDelete = window.confirm("Are you sure you want to delete this program?")
            if (!confirmDelete) return
            await deleteByIdHook(id, "programs/program_delete")
       } finally {
            setDeletingId(null)
            handleRefresh()
       }
    }

    const props = {searchQuery, setSearchQuery, deleteByIdHook, loading, error, data, deletingId,
        itemLoading, itemError, itemsData, getAllItemResponse, handleDelete, handleRefresh,
        filteredPrograms
    }

    const headerProps = {
        title: "Program Dashboard",
        description: "Manage your programs",
        icon: <Sparkles className="text-blue-dark size-4"/>,
    }

    return (
        <div className="dashboard_layout animate_in">
            {/* Dashboard Header */}
            <DashboardHeader {...headerProps}/>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Program Cards (col-span-2) */}
                <LivePreview {...props}/>

                {/* Right Side: Insights & Preview (col-span-1) */}
                <div className="lg:col-span-1 space-y-6 flex flex-col h-fit sticky top-24">
                    <ProgramInsights totalPrograms={programs.length} />
                    <ArrangeProgram programs={programs} onSuccess={() => getAllItemResponse()} />
                </div>
            </div>
        </div>
    )
}