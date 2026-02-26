import NoDataAvailable from "../NoDataAvailable"
import ProgramSkeleton from "../skeletons/ProgramSkeleton"
import ProgramCard from "./ProgramCard"
import { Search } from "lucide-react"

export default function ProgramDetailCard({...props}){
    return(
        <>
            {props.itemLoading ? (
                <div className="flex flex-col gap-8">
                    {[1, 2, 3].map((i) => (
                        <ProgramSkeleton key={i} index={i} />
                    ))}
                </div>
            ) : props.itemError || props.error ? (
                <div className="h-64 rounded-2xl border-2 border-dashed border-red-100 bg-red-50/30 flex flex-col items-center justify-center gap-3 p-8 text-center animate-in zoom-in-95 duration-500">
                    <div className="size-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Search className="size-6 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-red-900 font-bold mb-1">Failed to sync programs</h3>
                        <p className="text-red-500/80 text-sm max-w-xs">{props.itemError}</p>
                    </div>
                    <button onClick={props.handleRefresh} className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-red-100">
                        Refresh Dashboard
                    </button>
                </div>
            ) : props.filteredPrograms.length === 0 ? (
                <div className="h-64 rounded-2xl border-2 border-dashed border-gray-100
                 bg-gray-50/30 flex flex-col items-center justify-center gap-3 p-8 text-center 
                 animate-in zoom-in-95 duration-500">
                    <NoDataAvailable message="No programs found" link="/admin/programs/new" linkText="Add Program" />
                </div>
            ) : (
                <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-2 duration-500">
                    {props.filteredPrograms.map((program, index) => (
                        <ProgramCard key={index} program={program} index={index} {...props} />
                    ))}
                </div>
            )}
        </>
    )
}