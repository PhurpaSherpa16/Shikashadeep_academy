import AdvisorySkeleton from "@/components/skeletons/AdvisorySkeleton"
import AdvisoryCard from "@/components/cards/AdvisoryCard"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import NoDataAvailable from "../../../../components/NoDataAvailable"
import Error from "../../../../components/Error"

export default function Advisory({ ...advisoryProps }) {
    const { advisoryLoading, advisoryError, advisoryData } = advisoryProps
    const [isAdvisoryCollapsed, setIsAdvisoryCollapsed] = useState(false)
    return (
        <div>
            <div className="xl:col-span-2 bg-gray-50 p-4 h-fit rounded-lg animate_in">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold">Our Advisory Members</h2>
                        <div className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                            {advisoryData?.length || 0} Total
                        </div>
                    </div>
                    <button
                        onClick={() => setIsAdvisoryCollapsed(!isAdvisoryCollapsed)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title={isAdvisoryCollapsed ? "Expand" : "Collapse"}
                    >
                        {isAdvisoryCollapsed ? (
                            <ChevronRight className="size-5 text-gray-400 group-hover:text-gray-600" />
                        ) : (
                            <ChevronDown className="size-5 text-gray-400 group-hover:text-gray-600" />
                        )}
                    </button>
                </div>
                {advisoryLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, i) => <AdvisorySkeleton key={i} />)}
                    </div>) 
                    : advisoryError ? <Error />
                    : !advisoryData || advisoryData?.length === 0 ? <NoDataAvailable message="No advisory members available" link="/admin/faculty/advisory/new" linkText="Add Your First Advisory Member" />
                    : !isAdvisoryCollapsed && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {advisoryData?.map((advisory) => (
                            <AdvisoryCard key={advisory.id} advisory={advisory} {...advisoryProps} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}