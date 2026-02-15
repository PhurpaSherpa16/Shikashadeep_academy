import { useGetAllItem } from "../../../hooks/useGetAllItem"
import { useState, useMemo } from "react"
import ProgramInsights from "@/components/program/ProgramInsights"
import LivePreview from "./components/LivePreview"
import Header from "./components/Header"
import ArrangeProgram from "@/components/program/ArrangeProgram"


export default function ProgramDashboard() {
    const { itemLoading, itemError, itemsData, getAllItemResponse, page, limit, setPage, setLimit } = useGetAllItem("programs")

    const [searchQuery, setSearchQuery] = useState("")

    const programs = itemsData?.programs || []

    const filteredPrograms = useMemo(() => {
        return programs.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [programs, searchQuery])

    return (
        <div className="animate-in p-6 md:p-8 fade-in slide-in-from-bottom-4 duration-700 w-full lg:max-w-7xl 2xl:max-w-[1600px] mx-auto space-y-8 pb-20">
            {/* Elegant Header */}
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Program Cards (col-span-2) */}
                <LivePreview itemLoading={itemLoading} itemError={itemError} filteredPrograms={filteredPrograms}
                    getAllItemResponse={getAllItemResponse} />

                {/* Right Side: Insights & Preview (col-span-1) */}
                <div className="lg:col-span-1 space-y-6 flex flex-col h-fit sticky top-24">
                    <ProgramInsights totalPrograms={programs.length} />
                    <ArrangeProgram programs={programs} onSuccess={() => getAllItemResponse()} />
                </div>

            </div>
        </div>
    )
}